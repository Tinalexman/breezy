package validation

import (
	"breezy/logger"

	"github.com/go-playground/validator/v10"
)

var log = logger.Logger()

var validate *validator.Validate

func InitializeValidation() {
	validate = validator.New()
}

func GetValidator() *validator.Validate {
	return validate
}
