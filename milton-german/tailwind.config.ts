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
        "mg-navy": "#1B2A4A",
        "mg-navy-light": "#2C3F66",
        "mg-navy-dark": "#111D35",
        "mg-slate": "#F4F6F9",
        "mg-slate-dark": "#E2E7EF",
        "mg-green": "#2D7D46",
        "mg-green-dark": "#1F5C33",
        "mg-gold": "#C9A85C",
        "mg-charcoal": "#1A1A2E",
        "mg-white": "#FFFFFF",
        "mg-muted": "#6B7A99",
      },
      fontFamily: {
        serif: ["Cormorant Garant", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        section: "6rem",
        "section-sm": "4rem",
      },
      maxWidth: {
        content: "1140px",
      },
      borderRadius: {
        brand: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
