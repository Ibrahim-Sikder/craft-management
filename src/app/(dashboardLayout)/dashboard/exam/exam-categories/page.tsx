/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Divider,
  Badge,
  LinearProgress,
  Tooltip,
  useTheme,
  useMediaQuery,
  ToggleButtonGroup,
  ToggleButton,
  Fade,
} from "@mui/material"
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterListIcon,
  ViewModule as ViewModuleIcon,
  ViewList as ViewListIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  ContentCopy as ContentCopyIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  Science as ScienceIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  CalendarToday as CalendarTodayIcon,
  Timer as TimerIcon,
  Percent as PercentIcon,
  TrendingUp as TrendingUpIcon,
  BarChart as BarChartIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Refresh as RefreshIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from "@mui/icons-material"
import Link from "next/link"

// Define types
interface ExamCategory {
  id: string
  name: string
  isMainExam: boolean
  totalMarks: number
  passMarks: number
  weight: number
  description?: string
  icon: React.ReactNode
  color: string
  subjectCount?: number
  questionCount?: number
  duration?: number
  difficultyLevel: "easy" | "medium" | "hard" | "mixed"
  gradingSystem?: string
  examFormat: string[]
  tags?: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
  status: "active" | "inactive" | "draft"
  completionRate?: number
  studentCount?: number
  averageScore?: number
}

// Sample data
const examCategories: ExamCategory[] = [
  {
    id: "1",
    name: "Final Examination",
    isMainExam: true,
    totalMarks: 100,
    passMarks: 40,
    weight: 50,
    description: "Comprehensive final examination covering all course material",
    icon: <AssignmentIcon />,
    color: "#f44336",
    subjectCount: 8,
    questionCount: 120,
    duration: 180,
    difficultyLevel: "hard",
    gradingSystem: "Percentage",
    examFormat: ["Multiple Choice", "Short Answer", "Essay", "Problem Solving"],
    tags: ["Core", "Mandatory", "Semester End"],
    createdAt: "2023-09-15T10:30:00Z",
    updatedAt: "2023-10-20T14:45:00Z",
    createdBy: "Admin",
    status: "active",
    completionRate: 85,
    studentCount: 450,
    averageScore: 72,
  },
  {
    id: "2",
    name: "Midterm Assessment",
    isMainExam: true,
    totalMarks: 50,
    passMarks: 20,
    weight: 30,
    description: "Mid-semester assessment to evaluate progress",
    icon: <SchoolIcon />,
    color: "#2196f3",
    subjectCount: 6,
    questionCount: 75,
    duration: 120,
    difficultyLevel: "medium",
    gradingSystem: "Percentage",
    examFormat: ["Multiple Choice", "Short Answer"],
    tags: ["Core", "Mandatory"],
    createdAt: "2023-08-10T09:15:00Z",
    updatedAt: "2023-09-05T11:30:00Z",
    createdBy: "Admin",
    status: "active",
    completionRate: 100,
    studentCount: 480,
    averageScore: 68,
  },
  {
    id: "3",
    name: "Weekly Quiz",
    isMainExam: false,
    totalMarks: 20,
    passMarks: 8,
    weight: 10,
    description: "Short weekly assessment to track ongoing progress",
    icon: <QuizIcon />,
    color: "#4caf50",
    subjectCount: 1,
    questionCount: 20,
    duration: 30,
    difficultyLevel: "easy",
    gradingSystem: "Percentage",
    examFormat: ["Multiple Choice", "True/False"],
    tags: ["Supplementary", "Regular"],
    createdAt: "2023-07-20T08:45:00Z",
    updatedAt: "2023-08-01T10:15:00Z",
    createdBy: "Teacher",
    status: "active",
    completionRate: 92,
    studentCount: 520,
    averageScore: 85,
  },
  {
    id: "4",
    name: "Practical Assessment",
    isMainExam: false,
    totalMarks: 50,
    passMarks: 25,
    weight: 30,
    description: "Hands-on assessment of practical skills and laboratory work",
    icon: <ScienceIcon />,
    color: "#ff9800",
    subjectCount: 3,
    questionCount: 15,
    duration: 120,
    difficultyLevel: "medium",
    gradingSystem: "Percentage",
    examFormat: ["Lab Work", "Demonstration", "Project"],
    tags: ["Practical", "Skills", "Laboratory"],
    createdAt: "2023-06-15T13:20:00Z",
    updatedAt: "2023-07-10T09:45:00Z",
    createdBy: "Admin",
    status: "active",
    completionRate: 78,
    studentCount: 320,
    averageScore: 76,
  },
  {
    id: "5",
    name: "Oral Examination",
    isMainExam: false,
    totalMarks: 30,
    passMarks: 15,
    weight: 20,
    description: "Verbal assessment of knowledge and understanding",
    icon: <RecordVoiceOverIcon />,
    color: "#9c27b0",
    subjectCount: 4,
    questionCount: 30,
    duration: 45,
    difficultyLevel: "medium",
    gradingSystem: "Percentage",
    examFormat: ["Viva Voce", "Presentation"],
    tags: ["Communication", "Verbal"],
    createdAt: "2023-05-25T11:10:00Z",
    updatedAt: "2023-06-05T14:30:00Z",
    createdBy: "Teacher",
    status: "active",
    completionRate: 65,
    studentCount: 280,
    averageScore: 70,
  },
  {
    id: "6",
    name: "Mock Examination",
    isMainExam: false,
    totalMarks: 100,
    passMarks: 40,
    weight: 0,
    description: "Practice examination to prepare for final assessment",
    icon: <CalendarTodayIcon />,
    color: "#e91e63",
    subjectCount: 8,
    questionCount: 100,
    duration: 180,
    difficultyLevel: "hard",
    gradingSystem: "Percentage",
    examFormat: ["Multiple Choice", "Short Answer", "Essay", "Problem Solving"],
    tags: ["Practice", "Preparation"],
    createdAt: "2023-04-20T10:45:00Z",
    updatedAt: "2023-05-15T09:30:00Z",
    createdBy: "Admin",
    status: "draft",
    completionRate: 30,
    studentCount: 410,
    averageScore: 62,
  },
]

// Stats data
const statsData = [
  {
    title: "Total Categories",
    value: examCategories.length,
    icon: <AssignmentIcon />,
    color: "#3f51b5",
    trend: "+2 this month",
    trendUp: true,
  },
  {
    title: "Main Exams",
    value: examCategories.filter((c) => c.isMainExam).length,
    icon: <SchoolIcon />,
    color: "#f44336",
    trend: "No change",
    trendUp: false,
  },
  {
    title: "Average Pass Rate",
    value: "76%",
    icon: <BarChartIcon />,
    color: "#4caf50",
    trend: "+4% improvement",
    trendUp: true,
  },
  {
    title: "Total Students",
    value: "1,250",
    icon: <PersonIcon />,
    color: "#ff9800",
    trend: "+120 new",
    trendUp: true,
  },
]

export default function ExamCategoriesPage() {
  const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  // const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  // State for view mode
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // State for filter
  const [filter, setFilter] = useState<"all" | "main" | "subsidiary">("all")

  // State for search
  const [searchQuery, setSearchQuery] = useState("")

  // State for menu
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null) 
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // State for refresh animation
  const [refreshing, setRefreshing] = useState(false)

  // Filter categories based on selected filter and search query
  const filteredCategories = examCategories.filter((category) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "main" && category.isMainExam) ||
      (filter === "subsidiary" && !category.isMainExam)

    const matchesSearch =
      searchQuery === "" ||
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (category.tags && category.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    return matchesFilter && matchesSearch
  })

  // Format duration
  const formatDuration = (minutes?: number) => {
    if (!minutes) return "Not set"
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours > 0 ? `${hours}h ` : ""}${mins > 0 ? `${mins}m` : ""}`
  }

  // Get difficulty color
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "easy":
        return "#4caf50"
      case "medium":
        return "#ff9800"
      case "hard":
        return "#f44336"
      case "mixed":
        return "#9c27b0"
      default:
        return "#9e9e9e"
    }
  }

  // Get difficulty label
  const getDifficultyLabel = (level: string) => {
    switch (level) {
      case "easy":
        return "Easy"
      case "medium":
        return "Medium"
      case "hard":
        return "Hard"
      case "mixed":
        return "Mixed"
      default:
        return "Not Set"
    }
  }

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, categoryId: string) => {
    setMenuAnchorEl(event.currentTarget)
    setSelectedCategory(categoryId)
  }

  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setSelectedCategory(null)
  }

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
      pb: 6
    }}>
      {/* Header */}
      <Box sx={{
        bgcolor: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <Container maxWidth="xl" sx={{p:{xs:"4px"}}}>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2
          }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                <SchoolIcon />
              </Avatar>
              <Typography variant="h5" fontWeight="bold">
                EduGenius Pro
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="Notifications">
                <IconButton>
                  <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Help">
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Settings">
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <Avatar sx={{ bgcolor: theme.palette.secondary.main, cursor: "pointer" }}>
                <PersonIcon />
              </Avatar>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: 3,
            gap: 2
          }}>
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Exam Categories
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Browse and manage all examination categories in your institution
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                sx={{
                  borderRadius: 2,
                  display: { xs: "none", sm: "flex" }
                }}
              >
                Advanced Filters
              </Button>

              <Button
                variant="contained"
                component={Link}
                href='/dashboard/exam/exam-categories/add'
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: 2,
                  background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                  boxShadow: "0 4px 20px rgba(33, 150, 243, 0.3)",
                }}
              >
                Add New Category
              </Button>
            </Box>
          </Box>

          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between"
          }}>
            <TextField
              placeholder="Search exam categories..."
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                maxWidth: { sm: 400 },
                bgcolor: "white",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                }
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Tabs
                value={filter}
                onChange={(_, newValue) => setFilter(newValue)}
                sx={{
                  bgcolor: "white",
                  borderRadius: 2,
                  minHeight: 40,
                  "& .MuiTabs-indicator": {
                    height: 3,
                    borderRadius: "3px 3px 0 0"
                  },
                  "& .MuiTab-root": {
                    minHeight: 40,
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                    textTransform: "none",
                  }
                }}
              >
                <Tab label="All Categories" value="all" />
                <Tab label="Main Exams" value="main" />
                <Tab label="Subsidiary" value="subsidiary" />
              </Tabs>

              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_, newMode) => {
                  if (newMode !== null) {
                    setViewMode(newMode)
                  }
                }}
                size="small"
                sx={{
                  bgcolor: "white",
                  borderRadius: 2,
                  "& .MuiToggleButton-root": {
                    border: "none",
                  }
                }}
              >
                <ToggleButton value="grid" aria-label="grid view">
                  <ViewModuleIcon />
                </ToggleButton>
                <ToggleButton value="list" aria-label="list view">
                  <ViewListIcon />
                </ToggleButton>
              </ToggleButtonGroup>

              <Tooltip title="Refresh">
                <IconButton onClick={handleRefresh} sx={{ bgcolor: "white" }}>
                  <RefreshIcon className={refreshing ? "spin" : ""} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsData.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: "100%",
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    transform: "translateY(-5px)"
                  }
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${stat.color}20`,
                      color: stat.color,
                      width: 48,
                      height: 48
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    {stat.trend}
                  </Typography>
                  {stat.trendUp ? (
                    <TrendingUpIcon fontSize="small" sx={{ ml: 0.5, color: "success.main" }} />
                  ) : (
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                      -
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Categories List */}
        {viewMode === "grid" ? (
          <Grid container spacing={3}>
            {filteredCategories.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category.id}>
                <Fade in={true} timeout={500}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      overflow: "visible",
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                        transform: "translateY(-5px)"
                      }
                    }}
                  >
                    <Box
                      sx={{
                        height: 8,
                        bgcolor: category.color,
                        borderRadius: "4px 4px 0 0"
                      }}
                    />
                    <CardContent sx={{ position: "relative", pt: 3 }}>
                      <Box sx={{ position: "absolute", top: -24, left: 24 }}>
                        <Avatar
                          sx={{
                            bgcolor: category.color,
                            width: 48,
                            height: 48,
                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                          }}
                        >
                          {category.icon}
                        </Avatar>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {category.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {category.description}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, category.id)}
                          sx={{ mt: -1, mr: -1 }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>

                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                        <Chip
                          label={category.isMainExam ? "Main Exam" : "Subsidiary"}
                          size="small"
                          color={category.isMainExam ? "primary" : "default"}
                          sx={{ borderRadius: 1 }}
                        />
                        <Chip
                          label={getDifficultyLabel(category.difficultyLevel)}
                          size="small"
                          sx={{
                            borderRadius: 1,
                            bgcolor: `${getDifficultyColor(category.difficultyLevel)}20`,
                            color: getDifficultyColor(category.difficultyLevel),
                            fontWeight: "medium"
                          }}
                        />
                        <Chip
                          label={category.status}
                          size="small"
                          sx={{
                            borderRadius: 1,
                            bgcolor: category.status === "active" ? "#e8f5e9" : "#fff8e1",
                            color: category.status === "active" ? "#2e7d32" : "#f57c00",
                            fontWeight: "medium"
                          }}
                        />
                      </Box>

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Total Marks
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {category.totalMarks}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Pass Marks
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {category.passMarks} ({Math.round((category.passMarks / category.totalMarks) * 100)}%)
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PercentIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: 14 }} />
                            <Typography variant="caption" color="text.secondary">
                              Weight
                            </Typography>
                          </Box>
                          <Typography variant="body2" fontWeight="medium">
                            {category.weight}%
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <TimerIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: 14 }} />
                            <Typography variant="caption" color="text.secondary">
                              Duration
                            </Typography>
                          </Box>
                          <Typography variant="body2" fontWeight="medium">
                            {formatDuration(category.duration)}
                          </Typography>
                        </Grid>
                      </Grid>

                      {category.completionRate !== undefined && (
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                              Completion Rate
                            </Typography>
                            <Typography variant="caption" fontWeight="bold">
                              {category.completionRate}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={category.completionRate}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: "#e0e0e0",
                              "& .MuiLinearProgress-bar": {
                                bgcolor: category.color,
                                borderRadius: 3,
                              }
                            }}
                          />
                        </Box>
                      )}

                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {category.examFormat.slice(0, 2).map((format, index) => (
                          <Chip
                            key={index}
                            label={format}
                            size="small"
                            variant="outlined"
                            sx={{ borderRadius: 1 }}
                          />
                        ))}
                        {category.examFormat.length > 2 && (
                          <Chip
                            label={`+${category.examFormat.length - 2}`}
                            size="small"
                            variant="outlined"
                            sx={{ borderRadius: 1 }}
                          />
                        )}
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: "space-between", px: 2, py: 1 }}>
                      <Button
                        size="small"
                        startIcon={<VisibilityIcon />}
                        sx={{ textTransform: "none" }}
                      >
                        View Details
                      </Button>
                      <Box>
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardActions>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>
            {filteredCategories.map((category) => (
              <Fade in={true} timeout={500} key={category.id}>
                <Paper
                  sx={{
                    mb: 3,
                    borderRadius: 4,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    }
                  }}
                >
                  <Box sx={{ display: "flex", borderLeft: `6px solid ${category.color}` }}>
                    <Box sx={{ p: 3, flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: `${category.color}20`,
                            color: category.color,
                            mr: 2
                          }}
                        >
                          {category.icon}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            gap: 1
                          }}>
                            <Typography variant="h6" fontWeight="bold">
                              {category.name}
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                              <Chip
                                label={category.isMainExam ? "Main Exam" : "Subsidiary"}
                                size="small"

                                color={category.isMainExam ? "primary" : "default"}
                                sx={{ borderRadius: 1 }}
                              />
                              <Chip
                                label={getDifficultyLabel(category.difficultyLevel)}
                                size="small"
                                sx={{
                                  borderRadius: 1,
                                  bgcolor: `${getDifficultyColor(category.difficultyLevel)}20`,
                                  color: getDifficultyColor(category.difficultyLevel),
                                  fontWeight: "medium"
                                }}
                              />
                              <Chip
                                label={category.status}
                                size="small"
                                sx={{
                                  borderRadius: 1,
                                  bgcolor: category.status === "active" ? "#e8f5e9" : "#fff8e1",
                                  color: category.status === "active" ? "#2e7d32" : "#f57c00",
                                  fontWeight: "medium"
                                }}
                              />
                            </Box>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {category.description}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, category.id)}
                          sx={{ ml: 1 }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <BarChartIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: 16 }} />
                            <Typography variant="caption" color="text.secondary">
                              Total/Pass Marks
                            </Typography>
                          </Box>
                          <Typography variant="body2" fontWeight="medium">
                            {category.totalMarks} / {category.passMarks} ({Math.round((category.passMarks / category.totalMarks) * 100)}%)
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PercentIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: 16 }} />
                            <Typography variant="caption" color="text.secondary">
                              Weight
                            </Typography>
                          </Box>
                          <Typography variant="body2" fontWeight="medium">
                            {category.weight}%
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <TimerIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: 16 }} />
                            <Typography variant="caption" color="text.secondary">
                              Duration
                            </Typography>
                          </Box>
                          <Typography variant="body2" fontWeight="medium">
                            {formatDuration(category.duration)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PersonIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: 16 }} />
                            <Typography variant="caption" color="text.secondary">
                              Students
                            </Typography>
                          </Box>
                          <Typography variant="body2" fontWeight="medium">
                            {category.studentCount || 0}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                          {category.examFormat.map((format, index) => (
                            <Chip
                              key={index}
                              label={format}
                              size="small"
                              variant="outlined"
                              sx={{ borderRadius: 1 }}
                            />
                          ))}
                        </Box>

                        {category.completionRate !== undefined && (
                          <Box sx={{ display: "flex", alignItems: "center", ml: "auto", minWidth: 200 }}>
                            <Box sx={{ flex: 1, mr: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={category.completionRate}
                                sx={{
                                  height: 6,
                                  borderRadius: 3,
                                  bgcolor: "#e0e0e0",
                                  "& .MuiLinearProgress-bar": {
                                    bgcolor: category.color,
                                    borderRadius: 3,
                                  }
                                }}
                              />
                            </Box>
                            <Typography variant="caption" fontWeight="bold">
                              {category.completionRate}%
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>

                    <Box sx={{
                      display: { xs: "none", md: "flex" },
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      p: 2,
                      bgcolor: "#f9f9f9",
                      minWidth: 100,
                      borderLeft: "1px solid #eee"
                    }}>
                      <IconButton color="primary" sx={{ mb: 1 }}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="secondary" sx={{ mb: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton sx={{ mb: 1 }}>
                        <ContentCopyIcon />
                      </IconButton>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              </Fade>
            ))}
          </Box>
        )}

        {/* Empty state */}
        {filteredCategories.length === 0 && (
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 4,
              bgcolor: "#f9f9f9",
              border: "1px dashed #ccc"
            }}
          >
            <SearchIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No exam categories found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your search or filter criteria
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setSearchQuery("")
                setFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </Paper>
        )}
      </Container>

      {/* Action Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
          <ListItemIcon sx={{ color: "error.main" }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </Box>
  )
}
