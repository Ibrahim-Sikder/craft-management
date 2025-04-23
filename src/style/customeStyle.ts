/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled } from "@mui/material/styles"
import {
    Box,
    Card,
    Chip,

    Badge,
 
    alpha,
    Button,
    TextField,

  } from "@mui/material"
import { TeacherStatus } from "@/interface"

// Styled components
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
}))

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
    background: 'url("/placeholder.svg?height=200&width=1000") center/cover no-repeat',
    opacity: 0.1,
  },
}))

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
}))

export const StatusChip = styled(Chip)<{ status: TeacherStatus }>(({ theme, status }) => ({
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
}))

export const DepartmentChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  borderRadius: 8,
}))
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
}))

export const ViewToggleButton = styled(Button)<{ active: boolean }>(({ theme, active }) => ({
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : "transparent",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  fontWeight: active ? 600 : 400,
  "&:hover": {
    backgroundColor: active ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.action.hover, 0.1),
  },
}))

export const PerformanceIndicator = styled(Box)<{ value: number }>(({ theme, value }) => ({
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
      value > 80 ? theme.palette.success.main : value > 50 ? theme.palette.warning.main : theme.palette.error.main,
    borderRadius: 2,
  },
}))
