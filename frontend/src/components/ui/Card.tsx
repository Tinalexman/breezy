"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({
  children,
  className = "",
  onClick,
  hover = false,
}: CardProps) {
  const baseClasses =
    "bg-theme-background border border-theme-border p-6 transition-all duration-200 ease-in-out";
  const hoverClasses = hover
    ? "hover:shadow-[0_0_10px_rgba(0,0,0,0.05)] hover:border-theme-primary cursor-pointer"
    : "";
  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  const Component = onClick ? motion.div : motion.div;

  return (
    <Component
      className={classes}
      onClick={onClick}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </Component>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return (
    <div className={`${className} font-[family-name:var(--font-epilogue)]`}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div
      className={`mt-4 pt-4 border-t border-theme-border ${className} font-[family-name:var(--font-epilogue)]`}
    >
      {children}
    </div>
  );
}
