/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Divider,
  LinearProgress,
  Paper,
  Button,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  alpha,
  InputAdornment,
  TextField,
} from "@mui/material"
import {
  AccountBalance,
  AccountBalanceWallet,
  Apartment,
  CalendarMonth,
  Language,
  LocalPrintshop,
  MonetizationOn,
  NoteAlt,
  School,
  Sms,
  VolunteerActivism,
  Work,
  WorkspacePremium,
  Notifications,
  Search,
  MoreVert,
  TrendingUp,
  TrendingDown,
  Person,
  PersonOff,
  Group,
  KeyboardArrowRight,
  Settings,
  Help,
  Logout,
} from "@mui/icons-material"
import { useRouter } from "next/navigation"

// Custom gradient background component
const GradientBackground = ({ children, startColor, endColor, direction = "to right" }: any) => {
  return (
    <Box
      sx={{
        background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      {children}
    </Box>
  )
}

// Animated stat card component
const StatCard = ({ icon, title, value, trend, trendValue, color }: any) => {
  const theme = useTheme()
  const isPositive = trend === "up"

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        height: "100%",
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: `0 8px 32px 0 ${alpha(color, 0.2)}`,
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: alpha(color, 0.1),
              color: color,
              width: 48,
              height: 48,
            }}
          >
            {icon}
          </Avatar>
          <Chip
            icon={isPositive ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
            label={`${trendValue}%`}
            size="small"
            color={isPositive ? "success" : "error"}
            sx={{ height: 24 }}
          />
        </Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  )
}

// Module card component
const ModuleCard = ({ title, description, icon, color, onClick }: any) => {
  const theme = useTheme()

  return (
    <Card
      elevation={0}
      onClick={onClick}
      sx={{
        borderRadius: 3,
        cursor: "pointer",
        height: "100%",
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: `0 8px 32px 0 ${alpha(color, 0.2)}`,
          transform: "translateY(-5px)",
          "& .arrow-icon": {
            transform: "translateX(4px)",
            opacity: 1,
          },
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Avatar
            sx={{
              bgcolor: alpha(color, 0.1),
              color: color,
              width: 48,
              height: 48,
              mb: 2,
            }}
          >
            {icon}
          </Avatar>
          <KeyboardArrowRight
            className="arrow-icon"
            sx={{
              color: "text.secondary",
              opacity: 0.5,
              transition: "all 0.3s ease",
            }}
          />
        </Box>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

// Attendance progress component
const AttendanceProgress = ({ title, present, total, color }: any) => {
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" fontWeight="medium">
          {present}/{total} ({percentage}%)
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: alpha(color, 0.1),
          "& .MuiLinearProgress-bar": {
            bgcolor: color,
          },
        }}
      />
    </Box>
  )
}

// Dashboard component
const DashboardHome = () => {
  const router = useRouter()
  const theme = useTheme()
  // const [anchorEl, setAnchorEl] = useState(null)
  const [profileAnchorEl, setProfileAnchorEl] = useState(null)

  // Mock data
  const [stats, setStats] = useState({
    students: { total: 85, trend: "up", trendValue: 12 },
    teachers: { total: 42, trend: "up", trendValue: 8 },
    income: { total: "₹24,500", trend: "up", trendValue: 15 },
    expenses: { total: "₹18,200", trend: "down", trendValue: 5 },
    attendance: {
      students: { present: 78, total: 85 },
      teachers: { present: 38, total: 42 },
    },
    smsBalance: 250,
    smsSent: 42,
    websiteVisits: 1243,
  })

  // Modules data
  const modules = [
    {
      title: "Manage Branch",
      description: "Branch List, Update, Delete",
      icon: <AccountBalance />,
      color: theme.palette.primary.main,
      path: "/branch",
    },
    {
      title: "Donation",
      description: "Donor List, Update, Delete",
      icon: <VolunteerActivism />,
      color: "#FF5722",
      path: "/donation",
    },
    {
      title: "Certificate",
      description: "Create Certificate, Update, Delete",
      icon: <WorkspacePremium />,
      color: "#FFC107",
      path: "/certificate",
    },
    {
      title: "Payroll",
      description: "Teacher Salary Create, Update, Delete",
      icon: <Work />,
      color: "#2196F3",
      path: "/payroll",
    },
    {
      title: "Website",
      description: "Notice, Events, Blog, Contact",
      icon: <Language />,
      color: "#E91E63",
      path: "/website",
    },
    {
      title: "Academic",
      description: "Class, Batch, Student, Attendance",
      icon: <School />,
      color: "#4CAF50",
      path: "/academic",
    },
    {
      title: "Exam",
      description: "Grading, Exam, Result, Marksheet",
      icon: <NoteAlt />,
      color: "#FF9800",
      path: "/exam",
    },
    {
      title: "Accounting",
      description: "Income, Expense, Transactions, Reports",
      icon: <AccountBalanceWallet />,
      color: "#009688",
      path: "/accounting",
    },
    {
      title: "Fees",
      description: "Fee, Discounts, Fine, Collection",
      icon: <MonetizationOn />,
      color: "#8BC34A",
      path: "/fees",
    },
    {
      title: "Print",
      description: "ID Card, Admit Card, Result",
      icon: <LocalPrintshop />,
      color: "#F44336",
      path: "/print",
    },
    {
      title: "SMS",
      description: "Send SMS and notice to teachers, students",
      icon: <Sms />,
      color: "#3F51B5",
      path: "/sms",
    },
    {
      title: "Attendance",
      description: "Manage Attendance, Send attendance SMS",
      icon: <CalendarMonth />,
      color: "#9C27B0",
      path: "/attendance",
    },
    {
      title: "Department",
      description: "Faculty And Department",
      icon: <Apartment />,
      color: "#607D8B",
      path: "/department",
    },
  ]

  // Handle menu open/close
  // const handleMenuOpen = (event:any) => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleMenuClose = () => {
  //   setAnchorEl(null)
  // }

  // Handle profile menu open/close
  const handleProfileMenuOpen = (event: any) => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null)
  }

  // Navigate to module
  const navigateToModule = (path: any) => {
    router.push(path)
  }

  // Current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Box
      sx={{
        // height: "100vh",        
        // overflow: "auto",
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`,
        borderRadius: 6,
        p: { xs: 2, sm: 3 },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }} color="#4F0187">
            Craft Dashboard
          </Typography>
          <Typography variant="body1" color="#9AA6B2">
            {currentDate}
          </Typography>

          {/* <Typography variant="body1" color="gray"> */}
          {/* <div className="text-white">
            {currentDate}
            </div> */}
          {/* </Typography> */}
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by Teacher, Student, Date, Subject, or Class..."
              variant="outlined"
              // value={searchTerm}
              // onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  },
                },
              }}
            />
          </Grid>
          {/* <Paper
            elevation={0}
            sx={{
              width:400,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              px: 2,
              py: 1,
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Search sx={{ color: "text.secondary", mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Search...
            </Typography>
          </Paper> */}

          <IconButton
            sx={{
              px: 2,
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.3),
              },
            }}
          >
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <Button
            onClick={handleProfileMenuOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.3),
              },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: theme.palette.primary.main,
              }}
            >
              CI
            </Avatar>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="body2" fontWeight="medium" sx={{ textAlign: "left" }}>
                Craft International
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: "left" }}>
                Administrator
              </Typography>
            </Box>
          </Button>

          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                borderRadius: 2,
                minWidth: 180,
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              },
            }}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <Settings fontSize="small" sx={{ mr: 1 }} /> Settings
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <Help fontSize="small" sx={{ mr: 1 }} /> Help Center
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleProfileMenuClose}>
              <Logout fontSize="small" sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<Group />}
            title="Total Students"
            value={stats.students.total}
            trend={stats.students.trend}
            trendValue={stats.students.trendValue}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<Work />}
            title="Total Teachers"
            value={stats.teachers.total}
            trend={stats.teachers.trend}
            trendValue={stats.teachers.trendValue}
            color="#FF5722"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<TrendingUp />}
            title="Today's Income"
            value={stats.income.total}
            trend={stats.income.trend}
            trendValue={stats.income.trendValue}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<TrendingDown />}
            title="Today's Expenses"
            value={stats.expenses.total}
            trend={stats.expenses.trend}
            trendValue={stats.expenses.trendValue}
            color="#F44336"
          />
        </Grid>
      </Grid>

      {/* Attendance & SMS Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              height: "100%",
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              background: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Today&apos;s Attendance
                </Typography>
                <IconButton size="small">
                  <MoreVert fontSize="small" />
                </IconButton>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 2 }}>
                      Student Attendance
                    </Typography>
                    <AttendanceProgress
                      title="Present"
                      present={stats.attendance.students.present}
                      total={stats.attendance.students.total}
                      color={theme.palette.success.main}
                    />
                    <AttendanceProgress
                      title="Absent"
                      present={stats.attendance.students.total - stats.attendance.students.present}
                      total={stats.attendance.students.total}
                      color={theme.palette.error.main}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 2 }}>
                      Teacher Attendance
                    </Typography>
                    <AttendanceProgress
                      title="Present"
                      present={stats.attendance.teachers.present}
                      total={stats.attendance.teachers.total}
                      color={theme.palette.success.main}
                    />
                    <AttendanceProgress
                      title="Absent"
                      present={stats.attendance.teachers.total - stats.attendance.teachers.present}
                      total={stats.attendance.teachers.total}
                      color={theme.palette.error.main}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main, mr: 1.5 }}
                  >
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Present Today
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {stats.attendance.students.present + stats.attendance.teachers.present}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.main, mr: 1.5 }}
                  >
                    <PersonOff />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Absent Today
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {stats.attendance.students.total -
                        stats.attendance.students.present +
                        (stats.attendance.teachers.total - stats.attendance.teachers.present)}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    px: 3,
                  }}
                  onClick={() => navigateToModule("/attendance")}
                >
                  View Details
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              height: "100%",
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              background: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  SMS Overview
                </Typography>
                <IconButton size="small">
                  <MoreVert fontSize="small" />
                </IconButton>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, mr: 2 }}
                  >
                    <Sms />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      SMS Balance
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {stats.smsBalance}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), color: theme.palette.warning.main, mr: 2 }}
                  >
                    <Sms />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      SMS Sent Today
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {stats.smsSent}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), color: theme.palette.info.main, mr: 2 }}>
                    <Language />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Website Visits
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {stats.websiteVisits}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  py: 1.5,
                }}
                onClick={() => navigateToModule("/sms")}
              >
                Send New SMS
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modules Grid */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
          Quick Access Modules
        </Typography>
        <Grid container spacing={3}>
          {modules.map((module, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ModuleCard
                title={module.title}
                description={module.description}
                icon={module.icon}
                color={module.color}
                path={module.path}
                onClick={() => navigateToModule(module.path)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default DashboardHome
