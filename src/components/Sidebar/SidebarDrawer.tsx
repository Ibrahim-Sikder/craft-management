/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer, List } from "@mui/material";
import { DRAWER_WIDTH, COLLAPSED_DRAWER_WIDTH } from "./constants";
import { theme } from "@/lib/Theme/Theme";

export const SidebarDrawer = ({ variant, open, mobileOpen, onClose, children }:any) => {
  const width = variant === "temporary" ? "100%" : (open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH);
  return (
    <Drawer
      variant={variant}
      open={variant === "temporary" ? mobileOpen : open}
      onClose={onClose}
      sx={{ width, flexShrink: 0, [`& .MuiDrawer-paper`]: { width, transition: "width 0.3s ease-in-out", overflowX: "hidden", bgcolor: "background.paper", borderRight: `1px solid ${theme.palette.divider}` } }}
    >
      <List sx={{ padding: "8px", mt: 8, bgcolor: "background.paper" }}>{children}</List>
    </Drawer>
  );
};