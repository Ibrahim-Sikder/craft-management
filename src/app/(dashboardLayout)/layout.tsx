/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
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
} from "@mui/icons-material";
import { alpha, createTheme } from "@mui/material/styles";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { navigationItems } from "@/components/Sidebar/DrawerItem";
import { UserRole } from "@/types/common";
import { getUserInfo } from "@/services/acttion";

const DRAWER_WIDTH = 280;
const COLLAPSED_DRAWER_WIDTH = 75;

const CustomSidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUserRole(userInfo?.role || null);
    };

    fetchUserInfo();
  }, []);

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => setOpen(!open);
  const toggleMobileDrawer = () => setMobileOpen(!mobileOpen);

  // ✅ Each accordion independent
  const toggleNestedList = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleNavigation = (path?: string, title?: string) => {
    if (path) {
      router.push(path);
      if (isMobile) setMobileOpen(false);
    } else if (title) {
      toggleNestedList(title);
    }
  };

  // ✅ Full logout system
  const handleLogout = () => {
    Cookies.remove("craft-token", { path: "/" });
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
    localStorage.clear();
    router.push("/");
  };

  // ✅ Profile menu
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const renderNavigationItems = (items: any, nested = false) =>
    items.map((item: any) => (
      <React.Fragment key={item.title}>
        <ListItem
          onClick={() =>
            handleNavigation(item.path, item.children ? item.title : undefined)
          }
          sx={{
            pl: nested ? 2 : 1,
            pr: 1,
            gap: 0.5,
            justifyContent:
              !open && !isMobile && !nested ? "center" : "flex-start",
            cursor: "pointer",
            backgroundColor:
              pathname === item.path ? "rgba(0, 0, 0, 0.08)" : "inherit",
            minHeight: "48px",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
          }}
        >
          <ListItemIcon
            sx={{ minWidth: "auto", marginRight: isMobile || open ? 1 : 0 }}
          >
            {item.icon}
          </ListItemIcon>
          {(isMobile || open) && (
            <ListItemText
              primary={item.title}
              sx={{ overflow: "hidden", whiteSpace: "nowrap" }}
            />
          )}
          {item.children && (isMobile || open) && (
            openItems[item.title] ? <ExpandLess /> : <ExpandMore />
          )}
        </ListItem>
        {item.children && (
          <Collapse in={openItems[item.title]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderNavigationItems(item.children, true)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));

  const roleBasedItems = userRole
    ? navigationItems.filter((item) =>
        item.roles ? item.roles.includes(userRole) : true
      )
    : [];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "#4F0187",
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
          <Typography variant="h6" noWrap sx={{ mr: 2, fontWeight: "bold" }}>
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
                padding: 0.5,
                position: "relative",
                borderRadius: 5,
                bgcolor: "white",
                width: "100%",
                maxWidth: "300px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  padding: 0.5,
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchIcon sx={{ color: "black" }} />
              </Box>
              <InputBase
                sx={{ width: "100%", paddingLeft: 4, color: "black" }}
                placeholder="Search…"
              />
            </Box>
          </Box>
          <IconButton
            sx={{
              px: { xs: 1, md: 2 },
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.3),
              },
            }}
          >
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* ✅ Profile + Logout */}
          <IconButton
            sx={{ ml: 1 }}
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
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
          },
        }}
      >
        <List sx={{ padding: "8px", mt: 8 }}>
          {renderNavigationItems(roleBasedItems)}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#f9f9f9", minHeight: "100vh", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default CustomSidebar;
