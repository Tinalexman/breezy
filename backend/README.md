# Breezy Backend

A MongoDB-based backend for the Breezy Flutter Web Sharing Platform. This service handles user authentication, GitHub integration, Flutter app building, and deployment to Cloudflare CDN.

## Architecture

### Core Components

- **API Gateway**: HTTP server built with Gin that handles all external requests
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
# MongoDB
MONGO_URI=mongodb://localhost:27017
MONGO_DATABASE=breezy

# Redis
REDIS_ADDR=localhost:6379

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Cloudflare
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ZONE_ID=your_cloudflare_zone_id
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
```

### 4. Start Services

Start MongoDB and Redis:

```bash
# Using Docker
docker run -d --name mongodb -p 27017:27017 mongo:latest
docker run -d --name redis -p 6379:6379 redis:alpine
```

### 5. Run the Application

```bash
go run main.go
```

The server will start on `http://localhost:8080`

## API Endpoints

### Authentication

- `GET /auth/github` - GitHub OAuth login
- `GET /auth/github/callback` - OAuth callback

### User Management

- `GET /api/user` - Get current user
- `GET /api/user/repos` - List user repositories

### App Management

- `POST /api/app/create` - Create new app
- `GET /api/app/:id` - Get app details
- `GET /api/app/:id/deployments` - List app deployments
- `POST /api/app/:id/deploy` - Trigger deployment
- `DELETE /api/app/:id` - Delete app

### Deployment

- `GET /api/deployment/:id` - Get deployment details
- `GET /api/deployment/:id/logs` - Get build logs

### Webhooks

- `POST /webhooks/github` - GitHub webhook receiver

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
├── internal/
│   ├── api/               # HTTP API handlers
│   ├── config/            # Configuration management
│   ├── database/          # MongoDB operations
│   ├── models/            # Data models
│   ├── queue/             # Redis job queue
│   ├── storage/           # Cloudflare CDN operations
│   └── worker/            # Build worker
├── Dockerfile             # Container definition
└── env.example           # Environment variables template
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

- `MONGO_URI`: MongoDB connection string
- `REDIS_ADDR`: Redis server address
- `GITHUB_CLIENT_ID`: GitHub OAuth app client ID
- `GITHUB_CLIENT_SECRET`: GitHub OAuth app client secret
- `JWT_SECRET`: Secret key for JWT tokens
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token
- `CLOUDFLARE_ZONE_ID`: Cloudflare zone ID
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

[Add your license here]
