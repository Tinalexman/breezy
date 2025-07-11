"use client";

import { Toaster } from "react-hot-toast";
import { useThemeStore } from "@/stores/themeStore";

export function ToastProvider() {
  const { theme } = useThemeStore();

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        duration: 4000,
        style: {
          background: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#171717",
          border: `1px solid ${theme === "dark" ? "#374151" : "#e2e8f0"}`,
          fontFamily: "var(--font-epilogue)",
          fontSize: "14px",
          padding: "16px 20px",
          borderRadius: "0px",
          boxShadow:
            theme === "dark"
              ? "0 10px 25px rgba(0, 0, 0, 0.5)"
              : "0 10px 25px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          zIndex: 9999,
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "#ffffff",
          },
          style: {
            background: theme === "dark" ? "#064e3b" : "#ecfdf5",
            color: theme === "dark" ? "#d1fae5" : "#065f46",
            border: `1px solid ${theme === "dark" ? "#047857" : "#a7f3d0"}`,
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
          style: {
            background: theme === "dark" ? "#7f1d1d" : "#fef2f2",
            color: theme === "dark" ? "#fecaca" : "#991b1b",
            border: `1px solid ${theme === "dark" ? "#dc2626" : "#fca5a5"}`,
          },
        },
        loading: {
          iconTheme: {
            primary: theme === "dark" ? "#3b82f6" : "#3b82f6",
            secondary: "#ffffff",
          },
          style: {
            background: theme === "dark" ? "#1e3a8a" : "#eff6ff",
            color: theme === "dark" ? "#bfdbfe" : "#1e40af",
            border: `1px solid ${theme === "dark" ? "#3b82f6" : "#93c5fd"}`,
          },
        },
      }}
    />
  );
}
