package controller

import (
	"breezy/middleware"
	"breezy/utils"
	"breezy/validation"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func DeploymentController(router fiber.Router) {
	router.Get("/", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, getUserDeployments)
	router.Get("/:id", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, validation.ValidateDeploymentID, validation.ValidateDeploymentOwnership, getDeploymentById)
	router.Get("/:id/logs", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, validation.ValidateDeploymentID, validation.ValidateDeploymentOwnership, getDeploymentLogs)
}

func getUserDeployments(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)

	// TODO: Implement get user deployments logic
	// - Find user's deployments
	// - Return deployment list

	return utils.SuccessResponseWithData(c, "User deployments retrieved", fiber.Map{
		"user_id":     userID,
		"deployments": []interface{}{},
	})
}

func getDeploymentById(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)

	// Get validated IDs from context
	deploymentObjectID := c.Locals("deployment_id").(primitive.ObjectID)
	_ = c.Locals("user_id_obj").(primitive.ObjectID) // Will be used in actual implementation

	// TODO: Implement get deployment by ID logic
	// - Find deployment by ID
	// - Verify user owns the deployment
	// - Return deployment data

	return utils.SuccessResponseWithData(c, "Deployment retrieved", fiber.Map{
		"deployment_id": deploymentObjectID.Hex(),
		"user_id":       userID,
	})
}

func getDeploymentLogs(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)

	// Get validated IDs from context
	deploymentObjectID := c.Locals("deployment_id").(primitive.ObjectID)
	_ = c.Locals("user_id_obj").(primitive.ObjectID) // Will be used in actual implementation

	// TODO: Implement get deployment logs logic
	// - Find deployment by ID
	// - Verify user owns the deployment
	// - Return build logs

	return utils.SuccessResponseWithData(c, "Deployment logs retrieved", fiber.Map{
		"deployment_id": deploymentObjectID.Hex(),
		"user_id":       userID,
		"logs":          "",
	})
}
