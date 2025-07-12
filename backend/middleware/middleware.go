package middleware

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
)

func Logger() fiber.Handler {
	return func(c *fiber.Ctx) error {
		start := time.Now()

		err := c.Next()

		latency := time.Since(start)

		logrus.WithFields(logrus.Fields{
			"method":     c.Method(),
			"path":       c.Path(),
			"status":     c.Response().StatusCode(),
			"latency":    latency,
			"user_agent": c.Get("User-Agent"),
			"ip":         c.IP(),
		}).Info("HTTP Request")

		return err
	}
}

func Debug() fiber.Handler {
	return func(c *fiber.Ctx) error {
		logrus.WithFields(logrus.Fields{
			"method": c.Method(),
			"path":   c.Path(),
			"body":   string(c.Body()),
		}).Debug("Request Debug")

		return c.Next()
	}
}
