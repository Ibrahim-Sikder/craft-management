/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  Divider,
  Avatar,
  Badge,
  Tabs,
  Tab,
  CircularProgress,
  useTheme,
  useMediaQuery,
  alpha,
  Fade,
  ThemeProvider,
  Pagination,
} from "@mui/material"
import {
  School,
  Search,
  FilterList,
  Add,
  Edit,
  Delete,
  MoreVert,
  CalendarMonth,
  CheckCircle,
  RadioButtonUnchecked,
  Sort,
  Download,
  Refresh,
  ArrowUpward,
  ArrowDownward,
  ViewList,
  ViewModule,
  Info,
  Event,
} from "@mui/icons-material"
import Link from "next/link"
import { motion } from "framer-motion"
import { useDeleteSessionMutation, useGetAllSessionsQuery } from "@/redux/api/sessionApi"

interface Session {
  _id: string;
  sessionName: string;
  isCurrent: boolean;
  startDate: string;
  endDate: string;
  workingDays: number;
  holidays: number;
  createdAt: string;
  updatedAt: string;
}

// Format date for display
const formatDate = (dateString: any) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function SessionList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isMedium = useMediaQuery(theme.breakpoints.down("md"))

  // State management
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [tabValue, setTabValue] = useState(0)
  const [sortField, setSortField] = useState("createdAt")
  const [sortDirection, setSortDirection] = useState("desc")
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)
  const [filterAnchorEl, setFilterAnchorEl] = useState(null)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [refreshKey, setRefreshKey] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteSession] = useDeleteSessionMutation()
  // Fetch data from backend
  const {data: sessionData, isLoading, refetch} = useGetAllSessionsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })

  // Extract sessions from session data
  const sessions = sessionData?.data?.sessions || []
  const totalSessions = sessionData?.data?.meta?.total || 0
  const totalPages = Math.ceil(totalSessions / rowsPerPage)

  // Update search term when search query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchQuery)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Update loading state based on isLoading
  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  const handleRefresh = () => {
    setLoading(true)
    refetch().then(() => {
      setLoading(false)
    })
  }

  // Handle menu opening
  const handleMenuOpen = (event: any, session: any) => {
    setAnchorEl(event.currentTarget)
    setSelectedSession(session)
  }

  // Handle menu closing
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // Handle filter menu
  const handleFilterMenuOpen = (event: any) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null)
  }

  // Handle delete dialog
  const handleDeleteDialogOpen = (session: any) => {
    setSelectedSession(session)
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false)
    setSelectedSession(null)
  }

  // const handleDeleteSession = () => {
  //   // Here you would call your delete API
  //   // For now, just close the dialog
  //   handleDeleteDialogClose()
  //   handleRefresh()
  // }

  // Handle tab change
  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue)
  }

  // Handle sort change
  const handleSortChange = (field: any) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Handle page change
  const handlePageChange = (event: any, value: number) => {
    setPage(value - 1)
  }

  // Filter sessions based on tab
  const filteredSessions = sessions
    .filter((session: Session) => {
      const matchesTab =
        tabValue === 0 || (tabValue === 1 && session.isCurrent) || (tabValue === 2 && !session.isCurrent)
      return matchesTab
    })
    .sort((a: Session, b: Session) => {
      const factor = sortDirection === "asc" ? 1 : -1
      if (sortField === "sessionName") {
        return factor * a.sessionName.localeCompare(b.sessionName)
      } else if (sortField === "startDate") {
        return factor * (new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      } else if (sortField === "endDate") {
        return factor * (new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
      } else if (sortField === "workingDays") {
        return factor * (a.workingDays - b.workingDays)
      } else {
        return factor * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      }
    })

  // Animation variants for list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const handleDeleteSession = async () => {
    if (selectedSession) {
      try {
        // Call the delete session mutation with the session ID
        await deleteSession(selectedSession._id).unwrap();
        
        // Close the dialog
        handleDeleteDialogClose();
        
        // Refresh the data to update the UI
        handleRefresh();
      } catch (error) {
        // You could add error handling here, like showing a snackbar
        console.error("Failed to delete session:", error);
      }
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, background: "linear-gradient(to right, #f5f7fa, #ffffff)", minHeight: "100vh", borderRadius: 6 }}>
        <Container maxWidth="xl" sx={{ mt: 0, mb: 8 }}>
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
                  paddingTop: 2
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <School sx={{ color: "black", mr: 0, fontWeight: 700, fontSize: 30 }} />
                  <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: "text.primary", fontSize: 30 }}>
                    Academic Sessions
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={handleRefresh}
                    sx={{ borderRadius: 6 }}
                  >
                    Refresh
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    component={Link}
                    href="/dashboard/super_admin/classes/session/new"
                    sx={{
                      borderRadius: 6,
                      boxShadow: "0 4px 10px rgba(63, 81, 181, 0.25)",
                      "&:hover": {
                        boxShadow: "0 6px 15px rgba(63, 81, 181, 0.35)",
                      },
                    }}
                  >
                    New Session
                  </Button>
                </Box>
              </Box>
              <Paper
                sx={{ borderRadius: 6 }}
              >
                <Box sx={{ p: 3 }}>
                  {/* Search and Actions Bar */}
                  <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>

                    <Grid item xs={12} md={5}>
                      <TextField
                        fullWidth
                        placeholder="Search Sessions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 6,
                          },
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={7}
                      sx={{
                        display: "flex",
                        justifyContent: { xs: "space-between", md: "flex-end" },
                        gap: 1,
                      }}
                    >
                      <Button variant="outlined" startIcon={<Download />} sx={{ borderRadius: 2 }}>
                        Export
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<FilterList />}
                        onClick={handleFilterMenuOpen}
                        sx={{ borderRadius: 2 }}
                      >
                        Filter
                      </Button>
                      <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterMenuClose}>
                        <MenuItem onClick={() => handleSortChange("sessionName")}>
                          <ListItemIcon>
                            {sortField === "sessionName" ? (
                              sortDirection === "asc" ? (
                                <ArrowUpward fontSize="small" />
                              ) : (
                                <ArrowDownward fontSize="small" />
                              )
                            ) : (
                              <Sort fontSize="small" />
                            )}
                          </ListItemIcon>
                          <ListItemText>Sort by Name</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => handleSortChange("startDate")}>
                          <ListItemIcon>
                            {sortField === "startDate" ? (
                              sortDirection === "asc" ? (
                                <ArrowUpward fontSize="small" />
                              ) : (
                                <ArrowDownward fontSize="small" />
                              )
                            ) : (
                              <Sort fontSize="small" />
                            )}
                          </ListItemIcon>
                          <ListItemText>Sort by Start Date</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => handleSortChange("workingDays")}>
                          <ListItemIcon>
                            {sortField === "workingDays" ? (
                              sortDirection === "asc" ? (
                                <ArrowUpward fontSize="small" />
                              ) : (
                                <ArrowDownward fontSize="small" />
                              )
                            ) : (
                              <Sort fontSize="small" />
                            )}
                          </ListItemIcon>
                          <ListItemText>Sort by Working Days</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => setSortDirection("asc")}>
                          <ListItemIcon>
                            <ArrowUpward fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Ascending</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => setSortDirection("desc")}>
                          <ListItemIcon>
                            <ArrowDownward fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Descending</ListItemText>
                        </MenuItem>
                      </Menu>

                      <Button
                        variant="outlined"
                        startIcon={viewMode === "grid" ? <ViewList /> : <ViewModule />}
                        size="small"
                        onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                        sx={{ borderRadius: 2 }}
                      >
                        {viewMode === "grid" ? "List" : "Grid"}
                      </Button>
                    </Grid>
                  </Grid>

                  {/* Tabs */}
                  <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      aria-label="session tabs"
                      sx={{
                        "& .MuiTab-root": {
                          textTransform: "none",
                          minWidth: 100,
                        },
                      }}
                    >
                      <Tab
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Event sx={{ mr: 1, fontSize: 20 }} />
                            All Sessions
                          </Box>
                        }
                      />
                      <Tab
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CheckCircle sx={{ mr: 1, fontSize: 20 }} />
                            Current
                          </Box>
                        }
                      />
                      <Tab
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <RadioButtonUnchecked sx={{ mr: 1, fontSize: 20 }} />
                            Inactive
                          </Box>
                        }
                      />
                    </Tabs>
                  </Box>

                  {/* Loading State */}
                  {loading ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 400,
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : filteredSessions.length === 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 8,
                        px: 2,
                        textAlign: "center",
                      }}
                    >
                      <CalendarMonth sx={{ fontSize: 60, color: "text.secondary", mb: 2, opacity: 0.5 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        No sessions found
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {searchQuery
                          ? "Try adjusting your search or filters"
                          : "Create your first academic session to get started"}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        component={Link}
                        href="/dashboard/super_admin/classes/session/new"
                        sx={{ borderRadius: 2 }}
                      >
                        Create New Session
                      </Button>
                    </Box>
                  ) : (
                    <>
                      {/* Session List/Grid */}
                      {viewMode === "grid" ? (
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                          <Grid container spacing={3}>
                            {filteredSessions.map((session: Session) => (
                              <Grid item xs={12} sm={6} md={4} key={session._id}>
                                <motion.div variants={itemVariants}>
                                  <Card
                                    variant="outlined"
                                    sx={{
                                      borderRadius: 2,
                                      height: "100%",
                                      transition: "all 0.3s ease",
                                      position: "relative",
                                      "&:hover": {
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                        transform: "translateY(-4px)",
                                      },
                                      ...(session.isCurrent && {
                                        border: `1px solid ${theme.palette.success.main}`,
                                        boxShadow: `0 0 0 1px ${alpha(theme.palette.success.main, 0.2)}`,
                                      }),
                                    }}
                                  >
                                    {session.isCurrent && (
                                      <Badge
                                        sx={{
                                          position: "absolute",
                                          top: 12,
                                          right: 25,
                                          "& .MuiBadge-badge": {
                                            backgroundColor: theme.palette.success.main,
                                            color: theme.palette.success.contrastText,
                                            fontSize: 10,
                                            height: 20,
                                            minWidth: 20,
                                            borderRadius: 10,
                                          },
                                        }}
                                        badgeContent="Current"
                                      />
                                    )}
                                    <CardContent>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <Box sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}>
                                          <Avatar
                                            sx={{
                                              bgcolor: session.isCurrent ? "success.main" : "primary.main",
                                              width: 40,
                                              height: 40,
                                            }}
                                          >
                                            <CalendarMonth />
                                          </Avatar>

                                          <Box sx={{ ml: 2 }}>
                                            <Typography
                                              variant="h6"
                                              sx={{
                                                fontWeight: "medium",
                                                fontSize: "1rem",
                                              }}
                                            >
                                              {session.sessionName}
                                            </Typography>
                                          </Box>
                                        </Box>

                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            mt: 0,
                                          }}
                                        >
                                          <Tooltip title="Edit Session">
                                            <IconButton
                                              size="small"
                                              component={Link}
                                              href={`/dashboard/super_admin/classes/session/edit/${session._id}`}
                                              sx={{ mr: 1 }}
                                            >
                                              <Edit fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="More Options">
                                            <IconButton size="small" onClick={(e) => handleMenuOpen(e, session)}>
                                              <MoreVert fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                        </Box>
                                      </Box>

                                      <Divider sx={{ my: 1.5 }} />

                                      <Grid container spacing={1} sx={{ mt: 1 }}>
                                        <Grid item xs={6}>
                                          <Typography variant="caption" color="text.secondary">
                                            Start Date
                                          </Typography>
                                          <Typography variant="body2">{formatDate(session.startDate)}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Typography variant="caption" color="text.secondary">
                                            End Date
                                          </Typography>
                                          <Typography variant="body2">{formatDate(session.endDate)}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Typography variant="caption" color="text.secondary">
                                            Working Days
                                          </Typography>
                                          <Typography variant="body2">{session.workingDays} days</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Typography variant="caption" color="text.secondary">
                                            Holidays
                                          </Typography>
                                          <Typography variant="body2">{session.holidays} days</Typography>
                                        </Grid>
                                      </Grid>
                                    </CardContent>
                                  </Card>
                                </motion.div>
                              </Grid>
                            ))}
                          </Grid>
                        </motion.div>
                      ) : (
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                          <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
                            {filteredSessions.map((session: Session, index: number) => (
                              <motion.div key={session._id} variants={itemVariants}>
                                <Box
                                  sx={{
                                    p: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    borderBottom: index < filteredSessions.length - 1 ? "1px solid" : "none",
                                    borderColor: "divider",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                      bgcolor: "action.hover",
                                    },
                                    ...(session.isCurrent && {
                                      bgcolor: alpha(theme.palette.success.light, 0.1),
                                    }),
                                  }}
                                >
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Avatar
                                      sx={{
                                        bgcolor: session.isCurrent ? "success.main" : "primary.main",
                                        width: 40,
                                        height: 40,
                                      }}
                                    >
                                      <CalendarMonth />
                                    </Avatar>
                                    <Box sx={{ ml: 2 }}>
                                      <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                                        {session.sessionName}
                                      </Typography>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          flexWrap: "wrap",
                                          gap: 2,
                                          mt: 0.5,
                                        }}
                                      >
                                        <Typography variant="body2" color="text.secondary">
                                          {formatDate(session.startDate)} - {formatDate(session.endDate)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                          {session.workingDays} working days
                                        </Typography>
                                        {session.isCurrent && (
                                          <Chip label="Current" size="small" color="success" sx={{ height: 20 }} />
                                        )}
                                      </Box>
                                    </Box>
                                  </Box>
                                  <Box>
                                    <Tooltip title="Edit Session">
                                      <IconButton
                                        size="small"
                                        component={Link}
                                        href={`/dashboard/super_admin/classes/session/edit/${session._id}`}
                                        sx={{ mr: 1 }}
                                      >
                                        <Edit fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Session">
                                      <IconButton size="small" onClick={() => handleDeleteDialogOpen(session)} sx={{ mr: 1 }}>
                                        <Delete fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="More Options">
                                      <IconButton size="small" onClick={(e) => handleMenuOpen(e, session)}>
                                        <MoreVert fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </Box>
                              </motion.div>
                            ))}
                          </Paper>
                        </motion.div>
                      )}

                      {/* Pagination or Summary */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 3,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Showing {filteredSessions.length} of {totalSessions} sessions
                        </Typography>
                        <Pagination 
                          count={totalPages} 
                          page={page + 1} 
                          onChange={handlePageChange}
                          color="primary"
                          variant="outlined"
                          shape="rounded"
                        />
                      </Box>
                    </>
                  )}
                </Box>
              </Paper>

              {/* Context Menu */}
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem
                  component={Link}
                  href={selectedSession ? `/dashboard/super_admin/classes/session/edit/${selectedSession._id}` : "#"}
                  onClick={handleMenuClose}
                >
                  <ListItemIcon>
                    <Edit fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit Session</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleDeleteDialogOpen(selectedSession)}>
                  <ListItemIcon>
                    <Delete fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Delete Session</ListItemText>
                </MenuItem>
                {selectedSession && !selectedSession.isCurrent && (
                  <MenuItem
                    onClick={() => {
                      // Here you would call your API to set as current
                      handleMenuClose();
                    }}
                  >
                    <ListItemIcon>
                      <CheckCircle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Set as Current</ListItemText>
                  </MenuItem>
                )}

                <MenuItem
                  onClick={() => {
                    // View details (would navigate to details page)
                    handleMenuClose()
                  }}
                >
                  <ListItemIcon>
                    <Info fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>View Details</ListItemText>
                </MenuItem>
              </Menu>

              {/* Delete Confirmation Dialog */}
              <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Delete Academic Session?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete the session &#34;{selectedSession?.sessionName}&#34;? This action cannot be undone.
                    {selectedSession?.isCurrent && (
                      <Box sx={{ mt: 2, color: "error.main" }}>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          Warning: This is the current active session.
                        </Typography>
                      </Box>
                    )}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeleteDialogClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleDeleteSession} color="error" variant="contained" autoFocus>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  )
}