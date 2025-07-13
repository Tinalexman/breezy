package validation

import (
	"breezy/utils"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ValidateDeploymentID validates that the deployment ID parameter is valid
func ValidateDeploymentID(c *fiber.Ctx) error {
	deploymentID := c.Params("id")

	if deploymentID == "" {
		return utils.BadRequestResponse(c, "Deployment ID is required")
	}

	// Validate ObjectID format
	if _, err := primitive.ObjectIDFromHex(deploymentID); err != nil {
		return utils.BadRequestResponse(c, "Invalid deployment ID format")
	}

	return c.Next()
}

// ValidateDeploymentOwnership validates that the user owns the deployment
func ValidateDeploymentOwnership(c *fiber.Ctx) error {
	deploymentID := c.Params("id")
	userID := c.Locals("user_id").(string)

	// Convert IDs to ObjectID
	deploymentObjectID, err := primitive.ObjectIDFromHex(deploymentID)
	if err != nil {
		return utils.BadRequestResponse(c, "Invalid deployment ID")
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return utils.BadRequestResponse(c, "Invalid user ID")
	}

	// Store validated IDs in context for controller to use
	c.Locals("deployment_id", deploymentObjectID)
	c.Locals("user_id_obj", userObjectID)

	return c.Next()
}
