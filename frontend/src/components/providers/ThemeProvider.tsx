"use client";

import React, { useEffect } from "react";
import { useThemeStore } from "@/stores";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  return <>{children}</>;
};

export default ThemeProvider;
