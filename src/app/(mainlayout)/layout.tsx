/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import React, { useState } from "react";
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
  Avatar,
  InputBase,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,

  ExpandMore,
  Search as SearchIcon,
  Person,
  Settings,
  Logout,
  MenuOpen,
  ExpandLess,
  Close,

} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter, usePathname } from "next/navigation";
import { navigationItems } from "@/components/Sidebar/DrawerItem";


const DRAWER_WIDTH = 310;
const COLLAPSED_DRAWER_WIDTH = 75;

const CustomSidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => setOpen(!open);
  const toggleMobileDrawer = () => setMobileOpen(!mobileOpen);

  const toggleNestedList = (title: string) => {
    setOpenItems((prev) => {
      // Close all other menus first
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as Record<string, boolean>);

      // Toggle the current menu
      newState[title] = !prev[title];
      return newState;
    });
  };

  const handleNavigation = (path?: string, title?: string) => {
    if (path) {
      router.push(path);
      if (isMobile) setMobileOpen(false);
    } else if (title) {
      toggleNestedList(title);
    }
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);

  const renderNavigationItems = (items: any, nested = false) =>
    items.map((item: any) => (
      <React.Fragment key={item.title}>
        <ListItem
          onClick={() => handleNavigation(item.path, item.children ? item.title : undefined)}
          sx={{
            pl: nested ? 4 : 2,
            pr: 2,
            gap: 2,
            justifyContent: (!open && !isMobile && !nested) ? "center" : "flex-start",
            cursor: "pointer",
            backgroundColor: pathname === item.path ? "rgba(0, 0, 0, 0.08)" : "inherit",
            minHeight: "48px",
            '&:hover': {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <ListItemIcon sx={{
            minWidth: "auto",
            marginRight: (isMobile || open) ? 2 : 0,
          }}>
            {item.icon}
          </ListItemIcon>
          {(isMobile || open) && (
            <ListItemText
              primary={item.title}
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            />
          )}
          {item.children && (isMobile || open) && (
            openItems[item.title] ?
              <ExpandLess sx={{ transition: 'transform 0.3s' }} /> :
              <ExpandMore sx={{ transition: 'transform 0.3s' }} />
          )}
        </ListItem>
        {item.children && (
          <Collapse
            in={openItems[item.title]}
            timeout="auto"
            unmountOnExit
            sx={{
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <List component="div" disablePadding>
              {renderNavigationItems(item.children, true)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={isMobile ? toggleMobileDrawer : toggleDrawer}
            sx={{ mr: 2, zIndex: 1301 }}
          >
            {isMobile ? (
              mobileOpen ? <Close /> : <MenuIcon />
            ) : (
              open ? <MenuOpen /> : <MenuIcon />
            )}
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              fontWeight: 'bold',
            }}
          >
            craft-international-institute
          </Typography>

          <Box sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'flex' },
            justifyContent: "center",
          }}>
            <Box sx={{
              padding: .5,
              position: "relative",
              borderRadius: 1,
              bgcolor: "rgba(255,255,255,0.15)",
              '&:hover': { bgcolor: "rgba(255,255,255,0.25)" },
              width: "100%",
              maxWidth: "300px"
            }}>
              <Box sx={{
                position: "absolute",
                padding: .5,
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <SearchIcon />
              </Box>
              <InputBase sx={{ width: "100%", paddingLeft: 4, color: "inherit" }} placeholder="Search…" />
            </Box>
          </Box>
          <IconButton onClick={handleProfileMenuOpen} color="inherit"><Avatar /></IconButton>
        </Toolbar>
      </AppBar>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
        <MenuItem onClick={handleProfileMenuClose}><Person /> Profile</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}><Settings /> Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleProfileMenuClose}><Logout /> Logout</MenuItem>
      </Menu>

      {/* Sidebar Drawer for Desktop and Mobile */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : open}
        onClose={() => isMobile && setMobileOpen(false)}
        sx={{
          width: isMobile ? "100%" : (open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH),
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isMobile ? "100%" : (open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH),
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <List sx={{ padding: '8px' }}>{renderNavigationItems(navigationItems)}</List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>{children}</Box>
    </Box>
  );
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CustomSidebar>{children}</CustomSidebar>
    </ThemeProvider>
  );
};

export default Layout;