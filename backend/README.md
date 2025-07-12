# Breezy Backend

A MongoDB-based backend for the Breezy Flutter Web Sharing Platform. This service handles user authentication, GitHub integration, Flutter app building, and deployment to Cloudflare CDN.

## Architecture

### Core Components

- **API Gateway**: HTTP server built with Fiber that handles all external requests
- **MongoDB**: Document database for storing users, apps, repositories, and deployments
- **Redis**: Job queue for asynchronous build processing
- **Build Workers**: Docker-based Flutter build system
- **Cloudflare CDN**: Direct file serving and DNS management
- **GitHub Integration**: OAuth and webhook handling

### Data Models

- **Users**: GitHub OAuth users with encrypted tokens
- **Repositories**: GitHub repositories linked to users
- **Apps**: Flutter applications with deployment history
- **Deployments**: Build instances with status tracking
- **Custom Domains**: Custom domain management (future)

## Features

- 🔐 GitHub OAuth authentication
- 🚀 Automatic Flutter web builds via Docker
- 📦 Cloudflare CDN integration
- 🔄 Real-time build status updates
- 🌐 Custom domain support (planned)
- 📊 Deployment history and logs
- 🔗 GitHub webhook integration

## Prerequisites

- Go 1.22+
- MongoDB 5.0+
- Redis 6.0+
- Docker (for build workers)
- Cloudflare account with API access
- GitHub OAuth app

## Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd breezy-backend
```

### 2. Install Dependencies

```bash
go mod tidy
```

### 3. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Application Configuration
APPLICATION_NAME=Breezy Backend
APPLICATION_ENV=development
APPLICATION_PORT=8080
DEBUG=true
JWT_SECRET=your-secret-key-change-this-in-production

# Database Configuration
MONGO_DB_CONNECTION_STRING=mongodb://localhost:27017
MONGO_DB_NAME=breezy

# Domain Configuration
APP_DOMAIN=breezy.app
FRONTEND_URL=http://localhost:3000

# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_REDIRECT_URL=http://localhost:3000/auth/github/callback

# Cloudflare Configuration
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
CLOUDFLARE_ZONE_ID=your-cloudflare-zone-id
CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id

# Redis Configuration
REDIS_ADDR=localhost:6379
REDIS_PASSWORD=
REDIS_DB=0

# Docker Configuration
DOCKER_HOST=unix:///var/run/docker.sock
```

### 4. Start Services

Start MongoDB and Redis:

```bash
# Using Docker
docker run -d --name mongodb -p 27017:27017 mongo:latest
docker run -d --name redis -p 6379:6379 redis:alpine
```

### 5. Run the Application

#### Development (with Air - Hot Reload)

First, install Air for hot reloading:

```bash
# Install Air globally
go install github.com/cosmtrek/air@latest

# Run with Air (watches for file changes and restarts automatically)
air
```

#### Production

```bash
go run main.go
```

The server will start on `http://localhost:8080`

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/github` - GitHub OAuth login
- `POST /api/auth/github/callback` - OAuth callback
- `POST /api/auth/refresh` - Token refresh

### User Management

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/repos` - List user repositories

### App Management

- `POST /api/apps` - Create new app
- `GET /api/apps` - List user apps
- `GET /api/apps/:id` - Get app details
- `PUT /api/apps/:id` - Update app
- `DELETE /api/apps/:id` - Delete app
- `POST /api/apps/:id/deploy` - Trigger deployment
- `GET /api/apps/:id/status` - Get app status

### Repository Management

- `GET /api/repositories` - List user repositories
- `GET /api/repositories/:id` - Get repository details

### Deployment Management

- `GET /api/deployments` - List user deployments
- `GET /api/deployments/:id` - Get deployment details
- `GET /api/deployments/:id/logs` - Get build logs

### Webhooks

- `POST /webhooks/github` - GitHub webhook receiver

### Health Check

- `GET /health` - Application health endpoint

## Docker Deployment

### Build Image

```bash
docker build -t breezy-backend .
```

### Run Container

```bash
docker run -d \
  --name breezy-backend \
  -p 8080:8080 \
  --env-file .env \
  -v /var/run/docker.sock:/var/run/docker.sock \
  breezy-backend
```

## Development

### Project Structure

```
├── main.go                 # Application entry point
├── config/                 # Configuration management
│   ├── env_config.go      # Environment variables with Viper
│   └── mongo_config.go    # MongoDB connection setup
├── controller/             # HTTP request handlers
│   ├── index.go           # Controller initialization
│   ├── auth_controller.go # Authentication endpoints
│   ├── user_controller.go # User management
│   ├── app_controller.go  # App CRUD operations
│   ├── repository_controller.go # Repository management
│   ├── deployment_controller.go # Deployment tracking
│   └── webhook_controller.go   # GitHub webhook handling
├── middleware/             # Request processing middleware
│   ├── middleware.go      # Request logging and debugging
│   ├── validateToken.go   # JWT token validation
│   └── verifyRole.go      # Role-based access control
├── model/                 # Data models and schemas
│   ├── user.go           # User authentication model
│   ├── app.go            # App management model
│   ├── repository.go     # Repository model
│   ├── deployment.go     # Deployment model
│   ├── custom_domain.go  # Custom domain model
│   └── build_job.go      # Build job model
├── repository/            # Data access layer
│   └── index.go          # Repository initialization with indexes
├── validation/            # Request validation
│   ├── index.go          # Validation initialization
│   └── user_validation.go # User input validation
├── utils/                 # Shared utilities
│   ├── jwt.go            # JWT token utilities
│   └── utils.go          # General utilities
├── worker/                # Background job processing
│   └── index.go          # Worker pool implementation
├── logger/                # Logging utilities
│   └── log.go            # Logger configuration
├── template/              # Email and HTML templates
├── templates/             # Additional templates
├── .air.toml             # Air configuration for hot reload
├── Dockerfile            # Container definition
└── env.example           # Environment variables template
```

### Development with Air

Air provides hot reloading during development. The `.air.toml` file is configured to:

- Watch for changes in `.go` files
- Exclude test files and temporary directories
- Automatically rebuild and restart the application
- Show colored output for different operations

To use Air:

```bash
# Install Air (if not already installed)
go install github.com/cosmtrek/air@latest

# Start development server with hot reload
air
```

### Running Tests

```bash
go test ./...
```

### Code Generation

```bash
# Generate mocks (if using mockery)
mockery --all
```

## Production Deployment

### Environment Variables

Ensure all required environment variables are set:

- `APPLICATION_NAME`: Application name
- `APPLICATION_ENV`: Environment (development/production)
- `APPLICATION_PORT`: Server port
- `DEBUG`: Debug mode flag
- `JWT_SECRET`: Secret key for JWT tokens
- `MONGO_DB_CONNECTION_STRING`: MongoDB connection string
- `MONGO_DB_NAME`: Database name
- `APP_DOMAIN`: Application domain
- `FRONTEND_URL`: Frontend URL for OAuth redirects
- `GITHUB_CLIENT_ID`: GitHub OAuth app client ID
- `GITHUB_CLIENT_SECRET`: GitHub OAuth app client secret
- `GITHUB_REDIRECT_URL`: GitHub OAuth redirect URL
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token
- `CLOUDFLARE_ZONE_ID`: Cloudflare zone ID
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID
- `REDIS_ADDR`: Redis server address
- `REDIS_PASSWORD`: Redis password
- `REDIS_DB`: Redis database number
- `DOCKER_HOST`: Docker host address

### Security Considerations

1. **Encrypt sensitive data**: GitHub tokens should be encrypted in the database
2. **Use strong JWT secrets**: Generate cryptographically secure secrets
3. **Validate webhook signatures**: Implement proper GitHub webhook signature verification
4. **Rate limiting**: Implement API rate limiting
5. **HTTPS only**: Use HTTPS in production

### Scaling

- **Horizontal scaling**: Deploy multiple API instances behind a load balancer
- **Worker scaling**: Scale build workers independently based on queue length
- **Database scaling**: Use MongoDB replica sets for high availability
- **Cache scaling**: Use Redis clusters for high availability

## Monitoring

### Health Checks

- `GET /health` - Application health endpoint

### Logging

The application uses structured logging with logrus. Configure log levels via the `DEBUG` environment variable.

### Metrics

Consider adding Prometheus metrics for:

- Build queue length
- Build success/failure rates
- API response times
- Database connection status

## Troubleshooting

### Common Issues

1. **Docker connection failed**: Ensure Docker daemon is running and accessible
2. **MongoDB connection failed**: Check MongoDB server and connection string
3. **Redis connection failed**: Verify Redis server is running
4. **Build failures**: Check Flutter SDK and dependencies in build container
5. **Cloudflare upload failures**: Verify Cloudflare API credentials and permissions

### Debug Mode

Enable debug mode for detailed logging:

```bash
DEBUG=true go run main.go
```

### Air Issues

If Air is not working properly:

1. **Check Air installation**: `air -v`
2. **Verify configuration**: Check `.air.toml` file
3. **Clear temporary files**: `rm -rf tmp/`
4. **Check file permissions**: Ensure Air can read/write in the project directory
