"use client";

import { useEffect } from "react";
import { useThemeStore, themeColors } from "@/stores/themeStore";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const colors = themeColors[theme];

    // Apply theme colors to CSS custom properties
    const root = document.documentElement;
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--foreground", colors.foreground);
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-hover", colors.primaryHover);
    root.style.setProperty("--secondary", colors.secondary);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--muted", colors.muted);
    root.style.setProperty("--accent", colors.accent);

    // Set data attribute for theme-aware styling
    root.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
