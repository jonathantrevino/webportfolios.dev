import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: { break: "1255px" },
      colors: {
        'custom-gray': '#F7F7F7',
      },
      animation: {
        'gradient-animation': 'gradient 60s ease infinite',
        'gradient-opposite-animation': 'gradient-opposite 60s ease infinite'
      },
      backgroundImage: {
      },
      keyframes: {
        gradient: {
          '0%': {
            'background-position': '0% 0%',
          },
          '25%': {
            'background-position': '150% 0%',
            'background-size': '200% 200%',
          },
          '50%': {
            'background-position': '75% 100%',
            'background-size': '75% 100%',
          },
          '75%': {
            'background-position': '0% 100%',
            'background-size': '200% 200%',
          },
          '100%': {
            'background-position': '0% 0%',
          },
        },
        'gradient-opposite': {
          '0%': {
            'background-position': '0% 0%',
          },
          '25%': {
            'background-position': '0% 100%',
            'background-size': '200% 200%',
          },
          '50%': {
            'background-position': '25% 0%',
            'background-size': '75% 100%',
          },
          '75%': {
            'background-position': '150% 0%',
            'background-size': '200% 200%',
          },
          '100%': {
            'background-position': '0% 0%',
          },
        },

      }
    },
  },
  plugins: [require("daisyui")],
};
export default config;
