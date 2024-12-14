/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e0f8fb",
          100: "#b3ecf5",
          200: "#80e0ee",
          300: "#4dd4e7",
          400: "#26c8df",
          500: "#00bcd6",
          600: "#00a8c2",
          700: "#008ca3",
          800: "#007186",
          900: "#005465",
        },
      },
    },
  },
  plugins: [],
};
