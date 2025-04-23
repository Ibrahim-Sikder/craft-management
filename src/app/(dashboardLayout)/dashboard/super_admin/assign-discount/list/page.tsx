/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState, useMemo, useEffect } from "react"
import {
  Alert,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  AssignmentTurnedIn as AssignmentIcon,
  AttachMoney as MoneyIcon,
  CalendarMonth as CalendarIcon,
  CloudDownload as DownloadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Groups as GroupsIcon,
  LocalOffer as DiscountIcon,
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  School as SchoolIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  ViewModule,
  Close as CloseIcon,
} from "@mui/icons-material"
import { ThemeProvider, createTheme, alpha } from "@mui/material/styles"
import { motion } from "framer-motion"
import { FC } from "react";

import {  type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid"


import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

import dynamic from "next/dynamic"



const DataGrid = dynamic(
  () => import("@mui/x-data-grid").then((mod) => mod.DataGrid),
  { ssr: false }
);

const GridToolbar = dynamic(
  () => import("@mui/x-data-grid").then((mod) => mod.GridToolbar),
  { ssr: false }
);


interface AnimatedNumberProps {
  value: number;
}
// Create a custom theme with a vibrant color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1", // Indigo
      light: "#818cf8",
      dark: "#4f46e5",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ec4899", // Pink
      light: "#f472b6",
      dark: "#db2777",
      contrastText: "#fff",
    },
    success: {
      main: "#10b981", // Emerald
      light: "#34d399",
      dark: "#059669",
    },
    error: {
      main: "#ef4444", // Red
      light: "#f87171",
      dark: "#dc2626",
    },
    warning: {
      main: "#f59e0b", // Amber
      light: "#fbbf24",
      dark: "#d97706",
    },
    info: {
      main: "#3b82f6", // Blue
      light: "#60a5fa",
      dark: "#2563eb",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
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
    subtitle2: {
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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          overflow: "visible",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "24px 24px 0 24px",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          "&:last-child": {
            paddingBottom: 24,
          },
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
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: "#f9fafb",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-child td": {
            borderBottom: 0,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          height: 6,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
})

// Sample data for discounts
const discounts = [
  {
    id: 1,
    name: "Merit Scholarship",
    type: "academic",
    amount: "25%",
    isPercent: true,
    description: "For students with exceptional academic performance",
    icon: <SchoolIcon />,
    color: "#6366f1",
  },
  {
    id: 2,
    name: "Early Payment Discount",
    type: "early",
    amount: "$150",
    isPercent: false,
    description: "For fees paid before the due date",
    icon: <MoneyIcon />,
    color: "#10b981",
  },
  {
    id: 3,
    name: "Sibling Discount",
    type: "sibling",
    amount: "10%",
    isPercent: true,
    description: "For families with multiple children enrolled",
    icon: <GroupsIcon />,
    color: "#3b82f6",
  },
  {
    id: 4,
    name: "Financial Aid",
    type: "financial",
    amount: "Variable",
    isPercent: false,
    description: "Based on family income and financial need",
    icon: <MoneyIcon />,
    color: "#f59e0b",
  },
  {
    id: 5,
    name: "Sports Excellence",
    type: "academic",
    amount: "50%",
    isPercent: true,
    description: "For students with outstanding sports achievements",
    icon: <SchoolIcon />,
    color: "#ef4444",
  },
  {
    id: 6,
    name: "Alumni Children",
    type: "special",
    amount: "15%",
    isPercent: true,
    description: "For children of school alumni",
    icon: <SchoolIcon />,
    color: "#8b5cf6",
  },
]

// Sample data for fees
const fees = [
  { id: 1, name: "Tuition Fee", amount: 5000, frequency: "Monthly" },
  { id: 2, name: "Admission Fee", amount: 10000, frequency: "One-time" },
  { id: 3, name: "Examination Fee", amount: 2000, frequency: "Term" },
  { id: 4, name: "Library Fee", amount: 1000, frequency: "Annual" },
  { id: 5, name: "Sports Fee", amount: 1500, frequency: "Annual" },
  { id: 6, name: "Computer Lab Fee", amount: 2000, frequency: "Monthly" },
  { id: 7, name: "Transportation Fee", amount: 3000, frequency: "Monthly" },
  { id: 8, name: "Development Fee", amount: 5000, frequency: "Annual" },
]

// Sample data for classes
const classes = [
  { id: 1, name: "Nursery", section: "A", students: 25 },
  { id: 2, name: "KG", section: "A", students: 30 },
  { id: 3, name: "Class 1", section: "A", students: 35 },
  { id: 4, name: "Class 1", section: "B", students: 32 },
  { id: 5, name: "Class 2", section: "A", students: 38 },
  { id: 6, name: "Class 2", section: "B", students: 36 },
  { id: 7, name: "Class 3", section: "A", students: 40 },
  { id: 8, name: "Class 3", section: "B", students: 38 },
  { id: 9, name: "HIFZ", section: "A", students: 20 },
]

// Sample data for students
const students = [
  {
    id: "STU001",
    name: "Ahmed Ali",
    fatherName: "Ali Hassan",
    class: "Class 1",
    section: "A",
    avatar: "A",
    gender: "Male",
    rollNumber: "C1A-001",
  },
  {
    id: "STU002",
    name: "Fatima Khan",
    fatherName: "Imran Khan",
    class: "Class 1",
    section: "A",
    avatar: "F",
    gender: "Female",
    rollNumber: "C1A-002",
  },
  {
    id: "STU003",
    name: "Muhammad Usman",
    fatherName: "Usman Ahmed",
    class: "Class 1",
    section: "A",
    avatar: "M",
    gender: "Male",
    rollNumber: "C1A-003",
  },
  {
    id: "STU004",
    name: "Ayesha Malik",
    fatherName: "Malik Riaz",
    class: "Class 1",
    section: "A",
    avatar: "A",
    gender: "Female",
    rollNumber: "C1A-004",
  },
  {
    id: "STU005",
    name: "Hassan Ahmed",
    fatherName: "Ahmed Khan",
    class: "Class 1",
    section: "A",
    avatar: "H",
    gender: "Male",
    rollNumber: "C1A-005",
  },
  {
    id: "STU006",
    name: "Zainab Fatima",
    fatherName: "Fatima Javed",
    class: "Class 1",
    section: "B",
    avatar: "Z",
    gender: "Female",
    rollNumber: "C1B-001",
  },
  {
    id: "STU007",
    name: "Ali Raza",
    fatherName: "Raza Ali",
    class: "Class 1",
    section: "B",
    avatar: "A",
    gender: "Male",
    rollNumber: "C1B-002",
  },
  {
    id: "STU008",
    name: "Sana Javed",
    fatherName: "Javed Iqbal",
    class: "Class 1",
    section: "B",
    avatar: "S",
    gender: "Female",
    rollNumber: "C1B-003",
  },
  {
    id: "STU009",
    name: "Bilal Khan",
    fatherName: "Khan Muhammad",
    class: "Class 2",
    section: "A",
    avatar: "B",
    gender: "Male",
    rollNumber: "C2A-001",
  },
  {
    id: "STU010",
    name: "Hina Shahid",
    fatherName: "Shahid Mahmood",
    class: "Class 2",
    section: "A",
    avatar: "H",
    gender: "Female",
    rollNumber: "C2A-002",
  },
]

// Sample data for discount assignments
const discountAssignments = [
  {
    id: 1,
    discountId: 1,
    discountName: "Merit Scholarship",
    discountType: "academic",
    discountAmount: "25%",
    isPercent: true,
    feeId: 1,
    feeName: "Tuition Fee",
    feeAmount: 5000,
    feeFrequency: "Monthly",
    finalAmount: 3750,
    students: ["STU001", "STU004", "STU009"],
    assignedBy: "Admin User",
    assignedDate: "2024-03-15",
    status: "active",
    expiryDate: "2025-03-15",
    totalSavings: 3750,
  },
  {
    id: 2,
    discountId: 3,
    discountName: "Sibling Discount",
    discountType: "sibling",
    discountAmount: "10%",
    isPercent: true,
    feeId: 1,
    feeName: "Tuition Fee",
    feeAmount: 5000,
    feeFrequency: "Monthly",
    finalAmount: 4500,
    students: ["STU002", "STU003"],
    assignedBy: "Finance Manager",
    assignedDate: "2024-03-10",
    status: "active",
    expiryDate: "2025-03-10",
    totalSavings: 1000,
  },
  {
    id: 3,
    discountId: 2,
    discountName: "Early Payment Discount",
    discountType: "early",
    discountAmount: "$150",
    isPercent: false,
    feeId: 3,
    feeName: "Examination Fee",
    feeAmount: 2000,
    feeFrequency: "Term",
    finalAmount: 1850,
    students: ["STU005", "STU006", "STU007", "STU008"],
    assignedBy: "Finance Manager",
    assignedDate: "2024-02-20",
    status: "active",
    expiryDate: "2024-06-20",
    totalSavings: 600,
  },
  {
    id: 4,
    discountId: 5,
    discountName: "Sports Excellence",
    discountType: "academic",
    discountAmount: "50%",
    isPercent: true,
    feeId: 5,
    feeName: "Sports Fee",
    feeAmount: 1500,
    feeFrequency: "Annual",
    finalAmount: 750,
    students: ["STU007"],
    assignedBy: "Sports Director",
    assignedDate: "2024-01-15",
    status: "active",
    expiryDate: "2025-01-15",
    totalSavings: 750,
  },
  {
    id: 5,
    discountId: 6,
    discountName: "Alumni Children",
    discountType: "special",
    discountAmount: "15%",
    isPercent: true,
    feeId: 1,
    feeName: "Tuition Fee",
    feeAmount: 5000,
    feeFrequency: "Monthly",
    finalAmount: 4250,
    students: ["STU010"],
    assignedBy: "Admin User",
    assignedDate: "2024-01-05",
    status: "active",
    expiryDate: "2025-01-05",
    totalSavings: 750,
  },
  {
    id: 6,
    discountId: 4,
    discountName: "Financial Aid",
    discountType: "financial",
    discountAmount: "30%",
    isPercent: true,
    feeId: 1,
    feeName: "Tuition Fee",
    feeAmount: 5000,
    feeFrequency: "Monthly",
    finalAmount: 3500,
    students: ["STU008"],
    assignedBy: "Finance Manager",
    assignedDate: "2023-12-10",
    status: "active",
    expiryDate: "2024-12-10",
    totalSavings: 1500,
  },
  {
    id: 7,
    discountId: 1,
    discountName: "Merit Scholarship",
    discountType: "academic",
    discountAmount: "25%",
    isPercent: true,
    feeId: 6,
    feeName: "Computer Lab Fee",
    feeAmount: 2000,
    feeFrequency: "Monthly",
    finalAmount: 1500,
    students: ["STU001", "STU004"],
    assignedBy: "Admin User",
    assignedDate: "2023-11-15",
    status: "expired",
    expiryDate: "2024-02-15",
    totalSavings: 1000,
  },
  {
    id: 8,
    discountId: 2,
    discountName: "Early Payment Discount",
    discountType: "early",
    discountAmount: "$150",
    isPercent: false,
    feeId: 2,
    feeName: "Admission Fee",
    feeAmount: 10000,
    feeFrequency: "One-time",
    finalAmount: 9850,
    students: ["STU003", "STU005", "STU009"],
    assignedBy: "Finance Manager",
    assignedDate: "2023-10-20",
    status: "expired",
    expiryDate: "2024-01-20",
    totalSavings: 450,
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

// Get discount type color
const getDiscountTypeColor = (type: string) => {
  switch (type) {
    case "academic":
      return "primary"
    case "financial":
      return "warning"
    case "sibling":
      return "info"
    case "early":
      return "success"
    case "special":
      return "secondary"
    default:
      return "default"
  }
}

// Get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "success"
    case "expired":
      return "error"
    case "pending":
      return "warning"
    default:
      return "default"
  }
}

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

// MotionBox component for animations
const MotionBox = motion(Box)
const MotionPaper = motion(Paper)
const MotionCard = motion(Card)

// Animated number component

const AnimatedNumber: FC<AnimatedNumberProps> = ({ value }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 1000; 
    const frameDuration = 1000/60; 
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.floor(progress * value);
      
      if (frame === totalFrames) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(currentCount);
      }
    }, frameDuration);
    
    return () => clearInterval(counter);
  }, [value]);
  
  return <span>{count}</span>;
};

// Tab panel component
function TabPanel(props: { children: React.ReactNode; value: number; index: number }) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`discount-tabpanel-${index}`}
      aria-labelledby={`discount-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

export default function DiscountAssignmentListPage() {
  const [tabValue, setTabValue] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [discountTypeFilter, setDiscountTypeFilter] = useState("all")
  const [feeFilter, setFeeFilter] = useState("all")
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [openDetailsDrawer, setOpenDetailsDrawer] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null)
  const [bulkActionAnchorEl, setBulkActionAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"))
  const isSmall = useMediaQuery(muiTheme.breakpoints.down("sm"))

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, assignment: any) => {
    setAnchorEl(event.currentTarget)
    setSelectedAssignment(assignment)
  }

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // Handle export menu
  const handleExportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchorEl(event.currentTarget)
  }

  const handleExportMenuClose = () => {
    setExportAnchorEl(null)
  }

  // Handle bulk action menu
  const handleBulkActionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setBulkActionAnchorEl(event.currentTarget)
  }

  const handleBulkActionMenuClose = () => {
    setBulkActionAnchorEl(null)
  }

  // Handle view details
  const handleViewDetails = (assignment: any) => {
    setSelectedAssignment(assignment)
    setOpenDetailsDrawer(true)
    handleMenuClose()
  }

  // Handle delete dialog
  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true)
    handleMenuClose()
  }

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false)
  }

  // Handle delete assignment
  const handleDeleteAssignment = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setOpenDeleteDialog(false)
      setSnackbarMessage("Discount assignment deleted successfully!")
      setSnackbarSeverity("success")
      setOpenSnackbar(true)
    }, 1000)
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setBulkActionAnchorEl(null)
      setSelectedRows([])
      setSnackbarMessage(`${selectedRows.length} assignments deleted successfully!`)
      setSnackbarSeverity("success")
      setOpenSnackbar(true)
    }, 1000)
  }

  // Handle export
  const handleExport = (format: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setExportAnchorEl(null)
      setSnackbarMessage(`Exported successfully as ${format.toUpperCase()}!`)
      setSnackbarSeverity("success")
      setOpenSnackbar(true)
    }, 1000)
  }

  // Handle row expansion
  const handleRowExpand = (id: number) => {
    setExpandedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  // Filter assignments
  const filteredAssignments = useMemo(() => {
    return discountAssignments.filter((assignment) => {
      const matchesSearch =
        assignment.discountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.feeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.assignedBy.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || assignment.status === statusFilter
      const matchesType = discountTypeFilter === "all" || assignment.discountType === discountTypeFilter
      const matchesFee = feeFilter === "all" || assignment.feeId.toString() === feeFilter

      return matchesSearch && matchesStatus && matchesType && matchesFee
    })
  }, [searchTerm, statusFilter, discountTypeFilter, feeFilter])

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalAssignments = discountAssignments.length
    const activeAssignments = discountAssignments.filter((a) => a.status === "active").length
    const expiredAssignments = discountAssignments.filter((a) => a.status === "expired").length
    const totalStudents = new Set(discountAssignments.flatMap((a) => a.students)).size
    const totalSavings = discountAssignments.reduce((sum, a) => sum + a.totalSavings, 0)

    // Discount type distribution
    const discountTypeData = discountAssignments.reduce((acc: any[], assignment) => {
      const existingType = acc.find((item) => item.name === assignment.discountType)
      if (existingType) {
        existingType.value += 1
      } else {
        acc.push({
          name: assignment.discountType,
          value: 1,
          color:
            assignment.discountType === "academic"
              ? "#6366f1"
              : assignment.discountType === "financial"
                ? "#f59e0b"
                : assignment.discountType === "sibling"
                  ? "#3b82f6"
                  : assignment.discountType === "early"
                    ? "#10b981"
                    : "#ec4899",
        })
      }
      return acc
    }, [])

    // Fee type distribution
    const feeTypeData = discountAssignments.reduce((acc: any[], assignment) => {
      const existingType = acc.find((item) => item.name === assignment.feeName)
      if (existingType) {
        existingType.value += 1
      } else {
        acc.push({
          name: assignment.feeName,
          value: 1,
        })
      }
      return acc
    }, [])

    // Monthly savings
    const monthlySavingsData = [
      { name: "Jan", savings: 1200 },
      { name: "Feb", savings: 1500 },
      { name: "Mar", savings: 2200 },
      { name: "Apr", savings: 1800 },
      { name: "May", savings: 2500 },
      { name: "Jun", savings: 2100 },
    ]

    return {
      totalAssignments,
      activeAssignments,
      expiredAssignments,
      totalStudents,
      totalSavings,
      discountTypeData,
      feeTypeData,
      monthlySavingsData,
    }
  }, [])

  // Data grid columns
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "discountName",
      headerName: "Discount",
      width: 180,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Chip
            label={params.row.discountName}
            size="small"
            color={getDiscountTypeColor(params.row.discountType) as any}
            sx={{ mr: 1 }}
          />
          {params.row.status === "expired" && <Chip label="Expired" size="small" color="error" variant="outlined" />}
        </Box>
      ),
    },
    {
      field: "feeName",
      headerName: "Fee Type",
      width: 150,
    },
    {
      field: "discountAmount",
      headerName: "Discount Amount",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" fontWeight={500}>
          {params.row.discountAmount}
        </Typography>
      ),
    },
    {
      field: "finalAmount",
      headerName: "Final Amount",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" fontWeight={500} color="success.main">
          {formatCurrency(params.row.finalAmount)}
        </Typography>
      ),
    },
    {
      field: "students",
      headerName: "Students",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <AvatarGroup max={3} sx={{ "& .MuiAvatar-root": { width: 30, height: 30, fontSize: "0.875rem" } }}>
          {params.row.students.map((studentId: string) => {
            const student = students.find((s) => s.id === studentId)
            return (
              <Avatar key={studentId} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2), color: "primary.main" }}>
                {student?.avatar || "?"}
              </Avatar>
            )
          })}
        </AvatarGroup>
      ),
    },
    {
      field: "assignedDate",
      headerName: "Assigned Date",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">{formatDate(params.row.assignedDate)}</Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.row.status.charAt(0).toUpperCase() + params.row.status.slice(1)}
          size="small"
          color={getStatusColor(params.row.status) as any}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton size="small" onClick={() => handleViewDetails(params.row)}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => {
              setSelectedAssignment(params.row)
              handleDeleteDialogOpen()
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: 4,
          background: "linear-gradient(135deg, #f0f4ff 0%, #f9fafb 100%)",
        }}
      >
        <Container maxWidth="xl">
          <MotionBox initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" color="text.primary" gutterBottom>
                    Discount Assignments
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Manage all discount assignments in one place
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}
                >
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={handleExportMenuOpen}
                      aria-controls="export-menu"
                      aria-haspopup="true"
                    >
                      Export
                    </Button>
                    <Menu
                      id="export-menu"
                      anchorEl={exportAnchorEl}
                      open={Boolean(exportAnchorEl)}
                      onClose={handleExportMenuClose}
                    >
                      <MenuItem onClick={() => handleExport("pdf")}>
                        <ListItemIcon>
                          <DownloadIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Export as PDF</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => handleExport("excel")}>
                        <ListItemIcon>
                          <DownloadIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Export as Excel</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => handleExport("csv")}>
                        <ListItemIcon>
                          <DownloadIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Export as CSV</ListItemText>
                      </MenuItem>
                    </Menu>
                    <Button variant="contained" startIcon={<AddIcon />} href="/dashboard/super_admin/assign-discount/add">
                      New Assignment
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </MotionBox>

          <Grid container spacing={3}>
            <Grid item xs={12} lg={9}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <CardHeader
                  title={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AssignmentIcon sx={{ mr: 1 }} />
                      <Typography variant="h6">Discount Assignments</Typography>
                    </Box>
                  }
                  action={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {selectedRows.length > 0 && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<DeleteIcon />}
                          color="error"
                          onClick={handleBulkActionMenuOpen}
                          sx={{ mr: 1 }}
                        >
                          Bulk Actions ({selectedRows.length})
                        </Button>
                      )}
                      <Menu
                        id="bulk-action-menu"
                        anchorEl={bulkActionAnchorEl}
                        open={Boolean(bulkActionAnchorEl)}
                        onClose={handleBulkActionMenuClose}
                      >
                        <MenuItem onClick={handleBulkDelete}>
                          <ListItemIcon>
                            <DeleteIcon fontSize="small" color="error" />
                          </ListItemIcon>
                          <ListItemText>Delete Selected</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleBulkActionMenuClose}>
                          <ListItemIcon>
                            <ArchiveIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Archive Selected</ListItemText>
                        </MenuItem>
                      </Menu>
                      <IconButton onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}>
                        {viewMode === "grid" ? <ViewModule /> : <ViewModule />}
                      </IconButton>
                      <IconButton>
                        <RefreshIcon />
                      </IconButton>
                    </Box>
                  }
                />
                <CardContent>
                  <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel htmlFor="search-discount">Search</InputLabel>
                          <OutlinedInput
                            id="search-discount"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            startAdornment={
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            }
                            label="Search"
                            placeholder="Search by discount, fee or assignee..."
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4} md={2}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Status</InputLabel>
                          <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                            <MenuItem value="all">All Status</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="expired">Expired</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4} md={2}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Discount Type</InputLabel>
                          <Select
                            value={discountTypeFilter}
                            label="Discount Type"
                            onChange={(e) => setDiscountTypeFilter(e.target.value)}
                          >
                            <MenuItem value="all">All Types</MenuItem>
                            <MenuItem value="academic">Academic</MenuItem>
                            <MenuItem value="financial">Financial</MenuItem>
                            <MenuItem value="sibling">Sibling</MenuItem>
                            <MenuItem value="early">Early Payment</MenuItem>
                            <MenuItem value="special">Special</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4} md={2}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Fee Type</InputLabel>
                          <Select value={feeFilter} label="Fee Type" onChange={(e) => setFeeFilter(e.target.value)}>
                            <MenuItem value="all">All Fees</MenuItem>
                            {fees.map((fee) => (
                              <MenuItem key={fee.id} value={fee.id.toString()}>
                                {fee.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>

                  {viewMode === "table" ? (
  <Box sx={{ height: 500, width: "100%" }}>
    <DataGrid
      rows={filteredAssignments}
      columns={columns}
      checkboxSelection
      disableRowSelectionOnClick
      onRowSelectionModelChange={(newSelection) => {
        setSelectedRows(newSelection as number[])
      }}
      rowSelectionModel={selectedRows}
      slots={{
        toolbar: GridToolbar,
      }}
    />
  </Box>
                  ) : (
                    <Grid container spacing={2}>
                      {filteredAssignments.map((assignment) => (
                        <Grid item xs={12} sm={6} md={4} key={assignment.id}>
                          <MotionPaper
                            whileHover={{ y: -4, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                            transition={{ duration: 0.2 }}
                            sx={{
                              p: 2,
                              borderRadius: 3,
                              position: "relative",
                              overflow: "hidden",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {assignment.status === "expired" && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 12,
                                  right: -30,
                                  transform: "rotate(45deg)",
                                  bgcolor: "error.main",
                                  color: "white",
                                  py: 0.5,
                                  px: 3,
                                  width: 120,
                                  textAlign: "center",
                                  fontSize: "0.75rem",
                                  fontWeight: 600,
                                }}
                              >
                                EXPIRED
                              </Box>
                            )}
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Avatar
                                  sx={{
                                    bgcolor: alpha(
                                      theme.palette[getDiscountTypeColor(assignment.discountType) as "primary"].main,
                                      0.2,
                                    ),
                                    color:
                                      theme.palette[getDiscountTypeColor(assignment.discountType) as "primary"].main,
                                    mr: 1.5,
                                  }}
                                >
                                  <DiscountIcon />
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle1" fontWeight={600}>
                                    {assignment.discountName}
                                  </Typography>
                                  <Chip
                                    label={
                                      assignment.discountType.charAt(0).toUpperCase() + assignment.discountType.slice(1)
                                    }
                                    size="small"
                                    color={getDiscountTypeColor(assignment.discountType) as any}
                                    sx={{ mt: 0.5 }}
                                  />
                                </Box>
                              </Box>
                              <IconButton
                                size="small"
                                onClick={(e) => handleMenuOpen(e, assignment)}
                                aria-label="more options"
                              >
                                <MoreVertIcon fontSize="small" />
                              </IconButton>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ mb: 2, flex: 1 }}>
                              <Grid container spacing={1}>
                                <Grid item xs={6}>
                                  <Typography variant="caption" color="text.secondary">
                                    Applied To:
                                  </Typography>
                                  <Typography variant="body2" fontWeight={500}>
                                    {assignment.feeName}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="caption" color="text.secondary">
                                    Discount:
                                  </Typography>
                                  <Typography variant="body2" fontWeight={500} color="error.main">
                                    {assignment.discountAmount}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="caption" color="text.secondary">
                                    Final Amount:
                                  </Typography>
                                  <Typography variant="body2" fontWeight={500} color="success.main">
                                    {formatCurrency(assignment.finalAmount)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="caption" color="text.secondary">
                                    Assigned:
                                  </Typography>
                                  <Typography variant="body2" fontWeight={500}>
                                    {formatDate(assignment.assignedDate)}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="caption" color="text.secondary">
                                Students:
                              </Typography>
                              <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                                <AvatarGroup
                                  max={3}
                                  sx={{ "& .MuiAvatar-root": { width: 30, height: 30, fontSize: "0.875rem" } }}
                                >
                                  {assignment.students.map((studentId: string) => {
                                    const student = students.find((s) => s.id === studentId)
                                    return (
                                      <Avatar
                                        key={studentId}
                                        sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2), color: "primary.main" }}
                                      >
                                        {student?.avatar || "?"}
                                      </Avatar>
                                    )
                                  })}
                                </AvatarGroup>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                  {assignment.students.length} student{assignment.students.length !== 1 ? "s" : ""}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                              <Button
                                size="small"
                                startIcon={<VisibilityIcon />}
                                onClick={() => handleViewDetails(assignment)}
                              >
                                Details
                              </Button>
                            </Box>
                          </MotionPaper>
                        </Grid>
                      ))}
                      {filteredAssignments.length === 0 && (
                        <Grid item xs={12}>
                          <Paper sx={{ p: 3, textAlign: "center" }}>
                            <AssignmentIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
                            <Typography variant="subtitle1" color="text.secondary">
                              No discount assignments found matching your criteria
                            </Typography>
                            <Button
                              variant="text"
                              onClick={() => {
                                setSearchTerm("")
                                setStatusFilter("all")
                                setDiscountTypeFilter("all")
                                setFeeFilter("all")
                              }}
                              sx={{ mt: 1 }}
                            >
                              Reset Filters
                            </Button>
                          </Paper>
                        </Grid>
                      )}
                    </Grid>
                  )}
                </CardContent>
              </MotionCard>
            </Grid>

            <Grid item xs={12} lg={3}>
              <Stack spacing={3}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <CardHeader title="Summary" />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            borderRadius: 2,
                            height: "100%",
                          }}
                        >
                          <Typography variant="caption" color="primary.main" fontWeight={600}>
                            Total Assignments
                          </Typography>
                         {/* In your statistics display component */}
<Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
  <AnimatedNumber value={statistics.totalAssignments} />
</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: alpha(theme.palette.success.main, 0.1),
                            borderRadius: 2,
                            height: "100%",
                          }}
                        >
                          <Typography variant="caption" color="success.main" fontWeight={600}>
                            Active
                          </Typography>
                          <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                            <AnimatedNumber value={statistics.activeAssignments} />
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: alpha(theme.palette.info.main, 0.1),
                            borderRadius: 2,
                            height: "100%",
                          }}
                        >
                          <Typography variant="caption" color="info.main" fontWeight={600}>
                            Students Benefited
                          </Typography>
                          <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                            <AnimatedNumber value={statistics.totalStudents} />
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: alpha(theme.palette.warning.main, 0.1),
                            borderRadius: 2,
                            height: "100%",
                          }}
                        >
                          <Typography variant="caption" color="warning.main" fontWeight={600}>
                            Total Savings
                          </Typography>
                          <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                            {formatCurrency(statistics.totalSavings)}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </CardContent>
                </MotionCard>

                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <CardHeader title="Discount Distribution" />
                  <CardContent>
                    <Box sx={{ height: 200, display: "flex", justifyContent: "center" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statistics.discountTypeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          >
                            {statistics.discountTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </MotionCard>

                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <CardHeader title="Monthly Savings" />
                  <CardContent>
                    <Box sx={{ height: 200 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statistics.monthlySavingsData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <RechartsTooltip formatter={(value) => formatCurrency(value as number)} />
                          <Bar dataKey="savings" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Stack>
            </Grid>
          </Grid>
        </Container>

        {/* Assignment Details Drawer */}
        <Drawer
          anchor="right"
          open={openDetailsDrawer}
          onClose={() => setOpenDetailsDrawer(false)}
          PaperProps={{
            sx: { width: { xs: "100%", sm: 450 }, p: 3 },
          }}
        >
          {selectedAssignment && (
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6">Assignment Details</Typography>
                <IconButton onClick={() => setOpenDetailsDrawer(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: alpha(
                      theme.palette[getDiscountTypeColor(selectedAssignment.discountType) as "primary"].main,
                      0.2,
                    ),
                    color: theme.palette[getDiscountTypeColor(selectedAssignment.discountType) as "primary"].main,
                    mr: 2,
                  }}
                >
                  <DiscountIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedAssignment.discountName}</Typography>
                  <Chip
                    label={
                      selectedAssignment.discountType.charAt(0).toUpperCase() + selectedAssignment.discountType.slice(1)
                    }
                    size="small"
                    color={getDiscountTypeColor(selectedAssignment.discountType) as any}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <List disablePadding>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon>
                    <MoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Fee Type" secondary={selectedAssignment.feeName} />
                </ListItem>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon>
                    <DiscountIcon />
                  </ListItemIcon>
                  <ListItemText primary="Discount Amount" secondary={selectedAssignment.discountAmount} />
                </ListItem>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon>
                    <MoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Final Amount" secondary={formatCurrency(selectedAssignment.finalAmount)} />
                </ListItem>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Assigned Date" secondary={formatDate(selectedAssignment.assignedDate)} />
                </ListItem>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Expiry Date" secondary={formatDate(selectedAssignment.expiryDate)} />
                </ListItem>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Assigned By" secondary={selectedAssignment.assignedBy} />
                </ListItem>
              </List>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle2" gutterBottom>
                Students ({selectedAssignment.students.length})
              </Typography>
              <List disablePadding>
                {selectedAssignment.students.map((studentId: string) => {
                  const student = students.find((s) => s.id === studentId)
                  if (!student) return null
                  return (
                    <ListItem key={studentId} disablePadding sx={{ py: 1 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2), color: "primary.main" }}>
                          {student.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={student.name}
                        secondary={`${student.class} ${student.section} • ${student.rollNumber}`}
                      />
                    </ListItem>
                  )
                })}
              </List>

              <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
                <Button variant="outlined" fullWidth startIcon={<EditIcon />}>
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteDialogOpen}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          )}
        </Drawer>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleDeleteDialogClose}
          PaperProps={{
            sx: { borderRadius: 3 },
          }}
        >
          <DialogTitle>Delete Discount Assignment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this discount assignment? This action cannot be undone and will remove the
              discount from all associated students.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>Cancel</Button>
            <Button
              onClick={handleDeleteAssignment}
              variant="contained"
              color="error"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : <DeleteIcon />}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: { width: 200, maxWidth: "100%", mt: 1 },
          }}
        >
          <MenuItem onClick={() => handleViewDetails(selectedAssignment)}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View Details</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <NotificationsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Send Notification</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <PrintIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Print</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDeleteDialogOpen} sx={{ color: "error.main" }}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>

        {/* Success Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  )
}
