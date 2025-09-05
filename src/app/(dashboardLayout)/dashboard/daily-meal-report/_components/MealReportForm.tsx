/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    Tabs,
    Tab,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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
    School,
    Person,
    PieChart,
    LocalDining,
} from "@mui/icons-material"
import { useGetAllStudentsQuery } from "@/redux/api/studentApi"
import { useGetAllTeachersQuery } from "@/redux/api/teacherApi"
import { useCreateMealReportMutation, useGetSingleMealReportQuery } from "@/redux/api/mealReport"

// Define enum to match the validation schema
enum MealType {
    BREAKFAST = "BREAKFAST",
    LUNCH = "LUNCH",
    DINNER = "DINNER",
}

// Map UI-friendly meal types to enum values
const mealTypeMapping = {
    Breakfast: MealType.BREAKFAST,
    Lunch: MealType.LUNCH,
    Dinner: MealType.DINNER,
}

// Map enum values to UI-friendly meal types
const reverseMealTypeMapping = {
    [MealType.BREAKFAST]: "Breakfast",
    [MealType.LUNCH]: "Lunch",
    [MealType.DINNER]: "Dinner",
}

const mealTypes = ["Breakfast", "Lunch", "Dinner"]
const mealTimeMap = {
    Breakfast: "7:30 AM",
    Lunch: "1:00 PM",
    Dinner: "8:00 PM",
}
const mealIconMap = {
    Breakfast: <FreeBreakfast sx={{ fontSize: 20 }} />,
    Lunch: <LunchDining sx={{ fontSize: 20 }} />,
    Dinner: <DinnerDining sx={{ fontSize: 20 }} />,
}
type PersonType = "student" | "teacher"

interface PersonData {
    id: string
    displayId: string
    name: string
    designation?: string
    avatar: string
    type: PersonType
    email?: string
    className?: string
    section?: string
    department?: string
    staffType?: string
}

interface MealCountStats {
    oneMeal: number
    twoMeals: number
    threeMeals: number
}

export default function MealReportForm() {
    
    const [date, setDate] = useState<Date | null>(new Date())
    const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>(mealTypes)
    const [selectedPersons, setSelectedPersons] = useState<Record<string, boolean>>({})
    const [personMeals, setPersonMeals] = useState<Record<string, string[]>>({})
    const [searchQuery, setSearchQuery] = useState("")
    const [selectAll, setSelectAll] = useState(true)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [filteredPersons, setFilteredPersons] = useState<PersonData[]>([])
    const [filterDesignation, setFilterDesignation] = useState<string | null>(null)
    const [filterType, setFilterType] = useState<PersonType | null>(null)
    const [activeTab, setActiveTab] = useState<PersonType | "all">("all")
    const [debugInfo, setDebugInfo] = useState<string | null>(null)
    const [mealCountStats, setMealCountStats] = useState<MealCountStats>({ oneMeal: 0, twoMeals: 0, threeMeals: 0 })
    const [showMealCountTable, setShowMealCountTable] = useState(false)

    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false)
    const [currentPerson, setCurrentPerson] = useState<string | null>(null)
    const [tempSelectedMeals, setTempSelectedMeals] = useState<string[]>([])

    // API query params
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(50)
    const [searchTerm, setSearchTerm] = useState("")

    // Fetch data from APIs
    const { data: studentData, isLoading: isLoadingStudents } = useGetAllStudentsQuery({
        limit: rowsPerPage,
        page: page + 1,
        searchTerm: searchTerm,
    })
 

    const { data: teacherData, isLoading: isLoadingTeachers } = useGetAllTeachersQuery({
        limit: rowsPerPage,
        page: page + 1,
        searchTerm: searchTerm,
    })

    const [createMealReport, { isLoading: isSubmitting }] = useCreateMealReportMutation()

    // Combined persons data (students and teachers)
    const [persons, setPersons] = useState<PersonData[]>([])

    // Process API data and combine students and teachers
    useEffect(() => {
        const newPersons: PersonData[] = []

        // Process student data
        if (studentData?.data) {
            studentData.data.forEach((student: any) => {
                newPersons.push({
                    id: student._id,
                    displayId: student.studentId,
                    name: student.name,
                    designation: `${student.className || ""} ${student.section || ""}`.trim(),
                    avatar: "/placeholder.svg?height=40&width=40",
                    type: "student",
                    email: student.email,
                    className: student.className,
                    section: student.section,
                })
            })
        }

        // Process teacher data
        if (teacherData?.data) {
            teacherData.data.forEach((teacher: any) => {
                newPersons.push({
                    id: teacher._id,
                    displayId: teacher.teacherId,
                    name: teacher.name,
                    designation: teacher.professionalInfo?.designation || "Teacher",
                    avatar: "/placeholder.svg?height=40&width=40",
                    type: "teacher",
                    email: teacher.email,
                    department: teacher.professionalInfo?.department,
                    staffType: teacher.professionalInfo?.staffType,
                })
            })
        }

        setPersons(newPersons)
    }, [studentData, teacherData])

    // Initialize selected persons with all meals
    useEffect(() => {
        if (persons.length > 0) {
            const initialSelection: Record<string, boolean> = {}
            const initialMeals: Record<string, string[]> = {}

            persons.forEach((person) => {
                initialSelection[person.id] = true // All selected by default
                initialMeals[person.id] = [...selectedMealTypes] // All meals selected by default
            })

            setSelectedPersons(initialSelection)
            setPersonMeals(initialMeals)
        }
    }, [persons, selectedMealTypes])

    // Calculate meal count statistics
    useEffect(() => {
        let oneMeal = 0
        let twoMeals = 0
        let threeMeals = 0

        Object.keys(personMeals).forEach((personId) => {
            if (selectedPersons[personId]) {
                const mealCount = personMeals[personId]?.length || 0
                if (mealCount === 1) oneMeal++
                else if (mealCount === 2) twoMeals++
                else if (mealCount === 3) threeMeals++
            }
        })

        setMealCountStats({ oneMeal, twoMeals, threeMeals })
    }, [personMeals, selectedPersons])

    // Apply filters to persons
    useEffect(() => {
        let filtered = [...persons]

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(
                (person) =>
                    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    person.displayId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (person.email && person.email.toLowerCase().includes(searchQuery.toLowerCase())),
            )
        }

        // Apply designation filter
        if (filterDesignation) {
            filtered = filtered.filter((person) => person.designation === filterDesignation)
        }

        // Apply type filter (student/teacher)
        if (filterType) {
            filtered = filtered.filter((person) => person.type === filterType)
        }

        // Apply tab filter
        if (activeTab !== "all") {
            filtered = filtered.filter((person) => person.type === activeTab)
        }

        setFilteredPersons(filtered)
    }, [searchQuery, filterDesignation, filterType, activeTab, persons])

    // Toggle individual person selection
    const togglePerson = (personId: string) => {
        setSelectedPersons((prev) => {
            const newState = {
                ...prev,
                [personId]: !prev[personId],
            }

            // If toggling to selected and no meals are selected, select all meals
            if (newState[personId] && (!personMeals[personId] || personMeals[personId].length === 0)) {
                setPersonMeals((prevMeals) => ({
                    ...prevMeals,
                    [personId]: [...selectedMealTypes],
                }))
            }

            return newState
        })
    }

    // Open meal selection dialog for a person
    const openMealDialog = (personId: string, event: React.MouseEvent) => {
        event.stopPropagation() // Prevent toggling the person selection
        setCurrentPerson(personId)
        setTempSelectedMeals(personMeals[personId] || [])
        setDialogOpen(true)
    }

    // Close meal selection dialog
    const closeMealDialog = () => {
        setDialogOpen(false)
        setCurrentPerson(null)
    }

    // Save meal selections from dialog
    const saveMealSelections = () => {
        if (currentPerson !== null) {
            // Update person meals
            setPersonMeals((prev) => ({
                ...prev,
                [currentPerson]: tempSelectedMeals,
            }))

            // If no meals selected, deselect the person
            if (tempSelectedMeals.length === 0) {
                setSelectedPersons((prev) => ({
                    ...prev,
                    [currentPerson]: false,
                }))
            } else {
                // Otherwise ensure the person is selected
                setSelectedPersons((prev) => ({
                    ...prev,
                    [currentPerson]: true,
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

        const updatedSelection = { ...selectedPersons }
        const updatedMeals = { ...personMeals }

        filteredPersons.forEach((person) => {
            updatedSelection[person.id] = newSelectAll
            if (newSelectAll) {
                updatedMeals[person.id] = [...selectedMealTypes]
            } else {
                updatedMeals[person.id] = []
            }
        })

        setSelectedPersons(updatedSelection)
        setPersonMeals(updatedMeals)
    }

    // Handle meal type selection for all persons
    const handleMealTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string[]
        setSelectedMealTypes(value)

        // Update all selected persons to have these meal types
        const updatedMeals = { ...personMeals }
        Object.keys(selectedPersons).forEach((personId) => {
            if (selectedPersons[personId]) {
                updatedMeals[personId] = [...value]
            }
        })

        setPersonMeals(updatedMeals)
    }

    // Count selected persons
    const countSelected = () => {
        return Object.values(selectedPersons).filter(Boolean).length
    }

    // Count total meals
    const countTotalMeals = () => {
        let total = 0
        Object.keys(personMeals).forEach((personId) => {
            if (selectedPersons[personId]) {
                total += personMeals[personId].length
            }
        })
        return total
    }

    // Get selected students and teachers with their meal data
    const getSelectedPersonsWithMeals = (type: PersonType) => {
        return persons
            .filter((person) => person.type === type && selectedPersons[person.id])
            .map((person) => ({
                personId: person.id,
                mealTypes: (personMeals[person.id] || []).map(
                    (mealType) => mealTypeMapping[mealType as keyof typeof mealTypeMapping],
                ),
                mealCount: (personMeals[person.id] || []).length,
            }))
    }

    // Handle save - Updated to match the new schema
    const handleSave = async () => {
        setLoading(true)
        setError(null)
        setDebugInfo(null)

        if (!date) {
            setError("Date is ")
            setLoading(false)
            return
        }

        // Get selected students and teachers with their meal data
        const selectedStudents = getSelectedPersonsWithMeals("student")
        const selectedTeachers = getSelectedPersonsWithMeals("teacher")

        // Validate according to schema requirements
        if (selectedStudents.length === 0) {
            setError("At least one student is ")
            setLoading(false)
            return
        }

        if (selectedTeachers.length === 0) {
            setError("At least one teacher is ")
            setLoading(false)
            return
        }

        try {

            const mealReportData = {
                date: date.toISOString().split("T")[0],
                students: selectedStudents,
                teachers: selectedTeachers,
            }
            const debugData = JSON.stringify(mealReportData, null, 2)
            setDebugInfo(`Submitting: ${debugData}`)

            const directResponse = await fetch(`http://localhost:5000/api/v1/meal-report`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mealReportData),
            })

            const directResult = await directResponse.json()
            if (!directResponse.ok) {
                throw { data: directResult }
            }

            setSuccess(true)
            setDebugInfo((prev) => `${prev}\n\nResponse: ${JSON.stringify(directResult, null, 2)}`)

            // Reset form after successful save
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        } catch (err: any) {
            console.error("Error creating meal report:", err)

            // Handle structured validation errors from the backend
            if (err.data?.errorSources) {
                const errorMessages = err.data.errorSources.map((source: any) => `${source.path}: ${source.message}`).join(", ")
                setError(errorMessages || err.data?.message || "Failed to create meal report")
                setDebugInfo((prev) => `${prev}\n\nError: ${JSON.stringify(err.data, null, 2)}`)
            } else {
                setError(err.data?.message || "Failed to create meal report")
                setDebugInfo((prev) => `${prev}\n\nError: ${JSON.stringify(err, null, 2)}`)
            }
        } finally {
            setLoading(false)
        }
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
    const designations = Array.from(new Set(persons.map((p) => p.designation || "Unknown")))

    // Render meal icons for a person
    const renderPersonMealIcons = (personId: string) => {
        const meals = personMeals[personId] || []

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

    // Handle tab change
    const handleTabChange = (_event: React.SyntheticEvent, newValue: PersonType | "all") => {
        setActiveTab(newValue)
    }

    // Get person type icon
    const getPersonTypeIcon = (type: PersonType) => {
        return type === "student" ? <School fontSize="small" /> : <Person fontSize="small" />
    }

    // Get person type color
    const getPersonTypeColor = (type: PersonType) => {
        return type === "student" ? "#e3f2fd" : "#e8f5e9"
    }

    // Get person type text color
    const getPersonTypeTextColor = (type: PersonType) => {
        return type === "student" ? "#1976d2" : "#2e7d32"
    }

    // Calculate percentage for meal count stats
    const calculatePercentage = (count: number) => {
        const total = countSelected()
        return total > 0 ? Math.round((count / total) * 100) : 0
    }

    // Get persons grouped by meal count
    const getPersonsByMealCount = () => {
        const result = {
            oneMeal: [] as PersonData[],
            twoMeals: [] as PersonData[],
            threeMeals: [] as PersonData[],
        }

        persons.forEach((person) => {
            if (selectedPersons[person.id]) {
                const mealCount = personMeals[person.id]?.length || 0
                if (mealCount === 1) result.oneMeal.push(person)
                else if (mealCount === 2) result.twoMeals.push(person)
                else if (mealCount === 3) result.threeMeals.push(person)
            }
        })

        return result
    }

    // Loading state
    if (isLoadingStudents || isLoadingTeachers) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ ml: 2 }}>
                    Loading data...
                </Typography>
            </Box>
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
                                
                                error={error?.includes("Date")}
                                helperText={error?.includes("Date") ? error : ""}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth variant="outlined"  error={error?.includes("Meal type")}>
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
                                {error?.includes("Meal type") && (
                                    <Typography variant="caption" color="error">
                                        {error}
                                    </Typography>
                                )}
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
                                            People Selected
                                        </Typography>
                                        <Typography variant="h5" fontWeight="bold">
                                            {countSelected()} / {persons.length}
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

            {/* Meal Count Statistics */}
            <Card elevation={3} sx={{ mb: 4, borderRadius: 2, overflow: "hidden" }}>
                <Box sx={{ p: 2, bgcolor: "#673ab7", color: "white" }}>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <PieChart />
                            <Typography variant="h6">Meal Count Statistics</Typography>
                        </Stack>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setShowMealCountTable(!showMealCountTable)}
                            sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
                        >
                            {showMealCountTable ? "Hide Details" : "Show Details"}
                        </Button>
                    </Stack>
                </Box>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={1} sx={{ p: 2, borderRadius: 2, bgcolor: "#f3e5f5" }}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                    <Avatar sx={{ bgcolor: "#9c27b0", width: 30, height: 30 }}>1</Avatar>
                                    <Typography variant="subtitle1">One Meal</Typography>
                                </Stack>
                                <Typography variant="h4" fontWeight="bold">
                                    {mealCountStats.oneMeal}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {calculatePercentage(mealCountStats.oneMeal)}% of selected people
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={calculatePercentage(mealCountStats.oneMeal)}
                                    sx={{ mt: 1, height: 8, borderRadius: 4, bgcolor: "#e1bee7" }}
                                    color="secondary"
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={1} sx={{ p: 2, borderRadius: 2, bgcolor: "#e8f5e9" }}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                    <Avatar sx={{ bgcolor: "#4caf50", width: 30, height: 30 }}>2</Avatar>
                                    <Typography variant="subtitle1">Two Meals</Typography>
                                </Stack>
                                <Typography variant="h4" fontWeight="bold">
                                    {mealCountStats.twoMeals}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {calculatePercentage(mealCountStats.twoMeals)}% of selected people
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={calculatePercentage(mealCountStats.twoMeals)}
                                    sx={{ mt: 1, height: 8, borderRadius: 4, bgcolor: "#c8e6c9" }}
                                    color="success"
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={1} sx={{ p: 2, borderRadius: 2, bgcolor: "#e3f2fd" }}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                    <Avatar sx={{ bgcolor: "#2196f3", width: 30, height: 30 }}>3</Avatar>
                                    <Typography variant="subtitle1">Three Meals</Typography>
                                </Stack>
                                <Typography variant="h4" fontWeight="bold">
                                    {mealCountStats.threeMeals}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {calculatePercentage(mealCountStats.threeMeals)}% of selected people
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={calculatePercentage(mealCountStats.threeMeals)}
                                    sx={{ mt: 1, height: 8, borderRadius: 4, bgcolor: "#bbdefb" }}
                                    color="primary"
                                />
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Detailed Meal Count Table */}
                    {showMealCountTable && (
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Detailed Meal Count Breakdown
                            </Typography>
                            <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: "auto" }}>
                                <Table stickyHeader size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold" }}>Meal Count</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Person</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Meals</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {getPersonsByMealCount().oneMeal.map((person) => (
                                            <TableRow key={`one-${person.id}`}>
                                                <TableCell>1</TableCell>
                                                <TableCell>{person.name}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        icon={getPersonTypeIcon(person.type)}
                                                        label={person.type === "student" ? "Student" : "Teacher"}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: getPersonTypeColor(person.type),
                                                            color: getPersonTypeTextColor(person.type),
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>{person.displayId}</TableCell>
                                                <TableCell>
                                                    <Stack direction="row" spacing={0.5}>
                                                        {(personMeals[person.id] || []).map((meal) => (
                                                            <Tooltip key={meal} title={meal}>
                                                                {mealIconMap[meal as keyof typeof mealIconMap]}
                                                            </Tooltip>
                                                        ))}
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {getPersonsByMealCount().twoMeals.map((person) => (
                                            <TableRow key={`two-${person.id}`}>
                                                <TableCell>2</TableCell>
                                                <TableCell>{person.name}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        icon={getPersonTypeIcon(person.type)}
                                                        label={person.type === "student" ? "Student" : "Teacher"}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: getPersonTypeColor(person.type),
                                                            color: getPersonTypeTextColor(person.type),
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>{person.displayId}</TableCell>
                                                <TableCell>
                                                    <Stack direction="row" spacing={0.5}>
                                                        {(personMeals[person.id] || []).map((meal) => (
                                                            <Tooltip key={meal} title={meal}>
                                                                {mealIconMap[meal as keyof typeof mealIconMap]}
                                                            </Tooltip>
                                                        ))}
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {getPersonsByMealCount().threeMeals.map((person) => (
                                            <TableRow key={`three-${person.id}`}>
                                                <TableCell>3</TableCell>
                                                <TableCell>{person.name}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        icon={getPersonTypeIcon(person.type)}
                                                        label={person.type === "student" ? "Student" : "Teacher"}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: getPersonTypeColor(person.type),
                                                            color: getPersonTypeTextColor(person.type),
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>{person.displayId}</TableCell>
                                                <TableCell>
                                                    <Stack direction="row" spacing={0.5}>
                                                        {(personMeals[person.id] || []).map((meal) => (
                                                            <Tooltip key={meal} title={meal}>
                                                                {mealIconMap[meal as keyof typeof mealIconMap]}
                                                            </Tooltip>
                                                        ))}
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
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

            {/* Persistent Filter Bar */}
            <Card elevation={3} sx={{ mb: 3, borderRadius: 2, overflow: "hidden" }}>
                <Box sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={3}>
                            <TextField
                                placeholder="Search by name, ID or email..."
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Filter by Designation</InputLabel>
                                <Select
                                    value={filterDesignation || ""}
                                    onChange={(e) => setFilterDesignation(e.target.value || null)}
                                    label="Filter by Designation"
                                    startAdornment={<FilterList sx={{ mr: 1, color: "text.secondary" }} />}
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
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Meal Type Filter</InputLabel>
                                <Select
                                    multiple
                                    value={selectedMealTypes}
                                    onChange={(e) => handleMealTypeChange(e as any)}
                                    input={<OutlinedInput label="Meal Type Filter" />}
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
                        <Grid item xs={12} md={3}>
                            <Stack direction="row" spacing={2} justifyContent="flex-end">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => {
                                        setSearchQuery("")
                                        setFilterDesignation(null)
                                        setSelectedMealTypes(mealTypes)
                                        setActiveTab("all")
                                    }}
                                    startIcon={<Close />}
                                    size="medium"
                                >
                                    Clear Filters
                                </Button>
                                <FormControlLabel
                                    control={<Switch checked={selectAll} onChange={handleSelectAll} color="primary" />}
                                    label="Select All"
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Card>

            {/* Filter Results Summary */}
            {(searchQuery || filterDesignation || activeTab !== "all") && (
                <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                    <FilterList fontSize="small" color="primary" />
                    <Typography variant="body2" color="primary">
                        Showing {filteredPersons.length} of {persons.length} people
                        {searchQuery && <span> matching "{searchQuery}"</span>}
                        {filterDesignation && <span> with designation "{filterDesignation}"</span>}
                        {activeTab !== "all" && <span> of type "{activeTab}"</span>}
                    </Typography>
                </Box>
            )}

            {/* Person Selection Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                <Tabs value={activeTab} onChange={handleTabChange} aria-label="person type tabs">
                    <Tab label="All" value="all" icon={<FilterList />} iconPosition="start" />
                    <Tab label="Students" value="student" icon={<School />} iconPosition="start" />
                    <Tab label="Teachers" value="teacher" icon={<Person />} iconPosition="start" />
                </Tabs>
            </Box>

            {/* Validation Errors */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Person List */}
            <Card elevation={3} sx={{ borderRadius: 2, overflow: "hidden", mb: 4 }}>
                <Box sx={{ p: 2, bgcolor: "#3f51b5", color: "white" }}>
                    <Typography variant="h6">
                        Person Selection
                        <Typography component="span" variant="body2" sx={{ ml: 2 }}>
                            (Click on a person to toggle selection, click edit icon to customize meals)
                        </Typography>
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ maxHeight: "500px", overflow: "auto", p: 2 }}>
                    <Grid container spacing={2}>
                        {filteredPersons.length > 0 ? (
                            filteredPersons.map((person) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={person.id}>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            cursor: "pointer",
                                            border: selectedPersons[person.id] ? "2px solid #3f51b5" : "1px solid #e0e0e0",
                                            bgcolor: selectedPersons[person.id] ? "rgba(63, 81, 181, 0.1)" : "white",
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                boxShadow: 3,
                                                bgcolor: "rgba(63, 81, 181, 0.05)",
                                            },
                                            position: "relative",
                                        }}
                                        onClick={() => togglePerson(person.id)}
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
                                            onClick={(e) => openMealDialog(person.id, e)}
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>

                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar src={person.avatar} sx={{ width: 50, height: 50 }} />
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography variant="subtitle1" fontWeight="medium">
                                                    {person.name}
                                                </Typography>
                                                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                                    <Chip
                                                        icon={getPersonTypeIcon(person.type)}
                                                        label={person.type === "student" ? "Student" : "Teacher"}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: getPersonTypeColor(person.type),
                                                            color: getPersonTypeTextColor(person.type),
                                                        }}
                                                    />
                                                    <Chip label={person.displayId} size="small" sx={{ bgcolor: "#f5f5f5" }} />
                                                </Stack>
                                                {person.designation && (
                                                    <Typography variant="body2" color="text.secondary">
                                                        {person.designation}
                                                    </Typography>
                                                )}
                                                {selectedPersons[person.id] && (
                                                    <Box sx={{ mt: 1 }}>
                                                        {renderPersonMealIcons(person.id)}
                                                        <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                                                            {(personMeals[person.id] || []).length} meals
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                            {selectedPersons[person.id] ? (
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
                                        No people found matching your criteria
                                    </Typography>
                                    <Button
                                        variant="text"
                                        onClick={() => {
                                            setSearchQuery("")
                                            setFilterDesignation(null)
                                            setActiveTab("all")
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
                        const resetSelection: Record<string, boolean> = {}
                        const resetMeals: Record<string, string[]> = {}
                        persons.forEach((person) => {
                            resetSelection[person.id] = true
                            resetMeals[person.id] = [...mealTypes]
                        })
                        setSelectedPersons(resetSelection)
                        setPersonMeals(resetMeals)
                        setSelectAll(true)
                        setActiveTab("all")
                        setSearchQuery("")
                        setFilterDesignation(null)
                        setError(null)
                        setDebugInfo(null)
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
                    <School fontSize="small" />
                    <Typography variant="body2">Student</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Person fontSize="small" />
                    <Typography variant="body2">Teacher</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Edit fontSize="small" />
                    <Typography variant="body2">Edit Meals</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocalDining fontSize="small" />
                    <Typography variant="body2">Meal Count</Typography>
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
                    {currentPerson !== null && (
                        <>
                            <Typography variant="subtitle1" gutterBottom>
                                {persons.find((p) => p.id === currentPerson)?.name}
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
                    <Button onClick={saveMealSelections} variant="contained" color="primary" disabled={currentPerson === null}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
