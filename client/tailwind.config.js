/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f0f0f0',       // Changed to light for better contrast
        accent: '#10b981',        // Bringing back green accent
        darkText: '#f3f4f6',      // Light text for dark theme
        darkBg: {
          900: '#000000', // Pure black - immersive depth
          800: '#0A0A0A', // Used for full page background — pure dark
          700: '#121212', // Slightly lifted background — cards, sections
          600: '#1E1E1E', // Borders, card contrast — still dark but clear edges
        },
        cardBg: '#121212',        // Card background color - darker
        borderColor: '#2A2A2A',   // Border color for dark theme - darker
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, #f0f0f0, #d1d1d1)',
        'gradient-accent': 'linear-gradient(to right, #10b981, #059669)',
        'gradient-warning': 'linear-gradient(to right, #f59e0b, #d97706)',
        'gradient-error': 'linear-gradient(to right, #ef4444, #dc2626)',
        'gradient-dark': 'linear-gradient(to bottom, #121212, #000000)',
        'gradient-card': 'linear-gradient(145deg, #0f0f0f, #1c1c1c)',
      },
      boxShadow: {
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'glow-primary': '0 0 15px rgba(240, 240, 240, 0.3)',
        'glow-accent': '0 0 15px rgba(16, 185, 129, 0.5)',
        'inner-dark': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
} 