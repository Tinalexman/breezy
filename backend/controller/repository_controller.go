package controller

import (
	"breezy/config"
	"breezy/middleware"
	"breezy/services"
	"breezy/utils"
	"breezy/validation"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	repositoryGitHubService *services.GitHubService
	repositoryConfigEnv     *config.Environment
)

func RepositoryController(router fiber.Router, env *config.Environment, database *mongo.Database) {
	repositoryConfigEnv = env
	repositoryGitHubService = services.NewGitHubService(env, database)

	router.Get("/", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, getUserRepositories)
	router.Get("/:id", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, getRepositoryById)
	router.Get("/debug/token", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, debugUserToken)
}

func getUserRepositories(c *fiber.Ctx) error {

	userID := c.Locals("user_id").(string)

	if repositoryGitHubService == nil {
		return utils.InternalServerErrorResponse(c, "GitHub service not initialized")
	}

	// Fetch repositories from GitHub API
	repositories, err := repositoryGitHubService.GetUserRepositories(userID)
	if err != nil {
		logrus.Printf("Failed to fetch user repositories: %v", err)

		// Provide more specific error messages based on the error
		if strings.Contains(err.Error(), "user has no GitHub token") {
			return utils.BadRequestResponse(c, "GitHub authentication required. Please re-authenticate with GitHub.")
		} else if strings.Contains(err.Error(), "GitHub token is invalid or expired") || strings.Contains(err.Error(), "Bad credentials") {
			// Clear the invalid token so the user is forced to re-authenticate
			repositoryGitHubService.ClearInvalidGitHubToken(userID)
			return utils.BadRequestResponse(c, "GitHub token has expired or is invalid. Please re-authenticate with GitHub.")
		} else if strings.Contains(err.Error(), "401") {
			return utils.BadRequestResponse(c, "GitHub authentication failed. Please re-authenticate with GitHub.")
		}

		return utils.InternalServerErrorResponse(c, "Failed to fetch repositories from GitHub")
	}

	// Transform repositories to a more frontend-friendly format
	var repos []fiber.Map
	for _, repo := range repositories {
		repos = append(repos, fiber.Map{
			"id":            repo.ID,
			"name":          repo.Name,
			"fullName":      repo.FullName,
			"description":   repo.Description,
			"private":       repo.Private,
			"fork":          repo.Fork,
			"defaultBranch": repo.DefaultBranch,
			"language":      repo.Language,
			"size":          repo.Size,
			"stars":         repo.Stars,
			"forks":         repo.Forks,
			"watchers":      repo.Watchers,
			"openIssues":    repo.OpenIssues,
			"createdAt":     repo.CreatedAt,
			"updatedAt":     repo.UpdatedAt,
			"pushedAt":      repo.PushedAt,
			"cloneUrl":      repo.CloneURL,
			"sshUrl":        repo.SSHURL,
			"htmlUrl":       repo.HTMLURL,
			"homepage":      repo.Homepage,
			"archived":      repo.Archived,
			"disabled":      repo.Disabled,
		})
	}

	return utils.SuccessResponseWithData(c, "User repositories retrieved", fiber.Map{
		"user_id": userID,
		"repos":   repos,
		"count":   len(repos),
	})
}

func getRepositoryById(c *fiber.Ctx) error {
	repoID := c.Params("id")
	userID := c.Locals("user_id").(string)

	// TODO: Implement get repository by ID logic
	// - Find repository by ID
	// - Verify user has access
	// - Return repository data

	return utils.SuccessResponseWithData(c, "Repository retrieved", fiber.Map{
		"repo_id": repoID,
		"user_id": userID,
	})
}

func debugUserToken(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)

	if repositoryGitHubService == nil {
		return utils.InternalServerErrorResponse(c, "GitHub service not initialized")
	}

	// Get user from database
	user, err := repositoryGitHubService.GetUserByID(userID)
	if err != nil {
		return utils.InternalServerErrorResponse(c, "Failed to get user")
	}

	// Check if user has GitHub token
	if user.GitHubToken == "" {
		return utils.BadRequestResponse(c, "User has no GitHub token")
	}

	// Validate the token
	tokenValid := true
	tokenError := ""
	if err := repositoryGitHubService.ValidateGitHubToken(user.GitHubToken); err != nil {
		tokenValid = false
		tokenError = err.Error()
	}

	return utils.SuccessResponseWithData(c, "Token debug info", fiber.Map{
		"user_id":      userID,
		"has_token":    user.GitHubToken != "",
		"token_length": len(user.GitHubToken),
		"token_valid":  tokenValid,
		"token_error":  tokenError,
		"username":     user.Username,
		"email":        user.Email,
	})
}
