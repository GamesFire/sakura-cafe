/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
        "4xl": "1728px",
        "5xl": "1920px",
        "6xl": "2560px",
        "7xl": "3840px",
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        "header-color": "#FFD9E4",
        "btn-color": "#FDB3BD",
        "btn-active": "#F4929F",
      },
      content: {
        trayIcon: 'url("/images/icons/tray.svg")',
        accountIcon: 'url("/images/icons/account.svg")',
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "about-us": "url('/images/bg-about-us-image.jpg')",
      },
    },
  },
  plugins: [],
};
