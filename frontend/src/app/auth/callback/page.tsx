"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { motion } from "framer-motion";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithCode, isLoading } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const error = searchParams.get("error");

      if (error) {
        toast.error(`Authentication failed: ${error}`);
        router.push("/auth");
        return;
      }

      if (!code || !state) {
        toast.error("Invalid authentication response");
        router.push("/auth");
        return;
      }

      // Verify state parameter for CSRF protection
      const storedState = sessionStorage.getItem("auth_state");
      if (state !== storedState) {
        toast.error("Invalid authentication state");
        router.push("/auth");
        return;
      }

      // Clear stored state
      sessionStorage.removeItem("auth_state");

      try {
        await loginWithCode(code);
        toast.success("Authentication successful!");
        router.push("/projects");
      } catch (error) {
        toast.error("Failed to complete authentication");
        router.push("/auth");
      }
    };

    handleCallback();
  }, [searchParams, loginWithCode, router, toast]);

  return (
    <div className="min-h-screen bg-theme-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)]">
          Completing Authentication
        </h2>
        <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
          {isLoading ? "Verifying your credentials..." : "Redirecting..."}
        </p>
      </motion.div>
    </div>
  );
}
