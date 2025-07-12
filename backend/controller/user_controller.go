package controller

import (
	"breezy/middleware"
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

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User profile retrieved",
		"user_id": userID,
	})
}

func updateUserProfile(c *fiber.Ctx) error {
	var update validation.UpdateUser
	if err := c.BodyParser(&update); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	// Validate input
	validate := validator.New()
	if err := validate.Struct(update); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Validation failed",
		})
	}

	userID := c.Locals("user_id").(string)

	// TODO: Implement update user profile logic
	// - Find user by ID
	// - Update user data
	// - Save to database

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User profile updated",
		"user_id": userID,
		"data":    update,
	})
}
