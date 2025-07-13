# Validation System Documentation

## Overview

The validation system has been refactored to centralize all validation logic in dedicated validation files. This provides better organization, reusability, and separation of concerns.

## Architecture

### Validation Files

1. **`validation/app_validation.go`** - App-related validations
2. **`validation/auth_validation.go`** - Authentication validations
3. **`validation/user_validation.go`** - User profile validations
4. **`validation/deployment_validation.go`** - Deployment validations
5. **`validation/webhook_validation.go`** - Webhook validations

### Validation Flow

1. **Request comes in** → Router
2. **Validation middleware** → Validates request
3. **Validated data stored** → In context
4. **Controller** → Uses validated data from context

## Validation Functions

### App Validations

#### `ValidateCreateAppRequest`

- Validates app creation request
- Checks required fields: `name`, `repoURL`
- Validates GitHub URL format
- Sets default branch to "main"
- **Usage**: `POST /api/apps`

#### `ValidateDeployAppRequest`

- Validates deployment request
- Checks required fields: `repoURL`
- Validates GitHub URL format
- Sets default branch to "main"
- **Usage**: `POST /api/apps/{id}/deploy`

#### `ValidateAppID`

- Validates app ID parameter format
- Ensures valid ObjectID format
- **Usage**: All app endpoints with `{id}` parameter

#### `ValidateAppOwnership`

- Validates that user owns the app
- Converts IDs to ObjectID format
- Stores validated IDs in context
- **Usage**: App endpoints requiring ownership verification

### Auth Validations

#### `ValidateGitHubCallback`

- Validates GitHub OAuth callback
- Checks required fields: `code`, `state`
- **Usage**: `POST /api/auth/github/callback`

#### `ValidateRefreshToken`

- Validates refresh token request
- Checks required fields: `token`
- **Usage**: `POST /api/auth/refresh`

### User Validations

#### `ValidateUpdateUser`

- Validates user profile update
- Checks field lengths and formats
- **Usage**: `PUT /api/users/profile`

#### `ValidateUserID`

- Validates user ID parameter format
- **Usage**: User endpoints with `{id}` parameter

#### `ValidateUserIDFromLocals`

- Validates user ID from JWT context
- **Usage**: All authenticated endpoints

### Deployment Validations

#### `ValidateDeploymentID`

- Validates deployment ID parameter format
- **Usage**: Deployment endpoints with `{id}` parameter

#### `ValidateDeploymentOwnership`

- Validates that user owns the deployment
- **Usage**: Deployment endpoints requiring ownership verification

### Webhook Validations

#### `ValidateGitHubWebhook`

- Validates GitHub webhook signature
- Checks webhook payload format
- **Usage**: `POST /webhooks/github`

## Request Structures

### CreateAppRequest

```go
type CreateAppRequest struct {
    Name        string `json:"name" validate:"required,min=1,max=100"`
    Description string `json:"description" validate:"max=500"`
    RepoURL     string `json:"repoURL" validate:"required,url"`
    Branch      string `json:"branch" validate:"max=50"`
}
```

### DeployAppRequest

```go
type DeployAppRequest struct {
    RepoURL string `json:"repoURL" validate:"required,url"`
    Branch  string `json:"branch" validate:"max=50"`
}
```

### UpdateUser

```go
type UpdateUser struct {
    FirstName string `json:"firstName" validate:"required,min=1,max=50"`
    LastName  string `json:"lastName" validate:"required,min=1,max=50"`
    Username  string `json:"username" validate:"required,min=3,max=30,alphanum"`
    Bio       string `json:"bio" validate:"max=500"`
}
```

## Controller Updates

### App Controller

```go
func AppController(router fiber.Router, database *mongo.Database) {
    router.Post("/", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, validation.ValidateCreateAppRequest, createApp)
    router.Get("/:id", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, validation.ValidateAppID, validation.ValidateAppOwnership, getAppById)
    router.Post("/:id/deploy", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, validation.ValidateAppID, validation.ValidateAppOwnership, validation.ValidateDeployAppRequest, deployApp)
}
```

### Auth Controller

```go
func AuthController(router fiber.Router, env *config.Environment, database *mongo.Database) {
    router.Post("/github/callback", validation.ValidateGitHubCallback, githubCallback)
    router.Post("/refresh", validation.ValidateRefreshToken, refreshToken)
}
```

### User Controller

```go
func UserController(router fiber.Router) {
    router.Put("/profile", middleware.ValidateAccessToken, validation.ValidateUserIDFromLocals, validation.ValidateUpdateUser, updateUserProfile)
}
```

## Controller Function Updates

### Before (with inline validation)

```go
func createApp(c *fiber.Ctx) error {
    var request struct {
        Name    string `json:"name"`
        RepoURL string `json:"repoURL"`
    }

    if err := c.BodyParser(&request); err != nil {
        return utils.BadRequestResponse(c, "Invalid request body")
    }

    if request.Name == "" {
        return utils.BadRequestResponse(c, "App name is required")
    }

    // ... rest of logic
}
```

### After (using validated data)

```go
func createApp(c *fiber.Ctx) error {
    // Get validated request from context
    request := c.Locals("validated_request").(validation.CreateAppRequest)

    // ... rest of logic using validated data
}
```

## Benefits

1. **Separation of Concerns**: Validation logic is separate from business logic
2. **Reusability**: Validation functions can be reused across endpoints
3. **Consistency**: Standardized validation across all endpoints
4. **Maintainability**: Easier to update validation rules
5. **Type Safety**: Strongly typed request structures
6. **Error Handling**: Centralized error messages

## Error Messages

Validation errors provide clear, user-friendly messages:

- **Missing required fields**: "Validation failed: [field] is required"
- **Invalid format**: "Invalid [field] format"
- **Length violations**: "Validation failed: [field] must be between X and Y characters"
- **URL validation**: "Invalid GitHub repository URL"

## Usage Examples

### Frontend Integration

```javascript
// Create app with validation
const response = await fetch("/api/apps", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: "My App",
    description: "A sample app",
    repoURL: "https://github.com/username/repo",
    branch: "main",
  }),
});

if (!response.ok) {
  const error = await response.json();
  console.error("Validation error:", error.message);
}
```

## Testing

Validation functions can be tested independently:

```go
func TestValidateCreateAppRequest(t *testing.T) {
    // Test valid request
    // Test invalid request
    // Test missing required fields
    // Test invalid GitHub URL
}
```

## Future Enhancements

1. **Custom Validation Tags**: Add custom validation rules
2. **Internationalization**: Support multiple languages for error messages
3. **Validation Caching**: Cache validation results for performance
4. **Async Validation**: Support async validation (e.g., database checks)
5. **Validation Groups**: Group validations for different scenarios
