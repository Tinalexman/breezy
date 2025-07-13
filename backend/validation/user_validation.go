package validation

import (
	"breezy/utils"

	"github.com/gofiber/fiber/v2"
)

// UpdateUser is used for updating user profile information
type UpdateUser struct {
	FirstName string `json:"firstName" validate:"required"`
	LastName  string `json:"lastName" validate:"required"`
	Username  string `json:"username" validate:"required"`
	Bio       string `json:"bio"`
}

func ValidateUserIDFromLocals(c *fiber.Ctx) error {
	userID := c.Locals("user_id")
	if userID == nil {
		return utils.UnauthorizedResponse(c, "User ID not found in context")
	}
	return c.Next()
}
