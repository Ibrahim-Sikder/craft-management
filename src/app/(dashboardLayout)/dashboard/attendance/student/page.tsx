// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client"

// import type React from "react"
// import { useState } from "react"
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   Button,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Card,
//   CardContent,
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
//   Avatar,
//   Tooltip,
//   Badge,
//   Alert,
//   Snackbar,
//   TextField,
//   Container,
// } from "@mui/material"
// import {
//   Save as SaveIcon,
//   Print as PrintIcon,
//   Person as PersonIcon,
//   Check as CheckIcon,
//   Close as CloseIcon,
//   Edit as EditIcon,
//   History as HistoryIcon,
//   HowToReg as HowToRegIcon,
//   EventBusy as EventBusyIcon,
//   EventAvailable as EventAvailableIcon,
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

// const students = [
//   { id: 1, name: "Ahmed Ali", rollNumber: "001", class: "One", gender: "Male", image: "/placeholder.svg" },
//   { id: 2, name: "Sara Khan", rollNumber: "002", class: "One", gender: "Female", image: "/placeholder.svg" },
//   { id: 3, name: "Zain Ahmed", rollNumber: "003", class: "One", gender: "Male", image: "/placeholder.svg" },
//   { id: 4, name: "Fatima Zahra", rollNumber: "004", class: "One", gender: "Female", image: "/placeholder.svg" },
//   { id: 5, name: "Ibrahim Hassan", rollNumber: "005", class: "One", gender: "Male", image: "/placeholder.svg" },
//   { id: 6, name: "Aisha Malik", rollNumber: "006", class: "One", gender: "Female", image: "/placeholder.svg" },
//   { id: 7, name: "Omar Farooq", rollNumber: "007", class: "One", gender: "Male", image: "/placeholder.svg" },
//   { id: 8, name: "Maryam Nawaz", rollNumber: "008", class: "One", gender: "Female", image: "/placeholder.svg" },
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

// const AttendanceStatusChip = styled(Chip)(({ status }: { status: string }) => ({
//   fontWeight: "bold",
//   backgroundColor:
//     status === "Present"
//       ? "#E3F2FD"
//       : status === "Absent"
//         ? "#FFEBEE"
//         : status === "Late"
//           ? "#FFF8E1"
//           : status === "Leave"
//             ? "#E8F5E9"
//             : "#F5F5F5",
//   color:
//     status === "Present"
//       ? "#1565C0"
//       : status === "Absent"
//         ? "#C62828"
//         : status === "Late"
//           ? "#F57F17"
//           : status === "Leave"
//             ? "#2E7D32"
//             : "#757575",
// }))

// // Custom styled date input to match MUI design
// const StyledDateInput = styled(TextField)(({ theme }) => ({
//   "& input[type=date]::-webkit-calendar-picker-indicator": {
//     cursor: "pointer",
//   }
// }))

// const formatDateForInput = (date: any) => {
//   if (!date) return "";
//   const d = new Date(date);
//   return d.toISOString().split('T')[0];
// }

// const StudentAttendancePage = () => {
//   const [selectedDate, setSelectedDate] = useState(formatDateForInput(new Date()))
//   const [selectedClass, setSelectedClass] = useState("One")
//   const [attendanceData, setAttendanceData] = useState<{ [key: number]: string }>(
//     // Initialize with all students present
//     students.reduce(
//       (acc, student) => {
//         acc[student.id] = "Present"
//         return acc
//       },
//       {} as { [key: number]: string },
//     ),
//   )
//   const [snackbarOpen, setSnackbarOpen] = useState(false)
//   const [tabValue, setTabValue] = useState(0)

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue)
//   }

//   const handleAttendanceChange = (studentId: number, status: string) => {
//     setAttendanceData({
//       ...attendanceData,
//       [studentId]: status,
//     })
//   }

//   const handleSaveAttendance = () => {
//     // Here you would save the attendance data to your backend
//     console.log({
//       date: selectedDate,
//       class: selectedClass,
//       attendance: attendanceData,
//     })
//     setSnackbarOpen(true)
//   }

//   const handleMarkAllPresent = () => {
//     const newAttendanceData = { ...attendanceData }
//     students.forEach((student) => {
//       newAttendanceData[student.id] = "Present"
//     })
//     setAttendanceData(newAttendanceData)
//   }

//   const handleMarkAllAbsent = () => {
//     const newAttendanceData = { ...attendanceData }
//     students.forEach((student) => {
//       newAttendanceData[student.id] = "Absent"
//     })
//     setAttendanceData(newAttendanceData)
//   }

//   // Calculate attendance statistics
//   const presentCount = Object.values(attendanceData).filter((status) => status === "Present").length
//   const absentCount = Object.values(attendanceData).filter((status) => status === "Absent").length
//   const lateCount = Object.values(attendanceData).filter((status) => status === "Late").length
//   const leaveCount = Object.values(attendanceData).filter((status) => status === "Leave").length
//   const totalStudents = students.length
//   const attendancePercentage = (presentCount / totalStudents) * 100

//   // Filter students based on tab
//   const filteredStudents = students.filter((student) => {
//     if (tabValue === 0) return true // All students
//     if (tabValue === 1) return attendanceData[student.id] === "Present" // Present
//     if (tabValue === 2) return attendanceData[student.id] === "Absent" // Absent
//     if (tabValue === 3) return attendanceData[student.id] === "Late" || attendanceData[student.id] === "Leave" // Others
//     return true
//   })

//   return (
//     <Container maxWidth='xl'>
//       <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
//           <HowToRegIcon sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
//           <Typography variant="h4" component="h1" fontWeight="bold">
//             Student Attendance
//           </Typography>
//         </Box>

//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} md={3}>
//             <StyledPaper>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                 <EventAvailableIcon sx={{ color: "primary.main", mr: 1 }} />
//                 <Typography variant="h6">Present</Typography>
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "baseline" }}>
//                 <Typography variant="h3" sx={{ color: "primary.main", fontWeight: "bold" }}>
//                   {presentCount}
//                 </Typography>
//                 <Typography variant="body1" sx={{ ml: 1 }}>
//                   / {totalStudents}
//                 </Typography>
//               </Box>
//               <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                 {attendancePercentage.toFixed(1)}% Attendance Rate
//               </Typography>
//             </StyledPaper>
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <StyledPaper>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                 <EventBusyIcon sx={{ color: "error.main", mr: 1 }} />
//                 <Typography variant="h6">Absent</Typography>
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "baseline" }}>
//                 <Typography variant="h3" sx={{ color: "error.main", fontWeight: "bold" }}>
//                   {absentCount}
//                 </Typography>
//                 <Typography variant="body1" sx={{ ml: 1 }}>
//                   / {totalStudents}
//                 </Typography>
//               </Box>
//               <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                 {((absentCount / totalStudents) * 100).toFixed(1)}% Absence Rate
//               </Typography>
//             </StyledPaper>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <StyledPaper>
//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 Attendance Summary
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <Card sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
//                     <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
//                       <Typography variant="body2" color="textSecondary">
//                         Late
//                       </Typography>
//                       <Typography variant="h6" sx={{ color: "warning.main", fontWeight: "medium" }}>
//                         {lateCount} Students
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Card sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
//                     <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
//                       <Typography variant="body2" color="textSecondary">
//                         On Leave
//                       </Typography>
//                       <Typography variant="h6" sx={{ color: "success.main", fontWeight: "medium" }}>
//                         {leaveCount} Students
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               </Grid>
//             </StyledPaper>
//           </Grid>
//         </Grid>

//         <StyledPaper>
//           <Grid container spacing={3} sx={{ mb: 3 }}>
//             <Grid item xs={12} md={4}>
//               <StyledDateInput
//                 fullWidth
//                 label="Select Date"
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Class</InputLabel>
//                 <Select
//                   value={selectedClass}
//                   onChange={(e) => setSelectedClass(e.target.value as string)}
//                   label="Class"
//                 >
//                   {classes.map((cls) => (
//                     <MenuItem key={cls.id} value={cls.name}>
//                       {cls.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   fullWidth
//                   startIcon={<CheckIcon />}
//                   onClick={handleMarkAllPresent}
//                 >
//                   Mark All Present
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   fullWidth
//                   startIcon={<CloseIcon />}
//                   onClick={handleMarkAllAbsent}
//                 >
//                   Mark All Absent
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>

//           <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
//             <Tabs value={tabValue} onChange={handleTabChange} aria-label="attendance tabs">
//               <Tab
//                 label={
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Badge badgeContent={totalStudents} color="primary" sx={{ mr: 1 }}>
//                       <PersonIcon />
//                     </Badge>
//                     All
//                   </Box>
//                 }
//               />
//               <Tab
//                 label={
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Badge badgeContent={presentCount} color="primary" sx={{ mr: 1 }}>
//                       <CheckIcon />
//                     </Badge>
//                     Present
//                   </Box>
//                 }
//               />
//               <Tab
//                 label={
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Badge badgeContent={absentCount} color="error" sx={{ mr: 1 }}>
//                       <CloseIcon />
//                     </Badge>
//                     Absent
//                   </Box>
//                 }
//               />
//               <Tab
//                 label={
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Badge badgeContent={lateCount + leaveCount} color="warning" sx={{ mr: 1 }}>
//                       <HistoryIcon />
//                     </Badge>
//                     Others
//                   </Box>
//                 }
//               />
//             </Tabs>
//           </Box>

//           <TableContainer component={Paper} sx={{ boxShadow: "none", mb: 3 }}>
//             <Table>
//               <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                 <TableRow>
//                   <TableCell>Student</TableCell>
//                   <TableCell align="center">Roll Number</TableCell>
//                   <TableCell align="center">Gender</TableCell>
//                   <TableCell align="center">Status</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredStudents.map((student) => (
//                   <StyledTableRow key={student.id}>
//                     <TableCell>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <Avatar src={student.image} sx={{ mr: 2 }} />
//                         <Typography variant="body1">{student.name}</Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell align="center">{student.rollNumber}</TableCell>
//                     <TableCell align="center">{student.gender}</TableCell>
//                     <TableCell align="center">
//                       <FormControl fullWidth>
//                         <Select
//                           value={attendanceData[student.id] || "Present"}
//                           onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
//                           variant="outlined"
//                           size="small"
//                           sx={{ minWidth: 120 }}
//                           renderValue={(value) => (
//                             <AttendanceStatusChip label={value} status={value as string} size="small" />
//                           )}
//                         >
//                           <MenuItem value="Present">Present</MenuItem>
//                           <MenuItem value="Absent">Absent</MenuItem>
//                           <MenuItem value="Late">Late</MenuItem>
//                           <MenuItem value="Leave">Leave</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </TableCell>
//                     <TableCell align="center">
//                       <Box sx={{ display: "flex", justifyContent: "center" }}>
//                         <Tooltip title="View History">
//                           <IconButton size="small" color="primary">
//                             <HistoryIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Edit Student">
//                           <IconButton size="small" color="secondary">
//                             <EditIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                       </Box>
//                     </TableCell>
//                   </StyledTableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {filteredStudents.length === 0 && (
//             <Box sx={{ textAlign: "center", py: 4 }}>
//               <Typography variant="h6" color="textSecondary">
//                 No students found
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 Try changing your filter criteria
//               </Typography>
//             </Box>
//           )}

//           <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//             <Button variant="outlined" startIcon={<PrintIcon />}>
//               Print Attendance
//             </Button>
//             <GradientButton startIcon={<SaveIcon />} onClick={handleSaveAttendance}>
//               Save Attendance
//             </GradientButton>
//           </Box>
//         </StyledPaper>

//         <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
//           <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
//             Attendance saved successfully!
//           </Alert>
//         </Snackbar>
//       </Box>
//     </Container>
//   )
// }

// export default StudentAttendancePage

import React from "react";

const page = () => {
  return (
    <div>
      <h4>student attendance </h4>
    </div>
  );
};

export default page;
