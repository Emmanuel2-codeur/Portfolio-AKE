export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        accent: '#4f8ef7',
        accent2: '#f4a261',
      },
      backdropBlur: { glass: '18px', heavy: '32px' },
    }
  },
  plugins: [],
}
