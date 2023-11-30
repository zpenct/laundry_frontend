/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-soft":
          "linear-gradient(333deg, rgba(255,255,255,1) 2%, rgba(220,249,255,1) 100%)",
      },
      colors: {
        "blue-mid": "rgb(56 189 248)",
        "blue-dark": "rgb(14 165 233)",
      },
    },
  },
  plugins: [],
};
