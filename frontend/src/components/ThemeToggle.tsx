"use client";

import { motion } from "framer-motion";
import { useThemeStore, themeColors } from "@/stores/themeStore";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative size-9 cursor-pointer bg-theme-secondary p-2 transition-colors duration-300 font-[family-name:var(--font-epilogue)] hover:bg-theme-border"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-full h-full">
        {/* Sun Icon */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: themeColors[theme].primary }}
          animate={{
            opacity: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : -90,
            scale: theme === "light" ? 1 : 0.8,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <circle cx="12" cy="12" r="5" />
          <motion.line
            x1="12"
            y1="1"
            x2="12"
            y2="3"
            animate={
              isHovered && theme === "light"
                ? {
                    y: [0, -2, 0],
                    opacity: [1, 0.5, 1],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: isHovered && theme === "light" ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="12"
            y1="21"
            x2="12"
            y2="23"
            animate={
              isHovered && theme === "light"
                ? {
                    y: [0, 2, 0],
                    opacity: [1, 0.5, 1],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: isHovered && theme === "light" ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="4.22"
            y1="4.22"
            x2="5.64"
            y2="5.64"
            animate={
              isHovered && theme === "light"
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: isHovered && theme === "light" ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="18.36"
            y1="18.36"
            x2="19.78"
            y2="19.78"
            animate={
              isHovered && theme === "light"
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: isHovered && theme === "light" ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="1"
            y1="12"
            x2="3"
            y2="12"
            animate={
              isHovered && theme === "light"
                ? {
                    x: [0, -2, 0],
                    opacity: [1, 0.5, 1],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: isHovered && theme === "light" ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="21"
            y1="12"
            x2="23"
            y2="12"
            animate={
              isHovered && theme === "light"
                ? {
                    x: [0, 2, 0],
                    opacity: [1, 0.5, 1],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: isHovered && theme === "light" ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="4.22"
            y1="19.78"
            x2="5.64"
            y2="18.36"
            animate={
              isHovered && theme === "light"
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: isHovered && theme === "light" ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="18.36"
            y1="5.64"
            x2="19.78"
            y2="4.22"
            animate={
              isHovered && theme === "light"
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: isHovered && theme === "light" ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </motion.svg>

        {/* Moon Icon */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: themeColors[theme].primary }}
          animate={{
            opacity: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 90,
            scale: theme === "dark" ? 1 : 0.8,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <motion.path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            animate={
              isHovered && theme === "dark"
                ? {
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: isHovered && theme === "dark" ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </motion.svg>

        {/* Animated background rectangle */}
        <motion.div
          className="absolute inset-0 bg-theme-primary opacity-20"
          animate={{
            scale: theme === "dark" ? 1 : 0,
            opacity: theme === "dark" ? 0.2 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.button>
  );
}
