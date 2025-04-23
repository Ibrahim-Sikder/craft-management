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
  Badge,
} from "@mui/material"
import {
  Search,
  FilterList,
  MoreVert,
  Edit,
  Delete,
  Visibility,
  Add,
  Refresh,
  ArrowUpward,
  ArrowDownward,
  Close,
  Check,
  Help,
  AttachMoney,
  Percent,
  CheckCircle,
  Block,
  ContentCopy,
  Download,
  Archive,
  Notifications,
  ViewList,
  ViewModule,
  Receipt,
  LocalAtm,
  Bookmark,
  BookmarkBorder,
} from "@mui/icons-material"

// Sample data for fine types
const fineTypesData = [
  {
    id: 1,
    name: "Late Fee Payment",
    category: { id: 1, name: "Late Payment" },
    description: "Fine for late payment of school fees",
    isPercentage: true,
    amount: "5",
    isAbsentFine: false,
    hasDueDate: true,
    gracePeriod: 7,
    isRecurring: true,
    recurringFrequency: "monthly",
    isActive: true,
    applyToAll: true,
    selectedClasses: [],
    selectedSections: [],
    notificationEnabled: true,
    fineIncreaseEnabled: true,
    fineIncreaseRate: 2,
    fineIncreaseFrequency: "weekly",
    maxFineAmount: "15",
    fineApplicationMethod: "immediate",
    createdBy: { id: 1, name: "Admin User", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2023, 2, 15),
    isImportant: true,
    usageCount: 245,
  },
  {
    id: 2,
    name: "Library Book Late Return",
    category: { id: 4, name: "Library" },
    description: "Fine for late return of library books",
    isPercentage: false,
    amount: "10",
    isAbsentFine: false,
    hasDueDate: true,
    gracePeriod: 0,
    isRecurring: true,
    recurringFrequency: "daily",
    isActive: true,
    applyToAll: true,
    selectedClasses: [],
    selectedSections: [],
    notificationEnabled: true,
    fineIncreaseEnabled: false,
    fineIncreaseRate: 0,
    fineIncreaseFrequency: "",
    maxFineAmount: "",
    fineApplicationMethod: "next_bill",
    createdBy: { id: 2, name: "Library Manager", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2023, 1, 20),
    isImportant: false,
    usageCount: 178,
  },
  {
    id: 3,
    name: "Absence Fine",
    category: { id: 2, name: "Absence" },
    description: "Fine for unauthorized absence from school",
    isPercentage: false,
    amount: "50",
    isAbsentFine: true,
    hasDueDate: false,
    gracePeriod: 0,
    isRecurring: false,
    recurringFrequency: "",
    isActive: true,
    applyToAll: false,
    selectedClasses: [9, 10],
    selectedSections: [1, 2, 3],
    notificationEnabled: true,
    fineIncreaseEnabled: false,
    fineIncreaseRate: 0,
    fineIncreaseFrequency: "",
    maxFineAmount: "",
    fineApplicationMethod: "immediate",
    createdBy: { id: 3, name: "Discipline Officer", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2023, 0, 10),
    isImportant: true,
    usageCount: 320,
  },
  {
    id: 4,
    name: "Damaged Property Fine",
    category: { id: 5, name: "Damage" },
    description: "Fine for damaging school property",
    isPercentage: false,
    amount: "500",
    isAbsentFine: false,
    hasDueDate: true,
    gracePeriod: 14,
    isRecurring: false,
    recurringFrequency: "",
    isActive: true,
    applyToAll: true,
    selectedClasses: [],
    selectedSections: [],
    notificationEnabled: true,
    fineIncreaseEnabled: true,
    fineIncreaseRate: 10,
    fineIncreaseFrequency: "monthly",
    maxFineAmount: "1000",
    fineApplicationMethod: "manual",
    createdBy: { id: 1, name: "Admin User", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2023, 3, 5),
    isImportant: false,
    usageCount: 42,
  },
  {
    id: 5,
    name: "Improper Uniform Fine",
    category: { id: 6, name: "Uniform" },
    description: "Fine for not wearing proper school uniform",
    isPercentage: false,
    amount: "100",
    isAbsentFine: false,
    hasDueDate: false,
    gracePeriod: 0,
    isRecurring: false,
    recurringFrequency: "",
    isActive: true,
    applyToAll: false,
    selectedClasses: [6, 7, 8, 9, 10],
    selectedSections: [],
    notificationEnabled: true,
    fineIncreaseEnabled: false,
    fineIncreaseRate: 0,
    fineIncreaseFrequency: "",
    maxFineAmount: "",
    fineApplicationMethod: "immediate",
    createdBy: { id: 3, name: "Discipline Officer", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2023, 2, 25),
    isImportant: false,
    usageCount: 156,
  },
  {
    id: 6,
    name: "Late Assignment Submission",
    category: { id: 3, name: "Discipline" },
    description: "Fine for late submission of assignments",
    isPercentage: true,
    amount: "2",
    isAbsentFine: false,
    hasDueDate: true,
    gracePeriod: 3,
    isRecurring: true,
    recurringFrequency: "daily",
    isActive: false,
    applyToAll: false,
    selectedClasses: [8, 9, 10],
    selectedSections: [1, 2],
    notificationEnabled: true,
    fineIncreaseEnabled: true,
    fineIncreaseRate: 1,
    fineIncreaseFrequency: "daily",
    maxFineAmount: "10",
    fineApplicationMethod: "next_bill",
    createdBy: { id: 4, name: "Academic Coordinator", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2023, 1, 15),
    isImportant: false,
    usageCount: 0,
  },
  {
    id: 7,
    name: "Exam Registration Late Fee",
    category: { id: 1, name: "Late Payment" },
    description: "Fine for late registration for exams",
    isPercentage: true,
    amount: "10",
    isAbsentFine: false,
    hasDueDate: true,
    gracePeriod: 0,
    isRecurring: false,
    recurringFrequency: "",
    isActive: true,
    applyToAll: true,
    selectedClasses: [],
    selectedSections: [],
    notificationEnabled: true,
    fineIncreaseEnabled: false,
    fineIncreaseRate: 0,
    fineIncreaseFrequency: "",
    maxFineAmount: "",
    fineApplicationMethod: "immediate",
    createdBy: { id: 4, name: "Academic Coordinator", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2023, 3, 10),
    isImportant: true,
    usageCount: 89,
  },
  {
    id: 8,
    name: "ID Card Replacement Fee",
    category: { id: 7, name: "Other" },
    description: "Fee for replacing lost or damaged ID cards",
    isPercentage: false,
    amount: "150",
    isAbsentFine: false,
    hasDueDate: false,
    gracePeriod: 0,
    isRecurring: false,
    recurringFrequency: "",
    isActive: true,
    applyToAll: true,
    selectedClasses: [],
    selectedSections: [],
    notificationEnabled: false,
    fineIncreaseEnabled: false,
    fineIncreaseRate: 0,
    fineIncreaseFrequency: "",
    maxFineAmount: "",
    fineApplicationMethod: "immediate",
    createdBy: { id: 1, name: "Admin User", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2023, 0, 5),
    isImportant: false,
    usageCount: 67,
  },
  {
    id: 9,
    name: "Sports Equipment Damage",
    category: { id: 5, name: "Damage" },
    description: "Fine for damaging sports equipment",
    isPercentage: false,
    amount: "300",
    isAbsentFine: false,
    hasDueDate: true,
    gracePeriod: 7,
    isRecurring: false,
    recurringFrequency: "",
    isActive: true,
    applyToAll: false,
    selectedClasses: [6, 7, 8, 9, 10],
    selectedSections: [],
    notificationEnabled: true,
    fineIncreaseEnabled: false,
    fineIncreaseRate: 0,
    fineIncreaseFrequency: "",
    maxFineAmount: "",
    fineApplicationMethod: "manual",
    createdBy: { id: 5, name: "Sports Teacher", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2023, 2, 20),
    isImportant: false,
    usageCount: 28,
  },
  {
    id: 10,
    name: "Laboratory Equipment Damage",
    category: { id: 5, name: "Damage" },
    description: "Fine for damaging laboratory equipment",
    isPercentage: false,
    amount: "500",
    isAbsentFine: false,
    hasDueDate: true,
    gracePeriod: 7,
    isRecurring: false,
    recurringFrequency: "",
    isActive: true,
    applyToAll: false,
    selectedClasses: [8, 9, 10],
    selectedSections: [],
    notificationEnabled: true,
    fineIncreaseEnabled: false,
    fineIncreaseRate: 0,
    fineIncreaseFrequency: "",
    maxFineAmount: "",
    fineApplicationMethod: "manual",
    createdBy: { id: 6, name: "Science Teacher", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2023, 1, 28),
    isImportant: false,
    usageCount: 15,
  },
]

// Sample data for classes and sections
const classes = [
  { id: 1, name: "Class 1" },
  { id: 2, name: "Class 2" },
  { id: 3, name: "Class 3" },
  { id: 4, name: "Class 4" },
  { id: 5, name: "Class 5" },
  { id: 6, name: "Class 6" },
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

// Sample fine categories
const fineCategories = [
  { id: 1, name: "Late Payment", color: "#4caf50" },
  { id: 2, name: "Absence", color: "#f44336" },
  { id: 3, name: "Discipline", color: "#ff9800" },
  { id: 4, name: "Library", color: "#2196f3" },
  { id: 5, name: "Damage", color: "#9c27b0" },
  { id: 6, name: "Uniform", color: "#3f51b5" },
  { id: 7, name: "Other", color: "#607d8b" },
]

export default function FineTypeList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"))

  // State for filters
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<number | string>("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCalculationType, setSelectedCalculationType] = useState("all")
  const [showImportantOnly, setShowImportantOnly] = useState(false)
  const [showActiveOnly, setShowActiveOnly] = useState(true)
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  })

  // State for table
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order, setOrder] = useState<"asc" | "desc">("desc")
  const [orderBy, setOrderBy] = useState<string>("createdAt")
  const [selected, setSelected] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [fineTypeToDelete, setFineTypeToDelete] = useState<number | null>(null)

  // State for more menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuFineTypeId, setMenuFineTypeId] = useState<number | null>(null)

  // Filter fine types data based on filters
  const filteredFineTypes = fineTypesData.filter((fineType) => {
    // Search query filter
    if (
      searchQuery &&
      !fineType.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !fineType.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Category filter
    if (selectedCategory !== "all" && fineType.category.id !== selectedCategory) {
      return false
    }

    // Status filter
    if (selectedStatus !== "all") {
      if (selectedStatus === "active" && !fineType.isActive) return false
      if (selectedStatus === "inactive" && fineType.isActive) return false
    }

    // Calculation type filter
    if (selectedCalculationType !== "all") {
      if (selectedCalculationType === "percentage" && !fineType.isPercentage) return false
      if (selectedCalculationType === "fixed" && fineType.isPercentage) return false
    }

    // Active only filter
    if (showActiveOnly && !fineType.isActive) {
      return false
    }

    // Important only filter
    if (showImportantOnly && !fineType.isImportant) {
      return false
    }

    // Date range filter
    if (dateRange.start && dateRange.end) {
      const fineTypeDate = new Date(fineType.createdAt)
      if (fineTypeDate < dateRange.start || fineTypeDate > dateRange.end) {
        return false
      }
    }

    return true
  })

  // Sort fine types data
  const sortedFineTypes = [...filteredFineTypes].sort((a, b) => {
    let comparison = 0

    if (orderBy === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (orderBy === "category") {
      comparison = a.category.name.localeCompare(b.category.name)
    } else if (orderBy === "amount") {
      comparison = Number.parseFloat(a.amount) - Number.parseFloat(b.amount)
    } else if (orderBy === "createdAt") {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else if (orderBy === "usageCount") {
      comparison = a.usageCount - b.usageCount
    }

    return order === "asc" ? comparison : -comparison
  })

  // Pagination
  const paginatedFineTypes = sortedFineTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

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
      const newSelected = filteredFineTypes.map((fineType) => fineType.id)
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

  // Check if fine type is selected
  const isSelected = (id: number) => selected.indexOf(id) !== -1

  // Handle more menu open
  const handleMoreMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setAnchorEl(event.currentTarget)
    setMenuFineTypeId(id)
  }

  // Handle more menu close
  const handleMoreMenuClose = () => {
    setAnchorEl(null)
    setMenuFineTypeId(null)
  }

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    if (newValue === 0) setSelectedStatus("all")
    if (newValue === 1) setSelectedStatus("active")
    if (newValue === 2) setSelectedStatus("inactive")
  }

  // Handle view mode change
  const handleViewModeChange = (mode: "list" | "grid") => {
    setViewMode(mode)
  }

  // Handle refresh
  const handleRefresh = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccessMessage("Fine type list refreshed successfully")
      setSuccess(true)
    }, 1000)
  }

  // Handle batch actions
  const handleBatchAction = (action: string) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccessMessage(`${selected.length} fine type(s) ${action} successfully`)
      setSuccess(true)
      setSelected([])
    }, 1000)
  }

  // Handle delete dialog
  const handleDeleteDialogOpen = (id: number) => {
    setFineTypeToDelete(id)
    setDeleteDialogOpen(true)
    handleMoreMenuClose()
  }

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccessMessage("Fine type deleted successfully")
      setSuccess(true)
      setDeleteDialogOpen(false)
      setFineTypeToDelete(null)
    }, 1000)
  }

  // Handle filter drawer
  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen)
  }

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedStatus("all")
    setSelectedCalculationType("all")
    setShowImportantOnly(false)
    setShowActiveOnly(true)
    setDateRange({ start: null, end: null })
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

  // Get category color
  const getCategoryColor = (categoryId: number) => {
    const category = fineCategories.find((cat) => cat.id === categoryId)
    return category ? category.color : "#757575"
  }

  // Calculate statistics
  const stats = {
    total: fineTypesData.length,
    active: fineTypesData.filter((ft) => ft.isActive).length,
    inactive: fineTypesData.filter((ft) => !ft.isActive).length,
    percentage: fineTypesData.filter((ft) => ft.isPercentage).length,
    fixed: fineTypesData.filter((ft) => !ft.isPercentage).length,
    important: fineTypesData.filter((ft) => ft.isImportant).length,
    totalCollected: 125850,
  }
  const handleToggleImportant = (id: number) => {
    setSuccessMessage("Fine type importance status updated")
    setSuccess(true)
  }

  const handleToggleActive = (id: number) => {
    setSuccessMessage("Fine type active status updated")
    setSuccess(true)
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
              <Typography variant="subtitle1">Fine Types Management</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
                href="/dashboard/super_admin/fine-type/add"
              >
                Add New Fine Type
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
                  Active Fine Types
                </Typography>
                <Avatar sx={{ bgcolor: "#4caf50" }}>
                  <CheckCircle />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ my: 2, fontWeight: "bold", color: "#2e7d32" }}>
                {stats.active}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {((stats.active / stats.total) * 100).toFixed(0)}% of total fine types
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
                  Calculation Types
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <Avatar sx={{ bgcolor: "#2196f3", mr: 1 }}>
                    <Percent />
                  </Avatar>
                  <Avatar sx={{ bgcolor: "#1976d2" }}>
                    <AttachMoney />
                  </Avatar>
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    {stats.percentage}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Percentage
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    {stats.fixed}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fixed
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(stats.percentage / stats.total) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
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
                  Important Types
                </Typography>
                <Avatar sx={{ bgcolor: "#ffc107" }}>
                  <Bookmark />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ my: 2, fontWeight: "bold", color: "#f57f17" }}>
                {stats.important}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {((stats.important / stats.total) * 100).toFixed(0)}% of total fine types
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              bgcolor: "#f3e5f5",
              height: "100%",
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" color="text.secondary">
                  Total Collected
                </Typography>
                <Avatar sx={{ bgcolor: "#9c27b0" }}>
                  <LocalAtm />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ my: 2, fontWeight: "bold", color: "#6a1b9a" }}>
                ₹{stats.totalCollected.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total amount collected from fines
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
              <Tab label="All Fine Types" icon={<ViewList />} iconPosition="start" />
              <Tab
                label="Active"
                icon={<CheckCircle />}
                iconPosition="start"
                sx={{ color: tabValue === 1 ? "#4caf50" : "inherit" }}
              />
              <Tab
                label="Inactive"
                icon={<Block />}
                iconPosition="start"
                sx={{ color: tabValue === 2 ? "#f44336" : "inherit" }}
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
            </Box>
          </Box>

          {/* Search and Quick Filters */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search fine types by name or description..."
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
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      label="Category"
                    >
                      <MenuItem value="all">All Categories</MenuItem>
                      {fineCategories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                bgcolor: category.color,
                                mr: 1,
                              }}
                            />
                            {category.name}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Calculation Type</InputLabel>
                    <Select
                      value={selectedCalculationType}
                      onChange={(e) => setSelectedCalculationType(e.target.value)}
                      label="Calculation Type"
                    >
                      <MenuItem value="all">All Types</MenuItem>
                      <MenuItem value="percentage">Percentage Based</MenuItem>
                      <MenuItem value="fixed">Fixed Amount</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={showActiveOnly}
                          onChange={(e) => setShowActiveOnly(e.target.checked)}
                          color="primary"
                          size="small"
                        />
                      }
                      label="Active Only"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={showImportantOnly}
                          onChange={(e) => setShowImportantOnly(e.target.checked)}
                          color="warning"
                          size="small"
                        />
                      }
                      label="Important Only"
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
                {selected.length} {selected.length === 1 ? "fine type" : "fine types"} selected
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
                  startIcon={<Download />}
                  onClick={() => handleBatchAction("exported")}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
                >
                  Export
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
                          indeterminate={selected.length > 0 && selected.length < filteredFineTypes.length}
                          checked={filteredFineTypes.length > 0 && selected.length === filteredFineTypes.length}
                          onChange={handleSelectAllClick}
                        />
                      </TableCell>
                      <TableCell
                        sortDirection={orderBy === "name" ? order : false}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRequestSort("name")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Fine Type
                          {orderBy === "name" ? (
                            <Box component="span" sx={{ ml: 1 }}>
                              {order === "desc" ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />}
                            </Box>
                          ) : null}
                        </Box>
                      </TableCell>
                      <TableCell
                        sortDirection={orderBy === "category" ? order : false}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRequestSort("category")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Category
                          {orderBy === "category" ? (
                            <Box component="span" sx={{ ml: 1 }}>
                              {order === "desc" ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />}
                            </Box>
                          ) : null}
                        </Box>
                      </TableCell>
                      <TableCell
                        sortDirection={orderBy === "amount" ? order : false}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRequestSort("amount")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Amount
                          {orderBy === "amount" ? (
                            <Box component="span" sx={{ ml: 1 }}>
                              {order === "desc" ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />}
                            </Box>
                          ) : null}
                        </Box>
                      </TableCell>
                      <TableCell>Calculation</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell
                        sortDirection={orderBy === "usageCount" ? order : false}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRequestSort("usageCount")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Usage
                          {orderBy === "usageCount" ? (
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
                    {paginatedFineTypes.length > 0 ? (
                      paginatedFineTypes.map((fineType) => {
                        const isItemSelected = isSelected(fineType.id)
                        return (
                          <TableRow
                            hover
                            key={fineType.id}
                            selected={isItemSelected}
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: "rgba(25, 118, 210, 0.08)",
                              },
                            }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} onClick={() => handleClick(fineType.id)} />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                {fineType.isImportant ? (
                                  <Tooltip title="Important">
                                    <IconButton
                                      size="small"
                                      onClick={() => handleToggleImportant(fineType.id)}
                                      sx={{ mr: 1, color: "#ffc107" }}
                                    >
                                      <Bookmark fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                ) : (
                                  <Tooltip title="Mark as Important">
                                    <IconButton
                                      size="small"
                                      onClick={() => handleToggleImportant(fineType.id)}
                                      sx={{ mr: 1, color: "text.secondary" }}
                                    >
                                      <BookmarkBorder fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                <Box>
                                  <Typography
                                    variant="body1"
                                    sx={{ fontWeight: fineType.isImportant ? "bold" : "normal" }}
                                  >
                                    {fineType.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    Created: {formatDate(fineType.createdAt)}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={fineType.category.name}
                                size="small"
                                sx={{
                                  bgcolor: `${getCategoryColor(fineType.category.id)}20`,
                                  color: getCategoryColor(fineType.category.id),
                                  fontWeight: "medium",
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                {fineType.isPercentage ? `${fineType.amount}%` : `₹${fineType.amount}`}
                              </Typography>
                              {fineType.fineIncreaseEnabled && (
                                <Typography variant="caption" color="text.secondary" display="block">
                                  +{fineType.fineIncreaseRate}% {fineType.fineIncreaseFrequency}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              <Chip
                                icon={
                                  fineType.isPercentage ? (
                                    <Percent fontSize="small" />
                                  ) : (
                                    <AttachMoney fontSize="small" />
                                  )
                                }
                                label={fineType.isPercentage ? "Percentage" : "Fixed"}
                                size="small"
                                variant="outlined"
                                color={fineType.isPercentage ? "info" : "primary"}
                              />
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={fineType.isActive}
                                onChange={() => handleToggleActive(fineType.id)}
                                size="small"
                                color="success"
                              />
                            </TableCell>
                            <TableCell>
                              <Badge
                                badgeContent={fineType.usageCount}
                                color={fineType.usageCount > 100 ? "success" : "primary"}
                                showZero
                                max={999}
                                sx={{ "& .MuiBadge-badge": { fontSize: "0.7rem", height: "18px", minWidth: "18px" } }}
                              >
                                <Receipt sx={{ color: "text.secondary" }} />
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex" }}>
                                <Tooltip title="View Details">
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
                                  <IconButton size="small" onClick={(e) => handleMoreMenuOpen(e, fineType.id)}>
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
                            <AttachMoney sx={{ fontSize: 48, color: "text.disabled" }} />
                            <Typography variant="h6" color="text.secondary">
                              No fine types found
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
                count={filteredFineTypes.length}
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
                {paginatedFineTypes.length > 0 ? (
                  paginatedFineTypes.map((fineType) => (
                    <Grid item xs={12} sm={6} md={4} key={fineType.id}>
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
                          ...(isSelected(fineType.id) && {
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
                            checked={isSelected(fineType.id)}
                            onChange={() => handleClick(fineType.id)}
                            size="small"
                          />
                          <IconButton size="small" onClick={(e) => handleMoreMenuOpen(e, fineType.id)}>
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
                            {fineType.isImportant ? (
                              <Tooltip title="Important">
                                <IconButton
                                  size="small"
                                  onClick={() => handleToggleImportant(fineType.id)}
                                  sx={{ mr: 1, color: "#ffc107", p: 0 }}
                                >
                                  <Bookmark fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Mark as Important">
                                <IconButton
                                  size="small"
                                  onClick={() => handleToggleImportant(fineType.id)}
                                  sx={{ mr: 1, color: "text.secondary", p: 0 }}
                                >
                                  <BookmarkBorder fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: fineType.isImportant ? "bold" : "medium",
                                fontSize: "1rem",
                                lineHeight: 1.2,
                              }}
                            >
                              {fineType.name}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                            <Chip
                              label={fineType.category.name}
                              size="small"
                              sx={{
                                bgcolor: `${getCategoryColor(fineType.category.id)}20`,
                                color: getCategoryColor(fineType.category.id),
                                fontWeight: "medium",
                              }}
                            />
                            <Chip
                              icon={
                                fineType.isPercentage ? <Percent fontSize="small" /> : <AttachMoney fontSize="small" />
                              }
                              label={fineType.isPercentage ? "Percentage" : "Fixed"}
                              size="small"
                              variant="outlined"
                              color={fineType.isPercentage ? "info" : "primary"}
                            />
                            {fineType.isAbsentFine && (
                              <Chip label="Absence Related" size="small" color="warning" variant="outlined" />
                            )}
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
                            {fineType.description}
                          </Typography>
                          <Box sx={{ mt: "auto" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="body1" fontWeight="bold">
                                {fineType.isPercentage ? `${fineType.amount}%` : `₹${fineType.amount}`}
                              </Typography>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={fineType.isActive}
                                    onChange={() => handleToggleActive(fineType.id)}
                                    size="small"
                                    color="success"
                                  />
                                }
                                label={
                                  <Typography variant="caption">{fineType.isActive ? "Active" : "Inactive"}</Typography>
                                }
                                sx={{ m: 0 }}
                              />
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <Typography variant="caption" color="text.secondary">
                                Created: {formatDate(fineType.createdAt)}
                              </Typography>
                              <Badge
                                badgeContent={fineType.usageCount}
                                color={fineType.usageCount > 100 ? "success" : "primary"}
                                showZero
                                max={999}
                                sx={{ "& .MuiBadge-badge": { fontSize: "0.7rem", height: "18px", minWidth: "18px" } }}
                              >
                                <Tooltip title="Usage Count">
                                  <Receipt sx={{ color: "text.secondary" }} />
                                </Tooltip>
                              </Badge>
                            </Box>
                          </Box>
                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar src={fineType.createdBy.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                            <Typography variant="caption">{fineType.createdBy.name}</Typography>
                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Tooltip title="View Details">
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
                      <AttachMoney sx={{ fontSize: 48, color: "text.disabled" }} />
                      <Typography variant="h6" color="text.secondary">
                        No fine types found
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
                  count={filteredFineTypes.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            </>
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
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMoreMenuClose}>
          <ListItemIcon>
            <Notifications fontSize="small" />
          </ListItemIcon>
          <ListItemText>Send Notification</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleDeleteDialogOpen(menuFineTypeId!)}>
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
              <InputLabel>Category</InputLabel>
              <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} label="Category">
                <MenuItem value="all">All Categories</MenuItem>
                {fineCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: category.color,
                          mr: 1,
                        }}
                      />
                      {category.name}
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
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Calculation Type</InputLabel>
              <Select
                value={selectedCalculationType}
                onChange={(e) => setSelectedCalculationType(e.target.value as string)}
                label="Calculation Type"
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="percentage">Percentage Based</MenuItem>
                <MenuItem value="fixed">Fixed Amount</MenuItem>
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
                  checked={showActiveOnly}
                  onChange={(e) => setShowActiveOnly(e.target.checked)}
                  color="primary"
                />
              }
              label="Active Only"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showImportantOnly}
                  onChange={(e) => setShowImportantOnly(e.target.checked)}
                  color="warning"
                />
              }
              label="Important Only"
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
        <DialogTitle>Delete Fine Type</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this fine type? This action cannot be undone.
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
                Managing Fine Types
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Use filters to quickly find specific fine types
                <br />• Click on column headers to sort the fine type list
                <br />• Toggle the active status to enable or disable fine types
                <br />• Mark important fine types with the bookmark icon
                <br />• Use the grid view for a more visual representation
                <br />• Select multiple fine types for batch actions
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
