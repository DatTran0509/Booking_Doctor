/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5f6FFF',
        secondary: '#14171A',
        accent: '#657786',
        background: '#E1E8ED',
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out forwards',
        'bounce-in': 'bounceIn 1.5s ease-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse': 'pulse 2s infinite',
        'slide-in': 'slideIn 1.5s ease-out forwards',
        'fade-in-out': 'fadeInOut 3s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 2.5s infinite',
        'shadow-pulse': 'shadowPulse 2s ease-in-out infinite', // Hiệu ứng đổ bóng lặp lại
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInOut: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        shadowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(0, 0, 0, 0)' },
          '50%': { boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)' },
        },
      },
    },
  },
  plugins: [],
}
