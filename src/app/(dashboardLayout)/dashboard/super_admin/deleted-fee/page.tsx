/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Pagination,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Divider,
  Alert,
  Snackbar,
  LinearProgress,
  useTheme,
  alpha,
} from "@mui/material"
import {
  Home as HomeIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  FilterAlt as FilterIcon,
  CalendarMonth as CalendarIcon,
  School as SchoolIcon,
  Person as StudentIcon,
  AttachMoney as MoneyIcon,
  Receipt as ReceiptIcon,
  Restore as RestoreIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  History as HistoryIcon,
} from "@mui/icons-material"

// Mock data for deleted fees
const mockDeletedFees = [
  {
    id: 1,
    studentId: "2025124",
    studentName: "MOHAMMAD KHALID",
    date: "18 Mar 2025 10:17:44",
    feeName: "মাসিক বেতন January - 2025",
    class: "One",
    session: "2025",
    amount: 3000.0,
    user: "Craft International Institute-Admin",
    deleteReason: "None",
  },
  {
    id: 2,
    studentId: "2025124",
    studentName: "MOHAMMAD KHALID",
    date: "18 Mar 2025 10:17:44",
    feeName: "মাসিক বেতন February - 2025",
    class: "One",
    session: "2025",
    amount: 3000.0,
    user: "Craft International Institute-Admin",
    deleteReason: "None",
  },
  {
    id: 3,
    studentId: "2025124",
    studentName: "MOHAMMAD KHALID",
    date: "18 Mar 2025 10:17:44",
    feeName: "মাসিক বেতন March - 2025",
    class: "One",
    session: "2025",
    amount: 3000.0,
    user: "Craft International Institute-Admin",
    deleteReason: "None",
  },
  {
    id: 4,
    studentId: "2025124",
    studentName: "MOHAMMAD KHALID",
    date: "18 Mar 2025 10:17:44",
    feeName: "ভর্তি ফি",
    class: "One",
    session: "2025",
    amount: 3000.0,
    user: "Craft International Institute-Admin",
    deleteReason: "None",
  },
  {
    id: 5,
    studentId: "2025312",
    studentName: "MST JAMILA AKTER",
    date: "16 Mar 2025 21:42:22",
    feeName: "মাসিক বেতন March - 2025",
    class: "Three",
    session: "2025",
    amount: 3500.0,
    user: "None",
    deleteReason: "None",
  },
  {
    id: 6,
    studentId: "2025312",
    studentName: "MST JAMILA AKTER",
    date: "16 Mar 2025 21:42:22",
    feeName: "মাসিক বেতন February - 2025",
    class: "Three",
    session: "2025",
    amount: 3500.0,
    user: "None",
    deleteReason: "None",
  },
  {
    id: 7,
    studentId: "2025312",
    studentName: "MST JAMILA AKTER",
    date: "16 Mar 2025 21:42:22",
    feeName: "মাসিক বেতন January - 2025",
    class: "Three",
    session: "2025",
    amount: 3500.0,
    user: "None",
    deleteReason: "None",
  },
  {
    id: 8,
    studentId: "2025602",
    studentName: "MOSADDIQUL ISLAM AJMAL",
    date: "16 Mar 2025 21:25:24",
    feeName: "ভর্তি ফি",
    class: "Six",
    session: "2025",
    amount: 5000.0,
    user: "Craft International Institute-Admin",
    deleteReason: "None",
  },
  {
    id: 9,
    studentId: "2025502",
    studentName: "ABDUL MAZID AZMI",
    date: "16 Mar 2025 21:13:06",
    feeName: "ভর্তি ফি",
    class: "Five",
    session: "2025",
    amount: 5000.0,
    user: "Craft International Institute-Admin",
    deleteReason: "None",
  },
  {
    id: 10,
    studentId: "2025502",
    studentName: "ABDUL MAZID AZMI",
    date: "16 Mar 2025 21:11:24",
    feeName: "ভর্তি ফি",
    class: "Five",
    session: "2025",
    amount: 3000.0,
    user: "None",
    deleteReason: "None",
  },
  {
    id: 11,
    studentId: "",
    studentName: "",
    date: "18 Mar 2025 17:34:02",
    feeName: "মাসিক বেতন January - 2025",
    class: "",
    session: "",
    amount: 5000.0,
    user: "None",
    deleteReason: "None",
  },
  {
    id: 12,
    studentId: "",
    studentName: "",
    date: "18 Mar 2025 17:34:02",
    feeName: "মাসিক বেতন February - 2025",
    class: "",
    session: "",
    amount: 5000.0,
    user: "None",
    deleteReason: "None",
  },
]

// Mock data for students (for dropdown)
const mockStudents = [
  { id: "2025124", name: "MOHAMMAD KHALID" },
  { id: "2025312", name: "MST JAMA AKTER" },
  { id: "2025602", name: "MOSADDIQUL ISLAM JAMAL" },
  { id: "2025502", name: "ABDUL MAZID AZMI" },
]

// Mock data for fee types (for dropdown)
const mockFeeTypes = [
  { id: 1, name: "মাসিক বেতন January - 2025" },
  { id: 2, name: "মাসিক বেতন February - 2025" },
  { id: 3, name: "মাসিক বেতন March - 2025" },
  { id: 4, name: "ভর্তি ফি" },
]

// Mock data for classes (for dropdown)
const mockClasses = [
  { id: 1, name: "One" },
  { id: 2, name: "Three" },
  { id: 3, name: "Five" },
  { id: 4, name: "Six" },
]

export default function DeletedFeePage() {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [deletedFees, setDeletedFees] = useState(mockDeletedFees)
  const [filteredFees, setFilteredFees] = useState(mockDeletedFees)
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedFeeType, setSelectedFeeType] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [openRestoreDialog, setOpenRestoreDialog] = useState(false)
  const [selectedFee, setSelectedFee] = useState<any>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success")
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)

  const rowsPerPage = 10
  const totalPages = Math.ceil(filteredFees.length / rowsPerPage)

  // Calculate total amount of deleted fees
  const totalDeletedAmount = filteredFees.reduce((sum, fee) => sum + fee.amount, 0)

  // Handle filter action
  const handleFilter = () => {
    setLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const filtered = deletedFees.filter((fee) => {
        const studentMatch = selectedStudent ? fee.studentId === selectedStudent : true
        const feeTypeMatch = selectedFeeType ? fee.feeName === selectedFeeType : true
        const classMatch = selectedClass ? fee.class === selectedClass : true

        // Date filtering would go here in a real implementation
        // This is a simplified version
        const dateMatch = true

        return studentMatch && feeTypeMatch && classMatch && dateMatch
      })

      setFilteredFees(filtered)
      setPage(1)
      setLoading(false)
    }, 500)
  }

  // Handle reset filters
  const handleResetFilters = () => {
    setSelectedStudent("")
    setSelectedFeeType("")
    setSelectedClass("")
    setStartDate("")
    setEndDate("")
    setFilteredFees(deletedFees)
    setPage(1)
  }

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  // Handle restore fee
  const handleRestoreFee = () => {
    setLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      // In a real app, you would call your API to restore the fee
      const updatedFees = deletedFees.filter((fee) => fee.id !== selectedFee.id)
      setDeletedFees(updatedFees)
      setFilteredFees(updatedFees)
      setOpenRestoreDialog(false)
      setSelectedFee(null)
      setLoading(false)

      // Show success message
      setSnackbarMessage("Fee has been successfully restored")
      setSnackbarSeverity("success")
      setSnackbarOpen(true)
    }, 800)
  }

  // Handle view details
  const handleViewDetails = (fee: any) => {
    setSelectedFee(fee)
    setDetailsDialogOpen(true)
  }

  // Calculate displayed rows based on pagination
  const displayedRows = filteredFees.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: "white" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" size="small">
              Dashboard
            </Button>
            <Button variant="outlined" size="small">
              Branch
            </Button>
            <Button variant="outlined" size="small">
              + New
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton size="small">
              <HomeIcon />
            </IconButton>
            <IconButton size="small">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#e0e0e0" }}>
                <PersonIcon fontSize="small" />
              </Avatar>
              <Typography variant="body2" sx={{ ml: 1 }}>
                Craft International Institute
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Title */}
      <Box sx={{ bgcolor: "#f9f9f9", py: 2, px: 3, borderBottom: "1px solid #e0e0e0" }}>
        <Typography variant="h6" sx={{ fontWeight: 500, display: "flex", alignItems: "center", gap: 1 }}>
          <HistoryIcon color="error" />
          Deleted Fee Records
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
        {/* Filter Card */}
        <Card elevation={1} sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Student</InputLabel>
                  <Select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    label="Student"
                    startAdornment={
                      <InputAdornment position="start">
                        <StudentIcon fontSize="small" color="action" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    {mockStudents.map((student) => (
                      <MenuItem key={student.id} value={student.id}>
                        {student.name} ({student.id})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Fee Type</InputLabel>
                  <Select
                    value={selectedFeeType}
                    onChange={(e) => setSelectedFeeType(e.target.value)}
                    label="Fee Type"
                    startAdornment={
                      <InputAdornment position="start">
                        <ReceiptIcon fontSize="small" color="action" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    {mockFeeTypes.map((feeType) => (
                      <MenuItem key={feeType.id} value={feeType.name}>
                        {feeType.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Class</InputLabel>
                  <Select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    label="Class"
                    startAdornment={
                      <InputAdornment position="start">
                        <SchoolIcon fontSize="small" color="action" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    {mockClasses.map((classItem) => (
                      <MenuItem key={classItem.id} value={classItem.name}>
                        {classItem.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="From Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="To Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={9}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFilter}
                    startIcon={<FilterIcon />}
                    sx={{ bgcolor: "#6366f1" }}
                  >
                    Filter
                  </Button>
                  <Button variant="outlined" onClick={handleResetFilters} startIcon={<RefreshIcon />}>
                    Reset
                  </Button>
                  <Button variant="outlined" color="primary" startIcon={<DownloadIcon />}>
                    Export
                  </Button>
                  <Button variant="outlined" color="primary" startIcon={<PrintIcon />}>
                    Print
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              flex: 1,
              display: "flex",
              alignItems: "center",
              bgcolor: alpha(theme.palette.error.main, 0.1),
              borderLeft: `4px solid ${theme.palette.error.main}`,
            }}
          >
            <DeleteIcon color="error" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {filteredFees.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Deleted Fees
              </Typography>
            </Box>
          </Paper>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              flex: 1,
              display: "flex",
              alignItems: "center",
              bgcolor: alpha(theme.palette.warning.main, 0.1),
              borderLeft: `4px solid ${theme.palette.warning.main}`,
            }}
          >
            <MoneyIcon color="warning" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                ₹{totalDeletedAmount.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Amount
              </Typography>
            </Box>
          </Paper>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              flex: 1,
              display: "flex",
              alignItems: "center",
              bgcolor: alpha(theme.palette.info.main, 0.1),
              borderLeft: `4px solid ${theme.palette.info.main}`,
            }}
          >
            <SchoolIcon color="info" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {new Set(filteredFees.map((fee) => fee.studentId).filter(Boolean)).size}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Students Affected
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Deleted Fees Table */}
        <Paper elevation={1}>
          {loading && <LinearProgress />}
          <TableContainer sx={{
            overflowX: "auto",  
            WebkitOverflowScrolling: "touch",  
            maxWidth: "100vw"  
          }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Fee Name</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Session</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Delete Reason</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedRows.length > 0 ? (
                  displayedRows.map((fee) => (
                    <TableRow key={fee.id} hover>
                      <TableCell>{fee.studentId || "-"}</TableCell>
                      <TableCell>{fee.studentName || "-"}</TableCell>
                      <TableCell>{fee.date}</TableCell>
                      <TableCell>{fee.feeName}</TableCell>
                      <TableCell>{fee.class || "-"}</TableCell>
                      <TableCell>{fee.session || "-"}</TableCell>
                      <TableCell align="right">
                        <Typography fontWeight="medium" color="error">
                          ₹{fee.amount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>{fee.user === "None" ? "-" : fee.user}</TableCell>
                      <TableCell>{fee.deleteReason === "None" ? "-" : fee.deleteReason}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                          <Tooltip title="View Details">
                            <IconButton size="small" color="info" onClick={() => handleViewDetails(fee)}>
                              <InfoIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Restore Fee">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => {
                                setSelectedFee(fee)
                                setOpenRestoreDialog(true)
                              }}
                            >
                              <RestoreIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="textSecondary">
                        No deleted fee records found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2, borderTop: "1px solid #e0e0e0" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              size="small"
            />
          </Box>
        </Paper>
      </Box>

      {/* Restore Dialog */}
      <Dialog open={openRestoreDialog} onClose={() => setOpenRestoreDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Restore Fee</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Are you sure you want to restore this fee record?
          </Alert>
          {selectedFee && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Student:</strong> {selectedFee.studentName || "-"} ({selectedFee.studentId || "-"})
              </Typography>
              <Typography variant="body2">
                <strong>Fee:</strong> {selectedFee.feeName}
              </Typography>
              <Typography variant="body2">
                <strong>Amount:</strong> ₹{selectedFee.amount.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                <strong>Date:</strong> {selectedFee.date}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRestoreDialog(false)}>Cancel</Button>
          <Button onClick={handleRestoreFee} variant="contained" color="success" startIcon={<RestoreIcon />}>
            Restore
          </Button>
        </DialogActions>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={detailsDialogOpen} onClose={() => setDetailsDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Fee Details</DialogTitle>
        <DialogContent>
          {selectedFee && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    Student Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Student ID
                      </Typography>
                      <Typography variant="body1">{selectedFee.studentId || "-"}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Student Name
                      </Typography>
                      <Typography variant="body1">{selectedFee.studentName || "-"}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Class
                      </Typography>
                      <Typography variant="body1">{selectedFee.class || "-"}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Session
                      </Typography>
                      <Typography variant="body1">{selectedFee.session || "-"}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    Fee Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Fee Name
                      </Typography>
                      <Typography variant="body1">{selectedFee.feeName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Amount
                      </Typography>
                      <Typography variant="body1" color="error" fontWeight="medium">
                        ₹{selectedFee.amount.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        Deletion Date
                      </Typography>
                      <Typography variant="body1">{selectedFee.date}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    Deletion Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Deleted By
                      </Typography>
                      <Typography variant="body1">{selectedFee.user === "None" ? "-" : selectedFee.user}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Reason
                      </Typography>
                      <Typography variant="body1">
                        {selectedFee.deleteReason === "None" ? "-" : selectedFee.deleteReason}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<RestoreIcon />}
            onClick={() => {
              setDetailsDialogOpen(false)
              setOpenRestoreDialog(true)
            }}
          >
            Restore Fee
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
