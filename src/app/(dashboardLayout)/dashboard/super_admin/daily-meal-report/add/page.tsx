"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  FormControl,
  TextField,
  Stack,
  Avatar,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
  Switch,
  Checkbox,
  OutlinedInput,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from "@mui/material"
import {
  CalendarMonth,
  Save,
  RestaurantMenu,
  ArrowBack,
  CheckCircle,
  Cancel,
  Search,
  FilterList,
  AccessTime,
  FreeBreakfast,
  LunchDining,
  DinnerDining,
  Close,
  Edit,
} from "@mui/icons-material"

// Sample data based on the provided meal sheet
const students = [
  { id: 1, name: "Neshar Ahmad", designation: "Chairman", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Naim Osmani", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Imtiaz Rassel", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Junayedul Islam", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 5, name: "Ashraful Haq", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 6, name: "A.N.M. Talha", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 7, name: "Ahmad Ha. Talha", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 8, name: "Nahidul Islam", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 9, name: "Muhammad Tamim", designation: "Teacher", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 10, name: "Shahin", designation: "Cook", avatar: "/placeholder.svg?height=40&width=40" },
]

// Meal types
const mealTypes = ["Breakfast", "Lunch", "Dinner"]

// Meal time mapping
const mealTimeMap = {
  Breakfast: "7:30 AM",
  Lunch: "1:00 PM",
  Dinner: "8:00 PM",
}

// Meal icon mapping
const mealIconMap = {
  Breakfast: <FreeBreakfast sx={{ fontSize: 20 }} />,
  Lunch: <LunchDining sx={{ fontSize: 20 }} />,
  Dinner: <DinnerDining sx={{ fontSize: 20 }} />,
}

export default function MealReportAdd() {
  const [date, setDate] = useState<Date | null>(new Date())
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>(mealTypes) // All meal types selected by default
  const [selectedStudents, setSelectedStudents] = useState<Record<number, boolean>>({})
  // Track individual meal selections for each student
  const [studentMeals, setStudentMeals] = useState<Record<number, string[]>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [selectAll, setSelectAll] = useState(true) // Select all by default
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [filteredStudents, setFilteredStudents] = useState(students)
  const [filterDesignation, setFilterDesignation] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<number | null>(null)
  const [tempSelectedMeals, setTempSelectedMeals] = useState<string[]>([])

  // Initialize selected students - all selected by default with all meals
  useEffect(() => {
    const initialSelection: Record<number, boolean> = {}
    const initialMeals: Record<number, string[]> = {}

    students.forEach((student) => {
      initialSelection[student.id] = true // All selected by default
      initialMeals[student.id] = [...mealTypes] // All meals selected by default
    })

    setSelectedStudents(initialSelection)
    setStudentMeals(initialMeals)
  }, [])

  // Handle search and filtering
  useEffect(() => {
    let filtered = students

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply designation filter
    if (filterDesignation) {
      filtered = filtered.filter((student) => student.designation === filterDesignation)
    }

    setFilteredStudents(filtered)
  }, [searchQuery, filterDesignation])

  // Toggle individual student selection
  const toggleStudent = (studentId: number) => {
    setSelectedStudents((prev) => {
      const newState = {
        ...prev,
        [studentId]: !prev[studentId],
      }

      // If toggling to selected and no meals are selected, select all meals
      if (newState[studentId] && (!studentMeals[studentId] || studentMeals[studentId].length === 0)) {
        setStudentMeals((prevMeals) => ({
          ...prevMeals,
          [studentId]: [...selectedMealTypes],
        }))
      }

      return newState
    })
  }

  // Open meal selection dialog for a student
  const openMealDialog = (studentId: number, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent toggling the student selection
    setCurrentStudent(studentId)
    setTempSelectedMeals(studentMeals[studentId] || [])
    setDialogOpen(true)
  }

  // Close meal selection dialog
  const closeMealDialog = () => {
    setDialogOpen(false)
    setCurrentStudent(null)
  }

  // Save meal selections from dialog
  const saveMealSelections = () => {
    if (currentStudent !== null) {
      // Update student meals
      setStudentMeals((prev) => ({
        ...prev,
        [currentStudent]: tempSelectedMeals,
      }))

      // If no meals selected, deselect the student
      if (tempSelectedMeals.length === 0) {
        setSelectedStudents((prev) => ({
          ...prev,
          [currentStudent]: false,
        }))
      } else {
        // Otherwise ensure the student is selected
        setSelectedStudents((prev) => ({
          ...prev,
          [currentStudent]: true,
        }))
      }

      closeMealDialog()
    }
  }

  // Toggle meal type in dialog
  const toggleMealType = (mealType: string) => {
    setTempSelectedMeals((prev) => {
      if (prev.includes(mealType)) {
        return prev.filter((type) => type !== mealType)
      } else {
        return [...prev, mealType]
      }
    })
  }

  // Handle select all toggle
  const handleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)

    const updatedSelection = { ...selectedStudents }
    const updatedMeals = { ...studentMeals }

    filteredStudents.forEach((student) => {
      updatedSelection[student.id] = newSelectAll
      if (newSelectAll) {
        updatedMeals[student.id] = [...selectedMealTypes]
      } else {
        updatedMeals[student.id] = []
      }
    })

    setSelectedStudents(updatedSelection)
    setStudentMeals(updatedMeals)
  }

  // Handle meal type selection for all students
  const handleMealTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string[]
    setSelectedMealTypes(value)

    // Update all selected students to have these meal types
    const updatedMeals = { ...studentMeals }
    Object.keys(selectedStudents).forEach((studentId) => {
      if (selectedStudents[Number(studentId)]) {
        updatedMeals[Number(studentId)] = [...value]
      }
    })

    setStudentMeals(updatedMeals)
  }

  // Count selected students
  const countSelected = () => {
    return Object.values(selectedStudents).filter(Boolean).length
  }

  // Count total meals
  const countTotalMeals = () => {
    let total = 0
    Object.keys(studentMeals).forEach((studentId) => {
      if (selectedStudents[Number(studentId)]) {
        total += studentMeals[Number(studentId)].length
      }
    })
    return total
  }

  // Handle save
  const handleSave = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)

      // Reset form after successful save
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }, 1500)
  }

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return ""
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }

  // Get unique designations for filter
  const designations = Array.from(new Set(students.map((s) => s.designation)))

  // Render meal icons for a student
  const renderStudentMealIcons = (studentId: number) => {
    const meals = studentMeals[studentId] || []

    return (
      <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
        {meals.map((meal) => (
          <Tooltip key={meal} title={meal}>
            {mealIconMap[meal as keyof typeof mealIconMap]}
          </Tooltip>
        ))}
      </Stack>
    )
  }

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
              <Typography variant="subtitle1">Add Daily Meal Report</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
              >
                Back to Reports
              </Button>
            </Grid>
          </Grid>
        </Box>

        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Select Date"
                type="date"
                fullWidth
                variant="outlined"
                value={date ? date.toISOString().split("T")[0] : ""}
                onChange={(e) => {
                  const newDate = e.target.value ? new Date(e.target.value) : null
                  setDate(newDate)
                }}
                InputProps={{
                  startAdornment: <CalendarMonth sx={{ mr: 1, color: "text.secondary" }} />,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Default Meal Types</InputLabel>
                <Select
                  multiple
                  value={selectedMealTypes}
                  onChange={(e) => handleMealTypeChange(e as any)}
                  input={<OutlinedInput label="Default Meal Types" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          size="small"
                          icon={mealIconMap[value as keyof typeof mealIconMap]}
                        />
                      ))}
                    </Box>
                  )}
                  startAdornment={<RestaurantMenu sx={{ mr: 1, color: "text.secondary" }} />}
                >
                  {mealTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      <Checkbox checked={selectedMealTypes.indexOf(type) > -1} />
                      <ListItemText primary={type} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 2, borderRadius: 2, bgcolor: "#f5f5f5", height: "100%" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "#3f51b5", width: 40, height: 40 }}>
                    <Typography variant="h6">{countSelected()}</Typography>
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Students Selected
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {countSelected()} / {students.length}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                      Total Meals: {countTotalMeals()}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Date and Meal Summary */}
      <Card elevation={2} sx={{ mb: 4, borderRadius: 2, bgcolor: "#e8eaf6" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CalendarMonth sx={{ fontSize: 24, color: "#3f51b5" }} />
                <Typography variant="h6">{formatDate(date)}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Default Meal Types:
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {selectedMealTypes.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    icon={mealIconMap[type as keyof typeof mealIconMap]}
                    sx={{ bgcolor: "#fff", mb: 1 }}
                  />
                ))}
              </Stack>
              <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mt: 1 }}>
                {selectedMealTypes.map((type) => (
                  <Chip
                    key={`time-${type}`}
                    label={`${type}: ${mealTimeMap[type as keyof typeof mealTimeMap]}`}
                    size="small"
                    icon={<AccessTime sx={{ fontSize: 16 }} />}
                    sx={{ bgcolor: "#fff", mb: 1 }}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <TextField
          placeholder="Search by name..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
          }}
          sx={{ width: 300 }}
        />
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
            color={showFilters ? "primary" : "inherit"}
          >
            Filter
          </Button>
          <FormControlLabel
            control={<Switch checked={selectAll} onChange={handleSelectAll} color="primary" />}
            label="Select All"
          />
        </Stack>
      </Box>

      {/* Filters */}
      {showFilters && (
        <Card sx={{ mb: 3, p: 2, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Filter by Designation</InputLabel>
                <Select
                  value={filterDesignation || ""}
                  onChange={(e) => setFilterDesignation(e.target.value || null)}
                  label="Filter by Designation"
                >
                  <MenuItem value="">All Designations</MenuItem>
                  {designations.map((designation) => (
                    <MenuItem key={designation} value={designation}>
                      {designation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      )}

      {/* Students List */}
      <Card elevation={3} sx={{ borderRadius: 2, overflow: "hidden", mb: 4 }}>
        <Box sx={{ p: 2, bgcolor: "#3f51b5", color: "white" }}>
          <Typography variant="h6">
            Student Selection
            <Typography component="span" variant="body2" sx={{ ml: 2 }}>
              (Click on a student to toggle selection, click edit icon to customize meals)
            </Typography>
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ maxHeight: "400px", overflow: "auto", p: 2 }}>
          <Grid container spacing={2}>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={student.id}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      cursor: "pointer",
                      border: selectedStudents[student.id] ? "2px solid #3f51b5" : "1px solid #e0e0e0",
                      bgcolor: selectedStudents[student.id] ? "rgba(63, 81, 181, 0.1)" : "white",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        boxShadow: 3,
                        bgcolor: "rgba(63, 81, 181, 0.05)",
                      },
                      position: "relative",
                    }}
                    onClick={() => toggleStudent(student.id)}
                  >
                    {/* Edit button for meal customization */}
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "rgba(255,255,255,0.8)",
                        "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                      }}
                      onClick={(e) => openMealDialog(student.id, e)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={student.avatar} sx={{ width: 50, height: 50 }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {student.name}
                        </Typography>
                        <Chip
                          label={student.designation}
                          size="small"
                          sx={{
                            bgcolor:
                              student.designation === "Chairman"
                                ? "#e3f2fd"
                                : student.designation === "Teacher"
                                  ? "#e8f5e9"
                                  : "#fff3e0",
                            color:
                              student.designation === "Chairman"
                                ? "#1976d2"
                                : student.designation === "Teacher"
                                  ? "#2e7d32"
                                  : "#e65100",
                          }}
                        />
                        {selectedStudents[student.id] && (
                          <Box sx={{ mt: 1 }}>
                            {renderStudentMealIcons(student.id)}
                            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                              {(studentMeals[student.id] || []).length} meals
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      {selectedStudents[student.id] ? (
                        <CheckCircle sx={{ color: "#4caf50", fontSize: 24 }} />
                      ) : (
                        <Cancel sx={{ color: "#f44336", fontSize: 24 }} />
                      )}
                    </Stack>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <Typography variant="h6" color="text.secondary">
                    No students found matching your criteria
                  </Typography>
                  <Button
                    variant="text"
                    onClick={() => {
                      setSearchQuery("")
                      setFilterDesignation(null)
                    }}
                    sx={{ mt: 2 }}
                  >
                    Clear Filters
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Card>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 4 }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            // Reset form to default values (all selected)
            setDate(new Date())
            setSelectedMealTypes(mealTypes)
            const resetSelection: Record<number, boolean> = {}
            const resetMeals: Record<number, string[]> = {}
            students.forEach((student) => {
              resetSelection[student.id] = true
              resetMeals[student.id] = [...mealTypes]
            })
            setSelectedStudents(resetSelection)
            setStudentMeals(resetMeals)
            setSelectAll(true)
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
          onClick={handleSave}
          disabled={loading || countSelected() === 0}
          sx={{
            minWidth: 150,
            bgcolor: "#3f51b5",
            "&:hover": {
              bgcolor: "#303f9f",
            },
          }}
        >
          {loading ? "Saving..." : "Save Report"}
        </Button>
      </Box>

      {/* Legend */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CheckCircle sx={{ color: "#4caf50" }} />
          <Typography variant="body2">Selected</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Cancel sx={{ color: "#f44336" }} />
          <Typography variant="body2">Not Selected</Typography>
        </Box>
        {mealTypes.map((type) => (
          <Box key={type} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {mealIconMap[type as keyof typeof mealIconMap]}
            <Typography variant="body2">{type}</Typography>
          </Box>
        ))}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Edit fontSize="small" />
          <Typography variant="body2">Edit Meals</Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Craft International Institute. All rights reserved.
        </Typography>
      </Box>

      {/* Success Notification */}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Meal report successfully saved!
        </Alert>
      </Snackbar>

      {/* Meal Selection Dialog */}
      <Dialog open={dialogOpen} onClose={closeMealDialog} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Edit Meals</Typography>
          <IconButton onClick={closeMealDialog} size="small">
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {currentStudent !== null && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                {students.find((s) => s.id === currentStudent)?.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Select which meals this person will eat:
              </Typography>

              <Box sx={{ mt: 2 }}>
                {mealTypes.map((type) => (
                  <FormControlLabel
                    key={type}
                    control={
                      <Checkbox
                        checked={tempSelectedMeals.includes(type)}
                        onChange={() => toggleMealType(type)}
                        icon={<Box sx={{ opacity: 0.5 }}>{mealIconMap[type as keyof typeof mealIconMap]}</Box>}
                        checkedIcon={mealIconMap[type as keyof typeof mealIconMap]}
                      />
                    }
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography>{type}</Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                          ({mealTimeMap[type as keyof typeof mealTimeMap]})
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </Box>

              <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                <Typography variant="body2">
                  Selected meals: <strong>{tempSelectedMeals.length}</strong>
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  {tempSelectedMeals.map((meal) => (
                    <Chip key={meal} label={meal} size="small" icon={mealIconMap[meal as keyof typeof mealIconMap]} />
                  ))}
                </Stack>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeMealDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={saveMealSelections} variant="contained" color="primary" disabled={currentStudent === null}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
