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
        
        // Modern AI/E-commerce color system
        primary: {
          DEFAULT: "hsl(var(--primary))", // Vibrant purple #9d4edd
          foreground: "hsl(var(--primary-foreground))", // #FFFFFF
          light: "hsl(var(--purple-light))", // Lighter purple
          dark: "hsl(var(--purple-dark))", // Darker purple
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Soft lavender
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // Very light purple-gray
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Vibrant pink #f72585
          foreground: "hsl(var(--accent-foreground))",
          pink: "hsl(var(--pink-bright))", // Bright pink
          "pink-soft": "hsl(var(--pink-soft))", // Soft pink
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))", // Pure white
          foreground: "hsl(var(--card-foreground))", // Deep purple-gray
        },
        
        // Modern specific colors
        "purple": {
          DEFAULT: "hsl(270, 80%, 60%)", // #9d4edd
          light: "hsl(270, 70%, 70%)",
          dark: "hsl(270, 80%, 50%)",
        },
        "pink": {
          DEFAULT: "hsl(330, 80%, 65%)", // #f72585
          soft: "hsl(330, 60%, 75%)",
        },
        "violet": {
          DEFAULT: "hsl(280, 70%, 65%)",
        },
        
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
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-card': 'var(--gradient-card)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-vibrant': 'var(--gradient-vibrant)',
        'gradient-soft': 'var(--gradient-soft)',
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
        'pink-glow': 'var(--shadow-pink-glow)',
        'card': 'var(--shadow-card)',
        'hover': 'var(--shadow-hover)',
        'soft': 'var(--shadow-soft)',
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
        "slide-fade": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "parallax": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-fade": "slide-fade 0.6s ease-out",
        "parallax": "parallax 20s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
