/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Avatar,
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
  createTheme,
  ThemeProvider,
  Alert,
  Snackbar,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  CheckCircle as CheckCircleIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  Class as ClassIcon,
  MenuBook as MenuBookIcon,
  Assignment as AssignmentIcon,
  List as ListIcon,
} from "@mui/icons-material"
import { Roboto } from "next/font/google"
import Link from "next/link"
import { format } from "date-fns"
import { useDeleteSubjectMutation, useGetAllSubjectsQuery } from "@/redux/api/subjectApi"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
})

// Create a custom theme with vibrant colors
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#ec4899",
      light: "#f472b6",
      dark: "#db2777",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    info: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "10px 20px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(99, 102, 241, 0.2)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          overflow: "visible",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          padding: "16px",
        },
        head: {
          fontWeight: 600,
          backgroundColor: "rgba(99, 102, 241, 0.04)",
          color: "#6366f1",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(99, 102, 241, 0.04)",
          },
          "&:last-child td": {
            borderBottom: 0,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
})

export default function SubjectManagementPage() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [paperFilter, setPaperFilter] = useState<string | null>(null)
  const [classFilter, setClassFilter] = useState<string | null>(null)
  const [optionalFilter, setOptionalFilter] = useState<boolean | null>(null)
  const [orderBy, setOrderBy] = useState<string>("name")
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const [paperFilterAnchorEl, setPaperFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [classFilterAnchorEl, setClassFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [optionalFilterAnchorEl, setOptionalFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedSubject, setSelectedSubject] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [viewLessonsDialogOpen, setViewLessonsDialogOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")

  // API integration
  const {
    data: subjectData,
    isLoading,
    refetch,
  } = useGetAllSubjectsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })

  const [deleteSubject, { isLoading: isDeleting }] = useDeleteSubjectMutation()

  const theme = customTheme
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Get subjects from API response
  const subjects = subjectData?.data?.subjects || []

  const handleRefresh = () => {
    refetch()
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  const handlePaperFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPaperFilterAnchorEl(event.currentTarget)
  }

  const handleClassFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setClassFilterAnchorEl(event.currentTarget)
  }

  const handleOptionalFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOptionalFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setPaperFilterAnchorEl(null)
    setClassFilterAnchorEl(null)
    setOptionalFilterAnchorEl(null)
  }

  const handlePaperFilterSelect = (paper: string | null) => {
    setPaperFilter(paper)
    setPaperFilterAnchorEl(null)
    setPage(0)
  }

  const handleClassFilterSelect = (className: string | null) => {
    setClassFilter(className)
    setClassFilterAnchorEl(null)
    setPage(0)
  }

  const handleOptionalFilterSelect = (isOptional: boolean | null) => {
    setOptionalFilter(isOptional)
    setOptionalFilterAnchorEl(null)
    setPage(0)
  }

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleDeleteClick = (subject: any) => {
    setSelectedSubject(subject)
    setDeleteDialogOpen(true)
  }

  const handleViewLessons = (subject: any) => {
    setSelectedSubject(subject)
    setViewLessonsDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedSubject) return

    try {
      const res = await deleteSubject(selectedSubject._id).unwrap()
      if (res.success) {
        setSnackbarMessage(`Subject "${selectedSubject.name}" deleted successfully`)
        setSnackbarSeverity("success")
        setSnackbarOpen(true)
        toast.success("Subject deleted successfully")
        refetch() // Refresh the subject list
      }
    } catch (error: any) {
      setSnackbarMessage(error?.data?.message || "Failed to delete subject")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
      toast.error("Failed to delete subject")
    } finally {
      setDeleteDialogOpen(false)
      setSelectedSubject(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setSelectedSubject(null)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const handleCloseLessonsDialog = () => {
    setViewLessonsDialogOpen(false)
  }

  const handleEditSubject = (id: string) => {
    router.push(`/dashboard/super_admin/subject/update/${id}`)
  }

  // Process and filter subjects
  const filteredSubjects = subjects
    .filter(
      (subject: any) =>
        (searchTerm === "" ||
          subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subject.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (paperFilter === null || subject.paper === paperFilter) &&
        (classFilter === null || (subject.classes && subject.classes.some((c: any) => c.className === classFilter))) &&
        (optionalFilter === null || subject.isOptional === optionalFilter),
    )
    .sort((a: any, b: any) => {
      if (orderBy === "name") {
        return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }

      if (orderBy === "code") {
        return order === "asc" ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code)
      }

      if (orderBy === "paper") {
        return order === "asc" ? a.paper.localeCompare(b.paper) : b.paper.localeCompare(a.paper)
      }

      if (orderBy === "createdAt") {
        return order === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }

      return 0
    })

  const paginatedSubjects = filteredSubjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)



  const getSubjectColor = (name: string) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.info.main,
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch (error: any) {
      return "Invalid date"
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: "background.default", borderRadius: 2 }}>
        <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2 }}>
          <Fade in={true} timeout={800}>
            <Box>
              <div className="md:flex justify-between items-center mb-3 flex-wrap gap-2 pt-2">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                  <MenuBookIcon sx={{ height: 40, width: 40, color: "#6366f1" }} />
                  Subject Management
                </div>
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
                    href="/dashboard/super_admin/subject/new"
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                    }}
                  >
                    Add New Subject
                  </Button>
                </Box>
              </div>

              <Paper elevation={0} sx={{ mb: 4, overflow: "hidden" }}>
                <Box sx={{ p: 2, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} md={4.5}>
                      <TextField
                        fullWidth
                        placeholder="Search by Subject Name or Code..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon color="action" />
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

                  </Grid>
                </Box>

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

                              SL. No.


                            </TableCell>
                            {/* <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  color: orderBy === "code" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("code")}
                              >
                                Code
                                {orderBy === "code" && (
                                  <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
                                    {order === "asc" ? (
                                      <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                      <ArrowDownwardIcon fontSize="small" />
                                    )}
                                  </Box>
                                )}
                              </Box>
                            </TableCell> */}
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  color: orderBy === "name" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("name")}
                              >
                                Subject
                                {orderBy === "name" && (
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
                                  color: orderBy === "paper" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("paper")}
                              >
                                Paper
                                {orderBy === "paper" && (
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
                           
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {paginatedSubjects.length > 0 ? (
                            paginatedSubjects.map((subject: any, index: number) => (
                              <TableRow key={subject._id} sx={{ transition: "all 0.2s" }}>
                                <TableCell>
                                  {index + 1}
                                </TableCell>
                                
                                <TableCell>
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Avatar
                                      src={subject.image || ""}
                                      sx={{
                                        width: 32,
                                        height: 32,
                                        mr: 1.5,
                                        bgcolor: getSubjectColor(subject.name),
                                        fontSize: "0.875rem",
                                      }}
                                    >
                                      {subject.name.charAt(0)}
                                    </Avatar>
                                    <Typography variant="body2">{subject.name}</Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    icon={<AssignmentIcon fontSize="small" />}
                                    label={subject.paper}
                                    size="small"
                                    color="info"
                                    sx={{
                                      fontWeight: 500,
                                    }}
                                  />
                                </TableCell>
                                
                                <TableCell align="right">
                                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                   
                                    <Tooltip title="Edit Subject">
                                      <IconButton
                                        size="small"
                                        onClick={() => handleEditSubject(subject._id)}
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
                                        onClick={() => handleDeleteClick(subject)}
                                      >
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                                <Box sx={{ textAlign: "center" }}>
                                  <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                                  <Typography variant="h6" gutterBottom>
                                    No subjects found
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
                      count={filteredSubjects.length}
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
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Delete Subject
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the subject &quot;{selectedSubject?.name}&quot;? This action cannot be
            undone.
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
          <Button onClick={handleDeleteConfirm} variant="contained" color="error" sx={{ ml: 2 }} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Lessons Dialog */}
      <Dialog open={viewLessonsDialogOpen} onClose={handleCloseLessonsDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Lessons for {selectedSubject?.name}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedSubject?.lessons && selectedSubject?.lessons.length > 0 ? (
            <Box sx={{ mt: 2 }}>
              {selectedSubject?.lessons.map((lesson: any, index: number) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                    borderRadius: 2,
                    bgcolor: "rgba(99, 102, 241, 0.02)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      label={`Lesson ${lesson.lessonNo}`}
                      size="small"
                      color="primary"
                      sx={{ mr: 2, fontWeight: 500 }}
                    />
                    <Typography variant="body1">{lesson.lessonName}</Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No lessons available for this subject.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseLessonsDialog} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} variant="filled" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}
