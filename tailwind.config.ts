import type { Config } from "tailwindcss";

// W1 — Ghana Business Score
// Theme: warm near-black bg, #FF7A00 orange primary, white text
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // BVM base palette
        navy:   { DEFAULT: "#0A0E1A" },
        teal:   { DEFAULT: "#1D9E75", light: "#E1F5EE", dark: "#085041" },
        gold:   { DEFAULT: "#E8A020", light: "#FEF3E2", dark: "#633806" },
        bblue:  { DEFAULT: "#185FA5", light: "#E6F1FB" },
        ink:    { DEFAULT: "#111827" },
        mid:    { DEFAULT: "#4B5563" },
        subtle: { DEFAULT: "#F3F4F6" },
        border: { DEFAULT: "#E5E7EB" },
        // W1 specific
        orange: { DEFAULT: "#FF7A00", light: "rgba(255,122,0,0.12)", dark: "#C45800" },
        "w1-bg": { DEFAULT: "#0B0907" },
        "w1-card": { DEFAULT: "#141210" },
        "w1-border": { DEFAULT: "rgba(255,255,255,0.08)" },
      },
      fontFamily: {
        sans:    ["var(--font-body)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
      },
      lineHeight: {
        body:    "1.65",
        display: "1.2",
      },
    },
  },
  plugins: [],
};
export default config;
