/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Tooltip,
  Alert,
  Snackbar,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
} from "@mui/material"
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Print as PrintIcon,
} from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { useRouter } from "next/navigation"

// Mock data for grading systems
const mockGradingSystems = [
  {
    id: 1,
    name: "Primary Classes (One-Three)",
    description: "Grading system for primary classes",
    isActive: true,
    grades: [
      { id: 1, name: "A+", minMarks: 90, maxMarks: 100, gpa: 4.0, remarks: "Excellent" },
      { id: 2, name: "A", minMarks: 80, maxMarks: 89, gpa: 3.7, remarks: "Very Good" },
      { id: 3, name: "B+", minMarks: 70, maxMarks: 79, gpa: 3.3, remarks: "Good" },
      { id: 4, name: "B", minMarks: 60, maxMarks: 69, gpa: 3.0, remarks: "Satisfactory" },
      { id: 5, name: "C", minMarks: 50, maxMarks: 59, gpa: 2.0, remarks: "Average" },
      { id: 6, name: "D", minMarks: 40, maxMarks: 49, gpa: 1.0, remarks: "Below Average" },
      { id: 7, name: "F", minMarks: 0, maxMarks: 39, gpa: 0.0, remarks: "Fail" },
    ],
  },
  {
    id: 2,
    name: "Upper Primary (Four-Six)",
    description: "Grading system for upper primary classes",
    isActive: true,
    grades: [
      { id: 1, name: "A+", minMarks: 90, maxMarks: 100, gpa: 4.0, remarks: "Excellent" },
      { id: 2, name: "A", minMarks: 80, maxMarks: 89, gpa: 3.7, remarks: "Very Good" },
      { id: 3, name: "B+", minMarks: 70, maxMarks: 79, gpa: 3.3, remarks: "Good" },
      { id: 4, name: "B", minMarks: 60, maxMarks: 69, gpa: 3.0, remarks: "Satisfactory" },
      { id: 5, name: "C+", minMarks: 55, maxMarks: 59, gpa: 2.5, remarks: "Average" },
      { id: 6, name: "C", minMarks: 50, maxMarks: 54, gpa: 2.0, remarks: "Below Average" },
      { id: 7, name: "D", minMarks: 45, maxMarks: 49, gpa: 1.5, remarks: "Poor" },
      { id: 8, name: "E", minMarks: 40, maxMarks: 44, gpa: 1.0, remarks: "Very Poor" },
      { id: 9, name: "F", minMarks: 0, maxMarks: 39, gpa: 0.0, remarks: "Fail" },
    ],
  },
  {
    id: 3,
    name: "Hifz & Nazera",
    description: "Special grading system for Hifz and Nazera classes",
    isActive: true,
    grades: [
      { id: 1, name: "Mumtaz", minMarks: 90, maxMarks: 100, gpa: 4.0, remarks: "Excellent" },
      { id: 2, name: "Jayyid Jiddan", minMarks: 80, maxMarks: 89, gpa: 3.5, remarks: "Very Good" },
      { id: 3, name: "Jayyid", minMarks: 70, maxMarks: 79, gpa: 3.0, remarks: "Good" },
      { id: 4, name: "Maqbool", minMarks: 60, maxMarks: 69, gpa: 2.5, remarks: "Satisfactory" },
      { id: 5, name: "Rasib", minMarks: 0, maxMarks: 59, gpa: 0.0, remarks: "Fail" },
    ],
  },
]

// Available classes
const availableClasses = ["Hifz", "One A", "One B", "Nazera", "Two", "Three", "Four", "Five", "Six"]

const GradingPage = () => {
  const theme = useTheme()
  const router = useRouter()
  const [gradingSystems, setGradingSystems] = useState(mockGradingSystems)
  const [selectedTab, setSelectedTab] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [openGradeDialog, setOpenGradeDialog] = useState(false)
  const [editSystem, setEditSystem] = useState<any>(null)
  const [editGrade, setEditGrade] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })

  // Form state for grading system
  const [systemFormData, setSystemFormData] = useState({
    name: "",
    description: "",
    isActive: true,
    classes: [] as string[],
  })

  // Form state for grade
  const [gradeFormData, setGradeFormData] = useState({
    name: "",
    minMarks: 0,
    maxMarks: 0,
    gpa: 0,
    remarks: "",
  })

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const handleOpenSystemDialog = (system?: any) => {
    if (system) {
      setEditSystem(system)
      setSystemFormData({
        name: system.name,
        description: system.description,
        isActive: system.isActive,
        classes: system.classes || [],
      })
    } else {
      setEditSystem(null)
      setSystemFormData({
        name: "",
        description: "",
        isActive: true,
        classes: [],
      })
    }
    setOpenDialog(true)
  }

  const handleCloseSystemDialog = () => {
    setOpenDialog(false)
  }

  const handleOpenGradeDialog = (grade?: any) => {
    if (grade) {
      setEditGrade(grade)
      setGradeFormData({
        name: grade.name,
        minMarks: grade.minMarks,
        maxMarks: grade.maxMarks,
        gpa: grade.gpa,
        remarks: grade.remarks,
      })
    } else {
      setEditGrade(null)
      setGradeFormData({
        name: "",
        minMarks: 0,
        maxMarks: 0,
        gpa: 0,
        remarks: "",
      })
    }
    setOpenGradeDialog(true)
  }

  const handleCloseGradeDialog = () => {
    setOpenGradeDialog(false)
  }

  const handleSystemInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSystemFormData({
      ...systemFormData,
      [name]: value,
    })
  }

  const handleGradeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setGradeFormData({
      ...gradeFormData,
      [name]: name === "minMarks" || name === "maxMarks" || name === "gpa" ? Number(value) : value,
    })
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSystemFormData({
      ...systemFormData,
      isActive: e.target.checked,
    })
  }

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target
    setSystemFormData({
      ...systemFormData,
      [name]: value,
    })
  }

  const handleSubmitSystem = () => {
    setLoading(true)
    setTimeout(() => {
      if (editSystem) {
        // Update existing system
        const updatedSystems = gradingSystems.map((system) =>
          system.id === editSystem.id
            ? {
                ...system,
                name: systemFormData.name,
                description: systemFormData.description,
                isActive: systemFormData.isActive,
                classes: systemFormData.classes,
              }
            : system,
        )
        setGradingSystems(updatedSystems)
        setSnackbar({
          open: true,
          message: "Grading system updated successfully!",
          severity: "success",
        })
      } else {
        // Add new system
        const newSystem = {
          id: gradingSystems.length + 1,
          name: systemFormData.name,
          description: systemFormData.description,
          isActive: systemFormData.isActive,
          classes: systemFormData.classes,
          grades: [],
        }
        setGradingSystems([...gradingSystems, newSystem])
        setSnackbar({
          open: true,
          message: "Grading system created successfully!",
          severity: "success",
        })
      }
      setLoading(false)
      handleCloseSystemDialog()
    }, 1000)
  }

  const handleSubmitGrade = () => {
    setLoading(true)
    setTimeout(() => {
      const currentSystem = gradingSystems[selectedTab]

      if (editGrade) {
        // Update existing grade
        const updatedGrades = currentSystem.grades.map((grade) =>
          grade.id === editGrade.id ? { ...grade, ...gradeFormData } : grade,
        )

        const updatedSystems = gradingSystems.map((system, index) =>
          index === selectedTab ? { ...system, grades: updatedGrades } : system,
        )

        setGradingSystems(updatedSystems)
        setSnackbar({
          open: true,
          message: "Grade updated successfully!",
          severity: "success",
        })
      } else {
        // Add new grade
        const newGrade = {
          id: currentSystem.grades.length + 1,
          ...gradeFormData,
        }

        const updatedSystems = gradingSystems.map((system, index) =>
          index === selectedTab ? { ...system, grades: [...system.grades, newGrade] } : system,
        )

        setGradingSystems(updatedSystems)
        setSnackbar({
          open: true,
          message: "Grade created successfully!",
          severity: "success",
        })
      }

      setLoading(false)
      handleCloseGradeDialog()
    }, 1000)
  }

  const handleDeleteSystem = (id: number) => {
    setGradingSystems(gradingSystems.filter((system) => system.id !== id))
    setSnackbar({
      open: true,
      message: "Grading system deleted successfully!",
      severity: "success",
    })
  }

  const handleDeleteGrade = (id: number) => {
    const currentSystem = gradingSystems[selectedTab]
    const updatedGrades = currentSystem.grades.filter((grade) => grade.id !== id)

    const updatedSystems = gradingSystems.map((system, index) =>
      index === selectedTab ? { ...system, grades: updatedGrades } : system,
    )

    setGradingSystems(updatedSystems)
    setSnackbar({
      open: true,
      message: "Grade deleted successfully!",
      severity: "success",
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4, alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => router.push("/dashboard/admin/exams")} sx={{ mr: 2, bgcolor: "rgba(0,0,0,0.04)" }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Grading System
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<PrintIcon />} sx={{ borderRadius: 2 }} onClick={() => window.print()}>
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenSystemDialog()}
            sx={{
              bgcolor: theme.palette.primary.main,
              borderRadius: 2,
              boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)",
            }}
          >
            Add Grading System
          </Button>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          mb: 4,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {gradingSystems.map((system, index) => (
              <Tab
                key={system.id}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {system.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                      <Chip
                        label={system.isActive ? "Active" : "Inactive"}
                        size="small"
                        color={system.isActive ? "success" : "default"}
                        sx={{ height: 20 }}
                      />
                    </Box>
                  </Box>
                }
                sx={{ textTransform: "none", minHeight: 72, py: 1 }}
              />
            ))}
          </Tabs>
        </Box>

        {gradingSystems.length > 0 && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, alignItems: "center" }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {gradingSystems[selectedTab].name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {gradingSystems[selectedTab].description}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  size="small"
                  onClick={() => handleOpenSystemDialog(gradingSystems[selectedTab])}
                >
                  Edit System
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  size="small"
                  onClick={() => handleOpenGradeDialog()}
                >
                  Add Grade
                </Button>
              </Box>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Grade</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Min Marks</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Max Marks</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>GPA</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Remarks</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gradingSystems[selectedTab].grades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell>
                        <Chip
                          label={grade.name}
                          color={
                            grade.name === "A+" || grade.name === "Mumtaz"
                              ? "success"
                              : grade.name === "F" || grade.name === "Rasib"
                                ? "error"
                                : "default"
                          }
                        />
                      </TableCell>
                      <TableCell>{grade.minMarks}</TableCell>
                      <TableCell>{grade.maxMarks}</TableCell>
                      <TableCell>{grade.gpa.toFixed(1)}</TableCell>
                      <TableCell>{grade.remarks}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton onClick={() => handleOpenGradeDialog(grade)} size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDeleteGrade(grade.id)} size="small" color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>

      {/* Create/Edit Grading System Dialog */}
      <Dialog open={openDialog} onClose={handleCloseSystemDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {editSystem ? "Edit Grading System" : "Create New Grading System"}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="System Name"
                fullWidth
                value={systemFormData.name}
                onChange={handleSystemInputChange}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                value={systemFormData.description}
                onChange={handleSystemInputChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Applicable Classes</InputLabel>
                <Select
                  name="classes"
                  multiple
                  value={systemFormData.classes}
                  label="Applicable Classes"
                  onChange={handleSelectChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {availableClasses.map((cls) => (
                    <MenuItem key={cls} value={cls}>
                      {cls}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch checked={systemFormData.isActive} onChange={handleSwitchChange} color="primary" />}
                label="Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseSystemDialog} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitSystem}
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? "Saving..." : editSystem ? "Update System" : "Create System"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create/Edit Grade Dialog */}
      <Dialog open={openGradeDialog} onClose={handleCloseGradeDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {editGrade ? "Edit Grade" : "Add New Grade"}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Grade Name"
                fullWidth
                value={gradeFormData.name}
                onChange={handleGradeInputChange}
                
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="minMarks"
                label="Minimum Marks"
                type="number"
                fullWidth
                value={gradeFormData.minMarks}
                onChange={handleGradeInputChange}
                
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="maxMarks"
                label="Maximum Marks"
                type="number"
                fullWidth
                value={gradeFormData.maxMarks}
                onChange={handleGradeInputChange}
                
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="gpa"
                label="GPA"
                type="number"
                fullWidth
                value={gradeFormData.gpa}
                onChange={handleGradeInputChange}
                
                inputProps={{ step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="remarks"
                label="Remarks"
                fullWidth
                value={gradeFormData.remarks}
                onChange={handleGradeInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseGradeDialog} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitGrade}
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? "Saving..." : editGrade ? "Update Grade" : "Add Grade"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default GradingPage
