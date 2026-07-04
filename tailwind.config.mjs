/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        tinta: "#2A2438",
        marfil: "#FBF7F2",
        "marfil-hondo": "#F3EBE1",
        durazno: "#E8A87C",
        rosa: "#D99A9E",
        champagne: "#C9A96A",
        polvo: "#A8B5C4",
        vino: "#6E2B3A",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        script: ['"Pinyon Script"', "cursive"],
        cuerpo: ['"Jost"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
