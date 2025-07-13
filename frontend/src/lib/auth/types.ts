export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  username: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

// Backend response structure
export interface BackendAuthResponse {
  user: User;
  token: string;
  session: {
    expires_in: number;
    token_type: string;
    refresh_token?: string;
  };
}

export interface AuthState {
  user: User | null;
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginCredentials {
  provider: "github" | "email";
  email?: string;
  password?: string;
  code?: string; // For OAuth code flow
}

export interface AuthError {
  code: string;
  message: string;
  details?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface AuthConfig {
  redirectUri: string;
  apiBaseUrl: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  private: boolean;
  updatedAt: string;
  htmlUrl: string;
  cloneUrl: string;
  defaultBranch: string;
}

export type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: AuthSession }
  | { type: "AUTH_FAILURE"; payload: AuthError }
  | { type: "AUTH_LOGOUT" }
  | { type: "AUTH_REFRESH"; payload: AuthSession }
  | { type: "AUTH_CLEAR_ERROR" };
