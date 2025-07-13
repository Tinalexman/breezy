package utils

import (
	"github.com/gofiber/fiber/v2"
)

// BreezyResponse represents the standard response structure for all API endpoints
type BreezyResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}

// SuccessResponse creates a successful response with the given message and data
func SuccessResponse(c *fiber.Ctx, statusCode int, message string, data interface{}) error {
	response := BreezyResponse{
		Status:  statusCode,
		Message: message,
		Data:    data,
	}
	return c.Status(statusCode).JSON(response)
}

// ErrorResponse creates an error response with the given status code and message
func ErrorResponse(c *fiber.Ctx, statusCode int, message string) error {
	response := BreezyResponse{
		Status:  statusCode,
		Message: message,
		Data:    nil,
	}
	return c.Status(statusCode).JSON(response)
}

// SuccessResponseWithData creates a successful response with data (defaults to 200 status)
func SuccessResponseWithData(c *fiber.Ctx, message string, data any) error {
	return SuccessResponse(c, fiber.StatusOK, message, data)
}

// BadRequestResponse creates a 400 Bad Request response
func BadRequestResponse(c *fiber.Ctx, message string) error {
	return ErrorResponse(c, fiber.StatusBadRequest, message)
}

// UnauthorizedResponse creates a 401 Unauthorized response
func UnauthorizedResponse(c *fiber.Ctx, message string) error {
	return ErrorResponse(c, fiber.StatusUnauthorized, message)
}

// InternalServerErrorResponse creates a 500 Internal Server Error response
func InternalServerErrorResponse(c *fiber.Ctx, message string) error {
	return ErrorResponse(c, fiber.StatusInternalServerError, message)
}

// NotFoundResponse creates a 404 Not Found response
func NotFoundResponse(c *fiber.Ctx, message string) error {
	return ErrorResponse(c, fiber.StatusNotFound, message)
}
