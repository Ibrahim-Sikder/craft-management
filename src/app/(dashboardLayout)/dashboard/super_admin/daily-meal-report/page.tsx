/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState, useEffect, useMemo, useCallback } from "react"
import type React from "react"

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
  CircularProgress,
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
  School,
  Person,
  Edit,
  Delete,
  Warning,
} from "@mui/icons-material"
import type { SelectChangeEvent } from "@mui/material/Select"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  useGetAllMealReportsQuery,
  useUpdateMealReportMutation,
  useDeleteMealReportMutation,
} from "@/redux/api/mealReport"

// Define types for our data
interface MealParticipant {
  personId: {
    _id: string
    name: string
    displayId?: string
    studentId?: string
    teacherId?: string
    designation?: string
    className?: string
    section?: string
    professionalInfo?: {
      designation?: string
      department?: string
      staffType?: string
    }
  }
  mealTypes: string[]
  mealCount: number
  _id: string
}

interface MealReport {
  _id: string
  date: string
  students: MealParticipant[]
  teachers: MealParticipant[]
  createdAt: string
  updatedAt: string
}

interface MealReportResponse {
  success: boolean
  message: string
  data: {
    mealReports: MealReport[]
    meta: {
      page: number
      limit: number
      total: number
      totalPage: number
    }
  }
}

// Generate days of month
const getDaysInMonth = (month: number, year: number) => {
  return new Array(new Date(year, month, 0).getDate()).fill(null).map((_, i) => i + 1)
}

// Helper function to format date to YYYY-MM-DD
const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

// Helper function to get date from day of month
const getDateFromDay = (day: number, month: number, year: number): string => {
  const date = new Date(year, month - 1, day)
  return formatDate(date)
}

export default function MealReport() {
  const router = useRouter()
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1) // Current month
  const [year, setYear] = useState<number>(new Date().getFullYear()) // Current year
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPersons, setFilteredPersons] = useState<any[]>([])
  const [combinedPersons, setCombinedPersons] = useState<any[]>([])
  const [mealData, setMealData] = useState<Record<string, Record<number, { eaten: boolean; type: string[] }>>>({})
  const [loading, setLoading] = useState(true)
  const [reportIdMap, setReportIdMap] = useState<Record<number, string>>({}) // Map day to report ID

  // Modal states
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [tempMealTypes, setTempMealTypes] = useState<string[]>([])
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [reportToDelete, setReportToDelete] = useState<string | null>(null)

  // Fetch meal report data
  const {
    data: mealReportResponse,
    isLoading,
    refetch,
  } = useGetAllMealReportsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })

  // Update and delete mutations
  const [updateMealReport, { isLoading: isUpdating }] = useUpdateMealReportMutation()
  const [deleteMealReport, { isLoading: isDeleting }] = useDeleteMealReportMutation()

  // Memoize days to prevent unnecessary recalculations
  const days = useMemo(() => getDaysInMonth(month, year), [month, year])

  // Process meal report data
  useEffect(() => {
    if (mealReportResponse?.data?.mealReports) {
      // Extract all unique persons (students and teachers)
      const allPersons: any[] = []
      const mealDataMap: Record<string, Record<number, { eaten: boolean; type: string[] }>> = {}
      const dayToReportIdMap: Record<number, string> = {}

      // Process each meal report
      mealReportResponse.data.mealReports.forEach((report: MealReport) => {
        const reportDate = new Date(report.date)
        const reportDay = reportDate.getDate()
        const reportMonth = reportDate.getMonth() + 1
        const reportYear = reportDate.getFullYear()

        // Store report ID for each day
        if (reportMonth === month && reportYear === year) {
          dayToReportIdMap[reportDay] = report._id
        }

        // Only process reports for the selected month and year
        if (reportMonth === month && reportYear === year) {
          // Process students
          if (report.students && Array.isArray(report.students)) {
            report.students.forEach((student) => {
              if (!student.personId || typeof student.personId !== "object") return

              const personId = student.personId._id
              const personData = {
                id: personId,
                name: student.personId.name || "Unknown",
                displayId: student.personId.studentId || student.personId.displayId || "N/A",
                type: "student",
                designation:
                  `${student.personId.className || ""} ${student.personId.section || ""}`.trim() || "Student",
                avatar: "/assets/images/avatar-placeholder.png",
              }

              // Add person if not already in the list
              if (!allPersons.some((p) => p.id === personId)) {
                allPersons.push(personData)
              }

              // Initialize meal data for this person if not exists
              if (!mealDataMap[personId]) {
                mealDataMap[personId] = {}
              }

              // Map meal types from backend format to UI format
              const uiMealTypes = student.mealTypes.map((type) => {
                switch (type) {
                  case "BREAKFAST":
                    return "breakfast"
                  case "LUNCH":
                    return "lunch"
                  case "DINNER":
                    return "dinner"
                  default:
                    return type.toLowerCase()
                }
              })

              // Set meal data for this day
              mealDataMap[personId][reportDay] = {
                eaten: student.mealCount > 0,
                type: uiMealTypes,
              }
            })
          }

          // Process teachers
          if (report.teachers && Array.isArray(report.teachers)) {
            report.teachers.forEach((teacher) => {
              if (!teacher.personId || typeof teacher.personId !== "object") return

              const personId = teacher.personId._id
              const designation = teacher.personId.professionalInfo?.designation || "Teacher"

              const personData = {
                id: personId,
                name: teacher.personId.name || "Unknown",
                displayId: teacher.personId.teacherId || teacher.personId.displayId || "N/A",
                type: "teacher",
                designation: designation,
                avatar: "/assets/images/avatar-placeholder.png",
              }

              // Add person if not already in the list
              if (!allPersons.some((p) => p.id === personId)) {
                allPersons.push(personData)
              }

              // Initialize meal data for this person if not exists
              if (!mealDataMap[personId]) {
                mealDataMap[personId] = {}
              }

              // Map meal types from backend format to UI format
              const uiMealTypes = teacher.mealTypes.map((type) => {
                switch (type) {
                  case "BREAKFAST":
                    return "breakfast"
                  case "LUNCH":
                    return "lunch"
                  case "DINNER":
                    return "dinner"
                  default:
                    return type.toLowerCase()
                }
              })

              // Set meal data for this day
              mealDataMap[personId][reportDay] = {
                eaten: teacher.mealCount > 0,
                type: uiMealTypes,
              }
            })
          }
        }
      })

      // Initialize empty meal data for days without reports
      allPersons.forEach((person) => {
        if (!mealDataMap[person.id]) {
          mealDataMap[person.id] = {}
        }

        days.forEach((day) => {
          if (!mealDataMap[person.id][day]) {
            mealDataMap[person.id][day] = { eaten: false, type: [] }
          }
        })
      })

      setCombinedPersons(allPersons)
      setFilteredPersons(allPersons)
      setMealData(mealDataMap)
      setReportIdMap(dayToReportIdMap)
      setLoading(false)
    }
  }, [mealReportResponse, month, year, days])

  // Handle search - memoized to prevent unnecessary re-renders
  useEffect(() => {
    if (combinedPersons.length > 0 && searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase()
      const filtered = combinedPersons.filter(
        (person) =>
          person.name.toLowerCase().includes(lowercaseSearch) ||
          person.displayId.toLowerCase().includes(lowercaseSearch) ||
          person.designation.toLowerCase().includes(lowercaseSearch),
      )
      setFilteredPersons(filtered)
    } else if (combinedPersons.length > 0) {
      setFilteredPersons(combinedPersons)
    }
  }, [searchTerm, combinedPersons])

  // Memoized calculation functions to improve performance
  const calculateTotalMeals = useCallback(
    (personId: string) => {
      if (!mealData[personId]) return 0
      return days.reduce((total, day) => total + (mealData[personId][day]?.eaten ? 1 : 0), 0)
    },
    [mealData, days],
  )

  const calculateDailyTotal = useCallback(
    (day: number) => {
      return Object.keys(mealData).reduce((total, personId) => total + (mealData[personId][day]?.eaten ? 1 : 0), 0)
    },
    [mealData],
  )

  const calculateGrandTotal = useCallback(() => {
    return Object.keys(mealData).reduce((total, personId) => total + calculateTotalMeals(personId), 0)
  }, [mealData, calculateTotalMeals])

  // Memoize meal type statistics to prevent recalculation on every render
  const mealStats = useMemo(() => {
    let breakfast = 0
    let lunch = 0
    let dinner = 0

    Object.keys(mealData).forEach((personId) => {
      days.forEach((day) => {
        const mealInfo = mealData[personId][day]
        if (mealInfo?.eaten) {
          if (mealInfo.type.includes("breakfast")) breakfast++
          if (mealInfo.type.includes("lunch")) lunch++
          if (mealInfo.type.includes("dinner")) dinner++
        }
      })
    })

    return { breakfast, lunch, dinner }
  }, [mealData, days])

  // Open meal update modal - memoized to prevent unnecessary re-renders
  const openMealModal = useCallback(
    (personId: string, day: number) => {
      setSelectedPerson(personId)
      setSelectedDay(day)
      setTempMealTypes(mealData[personId]?.[day]?.type || [])
      setModalOpen(true)
    },
    [mealData],
  )

  // Handle meal type checkbox change - memoized to prevent unnecessary re-renders
  const handleMealTypeChange = useCallback((mealType: string) => {
    setTempMealTypes((prev) => {
      if (prev.includes(mealType)) {
        return prev.filter((type) => type !== mealType)
      } else {
        return [...prev, mealType]
      }
    })
  }, [])

  // Save meal updates - memoized to prevent unnecessary re-renders
  const saveMealUpdates = useCallback(async () => {
    if (selectedPerson !== null && selectedDay !== null) {
      try {
        const reportId = reportIdMap[selectedDay]

        if (!reportId) {
          setSnackbar({
            open: true,
            message: "No report found for this day. Please create a new report first.",
            severity: "error",
          })
          setModalOpen(false)
          return
        }

        // Find the selected person in the original data
        const person = combinedPersons.find((p) => p.id === selectedPerson)
        if (!person) {
          throw new Error("Person not found")
        }

        // Convert UI meal types to backend format
        const backendMealTypes = tempMealTypes.map((type) => {
          switch (type) {
            case "breakfast":
              return "BREAKFAST"
            case "lunch":
              return "LUNCH"
            case "dinner":
              return "DINNER"
            default:
              return type.toUpperCase()
          }
        })

        // Ensure at least one meal type is selected
        if (backendMealTypes.length === 0) {
          setSnackbar({
            open: true,
            message: "At least one meal type is required",
            severity: "error",
          })
          return
        }

        // Get the date for the selected day
        const selectedDate = getDateFromDay(selectedDay, month, year)

        // Prepare update data
        const updateData = {
          id: reportId,
          data: {
            // Include the date field required by the backend validation
            date: selectedDate,
            // We need to update either students or teachers array based on person type
            [person.type === "student" ? "students" : "teachers"]: [
              {
                personId: selectedPerson,
                mealTypes: backendMealTypes,
                mealCount: tempMealTypes.length,
              },
            ],
          },
        }
        console.log(updateData)

        // Call the update API
        const result = await updateMealReport(updateData).unwrap()
        console.log(result)
        // Validate the API response
        if (!result || !result.success) {
          throw new Error(result?.message || "Failed to update meal")
        }

        // Update local state with the selected meal types
        setMealData((prev) => ({
          ...prev,
          [selectedPerson]: {
            ...prev[selectedPerson],
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

        // Refresh data
        refetch()
      } catch (error) {
        console.error("Error updating meal:", error)
        setSnackbar({
          open: true,
          message: error instanceof Error ? error.message : "Failed to update meal. Please try again.",
          severity: "error",
        })
      }
    }
  }, [selectedPerson, selectedDay, reportIdMap, combinedPersons, tempMealTypes, updateMealReport, refetch, month, year])

  // Open delete confirmation dialog - memoized to prevent unnecessary re-renders
  const openDeleteDialog = useCallback((reportId: string) => {
    setReportToDelete(reportId)
    setDeleteDialogOpen(true)
  }, [])

  // Handle delete meal report - memoized to prevent unnecessary re-renders
  const handleDeleteReport = useCallback(async () => {
    if (reportToDelete) {
      try {
        await deleteMealReport(reportToDelete).unwrap()

        setSnackbar({
          open: true,
          message: "Meal report deleted successfully!",
          severity: "success",
        })

        // Refresh data
        refetch()
      } catch (error) {
        console.error("Error deleting meal report:", error)
        setSnackbar({
          open: true,
          message: "Failed to delete meal report. Please try again.",
          severity: "error",
        })
      } finally {
        setDeleteDialogOpen(false)
        setReportToDelete(null)
      }
    }
  }, [reportToDelete, deleteMealReport, refetch])

  // Toggle meal status (now opens the modal) - memoized to prevent unnecessary re-renders
  const toggleMeal = useCallback(
    (personId: string, day: number) => {
      openMealModal(personId, day)
    },
    [openMealModal],
  )

  // Navigate to update page - memoized to prevent unnecessary re-renders
  const navigateToUpdate = useCallback(
    (reportId: string) => {
      router.push(`/dashboard/super_admin/daily-meal-report/update/${reportId}`)
    },
    [router],
  )

  // Render meal type indicators - memoized to prevent unnecessary re-renders
  const renderMealTypeIndicator = useCallback(
    (personId: string, day: number) => {
      const mealInfo = mealData[personId]?.[day]

      if (!mealInfo || !mealInfo.eaten) {
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
    },
    [mealData],
  )

  // Handle month change - memoized to prevent unnecessary re-renders
  const handleMonthChange = useCallback((event: SelectChangeEvent<number>) => {
    setMonth(Number(event.target.value))
    setLoading(true)
  }, [])

  // Get month name - memoized to prevent unnecessary re-renders
  const getMonthName = useCallback((monthNumber: number) => {
    const date = new Date()
    date.setMonth(monthNumber - 1)
    return date.toLocaleString("en-US", { month: "long" })
  }, [])

  // Navigate to previous month - memoized to prevent unnecessary re-renders
  const prevMonth = useCallback(() => {
    if (month === 1) {
      setMonth(12)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
    setLoading(true)
  }, [month, year])

  // Navigate to next month - memoized to prevent unnecessary re-renders
  const nextMonth = useCallback(() => {
    if (month === 12) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
    setLoading(true)
  }, [month, year])

  // Get person name by ID - memoized to prevent unnecessary re-renders
  const getPersonName = useCallback(
    (id: string) => {
      const person = combinedPersons.find((p) => p.id === id)
      return person ? person.name : ""
    },
    [combinedPersons],
  )

  // Handle snackbar close - memoized to prevent unnecessary re-renders
  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }))
  }, [])

  // Get person type icon - memoized to prevent unnecessary re-renders
  const getPersonTypeIcon = useCallback((type: string) => {
    return type === "student" ? <School fontSize="small" /> : <Person fontSize="small" />
  }, [])

  // Get person type color - memoized to prevent unnecessary re-renders
  const getPersonTypeColor = useCallback((type: string) => {
    return type === "student" ? "#e3f2fd" : "#e8f5e9"
  }, [])

  // Get person type text color - memoized to prevent unnecessary re-renders
  const getPersonTypeTextColor = useCallback((type: string) => {
    return type === "student" ? "#1976d2" : "#2e7d32"
  }, [])

  // Handle search input change - memoized to prevent unnecessary re-renders
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

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
        <Container maxWidth="xl" sx={{p:{xs:"4px"}}}>
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

      <Container maxWidth="xl" sx={{p:{xs:"4px"}}}>
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
                  placeholder="Search by name, ID or designation..."
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearchChange}
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
              dinner) were taken by each resident. Use the edit icon to navigate to the full edit page, or the delete
              icon to remove a report.
            </Typography>
          </Box>
        </Paper>

        {/* Meal Report List */}
        {!isLoading && mealReportResponse?.data?.mealReports && (
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
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Meal Reports
                </Typography>
                <Chip
                  label={`Total: ${mealReportResponse.data.meta.total}`}
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                />
              </Box>

              <TableContainer sx={{
            overflowX: "auto",  
            WebkitOverflowScrolling: "touch",  
            maxWidth: "100vw"  
          }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>SL</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Students</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Teachers</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Total Meals</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mealReportResponse.data.mealReports.map((report: any, index: number) => {
                      const reportDate = new Date(report.date);
                      const formattedDate = reportDate.toLocaleDateString();
                      const totalStudents = report.students.length;
                      const totalTeachers = report.teachers.length;
                      const totalMeals = report.students.reduce((sum: any, student: any) => sum + student.mealCount, 0) +
                        report.teachers.reduce((sum: any, teacher: any) => sum + teacher.mealCount, 0);

                      return (
                        <TableRow
                          key={report._id}
                          sx={{
                            "&:nth-of-type(odd)": { bgcolor: "rgba(63, 81, 181, 0.05)" },
                            "&:hover": { bgcolor: "rgba(63, 81, 181, 0.1)" },
                          }}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{formattedDate}</TableCell>
                          <TableCell>
                            <Chip
                              icon={<School fontSize="small" />}
                              label={totalStudents}
                              size="small"
                              sx={{ bgcolor: "#e3f2fd", color: "#1976d2" }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={<Person fontSize="small" />}
                              label={totalTeachers}
                              size="small"
                              sx={{ bgcolor: "#e8f5e9", color: "#2e7d32" }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={<Restaurant fontSize="small" />}
                              label={totalMeals}
                              size="small"
                              color="primary"
                            />
                          </TableCell>
                          <TableCell>{new Date(report.createdAt).toLocaleString()}</TableCell>
                          <TableCell align="center">
                            <Stack direction="row" spacing={1} justifyContent="center">
                              <Tooltip title="Edit Meal Report">
                                <IconButton
                                  onClick={() => navigateToUpdate(report._id)}
                                  size="small"
                                  color="primary"
                                  sx={{
                                    bgcolor: "rgba(33, 150, 243, 0.1)",
                                    "&:hover": { bgcolor: "rgba(33, 150, 243, 0.2)" },
                                  }}
                                >
                                  <Edit fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Meal Report">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => openDeleteDialog(report._id)}
                                  sx={{
                                    bgcolor: "rgba(244, 67, 54, 0.1)",
                                    "&:hover": { bgcolor: "rgba(244, 67, 54, 0.2)" },
                                  }}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {(isLoading || loading) && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>
              Loading meal data...
            </Typography>
          </Box>
        )}

        {/* Meal Table */}
        {!isLoading && !loading && (
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
                      <TableCell
                        sx={{
                          bgcolor: "#3f51b5",
                          color: "white",
                          fontWeight: "bold",
                          minWidth: 100,
                          padding: "10px 8px",
                          textAlign: "center",
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPersons.map((person, index) => (
                      <TableRow
                        key={person.id}
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
                              src={person.avatar}
                              sx={{ width: 28, height: 28, display: { xs: "none", md: "flex" } }}
                            />
                            <Typography variant="body2" fontWeight="medium">
                              {person.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ padding: "8px 8px" }}>
                          <Chip
                            icon={getPersonTypeIcon(person.type)}
                            label={person.designation}
                            size="small"
                            sx={{
                              bgcolor: getPersonTypeColor(person.type),
                              color: getPersonTypeTextColor(person.type),
                              fontWeight: 500,
                            }}
                          />
                        </TableCell>
                        {days.map((day) => (
                          <TableCell
                            key={day}
                            align="center"
                            onClick={() => toggleMeal(person.id, day)}
                            sx={{
                              padding: "8px 0px",
                              cursor: "pointer",
                              "&:hover": { bgcolor: "rgba(63, 81, 181, 0.2)" },
                              transition: "background-color 0.2s",
                              borderRadius: 1,
                            }}
                          >
                            {renderMealTypeIndicator(person.id, day)}
                          </TableCell>
                        ))}
                        <TableCell align="center" sx={{ padding: "8px 8px" }}>
                          <Chip
                            label={calculateTotalMeals(person.id)}
                            color="primary"
                            sx={{
                              fontWeight: "bold",
                              background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "8px 8px" }}>
                          <Stack direction="row" spacing={1} justifyContent="center">
                            {/* Edit Button */}
                            {Object.keys(reportIdMap).length > 0 && (
                              <Tooltip title="Edit Report">
                                <IconButton
                                  component={Link}
                                  href={`/dashboard/super_admin/daily-meal-report/update?id=${person.id}`}
                                  size="small"
                                  color="primary"
                                  sx={{
                                    bgcolor: "rgba(33, 150, 243, 0.1)",
                                    "&:hover": { bgcolor: "rgba(33, 150, 243, 0.2)" },
                                  }}
                                >
                                  <Edit fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}

                            {/* Delete Button */}
                            {Object.keys(reportIdMap).length > 0 && (
                              <Tooltip title="Delete Report">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => {
                                    // Get the first available report ID for this person
                                    const reportDay = Object.keys(reportIdMap).find(
                                      (day) => mealData[person.id]?.[Number(day)]?.eaten,
                                    )
                                    if (reportDay) {
                                      openDeleteDialog(reportIdMap[Number(reportDay)])
                                    } else {
                                      setSnackbar({
                                        open: true,
                                        message: "No report found for this person",
                                        severity: "error",
                                      })
                                    }
                                  }}
                                  sx={{
                                    bgcolor: "rgba(244, 67, 54, 0.1)",
                                    "&:hover": { bgcolor: "rgba(244, 67, 54, 0.2)" },
                                  }}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Stack>
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
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Card>
        )}

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
              {selectedPerson && selectedDay && (
                <Typography variant="subtitle2" component="div">
                  {getPersonName(selectedPerson)} - Day {selectedDay}
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
                    Selecting no meals will mark the person as absent for this day.
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
              disabled={isUpdating}
              sx={{
                borderRadius: 100,
                px: 3,
                background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
                boxShadow: "0 4px 10px rgba(63, 81, 181, 0.3)",
              }}
            >
              {isUpdating ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          maxWidth="xs"
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
              background: "linear-gradient(135deg, #f44336 0%, #e57373 100%)",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Warning />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Confirm Delete
              </Typography>
            </Box>
            <IconButton edge="end" color="inherit" onClick={() => setDeleteDialogOpen(false)} aria-label="close">
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 3, mt: 2 }}>
            <Typography variant="body1">
              Are you sure you want to delete this meal report? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2, bgcolor: "#f9f9f9" }}>
            <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined" sx={{ borderRadius: 100, px: 3 }}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteReport}
              variant="contained"
              color="error"
              disabled={isDeleting}
              sx={{
                borderRadius: 100,
                px: 3,
                boxShadow: "0 4px 10px rgba(244, 67, 54, 0.3)",
              }}
            >
              {isDeleting ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
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
