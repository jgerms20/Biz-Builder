import type { Config } from "tailwindcss";

/* Role-named tokens — a rebrand is a value edit here, never a rename across
   the codebase. Page JSX references bg-brand / text-ink / border-line, never
   a color name. */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "{{TOKEN_BG}}",
        surface: "{{TOKEN_SURFACE}}",
        surface2: "{{TOKEN_SURFACE2}}",
        line: "{{TOKEN_LINE}}",
        brand: "{{TOKEN_BRAND}}",
        "brand-strong": "{{TOKEN_BRAND_STRONG}}",
        accent: "{{TOKEN_ACCENT}}",
        ink: "{{TOKEN_INK}}",
        "ink-muted": "{{TOKEN_INK_MUTED}}",
      },
      fontFamily: {
        display: ["{{HEADING_FONT}}", "Georgia", "serif"],
        sans: ["{{BODY_FONT}}", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-md": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.2" }],
      },
      spacing: { section: "6rem", "section-sm": "4rem" },
      maxWidth: { content: "1140px" },
    },
  },
  plugins: [],
};

export default config;
