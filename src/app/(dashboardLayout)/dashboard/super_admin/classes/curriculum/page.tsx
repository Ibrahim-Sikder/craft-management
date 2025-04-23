"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  Divider,
  Tabs,
  Tab,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Avatar,
  Badge,
  Switch,
  Zoom,
  Collapse,
  // useTheme,
  // useMediaQuery,
  LinearProgress,
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  Backdrop,
  CircularProgress,
  type ChipProps,
  ListItem,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  ContentCopy as ContentCopyIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Refresh as RefreshIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Close as CloseIcon,
} from "@mui/icons-material"
import Link from "next/link"

// Sample data for demonstration
const sampleCurriculums = [
  {
    id: 1,
    name: "Science Curriculum 2023",
    code: "SC-2023",
    gradeLevel: "Grade 10",
    department: "Science",
    subjects: 8,
    academicYear: "2023-2024",
    status: "active",
    lastUpdated: "2023-08-15",
    favorite: true,
    rating: 5,
    color: "#DCEDC8",
  },
  {
    id: 2,
    name: "Mathematics Advanced",
    code: "MATH-ADV",
    gradeLevel: "Grade 11",
    department: "Science",
    subjects: 6,
    academicYear: "2023-2024",
    status: "active",
    lastUpdated: "2023-07-22",
    favorite: false,
    rating: 4,
    color: "#B3E5FC",
  },
  {
    id: 3,
    name: "English Literature",
    code: "ENG-LIT",
    gradeLevel: "Grade 12",
    department: "Arts",
    subjects: 5,
    academicYear: "2023-2024",
    status: "draft",
    lastUpdated: "2023-08-01",
    favorite: false,
    rating: 3,
    color: "#FFECB3",
  },
  {
    id: 4,
    name: "Computer Science Fundamentals",
    code: "CS-FUN",
    gradeLevel: "Grade 9",
    department: "Technical",
    subjects: 7,
    academicYear: "2023-2024",
    status: "active",
    lastUpdated: "2023-08-10",
    favorite: true,
    rating: 5,
    color: "#D1C4E9",
  },
  {
    id: 5,
    name: "History and Civics",
    code: "HIST-CIV",
    gradeLevel: "Grade 8",
    department: "Arts",
    subjects: 4,
    academicYear: "2023-2024",
    status: "archived",
    lastUpdated: "2023-06-15",
    favorite: false,
    rating: 2,
    color: "#F8BBD0",
  },
  {
    id: 6,
    name: "Physical Education",
    code: "PHY-ED",
    gradeLevel: "Grade 7",
    department: "General Education",
    subjects: 3,
    academicYear: "2023-2024",
    status: "active",
    lastUpdated: "2023-07-30",
    favorite: false,
    rating: 4,
    color: "#C8E6C9",
  },
  {
    id: 7,
    name: "Business Studies",
    code: "BUS-STD",
    gradeLevel: "Grade 11",
    department: "Commerce",
    subjects: 6,
    academicYear: "2023-2024",
    status: "draft",
    lastUpdated: "2023-08-05",
    favorite: true,
    rating: 4,
    color: "#B2DFDB",
  },
  {
    id: 8,
    name: "Art and Design",
    code: "ART-DES",
    gradeLevel: "Grade 10",
    department: "Arts",
    subjects: 5,
    academicYear: "2023-2024",
    status: "active",
    lastUpdated: "2023-07-12",
    favorite: false,
    rating: 3,
    color: "#BBDEFB",
  },
  {
    id: 9,
    name: "Chemistry Advanced",
    code: "CHEM-ADV",
    gradeLevel: "Grade 12",
    department: "Science",
    subjects: 7,
    academicYear: "2023-2024",
    status: "active",
    lastUpdated: "2023-08-20",
    favorite: false,
    rating: 5,
    color: "#E1BEE7",
  },
  {
    id: 10,
    name: "Geography and Environment",
    code: "GEO-ENV",
    gradeLevel: "Grade 9",
    department: "Arts",
    subjects: 4,
    academicYear: "2023-2024",
    status: "draft",
    lastUpdated: "2023-07-25",
    favorite: false,
    rating: 3,
    color: "#FFD3B6",
  },
]

export default function CurriculumList() {
  // const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [searchTerm, setSearchTerm] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [actionAnchorEl, setActionAnchorEl] = useState<null | HTMLElement>(null)
  const [currentCurriculumId, setCurrentCurriculumId] = useState<number | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [gradeLevelFilter, setGradeLevelFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [viewMode, setViewMode] = useState("table") // table or grid
  const [sortBy, setSortBy] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [loading, setLoading] = useState(false)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false)
  const [selectedCurriculum, setSelectedCurriculum] = useState<(typeof sampleCurriculums)[0] | null>(null)
  const [showWelcomeCard, setShowWelcomeCard] = useState(true)
  const [curriculums, setCurriculums] = useState(sampleCurriculums)

  useEffect(() => {
    // Simulate loading data
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  // Fix 1: Properly type the handleTabChange function
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number): void => {
    setTabValue(newValue)
    setPage(1)
  }

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleActionClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setActionAnchorEl(event.currentTarget)
    setCurrentCurriculumId(id)
  }

  const handleActionClose = () => {
    setActionAnchorEl(null)
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    handleActionClose()
  }

  const handleDeleteConfirm = () => {
    setCurriculums(curriculums.filter((c) => c.id !== currentCurriculumId))
    setDeleteDialogOpen(false)
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    window.scrollTo(0, 0)
  }

  const handleViewDetails = (curriculum: (typeof sampleCurriculums)[0]) => {
    setSelectedCurriculum(curriculum)
    setDetailsDrawerOpen(true)
    handleActionClose()
  }

  const handleToggleFavorite = (id: number) => {
    setCurriculums(curriculums.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)))
  }

  const handleChangeRating = (id: number, newRating: number) => {
    setCurriculums(curriculums.map((c) => (c.id === id ? { ...c, rating: newRating } : c)))
  }

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortDirection("asc")
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  // Filter and sort curricula
  const filteredCurriculums = curriculums
    .filter((curriculum) => {
      // Search filter
      const matchesSearch =
        curriculum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curriculum.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curriculum.gradeLevel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curriculum.department.toLowerCase().includes(searchTerm.toLowerCase())

      // Tab filter (0 = All, 1 = Active, 2 = Draft, 3 = Archived)
      let matchesTab = true
      if (tabValue === 1) matchesTab = curriculum.status === "active"
      if (tabValue === 2) matchesTab = curriculum.status === "draft"
      if (tabValue === 3) matchesTab = curriculum.status === "archived"

      // Department filter
      const matchesDepartment = departmentFilter === "all" || curriculum.department === departmentFilter

      // Grade level filter
      const matchesGradeLevel = gradeLevelFilter === "all" || curriculum.gradeLevel === gradeLevelFilter

      // Favorites filter
      const matchesFavorites = !showFavoritesOnly || curriculum.favorite

      return matchesSearch && matchesTab && matchesDepartment && matchesGradeLevel && matchesFavorites
    })
    .sort((a, b) => {
      // Sort logic
      if (sortBy === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortBy === "lastUpdated") {
        return sortDirection === "asc"
          ? new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
          : new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      } else if (sortBy === "rating") {
        return sortDirection === "asc" ? a.rating - b.rating : b.rating - a.rating
      } else if (sortBy === "subjects") {
        return sortDirection === "asc" ? a.subjects - b.subjects : b.subjects - a.subjects
      }
      return 0
    })

  // Pagination
  const paginatedCurriculums = filteredCurriculums.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  // Get unique departments and grade levels for filters
  const departments = ["all", ...Array.from(new Set(curriculums.map((c) => c.department)))]
  const gradeLevels = ["all", ...Array.from(new Set(curriculums.map((c) => c.gradeLevel)))]

  // Stats
  const totalCurriculums = curriculums.length
  const activeCurriculums = curriculums.filter((c) => c.status === "active").length
  const draftCurriculums = curriculums.filter((c) => c.status === "draft").length
  const archivedCurriculums = curriculums.filter((c) => c.status === "archived").length

  const renderRatingStars = (rating: number, id: number, interactive = false) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <IconButton
            key={star}
            size="small"
            onClick={interactive ? () => handleChangeRating(id, star) : undefined}
            sx={{
              p: 0.5,
              color: rating >= star ? "warning.main" : "action.disabled",
              cursor: interactive ? "pointer" : "default",
            }}
          >
            {rating >= star ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
          </IconButton>
        ))}
      </Box>
    )
  }

  // Fix 2: Properly type the renderStatusChip function
  const renderStatusChip = (status: string) => {
    // Define the color and icon based on status
    let chipColor: ChipProps["color"] = "default"
    let chipIcon: React.ReactElement | undefined = undefined

    switch (status) {
      case "active":
        chipColor = "success"
        chipIcon = <CheckCircleIcon fontSize="small" />
        break
      case "draft":
        chipColor = "warning"
        chipIcon = <EditIcon fontSize="small" />
        break
      case "archived":
        chipColor = "default"
        chipIcon = <BookmarkIcon fontSize="small" />
        break
    }

    return (
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        color={chipColor}
        size="small"
        icon={chipIcon}
        sx={{
          borderRadius: 1,
          "& .MuiChip-label": {
            px: 1,
          },
        }}
      />
    )
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          background: "linear-gradient(to right bottom, #ffffff, #f9f9ff)",
          boxShadow: "0 8px 32px rgba(77, 101, 217, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(25,118,210,0.08) 0%, rgba(25,118,210,0) 70%)",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Curriculum Management
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                sx={{
                  borderRadius: 2,
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                  },
                }}
              >
                Refresh
              </Button>

              <Link href="/dashboard/super_admin/classes/curriculum/new" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  size="large"
                  sx={{
                    borderRadius: 2,
                    boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
                    "&:hover": {
                      boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
                    },
                  }}
                >
                  New Curriculum
                </Button>
              </Link>
            </Box>
          </Box>

          <Collapse in={showWelcomeCard}>
            <Card
              variant="outlined"
              sx={{
                mb: 4,
                borderRadius: 3,
                borderColor: "primary.light",
                background: "linear-gradient(to right, rgba(25,118,210,0.05), rgba(25,118,210,0.1))",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <IconButton
                size="small"
                onClick={() => setShowWelcomeCard(false)}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              <CardContent sx={{ display: "flex", alignItems: "flex-start", gap: 2, p: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 50,
                    height: 50,
                  }}
                >
                  <SchoolIcon fontSize="large" />
                </Avatar>

                <Box>
                  <Typography variant="h6" fontWeight="bold" color="primary.dark" gutterBottom>
                    Welcome to Curriculum Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This module allows you to create, manage, and organize all your educational curricula in one place.
                    Create new curricula, track their status, and ensure your educational programs are always
                    up-to-date. Use the filters and search to quickly find what you need.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Collapse>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Zoom in={!loading} style={{ transitionDelay: "100ms" }}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <Typography color="text.secondary" variant="overline" fontWeight="medium">
                        Total Curricula
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {totalCurriculums}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: "primary.light",
                        width: 56,
                        height: 56,
                      }}
                    >
                      <ContentCopyIcon sx={{ color: "primary.contrastText" }} />
                    </Avatar>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Zoom in={!loading} style={{ transitionDelay: "200ms" }}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <Typography color="text.secondary" variant="overline" fontWeight="medium">
                        Active Curricula
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {activeCurriculums}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: "success.light",
                        width: 56,
                        height: 56,
                      }}
                    >
                      <CheckCircleIcon sx={{ color: "success.contrastText" }} />
                    </Avatar>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Zoom in={!loading} style={{ transitionDelay: "300ms" }}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <Typography color="text.secondary" variant="overline" fontWeight="medium">
                        Draft Curricula
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {draftCurriculums}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: "warning.light",
                        width: 56,
                        height: 56,
                      }}
                    >
                      <EditIcon sx={{ color: "warning.contrastText" }} />
                    </Avatar>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Zoom in={!loading} style={{ transitionDelay: "400ms" }}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <Typography color="text.secondary" variant="overline" fontWeight="medium">
                        Archived Curricula
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {archivedCurriculums}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: "grey.400",
                        width: 56,
                        height: 56,
                      }}
                    >
                      <BookmarkIcon sx={{ color: "grey.100" }} />
                    </Avatar>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                sx={{
                  "& .MuiTab-root": {
                    minWidth: "auto",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    mx: 0.5,
                    transition: "all 0.2s",
                    "&.Mui-selected": {
                      bgcolor: "rgba(25,118,210,0.1)",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}
              >
                <Tab label={`All (${filteredCurriculums.length})`} />
                <Tab label={`Active (${curriculums.filter((c) => c.status === "active").length})`} />
                <Tab label={`Draft (${curriculums.filter((c) => c.status === "draft").length})`} />
                <Tab label={`Archived (${curriculums.filter((c) => c.status === "archived").length})`} />
              </Tabs>

              <FormControl sx={{ minWidth: 120, display: { xs: "none", md: "block" } }}>
                <InputLabel id="rows-per-page-label" size="small">
                  Rows
                </InputLabel>
                {/* Fix 3: Properly type the onChange handler for Select */}
                <Select
                  labelId="rows-per-page-label"
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  label="Rows"
                  size="small"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value={5}>5 rows</MenuItem>
                  <MenuItem value={10}>10 rows</MenuItem>
                  <MenuItem value={25}>25 rows</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Favorites
                </Typography>
                <Switch
                  checked={showFavoritesOnly}
                  onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                  color="primary"
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <Tooltip title="Table View">
                  <IconButton color={viewMode === "table" ? "primary" : "default"} onClick={() => setViewMode("table")}>
                    <ViewListIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Grid View">
                  <IconButton color={viewMode === "grid" ? "primary" : "default"} onClick={() => setViewMode("grid")}>
                    <ViewModuleIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <TextField
                placeholder="Search curricula..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 },
                }}
                sx={{ width: { xs: "100%", sm: 250 } }}
              />

              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={handleFilterClick}
                sx={{
                  borderRadius: 2,
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                  },
                }}
              >
                Filter
              </Button>

              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={handleFilterClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    borderRadius: 2,
                    width: 280,
                    p: 1,
                  },
                }}
              >
                <MenuItem sx={{ pointerEvents: "none" }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Department
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <FormControl fullWidth size="small">
                    <Select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value as string)}
                      displayEmpty
                      sx={{ borderRadius: 2 }}
                    >
                      {departments.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept === "all" ? "All Departments" : dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MenuItem>

                <Divider sx={{ my: 1 }} />

                <MenuItem sx={{ pointerEvents: "none" }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Grade Level
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <FormControl fullWidth size="small">
                    <Select
                      value={gradeLevelFilter}
                      onChange={(e) => setGradeLevelFilter(e.target.value as string)}
                      displayEmpty
                      sx={{ borderRadius: 2 }}
                    >
                      {gradeLevels.map((grade) => (
                        <MenuItem key={grade} value={grade}>
                          {grade === "all" ? "All Grade Levels" : grade}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MenuItem>

                <Divider sx={{ my: 1 }} />

                <MenuItem sx={{ pointerEvents: "none" }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Sort By
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <FormControl fullWidth size="small">
                    <Select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value as string)
                        setSortDirection("asc")
                      }}
                      displayEmpty
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="name">Name</MenuItem>
                      <MenuItem value="lastUpdated">Last Updated</MenuItem>
                      <MenuItem value="rating">Rating</MenuItem>
                      <MenuItem value="subjects">Number of Subjects</MenuItem>
                    </Select>
                  </FormControl>
                </MenuItem>

                <MenuItem>
                  <FormControl fullWidth size="small">
                    <Select
                      value={sortDirection}
                      onChange={(e) => setSortDirection(e.target.value as string)}
                      displayEmpty
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="asc">Ascending</MenuItem>
                      <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                  </FormControl>
                </MenuItem>

                <Divider sx={{ my: 1 }} />

                <MenuItem>
                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    onClick={handleFilterClose}
                    sx={{ borderRadius: 2 }}
                  >
                    Apply Filters
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {loading ? (
            <Box sx={{ width: "100%", mt: 4, mb: 2 }}>
              <LinearProgress />
            </Box>
          ) : (
            <>
              {viewMode === "table" ? (
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    mb: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: "rgba(25,118,210,0.05)" }}>
                      <TableRow>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                              userSelect: "none",
                            }}
                            onClick={() => handleSortChange("name")}
                          >
                            <Typography fontWeight="bold">Name</Typography>
                            {sortBy === "name" && (
                              <Box component="span" sx={{ ml: 0.5 }}>
                                {sortDirection === "asc" ? (
                                  <ArrowUpwardIcon fontSize="small" />
                                ) : (
                                  <ArrowDownwardIcon fontSize="small" />
                                )}
                              </Box>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight="bold">Code</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight="bold">Grade Level</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight="bold">Department</Typography>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                              userSelect: "none",
                            }}
                            onClick={() => handleSortChange("subjects")}
                          >
                            <Typography fontWeight="bold">Subjects</Typography>
                            {sortBy === "subjects" && (
                              <Box component="span" sx={{ ml: 0.5 }}>
                                {sortDirection === "asc" ? (
                                  <ArrowUpwardIcon fontSize="small" />
                                ) : (
                                  <ArrowDownwardIcon fontSize="small" />
                                )}
                              </Box>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight="bold">Status</Typography>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                              userSelect: "none",
                            }}
                            onClick={() => handleSortChange("rating")}
                          >
                            <Typography fontWeight="bold">Rating</Typography>
                            {sortBy === "rating" && (
                              <Box component="span" sx={{ ml: 0.5 }}>
                                {sortDirection === "asc" ? (
                                  <ArrowUpwardIcon fontSize="small" />
                                ) : (
                                  <ArrowDownwardIcon fontSize="small" />
                                )}
                              </Box>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography fontWeight="bold">Actions</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedCurriculums.map((curriculum) => (
                        <TableRow
                          key={curriculum.id}
                          hover
                          sx={{
                            position: "relative",
                            "&:hover": {
                              bgcolor: "rgba(25,118,210,0.04)",
                            },
                            ...(curriculum.favorite && {
                              bgcolor: "rgba(255,235,59,0.05)",
                              "&:hover": {
                                bgcolor: "rgba(255,235,59,0.1)",
                              },
                            }),
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleToggleFavorite(curriculum.id)}
                                color={curriculum.favorite ? "warning" : "default"}
                                sx={{ mr: 0.5 }}
                              >
                                {curriculum.favorite ? (
                                  <BookmarkIcon fontSize="small" />
                                ) : (
                                  <BookmarkBorderIcon fontSize="small" />
                                )}
                              </IconButton>
                              <Typography fontWeight="medium">{curriculum.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{curriculum.code}</TableCell>
                          <TableCell>{curriculum.gradeLevel}</TableCell>
                          <TableCell>
                            <Chip
                              label={curriculum.department}
                              size="small"
                              variant="outlined"
                              sx={{
                                borderRadius: 1,
                                backgroundColor: curriculum.color,
                                borderColor: "transparent",
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Badge
                              badgeContent={curriculum.subjects}
                              color="primary"
                              sx={{
                                "& .MuiBadge-badge": {
                                  borderRadius: 1,
                                  minWidth: 22,
                                  height: 22,
                                },
                              }}
                            >
                              <BookIcon color="action" />
                            </Badge>
                          </TableCell>
                          <TableCell>{renderStatusChip(curriculum.status)}</TableCell>
                          <TableCell>{renderRatingStars(curriculum.rating, curriculum.id)}</TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                              <Tooltip title="View Details">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => handleViewDetails(curriculum)}
                                  sx={{
                                    bgcolor: "rgba(25,118,210,0.1)",
                                    mr: 1,
                                    "&:hover": {
                                      bgcolor: "rgba(25,118,210,0.2)",
                                    },
                                  }}
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  sx={{
                                    bgcolor: "rgba(25,118,210,0.1)",
                                    mr: 1,
                                    "&:hover": {
                                      bgcolor: "rgba(25,118,210,0.2)",
                                    },
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="More Actions">
                                <IconButton
                                  size="small"
                                  onClick={(e) => handleActionClick(e, curriculum.id)}
                                  sx={{
                                    bgcolor: "rgba(0,0,0,0.05)",
                                    "&:hover": {
                                      bgcolor: "rgba(0,0,0,0.1)",
                                    },
                                  }}
                                >
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}

                      {paginatedCurriculums.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                              <SearchIcon sx={{ fontSize: 48, color: "text.disabled" }} />
                              <Typography variant="h6" color="text.secondary">
                                No curricula found matching your search criteria
                              </Typography>
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  setSearchTerm("")
                                  setDepartmentFilter("all")
                                  setGradeLevelFilter("all")
                                  setTabValue(0)
                                  setShowFavoritesOnly(false)
                                }}
                                sx={{ mt: 1, borderRadius: 2 }}
                              >
                                Clear Filters
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  {paginatedCurriculums.length === 0 ? (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 2,
                          py: 5,
                        }}
                      >
                        <SearchIcon sx={{ fontSize: 48, color: "text.disabled" }} />
                        <Typography variant="h6" color="text.secondary">
                          No curricula found matching your search criteria
                        </Typography>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setSearchTerm("")
                            setDepartmentFilter("all")
                            setGradeLevelFilter("all")
                            setTabValue(0)
                            setShowFavoritesOnly(false)
                          }}
                          sx={{ mt: 1, borderRadius: 2 }}
                        >
                          Clear Filters
                        </Button>
                      </Box>
                    </Grid>
                  ) : (
                    paginatedCurriculums.map((curriculum) => (
                      <Grid item xs={12} sm={6} md={4} key={curriculum.id}>
                        <Zoom in={true}>
                          <Card
                            variant="outlined"
                            sx={{
                              borderRadius: 3,
                              transition: "all 0.3s ease",
                              position: "relative",
                              overflow: "hidden",
                              height: "100%",
                              ...(curriculum.favorite && {
                                bgcolor: "rgba(255,235,59,0.05)",
                              }),
                              "&:hover": {
                                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                transform: "translateY(-5px)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 8,
                                bgcolor: curriculum.color,
                              }}
                            />

                            <CardContent sx={{ pt: 3 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "flex-start",
                                  mb: 2,
                                }}
                              >
                                <Typography variant="h6" fontWeight="bold" noWrap sx={{ maxWidth: "80%" }}>
                                  {curriculum.name}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={() => handleToggleFavorite(curriculum.id)}
                                  color={curriculum.favorite ? "warning" : "default"}
                                >
                                  {curriculum.favorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                                </IconButton>
                              </Box>

                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Code: <strong>{curriculum.code}</strong>
                              </Typography>

                              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                                <Chip
                                  label={curriculum.gradeLevel}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                  sx={{ borderRadius: 1 }}
                                />
                                <Chip
                                  label={curriculum.department}
                                  size="small"
                                  sx={{
                                    borderRadius: 1,
                                    bgcolor: curriculum.color,
                                    borderColor: "transparent",
                                  }}
                                />
                                {renderStatusChip(curriculum.status)}
                              </Box>

                              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <Badge
                                  badgeContent={curriculum.subjects}
                                  color="primary"
                                  sx={{
                                    mr: 1,
                                    "& .MuiBadge-badge": {
                                      borderRadius: 1,
                                      minWidth: 22,
                                      height: 22,
                                    },
                                  }}
                                >
                                  <BookIcon color="action" />
                                </Badge>
                                <Typography variant="body2" color="text.secondary">
                                  subjects
                                </Typography>
                              </Box>

                              <Box
                                sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 3 }}
                              >
                                {renderRatingStars(curriculum.rating, curriculum.id, true)}

                                <Box>
                                  <Tooltip title="View Details">
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      onClick={() => handleViewDetails(curriculum)}
                                      sx={{
                                        bgcolor: "rgba(25,118,210,0.1)",
                                        mr: 1,
                                        "&:hover": {
                                          bgcolor: "rgba(25,118,210,0.2)",
                                        },
                                      }}
                                    >
                                      <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Edit">
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      sx={{
                                        bgcolor: "rgba(25,118,210,0.1)",
                                        "&:hover": {
                                          bgcolor: "rgba(25,118,210,0.2)",
                                        },
                                      }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Zoom>
                      </Grid>
                    ))
                  )}
                </Grid>
              )}

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Showing {paginatedCurriculums.length} of {filteredCurriculums.length} curricula
                </Typography>

                <Pagination
                  count={Math.ceil(filteredCurriculums.length / rowsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                  sx={{
                    "& .MuiPaginationItem-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>
            </>
          )}
        </Box>
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={actionAnchorEl}
        open={Boolean(actionAnchorEl)}
        onClose={handleActionClose}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: 2,
            width: 200,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            const curriculum = curriculums.find((c) => c.id === currentCurriculumId)
            if (curriculum) {
              handleViewDetails(curriculum)
            }
          }}
        >
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleActionClose}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleActionClose}>
          <ContentCopyIcon fontSize="small" sx={{ mr: 1 }} />
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleActionClose}>
          <PrintIcon fontSize="small" sx={{ mr: 1 }} />
          Print
        </MenuItem>
        <MenuItem onClick={handleActionClose}>
          <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
          Export
        </MenuItem>
        <MenuItem onClick={handleActionClose}>
          <ShareIcon fontSize="small" sx={{ mr: 1 }} />
          Share
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Delete Curriculum</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this curriculum? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined" sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" sx={{ borderRadius: 2 }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Curriculum Details Drawer */}
      <Drawer
        anchor="right"
        open={detailsDrawerOpen}
        onClose={() => setDetailsDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 450 },
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            p: 3,
          },
        }}
      >
        {selectedCurriculum && (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h5" fontWeight="bold">
                Curriculum Details
              </Typography>
              <IconButton onClick={() => setDetailsDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ position: "relative", mb: 3 }}>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 8,
                  bgcolor: selectedCurriculum.color,
                }}
              />
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  pt: 2,
                  mt: 1,
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {selectedCurriculum.name}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleFavorite(selectedCurriculum.id)}
                      color={selectedCurriculum.favorite ? "warning" : "default"}
                    >
                      {selectedCurriculum.favorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Code: <strong>{selectedCurriculum.code}</strong>
                  </Typography>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3, mt: 2 }}>
                    <Chip
                      label={selectedCurriculum.gradeLevel}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                    <Chip
                      label={selectedCurriculum.department}
                      size="small"
                      sx={{
                        borderRadius: 1,
                        bgcolor: selectedCurriculum.color,
                        borderColor: "transparent",
                      }}
                    />
                    {renderStatusChip(selectedCurriculum.status)}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Academic Year
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedCurriculum.academicYear}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Subjects
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedCurriculum.subjects}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Last Updated
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedCurriculum.lastUpdated}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Rating
                      </Typography>
                      {renderRatingStars(selectedCurriculum.rating, selectedCurriculum.id, true)}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Quick Actions
            </Typography>

            <List>
              <ListItem
                component="button"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": {
                    bgcolor: "rgba(25,118,210,0.1)",
                  },
                  textAlign: "left",
                  width: "100%",
                  border: "none",
                  background: "none",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                <ListItemIcon>
                  <EditIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Edit Curriculum" />
              </ListItem>
              <ListItem
                component="button"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": {
                    bgcolor: "rgba(25,118,210,0.1)",
                  },
                  textAlign: "left",
                  width: "100%",
                  border: "none",
                  background: "none",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                <ListItemIcon>
                  <PrintIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Print Curriculum" />
              </ListItem>
              <ListItem
                component="button"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": {
                    bgcolor: "rgba(25,118,210,0.1)",
                  },
                  textAlign: "left",
                  width: "100%",
                  border: "none",
                  background: "none",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                <ListItemIcon>
                  <DownloadIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Export as PDF" />
              </ListItem>
              <ListItem
                component="button"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": {
                    bgcolor: "rgba(25,118,210,0.1)",
                  },
                  textAlign: "left",
                  width: "100%",
                  border: "none",
                  background: "none",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                <ListItemIcon>
                  <ShareIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Share Curriculum" />
              </ListItem>
              <ListItem
                component="button"
                sx={{
                  borderRadius: 2,
                  color: "error.main",
                  "&:hover": {
                    bgcolor: "rgba(211,47,47,0.1)",
                  },
                  textAlign: "left",
                  width: "100%",
                  border: "none",
                  background: "none",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setCurrentCurriculumId(selectedCurriculum.id)
                  setDetailsDrawerOpen(false)
                  setDeleteDialogOpen(true)
                }}
              >
                <ListItemIcon>
                  <DeleteIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Delete Curriculum" />
              </ListItem>
            </List>
          </>
        )}
      </Drawer>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  )
}