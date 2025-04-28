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
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  Chip,
  Button,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  Divider,
  Rating,
  LinearProgress,
  Tooltip,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
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
  Mail as MailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Group as GroupIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Sort as SortIcon,
  Refresh as RefreshIcon,
  Visibility,
  Edit,
  Delete,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { useGetAllTeachersQuery } from "@/redux/api/teacherApi"
import type { Teacher, TeacherStatus } from "@/interface"
import Link from "next/link"
import {
  DepartmentChip,
  GradientHeader,
  PerformanceIndicator,
  SearchField,
  StatusChip,
  StyledBadge,
  StyledCard,
  ViewToggleButton,
} from "@/style/customeStyle"
import { useRouter } from "next/navigation"

// Mock data
const departmentColors: Record<string, string> = {
  Languages: "#3a7bd5",
  Mathematics: "#00d2ff",
  Science: "#6a11cb",
  History: "#fc4a1a",
  "Computer Science": "#00b09b",
  "Physical Education": "#f46b45",
  Art: "#c471ed",
  Music: "#12c2e9",
  "Not Specified": "#888888",
}

export default function TeachersDashboard() {
  const theme = useTheme()
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "kanban">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [sortBy, setSortBy] = useState<"name" | "department" | "experience" | "rating" | "performance">("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedTeachers, setSelectedTeachers] = useState<Teacher[]>([])
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [teacherMenuAnchorEl, setTeacherMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const {
    data: teacherData,
    isLoading,
    refetch,
  } = useGetAllTeachersQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })
  const handleTeacherMenuOpen = (event: React.MouseEvent<HTMLElement>, teacher: Teacher) => {
    setTeacherMenuAnchorEl(event.currentTarget)
    setSelectedTeacher(teacher)
  }

  const handleTeacherMenuClose = () => {
    setTeacherMenuAnchorEl(null)
  }

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setViewDialogOpen(true)
    handleTeacherMenuClose()
  }

  const handleEditTeacher = (teacher: Teacher) => {
    router.push(`/dashboard/super_admin/teacher/update/${teacher._id}`)
    setSelectedTeacher(teacher)
    setEditDialogOpen(true)
    handleTeacherMenuClose()
  }

  const handleDeleteConfirm = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setDeleteConfirmOpen(true)
    handleTeacherMenuClose()
  }

  const handleDeleteTeacher = () => {
    if (selectedTeacher) {
      // Filter out the deleted teacher
      setTeachers(teachers.filter((t) => t.id !== selectedTeacher.id))
      setSnackbar({
        open: true,
        message: `${selectedTeacher.name} has been removed`,
        severity: "success",
      })
    }
    setDeleteConfirmOpen(false)
  }

  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: "success" | "error" | "info" | "warning"
  }>({
    open: false,
    message: "",
    severity: "success",
  })

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  useEffect(() => {
    if (teacherData && !isLoading) {
      // Map the API data to the format expected by the component
      const formattedTeachers = teacherData.data.map((teacher: any, index: any) => ({
        id: index + 1,
        _id: teacher._id, // Add this line to preserve the MongoDB _id
        name: teacher.englishName || teacher.name,
        avatar: `/placeholder.svg?height=200&width=200&text=${teacher.teacherId}`,
        department: teacher.professionalInfo?.department || "Not Specified",
        status: teacher.additionalInfo?.status?.toLowerCase() === "active" ? "active" : ("inactive" as TeacherStatus),
        email: teacher.email || "Not Available",
        phone: "Not Available", // Add phone if available in your data
        subjects: [], // Add subjects if available in your data
        classes: [], // Add classes if available in your data
        experience: calculateExperience(teacher.professionalInfo?.joiningDate),
        rating: "4.5", // Add rating if available in your data
        performance: 85, // Add performance if available in your data
        students: 120, // Add students count if available in your data
        joinDate: new Date(teacher.professionalInfo?.joiningDate || teacher.createdAt).toLocaleDateString(),
        qualifications: teacher.professionalInfo?.designation || "Teacher",
      }))

      setTeachers(formattedTeachers)
      setLoading(isLoading)
    }
  }, [teacherData, isLoading])

  // Add this helper function to calculate experience based on joining date
  const calculateExperience = (joiningDate: string | undefined) => {
    if (!joiningDate) return 0
    const joinDate = new Date(joiningDate)
    const now = new Date()
    return Math.floor((now.getTime() - joinDate.getTime()) / (365 * 24 * 60 * 60 * 1000))
  }

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
    setFilterDepartment(newValue === 0 ? "all" : Object.keys(departmentColors)[newValue - 1])
  }

  const filteredTeachers = teachers
    .filter(
      (teacher) =>
        (searchQuery === "" ||
          teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          teacher.department.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterDepartment === "all" || teacher.department === filterDepartment),
    )
    .sort((a, b) => {
      let comparison = 0
      if (sortBy === "name") comparison = a.name.localeCompare(b.name)
      else if (sortBy === "department") comparison = a.department.localeCompare(b.department)
      else if (sortBy === "experience") comparison = a.experience - b.experience
      else if (sortBy === "rating") comparison = Number.parseFloat(a.rating) - Number.parseFloat(b.rating)
      else if (sortBy === "performance") comparison = a.performance - b.performance
      return sortDirection === "asc" ? comparison : -comparison
    })

  const handleRefresh = () => {
    setLoading(true)
    refetch().then(() => {
      setLoading(false)
    })
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <GradientHeader>
        <Container maxWidth="xl">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Typography variant="h3" fontWeight={700} color="white" gutterBottom>
                  Teacher Management
                </Typography>
                <Typography variant="h6" fontWeight={400} color="white" sx={{ opacity: 0.8 }}>
                  Manage your teaching staff with our powerful dashboard
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
                    component={Link}
                    href="/dashboard/super_admin/teacher/new"
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                      bgcolor: "white",
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      "&:hover": { bgcolor: alpha("#ffffff", 0.9) },
                    }}
                  >
                    Add Teacher
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

      <Container maxWidth="xl">
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
                  <SearchField
                    fullWidth
                    placeholder="Search teachers by name, email, or department..."
                    value={searchQuery}
                    onChange={(e: any) => {
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
                      <MenuItem onClick={() => handleSortChange("rating")}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
                        >
                          <Typography>Rating</Typography>
                          {sortBy === "rating" &&
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
                {Object.keys(departmentColors).map((dept, index) => (
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

          {loading ? (
            <Grid item xs={12}>
              <Box sx={{ p: 4, textAlign: "center" }}>
                <LinearProgress sx={{ mb: 2, height: 6, borderRadius: 3 }} />
                <Typography variant="h6" color="text.secondary">
                  Loading teachers...
                </Typography>
              </Box>
            </Grid>
          ) : filteredTeachers.length === 0 ? (
            <Grid item xs={12}>
              <Box sx={{ p: 8, textAlign: "center" }}>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  No teachers found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your search or filters
                </Typography>
              </Box>
            </Grid>
          ) : viewMode === "grid" ? (
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {filteredTeachers.map((teacher, index) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={teacher.id}>
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
                                backgroundColor: departmentColors[teacher.department],
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
                              {teacher.status === "active" ? (
                                <StyledBadge
                                  overlap="circular"
                                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                  variant="dot"
                                >
                                  <Avatar
                                    src={teacher.avatar}
                                    sx={{ width: 80, height: 80, border: "4px solid white" }}
                                  />
                                </StyledBadge>
                              ) : (
                                <Avatar
                                  src={teacher.avatar}
                                  sx={{ width: 80, height: 80, border: "4px solid white" }}
                                />
                              )}
                            </Box>
                          </Box>
                          <CardContent sx={{ pt: 5, pb: 2 }}>
                            <Box sx={{ textAlign: "center", mb: 2 }}>
                              <Typography variant="h6" fontWeight={600} gutterBottom>
                                {teacher.name}
                              </Typography>
                              <DepartmentChip
                                label={teacher.department}
                                size="small"
                                sx={{
                                  backgroundColor: alpha(departmentColors[teacher.department], 0.1),
                                  color: departmentColors[teacher.department],
                                }}
                              />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <SchoolIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {teacher.qualifications}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <WorkIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {teacher.experience} years experience
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <GroupIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {teacher.students} students
                                </Typography>
                              </Box>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                              <Typography variant="body2" fontWeight={500} gutterBottom>
                                Performance
                              </Typography>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <PerformanceIndicator value={teacher.performance} />
                                <Typography variant="body2" fontWeight={600}>
                                  {teacher.performance}%
                                </Typography>
                              </Box>
                            </Box>

                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                              {teacher.subjects.map((subject) => (
                                <Chip
                                  key={subject}
                                  label={subject}
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
                              <Rating value={Number.parseFloat(teacher.rating)} precision={0.5} size="small" readOnly />
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                {teacher.rating}
                              </Typography>
                            </Box>
                            <StatusChip
                              label={teacher.status}
                              size="small"
                              status={teacher.status}
                              icon={
                                teacher.status === "active" ? (
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
                              onClick={(event) => handleTeacherMenuOpen(event, teacher)}
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </StyledCard>
                      </motion.div>
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
          ) : viewMode === "list" ? (
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                }}
              >
                <Box sx={{ width: "100%", overflow: "auto" }}>
                  <Box sx={{ minWidth: 1000 }}>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "50px 250px 150px 150px 100px 100px 100px 100px 100px",
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        p: 2,
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight={600}>
                        #
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Teacher
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Department
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Contact
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Experience
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Rating
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Performance
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Status
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600} textAlign="center">
                        Actions
                      </Typography>
                    </Box>
                    <Divider />
                    {filteredTeachers.map((teacher, index) => (
                      <motion.div
                        key={teacher.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                      >
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "50px 250px 150px 150px 100px 100px 100px 100px 100px",
                            p: 2,
                            alignItems: "center",
                            "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.02) },
                            borderBottom: `1px solid ${theme.palette.divider}`,
                          }}
                        >
                          <Typography variant="body2">{teacher.id}</Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            {teacher.status === "active" ? (
                              <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                variant="dot"
                              >
                                <Avatar src={teacher.avatar} sx={{ width: 40, height: 40 }} />
                              </StyledBadge>
                            ) : (
                              <Avatar src={teacher.avatar} sx={{ width: 40, height: 40 }} />
                            )}
                            <Box>
                              <Typography variant="body1" fontWeight={500}>
                                {teacher.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {teacher.email}
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {teacher.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {teacher.email}
                              </Typography>
                            </Box>
                          </Box>
                          <DepartmentChip
                            label={teacher.department}
                            size="small"
                            sx={{
                              backgroundColor: alpha(departmentColors[teacher.department], 0.1),
                              color: departmentColors[teacher.department],
                            }}
                          />

                          <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <MailIcon fontSize="small" sx={{ color: "text.secondary", fontSize: 16 }} />
                              <Typography variant="body2" color="text.secondary">
                                Email
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <PhoneIcon fontSize="small" sx={{ color: "text.secondary", fontSize: 16 }} />
                              <Typography variant="body2" color="text.secondary">
                                Call
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Typography variant="body2" fontWeight={500}>
                              {teacher.experience} years
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Rating value={Number.parseFloat(teacher.rating)} precision={0.5} size="small" readOnly />
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <PerformanceIndicator value={teacher.performance} />
                            <Typography variant="body2" fontWeight={600}>
                              {teacher.performance}%
                            </Typography>
                          </Box>
                          <StatusChip label={teacher.status} size="small" status={teacher.status} />
                          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                            <Tooltip title="View Profile">
                              <IconButton
                                component={Link}
                                href={`/dashboard/super_admin/teacher/profile?id=${teacher._id}`}
                                size="small"
                                color="primary"
                                onClick={() => handleViewTeacher(teacher)}
                              >
                                <Visibility fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton
                                component={Link}
                                size="small"
                                color="info"
                                href={`/dashboard/super_admin/teacher/update/${teacher._id}`}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton size="small" color="error" onClick={() => handleDeleteConfirm(teacher)}>
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {["active", "on leave", "inactive"].map((status) => (
                  <Grid item xs={12} md={4} key={status}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        height: "100%",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <StatusChip
                            label={status.charAt(0).toUpperCase() + status.slice(1)}
                            size="small"
                            status={status as TeacherStatus}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {filteredTeachers.filter((t) => t.status === status).length} teachers
                          </Typography>
                        </Box>
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      <Box sx={{ height: "calc(100vh - 350px)", overflow: "auto", pr: 1 }}>
                        {filteredTeachers
                          .filter((teacher) => teacher.status === status)
                          .map((teacher, index) => (
                            <motion.div
                              key={teacher.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 2,
                                  mb: 2,
                                  borderRadius: 2,
                                  border: `1px solid ${theme.palette.divider}`,
                                  "&:hover": {
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                                    borderColor: "transparent",
                                  },
                                }}
                              >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                                  {teacher.status === "active" ? (
                                    <StyledBadge
                                      overlap="circular"
                                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                      variant="dot"
                                    >
                                      <Avatar src={teacher.avatar} sx={{ width: 40, height: 40 }} />
                                    </StyledBadge>
                                  ) : (
                                    <Avatar src={teacher.avatar} sx={{ width: 40, height: 40 }} />
                                  )}
                                  <Box>
                                    <Typography variant="body1" fontWeight={500}>
                                      {teacher.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {teacher.department}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
                                  {teacher.subjects.map((subject) => (
                                    <Chip
                                      key={subject}
                                      label={subject}
                                      size="small"
                                      sx={{
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        color: theme.palette.primary.main,
                                        fontSize: "0.7rem",
                                      }}
                                    />
                                  ))}
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Rating
                                      value={Number.parseFloat(teacher.rating)}
                                      precision={0.5}
                                      size="small"
                                      readOnly
                                    />
                                  </Box>
                                  <Typography variant="body2" color="text.secondary">
                                    {teacher.experience} years
                                  </Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                                  <Tooltip title="View Profile">
                                    <IconButton
                                      component={Link}
                                      href={`/dashboard/super_admin/teacher/profile?id=${teacher._id}`}
                                      size="small"
                                      color="primary"
                                    >
                                      <Visibility fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Edit">
                                    <IconButton
                                      component={Link}
                                      size="small"
                                      color="info"
                                      href={`/dashboard/super_admin/teacher/update/${teacher._id}`}
                                    >
                                      <Edit fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Delete">
                                    <IconButton size="small" color="error" onClick={() => handleDeleteConfirm(teacher)}>
                                      <Delete fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Paper>
                            </motion.div>
                          ))}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
      {/* Teacher Action Menu */}
      <Menu anchorEl={teacherMenuAnchorEl} open={Boolean(teacherMenuAnchorEl)} onClose={handleTeacherMenuClose}>
        <MenuItem onClick={() => selectedTeacher && handleViewTeacher(selectedTeacher)}>
          <Visibility fontSize="small" sx={{ mr: 1 }} />
          View Profile
        </MenuItem>
        <MenuItem onClick={() => selectedTeacher && handleEditTeacher(selectedTeacher)}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => selectedTeacher && handleDeleteConfirm(selectedTeacher)}
          sx={{ color: theme.palette.error.main }}
        >
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedTeacher?.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTeacher} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
