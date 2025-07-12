package config

import (
	"log"

	"github.com/spf13/viper"
)

type Environment struct {
	AppData    AppData
	Database   Database
	Domain     Domain
	GitHub     GitHub
	Cloudflare Cloudflare
	Redis      Redis
	Docker     Docker
}

type AppData struct {
	Name      string
	Env       string
	Port      string
	Debug     bool
	JWTSecret string
}

type Database struct {
	ConnectionString string
	Name             string
}

type Domain struct {
	AppDomain   string
	FrontendURL string
}

type GitHub struct {
	ClientID     string
	ClientSecret string
	RedirectURL  string
}

type Cloudflare struct {
	APIToken  string
	ZoneID    string
	AccountID string
}

type Redis struct {
	Addr     string
	Password string
	DB       int
}

type Docker struct {
	Host string
}

func LoadEnvironment() *Environment {
	viper.SetConfigName(".env")
	viper.SetConfigType("env")
	viper.AddConfigPath(".")
	viper.AddConfigPath("./config")
	viper.AutomaticEnv()

	// Set default values
	setDefaults()

	if err := viper.ReadInConfig(); err != nil {
		log.Printf("Warning: No .env file found, using environment variables: %v", err)
	}

	return &Environment{
		AppData: AppData{
			Name:      viper.GetString("APPLICATION_NAME"),
			Env:       viper.GetString("APPLICATION_ENV"),
			Port:      viper.GetString("APPLICATION_PORT"),
			Debug:     viper.GetBool("DEBUG"),
			JWTSecret: viper.GetString("JWT_SECRET"),
		},
		Database: Database{
			ConnectionString: viper.GetString("MONGO_DB_CONNECTION_STRING"),
			Name:             viper.GetString("MONGO_DB_NAME"),
		},
		Domain: Domain{
			AppDomain:   viper.GetString("APP_DOMAIN"),
			FrontendURL: viper.GetString("FRONTEND_URL"),
		},
		GitHub: GitHub{
			ClientID:     viper.GetString("GITHUB_CLIENT_ID"),
			ClientSecret: viper.GetString("GITHUB_CLIENT_SECRET"),
			RedirectURL:  viper.GetString("GITHUB_REDIRECT_URL"),
		},
		Cloudflare: Cloudflare{
			APIToken:  viper.GetString("CLOUDFLARE_API_TOKEN"),
			ZoneID:    viper.GetString("CLOUDFLARE_ZONE_ID"),
			AccountID: viper.GetString("CLOUDFLARE_ACCOUNT_ID"),
		},
		Redis: Redis{
			Addr:     viper.GetString("REDIS_ADDR"),
			Password: viper.GetString("REDIS_PASSWORD"),
			DB:       viper.GetInt("REDIS_DB"),
		},
		Docker: Docker{
			Host: viper.GetString("DOCKER_HOST"),
		},
	}
}

func setDefaults() {
	viper.SetDefault("APPLICATION_NAME", "Breezy Backend")
	viper.SetDefault("APPLICATION_ENV", "development")
	viper.SetDefault("APPLICATION_PORT", "8080")
	viper.SetDefault("DEBUG", false)
	viper.SetDefault("JWT_SECRET", "your-secret-key")
	viper.SetDefault("MONGO_DB_CONNECTION_STRING", "mongodb://localhost:27017")
	viper.SetDefault("MONGO_DB_NAME", "breezy")
	viper.SetDefault("APP_DOMAIN", "breezy.app")
	viper.SetDefault("FRONTEND_URL", "http://localhost:3000")
	viper.SetDefault("GITHUB_REDIRECT_URL", "http://localhost:3000/auth/github/callback")
	viper.SetDefault("REDIS_ADDR", "localhost:6379")
	viper.SetDefault("REDIS_PASSWORD", "")
	viper.SetDefault("REDIS_DB", 0)
	viper.SetDefault("DOCKER_HOST", "unix:///var/run/docker.sock")
}
