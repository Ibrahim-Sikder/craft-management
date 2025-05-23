// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client"

// import type React from "react"
// import { useState } from "react"
// import {
//     Box,
//     Typography,
//     Paper,
//     Grid,
//     TextField,
//     Button,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Select,
//     Card,
//     CardContent,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Chip,
//     Tabs,
//     Tab,
//     Avatar,
//     Badge,
//     Alert,
//     Snackbar,
//     InputAdornment,
//     Container,

// } from "@mui/material"
// import {
//     Save as SaveIcon,
//     Print as PrintIcon,
//     Person as PersonIcon,
//     Check as CheckIcon,
//     Close as CloseIcon,
//     History as HistoryIcon,
//     HowToReg as HowToRegIcon,
//     EventBusy as EventBusyIcon,
//     EventAvailable as EventAvailableIcon,
//     Search as SearchIcon,
//     AccessTime as AccessTimeIcon,
// } from "@mui/icons-material"
// import { styled } from "@mui/material/styles"

// // Sample data for demonstration
// const departments = [
//     { id: 1, name: "Teaching" },
//     { id: 2, name: "Administration" },
//     { id: 3, name: "Support Staff" },
//     { id: 4, name: "Management" },
// ]

// const staffMembers = [
//     {
//         id: 1,
//         name: "Dr. Amir Khan",
//         employeeId: "EMP-001",
//         department: "Teaching",
//         designation: "Senior Teacher",
//         gender: "Male",
//         image: "/placeholder.svg",
//         contactNumber: "+1234567890",
//         email: "amir.khan@school.edu",
//     },
//     {
//         id: 2,
//         name: "Ms. Fatima Ali",
//         employeeId: "EMP-002",
//         department: "Teaching",
//         designation: "Junior Teacher",
//         gender: "Female",
//         image: "/placeholder.svg",
//         contactNumber: "+1234567891",
//         email: "fatima.ali@school.edu",
//     },
//     {
//         id: 3,
//         name: "Mr. Hassan Ahmed",
//         employeeId: "EMP-003",
//         department: "Administration",
//         designation: "Office Assistant",
//         gender: "Male",
//         image: "/placeholder.svg",
//         contactNumber: "+1234567892",
//         email: "hassan.ahmed@school.edu",
//     },
//     {
//         id: 4,
//         name: "Mrs. Zainab Malik",
//         employeeId: "EMP-004",
//         department: "Teaching",
//         designation: "Senior Teacher",
//         gender: "Female",
//         image: "/placeholder.svg",
//         contactNumber: "+1234567893",
//         email: "zainab.malik@school.edu",
//     },
//     {
//         id: 5,
//         name: "Mr. Imran Qureshi",
//         employeeId: "EMP-005",
//         department: "Support Staff",
//         designation: "IT Technician",
//         gender: "Male",
//         image: "/placeholder.svg",
//         contactNumber: "+1234567894",
//         email: "imran.qureshi@school.edu",
//     },
//     {
//         id: 6,
//         name: "Ms. Ayesha Siddiqui",
//         employeeId: "EMP-006",
//         department: "Management",
//         designation: "Vice Principal",
//         gender: "Female",
//         image: "/placeholder.svg",
//         contactNumber: "+1234567895",
//         email: "ayesha.siddiqui@school.edu",
//     },
// ]

// // Styled components
// const StyledPaper = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(3),
//     borderRadius: 12,
//     boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//     height: "100%",
// }))

// const GradientButton = styled(Button)(({ theme }) => ({
//     background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
//     color: "white",
//     boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
// }))

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "&:nth-of-type(odd)": {
//         backgroundColor: theme.palette.action.hover,
//     },
//     "&:hover": {
//         backgroundColor: theme.palette.action.selected,
//     },
// }))

// const AttendanceStatusChip = styled(Chip)(({ theme, status }: { theme?: any; status: string }) => ({
//     fontWeight: "bold",
//     backgroundColor:
//         status === "Present"
//             ? "#E3F2FD"
//             : status === "Absent"
//                 ? "#FFEBEE"
//                 : status === "Late"
//                     ? "#FFF8E1"
//                     : status === "Leave"
//                         ? "#E8F5E9"
//                         : "#F5F5F5",
//     color:
//         status === "Present"
//             ? "#1565C0"
//             : status === "Absent"
//                 ? "#C62828"
//                 : status === "Late"
//                     ? "#F57F17"
//                     : status === "Leave"
//                         ? "#2E7D32"
//                         : "#757575",
// }))

// // Custom styled date input to match MUI design
// const StyledDateInput = styled(TextField)(({ theme }) => ({
//     "& input[type=date]::-webkit-calendar-picker-indicator": {
//         cursor: "pointer",
//     }
// }))

// const formatDateForInput = (date: any) => {
//     if (!date) return "";
//     const d = new Date(date);
//     return d.toISOString().split('T')[0];
// }

// const StaffAttendancePage = () => {
//     const [selectedDate, setSelectedDate] = useState(formatDateForInput(new Date()))
//     const [selectedDepartment, setSelectedDepartment] = useState("")
//     const [searchTerm, setSearchTerm] = useState("")
//     const [attendanceData, setAttendanceData] = useState<{
//         [key: number]: { status: string; checkIn?: string; checkOut?: string }
//     }>(
//         // Initialize with all staff present
//         staffMembers.reduce(
//             (acc, staff) => {
//                 acc[staff.id] = {
//                     status: "Present",
//                     checkIn: "08:30 AM",
//                     checkOut: "04:30 PM",
//                 }
//                 return acc
//             },
//             {} as { [key: number]: { status: string; checkIn?: string; checkOut?: string } },
//         ),
//     )
//     const [snackbarOpen, setSnackbarOpen] = useState(false)
//     const [tabValue, setTabValue] = useState(0)

//     const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//         setTabValue(newValue)
//     }

//     const handleAttendanceChange = (staffId: number, field: string, value: string) => {
//         setAttendanceData({
//             ...attendanceData,
//             [staffId]: {
//                 ...attendanceData[staffId],
//                 [field]: value,
//             },
//         })
//     }

//     const handleSaveAttendance = () => {
//         // Here you would save the attendance data to your backend
//         console.log({
//             date: selectedDate,
//             department: selectedDepartment,
//             attendance: attendanceData,
//         })
//         setSnackbarOpen(true)
//     }

//     const handleMarkAllPresent = () => {
//         const newAttendanceData = { ...attendanceData }
//         staffMembers.forEach((staff) => {
//             newAttendanceData[staff.id] = {
//                 ...newAttendanceData[staff.id],
//                 status: "Present",
//             }
//         })
//         setAttendanceData(newAttendanceData)
//     }

//     const handleMarkAllAbsent = () => {
//         const newAttendanceData = { ...attendanceData }
//         staffMembers.forEach((staff) => {
//             newAttendanceData[staff.id] = {
//                 ...newAttendanceData[staff.id],
//                 status: "Absent",
//             }
//         })
//         setAttendanceData(newAttendanceData)
//     }

//     // Filter staff based on department and search term
//     const filteredStaff = staffMembers.filter((staff) => {
//         if (selectedDepartment && staff.department !== selectedDepartment) return false
//         if (
//             searchTerm &&
//             !staff.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//             !staff.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//             return false

//         if (tabValue === 1 && attendanceData[staff.id]?.status !== "Present") return false
//         if (tabValue === 2 && attendanceData[staff.id]?.status !== "Absent") return false
//         if (tabValue === 3 && attendanceData[staff.id]?.status !== "Late" && attendanceData[staff.id]?.status !== "Leave")
//             return false

//         return true
//     })

//     // Calculate attendance statistics
//     const presentCount = Object.values(attendanceData).filter((data) => data.status === "Present").length
//     const absentCount = Object.values(attendanceData).filter((data) => data.status === "Absent").length
//     const lateCount = Object.values(attendanceData).filter((data) => data.status === "Late").length
//     const leaveCount = Object.values(attendanceData).filter((data) => data.status === "Leave").length
//     const totalStaff = staffMembers.length
//     const attendancePercentage = (presentCount / totalStaff) * 100

//     return (
//         <Container maxWidth='xl'>
//             <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
//                     <HowToRegIcon sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
//                     <Typography variant="h4" component="h1" fontWeight="bold">
//                         Staff Attendance
//                     </Typography>
//                 </Box>

//                 <Grid container spacing={3} sx={{ mb: 4 }}>
//                     <Grid item xs={12} md={3}>
//                         <StyledPaper>
//                             <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                                 <EventAvailableIcon sx={{ color: "primary.main", mr: 1 }} />
//                                 <Typography variant="h6">Present</Typography>
//                             </Box>
//                             <Box sx={{ display: "flex", alignItems: "baseline" }}>
//                                 <Typography variant="h3" sx={{ color: "primary.main", fontWeight: "bold" }}>
//                                     {presentCount}
//                                 </Typography>
//                                 <Typography variant="body1" sx={{ ml: 1 }}>
//                                     / {totalStaff}
//                                 </Typography>
//                             </Box>
//                             <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                                 {attendancePercentage.toFixed(1)}% Attendance Rate
//                             </Typography>
//                         </StyledPaper>
//                     </Grid>
//                     <Grid item xs={12} md={3}>
//                         <StyledPaper>
//                             <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                                 <EventBusyIcon sx={{ color: "error.main", mr: 1 }} />
//                                 <Typography variant="h6">Absent</Typography>
//                             </Box>
//                             <Box sx={{ display: "flex", alignItems: "baseline" }}>
//                                 <Typography variant="h3" sx={{ color: "error.main", fontWeight: "bold" }}>
//                                     {absentCount}
//                                 </Typography>
//                                 <Typography variant="body1" sx={{ ml: 1 }}>
//                                     / {totalStaff}
//                                 </Typography>
//                             </Box>
//                             <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                                 {((absentCount / totalStaff) * 100).toFixed(1)}% Absence Rate
//                             </Typography>
//                         </StyledPaper>
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                         <StyledPaper>
//                             <Typography variant="h6" sx={{ mb: 2 }}>
//                                 Attendance Summary
//                             </Typography>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={6}>
//                                     <Card sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
//                                         <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
//                                             <Typography variant="body2" color="textSecondary">
//                                                 Late
//                                             </Typography>
//                                             <Typography variant="h6" sx={{ color: "warning.main", fontWeight: "medium" }}>
//                                                 {lateCount} Staff
//                                             </Typography>
//                                         </CardContent>
//                                     </Card>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Card sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
//                                         <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
//                                             <Typography variant="body2" color="textSecondary">
//                                                 On Leave
//                                             </Typography>
//                                             <Typography variant="h6" sx={{ color: "success.main", fontWeight: "medium" }}>
//                                                 {leaveCount} Staff
//                                             </Typography>
//                                         </CardContent>
//                                     </Card>
//                                 </Grid>
//                             </Grid>
//                         </StyledPaper>
//                     </Grid>
//                 </Grid>

//                 <StyledPaper>
//                     <Grid container spacing={3} sx={{ mb: 3 }}>
//                         <Grid item xs={12} md={3}>
//                             <StyledDateInput
//                                 fullWidth
//                                 label="Select Date"
//                                 type="date"
//                                 value={selectedDate}
//                                 onChange={(e) => setSelectedDate(e.target.value)}
//                                 InputLabelProps={{ shrink: true }}
//                                 variant="outlined"
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={3}>
//                             <FormControl fullWidth variant="outlined">
//                                 <InputLabel>Department</InputLabel>
//                                 <Select
//                                     value={selectedDepartment}
//                                     onChange={(e) => setSelectedDepartment(e.target.value as string)}
//                                     label="Department"
//                                 >
//                                     <MenuItem value="">All Departments</MenuItem>
//                                     {departments.map((dept) => (
//                                         <MenuItem key={dept.id} value={dept.name}>
//                                             {dept.name}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={12} md={3}>
//                             <TextField
//                                 fullWidth
//                                 variant="outlined"
//                                 placeholder="Search by name or ID"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <SearchIcon />
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={3}>
//                             <Box sx={{ display: "flex", gap: 2 }}>
//                                 <Button
//                                     variant="outlined"
//                                     color="primary"
//                                     fullWidth
//                                     startIcon={<CheckIcon />}
//                                     onClick={handleMarkAllPresent}
//                                 >
//                                     Mark All Present
//                                 </Button>
//                                 <Button
//                                     variant="outlined"
//                                     color="error"
//                                     fullWidth
//                                     startIcon={<CloseIcon />}
//                                     onClick={handleMarkAllAbsent}
//                                 >
//                                     Mark All Absent
//                                 </Button>
//                             </Box>
//                         </Grid>
//                     </Grid>

//                     <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
//                         <Tabs value={tabValue} onChange={handleTabChange} aria-label="attendance tabs">
//                             <Tab
//                                 label={
//                                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                                         <Badge badgeContent={totalStaff} color="primary" sx={{ mr: 1 }}>
//                                             <PersonIcon />
//                                         </Badge>
//                                         All
//                                     </Box>
//                                 }
//                             />
//                             <Tab
//                                 label={
//                                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                                         <Badge badgeContent={presentCount} color="primary" sx={{ mr: 1 }}>
//                                             <CheckIcon />
//                                         </Badge>
//                                         Present
//                                     </Box>
//                                 }
//                             />
//                             <Tab
//                                 label={
//                                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                                         <Badge badgeContent={absentCount} color="error" sx={{ mr: 1 }}>
//                                             <CloseIcon />
//                                         </Badge>
//                                         Absent
//                                     </Box>
//                                 }
//                             />
//                             <Tab
//                                 label={
//                                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                                         <Badge badgeContent={lateCount + leaveCount} color="warning" sx={{ mr: 1 }}>
//                                             <HistoryIcon />
//                                         </Badge>
//                                         Others
//                                     </Box>
//                                 }
//                             />
//                         </Tabs>
//                     </Box>

//                     <TableContainer component={Paper} sx={{ boxShadow: "none", mb: 3 }}>
//                         <Table>
//                             <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                                 <TableRow>
//                                     <TableCell>Staff Member</TableCell>
//                                     <TableCell align="center">Employee ID</TableCell>
//                                     <TableCell align="center">Department</TableCell>
//                                     <TableCell align="center">Designation</TableCell>
//                                     <TableCell align="center">Status</TableCell>
//                                     <TableCell align="center">Check In</TableCell>
//                                     <TableCell align="center">Check Out</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {filteredStaff.map((staff) => (
//                                     <StyledTableRow key={staff.id}>
//                                         <TableCell>
//                                             <Box sx={{ display: "flex", alignItems: "center" }}>
//                                                 <Avatar src={staff.image} sx={{ mr: 2 }} />
//                                                 <Box>
//                                                     <Typography variant="body1">{staff.name}</Typography>
//                                                     <Typography variant="body2" color="textSecondary">
//                                                         {staff.email}
//                                                     </Typography>
//                                                 </Box>
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell align="center">{staff.employeeId}</TableCell>
//                                         <TableCell align="center">
//                                             <Chip
//                                                 label={staff.department}
//                                                 size="small"
//                                                 color={
//                                                     staff.department === "Teaching"
//                                                         ? "primary"
//                                                         : staff.department === "Administration"
//                                                             ? "secondary"
//                                                             : staff.department === "Management"
//                                                                 ? "success"
//                                                                 : "default"
//                                                 }
//                                             />
//                                         </TableCell>
//                                         <TableCell align="center">{staff.designation}</TableCell>
//                                         <TableCell align="center">
//                                             <FormControl fullWidth>
//                                                 <Select
//                                                     value={attendanceData[staff.id]?.status || "Present"}
//                                                     onChange={(e) => handleAttendanceChange(staff.id, "status", e.target.value)}
//                                                     variant="outlined"
//                                                     size="small"
//                                                     sx={{ minWidth: 120 }}
//                                                     renderValue={(value) => (
//                                                         <AttendanceStatusChip label={value} status={value as string} size="small" />
//                                                     )}
//                                                 >
//                                                     <MenuItem value="Present">Present</MenuItem>
//                                                     <MenuItem value="Absent">Absent</MenuItem>
//                                                     <MenuItem value="Late">Late</MenuItem>
//                                                     <MenuItem value="Leave">Leave</MenuItem>
//                                                 </Select>
//                                             </FormControl>
//                                         </TableCell>
//                                         <TableCell align="center">
//                                             <TextField
//                                                 value={attendanceData[staff.id]?.checkIn || ""}
//                                                 onChange={(e) => handleAttendanceChange(staff.id, "checkIn", e.target.value)}
//                                                 variant="outlined"
//                                                 size="small"
//                                                 disabled={attendanceData[staff.id]?.status === "Absent"}
//                                                 InputProps={{
//                                                     startAdornment: (
//                                                         <InputAdornment position="start">
//                                                             <AccessTimeIcon fontSize="small" />
//                                                         </InputAdornment>
//                                                     ),
//                                                 }}
//                                                 sx={{ width: 140 }}
//                                             />
//                                         </TableCell>
//                                         <TableCell align="center">
//                                             <TextField
//                                                 value={attendanceData[staff.id]?.checkOut || ""}
//                                                 onChange={(e) => handleAttendanceChange(staff.id, "checkOut", e.target.value)}
//                                                 variant="outlined"
//                                                 size="small"
//                                                 disabled={attendanceData[staff.id]?.status === "Absent"}
//                                                 InputProps={{
//                                                     startAdornment: (
//                                                         <InputAdornment position="start">
//                                                             <AccessTimeIcon fontSize="small" />
//                                                         </InputAdornment>
//                                                     ),
//                                                 }}
//                                                 sx={{ width: 140 }}
//                                             />
//                                         </TableCell>
//                                     </StyledTableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>

//                     {filteredStaff.length === 0 && (
//                         <Box sx={{ textAlign: "center", py: 4 }}>
//                             <Typography variant="h6" color="textSecondary">
//                                 No staff members found
//                             </Typography>
//                             <Typography variant="body2" color="textSecondary">
//                                 Try changing your filter criteria
//                             </Typography>
//                         </Box>
//                     )}

//                     <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//                         <Button variant="outlined" startIcon={<PrintIcon />}>
//                             Print Attendance
//                         </Button>
//                         <GradientButton startIcon={<SaveIcon />} onClick={handleSaveAttendance}>
//                             Save Attendance
//                         </GradientButton>
//                     </Box>
//                 </StyledPaper>

//                 <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
//                     <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
//                         Staff attendance saved successfully!
//                     </Alert>
//                 </Snackbar>
//             </Box>
//         </Container>
//     )
// }

// export default StaffAttendancePage

import React from 'react';

const page = () => {
    return (
        <div>
    student 
        </div>
    );
};

export default page;