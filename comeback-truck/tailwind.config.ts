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
        "ct-black": "#0A0E0E",
        "ct-charcoal": "#101818",
        "ct-surface": "#162020",
        "ct-surface-2": "#1C2A2A",
        "ct-border": "#253535",
        // Primary: teal (replaces mustard as main brand accent)
        "ct-mustard": "#0ABFBF",
        "ct-mustard-light": "#22D9D9",
        "ct-mustard-dark": "#088A8A",
        // Orange accent
        "ct-orange": "#E8720C",
        "ct-orange-light": "#F5933A",
        "ct-orange-dark": "#B5560A",
        // Keep red for type pills
        "ct-red": "#B5301E",
        "ct-red-dark": "#8A1F11",
        // Text colors
        "ct-cream": "#F0F5F5",
        "ct-cream-muted": "#A8BFBF",
        "ct-muted": "#6A8888",
      },
      backgroundImage: {
        "gradient-mustard":
          "linear-gradient(135deg, #0ABFBF 0%, #22D9D9 50%, #088A8A 100%)",
        "gradient-smoke":
          "linear-gradient(180deg, #0A0E0E 0%, #101818 100%)",
        "gradient-heat":
          "linear-gradient(135deg, #088A8A 0%, #0ABFBF 50%, #E8720C 100%)",
        "gradient-orange":
          "linear-gradient(135deg, #E8720C 0%, #F5933A 50%, #B5560A 100%)",
      },
      fontFamily: {
        display: ["Alfa Slab One", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
