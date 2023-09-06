/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        mulish: ['var(--font-mulish)']
      },
      screens: {
        xxs: {
          min: "0px",
          max: "639px"
        },
        last:{
          min: "0px",
          max: "669px"
        },
        check:{
          min: "669px",
          max: "789px"
        },
        test:{
          min: "789px",
          max: "879px"
        },
        amd:{
          min: "879px",
          max: "999px"
        },
        blg: { //blg- break large
          min: "999px",
          max: "1129px"
        },
        alg:{ //alg- after large
          min: "1129px",
          max: "1287px"
        },
      }
    },
  },
  plugins: [],
}
