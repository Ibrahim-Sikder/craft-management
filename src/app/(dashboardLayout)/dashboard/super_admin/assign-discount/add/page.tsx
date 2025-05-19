/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState, useMemo } from "react"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
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
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  TextField,
  Typography,
  Zoom,
  useMediaQuery,
  Alert,
} from "@mui/material"
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  AssignmentTurnedIn as AssignmentIcon,
  AttachMoney as MoneyIcon,
  AutoAwesome as MagicIcon,
  Calculate as CalculateIcon,
  CheckCircle as CheckCircleIcon,
  Class as ClassIcon,
  Close as CloseIcon,
  CreditCard as CardIcon,
  FilterList as FilterIcon,
  Groups as GroupsIcon,
  Help as HelpIcon,
  Info as InfoIcon,
  LocalOffer as DiscountIcon,
  Person as PersonIcon,
  Receipt as ReceiptIcon,
  School as SchoolIcon,
  Search as SearchIcon,
  Star as StarIcon,
  Visibility as VisibilityIcon,
  Sort as SortIcon, // Added SortIcon import
} from "@mui/icons-material"
import { ThemeProvider, createTheme, alpha, useTheme } from "@mui/material/styles"
import { motion, AnimatePresence } from "framer-motion"
import { useSpring, animated } from "react-spring"

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

// Sample data for sessions
const sessions = [
  { id: 1, name: "2023-2024", current: false },
  { id: 2, name: "2024-2025", current: true },
  { id: 3, name: "2025-2026", current: false },
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

// Sample data for batches
const batches = [
  { id: 1, name: "Morning", time: "8:00 AM - 12:00 PM" },
  { id: 2, name: "Afternoon", time: "1:00 PM - 5:00 PM" },
  { id: 3, name: "Evening", time: "6:00 PM - 9:00 PM" },
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

// Sample data for discounts
const discounts = [
  {
    id: 1,
    name: "Merit Scholarship",
    type: "academic",
    amount: "25%",
    isPercent: true,
    description: "For students with exceptional academic performance",
    icon: <StarIcon />,
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
    icon: <CardIcon />,
    color: "#f59e0b",
  },
  {
    id: 5,
    name: "Sports Excellence",
    type: "academic",
    amount: "50%",
    isPercent: true,
    description: "For students with outstanding sports achievements",
    icon: <StarIcon />,
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

// Sample data for students
const students = [
  {
    id: "STU001",
    name: "Ahmed Ali",
    fatherName: "Ali Hassan",
    studentMobile: "+92 300 1234567",
    parentMobile: "+92 300 7654321",
    class: "Class 1",
    section: "A",
    batch: "Morning",
    avatar: "A",
    fees: [1, 3, 4],
    discounts: [],
    gender: "Male",
    rollNumber: "C1A-001",
    admissionDate: "2023-04-15",
    attendance: 92,
    performance: 85,
  },
  {
    id: "STU002",
    name: "Fatima Khan",
    fatherName: "Imran Khan",
    studentMobile: "+92 301 1234567",
    parentMobile: "+92 301 7654321",
    class: "Class 1",
    section: "A",
    batch: "Morning",
    avatar: "F",
    fees: [1, 3, 4, 5],
    discounts: [],
    gender: "Female",
    rollNumber: "C1A-002",
    admissionDate: "2023-04-10",
    attendance: 95,
    performance: 90,
  },
  {
    id: "STU003",
    name: "Muhammad Usman",
    fatherName: "Usman Ahmed",
    studentMobile: "+92 302 1234567",
    parentMobile: "+92 302 7654321",
    class: "Class 1",
    section: "A",
    batch: "Morning",
    avatar: "M",
    fees: [1, 3, 4, 6],
    discounts: [],
    gender: "Male",
    rollNumber: "C1A-003",
    admissionDate: "2023-03-25",
    attendance: 88,
    performance: 78,
  },
  {
    id: "STU004",
    name: "Ayesha Malik",
    fatherName: "Malik Riaz",
    studentMobile: "+92 303 1234567",
    parentMobile: "+92 303 7654321",
    class: "Class 1",
    section: "A",
    batch: "Morning",
    avatar: "A",
    fees: [1, 3, 4, 7],
    discounts: [],
    gender: "Female",
    rollNumber: "C1A-004",
    admissionDate: "2023-04-05",
    attendance: 97,
    performance: 95,
  },
  {
    id: "STU005",
    name: "Hassan Ahmed",
    fatherName: "Ahmed Khan",
    studentMobile: "+92 304 1234567",
    parentMobile: "+92 304 7654321",
    class: "Class 1",
    section: "A",
    batch: "Morning",
    avatar: "H",
    fees: [1, 3, 4],
    discounts: [],
    gender: "Male",
    rollNumber: "C1A-005",
    admissionDate: "2023-03-20",
    attendance: 90,
    performance: 82,
  },
  {
    id: "STU006",
    name: "Zainab Fatima",
    fatherName: "Fatima Javed",
    studentMobile: "+92 305 1234567",
    parentMobile: "+92 305 7654321",
    class: "Class 1",
    section: "B",
    batch: "Afternoon",
    avatar: "Z",
    fees: [1, 3, 4, 5],
    discounts: [],
    gender: "Female",
    rollNumber: "C1B-001",
    admissionDate: "2023-04-12",
    attendance: 93,
    performance: 88,
  },
  {
    id: "STU007",
    name: "Ali Raza",
    fatherName: "Raza Ali",
    studentMobile: "+92 306 1234567",
    parentMobile: "+92 306 7654321",
    class: "Class 1",
    section: "B",
    batch: "Afternoon",
    avatar: "A",
    fees: [1, 3, 4, 6],
    discounts: [],
    gender: "Male",
    rollNumber: "C1B-002",
    admissionDate: "2023-03-28",
    attendance: 85,
    performance: 75,
  },
  {
    id: "STU008",
    name: "Sana Javed",
    fatherName: "Javed Iqbal",
    studentMobile: "+92 307 1234567",
    parentMobile: "+92 307 7654321",
    class: "Class 1",
    section: "B",
    batch: "Afternoon",
    avatar: "S",
    fees: [1, 3, 4, 7],
    discounts: [],
    gender: "Female",
    rollNumber: "C1B-003",
    admissionDate: "2023-04-02",
    attendance: 91,
    performance: 86,
  },
  {
    id: "STU009",
    name: "Bilal Khan",
    fatherName: "Khan Muhammad",
    studentMobile: "+92 308 1234567",
    parentMobile: "+92 308 7654321",
    class: "Class 2",
    section: "A",
    batch: "Morning",
    avatar: "B",
    fees: [1, 3, 4],
    discounts: [],
    gender: "Male",
    rollNumber: "C2A-001",
    admissionDate: "2022-04-10",
    attendance: 89,
    performance: 80,
  },
  {
    id: "STU010",
    name: "Hina Shahid",
    fatherName: "Shahid Mahmood",
    studentMobile: "+92 309 1234567",
    parentMobile: "+92 309 7654321",
    class: "Class 2",
    section: "A",
    batch: "Morning",
    avatar: "H",
    fees: [1, 3, 4, 5],
    discounts: [],
    gender: "Female",
    rollNumber: "C2A-002",
    admissionDate: "2022-04-05",
    attendance: 94,
    performance: 92,
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

// Get performance color
const getPerformanceColor = (performance: number) => {
  if (performance >= 90) return "#10b981" // success
  if (performance >= 80) return "#3b82f6" // info
  if (performance >= 70) return "#f59e0b" // warning
  return "#ef4444" // error
}

// Get attendance color
const getAttendanceColor = (attendance: number) => {
  if (attendance >= 90) return "#10b981" // success
  if (attendance >= 80) return "#3b82f6" // info
  if (attendance >= 70) return "#f59e0b" // warning
  return "#ef4444" // error
}

// MotionBox component for animations
const MotionBox = motion(Box)
const MotionPaper = motion(Paper)
const MotionCard = motion(Card)

// Animated number component
// const AnimatedNumber = ({ value }: { value: number }) => {
//   const { number } = useSpring({
//     from: { number: 0 },
//     number: value,
//     delay: 200,
//     config: { mass: 1, tension: 20, friction: 10 },
//   })

//   return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
// }

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

export default function AssignDiscountNewPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [tabValue, setTabValue] = useState(0)
  const [selectedSession, setSelectedSession] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedBatch, setSelectedBatch] = useState("")
  const [selectedFee, setSelectedFee] = useState("")
  const [selectedDiscount, setSelectedDiscount] = useState("")
  const [customDiscountAmount, setCustomDiscountAmount] = useState("")
  const [isCustomAmount, setIsCustomAmount] = useState(false)
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [selectedStudentDetails, setSelectedStudentDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success")
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [openStudentDrawer, setOpenStudentDrawer] = useState(false)
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [sortAnchorEl, setFilterSortEl] = useState<null | HTMLElement>(null)
  const [sortBy, setSortBy] = useState<"name" | "id" | "performance" | "attendance">("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [filterGender, setFilterGender] = useState<"all" | "Male" | "Female">("all")
  const [filterPerformance, setFilterPerformance] = useState<number[]>([0, 100])
  const [filterAttendance, setFilterAttendance] = useState<number[]>([0, 100])
  const [isRecommending, setIsRecommending] = useState(false)
  const [recommendationReason, setRecommendationReason] = useState("")

  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"))
  const isSmall = useMediaQuery(muiTheme.breakpoints.down("sm"))

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    let filtered = [...students]

    // Apply class filter
    if (selectedClass) {
      const classObj = classes.find((c) => c.id.toString() === selectedClass)
      if (classObj) {
        filtered = filtered.filter((student) => student.class === classObj.name && student.section === classObj.section)
      }
    }

    // Apply batch filter
    if (selectedBatch) {
      const batchObj = batches.find((b) => b.id.toString() === selectedBatch)
      if (batchObj) {
        filtered = filtered.filter((student) => student.batch === batchObj.name)
      }
    }

    // Apply fee filter
    if (selectedFee) {
      const feeId = Number.parseInt(selectedFee)
      filtered = filtered.filter((student) => student.fees.includes(feeId))
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply gender filter
    if (filterGender !== "all") {
      filtered = filtered.filter((student) => student.gender === filterGender)
    }

    // Apply performance filter
    filtered = filtered.filter(
      (student) => student.performance >= filterPerformance[0] && student.performance <= filterPerformance[1],
    )

    // Apply attendance filter
    filtered = filtered.filter(
      (student) => student.attendance >= filterAttendance[0] && student.attendance <= filterAttendance[1],
    )

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "id":
          comparison = a.id.localeCompare(b.id)
          break
        case "performance":
          comparison = a.performance - b.performance
          break
        case "attendance":
          comparison = a.attendance - b.attendance
          break
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    return filtered
  }, [
    selectedClass,
    selectedBatch,
    selectedFee,
    searchTerm,
    filterGender,
    filterPerformance,
    filterAttendance,
    sortBy,
    sortOrder,
  ])

  // Handle select all checkbox
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredStudents.map((student) => student.id)
      setSelectedStudents(newSelected)
    } else {
      setSelectedStudents([])
    }
  }

  // Handle single student selection
  const handleSelectStudent = (id: string) => {
    const selectedIndex = selectedStudents.indexOf(id)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = [...selectedStudents, id]
    } else {
      newSelected = selectedStudents.filter((studentId) => studentId !== id)
    }

    setSelectedStudents(newSelected)
  }

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Handle next step
  const handleNext = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setActiveStep((prevStep) => prevStep + 1)
    }, 800)
  }

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  // Handle save
  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSaved(true)
      setSnackbarMessage("Discount assigned successfully!")
      setSnackbarSeverity("success")
      setOpenSnackbar(true)

      // Reset saved status after 3 seconds
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }, 1500)
  }

  // Handle student details
  const handleViewStudentDetails = (student: any) => {
    setSelectedStudentDetails(student)
    setOpenStudentDrawer(true)
  }

  // Handle filter menu
  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null)
  }

  // Handle sort menu
  const handleSortMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterSortEl(event.currentTarget)
  }

  const handleSortMenuClose = () => {
    setFilterSortEl(null)
  }

  // Handle reset filters
  const handleResetFilters = () => {
    setFilterGender("all")
    setFilterPerformance([0, 100])
    setFilterAttendance([0, 100])
    setSortBy("name")
    setSortOrder("asc")
    setSearchTerm("")
    handleFilterMenuClose()
  }

  // Handle AI recommendation
  const handleRecommendDiscount = () => {
    setIsRecommending(true)

    // Simulate AI processing
    setTimeout(() => {
      // Find the student with the highest performance
      const highestPerformanceStudent = students.reduce((prev, current) => {
        return prev.performance > current.performance ? prev : current
      })

      // Recommend Merit Scholarship for high performers
      setSelectedDiscount("1") // Merit Scholarship
      setSelectedStudents([highestPerformanceStudent.id])
      setRecommendationReason(
        `Based on academic performance analysis, ${highestPerformanceStudent.name} has the highest performance score (${highestPerformanceStudent.performance}%) in the class. A Merit Scholarship is recommended to reward academic excellence.`,
      )
      setIsRecommending(false)

      // Show success message
      setSnackbarMessage("AI recommendation generated!")
      setSnackbarSeverity("success")
      setOpenSnackbar(true)
    }, 2000)
  }

  // Get selected discount details
  const getSelectedDiscountDetails = () => {
    return discounts.find((d) => d.id.toString() === selectedDiscount)
  }

  // Get selected fee details
  const getSelectedFeeDetails = () => {
    return fees.find((f) => f.id.toString() === selectedFee)
  }

  // Calculate discount amount
  const calculateDiscountAmount = (feeAmount: number) => {
    if (isCustomAmount && customDiscountAmount) {
      if (discountType === "percentage") {
        const percentValue = Number.parseFloat(customDiscountAmount)
        return (feeAmount * percentValue) / 100
      } else {
        return Number.parseFloat(customDiscountAmount)
      }
    }

    const discount = getSelectedDiscountDetails()
    if (!discount) return 0

    if (discount.isPercent) {
      const percentValue = Number.parseFloat(discount.amount.replace("%", ""))
      return (feeAmount * percentValue) / 100
    } else {
      const amountValue = Number.parseFloat(discount.amount.replace("$", ""))
      return amountValue
    }
  }

  // Calculate total discount value
  const calculateTotalDiscountValue = () => {
    const feeAmount = getSelectedFeeDetails()?.amount || 0
    const discountPerStudent = calculateDiscountAmount(feeAmount)
    return discountPerStudent * selectedStudents.length
  }

  // Check if step is complete
  const isStepComplete = (step: number) => {
    switch (step) {
      case 0: // Select discount and fee
        return selectedDiscount !== "" && selectedFee !== ""
      case 1: // Select students
        return selectedStudents.length > 0
      case 2: // Review and confirm
        return true
      default:
        return false
    }
  }

  // Get step content
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Discount and Fee
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Choose the discount type and fee to which it will be applied
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
                >
                  <Tab icon={<DiscountIcon />} label="Existing Discounts" iconPosition="start" sx={{ minHeight: 64 }} />
                  <Tab icon={<AddIcon />} label="Custom Discount" iconPosition="start" sx={{ minHeight: 64 }} />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <Grid container spacing={2}>
                    {discounts.map((discount) => (
                      <Grid item xs={12} sm={6} md={4} key={discount.id}>
                        <MotionPaper
                          whileHover={{ y: -4, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                          transition={{ duration: 0.2 }}
                          elevation={selectedDiscount === discount.id.toString() ? 4 : 1}
                          sx={{
                            p: 2,
                            border: "2px solid",
                            borderColor: selectedDiscount === discount.id.toString() ? "primary.main" : "transparent",
                            borderRadius: 3,
                            cursor: "pointer",
                            height: "100%",
                            position: "relative",
                            overflow: "hidden",
                          }}
                          onClick={() => setSelectedDiscount(discount.id.toString())}
                        >
                          {selectedDiscount === discount.id.toString() && (
                            <Box
                              sx={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                bgcolor: "primary.main",
                                color: "white",
                                borderRadius: "50%",
                                width: 24,
                                height: 24,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <CheckCircleIcon fontSize="small" />
                            </Box>
                          )}
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Avatar
                              sx={{
                                bgcolor: alpha(discount.color, 0.2),
                                color: discount.color,
                                mr: 1.5,
                              }}
                            >
                              {discount.icon}
                            </Avatar>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {discount.name}
                            </Typography>
                          </Box>
                          <Box sx={{ mb: 1 }}>
                            <Chip
                              label={discount.type.charAt(0).toUpperCase() + discount.type.slice(1)}
                              size="small"
                              color={getDiscountTypeColor(discount.type) as any}
                              sx={{ mb: 1 }}
                            />
                            <Typography variant="h5" fontWeight={700} color="primary.main">
                              {discount.amount}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {discount.description}
                          </Typography>
                        </MotionPaper>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Create Custom Discount
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Discount Name"
                          placeholder="e.g., Special Scholarship"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Discount Type</InputLabel>
                          <Select
                            value={discountType}
                            label="Discount Type"
                            onChange={(e) => setDiscountType(e.target.value as "percentage" | "fixed")}
                          >
                            <MenuItem value="percentage">Percentage (%)</MenuItem>
                            <MenuItem value="fixed">Fixed Amount ($)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={discountType === "percentage" ? "Percentage Value" : "Fixed Amount"}
                          placeholder={discountType === "percentage" ? "e.g., 15" : "e.g., 500"}
                          variant="outlined"
                          type="number"
                          value={customDiscountAmount}
                          onChange={(e) => setCustomDiscountAmount(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {discountType === "percentage" ? "%" : "$"}
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Discount Reason</InputLabel>
                          <Select defaultValue="special">
                            <MenuItem value="academic">Academic Merit</MenuItem>
                            <MenuItem value="financial">Financial Aid</MenuItem>
                            <MenuItem value="sibling">Sibling Discount</MenuItem>
                            <MenuItem value="special">Special Consideration</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Description"
                          placeholder="Provide details about this custom discount"
                          multiline
                          rows={3}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setIsCustomAmount(true)
                            setSnackbarMessage("Custom discount created!")
                            setSnackbarSeverity("success")
                            setOpenSnackbar(true)
                          }}
                          disabled={!customDiscountAmount}
                        >
                          Create Custom Discount
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </TabPanel>
              </Grid>

              <Grid item xs={12}>
                <Divider>
                  <Chip label="Select Fee" />
                </Divider>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="fee-select-label">Select Fee</InputLabel>
                  <Select
                    labelId="fee-select-label"
                    id="fee-select"
                    value={selectedFee}
                    label="Select Fee"
                    onChange={(e) => setSelectedFee(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <MoneyIcon fontSize="small" />
                      </InputAdornment>
                    }
                    required
                  >
                    <MenuItem value="">
                      <em>Select Fee Type</em>
                    </MenuItem>
                    {fees.map((fee) => (
                      <MenuItem key={fee.id} value={fee.id.toString()}>
                        {fee.name} ({formatCurrency(fee.amount)} - {fee.frequency})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {selectedFee && selectedDiscount && (
                <Grid item xs={12}>
                  <MotionPaper
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    sx={{
                      p: 3,
                      mt: 2,
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      border: "1px solid",
                      borderColor: "success.light",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography variant="subtitle1" color="success.main" gutterBottom>
                          Discount Preview
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {isCustomAmount
                            ? `Custom discount of ${
                                discountType === "percentage"
                                  ? `${customDiscountAmount}%`
                                  : formatCurrency(Number(customDiscountAmount))
                              }`
                            : getSelectedDiscountDetails()?.name}{" "}
                          will be applied to {getSelectedFeeDetails()?.name}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="body2" color="text.secondary">
                          Original Fee:
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {formatCurrency(getSelectedFeeDetails()?.amount || 0)}
                        </Typography>
                        <Typography variant="body2" color="error.main" sx={{ mt: 1 }}>
                          Discount: -{formatCurrency(calculateDiscountAmount(getSelectedFeeDetails()?.amount || 0))}
                        </Typography>
                        <Typography variant="body2" color="success.main" fontWeight={600}>
                          Final Fee:{" "}
                          {formatCurrency(
                            (getSelectedFeeDetails()?.amount || 0) -
                              calculateDiscountAmount(getSelectedFeeDetails()?.amount || 0),
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </MotionPaper>
                </Grid>
              )}
            </Grid>
          </Box>
        )
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Students
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Choose the students who will receive this discount
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  placeholder="Search students by name, ID, roll number or father's name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={handleFilterMenuOpen}
                  sx={{ height: "100%" }}
                >
                  Filter
                </Button>
                <Menu
                  anchorEl={filterAnchorEl}
                  open={Boolean(filterAnchorEl)}
                  onClose={handleFilterMenuClose}
                  PaperProps={{
                    sx: { width: 300, maxWidth: "100%", mt: 1.5, p: 2 },
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Filters
                  </Typography>
                  <Divider sx={{ my: 1 }} />

                  <Typography variant="body2" gutterBottom>
                    Gender
                  </Typography>
                  <RadioGroup
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value as "all" | "Male" | "Female")}
                    row
                  >
                    <FormControlLabel value="all" control={<Radio size="small" />} label="All" />
                    <FormControlLabel value="Male" control={<Radio size="small" />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio size="small" />} label="Female" />
                  </RadioGroup>

                  <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
                    Performance
                  </Typography>
                  <Slider
                    value={filterPerformance}
                    onChange={(e, newValue) => setFilterPerformance(newValue as number[])}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    sx={{ mt: 2 }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption" color="text.secondary">
                      Min: {filterPerformance[0]}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Max: {filterPerformance[1]}%
                    </Typography>
                  </Box>

                  <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
                    Attendance
                  </Typography>
                  <Slider
                    value={filterAttendance}
                    onChange={(e, newValue) => setFilterAttendance(newValue as number[])}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    sx={{ mt: 2 }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption" color="text.secondary">
                      Min: {filterAttendance[0]}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Max: {filterAttendance[1]}%
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button size="small" onClick={handleResetFilters} sx={{ mr: 1 }}>
                      Reset
                    </Button>
                    <Button size="small" variant="contained" onClick={handleFilterMenuClose}>
                      Apply
                    </Button>
                  </Box>
                </Menu>
              </Grid>
              <Grid item xs={6} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<SortIcon />}
                  onClick={handleSortMenuOpen}
                  sx={{ height: "100%" }}
                >
                  Sort
                </Button>
                <Menu
                  anchorEl={sortAnchorEl}
                  open={Boolean(sortAnchorEl)}
                  onClose={handleSortMenuClose}
                  PaperProps={{
                    sx: { width: 200, maxWidth: "100%", mt: 1.5 },
                  }}
                >
                  <MenuItem
                    selected={sortBy === "name" && sortOrder === "asc"}
                    onClick={() => {
                      setSortBy("name")
                      setSortOrder("asc")
                      handleSortMenuClose()
                    }}
                  >
                    Name (A-Z)
                  </MenuItem>
                  <MenuItem
                    selected={sortBy === "name" && sortOrder === "desc"}
                    onClick={() => {
                      setSortBy("name")
                      setSortOrder("desc")
                      handleSortMenuClose()
                    }}
                  >
                    Name (Z-A)
                  </MenuItem>
                  <MenuItem
                    selected={sortBy === "id" && sortOrder === "asc"}
                    onClick={() => {
                      setSortBy("id")
                      setSortOrder("asc")
                      handleSortMenuClose()
                    }}
                  >
                    ID (Ascending)
                  </MenuItem>
                  <MenuItem
                    selected={sortBy === "id" && sortOrder === "desc"}
                    onClick={() => {
                      setSortBy("id")
                      setSortOrder("desc")
                      handleSortMenuClose()
                    }}
                  >
                    ID (Descending)
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    selected={sortBy === "performance" && sortOrder === "desc"}
                    onClick={() => {
                      setSortBy("performance")
                      setSortOrder("desc")
                      handleSortMenuClose()
                    }}
                  >
                    Performance (High to Low)
                  </MenuItem>
                  <MenuItem
                    selected={sortBy === "performance" && sortOrder === "asc"}
                    onClick={() => {
                      setSortBy("performance")
                      setSortOrder("asc")
                      handleSortMenuClose()
                    }}
                  >
                    Performance (Low to High)
                  </MenuItem>
                  <MenuItem
                    selected={sortBy === "attendance" && sortOrder === "desc"}
                    onClick={() => {
                      setSortBy("attendance")
                      setSortOrder("desc")
                      handleSortMenuClose()
                    }}
                  >
                    Attendance (High to Low)
                  </MenuItem>
                  <MenuItem
                    selected={sortBy === "attendance" && sortOrder === "asc"}
                    onClick={() => {
                      setSortBy("attendance")
                      setSortOrder("asc")
                      handleSortMenuClose()
                    }}
                  >
                    Attendance (Low to High)
                  </MenuItem>
                </Menu>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        indeterminate={selectedStudents.length > 0 && selectedStudents.length < filteredStudents.length}
                        checked={filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length}
                        onChange={handleSelectAll}
                        color="primary"
                      />
                    }
                    label={`${selectedStudents.length} student${selectedStudents.length !== 1 ? "s" : ""} selected`}
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<MagicIcon />}
                    onClick={handleRecommendDiscount}
                    disabled={isRecommending}
                  >
                    {isRecommending ? "Analyzing..." : "AI Recommend"}
                  </Button>
                </Box>

                {recommendationReason && (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">{recommendationReason}</Typography>
                  </Alert>
                )}

                <Grid container spacing={2}>
                  {filteredStudents.map((student) => {
                    const isSelected = selectedStudents.indexOf(student.id) !== -1
                    return (
                      <Grid item xs={12} sm={6} md={4} key={student.id}>
                        <MotionPaper
                          whileHover={{ y: -4, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                          transition={{ duration: 0.2 }}
                          elevation={isSelected ? 4 : 1}
                          sx={{
                            p: 2,
                            border: "2px solid",
                            borderColor: isSelected ? "primary.main" : "transparent",
                            borderRadius: 3,
                            cursor: "pointer",
                            position: "relative",
                          }}
                          onClick={() => handleSelectStudent(student.id)}
                        >
                          <Box sx={{ position: "absolute", top: 12, right: 12 }}>
                            <Checkbox checked={isSelected} color="primary" />
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Avatar
                              sx={{
                                bgcolor: isSelected ? "primary.main" : alpha(theme.palette.primary.main, 0.2),
                                color: isSelected ? "white" : "primary.main",
                                mr: 1.5,
                              }}
                            >
                              {student.avatar}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={600}>
                                {student.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {student.id} • {student.rollNumber}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ mb: 1.5 }}>
                            <Typography variant="body2" color="text.secondary">
                              Class: {student.class} {student.section} • {student.batch}
                            </Typography>
                          </Box>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                  Performance:
                                </Typography>
                                <Typography
                                  variant="body2"
                                  fontWeight={600}
                                  sx={{ color: getPerformanceColor(student.performance) }}
                                >
                                  {student.performance}%
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                  Attendance:
                                </Typography>
                                <Typography
                                  variant="body2"
                                  fontWeight={600}
                                  sx={{ color: getAttendanceColor(student.attendance) }}
                                >
                                  {student.attendance}%
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                            <Button
                              size="small"
                              startIcon={<VisibilityIcon />}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewStudentDetails(student)
                              }}
                            >
                              Details
                            </Button>
                          </Box>
                        </MotionPaper>
                      </Grid>
                    )
                  })}
                  {filteredStudents.length === 0 && (
                    <Grid item xs={12}>
                      <Paper sx={{ p: 3, textAlign: "center" }}>
                        <PersonIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
                        <Typography variant="subtitle1" color="text.secondary">
                          No students found matching your criteria
                        </Typography>
                        <Button
                          variant="text"
                          onClick={() => {
                            setSearchTerm("")
                            handleResetFilters()
                          }}
                          sx={{ mt: 1 }}
                        >
                          Reset Filters
                        </Button>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review and Confirm
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Review the discount assignment details before finalizing
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
                  <Typography variant="subtitle1" gutterBottom color="primary.main">
                    Discount Details
                  </Typography>
                  <List disablePadding>
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <DiscountIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Discount Type"
                        secondary={
                          isCustomAmount
                            ? `Custom Discount (${
                                discountType === "percentage"
                                  ? `${customDiscountAmount}%`
                                  : formatCurrency(Number(customDiscountAmount))
                              })`
                            : getSelectedDiscountDetails()?.name
                        }
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <MoneyIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Applied To"
                        secondary={`${getSelectedFeeDetails()?.name} (${formatCurrency(
                          getSelectedFeeDetails()?.amount || 0,
                        )} - ${getSelectedFeeDetails()?.frequency})`}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CalculateIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Discount Amount"
                        secondary={
                          isCustomAmount
                            ? discountType === "percentage"
                              ? `${customDiscountAmount}% (${formatCurrency(
                                  calculateDiscountAmount(getSelectedFeeDetails()?.amount || 0),
                                )} per student)`
                              : formatCurrency(Number(customDiscountAmount))
                            : getSelectedDiscountDetails()?.isPercent
                              ? `${getSelectedDiscountDetails()?.amount} (${formatCurrency(
                                  calculateDiscountAmount(getSelectedFeeDetails()?.amount || 0),
                                )} per student)`
                              : getSelectedDiscountDetails()?.amount
                        }
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <GroupsIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Students Selected"
                        secondary={`${selectedStudents.length} student${selectedStudents.length !== 1 ? "s" : ""}`}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.success.main, 0.05),
                    height: "100%",
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom color="success.main">
                    Financial Impact
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Original Fee:
                        </Typography>
                        <Typography variant="h5" fontWeight={600}>
                          {formatCurrency(getSelectedFeeDetails()?.amount || 0)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Discount:
                        </Typography>
                        <Typography variant="h5" fontWeight={600} color="error.main">
                          -{formatCurrency(calculateDiscountAmount(getSelectedFeeDetails()?.amount || 0))}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Final Fee Per Student:
                        </Typography>
                        <Typography variant="h5" fontWeight={600} color="success.main">
                          {formatCurrency(
                            (getSelectedFeeDetails()?.amount || 0) -
                              calculateDiscountAmount(getSelectedFeeDetails()?.amount || 0),
                          )}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Total Discount Value:
                        </Typography>
                        <Typography variant="h5" fontWeight={600} color="primary.main">
                          {formatCurrency(calculateTotalDiscountValue())}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Selected Students
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      {selectedStudents.map((studentId) => {
                        const student = students.find((s) => s.id === studentId)
                        if (!student) return null
                        return (
                          <Grid item xs={12} sm={6} md={4} lg={3} key={studentId}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                p: 2,
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: "divider",
                              }}
                            >
                              <Avatar
                                sx={{
                                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                                  color: "primary.main",
                                  mr: 1.5,
                                }}
                              >
                                {student.avatar}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2">{student.name}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {student.class} {student.section} • {student.rollNumber}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.info.main, 0.05),
                    border: "1px dashed",
                    borderColor: "info.light",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <InfoIcon color="info" sx={{ mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle1" color="info.main" gutterBottom>
                        Important Information
                      </Typography>
                      <Typography variant="body2" paragraph>
                        This discount will be applied immediately after confirmation. The students will be notified
                        automatically via email and SMS. The discount will be reflected in their next fee invoice.
                      </Typography>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Send notification to parents about this discount"
                      />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )
      default:
        return "Unknown step"
    }
  }

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
        <Container maxWidth="xl" sx={{p:{xs:"4px"}}}>
          <MotionBox initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" color="text.primary" gutterBottom>
                    Assign Discount
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Create and apply discounts to student fees
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}
                >
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" startIcon={<DiscountIcon />} href="/discount/list">
                      View Discounts
                    </Button>
                    <Button variant="outlined" startIcon={<ReceiptIcon />} href="/fees/list">
                      View Fees
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </MotionBox>

          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AssignmentIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">New Discount Assignment</Typography>
                </Box>
              }
              subheader="Follow the steps to assign discounts to students"
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                backgroundImage: "linear-gradient(to right, #6366f1, #818cf8)",
                "& .MuiCardHeader-subheader": { color: "rgba(255, 255, 255, 0.8)" },
              }}
            />
            <CardContent>
              <Stepper
                activeStep={activeStep}
                alternativeLabel={!isSmall}
                orientation={isSmall ? "vertical" : "horizontal"}
                sx={{ mb: 4 }}
              >
                <Step completed={isStepComplete(0)}>
                  <StepLabel>Select Discount & Fee</StepLabel>
                </Step>
                <Step completed={isStepComplete(1)}>
                  <StepLabel>Select Students</StepLabel>
                </Step>
                <Step completed={isStepComplete(2)}>
                  <StepLabel>Review & Confirm</StepLabel>
                </Step>
              </Stepper>

              {isLoading ? (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 5 }}>
                  <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
                  <Typography variant="h6" gutterBottom>
                    Processing...
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Please wait while we process your request
                  </Typography>
                </Box>
              ) : (
                <AnimatePresence mode="wait">
                  <MotionBox
                    key={activeStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getStepContent(activeStep)}
                  </MotionBox>
                </AnimatePresence>
              )}

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={activeStep === 0 || isLoading}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
                {activeStep === 2 ? (
                  <Button
                    variant="contained"
                    onClick={() => setOpenConfirmDialog(true)}
                    disabled={!isStepComplete(activeStep) || isLoading}
                    startIcon={<CheckCircleIcon />}
                    color="success"
                  >
                    Confirm & Assign
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!isStepComplete(activeStep) || isLoading}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Continue
                  </Button>
                )}
              </Box>
            </CardContent>
          </MotionCard>

          {/* Student Details Drawer */}
          <Drawer
            anchor="right"
            open={openStudentDrawer}
            onClose={() => setOpenStudentDrawer(false)}
            PaperProps={{
              sx: { width: { xs: "100%", sm: 450 }, p: 3 },
            }}
          >
            {selectedStudentDetails && (
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h6">Student Details</Typography>
                  <IconButton onClick={() => setOpenStudentDrawer(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                      color: "primary.main",
                      mr: 2,
                      fontSize: 24,
                    }}
                  >
                    {selectedStudentDetails.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selectedStudentDetails.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedStudentDetails.id} • {selectedStudentDetails.rollNumber}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <List disablePadding>
                  <ListItem disablePadding sx={{ py: 1 }}>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Father's Name" secondary={selectedStudentDetails.fatherName} />
                  </ListItem>
                  <ListItem disablePadding sx={{ py: 1 }}>
                    <ListItemIcon>
                      <ClassIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Class & Section"
                      secondary={`${selectedStudentDetails.class} ${selectedStudentDetails.section}`}
                    />
                  </ListItem>
                  <ListItem disablePadding sx={{ py: 1 }}>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary="Batch" secondary={selectedStudentDetails.batch} />
                  </ListItem>
                  <ListItem disablePadding sx={{ py: 1 }}>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Performance"
                      secondary={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LinearProgress
                            variant="determinate"
                            value={selectedStudentDetails.performance}
                            sx={{
                              width: 100,
                              mr: 1,
                              height: 8,
                              borderRadius: 4,
                              bgcolor: alpha(getPerformanceColor(selectedStudentDetails.performance), 0.2),
                              "& .MuiLinearProgress-bar": {
                                bgcolor: getPerformanceColor(selectedStudentDetails.performance),
                              },
                            }}
                          />
                          <Typography variant="body2" fontWeight={500}>
                            {selectedStudentDetails.performance}%
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <ListItem disablePadding sx={{ py: 1 }}>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Attendance"
                      secondary={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LinearProgress
                            variant="determinate"
                            value={selectedStudentDetails.attendance}
                            sx={{
                              width: 100,
                              mr: 1,
                              height: 8,
                              borderRadius: 4,
                              bgcolor: alpha(getAttendanceColor(selectedStudentDetails.attendance), 0.2),
                              "& .MuiLinearProgress-bar": {
                                bgcolor: getAttendanceColor(selectedStudentDetails.attendance),
                              },
                            }}
                          />
                          <Typography variant="body2" fontWeight={500}>
                            {selectedStudentDetails.attendance}%
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </List>

                <Divider sx={{ my: 3 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Contact Information
                </Typography>
                <List disablePadding>
                  <ListItem disablePadding sx={{ py: 1 }}>
                    <ListItemText primary="Student Mobile" secondary={selectedStudentDetails.studentMobile} />
                  </ListItem>
                  <ListItem disablePadding sx={{ py: 1 }}>
                    <ListItemText primary="Parent Mobile" secondary={selectedStudentDetails.parentMobile} />
                  </ListItem>
                </List>

                <Divider sx={{ my: 3 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Fee Information
                </Typography>
                <List disablePadding>
                  {selectedStudentDetails.fees.map((feeId: number) => {
                    const fee = fees.find((f) => f.id === feeId)
                    return (
                      <ListItem key={feeId} disablePadding sx={{ py: 1 }}>
                        <ListItemText
                          primary={fee?.name}
                          secondary={`${formatCurrency(fee?.amount || 0)} - ${fee?.frequency}`}
                        />
                      </ListItem>
                    )
                  })}
                </List>

                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      handleSelectStudent(selectedStudentDetails.id)
                      setOpenStudentDrawer(false)
                    }}
                    startIcon={selectedStudents.includes(selectedStudentDetails.id) ? <CheckCircleIcon /> : <AddIcon />}
                    color={selectedStudents.includes(selectedStudentDetails.id) ? "success" : "primary"}
                  >
                    {selectedStudents.includes(selectedStudentDetails.id)
                      ? "Selected for Discount"
                      : "Select for Discount"}
                  </Button>
                </Box>
              </Box>
            )}
          </Drawer>

          {/* Confirmation Dialog */}
          <Dialog
            open={openConfirmDialog}
            onClose={() => setOpenConfirmDialog(false)}
            PaperProps={{
              sx: { borderRadius: 3 },
            }}
          >
            <DialogTitle>Confirm Discount Assignment</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You are about to assign{" "}
                {isCustomAmount
                  ? `a custom discount of ${
                      discountType === "percentage"
                        ? `${customDiscountAmount}%`
                        : formatCurrency(Number(customDiscountAmount))
                    }`
                  : getSelectedDiscountDetails()?.name}{" "}
                to {selectedStudents.length} student{selectedStudents.length !== 1 ? "s" : ""}. The total discount value
                is {formatCurrency(calculateTotalDiscountValue())}. This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  setOpenConfirmDialog(false)
                  handleSave()
                }}
                variant="contained"
                color="success"
                autoFocus
              >
                Confirm Assignment
              </Button>
            </DialogActions>
          </Dialog>

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

          {/* Floating Help Button */}
          <Zoom in={true} style={{ transitionDelay: "500ms" }}>
            <Fab
              color="secondary"
              aria-label="help"
              sx={{ position: "fixed", bottom: 24, right: 24 }}
              onClick={() => {
                setSnackbarMessage("Help documentation opened in a new tab")
                setSnackbarSeverity("info")
                setOpenSnackbar(true)
              }}
            >
              <HelpIcon />
            </Fab>
          </Zoom>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
