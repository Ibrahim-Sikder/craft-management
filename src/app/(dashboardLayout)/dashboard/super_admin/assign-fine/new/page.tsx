/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Slide,
  Stack,
  Step,
  StepLabel,
  Stepper,
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
  useMediaQuery,
  useTheme,
  Zoom,
  alpha,
} from "@mui/material"
import {
  ArrowBack as ArrowBackIcon,
  CalendarMonth as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Class as ClassIcon,
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  Gavel as GavelIcon,
  Group as GroupIcon,
  Save as SaveIcon,
  School as SchoolIcon,
  Search as SearchIcon,
} from "@mui/icons-material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { motion } from "framer-motion"

// Create a custom theme with primary color as deep purple/violet
const theme = createTheme({
  palette: {
    primary: {
      main: "#5e35b1",
      light: "#9162e4",
      dark: "#280680",
      contrastText: "#fff",
    },
    secondary: {
      main: "#e91e63",
      light: "#ff6090",
      dark: "#b0003a",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          overflow: "visible",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 10px rgba(0,0,0,0.1)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(45deg, #5e35b1 30%, #7c4dff 90%)",
        },
        containedSecondary: {
          background: "linear-gradient(45deg, #e91e63 30%, #f48fb1 90%)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: alpha("#5e35b1", 0.05),
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontWeight: 500,
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

// Sample data for fines
const fineTypes = [
  { id: 1, name: "Late Fee", amount: 500, description: "Fee for late payment of tuition", category: "Payment" },
  {
    id: 2,
    name: "Library Fine",
    amount: 200,
    description: "Fine for late return of library books",
    category: "Library",
  },
  {
    id: 3,
    name: "Damaged Property",
    amount: 1000,
    description: "Fine for damaging school property",
    category: "Property",
  },
  {
    id: 4,
    name: "Uniform Violation",
    amount: 300,
    description: "Fine for not wearing proper uniform",
    category: "Discipline",
  },
  { id: 5, name: "Attendance Fine", amount: 400, description: "Fine for excessive absences", category: "Attendance" },
  { id: 6, name: "Misconduct", amount: 800, description: "Fine for misconduct or misbehavior", category: "Discipline" },
  { id: 7, name: "Lost ID Card", amount: 250, description: "Fine for losing school ID card", category: "Property" },
  { id: 8, name: "Exam Absence", amount: 600, description: "Fine for missing scheduled exams", category: "Academic" },
]

// Sample data for classes
const classes = [
  { id: 1, name: "Nursery", section: "A", students: 25 },
  { id: 2, name: "KG", section: "A", students: 30 },
  { id: 3, name: "Class 1", section: "A", students: 35 },
  { id: 4, name: "Class 1", section: "B", students: 32 },
  { id: 5, name: "Class 2", section: "A", students: 38 },
  { id: 6, name: "Class 2", section: "B", students: 36 },
  { id: 7, name: "Class 3", section: "A", students: 40 },
  { id: 8, name: "Class 3", section: "B", students: 38 },
  { id: 9, name: "HIFZ", section: "A", students: 20 },
]

// Sample data for sessions
const sessions = [
  { id: 1, name: "2023-2024", current: false },
  { id: 2, name: "2024-2025", current: true },
  { id: 3, name: "2025-2026", current: false },
]

// Sample data for students
const generateStudents = (classId: number) => {
  const students = []
  const selectedClass = classes.find((c) => c.id === classId)
  const count = selectedClass ? selectedClass.students : 0

  for (let i = 1; i <= count; i++) {
    students.push({
      id: `STU${classId}${i.toString().padStart(3, "0")}`,
      name: `Student ${i}`,
      fatherName: `Father ${i}`,
      studentMobile: `123-456-${i.toString().padStart(4, "0")}`,
      parentMobile: `987-654-${i.toString().padStart(4, "0")}`,
      rollNumber: i,
      profileImage: `/placeholder.svg?height=40&width=40`,
      attendance: Math.floor(Math.random() * 21) + 80, // 80-100%
      feesStatus: Math.random() > 0.2 ? "Paid" : "Pending",
    })
  }

  return students
}

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Get category color
const getCategoryColor = (category: string) => {
  switch (category) {
    case "Payment":
      return "error"
    case "Library":
      return "info"
    case "Property":
      return "warning"
    case "Discipline":
      return "secondary"
    case "Attendance":
      return "primary"
    case "Academic":
      return "success"
    default:
      return "default"
  }
}

// MotionBox component for animations
const MotionBox = motion(Box)

export default function AssignFinePage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [activeStep, setActiveStep] = useState(0)
  const [selectedFine, setSelectedFine] = useState<number | "">("")
  const [selectedClass, setSelectedClass] = useState<number | "">("")
  const [selectedSession, setSelectedSession] = useState<number | "">("")
  const [selectedBatch, setSelectedBatch] = useState<string>("")
  const [fineDate, setFineDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [dueDate, setDueDate] = useState<string>("")
  const [fineReason, setFineReason] = useState<string>("")
  const [sendNotification, setSendNotification] = useState(true)
  const [allowWaiver, setAllowWaiver] = useState(false)
  const [waiverAmount, setWaiverAmount] = useState<string>("")
  const [isPercent, setIsPercent] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState<any[]>([])
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [customFineAmount, setCustomFineAmount] = useState<string>("")
  const [useCustomAmount, setUseCustomAmount] = useState(false)

  // Load students when class changes
  useEffect(() => {
    if (selectedClass) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setStudents(generateStudents(selectedClass as number))
        setLoading(false)
      }, 800)
    } else {
      setStudents([])
    }
  }, [selectedClass])

  // Filter students based on search term and filter status
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.fatherName.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterStatus === "all") return matchesSearch
    if (filterStatus === "paid") return matchesSearch && student.feesStatus === "Paid"
    if (filterStatus === "pending") return matchesSearch && student.feesStatus === "Pending"
    if (filterStatus === "attendance") return matchesSearch && student.attendance < 85

    return matchesSearch
  })

  // Handle student selection
  const handleStudentSelection = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId))
    } else {
      setSelectedStudents([...selectedStudents, studentId])
    }
  }

  // Handle select all students
  const handleSelectAllStudents = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedStudents(filteredStudents.map((student) => student.id))
    } else {
      setSelectedStudents([])
    }
  }

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Handle form submission
  const handleSubmit = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setActiveStep(3)
      setShowSuccessMessage(true)
    }, 1500)
  }

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0])
    }
  }

  // Calculate total fine amount
  const calculateTotalFine = () => {
    if (!selectedFine) return 0

    const fineAmount =
      useCustomAmount && customFineAmount
        ? Number.parseFloat(customFineAmount)
        : fineTypes.find((fine) => fine.id === selectedFine)?.amount || 0

    return fineAmount * selectedStudents.length
  }

  // Calculate waiver amount
  const calculateWaiverAmount = () => {
    if (!allowWaiver || !waiverAmount) return 0

    const totalFine = calculateTotalFine()
    const waiver = Number.parseFloat(waiverAmount)

    if (isPercent) {
      return (totalFine * waiver) / 100
    } else {
      return waiver
    }
  }

  // Calculate final amount
  const calculateFinalAmount = () => {
    return calculateTotalFine() - calculateWaiverAmount()
  }

  // Get selected fine details
  const getSelectedFineDetails = () => {
    return fineTypes.find((fine) => fine.id === selectedFine)
  }

  // Get selected class details
  const getSelectedClassDetails = () => {
    return classes.find((cls) => cls.id === selectedClass)
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

  // Steps for the stepper
  const steps = ["Select Fine Type", "Choose Students", "Set Details & Options", "Confirmation"]

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: 4,
          background: "linear-gradient(135deg, #f5f7ff 0%, #f5f5f5 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <MotionBox
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography variant="h4" color="primary" gutterBottom>
                    Assign Fines
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Create and assign fines to students for various infractions
                  </Typography>
                </MotionBox>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                <MotionBox
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" startIcon={<GavelIcon />} href="/fines/list">
                      View Fine Records
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => document.getElementById("upload-file")?.click()}
                    >
                      Bulk Upload
                    </Button>
                    <input
                      id="upload-file"
                      type="file"
                      accept=".csv,.xlsx"
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                    />
                  </Stack>
                </MotionBox>
              </Grid>
            </Grid>
          </Box>

          <Card
            component={MotionBox}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <GavelIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">New Fine Assignment</Typography>
                </Box>
              }
              subheader="Complete all steps to assign fines to students"
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                backgroundImage: "linear-gradient(45deg, #5e35b1, #7c4dff)",
                "& .MuiCardHeader-subheader": { color: "rgba(255, 255, 255, 0.8)" },
                position: "relative",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "150px",
                  height: "100%",
                  backgroundImage: "url('/placeholder.svg?height=100&width=150')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.1,
                },
              }}
            />
            <CardContent sx={{ p: 4 }}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel={!isMobile}
                orientation={isMobile ? "vertical" : "horizontal"}
                sx={{ mb: 4 }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {loading && (
                <Box sx={{ width: "100%", mb: 3 }}>
                  <LinearProgress color="primary" />
                </Box>
              )}

              {activeStep === 0 && (
                <Slide direction="right" in={activeStep === 0} mountOnEnter unmountOnExit>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Select Fine Type
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Choose the type of fine you want to assign to students
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel id="fine-select-label">Select Fine Type</InputLabel>
                          <Select
                            labelId="fine-select-label"
                            id="fine-select"
                            value={selectedFine}
                            label="Select Fine Type"
                            onChange={(e) => {
                              setSelectedFine(e.target.value as number)
                              setUseCustomAmount(false)
                            }}
                            startAdornment={
                              <InputAdornment position="start">
                                <GavelIcon fontSize="small" />
                              </InputAdornment>
                            }
                          >
                            {fineTypes.map((fine) => (
                              <MenuItem key={fine.id} value={fine.id}>
                                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                                  <Box sx={{ flexGrow: 1 }}>
                                    {fine.name} - {formatCurrency(fine.amount)}
                                  </Box>
                                  <Chip
                                    label={fine.category}
                                    size="small"
                                    color={getCategoryColor(fine.category) as any}
                                    sx={{ ml: 1 }}
                                  />
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={useCustomAmount}
                              onChange={(e) => setUseCustomAmount(e.target.checked)}
                              color="primary"
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body2">Use custom fine amount</Typography>
                              <Typography variant="caption" color="text.secondary">
                                Override the default amount for this fine
                              </Typography>
                            </Box>
                          }
                          sx={{ ml: 0, mb: 2 }}
                        />

                        {useCustomAmount && (
                          <TextField
                            fullWidth
                            label="Custom Fine Amount"
                            value={customFineAmount}
                            onChange={(e) => setCustomFineAmount(e.target.value)}
                            type="number"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                          />
                        )}
                      </Grid>
                    </Grid>

                    {selectedFine && (
                      <Zoom in={!!selectedFine}>
                        <Paper
                          elevation={0}
                          sx={{
                            mt: 3,
                            p: 3,
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "primary.light",
                          }}
                        >
                          <Typography variant="subtitle1" gutterBottom>
                            Fine Details
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2" color="text.secondary">
                                Fine Name:
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {getSelectedFineDetails()?.name}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2" color="text.secondary">
                                Amount:
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {useCustomAmount && customFineAmount
                                  ? formatCurrency(Number.parseFloat(customFineAmount))
                                  : formatCurrency(getSelectedFineDetails()?.amount || 0)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2" color="text.secondary">
                                Category:
                              </Typography>
                              <Chip
                                label={getSelectedFineDetails()?.category}
                                size="small"
                                color={getCategoryColor(getSelectedFineDetails()?.category || "") as any}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body2" color="text.secondary">
                                Description:
                              </Typography>
                              <Typography variant="body1">{getSelectedFineDetails()?.description}</Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Zoom>
                    )}
                  </Box>
                </Slide>
              )}

              {activeStep === 1 && (
                <Slide direction="left" in={activeStep === 1} mountOnEnter unmountOnExit>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Select Students
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Choose the class and students to assign the fine
                    </Typography>

                    <Grid container spacing={3} sx={{ mb: 3 }}>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="session-select-label">Academic Session</InputLabel>
                          <Select
                            labelId="session-select-label"
                            id="session-select"
                            value={selectedSession}
                            label="Academic Session"
                            onChange={(e) => setSelectedSession(e.target.value as number)}
                            startAdornment={
                              <InputAdornment position="start">
                                <SchoolIcon fontSize="small" />
                              </InputAdornment>
                            }
                          >
                            {sessions.map((session) => (
                              <MenuItem key={session.id} value={session.id}>
                                {session.name} {session.current && "(Current)"}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="class-select-label">Select Class</InputLabel>
                          <Select
                            labelId="class-select-label"
                            id="class-select"
                            value={selectedClass}
                            label="Select Class"
                            onChange={(e) => {
                              setSelectedClass(e.target.value as number)
                              setSelectedStudents([])
                            }}
                            startAdornment={
                              <InputAdornment position="start">
                                <ClassIcon fontSize="small" />
                              </InputAdornment>
                            }
                          >
                            {classes.map((cls) => (
                              <MenuItem key={cls.id} value={cls.id}>
                                {cls.name} - Section {cls.section} ({cls.students} students)
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="batch-select-label">Batch (Optional)</InputLabel>
                          <Select
                            labelId="batch-select-label"
                            id="batch-select"
                            value={selectedBatch}
                            label="Batch (Optional)"
                            onChange={(e) => setSelectedBatch(e.target.value)}
                            startAdornment={
                              <InputAdornment position="start">
                                <GroupIcon fontSize="small" />
                              </InputAdornment>
                            }
                          >
                            <MenuItem value="">All Batches</MenuItem>
                            <MenuItem value="morning">Morning</MenuItem>
                            <MenuItem value="afternoon">Afternoon</MenuItem>
                            <MenuItem value="evening">Evening</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>

                    {selectedClass && (
                      <Box sx={{ mb: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              placeholder="Search students..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                              <Chip
                                label="All Students"
                                color={filterStatus === "all" ? "primary" : "default"}
                                onClick={() => setFilterStatus("all")}
                                variant={filterStatus === "all" ? "filled" : "outlined"}
                              />
                              <Chip
                                label="Fees Paid"
                                color={filterStatus === "paid" ? "success" : "default"}
                                onClick={() => setFilterStatus("paid")}
                                variant={filterStatus === "paid" ? "filled" : "outlined"}
                              />
                              <Chip
                                label="Fees Pending"
                                color={filterStatus === "pending" ? "error" : "default"}
                                onClick={() => setFilterStatus("pending")}
                                variant={filterStatus === "pending" ? "filled" : "outlined"}
                              />
                              <Chip
                                label="Low Attendance"
                                color={filterStatus === "attendance" ? "warning" : "default"}
                                onClick={() => setFilterStatus("attendance")}
                                variant={filterStatus === "attendance" ? "filled" : "outlined"}
                              />
                            </Stack>
                          </Grid>
                        </Grid>
                      </Box>
                    )}

                    {selectedClass && (
                      <Paper
                        elevation={0}
                        sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid", borderColor: "divider" }}
                      >
                        <TableContainer sx={{
            overflowX: "auto",  
            WebkitOverflowScrolling: "touch",  
            maxWidth: "100vw"  
          }}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    indeterminate={
                                      selectedStudents.length > 0 && selectedStudents.length < filteredStudents.length
                                    }
                                    checked={
                                      filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length
                                    }
                                    onChange={handleSelectAllStudents}
                                  />
                                </TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Student</TableCell>
                                <TableCell>Father Name</TableCell>
                                <TableCell>Roll No.</TableCell>
                                <TableCell>Attendance</TableCell>
                                <TableCell>Fees Status</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {loading ? (
                                Array.from(new Array(5)).map((_, index) => (
                                  <TableRow key={index}>
                                    <TableCell padding="checkbox">
                                      <Skeleton variant="rectangular" width={20} height={20} />
                                    </TableCell>
                                    <TableCell>
                                      <Skeleton />
                                    </TableCell>
                                    <TableCell>
                                      <Skeleton />
                                    </TableCell>
                                    <TableCell>
                                      <Skeleton />
                                    </TableCell>
                                    <TableCell>
                                      <Skeleton />
                                    </TableCell>
                                    <TableCell>
                                      <Skeleton />
                                    </TableCell>
                                    <TableCell>
                                      <Skeleton />
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : filteredStudents.length > 0 ? (
                                filteredStudents
                                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                  .map((student) => (
                                    <TableRow
                                      key={student.id}
                                      hover
                                      selected={selectedStudents.includes(student.id)}
                                      sx={{
                                        cursor: "pointer",
                                        "&.Mui-selected": {
                                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                        },
                                      }}
                                      onClick={() => handleStudentSelection(student.id)}
                                    >
                                      <TableCell padding="checkbox">
                                        <Checkbox checked={selectedStudents.includes(student.id)} />
                                      </TableCell>
                                      <TableCell>{student.id}</TableCell>
                                      <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                          <Box
                                            component="img"
                                            src={student.profileImage}
                                            alt={student.name}
                                            sx={{
                                              width: 32,
                                              height: 32,
                                              borderRadius: "50%",
                                              mr: 1,
                                              border: "1px solid",
                                              borderColor: "divider",
                                            }}
                                          />
                                          {student.name}
                                        </Box>
                                      </TableCell>
                                      <TableCell>{student.fatherName}</TableCell>
                                      <TableCell>{student.rollNumber}</TableCell>
                                      <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                          <Box sx={{ width: "100%", mr: 1 }}>
                                            <LinearProgress
                                              variant="determinate"
                                              value={student.attendance}
                                              color={student.attendance < 85 ? "error" : "success"}
                                              sx={{ height: 6, borderRadius: 3 }}
                                            />
                                          </Box>
                                          <Box sx={{ minWidth: 35 }}>
                                            <Typography variant="body2" color="text.secondary">
                                              {student.attendance}%
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        <Chip
                                          label={student.feesStatus}
                                          size="small"
                                          color={student.feesStatus === "Paid" ? "success" : "error"}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                    <Box sx={{ textAlign: "center" }}>
                                      <SearchIcon sx={{ fontSize: 48, color: "text.secondary", opacity: 0.5 }} />
                                      <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                                        No students found
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                        Try adjusting your search or filters
                                      </Typography>
                                    </Box>
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
                      </Paper>
                    )}

                    {selectedStudents.length > 0 && (
                      <Zoom in={selectedStudents.length > 0}>
                        <Paper
                          elevation={0}
                          sx={{
                            mt: 3,
                            p: 2,
                            bgcolor: alpha(theme.palette.success.main, 0.1),
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "success.light",
                          }}
                        >
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                              <Typography variant="subtitle1" color="success.main">
                                {selectedStudents.length} student{selectedStudents.length > 1 ? "s" : ""} selected
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Total fine amount: {formatCurrency(calculateTotalFine())}
                              </Typography>
                            </Box>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => setSelectedStudents([])}
                            >
                              Clear Selection
                            </Button>
                          </Box>
                        </Paper>
                      </Zoom>
                    )}
                  </Box>
                </Slide>
              )}

              {activeStep === 2 && (
                <Slide direction="left" in={activeStep === 2} mountOnEnter unmountOnExit>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Set Fine Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Define the fine details, reason, and additional options
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Fine Date"
                          type="date"
                          value={fineDate}
                          onChange={(e) => setFineDate(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarIcon fontSize="small" />
                              </InputAdornment>
                            ),
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Due Date"
                          type="date"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarIcon fontSize="small" />
                              </InputAdornment>
                            ),
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Fine Reason / Description"
                          value={fineReason}
                          onChange={(e) => setFineReason(e.target.value)}
                          multiline
                          rows={3}
                          placeholder="Enter detailed reason for the fine..."
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                                <DescriptionIcon fontSize="small" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                          Additional Options
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={sendNotification}
                              onChange={(e) => setSendNotification(e.target.checked)}
                              color="primary"
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body2">Send notification to parents</Typography>
                              <Typography variant="caption" color="text.secondary">
                                Parents will be notified about the fine via SMS/Email
                              </Typography>
                            </Box>
                          }
                          sx={{ ml: 0 }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={allowWaiver}
                              onChange={(e) => setAllowWaiver(e.target.checked)}
                              color="primary"
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body2">Allow waiver</Typography>
                              <Typography variant="caption" color="text.secondary">
                                Apply a waiver to reduce the total fine amount
                              </Typography>
                            </Box>
                          }
                          sx={{ ml: 0 }}
                        />
                      </Grid>

                      {allowWaiver && (
                        <Grid item xs={12}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              bgcolor: alpha(theme.palette.warning.main, 0.1),
                              borderRadius: 2,
                            }}
                          >
                            <Typography variant="subtitle2" color="warning.dark" gutterBottom>
                              Waiver Settings
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Waiver Amount"
                                  value={waiverAmount}
                                  onChange={(e) => setWaiverAmount(e.target.value)}
                                  type="number"
                                  disabled={!allowWaiver}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">{isPercent ? "%" : "$"}</InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={isPercent}
                                      onChange={(e) => setIsPercent(e.target.checked)}
                                      color="primary"
                                      disabled={!allowWaiver}
                                    />
                                  }
                                  label="Percentage waiver"
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      )}
                    </Grid>

                    {selectedStudents.length > 0 && (
                      <Paper
                        elevation={0}
                        sx={{
                          mt: 3,
                          p: 3,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.info.main, 0.05),
                          border: "1px solid",
                          borderColor: "info.light",
                        }}
                      >
                        <Typography variant="subtitle1" gutterBottom>
                          Summary
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="body2" color="text.secondary">
                              Fine Type:
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {getSelectedFineDetails()?.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="body2" color="text.secondary">
                              Students Selected:
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {selectedStudents.length}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="body2" color="text.secondary">
                              Total Fine Amount:
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {formatCurrency(calculateTotalFine())}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="body2" color="text.secondary">
                              Class:
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {getSelectedClassDetails()?.name} - {getSelectedClassDetails()?.section}
                            </Typography>
                          </Grid>

                          {allowWaiver && waiverAmount && (
                            <>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Waiver Applied:
                                </Typography>
                                <Typography variant="body1" fontWeight={500} color="error.main">
                                  {isPercent ? `${waiverAmount}%` : formatCurrency(Number.parseFloat(waiverAmount))}(
                                  {formatCurrency(calculateWaiverAmount())})
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Final Amount:
                                </Typography>
                                <Typography variant="h6" fontWeight={600} color="primary.main">
                                  {formatCurrency(calculateFinalAmount())}
                                </Typography>
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </Paper>
                    )}
                  </Box>
                </Slide>
              )}

              {activeStep === 3 && (
                <Slide direction="left" in={activeStep === 3} mountOnEnter unmountOnExit>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        mb: 3,
                      }}
                    >
                      <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="h5" color="success.main" gutterBottom>
                        Fine Assignment Successful!
                      </Typography>
                      <Typography variant="body1" color="text.secondary" align="center">
                        The fines have been successfully assigned to the selected students.
                      </Typography>
                    </Box>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        mb: 3,
                      }}
                    >
                      <Typography variant="subtitle1" gutterBottom>
                        Assignment Summary
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">
                            Fine Type:
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {getSelectedFineDetails()?.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">
                            Class:
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {getSelectedClassDetails()?.name} - Section {getSelectedClassDetails()?.section}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">
                            Fine Period:
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {fineDate ? new Date(fineDate).toLocaleDateString() : "N/A"} to{" "}
                            {dueDate ? new Date(dueDate).toLocaleDateString() : "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">
                            Total Students:
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {selectedStudents.length}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ my: 1 }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">
                            Total Fine Amount:
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {formatCurrency(calculateTotalFine())}
                          </Typography>
                        </Grid>
                        {allowWaiver && waiverAmount && (
                          <>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2" color="text.secondary">
                                Waiver Applied:
                              </Typography>
                              <Typography variant="body1" fontWeight={500} color="error.main">
                                {isPercent ? `${waiverAmount}%` : formatCurrency(Number.parseFloat(waiverAmount))}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2" color="text.secondary">
                                Final Amount:
                              </Typography>
                              <Typography variant="h6" fontWeight={600} color="primary.main">
                                {formatCurrency(calculateFinalAmount())}
                              </Typography>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Paper>

                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                      <Button variant="outlined" href="/fines/list">
                        View All Fine Records
                      </Button>
                      <Button variant="contained" href="/fines/assign">
                        Assign Another Fine
                      </Button>
                    </Box>
                  </Box>
                </Slide>
              )}

              {activeStep !== 3 && (
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    startIcon={<ArrowBackIcon />}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={activeStep === 2 ? handleSubmit : handleNext}
                    disabled={
                      (activeStep === 0 && !selectedFine) ||
                      (activeStep === 1 && (!selectedClass || selectedStudents.length === 0)) ||
                      (activeStep === 2 && (!fineDate || !dueDate))
                    }
                    startIcon={activeStep === 2 ? <SaveIcon /> : undefined}
                    endIcon={activeStep !== 2 ? <ArrowBackIcon sx={{ transform: "rotate(180deg)" }} /> : undefined}
                  >
                    {activeStep === 2 ? "Assign Fines" : "Continue"}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
