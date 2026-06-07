import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    rowHighlight: {
      background: string;
      foreground: string;
    };
  }
  interface PaletteOptions {
    rowHighlight?: {
      background?: string;
      foreground?: string;
    };
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e0633a",
      light: "#ff8a65",
      dark: "#b94a22",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f7f8fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e1e1e",
      secondary: "#6b7280",
    },
    divider: "#1e1e1e",
    rowHighlight: {
      background: "#ffe8e0",
      foreground: "#1e1e1e",
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#6b7280", // default icon color
          fontSize: "1.25rem",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffe8e0", // light brand color
          color: "#e0633a", // logo color for text/icons
          boxShadow: "none",
        },
      },
    },
  },
});
