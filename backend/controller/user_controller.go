package controller

import (
	"breezy/middleware"
	"breezy/utils"
	"breezy/validation"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func UserController(router fiber.Router) {
	router.Get("/profile", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, getUserProfile)
	router.Put("/profile", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, updateUserProfile)
}

func getUserProfile(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)

	// TODO: Implement get user profile logic
	// - Find user by ID
	// - Return user data

	return utils.SuccessResponseWithData(c, "User profile retrieved", fiber.Map{
		"user_id": userID,
	})
}

func updateUserProfile(c *fiber.Ctx) error {
	var update validation.UpdateUser
	if err := c.BodyParser(&update); err != nil {
		return utils.BadRequestResponse(c, "Invalid request body")
	}

	// Validate input
	validate := validator.New()
	if err := validate.Struct(update); err != nil {
		return utils.BadRequestResponse(c, "Validation failed")
	}

	userID := c.Locals("user_id").(string)

	// TODO: Implement update user profile logic
	// - Find user by ID
	// - Update user data
	// - Save to database

	return utils.SuccessResponseWithData(c, "User profile updated", fiber.Map{
		"user_id": userID,
		"data":    update,
	})
}
