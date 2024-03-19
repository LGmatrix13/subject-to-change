/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        main: "#EAF1F5",
      },
      boxShadow: {
        'inset-slate800-from-top-right': 'inset 5px 5px 15px rgba(71, 85, 105, 0.08), inset -5px -5px 15px rgba(255, 255, 255, 0.4)',
      },
    },
  },
  plugins: [],
};
