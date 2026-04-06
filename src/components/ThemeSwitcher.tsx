"use client";

import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { LightMode, DarkMode, SettingsBrightness } from "@mui/icons-material";
import { useColorScheme } from "@mui/material/styles";
import { useState } from "react";

export default function ThemeSwitcher() {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (!mode) return null; // wait for client

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <SettingsBrightness />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setMode("system")}>
          <ListItemIcon><SettingsBrightness /></ListItemIcon>
          <ListItemText>System</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setMode("light")}>
          <ListItemIcon><LightMode /></ListItemIcon>
          <ListItemText>Light</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setMode("dark")}>
          <ListItemIcon><DarkMode /></ListItemIcon>
          <ListItemText>Dark</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}