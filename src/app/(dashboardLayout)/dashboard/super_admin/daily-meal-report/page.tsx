"use client"
import { useState } from "react"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Stack,
  Avatar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Container,
  Alert,
  Snackbar,
  InputAdornment,
} from "@mui/material"
import {
  CalendarMonth,
  Print,
  FileDownload,
  FilterList,
  Search,
  CheckCircle,
  Cancel,
  Restaurant,
  NavigateBefore,
  NavigateNext,
  AddCircleOutline,
  FreeBreakfast,
  Fastfood,
  DinnerDining,
  Close,
  Help,
  Save,
  ArrowBack,
  Settings,
} from "@mui/icons-material"
import type { SelectChangeEvent } from "@mui/material/Select"
import Link from "next/link"

// Generate days of month
const getDaysInMonth = (month: number, year: number) => {
  return new Array(new Date(year, month, 0).getDate()).fill(null).map((_, i) => i + 1)
}

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

export default function MealReport() {
  const [month, setMonth] = useState<number>(4) // April
  const [year, setYear] = useState<number>(2025)
  const [mealData, setMealData] = useState(() => {
    const data: Record<number, Record<number, { eaten: boolean; type: string[] }>> = {}

    students.forEach((student) => {
      data[student.id] = {}
      getDaysInMonth(4, 2025).forEach((day) => {
        const eaten = Math.random() > 0.3
        const types = []
        if (eaten) {
          if (Math.random() > 0.3) types.push("breakfast")
          if (Math.random() > 0.3) types.push("lunch")
          if (Math.random() > 0.3) types.push("dinner")
          // Ensure at least one meal type if eaten is true
          if (types.length === 0) types.push(["breakfast", "lunch", "dinner"][Math.floor(Math.random() * 3)])
        }
        data[student.id][day] = { eaten, type: types }
      })
    })

    return data
  })

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [tempMealTypes, setTempMealTypes] = useState<string[]>([])
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })

  const days = getDaysInMonth(month, year)
  const totalDays = days.length

  // Calculate total meals for each student
  const calculateTotalMeals = (studentId: number) => {
    return days.reduce((total, day) => total + (mealData[studentId][day].eaten ? 1 : 0), 0)
  }

  // Calculate total meals for each day
  const calculateDailyTotal = (day: number) => {
    return students.reduce((total, student) => total + (mealData[student.id][day].eaten ? 1 : 0), 0)
  }

  // Calculate grand total of all meals
  const calculateGrandTotal = () => {
    return students.reduce((total, student) => total + calculateTotalMeals(student.id), 0)
  }

  // Calculate meal type statistics
  const calculateMealTypeStats = () => {
    let breakfast = 0
    let lunch = 0
    let dinner = 0

    students.forEach((student) => {
      days.forEach((day) => {
        const mealInfo = mealData[student.id][day]
        if (mealInfo.eaten) {
          if (mealInfo.type.includes("breakfast")) breakfast++
          if (mealInfo.type.includes("lunch")) lunch++
          if (mealInfo.type.includes("dinner")) dinner++
        }
      })
    })

    return { breakfast, lunch, dinner }
  }

  const mealStats = calculateMealTypeStats()

  // Open meal update modal
  const openMealModal = (studentId: number, day: number) => {
    setSelectedStudent(studentId)
    setSelectedDay(day)
    setTempMealTypes([...mealData[studentId][day].type])
    setModalOpen(true)
  }

  // Handle meal type checkbox change
  const handleMealTypeChange = (mealType: string) => {
    setTempMealTypes((prev) => {
      if (prev.includes(mealType)) {
        return prev.filter((type) => type !== mealType)
      } else {
        return [...prev, mealType]
      }
    })
  }

  // Save meal updates
  const saveMealUpdates = () => {
    if (selectedStudent !== null && selectedDay !== null) {
      setMealData((prev) => ({
        ...prev,
        [selectedStudent]: {
          ...prev[selectedStudent],
          [selectedDay]: {
            eaten: tempMealTypes.length > 0,
            type: tempMealTypes,
          },
        },
      }))
      setModalOpen(false)
      setSnackbar({
        open: true,
        message: "Meal updated successfully!",
        severity: "success",
      })
    }
  }

  // Toggle meal status (now opens the modal)
  const toggleMeal = (studentId: number, day: number) => {
    openMealModal(studentId, day)
  }

  // Add this function to render meal type indicators:
  const renderMealTypeIndicator = (studentId: number, day: number) => {
    const mealInfo = mealData[studentId][day]

    if (!mealInfo.eaten) {
      return <Cancel sx={{ color: "#f44336", fontSize: 18 }} />
    }

    return (
      <Tooltip
        title={
          <div>
            {mealInfo.type.includes("breakfast") && <div>Breakfast</div>}
            {mealInfo.type.includes("lunch") && <div>Lunch</div>}
            {mealInfo.type.includes("dinner") && <div>Dinner</div>}
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CheckCircle sx={{ color: "#4caf50", fontSize: 18 }} />
          {mealInfo.type.length > 0 && (
            <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>
              {mealInfo.type.length}
            </Typography>
          )}
        </div>
      </Tooltip>
    )
  }

  // Handle month change
  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setMonth(Number(event.target.value))
  }

  // Get month name
  const getMonthName = (monthNumber: number) => {
    const date = new Date()
    date.setMonth(monthNumber - 1)
    return date.toLocaleString("en-US", { month: "long" })
  }

  // Navigate to previous month
  const prevMonth = () => {
    if (month === 1) {
      setMonth(12)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  // Navigate to next month
  const nextMonth = () => {
    if (month === 12) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  // Get student name by ID
  const getStudentName = (id: number) => {
    const student = students.find((s) => s.id === id)
    return student ? student.name : ""
  }

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }

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
          background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
          color: "white",
          py: 3,
          mb: 4,
          borderRadius: { xs: 0, md: "0 0 20px 20px" },
          boxShadow: "0 4px 20px rgba(63, 81, 181, 0.4)",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Restaurant sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              Residential Meal Sheet
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 700 }}>
            Track and manage daily meals for all residents. Click on any cell to update meal information.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Box sx={{ mb: 3 }}>
          <Link href="/dashboard" passHref>
            <Button
              startIcon={<ArrowBack />}
              variant="outlined"
              sx={{
                borderRadius: 100,
                borderColor: "rgba(0,0,0,0.12)",
                color: "text.secondary",
                px: 3,
              }}
            >
              Back to Dashboard
            </Button>
          </Link>
        </Box>

        {/* Date Navigation and Controls */}
        <Card
          elevation={3}
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarMonth sx={{ color: "#3f51b5", mr: 2, fontSize: 28 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Select Month & Year
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Navigate between months to view different meal records
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent={{ xs: "center", md: "flex-end" }}
                >
                  <IconButton
                    color="primary"
                    onClick={prevMonth}
                    sx={{ bgcolor: "rgba(63, 81, 181, 0.1)", "&:hover": { bgcolor: "rgba(63, 81, 181, 0.2)" } }}
                  >
                    <NavigateBefore />
                  </IconButton>

                  <FormControl
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 150, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  >
                    <InputLabel id="month-select-label">Month</InputLabel>
                    <Select
                      labelId="month-select-label"
                      id="month-select"
                      value={month}
                      onChange={handleMonthChange}
                      label="Month"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <MenuItem key={m} value={m}>
                          {getMonthName(m)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      bgcolor: "rgba(63, 81, 181, 0.1)",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      minWidth: 80,
                      textAlign: "center",
                    }}
                  >
                    {year}
                  </Typography>

                  <IconButton
                    color="primary"
                    onClick={nextMonth}
                    sx={{ bgcolor: "rgba(63, 81, 181, 0.1)", "&:hover": { bgcolor: "rgba(63, 81, 181, 0.2)" } }}
                  >
                    <NavigateNext />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 4,
                height: "100%",
                background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#2196f3",
                      width: 48,
                      height: 48,
                      boxShadow: "0 4px 8px rgba(33, 150, 243, 0.3)",
                    }}
                  >
                    <Restaurant />
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Meals
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {calculateGrandTotal()}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total meals served this month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 4,
                height: "100%",
                background: "linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#ff9800",
                      width: 48,
                      height: 48,
                      boxShadow: "0 4px 8px rgba(255, 152, 0, 0.3)",
                    }}
                  >
                    <FreeBreakfast />
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Breakfast
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {mealStats.breakfast}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total breakfast meals served
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 4,
                height: "100%",
                background: "linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#2196f3",
                      width: 48,
                      height: 48,
                      boxShadow: "0 4px 8px rgba(33, 150, 243, 0.3)",
                    }}
                  >
                    <Fastfood />
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Lunch
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {mealStats.lunch}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total lunch meals served
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 4,
                height: "100%",
                background: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#9c27b0",
                      width: 48,
                      height: 48,
                      boxShadow: "0 4px 8px rgba(156, 39, 176, 0.3)",
                    }}
                  >
                    <DinnerDining />
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Dinner
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {mealStats.dinner}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total dinner meals served
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Actions */}
        <Card
          elevation={3}
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search by name..."
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2 },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={{ xs: "center", md: "flex-end" }}
                  sx={{ width: "100%" }}
                >
                  <Button variant="outlined" startIcon={<FilterList />} sx={{ borderRadius: 100, px: 3 }}>
                    Filter
                  </Button>
                  <Button variant="outlined" startIcon={<Print />} sx={{ borderRadius: 100, px: 3 }}>
                    Print
                  </Button>
                  <Button variant="outlined" startIcon={<FileDownload />} sx={{ borderRadius: 100, px: 3 }}>
                    Export
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    component={Link}
                    href="/dashboard/super_admin/daily-meal-report/add"
                    sx={{
                      borderRadius: 100,
                      px: 3,
                      background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
                      boxShadow: "0 4px 10px rgba(63, 81, 181, 0.3)",
                    }}
                  >
                    Add Meal Report
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Help Card */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 4,
            background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Help sx={{ color: "#2e7d32", mt: 0.5 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ color: "#2e7d32", fontWeight: 600 }}>
              Quick Help
            </Typography>
            <Typography variant="body2" sx={{ color: "#1b5e20" }}>
              Click on any cell in the table to update meal information. You can specify which meals (breakfast, lunch,
              dinner) were taken by each resident. The number shown in each cell indicates how many meals were taken
              that day.
            </Typography>
          </Box>
        </Paper>

        {/* Meal Table */}
        <Card
          elevation={3}
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <Box sx={{ p: { xs: 1, md: 2 } }}>
            <TableContainer sx={{ borderRadius: 2, overflow: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        bgcolor: "#3f51b5",
                        color: "white",
                        fontWeight: "bold",
                        minWidth: 5,
                        padding: "10px 4px",
                      }}
                    >
                      SL
                    </TableCell>
                    <TableCell
                      sx={{
                        bgcolor: "#3f51b5",
                        color: "white",
                        fontWeight: "bold",
                        minWidth: 127,
                        padding: "10px 8px",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        bgcolor: "#3f51b5",
                        color: "white",
                        fontWeight: "bold",
                        minWidth: 50,
                        padding: "10px 8px",
                      }}
                    >
                      Designation
                    </TableCell>
                    {days.map((day) => (
                      <TableCell
                        key={day}
                        align="center"
                        sx={{
                          bgcolor: "#3f51b5",
                          color: "white",
                          fontWeight: "bold",
                          padding: "10px 3px",
                          position: "relative",
                        }}
                      >
                        <Box sx={{ position: "relative" }}>
                          {day}
                          <Typography
                            variant="caption"
                            sx={{
                              position: "absolute",
                              top: -8,
                              right: -8,
                              bgcolor: "rgba(255,255,255,0.2)",
                              px: 0.5,
                              borderRadius: 5,
                              fontSize: "0.6rem",
                            }}
                          >
                            {calculateDailyTotal(day)}
                          </Typography>
                        </Box>
                      </TableCell>
                    ))}
                    <TableCell
                      sx={{
                        bgcolor: "#3f51b5",
                        color: "white",
                        fontWeight: "bold",
                        minWidth: 80,
                        padding: "10px 8px",
                      }}
                    >
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow
                      key={student.id}
                      sx={{
                        "&:nth-of-type(odd)": { bgcolor: "rgba(63, 81, 181, 0.05)" },
                        "&:hover": { bgcolor: "rgba(63, 81, 181, 0.1)" },
                        transition: "background-color 0.2s",
                      }}
                    >
                      <TableCell sx={{ padding: "8px 5px" }}>{index + 1}</TableCell>
                      <TableCell sx={{ padding: "8px 8px" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Avatar
                            src={student.avatar}
                            sx={{ width: 28, height: 28, display: { xs: "none", md: "flex" } }}
                          />
                          <Typography variant="body2" fontWeight="medium">
                            {student.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ padding: "8px 8px" }}>
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
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      {days.map((day) => (
                        <TableCell
                          key={day}
                          align="center"
                          onClick={() => toggleMeal(student.id, day)}
                          sx={{
                            padding: "8px 0px",
                            cursor: "pointer",
                            "&:hover": { bgcolor: "rgba(63, 81, 181, 0.2)" },
                            transition: "background-color 0.2s",
                            borderRadius: 1,
                          }}
                        >
                          {renderMealTypeIndicator(student.id, day)}
                        </TableCell>
                      ))}
                      <TableCell align="center" sx={{ padding: "8px 8px" }}>
                        <Chip
                          label={calculateTotalMeals(student.id)}
                          color="primary"
                          sx={{
                            fontWeight: "bold",
                            background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Summary Row */}
                  <TableRow
                    sx={{
                      bgcolor: "#e8eaf6",
                      "&:hover": { bgcolor: "#d1d9ff" },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell colSpan={3} sx={{ fontWeight: "bold", padding: "12px 8px" }}>
                      Daily Total
                    </TableCell>
                    {days.map((day) => (
                      <TableCell key={day} align="center" sx={{ fontWeight: "bold", padding: "12px 3px" }}>
                        <Chip
                          label={calculateDailyTotal(day)}
                          size="small"
                          sx={{
                            bgcolor: "rgba(63, 81, 181, 0.2)",
                            color: "#3f51b5",
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                    ))}
                    <TableCell align="center" sx={{ fontWeight: "bold", padding: "12px 8px" }}>
                      <Chip
                        label={calculateGrandTotal()}
                        color="primary"
                        sx={{
                          fontWeight: "bold",
                          background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
                          boxShadow: "0 2px 5px rgba(63, 81, 181, 0.3)",
                          px: 1,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Card>

        {/* Legend */}
        <Card
          elevation={2}
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Legend
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4} md={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircle sx={{ color: "#4caf50" }} />
                  <Typography variant="body2">Present</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Cancel sx={{ color: "#f44336" }} />
                  <Typography variant="body2">Absent</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FreeBreakfast sx={{ color: "#ff9800" }} />
                  <Typography variant="body2">Breakfast</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Fastfood sx={{ color: "#2196f3" }} />
                  <Typography variant="body2">Lunch</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <DinnerDining sx={{ color: "#9c27b0" }} />
                  <Typography variant="body2">Dinner</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="caption" sx={{ bgcolor: "#3f51b5", color: "white", px: 1, borderRadius: 1 }}>
                    3
                  </Typography>
                  <Typography variant="body2">Number of meals</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Meal Update Modal */}
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              overflow: "hidden",
            },
          }}
        >
          <DialogTitle
            sx={{
              background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Update Meal
              </Typography>
              {selectedStudent && selectedDay && (
                <Typography variant="subtitle2" component="div">
                  {getStudentName(selectedStudent)} - Day {selectedDay}
                </Typography>
              )}
            </Box>
            <IconButton edge="end" color="inherit" onClick={() => setModalOpen(false)} aria-label="close">
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 3 }}>
            <FormGroup>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Select meals taken:
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card
                    variant="outlined"
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      borderColor: tempMealTypes.includes("breakfast") ? "#ff9800" : "rgba(0,0,0,0.12)",
                      bgcolor: tempMealTypes.includes("breakfast") ? "rgba(255, 152, 0, 0.1)" : "transparent",
                      transition: "all 0.2s",
                      "&:hover": {
                        borderColor: "#ff9800",
                        bgcolor: "rgba(255, 152, 0, 0.05)",
                      },
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={tempMealTypes.includes("breakfast")}
                          onChange={() => handleMealTypeChange("breakfast")}
                          icon={<FreeBreakfast color="disabled" />}
                          checkedIcon={<FreeBreakfast sx={{ color: "#ff9800" }} />}
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography variant="subtitle2">Breakfast</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Morning meal
                          </Typography>
                        </Box>
                      }
                      sx={{ m: 0 }}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card
                    variant="outlined"
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      borderColor: tempMealTypes.includes("lunch") ? "#2196f3" : "rgba(0,0,0,0.12)",
                      bgcolor: tempMealTypes.includes("lunch") ? "rgba(33, 150, 243, 0.1)" : "transparent",
                      transition: "all 0.2s",
                      "&:hover": {
                        borderColor: "#2196f3",
                        bgcolor: "rgba(33, 150, 243, 0.05)",
                      },
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={tempMealTypes.includes("lunch")}
                          onChange={() => handleMealTypeChange("lunch")}
                          icon={<Fastfood color="disabled" />}
                          checkedIcon={<Fastfood sx={{ color: "#2196f3" }} />}
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography variant="subtitle2">Lunch</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Midday meal
                          </Typography>
                        </Box>
                      }
                      sx={{ m: 0 }}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card
                    variant="outlined"
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      borderColor: tempMealTypes.includes("dinner") ? "#9c27b0" : "rgba(0,0,0,0.12)",
                      bgcolor: tempMealTypes.includes("dinner") ? "rgba(156, 39, 176, 0.1)" : "transparent",
                      transition: "all 0.2s",
                      "&:hover": {
                        borderColor: "#9c27b0",
                        bgcolor: "rgba(156, 39, 176, 0.05)",
                      },
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={tempMealTypes.includes("dinner")}
                          onChange={() => handleMealTypeChange("dinner")}
                          icon={<DinnerDining color="disabled" />}
                          checkedIcon={<DinnerDining sx={{ color: "#9c27b0" }} />}
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography variant="subtitle2">Dinner</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Evening meal
                          </Typography>
                        </Box>
                      }
                      sx={{ m: 0 }}
                    />
                  </Card>
                </Grid>
              </Grid>

              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "#f5f5f5",
                  borderRadius: 2,
                  border: "1px dashed rgba(0,0,0,0.12)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Settings fontSize="small" color="action" />
                  <Typography variant="subtitle2">Meal Summary</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Total meals selected: <strong>{tempMealTypes.length}</strong>
                </Typography>
                {tempMealTypes.length === 0 && (
                  <Alert severity="warning" sx={{ mt: 1 }}>
                    Selecting no meals will mark the student as absent for this day.
                  </Alert>
                )}
              </Box>
            </FormGroup>
          </DialogContent>
          <DialogActions sx={{ p: 2, bgcolor: "#f9f9f9" }}>
            <Button
              onClick={() => setModalOpen(false)}
              variant="outlined"
              startIcon={<Close />}
              sx={{ borderRadius: 100, px: 3 }}
            >
              Cancel
            </Button>
            <Button
              onClick={saveMealUpdates}
              variant="contained"
              startIcon={<Save />}
              sx={{
                borderRadius: 100,
                px: 3,
                background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
                boxShadow: "0 4px 10px rgba(63, 81, 181, 0.3)",
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Footer */}
        <Box sx={{ mt: 4, textAlign: "center", pb: 4 }}>
          <Typography variant="body2" color="text.secondary">
            © {year} Craft International Institute. All rights reserved.
          </Typography>
        </Box>

        {/* Snackbar for notifications */}
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  )
}
