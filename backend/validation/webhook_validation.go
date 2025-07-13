package validation

import (
	"breezy/utils"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"strings"

	"github.com/gofiber/fiber/v2"
)

// ValidateGitHubWebhook validates GitHub webhook requests
func ValidateGitHubWebhook(c *fiber.Ctx) error {
	// Get the signature from headers
	signature := c.Get("X-Hub-Signature-256")
	if signature == "" {
		return utils.UnauthorizedResponse(c, "Missing GitHub signature")
	}

	// Get the webhook secret (you should store this in environment variables)
	webhookSecret := "your-webhook-secret" // TODO: Get from environment

	// Get the raw body
	body := c.Body()
	if len(body) == 0 {
		return utils.BadRequestResponse(c, "Empty webhook body")
	}

	// Validate the signature
	if !validateGitHubSignature([]byte(signature), body, webhookSecret) {
		return utils.UnauthorizedResponse(c, "Invalid GitHub signature")
	}

	// Parse the webhook payload
	var payload map[string]interface{}
	if err := c.BodyParser(&payload); err != nil {
		return utils.BadRequestResponse(c, "Invalid webhook payload")
	}

	// Store validated payload in context for controller to use
	c.Locals("webhook_payload", payload)
	return c.Next()
}

// validateGitHubSignature validates the GitHub webhook signature
func validateGitHubSignature(signature, body []byte, secret string) bool {
	// Extract the signature value (remove "sha256=" prefix)
	signatureValue := strings.TrimPrefix(string(signature), "sha256=")

	// Create HMAC SHA256 hash
	h := hmac.New(sha256.New, []byte(secret))
	h.Write(body)
	expectedSignature := hex.EncodeToString(h.Sum(nil))

	return hmac.Equal([]byte(signatureValue), []byte(expectedSignature))
}
