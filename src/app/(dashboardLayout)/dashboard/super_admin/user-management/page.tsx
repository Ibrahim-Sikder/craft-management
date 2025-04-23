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
const roles = [
    { 
        name: "Super Admin", 
        icon: <AdminPanelSettings fontSize="small" />,
        color: "primary" as const
    },
    { 
        name: "Admin", 
        icon: <AdminPanelSettings fontSize="small" />,
        color: "secondary" as const
    },
    { 
        name: "Supervisor", 
        icon: <SupervisorAccount fontSize="small" />,
        color: "info" as const
    },
    { 
        name: "Teacher", 
        icon: <School fontSize="small" />,
        color: "warning" as const
    },
    { 
        name: "Student", 
        icon: <Person fontSize="small" />,
        color: "success" as const
    },
    { 
        name: "Staff", 
        icon: <Engineering fontSize="small" />,
        color: "default" as const
    }
]

// Sample data for users
const generateUsersData = () => {
    const statuses = ["Active", "Inactive", "Pending"]
    const users = [
        { name: "Dr. Smith", email: "smith@example.com" },
        { name: "Prof. Johnson", email: "johnson@example.com" },
        { name: "Mrs. Williams", email: "williams@example.com" },
        { name: "Mr. Brown", email: "brown@example.com" },
        { name: "Ms. Davis", email: "davis@example.com" },
    ]

    return Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        code: `USER-${1000 + i}`,
        user: users[i % users.length],            
        role: roles[i % roles.length],            
        status: statuses[i % statuses.length],     
        createdAt: new Date(2024, 0, 1 + i),        
        lastUpdated: new Date(2024, 0, 15 + i),  
      
    }))
}

export default function UserManagementPage() {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
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
    const [refreshKey, setRefreshKey] = useState(0)

    const theme = customTheme
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    useEffect(() => {
        setLoading(true)
        // Simulate API call
        setTimeout(() => {
            setUsers(generateUsersData())
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

    const handleDeleteConfirm = () => {
        setUsers(users.filter((u) => u.id !== selectedUser?.id))
        setDeleteDialogOpen(false)
        setSelectedUser(null)
    }

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false)
    }

    const filteredUsers = users
        .filter(
            (user) =>
                (searchTerm === "" ||
                    user.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (statusFilter === null || user.status === statusFilter) &&
                (roleFilter === null || user.role.name === roleFilter)
        )
        .sort((a, b) => {
            const aValue = a[orderBy]
            const bValue = b[orderBy]

            if (orderBy === "user") {
                return order === "asc"
                    ? a.user.name.localeCompare(b.user.name)
                    : b.user.name.localeCompare(a.user.name)
            }

            if (orderBy === "role") {
                return order === "asc"
                    ? a.role.name.localeCompare(b.role.name)
                    : b.role.name.localeCompare(a.role.name)
            }

            if (typeof aValue === "string" && typeof bValue === "string") {
                return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
            }

            if (aValue instanceof Date && bValue instanceof Date) {
                return order === "asc" ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime()
            }

            return order === "asc" ? aValue - bValue : bValue - aValue
        })

    const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

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
                                <Typography variant="h4" component="h1" sx={{ display: "flex", alignItems: "center", fontWeight: 700, color: "text.primary" }}>
                                    <Person sx={{ height: 40, width: 40, color: "#4285F4" }} />
                                    User Management
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
                                        href="#"
                                        sx={{
                                            borderRadius: 2,
                                            boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                                        }}
                                    >
                                        Add New User
                                    </Button>
                                </Box>
                            </Box>

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
                                                        onClick={() => handleStatusFilterSelect("Active")}
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
                                                        onClick={() => handleStatusFilterSelect("Inactive")}
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
                                                        onClick={() => handleStatusFilterSelect("Pending")}
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
                                                    {roleFilter || "Filter by Role"}
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
                                                    {roles.map((role) => (
                                                        <MenuItem
                                                            key={role.name}
                                                            onClick={() => handleRoleFilterSelect(role.name)}
                                                            sx={{
                                                                py: 1.5,
                                                                ...(roleFilter === role.name && {
                                                                    bgcolor: "rgba(99, 102, 241, 0.08)",
                                                                    color: "primary.main",
                                                                }),
                                                            }}
                                                        >
                                                            {role.icon}
                                                            <Typography sx={{ ml: 1 }}>{role.name}</Typography>
                                                        </MenuItem>
                                                    ))}
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
                                                                    color: orderBy === "code" ? "primary.main" : "inherit",
                                                                }}
                                                                onClick={() => handleSort("code")}
                                                            >
                                                                User ID
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
                                                                    color: orderBy === "user" ? "primary.main" : "inherit",
                                                                }}
                                                                onClick={() => handleSort("user")}
                                                            >
                                                                Name
                                                                {orderBy === "user" && (
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
                                                        <TableCell>Email</TableCell>
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
                                                        <TableCell>Status</TableCell>
                                                        <TableCell align="right">Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {paginatedUsers.length > 0 ? (
                                                        paginatedUsers.map((user) => {
                                                            const statusChipProps = getStatusChipProps(user.status)
                                                            return (
                                                                <TableRow key={user.id} sx={{ transition: "all 0.2s" }}>
                                                                    <TableCell>
                                                                        <Chip
                                                                            label={user.code}
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
                                                                                    bgcolor: getAvatarColor(user.user.name),
                                                                                    fontSize: "0.875rem",
                                                                                }}
                                                                            >
                                                                                {user.user.name.charAt(0)}
                                                                            </Avatar>
                                                                            <Typography variant="body2">{user.user.name}</Typography>
                                                                        </Box>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Typography variant="body2">{user.user.email}</Typography>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Chip
                                                                            icon={user.role.icon}
                                                                            label={user.role.name}
                                                                            color={user.role.color}
                                                                            size="small"
                                                                            sx={{
                                                                                fontWeight: 500,
                                                                                // bgcolor: alpha(theme.palette[user.role.color].main, 0.1),
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Chip
                                                                            icon={statusChipProps.icon}
                                                                            label={user.status}
                                                                            color={statusChipProps.color}
                                                                            size="small"
                                                                            sx={{
                                                                                ...statusChipProps.sx,
                                                                                fontWeight: 500,
                                                                            }}
                                                                        />
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
                                                                                    <Tooltip title="Edit User">
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
                                                                                    <Tooltip title="Delete User">
                                                                                        <IconButton
                                                                                            size="small"
                                                                                            sx={{
                                                                                                color: "error.main",
                                                                                                bgcolor: alpha(theme.palette.error.main, 0.1),
                                                                                                mr: 1,
                                                                                                "&:hover": {
                                                                                                    bgcolor: alpha(theme.palette.error.main, 0.2),
                                                                                                },
                                                                                            }}
                                                                                            onClick={() => handleDeleteClick(user)}
                                                                                        >
                                                                                            <DeleteIcon fontSize="small" />
                                                                                        </IconButton>
                                                                                    </Tooltip>
                                                                                </>
                                                                            )}
                                                                        </Box>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                    ) : (
                                                        <TableRow>
                                                            <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
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
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                        Delete User
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the user &#34;{selectedUser?.user.name}&#34;? This action cannot be undone.
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