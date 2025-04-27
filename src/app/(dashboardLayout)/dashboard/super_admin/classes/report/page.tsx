/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useMemo } from "react"
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
  ThemeProvider,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
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
import Link from "next/link"
import { customTheme } from "@/ThemeStyle"
import { useGetAllClassReportsQuery } from "@/redux/api/classReportApi"
import { useGetAllClassesQuery } from "@/redux/api/classApi"
import { useGetAllSubjectsQuery } from "@/redux/api/subjectApi"
import { useGetAllTeachersQuery } from "@/redux/api/teacherApi"
import { format } from "date-fns"

type ClassReportProps = {
  id: string;
}
export default function ClassReportList({ id }: ClassReportProps) {

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    class: "",
    subject: "",
    teacher: "",
    date: "",
  })
  const [orderBy, setOrderBy] = useState<string>("createdAt")
  const [order, setOrder] = useState<"asc" | "desc">("desc")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedReport, setSelectedReport] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  // API queries
  const {
    data: classReport,
    isLoading,
    refetch,
  } = useGetAllClassReportsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
    classId: filters.class || undefined,
    subjectId: filters.subject || undefined,
    teacherId: filters.teacher || undefined,
  })

  const { data: classData } = useGetAllClassesQuery({
    limit: 100,
    page: 1,
  })

  const { data: subjectData } = useGetAllSubjectsQuery({
    limit: 100,
    page: 1,
  })

  const { data: teacherData } = useGetAllTeachersQuery({
    limit: 100,
    page: 1,
  })

  const theme = customTheme
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Extract reports from API response
  const reports = useMemo(() => {
    return classReport?.data?.reports || []
  }, [classReport])

  // Total count for pagination
  const totalCount = classReport?.data?.meta?.total || 0

  // Prepare options for filters
  const classOptions = useMemo(() => {
    if (!classData?.data?.classes) return []
    return classData.data.classes.map((cls: any) => ({
      label: cls.className,
      value: cls._id,
    }))
  }, [classData])

  const subjectOptions = useMemo(() => {
    if (!subjectData?.data?.subjects) return []
    return subjectData.data.subjects.map((sub: any) => ({
      label: sub.name,
      value: sub._id,
    }))
  }, [subjectData])

  const teacherOptions = useMemo(() => {
    if (!teacherData?.data?.teachers) return []
    return teacherData.data.teachers.map((teacher: any) => ({
      label: teacher.name,
      value: teacher._id,
    }))
  }, [teacherData])

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
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
    setPage(0)
  }

  // Handle filter menu
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

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
    })
    setSearchTerm("")
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy")
    } catch (error) {
      return "Invalid Date"
    }
  }

  // Get lesson evaluation status chip
  const getLessonEvaluationChip = (evaluation: string) => {
    switch (evaluation) {
      case "পড়া শিখেছে":
        return {
          color: "success" as const,
          icon: <CheckCircleIcon fontSize="small" />,
          sx: { bgcolor: alpha(theme.palette.success.main, 0.1) },
        }
      case "আংশিক শিখেছে":
        return {
          color: "warning" as const,
          icon: <AccessTimeIcon fontSize="small" />,
          sx: { bgcolor: alpha(theme.palette.warning.main, 0.1) },
        }
      case "পড়া শিখেনি":
        return {
          color: "error" as const,
          icon: <CancelIcon fontSize="small" />,
          sx: { bgcolor: alpha(theme.palette.error.main, 0.1) },
        }
      default:
        return {
          color: "default" as const,
          icon: undefined,
          sx: {},
        }
    }
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
                  <Grid item xs={12} sm={6} md={3}>
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
                  <Grid item xs={12} sm={6} md={3}>
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
                  <Grid item xs={12} sm={6} md={3}>
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
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Date Filter */}
                  <Grid item xs={12} sm={6} md={3}>
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
                    placeholder="Search by student, class, subject..."
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
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  color: orderBy === "subjects" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("subjects")}
                              >
                                Subject
                                {orderBy === "subjects" && (
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
                            <TableCell>Hour</TableCell>
                            <TableCell>Students</TableCell>
                            <TableCell>Lesson</TableCell>
                            <TableCell>Homework</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {reports.length > 0 ? (
                            reports.map((report: any) => {
                              const className = report.classes?.className || "N/A"
                              const subjectName = report.subjects?.name || "N/A"
                              const studentCount = report.studentEvaluations?.length || 0
                              const hasLesson = !!report.todayLesson
                              const hasHomework = !!report.homeTask

                              return (
                                <TableRow key={report._id} sx={{ transition: "all 0.2s" }}>
                                  <TableCell>
                                    <Typography variant="body2">
                                      {report.date ? formatDate(report.date) : "N/A"}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                      {className}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      label={subjectName}
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
                                    <Typography variant="body2">{studentCount}</Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      icon={
                                        hasLesson ? (
                                          <CheckCircleIcon fontSize="small" />
                                        ) : (
                                          <CancelIcon fontSize="small" />
                                        )
                                      }
                                      label={hasLesson ? "Added" : "Missing"}
                                      color={hasLesson ? "success" : "error"}
                                      size="small"
                                      sx={{
                                        fontWeight: 500,
                                        bgcolor: hasLesson
                                          ? alpha(theme.palette.success.main, 0.1)
                                          : alpha(theme.palette.error.main, 0.1),
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      icon={
                                        hasHomework ? (
                                          <CheckCircleIcon fontSize="small" />
                                        ) : (
                                          <CancelIcon fontSize="small" />
                                        )
                                      }
                                      label={hasHomework ? "Added" : "Missing"}
                                      color={hasHomework ? "success" : "error"}
                                      size="small"
                                      sx={{
                                        fontWeight: 500,
                                        bgcolor: hasHomework
                                          ? alpha(theme.palette.success.main, 0.1)
                                          : alpha(theme.palette.error.main, 0.1),
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Typography variant="body2" color="text.secondary">
                                      {formatDate(report.createdAt)}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                      {!isMobile && (
                                        <>
                                          <Tooltip title="View Details">
                                            <IconButton
                                              size="small"
                                              // component={Link}
                                              // href={`/dashboard/admin/class-reports/${report._id}`}
                                              sx={{
                                                color: "info.main",
                                                bgcolor: alpha(theme.palette.info.main, 0.1),
                                                mr: 1,
                                                "&:hover": {
                                                  bgcolor: alpha(theme.palette.info.main, 0.2),
                                                },
                                              }}
                                            >
                                              <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="Edit Report">
                                            <IconButton
                                              size="small"
                                              component={Link}
                                              href={`/dashboard/super_admin/classes/report/update?id=${report._id}`}
                                              sx={{
                                                color: "warning.main",
                                                bgcolor: alpha(theme.palette.warning.main, 0.1),
                                                mr: 1,
                                                "&:hover": {
                                                  bgcolor: alpha(theme.palette.warning.main, 0.2),
                                                },
                                              }}
                                            >
                                              <EditIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                        </>
                                      )}
                                      <Tooltip title="More Actions">
                                        <IconButton
                                          size="small"
                                          onClick={(e) => handleMenuClick(e, report)}
                                          sx={{
                                            color: "text.secondary",
                                            bgcolor: "rgba(0, 0, 0, 0.04)",
                                            "&:hover": {
                                              bgcolor: "rgba(0, 0, 0, 0.08)",
                                            },
                                          }}
                                        >
                                          <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              )
                            })
                          ) : (
                            <TableRow>
                              <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
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

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 180,
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      >
        <MenuItem
          component={Link}
          href={`/dashboard/admin/class-reports/${selectedReport?._id}`}
          onClick={handleMenuClose}
          sx={{ py: 1.5 }}
        >
          <VisibilityIcon fontSize="small" sx={{ mr: 2, color: "info.main" }} />
          View Details
        </MenuItem>
        <MenuItem
          component={Link}
          href={`/dashboard/admin/class-reports/edit/${selectedReport?._id}`}
          onClick={handleMenuClose}
          sx={{ py: 1.5 }}
        >
          <EditIcon fontSize="small" sx={{ mr: 2, color: "warning.main" }} />
          Edit Report
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteClick} sx={{ py: 1.5, color: "error.main" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 2 }} />
          Delete Report
        </MenuItem>
      </Menu>

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
    </ThemeProvider>
  )
}
