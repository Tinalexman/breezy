package controller

import (
	"breezy/config"
	"breezy/services"
	"breezy/utils"
	"breezy/validation"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	githubService *services.GitHubService
	configEnv     *config.Environment
)

func AuthController(router fiber.Router, env *config.Environment, database *mongo.Database) {
	configEnv = env
	githubService = services.NewGitHubService(env, database)

	router.Get("/github", githubAuth)
	router.Post("/github/callback", validation.ValidateGitHubCallback, githubCallback)
	router.Post("/refresh", validation.ValidateRefreshToken, refreshToken)
}

func githubAuth(c *fiber.Ctx) error {
	if githubService == nil {
		return utils.InternalServerErrorResponse(c, "GitHub service not initialized")
	}

	authURL, state := githubService.GetAuthURL()

	return utils.SuccessResponseWithData(c, "GitHub auth initiated", fiber.Map{
		"auth_url":     authURL,
		"redirect_url": configEnv.GitHub.RedirectURL,
		"state":        state,
	})
}

func githubCallback(c *fiber.Ctx) error {
	if githubService == nil {
		return utils.InternalServerErrorResponse(c, "GitHub service not initialized")
	}

	// Get validated request from context
	callback := c.Locals("validated_request").(validation.GitHubCallbackRequest)

	// Exchange code for access token
	tokenResp, err := githubService.ExchangeCodeForToken(callback.Code)
	if err != nil {
		logrus.Printf("Failed to exchange code for token: %v", err)
		return utils.InternalServerErrorResponse(c, "Failed to authenticate with GitHub")
	}

	if tokenResp.AccessToken == "" {
		return utils.BadRequestResponse(c, "No access token received from GitHub")
	}

	// Get user information from GitHub
	githubUser, err := githubService.GetUserInfo(tokenResp.AccessToken)
	if err != nil {
		logrus.Printf("Failed to get user info: %v", err)
		return utils.InternalServerErrorResponse(c, "Failed to get user information from GitHub")
	}

	// Get user's email if not provided
	if githubUser.Email == "" {
		email, err := githubService.GetUserEmail(tokenResp.AccessToken)
		if err != nil {
			logrus.Printf("Failed to get user email: %v", err)
		} else {
			githubUser.Email = email
		}
	}

	// Create or update user in database
	user, err := githubService.CreateOrUpdateUser(githubUser, tokenResp.AccessToken)
	if err != nil {
		logrus.Printf("Failed to create/update user: %v", err)
		return utils.InternalServerErrorResponse(c, "Failed to save user information")
	}

	// Generate JWT token
	token, err := utils.GenerateToken(user.Id.Hex(), configEnv.AppData.JWTSecret)
	if err != nil {
		logrus.Printf("Failed to generate JWT token: %v", err)
		return utils.InternalServerErrorResponse(c, "Failed to generate authentication token")
	}

	// Return user session
	return utils.SuccessResponseWithData(c, "GitHub authentication successful", fiber.Map{
		"user": fiber.Map{
			"id":        user.Id.Hex(),
			"firstName": user.FirstName,
			"lastName":  user.LastName,
			"username":  user.Username,
			"email":     user.Email,
			"image":     user.Image,
			"verified":  user.Verified,
			"userType":  user.UserType,
			"roles":     user.Roles,
		},
		"token": token,
		"session": fiber.Map{
			"expires_in": 86400, // 24 hours
			"token_type": "Bearer",
		},
	})
}

func refreshToken(c *fiber.Ctx) error {
	// Get user ID from context (set by middleware)
	userID := c.Locals("user_id")
	if userID == nil {
		return utils.UnauthorizedResponse(c, "User not authenticated")
	}

	// Get validated request from context
	request := c.Locals("validated_request").(validation.RefreshTokenRequest)

	// Get user from database to ensure they still exist
	user, err := githubService.GetUserByID(userID.(string))
	if err != nil {
		logrus.Printf("Failed to get user for token refresh: %v", err)
		return utils.UnauthorizedResponse(c, "User not found")
	}

	// Validate the refresh token (in a real implementation, you'd verify the token)
	// For now, we'll just use the token from the request
	if request.Token == "" {
		return utils.BadRequestResponse(c, "Refresh token is required")
	}

	// Generate new JWT token
	newToken, err := utils.GenerateToken(user.Id.Hex(), configEnv.AppData.JWTSecret)
	if err != nil {
		logrus.Printf("Failed to generate refresh token: %v", err)
		return utils.InternalServerErrorResponse(c, "Failed to generate new authentication token")
	}

	return utils.SuccessResponseWithData(c, "Token refreshed successfully", fiber.Map{
		"user": fiber.Map{
			"id":        user.Id.Hex(),
			"firstName": user.FirstName,
			"lastName":  user.LastName,
			"username":  user.Username,
			"email":     user.Email,
			"image":     user.Image,
			"verified":  user.Verified,
			"userType":  user.UserType,
			"roles":     user.Roles,
		},
		"token": newToken,
		"session": fiber.Map{
			"expires_in":   86400, // 24 hours
			"token_type":   "Bearer",
			"refreshed_at": time.Now().Format(time.RFC3339),
		},
	})
}
