import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Deevid color system
        primary: {
          DEFAULT: "hsl(var(--primary))", // #2EA6FF
          foreground: "hsl(var(--primary-foreground))", // #FFFFFF
          light: "hsl(var(--primary-light))", // #38A6FF
          dark: "hsl(var(--primary-dark))", // #1496E8
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // #0B0D0E
          foreground: "hsl(var(--secondary-foreground))", // #D9DBDE
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // #9DA3A8
          foreground: "hsl(var(--muted-foreground))", // #AAB0B6
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // #00E0C6
          foreground: "hsl(var(--accent-foreground))",
          blue: "hsl(var(--accent-blue))", // #2EA6FF
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))", // #0F1112
          foreground: "hsl(var(--card-foreground))", // #E6E7E9
        },
        
        // Deevid specific colors
        "black-base": "#050607",
        "card-dark-top": "#0F1112",
        "card-dark-bottom": "#0A0B0B",
        "primary-blue-start": "#38A6FF",
        "primary-blue-end": "#2EA6FF",
        "cta-teal-start": "#00E0C6",
        "cta-teal-end": "#07B0F0",
        "accent-yellow": "#FFD24D",
        "muted-gray": "#9DA3A8",
        "muted-gray-light": "#AAB0B6",
        
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'var(--primary-gradient)',
        'gradient-primary-hover': 'var(--primary-gradient-hover)',
        'gradient-hero': 'var(--hero-gradient)',
        'gradient-card': 'var(--card-gradient)',
        'gradient-glass': 'var(--glass-gradient)',
        'cta-pill-stroke': 'var(--cta-pill-stroke)',
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
        'glow-hover': 'var(--shadow-glow-hover)',
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'elevated': 'var(--shadow-elevated)',
        'nav': 'var(--shadow-nav)',
        'focus-ring': 'var(--focus-ring)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
