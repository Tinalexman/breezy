package controller

import (
	"breezy/utils"
	"breezy/validation"

	"github.com/gofiber/fiber/v2"
)

func WebhookController(router fiber.Router) {
	router.Post("/github", validation.ValidateGitHubWebhook, handleGitHubWebhook)
}

func handleGitHubWebhook(c *fiber.Ctx) error {
	// Get validated payload from context
	payload := c.Locals("webhook_payload").(map[string]interface{})

	// TODO: Implement GitHub webhook handling logic
	// - Process push events
	// - Find associated app
	// - Queue build job

	return utils.SuccessResponseWithData(c, "Webhook received", fiber.Map{
		"payload": payload,
	})
}
