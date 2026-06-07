import { useState } from "react";

import { ThemeProvider, CssBaseline } from "@mui/material";

import App from "../App";

import { darkTheme } from "./dark";
import { lightTheme } from "./light";


type ThemeMode = "light" | "dark";

export default function ThemeWrapper() {
  const [mode, setMode] = useState<ThemeMode>("light");
  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App mode={mode} setMode={setMode} />
    </ThemeProvider>
  );
}
