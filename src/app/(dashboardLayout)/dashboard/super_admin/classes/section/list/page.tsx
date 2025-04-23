/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Avatar,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Menu,
  MenuItem,
  Divider,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Skeleton,
  Fade,
  alpha,
  createTheme,
  ThemeProvider,
  Card,
  CardContent,
  CardActions,
  Tabs,
  Tab,
  LinearProgress,
  Select,
  FormControl,
  InputLabel,
  Collapse,
  Alert,
  AlertTitle,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Checkbox,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  // School as SchoolIcon,
  // Dashboard as DashboardIcon,
  // AccountTree as BranchIcon,
  // Home as HomeIcon,
  // Notifications as NotificationsIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  Groups as GroupsIcon,
  Close as CloseIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  Assignment as AssignmentIcon,
  BarChart as BarChartIcon,
  ViewModule as ViewModuleIcon,
  ViewList as ViewListIcon,
  Tune as TuneIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material"
import { Roboto } from "next/font/google"
import Link from "next/link"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
})

// Create a custom theme with vibrant colors
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#6366f1", // Indigo color for primary
      light: "#818cf8",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#ec4899", // Pink color for secondary
      light: "#f472b6",
      dark: "#db2777",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    info: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "10px 20px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(99, 102, 241, 0.2)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          overflow: "visible",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          padding: "16px",
        },
        head: {
          fontWeight: 600,
          backgroundColor: "rgba(99, 102, 241, 0.04)",
          color: "#6366f1",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(99, 102, 241, 0.04)",
          },
          "&:last-child td": {
            borderBottom: 0,
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
  },
})

// Sample data for sections
const generateSectionsData = () => {
  const statuses = ["Active", "Inactive", "Pending"]
  const classes = [
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
  ]
  const sectionNames = ["A", "B", "C", "D", "E", "Morning", "Afternoon", "Evening", "Special", "Advanced"]
  const teachers = [
    { name: "Dr. Smith", avatar: "S" },
    { name: "Prof. Johnson", avatar: "J" },
    { name: "Mrs. Williams", avatar: "W" },
    { name: "Mr. Brown", avatar: "B" },
    { name: "Ms. Davis", avatar: "D" },
  ]
  const rooms = ["Room 101", "Room 102", "Room 201", "Room 202", "Lab 101"]
  const colors = [
    "#3b82f6", // Blue
    "#8b5cf6", // Purple
    "#ec4899", // Pink
    "#f59e0b", // Amber
    "#10b981", // Emerald
    "#ef4444", // Red
    "#6366f1", // Indigo
    "#84cc16", // Lime
    "#14b8a6", // Teal
    "#f97316", // Orange
  ]
  const types = ["Regular", "Honors", "Advanced", "Special"]

  return Array.from({ length: 50 }, (_, i) => {
    const classIndex = Math.floor(Math.random() * classes.length)
    const sectionIndex = Math.floor(Math.random() * sectionNames.length)
    const colorIndex = Math.floor(Math.random() * colors.length)
    const typeIndex = Math.floor(Math.random() * types.length)

    return {
      id: i + 1,
      name: sectionNames[sectionIndex],
      className: classes[classIndex],
      fullName: `${classes[classIndex]} - Section ${sectionNames[sectionIndex]}`,
      capacity: Math.floor(Math.random() * 20) + 20,
      enrolled: Math.floor(Math.random() * 20) + 10,
      teacher: teachers[Math.floor(Math.random() * teachers.length)],
      room: rooms[Math.floor(Math.random() * rooms.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
      color: colors[colorIndex],
      type: types[typeIndex],
      schedule: Math.random() > 0.5 ? "MWF 9:00 AM - 10:30 AM" : "TTh 1:00 PM - 2:30 PM",
      fillRate: Math.floor(((Math.floor(Math.random() * 20) + 10) / (Math.floor(Math.random() * 20) + 20)) * 100),
    }
  })
}

// Analytics data
const analyticsData = {
  totalSections: 50,
  activeSections: 35,
  inactiveSections: 10,
  pendingSections: 5,
  averageFillRate: 78,
  mostPopularClass: "Class 8",
  leastPopularClass: "Class 3",
  sectionsByClass: [
    { class: "Class 1", count: 5 },
    { class: "Class 2", count: 4 },
    { class: "Class 3", count: 3 },
    { class: "Class 4", count: 6 },
    { class: "Class 5", count: 5 },
    { class: "Class 6", count: 4 },
    { class: "Class 7", count: 7 },
    { class: "Class 8", count: 8 },
    { class: "Class 9", count: 4 },
    { class: "Class 10", count: 4 },
  ],
  sectionsByType: [
    { type: "Regular", count: 25 },
    { type: "Honors", count: 10 },
    { type: "Advanced", count: 8 },
    { type: "Special", count: 7 },
  ],
}

export default function SectionsListPage() {
  const theme = customTheme
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // State
  const [sections, setSections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [classFilter, setClassFilter] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [orderBy, setOrderBy] = useState<string>("fullName")
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedSection, setSelectedSection] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [tabValue, setTabValue] = useState(0)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [selectedSections, setSelectedSections] = useState<number[]>([])
  const [batchActionAnchorEl, setBatchActionAnchorEl] = useState<null | HTMLElement>(null)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(true)

  // Get unique classes and types for filters
  const uniqueClasses = useMemo(() => {
    return Array.from(new Set(sections.map((section) => section.className)))
  }, [sections])

  const uniqueTypes = useMemo(() => {
    return Array.from(new Set(sections.map((section) => section.type)))
  }, [sections])

  // Simulate loading data from an API
  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setSections(generateSectionsData())
      setLoading(false)
    }, 1000)
  }, [refreshKey])

  // Handle refresh
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // Handle search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  // Handle filters
  // const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setFilterAnchorEl(event.currentTarget)
  // }

  // const handleFilterClose = () => {
  //   setFilterAnchorEl(null)
  // }

  const handleStatusFilterSelect = (status: string | null) => {
    setStatusFilter(status)
    setFilterAnchorEl(null)
    setPage(0)
  }

  const handleClassFilterSelect = (className: string | null) => {
    setClassFilter(className)
    setPage(0)
  }

  const handleTypeFilterSelect = (type: string | null) => {
    setTypeFilter(type)
    setPage(0)
  }

  // Handle sorting
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  // Handle menu actions
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, section: any) => {
    setAnchorEl(event.currentTarget)
    setSelectedSection(section)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    setAnchorEl(null)
  }

  const handleDeleteConfirm = () => {
    // In a real app, you would call an API to delete the section
    setSections(sections.filter((s) => s.id !== selectedSection?.id))
    setDeleteDialogOpen(false)
    setSelectedSection(null)
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
  }

  // Handle view mode
  const handleViewModeChange = (mode: "list" | "grid") => {
    setViewMode(mode)
  }

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Handle selection
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredSections.map((section) => section.id)
      setSelectedSections(newSelected)
      return
    }
    setSelectedSections([])
  }

  const handleSelectOne = (id: number) => {
    const selectedIndex = selectedSections.indexOf(id)
    let newSelected: number[] = []

    if (selectedIndex === -1) {
      newSelected = [...selectedSections, id]
    } else {
      newSelected = selectedSections.filter((sectionId) => sectionId !== id)
    }

    setSelectedSections(newSelected)
  }

  // Handle batch actions
  const handleBatchActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setBatchActionAnchorEl(event.currentTarget)
  }

  const handleBatchActionClose = () => {
    setBatchActionAnchorEl(null)
  }

  const handleBatchDelete = () => {
    // In a real app, you would call an API to delete the sections
    setSections(sections.filter((section) => !selectedSections.includes(section.id)))
    setSelectedSections([])
    setBatchActionAnchorEl(null)
  }

  const handleBatchActivate = () => {
    // In a real app, you would call an API to activate the sections
    setSections(
      sections.map((section) => (selectedSections.includes(section.id) ? { ...section, status: "Active" } : section)),
    )
    setSelectedSections([])
    setBatchActionAnchorEl(null)
  }

  const handleBatchDeactivate = () => {
    // In a real app, you would call an API to deactivate the sections
    setSections(
      sections.map((section) => (selectedSections.includes(section.id) ? { ...section, status: "Inactive" } : section)),
    )
    setSelectedSections([])
    setBatchActionAnchorEl(null)
  }

  // Filter and sort the data
  const filteredSections = sections
    .filter((section) => {
      const matchesSearch =
        searchTerm === "" ||
        section.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.room.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === null || section.status === statusFilter
      const matchesClass = classFilter === null || section.className === classFilter
      const matchesType = typeFilter === null || section.type === typeFilter

      // Apply tab filters
      if (tabValue === 1 && section.status !== "Active") return false
      if (tabValue === 2 && section.status !== "Inactive") return false
      if (tabValue === 3 && section.status !== "Pending") return false

      return matchesSearch && matchesStatus && matchesClass && matchesType
    })
    .sort((a, b) => {
      const aValue = a[orderBy]
      const bValue = b[orderBy]

      if (orderBy === "teacher") {
        return order === "asc"
          ? a.teacher.name.localeCompare(b.teacher.name)
          : b.teacher.name.localeCompare(a.teacher.name)
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return order === "asc" ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime()
      }

      return order === "asc" ? aValue - bValue : bValue - aValue
    })

  // Pagination
  const paginatedSections = filteredSections.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  // Get status chip props
  const getStatusChipProps = (status: string) => {
    switch (status) {
      case "Active":
        return {
          color: "success" as const,
          icon: <CheckCircleIcon fontSize="small" />,
          sx: { bgcolor: alpha(theme.palette.success.main, 0.1) },
        }
      case "Inactive":
        return {
          color: "error" as const,
          icon: <CancelIcon fontSize="small" />,
          sx: { bgcolor: alpha(theme.palette.error.main, 0.1) },
        }
      case "Pending":
        return {
          color: "warning" as const,
          icon: <AccessTimeIcon fontSize="small" />,
          sx: { bgcolor: alpha(theme.palette.warning.main, 0.1) },
        }
        default:
          return {
            color: "default" as const,
            icon: <div />, 
            sx: {},
          }
    }
  }

  // Get fill rate color
  const getFillRateColor = (rate: number) => {
    if (rate < 50) return theme.palette.error.main
    if (rate < 75) return theme.palette.warning.main
    return theme.palette.success.main
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", borderRadius: 2 }}>
        <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2 }}>
          <Fade in={true} timeout={800}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                  flexWrap: "wrap",
                  gap: 2,
                  paddingTop: 2
                }}
              >
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
                  Sections
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                    sx={{ borderRadius: 2 }}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link}
                    href="/dashboard/super_admin/classes/section/new"
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                    }}
                  >
                    Add New Section
                  </Button>
                </Box>
              </Box>

              {/* Alert */}
              <Collapse in={alertOpen}>
                <Alert
                  severity="info"
                  sx={{ mb: 3 }}
                  action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => setAlertOpen(false)}>
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  <AlertTitle>Welcome to Section Management</AlertTitle>
                  Manage all your class sections in one place. Create, edit, and organize sections for optimal class
                  management.
                </Alert>
              </Collapse>

              {/* Analytics Overview */}
              <Paper
                elevation={0}
                sx={{
                  mb: 4,
                  overflow: "hidden",
                  display: showAnalytics ? "block" : "none",
                }}
              >
                <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Sections Analytics
                    </Typography>
                    <Button size="small" endIcon={<ExpandLessIcon />} onClick={() => setShowAnalytics(false)}>
                      Hide Analytics
                    </Button>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mr: 2 }}>
                              <AssignmentIcon sx={{ color: theme.palette.primary.main }} />
                            </Avatar>
                            <Typography variant="subtitle1" color="text.secondary">
                              Total Sections
                            </Typography>
                          </Box>
                          <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {analyticsData.totalSections}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), mr: 2 }}>
                              <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
                            </Avatar>
                            <Typography variant="subtitle1" color="text.secondary">
                              Active Sections
                            </Typography>
                          </Box>
                          <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {analyticsData.activeSections}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {Math.round((analyticsData.activeSections / analyticsData.totalSections) * 100)}% of total
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), mr: 2 }}>
                              <GroupsIcon sx={{ color: theme.palette.warning.main }} />
                            </Avatar>
                            <Typography variant="subtitle1" color="text.secondary">
                              Average Fill Rate
                            </Typography>
                          </Box>
                          <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {analyticsData.averageFillRate}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={analyticsData.averageFillRate}
                            color={analyticsData.averageFillRate > 75 ? "success" : "warning"}
                            sx={{ mt: 1, height: 6, borderRadius: 3 }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), mr: 2 }}>
                              <StarIcon sx={{ color: theme.palette.info.main }} />
                            </Avatar>
                            <Typography variant="subtitle1" color="text.secondary">
                              Popular Class
                            </Typography>
                          </Box>
                          <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            {analyticsData.mostPopularClass}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {
                              analyticsData.sectionsByClass.find((c) => c.class === analyticsData.mostPopularClass)
                                ?.count
                            }{" "}
                            sections
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>

              {/* Main Content */}
              <Paper elevation={0} sx={{ mb: 4, overflow: "hidden" }}>
                {/* Tabs */}
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  sx={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                    px: 2,
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontWeight: 500,
                      py: 2,
                    },
                  }}
                >
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AssignmentIcon sx={{ mr: 1, fontSize: 20 }} />
                        All Sections
                        <Chip
                          label={filteredSections.length}
                          size="small"
                          sx={{ ml: 1, height: 20, fontSize: "0.75rem" }}
                        />
                      </Box>
                    }
                  />
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CheckCircleIcon sx={{ mr: 1, fontSize: 20, color: theme.palette.success.main }} />
                        Active
                        <Chip
                          label={sections.filter((s) => s.status === "Active").length}
                          size="small"
                          color="success"
                          sx={{ ml: 1, height: 20, fontSize: "0.75rem" }}
                        />
                      </Box>
                    }
                  />
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CancelIcon sx={{ mr: 1, fontSize: 20, color: theme.palette.error.main }} />
                        Inactive
                        <Chip
                          label={sections.filter((s) => s.status === "Inactive").length}
                          size="small"
                          color="error"
                          sx={{ ml: 1, height: 20, fontSize: "0.75rem" }}
                        />
                      </Box>
                    }
                  />
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTimeIcon sx={{ mr: 1, fontSize: 20, color: theme.palette.warning.main }} />
                        Pending
                        <Chip
                          label={sections.filter((s) => s.status === "Pending").length}
                          size="small"
                          color="warning"
                          sx={{ ml: 1, height: 20, fontSize: "0.75rem" }}
                        />
                      </Box>
                    }
                  />

                  {/* Right-aligned buttons */}
                  <Box sx={{ flexGrow: 1 }} />

                  <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                    <Tooltip title="Show Analytics">
                      <IconButton
                        color="primary"
                        onClick={() => setShowAnalytics(!showAnalytics)}
                        sx={{
                          bgcolor: showAnalytics ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                        }}
                      >
                        <BarChartIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="List View">
                      <IconButton
                        color={viewMode === "list" ? "primary" : "default"}
                        onClick={() => handleViewModeChange("list")}
                        sx={{
                          ml: 1,
                          bgcolor: viewMode === "list" ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                        }}
                      >
                        <ViewListIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Grid View">
                      <IconButton
                        color={viewMode === "grid" ? "primary" : "default"}
                        onClick={() => handleViewModeChange("grid")}
                        sx={{
                          bgcolor: viewMode === "grid" ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                        }}
                      >
                        <ViewModuleIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Tabs>

                {/* Filters and Search */}
                <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        placeholder="Search sections by name, teacher or room..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon color="action" />
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: 2,
                            bgcolor: "background.paper",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "rgba(0, 0, 0, 0.1)",
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                        <Button
                          variant="outlined"
                          color="inherit"
                          startIcon={<FilterListIcon />}
                          onClick={() => setFilterDrawerOpen(true)}
                          sx={{
                            borderColor: "rgba(0, 0, 0, 0.12)",
                            color: "text.secondary",
                            "&:hover": {
                              borderColor: "primary.main",
                              bgcolor: "rgba(99, 102, 241, 0.04)",
                            },
                            ...(statusFilter || classFilter || typeFilter
                              ? {
                                borderColor: "primary.main",
                                color: "primary.main",
                                bgcolor: "rgba(99, 102, 241, 0.04)",
                              }
                              : {}),
                          }}
                        >
                          {statusFilter || classFilter || typeFilter ? "Filters Applied" : "Filter"}
                        </Button>

                        {selectedSections.length > 0 && (
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<TuneIcon />}
                            onClick={handleBatchActionClick}
                          >
                            Actions ({selectedSections.length})
                          </Button>
                        )}

                        {!isMobile && (
                          <>
                            <Button
                              variant="outlined"
                              color="inherit"
                              startIcon={<DownloadIcon />}
                              sx={{
                                borderColor: "rgba(0, 0, 0, 0.12)",
                                color: "text.secondary",
                                "&:hover": {
                                  borderColor: "primary.main",
                                  bgcolor: "rgba(99, 102, 241, 0.04)",
                                },
                              }}
                            >
                              Export
                            </Button>
                            <Button
                              variant="outlined"
                              color="inherit"
                              startIcon={<PrintIcon />}
                              sx={{
                                borderColor: "rgba(0, 0, 0, 0.12)",
                                color: "text.secondary",
                                "&:hover": {
                                  borderColor: "primary.main",
                                  bgcolor: "rgba(99, 102, 241, 0.04)",
                                },
                              }}
                            >
                              Print
                            </Button>
                          </>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                {/* Loading State */}
                {loading ? (
                  <Box sx={{ p: 2 }}>
                    {Array.from(new Array(5)).map((_, index) => (
                      <Box key={index} sx={{ display: "flex", py: 2, px: 2, alignItems: "center" }}>
                        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                        <Box sx={{ width: "100%" }}>
                          <Skeleton variant="text" width="40%" height={30} />
                          <Box sx={{ display: "flex", mt: 1 }}>
                            <Skeleton variant="text" width="20%" sx={{ mr: 2 }} />
                            <Skeleton variant="text" width="30%" />
                          </Box>
                        </Box>
                        <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <>
                    {/* List View */}
                    {viewMode === "list" && (
                      <>
                        <TableContainer>
                          <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                              <TableRow>
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    indeterminate={
                                      selectedSections.length > 0 && selectedSections.length < filteredSections.length
                                    }
                                    checked={
                                      filteredSections.length > 0 && selectedSections.length === filteredSections.length
                                    }
                                    onChange={handleSelectAll}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      cursor: "pointer",
                                      userSelect: "none",
                                      color: orderBy === "fullName" ? "primary.main" : "inherit",
                                    }}
                                    onClick={() => handleSort("fullName")}
                                  >
                                    Section Name
                                    {orderBy === "fullName" && (
                                      <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
                                        {order === "asc" ? (
                                          <ArrowUpwardIcon fontSize="small" />
                                        ) : (
                                          <ArrowDownwardIcon fontSize="small" />
                                        )}
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      cursor: "pointer",
                                      userSelect: "none",
                                      color: orderBy === "teacher" ? "primary.main" : "inherit",
                                    }}
                                    onClick={() => handleSort("teacher")}
                                  >
                                    Teacher
                                    {orderBy === "teacher" && (
                                      <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
                                        {order === "asc" ? (
                                          <ArrowUpwardIcon fontSize="small" />
                                        ) : (
                                          <ArrowDownwardIcon fontSize="small" />
                                        )}
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      cursor: "pointer",
                                      userSelect: "none",
                                      color: orderBy === "capacity" ? "primary.main" : "inherit",
                                    }}
                                    onClick={() => handleSort("capacity")}
                                  >
                                    Capacity
                                    {orderBy === "capacity" && (
                                      <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
                                        {order === "asc" ? (
                                          <ArrowUpwardIcon fontSize="small" />
                                        ) : (
                                          <ArrowDownwardIcon fontSize="small" />
                                        )}
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      cursor: "pointer",
                                      userSelect: "none",
                                      color: orderBy === "type" ? "primary.main" : "inherit",
                                    }}
                                    onClick={() => handleSort("type")}
                                  >
                                    Type
                                    {orderBy === "type" && (
                                      <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
                                        {order === "asc" ? (
                                          <ArrowUpwardIcon fontSize="small" />
                                        ) : (
                                          <ArrowDownwardIcon fontSize="small" />
                                        )}
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      cursor: "pointer",
                                      userSelect: "none",
                                      color: orderBy === "status" ? "primary.main" : "inherit",
                                    }}
                                    onClick={() => handleSort("status")}
                                  >
                                    Status
                                    {orderBy === "status" && (
                                      <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
                                        {order === "asc" ? (
                                          <ArrowUpwardIcon fontSize="small" />
                                        ) : (
                                          <ArrowDownwardIcon fontSize="small" />
                                        )}
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>
                                <TableCell>Schedule</TableCell>
                                <TableCell align="right">Actions</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {paginatedSections.length > 0 ? (
                                paginatedSections.map((section) => {
                                  const statusChipProps = getStatusChipProps(section.status)
                                  const isSelected = selectedSections.indexOf(section.id) !== -1

                                  return (
                                    <TableRow
                                      key={section.id}
                                      sx={{
                                        transition: "all 0.2s",
                                        ...(isSelected ? { bgcolor: alpha(theme.palette.primary.main, 0.05) } : {}),
                                      }}
                                      hover
                                      selected={isSelected}
                                    >
                                      <TableCell padding="checkbox">
                                        <Checkbox checked={isSelected} onChange={() => handleSelectOne(section.id)} />
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                          <Avatar
                                            sx={{
                                              width: 32,
                                              height: 32,
                                              mr: 1.5,
                                              bgcolor: section.color,
                                              fontSize: "0.875rem",
                                            }}
                                          >
                                            {section.name.charAt(0)}
                                          </Avatar>
                                          <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                              {section.fullName}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                              Room: {section.room}
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                          <Avatar
                                            sx={{
                                              width: 28,
                                              height: 28,
                                              mr: 1,
                                              bgcolor: "primary.main",
                                              fontSize: "0.75rem",
                                            }}
                                          >
                                            {section.teacher.avatar}
                                          </Avatar>
                                          <Typography variant="body2">{section.teacher.name}</Typography>
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        <Box>
                                          <Typography variant="body2">
                                            {section.enrolled}/{section.capacity}
                                          </Typography>
                                          <LinearProgress
                                            variant="determinate"
                                            value={(section.enrolled / section.capacity) * 100}
                                            sx={{
                                              mt: 0.5,
                                              height: 4,
                                              borderRadius: 2,
                                              bgcolor: alpha(getFillRateColor(section.fillRate), 0.2),
                                              "& .MuiLinearProgress-bar": {
                                                bgcolor: getFillRateColor(section.fillRate),
                                              },
                                            }}
                                          />
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        <Chip
                                          label={section.type}
                                          size="small"
                                          sx={{
                                            bgcolor: alpha(section.color, 0.1),
                                            color: section.color,
                                            fontWeight: 500,
                                          }}
                                        />
                                      </TableCell>
                                      <TableCell>
                                                                                                                 
                                                                            
                                        <Chip
                                          icon={statusChipProps.icon}
                                          label={section.status}
                                          color={statusChipProps.color}
                                          size="small"
                                          sx={{
                                            ...statusChipProps.sx,
                                            fontWeight: 500,
                                          }}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                          <ScheduleIcon fontSize="small" sx={{ mr: 1, color: "action.active" }} />
                                          <Typography variant="body2">{section.schedule}</Typography>
                                        </Box>
                                      </TableCell>
                                      <TableCell align="right">
                                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                          {!isMobile && (
                                            <>
                                              <Tooltip title="View Details">
                                                <IconButton
                                                  size="small"
                                                  sx={{
                                                    color: "info.main",
                                                    bgcolor: alpha(theme.palette.info.main, 0.1),
                                                    mr: 1,
                                                    "&:hover": {
                                                      bgcolor: alpha(theme.palette.info.main, 0.2),
                                                    },
                                                  }}
                                                >
                                                  <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                              </Tooltip>
                                              <Tooltip title="Edit Section">
                                                <IconButton
                                                  size="small"
                                                  sx={{
                                                    color: "warning.main",
                                                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                                                    mr: 1,
                                                    "&:hover": {
                                                      bgcolor: alpha(theme.palette.warning.main, 0.2),
                                                    },
                                                  }}
                                                >
                                                  <EditIcon fontSize="small" />
                                                </IconButton>
                                              </Tooltip>
                                            </>
                                          )}
                                          <Tooltip title="More Actions">
                                            <IconButton
                                              size="small"
                                              onClick={(e) => handleMenuClick(e, section)}
                                              sx={{
                                                color: "text.secondary",
                                                bgcolor: "rgba(0, 0, 0, 0.04)",
                                                "&:hover": {
                                                  bgcolor: "rgba(0, 0, 0, 0.08)",
                                                },
                                              }}
                                            >
                                              <MoreVertIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                        </Box>
                                      </TableCell>
                                    </TableRow>
                                  )
                                })
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                                    <Box sx={{ textAlign: "center" }}>
                                      <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                                      <Typography variant="h6" gutterBottom>
                                        No sections found
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                        Try adjusting your search or filter to find what you&apos;re looking for.
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </>
                    )}

                    {/* Grid View */}
                    {viewMode === "grid" && (
                      <Box sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                          {paginatedSections.length > 0 ? (
                            paginatedSections.map((section) => {
                              const statusChipProps = getStatusChipProps(section.status)
                              const isSelected = selectedSections.indexOf(section.id) !== -1

                              return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={section.id}>
                                  <Card
                                    sx={{
                                      height: "100%",
                                      transition: "all 0.2s",
                                      ...(isSelected
                                        ? {
                                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                                          borderColor: theme.palette.primary.main,
                                          borderWidth: 1,
                                          borderStyle: "solid",
                                        }
                                        : {}),
                                      position: "relative",
                                      overflow: "visible",
                                      "&:hover": {
                                        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
                                        transform: "translateY(-4px)",
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        top: 12,
                                        left: 12,
                                        zIndex: 1,
                                      }}
                                    >
                                      <Checkbox
                                        checked={isSelected}
                                        onChange={() => handleSelectOne(section.id)}
                                        sx={{
                                          bgcolor: "white",
                                          borderRadius: "50%",
                                          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                                          "&:hover": {
                                            bgcolor: "white",
                                          },
                                        }}
                                      />
                                    </Box>

                                    <Box
                                      sx={{
                                        height: 8,
                                        bgcolor: section.color,
                                        borderTopLeftRadius: 12,
                                        borderTopRightRadius: 12,
                                      }}
                                    />

                                    <CardContent sx={{ pt: 3 }}>
                                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                        <Avatar
                                          sx={{
                                            width: 40,
                                            height: 40,
                                            mr: 1.5,
                                            bgcolor: section.color,
                                            fontSize: "1rem",
                                          }}
                                        >
                                          {section.name.charAt(0)}
                                        </Avatar>
                                        <Box>
                                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            {section.fullName}
                                          </Typography>
                                          <Typography variant="caption" color="text.secondary">
                                            Room: {section.room}
                                          </Typography>
                                        </Box>
                                      </Box>

                                      <Divider sx={{ my: 2 }} />

                                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                          Teacher:
                                        </Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                          <Avatar
                                            sx={{
                                              width: 24,
                                              height: 24,
                                              mr: 0.5,
                                              bgcolor: "primary.main",
                                              fontSize: "0.75rem",
                                            }}
                                          >
                                            {section.teacher.avatar}
                                          </Avatar>
                                          <Typography variant="body2">{section.teacher.name}</Typography>
                                        </Box>
                                      </Box>

                                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                          Capacity:
                                        </Typography>
                                        <Typography variant="body2">
                                          {section.enrolled}/{section.capacity}
                                        </Typography>
                                      </Box>

                                      <LinearProgress
                                        variant="determinate"
                                        value={(section.enrolled / section.capacity) * 100}
                                        sx={{
                                          mb: 2,
                                          height: 6,
                                          borderRadius: 3,
                                          bgcolor: alpha(getFillRateColor(section.fillRate), 0.2),
                                          "& .MuiLinearProgress-bar": {
                                            bgcolor: getFillRateColor(section.fillRate),
                                          },
                                        }}
                                      />

                                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                          Type:
                                        </Typography>
                                        <Chip
                                          label={section.type}
                                          size="small"
                                          sx={{
                                            bgcolor: alpha(section.color, 0.1),
                                            color: section.color,
                                            fontWeight: 500,
                                            height: 24,
                                          }}
                                        />
                                      </Box>

                                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                          Status:
                                        </Typography>
                                        <Chip
                                          icon={statusChipProps.icon}
                                          label={section.status}
                                          color={statusChipProps.color}
                                          size="small"
                                          sx={{
                                            ...statusChipProps.sx,
                                            fontWeight: 500,
                                            height: 24,
                                          }}
                                        />
                                      </Box>

                                      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                                        <ScheduleIcon fontSize="small" sx={{ mr: 1, color: "action.active" }} />
                                        <Typography variant="body2">{section.schedule}</Typography>
                                      </Box>
                                    </CardContent>

                                    <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}>
                                      <Tooltip title="View Details">
                                        <IconButton
                                          size="small"
                                          sx={{
                                            color: "info.main",
                                            bgcolor: alpha(theme.palette.info.main, 0.1),
                                            "&:hover": {
                                              bgcolor: alpha(theme.palette.info.main, 0.2),
                                            },
                                          }}
                                        >
                                          <VisibilityIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Edit Section">
                                        <IconButton
                                          size="small"
                                          sx={{
                                            color: "warning.main",
                                            bgcolor: alpha(theme.palette.warning.main, 0.1),
                                            ml: 1,
                                            "&:hover": {
                                              bgcolor: alpha(theme.palette.warning.main, 0.2),
                                            },
                                          }}
                                        >
                                          <EditIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="More Actions">
                                        <IconButton
                                          size="small"
                                          onClick={(e) => handleMenuClick(e, section)}
                                          sx={{
                                            color: "text.secondary",
                                            bgcolor: "rgba(0, 0, 0, 0.04)",
                                            ml: 1,
                                            "&:hover": {
                                              bgcolor: "rgba(0, 0, 0, 0.08)",
                                            },
                                          }}
                                        >
                                          <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </CardActions>
                                  </Card>
                                </Grid>
                              )
                            })
                          ) : (
                            <Grid item xs={12}>
                              <Box sx={{ textAlign: "center", py: 8 }}>
                                <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                  No sections found
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Try adjusting your search or filter to find what you&apos;re looking for.
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    )}

                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      component="div"
                      count={filteredSections.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      sx={{
                        borderTop: "1px solid rgba(0, 0, 0, 0.06)",
                      }}
                    />
                  </>
                )}
              </Paper>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 180,
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <VisibilityIcon fontSize="small" sx={{ mr: 2, color: "info.main" }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <EditIcon fontSize="small" sx={{ mr: 2, color: "warning.main" }} />
          Edit Section
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <GroupsIcon fontSize="small" sx={{ mr: 2, color: "primary.main" }} />
          Manage Students
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <ScheduleIcon fontSize="small" sx={{ mr: 2, color: "secondary.main" }} />
          Edit Schedule
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteClick} sx={{ py: 1.5, color: "error.main" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 2 }} />
          Delete Section
        </MenuItem>
      </Menu>

      {/* Batch Actions Menu */}
      <Menu
        anchorEl={batchActionAnchorEl}
        open={Boolean(batchActionAnchorEl)}
        onClose={handleBatchActionClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      >
        <MenuItem onClick={handleBatchActivate} sx={{ py: 1.5 }}>
          <CheckCircleIcon fontSize="small" sx={{ mr: 2, color: "success.main" }} />
          Activate Sections
        </MenuItem>
        <MenuItem onClick={handleBatchDeactivate} sx={{ py: 1.5 }}>
          <CancelIcon fontSize="small" sx={{ mr: 2, color: "error.main" }} />
          Deactivate Sections
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleBatchDelete} sx={{ py: 1.5, color: "error.main" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 2 }} />
          Delete Sections
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: 3,
            width: "100%",
            maxWidth: 480,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Delete Section
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the section &#34;{selectedSection?.fullName}&#34;? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="inherit"
            sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error" sx={{ ml: 2 }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            p: 3,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>
          <IconButton onClick={() => setFilterDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
          Status
        </Typography>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleStatusFilterSelect(null)} dense>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Checkbox edge="start" checked={statusFilter === null} tabIndex={-1} disableRipple />
              </ListItemIcon>
              <ListItemText primary="All Statuses" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleStatusFilterSelect("Active")} dense>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Checkbox edge="start" checked={statusFilter === "Active"} tabIndex={-1} disableRipple />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CheckCircleIcon fontSize="small" sx={{ mr: 1, color: "success.main" }} />
                    Active
                  </Box>
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleStatusFilterSelect("Inactive")} dense>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Checkbox edge="start" checked={statusFilter === "Inactive"} tabIndex={-1} disableRipple />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CancelIcon fontSize="small" sx={{ mr: 1, color: "error.main" }} />
                    Inactive
                  </Box>
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleStatusFilterSelect("Pending")} dense>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Checkbox edge="start" checked={statusFilter === "Pending"} tabIndex={-1} disableRipple />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: "warning.main" }} />
                    Pending
                  </Box>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>

        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
          Class
        </Typography>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel id="class-filter-label">Select Class</InputLabel>
          <Select
            labelId="class-filter-label"
            id="class-filter"
            value={classFilter || ""}
            onChange={(e) => handleClassFilterSelect(e.target.value || null)}
            label="Select Class"
          >
            <MenuItem value="">All Classes</MenuItem>
            {uniqueClasses.map((className) => (
              <MenuItem key={className} value={className}>
                {className}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
          Section Type
        </Typography>
        <FormControl fullWidth size="small" sx={{ mb: 3 }}>
          <InputLabel id="type-filter-label">Select Type</InputLabel>
          <Select
            labelId="type-filter-label"
            id="type-filter"
            value={typeFilter || ""}
            onChange={(e) => handleTypeFilterSelect(e.target.value || null)}
            label="Select Type"
          >
            <MenuItem value="">All Types</MenuItem>
            {uniqueTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            onClick={() => {
              setStatusFilter(null)
              setClassFilter(null)
              setTypeFilter(null)
            }}
          >
            Clear All
          </Button>
          <Button variant="contained" onClick={() => setFilterDrawerOpen(false)}>
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </ThemeProvider>
  )
}

