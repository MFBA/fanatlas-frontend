import type { Config } from "tailwindcss";

// Tokens mirror DESIGN.md. Naming note: the spec's text-1/2/3 are `fg`,
// `fg-muted` and `fg-faint` here, so the utility reads `text-fg-muted`
// rather than `text-text-2`.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        violet: {
          50: "#F4EDFF",
          100: "#E7DAFF",
          200: "#CFB4FF",
          300: "#B48CFB",
          400: "#9C63F2",
          500: "#8A3FE8",
          600: "#7928CA",
          700: "#611FA3",
          800: "#47177A",
          900: "#2E1050",
          950: "#190A2E",
        },
        ink: {
          0: "#08070B",
          1: "#0E0D13",
          2: "#15141C",
          3: "#1D1B26",
        },
        line: {
          DEFAULT: "#262430",
          strong: "#35323F",
        },
        fg: {
          DEFAULT: "#F5F4F7",
          muted: "#A7A3B3",
          faint: "#6E6A7A",
        },
        // Identity tints for person avatars only (DESIGN.md 5, v1.2). Flat fills,
        // never a gradient, never applied to a team crest or any other surface.
        id: {
          violet: "#3B1E6E",
          "violet-fg": "#CFB4FF",
          indigo: "#22265F",
          "indigo-fg": "#B3BEFF",
          azure: "#10324F",
          "azure-fg": "#8FCBF2",
          teal: "#0C3A38",
          "teal-fg": "#79DCCE",
          green: "#16391F",
          "green-fg": "#8EDCA2",
          amber: "#3C2A0C",
          "amber-fg": "#F2C978",
          rust: "#3F2113",
          "rust-fg": "#F3A985",
          rose: "#41162A",
          "rose-fg": "#F4A2BA",
          plum: "#371540",
          "plum-fg": "#E3A6F1",
        },
        live: "#F2415A",
        win: "#35C88F",
        warn: "#F0B429",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        display: ["40px", { lineHeight: "44px", letterSpacing: "-0.03em", fontWeight: "600" }],
        h1: ["26px", { lineHeight: "32px", letterSpacing: "-0.02em", fontWeight: "600" }],
        h2: ["20px", { lineHeight: "26px", letterSpacing: "-0.015em", fontWeight: "600" }],
        h3: ["16px", { lineHeight: "22px", letterSpacing: "-0.01em", fontWeight: "600" }],
        body: ["15px", { lineHeight: "22px", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "18px", fontWeight: "400" }],
        label: ["12px", { lineHeight: "16px", fontWeight: "500" }],
        "num-xl": ["28px", { lineHeight: "30px", fontWeight: "500" }],
        "num-lg": ["20px", { lineHeight: "24px", fontWeight: "500" }],
        "num-md": ["17px", { lineHeight: "20px", fontWeight: "500" }],
        "num-sm": ["12px", { lineHeight: "14px", fontWeight: "500" }],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        1: "0 1px 2px rgba(0, 0, 0, 0.45)",
        2: "0 12px 32px -16px rgba(0, 0, 0, 0.8)",
      },
      animation: {
        "live-pulse": "livePulse 2s ease-in-out infinite",
        "wave-bar": "waveBar 1.2s ease-in-out infinite",
      },
      keyframes: {
        livePulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        waveBar: {
          "0%, 100%": { transform: "scaleY(0.55)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
