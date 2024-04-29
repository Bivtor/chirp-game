import type { Config } from "tailwindcss";




const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "chirp-c": "#ef434a", /* Red */
      "chirp-h": "#f89821", /* Orange */
      "chirp-i": "#f9ca50", /* Yellow */
      "chirp-r": "#92be6e", /* Green */
      "chirp-p": "#2b7ca0"  /* Blue */
    },
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'logo': '72px', // black 
        'phone-logo': '66px', // black 
        'heading': '36px', // heavy
        'subheading': '20px', // heavy
        'body': '12px' // avenir(book)
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
