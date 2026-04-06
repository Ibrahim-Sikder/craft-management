/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppBar, Toolbar, IconButton, Typography, Box, InputBase, Badge, Menu, MenuItem, Divider, alpha } from "@mui/material";
import { Menu as MenuIcon, MenuOpen, Close, Search as SearchIcon, Notifications, AccountCircle } from "@mui/icons-material";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useTheme } from "@mui/material/styles";

export const SidebarHeader = ({ isMobile, mobileOpen, open, onToggleDrawer, onToggleMobile, onProfileOpen, profileAnchorEl, onProfileClose, onLogout, onProfile }:any) => {
  const theme = useTheme();
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "primary.main" }}>
      <Toolbar>
        <IconButton color="inherit" onClick={isMobile ? onToggleMobile : onToggleDrawer} sx={{ mr: 2 }}>
          {isMobile ? (mobileOpen ? <Close /> : <MenuIcon />) : open ? <MenuOpen /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" noWrap sx={{ mr: 2, fontWeight: "bold", color: "common.white" }}>
          Craft International Institute
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" }, justifyContent: "center" }}>
          <Box sx={{ position: "relative", borderRadius: 5, bgcolor: alpha(theme.palette.common.white, 0.15), width: "100%", maxWidth: "300px", "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.25) } }}>
            <Box sx={{ position: "absolute", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", px: 1.5, pointerEvents: "none" }}>
              <SearchIcon sx={{ color: "common.white" }} />
            </Box>
            <InputBase placeholder="Search…" sx={{ width: "100%", paddingLeft: 5, color: "common.white", "& input::placeholder": { color: alpha(theme.palette.common.white, 0.7) } }} />
          </Box>
        </Box>
        <ThemeSwitcher />
        <IconButton sx={{ px: { xs: 1, md: 2 }, borderRadius: 3, bgcolor: alpha(theme.palette.common.white, 0.1), color: "common.white", "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.2) } }}>
          <Badge badgeContent={4} color="error"><Notifications /></Badge>
        </IconButton>
        <IconButton sx={{ ml: 1, color: "common.white" }} onClick={onProfileOpen}><AccountCircle /></IconButton>
        <Menu anchorEl={profileAnchorEl} open={Boolean(profileAnchorEl)} onClose={onProfileClose}>
          <MenuItem onClick={onProfile}>Profile</MenuItem>
          <Divider />
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};