module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        roboto: ['var(--font-roboto)'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
      },
      backgroundColor: {
        'theme': 'var(--background)',
        'primary': 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'primary-glow': 'var(--primary-glow)',
      },
      textColor: {
        'theme': 'var(--foreground)',
        'primary': 'var(--primary)',
      },
      gradientColorStops: {
        'start': 'var(--gradient-start)',
        'mid': 'var(--gradient-mid)',
        'end': 'var(--gradient-end)',
      },
      borderColor: {
        'primary': 'var(--primary)',
      },
      ringColor: {
        'primary': 'var(--primary)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};