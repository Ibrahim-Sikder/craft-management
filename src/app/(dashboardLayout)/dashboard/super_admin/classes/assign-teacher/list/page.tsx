"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  MenuItem,
  Select,
  FormControl,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  InputAdornment,
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  useTheme,
  useMediaQuery,
  Menu,
  ListItemIcon,
  ListItemText,
  Drawer,
  FormControlLabel,
  Tabs,
  Tab,
  CircularProgress,
  Backdrop,
  Snackbar,
  Alert,
  LinearProgress,
  Skeleton,
  Collapse,
  Checkbox, // Import Collapse
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Person as PersonIcon,
  Class as ClassIcon,
  Book as BookIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  FilterAlt as FilterAltIcon,
  Close as CloseIcon,
  CalendarMonth as CalendarMonthIcon,
  Groups as GroupsIcon,
  Dashboard as DashboardIcon,
  Info as InfoIcon,
  Assignment as AssignmentIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
} from "@mui/icons-material"
import Link from "next/link"
import type { TransitionProps } from "@mui/material/transitions"
import { useRouter } from "next/navigation"

// Sample data for demonstration
const sampleAssignments = [
  {
    id: 1,
    teacher: {
      id: 1,
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
      department: "Science",
      qualification: "Ph.D. in Physics",
      experience: "8 years",
      rating: 4.8,
    },
    class: {
      id: 1,
      name: "Grade 10-A",
      section: "A",
      students: 28,
      schedule: "Morning",
    },
    subjects: [
      { id: 1, name: "Physics", hoursPerWeek: 6, type: "Core" },
      { id: 2, name: "Chemistry", hoursPerWeek: 5, type: "Core" },
    ],
    isClassTeacher: true,
    startDate: "2023-08-01",
    endDate: "2024-05-31",
    status: "Active",
    createdAt: "2023-07-15",
    lastUpdated: "2023-07-15",
  },
  {
    id: 2,
    teacher: {
      id: 2,
      name: "Prof. Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100",
      department: "Mathematics",
      qualification: "M.Sc. in Mathematics",
      experience: "12 years",
      rating: 4.9,
    },
    class: {
      id: 2,
      name: "Grade 10-B",
      section: "B",
      students: 26,
      schedule: "Morning",
    },
    subjects: [{ id: 4, name: "Mathematics", hoursPerWeek: 8, type: "Core" }],
    isClassTeacher: true,
    startDate: "2023-08-01",
    endDate: "2024-05-31",
    status: "Active",
    createdAt: "2023-07-16",
    lastUpdated: "2023-07-16",
  },
  {
    id: 3,
    teacher: {
      id: 3,
      name: "Ms. Emily Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100",
      department: "English",
      qualification: "M.A. in English Literature",
      experience: "6 years",
      rating: 4.7,
    },
    class: {
      id: 3,
      name: "Grade 11-A",
      section: "A",
      students: 24,
      schedule: "Morning",
    },
    subjects: [
      { id: 5, name: "English Literature", hoursPerWeek: 5, type: "Core" },
      { id: 6, name: "English Language", hoursPerWeek: 4, type: "Core" },
    ],
    isClassTeacher: true,
    startDate: "2023-08-01",
    endDate: "2024-05-31",
    status: "Active",
    createdAt: "2023-07-17",
    lastUpdated: "2023-07-17",
  },
  {
    id: 4,
    teacher: {
      id: 4,
      name: "Mr. David Wilson",
      avatar: "/placeholder.svg?height=100&width=100",
      department: "History",
      qualification: "M.A. in History",
      experience: "10 years",
      rating: 4.6,
    },
    class: {
      id: 4,
      name: "Grade 11-B",
      section: "B",
      students: 25,
      schedule: "Afternoon",
    },
    subjects: [{ id: 7, name: "World History", hoursPerWeek: 4, type: "Core" }],
    isClassTeacher: true,
    startDate: "2023-08-01",
    endDate: "2024-05-31",
    status: "Active",
    createdAt: "2023-07-18",
    lastUpdated: "2023-07-18",
  },
  {
    id: 5,
    teacher: {
      id: 5,
      name: "Dr. Priya Patel",
      avatar: "/placeholder.svg?height=100&width=100",
      department: "Computer Science",
      qualification: "Ph.D. in Computer Science",
      experience: "7 years",
      rating: 4.9,
    },
    class: {
      id: 5,
      name: "Grade 12-A",
      section: "A",
      students: 22,
      schedule: "Morning",
    },
    subjects: [{ id: 8, name: "Computer Science", hoursPerWeek: 6, type: "Elective" }],
    isClassTeacher: true,
    startDate: "2023-08-01",
    endDate: "2024-05-31",
    status: "Active",
    createdAt: "2023-07-19",
    lastUpdated: "2023-07-19",
  },
  {
    id: 6,
    teacher: {
      id: 1,
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
      department: "Science",
      qualification: "Ph.D. in Physics",
      experience: "8 years",
      rating: 4.8,
    },
    class: {
      id: 6,
      name: "Grade 12-B",
      section: "B",
      students: 23,
      schedule: "Afternoon",
    },
    subjects: [{ id: 3, name: "Biology", hoursPerWeek: 5, type: "Core" }],
    isClassTeacher: false,
    startDate: "2023-08-01",
    endDate: "2024-05-31",
    status: "Active",
    createdAt: "2023-07-20",
    lastUpdated: "2023-07-20",
  },
  {
    id: 7,
    teacher: {
      id: 6,
      name: "Mr. James Thompson",
      avatar: "/placeholder.svg?height=100&width=100",
      department: "Arts",
      qualification: "M.F.A. in Fine Arts",
      experience: "5 years",
      rating: 4.5,
    },
    class: {
      id: 1,
      name: "Grade 10-A",
      section: "A",
      students: 28,
      schedule: "Morning",
    },
    subjects: [{ id: 9, name: "Art", hoursPerWeek: 3, type: "Elective" }],
    isClassTeacher: false,
    startDate: "2023-08-01",
    endDate: "2024-05-31",
    status: "Active",
    createdAt: "2023-07-21",
    lastUpdated: "2023-07-21",
  },
  {
    id: 8,
    teacher: {
      id: 7,
      name: "Ms. Lisa Brown",
      avatar: "/placeholder.svg?height=100&width=100",
      department: "Sports",
      qualification: "B.Ed. in Physical Education",
      experience: "4 years",
      rating: 4.7,
    },
    class: {
      id: 2,
      name: "Grade 10-B",
      section: "B",
      students: 26,
      schedule: "Morning",
    },
    subjects: [{ id: 10, name: "Physical Education", hoursPerWeek: 4, type: "Compulsory" }],
    isClassTeacher: false,
    startDate: "2023-08-01",
    endDate: "2024-05-31",
    status: "Inactive",
    createdAt: "2023-07-22",
    lastUpdated: "2023-09-15",
  },
  {
    id: 9,
    teacher: {
      id: 8,
      name: "Dr. Robert Miller",
      avatar: "/placeholder.svg?height=100&width=100",
      department: "Science",
      qualification: "Ph.D. in Chemistry",
      experience: "9 years",
      rating: 4.6,
    },
    class: {
      id: 3,
      name: "Grade 11-A",
      section: "A",
      students: 24,
      schedule: "Morning",
    },
    subjects: [{ id: 2, name: "Chemistry", hoursPerWeek: 5, type: "Core" }],
    isClassTeacher: false,
    startDate: "2023-08-01",
    endDate: "2024-05-31",
    status: "Pending",
    createdAt: "2023-07-23",
    lastUpdated: "2023-07-23",
  },
  {
    id: 10,
    teacher: {
      id: 9,
      name: "Mrs. Jennifer Lee",
      avatar: "/placeholder.svg?height=100&width=100",
      department: "Mathematics",
      qualification: "M.Ed. in Mathematics Education",
      experience: "11 years",
      rating: 4.8,
    },
    class: {
      id: 4,
      name: "Grade 11-B",
      section: "B",
      students: 25,
      schedule: "Afternoon",
    },
    subjects: [{ id: 4, name: "Mathematics", hoursPerWeek: 8, type: "Core" }],
    isClassTeacher: false,
    startDate: "2023-08-01",
    endDate: "2024-05-31",
    status: "Active",
    createdAt: "2023-07-24",
    lastUpdated: "2023-07-24",
  },
  {
    id: 11,
    teacher: {
      id: 10,
      name: "Prof. Thomas Clark",
      avatar: "/placeholder.svg?height=100&width=100",
      department: "English",
      qualification: "Ph.D. in English",
      experience: "15 years",
      rating: 4.9,
    },
    class: {
      id: 5,
      name: "Grade 12-A",
      section: "A",
      students: 22,
      schedule: "Morning",
    },
    subjects: [{ id: 5, name: "English Literature", hoursPerWeek: 5, type: "Core" }],
    isClassTeacher: false,
    startDate: "2023-08-01",
    endDate: "2024-05-31",
    status: "Active",
    createdAt: "2023-07-25",
    lastUpdated: "2023-07-25",
  },
  {
    id: 12,
    teacher: {
      id: 11,
      name: "Dr. Maria Garcia",
      avatar: "/placeholder.svg?height=100&width=100",
      department: "History",
      qualification: "Ph.D. in History",
      experience: "13 years",
      rating: 4.7,
    },
    class: {
      id: 6,
      name: "Grade 12-B",
      section: "B",
      students: 23,
      schedule: "Afternoon",
    },
    subjects: [{ id: 7, name: "World History", hoursPerWeek: 4, type: "Core" }],
    isClassTeacher: false,
    startDate: "2023-08-01",
    endDate: "2024-05-31",
    status: "Active",
    createdAt: "2023-07-26",
    lastUpdated: "2023-07-26",
  },
]

// Transition component for dialogs
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AssignClassTeacherList() {
  const theme = useTheme()
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"))

  // State for data and UI
  const [assignments, setAssignments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"table" | "card">("table")
  const [selectedTab, setSelectedTab] = useState(0)
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "asc" | "desc"
  }>({ key: "createdAt", direction: "desc" })
  const [filters, setFilters] = useState({
    departments: [] as string[],
    classes: [] as string[],
    subjects: [] as string[],
    status: [] as string[],
    isClassTeacher: null as boolean | null,
  })
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [statsVisible, setStatsVisible] = useState(true)
  const [exportMenuAnchorEl, setExportMenuAnchorEl] = useState<null | HTMLElement>(null)

  // Fetch data on component mount
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setAssignments(sampleAssignments)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle search and filtering
  const filteredAssignments = assignments.filter((assignment) => {
    // Search query filter
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      assignment.teacher.name.toLowerCase().includes(searchLower) ||
      assignment.class.name.toLowerCase().includes(searchLower) ||
      assignment.subjects.some((subject: any) => subject.name.toLowerCase().includes(searchLower))

    // Department filter
    const matchesDepartment =
      filters.departments.length === 0 || filters.departments.includes(assignment.teacher.department)

    // Class filter
    const matchesClass = filters.classes.length === 0 || filters.classes.includes(assignment.class.name)

    // Subject filter
    const matchesSubject =
      filters.subjects.length === 0 ||
      assignment.subjects.some((subject: any) => filters.subjects.includes(subject.name))

    // Status filter
    const matchesStatus = filters.status.length === 0 || filters.status.includes(assignment.status)

    // Class teacher filter
    const matchesClassTeacher = filters.isClassTeacher === null || assignment.isClassTeacher === filters.isClassTeacher

    return matchesSearch && matchesDepartment && matchesClass && matchesSubject && matchesStatus && matchesClassTeacher
  })

  // Handle sorting
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    let aValue, bValue

    switch (sortConfig.key) {
      case "teacher":
        aValue = a.teacher.name
        bValue = b.teacher.name
        break
      case "class":
        aValue = a.class.name
        bValue = b.class.name
        break
      case "subjects":
        aValue = a.subjects.length
        bValue = b.subjects.length
        break
      case "status":
        aValue = a.status
        bValue = b.status
        break
      case "startDate":
        aValue = new Date(a.startDate).getTime()
        bValue = new Date(b.startDate).getTime()
        break
      case "createdAt":
        aValue = new Date(a.createdAt).getTime()
        bValue = new Date(b.createdAt).getTime()
        break
      default:
        aValue = a[sortConfig.key]
        bValue = b[sortConfig.key]
    }

    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Pagination
  const paginatedAssignments = sortedAssignments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)

    // Apply filters based on tab
    if (newValue === 0) {
      // All assignments
      setFilters({
        ...filters,
        status: [],
      })
    } else if (newValue === 1) {
      // Active assignments
      setFilters({
        ...filters,
        status: ["Active"],
      })
    } else if (newValue === 2) {
      // Class teachers only
      setFilters({
        ...filters,
        isClassTeacher: true,
      })
    } else if (newValue === 3) {
      // Subject teachers only
      setFilters({
        ...filters,
        isClassTeacher: false,
      })
    }
  }

  // Handle sort
  const handleSort = (key: string) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
    setSortConfig({ key, direction })
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
    setExportMenuAnchorEl(event.currentTarget)
  }

  const handleExportMenuClose = () => {
    setExportMenuAnchorEl(null)
  }

  // Handle view details
  const handleViewDetails = () => {
    setDetailsDialogOpen(true)
    handleMenuClose()
  }

  // Handle edit
  const handleEdit = () => {
    // In a real app, this would navigate to the edit page with the assignment ID
    router.push(`/teachers/assign/edit/${selectedAssignment.id}`)
    handleMenuClose()
  }

  // Handle delete dialog
  const handleDeleteDialog = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    // In a real app, this would call an API to delete the assignment
    const updatedAssignments = assignments.filter((a) => a.id !== selectedAssignment.id)
    setAssignments(updatedAssignments)
    setDeleteDialogOpen(false)
    setSnackbar({
      open: true,
      message: "Assignment deleted successfully",
      severity: "success",
    })
  }

  // Handle refresh
  const handleRefresh = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setAssignments([...sampleAssignments])
      setLoading(false)
      setSnackbar({
        open: true,
        message: "Data refreshed successfully",
        severity: "success",
      })
    }, 1000)
  }

  // Handle export
  const handleExport = (format: string) => {
    // In a real app, this would generate and download the export file
    setSnackbar({
      open: true,
      message: `Exported data in ${format.toUpperCase()} format`,
      severity: "success",
    })
    handleExportMenuClose()
  }

  // Handle filter reset
  const handleResetFilters = () => {
    setFilters({
      departments: [],
      classes: [],
      subjects: [],
      status: [],
      isClassTeacher: null,
    })
    setSearchQuery("")
    setSelectedTab(0)
    setSnackbar({
      open: true,
      message: "Filters reset successfully",
      severity: "info",
    })
  }

  // Get unique values for filters
  const departments = [...new Set(assignments.map((a) => a.teacher.department))]
  const classes = [...new Set(assignments.map((a) => a.class.name))]
  const subjects = [...new Set(assignments.flatMap((a) => a.subjects.map((s: any) => s.name)))]
  const statuses = [...new Set(assignments.map((a) => a.status))]

  // Calculate statistics
  const totalAssignments = assignments.length
  const activeAssignments = assignments.filter((a) => a.status === "Active").length
  const classTeachers = assignments.filter((a) => a.isClassTeacher).length
  const subjectTeachers = assignments.filter((a) => !a.isClassTeacher).length

  // Render teacher rating stars
  const renderTeacherRating = (rating: number) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Box key={star} component="span">
            {rating >= star ? (
              <StarIcon sx={{ color: "warning.main", fontSize: "1rem" }} />
            ) : (
              <StarBorderIcon sx={{ color: "warning.main", fontSize: "1rem" }} />
            )}
          </Box>
        ))}
        <Typography variant="body2" sx={{ ml: 1 }}>
          {rating}
        </Typography>
      </Box>
    )
  }

  // Render status chip
  const renderStatusChip = (status: string) => {
    let color: "success" | "error" | "warning" | "info" = "info"
    let icon = <InfoIcon fontSize="small" />

    switch (status) {
      case "Active":
        color = "success"
        icon = <CheckCircleIcon fontSize="small" />
        break
      case "Inactive":
        color = "error"
        icon = <CancelIcon fontSize="small" />
        break
      case "Pending":
        color = "warning"
        icon = <ScheduleIcon fontSize="small" />
        break
    }

    return (
      <Chip
        icon={icon}
        label={status}
        color={color}
        size="small"
        variant="outlined"
        sx={{ borderRadius: 1, fontWeight: "medium" }}
      />
    )
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          background: "linear-gradient(to right bottom, #ffffff, #f9f9ff)",
          boxShadow: "0 8px 32px rgba(77, 101, 217, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(25,118,210,0.08) 0%, rgba(25,118,210,0) 70%)",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link href="/dashboard" passHref>
                <IconButton
                  color="primary"
                  sx={{
                    mr: 2,
                    bgcolor: "rgba(25,118,210,0.1)",
                    "&:hover": {
                      bgcolor: "rgba(25,118,210,0.2)",
                    },
                  }}
                >
                  <DashboardIcon />
                </IconButton>
              </Link>
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                color="primary"
                sx={{
                  background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Class Teacher Assignments
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="Refresh data">
                <IconButton onClick={handleRefresh} color="primary" disabled={loading}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Export data">
                <IconButton onClick={handleExportMenuOpen} color="primary">
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Link href="/dashboard/super_admin/classes/assign-teacher/new" passHref>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    borderRadius: 2,
                    boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
                    "&:hover": {
                      boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
                    },
                    display: { xs: "none", sm: "flex" },
                  }}
                >
                  New Assignment
                </Button>
              </Link>
              <Link href="/teachers/assign" passHref>
                <IconButton
                  color="primary"
                  sx={{
                    display: { xs: "flex", sm: "none" },
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Link>
            </Box>
          </Box>

          {/* Statistics Cards */}
          <Collapse in={statsVisible}>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    bgcolor: "rgba(25,118,210,0.08)",
                    border: "1px solid rgba(25,118,210,0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6" color="text.secondary" fontWeight="medium">
                        Total Assignments
                      </Typography>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <AssignmentIcon />
                      </Avatar>
                    </Box>
                    {loading ? (
                      <Skeleton variant="text" width="60%" height={40} />
                    ) : (
                      <Typography variant="h3" fontWeight="bold" color="primary.main">
                        {totalAssignments}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    bgcolor: "rgba(46,125,50,0.08)",
                    border: "1px solid rgba(46,125,50,0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6" color="text.secondary" fontWeight="medium">
                        Active Assignments
                      </Typography>
                      <Avatar sx={{ bgcolor: "success.main" }}>
                        <AssignmentTurnedInIcon />
                      </Avatar>
                    </Box>
                    {loading ? (
                      <Skeleton variant="text" width="60%" height={40} />
                    ) : (
                      <Typography variant="h3" fontWeight="bold" color="success.main">
                        {activeAssignments}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    bgcolor: "rgba(156,39,176,0.08)",
                    border: "1px solid rgba(156,39,176,0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6" color="text.secondary" fontWeight="medium">
                        Class Teachers
                      </Typography>
                      <Avatar sx={{ bgcolor: "secondary.main" }}>
                        <ClassIcon />
                      </Avatar>
                    </Box>
                    {loading ? (
                      <Skeleton variant="text" width="60%" height={40} />
                    ) : (
                      <Typography variant="h3" fontWeight="bold" color="secondary.main">
                        {classTeachers}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    bgcolor: "rgba(211,47,47,0.08)",
                    border: "1px solid rgba(211,47,47,0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6" color="text.secondary" fontWeight="medium">
                        Subject Teachers
                      </Typography>
                      <Avatar sx={{ bgcolor: "error.main" }}>
                        <BookIcon />
                      </Avatar>
                    </Box>
                    {loading ? (
                      <Skeleton variant="text" width="60%" height={40} />
                    ) : (
                      <Typography variant="h3" fontWeight="bold" color="error.main">
                        {subjectTeachers}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Collapse>

          {/* Search and Filter Bar */}
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search by teacher, class or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: searchQuery && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearchQuery("")}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2 },
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterAltIcon />}
                  onClick={() => setFilterDrawerOpen(true)}
                  sx={{ borderRadius: 2, height: "100%" }}
                >
                  Filters
                  {Object.values(filters).some((f) => (Array.isArray(f) ? f.length > 0 : f !== null)) && (
                    <Badge
                      badgeContent={
                        (filters.departments.length > 0 ? 1 : 0) +
                        (filters.classes.length > 0 ? 1 : 0) +
                        (filters.subjects.length > 0 ? 1 : 0) +
                        (filters.status.length > 0 ? 1 : 0) +
                        (filters.isClassTeacher !== null ? 1 : 0)
                      }
                      color="primary"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Button>
              </Grid>
              <Grid item xs={6} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<SortIcon />}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ borderRadius: 2, height: "100%" }}
                >
                  Sort By
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && !selectedAssignment}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    onClick={() => {
                      handleSort("teacher")
                      setAnchorEl(null)
                    }}
                  >
                    <ListItemIcon>
                      {sortConfig.key === "teacher" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUpwardIcon fontSize="small" />
                        ) : (
                          <ArrowDownwardIcon fontSize="small" />
                        )
                      ) : (
                        <PersonIcon fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText>Teacher Name</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSort("class")
                      setAnchorEl(null)
                    }}
                  >
                    <ListItemIcon>
                      {sortConfig.key === "class" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUpwardIcon fontSize="small" />
                        ) : (
                          <ArrowDownwardIcon fontSize="small" />
                        )
                      ) : (
                        <ClassIcon fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText>Class</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSort("subjects")
                      setAnchorEl(null)
                    }}
                  >
                    <ListItemIcon>
                      {sortConfig.key === "subjects" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUpwardIcon fontSize="small" />
                        ) : (
                          <ArrowDownwardIcon fontSize="small" />
                        )
                      ) : (
                        <BookIcon fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText>Number of Subjects</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSort("status")
                      setAnchorEl(null)
                    }}
                  >
                    <ListItemIcon>
                      {sortConfig.key === "status" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUpwardIcon fontSize="small" />
                        ) : (
                          <ArrowDownwardIcon fontSize="small" />
                        )
                      ) : (
                        <InfoIcon fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText>Status</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSort("startDate")
                      setAnchorEl(null)
                    }}
                  >
                    <ListItemIcon>
                      {sortConfig.key === "startDate" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUpwardIcon fontSize="small" />
                        ) : (
                          <ArrowDownwardIcon fontSize="small" />
                        )
                      ) : (
                        <CalendarMonthIcon fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText>Start Date</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSort("createdAt")
                      setAnchorEl(null)
                    }}
                  >
                    <ListItemIcon>
                      {sortConfig.key === "createdAt" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUpwardIcon fontSize="small" />
                        ) : (
                          <ArrowDownwardIcon fontSize="small" />
                        )
                      ) : (
                        <CalendarMonthIcon fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText>Created Date</ListItemText>
                  </MenuItem>
                </Menu>
              </Grid>
              <Grid item xs={6} md={1}>
                <Tooltip title={viewMode === "table" ? "Card View" : "Table View"}>
                  <IconButton
                    onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
                    sx={{
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {viewMode === "table" ? <ViewModule /> : <ViewList />}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={6} md={1}>
                <Tooltip title={statsVisible ? "Hide Statistics" : "Show Statistics"}>
                  <IconButton
                    onClick={() => setStatsVisible(!statsVisible)}
                    sx={{
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {statsVisible ? <BarChartIcon /> : <PieChartIcon />}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>

          {/* Tabs */}
          <Box sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{
                "& .MuiTab-root": {
                  minWidth: { xs: "auto", md: 160 },
                  fontWeight: "medium",
                },
              }}
            >
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AssignmentIcon sx={{ mr: 1 }} />
                    All Assignments
                    <Chip label={assignments.length} size="small" sx={{ ml: 1, height: 20, fontSize: "0.7rem" }} />
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AssignmentTurnedInIcon sx={{ mr: 1 }} />
                    Active
                    <Chip
                      label={activeAssignments}
                      size="small"
                      color="success"
                      sx={{ ml: 1, height: 20, fontSize: "0.7rem" }}
                    />
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ClassIcon sx={{ mr: 1 }} />
                    Class Teachers
                    <Chip
                      label={classTeachers}
                      size="small"
                      color="secondary"
                      sx={{ ml: 1, height: 20, fontSize: "0.7rem" }}
                    />
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <BookIcon sx={{ mr: 1 }} />
                    Subject Teachers
                    <Chip
                      label={subjectTeachers}
                      size="small"
                      color="error"
                      sx={{ ml: 1, height: 20, fontSize: "0.7rem" }}
                    />
                  </Box>
                }
              />
            </Tabs>
          </Box>

          {/* Loading Progress */}
          {loading && (
            <Box sx={{ width: "100%", mb: 3 }}>
              <LinearProgress />
            </Box>
          )}

          {/* Results Count */}
          <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredAssignments.length} of {assignments.length} assignments
              {Object.values(filters).some((f) => (Array.isArray(f) ? f.length > 0 : f !== null)) && (
                <Button
                  size="small"
                  startIcon={<FilterAltIcon fontSize="small" />}
                  onClick={handleResetFilters}
                  sx={{ ml: 1 }}
                >
                  Clear Filters
                </Button>
              )}
            </Typography>
          </Box>

          {/* Table View */}
          {viewMode === "table" && (
            <>
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  mb: 3,
                  overflow: "hidden",
                }}
              >
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "rgba(25,118,210,0.05)" }}>
                      <TableCell sx={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => handleSort("teacher")}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Teacher
                          {sortConfig.key === "teacher" && (
                            <Box component="span" sx={{ ml: 0.5 }}>
                              {sortConfig.direction === "asc" ? (
                                <ArrowUpwardIcon fontSize="small" />
                              ) : (
                                <ArrowDownwardIcon fontSize="small" />
                              )}
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => handleSort("class")}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Class
                          {sortConfig.key === "class" && (
                            <Box component="span" sx={{ ml: 0.5 }}>
                              {sortConfig.direction === "asc" ? (
                                <ArrowUpwardIcon fontSize="small" />
                              ) : (
                                <ArrowDownwardIcon fontSize="small" />
                              )}
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Subjects</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => handleSort("status")}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Status
                          {sortConfig.key === "status" && (
                            <Box component="span" sx={{ ml: 0.5 }}>
                              {sortConfig.direction === "asc" ? (
                                <ArrowUpwardIcon fontSize="small" />
                              ) : (
                                <ArrowDownwardIcon fontSize="small" />
                              )}
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => handleSort("startDate")}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Period
                          {sortConfig.key === "startDate" && (
                            <Box component="span" sx={{ ml: 0.5 }}>
                              {sortConfig.direction === "asc" ? (
                                <ArrowUpwardIcon fontSize="small" />
                              ) : (
                                <ArrowDownwardIcon fontSize="small" />
                              )}
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      // Loading skeletons
                      Array.from(new Array(5)).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                              <Skeleton variant="text" width={150} />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Skeleton variant="text" width={100} />
                          </TableCell>
                          <TableCell>
                            <Skeleton variant="text" width={120} />
                          </TableCell>
                          <TableCell>
                            <Skeleton variant="text" width={80} />
                          </TableCell>
                          <TableCell>
                            <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
                          </TableCell>
                          <TableCell>
                            <Skeleton variant="text" width={120} />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Skeleton variant="circular" width={30} height={30} />
                              <Skeleton variant="circular" width={30} height={30} />
                              <Skeleton variant="circular" width={30} height={30} />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : paginatedAssignments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                            <AssignmentIcon sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5 }} />
                            <Typography variant="h6" color="text.secondary">
                              No assignments found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Try adjusting your search or filter criteria
                            </Typography>
                            <Button
                              variant="outlined"
                              startIcon={<FilterAltIcon />}
                              onClick={handleResetFilters}
                              sx={{ mt: 1 }}
                            >
                              Clear Filters
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedAssignments.map((assignment) => (
                        <TableRow
                          key={assignment.id}
                          sx={{
                            "&:hover": {
                              bgcolor: "rgba(25,118,210,0.04)",
                            },
                            transition: "background-color 0.2s ease",
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar src={assignment.teacher.avatar} sx={{ mr: 2 }}>
                                {assignment.teacher.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body1" fontWeight="medium">
                                  {assignment.teacher.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {assignment.teacher.department}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" fontWeight="medium">
                              {assignment.class.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {assignment.class.students} students
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                              {assignment.subjects.map((subject: any) => (
                                <Chip key={subject.id} label={subject.name} size="small" sx={{ borderRadius: 1 }} />
                              ))}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={assignment.isClassTeacher ? <ClassIcon /> : <BookIcon />}
                              label={assignment.isClassTeacher ? "Class Teacher" : "Subject Teacher"}
                              color={assignment.isClassTeacher ? "secondary" : "default"}
                              variant="outlined"
                              size="small"
                              sx={{ borderRadius: 1 }}
                            />
                          </TableCell>
                          <TableCell>{renderStatusChip(assignment.status)}</TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {new Date(assignment.startDate).toLocaleDateString()} -{" "}
                              {new Date(assignment.endDate).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Tooltip title="View Details">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => {
                                    setSelectedAssignment(assignment)
                                    setDetailsDialogOpen(true)
                                  }}
                                  sx={{ bgcolor: "rgba(25,118,210,0.1)" }}
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton
                                  size="small"
                                  color="secondary"
                                  onClick={() => {
                                    setSelectedAssignment(assignment)
                                    handleEdit()
                                  }}
                                  sx={{ bgcolor: "rgba(156,39,176,0.1)" }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <IconButton
                                size="small"
                                onClick={(e) => handleMenuOpen(e, assignment)}
                                sx={{ bgcolor: "rgba(0,0,0,0.05)" }}
                              >
                                <MoreVertIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                component="div"
                count={filteredAssignments.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                }}
              />
            </>
          )}

          {/* Card View */}
          {viewMode === "card" && (
            <>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                {loading ? (
                  // Loading skeletons
                  Array.from(new Array(6)).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Skeleton variant="circular" width={50} height={50} sx={{ mr: 2 }} />
                            <Box sx={{ width: "100%" }}>
                              <Skeleton variant="text" width="70%" height={28} />
                              <Skeleton variant="text" width="40%" />
                            </Box>
                          </Box>
                          <Divider sx={{ my: 2 }} />
                          <Box sx={{ mb: 2 }}>
                            <Skeleton variant="text" width="60%" />
                            <Skeleton variant="text" width="80%" />
                          </Box>
                          <Box sx={{ mb: 2 }}>
                            <Skeleton variant="text" width="40%" />
                            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                              <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                              <Skeleton variant="rectangular" width={70} height={24} sx={{ borderRadius: 1 }} />
                            </Box>
                          </Box>
                          <Box sx={{ mt: "auto", pt: 2 }}>
                            <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 2 }} />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : paginatedAssignments.length === 0 ? (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        py: 6,
                        bgcolor: "background.paper",
                        borderRadius: 3,
                        border: "1px dashed",
                        borderColor: "divider",
                      }}
                    >
                      <AssignmentIcon sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5 }} />
                      <Typography variant="h6" color="text.secondary">
                        No assignments found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Try adjusting your search or filter criteria
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<FilterAltIcon />}
                        onClick={handleResetFilters}
                        sx={{ mt: 1 }}
                      >
                        Clear Filters
                      </Button>
                    </Box>
                  </Grid>
                ) : (
                  paginatedAssignments.map((assignment) => (
                    <Grid item xs={12} sm={6} md={4} key={assignment.id}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                            transform: "translateY(-5px)",
                          },
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {assignment.isClassTeacher && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 16,
                              right: -30,
                              transform: "rotate(45deg)",
                              width: 120,
                              textAlign: "center",
                              bgcolor: "secondary.main",
                              color: "white",
                              py: 0.5,
                              zIndex: 1,
                              fontSize: "0.75rem",
                              fontWeight: "bold",
                            }}
                          >
                            CLASS TEACHER
                          </Box>
                        )}
                        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Avatar src={assignment.teacher.avatar} sx={{ width: 50, height: 50, mr: 2 }}>
                              {assignment.teacher.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="h6" fontWeight="bold">
                                {assignment.teacher.name}
                              </Typography>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="body2" color="text.secondary">
                                  {assignment.teacher.department}
                                </Typography>
                                <Box sx={{ mx: 0.5, color: "text.secondary" }}>•</Box>
                                {renderTeacherRating(assignment.teacher.rating)}
                              </Box>
                            </Box>
                          </Box>

                          <Divider sx={{ my: 1.5 }} />

                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              Assigned to
                            </Typography>
                            <Typography
                              variant="body1"
                              fontWeight="medium"
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <ClassIcon fontSize="small" sx={{ mr: 0.5, color: "primary.main" }} />
                              {assignment.class.name} ({assignment.class.students} students)
                            </Typography>
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              Teaching
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                              {assignment.subjects.map((subject: any) => (
                                <Chip
                                  key={subject.id}
                                  label={subject.name}
                                  size="small"
                                  icon={<BookIcon fontSize="small" />}
                                  sx={{ borderRadius: 1 }}
                                />
                              ))}
                            </Box>
                          </Box>

                          <Box
                            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "auto" }}
                          >
                            {renderStatusChip(assignment.status)}
                            <Box>
                              <Tooltip title="View Details">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => {
                                    setSelectedAssignment(assignment)
                                    setDetailsDialogOpen(true)
                                  }}
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton
                                  size="small"
                                  color="secondary"
                                  onClick={() => {
                                    setSelectedAssignment(assignment)
                                    handleEdit()
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <IconButton size="small" onClick={(e) => handleMenuOpen(e, assignment)}>
                                <MoreVertIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                  p: 1,
                }}
              >
                <TablePagination
                  component="div"
                  count={filteredAssignments.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[6, 12, 24, 48]}
                />
              </Box>
            </>
          )}
        </Box>
      </Paper>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 400 },
            p: 3,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Filter Assignments
          </Typography>
          <IconButton onClick={() => setFilterDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Department
          </Typography>
          <FormControl fullWidth>
            <Select
              multiple
              displayEmpty
              value={filters.departments}
              onChange={(e) => setFilters({ ...filters, departments: e.target.value as string[] })}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <Typography color="text.secondary">All Departments</Typography>
                }
                return selected.join(", ")
              }}
              sx={{ borderRadius: 2 }}
            >
              {departments.map((department) => (
                <MenuItem key={department} value={department}>
                  <Checkbox checked={filters.departments.indexOf(department) > -1} />
                  <ListItemText primary={department} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Class
          </Typography>
          <FormControl fullWidth>
            <Select
              multiple
              displayEmpty
              value={filters.classes}
              onChange={(e) => setFilters({ ...filters, classes: e.target.value as string[] })}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <Typography color="text.secondary">All Classes</Typography>
                }
                return selected.join(", ")
              }}
              sx={{ borderRadius: 2 }}
            >
              {classes.map((className) => (
                <MenuItem key={className} value={className}>
                  <Checkbox checked={filters.classes.indexOf(className) > -1} />
                  <ListItemText primary={className} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Subject
          </Typography>
          <FormControl fullWidth>
            <Select
              multiple
              displayEmpty
              value={filters.subjects}
              onChange={(e) => setFilters({ ...filters, subjects: e.target.value as string[] })}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <Typography color="text.secondary">All Subjects</Typography>
                }
                return selected.join(", ")
              }}
              sx={{ borderRadius: 2 }}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  <Checkbox checked={filters.subjects.indexOf(subject) > -1} />
                  <ListItemText primary={subject} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Status
          </Typography>
          <FormControl fullWidth>
            <Select
              multiple
              displayEmpty
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as string[] })}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <Typography color="text.secondary">All Statuses</Typography>
                }
                return selected.join(", ")
              }}
              sx={{ borderRadius: 2 }}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  <Checkbox checked={filters.status.indexOf(status) > -1} />
                  <ListItemText primary={status} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Role
          </Typography>
          <FormControl component="fieldset">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.isClassTeacher === true}
                    onChange={() =>
                      setFilters({
                        ...filters,
                        isClassTeacher: filters.isClassTeacher === true ? null : true,
                      })
                    }
                  />
                }
                label="Class Teacher"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.isClassTeacher === false}
                    onChange={() =>
                      setFilters({
                        ...filters,
                        isClassTeacher: filters.isClassTeacher === false ? null : false,
                      })
                    }
                  />
                }
                label="Subject Teacher"
              />
            </Box>
          </FormControl>
        </Box>

        <Box sx={{ mt: "auto", pt: 3, display: "flex", gap: 2 }}>
          <Button variant="outlined" fullWidth onClick={handleResetFilters} sx={{ borderRadius: 2 }}>
            Reset
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setFilterDrawerOpen(false)}
            sx={{
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
              },
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>

      {/* Assignment Details Dialog */}
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1,
          },
        }}
      >
        {selectedAssignment && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5" fontWeight="bold">
                  Assignment Details
                </Typography>
                <IconButton onClick={() => setDetailsDialogOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      height: "100%",
                      bgcolor: "rgba(25,118,210,0.03)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                        Teacher Information
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar src={selectedAssignment.teacher.avatar} sx={{ width: 64, height: 64, mr: 2 }}>
                          {selectedAssignment.teacher.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6">{selectedAssignment.teacher.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedAssignment.teacher.department}
                          </Typography>
                          {renderTeacherRating(selectedAssignment.teacher.rating)}
                        </Box>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Qualification
                          </Typography>
                          <Typography variant="body1">{selectedAssignment.teacher.qualification}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Experience
                          </Typography>
                          <Typography variant="body1">{selectedAssignment.teacher.experience}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      height: "100%",
                      bgcolor: "rgba(156,39,176,0.03)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom color="secondary">
                        Class Information
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar
                          sx={{
                            width: 64,
                            height: 64,
                            mr: 2,
                            bgcolor: "secondary.main",
                            fontSize: "1.5rem",
                          }}
                        >
                          {selectedAssignment.class.section}
                        </Avatar>
                        <Box>
                          <Typography variant="h6">{selectedAssignment.class.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Section {selectedAssignment.class.section}
                          </Typography>
                          <Chip
                            icon={<GroupsIcon fontSize="small" />}
                            label={`${selectedAssignment.class.students} Students`}
                            size="small"
                            variant="outlined"
                            sx={{ mt: 0.5, borderRadius: 1 }}
                          />
                        </Box>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Schedule
                          </Typography>
                          <Typography variant="body1">{selectedAssignment.class.schedule}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Role
                          </Typography>
                          <Chip
                            icon={selectedAssignment.isClassTeacher ? <ClassIcon /> : <BookIcon />}
                            label={selectedAssignment.isClassTeacher ? "Class Teacher" : "Subject Teacher"}
                            color={selectedAssignment.isClassTeacher ? "secondary" : "default"}
                            variant="outlined"
                            sx={{ borderRadius: 1 }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      bgcolor: "rgba(46,125,50,0.03)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom color="success.dark">
                        Assignment Details
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="text.secondary">
                            Subjects
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                            {selectedAssignment.subjects.map((subject: any) => (
                              <Chip
                                key={subject.id}
                                label={`${subject.name} (${subject.hoursPerWeek} hrs/week)`}
                                icon={<BookIcon fontSize="small" />}
                                size="small"
                                sx={{ borderRadius: 1 }}
                              />
                            ))}
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="text.secondary">
                            Status
                          </Typography>
                          <Box sx={{ mt: 1 }}>{renderStatusChip(selectedAssignment.status)}</Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="text.secondary">
                            Assignment Period
                          </Typography>
                          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                            <CalendarMonthIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary" }} />
                            {new Date(selectedAssignment.startDate).toLocaleDateString()} to{" "}
                            {new Date(selectedAssignment.endDate).toLocaleDateString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" color="text.secondary">
                            Created
                          </Typography>
                          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                            <CalendarMonthIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary" }} />
                            {new Date(selectedAssignment.createdAt).toLocaleDateString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">
                            Total Teaching Hours
                          </Typography>
                          <Typography variant="body1" fontWeight="medium" sx={{ mt: 0.5 }}>
                            {selectedAssignment.subjects.reduce(
                              (total: number, subject: any) => total + subject.hoursPerWeek,
                              0,
                            )}{" "}
                            hours per week
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button variant="outlined" onClick={() => setDetailsDialogOpen(false)} sx={{ borderRadius: 2 }}>
                Close
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<EditIcon />}
                onClick={() => {
                  setDetailsDialogOpen(false)
                  handleEdit()
                }}
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 4px 10px rgba(156,39,176,0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 15px rgba(156,39,176,0.4)",
                  },
                }}
              >
                Edit Assignment
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: 4,
          },
        }}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the assignment for <strong>{selectedAssignment?.teacher.name}</strong>{" "}
            teaching {selectedAssignment?.subjects.map((s: any) => s.name).join(", ")} to{" "}
            <strong>{selectedAssignment?.class.name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(211,47,47,0.3)",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(211,47,47,0.4)",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && Boolean(selectedAssignment)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <MenuItem onClick={handleViewDetails}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteDialog}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: "error" }}>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Export Menu */}
      <Menu
        anchorEl={exportMenuAnchorEl}
        open={Boolean(exportMenuAnchorEl)}
        onClose={handleExportMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <MenuItem onClick={() => handleExport("pdf")}>
          <ListItemIcon>
            <PictureAsPdf fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export as PDF</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleExport("excel")}>
          <ListItemIcon>
            <TableChart fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export as Excel</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleExport("csv")}>
          <ListItemIcon>
            <Description fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export as CSV</ListItemText>
        </MenuItem>
      </Menu>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Loading Backdrop */}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  )
}

// Missing imports that were needed
import { ViewModule, ViewList, PictureAsPdf, TableChart, Description } from "@mui/icons-material"
