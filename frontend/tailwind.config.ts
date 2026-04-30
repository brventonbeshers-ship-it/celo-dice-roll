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

// tw: 1776493546716

// tw: 1776518149383

// tw: 1776549599389

// tw: 1776584908507

// tw: 1776618925980

// tw: 1776644081432

// tw: 1776672013184

// tw: 1776679109443

// tw: 1776701056299

// tw: 1776751382226

// tw: 1776780886999

// tw: 1776804066750

// tw: 1776817079230

// tw: 1776833944394

// tw: 1776862825174

// tw: 1776876001392

// tw: 1776889547039

// tw: 1776938749424

// tw: 1776962005632

// tw: 1777001139840

// tw: 1777024666262

// tw: 1777037025510

// tw: 1777066268623

// tw: 1777102893709

// tw: 1777118904778

// tw: 1777183692189

// tw: 1777193979858

// tw: 1777265702729

// tw: 1777328460545

// tw: 1777355971946

// tw: 1777447673802

// tw: 1777586705617
