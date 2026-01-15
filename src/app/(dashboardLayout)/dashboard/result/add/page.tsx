// "use client"

// import { useState, useEffect } from "react"
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
//   Card,
//   CardContent,
//   IconButton,
//   Avatar,
//   Divider,
//   Tooltip,
//   Zoom,
//   Fade,
//   Chip,
//   LinearProgress,
//   Backdrop,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Container,
// } from "@mui/material"
// import {
//   Save as SaveIcon,
//   Print as PrintIcon,
//   Preview as PreviewIcon,
//   School as SchoolIcon,
//   Person as PersonIcon,
//   Search as SearchIcon,
//   ArrowForward as ArrowForwardIcon,
//   ArrowBack as ArrowBackIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   EmojiEvents as EmojiEventsIcon,
//   Celebration as CelebrationIcon,
//   Lightbulb as LightbulbIcon,
//   Insights as InsightsIcon,
// } from "@mui/icons-material"
// import { styled, alpha } from "@mui/material/styles"
// import { motion } from "framer-motion"

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

// const students = [
//   { id: 1, name: "Ahmed Ali", rollNumber: "001", class: "One", image: "/placeholder.svg?height=40&width=40" },
//   { id: 2, name: "Sara Khan", rollNumber: "002", class: "One", image: "/placeholder.svg?height=40&width=40" },
//   { id: 3, name: "Zain Ahmed", rollNumber: "003", class: "One", image: "/placeholder.svg?height=40&width=40" },
//   { id: 4, name: "Fatima Zahra", rollNumber: "004", class: "One", image: "/placeholder.svg?height=40&width=40" },
//   { id: 5, name: "Ibrahim Hassan", rollNumber: "005", class: "One", image: "/placeholder.svg?height=40&width=40" },
// ]

// const subjects = [
//   { id: 1, name: "Mathematics", fullMarks: 100, passMarks: 40 },
//   { id: 2, name: "Science", fullMarks: 100, passMarks: 40 },
//   { id: 3, name: "English", fullMarks: 100, passMarks: 40 },
//   { id: 4, name: "Social Studies", fullMarks: 100, passMarks: 40 },
//   { id: 5, name: "Islamic Studies", fullMarks: 100, passMarks: 40 },
// ]

// const examTypes = [
//   { id: 1, name: "First Term" },
//   { id: 2, name: "Mid Term" },
//   { id: 3, name: "Final Term" },
// ]

// // Styled components
// const GlassPaper = styled(Paper)(({ theme }) => ({
//   background: alpha(theme.palette.background.paper, 0.8),
//   backdropFilter: "blur(10px)",
//   borderRadius: 16,
//   padding: theme.spacing(3),
//   boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//   border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//   overflow: "hidden",
//   position: "relative",
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: "4px",
//     background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//   },
// }))

// const GradientButton = styled(Button)(({ theme }) => ({
//   background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
//   color: "white",
//   fontWeight: "bold",
//   padding: "10px 24px",
//   borderRadius: "12px",
//   boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
//   transition: "all 0.3s ease",
//   "&:hover": {
//     boxShadow: `0 6px 25px ${alpha(theme.palette.primary.main, 0.6)}`,
//     transform: "translateY(-2px)",
//   },
// }))

// const OutlinedButton = styled(Button)(({ theme }) => ({
//   borderRadius: "12px",
//   borderWidth: "2px",
//   padding: "9px 24px",
//   fontWeight: "bold",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     borderWidth: "2px",
//     transform: "translateY(-2px)",
//     boxShadow: `0 4px 12px ${alpha(theme.palette.text.primary, 0.1)}`,
//   },
// }))

// const StepIndicator = styled(Box)(({ theme, active }: { theme?: any; active: boolean }) => ({
//   width: 40,
//   height: 40,
//   borderRadius: "50%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   background: active
//     ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
//     : theme.palette.grey[200],
//   color: active ? "white" : theme.palette.text.secondary,
//   fontWeight: "bold",
//   boxShadow: active ? `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}` : "none",
//   transition: "all 0.3s ease",
// }))

// const StepConnector = styled(Box)(({ theme, active }: { theme?: any; active: boolean }) => ({
//   height: 3,
//   flex: 1,
//   background: active
//     ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
//     : theme.palette.grey[200],
//   transition: "all 0.3s ease",
// }))

// const AnimatedCard = styled(motion.div)(({ theme }) => ({
//   borderRadius: 16,
//   overflow: "hidden",
//   boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
//   height: "100%",
//   background: theme.palette.background.paper,
//   border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
// }))

// const SubjectCard = styled(Card)(({ theme }) => ({
//   borderRadius: 12,
//   marginBottom: theme.spacing(2),
//   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
//   },
// }))

// const GradeChip = styled(Chip)(({ theme, grade }: { theme?: any; grade: string }) => {
//   let color
//   switch (grade) {
//     case "A+":
//       color = theme.palette.success.main
//       break
//     case "A":
//       color = theme.palette.success.light
//       break
//     case "B+":
//     case "B":
//       color = theme.palette.primary.main
//       break
//     case "C":
//       color = theme.palette.warning.main
//       break
//     case "D":
//       color = theme.palette.warning.dark
//       break
//     case "F":
//       color = theme.palette.error.main
//       break
//     default:
//       color = theme.palette.grey[500]
//   }

//   return {
//     backgroundColor: alpha(color, 0.1),
//     color: color,
//     fontWeight: "bold",
//     border: `1px solid ${alpha(color, 0.3)}`,
//     padding: "4px 8px",
//   }
// })

// const StatusChip = styled(Chip)(({ theme, status }: { theme?: any; status: string }) => {
//   const color = status === "Pass" ? theme.palette.success.main : theme.palette.error.main
//   return {
//     backgroundColor: alpha(color, 0.1),
//     color: color,
//     fontWeight: "bold",
//     border: `1px solid ${alpha(color, 0.3)}`,
//     padding: "4px 8px",
//   }
// })

// const ProgressBar = styled(LinearProgress)(({ theme, value }: { theme?: any; value: number }) => {
//   let color
//   if (value >= 90) color = theme.palette.success.main
//   else if (value >= 70) color = theme.palette.success.light
//   else if (value >= 50) color = theme.palette.primary.main
//   else if (value >= 40) color = theme.palette.warning.main
//   else color = theme.palette.error.main

//   return {
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: alpha(color, 0.1),
//     "& .MuiLinearProgress-bar": {
//       backgroundColor: color,
//     },
//   }
// })

// const AddResultPage = () => {
//   const [activeStep, setActiveStep] = useState(0)
//   const [selectedClass, setSelectedClass] = useState("")
//   const [selectedExam, setSelectedExam] = useState("")
//   const [selectedStudent, setSelectedStudent] = useState<any>(null)
//   const [marks, setMarks] = useState<{ [key: number]: number }>({})
//   const [loading, setLoading] = useState(false)
//   const [snackbarOpen, setSnackbarOpen] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")

//   const handleNext = () => {
//     setLoading(true)
//     setTimeout(() => {
//       setActiveStep((prevStep) => prevStep + 1)
//       setLoading(false)
//     }, 500)
//   }

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1)
//   }

//   const handleMarkChange = (subjectId: number, value: string) => {
//     const numValue = Number.parseInt(value, 10)
//     if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
//       setMarks({ ...marks, [subjectId]: numValue })
//     }
//   }

//   const handleSaveResult = () => {
//     setLoading(true)
//     // Here you would save the result to your backend
//     setTimeout(() => {
//       console.log({
//         student: selectedStudent,
//         class: selectedClass,
//         exam: selectedExam,
//         marks,
//       })
//       setLoading(false)
//       setSnackbarOpen(true)
//     }, 1000)
//   }

//   const filteredStudents = students.filter(
//     (student) =>
//       student.class === selectedClass &&
//       (searchTerm === "" ||
//         student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         student.rollNumber.includes(searchTerm)),
//   )

//   const steps = ["Select Class & Exam", "Select Student", "Enter Marks", "Review & Save"]

//   // Calculate total and percentage
//   const totalMarks = Object.values(marks).reduce((sum, mark) => sum + mark, 0)
//   const totalFullMarks = subjects.length * 100
//   const percentage = (totalMarks / totalFullMarks) * 100

//   // Determine result status and grade
//   let status = "Pass"
//   let grade = "A"

//   if (percentage < 40) {
//     status = "Fail"
//     grade = "F"
//   } else if (percentage < 50) {
//     grade = "D"
//   } else if (percentage < 60) {
//     grade = "C"
//   } else if (percentage < 70) {
//     grade = "B"
//   } else if (percentage < 80) {
//     grade = "B+"
//   } else if (percentage < 90) {
//     grade = "A"
//   } else {
//     grade = "A+"
//   }

//   const getStepContent = (step: number) => {
//     switch (step) {
//       case 0:
//         return (
//           <Fade in={activeStep === 0}>
//             <Box>
//               <Typography variant="h6" fontWeight="medium" sx={{ mb: 3 }}>
//                 Select Class and Examination
//               </Typography>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <FormControl fullWidth variant="outlined">
//                     <InputLabel>Class</InputLabel>
//                     <Select
//                       value={selectedClass}
//                       onChange={(e) => setSelectedClass(e.target.value as string)}
//                       label="Class"
//                       sx={{ borderRadius: 2 }}
//                     >
//                       {classes.map((cls) => (
//                         <MenuItem key={cls.id} value={cls.name}>
//                           {cls.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <FormControl fullWidth variant="outlined">
//                     <InputLabel>Exam Type</InputLabel>
//                     <Select
//                       value={selectedExam}
//                       onChange={(e) => setSelectedExam(e.target.value as string)}
//                       label="Exam Type"
//                       sx={{ borderRadius: 2 }}
//                     >
//                       {examTypes.map((exam) => (
//                         <MenuItem key={exam.id} value={exam.name}>
//                           {exam.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//               </Grid>

//               {selectedClass && selectedExam && (
//                 <Fade in={!!(selectedClass && selectedExam)}>
//                   <Box sx={{ mt: 4 }}>
//                     <Alert
//                       severity="info"
//                       icon={<LightbulbIcon />}
//                       sx={{
//                         borderRadius: 2,
//                         backgroundColor: (theme) => alpha(theme.palette.info.main, 0.1),
//                       }}
//                     >
//                       <Typography variant="subtitle2">
//                         You are about to add results for {selectedClass} class in {selectedExam} examination.
//                       </Typography>
//                     </Alert>
//                   </Box>
//                 </Fade>
//               )}
//             </Box>
//           </Fade>
//         )
//       case 1:
//         return (
//           <Fade in={activeStep === 1}>
//             <Box>
//               <Typography variant="h6" fontWeight="medium" sx={{ mb: 3 }}>
//                 Select Student
//               </Typography>
//               <TextField
//                 fullWidth
//                 placeholder="Search by name or roll number"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 InputProps={{
//                   startAdornment: <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />,
//                 }}
//                 sx={{ mb: 3, borderRadius: 2 }}
//               />

//               <Box sx={{ maxHeight: 400, overflow: "auto", pr: 1 }}>
//                 {filteredStudents.length > 0 ? (
//                   filteredStudents.map((student, index) => (
//                     <motion.div
//                       key={student.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.05 }}
//                     >
//                       <Card
//                         sx={{
//                           mb: 2,
//                           borderRadius: 3,
//                           cursor: "pointer",
//                           border: selectedStudent?.id === student.id ? 2 : 1,
//                           borderColor: selectedStudent?.id === student.id ? "primary.main" : "divider",
//                           transition: "all 0.2s ease",
//                           "&:hover": {
//                             boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                             transform: "translateY(-2px)",
//                           },
//                         }}
//                         onClick={() => setSelectedStudent(student)}
//                       >
//                         <CardContent sx={{ p: 2 }}>
//                           <Grid container alignItems="center" spacing={2}>
//                             <Grid item>
//                               <Avatar src={student.image} sx={{ width: 50, height: 50 }} />
//                             </Grid>
//                             <Grid item xs>
//                               <Typography variant="subtitle1" fontWeight="medium">
//                                 {student.name}
//                               </Typography>
//                               <Typography variant="body2" color="text.secondary">
//                                 Roll Number: {student.rollNumber}
//                               </Typography>
//                             </Grid>
//                             <Grid item>
//                               {selectedStudent?.id === student.id && (
//                                 <CheckCircleIcon color="primary" fontSize="medium" />
//                               )}
//                             </Grid>
//                           </Grid>
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   ))
//                 ) : (
//                   <Box sx={{ textAlign: "center", py: 4 }}>
//                     <PersonIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
//                     <Typography variant="subtitle1" color="text.secondary">
//                       No students found
//                     </Typography>
//                     <Typography variant="body2" color="text.disabled">
//                       Try changing your search criteria
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>
//             </Box>
//           </Fade>
//         )
//       case 2:
//         return (
//           <Fade in={activeStep === 2}>
//             <Box>
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="h6" fontWeight="medium">
//                   Enter Marks for {selectedStudent?.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Roll Number: {selectedStudent?.rollNumber} | Class: {selectedClass} | Exam: {selectedExam}
//                 </Typography>
//               </Box>

//               {subjects.map((subject, index) => (
//                 <motion.div
//                   key={subject.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                 >
//                   <SubjectCard>
//                     <CardContent sx={{ p: 2 }}>
//                       <Grid container alignItems="center" spacing={2}>
//                         <Grid item xs={12} sm={5}>
//                           <Typography variant="subtitle1" fontWeight="medium">
//                             {subject.name}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             Full Marks: {subject.fullMarks} | Pass Marks: {subject.passMarks}
//                           </Typography>
//                         </Grid>
//                         <Grid item xs={12} sm={4}>
//                           <Box sx={{ width: "100%" }}>
//                             <ProgressBar
//                               variant="determinate"
//                               value={((marks[subject.id] || 0) / subject.fullMarks) * 100}
//                               value={((marks[subject.id] || 0) / subject.fullMarks) * 100}
//                             />
//                           </Box>
//                         </Grid>
//                         <Grid item xs={12} sm={3}>
//                           <TextField
//                             type="number"
//                             variant="outlined"
//                             size="small"
//                             fullWidth
//                             value={marks[subject.id] || ""}
//                             onChange={(e) => handleMarkChange(subject.id, e.target.value)}
//                             inputProps={{ min: 0, max: subject.fullMarks }}
//                             sx={{ borderRadius: 2 }}
//                             placeholder="Enter marks"
//                           />
//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </SubjectCard>
//                 </motion.div>
//               ))}

//               <Box sx={{ mt: 3 }}>
//                 <Alert
//                   severity="info"
//                   icon={<InsightsIcon />}
//                   sx={{
//                     borderRadius: 2,
//                     backgroundColor: (theme) => alpha(theme.palette.info.main, 0.1),
//                   }}
//                 >
//                   <Typography variant="subtitle2">
//                     Current Total: {totalMarks}/{totalFullMarks} ({percentage.toFixed(2)}%)
//                   </Typography>
//                 </Alert>
//               </Box>
//             </Box>
//           </Fade>
//         )
//       case 3:
//         return (
//           <Fade in={activeStep === 3}>
//             <Box>
//               <Typography variant="h6" fontWeight="medium" sx={{ mb: 3 }}>
//                 Review and Save Result
//               </Typography>

//               <AnimatedCard
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Box sx={{ p: 3 }}>
//                   <Grid container spacing={3}>
//                     <Grid item xs={12} md={6}>
//                       <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                         <Avatar src={selectedStudent?.image} sx={{ width: 60, height: 60, mr: 2 }} />
//                         <Box>
//                           <Typography variant="h6" fontWeight="bold">
//                             {selectedStudent?.name}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             Roll Number: {selectedStudent?.rollNumber}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                       <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
//                         <Typography variant="body2" color="text.secondary">
//                           Class: {selectedClass}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           Examination: {selectedExam}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           Date: {new Date().toLocaleDateString()}
//                         </Typography>
//                       </Box>
//                     </Grid>
//                   </Grid>

//                   <Divider sx={{ my: 3 }} />

//                   <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
//                     Subject Marks
//                   </Typography>

//                   <Grid container spacing={2}>
//                     {subjects.map((subject) => (
//                       <Grid item xs={12} sm={6} md={4} key={subject.id}>
//                         <Card
//                           sx={{
//                             borderRadius: 2,
//                             boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//                             height: "100%",
//                             border:
//                               (marks[subject.id] || 0) < subject.passMarks
//                                 ? "1px solid rgba(244, 67, 54, 0.3)"
//                                 : "1px solid rgba(0, 0, 0, 0.05)",
//                           }}
//                         >
//                           <CardContent>
//                             <Typography variant="subtitle2" fontWeight="medium" noWrap>
//                               {subject.name}
//                             </Typography>
//                             <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                               <Typography variant="h5" fontWeight="bold" sx={{ mr: 1 }}>
//                                 {marks[subject.id] || 0}
//                               </Typography>
//                               <Typography variant="body2" color="text.secondary">
//                                 / {subject.fullMarks}
//                               </Typography>
//                             </Box>
//                             <Box sx={{ mt: 1 }}>
//                               <ProgressBar
//                                 variant="determinate"
//                                 value={((marks[subject.id] || 0) / subject.fullMarks) * 100}
//                                 value={((marks[subject.id] || 0) / subject.fullMarks) * 100}
//                               />
//                             </Box>
//                             <Box sx={{ mt: 1 }}>
//                               {(marks[subject.id] || 0) < subject.passMarks ? (
//                                 <Chip
//                                   size="small"
//                                   label="Failed"
//                                   color="error"
//                                   variant="outlined"
//                                   icon={<CancelIcon />}
//                                 />
//                               ) : (
//                                 <Chip
//                                   size="small"
//                                   label="Passed"
//                                   color="success"
//                                   variant="outlined"
//                                   icon={<CheckCircleIcon />}
//                                 />
//                               )}
//                             </Box>
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     ))}
//                   </Grid>

//                   <Divider sx={{ my: 3 }} />

//                   <Grid container spacing={3}>
//                     <Grid item xs={12} md={8}>
//                       <Card
//                         sx={{
//                           borderRadius: 2,
//                           boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//                           background: (theme) =>
//                             `linear-gradient(135deg, ${alpha(
//                               theme.palette.background.paper,
//                               0.9,
//                             )}, ${alpha(theme.palette.background.paper, 0.95)})`,
//                           backdropFilter: "blur(10px)",
//                           height: "100%",
//                         }}
//                       >
//                         <CardContent sx={{ p: 3 }}>
//                           <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
//                             Result Summary
//                           </Typography>
//                           <Grid container spacing={3}>
//                             <Grid item xs={6} sm={3}>
//                               <Typography variant="body2" color="text.secondary">
//                                 Total Marks
//                               </Typography>
//                               <Typography variant="h6" fontWeight="bold">
//                                 {totalMarks}/{totalFullMarks}
//                               </Typography>
//                             </Grid>
//                             <Grid item xs={6} sm={3}>
//                               <Typography variant="body2" color="text.secondary">
//                                 Percentage
//                               </Typography>
//                               <Typography variant="h6" fontWeight="bold">
//                                 {percentage.toFixed(2)}%
//                               </Typography>
//                             </Grid>
//                             <Grid item xs={6} sm={3}>
//                               <Typography variant="body2" color="text.secondary">
//                                 Grade
//                               </Typography>
//                               <GradeChip label={grade} grade={grade} />
//                             </Grid>
//                             <Grid item xs={6} sm={3}>
//                               <Typography variant="body2" color="text.secondary">
//                                 Result
//                               </Typography>
//                               <StatusChip
//                                 label={status}
//                                 status={status}
//                                 icon={status === "Pass" ? <CheckCircleIcon /> : <CancelIcon />}
//                               />
//                             </Grid>
//                           </Grid>
//                         </CardContent>
//                       </Card>
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                       <Card
//                         sx={{
//                           borderRadius: 2,
//                           boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//                           background: (theme) =>
//                             status === "Pass"
//                               ? `linear-gradient(135deg, ${alpha(theme.palette.success.light, 0.1)}, ${alpha(
//                                 theme.palette.success.main,
//                                 0.2,
//                               )})`
//                               : `linear-gradient(135deg, ${alpha(theme.palette.error.light, 0.1)}, ${alpha(
//                                 theme.palette.error.main,
//                                 0.2,
//                               )})`,
//                           height: "100%",
//                           display: "flex",
//                           flexDirection: "column",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           padding: 3,
//                         }}
//                       >
//                         {status === "Pass" ? (
//                           <>
//                             <EmojiEventsIcon
//                               sx={{ fontSize: 48, color: "success.main", mb: 2, opacity: 0.8 }}
//                             />
//                             <Typography variant="h6" fontWeight="bold" color="success.main" align="center">
//                               Congratulations!
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
//                               Student has successfully passed the examination
//                             </Typography>
//                           </>
//                         ) : (
//                           <>
//                             <CancelIcon sx={{ fontSize: 48, color: "error.main", mb: 2, opacity: 0.8 }} />
//                             <Typography variant="h6" fontWeight="bold" color="error.main" align="center">
//                               Not Passed
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
//                               Student needs improvement in failed subjects
//                             </Typography>
//                           </>
//                         )}
//                       </Card>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </AnimatedCard>
//             </Box>
//           </Fade>
//         )
//       default:
//         return "Unknown step"
//     }
//   }

//   return (
//     <Container maxWidth='xl'>
//       <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             mb: 4,
//             pb: 2,
//             borderBottom: "1px solid",
//             borderColor: "divider",
//           }}
//         >
//           <SchoolIcon
//             sx={{
//               fontSize: 40,
//               p: 1,
//               borderRadius: 2,
//               background: (theme) => alpha(theme.palette.primary.main, 0.1),
//               color: "primary.main",
//               mr: 2,
//             }}
//           />
//           <Box>
//             <Typography variant="h4" component="h1" fontWeight="bold">
//               Add Student Result
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Create and manage student examination results
//             </Typography>
//           </Box>
//         </Box>

//         <Box sx={{ mb: 4 }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             {steps.map((label, index) => (
//               <Box key={label} sx={{ display: "flex", alignItems: "center" }}>
//                 <Tooltip title={label} placement="top" TransitionComponent={Zoom}>
//                   <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
//                     <StepIndicator active={index <= activeStep} onClick={() => index < activeStep && setActiveStep(index)}>
//                       {index + 1}
//                     </StepIndicator>
//                     {index < steps.length - 1 && <StepConnector active={index < activeStep} />}
//                   </Box>
//                 </Tooltip>
//               </Box>
//             ))}
//           </Box>
//           <Box sx={{ mt: 1 }}>
//             <Typography variant="subtitle2" color="text.secondary">
//               Step {activeStep + 1}: {steps[activeStep]}
//             </Typography>
//           </Box>
//         </Box>

//         <GlassPaper>
//           <Box sx={{ minHeight: 400 }}>{getStepContent(activeStep)}</Box>

//           <Divider sx={{ my: 3 }} />

//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <OutlinedButton
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               startIcon={<ArrowBackIcon />}
//               color="inherit"
//             >
//               Back
//             </OutlinedButton>
//             <Box sx={{ display: "flex", gap: 2 }}>
//               {activeStep === steps.length - 1 ? (
//                 <>
//                   <OutlinedButton startIcon={<PreviewIcon />} color="primary">
//                     Preview
//                   </OutlinedButton>
//                   <OutlinedButton startIcon={<PrintIcon />} color="secondary">
//                     Print
//                   </OutlinedButton>
//                   <GradientButton onClick={handleSaveResult} startIcon={<SaveIcon />}>
//                     Save Result
//                   </GradientButton>
//                 </>
//               ) : (
//                 <GradientButton
//                   onClick={handleNext}
//                   endIcon={<ArrowForwardIcon />}
//                   disabled={
//                     (activeStep === 0 && (!selectedClass || !selectedExam)) || (activeStep === 1 && !selectedStudent)
//                   }
//                 >
//                   Continue
//                 </GradientButton>
//               )}
//             </Box>
//           </Box>
//         </GlassPaper>

//         <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
//           <CircularProgress color="inherit" />
//         </Backdrop>

//         <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
//           <Alert
//             onClose={() => setSnackbarOpen(false)}
//             severity="success"
//             variant="filled"
//             sx={{ width: "100%", borderRadius: 2 }}
//           >
//             Result saved successfully!
//           </Alert>
//         </Snackbar>
//       </Box>
//     </Container>
//   )
// }

// export default AddResultPage
import React from "react";

const page = () => {
  return (
    <div>
      <h4>result page </h4>
    </div>
  );
};

export default page;
