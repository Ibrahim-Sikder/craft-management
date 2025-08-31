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
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  Person,
  AdminPanelSettings,
  School,
  SupervisorAccount,
  Engineering,
} from "@mui/icons-material"
import { Roboto } from "next/font/google"
import Link from "next/link"
import { useDeleteUserMutation, useGetAllUsersQuery } from "@/redux/api/userApi"
import { format } from "date-fns"

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

// Define user roles with icons and colors
const roleConfig = {
  admin: {
    icon: <AdminPanelSettings fontSize="small" />,
    color: "secondary" as const,
    label: "Admin",
  },
  user: {
    icon: <Person fontSize="small" />,
    color: "success" as const,
    label: "User",
  },
  super_visor: {
    icon: <SupervisorAccount fontSize="small" />,
    color: "info" as const,
    label: "Supervisor",
  },
  teacher: {
    icon: <School fontSize="small" />,
    color: "warning" as const,
    label: "Teacher",
  },
  student: {
    icon: <School fontSize="small" />,
    color: "success" as const,
    label: "Student",
  },
  staff: {
    icon: <Engineering fontSize="small" />,
    color: "default" as const,
    label: "Staff",
  },
}

export default function UserManagementPage() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const [orderBy, setOrderBy] = useState<string>("name")
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [roleFilterAnchorEl, setRoleFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")

  const {
    data: userData,
    isLoading,
    refetch,
  } = useGetAllUsersQuery({
    limit: 100, // Get all users and handle pagination client-side for better UX
    page: 1,
    searchTerm: "",
  })

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

  const theme = customTheme
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

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

  const handleStatusFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleRoleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRoleFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
    setRoleFilterAnchorEl(null)
  }

  const handleStatusFilterSelect = (status: string | null) => {
    setStatusFilter(status)
    setFilterAnchorEl(null)
    setPage(0)
  }

  const handleRoleFilterSelect = (role: string | null) => {
    setRoleFilter(role)
    setRoleFilterAnchorEl(null)
    setPage(0)
  }

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleDeleteClick = (user: any) => {
    setSelectedUser(user)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return

    try {
      await deleteUser(selectedUser._id).unwrap()
      setSnackbarMessage(`User "${selectedUser.name}" deleted successfully`)
      setSnackbarSeverity("success")
      setSnackbarOpen(true)
      refetch() // Refresh the user list
    } catch (error: any) {
      setSnackbarMessage(error?.data?.message || "Failed to delete user")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
    } finally {
      setDeleteDialogOpen(false)
      setSelectedUser(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setSelectedUser(null)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  // Process and filter users from API data
  const users = userData?.data || []

  const filteredUsers = users
    .filter(
      (user: any) =>
        (searchTerm === "" ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user._id.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === null || user.status.toLowerCase() === statusFilter.toLowerCase()) &&
        (roleFilter === null || user.role.toLowerCase() === roleFilter.toLowerCase()),
    )
    .sort((a: any, b: any) => {
      if (orderBy === "name") {
        return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }

      if (orderBy === "email") {
        return order === "asc" ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email)
      }

      if (orderBy === "role") {
        return order === "asc" ? a.role.localeCompare(b.role) : b.role.localeCompare(a.role)
      }

      if (orderBy === "status") {
        return order === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
      }

      if (orderBy === "createdAt") {
        return order === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }

      return 0
    })

  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const getStatusChipProps = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return {
          color: "success" as const,
          icon: <CheckCircleIcon fontSize="small" />,
          sx: { bgcolor: alpha(theme.palette.success.main, 0.1) },
        }
      case "inactive":
        return {
          color: "error" as const,
          icon: <CancelIcon fontSize="small" />,
          sx: { bgcolor: alpha(theme.palette.error.main, 0.1) },
        }
      case "pending":
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

  const getAvatarColor = (name: string) => {
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

  const getRoleConfig = (role: string) => {
    return (
      roleConfig[role as keyof typeof roleConfig] || {
        icon: <Person fontSize="small" />,
        color: "default" as const,
        label: role.charAt(0).toUpperCase() + role.slice(1),
      }
    )
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch (error:any) {
      return "Invalid date"
    }
  }

  // Get unique roles from the data for the filter
  const availableRoles = Array.from(new Set(users.map((user: any) => user.role)))

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: "background.default", borderRadius: 2 }}>
        <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2 }}>
          <Fade in={true} timeout={800}>
            <Box>
              <div className="md:flex justify-between items-center mb-3 flex-wrap gap-2 pt-2">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                  <Person sx={{ height: 40, width: 40, color: "#4285F4" }} />
                  User Management
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
                    href="/dashboard/user-management/new"
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                    }}
                  >
                    Add New User
                  </Button>
                </Box>
              </div>

              <Paper elevation={0} sx={{ mb: 4, overflow: "hidden" }}>
                <Box sx={{ p: 2, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} md={4.5}>
                      <TextField
                        fullWidth
                        placeholder="Search by Name, Email or ID..."
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
                    <Grid item xs={12} md={7.5}>
                      <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                        <Button
                          variant="outlined"
                          color="inherit"
                          startIcon={<FilterListIcon />}
                          onClick={handleStatusFilterClick}
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
                            onClick={() => handleStatusFilterSelect(null)}
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
                            onClick={() => handleStatusFilterSelect("active")}
                            sx={{
                              py: 1.5,
                              ...(statusFilter === "active" && {
                                bgcolor: "rgba(99, 102, 241, 0.08)",
                                color: "primary.main",
                              }),
                            }}
                          >
                            <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                            Active
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleStatusFilterSelect("inactive")}
                            sx={{
                              py: 1.5,
                              ...(statusFilter === "inactive" && {
                                bgcolor: "rgba(99, 102, 241, 0.08)",
                                color: "primary.main",
                              }),
                            }}
                          >
                            <CancelIcon fontSize="small" color="error" sx={{ mr: 1 }} />
                            Inactive
                          </MenuItem>
                        </Menu>

                        <Button
                          variant="outlined"
                          color="inherit"
                          startIcon={<FilterListIcon />}
                          onClick={handleRoleFilterClick}
                          sx={{
                            borderColor: "rgba(0, 0, 0, 0.12)",
                            color: "text.secondary",
                            "&:hover": {
                              borderColor: "primary.main",
                              bgcolor: "rgba(99, 102, 241, 0.04)",
                            },
                            ...(roleFilter && {
                              borderColor: "primary.main",
                              color: "primary.main",
                              bgcolor: "rgba(99, 102, 241, 0.04)",
                            }),
                          }}
                        >
                          {roleFilter ? getRoleConfig(roleFilter).label : "Filter by Role"}
                        </Button>
                        <Menu
                          anchorEl={roleFilterAnchorEl}
                          open={Boolean(roleFilterAnchorEl)}
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
                            onClick={() => handleRoleFilterSelect(null)}
                            sx={{
                              py: 1.5,
                              ...(roleFilter === null && {
                                bgcolor: "rgba(99, 102, 241, 0.08)",
                                color: "primary.main",
                              }),
                            }}
                          >
                            All Roles
                          </MenuItem>
                          {availableRoles.map((role: any) => {
                            const config = getRoleConfig(role)
                            return (
                              <MenuItem
                                key={role}
                                onClick={() => handleRoleFilterSelect(role)}
                                sx={{
                                  py: 1.5,
                                  ...(roleFilter === role && {
                                    bgcolor: "rgba(99, 102, 241, 0.08)",
                                    color: "primary.main",
                                  }),
                                }}
                              >
                                {config.icon}
                                <Typography sx={{ ml: 1 }}>{config.label}</Typography>
                              </MenuItem>
                            )
                          })}
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
                    <TableContainer sx={{
            overflowX: "auto",  
            WebkitOverflowScrolling: "touch",  
            maxWidth: "100vw"  
          }}>
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
                                  color: orderBy === "_id" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("_id")}
                              >
                                User ID
                                {orderBy === "_id" && (
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
                                  color: orderBy === "name" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("name")}
                              >
                                Name
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
                                  color: orderBy === "email" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("email")}
                              >
                                Email
                                {orderBy === "email" && (
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
                                  color: orderBy === "role" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("role")}
                              >
                                Role
                                {orderBy === "role" && (
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
                                Created At
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
                          {paginatedUsers.length > 0 ? (
                            paginatedUsers.map((user: any) => {
                              const statusChipProps = getStatusChipProps(user.status)
                              const roleConfig = getRoleConfig(user.role)
                              return (
                                <TableRow key={user._id} sx={{ transition: "all 0.2s" }}>
                                  <TableCell>
                                    <Chip
                                      label={user._id.substring(0, 8) + "..."}
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
                                          bgcolor: getAvatarColor(user.name),
                                          fontSize: "0.875rem",
                                        }}
                                      >
                                        {user.name.charAt(0)}
                                      </Avatar>
                                      <Typography variant="body2">{user.name}</Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Typography variant="body2">{user.email}</Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      icon={roleConfig.icon}
                                      label={roleConfig.label}
                                      color={roleConfig.color}
                                      size="small"
                                      sx={{
                                        fontWeight: 500,
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      icon={statusChipProps.icon}
                                      label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                      color={statusChipProps.color}
                                      size="small"
                                      sx={{
                                        ...statusChipProps.sx,
                                        fontWeight: 500,
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                                  <TableCell align="right">
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                                      <Tooltip title="Edit User">
                                        <IconButton
                                          size="small"
                                          component={Link}
                                          href={`/dashboard/user-management/edit/${user._id}`}
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
                                      <Tooltip title="Delete User">
                                        <IconButton
                                          size="small"
                                          sx={{
                                            color: "error.main",
                                            bgcolor: alpha(theme.palette.error.main, 0.1),
                                            "&:hover": {
                                              bgcolor: alpha(theme.palette.error.main, 0.2),
                                            },
                                          }}
                                          onClick={() => handleDeleteClick(user)}
                                        >
                                          <DeleteIcon fontSize="small" />
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
                                    No users found
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
                      count={filteredUsers.length}
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
            Delete User
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the user &quot;{selectedUser?.name}&quot;? This action cannot be undone.
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
