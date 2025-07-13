# Build System Documentation

## Overview

The build system allows users to deploy Flutter web applications by selecting a GitHub repository. The system clones the repository, builds the Flutter web app, and provides real-time updates via WebSocket.

## Architecture

### Components

1. **WebSocket Service** (`services/websocket.go`)

   - Handles real-time communication with frontend
   - Broadcasts build progress updates
   - Manages client connections

2. **Build Service** (`services/build_service.go`)

   - Handles the actual build process
   - Runs in separate goroutines
   - Manages deployment records

3. **App Controller** (`controller/app_controller.go`)
   - Handles app creation and deployment requests
   - Initiates build process automatically

## API Endpoints

### Create App (with automatic build)

```
POST /api/apps
```

**Request Body:**

```json
{
  "name": "My Flutter App",
  "description": "A sample Flutter web app",
  "repoURL": "https://github.com/username/repo-name",
  "branch": "main"
}
```

**Response:**

```json
{
  "success": true,
  "message": "App created successfully",
  "data": {
    "app": {
      "id": "app_id",
      "name": "My Flutter App",
      "sanitizedName": "my-flutter-app",
      "description": "A sample Flutter web app",
      "isActive": true,
      "createdAt": "2024-01-01T12:00:00Z",
      "buildScheduled": true
    },
    "user_id": "user_id",
    "repo_url": "https://github.com/username/repo-name",
    "branch": "main"
  }
}
```

### Deploy App (manual deployment)

```
POST /api/apps/{appId}/deploy
```

**Request Body:**

```json
{
  "repoURL": "https://github.com/username/repo-name",
  "branch": "main"
}
```

**Response:**

```json
{
  "success": true,
  "message": "App deployment initiated",
  "data": {
    "app_id": "app_id",
    "user_id": "user_id",
    "repo_url": "https://github.com/username/repo-name",
    "branch": "main",
    "status": "pending"
  }
}
```

### Get User Apps

```
GET /api/apps
```

**Response:**

```json
{
  "success": true,
  "message": "User apps retrieved",
  "data": {
    "user_id": "user_id",
    "apps": [
      {
        "id": "app_id",
        "name": "My Flutter App",
        "sanitizedName": "my-flutter-app",
        "description": "A sample Flutter web app",
        "isActive": true,
        "staticFilesURL": "https://my-flutter-app.breezy.app",
        "createdAt": "2024-01-01T12:00:00Z",
        "updatedAt": "2024-01-01T12:00:00Z"
      }
    ],
    "count": 1
  }
}
```

### Get App by ID

```
GET /api/apps/{appId}
```

**Response:**

```json
{
  "success": true,
  "message": "App retrieved",
  "data": {
    "app": {
      "id": "app_id",
      "name": "My Flutter App",
      "sanitizedName": "my-flutter-app",
      "description": "A sample Flutter web app",
      "isActive": true,
      "staticFilesURL": "https://my-flutter-app.breezy.app",
      "createdAt": "2024-01-01T12:00:00Z",
      "updatedAt": "2024-01-01T12:00:00Z"
    },
    "user_id": "user_id"
  }
}
```

### WebSocket Connection

```
GET /ws/builds
```

**Headers:**

```
Authorization: Bearer <jwt_token>
```

## Build Process

1. **Clone Repository** (10% progress)

   - Clones the specified GitHub repository
   - Uses the specified branch

2. **Parse pubspec.yaml** (30% progress)

   - Extracts app name, description, version
   - Validates Flutter project structure

3. **Get Dependencies** (50% progress)

   - Runs `flutter pub get`
   - Installs project dependencies

4. **Build Web App** (70% progress)

   - Runs `flutter build web --release`
   - Creates optimized web build

5. **Upload Artifacts** (90% progress)

   - Uploads build files to storage
   - Generates app URL

6. **Finalize** (95-100% progress)
   - Updates app record
   - Creates deployment record

## WebSocket Messages

### Build Update

```json
{
  "type": "build_update",
  "appId": "app_id",
  "userId": "user_id",
  "status": "building",
  "message": "Building Flutter web app...",
  "progress": 70,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Status Values

- `pending`: Build is queued
- `cloning`: Cloning repository
- `building`: Building the app
- `success`: Build completed successfully
- `failed`: Build failed

## Usage Examples

### Frontend Integration

```javascript
// Create app with automatic build
const createResponse = await fetch("/api/apps", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: "My Flutter App",
    description: "A sample Flutter web app",
    repoURL: "https://github.com/username/flutter-app",
    branch: "main",
  }),
});

const createData = await createResponse.json();
const appId = createData.data.app.id;

// Connect to WebSocket for build updates
const ws = new WebSocket("ws://localhost:6500/ws/builds", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Listen for build updates
ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  if (update.appId === appId) {
    console.log(
      `Build ${update.status}: ${update.message} (${update.progress}%)`
    );

    if (update.status === "success") {
      console.log("App deployed successfully!");
    }
  }
};

// Get user's apps
const appsResponse = await fetch("/api/apps", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const appsData = await appsResponse.json();
console.log("User apps:", appsData.data.apps);
```

## Prerequisites

### System Requirements

- Git installed and in PATH
- Flutter SDK installed and in PATH
- MongoDB running
- Sufficient disk space for builds

### Environment Variables

```env
MONGO_DB_CONNECTION_STRING=mongodb://localhost:27017
MONGO_DB_NAME=breezy
JWT_SECRET=your-secret-key
```

## Error Handling

The system provides detailed error messages for common issues:

- **Git not installed**: "git is not installed or not in PATH"
- **Repository not found**: "Failed to clone repository"
- **Invalid Flutter project**: "Failed to parse pubspec.yaml"
- **Build failure**: "Build failed: [error details]"

## Security

- All WebSocket connections require valid JWT tokens
- Build processes run in isolated directories
- Temporary build files are cleaned up after completion
- User can only access their own build updates and apps

## Monitoring

Build progress is logged with the following information:

- Build start/end times
- Step-by-step progress
- Error details
- Build duration
- Output size
