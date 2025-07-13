import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { Button } from "@/components/ui/Button";
import GridLines from "./GridLines";
import {
  ArrowDownCircleIcon,
  ArrowRightCircleIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const Hero = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const floatingElementsY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "200%"]
  );
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const codeY = useTransform(scrollYProgress, [0, 1], ["0%", "75%"]);

  const handleDeploy = () => {
    if (isAuthenticated) {
      router.push("/projects");
    } else {
      router.push("/auth");
    }
  };

  const handleDemo = () => {
    // Scroll to demo section or open demo modal
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full relative overflow-hidden"
    >
      {/* Parallax Background Layer */}
      <motion.div style={{ y: backgroundY }} className="absolute w-full h-full">
        <GridLines />
      </motion.div>

      {/* Parallax Floating Elements */}
      <motion.div
        style={{ y: floatingElementsY }}
        className="absolute w-full h-full pointer-events-none"
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 text-4xl opacity-20"
        >
          📱
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-40 right-20 text-3xl opacity-20"
        >
          ⚡
        </motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-40 left-20 text-2xl opacity-20"
        >
          🌐
        </motion.div>

        {/* Additional parallax elements */}
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-60 left-1/4 text-xl opacity-15"
        >
          🚀
        </motion.div>
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-60 right-1/4 text-lg opacity-15"
        >
          💻
        </motion.div>
      </motion.div>

      {/* Main Content with Parallax */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="z-50 text-center min-h-screen flex flex-col items-center justify-center absolute top-0 left-0 w-full"
      >
        {/* Animated Code Snippet with Parallax */}
        <motion.div
          style={{ y: codeY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-theme-card/50 backdrop-blur-sm p-4 border border-theme-border/50 max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-xs text-theme-muted">main.dart</span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-left text-sm font-mono"
            >
              <div className="text-theme-primary">flutter</div>
              <div className="text-theme-foreground"> create my_app</div>
              <div className="text-theme-primary">cd</div>
              <div className="text-theme-foreground"> my_app</div>
              <div className="text-theme-primary">breezy</div>
              <div className="text-theme-foreground"> deploy</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-7xl font-bold mb-6 text-theme-foreground font-[family-name:var(--font-fraunces)]"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Build.
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-theme-primary"
          >
            Deploy.
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Share.
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="text-xl text-theme-muted max-w-3xl mx-auto mb-12 font-[family-name:var(--font-epilogue)] leading-relaxed"
        >
          Bridge the gap between mobile development and global web access. Let
          anyone run your Flutter app directly in their browser, like a native
          PWA.
        </motion.p>

        {/* Interactive Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="primary" size="lg" onClick={handleDeploy}>
              Deploy your first app
              <ArrowRightCircleIcon className="size-5" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleDemo}
              className="group"
            >
              <PlayIcon className="size-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-theme-muted"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["👨‍💻", "👩‍💻", "👨‍💼", "👩‍🎨"].map((avatar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + i * 0.1 }}
                  className="w-8 h-8 rounded-full border-2 border-theme-background flex items-center justify-center text-sm"
                >
                  {avatar}
                </motion.div>
              ))}
            </div>
            <span>Join 5K+ developers</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Free forever</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-blue-500">⚡</span>
            <span>2min deployment</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ArrowDownCircleIcon className="size-6 text-theme-muted animate-bounce" />
      </motion.div>
    </div>
  );
};

export default Hero;
