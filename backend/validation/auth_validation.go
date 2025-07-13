package validation

import (
	"breezy/utils"

	"github.com/gofiber/fiber/v2"
)

// GitHubCallbackRequest represents the GitHub OAuth callback request
type GitHubCallbackRequest struct {
	Code  string `json:"code" validate:"required"`
	State string `json:"state" validate:"required"`
}

// RefreshTokenRequest represents the refresh token request
type RefreshTokenRequest struct {
	Token string `json:"token" validate:"required"`
}

// ValidateGitHubCallback validates the GitHub OAuth callback request
func ValidateGitHubCallback(c *fiber.Ctx) error {
	var request GitHubCallbackRequest

	if err := c.BodyParser(&request); err != nil {
		return utils.BadRequestResponse(c, "Invalid callback data")
	}

	// Validate using struct tags
	validate := GetValidator()
	if err := validate.Struct(request); err != nil {
		return utils.BadRequestResponse(c, "Validation failed: "+err.Error())
	}

	// Additional custom validations
	if request.Code == "" {
		return utils.BadRequestResponse(c, "Authorization code is required")
	}

	// Store validated request in context for controller to use
	c.Locals("validated_request", request)
	return c.Next()
}

// ValidateRefreshToken validates the refresh token request
func ValidateRefreshToken(c *fiber.Ctx) error {
	var request RefreshTokenRequest

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
