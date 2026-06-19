module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0b1230',
        surface2: '#111d3d',
        accent: '#7c82ff',
        accent2: '#2de5ff',
        glow: '#6c6cff',
        text: '#e7f0ff',
      },
      boxShadow: {
        glow: '0 25px 80px rgba(78, 91, 255, 0.15)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at top, rgba(66, 107, 255, 0.2), transparent 40%), radial-gradient(circle at bottom right, rgba(88, 223, 255, 0.14), transparent 30%)',
      },
    },
  },
  plugins: [],
};
