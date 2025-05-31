/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  CircularProgress,
  useTheme,
} from "@mui/material"
import {
  School as SchoolIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Add as AddIcon,
  FilterList as FilterListIcon,
  Print as PrintIcon,
  GetApp as GetAppIcon,
} from "@mui/icons-material"


type DailyClassReport = {
  id: number
  subject: string
  teacher: string
  status: string
  date: string
  startTime: string
  endTime: string
  classWork: string
  homework: string
  test: boolean
}

// Mock data for the table
const generateMockData = () => {
  const subjects = [
    "MATHEMATICS",
    "SCIENCE",
    "ENGLISH",
    "HISTORY",
    "GEOGRAPHY",
    "PHYSICS",
    "CHEMISTRY",
    "BIOLOGY",
    "COMPUTER SCIENCE",
  ]

  const teachers = ["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis", "Michael Wilson"]

  const statuses = ["Present", "Absent", "Late", "Substitute"]

  const data = []

  for (let i = 1; i <= 100; i++) {
    const subjectIndex = Math.floor(Math.random() * subjects.length)
    const teacherIndex = Math.floor(Math.random() * teachers.length)
    const statusIndex = Math.floor(Math.random() * statuses.length)

    data.push({
      id: i,
      subject: subjects[subjectIndex],
      teacher: teachers[teacherIndex],
      status: statuses[statusIndex],
      date: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      startTime: `${String(Math.floor(Math.random() * 12) + 8).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
      endTime: `${String(Math.floor(Math.random() * 12) + 9).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
      classWork: Math.random() > 0.5 ? "Completed" : "Partially Completed",
      homework: Math.random() > 0.5 ? "Assigned" : "None",
      test: Math.random() > 0.7,
    })
  }

  return data
}

export default function DailyClassReportList() {
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    class: "",
    section: "",
    subject: "",
    date: "",
  })

  const [reports, setReports] = useState<DailyClassReport[]>([])
const [selectedReports, setSelectedReports] = useState<number[]>([])
  // Load mock data
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setReports(generateMockData())
      setLoading(false)
    }

    fetchData()
  }, [])

  // Handle checkbox selection
  const handleSelectAll = (event:any) => {
    if (event.target.checked) {
      setSelectedReports(reports.map((report) => report.id))
    } else {
      setSelectedReports([])
    }
  }

  const handleSelectOne = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const selectedIndex = selectedReports.indexOf(id)
    let newSelected: number[] = []
  
    if (selectedIndex === -1) {
      newSelected = [...selectedReports, id]
    } else {
      newSelected = selectedReports.filter((reportId) => reportId !== id)
    }
  
    setSelectedReports(newSelected)
  }
  

  // Handle filter changes
  const handleFilterChange = (event:any) => {
    const { name, value } = event.target
    setFilter({
      ...filter,
      [name]: value,
    })
  }

  // Handle save changes
  const handleSaveChanges = () => {
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: "1px solid #e0e0e0" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            <SchoolIcon sx={{ mr: 1 }} />
            দৈনিক শ্রেণী প্রতিবেদন
          </Typography>

          <IconButton>
            <NotificationsIcon />
          </IconButton>

          <IconButton>
            <HelpIcon />
          </IconButton>

          <IconButton>
            <SettingsIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>A</Avatar>
            <Typography variant="subtitle2" sx={{ ml: 1, mr: 0.5 }}>
              Admin
            </Typography>
            <IconButton size="small">
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Breadcrumbs */}
      <Box sx={{ p: 2, bgcolor: "#fff", borderBottom: "1px solid #e0e0e0" }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="#" sx={{ display: "flex", alignItems: "center" }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Dashboard
          </Link>
          <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
            <SchoolIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Daily Class Reports
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Filters */}
      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Class</InputLabel>
                <Select name="class" value={filter.class} label="Class" onChange={handleFilterChange}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="1">Class 1</MenuItem>
                  <MenuItem value="2">Class 2</MenuItem>
                  <MenuItem value="3">Class 3</MenuItem>
                  <MenuItem value="4">Class 4</MenuItem>
                  <MenuItem value="5">Class 5</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Section</InputLabel>
                <Select name="section" value={filter.section} label="Section" onChange={handleFilterChange}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="A">Section A</MenuItem>
                  <MenuItem value="B">Section B</MenuItem>
                  <MenuItem value="C">Section C</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Subject</InputLabel>
                <Select name="subject" value={filter.subject} label="Subject" onChange={handleFilterChange}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="MATHEMATICS">MATHEMATICS</MenuItem>
                  <MenuItem value="SCIENCE">SCIENCE</MenuItem>
                  <MenuItem value="ENGLISH">ENGLISH</MenuItem>
                  <MenuItem value="HISTORY">HISTORY</MenuItem>
                  <MenuItem value="GEOGRAPHY">GEOGRAPHY</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                name="date"
                label="Date"
                type="date"
                value={filter.date}
                onChange={handleFilterChange}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" startIcon={<FilterListIcon />}>
              More Filters
            </Button>
            <Box>
              <Button variant="outlined" startIcon={<PrintIcon />} sx={{ mr: 1 }}>
                Print
              </Button>
              <Button variant="outlined" startIcon={<GetAppIcon />} sx={{ mr: 1 }}>
                Export
              </Button>
              <Button component={Link} href='/dashboard/teacher/daily-report/add' variant="contained" color="primary" startIcon={<AddIcon />}>
                Add New
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Table */}
      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
              <Table stickyHeader aria-label="daily class reports table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selectedReports.length > 0 && selectedReports.length < reports.length}
                        checked={reports.length > 0 && selectedReports.length === reports.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Class Work</TableCell>
                    <TableCell>Homework</TableCell>
                    <TableCell>Test</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow hover key={report.id} selected={selectedReports.indexOf(report.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedReports.indexOf(report.id) !== -1}
                          onChange={(event) => handleSelectOne(event, report.id)}
                        />
                      </TableCell>
                      <TableCell>{report.subject}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.teacher}</TableCell>
                      <TableCell>{report.status}</TableCell>
                      <TableCell>{report.startTime}</TableCell>
                      <TableCell>{report.endTime}</TableCell>
                      <TableCell>{report.classWork}</TableCell>
                      <TableCell>{report.homework}</TableCell>
                      <TableCell>{report.test ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>

      {/* Footer with Save Button */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #e0e0e0",
          bgcolor: "#fff",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" color="success" disabled={selectedReports.length === 0} onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Box>
    </Box>
  )
}