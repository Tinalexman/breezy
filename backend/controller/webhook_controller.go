package controller

import (
	"breezy/model"

	"github.com/gofiber/fiber/v2"
)

func WebhookController(router fiber.Router) {
	router.Post("/github", handleGitHubWebhook)
}

func handleGitHubWebhook(c *fiber.Ctx) error {
	var payload model.GitHubWebhookPayload
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid webhook payload",
		})
	}

	// TODO: Implement GitHub webhook handling logic
	// - Validate webhook signature
	// - Process push events
	// - Find associated app
	// - Queue build job

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Webhook received",
		"ref":     payload.Ref,
		"before":  payload.Before,
		"after":   payload.After,
	})
}
