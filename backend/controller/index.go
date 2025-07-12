package controller

import (
	"github.com/gofiber/fiber/v2"
)

func InitializeControllers(app *fiber.App) {
	// Initialize all controllers
	AuthController(app.Group("/api/auth"))
	UserController(app.Group("/api/users"))
	AppController(app.Group("/api/apps"))
	RepositoryController(app.Group("/api/repositories"))
	DeploymentController(app.Group("/api/deployments"))
	WebhookController(app.Group("/webhooks"))
}
