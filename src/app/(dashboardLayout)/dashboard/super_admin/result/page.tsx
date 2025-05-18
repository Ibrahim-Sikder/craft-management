/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Avatar,
  Chip,
  ThemeProvider,
  createTheme,
  styled,
  alpha,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  LinearProgress,
} from "@mui/material"
import {
  ArrowBack,
  Download,
  Print,
  Assessment,
  CalendarMonth,
  TrendingUp,
  Person,
  Email,
  Phone,
  Home,
  Share,
} from "@mui/icons-material"

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // Indigo
    },
    secondary: {
      main: "#f50057", // Pink
    },
    success: {
      main: "#4caf50", // Green
    },
    background: {
      default: "#f5f7ff",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          padding: "8px 20px",
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: alpha("#3f51b5", 0.05),
        },
      },
    },
  },
})

// Custom styled components
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
}))

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: "20px",
  fontWeight: 600,
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
}))

const GradeChip = styled(Chip)<{ grade: string }>(({ theme, grade }) => {
  let color
  switch (grade) {
    case "A+":
    case "A":
      color = theme.palette.success.main
      break
    case "B+":
    case "B":
      color = theme.palette.info.main
      break
    case "C+":
    case "C":
      color = theme.palette.warning.main
      break
    default:
      color = theme.palette.error.main
  }

  return {
    backgroundColor: alpha(color, 0.1),
    color: color,
    fontWeight: 700,
    fontSize: "1rem",
    padding: "20px 10px",
    height: "auto",
    borderRadius: "12px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
  }
})

// Mock data for demonstration
const studentData = {
  id: 1,
  name: "Ahmed Khan",
  rollNo: "C8-001",
  class: "Class 8",
  section: "A",
  admissionNo: "ADM-2024-001",
  gender: "Male",
  dateOfBirth: "2010-05-15",
  fatherName: "Imran Khan",
  motherName: "Fatima Khan",
  contactNo: "+1 234 567 8901",
  email: "ahmed.khan@example.com",
  address: "123 Main Street, Cityville",
  avatar: "/placeholder.svg?height=120&width=120",
}

const examResults = [
  {
    id: 1,
    examType: "Mid-Term Examination",
    date: "2025-05-10",
    subjects: [
      { name: "Mathematics", marks: 92, totalMarks: 100, grade: "A+" },
      { name: "Islamic Studies", marks: 88, totalMarks: 100, grade: "A" },
      { name: "Science", marks: 85, totalMarks: 100, grade: "A" },
      { name: "Arabic", marks: 78, totalMarks: 100, grade: "B+" },
      { name: "English", marks: 82, totalMarks: 100, grade: "A" },
      { name: "Social Studies", marks: 75, totalMarks: 100, grade: "B+" },
      { name: "Computer Science", marks: 90, totalMarks: 100, grade: "A+" },
    ],
    totalMarks: 590,
    obtainedMarks: 500,
    percentage: 84.75,
    grade: "A",
    rank: 3,
    remarks: "Excellent performance. Keep up the good work!",
  },
  {
    id: 2,
    examType: "Unit Test - 1",
    date: "2025-04-15",
    subjects: [
      { name: "Mathematics", marks: 45, totalMarks: 50, grade: "A+" },
      { name: "Islamic Studies", marks: 42, totalMarks: 50, grade: "A" },
      { name: "Science", marks: 40, totalMarks: 50, grade: "A" },
      { name: "Arabic", marks: 38, totalMarks: 50, grade: "B+" },
      { name: "English", marks: 44, totalMarks: 50, grade: "A+" },
    ],
    totalMarks: 250,
    obtainedMarks: 209,
    percentage: 83.6,
    grade: "A",
    rank: 5,
    remarks: "Good performance in most subjects.",
  },
]

const attendanceData = {
  totalDays: 120,
  present: 112,
  absent: 8,
  percentage: 93.33,
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`student-result-tabpanel-${index}`}
      aria-labelledby={`student-result-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

interface StudentResultPageProps {
  studentId: string
}

export default function StudentResultPage({ studentId }: StudentResultPageProps) {
  const router = useRouter()
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedExam, setSelectedExam] = useState<number>(0)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleExamChange = (index: number) => {
    setSelectedExam(index)
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "#4caf50" // Green
      case "A":
        return "#66bb6a" // Light Green
      case "B+":
        return "#2196f3" // Blue
      case "B":
        return "#42a5f5" // Light Blue
      case "C+":
        return "#ff9800" // Orange
      case "C":
        return "#ffa726" // Light Orange
      default:
        return "#f44336" // Red
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Loading student results...
        </Typography>
      </Box>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: "1200px", mx: "auto", p: { xs: 2, md: 4 } }}>
        {/* Header with back button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ mr: 2 }}>
            Back
          </Button>
          <Typography variant="h5" component="h1">
            Student Result Card
          </Typography>
        </Box>

        {/* Student Profile Card */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: "16px",
            mb: 4,
            overflow: "hidden",
          }}
        >
          {/* Header Banner */}
          <Box
            sx={{
              height: "120px",
              background: "linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)",
              position: "relative",
            }}
          />

          <Box sx={{ p: 3, mt: -8 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
                <StyledAvatar src={studentData.avatar} alt={studentData.name} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ mt: { xs: 2, md: 8 }, textAlign: { xs: "center", md: "left" } }}>
                  <Typography variant="h4" gutterBottom>
                    {studentData.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      justifyContent: { xs: "center", md: "flex-start" },
                      mb: 2,
                    }}
                  >
                    <StyledChip label={`Roll No: ${studentData.rollNo}`} color="primary" />
                    <StyledChip label={studentData.class} color="secondary" />
                    <StyledChip label={`Section: ${studentData.section}`} color="default" />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button variant="outlined" startIcon={<Print />}>
                    Print
                  </Button>
                  <Button variant="contained" startIcon={<Download />}>
                    Download
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Person sx={{ color: "primary.main", mr: 1 }} fontSize="small" />
                      <Typography variant="body2" color="textSecondary">
                        Admission No:
                      </Typography>
                    </Box>
                    <Typography variant="body1">{studentData.admissionNo}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Person sx={{ color: "primary.main", mr: 1 }} fontSize="small" />
                      <Typography variant="body2" color="textSecondary">
                        Gender:
                      </Typography>
                    </Box>
                    <Typography variant="body1">{studentData.gender}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <CalendarMonth sx={{ color: "primary.main", mr: 1 }} fontSize="small" />
                      <Typography variant="body2" color="textSecondary">
                        Date of Birth:
                      </Typography>
                    </Box>
                    <Typography variant="body1">{new Date(studentData.dateOfBirth).toLocaleDateString()}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Person sx={{ color: "primary.main", mr: 1 }} fontSize="small" />
                      <Typography variant="body2" color="textSecondary">
                        Father's Name:
                      </Typography>
                    </Box>
                    <Typography variant="body1">{studentData.fatherName}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  Contact Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Phone sx={{ color: "primary.main", mr: 1 }} fontSize="small" />
                      <Typography variant="body2" color="textSecondary">
                        Contact No:
                      </Typography>
                    </Box>
                    <Typography variant="body1">{studentData.contactNo}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Email sx={{ color: "primary.main", mr: 1 }} fontSize="small" />
                      <Typography variant="body2" color="textSecondary">
                        Email:
                      </Typography>
                    </Box>
                    <Typography variant="body1">{studentData.email}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Home sx={{ color: "primary.main", mr: 1 }} fontSize="small" />
                      <Typography variant="body2" color="textSecondary">
                        Address:
                      </Typography>
                    </Box>
                    <Typography variant="body1">{studentData.address}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Tabs and Content */}
        <Paper elevation={2} sx={{ borderRadius: "16px", mb: 4, overflow: "hidden" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              bgcolor: "background.paper",
              "& .MuiTab-root": {
                minHeight: "60px",
                fontWeight: 600,
              },
              "& .Mui-selected": {
                color: "primary.main",
              },
            }}
          >
            <Tab label="Exam Results" icon={<Assessment />} iconPosition="start" />
            <Tab label="Attendance" icon={<CalendarMonth />} iconPosition="start" />
            <Tab label="Performance Analysis" icon={<TrendingUp />} iconPosition="start" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Box sx={{ p: 3 }}>
              {/* Exam Selection */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Select Examination
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {examResults.map((exam, index) => (
                    <Button
                      key={exam.id}
                      variant={selectedExam === index ? "contained" : "outlined"}
                      onClick={() => handleExamChange(index)}
                      sx={{ borderRadius: "30px" }}
                    >
                      {exam.examType}
                    </Button>
                  ))}
                </Box>
              </Box>

              {/* Selected Exam Result */}
              {examResults[selectedExam] && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h5">{examResults[selectedExam].examType}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Exam Date: {new Date(examResults[selectedExam].date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" color="textSecondary">
                          Rank
                        </Typography>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor:
                              examResults[selectedExam].rank === 1
                                ? "gold"
                                : examResults[selectedExam].rank === 2
                                  ? "#C0C0C0"
                                  : examResults[selectedExam].rank === 3
                                    ? "#CD7F32"
                                    : "primary.main",
                            color: "white",
                            fontWeight: "bold",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          {examResults[selectedExam].rank}
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" color="textSecondary">
                          Grade
                        </Typography>
                        <GradeChip label={examResults[selectedExam].grade} grade={examResults[selectedExam].grade} />
                      </Box>
                    </Box>
                  </Box>

                  {/* Subject-wise Marks */}
                  <TableContainer component={Paper} sx={{ borderRadius: "12px", mb: 4, boxShadow: "none" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Subject</TableCell>
                          <TableCell align="center">Marks Obtained</TableCell>
                          <TableCell align="center">Total Marks</TableCell>
                          <TableCell align="center">Percentage</TableCell>
                          <TableCell align="center">Grade</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {examResults[selectedExam].subjects.map((subject) => (
                          <TableRow key={subject.name}>
                            <TableCell component="th" scope="row">
                              {subject.name}
                            </TableCell>
                            <TableCell align="center">{subject.marks}</TableCell>
                            <TableCell align="center">{subject.totalMarks}</TableCell>
                            <TableCell align="center">
                              {((subject.marks / subject.totalMarks) * 100).toFixed(2)}%
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={subject.grade}
                                sx={{
                                  bgcolor: alpha(getGradeColor(subject.grade), 0.1),
                                  color: getGradeColor(subject.grade),
                                  fontWeight: 600,
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Summary */}
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={8}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Result Summary
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                              <Box sx={{ textAlign: "center", p: 2 }}>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                  Total Marks
                                </Typography>
                                <Typography variant="h5">
                                  {examResults[selectedExam].obtainedMarks} / {examResults[selectedExam].totalMarks}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Box sx={{ textAlign: "center", p: 2 }}>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                  Percentage
                                </Typography>
                                <Typography variant="h5">{examResults[selectedExam].percentage.toFixed(2)}%</Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Box sx={{ textAlign: "center", p: 2 }}>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                  Overall Grade
                                </Typography>
                                <Typography variant="h5" sx={{ color: getGradeColor(examResults[selectedExam].grade) }}>
                                  {examResults[selectedExam].grade}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>

                          <Divider sx={{ my: 2 }} />

                          <Typography variant="subtitle1" gutterBottom>
                            Teacher's Remarks
                          </Typography>
                          <Typography variant="body1">{examResults[selectedExam].remarks}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Performance
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "calc(100% - 30px)",
                            }}
                          >
                            <Box
                              sx={{
                                position: "relative",
                                display: "inline-flex",
                                my: 2,
                              }}
                            >
                              <CircularProgress
                                variant="determinate"
                                value={examResults[selectedExam].percentage}
                                size={120}
                                thickness={5}
                                sx={{
                                  color:
                                    examResults[selectedExam].percentage >= 80
                                      ? "success.main"
                                      : examResults[selectedExam].percentage >= 60
                                        ? "info.main"
                                        : examResults[selectedExam].percentage >= 40
                                          ? "warning.main"
                                          : "error.main",
                                  "& .MuiCircularProgress-circle": {
                                    strokeLinecap: "round",
                                  },
                                }}
                              />
                              <Box
                                sx={{
                                  top: 0,
                                  left: 0,
                                  bottom: 0,
                                  right: 0,
                                  position: "absolute",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <Typography variant="h4" component="div">
                                  {examResults[selectedExam].percentage.toFixed(1)}%
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: "center" }}>
                              {examResults[selectedExam].percentage >= 80
                                ? "Excellent Performance!"
                                : examResults[selectedExam].percentage >= 60
                                  ? "Good Performance"
                                  : examResults[selectedExam].percentage >= 40
                                    ? "Average Performance"
                                    : "Needs Improvement"}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Button variant="contained" startIcon={<Print />} sx={{ mx: 1 }}>
                      Print Result
                    </Button>
                    <Button variant="outlined" startIcon={<Download />} sx={{ mx: 1 }}>
                      Download PDF
                    </Button>
                    <Button variant="outlined" startIcon={<Share />} sx={{ mx: 1 }}>
                      Share
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Attendance Summary
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ textAlign: "center", p: 2 }}>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                              Total Days
                            </Typography>
                            <Typography variant="h5">{attendanceData.totalDays}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ textAlign: "center", p: 2 }}>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                              Present
                            </Typography>
                            <Typography variant="h5" color="success.main">
                              {attendanceData.present}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ textAlign: "center", p: 2 }}>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                              Absent
                            </Typography>
                            <Typography variant="h5" color="error.main">
                              {attendanceData.absent}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ mt: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="body2" color="textSecondary">
                            Attendance Percentage
                          </Typography>
                          <Typography variant="body1" fontWeight="bold">
                            {attendanceData.percentage.toFixed(2)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={attendanceData.percentage}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            bgcolor: alpha(theme.palette.success.main, 0.2),
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "success.main",
                            },
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Attendance Status
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "calc(100% - 30px)",
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-flex",
                            my: 2,
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={attendanceData.percentage}
                            size={120}
                            thickness={5}
                            sx={{
                              color:
                                attendanceData.percentage >= 90
                                  ? "success.main"
                                  : attendanceData.percentage >= 75
                                    ? "info.main"
                                    : "warning.main",
                              "& .MuiCircularProgress-circle": {
                                strokeLinecap: "round",
                              },
                            }}
                          />
                          <Box
                            sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Typography variant="h4" component="div">
                              {attendanceData.percentage.toFixed(1)}%
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: "center" }}>
                          {attendanceData.percentage >= 90
                            ? "Excellent Attendance!"
                            : attendanceData.percentage >= 75
                              ? "Good Attendance"
                              : "Needs Improvement"}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Performance Analysis
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Subject-wise Performance
                      </Typography>
                      <Box sx={{ mt: 3 }}>
                        {examResults[0].subjects.map((subject) => (
                          <Box key={subject.name} sx={{ mb: 2 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                              <Typography variant="body2">{subject.name}</Typography>
                              <Typography variant="body2" fontWeight="bold">
                                {((subject.marks / subject.totalMarks) * 100).toFixed(1)}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={(subject.marks / subject.totalMarks) * 100}
                              sx={{
                                height: 8,
                                borderRadius: 5,
                                bgcolor: alpha(getGradeColor(subject.grade), 0.2),
                                "& .MuiLinearProgress-bar": {
                                  bgcolor: getGradeColor(subject.grade),
                                },
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Strengths & Areas for Improvement
                      </Typography>

                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" fontWeight="bold" color="success.main" gutterBottom>
                          Strengths:
                        </Typography>
                        <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
                          <li>
                            <Typography variant="body2">
                              Excellent performance in Mathematics and Computer Science
                            </Typography>
                          </li>
                          <li>
                            <Typography variant="body2">Consistent results in Islamic Studies</Typography>
                          </li>
                          <li>
                            <Typography variant="body2">Good attendance record</Typography>
                          </li>
                        </ul>
                      </Box>

                      <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" fontWeight="bold" color="warning.main" gutterBottom>
                          Areas for Improvement:
                        </Typography>
                        <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
                          <li>
                            <Typography variant="body2">
                              Can improve performance in Arabic and Social Studies
                            </Typography>
                          </li>
                          <li>
                            <Typography variant="body2">More consistent participation in class activities</Typography>
                          </li>
                        </ul>
                      </Box>

                      <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" fontWeight="bold" color="info.main" gutterBottom>
                          Recommendations:
                        </Typography>
                        <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
                          <li>
                            <Typography variant="body2">
                              Consider joining the Arabic language club for additional practice
                            </Typography>
                          </li>
                          <li>
                            <Typography variant="body2">
                              Participate in social studies projects to improve understanding
                            </Typography>
                          </li>
                          <li>
                            <Typography variant="body2">
                              Continue with the current study habits for Mathematics and Computer Science
                            </Typography>
                          </li>
                        </ul>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </Paper>
      </Box>
    </ThemeProvider>
  )
}
