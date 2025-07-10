/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
        "primary-dark": "#1e90ff",
        background: "#f0f2f5",
        foreground: "#1a1a1a",
        "card-background": "#ffffff",
        "border-color": "#e5e7eb",
        "dark-background": "#121212",
        "dark-foreground": "#e5e5e5",
        "dark-card-background": "#1e1e1e",
        "dark-border-color": "#2c2c2c",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
