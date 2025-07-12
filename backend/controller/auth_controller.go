package controller

import (
	"breezy/utils"
	"breezy/validation"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func AuthController(router fiber.Router) {
	router.Post("/register", registerUser)
	router.Post("/login", loginUser)
	router.Post("/github", githubAuth)
	router.Post("/github/callback", githubCallback)
	router.Post("/refresh", refreshToken)
}

func registerUser(c *fiber.Ctx) error {
	var user validation.RegisterUser
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	// Validate input
	validate := validator.New()
	if err := validate.Struct(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Validation failed",
		})
	}

	// TODO: Implement user registration logic
	// - Check if user already exists
	// - Hash password
	// - Save to database
	// - Generate JWT token

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User registered successfully",
		"user":    user,
	})
}

func loginUser(c *fiber.Ctx) error {
	var login validation.LoginUser
	if err := c.BodyParser(&login); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	// Validate input
	validate := validator.New()
	if err := validate.Struct(login); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Validation failed",
		})
	}

	// TODO: Implement login logic
	// - Find user by email
	// - Verify password
	// - Generate JWT token

	// Mock response
	token, err := utils.GenerateToken("user_id_here", "your-secret-key")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to generate token",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Login successful",
		"token":   token,
	})
}

func githubAuth(c *fiber.Ctx) error {
	// TODO: Implement GitHub OAuth flow
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "GitHub auth initiated",
	})
}

func githubCallback(c *fiber.Ctx) error {
	// TODO: Implement GitHub OAuth callback
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "GitHub auth callback",
	})
}

func refreshToken(c *fiber.Ctx) error {
	// TODO: Implement token refresh logic
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Token refreshed",
	})
}
