/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useMemo } from "react"
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
  ThemeProvider,
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
  CircularProgress,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
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
  Assignment as AssignmentIcon,
  BarChart as BarChartIcon,
  Tune as TuneIcon,
} from "@mui/icons-material"
import { Roboto } from "next/font/google"
import Link from "next/link"
import { customTheme } from "@/ThemeStyle"
import { useDeleteSectionMutation, useGetAllSectionsQuery } from "@/redux/api/sectionApi"
import { toast } from "react-hot-toast"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
})

// Color palette for section customization
const colorPalette = [
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

export default function SectionsListPage() {
  const theme = customTheme
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // State
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [classFilter, setClassFilter] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [orderBy, setOrderBy] = useState<string>("name")
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedSection, setSelectedSection] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [tabValue, setTabValue] = useState(0)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [batchActionAnchorEl, setBatchActionAnchorEl] = useState<null | HTMLElement>(null)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  // API hooks
  const [deleteSection] = useDeleteSectionMutation()

  const {
    data: sectionData,
    isLoading,
    refetch,
  } = useGetAllSectionsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })

  // Transform API data to the format expected by the UI
  const sections = useMemo(() => {
    if (!sectionData?.data?.sections) return []

    return sectionData.data.sections.map((section: any) => {
      // Get a consistent color based on section name or index
      const colorIndex = section.name.charCodeAt(0) % colorPalette.length
      const color = colorPalette[colorIndex]

      // Extract teacher info
      const teacher = section.teachers
        ? {
            name: section.teachers.name || "Unknown Teacher",
            avatar: section.teachers.name ? section.teachers.name.charAt(0) : "U",
          }
        : { name: "Not Assigned", avatar: "N" }

      // Extract room info
      const room = section.rooms ? section.rooms.name || "Not Assigned" : "Not Assigned"

      // Extract class info
      const className = section.classes ? section.classes.className || "No Class" : "No Class"

      // Calculate enrollment (placeholder since actual enrolled count isn't in the data)
      const enrolled = Math.floor(Math.random() * section.capacity) || 0
      const fillRate = Math.floor((enrolled / section.capacity) * 100)

      // Format schedule from timeSlots
      let schedule = "No schedule"
      if (section.timeSlots && section.timeSlots.length > 0) {
        const firstSlot = section.timeSlots[0]
        schedule = `${firstSlot.day} ${firstSlot.startTime} - ${firstSlot.endTime}`
        if (section.timeSlots.length > 1) {
          schedule += ` (+${section.timeSlots.length - 1} more)`
        }
      }

      // Determine status based on isActive
      const status = section.isActive ? "Active" : "Inactive"

      return {
        id: section._id,
        name: section.name,
        className: className,
        fullName: `${className} - ${section.name}`,
        capacity: section.capacity,
        enrolled: enrolled,
        teacher: teacher,
        room: room,
        status: status,
        createdAt: new Date(section.createdAt),
        lastUpdated: new Date(section.updatedAt),
        color: color,
        type: section.sectionType || "Regular",
        schedule: schedule,
        fillRate: fillRate,
        description: section.description,
        originalData: section, 
      }
    })
  }, [sectionData])

  // Extract unique class names and section types
  const uniqueClasses = useMemo(() => {
    return [...new Set(sections.map((section: { className: string }) => section.className))]
  }, [sections])

  const uniqueTypes = useMemo(() => {
    return [...new Set(sections.map((section: { type: string }) => section.type))]
  }, [sections])



  // Handle refresh
  const handleRefresh = () => {
    refetch()
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

  // Handle direct delete click
  const handleDirectDeleteClick = (section: any) => {
    setSelectedSection(section)
    setDeleteDialogOpen(true)
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    setAnchorEl(null)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedSection) return

    setIsDeleting(true)
    try {
      await deleteSection(selectedSection.id).unwrap()
      toast.success("Section deleted successfully")
      refetch()
    } catch (error) {
      toast.error("Failed to delete section")
      console.error("Delete error:", error)
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setSelectedSection(null)
    }
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
      const newSelected = filteredSections.map((section:any) => section.id)
      setSelectedSections(newSelected)
      return
    }
    setSelectedSections([])
  }

  const handleSelectOne = (id: string) => {
    const selectedIndex = selectedSections.indexOf(id)
    let newSelected: string[] = []

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

  const handleBatchDelete = async () => {
    setBatchActionAnchorEl(null)

    // Delete multiple sections
    try {
      for (const id of selectedSections) {
        await deleteSection(id).unwrap()
      }
      toast.success(`${selectedSections.length} sections deleted successfully`)
      setSelectedSections([])
      refetch()
    } catch (error) {
      toast.error("Failed to delete some sections")
      console.error("Batch delete error:", error)
    }
  }

  const handleBatchActivate = () => {
    // In a real app, you would call an API to activate the sections
    toast.success(`${selectedSections.length} sections activated`)
    setSelectedSections([])
    setBatchActionAnchorEl(null)
    handleRefresh()
  }

  const handleBatchDeactivate = () => {
    // In a real app, you would call an API to deactivate the sections
    toast.success(`${selectedSections.length} sections deactivated`)
    setSelectedSections([])
    setBatchActionAnchorEl(null)
    handleRefresh()
  }

  // Filter and sort the data
  const filteredSections = sections
    .filter((section:any) => {
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
    .sort((a:any, b:any) => {
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
                  paddingTop: 2,
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
                          label={sections.filter((s: { status: string }) => s.status === "Active").length}
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
                          label={sections.filter((s:any) => s.status === "Inactive").length}
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
                          label={sections.filter((s: { status: string }) => s.status === "Pending").length}
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
                {isLoading ? (
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
                            paginatedSections.map((section:any) => {
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
                                              component={Link}
                                              href={`/dashboard/super_admin/classes/section/edit/${section.id}`}
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
                                      {/* Replace three-dot menu with direct delete button */}
                                      <Tooltip title="Delete Section">
                                        <IconButton
                                          size="small"
                                          onClick={() => handleDirectDeleteClick(section)}
                                          sx={{
                                            color: "error.main",
                                            bgcolor: alpha(theme.palette.error.main, 0.1),
                                            "&:hover": {
                                              bgcolor: alpha(theme.palette.error.main, 0.2),
                                            },
                                          }}
                                        >
                                          <DeleteIcon fontSize="small" />
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

                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      component="div"
                      count={sectionData?.data?.meta?.total || filteredSections.length}
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
        <MenuItem
          component={Link}
          href={`/dashboard/super_admin/classes/section/edit/${selectedSection?.id}`}
          onClick={handleMenuClose}
          sx={{ py: 1.5 }}
        >
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
            Are you sure you want to delete the section &#34;{selectedSection?.fullName}&#34;? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="inherit"
            sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error" sx={{ ml: 2 }} disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={24} color="inherit" /> : "Delete"}
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
            {uniqueClasses.map((className:any, i:number) => (
              <MenuItem key={i} value={className}>
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
            {uniqueTypes.map((type:any, i:number) => (
              <MenuItem key={i} value={type}>
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
