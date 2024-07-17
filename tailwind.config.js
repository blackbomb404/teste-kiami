/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'light-gray': '#f2f2f2',
        'dark-gray': '#ccc',
        'dark-blue': '#0c3081',
        'darker-blue': '#091c4e',
        'input-bg': '#e6e6e6',
        'orange': '#ff0000'
      }
    },
  },
  plugins: [],
}

