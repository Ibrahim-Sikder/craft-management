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
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Menu,
  MenuItem,
  Divider,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Skeleton,
  Fade,
  alpha,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
  ThemeProvider,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Person as PersonIcon,
  Book as BookIcon,
  Class as ClassIcon,
  CalendarMonth as CalendarIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material"
import DrawIcon from "@mui/icons-material/Draw";
import BlockIcon from "@mui/icons-material/Block";
import Link from "next/link"
import { format } from "date-fns"
import { customTheme } from "@/ThemeStyle"
import { useDeleteClassReportMutation, useGetAllClassReportsQuery } from "@/redux/api/classReportApi"
import { useGetAllClassesQuery } from "@/redux/api/classApi"
import { useGetAllSubjectsQuery } from "@/redux/api/subjectApi"
import { useGetAllTeachersQuery } from "@/redux/api/teacherApi"
import { Filters } from "@/interface"

export default function ClassReportList() {
  // State
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    class: "",
    subject: "",
    teacher: "",
    date: "",
    hour: "",
  })
  console.log(filters)
  const [orderBy, setOrderBy] = useState<string>("createdAt")
  const [order, setOrder] = useState<"asc" | "desc">("desc")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedReport, setSelectedReport] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [expandedReport, setExpandedReport] = useState<string | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedReportDetails, setSelectedReportDetails] = useState<any | null>(null)
const [deleteClassReport] = useDeleteClassReportMutation()
  // API queries
  const {
    data: classReport,
    isLoading,
    refetch,
  } = useGetAllClassReportsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
    class: filters.class,      
    subject: filters.subject,   
    teacher: filters.teacher,  
    date: filters.date,
    hour: filters.hour,
  }, {
    // Re-fetch when filters or search term changes
    refetchOnMountOrArgChange: true
  })

  const { data: classData } = useGetAllClassesQuery({
    limit: 100, // Increased to fetch more classes
    page: 1,
    searchTerm: "",
  })

  const { data: subjectData } = useGetAllSubjectsQuery({
    limit: 100, // Increased to fetch more subjects
    page: 1,
    searchTerm: "",
  })

  const { data: teacherData } = useGetAllTeachersQuery({
    limit: 100, // Increased to fetch more teachers
    page: 1,
    searchTerm: "",
  })

  // Effect to refetch data when filters change
  useEffect(() => {
    refetch();
  }, [filters, searchTerm, page, rowsPerPage, refetch]);

  const theme = customTheme
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Extract reports from API response
  const reports = useMemo(() => {
    return classReport?.data?.reports || []
  }, [classReport])

  // Total count for pagination
  const totalCount = classReport?.data?.meta?.total || 0

  // Update your filter options to use proper IDs
  const classOptions = useMemo(() => {
    return classData?.data?.classes?.map((cls: any) => ({
      label: cls.className,
      value: cls._id,
    })) || [];
  }, [classData]);

  const subjectOptions = useMemo(() => {
    if (!subjectData?.data?.subjects) return []
    return subjectData.data.subjects.map((sub: any) => ({
      label: sub.name,
      value: sub._id,
    }))
  }, [subjectData])

  const teacherOptions = useMemo(() => {
    if (!teacherData?.data) return []
    return teacherData.data.map((teacher: any) => ({
      label: teacher.name,
      value: teacher._id,
    }))
  }, [teacherData])

  // Hour options
  const hourOptions = ["১ম", "২য়", "৩য়", "৪র্থ", "৫ম", "৬ষ্ঠ", "৭ম", "৮ম"]

  // Handle refresh
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
    refetch()
  }

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // Handle search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  // Handle filter changes
  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setPage(0);
  };

  // Handle sorting
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  // Handle context menu
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, report: any) => {
    setAnchorEl(event.currentTarget)
    setSelectedReport(report)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // Handle delete
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    setAnchorEl(null)
  }

  const handleDeleteConfirm = () => {
    // Implement delete functionality here
    setDeleteDialogOpen(false)
    setSelectedReport(null)
    refetch()
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
  }

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      class: "",
      subject: "",
      teacher: "",
      date: "",
      hour: "",
    })
    setSearchTerm("")
  }

  // Toggle expanded report
  const handleToggleExpand = (reportId: string) => {
    if (expandedReport === reportId) {
      setExpandedReport(null)
    } else {
      setExpandedReport(reportId)
    }
  }

  const handleOpenDetailsModal = (e: React.MouseEvent, report: any) => {
    e.stopPropagation()
    setSelectedReportDetails(report)
    setDetailsModalOpen(true)
  }

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false)
    setSelectedReportDetails(null)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy")
    } catch (error) {
      return "Invalid Date"
    }
  }

  // Filter reports by hour (client-side filtering for hour)
  const filteredReportsByHour = useMemo(() => {
    if (!filters.hour) return reports
    return reports.filter((report: any) => report.hour === filters.hour)
  }, [reports, filters.hour])

  // Filter reports by date (client-side filtering for date)
  const filteredReportsByDate = useMemo(() => {
    if (!filters.date) return filteredReportsByHour

    const filterDate = new Date(filters.date)
    return filteredReportsByHour.filter((report: any) => {
      const reportDate = new Date(report.date)
      return (
        reportDate.getDate() === filterDate.getDate() &&
        reportDate.getMonth() === filterDate.getMonth() &&
        reportDate.getFullYear() === filterDate.getFullYear()
      )
    })
  }, [filteredReportsByHour, filters.date])

  // Sort reports
  const sortedReports = useMemo(() => {
    return [...filteredReportsByDate].sort((a, b) => {
      if (orderBy === "date") {
        return order === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (orderBy === "classes") {
        const classA = a.classes?.className || ""
        const classB = b.classes?.className || ""
        return order === "asc" ? classA.localeCompare(classB) : classB.localeCompare(classA)
      } else if (orderBy === "subjects") {
        const subjectA = a.subjects?.name || ""
        const subjectB = b.subjects?.name || ""
        return order === "asc" ? subjectA.localeCompare(subjectB) : subjectB.localeCompare(subjectA)
      } else {
        // Default sort by createdAt
        return order === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })
  }, [filteredReportsByDate, orderBy, order])

  // Prepare student data for display
  const getStudentRows = (report: any) => {
    if (!report.studentEvaluations || report.studentEvaluations.length === 0) {
      return []
    }

    return report.studentEvaluations.map((evaluation: any) => {
      const student = evaluation.studentId || {}
      return {
        id: student._id,
        roll: student.studentClassRoll || student.studentId || "N/A",
        name: student.name || "N/A",
        lessonEvaluation: evaluation.lessonEvaluation || "N/A",
        handwriting: evaluation.handwriting || "N/A",
        attendance: evaluation.attendance || "N/A",
        parentSignature: evaluation.parentSignature ? "Yes" : "No",
        comments: evaluation.comments || "",
      }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", borderRadius: 2 }}>
        <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2 }}>
          <Fade in={true} timeout={800}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                  flexWrap: "wrap",
                  gap: 2,
                  paddingTop: 2,
                }}
              >
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
                  Class Reports
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
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
                    href="/dashboard/super_admin/classes/report/new"
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                    }}
                  >
                    Add New Report
                  </Button>
                </Box>
              </Box>

              {/* Filter Cards */}
              <Box sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                  {/* Class Filter */}
                  <Grid item xs={12} sm={6} md={2.4}>
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
                            value={filters.class}
                            label="Select Class"
                            onChange={(e: SelectChangeEvent) => handleFilterChange("class", e.target.value)}
                          >
                            <MenuItem value="">All Classes</MenuItem>
                            {classOptions.map((option: any) => (
                              <MenuItem key={option.value} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Subject Filter */}
                  <Grid item xs={12} sm={6} md={2.4}>
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
                            value={filters.subject}
                            label="Select Subject"
                            onChange={(e: SelectChangeEvent) => handleFilterChange("subject", e.target.value)}
                          >
                            <MenuItem value="">All Subjects</MenuItem>
                            {subjectOptions.map((option: any) => (
                              <MenuItem key={option.value} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Teacher Filter */}
                  <Grid item xs={12} sm={6} md={2.4}>
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
                            value={filters.teacher}
                            label="Select Teacher"
                            onChange={(e: SelectChangeEvent) => handleFilterChange("teacher", e.target.value)}
                          >
                            <MenuItem value="">All Teachers</MenuItem>
                            {teacherOptions.map((option: any) => (
                              <MenuItem key={option.value} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Hour Filter */}
                  <Grid item xs={12} sm={6} md={2.4}>
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

                  {/* Date Filter */}
                  <Grid item xs={12} sm={6} md={2.4}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <CalendarIcon sx={{ color: "primary.main", mr: 1 }} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Date
                          </Typography>
                        </Box>
                        <TextField
                          fullWidth
                          id="date-filter"
                          label="Select Date"
                          type="date"
                          size="small"
                          value={filters.date}
                          onChange={(e) => handleFilterChange("date", e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* Search and Actions */}
                <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <TextField
                    placeholder="Search by class, subject, teacher..."
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
                  >
                    Clear Filters
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
                  <Box sx={{ p: 2 }}>
                    {Array.from(new Array(5)).map((_, index) => (
                      <Box key={index} sx={{ display: "flex", py: 2, px: 2, alignItems: "center" }}>
                        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                        <Box sx={{ width: "100%" }}>
                          <Skeleton variant="text" width="40%" height={30} />
                          <Box sx={{ display: "flex", mt: 1 }}>
                            <Skeleton variant="text" width="20%" sx={{ mr: 2 }} />
                            <Skeleton variant="text" width="30%" />
                          </Box>
                        </Box>
                        <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <>
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>
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
                            <TableCell>
                              Roll
                            </TableCell>
                            <TableCell>
                              Student Name
                            </TableCell>
                            <TableCell>
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

                            <TableCell>

                              Subject



                            </TableCell>
                            <TableCell>Hour</TableCell>
                            <TableCell>Attendance</TableCell>
                            <TableCell>Lesson</TableCell>
                            <TableCell>Homework</TableCell>

                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {sortedReports.length > 0 ? (
                            sortedReports.map((report: any) => {
                             
                              const className = report.classes?.className || "N/A";
                              const subjectName = report.subjects?.name || "N/A";
                              const hasLesson = !!report.todayLesson;
                              const hasHomework = !!report.homeTask;
                              const isExpanded = expandedReport === report._id;

                              return (
                                <React.Fragment key={report._id}>
                                  {report.studentEvaluations?.map((evaluation: any, index: number) => {
                                    const student = evaluation.studentId;

                                    return (
                                      <TableRow
                                        key={`${report._id}-${index}`}
                                        sx={{
                                          transition: "all 0.2s",
                                          bgcolor: isExpanded ? alpha(theme.palette.primary.main, 0.05) : "inherit",
                                          "&:hover": {
                                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                                          },
                                        }}
                                        onClick={() => handleToggleExpand(report._id)}
                                      >
                                        <TableCell>{report.date ? formatDate(report.date) : "N/A"}</TableCell>
                                        <TableCell>{student?.studentClassRoll || "Not"}</TableCell>
                                        <TableCell>{student?.name || "Note"}</TableCell>
                                        <TableCell>
                                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            {report.classes}
                                          </Typography>
                                        </TableCell>
                                        <TableCell>
                                          <Chip
                                            label={report?.subjects}
                                            size="small"
                                            sx={{
                                              bgcolor: "rgba(99, 102, 241, 0.08)",
                                              color: "primary.main",
                                              fontWeight: 500,
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Typography variant="body2">{report.hour || "N/A"}</Typography>
                                        </TableCell>
                                        <TableCell>
                                          <Chip
                                            icon={
                                              evaluation?.attendance?.toLowerCase() === "উপস্থিত" ? (
                                                <CheckCircleIcon sx={{ color: "success.main" }} />
                                              ) : (
                                                <CancelIcon sx={{ color: "error.main" }} />
                                              )
                                            }
                                            label={evaluation?.attendance || "Not Marked"}
                                            color={evaluation?.attendance?.toLowerCase() === "উপস্থিত" ? "success" : "error"}
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
                                              evaluation?.handwriting ? (
                                                <DrawIcon sx={{ color: "#00BFA6" }} />
                                              ) : (
                                                <BlockIcon sx={{ color: "#FF1744" }} />
                                              )
                                            }
                                            label={evaluation?.handwriting || "Not Submitted"}
                                            size="small"
                                            sx={{
                                              fontWeight: 500,
                                              color: evaluation?.handwriting ? "#00BFA6" : "#FF1744",
                                              bgcolor: evaluation?.handwriting ? "#E0F7FA" : "#FFEBEE",
                                              border: `1px solid ${evaluation?.handwriting ? "#00BFA6" : "#FF1744"}`,
                                            }}
                                          />


                                        </TableCell>

                                        <TableCell>

                                          <Chip
                                            icon={
                                              evaluation?.lessonEvaluation ? (
                                                <CheckCircleIcon sx={{ color: "#651FFF" }} />
                                              ) : (
                                                <CancelIcon sx={{ color: "#FF1744" }} />
                                              )
                                            }
                                            label={evaluation?.lessonEvaluation || "Not Done"}
                                            size="small"
                                            sx={{
                                              fontWeight: 500,
                                              color: evaluation?.lessonEvaluation ? "#651FFF" : "#FF1744",
                                              bgcolor: evaluation?.lessonEvaluation ? "#EDE7F6" : "#FFEBEE",
                                              border: `1px solid ${evaluation?.lessonEvaluation ? "#651FFF" : "#FF1744"}`,
                                            }}
                                          />

                                        </TableCell>

                                        <TableCell>

                                          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                            {!isMobile && (
                                              <>
                                                <Tooltip title="View Details">
                                                  <IconButton
                                                    size="small"
                                                    sx={{
                                                      color: "info.main",
                                                      bgcolor: alpha(theme.palette.info.main, 0.1),
                                                      mr: 1,
                                                      "&:hover": {
                                                        bgcolor: alpha(theme.palette.info.main, 0.2),
                                                      },
                                                    }}
                                                    onClick={(e) => handleOpenDetailsModal(e, report)}
                                                  >
                                                    <VisibilityIcon fontSize="small" />
                                                  </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit Report">
                                                  <IconButton
                                                    size="small"
                                                    component={Link}
                                                    href={`/dashboard/super_admin/classes/report/list/${report._id}`}
                                                    sx={{
                                                      color: "warning.main",
                                                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                                                      mr: 1,
                                                      "&:hover": {
                                                        bgcolor: alpha(theme.palette.warning.main, 0.2),
                                                      },
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                  >
                                                    <EditIcon fontSize="small" />
                                                  </IconButton>
                                                </Tooltip>
                                              </>
                                            )}

                                            <Tooltip title="Delete Subject">
                                              <IconButton
                                                size="small"
                                                sx={{
                                                  color: "error.main",
                                                  bgcolor: alpha(theme.palette.error.main, 0.1),
                                                  "&:hover": {
                                                    bgcolor: alpha(theme.palette.error.main, 0.2),
                                                  },
                                                }}
                                                onClick={handleDeleteClick}
                                              >
                                                <DeleteIcon fontSize="small" />
                                              </IconButton>
                                            </Tooltip>
                                          </Box>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </React.Fragment>
                              );
                            })
                          ) : (
                            <TableRow>
                              <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                                <Box sx={{ textAlign: "center" }}>
                                  <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                                  <Typography variant="h6" gutterBottom>
                                    No class reports found
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Try adjusting your search or filter to find what you&apos;re looking for.
                                  </Typography>
                                </Box>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>

                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      component="div"
                      count={totalCount}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      sx={{
                        borderTop: "1px solid rgba(0, 0, 0, 0.06)",
                      }}
                    />
                  </>
                )}
              </Paper>
            </Box>
          </Fade>
        </Container>
      </Box>



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
      <Dialog
        open={detailsModalOpen}
        onClose={handleCloseDetailsModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            width: "100%",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Class Report Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedReportDetails && (
            <>
              <Box sx={{ mb: 3, mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Class
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {selectedReportDetails.classes?.className || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Subject
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {selectedReportDetails.subjects?.name || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Date
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {selectedReportDetails.date ? formatDate(selectedReportDetails.date) : "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Hour
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {selectedReportDetails.hour || "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Student Details
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Roll</TableCell>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Lesson Evaluation</TableCell>
                      <TableCell>Handwriting</TableCell>
                      <TableCell>Attendance</TableCell>
                      <TableCell>Parent Signature</TableCell>
                      <TableCell>Comments</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getStudentRows(selectedReportDetails).map((student: any) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.roll}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.lessonEvaluation}</TableCell>
                        <TableCell>{student.handwriting}</TableCell>
                        <TableCell>{student.attendance}</TableCell>
                        <TableCell>{student.parentSignature}</TableCell>
                        <TableCell>{student.comments}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {selectedReportDetails.todayLesson && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Today's Lesson
                  </Typography>
                  <Typography variant="body2">
                    {selectedReportDetails.todayLesson?.lessonContent || "No content available"}
                  </Typography>
                </Box>
              )}

              {selectedReportDetails.homeTask && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Homework
                  </Typography>
                  <Typography variant="body2">
                    {selectedReportDetails.homeTask?.content || "No content available"}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDetailsModal} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}
