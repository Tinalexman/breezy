/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        "dark-primary": "#1A1A2E",
        "dark-surface": "#2D2D44",
        "dark-surface-light": "#3A3A5A",

        // Accent colors
        "accent-teal": "#3DCCB1",
        "accent-purple": "#9C27B0",

        // Text colors
        "text-light": "#F5F5F5",
        "text-muted": "#B0B0B0",
        "text-dim": "#757575",

        // Semantic colors
        "error-red": "#FF5252",
        "success-green": "#4CAF50",
        "warning-yellow": "#FFC107",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(61, 204, 177, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(61, 204, 177, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
