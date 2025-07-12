package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Repository struct {
	Id            primitive.ObjectID `bson:"_id" json:"id"`
	GitHubRepoId  int64              `bson:"githubRepoId" json:"githubRepoId"`
	Owner         string             `bson:"owner" json:"owner"`
	Name          string             `bson:"name" json:"name"`
	FullName      string             `bson:"fullName" json:"fullName"`
	Description   string             `bson:"description" json:"description"`
	DefaultBranch string             `bson:"defaultBranch" json:"defaultBranch"`
	CloneURL      string             `bson:"cloneURL" json:"cloneURL"`
	Private       bool               `bson:"private" json:"private"`
	CreatedAt     time.Time          `bson:"createdAt" json:"createdAt"`
}
