"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "inline-flex gap-2 cursor-pointer items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-fraunces)]";

  const variants = {
    primary:
      "bg-theme-primary text-white hover:bg-theme-primary-hover focus:ring-theme-primary",
    secondary:
      "bg-theme-secondary text-theme-foreground hover:bg-theme-border focus:ring-theme-primary",
    outline:
      "border border-theme-border bg-transparent text-theme-foreground hover:bg-theme-secondary focus:ring-theme-primary",
    ghost:
      "bg-transparent text-theme-foreground hover:bg-theme-secondary focus:ring-theme-primary",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.button>
  );
}
