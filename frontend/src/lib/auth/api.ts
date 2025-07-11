import { AuthSession, LoginCredentials, AuthError, User } from "./types";
import { authConfig } from "./config";

class AuthAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = authConfig.apiBaseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Auth API Error:", error);
      throw error;
    }
  }

  async loginWithGitHub(code: string): Promise<AuthSession> {
    return this.request<AuthSession>("/auth/github", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  }

  async refreshToken(refreshToken: string): Promise<AuthSession> {
    return this.request<AuthSession>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  }

  async logout(): Promise<void> {
    return this.request<void>("/auth/logout", {
      method: "POST",
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>("/auth/me", {
      method: "GET",
    });
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    return this.request<User>("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  // Mock implementation for development
  async mockLoginWithGitHub(): Promise<AuthSession> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: "1",
      email: "john@example.com",
      name: "John Doe",
      avatar: "https://avatars.githubusercontent.com/u/1234567?v=4",
      githubUsername: "johndoe",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockSession: AuthSession = {
      user: mockUser,
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };

    return mockSession;
  }
}

export const authAPI = new AuthAPI();
