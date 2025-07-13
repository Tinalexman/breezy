package services

import (
	"breezy/config"
	"breezy/model"
	"context"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type BuildService struct {
	db        *mongo.Database
	config    *config.Environment
	wsService *WebSocketService
	buildDir  string
}

type PubspecYaml struct {
	Name        string `yaml:"name" json:"name"`
	Description string `yaml:"description" json:"description"`
	Version     string `yaml:"version" json:"version"`
	Homepage    string `yaml:"homepage" json:"homepage"`
	Author      string `yaml:"author" json:"author"`
}

type BuildResult struct {
	Success    bool   `json:"success"`
	AppURL     string `json:"appUrl,omitempty"`
	Error      string `json:"error,omitempty"`
	BuildLogs  string `json:"buildLogs,omitempty"`
	BuildTime  int64  `json:"buildTime"`
	OutputSize int64  `json:"outputSize"`
}

func NewBuildService(db *mongo.Database, config *config.Environment, wsService *WebSocketService) *BuildService {
	buildDir := "./builds"
	if err := os.MkdirAll(buildDir, 0755); err != nil {
		logrus.WithError(err).Error("Failed to create build directory")
	}

	return &BuildService{
		db:        db,
		config:    config,
		wsService: wsService,
		buildDir:  buildDir,
	}
}

func (bs *BuildService) StartBuild(appID string, userID string, repoURL string, branch string) {
	go bs.buildApp(appID, userID, repoURL, branch)
}

func (bs *BuildService) buildApp(appID string, userID string, repoURL string, branch string) {
	startTime := time.Now()
	buildID := primitive.NewObjectID().Hex()
	buildPath := filepath.Join(bs.buildDir, buildID)

	// Create deployment record
	deploymentID, err := bs.createDeploymentRecord(appID, userID, "pending")
	if err != nil {
		bs.sendUpdate(userID, appID, "failed", "Failed to create deployment record", 0)
		return
	}

	defer func() {
		// Cleanup build directory
		os.RemoveAll(buildPath)
	}()

	// Send initial update
	bs.sendUpdate(userID, appID, "pending", "Build started", 0)

	// Step 1: Clone repository
	bs.sendUpdate(userID, appID, "cloning", "Cloning repository...", 10)
	if err := bs.cloneRepository(repoURL, branch, buildPath); err != nil {
		bs.sendUpdate(userID, appID, "failed", fmt.Sprintf("Failed to clone repository: %v", err), 0)
		bs.updateDeploymentStatus(deploymentID, "failed", err.Error())
		return
	}

	// Step 2: Parse pubspec.yaml
	bs.sendUpdate(userID, appID, "building", "Parsing project configuration...", 30)
	pubspec, err := bs.parsePubspecYaml(buildPath)
	if err != nil {
		bs.sendUpdate(userID, appID, "failed", fmt.Sprintf("Failed to parse pubspec.yaml: %v", err), 0)
		bs.updateDeploymentStatus(deploymentID, "failed", err.Error())
		return
	}

	// Step 3: Get Flutter dependencies
	bs.sendUpdate(userID, appID, "building", "Getting Flutter dependencies...", 50)
	if err := bs.getFlutterDependencies(buildPath); err != nil {
		bs.sendUpdate(userID, appID, "failed", fmt.Sprintf("Failed to get dependencies: %v", err), 0)
		bs.updateDeploymentStatus(deploymentID, "failed", err.Error())
		return
	}

	// Step 4: Build Flutter web app
	bs.sendUpdate(userID, appID, "building", "Building Flutter web app...", 70)
	_, err = bs.buildFlutterWeb(buildPath)
	if err != nil {
		bs.sendUpdate(userID, appID, "failed", fmt.Sprintf("Build failed: %v", err), 0)
		bs.updateDeploymentStatus(deploymentID, "failed", err.Error())
		return
	}

	// Step 5: Upload to storage (simplified for now)
	bs.sendUpdate(userID, appID, "building", "Uploading build artifacts...", 90)
	appURL, err := bs.uploadBuildArtifacts(buildPath, appID)
	if err != nil {
		bs.sendUpdate(userID, appID, "failed", fmt.Sprintf("Failed to upload artifacts: %v", err), 0)
		bs.updateDeploymentStatus(deploymentID, "failed", err.Error())
		return
	}

	// Step 6: Update app record
	bs.sendUpdate(userID, appID, "building", "Finalizing deployment...", 95)
	if err := bs.updateAppRecord(appID, deploymentID, appURL, pubspec); err != nil {
		bs.sendUpdate(userID, appID, "failed", fmt.Sprintf("Failed to update app record: %v", err), 0)
		bs.updateDeploymentStatus(deploymentID, "failed", err.Error())
		return
	}

	// Success!
	buildTime := time.Since(startTime).Milliseconds()
	bs.sendUpdate(userID, appID, "success", fmt.Sprintf("Build completed successfully in %dms", buildTime), 100)
	bs.updateDeploymentStatus(deploymentID, "success", "Build completed successfully")
}

func (bs *BuildService) cloneRepository(repoURL, branch, buildPath string) error {
	// Get user's GitHub token for private repos
	// For now, we'll assume public repos or use a service account token

	cmd := exec.Command("git", "clone", "--depth", "1", "--branch", branch, repoURL, buildPath)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	// Check if git is available
	if _, err := exec.LookPath("git"); err != nil {
		return fmt.Errorf("git is not installed or not in PATH: %v", err)
	}

	return cmd.Run()
}

func (bs *BuildService) parsePubspecYaml(buildPath string) (*PubspecYaml, error) {
	pubspecPath := filepath.Join(buildPath, "pubspec.yaml")

	// Read pubspec.yaml
	data, err := os.ReadFile(pubspecPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read pubspec.yaml: %v", err)
	}

	// Simple parsing for now - in production you'd use a proper YAML parser
	pubspec := &PubspecYaml{}

	lines := strings.Split(string(data), "\n")
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if strings.HasPrefix(line, "name:") {
			pubspec.Name = strings.TrimSpace(strings.TrimPrefix(line, "name:"))
		} else if strings.HasPrefix(line, "description:") {
			pubspec.Description = strings.TrimSpace(strings.TrimPrefix(line, "description:"))
		} else if strings.HasPrefix(line, "version:") {
			pubspec.Version = strings.TrimSpace(strings.TrimPrefix(line, "version:"))
		} else if strings.HasPrefix(line, "homepage:") {
			pubspec.Homepage = strings.TrimSpace(strings.TrimPrefix(line, "homepage:"))
		} else if strings.HasPrefix(line, "author:") {
			pubspec.Author = strings.TrimSpace(strings.TrimPrefix(line, "author:"))
		}
	}

	return pubspec, nil
}

func (bs *BuildService) getFlutterDependencies(buildPath string) error {
	cmd := exec.Command("flutter", "pub", "get")
	cmd.Dir = buildPath
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	return cmd.Run()
}

func (bs *BuildService) buildFlutterWeb(buildPath string) (string, error) {
	cmd := exec.Command("flutter", "build", "web", "--release", "--base-href", "/")
	cmd.Dir = buildPath

	// Capture output
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return "", err
	}

	stderr, err := cmd.StderrPipe()
	if err != nil {
		return "", err
	}

	if err := cmd.Start(); err != nil {
		return "", err
	}

	// Read output
	stdoutData, _ := io.ReadAll(stdout)
	stderrData, _ := io.ReadAll(stderr)

	if err := cmd.Wait(); err != nil {
		return string(stderrData), fmt.Errorf("flutter build failed: %v", err)
	}

	return string(stdoutData), nil
}

func (bs *BuildService) uploadBuildArtifacts(buildPath, appID string) (string, error) {
	// For now, we'll just return a placeholder URL
	// In production, you'd upload to Cloudflare R2 or similar
	webDir := filepath.Join(buildPath, "build", "web")

	// Check if build output exists
	if _, err := os.Stat(webDir); os.IsNotExist(err) {
		return "", fmt.Errorf("build output not found")
	}

	// For now, return a placeholder URL
	appURL := fmt.Sprintf("https://%s.breezy.app", appID)

	return appURL, nil
}

func (bs *BuildService) createDeploymentRecord(appID, userID, status string) (primitive.ObjectID, error) {
	collection := bs.db.Collection("deployments")

	deployment := model.Deployment{
		Id:         primitive.NewObjectID(),
		AppId:      primitive.ObjectID{},
		Status:     model.DeploymentStatus(status),
		CreatedAt:  time.Now(),
		FinishedAt: nil,
	}

	// Parse appID to ObjectID
	appObjectID, err := primitive.ObjectIDFromHex(appID)
	if err != nil {
		return primitive.NilObjectID, err
	}
	deployment.AppId = appObjectID

	_, err = collection.InsertOne(context.Background(), deployment)
	if err != nil {
		return primitive.NilObjectID, err
	}

	return deployment.Id, nil
}

func (bs *BuildService) updateDeploymentStatus(deploymentID primitive.ObjectID, status, message string) {
	collection := bs.db.Collection("deployments")

	update := bson.M{
		"$set": bson.M{
			"status":     model.DeploymentStatus(status),
			"finishedAt": time.Now(),
			"message":    message,
		},
	}

	collection.UpdateOne(context.Background(), bson.M{"_id": deploymentID}, update)
}

func (bs *BuildService) updateAppRecord(appID string, deploymentID primitive.ObjectID, appURL string, pubspec *PubspecYaml) error {
	collection := bs.db.Collection("apps")

	appObjectID, err := primitive.ObjectIDFromHex(appID)
	if err != nil {
		return err
	}

	update := bson.M{
		"$set": bson.M{
			"currentDeploymentId": deploymentID,
			"staticFilesURL":      appURL,
			"updatedAt":           time.Now(),
		},
	}

	_, err = collection.UpdateOne(context.Background(), bson.M{"_id": appObjectID}, update)
	return err
}

func (bs *BuildService) sendUpdate(userID, appID, status, message string, progress int) {
	update := BuildUpdate{
		Type:      "build_update",
		AppID:     appID,
		UserID:    userID,
		Status:    status,
		Message:   message,
		Progress:  progress,
		Timestamp: time.Now(),
	}

	bs.wsService.BroadcastUpdate(update)
}
