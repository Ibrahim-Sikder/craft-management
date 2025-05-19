/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  alpha,
} from "@mui/material"
import {
  Add as AddIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  CalendarViewMonth as CalendarViewMonthIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  CloudDownload as CloudDownloadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  FilterList as FilterListIcon,
  GridView as GridViewIcon,
  InfoOutlined as InfoOutlinedIcon,
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  TableRows as TableRowsIcon,
  Visibility as VisibilityIcon,
  Warning as WarningIcon,
} from "@mui/icons-material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { motion } from "framer-motion"

// Create a custom theme with primary color as deep purple/violet
const theme = createTheme({
  palette: {
    primary: {
      main: "#5e35b1",
      light: "#9162e4",
      dark: "#280680",
      contrastText: "#fff",
    },
    secondary: {
      main: "#e91e63",
      light: "#ff6090",
      dark: "#b0003a",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          overflow: "visible",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 10px rgba(0,0,0,0.1)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(45deg, #5e35b1 30%, #7c4dff 90%)",
        },
        containedSecondary: {
          background: "linear-gradient(45deg, #e91e63 30%, #f48fb1 90%)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: alpha("#5e35b1", 0.05),
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
})

// Mock data for fines
const MOCK_FINES = [
  {
    id: "FN-2023-001",
    studentId: "ST-2023-001",
    studentName: "Alex Johnson",
    studentImage: "/placeholder.svg?height=40&width=40",
    class: "Grade 10-A",
    fineType: "Late Fee",
    amount: 500,
    date: "2023-11-15",
    dueDate: "2023-11-30",
    status: "unpaid",
    description: "Late payment of tuition fees for November",
    category: "financial",
    assignedBy: "Mrs. Thompson",
  },
  {
    id: "FN-2023-002",
    studentId: "ST-2023-045",
    studentName: "Sophia Martinez",
    studentImage: "/placeholder.svg?height=40&width=40",
    class: "Grade 9-B",
    fineType: "Library Fine",
    amount: 200,
    date: "2023-11-10",
    dueDate: "2023-11-25",
    status: "paid",
    description: "Overdue library book: 'To Kill a Mockingbird'",
    category: "library",
    assignedBy: "Mr. Roberts",
    paidOn: "2023-11-20",
  },
  {
    id: "FN-2023-003",
    studentId: "ST-2023-078",
    studentName: "Ethan Williams",
    studentImage: "/placeholder.svg?height=40&width=40",
    class: "Grade 11-C",
    fineType: "Damage Fine",
    amount: 1000,
    date: "2023-11-05",
    dueDate: "2023-11-20",
    status: "partial",
    description: "Damage to laboratory equipment during chemistry class",
    category: "property",
    assignedBy: "Dr. Chen",
    paidAmount: 400,
  },
  {
    id: "FN-2023-004",
    studentId: "ST-2023-102",
    studentName: "Olivia Brown",
    studentImage: "/placeholder.svg?height=40&width=40",
    class: "Grade 12-A",
    fineType: "Late Attendance",
    amount: 300,
    date: "2023-11-12",
    dueDate: "2023-11-27",
    status: "waived",
    description: "Repeated late arrivals to morning classes",
    category: "disciplinary",
    assignedBy: "Mr. Johnson",
    waivedBy: "Principal Davis",
    waivedReason: "Family emergency situation verified",
  },
  {
    id: "FN-2023-005",
    studentId: "ST-2023-056",
    studentName: "Noah Garcia",
    studentImage: "/placeholder.svg?height=40&width=40",
    class: "Grade 10-B",
    fineType: "Uniform Violation",
    amount: 200,
    date: "2023-11-08",
    dueDate: "2023-11-23",
    status: "unpaid",
    description: "Repeated uniform violations during school assembly",
    category: "disciplinary",
    assignedBy: "Ms. Wilson",
  },
  {
    id: "FN-2023-006",
    studentId: "ST-2023-089",
    studentName: "Emma Davis",
    studentImage: "/placeholder.svg?height=40&width=40",
    class: "Grade 9-A",
    fineType: "Late Fee",
    amount: 600,
    date: "2023-11-01",
    dueDate: "2023-11-16",
    status: "paid",
    description: "Late payment of extracurricular activity fees",
    category: "financial",
    assignedBy: "Mrs. Thompson",
    paidOn: "2023-11-15",
  },
  {
    id: "FN-2023-007",
    studentId: "ST-2023-034",
    studentName: "Liam Rodriguez",
    studentImage: "/placeholder.svg?height=40&width=40",
    class: "Grade 11-B",
    fineType: "Damage Fine",
    amount: 1500,
    date: "2023-11-03",
    dueDate: "2023-11-18",
    status: "unpaid",
    description: "Damage to school musical instrument (violin)",
    category: "property",
    assignedBy: "Ms. Lee",
  },
  {
    id: "FN-2023-008",
    studentId: "ST-2023-112",
    studentName: "Ava Wilson",
    studentImage: "/placeholder.svg?height=40&width=40",
    class: "Grade 12-C",
    fineType: "Library Fine",
    amount: 150,
    date: "2023-11-09",
    dueDate: "2023-11-24",
    status: "paid",
    description: "Overdue library books (multiple items)",
    category: "library",
    assignedBy: "Mr. Roberts",
    paidOn: "2023-11-18",
  },
  {
    id: "FN-2023-009",
    studentId: "ST-2023-067",
    studentName: "Mason Thompson",
    studentImage: "/placeholder.svg?height=40&width=40",
    class: "Grade 10-C",
    fineType: "Late Attendance",
    amount: 400,
    date: "2023-11-07",
    dueDate: "2023-11-22",
    status: "unpaid",
    description: "Excessive tardiness during the first quarter",
    category: "disciplinary",
    assignedBy: "Mr. Johnson",
  },
  {
    id: "FN-2023-010",
    studentId: "ST-2023-023",
    studentName: "Isabella Martin",
    studentImage: "/placeholder.svg?height=40&width=40",
    class: "Grade 9-C",
    fineType: "Uniform Violation",
    amount: 200,
    date: "2023-11-14",
    dueDate: "2023-11-29",
    status: "partial",
    description: "Incomplete uniform during school inspection",
    category: "disciplinary",
    assignedBy: "Ms. Wilson",
    paidAmount: 100,
  },
  {
    id: "FN-2023-011",
    studentId: "ST-2023-091",
    studentName: "James Taylor",
    studentImage: "/placeholder.svg?height=40&width=40",
    class: "Grade 11-A",
    fineType: "Late Fee",
    amount: 500,
    date: "2023-11-02",
    dueDate: "2023-11-17",
    status: "paid",
    description: "Late payment of laboratory fees",
    category: "financial",
    assignedBy: "Mrs. Thompson",
    paidOn: "2023-11-16",
  },
  {
    id: "FN-2023-012",
    studentId: "ST-2023-038",
    studentName: "Charlotte Anderson",
    studentImage: "/placeholder.svg?height=40&width=40",
    class: "Grade 10-D",
    fineType: "Damage Fine",
    amount: 800,
    date: "2023-11-06",
    dueDate: "2023-11-21",
    status: "partial",
    description: "Damage to classroom furniture",
    category: "property",
    assignedBy: "Mr. Davis",
    paidAmount: 300,
  },
]

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Status chip component
const StatusChip = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return {
          bgcolor: "success.light",
          color: "success.dark",
          icon: <CheckCircleIcon fontSize="small" />,
        }
      case "unpaid":
        return {
          bgcolor: "error.light",
          color: "error.dark",
          icon: <CloseIcon fontSize="small" />,
        }
      case "partial":
        return {
          bgcolor: "warning.light",
          color: "warning.dark",
          icon: <WarningIcon fontSize="small" />,
        }
      case "waived":
        return {
          bgcolor: "info.light",
          color: "info.dark",
          icon: <InfoOutlinedIcon fontSize="small" />,
        }
      default:
        return {
          bgcolor: "grey.300",
          color: "text.secondary",
          icon: undefined,
        }
    }
  }

  const statusConfig = getStatusColor(status)

  return (
    <Chip
      icon={statusConfig.icon}
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      sx={{
        bgcolor: statusConfig.bgcolor,
        color: statusConfig.color,
        fontWeight: 500,
        "& .MuiChip-icon": {
          color: statusConfig.color,
        },
      }}
      size="small"
    />
  )
}

// Category chip component
const CategoryChip = ({ category }: { category: string }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "financial":
        return {
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.dark,
        }
      case "library":
        return {
          bgcolor: alpha(theme.palette.secondary.main, 0.1),
          color: theme.palette.secondary.dark,
        }
      case "property":
        return {
          bgcolor: alpha(theme.palette.error.main, 0.1),
          color: theme.palette.error.dark,
        }
      case "disciplinary":
        return {
          bgcolor: alpha(theme.palette.warning.main, 0.1),
          color: theme.palette.warning.dark,
        }
      default:
        return {
          bgcolor: "grey.300",
          color: "text.secondary",
        }
    }
  }

  const categoryConfig = getCategoryColor(category)

  return (
    <Chip
      label={category.charAt(0).toUpperCase() + category.slice(1)}
      sx={{
        bgcolor: categoryConfig.bgcolor,
        color: categoryConfig.color,
        fontWeight: 500,
      }}
      size="small"
    />
  )
}

// Fine card component
const FineCard = ({
  fine,
  onSelect,
  isSelected,
}: {
  fine: any
  onSelect: (id: string) => void
  isSelected: boolean
}) => {
  return (
    <Card
      sx={{
        transition: "all 0.3s ease",
        transform: isSelected ? "translateY(-4px)" : "none",
        boxShadow: isSelected ? "0 12px 20px rgba(94, 53, 177, 0.2)" : undefined,
        border: isSelected ? "2px solid" : "none",
        borderColor: "primary.main",
      }}
    >
      <CardHeader
        sx={{ pb: 1 }}
        title={
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={isSelected}
                onChange={() => onSelect(fine.id)}
                sx={{ ml: -1, mr: 1, color: "primary.main" }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {fine.fineType}
              </Typography>
            </Box>
            <StatusChip status={fine.status} />
          </Box>
        }
        subheader={
          <Typography variant="caption" color="text.secondary" sx={{ ml: 4 }}>
            {fine.id}
          </Typography>
        }
      />
      <CardContent sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            component="img"
            src={fine.studentImage}
            alt={fine.studentName}
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              mr: 1.5,
              border: "1px solid",
              borderColor: "divider",
            }}
          />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {fine.studentName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {fine.class}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={1} sx={{ mb: 1.5 }}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Amount
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formatCurrency(fine.amount)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Due Date
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {new Date(fine.dueDate).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="caption" color="text.secondary">
          Description
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 1.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {fine.description}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <CategoryChip category={fine.category} />
          <IconButton size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}

// Calendar view component
const CalendarView = ({ fines }: { fines: any[] }) => {
  // Get current month and year
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString("default", { month: "long" })
  const currentYear = currentDate.getFullYear()

  // Get days in current month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  // Create calendar days array
  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null) // Empty cells for days before the 1st of the month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  // Group fines by date
  const finesByDate: Record<string, any[]> = {}
  fines.forEach((fine) => {
    const date = new Date(fine.date)
    const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    if (!finesByDate[dateKey]) {
      finesByDate[dateKey] = []
    }
    finesByDate[dateKey].push(fine)
  })

  return (
    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6">
          {currentMonth} {currentYear}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" size="small" startIcon={<ArrowUpwardIcon />}>
            Previous
          </Button>
          <Button variant="outlined" size="small" startIcon={<ArrowDownwardIcon />}>
            Next
          </Button>
          <Button variant="contained" size="small">
            Today
          </Button>
        </Box>
      </Box>

      <Grid container spacing={1} sx={{ mb: 2 }}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Grid item xs={12 / 7} key={day}>
            <Box
              sx={{
                bgcolor: "primary.light",
                color: "white",
                p: 1,
                textAlign: "center",
                borderRadius: 1,
                fontWeight: 600,
              }}
            >
              {day}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={1}>
        {calendarDays.map((day, index) => {
          const date = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null
          const dateKey = date ? `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` : ""
          const dayFines = dateKey ? finesByDate[dateKey] || [] : []
          const isToday =
            date &&
            date.getDate() === currentDate.getDate() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getFullYear() === currentDate.getFullYear()

          return (
            <Grid item xs={12 / 7} key={index}>
              <Paper
                elevation={0}
                sx={{
                  height: 120,
                  p: 1,
                  border: "1px solid",
                  borderColor: isToday ? "primary.main" : "divider",
                  borderRadius: 2,
                  position: "relative",
                  bgcolor: isToday ? alpha(theme.palette.primary.main, 0.05) : "background.paper",
                  boxShadow: isToday ? `0 0 0 2px ${theme.palette.primary.main}` : "none",
                  overflow: "hidden",
                }}
              >
                {day && (
                  <>
                    <Typography
                      variant="body2"
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        fontWeight: isToday ? 700 : 400,
                        color: isToday ? "primary.main" : "text.primary",
                      }}
                    >
                      {day}
                    </Typography>
                    <Box sx={{ mt: 4, overflow: "hidden" }}>
                      {dayFines.slice(0, 2).map((fine, idx) => (
                        <Chip
                          key={idx}
                          label={fine.fineType}
                          size="small"
                          sx={{
                            mb: 0.5,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: "primary.dark",
                            width: "100%",
                            justifyContent: "flex-start",
                            height: "auto",
                            "& .MuiChip-label": {
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              py: 0.5,
                            },
                          }}
                        />
                      ))}
                      {dayFines.length > 2 && (
                        <Typography variant="caption" color="primary" sx={{ display: "block", textAlign: "center" }}>
                          +{dayFines.length - 2} more
                        </Typography>
                      )}
                    </Box>
                  </>
                )}
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Paper>
  )
}

// Analytics component
const AnalyticsSection = ({ fines }: { fines: any[] }) => {
  // Calculate statistics
  const totalFines = fines.length
  const totalAmount = fines.reduce((sum, fine) => sum + fine.amount, 0)
  const paidFines = fines.filter((f) => f.status === "paid").length
  const unpaidFines = fines.filter((f) => f.status === "unpaid").length
  const partialFines = fines.filter((f) => f.status === "partial").length
  const waivedFines = fines.filter((f) => f.status === "waived").length
  const collectionRate = (paidFines / totalFines) * 100

  // Calculate collected amount
  const collectedAmount = fines.reduce((sum, fine) => {
    if (fine.status === "paid") {
      return sum + fine.amount
    } else if (fine.status === "partial") {
      return sum + (fine.paidAmount || 0)
    }
    return sum
  }, 0)

  // Calculate pending amount
  const pendingAmount = fines.reduce((sum, fine) => {
    if (fine.status === "unpaid") {
      return sum + fine.amount
    } else if (fine.status === "partial") {
      return sum + (fine.amount - (fine.paidAmount || 0))
    }
    return sum
  }, 0)

  // Category breakdown
  const categories = fines.reduce((acc: Record<string, number>, fine) => {
    acc[fine.category] = (acc[fine.category] || 0) + 1
    return acc
  }, {})

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  // Card data
  const analyticsCards = [
    {
      title: "Total Fines",
      value: totalFines,
      icon: <NotificationsIcon />,
      color: "primary",
      subtext: `${paidFines} paid, ${unpaidFines} unpaid`,
    },
    {
      title: "Collection Rate",
      value: `${collectionRate.toFixed(1)}%`,
      icon: <CheckCircleIcon />,
      color: "success",
      progress: collectionRate,
    },
    {
      title: "Total Amount",
      value: formatCurrency(totalAmount),
      icon: <InfoOutlinedIcon />,
      color: "info",
      subtext: `${formatCurrency(collectedAmount)} collected`,
    },
    {
      title: "Pending Amount",
      value: formatCurrency(pendingAmount),
      icon: <WarningIcon />,
      color: "warning",
      subtext: `${unpaidFines + partialFines} pending fines`,
    },
  ]

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {analyticsCards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <motion.div
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            style={{ height: "100%" }}
          >
            <Card
              sx={{
                height: "100%",
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette[card.color as "primary" | "success" | "info" | "warning"].light,
                  0.2,
                )} 0%, ${alpha(theme.palette[card.color as "primary" | "success" | "info" | "warning"].main, 0.05)} 100%)`,
                border: "1px solid",
                borderColor: alpha(theme.palette[card.color as "primary" | "success" | "info" | "warning"].main, 0.2),
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {card.title}
                  </Typography>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: "50%",
                      bgcolor: alpha(theme.palette[card.color as "primary" | "success" | "info" | "warning"].main, 0.2),
                      color: theme.palette[card.color as "primary" | "success" | "info" | "warning"].main,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {card.value}
                </Typography>
                {card.progress ? (
                  <LinearProgress
                    variant="determinate"
                    value={card.progress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      mb: 1,
                      bgcolor: alpha(theme.palette[card.color as "primary" | "success" | "info" | "warning"].main, 0.1),
                      "& .MuiLinearProgress-bar": {
                        bgcolor: theme.palette[card.color as "primary" | "success" | "info" | "warning"].main,
                      },
                    }}
                  />
                ) : null}
                {card.subtext && (
                  <Typography variant="caption" color="text.secondary">
                    {card.subtext}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  )
}

// Main component
export default function FineListPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [fines, setFines] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"table" | "grid" | "calendar">("table")
  const [selectedFines, setSelectedFines] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [dateRangeFilter, setDateRangeFilter] = useState<string>("all")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderBy, setOrderBy] = useState<string>("date")
  const [order, setOrder] = useState<"asc" | "desc">("desc")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [tabValue, setTabValue] = useState("all")

  // Load data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFines(MOCK_FINES)
      setLoading(false)
    }, 800)
  }, [])

  // Handle selection
  const handleSelectFine = (id: string) => {
    setSelectedFines((prev) => (prev.includes(id) ? prev.filter((fineId) => fineId !== id) : [...prev, id]))
  }

  // Handle select all
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedFines(filteredFines.map((fine) => fine.id))
    } else {
      setSelectedFines([])
    }
  }

  // Handle sort
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // Handle delete dialog open
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  // Handle delete dialog close
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false)
  }

  // Handle delete fines
  const handleDeleteFines = () => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setFines(fines.filter((fine) => !selectedFines.includes(fine.id)))
      setSelectedFines([])
      setLoading(false)
      setDeleteDialogOpen(false)
    }, 800)
  }

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
    if (newValue !== "all") {
      setStatusFilter(newValue)
    } else {
      setStatusFilter("all")
    }
  }

  // Filter and sort fines
  const filteredFines = fines
    .filter((fine) => {
      // Search query
      if (
        searchQuery &&
        !fine.studentName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !fine.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !fine.fineType.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Status filter
      if (statusFilter !== "all" && fine.status !== statusFilter) {
        return false
      }

      // Category filter
      if (categoryFilter !== "all" && fine.category !== categoryFilter) {
        return false
      }

      // Date range filter (simplified)
      if (dateRangeFilter === "thisWeek") {
        const fineDate = new Date(fine.date)
        const today = new Date()
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay()))
        return fineDate >= weekStart
      }

      return true
    })
    .sort((a, b) => {
      const isAsc = order === "asc"

      if (orderBy === "amount") {
        return isAsc ? a.amount - b.amount : b.amount - a.amount
      }

      if (orderBy === "date" || orderBy === "dueDate") {
        return isAsc
          ? new Date(a[orderBy]).getTime() - new Date(b[orderBy]).getTime()
          : new Date(b[orderBy]).getTime() - new Date(a[orderBy]).getTime()
      }

      // String comparison for other fields
      const aValue = a[orderBy as keyof typeof a]
      const bValue = b[orderBy as keyof typeof b]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return isAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })

  // Calculate total amount of selected fines
  const selectedTotalAmount = selectedFines.reduce((sum, id) => {
    const fine = fines.find((f) => f.id === id)
    return sum + (fine ? fine.amount : 0)
  }, 0)

  // Loading state
  if (loading) {
    return <LoadingState />
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: 4,
          background: "linear-gradient(135deg, #f5f7ff 0%, #f5f5f5 100%)",
        }}
      >
        <Container maxWidth="xl" sx={{p:{xs:"4px"}}}>
          {/* Page header */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography variant="h4" color="primary" gutterBottom>
                    Fine Management
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    View, manage, and track all student fines in one place
                  </Typography>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{ background: "linear-gradient(45deg, #5e35b1 30%, #7c4dff 90%)" }}
                      href="/fines/assign"
                    >
                      Assign New Fine
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CloudDownloadIcon />}
                      onClick={handleMenuOpen}
                      aria-controls="export-menu"
                      aria-haspopup="true"
                    >
                      Export
                    </Button>
                    <Menu
                      id="export-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>
                        <CloudDownloadIcon fontSize="small" sx={{ mr: 1 }} /> Export to Excel
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        <CloudDownloadIcon fontSize="small" sx={{ mr: 1 }} /> Export to PDF
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleMenuClose}>
                        <PrintIcon fontSize="small" sx={{ mr: 1 }} /> Print List
                      </MenuItem>
                    </Menu>
                    <IconButton color="primary" aria-label="refresh" onClick={() => window.location.reload()}>
                      <RefreshIcon />
                    </IconButton>
                  </Stack>
                </motion.div>
              </Grid>
            </Grid>
          </Box>

          {/* Analytics section */}
          <AnalyticsSection fines={fines} />

          {/* Filters and search */}
          <Card
            sx={{ mb: 4 }}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Search by student name, ID, or fine type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="category-filter-label">Category</InputLabel>
                        <Select
                          labelId="category-filter-label"
                          id="category-filter"
                          value={categoryFilter}
                          label="Category"
                          onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                          <MenuItem value="all">All Categories</MenuItem>
                          <MenuItem value="financial">Financial</MenuItem>
                          <MenuItem value="library">Library</MenuItem>
                          <MenuItem value="property">Property</MenuItem>
                          <MenuItem value="disciplinary">Disciplinary</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="date-range-filter-label">Date Range</InputLabel>
                        <Select
                          labelId="date-range-filter-label"
                          id="date-range-filter"
                          value={dateRangeFilter}
                          label="Date Range"
                          onChange={(e) => setDateRangeFilter(e.target.value)}
                        >
                          <MenuItem value="all">All Time</MenuItem>
                          <MenuItem value="today">Today</MenuItem>
                          <MenuItem value="thisWeek">This Week</MenuItem>
                          <MenuItem value="thisMonth">This Month</MenuItem>
                          <MenuItem value="custom">Custom Range</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip title="Filter">
                          <IconButton color="primary" sx={{ border: "1px solid", borderColor: "divider" }}>
                            <FilterListIcon />
                          </IconButton>
                        </Tooltip>
                        <Divider orientation="vertical" flexItem />
                        <Tooltip title="Table View">
                          <IconButton
                            color={viewMode === "table" ? "primary" : "default"}
                            onClick={() => setViewMode("table")}
                            sx={{
                              bgcolor: viewMode === "table" ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                              border: "1px solid",
                              borderColor: viewMode === "table" ? "primary.main" : "divider",
                            }}
                          >
                            <TableRowsIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Grid View">
                          <IconButton
                            color={viewMode === "grid" ? "primary" : "default"}
                            onClick={() => setViewMode("grid")}
                            sx={{
                              bgcolor: viewMode === "grid" ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                              border: "1px solid",
                              borderColor: viewMode === "grid" ? "primary.main" : "divider",
                            }}
                          >
                            <GridViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Calendar View">
                          <IconButton
                            color={viewMode === "calendar" ? "primary" : "default"}
                            onClick={() => setViewMode("calendar")}
                            sx={{
                              bgcolor: viewMode === "calendar" ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                              border: "1px solid",
                              borderColor: viewMode === "calendar" ? "primary.main" : "divider",
                            }}
                          >
                            <CalendarViewMonthIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* Selected items actions */}
              {selectedFines.length > 0 && (
                <Box
                  sx={{
                    mt: 3,
                    pt: 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                  component={motion.div}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {selectedFines.length} {selectedFines.length === 1 ? "fine" : "fines"} selected
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total amount: {formatCurrency(selectedTotalAmount)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EmailIcon />}
                      onClick={handleMenuClose}
                      color="primary"
                    >
                      Send Reminder
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<CheckCircleIcon />}
                      onClick={handleMenuClose}
                      color="success"
                    >
                      Mark as Paid
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={handleDeleteDialogOpen}
                      color="error"
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Tabs */}
          <Box sx={{ mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="fine status tabs"
              sx={{
                "& .MuiTab-root": {
                  minWidth: 100,
                  fontWeight: 600,
                },
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                px: 2,
              }}
            >
              <Tab value="all" label="All Fines" />
              <Tab value="unpaid" label="Unpaid" />
              <Tab value="paid" label="Paid" />
              <Tab value="partial" label="Partial" />
              <Tab value="waived" label="Waived" />
            </Tabs>
          </Box>

          {/* Content based on view mode */}
          {viewMode === "table" && (
            <Card
              sx={{ mb: 4, overflow: "hidden" }}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TableContainer sx={{
            overflowX: "auto",  
            WebkitOverflowScrolling: "touch",  
            maxWidth: "100vw"  
          }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={selectedFines.length > 0 && selectedFines.length < filteredFines.length}
                          checked={filteredFines.length > 0 && selectedFines.length === filteredFines.length}
                          onChange={handleSelectAll}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === "id"}
                          direction={orderBy === "id" ? order : "asc"}
                          onClick={() => handleRequestSort("id")}
                        >
                          Fine ID
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === "studentName"}
                          direction={orderBy === "studentName" ? order : "asc"}
                          onClick={() => handleRequestSort("studentName")}
                        >
                          Student
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === "fineType"}
                          direction={orderBy === "fineType" ? order : "asc"}
                          onClick={() => handleRequestSort("fineType")}
                        >
                          Fine Type
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="right">
                        <TableSortLabel
                          active={orderBy === "amount"}
                          direction={orderBy === "amount" ? order : "asc"}
                          onClick={() => handleRequestSort("amount")}
                        >
                          Amount
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === "date"}
                          direction={orderBy === "date" ? order : "asc"}
                          onClick={() => handleRequestSort("date")}
                        >
                          Issue Date
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === "dueDate"}
                          direction={orderBy === "dueDate" ? order : "asc"}
                          onClick={() => handleRequestSort("dueDate")}
                        >
                          Due Date
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredFines.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} align="center" sx={{ py: 4 }}>
                          <Box sx={{ textAlign: "center" }}>
                            <WarningIcon sx={{ fontSize: 48, color: "text.secondary", opacity: 0.5, mb: 1 }} />
                            <Typography variant="h6" color="text.secondary">
                              No fines found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Try adjusting your filters or search criteria
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredFines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((fine) => (
                        <TableRow
                          key={fine.id}
                          hover
                          selected={selectedFines.includes(fine.id)}
                          sx={{
                            "&.Mui-selected": {
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                            },
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedFines.includes(fine.id)}
                              onChange={() => handleSelectFine(fine.id)}
                              color="primary"
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{fine.id}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box
                                component="img"
                                src={fine.studentImage}
                                alt={fine.studentName}
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: "50%",
                                  mr: 1.5,
                                  border: "1px solid",
                                  borderColor: "divider",
                                }}
                              />
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {fine.studentName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {fine.class}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>{fine.fineType}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            {formatCurrency(fine.amount)}
                          </TableCell>
                          <TableCell>{new Date(fine.date).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(fine.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <StatusChip status={fine.status} />
                          </TableCell>
                          <TableCell>
                            <CategoryChip category={fine.category} />
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                              <Tooltip title="View Details">
                                <IconButton size="small" color="primary">
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton size="small" color="primary">
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="More Actions">
                                <IconButton size="small">
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={filteredFines.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          )}

          {/* Grid view */}
          {viewMode === "grid" && (
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {filteredFines.length === 0 ? (
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 4,
                      textAlign: "center",
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    }}
                  >
                    <WarningIcon sx={{ fontSize: 48, color: "text.secondary", opacity: 0.5, mb: 1 }} />
                    <Typography variant="h6" color="text.secondary">
                      No fines found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your filters or search criteria
                    </Typography>
                  </Paper>
                </Grid>
              ) : (
                filteredFines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((fine, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={fine.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <FineCard fine={fine} onSelect={handleSelectFine} isSelected={selectedFines.includes(fine.id)} />
                    </motion.div>
                  </Grid>
                ))
              )}
              {filteredFines.length > 0 && (
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <TablePagination
                      rowsPerPageOptions={[8, 12, 20, 40]}
                      component="div"
                      count={filteredFines.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          )}

          {/* Calendar view */}
          {viewMode === "calendar" && <CalendarView fines={filteredFines} />}

          {/* Delete confirmation dialog */}
          <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete {selectedFines.length} {selectedFines.length === 1 ? "fine" : "fines"}?
                This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteFines} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

// Loading state component
const LoadingState = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 4 }}>
      <Container maxWidth="xl" sx={{p:{xs:"4px"}}}>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width={300} height={40} />
          <Skeleton variant="text" width={500} height={24} />
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Skeleton variant="text" width={100} height={24} />
                    <Skeleton variant="circular" width={40} height={40} />
                  </Box>
                  <Skeleton variant="text" width={120} height={32} />
                  <Skeleton variant="rectangular" width="100%" height={6} sx={{ mt: 1, mb: 1, borderRadius: 3 }} />
                  <Skeleton variant="text" width={150} height={20} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 1 }} />
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4} md={3}>
                    <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={12} sm={4} md={3}>
                    <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={12} sm={4} md={3}>
                    <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ mb: 3 }}>
          <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 2 }} />
        </Box>

        <Card sx={{ mb: 4, overflow: "hidden" }}>
          <TableContainer sx={{
            overflowX: "auto",  
            WebkitOverflowScrolling: "touch",  
            maxWidth: "100vw"  
          }}>
            <Table>
              <TableHead>
                <TableRow>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton variant="text" width={index === 0 ? 20 : 80} height={24} />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell padding="checkbox">
                      <Skeleton variant="rectangular" width={20} height={20} sx={{ borderRadius: 0.5 }} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} height={24} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1.5 }} />
                        <Box>
                          <Skeleton variant="text" width={120} height={20} />
                          <Skeleton variant="text" width={80} height={16} />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={100} height={24} />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" width={60} height={24} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} height={24} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} height={24} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 4 }} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 4 }} />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Skeleton variant="circular" width={24} height={24} sx={{ mx: 0.5 }} />
                        <Skeleton variant="circular" width={24} height={24} sx={{ mx: 0.5 }} />
                        <Skeleton variant="circular" width={24} height={24} sx={{ mx: 0.5 }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", p: 2, borderTop: "1px solid", borderColor: "divider" }}
          >
            <Skeleton variant="rectangular" width={300} height={36} sx={{ borderRadius: 1 }} />
          </Box>
        </Card>
      </Container>
    </Box>
  )
}
