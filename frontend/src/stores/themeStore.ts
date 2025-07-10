import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    }
  )
);

// Theme colors configuration
export const themeColors = {
  light: {
    background: "#ffffff",
    foreground: "#171717",
    primary: "#3b82f6", // Light blue
    primaryHover: "#2563eb",
    secondary: "#f1f5f9",
    border: "#e2e8f0",
    muted: "#64748b",
    accent: "#0ea5e9",
  },
  dark: {
    background: "#131313",
    foreground: "#ffffff",
    primary: "#1e40af", // Deep blue
    primaryHover: "#1d4ed8",
    secondary: "#1f2937",
    border: "#374151",
    muted: "#9ca3af",
    accent: "#3b82f6",
  },
};
