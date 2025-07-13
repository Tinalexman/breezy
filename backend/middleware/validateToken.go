package middleware

import (
	"strings"

	"breezy/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/sirupsen/logrus"
)

// JWTSecret holds the JWT secret key for token validation
var JWTSecret string

// SetJWTSecret sets the JWT secret for token validation
func SetJWTSecret(secret string) {
	JWTSecret = secret
}

func ValidateAccessToken(c *fiber.Ctx) error {
	authHeader := c.Get("Authorization")
	if authHeader == "" {
		return utils.UnauthorizedResponse(c, "Authorization header is required")
	}

	// Check if the header starts with "Bearer "
	if !strings.HasPrefix(authHeader, "Bearer ") {
		return utils.UnauthorizedResponse(c, "Invalid authorization header format")
	}

	// Extract the token
	tokenString := strings.TrimPrefix(authHeader, "Bearer ")

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
		logrus.WithError(err).Error("Token validation failed")
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
