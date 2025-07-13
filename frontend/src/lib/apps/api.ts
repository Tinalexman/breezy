import axios, { AxiosInstance, AxiosResponse } from "axios";
import { authConfig } from "../auth/config";

export interface App {
  id: string;
  name: string;
  sanitizedName: string;
  description: string;
  isActive: boolean;
  staticFilesURL: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppsResponse {
  count: number;
  apps: App[];
}

class AppsAPI {
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
        console.error("Apps API Error:", error);
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

  async getAllApps(): Promise<AppsResponse> {
    const response: AxiosResponse<{
      data: AppsResponse;
    }> = await this.client.get("/apps");
    return response.data.data;
  }

  async getAppById(appId: string): Promise<App> {
    const response: AxiosResponse<{
      data: {
        app: App;
        user_id: string;
      };
    }> = await this.client.get(`/apps/${appId}`);
    return response.data.data.app;
  }

  async createApp(appData: {
    name: string;
    description: string;
    repoUrl: string;
    branch: string;
  }): Promise<App> {
    const response: AxiosResponse<{
      data: App;
    }> = await this.client.post("/apps", appData);
    return response.data.data;
  }

  async updateApp(appId: string, appData: Partial<App>): Promise<App> {
    const response: AxiosResponse<{
      data: App;
    }> = await this.client.put(`/apps/${appId}`, appData);
    return response.data.data;
  }

  async deleteApp(appId: string): Promise<void> {
    await this.client.delete(`/apps/${appId}`);
  }
}

export const appsAPI = new AppsAPI();
