# Repository Branches Endpoint Documentation

## Overview

The repository branches endpoint allows authenticated users to fetch all branches for a specified GitHub repository. This endpoint is useful for applications that need to display available branches for deployment or branch selection.

## Endpoint Details

### GET `/api/repository/branches`

Fetches all branches for a specified GitHub repository.

#### Authentication

- **Required**: Bearer token in Authorization header
- **Scope**: User must have valid GitHub OAuth token

#### Query Parameters

| Parameter  | Type   | Required | Description                                                        |
| ---------- | ------ | -------- | ------------------------------------------------------------------ |
| `repo_url` | string | Yes      | Full GitHub repository URL (e.g., `https://github.com/owner/repo`) |

#### Request Headers

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

#### Example Request

```bash
curl -X GET "http://localhost:8080/api/repository/branches?repo_url=https://github.com/facebook/react" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

#### Response Format

**Success Response (200 OK)**

```json
{
  "success": true,
  "message": "Repository branches retrieved",
  "data": {
    "user_id": "507f1f77bcf86cd799439011",
    "repo_url": "https://github.com/facebook/react",
    "branches": [
      {
        "name": "main",
        "sha": "a1b2c3d4e5f6789012345678901234567890abcd",
        "commitUrl": "https://api.github.com/repos/facebook/react/commits/a1b2c3d4e5f6789012345678901234567890abcd",
        "protected": true
      },
      {
        "name": "develop",
        "sha": "f1e2d3c4b5a6789012345678901234567890efgh",
        "commitUrl": "https://api.github.com/repos/facebook/react/commits/f1e2d3c4b5a6789012345678901234567890efgh",
        "protected": false
      }
    ],
    "count": 2
  }
}
```

**Error Responses**

| Status Code | Error Type            | Description                           |
| ----------- | --------------------- | ------------------------------------- |
| 400         | Bad Request           | Missing or invalid repository URL     |
| 400         | Bad Request           | GitHub authentication required        |
| 400         | Bad Request           | GitHub token expired or invalid       |
| 400         | Bad Request           | Repository not found or access denied |
| 400         | Bad Request           | Unauthorized access to repository     |
| 401         | Unauthorized          | Invalid or missing access token       |
| 500         | Internal Server Error | GitHub service not initialized        |
| 500         | Internal Server Error | Failed to fetch branches from GitHub  |

#### Error Response Examples

**Missing Repository URL (400)**

```json
{
  "success": false,
  "message": "Repository URL is required"
}
```

**Invalid Repository URL (400)**

```json
{
  "success": false,
  "message": "Invalid GitHub repository URL"
}
```

**Repository Not Found (400)**

```json
{
  "success": false,
  "message": "Repository not found or access denied. Please check the repository URL and your permissions."
}
```

**GitHub Token Expired (400)**

```json
{
  "success": false,
  "message": "GitHub token has expired or is invalid. Please re-authenticate with GitHub."
}
```

## Implementation Details

### Validation

The endpoint includes comprehensive validation:

1. **URL Format Validation**: Ensures the provided URL is a valid GitHub repository URL
2. **Authentication Validation**: Verifies user has a valid access token
3. **GitHub Token Validation**: Checks if the user's GitHub OAuth token is still valid
4. **Repository Access Validation**: Verifies the user has access to the specified repository

### GitHub API Integration

The endpoint uses the GitHub API to fetch branches:

- **API Endpoint**: `GET /repos/{owner}/{repo}/branches`
- **Authentication**: Uses user's GitHub OAuth token
- **Pagination**: Supports up to 100 branches per request
- **Error Handling**: Provides specific error messages for different failure scenarios

### Security Features

1. **Token Validation**: Validates GitHub tokens before making API calls
2. **Access Control**: Ensures users can only access repositories they have permission to view
3. **Error Sanitization**: Provides user-friendly error messages without exposing sensitive information
4. **Token Cleanup**: Automatically clears invalid tokens to force re-authentication

## Usage Examples

### Frontend Integration

```javascript
// Fetch branches for a repository
async function getRepositoryBranches(repoUrl, accessToken) {
  try {
    const response = await fetch(
      `/api/repository/branches?repo_url=${encodeURIComponent(repoUrl)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return data.data.branches;
  } catch (error) {
    console.error("Failed to fetch branches:", error.message);
    throw error;
  }
}

// Usage
const branches = await getRepositoryBranches(
  "https://github.com/facebook/react",
  "your-access-token"
);
console.log(
  "Available branches:",
  branches.map((b) => b.name)
);
```

### Branch Selection for Deployment

```javascript
// Display branches in a dropdown for deployment
function createBranchSelector(branches) {
  const select = document.createElement("select");

  branches.forEach((branch) => {
    const option = document.createElement("option");
    option.value = branch.name;
    option.textContent = `${branch.name} (${branch.sha.substring(0, 8)})`;
    if (branch.protected) {
      option.textContent += " 🔒";
    }
    select.appendChild(option);
  });

  return select;
}
```

## Testing

Use the provided test script `test_branches_endpoint.js` to test the endpoint:

```bash
# Install dependencies
npm install axios

# Run the test
node test_branches_endpoint.js
```

The test script includes:

- Valid repository URL testing
- Invalid URL validation
- Missing parameter handling
- Private repository access testing

## Rate Limiting

The endpoint respects GitHub API rate limits:

- **Authenticated requests**: 5,000 requests per hour
- **Unauthenticated requests**: 60 requests per hour

## Dependencies

- **GitHub API**: For fetching repository branches
- **MongoDB**: For user data and GitHub token storage
- **Fiber**: For HTTP routing and middleware
- **Validation**: Custom validation for URL format and parameters

## Related Endpoints

- `GET /api/repository/` - List user's repositories
- `GET /api/repository/:id` - Get specific repository details
- `POST /api/app/create` - Create app with repository
- `POST /api/app/:id/deploy` - Deploy app from specific branch
