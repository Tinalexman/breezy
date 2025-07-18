import { AuthConfig } from "./types";

export const authConfig: AuthConfig = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",
};

export const validateConfig = (): boolean => {
  const requiredFields = ["NEXT_PUBLIC_API_BASE_URL"];

  const missingFields = requiredFields.filter((field) => !process.env[field]);

  if (missingFields.length > 0) {
    console.error("Missing required environment variables:", missingFields);
    return false;
  }

  return true;
};
