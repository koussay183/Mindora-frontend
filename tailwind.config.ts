import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main Background
        bg: '#FAFBFC',
        'bg-secondary': '#F4F6F8',
        
        // Primary Brand - Deep Indigo (Trust, Intelligence)
        primary: {
          DEFAULT: '#4C51BF',
          dark: '#3C366B',
          light: '#6B70D9',
          lighter: '#E0E2F8',
        },
        
        // Accent - Warm Coral (Action, Energy)
        accent: {
          DEFAULT: '#F56565',
          dark: '#C53030',
          light: '#FC8181',
          lighter: '#FED7D7',
        },
        
        // Secondary - Soft Lavender (Calm, Introspection)
        secondary: {
          DEFAULT: '#9F7AEA',
          dark: '#6B46C1',
          light: '#B794F4',
          lighter: '#E9D8FD',
        },
        
        // Success - Fresh Teal (Positive, Growth)
        success: {
          DEFAULT: '#38B2AC',
          dark: '#2C7A7B',
          light: '#4FD1C5',
          lighter: '#B2F5EA',
        },
        
        // Text Colors
        text: {
          primary: '#1A202C',
          secondary: '#4A5568',
          tertiary: '#718096',
          inverse: '#FFFFFF',
        },
        
        // Personality Type Colors
        personality: {
          analyst: '#4C51BF',    // Indigo - Logical
          diplomat: '#38B2AC',   // Teal - Empathetic  
          explorer: '#F56565',   // Coral - Adventurous
          sentinel: '#9F7AEA',   // Lavender - Protective
        },
      },
      fontFamily: {
        'sans': ['splittext', 'Space Grotesk', 'system-ui', 'sans-serif'],
        'inter': ['splittext', 'system-ui', 'sans-serif'],
        'space': ['splittext', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
        'large': '0 12px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)',
        'glow-primary': '0 0 20px rgba(76, 81, 191, 0.3)',
        'glow-accent': '0 0 20px rgba(245, 101, 101, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
