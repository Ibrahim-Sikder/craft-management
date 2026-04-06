//this is for dasbaord sidebar 

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef } from "react";

export const useHoverMenu = () => {
  const [hoverAnchorEl, setHoverAnchorEl] = useState<HTMLElement | null>(null);
  const [hoverItem, setHoverItem] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const open = (event: React.MouseEvent<HTMLElement>, item: any) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoverAnchorEl(event.currentTarget);
    setHoverItem(item);
    setIsOpen(true);
  };

  const close = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setHoverAnchorEl(null);
      setHoverItem(null);
    }, 300);
  };

  const cancel = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return { hoverAnchorEl, hoverItem, isOpen, open, close, cancel };
};