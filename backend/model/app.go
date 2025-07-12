package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type App struct {
	Id                  primitive.ObjectID  `bson:"_id" json:"id"`
	UserId              primitive.ObjectID  `bson:"userId" json:"userId"`
	RepositoryId        primitive.ObjectID  `bson:"repositoryId" json:"repositoryId"`
	Name                string              `bson:"name" json:"name"`
	SanitizedName       string              `bson:"sanitizedName" json:"sanitizedName"`
	Description         string              `bson:"description" json:"description"`
	CurrentDeploymentId *primitive.ObjectID `bson:"currentDeploymentId,omitempty" json:"currentDeploymentId"`
	CustomDomainId      *primitive.ObjectID `bson:"customDomainId,omitempty" json:"customDomainId"`
	StaticFilesURL      string              `bson:"staticFilesURL,omitempty" json:"staticFilesURL"`
	IsActive            bool                `bson:"isActive" json:"isActive"`
	CreatedAt           time.Time           `bson:"createdAt" json:"createdAt"`
	UpdatedAt           time.Time           `bson:"updatedAt" json:"updatedAt"`
}
