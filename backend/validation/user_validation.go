package validation

import (
	"breezy/utils"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// UpdateUser is used for updating user profile information
type UpdateUser struct {
	FirstName string `json:"firstName" validate:"required,min=1,max=50"`
	LastName  string `json:"lastName" validate:"required,min=1,max=50"`
	Username  string `json:"username" validate:"required,min=3,max=30,alphanum"`
	Bio       string `json:"bio" validate:"max=500"`
}

// ValidateUpdateUser validates the update user request
func ValidateUpdateUser(c *fiber.Ctx) error {
	var request UpdateUser

	if err := c.BodyParser(&request); err != nil {
		return utils.BadRequestResponse(c, "Invalid request body")
	}

	// Validate using struct tags
	validate := GetValidator()
	if err := validate.Struct(request); err != nil {
		return utils.BadRequestResponse(c, "Validation failed: "+err.Error())
	}

	// Store validated request in context for controller to use
	c.Locals("validated_request", request)
	return c.Next()
}

// ValidateUserID validates that the user ID parameter is valid
func ValidateUserID(c *fiber.Ctx) error {
	userID := c.Params("id")

	if userID == "" {
		return utils.BadRequestResponse(c, "User ID is required")
	}

	// Validate ObjectID format
	if _, err := primitive.ObjectIDFromHex(userID); err != nil {
		return utils.BadRequestResponse(c, "Invalid user ID format")
	}

	return c.Next()
}

func ValidateUserIDFromLocals(c *fiber.Ctx) error {
	userID := c.Locals("user_id")
	if userID == nil {
		return utils.UnauthorizedResponse(c, "User ID not found in context")
	}
	return c.Next()
}
