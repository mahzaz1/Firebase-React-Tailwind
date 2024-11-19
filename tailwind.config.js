/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ahzaz: "#f0f",
      },
      fontFamily: {
        display: ["Poppins", "sasn-serif"],
      },
      screens: {
        xs: { min: "0px", max: "367px" },
      },
    },
  },
  plugins: [],
};
