import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#0f172a",
          teal: "#0f766e",
          mist: "#ecfeff",
          gold: "#f59e0b",
        },
      },
    },
  },
  plugins: [],
};

export default config;
