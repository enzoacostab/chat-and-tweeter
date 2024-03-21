import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "background": "rgb(var(--background-rgb))",
        "foreground": "rgb(var(--foreground-rgb))",
        "primary": "rgb(var(--primary))",
        "secondary": "rgb(var(--secondary))"
      },
      animation: {
        "appear": "appear .2s",
      },
      keyframes: {
        "appear": {
          "0%": { "opacity": "0" },
          "100%": { "opacity": "100%" }
        }
      }
    },
  },
  plugins: [],
};
export default config;
