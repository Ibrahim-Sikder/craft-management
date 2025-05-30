/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useMemo } from "react"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Avatar,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
  Divider,
  alpha,
  useTheme,
  Fade,
  Slide,
  Zoom,
  CardActions,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material"
import {
  Campaign as CampaignIcon,
  Search as SearchIcon,
  Add as AddIcon,
  PushPin as PinIcon,
  Visibility as ViewIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  MoreVert as MoreVertIcon,
  School as SchoolIcon,
  Sports as SportsIcon,
  LocalLibrary as LibraryIcon,
  Announcement as AnnouncementIcon,
  AttachFile as AttachFileIcon,
  Print as PrintIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material"
import { format } from "date-fns"
import img from "../../../../../assets/img/notice/notice.png"
import Image from "next/image"


const NoticeBoardPage = () => {
  const theme = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [selectedNotice, setSelectedNotice] = useState<any>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [newNoticeOpen, setNewNoticeOpen] = useState(false)

  // Mock notices data
  const initialNotices = [
    {
      id: 1,
      title: "Annual Sports Day 2024",
      content:
        "We are excited to announce our Annual Sports Day will be held on March 15th, 2024. All students are required to participate in various sporting events. Registration forms are available at the school office.",
      category: "Sports",
      author: "Principal",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isPinned: true,
      isStarred: false,
      views: 245,
      attachments: ["sports_day_schedule.pdf", "registration_form.pdf"],
      image: img,
      priority: "high",
    },
    {
      id: 2,
      title: "Mid-Term Examination Schedule",
      content:
        "The mid-term examinations for all classes will commence from April 1st, 2024. Students are advised to prepare well and follow the examination guidelines strictly.",
      category: "Academic",
      author: "Examination Controller",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isPinned: true,
      isStarred: true,
      views: 189,
      attachments: ["exam_schedule.pdf"],
      image: img,
      priority: "high",
    },
    {
      id: 3,
      title: "Library Book Fair",
      content:
        "Join us for our annual book fair in the school library from March 20-25. Discover new books, meet authors, and enjoy special discounts on educational materials.",
      category: "Library",
      author: "Librarian",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      publishDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isPinned: false,
      isStarred: false,
      views: 156,
      attachments: [],
      image: img,
      priority: "medium",
    },
    {
      id: 4,
      title: "Parent-Teacher Meeting",
      content:
        "Monthly parent-teacher meeting is scheduled for March 30th, 2024. Parents are requested to attend and discuss their child's academic progress with respective teachers.",
      category: "General",
      author: "Vice Principal",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      publishDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isPinned: false,
      isStarred: true,
      views: 203,
      attachments: ["meeting_agenda.pdf"],
      image: img,
      priority: "medium",
    },
    {
      id: 5,
      title: "Science Fair 2024",
      content:
        "Students from grades 6-10 are invited to participate in our annual science fair. Submit your innovative projects by March 25th. Prizes will be awarded to outstanding projects.",
      category: "Academic",
      author: "Science Department",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      publishDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      isPinned: false,
      isStarred: false,
      views: 178,
      attachments: ["science_fair_guidelines.pdf"],
      image: img,
      priority: "low",
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "sports":
        return <SportsIcon fontSize="small" />
      case "academic":
        return <SchoolIcon fontSize="small" />
      case "library":
        return <LibraryIcon fontSize="small" />
      case "general":
        return <AnnouncementIcon fontSize="small" />
      default:
        return <CampaignIcon fontSize="small" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "sports":
        return theme.palette.success.main
      case "academic":
        return theme.palette.primary.main
      case "library":
        return theme.palette.info.main
      case "general":
        return theme.palette.warning.main
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

  const [notices, setNotices] = useState(initialNotices)

  const filteredNotices = useMemo(() => {
    return notices
      .filter((notice) => {
        const matchesSearch =
          notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notice.content.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory =
          filterCategory === "all" || notice.category.toLowerCase() === filterCategory.toLowerCase()
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        // Pinned notices first
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        // Then by date
        return b.publishDate.getTime() - a.publishDate.getTime()
      })
  }, [searchTerm, filterCategory, notices])

  const categories = ["all", "academic", "sports", "library", "general"]

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>

      <Box sx={{ mb: 4 }}>
        <Fade in timeout={800}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.error.main} 100%)`,
                  color: "white",
                  boxShadow: `0 8px 32px ${alpha(theme.palette.warning.main, 0.3)}`,
                }}
              >
                <CampaignIcon sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.error.main} 100%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Notice Board
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Stay informed with the latest school announcements and updates
                </Typography>
              </Box>
            </Box>
            <Zoom in timeout={1000}>
              <Fab
                color="primary"
                onClick={() => setNewNoticeOpen(true)}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.error.main} 100%)`,
                  boxShadow: `0 8px 32px ${alpha(theme.palette.warning.main, 0.3)}`,
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: `0 12px 40px ${alpha(theme.palette.warning.main, 0.4)}`,
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
              background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.05)} 0%, ${alpha(theme.palette.error.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search notices..."
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
                        borderColor: alpha(theme.palette.warning.main, 0.2),
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.warning.main,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {categories.map((category) => (
                    <Chip
                      key={category}
                      label={category.charAt(0).toUpperCase() + category.slice(1)}
                      onClick={() => setFilterCategory(category)}
                      color={filterCategory === category ? "primary" : "default"}
                      variant={filterCategory === category ? "filled" : "outlined"}
                      icon={category !== "all" ? getCategoryIcon(category) : undefined}
                      sx={{
                        textTransform: "capitalize",
                        fontWeight: 600,
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: `0 4px 12px ${alpha(theme.palette.warning.main, 0.2)}`,
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

      <Grid container spacing={3}>
        {filteredNotices.map((notice, index) => (
          <Grid item xs={12} md={6} lg={4} key={notice.id}>
            <Slide in direction="up" timeout={800 + index * 100}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  background: "background.paper",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 16px 48px ${alpha(theme.palette.common.black, 0.1)}`,
                  },
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedNotice(notice)
                  setDetailsOpen(true)
                }}
              >
                {/* Priority Indicator */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: getPriorityColor(notice.priority),
                    zIndex: 2,
                  }}
                />

                {/* Pin Indicator */}
                {notice.isPinned && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      zIndex: 2,
                      bgcolor: "error.main",
                      color: "white",
                      borderRadius: 1,
                      p: 0.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PinIcon fontSize="small" />
                  </Box>
                )}

                {/* Notice Image */}



                <Box
                  sx={{
                    background: `linear-gradient(135deg, ${alpha(getCategoryColor(notice.category), 0.1)} 0%, ${alpha(getCategoryColor(notice.category), 0.05)} 100%)`,
                  }}
                >
                  <div className="flex justify-center py-2">
                    <Image
                      src={notice.image}
                      alt={notice.title}
                      width={200}
                      height={100}
                    />
                  </div>
                </Box>


                <CardContent sx={{ p: 3, pb: 1 }}>
                  {/* Category Chip */}
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      icon={getCategoryIcon(notice.category)}
                      label={notice.category}
                      size="small"
                      sx={{
                        bgcolor: alpha(getCategoryColor(notice.category), 0.1),
                        color: getCategoryColor(notice.category),
                        fontWeight: 600,
                        border: `1px solid ${alpha(getCategoryColor(notice.category), 0.2)}`,
                      }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: 1.3,
                    }}
                  >
                    {notice.title}
                  </Typography>

                  {/* Content Preview */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: 1.6,
                    }}
                  >
                    {notice.content}
                  </Typography>

                  {/* Author and Date */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <Avatar src={notice.authorAvatar} sx={{ width: 24, height: 24 }} />
                    <Typography variant="caption" fontWeight={600} color="text.secondary">
                      {notice.author}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      • {format(notice.publishDate, "MMM dd, yyyy")}
                    </Typography>
                  </Box>

                  {/* Attachments */}
                  {notice.attachments.length > 0 && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <AttachFileIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="caption" color="text.secondary">
                        {notice.attachments.length} attachment{notice.attachments.length > 1 ? "s" : ""}
                      </Typography>
                    </Box>
                  )}
                </CardContent>

                <CardActions sx={{ px: 3, pb: 3, pt: 0, justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ViewIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary">
                      {notice.views} views
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Toggle star
                      }}
                      sx={{
                        color: notice.isStarred ? "warning.main" : "text.secondary",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.warning.main, 0.1),
                        },
                      }}
                    >
                      {notice.isStarred ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Share functionality
                      }}
                    >
                      <ShareIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        setAnchorEl(e.currentTarget)
                        setSelectedNotice(notice)
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>


      {filteredNotices.length === 0 && (
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
                bgcolor: alpha(theme.palette.warning.main, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <CampaignIcon sx={{ fontSize: 60, color: "warning.main" }} />
            </Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              No notices found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mx: "auto" }}>
              No notices match your current search criteria. Try adjusting your filters or search terms.
            </Typography>
          </Box>
        </Fade>
      )}

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
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: "error.main" }} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth

      >
        {selectedNotice && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(getCategoryColor(selectedNotice.category), 0.1),
                    color: getCategoryColor(selectedNotice.category),
                  }}
                >
                  {getCategoryIcon(selectedNotice.category)}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700}>
                    {selectedNotice.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedNotice.category} • {format(selectedNotice.publishDate, "MMM dd, yyyy")}
                  </Typography>
                </Box>
                {selectedNotice.isPinned && (
                  <Chip icon={<PinIcon fontSize="small" />} label="Pinned" size="small" color="error" />
                )}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                {selectedNotice.content}
              </Typography>

              {selectedNotice.attachments.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Attachments
                  </Typography>
                  {selectedNotice.attachments.map((attachment: string, index: number) => (
                    <Chip
                      key={index}
                      icon={<AttachFileIcon fontSize="small" />}
                      label={attachment}
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                      onClick={() => {
                        // Download attachment
                      }}
                    />
                  ))}
                </Box>
              )}

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar src={selectedNotice.authorAvatar} />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {selectedNotice.author}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Published on {format(selectedNotice.publishDate, "MMMM dd, yyyy")}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={() => setDetailsOpen(false)}>Close</Button>
              <Button variant="outlined" startIcon={<ShareIcon />}>
                Share
              </Button>
              <Button variant="contained" startIcon={<DownloadIcon />}>
                Download
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog
        open={newNoticeOpen}
        onClose={() => setNewNoticeOpen(false)}
        maxWidth="md"
        fullWidth
      // 
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.error.main} 100%)`,
                color: "white",
              }}
            >
              <CampaignIcon />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Create New Notice
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Share important announcements with the school community
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category" defaultValue="">
                  <MenuItem value="academic">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <SchoolIcon fontSize="small" />
                      Academic
                    </Box>
                  </MenuItem>
                  <MenuItem value="sports">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <SportsIcon fontSize="small" />
                      Sports
                    </Box>
                  </MenuItem>
                  <MenuItem value="library">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LibraryIcon fontSize="small" />
                      Library
                    </Box>
                  </MenuItem>
                  <MenuItem value="general">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AnnouncementIcon fontSize="small" />
                      General
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notice Title"
                placeholder="Enter a clear and descriptive title"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notice Content"
                placeholder="Write the detailed content of your notice..."
                multiline
                rows={6}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="outlined" startIcon={<AttachFileIcon />} fullWidth sx={{ height: 56 }}>
                Upload Image
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="outlined" startIcon={<AttachFileIcon />} fullWidth sx={{ height: 56 }}>
                Attach Files
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PinIcon color="action" />
                <Typography variant="body2" color="text.secondary">
                  Pin this notice to the top of the board
                </Typography>
                <Button variant="outlined" size="small">
                  Pin Notice
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setNewNoticeOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button variant="outlined" startIcon={<VisibilityIcon />}>
            Preview
          </Button>
          <Button
            variant="contained"
            startIcon={<CampaignIcon />}
            onClick={() => {
              // Handle notice creation
              setNewNoticeOpen(false)
            }}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.error.main} 100%)`,
            }}
          >
            Publish Notice
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default NoticeBoardPage
