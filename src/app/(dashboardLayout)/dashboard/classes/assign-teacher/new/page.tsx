// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client"

// import { useState, useEffect } from "react"
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Paper,
//   Grid,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Divider,
//   Card,
//   CardContent,
//   IconButton,
//   Snackbar,
//   Alert,
//   Tooltip,
//   Zoom,
//   Fade,
//   Chip,
//   Avatar,
//   LinearProgress,
//   Backdrop,
//   CircularProgress,
//   useTheme,
//   useMediaQuery,
//   Collapse,
//   Autocomplete,
//   FormHelperText,
//   Checkbox,
//   FormControlLabel,
//   ListItemText,
//   OutlinedInput,
//   InputAdornment,
// } from "@mui/material"
// import {
//   Save as SaveIcon,
//   ArrowBack as ArrowBackIcon,
//   Check as CheckIcon,
//   Person as PersonIcon,
//   Class as ClassIcon,
//   Book as BookIcon,
//   Schedule as ScheduleIcon,
//   Search as SearchIcon,
//   Info as InfoIcon,
//   Star as StarIcon,
//   StarBorder as StarBorderIcon,
//   Help as HelpIcon,
//   AccessTime as AccessTimeIcon,
//   CalendarMonth as CalendarMonthIcon,
//   Groups as GroupsIcon,
// } from "@mui/icons-material"
// import Link from "next/link"

// // Sample data for demonstration
// const sampleTeachers = [
//   {
//     id: 1,
//     name: "Dr. Sarah Johnson",
//     avatar: "/placeholder.svg?height=100&width=100",
//     department: "Science",
//     qualification: "Ph.D. in Physics",
//     experience: "8 years",
//     specialization: "Advanced Physics",
//     rating: 4.8,
//     contact: "sarah.johnson@school.edu",
//     availability: "Full-time",
//   },
//   {
//     id: 2,
//     name: "Prof. Michael Chen",
//     avatar: "/placeholder.svg?height=100&width=100",
//     department: "Mathematics",
//     qualification: "M.Sc. in Mathematics",
//     experience: "12 years",
//     specialization: "Calculus, Algebra",
//     rating: 4.9,
//     contact: "michael.chen@school.edu",
//     availability: "Full-time",
//   },
//   {
//     id: 3,
//     name: "Ms. Emily Rodriguez",
//     avatar: "/placeholder.svg?height=100&width=100",
//     department: "English",
//     qualification: "M.A. in English Literature",
//     experience: "6 years",
//     specialization: "Creative Writing",
//     rating: 4.7,
//     contact: "emily.rodriguez@school.edu",
//     availability: "Part-time",
//   },
//   {
//     id: 4,
//     name: "Mr. David Wilson",
//     avatar: "/placeholder.svg?height=100&width=100",
//     department: "History",
//     qualification: "M.A. in History",
//     experience: "10 years",
//     specialization: "World History",
//     rating: 4.6,
//     contact: "david.wilson@school.edu",
//     availability: "Full-time",
//   },
//   {
//     id: 5,
//     name: "Dr. Priya Patel",
//     avatar: "/placeholder.svg?height=100&width=100",
//     department: "Computer Science",
//     qualification: "Ph.D. in Computer Science",
//     experience: "7 years",
//     specialization: "Artificial Intelligence",
//     rating: 4.9,
//     contact: "priya.patel@school.edu",
//     availability: "Full-time",
//   },
// ]

// const sampleClasses = [
//   { id: 1, name: "Grade 10-A", section: "A", students: 28, schedule: "Morning" },
//   { id: 2, name: "Grade 10-B", section: "B", students: 26, schedule: "Morning" },
//   { id: 3, name: "Grade 11-A", section: "A", students: 24, schedule: "Morning" },
//   { id: 4, name: "Grade 11-B", section: "B", students: 25, schedule: "Afternoon" },
//   { id: 5, name: "Grade 12-A", section: "A", students: 22, schedule: "Morning" },
//   { id: 6, name: "Grade 12-B", section: "B", students: 23, schedule: "Afternoon" },
// ]

// const sampleSubjects = [
//   { id: 1, name: "Physics", department: "Science", hoursPerWeek: 6, type: "Core" },
//   { id: 2, name: "Chemistry", department: "Science", hoursPerWeek: 5, type: "Core" },
//   { id: 3, name: "Biology", department: "Science", hoursPerWeek: 5, type: "Core" },
//   { id: 4, name: "Mathematics", department: "Mathematics", hoursPerWeek: 8, type: "Core" },
//   { id: 5, name: "English Literature", department: "English", hoursPerWeek: 5, type: "Core" },
//   { id: 6, name: "English Language", department: "English", hoursPerWeek: 4, type: "Core" },
//   { id: 7, name: "World History", department: "History", hoursPerWeek: 4, type: "Core" },
//   { id: 8, name: "Computer Science", department: "Computer Science", hoursPerWeek: 6, type: "Elective" },
//   { id: 9, name: "Art", department: "Arts", hoursPerWeek: 3, type: "Elective" },
//   { id: 10, name: "Physical Education", department: "Sports", hoursPerWeek: 4, type: "Compulsory" },
// ]

// const sampleSchedules = [
//   { id: 1, day: "Monday", slots: ["8:00 AM - 9:30 AM", "9:45 AM - 11:15 AM", "11:30 AM - 1:00 PM"] },
//   { id: 2, day: "Tuesday", slots: ["8:00 AM - 9:30 AM", "9:45 AM - 11:15 AM", "11:30 AM - 1:00 PM"] },
//   { id: 3, day: "Wednesday", slots: ["8:00 AM - 9:30 AM", "9:45 AM - 11:15 AM", "11:30 AM - 1:00 PM"] },
//   { id: 4, day: "Thursday", slots: ["8:00 AM - 9:30 AM", "9:45 AM - 11:15 AM", "11:30 AM - 1:00 PM"] },
//   { id: 5, day: "Friday", slots: ["8:00 AM - 9:30 AM", "9:45 AM - 11:15 AM", "11:30 AM - 1:00 PM"] },
// ]

// export default function AssignClassTeacher() {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))
//   const [activeStep, setActiveStep] = useState(0)
//   const [snackbarOpen, setSnackbarOpen] = useState(false)
//   const [saving, setSaving] = useState(false)
//   const [showTips, setShowTips] = useState(true)
//   const [progress, setProgress] = useState(0)
//   const [assignmentData, setAssignmentData] = useState({
//     teacher: null,
//     class: null,
//     subjects: [],
//     schedules: [],
//     isClassTeacher: false,
//     startDate: "",
//     endDate: "",
//     notes: "",
//   })

//   // Filter subjects based on teacher's department
//   const filteredSubjects = assignmentData.teacher
//     ? sampleSubjects.filter((subject) => subject.department === assignmentData.teacher.department)
//     : sampleSubjects

//   useEffect(() => {
//     // Calculate progress based on filled fields
//     const calculateProgress = () => {
//       let filledFields = 0
//       let totalFields = 0

//       // Required fields
//       const requiredFields = ["teacher", "class", "subjects"]
//       requiredFields.forEach((field) => {
//         totalFields++
//         if (assignmentData[field] && (field !== "subjects" ? true : assignmentData[field].length > 0)) {
//           filledFields++
//         }
//       })

//       // Optional fields
//       const optionalFields = ["schedules", "startDate", "endDate", "notes"]
//       optionalFields.forEach((field) => {
//         if (assignmentData[field] && (field !== "schedules" ? true : assignmentData[field].length > 0)) {
//           filledFields += 0.5
//           totalFields += 0.5
//         } else {
//           totalFields += 0.5
//         }
//       })

//       return Math.round((filledFields / totalFields) * 100)
//     }

//     setProgress(calculateProgress())
//   }, [assignmentData])

//   const handleNext = () => {
//     setActiveStep((prevStep) => prevStep + 1)
//     window.scrollTo(0, 0)
//   }

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1)
//     window.scrollTo(0, 0)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setSaving(true)


//     setTimeout(() => {
//       setSaving(false)
//       setSnackbarOpen(true)
//     }, 2000)
//   }

//   const steps = [
//     {
//       label: "Select Teacher",
//       icon: <PersonIcon />,
//       description: "Choose a teacher to assign classes and subjects",
//     },
//     {
//       label: "Select Class",
//       icon: <ClassIcon />,
//       description: "Select the class for this teacher",
//     },
//     {
//       label: "Assign Subjects",
//       icon: <BookIcon />,
//       description: "Choose subjects that will be taught by this teacher",
//     },
//     {
//       label: "Set Schedule",
//       icon: <ScheduleIcon />,
//       description: "Define the teaching schedule",
//     },
//   ]

//   const renderStepIcon = (index) => {
//     return (
//       <Avatar
//         sx={{
//           bgcolor: activeStep >= index ? "primary.main" : "grey.300",
//           color: activeStep >= index ? "white" : "grey.700",
//           width: 40,
//           height: 40,
//           transition: "all 0.3s ease",
//           transform: activeStep === index ? "scale(1.1)" : "scale(1)",
//           boxShadow: activeStep === index ? "0 4px 10px rgba(0,0,0,0.15)" : "none",
//         }}
//       >
//         {steps[index].icon}
//       </Avatar>
//     )
//   }

//   const renderTeacherRating = (rating) => {
//     return (
//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Box key={star} component="span">
//             {rating >= star ? (
//               <StarIcon sx={{ color: "warning.main", fontSize: "1rem" }} />
//             ) : (
//               <StarBorderIcon sx={{ color: "warning.main", fontSize: "1rem" }} />
//             )}
//           </Box>
//         ))}
//         <Typography variant="body2" sx={{ ml: 1 }}>
//           {rating}
//         </Typography>
//       </Box>
//     )
//   }

//   return (
//     <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
//       <Paper
//         elevation={6}
//         sx={{
//           p: { xs: 2, md: 4 },
//           borderRadius: 4,
//           background: "linear-gradient(to right bottom, #ffffff, #f9f9ff)",
//           boxShadow: "0 8px 32px rgba(77, 101, 217, 0.1)",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* Decorative elements */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: -50,
//             right: -50,
//             width: 200,
//             height: 200,
//             borderRadius: "50%",
//             background: "radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)",
//             zIndex: 0,
//           }}
//         />

//         <Box
//           sx={{
//             position: "absolute",
//             bottom: -30,
//             left: -30,
//             width: 150,
//             height: 150,
//             borderRadius: "50%",
//             background: "radial-gradient(circle, rgba(25,118,210,0.08) 0%, rgba(25,118,210,0) 70%)",
//             zIndex: 0,
//           }}
//         />

//         <Box sx={{ position: "relative", zIndex: 1 }}>
//           <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent: "space-between" }}>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Link href="/teachers/assign/list" passHref>
//                 <IconButton
//                   color="primary"
//                   sx={{
//                     mr: 2,
//                     bgcolor: "rgba(25,118,210,0.1)",
//                     "&:hover": {
//                       bgcolor: "rgba(25,118,210,0.2)",
//                     },
//                   }}
//                 >
//                   <ArrowBackIcon />
//                 </IconButton>
//               </Link>
//               <Typography
//                 variant="h4"
//                 component="h1"
//                 fontWeight="bold"
//                 color="primary"
//                 sx={{
//                   background: "linear-gradient(45deg, #1976d2, #42a5f5)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 Assign Class Teacher
//               </Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <Tooltip title={showTips ? "Hide tips" : "Show tips"}>
//                 <IconButton onClick={() => setShowTips(!showTips)} color={showTips ? "primary" : "default"}>
//                   <HelpIcon />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           </Box>

//           <Collapse in={showTips}>
//             <Card
//               variant="outlined"
//               sx={{
//                 mb: 4,
//                 bgcolor: "rgba(25,118,210,0.05)",
//                 borderColor: "primary.light",
//                 borderRadius: 3,
//               }}
//             >
//               <CardContent sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
//                 <InfoIcon color="primary" sx={{ mt: 0.5 }} />
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="medium" color="primary.dark">
//                     Tips for Assigning Teachers
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {activeStep === 0 &&
//                       "Select a qualified teacher with expertise in the subjects they will teach. Consider their experience, specialization, and current workload."}
//                     {activeStep === 1 &&
//                       "Choose a class that aligns with the teacher's expertise and experience level. Consider class size and student needs."}
//                     {activeStep === 2 &&
//                       "Assign subjects that match the teacher's qualifications and interests. Balance the workload appropriately."}
//                     {activeStep === 3 &&
//                       "Create a schedule that works well for both the teacher and students. Avoid scheduling conflicts and ensure adequate breaks."}
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Collapse>

//           <Box sx={{ mb: 4 }}>
//             <LinearProgress
//               variant="determinate"
//               value={progress}
//               sx={{
//                 height: 8,
//                 borderRadius: 4,
//                 bgcolor: "rgba(0,0,0,0.05)",
//                 "& .MuiLinearProgress-bar": {
//                   background: "linear-gradient(90deg, #1976d2, #42a5f5)",
//                 },
//               }}
//             />
//             <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
//               <Typography variant="body2" color="text.secondary">
//                 Completion Progress
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {progress}%
//               </Typography>
//             </Box>
//           </Box>

//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
//             {steps.map((step, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   position: "relative",
//                   width: { xs: "22%", md: "22%" },
//                 }}
//               >
//                 <Box
//                   onClick={() => index <= Math.max(activeStep, 0) && setActiveStep(index)}
//                   sx={{
//                     cursor: index <= Math.max(activeStep, 0) ? "pointer" : "default",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: index <= Math.max(activeStep, 0) ? "translateY(-5px)" : "none",
//                     },
//                   }}
//                 >
//                   {renderStepIcon(index)}
//                 </Box>

//                 <Typography
//                   variant="body2"
//                   align="center"
//                   sx={{
//                     mt: 1,
//                     fontWeight: activeStep === index ? "bold" : "normal",
//                     color: activeStep === index ? "primary.main" : "text.secondary",
//                     display: { xs: "none", sm: "block" },
//                   }}
//                 >
//                   {step.label}
//                 </Typography>

//                 {index < steps.length - 1 && (
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: 20,
//                       right: { xs: "-40%", md: "-40%" },
//                       width: { xs: "80%", md: "80%" },
//                       height: 2,
//                       bgcolor: activeStep > index ? "primary.main" : "grey.300",
//                       zIndex: -1,
//                       display: { xs: "none", sm: "block" },
//                     }}
//                   />
//                 )}
//               </Box>
//             ))}
//           </Box>

//           <Divider sx={{ mb: 4 }} />

//           <form onSubmit={handleSubmit}>
//             <Fade in={activeStep === 0} timeout={500}>
//               <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
//                 <Typography
//                   variant="h5"
//                   gutterBottom
//                   sx={{
//                     mb: 3,
//                     color: "primary.dark",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                   }}
//                 >
//                   <PersonIcon /> Select Teacher
//                 </Typography>

//                 <Grid container spacing={3}>
//                   <Grid item xs={12}>
//                     <FormControl fullWidth>
//                       <Autocomplete
//                         id="teacher-select"
//                         options={sampleTeachers}
//                         getOptionLabel={(option) => option.name}
//                         value={assignmentData.teacher}
//                         onChange={(event, newValue) => {
//                           setAssignmentData({
//                             ...assignmentData,
//                             teacher: newValue,
//                             subjects: [], // Reset subjects when teacher changes
//                           })
//                         }}
//                         renderInput={(params) => (
//                           <TextField
//                             {...params}
//                             label="Search Teacher"
//                             variant="outlined"
//                             placeholder="Type to search..."
//                             InputProps={{
//                               ...params.InputProps,
//                               startAdornment: (
//                                 <>
//                                   <InputAdornment position="start">
//                                     <SearchIcon />
//                                   </InputAdornment>
//                                   {params.InputProps.startAdornment}
//                                 </>
//                               ),
//                               sx: { borderRadius: 2 },
//                             }}
//                           />
//                         )}
//                         renderOption={(props, option) => (
//                           <li {...props}>
//                             <Box sx={{ display: "flex", width: "100%" }}>
//                               <Box sx={{ mr: 2 }}>
//                                 <Avatar src={option.avatar} alt={option.name}>
//                                   {option.name.charAt(0)}
//                                 </Avatar>
//                               </Box>
//                               <Box sx={{ flexGrow: 1 }}>
//                                 <Typography variant="subtitle1" fontWeight="medium">
//                                   {option.name}
//                                 </Typography>
//                                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                                   <Typography variant="body2" color="text.secondary">
//                                     {option.department} • {option.experience}
//                                   </Typography>
//                                   {renderTeacherRating(option.rating)}
//                                 </Box>
//                               </Box>
//                             </Box>
//                           </li>
//                         )}
//                       />
//                     </FormControl>
//                   </Grid>

//                   {assignmentData.teacher && (
//                     <Grid item xs={12}>
//                       <Zoom in={Boolean(assignmentData.teacher)}>
//                         <Card
//                           variant="outlined"
//                           sx={{
//                             borderRadius: 3,
//                             transition: "all 0.3s ease",
//                             "&:hover": {
//                               boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                             },
//                           }}
//                         >
//                           <CardContent>
//                             <Grid container spacing={2}>
//                               <Grid item xs={12} sm={3} md={2}>
//                                 <Avatar
//                                   src={assignmentData.teacher.avatar}
//                                   alt={assignmentData.teacher.name}
//                                   sx={{ width: 80, height: 80, mb: 1 }}
//                                 >
//                                   {assignmentData.teacher.name.charAt(0)}
//                                 </Avatar>
//                               </Grid>
//                               <Grid item xs={12} sm={9} md={10}>
//                                 <Box
//                                   sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
//                                 >
//                                   <Typography variant="h6" fontWeight="bold">
//                                     {assignmentData.teacher.name}
//                                   </Typography>
//                                   {renderTeacherRating(assignmentData.teacher.rating)}
//                                 </Box>

//                                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2, mt: 1 }}>
//                                   <Chip
//                                     label={assignmentData.teacher.department}
//                                     size="small"
//                                     color="primary"
//                                     variant="outlined"
//                                     sx={{ borderRadius: 1 }}
//                                   />
//                                   <Chip
//                                     label={assignmentData.teacher.qualification}
//                                     size="small"
//                                     color="secondary"
//                                     variant="outlined"
//                                     sx={{ borderRadius: 1 }}
//                                   />
//                                   <Chip
//                                     label={assignmentData.teacher.availability}
//                                     size="small"
//                                     color={assignmentData.teacher.availability === "Full-time" ? "success" : "warning"}
//                                     variant="outlined"
//                                     sx={{ borderRadius: 1 }}
//                                   />
//                                 </Box>

//                                 <Grid container spacing={2}>
//                                   <Grid item xs={12} sm={6}>
//                                     <Typography variant="body2" color="text.secondary">
//                                       Experience
//                                     </Typography>
//                                     <Typography variant="body1">{assignmentData.teacher.experience}</Typography>
//                                   </Grid>
//                                   <Grid item xs={12} sm={6}>
//                                     <Typography variant="body2" color="text.secondary">
//                                       Specialization
//                                     </Typography>
//                                     <Typography variant="body1">{assignmentData.teacher.specialization}</Typography>
//                                   </Grid>
//                                   <Grid item xs={12}>
//                                     <Typography variant="body2" color="text.secondary">
//                                       Contact
//                                     </Typography>
//                                     <Typography variant="body1">{assignmentData.teacher.contact}</Typography>
//                                   </Grid>
//                                 </Grid>
//                               </Grid>
//                             </Grid>
//                           </CardContent>
//                         </Card>
//                       </Zoom>
//                     </Grid>
//                   )}
//                 </Grid>
//               </Box>
//             </Fade>

//             <Fade in={activeStep === 1} timeout={500}>
//               <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
//                 <Typography
//                   variant="h5"
//                   gutterBottom
//                   sx={{
//                     mb: 3,
//                     color: "primary.dark",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                   }}
//                 >
//                   <ClassIcon /> Select Class
//                 </Typography>

//                 <Grid container spacing={3}>
//                   <Grid item xs={12}>
//                     <FormControl fullWidth>
//                       <Autocomplete
//                         id="class-select"
//                         options={sampleClasses}
//                         getOptionLabel={(option) => option.name}
//                         value={assignmentData.class}
//                         onChange={(event, newValue) => {
//                           setAssignmentData({
//                             ...assignmentData,
//                             class: newValue,
//                           })
//                         }}
//                         renderInput={(params) => (
//                           <TextField
//                             {...params}
//                             label="Select Class"
//                             variant="outlined"
//                             placeholder="Choose a class..."
//                             InputProps={{
//                               ...params.InputProps,
//                               sx: { borderRadius: 2 },
//                             }}
//                           />
//                         )}
//                         renderOption={(props, option) => (
//                           <li {...props}>
//                             <Box sx={{ display: "flex", width: "100%" }}>
//                               <Box sx={{ mr: 2 }}>
//                                 <Avatar sx={{ bgcolor: "secondary.main" }}>
//                                   {option.name
//                                     .split("-")[0]
//                                     .trim()
//                                     .charAt(option.name.length - 1)}
//                                 </Avatar>
//                               </Box>
//                               <Box sx={{ flexGrow: 1 }}>
//                                 <Typography variant="subtitle1" fontWeight="medium">
//                                   {option.name}
//                                 </Typography>
//                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                   <Typography variant="body2" color="text.secondary">
//                                     Section {option.section} • {option.students} students
//                                   </Typography>
//                                   <Chip
//                                     label={option.schedule}
//                                     size="small"
//                                     color={option.schedule === "Morning" ? "primary" : "secondary"}
//                                     variant="outlined"
//                                     sx={{ borderRadius: 1 }}
//                                   />
//                                 </Box>
//                               </Box>
//                             </Box>
//                           </li>
//                         )}
//                       />
//                     </FormControl>
//                   </Grid>

//                   {assignmentData.class && (
//                     <Grid item xs={12}>
//                       <Zoom in={Boolean(assignmentData.class)}>
//                         <Card
//                           variant="outlined"
//                           sx={{
//                             borderRadius: 3,
//                             transition: "all 0.3s ease",
//                             "&:hover": {
//                               boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                             },
//                           }}
//                         >
//                           <CardContent>
//                             <Grid container spacing={2} alignItems="center">
//                               <Grid item xs={12} sm={3} md={2}>
//                                 <Avatar
//                                   sx={{
//                                     width: 80,
//                                     height: 80,
//                                     mb: 1,
//                                     bgcolor: "secondary.main",
//                                     fontSize: "2rem",
//                                   }}
//                                 >
//                                   {assignmentData.class.section}
//                                 </Avatar>
//                               </Grid>
//                               <Grid item xs={12} sm={9} md={10}>
//                                 <Typography variant="h6" fontWeight="bold">
//                                   {assignmentData.class.name}
//                                 </Typography>

//                                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2, mt: 1 }}>
//                                   <Chip
//                                     label={`Section ${assignmentData.class.section}`}
//                                     size="small"
//                                     color="primary"
//                                     variant="outlined"
//                                     sx={{ borderRadius: 1 }}
//                                   />
//                                   <Chip
//                                     label={`${assignmentData.class.students} Students`}
//                                     size="small"
//                                     color="secondary"
//                                     variant="outlined"
//                                     icon={<GroupsIcon />}
//                                     sx={{ borderRadius: 1 }}
//                                   />
//                                   <Chip
//                                     label={assignmentData.class.schedule}
//                                     size="small"
//                                     color={assignmentData.class.schedule === "Morning" ? "info" : "warning"}
//                                     variant="outlined"
//                                     sx={{ borderRadius: 1 }}
//                                   />
//                                 </Box>

//                                 <FormControlLabel
//                                   control={
//                                     <Checkbox
//                                       checked={assignmentData.isClassTeacher}
//                                       onChange={(e) =>
//                                         setAssignmentData({
//                                           ...assignmentData,
//                                           isClassTeacher: e.target.checked,
//                                         })
//                                       }
//                                       color="primary"
//                                     />
//                                   }
//                                   label={
//                                     <Typography fontWeight="medium" color="primary.dark">
//                                       Assign as Class Teacher (Homeroom Teacher)
//                                     </Typography>
//                                   }
//                                 />
//                                 {assignmentData.isClassTeacher && (
//                                   <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 4 }}>
//                                     As a Class Teacher, this teacher will be responsible for overall class management,
//                                     student counseling, and parent communication for this class.
//                                   </Typography>
//                                 )}
//                               </Grid>
//                             </Grid>
//                           </CardContent>
//                         </Card>
//                       </Zoom>
//                     </Grid>
//                   )}
//                 </Grid>
//               </Box>
//             </Fade>

//             <Fade in={activeStep === 2} timeout={500}>
//               <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
//                 <Typography
//                   variant="h5"
//                   gutterBottom
//                   sx={{
//                     mb: 3,
//                     color: "primary.dark",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                   }}
//                 >
//                   <BookIcon /> Assign Subjects
//                 </Typography>

//                 <Grid container spacing={3}>
//                   <Grid item xs={12}>
//                     <FormControl fullWidth>
//                       <InputLabel id="subjects-label">Select Subjects</InputLabel>
//                       <Select
//                         labelId="subjects-label"
//                         id="subjects-select"
//                         multiple
//                         value={assignmentData.subjects}
//                         onChange={(e) =>
//                           setAssignmentData({
//                             ...assignmentData,
//                             subjects: e.target.value,
//                           })
//                         }
//                         input={<OutlinedInput label="Select Subjects" sx={{ borderRadius: 2 }} />}
//                         renderValue={(selected) => (
//                           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                             {selected.map((value) => (
//                               <Chip key={value.id} label={value.name} size="small" sx={{ borderRadius: 1 }} />
//                             ))}
//                           </Box>
//                         )}
//                       >
//                         {filteredSubjects.map((subject) => (
//                           <MenuItem key={subject.id} value={subject}>
//                             <Checkbox checked={assignmentData.subjects.indexOf(subject) > -1} />
//                             <ListItemText
//                               primary={subject.name}
//                               secondary={`${subject.department} • ${subject.hoursPerWeek} hrs/week • ${subject.type}`}
//                             />
//                           </MenuItem>
//                         ))}
//                       </Select>
//                       <FormHelperText>
//                         {assignmentData.teacher
//                           ? `Showing subjects from ${assignmentData.teacher.department} department`
//                           : "Please select a teacher first"}
//                       </FormHelperText>
//                     </FormControl>
//                   </Grid>

//                   {assignmentData.subjects.length > 0 && (
//                     <Grid item xs={12}>
//                       <Zoom in={assignmentData.subjects.length > 0}>
//                         <Card
//                           variant="outlined"
//                           sx={{
//                             borderRadius: 3,
//                             transition: "all 0.3s ease",
//                             "&:hover": {
//                               boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                             },
//                           }}
//                         >
//                           <CardContent>
//                             <Typography variant="h6" fontWeight="bold" gutterBottom>
//                               Selected Subjects
//                             </Typography>

//                             <Grid container spacing={2}>
//                               {assignmentData.subjects.map((subject) => (
//                                 <Grid item xs={12} sm={6} md={4} key={subject.id}>
//                                   <Card
//                                     variant="outlined"
//                                     sx={{
//                                       borderRadius: 2,
//                                       bgcolor:
//                                         subject.type === "Core"
//                                           ? "rgba(25,118,210,0.05)"
//                                           : subject.type === "Elective"
//                                             ? "rgba(156,39,176,0.05)"
//                                             : "rgba(46,125,50,0.05)",
//                                     }}
//                                   >
//                                     <CardContent>
//                                       <Typography variant="subtitle1" fontWeight="medium">
//                                         {subject.name}
//                                       </Typography>
//                                       <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
//                                         <Chip
//                                           label={subject.type}
//                                           size="small"
//                                           color={
//                                             subject.type === "Core"
//                                               ? "primary"
//                                               : subject.type === "Elective"
//                                                 ? "secondary"
//                                                 : "success"
//                                           }
//                                           variant="outlined"
//                                           sx={{ borderRadius: 1 }}
//                                         />
//                                         <Chip
//                                           label={`${subject.hoursPerWeek} hrs/week`}
//                                           size="small"
//                                           icon={<AccessTimeIcon fontSize="small" />}
//                                           variant="outlined"
//                                           sx={{ borderRadius: 1 }}
//                                         />
//                                       </Box>
//                                     </CardContent>
//                                   </Card>
//                                 </Grid>
//                               ))}
//                             </Grid>

//                             <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
//                               <InfoIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
//                               <Typography variant="body2" color="text.secondary">
//                                 Total teaching hours:{" "}
//                                 <strong>
//                                   {assignmentData.subjects.reduce((total, subject) => total + subject.hoursPerWeek, 0)}{" "}
//                                   hours per week
//                                 </strong>
//                               </Typography>
//                             </Box>
//                           </CardContent>
//                         </Card>
//                       </Zoom>
//                     </Grid>
//                   )}
//                 </Grid>
//               </Box>
//             </Fade>

//             <Fade in={activeStep === 3} timeout={500}>
//               <Box sx={{ display: activeStep === 3 ? "block" : "none" }}>
//                 <Typography
//                   variant="h5"
//                   gutterBottom
//                   sx={{
//                     mb: 3,
//                     color: "primary.dark",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                   }}
//                 >
//                   <ScheduleIcon /> Set Schedule & Details
//                 </Typography>

//                 <Grid container spacing={3}>
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="Start Date"
//                       type="date"
//                       value={assignmentData.startDate}
//                       onChange={(e) =>
//                         setAssignmentData({
//                           ...assignmentData,
//                           startDate: e.target.value,
//                         })
//                       }
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                       InputProps={{
//                         sx: { borderRadius: 2 },
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <CalendarMonthIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="End Date"
//                       type="date"
//                       value={assignmentData.endDate}
//                       onChange={(e) =>
//                         setAssignmentData({
//                           ...assignmentData,
//                           endDate: e.target.value,
//                         })
//                       }
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                       InputProps={{
//                         sx: { borderRadius: 2 },
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <CalendarMonthIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <FormControl fullWidth>
//                       <InputLabel id="schedule-label">Preferred Schedule</InputLabel>
//                       <Select
//                         labelId="schedule-label"
//                         id="schedule-select"
//                         multiple
//                         value={assignmentData.schedules}
//                         onChange={(e) =>
//                           setAssignmentData({
//                             ...assignmentData,
//                             schedules: e.target.value,
//                           })
//                         }
//                         input={<OutlinedInput label="Preferred Schedule" sx={{ borderRadius: 2 }} />}
//                         renderValue={(selected) => (
//                           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                             {selected.map((value) => (
//                               <Chip key={value.id} label={`${value.day}`} size="small" sx={{ borderRadius: 1 }} />
//                             ))}
//                           </Box>
//                         )}
//                       >
//                         {sampleSchedules.map((schedule) => (
//                           <MenuItem key={schedule.id} value={schedule}>
//                             <Checkbox checked={assignmentData.schedules.indexOf(schedule) > -1} />
//                             <ListItemText primary={schedule.day} secondary={schedule.slots.join(", ")} />
//                           </MenuItem>
//                         ))}
//                       </Select>
//                       <FormHelperText>Select preferred teaching days and time slots</FormHelperText>
//                     </FormControl>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Additional Notes"
//                       multiline
//                       rows={4}
//                       value={assignmentData.notes}
//                       onChange={(e) =>
//                         setAssignmentData({
//                           ...assignmentData,
//                           notes: e.target.value,
//                         })
//                       }
//                       placeholder="Add any additional information or special instructions..."
//                       InputProps={{
//                         sx: { borderRadius: 2 },
//                       }}
//                     />
//                   </Grid>

//                   {assignmentData.teacher && assignmentData.class && assignmentData.subjects.length > 0 && (
//                     <Grid item xs={12}>
//                       <Zoom
//                         in={Boolean(
//                           assignmentData.teacher && assignmentData.class && assignmentData.subjects.length > 0,
//                         )}
//                       >
//                         <Card
//                           variant="outlined"
//                           sx={{
//                             borderRadius: 3,
//                             transition: "all 0.3s ease",
//                             bgcolor: "rgba(25,118,210,0.05)",
//                             borderColor: "primary.light",
//                             "&:hover": {
//                               boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                             },
//                           }}
//                         >
//                           <CardContent>
//                             <Typography variant="h6" fontWeight="bold" gutterBottom>
//                               Assignment Summary
//                             </Typography>

//                             <Grid container spacing={2}>
//                               <Grid item xs={12} sm={6}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Teacher
//                                 </Typography>
//                                 <Typography variant="body1" fontWeight="medium">
//                                   {assignmentData.teacher.name}
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={12} sm={6}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Class
//                                 </Typography>
//                                 <Typography variant="body1" fontWeight="medium">
//                                   {assignmentData.class.name}
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={12} sm={6}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Role
//                                 </Typography>
//                                 <Typography variant="body1" fontWeight="medium">
//                                   {assignmentData.isClassTeacher
//                                     ? "Class Teacher & Subject Teacher"
//                                     : "Subject Teacher"}
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={12} sm={6}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Subjects
//                                 </Typography>
//                                 <Typography variant="body1" fontWeight="medium">
//                                   {assignmentData.subjects.map((s) => s.name).join(", ")}
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={12} sm={6}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Duration
//                                 </Typography>
//                                 <Typography variant="body1" fontWeight="medium">
//                                   {assignmentData.startDate && assignmentData.endDate
//                                     ? `${assignmentData.startDate} to ${assignmentData.endDate}`
//                                     : "Not specified"}
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={12} sm={6}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Schedule
//                                 </Typography>
//                                 <Typography variant="body1" fontWeight="medium">
//                                   {assignmentData.schedules.length > 0
//                                     ? assignmentData.schedules.map((s) => s.day).join(", ")
//                                     : "Not specified"}
//                                 </Typography>
//                               </Grid>
//                             </Grid>
//                           </CardContent>
//                         </Card>
//                       </Zoom>
//                     </Grid>
//                   )}
//                 </Grid>
//               </Box>
//             </Fade>

//             <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//               <Button
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 variant="outlined"
//                 startIcon={<ArrowBackIcon />}
//                 sx={{
//                   borderRadius: 2,
//                   borderWidth: 2,
//                   "&:hover": {
//                     borderWidth: 2,
//                   },
//                 }}
//               >
//                 Back
//               </Button>

//               <Box>
//                 {activeStep === steps.length - 1 ? (
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     startIcon={<SaveIcon />}
//                     size="large"
//                     disabled={
//                       saving || !assignmentData.teacher || !assignmentData.class || assignmentData.subjects.length === 0
//                     }
//                     sx={{
//                       borderRadius: 2,
//                       boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
//                       "&:hover": {
//                         boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
//                       },
//                     }}
//                   >
//                     {saving ? "Saving..." : "Save Assignment"}
//                   </Button>
//                 ) : (
//                   <Button
//                     variant="contained"
//                     onClick={handleNext}
//                     color="primary"
//                     endIcon={<CheckIcon />}
//                     disabled={
//                       (activeStep === 0 && !assignmentData.teacher) ||
//                       (activeStep === 1 && !assignmentData.class) ||
//                       (activeStep === 2 && assignmentData.subjects.length === 0)
//                     }
//                     sx={{
//                       borderRadius: 2,
//                       boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
//                       "&:hover": {
//                         boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
//                       },
//                     }}
//                   >
//                     Next
//                   </Button>
//                 )}
//               </Box>
//             </Box>
//           </form>
//         </Box>
//       </Paper>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled" sx={{ width: "100%" }}>
//           Teacher assignment saved successfully!
//         </Alert>
//       </Snackbar>

//       <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={saving}>
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     </Container>
//   )
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
  Zoom,
  Fade,
  Chip,
  Avatar,
  LinearProgress,
  Backdrop,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Collapse,
  Autocomplete,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  ListItemText,
  OutlinedInput,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material"
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Check as CheckIcon,
  Person as PersonIcon,
  Class as ClassIcon,
  Book as BookIcon,
  Schedule as ScheduleIcon,
  Search as SearchIcon,
  Info as InfoIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Help as HelpIcon,
  AccessTime as AccessTimeIcon,
  CalendarMonth as CalendarMonthIcon,
  Groups as GroupsIcon,
} from "@mui/icons-material"
import Link from "next/link"

// Type definitions for data structures
interface Teacher {
  id: number
  name: string
  avatar: string
  department: string
  qualification: string
  experience: string
  specialization: string
  rating: number
  contact: string
  availability: string
}

interface Class {
  id: number
  name: string
  section: string
  students: number
  schedule: string
}

interface Subject {
  id: number
  name: string
  department: string
  hoursPerWeek: number
  type: string
}

interface Schedule {
  id: number
  day: string
  slots: string[]
}

interface AssignmentData {
  teacher: Teacher | null
  class: Class | null
  subjects: Subject[]
  schedules: Schedule[]
  isClassTeacher: boolean
  startDate: string
  endDate: string
  notes: string
}

interface Step {
  label: string
  icon: React.ReactNode
  description: string
}

// Sample data for demonstration
const sampleTeachers: Teacher[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    department: "Science",
    qualification: "Ph.D. in Physics",
    experience: "8 years",
    specialization: "Advanced Physics",
    rating: 4.8,
    contact: "sarah.johnson@school.edu",
    availability: "Full-time",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    avatar: "/placeholder.svg?height=100&width=100",
    department: "Mathematics",
    qualification: "M.Sc. in Mathematics",
    experience: "12 years",
    specialization: "Calculus, Algebra",
    rating: 4.9,
    contact: "michael.chen@school.edu",
    availability: "Full-time",
  },
  {
    id: 3,
    name: "Ms. Emily Rodriguez",
    avatar: "/placeholder.svg?height=100&width=100",
    department: "English",
    qualification: "M.A. in English Literature",
    experience: "6 years",
    specialization: "Creative Writing",
    rating: 4.7,
    contact: "emily.rodriguez@school.edu",
    availability: "Part-time",
  },
  {
    id: 4,
    name: "Mr. David Wilson",
    avatar: "/placeholder.svg?height=100&width=100",
    department: "History",
    qualification: "M.A. in History",
    experience: "10 years",
    specialization: "World History",
    rating: 4.6,
    contact: "david.wilson@school.edu",
    availability: "Full-time",
  },
  {
    id: 5,
    name: "Dr. Priya Patel",
    avatar: "/placeholder.svg?height=100&width=100",
    department: "Computer Science",
    qualification: "Ph.D. in Computer Science",
    experience: "7 years",
    specialization: "Artificial Intelligence",
    rating: 4.9,
    contact: "priya.patel@school.edu",
    availability: "Full-time",
  },
]

const sampleClasses: Class[] = [
  { id: 1, name: "Grade 10-A", section: "A", students: 28, schedule: "Morning" },
  { id: 2, name: "Grade 10-B", section: "B", students: 26, schedule: "Morning" },
  { id: 3, name: "Grade 11-A", section: "A", students: 24, schedule: "Morning" },
  { id: 4, name: "Grade 11-B", section: "B", students: 25, schedule: "Afternoon" },
  { id: 5, name: "Grade 12-A", section: "A", students: 22, schedule: "Morning" },
  { id: 6, name: "Grade 12-B", section: "B", students: 23, schedule: "Afternoon" },
]

const sampleSubjects: Subject[] = [
  { id: 1, name: "Physics", department: "Science", hoursPerWeek: 6, type: "Core" },
  { id: 2, name: "Chemistry", department: "Science", hoursPerWeek: 5, type: "Core" },
  { id: 3, name: "Biology", department: "Science", hoursPerWeek: 5, type: "Core" },
  { id: 4, name: "Mathematics", department: "Mathematics", hoursPerWeek: 8, type: "Core" },
  { id: 5, name: "English Literature", department: "English", hoursPerWeek: 5, type: "Core" },
  { id: 6, name: "English Language", department: "English", hoursPerWeek: 4, type: "Core" },
  { id: 7, name: "World History", department: "History", hoursPerWeek: 4, type: "Core" },
  { id: 8, name: "Computer Science", department: "Computer Science", hoursPerWeek: 6, type: "Elective" },
  { id: 9, name: "Art", department: "Arts", hoursPerWeek: 3, type: "Elective" },
  { id: 10, name: "Physical Education", department: "Sports", hoursPerWeek: 4, type: "Compulsory" },
]

const sampleSchedules: Schedule[] = [
  { id: 1, day: "Monday", slots: ["8:00 AM - 9:30 AM", "9:45 AM - 11:15 AM", "11:30 AM - 1:00 PM"] },
  { id: 2, day: "Tuesday", slots: ["8:00 AM - 9:30 AM", "9:45 AM - 11:15 AM", "11:30 AM - 1:00 PM"] },
  { id: 3, day: "Wednesday", slots: ["8:00 AM - 9:30 AM", "9:45 AM - 11:15 AM", "11:30 AM - 1:00 PM"] },
  { id: 4, day: "Thursday", slots: ["8:00 AM - 9:30 AM", "9:45 AM - 11:15 AM", "11:30 AM - 1:00 PM"] },
  { id: 5, day: "Friday", slots: ["8:00 AM - 9:30 AM", "9:45 AM - 11:15 AM", "11:30 AM - 1:00 PM"] },
]

export default function AssignClassTeacher() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [activeStep, setActiveStep] = useState<number>(0)
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
  const [showTips, setShowTips] = useState<boolean>(true)
  const [progress, setProgress] = useState<number>(0)
  const [assignmentData, setAssignmentData] = useState<AssignmentData>({
    teacher: null,
    class: null,
    subjects: [],
    schedules: [],
    isClassTeacher: false,
    startDate: "",
    endDate: "",
    notes: "",
  })

  // Filter subjects based on teacher's department
  const filteredSubjects = assignmentData.teacher
    ? sampleSubjects.filter((subject) => subject.department === assignmentData.teacher?.department)
    : sampleSubjects

  useEffect(() => {
    // Calculate progress based on filled fields
    const calculateProgress = () => {
      let filledFields = 0
      let totalFields = 0

      // Required fields
      const requiredFields = ["teacher", "class", "subjects"]
      requiredFields.forEach((field) => {
        totalFields++
        if (
          assignmentData[field as keyof AssignmentData] &&
          (field !== "subjects" ? true : (assignmentData[field as keyof AssignmentData] as Subject[]).length > 0)
        ) {
          filledFields++
        }
      })

      // Optional fields
      const optionalFields = ["schedules", "startDate", "endDate", "notes"]
      optionalFields.forEach((field) => {
        if (
          assignmentData[field as keyof AssignmentData] &&
          (field !== "schedules" ? true : (assignmentData[field as keyof AssignmentData] as Schedule[]).length > 0)
        ) {
          filledFields += 0.5
          totalFields += 0.5
        } else {
          totalFields += 0.5
        }
      })

      return Math.round((filledFields / totalFields) * 100)
    }

    setProgress(calculateProgress())
  }, [assignmentData])

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    setTimeout(() => {
      setSaving(false)
      setSnackbarOpen(true)
    }, 2000)
  }

  const steps: Step[] = [
    {
      label: "Select Teacher",
      icon: <PersonIcon />,
      description: "Choose a teacher to assign classes and subjects",
    },
    {
      label: "Select Class",
      icon: <ClassIcon />,
      description: "Select the class for this teacher",
    },
    {
      label: "Assign Subjects",
      icon: <BookIcon />,
      description: "Choose subjects that will be taught by this teacher",
    },
    {
      label: "Set Schedule",
      icon: <ScheduleIcon />,
      description: "Define the teaching schedule",
    },
  ]

  const renderStepIcon = (index: number) => {
    return (
      <Avatar
        sx={{
          bgcolor: activeStep >= index ? "primary.main" : "grey.300",
          color: activeStep >= index ? "white" : "grey.700",
          width: 40,
          height: 40,
          transition: "all 0.3s ease",
          transform: activeStep === index ? "scale(1.1)" : "scale(1)",
          boxShadow: activeStep === index ? "0 4px 10px rgba(0,0,0,0.15)" : "none",
        }}
      >
        {steps[index].icon}
      </Avatar>
    )
  }

  const renderTeacherRating = (rating: number) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Box key={star} component="span">
            {rating >= star ? (
              <StarIcon sx={{ color: "warning.main", fontSize: "1rem" }} />
            ) : (
              <StarBorderIcon sx={{ color: "warning.main", fontSize: "1rem" }} />
            )}
          </Box>
        ))}
        <Typography variant="body2" sx={{ ml: 1 }}>
          {rating}
        </Typography>
      </Box>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          background: "linear-gradient(to right bottom, #ffffff, #f9f9ff)",
          boxShadow: "0 8px 32px rgba(77, 101, 217, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(25,118,210,0.08) 0%, rgba(25,118,210,0) 70%)",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link href="/teachers/assign/list" passHref>
                <IconButton
                  color="primary"
                  sx={{
                    mr: 2,
                    bgcolor: "rgba(25,118,210,0.1)",
                    "&:hover": {
                      bgcolor: "rgba(25,118,210,0.2)",
                    },
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                color="primary"
                sx={{
                  background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Assign Class Teacher
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title={showTips ? "Hide tips" : "Show tips"}>
                <IconButton onClick={() => setShowTips(!showTips)} color={showTips ? "primary" : "default"}>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Collapse in={showTips}>
            <Card
              variant="outlined"
              sx={{
                mb: 4,
                bgcolor: "rgba(25,118,210,0.05)",
                borderColor: "primary.light",
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <InfoIcon color="primary" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium" color="primary.dark">
                    Tips for Assigning Teachers
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activeStep === 0 &&
                      "Select a qualified teacher with expertise in the subjects they will teach. Consider their experience, specialization, and current workload."}
                    {activeStep === 1 &&
                      "Choose a class that aligns with the teacher's expertise and experience level. Consider class size and student needs."}
                    {activeStep === 2 &&
                      "Assign subjects that match the teacher's qualifications and interests. Balance the workload appropriately."}
                    {activeStep === 3 &&
                      "Create a schedule that works well for both the teacher and students. Avoid scheduling conflicts and ensure adequate breaks."}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Collapse>

          <Box sx={{ mb: 4 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: "rgba(0,0,0,0.05)",
                "& .MuiLinearProgress-bar": {
                  background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                },
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Completion Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {progress}%
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
            {steps.map((step, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  width: { xs: "22%", md: "22%" },
                }}
              >
                <Box
                  onClick={() => index <= Math.max(activeStep, 0) && setActiveStep(index)}
                  sx={{
                    cursor: index <= Math.max(activeStep, 0) ? "pointer" : "default",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: index <= Math.max(activeStep, 0) ? "translateY(-5px)" : "none",
                    },
                  }}
                >
                  {renderStepIcon(index)}
                </Box>

                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    mt: 1,
                    fontWeight: activeStep === index ? "bold" : "normal",
                    color: activeStep === index ? "primary.main" : "text.secondary",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {step.label}
                </Typography>

                {index < steps.length - 1 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 20,
                      right: { xs: "-40%", md: "-40%" },
                      width: { xs: "80%", md: "80%" },
                      height: 2,
                      bgcolor: activeStep > index ? "primary.main" : "grey.300",
                      zIndex: -1,
                      display: { xs: "none", sm: "block" },
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>

          <Divider sx={{ mb: 4 }} />

          <form onSubmit={handleSubmit}>
            <Fade in={activeStep === 0} timeout={500}>
              <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    mb: 3,
                    color: "primary.dark",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PersonIcon /> Select Teacher
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Autocomplete
                        id="teacher-select"
                        options={sampleTeachers}
                        getOptionLabel={(option) => option.name}
                        value={assignmentData.teacher}
                        onChange={(event, newValue) => {
                          setAssignmentData({
                            ...assignmentData,
                            teacher: newValue,
                            subjects: [], // Reset subjects when teacher changes
                          })
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Search Teacher"
                            variant="outlined"
                            placeholder="Type to search..."
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  <InputAdornment position="start">
                                    <SearchIcon />
                                  </InputAdornment>
                                  {params.InputProps.startAdornment}
                                </>
                              ),
                              sx: { borderRadius: 2 },
                            }}
                          />
                        )}
                        renderOption={(props, option) => (
                          <li {...props}>
                            <Box sx={{ display: "flex", width: "100%" }}>
                              <Box sx={{ mr: 2 }}>
                                <Avatar src={option.avatar} alt={option.name}>
                                  {option.name.charAt(0)}
                                </Avatar>
                              </Box>
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" fontWeight="medium">
                                  {option.name}
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <Typography variant="body2" color="text.secondary">
                                    {option.department} • {option.experience}
                                  </Typography>
                                  {renderTeacherRating(option.rating)}
                                </Box>
                              </Box>
                            </Box>
                          </li>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {assignmentData.teacher && (
                    <Grid item xs={12}>
                      <Zoom in={Boolean(assignmentData.teacher)}>
                        <Card
                          variant="outlined"
                          sx={{
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            },
                          }}
                        >
                          <CardContent>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={3} md={2}>
                                <Avatar
                                  src={assignmentData.teacher.avatar}
                                  alt={assignmentData.teacher.name}
                                  sx={{ width: 80, height: 80, mb: 1 }}
                                >
                                  {assignmentData.teacher.name.charAt(0)}
                                </Avatar>
                              </Grid>
                              <Grid item xs={12} sm={9} md={10}>
                                <Box
                                  sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
                                >
                                  <Typography variant="h6" fontWeight="bold">
                                    {assignmentData.teacher.name}
                                  </Typography>
                                  {renderTeacherRating(assignmentData.teacher.rating)}
                                </Box>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2, mt: 1 }}>
                                  <Chip
                                    label={assignmentData.teacher.department}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ borderRadius: 1 }}
                                  />
                                  <Chip
                                    label={assignmentData.teacher.qualification}
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                    sx={{ borderRadius: 1 }}
                                  />
                                  <Chip
                                    label={assignmentData.teacher.availability}
                                    size="small"
                                    color={assignmentData.teacher.availability === "Full-time" ? "success" : "warning"}
                                    variant="outlined"
                                    sx={{ borderRadius: 1 }}
                                  />
                                </Box>

                                <Grid container spacing={2}>
                                  <Grid item xs={12} sm={6}>
                                    <Typography variant="body2" color="text.secondary">
                                      Experience
                                    </Typography>
                                    <Typography variant="body1">{assignmentData.teacher.experience}</Typography>
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <Typography variant="body2" color="text.secondary">
                                      Specialization
                                    </Typography>
                                    <Typography variant="body1">{assignmentData.teacher.specialization}</Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">
                                      Contact
                                    </Typography>
                                    <Typography variant="body1">{assignmentData.teacher.contact}</Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Zoom>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Fade>

            <Fade in={activeStep === 1} timeout={500}>
              <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    mb: 3,
                    color: "primary.dark",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ClassIcon /> Select Class
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Autocomplete
                        id="class-select"
                        options={sampleClasses}
                        getOptionLabel={(option) => option.name}
                        value={assignmentData.class}
                        onChange={(event, newValue) => {
                          setAssignmentData({
                            ...assignmentData,
                            class: newValue,
                          })
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Class"
                            variant="outlined"
                            placeholder="Choose a class..."
                            InputProps={{
                              ...params.InputProps,
                              sx: { borderRadius: 2 },
                            }}
                          />
                        )}
                        renderOption={(props, option) => (
                          <li {...props}>
                            <Box sx={{ display: "flex", width: "100%" }}>
                              <Box sx={{ mr: 2 }}>
                                <Avatar sx={{ bgcolor: "secondary.main" }}>
                                  {option.name
                                    .split("-")[0]
                                    .trim()
                                    .charAt(option.name.length - 1)}
                                </Avatar>
                              </Box>
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" fontWeight="medium">
                                  {option.name}
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                  <Typography variant="body2" color="text.secondary">
                                    Section {option.section} • {option.students} students
                                  </Typography>
                                  <Chip
                                    label={option.schedule}
                                    size="small"
                                    color={option.schedule === "Morning" ? "primary" : "secondary"}
                                    variant="outlined"
                                    sx={{ borderRadius: 1 }}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </li>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {assignmentData.class && (
                    <Grid item xs={12}>
                      <Zoom in={Boolean(assignmentData.class)}>
                        <Card
                          variant="outlined"
                          sx={{
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            },
                          }}
                        >
                          <CardContent>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={12} sm={3} md={2}>
                                <Avatar
                                  sx={{
                                    width: 80,
                                    height: 80,
                                    mb: 1,
                                    bgcolor: "secondary.main",
                                    fontSize: "2rem",
                                  }}
                                >
                                  {assignmentData.class.section}
                                </Avatar>
                              </Grid>
                              <Grid item xs={12} sm={9} md={10}>
                                <Typography variant="h6" fontWeight="bold">
                                  {assignmentData.class.name}
                                </Typography>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2, mt: 1 }}>
                                  <Chip
                                    label={`Section ${assignmentData.class.section}`}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ borderRadius: 1 }}
                                  />
                                  <Chip
                                    label={`${assignmentData.class.students} Students`}
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                    icon={<GroupsIcon />}
                                    sx={{ borderRadius: 1 }}
                                  />
                                  <Chip
                                    label={assignmentData.class.schedule}
                                    size="small"
                                    color={assignmentData.class.schedule === "Morning" ? "info" : "warning"}
                                    variant="outlined"
                                    sx={{ borderRadius: 1 }}
                                  />
                                </Box>

                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={assignmentData.isClassTeacher}
                                      onChange={(e) =>
                                        setAssignmentData({
                                          ...assignmentData,
                                          isClassTeacher: e.target.checked,
                                        })
                                      }
                                      color="primary"
                                    />
                                  }
                                  label={
                                    <Typography fontWeight="medium" color="primary.dark">
                                      Assign as Class Teacher (Homeroom Teacher)
                                    </Typography>
                                  }
                                />
                                {assignmentData.isClassTeacher && (
                                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 4 }}>
                                    As a Class Teacher, this teacher will be responsible for overall class management,
                                    student counseling, and parent communication for this class.
                                  </Typography>
                                )}
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Zoom>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Fade>

            <Fade in={activeStep === 2} timeout={500}>
              <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    mb: 3,
                    color: "primary.dark",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <BookIcon /> Assign Subjects
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="subjects-label">Select Subjects</InputLabel>
                      <Select
                        labelId="subjects-label"
                        id="subjects-select"
                        multiple
                        value={assignmentData.subjects}
                        onChange={(e: SelectChangeEvent<Subject[]>) => {
                          setAssignmentData({
                            ...assignmentData,
                            subjects: e.target.value as Subject[],
                          });
                        }}
                        input={<OutlinedInput label="Select Subjects" sx={{ borderRadius: 2 }} />}
                        renderValue={(selected: Subject[]) => (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value.id} label={value.name} size="small" sx={{ borderRadius: 1 }} />
                            ))}
                          </Box>
                        )}
                      >
                        {filteredSubjects.map((subject) => (
                          <MenuItem
                            key={subject.id}
                            value={subject as any} // Type assertion here
                          >
                            <Checkbox checked={assignmentData.subjects.some(s => s.id === subject.id)} />
                            <ListItemText
                              primary={subject.name}
                              secondary={`${subject.department} • ${subject.hoursPerWeek} hrs/week • ${subject.type}`}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {assignmentData.teacher
                          ? `Showing subjects from ${assignmentData.teacher.department} department`
                          : "Please select a teacher first"}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  {assignmentData.subjects.length > 0 && (
                    <Grid item xs={12}>
                      <Zoom in={assignmentData.subjects.length > 0}>
                        <Card
                          variant="outlined"
                          sx={{
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            },
                          }}
                        >
                          <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                              Selected Subjects
                            </Typography>

                            <Grid container spacing={2}>
                              {assignmentData.subjects.map((subject) => (
                                <Grid item xs={12} sm={6} md={4} key={subject.id}>
                                  <Card
                                    variant="outlined"
                                    sx={{
                                      borderRadius: 2,
                                      bgcolor:
                                        subject.type === "Core"
                                          ? "rgba(25,118,210,0.05)"
                                          : subject.type === "Elective"
                                            ? "rgba(156,39,176,0.05)"
                                            : "rgba(46,125,50,0.05)",
                                    }}
                                  >
                                    <CardContent>
                                      <Typography variant="subtitle1" fontWeight="medium">
                                        {subject.name}
                                      </Typography>
                                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                                        <Chip
                                          label={subject.type}
                                          size="small"
                                          color={
                                            subject.type === "Core"
                                              ? "primary"
                                              : subject.type === "Elective"
                                                ? "secondary"
                                                : "success"
                                          }
                                          variant="outlined"
                                          sx={{ borderRadius: 1 }}
                                        />
                                        <Chip
                                          label={`${subject.hoursPerWeek} hrs/week`}
                                          size="small"
                                          icon={<AccessTimeIcon fontSize="small" />}
                                          variant="outlined"
                                          sx={{ borderRadius: 1 }}
                                        />
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              ))}
                            </Grid>

                            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                              <InfoIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                              <Typography variant="body2" color="text.secondary">
                                Total teaching hours:{" "}
                                <strong>
                                  {assignmentData.subjects.reduce((total, subject) => total + subject.hoursPerWeek, 0)}{" "}
                                  hours per week
                                </strong>
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Zoom>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Fade>

            <Fade in={activeStep === 3} timeout={500}>
              <Box sx={{ display: activeStep === 3 ? "block" : "none" }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    mb: 3,
                    color: "primary.dark",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ScheduleIcon /> Set Schedule & Details
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      type="date"
                      value={assignmentData.startDate}
                      onChange={(e) =>
                        setAssignmentData({
                          ...assignmentData,
                          startDate: e.target.value,
                        })
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        sx: { borderRadius: 2 },
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonthIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="End Date"
                      type="date"
                      value={assignmentData.endDate}
                      onChange={(e) =>
                        setAssignmentData({
                          ...assignmentData,
                          endDate: e.target.value,
                        })
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        sx: { borderRadius: 2 },
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonthIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="schedule-label">Preferred Schedule</InputLabel>


                      <Select
                        labelId="subjects-label"
                        id="subjects-select"
                        multiple
                        value={assignmentData.subjects}
                        
                        onChange={(e: SelectChangeEvent<Subject[]>) => {
                          setAssignmentData({
                            ...assignmentData,
                            subjects: e.target.value as Subject[],
                          });
                        }}
                        input={<OutlinedInput label="Select Subjects" sx={{ borderRadius: 2 }} />}
                        renderValue={(selected: Subject[]) => (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value.id} label={value.name} size="small" sx={{ borderRadius: 1 }} />
                            ))}
                          </Box>
                        )}
                      >
                        {filteredSubjects.map((subject) => (
                          <MenuItem
                            key={subject.id}
                            value={subject as any} // Type assertion here
                          >
                            <Checkbox checked={assignmentData.subjects.some(s => s.id === subject.id)} />
                            <ListItemText
                              primary={subject.name}
                              secondary={`${subject.department} • ${subject.hoursPerWeek} hrs/week • ${subject.type}`}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                      
                      <FormHelperText>Select preferred teaching days and time slots</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Additional Notes"
                      multiline
                      rows={4}
                      value={assignmentData.notes}
                      onChange={(e) =>
                        setAssignmentData({
                          ...assignmentData,
                          notes: e.target.value,
                        })
                      }
                      placeholder="Add any additional information or special instructions..."
                      InputProps={{
                        sx: { borderRadius: 2 },
                      }}
                    />
                  </Grid>

                  {assignmentData.teacher && assignmentData.class && assignmentData.subjects.length > 0 && (
                    <Grid item xs={12}>
                      <Zoom
                        in={Boolean(
                          assignmentData.teacher && assignmentData.class && assignmentData.subjects.length > 0,
                        )}
                      >
                        <Card
                          variant="outlined"
                          sx={{
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                            bgcolor: "rgba(25,118,210,0.05)",
                            borderColor: "primary.light",
                            "&:hover": {
                              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            },
                          }}
                        >
                          <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                              Assignment Summary
                            </Typography>

                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Teacher
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {assignmentData.teacher.name}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Class
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {assignmentData.class.name}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Role
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {assignmentData.isClassTeacher
                                    ? "Class Teacher & Subject Teacher"
                                    : "Subject Teacher"}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Subjects
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {assignmentData.subjects.map((s) => s.name).join(", ")}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Duration
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {assignmentData.startDate && assignmentData.endDate
                                    ? `${assignmentData.startDate} to ${assignmentData.endDate}`
                                    : "Not specified"}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Schedule
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {assignmentData.schedules.length > 0
                                    ? assignmentData.schedules.map((s) => s.day).join(", ")
                                    : "Not specified"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Zoom>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Fade>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{
                  borderRadius: 2,
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                  },
                }}
              >
                Back
              </Button>

              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    size="large"
                    disabled={
                      saving || !assignmentData.teacher || !assignmentData.class || assignmentData.subjects.length === 0
                    }
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
                      "&:hover": {
                        boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
                      },
                    }}
                  >
                    {saving ? "Saving..." : "Save Assignment"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    color="primary"
                    endIcon={<CheckIcon />}
                    disabled={
                      (activeStep === 0 && !assignmentData.teacher) ||
                      (activeStep === 1 && !assignmentData.class) ||
                      (activeStep === 2 && assignmentData.subjects.length === 0)
                    }
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
                      "&:hover": {
                        boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
                      },
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled" sx={{ width: "100%" }}>
          Teacher assignment saved successfully!
        </Alert>
      </Snackbar>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={saving}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  )
}
