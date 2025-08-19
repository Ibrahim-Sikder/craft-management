// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import { useState, useEffect } from "react"
// import {
//     Box,
//     Card,
//     CardContent,
//     Typography,
//     Chip,
//     Avatar,
//     IconButton,
//     Menu,
//     MenuItem,
//     TextField,
//     InputAdornment,
//     Grid,
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Divider,
//     List,
//     ListItem,
//     ListItemText,
//     ListItemAvatar,
//     Tabs,
//     Tab,
//     CircularProgress,
// } from "@mui/material"
// import {
//     MoreVert,
//     Search,
//     FilterList,
//     ReportProblem,
//     Person,
//     CalendarToday,
//     Category,
//     Lightbulb,
//     ThumbUp
// } from "@mui/icons-material"
// import { useGetAllFeedbacksQuery } from "@/redux/api/feedbackApi"
// import { useUpdateFeedbackMutation } from "@/redux/api/feedbackApi"
// import FeedbackFormModal from "./_components/FeedbackForm"

// const FeedbackList = () => {
//     const [searchTerm, setSearchTerm] = useState("")
//     const [selectedFeedback, setSelectedFeedback] = useState<any>(null)
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//     const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
//     const [activeTab, setActiveTab] = useState<"all" | "complaint" | "suggestion" | "idea">("all")
//     const { data: feedBackData, isLoading, refetch } = useGetAllFeedbacksQuery({})
//     const [updateFeedback] = useUpdateFeedbackMutation()

//     console.log(feedBackData)

//     // Handle menu actions
//     const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, feedback: any) => {
//         setAnchorEl(event.currentTarget)
//         setSelectedFeedback(feedback)
//     }

//     const handleCloseMenu = () => {
//         setAnchorEl(null)
//     }

//     // Handle feedback type change
//     const handleChangeType = async (newType: "complaint" | "suggestion" | "idea") => {
//         if (!selectedFeedback) return

//         try {
//             await updateFeedback({
//                 id: selectedFeedback._id,
//                 body: { type: newType }
//             }).unwrap()

//             refetch()
//             handleCloseMenu()
//         } catch (error) {
//             console.error("Failed to update feedback type:", error)
//         }
//     }

//     const handleOpenFeedbackModal = () => setFeedbackModalOpen(true)
//     const handleCloseFeedbackModal = () => setFeedbackModalOpen(false)

//     // Get status color
//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case "Resolved":
//                 return "success"
//             case "In Progress":
//                 return "warning"
//             case "Under Review":
//                 return "info"
//             case "Pending":
//                 return "error"
//             default:
//                 return "default"
//         }
//     }

//     // Get priority color
//     const getPriorityColor = (priority: string) => {
//         const priorityLower = priority.toLowerCase();
//         switch (priorityLower) {
//             case "urgent":
//                 return "#d32f2f"
//             case "high":
//                 return "#f44336"
//             case "medium":
//                 return "#ff9800"
//             case "low":
//                 return "#4caf50"
//             default:
//                 return "#757575"
//         }
//     }

//     // Get type icon and color
//     const getTypeDetails = (type: string) => {
//         switch (type.toLowerCase()) {
//             case "complaint":
//                 return { icon: <ReportProblem />, color: "#f44336", label: "Complaint" }
//             case "suggestion":
//                 return { icon: <ThumbUp />, color: "#2196f3", label: "Suggestion" }
//             case "idea":
//                 return { icon: <Lightbulb />, color: "#ffc107", label: "Idea" }
//             default:
//                 return { icon: <ReportProblem />, color: "#757575", label: "Feedback" }
//         }
//     }

//     // Filter feedbacks based on search and active tab
//     const filteredFeedbacks = feedBackData?.data?.feedbacks?.filter((feedback: any) => {
//         const matchesSearch =
//             feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             feedback.description.toLowerCase().includes(searchTerm.toLowerCase())

//         const matchesTab =
//             activeTab === "all" ||
//             feedback.type.toLowerCase() === activeTab

//         return matchesSearch && matchesTab
//     }) || []

//     // Handle tab change
//     const handleTabChange = (event: React.SyntheticEvent, newValue: "all" | "complaint" | "suggestion" | "idea") => {
//         setActiveTab(newValue)
//     }

//     return (
//         <Box>
//             <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
//                 Feedback Management
//                 <Typography variant="subtitle1" color="text.secondary">
//                     প্রতিক্রিয়া ব্যবস্থাপনা
//                 </Typography>
//             </Typography>

//             {/* Add Feedback Button */}
//             <Box sx={{ mb: 3 }}>
//                 <Button
//                     variant="contained"
//                     size="large"
//                     startIcon={<ReportProblem />}
//                     onClick={handleOpenFeedbackModal}
//                     sx={{
//                         background: "linear-gradient(135deg, #2196f3 0%, #0d47a1 100%)",
//                         color: "white",
//                         py: 2,
//                         px: 4,
//                         borderRadius: 3,
//                         fontSize: "1.1rem",
//                         fontWeight: 600,
//                         boxShadow: "0 8px 25px rgba(33, 150, 243, 0.3)",
//                         transition: "all 0.3s ease",
//                         "&:hover": {
//                             transform: "translateY(-2px)",
//                             boxShadow: "0 12px 35px rgba(33, 150, 243, 0.4)",
//                             background: "linear-gradient(135deg, #0d47a1 0%, #002171 100%)",
//                         },
//                     }}
//                 >
//                     Submit New Feedback
//                     <Typography variant="body2" sx={{ ml: 2, opacity: 0.9, fontSize: "0.85rem" }}>
//                         নতুন প্রতিক্রিয়া জমা দিন
//                     </Typography>
//                 </Button>
//             </Box>

//             {/* Tabs for feedback types */}
//             <Tabs
//                 value={activeTab}
//                 onChange={handleTabChange}
//                 sx={{ mb: 3 }}
//                 variant="scrollable"
//                 scrollButtons="auto"
//             >
//                 <Tab label="All Feedback" value="all" />
//                 <Tab label="Complaints" value="complaint" icon={<ReportProblem />} iconPosition="start" />
//                 <Tab label="Suggestions" value="suggestion" icon={<ThumbUp />} iconPosition="start" />
//                 <Tab label="Ideas" value="idea" icon={<Lightbulb />} iconPosition="start" />
//             </Tabs>

//             {/* Search and Filter */}
//             <Card sx={{ mb: 3 }}>
//                 <CardContent>
//                     <Grid container spacing={2} alignItems="center">
//                         <Grid item xs={12} md={8}>
//                             <TextField
//                                 fullWidth
//                                 placeholder="Search feedback..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <Search />
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <Button variant="outlined" startIcon={<FilterList />} fullWidth>
//                                 Filter & Sort
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>

//             {/* Loading State */}
//             {isLoading && (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                     <CircularProgress size={60} />
//                 </Box>
//             )}

//             {/* Feedbacks List */}
//             <Grid container spacing={3}>
//                 {filteredFeedbacks.length === 0 && !isLoading ? (
//                     <Grid item xs={12}>
//                         <Card>
//                             <CardContent sx={{ textAlign: 'center', py: 4 }}>
//                                 <Typography variant="h6" color="textSecondary">
//                                     No feedback found
//                                 </Typography>
//                                 <Typography variant="body1" sx={{ mt: 1 }}>
//                                     {activeTab === "all"
//                                         ? "No feedback submissions yet"
//                                         : `No ${activeTab}s found`}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ) : (
//                     filteredFeedbacks.map((feedback: any) => {
//                         const typeDetails = getTypeDetails(feedback.type)
//                         return (
//                             <Grid item xs={12} key={feedback._id}>
//                                 <Card
//                                     sx={{
//                                         border: `1px solid ${typeDetails.color}30`,
//                                         borderLeft: `4px solid ${typeDetails.color}`,
//                                     }}
//                                 >
//                                     <CardContent>
//                                         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
//                                             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                                                 <Avatar sx={{ backgroundColor: `${typeDetails.color}20`, color: typeDetails.color }}>
//                                                     {typeDetails.icon}
//                                                 </Avatar>
//                                                 <Box>
//                                                     <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                                                         {feedback.title}
//                                                     </Typography>
//                                                     <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: 'wrap' }}>
//                                                         <Chip
//                                                             label={typeDetails.label}
//                                                             size="small"
//                                                             sx={{
//                                                                 backgroundColor: `${typeDetails.color}20`,
//                                                                 color: typeDetails.color
//                                                             }}
//                                                         />
//                                                         <Chip
//                                                             label={feedback.priority.charAt(0).toUpperCase() + feedback.priority.slice(1)}
//                                                             size="small"
//                                                             sx={{
//                                                                 backgroundColor: `${getPriorityColor(feedback.priority)}20`,
//                                                                 color: getPriorityColor(feedback.priority),
//                                                             }}
//                                                         />
//                                                         <Chip label={feedback.category} variant="outlined" size="small" />
//                                                     </Box>
//                                                 </Box>
//                                             </Box>
//                                             <IconButton onClick={(e) => handleOpenMenu(e, feedback)}>
//                                                 <MoreVert />
//                                             </IconButton>
//                                         </Box>

//                                         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                                             {feedback.description}
//                                         </Typography>

//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
//                                             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                                 <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
//                                                 <Typography variant="body2">
//                                                     {new Date(feedback.submittedAt).toLocaleDateString()}
//                                                 </Typography>
//                                             </Box>
//                                             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                                 <Category sx={{ fontSize: 16, color: "text.secondary" }} />
//                                                 <Typography variant="body2">{feedback.department}</Typography>
//                                             </Box>
//                                         </Box>
//                                     </CardContent>
//                                 </Card>
//                             </Grid>
//                         )
//                     })
//                 )}
//             </Grid>

//             {/* Action Menu */}
//             <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleCloseMenu}
//                 anchorOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                 }}
//             >
//                 <Typography variant="subtitle2" sx={{ px: 2, pt: 1, pb: 1, fontWeight: 600 }}>
//                     Change Feedback Type:
//                 </Typography>
//                 <MenuItem onClick={() => handleChangeType("complaint")}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <ReportProblem sx={{ color: '#f44336' }} />
//                         Mark as Complaint
//                     </Box>
//                 </MenuItem>
//                 <MenuItem onClick={() => handleChangeType("suggestion")}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <ThumbUp sx={{ color: '#2196f3' }} />
//                         Mark as Suggestion
//                     </Box>
//                 </MenuItem>
//                 <MenuItem onClick={() => handleChangeType("idea")}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <Lightbulb sx={{ color: '#ffc107' }} />
//                         Mark as Idea
//                     </Box>
//                 </MenuItem>
//                 <Divider />
//                 <MenuItem onClick={handleCloseMenu}>Edit Status</MenuItem>
//                 <MenuItem onClick={handleCloseMenu}>Assign to Department</MenuItem>
//                 <MenuItem onClick={handleCloseMenu}>Add Response</MenuItem>
//                 <MenuItem onClick={handleCloseMenu}>Mark as Resolved</MenuItem>
//             </Menu>

//             {/* Detail Dialog */}
//             <Dialog open={Boolean(selectedFeedback)} onClose={() => setSelectedFeedback(null)} maxWidth="md" fullWidth>
//                 {selectedFeedback && (
//                     <>
//                         <DialogTitle>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                                 <Avatar sx={{
//                                     backgroundColor: `${getTypeDetails(selectedFeedback.type).color}20`,
//                                     color: getTypeDetails(selectedFeedback.type).color
//                                 }}>
//                                     {getTypeDetails(selectedFeedback.type).icon}
//                                 </Avatar>
//                                 <Box>
//                                     <Typography variant="h6">{selectedFeedback.title}</Typography>
//                                     <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
//                                         <Chip
//                                             label={getTypeDetails(selectedFeedback.type).label}
//                                             size="small"
//                                             sx={{
//                                                 backgroundColor: `${getTypeDetails(selectedFeedback.type).color}20`,
//                                                 color: getTypeDetails(selectedFeedback.type).color
//                                             }}
//                                         />
//                                         <Chip
//                                             label={selectedFeedback.priority.charAt(0).toUpperCase() + selectedFeedback.priority.slice(1)}
//                                             size="small"
//                                             sx={{
//                                                 backgroundColor: `${getPriorityColor(selectedFeedback.priority)}20`,
//                                                 color: getPriorityColor(selectedFeedback.priority),
//                                             }}
//                                         />
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         </DialogTitle>
//                         <DialogContent>
//                             <Typography variant="body1" sx={{ mb: 3 }}>
//                                 {selectedFeedback.description}
//                             </Typography>

//                             <Grid container spacing={2} sx={{ mb: 2 }}>
//                                 <Grid item xs={12} md={6}>
//                                     <Typography variant="subtitle2">Department:</Typography>
//                                     <Typography variant="body1">{selectedFeedback.department}</Typography>
//                                 </Grid>
//                                 <Grid item xs={12} md={6}>
//                                     <Typography variant="subtitle2">Category:</Typography>
//                                     <Typography variant="body1">{selectedFeedback.category}</Typography>
//                                 </Grid>
//                                 <Grid item xs={12} md={6}>
//                                     <Typography variant="subtitle2">Submitted:</Typography>
//                                     <Typography variant="body1">
//                                         {new Date(selectedFeedback.submittedAt).toLocaleDateString()}
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={12} md={6}>
//                                     <Typography variant="subtitle2">Attachments:</Typography>
//                                     <Typography variant="body1">
//                                         {selectedFeedback.attachments?.length > 0
//                                             ? `${selectedFeedback.attachments.length} file(s)`
//                                             : 'None'}
//                                     </Typography>
//                                 </Grid>
//                             </Grid>

//                             <Divider sx={{ my: 2 }} />

//                             <Typography variant="h6" sx={{ mb: 2 }}>
//                                 Responses
//                             </Typography>

//                             {selectedFeedback.responses && selectedFeedback.responses.length > 0 ? (
//                                 <List>
//                                     {selectedFeedback.responses.map((response: any, index: number) => (
//                                         <ListItem key={index} alignItems="flex-start">
//                                             <ListItemAvatar>
//                                                 <Avatar>{response.user.charAt(0)}</Avatar>
//                                             </ListItemAvatar>
//                                             <ListItemText
//                                                 primary={response.user}
//                                                 secondary={
//                                                     <>
//                                                         <Typography variant="body2" sx={{ mt: 1 }}>
//                                                             {response.message}
//                                                         </Typography>
//                                                         <Typography variant="caption" color="text.secondary">
//                                                             {response.date}
//                                                         </Typography>
//                                                     </>
//                                                 }
//                                             />
//                                         </ListItem>
//                                     ))}
//                                 </List>
//                             ) : (
//                                 <Typography variant="body2" color="text.secondary">
//                                     No responses yet.
//                                 </Typography>
//                             )}
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={() => setSelectedFeedback(null)}>Close</Button>
//                             <Button variant="contained">Add Response</Button>
//                         </DialogActions>
//                     </>
//                 )}
//             </Dialog>

//             {/* Feedback Form Modal */}
//             <FeedbackFormModal open={feedbackModalOpen} onClose={handleCloseFeedbackModal} />
//         </Box>
//     )
// }

// export default FeedbackList