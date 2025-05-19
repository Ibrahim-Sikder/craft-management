/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  Chip,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Tooltip,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material"
import {
  Search as SearchIcon,
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon,
  ViewKanban as KanbanViewIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Sort as SortIcon,
  Refresh as RefreshIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  SupervisorAccount as SupervisorIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { motion } from "framer-motion"
import { useDeleteStaffMutation, useGetAllStaffQuery } from "@/redux/api/staffApi"
import Swal from "sweetalert2"

// Define types
type StaffStatus = "active" | "on leave" | "inactive"

interface StaffMember {
  id: number | string
  name: string
  avatar: string
  department: string
  role: string
  status: StaffStatus
  email: string
  phone: string
  location: string
  experience: number
  rating: string
  performance: number
  attendance: number
  joinDate: string
  skills: string[]
  certifications: string | null
  supervisor: string
  contractType: string
  nextReview: string
  birthdate: string
  staffId?: string
}

interface DepartmentStats {
  department: string
  color: string
  total: number
  active: number
  onLeave: number
  inactive: number
  avgPerformance: number
}

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "visible",
  transition: "all 0.3s ease-in-out",
  borderRadius: 16,
  boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 70px rgba(0, 0, 0, 0.2)",
  },
}))

const GradientHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(90deg, #00b09b 0%, #96c93d 100%)",
  padding: theme.spacing(4, 0),
  borderRadius: "0 0 24px 24px",
  marginBottom: theme.spacing(4),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: 'url("/placeholder.svg?height=200&width=1000") center/cover no-repeat',
    opacity: 0.1,
  },
}))

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))

const StatusChip = styled(Chip)<{ status: StaffStatus }>(({ theme, status }) => ({
  backgroundColor:
    status === "active"
      ? alpha(theme.palette.success.main, 0.1)
      : status === "on leave"
        ? alpha(theme.palette.warning.main, 0.1)
        : alpha(theme.palette.error.main, 0.1),
  color:
    status === "active"
      ? theme.palette.success.dark
      : status === "on leave"
        ? theme.palette.warning.dark
        : theme.palette.error.dark,
  fontWeight: 600,
  borderRadius: 8,
}))

const DepartmentChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  borderRadius: 8,
}))

// const DepartmentChip = styled(Chip)<{ color: string }>(({ theme, color }) => ({
//   backgroundColor: alpha(color, 0.1),
//   color: color,
//   fontWeight: 500,
//   borderRadius: 8,
// }))

const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12)",
    },
    "&.Mui-focused": {
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.16)",
    },
  },
}))

const ViewToggleButton = styled(Button)<{ active: boolean }>(({ theme, active }) => ({
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : "transparent",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  fontWeight: active ? 600 : 400,
  "&:hover": {
    backgroundColor: active ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.action.hover, 0.1),
  },
}))

const PerformanceIndicator = styled(Box)<{ value: number }>(({ theme, value }) => ({
  position: "relative",
  height: 4,
  width: "100%",
  backgroundColor: alpha(theme.palette.grey[300], 0.5),
  borderRadius: 2,
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: `${value}%`,
    backgroundColor:
      value > 80 ? theme.palette.success.main : value > 50 ? theme.palette.warning.main : theme.palette.error.main,
    borderRadius: 2,
  },
}))

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  display: "flex",
  flexDirection: "column",
  height: "100%",
}))

const CircularProgressWithLabel = ({
  value,
  size = 60,
  thickness = 5,
}: { value: number; size?: number; thickness?: number }) => {
  const theme = useTheme()
  const color =
    value > 80 ? theme.palette.success.main : value > 50 ? theme.palette.warning.main : theme.palette.error.main

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={thickness}
        sx={{
          color: color,
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
        <Typography variant="caption" component="div" fontWeight="bold">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}

// Mock data
const departmentColors: Record<string, string> = {
  Administration: "#00b09b",
  Finance: "#6a11cb",
  "Human Resources": "#fc4a1a",
  "IT Support": "#00d2ff",
  Maintenance: "#f46b45",
  Security: "#c471ed",
  "Food Services": "#12c2e9",
  "Health Services": "#ff758c",
  Science: "#00b09b", // Added Science department
  Arts: "#6a11cb", // Added Arts department
  Commerce: "#fc4a1a", // Added Commerce department
}

export default function StaffDashboard() {
  const theme = useTheme()
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "kanban">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [sortBy, setSortBy] = useState<"name" | "department" | "role" | "experience" | "rating" | "performance">("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [filterDepartment, setFilterDepartment] = useState("all")
  // Update the state variables to handle pagination and search
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteStaff] = useDeleteStaffMutation()
  const {
    data: staffData,
    isLoading,
    refetch,
  } = useGetAllStaffQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)

  useEffect(() => {
    if (staffData?.data?.staffs) {
      console.log("Setting staff from API data:", staffData.data.staffs)
      setStaff(
        staffData.data.staffs.map((staff: any) => ({
          id: staff._id,
          name: staff.name || "Unknown",
          avatar: staff.staffPhoto || `/placeholder.svg?height=200&width=200&text=${staff.name?.charAt(0) || "U"}`,
          department: staff.department || "Not Assigned",
          role: staff.designation || "Staff",
          status: staff.status === "Active" ? "active" : staff.status === "On Leave" ? "on leave" : "inactive",
          email: staff.email || "",
          phone: staff.phone || "",
          location: staff.currentAddress?.district || "Not Available",
          experience: staff.workExperience?.length || 0,
          rating: "4.5",
          performance: 85,
          attendance: 90,
          joinDate: staff.joiningDate ? new Date(staff.joiningDate).toLocaleDateString() : "Not Available",
          skills: staff.certifications?.map((cert: any) => cert.certificateName) || [],
          certifications: staff.certifications?.length > 0 ? staff.certifications[0].certificateName : null,
          supervisor: "Principal",
          contractType: staff.staffType || "Full-time",
          nextReview: new Date().toLocaleDateString(),
          birthdate: staff.dateOfBirth ? new Date(staff.dateOfBirth).toLocaleDateString() : "Not Available",
          staffId: staff.staffId,
        })),
      )
      setLoading(false)
    }
  }, [staffData])

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSortClose = () => {
    setAnchorEl(null)
  }

  const handleSortChange = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortDirection("asc")
    }
    handleSortClose()
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)

    if (newValue === 0) {
      setFilterDepartment("all")
    } else {
      const department = Object.keys(departmentColors)[newValue - 1]
      setFilterDepartment(department)
    }
  }

  const filteredStaff = staff
    .filter(
      (person) =>
        (searchQuery === "" ||
          person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.role.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterDepartment === "all" || person.department === filterDepartment),
    )
    .sort((a, b) => {
      let comparison = 0

      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === "department") {
        comparison = a.department.localeCompare(b.department)
      } else if (sortBy === "role") {
        comparison = a.role.localeCompare(b.role)
      } else if (sortBy === "experience") {
        comparison = a.experience - b.experience
      } else if (sortBy === "rating") {
        comparison = Number.parseFloat(a.rating) - Number.parseFloat(b.rating)
      } else if (sortBy === "performance") {
        comparison = a.performance - b.performance
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

  const handleDelete = async (id: string) => {
    setTimeout(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this student?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteStaff(id).unwrap()

            Swal.fire({
              title: "Deleted!",
              text: `student has been deleted successfully.`,
              icon: "success",
            })

            refetch()
          } catch (err: any) {
            Swal.fire({
              title: "Error!",
              text: err.data?.message || "Failed to delete student",
              icon: "error",
            })
          }
        }
      })
    }, 100)
  }
  const handleRefresh = () => {
    setLoading(true)
    refetch()
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error refreshing data:", error)
        setLoading(false)
      })
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, staff: StaffMember) => {
    event.stopPropagation()
    setSelectedStaff(staff)
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  const handleViewStaff = (staff: StaffMember) => {
    window.location.href = `/dashboard/super_admin/staff/profile?id=${staff.id}`
    handleMenuClose()
  }

  const handleEditStaff = (staff: StaffMember) => {
    window.location.href = `/dashboard/super_admin/staff/update/${staff.id}`
    handleMenuClose()
  }

  const handleDeleteStaffItem = () => {
    if (selectedStaff) {
      handleDelete(selectedStaff.id.toString())
    }
    handleMenuClose()
  }

  // Calculate department statistics
  const departmentStats: DepartmentStats[] = Object.keys(departmentColors).map((dept) => {
    const deptStaff = staff.filter((s) => s.department === dept)
    const activeCount = deptStaff.filter((s) => s.status === "active").length
    const onLeaveCount = deptStaff.filter((s) => s.status === "on leave").length
    const inactiveCount = deptStaff.filter((s) => s.status === "inactive").length
    const avgPerformance = deptStaff.reduce((sum, s) => sum + s.performance, 0) / (deptStaff.length || 1)

    return {
      department: dept,
      color: departmentColors[dept],
      total: deptStaff.length,
      active: activeCount,
      onLeave: onLeaveCount,
      inactive: inactiveCount,
      avgPerformance,
    }
  })

  // Calculate overall statistics
  const totalStaff = staff.length
  const activeStaff = staff.filter((s) => s.status === "active").length
  const onLeaveStaff = staff.filter((s) => s.status === "on leave").length
  const inactiveStaff = staff.filter((s) => s.status === "inactive").length
  const avgPerformance = staff.reduce((sum, s) => sum + s.performance, 0) / (totalStaff || 1)
  const avgAttendance = staff.reduce((sum, s) => sum + s.attendance, 0) / (totalStaff || 1)

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <GradientHeader>
        <Container maxWidth="xl" sx={{p:{xs:"4px"}}}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Typography variant="h3" fontWeight={700} color="white" gutterBottom>
                  Staff Management
                </Typography>
                <Typography variant="h6" fontWeight={400} color="white" sx={{ opacity: 0.8 }}>
                  Manage your non-teaching staff with our powerful dashboard
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 2 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                      bgcolor: "white",
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      "&:hover": { bgcolor: alpha("#ffffff", 0.9) },
                    }}
                  >
                    Add Staff
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <IconButton
                    sx={{
                      bgcolor: alpha("#ffffff", 0.2),
                      color: "white",
                      "&:hover": { bgcolor: alpha("#ffffff", 0.3) },
                    }}
                    onClick={handleRefresh}
                  >
                    <RefreshIcon />
                  </IconButton>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </GradientHeader>

      <Container maxWidth="xl" sx={{p:{xs:"4px"}}}>
        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <StatsCard>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Total Staff
                  </Typography>
                  <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                    <PersonIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                  {totalStaff}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    size="small"
                    icon={<CheckCircleIcon style={{ fontSize: 14 }} />}
                    label={`${activeStaff} Active`}
                    sx={{
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.dark,
                      fontWeight: 500,
                    }}
                  />
                  <Chip
                    size="small"
                    icon={<AccessTimeIcon style={{ fontSize: 14 }} />}
                    label={`${onLeaveStaff} On Leave`}
                    sx={{
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      color: theme.palette.warning.dark,
                      fontWeight: 500,
                    }}
                  />
                  <Chip
                    size="small"
                    icon={<CancelIcon style={{ fontSize: 14 }} />}
                    label={`${inactiveStaff} Inactive`}
                    sx={{
                      bgcolor: alpha(theme.palette.error.main, 0.1),
                      color: theme.palette.error.dark,
                      fontWeight: 500,
                    }}
                  />
                </Box>
              </StatsCard>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <StatsCard>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Performance
                  </Typography>
                  <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main }}>
                    <StarIcon />
                  </Avatar>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CircularProgressWithLabel value={avgPerformance} />
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {avgPerformance.toFixed(1)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average performance
                    </Typography>
                  </Box>
                </Box>
              </StatsCard>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <StatsCard>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Attendance
                  </Typography>
                  <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), color: theme.palette.warning.main }}>
                    <EventIcon />
                  </Avatar>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CircularProgressWithLabel value={avgAttendance} />
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {avgAttendance.toFixed(1)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average attendance
                    </Typography>
                  </Box>
                </Box>
              </StatsCard>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <StatsCard>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Departments
                  </Typography>
                  <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), color: theme.palette.info.main }}>
                    <BusinessIcon />
                  </Avatar>
                </Box>
                <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                  {Object.keys(departmentColors).length}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {departmentStats
                    .sort((a, b) => b.total - a.total)
                    .slice(0, 3)
                    .map((dept) => (
                      <Chip
                        key={dept.department}
                        size="small"
                        label={`${dept.department}: ${dept.total}`}
                        sx={{
                          bgcolor: alpha(dept.color, 0.1),
                          color: dept.color,
                          fontWeight: 500,
                        }}
                      />
                    ))}
                </Box>
              </StatsCard>
            </motion.div>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                mb: 4,
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  {/* Replace the existing search field onChange handler */}
                  <SearchField
                    fullWidth
                    placeholder="Search staff by name, role, email, or department..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setSearchTerm(e.target.value)
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 1 }}>
                    <ViewToggleButton
                      startIcon={<GridViewIcon />}
                      active={viewMode === "grid"}
                      onClick={() => setViewMode("grid")}
                    >
                      Grid
                    </ViewToggleButton>
                    <ViewToggleButton
                      startIcon={<ListViewIcon />}
                      active={viewMode === "list"}
                      onClick={() => setViewMode("list")}
                    >
                      List
                    </ViewToggleButton>
                    <ViewToggleButton
                      startIcon={<KanbanViewIcon />}
                      active={viewMode === "kanban"}
                      onClick={() => setViewMode("kanban")}
                    >
                      Kanban
                    </ViewToggleButton>
                    <Tooltip title="Sort options">
                      <IconButton onClick={handleSortClick}>
                        <SortIcon />
                      </IconButton>
                    </Tooltip>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleSortClose}>
                      <MenuItem onClick={() => handleSortChange("name")}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
                        >
                          <Typography>Name</Typography>
                          {sortBy === "name" &&
                            (sortDirection === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            ))}
                        </Box>
                      </MenuItem>
                      <MenuItem onClick={() => handleSortChange("department")}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
                        >
                          <Typography>Department</Typography>
                          {sortBy === "department" &&
                            (sortDirection === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            ))}
                        </Box>
                      </MenuItem>
                      <MenuItem onClick={() => handleSortChange("role")}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
                        >
                          <Typography>Role</Typography>
                          {sortBy === "role" &&
                            (sortDirection === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            ))}
                        </Box>
                      </MenuItem>
                      <MenuItem onClick={() => handleSortChange("experience")}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
                        >
                          <Typography>Experience</Typography>
                          {sortBy === "experience" &&
                            (sortDirection === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            ))}
                        </Box>
                      </MenuItem>
                      <MenuItem onClick={() => handleSortChange("performance")}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
                        >
                          <Typography>Performance</Typography>
                          {sortBy === "performance" &&
                            (sortDirection === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            ))}
                        </Box>
                      </MenuItem>
                    </Menu>
                    <Tooltip title="Export">
                      <IconButton>
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Print">
                      <IconButton>
                        <PrintIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    minWidth: "auto",
                    px: 3,
                  },
                  "& .Mui-selected": {
                    fontWeight: 700,
                  },
                }}
              >
                <Tab label="All Departments" />
                {Object.keys(departmentColors).map((dept) => (
                  <Tab
                    key={dept}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor: departmentColors[dept],
                          }}
                        />
                        {dept}
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {filteredStaff.map((person, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={person.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <StyledCard>
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          component="div"
                          sx={{
                            height: 100,
                            backgroundColor: departmentColors[person.department] || "#00b09b",
                            position: "relative",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 50,
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 1,
                          }}
                        >
                          {person.status === "active" ? (
                            <StyledBadge
                              overlap="circular"
                              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                              variant="dot"
                            >
                              <Avatar src={person.avatar} sx={{ width: 80, height: 80, border: "4px solid white" }} />
                            </StyledBadge>
                          ) : (
                            <Avatar src={person.avatar} sx={{ width: 80, height: 80, border: "4px solid white" }} />
                          )}
                        </Box>
                      </Box>
                      <CardContent sx={{ pt: 5, pb: 2 }}>
                        <Box sx={{ textAlign: "center", mb: 2 }}>
                          <Typography variant="h6" fontWeight={600} gutterBottom>
                            {person.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {person.role}
                          </Typography>

                          <DepartmentChip
                            label={person.department}
                            size="small"
                            sx={{
                              backgroundColor: alpha(departmentColors[person.department] || "#00b09b", 0.1),
                              color: departmentColors[person.department] || "#00b09b",
                            }}
                          />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <LocationIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              {person.location}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <WorkIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              {person.experience} years experience
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CalendarIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              Joined: {person.joinDate}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" fontWeight={500} gutterBottom>
                            Performance
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <PerformanceIndicator value={person.performance} />
                            <Typography variant="body2" fontWeight={600}>
                              {person.performance}%
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                          {person.skills.map((skill) => (
                            <Chip
                              key={skill}
                              label={skill}
                              size="small"
                              sx={{
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                fontSize: "0.7rem",
                              }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                      <Divider />
                      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <SupervisorIcon fontSize="small" sx={{ color: "text.secondary", mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {person.supervisor}
                          </Typography>
                        </Box>
                        <StatusChip
                          label={person.status}
                          size="small"
                          status={person.status}
                          icon={
                            person.status === "active" ? (
                              <CheckCircleIcon fontSize="small" />
                            ) : (
                              <CancelIcon fontSize="small" />
                            )
                          }
                        />
                      </CardActions>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          zIndex: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: "rgba(255, 255, 255, 0.9)",
                            "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
                          }}
                          onClick={(e) => handleMenuOpen(e, person)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </StyledCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* Staff Action Menu */}
      <Menu sx={{ zIndex: 1300 }} anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => selectedStaff && handleViewStaff(selectedStaff)}>
          <PersonIcon fontSize="small" sx={{ mr: 1 }} />
          View Profile
        </MenuItem>
        <MenuItem onClick={() => selectedStaff && handleEditStaff(selectedStaff)}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteStaffItem} sx={{ color: theme.palette.error.main }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  )
}
