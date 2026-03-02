import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F7F2E9",
        "cream-dark": "#EDE5D6",
        charcoal: "#1A1714",
        "charcoal-light": "#3D3530",
        terracotta: "#A85C3A",
        "terracotta-dark": "#8A4A2E",
        olive: "#2C3E2D",
        "olive-light": "#3D5640",
        gold: "#C9A85C",
        "gold-light": "#D9BF80",
        gray: "#E8E0D4",
        "gray-dark": "#C8BFB2",
      },
      fontFamily: {
        serif: ["Cormorant Garant", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-md": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.2" }],
      },
      spacing: {
        "section": "6rem",
        "section-sm": "4rem",
      },
      maxWidth: {
        "content": "1140px",
      },
      borderRadius: {
        "brand": "2px",
      },
    },
  },
  plugins: [],
};
export default config;
