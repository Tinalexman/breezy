package controller

import (
	"breezy/model"
	"breezy/utils"

	"github.com/gofiber/fiber/v2"
)

func WebhookController(router fiber.Router) {
	router.Post("/github", handleGitHubWebhook)
}

func handleGitHubWebhook(c *fiber.Ctx) error {
	var payload model.GitHubWebhookPayload
	if err := c.BodyParser(&payload); err != nil {
		return utils.BadRequestResponse(c, "Invalid webhook payload")
	}

	// TODO: Implement GitHub webhook handling logic
	// - Validate webhook signature
	// - Process push events
	// - Find associated app
	// - Queue build job

	return utils.SuccessResponseWithData(c, "Webhook received", fiber.Map{
		"ref":    payload.Ref,
		"before": payload.Before,
		"after":  payload.After,
	})
}
