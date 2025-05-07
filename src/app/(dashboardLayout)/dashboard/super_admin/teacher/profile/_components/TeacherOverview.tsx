"use client"

import React from "react"
import {
  Box,
  Grid,
  Typography,
  Avatar,
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
  alpha,
  useTheme,
  CircularProgress,
  Tooltip,
  Paper,
  Fade,
} from "@mui/material"
import {
  School,
  CalendarMonth,
  Edit,
  Add,
  CheckCircle,
  Mail,
  Phone,
  LocationOn,
  Language,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  VerifiedUser,
  Lightbulb,
  Timeline,
  Assessment,
} from "@mui/icons-material"

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
// Helper component for circular progress with label
function CircularProgressWithLabel(props: { value: number; color?: string }) {
  const theme = useTheme()
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
          color: props.color || theme.palette.primary.main,
        }}
        size={100}
        thickness={4}
        value={props.value}
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
        <Typography variant="h5" component="div" color="text.primary" fontWeight="bold">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}

const TeacherOverview = () => {
  const theme = useTheme()

  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={4}>
        {/* Bio Section */}
        <Grid item xs={12} md={8}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                borderColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Lightbulb sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Professional Biography
                  </Typography>
                </Box>
              }
              action={
                <IconButton aria-label="edit" sx={{ color: theme.palette.primary.main }}>
                  <Edit />
                </IconButton>
              }
            />
            <CardContent>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                {teacherData.bio}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                <VerifiedUser sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
                Areas of Expertise
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {teacherData.expertise.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    color="primary"
                    variant="outlined"
                    size="medium"
                    sx={{
                      borderRadius: "8px",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        transform: "translateY(-2px)",
                      },
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                borderColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Mail sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Contact Information
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <List sx={{ p: 0 }}>
                <ListItem
                  sx={{
                    py: 1.5,
                    px: 2,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.light, 0.05),
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.light, 0.1),
                    },
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.9) }}>
                      <Mail />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" color="text.secondary">
                        Email
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" fontWeight="medium" color="text.primary">
                        {teacherData.contact.email}
                      </Typography>
                    }
                  />
                </ListItem>

                <ListItem
                  sx={{
                    py: 1.5,
                    px: 2,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.light, 0.05),
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.light, 0.1),
                    },
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.9) }}>
                      <Phone />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" color="text.secondary">
                        Phone
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" fontWeight="medium" color="text.primary">
                        {teacherData.contact.phone}
                      </Typography>
                    }
                  />
                </ListItem>

                <ListItem
                  sx={{
                    py: 1.5,
                    px: 2,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.light, 0.05),
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.light, 0.1),
                    },
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.9) }}>
                      <LocationOn />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" color="text.secondary">
                        Office
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" fontWeight="medium" color="text.primary">
                        {teacherData.contact.address}
                      </Typography>
                    }
                  />
                </ListItem>

                <ListItem
                  sx={{
                    py: 1.5,
                    px: 2,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.light, 0.05),
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.light, 0.1),
                    },
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.9) }}>
                      <Language />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" color="text.secondary">
                        Website
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" fontWeight="medium" color="text.primary">
                        {teacherData.contact.website}
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="subtitle1"
                gutterBottom
                fontWeight="medium"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Timeline sx={{ mr: 1, fontSize: 20, color: theme.palette.primary.main }} />
                Social Media
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Tooltip title="LinkedIn">
                  <IconButton
                    color="primary"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <LinkedIn />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Twitter">
                  <IconButton
                    sx={{
                      color: "#1DA1F2",
                      bgcolor: alpha("#1DA1F2", 0.1),
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha("#1DA1F2", 0.2),
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Twitter />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Facebook">
                  <IconButton
                    sx={{
                      color: "#4267B2",
                      bgcolor: alpha("#4267B2", 0.1),
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha("#4267B2", 0.2),
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Facebook />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Instagram">
                  <IconButton
                    sx={{
                      color: "#C13584",
                      bgcolor: alpha("#C13584", 0.1),
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha("#C13584", 0.2),
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Instagram />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Education & Certifications */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                borderColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <School sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Education & Certifications
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                color="primary"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  p: 1,
                  borderRadius: 2,
                }}
              >
                <School sx={{ mr: 1, fontSize: 20 }} />
                Education
              </Typography>
              <List>
                {teacherData.education.map((edu, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      py: 1.5,
                      px: 2,
                      mb: 1,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.light, 0.05),
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.light, 0.1),
                        transform: "translateX(5px)",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <School />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight="medium">
                          {edu.degree}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {edu.institution}, {edu.year}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="subtitle1"
                gutterBottom
                color="primary"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  p: 1,
                  borderRadius: 2,
                }}
              >
                <CheckCircle sx={{ mr: 1, fontSize: 20 }} />
                Certifications
              </Typography>
              <List>
                {teacherData.certifications.map((cert, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      py: 1.5,
                      px: 2,
                      mb: 1,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.success.light, 0.05),
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.success.light, 0.1),
                        transform: "translateX(5px)",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                        <CheckCircle />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight="medium">
                          {cert.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {cert.issuer}, {cert.year}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                borderColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarMonth sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Upcoming Events
                  </Typography>
                </Box>
              }
              action={
                <Button
                  startIcon={<Add />}
                  size="small"
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
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
                      py: 2,
                      px: 2,
                      mb: 2,
                      borderRadius: 3,
                      bgcolor:
                        index === 0
                          ? alpha(theme.palette.error.light, 0.1)
                          : index === 1
                            ? alpha(theme.palette.primary.light, 0.1)
                            : alpha(theme.palette.warning.light, 0.1),
                      border: `1px solid ${
                        index === 0
                          ? alpha(theme.palette.error.main, 0.2)
                          : index === 1
                            ? alpha(theme.palette.primary.main, 0.2)
                            : alpha(theme.palette.warning.main, 0.2)
                      }`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
                        bgcolor:
                          index === 0
                            ? alpha(theme.palette.error.light, 0.15)
                            : index === 1
                              ? alpha(theme.palette.primary.light, 0.15)
                              : alpha(theme.palette.warning.light, 0.15),
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor:
                            index === 0
                              ? theme.palette.error.main
                              : index === 1
                                ? theme.palette.primary.main
                                : theme.palette.warning.main,
                          width: 50,
                          height: 50,
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <CalendarMonth />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight="bold">
                          {event.title}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="text.primary" fontWeight="medium">
                            {event.date} • {event.time}
                          </Typography>
                          <br />
                          <Typography variant="body2" color="text.secondary">
                            {event.location}
                          </Typography>
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
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                borderColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Assessment sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Performance Metrics
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                {Object.entries(teacherData.performanceMetrics).map(([key, value], index) => (
                  <Grid item xs={12} sm={6} md={2.4} key={key}>
                    <Paper
                      elevation={0}
                      sx={{
                        textAlign: "center",
                        p: 3,
                        borderRadius: 3,
                        bgcolor: [
                          alpha(theme.palette.primary.light, 0.1),
                          alpha(theme.palette.success.light, 0.1),
                          alpha(theme.palette.info.light, 0.1),
                          alpha(theme.palette.warning.light, 0.1),
                          alpha(theme.palette.error.light, 0.1),
                        ][index % 5],
                        border: `1px solid ${
                          [
                            alpha(theme.palette.primary.main, 0.2),
                            alpha(theme.palette.success.main, 0.2),
                            alpha(theme.palette.info.main, 0.2),
                            alpha(theme.palette.warning.main, 0.2),
                            alpha(theme.palette.error.main, 0.2),
                          ][index % 5]
                        }`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontWeight: "medium" }}>
                        {key
                          .split(/(?=[A-Z])/)
                          .join(" ")
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </Typography>
                      <Box sx={{ position: "relative", display: "inline-flex", my: 2 }}>
                        <CircularProgressWithLabel
                          value={value}
                          color={
                            [
                              theme.palette.primary.main,
                              theme.palette.success.main,
                              theme.palette.info.main,
                              theme.palette.warning.main,
                              theme.palette.error.main,
                            ][index % 5]
                          }
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          color: [
                            theme.palette.primary.dark,
                            theme.palette.success.dark,
                            theme.palette.info.dark,
                            theme.palette.warning.dark,
                            theme.palette.error.dark,
                          ][index % 5],
                          fontWeight: "medium",
                        }}
                      >
                        {value >= 90
                          ? "Excellent"
                          : value >= 80
                            ? "Very Good"
                            : value >= 70
                              ? "Good"
                              : "Needs Improvement"}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fade>
  )
}

export default TeacherOverview
