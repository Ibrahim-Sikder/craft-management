/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useMemo } from "react"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  IconButton,
  Avatar,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Fab,
  Badge,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  alpha,
  useTheme,
  Fade,
  Slide,
  Zoom,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material"
import {
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  MarkEmailRead as MarkReadIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Circle as CircleIcon,
  Visibility as VisibilityIcon,
  AttachFile as AttachFileIcon,
} from "@mui/icons-material"
import { format } from "date-fns"

const NotificationsPage = () => {
  const theme = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedNotification, setSelectedNotification] = useState<any>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [newNotificationOpen, setNewNotificationOpen] = useState(false)

  // Mock notifications data
  const initialNotifications = useMemo(
    () => [
      {
        id: 1,
        type: "assignment",
        title: "New Assignment Posted",
        message: "Mathematics homework has been assigned for Class 8",
        sender: "Mrs. Rahman",
        senderAvatar: "/placeholder.svg?height=40&width=40",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: false,
        isStarred: true,
        priority: "high",
        category: "Academic",
      },
      {
        id: 2,
        type: "event",
        title: "School Sports Day",
        message: "Annual sports day will be held on Friday. All students must participate.",
        sender: "Principal",
        senderAvatar: "/placeholder.svg?height=40&width=40",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        isRead: true,
        isStarred: false,
        priority: "medium",
        category: "Events",
      }
    
    ],
    [],
  )

  const getNotificationIcon = (type: string) => {
    const iconProps = { fontSize: "small" as const }
    switch (type) {
      case "assignment":
        return <AssignmentIcon {...iconProps} />
      case "event":
        return <EventIcon {...iconProps} />
      case "warning":
        return <WarningIcon {...iconProps} />
      case "info":
        return <InfoIcon {...iconProps} />
      case "success":
        return <CheckCircleIcon {...iconProps} />
      default:
        return <NotificationsIcon {...iconProps} />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "assignment":
        return theme.palette.primary.main
      case "event":
        return theme.palette.info.main
      case "warning":
        return theme.palette.warning.main
      case "info":
        return theme.palette.info.main
      case "success":
        return theme.palette.success.main
      default:
        return theme.palette.grey[500]
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return theme.palette.error.main
      case "medium":
        return theme.palette.warning.main
      case "low":
        return theme.palette.success.main
      default:
        return theme.palette.grey[500]
    }
  }

  const [notifications, setNotifications] = useState(initialNotifications)

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter =
        filterType === "all" ||
        (filterType === "unread" && !notification.isRead) ||
        (filterType === "starred" && notification.isStarred) ||
        notification.type === filterType
      return matchesSearch && matchesFilter
    })
  }, [searchTerm, filterType, notifications])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Fade in timeout={800}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  color: "white",
                  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              >
                <Badge badgeContent={unreadCount} color="error" max={99}>
                  <NotificationsIcon sx={{ fontSize: 32 }} />
                </Badge>
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Notifications
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Stay updated with all school activities and announcements
                </Typography>
              </Box>
            </Box>
            <Zoom in timeout={1000}>
              <Fab
                color="primary"
                onClick={() => setNewNotificationOpen(true)}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <AddIcon />
              </Fab>
            </Zoom>
          </Box>
        </Fade>

        {/* Search and Filter Section */}
        <Slide in direction="up" timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                        borderColor: alpha(theme.palette.primary.main, 0.2),
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {["all", "unread", "starred", "assignment", "event", "warning"].map((filter) => (
                    <Chip
                      key={filter}
                      label={filter.charAt(0).toUpperCase() + filter.slice(1)}
                      onClick={() => setFilterType(filter)}
                      color={filterType === filter ? "primary" : "default"}
                      variant={filterType === filter ? "filled" : "outlined"}
                      sx={{
                        textTransform: "capitalize",
                        fontWeight: 600,
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                        },
                        transition: "all 0.2s ease",
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Slide>
      </Box>

      {/* Notifications List */}
      <Grid container spacing={3}>
        {filteredNotifications.map((notification, index) => (
          <Grid item xs={12} key={notification.id}>
            <Slide in direction="up" timeout={800 + index * 100}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  background: notification.isRead
                    ? "background.paper"
                    : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
                  border: notification.isRead
                    ? `1px solid ${alpha(theme.palette.divider, 0.1)}`
                    : `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  position: "relative",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                  },
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedNotification(notification)
                  setDetailsOpen(true)
                }}
              >
                {/* Priority Indicator */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 4,
                    height: "100%",
                    bgcolor: getPriorityColor(notification.priority),
                  }}
                />

                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    {/* Notification Icon */}
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: alpha(getNotificationColor(notification.type), 0.1),
                        color: getNotificationColor(notification.type),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {getNotificationIcon(notification.type)}
                    </Box>

                    {/* Notification Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <Typography
                          variant="h6"
                          fontWeight={notification.isRead ? 500 : 700}
                          sx={{
                            color: notification.isRead ? "text.primary" : "primary.main",
                            flex: 1,
                          }}
                        >
                          {notification.title}
                        </Typography>
                        <Chip
                          label={notification.category}
                          size="small"
                          sx={{
                            bgcolor: alpha(getNotificationColor(notification.type), 0.1),
                            color: getNotificationColor(notification.type),
                            fontWeight: 600,
                            fontSize: "0.7rem",
                          }}
                        />
                        {!notification.isRead && <CircleIcon sx={{ color: "primary.main", fontSize: 8 }} />}
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                        {notification.message}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Avatar src={notification.senderAvatar} sx={{ width: 24, height: 24 }} />
                          <Typography variant="caption" fontWeight={600} color="text.secondary">
                            {notification.sender}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            • {format(notification.timestamp, "MMM dd, HH:mm")}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Toggle star
                            }}
                            sx={{
                              color: notification.isStarred ? "warning.main" : "text.secondary",
                              "&:hover": {
                                bgcolor: alpha(theme.palette.warning.main, 0.1),
                              },
                            }}
                          >
                            {notification.isStarred ? (
                              <StarIcon fontSize="small" />
                            ) : (
                              <StarBorderIcon fontSize="small" />
                            )}
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              setAnchorEl(e.currentTarget)
                              setSelectedNotification(notification)
                            }}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <Fade in timeout={1000}>
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 4,
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <NotificationsIcon sx={{ fontSize: 60, color: "primary.main" }} />
            </Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              No notifications found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mx: "auto" }}>
              You're all caught up! Check back later for new notifications and updates.
            </Typography>
          </Box>
        </Fade>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 200,
            boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
          },
        }}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          <MarkReadIcon sx={{ mr: 2, fontSize: 20 }} />
          Mark as Read
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <StarIcon sx={{ mr: 2, fontSize: 20 }} />
          Add to Starred
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: "error.main" }}>
          <DeleteIcon sx={{ mr: 2, fontSize: 20 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Notification Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
       
      >
        {selectedNotification && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(getNotificationColor(selectedNotification.type), 0.1),
                    color: getNotificationColor(selectedNotification.type),
                  }}
                >
                  {getNotificationIcon(selectedNotification.type)}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700}>
                    {selectedNotification.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedNotification.category} • {format(selectedNotification.timestamp, "MMM dd, yyyy HH:mm")}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                {selectedNotification.message}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar src={selectedNotification.senderAvatar} />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {selectedNotification.sender}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Sender
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={() => setDetailsOpen(false)}>Close</Button>
              <Button variant="contained" onClick={() => setDetailsOpen(false)}>
                Mark as Read
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      {/* New Notification Dialog */}
      <Dialog
        open={newNotificationOpen}
        onClose={() => setNewNotificationOpen(false)}
        maxWidth="md"
       
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                color: "white",
              }}
            >
              <NotificationsIcon />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Send New Notification
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Notify students, teachers, and parents about important updates
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Notification Type</InputLabel>
                <Select label="Notification Type" defaultValue="">
                  <MenuItem value="assignment">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AssignmentIcon fontSize="small" />
                      Assignment
                    </Box>
                  </MenuItem>
                  <MenuItem value="event">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <EventIcon fontSize="small" />
                      Event
                    </Box>
                  </MenuItem>
                  <MenuItem value="warning">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <WarningIcon fontSize="small" />
                      Warning
                    </Box>
                  </MenuItem>
                  <MenuItem value="info">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <InfoIcon fontSize="small" />
                      Information
                    </Box>
                  </MenuItem>
                  <MenuItem value="success">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckCircleIcon fontSize="small" />
                      Success
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select label="Priority" defaultValue="medium">
                  <MenuItem value="high">
                    <Chip label="High" size="small" color="error" sx={{ mr: 1 }} />
                    High Priority
                  </MenuItem>
                  <MenuItem value="medium">
                    <Chip label="Medium" size="small" color="warning" sx={{ mr: 1 }} />
                    Medium Priority
                  </MenuItem>
                  <MenuItem value="low">
                    <Chip label="Low" size="small" color="success" sx={{ mr: 1 }} />
                    Low Priority
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Target Audience</InputLabel>
                <Select label="Target Audience" defaultValue="">
                  <MenuItem value="all">All Users</MenuItem>
                  <MenuItem value="students">Students Only</MenuItem>
                  <MenuItem value="teachers">Teachers Only</MenuItem>
                  <MenuItem value="parents">Parents Only</MenuItem>
                  <MenuItem value="staff">Staff Only</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category" defaultValue="">
                  <MenuItem value="academic">Academic</MenuItem>
                  <MenuItem value="events">Events</MenuItem>
                  <MenuItem value="finance">Finance</MenuItem>
                  <MenuItem value="schedule">Schedule</MenuItem>
                  <MenuItem value="results">Results</MenuItem>
                  <MenuItem value="general">General</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notification Title"
                placeholder="Enter a clear and concise title"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notification Message"
                placeholder="Write your notification message here..."
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                <Button variant="outlined" startIcon={<AttachFileIcon />}>
                  Attach Files
                </Button>
                <Button variant="outlined" startIcon={<EventIcon />}>
                  Schedule Send
                </Button>
                <Button variant="outlined" startIcon={<StarIcon />}>
                  Mark Important
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setNewNotificationOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button variant="outlined" startIcon={<VisibilityIcon />}>
            Preview
          </Button>
          <Button
            variant="contained"
            startIcon={<NotificationsIcon />}
            onClick={() => {
              // Handle notification creation
              setNewNotificationOpen(false)
            }}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            }}
          >
            Send Notification
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default NotificationsPage
