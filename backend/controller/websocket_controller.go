package controller

import (
	"breezy/services"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func WebSocketController(router fiber.Router, wsService *services.WebSocketService) {
	// WebSocket endpoint for app-specific updates (no middleware)
	router.Get("/app/:appId", websocket.New(wsService.HandleWebSocket))

	// Alternative endpoint without authentication for testing
	router.Get("/test/:appId", websocket.New(wsService.HandleWebSocket))
}
