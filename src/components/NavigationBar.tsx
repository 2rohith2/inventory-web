import type { Dispatch, SetStateAction } from "react";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  AppBar,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";


type Props = {
  mode: "light" | "dark";
  setMode: Dispatch<SetStateAction<"light" | "dark">>;
};

export default function NavigationBar({ mode, setMode }: Props) {
  return (
    <AppBar position="static" elevation={0} sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_event, selectedMode) => setMode(selectedMode)}
          aria-label="text alignment"
        >
          <ToggleButton value="light" aria-label="Light Mode">
            <LightModeIcon />
          </ToggleButton>
          <ToggleButton value="dark" aria-label="Dark Mode">
            <DarkModeIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
}
