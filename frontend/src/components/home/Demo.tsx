"use client";

import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PlayIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

const Demo = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDeploy = () => {
    if (isAuthenticated) {
      router.push("/project");
    } else {
      router.push("/auth");
    }
  };

  const handlePlayDemo = () => {
    console.log("Play demo clicked - attempting to show toast");
    toast.success("🚀 Starting deployment simulation...");
    setIsPlaying(true);

    // Simulate demo playback with multiple toasts
    setTimeout(() => {
      toast.success("📦 Building Flutter app...");
    }, 1000);

    setTimeout(() => {
      toast.success("⚡ Deploying to global CDN...");
    }, 2000);

    setTimeout(() => {
      toast.success("✅ Deployment complete! Your app is live!", {
        duration: 4000,
      });
      setIsPlaying(false);
    }, 4000);
  };

  const codeSteps = [
    {
      command: "flutter create my_app",
      output: "Creating Flutter project...",
      status: "success",
    },
    {
      command: "cd my_app",
      output: "Changed directory to my_app",
      status: "success",
    },
    {
      command: "breezy deploy",
      output: "🚀 Deploying to Breezy...",
      status: "loading",
    },
    {
      command: "",
      output: "✅ Deployment complete!",
      status: "success",
    },
    {
      command: "",
      output: "🌐 Your app is live at: https://my-app.breezy.dev",
      status: "success",
    },
  ];

  return (
    <section id="demo" ref={ref} className="py-20 bg-theme-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="text-theme-primary text-sm font-semibold tracking-wider uppercase">
              Demo
            </span>
          </motion.div>
          <h2 className="text-4xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
            See It In Action
          </h2>
          <p className="text-lg text-theme-muted max-w-3xl mx-auto font-[family-name:var(--font-epilogue)]">
            Watch how easy it is to deploy your Flutter app with Breezy. From
            local development to global deployment in under 2 minutes.
          </p>
        </motion.div>

        {/* Demo Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Code Terminal */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                      Terminal
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePlayDemo}
                      disabled={isPlaying}
                      className="flex items-center gap-2 px-4 py-2 bg-theme-primary text-white hover:bg-theme-primary/90 transition-colors duration-200 disabled:opacity-50"
                    >
                      <PlayIcon className="w-4 h-4" />
                      {isPlaying ? "Playing..." : "Play Demo"}
                    </motion.button>
                  </div>

                  <div className="bg-theme-card border border-theme-border p-4 font-mono text-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-theme-muted text-xs">terminal</span>
                    </div>

                    <div className="space-y-2">
                      {codeSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={
                            isInView && (isPlaying || index < 2)
                              ? { opacity: 1, x: 0 }
                              : {}
                          }
                          transition={{ duration: 0.5, delay: index * 0.5 }}
                          className="flex items-start gap-2"
                        >
                          <span className="text-theme-primary">$</span>
                          <div className="flex-1">
                            {step.command && (
                              <div className="text-theme-foreground">
                                {step.command}
                              </div>
                            )}
                            {step.output && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className={`text-sm ${
                                  step.status === "success"
                                    ? "text-green-500"
                                    : step.status === "loading"
                                    ? "text-yellow-500"
                                    : "text-theme-muted"
                                }`}
                              >
                                {step.output}
                                {step.status === "loading" && (
                                  <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                    }}
                                  >
                                    ...
                                  </motion.span>
                                )}
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Live Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-theme-foreground font-[family-name:var(--font-fraunces)]">
                      Live Preview
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-theme-muted">Live</span>
                    </div>
                  </div>

                  <div className="bg-theme-card border border-theme-border p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-theme-muted text-xs">
                        my-app.breezy.dev
                      </span>
                    </div>

                    {/* Mock App Preview */}
                    <div className="bg-theme-card p-4 shadow-inner">
                      <div className="text-center">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-4xl mb-2"
                        >
                          📱
                        </motion.div>
                        <h4 className="font-semibold text-theme-foreground mb-2">
                          My Flutter App
                        </h4>
                        <p className="text-theme-muted text-sm mb-4">
                          Your Flutter app running in the browser
                        </p>
                        <div className="flex gap-2 justify-center">
                          <div className="w-16 h-8 bg-blue-500 rounded"></div>
                          <div className="w-16 h-8 bg-green-500 rounded"></div>
                          <div className="w-16 h-8 bg-purple-500 rounded"></div>
                        </div>
                      </div>
                    </div>

                    {/* URL Display */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 1.5 }}
                      className="mt-4 p-3 bg-theme-primary/10"
                    >
                      <div className="text-sm text-theme-primary font-mono">
                        https://my-app.breezy.dev
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-theme-primary/5 to-transparent" />
            <CardContent className="p-8 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="mb-6"
              >
                <span className="text-4xl">🎯</span>
              </motion.div>

              <h3 className="text-2xl font-bold text-theme-foreground mb-4 font-[family-name:var(--font-fraunces)]">
                Ready to Deploy Your App?
              </h3>
              <p className="text-theme-muted mb-8 max-w-2xl mx-auto font-[family-name:var(--font-epilogue)]">
                Join thousands of developers who are already sharing their
                Flutter apps with the world. Start your deployment journey
                today.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="primary" size="lg" onClick={handleDeploy}>
                  Deploy your first app
                  <ArrowRightCircleIcon className="size-5" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;
