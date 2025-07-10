"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-theme-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card>
            <CardContent className="p-12">
              {/* 404 Number */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <h1 className="text-8xl font-bold text-theme-primary font-[family-name:var(--font-fraunces)]">
                  404
                </h1>
              </motion.div>

              {/* Error Icon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-6xl mb-6"
              >
                🚀
              </motion.div>

              {/* Error Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                  Page Not Found
                </h2>
                <p className="text-lg text-theme-muted font-[family-name:var(--font-epilogue)]">
                  Oops! The page you're looking for seems to have flown away.
                  Don't worry, you can always deploy your Flutter app with
                  Breezy.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleGoHome}
                  className="flex items-center gap-2"
                >
                  <HomeIcon className="w-5 h-5" />
                  Go Home
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleGoBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  Go Back
                </Button>
              </motion.div>

              {/* Helpful Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="mt-12 pt-8 border-t border-theme-border"
              >
                <h3 className="text-lg font-semibold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                  Looking for something specific?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a
                    href="/auth"
                    className="block p-4 border border-theme-border hover:border-theme-primary transition-colors duration-200 rounded"
                  >
                    <div className="text-2xl mb-2">🔐</div>
                    <div className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                      Sign In
                    </div>
                    <div className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                      Access your account
                    </div>
                  </a>
                  <a
                    href="#contact"
                    className="block p-4 border border-theme-border hover:border-theme-primary transition-colors duration-200 rounded"
                  >
                    <div className="text-2xl mb-2">📧</div>
                    <div className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                      Contact Us
                    </div>
                    <div className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                      Get help and support
                    </div>
                  </a>
                  <a
                    href="/privacy-policy"
                    className="block p-4 border border-theme-border hover:border-theme-primary transition-colors duration-200 rounded"
                  >
                    <div className="text-2xl mb-2">📋</div>
                    <div className="font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                      Privacy Policy
                    </div>
                    <div className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                      Learn about data protection
                    </div>
                  </a>
                </div>
              </motion.div>

              {/* Fun Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-8 p-4 bg-theme-background/50 border border-theme-border rounded"
              >
                <p className="text-sm text-theme-muted font-[family-name:var(--font-epilogue)]">
                  💡 Pro tip: While you're here, why not deploy your first
                  Flutter app with Breezy? It only takes a few minutes!
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
