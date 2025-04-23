/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material"
import {
  Assignment,
  AssignmentTurnedIn,
  AttachFile,
  Attachment,
  Book,
  CalendarMonth,
  CheckCircle,
  Download,
  EmojiEvents,
  Event,
  EventNote,
  FileDownload,
  Grade,
  Home,
  Info,
  LocalLibrary,
  Notifications,
  Payment,
  Person,
  Print,
  School,
  Settings,
  Timeline,
  Visibility,
  People, // Added People import
} from "@mui/icons-material"

// Mock student data
const studentData = {
  id: "STD001",
  name: "John Smith",
  class: "Class 3",
  section: "Section A",
  roll: "101",
  gender: "Male",
  mobile: "1234567890",
  guardianName: "Robert Smith",
  guardianMobile: "9876543210",
  status: "Active",
  admissionDate: "2023-01-15",
  bloodGroup: "O+",
  birthDate: "2010-05-12",
  address: "123 Main Street, Cityville",
  email: "john.smith@example.com",
  attendance: {
    present: 85,
    absent: 5,
    leave: 2,
    late: 3,
    total: 95,
  },
  fees: {
    total: 12000,
    paid: 9500,
    due: 2500,
    lastPaid: "2023-09-15",
  },
  results: [
    {
      exam: "Mid Term",
      totalMarks: 500,
      obtainedMarks: 425,
      percentage: 85,
      grade: "A",
      position: 3,
    },
    {
      exam: "First Term",
      totalMarks: 500,
      obtainedMarks: 450,
      percentage: 90,
      grade: "A+",
      position: 2,
    },
  ],
  subjects: [
    { name: "Mathematics", teacher: "Mr. Johnson", progress: 85 },
    { name: "Science", teacher: "Mrs. Davis", progress: 78 },
    { name: "English", teacher: "Ms. Wilson", progress: 92 },
    { name: "History", teacher: "Mr. Thompson", progress: 88 },
    { name: "Computer Science", teacher: "Mr. Anderson", progress: 95 },
  ],
  homework: [
    {
      id: 1,
      subject: "Mathematics",
      title: "Algebra Problems",
      dueDate: "2023-10-25",
      status: "Completed",
      grade: "A",
    },
    {
      id: 2,
      subject: "Science",
      title: "Lab Report",
      dueDate: "2023-10-28",
      status: "Pending",
      grade: "-",
    },
    {
      id: 3,
      subject: "English",
      title: "Essay Writing",
      dueDate: "2023-10-22",
      status: "Completed",
      grade: "A-",
    },
    {
      id: 4,
      subject: "History",
      title: "Research Project",
      dueDate: "2023-11-05",
      status: "Pending",
      grade: "-",
    },
  ],
  announcements: [
    {
      id: 1,
      title: "Annual Sports Day",
      date: "2023-11-15",
      description: "Annual sports day will be held on November 15th. All students must participate.",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      date: "2023-10-30",
      description: "Parent-teacher meeting scheduled for October 30th from 10 AM to 2 PM.",
    },
    {
      id: 3,
      title: "Holiday Notice",
      date: "2023-11-01",
      description: "School will remain closed on November 1st for National Holiday.",
    },
  ],
  timetable: [
    { day: "Monday", periods: ["Mathematics", "Science", "English", "History", "Computer Science"] },
    { day: "Tuesday", periods: ["Science", "Mathematics", "Computer Science", "English", "History"] },
    { day: "Wednesday", periods: ["English", "History", "Mathematics", "Science", "Computer Science"] },
    { day: "Thursday", periods: ["History", "Computer Science", "Science", "Mathematics", "English"] },
    { day: "Friday", periods: ["Computer Science", "English", "History", "Science", "Mathematics"] },
  ],
  documents: [
    { id: 1, name: "Birth Certificate", type: "PDF", size: "1.2 MB", uploadDate: "2023-01-10" },
    { id: 2, name: "Previous School Certificate", type: "PDF", size: "0.8 MB", uploadDate: "2023-01-10" },
    { id: 3, name: "Medical Record", type: "PDF", size: "1.5 MB", uploadDate: "2023-01-12" },
    { id: 4, name: "ID Card", type: "JPG", size: "0.5 MB", uploadDate: "2023-01-15" },
  ],
  achievements: [
    { id: 1, title: "Science Fair Winner", date: "2023-05-15", description: "First place in annual science fair" },
    { id: 2, title: "Math Olympiad", date: "2023-03-20", description: "Second place in regional math olympiad" },
    { id: 3, title: "Best Attendance", date: "2023-06-10", description: "Perfect attendance award for the term" },
  ],
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const StudentProfile = () => {
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success"
      case "Inactive":
        return "error"
      case "Graduated":
        return "info"
      default:
        return "default"
    }
  }

  const getHomeworkStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "success"
      case "Pending":
        return "warning"
      case "Late":
        return "error"
      default:
        return "default"
    }
  }

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Paper elevation={0} sx={{ mb: 3, bgcolor: theme.palette.primary.main, color: "white", py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Person sx={{ mr: 1 }} />
          <Typography variant="h5" component="h1">
            Student Profile
          </Typography>
        </Box>
      </Paper>

      {/* Student Profile Header */}
      <Card sx={{ mb: 3, overflow: "visible" }}>
        <CardContent sx={{ position: "relative", pb: 3 }}>
          <Box
            sx={{
              position: "absolute",
              top: -30,
              left: 24,
              width: 100,
              height: 100,
              borderRadius: "50%",
              bgcolor: theme.palette.primary.light,
              border: `4px solid ${theme.palette.background.paper}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              boxShadow: theme.shadows[3],
            }}
          >
            <Typography variant="h3">{studentData.name.charAt(0)}</Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box sx={{ pl: { xs: 0, sm: 14 }, pt: { xs: 10, sm: 2 } }}>
                <Typography variant="h4" gutterBottom>
                  {studentData.name}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                  <Chip
                    icon={<School fontSize="small" />}
                    label={`${studentData.class}, ${studentData.section}`}
                    size="small"
                  />
                  <Chip icon={<Info fontSize="small" />} label={`Roll: ${studentData.roll}`} size="small" />
                  <Chip
                    icon={<Person fontSize="small" />}
                    label={`ID: ${studentData.id}`}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    icon={<CheckCircle fontSize="small" />}
                    label={studentData.status}
                    size="small"
                    color={getStatusColor(studentData.status) as any}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 1, mt: 2 }}>
                <Button variant="outlined" startIcon={<Print />} size="small">
                  Print Profile
                </Button>
                <Button variant="outlined" startIcon={<FileDownload />} size="small">
                  Download ID
                </Button>
                <Button variant="contained" startIcon={<Settings />} size="small">
                  Settings
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: theme.palette.success.light,
              color: "white",
              borderRadius: 2,
            }}
          >
            <Typography variant="h4">{studentData.attendance.present}%</Typography>
            <Typography variant="body2">Attendance</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: theme.palette.info.light,
              color: "white",
              borderRadius: 2,
            }}
          >
            <Typography variant="h4">{studentData.results[1]?.percentage || 0}%</Typography>
            <Typography variant="body2">Last Exam</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: theme.palette.warning.light,
              color: "white",
              borderRadius: 2,
            }}
          >
            <Typography variant="h4">{studentData.homework.filter((hw) => hw.status === "Pending").length}</Typography>
            <Typography variant="body2">Pending Homework</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: theme.palette.error.light,
              color: "white",
              borderRadius: 2,
            }}
          >
            <Typography variant="h4">${studentData.fees.due}</Typography>
            <Typography variant="body2">Due Fees</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Main Content Tabs */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="student profile tabs"
          >
            <Tab icon={<Info />} label="Overview" />
            <Tab icon={<Grade />} label="Results" />
            <Tab icon={<Assignment />} label="Homework" />
            <Tab icon={<Timeline />} label="Attendance" />
            <Tab icon={<Book />} label="Subjects" />
            <Tab icon={<Event />} label="Timetable" />
            <Tab icon={<Payment />} label="Fees" />
            <Tab icon={<Notifications />} label="Announcements" />
            <Tab icon={<AttachFile />} label="Documents" />
            <Tab icon={<EmojiEvents />} label="Achievements" />
          </Tabs>
        </Box>

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <Person sx={{ mr: 1 }} /> Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1">{studentData.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Student ID
                  </Typography>
                  <Typography variant="body1">{studentData.id}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date of Birth
                  </Typography>
                  <Typography variant="body1">{studentData.birthDate}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Gender
                  </Typography>
                  <Typography variant="body1">{studentData.gender}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Blood Group
                  </Typography>
                  <Typography variant="body1">{studentData.bloodGroup}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Mobile
                  </Typography>
                  <Typography variant="body1">{studentData.mobile}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{studentData.email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Admission Date
                  </Typography>
                  <Typography variant="body1">{studentData.admissionDate}</Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ mt: 4, display: "flex", alignItems: "center" }}>
                <Home sx={{ mr: 1 }} /> Address Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1">{studentData.address}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <School sx={{ mr: 1 }} /> Academic Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Class
                  </Typography>
                  <Typography variant="body1">{studentData.class}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Section
                  </Typography>
                  <Typography variant="body1">{studentData.section}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Roll Number
                  </Typography>
                  <Typography variant="body1">{studentData.roll}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip label={studentData.status} size="small" color={getStatusColor(studentData.status) as any} />
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ mt: 4, display: "flex", alignItems: "center" }}>
                <People sx={{ mr: 1 }} /> Guardian Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Guardian Name
                  </Typography>
                  <Typography variant="body1">{studentData.guardianName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Guardian Mobile
                  </Typography>
                  <Typography variant="body1">{studentData.guardianMobile}</Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ mt: 4, display: "flex", alignItems: "center" }}>
                <LocalLibrary sx={{ mr: 1 }} /> Subject Progress
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {studentData.subjects.slice(0, 3).map((subject, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2">{subject.name}</Typography>
                    <Typography variant="body2">{subject.progress}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={subject.progress}
                    color={
                      subject.progress >= 90
                        ? "success"
                        : subject.progress >= 70
                          ? "primary"
                          : subject.progress >= 50
                            ? "warning"
                            : "error"
                    }
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
              ))}
              <Button variant="text" size="small" sx={{ mt: 1 }}>
                View All Subjects
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Results Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Examination Results
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {studentData.results.map((result, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6" color="primary">
                        {result.exam}
                      </Typography>
                      <Chip label={`Position: ${result.position}`} color="primary" size="small" variant="outlined" />
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Total Marks
                        </Typography>
                        <Typography variant="body1">{result.totalMarks}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Obtained Marks
                        </Typography>
                        <Typography variant="body1">{result.obtainedMarks}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Percentage
                        </Typography>
                        <Typography variant="body1">{result.percentage}%</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Grade
                        </Typography>
                        <Chip
                          label={result.grade}
                          color={
                            result.grade === "A+" || result.grade === "A"
                              ? "success"
                              : result.grade === "B+" || result.grade === "B"
                                ? "primary"
                                : result.grade === "C+" || result.grade === "C"
                                  ? "warning"
                                  : "error"
                          }
                          size="small"
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                      <Button variant="outlined" size="small" startIcon={<Visibility />}>
                        View Details
                      </Button>
                      <Button variant="outlined" size="small" startIcon={<Download />} sx={{ ml: 1 }}>
                        Download Report
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Subject-wise Performance
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              {studentData.subjects.map((subject, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {subject.name}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2">Progress</Typography>
                      <Typography variant="body2">{subject.progress}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={subject.progress}
                      color={
                        subject.progress >= 90
                          ? "success"
                          : subject.progress >= 70
                            ? "primary"
                            : subject.progress >= 50
                              ? "warning"
                              : "error"
                      }
                      sx={{ height: 8, borderRadius: 1, mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Teacher: {subject.teacher}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>

        {/* Homework Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Homework & Assignments</Typography>
            <Button variant="contained" size="small">
              Submit Homework
            </Button>
          </Box>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {studentData.homework.map((hw) => (
              <Grid item xs={12} md={6} key={hw.id}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Assignment color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6">{hw.title}</Typography>
                      </Box>
                      <Chip label={hw.status} size="small" color={getHomeworkStatusColor(hw.status) as any} />
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Subject
                        </Typography>
                        <Typography variant="body1">{hw.subject}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Due Date
                        </Typography>
                        <Typography variant="body1">{hw.dueDate}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Status
                        </Typography>
                        <Typography variant="body1">{hw.status}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Grade
                        </Typography>
                        <Typography variant="body1">{hw.grade}</Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                      <Button variant="outlined" size="small" startIcon={<Visibility />} sx={{ mr: 1 }}>
                        View Details
                      </Button>
                      {hw.status === "Pending" && (
                        <Button variant="contained" size="small" startIcon={<AssignmentTurnedIn />}>
                          Submit
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Completed Assignments
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <List>
              {studentData.homework
                .filter((hw) => hw.status === "Completed")
                .map((hw) => (
                  <ListItem
                    key={hw.id}
                    secondaryAction={
                      <Box>
                        <Chip label={`Grade: ${hw.grade}`} size="small" color="success" sx={{ mr: 1 }} />
                        <IconButton edge="end" aria-label="view">
                          <Visibility />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                        <Assignment />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={hw.title} secondary={`${hw.subject} | Completed on ${hw.dueDate}`} />
                  </ListItem>
                ))}
            </List>
          </Box>
        </TabPanel>

        {/* Attendance Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Attendance Overview
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Current Month Attendance
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-around", mb: 3 }}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h4" color="success.main">
                        {studentData.attendance.present}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Present
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h4" color="error.main">
                        {studentData.attendance.absent}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Absent
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h4" color="warning.main">
                        {studentData.attendance.late}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Late
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h4" color="info.main">
                        {studentData.attendance.leave}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Leave
                      </Typography>
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={studentData.attendance.present}
                    color="success"
                    sx={{ height: 10, borderRadius: 1, mb: 1 }}
                  />
                  <Typography variant="body2" align="center">
                    Total Working Days: {studentData.attendance.total}
                  </Typography>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Attendance Statistics
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2">Term 1</Typography>
                      <Typography variant="body2">92%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={92}
                      color="success"
                      sx={{ height: 8, borderRadius: 1, mb: 2 }}
                    />

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2">Term 2</Typography>
                      <Typography variant="body2">88%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={88}
                      color="success"
                      sx={{ height: 8, borderRadius: 1, mb: 2 }}
                    />

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2">Term 3</Typography>
                      <Typography variant="body2">85%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={85}
                      color="success"
                      sx={{ height: 8, borderRadius: 1, mb: 2 }}
                    />

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2">Overall</Typography>
                      <Typography variant="body2">88%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={88}
                      color="success"
                      sx={{ height: 8, borderRadius: 1 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Monthly Attendance Calendar
                  </Typography>
                  <Box sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 1, mt: 2 }}>
                    <Grid container spacing={1}>
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <Grid item xs={1.7} key={day}>
                          <Typography variant="body2" align="center" fontWeight="bold">
                            {day}
                          </Typography>
                        </Grid>
                      ))}
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <Grid item xs={1.7} key={day}>
                          <Box
                            sx={{
                              height: 40,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px solid #e0e0e0",
                              borderRadius: 1,
                              bgcolor:
                                day % 7 === 0
                                  ? "#f5f5f5"
                                  : day % 3 === 0
                                    ? theme.palette.error.light
                                    : day % 5 === 0
                                      ? theme.palette.warning.light
                                      : theme.palette.success.light,
                              color: day % 3 === 0 || day % 5 === 0 || day % 7 === 0 ? "white" : "inherit",
                            }}
                          >
                            {day}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          bgcolor: theme.palette.success.light,
                          borderRadius: "50%",
                          mr: 1,
                        }}
                      />
                      <Typography variant="body2">Present</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          bgcolor: theme.palette.error.light,
                          borderRadius: "50%",
                          mr: 1,
                        }}
                      />
                      <Typography variant="body2">Absent</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          bgcolor: theme.palette.warning.light,
                          borderRadius: "50%",
                          mr: 1,
                        }}
                      />
                      <Typography variant="body2">Late</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          bgcolor: "#f5f5f5",
                          borderRadius: "50%",
                          mr: 1,
                        }}
                      />
                      <Typography variant="body2">Holiday</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Subjects Tab */}
        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" gutterBottom>
            Subject Performance
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {studentData.subjects.map((subject, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6">{subject.name}</Typography>
                      <Chip
                        label={`${subject.progress}%`}
                        color={
                          subject.progress >= 90
                            ? "success"
                            : subject.progress >= 70
                              ? "primary"
                              : subject.progress >= 50
                                ? "warning"
                                : "error"
                        }
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Teacher: {subject.teacher}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={subject.progress}
                      color={
                        subject.progress >= 90
                          ? "success"
                          : subject.progress >= 70
                            ? "primary"
                            : subject.progress >= 50
                              ? "warning"
                              : "error"
                      }
                      sx={{ height: 10, borderRadius: 1, mb: 2 }}
                    />

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={6}>
                        <Paper elevation={0} sx={{ p: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Assignments
                          </Typography>
                          <Typography variant="h6">
                            {studentData.homework.filter((hw) => hw.subject === subject.name).length}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper elevation={0} sx={{ p: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Average Grade
                          </Typography>
                          <Typography variant="h6">
                            {subject.progress >= 90
                              ? "A+"
                              : subject.progress >= 80
                                ? "A"
                                : subject.progress >= 70
                                  ? "B"
                                  : subject.progress >= 60
                                    ? "C"
                                    : "D"}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                      <Button variant="outlined" size="small" startIcon={<Book />}>
                        View Materials
                      </Button>
                      <Button variant="contained" size="small" startIcon={<Assignment />} sx={{ ml: 1 }}>
                        View Assignments
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Timetable Tab */}
        <TabPanel value={tabValue} index={5}>
          <Typography variant="h6" gutterBottom>
            Class Timetable
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2}>
            {studentData.timetable.map((day, dayIndex) => (
              <Grid item xs={12} key={dayIndex}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {day.day}
                    </Typography>
                    <Grid container spacing={2}>
                      {day.periods.map((period, periodIndex) => (
                        <Grid item xs={12} sm={6} md={2.4} key={periodIndex}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              bgcolor: "#f5f5f5",
                              borderRadius: 1,
                              height: "100%",
                              border: "1px solid #e0e0e0",
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Period {periodIndex + 1}
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                              {period}
                            </Typography>
                            <Typography variant="caption" display="block">
                              {periodIndex === 0
                                ? "8:00 - 9:00 AM"
                                : periodIndex === 1
                                  ? "9:00 - 10:00 AM"
                                  : periodIndex === 2
                                    ? "10:15 - 11:15 AM"
                                    : periodIndex === 3
                                      ? "11:15 - 12:15 PM"
                                      : "12:15 - 1:15 PM"}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button variant="contained" startIcon={<Download />}>
              Download Timetable
            </Button>
          </Box>
        </TabPanel>

        {/* Fees Tab */}
        <TabPanel value={tabValue} index={6}>
          <Typography variant="h6" gutterBottom>
            Fee Details
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Fee Summary
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body1">Total Fee</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      ${studentData.fees.total}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body1">Paid Amount</Typography>
                    <Typography variant="body1" color="success.main" fontWeight="bold">
                      ${studentData.fees.paid}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body1">Due Amount</Typography>
                    <Typography variant="body1" color="error.main" fontWeight="bold">
                      ${studentData.fees.due}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body1">Last Payment Date</Typography>
                    <Typography variant="body1">{studentData.fees.lastPaid}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(studentData.fees.paid / studentData.fees.total) * 100}
                    color="success"
                    sx={{ height: 10, borderRadius: 1, mb: 2 }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button variant="contained" color="primary">
                      Pay Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Fee Structure
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Tuition Fee" secondary="$8000" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Development Fee" secondary="$1000" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Library Fee" secondary="$500" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Computer Lab Fee" secondary="$800" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Sports Fee" secondary="$700" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Examination Fee" secondary="$1000" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Payment History
                  </Typography>
                  <List>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="download">
                          <Download />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: theme.palette.success.light }}>
                          <Payment />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary="$3000" secondary="September 15, 2023 | Receipt #12345" />
                    </ListItem>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="download">
                          <Download />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: theme.palette.success.light }}>
                          <Payment />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary="$3500" secondary="June 10, 2023 | Receipt #12344" />
                    </ListItem>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="download">
                          <Download />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: theme.palette.success.light }}>
                          <Payment />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary="$3000" secondary="March 5, 2023 | Receipt #12343" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Upcoming Payments
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarMonth color="warning" />
                      </ListItemIcon>
                      <ListItemText primary="December Term Fee" secondary="Due Date: December 10, 2023" />
                      <Chip label="$2500" color="error" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarMonth color="warning" />
                      </ListItemIcon>
                      <ListItemText primary="Examination Fee" secondary="Due Date: November 25, 2023" />
                      <Chip label="$500" color="error" />
                    </ListItem>
                  </List>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button variant="outlined" color="primary">
                      View All Payments
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Announcements Tab */}
        <TabPanel value={tabValue} index={7}>
          <Typography variant="h6" gutterBottom>
            School Announcements
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {studentData.announcements.map((announcement) => (
              <Grid item xs={12} key={announcement.id}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <EventNote color="primary" sx={{ mr: 2, mt: 0.5 }} />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {announcement.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Date: {announcement.date}
                        </Typography>
                        <Typography variant="body1">{announcement.description}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Documents Tab */}
        <TabPanel value={tabValue} index={8}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Student Documents</Typography>
            <Button variant="contained" size="small" startIcon={<Attachment />}>
              Upload Document
            </Button>
          </Box>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {studentData.documents.map((doc) => (
              <Grid item xs={12} sm={6} md={3} key={doc.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor:
                            doc.type === "PDF"
                              ? theme.palette.error.light
                              : doc.type === "JPG" || doc.type === "PNG"
                                ? theme.palette.primary.light
                                : theme.palette.warning.light,
                          mb: 2,
                        }}
                      >
                        <AttachFile />
                      </Avatar>
                      <Typography variant="subtitle1" gutterBottom>
                        {doc.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {doc.type} • {doc.size}
                      </Typography>
                      <Typography variant="caption" display="block" gutterBottom>
                        Uploaded on: {doc.uploadDate}
                      </Typography>
                      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                        <Button variant="outlined" size="small" startIcon={<Visibility />}>
                          View
                        </Button>
                        <Button variant="outlined" size="small" startIcon={<Download />}>
                          Download
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Achievements Tab */}
        <TabPanel value={tabValue} index={9}>
          <Typography variant="h6" gutterBottom>
            Student Achievements
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {studentData.achievements.map((achievement) => (
              <Grid item xs={12} md={4} key={achievement.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                      <Avatar
                        sx={{
                          width: 70,
                          height: 70,
                          bgcolor: theme.palette.primary.light,
                          mb: 2,
                        }}
                      >
                        <EmojiEvents fontSize="large" />
                      </Avatar>
                      <Typography variant="h6" gutterBottom>
                        {achievement.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Date: {achievement.date}
                      </Typography>
                      <Typography variant="body1">{achievement.description}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button variant="contained" startIcon={<EmojiEvents />}>
              View All Achievements
            </Button>
          </Box>
        </TabPanel>
      </Card>
    </Container>
  )
}

export default StudentProfile
