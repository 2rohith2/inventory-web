import { useState } from "react";

import { ThemeProvider, CssBaseline } from "@mui/material";

import Dashboard from "../layout/Dashboard";

import { darkTheme } from "./dark";
import { lightTheme } from "./light";

type ThemeMode = "light" | "dark";

export default function ThemeWrapper() {
  const [mode, setMode] = useState<ThemeMode>("light");
  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard mode={mode} setMode={setMode} />
    </ThemeProvider>
  );
}
