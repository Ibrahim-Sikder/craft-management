/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { keyframes, styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Chip,
  Badge,
  alpha,
  Button,
  TextField,
  Dialog,
  Select,
  Paper,
} from "@mui/material";
import { TeacherStatus } from "@/interface";

export const GradientCard = styled(Card)(
  ({ bgcolor }: { bgcolor: string }) => ({
    background: bgcolor,
    color: "white",
    borderRadius: "20px",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    },
  })
);

export const GlassCard = styled(Card)({
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
});

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "20px",
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "visible",
  transition: "all 0.3s ease-in-out",
  borderRadius: 16,
  boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 70px rgba(0, 0, 0, 0.2)",
  },
}));

export const GradientHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)",
  padding: theme.spacing(4, 0),
  borderRadius: "0 0 24px 24px",
  marginBottom: theme.spacing(4),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      'url("/placeholder.svg?height=200&width=1000") center/cover no-repeat',
    opacity: 0.1,
  },
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const StatusChip = styled(Chip)<{ status: TeacherStatus }>(
  ({ theme, status }) => ({
    backgroundColor:
      status === "active"
        ? alpha(theme.palette.success.main, 0.1)
        : status === "on leave"
          ? alpha(theme.palette.warning.main, 0.1)
          : alpha(theme.palette.error.main, 0.1),
    color:
      status === "active"
        ? theme.palette.success.dark
        : status === "on leave"
          ? theme.palette.warning.dark
          : theme.palette.error.dark,
    fontWeight: 600,
    borderRadius: 8,
  })
);

export const DepartmentChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  borderRadius: 8,
}));
export const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12)",
    },
    "&.Mui-focused": {
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.16)",
    },
  },
}));

export const ViewToggleButton = styled(Button)<{ active: boolean }>(
  ({ theme, active }) => ({
    backgroundColor: active
      ? alpha(theme.palette.primary.main, 0.1)
      : "transparent",
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
    fontWeight: active ? 600 : 400,
    "&:hover": {
      backgroundColor: active
        ? alpha(theme.palette.primary.main, 0.2)
        : alpha(theme.palette.action.hover, 0.1),
    },
  })
);

export const PerformanceIndicator = styled(Box)<{ value: number }>(
  ({ theme, value }) => ({
    position: "relative",
    height: 4,
    width: "100%",
    backgroundColor: alpha(theme.palette.grey[300], 0.5),
    borderRadius: 2,
    overflow: "hidden",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: `${value}%`,
      backgroundColor:
        value > 80
          ? theme.palette.success.main
          : value > 50
            ? theme.palette.warning.main
            : theme.palette.error.main,
      borderRadius: 2,
    },
  })
);

export const boxStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 4,
  flexWrap: "wrap",
  gap: 2,
  paddingTop: 2,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -10,
    left: 0,
    width: "100%",
    height: "4px",
    background: "linear-gradient(90deg, #6366f1, #818cf8, #6366f1)",
    borderRadius: "2px",
    opacity: 0.7,
  },
};
export const typographyStyle = {
  fontWeight: 900,
  background: "linear-gradient(45deg, #6366f1, #818cf8)",
  backgroundClip: "text",
  textFillColor: "transparent",
  mb: 1,
  letterSpacing: "-0.5px",
  textShadow: "0px 2px 4px rgba(0,0,0,0.1)",
  display: "flex",
  alignItems: "center",
  gap: 1,
};

export const evaluationStle = {
  mb: 4,
  border: "1px solid rgba(0,0,0,0.08)",
  position: "relative",
  overflow: "visible",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
  },
};
export const evaluationStle2 = {
  position: "absolute",
  top: -20,
  left: 24,
  bgcolor: "#6366f1",
  color: "white",
  py: 1,
  px: 3,
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(99, 102, 241, 0.25)",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  gap: 1,
};
export const SectionCard = styled(Card)(
  ({ theme, bgcolor }: { theme?: any; bgcolor: string }) => ({
    background: bgcolor,
    borderRadius: "20px",
    border: "none",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 12px 35px rgba(0, 0, 0, 0.15)",
    },
  })
);
export const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "2px",
      },
    },
  },
});
export const StyledSelect = styled(Select)({
  borderRadius: "15px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  "&.Mui-focused": {
    backgroundColor: "white",
  },
});

export const GradientButton = styled(Button)(
  ({ bgcolor }: { bgcolor: string }) => ({
    background: bgcolor,
    borderRadius: "25px",
    padding: "12px 30px",
    fontWeight: 700,
    fontSize: "16px",
    textTransform: "none",
    boxShadow: "0 8px 25px rgba(156, 39, 176, 0.3)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px) scale(1.02)",
      boxShadow: "0 12px 35px rgba(156, 39, 176, 0.4)",
    },
  })
);
export const cardStyle = {
  mb: 2,
  borderRadius: "15px",
  border: "2px solid #f0f0f0",
  "&:hover": {
    border: "2px solid #e0e0e0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
};

export const StyledTextFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "2px",
      },
    },
  },
};

export const StyledSelectSx = {
  borderRadius: "15px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  "&.Mui-focused": {
    backgroundColor: "white",
  },
};

export const islamicColors = {
  primary: "#1a936f",
  secondary: "#c45c3e",
  accent: "#88d498",
  background: "#f8f5e6",
  gold: "#d4af37",
  text: "#2d2d2d",
  lightText: "#5c5c5c",
};
export const departmentColors: Record<string, string> = {
  "Quran Memorization": "#1a936f",
  Tajweed: "#88d498",
  Tafsir: "#c45c3e",
  "Arabic Language": "#3a7bd5",
  "Islamic Studies": "#d4af37",
  Fiqh: "#6a11cb",
  Hadith: "#fc4a1a",
  Seerah: "#00b09b",
  "Not Specified": "#888888",
};

export const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

export const StyledPaper = styled(Paper)({
  borderRadius: "16px",
  overflow: "hidden",
  position: "relative",
  border: `1px solid ${alpha(islamicColors.primary, 0.1)}`,
  background: `linear-gradient(to bottom, #ffffff, ${alpha(islamicColors.background, 0.5)})`,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${islamicColors.primary}, ${islamicColors.secondary})`,
  },
});

export const hifzCard = styled(Card)({
  position: "relative",
  border: `1px solid ${alpha(islamicColors.primary, 0.1)}`,
  overflow: "visible",
  borderRadius: "16px",
  background: `linear-gradient(to bottom, #ffffff, ${alpha(islamicColors.background, 0.3)})`,
  boxShadow: "0 5px 20px rgba(0, 0, 0, 0.05)",
});
export const customStyle = {
  width: "100%",

  display: "flex",
  justifyContent: "center",
  backgroundColor: islamicColors.background,
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23${islamicColors.primary.replace("#", "")}' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  py: 4,
};

export const hifzBox = {
  p: 3,
  background: `linear-gradient(135deg, ${islamicColors.primary} 0%, ${islamicColors.secondary} 100%)`,
  color: "white",
  borderRadius: "16px 16px 0 0",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L0 20z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
  },
};

export const hifzBG = {
  flexGrow: 1,
  bgcolor: islamicColors.background,
  minHeight: "100vh",
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23${islamicColors.primary.replace("#", "")}' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  py: 4,
};

export const reportStyle = {
  "& .MuiOutlinedInput-root": {
    border: 0,
    fontSize: "0.75rem",
    height: 24,
    "@media print": { bgcolor: "transparent" },
  },
};
export const reportInput = {
  "& .MuiOutlinedInput-root": {
    border: 0,
    fontSize: "0.75rem",
    height: 32,
    "@media print": { bgcolor: "transparent" },
  },
};

export const boxStyleReport = {
  p: { xs: 1, sm: 1, md: 2, lg: 3 },
  borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
};
export const reportCellStyle = {
  fontWeight: 600,
  textAlign: "center",
  minWidth: 80,
};
export const reportRowStyle = {
  bgcolor: "grey.50",
  "@media print": { bgcolor: "transparent" },
};

export const tableStyle = {
  border: 1,
  borderColor: "grey.300",
  "@media print": { borderColor: "black" },
  "& .MuiTableCell-root": {
    border: 1,
    borderColor: "grey.300",
    "@media print": { borderColor: "black" },
    fontSize: "0.75rem",
    p: 0.5,
    minWidth: 60,
  },
};

export const tableRowCellStyle = { fontWeight: 600, fontSize: "0.75rem", p: 1 }