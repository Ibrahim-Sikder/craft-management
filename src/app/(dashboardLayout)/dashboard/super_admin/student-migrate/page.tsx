/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
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
  CompareArrows,
  FilterList,
  Home,
  Notifications,
  Person,
  Save,
  School,
  Search,
  SwapHoriz,
} from "@mui/icons-material"


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
    selected: false,
  },
]

const StudentMigration = () => {
  const theme = useTheme()
  const [students, setStudents] = useState(mockStudents)
  const [filteredStudents, setFilteredStudents] = useState(mockStudents)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectAll, setSelectAll] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const [currentFilters, setCurrentFilters] = useState({
    dakhela: "",
    relation: "",
    class: "",
    batch: "",
    section: "",
    activeSession: "2025",
    additionalNote: "",
    previousDues: "0",
    otherFee: "0",
    sendAttendanceSms: false,
  })

  const [migrateToFilters, setMigrateToFilters] = useState({
    nextSession: "",
    nextClass: "",
    nextBatch: "",
    nextSection: "",
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
        student.dakhela.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredStudents(results)
    setPage(0)
  }, [searchTerm, students])


  const handleCurrentFilterChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setCurrentFilters({
      ...currentFilters,
      [name]: type === "checkbox" ? checked : value,
    })
  }


  const handleMigrateToFilterChange = (e: any) => {
    const { name, value } = e.target
    setMigrateToFilters({
      ...migrateToFilters,
      [name]: value,
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

  // Handle migrate
  const handleMigrate = () => {
    // In a real application, you would send this data to your API
    const selectedStudents = students.filter((student) => student.selected)

    // Show success message or redirect
    alert(`Successfully migrated ${selectedStudents.length} students`)
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{ mb: 3, bgcolor: theme.palette.primary.main, color: "white", py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <SwapHoriz sx={{ mr: 1 }} />
          <Typography variant="h5" component="h1">
            Student Migration
          </Typography>
        </Box>
      </Paper>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <School sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6">Current Information</Typography>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  size="small"
                  sx={{ ml: "auto" }}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </Box>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Dakhela Number"
                name="dakhela"
                value={currentFilters.dakhela}
                onChange={handleCurrentFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Relation"
                name="relation"
                value={currentFilters.relation}
                onChange={handleCurrentFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select name="class" value={currentFilters.class} label="Class" onChange={handleCurrentFilterChange}>
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
                    <Select
                      name="batch"
                      value={currentFilters.batch}
                      label="Batch"
                      onChange={handleCurrentFilterChange}
                    >
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
                    <Select
                      name="section"
                      value={currentFilters.section}
                      label="Section"
                      onChange={handleCurrentFilterChange}
                    >
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
                      value={currentFilters.activeSession}
                      label="Active Session"
                      onChange={handleCurrentFilterChange}
                    >
                      <MenuItem value="2023">2023</MenuItem>
                      <MenuItem value="2024">2024</MenuItem>
                      <MenuItem value="2025">2025</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Additional Note"
                    name="additionalNote"
                    value={currentFilters.additionalNote}
                    onChange={handleCurrentFilterChange}
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
                    value={currentFilters.previousDues}
                    onChange={handleCurrentFilterChange}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Other Fee"
                    name="otherFee"
                    type="number"
                    value={currentFilters.otherFee}
                    onChange={handleCurrentFilterChange}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        name="sendAttendanceSms"
                        checked={currentFilters.sendAttendanceSms}
                        onChange={handleCurrentFilterChange}
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CompareArrows sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6">Migrate To</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Next Session</InputLabel>
                <Select
                  name="nextSession"
                  value={migrateToFilters.nextSession}
                  label="Next Session"
                  onChange={handleMigrateToFilterChange}
                >
                  <MenuItem value="">---------</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Next Class</InputLabel>
                <Select
                  name="nextClass"
                  value={migrateToFilters.nextClass}
                  label="Next Class"
                  onChange={handleMigrateToFilterChange}
                >
                  <MenuItem value="">---------</MenuItem>
                  <MenuItem value="Class1">Class 1</MenuItem>
                  <MenuItem value="Class2">Class 2</MenuItem>
                  <MenuItem value="Class3">Class 3</MenuItem>
                  <MenuItem value="Class4">Class 4</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Next Batch</InputLabel>
                <Select
                  name="nextBatch"
                  value={migrateToFilters.nextBatch}
                  label="Next Batch"
                  onChange={handleMigrateToFilterChange}
                >
                  <MenuItem value="">---------</MenuItem>
                  <MenuItem value="Batch2023">Batch 2023</MenuItem>
                  <MenuItem value="Batch2024">Batch 2024</MenuItem>
                  <MenuItem value="Batch2025">Batch 2025</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Next Section</InputLabel>
                <Select
                  name="nextSection"
                  value={migrateToFilters.nextSection}
                  label="Next Section"
                  onChange={handleMigrateToFilterChange}
                >
                  <MenuItem value="">---------</MenuItem>
                  <MenuItem value="SectionA">Section A</MenuItem>
                  <MenuItem value="SectionB">Section B</MenuItem>
                  <MenuItem value="SectionC">Section C</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
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

            <Typography variant="subtitle1" gutterBottom>
              Select Students to Migrate
            </Typography>
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
                  <TableCell sx={{ fontWeight: "bold" }}>Class/Section</TableCell>
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
                        {student.class}
                        <Typography variant="caption" color="text.secondary" display="block">
                          {student.section}
                        </Typography>
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
          onClick={handleMigrate}
          disabled={!students.some((student) => student.selected)}
          sx={{ px: 4, py: 1 }}
        >
          Migrate Selected Students
        </Button>
      </Box>

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

export default StudentMigration
    