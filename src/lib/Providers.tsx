"use client";

import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { theme } from "./Theme/Theme";
import { store } from "@/redux/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

export default Providers;
