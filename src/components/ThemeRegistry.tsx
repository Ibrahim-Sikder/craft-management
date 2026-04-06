"use client";

import { CssVarsProvider, extendTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

const theme = extendTheme({
  colorSchemeSelector: "data",
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#facc15" },
        background: { default: "#f9fafb", paper: "#ffffff" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#facc15" },
        background: { default: "#121212", paper: "#1e1e1e" },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <CssVarsProvider theme={theme} defaultMode="system" modeStorageKey="app-theme">
      <CssBaseline enableColorScheme />
      {children}
    </CssVarsProvider>
  );
}