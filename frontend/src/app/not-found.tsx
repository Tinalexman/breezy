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
    <div className="h-screen bg-theme-background flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - 404 Content */}
                <div className="text-center lg:text-left">
                  {/* 404 Number */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-4"
                  >
                    <h1 className="text-6xl lg:text-7xl font-bold text-theme-primary font-[family-name:var(--font-fraunces)]">
                      404
                    </h1>
                  </motion.div>

                  {/* Error Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-6"
                  >
                    <h2 className="text-2xl lg:text-3xl font-bold text-theme-foreground mb-3 font-[family-name:var(--font-fraunces)]">
                      Page Not Found
                    </h2>
                    <p className="text-theme-muted font-[family-name:var(--font-epilogue)]">
                      Oops! The page you're looking for seems to have flown
                      away.
                    </p>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                  >
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleGoHome}
                      className="flex items-center gap-2"
                    >
                      <HomeIcon className="w-4 h-4" />
                      Go Home
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={handleGoBack}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeftIcon className="w-4 h-4" />
                      Go Back
                    </Button>
                  </motion.div>
                </div>

                {/* Right Side - Quick Links */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <h3 className="text-lg font-semibold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                    Quick Navigation
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href="/auth"
                      className="block p-3 border border-theme-border hover:border-theme-primary transition-colors duration-200 rounded text-center"
                    >
                      <div className="text-xl mb-1">🔐</div>
                      <div className="font-semibold text-theme-foreground text-sm font-[family-name:var(--font-fraunces)]">
                        Sign In
                      </div>
                    </a>
                    <a
                      href="#contact"
                      className="block p-3 border border-theme-border hover:border-theme-primary transition-colors duration-200 rounded text-center"
                    >
                      <div className="text-xl mb-1">📧</div>
                      <div className="font-semibold text-theme-foreground text-sm font-[family-name:var(--font-fraunces)]">
                        Contact
                      </div>
                    </a>
                    <a
                      href="/privacy-policy"
                      className="block p-3 border border-theme-border hover:border-theme-primary transition-colors duration-200 rounded text-center"
                    >
                      <div className="text-xl mb-1">📋</div>
                      <div className="font-semibold text-theme-foreground text-sm font-[family-name:var(--font-fraunces)]">
                        Privacy
                      </div>
                    </a>
                    <a
                      href="/terms-of-service"
                      className="block p-3 border border-theme-border hover:border-theme-primary transition-colors duration-200 rounded text-center"
                    >
                      <div className="text-xl mb-1">📄</div>
                      <div className="font-semibold text-theme-foreground text-sm font-[family-name:var(--font-fraunces)]">
                        Terms
                      </div>
                    </a>
                  </div>

                  {/* Pro Tip */}
                  <div className="mt-4 p-3 bg-theme-background/50 border border-theme-border rounded">
                    <p className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)]">
                      💡 Pro tip: Deploy your Flutter app with Breezy in
                      minutes!
                    </p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
