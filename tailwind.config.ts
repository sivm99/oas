import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "border-glow": "borderGlow 5s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "border-glow-premium": "border-glow-premium 6s infinite",
        "border-glow-standard": "border-glow-standard 8s infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-ring": "pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "text-shimmer": "text-shimmer 5s infinite linear",
        "gradient-flow": "gradient-flow 8s ease infinite",
        "circular-glow":
          "circular-glow 2.5s infinite cubic-bezier(0, 0.5, 0.5, 1)",
        "rotate-gradient": "rotate-gradient 10s linear infinite",
      },
      keyframes: {
        borderGlow: {
          "0%, 100%": { borderColor: "#ff6ec4" },
          "33%": { borderColor: "#7873f5" },
          "66%": { borderColor: "#42d392" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fly: {
          "0%": {
            transform: "translate(-50%, -50%) rotate(0deg) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) rotate(360deg) scale(1.5)",
          },
          "100%": {
            transform: "translate(-50%, -50%) rotate(720deg) scale(1)",
          },
        },
        "border-glow-premium": {
          "0%, 100%": {
            borderColor: "hsl(var(--primary))",
            boxShadow: "0 0 10px 0 rgba(var(--primary), 0.3)",
          },
          "25%": {
            borderColor: "#ff6ec4",
            boxShadow: "0 0 15px 0 rgba(255, 110, 196, 0.5)",
          },
          "50%": {
            borderColor: "#c084fc",
            boxShadow: "0 0 20px 0 rgba(192, 132, 252, 0.5)",
          },
          "75%": {
            borderColor: "#8b5cf6",
            boxShadow: "0 0 15px 0 rgba(139, 92, 246, 0.5)",
          },
        },
        "border-glow-standard": {
          "0%, 100%": {
            borderColor: "#3b82f6",
            boxShadow: "0 0 8px 0 rgba(59, 130, 246, 0.3)",
          },
          "33%": {
            borderColor: "#10b981",
            boxShadow: "0 0 12px 0 rgba(16, 185, 129, 0.3)",
          },
          "66%": {
            borderColor: "#0ea5e9",
            boxShadow: "0 0 8px 0 rgba(14, 165, 233, 0.3)",
          },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulse: {
          "0%, 100%": {
            opacity: "0.1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.3",
            transform: "scale(1.05)",
          },
        },
        "pulse-ring": {
          "0%": {
            transform: "translate(-50%, -50%) scale(0.7)",
            opacity: "0.3",
          },
          "50%": {
            opacity: "0.1",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: "0",
          },
        },
        "text-shimmer": {
          "0%": {
            backgroundPosition: "200% 0",
          },
          "100%": {
            backgroundPosition: "-200% 0",
          },
        },
        "gradient-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "circular-glow": {
          "0%": {
            transform: "translate(-50%, -50%) scale(0)",
            opacity: "0.8",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(2.5)",
            opacity: "0",
          },
        },
        "rotate-gradient": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};

export default withUt(config);
