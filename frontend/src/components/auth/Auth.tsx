"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  RocketLaunchIcon,
  LockClosedIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

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
      toast.success(`Authentication successful! Code: ${code}`);
      router.push("/projects");
    } catch (error) {
      toast.error(`Failed to complete authentication: ${error}`);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await login();
    } catch (error) {
      toast.error(`Failed to initiate login: ${error}`);
    }
  };

  const features = [
    {
      icon: RocketLaunchIcon,
      title: "Lightning Fast",
      description: "Deploy in under 2 minutes",
      color: "text-blue-500",
    },
    {
      icon: GlobeAltIcon,
      title: "Global CDN",
      description: "Serve from edge locations worldwide",
      color: "text-green-500",
    },
    {
      icon: LockClosedIcon,
      title: "Enterprise Security",
      description: "SOC 2 compliant infrastructure",
      color: "text-purple-500",
    },
    {
      icon: ChartBarIcon,
      title: "Real-time Analytics",
      description: "Track performance and engagement",
      color: "text-orange-500",
    },
  ];

  const benefits = [
    { icon: CheckCircleIcon, text: "Free Forever", color: "text-green-500" },
    {
      icon: ShieldCheckIcon,
      text: "Enterprise Security",
      color: "text-blue-500",
    },
    {
      icon: SparklesIcon,
      text: "Instant Deployments",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-background via-theme-background to-theme-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left Side - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left hidden lg:block"
          >
            {/* Logo and Title */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6"
            >
              <Image
                src="/breezy.png"
                alt="Breezy"
                width={64}
                height={64}
                className="size-16"
              />
            </motion.div>

            <motion.h1
              className="text-4xl lg:text-5xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)] bg-gradient-to-r from-theme-foreground to-theme-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Welcome to Breezy
            </motion.h1>

            <motion.p
              className="text-lg text-theme-muted mb-8 font-[family-name:var(--font-epilogue)] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Share your Flutter applications with the world. Join thousands of
              developers building amazing apps.
            </motion.p>

            {/* Feature Grid - Compact */}
            <motion.div
              className="grid grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-3 bg-theme-card/50 backdrop-blur-sm border border-theme-border"
                >
                  <feature.icon
                    className={`w-6 h-6 ${feature.color} mx-auto mb-2`}
                  />
                  <h3 className="font-semibold text-theme-foreground mb-1 text-sm font-[family-name:var(--font-fraunces)]">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Benefits - Horizontal */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <benefit.icon className={`w-4 h-4 ${benefit.color}`} />
                  <span className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:col-span-1 col-span-2"
          >
            <Card className="relative overflow-hidden border-0 shadow-2xl w-full max-w-md">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 via-transparent to-theme-accent/5" />

              <CardContent className="p-6 relative">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-center mb-6"
                >
                  <h2 className="text-2xl font-bold text-theme-foreground mb-2 font-[family-name:var(--font-fraunces)]">
                    Get Started
                  </h2>
                  <p className="text-theme-muted font-[family-name:var(--font-epilogue)] text-sm">
                    Sign in with your GitHub account to continue
                  </p>
                </motion.div>

                {/* Login Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleGitHubLogin}
                    disabled={isLoading}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="w-full mb-4 group relative overflow-hidden h-12 text-base font-semibold"
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
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-5 h-5"
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
                          <ArrowRightIcon className="w-4 h-4" />
                        </motion.div>
                      )}
                    </div>
                  </Button>

                  {/* Terms */}
                  <div className="text-center mb-4">
                    <p className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                      By continuing, you agree to our{" "}
                      <a
                        href="/terms-of-service"
                        className="text-theme-primary hover:underline font-medium"
                      >
                        Terms
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy-policy"
                        className="text-theme-primary hover:underline font-medium"
                      >
                        Privacy
                      </a>
                    </p>
                  </div>
                </motion.div>

                {/* Security Notice - Compact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20"
                >
                  <div className="flex items-start gap-2">
                    <ShieldCheckIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-semibold text-theme-foreground mb-1 font-[family-name:var(--font-fraunces)]">
                        Security First
                      </p>
                      <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                        We only request access to repositories you explicitly
                        choose to deploy.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-theme-primary/20 rounded-full"
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                left: `${10 + i * 10}%`,
                top: `${20 + i * 8}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auth;
