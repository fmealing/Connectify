module.exports = {
  content: ["./index.html", "./frontend/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6A0DAD", // Primary Color
        "primary-dark": "#5A0BA0", // Primary Dark Color
        accent: "#FF6F61", // Accent Color
        "accent-dark": "cc594e", // Accent Dark Color
        background: "#F7F8FA", // Background Color
        secondary: "#2BD9A8", // Secondary Color
        "secondary-light": "#bff4e5", // Secondary Light Color
        text: "#333333", // Text Color
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"], // Heading Font
        body: ["Inter", "sans-serif"], // Body Font
      },
      fontSize: {
        h1: ["48px", "1.2"], // H1 with line height
        h2: ["36px", "1.3"], // H2 with line height
        h3: ["28px", "1.4"], // H3 with line height
        body: ["16px", "1.6"], // Body Text with line height
        button: ["18px", "1.5"], // Button Text
        label: ["14px", "1.5"], // Label Text
      },
    },
  },
  plugins: [],
};
