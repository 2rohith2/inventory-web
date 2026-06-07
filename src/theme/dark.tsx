import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e0633a",
      light: "#ff8a65",
      dark: "#b94a22",
      contrastText: "#ffffff",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
      disabled: "#64748b",
    },
    divider: "#334155",
    rowHighlight: {
      background: "#1e293b",
      foreground: "#f1f5f9",
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#94a3b8", // softer in dark mode
          fontSize: "1.25rem",
        },
      },
    },
  },
});
