const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./modules/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Gt walsheim"],
        serif: ["Gt walsheim"],
        mono: ["Fira Code"],
        display: ["Gt walsheim"],
        body: ["Gt walsheim"],
      },
      colors: {
        teal: colors.teal,
        cyan: colors.cyan,
        purple: {
          900: "#100033",
          800: "#210066",
          700: "#310099",
          600: "#4200CC",
          500: "#5200FF", // Archer Purple
          400: "#7333FF",
          300: "#9666FF",
          200: "#B999FF",
          100: "#DCCCFF",
          50: "#EEE5FF",
        },
        grayscale: {
          900: "#0D0D0D", // Use instead of #000
          800: "#1A1A1A",
          700: "#333333",
          600: "#666666",
          500: "#999999",
          400: "#B2B2B2",
          300: "#E5E5E5",
          200: "#F2F2F2",
          100: "#FAFAFA",
          50: "#FFFFFF", // White
        },
        ash: "#FDFDFD",
        bdCard: "#cecece",
        reqBanner : '#5a69e8'
      },
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', {
          letterSpacing: '0em',
          lineHeight: '24px',
        }],
        md: ['18px', {
          letterSpacing: '0em',
          lineHeight: '21px',
        }],
        lg: ['24px', {
          letterSpacing: '-0.02em',
          lineHeight: '32px',
        }],
        xl: ['36px', {
          letterSpacing: '0em',
          lineHeight: '41.22px',
        }],
        '2xl': ['64px', {
          letterSpacing: '-0.03em',
          lineHeight: '73.28px',
        }],
        '3xl': ['80px', {
          letterSpacing: '-0.03em',
          lineHeight: '81.6px',
        }],
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio"), require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
