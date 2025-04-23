/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  createTheme,
  ThemeProvider,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  // School as SchoolIcon,
  // Dashboard as DashboardIcon,
  // AccountTree as BranchIcon,
  // Home as HomeIcon,
  // Notifications as NotificationsIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material"
import { Roboto } from "next/font/google"
import Link from "next/link"

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

// Sample data for classes
const generateClassesData = () => {
  const statuses = ["Active", "Inactive", "Pending"]
  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Computer Science",
    "Physics",
    "Chemistry",
    "Biology",
    "Art",
    "Music",
  ]
  const teachers = [
    { name: "Dr. Smith", avatar: "S" },
    { name: "Prof. Johnson", avatar: "J" },
    { name: "Mrs. Williams", avatar: "W" },
    { name: "Mr. Brown", avatar: "B" },
    { name: "Ms. Davis", avatar: "D" },
  ]

  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `${subjects[Math.floor(Math.random() * subjects.length)]} ${Math.floor(Math.random() * 12) + 1}`,
    code: `CLS-${Math.floor(1000 + Math.random() * 9000)}`,
    students: Math.floor(Math.random() * 40) + 10,
    teacher: teachers[Math.floor(Math.random() * teachers.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
  }))
}

export default function ClassesListPage() {
  const [classes, setClasses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [orderBy, setOrderBy] = useState<string>("name")
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedClass, setSelectedClass] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const theme = customTheme
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))


  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setClasses(generateClassesData())
      setLoading(false)
    }, 1000)
  }, [refreshKey])

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
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

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleFilterSelect = (status: string | null) => {
    setStatusFilter(status)
    setFilterAnchorEl(null)
    setPage(0)
  }

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, classItem: any) => {
    setAnchorEl(event.currentTarget)
    setSelectedClass(classItem)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    setAnchorEl(null)
  }

  const handleDeleteConfirm = () => {
    setClasses(classes.filter((c) => c.id !== selectedClass?.id))
    setDeleteDialogOpen(false)
    setSelectedClass(null)
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
  }


  const filteredClasses = classes
    .filter(
      (classItem) =>
        (searchTerm === "" ||
          classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          classItem.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          classItem.teacher.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === null || classItem.status === statusFilter),
    )
    .sort((a, b) => {
      const aValue = a[orderBy]
      const bValue = b[orderBy]

      if (orderBy === "teacher") {
        return order === "asc"
          ? a.teacher.name.localeCompare(b.teacher.name)
          : b.teacher.name.localeCompare(a.teacher.name)
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return order === "asc" ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime()
      }

      return order === "asc" ? aValue - bValue : bValue - aValue
    })


  const paginatedClasses = filteredClasses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)


  const getStatusChipProps = (status: string) => {
    switch (status) {
      case "Active":
        return {
          color: "success" as const,
          icon: <CheckCircleIcon fontSize="small" />,
          sx: { bgcolor: alpha(theme.palette.success.main, 0.1) },
        }
      case "Inactive":
        return {
          color: "error" as const,
          icon: <CancelIcon fontSize="small" />,
          sx: { bgcolor: alpha(theme.palette.error.main, 0.1) },
        }
      case "Pending":
        return {
          color: "warning" as const,
          icon: <AccessTimeIcon fontSize="small" />,
          sx: { bgcolor: alpha(theme.palette.warning.main, 0.1) },
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
      <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", borderRadius:2 }}>
        <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius:2 }}>
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
                  paddingTop:2 
                }}
              >
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
                  Classes
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
                    href="/dashboard/super_admin/classes/class/new"
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                    }}
                  >
                    Add New Class
                  </Button>
                </Box>
              </Box>

              <Paper elevation={0} sx={{ mb: 4, overflow: "hidden" }}>
                <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        placeholder="Search classes by name, code or teacher..."
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
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                        <Button
                          variant="outlined"
                          color="inherit"
                          startIcon={<FilterListIcon />}
                          onClick={handleFilterClick}
                          sx={{
                            borderColor: "rgba(0, 0, 0, 0.12)",
                            color: "text.secondary",
                            "&:hover": {
                              borderColor: "primary.main",
                              bgcolor: "rgba(99, 102, 241, 0.04)",
                            },
                            ...(statusFilter && {
                              borderColor: "primary.main",
                              color: "primary.main",
                              bgcolor: "rgba(99, 102, 241, 0.04)",
                            }),
                          }}
                        >
                          {statusFilter || "Filter by Status"}
                        </Button>
                        <Menu
                          anchorEl={filterAnchorEl}
                          open={Boolean(filterAnchorEl)}
                          onClose={handleFilterClose}
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
                            onClick={() => handleFilterSelect(null)}
                            sx={{
                              py: 1.5,
                              ...(statusFilter === null && {
                                bgcolor: "rgba(99, 102, 241, 0.08)",
                                color: "primary.main",
                              }),
                            }}
                          >
                            All Statuses
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleFilterSelect("Active")}
                            sx={{
                              py: 1.5,
                              ...(statusFilter === "Active" && {
                                bgcolor: "rgba(99, 102, 241, 0.08)",
                                color: "primary.main",
                              }),
                            }}
                          >
                            <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                            Active
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleFilterSelect("Inactive")}
                            sx={{
                              py: 1.5,
                              ...(statusFilter === "Inactive" && {
                                bgcolor: "rgba(99, 102, 241, 0.08)",
                                color: "primary.main",
                              }),
                            }}
                          >
                            <CancelIcon fontSize="small" color="error" sx={{ mr: 1 }} />
                            Inactive
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleFilterSelect("Pending")}
                            sx={{
                              py: 1.5,
                              ...(statusFilter === "Pending" && {
                                bgcolor: "rgba(99, 102, 241, 0.08)",
                                color: "primary.main",
                              }),
                            }}
                          >
                            <AccessTimeIcon fontSize="small" color="warning" sx={{ mr: 1 }} />
                            Pending
                          </MenuItem>
                        </Menu>

                        {!isMobile && (
                          <>
                            <Button
                              variant="outlined"
                              color="inherit"
                              startIcon={<DownloadIcon />}
                              sx={{
                                borderColor: "rgba(0, 0, 0, 0.12)",
                                color: "text.secondary",
                                "&:hover": {
                                  borderColor: "primary.main",
                                  bgcolor: "rgba(99, 102, 241, 0.04)",
                                },
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
                                "&:hover": {
                                  borderColor: "primary.main",
                                  bgcolor: "rgba(99, 102, 241, 0.04)",
                                },
                              }}
                            >
                              Print
                            </Button>
                          </>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                {loading ? (
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
                                  color: orderBy === "name" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("name")}
                              >
                                Class Name
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
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  color: orderBy === "teacher" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("teacher")}
                              >
                                Teacher
                                {orderBy === "teacher" && (
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
                                  color: orderBy === "students" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("students")}
                              >
                                Students
                                {orderBy === "students" && (
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
                                  color: orderBy === "status" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("status")}
                              >
                                Status
                                {orderBy === "status" && (
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
                                  color: orderBy === "createdAt" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("createdAt")}
                              >
                                Created
                                {orderBy === "createdAt" && (
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
                          {paginatedClasses.length > 0 ? (
                            paginatedClasses.map((classItem) => {
                              const statusChipProps = getStatusChipProps(classItem.status)

                              return (
                                <TableRow key={classItem.id} sx={{ transition: "all 0.2s" }}>
                                  <TableCell component="th" scope="row">
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                      {classItem.name}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      label={classItem.code}
                                      size="small"
                                      sx={{
                                        bgcolor: "rgba(99, 102, 241, 0.08)",
                                        color: "primary.main",
                                        fontWeight: 500,
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                      <Avatar
                                        sx={{
                                          width: 32,
                                          height: 32,
                                          mr: 1.5,
                                          bgcolor: "primary.main",
                                          fontSize: "0.875rem",
                                        }}
                                      >
                                        {classItem.teacher.avatar}
                                      </Avatar>
                                      <Typography variant="body2">{classItem.teacher.name}</Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Typography variant="body2">{classItem.students}</Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      icon={statusChipProps.icon}
                                      label={classItem.status}
                                      color={statusChipProps.color}
                                      size="small"
                                      sx={{
                                        ...statusChipProps.sx,
                                        fontWeight: 500,
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Typography variant="body2" color="text.secondary">
                                      {classItem.createdAt.toLocaleDateString()}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="right">
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
                                            >
                                              <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="Edit Class">
                                            <IconButton
                                              size="small"
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
                                          onClick={(e) => handleMenuClick(e, classItem)}
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
                              <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                                <Box sx={{ textAlign: "center" }}>
                                  <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                                  <Typography variant="h6" gutterBottom>
                                    No classes found
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
                      count={filteredClasses.length}
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
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <VisibilityIcon fontSize="small" sx={{ mr: 2, color: "info.main" }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <EditIcon fontSize="small" sx={{ mr: 2, color: "warning.main" }} />
          Edit Class
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteClick} sx={{ py: 1.5, color: "error.main" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 2 }} />
          Delete Class
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
            Delete Class
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the class &#34;{selectedClass?.name}&#34;? This action cannot be undone.
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

