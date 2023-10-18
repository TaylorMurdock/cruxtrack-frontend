/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  theme: {
    extend: {
      spacing: {
        95: "13rem",
        96: "16rem",
        97: "18rem",
        98: "19rem",
        100: "23rem",
      },
    },
  },
  plugins: [],
};
