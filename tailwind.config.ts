import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          void: "#06080D",
          base: "#0B0E17",
          surface: "#111622",
          elevated: "#171E2D",
        },
        charcoal: {
          void: "#06080D",
          base: "#0B0E17",
          surface: "#111622",
          elevated: "#171E2D",
          border: "rgba(255, 255, 255, 0.08)",
        },
        ivory: {
          light: "#FDFCF7",
          base: "#F7F5EE",
          surface: "#EFECE2",
          border: "rgba(18, 21, 27, 0.09)",
          dark: "#0E121A",
          muted: "#4A5260",
        },
        gold: {
          champagne: "#F4E7BD",
          primary: "#C5A059",
          bright: "#D4AF37",
          hover: "#B28D46",
          muted: "#8C733E",
          dark: "#5A4822",
          subtle: "rgba(197, 160, 89, 0.12)",
          glow: "rgba(197, 160, 89, 0.25)",
        },
        amber: {
          primary: "#C5A059", // Upgraded to Golden Precision tone for system harmony
          hover: "#B28D46",
          subtle: "rgba(197, 160, 89, 0.12)",
          raw: "#F59E0B",
        },
        telemetry: {
          cyan: "#06B6D4",
          green: "#10B981",
          red: "#EF4444",
        },
        industrial: {
          white: "#F8FAFC",
          platinum: "#CBD5E1",
          silver: "#94A3B8",
          dark: "#0F172A",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          active: "rgba(197, 160, 89, 0.50)",
          gold: "rgba(197, 160, 89, 0.35)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        // Design system typography scale
        "display-1": ["4rem", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-1-mobile": ["2.5rem", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "heading-1": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.020em" }],
        "heading-2": ["2.25rem", { lineHeight: "1.22", letterSpacing: "-0.015em" }],
        "heading-3": ["1.375rem", { lineHeight: "1.30", letterSpacing: "-0.010em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.60" }],
        "body-base": ["0.938rem", { lineHeight: "1.55" }],
        "body-sm": ["0.813rem", { lineHeight: "1.50", letterSpacing: "0.005em" }],
        "technical": ["0.75rem", { lineHeight: "1.40", letterSpacing: "0.080em" }],
        "metric": ["3.25rem", { lineHeight: "1.00", letterSpacing: "-0.030em" }],
      },
      spacing: {
        // Design system 8px base spatial grid
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "6": "24px",
        "8": "32px",
        "9": "36px",
        "10": "40px",
        "11": "44px",
        "12": "48px",
        "13": "52px",  // Button lg height
        "14": "56px",
        "16": "64px",
        "18": "72px",  // Header height desktop
        "20": "80px",
        "24": "96px",
        "28": "112px",
        "32": "128px",
      },
      height: {
        "13": "52px",  // Button lg height
        "18": "72px",  // Header mobile/tablet height
        "20": "80px",  // Header desktop height
      },
      borderRadius: {
        none: "0px",
        sm: "3px",
        DEFAULT: "6px",
        md: "6px",
        lg: "10px",
        // Pill / bubble radii (>12px) explicitly prohibited per design system
        // except for circular indicators and compact badges
      },
      boxShadow: {
        "industrial-sm": "0 2px 4px rgba(0, 0, 0, 0.4)",
        "industrial-md":
          "0 6px 18px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06)",
        "industrial-lg":
          "0 16px 36px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08)",
        "amber-glow": "0 0 20px rgba(197, 160, 89, 0.25)",
        "gold-glow": "0 0 24px rgba(197, 160, 89, 0.22)",
        "gold-glow-lg": "0 0 40px rgba(197, 160, 89, 0.30)",
        "ivory-elevated": "0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(18, 21, 27, 0.06)",
      },
      maxWidth: {
        "7xl": "1280px",
        "3xl": "740px",
        xl: "580px",
      },
      screens: {
        // Design system breakpoints
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      transitionTimingFunction: {
        industrial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        // Design system motion tokens
        "150": "150ms",
        "280": "280ms",
        "450": "450ms",
        "700": "700ms",
      },
      animation: {
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "fade-in": "fadeIn 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down": "slideDown 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "telemetry-pulse": "telemetryPulse 3s ease-in-out infinite",
      },
      keyframes: {
        ping: {
          "75%, 100%": {
            transform: "scale(2)",
            opacity: "0",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        telemetryPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
