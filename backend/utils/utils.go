package utils

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/argon2"
)

// Password hashing with Argon2
func HashPassword(password string) (string, string, error) {
	salt := make([]byte, 16)
	if _, err := rand.Read(salt); err != nil {
		return "", "", err
	}

	hash := argon2.IDKey([]byte(password), salt, 1, 64*1024, 4, 32)

	encodedHash := base64.StdEncoding.EncodeToString(hash)
	encodedSalt := base64.StdEncoding.EncodeToString(salt)

	return encodedHash, encodedSalt, nil
}

func VerifyPassword(password, hash, salt string) bool {
	saltBytes, err := base64.StdEncoding.DecodeString(salt)
	if err != nil {
		return false
	}

	_, err = base64.StdEncoding.DecodeString(hash)
	if err != nil {
		return false
	}

	computedHash := argon2.IDKey([]byte(password), saltBytes, 1, 64*1024, 4, 32)
	return base64.StdEncoding.EncodeToString(computedHash) == hash
}

// AES encryption/decryption
func EncryptAES(data []byte, key []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err := rand.Read(nonce); err != nil {
		return nil, err
	}

	return gcm.Seal(nonce, nonce, data, nil), nil
}

func DecryptAES(data []byte, key []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	nonceSize := gcm.NonceSize()
	if len(data) < nonceSize {
		return nil, fmt.Errorf("ciphertext too short")
	}

	nonce, ciphertext := data[:nonceSize], data[nonceSize:]
	return gcm.Open(nil, nonce, ciphertext, nil)
}

// String utilities
func SanitizeString(input string) string {
	// Remove special characters and convert to lowercase
	reg := regexp.MustCompile("[^a-zA-Z0-9]+")
	sanitized := reg.ReplaceAllString(input, "-")
	sanitized = strings.ToLower(sanitized)
	sanitized = strings.Trim(sanitized, "-")
	return sanitized
}

func GenerateRandomString(length int) string {
	return uuid.New().String()[:length]
}

func FormatTime(t time.Time) string {
	return t.Format("2006-01-02T15:04:05Z07:00")
}

func ParseTime(timeStr string) (time.Time, error) {
	return time.Parse("2006-01-02T15:04:05Z07:00", timeStr)
}
