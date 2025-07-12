package repository

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Repository struct {
	Collection *mongo.Collection
}

var repositories = map[string]*Repository{}

func InitializeRepositories(db *mongo.Database) {
	// Initialize all repositories
	repositories["users"] = &Repository{Collection: db.Collection("users")}
	repositories["apps"] = &Repository{Collection: db.Collection("apps")}
	repositories["repositories"] = &Repository{Collection: db.Collection("repositories")}
	repositories["deployments"] = &Repository{Collection: db.Collection("deployments")}
	repositories["custom_domains"] = &Repository{Collection: db.Collection("custom_domains")}

	// Create indexes
	createIndexes()
}

func GetRepository(name string) *Repository {
	return repositories[name]
}

func createIndexes() {
	// User indexes
	userRepo := repositories["users"]
	if userRepo != nil {
		// Create email index for users
		createIndex(userRepo.Collection, "email", true)
	}

	// App indexes
	appRepo := repositories["apps"]
	if appRepo != nil {
		// Create sanitizedName index for apps
		createIndex(appRepo.Collection, "sanitizedName", true)
		// Create userId index for apps
		createIndex(appRepo.Collection, "userId", false)
	}

	// Repository indexes
	repoRepo := repositories["repositories"]
	if repoRepo != nil {
		// Create githubRepoId index for repositories
		createIndex(repoRepo.Collection, "githubRepoId", true)
		// Create fullName index for repositories
		createIndex(repoRepo.Collection, "fullName", false)
	}

	// Deployment indexes
	deploymentRepo := repositories["deployments"]
	if deploymentRepo != nil {
		// Create appId index for deployments
		createIndex(deploymentRepo.Collection, "appId", false)
		// Create status index for deployments
		createIndex(deploymentRepo.Collection, "status", false)
	}

	// Custom domain indexes
	domainRepo := repositories["custom_domains"]
	if domainRepo != nil {
		// Create domain index for custom_domains
		createIndex(domainRepo.Collection, "domain", true)
		// Create appId index for custom_domains
		createIndex(domainRepo.Collection, "appId", false)
	}
}

func createIndex(collection *mongo.Collection, field string, unique bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	indexModel := mongo.IndexModel{
		Keys: bson.D{{Key: field, Value: 1}},
		Options: &options.IndexOptions{
			Unique: &unique,
		},
	}

	_, err := collection.Indexes().CreateOne(ctx, indexModel)
	if err != nil {
		// Log error but don't fail - indexes might already exist
		// log.Printf("Failed to create index on %s.%s: %v", collection.Name(), field, err)
	}
}
