/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path to match your project structure
    "./public/index.html",
  ],

  theme: {
    extend: {
      spacing: {
        95: "13rem", // Or any other value you prefer
        96: "16rem", // Or any other value you prefer
        97: "18rem", // Or any other value you prefer
        98: "19rem", // Or any other value you prefer
        100: "23rem", // Or any other value you prefer
      },
    },
  },
  plugins: [],
};
