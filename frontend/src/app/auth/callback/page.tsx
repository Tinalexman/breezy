"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { motion, AnimatePresence } from "framer-motion";
import {
  SparklesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function AuthCallback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallBack />
    </Suspense>
  );
}

const CallBack = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithCode } = useAuth();
  const toast = useToast();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying your credentials...");

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const error = searchParams.get("error");

      if (error) {
        setStatus("error");
        setMessage(`Authentication failed: ${error}`);
        toast.error(`Authentication failed`);
        setTimeout(() => router.push("/auth"), 3000);
        return;
      }

      if (!code || !state) {
        setStatus("error");
        setMessage("Invalid authentication response");
        toast.error("Invalid authentication response second");
        setTimeout(() => router.push("/auth"), 3000);
        return;
      }

      // Verify state parameter for CSRF protection
      const storedState = sessionStorage.getItem("auth_state");
      if (state !== storedState) {
        setStatus("error");
        setMessage("Invalid authentication state");
        toast.error("Invalid authentication state for CSRF protection");
        setTimeout(() => router.push("/auth"), 3000);
        return;
      }

      // Clear stored state
      sessionStorage.removeItem("auth_state");

      try {
        setMessage("Completing authentication...");
        await loginWithCode(code, state);
        setStatus("success");
        setMessage("Authentication successful!");
        toast.success("Authentication successful!");
        setTimeout(() => router.push("/projects"), 1500);
      } catch {
        setStatus("error");
        setMessage("Failed to complete authentication");
        toast.error("Failed to complete authentication");
        setTimeout(() => router.push("/auth"), 3000);
      }
    };

    handleCallback();
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircleIcon className="w-16 h-16 text-green-500" />;
      case "error":
        return <ExclamationTriangleIcon className="w-16 h-16 text-red-500" />;
      default:
        return (
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-16 h-16 bg-gradient-to-r from-theme-primary to-theme-accent rounded-2xl flex items-center justify-center shadow-2xl"
          >
            <SparklesIcon className="w-8 h-8 text-white" />
          </motion.div>
        );
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      default:
        return "text-theme-primary";
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gradient-to-br from-theme-background via-theme-background to-theme-secondary/20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto p-8"
        >
          {/* Status Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            {getStatusIcon()}
          </motion.div>

          {/* Status Text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`text-2xl font-bold mb-2 font-[family-name:var(--font-fraunces)] ${getStatusColor()}`}
          >
            {status === "loading" && "Completing Authentication"}
            {status === "success" && "Authentication Successful"}
            {status === "error" && "Authentication Failed"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-theme-muted font-[family-name:var(--font-epilogue)] mb-8"
          >
            {message}
          </motion.p>

          {/* Loading Animation for Loading State */}
          <AnimatePresence>
            {status === "loading" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Loading Dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center gap-2"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-2 h-2 bg-theme-primary rounded-full"
                    />
                  ))}
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-1 bg-theme-border rounded-full overflow-hidden"
                >
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-full bg-gradient-to-r from-theme-primary to-theme-accent"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success/Error Actions */}
          <AnimatePresence>
            {status !== "loading" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8"
              >
                {status === "success" && (
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex items-center justify-center gap-2 text-green-500 font-semibold"
                  >
                    <ArrowRightIcon className="w-5 h-5" />
                    Redirecting to dashboard...
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/auth")}
                    className="px-6 py-3 bg-theme-primary text-white rounded-xl font-semibold hover:bg-theme-primary-hover transition-colors"
                  >
                    Try Again
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background Animation */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-theme-primary/30 rounded-full"
                animate={{
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </Suspense>
  );
};
