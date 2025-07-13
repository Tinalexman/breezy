package middleware

import (
	"strings"

	"breezy/utils"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/sirupsen/logrus"
)

// ValidateWebSocketToken handles authentication for WebSocket connections
func ValidateWebSocketToken(c *fiber.Ctx) error {
	// For WebSocket connections, we need to allow the upgrade first
	// and then validate the token in the WebSocket handler
	if websocket.IsWebSocketUpgrade(c) {
		// Store the token for later validation in the WebSocket handler
		tokenString := c.Query("token")
		if tokenString == "" {
			authHeader := c.Get("Authorization")
			if authHeader != "" && strings.HasPrefix(authHeader, "Bearer ") {
				tokenString = strings.TrimPrefix(authHeader, "Bearer ")
			}
		}

		if tokenString != "" {
			c.Locals("ws_token", tokenString)
		}

		return c.Next()
	}

	// For non-WebSocket requests, validate normally
	tokenString := c.Query("token")
	if tokenString == "" {
		authHeader := c.Get("Authorization")
		if authHeader != "" && strings.HasPrefix(authHeader, "Bearer ") {
			tokenString = strings.TrimPrefix(authHeader, "Bearer ")
		}
	}

	if tokenString == "" {
		return utils.UnauthorizedResponse(c, "Token is required for WebSocket connection")
	}

	// Parse and validate the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validate the signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}

		// Return the secret key from configuration
		return []byte(JWTSecret), nil
	})

	if err != nil {
		logrus.WithError(err).Error("WebSocket token validation failed")
		return utils.UnauthorizedResponse(c, "Invalid token")
	}

	if !token.Valid {
		return utils.UnauthorizedResponse(c, "Invalid token")
	}

	// Extract claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		userID := claims["user_id"].(string)
		c.Locals("user_id", userID)
	}

	return c.Next()
}
