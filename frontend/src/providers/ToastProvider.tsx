"use client";

import { Toaster } from "react-hot-toast";
import { useThemeStore } from "@/stores/themeStore";

export function ToastProvider() {
  const { theme } = useThemeStore();

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#171717",
          border: `1px solid ${theme === "dark" ? "#374151" : "#e2e8f0"}`,
          fontFamily: "var(--font-epilogue)",
          fontSize: "14px",
          padding: "12px 16px",
          borderRadius: "0px", // Rectangular to match your design
        },
        success: {
          iconTheme: {
            primary: theme === "dark" ? "#1e40af" : "#3b82f6",
            secondary: theme === "dark" ? "#ffffff" : "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
        loading: {
          iconTheme: {
            primary: theme === "dark" ? "#1e40af" : "#3b82f6",
            secondary: theme === "dark" ? "#ffffff" : "#ffffff",
          },
        },
      }}
    />
  );
}
