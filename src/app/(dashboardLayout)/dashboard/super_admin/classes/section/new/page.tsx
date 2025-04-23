/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Grid,
  Chip,
  MenuItem,
  InputAdornment,
  useMediaQuery,
  Fade,
  createTheme,
  ThemeProvider,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Snackbar,
  Alert,
  SelectChangeEvent,
} from "@mui/material"
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Groups as GroupsIcon,
  Room as RoomIcon,
  Info as InfoIcon,
  Schedule as ScheduleIcon,
  Bookmark as BookmarkIcon,
  ColorLens as ColorLensIcon,
  Save,
} from "@mui/icons-material"
import { Roboto } from "next/font/google"
import Link from "next/link"
import { motion } from "framer-motion"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
})

// Create a custom theme with vibrant colors
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#6366f1", 
      light: "#818cf8",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#ec4899", 
      light: "#f472b6",
      dark: "#db2777",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    info: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "10px 20px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(99, 102, 241, 0.2)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          overflow: "visible",
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
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#6366f1",
          },
        },
      },
    },
  },
})

// Sample data for classes
const sampleClasses = [
  { id: 1, name: "Class 1", value: "class_1" },
  { id: 2, name: "Class 2", value: "class_2" },
  { id: 3, name: "Class 3", value: "class_3" },
  { id: 4, name: "Class 4", value: "class_4" },
  { id: 5, name: "Class 5", value: "class_5" },
  { id: 6, name: "Class 6", value: "class_6" },
  { id: 7, name: "Class 7", value: "class_7" },
  { id: 8, name: "Class 8", value: "class_8" },
  { id: 9, name: "Class 9", value: "class_9" },
  { id: 10, name: "Class 10", value: "class_10" },
  { id: 11, name: "Class 11", value: "class_11" },
  { id: 12, name: "Class 12", value: "class_12" },
]

// Sample data for teachers
const sampleTeachers = [
  { id: 1, name: "Dr. Smith", subject: "Mathematics", avatar: "S" },
  { id: 2, name: "Prof. Johnson", subject: "Science", avatar: "J" },
  { id: 3, name: "Mrs. Williams", subject: "English", avatar: "W" },
  { id: 4, name: "Mr. Brown", subject: "History", avatar: "B" },
  { id: 5, name: "Ms. Davis", subject: "Computer Science", avatar: "D" },
]

// Sample data for rooms
const sampleRooms = [
  { id: 1, name: "Room 101", capacity: 30, building: "Main Building", floor: 1 },
  { id: 2, name: "Room 102", capacity: 25, building: "Main Building", floor: 1 },
  { id: 3, name: "Room 201", capacity: 35, building: "Main Building", floor: 2 },
  { id: 4, name: "Room 202", capacity: 40, building: "Main Building", floor: 2 },
  { id: 5, name: "Lab 101", capacity: 20, building: "Science Block", floor: 1 },
]

// Sample data for time slots
const sampleTimeSlots = [
  { id: 1, start: "08:00 AM", end: "09:00 AM", day: "Monday" },
  { id: 2, start: "09:00 AM", end: "10:00 AM", day: "Monday" },
  { id: 3, start: "10:00 AM", end: "11:00 AM", day: "Monday" },
  { id: 4, start: "11:00 AM", end: "12:00 PM", day: "Monday" },
  { id: 5, start: "01:00 PM", end: "02:00 PM", day: "Monday" },
  { id: 6, start: "08:00 AM", end: "09:00 AM", day: "Tuesday" },
  { id: 7, start: "09:00 AM", end: "10:00 AM", day: "Tuesday" },
  { id: 8, start: "10:00 AM", end: "11:00 AM", day: "Tuesday" },
]

// Sample data for section types
const sectionTypes = [
  { id: 1, name: "Regular", color: "#3b82f6" },
  { id: 2, name: "Honors", color: "#8b5cf6" },
  { id: 3, name: "Advanced", color: "#ec4899" },
  { id: 4, name: "Special", color: "#f59e0b" },
]

// Color palette for section customization
const colorPalette = [
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#f59e0b", // Amber
  "#10b981", // Emerald
  "#ef4444", // Red
  "#6366f1", // Indigo
  "#84cc16", // Lime
  "#14b8a6", // Teal
  "#f97316", // Orange
]

interface FormData {
  name: string;
  classId: string;
  capacity: number;
  teacherId: string;
  roomId: string;
  timeSlots: number[];
  description: string;
  sectionType: number;
  color: string;
  isActive: boolean;
}

export default function SectionAddPage() {
  const theme = customTheme
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    classId: "",
    capacity: 30,
    teacherId: "",
    roomId: "",
    timeSlots: [],
    description: "",
    sectionType: 1,
    color: "#6366f1",
    isActive: true,
  })

  // UI state
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success")

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target as { name: string; value: string }
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle number input changes
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: Number(value),
    })
  }

  // Handle time slot selection
  const handleTimeSlotChange = (timeSlotId: number) => {
    const currentTimeSlots = [...formData.timeSlots]
    const index = currentTimeSlots.indexOf(timeSlotId)

    if (index === -1) {
      currentTimeSlots.push(timeSlotId)
    } else {
      currentTimeSlots.splice(index, 1)
    }

    setFormData({
      ...formData,
      timeSlots: currentTimeSlots,
    })
  }

  // Handle color selection
  const handleColorChange = (color: string) => {
    setFormData({
      ...formData,
      color,
    })
    setShowColorPicker(false)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name.trim()) {
      setError("Section name is required")
      setSnackbarMessage("Section name is required")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
      return
    }

    if (!formData.classId) {
      setError("Class selection is required")
      setSnackbarMessage("Class selection is required")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
      return
    }


    setLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess(true)
      setSnackbarMessage("Section created successfully!")
      setSnackbarSeverity("success")
      setSnackbarOpen(true)

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          classId: "",
          capacity: 30,
          teacherId: "",
          roomId: "",
          timeSlots: [],
          description: "",
          sectionType: 1,
          color: "#6366f1",
          isActive: true,
        })
        setSuccess(false)
        setActiveStep(0)
      }, 2000)
    } catch (err) {
      setError("An error occurred while creating the section")
      setSnackbarMessage("An error occurred while creating the section")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
    } finally {
      setLoading(false)
    }
  }

  // Handle stepper navigation
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Steps for the stepper
  const steps = ["Basic Information", "Scheduling", "Additional Details"]

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
     <ThemeProvider theme={theme}>
          <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", borderRadius: 2 }}>
            <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2 }}>
              <Fade in={true} timeout={800}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                      flexWrap: "wrap",
                      gap: 2,
                      paddingTop: 2
                    }}
                  >


                
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
                  + New Section
                </Typography>
                <Button
                  component={Link}
                  href="/dashboard/super_admin/section"
                  startIcon={<ArrowBackIcon />}
                  sx={{ mr: 2 }}
                >
                  Back to Sections
                </Button>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  mb: 4,
                  overflow: "hidden",
                  borderTop: `4px solid ${theme.palette.primary.main}`,
                }}
              >
                <Box sx={{ p: 3 }}>
                  <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <form onSubmit={handleSubmit}>
                    {activeStep === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                              <InputLabel id="class-select-label">Class</InputLabel>
                              <Select
                                labelId="class-select-label"
                                id="class-select"
                                name="classId"
                                value={formData.classId}
                                onChange={handleChange}
                                label="Class"
                              >
                                {sampleClasses.map((cls) => (
                                  <MenuItem key={cls.id} value={cls.value}>
                                    {cls.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              required
                              label="Section Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="e.g., Section A, Morning Batch"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <BookmarkIcon fontSize="small" color="action" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Capacity"
                              name="capacity"
                              type="number"
                              value={formData.capacity}
                              onChange={handleNumberChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <GroupsIcon fontSize="small" color="action" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                              <InputLabel id="teacher-select-label">Teacher</InputLabel>
                              <Select
                                labelId="teacher-select-label"
                                id="teacher-select"
                                name="teacherId"
                                value={formData.teacherId}
                                onChange={handleChange}
                                label="Teacher"
                              >
                                {sampleTeachers.map((teacher) => (
                                  <MenuItem key={teacher.id} value={teacher.id.toString()}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                      <Avatar
                                        sx={{
                                          width: 24,
                                          height: 24,
                                          mr: 1,
                                          bgcolor: "primary.main",
                                          fontSize: "0.75rem",
                                        }}
                                      >
                                        {teacher.avatar}
                                      </Avatar>
                                      <Typography variant="body2">{teacher.name}</Typography>
                                      <Chip
                                        label={teacher.subject}
                                        size="small"
                                        sx={{
                                          ml: 1,
                                          bgcolor: "rgba(99, 102, 241, 0.08)",
                                          color: "primary.main",
                                          fontWeight: 500,
                                        }}
                                      />
                                    </Box>
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </motion.div>
                    )}

                    {activeStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                              <InputLabel id="room-select-label">Room</InputLabel>
                              <Select
                                labelId="room-select-label"
                                id="room-select"
                                name="roomId"
                                value={formData.roomId}
                                onChange={handleChange}
                                label="Room"
                              >
                                {sampleRooms.map((room) => (
                                  <MenuItem key={room.id} value={room.id.toString()}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                      <RoomIcon fontSize="small" sx={{ mr: 1, color: "action.active" }} />
                                      <Typography variant="body2">{room.name}</Typography>
                                      <Typography variant="caption" sx={{ ml: 1, color: "text.secondary" }}>
                                        (Capacity: {room.capacity})
                                      </Typography>
                                    </Box>
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                              Time Slots
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              Select the time slots for this section
                            </Typography>

                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                              {sampleTimeSlots.map((slot) => (
                                <Chip
                                  key={slot.id}
                                  label={`${slot.day} ${slot.start} - ${slot.end}`}
                                  onClick={() => handleTimeSlotChange(slot.id)}
                                  color={formData.timeSlots.includes(slot.id) ? "primary" : "default"}
                                  variant={formData.timeSlots.includes(slot.id) ? "filled" : "outlined"}
                                  icon={<ScheduleIcon />}
                                  sx={{
                                    px: 1,
                                    "& .MuiChip-icon": {
                                      color: formData.timeSlots.includes(slot.id) ? "inherit" : "action.active",
                                    },
                                  }}
                                />
                              ))}
                            </Box>
                          </Grid>
                        </Grid>
                      </motion.div>
                    )}

                    {activeStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                              <InputLabel id="section-type-label">Section Type</InputLabel>
                              <Select
                                labelId="section-type-label"
                                id="section-type"
                                name="sectionType"
                                value={formData.sectionType.toString()}
                                onChange={handleChange}
                                label="Section Type"
                              >
                                {sectionTypes.map((type) => (
                                  <MenuItem key={type.id} value={type.id.toString()}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                      <Box
                                        sx={{
                                          width: 16,
                                          height: 16,
                                          borderRadius: "50%",
                                          bgcolor: type.color,
                                          mr: 1,
                                        }}
                                      />
                                      {type.name}
                                    </Box>
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <TextField
                                fullWidth
                                label="Section Color"
                                value={formData.color}
                                InputProps={{
                                  readOnly: true,
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Box
                                        sx={{
                                          width: 20,
                                          height: 20,
                                          borderRadius: "50%",
                                          bgcolor: formData.color,
                                        }}
                                      />
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{ mr: 1 }}
                              />
                              <Button
                                variant="outlined"
                                onClick={() => setShowColorPicker(!showColorPicker)}
                                startIcon={<ColorLensIcon />}
                              >
                                Change
                              </Button>
                            </Box>

                            {showColorPicker && (
                              <Paper
                                elevation={3}
                                sx={{
                                  mt: 2,
                                  p: 2,
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1,
                                  maxWidth: 300,
                                }}
                              >
                                {colorPalette.map((color) => (
                                  <Box
                                    key={color}
                                    sx={{
                                      width: 36,
                                      height: 36,
                                      borderRadius: "50%",
                                      bgcolor: color,
                                      cursor: "pointer",
                                      border: formData.color === color ? "2px solid #000" : "none",
                                      "&:hover": {
                                        opacity: 0.8,
                                        transform: "scale(1.1)",
                                      },
                                      transition: "all 0.2s ease",
                                    }}
                                    onClick={() => handleColorChange(color)}
                                  />
                                ))}
                              </Paper>
                            )}
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Description"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              multiline
                              rows={4}
                              placeholder="Add any additional details about this section..."
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={formData.isActive}
                                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                  color="primary"
                                />
                              }
                              label="Active Section"
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                              Inactive sections won&apos;t appear in schedules and student assignments
                            </Typography>
                          </Grid>
                        </Grid>
                      </motion.div>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                      <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                        Back
                      </Button>
                      <Box>
                        {activeStep === steps.length - 1 ? (
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={loading || success}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                            sx={{
                              px: 4,
                              py: 1.5,
                              fontSize: "1rem",
                              boxShadow: "0px 8px 16px rgba(99, 102, 241, 0.2)",
                              "&:hover": {
                                boxShadow: "0px 8px 20px rgba(99, 102, 241, 0.4)",
                              },
                            }}
                          >
                            {loading ? "Saving..." : success ? "Saved!" : "Save Section"}
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            sx={{
                              px: 4,
                            }}
                          >
                            Next
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </form>
                </Box>
              </Paper>

              <Paper elevation={0} sx={{ p: 3, bgcolor: "rgba(59, 130, 246, 0.05)", mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <InfoIcon color="info" sx={{ mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "info.main" }}>
                      Section Management Tips
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sections help you organize students within a class. You can create multiple sections for a single
                      class to manage different batches, schedules, or teaching approaches. Each section can have its
                      own teacher, schedule, and room assignment.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Assign a dedicated teacher to each section"
                        variant="outlined"
                        color="info"
                        sx={{ mr: 1, mb: 1 }}
                      />
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Set appropriate capacity based on room size"
                        variant="outlined"
                        color="info"
                        sx={{ mr: 1, mb: 1 }}
                      />
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Use color coding for easy identification"
                        variant="outlined"
                        color="info"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}