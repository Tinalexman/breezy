import axios, { AxiosInstance, AxiosResponse } from "axios";
import { AuthSession, User } from "./types";
import { authConfig } from "./config";

class AuthAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: authConfig.apiBaseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000, // 10 seconds timeout
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(
          `Making ${config.method?.toUpperCase()} request to: ${config.url}`
        );
        return config;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error("Auth API Error:", error);
        if (error.response) {
          // Server responded with error status
          const errorMessage =
            error.response.data?.message || `HTTP ${error.response.status}`;
          throw new Error(errorMessage);
        } else if (error.request) {
          // Request was made but no response received
          throw new Error("Network error - no response received");
        } else {
          // Something else happened
          throw new Error(error.message || "Request failed");
        }
      }
    );
  }

  async getGitHubAuthUrl(): Promise<{ auth_url: string; state: string }> {
    const response: AxiosResponse<{ auth_url: string; state: string }> =
      await this.client.get("/auth/github");
    return response.data;
  }

  async loginWithGitHub(code: string, state: string): Promise<AuthSession> {
    const response: AxiosResponse<AuthSession> = await this.client.post(
      "/auth/github/callback",
      { code, state }
    );
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<AuthSession> {
    const response: AxiosResponse<AuthSession> = await this.client.post(
      "/auth/refresh",
      { refreshToken }
    );
    return response.data;
  }

  async logout(): Promise<void> {
    await this.client.post("/auth/logout");
  }

  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await this.client.get("/auth/me");
    return response.data;
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response: AxiosResponse<User> = await this.client.put(
      "/auth/profile",
      userData
    );
    return response.data;
  }
}

export const authAPI = new AuthAPI();
