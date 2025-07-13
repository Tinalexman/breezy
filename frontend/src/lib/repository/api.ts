import axios, { AxiosInstance, AxiosResponse } from "axios";
import { GitHubRepository } from "../auth/types";
import { authConfig } from "../auth/config";

class RepositoryAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: authConfig.apiBaseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000, // 10 seconds timeout
    });

    // Add request interceptor for logging and auth headers
    this.client.interceptors.request.use(
      (config) => {
        console.log(
          `Making ${config.method?.toUpperCase()} request to: ${config.url}`
        );

        // Add auth token if available
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

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
        console.error("Repository API Error:", error);
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

  private getAuthToken(): string | null {
    // Get token from localStorage (Zustand persist)
    if (typeof window !== "undefined") {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        try {
          const parsed = JSON.parse(authStorage);
          return parsed.state?.session?.accessToken || null;
        } catch (error) {
          console.error("Error parsing auth storage:", error);
          return null;
        }
      }
    }
    return null;
  }

  async getGitHubRepositories(): Promise<{
    count: number;
    repos: GitHubRepository[];
  }> {
    const response: AxiosResponse<{
      data: { count: number; repos: GitHubRepository[] };
    }> = await this.client.get("/repositories");
    return response.data.data;
  }

  async getProjectBranches(repoUrl: string): Promise<string[]> {
    const response: AxiosResponse<{
      data: { branches: { name: string }[] };
    }> = await this.client.get(
      `/repositories/branches?repo_url=${encodeURIComponent(repoUrl)}`
    );
    return response.data.data.branches.map((branch) => branch.name) || [];
  }
}

export const repositoryAPI = new RepositoryAPI();
