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

  // const toggleNestedList = (title: string) => {
  //   setOpenItems(prev => ({
  //     ...prev,
  //     [title]: !prev[title]
  //   }));
  // };

  // const renderNavigationItems = (items: NavigationItem[], nested = false) => {
  //   return items.map((item) => (
  //     <React.Fragment key={item.title}>
  //       {item.path ? (
  //         <Link href={item.path} passHref>
  //           <ListItem
  //             component="div"
  //             onClick={() => item.children && toggleNestedList(item.title)}
  //             sx={{
  //               pl: nested ? 4 : 2,
  //               justifyContent: !open && !nested ? 'center' : 'flex-start',
  //               cursor: 'pointer'
  //             }}
  //           >
  //             {item.icon && (
  //               <ListItemIcon
  //                 sx={{
  //                   minWidth: 'auto',
  //                   mr: open ? 2 : 0,
  //                   justifyContent: 'center'
  //                 }}
  //               >
  //                 {item.icon}
  //               </ListItemIcon>
  //             )}
  //             {open && <ListItemText primary={item.title} />}
  //             {item.children && open && (
  //               openItems[item.title] ? <ExpandMore /> : <ChevronRight />
  //             )}
  //           </ListItem>
  //         </Link>
  //       ) : (
  //         <ListItem
  //           component="div"
  //           onClick={() => toggleNestedList(item.title)}
  //           sx={{
  //             pl: nested ? 4 : 2,
  //             justifyContent: !open && !nested ? 'center' : 'flex-start',
  //             cursor: 'pointer'
  //           }}
  //         >
  //           {item.icon && (
  //             <ListItemIcon
  //               sx={{
  //                 minWidth: 'auto',
  //                 mr: open ? 2 : 0,
  //                 justifyContent: 'center'
  //               }}
  //             >
  //               {item.icon}
  //             </ListItemIcon>
  //           )}
  //           {open && <ListItemText primary={item.title} />}
  //           {item.children && open && (
  //             openItems[item.title] ? <ExpandMore /> : <ChevronRight />
  //           )}
  //         </ListItem>
  //       )}

  //       {item.children && (
  //         <Collapse
  //           in={open && openItems[item.title]}
  //           timeout="auto"
  //           unmountOnExit
  //         >
  //           <List component="div" disablePadding>
  //             {item.children.map((child) => (
  //               <Link key={child.title} href={child.path || ''} passHref>
  //                 <ListItem
  //                   component="div"
  //                   sx={{
  //                     pl: 4,
  //                     justifyContent: !open ? 'center' : 'flex-start',
  //                     cursor: 'pointer'
  //                   }}
  //                 >
  //                   {open && <ListItemText primary={child.title} />}
  //                 </ListItem>
  //               </Link>
  //             ))}
  //           </List>
  //         </Collapse>
  //       )}
  //     </React.Fragment>
  //   ));
  // };

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