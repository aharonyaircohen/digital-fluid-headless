export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          950: "#050d1c",
          900: "#0A1628",
          800: "#11263F",
          700: "#1C395A",
          600: "#274A77",
          500: "#33598F",
        },
        aqua: {
          400: "#65C7FF",
          300: "#72E0FF",
          200: "#9BE5FF",
        },
        violet: {
          400: "#A79DFF",
          300: "#C2B8FF",
        },
        gold: {
          500: "#E8B46A",
          400: "#F2C98B",
          300: "#FFDFAE",
        },
        "neutral-d": {
          50: "#F8FAFC",
          100: "#E2E8F0",
          200: "#CBD5E1",
          300: "#94A3B8",
          400: "#64748B",
          500: "#475569",
          600: "#334155",
          700: "#1E293B",
          800: "#0F172A",
          900: "#020617",
        },
        semantic: {
          success: "#22C55E",
          warning: "#FACC15",
          danger: "#EF4444",
          info: "#38BDF8",
        },
      },
      fontFamily: {
        sans: ["Heebo", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        accent: [
          "Space Grotesk",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        soft: "12px",
        card: "18px",
        pill: "999px",
      },
      boxShadow: {
        elevated: "0 18px 45px rgba(0, 0, 0, 0.45)",
        "soft-inner": "inset 0 0 0 1px rgba(148, 163, 184, 0.3)",
      },
      spacing: {
        18: "18px",
        22: "22px",
        26: "26px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
        },
        screens: {
          "2xl": "1120px",
        },
      },
      keyframes: {
        "fluid-gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "hover-scale-soft": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.02)" },
        },
      },
      animation: {
        "fluid-gradient": "fluid-gradient 24s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.4s ease-out both",
        "hover-scale-soft": "hover-scale-soft 0.2s ease-out both",
      },
      transitionTimingFunction: {
        "ease-fluid": "cubic-bezier(0.4, 0.0, 0.2, 1)",
      },
      transitionDuration: {
        200: "200ms",
        400: "400ms",
      },
    },
  },
  plugins: [],
};
