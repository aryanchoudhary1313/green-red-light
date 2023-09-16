import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        desktop: "80%",
        mobile: "90%",
      },
      backgroundImage: {
        redLightGreenLight: "url(../../public/assets/redGreen.jpg)",
      },
    },
  },
  plugins: [],
};
export default config;
