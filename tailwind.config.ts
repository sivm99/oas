import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@uploadthing/react/dist**",
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
        // jumpToCenter: {
        //   "0%": {
        //     transform: "translate(0, 0) scale(1)",
        //     opacity: "1",
        //   },
        //   "50%": {
        //     transform:
        //       "translate(calc(50vw - 50%), calc(50vh - 50%)) scale(1.2)",
        //     opacity: "0.7",
        //   },
        //   "100%": {
        //     transform: "translate(calc(50vw - 50%), calc(50vh - 50%)) scale(1)",
        //     opacity: "0",
        //   },
        // },
        // fadeIn: {
        //   "0%": { opacity: "0" },
        //   "100%": { opacity: "1" },
        // },
        // gradientFlow: {
        //   "0%": { transform: "rotate(0deg)" },
        //   "100%": { transform: "rotate(360deg)" },
        // },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};

export default config;
