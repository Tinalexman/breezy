import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User, BackendAuthResponse } from "@/lib/auth/types";
import { authAPI } from "@/lib/auth/api";
interface AuthStore extends AuthState {
  // Actions
  loginWithGitHub: () => Promise<void>;
  loginWithCode: (code: string, state: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User) => void;

  // Computed
  isTokenExpired: () => boolean;
  getAuthHeaders: () => Record<string, string>;
}

const initialState: AuthState = {
  user: null,
  session: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      loginWithGitHub: async () => {
        set({ isLoading: true, error: null });

        try {
          // Get auth URL and state from backend
          const { auth_url, state } = await authAPI.getGitHubAuthUrl();

          // Store state in sessionStorage for verification
          sessionStorage.setItem("auth_state", state);

          // Redirect to GitHub OAuth
          window.location.href = auth_url;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "Login failed",
          });
        }
      },

      loginWithCode: async (code: string, state: string) => {
        set({ isLoading: true, error: null });

        try {
          const response: BackendAuthResponse = await authAPI.loginWithGitHub(
            code,
            state
          );

          // Transform backend response to match frontend structure
          const transformedSession = {
            user: response.user,
            accessToken: response.token,
            refreshToken: response.session?.refresh_token || response.token, // Use token as fallback
            expiresAt: new Date(
              Date.now() + (response.session?.expires_in || 86400) * 1000
            ),
          };

          set({
            user: transformedSession.user,
            session: transformedSession,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof Error ? error.message : "Authentication failed",
          });
        }
      },

      logout: () => {
        set({
          user: null,
          session: null,
          isLoading: false,
          isAuthenticated: false,
          error: null,
        });
      },

      refreshSession: async () => {
        const { session } = get();
        if (!session?.refreshToken) return;

        try {
          const newSession = await authAPI.refreshToken(session.refreshToken);
          set({
            session: newSession,
            user: newSession.user,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error("Token refresh failed:", error);
          // If refresh fails, logout the user
          get().logout();
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setUser: (user: User) => {
        set({ user });
      },

      isTokenExpired: () => {
        const { session } = get();
        if (!session?.expiresAt) return true;
        return new Date() > new Date(session.expiresAt);
      },

      getAuthHeaders: () => {
        const { session } = get();
        if (!session?.accessToken) return {};

        return {
          Authorization: `Bearer ${session.accessToken}`,
        } as Record<string, string>;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // Check if token is expired on rehydration
        if (state?.isTokenExpired()) {
          state.logout();
        }
      },
    }
  )
);
