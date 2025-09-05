/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,

  FormControl,

  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  FormHelperText,
  FormControlLabel,
  Switch,
  useTheme,
  useMediaQuery,
  Autocomplete,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material"
import {
  Save as SaveIcon,

  AccessTime as AccessTimeIcon,
  Event as EventIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  Book as BookIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  CalendarMonth as CalendarMonthIcon,
  Refresh as RefreshIcon,
  ArrowBack as ArrowBackIcon,

  Close as CloseIcon,
  Info as InfoIcon,

  Visibility as VisibilityIcon,

  ColorLens as ColorLensIcon,
} from "@mui/icons-material"
import Link from "next/link"

import type { TransitionProps } from "@mui/material/transitions"
import React from "react"

// Sample data for demonstration
const sampleTeachers = [
  { id: 1, name: "Dr. Sarah Johnson", department: "Science", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Prof. Michael Chen", department: "Mathematics", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Ms. Emily Rodriguez", department: "English", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Mr. David Wilson", department: "History", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Dr. Priya Patel", department: "Computer Science", avatar: "/placeholder.svg?height=100&width=100" },
]

const sampleClasses = [
  { id: 1, name: "Grade 10-A", section: "A", students: 28, schedule: "Morning" },
  { id: 2, name: "Grade 10-B", section: "B", students: 20, schedule: "Afternoon" },
  { id: 3, name: "Grade 11-A", section: "A", students: 25, schedule: "Morning" },
  { id: 4, name: "Grade 11-B", section: "B", students: 30, schedule: "Morning" },
  { id: 5, name: "Grade 12-A", section: "B", students: 29, schedule: "Morning" },
]

// test

const sampleSubjects = [
  { id: 1, name: "Physics", code: "PHY101", department: "Science", credits: 4 },
  { id: 2, name: "Chemistry", code: "CHM101", department: "Science", credits: 4 },
  { id: 3, name: "Biology", code: "BIO101", department: "Science", credits: 4 },
  { id: 4, name: "Mathematics", code: "MTH101", department: "Mathematics", credits: 4 },
  { id: 5, name: "English Literature", code: "ENG101", department: "English", credits: 3 },
  { id: 6, name: "Computer Science", code: "CS101", department: "Computer Science", credits: 4 },
  { id: 7, name: "World History", code: "HIS101", department: "History", credits: 3 },
]

const sampleRooms = [
  { id: 1, name: "Room 101", building: "Main Building", floor: 1, capacity: 30 },
  { id: 2, name: "Room 102", building: "Main Building", floor: 1, capacity: 30 },
  { id: 3, name: "Room 201", building: "Main Building", floor: 2, capacity: 35 },
  { id: 4, name: "Lab 101", building: "Science Building", floor: 1, capacity: 25 },
  { id: 5, name: "Lab 102", building: "Science Building", floor: 1, capacity: 25 },
  { id: 6, name: "Computer Lab", building: "Technology Building", floor: 1, capacity: 30 },
]

const weekdays = [
  { id: 1, name: "Monday", short: "Mon" },
  { id: 2, name: "Tuesday", short: "Tue" },
  { id: 3, name: "Wednesday", short: "Wed" },
  { id: 4, name: "Thursday", short: "Thu" },
  { id: 5, name: "Friday", short: "Fri" },
  { id: 6, name: "Saturday", short: "Sat" },
  { id: 7, name: "Sunday", short: "Sun" },
]

const timeSlots = [
  { id: 1, start: "08:00", end: "08:45", label: "1st Period (08:00 - 08:45)" },
  { id: 2, start: "08:50", end: "09:35", label: "2nd Period (08:50 - 09:35)" },
  { id: 3, start: "09:40", end: "10:25", label: "3rd Period (09:40 - 10:25)" },
  { id: 4, start: "10:30", end: "11:15", label: "4th Period (10:30 - 11:15)" },
  { id: 5, start: "11:20", end: "12:05", label: "5th Period (11:20 - 12:05)" },
  { id: 6, start: "12:05", end: "12:50", label: "Lunch Break (12:05 - 12:50)" },
  { id: 7, start: "12:50", end: "13:35", label: "6th Period (12:50 - 13:35)" },
  { id: 8, start: "13:40", end: "14:25", label: "7th Period (13:40 - 14:25)" },
  { id: 9, start: "14:30", end: "15:15", label: "8th Period (14:30 - 15:15)" },
]

const sessions = [
  { id: 1, name: "2023-2024 Academic Year" },
  { id: 2, name: "2024-2025 Academic Year" },
  { id: 3, name: "Summer 2023" },
  { id: 4, name: "Winter 2023" },
]

// Color options for routine visualization
const colorOptions = [
  { id: 1, name: "Blue", value: "#2196f3", textColor: "#ffffff" },
  { id: 2, name: "Green", value: "#4caf50", textColor: "#ffffff" },
  { id: 3, name: "Purple", value: "#9c27b0", textColor: "#ffffff" },
  { id: 4, name: "Orange", value: "#ff9800", textColor: "#000000" },
  { id: 5, name: "Red", value: "#f44336", textColor: "#ffffff" },
  { id: 6, name: "Teal", value: "#009688", textColor: "#ffffff" },
  { id: 7, name: "Pink", value: "#e91e63", textColor: "#ffffff" },
  { id: 8, name: "Amber", value: "#ffc107", textColor: "#000000" },
  { id: 9, name: "Cyan", value: "#00bcd4", textColor: "#000000" },
  { id: 10, name: "Lime", value: "#cddc39", textColor: "#000000" },
]

// Transition component for dialogs
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ClassRoutineNew() {
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  

  // State for form data
  const [formData, setFormData] = useState({
    class: null as any,
    subject: null as any,
    teacher: null as any,
    room: null as any,
    days: [] as number[],
    timeSlot: null as any,
    session: null as any,
    startDate: "",
    endDate: "",
    color: colorOptions[0],
    notes: "",
    isRecurring: true,
    isActive: true,
  })

  // State for UI
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  })
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [conflictWarning, setConflictWarning] = useState<string | null>(null)

  // Handle form input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      })
    }

    // Check for potential conflicts when changing critical fields
    if (["class", "teacher", "days", "timeSlot"].includes(field)) {
      checkForConflicts()
    }
  }

  // Check for potential scheduling conflicts
  const checkForConflicts = () => {
    // This would be an API call in a real application
    // For demo purposes, we'll simulate a conflict check
    if (
      formData.class &&
      formData.teacher &&
      formData.days.length > 0 &&
      formData.timeSlot &&
      Math.random() > 0.7
    ) {
      setConflictWarning(
        "Potential conflict detected: This teacher or class may already have a routine scheduled during this time slot.",
      )
    } else {
      setConflictWarning(null)
    }
  }

  // Validate form before submission
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.class) newErrors.class = "Class is "
    if (!formData.subject) newErrors.subject = "Subject is "
    if (!formData.teacher) newErrors.teacher = "Teacher is "
    if (!formData.room) newErrors.room = "Room is "
    if (formData.days.length === 0) newErrors.days = "At least one day must be selected"
    if (!formData.timeSlot) newErrors.timeSlot = "Time slot is "
    if (!formData.session) newErrors.session = "Session is "
    if (!formData.startDate) newErrors.startDate = "Start date is "
    if (!formData.endDate) newErrors.endDate = "End date is "
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = "End date must be after start date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Please fix the errors in the form",
        severity: "error",
      })
      return
    }

    if (conflictWarning) {
      setConfirmDialogOpen(true)
      return
    }

    submitRoutine()
  }

  // Submit the routine data
  const submitRoutine = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSnackbar({
        open: true,
        message: "Class routine created successfully!",
        severity: "success",
      })

      // In a real app, you would navigate to the list page after successful creation
      // router.push('/class-routines')
    }, 1500)
  }

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  // Reset form
  const handleReset = () => {
    setFormData({
      class: null,
      subject: null,
      teacher: null,
      room: null,
      days: [],
      timeSlot: null,
      session: null,
      startDate: "",
      endDate: "",
      color: colorOptions[0],
      notes: "",
      isRecurring: true,
      isActive: true,
    })
    setErrors({})
    setConflictWarning(null)
  }

  // Toggle day selection
  const toggleDay = (dayId: number) => {
    const newDays = formData.days.includes(dayId)
      ? formData.days.filter((id) => id !== dayId)
      : [...formData.days, dayId]
    handleInputChange("days", newDays)
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          background: "linear-gradient(to right bottom, #ffffff, #f9f9ff)",
          boxShadow: "0 8px 32px rgba(77, 101, 217, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(25,118,210,0.08) 0%, rgba(25,118,210,0) 70%)",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 4, justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link href="/class-routines" passHref>
                <IconButton
                  color="primary"
                  sx={{
                    mr: 2,
                    bgcolor: "rgba(25,118,210,0.1)",
                    "&:hover": {
                      bgcolor: "rgba(25,118,210,0.2)",
                    },
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                color="primary"
                sx={{
                  background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Create New Class Routine
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleReset}
                sx={{ borderRadius: 2 }}
                disabled={loading}
              >
                Reset
              </Button>
              <Button
                variant="outlined"
                startIcon={<VisibilityIcon />}
                onClick={() => setPreviewDialogOpen(true)}
                sx={{ borderRadius: 2 }}
                disabled={loading || !formData.class || !formData.subject || !formData.timeSlot}
              >
                Preview
              </Button>
            </Box>
          </Box>

          {/* Tabs */}
          <Box sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{
                "& .MuiTab-root": {
                  minWidth: { xs: "auto", md: 160 },
                  fontWeight: "medium",
                },
              }}
            >
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <InfoIcon sx={{ mr: 1 }} />
                    Basic Information
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ScheduleIcon sx={{ mr: 1 }} />
                    Schedule Details
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ColorLensIcon sx={{ mr: 1 }} />
                    Appearance & Notes
                  </Box>
                }
              />
            </Tabs>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Basic Information Tab */}
            <Box sx={{ display: selectedTab === 0 ? "block" : "none" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      height: "100%",
                      bgcolor: "rgba(25,118,210,0.03)",
                      border: "1px solid rgba(25,118,210,0.2)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                        Class & Subject Information
                      </Typography>

                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <FormControl fullWidth error={!!errors.class}>
                            <Autocomplete
                              id="class-select"
                              options={sampleClasses}
                              getOptionLabel={(option) => option.name}
                              value={formData.class}
                              onChange={(_, newValue) => handleInputChange("class", newValue)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Class"
                                  error={!!errors.class}
                                  helperText={errors.class}
                                  
                                  InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                      <>
                                        <ClassIcon color="primary" sx={{ mr: 1 }} />
                                        {params.InputProps.startAdornment}
                                      </>
                                    ),
                                  }}
                                />
                              )}
                              renderOption={(props, option) => (
                                <li {...props}>
                                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Typography variant="body1">{option.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {option.students} students • {option.schedule}
                                    </Typography>
                                  </Box>
                                </li>
                              )}
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl fullWidth error={!!errors.subject}>
                            <Autocomplete
                              id="subject-select"
                              options={sampleSubjects}
                              getOptionLabel={(option) => `${option.name} (${option.code})`}
                              value={formData.subject}
                              onChange={(_, newValue) => handleInputChange("subject", newValue)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Subject"
                                  error={!!errors.subject}
                                  helperText={errors.subject}
                                  
                                  InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                      <>
                                        <BookIcon color="primary" sx={{ mr: 1 }} />
                                        {params.InputProps.startAdornment}
                                      </>
                                    ),
                                  }}
                                />
                              )}
                              renderOption={(props, option) => (
                                <li {...props}>
                                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Typography variant="body1">
                                      {option.name} <Typography component="span" color="text.secondary" variant="body2">({option.code})</Typography>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {option.department} • {option.credits} credits
                                    </Typography>
                                  </Box>
                                </li>
                              )}
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl fullWidth error={!!errors.session}>
                            <Autocomplete
                              id="session-select"
                              options={sessions}
                              getOptionLabel={(option) => option.name}
                              value={formData.session}
                              onChange={(_, newValue) => handleInputChange("session", newValue)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Academic Session"
                                  error={!!errors.session}
                                  helperText={errors.session}
                                  
                                  InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                      <>
                                        <CalendarMonthIcon color="primary" sx={{ mr: 1 }} />
                                        {params.InputProps.startAdornment}
                                      </>
                                    ),
                                  }}
                                />
                              )}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      height: "100%",
                      bgcolor: "rgba(156,39,176,0.03)",
                      border: "1px solid rgba(156,39,176,0.2)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom color="secondary">
                        Teacher & Room Information
                      </Typography>

                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <FormControl fullWidth error={!!errors.teacher}>
                            <Autocomplete
                              id="teacher-select"
                              options={sampleTeachers}
                              getOptionLabel={(option) => option.name}
                              value={formData.teacher}
                              onChange={(_, newValue) => handleInputChange("teacher", newValue)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Teacher"
                                  error={!!errors.teacher}
                                  helperText={errors.teacher}
                                  
                                  InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                      <>
                                        <PersonIcon color="secondary" sx={{ mr: 1 }} />
                                        {params.InputProps.startAdornment}
                                      </>
                                    ),
                                  }}
                                />
                              )}
                              renderOption={(props, option) => (
                                <li {...props}>
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Avatar src={option.avatar} sx={{ width: 32, height: 32, mr: 1 }}>
                                      {option.name.charAt(0)}
                                    </Avatar>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                      <Typography variant="body1">{option.name}</Typography>
                                      <Typography variant="body2" color="text.secondary">
                                        {option.department}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </li>
                              )}
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl fullWidth error={!!errors.room}>
                            <Autocomplete
                              id="room-select"
                              options={sampleRooms}
                              getOptionLabel={(option) => option.name}
                              value={formData.room}
                              onChange={(_, newValue) => handleInputChange("room", newValue)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Room"
                                  error={!!errors.room}
                                  helperText={errors.room}
                                  
                                  InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                      <>
                                        <SchoolIcon color="secondary" sx={{ mr: 1 }} />
                                        {params.InputProps.startAdornment}
                                      </>
                                    ),
                                  }}
                                />
                              )}
                              renderOption={(props, option) => (
                                <li {...props}>
                                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Typography variant="body1">{option.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {option.building} • Floor {option.floor} • Capacity: {option.capacity}
                                    </Typography>
                                  </Box>
                                </li>
                              )}
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={formData.isActive}
                                onChange={(e) => handleInputChange("isActive", e.target.checked)}
                                color="success"
                              />
                            }
                            label="Active"
                          />
                          <FormHelperText>
                            Inactive routines will not appear on schedules but will be saved for future use
                          </FormHelperText>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* Schedule Details Tab */}
            <Box sx={{ display: selectedTab === 1 ? "block" : "none" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      height: "100%",
                      bgcolor: "rgba(46,125,50,0.03)",
                      border: "1px solid rgba(46,125,50,0.2)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom color="success.dark">
                        Days & Time
                      </Typography>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Select Days
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            mt: 1,
                          }}
                        >
                          {weekdays.map((day) => (
                            <Chip
                              key={day.id}
                              label={isMobile ? day.short : day.name}
                              onClick={() => toggleDay(day.id)}
                              color={formData.days.includes(day.id) ? "primary" : "default"}
                              variant={formData.days.includes(day.id) ? "filled" : "outlined"}
                              sx={{
                                borderRadius: 2,
                                transition: "all 0.2s ease",
                                fontWeight: formData.days.includes(day.id) ? "bold" : "normal",
                              }}
                            />
                          ))}
                        </Box>
                        {errors.days && (
                          <FormHelperText error>{errors.days}</FormHelperText>
                        )}
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <FormControl fullWidth error={!!errors.timeSlot}>
                          <Autocomplete
                            id="time-slot-select"
                            options={timeSlots}
                            getOptionLabel={(option) => option.label}
                            value={formData.timeSlot}
                            onChange={(_, newValue) => handleInputChange("timeSlot", newValue)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Time Slot"
                                error={!!errors.timeSlot}
                                helperText={errors.timeSlot}
                                
                                InputProps={{
                                  ...params.InputProps,
                                  startAdornment: (
                                    <>
                                      <AccessTimeIcon color="success" sx={{ mr: 1 }} />
                                      {params.InputProps.startAdornment}
                                    </>
                                  ),
                                }}
                              />
                            )}
                            renderOption={(props, option) => (
                              <li {...props}>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                  <Typography variant="body1">{option.label}</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Duration: 45 minutes
                                  </Typography>
                                </Box>
                              </li>
                            )}
                          />
                        </FormControl>
                      </Box>

                      <Box>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={formData.isRecurring}
                              onChange={(e) => handleInputChange("isRecurring", e.target.checked)}
                              color="success"
                            />
                          }
                          label="Recurring Schedule"
                        />
                        <FormHelperText>
                          This class will repeat on the selected days throughout the date range
                        </FormHelperText>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      height: "100%",
                      bgcolor: "rgba(211,47,47,0.03)",
                      border: "1px solid rgba(211,47,47,0.2)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom color="error.main">
                        Date Range
                      </Typography>

                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Start Date"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => handleInputChange("startDate", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.startDate}
                            helperText={errors.startDate}
                            
                            InputProps={{
                              startAdornment: (
                                <EventIcon color="error" sx={{ mr: 1 }} />
                              ),
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="End Date"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => handleInputChange("endDate", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.endDate}
                            helperText={errors.endDate}
                            
                            InputProps={{
                              startAdornment: (
                                <EventIcon color="error" sx={{ mr: 1 }} />
                              ),
                            }}
                          />
                        </Grid>

                        {conflictWarning && (
                          <Grid item xs={12}>
                            <Alert severity="warning" sx={{ borderRadius: 2 }}>
                              <Typography variant="subtitle2">{conflictWarning}</Typography>
                            </Alert>
                          </Grid>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* Appearance & Notes Tab */}
            <Box sx={{ display: selectedTab === 2 ? "block" : "none" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      height: "100%",
                      bgcolor: "rgba(25,118,210,0.03)",
                      border: "1px solid rgba(25,118,210,0.2)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                        Appearance
                      </Typography>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Select Color
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            mt: 1,
                          }}
                        >
                          {colorOptions.map((color) => (
                            <Tooltip key={color.id} title={color.name}>
                              <Box
                                onClick={() => handleInputChange("color", color)}
                                sx={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: "50%",
                                  bgcolor: color.value,
                                  cursor: "pointer",
                                  border: formData.color.id === color.id ? "3px solid #000" : "3px solid transparent",
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    transform: "scale(1.1)",
                                  },
                                }}
                              />
                            </Tooltip>
                          ))}
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          This color will be used to identify this class in the schedule view
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Preview
                        </Typography>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: formData.color.value,
                            color: formData.color.textColor,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            {formData.subject ? formData.subject.name : "Subject Name"}
                          </Typography>
                          <Typography variant="body2">
                            {formData.class ? formData.class.name : "Class"} • {formData.room ? formData.room.name : "Room"}
                          </Typography>
                          <Typography variant="body2">
                            {formData.teacher ? formData.teacher.name : "Teacher"}
                          </Typography>
                          <Typography variant="caption">
                            {formData.timeSlot ? `${formData.timeSlot.start} - ${formData.timeSlot.end}` : "Time"}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      height: "100%",
                      bgcolor: "rgba(156,39,176,0.03)",
                      border: "1px solid rgba(156,39,176,0.2)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom color="secondary">
                        Additional Notes
                      </Typography>

                      <TextField
                        fullWidth
                        multiline
                        rows={10}
                        label="Notes"
                        placeholder="Add any additional information about this class routine..."
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        sx={{ mb: 2 }}
                      />

                      <Typography variant="body2" color="text.secondary">
                        These notes will be visible to administrators and teachers but not to students
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* Submit Button */}
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                disabled={loading}
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 3,
                  boxShadow: "0 8px 20px rgba(25,118,210,0.3)",
                  background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                  "&:hover": {
                    boxShadow: "0 12px 28px rgba(25,118,210,0.4)",
                    background: "linear-gradient(45deg, #1565c0, #1976d2)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? "Creating..." : "Create Class Routine"}
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle>Confirm Routine Creation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {conflictWarning}
            <br /><br />
            Do you want to proceed anyway?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setConfirmDialogOpen(false)
              submitRoutine()
            }}
            color="error"
            variant="contained"
          >
            Create Anyway
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog
        open={previewDialogOpen}
        onClose={() => setPreviewDialogOpen(false)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Routine Preview</Typography>
            <IconButton onClick={() => setPreviewDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: formData.color.value,
                      color: formData.color.textColor,
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold">
                      {formData.subject ? formData.subject.name : "Subject"}
                    </Typography>
                    <Typography variant="subtitle1">
                      {formData.subject ? formData.subject.code : "Code"}
                    </Typography>
                  </Box>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <ClassIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="body1" fontWeight="medium">
                            {formData.class ? formData.class.name : "Class"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <PersonIcon color="secondary" sx={{ mr: 1 }} />
                          <Typography variant="body1">
                            {formData.teacher ? formData.teacher.name : "Teacher"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <SchoolIcon color="success" sx={{ mr: 1 }} />
                          <Typography variant="body1">
                            {formData.room ? formData.room.name : "Room"}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <AccessTimeIcon color="error" sx={{ mr: 1 }} />
                          <Typography variant="body1">
                            {formData.timeSlot ? `${formData.timeSlot.start} - ${formData.timeSlot.end}` : "Time"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <CalendarMonthIcon color="info" sx={{ mr: 1 }} />
                          <Typography variant="body1">
                            {formData.days.length > 0
                              ? formData.days.map(id => weekdays.find(day => day.id === id)?.name).join(", ")
                              : "Days"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <EventIcon color="warning" sx={{ mr: 1 }} />
                          <Typography variant="body1">
                            {formData.startDate && formData.endDate
                              ? `${formData.startDate} to ${formData.endDate}`
                              : "Date Range"}
                          </Typography>
                        </Box>
                      </Grid>
                      {formData.notes && (
                        <Grid item xs={12}>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant="subtitle1" fontWeight="medium">
                            Notes:
                          </Typography>
                          <Typography variant="body2">{formData.notes}</Typography>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}
