package worker

import (
	"breezy/config"
	"breezy/model"
	"context"
	"encoding/json"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo"
)

type Worker struct {
	db        *mongo.Database
	redis     *redis.Client
	config    *config.Environment
	queueName string
}

func NewWorker(db *mongo.Database, redis *redis.Client, config *config.Environment) *Worker {
	return &Worker{
		db:        db,
		redis:     redis,
		config:    config,
		queueName: "build_jobs",
	}
}

func (w *Worker) Start() {
	logrus.Info("Starting build worker...")

	for {
		// Poll for jobs
		job, err := w.getNextJob()
		if err != nil {
			logrus.WithError(err).Error("Failed to get next job")
			time.Sleep(5 * time.Second)
			continue
		}

		if job != nil {
			w.processJob(job)
		} else {
			// No jobs available, wait a bit
			time.Sleep(1 * time.Second)
		}
	}
}

func (w *Worker) getNextJob() (*model.BuildJob, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Get job from Redis queue
	result, err := w.redis.BLPop(ctx, 1*time.Second, w.queueName).Result()
	if err != nil {
		if err == redis.Nil {
			return nil, nil // No jobs available
		}
		return nil, err
	}

	if len(result) < 2 {
		return nil, nil
	}

	// Parse job data
	var job model.BuildJob
	if err := json.Unmarshal([]byte(result[1]), &job); err != nil {
		logrus.WithError(err).Error("Failed to unmarshal job")
		return nil, err
	}

	return &job, nil
}

func (w *Worker) processJob(job *model.BuildJob) {
	logrus.WithField("job_id", job.Id).Info("Processing build job")

	// TODO: Implement build job processing
	// - Clone repository
	// - Build Flutter app
	// - Upload to storage
	// - Update deployment status
	// - Update app URL

	logrus.WithField("job_id", job.Id).Info("Build job completed")
}
