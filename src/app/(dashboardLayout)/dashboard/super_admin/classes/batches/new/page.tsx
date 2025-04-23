/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  FormControl,
  
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  Avatar,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  Backdrop,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material"
import {
  Save as SaveIcon,
  Clear as ClearIcon,
  ArrowBack as ArrowBackIcon,
  School as SchoolIcon,
  CalendarMonth as CalendarMonthIcon,
  Group as GroupIcon,
  Class as ClassIcon,
  LocationOn as LocationOnIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Help as HelpIcon,
  Add as AddIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for dropdowns
const CLASSES = [
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
  { id: 11, name: "Class 11" },
  { id: 12, name: "Class 12" },
]

const SECTIONS = [
  { id: 1, name: "Section A" },
  { id: 2, name: "Section B" },
  { id: 3, name: "Section C" },
  { id: 4, name: "Section D" },
]

const BRANCHES = [
  { id: 1, name: "Main Campus" },
  { id: 2, name: "North Campus" },
  { id: 3, name: "South Campus" },
  { id: 4, name: "East Campus" },
]

const SUBJECTS = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "Science" },
  { id: 3, name: "English" },
  { id: 4, name: "History" },
  { id: 5, name: "Geography" },
  { id: 6, name: "Computer Science" },
  { id: 7, name: "Physics" },
  { id: 8, name: "Chemistry" },
  { id: 9, name: "Biology" },
  { id: 10, name: "Art" },
]

const TEACHERS = [
  { id: 1, name: "Dr. Johnson", avatar: "J", subject: "Mathematics" },
  { id: 2, name: "Ms. Davis", avatar: "D", subject: "Biology" },
  { id: 3, name: "Mrs. Williams", avatar: "W", subject: "Chemistry" },
  { id: 4, name: "Prof. Brown", avatar: "B", subject: "Computer Science" },
  { id: 5, name: "Dr. Miller", avatar: "M", subject: "Physics" },
  { id: 6, name: "Ms. Taylor", avatar: "T", subject: "English" },
  { id: 7, name: "Mr. Anderson", avatar: "A", subject: "History" },
]

export default function NewBatchPage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    batchId: "",
    name: "",
    classId: "",
    section: "",
    branch: "",
    subject: "",
    teacher: "",
    startDate: "",
    endDate: "",
    capacity: "",
    description: "",
    isActive: true,
    schedule: [
      { day: "Monday", startTime: "", endTime: "" },
      { day: "Wednesday", startTime: "", endTime: "" },
      { day: "Friday", startTime: "", endTime: "" },
    ],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target as { name?: string; value: unknown };
    if (!name) return;
  
    setFormData({
      ...formData,
      [name]: value,
    });
  
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      isActive: e.target.checked,
    })
  }

  const handleScheduleChange = (index: number, field: string, value: string) => {
    const newSchedule = [...formData.schedule]
    newSchedule[index] = { ...newSchedule[index], [field]: value }

    setFormData({
      ...formData,
      schedule: newSchedule,
    })
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 0) {
      if (!formData.name) newErrors.name = "Batch name is required"
      if (!formData.batchId) newErrors.batchId = "Batch ID is required"
      if (!formData.subject) newErrors.subject = "Subject is required"
    } else if (step === 1) {
      if (!formData.classId) newErrors.classId = "Class is required"
      if (!formData.section) newErrors.section = "Section is required"
      if (!formData.branch) newErrors.branch = "Branch is required"
    } else if (step === 2) {
      if (!formData.teacher) newErrors.teacher = "Teacher is required"
      if (!formData.startDate) newErrors.startDate = "Start date is required"
      if (!formData.capacity) newErrors.capacity = "Capacity is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateStep(activeStep)) {
      setSubmitting(true)

      // Simulate API call
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Show success message
        setSuccess(true)
        setSnackbar({
          open: true,
          message: "Batch created successfully!",
          severity: "success",
        })

        // Redirect to batch list after a short delay
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } catch (error:any) {
        setSnackbar({
          open: true,
          message: "Error creating batch. Please try again.",
          severity: "error",
        })
      } finally {
        setSubmitting(false)
      }
    } else {
      setSnackbar({
        open: true,
        message: "Please fix the errors in the form",
        severity: "error",
      })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }

  const handleReset = () => {
    setFormData({
      batchId: "",
      name: "",
      classId: "",
      section: "",
      branch: "",
      subject: "",
      teacher: "",
      startDate: "",
      endDate: "",
      capacity: "",
      description: "",
      isActive: true,
      schedule: [
        { day: "Monday", startTime: "", endTime: "" },
        { day: "Wednesday", startTime: "", endTime: "" },
        { day: "Friday", startTime: "", endTime: "" },
      ],
    })
    setErrors({})
    setActiveStep(0)
  }

  const steps = [
    {
      label: "Basic Information",
      description: "Enter the basic details of the batch",
      icon: <SchoolIcon />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="name"
              name="name"
              label="Batch Name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name || "Enter a descriptive name for this batch"}
              variant="outlined"
              placeholder="e.g., Advanced Mathematics 2025"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ClassIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="batchId"
              name="batchId"
              label="Batch ID"
              value={formData.batchId}
              onChange={handleChange}
              error={!!errors.batchId}
              helperText={errors.batchId || "Enter a unique identifier for this batch"}
              variant="outlined"
              placeholder="e.g., BATCH-2025-01"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Chip
                      label="ID"
                      size="small"
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        height: 24,
                        fontSize: "0.75rem",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required error={!!errors.subject}>
              <InputLabel id="subject-label">Subject</InputLabel>
              <Select
                labelId="subject-label"
                id="subject"
                name="subject"
                value={formData.subject}
                label="Subject"
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <SchoolIcon color="action" />
                  </InputAdornment>
                }
              >
                {SUBJECTS.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.subject || "Select the subject for this batch"}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              helperText="Additional details about this batch (Optional)"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                    <DescriptionIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Class & Location",
      description: "Assign class, section and branch",
      icon: <LocationOnIcon />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth required error={!!errors.classId}>
              <InputLabel id="class-label">Class</InputLabel>
              <Select
                labelId="class-label"
                id="classId"
                name="classId"
                value={formData.classId}
                label="Class"
                onChange={handleChange}
              >
                {CLASSES.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.classId || "Select the class for this batch"}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth required error={!!errors.section}>
              <InputLabel id="section-label">Section</InputLabel>
              <Select
                labelId="section-label"
                id="section"
                name="section"
                value={formData.section}
                label="Section"
                onChange={handleChange}
              >
                {SECTIONS.map((section) => (
                  <MenuItem key={section.id} value={section.id}>
                    {section.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.section || "Select the section for this batch"}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth required error={!!errors.branch}>
              <InputLabel id="branch-label">Branch</InputLabel>
              <Select
                labelId="branch-label"
                id="branch"
                name="branch"
                value={formData.branch}
                label="Branch"
                onChange={handleChange}
              >
                {BRANCHES.map((branch) => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.branch || "Select the branch for this batch"}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "rgba(106, 27, 154, 0.05)",
                borderRadius: 2,
                border: "1px dashed rgba(106, 27, 154, 0.3)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <HelpIcon color="primary" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" color="primary.main">
                    Class & Section Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    The class and section determine which students will be eligible to join this batch. Make sure to
                    select the correct branch where this batch will be conducted.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Schedule & Capacity",
      description: "Set timing and student capacity",
      icon: <CalendarMonthIcon />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required error={!!errors.teacher}>
              <InputLabel id="teacher-label">Teacher</InputLabel>
              <Select
                labelId="teacher-label"
                id="teacher"
                name="teacher"
                value={formData.teacher}
                label="Teacher"
                onChange={handleChange}
                renderValue={(selected) => {
                  const teacher = TEACHERS.find((t) => t.id === Number(selected))
                  if (!teacher) return ""

                  return (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          bgcolor: "primary.main",
                          fontSize: "0.75rem",
                        }}
                      >
                        {teacher.avatar}
                      </Avatar>
                      <Typography>{teacher.name}</Typography>
                    </Box>
                  )
                }}
              >
                {TEACHERS.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          bgcolor: "primary.main",
                          fontSize: "0.75rem",
                        }}
                      >
                        {teacher.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2">{teacher.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {teacher.subject}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.teacher || "Assign a teacher to this batch"}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="capacity"
              name="capacity"
              label="Capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              error={!!errors.capacity}
              helperText={errors.capacity || "Maximum number of students"}
              InputProps={{
                inputProps: { min: 1 },
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="startDate"
              name="startDate"
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              error={!!errors.startDate}
              helperText={errors.startDate || "When does this batch start?"}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="endDate"
              name="endDate"
              label="End Date"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              helperText="When does this batch end? (Optional)"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              Weekly Schedule
            </Typography>

            {formData.schedule.map((scheduleItem, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                  flexDirection: { xs: "column", sm: "row" },
                  width: "100%",
                }}
              >
                <Chip
                  label={scheduleItem.day}
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    minWidth: 100,
                  }}
                  icon={<AccessTimeIcon sx={{ color: "white !important" }} />}
                />

                <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                  <TextField
                    fullWidth
                    label="Start Time"
                    type="time"
                    value={scheduleItem.startTime}
                    onChange={(e) => handleScheduleChange(index, "startTime", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="End Time"
                    type="time"
                    value={scheduleItem.endTime}
                    onChange={(e) => handleScheduleChange(index, "endTime", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              </Box>
            ))}

            <Button
              startIcon={<AddIcon />}
              sx={{ mt: 1 }}
              onClick={() => {
                setFormData({
                  ...formData,
                  schedule: [...formData.schedule, { day: "Tuesday", startTime: "", endTime: "" }],
                })
              }}
            >
              Add Another Day
            </Button>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Review & Submit",
      description: "Review and submit batch details",
      icon: <CheckCircleIcon />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Review Batch Details
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Basic Information
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Batch Name
                    </Typography>
                    <Typography variant="body1">
                      {formData.name || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Batch ID
                    </Typography>
                    <Typography variant="body1">
                      {formData.batchId || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Subject
                    </Typography>
                    <Typography variant="body1">
                      {formData.subject ? (
                        SUBJECTS.find((s) => s.id === Number(formData.subject))?.name
                      ) : (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Class & Location
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Class
                    </Typography>
                    <Typography variant="body1">
                      {formData.classId ? (
                        CLASSES.find((c) => c.id === Number(formData.classId))?.name
                      ) : (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Section
                    </Typography>
                    <Typography variant="body1">
                      {formData.section ? (
                        SECTIONS.find((s) => s.id === Number(formData.section))?.name
                      ) : (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Branch
                    </Typography>
                    <Typography variant="body1">
                      {formData.branch ? (
                        BRANCHES.find((b) => b.id === Number(formData.branch))?.name
                      ) : (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Schedule & Capacity
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Teacher
                    </Typography>
                    <Typography variant="body1">
                      {formData.teacher ? (
                        TEACHERS.find((t) => t.id === Number(formData.teacher))?.name
                      ) : (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not selected
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Capacity
                    </Typography>
                    <Typography variant="body1">
                      {formData.capacity || (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Duration
                    </Typography>
                    <Typography variant="body1">
                      {formData.startDate ? (
                        <>
                          {new Date(formData.startDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                          {formData.endDate && (
                            <>
                              {" to "}
                              {new Date(formData.endDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </>
                          )}
                        </>
                      ) : (
                        <Typography variant="body2" color="text.disabled" component="span">
                          Not provided
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Weekly Schedule
                  </Typography>

                  {formData.schedule.length > 0 ? (
                    <Box sx={{ mt: 2 }}>
                      {formData.schedule.map((item, index) => (
                        <Box key={index} sx={{ display: "flex", mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 100 }}>
                            {item.day}:
                          </Typography>
                          <Typography variant="body2">
                            {item.startTime && item.endTime ? (
                              `${item.startTime} - ${item.endTime}`
                            ) : (
                              <Typography variant="body2" color="text.disabled" component="span">
                                Time not set
                              </Typography>
                            )}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.disabled">
                      No schedule defined
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ mt: 4 }}>
              <FormControlLabel
                control={
                  <Switch checked={formData.isActive} onChange={handleSwitchChange} name="isActive" color="primary" />
                }
                label="Activate batch immediately after creation"
              />
              <FormHelperText>Inactive batches won't appear in active enrollments</FormHelperText>
            </Box>
          </Grid>
        </Grid>
      ),
    },
  ]

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f9f9f9, #f0f0f0)",
        pt: 2,
        pb: 8,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)",
          color: "white",
          py: 3,
          mb: 4,
          borderRadius: { xs: 0, md: "0 0 20px 20px" },
          boxShadow: "0 4px 20px rgba(106, 27, 154, 0.4)",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <SchoolIcon sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              Create New Batch
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 700 }}>
            Create a new batch by filling in the required information. Follow the steps to complete the process.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Box sx={{ mb: 3 }}>
          <Link href="/" passHref>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              sx={{
                borderRadius: 100,
                borderColor: "rgba(0,0,0,0.12)",
                color: "text.secondary",
                px: 3,
              }}
            >
              Back to Batch List
            </Button>
          </Link>
        </Box>

        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            mb: 4,
          }}
        >
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    StepIconProps={{
                      icon: step.icon,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {step.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ mt: 2, mb: 1 }}>{step.content}</Box>
                    <Box sx={{ mb: 2, mt: 4, display: "flex", gap: 2 }}>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{
                          borderRadius: 100,
                          px: 3,
                        }}
                      >
                        Back
                      </Button>
                      {index === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          onClick={handleSubmit}
                          startIcon={<SaveIcon />}
                          sx={{
                            borderRadius: 100,
                            background: "linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)",
                            boxShadow: "0 4px 10px rgba(106, 27, 154, 0.3)",
                            px: 3,
                          }}
                        >
                          Create Batch
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{
                            borderRadius: 100,
                            background: "linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)",
                            boxShadow: "0 4px 10px rgba(106, 27, 154, 0.3)",
                            px: 3,
                          }}
                        >
                          Continue
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        onClick={handleReset}
                        startIcon={<ClearIcon />}
                        sx={{
                          borderRadius: 100,
                          borderColor: "rgba(0,0,0,0.12)",
                          color: "text.secondary",
                          px: 3,
                          ml: "auto",
                        }}
                      >
                        Reset
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Paper>

        {/* Help Card */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 4,
            background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <HelpIcon sx={{ color: "#2e7d32", mt: 0.5 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ color: "#2e7d32", fontWeight: 600 }}>
              Need Help?
            </Typography>
            <Typography variant="body2" sx={{ color: "#1b5e20" }}>
              Creating a batch is the first step in organizing your classes. After creating a batch, you can enroll
              students, assign teachers, create schedules, and track academic progress. Make sure to fill in all
              required fields for optimal results.
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Success Backdrop */}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={success}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            p: 4,
            borderRadius: 4,
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "#e8f5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 50, color: "#2e7d32" }} />
          </Box>
          <Typography variant="h5" sx={{ color: "#2e7d32", fontWeight: 600, mb: 1 }}>
            Success!
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
            Your batch has been created successfully. Redirecting to batch list...
          </Typography>
          <CircularProgress size={24} sx={{ color: "primary.main" }} />
        </Box>
      </Backdrop>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
