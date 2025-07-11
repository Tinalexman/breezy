import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "./useToast";

export const useAuth = () => {
  const router = useRouter();
  const toast = useToast();
  const {
    user,
    session,
    isLoading,
    isAuthenticated,
    error,
    loginWithGitHub,
    loginWithCode,
    logout,
    refreshSession,
    clearError,
    isTokenExpired,
  } = useAuthStore();

  // Auto-refresh token when it's about to expire
  useEffect(() => {
    if (!session?.expiresAt) return;

    const timeUntilExpiry = new Date(session.expiresAt).getTime() - Date.now();
    const refreshThreshold = 5 * 60 * 1000; // 5 minutes before expiry

    if (timeUntilExpiry <= refreshThreshold) {
      refreshSession();
    }

    const interval = setInterval(() => {
      if (isTokenExpired()) {
        refreshSession();
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [session?.expiresAt, refreshSession, isTokenExpired]);

  // Handle auth errors with toast notifications
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, toast, clearError]);

  const handleLogin = async () => {
    try {
      await loginWithGitHub();
    } catch (error) {
      toast.error("Failed to initiate login");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const requireAuth = (redirectTo = "/auth") => {
    if (!isAuthenticated && !isLoading) {
      router.push(redirectTo);
      return false;
    }
    return true;
  };

  return {
    // State
    user,
    session,
    isLoading,
    isAuthenticated,
    error,

    // Actions
    login: handleLogin,
    logout: handleLogout,
    loginWithCode,
    clearError,

    // Utilities
    requireAuth,
    isTokenExpired,
  };
};
