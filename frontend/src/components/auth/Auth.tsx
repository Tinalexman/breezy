"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

const Auth = () => {
  const handleGitHubLogin = () => {
    // GitHub OAuth logic would go here
    console.log("GitHub login initiated");
  };

  const floatingElements = [
    { icon: "🚀", delay: 0, duration: 3 },
    { icon: "📱", delay: 0.5, duration: 4 },
    { icon: "⚡", delay: 1, duration: 3.5 },
    { icon: "🌐", delay: 1.5, duration: 4.5 },
    { icon: "🔒", delay: 2, duration: 3 },
    { icon: "📊", delay: 2.5, duration: 4 },
  ];

  return (
    <div className="min-h-screen bg-theme-background flex">
      {/* Left Side - Animations */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-theme-primary/10 to-theme-secondary/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border border-theme-border"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-theme-border"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 border border-theme-border"></div>
          <div className="absolute bottom-40 right-10 w-28 h-28 border border-theme-border"></div>
        </div>

        {/* Floating Elements */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl"
            initial={{
              x: Math.random() * 400 + 50,
              y: Math.random() * 300 + 50,
              opacity: 0,
            }}
            animate={{
              y: [null, -20, 0],
              opacity: [0, 1, 0.8],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {element.icon}
          </motion.div>
        ))}

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to Breezy
            </motion.h1>

            <motion.p
              className="text-xl text-theme-muted mb-8 max-w-md font-[family-name:var(--font-epilogue)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Share your Flutter applications with the world. Join thousands of
              developers building amazing apps.
            </motion.p>

            {/* Feature Highlights */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 text-theme-muted">
                <span className="text-2xl">🚀</span>
                <span className="font-[family-name:var(--font-epilogue)]">
                  Deploy in seconds
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 text-theme-muted">
                <span className="text-2xl">🌐</span>
                <span className="font-[family-name:var(--font-epilogue)]">
                  Share globally
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 text-theme-muted">
                <span className="text-2xl">🔒</span>
                <span className="font-[family-name:var(--font-epilogue)]">
                  Enterprise security
                </span>
              </div>
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
          <Card>
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)]">
                  Get Started
                </h2>
                <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                  Sign in with your GitHub account to continue
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleGitHubLogin}
                  className="w-full mb-6 group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Continue with GitHub
                  </div>
                </Button>

                <div className="text-center">
                  <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                    By continuing, you agree to our{" "}
                    <a
                      href="/terms-of-service"
                      className="text-theme-primary hover:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy-policy"
                      className="text-theme-primary hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 pt-6 border-t border-theme-border"
              >
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-theme-foreground mb-3 font-[family-name:var(--font-fraunces)]">
                    Why GitHub?
                  </h4>
                  <div className="space-y-2 text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                    <p>• Secure OAuth authentication</p>
                    <p>• Access to your repositories</p>
                    <p>• Seamless deployment workflow</p>
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
