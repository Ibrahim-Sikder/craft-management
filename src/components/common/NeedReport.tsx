// // components/ReportList/ReportList.tsx
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client"

// import { useState, useEffect } from "react"
// import {
//     CardContent,
//     Typography,
//     Box,
//     Grid,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Chip,
//     IconButton,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     AppBar,
//     Toolbar,
//     TextField,
//     InputAdornment,
//     Fab,
//     Tooltip,
//     useTheme,
//     useMediaQuery,
//     Badge,
//     Avatar,
//     Divider,
//     LinearProgress,
//     Skeleton,
//     alpha,
//     styled,
// } from "@mui/material"
// import {
//     Visibility,
//     Search,
//     Add,
//     Print,
//     Edit,
//     Delete,
//     ArrowBack,
//     Person,
//     CalendarToday,
//     TrendingUp,
//     Assignment,
//     FilterAlt,
//     Refresh,
// } from "@mui/icons-material"
// import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts'
// import Swal from "sweetalert2"
// import { useRouter } from "next/navigation"
// import { COLORS, StyledAppBar, StyledCard, StyledChip, StyledFab, StyledTable } from "@/style/hifzReportStyle"
// import { DailyEntry, Report, ReportListProps } from "@/interface/hifzReport"




// function ReportList({
//     useGetReportsQuery,
//     useDeleteReportMutation,
//     title,
//     createPath,
//     updatePath,
//     reportType,
//     showCharts = true,
//     customColumns = {},
//     customSummaryColumns = {}
// }: ReportListProps) {
//     const router = useRouter()
//     const theme = useTheme()
//     const isMobile = useMediaQuery(theme.breakpoints.down("md"))
//     const { data: reportsData, isLoading, refetch } = useGetReportsQuery({})
//     const [deleteReport] = useDeleteReportMutation()

//     const [reports, setReports] = useState<Report[]>([])
//     const [filteredReports, setFilteredReports] = useState<Report[]>([])
//     const [selectedReport, setSelectedReport] = useState<Report | null>(null)
//     const [viewDialogOpen, setViewDialogOpen] = useState(false)
//     const [searchTerm, setSearchTerm] = useState("")
//     const [filterStatus, setFilterStatus] = useState<string>("all")

//     useEffect(() => {
//         if (reportsData?.data) {
//             setReports(reportsData.data.data)
//             setFilteredReports(reportsData.data.data)
//         }
//     }, [reportsData])

//     useEffect(() => {
//         if (reports.length > 0) {
//             const filtered = reports?.filter(
//                 (report) =>
//                     report.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                     report.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                     report.month.toLowerCase().includes(searchTerm.toLowerCase())
//             )

//             if (filterStatus !== "all") {
//                 // Add status filtering logic if needed
//             }

//             setFilteredReports(filtered)
//         }
//     }, [searchTerm, reports, filterStatus])

//     const handleViewReport = (report: Report) => {
//         setSelectedReport(report)
//         setViewDialogOpen(true)
//     }

//     const handleCloseDialog = () => {
//         setViewDialogOpen(false)
//         setSelectedReport(null)
//     }

//     const handleEditReport = (id: string) => {
//         router.push(`${updatePath}?id=${id}`)
//     }

//     const handleDeleteReport = async (id: string) => {
//         const result = await Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: theme.palette.primary.main,
//             cancelButtonColor: theme.palette.error.main,
//             confirmButtonText: "Yes, delete it!",

//         })

//         if (result.isConfirmed) {
//             try {
//                 await deleteReport(id).unwrap()
//                 Swal.fire({
//                     title: "Deleted!",
//                     text: "Your report has been deleted.",
//                     icon: "success",
//                     confirmButtonColor: theme.palette.primary.main,

//                 })
//                 refetch()
//             } catch (error) {
//                 Swal.fire({
//                     title: "Error!",
//                     text: "Failed to delete the report.",
//                     icon: "error",
//                     confirmButtonColor: theme.palette.primary.main,

//                 })
//             }
//         }
//     }

//     const formatDate = (dateString: string) => {
//         const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
//         return new Date(dateString).toLocaleDateString(undefined, options)
//     }

//     const getDayName = (dayKey: string) => {
//         const days: Record<string, string> = {
//             saturday: "Saturday",
//             sunday: "Sunday",
//             monday: "Monday",
//             tuesday: "Tuesday",
//             wednesday: "Wednesday",
//             thursday: "Thursday",
//             friday: "Friday",
//         }
//         return days[dayKey] || dayKey
//     }

//     const getProgressPercentage = (report: Report) => {
//         const total = report.weeklySummary.totalSobok + report.weeklySummary.totalSatSobok + report.weeklySummary.totalSabakAmukta
//         const target = parseInt(report.weeklyTarget) || 100
//         return Math.min(100, (total / target) * 100)
//     }

//     const getChartData = (report: Report) => {
//         return [
//             { name: 'Sobok', value: report.weeklySummary.totalSobok },
//             { name: 'Sat Sobok', value: report.weeklySummary.totalSatSobok },
//             { name: 'Sabak Amukta', value: report.weeklySummary.totalSabakAmukta },
//             { name: 'Tilawat', value: report.weeklySummary.totalTilawat },
//             { name: 'Revision', value: report.weeklySummary.totalRevision },
//         ]
//     }

//     const getBarChartData = (report: Report) => {
//         return Object.entries(report.dailyEntries).map(([day, data]) => ({
//             name: getDayName(day).substring(0, 3),
//             sobok: parseInt(data.sobok.page) || 0,
//             satSobok: parseInt(data.satSobok.amount) || 0,
//             sabakAmukta: parseInt(data.sabakAmukta.page) || 0,
//             tilawat: parseInt(data.tilawaAmount) || 0,
//         }))
//     }

//     const renderCustomColumn = (day: string, data: DailyEntry, columnKey: string) => {
//         if (customColumns[columnKey]) {
//             return customColumns[columnKey].render({ day, data })
//         }
//         return null
//     }

//     const renderCustomSummaryColumn = (report: Report, columnKey: string) => {
//         if (customSummaryColumns[columnKey]) {
//             return customSummaryColumns[columnKey].render(report)
//         }
//         return null
//     }

//     if (isLoading) {
//         return (
//             <Box sx={{ p: 3 }}>
//                 <StyledAppBar position="static" elevation={0}>
//                     <Toolbar>
//                         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                             {title}
//                         </Typography>
//                         <Skeleton variant="rectangular" width={200} height={36} sx={{ borderRadius: 18, mr: 2 }} />
//                         <Skeleton variant="circular" width={40} height={40} />
//                     </Toolbar>
//                 </StyledAppBar>

//                 <Grid container spacing={3} sx={{ mt: 3 }}>
//                     {[1, 2, 3].map((item) => (
//                         <Grid item xs={12} key={item}>
//                             <StyledCard>
//                                 <CardContent>
//                                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                                         <Skeleton variant="rectangular" width={200} height={28} />
//                                         <Skeleton variant="rectangular" width={100} height={28} />
//                                     </Box>
//                                     <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
//                                     <Skeleton variant="text" width="80%" height={20} sx={{ mb: 2 }} />
//                                     <Skeleton variant="rectangular" width="100%" height={150} />
//                                 </CardContent>
//                             </StyledCard>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Box>
//         )
//     }

//     return (
//         <Box sx={{ flexGrow: 1, p: isMobile ? 1 : 3, background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.secondary.light, 0.05)})`, minHeight: '100vh' }}>
//             <StyledAppBar position="static" elevation={0}>
//                 <Toolbar>
//                     <div

//                     >
//                         <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
//                             {title}
//                         </Typography>
//                     </div>

//                     <div

//                     >
//                         <TextField
//                             size="small"
//                             placeholder="Search reports..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <Search color="primary" />
//                                     </InputAdornment>
//                                 ),
//                                 sx: {
//                                     color: '#fff',
//                                     borderRadius: 24,
//                                     background: alpha(theme.palette.common.white, 0.2),
//                                     '&:hover': {
//                                         background: alpha(theme.palette.common.white, 0.3),
//                                     },
//                                     '& .MuiOutlinedInput-notchedOutline': {
//                                         border: 'none',
//                                     },
//                                 },
//                             }}
//                             sx={{ mr: 2, width: isMobile ? '100%' : 250 }}
//                         />
//                     </div>

//                     <div

//                     >
//                         <Tooltip title="Filter">
//                             <IconButton sx={{ color: 'white' }}>
//                                 <FilterAlt />
//                             </IconButton>
//                         </Tooltip>
//                     </div>

//                     <div

//                     >
//                         <Tooltip title="Refresh">
//                             <IconButton sx={{ color: 'white' }} onClick={() => refetch()}>
//                                 <Refresh />
//                             </IconButton>
//                         </Tooltip>
//                     </div>
//                 </Toolbar>
//             </StyledAppBar>

//             <Grid container spacing={3} sx={{ mt: 3 }}>
//                 {filteredReports.length === 0 ? (
//                     <Grid item xs={12}>
//                         <Box sx={{ textAlign: 'center', py: 8 }}>
//                             <div

//                             >
//                                 <Assignment sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
//                                 <Typography variant="h5" color="text.secondary" gutterBottom>
//                                     No reports found
//                                 </Typography>
//                                 <Typography variant="body1" color="text.secondary">
//                                     Try adjusting your search or create a new report
//                                 </Typography>
//                             </div>
//                         </Box>
//                     </Grid>
//                 ) : (
//                     filteredReports.map((report, index) => (
//                         <Grid item xs={12} key={report._id}>
//                             <div

//                             >
//                                 <StyledCard>
//                                     <CardContent>
//                                         <Box
//                                             sx={{
//                                                 display: "flex",
//                                                 justifyContent: "space-between",
//                                                 alignItems: "flex-start",
//                                                 flexDirection: isMobile ? "column" : "row",
//                                                 mb: 2,
//                                             }}
//                                         >
//                                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                 <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
//                                                     <Person />
//                                                 </Avatar>
//                                                 <Box>
//                                                     <Typography variant="h6" fontWeight="bold" gutterBottom>
//                                                         {report.studentName}
//                                                     </Typography>
//                                                     <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
//                                                         <CalendarToday fontSize="small" sx={{ mr: 0.5 }} />
//                                                         <Typography variant="body2">
//                                                             {formatDate(report.reportDate)}
//                                                         </Typography>
//                                                     </Box>
//                                                 </Box>
//                                             </Box>

//                                             <Box sx={{ display: 'flex', alignItems: 'center', mt: isMobile ? 2 : 0 }}>
//                                                 <StyledChip
//                                                     label={`${getProgressPercentage(report)}% Complete`}
//                                                     color="primary"
//                                                     icon={<TrendingUp />}
//                                                     sx={{ mr: 1 }}
//                                                 />
//                                                 <Tooltip title="View Full Report">
//                                                     <IconButton
//                                                         size="small"
//                                                         onClick={() => handleViewReport(report)}
//                                                         sx={{
//                                                             ml: 1,
//                                                             bgcolor: alpha(theme.palette.primary.main, 0.1),
//                                                             '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
//                                                         }}
//                                                     >
//                                                         <Visibility color="primary" />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                                 <Tooltip title="Edit Report">
//                                                     <IconButton
//                                                         size="small"
//                                                         sx={{
//                                                             ml: 1,
//                                                             bgcolor: alpha(theme.palette.secondary.main, 0.1),
//                                                             '&:hover': { bgcolor: alpha(theme.palette.secondary.main, 0.2) }
//                                                         }}
//                                                         onClick={() => handleEditReport(report._id)}
//                                                     >
//                                                         <Edit color="secondary" />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                                 <Tooltip title="Delete Report">
//                                                     <IconButton
//                                                         size="small"
//                                                         sx={{
//                                                             ml: 1,
//                                                             bgcolor: alpha(theme.palette.error.main, 0.1),
//                                                             '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) }
//                                                         }}
//                                                         onClick={() => handleDeleteReport(report._id)}
//                                                     >
//                                                         <Delete color="error" />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                             </Box>
//                                         </Box>

//                                         <Divider sx={{ mb: 2 }} />

//                                         <Box sx={{ mb: 2 }}>
//                                             <Typography variant="body2" color="text.secondary" gutterBottom>
//                                                 Teacher: {report.teacherName} | Month: {report.month} | Target: {report.weeklyTarget || "Not specified"}
//                                             </Typography>
//                                             <LinearProgress
//                                                 variant="determinate"
//                                                 value={getProgressPercentage(report)}
//                                                 sx={{
//                                                     height: 8,
//                                                     borderRadius: 4,
//                                                     backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                                                     '& .MuiLinearProgress-bar': {
//                                                         borderRadius: 4,
//                                                         background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                                                     }
//                                                 }}
//                                             />
//                                         </Box>

//                                         {/* Summary Table */}
//                                         <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
//                                             <StyledTable size="small">
//                                                 <TableHead>
//                                                     <TableRow>
//                                                         <TableCell sx={{ fontWeight: 'bold' }}>Day</TableCell>
//                                                         <TableCell sx={{ fontWeight: 'bold' }}>Sobok</TableCell>
//                                                         <TableCell sx={{ fontWeight: 'bold' }}>Sat Sobok</TableCell>
//                                                         <TableCell sx={{ fontWeight: 'bold' }}>Sabak Amukta</TableCell>
//                                                         <TableCell sx={{ fontWeight: 'bold' }}>Tilawat</TableCell>
//                                                         <TableCell sx={{ fontWeight: 'bold' }}>Teacher</TableCell>
//                                                         {/* Render custom columns if any */}
//                                                         {Object.keys(customColumns).map((key) => (
//                                                             <TableCell key={key} sx={{ fontWeight: 'bold' }}>
//                                                                 {customColumns[key].label}
//                                                             </TableCell>
//                                                         ))}
//                                                     </TableRow>
//                                                 </TableHead>
//                                                 <TableBody>
//                                                     {Object.entries(report.dailyEntries).map(([day, data]) => (
//                                                         <TableRow key={day}>
//                                                             <TableCell sx={{ textTransform: "capitalize", fontWeight: 'bold' }}>
//                                                                 {getDayName(day)}
//                                                             </TableCell>
//                                                             <TableCell>
//                                                                 {data.sobok.para || '-'}/{data.sobok.page || '-'}
//                                                             </TableCell>
//                                                             <TableCell>
//                                                                 {data.satSobok.para || '-'}/{data.satSobok.page || '-'}
//                                                             </TableCell>
//                                                             <TableCell>
//                                                                 {data.sabakAmukta.para || '-'}/{data.sabakAmukta.page || '-'}
//                                                             </TableCell>
//                                                             <TableCell>{data.tilawaAmount || '-'}</TableCell>
//                                                             <TableCell>{data.teacherSignature || '-'}</TableCell>
//                                                             {/* Render custom columns if any */}
//                                                             {Object.keys(customColumns).map((key) => (
//                                                                 <TableCell key={key}>
//                                                                     {renderCustomColumn(day, data, key)}
//                                                                 </TableCell>
//                                                             ))}
//                                                         </TableRow>
//                                                     ))}
//                                                     <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//                                                         <TableCell sx={{ fontWeight: 'bold' }}>Weekly Totals</TableCell>
//                                                         <TableCell sx={{ fontWeight: 'bold' }}>{report.weeklySummary.totalSobok}</TableCell>
//                                                         <TableCell sx={{ fontWeight: 'bold' }}>{report.weeklySummary.totalSatSobok}</TableCell>
//                                                         <TableCell sx={{ fontWeight: 'bold' }}>{report.weeklySummary.totalSabakAmukta}</TableCell>
//                                                         <TableCell sx={{ fontWeight: 'bold' }}>{report.weeklySummary.totalTilawat}</TableCell>
//                                                         <TableCell sx={{ fontWeight: 'bold' }}>{report.weeklySummary.totalRevision}</TableCell>
//                                                         {/* Render custom summary columns if any */}
//                                                         {Object.keys(customSummaryColumns).map((key) => (
//                                                             <TableCell key={key} sx={{ fontWeight: 'bold' }}>
//                                                                 {renderCustomSummaryColumn(report, key)}
//                                                             </TableCell>
//                                                         ))}
//                                                     </TableRow>
//                                                 </TableBody>
//                                             </StyledTable>
//                                         </TableContainer>
//                                     </CardContent>
//                                 </StyledCard>
//                             </div>
//                         </Grid>
//                     ))
//                 )}
//             </Grid>

//             {/* View Report Dialog */}
//             <Dialog
//                 open={viewDialogOpen}
//                 onClose={handleCloseDialog}
//                 maxWidth="lg"
//                 fullWidth
//                 fullScreen={isMobile}
//                 PaperProps={{
//                     sx: {
//                         borderRadius: isMobile ? 0 : 16,
//                         overflow: 'hidden',
//                     }
//                 }}
//             >
//                 {isMobile ? (
//                     <AppBar position="static" color="default" elevation={0}>
//                         <Toolbar>
//                             <IconButton edge="start" onClick={handleCloseDialog} aria-label="close">
//                                 <ArrowBack />
//                             </IconButton>
//                             <Typography sx={{ ml: 2, flex: 1, fontWeight: 'bold' }} variant="h6" component="div">
//                                 Report Details
//                             </Typography>
//                         </Toolbar>
//                     </AppBar>
//                 ) : (
//                     <DialogTitle sx={{
//                         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                         color: 'white',
//                         py: 3,
//                         px: 4,
//                     }}>
//                         <Typography variant="h5" fontWeight="bold">
//                             Report Details
//                         </Typography>
//                     </DialogTitle>
//                 )}

//                 <DialogContent dividers sx={{ p: 0 }}>
//                     {selectedReport && (
//                         <Box>
//                             <Box sx={{ p: 3, background: alpha(theme.palette.primary.main, 0.02) }}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                                     <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56, mr: 2 }}>
//                                         <Person fontSize="large" />
//                                     </Avatar>
//                                     <Box>
//                                         <Typography variant="h5" fontWeight="bold" gutterBottom>
//                                             {selectedReport.studentName}
//                                         </Typography>
//                                         <Typography variant="body1" color="text.secondary">
//                                             Teacher: {selectedReport.teacherName} | Date: {formatDate(selectedReport.reportDate)} | Month: {selectedReport.month}
//                                         </Typography>
//                                         <Typography variant="body1" color="text.secondary">
//                                             Weekly Target: {selectedReport.weeklyTarget || "Not specified"}
//                                         </Typography>
//                                     </Box>
//                                 </Box>

//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                                     <Box sx={{ flexGrow: 1 }}>
//                                         <LinearProgress
//                                             variant="determinate"
//                                             value={getProgressPercentage(selectedReport)}
//                                             sx={{
//                                                 height: 10,
//                                                 borderRadius: 5,
//                                                 backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                                                 '& .MuiLinearProgress-bar': {
//                                                     borderRadius: 5,
//                                                     background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                                                 }
//                                             }}
//                                         />
//                                     </Box>
//                                     <Typography variant="body2" fontWeight="bold" sx={{ ml: 2 }}>
//                                         {getProgressPercentage(selectedReport)}%
//                                     </Typography>
//                                 </Box>
//                             </Box>

//                             <Divider />

//                             {showCharts && (
//                                 <>
//                                     <Box sx={{ p: 3 }}>
//                                         <Grid container spacing={3}>
//                                             <Grid item xs={12} md={6}>
//                                                 <Typography variant="h6" fontWeight="bold" gutterBottom>
//                                                     Weekly Summary
//                                                 </Typography>
//                                                 <ResponsiveContainer width="100%" height={200}>
//                                                     <PieChart>
//                                                         <Pie
//                                                             data={getChartData(selectedReport)}
//                                                             cx="50%"
//                                                             cy="50%"
//                                                             labelLine={false}
//                                                             outerRadius={80}
//                                                             fill="#8884d8"
//                                                             dataKey="value"
//                                                             label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                                                         >
//                                                             {getChartData(selectedReport).map((entry, index) => (
//                                                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                                             ))}
//                                                         </Pie>
//                                                         <RechartsTooltip />
//                                                     </PieChart>
//                                                 </ResponsiveContainer>
//                                             </Grid>

//                                             <Grid item xs={12} md={6}>
//                                                 <Typography variant="h6" fontWeight="bold" gutterBottom>
//                                                     Daily Progress
//                                                 </Typography>
//                                                 <ResponsiveContainer width="100%" height={200}>
//                                                     <BarChart
//                                                         data={getBarChartData(selectedReport)}
//                                                         margin={{
//                                                             top: 5,
//                                                             right: 30,
//                                                             left: 20,
//                                                             bottom: 5,
//                                                         }}
//                                                     >
//                                                         <CartesianGrid strokeDasharray="3 3" />
//                                                         <XAxis dataKey="name" />
//                                                         <YAxis />
//                                                         <RechartsTooltip />
//                                                         <Legend />
//                                                         <Bar dataKey="sobok" fill="#0088FE" name="Sobok" />
//                                                         <Bar dataKey="satSobok" fill="#00C49F" name="Sat Sobok" />
//                                                         <Bar dataKey="sabakAmukta" fill="#FFBB28" name="Sabak Amukta" />
//                                                         <Bar dataKey="tilawat" fill="#FF8042" name="Tilawat" />
//                                                     </BarChart>
//                                                 </ResponsiveContainer>
//                                             </Grid>
//                                         </Grid>
//                                     </Box>
//                                     <Divider />
//                                 </>
//                             )}

//                             <Box sx={{ p: 3 }}>
//                                 <Typography variant="h6" fontWeight="bold" gutterBottom>
//                                     Detailed Daily Entries
//                                 </Typography>
//                                 <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
//                                     <StyledTable>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>Day</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>Sobok</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>Sabak Seven</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>Sabak Amukta</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>Sat Sobok</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>Tilawat</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>Mashq</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>Tajweed</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>Teacher</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>Revision</TableCell>
//                                                 {/* Render custom columns if any */}
//                                                 {Object.keys(customColumns).map((key) => (
//                                                     <TableCell key={key} sx={{ fontWeight: 'bold' }}>
//                                                         {customColumns[key].label}
//                                                     </TableCell>
//                                                 ))}
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {Object.entries(selectedReport.dailyEntries).map(([day, data]) => (
//                                                 <TableRow key={day}>
//                                                     <TableCell sx={{ textTransform: "capitalize", fontWeight: 'bold' }}>
//                                                         {getDayName(day)}
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         {data.sobok.para || '-'}/{data.sobok.page || '-'}
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         {data.sabakSeven.para || '-'}/{data.sabakSeven.page || '-'}
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         {data.sabakAmukta.para || '-'}/{data.sabakAmukta.page || '-'}
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         {data.satSobok.para || '-'}/{data.satSobok.page || '-'}/{data.satSobok.amount || '-'}/{data.satSobok.wrong || '-'}
//                                                     </TableCell>
//                                                     <TableCell>{data.tilawaAmount || '-'}</TableCell>
//                                                     <TableCell>{data.mashq || '-'}</TableCell>
//                                                     <TableCell>{data.tajweed || '-'}</TableCell>
//                                                     <TableCell>{data.teacherSignature || '-'}</TableCell>
//                                                     <TableCell>{data.thursdayWeeklyRevision || '-'}</TableCell>
//                                                     {/* Render custom columns if any */}
//                                                     {Object.keys(customColumns).map((key) => (
//                                                         <TableCell key={key}>
//                                                             {renderCustomColumn(day, data, key)}
//                                                         </TableCell>
//                                                     ))}
//                                                 </TableRow>
//                                             ))}
//                                             <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>Weekly Totals</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>{selectedReport.weeklySummary.totalSobok}</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>-</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>{selectedReport.weeklySummary.totalSabakAmukta}</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>{selectedReport.weeklySummary.totalSatSobok}</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>{selectedReport.weeklySummary.totalTilawat}</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>-</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>-</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>-</TableCell>
//                                                 <TableCell sx={{ fontWeight: 'bold' }}>{selectedReport.weeklySummary.totalRevision}</TableCell>
//                                                 {/* Render custom summary columns if any */}
//                                                 {Object.keys(customSummaryColumns).map((key) => (
//                                                     <TableCell key={key} sx={{ fontWeight: 'bold' }}>
//                                                         {renderCustomSummaryColumn(selectedReport, key)}
//                                                     </TableCell>
//                                                 ))}
//                                             </TableRow>
//                                         </TableBody>
//                                     </StyledTable>
//                                 </TableContainer>
//                             </Box>
//                         </Box>
//                     )}
//                 </DialogContent>

//                 {!isMobile && (
//                     <DialogActions sx={{ p: 3, background: alpha(theme.palette.primary.main, 0.02) }}>
//                         <Button
//                             onClick={handleCloseDialog}
//                             variant="outlined"
//                             sx={{ borderRadius: 24, px: 3 }}
//                         >
//                             Close
//                         </Button>
//                         <Button
//                             variant="contained"
//                             startIcon={<Print />}
//                             sx={{
//                                 borderRadius: 24,
//                                 px: 3,
//                                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                             }}
//                         >
//                             Print Report
//                         </Button>
//                     </DialogActions>
//                 )}
//             </Dialog>

//             <StyledFab
//                 color="primary"
//                 aria-label="add"
//                 onClick={() => router.push(createPath)}
//             >
//                 <Add />
//             </StyledFab>
//         </Box>
//     )
// }

// export default ReportList