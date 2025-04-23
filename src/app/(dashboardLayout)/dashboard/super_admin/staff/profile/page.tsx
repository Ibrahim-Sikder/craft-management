/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material"

import {
  AccessTime,
  Assignment,
  Badge,
  CheckCircle,
  Dashboard,
  Description,
  Download,
  Edit,
  Email,
  EventAvailable,
  FileDownload,
  FileUpload,
  Folder,
  History,
  KeyboardArrowDown,
  LocationOn,
  MoreVert,
  Person,
  Phone,
  School,
  Search,
  Settings,
  Star,
  Task,
  Timeline,
  Visibility,
  Work,
  Print,
  Add,
} from "@mui/icons-material"

// Mock data for staff profile
const staffData = {
  id: "ST-2023-001",
  name: "Alexandra Johnson",
  role: "Administrative Officer",
  department: "Administration",
  email: "alexandra.johnson@schoolerp.edu",
  phone: "+1 (555) 123-4567",
  address: "123 Education Street, Academic City, AC 12345",
  joinDate: "August 15, 2018",
  status: "Active",
  avatar: "/placeholder.svg?height=150&width=150",
  bio: "Dedicated administrative professional with over 10 years of experience in educational institutions. Specializes in process optimization, staff coordination, and student services management.",
  education: [
    {
      degree: "Master of Business Administration",
      institution: "University of Management",
      year: "2015",
    },
    {
      degree: "Bachelor of Arts in Education Administration",
      institution: "State University",
      year: "2010",
    },
  ],
  skills: [
    "Administrative Management",
    "Staff Coordination",
    "Budget Planning",
    "Event Organization",
    "Student Services",
    "Process Optimization",
    "Communication",
    "MS Office Suite",
    "ERP Systems",
  ],
  certifications: [
    {
      name: "Certified Administrative Professional (CAP)",
      issuer: "International Association of Administrative Professionals",
      date: "2019",
      expires: "2025",
    },
    {
      name: "Educational Institution Management Certificate",
      issuer: "Education Management Association",
      date: "2020",
      expires: "2023",
    },
  ],
  performance: {
    overall: 92,
    taskCompletion: 95,
    timeManagement: 90,
    teamwork: 94,
    communication: 93,
    innovation: 88,
  },
  attendance: {
    present: 230,
    absent: 5,
    leave: 15,
    late: 8,
    percentage: 96,
    history: [
      { date: "2023-09-01", status: "Present" },
      { date: "2023-09-02", status: "Present" },
      { date: "2023-09-03", status: "Weekend" },
      { date: "2023-09-04", status: "Weekend" },
      { date: "2023-09-05", status: "Present" },
      { date: "2023-09-06", status: "Late" },
      { date: "2023-09-07", status: "Present" },
      { date: "2023-09-08", status: "Present" },
      { date: "2023-09-09", status: "Present" },
      { date: "2023-09-10", status: "Weekend" },
      { date: "2023-09-11", status: "Weekend" },
      { date: "2023-09-12", status: "Leave" },
      { date: "2023-09-13", status: "Leave" },
      { date: "2023-09-14", status: "Present" },
    ],
  },
  schedule: [
    {
      day: "Monday",
      shifts: [{ start: "08:00 AM", end: "04:00 PM", type: "Regular" }],
    },
    {
      day: "Tuesday",
      shifts: [{ start: "08:00 AM", end: "04:00 PM", type: "Regular" }],
    },
    {
      day: "Wednesday",
      shifts: [{ start: "08:00 AM", end: "04:00 PM", type: "Regular" }],
    },
    {
      day: "Thursday",
      shifts: [{ start: "08:00 AM", end: "04:00 PM", type: "Regular" }],
    },
    {
      day: "Friday",
      shifts: [{ start: "08:00 AM", end: "01:00 PM", type: "Half Day" }],
    },
    { day: "Saturday", shifts: [] },
    { day: "Sunday", shifts: [] },
  ],
  tasks: [
    {
      id: "T-001",
      title: "Prepare Monthly Staff Report",
      description: "Compile and analyze staff performance data for September",
      status: "In Progress",
      priority: "High",
      dueDate: "2023-10-05",
      assignedBy: "Principal",
      progress: 65,
    },
    {
      id: "T-002",
      title: "Organize Staff Development Workshop",
      description: "Coordinate with external trainers for the upcoming professional development day",
      status: "Pending",
      priority: "Medium",
      dueDate: "2023-10-15",
      assignedBy: "HR Manager",
      progress: 30,
    },
    {
      id: "T-003",
      title: "Update Staff Handbook",
      description: "Revise the staff handbook with new policies and procedures",
      status: "Completed",
      priority: "Medium",
      dueDate: "2023-09-30",
      assignedBy: "Principal",
      progress: 100,
    },
    {
      id: "T-004",
      title: "Process New Staff Onboarding",
      description: "Complete documentation and orientation for three new staff members",
      status: "In Progress",
      priority: "High",
      dueDate: "2023-10-07",
      assignedBy: "HR Manager",
      progress: 75,
    },
  ],
  leaves: {
    annual: { total: 20, used: 12, remaining: 8 },
    sick: { total: 10, used: 3, remaining: 7 },
    personal: { total: 5, used: 0, remaining: 5 },
    history: [
      {
        type: "Annual",
        startDate: "2023-07-10",
        endDate: "2023-07-21",
        days: 10,
        reason: "Summer vacation",
        status: "Approved",
      },
      {
        type: "Sick",
        startDate: "2023-05-03",
        endDate: "2023-05-05",
        days: 3,
        reason: "Flu",
        status: "Approved",
      },
      {
        type: "Annual",
        startDate: "2023-09-12",
        endDate: "2023-09-13",
        days: 2,
        reason: "Family event",
        status: "Approved",
      },
    ],
  },
  documents: [
    {
      id: "DOC-001",
      name: "Employment Contract",
      type: "PDF",
      uploadDate: "2018-08-15",
      size: "1.2 MB",
    },
    {
      id: "DOC-002",
      name: "Academic Credentials",
      type: "PDF",
      uploadDate: "2018-08-15",
      size: "3.5 MB",
    },
    {
      id: "DOC-003",
      name: "Professional Certifications",
      type: "PDF",
      uploadDate: "2019-09-20",
      size: "2.1 MB",
    },
    {
      id: "DOC-004",
      name: "Annual Performance Review 2022",
      type: "PDF",
      uploadDate: "2022-12-15",
      size: "1.8 MB",
    },
  ],
  communications: [
    {
      id: "MSG-001",
      from: "Principal",
      subject: "Monthly Staff Meeting",
      preview: "Please prepare your department updates for the upcoming...",
      date: "2023-10-01",
      read: true,
    },
    {
      id: "MSG-002",
      from: "HR Department",
      subject: "Benefits Enrollment Period",
      preview: "The annual benefits enrollment period is now open...",
      date: "2023-09-28",
      read: false,
    },
    {
      id: "MSG-003",
      from: "IT Support",
      subject: "System Maintenance Notice",
      preview: "The school management system will be undergoing maintenance...",
      date: "2023-09-25",
      read: true,
    },
    {
      id: "MSG-004",
      from: "Finance Department",
      subject: "Budget Request Approval",
      preview: "Your budget request for the staff development workshop has been...",
      date: "2023-09-22",
      read: false,
    },
  ],
  training: [
    {
      id: "TR-001",
      title: "Advanced Administrative Skills Workshop",
      provider: "Professional Development Institute",
      date: "2023-06-15",
      duration: "16 hours",
      certificate: true,
    },
    {
      id: "TR-002",
      title: "Educational ERP System Advanced Training",
      provider: "Internal IT Department",
      date: "2023-03-10",
      duration: "8 hours",
      certificate: false,
    },
    {
      id: "TR-003",
      title: "Conflict Resolution in Educational Settings",
      provider: "Education Management Association",
      date: "2022-11-22",
      duration: "12 hours",
      certificate: true,
    },
  ],
  achievements: [
    {
      id: "ACH-001",
      title: "Employee of the Year",
      date: "2022",
      description: "Recognized for outstanding contribution to school administration",
    },
    {
      id: "ACH-002",
      title: "Process Improvement Award",
      date: "2021",
      description: "Implemented a new staff onboarding system that reduced processing time by 40%",
    },
    {
      id: "ACH-003",
      title: "Perfect Attendance",
      date: "2020",
      description: "Maintained 100% attendance throughout the academic year",
    },
  ],
}

// Tab Panel component
function TabPanel(props:any) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`staff-tabpanel-${index}`}
      aria-labelledby={`staff-tab-${index}`}
      {...other}
      style={{ padding: "20px 0" }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

// Main Staff Profile Component
export default function StaffProfile() {
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const [filterAnchorEl, setFilterAnchorEl] = useState(null)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (newValue:any) => {
    setTabValue(newValue)
  }

  const handleMenuClick = (event:any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleFilterClick = (event:any) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  // Status color mapping
  const getStatusColor = (status:any) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "approved":
        return theme.palette.success.main
      case "in progress":
        return theme.palette.info.main
      case "pending":
        return theme.palette.warning.main
      case "rejected":
        return theme.palette.error.main
      default:
        return theme.palette.grey[500]
    }
  }

  // Attendance status color mapping
  const getAttendanceColor = (status:any) => {
    switch (status.toLowerCase()) {
      case "present":
        return theme.palette.success.main
      case "absent":
        return theme.palette.error.main
      case "leave":
        return theme.palette.info.main
      case "late":
        return theme.palette.warning.main
      case "weekend":
      case "holiday":
        return theme.palette.grey[500]
      default:
        return theme.palette.grey[500]
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "16px",
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          color: "white",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Avatar
                src={staffData.avatar}
                alt={staffData.name}
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid white",
                  boxShadow: theme.shadows[3],
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {staffData.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {staffData.role} • {staffData.department}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  justifyContent: { xs: "center", md: "flex-start" },
                  mt: 1,
                }}
              >
                <Chip
                  icon={<Badge sx={{ color: "white !important" }} />}
                  label={`ID: ${staffData.id}`}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
                />
                <Chip
                  icon={<Work sx={{ color: "white !important" }} />}
                  label={`Joined: ${staffData.joinDate}`}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
                />
                <Chip
                  icon={<CheckCircle sx={{ color: "white !important" }} />}
                  label={`Status: ${staffData.status}`}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Tooltip title="Edit Profile">
                <IconButton sx={{ color: "white", bgcolor: "rgba(255,255,255,0.2)" }}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="More Options">
                <IconButton sx={{ color: "white", bgcolor: "rgba(255,255,255,0.2)" }} onClick={handleMenuClick}>
                  <MoreVert />
                </IconButton>
              </Tooltip>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <Download fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Download Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <Print fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Print Profile</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </MenuItem>
              </Menu>
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
          aria-label="staff profile tabs"
          sx={{
            "& .MuiTab-root": {
              minWidth: "auto",
              px: 3,
              py: 2,
            },
          }}
        >
          <Tab icon={<Dashboard />} label="Overview" iconPosition="start" />
          <Tab icon={<Assignment />} label="Tasks & Projects" iconPosition="start" />
          <Tab icon={<AccessTime />} label="Attendance & Schedule" iconPosition="start" />
          <Tab icon={<EventAvailable />} label="Leave Management" iconPosition="start" />
          <Tab icon={<Folder />} label="Documents" iconPosition="start" />
          <Tab icon={<Email />} label="Communications" iconPosition="start" />
          <Tab icon={<School />} label="Training & Development" iconPosition="start" />
          <Tab icon={<Star />} label="Achievements" iconPosition="start" />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: "100%", borderRadius: "12px" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Person color="primary" /> Personal Information
                </Typography>
                <Divider sx={{ my: 2 }} />
                <List disablePadding>
                  <ListItem disablePadding sx={{ mb: 2 }}>
                    <ListItemIcon>
                      <Email color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={staffData.email}
                      primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                      secondaryTypographyProps={{ variant: "body1" }}
                    />
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 2 }}>
                    <ListItemIcon>
                      <Phone color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone"
                      secondary={staffData.phone}
                      primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                      secondaryTypographyProps={{ variant: "body1" }}
                    />
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 2 }}>
                    <ListItemIcon>
                      <LocationOn color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Address"
                      secondary={staffData.address}
                      primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                      secondaryTypographyProps={{ variant: "body1" }}
                    />
                  </ListItem>
                </List>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {staffData.bio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Performance Metrics */}
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: "100%", borderRadius: "12px" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Timeline color="primary" /> Performance Metrics
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Overall Performance
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {staffData.performance.overall}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={staffData.performance.overall}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: theme.palette.grey[200],
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 5,
                        background: `linear-gradient(90deg, ${theme.palette.success.main} 0%, ${theme.palette.primary.main} 100%)`,
                      },
                    }}
                  />
                </Box>

                {/* Individual Metrics */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Task Completion
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {staffData.performance.taskCompletion}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={staffData.performance.taskCompletion}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: theme.palette.grey[200],
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Time Management
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {staffData.performance.timeManagement}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={staffData.performance.timeManagement}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: theme.palette.grey[200],
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Teamwork
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {staffData.performance.teamwork}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={staffData.performance.teamwork}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: theme.palette.grey[200],
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Communication
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {staffData.performance.communication}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={staffData.performance.communication}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: theme.palette.grey[200],
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, p: 2, bgcolor: theme.palette.grey[50], borderRadius: "8px" }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Attendance Rate
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        position: "relative",
                        display: "inline-flex",
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={staffData.attendance.percentage}
                        size={60}
                        thickness={5}
                        sx={{
                          color: theme.palette.success.main,
                          "& .MuiCircularProgress-circle": {
                            strokeLinecap: "round",
                          },
                        }}
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
                        <Typography variant="caption" fontWeight="bold">
                          {staffData.attendance.percentage}%
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2">Present: {staffData.attendance.present} days</Typography>
                      <Typography variant="body2">Absent: {staffData.attendance.absent} days</Typography>
                      <Typography variant="body2">Leave: {staffData.attendance.leave} days</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Skills & Qualifications */}
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: "100%", borderRadius: "12px" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <School color="primary" /> Skills & Qualifications
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Education
                </Typography>
                {staffData.education.map((edu, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="body1" fontWeight="medium">
                      {edu.degree}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {edu.institution}, {edu.year}
                    </Typography>
                  </Box>
                ))}

                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
                  Skills
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {staffData.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{
                        bgcolor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                      }}
                    />
                  ))}
                </Box>

                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
                  Certifications
                </Typography>
                {staffData.certifications.map((cert, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="body1" fontWeight="medium">
                      {cert.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cert.issuer}, Issued: {cert.date}, Expires: {cert.expires}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Upcoming Tasks */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: "12px" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Task color="primary" /> Upcoming Tasks
                  </Typography>
                  <Button variant="outlined" size="small" endIcon={<KeyboardArrowDown />} onClick={handleFilterClick}>
                    Filter
                  </Button>
                  <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
                    <MenuItem onClick={handleFilterClose}>All Tasks</MenuItem>
                    <MenuItem onClick={handleFilterClose}>High Priority</MenuItem>
                    <MenuItem onClick={handleFilterClose}>In Progress</MenuItem>
                    <MenuItem onClick={handleFilterClose}>Pending</MenuItem>
                    <MenuItem onClick={handleFilterClose}>Completed</MenuItem>
                  </Menu>
                </Box>
                <Divider sx={{ mb: 2 }} />

                {staffData.tasks
                  .filter((task) => task.status !== "Completed")
                  .slice(0, 3)
                  .map((task, index) => (
                    <Card key={index} variant="outlined" sx={{ mb: 2, borderRadius: "8px" }}>
                      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">
                              {task.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {task.description}
                            </Typography>
                          </Box>
                          <Chip
                            label={task.priority}
                            size="small"
                            sx={{
                              bgcolor:
                                task.priority === "High" ? theme.palette.error.light : theme.palette.warning.light,
                              color:
                                task.priority === "High"
                                  ? theme.palette.error.contrastText
                                  : theme.palette.warning.contrastText,
                            }}
                          />
                        </Box>

                        <Box sx={{ mt: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Progress
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {task.progress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={task.progress}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: theme.palette.grey[200],
                            }}
                          />
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                          <Chip
                            icon={<AccessTime fontSize="small" />}
                            label={`Due: ${task.dueDate}`}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label={task.status}
                            size="small"
                            sx={{
                              bgcolor: getStatusColor(task.status) + "20",
                              color: getStatusColor(task.status),
                              borderColor: getStatusColor(task.status),
                            }}
                            variant="outlined"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  ))}

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button variant="text" endIcon={<KeyboardArrowDown />}>
                    View All Tasks
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Communications */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: "12px" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Email color="primary" /> Recent Communications
                </Typography>
                <Divider sx={{ my: 2 }} />

                <List disablePadding>
                  {staffData.communications.slice(0, 4).map((comm, index) => (
                    <ListItem
                      key={index}
                      disablePadding
                      sx={{
                        mb: 1,
                        p: 1,
                        borderRadius: "8px",
                        bgcolor: comm.read ? "transparent" : theme.palette.primary.light + "10",
                        border: "1px solid",
                        borderColor: comm.read ? "transparent" : theme.palette.primary.light,
                      }}
                    >
                      <ListItemButton sx={{ borderRadius: "8px", p: 1 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>{comm.from.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="body1" fontWeight={comm.read ? "regular" : "bold"}>
                                {comm.subject}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {comm.date}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                From: {comm.from}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                }}
                              >
                                {comm.preview}
                              </Typography>
                            </>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button variant="text" endIcon={<KeyboardArrowDown />}>
                    View All Messages
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Tasks & Projects Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: "12px" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Task Management
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                      placeholder="Search tasks..."
                      size="small"
                      InputProps={{
                        startAdornment: <Search color="action" sx={{ mr: 1 }} />,
                      }}
                      sx={{ width: 250 }}
                    />
                    <Button variant="contained" startIcon={<Add />} sx={{ whiteSpace: "nowrap" }}>
                      New Task
                    </Button>
                  </Box>
                </Box>

                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "8px" }}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
                        <TableCell>Task ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Progress</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {staffData.tasks.map((task) => (
                        <TableRow key={task.id} hover>
                          <TableCell>{task.id}</TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              {task.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {task.description}
                            </Typography>
                          </TableCell>
                          <TableCell>{task.dueDate}</TableCell>
                          <TableCell>
                            <Chip
                              label={task.priority}
                              size="small"
                              sx={{
                                bgcolor:
                                  task.priority === "High"
                                    ? theme.palette.error.light
                                    : task.priority === "Medium"
                                      ? theme.palette.warning.light
                                      : theme.palette.success.light,
                                color:
                                  task.priority === "High"
                                    ? theme.palette.error.contrastText
                                    : task.priority === "Medium"
                                      ? theme.palette.warning.contrastText
                                      : theme.palette.success.contrastText,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={task.status}
                              size="small"
                              sx={{
                                bgcolor: getStatusColor(task.status) + "20",
                                color: getStatusColor(task.status),
                                borderColor: getStatusColor(task.status),
                              }}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={task.progress}
                                sx={{
                                  width: 100,
                                  height: 6,
                                  borderRadius: 3,
                                  bgcolor: theme.palette.grey[200],
                                }}
                              />
                              <Typography variant="caption">{task.progress}%</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Tooltip title="Edit">
                                <IconButton size="small">
                                  <Edit fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="View Details">
                                <IconButton size="small">
                                  <Visibility fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="More Options">
                                <IconButton size="small">
                                  <MoreVert fontSize="small" />
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
        </Grid>
      </TabPanel>

      {/* Attendance & Schedule Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {/* Attendance Summary */}
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ borderRadius: "12px" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Attendance Summary
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-flex",
                    }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={staffData.attendance.percentage}
                      size={120}
                      thickness={8}
                      sx={{
                        color: theme.palette.success.main,
                        "& .MuiCircularProgress-circle": {
                          strokeLinecap: "round",
                        },
                      }}
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
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h4" fontWeight="bold">
                        {staffData.attendance.percentage}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Attendance
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: theme.palette.success.light + "30",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold" color={theme.palette.success.main}>
                        {staffData.attendance.present}
                      </Typography>
                      <Typography variant="body2" color={theme.palette.success.main}>
                        Present Days
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: theme.palette.error.light + "30",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold" color={theme.palette.error.main}>
                        {staffData.attendance.absent}
                      </Typography>
                      <Typography variant="body2" color={theme.palette.error.main}>
                        Absent Days
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: theme.palette.info.light + "30",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold" color={theme.palette.info.main}>
                        {staffData.attendance.leave}
                      </Typography>
                      <Typography variant="body2" color={theme.palette.info.main}>
                        Leave Days
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: theme.palette.warning.light + "30",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold" color={theme.palette.warning.main}>
                        {staffData.attendance.late}
                      </Typography>
                      <Typography variant="body2" color={theme.palette.warning.main}>
                        Late Days
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Button fullWidth variant="outlined" startIcon={<History />}>
                  View Full Attendance History
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Attendance */}
          <Grid item xs={12} md={8}>
            <Card elevation={2} sx={{ borderRadius: "12px" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Recent Attendance
                </Typography>
                <Divider sx={{ my: 2 }} />

                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "8px" }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
                        <TableCell>Date</TableCell>
                        <TableCell>Day</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Check In</TableCell>
                        <TableCell>Check Out</TableCell>
                        <TableCell>Working Hours</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {staffData.attendance.history.map((record, index) => {
                        const date = new Date(record.date)
                        const dayName = date.toLocaleDateString("en-US", { weekday: "long" })

                        return (
                          <TableRow key={index} hover>
                            <TableCell>{record.date}</TableCell>
                            <TableCell>{dayName}</TableCell>
                            <TableCell>
                              <Chip
                                label={record.status}
                                size="small"
                                sx={{
                                  bgcolor: getAttendanceColor(record.status) + "20",
                                  color: getAttendanceColor(record.status),
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {record.status === "Present" || record.status === "Late" ? "08:05 AM" : "-"}
                            </TableCell>
                            <TableCell>
                              {record.status === "Present" || record.status === "Late" ? "04:10 PM" : "-"}
                            </TableCell>
                            <TableCell>
                              {record.status === "Present" || record.status === "Late" ? "8h 5m" : "-"}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Weekly Schedule */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: "12px" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Weekly Schedule
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  {staffData.schedule.map((day, index) => (
                    <Grid item xs={12} sm={6} md={3} lg={12 / 7} key={index}>
                      <Card
                        variant="outlined"
                        sx={{
                          borderRadius: "8px",
                          height: "100%",
                          bgcolor: day.shifts.length > 0 ? "white" : theme.palette.grey[100],
                        }}
                      >
                        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            gutterBottom
                            sx={{
                              textAlign: "center",
                              pb: 1,
                              borderBottom: "1px solid",
                              borderColor: theme.palette.divider,
                            }}
                          >
                            {day.day}
                          </Typography>

                          {day.shifts.length > 0 ? (
                            day.shifts.map((shift, shiftIndex) => (
                              <Box key={shiftIndex} sx={{ mt: 2 }}>
                                <Chip
                                  icon={<AccessTime />}
                                  label={`${shift.start} - ${shift.end}`}
                                  size="small"
                                  sx={{ mb: 1, width: "100%", justifyContent: "flex-start" }}
                                />
                                <Typography
                                  variant="caption"
                                  sx={{
                                    display: "inline-block",
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: "4px",
                                    bgcolor:
                                      shift.type === "Regular"
                                        ? theme.palette.primary.light + "20"
                                        : theme.palette.warning.light + "20",
                                    color:
                                      shift.type === "Regular"
                                        ? theme.palette.primary.main
                                        : theme.palette.warning.main,
                                  }}
                                >
                                  {shift.type}
                                </Typography>
                              </Box>
                            ))
                          ) : (
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 80 }}>
                              <Typography variant="body2" color="text.secondary">
                                Off Day
                              </Typography>
                            </Box>
                          )}
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

      {/* Leave Management Tab */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          {/* Leave Balance */}
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ borderRadius: "12px" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Leave Balance
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="subtitle2">Annual Leave</Typography>
                    <Typography variant="subtitle2">
                      {staffData.leaves.annual.used} / {staffData.leaves.annual.total} days
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(staffData.leaves.annual.used / staffData.leaves.annual.total) * 100}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: theme.palette.grey[200],
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 5,
                        background: theme.palette.primary.main,
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {staffData.leaves.annual.remaining} days remaining
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="subtitle2">Sick Leave</Typography>
                    <Typography variant="subtitle2">
                      {staffData.leaves.sick.used} / {staffData.leaves.sick.total} days
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(staffData.leaves.sick.used / staffData.leaves.sick.total) * 100}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: theme.palette.grey[200],
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 5,
                        background: theme.palette.info.main,
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {staffData.leaves.sick.remaining} days remaining
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="subtitle2">Personal Leave</Typography>
                    <Typography variant="subtitle2">
                      {staffData.leaves.personal.used} / {staffData.leaves.personal.total} days
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(staffData.leaves.personal.used / staffData.leaves.personal.total) * 100}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: theme.palette.grey[200],
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 5,
                        background: theme.palette.success.main,
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {staffData.leaves.personal.remaining} days remaining
                  </Typography>
                </Box>

                <Button fullWidth variant="contained" startIcon={<EventAvailable />} sx={{ mt: 2 }}>
                  Apply for Leave
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Leave History */}
          <Grid item xs={12} md={8}>
            <Card elevation={2} sx={{ borderRadius: "12px" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Leave History
                </Typography>
                <Divider sx={{ my: 2 }} />

                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "8px" }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
                        <TableCell>Type</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Days</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {staffData.leaves.history.map((leave, index) => (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Chip
                              label={leave.type}
                              size="small"
                              sx={{
                                bgcolor:
                                  leave.type === "Annual"
                                    ? theme.palette.primary.light + "20"
                                    : leave.type === "Sick"
                                      ? theme.palette.info.light + "20"
                                      : theme.palette.success.light + "20",
                                color:
                                  leave.type === "Annual"
                                    ? theme.palette.primary.main
                                    : leave.type === "Sick"
                                      ? theme.palette.info.main
                                      : theme.palette.success.main,
                              }}
                            />
                          </TableCell>
                          <TableCell>{leave.startDate}</TableCell>
                          <TableCell>{leave.endDate}</TableCell>
                          <TableCell>{leave.days}</TableCell>
                          <TableCell>{leave.reason}</TableCell>
                          <TableCell>
                            <Chip
                              label={leave.status}
                              size="small"
                              sx={{
                                bgcolor: getStatusColor(leave.status) + "20",
                                color: getStatusColor(leave.status),
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Documents Tab */}
      <TabPanel value={tabValue} index={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: "12px" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Document Management
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="outlined" startIcon={<FileUpload />}>
                      Upload Document
                    </Button>
                    <Button variant="contained" startIcon={<Folder />}>
                      Create Folder
                    </Button>
                  </Box>
                </Box>

                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "8px" }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
                        <TableCell>Document ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Upload Date</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {staffData.documents.map((doc) => (
                        <TableRow key={doc.id} hover>
                          <TableCell>{doc.id}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Description color="primary" />
                              <Typography variant="body2">{doc.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{doc.uploadDate}</TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Tooltip title="View">
                                <IconButton size="small">
                                  <Visibility fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Download">
                                <IconButton size="small">
                                  <FileDownload fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="More Options">
                                <IconButton size="small">
                                  <MoreVert fontSize="small" />
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
        </Grid>
      </TabPanel>

      {/* Communications Tab */}
      <TabPanel value={tabValue} index={5}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: "12px" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Messages & Notifications
                </Typography>
                <Divider sx={{ my: 2 }} />

                <List disablePadding>
                  {staffData.communications.map((comm, index) => (
                    <ListItem
                      key={index}
                      disablePadding
                      sx={{
                        mb: 2,
                        p: 0,
                        borderRadius: "8px",
                        bgcolor: comm.read ? "transparent" : theme.palette.primary.light + "10",
                        border: "1px solid",
                        borderColor: comm.read ? theme.palette.grey[200] : theme.palette.primary.light,
                      }}
                    >
                      <ListItemButton sx={{ borderRadius: "8px", p: 2 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>{comm.from.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="body1" fontWeight={comm.read ? "regular" : "bold"}>
                                {comm.subject}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {comm.date}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                From: {comm.from}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                }}
                              >
                                {comm.preview}
                              </Typography>
                            </>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Training & Development Tab */}
      <TabPanel value={tabValue} index={6}>
        <Grid container spacing={3}>
          {/* Training History */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: "12px" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Training & Professional Development
                </Typography>
                <Divider sx={{ my: 2 }} />

                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "8px" }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
                        <TableCell>Training ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Provider</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Certificate</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {staffData.training.map((training) => (
                        <TableRow key={training.id} hover>
                          <TableCell>{training.id}</TableCell>
                          <TableCell>{training.title}</TableCell>
                          <TableCell>{training.provider}</TableCell>
                          <TableCell>{training.date}</TableCell>
                          <TableCell>{training.duration}</TableCell>
                          <TableCell>
                            {training.certificate ? (
                              <Chip
                                icon={<CheckCircle fontSize="small" />}
                                label="Available"
                                size="small"
                                color="success"
                                variant="outlined"
                              />
                            ) : (
                              <Chip label="Not Available" size="small" color="default" variant="outlined" />
                            )}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              {training.certificate && (
                                <Tooltip title="Download Certificate">
                                  <IconButton size="small">
                                    <FileDownload fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              )}
                              <Tooltip title="View Details">
                                <IconButton size="small">
                                  <Visibility fontSize="small" />
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
        </Grid>
      </TabPanel>

      {/* Achievements Tab */}
      <TabPanel value={tabValue} index={7}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderRadius: "12px" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Achievements & Recognition
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Box sx={{ position: "relative", ml: 2, pl: 3 }}>
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 2,
                      bgcolor: theme.palette.primary.main,
                      zIndex: 1,
                    }}
                  />

                  {staffData.achievements.map((achievement, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        mb: 4,
                        pb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          left: -28,
                          top: 0,
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          bgcolor: theme.palette.primary.main,
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 2,
                        }}
                      >
                        <Star sx={{ fontSize: 16 }} />
                      </Box>

                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        {achievement.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                        {achievement.date}
                      </Typography>
                      <Typography variant="body2">{achievement.description}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
  )
}
