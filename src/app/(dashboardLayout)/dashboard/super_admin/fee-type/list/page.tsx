/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

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
  Stack,
  AvatarGroup,
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
  CheckCircle,
  Block,
  ContentCopy,
  Download,
  Archive,
  ViewList,
  ViewModule,
  CalendarMonth,
  School,
  Class,
  Groups,
  Payments,
  Receipt,
  LocalAtm,
  Star,
  StarBorder,
  EventRepeat,
  EventNote,
  Assignment,
  AssignmentTurnedIn,
  Print,
  Send,
  BarChart,
  PieChart,
  Tune,
  ImportExport,
} from "@mui/icons-material"

// Sample data for fee types
const feeTypesData = [
  {
    id: 1,
    name: "Tuition Fee",
    amount: 5000,
    description: "Monthly tuition fee for regular academic classes",
    isMonthly: true,
    isActive: true,
    applicableFrom: new Date(2023, 0, 1),
    applicableUntil: new Date(2023, 11, 31),
    isRequired: true,
    applicableClasses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    applicableSections: [1, 2, 3],
    createdBy: { id: 1, name: "Admin User", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2022, 11, 15),
    isStarred: true,
    collectionRate: 92,
    totalCollected: 4500000,
    studentCount: 950,
    category: { id: 1, name: "Academic", color: "#4caf50" },
  },
  {
    id: 2,
    name: "Library Fee",
    amount: 500,
    description: "Annual library fee for access to library resources",
    isMonthly: false,
    isActive: true,
    applicableFrom: new Date(2023, 0, 1),
    applicableUntil: new Date(2023, 11, 31),
    isRequired: true,
    applicableClasses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    applicableSections: [1, 2, 3],
    createdBy: { id: 2, name: "Library Manager", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2022, 11, 10),
    isStarred: false,
    collectionRate: 88,
    totalCollected: 475000,
    studentCount: 950,
    category: { id: 2, name: "Facilities", color: "#2196f3" },
  },
  {
    id: 3,
    name: "Computer Lab Fee",
    amount: 800,
    description: "Quarterly fee for computer lab usage and maintenance",
    isMonthly: false,
    isActive: true,
    applicableFrom: new Date(2023, 0, 1),
    applicableUntil: new Date(2023, 11, 31),
    isRequired: true,
    applicableClasses: [6, 7, 8, 9, 10],
    applicableSections: [1, 2, 3],
    createdBy: { id: 3, name: "IT Manager", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2022, 11, 12),
    isStarred: false,
    collectionRate: 85,
    totalCollected: 408000,
    studentCount: 600,
    category: { id: 2, name: "Facilities", color: "#2196f3" },
  },
  {
    id: 4,
    name: "Sports Fee",
    amount: 1200,
    description: "Annual sports fee for equipment and facilities",
    isMonthly: false,
    isActive: true,
    applicableFrom: new Date(2023, 0, 1),
    applicableUntil: new Date(2023, 11, 31),
    isRequired: true,
    applicableClasses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    applicableSections: [1, 2, 3],
    createdBy: { id: 4, name: "Sports Teacher", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2022, 11, 5),
    isStarred: false,
    collectionRate: 90,
    totalCollected: 1140000,
    studentCount: 950,
    category: { id: 3, name: "Extra-curricular", color: "#ff9800" },
  },
  {
    id: 5,
    name: "Examination Fee",
    amount: 1500,
    description: "Fee for term examinations including materials and supervision",
    isMonthly: false,
    isActive: true,
    applicableFrom: new Date(2023, 0, 1),
    applicableUntil: new Date(2023, 11, 31),
    isRequired: true,
    applicableClasses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    applicableSections: [1, 2, 3],
    createdBy: { id: 5, name: "Exam Coordinator", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2022, 11, 8),
    isStarred: true,
    collectionRate: 95,
    totalCollected: 1425000,
    studentCount: 950,
    category: { id: 1, name: "Academic", color: "#4caf50" },
  },
  {
    id: 6,
    name: "Transportation Fee",
    amount: 1200,
    description: "Monthly transportation fee for school bus service",
    isMonthly: true,
    isActive: true,
    applicableFrom: new Date(2023, 0, 1),
    applicableUntil: new Date(2023, 11, 31),
    isRequired: false,
    applicableClasses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    applicableSections: [1, 2, 3],
    createdBy: { id: 1, name: "Admin User", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2022, 11, 20),
    isStarred: false,
    collectionRate: 80,
    totalCollected: 576000,
    studentCount: 600,
    category: { id: 4, name: "Transportation", color: "#9c27b0" },
  },
  {
    id: 7,
    name: "Science Lab Fee",
    amount: 800,
    description: "Quarterly fee for science lab usage and materials",
    isMonthly: false,
    isActive: true,
    applicableFrom: new Date(2023, 0, 1),
    applicableUntil: new Date(2023, 11, 31),
    isRequired: true,
    applicableClasses: [6, 7, 8, 9, 10],
    applicableSections: [1, 2, 3],
    createdBy: { id: 6, name: "Science Teacher", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2022, 11, 18),
    isStarred: false,
    collectionRate: 87,
    totalCollected: 417600,
    studentCount: 600,
    category: { id: 2, name: "Facilities", color: "#2196f3" },
  },
  {
    id: 8,
    name: "Development Fee",
    amount: 2000,
    description: "Annual development fee for school infrastructure improvements",
    isMonthly: false,
    isActive: true,
    applicableFrom: new Date(2023, 0, 1),
    applicableUntil: new Date(2023, 11, 31),
    isRequired: true,
    applicableClasses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    applicableSections: [1, 2, 3],
    createdBy: { id: 1, name: "Admin User", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2022, 11, 2),
    isStarred: true,
    collectionRate: 93,
    totalCollected: 1900000,
    studentCount: 950,
    category: { id: 5, name: "Development", color: "#f44336" },
  },
  {
    id: 9,
    name: "Cultural Activities Fee",
    amount: 600,
    description: "Annual fee for cultural events and activities",
    isMonthly: false,
    isActive: false,
    applicableFrom: new Date(2023, 0, 1),
    applicableUntil: new Date(2023, 11, 31),
    isRequired: false,
    applicableClasses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    applicableSections: [1, 2, 3],
    createdBy: { id: 7, name: "Cultural Coordinator", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2022, 11, 25),
    isStarred: false,
    collectionRate: 0,
    totalCollected: 0,
    studentCount: 0,
    category: { id: 3, name: "Extra-curricular", color: "#ff9800" },
  },
  {
    id: 10,
    name: "Smart Class Fee",
    amount: 1000,
    description: "Annual fee for smart classroom technology and maintenance",
    isMonthly: false,
    isActive: true,
    applicableFrom: new Date(2023, 0, 1),
    applicableUntil: new Date(2023, 11, 31),
    isRequired: true,
    applicableClasses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    applicableSections: [1, 2, 3],
    createdBy: { id: 3, name: "IT Manager", avatar: "/placeholder.svg?height=40&width=40" },
    createdAt: new Date(2022, 11, 14),
    isStarred: false,
    collectionRate: 91,
    totalCollected: 950000,
    studentCount: 950,
    category: { id: 6, name: "Technology", color: "#3f51b5" },
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

// Sample fee categories
const feeCategories = [
  { id: 1, name: "Academic", color: "#4caf50" },
  { id: 2, name: "Facilities", color: "#2196f3" },
  { id: 3, name: "Extra-curricular", color: "#ff9800" },
  { id: 4, name: "Transportation", color: "#9c27b0" },
  { id: 5, name: "Development", color: "#f44336" },
  { id: 6, name: "Technology", color: "#3f51b5" },
  { id: 7, name: "Other", color: "#607d8b" },
]

export default function FeeTypeList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"))

  // State for filters
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<number | string>("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedFrequency, setSelectedFrequency] = useState("all")
  const [showStarredOnly, setShowStarredOnly] = useState(false)
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
  const [feeTypeToDelete, setFeeTypeToDelete] = useState<number | null>(null)

  // State for more menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuFeeTypeId, setMenuFeeTypeId] = useState<number | null>(null)

  // Filter fee types data based on filters
  const filteredFeeTypes = feeTypesData.filter((feeType) => {
    // Search query filter
    if (
      searchQuery &&
      !feeType.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !feeType.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Category filter
    if (selectedCategory !== "all" && feeType.category.id !== selectedCategory) {
      return false
    }

    // Status filter
    if (selectedStatus !== "all") {
      if (selectedStatus === "active" && !feeType.isActive) return false
      if (selectedStatus === "inactive" && feeType.isActive) return false
    }

    // Frequency filter
    if (selectedFrequency !== "all") {
      if (selectedFrequency === "monthly" && !feeType.isMonthly) return false
      if (selectedFrequency === "annual" && feeType.isMonthly) return false
    }

    // Active only filter
    if (showActiveOnly && !feeType.isActive) {
      return false
    }

    // Starred only filter
    if (showStarredOnly && !feeType.isStarred) {
      return false
    }

    // Date range filter
    if (dateRange.start && dateRange.end) {
      const feeTypeDate = new Date(feeType.createdAt)
      if (feeTypeDate < dateRange.start || feeTypeDate > dateRange.end) {
        return false
      }
    }

    return true
  })

  // Sort fee types data
  const sortedFeeTypes = [...filteredFeeTypes].sort((a, b) => {
    let comparison = 0

    if (orderBy === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (orderBy === "category") {
      comparison = a.category.name.localeCompare(b.category.name)
    } else if (orderBy === "amount") {
      comparison = a.amount - b.amount
    } else if (orderBy === "createdAt") {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else if (orderBy === "collectionRate") {
      comparison = a.collectionRate - b.collectionRate
    } else if (orderBy === "totalCollected") {
      comparison = a.totalCollected - b.totalCollected
    }

    return order === "asc" ? comparison : -comparison
  })

  // Pagination
  const paginatedFeeTypes = sortedFeeTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

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
      const newSelected = filteredFeeTypes.map((feeType) => feeType.id)
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

  // Check if fee type is selected
  const isSelected = (id: number) => selected.indexOf(id) !== -1

  // Handle more menu open
  const handleMoreMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setAnchorEl(event.currentTarget)
    setMenuFeeTypeId(id)
  }

  // Handle more menu close
  const handleMoreMenuClose = () => {
    setAnchorEl(null)
    setMenuFeeTypeId(null)
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
      setSuccessMessage("Fee type list refreshed successfully")
      setSuccess(true)
    }, 1000)
  }

  // Handle batch actions
  const handleBatchAction = (action: string) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccessMessage(`${selected.length} fee type(s) ${action} successfully`)
      setSuccess(true)
      setSelected([])
    }, 1000)
  }

  // Handle delete dialog
  const handleDeleteDialogOpen = (id: number) => {
    setFeeTypeToDelete(id)
    setDeleteDialogOpen(true)
    handleMoreMenuClose()
  }

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccessMessage("Fee type deleted successfully")
      setSuccess(true)
      setDeleteDialogOpen(false)
      setFeeTypeToDelete(null)
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
    setSelectedFrequency("all")
    setShowStarredOnly(false)
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

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Get category color
  const getCategoryColor = (categoryId: number) => {
    const category = feeCategories.find((cat) => cat.id === categoryId)
    return category ? category.color : "#757575"
  }

  // Calculate statistics
  const stats = {
    total: feeTypesData.length,
    active: feeTypesData.filter((ft) => ft.isActive).length,
    inactive: feeTypesData.filter((ft) => !ft.isActive).length,
    monthly: feeTypesData.filter((ft) => ft.isMonthly).length,
    annual: feeTypesData.filter((ft) => !ft.isMonthly).length,
    starred: feeTypesData.filter((ft) => ft.isStarred).length,
    totalCollected: feeTypesData.reduce((sum, ft) => sum + ft.totalCollected, 0),
  }

  // Toggle starred status
  const handleToggleStarred = (id: number) => {
    setSuccessMessage("Fee type starred status updated")
    setSuccess(true)
  }

  // Toggle active status
  const handleToggleActive = (id: number) => {
    setSuccessMessage("Fee type active status updated")
    setSuccess(true)
  }

  // Get applicable classes text
  const getApplicableClassesText = (classIds: number[]) => {
    if (classIds.length === classes.length) return "All Classes"
    if (classIds.length === 0) return "None"
    if (classIds.length <= 3) {
      return classIds.map((id) => classes.find((c) => c.id === id)?.name).join(", ")
    }
    return `${classIds.length} Classes`
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
              <Typography variant="subtitle1">Fee Types Management</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
                href="/dashboard/super_admin/fee-type/add"
              >
                Add New Fee Type
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
                  Active Fee Types
                </Typography>
                <Avatar sx={{ bgcolor: "#4caf50" }}>
                  <CheckCircle />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ my: 2, fontWeight: "bold", color: "#2e7d32" }}>
                {stats.active}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {((stats.active / stats.total) * 100).toFixed(0)}% of total fee types
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
                  Fee Frequency
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <Avatar sx={{ bgcolor: "#2196f3", mr: 1 }}>
                    <EventRepeat />
                  </Avatar>
                  <Avatar sx={{ bgcolor: "#1976d2" }}>
                    <EventNote />
                  </Avatar>
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    {stats.monthly}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monthly
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    {stats.annual}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Annual
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(stats.monthly / stats.total) * 100}
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
                  Fee Categories
                </Typography>
                <AvatarGroup max={3} sx={{ "& .MuiAvatar-root": { width: 30, height: 30, fontSize: "0.8rem" } }}>
                  {feeCategories.slice(0, 3).map((category) => (
                    <Avatar key={category.id} sx={{ bgcolor: category.color }}>
                      {category.name.charAt(0)}
                    </Avatar>
                  ))}
                </AvatarGroup>
              </Box>
              <Typography variant="h3" sx={{ my: 2, fontWeight: "bold", color: "#f57f17" }}>
                {feeCategories.length}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {feeCategories.slice(0, 4).map((category) => (
                  <Chip
                    key={category.id}
                    label={category.name}
                    size="small"
                    sx={{
                      bgcolor: `${category.color}20`,
                      color: category.color,
                      fontWeight: "medium",
                    }}
                  />
                ))}
              </Box>
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
                {formatCurrency(stats.totalCollected)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total amount collected from all fees
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
              <Tab label="All Fee Types" icon={<ViewList />} iconPosition="start" />
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
                placeholder="Search fee types by name or description..."
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
                      {feeCategories.map((category) => (
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
                    <InputLabel>Frequency</InputLabel>
                    <Select
                      value={selectedFrequency}
                      onChange={(e) => setSelectedFrequency(e.target.value)}
                      label="Frequency"
                    >
                      <MenuItem value="all">All Frequencies</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="annual">Annual/One-time</MenuItem>
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
                          checked={showStarredOnly}
                          onChange={(e) => setShowStarredOnly(e.target.checked)}
                          color="warning"
                          size="small"
                        />
                      }
                      label="Starred Only"
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
                {selected.length} {selected.length === 1 ? "fee type" : "fee types"} selected
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
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
                          indeterminate={selected.length > 0 && selected.length < filteredFeeTypes.length}
                          checked={filteredFeeTypes.length > 0 && selected.length === filteredFeeTypes.length}
                          onChange={handleSelectAllClick}
                        />
                      </TableCell>
                      <TableCell
                        sortDirection={orderBy === "name" ? order : false}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRequestSort("name")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Fee Type
                          {orderBy === "name" ? (
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
                      <TableCell>Frequency</TableCell>
                      <TableCell>Applicable To</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell
                        sortDirection={orderBy === "collectionRate" ? order : false}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRequestSort("collectionRate")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Collection
                          {orderBy === "collectionRate" ? (
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
                    {paginatedFeeTypes.length > 0 ? (
                      paginatedFeeTypes.map((feeType) => {
                        const isItemSelected = isSelected(feeType.id)
                        return (
                          <TableRow
                            hover
                            key={feeType.id}
                            selected={isItemSelected}
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: "rgba(25, 118, 210, 0.08)",
                              },
                            }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} onClick={() => handleClick(feeType.id)} />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                {feeType.isStarred ? (
                                  <Tooltip title="Starred">
                                    <IconButton
                                      size="small"
                                      onClick={() => handleToggleStarred(feeType.id)}
                                      sx={{ mr: 1, color: "#ffc107" }}
                                    >
                                      <Star fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                ) : (
                                  <Tooltip title="Star">
                                    <IconButton
                                      size="small"
                                      onClick={() => handleToggleStarred(feeType.id)}
                                      sx={{ mr: 1, color: "text.secondary" }}
                                    >
                                      <StarBorder fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                <Box>
                                  <Typography
                                    variant="body1"
                                    sx={{ fontWeight: feeType.isStarred ? "bold" : "normal" }}
                                  >
                                    {feeType.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    Valid: {formatDate(feeType.applicableFrom)} - {formatDate(feeType.applicableUntil)}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                {formatCurrency(feeType.amount)}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {feeType.isRequired ? "Required" : "Optional"}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={feeType.category.name}
                                size="small"
                                sx={{
                                  bgcolor: `${getCategoryColor(feeType.category.id)}20`,
                                  color: getCategoryColor(feeType.category.id),
                                  fontWeight: "medium",
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                icon={
                                  feeType.isMonthly ? (
                                    <EventRepeat fontSize="small" />
                                  ) : (
                                    <EventNote fontSize="small" />
                                  )
                                }
                                label={feeType.isMonthly ? "Monthly" : "Annual/One-time"}
                                size="small"
                                variant="outlined"
                                color={feeType.isMonthly ? "info" : "primary"}
                              />
                            </TableCell>
                            <TableCell>
                              <Tooltip title={feeType.applicableClasses.map((id) => classes.find((c) => c.id === id)?.name).join(", ")}>
                                <Typography variant="body2">
                                  {getApplicableClassesText(feeType.applicableClasses)}
                                </Typography>
                              </Tooltip>
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={feeType.isActive}
                                onChange={() => handleToggleActive(feeType.id)}
                                size="small"
                                color="success"
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography variant="body2">
                                  {feeType.collectionRate}%
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={feeType.collectionRate}
                                  sx={{
                                    width: 60,
                                    height: 6,
                                    borderRadius: 3,
                                    bgcolor: "rgba(0,0,0,0.1)",
                                    "& .MuiLinearProgress-bar": {
                                      bgcolor:
                                        feeType.collectionRate < 50
                                          ? "#f44336"
                                          : feeType.collectionRate < 80
                                            ? "#ff9800"
                                            : "#4caf50",
                                    },
                                  }}
                                />
                              </Box>
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
                                  <IconButton size="small" onClick={(e) => handleMoreMenuOpen(e, feeType.id)}>
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
                        <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                            <Payments sx={{ fontSize: 48, color: "text.disabled" }} />
                            <Typography variant="h6" color="text.secondary">
                              No fee types found
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
                count={filteredFeeTypes.length}
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
                {paginatedFeeTypes.length > 0 ? (
                  paginatedFeeTypes.map((feeType) => (
                    <Grid item xs={12} sm={6} md={4} key={feeType.id}>
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
                          ...(isSelected(feeType.id) && {
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
                            checked={isSelected(feeType.id)}
                            onChange={() => handleClick(feeType.id)}
                            size="small"
                          />
                          <IconButton size="small" onClick={(e) => handleMoreMenuOpen(e, feeType.id)}>
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
                            {feeType.isStarred ? (
                              <Tooltip title="Starred">
                                <IconButton
                                  size="small"
                                  onClick={() => handleToggleStarred(feeType.id)}
                                  sx={{ mr: 1, color: "#ffc107", p: 0 }}
                                >
                                  <Star fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Star">
                                <IconButton
                                  size="small"
                                  onClick={() => handleToggleStarred(feeType.id)}
                                  sx={{ mr: 1, color: "text.secondary", p: 0 }}
                                >
                                  <StarBorder fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: feeType.isStarred ? "bold" : "medium",
                                fontSize: "1rem",
                                lineHeight: 1.2,
                              }}
                            >
                              {feeType.name}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                            <Chip
                              label={feeType.category.name}
                              size="small"
                              sx={{
                                bgcolor: `${getCategoryColor(feeType.category.id)}20`,
                                color: getCategoryColor(feeType.category.id),
                                fontWeight: "medium",
                              }}
                            />
                            <Chip
                              icon={
                                feeType.isMonthly ? (
                                  <EventRepeat fontSize="small" />
                                ) : (
                                  <EventNote fontSize="small" />
                                )
                              }
                              label={feeType.isMonthly ? "Monthly" : "Annual/One-time"}
                              size="small"
                              variant="outlined"
                              color={feeType.isMonthly ? "info" : "primary"}
                            />
                            {feeType.isRequired && (
                              <Chip label="Required" size="small" color="warning" variant="outlined" />
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
                            {feeType.description}
                          </Typography>
                          <Box sx={{ mt: "auto" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="h6" fontWeight="bold" color="primary.main">
                                {formatCurrency(feeType.amount)}
                              </Typography>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={feeType.isActive}
                                    onChange={() => handleToggleActive(feeType.id)}
                                    size="small"
                                    color="success"
                                  />
                                }
                                label={
                                  <Typography variant="caption">{feeType.isActive ? "Active" : "Inactive"}</Typography>
                                }
                                sx={{ m: 0 }}
                              />
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <Typography variant="caption" color="text.secondary">
                                Applicable to: {getApplicableClassesText(feeType.applicableClasses)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                              <Typography variant="body2">
                                Collection Rate: {feeType.collectionRate}%
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={feeType.collectionRate}
                                sx={{
                                  width: 60,
                                  height: 6,
                                  borderRadius: 3,
                                  bgcolor: "rgba(0,0,0,0.1)",
                                  "& .MuiLinearProgress-bar": {
                                    bgcolor:
                                      feeType.collectionRate < 50
                                        ? "#f44336"
                                        : feeType.collectionRate < 80
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
                            <Avatar src={feeType.createdBy.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                            <Typography variant="caption">{feeType.createdBy.name}</Typography>
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
                      <Payments sx={{ fontSize: 48, color: "text.disabled" }} />
                      <Typography variant="h6" color="text.secondary">
                        No fee types found
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
                  count={filteredFeeTypes.length}
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
            <Send fontSize="small" />
          </ListItemIcon>
          <ListItemText>Send Notification</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMoreMenuClose}>
          <ListItemIcon>
            <BarChart fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Analytics</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleDeleteDialogOpen(menuFeeTypeId!)}>
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
                {feeCategories.map((category) => (
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
              <InputLabel>Frequency</InputLabel>
              <Select
                value={selectedFrequency}
                onChange={(e) => setSelectedFrequency(e.target.value as string)}
                label="Frequency"
              >
                <MenuItem value="all">All Frequencies</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="annual">Annual/One-time</MenuItem>
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
                  checked={showStarredOnly}
                  onChange={(e) => setShowStarredOnly(e.target.checked)}
                  color="warning"
                />
              }
              label="Starred Only"
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
        <DialogTitle>Delete Fee Type</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this fee type? This action cannot be undone.
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

      {/* Quick Actions Floating Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <SpeedDial
          ariaLabel="Quick Actions"
          icon={<SpeedDialIcon />}
          direction="up"
        >
          <SpeedDialAction
            icon={<Add />}
            tooltipTitle="Add New Fee Type"
            tooltipOpen
            onClick={() => window.location.href = "/dashboard/super_admin/fee-type/add"}
          />
          <SpeedDialAction
            icon={<ImportExport />}
            tooltipTitle="Import/Export"
            tooltipOpen
          />
          <SpeedDialAction
            icon={<PieChart />}
            tooltipTitle="Fee Analytics"
            tooltipOpen
          />
          <SpeedDialAction
            icon={<Tune />}
            tooltipTitle="Settings"
            tooltipOpen
          />
        </SpeedDial>
      </Box>

      {/* Help Card */}
      <Card elevation={1} sx={{ mt: 4, borderRadius: 2, bgcolor: "#f5f5f5" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Help sx={{ mr: 2, color: "text.secondary" }} />
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Managing Fee Types
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Use filters to quickly find specific fee types
                <br />• Click on column headers to sort the fee type list
                <br />• Toggle the active status to enable or disable fee types
                <br />• Star important fee types for quick access
                <br />• Use the grid view for a more visual representation
                <br />• Select multiple fee types for batch actions
                <br />• Monitor collection rates to identify payment issues
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

// Missing component import
const SpeedDial = ({ ariaLabel, icon, direction, children }: any) => {
  return (
    <Box sx={{ position: 'relative', mt: 3, height: 320 }}>
      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: '50%',
          width: 56,
          height: 56,
          minWidth: 'unset',
          boxShadow: 3
        }}
      >
        {icon}
      </Button>
      <Box sx={{
        position: 'absolute',
        bottom: 70,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        {children}
      </Box>
    </Box>
  );
};

const SpeedDialIcon = () => {
  return <Add />;
};

const SpeedDialAction = ({ icon, tooltipTitle, tooltipOpen, onClick }: any) => {
  return (
    <Tooltip title={tooltipTitle} open={tooltipOpen} placement="left">
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={onClick}
        sx={{
          borderRadius: '50%',
          width: 40,
          height: 40,
          minWidth: 'unset',
          boxShadow: 2
        }}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

