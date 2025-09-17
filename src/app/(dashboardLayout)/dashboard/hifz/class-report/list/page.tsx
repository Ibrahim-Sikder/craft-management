import React from 'react'

const page = () => {
  return (
    <div>
      page
    </div>
  )
}

export default page



// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import type React from "react"
// import { useState } from "react"
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Paper,
//   IconButton,
//   Chip,
//   TextField,
//   InputAdornment,
//   Grid,
//   Avatar,
//   Tooltip,
// } from "@mui/material"
// import {
//   Add as AddIcon,
//   Visibility as ViewIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Search as SearchIcon,
//   Download as DownloadIcon,
//   Print as PrintIcon,
// } from "@mui/icons-material"

// interface ReportData {
//   id: string
//   studentInfo: {
//     studentName: string
//     studentId: string
//     class: string
//     date: string
//     day: string
//   }
//   createdAt: string
//   status: "completed" | "pending" | "reviewed"
// }

// interface HifzReportListProps {
//   onAddNew: () => void
//   onViewReport: (id: string) => void
// }

// const HifzReportList: React.FC<HifzReportListProps> = ({ onAddNew, onViewReport }) => {
//   const [searchTerm, setSearchTerm] = useState("")

//   // Sample data - in real app this would come from API/database
//   const [reports] = useState<ReportData[]>([
//     {
//       id: "1",
//       studentInfo: {
//         studentName: "মোহাম্মদ আব্দুল্লাহ",
//         studentId: "HF001",
//         class: "হিফয-১",
//         date: "2024-01-15",
//         day: "সোমবার",
//       },
//       createdAt: "2024-01-15T10:30:00Z",
//       status: "completed",
//     },
//     {
//       id: "2",
//       studentInfo: {
//         studentName: "ফাতিমা খাতুন",
//         studentId: "HF002",
//         class: "হিফয-২",
//         date: "2024-01-15",
//         day: "সোমবার",
//       },
//       createdAt: "2024-01-15T11:15:00Z",
//       status: "reviewed",
//     },
//     {
//       id: "3",
//       studentInfo: {
//         studentName: "মুহাম্মদ ইব্রাহিম",
//         studentId: "HF003",
//         class: "নূরানী-৩",
//         date: "2024-01-16",
//         day: "মঙ্গলবার",
//       },
//       createdAt: "2024-01-16T09:45:00Z",
//       status: "pending",
//     },
//     {
//       id: "4",
//       studentInfo: {
//         studentName: "আয়েশা সিদ্দিকা",
//         studentId: "HF004",
//         class: "নাযেরা-১",
//         date: "2024-01-16",
//         day: "মঙ্গলবার",
//       },
//       createdAt: "2024-01-16T14:20:00Z",
//       status: "completed",
//     },
//   ])

//   const filteredReports = reports.filter(
//     (report) =>
//       report.studentInfo.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       report.studentInfo.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       report.studentInfo.class.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "success"
//       case "reviewed":
//         return "primary"
//       case "pending":
//         return "warning"
//       default:
//         return "default"
//     }
//   }

//   const getStatusText = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "সম্পন্ন"
//       case "reviewed":
//         return "পর্যালোচিত"
//       case "pending":
//         return "অপেক্ষমাণ"
//       default:
//         return status
//     }
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("bn-BD", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })
//   }

//   return (
//     <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
//       {/* Header */}
//       <Card sx={{ mb: 3, background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)", color: "white" }}>
//         <CardContent sx={{ textAlign: "center", py: 3 }}>
//           <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
//             ক্রাফট ইন্টারন্যাশনাল ইনস্টিটিউট
//           </Typography>
//           <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
//             হিফয শিক্ষার্থীদের রিপোর্ট তালিকা
//           </Typography>
//           <Chip label={`মোট রিপোর্ট: ${reports.length}`} sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }} />
//         </CardContent>
//       </Card>

//       {/* Controls */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Grid container spacing={3} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 placeholder="শিক্ষার্থীর নাম, আইডি বা ক্লাস দিয়ে খুঁজুন..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} md={6} sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//               <Button variant="contained" startIcon={<AddIcon />} onClick={onAddNew} size="large" sx={{ px: 3 }}>
//                 নতুন রিপোর্ট
//               </Button>
//               <Button variant="outlined" startIcon={<DownloadIcon />} size="large">
//                 এক্সপোর্ট
//               </Button>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Statistics Cards */}
//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         <Grid item xs={12} md={3}>
//           <Card sx={{ bgcolor: "#e8f5e8", border: "1px solid #4caf50" }}>
//             <CardContent sx={{ textAlign: "center" }}>
//               <Typography variant="h4" sx={{ color: "#2e7d32", fontWeight: "bold" }}>
//                 {reports.filter((r) => r.status === "completed").length}
//               </Typography>
//               <Typography variant="body2" sx={{ color: "#2e7d32" }}>
//                 সম্পন্ন রিপোর্ট
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card sx={{ bgcolor: "#e3f2fd", border: "1px solid #2196f3" }}>
//             <CardContent sx={{ textAlign: "center" }}>
//               <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: "bold" }}>
//                 {reports.filter((r) => r.status === "reviewed").length}
//               </Typography>
//               <Typography variant="body2" sx={{ color: "#1976d2" }}>
//                 পর্যালোচিত রিপোর্ট
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card sx={{ bgcolor: "#fff3e0", border: "1px solid #ff9800" }}>
//             <CardContent sx={{ textAlign: "center" }}>
//               <Typography variant="h4" sx={{ color: "#f57c00", fontWeight: "bold" }}>
//                 {reports.filter((r) => r.status === "pending").length}
//               </Typography>
//               <Typography variant="body2" sx={{ color: "#f57c00" }}>
//                 অপেক্ষমাণ রিপোর্ট
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card sx={{ bgcolor: "#f3e5f5", border: "1px solid #9c27b0" }}>
//             <CardContent sx={{ textAlign: "center" }}>
//               <Typography variant="h4" sx={{ color: "#7b1fa2", fontWeight: "bold" }}>
//                 {reports.length}
//               </Typography>
//               <Typography variant="body2" sx={{ color: "#7b1fa2" }}>
//                 মোট রিপোর্ট
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Reports Table */}
//       <Card>
//         <CardContent>
//           <Typography variant="h6" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>
//             রিপোর্ট তালিকা ({filteredReports.length})
//           </Typography>

//           <TableContainer component={Paper} sx={{ border: "1px solid #e0e0e0" }}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: "#f5f5f5" }}>
//                   <TableCell sx={{ fontWeight: "bold" }}>শিক্ষার্থী</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>আইডি</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>ক্লাস</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>তারিখ</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>বার</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>স্ট্যাটাস</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>তৈরি হয়েছে</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>অ্যাকশন</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredReports.map((report) => (
//                   <TableRow key={report.id} hover>
//                     <TableCell>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                         <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
//                           {report.studentInfo.studentName.charAt(0)}
//                         </Avatar>
//                         <Typography variant="body2" sx={{ fontWeight: "medium" }}>
//                           {report.studentInfo.studentName}
//                         </Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Chip label={report.studentInfo.studentId} size="small" variant="outlined" color="primary" />
//                     </TableCell>
//                     <TableCell>{report.studentInfo.class}</TableCell>
//                     <TableCell>{formatDate(report.studentInfo.date)}</TableCell>
//                     <TableCell>{report.studentInfo.day}</TableCell>
//                     <TableCell>
//                       <Chip
//                         label={getStatusText(report.status)}
//                         color={getStatusColor(report.status) as any}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>{formatDate(report.createdAt)}</TableCell>
//                     <TableCell>
//                       <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
//                         <Tooltip title="দেখুন">
//                           <IconButton size="small" color="primary" onClick={() => onViewReport(report.id)}>
//                             <ViewIcon />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="সম্পাদনা">
//                           <IconButton size="small" color="secondary">
//                             <EditIcon />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="প্রিন্ট">
//                           <IconButton size="small" color="info">
//                             <PrintIcon />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="মুছুন">
//                           <IconButton size="small" color="error">
//                             <DeleteIcon />
//                           </IconButton>
//                         </Tooltip>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {filteredReports.length === 0 && (
//             <Box sx={{ textAlign: "center", py: 4 }}>
//               <Typography variant="h6" color="text.secondary">
//                 কোনো রিপোর্ট পাওয়া যায়নি
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                 নতুন রিপোর্ট তৈরি করতে নতুন রিপোর্ট বাটনে ক্লিক করুন
//               </Typography>
//             </Box>
//           )}
//         </CardContent>
//       </Card>
//     </Box>
//   )
// }

// export default HifzReportList
