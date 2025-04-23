/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Badge,
  Divider,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Tooltip,
  useTheme,
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
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  ListItemButton,
  useMediaQuery,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Snackbar,
  Alert,
  LinearProgress,
  Fade,
  Checkbox,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material"
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as ContentCopyIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Add as AddIcon,
 
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  FilterAlt as FilterAltIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  ImportExport as ImportExportIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Help as HelpIcon,
  Grading,
} from "@mui/icons-material"
import Link from "next/link"

// Define types
interface GradingSystem {
  id: string
  name: string
  totalMarks: number
  passMarks: number
  createdAt: string
  updatedAt: string
  status: "active" | "inactive" | "draft"
  gradesCount: number
  usedIn: string[]
  createdBy: string
  isFavorite: boolean
  performance?: {
    passRate: number
    averageScore: number
    trend: "up" | "down" | "stable"
  }
}



export default function GradingListPage() {

  const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  // const isTablet = useMediaQuery(theme.breakpoints.down("lg"))

  

  // State for loading
  const [loading, setLoading] = useState(true)

  // State for grading systems
  const [gradingSystems, setGradingSystems] = useState<GradingSystem[]>([])

  // State for pagination
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // State for search
  const [searchTerm, setSearchTerm] = useState("")

  // State for filters
  const [filters, setFilters] = useState({
    status: "all",
    createdBy: "all",
  })


// First define the function - fixed to not depend on 'gs'
const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return theme.palette.success
    case "inactive":
      return theme.palette.warning
    case "draft":
      return theme.palette.info
    default:
      return theme.palette.grey[500]
  }
}

  // State for filter dialog
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)

  // State for sort
  const [sortConfig, setSortConfig] = useState({
    key: "updatedAt",
    direction: "desc" as "asc" | "desc",
  })

  // State for selected items
  const [selected, setSelected] = useState<string[]>([])

  // State for action menu
  const [actionMenu, setActionMenu] = useState<{
    anchorEl: null | HTMLElement
    id: string | null
  }>({
    anchorEl: null,
    id: null,
  })

  // State for bulk action menu
  const [bulkActionMenu, setBulkActionMenu] = useState<null | HTMLElement>(null)

  // State for view mode
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")

  

  // State for snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  })

  // State for delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null as string | null,
    isBulk: false,
  })

  // State for tabs
  const [tabValue, setTabValue] = useState(0)




  // Mock data for grading systems
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData: GradingSystem[] = Array.from({ length: 50 }, (_, index) => ({
        id: `gs-${index + 1}`,
        name: [
          "Standard Grading System",
          "Advanced Placement Grading",
          "International Baccalaureate",
          "Elementary Assessment",
          "College Preparatory Grading",
          "STEM Evaluation System",
          "Arts and Humanities Grading",
          "Physical Education Assessment",
          "Language Proficiency Grading",
          "Special Education Evaluation",
        ][index % 10],
        totalMarks: [100, 200, 50, 20, 10][index % 5],
        passMarks: [33, 40, 60, 70, 50][index % 5],
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
        status: ["active", "inactive", "draft"][index % 3] as "active" | "inactive" | "draft",
        gradesCount: Math.floor(Math.random() * 10) + 3,
        usedIn: [
          "Grade 1",
          "Grade 2",
          "Grade 3",
          "Grade 4",
          "Grade 5",
          "Grade 6",
          "Grade 7",
          "Grade 8",
          "Grade 9",
          "Grade 10",
        ].slice(0, Math.floor(Math.random() * 5) + 1),
        createdBy: ["John Smith", "Maria Garcia", "Ahmed Khan", "Sarah Johnson", "Li Wei"][index % 5],
        isFavorite: index % 7 === 0,
        performance: {
          passRate: Math.floor(Math.random() * 40) + 60,
          averageScore: Math.floor(Math.random() * 30) + 60,
          trend: ["up", "down", "stable"][index % 3] as "up" | "down" | "stable",
        },
      }))

      setGradingSystems(mockData)
      setLoading(false)
    }, 1500)
  }, [])

  // Handle page change
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  // Handle filter change
  const handleFilterChange = (name: string, value: string) => {
    setFilters({
      ...filters,
      [name]: value,
    })
    setPage(0)
  }

  // Handle sort
  const handleSort = (key: keyof GradingSystem) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
    setSortConfig({ key, direction })
  }

  // Handle select all
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredGradingSystems.map((gs) => gs.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  // Handle select one
  const handleSelectOne = (id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = [...selected, id]
    } else {
      newSelected = selected.filter((item) => item !== id)
    }

    setSelected(newSelected)
  }

  // Handle action menu
  const handleActionMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation()
    setActionMenu({
      anchorEl: event.currentTarget,
      id,
    })
  }

  const handleActionMenuClose = () => {
    setActionMenu({
      anchorEl: null,
      id: null,
    })
  }

  // Handle bulk action menu
  const handleBulkActionMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setBulkActionMenu(event.currentTarget)
  }

  const handleBulkActionMenuClose = () => {
    setBulkActionMenu(null)
  }

  

  // Handle delete
  const handleDeleteClick = (id: string, isBulk = false) => {
    setDeleteDialog({
      open: true,
      id,
      isBulk,
    })
    handleActionMenuClose()
    handleBulkActionMenuClose()
  }

  const handleDeleteConfirm = () => {
    if (deleteDialog.isBulk) {
      setGradingSystems(gradingSystems.filter((gs) => !selected.includes(gs.id)))
      setSelected([])
    } else if (deleteDialog.id) {
      setGradingSystems(gradingSystems.filter((gs) => gs.id !== deleteDialog.id))
    }

    setDeleteDialog({
      open: false,
      id: null,
      isBulk: false,
    })

    setSnackbar({
      open: true,
      message: deleteDialog.isBulk
        ? `${selected.length} grading systems deleted successfully`
        : "Grading system deleted successfully",
      severity: "success",
    })
  }

  // Handle favorite toggle
  const handleFavoriteToggle = (id: string) => {
    setGradingSystems(gradingSystems.map((gs) => (gs.id === id ? { ...gs, isFavorite: !gs.isFavorite } : gs)))
  }

  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Filter grading systems based on search, filters, and tabs
  const filteredGradingSystems = gradingSystems
    .filter((gs) => {
      // Search filter
      if (
        searchTerm &&
        !gs.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !gs.id.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      // Status filter
      if (filters.status !== "all" && gs.status !== filters.status) {
        return false
      }

      // Created by filter
      if (filters.createdBy !== "all" && gs.createdBy !== filters.createdBy) {
        return false
      }

      // Tab filter
      if (tabValue === 1 && !gs.isFavorite) {
        return false
      } else if (tabValue === 2 && gs.status !== "active") {
        return false
      } else if (tabValue === 3 && gs.status !== "draft") {
        return false
      }

      return true
    })
    .sort((a, b) => {
      const key = sortConfig.key;
    
      if (key === "name" || key === "createdBy") {
        return sortConfig.direction === "asc" 
          ? a[key].localeCompare(b[key]) 
          : b[key].localeCompare(a[key]);
      } 
      else if (key === "createdAt" || key === "updatedAt") {
        return sortConfig.direction === "asc"
          ? new Date(a[key]).getTime() - new Date(b[key]).getTime()
          : new Date(b[key]).getTime() - new Date(a[key]).getTime();
      } 
      else if (key === "performance") {
        if (!a.performance || !b.performance) return 0;
        return sortConfig.direction === "asc"
          ? a.performance.averageScore - b.performance.averageScore
          : b.performance.averageScore - a.performance.averageScore;
      } 
      else if (key === "totalMarks" || key === "passMarks" || key === "gradesCount") {
        // Explicitly check for numeric properties
        return sortConfig.direction === "asc"
          ? a[key] - b[key]
          : b[key] - a[key];
      }
    
      return 0;
    });

  // Paginate grading systems
  const paginatedGradingSystems = filteredGradingSystems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Get trend icon
  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUpIcon sx={{ color: theme.palette.success.main }} />
      case "down":
        return <TrendingDownIcon sx={{ color: theme.palette.error.main }} />
      case "stable":
        return <ArrowUpwardIcon sx={{ color: theme.palette.info.main, transform: "rotate(45deg)" }} />
    }
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
   

      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", bgcolor: "#f8faff" }}>
       
        {/* Main Content */}
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1, overflow: "auto" }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              Grading Systems
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage all your grading systems in one place
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e0e0e0",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 8,
                    bgcolor: theme.palette.success.main,
                  }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Active Systems
                    </Typography>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(76, 175, 80, 0.1)",
                        color: theme.palette.success.main,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <CheckCircleIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                    {loading ? "-" : gradingSystems.filter((gs) => gs.status === "active").length}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TrendingUpIcon fontSize="small" sx={{ color: theme.palette.success.main, mr: 0.5 }} />
                    <Typography variant="caption" color="success.main">
                      +12% from last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e0e0e0",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 8,
                    bgcolor: theme.palette.warning.main,
                  }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Inactive Systems
                    </Typography>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255, 152, 0, 0.1)",
                        color: theme.palette.warning.main,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <CancelIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                    {loading ? "-" : gradingSystems.filter((gs) => gs.status === "inactive").length}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TrendingDownIcon fontSize="small" sx={{ color: theme.palette.success.main, mr: 0.5 }} />
                    <Typography variant="caption" color="success.main">
                      -5% from last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e0e0e0",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 8,
                    bgcolor: theme.palette.info.main,
                  }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Draft Systems
                    </Typography>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(33, 150, 243, 0.1)",
                        color: theme.palette.info.main,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <EditIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                    {loading ? "-" : gradingSystems.filter((gs) => gs.status === "draft").length}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TrendingUpIcon fontSize="small" sx={{ color: theme.palette.success.main, mr: 0.5 }} />
                    <Typography variant="caption" color="success.main">
                      +8% from last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e0e0e0",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 8,
                    bgcolor: theme.palette.primary.main,
                  }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Systems
                    </Typography>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(63, 81, 181, 0.1)",
                        color: theme.palette.primary.main,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <Grading />
                    </Avatar>
                  </Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                    {loading ? "-" : gradingSystems.length}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TrendingUpIcon fontSize="small" sx={{ color: theme.palette.success.main, mr: 0.5 }} />
                    <Typography variant="caption" color="success.main">
                      +15% from last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Tabs and Actions */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              mb: 2,
              gap: 2,
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                minHeight: 48,
                "& .MuiTab-root": {
                  minHeight: 48,
                  fontWeight: "medium",
                },
                "& .Mui-selected": {
                  fontWeight: "bold",
                },
              }}
            >
              <Tab label="All" />
              <Tab label="Favorites" />
              <Tab label="Active" />
              <Tab label="Drafts" />
            </Tabs>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
              component={Link}
              href='/dashboard/super_admin/grading/new'
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: 2,
                  background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                  boxShadow: "0 4px 20px rgba(33, 150, 243, 0.3)",
                }}
              >
                Create New
              </Button>
              <Button variant="outlined" startIcon={<ImportExportIcon />} sx={{ borderRadius: 2 }}>
                Import / Export
              </Button>
            </Box>
          </Box>

          {/* Main Card */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid #e0e0e0",
            }}
          >
            {/* Toolbar */}
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2,
                borderBottom: "1px solid #e0e0e0",
                bgcolor: "#f5f5f5",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", width: { xs: "100%", sm: "auto" } }}>
                <TextField
                  placeholder="Search grading systems..."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={handleSearch}
                  sx={{ minWidth: 250 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Tooltip title="Filter">
                  <IconButton color="primary" onClick={() => setFilterDialogOpen(true)} sx={{ ml: 1 }}>
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Refresh">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setLoading(true)
                      setTimeout(() => setLoading(false), 1000)
                    }}
                    sx={{ ml: 1 }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                {selected.length > 0 && (
                  <Fade in={selected.length > 0}>
                    <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                      <Chip
                        label={`${selected.length} selected`}
                        color="primary"
                        onDelete={() => setSelected([])}
                        sx={{ mr: 1 }}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<MoreVertIcon />}
                        onClick={handleBulkActionMenuOpen}
                        sx={{ borderRadius: 2 }}
                      >
                        Actions
                      </Button>
                    </Box>
                  </Fade>
                )}

                <FormControlLabel
                  control={
                    <Switch
                      checked={viewMode === "grid"}
                      onChange={(e) => setViewMode(e.target.checked ? "grid" : "table")}
                      color="primary"
                    />
                  }
                  label="Grid View"
                  sx={{ mr: 0 }}
                />
              </Box>
            </Box>

            {/* Loading Indicator */}
            {loading && (
              <LinearProgress
                sx={{
                  height: 3,
                  "& .MuiLinearProgress-bar": {
                    background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                  },
                }}
              />
            )}

            {/* Content */}
            {!loading && filteredGradingSystems.length === 0 ? (
              <Box
                sx={{
                  p: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchIcon sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No grading systems found
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                  Try adjusting your search or filter criteria
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={() => {
                    setSearchTerm("")
                    setFilters({ status: "all", createdBy: "all" })
                    setTabValue(0)
                  }}
                >
                  Reset Filters
                </Button>
              </Box>
            ) : (
              <>
                {/* Table View */}
                {viewMode === "table" && (
                  <TableContainer>
                    <Table sx={{ minWidth: 750 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Checkbox
                              indeterminate={selected.length > 0 && selected.length < filteredGradingSystems.length}
                              checked={
                                filteredGradingSystems.length > 0 && selected.length === filteredGradingSystems.length
                              }
                              onChange={handleSelectAll}
                            />
                          </TableCell>
                          <TableCell padding="none" width={40}>
                            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                              Fav
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                              onClick={() => handleSort("name")}
                            >
                              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                Name
                              </Typography>
                              {sortConfig.key === "name" ? (
                                sortConfig.direction === "asc" ? (
                                  <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                                ) : (
                                  <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                                )
                              ) : null}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                              onClick={() => handleSort("totalMarks")}
                            >
                              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                Total Marks
                              </Typography>
                              {sortConfig.key === "totalMarks" ? (
                                sortConfig.direction === "asc" ? (
                                  <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                                ) : (
                                  <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                                )
                              ) : null}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                              onClick={() => handleSort("passMarks")}
                            >
                              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                Pass Marks
                              </Typography>
                              {sortConfig.key === "passMarks" ? (
                                sortConfig.direction === "asc" ? (
                                  <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                                ) : (
                                  <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                                )
                              ) : null}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                              Status
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                              onClick={() => handleSort("performance")}
                            >
                              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                Performance
                              </Typography>
                              {sortConfig.key === "performance" ? (
                                sortConfig.direction === "asc" ? (
                                  <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                                ) : (
                                  <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                                )
                              ) : null}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                              onClick={() => handleSort("updatedAt")}
                            >
                              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                Last Updated
                              </Typography>
                              {sortConfig.key === "updatedAt" ? (
                                sortConfig.direction === "asc" ? (
                                  <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                                ) : (
                                  <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                                )
                              ) : null}
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                              Actions
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {paginatedGradingSystems.map((gs) => (
                          <TableRow
                            hover
                            key={gs.id}
                            selected={selected.indexOf(gs.id) !== -1}
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                                bgcolor: "rgba(0, 0, 0, 0.04)",
                              },
                            }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selected.indexOf(gs.id) !== -1}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleSelectOne(gs.id)
                                }}
                              />
                            </TableCell>
                            <TableCell padding="none">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleFavoriteToggle(gs.id)
                                }}
                              >
                                {gs.isFavorite ? <StarIcon sx={{ color: "#ffc107" }} /> : <StarBorderIcon />}
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                  sx={{
                                    width: 36,
                                    height: 36,
                                    "&:hover": {
                                      cursor: "pointer",
                                      bgcolor: "rgba(0, 0, 0, 0.04)",
                                    },
                                    mr: 2,
                                  }}
                                 

                                >
                                  <Grading />
                                </Avatar>
                                <Box>
                                  <Typography variant="body1" fontWeight="medium">
                                    {gs.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {gs.id}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>{gs.totalMarks}</TableCell>
                            <TableCell>{gs.passMarks}</TableCell>
                            <TableCell>
                              <Chip
                                label={gs.status.charAt(0).toUpperCase() + gs.status.slice(1)}
                                size="small"
                                sx={{
                                 "&:hover": {
                                      cursor: "pointer",
                                      bgcolor: "rgba(0, 0, 0, 0.04)",
                                    },
                                  fontWeight: "medium",
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {gs.performance && (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                  <Box sx={{ width: "100%", mr: 1 }}>
                                    <LinearProgress
                                      variant="determinate"
                                      value={gs.performance.passRate}
                                      sx={{
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: "#e0e0e0",
                                        "& .MuiLinearProgress-bar": {
                                          bgcolor:
                                            gs.performance.passRate > 80
                                              ? theme.palette.success.main
                                              : gs.performance.passRate > 60
                                                ? theme.palette.warning.main
                                                : theme.palette.error.main,
                                        },
                                      }}
                                    />
                                  </Box>
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography variant="body2" color="text.secondary">
                                      {gs.performance.passRate}%
                                    </Typography>
                                    {getTrendIcon(gs.performance.trend)}
                                  </Box>
                                </Box>
                              )}
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{formatDate(gs.updatedAt)}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <IconButton size="small" onClick={(e) => handleActionMenuOpen(e, gs.id)}>
                                <MoreVertIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}

                {/* Grid View */}
                {viewMode === "grid" && (
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      {paginatedGradingSystems.map((gs) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={gs.id}>
                          <Card
                            elevation={0}
                            sx={{
                              borderRadius: 3,
                              border: "1px solid #e0e0e0",
                              overflow: "hidden",
                              transition: "transform 0.3s, box-shadow 0.3s",
                              "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                              },
                              position: "relative",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                zIndex: 1,
                                display: "flex",
                                gap: 1,
                              }}
                            >
                              <IconButton
                                size="small"
                                sx={{
                                  bgcolor: "white",
                                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                  "&:hover": { bgcolor: "white" },
                                }}
                                onClick={() => handleFavoriteToggle(gs.id)}
                              >
                                {gs.isFavorite ? <StarIcon sx={{ color: "#ffc107" }} /> : <StarBorderIcon />}
                              </IconButton>
                              <IconButton
                                size="small"
                                sx={{
                                  bgcolor: "white",
                                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                  "&:hover": { bgcolor: "white" },
                                }}
                                onClick={(e) => handleActionMenuOpen(e, gs.id)}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </Box>

                            <Box
                              sx={{
                                height: 8,
                                "&:hover": {
                                      cursor: "pointer",
                                      bgcolor: "rgba(0, 0, 0, 0.04)",
                                    },
                                   
                              }}
                            />

                            <CardContent sx={{ p: 3 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 2,
                                }}
                              >
                                <Avatar
                                  sx={{
                                    width: 48,
                                    height: 48,
                                   "&:hover": {
                                      cursor: "pointer",
                                      bgcolor: "rgba(0, 0, 0, 0.04)",
                                    },
                                    mr: 2,
                                  }}
                                >
                                  <Grading />
                                </Avatar>
                                <Box>
                                  <Typography variant="h6" fontWeight="bold" noWrap>
                                    {gs.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {gs.id}
                                  </Typography>
                                </Box>
                              </Box>

                              <Divider sx={{ mb: 2 }} />

                              <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                  <Typography variant="caption" color="text.secondary">
                                    Total Marks
                                  </Typography>
                                  <Typography variant="body1" fontWeight="medium">
                                    {gs.totalMarks}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="caption" color="text.secondary">
                                    Pass Marks
                                  </Typography>
                                  <Typography variant="body1" fontWeight="medium">
                                    {gs.passMarks}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="caption" color="text.secondary">
                                    Grades
                                  </Typography>
                                  <Typography variant="body1" fontWeight="medium">
                                    {gs.gradesCount}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="caption" color="text.secondary">
                                    Status
                                  </Typography>
                                  <Box>
                                    <Chip
                                      label={gs.status.charAt(0).toUpperCase() + gs.status.slice(1)}
                                      size="small"
                                      sx={{
                                        "&:hover": {
                                      cursor: "pointer",
                                      bgcolor: "rgba(0, 0, 0, 0.04)",
                                    },
                                      }}
                                    />
                                  </Box>
                                </Grid>
                              </Grid>

                              {gs.performance && (
                                <Box sx={{ mb: 2 }}>
                                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                                    <Typography variant="caption" color="text.secondary">
                                      Pass Rate
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                      <Typography variant="caption" fontWeight="medium">
                                        {gs.performance.passRate}%
                                      </Typography>
                                      {getTrendIcon(gs.performance.trend)}
                                    </Box>
                                  </Box>
                                  <LinearProgress
                                    variant="determinate"
                                    value={gs.performance.passRate}
                                    sx={{
                                      height: 6,
                                      borderRadius: 3,
                                      bgcolor: "#e0e0e0",
                                      "& .MuiLinearProgress-bar": {
                                        bgcolor:
                                          gs.performance.passRate > 80
                                            ? theme.palette.success.main
                                            : gs.performance.passRate > 60
                                              ? theme.palette.warning.main
                                              : theme.palette.error.main,
                                      },
                                    }}
                                  />
                                </Box>
                              )}

                              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="caption" color="text.secondary">
                                  Updated {formatDate(gs.updatedAt)}
                                </Typography>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  startIcon={<EditIcon />}
                                  sx={{ borderRadius: 2 }}
                                >
                                  Edit
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* Pagination */}
                <TablePagination
                  component="div"
                  count={filteredGradingSystems.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                />
              </>
            )}
          </Paper>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 2,
            textAlign: "center",
            bgcolor: "white",
            borderTop: "1px solid #e0e0e0",
            mt: "auto",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} EduGenius Pro - Advanced School Management System
          </Typography>
        </Box>
      </Box>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FilterAltIcon sx={{ mr: 1 }} />
              Filter Grading Systems
            </Box>
            <IconButton onClick={() => setFilterDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Created By</InputLabel>
              <Select
                value={filters.createdBy}
                onChange={(e) => handleFilterChange("createdBy", e.target.value)}
                label="Created By"
              >
                <MenuItem value="all">All Users</MenuItem>
                <MenuItem value="John Smith">John Smith</MenuItem>
                <MenuItem value="Maria Garcia">Maria Garcia</MenuItem>
                <MenuItem value="Ahmed Khan">Ahmed Khan</MenuItem>
                <MenuItem value="Sarah Johnson">Sarah Johnson</MenuItem>
                <MenuItem value="Li Wei">Li Wei</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setFilters({ status: "all", createdBy: "all" })
            }}
          >
            Reset
          </Button>
          <Button variant="contained" onClick={() => setFilterDialogOpen(false)}>
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu anchorEl={actionMenu.anchorEl} open={Boolean(actionMenu.anchorEl)} onClose={handleActionMenuClose}>
        <MenuItem onClick={handleActionMenuClose}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => actionMenu.id && handleDeleteClick(actionMenu.id)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Bulk Action Menu */}
      <Menu anchorEl={bulkActionMenu} open={Boolean(bulkActionMenu)} onClose={handleBulkActionMenuClose}>
        <MenuItem onClick={handleBulkActionMenuClose}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export Selected</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleBulkActionMenuClose}>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print Selected</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleDeleteClick("", true)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: "error.main" }}>Delete Selected</ListItemText>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ ...deleteDialog, open: false })}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            {deleteDialog.isBulk
              ? `Are you sure you want to delete ${selected.length} selected grading systems? This action cannot be undone.`
              : "Are you sure you want to delete this grading system? This action cannot be undone."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ ...deleteDialog, open: false })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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
    </Box>
  )
}
