"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore, themeColors } from "@/stores/themeStore";
import { useEffect, useState } from "react";

interface ThemePeelProps {
  children: React.ReactNode;
}

export function ThemePeel({ children }: ThemePeelProps) {
  const { theme } = useThemeStore();
  const [isPeeling, setIsPeeling] = useState(false);
  const [peelTheme, setPeelTheme] = useState(theme);

  useEffect(() => {
    if (peelTheme !== theme) {
      setIsPeeling(true);
      setPeelTheme(theme);

      const timer = setTimeout(() => {
        setIsPeeling(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [theme, peelTheme]);

  useEffect(() => {
    if (!isPeeling && peelTheme !== theme) {
      setPeelTheme(theme);
    }
  }, [theme, isPeeling, peelTheme]);

  return (
    <div className="relative overflow-hidden">
      <div className="relative z-10">{children}</div>

      <AnimatePresence mode="wait">
        {isPeeling && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.6,
            }}
            style={{
              background: themeColors[peelTheme].background,
              color: themeColors[peelTheme].foreground,
            }}
            onAnimationComplete={() => {
              // Ensure slide disappears after animation
              if (!isPeeling) {
                setIsPeeling(false);
              }
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="text-6xl font-bold mb-4"
                  style={{ color: themeColors[peelTheme].primary }}
                >
                  {peelTheme === "light" ? "☀️" : "🌙"}
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="text-2xl font-semibold mb-2 font-[family-name:var(--font-fraunces)]"
                  style={{ color: themeColors[peelTheme].foreground }}
                >
                  Switching to {peelTheme} mode
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="text-sm opacity-70 font-[family-name:var(--font-epilogue)]"
                  style={{ color: themeColors[peelTheme].muted }}
                >
                  {peelTheme === "light"
                    ? "Welcome to the light side"
                    : "Welcome to the Dark realm"}
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
