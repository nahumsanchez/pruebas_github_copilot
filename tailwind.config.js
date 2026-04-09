/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "cyber-bg": "#090611",
        "cyber-panel": "#130b24",
        "neon-violet": "#bc35ff",
        "neon-violet-soft": "#9f3cf9",
        "neon-cyan": "#2be7f5",
        "neon-rose": "#ff5fd8",
      },
      boxShadow: {
        "neon-violet": "0 0 25px rgba(188, 53, 255, 0.35)",
        "neon-cyan": "0 0 24px rgba(43, 231, 245, 0.3)",
      },
      keyframes: {
        floatUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(188, 53, 255, 0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(188, 53, 255, 0.4)" },
        },
      },
      animation: {
        "float-up": "floatUp 0.75s ease-out forwards",
        "pulse-glow": "pulseGlow 3.5s ease-in-out infinite",
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Rajdhani", "sans-serif"],
      },
    },
  },
  plugins: [],
};
