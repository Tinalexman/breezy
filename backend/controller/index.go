package controller

import (
	"breezy/config"
	"breezy/logger"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

var log = logger.Logger()

func InitializeControllers(app *fiber.App, configEnv *config.Environment, database *mongo.Database) {
	// Initialize all controllers
	AuthController(app.Group("/api/auth"), configEnv, database)
	UserController(app.Group("/api/users"))
	AppController(app.Group("/api/apps"))
	RepositoryController(app.Group("/api/repositories"), configEnv, database)
	DeploymentController(app.Group("/api/deployments"))
	WebhookController(app.Group("/webhooks"))
}
