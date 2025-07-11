import { AuthConfig } from "./types";

export const authConfig: AuthConfig = {
  githubClientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "",
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || "",
  redirectUri:
    process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI ||
    "http://localhost:3000/auth/callback",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",
};

export const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";

export const getGitHubAuthUrl = (state?: string): string => {
  const params = new URLSearchParams({
    client_id: authConfig.githubClientId,
    redirect_uri: authConfig.redirectUri,
    scope: "read:user user:email repo",
    response_type: "code",
    ...(state && { state }),
  });

  return `${GITHUB_AUTH_URL}?${params.toString()}`;
};

export const validateConfig = (): boolean => {
  const requiredFields = [
    "NEXT_PUBLIC_GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "NEXT_PUBLIC_AUTH_REDIRECT_URI",
  ];

  const missingFields = requiredFields.filter((field) => !process.env[field]);

  if (missingFields.length > 0) {
    console.error("Missing required environment variables:", missingFields);
    return false;
  }

  return true;
};
