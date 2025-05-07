/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@mui/material';
import {

  ExpandMore,
  ChevronRight
} from '@mui/icons-material';

// Define Navigation Item Type
interface NavigationItem {
  title: string;
  icon?: React.ReactNode;
  path?: string;
  children?: NavigationItem[];
}



interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});


  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 200 : 72,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: open ? 200 : 72,
          boxSizing: 'border-box',
          overflowX: 'hidden'
        },
      }}
    >

    </Drawer>
  );
};

export default Sidebar;