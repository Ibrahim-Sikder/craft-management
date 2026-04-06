//this is for dasbaord sidebar

import { useState } from "react";

export const useSidebarState = () => {
  const [open, setOpen] = useState(false); // collapsed by default
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleDrawer = () => setOpen(prev => !prev);
  const toggleMobileDrawer = () => setMobileOpen(prev => !prev);
  const toggleNestedList = (title: string) => {
    setOpenItems(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return { open, setOpen, mobileOpen, setMobileOpen, openItems, toggleDrawer, toggleMobileDrawer, toggleNestedList };
};