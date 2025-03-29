import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Define colors using CSS variables for theming
        // These names match the utilities (e.g., bg-background-primary)
        background: {
          primary: 'var(--background-primary)',
          secondary: 'var(--background-secondary)',
          tertiary: 'var(--background-tertiary)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
        border: {
          DEFAULT: 'var(--border-color)', // Allows using just `border` class
        },
        accent: {
          DEFAULT: 'var(--accent-color)', // Allows using bg-accent, text-accent etc.
          dark: 'var(--accent-color-dark)',
          transparent: 'var(--accent-color-transparent)',
        },
        destructive: {
           DEFAULT: 'var(--destructive-color)',
        }
        // Add other semantic colors if needed
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
       fontFamily: { // Add font family definitions from layout.tsx
         sans: ['var(--font-geist-sans)'],
         mono: ['var(--font-geist-mono)'],
       },
    },
  },
  plugins: [],
}
export default config
