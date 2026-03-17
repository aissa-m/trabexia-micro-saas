import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        trabexia: {
          primary: "#1e3a5f",
          secondary: "#2d5a87",
          accent: "#f59e0b",
          light: "#f0f4f8",
        },
        brand: {
          DEFAULT: "#ea580c",
          dark: "#c2410c",
          light: "#fff7ed",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
