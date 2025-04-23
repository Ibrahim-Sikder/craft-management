/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import {
  Add as AddIcon,
  AttachMoney as MoneyIcon,
  CheckCircle as CheckCircleIcon,
  Class as ClassIcon,
  CloudDownload as DownloadIcon,
  Edit as EditIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  PauseCircleOutline as PauseIcon,
  Refresh as RefreshIcon,
  School as SchoolIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material"
import { ThemeProvider, createTheme, alpha } from "@mui/material/styles"

// Create a custom theme with primary color as teal/green
const theme = createTheme({
  palette: {
    primary: {
      main: "#00897b",
      light: "#4ebaaa",
      dark: "#005b4f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#5c6bc0",
      light: "#8e99f3",
      dark: "#26418f",
      contrastText: "#fff",
    },
    background: {
      default: "#f8f9fa",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: "#f5f5f5",
        },
      },
    },
  },
})

// Sample data for fee assignments
const feeAssignments = [
  {
    id: 1,
    className: "Nursery",
    section: "A",
    session: "2024-2025",
    feeTypes: ["Tuition Fee", "Admission Fee", "Library Fee"],
    totalAmount: 7000,
    discountApplied: 0,
    finalAmount: 7000,
    students: 25,
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    status: "active",
    collectionProgress: 65,
  },
  {
    id: 2,
    className: "KG",
    section: "A",
    session: "2024-2025",
    feeTypes: ["Tuition Fee", "Computer Lab Fee", "Sports Fee"],
    totalAmount: 8500,
    discountApplied: 500,
    finalAmount: 8000,
    students: 30,
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    status: "active",
    collectionProgress: 78,
  },
  {
    id: 3,
    className: "Class 1",
    section: "A",
    session: "2024-2025",
    feeTypes: ["Tuition Fee", "Examination Fee", "Library Fee", "Sports Fee"],
    totalAmount: 9500,
    discountApplied: 0,
    finalAmount: 9500,
    students: 35,
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    status: "active",
    collectionProgress: 82,
  },
  {
    id: 4,
    className: "Class 1",
    section: "B",
    session: "2024-2025",
    feeTypes: ["Tuition Fee", "Examination Fee", "Library Fee", "Sports Fee"],
    totalAmount: 9500,
    discountApplied: 950,
    finalAmount: 8550,
    students: 32,
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    status: "active",
    collectionProgress: 75,
  },
  {
    id: 5,
    className: "Class 2",
    section: "A",
    session: "2024-2025",
    feeTypes: ["Tuition Fee", "Examination Fee", "Computer Lab Fee", "Development Fee"],
    totalAmount: 12000,
    discountApplied: 1200,
    finalAmount: 10800,
    students: 38,
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    status: "active",
    collectionProgress: 70,
  },
  {
    id: 6,
    className: "Class 2",
    section: "B",
    session: "2024-2025",
    feeTypes: ["Tuition Fee", "Examination Fee", "Computer Lab Fee", "Development Fee"],
    totalAmount: 12000,
    discountApplied: 0,
    finalAmount: 12000,
    students: 36,
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    status: "active",
    collectionProgress: 68,
  },
  {
    id: 7,
    className: "Class 3",
    section: "A",
    session: "2024-2025",
    feeTypes: ["Tuition Fee", "Examination Fee", "Computer Lab Fee", "Library Fee", "Sports Fee"],
    totalAmount: 13500,
    discountApplied: 0,
    finalAmount: 13500,
    students: 40,
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    status: "active",
    collectionProgress: 60,
  },
  {
    id: 8,
    className: "Class 3",
    section: "B",
    session: "2024-2025",
    feeTypes: ["Tuition Fee", "Examination Fee", "Computer Lab Fee", "Library Fee", "Sports Fee"],
    totalAmount: 13500,
    discountApplied: 1350,
    finalAmount: 12150,
    students: 38,
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    status: "active",
    collectionProgress: 55,
  },
  {
    id: 9,
    className: "HIFZ",
    section: "A",
    session: "2024-2025",
    feeTypes: ["Tuition Fee", "Examination Fee"],
    totalAmount: 7000,
    discountApplied: 700,
    finalAmount: 6300,
    students: 20,
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    status: "active",
    collectionProgress: 90,
  },
  {
    id: 10,
    className: "Summer Program",
    section: "All",
    session: "2023-2024",
    feeTypes: ["Program Fee", "Materials Fee"],
    totalAmount: 5000,
    discountApplied: 0,
    finalAmount: 5000,
    students: 120,
    startDate: "2023-05-15",
    endDate: "2023-07-31",
    status: "inactive",
    collectionProgress: 100,
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

export default function FeeAssignmentListPage() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sessionFilter, setSessionFilter] = useState("all")
  const [orderBy, setOrderBy] = useState("className")
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [selectedDetails, setSelectedDetails] = useState<any>(null)

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget)
    setSelectedAssignment(id)
  }

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedAssignment(null)
  }

  // Handle delete dialog
  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true)
    handleMenuClose()
  }

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false)
  }

  // Handle details dialog
  const handleDetailsDialogOpen = (assignment: any) => {
    setSelectedDetails(assignment)
    setOpenDetailsDialog(true)
  }

  const handleDetailsDialogClose = () => {
    setOpenDetailsDialog(false)
    setSelectedDetails(null)
  }

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

  // Filter assignments based on search term and filters
  const filteredAssignments = feeAssignments.filter((assignment) => {
    const matchesSearch =
      assignment.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.feeTypes.some((fee) => fee.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter
    const matchesSession = sessionFilter === "all" || assignment.session === sessionFilter
    return matchesSearch && matchesStatus && matchesSession
  })

  // Sort assignments
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    const aValue = a[orderBy as keyof typeof a]
    const bValue = b[orderBy as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  // Calculate total stats
  const totalAssignments = feeAssignments.length
  const totalActiveAssignments = feeAssignments.filter((a) => a.status === "active").length
  const totalStudents = feeAssignments.reduce((sum, a) => sum + a.students, 0)
  const totalRevenue = feeAssignments.reduce((sum, a) => sum + a.finalAmount * a.students, 0)
  const totalDiscount = feeAssignments.reduce((sum, a) => sum + a.discountApplied * a.students, 0)

  // Get unique sessions for filter
  const uniqueSessions = Array.from(new Set(feeAssignments.map((a) => a.session)))

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: 4,
          background: "linear-gradient(to bottom, #e0f2f1, #ffffff)",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" color="text.primary" gutterBottom>
                  Fee Assignments
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage all fee assignments across classes and sessions
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" startIcon={<DownloadIcon />}>
                    Export
                  </Button>
                  <Button variant="contained" startIcon={<AddIcon />} href="/fees/assign">
                    New Fee Assignment
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} lg={9}>
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <MoneyIcon sx={{ mr: 1 }} />
                      <Typography variant="h6">All Fee Assignments</Typography>
                    </Box>
                  }
                  action={
                    <Button startIcon={<RefreshIcon />} size="small">
                      Refresh
                    </Button>
                  }
                />
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        placeholder="Search by class, section or fee type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="status-filter-label">Status</InputLabel>
                        <Select
                          labelId="status-filter-label"
                          id="status-filter"
                          value={statusFilter}
                          label="Status"
                          onChange={(e) => setStatusFilter(e.target.value)}
                          startAdornment={
                            <InputAdornment position="start">
                              <FilterListIcon fontSize="small" />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="all">All Statuses</MenuItem>
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="session-filter-label">Session</InputLabel>
                        <Select
                          labelId="session-filter-label"
                          id="session-filter"
                          value={sessionFilter}
                          label="Session"
                          onChange={(e) => setSessionFilter(e.target.value)}
                          startAdornment={
                            <InputAdornment position="start">
                              <SchoolIcon fontSize="small" />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="all">All Sessions</MenuItem>
                          {uniqueSessions.map((session) => (
                            <MenuItem key={session} value={session}>
                              {session}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Tooltip title="Reset Filters">
                        <IconButton
                          onClick={() => {
                            setSearchTerm("")
                            setStatusFilter("all")
                            setSessionFilter("all")
                          }}
                        >
                          <RefreshIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Box>

                <TableContainer component={Paper} elevation={0}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "className"}
                            direction={orderBy === "className" ? order : "asc"}
                            onClick={() => handleRequestSort("className")}
                          >
                            Class
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "session"}
                            direction={orderBy === "session" ? order : "asc"}
                            onClick={() => handleRequestSort("session")}
                          >
                            Session
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>Fee Types</TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "finalAmount"}
                            direction={orderBy === "finalAmount" ? order : "asc"}
                            onClick={() => handleRequestSort("finalAmount")}
                          >
                            Amount
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "students"}
                            direction={orderBy === "students" ? order : "asc"}
                            onClick={() => handleRequestSort("students")}
                          >
                            Students
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>Collection</TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "status"}
                            direction={orderBy === "status" ? order : "asc"}
                            onClick={() => handleRequestSort("status")}
                          >
                            Status
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedAssignments
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((assignment) => (
                          <TableRow
                            key={assignment.id}
                            sx={{
                              "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.04) },
                              transition: "background-color 0.2s",
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                  sx={{
                                    width: 36,
                                    height: 36,
                                    mr: 2,
                                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                                    color: theme.palette.primary.main,
                                  }}
                                >
                                  <ClassIcon fontSize="small" />
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle2">
                                    {assignment.className} - {assignment.section}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {new Date(assignment.startDate).toLocaleDateString()} to{" "}
                                    {new Date(assignment.endDate).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={assignment.session}
                                size="small"
                                color={assignment.session === "2024-2025" ? "primary" : "default"}
                                variant={assignment.session === "2024-2025" ? "filled" : "outlined"}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {assignment.feeTypes.length > 2 ? (
                                  <>
                                    <Chip
                                      label={assignment.feeTypes[0]}
                                      size="small"
                                      variant="outlined"
                                      sx={{ fontSize: "0.7rem" }}
                                    />
                                    <Chip
                                      label={`+${assignment.feeTypes.length - 1} more`}
                                      size="small"
                                      variant="outlined"
                                      sx={{ fontSize: "0.7rem" }}
                                      onClick={() => handleDetailsDialogOpen(assignment)}
                                    />
                                  </>
                                ) : (
                                  assignment.feeTypes.map((fee, index) => (
                                    <Chip
                                      key={index}
                                      label={fee}
                                      size="small"
                                      variant="outlined"
                                      sx={{ fontSize: "0.7rem" }}
                                    />
                                  ))
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" fontWeight={500}>
                                  {formatCurrency(assignment.finalAmount)}
                                </Typography>
                                {assignment.discountApplied > 0 && (
                                  <Typography variant="caption" color="error.main">
                                    {formatCurrency(assignment.discountApplied)} discount
                                  </Typography>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight={500}>
                                {assignment.students}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", width: 120 }}>
                                <Box sx={{ width: "100%", mr: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={assignment.collectionProgress}
                                    sx={{ height: 8, borderRadius: 4 }}
                                    color={
                                      assignment.collectionProgress >= 80
                                        ? "success"
                                        : assignment.collectionProgress >= 50
                                          ? "primary"
                                          : "warning"
                                    }
                                  />
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                  {assignment.collectionProgress}%
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                icon={assignment.status === "active" ? <CheckCircleIcon /> : <PauseIcon />}
                                label={assignment.status === "active" ? "Active" : "Inactive"}
                                size="small"
                                color={assignment.status === "active" ? "success" : "default"}
                                variant={assignment.status === "active" ? "filled" : "outlined"}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Tooltip title="View Details">
                                <IconButton
                                  size="small"
                                  sx={{ mr: 0.5 }}
                                  onClick={() => handleDetailsDialogOpen(assignment)}
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton size="small" color="primary" sx={{ mr: 0.5 }}>
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <IconButton
                                size="small"
                                onClick={(event) => handleMenuOpen(event, assignment.id)}
                                aria-label="more options"
                              >
                                <MoreVertIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      {filteredAssignments.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                            <Typography variant="subtitle1" color="text.secondary">
                              No fee assignments found matching your filters
                            </Typography>
                            <Button
                              variant="text"
                              startIcon={<RefreshIcon />}
                              onClick={() => {
                                setSearchTerm("")
                                setStatusFilter("all")
                                setSessionFilter("all")
                              }}
                              sx={{ mt: 1 }}
                            >
                              Reset Filters
                            </Button>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredAssignments.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
            </Grid>

            <Grid item xs={12} lg={3}>
              <Stack spacing={3}>
                <Card>
                  <CardHeader
                    title="Fee Summary"
                    subheader="Overview of all fee assignments"
                    sx={{ bgcolor: "grey.100" }}
                  />
                  <CardContent>
                    <Stack spacing={3}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="subtitle2" color="primary.main" gutterBottom>
                          Total Assignments
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>
                          {totalAssignments}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {totalActiveAssignments} active assignments
                          </Typography>
                        </Box>
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.info.main, 0.1),
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="subtitle2" color="info.main" gutterBottom>
                          Total Students
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>
                          {totalStudents}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Across all classes and sections
                          </Typography>
                        </Box>
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.success.main, 0.1),
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="subtitle2" color="success.main" gutterBottom>
                          Total Revenue
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>
                          {formatCurrency(totalRevenue)}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Expected revenue from all assignments
                          </Typography>
                        </Box>
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="subtitle2" color="error.main" gutterBottom>
                          Total Discounts
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>
                          {formatCurrency(totalDiscount)}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {((totalDiscount / (totalRevenue + totalDiscount)) * 100).toFixed(1)}% of gross revenue
                          </Typography>
                        </Box>
                      </Paper>
                    </Stack>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    title="Collection Progress"
                    subheader="Fee collection by percentage"
                    sx={{ bgcolor: "grey.100" }}
                  />
                  <CardContent>
                    <Stack spacing={2}>
                      {[
                        { range: "90-100%", count: 1, color: "success" },
                        { range: "75-89%", count: 2, color: "primary" },
                        { range: "50-74%", count: 4, color: "info" },
                        { range: "25-49%", count: 2, color: "warning" },
                        { range: "0-24%", count: 1, color: "error" },
                      ].map((item) => (
                        <Box
                          key={item.range}
                          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                bgcolor: theme.palette[item.color as "primary"].main,
                                mr: 1.5,
                              }}
                            />
                            <Typography variant="body2">{item.range}</Typography>
                          </Box>
                          <Typography variant="body2" fontWeight={500}>
                            {item.count} classes
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary="View Details" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary="Edit Assignment" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary="Send Reminders" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteDialogOpen} sx={{ color: "error.main" }}>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Fee Assignment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this fee assignment? This action cannot be undone and will remove all
            associated records.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteDialogClose} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Details Dialog */}
      {selectedDetails && (
        <Dialog open={openDetailsDialog} onClose={handleDetailsDialogClose} maxWidth="md" fullWidth>
          <DialogTitle>
            Fee Assignment Details: {selectedDetails.className} - {selectedDetails.section}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Class Information
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Class:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {selectedDetails.className} - {selectedDetails.section}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Session:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {selectedDetails.session}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Students:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {selectedDetails.students}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Status:
                      </Typography>
                      <Chip
                        label={selectedDetails.status === "active" ? "Active" : "Inactive"}
                        size="small"
                        color={selectedDetails.status === "active" ? "success" : "default"}
                      />
                    </Box>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Fee Period
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Start Date:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {new Date(selectedDetails.startDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        End Date:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {new Date(selectedDetails.endDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Collection Progress:
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LinearProgress
                          variant="determinate"
                          value={selectedDetails.collectionProgress}
                          sx={{ width: 100, height: 8, borderRadius: 4, mr: 1 }}
                          color={
                            selectedDetails.collectionProgress >= 80
                              ? "success"
                              : selectedDetails.collectionProgress >= 50
                                ? "primary"
                                : "warning"
                          }
                        />
                        <Typography variant="body2" fontWeight={500}>
                          {selectedDetails.collectionProgress}%
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Fee Types
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Fee Type</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Frequency</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedDetails.feeTypes.map((fee: string, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{fee}</TableCell>
                          <TableCell align="right">
                            {formatCurrency(
                              fee === "Tuition Fee"
                                ? 5000
                                : fee === "Admission Fee"
                                  ? 10000
                                  : fee === "Examination Fee"
                                    ? 2000
                                    : fee === "Library Fee"
                                      ? 1000
                                      : fee === "Sports Fee"
                                        ? 1500
                                        : fee === "Computer Lab Fee"
                                          ? 2000
                                          : fee === "Development Fee"
                                            ? 5000
                                            : fee === "Program Fee"
                                              ? 3000
                                              : fee === "Materials Fee"
                                                ? 2000
                                                : 1000,
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {fee === "Tuition Fee" || fee === "Computer Lab Fee"
                              ? "Monthly"
                              : fee === "Admission Fee"
                                ? "One-time"
                                : fee === "Examination Fee"
                                  ? "Term"
                                  : "Annual"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableHead>
                      <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell align="right">{formatCurrency(selectedDetails.totalAmount)}</TableCell>
                        <TableCell />
                      </TableRow>
                      {selectedDetails.discountApplied > 0 && (
                        <>
                          <TableRow>
                            <TableCell>Discount</TableCell>
                            <TableCell align="right" sx={{ color: "error.main" }}>
                              -{formatCurrency(selectedDetails.discountApplied)}
                            </TableCell>
                            <TableCell />
                          </TableRow>
                          <TableRow>
                            <TableCell>Final Amount</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>
                              {formatCurrency(selectedDetails.finalAmount)}
                            </TableCell>
                            <TableCell />
                          </TableRow>
                        </>
                      )}
                    </TableHead>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total Revenue
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{ p: 2, bgcolor: alpha(theme.palette.success.main, 0.05), borderColor: "success.light" }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">
                        Per Student:
                      </Typography>
                      <Typography variant="h6" color="success.main" fontWeight={600}>
                        {formatCurrency(selectedDetails.finalAmount)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">
                        Total Students:
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        {selectedDetails.students}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">
                        Total Revenue:
                      </Typography>
                      <Typography variant="h6" color="success.main" fontWeight={600}>
                        {formatCurrency(selectedDetails.finalAmount * selectedDetails.students)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button startIcon={<NotificationsIcon />} color="primary">
              Send Reminders
            </Button>
            <Button startIcon={<EditIcon />} color="primary">
              Edit Assignment
            </Button>
            <Button onClick={handleDetailsDialogClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </ThemeProvider>
  )
}
 