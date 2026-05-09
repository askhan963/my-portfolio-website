/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT: "var(--card-background)",
          foreground: "var(--foreground)",
        },
        border: "var(--border-color)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgb(15 23 42 / 0.04), 0 10px 30px -12px rgb(15 23 42 / 0.08)",
        "card-dark":
          "0 1px 2px rgb(0 0 0 / 0.35), 0 14px 40px -14px rgb(0 0 0 / 0.55)",
      },
    },
  },
  plugins: [],
};
