"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  IconButton,
  Avatar,
  Switch,
  FormControlLabel,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material"
import {
  CloudUpload,
  Save,
  Preview,
  ArrowBack,
  School,
  Class,
  Subject,
  CalendarMonth,
  AccessTime,
  Description,
  AttachFile,
  Notifications,
  CheckCircle,
  Help,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  InsertLink,
  Image as ImageIcon,
  Visibility,
  VisibilityOff,
  HomeWork,
  Assignment,
  BookmarkBorder,
  PriorityHigh,
  Bookmark,
  Star,
} from "@mui/icons-material"

// Sample data for dropdowns
const classes = [
  { id: 1, name: "Class 1" },
  { id: 2, name: "Class 2" },
  { id: 3, name: "Class 3" },
  { id: 4, name: "Class 4" },
  { id: 5, name: "Class 5" },
  { id: 6, name: "Class 6" },
  { id: 7, name: "Class 7" },
  { id: 8, name: "Class 8" },
  { id: 9, name: "Class 9" },
  { id: 10, name: "Class 10" },
]

const sections = [
  { id: 1, name: "Section A" },
  { id: 2, name: "Section B" },
  { id: 3, name: "Section C" },
]

const subjects = [
  { id: 1, name: "Mathematics", icon: "📐" },
  { id: 2, name: "Science", icon: "🔬" },
  { id: 3, name: "English", icon: "📚" },
  { id: 4, name: "History", icon: "🏛️" },
  { id: 5, name: "Geography", icon: "🌍" },
  { id: 6, name: "Computer Science", icon: "💻" },
  { id: 7, name: "Physics", icon: "⚛️" },
  { id: 8, name: "Chemistry", icon: "🧪" },
  { id: 9, name: "Biology", icon: "🧬" },
  { id: 10, name: "Art", icon: "🎨" },
]

const students = [
  { id: 1, name: "Ahmed Khan", avatar: "/placeholder.svg?height=40&width=40", rollNo: "101", present: true },
  { id: 2, name: "Fatima Ali", avatar: "/placeholder.svg?height=40&width=40", rollNo: "102", present: true },
  { id: 3, name: "Mohammad Hasan", avatar: "/placeholder.svg?height=40&width=40", rollNo: "103", present: false },
  { id: 4, name: "Aisha Begum", avatar: "/placeholder.svg?height=40&width=40", rollNo: "104", present: true },
  { id: 5, name: "Omar Farooq", avatar: "/placeholder.svg?height=40&width=40", rollNo: "105", present: true },
  { id: 6, name: "Zainab Malik", avatar: "/placeholder.svg?height=40&width=40", rollNo: "106", present: true },
  { id: 7, name: "Ibrahim Ahmed", avatar: "/placeholder.svg?height=40&width=40", rollNo: "107", present: false },
  { id: 8, name: "Noor Jahan", avatar: "/placeholder.svg?height=40&width=40", rollNo: "108", present: true },
]

// Priority levels
const priorityLevels = [
  { value: "low", label: "Low", color: "#4caf50" },
  { value: "medium", label: "Medium", color: "#ff9800" },
  { value: "high", label: "High", color: "#f44336" },
]

export default function HomeworkAdd() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State for form fields
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedClass, setSelectedClass] = useState<number | null>(null)
  const [selectedSection, setSelectedSection] = useState<number | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null)
  const [dueDate, setDueDate] = useState<Date | null>(new Date())
  const [dueTime, setDueTime] = useState<Date | null>(new Date())
  const [priority, setPriority] = useState("medium")
  const [estimatedTime, setEstimatedTime] = useState("")
  const [maxMarks, setMaxMarks] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [selectedStudents, setSelectedStudents] = useState<Record<number, boolean>>({})
  const [sendNotification, setSendNotification] = useState(true)
  const [isPublished, setIsPublished] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [assignToAll, setAssignToAll] = useState(true)
  const [isImportant, setIsImportant] = useState(false)

  // Initialize selected students
  useState(() => {
    const initialSelection: Record<number, boolean> = {}
    students.forEach((student) => {
      initialSelection[student.id] = student.present
    })
    setSelectedStudents(initialSelection)
  })

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)
      setAttachments([...attachments, ...newFiles])
    }
  }

  // Remove attachment
  const handleRemoveAttachment = (index: number) => {
    const newAttachments = [...attachments]
    newAttachments.splice(index, 1)
    setAttachments(newAttachments)
  }

  // Toggle student selection
  const toggleStudent = (studentId: number) => {
    if (assignToAll) return // Don't allow toggling if assign to all is enabled

    setSelectedStudents((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }))
  }

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Handle save
  const handleSave = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }, 1500)
  }

  // Toggle preview mode
  const togglePreview = () => {
    setPreviewMode(!previewMode)
  }

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Format time for display
  const formatTime = (date: Date | null) => {
    if (!date) return ""
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Count selected students
  const countSelectedStudents = () => {
    if (assignToAll) return students.length
    return Object.values(selectedStudents).filter(Boolean).length
  }

  // Get subject by ID
  const getSubjectById = (id: number | null) => {
    if (!id) return null
    return subjects.find((subject) => subject.id === id)
  }

  // Get class by ID
  const getClassById = (id: number | null) => {
    if (!id) return null
    return classes.find((cls) => cls.id === id)
  }

  // Get section by ID
  const getSectionById = (id: number | null) => {
    if (!id) return null
    return sections.find((section) => section.id === id)
  }

  // Steps for the stepper
  const steps = [
    {
      label: "Basic Information",
      description: "Enter the basic details of the homework",
      content: (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Homework Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter a descriptive title for the homework"
              InputProps={{
                startAdornment: <Assignment sx={{ mr: 1, color: "text.secondary" }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Class</InputLabel>
              <Select
                value={selectedClass || ""}
                onChange={(e) => setSelectedClass(e.target.value as number)}
                label="Class"
                startAdornment={<Class sx={{ mr: 1, color: "text.secondary" }} />}
              >
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Section</InputLabel>
              <Select
                value={selectedSection || ""}
                onChange={(e) => setSelectedSection(e.target.value as number)}
                label="Section"
                startAdornment={<School sx={{ mr: 1, color: "text.secondary" }} />}
                disabled={!selectedClass}
              >
                {sections.map((section) => (
                  <MenuItem key={section.id} value={section.id}>
                    {section.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Subject</InputLabel>
              <Select
                value={selectedSubject || ""}
                onChange={(e) => setSelectedSubject(e.target.value as number)}
                label="Subject"
                startAdornment={<Subject sx={{ mr: 1, color: "text.secondary" }} />}
                disabled={!selectedClass}
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body1" sx={{ mr: 1 }}>
                        {subject.icon}
                      </Typography>
                      {subject.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              variant="outlined"
              value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
              onChange={(e) => {
                const newDate = e.target.value ? new Date(e.target.value) : null
                setDueDate(newDate)
              }}
              InputProps={{
                startAdornment: <CalendarMonth sx={{ mr: 1, color: "text.secondary" }} />,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Due Time"
              type="time"
              fullWidth
              variant="outlined"
              value={
                dueTime
                  ? `${dueTime.getHours().toString().padStart(2, "0")}:${dueTime.getMinutes().toString().padStart(2, "0")}`
                  : ""
              }
              onChange={(e) => {
                if (e.target.value) {
                  const [hours, minutes] = e.target.value.split(":").map(Number)
                  const newTime = new Date()
                  newTime.setHours(hours)
                  newTime.setMinutes(minutes)
                  setDueTime(newTime)
                } else {
                  setDueTime(null)
                }
              }}
              InputProps={{
                startAdornment: <AccessTime sx={{ mr: 1, color: "text.secondary" }} />,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
                startAdornment={<PriorityHigh sx={{ mr: 1, color: "text.secondary" }} />}
              >
                {priorityLevels.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: level.color,
                          mr: 1,
                        }}
                      />
                      {level.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Estimated Time (minutes)"
              variant="outlined"
              fullWidth
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              type="number"
              InputProps={{
                startAdornment: <AccessTime sx={{ mr: 1, color: "text.secondary" }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Maximum Marks"
              variant="outlined"
              fullWidth
              value={maxMarks}
              onChange={(e) => setMaxMarks(e.target.value)}
              type="number"
              InputProps={{
                startAdornment: <Star sx={{ mr: 1, color: "text.secondary" }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch checked={isImportant} onChange={(e) => setIsImportant(e.target.checked)} color="primary" />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ mr: 1 }}>
                    Mark as Important
                  </Typography>
                  {isImportant ? (
                    <Bookmark sx={{ color: theme.palette.warning.main }} />
                  ) : (
                    <BookmarkBorder sx={{ color: "text.secondary" }} />
                  )}
                </Box>
              }
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Homework Content",
      description: "Add detailed instructions and attachments",
      content: (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Homework Description"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter detailed instructions for the homework..."
              InputProps={{
                startAdornment: <Description sx={{ mr: 1, color: "text.secondary", alignSelf: "flex-start", mt: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                border: "1px dashed",
                borderColor: "divider",
                bgcolor: "background.default",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <AttachFile sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="subtitle1">Attachments</Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {attachments.map((file, index) => (
                  <Chip
                    key={index}
                    label={file.name}
                    onDelete={() => handleRemoveAttachment(index)}
                    sx={{ mb: 1 }}
                    icon={
                      file.type.includes("image") ? <ImageIcon fontSize="small" /> : <AttachFile fontSize="small" />
                    }
                  />
                ))}
              </Box>
              <Button
                variant="outlined"
                startIcon={<CloudUpload />}
                onClick={() => fileInputRef.current?.click()}
                sx={{ mr: 1 }}
              >
                Upload Files
              </Button>
              <input type="file" multiple ref={fileInputRef} style={{ display: "none" }} onChange={handleFileUpload} />
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                Supported file types: PDF, DOC, DOCX, JPG, PNG (Max size: 10MB)
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.default",
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Text Formatting
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                <Tooltip title="Bold">
                  <IconButton size="small">
                    <FormatBold />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Italic">
                  <IconButton size="small">
                    <FormatItalic />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Underline">
                  <IconButton size="small">
                    <FormatUnderlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Bullet List">
                  <IconButton size="small">
                    <FormatListBulleted />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Numbered List">
                  <IconButton size="small">
                    <FormatListNumbered />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Insert Link">
                  <IconButton size="small">
                    <InsertLink />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Insert Image">
                  <IconButton size="small">
                    <ImageIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Note: These formatting options are for illustration. In a real application, they would be connected to a
                rich text editor.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Assign Students",
      description: "Select students to assign this homework",
      content: (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch checked={assignToAll} onChange={(e) => setAssignToAll(e.target.checked)} color="primary" />
              }
              label="Assign to all students in the selected class and section"
            />
          </Grid>
          {!assignToAll && (
            <Grid item xs={12}>
              <TextField
                label="Search Students"
                variant="outlined"
                fullWidth
                placeholder="Search by name or roll number..."
                InputProps={{
                  startAdornment: <Search />,
                  // startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
                }}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1">
                  Selected: {countSelectedStudents()} of {students.length} students
                </Typography>
                <Button
                  size="small"
                  onClick={() => {
                    const allSelected = students.every((student) => selectedStudents[student.id])
                    const newSelection: Record<number, boolean> = {}
                    students.forEach((student) => {
                      newSelection[student.id] = !allSelected
                    })
                    setSelectedStudents(newSelection)
                  }}
                >
                  {students.every((student) => selectedStudents[student.id]) ? "Deselect All" : "Select All"}
                </Button>
              </Box>
              <Grid container spacing={2}>
                {students.map((student) => (
                  <Grid item xs={12} sm={6} md={4} key={student.id}>
                    <Card
                      variant="outlined"
                      sx={{
                        cursor: "pointer",
                        bgcolor: selectedStudents[student.id] ? "rgba(25, 118, 210, 0.08)" : "background.paper",
                        border: selectedStudents[student.id] ? "1px solid" : "1px solid",
                        borderColor: selectedStudents[student.id] ? "primary.main" : "divider",
                        transition: "all 0.2s",
                        "&:hover": {
                          boxShadow: 2,
                          borderColor: "primary.main",
                        },
                      }}
                      onClick={() => toggleStudent(student.id)}
                    >
                      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar src={student.avatar} sx={{ mr: 2 }} />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1">{student.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Roll No: {student.rollNo}
                            </Typography>
                          </Box>
                          {selectedStudents[student.id] ? (
                            <CheckCircle color="primary" />
                          ) : (
                            <CheckCircle sx={{ color: "action.disabled" }} />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <FormControlLabel
              control={
                <Switch
                  checked={sendNotification}
                  onChange={(e) => setSendNotification(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Notifications sx={{ mr: 1, color: sendNotification ? "primary.main" : "text.secondary" }} />
                  <Typography>Send notification to students and parents</Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Switch checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} color="primary" />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {isPublished ? (
                    <Visibility sx={{ mr: 1, color: "primary.main" }} />
                  ) : (
                    <VisibilityOff sx={{ mr: 1, color: "text.secondary" }} />
                  )}
                  <Typography>Publish immediately</Typography>
                </Box>
              }
            />
          </Grid>
        </Grid>
      ),
    },
  ]

  return (
    <Box sx={{ p: 3, maxWidth: "100%" }}>
      {/* Header Section */}
      <Card elevation={3} sx={{ mb: 4, borderRadius: 2, overflow: "hidden" }}>
        <Box
          sx={{
            p: 2,
            background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
            color: "white",
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" fontWeight="bold">
                Craft International Institute
              </Typography>
              <Typography variant="subtitle1">Add New Homework</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
                href="/dashboard/stock/allimg"
              >
                Back to Homework
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Form Section */}
        <Grid item xs={12} md={previewMode ? 6 : 12}>
          <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              {!previewMode && (
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                  <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
                    <HomeWork sx={{ mr: 1, color: "#3f51b5" }} />
                    Create New Homework
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Preview />}
                    onClick={togglePreview}
                    disabled={!title || !selectedClass || !selectedSubject || !dueDate}
                  >
                    Preview
                  </Button>
                </Box>
              )}

              {previewMode ? (
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                  <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
                    <Preview sx={{ mr: 1, color: "#3f51b5" }} />
                    Preview Mode
                  </Typography>
                  <Button variant="outlined" startIcon={<Edit />} onClick={togglePreview}>
                    Edit
                  </Button>
                </Box>
              ) : (
                <Stepper activeStep={activeStep} orientation={isMobile ? "vertical" : "horizontal"}>
                  {steps.map((step) => (
                    <Step key={step.label}>
                      <StepLabel
                        optional={isMobile ? <Typography variant="caption">{step.description}</Typography> : null}
                      >
                        {step.label}
                      </StepLabel>
                      {isMobile && <StepContent>{step.content}</StepContent>}
                    </Step>
                  ))}
                </Stepper>
              )}

              {!isMobile && !previewMode && <Box sx={{ mt: 4 }}>{steps[activeStep].content}</Box>}

              {!previewMode && (
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                  <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0} startIcon={<ArrowBack />}>
                    Back
                  </Button>
                  <Box>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={loading || !title || !selectedClass || !selectedSubject || !dueDate}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                        sx={{ minWidth: 150 }}
                      >
                        {loading ? "Saving..." : "Save Homework"}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={!title || !selectedClass || !selectedSubject || !dueDate}
                        endIcon={<ArrowForward />}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Preview Section */}
        {previewMode && (
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
              <CardContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    {title || "Homework Title"}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    {selectedClass && (
                      <Chip
                        icon={<Class />}
                        label={getClassById(selectedClass)?.name || "Class"}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    {selectedSection && (
                      <Chip
                        icon={<School />}
                        label={getSectionById(selectedSection)?.name || "Section"}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    {selectedSubject && (
                      <Chip
                        icon={<Subject />}
                        label={getSubjectById(selectedSubject)?.name || "Subject"}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    <Chip
                      icon={<CalendarMonth />}
                      label={formatDate(dueDate) || "Due Date"}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      icon={<AccessTime />}
                      label={formatTime(dueTime) || "Due Time"}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      icon={<PriorityHigh />}
                      label={priorityLevels.find((p) => p.value === priority)?.label || "Priority"}
                      size="small"
                      sx={{
                        borderColor: priorityLevels.find((p) => p.value === priority)?.color,
                        color: priorityLevels.find((p) => p.value === priority)?.color,
                      }}
                      variant="outlined"
                    />
                    {isImportant && (
                      <Chip icon={<Bookmark />} label="Important" size="small" color="warning" variant="outlined" />
                    )}
                  </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Typography variant="subtitle1" gutterBottom>
                  Description
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "background.default", minHeight: 100 }}>
                  <Typography variant="body1">{description || "No description provided."}</Typography>
                </Paper>

                {attachments.length > 0 && (
                  <>
                    <Typography variant="subtitle1" gutterBottom>
                      Attachments
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "background.default" }}>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {attachments.map((file, index) => (
                          <Chip
                            key={index}
                            label={file.name}
                            icon={
                              file.type.includes("image") ? (
                                <ImageIcon fontSize="small" />
                              ) : (
                                <AttachFile fontSize="small" />
                              )
                            }
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Paper>
                  </>
                )}

                <Typography variant="subtitle1" gutterBottom>
                  Assignment Details
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "background.default" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Estimated Time:
                      </Typography>
                      <Typography variant="body1">
                        {estimatedTime ? `${estimatedTime} minutes` : "Not specified"}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Maximum Marks:
                      </Typography>
                      <Typography variant="body1">{maxMarks || "Not specified"}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Assigned To:
                      </Typography>
                      <Typography variant="body1">
                        {assignToAll ? "All students" : `${countSelectedStudents()} selected students`}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Notifications:
                      </Typography>
                      <Typography variant="body1">{sendNotification ? "Enabled" : "Disabled"}</Typography>
                    </Grid>
                  </Grid>
                </Paper>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                  <Button variant="outlined" startIcon={<Edit />} onClick={togglePreview}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                  >
                    {loading ? "Saving..." : "Save Homework"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Help Card */}
      <Card elevation={1} sx={{ mt: 4, borderRadius: 2, bgcolor: "#f5f5f5" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Help sx={{ mr: 2, color: "text.secondary" }} />
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Tips for Creating Effective Homework
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Be clear and specific about what students need to do
                <br />• Set realistic deadlines and expectations
                <br />• Provide all necessary resources and attachments
                <br />• Consider the estimated time it will take students to complete
                <br />• Use the priority level to indicate importance
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Success Notification */}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Homework successfully saved!
        </Alert>
      </Snackbar>
    </Box>
  )
}

// Missing icon imports
const ArrowForward = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  )
}

const Edit = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  )
}

const Search = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )
}
