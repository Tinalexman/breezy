package validation

import (
	"breezy/utils"
	"strings"

	"github.com/gofiber/fiber/v2"
)

// ValidateRepositoryBranchesRequest validates the request for fetching repository branches
func ValidateRepositoryBranchesRequest(c *fiber.Ctx) error {
	// Get the repo URL from query parameters
	repoURL := c.Query("repo_url")

	// Validate that repo_url is provided
	if repoURL == "" {
		return utils.BadRequestResponse(c, "Repository URL is required")
	}

	// Validate that the URL is a valid GitHub repository URL
	if !isValidGitHubRepoURL(repoURL) {
		return utils.BadRequestResponse(c, "Invalid GitHub repository URL")
	}

	// Store the validated repo URL in context for the controller to use
	c.Locals("repo_url", repoURL)

	return c.Next()
}

// isValidGitHubRepoURL checks if the provided URL is a valid GitHub repository URL
func isValidGitHubRepoURL(url string) bool {
	// Check if it's a GitHub URL
	if !strings.Contains(url, "github.com") {
		return false
	}

	// Check if it has the proper format: https://github.com/owner/repo
	parts := strings.Split(url, "/")
	if len(parts) < 5 {
		return false
	}

	// Should have: https:, "", github.com, owner, repo
	if parts[0] != "https:" || parts[1] != "" || parts[2] != "github.com" {
		return false
	}

	// Owner and repo should not be empty
	if parts[3] == "" || parts[4] == "" {
		return false
	}

	return true
}
