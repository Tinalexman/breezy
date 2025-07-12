package logger

import (
	"github.com/sirupsen/logrus"
)

func InitializeLogger(debug bool) {
	// Set log level
	if debug {
		logrus.SetLevel(logrus.DebugLevel)
	} else {
		logrus.SetLevel(logrus.InfoLevel)
	}

	// Set log format
	logrus.SetFormatter(&logrus.JSONFormatter{
		TimestampFormat: "2006-01-02T15:04:05Z07:00",
	})

	logrus.Info("Logger initialized")
}
