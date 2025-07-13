package validation

import (
	"breezy/utils"
	"strings"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// CreateAppRequest represents the request body for creating an app
type CreateAppRequest struct {
	Name        string `json:"name" validate:"required,min=1,max=100"`
	Description string `json:"description" validate:"max=500"`
	RepoURL     string `json:"repoURL" validate:"required,url"`
	Branch      string `json:"branch" validate:"max=50"`
}

// DeployAppRequest represents the request body for deploying an app
type DeployAppRequest struct {
	RepoURL string `json:"repoURL" validate:"required,url"`
	Branch  string `json:"branch" validate:"max=50"`
}

// ValidateCreateAppRequest validates the create app request
func ValidateCreateAppRequest(c *fiber.Ctx) error {
	var request CreateAppRequest

	if err := c.BodyParser(&request); err != nil {
		return utils.BadRequestResponse(c, "Invalid request body")
	}

	// Validate using struct tags
	validate := GetValidator()
	if err := validate.Struct(request); err != nil {
		return utils.BadRequestResponse(c, "Validation failed: "+err.Error())
	}

	// Additional custom validations
	if request.Branch == "" {
		request.Branch = "main" // Set default
	}

	// Validate GitHub URL format
	if !isValidGitHubURL(request.RepoURL) {
		return utils.BadRequestResponse(c, "Invalid GitHub repository URL")
	}

	// Store validated request in context for controller to use
	c.Locals("validated_request", request)
	return c.Next()
}

// ValidateDeployAppRequest validates the deploy app request
func ValidateDeployAppRequest(c *fiber.Ctx) error {
	var request DeployAppRequest

	if err := c.BodyParser(&request); err != nil {
		return utils.BadRequestResponse(c, "Invalid request body")
	}

	// Validate using struct tags
	validate := GetValidator()
	if err := validate.Struct(request); err != nil {
		return utils.BadRequestResponse(c, "Validation failed: "+err.Error())
	}

	// Additional custom validations
	if request.Branch == "" {
		request.Branch = "main" // Set default
	}

	// Validate GitHub URL format
	if !isValidGitHubURL(request.RepoURL) {
		return utils.BadRequestResponse(c, "Invalid GitHub repository URL")
	}

	// Store validated request in context for controller to use
	c.Locals("validated_request", request)
	return c.Next()
}

// ValidateAppID validates that the app ID parameter is valid
func ValidateAppID(c *fiber.Ctx) error {
	appID := c.Params("id")

	if appID == "" {
		return utils.BadRequestResponse(c, "App ID is required")
	}

	// Validate ObjectID format
	if _, err := primitive.ObjectIDFromHex(appID); err != nil {
		return utils.BadRequestResponse(c, "Invalid app ID format")
	}

	return c.Next()
}

// ValidateAppOwnership validates that the user owns the app
func ValidateAppOwnership(c *fiber.Ctx) error {
	appID := c.Params("id")
	userID := c.Locals("user_id").(string)

	// Convert IDs to ObjectID
	appObjectID, err := primitive.ObjectIDFromHex(appID)
	if err != nil {
		return utils.BadRequestResponse(c, "Invalid app ID")
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return utils.BadRequestResponse(c, "Invalid user ID")
	}

	// Check if app exists and user owns it
	// Note: This would require database access, so we'll do the actual check in the controller
	// For now, we just validate the format
	c.Locals("app_id", appObjectID)
	c.Locals("user_id_obj", userObjectID)

	return c.Next()
}

// isValidGitHubURL checks if the URL is a valid GitHub repository URL
func isValidGitHubURL(url string) bool {
	if !strings.HasPrefix(url, "https://github.com/") {
		return false
	}

	// Remove the base URL
	path := strings.TrimPrefix(url, "https://github.com/")

	// Check if it has at least owner/repo format
	parts := strings.Split(path, "/")
	if len(parts) < 2 {
		return false
	}

	// Check if owner and repo names are not empty
	if parts[0] == "" || parts[1] == "" {
		return false
	}

	return true
}
