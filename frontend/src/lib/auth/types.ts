export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  githubUsername?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
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
  details?: any;
}

export interface AuthConfig {
  githubClientId: string;
  githubClientSecret: string;
  redirectUri: string;
  apiBaseUrl: string;
}

export type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: AuthSession }
  | { type: "AUTH_FAILURE"; payload: AuthError }
  | { type: "AUTH_LOGOUT" }
  | { type: "AUTH_REFRESH"; payload: AuthSession }
  | { type: "AUTH_CLEAR_ERROR" };
