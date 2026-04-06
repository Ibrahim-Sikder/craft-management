/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  alpha,
  MenuItem,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore, ArrowForwardIos } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import React from "react";

// Recursive render for hover popover items (supports nested submenus)
export const renderPopoverItems = (
  items: any[],
  onNavigate: (path: string) => void,
) => {
  return items.map((item) => {
    const hasChildren = !!item.children;
    return (
      <Box key={item.title}>
        <MenuItem
          onClick={() => {
            if (item.path) onNavigate(item.path);
          }}
          sx={{ pl: 2, pr: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
          {hasChildren && <ExpandMore fontSize="small" />}
        </MenuItem>
        {hasChildren && (
          <Box sx={{ pl: 2 }}>
            {renderPopoverItems(item.children, onNavigate)}
          </Box>
        )}
      </Box>
    );
  });
};

export const NavigationList = ({
  items,
  nested = false,
  open,
  isMobile,
  openItems,
  toggleNested,
  onNavigate,
  onHoverOpen,
  onHoverClose,
}: any) => {
  const theme = useTheme();
  const pathname = usePathname();
  const isCollapsed = !open && !isMobile && !nested;

  return items.map((item: any) => {
    const hasChildren = !!item.children;
    const isActive =
      pathname === item.path ||
      (hasChildren && item.children?.some((c: any) => pathname === c.path));

    return (
      <React.Fragment key={item.title}>
        <ListItem
          onClick={() => {
            if (open || isMobile) {
              if (hasChildren) {
                toggleNested(item.title);
              } else if (item.path) {
                onNavigate(item.path);
              }
            }
          }}
          onMouseEnter={(e) => onHoverOpen(e, item)}
          onMouseLeave={onHoverClose}
          sx={{
            position: "relative",
            cursor: "pointer",
            borderRadius: 1,
            mx: 0.5,
            minHeight: isCollapsed ? "64px" : "48px",
            py: 1,
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
                "& .MuiTypography-root": { color: "text.primary" },
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
                opacity: 0.9,
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
              <NavigationList
                items={item.children}
                nested
                open={open}
                isMobile={isMobile}
                openItems={openItems}
                toggleNested={toggleNested}
                onNavigate={onNavigate}
                onHoverOpen={onHoverOpen}
                onHoverClose={onHoverClose}
              />
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  });
};
