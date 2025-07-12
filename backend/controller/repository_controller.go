package controller

import (
	"breezy/middleware"
	"breezy/validation"

	"github.com/gofiber/fiber/v2"
)

func RepositoryController(router fiber.Router) {
	router.Get("/", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, getUserRepositories)
	router.Get("/:id", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, getRepositoryById)
}

func getUserRepositories(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)

	// TODO: Implement get user repositories logic
	// - Fetch repositories from GitHub API
	// - Return repository list

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User repositories retrieved",
		"user_id": userID,
		"repos":   []interface{}{},
	})
}

func getRepositoryById(c *fiber.Ctx) error {
	repoID := c.Params("id")
	userID := c.Locals("user_id").(string)

	// TODO: Implement get repository by ID logic
	// - Find repository by ID
	// - Verify user has access
	// - Return repository data

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Repository retrieved",
		"repo_id": repoID,
		"user_id": userID,
	})
}
