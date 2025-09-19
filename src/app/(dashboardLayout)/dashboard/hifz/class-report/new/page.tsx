"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material"
import { Add, Search, FilterList, Visibility, Edit, Delete, ArrowBack } from "@mui/icons-material"

// Mock data for daily reports
const mockReports = [
  {
    id: 1,
    date: "2024-01-15",
    class: "Class 10A",
    subject: "Mathematics",
    teacher: "Dr. Rahman",
    totalStudents: 35,
    presentStudents: 32,
    topics: "Algebra, Quadratic Equations",
    status: "completed",
  },
  {
    id: 2,
    date: "2024-01-15",
    class: "Class 9B",
    subject: "English",
    teacher: "Ms. Fatima",
    totalStudents: 30,
    presentStudents: 28,
    topics: "Grammar, Essay Writing",
    status: "completed",
  },
  {
    id: 3,
    date: "2024-01-14",
    class: "Class 8C",
    subject: "Science",
    teacher: "Mr. Ahmed",
    totalStudents: 28,
    presentStudents: 25,
    topics: "Physics - Motion and Force",
    status: "pending",
  },
]

export default function DailyReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterClass, setFilterClass] = useState("All Classes")
  const [filterSubject, setFilterSubject] = useState("All Subjects")

  const filteredReports = mockReports.filter((report) => {
    return (
      (report.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.teacher.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterClass === "All Classes" || report.class === filterClass) &&
      (filterSubject === "All Subjects" || report.subject === filterSubject)
    )
  })

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" color="transparent" elevation={1} sx={{ bgcolor: "background.paper" }}>
        <Toolbar>
          <Button component={Link} href="/" startIcon={<ArrowBack />} sx={{ mr: 2 }} color="inherit">
            Back to Dashboard
          </Button>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" sx={{ color: "text.primary" }}>
              Daily Reports
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage daily class reports
            </Typography>
          </Box>
          <Button component={Link} href="/daily-reports/add" variant="contained" startIcon={<Add />}>
            Add New Report
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Filters and Search */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FilterList />
              Filters & Search
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Filter by Class</InputLabel>
                  <Select value={filterClass} label="Filter by Class" onChange={(e) => setFilterClass(e.target.value)}>
                    <MenuItem value="All Classes">All Classes</MenuItem>
                    <MenuItem value="Class 10A">Class 10A</MenuItem>
                    <MenuItem value="Class 9B">Class 9B</MenuItem>
                    <MenuItem value="Class 8C">Class 8C</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Filter by Subject</InputLabel>
                  <Select
                    value={filterSubject}
                    label="Filter by Subject"
                    onChange={(e) => setFilterSubject(e.target.value)}
                  >
                    <MenuItem value="All Subjects">All Subjects</MenuItem>
                    <MenuItem value="Mathematics">Mathematics</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    setSearchTerm("")
                    setFilterClass("All Classes")
                    setFilterSubject("All Subjects")
                  }}
                  sx={{ height: "56px" }}
                >
                  Clear Filters
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Reports Table */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Daily Reports List
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {filteredReports.length} report(s) found
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Date</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Class</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Subject</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Teacher</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Attendance</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Topics Covered</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id} hover>
                      <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                      <TableCell>{report.class}</TableCell>
                      <TableCell>{report.subject}</TableCell>
                      <TableCell>{report.teacher}</TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {report.presentStudents}/{report.totalStudents}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {Math.round((report.presentStudents / report.totalStudents) * 100)}% present
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>
                        <Typography variant="body2" noWrap>
                          {report.topics}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={report.status}
                          color={report.status === "completed" ? "success" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <IconButton size="small" color="primary">
                            <Visibility fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="primary">
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <Delete fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
