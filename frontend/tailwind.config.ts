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
        primary: {
          light: "#8d6e63",
          main: "pink",
          dark: "#5d4037",
        },
      },
      // keyframes: {
      //   bounce: {
      //     "0%, 100%": {
      //       transform: "translateY(-40px)",
      //       animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
      //     },
      //     "50%": {
      //       transform: "translateY(0)",
      //       animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
      //     },
      //   },
      // },
      // animation: {
      //   bounce: "bounce 2s infinite",
      //   "waving-hand": "wave 2s linear infinite",
      // },
    },
  },
};

export default config;
