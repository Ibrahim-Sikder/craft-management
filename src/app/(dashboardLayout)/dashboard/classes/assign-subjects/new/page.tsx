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
//   FormControl,
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
//   Checkbox,
//   FormControlLabel,
//   ListItemText,
//   InputAdornment,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemButton,
//   Tabs,
//   Tab,
// } from "@mui/material"
// import {
//   Save as SaveIcon,
//   ArrowBack as ArrowBackIcon,
//   Person as PersonIcon,
//   Class as ClassIcon,
//   Search as SearchIcon,
//   Info as InfoIcon,
//   Star as StarIcon,
//   StarBorder as StarBorderIcon,
//   Help as HelpIcon,
//   CalendarMonth as CalendarMonthIcon,
//   Groups as GroupsIcon,
//   ArrowForward as ArrowForwardIcon,
//   ArrowBack as ArrowLeftIcon,
//   Add as AddIcon,
//   Remove as RemoveIcon,
//   MenuBook as MenuBookIcon,
//   Description as DescriptionIcon,
//   Clear as ClearIcon,
//   Dashboard as DashboardIcon,
// } from "@mui/icons-material"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// // Sample data for demonstration
// const sampleSubjects = [
//   {
//     id: 1,
//     name: "Physics",
//     code: "PHY101",
//     department: "Science",
//     credits: 4,
//     hoursPerWeek: 6,
//     type: "Core",
//     description: "Introduction to classical mechanics, thermodynamics, and waves.",
//     prerequisites: ["Mathematics"],
//     gradeLevel: "High School",
//   },
//   {
//     id: 2,
//     name: "Chemistry",
//     code: "CHM101",
//     department: "Science",
//     credits: 4,
//     hoursPerWeek: 5,
//     type: "Core",
//     description: "Study of matter, its properties, and the changes it undergoes.",
//     prerequisites: [],
//     gradeLevel: "High School",
//   },
//   {
//     id: 3,
//     name: "Biology",
//     code: "BIO101",
//     department: "Science",
//     credits: 4,
//     hoursPerWeek: 5,
//     type: "Core",
//     description: "Study of living organisms and their interactions with each other and the environment.",
//     prerequisites: [],
//     gradeLevel: "High School",
//   },
//   {
//     id: 4,
//     name: "Mathematics",
//     code: "MTH101",
//     department: "Mathematics",
//     credits: 4,
//     hoursPerWeek: 8,
//     type: "Core",
//     description: "Algebra, geometry, and calculus fundamentals.",
//     prerequisites: [],
//     gradeLevel: "High School",
//   },
//   {
//     id: 5,
//     name: "English Literature",
//     code: "ENG101",
//     department: "English",
//     credits: 3,
//     hoursPerWeek: 5,
//     type: "Core",
//     description: "Analysis of literary works and development of critical thinking skills.",
//     prerequisites: [],
//     gradeLevel: "High School",
//   },
//   {
//     id: 6,
//     name: "Computer Science",
//     code: "CS101",
//     department: "Computer Science",
//     credits: 4,
//     hoursPerWeek: 6,
//     type: "Elective",
//     description: "Introduction to programming concepts and computational thinking.",
//     prerequisites: ["Mathematics"],
//     gradeLevel: "High School",
//   },
//   {
//     id: 7,
//     name: "World History",
//     code: "HIS101",
//     department: "History",
//     credits: 3,
//     hoursPerWeek: 4,
//     type: "Core",
//     description: "Survey of major historical events and their impact on modern society.",
//     prerequisites: [],
//     gradeLevel: "High School",
//   },
//   {
//     id: 8,
//     name: "Art",
//     code: "ART101",
//     department: "Arts",
//     credits: 2,
//     hoursPerWeek: 3,
//     type: "Elective",
//     description: "Exploration of various art forms and techniques.",
//     prerequisites: [],
//     gradeLevel: "High School",
//   },
//   {
//     id: 9,
//     name: "Physical Education",
//     code: "PE101",
//     department: "Sports",
//     credits: 1,
//     hoursPerWeek: 4,
//     type: "Compulsory",
//     description: "Development of physical fitness and sports skills.",
//     prerequisites: [],
//     gradeLevel: "High School",
//   },
//   {
//     id: 10,
//     name: "Music",
//     code: "MUS101",
//     department: "Arts",
//     credits: 2,
//     hoursPerWeek: 3,
//     type: "Elective",
//     description: "Introduction to music theory and performance.",
//     prerequisites: [],
//     gradeLevel: "High School",
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

// const sampleStudents = [
//   {
//     id: 1,
//     name: "Emma Thompson",
//     rollNumber: "ST001",
//     class: "Grade 10-A",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Female",
//     performance: "Excellent",
//   },
//   {
//     id: 2,
//     name: "James Wilson",
//     rollNumber: "ST002",
//     class: "Grade 10-A",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Male",
//     performance: "Good",
//   },
//   {
//     id: 3,
//     name: "Sophia Garcia",
//     rollNumber: "ST003",
//     class: "Grade 10-A",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Female",
//     performance: "Excellent",
//   },
//   {
//     id: 4,
//     name: "Liam Johnson",
//     rollNumber: "ST004",
//     class: "Grade 10-A",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Male",
//     performance: "Average",
//   },
//   {
//     id: 5,
//     name: "Olivia Martinez",
//     rollNumber: "ST005",
//     class: "Grade 10-A",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Female",
//     performance: "Good",
//   },
//   {
//     id: 6,
//     name: "Noah Brown",
//     rollNumber: "ST006",
//     class: "Grade 10-B",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Male",
//     performance: "Good",
//   },
//   {
//     id: 7,
//     name: "Ava Davis",
//     rollNumber: "ST007",
//     class: "Grade 10-B",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Female",
//     performance: "Excellent",
//   },
//   {
//     id: 8,
//     name: "Ethan Miller",
//     rollNumber: "ST008",
//     class: "Grade 10-B",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Male",
//     performance: "Average",
//   },
//   {
//     id: 9,
//     name: "Isabella Wilson",
//     rollNumber: "ST009",
//     class: "Grade 10-B",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Female",
//     performance: "Good",
//   },
//   {
//     id: 10,
//     name: "Mason Taylor",
//     rollNumber: "ST010",
//     class: "Grade 10-B",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Male",
//     performance: "Needs Improvement",
//   },
//   {
//     id: 11,
//     name: "Charlotte Anderson",
//     rollNumber: "ST011",
//     class: "Grade 11-A",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Female",
//     performance: "Excellent",
//   },
//   {
//     id: 12,
//     name: "Lucas Thomas",
//     rollNumber: "ST012",
//     class: "Grade 11-A",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Male",
//     performance: "Good",
//   },
//   {
//     id: 13,
//     name: "Amelia Jackson",
//     rollNumber: "ST013",
//     class: "Grade 11-A",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Female",
//     performance: "Average",
//   },
//   {
//     id: 14,
//     name: "Benjamin White",
//     rollNumber: "ST014",
//     class: "Grade 11-A",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Male",
//     performance: "Good",
//   },
//   {
//     id: 15,
//     name: "Mia Harris",
//     rollNumber: "ST015",
//     class: "Grade 11-A",
//     avatar: "/placeholder.svg?height=100&width=100",
//     gender: "Female",
//     performance: "Excellent",
//   },
// ]

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
//   },
// ]

// export default function AssignSubject() {
//   const theme = useTheme()

//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))


//   // State for form data
//   const [formData, setFormData] = useState({
//     subject: null,
//     class: null,
//     teacher: null,
//     isOptional: false,
//     isExtraSubject: false,
//     includeInGPA: true,
//     startDate: "",
//     endDate: "",
//     description: "",
//     selectedStudents: [],
//   })

//   // State for UI
  
//   const [saving, setSaving] = useState(false)
//   const [progress, setProgress] = useState(0)
//   const [showTips, setShowTips] = useState(true)
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success" as "success" | "error" | "info" | "warning",
//   })
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedSearchQuery, setSelectedSearchQuery] = useState("")
//   const [activeTab, setActiveTab] = useState(0)

//   // Filter students based on selected class
//   const filteredStudents = formData.class
//     ? sampleStudents.filter((student) => student.class === formData.class?.name)
//     : []

//   // Filter available students (not already selected)
//   const availableStudents = filteredStudents.filter(
//     (student) => !formData.selectedStudents.some((s) => s.id === student.id),
//   )

//   // Filter available students by search query
//   const searchedAvailableStudents = availableStudents.filter((student) =>
//     student.name.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   // Filter selected students by search query
//   const searchedSelectedStudents = formData.selectedStudents.filter((student) =>
//     student.name.toLowerCase().includes(selectedSearchQuery.toLowerCase()),
//   )

//   // Calculate progress
//   useEffect(() => {
//     const calculateProgress = () => {
//       let filledFields = 0
//       let totalFields = 0

//       //  fields
//       const requiredFields = ["subject", "class", "teacher"]
//       requiredFields.forEach((field) => {
//         totalFields++
//         if (formData[field]) {
//           filledFields++
//         }
//       })

//       // Optional fields
//       const optionalFields = ["startDate", "endDate", "description"]
//       optionalFields.forEach((field) => {
//         if (formData[field]) {
//           filledFields += 0.5
//           totalFields += 0.5
//         } else {
//           totalFields += 0.5
//         }
//       })

//       // Students selection
//       if (formData.selectedStudents.length > 0) {
//         filledFields++
//       }
//       totalFields++

//       return Math.round((filledFields / totalFields) * 100)
//     }

//     setProgress(calculateProgress())
//   }, [formData])

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setSaving(true)

//     // Simulate API call
//     setTimeout(() => {
//       setSaving(false)
//       setSnackbar({
//         open: true,
//         message: "Subject assigned successfully!",
//         severity: "success",
//       })
//       // Redirect to list page after successful submission
//       // router.push('/subjects/assignments')
//     }, 2000)
//   }

//   // Handle adding all students
//   const handleAddAllStudents = () => {
//     setFormData({
//       ...formData,
//       selectedStudents: [...formData.selectedStudents, ...availableStudents],
//     })
//   }

//   // Handle removing all students
//   const handleRemoveAllStudents = () => {
//     setFormData({
//       ...formData,
//       selectedStudents: [],
//     })
//   }

//   // Handle adding a student
//   const handleAddStudent = (student) => {
//     setFormData({
//       ...formData,
//       selectedStudents: [...formData.selectedStudents, student],
//     })
//   }

//   // Handle removing a student
//   const handleRemoveStudent = (studentId) => {
//     setFormData({
//       ...formData,
//       selectedStudents: formData.selectedStudents.filter((s) => s.id !== studentId),
//     })
//   }

//   // Handle tab change
//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue)
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
//           {/* Header */}
//           <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent: "space-between" }}>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Link href="/subjects/assignments" passHref>
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
//                 Assign Subject
//               </Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <Tooltip title={showTips ? "Hide tips" : "Show tips"}>
//                 <IconButton onClick={() => setShowTips(!showTips)} color={showTips ? "primary" : "default"}>
//                   <HelpIcon />
//                 </IconButton>
//               </Tooltip>
//               <Link href="/dashboard" passHref>
//                 <IconButton
//                   color="primary"
//                   sx={{
//                     bgcolor: "rgba(25,118,210,0.1)",
//                     "&:hover": {
//                       bgcolor: "rgba(25,118,210,0.2)",
//                     },
//                   }}
//                 >
//                   <DashboardIcon />
//                 </IconButton>
//               </Link>
//             </Box>
//           </Box>

//           {/* Tips */}
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
//                     Tips for Assigning Subjects
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {activeTab === 0 &&
//                       "Select a subject and class to begin. You can mark subjects as optional or extra if they don't count toward GPA calculations."}
//                     {activeTab === 1 &&
//                       "Select students who will take this subject. You can add all students from the class or select specific students."}
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Collapse>

//           {/* Progress Bar */}
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

//           {/* Tabs */}
//           <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
//             <Tabs
//               value={activeTab}
//               onChange={handleTabChange}
//               variant={isMobile ? "scrollable" : "fullWidth"}
//               scrollButtons={isMobile ? "auto" : false}
//               sx={{
//                 "& .MuiTab-root": {
//                   minWidth: { xs: "auto", md: 160 },
//                   fontWeight: "medium",
//                 },
//               }}
//             >
//               <Tab
//                 label={
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <MenuBookIcon sx={{ mr: 1 }} />
//                     Subject Details
//                   </Box>
//                 }
//               />
//               <Tab
//                 label={
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <GroupsIcon sx={{ mr: 1 }} />
//                     Select Students
//                   </Box>
//                 }
//                 disabled={!formData.subject || !formData.class}
//               />
//             </Tabs>
//           </Box>

//           <form onSubmit={handleSubmit}>
//             {/* Subject Details Tab */}
//             <Fade in={activeTab === 0} timeout={500}>
//               <Box sx={{ display: activeTab === 0 ? "block" : "none" }}>
//                 <Grid container spacing={3}>
//                   {/* Subject Selection */}
//                   <Grid item xs={12} md={6}>
//                     <FormControl fullWidth>
//                       <Autocomplete
//                         id="subject-select"
//                         options={sampleSubjects}
//                         getOptionLabel={(option) => option.name}
//                         value={formData.subject}
//                         onChange={(event, newValue) => {
//                           setFormData({
//                             ...formData,
//                             subject: newValue,
//                           })
//                         }}
//                         renderInput={(params) => (
//                           <TextField
//                             {...params}
//                             label="Select Subject"
//                             variant="outlined"
//                             placeholder="Choose a subject..."
//                             InputProps={{
//                               ...params.InputProps,
//                               startAdornment: (
//                                 <>
//                                   <InputAdornment position="start">
//                                     <MenuBookIcon />
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
//                                 <Avatar sx={{ bgcolor: "primary.main" }}>
//                                   <MenuBookIcon />
//                                 </Avatar>
//                               </Box>
//                               <Box sx={{ flexGrow: 1 }}>
//                                 <Typography variant="subtitle1" fontWeight="medium">
//                                   {option.name} ({option.code})
//                                 </Typography>
//                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                   <Typography variant="body2" color="text.secondary">
//                                     {option.department} • {option.credits} credits
//                                   </Typography>
//                                   <Chip
//                                     label={option.type}
//                                     size="small"
//                                     color={
//                                       option.type === "Core"
//                                         ? "primary"
//                                         : option.type === "Elective"
//                                           ? "secondary"
//                                           : "success"
//                                     }
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

//                   {/* Class Selection */}
//                   <Grid item xs={12} md={6}>
//                     <FormControl fullWidth>
//                       <Autocomplete
//                         id="class-select"
//                         options={sampleClasses}
//                         getOptionLabel={(option) => option.name}
//                         value={formData.class}
//                         onChange={(event, newValue) => {
//                           setFormData({
//                             ...formData,
//                             class: newValue,
//                             selectedStudents: [], // Reset selected students when class changes
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
//                               startAdornment: (
//                                 <>
//                                   <InputAdornment position="start">
//                                     <ClassIcon />
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

//                   {/* Teacher Selection */}
//                   <Grid item xs={12} md={6}>
//                     <FormControl fullWidth>
//                       <Autocomplete
//                         id="teacher-select"
//                         options={sampleTeachers}
//                         getOptionLabel={(option) => option.name}
//                         value={formData.teacher}
//                         onChange={(event, newValue) => {
//                           setFormData({
//                             ...formData,
//                             teacher: newValue,
//                           })
//                         }}
//                         renderInput={(params) => (
//                           <TextField
//                             {...params}
//                             label="Select Teacher"
//                             variant="outlined"
//                             placeholder="Choose a teacher..."
//                             InputProps={{
//                               ...params.InputProps,
//                               startAdornment: (
//                                 <>
//                                   <InputAdornment position="start">
//                                     <PersonIcon />
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
//                                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                       <Box key={star} component="span">
//                                         {option.rating >= star ? (
//                                           <StarIcon sx={{ color: "warning.main", fontSize: "1rem" }} />
//                                         ) : (
//                                           <StarBorderIcon sx={{ color: "warning.main", fontSize: "1rem" }} />
//                                         )}
//                                       </Box>
//                                     ))}
//                                     <Typography variant="body2" sx={{ ml: 1 }}>
//                                       {option.rating}
//                                     </Typography>
//                                   </Box>
//                                 </Box>
//                               </Box>
//                             </Box>
//                           </li>
//                         )}
//                       />
//                     </FormControl>
//                   </Grid>

//                   {/* Date Range */}
//                   <Grid item xs={12} md={6}>
//                     <Grid container spacing={2}>
//                       <Grid item xs={6}>
//                         <TextField
//                           fullWidth
//                           label="Start Date"
//                           type="date"
//                           value={formData.startDate}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               startDate: e.target.value,
//                             })
//                           }
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                           InputProps={{
//                             sx: { borderRadius: 2 },
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <CalendarMonthIcon />
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       </Grid>
//                       <Grid item xs={6}>
//                         <TextField
//                           fullWidth
//                           label="End Date"
//                           type="date"
//                           value={formData.endDate}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               endDate: e.target.value,
//                             })
//                           }
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                           InputProps={{
//                             sx: { borderRadius: 2 },
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <CalendarMonthIcon />
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       </Grid>
//                     </Grid>
//                   </Grid>

//                   {/* Subject Options */}
//                   <Grid item xs={12}>
//                     <Card
//                       variant="outlined"
//                       sx={{
//                         borderRadius: 3,
//                         bgcolor: "rgba(25,118,210,0.03)",
//                       }}
//                     >
//                       <CardContent>
//                         <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.dark">
//                           Subject Options
//                         </Typography>
//                         <Grid container spacing={2}>
//                           <Grid item xs={12} sm={4}>
//                             <FormControlLabel
//                               control={
//                                 <Checkbox
//                                   checked={formData.isOptional}
//                                   onChange={(e) =>
//                                     setFormData({
//                                       ...formData,
//                                       isOptional: e.target.checked,
//                                     })
//                                   }
//                                   color="primary"
//                                 />
//                               }
//                               label={
//                                 <Box>
//                                   <Typography fontWeight="medium">Optional Subject</Typography>
//                                   <Typography variant="body2" color="text.secondary">
//                                     Students can choose to take this subject
//                                   </Typography>
//                                 </Box>
//                               }
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={4}>
//                             <FormControlLabel
//                               control={
//                                 <Checkbox
//                                   checked={formData.isExtraSubject}
//                                   onChange={(e) =>
//                                     setFormData({
//                                       ...formData,
//                                       isExtraSubject: e.target.checked,
//                                       includeInGPA: !e.target.checked ? formData.includeInGPA : false,
//                                     })
//                                   }
//                                   color="secondary"
//                                 />
//                               }
//                               label={
//                                 <Box>
//                                   <Typography fontWeight="medium">Extra Subject</Typography>
//                                   <Typography variant="body2" color="text.secondary">
//                                     Additional subject beyond core curriculum
//                                   </Typography>
//                                 </Box>
//                               }
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={4}>
//                             <FormControlLabel
//                               control={
//                                 <Checkbox
//                                   checked={formData.includeInGPA}
//                                   onChange={(e) =>
//                                     setFormData({
//                                       ...formData,
//                                       includeInGPA: e.target.checked,
//                                     })
//                                   }
//                                   disabled={formData.isExtraSubject}
//                                   color="success"
//                                 />
//                               }
//                               label={
//                                 <Box>
//                                   <Typography fontWeight="medium">Include in GPA</Typography>
//                                   <Typography variant="body2" color="text.secondary">
//                                     Subject will count toward GPA calculation
//                                   </Typography>
//                                 </Box>
//                               }
//                             />
//                           </Grid>
//                         </Grid>
//                       </CardContent>
//                     </Card>
//                   </Grid>

//                   {/* Description */}
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Additional Notes"
//                       multiline
//                       rows={3}
//                       value={formData.description}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           description: e.target.value,
//                         })
//                       }
//                       placeholder="Add any additional information or special instructions..."
//                       InputProps={{
//                         sx: { borderRadius: 2 },
//                         startAdornment: (
//                           <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5, mr: 1 }}>
//                             <DescriptionIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Grid>

//                   {/* Subject Preview */}
//                   {formData.subject && (
//                     <Grid item xs={12}>
//                       <Zoom in={Boolean(formData.subject)}>
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
//                             <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.dark">
//                               Subject Details
//                             </Typography>
//                             <Grid container spacing={2}>
//                               <Grid item xs={12} sm={6} md={3}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Subject Name
//                                 </Typography>
//                                 <Typography variant="body1" fontWeight="medium">
//                                   {formData.subject.name}
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={12} sm={6} md={3}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Subject Code
//                                 </Typography>
//                                 <Typography variant="body1" fontWeight="medium">
//                                   {formData.subject.code}
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={12} sm={6} md={3}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Department
//                                 </Typography>
//                                 <Typography variant="body1" fontWeight="medium">
//                                   {formData.subject.department}
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={12} sm={6} md={3}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Credits
//                                 </Typography>
//                                 <Typography variant="body1" fontWeight="medium">
//                                   {formData.subject.credits} credits
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={12} sm={6} md={3}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Hours Per Week
//                                 </Typography>
//                                 <Typography variant="body1" fontWeight="medium">
//                                   {formData.subject.hoursPerWeek} hours
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={12} sm={6} md={3}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Type
//                                 </Typography>
//                                 <Chip
//                                   label={formData.subject.type}
//                                   size="small"
//                                   color={
//                                     formData.subject.type === "Core"
//                                       ? "primary"
//                                       : formData.subject.type === "Elective"
//                                         ? "secondary"
//                                         : "success"
//                                   }
//                                   sx={{ borderRadius: 1 }}
//                                 />
//                               </Grid>
//                               <Grid item xs={12} sm={6} md={3}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Grade Level
//                                 </Typography>
//                                 <Typography variant="body1" fontWeight="medium">
//                                   {formData.subject.gradeLevel}
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={12} sm={6} md={3}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Prerequisites
//                                 </Typography>
//                                 <Typography variant="body1" fontWeight="medium">
//                                   {formData.subject.prerequisites.length > 0
//                                     ? formData.subject.prerequisites.join(", ")
//                                     : "None"}
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={12}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Description
//                                 </Typography>
//                                 <Typography variant="body1">{formData.subject.description}</Typography>
//                               </Grid>
//                             </Grid>
//                           </CardContent>
//                         </Card>
//                       </Zoom>
//                     </Grid>
//                   )}

//                   {/* Navigation Buttons */}
//                   <Grid item xs={12}>
//                     <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         endIcon={<ArrowForwardIcon />}
//                         onClick={() => setActiveTab(1)}
//                         disabled={!formData.subject || !formData.class}
//                         sx={{
//                           borderRadius: 2,
//                           boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
//                           "&:hover": {
//                             boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
//                           },
//                         }}
//                       >
//                         Next: Select Students
//                       </Button>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Fade>

//             {/* Select Students Tab */}
//             <Fade in={activeTab === 1} timeout={500}>
//               <Box sx={{ display: activeTab === 1 ? "block" : "none" }}>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12}>
//                     <Card
//                       variant="outlined"
//                       sx={{
//                         borderRadius: 3,
//                         bgcolor: "rgba(25,118,210,0.03)",
//                         mb: 3,
//                       }}
//                     >
//                       <CardContent>
//                         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                           <ClassIcon color="primary" sx={{ mr: 1 }} />
//                           <Typography variant="h6" fontWeight="bold" color="primary.dark">
//                             {formData.class?.name} • {filteredStudents.length} Students
//                           </Typography>
//                         </Box>
//                         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                           <Chip
//                             icon={<MenuBookIcon />}
//                             label={`Subject: ${formData.subject?.name}`}
//                             color="primary"
//                             variant="outlined"
//                             sx={{ borderRadius: 1 }}
//                           />
//                           <Chip
//                             icon={<PersonIcon />}
//                             label={`Teacher: ${formData.teacher?.name || "Not Selected"}`}
//                             color="secondary"
//                             variant="outlined"
//                             sx={{ borderRadius: 1 }}
//                           />
//                           {formData.isOptional && (
//                             <Chip
//                               icon={<InfoIcon />}
//                               label="Optional Subject"
//                               color="info"
//                               variant="outlined"
//                               sx={{ borderRadius: 1 }}
//                             />
//                           )}
//                           {formData.isExtraSubject && (
//                             <Chip
//                               icon={<InfoIcon />}
//                               label="Extra Subject"
//                               color="warning"
//                               variant="outlined"
//                               sx={{ borderRadius: 1 }}
//                             />
//                           )}
//                           {!formData.includeInGPA && (
//                             <Chip
//                               icon={<InfoIcon />}
//                               label="Not Included in GPA"
//                               color="error"
//                               variant="outlined"
//                               sx={{ borderRadius: 1 }}
//                             />
//                           )}
//                         </Box>
//                       </CardContent>
//                     </Card>
//                   </Grid>

//                   {/* Student Selection */}
//                   <Grid item xs={12} md={5}>
//                     <Card
//                       variant="outlined"
//                       sx={{
//                         borderRadius: 3,
//                         height: "100%",
//                         display: "flex",
//                         flexDirection: "column",
//                       }}
//                     >
//                       <CardContent sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
//                         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                           <Typography variant="h6" fontWeight="bold">
//                             Available Students
//                           </Typography>
//                           <Button
//                             size="small"
//                             startIcon={<AddIcon />}
//                             onClick={handleAddAllStudents}
//                             disabled={availableStudents.length === 0}
//                           >
//                             Add All
//                           </Button>
//                         </Box>
//                         <TextField
//                           fullWidth
//                           placeholder="Search students..."
//                           value={searchQuery}
//                           onChange={(e) => setSearchQuery(e.target.value)}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <SearchIcon />
//                               </InputAdornment>
//                             ),
//                             endAdornment: searchQuery && (
//                               <InputAdornment position="end">
//                                 <IconButton size="small" onClick={() => setSearchQuery("")}>
//                                   <ClearIcon fontSize="small" />
//                                 </IconButton>
//                               </InputAdornment>
//                             ),
//                             sx: { borderRadius: 2 },
//                           }}
//                           variant="outlined"
//                           size="small"
//                           sx={{ mb: 2 }}
//                         />
//                         <Box
//                           sx={{
//                             flexGrow: 1,
//                             overflow: "auto",
//                             maxHeight: 400,
//                             border: "1px solid",
//                             borderColor: "divider",
//                             borderRadius: 2,
//                           }}
//                         >
//                           {searchedAvailableStudents.length === 0 ? (
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 p: 3,
//                                 height: "100%",
//                                 minHeight: 200,
//                               }}
//                             >
//                               <PersonIcon sx={{ fontSize: 40, color: "text.secondary", opacity: 0.5, mb: 1 }} />
//                               <Typography variant="body2" color="text.secondary" align="center">
//                                 {availableStudents.length === 0
//                                   ? "All students have been selected"
//                                   : "No students match your search"}
//                               </Typography>
//                             </Box>
//                           ) : (
//                             <List disablePadding>
//                               {searchedAvailableStudents.map((student) => (
//                                 <ListItem
//                                   key={student.id}
//                                   disablePadding
//                                   secondaryAction={
//                                     <IconButton
//                                       edge="end"
//                                       size="small"
//                                       onClick={() => handleAddStudent(student)}
//                                       sx={{ color: "primary.main" }}
//                                     >
//                                       <AddIcon />
//                                     </IconButton>
//                                   }
//                                   sx={{
//                                     borderBottom: "1px solid",
//                                     borderColor: "divider",
//                                     "&:last-child": {
//                                       borderBottom: "none",
//                                     },
//                                   }}
//                                 >
//                                   <ListItemButton onClick={() => handleAddStudent(student)} dense sx={{ py: 1 }}>
//                                     <ListItemAvatar>
//                                       <Avatar src={student.avatar} alt={student.name}>
//                                         {student.name.charAt(0)}
//                                       </Avatar>
//                                     </ListItemAvatar>
//                                     <ListItemText
//                                       primary={
//                                         <Typography variant="body1" fontWeight="medium">
//                                           {student.name}
//                                         </Typography>
//                                       }
//                                       secondary={
//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                                           <Typography variant="body2" color="text.secondary">
//                                             {student.rollNumber}
//                                           </Typography>
//                                           <Box
//                                             component="span"
//                                             sx={{
//                                               width: 6,
//                                               height: 6,
//                                               borderRadius: "50%",
//                                               bgcolor: "text.disabled",
//                                               display: "inline-block",
//                                               mx: 0.5,
//                                             }}
//                                           />
//                                           <Chip
//                                             label={student.performance}
//                                             size="small"
//                                             color={
//                                               student.performance === "Excellent"
//                                                 ? "success"
//                                                 : student.performance === "Good"
//                                                   ? "primary"
//                                                   : student.performance === "Average"
//                                                     ? "info"
//                                                     : "warning"
//                                             }
//                                             variant="outlined"
//                                             sx={{ borderRadius: 1, height: 20, fontSize: "0.7rem" }}
//                                           />
//                                         </Box>
//                                       }
//                                     />
//                                   </ListItemButton>
//                                 </ListItem>
//                               ))}
//                             </List>
//                           )}
//                         </Box>
//                       </CardContent>
//                     </Card>
//                   </Grid>

//                   {/* Transfer Controls */}
//                   <Grid
//                     item
//                     xs={12}
//                     md={2}
//                     sx={{
//                       display: "flex",
//                       flexDirection: { xs: "row", md: "column" },
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: { xs: "row", md: "column" },
//                         gap: 2,
//                         p: 2,
//                         width: "100%",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Button
//                         variant="outlined"
//                         startIcon={<ArrowForwardIcon />}
//                         onClick={handleAddAllStudents}
//                         disabled={availableStudents.length === 0}
//                         sx={{ borderRadius: 2, width: { xs: "auto", md: "100%" } }}
//                       >
//                         Add All
//                       </Button>
//                       <Button
//                         variant="outlined"
//                         startIcon={<ArrowLeftIcon />}
//                         onClick={handleRemoveAllStudents}
//                         disabled={formData.selectedStudents.length === 0}
//                         sx={{ borderRadius: 2, width: { xs: "auto", md: "100%" } }}
//                       >
//                         Remove All
//                       </Button>
//                     </Box>
//                   </Grid>

//                   {/* Selected Students */}
//                   <Grid item xs={12} md={5}>
//                     <Card
//                       variant="outlined"
//                       sx={{
//                         borderRadius: 3,
//                         height: "100%",
//                         display: "flex",
//                         flexDirection: "column",
//                       }}
//                     >
//                       <CardContent sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
//                         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                           <Typography variant="h6" fontWeight="bold">
//                             Selected Students ({formData.selectedStudents.length})
//                           </Typography>
//                           <Button
//                             size="small"
//                             startIcon={<RemoveIcon />}
//                             onClick={handleRemoveAllStudents}
//                             disabled={formData.selectedStudents.length === 0}
//                           >
//                             Remove All
//                           </Button>
//                         </Box>
//                         <TextField
//                           fullWidth
//                           placeholder="Search selected students..."
//                           value={selectedSearchQuery}
//                           onChange={(e) => setSelectedSearchQuery(e.target.value)}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <SearchIcon />
//                               </InputAdornment>
//                             ),
//                             endAdornment: selectedSearchQuery && (
//                               <InputAdornment position="end">
//                                 <IconButton size="small" onClick={() => setSelectedSearchQuery("")}>
//                                   <ClearIcon fontSize="small" />
//                                 </IconButton>
//                               </InputAdornment>
//                             ),
//                             sx: { borderRadius: 2 },
//                           }}
//                           variant="outlined"
//                           size="small"
//                           sx={{ mb: 2 }}
//                         />
//                         <Box
//                           sx={{
//                             flexGrow: 1,
//                             overflow: "auto",
//                             maxHeight: 400,
//                             border: "1px solid",
//                             borderColor: "divider",
//                             borderRadius: 2,
//                           }}
//                         >
//                           {formData.selectedStudents.length === 0 ? (
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 p: 3,
//                                 height: "100%",
//                                 minHeight: 200,
//                               }}
//                             >
//                               <GroupsIcon sx={{ fontSize: 40, color: "text.secondary", opacity: 0.5, mb: 1 }} />
//                               <Typography variant="body2" color="text.secondary" align="center">
//                                 No students selected yet
//                               </Typography>
//                               <Typography variant="body2" color="text.secondary" align="center">
//                                 Select students from the left panel
//                               </Typography>
//                             </Box>
//                           ) : searchedSelectedStudents.length === 0 ? (
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 p: 3,
//                                 height: "100%",
//                                 minHeight: 200,
//                               }}
//                             >
//                               <SearchIcon sx={{ fontSize: 40, color: "text.secondary", opacity: 0.5, mb: 1 }} />
//                               <Typography variant="body2" color="text.secondary" align="center">
//                                 No students match your search
//                               </Typography>
//                             </Box>
//                           ) : (
//                             <List disablePadding>
//                               {searchedSelectedStudents.map((student) => (
//                                 <ListItem
//                                   key={student.id}
//                                   disablePadding
//                                   secondaryAction={
//                                     <IconButton
//                                       edge="end"
//                                       size="small"
//                                       onClick={() => handleRemoveStudent(student.id)}
//                                       sx={{ color: "error.main" }}
//                                     >
//                                       <RemoveIcon />
//                                     </IconButton>
//                                   }
//                                   sx={{
//                                     borderBottom: "1px solid",
//                                     borderColor: "divider",
//                                     "&:last-child": {
//                                       borderBottom: "none",
//                                     },
//                                   }}
//                                 >
//                                   <ListItemButton onClick={() => handleRemoveStudent(student.id)} dense sx={{ py: 1 }}>
//                                     <ListItemAvatar>
//                                       <Avatar src={student.avatar} alt={student.name}>
//                                         {student.name.charAt(0)}
//                                       </Avatar>
//                                     </ListItemAvatar>
//                                     <ListItemText
//                                       primary={
//                                         <Typography variant="body1" fontWeight="medium">
//                                           {student.name}
//                                         </Typography>
//                                       }
//                                       secondary={
//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                                           <Typography variant="body2" color="text.secondary">
//                                             {student.rollNumber}
//                                           </Typography>
//                                           <Box
//                                             component="span"
//                                             sx={{
//                                               width: 6,
//                                               height: 6,
//                                               borderRadius: "50%",
//                                               bgcolor: "text.disabled",
//                                               display: "inline-block",
//                                               mx: 0.5,
//                                             }}
//                                           />
//                                           <Chip
//                                             label={student.performance}
//                                             size="small"
//                                             color={
//                                               student.performance === "Excellent"
//                                                 ? "success"
//                                                 : student.performance === "Good"
//                                                   ? "primary"
//                                                   : student.performance === "Average"
//                                                     ? "info"
//                                                     : "warning"
//                                             }
//                                             variant="outlined"
//                                             sx={{ borderRadius: 1, height: 20, fontSize: "0.7rem" }}
//                                           />
//                                         </Box>
//                                       }
//                                     />
//                                   </ListItemButton>
//                                 </ListItem>
//                               ))}
//                             </List>
//                           )}
//                         </Box>
//                       </CardContent>
//                     </Card>
//                   </Grid>

//                   {/* Navigation Buttons */}
//                   <Grid item xs={12}>
//                     <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//                       <Button
//                         variant="outlined"
//                         startIcon={<ArrowLeftIcon />}
//                         onClick={() => setActiveTab(0)}
//                         sx={{
//                           borderRadius: 2,
//                           borderWidth: 2,
//                           "&:hover": {
//                             borderWidth: 2,
//                           },
//                         }}
//                       >
//                         Back to Subject Details
//                       </Button>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         startIcon={<SaveIcon />}
//                         disabled={
//                           saving ||
//                           !formData.subject ||
//                           !formData.class ||
//                           !formData.teacher ||
//                           formData.selectedStudents.length === 0
//                         }
//                         sx={{
//                           borderRadius: 2,
//                           boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
//                           "&:hover": {
//                             boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
//                           },
//                         }}
//                       >
//                         {saving ? "Saving..." : "Save Assignment"}
//                       </Button>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Fade>
//           </form>
//         </Box>
//       </Paper>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       {/* Loading Backdrop */}
//       <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={saving}>
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     </Container>
//   )
// }


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
  FormControl,
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
  Checkbox,
  FormControlLabel,
  ListItemText,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Tabs,
  Tab,
} from "@mui/material"
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Class as ClassIcon,
  Search as SearchIcon,
  Info as InfoIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Help as HelpIcon,
  CalendarMonth as CalendarMonthIcon,
  Groups as GroupsIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowLeftIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  MenuBook as MenuBookIcon,
  Description as DescriptionIcon,
  Clear as ClearIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"


interface Subject {
  id: number;
  name: string;
  code: string;
  department: string;
  credits: number;
  hoursPerWeek: number;
  type: string;
  description: string;
  prerequisites: string[];
  gradeLevel: string;
}

interface Class {
  id: number;
  name: string;
  section: string;
  students: number;
  schedule: string;
}

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  class: string;
  avatar: string;
  gender: string;
  performance: string;
}

interface Teacher {
  id: number;
  name: string;
  avatar: string;
  department: string;
  qualification: string;
  experience: string;
  specialization: string;
  rating: number;
}

interface FormData {
  subject: Subject | null;
  class: Class | null;
  teacher: Teacher | null;
  isOptional: boolean;
  isExtraSubject: boolean;
  includeInGPA: boolean;
  startDate: string;
  endDate: string;
  description: string;
  selectedStudents: Student[];
}
// Sample data for demonstration
const sampleSubjects = [
  {
    id: 1,
    name: "Physics",
    code: "PHY101",
    department: "Science",
    credits: 4,
    hoursPerWeek: 6,
    type: "Core",
    description: "Introduction to classical mechanics, thermodynamics, and waves.",
    prerequisites: ["Mathematics"],
    gradeLevel: "High School",
  },
  {
    id: 2,
    name: "Chemistry",
    code: "CHM101",
    department: "Science",
    credits: 4,
    hoursPerWeek: 5,
    type: "Core",
    description: "Study of matter, its properties, and the changes it undergoes.",
    prerequisites: [],
    gradeLevel: "High School",
  },
  {
    id: 3,
    name: "Biology",
    code: "BIO101",
    department: "Science",
    credits: 4,
    hoursPerWeek: 5,
    type: "Core",
    description: "Study of living organisms and their interactions with each other and the environment.",
    prerequisites: [],
    gradeLevel: "High School",
  },
  {
    id: 4,
    name: "Mathematics",
    code: "MTH101",
    department: "Mathematics",
    credits: 4,
    hoursPerWeek: 8,
    type: "Core",
    description: "Algebra, geometry, and calculus fundamentals.",
    prerequisites: [],
    gradeLevel: "High School",
  },
  {
    id: 5,
    name: "English Literature",
    code: "ENG101",
    department: "English",
    credits: 3,
    hoursPerWeek: 5,
    type: "Core",
    description: "Analysis of literary works and development of critical thinking skills.",
    prerequisites: [],
    gradeLevel: "High School",
  },
  {
    id: 6,
    name: "Computer Science",
    code: "CS101",
    department: "Computer Science",
    credits: 4,
    hoursPerWeek: 6,
    type: "Elective",
    description: "Introduction to programming concepts and computational thinking.",
    prerequisites: ["Mathematics"],
    gradeLevel: "High School",
  },
  {
    id: 7,
    name: "World History",
    code: "HIS101",
    department: "History",
    credits: 3,
    hoursPerWeek: 4,
    type: "Core",
    description: "Survey of major historical events and their impact on modern society.",
    prerequisites: [],
    gradeLevel: "High School",
  },
  {
    id: 8,
    name: "Art",
    code: "ART101",
    department: "Arts",
    credits: 2,
    hoursPerWeek: 3,
    type: "Elective",
    description: "Exploration of various art forms and techniques.",
    prerequisites: [],
    gradeLevel: "High School",
  },
  {
    id: 9,
    name: "Physical Education",
    code: "PE101",
    department: "Sports",
    credits: 1,
    hoursPerWeek: 4,
    type: "Compulsory",
    description: "Development of physical fitness and sports skills.",
    prerequisites: [],
    gradeLevel: "High School",
  },
  {
    id: 10,
    name: "Music",
    code: "MUS101",
    department: "Arts",
    credits: 2,
    hoursPerWeek: 3,
    type: "Elective",
    description: "Introduction to music theory and performance.",
    prerequisites: [],
    gradeLevel: "High School",
  },
]

const sampleClasses = [
  { id: 1, name: "Grade 10-A", section: "A", students: 28, schedule: "Morning" },
  { id: 2, name: "Grade 10-B", section: "B", students: 26, schedule: "Morning" },
  { id: 3, name: "Grade 11-A", section: "A", students: 24, schedule: "Morning" },
  { id: 4, name: "Grade 11-B", section: "B", students: 25, schedule: "Afternoon" },
  { id: 5, name: "Grade 12-A", section: "A", students: 22, schedule: "Morning" },
  { id: 6, name: "Grade 12-B", section: "B", students: 23, schedule: "Afternoon" },
]

const sampleStudents = [
  {
    id: 1,
    name: "Emma Thompson",
    rollNumber: "ST001",
    class: "Grade 10-A",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Female",
    performance: "Excellent",
  },
  {
    id: 2,
    name: "James Wilson",
    rollNumber: "ST002",
    class: "Grade 10-A",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Male",
    performance: "Good",
  },
  {
    id: 3,
    name: "Sophia Garcia",
    rollNumber: "ST003",
    class: "Grade 10-A",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Female",
    performance: "Excellent",
  },
  {
    id: 4,
    name: "Liam Johnson",
    rollNumber: "ST004",
    class: "Grade 10-A",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Male",
    performance: "Average",
  },
  {
    id: 5,
    name: "Olivia Martinez",
    rollNumber: "ST005",
    class: "Grade 10-A",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Female",
    performance: "Good",
  },
  {
    id: 6,
    name: "Noah Brown",
    rollNumber: "ST006",
    class: "Grade 10-B",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Male",
    performance: "Good",
  },
  {
    id: 7,
    name: "Ava Davis",
    rollNumber: "ST007",
    class: "Grade 10-B",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Female",
    performance: "Excellent",
  },
  {
    id: 8,
    name: "Ethan Miller",
    rollNumber: "ST008",
    class: "Grade 10-B",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Male",
    performance: "Average",
  },
  {
    id: 9,
    name: "Isabella Wilson",
    rollNumber: "ST009",
    class: "Grade 10-B",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Female",
    performance: "Good",
  },
  {
    id: 10,
    name: "Mason Taylor",
    rollNumber: "ST010",
    class: "Grade 10-B",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Male",
    performance: "Needs Improvement",
  },
  {
    id: 11,
    name: "Charlotte Anderson",
    rollNumber: "ST011",
    class: "Grade 11-A",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Female",
    performance: "Excellent",
  },
  {
    id: 12,
    name: "Lucas Thomas",
    rollNumber: "ST012",
    class: "Grade 11-A",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Male",
    performance: "Good",
  },
  {
    id: 13,
    name: "Amelia Jackson",
    rollNumber: "ST013",
    class: "Grade 11-A",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Female",
    performance: "Average",
  },
  {
    id: 14,
    name: "Benjamin White",
    rollNumber: "ST014",
    class: "Grade 11-A",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Male",
    performance: "Good",
  },
  {
    id: 15,
    name: "Mia Harris",
    rollNumber: "ST015",
    class: "Grade 11-A",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "Female",
    performance: "Excellent",
  },
]

const sampleTeachers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    department: "Science",
    qualification: "Ph.D. in Physics",
    experience: "8 years",
    specialization: "Advanced Physics",
    rating: 4.8,
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
  },
]

export default function AssignSubject() {
  const theme = useTheme()
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"))

  // State for form data
  const [formData, setFormData] = useState<FormData>({
    subject: null,
    class: null,
    teacher: null,
    isOptional: false,
    isExtraSubject: false,
    includeInGPA: true,
    startDate: "",
    endDate: "",
    description: "",
    selectedStudents: [],
  });

  // State for UI
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showTips, setShowTips] = useState(true)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSearchQuery, setSelectedSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState(0)

  // Filter students based on selected class
  const filteredStudents = formData.class
  ? sampleStudents.filter((student) => student.class === formData.class?.name)
  : []
 

  // Filter available students (not already selected)
  const availableStudents = filteredStudents.filter(
    (student) => !formData.selectedStudents.some((s) => s.id === student.id),
  )

  // Filter available students by search query
  const searchedAvailableStudents = availableStudents.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter selected students by search query
  const searchedSelectedStudents = formData.selectedStudents.filter((student) =>
    student.name.toLowerCase().includes(selectedSearchQuery.toLowerCase()),
  )

  // Calculate progress
  // Calculate progress
useEffect(() => {
  const calculateProgress = () => {
    let filledFields = 0
    let totalFields = 0

    //  fields
    const requiredFields: (keyof FormData)[] = ["subject", "class", "teacher"]
    requiredFields.forEach((field) => {
      totalFields++
      if (formData[field]) {
        filledFields++
      }
    })

    // Optional fields
    const optionalFields: (keyof FormData)[] = ["startDate", "endDate", "description"]
    optionalFields.forEach((field) => {
      if (formData[field]) {
        filledFields += 0.5
        totalFields += 0.5
      } else {
        totalFields += 0.5
      }
    })

    // Students selection
    if (formData.selectedStudents.length > 0) {
      filledFields++
    }
    totalFields++

    return Math.round((filledFields / totalFields) * 100)
  }

  setProgress(calculateProgress())
}, [formData])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
  
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      setSnackbar({
        open: true,
        message: "Subject assigned successfully!",
        severity: "success",
      })
      // Redirect to list page after successful submission
      // router.push('/subjects/assignments')
    }, 2000)
  }


  const handleAddAllStudents = () => {
    setFormData({
      ...formData,
      selectedStudents: [...formData.selectedStudents, ...availableStudents],
    })
  }
  
  const handleAddStudent = (student: Student) => {
    setFormData({
      ...formData,
      selectedStudents: [...formData.selectedStudents, student],
    })
  }
  
  const handleRemoveStudent = (studentId: number) => {
    setFormData({
      ...formData,
      selectedStudents: formData.selectedStudents.filter((s) => s.id !== studentId),
    })
  }
 

  // Handle removing all students
  const handleRemoveAllStudents = () => {
    setFormData({
      ...formData,
      selectedStudents: [],
    })
  }
 

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
  setActiveTab(newValue)
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
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link href="/subjects/assignments" passHref>
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
                Assign Subject
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title={showTips ? "Hide tips" : "Show tips"}>
                <IconButton onClick={() => setShowTips(!showTips)} color={showTips ? "primary" : "default"}>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
              <Link href="/dashboard" passHref>
                <IconButton
                  color="primary"
                  sx={{
                    bgcolor: "rgba(25,118,210,0.1)",
                    "&:hover": {
                      bgcolor: "rgba(25,118,210,0.2)",
                    },
                  }}
                >
                  <DashboardIcon />
                </IconButton>
              </Link>
            </Box>
          </Box>

          {/* Tips */}
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
                    Tips for Assigning Subjects
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    {activeTab === 0 &&  "Select a subject and class to begin. You can mark subjects as optional or extra if they do not count toward GPA calculations."}
                    {activeTab === 1 &&
                      "Select students who will take this subject. You can add all students from the class or select specific students."} 
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Collapse>

          {/* Progress Bar */}
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

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{
                "& .MuiTab-root": {
                  minWidth: { xs: "auto", md: 160 },
                  fontWeight: "medium",
                },
              }}
            >
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <MenuBookIcon sx={{ mr: 1 }} />
                    Subject Details
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <GroupsIcon sx={{ mr: 1 }} />
                    Select Students
                  </Box>
                }
                disabled={!formData.subject || !formData.class}
              />
            </Tabs>
          </Box>

          <form onSubmit={handleSubmit}>
            {/* Subject Details Tab */}
            <Fade in={activeTab === 0} timeout={500}>
              <Box sx={{ display: activeTab === 0 ? "block" : "none" }}>
                <Grid container spacing={3}>
                  {/* Subject Selection */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Autocomplete
                        id="subject-select"
                        options={sampleSubjects}
                        getOptionLabel={(option) => option.name}
                        value={formData.subject}
                        onChange={(event, newValue) => {
                          setFormData({
                            ...formData,
                            subject: newValue,
                          })
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Subject"
                            variant="outlined"
                            placeholder="Choose a subject..."
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  <InputAdornment position="start">
                                    <MenuBookIcon />
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
                                <Avatar sx={{ bgcolor: "primary.main" }}>
                                  <MenuBookIcon />
                                </Avatar>
                              </Box>
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" fontWeight="medium">
                                  {option.name} ({option.code})
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                  <Typography variant="body2" color="text.secondary">
                                    {option.department} • {option.credits} credits
                                  </Typography>
                                  <Chip
                                    label={option.type}
                                    size="small"
                                    color={
                                      option.type === "Core"
                                        ? "primary"
                                        : option.type === "Elective"
                                          ? "secondary"
                                          : "success"
                                    }
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

                  {/* Class Selection */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Autocomplete
                        id="class-select"
                        options={sampleClasses}
                        getOptionLabel={(option) => option.name}
                        value={formData.class}
                        onChange={(event, newValue) => {
                          setFormData({
                            ...formData,
                            class: newValue,
                            selectedStudents: [], // Reset selected students when class changes
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
                              startAdornment: (
                                <>
                                  <InputAdornment position="start">
                                    <ClassIcon />
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

                  {/* Teacher Selection */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Autocomplete
                        id="teacher-select"
                        options={sampleTeachers}
                        getOptionLabel={(option) => option.name}
                        value={formData.teacher}
                        onChange={(event, newValue) => {
                          setFormData({
                            ...formData,
                            teacher: newValue,
                          })
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Teacher"
                            variant="outlined"
                            placeholder="Choose a teacher..."
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  <InputAdornment position="start">
                                    <PersonIcon />
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
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Box key={star} component="span">
                                        {option.rating >= star ? (
                                          <StarIcon sx={{ color: "warning.main", fontSize: "1rem" }} />
                                        ) : (
                                          <StarBorderIcon sx={{ color: "warning.main", fontSize: "1rem" }} />
                                        )}
                                      </Box>
                                    ))}
                                    <Typography variant="body2" sx={{ ml: 1 }}>
                                      {option.rating}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </li>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Date Range */}
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Start Date"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
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
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="End Date"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
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
                    </Grid>
                  </Grid>

                  {/* Subject Options */}
                  <Grid item xs={12}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        bgcolor: "rgba(25,118,210,0.03)",
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.dark">
                          Subject Options
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={formData.isOptional}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      isOptional: e.target.checked,
                                    })
                                  }
                                  color="primary"
                                />
                              }
                              label={
                                <Box>
                                  <Typography fontWeight="medium">Optional Subject</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Students can choose to take this subject
                                  </Typography>
                                </Box>
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={formData.isExtraSubject}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      isExtraSubject: e.target.checked,
                                      includeInGPA: !e.target.checked ? formData.includeInGPA : false,
                                    })
                                  }
                                  color="secondary"
                                />
                              }
                              label={
                                <Box>
                                  <Typography fontWeight="medium">Extra Subject</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Additional subject beyond core curriculum
                                  </Typography>
                                </Box>
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={formData.includeInGPA}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      includeInGPA: e.target.checked,
                                    })
                                  }
                                  disabled={formData.isExtraSubject}
                                  color="success"
                                />
                              }
                              label={
                                <Box>
                                  <Typography fontWeight="medium">Include in GPA</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Subject will count toward GPA calculation
                                  </Typography>
                                </Box>
                              }
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Description */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Additional Notes"
                      multiline
                      rows={3}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Add any additional information or special instructions..."
                      InputProps={{
                        sx: { borderRadius: 2 },
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5, mr: 1 }}>
                            <DescriptionIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Subject Preview */}
                  {formData.subject && (
                    <Grid item xs={12}>
                      <Zoom in={Boolean(formData.subject)}>
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
                            <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.dark">
                              Subject Details
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2" color="text.secondary">
                                  Subject Name
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {formData.subject.name}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2" color="text.secondary">
                                  Subject Code
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {formData.subject.code}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2" color="text.secondary">
                                  Department
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {formData.subject.department}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2" color="text.secondary">
                                  Credits
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {formData.subject.credits} credits
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2" color="text.secondary">
                                  Hours Per Week
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {formData.subject.hoursPerWeek} hours
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2" color="text.secondary">
                                  Type
                                </Typography>
                                <Chip
                                  label={formData.subject.type}
                                  size="small"
                                  color={
                                    formData.subject.type === "Core"
                                      ? "primary"
                                      : formData.subject.type === "Elective"
                                        ? "secondary"
                                        : "success"
                                  }
                                  sx={{ borderRadius: 1 }}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2" color="text.secondary">
                                  Grade Level
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {formData.subject.gradeLevel}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2" color="text.secondary">
                                  Prerequisites
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {formData.subject.prerequisites.length > 0
                                    ? formData.subject.prerequisites.join(", ")
                                    : "None"}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary">
                                  Description
                                </Typography>
                                <Typography variant="body1">{formData.subject.description}</Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Zoom>
                    </Grid>
                  )}

                  {/* Navigation Buttons */}
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => setActiveTab(1)}
                        disabled={!formData.subject || !formData.class}
                        sx={{
                          borderRadius: 2,
                          boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
                          "&:hover": {
                            boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
                          },
                        }}
                      >
                        Next: Select Students
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Fade>

            {/* Select Students Tab */}
            <Fade in={activeTab === 1} timeout={500}>
              <Box sx={{ display: activeTab === 1 ? "block" : "none" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        bgcolor: "rgba(25,118,210,0.03)",
                        mb: 3,
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <ClassIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6" fontWeight="bold" color="primary.dark">
                            {formData.class?.name} • {filteredStudents.length} Students
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          <Chip
                            icon={<MenuBookIcon />}
                            label={`Subject: ${formData.subject?.name}`}
                            color="primary"
                            variant="outlined"
                            sx={{ borderRadius: 1 }}
                          />
                          <Chip
                            icon={<PersonIcon />}
                            label={`Teacher: ${formData.teacher?.name || "Not Selected"}`}
                            color="secondary"
                            variant="outlined"
                            sx={{ borderRadius: 1 }}
                          />
                          {formData.isOptional && (
                            <Chip
                              icon={<InfoIcon />}
                              label="Optional Subject"
                              color="info"
                              variant="outlined"
                              sx={{ borderRadius: 1 }}
                            />
                          )}
                          {formData.isExtraSubject && (
                            <Chip
                              icon={<InfoIcon />}
                              label="Extra Subject"
                              color="warning"
                              variant="outlined"
                              sx={{ borderRadius: 1 }}
                            />
                          )}
                          {!formData.includeInGPA && (
                            <Chip
                              icon={<InfoIcon />}
                              label="Not Included in GPA"
                              color="error"
                              variant="outlined"
                              sx={{ borderRadius: 1 }}
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Student Selection */}
                  <Grid item xs={12} md={5}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                          <Typography variant="h6" fontWeight="bold">
                            Available Students
                          </Typography>
                          <Button
                            size="small"
                            startIcon={<AddIcon />}
                            onClick={handleAddAllStudents}
                            disabled={availableStudents.length === 0}
                          >
                            Add All
                          </Button>
                        </Box>
                        <TextField
                          fullWidth
                          placeholder="Search students..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                            endAdornment: searchQuery && (
                              <InputAdornment position="end">
                                <IconButton size="small" onClick={() => setSearchQuery("")}>
                                  <ClearIcon fontSize="small" />
                                </IconButton>
                              </InputAdornment>
                            ),
                            sx: { borderRadius: 2 },
                          }}
                          variant="outlined"
                          size="small"
                          sx={{ mb: 2 }}
                        />
                        <Box
                          sx={{
                            flexGrow: 1,
                            overflow: "auto",
                            maxHeight: 400,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                          }}
                        >
                          {searchedAvailableStudents.length === 0 ? (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 3,
                                height: "100%",
                                minHeight: 200,
                              }}
                            >
                              <PersonIcon sx={{ fontSize: 40, color: "text.secondary", opacity: 0.5, mb: 1 }} />
                              <Typography variant="body2" color="text.secondary" align="center">
                                {availableStudents.length === 0
                                  ? "All students have been selected"
                                  : "No students match your search"}
                              </Typography>
                            </Box>
                          ) : (
                            <List disablePadding>
                              {searchedAvailableStudents.map((student) => (
                                <ListItem
                                  key={student.id}
                                  disablePadding
                                  secondaryAction={
                                    <IconButton
                                      edge="end"
                                      size="small"
                                      onClick={() => handleAddStudent(student)}
                                      sx={{ color: "primary.main" }}
                                    >
                                      <AddIcon />
                                    </IconButton>
                                  }
                                  sx={{
                                    borderBottom: "1px solid",
                                    borderColor: "divider",
                                    "&:last-child": {
                                      borderBottom: "none",
                                    },
                                  }}
                                >
                                  <ListItemButton onClick={() => handleAddStudent(student)} dense sx={{ py: 1 }}>
                                    <ListItemAvatar>
                                      <Avatar src={student.avatar} alt={student.name}>
                                        {student.name.charAt(0)}
                                      </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={
                                        <Typography variant="body1" fontWeight="medium">
                                          {student.name}
                                        </Typography>
                                      }
                                      secondary={
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                          <Typography variant="body2" color="text.secondary">
                                            {student.rollNumber}
                                          </Typography>
                                          <Box
                                            component="span"
                                            sx={{
                                              width: 6,
                                              height: 6,
                                              borderRadius: "50%",
                                              bgcolor: "text.disabled",
                                              display: "inline-block",
                                              mx: 0.5,
                                            }}
                                          />
                                          <Chip
                                            label={student.performance}
                                            size="small"
                                            color={
                                              student.performance === "Excellent"
                                                ? "success"
                                                : student.performance === "Good"
                                                  ? "primary"
                                                  : student.performance === "Average"
                                                    ? "info"
                                                    : "warning"
                                            }
                                            variant="outlined"
                                            sx={{ borderRadius: 1, height: 20, fontSize: "0.7rem" }}
                                          />
                                        </Box>
                                      }
                                    />
                                  </ListItemButton>
                                </ListItem>
                              ))}
                            </List>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Transfer Controls */}
                  <Grid
                    item
                    xs={12}
                    md={2}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "row", md: "column" },
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "row", md: "column" },
                        gap: 2,
                        p: 2,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={<ArrowForwardIcon />}
                        onClick={handleAddAllStudents}
                        disabled={availableStudents.length === 0}
                        sx={{ borderRadius: 2, width: { xs: "auto", md: "100%" } }}
                      >
                        Add All
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<ArrowLeftIcon />}
                        onClick={handleRemoveAllStudents}
                        disabled={formData.selectedStudents.length === 0}
                        sx={{ borderRadius: 2, width: { xs: "auto", md: "100%" } }}
                      >
                        Remove All
                      </Button>
                    </Box>
                  </Grid>

                  {/* Selected Students */}
                  <Grid item xs={12} md={5}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                          <Typography variant="h6" fontWeight="bold">
                            Selected Students ({formData.selectedStudents.length})
                          </Typography>
                          <Button
                            size="small"
                            startIcon={<RemoveIcon />}
                            onClick={handleRemoveAllStudents}
                            disabled={formData.selectedStudents.length === 0}
                          >
                            Remove All
                          </Button>
                        </Box>
                        <TextField
                          fullWidth
                          placeholder="Search selected students..."
                          value={selectedSearchQuery}
                          onChange={(e) => setSelectedSearchQuery(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                            endAdornment: selectedSearchQuery && (
                              <InputAdornment position="end">
                                <IconButton size="small" onClick={() => setSelectedSearchQuery("")}>
                                  <ClearIcon fontSize="small" />
                                </IconButton>
                              </InputAdornment>
                            ),
                            sx: { borderRadius: 2 },
                          }}
                          variant="outlined"
                          size="small"
                          sx={{ mb: 2 }}
                        />
                        <Box
                          sx={{
                            flexGrow: 1,
                            overflow: "auto",
                            maxHeight: 400,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                          }}
                        >
                          {formData.selectedStudents.length === 0 ? (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 3,
                                height: "100%",
                                minHeight: 200,
                              }}
                            >
                              <GroupsIcon sx={{ fontSize: 40, color: "text.secondary", opacity: 0.5, mb: 1 }} />
                              <Typography variant="body2" color="text.secondary" align="center">
                                No students selected yet
                              </Typography>
                              <Typography variant="body2" color="text.secondary" align="center">
                                Select students from the left panel
                              </Typography>
                            </Box>
                          ) : searchedSelectedStudents.length === 0 ? (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 3,
                                height: "100%",
                                minHeight: 200,
                              }}
                            >
                              <SearchIcon sx={{ fontSize: 40, color: "text.secondary", opacity: 0.5, mb: 1 }} />
                              <Typography variant="body2" color="text.secondary" align="center">
                                No students match your search
                              </Typography>
                            </Box>
                          ) : (
                            <List disablePadding>
                              {searchedSelectedStudents.map((student) => (
                                <ListItem
                                  key={student.id}
                                  disablePadding
                                  secondaryAction={
                                    <IconButton
                                      edge="end"
                                      size="small"
                                      onClick={() => handleRemoveStudent(student.id)}
                                      sx={{ color: "error.main" }}
                                    >
                                      <RemoveIcon />
                                    </IconButton>
                                  }
                                  sx={{
                                    borderBottom: "1px solid",
                                    borderColor: "divider",
                                    "&:last-child": {
                                      borderBottom: "none",
                                    },
                                  }}
                                >
                                  <ListItemButton onClick={() => handleRemoveStudent(student.id)} dense sx={{ py: 1 }}>
                                    <ListItemAvatar>
                                      <Avatar src={student.avatar} alt={student.name}>
                                        {student.name.charAt(0)}
                                      </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={
                                        <Typography variant="body1" fontWeight="medium">
                                          {student.name}
                                        </Typography>
                                      }
                                      secondary={
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                          <Typography variant="body2" color="text.secondary">
                                            {student.rollNumber}
                                          </Typography>
                                          <Box
                                            component="span"
                                            sx={{
                                              width: 6,
                                              height: 6,
                                              borderRadius: "50%",
                                              bgcolor: "text.disabled",
                                              display: "inline-block",
                                              mx: 0.5,
                                            }}
                                          />
                                          <Chip
                                            label={student.performance}
                                            size="small"
                                            color={
                                              student.performance === "Excellent"
                                                ? "success"
                                                : student.performance === "Good"
                                                  ? "primary"
                                                  : student.performance === "Average"
                                                    ? "info"
                                                    : "warning"
                                            }
                                            variant="outlined"
                                            sx={{ borderRadius: 1, height: 20, fontSize: "0.7rem" }}
                                          />
                                        </Box>
                                      }
                                    />
                                  </ListItemButton>
                                </ListItem>
                              ))}
                            </List>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Navigation Buttons */}
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<ArrowLeftIcon />}
                        onClick={() => setActiveTab(0)}
                        sx={{
                          borderRadius: 2,
                          borderWidth: 2,
                          "&:hover": {
                            borderWidth: 2,
                          },
                        }}
                      >
                        Back to Subject Details
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        disabled={
                          saving ||
                          !formData.subject ||
                          !formData.class ||
                          !formData.teacher ||
                          formData.selectedStudents.length === 0
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
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          </form>
        </Box>
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Loading Backdrop */}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={saving}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  )
}
