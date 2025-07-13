import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User } from "@/lib/auth/types";
import { authAPI } from "@/lib/auth/api";
interface AuthStore extends AuthState {
  // Actions
  loginWithGitHub: () => Promise<void>;
  loginWithCode: (code: string, state: string) => Promise<void>;
  logout: () => Promise<void>;
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
          const session = await authAPI.loginWithGitHub(code, state);

          set({
            user: session.user,
            session,
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

      logout: async () => {
        set({ isLoading: true });

        try {
          await authAPI.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          });
        }
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
