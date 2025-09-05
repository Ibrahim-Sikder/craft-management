/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { format } from "date-fns"

// Material UI Components
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material"

// Material UI Icons
import {
  Add as AddIcon,
  Search as SearchIcon,
  CalendarMonth as CalendarIcon,
  AccessTime as ClockIcon,
  Person as PersonIcon,
  Class as ClassIcon,
  Room as RoomIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
} from "@mui/icons-material"

import type { TransitionProps } from "@mui/material/transitions"
import React from "react"

// Sample data for demonstration
const sampleRoutines = [
  {
    id: 1,
    subject: { name: "Physics", code: "PHY101" },
    class: { name: "Grade 10-A", section: "A" },
    teacher: { name: "Dr. Sarah Johnson", department: "Science", avatar: "/placeholder.svg?height=100&width=100" },
    room: { name: "Room 101", building: "Main Building" },
    days: ["Monday", "Wednesday", "Friday"],
    timeSlot: { start: "08:00", end: "08:45", label: "1st Period" },
    session: "2023-2024 Academic Year",
    startDate: "2023-09-01",
    endDate: "2024-06-30",
    color: "#4f46e5",
    textColor: "#ffffff",
    notes: "Bring lab materials on Wednesdays",
    isRecurring: true,
    isActive: true,
  },
  {
    id: 2,
    subject: { name: "Mathematics", code: "MTH101" },
    class: { name: "Grade 10-B", section: "B" },
    teacher: { name: "Prof. Michael Chen", department: "Mathematics", avatar: "/placeholder.svg?height=100&width=100" },
    room: { name: "Room 102", building: "Main Building" },
    days: ["Tuesday", "Thursday"],
    timeSlot: { start: "09:40", end: "10:25", label: "3rd Period" },
    session: "2023-2024 Academic Year",
    startDate: "2023-09-01",
    endDate: "2024-06-30",
    color: "#0ea5e9",
    textColor: "#ffffff",
    notes: "",
    isRecurring: true,
    isActive: true,
  },
  {
    id: 3,
    subject: { name: "English Literature", code: "ENG101" },
    class: { name: "Grade 11-A", section: "A" },
    teacher: { name: "Ms. Emily Rodriguez", department: "English", avatar: "/placeholder.svg?height=100&width=100" },
    room: { name: "Room 201", building: "Main Building" },
    days: ["Monday", "Wednesday", "Friday"],
    timeSlot: { start: "10:30", end: "11:15", label: "4th Period" },
    session: "2023-2024 Academic Year",
    startDate: "2023-09-01",
    endDate: "2024-06-30",
    color: "#f43f5e",
    textColor: "#ffffff",
    notes: "Book report due every last Friday of the month",
    isRecurring: true,
    isActive: true,
  },
  {
    id: 4,
    subject: { name: "Chemistry", code: "CHM101" },
    class: { name: "Grade 11-B", section: "B" },
    teacher: { name: "Dr. Sarah Johnson", department: "Science", avatar: "/placeholder.svg?height=100&width=100" },
    room: { name: "Lab 101", building: "Science Building" },
    days: ["Tuesday", "Thursday"],
    timeSlot: { start: "11:20", end: "12:05", label: "5th Period" },
    session: "2023-2024 Academic Year",
    startDate: "2023-09-01",
    endDate: "2024-06-30",
    color: "#10b981",
    textColor: "#ffffff",
    notes: "Safety goggles required",
    isRecurring: true,
    isActive: true,
  },
  {
    id: 5,
    subject: { name: "Computer Science", code: "CS101" },
    class: { name: "Grade 12-A", section: "A" },
    teacher: {
      name: "Dr. Priya Patel",
      department: "Computer Science",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    room: { name: "Computer Lab", building: "Technology Building" },
    days: ["Monday", "Wednesday"],
    timeSlot: { start: "12:50", end: "13:35", label: "6th Period" },
    session: "2023-2024 Academic Year",
    startDate: "2023-09-01",
    endDate: "2024-06-30",
    color: "#8b5cf6",
    textColor: "#ffffff",
    notes: "Bring laptops",
    isRecurring: true,
    isActive: true,
  },
  {
    id: 6,
    subject: { name: "World History", code: "HIS101" },
    class: { name: "Grade 12-B", section: "B" },
    teacher: { name: "Mr. David Wilson", department: "History", avatar: "/placeholder.svg?height=100&width=100" },
    room: { name: "Room 202", building: "Main Building" },
    days: ["Tuesday", "Thursday"],
    timeSlot: { start: "13:40", end: "14:25", label: "7th Period" },
    session: "2023-2024 Academic Year",
    startDate: "2023-09-01",
    endDate: "2024-06-30",
    color: "#ec4899",
    textColor: "#ffffff",
    notes: "",
    isRecurring: true,
    isActive: false,
  },
]

const sessions = [
  { id: 1, name: "2023-2024 Academic Year" },
  { id: 2, name: "2024-2025 Academic Year" },
  { id: 3, name: "Summer 2023" },
  { id: 4, name: "Winter 2023" },
]

const classes = [
  { id: 1, name: "Grade 10-A", section: "A" },
  { id: 2, name: "Grade 10-B", section: "B" },
  { id: 3, name: "Grade 11-A", section: "A" },
  { id: 4, name: "Grade 11-B", section: "B" },
  { id: 5, name: "Grade 12-A", section: "A" },
  { id: 6, name: "Grade 12-B", section: "B" },
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

export default function ClassRoutineList() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSession, setSelectedSession] = useState<string>("all")
  const [selectedClass, setSelectedClass] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [viewMode, setViewMode] = useState<number>(0) // 0: grid, 1: list, 2: calendar
  const [sortBy, setSortBy] = useState<string>("subject")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [routineToDelete, setRoutineToDelete] = useState<number | null>(null)

  // Filter and sort routines
  const filteredRoutines = sampleRoutines.filter((routine) => {
    const matchesSearch =
      routine.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routine.subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routine.class.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routine.teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routine.room.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSession = selectedSession === "all" || routine.session === selectedSession
    const matchesClass = selectedClass === "all" || routine.class.name === selectedClass
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && routine.isActive) ||
      (selectedStatus === "inactive" && !routine.isActive)

    return matchesSearch && matchesSession && matchesClass && matchesStatus
  })

  const sortedRoutines = [...filteredRoutines].sort((a, b) => {
    let valueA, valueB

    switch (sortBy) {
      case "subject":
        valueA = a.subject.name
        valueB = b.subject.name
        break
      case "class":
        valueA = a.class.name
        valueB = b.class.name
        break
      case "teacher":
        valueA = a.teacher.name
        valueB = b.teacher.name
        break
      case "time":
        valueA = a.timeSlot.start
        valueB = b.timeSlot.start
        break
      default:
        valueA = a.subject.name
        valueB = b.subject.name
    }

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  // Handle routine deletion
  const handleDeleteClick = (id: number) => {
    setRoutineToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setIsDeleteDialogOpen(false)
    setRoutineToDelete(null)
  }

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setViewMode(newValue)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: 4,
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(45deg, #4f46e5, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 0.5,
              }}
            >
              Class Routines
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage and organize your class schedules efficiently
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            href="//dashboard/classes/assign-routines/list"
            sx={{ px: 3, py: 1.2, borderRadius: 2 }}
          >
            Create New Routine
          </Button>
        </Box>

        {/* Filters and Search */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              placeholder="Search routines..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="session-select-label">Academic Session</InputLabel>
              <Select
                labelId="session-select-label"
                id="session-select"
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                label="Academic Session"
              >
                <MenuItem value="all">All Sessions</MenuItem>
                {sessions.map((session) => (
                  <MenuItem key={session.id} value={session.name}>
                    {session.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="class-select-label">Class</InputLabel>
              <Select
                labelId="class-select-label"
                id="class-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                label="Class"
              >
                <MenuItem value="all">All Classes</MenuItem>
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.name}>
                    {cls.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* View Tabs */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Tabs value={viewMode} onChange={handleTabChange} aria-label="view mode tabs">
              <Tab icon={<GridViewIcon />} label="Grid" iconPosition="start" sx={{ minWidth: 100 }} />
              <Tab icon={<ViewListIcon />} label="List" iconPosition="start" sx={{ minWidth: 100 }} />
              <Tab icon={<CalendarIcon />} label="Calendar" iconPosition="start" sx={{ minWidth: 100 }} />
            </Tabs>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => toggleSort(sortBy)}
                startIcon={sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              >
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </Button>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="sort-by-label">Sort by</InputLabel>
                <Select
                  labelId="sort-by-label"
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort by"
                >
                  <MenuItem value="subject">Subject</MenuItem>
                  <MenuItem value="class">Class</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                  <MenuItem value="time">Time</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        {/* Grid View */}
        {viewMode === 0 && (
          <Box sx={{ mt: 4 }}>
            {sortedRoutines.length === 0 ? (
              <EmptyState />
            ) : (
              <Grid container spacing={3}>
                {sortedRoutines.map((routine) => (
                  <Grid item xs={12} sm={6} md={4} key={routine.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card
                        sx={{
                          height: "100%",
                          borderTop: `4px solid ${routine.color}`,
                          opacity: routine.isActive ? 1 : 0.7,
                        }}
                      >
                        <CardHeader
                          title={
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <Typography variant="h6" component="div">
                                {routine.subject.name}
                              </Typography>
                              <Chip
                                label={routine.isActive ? "Active" : "Inactive"}
                                color={routine.isActive ? "success" : "default"}
                                size="small"
                              />
                            </Box>
                          }
                          subheader={routine.subject.code}
                        />
                        <CardContent>
                          <Stack spacing={2}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <ClassIcon color="primary" fontSize="small" />
                              <Typography variant="body2">{routine.class.name}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <PersonIcon color="secondary" fontSize="small" />
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Avatar
                                  src={routine.teacher.avatar}
                                  alt={routine.teacher.name}
                                  sx={{ width: 24, height: 24 }}
                                />
                                <Typography variant="body2">{routine.teacher.name}</Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <RoomIcon color="info" fontSize="small" />
                              <Typography variant="body2">
                                {routine.room.name}, {routine.room.building}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <ClockIcon color="error" fontSize="small" />
                              <Typography variant="body2">
                                {routine.timeSlot.start} - {routine.timeSlot.end} ({routine.timeSlot.label})
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <CalendarIcon color="success" fontSize="small" />
                              <Typography variant="body2">{routine.days.join(", ")}</Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {routine.notes && (
                              <Tooltip title={routine.notes}>
                                <Chip label="Notes" variant="outlined" size="small" />
                              </Tooltip>
                            )}
                            <Chip label={routine.session} variant="outlined" size="small" />
                          </Box>
                          <Box>
                            <RoutineActions routine={routine} onDelete={handleDeleteClick} />
                          </Box>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* List View */}
        {viewMode === 1 && (
          <Box sx={{ mt: 4 }}>
            {sortedRoutines.length === 0 ? (
              <EmptyState />
            ) : (
              <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead sx={{ bgcolor: "rgba(0, 0, 0, 0.04)" }}>
                    <TableRow>
                      <TableCell sx={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => toggleSort("subject")}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          Subject
                          {sortBy === "subject" &&
                            (sortOrder === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            ))}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => toggleSort("class")}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          Class
                          {sortBy === "class" &&
                            (sortOrder === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            ))}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => toggleSort("teacher")}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          Teacher
                          {sortBy === "teacher" &&
                            (sortOrder === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            ))}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => toggleSort("time")}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          Time
                          {sortBy === "time" &&
                            (sortOrder === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            ))}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Days</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedRoutines.map((routine) => (
                      <TableRow
                        key={routine.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          bgcolor: routine.isActive ? "inherit" : "rgba(0, 0, 0, 0.04)",
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                bgcolor: routine.color,
                              }}
                            />
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {routine.subject.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {routine.subject.code}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{routine.class.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Section {routine.class.section}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar
                              src={routine.teacher.avatar}
                              alt={routine.teacher.name}
                              sx={{ width: 24, height: 24 }}
                            />
                            <Typography variant="body2">{routine.teacher.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {routine.timeSlot.start} - {routine.timeSlot.end}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {routine.timeSlot.label}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {routine.days.map((day, i) => (
                              <Chip
                                key={i}
                                label={day.substring(0, 3)}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: "0.7rem" }}
                              />
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={routine.isActive ? "Active" : "Inactive"}
                            color={routine.isActive ? "success" : "default"}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <RoutineActions routine={routine} onDelete={handleDeleteClick} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}

        {/* Calendar View */}
        {viewMode === 2 && (
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={9}>
                <Card>
                  <CardHeader title="Weekly Schedule" subheader={format(selectedDate, "MMMM yyyy")} />
                  <CardContent>
                    <Grid container spacing={1}>
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                        <Grid item xs={12} md={2.4} key={day}>
                          <Box
                            sx={{ mb: 2, textAlign: "center", bgcolor: "rgba(0, 0, 0, 0.04)", p: 1, borderRadius: 1 }}
                          >
                            <Typography variant="subtitle2">{day}</Typography>
                          </Box>
                          <Box sx={{ minHeight: 400, p: 1 }}>
                            {sortedRoutines
                              .filter((routine) => routine.days.includes(day))
                              .map((routine) => (
                                <Box
                                  key={`${day}-${routine.id}`}
                                  sx={{
                                    p: 1,
                                    mb: 1,
                                    borderRadius: 1,
                                    bgcolor: routine.color,
                                    color: routine.textColor,
                                  }}
                                >
                                  <Typography variant="subtitle2" fontWeight="bold">
                                    {routine.subject.name}
                                  </Typography>
                                  <Typography variant="caption" display="block">
                                    {routine.timeSlot.start} - {routine.timeSlot.end}
                                  </Typography>
                                  <Typography variant="caption" display="block">
                                    {routine.class.name}
                                  </Typography>
                                  <Typography variant="caption" display="block" noWrap>
                                    {routine.room.name}
                                  </Typography>
                                </Box>
                              ))}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack spacing={3}>
                  <Card>
                    <CardHeader title="Date Selection" />
                    <CardContent>
                      {/* In a real app, you would use a date picker component here */}
                      <Typography variant="body2" color="text.secondary" align="center">
                        Date picker would be implemented here
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader title="Statistics" />
                    <CardContent>
                      <Stack spacing={2}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="body2">Total Routines:</Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {sampleRoutines.length}
                          </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="body2">Active Routines:</Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {sampleRoutines.filter((r) => r.isActive).length}
                          </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="body2">Inactive Routines:</Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {sampleRoutines.filter((r) => !r.isActive).length}
                          </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="body2">Classes:</Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {new Set(sampleRoutines.map((r) => r.class.name)).size}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        TransitionComponent={Transition}
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this routine? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

// Empty state component
function EmptyState() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        textAlign: "center",
      }}
    >
      <Box sx={{ bgcolor: "rgba(0, 0, 0, 0.04)", p: 3, borderRadius: "50%", mb: 3 }}>
        <CalendarIcon sx={{ fontSize: 40, color: "text.secondary" }} />
      </Box>
      <Typography variant="h6" gutterBottom>
        No routines found
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500, mb: 4 }}>
        No class routines match your current filters. Try adjusting your search or create a new routine.
      </Typography>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} component={Link} href="/create-routine">
        Create New Routine
      </Button>
    </Box>
  )
}

// Routine actions component
function RoutineActions({ routine, onDelete }: { routine: any; onDelete: (id: number) => void }) {
  return (
    <Box>
      <Tooltip title="View Details">
        <IconButton size="small" component={Link} href={`/view-routine/${routine.id}`}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton size="small" component={Link} href={`/edit-routine/${routine.id}`}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton size="small" onClick={() => onDelete(routine.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
