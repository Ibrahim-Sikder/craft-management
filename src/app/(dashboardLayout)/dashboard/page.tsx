/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
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
  Class,
} from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useGetAllMetaQuery } from "@/redux/api/metaApi"

const StatCard = ({ icon, title, value, trend, trendValue, color }: any) => {
  const theme = useTheme()
  const isPositive = trend === "up"

  return (
    <>
      <div className="rounded-xl overflow-hidden  border border-gray-200/10 bg-white/80 backdrop-blur-md transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-5px]">
        <div className="p-[10px] md:p-[20px]">
          <div className="flex justify-between items-start md:mb-4">
            <Avatar
              sx={{
                bgcolor: alpha(color, 0.1),
                color: color,
                width: { xs: 60, md: 48 },
                height: { xs: 60, md: 48 }
              }}
            >
              {icon}
            </Avatar>
            <div>
              <div className="md:hidden text-2xl font-bold mb-1">{value}</div>
              <div className="md:hidden text-sm text-gray-500">{title}</div>
            </div>
            <Chip
              icon={isPositive ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
              label={`${trendValue}%`}
              size="small"
              color={isPositive ? "success" : "error"}
              sx={{ height: 24 }}
            />

          </div>
          <div className="hidden md:block text-4xl font-bold mb-1">{value}</div>
          <div className="hidden md:block text-sm text-gray-500">{title}</div>
        </div>
      </div> 
    </>
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
  const [profileAnchorEl, setProfileAnchorEl] = useState(null)
  const { data, isLoading } = useGetAllMetaQuery({})
  const metaData = data?.data
  // Initial stats with default values
  const [stats, setStats] = useState({
    students: { total: 0, trend: "up", trendValue: 12 },
    teachers: { total: 0, trend: "up", trendValue: 8 },
    classes: { total: 0, trend: "up", trendValue: 5 },
    staffs: { total: 0, trend: "up", trendValue: 10 },
    income: { total: "₹24,500", trend: "up", trendValue: 15 },
    expenses: { total: "₹18,200", trend: "down", trendValue: 5 },
    attendance: {
      students: { present: 0, total: 0 },
      teachers: { present: 0, total: 0 },
    },
    smsBalance: 250,
    smsSent: 42,
    websiteVisits: 1243,
  })

  // Update stats when metaData is available
  useEffect(() => {
    if (metaData) {
      setStats(prevStats => ({
        ...prevStats,
        students: {
          ...prevStats.students,
          total: metaData.totalStudents || 0
        },
        teachers: {
          ...prevStats.teachers,
          total: metaData.totalTeachers || 0
        },
        classes: {
          ...prevStats.classes,
          total: metaData.totalClasses || 0
        },
        staffs: {
          ...prevStats.staffs,
          total: metaData.totalStaffs || 0
        },
        attendance: {
          students: {
            present: Math.round((metaData.totalStudents || 0) * 0.85),
            total: metaData.totalStudents || 0
          },
          teachers: {
            present: Math.round((metaData.totalTeachers || 0) * 0.9),
            total: metaData.totalTeachers || 0
          },
        },
      }))
    }
  }, [metaData])

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
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.2)} 0%, ${alpha(theme.palette.background.default, 0.7)} 100%)`,
        borderRadius: 6,
        p: { xs: 1, sm: 3 },
      }}
    >
      {/* Header */}
      <div className="md:flex justify-between items-center mb-4 gap-2">
        <div>
          <h1 className="text-center md:text-left md:mb-2 text-[#4F0187] font-[1000] text-3xl md:text-5xl">
            Craft Dashboard
          </h1>

          <h3 className="text-center md:text-left text-[#9AA6B2] md:font-medium mb-2">
            {currentDate}
          </h3>
        </div>

        <div className="flex gap-1">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by Teacher, Student, Date, Subject, or Class..."
              variant="outlined"
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

          <IconButton
            sx={{
              px: { xs: 1, md: 2 },
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
              px: { xs: 1, sm: 2 },
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
        </div>
      </div>

      {/* Stats Overview - Now with dynamic data */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<Group />}
            title="Total Students"
            value={isLoading ? "Loading..." : stats.students.total}
            trend={stats.students.trend}
            trendValue={stats.students.trendValue}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<Work />}
            title="Total Teachers"
            value={isLoading ? "Loading..." : stats.teachers.total}
            trend={stats.teachers.trend}
            trendValue={stats.teachers.trendValue}
            color="#FF5722"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<Person />}
            title="Total Staff"
            value={isLoading ? "Loading..." : stats.staffs.total}
            trend={stats.staffs.trend}
            trendValue={stats.staffs.trendValue}
            color="#3F51B5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<Class />}
            title="Total Classes"
            value={isLoading ? "Loading..." : stats.classes.total}
            trend={stats.classes.trend}
            trendValue={stats.classes.trendValue}
            color="#4CAF50"
          />
        </Grid>
      </Grid>

      {/* Attendance & SMS Overview */}
      <div className="grid grid-cols-12 gap-2 space-y-2">
        <div className="lg:col-span-8 col-span-full rounded-lg h-full border border-[rgba(0,0,0,0.1)] bg-white/80 backdrop-blur text-black">
          <div className="p-2 md:p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Today&apos;s Attendance</h2>
              <button className="p-1 rounded hover:bg-gray-100">
                <MoreVert fontSize="small" />
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Attendance */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Student Attendance</h3>
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
              </div>

              {/* Teacher Attendance */}
              <div>
                <h3 className="text-sm font-medium mb-2">Teacher Attendance</h3>
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
              </div>
            </div>

            {/* Divider */}
            <hr className="my-6" />

            {/* Summary Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex justify-between items-center gap-2 md:gap-4">
                {/* Present Today */}
                <div className="flex items-center">
                  <div
                    className="mr-2 md:mr-4 flex items-center justify-center w-9 md:w-10 h-9 md:h-10 rounded-full"
                    style={{
                      backgroundColor: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.main,
                    }}
                  >
                    <Person />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Present Today</p>
                    <p className="text-lg font-bold">
                      {stats.attendance.students.present + stats.attendance.teachers.present}
                    </p>
                  </div>
                </div>

                {/* Absent Today */}
                <div className="flex items-center">
                  <div
                    className="mr-2 md:mr-4 flex items-center justify-center w-9 md:w-10 h-9 md:h-10 rounded-full"
                    style={{
                      backgroundColor: alpha(theme.palette.error.main, 0.1),
                      color: theme.palette.error.main,
                    }}
                  >
                    <PersonOff />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Absent Today</p>
                    <p className="text-lg font-bold">
                      {stats.attendance.students.total -
                        stats.attendance.students.present +
                        (stats.attendance.teachers.total - stats.attendance.teachers.present)}
                    </p>
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <Button
                variant="contained"
                sx={{ px: 2, py: 1, borderRadius: 2 }}
                onClick={() => navigateToModule("/attendance")}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 col-span-full rounded-lg h-full border border-[rgba(0,0,0,0.1)] bg-white/80 backdrop-blur text-black">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">SMS Overview</h2>
              <button className="p-1 rounded hover:bg-gray-100">
                <MoreVert fontSize="small" />
              </button>
            </div>

            {/* Stats Boxes */}
            <div className="flex flex-col gap-6">
              {/* SMS Balance */}
              <div className="flex items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                  style={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                  }}
                >
                  <Sms />
                </div>
                <div>
                  <p className="text-sm text-gray-500">SMS Balance</p>
                  <p className="text-2xl font-bold">{stats.smsBalance}</p>
                </div>
              </div>

              {/* SMS Sent Today */}
              <div className="flex items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                  style={{
                    backgroundColor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main,
                  }}
                >
                  <Sms />
                </div>
                <div>
                  <p className="text-sm text-gray-500">SMS Sent Today</p>
                  <p className="text-2xl font-bold">{stats.smsSent}</p>
                </div>
              </div>

              {/* Website Visits */}
              <div className="flex items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                  style={{
                    backgroundColor: alpha(theme.palette.info.main, 0.1),
                    color: theme.palette.info.main,
                  }}
                >
                  <Language />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website Visits</p>
                  <p className="text-2xl font-bold">{stats.websiteVisits}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-6" />

            {/* Send SMS Button */}
            <Button
              fullWidth
              variant="contained"
              sx={{ px: 2, py: 1, borderRadius: 2 }}
              onClick={() => navigateToModule("/sms")}
            >
              Send New SMS
            </Button>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="mb-2">
        <h1 className="font-bold text-black text-2xl my-3">Quick Access Modules</h1>
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
      </div>
    </Box>
  )
}

export default DashboardHome