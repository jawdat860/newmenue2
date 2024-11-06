/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  darkMode : "class",
  theme: {
    extend: {
      container : {
        center : true,
        padding : {
          default : "1rem",
          sm : "3rem"
        }
      },
      colors: {
        primary: "#ff0000",
        secondary: "#ff0000",
        appColor:"#eee",
        subcategories:"white",
        buttonOrgReadMore:"#58057a",
        dark: "#1e1e1e",
        light: "#f5f5f5",
        colorBtnCart:"#7b14c7",
        colorBtnCartText:"#fff",
        colorServiceCardOrderZakazatBg:"#ddd",
        colorServiceCardOrderZakazatBgAktive:"#ff0000",
        colorServiceCardOrderZakazatText:"#3d3d3d",
        colorServiceCardOrderZakazatTextAktive:"#fff"
      },
    },
  },
  plugins: [
  
  ],
}