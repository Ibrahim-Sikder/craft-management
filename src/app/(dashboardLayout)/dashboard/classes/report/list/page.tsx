/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"

import { useState, useMemo, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  MenuItem,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Fade,
  alpha,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
  ThemeProvider,
  Switch,
  FormControlLabel,
  Badge,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Person as PersonIcon,
  Book as BookIcon,
  Class as ClassIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  DateRange,
  Download,
  Comment as CommentIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material"
import DrawIcon from "@mui/icons-material/Draw"
import BlockIcon from "@mui/icons-material/Block"
import { format } from "date-fns"
import { customTheme } from "@/ThemeStyle"
import { useDeleteClassReportMutation, useGetAllClassReportsQuery } from "@/redux/api/classReportApi"
import { useGetAllClassesQuery } from "@/redux/api/classApi"
import { useGetAllSubjectsQuery } from "@/redux/api/subjectApi"
import { useGetAllTeachersQuery } from "@/redux/api/teacherApi"
import ClassReportDetailsModal from "../_components/ClassReportDetailsModal"
import toast from "react-hot-toast"
import DateRangePicker from "../new/_components/DateRangePicker"
import Link from "next/link"
import { DateRangeIcon } from "@mui/x-date-pickers"
import Loader from "@/app/loading"

type Filters = {
  classes: string
  subjects: string
  teachers: string
  date: string
  hour: string
  lessonEvaluation: string
  handwriting: string
  startDate: string
  endDate: string
  hasComments: boolean // NEW: Comments filter
}

interface IDateRange {
  startDate: Date | null
  endDate: Date | null
}

export default function ClassReportList() {
  // State - Fixed pagination state management
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<Filters>({
    classes: "",
    subjects: "",
    teachers: "",
    date: "",
    hour: "",
    lessonEvaluation: "",
    handwriting: "",
    startDate: "",
    endDate: "",
    hasComments: false, // NEW: Initialize comments filter
  })

  const [orderBy, setOrderBy] = useState<string>("createdAt")
  const [order, setOrder] = useState<"asc" | "desc">("desc")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedReport, setSelectedReport] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [expandedReport, setExpandedReport] = useState<string | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedReportDetails, setSelectedReportDetails] = useState<any | null>(null)

  // Date Range Picker State
  const [dateRangePickerOpen, setDateRangePickerOpen] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState<IDateRange>({
    startDate: null,
    endDate: null,
  })

  const [deleteClassReport] = useDeleteClassReportMutation()

  // API queries - Updated to include hasComments filter
  const {
    data: classReport,
    isLoading,
    refetch,
  } = useGetAllClassReportsQuery(
    {
      limit: rowsPerPage,
      page: page,
      searchTerm: searchTerm,
      className: filters.classes,
      subject: filters.subjects,
      teacher: filters.teachers,
      date: filters.date,
      hour: filters.hour,
      lessonEvaluation: filters.lessonEvaluation,
      handwriting: filters.handwriting,
      startDate: filters.startDate,
      endDate: filters.endDate,
      hasComments: filters.hasComments, // NEW: Include comments filter
    },
    {
      refetchOnMountOrArgChange: true,
    },
  )

  const { data: classData } = useGetAllClassesQuery({
    limit: 100,
    page: 1,
    searchTerm: "",
  })

  const { data: subjectData } = useGetAllSubjectsQuery({
    limit: 100,
    page: 1,
    searchTerm: "",
  })

  const { data: teacherData } = useGetAllTeachersQuery({
    limit: 100,
    page: 1,
    searchTerm: "",
  })

  useEffect(() => {
    refetch()
  }, [filters, searchTerm, page, rowsPerPage, refetch])

  const theme = customTheme
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true })

  const reports = useMemo(() => {
    return classReport?.data?.reports || []
  }, [classReport])

  const totalCount = classReport?.data?.meta?.total || 0
  const totalPages = Math.ceil(totalCount / rowsPerPage)

  // NEW: Get comments statistics from API response
  const commentsStats = classReport?.data?.meta?.commentsStats || {
    totalComments: 0,
    reportsWithComments: 0,
    studentsWithComments: 0,
  }

  console.log("Pagination Debug:", {
    currentPage: page,
    totalPages: totalPages,
    totalCount: totalCount,
    reportsOnCurrentPage: reports.length,
    limit: rowsPerPage,
    hasNextPage: classReport?.data?.meta?.hasNextPage,
    hasPrevPage: classReport?.data?.meta?.hasPrevPage,
    commentsFilter: filters.hasComments,
    commentsStats: commentsStats,
  })

  const classOptions = useMemo(() => {
    return (
      classData?.data?.classes?.map((cls: any) => ({
        label: cls.className,
        value: cls.className,
      })) || []
    )
  }, [classData])

  const subjectOptions = useMemo(() => {
    if (!subjectData?.data?.subjects) return []
    return subjectData.data.subjects.map((sub: any) => ({
      label: sub.name,
      value: sub.name,
    }))
  }, [subjectData])

  const teacherOptions = useMemo(() => {
    if (!teacherData?.data) return []
    return teacherData.data?.map((teacher: any) => ({
      label: teacher.name,
      value: teacher.name,
    }))
  }, [teacherData])

  const hourOptions = ["১ম", "২য়", "৩য়", "৪র্থ", "৫ম", "৬ষ্ঠ", "৭ম", "৮ম"]
  const lessonEvaluationOptions = ["পড়া শিখেছে", "আংশিক শিখেছে", "পড়া শিখেনি", "অনুপস্থিত"]
  const handleWrittenOptions = ["লিখেছে", "আংশিক লিখেছে", "লিখেনি", "কাজ নেই"]

  // Date Range Picker Handlers
  const handleDateRangePickerOpen = () => {
    setDateRangePickerOpen(true)
  }

  const handleDateRangePickerClose = () => {
    setDateRangePickerOpen(false)
  }

  const handleDateRangeApply = (range: IDateRange) => {
    setSelectedDateRange(range)
    setFilters((prev) => ({
      ...prev,
      startDate: range.startDate ? format(range.startDate, "yyyy-MM-dd") : "",
      endDate: range.endDate ? format(range.endDate, "yyyy-MM-dd") : "",
    }))

    if (range.startDate && range.endDate) {
      toast.success(
        `Date range applied: ${format(range.startDate, "dd MMM yyyy")} - ${format(range.endDate, "dd MMM yyyy")}`,
      )
    }

    setPage(1)
    refetch()
  }

  const handleClearDateRange = () => {
    setSelectedDateRange({ startDate: null, endDate: null })
    setFilters((prev) => ({
      ...prev,
      startDate: "",
      endDate: "",
    }))
    toast.success("Date range filter cleared")
    setPage(1)
    refetch()
  }

  const formatDateRangeDisplay = () => {
    if (!selectedDateRange.startDate || !selectedDateRange.endDate) {
      return "Select date range"
    }
    return `${format(selectedDateRange.startDate, "dd MMM yyyy")} - ${format(selectedDateRange.endDate, "dd MMM yyyy")}`
  }

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
    refetch()
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    console.log("Changing to page:", newPage)
    setPage(newPage)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(1)
  }

  const handleFilterChange = (filterName: keyof Filters, value: string | boolean) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
    setPage(1)
    refetch()
  }

  // NEW: Handle comments filter toggle
  const handleCommentsFilterToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setFilters((prev) => ({
      ...prev,
      hasComments: isChecked,
    }))
    setPage(1)

    if (isChecked) {
      toast.success(`Showing only records with comments (${commentsStats.totalComments} total)`)
    } else {
      toast.success("Comments filter cleared - showing all records")
    }

    refetch()
  }

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>, report: any) => {
    event.stopPropagation()
    setSelectedReport(report)
    setDeleteDialogOpen(true)
    setAnchorEl(null)
  }

  const handleDeleteConfirm = async () => {
    if (selectedReport) {
      try {
        await deleteClassReport(selectedReport._id).unwrap()

        setDeleteDialogOpen(false)
        setSelectedReport(null)
        refetch()
      } catch (error) {
        console.error("Error deleting class report:", error)
      }
    }
    setDeleteDialogOpen(false)
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
  }

  const handleClearFilters = () => {
    setFilters({
      classes: "",
      subjects: "",
      teachers: "",
      date: "",
      hour: "",
      lessonEvaluation: "",
      handwriting: "",
      startDate: "",
      endDate: "",
      hasComments: false, // NEW: Reset comments filter
    })
    setSelectedDateRange({ startDate: null, endDate: null })
    setSearchTerm("")
    setPage(1)
    refetch()
  }

  const handleOpenDetailsModal = (e: React.MouseEvent, report: any, evaluation: any) => {
    e.stopPropagation()
    setSelectedReportDetails({
      reportData: report,
      studentEvaluation: evaluation,
    })
    setDetailsModalOpen(true)
  }

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false)
    setSelectedReportDetails(null)
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy")
    } catch (error) {
      return "Invalid Date"
    }
  }

  const filteredReports = useMemo(() => {
    const filtered = [...reports]
    return filtered
  }, [reports])

  const sortedReports = useMemo(() => {
    return [...filteredReports].sort((a, b) => {
      if (orderBy === "date") {
        return order === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (orderBy === "classes") {
        const classA = a.classes || ""
        const classB = b.classes || ""
        return order === "asc" ? classA.localeCompare(classB) : classB.localeCompare(classA)
      } else if (orderBy === "subjects") {
        const subjectA = a.subjects || ""
        const subjectB = b.subjects || ""
        return order === "asc" ? subjectA.localeCompare(subjectB) : subjectB.localeCompare(subjectA)
      } else {
        return order === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })
  }, [filteredReports, orderBy, order])

const cardStyle = {
  width: '100%',
  borderRadius: 3,
  background:
    selectedDateRange.startDate || selectedDateRange.endDate
      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(
          theme.palette.secondary.main,
          0.05,
        )} 100%)`
      : "background.paper",
  border:
    selectedDateRange.startDate || selectedDateRange.endDate
      ? `2px solid ${alpha(theme.palette.primary.main, 0.3)}`
      : "1px solid rgba(0, 0, 0, 0.12)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
    transform: "translateY(-2px)",
  },
}


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", borderRadius: 2 }}>
        <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2, p: { xs: 1, md: "8px" } }}>
          <Fade in={true} timeout={800}>
            <div>
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4 pt-4">
                <h1 className="text-2xl font-bold text-gray-900">Class Reports</h1>
                <div className="flex gap-4">
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                    sx={{ borderRadius: 2 }}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link}
                    href="/dashboard/classes/report/new"
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                    }}
                  >
                    Add New Report
                  </Button>
                </div>
              </div>

              {/* Enhanced Pagination Info with Comments Stats */}
              <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Showing {reports.length} reports with student evaluations (Page {page} of {totalPages})
                </Typography>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Typography variant="body2" color="secondary.main" fontWeight={600}>
                    Total Reports: {totalCount}
                  </Typography>
                  <Typography variant="body2" color="primary.main" fontWeight={600}>
                    Limit: {rowsPerPage} per page
                  </Typography>
                  {/* NEW: Comments Statistics Display */}
                  <Badge badgeContent={commentsStats.totalComments} color="warning" max={999}>
                    <Chip
                      icon={<CommentIcon />}
                      label={`${commentsStats.reportsWithComments} Reports with Comments`}
                      size="small"
                      color="warning"
                      variant="outlined"
                    />
                  </Badge>
                </Box>
              </Box>

              {/* Filter Cards */}
              <Box sx={{ mb: 4 }}>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-[6px]">
                  {/* Class Filter */}
                  <Grid item xs={12} sm={6} md={1}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <ClassIcon sx={{ color: "primary.main", mr: 1 }} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Class
                          </Typography>
                        </Box>
                        <FormControl fullWidth size="small">
                          <InputLabel id="class-filter-label">Select Class</InputLabel>
                          <Select
                            labelId="class-filter-label"
                            id="class-filter"
                            value={filters.classes}
                            label="Select Class"
                            onChange={(e: SelectChangeEvent) => handleFilterChange("classes", e.target.value)}
                          >
                            <MenuItem value="">All Classes</MenuItem>
                            {classOptions?.length > 0 &&
                              classOptions.map((option: any) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Subject Filter */}
                  <Grid item xs={12} sm={6} md={2}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <BookIcon sx={{ color: "primary.main", mr: 1 }} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Subject
                          </Typography>
                        </Box>
                        <FormControl fullWidth size="small">
                          <InputLabel id="subject-filter-label">Select Subject</InputLabel>
                          <Select
                            labelId="subject-filter-label"
                            id="subject-filter"
                            value={filters.subjects}
                            label="Select Subject"
                            onChange={(e: SelectChangeEvent) => handleFilterChange("subjects", e.target.value)}
                          >
                            <MenuItem value="">All Subjects</MenuItem>
                            {subjectOptions?.length > 0 &&
                              subjectOptions.map((option: any) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Teacher Filter */}
                  <Grid item xs={12} sm={6} md={2}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <PersonIcon sx={{ color: "primary.main", mr: 1 }} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Teacher
                          </Typography>
                        </Box>
                        <FormControl fullWidth size="small">
                          <InputLabel id="teacher-filter-label">Select Teacher</InputLabel>
                          <Select
                            labelId="teacher-filter-label"
                            id="teacher-filter"
                            value={filters.teachers}
                            label="Select Teacher"
                            onChange={(e: SelectChangeEvent) => handleFilterChange("teachers", e.target.value)}
                          >
                            <MenuItem value="">All Teachers</MenuItem>
                            {teacherOptions?.length > 0 &&
                              teacherOptions.map((option: any) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Hour Filter */}
                  <Grid item xs={12} sm={6} md={1}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <AccessTimeIcon sx={{ color: "primary.main", mr: 1 }} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Hour
                          </Typography>
                        </Box>
                        <FormControl fullWidth size="small">
                          <InputLabel id="hour-filter-label">Select Hour</InputLabel>
                          <Select
                            labelId="hour-filter-label"
                            id="hour-filter"
                            value={filters.hour}
                            label="Select Hour"
                            onChange={(e: SelectChangeEvent) => handleFilterChange("hour", e.target.value)}
                          >
                            <MenuItem value="">All Hours</MenuItem>
                            {hourOptions.map((hour) => (
                              <MenuItem key={hour} value={hour}>
                                {hour}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Lesson Evaluation Filter */}
                  <Grid item xs={12} sm={6} md={2}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <AccessTimeIcon sx={{ color: "primary.main", mr: 1 }} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Lesson
                          </Typography>
                        </Box>
                        <FormControl fullWidth size="small">
                          <InputLabel id="lesson-evaluation-filter-label">Select Option</InputLabel>
                          <Select
                            labelId="lesson-evaluation-filter-label"
                            id="lesson-evaluation-filter"
                            value={filters.lessonEvaluation}
                            label="Select Option"
                            onChange={(e: SelectChangeEvent) => handleFilterChange("lessonEvaluation", e.target.value)}
                          >
                            <MenuItem value="">All Options</MenuItem>
                            {lessonEvaluationOptions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Handwriting Filter */}
                  <Grid item xs={12} sm={6} md={2}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <AccessTimeIcon sx={{ color: "primary.main", mr: 1 }} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Hand Written
                          </Typography>
                        </Box>
                        <FormControl fullWidth size="small">
                          <InputLabel id="handwriting-filter-label">Select Option</InputLabel>
                          <Select
                            labelId="handwriting-filter-label"
                            id="handwriting-filter"
                            value={filters.handwriting}
                            label="Select Option"
                            onChange={(e: SelectChangeEvent) => handleFilterChange("handwriting", e.target.value)}
                          >
                            <MenuItem value="">All Options</MenuItem>
                            {handleWrittenOptions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Enhanced Date Range Filter */}
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Card variant="outlined" sx={cardStyle}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <DateRangeIcon sx={{ color: "primary.main", mr: 1 }} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Date
                          </Typography>
                        </Box>
                        <Button
                          variant="outlined"
                          startIcon={<DateRange />}
                          onClick={handleDateRangePickerOpen}
                          fullWidth
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            justifyContent: "flex-start",
                            color: selectedDateRange.startDate ? "primary.main" : "text.secondary",
                            borderColor: selectedDateRange.startDate ? "primary.main" : "rgba(0, 0, 0, 0.23)",
                            fontSize: "0.875rem",
                            py: 1.5,
                            "&:hover": {
                              transform: "translateY(-1px)",
                              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          {formatDateRangeDisplay()}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Comments Filter */}
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Card variant="outlined" sx={cardStyle}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <CommentIcon sx={{ color: "warning.main", mr: 1 }} />
                          <Typography variant="subtitle1" fontWeight={600}>Comments</Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={filters.hasComments}
                                onChange={handleCommentsFilterToggle}
                                color="warning"
                                size="small"
                              />
                            }
                            label={
                              <Typography variant="body2" fontWeight={500}>
                                {filters.hasComments ? "Show Only Comments" : "Show All Records"}
                              </Typography>
                            }
                          />
                          {/* <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Total Comments: {commentsStats.totalComments}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Reports: {commentsStats.reportsWithComments}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Students: {commentsStats.studentsWithComments}
                            </Typography>
                          </Box> */}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </div>

                {/* Search and Actions */}
                <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <TextField
                    placeholder="Search by Student Name or Comments..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    size="small"
                    sx={{ flexGrow: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleClearFilters}
                    sx={{
                      borderColor: "rgba(0, 0, 0, 0.12)",
                      color: "text.secondary",
                    }}
                    startIcon={<FilterListIcon />}
                  >
                    Clear All Filters
                  </Button>
                  {!isMobile && (
                    <>
                      <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<DownloadIcon />}
                        sx={{
                          borderColor: "rgba(0, 0, 0, 0.12)",
                          color: "text.secondary",
                        }}
                      >
                        Export
                      </Button>
                      <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<PrintIcon />}
                        sx={{
                          borderColor: "rgba(0, 0, 0, 0.12)",
                          color: "text.secondary",
                        }}
                      >
                        Print
                      </Button>
                    </>
                  )}
                </Box>
              </Box>

              <Paper elevation={0} sx={{ mb: 4, overflow: "hidden" }}>
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    <div className="max-[320px]:block max-[320px]:w-[250px] max-[375px]:block max-[375px]:w-[300px] max-[425px]:block max-[425px]:w-[380px] max-[800px]:border max-[800px]:border-gray-300 max-[800px]:rounded   max-[800px]:block max-[800px]:max-w-[100vw] max-[800px]:relative max-[800px]:whitespace-nowrap max-[800px]:overflow-x-auto">
                      <Table
                        sx={{
                          minWidth: 900,
                          "@media (min-width: 900px)": {
                            width: "100%",
                            minWidth: "100%",
                            tableLayout: { sm: "auto", md: "fixed", lg: "fixed" },
                            px: 10,
                          },
                        }}
                      >
                        <TableHead>
                          <TableRow
                            sx={{
                              backgroundColor: alpha(theme.palette.primary.main, 0.05),
                              "& th": {
                                fontWeight: 600,
                                color: theme.palette.primary.main,
                                borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                py: 2,
                              },
                            }}
                          >
                            <TableCell width="6%">
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  color: orderBy === "date" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("date")}
                              >
                                Date
                                {orderBy === "date" && (
                                  <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
                                    {order === "asc" ? (
                                      <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                      <ArrowDownwardIcon fontSize="small" />
                                    )}
                                  </Box>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>Student Name</TableCell>
                            <TableCell width="5%">
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  color: orderBy === "classes" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("classes")}
                              >
                                Class
                                {orderBy === "classes" && (
                                  <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
                                    {order === "asc" ? (
                                      <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                      <ArrowDownwardIcon fontSize="small" />
                                    )}
                                  </Box>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell width="10%">Subject</TableCell>
                            <TableCell width="10%">Teacher</TableCell>
                            <TableCell width="4%">Hour</TableCell>
                            <TableCell width="8%">Attendance</TableCell>
                            <TableCell width="9%">Lesson</TableCell>
                            <TableCell width="8%">Homework</TableCell>
                            <TableCell width="6%">Signature</TableCell>
                            <TableCell width="10%">Comments</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {sortedReports.length > 0 ? (
                            sortedReports.map((report: any) => {
                              const isExpanded = expandedReport === report._id

                              return (
                                <React.Fragment key={report._id}>
                                  {report.studentEvaluations?.map((evaluation: any, index: number) => {
                                    const student = evaluation.studentId
                                    const isAbsent = evaluation?.attendance === "অনুপস্থিত"
                                    const hasComment = evaluation?.comments && evaluation.comments.trim() !== ""

                                    return (
                                      <TableRow
                                        key={`${report._id}-${index}`}
                                        sx={{
                                          transition: "all 0.2s",
                                          bgcolor: isExpanded ? alpha(theme.palette.primary.main, 0.05) : "inherit",
                                          "&:hover": {
                                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                                          },
                                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                                          "&:last-child td": {
                                            borderBottom: 0,
                                          },
                                          // Enhanced styling for rows with comments
                                          ...(hasComment && {
                                            background: `linear-gradient(90deg, ${alpha(
                                              theme.palette.warning.light,
                                              0.08,
                                            )} 0%, ${alpha(theme.palette.background.paper, 0.3)} 100%)`,
                                            borderLeft: `3px solid ${theme.palette.warning.main}`,
                                            "&:hover": {
                                              background: `linear-gradient(90deg, ${alpha(
                                                theme.palette.warning.light,
                                                0.12,
                                              )} 0%, ${alpha(theme.palette.background.paper, 0.4)} 100%)`,
                                            },
                                          }),
                                          ...(isAbsent && {
                                            opacity: 0.5,
                                            pointerEvents: "none",
                                            bgcolor: alpha(theme.palette.grey[300], 0.4),
                                            "&:hover": {
                                              bgcolor: alpha(theme.palette.grey[300], 0.4),
                                            },
                                          }),
                                        }}
                                      >
                                        <TableCell sx={{ py: 1.5 }}>
                                          <Typography variant="body2" fontWeight={500}>
                                            {report.date ? formatDate(report.date) : "N/A"}
                                          </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 1.5 }}>
                                          <Typography
                                            variant="body2"
                                            fontWeight={500}
                                            sx={{ color: theme.palette.text.primary }}
                                          >
                                            {student?.name || "Not available"}
                                          </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 1.5 }}>
                                          <Box
                                            sx={{
                                              display: "inline-flex",
                                              bgcolor: alpha(theme.palette.primary.main, 0.08),
                                              color: theme.palette.primary.main,
                                              px: 1.5,
                                              py: 0.5,
                                              borderRadius: 1,
                                              fontWeight: 600,
                                              fontSize: "0.8125rem",
                                            }}
                                          >
                                            {report.classes}
                                          </Box>
                                        </TableCell>
                                        <TableCell sx={{ py: 1.5 }}>
                                          <Chip
                                            label={report?.subjects}
                                            size="small"
                                            sx={{
                                              bgcolor: alpha(theme.palette.secondary.main, 0.08),
                                              color: theme.palette.secondary.main,
                                              fontWeight: 500,
                                              borderRadius: 1,
                                              "& .MuiChip-label": { px: 1 },
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell sx={{ py: 1.5 }}>
                                          <Typography variant="body2" fontWeight={500}>
                                            {report?.teachers || "Not assigned"}
                                          </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 1.5 }}>
                                          <Box
                                            sx={{
                                              display: "inline-flex",
                                              bgcolor: alpha(theme.palette.info.main, 0.08),
                                              color: theme.palette.info.main,
                                              px: 1.5,
                                              py: 0.5,
                                              borderRadius: 1,
                                              fontWeight: 500,
                                              fontSize: "0.8125rem",
                                            }}
                                          >
                                            {report.hour || "N/A"}
                                          </Box>
                                        </TableCell>
                                        <TableCell>
                                          <Chip
                                            icon={
                                              evaluation?.attendance?.toLowerCase() === "উপস্থিত" ? (
                                                <CheckCircleIcon color="success" />
                                              ) : (
                                                <CancelIcon sx={{ color: "error.main" }} />
                                              )
                                            }
                                            label={evaluation?.attendance || "Not Marked"}
                                            color={
                                              evaluation?.attendance?.toLowerCase() === "উপস্থিত" ? "success" : "error"
                                            }
                                            size="small"
                                            sx={{
                                              fontWeight: 500,
                                              bgcolor:
                                                evaluation?.attendance?.toLowerCase() === "উপস্থিত"
                                                  ? alpha(theme.palette.success.main, 0.1)
                                                  : alpha(theme.palette.error.main, 0.1),
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Chip
                                            icon={
                                              evaluation?.lessonEvaluation &&
                                                evaluation?.lessonEvaluation !== "পড়া শিখেনি" ? (
                                                <CheckCircleIcon sx={{ color: "#651FFF" }} />
                                              ) : (
                                                <CancelIcon sx={{ color: "#FF1744" }} />
                                              )
                                            }
                                            label={evaluation?.lessonEvaluation || "Not Done"}
                                            size="small"
                                            sx={{
                                              fontWeight: 500,
                                              color:
                                                evaluation?.lessonEvaluation &&
                                                  evaluation?.lessonEvaluation !== "পড়া শিখেনি"
                                                  ? "#651FFF"
                                                  : "#FF1744",
                                              bgcolor:
                                                evaluation?.lessonEvaluation &&
                                                  evaluation?.lessonEvaluation !== "পড়া শিখেনি"
                                                  ? "#EDE7F6"
                                                  : "#FFEBEE",
                                              border: `1px solid ${evaluation?.lessonEvaluation &&
                                                evaluation?.lessonEvaluation !== "পড়া শিখেনি"
                                                ? "#651FFF"
                                                : "#FF1744"
                                                }`,
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Chip
                                            icon={
                                              evaluation?.handwriting && evaluation?.handwriting !== "লিখেনি" ? (
                                                <DrawIcon sx={{ color: "#00BFA6" }} />
                                              ) : (
                                                <BlockIcon sx={{ color: "#FF1744" }} />
                                              )
                                            }
                                            label={evaluation?.handwriting || "Not Submitted"}
                                            size="small"
                                            sx={{
                                              fontWeight: 500,
                                              color:
                                                evaluation?.handwriting && evaluation?.handwriting !== "লিখেনি"
                                                  ? "#00BFA6"
                                                  : "#FF1744",
                                              bgcolor:
                                                evaluation?.handwriting && evaluation?.handwriting !== "লিখেনি"
                                                  ? "#E0F7FA"
                                                  : "#FFEBEE",
                                              border: `1px solid ${evaluation?.handwriting && evaluation?.handwriting !== "লিখেনি"
                                                ? "#00BFA6"
                                                : "#FF1744"
                                                }`,
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell align="center">
                                          {evaluation?.parentSignature && evaluation?.parentSignature !== "" ? (
                                            <CheckCircleIcon color="success" />
                                          ) : (
                                            <CancelIcon color="error" />
                                          )}
                                        </TableCell>
                                        <TableCell sx={{ py: 1.5 }}>
                                          {/* Enhanced Comments Display */}
                                          {hasComment ? (
                                            <Box
                                              sx={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                bgcolor: alpha(theme.palette.warning.main, 0.08),
                                                color: theme.palette.warning.main,
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: 1,
                                                fontWeight: 600,
                                                fontSize: "0.8125rem",
                                                maxWidth: 200,
                                                border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                                              }}
                                            >
                                              <CommentIcon sx={{ fontSize: 14, mr: 0.5 }} />
                                              <Typography
                                                variant="caption"
                                                sx={{
                                                  overflow: "hidden",
                                                  textOverflow: "ellipsis",
                                                  whiteSpace: "nowrap",
                                                  maxWidth: 150,
                                                }}
                                                title={evaluation.comments}
                                              >
                                                {evaluation.comments}
                                              </Typography>
                                            </Box>
                                          ) : (
                                            <Typography variant="caption" color="text.secondary">
                                              No comments
                                            </Typography>
                                          )}
                                        </TableCell>
                                        <TableCell>
                                          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                            {!isMobile && (
                                              <>
                                                <a
                                                  className="editIconWrap edit2"
                                                  href={`${process.env.NEXT_PUBLIC_BASE_API_URL}/class-report/classreport/${report._id}`}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                >
                                                  <Download />
                                                </a>
                                                <Tooltip title="View Details">
                                                  <IconButton
                                                    size="small"
                                                    onClick={(e) => handleOpenDetailsModal(e, report, evaluation)}
                                                  >
                                                    <VisibilityIcon fontSize="small" />
                                                  </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit Report">
                                                  <IconButton
                                                    size="small"
                                                    component={Link}
                                                    href={`/dashboard/classes/report/list/${report._id}`}
                                                    sx={{
                                                      color: "warning.main",
                                                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                                                      mr: 1,
                                                      "&:hover": {
                                                        bgcolor: alpha(theme.palette.warning.main, 0.2),
                                                        transform: "translateY(-2px)",
                                                        boxShadow: `0 4px 8px ${alpha(
                                                          theme.palette.warning.main,
                                                          0.2,
                                                        )}`,
                                                      },
                                                      transition: "all 0.2s",
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                  >
                                                    <EditIcon fontSize="small" />
                                                  </IconButton>
                                                </Tooltip>
                                              </>
                                            )}
                                            <Tooltip title="Delete Report">
                                              <IconButton
                                                size="small"
                                                sx={{
                                                  color: "error.main",
                                                  bgcolor: alpha(theme.palette.error.main, 0.1),
                                                  "&:hover": {
                                                    bgcolor: alpha(theme.palette.error.main, 0.2),
                                                    transform: "translateY(-2px)",
                                                    boxShadow: `0 4px 8px ${alpha(theme.palette.error.main, 0.2)}`,
                                                  },
                                                  transition: "all 0.2s",
                                                }}
                                                onClick={(e) => handleDeleteClick(e, report)}
                                              >
                                                <DeleteIcon fontSize="small" />
                                              </IconButton>
                                            </Tooltip>
                                          </Box>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </React.Fragment>
                              )
                            })
                          ) : (
                            <TableRow>
                              <TableCell colSpan={12} align="center" sx={{ py: 8 }}>
                                <Box
                                  sx={{
                                    textAlign: "center",
                                    p: 4,
                                    borderRadius: 2,
                                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                                    border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                                  }}
                                >
                                  {filters.hasComments ? (
                                    <>
                                      <CommentIcon
                                        sx={{ fontSize: 64, color: alpha(theme.palette.warning.main, 0.3), mb: 2 }}
                                      />
                                      <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{ fontWeight: 600, color: theme.palette.warning.main }}
                                      >
                                        No reports with comments found
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ maxWidth: 400, mx: "auto", mb: 2 }}
                                      >
                                        Try adjusting your search or other filters, or turn off the comments filter to
                                        see all records.
                                      </Typography>
                                    </>
                                  ) : (
                                    <>
                                      <SearchIcon
                                        sx={{ fontSize: 64, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }}
                                      />
                                      <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{ fontWeight: 600, color: theme.palette.primary.main }}
                                      >
                                        No class reports found
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ maxWidth: 400, mx: "auto", mb: 2 }}
                                      >
                                        Try adjusting your search or filter to find what you&apos;re looking for.
                                      </Typography>
                                    </>
                                  )}
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleClearFilters}
                                    startIcon={<RefreshIcon />}
                                    sx={{ mt: 1 }}
                                  >
                                    Clear Filters
                                  </Button>
                                </Box>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Updated Pagination Component */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 3,
                        px: 2,
                        borderTop: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                        bgcolor: alpha(theme.palette.secondary.main, 0.02),
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, totalCount)} of{" "}
                        {totalCount} entries
                        {filters.hasComments && (
                          <Chip
                            size="small"
                            icon={<CommentIcon />}
                            label="Comments Only"
                            color="warning"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Typography>

                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                        color="secondary"
                        size="large"
                        showFirstButton
                        showLastButton
                        sx={{
                          "& .MuiPaginationItem-root": {
                            fontWeight: 500,
                            border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                            "&:hover": {
                              bgcolor: alpha(theme.palette.secondary.main, 0.08),
                              transform: "translateY(-1px)",
                              boxShadow: `0 2px 8px ${alpha(theme.palette.secondary.main, 0.15)}`,
                            },
                            transition: "all 0.2s ease",
                          },
                          "& .Mui-selected": {
                            fontWeight: 600,
                            bgcolor: `${theme.palette.secondary.main} !important`,
                            color: "white",
                            "&:hover": {
                              bgcolor: `${theme.palette.secondary.dark} !important`,
                            },
                          },
                        }}
                      />
                    </Box>
                  </>
                )}
              </Paper>
            </div>
          </Fade>
        </Container>
      </Box>

      {/* Date Range Picker Dialog */}
      {typeof window !== "undefined" && (
        <DateRangePicker
          open={dateRangePickerOpen}
          onClose={handleDateRangePickerClose}
          onApply={handleDateRangeApply}
          initialRange={selectedDateRange}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: 3,
            width: "100%",
            maxWidth: 480,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Delete Class Report
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this class report? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="inherit"
            sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error" sx={{ ml: 2 }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Details Modal */}
      <ClassReportDetailsModal
        open={detailsModalOpen}
        onClose={handleCloseDetailsModal}
        data={{
          reportData: selectedReportDetails?.reportData,
          studentEvaluation: selectedReportDetails?.studentEvaluation,
        }}
      />
    </ThemeProvider>
  )
}
