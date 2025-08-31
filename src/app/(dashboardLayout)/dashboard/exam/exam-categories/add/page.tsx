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
  IconButton,
  Avatar,
  Divider,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Tooltip,
  useTheme,
  Chip,
  Switch,
  FormControlLabel,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

  MenuItem,

  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControl,
  InputLabel,
  Select,
  Slider,
  Autocomplete,
  Collapse,
  Breadcrumbs,
  Link as MuiLink,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material"
import {
  Add as AddIcon,
  Save as SaveIcon,

  Info as InfoIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Preview as PreviewIcon,
  Tune as TuneIcon,
  BarChart as BarChartIcon,
  Check as CheckIcon,
  Edit as EditIcon,
  ContentCopy as ContentCopyIcon,
  Category as CategoryIcon,
  Assignment as AssignmentIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Timer as TimerIcon,
  CalendarToday as CalendarTodayIcon,
  Description as DescriptionIcon,
  Percent as PercentIcon,
  Visibility as VisibilityIcon,
  Home as HomeIcon,
  Cancel as CancelIcon,
  QuestionAnswer as QuestionAnswerIcon,
  FormatListNumbered as FormatListNumberedIcon,
  FormatListBulleted,
  CheckBox as CheckBoxIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  ShortText as ShortTextIcon,
  Subject as SubjectIcon,
  Science as ScienceIcon,
  Calculate as CalculateIcon,
  Language as LanguageIcon,
  SportsBasketball as SportsBasketballIcon,
  LocalLibrary as LocalLibraryIcon,
  Biotech as BiotechIcon,
  Architecture as ArchitectureIconIcon,
  Healing as HealingIcon,
  Gavel as GavelIcon,
  Engineering as EngineeringIcon,
  Construction as ConstructionIcon,
  Computer as ComputerIcon,
  Close as CloseIcon,
  MusicNote,
  Recycling,
} from "@mui/icons-material"
import Link from "next/link"

// Define types
interface ExamCategory {
  id: string
  name: string
  isMainExam: boolean
  totalMarks: number
  passMarks: number
  weight: number
  description?: string
  icon?: string
  color?: string
  subjectCount?: number
  questionCount?: number
  duration?: number
  difficultyLevel?: "easy" | "medium" | "hard" | "mixed"
  gradingSystem?: string
  examFormat?: string[]
  tags?: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
  status: "active" | "inactive" | "draft"
}

// Define exam category templates
const examCategoryTemplates = [
  {
    name: "Midterm Examination",
    isMainExam: false,
    totalMarks: 50,
    passMarks: 20,
    weight: 30,
    description: "Standard midterm examination for all subjects",
    icon: "AssignmentIcon",
    color: "#3f51b5",
    difficultyLevel: "medium",
    examFormat: ["Multiple Choice", "Short Answer"],
    duration: 90,
  },
  {
    name: "Final Examination",
    isMainExam: true,
    totalMarks: 100,
    passMarks: 40,
    weight: 50,
    description: "Comprehensive final examination covering all course material",
    icon: "AssignmentTurnedInIcon",
    color: "#f44336",
    difficultyLevel: "hard",
    examFormat: ["Multiple Choice", "Short Answer", "Essay", "Problem Solving"],
    duration: 180,
  },
  {
    name: "Quiz",
    isMainExam: false,
    totalMarks: 20,
    passMarks: 8,
    weight: 10,
    description: "Short quiz to assess understanding of specific topics",
    icon: "QuestionAnswerIcon",
    color: "#4caf50",
    difficultyLevel: "easy",
    examFormat: ["Multiple Choice", "True/False"],
    duration: 30,
  },
  {
    name: "Practical Assessment",
    isMainExam: false,
    totalMarks: 50,
    passMarks: 25,
    weight: 30,
    description: "Hands-on assessment of practical skills",
    icon: "ScienceIcon",
    color: "#ff9800",
    difficultyLevel: "medium",
    examFormat: ["Lab Work", "Demonstration", "Project"],
    duration: 120,
  },
  {
    name: "Oral Examination",
    isMainExam: false,
    totalMarks: 30,
    passMarks: 15,
    weight: 20,
    description: "Verbal assessment of knowledge and understanding",
    icon: "RecordVoiceOverIcon",
    color: "#9c27b0",
    difficultyLevel: "medium",
    examFormat: ["Viva Voce", "Presentation"],
    duration: 45,
  },
]

// Define subject areas for suggestions
const subjectAreas = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "History",
  "Geography",
  "Economics",
  "Business Studies",
  "Accounting",
  "Psychology",
  "Sociology",
  "Political Science",
  "Philosophy",
  "Art",
  "Music",
  "Physical Education",
  "Religious Studies",
  "Foreign Languages",
]

// Define exam formats
const examFormats = [
  "Multiple Choice",
  "True/False",
  "Short Answer",
  "Essay",
  "Problem Solving",
  "Practical",
  "Oral",
  "Project",
  "Portfolio",
  "Presentation",
  "Lab Work",
  "Field Work",
  "Case Study",
  "Simulation",
  "Role Play",
  "Demonstration",
  "Viva Voce",
  "Open Book",
  "Closed Book",
  "Take Home",
]

// Define difficulty levels with descriptions
const difficultyLevels = [
  {
    value: "easy",
    label: "Easy",
    description: "Basic recall and understanding of fundamental concepts",
    color: "#4caf50",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Application and analysis of concepts in various contexts",
    color: "#ff9800",
  },
  {
    value: "hard",
    label: "Hard",
    description: "Synthesis, evaluation, and creation of new ideas",
    color: "#f44336",
  },
  {
    value: "mixed",
    label: "Mixed",
    description: "Combination of different difficulty levels",
    color: "#9c27b0",
  },
]

// Define icons for exam categories
const categoryIcons: Record<string, React.ReactNode> = {
  AssignmentIcon: <AssignmentIcon />,
  AssignmentTurnedInIcon: <AssignmentTurnedInIcon />,
  QuestionAnswerIcon: <QuestionAnswerIcon />,
  TimerIcon: <TimerIcon />,
  CalendarTodayIcon: <CalendarTodayIcon />,
  DescriptionIcon: <DescriptionIcon />,
  FormatListNumberedIcon: <FormatListNumberedIcon />,
  FormatListBulletedIcon: <FormatListBulleted />,
  CheckBoxIcon: <CheckBoxIcon />,
  RadioButtonCheckedIcon: <RadioButtonCheckedIcon />,
  ShortTextIcon: <ShortTextIcon />,
  SubjectIcon: <SubjectIcon />,
  ScienceIcon: <ScienceIcon />,
  CalculateIcon: <CalculateIcon />,
  LanguageIcon: <LanguageIcon />,
  SportsBasketballIcon: <SportsBasketballIcon />,
  MusicNoteIcon: <MusicNote />,
  LocalLibraryIcon: <LocalLibraryIcon />,
  BiotechIcon: <BiotechIcon />,
  ArchitectureIcon: <ArchitectureIconIcon />,
  EcoIcon: <Recycling />,
  HealingIcon: <HealingIcon />,
  GavelIcon: <GavelIcon />,
  EngineeringIcon: <EngineeringIcon />,
  ConstructionIcon: <ConstructionIcon />,
  ComputerIcon: <ComputerIcon />,
}

export default function ExamCategoryPage() {
  const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  // const isTablet = useMediaQuery(theme.breakpoints.down("lg"))

  // State for drawer


  // State for active step in stepper
  const [activeStep, setActiveStep] = useState(0)

  // State for form data
  const [formData, setFormData] = useState<Partial<ExamCategory>>({
    name: "",
    isMainExam: false,
    totalMarks: 100,
    passMarks: 33,
    weight: 10,
    description: "",
    icon: "AssignmentIcon",
    color: "#3f51b5",
    difficultyLevel: "medium",
    examFormat: ["Multiple Choice", "Short Answer"],
    tags: [],
    duration: 60,
    status: "draft",
  })

  // State for loading
  const [saving, setSaving] = useState(false)

  // State for snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  })

  // State for template dialog
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false)

  // State for preview dialog
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)

  // State for discard dialog
  const [discardDialogOpen, setDiscardDialogOpen] = useState(false)



  // State for advanced options
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)



  // State for design mode
  const [designMode, setDesignMode] = useState<"basic" | "advanced">("basic")

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    })
  }

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  // Handle select change
  const handleSelectChange = (name: string, value: unknown) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Handle reset
  const handleReset = () => {
    setActiveStep(0)
    setFormData({
      name: "",
      isMainExam: false,
      totalMarks: 100,
      passMarks: 33,
      weight: 10,
      description: "",
      icon: "AssignmentIcon",
      color: "#3f51b5",
      difficultyLevel: "medium",
      examFormat: ["Multiple Choice", "Short Answer"],
      tags: [],
      duration: 60,
      status: "draft",
    })
  }

  // Handle save
  const handleSave = () => {
    setSaving(true)

    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      setSnackbar({
        open: true,
        message: "Exam category saved successfully!",
        severity: "success",
      })

      // Reset form after successful save
      handleReset()
    }, 1500)
  }

  // Handle template selection
  const handleTemplateSelect = (template: (typeof examCategoryTemplates)[0]) => {
    setFormData({
      ...formData,
      ...template,
      difficultyLevel: template.difficultyLevel as "easy" | "medium" | "hard" | "mixed",
    })
    setTemplateDialogOpen(false)
  }



  // Calculate pass percentage
  const passPercentage =
    formData.passMarks && formData.totalMarks ? (formData.passMarks / formData.totalMarks) * 100 : 0

  // Get difficulty level color
  const getDifficultyColor = (level?: string) => {
    if (!level) return "#9e9e9e"
    const difficultyLevel = difficultyLevels.find((d) => d.value === level)
    return difficultyLevel ? difficultyLevel.color : "#9e9e9e"
  }

  // Get difficulty level label
  const getDifficultyLabel = (level?: string) => {
    if (!level) return "Not Set"
    const difficultyLevel = difficultyLevels.find((d) => d.value === level)
    return difficultyLevel ? difficultyLevel.label : "Not Set"
  }

  // Get difficulty level description
  const getDifficultyDescription = (level?: string) => {
    if (!level) return ""
    const difficultyLevel = difficultyLevels.find((d) => d.value === level)
    return difficultyLevel ? difficultyLevel.description : ""
  }

  // Format duration
  const formatDuration = (minutes?: number) => {
    if (!minutes) return "Not Set"
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours > 0 ? `${hours}h ` : ""}${mins > 0 ? `${mins}m` : ""}`
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>


      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", bgcolor: "#f8faff" }}>



        {/* Main Content */}
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1, overflow: "auto" }}>
          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ mb: 2 }}>
            <Link href="/dashboard" passHref>
              <MuiLink
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "text.primary",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
                Dashboard
              </MuiLink>
            </Link>
            <Link href="/exam-categories" passHref>
              <MuiLink
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "text.primary",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                <CategoryIcon sx={{ mr: 0.5, fontSize: 20 }} />
                Exam Categories
              </MuiLink>
            </Link>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.primary",
              }}
            >
              <AddIcon sx={{ mr: 0.5, fontSize: 20 }} />
              New Exam Category
            </Typography>
          </Breadcrumbs>

          {/* Header */}
          <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                Create New Exam Category
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Define the parameters and settings for a new examination category
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={() => setTemplateDialogOpen(true)}
                sx={{ borderRadius: 2 }}
              >
                Use Template
              </Button>
              <ToggleButtonGroup
                value={designMode}
                exclusive
                onChange={(_, newMode) => {
                  if (newMode !== null) {
                    setDesignMode(newMode)
                  }
                }}
                aria-label="design mode"
                size="small"
                sx={{ height: 40 }}
              >
                <ToggleButton value="basic" aria-label="basic mode">
                  Basic
                </ToggleButton>
                <ToggleButton value="advanced" aria-label="advanced mode">
                  Advanced
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          {/* Main Card */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid #e0e0e0",
            }}
          >
            {/* Content */}
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              {designMode === "basic" ? (
                /* Basic Form Layout */
                <Grid container spacing={4}>
                  <Grid item xs={12} md={8}>
                    {/* Basic Information */}
                    <Card
                      elevation={0}
                      sx={{
                        mb: 4,
                        borderRadius: 2,
                        border: "1px solid #e0e0e0",
                        overflow: "visible",
                      }}
                    >
                      <CardContent sx={{ p: 0 }}>
                        <Box
                          sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            borderBottom: "1px solid #e0e0e0",
                            bgcolor: "#f5f5f5",
                          }}
                        >
                          <CategoryIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                          <Typography variant="h6" fontWeight="bold">
                            Basic Information
                          </Typography>
                        </Box>

                        <Box sx={{ p: 3 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label="Exam Category Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                placeholder="e.g., Midterm Examination, Final Examination, Quiz"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <EditIcon fontSize="small" />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={formData.isMainExam}
                                    onChange={handleCheckboxChange}
                                    name="isMainExam"
                                    color="primary"
                                  />
                                }
                                label={
                                  <Box>
                                    <Typography variant="body1">Is Main Exam</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      Main exams are considered for final grade calculation
                                    </Typography>
                                  </Box>
                                }
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Total Marks"
                                name="totalMarks"
                                type="number"
                                value={formData.totalMarks}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <BarChartIcon fontSize="small" />
                                    </InputAdornment>
                                  ),
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip title="Maximum possible marks for this exam category">
                                        <InfoIcon fontSize="small" color="action" />
                                      </Tooltip>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Pass Marks"
                                name="passMarks"
                                type="number"
                                value={formData.passMarks}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <CheckIcon fontSize="small" />
                                    </InputAdornment>
                                  ),
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip title="Minimum marks required to pass">
                                        <InfoIcon fontSize="small" color="action" />
                                      </Tooltip>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <FormControl fullWidth variant="outlined">
                                <InputLabel id="weight-label">Weight (%)</InputLabel>
                                <Select
                                  labelId="weight-label"
                                  id="weight"
                                  name="weight"
                                  value={formData.weight}
                                  onChange={(e) => handleSelectChange("weight", e.target.value)}
                                  label="Weight (%)"
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <PercentIcon fontSize="small" />
                                    </InputAdornment>
                                  }
                                >
                                  {Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map((value) => (
                                    <MenuItem key={value} value={value}>
                                      {value}%
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label="Description (Optional)"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                variant="outlined"
                                multiline
                                rows={3}
                                placeholder="Provide a brief description of this exam category"
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>

                    {/* Advanced Options (Collapsible) */}
                    <Card
                      elevation={0}
                      sx={{
                        mb: 4,
                        borderRadius: 2,
                        border: "1px solid #e0e0e0",
                        overflow: "visible",
                      }}
                    >
                      <CardContent sx={{ p: 0 }}>
                        <Box
                          sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottom: showAdvancedOptions ? "1px solid #e0e0e0" : "none",
                            bgcolor: "#f5f5f5",
                            cursor: "pointer",
                          }}
                          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <TuneIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                            <Typography variant="h6" fontWeight="bold">
                              Advanced Options
                            </Typography>
                          </Box>
                          {showAdvancedOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Box>

                        <Collapse in={showAdvancedOptions}>
                          <Box sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                  <InputLabel id="difficulty-label">Difficulty Level</InputLabel>
                                  <Select
                                    labelId="difficulty-label"
                                    id="difficultyLevel"
                                    name="difficultyLevel"
                                    value={formData.difficultyLevel}
                                    onChange={(e) => handleSelectChange("difficultyLevel", e.target.value)}
                                    label="Difficulty Level"
                                  >
                                    {difficultyLevels.map((level) => (
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

                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Duration (minutes)"
                                  name="duration"
                                  type="number"
                                  value={formData.duration}
                                  onChange={handleInputChange}
                                  variant="outlined"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <TimerIcon fontSize="small" />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <Autocomplete
                                  multiple
                                  id="examFormat"
                                  options={examFormats}
                                  value={formData.examFormat || []}
                                  onChange={(_, newValue) => handleSelectChange("examFormat", newValue)}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="outlined"
                                      label="Exam Format"
                                      placeholder="Select formats"
                                    />
                                  )}
                                  renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                      <Chip
                                        key={option}
                                        label={option}
                                        onDelete={getTagProps({ index }).onDelete}
                                        sx={{ bgcolor: `${theme.palette.primary.main}15` }}
                                      />
                                    ))
                                  }
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <Autocomplete
                                  multiple
                                  freeSolo
                                  id="tags"
                                  options={subjectAreas}
                                  value={formData.tags || []}
                                  onChange={(_, newValue) => handleSelectChange("tags", newValue)}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="outlined"
                                      label="Tags"
                                      placeholder="Add tags"
                                      helperText="Add subject areas or other relevant tags"
                                    />
                                  )}
                                  renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                      <Chip
                                        key={option}
                                        label={option}
                                        onDelete={getTagProps({ index }).onDelete}
                                        sx={{ bgcolor: `${theme.palette.primary.main}15` }}
                                      />
                                    ))
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        </Collapse>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    {/* Preview Card */}
                    <Card
                      elevation={0}
                      sx={{
                        position: "sticky",
                        top: 24,
                        borderRadius: 2,
                        border: "1px solid #e0e0e0",
                        overflow: "visible",
                        height: "fit-content",
                      }}
                    >
                      <CardContent sx={{ p: 0 }}>
                        <Box
                          sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            borderBottom: "1px solid #e0e0e0",
                            bgcolor: "#f5f5f5",
                          }}
                        >
                          <PreviewIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                          <Typography variant="h6" fontWeight="bold">
                            Preview
                          </Typography>
                        </Box>

                        <Box sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 3,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: formData.color || theme.palette.primary.main,
                                width: 56,
                                height: 56,
                                mr: 2,
                              }}
                            >
                              {formData.icon && categoryIcons[formData.icon]}
                            </Avatar>
                            <Box>
                              <Typography variant="h6" fontWeight="bold">
                                {formData.name || "Exam Category Name"}
                              </Typography>
                              <Chip
                                label={formData.isMainExam ? "Main Exam" : "Subsidiary Exam"}
                                size="small"
                                color={formData.isMainExam ? "primary" : "default"}
                                sx={{ mt: 0.5 }}
                              />
                            </Box>
                          </Box>

                          <Divider sx={{ mb: 2 }} />

                          <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="text.secondary">
                                Total Marks
                              </Typography>
                              <Typography variant="body1" fontWeight="medium">
                                {formData.totalMarks || 0}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="text.secondary">
                                Pass Marks
                              </Typography>
                              <Typography variant="body1" fontWeight="medium">
                                {formData.passMarks || 0} ({passPercentage.toFixed(1)}%)
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="text.secondary">
                                Weight
                              </Typography>
                              <Typography variant="body1" fontWeight="medium">
                                {formData.weight || 0}%
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="text.secondary">
                                Duration
                              </Typography>
                              <Typography variant="body1" fontWeight="medium">
                                {formatDuration(formData.duration)}
                              </Typography>
                            </Grid>
                          </Grid>

                          {formData.difficultyLevel && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="caption" color="text.secondary">
                                Difficulty Level
                              </Typography>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box
                                  sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: "50%",
                                    bgcolor: getDifficultyColor(formData.difficultyLevel),
                                    mr: 1,
                                  }}
                                />
                                <Typography variant="body1" fontWeight="medium">
                                  {getDifficultyLabel(formData.difficultyLevel)}
                                </Typography>
                              </Box>
                              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                                {getDifficultyDescription(formData.difficultyLevel)}
                              </Typography>
                            </Box>
                          )}

                          {formData.examFormat && formData.examFormat.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="caption" color="text.secondary">
                                Exam Format
                              </Typography>
                              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                                {formData.examFormat.map((format) => (
                                  <Chip
                                    key={format}
                                    label={format}
                                    size="small"
                                    sx={{ bgcolor: `${theme.palette.primary.main}15` }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}

                          {formData.description && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="caption" color="text.secondary">
                                Description
                              </Typography>
                              <Typography variant="body2">{formData.description}</Typography>
                            </Box>
                          )}

                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<VisibilityIcon />}
                            onClick={() => setPreviewDialogOpen(true)}
                            sx={{ mt: 2, borderRadius: 2 }}
                          >
                            Full Preview
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              ) : (
                /* Advanced Stepper Layout */
                <Box>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {/* Step 1: Basic Information */}
                    <Step>
                      <StepLabel>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Basic Information
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Box sx={{ mb: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label="Exam Category Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                placeholder="e.g., Midterm Examination, Final Examination, Quiz"
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={formData.isMainExam}
                                    onChange={handleCheckboxChange}
                                    name="isMainExam"
                                    color="primary"
                                  />
                                }
                                label="Is Main Exam"
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label="Description (Optional)"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                variant="outlined"
                                multiline
                                rows={3}
                                placeholder="Provide a brief description of this exam category"
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{
                              mt: 1,
                              mr: 1,
                              borderRadius: 2,
                              background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                            }}
                          >
                            Continue
                          </Button>
                        </Box>
                      </StepContent>
                    </Step>

                    {/* Step 2: Marks and Grading */}
                    <Step>
                      <StepLabel>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Marks and Grading
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Box sx={{ mb: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Total Marks"
                                name="totalMarks"
                                type="number"
                                value={formData.totalMarks}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Pass Marks"
                                name="passMarks"
                                type="number"
                                value={formData.passMarks}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <Typography gutterBottom>Weight (%)</Typography>
                              <Slider
                                value={formData.weight || 10}
                                onChange={(_, newValue) => handleSelectChange("weight", newValue)}
                                aria-labelledby="weight-slider"
                                valueLabelDisplay="auto"
                                step={5}
                                marks
                                min={5}
                                max={100}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
                          <Button onClick={handleBack} sx={{ mt: 1, mr: 1, borderRadius: 2 }}>
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{
                              mt: 1,
                              mr: 1,
                              borderRadius: 2,
                              background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                            }}
                          >
                            Continue
                          </Button>
                        </Box>
                      </StepContent>
                    </Step>

                    {/* Step 3: Exam Settings */}
                    <Step>
                      <StepLabel>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Exam Settings
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Box sx={{ mb: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <FormControl fullWidth variant="outlined">
                                <InputLabel id="difficulty-label">Difficulty Level</InputLabel>
                                <Select
                                  labelId="difficulty-label"
                                  id="difficultyLevel"
                                  name="difficultyLevel"
                                  value={formData.difficultyLevel}
                                  onChange={(e) => handleSelectChange("difficultyLevel", e.target.value)}
                                  label="Difficulty Level"
                                >
                                  {difficultyLevels.map((level) => (
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

                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Duration (minutes)"
                                name="duration"
                                type="number"
                                value={formData.duration}
                                onChange={handleInputChange}
                                variant="outlined"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <TimerIcon fontSize="small" />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <Autocomplete
                                multiple
                                id="examFormat"
                                options={examFormats}
                                value={formData.examFormat || []}
                                onChange={(_, newValue) => handleSelectChange("examFormat", newValue)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Exam Format"
                                    placeholder="Select formats"
                                  />
                                )}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
                          <Button onClick={handleBack} sx={{ mt: 1, mr: 1, borderRadius: 2 }}>
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{
                              mt: 1,
                              mr: 1,
                              borderRadius: 2,
                              background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                            }}
                          >
                            Continue
                          </Button>
                        </Box>
                      </StepContent>
                    </Step>

                    {/* Step 4: Finalize */}
                    <Step>
                      <StepLabel>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Finalize
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Box sx={{ mb: 2 }}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 3,
                              borderRadius: 2,
                              border: "1px solid #e0e0e0",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 3,
                              }}
                            >
                              <Avatar
                                sx={{
                                  bgcolor: formData.color || theme.palette.primary.main,
                                  width: 56,
                                  height: 56,
                                  mr: 2,
                                }}
                              >
                                {formData.icon && categoryIcons[formData.icon]}
                              </Avatar>
                              <Box>
                                <Typography variant="h6" fontWeight="bold">
                                  {formData.name || "Exam Category Name"}
                                </Typography>
                                <Chip
                                  label={formData.isMainExam ? "Main Exam" : "Subsidiary Exam"}
                                  size="small"
                                  color={formData.isMainExam ? "primary" : "default"}
                                  sx={{ mt: 0.5 }}
                                />
                              </Box>
                            </Box>

                            <Divider sx={{ mb: 2 }} />

                            <Grid container spacing={2} sx={{ mb: 2 }}>
                              <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Total Marks
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {formData.totalMarks || 0}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Pass Marks
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {formData.passMarks || 0} ({passPercentage.toFixed(1)}%)
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Weight
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {formData.weight || 0}%
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Duration
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {formatDuration(formData.duration)}
                                </Typography>
                              </Grid>
                            </Grid>

                            {formData.difficultyLevel && (
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                  Difficulty Level
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                  <Box
                                    sx={{
                                      width: 12,
                                      height: 12,
                                      borderRadius: "50%",
                                      bgcolor: getDifficultyColor(formData.difficultyLevel),
                                      mr: 1,
                                    }}
                                  />
                                  <Typography variant="body1" fontWeight="medium">
                                    {getDifficultyLabel(formData.difficultyLevel)}
                                  </Typography>
                                </Box>
                              </Box>
                            )}

                            {formData.examFormat && formData.examFormat.length > 0 && (
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                  Exam Format
                                </Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                                  {formData.examFormat.map((format) => (
                                    <Chip
                                      key={format}
                                      label={format}
                                      size="small"
                                      sx={{ bgcolor: `${theme.palette.primary.main}15` }}
                                    />
                                  ))}
                                </Box>
                              </Box>
                            )}

                            {formData.description && (
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                  Description
                                </Typography>
                                <Typography variant="body2">{formData.description}</Typography>
                              </Box>
                            )}
                          </Paper>
                        </Box>
                        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
                          <Button onClick={handleBack} sx={{ mt: 1, mr: 1, borderRadius: 2 }}>
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleSave}
                            disabled={saving}
                            startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                            sx={{
                              mt: 1,
                              mr: 1,
                              borderRadius: 2,
                              background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                              boxShadow: "0 4px 20px rgba(33, 150, 243, 0.3)",
                            }}
                          >
                            {saving ? "Saving..." : "Save Exam Category"}
                          </Button>
                        </Box>
                      </StepContent>
                    </Step>
                  </Stepper>
                </Box>
              )}
            </Box>

            {/* Action Buttons */}
            {designMode === "basic" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 3,
                  borderTop: "1px solid #e0e0e0",
                  bgcolor: "#f5f5f5",
                }}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<CancelIcon />}
                  onClick={() => setDiscardDialogOpen(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Cancel
                </Button>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button variant="outlined" color="primary" sx={{ borderRadius: 2 }}>
                    Save as Draft
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    disabled={saving}
                    onClick={handleSave}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                      boxShadow: "0 4px 20px rgba(33, 150, 243, 0.3)",
                    }}
                  >
                    {saving ? "Saving..." : "Save Exam Category"}
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 2,
            textAlign: "center",
            bgcolor: "white",
            borderTop: "1px solid #e0e0e0",
            mt: "auto",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} EduGenius Pro - Advanced School Management System
          </Typography>
        </Box>
      </Box>

      {/* Template Dialog */}
      <Dialog open={templateDialogOpen} onClose={() => setTemplateDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ContentCopyIcon sx={{ mr: 1 }} />
            Choose a Template
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {examCategoryTemplates.map((template, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: template.color,
                          mr: 2,
                        }}
                      >
                        {template.icon && categoryIcons[template.icon]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {template.name}
                        </Typography>
                        <Chip
                          label={template.isMainExam ? "Main Exam" : "Subsidiary Exam"}
                          size="small"
                          color={template.isMainExam ? "primary" : "default"}
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Total Marks
                        </Typography>
                        <Typography variant="body2">{template.totalMarks}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Pass Marks
                        </Typography>
                        <Typography variant="body2">{template.passMarks}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Weight
                        </Typography>
                        <Typography variant="body2">{template.weight}%</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Duration
                        </Typography>
                        <Typography variant="body2">{formatDuration(template.duration)}</Typography>
                      </Grid>
                    </Grid>

                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{ mt: 2, borderRadius: 2 }}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      Use This Template
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTemplateDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onClose={() => setPreviewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PreviewIcon sx={{ mr: 1 }} />
              Exam Category Preview
            </Box>
            <IconButton onClick={() => setPreviewDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              bgcolor: "#f8faff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: formData.color || theme.palette.primary.main,
                  width: 64,
                  height: 64,
                  mr: 2,
                }}
              >
                {formData.icon && categoryIcons[formData.icon]}
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {formData.name || "Exam Category Name"}
                </Typography>
                <Chip
                  label={formData.isMainExam ? "Main Exam" : "Subsidiary Exam"}
                  size="small"
                  color={formData.isMainExam ? "primary" : "default"}
                  sx={{ mt: 0.5 }}
                />
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    height: "100%",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Basic Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Total Marks
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formData.totalMarks || 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Pass Marks
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formData.passMarks || 0} ({passPercentage.toFixed(1)}%)
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Weight
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formData.weight || 0}%
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Duration
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formatDuration(formData.duration)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    height: "100%",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Advanced Settings
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="caption" color="text.secondary">
                        Difficulty Level
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            bgcolor: getDifficultyColor(formData.difficultyLevel),
                            mr: 1,
                          }}
                        />
                        <Typography variant="body1" fontWeight="medium">
                          {getDifficultyLabel(formData.difficultyLevel)}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                        {getDifficultyDescription(formData.difficultyLevel)}
                      </Typography>
                    </Grid>

                    {formData.examFormat && formData.examFormat.length > 0 && (
                      <Grid item xs={12}>
                        <Typography variant="caption" color="text.secondary">
                          Exam Format
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                          {formData.examFormat.map((format) => (
                            <Chip
                              key={format}
                              label={format}
                              size="small"
                              sx={{ bgcolor: `${theme.palette.primary.main}15` }}
                            />
                          ))}
                        </Box>
                      </Grid>
                    )}

                    {formData.tags && formData.tags.length > 0 && (
                      <Grid item xs={12}>
                        <Typography variant="caption" color="text.secondary">
                          Tags
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                          {formData.tags.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{ bgcolor: `${theme.palette.secondary.main}15` }}
                            />
                          ))}
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </Grid>

              {formData.description && (
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Description
                    </Typography>
                    <Typography variant="body2">{formData.description}</Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialogOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
          >
            {saving ? "Saving..." : "Save Exam Category"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Discard Dialog */}
      <Dialog open={discardDialogOpen} onClose={() => setDiscardDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Discard Changes?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to discard all changes? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDiscardDialogOpen(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setDiscardDialogOpen(false)
              handleReset()
            }}
          >
            Discard
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
