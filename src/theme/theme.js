export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#F8FAFC",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        primary: {
          100: "#1E293B",
          200: "#172033",
          300: "#131b2e",
          400: "#0f1729",
          500: "#0A1020",
          600: "#070C18",
          700: "#050910",
          800: "#030608",
          900: "#020617",
        },
        greenAccent: {
          100: "#F0FDF4",
          200: "#DCFCE7",
          300: "#BBF7D0",
          400: "#86EFAC",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
        },
        redAccent: {
          100: "#FFF1F2",
          200: "#FFE4E6",
          300: "#FECDD3",
          400: "#FDA4AF",
          500: "#F43F5E",
          600: "#E11D48",
          700: "#BE123C",
          800: "#9F1239",
          900: "#881337",
        },
        blueAccent: {
          100: "#EFF6FF",
          200: "#DBEAFE",
          300: "#BFDBFE",
          400: "#93C5FD",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        glass: {
          card: "rgba(30, 41, 59, 0.6)",
          cardHover: "rgba(30, 41, 59, 0.8)",
          border: "rgba(148, 163, 184, 0.15)",
          borderHover: "rgba(148, 163, 184, 0.3)",
          sidebar: "rgba(15, 23, 42, 0.85)",
          topbar: "rgba(10, 16, 32, 0.75)",
          input: "rgba(30, 41, 59, 0.5)",
        },
      }
    : {
        grey: {
          100: "#0F172A",
          200: "#1E293B",
          300: "#334155",
          400: "#475569",
          500: "#64748B",
          600: "#94A3B8",
          700: "#CBD5E1",
          800: "#E2E8F0",
          900: "#F8FAFC",
        },
        primary: {
          100: "#F8FAFC",
          200: "#F1F5F9",
          300: "#E2E8F0",
          400: "#FFFFFF",
          500: "#F8FAFC",
          600: "#F1F5F9",
          700: "#E2E8F0",
          800: "#CBD5E1",
          900: "#94A3B8",
        },
        greenAccent: {
          100: "#14532D",
          200: "#166534",
          300: "#15803D",
          400: "#16A34A",
          500: "#22C55E",
          600: "#4ADE80",
          700: "#86EFAC",
          800: "#BBF7D0",
          900: "#DCFCE7",
        },
        redAccent: {
          100: "#881337",
          200: "#9F1239",
          300: "#BE123C",
          400: "#E11D48",
          500: "#F43F5E",
          600: "#FB7185",
          700: "#FDA4AF",
          800: "#FECDD3",
          900: "#FFE4E6",
        },
        blueAccent: {
          100: "#1E3A8A",
          200: "#1E40AF",
          300: "#1D4ED8",
          400: "#2563EB",
          500: "#3B82F6",
          600: "#60A5FA",
          700: "#93C5FD",
          800: "#BFDBFE",
          900: "#DBEAFE",
        },
        glass: {
          card: "rgba(255, 255, 255, 0.7)",
          cardHover: "rgba(255, 255, 255, 0.9)",
          border: "rgba(15, 23, 42, 0.1)",
          borderHover: "rgba(15, 23, 42, 0.2)",
          sidebar: "rgba(248, 250, 252, 0.9)",
          topbar: "rgba(255, 255, 255, 0.8)",
          input: "rgba(255, 255, 255, 0.6)",
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: { main: "#3B82F6" },
            secondary: { main: "#22C55E" },
            background: { default: "#020617", paper: "rgba(30, 41, 59, 0.6)" },
            text: { primary: "#F8FAFC", secondary: "#94A3B8" },
          }
        : {
            primary: { main: "#2563EB" },
            secondary: { main: "#16A34A" },
            background: { default: "#EFF6FF", paper: "rgba(255,255,255,0.8)" },
            text: { primary: "#0F172A", secondary: "#475569" },
          }),
    },
    typography: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontSize: 13,
      h1: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 40, fontWeight: 700 },
      h2: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 32, fontWeight: 700 },
      h3: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 24, fontWeight: 600 },
      h4: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 20, fontWeight: 600 },
      h5: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 16, fontWeight: 600 },
      h6: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 14, fontWeight: 600 },
      body1: { fontFamily: ["Open Sans", "sans-serif"].join(","), fontSize: 14 },
      body2: { fontFamily: ["Open Sans", "sans-serif"].join(","), fontSize: 13 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          body: {
            background:
              mode === "dark"
                ? "linear-gradient(135deg, #020617 0%, #0F172A 50%, #0A1525 100%)"
                : "linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 60%, #E0F2FE 100%)",
            minHeight: "100vh",
          },
        }),
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  };
};
