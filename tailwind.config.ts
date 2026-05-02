import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050609",
        panel: "#12151c",
        panelSoft: "#171b24",
        line: "#2a303b",
        gold: "#c9a45c",
        blue: "#29a8ff",
        cyan: "#6ee7ff"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(41, 168, 255, 0.18), 0 20px 80px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
