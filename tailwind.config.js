/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 足球主题色
        pitch: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#1db954',  // 主绿色
          600: '#19a34a',
          700: '#15803d',
          800: '#116132',
          900: '#0d2818',  // 深色背景
          950: '#0a1f0a',  // 最深背景
        },
        gold: {
          50: '#fff9e6',
          100: '#fff0bf',
          200: '#ffe699',
          300: '#ffd666',
          400: '#f5c542',  // 金色强调
          500: '#e6b422',
          600: '#cc9f1e',
          700: '#b38a1a',
          800: '#997516',
          900: '#806012',
        },
        stadium: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
        }
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-pitch': 'linear-gradient(135deg, #0a1f0a 0%, #0d2818 50%, #11271a 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(29, 185, 84, 0.1) 0%, rgba(13, 40, 24, 0.8) 100%)',
        'gradient-gold': 'linear-gradient(135deg, #f5c542 0%, #e6b422 100%)',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 30px rgba(29, 185, 84, 0.2)',
        'gold': '0 0 20px rgba(245, 197, 66, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(29, 185, 84, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(29, 185, 84, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
