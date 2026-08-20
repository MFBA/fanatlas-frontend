import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07090E",
        foreground: "#FFFFFF",
        card: {
          DEFAULT: "#0F1523",
          hover: "#151C2E",
          border: "#1C253B",
          highlight: "#222D47"
        },
        brand: {
          blue: "#3870FF",
          purple: "#7928CA",
          cyan: "#00DFD8",
          neon: "#6366F1",
          pink: "#FF0080"
        },
        sports: {
          football: "#6366F1",
          basketball: "#F97316",
          f1: "#EF4444",
          cricket: "#EAB308",
          tennis: "#84CC16"
        },
        live: {
          green: "#10B981",
          red: "#EF4444",
          badge: "#FF2B51"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px -5px rgba(99, 102, 241, 0.4)",
        "glow-purple": "0 0 25px -5px rgba(121, 40, 202, 0.5)",
        "glow-cyan": "0 0 25px -5px rgba(0, 223, 216, 0.4)",
        "glow-green": "0 0 15px -3px rgba(16, 185, 129, 0.4)",
        "glow-red": "0 0 15px -3px rgba(239, 68, 68, 0.5)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "wave-bar": "wave 1.2s ease-in-out infinite",
        "badge-pulse": "badgePulse 2s ease-in-out infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { height: "20%" },
          "50%": { height: "100%" },
        },
        badgePulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.08)" },
        }
      }
    },
  },
  plugins: [],
};

export default config;
