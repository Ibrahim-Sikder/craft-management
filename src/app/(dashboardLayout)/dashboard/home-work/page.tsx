/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Switch,
  FormControlLabel,
  InputAdornment,
  Tabs,
  Tab,
  Drawer,
  ListItemText,
  ListItemIcon,
  Checkbox,
  LinearProgress,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material"
import {
  Search,
  FilterList,
  MoreVert,
  Edit,
  Delete,
  Visibility,
  Download,
  Send,
  CheckCircle,
  Warning,
  CalendarMonth,
  Class,
  Assignment,
  Add,
  Refresh,
  ArrowUpward,
  ArrowDownward,
  Bookmark,
  Print,
  Archive,
  ViewList,
  ViewModule,
  Close,
  Check,
  Help,
} from "@mui/icons-material"

// Sample data for homework list
const homeworkData = [
  {
    id: 1,
    title: "Mathematics Assignment - Quadratic Equations",
    subject: { id: 1, name: "Mathematics", icon: "📐" },
    class: { id: 9, name: "Class 9" },
    section: { id: 2, name: "Section B" },
    assignedDate: new Date(2023, 3, 15),
    dueDate: new Date(2023, 3, 20),
    status: "active",
    priority: "high",
    submissionCount: 28,
    totalStudents: 35,
    isImportant: true,
    description: "Solve the quadratic equations from Chapter 4, Exercise 4.2, Questions 1-15.",
    attachments: 2,
    maxMarks: 20,
    createdBy: { id: 1, name: "Mr. Ahmed Khan", avatar: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: 2,
    title: "Science Project - Ecosystem Model",
    subject: { id: 2, name: "Science", icon: "🔬" },
    class: { id: 8, name: "Class 8" },
    section: { id: 1, name: "Section A" },
    assignedDate: new Date(2023, 3, 10),
    dueDate: new Date(2023, 3, 25),
    status: "active",
    priority: "medium",
    submissionCount: 15,
    totalStudents: 32,
    isImportant: false,
    description: "Create a model of an ecosystem showing different trophic levels and energy flow.",
    attachments: 3,
    maxMarks: 50,
    createdBy: { id: 2, name: "Mrs. Fatima Ali", avatar: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: 3,
    title: "English Essay - My Favorite Book",
    subject: { id: 3, name: "English", icon: "📚" },
    class: { id: 7, name: "Class 7" },
    section: { id: 3, name: "Section C" },
    assignedDate: new Date(2023, 3, 5),
    dueDate: new Date(2023, 3, 12),
    status: "completed",
    priority: "low",
    submissionCount: 30,
    totalStudents: 30,
    isImportant: false,
    description: "Write a 500-word essay about your favorite book and why you like it.",
    attachments: 1,
    maxMarks: 25,
    createdBy: { id: 3, name: "Mr. Ibrahim Ahmed", avatar: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: 4,
    title: "History Assignment - Ancient Civilizations",
    subject: { id: 4, name: "History", icon: "🏛️" },
    class: { id: 10, name: "Class 10" },
    section: { id: 2, name: "Section B" },
    assignedDate: new Date(2023, 3, 8),
    dueDate: new Date(2023, 3, 18),
    status: "overdue",
    priority: "high",
    submissionCount: 20,
    totalStudents: 38,
    isImportant: true,
    description: "Research and write about one ancient civilization from Chapter 2.",
    attachments: 4,
    maxMarks: 30,
    createdBy: { id: 4, name: "Mrs. Aisha Begum", avatar: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: 5,
    title: "Computer Science - HTML Basics",
    subject: { id: 6, name: "Computer Science", icon: "💻" },
    class: { id: 9, name: "Class 9" },
    section: { id: 1, name: "Section A" },
    assignedDate: new Date(2023, 3, 12),
    dueDate: new Date(2023, 3, 22),
    status: "active",
    priority: "medium",
    submissionCount: 18,
    totalStudents: 36,
    isImportant: false,
    description: "Create a simple webpage using HTML with at least 5 different elements.",
    attachments: 2,
    maxMarks: 15,
    createdBy: { id: 5, name: "Mr. Omar Farooq", avatar: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: 6,
    title: "Geography - Map Reading Exercise",
    subject: { id: 5, name: "Geography", icon: "🌍" },
    class: { id: 8, name: "Class 8" },
    section: { id: 3, name: "Section C" },
    assignedDate: new Date(2023, 3, 7),
    dueDate: new Date(2023, 3, 14),
    status: "completed",
    priority: "low",
    submissionCount: 33,
    totalStudents: 33,
    isImportant: false,
    description: "Complete the map reading exercises from pages 45-48 in your textbook.",
    attachments: 1,
    maxMarks: 20,
    createdBy: { id: 6, name: "Mrs. Zainab Malik", avatar: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: 7,
    title: "Physics - Newton's Laws of Motion",
    subject: { id: 7, name: "Physics", icon: "⚛️" },
    class: { id: 10, name: "Class 10" },
    section: { id: 1, name: "Section A" },
    assignedDate: new Date(2023, 3, 14),
    dueDate: new Date(2023, 3, 21),
    status: "active",
    priority: "high",
    submissionCount: 25,
    totalStudents: 40,
    isImportant: true,
    description: "Solve the numerical problems related to Newton's Laws of Motion from Chapter 5.",
    attachments: 3,
    maxMarks: 25,
    createdBy: { id: 1, name: "Mr. Ahmed Khan", avatar: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: 8,
    title: "Chemistry - Periodic Table Quiz",
    subject: { id: 8, name: "Chemistry", icon: "🧪" },
    class: { id: 9, name: "Class 9" },
    section: { id: 2, name: "Section B" },
    assignedDate: new Date(2023, 3, 9),
    dueDate: new Date(2023, 3, 16),
    status: "completed",
    priority: "medium",
    submissionCount: 34,
    totalStudents: 35,
    isImportant: false,
    description: "Prepare for a quiz on the periodic table and element properties.",
    attachments: 2,
    maxMarks: 15,
    createdBy: { id: 2, name: "Mrs. Fatima Ali", avatar: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: 9,
    title: "Biology - Plant Cell Diagram",
    subject: { id: 9, name: "Biology", icon: "🧬" },
    class: { id: 8, name: "Class 8" },
    section: { id: 3, name: "Section C" },
    assignedDate: new Date(2023, 3, 11),
    dueDate: new Date(2023, 3, 19),
    status: "overdue",
    priority: "high",
    submissionCount: 20,
    totalStudents: 32,
    isImportant: true,
    description: "Draw and label a plant cell diagram with all organelles and their functions.",
    attachments: 1,
    maxMarks: 20,
    createdBy: { id: 3, name: "Mr. Ibrahim Ahmed", avatar: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: 10,
    title: "Art - Color Theory Project",
    subject: { id: 10, name: "Art", icon: "🎨" },
    class: { id: 7, name: "Class 7" },
    section: { id: 1, name: "Section A" },
    assignedDate: new Date(2023, 3, 13),
    dueDate: new Date(2023, 3, 23),
    status: "active",
    priority: "low",
    submissionCount: 22,
    totalStudents: 30,
    isImportant: false,
    description: "Create a color wheel and demonstrate primary, secondary, and tertiary colors.",
    attachments: 2,
    maxMarks: 15,
    createdBy: { id: 4, name: "Mrs. Aisha Begum", avatar: "/placeholder.svg?height=40&width=40" },
  },
]

// Sample data for classes, sections, and subjects
const classes = [
  { id: 7, name: "Class 7" },
  { id: 8, name: "Class 8" },
  { id: 9, name: "Class 9" },
  { id: 10, name: "Class 10" },
]

const sections = [
  { id: 1, name: "Section A" },
  { id: 2, name: "Section B" },
  { id: 3, name: "Section C" },
]

const subjects = [
  { id: 1, name: "Mathematics", icon: "📐" },
  { id: 2, name: "Science", icon: "🔬" },
  { id: 3, name: "English", icon: "📚" },
  { id: 4, name: "History", icon: "🏛️" },
  { id: 5, name: "Geography", icon: "🌍" },
  { id: 6, name: "Computer Science", icon: "💻" },
  { id: 7, name: "Physics", icon: "⚛️" },
  { id: 8, name: "Chemistry", icon: "🧪" },
  { id: 9, name: "Biology", icon: "🧬" },
  { id: 10, name: "Art", icon: "🎨" },
]

// Status options
const statusOptions = [
  { value: "all", label: "All Status", color: "#757575" },
  { value: "active", label: "Active", color: "#4caf50" },
  { value: "completed", label: "Completed", color: "#2196f3" },
  { value: "overdue", label: "Overdue", color: "#f44336" },
]

// Priority options
const priorityOptions = [
  { value: "all", label: "All Priorities", color: "#757575" },
  { value: "low", label: "Low", color: "#4caf50" },
  { value: "medium", label: "Medium", color: "#ff9800" },
  { value: "high", label: "High", color: "#f44336" },
]

export default function HomeworkList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"))

  // State for filters
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState<number | string>("all")
  const [selectedSection, setSelectedSection] = useState<number | string>("all")
  const [selectedSubject, setSelectedSubject] = useState<number | string>("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  })
  const [showImportantOnly, setShowImportantOnly] = useState(false)
  const [showMyHomeworkOnly, setShowMyHomeworkOnly] = useState(false)

  // State for table
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order, setOrder] = useState<"asc" | "desc">("desc")
  const [orderBy, setOrderBy] = useState<string>("dueDate")
  const [selected, setSelected] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"list" | "grid" | "calendar">("list")
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [homeworkToDelete, setHomeworkToDelete] = useState<number | null>(null)

  // State for more menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuHomeworkId, setMenuHomeworkId] = useState<number | null>(null)

  // Filter homework data based on filters
  const filteredHomework = homeworkData.filter((homework) => {
    // Search query filter
    if (
      searchQuery &&
      !homework.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !homework.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Class filter
    if (selectedClass !== "all" && homework.class.id !== selectedClass) {
      return false
    }

    // Section filter
    if (selectedSection !== "all" && homework.section.id !== selectedSection) {
      return false
    }

    // Subject filter
    if (selectedSubject !== "all" && homework.subject.id !== selectedSubject) {
      return false
    }

    // Status filter
    if (selectedStatus !== "all" && homework.status !== selectedStatus) {
      return false
    }

    // Priority filter
    if (selectedPriority !== "all" && homework.priority !== selectedPriority) {
      return false
    }

    // Date range filter
    if (dateRange.start && dateRange.end) {
      const homeworkDate = new Date(homework.dueDate)
      if (homeworkDate < dateRange.start || homeworkDate > dateRange.end) {
        return false
      }
    }

    // Important only filter
    if (showImportantOnly && !homework.isImportant) {
      return false
    }

    // My homework only filter (simplified for demo)
    if (showMyHomeworkOnly && homework.createdBy.id !== 1) {
      return false
    }

    return true
  })

  // Sort homework data
  const sortedHomework = [...filteredHomework].sort((a, b) => {
    let comparison = 0

    if (orderBy === "title") {
      comparison = a.title.localeCompare(b.title)
    } else if (orderBy === "subject") {
      comparison = a.subject.name.localeCompare(b.subject.name)
    } else if (orderBy === "class") {
      comparison = a.class.name.localeCompare(b.class.name)
    } else if (orderBy === "assignedDate") {
      comparison = new Date(a.assignedDate).getTime() - new Date(b.assignedDate).getTime()
    } else if (orderBy === "dueDate") {
      comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    } else if (orderBy === "status") {
      comparison = a.status.localeCompare(b.status)
    } else if (orderBy === "priority") {
      const priorityOrder = { low: 1, medium: 2, high: 3 }
      comparison =
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder]
    } else if (orderBy === "submissionCount") {
      comparison = a.submissionCount - b.submissionCount
    }

    return order === "asc" ? comparison : -comparison
  })

  // Pagination
  const paginatedHomework = sortedHomework.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  // Handle sort request
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

  // Handle select all click
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredHomework.map((homework) => homework.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  // Handle click on checkbox
  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: number[] = []

    if (selectedIndex === -1) {
      newSelected = [...selected, id]
    } else {
      newSelected = selected.filter((item) => item !== id)
    }

    setSelected(newSelected)
  }

  // Check if homework is selected
  const isSelected = (id: number) => selected.indexOf(id) !== -1

  // Handle more menu open
  const handleMoreMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setAnchorEl(event.currentTarget)
    setMenuHomeworkId(id)
  }

  // Handle more menu close
  const handleMoreMenuClose = () => {
    setAnchorEl(null)
    setMenuHomeworkId(null)
  }

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    if (newValue === 0) setSelectedStatus("all")
    if (newValue === 1) setSelectedStatus("active")
    if (newValue === 2) setSelectedStatus("completed")
    if (newValue === 3) setSelectedStatus("overdue")
  }

  // Handle view mode change
  const handleViewModeChange = (mode: "list" | "grid" | "calendar") => {
    setViewMode(mode)
  }

  // Handle refresh
  const handleRefresh = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccessMessage("Homework list refreshed successfully")
      setSuccess(true)
    }, 1000)
  }

  // Handle batch actions
  const handleBatchAction = (action: string) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccessMessage(`${selected.length} homework ${action} successfully`)
      setSuccess(true)
      setSelected([])
    }, 1000)
  }

  // Handle delete dialog
  const handleDeleteDialogOpen = (id: number) => {
    setHomeworkToDelete(id)
    setDeleteDialogOpen(true)
    handleMoreMenuClose()
  }

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccessMessage("Homework deleted successfully")
      setSuccess(true)
      setDeleteDialogOpen(false)
      setHomeworkToDelete(null)
    }, 1000)
  }

  // Handle filter drawer
  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen)
  }

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedClass("all")
    setSelectedSection("all")
    setSelectedSubject("all")
    setSelectedStatus("all")
    setSelectedPriority("all")
    setDateRange({ start: null, end: null })
    setShowImportantOnly(false)
    setShowMyHomeworkOnly(false)
    setTabValue(0)
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#4caf50"
      case "completed":
        return "#2196f3"
      case "overdue":
        return "#f44336"
      default:
        return "#757575"
    }
  }

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "#4caf50"
      case "medium":
        return "#ff9800"
      case "high":
        return "#f44336"
      default:
        return "#757575"
    }
  }

  // Calculate statistics
  const stats = {
    total: homeworkData.length,
    active: homeworkData.filter((hw) => hw.status === "active").length,
    completed: homeworkData.filter((hw) => hw.status === "completed").length,
    overdue: homeworkData.filter((hw) => hw.status === "overdue").length,
    important: homeworkData.filter((hw) => hw.isImportant).length,
  }

  // Calculate submission rate
  const calculateSubmissionRate = (homework: (typeof homeworkData)[0]) => {
    return (homework.submissionCount / homework.totalStudents) * 100
  }

  return (
    <Box sx={{ p: 3, maxWidth: "100%" }}>
      {/* Header Section */}
      <Card elevation={3} sx={{ mb: 4, borderRadius: 2, overflow: "hidden" }}>
        <Box
          sx={{
            p: 2,
            background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
            color: "white",
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" fontWeight="bold">
                Craft International Institute
              </Typography>
              <Typography variant="subtitle1">Homework Management</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
                href="/dashboard/home-work/add"
              >
                Add New Homework
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              bgcolor: "#e8f5e9",
              height: "100%",
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" color="text.secondary">
                  Active
                </Typography>
                <Avatar sx={{ bgcolor: "#4caf50" }}>
                  <Assignment />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ my: 2, fontWeight: "bold", color: "#2e7d32" }}>
                {stats.active}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {((stats.active / stats.total) * 100).toFixed(0)}% of total homework
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              bgcolor: "#e3f2fd",
              height: "100%",
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" color="text.secondary">
                  Completed
                </Typography>
                <Avatar sx={{ bgcolor: "#2196f3" }}>
                  <CheckCircle />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ my: 2, fontWeight: "bold", color: "#1565c0" }}>
                {stats.completed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {((stats.completed / stats.total) * 100).toFixed(0)}% of total homework
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              bgcolor: "#ffebee",
              height: "100%",
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" color="text.secondary">
                  Overdue
                </Typography>
                <Avatar sx={{ bgcolor: "#f44336" }}>
                  <Warning />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ my: 2, fontWeight: "bold", color: "#c62828" }}>
                {stats.overdue}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {((stats.overdue / stats.total) * 100).toFixed(0)}% of total homework
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              bgcolor: "#fff8e1",
              height: "100%",
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" color="text.secondary">
                  Important
                </Typography>
                <Avatar sx={{ bgcolor: "#ffc107" }}>
                  <Bookmark />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ my: 2, fontWeight: "bold", color: "#f57f17" }}>
                {stats.important}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {((stats.important / stats.total) * 100).toFixed(0)}% of total homework
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Card elevation={2} sx={{ borderRadius: 2, mb: 4 }}>
        <CardContent>
          {/* Tabs and Actions */}
          <Box sx={{ display: "flex", flexDirection: isTablet ? "column" : "row", gap: 2, mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : undefined}
              sx={{ flexGrow: 1, borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="All" icon={<ViewList />} iconPosition="start" />
              <Tab
                label="Active"
                icon={<Assignment />}
                iconPosition="start"
                sx={{ color: tabValue === 1 ? "#4caf50" : "inherit" }}
              />
              <Tab
                label="Completed"
                icon={<CheckCircle />}
                iconPosition="start"
                sx={{ color: tabValue === 2 ? "#2196f3" : "inherit" }}
              />
              <Tab
                label="Overdue"
                icon={<Warning />}
                iconPosition="start"
                sx={{ color: tabValue === 3 ? "#f44336" : "inherit" }}
              />
            </Tabs>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Tooltip title="Refresh">
                <IconButton onClick={handleRefresh} color="primary">
                  <Refresh />
                </IconButton>
              </Tooltip>
              <Tooltip title="Filter">
                <IconButton onClick={toggleFilterDrawer} color="primary">
                  <FilterList />
                </IconButton>
              </Tooltip>
              <Tooltip title="List View">
                <IconButton
                  onClick={() => handleViewModeChange("list")}
                  color={viewMode === "list" ? "primary" : "default"}
                >
                  <ViewList />
                </IconButton>
              </Tooltip>
              <Tooltip title="Grid View">
                <IconButton
                  onClick={() => handleViewModeChange("grid")}
                  color={viewMode === "grid" ? "primary" : "default"}
                >
                  <ViewModule />
                </IconButton>
              </Tooltip>
              <Tooltip title="Calendar View">
                <IconButton
                  onClick={() => handleViewModeChange("calendar")}
                  color={viewMode === "calendar" ? "primary" : "default"}
                >
                  <CalendarMonth />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Search and Quick Filters */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search homework by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery("")}>
                        <Close fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
              />
            </Grid>
            {!isMobile && (
              <>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Class</InputLabel>
                    <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} label="Class">
                      <MenuItem value="all">All Classes</MenuItem>
                      {classes.map((cls) => (
                        <MenuItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Subject</InputLabel>
                    <Select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      label="Subject"
                    >
                      <MenuItem value="all">All Subjects</MenuItem>
                      {subjects.map((subject) => (
                        <MenuItem key={subject.id} value={subject.id}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="body2" sx={{ mr: 1 }}>
                              {subject.icon}
                            </Typography>
                            {subject.name}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value as string)}
                      label="Priority"
                    >
                      {priorityOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {option.value !== "all" && (
                              <Box
                                sx={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: "50%",
                                  bgcolor: option.color,
                                  mr: 1,
                                }}
                              />
                            )}
                            {option.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={showImportantOnly}
                          onChange={(e) => setShowImportantOnly(e.target.checked)}
                          color="primary"
                          size="small"
                        />
                      }
                      label="Important"
                      sx={{ mr: 1 }}
                    />
                  </Box>
                </Grid>
              </>
            )}
          </Grid>

          {/* Selected Actions */}
          {selected.length > 0 && (
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "primary.light",
                color: "primary.contrastText",
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle1">
                {selected.length} {selected.length === 1 ? "homework" : "homeworks"} selected
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Archive />}
                  onClick={() => handleBatchAction("archived")}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
                >
                  Archive
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Print />}
                  onClick={() => handleBatchAction("printed")}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
                >
                  Print
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleBatchAction("deleted")}
                  sx={{ bgcolor: "rgba(244,67,54,0.8)", "&:hover": { bgcolor: "rgba(244,67,54,0.9)" } }}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          )}

          {/* Loading Indicator */}
          {loading && <LinearProgress sx={{ mb: 2 }} />}

          {/* List View */}
          {viewMode === "list" && (
            <>
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                <Table sx={{ minWidth: 650 }} size="medium">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={selected.length > 0 && selected.length < filteredHomework.length}
                          checked={filteredHomework.length > 0 && selected.length === filteredHomework.length}
                          onChange={handleSelectAllClick}
                        />
                      </TableCell>
                      <TableCell
                        sortDirection={orderBy === "title" ? order : false}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRequestSort("title")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Title
                          {orderBy === "title" ? (
                            <Box component="span" sx={{ ml: 1 }}>
                              {order === "desc" ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />}
                            </Box>
                          ) : null}
                        </Box>
                      </TableCell>
                      <TableCell
                        sortDirection={orderBy === "subject" ? order : false}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRequestSort("subject")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Subject
                          {orderBy === "subject" ? (
                            <Box component="span" sx={{ ml: 1 }}>
                              {order === "desc" ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />}
                            </Box>
                          ) : null}
                        </Box>
                      </TableCell>
                      <TableCell
                        sortDirection={orderBy === "class" ? order : false}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRequestSort("class")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Class
                          {orderBy === "class" ? (
                            <Box component="span" sx={{ ml: 1 }}>
                              {order === "desc" ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />}
                            </Box>
                          ) : null}
                        </Box>
                      </TableCell>
                      <TableCell
                        sortDirection={orderBy === "dueDate" ? order : false}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRequestSort("dueDate")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Due Date
                          {orderBy === "dueDate" ? (
                            <Box component="span" sx={{ ml: 1 }}>
                              {order === "desc" ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />}
                            </Box>
                          ) : null}
                        </Box>
                      </TableCell>
                      <TableCell
                        sortDirection={orderBy === "status" ? order : false}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRequestSort("status")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Status
                          {orderBy === "status" ? (
                            <Box component="span" sx={{ ml: 1 }}>
                              {order === "desc" ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />}
                            </Box>
                          ) : null}
                        </Box>
                      </TableCell>
                      <TableCell
                        sortDirection={orderBy === "submissionCount" ? order : false}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRequestSort("submissionCount")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Submissions
                          {orderBy === "submissionCount" ? (
                            <Box component="span" sx={{ ml: 1 }}>
                              {order === "desc" ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />}
                            </Box>
                          ) : null}
                        </Box>
                      </TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedHomework.length > 0 ? (
                      paginatedHomework.map((homework) => {
                        const isItemSelected = isSelected(homework.id)
                        return (
                          <TableRow
                            hover
                            key={homework.id}
                            selected={isItemSelected}
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: "rgba(25, 118, 210, 0.08)",
                              },
                            }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} onClick={() => handleClick(homework.id)} />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                {homework.isImportant && (
                                  <Tooltip title="Important">
                                    <Bookmark sx={{ mr: 1, color: "#ffc107" }} />
                                  </Tooltip>
                                )}
                                <Typography
                                  variant="body1"
                                  sx={{ fontWeight: homework.isImportant ? "bold" : "normal" }}
                                >
                                  {homework.title}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography variant="body2" sx={{ mr: 0.5 }}>
                                      {homework.subject.icon}
                                    </Typography>
                                    {homework.subject.name}
                                  </Box>
                                }
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {homework.class.name}, {homework.section.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <CalendarMonth sx={{ mr: 0.5, fontSize: 16, color: "text.secondary" }} />
                                <Typography variant="body2">{formatDate(homework.dueDate)}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={homework.status.charAt(0).toUpperCase() + homework.status.slice(1)}
                                size="small"
                                sx={{
                                  bgcolor: `${getStatusColor(homework.status)}20`,
                                  color: getStatusColor(homework.status),
                                  fontWeight: "bold",
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography variant="body2">
                                  {homework.submissionCount}/{homework.totalStudents}
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={calculateSubmissionRate(homework)}
                                  sx={{
                                    width: 60,
                                    height: 6,
                                    borderRadius: 3,
                                    bgcolor: "rgba(0,0,0,0.1)",
                                    "& .MuiLinearProgress-bar": {
                                      bgcolor:
                                        calculateSubmissionRate(homework) < 50
                                          ? "#f44336"
                                          : calculateSubmissionRate(homework) < 80
                                            ? "#ff9800"
                                            : "#4caf50",
                                    },
                                  }}
                                />
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex" }}>
                                <Tooltip title="View">
                                  <IconButton size="small" color="primary">
                                    <Visibility fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                  <IconButton size="small" color="primary">
                                    <Edit fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="More">
                                  <IconButton size="small" onClick={(e) => handleMoreMenuOpen(e, homework.id)}>
                                    <MoreVert fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                            <Assignment sx={{ fontSize: 48, color: "text.disabled" }} />
                            <Typography variant="h6" color="text.secondary">
                              No homework found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Try adjusting your filters or search query
                            </Typography>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<Refresh />}
                              onClick={resetFilters}
                              sx={{ mt: 1 }}
                            >
                              Reset Filters
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredHomework.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}

          {/* Grid View */}
          {viewMode === "grid" && (
            <>
              <Grid container spacing={3}>
                {paginatedHomework.length > 0 ? (
                  paginatedHomework.map((homework) => (
                    <Grid item xs={12} sm={6} md={4} key={homework.id}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          position: "relative",
                          transition: "transform 0.2s, box-shadow 0.2s",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 3,
                          },
                          ...(isSelected(homework.id) && {
                            border: "2px solid",
                            borderColor: "primary.main",
                          }),
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            p: 1,
                            display: "flex",
                            gap: 0.5,
                          }}
                        >
                          <Checkbox
                            checked={isSelected(homework.id)}
                            onChange={() => handleClick(homework.id)}
                            size="small"
                          />
                          <IconButton size="small" onClick={(e) => handleMoreMenuOpen(e, homework.id)}>
                            <MoreVert fontSize="small" />
                          </IconButton>
                        </Box>
                        <Box
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: 1,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            {homework.isImportant && <Bookmark sx={{ mr: 1, color: "#ffc107" }} />}
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: homework.isImportant ? "bold" : "medium",
                                fontSize: "1rem",
                                lineHeight: 1.2,
                                mb: 1,
                              }}
                            >
                              {homework.title}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                            <Chip
                              label={
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                  <Typography variant="body2" sx={{ mr: 0.5 }}>
                                    {homework.subject.icon}
                                  </Typography>
                                  {homework.subject.name}
                                </Box>
                              }
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              label={`${homework.class.name}, ${homework.section.name}`}
                              size="small"
                              variant="outlined"
                              icon={<Class fontSize="small" />}
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {homework.description}
                          </Typography>
                          <Box sx={{ mt: "auto" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <CalendarMonth sx={{ mr: 0.5, fontSize: 16, color: "text.secondary" }} />
                                <Typography variant="body2">{formatDate(homework.dueDate)}</Typography>
                              </Box>
                              <Chip
                                label={homework.status.charAt(0).toUpperCase() + homework.status.slice(1)}
                                size="small"
                                sx={{
                                  bgcolor: `${getStatusColor(homework.status)}20`,
                                  color: getStatusColor(homework.status),
                                  fontWeight: "bold",
                                }}
                              />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Typography variant="body2">
                                Submissions: {homework.submissionCount}/{homework.totalStudents}
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={calculateSubmissionRate(homework)}
                                sx={{
                                  width: 60,
                                  height: 6,
                                  borderRadius: 3,
                                  bgcolor: "rgba(0,0,0,0.1)",
                                  "& .MuiLinearProgress-bar": {
                                    bgcolor:
                                      calculateSubmissionRate(homework) < 50
                                        ? "#f44336"
                                        : calculateSubmissionRate(homework) < 80
                                          ? "#ff9800"
                                          : "#4caf50",
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar src={homework.createdBy.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                            <Typography variant="caption">{homework.createdBy.name}</Typography>
                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Tooltip title="View">
                              <IconButton size="small" color="primary">
                                <Visibility fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton size="small" color="primary">
                                <Edit fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        py: 4,
                      }}
                    >
                      <Assignment sx={{ fontSize: 48, color: "text.disabled" }} />
                      <Typography variant="h6" color="text.secondary">
                        No homework found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Try adjusting your filters or search query
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Refresh />}
                        onClick={resetFilters}
                        sx={{ mt: 1 }}
                      >
                        Reset Filters
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <TablePagination
                  rowsPerPageOptions={[6, 12, 24]}
                  component="div"
                  count={filteredHomework.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            </>
          )}

          {/* Calendar View */}
          {viewMode === "calendar" && (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Calendar View
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 2,
                  p: 4,
                }}
              >
                <CalendarMonth sx={{ fontSize: 60, color: "text.disabled" }} />
                <Typography variant="body1" color="text.secondary">
                  Calendar view is coming soon!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This feature will allow you to view homework assignments in a calendar format.
                </Typography>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* More Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMoreMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleMoreMenuClose}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMoreMenuClose}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMoreMenuClose}>
          <ListItemIcon>
            <Download fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMoreMenuClose}>
          <ListItemIcon>
            <Send fontSize="small" />
          </ListItemIcon>
          <ListItemText>Send Reminder</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleDeleteDialogOpen(menuHomeworkId!)}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Filter Drawer */}
      <Drawer anchor="right" open={filterDrawerOpen} onClose={toggleFilterDrawer}>
        <Box sx={{ width: 300, p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={toggleFilterDrawer}>
              <Close />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} label="Class">
                <MenuItem value="all">All Classes</MenuItem>
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Section</InputLabel>
              <Select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} label="Section">
                <MenuItem value="all">All Sections</MenuItem>
                {sections.map((section) => (
                  <MenuItem key={section.id} value={section.id}>
                    {section.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} label="Subject">
                <MenuItem value="all">All Subjects</MenuItem>
                {subjects.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body2" sx={{ mr: 1 }}>
                        {subject.icon}
                      </Typography>
                      {subject.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as string)}
                label="Status"
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {option.value !== "all" && (
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            bgcolor: option.color,
                            mr: 1,
                          }}
                        />
                      )}
                      {option.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value as string)}
                label="Priority"
              >
                {priorityOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {option.value !== "all" && (
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            bgcolor: option.color,
                            mr: 1,
                          }}
                        />
                      )}
                      {option.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={dateRange.start ? dateRange.start.toISOString().split("T")[0] : ""}
              onChange={(e) => {
                const newDate = e.target.value ? new Date(e.target.value) : null
                setDateRange({ ...dateRange, start: newDate })
              }}
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={dateRange.end ? dateRange.end.toISOString().split("T")[0] : ""}
              onChange={(e) => {
                const newDate = e.target.value ? new Date(e.target.value) : null
                setDateRange({ ...dateRange, end: newDate })
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showImportantOnly}
                  onChange={(e) => setShowImportantOnly(e.target.checked)}
                  color="primary"
                />
              }
              label="Show Important Only"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showMyHomeworkOnly}
                  onChange={(e) => setShowMyHomeworkOnly(e.target.checked)}
                  color="primary"
                />
              }
              label="Show My Homework Only"
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button variant="outlined" onClick={resetFilters} startIcon={<Refresh />}>
                Reset
              </Button>
              <Button variant="contained" onClick={toggleFilterDrawer} startIcon={<Check />}>
                Apply Filters
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Homework</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this homework? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Delete />}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Help Card */}
      <Card elevation={1} sx={{ mt: 4, borderRadius: 2, bgcolor: "#f5f5f5" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Help sx={{ mr: 2, color: "text.secondary" }} />
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Managing Homework
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Use filters to quickly find specific homework assignments
                <br />• Click on column headers to sort the homework list
                <br />• Select multiple homework assignments for batch actions
                <br />• Switch between list and grid views for different perspectives
                <br />• Click on a homework title to view detailed information
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
