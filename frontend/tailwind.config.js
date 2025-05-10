module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          50: '#EBEAFE',
          100: '#D7D5FD',
          200: '#B0ABFB',
          300: '#8880F9',
          400: '#6156F7',
          500: '#4F46E5',
          600: '#2415E3',
          700: '#1B0FB0',
          800: '#140B7D',
          900: '#0C074A'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 0 10px -2px rgba(255, 107, 0, 0.1)',
      },
      screens: {
        'xs': '475px',
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ]
};
