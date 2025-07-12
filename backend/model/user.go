package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Id           primitive.ObjectID `bson:"_id" json:"id"`
	GitHubID     int64              `bson:"github_id" json:"github_id"`
	FirstName    string             `bson:"firstName" json:"firstName"`
	LastName     string             `bson:"lastName" json:"lastName"`
	Username     string             `bson:"username" json:"username"`
	Email        string             `bson:"email" json:"email"`
	Image        string             `bson:"image" json:"image"`
	Bio          string             `bson:"bio" json:"bio"`
	Verified     bool               `bson:"verified" json:"verified"`
	UserType     string             `bson:"userType" json:"userType"`
	Roles        []string           `bson:"roles" json:"roles"`
	GitHubToken  string             `bson:"github_token,omitempty" json:"-"`
	PasswordHash PasswordHash       `bson:"passwordHash" json:"passwordHash"`
	CreatedAt    time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt    time.Time          `bson:"updatedAt" json:"updatedAt"`
}

type PasswordHash struct {
	Hash string `bson:"hash" json:"hash"`
	Salt string `bson:"salt" json:"salt"`
}
