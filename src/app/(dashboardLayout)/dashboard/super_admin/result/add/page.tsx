// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react/no-unescaped-entities */
// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Paper,
//   Button,
//   Avatar,
//   Chip,
//   ThemeProvider,
//   createTheme,
//   styled,
//   alpha,
//   Tabs,
//   Tab,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   LinearProgress,
//   IconButton,
//   TextField,
//   InputAdornment,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material"
// import {
//   ArrowBack,
//   Download,
//   Print,
//   School,
//   EmojiEvents,
//   Assessment,
//   CalendarMonth,
//   TrendingUp,
//   Search,
//   FilterList,
//   Sort,
//   ArrowUpward,
//   ArrowDownward,
//   Visibility,
// } from "@mui/icons-material"

// // Custom theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#3f51b5", // Indigo
//     },
//     secondary: {
//       main: "#f50057", // Pink
//     },
//     success: {
//       main: "#4caf50", // Green
//     },
//     background: {
//       default: "#f5f7ff",
//     },
//   },
//   typography: {
//     fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
//     h4: {
//       fontWeight: 700,
//     },
//     h6: {
//       fontWeight: 600,
//     },
//     subtitle1: {
//       fontWeight: 500,
//     },
//   },
//   shape: {
//     borderRadius: 10,
//   },
//   components: {
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: "16px",
//           boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: "30px",
//           padding: "8px 20px",
//           textTransform: "none",
//           fontWeight: 600,
//         },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         head: {
//           fontWeight: 600,
//           backgroundColor: alpha("#3f51b5", 0.05),
//         },
//       },
//     },
//   },
// })

// // Custom styled components
// const StyledSearchBar = styled(TextField)(({ theme }) => ({
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "30px",
//     backgroundColor: alpha(theme.palette.common.white, 0.9),
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
//     transition: "all 0.3s ease",
//     "&:hover": {
//       boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
//     },
//     "&.Mui-focused": {
//       boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
//     },
//   },
// }))

// const StyledChip = styled(Chip)(({ theme }) => ({
//   borderRadius: "20px",
//   fontWeight: 600,
//   boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
// }))

// // Mock data for demonstration
// const classData = {
//   name: "Class 8",
//   section: "A",
//   totalStudents: 45,
//   classTeacher: "Mr. Farhan Ahmed",
//   academicYear: "2025-2026",
// }

// const examTypes = [
//   { id: 1, name: "Mid-Term Examination" },
//   { id: 2, name: "Unit Test - 1" },
//   { id: 3, name: "Weekly Quiz" },
// ]

// const subjectPerformance = [
//   { subject: "Mathematics", passPercentage: 87, averageScore: 76, highestScore: 98, lowestScore: 42 },
//   { subject: "Islamic Studies", passPercentage: 92, averageScore: 82, highestScore: 100, lowestScore: 55 },
//   { subject: "Science", passPercentage: 78, averageScore: 68, highestScore: 95, lowestScore: 38 },
//   { subject: "Arabic", passPercentage: 85, averageScore: 74, highestScore: 96, lowestScore: 45 },
//   { subject: "English", passPercentage: 90, averageScore: 79, highestScore: 97, lowestScore: 50 },
//   { subject: "Social Studies", passPercentage: 82, averageScore: 72, highestScore: 94, lowestScore: 40 },
//   { subject: "Computer Science", passPercentage: 95, averageScore: 85, highestScore: 100, lowestScore: 60 },
// ]

// const studentPerformance = [
//   {
//     id: 1,
//     name: "Ahmed Khan",
//     rollNo: "C8-001",
//     avatar: "/placeholder.svg?height=40&width=40",
//     totalMarks: 590,
//     obtainedMarks: 500,
//     percentage: 84.75,
//     grade: "A",
//     rank: 3,
//   },
//   {
//     id: 2,
//     name: "Fatima Ali",
//     rollNo: "C8-015",
//     avatar: "/placeholder.svg?height=40&width=40",
//     totalMarks: 590,
//     obtainedMarks: 550,
//     percentage: 93.22,
//     grade: "A+",
//     rank: 1,
//   },
//   {
//     id: 3,
//     name: "Mohammad Raza",
//     rollNo: "C8-008",
//     avatar: "/placeholder.svg?height=40&width=40",
//     totalMarks: 590,
//     obtainedMarks: 538,
//     percentage: 91.19,
//     grade: "A+",
//     rank: 2,
//   },
//   {
//     id: 4,
//     name: "Aisha Siddiqui",
//     rollNo: "C8-022",
//     avatar: "/placeholder.svg?height=40&width=40",
//     totalMarks: 590,
//     obtainedMarks: 530,
//     percentage: 89.83,
//     grade: "A",
//     rank: 4,
//   },
//   {
//     id: 5,
//     name: "Yusuf Rahman",
//     rollNo: "C8-012",
//     avatar: "/placeholder.svg?height=40&width=40",
//     totalMarks: 590,
//     obtainedMarks: 525,
//     percentage: 88.98,
//     grade: "A",
//     rank: 5,
//   },
//   {
//     id: 6,
//     name: "Zainab Khan",
//     rollNo: "C8-005",
//     avatar: "/placeholder.svg?height=40&width=40",
//     totalMarks: 590,
//     obtainedMarks: 480,
//     percentage: 81.36,
//     grade: "A",
//     rank: 6,
//   },
//   {
//     id: 7,
//     name: "Ibrahim Ali",
//     rollNo: "C8-018",
//     avatar: "/placeholder.svg?height=40&width=40",
//     totalMarks: 590,
//     obtainedMarks: 470,
//     percentage: 79.66,
//     grade: "B+",
//     rank: 7,
//   },
//   {
//     id: 8,
//     name: "Maryam Hassan",
//     rollNo: "C8-030",
//     avatar: "/placeholder.svg?height=40&width=40",
//     totalMarks: 590,
//     obtainedMarks: 465,
//     percentage: 78.81,
//     grade: "B+",
//     rank: 8,
//   },
// ]

// const gradeDistribution = [
//   { grade: "A+", count: 5, percentage: 11.11 },
//   { grade: "A", count: 12, percentage: 26.67 },
//   { grade: "B+", count: 15, percentage: 33.33 },
//   { grade: "B", count: 8, percentage: 17.78 },
//   { grade: "C+", count: 3, percentage: 6.67 },
//   { grade: "C", count: 2, percentage: 4.44 },
//   { grade: "D", count: 0, percentage: 0 },
//   { grade: "F", count: 0, percentage: 0 },
// ]

// interface TabPanelProps {
//   children?: React.ReactNode
//   index: number
//   value: number
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`class-report-tabpanel-${index}`}
//       aria-labelledby={`class-report-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
//     </div>
//   )
// }

// interface ClassReportPageProps {
//   className: string
// }

// export default function ClassReportPage({ className }: ClassReportPageProps) {
//   const router = useRouter()
//   const [tabValue, setTabValue] = useState(0)
//   const [loading, setLoading] = useState(true)
//   const [selectedExam, setSelectedExam] = useState<number>(1)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortField, setSortField] = useState("rank")
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

//   useEffect(() => {
//     // Simulate data loading
//     const timer = setTimeout(() => {
//       setLoading(false)
//     }, 1000)

//     return () => clearTimeout(timer)
//   }, [])

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue)
//   }

//   const handleExamChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setSelectedExam(event.target.value as number)
//   }

//   const handleSort = (field: string) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
//     } else {
//       setSortField(field)
//       setSortDirection("asc")
//     }
//   }

//   const handleViewStudentResult = (studentId: number) => {
//     router.push(`/results/student/${studentId}`)
//   }

//   const getSortIcon = (field: string) => {
//     if (sortField !== field) return null
//     return sortDirection === "asc" ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
//   }

//   const getGradeColor = (grade: string) => {
//     switch (grade) {
//       case "A+":
//         return "#4caf50" // Green
//       case "A":
//         return "#66bb6a" // Light Green
//       case "B+":
//         return "#2196f3" // Blue
//       case "B":
//         return "#42a5f5" // Light Blue
//       case "C+":
//         return "#ff9800" // Orange
//       case "C":
//         return "#ffa726" // Light Orange
//       default:
//         return "#f44336" // Red
//     }
//   }

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "70vh",
//         }}
//       >
//         <CircularProgress size={60} thickness={4} />
//         <Typography variant="h6" sx={{ mt: 3 }}>
//           Loading class report...
//         </Typography>
//       </Box>
//     )
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ maxWidth: "1200px", mx: "auto", p: { xs: 2, md: 4 } }}>
//         {/* Header with back button */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             mb: 4,
//           }}
//         >
//           <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ mr: 2 }}>
//             Back
//           </Button>
//           <Typography variant="h5" component="h1">
//             Class Performance Report
//           </Typography>
//         </Box>

//         {/* Class Info Card */}
//         <Paper
//           elevation={3}
//           sx={{
//             borderRadius: "16px",
//             mb: 4,
//             background: "linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)",
//             color: "white",
//           }}
//         >
//           <Box sx={{ p: 3 }}>
//             <Grid container spacing={3} alignItems="center">
//               <Grid item xs={12} md={8}>
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <Avatar sx={{ bgcolor: "white", color: "primary.main", width: 60, height: 60, mr: 2 }}>
//                     <School sx={{ fontSize: 30 }} />
//                   </Avatar>
//                   <Box>
//                     <Typography variant="h4" gutterBottom>
//                       {classData.name} - Section {classData.section}
//                     </Typography>
//                     <Typography variant="subtitle1">
//                       Class Teacher: {classData.classTeacher} | Academic Year: {classData.academicYear}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
//                 <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
//                   <Button
//                     variant="contained"
//                     startIcon={<Print />}
//                     sx={{ bgcolor: "white", color: "primary.main", "&:hover": { bgcolor: alpha("#ffffff", 0.9) } }}
//                   >
//                     Print
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     startIcon={<Download />}
//                     sx={{
//                       color: "white",
//                       borderColor: "white",
//                       "&:hover": { borderColor: "white", bgcolor: alpha("#ffffff", 0.1) },
//                     }}
//                   >
//                     Export
//                   </Button>
//                 </Box>
//                 <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
//                   Total Students: {classData.totalStudents}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Box>
//         </Paper>

//         {/* Exam Selection */}
//         <Box sx={{ mb: 4 }}>
//           <FormControl fullWidth variant="outlined">
//             <InputLabel id="exam-select-label">Select Examination</InputLabel>
//             <Select
//               labelId="exam-select-label"
//               id="exam-select"
//               // value={selectedExam}
//               // onChange={handleExamChange}
//               label="Select Examination"
//               sx={{
//                 borderRadius: "12px",
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: alpha(theme.palette.primary.main, 0.2),
//                 },
//               }}
//             >
//               {examTypes.map((exam) => (
//                 <MenuItem key={exam.id} value={exam.id}>
//                   {exam.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>

//         {/* Stats Cards */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card>
//               <CardContent>
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                   <Typography variant="subtitle1" color="textSecondary">
//                     Pass Percentage
//                   </Typography>
//                   <Avatar sx={{ bgcolor: "success.light" }}>
//                     <Assessment />
//                   </Avatar>
//                 </Box>
//                 <Typography variant="h4">87%</Typography>
//                 <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                   +5% from last term
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Card>
//               <CardContent>
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                   <Typography variant="subtitle1" color="textSecondary">
//                     Average Score
//                   </Typography>
//                   <Avatar sx={{ bgcolor: "primary.light" }}>
//                     <School />
//                   </Avatar>
//                 </Box>
//                 <Typography variant="h4">76%</Typography>
//                 <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                   +3% from last term
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Card>
//               <CardContent>
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                   <Typography variant="subtitle1" color="textSecondary">
//                     Highest Score
//                   </Typography>
//                   <Avatar sx={{ bgcolor: "warning.light" }}>
//                     <EmojiEvents />
//                   </Avatar>
//                 </Box>
//                 <Typography variant="h4">93%</Typography>
//                 <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                   Fatima Ali (C8-015)
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Card>
//               <CardContent>
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                   <Typography variant="subtitle1" color="textSecondary">
//                     Attendance
//                   </Typography>
//                   <Avatar sx={{ bgcolor: "info.light" }}>
//                     <CalendarMonth />
//                   </Avatar>
//                 </Box>
//                 <Typography variant="h4">92%</Typography>
//                 <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                   Class average
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Tabs and Content */}
//         <Paper elevation={2} sx={{ borderRadius: "16px", mb: 4, overflow: "hidden" }}>
//           <Tabs
//             value={tabValue}
//             onChange={handleTabChange}
//             variant="fullWidth"
//             sx={{
//               bgcolor: "background.paper",
//               "& .MuiTab-root": {
//                 minHeight: "60px",
//                 fontWeight: 600,
//               },
//               "& .Mui-selected": {
//                 color: "primary.main",
//               },
//             }}
//           >
//             <Tab label="Student Rankings" icon={<EmojiEvents />} iconPosition="start" />
//             <Tab label="Subject Performance" icon={<Assessment />} iconPosition="start" />
//             <Tab label="Grade Distribution" icon={<TrendingUp />} iconPosition="start" />
//           </Tabs>

//           <TabPanel value={tabValue} index={0}>
//             <Box sx={{ p: 3 }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mb: 3,
//                   flexWrap: "wrap",
//                   gap: 2,
//                 }}
//               >
//                 <Typography variant="h6">Student Rankings</Typography>

//                 <Box sx={{ display: "flex", gap: 2 }}>
//                   <StyledSearchBar
//                     placeholder="Search student..."
//                     variant="outlined"
//                     size="small"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <Search color="action" />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />

//                   <Button variant="outlined" startIcon={<FilterList />} size="small">
//                     Filter
//                   </Button>
//                   <Button variant="outlined" startIcon={<Sort />} size="small">
//                     Sort
//                   </Button>
//                 </Box>
//               </Box>

//               <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: "none" }}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell onClick={() => handleSort("rank")} sx={{ cursor: "pointer" }}>
//                         <Box display="flex" alignItems="center">
//                           Rank {getSortIcon("rank")}
//                         </Box>
//                       </TableCell>
//                       <TableCell>Student</TableCell>
//                       <TableCell onClick={() => handleSort("rollNo")} sx={{ cursor: "pointer" }}>
//                         <Box display="flex" alignItems="center">
//                           Roll No {getSortIcon("rollNo")}
//                         </Box>
//                       </TableCell>
//                       <TableCell align="center" onClick={() => handleSort("obtainedMarks")} sx={{ cursor: "pointer" }}>
//                         <Box display="flex" alignItems="center" justifyContent="center">
//                           Marks {getSortIcon("obtainedMarks")}
//                         </Box>
//                       </TableCell>
//                       <TableCell align="center" onClick={() => handleSort("percentage")} sx={{ cursor: "pointer" }}>
//                         <Box display="flex" alignItems="center" justifyContent="center">
//                           Percentage {getSortIcon("percentage")}
//                         </Box>
//                       </TableCell>
//                       <TableCell align="center" onClick={() => handleSort("grade")} sx={{ cursor: "pointer" }}>
//                         <Box display="flex" alignItems="center" justifyContent="center">
//                           Grade {getSortIcon("grade")}
//                         </Box>
//                       </TableCell>
//                       <TableCell align="center">Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {studentPerformance.map((student) => (
//                       <TableRow
//                         key={student.id}
//                         sx={{
//                           "&:nth-of-type(odd)": {
//                             bgcolor: alpha(theme.palette.primary.main, 0.02),
//                           },
//                           "&:hover": {
//                             bgcolor: alpha(theme.palette.primary.main, 0.05),
//                           },
//                           transition: "background-color 0.2s ease",
//                         }}
//                       >
//                         <TableCell>
//                           <Box
//                             sx={{
//                               width: 30,
//                               height: 30,
//                               borderRadius: "50%",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               bgcolor:
//                                 student.rank === 1
//                                   ? "gold"
//                                   : student.rank === 2
//                                     ? "#C0C0C0"
//                                     : student.rank === 3
//                                       ? "#CD7F32"
//                                       : alpha(theme.palette.primary.main, 0.1),
//                               color: student.rank <= 3 ? "white" : "text.primary",
//                               fontWeight: "bold",
//                             }}
//                           >
//                             {student.rank}
//                           </Box>
//                         </TableCell>
//                         <TableCell>
//                           <Box sx={{ display: "flex", alignItems: "center" }}>
//                             <Avatar src={student.avatar} sx={{ mr: 2, width: 40, height: 40 }} />
//                             <Typography variant="body1">{student.name}</Typography>
//                           </Box>
//                         </TableCell>
//                         <TableCell>{student.rollNo}</TableCell>
//                         <TableCell align="center">
//                           {student.obtainedMarks} / {student.totalMarks}
//                         </TableCell>
//                         <TableCell align="center">{student.percentage.toFixed(2)}%</TableCell>
//                         <TableCell align="center">
//                           <Chip
//                             label={student.grade}
//                             sx={{
//                               bgcolor: alpha(getGradeColor(student.grade), 0.1),
//                               color: getGradeColor(student.grade),
//                               fontWeight: 600,
//                             }}
//                           />
//                         </TableCell>
//                         <TableCell align="center">
//                           <IconButton color="primary" onClick={() => handleViewStudentResult(student.id)} size="small">
//                             <Visibility />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           </TabPanel>

//           <TabPanel value={tabValue} index={1}>
//             <Box sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Subject Performance Analysis
//               </Typography>

//               <TableContainer component={Paper} sx={{ borderRadius: "12px", mb: 4, boxShadow: "none" }}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Subject</TableCell>
//                       <TableCell align="center">Pass %</TableCell>
//                       <TableCell align="center">Average Score</TableCell>
//                       <TableCell align="center">Highest Score</TableCell>
//                       <TableCell align="center">Lowest Score</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {subjectPerformance.map((subject) => (
//                       <TableRow
//                         key={subject.subject}
//                         sx={{
//                           "&:nth-of-type(odd)": {
//                             bgcolor: alpha(theme.palette.primary.main, 0.02),
//                           },
//                           "&:hover": {
//                             bgcolor: alpha(theme.palette.primary.main, 0.05),
//                           },
//                           transition: "background-color 0.2s ease",
//                         }}
//                       >
//                         <TableCell component="th" scope="row">
//                           {subject.subject}
//                         </TableCell>
//                         <TableCell align="center">
//                           <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//                             <Box sx={{ width: "100%", mr: 1, maxWidth: 100 }}>
//                               <LinearProgress
//                                 variant="determinate"
//                                 value={subject.passPercentage}
//                                 sx={{
//                                   height: 8,
//                                   borderRadius: 5,
//                                   bgcolor: alpha(theme.palette.success.main, 0.2),
//                                   "& .MuiLinearProgress-bar": {
//                                     bgcolor: "success.main",
//                                   },
//                                 }}
//                               />
//                             </Box>
//                             <Typography variant="body2">{subject.passPercentage}%</Typography>
//                           </Box>
//                         </TableCell>
//                         <TableCell align="center">{subject.averageScore}/100</TableCell>
//                         <TableCell align="center">{subject.highestScore}/100</TableCell>
//                         <TableCell align="center">{subject.lowestScore}/100</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <Card>
//                     <CardContent>
//                       <Typography variant="subtitle1" gutterBottom>
//                         Highest Performing Subjects
//                       </Typography>
//                       <Box sx={{ mt: 2 }}>
//                         {subjectPerformance
//                           .sort((a, b) => b.averageScore - a.averageScore)
//                           .slice(0, 3)
//                           .map((subject, index) => (
//                             <Box key={subject.subject} sx={{ mb: 2 }}>
//                               <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                                 <Typography variant="body2">
//                                   {index + 1}. {subject.subject}
//                                 </Typography>
//                                 <Typography variant="body2" fontWeight="bold">
//                                   {subject.averageScore}/100
//                                 </Typography>
//                               </Box>
//                               <LinearProgress
//                                 variant="determinate"
//                                 value={subject.averageScore}
//                                 sx={{
//                                   height: 8,
//                                   borderRadius: 5,
//                                   bgcolor: alpha(theme.palette.success.main, 0.2),
//                                   "& .MuiLinearProgress-bar": {
//                                     bgcolor: "success.main",
//                                   },
//                                 }}
//                               />
//                             </Box>
//                           ))}
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <Card>
//                     <CardContent>
//                       <Typography variant="subtitle1" gutterBottom>
//                         Subjects Needing Improvement
//                       </Typography>
//                       <Box sx={{ mt: 2 }}>
//                         {subjectPerformance
//                           .sort((a, b) => a.averageScore - b.averageScore)
//                           .slice(0, 3)
//                           .map((subject, index) => (
//                             <Box key={subject.subject} sx={{ mb: 2 }}>
//                               <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                                 <Typography variant="body2">
//                                   {index + 1}. {subject.subject}
//                                 </Typography>
//                                 <Typography variant="body2" fontWeight="bold">
//                                   {subject.averageScore}/100
//                                 </Typography>
//                               </Box>
//                               <LinearProgress
//                                 variant="determinate"
//                                 value={subject.averageScore}
//                                 sx={{
//                                   height: 8,
//                                   borderRadius: 5,
//                                   bgcolor: alpha(theme.palette.warning.main, 0.2),
//                                   "& .MuiLinearProgress-bar": {
//                                     bgcolor: "warning.main",
//                                   },
//                                 }}
//                               />
//                             </Box>
//                           ))}
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               </Grid>
//             </Box>
//           </TabPanel>

//           <TabPanel value={tabValue} index={2}>
//             <Box sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Grade Distribution
//               </Typography>

//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={7}>
//                   <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: "none" }}>
//                     <Table>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Grade</TableCell>
//                           <TableCell align="center">Number of Students</TableCell>
//                           <TableCell align="center">Percentage</TableCell>
//                           <TableCell align="center">Distribution</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {gradeDistribution.map((grade) => (
//                           <TableRow
//                             key={grade.grade}
//                             sx={{
//                               "&:nth-of-type(odd)": {
//                                 bgcolor: alpha(theme.palette.primary.main, 0.02),
//                               },
//                               "&:hover": {
//                                 bgcolor: alpha(theme.palette.primary.main, 0.05),
//                               },
//                               transition: "background-color 0.2s ease",
//                             }}
//                           >
//                             <TableCell component="th" scope="row">
//                               <Chip
//                                 label={grade.grade}
//                                 sx={{
//                                   bgcolor: alpha(getGradeColor(grade.grade), 0.1),
//                                   color: getGradeColor(grade.grade),
//                                   fontWeight: 600,
//                                 }}
//                               />
//                             </TableCell>
//                             <TableCell align="center">{grade.count}</TableCell>
//                             <TableCell align="center">{grade.percentage.toFixed(2)}%</TableCell>
//                             <TableCell align="center">
//                               <Box sx={{ width: "100%", maxWidth: 200, mx: "auto" }}>
//                                 <LinearProgress
//                                   variant="determinate"
//                                   value={grade.percentage}
//                                   sx={{
//                                     height: 10,
//                                     borderRadius: 5,
//                                     bgcolor: alpha(getGradeColor(grade.grade), 0.2),
//                                     "& .MuiLinearProgress-bar": {
//                                       bgcolor: getGradeColor(grade.grade),
//                                     },
//                                   }}
//                                 />
//                               </Box>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </Grid>

//                 <Grid item xs={12} md={5}>
//                   <Card sx={{ height: "100%" }}>
//                     <CardContent>
//                       <Typography variant="subtitle1" gutterBottom>
//                         Performance Summary
//                       </Typography>

//                       <Box sx={{ mt: 3 }}>
//                         <Box sx={{ mb: 3 }}>
//                           <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                             <Typography variant="body2" color="textSecondary">
//                               Pass Rate
//                             </Typography>
//                             <Typography variant="body1" fontWeight="bold">
//                               100%
//                             </Typography>
//                           </Box>
//                           <LinearProgress
//                             variant="determinate"
//                             value={100}
//                             sx={{
//                               height: 10,
//                               borderRadius: 5,
//                               bgcolor: alpha(theme.palette.success.main, 0.2),
//                               "& .MuiLinearProgress-bar": {
//                                 bgcolor: "success.main",
//                               },
//                             }}
//                           />
//                         </Box>

//                         <Box sx={{ mb: 3 }}>
//                           <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                             <Typography variant="body2" color="textSecondary">
//                               A+ and A Grades
//                             </Typography>
//                             <Typography variant="body1" fontWeight="bold">
//                               37.78%
//                             </Typography>
//                           </Box>
//                           <LinearProgress
//                             variant="determinate"
//                             value={37.78}
//                             sx={{
//                               height: 10,
//                               borderRadius: 5,
//                               bgcolor: alpha(theme.palette.success.main, 0.2),
//                               "& .MuiLinearProgress-bar": {
//                                 bgcolor: "success.main",
//                               },
//                             }}
//                           />
//                         </Box>

//                         <Box sx={{ mb: 3 }}>
//                           <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                             <Typography variant="body2" color="textSecondary">
//                               B+ and B Grades
//                             </Typography>
//                             <Typography variant="body1" fontWeight="bold">
//                               51.11%
//                             </Typography>
//                           </Box>
//                           <LinearProgress
//                             variant="determinate"
//                             value={51.11}
//                             sx={{
//                               height: 10,
//                               borderRadius: 5,
//                               bgcolor: alpha(theme.palette.info.main, 0.2),
//                               "& .MuiLinearProgress-bar": {
//                                 bgcolor: "info.main",
//                               },
//                             }}
//                           />
//                         </Box>

//                         <Box>
//                           <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                             <Typography variant="body2" color="textSecondary">
//                               C+ and Below
//                             </Typography>
//                             <Typography variant="body1" fontWeight="bold">
//                               11.11%
//                             </Typography>
//                           </Box>
//                           <LinearProgress
//                             variant="determinate"
//                             value={11.11}
//                             sx={{
//                               height: 10,
//                               borderRadius: 5,
//                               bgcolor: alpha(theme.palette.warning.main, 0.2),
//                               "& .MuiLinearProgress-bar": {
//                                 bgcolor: "warning.main",
//                               },
//                             }}
//                           />
//                         </Box>
//                       </Box>

//                       <Box sx={{ mt: 4, p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: "12px" }}>
//                         <Typography variant="subtitle2" gutterBottom>
//                           Class Teacher's Remarks
//                         </Typography>
//                         <Typography variant="body2">
//                           The class has shown excellent overall performance with a 100% pass rate. Students have
//                           performed particularly well in Computer Science and Islamic Studies. Some improvement is
//                           needed in Science where the average score is lower. Overall, the class has maintained a high
//                           standard of academic achievement.
//                         </Typography>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               </Grid>
//             </Box>
//           </TabPanel>
//         </Paper>
//       </Box>
//     </ThemeProvider>
//   )
// }
import React from 'react';

const page = () => {
  return (
    <div>
      <h4>rest</h4>
    </div>
  );
};

export default page;