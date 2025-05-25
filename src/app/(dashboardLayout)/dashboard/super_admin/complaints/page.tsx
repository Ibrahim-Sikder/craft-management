// "use client"

// import { useState, useMemo } from "react"
// import {
//   Box,
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   IconButton,
//   Avatar,
//   Chip,
//   Button,
//   TextField,
//   InputAdornment,
//   Fab,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   Paper,
//   Divider,
//   alpha,
//   useTheme,
//   Fade,
//   Slide,
//   Zoom,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Rating,
//   LinearProgress,
//   Stepper,
//   Step,
//   StepLabel,
//   StepContent,
//   Menu,
// } from "@mui/material"
// import {
//   Feedback as FeedbackIcon,
//   Search as SearchIcon,
//   Add as AddIcon,
//   ThumbUp as ThumbUpIcon,
//   ThumbDown as ThumbDownIcon,
//   Comment as CommentIcon,
//   Visibility as ViewIcon,
//   MoreVert as MoreVertIcon,
//   CheckCircle as CheckCircleIcon,
//   School as SchoolIcon,
//   Restaurant as RestaurantIcon,
//   DirectionsBus as BusIcon,
//   LocalLibrary as LibraryIcon,
//   Sports as SportsIcon,
//   Security as SecurityIcon,
//   Build as MaintenanceIcon,
//   Send as SendIcon,
//   AttachFile as AttachFileIcon,
//   Star as StarIcon,
//   Analytics as AnalyticsIcon,
// } from "@mui/icons-material"
// import { format } from "date-fns"

// const SuggestionsComplaintsPage = () => {
//   const theme = useTheme()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filterType, setFilterType] = useState("all")
//   const [filterStatus, setFilterStatus] = useState("all")
//   const [filterCategory, setFilterCategory] = useState("all")
//   const [selectedItem, setSelectedItem] = useState<any>(null)
//   const [detailsOpen, setDetailsOpen] = useState(false)
//   const [newSubmissionOpen, setNewSubmissionOpen] = useState(false)
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

//   // Mock data
//   const submissions = [
//     {
//       id: 1,
//       type: "suggestion",
//       title: "Improve Library Study Hours",
//       description:
//         "I suggest extending library hours until 8 PM to help students with their studies, especially during exam periods.",
//       category: "Library",
//       submitter: "Ahmed Hassan",
//       submitterAvatar: "/placeholder.svg?height=40&width=40",
//       submitterRole: "Student",
//       submitDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
//       status: "under_review",
//       priority: "medium",
//       upvotes: 45,
//       downvotes: 3,
//       comments: 12,
//       rating: 4.5,
//       assignedTo: "Library Committee",
//       estimatedResolution: "2 weeks",
//       attachments: [],
//       updates: [
//         {
//           date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
//           message: "Suggestion forwarded to library committee for review",
//           author: "Admin",
//         },
//       ],
//     },
//     {
//       id: 2,
//       type: "complaint",
//       title: "Cafeteria Food Quality Issues",
//       description:
//         "The food quality in the cafeteria has been declining. Many students are getting sick after eating. Please address this urgent matter.",
//       category: "Cafeteria",
//       submitter: "Fatima Khan",
//       submitterAvatar: "/placeholder.svg?height=40&width=40",
//       submitterRole: "Parent",
//       submitDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
//       status: "in_progress",
//       priority: "high",
//       upvotes: 78,
//       downvotes: 2,
//       comments: 23,
//       rating: 2.1,
//       assignedTo: "Health & Safety Team",
//       estimatedResolution: "1 week",
//       attachments: ["food_photos.jpg"],
//       updates: [
//         {
//           date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
//           message: "Health inspection scheduled for tomorrow",
//           author: "Health Officer",
//         },
//         {
//           date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
//           message: "New food supplier being evaluated",
//           author: "Admin",
//         },
//       ],
//     },
//     {
//       id: 3,
//       type: "suggestion",
//       title: "Add More Sports Equipment",
//       description:
//         "Our sports department needs more equipment for basketball and football. This will help students participate more actively in sports.",
//       category: "Sports",
//       submitter: "Mohammad Ali",
//       submitterAvatar: "/placeholder.svg?height=40&width=40",
//       submitterRole: "Teacher",
//       submitDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
//       status: "resolved",
//       priority: "low",
//       upvotes: 32,
//       downvotes: 1,
//       comments: 8,
//       rating: 4.2,
//       assignedTo: "Sports Department",
//       estimatedResolution: "Completed",
//       attachments: ["equipment_list.pdf"],
//       updates: [
//         {
//           date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
//           message: "New sports equipment purchased and delivered",
//           author: "Sports Coordinator",
//         },
//       ],
//     },
//     {
//       id: 4,
//       type: "complaint",
//       title: "School Bus Timing Issues",
//       description:
//         "The school bus is frequently late, causing students to miss first period classes. This needs immediate attention.",
//       category: "Transportation",
//       submitter: "Sarah Ahmed",
//       submitterAvatar: "/placeholder.svg?height=40&width=40",
//       submitterRole: "Parent",
//       submitDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
//       status: "pending",
//       priority: "high",
//       upvotes: 56,
//       downvotes: 0,
//       comments: 15,
//       rating: 1.8,
//       assignedTo: "Transport Manager",
//       estimatedResolution: "3 days",
//       attachments: [],
//       updates: [],
//     },
//   ]

//   const getCategoryIcon = (category: string) => {
//     switch (category.toLowerCase()) {
//       case "library":
//         return <LibraryIcon fontSize="small" />
//       case "cafeteria":
//         return <RestaurantIcon fontSize="small" />
//       case "sports":
//         return <SportsIcon fontSize="small" />
//       case "transportation":
//         return <BusIcon fontSize="small" />
//       case "academic":
//         return <SchoolIcon fontSize="small" />
//       case "security":
//         return <SecurityIcon fontSize="small" />
//       case "maintenance":
//         return <MaintenanceIcon fontSize="small" />
//       default:
//         return <FeedbackIcon fontSize="small" />
//     }
//   }

//   const getCategoryColor = (category: string) => {
//     switch (category.toLowerCase()) {
//       case "library":
//         return theme.palette.info.main
//       case "cafeteria":
//         return theme.palette.warning.main
//       case "sports":
//         return theme.palette.success.main
//       case "transportation":
//         return theme.palette.primary.main
//       case "academic":
//         return theme.palette.secondary.main
//       case "security":
//         return theme.palette.error.main
//       case "maintenance":
//         return theme.palette.grey[600]
//       default:
//         return theme.palette.grey[500]
//     }
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "pending":
//         return theme.palette.warning.main
//       case "under_review":
//         return theme.palette.info.main
//       case "in_progress":
//         return theme.palette.primary.main
//       case "resolved":
//         return theme.palette.success.main
//       case "rejected":
//         return theme.palette.error.main
//       default:
//         return theme.palette.grey[500]
//     }
//   }

//   const getStatusLabel = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "Pending"
//       case "under_review":
//         return "Under Review"
//       case "in_progress":
//         return "In Progress"
//       case "resolved":
//         return "Resolved"
//       case "rejected":
//         return "Rejected"
//       default:
//         return "Unknown"
//     }
//   }

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "high":
//         return theme.palette.error.main
//       case "medium":
//         return theme.palette.warning.main
//       case "low":
//         return theme.palette.success.main
//       default:
//         return theme.palette.grey[500]
//     }
//   }

//   const filteredSubmissions = useMemo(() => {
//     return submissions
//       .filter((submission) => {
//         const matchesSearch =
//           submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           submission.description.toLowerCase().includes(searchTerm.toLowerCase())
//         const matchesType = filterType === "all" || submission.type === filterType
//         const matchesStatus = filterStatus === "all" || submission.status === filterStatus
//         const matchesCategory =
//           filterCategory === "all" || submission.category.toLowerCase() === filterCategory.toLowerCase()
//         return matchesSearch && matchesType && matchesStatus && matchesCategory
//       })
//       .sort((a, b) => b.submitDate.getTime() - a.submitDate.getTime())
//   }, [searchTerm, filterType, filterStatus, filterCategory])

//   const stats = {
//     total: submissions.length,
//     suggestions: submissions.filter((s) => s.type === "suggestion").length,
//     complaints: submissions.filter((s) => s.type === "complaint").length,
//     resolved: submissions.filter((s) => s.status === "resolved").length,
//     pending: submissions.filter((s) => s.status === "pending").length,
//   }

//   return (
//     <Container maxWidth="xl" sx={{ py: 4 }}>
//       {/* Header Section */}
//       <Box sx={{ mb: 4 }}>
//         <Fade in timeout={800}>
//           <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <Box
//                 sx={{
//                   p: 2,
//                   borderRadius: 3,
//                   background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.primary.main} 100%)`,
//                   color: "white",
//                   boxShadow: `0 8px 32px ${alpha(theme.palette.info.main, 0.3)}`,
//                 }}
//               >
//                 <FeedbackIcon sx={{ fontSize: 32 }} />
//               </Box>
//               <Box>
//                 <Typography
//                   variant="h4"
//                   fontWeight={700}
//                   sx={{
//                     background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.primary.main} 100%)`,
//                     backgroundClip: "text",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                   }}
//                 >
//                   পরামর্শ ও অভিযোগ বক্স
//                 </Typography>
//                 <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 0.5 }}>
//                   Suggestions & Complaints Box
//                 </Typography>
//                 <Typography variant="body1" color="text.secondary">
//                   Share your feedback to help us improve our school
//                 </Typography>
//               </Box>
//             </Box>
//             <Zoom in timeout={1000}>
//               <Fab
//                 color="primary"
//                 onClick={() => setNewSubmissionOpen(true)}
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.primary.main} 100%)`,
//                   boxShadow: `0 8px 32px ${alpha(theme.palette.info.main, 0.3)}`,
//                   "&:hover": {
//                     transform: "scale(1.1)",
//                     boxShadow: `0 12px 40px ${alpha(theme.palette.info.main, 0.4)}`,
//                   },
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 <AddIcon />
//               </Fab>
//             </Zoom>
//           </Box>
//         </Fade>

//         {/* Stats Cards */}
//         <Slide in direction="up" timeout={1000}>
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             {[
//               { label: "Total Submissions", value: stats.total, color: "primary", icon: <AnalyticsIcon /> },
//               { label: "Suggestions", value: stats.suggestions, color: "success", icon: <ThumbUpIcon /> },
//               { label: "Complaints", value: stats.complaints, color: "warning", icon: <ThumbDownIcon /> },
//               { label: "Resolved", value: stats.resolved, color: "info", icon: <CheckCircleIcon /> },
//             ].map((stat, index) => (
//               <Grid item xs={6} md={3} key={index}>
//                 <Card
//                   sx={{
//                     p: 3,
//                     borderRadius: 3,
//                     background: `linear-gradient(135deg, ${alpha(theme.palette[stat.color as keyof typeof theme.palette].main, 0.1)} 0%, ${alpha(theme.palette[stat.color as keyof typeof theme.palette].main, 0.05)} 100%)`,
//                     border: `1px solid ${alpha(theme.palette[stat.color as keyof typeof theme.palette].main, 0.2)}`,
//                     "&:hover": {
//                       transform: "translateY(-4px)",
//                       boxShadow: `0 12px 40px ${alpha(theme.palette[stat.color as keyof typeof theme.palette].main, 0.15)}`,
//                     },
//                     transition: "all 0.3s ease",
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <Box
//                       sx={{
//                         p: 1.5,
//                         borderRadius: 2,
//                         bgcolor: alpha(theme.palette[stat.color as keyof typeof theme.palette].main, 0.1),
//                         color: `${stat.color}.main`,
//                       }}
//                     >
//                       {stat.icon}
//                     </Box>
//                     <Box>
//                       <Typography variant="h4" fontWeight={700} color={`${stat.color}.main`}>
//                         {stat.value}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" fontWeight={600}>
//                         {stat.label}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Slide>

//         {/* Search and Filter Section */}
//         <Slide in direction="up" timeout={1200}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 3,
//               borderRadius: 3,
//               background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
//               border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
//             }}
//           >
//             <Grid container spacing={2} alignItems="center">
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   placeholder="Search suggestions & complaints..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <SearchIcon color="action" />
//                       </InputAdornment>
//                     ),
//                     sx: {
//                       borderRadius: 2,
//                       bgcolor: "background.paper",
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={2}>
//                 <FormControl fullWidth>
//                   <InputLabel>Type</InputLabel>
//                   <Select
//                     value={filterType}
//                     label="Type"
//                     onChange={(e) => setFilterType(e.target.value)}
//                     sx={{ borderRadius: 2, bgcolor: "background.paper" }}
//                   >
//                     <MenuItem value="all">All Types</MenuItem>
//                     <MenuItem value="suggestion">Suggestions</MenuItem>
//                     <MenuItem value="complaint">Complaints</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={2}>
//                 <FormControl fullWidth>
//                   <InputLabel>Status</InputLabel>
//                   <Select
//                     value={filterStatus}
//                     label="Status"
//                     onChange={(e) => setFilterStatus(e.target.value)}
//                     sx={{ borderRadius: 2, bgcolor: "background.paper" }}
//                   >
//                     <MenuItem value="all">All Status</MenuItem>
//                     <MenuItem value="pending">Pending</MenuItem>
//                     <MenuItem value="under_review">Under Review</MenuItem>
//                     <MenuItem value="in_progress">In Progress</MenuItem>
//                     <MenuItem value="resolved">Resolved</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={2}>
//                 <FormControl fullWidth>
//                   <InputLabel>Category</InputLabel>
//                   <Select
//                     value={filterCategory}
//                     label="Category"
//                     onChange={(e) => setFilterCategory(e.target.value)}
//                     sx={{ borderRadius: 2, bgcolor: "background.paper" }}
//                   >
//                     <MenuItem value="all">All Categories</MenuItem>
//                     <MenuItem value="library">Library</MenuItem>
//                     <MenuItem value="cafeteria">Cafeteria</MenuItem>
//                     <MenuItem value="sports">Sports</MenuItem>
//                     <MenuItem value="transportation">Transportation</MenuItem>
//                     <MenuItem value="academic">Academic</MenuItem>
//                     <MenuItem value="security">Security</MenuItem>
//                     <MenuItem value="maintenance">Maintenance</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={2}>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   onClick={() => {
//                     setSearchTerm("")
//                     setFilterType("all")
//                     setFilterStatus("all")
//                     setFilterCategory("all")
//                   }}
//                   sx={{ height: 56, borderRadius: 2 }}
//                 >
//                   Clear Filters
//                 </Button>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Slide>
//       </Box>

//       {/* Submissions List */}
//       <Grid container spacing={3}>
//         {filteredSubmissions.map((submission, index) => (
//           <Grid item xs={12} key={submission.id}>
//             <Slide in direction="up" timeout={800 + index * 100}>
//               <Card
//                 sx={{
//                   borderRadius: 3,
//                   overflow: "hidden",
//                   background: "background.paper",
//                   border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//                   position: "relative",
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
//                   },
//                   transition: "all 0.3s ease",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => {
//                   setSelectedItem(submission)
//                   setDetailsOpen(true)
//                 }}
//               >
//                 {/* Priority Indicator */}
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: 4,
//                     height: "100%",
//                     bgcolor: getPriorityColor(submission.priority),
//                   }}
//                 />

//                 <CardContent sx={{ p: 3 }}>
//                   <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
//                     {/* Type Icon */}
//                     <Box
//                       sx={{
//                         p: 1.5,
//                         borderRadius: 2,
//                         bgcolor:
//                           submission.type === "suggestion"
//                             ? alpha(theme.palette.success.main, 0.1)
//                             : alpha(theme.palette.warning.main, 0.1),
//                         color:
//                           submission.type === "suggestion" ? theme.palette.success.main : theme.palette.warning.main,
//                       }}
//                     >
//                       {submission.type === "suggestion" ? <ThumbUpIcon /> : <ThumbDownIcon />}
//                     </Box>

//                     {/* Content */}
//                     <Box sx={{ flex: 1, minWidth: 0 }}>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, flexWrap: "wrap" }}>
//                         <Typography variant="h6" fontWeight={700} sx={{ flex: 1, minWidth: 0 }}>
//                           {submission.title}
//                         </Typography>
//                         <Chip
//                           icon={getCategoryIcon(submission.category)}
//                           label={submission.category}
//                           size="small"
//                           sx={{
//                             bgcolor: alpha(getCategoryColor(submission.category), 0.1),
//                             color: getCategoryColor(submission.category),
//                             fontWeight: 600,
//                           }}
//                         />
//                         <Chip
//                           label={getStatusLabel(submission.status)}
//                           size="small"
//                           sx={{
//                             bgcolor: alpha(getStatusColor(submission.status), 0.1),
//                             color: getStatusColor(submission.status),
//                             fontWeight: 600,
//                           }}
//                         />
//                       </Box>

//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{
//                           mb: 2,
//                           display: "-webkit-box",
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden",
//                           lineHeight: 1.6,
//                         }}
//                       >
//                         {submission.description}
//                       </Typography>

//                       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                           <Avatar src={submission.submitterAvatar} sx={{ width: 24, height: 24 }} />
//                           <Typography variant="caption" fontWeight={600} color="text.secondary">
//                             {submission.submitter}
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             ({submission.submitterRole})
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             • {format(submission.submitDate, "MMM dd, yyyy")}
//                           </Typography>
//                         </Box>

//                         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                           <Rating value={submission.rating} precision={0.1} size="small" readOnly />
//                           <Typography variant="caption" color="text.secondary">
//                             ({submission.rating})
//                           </Typography>
//                         </Box>
//                       </Box>

//                       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                             <IconButton size="small" color="success">
//                               <ThumbUpIcon fontSize="small" />
//                             </IconButton>
//                             <Typography variant="caption" color="text.secondary">
//                               {submission.upvotes}
//                             </Typography>
//                           </Box>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                             <IconButton size="small" color="error">
//                               <ThumbDownIcon fontSize="small" />
//                             </IconButton>
//                             <Typography variant="caption" color="text.secondary">
//                               {submission.downvotes}
//                             </Typography>
//                           </Box>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                             <CommentIcon sx={{ fontSize: 16, color: "text.secondary" }} />
//                             <Typography variant="caption" color="text.secondary">
//                               {submission.comments} comments
//                             </Typography>
//                           </Box>
//                         </Box>

//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                           <Typography variant="caption" color="text.secondary">
//                             Assigned to: {submission.assignedTo}
//                           </Typography>
//                           <IconButton
//                             size="small"
//                             onClick={(e) => {
//                               e.stopPropagation()
//                               setAnchorEl(e.currentTarget)
//                               setSelectedItem(submission)
//                             }}
//                           >
//                             <MoreVertIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </Box>

//                       {/* Progress Bar for In Progress items */}
//                       {submission.status === "in_progress" && (
//                         <Box sx={{ mt: 2 }}>
//                           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//                             <Typography variant="caption" color="text.secondary">
//                               Progress
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary">
//                               ETA: {submission.estimatedResolution}
//                             </Typography>
//                           </Box>
//                           <LinearProgress
//                             variant="determinate"
//                             value={65}
//                             sx={{
//                               height: 6,
//                               borderRadius: 3,
//                               bgcolor: alpha(theme.palette.primary.main, 0.1),
//                             }}
//                           />
//                         </Box>
//                       )}
//                     </Box>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Slide>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Empty State */}
//       {filteredSubmissions.length === 0 && (
//         <Fade in timeout={1000}>
//           <Box sx={{ textAlign: "center", py: 8 }}>
//             <Box
//               sx={{
//                 width: 120,
//                 height: 120,
//                 borderRadius: "50%",
//                 bgcolor: alpha(theme.palette.info.main, 0.1),
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 mx: "auto",
//                 mb: 3,
//               }}
//             >
//               <FeedbackIcon sx={{ fontSize: 60, color: "info.main" }} />
//             </Box>
//             <Typography variant="h5" fontWeight={600} gutterBottom>
//               No submissions found
//             </Typography>
//             <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mx: "auto" }}>
//               No suggestions or complaints match your current filters. Try adjusting your search criteria.
//             </Typography>
//           </Box>
//         </Fade>
//       )}

//       {/* Action Menu */}
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={() => setAnchorEl(null)}
//         PaperProps={{
//           sx: { borderRadius: 2, minWidth: 200 },
//         }}
//       >
//         <MenuItem onClick={() => setAnchorEl(null)}>
//           <ViewIcon sx={{ mr: 2, fontSize: 20 }} />
//           View Details
//         </MenuItem>
//         <MenuItem onClick={() => setAnchorEl(null)}>
//           <CommentIcon sx={{ mr: 2, fontSize: 20 }} />
//           Add Comment
//         </MenuItem>
//         <MenuItem onClick={() => setAnchorEl(null)}>
//           <StarIcon sx={{ mr: 2, fontSize: 20 }} />
//           Mark Important
//         </MenuItem>
//       </Menu>

//       {/* New Submission Dialog */}
//       <Dialog
//         open={newSubmissionOpen}
//         onClose={() => setNewSubmissionOpen(false)}
//         maxWidth="md"
//         fullWidth
//         PaperProps={{ sx: { borderRadius: 3 } }}
//       >
//         <DialogTitle>
//           <Typography variant="h6" fontWeight={700}>
//             Submit New Feedback
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={3} sx={{ mt: 1 }}>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Type</InputLabel>
//                 <Select label="Type" defaultValue="">
//                   <MenuItem value="suggestion">Suggestion</MenuItem>
//                   <MenuItem value="complaint">Complaint</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Category</InputLabel>
//                 <Select label="Category" defaultValue="">
//                   <MenuItem value="library">Library</MenuItem>
//                   <MenuItem value="cafeteria">Cafeteria</MenuItem>
//                   <MenuItem value="sports">Sports</MenuItem>
//                   <MenuItem value="transportation">Transportation</MenuItem>
//                   <MenuItem value="academic">Academic</MenuItem>
//                   <MenuItem value="security">Security</MenuItem>
//                   <MenuItem value="maintenance">Maintenance</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField fullWidth label="Title" placeholder="Brief title for your feedback" />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Description"
//                 placeholder="Detailed description of your suggestion or complaint"
//                 multiline
//                 rows={4}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button variant="outlined" startIcon={<AttachFileIcon />} sx={{ mr: 2 }}>
//                 Attach Files
//               </Button>
//               <Typography variant="caption" color="text.secondary">
//                 You can attach images, documents, or other relevant files
//               </Typography>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 3 }}>
//           <Button onClick={() => setNewSubmissionOpen(false)}>Cancel</Button>
//           <Button variant="contained" startIcon={<SendIcon />} onClick={() => setNewSubmissionOpen(false)}>
//             Submit Feedback
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Details Dialog */}
//       <Dialog
//         open={detailsOpen}
//         onClose={() => setDetailsOpen(false)}
//         maxWidth="lg"
//         fullWidth
//         PaperProps={{ sx: { borderRadius: 3 } }}
//       >
//         {selectedItem && (
//           <>
//             <DialogTitle>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Box
//                   sx={{
//                     p: 1.5,
//                     borderRadius: 2,
//                     bgcolor:
//                       selectedItem.type === "suggestion"
//                         ? alpha(theme.palette.success.main, 0.1)
//                         : alpha(theme.palette.warning.main, 0.1),
//                     color: selectedItem.type === "suggestion" ? theme.palette.success.main : theme.palette.warning.main,
//                   }}
//                 >
//                   {selectedItem.type === "suggestion" ? <ThumbUpIcon /> : <ThumbDownIcon />}
//                 </Box>
//                 <Box sx={{ flex: 1 }}>
//                   <Typography variant="h6" fontWeight={700}>
//                     {selectedItem.title}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {selectedItem.category} • {format(selectedItem.submitDate, "MMM dd, yyyy")}
//                   </Typography>
//                 </Box>
//                 <Chip
//                   label={getStatusLabel(selectedItem.status)}
//                   sx={{
//                     bgcolor: alpha(getStatusColor(selectedItem.status), 0.1),
//                     color: getStatusColor(selectedItem.status),
//                     fontWeight: 600,
//                   }}
//                 />
//               </Box>
//             </DialogTitle>
//             <DialogContent>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={8}>
//                   <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
//                     {selectedItem.description}
//                   </Typography>

//                   {selectedItem.updates.length > 0 && (
//                     <Box sx={{ mb: 3 }}>
//                       <Typography variant="h6" fontWeight={600} gutterBottom>
//                         Updates & Progress
//                       </Typography>
//                       <Stepper orientation="vertical">
//                         {selectedItem.updates.map((update: any, index: number) => (
//                           <Step key={index} active>
//                             <StepLabel>
//                               <Typography variant="body2" fontWeight={600}>
//                                 {format(update.date, "MMM dd, yyyy")}
//                               </Typography>
//                             </StepLabel>
//                             <StepContent>
//                               <Typography variant="body2" color="text.secondary">
//                                 {update.message}
//                               </Typography>
//                               <Typography variant="caption" color="text.secondary">
//                                 - {update.author}
//                               </Typography>
//                             </StepContent>
//                           </Step>
//                         ))}
//                       </Stepper>
//                     </Box>
//                   )}
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "grey.50" }}>
//                     <Typography variant="subtitle2" fontWeight={600} gutterBottom>
//                       Submission Details
//                     </Typography>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
//                       <Avatar src={selectedItem.submitterAvatar} sx={{ width: 32, height: 32 }} />
//                       <Box>
//                         <Typography variant="body2" fontWeight={600}>
//                           {selectedItem.submitter}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           {selectedItem.submitterRole}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Divider sx={{ my: 2 }} />
//                     <Box sx={{ mb: 2 }}>
//                       <Typography variant="caption" color="text.secondary">
//                         Priority
//                       </Typography>
//                       <Chip
//                         label={selectedItem.priority.toUpperCase()}
//                         size="small"
//                         sx={{
//                           ml: 1,
//                           bgcolor: alpha(getPriorityColor(selectedItem.priority), 0.1),
//                           color: getPriorityColor(selectedItem.priority),
//                           fontWeight: 600,
//                         }}
//                       />
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography variant="caption" color="text.secondary">
//                         Assigned To
//                       </Typography>
//                       <Typography variant="body2" fontWeight={600}>
//                         {selectedItem.assignedTo}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography variant="caption" color="text.secondary">
//                         Estimated Resolution
//                       </Typography>
//                       <Typography variant="body2" fontWeight={600}>
//                         {selectedItem.estimatedResolution}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography variant="caption" color="text.secondary">
//                         Community Rating
//                       </Typography>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                         <Rating value={selectedItem.rating} precision={0.1} size="small" readOnly />
//                         <Typography variant="body2" fontWeight={600}>
//                           {selectedItem.rating}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Paper>
//                 </Grid>
//               </Grid>
//             </DialogContent>
//             <DialogActions sx={{ p: 3 }}>
//               <Button onClick={() => setDetailsOpen(false)}>Close</Button>
//               <Button variant="outlined" startIcon={<CommentIcon />}>
//                 Add Comment
//               </Button>
//               <Button variant="contained" startIcon={<ThumbUpIcon />}>
//                 Upvote
//               </Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
//     </Container>
//   )
// }

// export default SuggestionsComplaintsPage
import React from 'react';

const page = () => {
    return (
        <div>
            
        </div>
    );
};

export default page;