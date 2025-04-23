
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from "react"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Chip,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  IconButton,
  Badge,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  useTheme,
  alpha,
  CircularProgress,
  SxProps,
  Theme,
} from "@mui/material"
import {
  School,
  Schedule,
  Class,
  Assessment,
  People,
  Assignment,
  Message,
  Notifications,
  CalendarMonth,
  MenuBook,
  EmojiEvents,
  BarChart,
  Folder,
  Settings,
  Edit,
  Download,
  Add,
  CheckCircle,
  Warning,
  Info,
  Star,
  Mail,
  Phone,
  LocationOn,
  Language,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
} from "@mui/icons-material"

// Mock data for teacher profile
const teacherData = {
  id: "T12345",
  name: "Dr. Sarah Johnson",
  avatar: "/placeholder.svg?height=150&width=150",
  role: "Senior Mathematics Teacher",
  department: "Mathematics",
  joinDate: "August 15, 2018",
  education: [
    { degree: "Ph.D. in Mathematics", institution: "Stanford University", year: "2015" },
    { degree: "M.Sc. in Applied Mathematics", institution: "MIT", year: "2012" },
    { degree: "B.Sc. in Mathematics", institution: "Harvard University", year: "2010" },
  ],
  contact: {
    email: "sarah.johnson@schoolerp.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Faculty Lane, Academic City, CA 94305",
    website: "www.sarahjohnson-math.edu",
  },
  socialMedia: {
    linkedin: "linkedin.com/in/sarahjohnson",
    twitter: "@DrSarahJohnson",
    researchGate: "researchgate.net/profile/Sarah_Johnson",
  },
  bio: "Dr. Sarah Johnson is an award-winning mathematics educator with over 10 years of teaching experience. She specializes in advanced calculus and statistics, with research interests in mathematical modeling and educational technology. Dr. Johnson is passionate about making complex mathematical concepts accessible to students of all learning styles.",
  expertise: ["Calculus", "Statistics", "Algebra", "Mathematical Modeling", "Educational Technology"],
  achievements: [
    { title: "Teacher of the Year", year: "2022", issuer: "National Education Association" },
    { title: "Excellence in STEM Education Award", year: "2021", issuer: "State Department of Education" },
    { title: "Best Research Paper", year: "2020", issuer: "International Conference on Mathematics Education" },
  ],
  certifications: [
    {
      name: "Advanced Pedagogical Certification",
      issuer: "National Board for Professional Teaching Standards",
      year: "2019",
    },
    { name: "Educational Technology Integration", issuer: "EdTech Institute", year: "2020" },
  ],
  publications: [
    { title: "Innovative Approaches to Teaching Calculus", journal: "Journal of Mathematics Education", year: "2021" },
    {
      title: "Technology Integration in Mathematics Classrooms",
      journal: "Educational Technology Review",
      year: "2020",
    },
  ],
  currentClasses: [
    {
      id: "M101",
      name: "Advanced Calculus",
      grade: "12th Grade",
      students: 24,
      schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
      room: "Science Block, Room 305",
    },
    {
      id: "M202",
      name: "Statistics & Probability",
      grade: "11th Grade",
      students: 28,
      schedule: "Tue, Thu 11:00 AM - 12:30 PM",
      room: "Science Block, Room 308",
    },
    {
      id: "M303",
      name: "Linear Algebra",
      grade: "12th Grade",
      students: 22,
      schedule: "Mon, Wed 1:00 PM - 2:30 PM",
      room: "Science Block, Room 301",
    },
  ],
  upcomingEvents: [
    { title: "Parent-Teacher Conference", date: "October 15, 2023", time: "4:00 PM - 7:00 PM", location: "Main Hall" },
    {
      title: "Mathematics Department Meeting",
      date: "October 10, 2023",
      time: "3:30 PM - 5:00 PM",
      location: "Conference Room B",
    },
    {
      title: "STEM Fair Planning Committee",
      date: "October 12, 2023",
      time: "4:00 PM - 5:30 PM",
      location: "Science Lab",
    },
  ],
  performanceMetrics: {
    studentSatisfaction: 92,
    peerReview: 95,
    administrativeReview: 94,
    professionalDevelopment: 98,
    researchContribution: 90,
  },
  pendingTasks: [
    { title: "Grade Calculus Mid-term Exams", deadline: "October 8, 2023", priority: "High" },
    { title: "Submit Q3 Curriculum Plan", deadline: "October 12, 2023", priority: "Medium" },
    { title: "Review Textbook Selections for Next Year", deadline: "October 20, 2023", priority: "Low" },
  ],
  recentAnnouncements: [
    {
      title: "School Closure - Staff Development Day",
      date: "October 18, 2023",
      content: "The school will be closed for students on October 18 for staff professional development.",
    },
    {
      title: "New Grading Software Implementation",
      date: "October 5, 2023",
      content: "Training sessions for the new grading software will be held next week. Please sign up for a slot.",
    },
  ],
  resources: [
    { title: "Calculus Lecture Notes", type: "PDF", size: "2.4 MB", lastUpdated: "September 28, 2023" },
    { title: "Statistics Problem Set Solutions", type: "PDF", size: "1.8 MB", lastUpdated: "September 25, 2023" },
    { title: "Linear Algebra Visualization Tools", type: "Software", size: "15 MB", lastUpdated: "September 20, 2023" },
  ],
  studentPerformance: [
    { class: "Advanced Calculus", averageGrade: 87, passingRate: 95, topPerformer: "Alex Chen" },
    { class: "Statistics & Probability", averageGrade: 84, passingRate: 92, topPerformer: "Maya Patel" },
    { class: "Linear Algebra", averageGrade: 82, passingRate: 90, topPerformer: "James Wilson" },
  ],
  attendanceRecord: {
    present: 45,
    absent: 2,
    late: 1,
    leaveOfAbsence: 0,
    attendanceRate: 98.5,
  },
  teachingSchedule: [
    {
      day: "Monday",
      periods: [
        { time: "9:00 AM - 10:30 AM", class: "Advanced Calculus", room: "305" },
        { time: "11:00 AM - 12:30 PM", class: "Office Hours", room: "Faculty Office" },
        { time: "1:00 PM - 2:30 PM", class: "Linear Algebra", room: "301" },
      ],
    },
    {
      day: "Tuesday",
      periods: [
        { time: "9:00 AM - 10:30 AM", class: "Department Planning", room: "Conference Room" },
        { time: "11:00 AM - 12:30 PM", class: "Statistics & Probability", room: "308" },
        { time: "1:00 PM - 2:30 PM", class: "Research Time", room: "Faculty Office" },
      ],
    },
    {
      day: "Wednesday",
      periods: [
        { time: "9:00 AM - 10:30 AM", class: "Advanced Calculus", room: "305" },
        { time: "11:00 AM - 12:30 PM", class: "Student Mentoring", room: "Faculty Office" },
        { time: "1:00 PM - 2:30 PM", class: "Linear Algebra", room: "301" },
      ],
    },
    {
      day: "Thursday",
      periods: [
        { time: "9:00 AM - 10:30 AM", class: "Professional Development", room: "Faculty Lounge" },
        { time: "11:00 AM - 12:30 PM", class: "Statistics & Probability", room: "308" },
        { time: "1:00 PM - 2:30 PM", class: "Math Club Supervision", room: "305" },
      ],
    },
    {
      day: "Friday",
      periods: [
        { time: "9:00 AM - 10:30 AM", class: "Advanced Calculus", room: "305" },
        { time: "11:00 AM - 12:30 PM", class: "Faculty Meeting", room: "Conference Room" },
        { time: "1:00 PM - 2:30 PM", class: "Office Hours", room: "Faculty Office" },
      ],
    },
  ],
  pendingGrading: [
    { assignment: "Calculus Mid-term Exam", class: "Advanced Calculus", dueDate: "October 8, 2023", submissions: 24 },
    {
      assignment: "Statistics Problem Set 3",
      class: "Statistics & Probability",
      dueDate: "October 10, 2023",
      submissions: 26,
    },
    { assignment: "Linear Algebra Quiz 2", class: "Linear Algebra", dueDate: "October 12, 2023", submissions: 22 },
  ],
  recentMessages: [
    { from: "Principal Williams", subject: "Upcoming Accreditation Visit", date: "October 3, 2023", read: true },
    {
      from: "Alex Chen (Student)",
      subject: "Question about Calculus Assignment",
      date: "October 3, 2023",
      read: false,
    },
    { from: "Dr. Robert Lee (Colleague)", subject: "STEM Fair Planning", date: "October 2, 2023", read: true },
  ],
}

// Tab Panel component
function TabPanel(props:any) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`teacher-tabpanel-${index}`}
      aria-labelledby={`teacher-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function TeacherProfile() {
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (newValue:any) => {
    setTabValue(newValue)
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Tooltip title="Verified Teacher">
                  <CheckCircle sx={{ color: "#4caf50", bgcolor: "white", borderRadius: "50%" }} />
                </Tooltip>
              }
            >
              <Avatar
                src={teacherData.avatar}
                alt={teacherData.name}
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid white",
                  boxShadow: theme.shadows[3],
                }}
              />
            </Badge>
          </Grid>
          <Grid item xs={12} sm>
            <Box sx={{ ml: { sm: 2 } }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {teacherData.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {teacherData.role} • {teacherData.department} Department
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                <Chip
                  icon={<School />}
                  label={`ID: ${teacherData.id}`}
                  size="small"
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}
                />
                <Chip
                  icon={<CalendarMonth />}
                  label={`Joined: ${teacherData.joinDate}`}
                  size="small"
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}
                />
                <Chip
                  icon={<Star />}
                  label="Teacher of the Year 2022"
                  size="small"
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: { xs: "flex-start", sm: "flex-end" },
                mt: { xs: 2, sm: 0 },
              }}
            >
              <Button
                variant="contained"
                startIcon={<Message />}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
                }}
              >
                Message
              </Button>
              <Button
                variant="contained"
                startIcon={<Edit />}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="teacher profile tabs"
          sx={{
            "& .MuiTab-root": {
              minHeight: 64,
              textTransform: "none",
              fontSize: "0.95rem",
              fontWeight: 500,
            },
          }}
        >
          <Tab icon={<Info />} label="Overview" iconPosition="start" />
          <Tab icon={<Class />} label="Classes & Students" iconPosition="start" />
          <Tab icon={<Assessment />} label="Performance" iconPosition="start" />
          <Tab icon={<Schedule />} label="Schedule" iconPosition="start" />
          <Tab icon={<Assignment />} label="Assignments & Grading" iconPosition="start" />
          <Tab icon={<People />} label="Communication" iconPosition="start" />
          <Tab icon={<MenuBook />} label="Resources" iconPosition="start" />
          <Tab icon={<EmojiEvents />} label="Achievements" iconPosition="start" />
          <Tab icon={<Settings />} label="Settings" iconPosition="start" />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={4}>
          {/* Bio Section */}
          <Grid item xs={12} md={8}>
            <Card elevation={2} sx={{ height: "100%", borderRadius: 2 }}>
              <CardHeader
                title="Professional Biography"
                action={
                  <IconButton aria-label="edit">
                    <Edit />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography variant="body1" paragraph>
                  {teacherData.bio}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Areas of Expertise
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {teacherData.expertise.map((skill, index) => (
                    <Chip key={index} label={skill} color="primary" variant="outlined" size="medium" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: "100%", borderRadius: 2 }}>
              <CardHeader title="Contact Information" />
              <CardContent>
                <List sx={{ p: 0 }}>
                  <ListItem>
                    <ListItemIcon>
                      <Mail color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Email" secondary={teacherData.contact.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Phone" secondary={teacherData.contact.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Office" secondary={teacherData.contact.address} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Language color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Website" secondary={teacherData.contact.website} />
                  </ListItem>
                </List>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Social Media
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton color="primary">
                    <LinkedIn />
                  </IconButton>
                  <IconButton color="primary">
                    <Twitter />
                  </IconButton>
                  <IconButton color="primary">
                    <Facebook />
                  </IconButton>
                  <IconButton color="primary">
                    <Instagram />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Education & Certifications */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader title="Education & Certifications" />
              <CardContent>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  Education
                </Typography>
                <List>
                  {teacherData.education.map((edu, index) => (
                    <ListItem key={index} sx={{ py: 1 }}>
                      <ListItemIcon>
                        <School color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={edu.degree} secondary={`${edu.institution}, ${edu.year}`} />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom color="primary">
                  Certifications
                </Typography>
                <List>
                  {teacherData.certifications.map((cert, index) => (
                    <ListItem key={index} sx={{ py: 1 }}>
                      <ListItemIcon>
                        <CheckCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={cert.name} secondary={`${cert.issuer}, ${cert.year}`} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Upcoming Events */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader
                title="Upcoming Events"
                action={
                  <Button startIcon={<Add />} size="small">
                    Add Event
                  </Button>
                }
              />
              <CardContent>
                <List>
                  {teacherData.upcomingEvents.map((event, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        py: 1.5,
                        px: 2,
                        mb: 1.5,
                        bgcolor: alpha(theme.palette.primary.light, 0.1),
                        borderRadius: 1,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <CalendarMonth />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={event.title}
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              {event.date} • {event.time}
                            </Typography>
                            <br />
                            {event.location}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Performance Metrics */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader title="Performance Metrics" />
              <CardContent>
                <Grid container spacing={3}>
                  {Object.entries(teacherData.performanceMetrics).map(([key, value]) => (
                    <Grid item xs={12} sm={6} md={2.4} key={key}>
                      <Box sx={{ textAlign: "center", p: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          {key
                            .split(/(?=[A-Z])/)
                            .join(" ")
                            .replace(/^\w/, (c) => c.toUpperCase())}
                        </Typography>
                        <Box sx={{ position: "relative", display: "inline-flex" }}>
                          <Box
                            sx={{
                              position: "relative",
                              width: 100,
                              height: 100,
                            }}
                          >
                            <CircularProgressWithLabel value={value} />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Classes & Students Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={4}>
          {/* Current Classes */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader
                title="Current Classes"
                action={
                  <Button startIcon={<Add />} size="small">
                    Add Class
                  </Button>
                }
              />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Class ID</TableCell>
                        <TableCell>Class Name</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Students</TableCell>
                        <TableCell>Schedule</TableCell>
                        <TableCell>Room</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teacherData.currentClasses.map((cls) => (
                        <TableRow key={cls.id} hover>
                          <TableCell>{cls.id}</TableCell>
                          <TableCell>
                            <Typography variant="body1" fontWeight="medium">
                              {cls.name}
                            </Typography>
                          </TableCell>
                          <TableCell>{cls.grade}</TableCell>
                          <TableCell>
                            <Chip
                              icon={<People />}
                              label={cls.students}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>{cls.schedule}</TableCell>
                          <TableCell>{cls.room}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Tooltip title="View Class Details">
                                <IconButton size="small" color="primary">
                                  <Info />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit Class">
                                <IconButton size="small" color="primary">
                                  <Edit />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Student Performance */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader title="Student Performance Overview" />
              <CardContent>
                <Grid container spacing={3}>
                  {teacherData.studentPerformance.map((perf, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Card variant="outlined" sx={{ height: "100%" }}>
                        <CardHeader title={perf.class} titleTypographyProps={{ variant: "h6" }} sx={{ pb: 0 }} />
                        <CardContent>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Average Grade
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box sx={{ width: "100%", mr: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={perf.averageGrade}
                                  sx={{
                                    height: 10,
                                    borderRadius: 5,
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  }}
                                />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                {perf.averageGrade}%
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Passing Rate
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box sx={{ width: "100%", mr: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={perf.passingRate}
                                  sx={{
                                    height: 10,
                                    borderRadius: 5,
                                    bgcolor: alpha(theme.palette.success.main, 0.1),
                                    "& .MuiLinearProgress-bar": {
                                      bgcolor: theme.palette.success.main,
                                    },
                                  }}
                                />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                {perf.passingRate}%
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                            <Star sx={{ color: theme.palette.warning.main, mr: 1 }} />
                            <Typography variant="body2">
                              Top Performer: <b>{perf.topPerformer}</b>
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Performance Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={4}>
          {/* Performance Overview */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: 2, mb: 4 }}>
              <CardHeader title="Performance Overview" />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Box sx={{ height: 300, p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Typography variant="body1" color="text.secondary">
                        Performance chart would be displayed here (showing trends over time)
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <List>
                      {Object.entries(teacherData.performanceMetrics).map(([key, value]) => (
                        <ListItem key={key} sx={{ py: 1 }}>
                          <ListItemText
                            primary={key
                              .split(/(?=[A-Z])/)
                              .join(" ")
                              .replace(/^\w/, (c) => c.toUpperCase())}
                            secondary={
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={value}
                                  sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    width: "70%",
                                    mr: 2,
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  }}
                                />
                                <Typography variant="body2" fontWeight="bold">
                                  {value}%
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Achievements */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader title="Professional Achievements" />
              <CardContent>
                <List>
                  {teacherData.achievements.map((achievement, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        py: 1.5,
                        px: 2,
                        mb: 1.5,
                        bgcolor: alpha(theme.palette.warning.light, 0.1),
                        borderRadius: 1,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.warning.main }}>
                          <EmojiEvents />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={achievement.title}
                        secondary={`${achievement.issuer} • ${achievement.year}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Publications */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader title="Publications & Research" />
              <CardContent>
                <List>
                  {teacherData.publications.map((pub, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        py: 1.5,
                        px: 2,
                        mb: 1.5,
                        bgcolor: alpha(theme.palette.info.light, 0.1),
                        borderRadius: 1,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                          <MenuBook />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={pub.title} secondary={`${pub.journal} • ${pub.year}`} />
                      <IconButton size="small">
                        <Download />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Attendance Record */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader title="Attendance Record" />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Box sx={{ height: 250, p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Typography variant="body1" color="text.secondary">
                        Attendance chart would be displayed here (showing monthly patterns)
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h4" color="success.main" gutterBottom>
                        {teacherData.attendanceRecord.attendanceRate}%
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Attendance Rate
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="text.primary">
                            {teacherData.attendanceRecord.present}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Present
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="text.primary">
                            {teacherData.attendanceRecord.absent}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Absent
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="text.primary">
                            {teacherData.attendanceRecord.late}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Late
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="text.primary">
                            {teacherData.attendanceRecord.leaveOfAbsence}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Leave
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Schedule Tab */}
      <TabPanel value={tabValue} index={3}>
        <Card elevation={2} sx={{ borderRadius: 2 }}>
          <CardHeader
            title="Weekly Teaching Schedule"
            action={
              <Button startIcon={<Download />} size="small">
                Export Schedule
              </Button>
            }
          />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width="15%">Time</TableCell>
                    {teacherData.teachingSchedule.map((day) => (
                      <TableCell key={day.day} align="center">
                        {day.day}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {["9:00 AM - 10:30 AM", "11:00 AM - 12:30 PM", "1:00 PM - 2:30 PM"].map((timeSlot) => (
                    <TableRow key={timeSlot} hover>
                      <TableCell>{timeSlot}</TableCell>
                      {teacherData.teachingSchedule.map((day) => {
                        const period = day.periods.find((p) => p.time === timeSlot)
                        return (
                          <TableCell key={`${day.day}-${timeSlot}`} align="center">
                            {period ? (
                              <Box
                                sx={{
                                  p: 1.5,
                                  borderRadius: 1,
                                  bgcolor: period.class.includes("Office Hours")
                                    ? alpha(theme.palette.info.light, 0.2)
                                    : period.class.includes("Planning") ||
                                        period.class.includes("Meeting") ||
                                        period.class.includes("Development")
                                      ? alpha(theme.palette.warning.light, 0.2)
                                      : alpha(theme.palette.primary.light, 0.2),
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <Typography variant="body1" fontWeight="medium">
                                  {period.class}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Room {period.room}
                                </Typography>
                              </Box>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                Free Period
                              </Typography>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Assignments & Grading Tab */}
      <TabPanel value={tabValue} index={4}>
        <Grid container spacing={4}>
          {/* Pending Grading */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader
                title="Pending Assignments to Grade"
                action={
                  <Button startIcon={<Add />} size="small">
                    Add Assignment
                  </Button>
                }
              />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Assignment</TableCell>
                        <TableCell>Class</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Submissions</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teacherData.pendingGrading.map((assignment, index) => (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Typography variant="body1" fontWeight="medium">
                              {assignment.assignment}
                            </Typography>
                          </TableCell>
                          <TableCell>{assignment.class}</TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>
                            <Chip
                              label={`${assignment.submissions} submissions`}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip label="Pending" size="small" color="warning" icon={<Warning fontSize="small" />} />
                          </TableCell>
                          <TableCell>
                            <Button variant="contained" size="small" color="primary">
                              Grade Now
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Pending Tasks */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader title="Pending Tasks" />
              <CardContent>
                <List>
                  {teacherData.pendingTasks.map((task, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        py: 1.5,
                        px: 2,
                        mb: 1.5,
                        bgcolor: alpha(
                          task.priority === "High"
                            ? theme.palette.error.main
                            : task.priority === "Medium"
                              ? theme.palette.warning.main
                              : theme.palette.info.main,
                          0.1,
                        ),
                        borderRadius: 1,
                      }}
                    >
                      <ListItemIcon>
                        {task.priority === "High" ? (
                          <Warning color="error" />
                        ) : task.priority === "Medium" ? (
                          <Warning color="warning" />
                        ) : (
                          <Info color="info" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={task.title}
                        secondary={`Due: ${task.deadline} • Priority: ${task.priority}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Announcements */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader
                title="Recent Announcements"
                action={
                  <Button startIcon={<Add />} size="small">
                    New Announcement
                  </Button>
                }
              />
              <CardContent>
                <List>
                  {teacherData.recentAnnouncements.map((announcement, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        py: 1.5,
                        px: 2,
                        mb: 1.5,
                        bgcolor: alpha(theme.palette.primary.light, 0.1),
                        borderRadius: 1,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <Notifications />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={announcement.title}
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              {announcement.date}
                            </Typography>
                            <br />
                            {announcement.content}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Communication Tab */}
      <TabPanel value={tabValue} index={5}>
        <Grid container spacing={4}>
          {/* Messages */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader
                title="Recent Messages"
                action={
                  <Button startIcon={<Add />} size="small">
                    Compose Message
                  </Button>
                }
              />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>From</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teacherData.recentMessages.map((message, index) => (
                        <TableRow
                          key={index}
                          hover
                          sx={{
                            bgcolor: message.read ? "inherit" : alpha(theme.palette.primary.light, 0.05),
                          }}
                        >
                          <TableCell>
                            <Typography variant="body1" fontWeight={message.read ? "regular" : "medium"}>
                              {message.from}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" fontWeight={message.read ? "regular" : "medium"}>
                              {message.subject}
                            </Typography>
                          </TableCell>
                          <TableCell>{message.date}</TableCell>
                          <TableCell>
                            {message.read ? (
                              <Chip label="Read" size="small" color="default" variant="outlined" />
                            ) : (
                              <Chip label="Unread" size="small" color="primary" />
                            )}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Button variant="outlined" size="small" color="primary">
                                Read
                              </Button>
                              <Button variant="outlined" size="small" color="primary">
                                Reply
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Communication Tools */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    height: "100%",
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <Avatar
                      sx={{
                        width: 70,
                        height: 70,
                        bgcolor: theme.palette.primary.main,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <People fontSize="large" />
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      Parent-Teacher Meetings
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Schedule and manage parent-teacher conferences and meetings
                    </Typography>
                    <Button variant="contained" color="primary" fullWidth>
                      Schedule Meeting
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    height: "100%",
                    bgcolor: alpha(theme.palette.warning.main, 0.05),
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <Avatar
                      sx={{
                        width: 70,
                        height: 70,
                        bgcolor: theme.palette.warning.main,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <Notifications fontSize="large" />
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      Class Announcements
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Send important announcements to students and parents
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: theme.palette.warning.main, "&:hover": { bgcolor: theme.palette.warning.dark } }}
                      fullWidth
                    >
                      Create Announcement
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    height: "100%",
                    bgcolor: alpha(theme.palette.success.main, 0.05),
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <Avatar
                      sx={{
                        width: 70,
                        height: 70,
                        bgcolor: theme.palette.success.main,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <Message fontSize="large" />
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      Direct Messaging
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Send private messages to students, parents, or colleagues
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: theme.palette.success.main, "&:hover": { bgcolor: theme.palette.success.dark } }}
                      fullWidth
                    >
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Resources Tab */}
      <TabPanel value={tabValue} index={6}>
        <Grid container spacing={4}>
          {/* Teaching Resources */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader
                title="Teaching Resources"
                action={
                  <Button startIcon={<Add />} size="small">
                    Upload Resource
                  </Button>
                }
              />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Resource Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Last Updated</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teacherData.resources.map((resource, index) => (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                sx={{
                                  mr: 2,
                                  bgcolor:
                                    resource.type === "PDF"
                                      ? "#f44336"
                                      : resource.type === "Document"
                                        ? "#2196f3"
                                        : resource.type === "Spreadsheet"
                                          ? "#4caf50"
                                          : resource.type === "Presentation"
                                            ? "#ff9800"
                                            : resource.type === "Software"
                                              ? "#9c27b0"
                                              : "#757575",
                                }}
                              >
                                <Folder />
                              </Avatar>
                              <Typography variant="body1">{resource.title}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{resource.type}</TableCell>
                          <TableCell>{resource.size}</TableCell>
                          <TableCell>{resource.lastUpdated}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Button variant="outlined" size="small" startIcon={<Download />}>
                                Download
                              </Button>
                              <IconButton size="small">
                                <Edit />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Resource Categories */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 3 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: theme.palette.primary.main,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <MenuBook />
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      Lesson Plans
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      12 items
                    </Typography>
                    <Button variant="outlined" color="primary" fullWidth>
                      View All
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.error.main, 0.05),
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 3 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: theme.palette.error.main,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <Assessment />
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      Assessments
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      8 items
                    </Typography>
                    <Button variant="outlined" color="error" fullWidth>
                      View All
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.05),
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 3 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: theme.palette.success.main,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <Assignment />
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      Worksheets
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      15 items
                    </Typography>
                    <Button variant="outlined" color="success" fullWidth>
                      View All
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.warning.main, 0.05),
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 3 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: theme.palette.warning.main,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <BarChart />
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      Presentations
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      6 items
                    </Typography>
                    <Button variant="outlined" color="warning" fullWidth>
                      View All
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Achievements Tab */}
      <TabPanel value={tabValue} index={7}>
        <Grid container spacing={4}>
          {/* Professional Achievements */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader title="Professional Achievements" />
              <CardContent>
                <Timeline>
                  {teacherData.achievements.map((achievement, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot color="primary">
                          <EmojiEvents />
                        </TimelineDot>
                        {index < teacherData.achievements.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="h6" component="span">
                            {achievement.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {achievement.issuer} • {achievement.year}
                          </Typography>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </CardContent>
            </Card>
          </Grid>

          {/* Education & Certifications */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader title="Education & Certifications" />
              <CardContent>
                <Typography variant="subtitle1" gutterBottom color="primary">
                  Education
                </Typography>
                <Timeline>
                  {teacherData.education.map((edu, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot color="secondary">
                          <School />
                        </TimelineDot>
                        {index < teacherData.education.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="h6" component="span">
                            {edu.degree}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {edu.institution} • {edu.year}
                          </Typography>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>

                <Divider sx={{ my: 3 }} />

                <Typography variant="subtitle1" gutterBottom color="primary">
                  Certifications
                </Typography>
                <Timeline>
                  {teacherData.certifications.map((cert, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot color="success">
                          <CheckCircle />
                        </TimelineDot>
                        {index < teacherData.certifications.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="h6" component="span">
                            {cert.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {cert.issuer} • {cert.year}
                          </Typography>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </CardContent>
            </Card>
          </Grid>

          {/* Publications */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader title="Publications & Research" />
              <CardContent>
                <Grid container spacing={3}>
                  {teacherData.publications.map((pub, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Card variant="outlined" sx={{ height: "100%" }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {pub.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {pub.journal} • {pub.year}
                          </Typography>
                          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                            <Button variant="outlined" size="small" startIcon={<Download />}>
                              Download
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Settings Tab */}
      <TabPanel value={tabValue} index={8}>
        <Grid container spacing={4}>
          {/* Account Settings */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader title="Account Settings" />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Profile Information"
                      secondary="Update your personal and professional information"
                    />
                    <Button variant="outlined" size="small">
                      Edit
                    </Button>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText
                      primary="Password & Security"
                      secondary="Manage your password and security settings"
                    />
                    <Button variant="outlined" size="small">
                      Change
                    </Button>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText
                      primary="Notification Preferences"
                      secondary="Control which notifications you receive"
                    />
                    <Button variant="outlined" size="small">
                      Configure
                    </Button>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText primary="Privacy Settings" secondary="Manage who can see your information" />
                    <Button variant="outlined" size="small">
                      Adjust
                    </Button>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* System Preferences */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader title="System Preferences" />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemText primary="Display Settings" secondary="Customize your dashboard appearance" />
                    <Button variant="outlined" size="small">
                      Customize
                    </Button>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText
                      primary="Language & Region"
                      secondary="Set your preferred language and regional settings"
                    />
                    <Button variant="outlined" size="small">
                      Change
                    </Button>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText primary="Accessibility" secondary="Configure accessibility features" />
                    <Button variant="outlined" size="small">
                      Configure
                    </Button>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText primary="Data Export" secondary="Export your data and reports" />
                    <Button variant="outlined" size="small">
                      Export
                    </Button>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Integration Settings */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardHeader title="Integrations & Connected Services" />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                      <CardContent sx={{ textAlign: "center", py: 3 }}>
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            mx: "auto",
                            mb: 2,
                          }}
                        >
                          <Google />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                          Google Classroom
                        </Typography>
                        <Chip label="Connected" color="success" size="small" sx={{ mb: 2 }} />
                        <Button variant="outlined" fullWidth>
                          Manage
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                      <CardContent sx={{ textAlign: "center", py: 3 }}>
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            mx: "auto",
                            mb: 2,
                          }}
                        >
                          <Microsoft />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                          Microsoft Teams
                        </Typography>
                        <Chip label="Not Connected" color="default" size="small" sx={{ mb: 2 }} />
                        <Button variant="outlined" fullWidth>
                          Connect
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                      <CardContent sx={{ textAlign: "center", py: 3 }}>
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            mx: "auto",
                            mb: 2,
                          }}
                        >
                          <Zoom />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                          Zoom
                        </Typography>
                        <Chip label="Connected" color="success" size="small" sx={{ mb: 2 }} />
                        <Button variant="outlined" fullWidth>
                          Manage
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
  )
}

// Helper component for circular progress with label
function CircularProgressWithLabel(props:any) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => alpha(theme.palette.primary.main, 0.2),
          position: "absolute",
          left: 0,
        }}
        size={100}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.primary.main,
        }}
        size={100}
        thickness={4}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" component="div" color="text.primary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}

// Timeline components
function Timeline({ children }:any) {
  return (
    <Box
      sx={{
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 16,
          width: 4,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
          borderRadius: 2,
        },
      }}
    >
      {children}
    </Box>
  )
}

function TimelineItem({ children }:any) {
  return <Box sx={{ display: "flex" }}>{children}</Box>
}

function TimelineSeparator({ children }:any) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mr: 2,
      }}
    >
      {children}
    </Box>
  )
}

function TimelineConnector() {
  return (
    <Box
      sx={{
        width: 4,
        height: 40,
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
        borderRadius: 2,
      }}
    />
  )
}



type PaletteColorOption = 
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

interface TimelineDotProps {
  children?: React.ReactNode;
  color?: PaletteColorOption | string;
  sx?: SxProps<Theme>;
}

function TimelineDot({ children, color = "primary", sx }: TimelineDotProps) {
  return (
    <Avatar
      sx={{
        width: 36,
        height: 36,
        bgcolor: (theme: Theme) => {
          // Check if it's a standard palette color
          if (typeof color === 'string' && color in theme.palette) {
            const paletteColor = theme.palette[color as keyof typeof theme.palette];
            // Check if it has a 'main' property (PaletteColor type)
            if (paletteColor && typeof paletteColor === 'object' && 'main' in paletteColor) {
              return paletteColor.main;
            }
          }
          // Fallback to raw color value (for custom colors or invalid palette colors)
          return color;
        },
        color: "white",
        zIndex: 1,
        ...sx,
      }}
    >
      {children}
    </Avatar>
  );
}

function TimelineContent({ children }:any) {
  return <Box sx={{ py: 1 }}>{children}</Box>
}

// Mock icons for integrations
function Google() {
  return <Box>G</Box>
}

function Microsoft() {
  return <Box>M</Box>
}

function Zoom() {
  return <Box>Z</Box>
}
