/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
  alpha,
  Stepper,
  Step,
  StepLabel,
  Badge,
  Rating,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Autocomplete,
  InputAdornment,
  Paper,
  Switch,
  StepContent,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Slider,
  SelectChangeEvent,
} from "@mui/material"
import {
  Save as SaveIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Add as AddIcon,
  Cancel as CancelIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  Print as PrintIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  CalendarToday as CalendarTodayIcon,
  Comment as CommentIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon,
  PhotoCamera as PhotoCameraIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"

// Define types for our data structures
type Student = {
  id: string
  name: string
  rollNumber: string
  class: string
  section: string
  gender: string
  photo: string
}

type Class = {
  id: string
  name: string
}

type Section = {
  id: string
  name: string
}

type Subject = {
  id: string
  name: string
  teacher: string
}

type Teacher = {
  id: string
  name: string
  subject: string
}

type SubjectReport = {
  id: string
  subject: string
  teacher: string
  attendance: string
  classParticipation: number
  classworkCompletion: number
  homeworkStatus: string
  understandingLevel: number
  testScore: number
  remarks: string
}

type BehaviorNote = {
  id: string
  type: string
  note: string
  teacher: string
}

type HomeworkItem = {
  id: string
  subject: string
  description: string
  dueDate: string
  status: string
  grade: string
  feedback: string
}

type FormData = {
  date: string
  studentId: string
  classId: string
  section: string
  overallAttendance: string
  arrivalTime: string
  departureTime: string
  absenceReason: string
  overallPerformance: number
  behaviorRating: number
  teacherRemarks: string
  subjectReports: SubjectReport[]
  parentSignature: boolean
}

type SnackbarState = {
  open: boolean
  message: string
  severity: "success" | "error" | "warning" | "info"
}

// Custom styled components
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#FFD700",
  },
  "& .MuiRating-iconHover": {
    color: "#FFCC00",
  },
})

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

export default function DailyStudentReportAdd() {
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success"
  })
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogType, setDialogType] = useState<string>("")
  const [previewMode, setPreviewMode] = useState<boolean>(false)
  const [students, setStudents] = useState<Student[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const [sections, setSections] = useState<Section[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectReport[]>([])
  const [behaviorNotes, setBehaviorNotes] = useState<BehaviorNote[]>([])
  const [homeworkItems, setHomeworkItems] = useState<HomeworkItem[]>([])
  const [studentPhoto, setStudentPhoto] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    date: formatDateForInput(new Date()),
    studentId: "",
    classId: "",
    section: "",
    overallAttendance: "Present",
    arrivalTime: "07:45",
    departureTime: "14:30",
    absenceReason: "",
    overallPerformance: 85,
    behaviorRating: 4,
    teacherRemarks: "",
    subjectReports: [],
    parentSignature: false,
  })

  // Helper function to format date for input
  function formatDateForInput(date: Date): string {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Helper function to format date for display
  function formatDateForDisplay(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Helper function to add days to a date
  function addDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  // Load mock data
  useEffect(() => {
    // Mock classes data
    setClasses([
      { id: "1", name: "Class 1" },
      { id: "2", name: "Class 2" },
      { id: "3", name: "Class 3" },
      { id: "4", name: "Class 4" },
      { id: "5", name: "Class 5" },
    ])

    // Mock sections data
    setSections([
      { id: "A", name: "Section A" },
      { id: "B", name: "Section B" },
      { id: "C", name: "Section C" },
    ])

    // Mock students data
    const mockStudents: Student[] = [
      {
        id: "S001",
        name: "Anika Rahman",
        rollNumber: "2023001",
        class: "3",
        section: "A",
        gender: "Female",
        photo: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "S002",
        name: "Farhan Ahmed",
        rollNumber: "2023002",
        class: "3",
        section: "A",
        gender: "Male",
        photo: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "S003",
        name: "Nusrat Jahan",
        rollNumber: "2023003",
        class: "3",
        section: "A",
        gender: "Female",
        photo: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "S004",
        name: "Tanvir Hossain",
        rollNumber: "2023004",
        class: "3",
        section: "A",
        gender: "Male",
        photo: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "S005",
        name: "Sadia Islam",
        rollNumber: "2023005",
        class: "3",
        section: "A",
        gender: "Female",
        photo: "/placeholder.svg?height=100&width=100",
      },
    ]
    setStudents(mockStudents)

    // Mock subjects data
    const mockSubjects: Subject[] = [
      { id: "1", name: "MATHEMATICS", teacher: "Mr. Rahman" },
      { id: "2", name: "SCIENCE", teacher: "Mrs. Begum" },
      { id: "3", name: "ENGLISH", teacher: "Ms. Chowdhury" },
      { id: "4", name: "HISTORY", teacher: "Mr. Islam" },
      { id: "5", name: "GEOGRAPHY", teacher: "Mrs. Akter" },
      { id: "6", name: "PHYSICAL EDUCATION", teacher: "Mr. Hasan" },
      { id: "7", name: "ART", teacher: "Ms. Khanam" },
      { id: "8", name: "MUSIC", teacher: "Mr. Karim" },
      { id: "9", name: "COMPUTER SCIENCE", teacher: "Mr. Siddique" },
    ]
    setSubjects(mockSubjects)

    // Mock teachers data
    setTeachers([
      { id: "1", name: "Mr. Rahman", subject: "MATHEMATICS" },
      { id: "2", name: "Mrs. Begum", subject: "SCIENCE" },
      { id: "3", name: "Ms. Chowdhury", subject: "ENGLISH" },
      { id: "4", name: "Mr. Islam", subject: "HISTORY" },
      { id: "5", name: "Mrs. Akter", subject: "GEOGRAPHY" },
      { id: "6", name: "Mr. Hasan", subject: "PHYSICAL EDUCATION" },
      { id: "7", name: "Ms. Khanam", subject: "ART" },
      { id: "8", name: "Mr. Karim", subject: "MUSIC" },
      { id: "9", name: "Mr. Siddique", subject: "COMPUTER SCIENCE" },
    ])

    // Initialize selected subjects with default values
    const defaultSubjects: SubjectReport[] = mockSubjects.slice(0, 5).map((subject) => ({
      id: subject.id,
      subject: subject.name,
      teacher: subject.teacher,
      attendance: "Present",
      classParticipation: 80,
      classworkCompletion: 85,
      homeworkStatus: "Assigned",
      understandingLevel: 75,
      testScore: 0,
      remarks: "",
    }))
    setSelectedSubjects(defaultSubjects)
    setFormData((prev) => ({ ...prev, subjectReports: defaultSubjects }))

    // Initialize behavior notes
    setBehaviorNotes([
      {
        id: "BN001",
        type: "Positive",
        note: "",
        teacher: "Mr. Rahman",
      },
    ])

    // Initialize homework items
    setHomeworkItems([
      {
        id: "HW001",
        subject: "MATHEMATICS",
        description: "",
        dueDate: formatDateForInput(addDays(new Date(), 1)),
        status: "Assigned",
        grade: "",
        feedback: "",
      },
    ])
  }, [])

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle switch changes
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  // Handle student selection
  const handleStudentSelect = (event: any, newValue: Student | null) => {
    if (newValue) {
      setFormData({
        ...formData,
        studentId: newValue.id,
        classId: newValue.class,
        section: newValue.section,
      })
      setStudentPhoto(newValue.photo)
    }
  }

  // Handle subject selection
  const handleSubjectSelect = (event: any, newValues: Subject[]) => {
    const updatedSubjects = newValues.map((subject) => {
      const existingSubject = selectedSubjects.find((s) => s.id === subject.id)
      if (existingSubject) {
        return existingSubject
      }
      return {
        id: subject.id,
        subject: subject.name,
        teacher: subject.teacher,
        attendance: "Present",
        classParticipation: 80,
        classworkCompletion: 85,
        homeworkStatus: "Assigned",
        understandingLevel: 75,
        testScore: 0,
        remarks: "",
      }
    })
    setSelectedSubjects(updatedSubjects)
    setFormData({ ...formData, subjectReports: updatedSubjects })
  }

  // Handle subject report changes
  const handleSubjectReportChange = (id: string, field: string, value: any) => {
    const updatedSubjects = selectedSubjects.map((subject) =>
      subject.id === id ? { ...subject, [field]: value } : subject,
    )
    setSelectedSubjects(updatedSubjects)
    setFormData({ ...formData, subjectReports: updatedSubjects })
  }

  // Handle behavior note changes
  const handleBehaviorNoteChange = (id: string, field: string, value: string) => {
    const updatedNotes = behaviorNotes.map((note) => (note.id === id ? { ...note, [field]: value } : note))
    setBehaviorNotes(updatedNotes)
  }

  // Handle add behavior note
  const handleAddBehaviorNote = () => {
    const newNote: BehaviorNote = {
      id: `BN${behaviorNotes.length + 1}`.padStart(5, "0"),
      type: "Positive",
      note: "",
      teacher: teachers[0]?.name || "",
    }
    setBehaviorNotes([...behaviorNotes, newNote])
  }

  // Handle remove behavior note
  const handleRemoveBehaviorNote = (id: string) => {
    setBehaviorNotes(behaviorNotes.filter((note) => note.id !== id))
  }

  // Handle homework item changes
  const handleHomeworkChange = (id: string, field: string, value: string) => {
    const updatedItems = homeworkItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    setHomeworkItems(updatedItems)
  }

  // Handle add homework item
  const handleAddHomework = () => {
    const newItem: HomeworkItem = {
      id: `HW${homeworkItems.length + 1}`.padStart(5, "0"),
      subject: subjects[0]?.name || "",
      description: "",
      dueDate: formatDateForInput(addDays(new Date(), 1)),
      status: "Assigned",
      grade: "",
      feedback: "",
    }
    setHomeworkItems([...homeworkItems, newItem])
  }

  // Handle remove homework item
  const handleRemoveHomework = (id: string) => {
    setHomeworkItems(homeworkItems.filter((item) => item.id !== id))
  }

  // Handle dialog open
  const handleOpenDialog = (type: string) => {
    setDialogType(type)
    setOpenDialog(true)
  }

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    window.scrollTo(0, 0)
  }

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    window.scrollTo(0, 0)
  }

  // Handle preview toggle
  const handlePreviewToggle = () => {
    setPreviewMode(!previewMode)
  }

  // Handle form submission
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSnackbar({
        open: true,
        message: "Daily student report added successfully!",
        severity: "success",
      })
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to add report. Please try again.",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle reset form
  const handleResetForm = () => {
    handleOpenDialog("reset")
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "success"
      case "Absent":
        return "error"
      case "Late":
        return "warning"
      default:
        return "default"
    }
  }

  // Get performance color
  const getPerformanceColor = (value: number) => {
    if (value >= 80) return "success"
    if (value >= 60) return "primary"
    if (value >= 40) return "warning"
    return "error"
  }

  // Filter students based on search term, class, and section
  const filteredStudents = students.filter(
    (student) =>
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (formData.classId === "" || student.class === formData.classId) &&
      (formData.section === "" || student.section === formData.section),
  )

  // Get selected student
  const selectedStudent = students.find((student) => student.id === formData.studentId)

  // Steps for the stepper
  const steps = [
    {
      label: "Student Selection",
      description: "Select student and basic information",
      icon: <PersonIcon />,
    },
    {
      label: "Attendance & Performance",
      description: "Record attendance and overall performance",
      icon: <CalendarTodayIcon />,
    },
    {
      label: "Subject Reports",
      description: "Add subject-specific performance details",
      icon: <BookIcon />,
    },
    {
      label: "Behavior & Homework",
      description: "Add behavior notes and homework details",
      icon: <AssignmentIcon />,
    },
    {
      label: "Teacher Remarks",
      description: "Add overall remarks and finalize report",
      icon: <CommentIcon />,
    },
  ]

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
            দৈনিক শিক্ষার্থী প্রতিবেদন
          </Typography>

          <Tooltip title="Notifications">
            <IconButton>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Help">
            <IconButton>
              <HelpIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

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
          <Link underline="hover" color="inherit" href="#" sx={{ display: "flex", alignItems: "center" }}>
            <PersonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Students
          </Link>
          <Link underline="hover" color="inherit" href="#" sx={{ display: "flex", alignItems: "center" }}>
            <AssignmentIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Daily Student Reports
          </Link>
          <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
            <AddIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Add New Report
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Page Title */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ mr: 1 }} component={Link} href="#">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
            Add New Daily Student Report
          </Typography>
        </Box>
        <Box>
          <FormControlLabel
            control={<Switch checked={previewMode} onChange={handlePreviewToggle} />}
            label="Preview Mode"
          />
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 2, overflow: "auto" }}>
        <Grid container spacing={3}>
          {/* Left Sidebar - Stepper */}
          <Grid item xs={12} md={3}>
            <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0", position: "sticky", top: 16 }}>
              <CardContent>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        StepIconComponent={() => (
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor:
                                index === activeStep
                                  ? theme.palette.primary.main
                                  : index < activeStep
                                    ? theme.palette.success.main
                                    : alpha(theme.palette.primary.main, 0.2),
                            }}
                          >
                            {index < activeStep ? <CheckIcon fontSize="small" /> : step.icon}
                          </Avatar>
                        )}
                      >
                        <Typography variant="subtitle1">{step.label}</Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2" color="text.secondary">
                          {step.description}
                        </Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>

                {/* Progress Indicator */}
                <Box sx={{ mt: 4, mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Completion Progress
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "100%", mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={(activeStep / (steps.length - 1)) * 100}
                        sx={{ height: 8, borderRadius: 5 }}
                      />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="text.secondary">{`${Math.round(
                        (activeStep / (steps.length - 1)) * 100,
                      )}%`}</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Quick Actions */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Quick Actions
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<RefreshIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                    onClick={handleResetForm}
                  >
                    Reset Form
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<SaveIcon />}
                    fullWidth
                    onClick={() => handleOpenDialog("save")}
                  >
                    Save Draft
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Main Form Area */}
          <Grid item xs={12} md={9}>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Student Selection */}
              {activeStep === 0 && (
                <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0", mb: 3 }}>
                  <CardHeader
                    title="Student Selection"
                    titleTypographyProps={{ variant: "h6" }}
                    avatar={
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <PersonIcon />
                      </Avatar>
                    }
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          label="Report Date"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          fullWidth
                          required
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Class</InputLabel>
                          <Select name="classId" value={formData.classId} label="Class" onChange={handleSelectChange}>
                            <MenuItem value="">Select Class</MenuItem>
                            {classes.map((cls) => (
                              <MenuItem key={cls.id} value={cls.id}>
                                {cls.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Section</InputLabel>
                          <Select name="section" value={formData.section} label="Section" onChange={handleSelectChange}>
                            <MenuItem value="">Select Section</MenuItem>
                            {sections.map((section) => (
                              <MenuItem key={section.id} value={section.id}>
                                {section.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <Autocomplete
                          options={filteredStudents}
                          getOptionLabel={(option) => `${option.name} (${option.rollNumber})`}
                          onChange={handleStudentSelect}
                          value={selectedStudent || null}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Student"
                              required
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <>
                                    <InputAdornment position="start">
                                      <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                    {params.InputProps.startAdornment}
                                  </>
                                ),
                              }}
                            />
                          )}
                        />
                      </Grid>

                      {selectedStudent && (
                        <Grid item xs={12}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              border: "1px dashed",
                              borderColor: "divider",
                              borderRadius: 2,
                              bgcolor: alpha(theme.palette.primary.main, 0.02),
                            }}
                          >
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
                                <Avatar
                                  src={studentPhoto || undefined}
                                  alt={selectedStudent.name}
                                  sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
                                />
                                <Button
                                  component="label"
                                  variant="outlined"
                                  size="small"
                                  startIcon={<PhotoCameraIcon />}
                                >
                                  Update Photo
                                  <VisuallyHiddenInput type="file" />
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={9}>
                                <Typography variant="h6" gutterBottom>
                                  {selectedStudent.name}
                                </Typography>
                                <Grid container spacing={2}>
                                  <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                      Roll Number
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                      {selectedStudent.rollNumber}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                      Class & Section
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                      Class {selectedStudent.class} - Section {selectedStudent.section}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                      Gender
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                      {selectedStudent.gender}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                      Report Date
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                      {formatDateForDisplay(formData.date)}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Attendance & Performance */}
              {activeStep === 1 && (
                <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0", mb: 3 }}>
                  <CardHeader
                    title="Attendance & Overall Performance"
                    titleTypographyProps={{ variant: "h6" }}
                    avatar={
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <CalendarTodayIcon />
                      </Avatar>
                    }
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" gutterBottom>
                          Attendance Information
                        </Typography>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                          <InputLabel>Attendance Status</InputLabel>
                          <Select
                            name="overallAttendance"
                            value={formData.overallAttendance}
                            label="Attendance Status"
                            onChange={handleSelectChange}
                          >
                            <MenuItem value="Present">Present</MenuItem>
                            <MenuItem value="Absent">Absent</MenuItem>
                            <MenuItem value="Late">Late</MenuItem>
                            <MenuItem value="Half Day">Half Day</MenuItem>
                            <MenuItem value="Excused">Excused</MenuItem>
                          </Select>
                        </FormControl>

                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <TextField
                              label="Arrival Time"
                              type="time"
                              name="arrivalTime"
                              value={formData.arrivalTime}
                              onChange={handleChange}
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              disabled={formData.overallAttendance === "Absent"}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="Departure Time"
                              type="time"
                              name="departureTime"
                              value={formData.departureTime}
                              onChange={handleChange}
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              disabled={formData.overallAttendance === "Absent"}
                            />
                          </Grid>
                        </Grid>

                        {(formData.overallAttendance === "Absent" ||
                          formData.overallAttendance === "Late" ||
                          formData.overallAttendance === "Excused") && (
                            <TextField
                              label="Reason"
                              name="absenceReason"
                              value={formData.absenceReason}
                              onChange={handleChange}
                              fullWidth
                              multiline
                              rows={2}
                              sx={{ mt: 2 }}
                              placeholder="Enter reason for absence/late arrival"
                            />
                          )}
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" gutterBottom>
                          Overall Performance
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Performance Rating (0-100%)
                          </Typography>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                              <Slider
                                value={formData.overallPerformance}
                                onChange={(e, newValue) => setFormData({ ...formData, overallPerformance: newValue as number })}
                                aria-labelledby="performance-slider"
                                valueLabelDisplay="auto"
                                step={5}
                                marks
                                min={0}
                                max={100}
                                color={getPerformanceColor(formData.overallPerformance)}
                              />
                            </Grid>
                            <Grid item>
                              <TextField
                                value={formData.overallPerformance}
                                onChange={(e) => {
                                  const value = Math.min(100, Math.max(0, Number(e.target.value)))
                                  setFormData({ ...formData, overallPerformance: value })
                                }}
                                inputProps={{
                                  step: 5,
                                  min: 0,
                                  max: 100,
                                  type: "number",
                                }}
                                sx={{ width: 80 }}
                              />
                            </Grid>
                          </Grid>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Behavior Rating
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <StyledRating
                              name="behaviorRating"
                              value={formData.behaviorRating}
                              precision={0.5}
                              icon={<StarIcon fontSize="inherit" />}
                              emptyIcon={<StarBorderIcon fontSize="inherit" />}
                              onChange={(e, newValue) => setFormData({ ...formData, behaviorRating: newValue as number })}
                              size="large"
                            />
                            <Typography variant="body2" sx={{ ml: 2 }}>
                              {formData.behaviorRating} / 5
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            p: 2,
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            borderRadius: 2,
                            border: "1px dashed",
                            borderColor: "divider",
                            mt: 3,
                          }}
                        >
                          <Typography variant="subtitle2" gutterBottom>
                            Performance Visualization
                          </Typography>
                          <Box
                            sx={{
                              position: "relative",
                              display: "inline-flex",
                              mx: "auto",
                              my: 2,
                              width: "100%",
                              justifyContent: "center",
                            }}
                          >
                            <CircularProgress
                              variant="determinate"
                              value={formData.overallPerformance}
                              size={120}
                              thickness={5}
                              color={getPerformanceColor(formData.overallPerformance)}
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
                              }}
                            >
                              <Typography variant="h4" component="div" color="text.secondary">
                                {`${Math.round(formData.overallPerformance)}%`}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Subject Reports */}
              {activeStep === 2 && (
                <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0", mb: 3 }}>
                  <CardHeader
                    title="Subject Reports"
                    titleTypographyProps={{ variant: "h6" }}
                    avatar={
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <BookIcon />
                      </Avatar>
                    }
                    action={
                      <Autocomplete
                        multiple
                        options={subjects}
                        getOptionLabel={(option) => option.name}
                        value={subjects.filter((subject) => selectedSubjects.some((s) => s.id === subject.id))}
                        onChange={handleSubjectSelect}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Select Subjects"
                            placeholder="Add subjects"
                            size="small"
                            sx={{ minWidth: 300 }}
                          />
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => {
                            const { key, ...otherProps } = getTagProps({ index });
                            return (
                              <Chip
                                key={option.id} // Explicitly set key
                                label={option.name}
                                size="small"
                                {...otherProps}
                                sx={{ m: 0.5 }}
                              />
                            );
                          })
                        }
                      />




                    }
                  />
                  <Divider />
                  <CardContent>
                    {selectedSubjects.length === 0 ? (
                      <Box sx={{ textAlign: "center", py: 4 }}>
                        <BookIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          No Subjects Selected
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                          Please select subjects to add to the report.
                        </Typography>
                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          onClick={() => {
                            // Add default subjects
                            handleSubjectSelect(null, subjects.slice(0, 5))
                          }}
                        >
                          Add Default Subjects
                        </Button>
                      </Box>
                    ) : (
                      <>
                        <TableContainer>
                          <Table sx={{ minWidth: 650 }} size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Teacher</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Attendance</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Class Participation</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Classwork</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Homework</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Understanding</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Test Score</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {selectedSubjects.map((subject) => (
                                <TableRow key={subject.id} hover>
                                  <TableCell>
                                    <Typography variant="body2" fontWeight="medium">
                                      {subject.subject}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>{subject.teacher}</TableCell>
                                  <TableCell>
                                    <Select
                                      value={subject.attendance}
                                      size="small"
                                      onChange={(e) =>
                                        handleSubjectReportChange(subject.id, "attendance", e.target.value)
                                      }
                                      sx={{ minWidth: 100 }}
                                    >
                                      <MenuItem value="Present">Present</MenuItem>
                                      <MenuItem value="Absent">Absent</MenuItem>
                                      <MenuItem value="Late">Late</MenuItem>
                                    </Select>
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      type="number"
                                      size="small"
                                      value={subject.classParticipation}
                                      onChange={(e) =>
                                        handleSubjectReportChange(
                                          subject.id,
                                          "classParticipation",
                                          Number(e.target.value),
                                        )
                                      }
                                      InputProps={{ inputProps: { min: 0, max: 100 } }}
                                      sx={{ width: 70 }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      type="number"
                                      size="small"
                                      value={subject.classworkCompletion}
                                      onChange={(e) =>
                                        handleSubjectReportChange(
                                          subject.id,
                                          "classworkCompletion",
                                          Number(e.target.value),
                                        )
                                      }
                                      InputProps={{ inputProps: { min: 0, max: 100 } }}
                                      sx={{ width: 70 }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Select
                                      value={subject.homeworkStatus}
                                      size="small"
                                      onChange={(e) =>
                                        handleSubjectReportChange(subject.id, "homeworkStatus", e.target.value)
                                      }
                                      sx={{ minWidth: 150 }}
                                    >
                                      <MenuItem value="Completed">Completed</MenuItem>
                                      <MenuItem value="Partially Completed">Partially Completed</MenuItem>
                                      <MenuItem value="Not Completed">Not Completed</MenuItem>
                                      <MenuItem value="Assigned">Assigned</MenuItem>
                                      <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                                    </Select>
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      type="number"
                                      size="small"
                                      value={subject.understandingLevel}
                                      onChange={(e) =>
                                        handleSubjectReportChange(
                                          subject.id,
                                          "understandingLevel",
                                          Number(e.target.value),
                                        )
                                      }
                                      InputProps={{ inputProps: { min: 0, max: 100 } }}
                                      sx={{ width: 70 }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      type="number"
                                      size="small"
                                      value={subject.testScore}
                                      onChange={(e) =>
                                        handleSubjectReportChange(subject.id, "testScore", Number(e.target.value))
                                      }
                                      InputProps={{ inputProps: { min: 0, max: 100 } }}
                                      sx={{ width: 70 }}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <Box sx={{ mt: 3 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Subject-specific Remarks
                          </Typography>
                          <Grid container spacing={2}>
                            {selectedSubjects.map((subject) => (
                              <Grid item xs={12} md={6} key={`remarks-${subject.id}`}>
                                <Card variant="outlined" sx={{ mb: 2 }}>
                                  <CardHeader
                                    title={subject.subject}
                                    subheader={subject.teacher}
                                    titleTypographyProps={{ variant: "subtitle1" }}
                                    subheaderTypographyProps={{ variant: "body2" }}
                                    sx={{ pb: 0 }}
                                  />
                                  <CardContent>
                                    <TextField
                                      fullWidth
                                      multiline
                                      rows={2}
                                      value={subject.remarks}
                                      onChange={(e) => handleSubjectReportChange(subject.id, "remarks", e.target.value)}
                                      placeholder="Enter subject-specific remarks"
                                      variant="outlined"
                                      size="small"
                                    />
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Behavior & Homework */}
              {activeStep === 3 && (
                <>
                  {/* Behavior Notes */}
                  <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0", mb: 3 }}>
                    <CardHeader
                      title="Behavior Notes"
                      titleTypographyProps={{ variant: "h6" }}
                      avatar={
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <CommentIcon />
                        </Avatar>
                      }
                      action={
                        <Button variant="outlined" startIcon={<AddIcon />} size="small" onClick={handleAddBehaviorNote}>
                          Add Note
                        </Button>
                      }
                    />
                    <Divider />
                    <CardContent>
                      {behaviorNotes.length === 0 ? (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                          <CommentIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
                          <Typography variant="h6" gutterBottom>
                            No Behavior Notes
                          </Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            Add behavior notes to track student conduct and achievements.
                          </Typography>
                          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddBehaviorNote}>
                            Add First Note
                          </Button>
                        </Box>
                      ) : (
                        <Grid container spacing={2}>
                          {behaviorNotes.map((note) => (
                            <Grid item xs={12} md={6} key={note.id}>
                              <Card
                                variant="outlined"
                                sx={{
                                  mb: 2,
                                  borderLeft: 5,
                                  borderColor:
                                    note.type === "Positive"
                                      ? "success.main"
                                      : note.type === "Concern"
                                        ? "warning.main"
                                        : "error.main",
                                }}
                              >
                                <CardHeader
                                  title={
                                    <FormControl fullWidth size="small">
                                      <InputLabel>Note Type</InputLabel>
                                      <Select
                                        value={note.type}
                                        label="Note Type"
                                        onChange={(e) => handleBehaviorNoteChange(note.id, "type", e.target.value)}
                                      >
                                        <MenuItem value="Positive">Positive</MenuItem>
                                        <MenuItem value="Concern">Concern</MenuItem>
                                        <MenuItem value="Serious">Serious</MenuItem>
                                      </Select>
                                    </FormControl>
                                  }
                                  action={
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => handleRemoveBehaviorNote(note.id)}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  }
                                />
                                <CardContent>
                                  <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    value={note.note}
                                    onChange={(e) => handleBehaviorNoteChange(note.id, "note", e.target.value)}
                                    placeholder="Enter behavior note"
                                    variant="outlined"
                                    size="small"
                                    sx={{ mb: 2 }}
                                  />
                                  <FormControl fullWidth size="small">
                                    <InputLabel>Reported By</InputLabel>
                                    <Select
                                      value={note.teacher}
                                      label="Reported By"
                                      onChange={(e) => handleBehaviorNoteChange(note.id, "teacher", e.target.value)}
                                    >
                                      {teachers.map((teacher) => (
                                        <MenuItem key={teacher.id} value={teacher.name}>
                                          {teacher.name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </CardContent>
                  </Card>

                  {/* Homework */}
                  <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0", mb: 3 }}>
                    <CardHeader
                      title="Homework Details"
                      titleTypographyProps={{ variant: "h6" }}
                      avatar={
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <AssignmentIcon />
                        </Avatar>
                      }
                      action={
                        <Button variant="outlined" startIcon={<AddIcon />} size="small" onClick={handleAddHomework}>
                          Add Homework
                        </Button>
                      }
                    />
                    <Divider />
                    <CardContent>
                      {homeworkItems.length === 0 ? (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                          <AssignmentIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
                          <Typography variant="h6" gutterBottom>
                            No Homework Items
                          </Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            Add homework items to track assignments and progress.
                          </Typography>
                          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddHomework}>
                            Add First Homework
                          </Button>
                        </Box>
                      ) : (
                        <TableContainer>
                          <Table sx={{ minWidth: 650 }} size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Due Date</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Grade</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {homeworkItems.map((item) => (
                                <TableRow key={item.id} hover>
                                  <TableCell>
                                    <FormControl fullWidth size="small">
                                      <Select
                                        value={item.subject}
                                        onChange={(e) => handleHomeworkChange(item.id, "subject", e.target.value)}
                                      >
                                        {subjects.map((subject) => (
                                          <MenuItem key={subject.id} value={subject.name}>
                                            {subject.name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      fullWidth
                                      value={item.description}
                                      onChange={(e) => handleHomeworkChange(item.id, "description", e.target.value)}
                                      placeholder="Enter description"
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      type="date"
                                      value={item.dueDate}
                                      onChange={(e) => handleHomeworkChange(item.id, "dueDate", e.target.value)}
                                      size="small"
                                      InputLabelProps={{ shrink: true }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <FormControl fullWidth size="small">
                                      <Select
                                        value={item.status}
                                        onChange={(e) => handleHomeworkChange(item.id, "status", e.target.value)}
                                      >
                                        <MenuItem value="Assigned">Assigned</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>
                                        <MenuItem value="Partially Completed">Partially Completed</MenuItem>
                                        <MenuItem value="Not Completed">Not Completed</MenuItem>
                                        <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      value={item.grade}
                                      onChange={(e) => handleHomeworkChange(item.id, "grade", e.target.value)}
                                      placeholder="e.g., A, B+"
                                      size="small"
                                      sx={{ width: 80 }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => handleRemoveHomework(item.id)}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Step 5: Teacher Remarks */}
              {activeStep === 4 && (
                <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0", mb: 3 }}>
                  <CardHeader
                    title="Teacher Remarks & Finalization"
                    titleTypographyProps={{ variant: "h6" }}
                    avatar={
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <CommentIcon />
                      </Avatar>
                    }
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                          Overall Teacher Remarks
                        </Typography>
                        <TextField
                          name="teacherRemarks"
                          value={formData.teacherRemarks}
                          onChange={handleChange}
                          fullWidth
                          multiline
                          rows={6}
                          placeholder="Enter comprehensive remarks about the student's overall performance, behavior, strengths, areas for improvement, and any specific recommendations."
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Box
                          sx={{
                            p: 3,
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            borderRadius: 2,
                            border: "1px dashed",
                            borderColor: "divider",
                          }}
                        >
                          <Typography variant="subtitle1" gutterBottom>
                            Report Summary
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                              <Paper elevation={0} sx={{ p: 2, textAlign: "center", height: "100%" }}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  Overall Performance
                                </Typography>
                                <Box
                                  sx={{
                                    position: "relative",
                                    display: "inline-flex",
                                    mb: 1,
                                  }}
                                >
                                  <CircularProgress
                                    variant="determinate"
                                    value={formData.overallPerformance}
                                    size={60}
                                    thickness={5}
                                    color={getPerformanceColor(formData.overallPerformance)}
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
                                    }}
                                  >
                                    <Typography variant="body1" component="div" color="text.secondary">
                                      {`${Math.round(formData.overallPerformance)}%`}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Paper>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Paper elevation={0} sx={{ p: 2, textAlign: "center", height: "100%" }}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  Behavior Rating
                                </Typography>
                                <StyledRating
                                  name="read-only"
                                  value={formData.behaviorRating}
                                  precision={0.5}
                                  icon={<StarIcon fontSize="inherit" />}
                                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                  readOnly
                                />
                              </Paper>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Paper elevation={0} sx={{ p: 2, textAlign: "center", height: "100%" }}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  Attendance Status
                                </Typography>
                                <Chip
                                  label={formData.overallAttendance}
                                  color={getStatusColor(formData.overallAttendance)}
                                  sx={{ fontWeight: "medium" }}
                                />
                              </Paper>
                            </Grid>
                          </Grid>

                          <Box sx={{ mt: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Report Details
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={6} sm={3}>
                                <Typography variant="body2" color="text.secondary">
                                  Student
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                  {selectedStudent?.name || "Not selected"}
                                </Typography>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Typography variant="body2" color="text.secondary">
                                  Date
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                  {formatDateForDisplay(formData.date)}
                                </Typography>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Typography variant="body2" color="text.secondary">
                                  Class & Section
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                  {formData.classId && formData.section
                                    ? `Class ${formData.classId} - Section ${formData.section}`
                                    : "Not selected"}
                                </Typography>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Typography variant="body2" color="text.secondary">
                                  Subjects
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                  {selectedSubjects.length} subjects
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData.parentSignature}
                              onChange={(e) => setFormData({ ...formData, parentSignature: e.target.checked })}
                              name="parentSignature"
                            />
                          }
                          label="Report signed by parent"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}

              {/* Preview Mode */}
              {previewMode && (
                <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0", mb: 3 }}>
                  <CardHeader
                    title="Report Preview"
                    titleTypographyProps={{ variant: "h6" }}
                    avatar={
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <PrintIcon />
                      </Avatar>
                    }
                    action={
                      <Button variant="outlined" startIcon={<PrintIcon />} size="small">
                        Print Preview
                      </Button>
                    }
                  />
                  <Divider />
                  <CardContent>
                    <Box sx={{ p: 2, border: "1px dashed", borderColor: "divider", borderRadius: 2 }}>
                      {/* Header */}
                      <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Typography variant="h5" gutterBottom>
                          Daily Student Report
                        </Typography>
                        <Typography variant="subtitle1">{formatDateForDisplay(formData.date)}</Typography>
                      </Box>

                      {/* Student Info */}
                      {selectedStudent && (
                        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                          <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
                            <Avatar
                              src={studentPhoto || undefined}
                              alt={selectedStudent.name}
                              sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={9}>
                            <Typography variant="h6" gutterBottom>
                              {selectedStudent.name}
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Roll Number
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                  {selectedStudent.rollNumber}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Class & Section
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                  Class {selectedStudent.class} - Section {selectedStudent.section}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Attendance
                                </Typography>
                                <Chip
                                  label={formData.overallAttendance}
                                  size="small"
                                  color={getStatusColor(formData.overallAttendance)}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Performance
                                </Typography>
                                <Typography
                                  variant="body1"
                                  color={getPerformanceColor(formData.overallPerformance)}
                                  fontWeight="medium"
                                >
                                  {formData.overallPerformance}%
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}

                      {/* Subject Reports */}
                      <Typography variant="h6" gutterBottom>
                        Subject Reports
                      </Typography>
                      <TableContainer sx={{ mb: 3 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>Teacher</TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>Attendance</TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>Participation</TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>Classwork</TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>Homework</TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>Understanding</TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>Test Score</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectedSubjects.map((subject) => (
                              <TableRow key={subject.id}>
                                <TableCell>{subject.subject}</TableCell>
                                <TableCell>{subject.teacher}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={subject.attendance}
                                    size="small"
                                    color={getStatusColor(subject.attendance)}
                                    variant="outlined"
                                  />
                                </TableCell>
                                <TableCell>{subject.classParticipation}%</TableCell>
                                <TableCell>{subject.classworkCompletion}%</TableCell>
                                <TableCell>{subject.homeworkStatus}</TableCell>
                                <TableCell>{subject.understandingLevel}%</TableCell>
                                <TableCell>{subject.testScore}%</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      {/* Behavior Notes */}
                      <Typography variant="h6" gutterBottom>
                        Behavior Notes
                      </Typography>
                      {behaviorNotes.length > 0 ? (
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                          {behaviorNotes.map((note) => (
                            <Grid item xs={12} sm={6} key={note.id}>
                              <Box
                                sx={{
                                  p: 2,
                                  borderLeft: 5,
                                  borderColor:
                                    note.type === "Positive"
                                      ? "success.main"
                                      : note.type === "Concern"
                                        ? "warning.main"
                                        : "error.main",
                                  bgcolor: alpha(
                                    note.type === "Positive"
                                      ? theme.palette.success.main
                                      : note.type === "Concern"
                                        ? theme.palette.warning.main
                                        : theme.palette.error.main,
                                    0.05,
                                  ),
                                }}
                              >
                                <Typography variant="subtitle2" gutterBottom>
                                  {note.type}
                                </Typography>
                                <Typography variant="body2">{note.note || "No details provided"}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Reported by: {note.teacher}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          No behavior notes recorded.
                        </Typography>
                      )}

                      {/* Teacher Remarks */}
                      <Typography variant="h6" gutterBottom>
                        Teacher Remarks
                      </Typography>
                      <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), mb: 3, borderRadius: 1 }}>
                        <Typography variant="body1">
                          {formData.teacherRemarks || "No teacher remarks provided."}
                        </Typography>
                      </Box>

                      {/* Signatures */}
                      <Grid container spacing={2} sx={{ mt: 4 }}>
                        <Grid item xs={6}>
                          <Box sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1 }}>
                            <Typography variant="body2" align="center">
                              Teacher&apos;s Signature
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1 }}>
                            <Typography variant="body2" align="center">
                              Parent&apos;s Signature
                            </Typography>
                            {formData.parentSignature && (
                              <Typography variant="caption" align="center" display="block" color="success.main">
                                (Signed)
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </form>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #e0e0e0",
          bgcolor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          position: "sticky",
          bottom: 0,
          zIndex: 10,
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleBack}
          disabled={activeStep === 0}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>

        <Box>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mr: 2 }}
            startIcon={<CancelIcon />}
            component={Link}
            href="#"
          >
            Cancel
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            >
              {loading ? "Saving..." : "Save Report"}
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext} endIcon={<ArrowForwardIcon />}>
              Next
            </Button>
          )}
        </Box>
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="save"
        sx={{ position: "fixed", bottom: 80, right: 16 }}
        onClick={() => handleOpenDialog("save")}
      >
        <SaveIcon />
      </Fab>

      {/* Save Dialog */}
      <Dialog open={openDialog && dialogType === "save"} onClose={handleCloseDialog}>
        <DialogTitle>Save Report</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want to save this report as a draft or submit it as final?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              handleCloseDialog()
              setSnackbar({
                open: true,
                message: "Report saved as draft!",
                severity: "info",
              })
            }}
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => {
              handleCloseDialog()
              handleSubmit()
            }}
            variant="contained"
          >
            Submit Final
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reset Dialog */}
      <Dialog open={openDialog && dialogType === "reset"} onClose={handleCloseDialog}>
        <DialogTitle>Reset Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reset the form? All unsaved changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              handleCloseDialog()
              window.location.reload()
            }}
            color="error"
            variant="contained"
          >
            Reset Form
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}