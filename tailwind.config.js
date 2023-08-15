/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        jakartaSans: ["Plus Jakarta Sans", "sans-serif"],
        noto: ["Noto Serif Vithkuqi", "sans-serif"],
      },
      container: {
        center: true,
        padding: "0.75rem",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2563EB",
          secondary: "#f000b8",
          accent: "#ff7101",
          neutral: "#2b3440",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
