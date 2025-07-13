package services

import (
	"breezy/logger"
	"breezy/middleware"
	"encoding/json"
	"fmt"
	"sync"
	"time"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

var log = logger.Logger()

type WebSocketService struct {
	clients    map[string]*Client
	broadcast  chan BuildUpdate
	register   chan *Client
	unregister chan *Client
	mutex      sync.RWMutex
	jwtSecret  string
}

type Client struct {
	ID      string
	AppID   string
	UserID  string
	Conn    *websocket.Conn
	Send    chan []byte
	service *WebSocketService
}

type BuildUpdate struct {
	Type      string    `json:"type"`
	AppID     string    `json:"appId"`
	UserID    string    `json:"userId"`
	Status    string    `json:"status"`
	Message   string    `json:"message"`
	Progress  int       `json:"progress,omitempty"`
	Data      any       `json:"data,omitempty"`
	Timestamp time.Time `json:"timestamp"`
}

type BuildStatus string

const (
	BuildStatusPending  BuildStatus = "pending"
	BuildStatusCloning  BuildStatus = "cloning"
	BuildStatusBuilding BuildStatus = "building"
	BuildStatusSuccess  BuildStatus = "success"
	BuildStatusFailed   BuildStatus = "failed"
)

func NewWebSocketService() *WebSocketService {
	return &WebSocketService{
		clients:    make(map[string]*Client),
		broadcast:  make(chan BuildUpdate),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		jwtSecret:  middleware.JWTSecret,
	}
}

func (ws *WebSocketService) Start() {
	for {
		select {
		case client := <-ws.register:
			ws.mutex.Lock()
			ws.clients[client.ID] = client
			ws.mutex.Unlock()
			log.Infof("Client registered: %s (User: %s)", client.ID, client.UserID)

		case client := <-ws.unregister:
			ws.mutex.Lock()
			if _, ok := ws.clients[client.ID]; ok {
				delete(ws.clients, client.ID)
				close(client.Send)
			}
			ws.mutex.Unlock()
			log.Infof("Client unregistered: %s", client.ID)

		case message := <-ws.broadcast:
			ws.mutex.RLock()
			for _, client := range ws.clients {
				// Send to specific user if UserID is set
				if message.UserID != "" && client.UserID == message.UserID {
					select {
					case client.Send <- ws.marshalUpdate(message):
					default:
						close(client.Send)
						delete(ws.clients, client.ID)
					}
				}
			}
			ws.mutex.RUnlock()
		}
	}
}

func (ws *WebSocketService) BroadcastUpdate(update BuildUpdate) {
	ws.broadcast <- update
}

func (ws *WebSocketService) marshalUpdate(update BuildUpdate) []byte {
	data, err := json.Marshal(update)
	if err != nil {
		log.WithError(err).Error("Failed to marshal build update")
		return nil
	}
	return data
}

func (ws *WebSocketService) HandleWebSocket(c *websocket.Conn) {
	// Get token from query parameters
	tokenString := c.Query("token")
	if tokenString == "" {
		log.Error("No token provided in query parameters")
		c.Close()
		return
	}

	// Validate the token
	userID, err := ws.validateToken(tokenString)
	if err != nil {
		log.WithError(err).Error("Token validation failed")
		c.Close()
		return
	}

	// Get app ID from URL parameters (simplified)
	appID := "default"
	if paramAppID := c.Params("appId"); paramAppID != "" {
		appID = paramAppID
	}

	clientID := fmt.Sprintf("%s-%d", userID, time.Now().UnixNano())

	client := &Client{
		ID:      clientID,
		UserID:  userID,
		AppID:   appID,
		Conn:    c,
		Send:    make(chan []byte, 256),
		service: ws,
	}

	log.Infof("New WebSocket connection: User=%s, App=%s, Client=%s", userID, appID, clientID)

	// Register client
	ws.register <- client

	// Send initial connection message
	initialMessage := BuildUpdate{
		Type:      "connection",
		AppID:     appID,
		UserID:    userID,
		Status:    "connected",
		Message:   "WebSocket connection established",
		Timestamp: time.Now(),
	}

	// Send initial message directly to this client
	select {
	case client.Send <- ws.marshalUpdate(initialMessage):
		log.Infof("Sent initial message to client: %s", clientID)
	default:
		log.Warnf("Failed to send initial message to client: %s", clientID)
	}

	// Start goroutines for reading and writing
	go client.writePump()
	go client.readPump()
}

func (c *Client) readPump() {
	defer func() {
		log.Infof("Client readPump ending for client: %s", c.ID)
		c.service.unregister <- c
		c.Conn.Close()
	}()

	c.Conn.SetReadLimit(512)
	c.Conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	c.Conn.SetPongHandler(func(string) error {
		c.Conn.SetReadDeadline(time.Now().Add(60 * time.Second))
		return nil
	})

	for {
		_, _, err := c.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.WithError(err).Error("WebSocket read error")
			} else {
				log.Infof("WebSocket connection closed normally: %v", err)
			}
			break
		}
	}
}

func (c *Client) writePump() {
	ticker := time.NewTicker(54 * time.Second)
	defer func() {
		log.Infof("Client writePump ending for client: %s", c.ID)
		ticker.Stop()
		c.Conn.Close()
	}()

	for {
		select {
		case message, ok := <-c.Send:
			c.Conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if !ok {
				log.Infof("Send channel closed for client: %s", c.ID)
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.Conn.NextWriter(websocket.TextMessage)
			if err != nil {
				log.WithError(err).Errorf("Failed to get writer for client: %s", c.ID)
				return
			}
			w.Write(message)

			if err := w.Close(); err != nil {
				log.WithError(err).Errorf("Failed to close writer for client: %s", c.ID)
				return
			}
		case <-ticker.C:
			c.Conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if err := c.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				log.WithError(err).Errorf("Failed to send ping for client: %s", c.ID)
				return
			}
		}
	}
}

// validateToken validates a JWT token and returns the user ID
func (ws *WebSocketService) validateToken(tokenString string) (string, error) {
	// Parse and validate the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validate the signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}

		// Return the secret key from configuration
		return []byte(ws.jwtSecret), nil
	})

	if err != nil {
		return "", err
	}

	if !token.Valid {
		return "", fmt.Errorf("invalid token")
	}

	// Extract claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		userID := claims["user_id"].(string)
		return userID, nil
	}

	return "", fmt.Errorf("invalid token claims")
}

// WebSocket middleware for Fiber
func WebSocketMiddleware(wsService *WebSocketService) fiber.Handler {
	return func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	}
}
