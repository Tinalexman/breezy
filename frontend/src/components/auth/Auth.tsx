"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  SparklesIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const Auth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, isAuthenticated } = useAuth();
  const toast = useToast();
  const [isHovered, setIsHovered] = useState(false);

  // Handle OAuth callback
  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      toast.error(`Authentication failed: ${error}`);
      return;
    }

    if (code && state) {
      const storedState = sessionStorage.getItem("auth_state");
      if (state !== storedState) {
        toast.error("Invalid authentication state");
        return;
      }
      sessionStorage.removeItem("auth_state");
      handleOAuthCallback(code);
    }
  }, [searchParams, toast]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/projects");
    }
  }, [isAuthenticated, router]);

  const handleOAuthCallback = async (code: string) => {
    try {
      toast.success("Authentication successful!");
      router.push("/projects");
    } catch (error) {
      toast.error("Failed to complete authentication");
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await login();
    } catch (error) {
      toast.error("Failed to initiate login");
    }
  };

  const features = [
    {
      icon: "🚀",
      title: "Lightning Fast",
      description: "Deploy in under 2 minutes",
    },
    {
      icon: "🌐",
      title: "Global CDN",
      description: "Serve from edge locations worldwide",
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description: "SOC 2 compliant infrastructure",
    },
    {
      icon: "📊",
      title: "Real-time Analytics",
      description: "Track performance and engagement",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-background via-theme-background to-theme-secondary/20 flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0"
          />

          {/* Floating Elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-theme-primary/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
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

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-lg"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-theme-primary to-theme-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <SparklesIcon className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] bg-gradient-to-r from-theme-foreground to-theme-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Welcome to Breezy
            </motion.h1>

            <motion.p
              className="text-xl text-theme-muted mb-12 font-[family-name:var(--font-epilogue)] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Share your Flutter applications with the world. Join thousands of
              developers building amazing apps.
            </motion.p>

            {/* Feature Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 rounded-xl bg-theme-card/50 backdrop-blur-sm border border-theme-border/50"
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-theme-foreground mb-1 font-[family-name:var(--font-fraunces)]">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="relative overflow-hidden border-0 shadow-2xl">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 via-transparent to-theme-accent/5" />

            <CardContent className="p-8 relative">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center mb-8"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-16 h-16 bg-gradient-to-r from-theme-primary to-theme-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <GlobeAltIcon className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)]">
                  Get Started
                </h2>
                <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                  Sign in with your GitHub account to continue
                </p>
              </motion.div>

              {/* Login Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleGitHubLogin}
                  disabled={isLoading}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full mb-6 group relative overflow-hidden h-14 text-lg font-semibold"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered ? "100%" : "-100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  <div className="flex items-center justify-center gap-3 relative z-10">
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-6 h-6"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </motion.div>
                    )}
                    <span>
                      {isLoading ? "Connecting..." : "Continue with GitHub"}
                    </span>
                    {!isLoading && (
                      <motion.div
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRightIcon className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                </Button>

                {/* Terms */}
                <div className="text-center mb-6">
                  <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                    By continuing, you agree to our{" "}
                    <a
                      href="/terms-of-service"
                      className="text-theme-primary hover:underline font-medium"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy-policy"
                      className="text-theme-primary hover:underline font-medium"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 p-4 bg-theme-secondary/30 rounded-xl">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                      Free Forever
                    </p>
                    <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                      No credit card required
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-theme-secondary/30 rounded-xl">
                  <ShieldCheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                      Enterprise Security
                    </p>
                    <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                      SOC 2 compliant infrastructure
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-theme-secondary/30 rounded-xl">
                  <SparklesIcon className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                      Instant Deployments
                    </p>
                    <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                      Deploy in under 2 minutes
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Security Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-8 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20"
              >
                <div className="flex items-start gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-theme-foreground mb-1 font-[family-name:var(--font-fraunces)]">
                      Security First
                    </p>
                    <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                      We only request access to repositories you explicitly
                      choose to deploy. Your code and data remain secure and
                      private.
                    </p>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
