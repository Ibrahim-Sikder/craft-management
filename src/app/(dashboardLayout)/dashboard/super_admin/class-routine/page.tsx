/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useMemo } from "react"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Fab,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
  useTheme,
  Fade,
  Slide,
  Zoom,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import {
  Schedule as ScheduleIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Class as ClassIcon,
  Person as PersonIcon,
  Book as BookIcon,
  AccessTime as TimeIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  Today as TodayIcon,
  Event as EventIcon,
} from "@mui/icons-material"
import { format, addDays, startOfWeek } from "date-fns"

const ClassRoutinePage = () => {
  const theme = useTheme()
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedDay, setSelectedDay] = useState(0) 
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("weekly") 
  const [selectedWeek, setSelectedWeek] = useState(new Date())
  const [openModal, setOpenModal] = useState(false)

  // Mock data
  const classes = [
    { id: "6", name: "Class 6", students: 45 },
    { id: "7", name: "Class 7", students: 42 },
    { id: "8", name: "Class 8", students: 48 },
    { id: "9", name: "Class 9", students: 40 },
    { id: "10", name: "Class 10", students: 38 },
  ]

  const timeSlots = [
    { id: 1, start: "08:00", end: "08:45", period: "1st Period" },
    { id: 2, start: "08:45", end: "09:30", period: "2nd Period" },
    { id: 3, start: "09:30", end: "10:15", period: "3rd Period" },
    { id: 4, start: "10:15", end: "10:30", period: "Break", isBreak: true },
    { id: 5, start: "10:30", end: "11:15", period: "4th Period" },
    { id: 6, start: "11:15", end: "12:00", period: "5th Period" },
    { id: 7, start: "12:00", end: "12:45", period: "6th Period" },
    { id: 8, start: "12:45", end: "13:30", period: "Lunch Break", isBreak: true },
    { id: 9, start: "13:30", end: "14:15", period: "7th Period" },
    { id: 10, start: "14:15", end: "15:00", period: "8th Period" },
  ]

  const weekDays = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]

  const subjects = [
    { id: "math", name: "Mathematics", color: "#2196F3", icon: "📊" },
    { id: "english", name: "English", color: "#4CAF50", icon: "📚" },
    { id: "bangla", name: "Bangla", color: "#FF9800", icon: "📖" },
    { id: "science", name: "Science", color: "#9C27B0", icon: "🔬" },
    { id: "social", name: "Social Studies", color: "#F44336", icon: "🌍" },
    { id: "religion", name: "Religion", color: "#795548", icon: "🕌" },
    { id: "ict", name: "ICT", color: "#607D8B", icon: "💻" },
    { id: "pe", name: "Physical Education", color: "#8BC34A", icon: "⚽" },
  ]

  const teachers = [
    { id: "t1", name: "Mrs. Rahman", avatar: "/placeholder.svg?height=40&width=40", subjects: ["math"] },
    { id: "t2", name: "Mr. Hassan", avatar: "/placeholder.svg?height=40&width=40", subjects: ["english"] },
    { id: "t3", name: "Ms. Fatima", avatar: "/placeholder.svg?height=40&width=40", subjects: ["bangla"] },
    { id: "t4", name: "Dr. Ahmed", avatar: "/placeholder.svg?height=40&width=40", subjects: ["science"] },
    { id: "t5", name: "Mr. Ali", avatar: "/placeholder.svg?height=40&width=40", subjects: ["social"] },
    { id: "t6", name: "Imam Saheb", avatar: "/placeholder.svg?height=40&width=40", subjects: ["religion"] },
    { id: "t7", name: "Ms. Khan", avatar: "/placeholder.svg?height=40&width=40", subjects: ["ict"] },
    { id: "t8", name: "Coach Rahman", avatar: "/placeholder.svg?height=40&width=40", subjects: ["pe"] },
  ]

  // Mock routine data
  const routineData = [
    // Saturday
    { day: 0, period: 1, class: "6", subject: "math", teacher: "t1", room: "101" },
    { day: 0, period: 2, class: "6", subject: "english", teacher: "t2", room: "102" },
    { day: 0, period: 3, class: "6", subject: "bangla", teacher: "t3", room: "103" },
    { day: 0, period: 5, class: "6", subject: "science", teacher: "t4", room: "Lab-1" },
    { day: 0, period: 6, class: "6", subject: "social", teacher: "t5", room: "104" },
    { day: 0, period: 7, class: "6", subject: "religion", teacher: "t6", room: "105" },
    { day: 0, period: 9, class: "6", subject: "ict", teacher: "t7", room: "Computer Lab" },
    { day: 0, period: 10, class: "6", subject: "pe", teacher: "t8", room: "Playground" },

    // Sunday
    { day: 1, period: 1, class: "6", subject: "english", teacher: "t2", room: "102" },
    { day: 1, period: 2, class: "6", subject: "math", teacher: "t1", room: "101" },
    { day: 1, period: 3, class: "6", subject: "science", teacher: "t4", room: "Lab-1" },
    { day: 1, period: 5, class: "6", subject: "bangla", teacher: "t3", room: "103" },
    { day: 1, period: 6, class: "6", subject: "social", teacher: "t5", room: "104" },
    { day: 1, period: 7, class: "6", subject: "math", teacher: "t1", room: "101" },
    { day: 1, period: 9, class: "6", subject: "religion", teacher: "t6", room: "105" },
    { day: 1, period: 10, class: "6", subject: "pe", teacher: "t8", room: "Playground" },

    // Add more days and classes...
  ]

  const getSubjectInfo = (subjectId: string) => {
    return subjects.find((s) => s.id === subjectId) || subjects[0]
  }

  const getTeacherInfo = (teacherId: string) => {
    return teachers.find((t) => t.id === teacherId) || teachers[0]
  }

  const getClassRoutine = (classId: string, day: number) => {
    return routineData.filter((r) => r.class === classId && r.day === day)
  }

  const filteredClasses = useMemo(() => {
    if (selectedClass === "all") return classes
    return classes.filter((c) => c.id === selectedClass)
  }, [selectedClass])

  const getCurrentDaySchedule = () => {
    const today = new Date().getDay()
    const dayIndex = today === 0 ? 6 : today - 1 // Convert Sunday=0 to Saturday=0
    return getClassRoutine(selectedClass === "all" ? "6" : selectedClass, dayIndex)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Add New Class Schedule Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle>Add New Class Schedule</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill in the details for the new class schedule.</DialogContentText>
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Class</InputLabel>
                <Select value={selectedClass} label="Select Class" onChange={(e) => setSelectedClass(e.target.value)}>
                  {classes.map((cls) => (
                    <MenuItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Subject</InputLabel>
                <Select value="" label="Select Subject" onChange={(e) => console.log(e.target.value)}>
                  {subjects.map((subject) => (
                    <MenuItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Teacher</InputLabel>
                <Select value="" label="Select Teacher" onChange={(e) => console.log(e.target.value)}>
                  {teachers.map((teacher) => (
                    <MenuItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Time Slot</InputLabel>
                <Select value="" label="Select Time Slot" onChange={(e) => console.log(e.target.value)}>
                  {timeSlots.map((slot) => (
                    <MenuItem key={slot.id} value={slot.id}>
                      {slot.period} ({slot.start} - {slot.end})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Room Assignment" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleCloseModal} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Fade in timeout={800}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                  color: "white",
                  boxShadow: `0 8px 32px ${alpha(theme.palette.secondary.main, 0.3)}`,
                }}
              >
                <ScheduleIcon sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Class Routine
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage and view class schedules for all grades
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ borderRadius: 2 }}>
                Refresh
              </Button>
              <Button variant="outlined" startIcon={<PrintIcon />} sx={{ borderRadius: 2 }}>
                Print
              </Button>
              <Zoom in timeout={1000}>
                <Fab
                  color="primary"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                    boxShadow: `0 8px 32px ${alpha(theme.palette.secondary.main, 0.3)}`,
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: `0 12px 40px ${alpha(theme.palette.secondary.main, 0.4)}`,
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={handleOpenModal}
                >
                  <AddIcon />
                </Fab>
              </Zoom>
            </Box>
          </Box>
        </Fade>

        {/* Quick Stats */}
        <Slide in direction="up" timeout={1000}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { label: "Total Classes", value: classes.length, color: "primary", icon: <ClassIcon /> },
              { label: "Total Teachers", value: teachers.length, color: "secondary", icon: <PersonIcon /> },
              { label: "Subjects", value: subjects.length, color: "success", icon: <BookIcon /> },
              {
                label: "Time Slots",
                value: timeSlots.filter((t) => !t.isBreak).length,
                color: "info",
                icon: <TimeIcon />,
              },
            ].map((stat, index) => {
              // Only allow palette keys that are known to have a 'main' property
              const paletteColor = theme.palette[stat.color as "primary" | "secondary" | "success" | "info"];
              return (
                <Grid item xs={6} md={3} key={index}>
                  <Card
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${alpha(paletteColor.main, 0.1)} 0%, ${alpha(paletteColor.main, 0.05)} 100%)`,
                      border: `1px solid ${alpha(paletteColor.main, 0.2)}`,
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 12px 40px ${alpha(paletteColor.main, 0.15)}`,
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: alpha(paletteColor.main, 0.1),
                          color: paletteColor.main,
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Box>
                        <Typography variant="h5" fontWeight={700} color={paletteColor.main}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Slide>

        {/* Controls */}
        <Slide in direction="up" timeout={1200}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Select Class</InputLabel>
                  <Select
                    value={selectedClass}
                    label="Select Class"
                    onChange={(e) => setSelectedClass(e.target.value)}
                    sx={{ borderRadius: 2, bgcolor: "background.paper" }}
                  >
                    <MenuItem value="all">All Classes</MenuItem>
                    {classes.map((cls) => (
                      <MenuItem key={cls.id} value={cls.id}>
                        {cls.name} ({cls.students} students)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>View Mode</InputLabel>
                  <Select
                    value={viewMode}
                    label="View Mode"
                    onChange={(e) => setViewMode(e.target.value)}
                    sx={{ borderRadius: 2, bgcolor: "background.paper" }}
                  >
                    <MenuItem value="weekly">Weekly View</MenuItem>
                    <MenuItem value="daily">Daily View</MenuItem>
                    <MenuItem value="teacher">Teacher View</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search subjects, teachers, or rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2, bgcolor: "background.paper" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button fullWidth variant="contained" startIcon={<TodayIcon />} sx={{ height: 56, borderRadius: 2 }}>
                  Today's Schedule
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Slide>
      </Box>

      {/* Main Content */}
      {viewMode === "weekly" && (
        <Slide in direction="up" timeout={1400}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Box sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
              <Typography variant="h6" fontWeight={700}>
                Weekly Schedule - {selectedClass === "all" ? "All Classes" : `Class ${selectedClass}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {format(selectedWeek, "MMMM yyyy")}
              </Typography>
            </Box>

            <TableContainer>
              <Table sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                    <TableCell sx={{ fontWeight: 700, minWidth: 120 }}>Time</TableCell>
                    {weekDays.map((day, index) => (
                      <TableCell key={index} align="center" sx={{ fontWeight: 700, minWidth: 150 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <Typography variant="subtitle2" fontWeight={700}>
                            {day}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {format(addDays(startOfWeek(selectedWeek), index), "MMM dd")}
                          </Typography>
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeSlots.map((slot) => (
                    <TableRow key={slot.id} sx={{ "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                      <TableCell sx={{ borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {slot.period}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {slot.start} - {slot.end}
                          </Typography>
                        </Box>
                      </TableCell>
                      {weekDays.map((day, dayIndex) => (
                        <TableCell key={dayIndex} align="center" sx={{ p: 1 }}>
                          {slot.isBreak ? (
                            <Chip
                              label={slot.period}
                              size="small"
                              sx={{
                                bgcolor: alpha(theme.palette.grey[500], 0.1),
                                color: "text.secondary",
                                fontWeight: 600,
                              }}
                            />
                          ) : (
                            (() => {
                              const classData = getClassRoutine(selectedClass === "all" ? "6" : selectedClass, dayIndex)
                              const periodData = classData.find((c) => c.period === slot.id)

                              if (!periodData) {
                                return (
                                  <Box
                                    sx={{
                                      height: 60,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      borderRadius: 2,
                                      border: `2px dashed ${alpha(theme.palette.divider, 0.3)}`,
                                      cursor: "pointer",
                                      "&:hover": {
                                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                                        borderColor: theme.palette.primary.main,
                                      },
                                      transition: "all 0.2s ease",
                                    }}
                                  >
                                    <AddIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                                  </Box>
                                )
                              }

                              const subject = getSubjectInfo(periodData.subject)
                              const teacher = getTeacherInfo(periodData.teacher)

                              return (
                                <Card
                                  sx={{
                                    minHeight: 60,
                                    background: `linear-gradient(135deg, ${alpha(subject.color, 0.1)} 0%, ${alpha(subject.color, 0.05)} 100%)`,
                                    border: `2px solid ${alpha(subject.color, 0.3)}`,
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    "&:hover": {
                                      transform: "scale(1.02)",
                                      boxShadow: `0 4px 12px ${alpha(subject.color, 0.2)}`,
                                    },
                                    transition: "all 0.2s ease",
                                  }}
                                >
                                  <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                                    <Box sx={{ textAlign: "center" }}>
                                      <Typography
                                        variant="caption"
                                        sx={{
                                          fontSize: "1.2em",
                                          mb: 0.5,
                                          display: "block",
                                        }}
                                      >
                                        {subject.icon}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        fontWeight={700}
                                        sx={{
                                          color: subject.color,
                                          fontSize: "0.75rem",
                                          lineHeight: 1.2,
                                          mb: 0.5,
                                        }}
                                      >
                                        {subject.name}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ fontSize: "0.65rem", display: "block", mb: 0.5 }}
                                      >
                                        {teacher.name}
                                      </Typography>
                                      <Chip
                                        label={periodData.room}
                                        size="small"
                                        sx={{
                                          height: 16,
                                          fontSize: "0.6rem",
                                          bgcolor: alpha(subject.color, 0.2),
                                          color: subject.color,
                                          fontWeight: 600,
                                        }}
                                      />
                                    </Box>
                                  </CardContent>
                                </Card>
                              )
                            })()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Slide>
      )}

      {/* Today's Schedule Sidebar */}
      <Slide in direction="left" timeout={1600}>
        <Paper
          sx={{
            position: "fixed",
            right: 24,
            top: "50%",
            transform: "translateY(-50%)",
            width: 300,
            maxHeight: "70vh",
            overflow: "auto",
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            zIndex: 1000,
          }}
        >
          <Box sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <TodayIcon color="primary" />
              <Typography variant="h6" fontWeight={700}>
                Today's Schedule
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {format(new Date(), "EEEE, MMMM dd, yyyy")}
            </Typography>
          </Box>

          <List sx={{ p: 0 }}>
            {getCurrentDaySchedule().map((item, index) => {
              const subject = getSubjectInfo(item.subject)
              const teacher = getTeacherInfo(item.teacher)
              const timeSlot = timeSlots.find((t) => t.id === item.period)

              return (
                <ListItem
                  key={index}
                  sx={{
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    "&:hover": {
                      bgcolor: alpha(subject.color, 0.05),
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: alpha(subject.color, 0.1),
                        color: subject.color,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <Typography sx={{ fontSize: "1.2em" }}>{subject.icon}</Typography>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={600}>
                        {subject.name}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {teacher.name} • Room {item.room}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="primary.main" fontWeight={600}>
                          {timeSlot?.start} - {timeSlot?.end}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Chip
                      label={timeSlot?.period.split(" ")[0]}
                      size="small"
                      sx={{
                        bgcolor: alpha(subject.color, 0.1),
                        color: subject.color,
                        fontWeight: 600,
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>

          {getCurrentDaySchedule().length === 0 && (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <EventIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                No classes scheduled for today
              </Typography>
            </Box>
          )}
        </Paper>
      </Slide>
    </Container>
  )
}

export default ClassRoutinePage
