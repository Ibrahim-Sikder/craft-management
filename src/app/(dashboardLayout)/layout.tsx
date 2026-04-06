/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  AppBar,
  Toolbar,
  Collapse,
  InputBase,
  Divider,
  useMediaQuery,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Paper,
  Popper,
  Grow,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ExpandMore,
  ExpandLess,
  MenuOpen,
  Close,
  Search as SearchIcon,
  Notifications,
  AccountCircle,
  ArrowForwardIos,
} from "@mui/icons-material";
import { alpha, useTheme } from "@mui/material/styles";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { navigationItems } from "@/components/Sidebar/DrawerItem";
import { UserRole } from "@/types/common";
import { getUserInfo } from "@/services/acttion";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const DRAWER_WIDTH = 280;
const COLLAPSED_DRAWER_WIDTH = 85;

const CustomSidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  // Hover menu state (renamed to avoid conflict)
  const [hoverAnchorEl, setHoverAnchorEl] = useState<null | HTMLElement>(null);
  const [hoverItem, setHoverItem] = useState<any>(null);
  const [isHoverMenuOpen, setIsHoverMenuOpen] = useState(false); // renamed
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUserRole(userInfo?.role || null);
    };
    fetchUserInfo();
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => setOpen(!open);
  const toggleMobileDrawer = () => setMobileOpen(!mobileOpen);

  const toggleNestedList = (title: string) => {
    setOpenItems((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleNavigation = (path?: string) => {
    if (path) {
      router.push(path);
      if (isMobile) setMobileOpen(false);
      closeHoverMenu();
    }
  };

  const handleLogout = () => {
    Cookies.remove("accessToken", { path: "/" });
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
    localStorage.clear();
    router.push("/");
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => setProfileAnchorEl(null);

  // ----- Hover menu logic (function renamed to openHoverMenu) -----
  const openHoverMenu = (event: React.MouseEvent<HTMLElement>, item: any) => {
    if (open || isMobile) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setHoverAnchorEl(event.currentTarget);
    setHoverItem(item);
    setIsHoverMenuOpen(true);
  };

  const closeHoverMenu = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => {
      setIsHoverMenuOpen(false);
      setHoverAnchorEl(null);
      setHoverItem(null);
    }, 300);
  };

  const cancelCloseHoverMenu = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
  };

  const handleListItemMouseLeave = () => {
    closeHoverMenu();
  };

  const handleMenuMouseEnter = () => {
    cancelCloseHoverMenu();
  };

  const handleMenuMouseLeave = () => {
    closeHoverMenu();
  };
  // ---------------------------------

  const renderPopoverItems = (items: any[]) => {
    return items.map((item) => {
      const hasChildren = !!item.children;
      return (
        <Box key={item.title}>
          <MenuItem
            onClick={() => {
              if (item.path) handleNavigation(item.path);
            }}
            sx={{ pl: 2, pr: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
            {hasChildren && <ExpandMore fontSize="small" />}
          </MenuItem>
          {hasChildren && (
            <Box sx={{ pl: 2 }}>{renderPopoverItems(item.children)}</Box>
          )}
        </Box>
      );
    });
  };

  const renderNavigationItems = (items: any, nested = false) =>
    items.map((item: any) => {
      const hasChildren = !!item.children;
      const isActive =
        pathname === item.path ||
        (hasChildren &&
          item.children?.some((child: any) => pathname === child.path));

      const isCollapsed = !open && !isMobile && !nested;

      return (
        <React.Fragment key={item.title}>
          <ListItem
            onClick={() => {
              if (open || isMobile) {
                if (hasChildren) {
                  toggleNestedList(item.title);
                } else if (item.path) {
                  handleNavigation(item.path);
                }
              }
            }}
            onMouseEnter={(e) => openHoverMenu(e, item)}
            onMouseLeave={handleListItemMouseLeave}
            sx={{
              position: "relative",
              cursor: "pointer",
              borderRadius: 1,
              mx: 0.5,
              minHeight: isCollapsed ? "64px" : "48px",
              py: isCollapsed ? 1 : 1,
              px: isCollapsed ? 0.5 : 1,
              backgroundColor: isActive
                ? alpha(theme.palette.primary.main, 0.12)
                : "transparent",
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
              ...(isCollapsed && {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }),
              ...(!isCollapsed && {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }),
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "auto",
                marginRight: !isCollapsed && (isMobile || open) ? 1 : 0,
                marginBottom: isCollapsed ? 0.5 : 0,
                color: "text.primary",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>

            {isMobile || open ? (
              <ListItemText
                primary={item.title}
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  "& .MuiTypography-root": {
                    color: "text.primary",
                  },
                }}
              />
            ) : isCollapsed ? (
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.65rem",
                  maxWidth: "70px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  color: "black",
                  lineHeight: 1.2,
                }}
              >
                {item.title.length > 10
                  ? `${item.title.substring(0, 10)}...`
                  : item.title}
              </Typography>
            ) : null}

            {isCollapsed && (
              <ArrowForwardIos
                sx={{
                  fontSize: "0.75rem",
                  position: "absolute",
                  top: 19, 
                  right: 0,
                  color: "black",
                  opacity: 0.6,
                }}
              />
            )}

            {hasChildren &&
              (isMobile || open) &&
              (openItems[item.title] ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          {hasChildren && (isMobile || open) && (
            <Collapse in={openItems[item.title]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderNavigationItems(item.children, true)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });

  const roleBasedItems = userRole
    ? navigationItems.filter((item) =>
        item.roles ? item.roles.includes(userRole) : true,
      )
    : [];

  const popoverItems =
    hoverItem?.children || (hoverItem?.path ? [hoverItem] : []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "primary.main",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={isMobile ? toggleMobileDrawer : toggleDrawer}
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

          <Typography
            variant="h6"
            noWrap
            sx={{ mr: 2, fontWeight: "bold", color: "common.white" }}
          >
            Craft International Institute
          </Typography>

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
                "&:hover": {
                  bgcolor: alpha(theme.palette.common.white, 0.25),
                },
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

          <IconButton
            sx={{ ml: 1, color: "common.white" }}
            onClick={handleProfileMenuOpen}
          >
            <AccountCircle />
          </IconButton>

          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={() => router.push("/profile")}>Profile</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : open}
        onClose={() => isMobile && setMobileOpen(false)}
        sx={{
          width: isMobile
            ? "100%"
            : open
              ? DRAWER_WIDTH
              : COLLAPSED_DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isMobile
              ? "100%"
              : open
                ? DRAWER_WIDTH
                : COLLAPSED_DRAWER_WIDTH,
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
            bgcolor: "background.paper",
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <List sx={{ padding: "8px", mt: 8, bgcolor: "background.paper" }}>
          {renderNavigationItems(roleBasedItems)}
        </List>
      </Drawer>

      {/* Hover Menu using Popper */}
      {!open && !isMobile && hoverAnchorEl && (
        <Popper
          open={isHoverMenuOpen}
          anchorEl={hoverAnchorEl}
          placement="right-start"
          transition
          disablePortal
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ]}
          sx={{ zIndex: 1300 }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={200}>
              <Paper
                onMouseEnter={handleMenuMouseEnter}
                onMouseLeave={handleMenuMouseLeave}
                sx={{
                  minWidth: 240,
                  maxHeight: 400,
                  overflowY: "auto",
                  bgcolor: "background.paper",
                  boxShadow: 3,
                }}
              >
                {renderPopoverItems(popoverItems)}
              </Paper>
            </Grow>
          )}
        </Popper>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          minHeight: "100vh",
          p: 3,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default CustomSidebar;
