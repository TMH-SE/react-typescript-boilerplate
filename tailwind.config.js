module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        login: "url('/src/assets/images/background-login.jpg')",
      }),
      backgroundColor: theme => ({
        ...theme('colors'),
        'login-color': 'rgb(255,244,106)',
      }),
    },
    fontFamily: {
      georama: ['Georama', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
