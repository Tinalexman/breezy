package middleware

import (
	"github.com/gofiber/fiber/v2"
)

func EnsureVerifiedUser(c *fiber.Ctx) error {
	// TODO: Implement user verification check
	// For now, just pass through
	return c.Next()
}

func RequireRole(role string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// TODO: Implement role checking logic
		// For now, just pass through
		return c.Next()
	}
}
