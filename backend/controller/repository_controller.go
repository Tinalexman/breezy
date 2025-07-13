package controller

import (
	"breezy/config"
	"breezy/middleware"
	"breezy/services"
	"breezy/utils"
	"breezy/validation"

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
