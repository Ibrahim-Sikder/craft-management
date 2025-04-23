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


interface Session {
  id: number;
  name: string;
  isCurrent: boolean;
}


// Sample data for sessions
const SAMPLE_SESSIONS = [
  {
    id: 1,
    name: "Academic Year 2025-2026",
    startDate: "2025-08-01",
    endDate: "2026-05-31",
    workingDays: 180,
    holidays: 25,
    isCurrent: true,
    createdAt: "2025-03-15",
  },
  {
    id: 2,
    name: "Academic Year 2024-2025",
    startDate: "2024-08-01",
    endDate: "2025-05-31",
    workingDays: 182,
    holidays: 23,
    isCurrent: false,
    createdAt: "2024-03-10",
  },
  {
    id: 3,
    name: "Summer Session 2024",
    startDate: "2024-06-01",
    endDate: "2024-07-31",
    workingDays: 45,
    holidays: 5,
    isCurrent: false,
    createdAt: "2024-02-20",
  },
  {
    id: 4,
    name: "Academic Year 2023-2024",
    startDate: "2023-08-01",
    endDate: "2024-05-31",
    workingDays: 181,
    holidays: 24,
    isCurrent: false,
    createdAt: "2023-03-12",
  },
  {
    id: 5,
    name: "Winter Session 2023",
    startDate: "2023-12-01",
    endDate: "2024-01-15",
    workingDays: 30,
    holidays: 10,
    isCurrent: false,
    createdAt: "2023-10-05",
  },
]

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
  const [sessions, setSessions] = useState(SAMPLE_SESSIONS)
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


  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
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

  const handleDeleteSession = () => {
    // Check if selectedSession is not null before accessing its id
    if (selectedSession) {
      setSessions(sessions.filter((s) => s.id !== selectedSession.id));
    }
    handleDeleteDialogClose();
  };


  // Handle tab change
  const handleTabChange = (newValue: any) => {
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

  // Filter sessions based on search query and tab
  const filteredSessions = sessions
    .filter((session) => {
      const matchesSearch = session.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTab =
        tabValue === 0 || (tabValue === 1 && session.isCurrent) || (tabValue === 2 && !session.isCurrent)
      return matchesSearch && matchesTab
    })
    .sort((a, b) => {
      const factor = sortDirection === "asc" ? 1 : -1
      if (sortField === "name") {
        return factor * a.name.localeCompare(b.name)
      } else if (sortField === "startDate") {
        return factor * (new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

      } else if (sortField === "endDate") {
        return factor * (new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

      } else if (sortField === "workingDays") {
        return factor * (a.workingDays - b.workingDays)
      } else {
        return factor * (new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

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
                  <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: "text.primary",fontSize: 30 }}>
                    Academic Sessions
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    
                    onClick={() => {
                      setLoading(true)
                      setTimeout(() => setLoading(false), 1000)
                    }}
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
                        <MenuItem onClick={() => handleSortChange("name")}>
                          <ListItemIcon>
                            {sortField === "name" ? (
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
                        href="/session/new"
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
                            {filteredSessions.map((session) => (
                              <Grid item xs={12} sm={6} md={4} key={session.id}>
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
                                              {session.name}
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
                                              href={`/sessions/edit/${session.id}`}
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
                            {filteredSessions.map((session, index) => (
                              <motion.div key={session.id} variants={itemVariants}>
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
                                        {session.name}
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
                                        href={`/sessions/edit/${session.id}`}
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
                          Showing {filteredSessions.length} of {sessions.length} sessions
                        </Typography>

                      </Box>
                    </>
                  )}
                </Box>
              </Paper>

              {/* Context Menu */}
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem
                  component={Link}
                  href={selectedSession ? `/sessions/edit/${selectedSession.id}` : "#"}
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
                      // Set as current session
                      setSessions(
                        sessions.map((s) => ({
                          ...s,
                          isCurrent: s.id === Number(selectedSession?.id),
                        }))
                      );
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
                    Are you sure you want to delete the session &#34;{selectedSession?.name}&#34;? This action cannot be undone.
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

