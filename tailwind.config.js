/** @type {import('tailwindcss').Config} */

// 
const spacing = {
  0: '0rem', 
  1: '0.25rem', 
  2: '0.5rem', 
  3: '0.75rem', 
  4: '1rem', 
  5: '1.25rem', 
  6: '1.5rem', 
  7: '1.75rem', 
  8: '2rem', 
  9: '2.25rem', 
  10: '2.5rem',
};

const fallbackAppBarWidth = '64px';

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.625rem'
      },
      spacing: {
        input: "3.125rem",
        appbar: `var(--appbar-width, ${fallbackAppBarWidth})`
      },
      colors: {
        primary: "#ed6103",
        secondary: "#A2A2A2",
        danger: "#ED0303"
      }
    },
  },
  plugins: [],
}
