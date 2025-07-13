package services

import (
	"breezy/config"
	"breezy/model"
	"breezy/utils"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type GitHubService struct {
	config *config.Environment
	db     *mongo.Database
}

type GitHubUser struct {
	ID        int64  `json:"id"`
	Login     string `json:"login"`
	Email     string `json:"email"`
	AvatarURL string `json:"avatar_url"`
	Name      string `json:"name"`
}

type GitHubRepository struct {
	ID            int64  `json:"id"`
	Name          string `json:"name"`
	FullName      string `json:"full_name"`
	Description   string `json:"description"`
	Private       bool   `json:"private"`
	Fork          bool   `json:"fork"`
	DefaultBranch string `json:"default_branch"`
	Language      string `json:"language"`
	Size          int    `json:"size"`
	Stars         int    `json:"stargazers_count"`
	Forks         int    `json:"forks_count"`
	Watchers      int    `json:"watchers_count"`
	OpenIssues    int    `json:"open_issues_count"`
	CreatedAt     string `json:"created_at"`
	UpdatedAt     string `json:"updated_at"`
	PushedAt      string `json:"pushed_at"`
	CloneURL      string `json:"clone_url"`
	SSHURL        string `json:"ssh_url"`
	HTMLURL       string `json:"html_url"`
	Homepage      string `json:"homepage"`
	Archived      bool   `json:"archived"`
	Disabled      bool   `json:"disabled"`
}

type GitHubTokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	Scope       string `json:"scope"`
}

func NewGitHubService(config *config.Environment, database *mongo.Database) *GitHubService {
	return &GitHubService{
		config: config,
		db:     database,
	}
}

// GetAuthURL generates the GitHub OAuth authorization URL
func (g *GitHubService) GetAuthURL() (string, string) {
	state := utils.GenerateRandomString(32)
	params := url.Values{}
	params.Add("client_id", g.config.GitHub.ClientID)
	params.Add("redirect_uri", g.config.GitHub.RedirectURL)
	params.Add("scope", "repo user")
	params.Add("state", state)

	return fmt.Sprintf("https://github.com/login/oauth/authorize?%s", params.Encode()), state
}

// ExchangeCodeForToken exchanges the authorization code for an access token
func (g *GitHubService) ExchangeCodeForToken(code string) (*GitHubTokenResponse, error) {
	data := url.Values{}
	data.Set("client_id", g.config.GitHub.ClientID)
	data.Set("client_secret", g.config.GitHub.ClientSecret)
	data.Set("code", code)
	data.Set("redirect_uri", g.config.GitHub.RedirectURL)

	req, err := http.NewRequest("POST", "https://github.com/login/oauth/access_token", strings.NewReader(data.Encode()))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Accept", "application/json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var tokenResp GitHubTokenResponse
	if err := json.NewDecoder(resp.Body).Decode(&tokenResp); err != nil {
		return nil, err
	}

	return &tokenResp, nil
}

// GetUserInfo fetches user information from GitHub API
func (g *GitHubService) GetUserInfo(accessToken string) (*GitHubUser, error) {
	req, err := http.NewRequest("GET", "https://api.github.com/user", nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Authorization", "token "+accessToken)
	req.Header.Set("Accept", "application/vnd.github.v3+json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var user GitHubUser
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return nil, err
	}

	return &user, nil
}

// GetUserEmail fetches the user's email from GitHub API
func (g *GitHubService) GetUserEmail(accessToken string) (string, error) {
	req, err := http.NewRequest("GET", "https://api.github.com/user/emails", nil)
	if err != nil {
		return "", err
	}

	req.Header.Set("Authorization", "token "+accessToken)
	req.Header.Set("Accept", "application/vnd.github.v3+json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var emails []struct {
		Email   string `json:"email"`
		Primary bool   `json:"primary"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&emails); err != nil {
		return "", err
	}

	// Find primary email
	for _, email := range emails {
		if email.Primary {
			return email.Email, nil
		}
	}

	// Fallback to first email
	if len(emails) > 0 {
		return emails[0].Email, nil
	}

	return "", fmt.Errorf("no email found")
}

// CreateOrUpdateUser creates or updates a user in the database
func (g *GitHubService) CreateOrUpdateUser(githubUser *GitHubUser, accessToken string) (*model.User, error) {
	collection := g.db.Collection("users")

	// Check if user already exists
	var existingUser model.User
	err := collection.FindOne(context.Background(), bson.M{"github_id": githubUser.ID}).Decode(&existingUser)

	if err == mongo.ErrNoDocuments {
		// Create new user
		user := model.User{
			Id:        primitive.NewObjectID(),
			GitHubID:  githubUser.ID,
			FirstName: strings.Split(githubUser.Name, " ")[0],
			LastName: func() string {
				parts := strings.Split(githubUser.Name, " ")
				if len(parts) > 1 {
					return strings.Join(parts[1:], " ")
				}
				return ""
			}(),
			Username:    githubUser.Login,
			Email:       githubUser.Email,
			Image:       githubUser.AvatarURL,
			Verified:    true,
			UserType:    "developer",
			Roles:       []string{"user"},
			GitHubToken: accessToken, // TODO: Encrypt this token
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		}

		_, err = collection.InsertOne(context.Background(), user)
		if err != nil {
			return nil, err
		}

		return &user, nil
	} else if err != nil {
		return nil, err
	}

	// Update existing user
	update := bson.M{
		"$set": bson.M{
			"firstName": strings.Split(githubUser.Name, " ")[0],
			"lastName": func() string {
				parts := strings.Split(githubUser.Name, " ")
				if len(parts) > 1 {
					return strings.Join(parts[1:], " ")
				}
				return ""
			}(),
			"username":    githubUser.Login,
			"email":       githubUser.Email,
			"image":       githubUser.AvatarURL,
			"githubToken": accessToken, // TODO: Encrypt this token
			"updatedAt":   time.Now(),
		},
	}

	_, err = collection.UpdateOne(context.Background(), bson.M{"_id": existingUser.Id}, update)
	if err != nil {
		return nil, err
	}

	// Update the existing user object
	existingUser.FirstName = strings.Split(githubUser.Name, " ")[0]
	existingUser.LastName = func() string {
		parts := strings.Split(githubUser.Name, " ")
		if len(parts) > 1 {
			return strings.Join(parts[1:], " ")
		}
		return ""
	}()
	existingUser.Username = githubUser.Login
	existingUser.Email = githubUser.Email
	existingUser.Image = githubUser.AvatarURL
	existingUser.GitHubToken = accessToken
	existingUser.UpdatedAt = time.Now()

	return &existingUser, nil
}

// GetUserByID retrieves a user from the database by their ID
func (g *GitHubService) GetUserByID(userID string) (*model.User, error) {
	collection := g.db.Collection("users")

	// Convert string ID to ObjectID
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, err
	}

	var user model.User
	err = collection.FindOne(context.Background(), bson.M{"_id": objectID}).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

// GetUserRepositories fetches repositories from GitHub API for a given user
func (g *GitHubService) GetUserRepositories(userID string) ([]GitHubRepository, error) {
	// Get user from database to access their GitHub token
	user, err := g.GetUserByID(userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %v", err)
	}

	if user.GitHubToken == "" {
		return nil, fmt.Errorf("user has no GitHub token")
	}

	// Fetch repositories from GitHub API
	req, err := http.NewRequest("GET", "https://api.github.com/user/repos", nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Authorization", "token "+user.GitHubToken)
	req.Header.Set("Accept", "application/vnd.github.v3+json")

	// Add query parameters for better results
	q := req.URL.Query()
	q.Add("sort", "updated")
	q.Add("per_page", "100") // Get up to 100 repos
	req.URL.RawQuery = q.Encode()

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("GitHub API returned status: %d", resp.StatusCode)
	}

	var repositories []GitHubRepository
	if err := json.NewDecoder(resp.Body).Decode(&repositories); err != nil {
		return nil, err
	}

	return repositories, nil
}
