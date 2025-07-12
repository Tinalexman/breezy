package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CustomDomain struct {
	Id        primitive.ObjectID `bson:"_id" json:"id"`
	AppId     primitive.ObjectID `bson:"appId" json:"appId"`
	Domain    string             `bson:"domain" json:"domain"`
	Status    DomainStatus       `bson:"status" json:"status"`
	CreatedAt time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updatedAt" json:"updatedAt"`
}

type DomainStatus string

const (
	DomainStatusPending DomainStatus = "pending"
	DomainStatusActive  DomainStatus = "active"
	DomainStatusFailed  DomainStatus = "failed"
)
