/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { navigationItems } from "@/components/Sidebar/DrawerItem";
import { useState } from "react";
import { useSidebarState } from "@/hooks/useSidebarState";
import { useHoverMenu } from "@/hooks/useHoverMenu";
import { SidebarHeader } from "@/components/Sidebar/SidebarHeader";
import { SidebarDrawer } from "@/components/Sidebar/SidebarDrawer";
import { NavigationList } from "@/components/Sidebar/NavigationList";
import { HoverMenu } from "@/components/Sidebar/HoverMenu";
import { useUser } from "@/hooks/useUser";
import { useUserInfo } from "@/hooks/useUserInfo";
import Cookies from "js-cookie";
const CustomSidebar = ({ children }: any) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { userInfo } = useUserInfo();
  const userRole = userInfo?.role || null;
  const {
    open,
    mobileOpen,
    openItems,
    toggleDrawer,
    toggleMobileDrawer,
    toggleNestedList,
  } = useSidebarState();
  const {
    hoverAnchorEl,
    hoverItem,
    isOpen: hoverOpen,
    open: openHover,
    close: closeHover,
    cancel: cancelHover,
  } = useHoverMenu();
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const { user, loading: userLoading } = useUser();
  console.log("User Info:", user);

  const handleNavigate = (path: any) => {
    if (path) router.push(path);
    if (isMobile) toggleMobileDrawer();
    closeHover();
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
  const handleProfileOpen = (e: any) => setProfileAnchorEl(e.currentTarget);
  const handleProfileClose = () => setProfileAnchorEl(null);
  const handleProfile = () => router.push("/profile");

  const roleBasedItems = userRole
    ? navigationItems.filter((item: any) => item.roles?.includes(userRole))
    : [];

  const popoverItems =
    hoverItem?.children || (hoverItem?.path ? [hoverItem] : []);

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarHeader
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        open={open}
        onToggleDrawer={toggleDrawer}
        onToggleMobile={toggleMobileDrawer}
        onProfileOpen={handleProfileOpen}
        profileAnchorEl={profileAnchorEl}
        onProfileClose={handleProfileClose}
        onLogout={handleLogout}
        onProfile={handleProfile}
        user={user}
      />
      <SidebarDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        mobileOpen={mobileOpen}
        onClose={() => toggleMobileDrawer()}
      >
        <NavigationList
          items={roleBasedItems}
          open={open}
          isMobile={isMobile}
          openItems={openItems}
          toggleNested={toggleNestedList}
          onNavigate={handleNavigate}
          onHoverOpen={openHover}
          onHoverClose={closeHover}
        />
      </SidebarDrawer>
      {!open && !isMobile && (
        <HoverMenu
          anchorEl={hoverAnchorEl}
          isOpen={hoverOpen}
          items={popoverItems}
          onClose={closeHover}
          onEnter={cancelHover}
          onLeave={closeHover}
          onNavigate={handleNavigate}
        />
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
        <Toolbar />{" "}
        {/* Note: Toolbar is missing, you need to import and add it */}
        {children}
      </Box>
    </Box>
  );
};

export default CustomSidebar;
