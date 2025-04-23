/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect, SetStateAction } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Chip,
  Avatar,
  Paper,
  Divider,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Tab,
  Tabs,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Collapse,
  Alert,
  Snackbar,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  Search,
  Print,
  WhatsApp,
  Email,
  Download,
  Phone,
  MoreVert,
  Send,
  Warning,
  AccessTime,
  Refresh,
  ArrowDropDown,
  FilterAlt,
  Close,
  ReceiptLong,
  PeopleAlt,
  MonetizationOn,
  Dashboard,
  LocalAtm,
  AccountBalanceWallet,
  TrendingUp,
  TrendingDown,
  Message,
  RemoveRedEye,
  PieChart,
} from "@mui/icons-material"
import { type GridColDef } from "@mui/x-data-grid"

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Pie,
  Cell,
  Legend,
} from "recharts"

import dynamic from "next/dynamic"



const DataGrid = dynamic(
  () => import("@mui/x-data-grid").then((mod) => mod.DataGrid),
  { ssr: false }
);


interface Student {
  id: string
  name: string
  class: string
  parentMobile: string
  dueAmount: number
  dueFees: string
  status: "overdue" | "critical"
  lastReminder: string
  paymentHistory: Array<{
    date: string
    amount: number
    type: string
  }>
}

// Mock data for students with due fees
const mockStudents = [
  {
    id: "2025661",
    name: "Tahidul Islam Tamim",
    class: "Six",
    parentMobile: "1750063779",
    dueAmount: 5000,
    dueFees: "Tuition Fee - April 2025",
    status: "overdue",
    lastReminder: "2025-04-10",
    paymentHistory: [
      { date: "2025-03-05", amount: 5000, type: "Tuition Fee" },
      { date: "2025-02-10", amount: 5000, type: "Tuition Fee" },
    ],
  },
  {
    id: "2025662",
    name: "Mosaddiqul Islam Ajmal",
    class: "Six",
    parentMobile: "1743310744",
    dueAmount: 5000,
    dueFees: "Tuition Fee - April 2025",
    status: "overdue",
    lastReminder: "2025-04-10",
    paymentHistory: [
      { date: "2025-03-05", amount: 5000, type: "Tuition Fee" },
      { date: "2025-02-10", amount: 5000, type: "Tuition Fee" },
    ],
  },
  {
    id: "2025663",
    name: "Ayan Ahmed Jihad",
    class: "Six",
    parentMobile: "1754209951",
    dueAmount: 5000,
    dueFees: "Tuition Fee - April 2025",
    status: "overdue",
    lastReminder: "2025-04-08",
    paymentHistory: [
      { date: "2025-03-05", amount: 5000, type: "Tuition Fee" },
      { date: "2025-02-10", amount: 5000, type: "Tuition Fee" },
    ],
  },
  {
    id: "2025664",
    name: "Md Tahsin Haider",
    class: "Six",
    parentMobile: "1754502026",
    dueAmount: 12000,
    dueFees: "Tuition Fee - April 2025, Development Fee - April 2025, Special Fee - April 2025",
    status: "critical",
    lastReminder: "2025-04-12",
    paymentHistory: [
      { date: "2025-03-05", amount: 12000, type: "Multiple Fees" },
      { date: "2025-02-10", amount: 12000, type: "Multiple Fees" },
    ],
  },
  {
    id: "2025665",
    name: "Arafat Hosen",
    class: "Six",
    parentMobile: "1766192340",
    dueAmount: 9000,
    dueFees: "Tuition Fee - April 2025, Development Fee - April 2025, Special Fee - April 2025",
    status: "overdue",
    lastReminder: "2025-04-09",
    paymentHistory: [
      { date: "2025-03-05", amount: 9000, type: "Multiple Fees" },
      { date: "2025-02-10", amount: 9000, type: "Multiple Fees" },
    ],
  },
  {
    id: "2025592",
    name: "Abdul Mazid Azmi",
    class: "Five",
    parentMobile: "1715343638",
    dueAmount: 5000,
    dueFees: "Tuition Fee - April 2025",
    status: "overdue",
    lastReminder: "2025-04-10",
    paymentHistory: [
      { date: "2025-03-05", amount: 5000, type: "Tuition Fee" },
      { date: "2025-02-10", amount: 5000, type: "Tuition Fee" },
    ],
  },
  {
    id: "2025593",
    name: "Mahin Rahman Azan",
    class: "Five",
    parentMobile: "1550802580",
    dueAmount: 5000,
    dueFees: "Tuition Fee - April 2025",
    status: "overdue",
    lastReminder: "2025-04-11",
    paymentHistory: [
      { date: "2025-03-05", amount: 5000, type: "Tuition Fee" },
      { date: "2025-02-10", amount: 5000, type: "Tuition Fee" },
    ],
  },
  {
    id: "2025401",
    name: "Md Tahmid Haider",
    class: "Four",
    parentMobile: "1754502026",
    dueAmount: 12000,
    dueFees: "Tuition Fee - April 2025, Development Fee - April 2025, Special Fee - April 2025",
    status: "critical",
    lastReminder: "2025-04-12",
    paymentHistory: [
      { date: "2025-03-05", amount: 12000, type: "Multiple Fees" },
      { date: "2025-02-10", amount: 12000, type: "Multiple Fees" },
    ],
  },
  {
    id: "2025402",
    name: "Sadikur Rhman",
    class: "Four",
    parentMobile: "1625452497",
    dueAmount: 10000,
    dueFees: "Tuition Fee - April 2025, Exam Fee - March 2025",
    status: "overdue",
    lastReminder: "2025-04-09",
    paymentHistory: [
      { date: "2025-03-05", amount: 5000, type: "Tuition Fee" },
      { date: "2025-02-10", amount: 5000, type: "Exam Fee" },
    ],
  },
  {
    id: "2025403",
    name: "Ridhwan Islam",
    class: "Four",
    parentMobile: "01715354217",
    dueAmount: 15000,
    dueFees: "Tuition Fee - April 2025, Exam Fee - March 2025, Exam Fee - February 2025",
    status: "critical",
    lastReminder: "2025-04-12",
    paymentHistory: [
      { date: "2025-03-05", amount: 5000, type: "Tuition Fee" },
      { date: "2025-02-10", amount: 10000, type: "Exam Fees" },
    ],
  },
  {
    id: "2025404",
    name: "Md. Fahim Abdullah",
    class: "Four",
    parentMobile: "01767537273",
    dueAmount: 12000,
    dueFees: "Tuition Fee - April 2025, Development Fee - April 2025, Special Fee - April 2025",
    status: "overdue",
    lastReminder: "2025-04-08",
    paymentHistory: [
      { date: "2025-03-05", amount: 12000, type: "Multiple Fees" },
      { date: "2025-02-10", amount: 12000, type: "Multiple Fees" },
    ],
  },
  {
    id: "2025001",
    name: "Saif Islam Alif",
    class: "Nazera",
    parentMobile: "1731392030",
    dueAmount: 33000,
    dueFees:
      "Tuition Fee - April 2025, Development Fee - April 2025, Special Fee - April 2025, Exam Fee - March 2025, Development Fee - March 2025, Special Fee - March 2025, Exam Fee - February 2025, Development Fee - February 2025, Special Fee - February 2025",
    status: "critical",
    lastReminder: "2025-04-15",
    paymentHistory: [
      { date: "2025-01-05", amount: 11000, type: "Multiple Fees" },
      { date: "2024-12-10", amount: 11000, type: "Multiple Fees" },
    ],
  },
]

// Mock data for analytics
const classDistributionData = [
  { name: "Six", value: 5 },
  { name: "Five", value: 2 },
  { name: "Four", value: 4 },
  { name: "Nazera", value: 1 },
]

const monthlyDueData = [
  { name: "Jan", amount: 120000 },
  { name: "Feb", amount: 150000 },
  { name: "Mar", amount: 200000 },
  { name: "Apr", amount: 730000 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"]

// Fee types for filter
const feeTypes = [
  "All Types",
  "Tuition Fee",
  "Development Fee",
  "Exam Fee",
  "Special Fee",
  "Library Fee",
  "Transport Fee",
]

// Classes for filter
const classes = ["All Classes", "Nazera", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"]

// Months for filter
const months = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Years for filter
const years = ["All Years", "2025", "2024", "2023"]

// Sessions for filter
const sessions = ["All Sessions", "2024-2025", "2023-2024", "2022-2023"]

const DueFeesPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"))

  // State for filters
  const [studentId, setStudentId] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("All Months")
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [selectedFeeType, setSelectedFeeType] = useState("All Types")
  const [selectedClass, setSelectedClass] = useState("All Classes")
  const [selectedSession, setSelectedSession] = useState("All Sessions")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(!isMobile)

  // State for data
  const [students, setStudents] = useState(mockStudents)
  const [filteredStudents, setFilteredStudents] = useState(mockStudents)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentTab, setCurrentTab] = useState(0)
  const [viewMode, setViewMode] = useState("table")

  // State for dialogs
  const [openStudentDialog, setOpenStudentDialog] = useState(false)
  // const [selectedStudent, setSelectedStudent] = useState(null)
  const [openReminderDialog, setOpenReminderDialog] = useState(false)
  const [reminderType, setReminderType] = useState("sms")
  const [reminderMessage, setReminderMessage] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("success")

  // State for analytics
  const [showAnalytics, setShowAnalytics] = useState(true)

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null)
  const [bulkMenuAnchor, setBulkMenuAnchor] = useState(null)

  // Calculate total due amount and students
  const totalDueAmount = filteredStudents.reduce((sum, student) => sum + student.dueAmount, 0)
  const totalDueStudents = filteredStudents.length

  // Effect to filter students based on search and filters
  useEffect(() => {
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      let result = [...mockStudents]

      // Filter by student ID
      if (studentId) {
        result = result.filter((student) => student.id.toLowerCase().includes(studentId.toLowerCase()))
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        result = result.filter(
          (student) =>
            student.name.toLowerCase().includes(query) ||
            student.id.toLowerCase().includes(query) ||
            student.parentMobile.includes(query),
        )
      }

      // Filter by class
      if (selectedClass !== "All Classes") {
        result = result.filter((student) => student.class === selectedClass)
      }

      // Filter by fee type
      if (selectedFeeType !== "All Types") {
        result = result.filter((student) => student.dueFees.toLowerCase().includes(selectedFeeType.toLowerCase()))
      }

      // Filter by tab selection
      if (currentTab === 1) {
        // Overdue
        result = result.filter((student) => student.status === "overdue")
      } else if (currentTab === 2) {
        // Critical
        result = result.filter((student) => student.status === "critical")
      }

      setFilteredStudents(result)
      setLoading(false)
    }, 500)
  }, [studentId, selectedMonth, selectedYear, selectedFeeType, selectedClass, selectedSession, searchQuery, currentTab])

  // Handle tab change
  const handleTabChange = (event: any, newValue: any) => {
    setCurrentTab(newValue)
  }

  // Handle student selection for bulk actions
  const handleSelectionChange = (newSelection: any) => {
    setSelectedStudents(newSelection)
  }

  // Handle opening student details dialog
  // const handleOpenStudentDetails = (student: SetStateAction<null>) => {
  //   setSelectedStudent(student)
  //   setOpenStudentDialog(true)
  // }

  const handleOpenStudentDetails = (student: Student | null) => {
    setSelectedStudent(student)
    setOpenStudentDialog(true)
  }

  // Handle sending reminders
  const handleOpenReminderDialog = () => {
    if (selectedStudents.length === 0) {
      setSnackbarMessage("Please select at least one student")
      setSnackbarSeverity("warning")
      setSnackbarOpen(true)
      return
    }

    // Set default reminder message
    const selectedStudentsData = filteredStudents.filter((s) => 
      selectedStudents.includes(s.id)
    )

    const defaultMessage = `Dear Parent, This is a reminder that your ward has pending fees of Rs. ${selectedStudentsData.length === 1 ? selectedStudentsData[0].dueAmount : "various amounts"
      }. Please make the payment at your earliest convenience. - Craft International Institute`

    setReminderMessage(defaultMessage)
    setOpenReminderDialog(true)
  }

  // Handle sending the actual reminder
  const handleSendReminder = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setOpenReminderDialog(false)
      setSnackbarMessage(`Reminders sent successfully to ${selectedStudents.length} students`)
      setSnackbarSeverity("success")
      setSnackbarOpen(true)
      setLoading(false)
      setSelectedStudents([])
    }, 1000)
  }

  // Handle bulk fee collection
  const handleBulkCollect = () => {
    if (selectedStudents.length === 0) {
      setSnackbarMessage("Please select at least one student")
      setSnackbarSeverity("warning")
      setSnackbarOpen(true)
      return
    }

    // Navigate to fee collection page with selected students
    setSnackbarMessage(`Redirecting to collect fees for ${selectedStudents.length} students`)
    setSnackbarSeverity("info")
    setSnackbarOpen(true)

    // In a real app, you would navigate to the fee collection page
    // with the selected student IDs as query parameters
  }

  // Handle bulk menu open
  const handleBulkMenuOpen = (event: any) => {
    if (selectedStudents.length === 0) {
      setSnackbarMessage("Please select at least one student")
      setSnackbarSeverity("warning")
      setSnackbarOpen(true)
      return
    }
    setBulkMenuAnchor(event.currentTarget)
  }

  // Handle bulk menu close
  const handleBulkMenuClose = () => {
    setBulkMenuAnchor(null)
  }

  // Handle print due fees
  const handlePrintDueFees = () => {
    setSnackbarMessage("Preparing print view...")
    setSnackbarSeverity("info")
    setSnackbarOpen(true)

    // In a real app, you would open a print-friendly view
    handleBulkMenuClose()
  }

  // Handle export to Excel
  const handleExportToExcel = () => {
    setSnackbarMessage("Exporting to Excel...")
    setSnackbarSeverity("info")
    setSnackbarOpen(true)

    // In a real app, you would generate and download an Excel file
    handleBulkMenuClose()
  }

  // Handle refresh data
  const handleRefreshData = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setFilteredStudents([...mockStudents])
      setSnackbarMessage("Data refreshed successfully")
      setSnackbarSeverity("success")
      setSnackbarOpen(true)
      setLoading(false)
    }, 1000)
  }

  // Handle collect fee for a single student
  const handleCollectFee = (studentId: any) => {
    // In a real app, you would navigate to the fee collection page
    // with the student ID as a query parameter
    setSnackbarMessage(`Redirecting to collect fees for student ${studentId}`)
    setSnackbarSeverity("info")
    setSnackbarOpen(true)
  }

  // Handle menu open
  const handleMenuOpen = (event: any, student: any) => {
    setSelectedStudent(student)
    setAnchorEl(event.currentTarget)
  }

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // Handle view history
  // const handleViewHistory = () => {
  //   handleOpenStudentDetails(selectedStudent)
  //   handleMenuClose()
  // }

  const handleViewHistory = () => {
    if (selectedStudent) {
      handleOpenStudentDetails(selectedStudent)
      handleMenuClose()
    }
  }

  
  // Handle send reminder for a single student
  const handleSendSingleReminder = () => {
    if (!selectedStudent) return
    setSelectedStudents([selectedStudent.id])
    handleOpenReminderDialog()
    handleMenuClose()
  }

  // Define columns for the data grid
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 110,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Student Name",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: theme.palette.primary.main,
              mr: 1,
            }}
          >
            {params.value.charAt(0)}
          </Avatar>
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "class",
      headerName: "Class",
      width: 100,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value}
          sx={{
            bgcolor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
          }}
        />
      ),
    },
    {
      field: "parentMobile",
      headerName: "Parent Mobile",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Phone fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary }} />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "dueAmount",
      headerName: "Due Amount",
      width: 130,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            color: theme.palette.error.main,
          }}
        >
          ₹ {params.value.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          size="small"
          icon={params.value === "critical" ? <Warning fontSize="small" /> : <AccessTime fontSize="small" />}
          label={params.value === "critical" ? "Critical" : "Overdue"}
          sx={{
            bgcolor: params.value === "critical" ? theme.palette.error.light : theme.palette.warning.light,
            color: params.value === "critical" ? theme.palette.error.contrastText : theme.palette.warning.contrastText,
          }}
        />
      ),
    },
    {
      field: "dueFees",
      headerName: "Due Fees",
      width: 300,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 280,
            }}
          >
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => handleCollectFee(params.row.id)}
            sx={{ mr: 1 }}
          >
            Collect
          </Button>
          <IconButton size="small" onClick={(e) => handleMenuOpen(e, params.row)}>
            <MoreVert />
          </IconButton>
        </Box>
      ),
    },
  ]

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, md: 0 } }}>
          <ReceiptLong
            sx={{
              fontSize: 32,
              color: theme.palette.primary.main,
              mr: 1,
            }}
          />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Due Fees
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" startIcon={<Print />} onClick={handlePrintDueFees}>
            Print
          </Button>
          <Button variant="outlined" startIcon={<Download />} onClick={handleExportToExcel}>
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<Send />}
            onClick={handleOpenReminderDialog}
            disabled={selectedStudents.length === 0}
          >
            Send Reminder
          </Button>
        </Box>
      </Box>

      {/* Analytics Cards */}
      <Collapse in={showAnalytics}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Total Due Students Card */}
          <Grid item xs={12} md={6} lg={3}>
            <Card
              sx={{
                background: "linear-gradient(45deg, #FF9800 30%, #FFCA28 90%)",
                color: "white",
                boxShadow: "0 4px 20px 0 rgba(255, 152, 0, 0.2)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h6" fontWeight="medium">
                      Total Due Students
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" sx={{ mt: 2 }}>
                      {totalDueStudents}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      width: 56,
                      height: 56,
                    }}
                  >
                    <PeopleAlt sx={{ fontSize: 32 }} />
                  </Avatar>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
                  {totalDueStudents > 50 ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TrendingUp sx={{ mr: 0.5 }} />
                      High number of students with dues
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TrendingDown sx={{ mr: 0.5 }} />
                      Normal range of students with dues
                    </Box>
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Due Amount Card */}
          <Grid item xs={12} md={6} lg={3}>
            <Card
              sx={{
                background: "linear-gradient(45deg, #F44336 30%, #FF7043 90%)",
                color: "white",
                boxShadow: "0 4px 20px 0 rgba(244, 67, 54, 0.2)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h6" fontWeight="medium">
                      Total Due Amount
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" sx={{ mt: 2 }}>
                      ₹ {totalDueAmount.toLocaleString()}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      width: 56,
                      height: 56,
                    }}
                  >
                    <MonetizationOn sx={{ fontSize: 32 }} />
                  </Avatar>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
                  {totalDueAmount > 500000 ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TrendingUp sx={{ mr: 0.5 }} />
                      Critical amount of pending dues
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TrendingDown sx={{ mr: 0.5 }} />
                      Manageable amount of pending dues
                    </Box>
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Monthly Trend Card */}
          <Grid item xs={12} md={6} lg={3}>
            <Card
              sx={{
                background: "linear-gradient(45deg, #3F51B5 30%, #7986CB 90%)",
                color: "white",
                boxShadow: "0 4px 20px 0 rgba(63, 81, 181, 0.2)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h6" fontWeight="medium">
                      Monthly Trend
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" sx={{ mt: 2 }}>
                      +265%
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      width: 56,
                      height: 56,
                    }}
                  >
                    <TrendingUp sx={{ fontSize: 32 }} />
                  </Avatar>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Warning sx={{ mr: 0.5 }} />
                    Significant increase from last month
                  </Box>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Collection Rate Card */}
          <Grid item xs={12} md={6} lg={3}>
            <Card
              sx={{
                background: "linear-gradient(45deg, #4CAF50 30%, #81C784 90%)",
                color: "white",
                boxShadow: "0 4px 20px 0 rgba(76, 175, 80, 0.2)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h6" fontWeight="medium">
                      Collection Rate
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" sx={{ mt: 2 }}>
                      68%
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      width: 56,
                      height: 56,
                    }}
                  >
                    <AccountBalanceWallet sx={{ fontSize: 32 }} />
                  </Avatar>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TrendingDown sx={{ mr: 0.5 }} />
                    12% lower than previous month
                  </Box>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Collapse>

      {/* Tabs and Filters */}
      <Box sx={{ mb: 3 }}>
        <Paper sx={{ boxShadow: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{ px: 2, pt: 1 }}
            >
              <Tab
                icon={<Dashboard sx={{ fontSize: 20 }} />}
                iconPosition="start"
                label="All Dues"
                sx={{ textTransform: "none" }}
              />
              <Tab
                icon={<AccessTime sx={{ fontSize: 20 }} />}
                iconPosition="start"
                label="Overdue"
                sx={{ textTransform: "none" }}
              />
              <Tab
                icon={<Warning sx={{ fontSize: 20 }} />}
                iconPosition="start"
                label="Critical"
                sx={{ textTransform: "none" }}
              />
            </Tabs>
          </Box>

          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TextField
                placeholder="Search by name, ID or mobile..."
                variant="outlined"
                size="small"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ mr: 1 }}
              />
              <Button
                variant="outlined"
                startIcon={showFilters ? <Close /> : <FilterAlt />}
                onClick={() => setShowFilters(!showFilters)}
                sx={{ minWidth: 120 }}
              >
                {showFilters ? "Hide Filters" : "Filters"}
              </Button>
              <IconButton onClick={handleRefreshData} sx={{ ml: 1 }}>
                <Refresh />
              </IconButton>
            </Box>

            <Collapse in={showFilters}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    label="Student ID"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    select
                    label="Month"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    select
                    label="Year"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    select
                    label="Fee Type"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={selectedFeeType}
                    onChange={(e) => setSelectedFeeType(e.target.value)}
                  >
                    {feeTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    select
                    label="Class"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    {classes.map((cls) => (
                      <MenuItem key={cls} value={cls}>
                        {cls}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    select
                    label="Session"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={selectedSession}
                    onChange={(e) => setSelectedSession(e.target.value)}
                  >
                    {sessions.map((session) => (
                      <MenuItem key={session} value={session}>
                        {session}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Collapse>
          </Box>
        </Paper>
      </Box>

      {/* Bulk Actions */}
      {selectedStudents.length > 0 && (
        <Paper
          sx={{
            p: 2,
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
          }}
        >
          <Typography variant="body1">
            <b>{selectedStudents.length}</b> students selected
          </Typography>
          <Box>
            <Button variant="contained" color="secondary" onClick={handleBulkCollect} sx={{ mr: 1 }}>
              Collect Fees
            </Button>
            <Button variant="contained" color="secondary" onClick={handleOpenReminderDialog} sx={{ mr: 1 }}>
              Send Reminder
            </Button>
            <Button variant="contained" color="secondary" endIcon={<ArrowDropDown />} onClick={handleBulkMenuOpen}>
              More Actions
            </Button>
            <Menu anchorEl={bulkMenuAnchor} open={Boolean(bulkMenuAnchor)} onClose={handleBulkMenuClose}>
              <MenuItem onClick={handlePrintDueFees}>
                <ListItemIcon>
                  <Print fontSize="small" />
                </ListItemIcon>
                <ListItemText>Print Due Fees</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleExportToExcel}>
                <ListItemIcon>
                  <Download fontSize="small" />
                </ListItemIcon>
                <ListItemText>Export to Excel</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Paper>
      )}

      {/* Data Grid */}
      <Paper sx={{ height: 600, width: "100%", boxShadow: 2, mb: 3 }}>
        <DataGrid
          rows={filteredStudents}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleSelectionChange}
          rowSelectionModel={selectedStudents}
          loading={loading}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: `${theme.palette.primary.light} !important`,
            },
            "& .MuiDataGrid-row.Mui-selected:hover": {
              backgroundColor: `${theme.palette.primary.light} !important`,
            },
          }}
        />
      </Paper>

      {/* Analytics Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Analytics & Insights
        </Typography>
        <Grid container spacing={3}>
          {/* Class Distribution Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, boxShadow: 2, height: 300 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Due Fees by Class
              </Typography>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={classDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {classDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Monthly Trend Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, boxShadow: 2, height: 300 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Monthly Due Trend
              </Typography>
              <ResponsiveContainer width="100%" height="80%">
                <RechartsBarChart data={monthlyDueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip formatter={(value) => [`₹ ${value}`, "Amount"]} />
                  <Bar dataKey="amount" fill="#8884d8" name="Due Amount" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Student Details Dialog */}
      <Dialog open={openStudentDialog} onClose={() => setOpenStudentDialog(false)} maxWidth="md" fullWidth>
        {/* {selectedStudent && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    width: 40,
                    height: 40,
                    mr: 2,
                  }}
                >
                  {selectedStudent.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedStudent.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    ID: {selectedStudent.id} | Class: {selectedStudent.class}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle> */}
            {selectedStudent && (
  <>
    <DialogTitle>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar  
        sx={{
                    bgcolor: theme.palette.primary.main,
                    width: 40,
                    height: 40,
                    mr: 2,
                  }}>
          {selectedStudent.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h6">{selectedStudent.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            ID: {selectedStudent.id} | Class: {selectedStudent.class}
          </Typography>
        </Box>
      </Box>
    </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, boxShadow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Due Fee Details
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" color="textSecondary">
                          Total Due Amount
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" color="error">
                          ₹ {selectedStudent.dueAmount.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" color="textSecondary">
                          Status
                        </Typography>
                        <Chip
                          size="small"
                          icon={
                            selectedStudent.status === "critical" ? (
                              <Warning fontSize="small" />
                            ) : (
                              <AccessTime fontSize="small" />
                            )
                          }
                          label={selectedStudent.status === "critical" ? "Critical" : "Overdue"}
                          sx={{
                            bgcolor:
                              selectedStudent.status === "critical"
                                ? theme.palette.error.light
                                : theme.palette.warning.light,
                            color:
                              selectedStudent.status === "critical"
                                ? theme.palette.error.contrastText
                                : theme.palette.warning.contrastText,
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" color="textSecondary">
                          Last Reminder
                        </Typography>
                        <Typography variant="body2">{selectedStudent.lastReminder}</Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      Due Fee Breakdown
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {selectedStudent.dueFees.split(",").map((fee, index) => (
                        <Chip key={index} label={fee.trim()} size="small" sx={{ m: 0.5 }} />
                      ))}
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, boxShadow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Payment History
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {selectedStudent.paymentHistory.map((payment, index) => (
                        <Box
                          key={index}
                          sx={{
                            p: 1.5,
                            mb: 1,
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 0.5,
                            }}
                          >
                            <Typography variant="body2" fontWeight="medium">
                              {payment.date}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="success.main">
                              ₹ {payment.amount.toLocaleString()}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="textSecondary">
                            {payment.type}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, boxShadow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Contact Information
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Phone fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                          <Typography variant="body2">Parent: {selectedStudent.parentMobile}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Email fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                          <Typography variant="body2">Email: parent{selectedStudent.id}@example.com</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                startIcon={<WhatsApp />}
                onClick={() => {
                  setSelectedStudents([selectedStudent.id])
                  setReminderType("whatsapp")
                  handleOpenReminderDialog()
                  setOpenStudentDialog(false)
                }}
              >
                WhatsApp
              </Button>
              <Button
                startIcon={<Email />}
                onClick={() => {
                  setSelectedStudents([selectedStudent.id])
                  setReminderType("email")
                  handleOpenReminderDialog()
                  setOpenStudentDialog(false)
                }}
              >
                Email
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleCollectFee(selectedStudent.id)
                  setOpenStudentDialog(false)
                }}
              >
                Collect Fee
              </Button>
              <Button onClick={() => setOpenStudentDialog(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Reminder Dialog */}
      <Dialog open={openReminderDialog} onClose={() => setOpenReminderDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Payment Reminder</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Sending reminder to {selectedStudents.length} student
              {selectedStudents.length > 1 ? "s" : ""}
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Reminder Type
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant={reminderType === "sms" ? "contained" : "outlined"}
                startIcon={<Message />}
                onClick={() => setReminderType("sms")}
              >
                SMS
              </Button>
              <Button
                variant={reminderType === "whatsapp" ? "contained" : "outlined"}
                startIcon={<WhatsApp />}
                onClick={() => setReminderType("whatsapp")}
              >
                WhatsApp
              </Button>
              <Button
                variant={reminderType === "email" ? "contained" : "outlined"}
                startIcon={<Email />}
                onClick={() => setReminderType("email")}
              >
                Email
              </Button>
            </Box>
          </Box>
          <TextField
            label="Reminder Message"
            multiline
            rows={6}
            fullWidth
            value={reminderMessage}
            onChange={(e) => setReminderMessage(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReminderDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSendReminder} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Send Reminder"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Context Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleViewHistory}>
          <ListItemIcon>
            <RemoveRedEye fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleSendSingleReminder}>
          <ListItemIcon>
            <Send fontSize="small" />
          </ListItemIcon>
          <ListItemText>Send Reminder</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCollectFee(selectedStudent?.id)
            handleMenuClose()
          }}
        >
          <ListItemIcon>
            <LocalAtm fontSize="small" />
          </ListItemIcon>
          <ListItemText>Collect Fee</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Print fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print Details</ListItemText>
        </MenuItem>
      </Menu>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity as any} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default DueFeesPage
