import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#080A12",
        panel: "#111827",
        line: "rgba(255,255,255,0.12)",
        mint: "#35D07F",
        sun: "#F7C948",
        coral: "#FF6B6B",
        violet: "#7C5CFF",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 0, 0, 0.28)",
      },
      keyframes: {
        lift: {
          "0%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-4px) scale(1.03)" },
          "100%": { transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        lift: "lift 0.45s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;

// tw: 1776459836097

// tw: 1776479333330
