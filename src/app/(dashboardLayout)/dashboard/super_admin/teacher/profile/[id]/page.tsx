/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
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
  Badge,
  Tooltip,
  useTheme,
  alpha,
  IconButton,
  Divider,
  Fade,
  useMediaQuery,
} from "@mui/material"
import {
  School,
  Schedule,
  Class,
  Assessment,
  People,
  Assignment,
  Message,
  CalendarMonth,
  MenuBook,
  EmojiEvents,
  Settings,
  Edit,
  CheckCircle,
  Info,
  Star,
  Notifications,
  Mail,
  Download,
  QueryStats,
  Description,
} from "@mui/icons-material"
import TeacherOverview from "../_components/TeacherOverview"
import ClassStudent from "../_components/ClassStudent"
import TeacherPerformance from "../_components/TeacherPerformance"
import TeacherSchedule from "../_components/TeacherSchedule"
import AssignmentGrading from "../_components/AssignmentGrading"
import CommunicationTab from "../_components/CommunicationTab"
import TeacherResource from "../_components/TeacherResource"
import TeacherAchivement from "../_components/TeacherAchivement"
import TeacherAttendance from "../_components/TeacherAttendance"
import ReportGenerator from "../_components/ReportGenerator"
import StudentAnalytics from "../_components/StudentAnalytics"
import ProfileSetting from "../_components/ProfileSetting"
import { useGetSingleTeacherQuery } from "@/redux/api/teacherApi"


export const teacherData = {
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

interface TabPanelProps {
  children?: React.ReactNode
  value: number
  index: number
}
interface PageProps {
  params: {
    id: string;
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`teacher-tabpanel-${index}`}
      aria-labelledby={`teacher-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Fade in={value === index} timeout={500}>
          <Box>{children}</Box>
        </Fade>
      )}
    </div>
  )
}

export default function TeacherProfile({ params }: PageProps) {
  const { id } = params

  const { data } = useGetSingleTeacherQuery({id})
  console.log(data)

  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const getTabProps = (index: number) => {
    return {
      id: `teacher-tab-${index}`,
      "aria-controls": `teacher-tabpanel-${index}`,
    }
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header Section with Gradient Background */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: "white",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
            zIndex: 0,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm="auto">
              <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-start" } }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <Tooltip title="Verified Teacher">
                      <CheckCircle sx={{ color: "#4caf50", bgcolor: "white", borderRadius: "50%", fontSize: 28 }} />
                    </Tooltip>
                  }
                >
                  <Avatar
                    src={teacherData.avatar}
                    alt={teacherData.name}
                    sx={{
                      width: { xs: 100, sm: 130 },
                      height: { xs: 100, sm: 130 },
                      border: "4px solid white",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Badge>
              </Box>
            </Grid>
            <Grid item xs={12} sm>
              <Box sx={{ ml: { sm: 2 }, textAlign: { xs: "center", sm: "left" } }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
                >
                  {teacherData.name}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ opacity: 0.9 }}>
                  {teacherData.role} • {teacherData.department} Department
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mt: 1,
                    justifyContent: { xs: "center", sm: "flex-start" },
                  }}
                >
                  <Chip
                    icon={<School />}
                    label={`ID: ${teacherData.id}`}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.15)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.25)",
                      },
                    }}
                  />
                  <Chip
                    icon={<CalendarMonth />}
                    label={`Joined: ${teacherData.joinDate}`}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.15)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.25)",
                      },
                    }}
                  />
                  <Chip
                    icon={<Star />}
                    label="Teacher of the Year 2022"
                    size="small"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.15)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.25)",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm="auto">
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: { xs: "center", sm: "flex-end" },
                  mt: { xs: 2, sm: 0 },
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<Message />}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.25)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  Message
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.25)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Quick Stats Row */}
          <Box sx={{ mt: 3, display: { xs: "none", md: "block" } }}>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 2 }} />
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item xs>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    3
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Active Classes
                  </Typography>
                </Box>
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
              <Grid item xs>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    74
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Students
                  </Typography>
                </Box>
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
              <Grid item xs>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    98.5%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Attendance
                  </Typography>
                </Box>
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
              <Grid item xs>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    92%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Satisfaction
                  </Typography>
                </Box>
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
              <Grid item xs>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    3
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Pending Tasks
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>

      {/* Notification Bar */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 4,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          background: `linear-gradient(to right, ${alpha(theme.palette.warning.light, 0.2)}, ${alpha(theme.palette.warning.light, 0.05)})`,
          border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
        }}
      >
        <Notifications sx={{ color: theme.palette.warning.main, mr: 2 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" fontWeight="medium">
            3 pending assignments to grade • Parent-Teacher Conference on October 15
          </Typography>
        </Box>
        <IconButton size="small" sx={{ ml: 1 }}>
          <Mail />
        </IconButton>
        <IconButton size="small" sx={{ ml: 1 }}>
          <Download />
        </IconButton>
      </Paper>

      {/* Navigation Tabs */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 2,
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: "background.paper",
          borderRadius: "8px 8px 0 0",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
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
              transition: "all 0.3s ease",
              "&:hover": {
                color: theme.palette.primary.main,
                opacity: 1,
              },
            },
            "& .Mui-selected": {
              fontWeight: 600,
              background: alpha(theme.palette.primary.main, 0.08),
              borderRadius: "8px 8px 0 0",
            },
            "& .MuiTabs-indicator": {
              height: 3,
              borderRadius: "3px 3px 0 0",
            },
          }}
        >
          <Tab icon={<Info />} label={isSmall ? "" : "Overview"} iconPosition="start" {...getTabProps(0)} />
          <Tab icon={<Class />} label={isSmall ? "" : "Classes & Students"} iconPosition="start" {...getTabProps(1)} />
          <Tab icon={<Assessment />} label={isSmall ? "" : "Performance"} iconPosition="start" {...getTabProps(2)} />
          <Tab icon={<Schedule />} label={isSmall ? "" : "Schedule"} iconPosition="start" {...getTabProps(3)} />
          <Tab icon={<Assignment />} label={isSmall ? "" : "Assignments"} iconPosition="start" {...getTabProps(4)} />
          <Tab icon={<People />} label={isSmall ? "" : "Communication"} iconPosition="start" {...getTabProps(5)} />
          <Tab icon={<MenuBook />} label={isSmall ? "" : "Resources"} iconPosition="start" {...getTabProps(6)} />
          <Tab icon={<EmojiEvents />} label={isSmall ? "" : "Achievements"} iconPosition="start" {...getTabProps(7)} />
          <Tab icon={<CalendarMonth />} label={isSmall ? "" : "Attendance"} iconPosition="start" {...getTabProps(8)} />
          <Tab icon={<Description />} label={isSmall ? "" : "Reports"} iconPosition="start" {...getTabProps(9)} />
          <Tab icon={<QueryStats />} label={isSmall ? "" : "Analytics"} iconPosition="start" {...getTabProps(10)} />
          <Tab icon={<Settings />} label={isSmall ? "" : "Settings"} iconPosition="start" {...getTabProps(11)} />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <TeacherOverview />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <ClassStudent />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <TeacherPerformance />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <TeacherSchedule />
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <AssignmentGrading />
      </TabPanel>

      <TabPanel value={tabValue} index={5}>
        <CommunicationTab />
      </TabPanel>

      <TabPanel value={tabValue} index={6}>
        <TeacherResource />
      </TabPanel>

      <TabPanel value={tabValue} index={7}>
        <TeacherAchivement />
      </TabPanel>

      <TabPanel value={tabValue} index={8}>
        <TeacherAttendance />
      </TabPanel>

      <TabPanel value={tabValue} index={9}>
        <ReportGenerator />
      </TabPanel>

      <TabPanel value={tabValue} index={10}>
        <StudentAnalytics />
      </TabPanel>

      <TabPanel value={tabValue} index={11}>
        <ProfileSetting />
      </TabPanel>
    </Container>
  )
}
