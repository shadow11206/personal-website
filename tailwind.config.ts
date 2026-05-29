import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xiaomi: {
          orange: "#ff6700",
          "orange-light": "rgba(255,103,0,0.15)",
        },
        text: {
          primary: "#1a1a1a",
          body: "#666666",
          secondary: "#888888",
          caption: "#999999",
        },
        surface: {
          light: "#fafafa",
          border: "#e8e8e8",
          divider: "#f0f0f0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "float-up": "floatUp 0.3s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        floatUp: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-4px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
