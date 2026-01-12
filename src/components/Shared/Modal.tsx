/* eslint-disable @typescript-eslint/no-unused-vars */
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SxProps, styled, useTheme, alpha } from "@mui/material";
import React from "react";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiBackdrop-root": {
    backgroundColor: alpha(theme.palette.common.black, 0.8),
    backdropFilter: "blur(4px)",
  },
}));

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
  sx?: SxProps;
  size?: "sm" | "md" | "lg" | "xl";
};

export default function CraftModal({
  open = false,
  setOpen,
  title = "",
  children,
  sx,
  size = "lg",
}: TModalProps) {
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  // Size mapping
  const sizeMap = {
    sm: "400px",
    md: "600px",
    lg: "800px",
    xl: "1200px",
  };

  // Default styles
  const modalStyles = {
    paper: {
      background: theme.palette.background.paper,
      borderRadius: "12px",
      boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.15)}`,
      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    },
    title: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: "1.375rem",
      padding: theme.spacing(2.5, 2),
      background: theme.palette.primary.main,
      borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    closeButton: {
      color: theme.palette.primary.main,
      background: "#fff",
      "&:hover": {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      transition: "all 0.2s ease",
    },
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={false}
        fullWidth
        sx={{
          ...sx,
          "& .MuiDialog-paper": {
            maxWidth: sizeMap[size],
            width: "100%",
            m: 2,
            ...modalStyles.paper,
            transition: "all 0.3s ease-in-out",
            animation: "modalAppear 0.3s ease-out",
            "@keyframes modalAppear": {
              "0%": {
                opacity: 0,
                transform: "scale(0.9) translateY(-20px)",
              },
              "100%": {
                opacity: 1,
                transform: "scale(1) translateY(0)",
              },
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            ...modalStyles.title,
          }}
          id="customized-dialog-title"
        >
          {title}
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            width: 32,
            height: 32,
            ...modalStyles.closeButton,
          }}
        >
          <CloseIcon sx={{ fontSize: "1.25rem" }} />
        </IconButton>

        <DialogContent
          dividers
          sx={{
            padding: theme.spacing(2.5),
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: alpha(theme.palette.grey[500], 0.1),
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: alpha(theme.palette.grey[500], 0.3),
              borderRadius: "4px",
              "&:hover": {
                background: alpha(theme.palette.grey[500], 0.5),
              },
            },
          }}
        >
          {children}
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
