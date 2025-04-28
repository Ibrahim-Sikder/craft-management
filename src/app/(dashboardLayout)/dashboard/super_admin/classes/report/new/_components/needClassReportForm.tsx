// // /* eslint-disable react-hooks/exhaustive-deps */
// // /* eslint-disable @typescript-eslint/no-unused-vars */
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client"

// // import { useState, useEffect, useMemo } from "react"
// // import {
// //   Box,
// //   Container,
// //   Typography,
// //   Button,
// //   Paper,
// //   Grid,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Menu,
// //   MenuItem,
// //   Divider,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogContentText,
// //   DialogTitle,
// //   Skeleton,
// //   Fade,
// //   ThemeProvider,
// //   Checkbox,
// //   Alert,
// //   Snackbar,
// // } from "@mui/material"
// // import {
// //   Search as SearchIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Visibility as VisibilityIcon,
// //   Add,
// //   Save,
// //   Email,
// //   Person,
// // } from "@mui/icons-material"
// // import CraftForm from "@/components/Forms/Form"
// // import CraftDatePicker from "@/components/Forms/DatePicker"
// // import CraftSelect from "@/components/Forms/Select"
// // import CraftTextArea from "@/components/Forms/TextArea"
// // import { classHour, className, subjectName, teacherName } from "@/options"
// // import CraftIntAutoComplete from "@/components/Forms/CruftAutocomplete"
// // import { customTheme } from "@/data"
// // import { getFromLocalStorage } from "@/utils/local.storage"
// // import type { FieldValues } from "react-hook-form"
// // import { useGetAllStudentsQuery } from "@/redux/api/studentApi"
// // import toast from "react-hot-toast"
// // import { useRouter } from "next/navigation"
// // import { useCreateClassReportMutation, useGetSingleClassReportQuery } from "@/redux/api/classReportApi"
// // import { useGetAllClassesQuery } from "@/redux/api/classApi"
// // import { useGetAllSubjectsQuery } from "@/redux/api/subjectApi"
// // import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
// // import TodayLesson from "./TodayLesson"
// // import TodayTask from "./TodayTask"

// // type ClassReportProps = {
// //   id: string;
// // }
// // export default function ClassReportForm({ id }: ClassReportProps) {
// //   console.log(id)
// //   const router = useRouter()
// //   const [page, setPage] = useState(0)
// //   const [rowsPerPage, setRowsPerPage] = useState(10)
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [filters, setFilters] = useState({
// //     class: "",
// //     batch: "",
// //     teacher: "",
// //     date: "",
// //     day: "",
// //   })
// //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
// //   const [selectedBrand, setSelectedBrand] = useState("")
// //   const [filteredSubjects, setFilteredVehicles] = useState<any[]>([])
// //   const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
// //   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
// //   const [refreshKey, setRefreshKey] = useState(0)
// //   const [snackbarOpen, setSnackbarOpen] = useState(false)
// //   const [snackbarMessage, setSnackbarMessage] = useState("")
// //   const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")
// //   const [studentEvaluations, setStudentEvaluations] = useState<any[]>([])
// //   const [todayLessonId, setTodayLessonId] = useState<string | null>(null)
// //   const [homeTaskId, setHomeTaskId] = useState<string | null>(null)
// //   const { data: singleClassReport } = useGetSingleClassReportQuery({ id })
// //   console.log('single classreport', singleClassReport)
// //   const {
// //     data: classData,
// //   } = useGetAllClassesQuery({
// //     limit: rowsPerPage,
// //     page: page + 1,
// //     searchTerm: searchTerm,
// //   })
// //   const {
// //     data: subjectData,
// //   } = useGetAllSubjectsQuery({
// //     limit: rowsPerPage,
// //     page: page + 1,
// //     searchTerm: searchTerm,
// //   })
// //   const classOption = useMemo(() => {
// //     if (!classData?.data?.classes) return []
// //     return classData?.data?.classes.map((clg: any) => ({
// //       label: clg.className,
// //       value: clg._id,
// //     }))
// //   }, [classData])

// //   const subjectOption = useMemo(() => {
// //     if (!subjectData?.data?.subjects) return []
// //     return subjectData?.data?.subjects.map((sub: any) => ({
// //       label: sub.name,
// //       value: sub._id,
// //     }))
// //   }, [subjectData])

// //   // New state for dialog controls
// //   const [todayLessonDialogOpen, setTodayLessonDialogOpen] = useState(false)
// //   const [todayTaskDialogOpen, setTodayTaskDialogOpen] = useState(false)

// //   const storedUser = JSON.parse(getFromLocalStorage("user-info") || "{}")

// //   const theme = customTheme

// //   // Fetch students from API
// //   const {
// //     data: studentData,
// //     isLoading,
// //     refetch,
// //   } = useGetAllStudentsQuery({
// //     limit: rowsPerPage,
// //     page: page + 1,
// //     searchTerm: searchTerm,
// //   })
// //   const [createClassReport] = useCreateClassReportMutation()

// //   // Get students from API response
// //   const students = studentData?.data || []

// //   // Initialize student evaluations when students data is loaded
// //   useEffect(() => {
// //     if (students.length > 0) {
// //       const initialEvaluations = students.map((student: any) => ({
// //         studentId: student._id,
// //         lessonEvaluation: "পড়া শিখেছে",
// //         handwriting: "লিখেছে",
// //         attendance: "উপস্থিত",
// //         parentSignature: false,
// //         comments: "",
// //       }))
// //       setStudentEvaluations(initialEvaluations)
// //     }
// //   }, [students])

// //   const handleSubmit = async (data: FieldValues) => {
// //     console.log("Form data:", data)

// //     // Extract class value - handle both object format and direct value
// //     let classValue = null
// //     if (data.classes) {
// //       if (typeof data.classes === "object" && data.classes !== null) {
// //         // If it's an object with value property
// //         classValue = data.classes.value || null
// //       } else {
// //         // If it's a direct value
// //         classValue = data.classes
// //       }
// //     }

// //     // Extract subject value - handle both object format and direct value
// //     let subjectValue = null
// //     if (data.subjects) {
// //       if (typeof data.subjects === "object" && data.subjects !== null) {
// //         // If it's an object with value property
// //         subjectValue = data.subjects.value || null
// //       } else {
// //         // If it's a direct value
// //         subjectValue = data.subjects
// //       }
// //     }

// //     try {
// //       // Check if today's lesson and home task are added
// //       if (!todayLessonId) {
// //         toast.error("আজকের পাঠ যোগ করুন")
// //         return
// //       }

// //       if (!homeTaskId) {
// //         toast.error("বাড়ির কাজ যোগ করুন")
// //         return
// //       }

// //       // Check if class and subject are selected
// //       if (!classValue) {
// //         toast.error("শ্রেণী নির্বাচন করুন")
// //         return
// //       }

// //       if (!subjectValue) {
// //         toast.error("বিষয় নির্বাচন করুন")
// //         return
// //       }

// //       // Format data according to the Mongoose model
// //       const formattedData = {
// //         teachers: storedUser.userId,
// //         subjects: [subjectValue],
// //         classes: [classValue],
// //         hour: data.hour,
// //         date: data.date,
// //         studentEvaluations: studentEvaluations,
// //         todayLesson: todayLessonId,
// //         homeTask: homeTaskId,
// //       }

// //       console.log("Submitting class report:", formattedData)

// //       const response = await createClassReport(formattedData).unwrap()
// //       console.log(response)
// //       if (response.success) {
// //         setSnackbarMessage("Class report saved successfully!")
// //         setSnackbarSeverity("success")
// //         setSnackbarOpen(true)
// //         toast.success("Class report saved successfully!")
// //         // Redirect to the list page after successful save
// //         router.push("/dashboard/super_admin/classes/report")
// //       }
// //     } catch (error: any) {
// //       console.error("Error saving class report:", error)
// //       setSnackbarMessage(error?.data?.message || "Failed to save class report")
// //       setSnackbarSeverity("error")
// //       setSnackbarOpen(true)
// //       toast.error(error?.data?.message || "Failed to save class report")
// //     }
// //   }

// //   const handleMenuClose = () => {
// //     setAnchorEl(null)
// //   }

// //   const handleDeleteClick = () => {
// //     setDeleteDialogOpen(true)
// //     setAnchorEl(null)
// //   }

// //   const handleDeleteConfirm = () => {
// //     setDeleteDialogOpen(false)
// //     setSelectedStudent(null)
// //   }

// //   const handleDeleteCancel = () => {
// //     setDeleteDialogOpen(false)
// //   }

// //   const handleSnackbarClose = () => {
// //     setSnackbarOpen(false)
// //   }

// //   // Update student evaluation fields
// //   const handleLessonEvaluationChange = (studentId: string, value: string) => {
// //     setStudentEvaluations(
// //       studentEvaluations.map((evaluation) =>
// //         evaluation.studentId === studentId ? { ...evaluation, lessonEvaluation: value } : evaluation,
// //       ),
// //     )
// //   }

// //   const handleHandwritingChange = (studentId: string, value: string) => {
// //     setStudentEvaluations(
// //       studentEvaluations.map((evaluation) =>
// //         evaluation.studentId === studentId ? { ...evaluation, handwriting: value } : evaluation,
// //       ),
// //     )
// //   }

// //   const handleAttendanceChange = (studentId: string, value: string) => {
// //     setStudentEvaluations(
// //       studentEvaluations.map((evaluation) =>
// //         evaluation.studentId === studentId ? { ...evaluation, attendance: value } : evaluation,
// //       ),
// //     )
// //   }

// //   const handleParentSignatureChange = (studentId: string, checked: boolean) => {
// //     setStudentEvaluations(
// //       studentEvaluations.map((evaluation) =>
// //         evaluation.studentId === studentId ? { ...evaluation, parentSignature: checked } : evaluation,
// //       ),
// //     )
// //   }

// //   const handleCommentsChange = (studentId: string, value: string) => {
// //     setStudentEvaluations(
// //       studentEvaluations.map((evaluation) =>
// //         evaluation.studentId === studentId ? { ...evaluation, comments: value } : evaluation,
// //       ),
// //     )
// //   }

// //   const sortedVehicleName = subjectName.sort((a, b) => {
// //     if (a.value < b.value) return -1
// //     if (a.value > b.value) return 1
// //     return 0
// //   })

// //   const handleClassName = (event: any, newValue: any) => {
// //     setSelectedBrand(newValue)

// //     // Filter and sort the vehicles
// //     const filtered = sortedVehicleName
// //       ?.filter((vehicle: any) => vehicle.label?.toLowerCase().includes(newValue?.toLowerCase()))
// //       .sort((a: any, b: any) => a.label.localeCompare(b.label))

// //     setFilteredVehicles(filtered)
// //   }

// //   // Get evaluation for a specific student
// //   const getStudentEvaluation = (studentId: string) => {
// //     return (
// //       studentEvaluations.find((evaluation) => evaluation.studentId === studentId) || {
// //         lessonEvaluation: "পড়া শিখেছে",
// //         handwriting: "লিখেছে",
// //         attendance: "উপস্থিত",
// //         parentSignature: false,
// //         comments: "",
// //       }
// //     )
// //   }

// //   // Handle Today's Lesson dialog
// //   const handleOpenTodayLessonDialog = () => {
// //     setTodayLessonDialogOpen(true)
// //   }

// //   const handleCloseTodayLessonDialog = () => {
// //     setTodayLessonDialogOpen(false)
// //   }

// //   const handleSaveTodayLesson = (lessonId: string) => {
// //     setTodayLessonId(lessonId)
// //     console.log(lessonId)
// //     toast.success("আজকের পাঠ যোগ করা হয়েছে!")
// //   }

// //   // Handle Home Task dialog
// //   const handleOpenTodayTaskDialog = () => {
// //     setTodayTaskDialogOpen(true)
// //   }

// //   const handleCloseTodayTaskDialog = () => {
// //     setTodayTaskDialogOpen(false)
// //   }

// //   const handleSaveTodayTask = (taskId: string) => {
// //     setHomeTaskId(taskId)
// //     toast.success("বাড়ির কাজ যোগ করা হয়েছে!")
// //   }

// //   const defaultValue = {
// //     description: singleClassReport?.data?.description || '',
// //     hour: singleClassReport?.data?.hour || ''
// //   }

// //   return (
// //     <>
// //       <ThemeProvider theme={theme}>
// //         <CraftForm onSubmit={handleSubmit}>
// //           <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", borderRadius: 2 }}>
// //             <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2 }}>
// //               <Fade in={true} timeout={800}>
// //                 <Box>
// //                   <Box
// //                     sx={{
// //                       display: "flex",
// //                       justifyContent: "space-between",
// //                       alignItems: "center",
// //                       mb: 3,
// //                       flexWrap: "wrap",
// //                       gap: 2,
// //                       paddingTop: 2,
// //                     }}
// //                   >
// //                     <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
// //                       + Add New Report
// //                     </Typography>
// //                     <Box sx={{ display: "flex", gap: 2 }}>
// //                       <Button
// //                         variant="contained"
// //                         color="primary"
// //                         startIcon={<Add />}
// //                         onClick={handleOpenTodayLessonDialog}
// //                         sx={{
// //                           bgcolor: todayLessonId ? "success.main" : "",
// //                           borderRadius: 2,
// //                           boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
// //                         }}
// //                       >
// //                         {todayLessonId ? "আজকের পাঠ যোগ করা হয়েছে" : "আজকের পাঠ"}
// //                       </Button>
// //                       <Button
// //                         variant="contained"
// //                         color="primary"
// //                         startIcon={<Add />}
// //                         onClick={handleOpenTodayTaskDialog}
// //                         sx={{
// //                           bgcolor: homeTaskId ? "success.main" : "#3792de",
// //                           borderRadius: 2,
// //                           boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
// //                         }}
// //                       >
// //                         {homeTaskId ? "বাড়ির কাজ যোগ করা হয়েছে" : "বাড়ির কাজ"}
// //                       </Button>
// //                       <Button
// //                         type="submit"
// //                         variant="contained"
// //                         color="primary"
// //                         startIcon={<Save />}
// //                         sx={{
// //                           bgcolor: "#4F0187",
// //                           borderRadius: 2,
// //                           boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
// //                         }}
// //                       >
// //                         Save
// //                       </Button>
// //                     </Box>
// //                   </Box>

// //                   <Paper elevation={0} sx={{ mb: 4, overflow: "hidden" }}>
// //                     <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
// //                       <Grid container spacing={2} alignItems="center" gap={3}>
// //                         <Grid container spacing={2}>
// //                           {/* Teacher Name */}
// //                           <Grid item xs={12} md={4}>

// //                             <CraftInputWithIcon
// //                               name="teachers"
// //                               label="শিক্ষকের নাম"
// //                               placeholder="শিক্ষকের নাম লিখুন"
// //                               defaultValue={storedUser?.name}
// //                               required
// //                               fullWidth
// //                               InputProps={{
// //                                 startAdornment: <Person sx={{ color: "primary.main", mr: 1 }} />,
// //                               }}
// //                             />
// //                           </Grid>

// //                           <Grid item xs={12} md={2}>
// //                             <CraftIntAutoComplete
// //                               name="classes"
// //                               label="শ্রেণীর নাম লিখুন"
// //                               fullWidth
// //                               freeSolo
// //                               multiple={false}
// //                               // options={className.map((option) => option.label)}
// //                               options={classOption}
// //                             // options={className}
// //                             // onChange={handleClassName}
// //                             />
// //                           </Grid>
// //                           <Grid item xs={12} md={3}>
// //                             <CraftIntAutoComplete
// //                               name="subjects"
// //                               label="বিষয়ের নাম লিখুন"
// //                               fullWidth
// //                               freeSolo
// //                               multiple={false}
// //                               options={subjectOption}
// //                             // options={filteredSubjects.map((option) => option.value)}
// //                             // onInputChange={(event, newValue) => { }}
// //                             />
// //                           </Grid>
// //                           <Grid item xs={12} md={1}>
// //                             <CraftSelect name="hour" label="ঘন্টা" items={classHour} sx={{ minWidth: 100 }} />
// //                           </Grid>
// //                           {/* Date */}
// //                           <Grid item xs={12} md={2}>
// //                           <CraftDatePicker name="date" label="তারিখ" />

// //                           </Grid>
// //                         </Grid>
// //                       </Grid>
// //                     </Box>

// //                     {isLoading ? (
// //                       <Box sx={{ p: 2 }}>
// //                         {Array.from(new Array(5)).map((_, index) => (
// //                           <Box key={index} sx={{ display: "flex", py: 2, px: 2, alignItems: "center" }}>
// //                             <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
// //                             <Box sx={{ width: "100%" }}>
// //                               <Skeleton variant="text" width="40%" height={30} />
// //                               <Box sx={{ display: "flex", mt: 1 }}>
// //                                 <Skeleton variant="text" width="20%" sx={{ mr: 2 }} />
// //                                 <Skeleton variant="text" width="30%" />
// //                               </Box>
// //                             </Box>
// //                             <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
// //                           </Box>
// //                         ))}
// //                       </Box>
// //                     ) : (
// //                       <>
// //                         <TableContainer>
// //                           <Table sx={{ minWidth: 650 }}>
// //                             <TableHead>
// //                               <TableRow>
// //                                 <TableCell>ছাত্রের নাম</TableCell>
// //                                 <TableCell>পাঠ মূল্যায়ন</TableCell>
// //                                 <TableCell>হাতের লিখা</TableCell>
// //                                 <TableCell>উপস্থিতি</TableCell>
// //                                 <TableCell align="center">অভিভাবকের স্বাক্ষর</TableCell>
// //                                 <TableCell align="center">মন্তব্য</TableCell>
// //                               </TableRow>
// //                             </TableHead>
// //                             <TableBody>
// //                               {students.length === 0 && (
// //                                 <TableRow>
// //                                   <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
// //                                     <Box sx={{ textAlign: "center" }}>
// //                                       <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
// //                                       <Typography variant="h6" gutterBottom>
// //                                         No students found
// //                                       </Typography>
// //                                       <Typography variant="body2" color="text.secondary">
// //                                         Try adjusting your search or filter to find what you&apos;re looking for.
// //                                       </Typography>
// //                                     </Box>
// //                                   </TableCell>
// //                                 </TableRow>
// //                               )}

// //                               {students.length > 0 ? (
// //                                 students.map((student: any) => {
// //                                   const evaluation = getStudentEvaluation(student._id)
// //                                   return (
// //                                     <TableRow key={student._id} sx={{ transition: "all 0.2s" }}>
// //                                       <TableCell component="th" scope="row">
// //                                         <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
// //                                           {student.name}
// //                                         </Typography>
// //                                         <Typography variant="caption" color="text.secondary">
// //                                           {student.studentId} • {student.className} {student.section}
// //                                         </Typography>
// //                                       </TableCell>

// //                                       <TableCell align="center">
// //                                         <CraftSelect
// //                                           name={`lessonEvaluation_${student._id}`}
// //                                           items={["পড়া শিখেছে", "আংশিক শিখেছে", "পড়া শিখেনি"]}
// //                                           onChange={(e) => handleLessonEvaluationChange(student._id, e.target.value)}
// //                                           sx={{ minWidth: 160 }}
// //                                         />
// //                                       </TableCell>

// //                                       <TableCell align="center">
// //                                         <CraftSelect
// //                                           name={`handwriting_${student._id}`}
// //                                           items={["লিখেছে", "আংশিক লিখেছে", "লিখেনি"]}
// //                                           onChange={(e) => handleHandwritingChange(student._id, e.target.value)}
// //                                           sx={{ minWidth: 160 }}
// //                                         />
// //                                       </TableCell>
// //                                       <TableCell align="center">
// //                                         <CraftSelect
// //                                           name={`attendance_${student._id}`}
// //                                           items={["উপস্থিত", "অনুপস্থিত", "ছুটি"]}
// //                                           onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
// //                                           sx={{ minWidth: 160 }}
// //                                         />
// //                                       </TableCell>
// //                                       <TableCell align="center">
// //                                         <Checkbox
// //                                           color="primary"
// //                                           checked={evaluation.parentSignature}
// //                                           onChange={(e) => handleParentSignatureChange(student._id, e.target.checked)}
// //                                         />
// //                                       </TableCell>
// //                                       <TableCell>
// //                                         <CraftTextArea
// //                                           name={`comments_${student._id}`}
// //                                           label="মন্তব্য"
// //                                           placeholder="মন্তব্য"
// //                                           minRows={1}
// //                                           value={evaluation.comments}
// //                                           onChange={(e) => handleCommentsChange(student._id, e.target.value)}
// //                                         />
// //                                       </TableCell>
// //                                     </TableRow>
// //                                   )
// //                                 })
// //                               ) : (
// //                                 <TableRow>
// //                                   <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
// //                                     <Box sx={{ textAlign: "center" }}>
// //                                       <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
// //                                       <Typography variant="h6" gutterBottom>
// //                                         No students found
// //                                       </Typography>
// //                                       <Typography variant="body2" color="text.secondary">
// //                                         Try adjusting your search or filter to find what you&apos;re looking for.
// //                                       </Typography>
// //                                     </Box>
// //                                   </TableCell>
// //                                 </TableRow>
// //                               )}
// //                             </TableBody>
// //                           </Table>
// //                         </TableContainer>
// //                       </>
// //                     )}
// //                   </Paper>
// //                 </Box>
// //               </Fade>
// //             </Container>
// //           </Box>

// //           {/* Context Menu */}
// //           <Menu
// //             anchorEl={anchorEl}
// //             open={Boolean(anchorEl)}
// //             onClose={handleMenuClose}
// //             PaperProps={{
// //               elevation: 3,
// //               sx: {
// //                 mt: 1,
// //                 minWidth: 180,
// //                 borderRadius: 2,
// //                 overflow: "hidden",
// //               },
// //             }}
// //           >
// //             <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
// //               <VisibilityIcon fontSize="small" sx={{ mr: 2, color: "info.main" }} />
// //               View Details
// //             </MenuItem>
// //             <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
// //               <EditIcon fontSize="small" sx={{ mr: 2, color: "warning.main" }} />
// //               Edit
// //             </MenuItem>
// //             <Divider />
// //             <MenuItem onClick={handleDeleteClick} sx={{ py: 1.5, color: "error.main" }}>
// //               <DeleteIcon fontSize="small" sx={{ mr: 2 }} />
// //               Delete
// //             </MenuItem>
// //           </Menu>

// //           {/* Delete Confirmation Dialog */}
// //           <Dialog
// //             open={deleteDialogOpen}
// //             onClose={handleDeleteCancel}
// //             PaperProps={{
// //               sx: {
// //                 borderRadius: 3,
// //                 width: "100%",
// //                 maxWidth: 480,
// //               },
// //             }}
// //           >
// //             <DialogTitle sx={{ pb: 1 }}>
// //               <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
// //                 Delete Student
// //               </Typography>
// //             </DialogTitle>
// //             <DialogContent>
// //               <DialogContentText>
// //                 Are you sure you want to delete the student &#34;{selectedStudent?.name}&#34;? This action cannot be
// //                 undone.
// //               </DialogContentText>
// //             </DialogContent>
// //             <DialogActions sx={{ px: 3, pb: 3 }}>
// //               <Button
// //                 onClick={handleDeleteCancel}
// //                 variant="outlined"
// //                 color="inherit"
// //                 sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
// //               >
// //                 Cancel
// //               </Button>
// //               <Button onClick={handleDeleteConfirm} variant="contained" color="error" sx={{ ml: 2 }}>
// //                 Delete
// //               </Button>
// //             </DialogActions>
// //           </Dialog>

// //           {/* Snackbar for notifications */}
// //           <Snackbar
// //             open={snackbarOpen}
// //             autoHideDuration={6000}
// //             onClose={handleSnackbarClose}
// //             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// //           >
// //             <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} variant="filled" sx={{ width: "100%" }}>
// //               {snackbarMessage}
// //             </Alert>
// //           </Snackbar>
// //         </CraftForm>
// //       </ThemeProvider>

// //       {/* Today's Lesson Dialog */}
// //       <TodayLesson open={todayLessonDialogOpen} onClose={handleCloseTodayLessonDialog} onSave={handleSaveTodayLesson} />

// //       {/* Home Task Dialog */}
// //       <TodayTask open={todayTaskDialogOpen} onClose={handleCloseTodayTaskDialog} onSave={handleSaveTodayTask} />
// //     </>
// //   )
// // }
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import { useState, useEffect, useMemo } from "react"
// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   Paper,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Menu,
//   MenuItem,
//   Divider,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Skeleton,
//   Fade,
//   ThemeProvider,
//   Checkbox,
//   Alert,
//   Snackbar,
// } from "@mui/material"
// import {
//   Search as SearchIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as VisibilityIcon,
//   Add,
//   Save,
//   Email,
//   Person,
// } from "@mui/icons-material"
// import CraftForm from "@/components/Forms/Form"
// import CraftDatePicker from "@/components/Forms/DatePicker"
// import CraftSelect from "@/components/Forms/Select"
// import CraftTextArea from "@/components/Forms/TextArea"
// import { classHour, className, subjectName, teacherName } from "@/options"
// import CraftIntAutoComplete from "@/components/Forms/CruftAutocomplete"
// import { customTheme } from "@/data"
// import { getFromLocalStorage } from "@/utils/local.storage"
// import type { FieldValues } from "react-hook-form"
// import { useGetAllStudentsQuery } from "@/redux/api/studentApi"
// import toast from "react-hot-toast"
// import { useRouter } from "next/navigation"
// import { useCreateClassReportMutation, useGetSingleClassReportQuery } from "@/redux/api/classReportApi"
// import { useGetAllClassesQuery } from "@/redux/api/classApi"
// import { useGetAllSubjectsQuery } from "@/redux/api/subjectApi"
// import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
// import TodayLesson from "./TodayLesson"
// import TodayTask from "./TodayTask"
// import { format } from "date-fns"

// type ClassReportProps = {
//   id: string;
// }
// export default function ClassReportForm({ id }: ClassReportProps) {
//   console.log(id)
//   const router = useRouter()
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(10)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filters, setFilters] = useState({
//     class: "",
//     batch: "",
//     teacher: "",
//     date: "",
//     day: "",
//   })
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const [selectedBrand, setSelectedBrand] = useState("")
//   const [filteredSubjects, setFilteredVehicles] = useState<any[]>([])
//   const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [refreshKey, setRefreshKey] = useState(0)
//   const [snackbarOpen, setSnackbarOpen] = useState(false)
//   const [snackbarMessage, setSnackbarMessage] = useState("")
//   const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")
//   const [studentEvaluations, setStudentEvaluations] = useState<any[]>([])
//   const [todayLessonId, setTodayLessonId] = useState<string | null>(null)
//   const [homeTaskId, setHomeTaskId] = useState<string | null>(null)
//   const { data: singleClassReport, isLoading: singleClassReportLoading } = useGetSingleClassReportQuery({ id })
//   console.log('single classreport', singleClassReport)
//   const {
//     data: classData,
//   } = useGetAllClassesQuery({
//     limit: rowsPerPage,
//     page: page + 1,
//     searchTerm: searchTerm,
//   })
//   const {
//     data: subjectData,
//   } = useGetAllSubjectsQuery({
//     limit: rowsPerPage,
//     page: page + 1,
//     searchTerm: searchTerm,
//   })
//   const classOption = useMemo(() => {
//     if (!classData?.data?.classes) return []
//     return classData?.data?.classes.map((clg: any) => ({
//       label: clg.className,
//       value: clg._id,
//     }))
//   }, [classData])

//   const subjectOption = useMemo(() => {
//     if (!subjectData?.data?.subjects) return []
//     return subjectData?.data?.subjects.map((sub: any) => ({
//       label: sub.name,
//       value: sub._id,
//     }))
//   }, [subjectData])

//   // New state for dialog controls
//   const [todayLessonDialogOpen, setTodayLessonDialogOpen] = useState(false)
//   const [todayTaskDialogOpen, setTodayTaskDialogOpen] = useState(false)

//   const storedUser = JSON.parse(getFromLocalStorage("user-info") || "{}")

//   const theme = customTheme

//   // Fetch students from API
//   const {
//     data: studentData,
//     isLoading,
//     refetch,
//   } = useGetAllStudentsQuery({
//     limit: rowsPerPage,
//     page: page + 1,
//     searchTerm: searchTerm,
//   })
//   const [createClassReport] = useCreateClassReportMutation()

//   // Get students from API response
//   const students = studentData?.data || []

//   // Initialize student evaluations when students data is loaded or when editing
//   useEffect(() => {
//     if (singleClassReport?.data?.studentEvaluations?.length > 0) {
//       // Use evaluations from the report when editing
//       setStudentEvaluations(
//         singleClassReport.data.studentEvaluations.map((studentEval: any) => ({
//           studentId: studentEval.studentId._id,
//           lessonEvaluation: studentEval.lessonEvaluation,
//           handwriting: studentEval.handwriting,
//           attendance: studentEval.attendance,
//           parentSignature: studentEval.parentSignature,
//           comments: studentEval.comments || "",
//         })),
//       )
//     } else if (students.length > 0) {
//       // Initialize new evaluations for new report
//       const initialEvaluations = students.map((student: any) => ({
//         studentId: student._id,
//         lessonEvaluation: "পড়া শিখেছে",
//         handwriting: "লিখেছে",
//         attendance: "উপস্থিত",
//         parentSignature: false,
//         comments: "",
//       }))
//       setStudentEvaluations(initialEvaluations)
//     }
//   }, [students, singleClassReport])

//   // Initialize student evaluations when students data is loaded
//   useEffect(() => {
//     if (students.length > 0) {
//       const initialEvaluations = students.map((student: any) => ({
//         studentId: student._id,
//         lessonEvaluation: "পড়া শিখেছে",
//         handwriting: "লিখেছে",
//         attendance: "উপস্থিত",
//         parentSignature: false,
//         comments: "",
//       }))
//       setStudentEvaluations(initialEvaluations)
//     }
//   }, [students])

//   const defaultValues = useMemo(() => {
//     if (!singleClassReport?.data) return null

//     const report = singleClassReport.data

//     // Set today's lesson and home task IDs
//     if (report.todayLesson?._id) {
//       setTodayLessonId(report.todayLesson._id)
//     }

//     if (report.homeTask?._id) {
//       setHomeTaskId(report.homeTask._id)
//     }

//     // Set class filter for student loading
//     if (report.classes?._id) {
//       setFilters((prev) => ({
//         ...prev,
//         class: report.classes._id,
//       }))
//     }

//     return {
//       classes: report.classes?._id
//         ? {
//           label: report.classes.className,
//           value: report.classes._id,
//         }
//         : null,
//       subjects: report.subjects?._id
//         ? {
//           label: report.subjects.name,
//           value: report.subjects._id,
//         }
//         : null,
//       hour: report.hour || "",
//       date: report.date ? format(new Date(report.date), "yyyy-MM-dd") : "",
//       teachers: storedUser?.name || "",
//     }
//   }, [singleClassReport])

//   const handleSubmit = async (data: FieldValues) => {
//     console.log("Form data:", data)

//     // Extract class value - handle both object format and direct value
//     let classValue = null
//     if (data.classes) {
//       if (typeof data.classes === "object" && data.classes !== null) {
//         // If it's an object with value property
//         classValue = data.classes.value || null
//       } else {
//         // If it's a direct value
//         classValue = data.classes
//       }
//     }

//     // Extract subject value - handle both object format and direct value
//     let subjectValue = null
//     if (data.subjects) {
//       if (typeof data.subjects === "object" && data.subjects !== null) {
//         // If it's an object with value property
//         subjectValue = data.subjects.value || null
//       } else {
//         // If it's a direct value
//         subjectValue = data.subjects
//       }
//     }

//     try {
//       // Check if today's lesson and home task are added
//       if (!todayLessonId) {
//         toast.error("আজকের পাঠ যোগ করুন")
//         return
//       }

//       if (!homeTaskId) {
//         toast.error("বাড়ির কাজ যোগ করুন")
//         return
//       }

//       // Check if class and subject are selected
//       if (!classValue) {
//         toast.error("শ্রেণী নির্বাচন করুন")
//         return
//       }

//       if (!subjectValue) {
//         toast.error("বিষয় নির্বাচন করুন")
//         return
//       }

//       // Format data according to the Mongoose model
//       const formattedData = {
//         teachers: storedUser.userId,
//         subjects: [subjectValue],
//         classes: [classValue],
//         hour: data.hour,
//         date: data.date,
//         studentEvaluations: studentEvaluations,
//         todayLesson: todayLessonId,
//         homeTask: homeTaskId,
//       }

//       console.log("Submitting class report:", formattedData)

//       const response = await createClassReport(formattedData).unwrap()
//       console.log(response)
//       if (response.success) {
//         setSnackbarMessage("Class report saved successfully!")
//         setSnackbarSeverity("success")
//         setSnackbarOpen(true)
//         toast.success("Class report saved successfully!")
//         // Redirect to the list page after successful save
//         router.push("/dashboard/super_admin/classes/report")
//       }
//     } catch (error: any) {
//       console.error("Error saving class report:", error)
//       setSnackbarMessage(error?.data?.message || "Failed to save class report")
//       setSnackbarSeverity("error")
//       setSnackbarOpen(true)
//       toast.error(error?.data?.message || "Failed to save class report")
//     }
//   }

//   const handleMenuClose = () => {
//     setAnchorEl(null)
//   }

//   const handleDeleteClick = () => {
//     setDeleteDialogOpen(true)
//     setAnchorEl(null)
//   }

//   const handleDeleteConfirm = () => {
//     setDeleteDialogOpen(false)
//     setSelectedStudent(null)
//   }

//   const handleDeleteCancel = () => {
//     setDeleteDialogOpen(false)
//   }

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false)
//   }

//   // Update student evaluation fields
//   const handleLessonEvaluationChange = (studentId: string, value: string) => {
//     setStudentEvaluations(
//       studentEvaluations.map((evaluation) =>
//         evaluation.studentId === studentId ? { ...evaluation, lessonEvaluation: value } : evaluation,
//       ),
//     )
//   }

//   const handleHandwritingChange = (studentId: string, value: string) => {
//     setStudentEvaluations(
//       studentEvaluations.map((evaluation) =>
//         evaluation.studentId === studentId ? { ...evaluation, handwriting: value } : evaluation,
//       ),
//     )
//   }

//   const handleAttendanceChange = (studentId: string, value: string) => {
//     setStudentEvaluations(
//       studentEvaluations.map((evaluation) =>
//         evaluation.studentId === studentId ? { ...evaluation, attendance: value } : evaluation,
//       ),
//     )
//   }

//   const handleParentSignatureChange = (studentId: string, checked: boolean) => {
//     setStudentEvaluations(
//       studentEvaluations.map((evaluation) =>
//         evaluation.studentId === studentId ? { ...evaluation, parentSignature: checked } : evaluation,
//       ),
//     )
//   }

//   const handleCommentsChange = (studentId: string, value: string) => {
//     setStudentEvaluations(
//       studentEvaluations.map((evaluation) =>
//         evaluation.studentId === studentId ? { ...evaluation, comments: value } : evaluation,
//       ),
//     )
//   }

//   const sortedVehicleName = subjectName.sort((a, b) => {
//     if (a.value < b.value) return -1
//     if (a.value > b.value) return 1
//     return 0
//   })

//   const handleClassName = (event: any, newValue: any) => {
//     setSelectedBrand(newValue)

//     // Filter and sort the vehicles
//     const filtered = sortedVehicleName
//       ?.filter((vehicle: any) => vehicle.label?.toLowerCase().includes(newValue?.toLowerCase()))
//       .sort((a: any, b: any) => a.label.localeCompare(b.label))

//     setFilteredVehicles(filtered)
//   }

//   // Get evaluation for a specific student
//   const getStudentEvaluation = (studentId: string) => {
//     return (
//       studentEvaluations.find((evaluation) => evaluation.studentId === studentId) || {
//         lessonEvaluation: "পড়া শিখেছে",
//         handwriting: "লিখেছে",
//         attendance: "উপস্থিত",
//         parentSignature: false,
//         comments: "",
//       }
//     )
//   }

//   // Handle Today's Lesson dialog
//   const handleOpenTodayLessonDialog = () => {
//     setTodayLessonDialogOpen(true)
//   }

//   const handleCloseTodayLessonDialog = () => {
//     setTodayLessonDialogOpen(false)
//   }

//   const handleSaveTodayLesson = (lessonId: string) => {
//     setTodayLessonId(lessonId)
//     console.log(lessonId)
//     toast.success("আজকের পাঠ যোগ করা হয়েছে!")
//   }

//   // Handle Home Task dialog
//   const handleOpenTodayTaskDialog = () => {
//     setTodayTaskDialogOpen(true)
//   }

//   const handleCloseTodayTaskDialog = () => {
//     setTodayTaskDialogOpen(false)
//   }

//   const handleSaveTodayTask = (taskId: string) => {
//     setHomeTaskId(taskId)
//     toast.success("বাড়ির কাজ যোগ করা হয়েছে!")
//   }

//   // const defaultValues = {
//   //   description: singleClassReport?.data?.description || '',
//   //   hour: singleClassReport?.data?.hour || '',
//   //   className: singleClassReport?.data?.className || '',
//   //   date: singleClassReport?.data?.date || '',
//   //   subjects: singleClassReport?.data?.subjects || '',
//   //   classes: singleClassReport?.data?.classes || '',

//   // }

//   return (
//     <>
//       {
//         singleClassReportLoading ? (
//           <div>Loading.....</div>
//         ) : (
//           <>
//             <ThemeProvider theme={theme}>
//               <CraftForm onSubmit={handleSubmit} defaultValues={defaultValues}>
//                 <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", borderRadius: 2 }}>
//                   <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2 }}>
//                     <Fade in={true} timeout={800}>
//                       <Box>
//                         <Box
//                           sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             mb: 3,
//                             flexWrap: "wrap",
//                             gap: 2,
//                             paddingTop: 2,
//                           }}
//                         >
//                           <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
//                             + Add New Report
//                           </Typography>
//                           <Box sx={{ display: "flex", gap: 2 }}>
//                             <Button
//                               variant="contained"
//                               color="primary"
//                               startIcon={<Add />}
//                               onClick={handleOpenTodayLessonDialog}
//                               sx={{
//                                 bgcolor: todayLessonId ? "success.main" : "",
//                                 borderRadius: 2,
//                                 boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
//                               }}
//                             >
//                               {todayLessonId ? "আজকের পাঠ যোগ করা হয়েছে" : "আজকের পাঠ"}
//                             </Button>
//                             <Button
//                               variant="contained"
//                               color="primary"
//                               startIcon={<Add />}
//                               onClick={handleOpenTodayTaskDialog}
//                               sx={{
//                                 bgcolor: homeTaskId ? "success.main" : "#3792de",
//                                 borderRadius: 2,
//                                 boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
//                               }}
//                             >
//                               {homeTaskId ? "বাড়ির কাজ যোগ করা হয়েছে" : "বাড়ির কাজ"}
//                             </Button>
//                             <Button
//                               type="submit"
//                               variant="contained"
//                               color="primary"
//                               startIcon={<Save />}
//                               sx={{
//                                 bgcolor: "#4F0187",
//                                 borderRadius: 2,
//                                 boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
//                               }}
//                             >
//                               Save
//                             </Button>
//                           </Box>
//                         </Box>

//                         <Paper elevation={0} sx={{ mb: 4, overflow: "hidden" }}>
//                           <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
//                             <Grid container spacing={2} alignItems="center" gap={3}>
//                               <Grid container spacing={2}>
//                                 {/* Teacher Name */}
//                                 <Grid item xs={12} md={4}>

//                                   <CraftInputWithIcon
//                                     name="teachers"
//                                     label="শিক্ষকের নাম"
//                                     placeholder="শিক্ষকের নাম লিখুন"
//                                     defaultValue={storedUser?.name}
//                                     required
//                                     fullWidth
//                                     InputProps={{
//                                       startAdornment: <Person sx={{ color: "primary.main", mr: 1 }} />,
//                                     }}
//                                   />
//                                 </Grid>

//                                 <Grid item xs={12} md={2}>
//                                   <CraftIntAutoComplete
//                                     name="classes"
//                                     label="শ্রেণীর নাম লিখুন"
//                                     fullWidth
//                                     freeSolo
//                                     multiple={false}
//                                     // options={className.map((option) => option.label)}
//                                     options={classOption}
//                                   // options={className}
//                                   // onChange={handleClassName}
//                                   />
//                                 </Grid>
//                                 <Grid item xs={12} md={3}>
//                                   <CraftIntAutoComplete
//                                     name="subjects"
//                                     label="বিষয়ের নাম লিখুন"
//                                     fullWidth
//                                     freeSolo
//                                     multiple={false}
//                                     options={subjectOption}
//                                   // options={filteredSubjects.map((option) => option.value)}
//                                   // onInputChange={(event, newValue) => { }}
//                                   />
//                                 </Grid>
//                                 <Grid item xs={12} md={1}>
//                                   <CraftSelect name="hour" label="ঘন্টা" items={classHour} sx={{ minWidth: 100 }} />
//                                 </Grid>
//                                 {/* Date */}
//                                 <Grid item xs={12} md={2}>
//                                   <CraftDatePicker name="date" label="তারিখ" />

//                                 </Grid>
//                               </Grid>
//                             </Grid>
//                           </Box>

//                           {isLoading ? (
//                             <Box sx={{ p: 2 }}>
//                               {Array.from(new Array(5)).map((_, index) => (
//                                 <Box key={index} sx={{ display: "flex", py: 2, px: 2, alignItems: "center" }}>
//                                   <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
//                                   <Box sx={{ width: "100%" }}>
//                                     <Skeleton variant="text" width="40%" height={30} />
//                                     <Box sx={{ display: "flex", mt: 1 }}>
//                                       <Skeleton variant="text" width="20%" sx={{ mr: 2 }} />
//                                       <Skeleton variant="text" width="30%" />
//                                     </Box>
//                                   </Box>
//                                   <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
//                                 </Box>
//                               ))}
//                             </Box>
//                           ) : (
//                             <>
//                               <TableContainer>
//                                 <Table sx={{ minWidth: 650 }}>
//                                   <TableHead>
//                                     <TableRow>
//                                       <TableCell>ছাত্রের নাম</TableCell>
//                                       <TableCell>পাঠ মূল্যায়ন</TableCell>
//                                       <TableCell>হাতের লিখা</TableCell>
//                                       <TableCell>উপস্থিতি</TableCell>
//                                       <TableCell align="center">অভিভাবকের স্বাক্ষর</TableCell>
//                                       <TableCell align="center">মন্তব্য</TableCell>
//                                     </TableRow>
//                                   </TableHead>
//                                   <TableBody>
//                                     {students.length === 0 && (
//                                       <TableRow>
//                                         <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
//                                           <Box sx={{ textAlign: "center" }}>
//                                             <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
//                                             <Typography variant="h6" gutterBottom>
//                                               No students found
//                                             </Typography>
//                                             <Typography variant="body2" color="text.secondary">
//                                               Try adjusting your search or filter to find what you&apos;re looking for.
//                                             </Typography>
//                                           </Box>
//                                         </TableCell>
//                                       </TableRow>
//                                     )}

//                                     {students.length > 0 ? (
//                                       students.map((student: any) => {
//                                         const evaluation = getStudentEvaluation(student._id)
//                                         return (
//                                           <TableRow key={student._id} sx={{ transition: "all 0.2s" }}>
//                                             <TableCell component="th" scope="row">
//                                               <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                                                 {student.name}
//                                               </Typography>
//                                               <Typography variant="caption" color="text.secondary">
//                                                 {student.studentId} • {student.className} {student.section}
//                                               </Typography>
//                                             </TableCell>

//                                             <TableCell align="center">
//                                               <CraftSelect
//                                                 name={`lessonEvaluation_${student._id}`}
//                                                 items={["পড়া শিখেছে", "আংশিক শিখেছে", "পড়া শিখেনি"]}
//                                                 onChange={(e) => handleLessonEvaluationChange(student._id, e.target.value)}
//                                                 sx={{ minWidth: 160 }}
//                                               />
//                                             </TableCell>

//                                             <TableCell align="center">
//                                               <CraftSelect
//                                                 name={`handwriting_${student._id}`}
//                                                 items={["লিখেছে", "আংশিক লিখেছে", "লিখেনি"]}
//                                                 onChange={(e) => handleHandwritingChange(student._id, e.target.value)}
//                                                 sx={{ minWidth: 160 }}
//                                               />
//                                             </TableCell>
//                                             <TableCell align="center">
//                                               <CraftSelect
//                                                 name={`attendance_${student._id}`}
//                                                 items={["উপস্থিত", "অনুপস্থিত", "ছুটি"]}
//                                                 onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
//                                                 sx={{ minWidth: 160 }}
//                                               />
//                                             </TableCell>
//                                             <TableCell align="center">
//                                               <Checkbox
//                                                 color="primary"
//                                                 checked={evaluation.parentSignature}
//                                                 onChange={(e) => handleParentSignatureChange(student._id, e.target.checked)}
//                                               />
//                                             </TableCell>
//                                             <TableCell>
//                                               <CraftTextArea
//                                                 name={`comments_${student._id}`}
//                                                 label="মন্তব্য"
//                                                 placeholder="মন্তব্য"
//                                                 minRows={1}
//                                                 value={evaluation.comments}
//                                                 onChange={(e) => handleCommentsChange(student._id, e.target.value)}
//                                               />
//                                             </TableCell>
//                                           </TableRow>
//                                         )
//                                       })
//                                     ) : (
//                                       <TableRow>
//                                         <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
//                                           <Box sx={{ textAlign: "center" }}>
//                                             <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
//                                             <Typography variant="h6" gutterBottom>
//                                               No students found
//                                             </Typography>
//                                             <Typography variant="body2" color="text.secondary">
//                                               Try adjusting your search or filter to find what you&apos;re looking for.
//                                             </Typography>
//                                           </Box>
//                                         </TableCell>
//                                       </TableRow>
//                                     )}
//                                   </TableBody>
//                                 </Table>
//                               </TableContainer>
//                             </>
//                           )}
//                         </Paper>
//                       </Box>
//                     </Fade>
//                   </Container>
//                 </Box>

//                 {/* Context Menu */}
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleMenuClose}
//                   PaperProps={{
//                     elevation: 3,
//                     sx: {
//                       mt: 1,
//                       minWidth: 180,
//                       borderRadius: 2,
//                       overflow: "hidden",
//                     },
//                   }}
//                 >
//                   <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
//                     <VisibilityIcon fontSize="small" sx={{ mr: 2, color: "info.main" }} />
//                     View Details
//                   </MenuItem>
//                   <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
//                     <EditIcon fontSize="small" sx={{ mr: 2, color: "warning.main" }} />
//                     Edit
//                   </MenuItem>
//                   <Divider />
//                   <MenuItem onClick={handleDeleteClick} sx={{ py: 1.5, color: "error.main" }}>
//                     <DeleteIcon fontSize="small" sx={{ mr: 2 }} />
//                     Delete
//                   </MenuItem>
//                 </Menu>

//                 {/* Delete Confirmation Dialog */}
//                 <Dialog
//                   open={deleteDialogOpen}
//                   onClose={handleDeleteCancel}
//                   PaperProps={{
//                     sx: {
//                       borderRadius: 3,
//                       width: "100%",
//                       maxWidth: 480,
//                     },
//                   }}
//                 >
//                   <DialogTitle sx={{ pb: 1 }}>
//                     <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
//                       Delete Student
//                     </Typography>
//                   </DialogTitle>
//                   <DialogContent>
//                     <DialogContentText>
//                       Are you sure you want to delete the student &#34;{selectedStudent?.name}&#34;? This action cannot be
//                       undone.
//                     </DialogContentText>
//                   </DialogContent>
//                   <DialogActions sx={{ px: 3, pb: 3 }}>
//                     <Button
//                       onClick={handleDeleteCancel}
//                       variant="outlined"
//                       color="inherit"
//                       sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
//                     >
//                       Cancel
//                     </Button>
//                     <Button onClick={handleDeleteConfirm} variant="contained" color="error" sx={{ ml: 2 }}>
//                       Delete
//                     </Button>
//                   </DialogActions>
//                 </Dialog>

//                 {/* Snackbar for notifications */}
//                 <Snackbar
//                   open={snackbarOpen}
//                   autoHideDuration={6000}
//                   onClose={handleSnackbarClose}
//                   anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                 >
//                   <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} variant="filled" sx={{ width: "100%" }}>
//                     {snackbarMessage}
//                   </Alert>
//                 </Snackbar>
//               </CraftForm>
//             </ThemeProvider>

//             {/* Today's Lesson Dialog */}
//             <TodayLesson open={todayLessonDialogOpen} onClose={handleCloseTodayLessonDialog} onSave={handleSaveTodayLesson} />

//             {/* Home Task Dialog */}
//             <TodayTask open={todayTaskDialogOpen} onClose={handleCloseTodayTaskDialog} onSave={handleSaveTodayTask} />
//           </>
//         )
//       }
//     </>
//   )
// }
