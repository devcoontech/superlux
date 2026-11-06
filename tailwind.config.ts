import type { Config } from "tailwindcss";

// Approved brand palette. Gold used with restraint.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#080808",
        "bg-2": "#141414",
        "bg-3": "#1b1b1b",
        gold: "#FFD700",
        "gold-soft": "#d9ae3a",
        // Secondary text on near-black: both stay well above WCAG AA (4.5:1).
        muted: "#D6D6D6",
        "muted-2": "#ADADAD",
        line: "#242424",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "1280px" },
    },
  },
  plugins: [],
};
export default config;
