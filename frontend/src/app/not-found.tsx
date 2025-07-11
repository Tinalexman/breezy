"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  ArrowLeftIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-background via-theme-background to-theme-card/20 flex items-center justify-center overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-theme-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-theme-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="backdrop-blur-sm border-theme-border/50">
            <CardContent className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Side - 404 Content */}
                <div className="text-center lg:text-left">
                  {/* Error Icon */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
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

                  {/* 404 Number */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6"
                  >
                    <h1 className="text-7xl lg:text-8xl font-bold bg-gradient-to-r from-theme-primary to-theme-accent bg-clip-text text-transparent font-[family-name:var(--font-fraunces)]">
                      404
                    </h1>
                  </motion.div>

                  {/* Error Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-8"
                  >
                    <h2 className="text-3xl lg:text-4xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                      Page Not Found
                    </h2>
                    <p className="text-lg text-theme-muted font-[family-name:var(--font-epilogue)] leading-relaxed">
                      Oops! The page you&apos;re looking for seems to have flown
                      away into the digital void.
                    </p>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleGoHome}
                      className="flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <HomeIcon className="w-5 h-5" />
                      Go Home
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleGoBack}
                      className="flex items-center gap-3 hover:bg-theme-card transition-all duration-300"
                    >
                      <ArrowLeftIcon className="w-5 h-5" />
                      Go Back
                    </Button>
                  </motion.div>
                </div>

                {/* Right Side - Quick Links */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-theme-foreground mb-6 font-[family-name:var(--font-fraunces)] flex items-center gap-3">
                      <MagnifyingGlassIcon className="w-6 h-6 text-theme-primary" />
                      Quick Navigation
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.a
                        href="/auth"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group block p-4 border border-theme-border hover:border-theme-primary transition-all duration-300 bg-theme-card/30 hover:bg-theme-card/50"
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                          🔐
                        </div>
                        <div className="font-semibold text-theme-foreground text-sm font-[family-name:var(--font-fraunces)]">
                          Sign In
                        </div>
                        <div className="text-xs text-theme-muted mt-1">
                          Access your account
                        </div>
                      </motion.a>
                      <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group block p-4 border border-theme-border hover:border-theme-primary transition-all duration-300 bg-theme-card/30 hover:bg-theme-card/50"
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                          📧
                        </div>
                        <div className="font-semibold text-theme-foreground text-sm font-[family-name:var(--font-fraunces)]">
                          Contact
                        </div>
                        <div className="text-xs text-theme-muted mt-1">
                          Get in touch
                        </div>
                      </motion.a>
                      <motion.a
                        href="/privacy-policy"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group block p-4 border border-theme-border hover:border-theme-primary transition-all duration-300 bg-theme-card/30 hover:bg-theme-card/50"
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                          📋
                        </div>
                        <div className="font-semibold text-theme-foreground text-sm font-[family-name:var(--font-fraunces)]">
                          Privacy
                        </div>
                        <div className="text-xs text-theme-muted mt-1">
                          Privacy policy
                        </div>
                      </motion.a>
                      <motion.a
                        href="/terms-of-service"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group block p-4 border border-theme-border hover:border-theme-primary transition-all duration-300 bg-theme-card/30 hover:bg-theme-card/50"
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                          📄
                        </div>
                        <div className="font-semibold text-theme-foreground text-sm font-[family-name:var(--font-fraunces)]">
                          Terms
                        </div>
                        <div className="text-xs text-theme-muted mt-1">
                          Terms of service
                        </div>
                      </motion.a>
                    </div>
                  </div>

                  {/* Pro Tip */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="p-4 bg-gradient-to-r from-theme-primary/10 to-theme-accent/10 border border-theme-primary/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">💡</div>
                      <div>
                        <p className="text-sm font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                          Pro Tip
                        </p>
                        <p className="text-xs text-theme-muted font-[family-name:var(--font-epilogue)] mt-1">
                          Deploy your Flutter app with Breezy in minutes!
                          Experience lightning-fast deployments.
                        </p>
                      </div>
                    </div>
                  </motion.div>
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
