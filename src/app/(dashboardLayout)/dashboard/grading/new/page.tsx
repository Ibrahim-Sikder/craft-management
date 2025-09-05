"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Tooltip,
  useTheme,
  Chip,
  Fade,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material"
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,

  Info as InfoIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Settings as SettingsIcon,
  Grading as GradingIcon,
  Preview as PreviewIcon,
  History as HistoryIcon,
  Tune as TuneIcon,
  BarChart as BarChartIcon,
 
  Lightbulb as LightbulbIcon,
  Check as CheckIcon,
  Edit as EditIcon,
  ContentCopy as ContentCopyIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Refresh as RefreshIcon,
 
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material"

interface GradeEntry {
  id: string
  letterGrade: string
  markRangeStart: number
  markRangeEnd: number
  gradePoint: number
  color: string
  description: string
}

export default function GradingSystem() {
  const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"))




  // State for tabs
  const [tabValue, setTabValue] = useState(0)

  // State for form data
  const [formData, setFormData] = useState({
    name: "Advanced Grading System",
    totalMarks: 100,
    passMarks: 33.5,
    optionalSubjectPoint: -2.5,
    enableAutoCalculation: true,
    enableGradeColors: true,
    enableGradeDescriptions: true,
    enableGPA: true,
    enablePercentage: true,
    gradingScale: "standard", // standard, custom, international
  })

  // State for grades
  const [grades, setGrades] = useState<GradeEntry[]>([
    {
      id: "1",
      letterGrade: "A+",
      markRangeStart: 90,
      markRangeEnd: 100,
      gradePoint: 5.0,
      color: "#4caf50",
      description: "Outstanding performance with thorough command of the subject",
    },
    {
      id: "2",
      letterGrade: "A",
      markRangeStart: 80,
      markRangeEnd: 89,
      gradePoint: 4.5,
      color: "#8bc34a",
      description: "Excellent performance with comprehensive knowledge",
    },
    {
      id: "3",
      letterGrade: "B+",
      markRangeStart: 75,
      markRangeEnd: 79,
      gradePoint: 4.0,
      color: "#cddc39",
      description: "Very good performance with substantial knowledge",
    },
    {
      id: "4",
      letterGrade: "B",
      markRangeStart: 70,
      markRangeEnd: 74,
      gradePoint: 3.5,
      color: "#ffeb3b",
      description: "Good performance with reasonable knowledge",
    },
    {
      id: "5",
      letterGrade: "C+",
      markRangeStart: 65,
      markRangeEnd: 69,
      gradePoint: 3.0,
      color: "#ffc107",
      description: "Satisfactory performance with adequate knowledge",
    },
    {
      id: "6",
      letterGrade: "C",
      markRangeStart: 60,
      markRangeEnd: 64,
      gradePoint: 2.5,
      color: "#ff9800",
      description: "Fair performance with basic knowledge",
    },
    {
      id: "7",
      letterGrade: "D",
      markRangeStart: 50,
      markRangeEnd: 59,
      gradePoint: 2.0,
      color: "#ff5722",
      description: "Marginal performance with minimal knowledge",
    },
    {
      id: "8",
      letterGrade: "F",
      markRangeStart: 0,
      markRangeEnd: 49,
      gradePoint: 0.0,
      color: "#f44336",
      description: "Insufficient performance, does not meet minimum requirements",
    },
  ])

  // State for preview data
  const [previewData, setPreviewData] = useState({
    studentName: "John Smith",
    marks: 85,
    calculatedGrade: "A",
    calculatedGradePoint: 4.5,
  })

  // State for snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  })

  // State for dialog
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    content: "",
    confirmAction: () => {},
  })

  // State for profile menu
  const [profileMenu, setProfileMenu] = useState<null | HTMLElement>(null)

  // State for loading
  const [loading, setLoading] = useState(false)

  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({
    basicInfo: true,
    gradingMarks: true,
    advancedSettings: false,
  })

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle grade change
  const handleGradeChange = (id: string, field: keyof GradeEntry, value: string | number) => {
    setGrades(grades.map((grade) => (grade.id === id ? { ...grade, [field]: value } : grade)))
  }

  // Add new grade
  const addNewGrade = () => {
    const newId = (Math.max(...grades.map((g) => Number.parseInt(g.id))) + 1).toString()
    setGrades([
      ...grades,
      {
        id: newId,
        letterGrade: "",
        markRangeStart: 0,
        markRangeEnd: 0,
        gradePoint: 0,
        color: "#9e9e9e",
        description: "",
      },
    ])

    // Show snackbar
    setSnackbar({
      open: true,
      message: "New grade added successfully!",
      severity: "success",
    })
  }

  // Remove grade
  const removeGrade = (id: string) => {
    // Show confirmation dialog
    setDialog({
      open: true,
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this grade? This action cannot be undone.",
      confirmAction: () => {
        setGrades(grades.filter((grade) => grade.id !== id))
        setDialog({ ...dialog, open: false })
        setSnackbar({
          open: true,
          message: "Grade removed successfully!",
          severity: "success",
        })
      },
    })
  }

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Show loading
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)

      // Show success message
      setSnackbar({
        open: true,
        message: "Grading system saved successfully!",
        severity: "success",
      })
    }, 1500)
  }

  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }


 

  const handleProfileMenuClose = () => {
    setProfileMenu(null)
  }

  // Calculate preview data
  useEffect(() => {
    if (formData.enableAutoCalculation) {
      const mark = previewData.marks;
      const matchingGrade = grades.find(
        (grade) => mark >= grade.markRangeStart && mark <= grade.markRangeEnd
      );
  
      if (matchingGrade) {
        setPreviewData((prev) => ({
          ...prev,
          calculatedGrade: matchingGrade.letterGrade,
          calculatedGradePoint: matchingGrade.gradePoint, 
        }));
      }
    }
  }, [grades, previewData.marks, formData.enableAutoCalculation]);

  // Generate grade distribution data for chart
  const gradeDistributionData = grades.map((grade) => ({
    grade: grade.letterGrade,
    range: grade.markRangeEnd - grade.markRangeStart,
    color: grade.color,
  }))

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Drawer */}
     

      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", bgcolor: "#f8faff" }}>
        {/* App Bar */}
        

        {/* Profile Menu */}
        <Menu
          anchorEl={profileMenu}
          open={Boolean(profileMenu)}
          onClose={handleProfileMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1, overflow: "auto" }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              border: "1px solid #e0e0e0",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 3,
                background: "linear-gradient(120deg, #3f51b5 0%, #2196f3 100%)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <GradingIcon sx={{ fontSize: 36, mr: 2 }} />
                <Box>
                  <Typography variant="h5" component="h1" fontWeight="bold">
                    Advanced Grading System
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
                    Configure your institution&apos;s grading criteria with precision
                  </Typography>
                </Box>
              </Box>

              <Chip
                label="Active"
                color="success"
                icon={<CheckIcon />}
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  "& .MuiChip-icon": { color: "#4caf50" },
                }}
              />
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#f5f5f5" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .MuiTab-root": {
                    minHeight: 64,
                    fontWeight: "medium",
                  },
                  "& .Mui-selected": {
                    fontWeight: "bold",
                  },
                }}
              >
                <Tab label="Configuration" icon={<TuneIcon />} iconPosition="start" />
                <Tab label="Preview" icon={<PreviewIcon />} iconPosition="start" />
                <Tab label="History" icon={<HistoryIcon />} iconPosition="start" />
                <Tab label="Templates" icon={<ContentCopyIcon />} iconPosition="start" />
              </Tabs>
            </Box>

            {/* Tab Panels */}
            <Box sx={{ p: 0 }}>
              {/* Configuration Tab */}
              {tabValue === 0 && (
                <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
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
                          justifyContent: "space-between",
                          borderBottom: expandedSections.basicInfo ? "1px solid #e0e0e0" : "none",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleSection("basicInfo")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <TuneIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                          <Typography variant="h6" fontWeight="bold">
                            Basic Information
                          </Typography>
                        </Box>
                        {expandedSections.basicInfo ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </Box>

                      <Collapse in={expandedSections.basicInfo}>
                        <Box sx={{ p: 3 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Grading System Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <EditIcon fontSize="small" />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
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
                                      <Tooltip title="Maximum possible marks for any assessment">
                                        <InfoIcon fontSize="small" color="action" />
                                      </Tooltip>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
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
                            <Grid item xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Optional Subject Subtraction Point"
                                name="optionalSubjectPoint"
                                type="number"
                                value={formData.optionalSubjectPoint}
                                onChange={handleInputChange}
                                variant="outlined"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <TuneIcon fontSize="small" />
                                    </InputAdornment>
                                  ),
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip title="Points to subtract for optional subjects">
                                        <InfoIcon fontSize="small" color="action" />
                                      </Tooltip>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <Divider sx={{ my: 1 }} />
                              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                                Advanced Options
                              </Typography>
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={3}>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={formData.enableAutoCalculation}
                                        onChange={handleInputChange}
                                        name="enableAutoCalculation"
                                        color="primary"
                                      />
                                    }
                                    label="Auto Calculate"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={formData.enableGradeColors}
                                        onChange={handleInputChange}
                                        name="enableGradeColors"
                                        color="primary"
                                      />
                                    }
                                    label="Grade Colors"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={formData.enableGPA}
                                        onChange={handleInputChange}
                                        name="enableGPA"
                                        color="primary"
                                      />
                                    }
                                    label="Enable GPA"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={formData.enablePercentage}
                                        onChange={handleInputChange}
                                        name="enablePercentage"
                                        color="primary"
                                      />
                                    }
                                    label="Show Percentage"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </CardContent>
                  </Card>

                  {/* Grading Marks */}
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
                          borderBottom: expandedSections.gradingMarks ? "1px solid #e0e0e0" : "none",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleSection("gradingMarks")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <GradingIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                          <Typography variant="h6" fontWeight="bold">
                            Grading Marks
                          </Typography>
                        </Box>
                        {expandedSections.gradingMarks ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </Box>

                      <Collapse in={expandedSections.gradingMarks}>
                        <Box sx={{ p: 3 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography variant="subtitle1" fontWeight="medium">
                                Define your grading scale
                              </Typography>
                              <Chip label={`${grades.length} Grades`} size="small" color="primary" sx={{ ml: 2 }} />
                            </Box>
                            <Button
                              variant="contained"
                              startIcon={<AddIcon />}
                              onClick={addNewGrade}
                              sx={{
                                bgcolor: theme.palette.success.main,
                                "&:hover": {
                                  bgcolor: theme.palette.success.dark,
                                },
                                borderRadius: 2,
                              }}
                            >
                              Add New Grade
                            </Button>
                          </Box>

                          {/* Grade distribution visualization */}
                          {formData.enableGradeColors && (
                            <Box
                              sx={{
                                mb: 4,
                                p: 2,
                                borderRadius: 2,
                                bgcolor: "#f5f5f5",
                                border: "1px dashed #ccc",
                              }}
                            >
                              <Typography variant="subtitle2" gutterBottom>
                                Grade Distribution
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  height: 40,
                                  borderRadius: 1,
                                  overflow: "hidden",
                                  border: "1px solid #e0e0e0",
                                }}
                              >
                                {gradeDistributionData.map((item, index) => (
                                  <Box
                                    key={index}
                                    sx={{
                                      width: `${(item.range / formData.totalMarks) * 100}%`,
                                      bgcolor: item.color,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "white",
                                      fontSize: "0.75rem",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {item.grade}
                                  </Box>
                                ))}
                              </Box>
                              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                                <Typography variant="caption">0</Typography>
                                <Typography variant="caption">{formData.totalMarks}</Typography>
                              </Box>
                            </Box>
                          )}

                          {/* Grade entries */}
                          {grades.map((grade, index) => (
                            <Fade in key={grade.id} timeout={300} style={{ transitionDelay: `${index * 50}ms` }}>
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 3,
                                  mb: 3,
                                  borderRadius: 2,
                                  border: "1px solid #e0e0e0",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                    borderColor: theme.palette.primary.main,
                                  },
                                  borderLeft: `6px solid ${grade.color}`,
                                }}
                              >
                                <Grid container spacing={3} alignItems="center">
                                  <Grid item xs={12} md={2}>
                                    <TextField
                                      fullWidth
                                      label="Letter Grade"
                                      value={grade.letterGrade}
                                      onChange={(e) => handleGradeChange(grade.id, "letterGrade", e.target.value)}
                                      variant="outlined"
                                      required
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <Chip
                                              label={grade.letterGrade || "?"}
                                              size="small"
                                              sx={{
                                                bgcolor: grade.color,
                                                color: "white",
                                                minWidth: 30,
                                                fontWeight: "bold",
                                              }}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={3}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                      <TextField
                                        fullWidth
                                        label="From"
                                        type="number"
                                        value={grade.markRangeStart}
                                        onChange={(e) =>
                                          handleGradeChange(grade.id, "markRangeStart", Number(e.target.value))
                                        }
                                        variant="outlined"
                                        required
                                        InputProps={{
                                          inputProps: { min: 0, max: formData.totalMarks },
                                        }}
                                      />
                                      <Typography sx={{ mx: 1 }}>-</Typography>
                                      <TextField
                                        fullWidth
                                        label="To"
                                        type="number"
                                        value={grade.markRangeEnd}
                                        onChange={(e) =>
                                          handleGradeChange(grade.id, "markRangeEnd", Number(e.target.value))
                                        }
                                        variant="outlined"
                                        required
                                        InputProps={{
                                          inputProps: { min: 0, max: formData.totalMarks },
                                        }}
                                      />
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12} md={2}>
                                    <TextField
                                      fullWidth
                                      label="Grade Point"
                                      type="number"
                                      value={grade.gradePoint}
                                      onChange={(e) =>
                                        handleGradeChange(grade.id, "gradePoint", Number(e.target.value))
                                      }
                                      variant="outlined"
                                      required
                                      inputProps={{ step: "0.1", min: 0 }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={3}>
                                    <TextField
                                      fullWidth
                                      label="Description"
                                      value={grade.description}
                                      onChange={(e) => handleGradeChange(grade.id, "description", e.target.value)}
                                      variant="outlined"
                                      placeholder="Brief description of this grade"
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                      variant="outlined"
                                      color="error"
                                      startIcon={<DeleteIcon />}
                                      onClick={() => removeGrade(grade.id)}
                                      disabled={grades.length <= 1}
                                      sx={{ borderRadius: 2 }}
                                    >
                                      Remove
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Fade>
                          ))}

                          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                            <Button
                              variant="outlined"
                              startIcon={<AddIcon />}
                              onClick={addNewGrade}
                              sx={{ borderRadius: 2 }}
                            >
                              Add Another Grade
                            </Button>
                          </Box>
                        </Box>
                      </Collapse>
                    </CardContent>
                  </Card>

                  {/* Advanced Settings */}
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
                          borderBottom: expandedSections.advancedSettings ? "1px solid #e0e0e0" : "none",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleSection("advancedSettings")}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <SettingsIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                          <Typography variant="h6" fontWeight="bold">
                            Advanced Settings
                          </Typography>
                        </Box>
                        {expandedSections.advancedSettings ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </Box>

                      <Collapse in={expandedSections.advancedSettings}>
                        <Box sx={{ p: 3 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                                Grading Scale
                              </Typography>
                              <Paper sx={{ p: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={formData.enableGradeDescriptions}
                                      onChange={handleInputChange}
                                      name="enableGradeDescriptions"
                                      color="primary"
                                    />
                                  }
                                  label="Enable Grade Descriptions"
                                />
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={formData.enableGradeColors}
                                      onChange={handleInputChange}
                                      name="enableGradeColors"
                                      color="primary"
                                    />
                                  }
                                  label="Enable Grade Colors"
                                />
                              </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                                Import/Export
                              </Typography>
                              <Paper sx={{ p: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}>
                                <Box sx={{ display: "flex", gap: 2 }}>
                                  <Button variant="outlined" startIcon={<UploadIcon />} sx={{ borderRadius: 2 }}>
                                    Import
                                  </Button>
                                  <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderRadius: 2 }}>
                                    Export
                                  </Button>
                                </Box>
                              </Paper>
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                    <Button variant="outlined" color="inherit" startIcon={<RefreshIcon />} sx={{ borderRadius: 2 }}>
                      Reset to Default
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
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                        disabled={loading}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                          boxShadow: "0 4px 20px rgba(33, 150, 243, 0.3)",
                        }}
                      >
                        {loading ? "Saving..." : "Save Grading System"}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Preview Tab */}
              {tabValue === 1 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Grade Calculator Preview
                  </Typography>

                  <Paper sx={{ p: 3, borderRadius: 2, border: "1px solid #e0e0e0", mb: 4 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Student Name"
                          value={previewData.studentName}
                          onChange={(e) => setPreviewData({ ...previewData, studentName: e.target.value })}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Marks"
                          type="number"
                          value={previewData.marks}
                          onChange={(e) => setPreviewData({ ...previewData, marks: Number(e.target.value) })}
                          variant="outlined"
                          InputProps={{
                            inputProps: { min: 0, max: formData.totalMarks },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                      Calculated Result
                    </Typography>

                    <Grid container spacing={3} sx={{ mt: 1 }}>
                      <Grid item xs={12} md={4}>
                        <Paper
                          sx={{
                            p: 3,
                            textAlign: "center",
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                            bgcolor: "#f8f9fa",
                          }}
                        >
                          <Typography variant="overline" display="block">
                            Letter Grade
                          </Typography>
                          <Typography
                            variant="h3"
                            fontWeight="bold"
                            sx={{
                              color:
                                grades.find((g) => g.letterGrade === previewData.calculatedGrade)?.color || "inherit",
                            }}
                          >
                            {previewData.calculatedGrade}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Paper
                          sx={{
                            p: 3,
                            textAlign: "center",
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                            bgcolor: "#f8f9fa",
                          }}
                        >
                          <Typography variant="overline" display="block">
                            Grade Point
                          </Typography>
                          <Typography variant="h3" fontWeight="bold" color="primary">
                            {previewData.calculatedGradePoint.toFixed(1)}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Paper
                          sx={{
                            p: 3,
                            textAlign: "center",
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                            bgcolor: "#f8f9fa",
                          }}
                        >
                          <Typography variant="overline" display="block">
                            Percentage
                          </Typography>
                          <Typography variant="h3" fontWeight="bold" color="secondary">
                            {((previewData.marks / formData.totalMarks) * 100).toFixed(1)}%
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    <Box
                      sx={{
                        mt: 3,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "#f5f5f5",
                        border: "1px dashed #ccc",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        <LightbulbIcon sx={{ fontSize: 16, verticalAlign: "middle", mr: 0.5, color: "#ffc107" }} />
                        This is a preview of how grades will be calculated based on your current configuration.
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              )}

              {/* History Tab */}
              {tabValue === 2 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Grading System History
                  </Typography>

                  <Paper sx={{ p: 3, borderRadius: 2, border: "1px solid #e0e0e0" }}>
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
                      No history records found. Changes to the grading system will be recorded here.
                    </Typography>
                  </Paper>
                </Box>
              )}

              {/* Templates Tab */}
              {tabValue === 3 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Grading Templates
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Paper
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          border: "1px solid #e0e0e0",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            borderColor: theme.palette.primary.main,
                          },
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          Standard Grading (A-F)
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Traditional letter grading system with A+ to F scale
                        </Typography>
                        <Button variant="outlined" size="small">
                          Apply Template
                        </Button>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Paper
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          border: "1px solid #e0e0e0",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            borderColor: theme.palette.primary.main,
                          },
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          International Baccalaureate
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          IB grading system with 1-7 scale
                        </Typography>
                        <Button variant="outlined" size="small">
                          Apply Template
                        </Button>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Paper
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          border: "1px solid #e0e0e0",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            borderColor: theme.palette.primary.main,
                          },
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          Percentage Only
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Simple percentage-based grading without letter grades
                        </Typography>
                        <Button variant="outlined" size="small">
                          Apply Template
                        </Button>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
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

      {/* Confirmation Dialog */}
      <Dialog open={dialog.open} onClose={() => setDialog({ ...dialog, open: false })} maxWidth="xs" fullWidth>
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>
          <Typography>{dialog.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog({ ...dialog, open: false })}>Cancel</Button>
          <Button onClick={dialog.confirmAction} color="error" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
