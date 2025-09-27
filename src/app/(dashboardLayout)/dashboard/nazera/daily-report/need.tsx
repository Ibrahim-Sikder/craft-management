// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client"

// import { useState, useEffect } from "react"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Typography,
//   Box,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   AppBar,
//   Toolbar,
//   TextField,
//   InputAdornment,
//   Fab,
//   Tooltip,
//   useTheme,
//   useMediaQuery,
//   Tabs,
//   Tab,
//   Avatar,
//   LinearProgress,
// } from "@mui/material"
// import {
//   Visibility,
//   Search,
//   Add,
//   FilterList,
//   Print,
//   Download,
//   Edit,
//   Delete,
//   ArrowBack,
//   Schedule,
//   CheckCircle,
//   Cancel,
// } from "@mui/icons-material"
// import { useGetAllNazeraReportsQuery } from "@/redux/api/nazeraDailyReportApi"

// // Interface based on your backend data structure
// export interface IDailySession {
//   para: string
//   page: string
//   amount: string
//   mistakes: string
// }

// export interface IDayEntry {
//   morning: IDailySession
//   afternoon: IDailySession
//   night: IDailySession
//   totalRead: string
//   duaHadithMasala: string
//   mashq?: string
//   tajweed?: string
// }

// export interface INazeraReport {
//   _id: string
//   teacherName: string
//   studentName: string
//   reportDate: string
//   month: string
//   weeklyTarget: string
//   dailyEntries: {
//     saturday: IDayEntry
//     sunday: IDayEntry
//     monday: IDayEntry
//     tuesday: IDayEntry
//     wednesday: IDayEntry
//     thursday: IDayEntry
//     friday: IDayEntry
//   }
//   totalPages: number
//   totalMistakes: number
//   totalDuas: number
//   totalHadiths: number
//   createdAt: string
//   updatedAt: string
// }

// // Type for session keys
// type SessionKey = keyof Pick<IDayEntry, 'morning' | 'afternoon' | 'night'>;

// function NazeraReportList() {
//   const [reports, setReports] = useState<INazeraReport[]>([])
//   const [filteredReports, setFilteredReports] = useState<INazeraReport[]>([])
//   const [selectedReport, setSelectedReport] = useState<INazeraReport | null>(null)
//   const [viewDialogOpen, setViewDialogOpen] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [tabValue, setTabValue] = useState("all")
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))

//   // Use the query hook - the data will be in the format you showed in console
//   const { data: apiResponse, isLoading, error } = useGetAllNazeraReportsQuery({})

//   useEffect(() => {
//     if (apiResponse?.data) {
//       setReports(apiResponse.data.data)
//       setFilteredReports(apiResponse.data.data)
//     }
//   }, [apiResponse])

//   useEffect(() => {
//     let filtered = reports

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (report) =>
//           report.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           report.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           report.month.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (tabValue !== "all") {
//       filtered = filtered.filter(report => getReportStatus(report) === tabValue)
//     }

//     setFilteredReports(filtered)
//   }, [searchTerm, tabValue, reports])

//   // Calculate report status based on data completeness
//   const getReportStatus = (report: INazeraReport) => {
//     const daysWithData = Object.values(report.dailyEntries).filter(day =>
//       day && (day.morning?.para || day.afternoon?.para || day.night?.para)
//     ).length

//     if (daysWithData === 0) return "not-started"
//     if (daysWithData === 7) return "completed"
//     return "in-progress"
//   }

//   // Calculate progress percentage
//   const getProgressPercentage = (report: INazeraReport) => {
//     const daysWithData = Object.values(report.dailyEntries).filter(day =>
//       day && (day.morning?.para || day.afternoon?.para || day.night?.para)
//     ).length
//     return Math.round((daysWithData / 7) * 100)
//   }

//   const handleViewReport = (report: INazeraReport) => {
//     setSelectedReport(report)
//     setViewDialogOpen(true)
//   }

//   const handleCloseDialog = () => {
//     setViewDialogOpen(false)
//     setSelectedReport(null)
//   }

//   const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
//     setTabValue(newValue)
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "success"
//       case "in-progress":
//         return "warning"
//       case "not-started":
//         return "error"
//       default:
//         return "primary"
//     }
//   }

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircle fontSize="small" />
//       case "in-progress":
//         return <Schedule fontSize="small" />
//       case "not-started":
//         return <Cancel fontSize="small" />
//       default:
//         return undefined
//     }
//   }

//   const formatDate = (dateString: string) => {
//     const options = { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const }
//     return new Date(dateString).toLocaleDateString(undefined, options)
//   }

//   // Convert month number to month name
//   const getMonthName = (monthNumber: string) => {
//     const months = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ]
//     const monthIndex = parseInt(monthNumber) - 1
//     return monthIndex >= 0 && monthIndex < 12 ? months[monthIndex] : `Month ${monthNumber}`
//   }

//   // Calculate weekly totals from daily entries - FIXED VERSION
//   const calculateWeeklyTotals = (dailyEntries: INazeraReport['dailyEntries']) => {
//     let totalPages = 0
//     let totalMistakes = 0
//     let totalDuaHadith = 0

//     // Define the session keys with proper typing
//     const sessionKeys: SessionKey[] = ['morning', 'afternoon', 'night'];

//     Object.values(dailyEntries).forEach(day => {
//       if (!day) return

//       // Sum pages and mistakes from each session using properly typed keys
//       sessionKeys.forEach(session => {
//         if (day[session]?.page) {
//           totalPages += parseInt(day[session].page) || 0
//         }
//         if (day[session]?.mistakes) {
//           totalMistakes += parseInt(day[session].mistakes) || 0
//         }
//       })

//       // Add dua/hadith count
//       if (day.duaHadithMasala) {
//         totalDuaHadith += parseInt(day.duaHadithMasala) || 0
//       }
//     })

//     return { totalPages, totalMistakes, totalDuaHadith }
//   }

//   if (isLoading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <Typography>Loading reports...</Typography>
//       </Box>
//     )
//   }

//   if (error) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <Typography color="error">Error loading reports. Please try again.</Typography>
//       </Box>
//     )
//   }

//   return (
//     <Box sx={{ flexGrow: 1, p: isMobile ? 1 : 3, bgcolor: "#f5f7f9", minHeight: "100vh" }}>
//       <AppBar position="static" color="transparent" elevation={1} sx={{ mb: 3, borderRadius: 2 }}>
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
//             Nazera Reports
//           </Typography>
//           <TextField
//             size="small"
//             placeholder="Search reports..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Search />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ mr: 2, bgcolor: "white" }}
//           />
//           <Tooltip title="Filter">
//             <IconButton>
//               <FilterList />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Print">
//             <IconButton>
//               <Print />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Download">
//             <IconButton>
//               <Download />
//             </IconButton>
//           </Tooltip>
//         </Toolbar>
//       </AppBar>

//       <Paper sx={{ mb: 3, borderRadius: 2 }}>
//         <Tabs
//           value={tabValue}
//           onChange={handleTabChange}
//           indicatorColor="primary"
//           textColor="primary"
//           variant="fullWidth"
//         >
//           <Tab label="All Reports" value="all" />
//           <Tab label="Completed" value="completed" />
//           <Tab label="In Progress" value="in-progress" />
//           <Tab label="Not Started" value="not-started" />
//         </Tabs>
//       </Paper>

//       <Grid container spacing={3}>
//         {filteredReports?.map((report) => {
//           const status = getReportStatus(report)
//           const progress = getProgressPercentage(report)
//           const { totalPages, totalMistakes, totalDuaHadith } = calculateWeeklyTotals(report.dailyEntries)

//           return (
//             <Grid item xs={12} key={report._id}>
//               <Card
//                 sx={{
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                   transition: "transform 0.2s, box-shadow 0.2s",
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
//                   },
//                   borderRadius: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       flexDirection: isMobile ? "column" : "row",
//                     }}
//                   >
//                     <Box sx={{ display: "flex", alignItems: "center", mb: isMobile ? 2 : 0 }}>
//                       <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
//                         {report.studentName.charAt(0)}
//                       </Avatar>
//                       <Box>
//                         <Typography variant="h6" gutterBottom>
//                           {report.studentName}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" gutterBottom>
//                           Teacher: {report.teacherName}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" gutterBottom>
//                           Date: {formatDate(report.reportDate)} | Month: {getMonthName(report.month)}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           Weekly Target: {report.weeklyTarget || "Not set"}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         flexDirection: isMobile ? "row" : "column",
//                         mt: isMobile ? 0 : 0,
//                       }}
//                     >
//                       <Chip
//                         icon={getStatusIcon(status)}
//                         label={status.replace("-", " ")}
//                         color={getStatusColor(status)}
//                         size="small"
//                         sx={{ mr: isMobile ? 1 : 0, mb: isMobile ? 0 : 1 }}
//                       />
//                       <Box sx={{ display: "flex" }}>
//                         <Tooltip title="View Full Report">
//                           <IconButton
//                             size="small"
//                             onClick={() => handleViewReport(report)}
//                             sx={{ ml: 1 }}
//                           >
//                             <Visibility />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Edit Report">
//                           <IconButton size="small" sx={{ ml: 1 }}>
//                             <Edit />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete Report">
//                           <IconButton size="small" sx={{ ml: 1 }}>
//                             <Delete />
//                           </IconButton>
//                         </Tooltip>
//                       </Box>
//                     </Box>
//                   </Box>

//                   {/* Progress Bar */}
//                   <Box sx={{ mt: 2, mb: 2 }}>
//                     <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//                       <Typography variant="body2" color="text.secondary">
//                         Progress
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {progress}%
//                       </Typography>
//                     </Box>
//                     <LinearProgress
//                       variant="determinate"
//                       value={progress}
//                       color={getStatusColor(status)}
//                       sx={{ height: 8, borderRadius: 4 }}
//                     />
//                   </Box>

//                   {/* Summary Stats */}
//                   <Grid container spacing={2} sx={{ mb: 2 }}>
//                     <Grid item xs={6} sm={3}>
//                       <Paper variant="outlined" sx={{ p: 1, textAlign: "center", borderRadius: 2 }}>
//                         <Typography variant="h6" color="primary">
//                           {report.totalPages || totalPages}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           Total Pages
//                         </Typography>
//                       </Paper>
//                     </Grid>
//                     <Grid item xs={6} sm={3}>
//                       <Paper variant="outlined" sx={{ p: 1, textAlign: "center", borderRadius: 2 }}>
//                         <Typography variant="h6" color="error">
//                           {report.totalMistakes || totalMistakes}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           Mistakes
//                         </Typography>
//                       </Paper>
//                     </Grid>
//                     <Grid item xs={6} sm={3}>
//                       <Paper variant="outlined" sx={{ p: 1, textAlign: "center", borderRadius: 2 }}>
//                         <Typography variant="h6" color="success.main">
//                           {(report.totalDuas || 0) + (report.totalHadiths || 0) || totalDuaHadith}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           Dua/Hadith
//                         </Typography>
//                       </Paper>
//                     </Grid>
//                     <Grid item xs={6} sm={3}>
//                       <Paper variant="outlined" sx={{ p: 1, textAlign: "center", borderRadius: 2 }}>
//                         <Typography variant="h6" color="info.main">
//                           {Object.values(report.dailyEntries).filter(day =>
//                             day && (day.morning?.para || day.afternoon?.para || day.night?.para)
//                           ).length}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           Days Completed
//                         </Typography>
//                       </Paper>
//                     </Grid>
//                   </Grid>

//                   {/* Summary Table */}
//                   <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
//                     <Table size="small">
//                       <TableHead>
//                         <TableRow sx={{ bgcolor: "grey.100" }}>
//                           <TableCell>Day</TableCell>
//                           <TableCell>Morning</TableCell>
//                           <TableCell>Afternoon</TableCell>
//                           <TableCell>Night</TableCell>
//                           <TableCell>Total</TableCell>
//                           <TableCell>Dua/Hadith</TableCell>
//                           <TableCell>Teacher</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {Object.entries(report.dailyEntries).map(([day, data]) => (
//                           <TableRow key={day}>
//                             <TableCell sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
//                               {day.slice(0, 3)}
//                             </TableCell>
//                             <TableCell>
//                               {data && data.morning && data.morning.para && data.morning.page
//                                 ? `${data.morning.para}/${data.morning.page}`
//                                 : "-"}
//                             </TableCell>
//                             <TableCell>
//                               {data && data.afternoon && data.afternoon.para && data.afternoon.page
//                                 ? `${data.afternoon.para}/${data.afternoon.page}`
//                                 : "-"}
//                             </TableCell>
//                             <TableCell>
//                               {data && data.night && data.night.para && data.night.page
//                                 ? `${data.night.para}/${data.night.page}`
//                                 : "-"}
//                             </TableCell>
//                             <TableCell>{data && data.totalRead || "-"}</TableCell>
//                             <TableCell>{data && data.duaHadithMasala || "-"}</TableCell>
//                             <TableCell>
//                               {report.teacherName}
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </CardContent>
//               </Card>
//             </Grid>
//           )
//         })}
//       </Grid>

//       {/* View Report Dialog */}
//       <Dialog
//         open={viewDialogOpen}
//         onClose={handleCloseDialog}
//         maxWidth="lg"
//         fullWidth
//         fullScreen={isMobile}
//       >
//         {isMobile && (
//           <AppBar position="static" color="default" elevation={1}>
//             <Toolbar>
//               <IconButton edge="start" onClick={handleCloseDialog} aria-label="close">
//                 <ArrowBack />
//               </IconButton>
//               <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//                 Report Details
//               </Typography>
//             </Toolbar>
//           </AppBar>
//         )}
//         <DialogTitle sx={{ display: isMobile ? "none" : "block", bgcolor: "primary.main", color: "white" }}>
//           Nazera Report Details
//         </DialogTitle>
//         <DialogContent dividers>
//           {selectedReport && (
//             <Box>
//               <Box sx={{ mb: 3 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                   <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
//                     {selectedReport.studentName.charAt(0)}
//                   </Avatar>
//                   <Box>
//                     <Typography variant="h5" gutterBottom>
//                       {selectedReport.studentName}
//                     </Typography>
//                     <Typography variant="body1" gutterBottom>
//                       Teacher: {selectedReport.teacherName}
//                     </Typography>
//                     <Typography variant="body1" gutterBottom>
//                       Date: {formatDate(selectedReport.reportDate)} | Month: {getMonthName(selectedReport.month)}
//                     </Typography>
//                     <Typography variant="body1" gutterBottom>
//                       Weekly Target: {selectedReport.weeklyTarget || "Not set"}
//                     </Typography>
//                   </Box>
//                 </Box>
//                 <Chip
//                   icon={getStatusIcon(getReportStatus(selectedReport))}
//                   label={getReportStatus(selectedReport).replace("-", " ")}
//                   color={getStatusColor(getReportStatus(selectedReport))}
//                   sx={{ mt: 1 }}
//                 />
//               </Box>

//               {/* Full Report Table */}
//               <TableContainer component={Paper} variant="outlined">
//                 <Table>
//                   <TableHead>
//                     <TableRow sx={{ bgcolor: "grey.100" }}>
//                       <TableCell>Day</TableCell>
//                       <TableCell colSpan={4}>Morning</TableCell>
//                       <TableCell colSpan={4}>Afternoon</TableCell>
//                       <TableCell colSpan={4}>Night</TableCell>
//                       <TableCell>Total Read</TableCell>
//                       <TableCell>Dua/Hadith</TableCell>
//                       <TableCell>Mashq</TableCell>
//                       <TableCell>Tajweed</TableCell>
//                       <TableCell>Teacher</TableCell>
//                     </TableRow>
//                     <TableRow sx={{ bgcolor: "grey.50" }}>
//                       <TableCell></TableCell>
//                       {["Para", "Page", "Amount", "Mistakes"].map((header) => (
//                         <TableCell key={`morning-${header}`} sx={{ fontSize: "0.7rem", textAlign: "center" }}>
//                           {header}
//                         </TableCell>
//                       ))}
//                       {["Para", "Page", "Amount", "Mistakes"].map((header) => (
//                         <TableCell key={`afternoon-${header}`} sx={{ fontSize: "0.7rem", textAlign: "center" }}>
//                           {header}
//                         </TableCell>
//                       ))}
//                       {["Para", "Page", "Amount", "Mistakes"].map((header) => (
//                         <TableCell key={`night-${header}`} sx={{ fontSize: "0.7rem", textAlign: "center" }}>
//                           {header}
//                         </TableCell>
//                       ))}
//                       <TableCell></TableCell>
//                       <TableCell></TableCell>
//                       <TableCell></TableCell>
//                       <TableCell></TableCell>
//                       <TableCell></TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {Object.entries(selectedReport.dailyEntries).map(([day, data]) => (
//                       <TableRow key={day}>
//                         <TableCell sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
//                           {day}
//                         </TableCell>
//                         {/* Morning */}
//                         <TableCell>{data && data.morning && data.morning.para || "-"}</TableCell>
//                         <TableCell>{data && data.morning && data.morning.page || "-"}</TableCell>
//                         <TableCell>{data && data.morning && data.morning.amount || "-"}</TableCell>
//                         <TableCell>{data && data.morning && data.morning.mistakes || "-"}</TableCell>
//                         {/* Afternoon */}
//                         <TableCell>{data && data.afternoon && data.afternoon.para || "-"}</TableCell>
//                         <TableCell>{data && data.afternoon && data.afternoon.page || "-"}</TableCell>
//                         <TableCell>{data && data.afternoon && data.afternoon.amount || "-"}</TableCell>
//                         <TableCell>{data && data.afternoon && data.afternoon.mistakes || "-"}</TableCell>
//                         {/* Night */}
//                         <TableCell>{data && data.night && data.night.para || "-"}</TableCell>
//                         <TableCell>{data && data.night && data.night.page || "-"}</TableCell>
//                         <TableCell>{data && data.night && data.night.amount || "-"}</TableCell>
//                         <TableCell>{data && data.night && data.night.mistakes || "-"}</TableCell>
//                         {/* Other fields */}
//                         <TableCell>{data && data.totalRead || "-"}</TableCell>
//                         <TableCell>{data && data.duaHadithMasala || "-"}</TableCell>
//                         <TableCell>{data && data.mashq || "-"}</TableCell>
//                         <TableCell>{data && data.tajweed || "-"}</TableCell>
//                         <TableCell>{selectedReport.teacherName}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               {/* Weekly Summary */}
//               <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
//                 <Typography variant="h6" gutterBottom>
//                   Weekly Summary
//                 </Typography>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="body2">Total Pages:</Typography>
//                     <Typography variant="h6" color="primary">
//                       {selectedReport.totalPages}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="body2">Total Mistakes:</Typography>
//                     <Typography variant="h6" color="error">
//                       {selectedReport.totalMistakes}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="body2">Dua/Hadith Count:</Typography>
//                     <Typography variant="h6" color="success.main">
//                       {(selectedReport.totalDuas || 0) + (selectedReport.totalHadiths || 0)}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="body2">Days Completed:</Typography>
//                     <Typography variant="h6" color="info.main">
//                       {Object.values(selectedReport.dailyEntries).filter(day =>
//                         day && (day.morning?.para || day.afternoon?.para || day.night?.para)
//                       ).length}/7
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Box>
//           )}
//         </DialogContent>
//         {!isMobile && (
//           <DialogActions>
//             <Button onClick={handleCloseDialog}>Close</Button>
//             <Button variant="contained" startIcon={<Print />}>
//               Print
//             </Button>
//           </DialogActions>
//         )}
//       </Dialog>

//       <Fab
//         color="primary"
//         aria-label="add"
//         sx={{
//           position: "fixed",
//           bottom: 16,
//           right: 16,
//         }}
//       >
//         <Add />
//       </Fab>
//     </Box>
//   )
// }

// export default NazeraReportList