/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"
import {
  CheckCircle,
  FilterList,
  Home,
  Info,
  Notifications,
  Person,
  Refresh,
  Save,
  School,
  Search,
  SwapHoriz,
} from "@mui/icons-material"

// Mock data for students
const mockStudents = [
  {
    id: "STD001",
    name: "John Smith",
    fatherName: "Robert Smith",
    studentMobile: "1234567890",
    parentMobile: "9876543210",
    class: "Class 3",
    section: "Section A",
    batch: "Batch 2023",
    roll: "101",
    dakhela: "DK001",
    status: "Active",
    selected: false,
  },
  {
    id: "STD002",
    name: "Emily Johnson",
    fatherName: "Michael Johnson",
    studentMobile: "2345678901",
    parentMobile: "8765432109",
    class: "Class 2",
    section: "Section B",
    batch: "Batch 2023",
    roll: "102",
    dakhela: "DK002",
    status: "Active",
    selected: false,
  },
  {
    id: "STD003",
    name: "David Williams",
    fatherName: "James Williams",
    studentMobile: "3456789012",
    parentMobile: "7654321098",
    class: "Class 1",
    section: "Section A",
    batch: "Batch 2023",
    roll: "103",
    dakhela: "DK003",
    status: "Inactive",
    selected: false,
  },
  {
    id: "STD004",
    name: "Sarah Brown",
    fatherName: "Jennifer Brown",
    studentMobile: "4567890123",
    parentMobile: "6543210987",
    class: "Class 3",
    section: "Section C",
    batch: "Batch 2023",
    roll: "104",
    dakhela: "DK004",
    status: "Active",
    selected: false,
  },
  {
    id: "STD005",
    name: "Michael Davis",
    fatherName: "Christopher Davis",
    studentMobile: "5678901234",
    parentMobile: "5432109876",
    class: "Class 2",
    section: "Section A",
    batch: "Batch 2023",
    roll: "105",
    dakhela: "DK005",
    status: "Graduated",
    selected: false,
  },
]

const StudentStatusMigration = () => {
  const theme = useTheme()
  const [students, setStudents] = useState(mockStudents)
  const [filteredStudents, setFilteredStudents] = useState(mockStudents)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectAll, setSelectAll] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const [formData, setFormData] = useState({
    dakhela: "",
    relation: "",
    class: "",
    batch: "",
    section: "",
    activeSession: "2025",
    status: "Active",
    additionalNote: "",
    previousDues: "0",
    otherFee: "0",
    sendAttendanceSms: false,
  })

  // Handle search
  useEffect(() => {
    const results = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentMobile.includes(searchTerm) ||
        student.parentMobile.includes(searchTerm) ||
        student.dakhela?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredStudents(results)
    setPage(0)
  }, [searchTerm, students])

  // Handle form data change
  const handleFormChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle page change
  const handleChangePage = (newPage: any) => {
    setPage(newPage)
  }

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // Handle select all
  const handleSelectAll = (event: any) => {
    const checked = event.target.checked
    setSelectAll(checked)
    setStudents(
      students.map((student) => ({
        ...student,
        selected: checked,
      })),
    )
  }

  // Handle select one
  const handleSelectOne = (id: any) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, selected: !student.selected } : student,
    )
    setStudents(updatedStudents)
    setSelectAll(updatedStudents.every((student) => student.selected))
  }

  // Handle save/migrate status
  const handleSave = () => {
    const selectedStudents = students.filter((student) => student.selected)

    if (selectedStudents.length === 0) {
      setSnackbarMessage("Please select at least one student")
      setSnackbarOpen(true)
      return
    }
    const updatedStudents = students.map((student) =>
      student.selected ? { ...student, status: formData.status, selected: false } : student,
    )

    setStudents(updatedStudents)
    setSelectAll(false)

    // Show success message
    setSnackbarMessage(`Successfully updated status for ${selectedStudents.length} students`)
    setSnackbarOpen(true)
  }

  // Reset filters
  const resetFilters = () => {
    setFormData({
      dakhela: "",
      relation: "",
      class: "",
      batch: "",
      section: "",
      activeSession: "2025",
      status: "Active",
      additionalNote: "",
      previousDues: "0",
      otherFee: "0",
      sendAttendanceSms: false,
    })
    setSearchTerm("")
  }

  // Get status chip color
  const getStatusColor = (status: any) => {
    switch (status) {
      case "Active":
        return "success"
      case "Inactive":
        return "error"
      case "Graduated":
        return "info"
      case "Transferred":
        return "warning"
      case "Suspended":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{ mb: 3, bgcolor: theme.palette.primary.main, color: "white", py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <SwapHoriz sx={{ mr: 1 }} />
          <Typography variant="h5" component="h1">
            Migrate Student Status
          </Typography>
        </Box>
      </Paper>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <School sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="h6">Status Information</Typography>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              size="small"
              sx={{ ml: "auto" }}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            <Button variant="outlined" startIcon={<Refresh />} size="small" sx={{ ml: 1 }} onClick={resetFilters}>
              Reset
            </Button>
          </Box>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Dakhela Number"
                name="dakhela"
                value={formData.dakhela}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Relation"
                name="relation"
                value={formData.relation}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select name="class" value={formData.class} label="Class" onChange={handleFormChange}>
                  <MenuItem value="">---------</MenuItem>
                  <MenuItem value="Class1">Class 1</MenuItem>
                  <MenuItem value="Class2">Class 2</MenuItem>
                  <MenuItem value="Class3">Class 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {showFilters && (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Batch</InputLabel>
                    <Select name="batch" value={formData.batch} label="Batch" onChange={handleFormChange}>
                      <MenuItem value="">---------</MenuItem>
                      <MenuItem value="Batch2023">Batch 2023</MenuItem>
                      <MenuItem value="Batch2024">Batch 2024</MenuItem>
                      <MenuItem value="Batch2025">Batch 2025</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Section</InputLabel>
                    <Select name="section" value={formData.section} label="Section" onChange={handleFormChange}>
                      <MenuItem value="">---------</MenuItem>
                      <MenuItem value="SectionA">Section A</MenuItem>
                      <MenuItem value="SectionB">Section B</MenuItem>
                      <MenuItem value="SectionC">Section C</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Active Session</InputLabel>
                    <Select
                      name="activeSession"
                      value={formData.activeSession}
                      label="Active Session"
                      onChange={handleFormChange}
                    >
                      <MenuItem value="2023">2023</MenuItem>
                      <MenuItem value="2024">2024</MenuItem>
                      <MenuItem value="2025">2025</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={formData.status} label="Status" onChange={handleFormChange}>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Graduated">Graduated</MenuItem>
                  <MenuItem value="Transferred">Transferred</MenuItem>
                  <MenuItem value="Suspended">Suspended</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Additional Note"
                name="additionalNote"
                value={formData.additionalNote}
                onChange={handleFormChange}
                multiline
                rows={1}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Previous Dues"
                name="previousDues"
                type="number"
                value={formData.previousDues}
                onChange={handleFormChange}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>

            {showFilters && (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Other Fee"
                    name="otherFee"
                    type="number"
                    value={formData.otherFee}
                    onChange={handleFormChange}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                  <FormControlLabel
                    control={
                      <Switch
                        name="sendAttendanceSms"
                        checked={formData.sendAttendanceSms}
                        onChange={handleFormChange}
                        color="primary"
                      />
                    }
                    label="Send attendance SMS"
                  />
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Info sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="h6">Migrate Status</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search by name, ID, father name, or mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle1">Select Students to Update Status</Typography>
              <Chip
                label={`${students.filter((s) => s.selected).length} selected`}
                color="primary"
                size="small"
                sx={{ ml: 2 }}
                variant={students.some((s) => s.selected) ? "filled" : "outlined"}
              />
            </Box>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: theme.palette.action.hover }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectAll}
                      onChange={handleSelectAll}
                      indeterminate={students.some((student) => student.selected) && !selectAll}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Father Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Student Mobile</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Parent Mobile</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Current Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
                    <TableRow
                      key={student.id}
                      hover
                      selected={student.selected}
                      onClick={() => handleSelectOne(student.id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={student.selected} onChange={() => handleSelectOne(student.id)} />
                      </TableCell>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              bgcolor: theme.palette.primary.light,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              mr: 1,
                            }}
                          >
                            <Person fontSize="small" />
                          </Box>
                          {student.name}
                        </Box>
                      </TableCell>
                      <TableCell>{student.fatherName}</TableCell>
                      <TableCell>{student.studentMobile}</TableCell>
                      <TableCell>{student.parentMobile}</TableCell>
                      <TableCell>
                        <Chip label={student.status} size="small" color={getStatusColor(student.status)} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1">No students found</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Try adjusting your search criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredStudents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Save />}
          onClick={handleSave}
          disabled={!students.some((student) => student.selected)}
          sx={{ px: 4, py: 1 }}
        >
          Save Status Changes
        </Button>
      </Box>

      {/* Status Change Summary Card */}
      {students.some((student) => student.selected) && (
        <Card sx={{ mb: 3, border: `1px solid ${theme.palette.primary.light}`, boxShadow: "none" }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <CheckCircle sx={{ color: theme.palette.primary.main, mr: 1 }} />
              <Typography variant="h6">Status Change Summary</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Selected Students
                </Typography>
                <Typography variant="h5">{students.filter((s) => s.selected).length}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Current Status
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                  {Array.from(new Set(students.filter((s) => s.selected).map((s) => s.status))).map((status) => (
                    <Chip
                      key={status}
                      label={`${status}: ${students.filter((s) => s.selected && s.status === status).length}`}
                      size="small"
                      color={getStatusColor(status)}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  New Status
                </Typography>
                <Chip label={formData.status} size="small" color={getStatusColor(formData.status)} sx={{ mt: 1 }} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Header with navigation */}
      <Paper
        elevation={1}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button variant="text" startIcon={<Home />}>
            Dashboard
          </Button>
          <Button variant="outlined" sx={{ mx: 1 }}>
            Branch
          </Button>
          <Button variant="contained" startIcon={<Add />}>
            New
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <Home />
          </IconButton>
          <IconButton>
            <Notifications />
          </IconButton>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Craft International Institute
          </Typography>
        </Box>
      </Paper>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          py: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          mt: 4,
          color: "text.secondary",
          fontSize: "0.875rem",
        }}
      >
        2025 © Techneous
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarMessage.includes("Successfully") ? "success" : "info"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

// Add icon component for the "+" in New button
const Add = () => {
  return (
    <Typography component="span" sx={{ fontSize: "1.25rem", fontWeight: "bold", mr: 0.5 }}>
      +
    </Typography>
  )
}

export default StudentStatusMigration
