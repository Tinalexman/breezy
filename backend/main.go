package main

import (
	"context"
	"time"

	// "github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"

	"breezy/config"
	"breezy/controller"
	"breezy/logger"
	"breezy/middleware"
	"breezy/repository"
	"breezy/utils"
	"breezy/validation"
	// "breezy/worker"
)

var log = logger.Logger()

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Warn("No .env file found, using environment variables")
	}

	// Load configuration
	env := config.LoadEnvironment()

	// Initialize validation
	validation.InitializeValidation()

	// Set JWT secret for middleware
	middleware.SetJWTSecret(env.AppData.JWTSecret)

	// Initialize MongoDB connection
	mongoClient, err := config.ConnectToMongoDB(env.Database.ConnectionString)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}
	defer func() {
		if err := mongoClient.Disconnect(context.Background()); err != nil {
			log.Errorf("Failed to disconnect from MongoDB: %v", err)
		}
	}()

	// Get database
	db := config.GetDatabase(mongoClient, env.Database.Name)

	// Initialize repositories
	repository.InitializeRepositories(db)

	// Initialize Redis connection
	// redisClient := redis.NewClient(&redis.Options{
	// 	Addr:     env.Redis.Addr,
	// 	Password: env.Redis.Password,
	// 	DB:       env.Redis.DB,
	// })
	// defer redisClient.Close()

	// Test Redis connection
	// ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	// defer cancel()
	// if err := redisClient.Ping(ctx).Err(); err != nil {
	// 	log.Fatalf("Failed to connect to Redis: %v", err)
	// }
	// log.Info("Connected to Redis successfully")

	// // Initialize build worker
	// buildWorker := worker.NewWorker(db, redisClient, env)
	// go buildWorker.Start()

	// Initialize Fiber app
	app := fiber.New(fiber.Config{
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			log.WithError(err).Error("Fiber error")
			return utils.InternalServerErrorResponse(c, "Internal server error")
		},
		Prefork: true,
	})

	// Add middleware
	app.Use(recover.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin,Content-Type,Accept,Authorization",
	}))
	app.Use(middleware.DisplayRequest)

	// Initialize controllers
	controller.InitializeControllers(app, env, db)

	// Health check endpoint
	app.Get("/health", func(c *fiber.Ctx) error {
		return utils.SuccessResponseWithData(c, "Server is healthy", fiber.Map{
			"status": "healthy",
			"time":   time.Now().Format(time.RFC3339),
		})
	})

	// Start server
	port := env.AppData.Port
	if port == "" {
		port = "6500"
	}

	log.Infof("Starting Breezy backend server on port %s", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
