package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type BuildJob struct {
	Id           string             `json:"id"`
	AppId        primitive.ObjectID `json:"appId"`
	RepositoryId primitive.ObjectID `json:"repositoryId"`
	UserId       primitive.ObjectID `json:"userId"`
	RepoURL      string             `json:"repoURL"`
	CommitHash   string             `json:"commitHash"`
	Branch       string             `json:"branch"`
	DeploymentId primitive.ObjectID `json:"deploymentId"`
	CreatedAt    time.Time          `json:"createdAt"`
}

type GitHubWebhookPayload struct {
	Ref        string `json:"ref"`
	Before     string `json:"before"`
	After      string `json:"after"`
	Repository struct {
		Id       int64  `json:"id"`
		Name     string `json:"name"`
		FullName string `json:"full_name"`
		Private  bool   `json:"private"`
		Owner    struct {
			Login string `json:"login"`
		} `json:"owner"`
	} `json:"repository"`
	Commits []struct {
		Id      string `json:"id"`
		Message string `json:"message"`
	} `json:"commits"`
	HeadCommit struct {
		Id      string `json:"id"`
		Message string `json:"message"`
	} `json:"head_commit"`
}
