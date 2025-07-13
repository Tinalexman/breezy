package controller

import (
	"breezy/middleware"
	"breezy/model"
	"breezy/services"
	"breezy/utils"
	"breezy/validation"
	"context"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	buildService *services.BuildService
	db           *mongo.Database
)

func AppController(router fiber.Router, database *mongo.Database) {
	db = database
	router.Post("/", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, validation.ValidateCreateAppRequest, createApp)
	router.Get("/", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, getUserApps)
	router.Get("/:id", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, validation.ValidateAppID, validation.ValidateAppOwnership, getAppById)
	router.Put("/:id", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, validation.ValidateAppID, validation.ValidateAppOwnership, updateApp)
	router.Delete("/:id", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, validation.ValidateAppID, validation.ValidateAppOwnership, deleteApp)
	router.Post("/:id/deploy", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, validation.ValidateAppID, validation.ValidateAppOwnership, validation.ValidateDeployAppRequest, deployApp)
	router.Get("/:id/status", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, validation.ValidateAppID, validation.ValidateAppOwnership, getAppStatus)
}

func createApp(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)

	// Get validated request from context
	request := c.Locals("validated_request").(validation.CreateAppRequest)

	// Convert userID to ObjectID
	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return utils.BadRequestResponse(c, "Invalid user ID")
	}

	// Create sanitized name for URL
	sanitizedName := sanitizeAppName(request.Name)

	// Create app record
	app := model.App{
		Id:            primitive.NewObjectID(),
		UserId:        userObjectID,
		Name:          request.Name,
		SanitizedName: sanitizedName,
		Description:   request.Description,
		IsActive:      true,
		CreatedAt:     time.Now(),
		UpdatedAt:     time.Now(),
	}

	// Save app to database
	collection := db.Collection("apps")
	_, err = collection.InsertOne(context.Background(), app)
	if err != nil {
		logrus.WithError(err).Error("Failed to create app")
		return utils.InternalServerErrorResponse(c, "Failed to create app")
	}

	// Start the build process if repo URL is provided
	if request.RepoURL != "" && buildService != nil {
		go func() {
			// Small delay to ensure app is created first
			time.Sleep(1 * time.Second)
			buildService.StartBuild(app.Id.Hex(), userID, request.RepoURL, request.Branch)
			logrus.Infof("Started build for new app %s, user %s, repo %s", app.Id.Hex(), userID, request.RepoURL)
		}()
	}

	return utils.SuccessResponseWithData(c, "App created successfully", fiber.Map{
		"app": fiber.Map{
			"id":             app.Id.Hex(),
			"name":           app.Name,
			"sanitizedName":  app.SanitizedName,
			"description":    app.Description,
			"isActive":       app.IsActive,
			"createdAt":      app.CreatedAt,
			"buildScheduled": request.RepoURL != "",
		},
		"user_id":  userID,
		"repo_url": request.RepoURL,
		"branch":   request.Branch,
	})
}

// sanitizeAppName creates a URL-safe version of the app name
func sanitizeAppName(name string) string {
	// Convert to lowercase
	name = strings.ToLower(name)

	// Replace spaces and special characters with hyphens
	name = strings.ReplaceAll(name, " ", "-")
	name = strings.ReplaceAll(name, "_", "-")
	name = strings.ReplaceAll(name, ".", "-")

	// Remove any non-alphanumeric characters except hyphens
	var result strings.Builder
	for _, char := range name {
		if (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9') || char == '-' {
			result.WriteRune(char)
		}
	}

	// Remove multiple consecutive hyphens
	resultStr := result.String()
	for strings.Contains(resultStr, "--") {
		resultStr = strings.ReplaceAll(resultStr, "--", "-")
	}

	// Remove leading and trailing hyphens
	resultStr = strings.Trim(resultStr, "-")

	// Ensure it's not empty
	if resultStr == "" {
		resultStr = "app"
	}

	return resultStr
}

func getUserApps(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)

	// Convert userID to ObjectID
	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return utils.BadRequestResponse(c, "Invalid user ID")
	}

	// Find user's apps
	collection := db.Collection("apps")
	cursor, err := collection.Find(context.Background(), bson.M{"userId": userObjectID})
	if err != nil {
		logrus.WithError(err).Error("Failed to fetch user apps")
		return utils.InternalServerErrorResponse(c, "Failed to fetch apps")
	}
	defer cursor.Close(context.Background())

	var apps []model.App
	if err := cursor.All(context.Background(), &apps); err != nil {
		logrus.WithError(err).Error("Failed to decode user apps")
		return utils.InternalServerErrorResponse(c, "Failed to decode apps")
	}

	// Convert to response format
	var appResponses []fiber.Map
	for _, app := range apps {
		appResponses = append(appResponses, fiber.Map{
			"id":             app.Id.Hex(),
			"name":           app.Name,
			"sanitizedName":  app.SanitizedName,
			"description":    app.Description,
			"isActive":       app.IsActive,
			"staticFilesURL": app.StaticFilesURL,
			"createdAt":      app.CreatedAt,
			"updatedAt":      app.UpdatedAt,
		})
	}

	return utils.SuccessResponseWithData(c, "User apps retrieved", fiber.Map{
		"user_id": userID,
		"apps":    appResponses,
		"count":   len(appResponses),
	})
}

func getAppById(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)

	// Get validated IDs from context
	appObjectID := c.Locals("app_id").(primitive.ObjectID)
	userObjectID := c.Locals("user_id_obj").(primitive.ObjectID)

	// Find app by ID and verify ownership
	collection := db.Collection("apps")
	var app model.App
	err := collection.FindOne(context.Background(), bson.M{
		"_id":    appObjectID,
		"userId": userObjectID,
	}).Decode(&app)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return utils.NotFoundResponse(c, "App not found")
		}
		logrus.WithError(err).Error("Failed to fetch app")
		return utils.InternalServerErrorResponse(c, "Failed to fetch app")
	}

	return utils.SuccessResponseWithData(c, "App retrieved", fiber.Map{
		"app": fiber.Map{
			"id":             app.Id.Hex(),
			"name":           app.Name,
			"sanitizedName":  app.SanitizedName,
			"description":    app.Description,
			"isActive":       app.IsActive,
			"staticFilesURL": app.StaticFilesURL,
			"createdAt":      app.CreatedAt,
			"updatedAt":      app.UpdatedAt,
		},
		"user_id": userID,
	})
}

func updateApp(c *fiber.Ctx) error {
	appID := c.Params("id")
	userID := c.Locals("user_id").(string)

	// TODO: Implement update app logic
	// - Find app by ID
	// - Verify user owns the app
	// - Update app data
	// - Save to database

	return utils.SuccessResponseWithData(c, "App updated", fiber.Map{
		"app_id":  appID,
		"user_id": userID,
	})
}

func deleteApp(c *fiber.Ctx) error {
	appID := c.Params("id")
	userID := c.Locals("user_id").(string)

	// TODO: Implement delete app logic
	// - Find app by ID
	// - Verify user owns the app
	// - Delete app and related data

	return utils.SuccessResponseWithData(c, "App deleted", fiber.Map{
		"app_id":  appID,
		"user_id": userID,
	})
}

func deployApp(c *fiber.Ctx) error {
	appID := c.Params("id")
	userID := c.Locals("user_id").(string)

	// Get validated request from context
	request := c.Locals("validated_request").(validation.DeployAppRequest)

	// Start the build process
	if buildService != nil {
		buildService.StartBuild(appID, userID, request.RepoURL, request.Branch)
		logrus.Infof("Started build for app %s, user %s, repo %s", appID, userID, request.RepoURL)
	} else {
		logrus.Error("Build service not initialized")
		return utils.InternalServerErrorResponse(c, "Build service not available")
	}

	return utils.SuccessResponseWithData(c, "App deployment initiated", fiber.Map{
		"app_id":   appID,
		"user_id":  userID,
		"repo_url": request.RepoURL,
		"branch":   request.Branch,
		"status":   "pending",
	})
}

func getAppStatus(c *fiber.Ctx) error {
	appID := c.Params("id")
	userID := c.Locals("user_id").(string)

	// TODO: Implement get app status logic
	// - Find app by ID
	// - Verify user owns the app
	// - Return current deployment status

	return utils.SuccessResponseWithData(c, "App status retrieved", fiber.Map{
		"app_id":  appID,
		"user_id": userID,
		"status":  "pending",
	})
}
