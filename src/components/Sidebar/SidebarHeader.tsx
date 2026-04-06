/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Divider,
  alpha,
  Avatar,
  Stack,
  Chip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  MenuOpen,
  Close,
  Search as SearchIcon,
  Notifications,
  Person,
  Logout,
} from "@mui/icons-material";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useTheme } from "@mui/material/styles";

export const SidebarHeader = ({
  isMobile,
  mobileOpen,
  open,
  onToggleDrawer,
  onToggleMobile,
  onProfileOpen,
  profileAnchorEl,
  onProfileClose,
  onLogout,
  onProfile,
  user,
}: any) => {
  const theme = useTheme();

  // Get user initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = user?.name || "User";
  const userEmail = user?.email || "user@example.com";
  const userInitials = getInitials(displayName);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "primary.main",
      }}
    >
      <Toolbar>
        {/* Sidebar toggle button */}
        <IconButton
          color="inherit"
          onClick={isMobile ? onToggleMobile : onToggleDrawer}
          sx={{ mr: 2 }}
        >
          {isMobile ? (
            mobileOpen ? (
              <Close />
            ) : (
              <MenuIcon />
            )
          ) : open ? (
            <MenuOpen />
          ) : (
            <MenuIcon />
          )}
        </IconButton>

        {/* Logo / Title */}
        <Typography
          variant="h6"
          noWrap
          sx={{ mr: 2, fontWeight: "bold", color: "common.white" }}
        >
          Craft International Institute
        </Typography>

        {/* Search Bar (centered) */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "flex" },
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: 5,
              bgcolor: alpha(theme.palette.common.white, 0.15),
              width: "100%",
              maxWidth: "300px",
              "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.25) },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 1.5,
                pointerEvents: "none",
              }}
            >
              <SearchIcon sx={{ color: "common.white" }} />
            </Box>
            <InputBase
              placeholder="Search…"
              sx={{
                width: "100%",
                paddingLeft: 5,
                color: "common.white",
                "& input::placeholder": {
                  color: alpha(theme.palette.common.white, 0.7),
                },
              }}
            />
          </Box>
        </Box>

        {/* Right side controls */}
        <Stack direction="row" spacing={1} alignItems="center">
          <ThemeSwitcher />

          <IconButton
            sx={{
              px: { xs: 1, md: 2 },
              borderRadius: 3,
              bgcolor: alpha(theme.palette.common.white, 0.1),
              color: "common.white",
              "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.2) },
            }}
          >
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Profile button with user name + avatar */}
          <IconButton
            onClick={onProfileOpen}
            sx={{
              ml: 1,
              p: 0.5,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.common.white, 0.1),
              "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.2) },
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ px: 1 }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: alpha(theme.palette.common.white, 0.2),
                  color: "common.white",
                  fontSize: "0.875rem",
                }}
              >
                {userInitials}
              </Avatar>
              <Box
                sx={{ display: { xs: "none", sm: "block" }, textAlign: "left" }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "common.white",
                    fontWeight: 500,
                    lineHeight: 1.2,
                  }}
                >
                  {displayName.length > 15
                    ? `${displayName.substring(0, 15)}...`
                    : displayName}
                </Typography>
              </Box>
            </Stack>
          </IconButton>

          {/* Profile Menu */}
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={onProfileClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 240,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 3,
              },
            }}
          >
            {/* User info header inside menu */}
            <Box
              sx={{
                px: 2,
                py: 1.5,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: theme.palette.primary.main,
                    color: "common.white",
                  }}
                >
                  {userInitials}
                </Avatar>
                <div className="">
                  <Typography variant="subtitle2" fontWeight={600} >
                    {displayName}
                    <Chip
                      label={user?.role || "User"}
                      size="small"
                      sx={{
                        mt: 0,
                        ml:1,
                        height: 20,
                        fontSize: "0.6rem",
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    />
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {userEmail}
                  </Typography>
                </div>
              </Stack>
            </Box>
            <Divider />
            <MenuItem onClick={onProfile}>
              <Person fontSize="small" sx={{ mr: 1 }} />
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={onLogout} sx={{ color: "error.main" }}>
              <Logout fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
