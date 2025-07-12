package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Deployment struct {
	Id               primitive.ObjectID `bson:"_id" json:"id"`
	AppId            primitive.ObjectID `bson:"appId" json:"appId"`
	GitCommitHash    string             `bson:"gitCommitHash" json:"gitCommitHash"`
	GitCommitMessage string             `bson:"gitCommitMessage" json:"gitCommitMessage"`
	Branch           string             `bson:"branch" json:"branch"`
	Status           DeploymentStatus   `bson:"status" json:"status"`
	LogsURL          string             `bson:"logsURL,omitempty" json:"logsURL"`
	StaticFilesURL   string             `bson:"staticFilesURL,omitempty" json:"staticFilesURL"`
	BuildLogs        string             `bson:"buildLogs,omitempty" json:"buildLogs"`
	Error            string             `bson:"error,omitempty" json:"error"`
	CreatedAt        time.Time          `bson:"createdAt" json:"createdAt"`
	FinishedAt       *time.Time         `bson:"finishedAt,omitempty" json:"finishedAt"`
}

type DeploymentStatus string

const (
	DeploymentStatusPending  DeploymentStatus = "pending"
	DeploymentStatusBuilding DeploymentStatus = "building"
	DeploymentStatusSuccess  DeploymentStatus = "success"
	DeploymentStatusFailed   DeploymentStatus = "failed"
)
