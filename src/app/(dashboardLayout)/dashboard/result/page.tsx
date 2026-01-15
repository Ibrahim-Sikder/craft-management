// "use client"

// import type React from "react"
// import { useState } from "react"
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Chip,
//   Tabs,
//   Tab,
//   InputAdornment,
//   Tooltip,
//   Avatar,
//   Container,
// } from "@mui/material"
// import {
//   Search as SearchIcon,
//   Print as PrintIcon,
//   Download as DownloadIcon,
//   FilterList as FilterListIcon,
//   School as SchoolIcon,
//   Person as PersonIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as VisibilityIcon,
//   Share as ShareIcon,
// } from "@mui/icons-material"
// import { styled } from "@mui/material/styles"

// // Sample data for demonstration
// const classes = [
//   { id: 1, name: "Hifz" },
//   { id: 2, name: "One" },
//   { id: 3, name: "One" },
//   { id: 4, name: "Nazera" },
//   { id: 5, name: "Six" },
//   { id: 6, name: "Five" },
//   { id: 7, name: "Four" },
//   { id: 8, name: "Three" },
//   { id: 9, name: "Two" },
// ]

// const examTypes = [
//   { id: 1, name: "First Term" },
//   { id: 2, name: "Mid Term" },
//   { id: 3, name: "Final Term" },
// ]

// const results = [
//   {
//     id: 1,
//     studentName: "Ahmed Ali",
//     rollNumber: "001",
//     class: "One",
//     exam: "Final Term",
//     totalMarks: 450,
//     obtainedMarks: 385,
//     percentage: 85.56,
//     grade: "A+",
//     status: "Pass",
//     position: 1,
//   },
//   {
//     id: 2,
//     studentName: "Sara Khan",
//     rollNumber: "002",
//     class: "One",
//     exam: "Final Term",
//     totalMarks: 450,
//     obtainedMarks: 372,
//     percentage: 82.67,
//     grade: "A",
//     status: "Pass",
//     position: 2,
//   },
//   {
//     id: 3,
//     studentName: "Zain Ahmed",
//     rollNumber: "003",
//     class: "One",
//     exam: "Final Term",
//     totalMarks: 450,
//     obtainedMarks: 340,
//     percentage: 75.56,
//     grade: "B+",
//     status: "Pass",
//     position: 3,
//   },
//   {
//     id: 4,
//     studentName: "Fatima Zahra",
//     rollNumber: "004",
//     class: "One",
//     exam: "Final Term",
//     totalMarks: 450,
//     obtainedMarks: 325,
//     percentage: 72.22,
//     grade: "B",
//     status: "Pass",
//     position: 4,
//   },
//   {
//     id: 5,
//     studentName: "Ibrahim Hassan",
//     rollNumber: "005",
//     class: "One",
//     exam: "Final Term",
//     totalMarks: 450,
//     obtainedMarks: 180,
//     percentage: 40.0,
//     grade: "F",
//     status: "Fail",
//     position: 5,
//   },
// ]

// // Styled components
// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: 12,
//   boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//   height: "100%",
// }))

// const GradientButton = styled(Button)(({ theme }) => ({
//   background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
//   color: "white",
//   boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
// }))

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:hover": {
//     backgroundColor: theme.palette.action.selected,
//   },
// }))

// const ViewResultsPage = () => {
//   const [selectedClass, setSelectedClass] = useState("")
//   const [selectedExam, setSelectedExam] = useState("")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [tabValue, setTabValue] = useState(0)

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue)
//   }

//   const filteredResults = results.filter((result) => {
//     if (selectedClass && result.class !== selectedClass) return false
//     if (selectedExam && result.exam !== selectedExam) return false
//     if (
//       searchTerm &&
//       !result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       !result.rollNumber.includes(searchTerm)
//     )
//       return false

//     if (tabValue === 1 && result.status !== "Pass") return false
//     if (tabValue === 2 && result.status !== "Fail") return false

//     return true
//   })

//   return (
//     <Container maxWidth='xl'>
//       <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
//           <SchoolIcon sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
//           <Typography variant="h4" component="h1" fontWeight="bold">
//             View Results
//           </Typography>
//         </Box>

//         <StyledPaper>
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             <Grid item xs={12} md={3}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Class</InputLabel>
//                 <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value as string)} label="Class">
//                   <MenuItem value="">All Classes</MenuItem>
//                   {classes.map((cls) => (
//                     <MenuItem key={cls.id} value={cls.name}>
//                       {cls.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Exam Type</InputLabel>
//                 <Select
//                   value={selectedExam}
//                   onChange={(e) => setSelectedExam(e.target.value as string)}
//                   label="Exam Type"
//                 >
//                   <MenuItem value="">All Exams</MenuItem>
//                   {examTypes.map((exam) => (
//                     <MenuItem key={exam.id} value={exam.name}>
//                       {exam.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Search by name or roll number"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={2}>
//               <Box sx={{ display: "flex", gap: 1, height: "100%" }}>
//                 <Tooltip title="Print Results">
//                   <IconButton color="primary" sx={{ border: "1px solid", borderColor: "divider" }}>
//                     <PrintIcon />
//                   </IconButton>
//                 </Tooltip>
//                 <Tooltip title="Download as Excel">
//                   <IconButton color="primary" sx={{ border: "1px solid", borderColor: "divider" }}>
//                     <DownloadIcon />
//                   </IconButton>
//                 </Tooltip>
//                 <GradientButton fullWidth>
//                   <FilterListIcon sx={{ mr: 1 }} />
//                   Filter
//                 </GradientButton>
//               </Box>
//             </Grid>
//           </Grid>

//           <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
//             <Tabs value={tabValue} onChange={handleTabChange} aria-label="result tabs">
//               <Tab label="All Results" />
//               <Tab label="Passed" />
//               <Tab label="Failed" />
//             </Tabs>
//           </Box>

//           <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Typography variant="h6" component="h2">
//               {filteredResults.length} Results Found
//             </Typography>
//             <Chip
//               label={selectedClass || "All Classes"}
//               color="primary"
//               variant="outlined"
//               onDelete={selectedClass ? () => setSelectedClass("") : undefined}
//             />
//           </Box>

//           <TableContainer component={Paper} sx={{ boxShadow: "none", mb: 3 }}>
//             <Table>
//               <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                 <TableRow>
//                   <TableCell>Student</TableCell>
//                   <TableCell align="center">Class</TableCell>
//                   <TableCell align="center">Exam</TableCell>
//                   <TableCell align="center">Marks</TableCell>
//                   <TableCell align="center">Percentage</TableCell>
//                   <TableCell align="center">Grade</TableCell>
//                   <TableCell align="center">Position</TableCell>
//                   <TableCell align="center">Status</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredResults.map((result) => (
//                   <StyledTableRow key={result.id}>
//                     <TableCell>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
//                           <PersonIcon />
//                         </Avatar>
//                         <Box>
//                           <Typography variant="body1" fontWeight="medium">
//                             {result.studentName}
//                           </Typography>
//                           <Typography variant="body2" color="textSecondary">
//                             Roll: {result.rollNumber}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </TableCell>
//                     <TableCell align="center">{result.class}</TableCell>
//                     <TableCell align="center">{result.exam}</TableCell>
//                     <TableCell align="center">
//                       <Typography variant="body2">
//                         {result.obtainedMarks}/{result.totalMarks}
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="center">{result.percentage.toFixed(2)}%</TableCell>
//                     <TableCell align="center">
//                       <Chip
//                         label={result.grade}
//                         color={
//                           result.grade === "A+" || result.grade === "A"
//                             ? "success"
//                             : result.grade === "B+" || result.grade === "B"
//                               ? "primary"
//                               : result.grade === "C" || result.grade === "D"
//                                 ? "warning"
//                                 : "error"
//                         }
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <Chip
//                         label={`${result.position}${result.position === 1
//                             ? "st"
//                             : result.position === 2
//                               ? "nd"
//                               : result.position === 3
//                                 ? "rd"
//                                 : "th"
//                           }`}
//                         variant="outlined"
//                         size="small"
//                         color={
//                           result.position === 1
//                             ? "success"
//                             : result.position === 2
//                               ? "primary"
//                               : result.position === 3
//                                 ? "secondary"
//                                 : "default"
//                         }
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <Chip label={result.status} color={result.status === "Pass" ? "success" : "error"} size="small" />
//                     </TableCell>
//                     <TableCell align="center">
//                       <Box sx={{ display: "flex", justifyContent: "center" }}>
//                         <Tooltip title="View Result">
//                           <IconButton size="small" color="primary">
//                             <VisibilityIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Edit Result">
//                           <IconButton size="small" color="secondary">
//                             <EditIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Share Result">
//                           <IconButton size="small" color="info">
//                             <ShareIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete Result">
//                           <IconButton size="small" color="error">
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                       </Box>
//                     </TableCell>
//                   </StyledTableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {filteredResults.length === 0 && (
//             <Box sx={{ textAlign: "center", py: 4 }}>
//               <Typography variant="h6" color="textSecondary">
//                 No results found
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 Try changing your search criteria
//               </Typography>
//             </Box>
//           )}
//         </StyledPaper>
//       </Box>
//     </Container>
//   )
// }

// export default ViewResultsPage

import React from "react";

const page = () => {
  return <div>view result</div>;
};

export default page;
