/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  LinearProgress,
  Fade,
  Breadcrumbs,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  useMediaQuery,
  Drawer,
  AppBar,
  Toolbar,
  Collapse,
  InputAdornment,
  type SelectChangeEvent,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Print as PrintIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Assignment as AssignmentIcon,
  CalendarMonth as CalendarMonthIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDeleteDailyClassReportMutation, useGetAllDailyClassReportsQuery } from "@/redux/api/dailyClassReportApi"

// Define theme with Bengali font support
const theme = createTheme({
  typography: {
    fontFamily: "'Hind Siliguri', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  palette: {
    primary: {
      main: "#4f46e5",
      light: "#6366f1",
      dark: "#4338ca",
    },
    secondary: {
      main: "#0ea5e9",
      light: "#38bdf8",
      dark: "#0284c7",
    },
    error: {
      main: "#ef4444",
    },
    warning: {
      main: "#f59e0b",
    },
    success: {
      main: "#10b981",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})

// Types for API data
type ClassData = {
  subject: string
  class: string
  fullyLearned: number
  partiallyLearned: number
  notLearned: number
  lessonDetails: string
  homework: string
  diaryCompleted: "হ্যাঁ" | "না"
  learningPercentage: number
  totalStudents: number
}

type ReportData = {
  _id: string
  teacherName: string
  date: string
  classes: ClassData[]
  createdAt: string
  updatedAt: string
}



type FilterState = {
  startDate: string | null
  endDate: string | null
  teacher: string
  subject: string
  class: string
  searchQuery: string
}

// Bengali number conversion function
const toBengaliNumber = (num: number): string => {
  const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
  return num
    .toString()
    .split("")
    .map((digit) => (isNaN(Number.parseInt(digit)) ? digit : bengaliNumerals[Number.parseInt(digit)]))
    .join("")
}

// Format date for display in Bengali
const formatDateToBengali = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "অবৈধ তারিখ"

    const day = toBengaliNumber(date.getDate())

    // Bengali month names
    const bengaliMonths = [
      "জানুয়ারি",
      "ফেব্রুয়ারি",
      "মার্চ",
      "এপ্রিল",
      "মে",
      "জুন",
      "জুলাই",
      "আগস্ট",
      "সেপ্টেম্বর",
      "অক্টোবর",
      "নভেম্বর",
      "ডিসেম্বর",
    ]
    const month = bengaliMonths[date.getMonth()]

    const year = toBengaliNumber(date.getFullYear())

    return `${day} ${month}, ${year}`
  } catch (error) {
    console.error("Date formatting error:", error)
    return "অবৈধ তারিখ"
  }
}

export default function DailyClassReportPage() {
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(!isMobile)
  const [expandedFilters, setExpandedFilters] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null)
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const [filters, setFilters] = useState<FilterState>({
    startDate: null,
    endDate: null,
    teacher: "",
    subject: "",
    class: "",
    searchQuery: "",
  })

  // API hooks
  const {
    data: apiResponse,
    isLoading,
    refetch,
  } = useGetAllDailyClassReportsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: filters.searchQuery,
  })

  const [deleteDailyClassReport, { isLoading: isDeleting }] = useDeleteDailyClassReportMutation()

  // Extract reports from API response
  const reports = apiResponse?.data?.reports || []
  const totalReports = apiResponse?.data?.meta?.total || 0
  const totalPages = apiResponse?.data?.meta?.totalPage || 0

  // Get unique values for filter dropdowns from API data
  const uniqueTeachers: string[] = [...new Set((reports as ReportData[]).map((report) => report.teacherName))].sort()

  // Get unique subjects and classes from all report classes
  const allClasses = reports.flatMap((report: any) => report.classes)
  const uniqueSubjects = [...new Set(allClasses.map((cls: any) => cls.subject))].sort()
  const uniqueClasses: string[] = [...new Set(allClasses.map((cls: any) => (typeof cls.class === "string" ? cls.class : "")).filter(Boolean) as string[])].sort((a, b) => {
    return Number.parseInt(a) - Number.parseInt(b)
  })

  // Apply filters when filter state changes
  useEffect(() => {
    // The API query will handle the filtering with searchTerm
    if (filters.searchQuery) {
      setSearchTerm(filters.searchQuery)
    }

    // Reset to first page when filters change
    setPage(0)
  }, [filters])

  const resetFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      teacher: "",
      subject: "",
      class: "",
      searchQuery: "",
    })
    setSearchTerm("")
  }

  const handleFilterChange = (field: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleViewReport = (report: ReportData, classData?: ClassData) => {
    setSelectedReport(report)
    if (classData) {
      setSelectedClass(classData)
    } else if (report.classes.length > 0) {
      setSelectedClass(report.classes[0])
    } else {
      setSelectedClass(null)
    }
  }

  const handleDeleteReport = (report: ReportData) => {
    setSelectedReport(report)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedReport) {
      try {
        await deleteDailyClassReport(selectedReport._id).unwrap()
        setSnackbar({
          open: true,
          message: "রিপোর্ট সফলভাবে মুছে ফেলা হয়েছে",
          severity: "success",
        })
        refetch() // Refresh the data after deletion
      } catch (error) {
        setSnackbar({
          open: true,
          message: "রিপোর্ট মুছতে সমস্যা হয়েছে",
          severity: "error",
        })
      }
    }
    setDeleteDialogOpen(false)
    setSelectedReport(null)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    setSnackbar({
      open: true,
      message: "রিপোর্ট এক্সপোর্ট করা হচ্ছে...",
      severity: "info",
    })

    // Simulate export process
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: "রিপোর্ট সফলভাবে এক্সপোর্ট করা হয়েছে",
        severity: "success",
      })
    }, 1500)
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen)
  }

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen)
  }

  const toggleExpandFilters = () => {
    setExpandedFilters(!expandedFilters)
  }

  // Navigate to edit page
  const handleEditReport = (reportId: string) => {
    router.push(`/dashboard/super_admin/teacher/daily-report/edit/${reportId}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
        {/* Mobile Navigation Drawer */}
        <Drawer
          variant="temporary"
          open={mobileDrawerOpen}
          onClose={toggleMobileDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: 240,
              bgcolor: "#1e293b",
              color: "white",
            },
            "@media print": { display: "none" },
          }}
        >
          <Box sx={{ p: 2, display: "flex", alignItems: "center", borderBottom: "1px solid #334155" }}>
            <SchoolIcon sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              ক্রাফট ইন্সটিটিউট
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <Box component="nav">
              <Box sx={{ mb: 2 }}>
                <Button
                  component={Link}
                  href="/dashboard"
                  startIcon={<DashboardIcon />}
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",
                    color: "white",
                    py: 1,
                  }}
                >
                  ড্যাশবোর্ড
                </Button>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Button
                  component={Link}
                  href="/daily-class-report"
                  startIcon={<AssignmentIcon />}
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",
                    color: "white",
                    py: 1,
                    bgcolor: "rgba(255,255,255,0.1)",
                  }}
                >
                  দৈনিক ক্লাস রিপোর্ট
                </Button>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Button
                  component={Link}
                  href="/settings"
                  startIcon={<SettingsIcon />}
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",
                    color: "white",
                    py: 1,
                  }}
                >
                  সেটিংস
                </Button>
              </Box>
              <Divider sx={{ my: 2, borderColor: "#334155" }} />
              <Box>
                <Button
                  startIcon={<LogoutIcon />}
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",
                    color: "white",
                    py: 1,
                  }}
                >
                  লগআউট
                </Button>
              </Box>
            </Box>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          {/* App Bar */}
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{
              borderBottom: "1px solid #e2e8f0",
              bgcolor: "white",
              "@media print": { display: "none" },
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleMobileDrawer}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <MuiLink
                  component={Link}
                  href="/dashboard"
                  underline="hover"
                  color="inherit"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  ড্যাশবোর্ড
                </MuiLink>
                <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
                  <AssignmentIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  দৈনিক ক্লাস রিপোর্ট
                </Typography>
              </Breadcrumbs>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                component={Link}
                href="/dashboard/super_admin/teacher/daily-report/add"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  boxShadow: "0 4px 6px rgba(79, 70, 229, 0.25)",
                  "&:hover": {
                    boxShadow: "0 6px 8px rgba(79, 70, 229, 0.3)",
                  },
                }}
              >
                নতুন রিপোর্ট
              </Button>
            </Toolbar>
          </AppBar>

          {/* Main Content Container */}
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Page Title and Actions */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", sm: "center" },
                        mb: { xs: 2, sm: 0 },
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="h1"
                        sx={{ fontWeight: 600, color: "#1e293b", mb: { xs: 2, sm: 0 } }}
                      >
                        দৈনিক ক্লাস রিপোর্ট তালিকা
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          variant="outlined"
                          startIcon={<FilterListIcon />}
                          onClick={toggleFilterDrawer}
                          sx={{ display: { xs: "flex", md: "none" } }}
                        >
                          ফিল্টার
                        </Button>
                        <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint}>
                          প্রিন্ট
                        </Button>
                        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport}>
                          এক্সপোর্ট
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Filter Panel */}
              {filterDrawerOpen && (
                <Grid item xs={12} md={3} sx={{ "@media print": { display: "none" } }}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b" }}>
                          ফিল্টার অপশন
                        </Typography>
                        <Box>
                          <IconButton size="small" onClick={toggleExpandFilters}>
                            {expandedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={toggleFilterDrawer}
                            sx={{ display: { xs: "inline-flex", md: "none" } }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      </Box>

                      <Collapse in={expandedFilters}>
                        <Box sx={{ mb: 3 }}>
                          <TextField
                            fullWidth
                            placeholder="সার্চ করুন..."
                            value={filters.searchQuery}
                            onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                            }}
                            sx={{ mb: 3 }}
                          />

                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 1, display: "flex", alignItems: "center" }}
                          >
                            <CalendarMonthIcon fontSize="small" sx={{ mr: 1 }} />
                            তারিখ অনুযায়ী
                          </Typography>

                          <TextField
                            label="শুরুর তারিখ"
                            type="date"
                            fullWidth
                            size="small"
                            value={filters.startDate || ""}
                            onChange={(e) => handleFilterChange("startDate", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{ mb: 2 }}
                          />

                          <TextField
                            label="শেষের তারিখ"
                            type="date"
                            fullWidth
                            size="small"
                            value={filters.endDate || ""}
                            onChange={(e) => handleFilterChange("endDate", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{ mb: 3 }}
                          />

                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 1, display: "flex", alignItems: "center" }}
                          >
                            <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                            শিক্ষক অনুযায়ী
                          </Typography>
                          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                            <InputLabel>শিক্ষক নির্বাচন করুন</InputLabel>
                            <Select
                              value={filters.teacher}
                              label="শিক্ষক নির্বাচন করুন"
                              onChange={(e: SelectChangeEvent) => handleFilterChange("teacher", e.target.value)}
                            >
                              <MenuItem value="">সকল শিক্ষক</MenuItem>
                              {uniqueTeachers.map((teacher) => (
                                <MenuItem key={teacher} value={teacher}>
                                  {teacher}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 1, display: "flex", alignItems: "center" }}
                          >
                            <SchoolIcon fontSize="small" sx={{ mr: 1 }} />
                            বিষয় ও শ্রেণি অনুযায়ী
                          </Typography>
                          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                            <InputLabel>বিষয় নির্বাচন করুন</InputLabel>
                            <Select
                              value={filters.subject}
                              label="বিষয় নির্বাচন করুন"
                              onChange={(e: SelectChangeEvent) => handleFilterChange("subject", e.target.value)}
                            >
                              <MenuItem value="">সকল বিষয়</MenuItem>
                              {uniqueSubjects.map((subject: any, i: number) => (
                                <MenuItem key={i} value={subject}>
                                  {subject}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                            <InputLabel>শ্রেণি নির্বাচন করুন</InputLabel>
                            <Select
                              value={filters.class}
                              label="শ্রেণি নির্বাচন করুন"
                              onChange={(e: SelectChangeEvent) => handleFilterChange("class", e.target.value)}
                            >
                              <MenuItem value="">সকল শ্রেণি</MenuItem>
                              {uniqueClasses.map((classValue) => (
                                <MenuItem key={classValue} value={classValue}>
                                  {classValue}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<RefreshIcon />}
                            onClick={resetFilters}
                            fullWidth
                          >
                            ফিল্টার রিসেট করুন
                          </Button>
                        </Box>
                      </Collapse>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {/* Reports Table */}
              <Grid item xs={12} md={filterDrawerOpen ? 9 : 12}>
                <Card>
                  <CardContent sx={{ p: 0 }}>
                    {isLoading && (
                      <LinearProgress
                        sx={{
                          height: 4,
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                        }}
                      />
                    )}

                    {reports.length === 0 ? (
                      <Box sx={{ p: 4, textAlign: "center" }}>
                        <Typography variant="h6" sx={{ color: "#64748b", mb: 2 }}>
                          কোন রিপো��্ট পাওয়া যায়নি
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#94a3b8", mb: 3 }}>
                          আপনার ফিল্টার পরিবর্তন করুন অথবা নতুন রিপোর্ট তৈরি করুন
                        </Typography>
                        <Button
                          component={Link}
                          href="/dashboard/super_admin/teacher/daily-report/create"
                          variant="contained"
                          startIcon={<AddIcon />}
                        >
                          নতুন রিপোর্ট তৈরি করুন
                        </Button>
                      </Box>
                    ) : (
                      <>
                        <TableContainer sx={{
            overflowX: "auto",  
            WebkitOverflowScrolling: "touch",  
            maxWidth: "100vw"  
          }}>
                          <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                              <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                                <TableCell sx={{ fontWeight: 600 }}>তারিখ</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>শিক্ষক</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>বিষয়</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>শ্রেণি</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>শিখন হার</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>ডায়েরী পূরণ</TableCell>
                                <TableCell sx={{ fontWeight: 600, "@media print": { display: "none" } }}>
                                  অ্যাকশন
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {reports.map((report: any) =>
                                report.classes.map((classData: any, idx: number) => (
                                  <Fade key={`${report._id}-${idx}`} in={true}>
                                    <TableRow
                                      hover
                                      sx={{
                                        "&:nth-of-type(odd)": {
                                          backgroundColor: "#fafafa",
                                        },
                                      }}
                                    >
                                      <TableCell>{formatDateToBengali(report.date)}</TableCell>
                                      <TableCell>{report.teacherName}</TableCell>
                                      <TableCell>{classData.subject}</TableCell>
                                      <TableCell>{classData.class}</TableCell>
                                      <TableCell>
                                        <Chip
                                          label={`${classData.learningPercentage}%`}
                                          size="small"
                                          color={
                                            classData.learningPercentage > 70
                                              ? "success"
                                              : classData.learningPercentage > 40
                                                ? "warning"
                                                : "error"
                                          }
                                          sx={{ fontWeight: 600 }}
                                        />
                                        <Typography variant="caption" sx={{ ml: 1, color: "#64748b" }}>
                                          (মোট {classData.totalStudents} জন)
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Chip
                                          label={classData.diaryCompleted}
                                          size="small"
                                          color={classData.diaryCompleted === "হ্যাঁ" ? "success" : "default"}
                                          variant={classData.diaryCompleted === "হ্যাঁ" ? "filled" : "outlined"}
                                        />
                                      </TableCell>
                                      <TableCell sx={{ "@media print": { display: "none" } }}>
                                        <Box sx={{ display: "flex", gap: 1 }}>
                                          <Tooltip title="বিস্তারিত দেখুন">
                                            <IconButton
                                              size="small"
                                              color="primary"
                                              onClick={() => handleViewReport(report, classData)}
                                            >
                                              <AssignmentIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="সম্পাদনা করুন">
                                            <IconButton
                                              size="small"
                                              color="info"
                                              onClick={() => handleEditReport(report._id)}
                                            >
                                              <EditIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="মুছে ফেলুন">
                                            <IconButton
                                              size="small"
                                              color="error"
                                              onClick={() => handleDeleteReport(report)}
                                            >
                                              <DeleteIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                        </Box>
                                      </TableCell>
                                    </TableRow>
                                  </Fade>
                                )),
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25, 50]}
                          component="div"
                          count={totalReports}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          labelRowsPerPage="প্রতি পৃষ্ঠায় সারি:"
                          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / মোট ${count}`}
                          sx={{ "@media print": { display: "none" } }}
                        />
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Report View Dialog */}
      <Dialog
        open={!!selectedReport && !deleteDialogOpen}
        onClose={() => setSelectedReport(null)}
        maxWidth="md"
        fullWidth
        sx={{ "@media print": { display: "none" } }}
      >
        {selectedReport && selectedClass && (
          <>
            <DialogTitle sx={{ borderBottom: "1px solid #e2e8f0", pb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                দৈনিক ক্লাস রিপোর্ট বিস্তারিত
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDateToBengali(selectedReport.date)}
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ color: "#64748b", mb: 1 }}>
                    শিক্ষকের নাম
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {selectedReport.teacherName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ color: "#64748b", mb: 1 }}>
                    বিষয় ও শ্রেণি
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {selectedClass.subject} (শ্রেণি: {selectedClass.class})
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined" sx={{ bgcolor: "#f0fdf4", borderColor: "#86efac" }}>
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ color: "#15803d", mb: 1 }}>
                        ভাল শিখেছে
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: "#16a34a" }}>
                        {selectedClass.fullyLearned} জন
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined" sx={{ bgcolor: "#fefce8", borderColor: "#fde047" }}>
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ color: "#854d0e", mb: 1 }}>
                        আংশিক শিখেছে
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: "#ca8a04" }}>
                        {selectedClass.partiallyLearned} জন
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined" sx={{ bgcolor: "#fef2f2", borderColor: "#fca5a5" }}>
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ color: "#b91c1c", mb: 1 }}>
                        ভাল শিখেনি
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: "#dc2626" }}>
                        {selectedClass.notLearned} জন
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ color: "#64748b", mb: 1 }}>
                        শিখন হার
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Chip
                          label={`${selectedClass.learningPercentage}%`}
                          color={
                            selectedClass.learningPercentage > 70
                              ? "success"
                              : selectedClass.learningPercentage > 40
                                ? "warning"
                                : "error"
                          }
                          sx={{ fontWeight: 600 }}
                        />
                        <Typography variant="body2" sx={{ ml: 1, color: "#64748b" }}>
                          (মোট {selectedClass.totalStudents} জন)
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ color: "#64748b", mb: 1 }}>
                    পাঠ বিবরণী
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedClass.lessonDetails || "কোন বিবরণ নেই"}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: "#64748b", mb: 1 }}>
                    বাড়ির কাজ
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedClass.homework || "কোন বাড়ির কাজ নেই"}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: "#64748b", mb: 1 }}>
                    ডায়েরী পূরণ
                  </Typography>
                  <Chip
                    label={selectedClass.diaryCompleted}
                    color={selectedClass.diaryCompleted === "হ্যাঁ" ? "success" : "default"}
                    variant={selectedClass.diaryCompleted === "হ্যাঁ" ? "filled" : "outlined"}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ borderTop: "1px solid #e2e8f0", p: 2 }}>
              <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint}>
                প্রিন্ট করুন
              </Button>
              <Button
                variant="outlined"
                color="info"
                startIcon={<EditIcon />}
                onClick={() => handleEditReport(selectedReport._id)}
              >
                সম্পাদনা করুন
              </Button>
              <Button variant="contained" onClick={() => setSelectedReport(null)}>
                বন্ধ করুন
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        sx={{ "@media print": { display: "none" } }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            রিপোর্ট মুছে ফেলার নিশ্চিতকরণ
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            আপনি কি নিশ্চিত যে আপনি এই রিপোর্টটি মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>বাতিল করুন</Button>
          <Button variant="contained" color="error" onClick={confirmDelete} disabled={isDeleting}>
            {isDeleting ? "মুছে ফেলা হচ্ছে..." : "মুছে ফেলুন"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ "@media print": { display: "none" } }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}
