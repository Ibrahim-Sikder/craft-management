// "use client"

// import { useState } from "react"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   TextField,
//   Typography,
//   Box,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material"

// interface HifzReportProps {
//   studentName: string
//   reportDate: string
//   month: string
// }

// export function HifzReport({ studentName, reportDate, month }: HifzReportProps) {
//   const [weeklyTarget, setWeeklyTarget] = useState("")
//   const [dailyEntries, setDailyEntries] = useState({
//     saturday: {
//       sabakSeven: { para: "", page: "" },
//       sabakAmukta: { para: "", page: "" },
//       tilawaAmount: "",
//       teacherSignature: "",
//       thursdayWeeklyRevision: "",
//     },
//     sunday: {
//       sabakSeven: { para: "", page: "" },
//       sabakAmukta: { para: "", page: "" },
//       tilawaAmount: "",
//       teacherSignature: "",
//       thursdayWeeklyRevision: "",
//     },
//     monday: {
//       sabakSeven: { para: "", page: "" },
//       sabakAmukta: { para: "", page: "" },
//       tilawaAmount: "",
//       teacherSignature: "",
//       thursdayWeeklyRevision: "",
//     },
//     tuesday: {
//       sabakSeven: { para: "", page: "" },
//       sabakAmukta: { para: "", page: "" },
//       tilawaAmount: "",
//       teacherSignature: "",
//       thursdayWeeklyRevision: "",
//     },
//     wednesday: {
//       sabakSeven: { para: "", page: "" },
//       sabakAmukta: { para: "", page: "" },
//       tilawaAmount: "",
//       teacherSignature: "",
//       thursdayWeeklyRevision: "",
//     },
//     thursday: {
//       sabakSeven: { para: "", page: "" },
//       sabakAmukta: { para: "", page: "" },
//       tilawaAmount: "",
//       teacherSignature: "",
//       thursdayWeeklyRevision: "",
//     },
//     friday: {
//       sabakSeven: { para: "", page: "" },
//       sabakAmukta: { para: "", page: "" },
//       tilawaAmount: "",
//       teacherSignature: "",
//       thursdayWeeklyRevision: "",
//     },
//   })

//   const days = [
//     { key: "saturday", name: "Saturday", bangla: "শনিবার" },
//     { key: "sunday", name: "Sunday", bangla: "রবিবার" },
//     { key: "monday", name: "Monday", bangla: "সোমবার" },
//     { key: "tuesday", name: "Tuesday", bangla: "মঙ্গলবার" },
//     { key: "wednesday", name: "Wednesday", bangla: "বুধবার" },
//     { key: "thursday", name: "Thursday", bangla: "বৃহস্পতিবার" },
//     { key: "friday", name: "Friday", bangla: "শুক্রবার" },
//   ]

//   const updateDayEntry = (day: string, section: string, field: string, value: string) => {
//     setDailyEntries((prev) => ({
//       ...prev,
//       [day]: {
//         ...prev[day as keyof typeof prev],
//         [section]:
//           section === "sabakSeven" || section === "sabakAmukta"
//             ? { ...prev[day as keyof typeof prev][section as "sabakSeven" | "sabakAmukta"], [field]: value }
//             : value,
//       },
//     }))
//   }

//   return (
//     <Card sx={{ boxShadow: "none", "@media print": { boxShadow: "none", border: 0 } }}>
//       <CardHeader
//         sx={{
//           textAlign: "center",
//           borderBottom: 1,
//           borderColor: "divider",
//           "@media print": { borderColor: "black" },
//         }}
//         title={
//           <Box>
//             <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
//               Craft International Institute
//             </Typography>
//             <Typography variant="h5" sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}>
//               Hifz Students Daily Report
//             </Typography>
//             <Typography variant="h6" sx={{ color: "text.secondary" }}>
//               হিফজ শিক্ষার্থীদের দৈনিক রিপোর্ট
//             </Typography>
//           </Box>
//         }
//       />

//       <CardContent sx={{ p: 3 }}>
//         {/* Student Information */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: 2,
//             mb: 3,
//             bgcolor: "grey.50",
//             "@media print": { bgcolor: "transparent", border: 1, borderColor: "black" },
//           }}
//         >
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={4}>
//               <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//                 Student Name (শিক্ষার্থীর নাম):
//               </Typography>
//               <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 0.5, minHeight: 24 }}>
//                 {studentName || "_________________"}
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//                 Date (তারিখ):
//               </Typography>
//               <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 0.5, minHeight: 24 }}>
//                 {reportDate || "_________________"}
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//                 Month (মাস):
//               </Typography>
//               <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 0.5, minHeight: 24 }}>
//                 {month || "_________________"}
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>

//         {/* Additional Info */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: 2,
//             mb: 3,
//             bgcolor: "blue.50",
//             "@media print": { bgcolor: "transparent", border: 1, borderColor: "black" },
//           }}
//         >
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//                 Page Count & Number (পারার সংখ্যা ও নং):
//               </Typography>
//               <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="Enter para details"
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     "@media print": {
//                       border: 0,
//                       borderBottom: 1,
//                       borderColor: "black",
//                       borderRadius: 0,
//                       bgcolor: "transparent",
//                     },
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//                 Total Pages (মোট পারা):
//               </Typography>
//               <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="Enter total pages"
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     "@media print": {
//                       border: 0,
//                       borderBottom: 1,
//                       borderColor: "black",
//                       borderRadius: 0,
//                       bgcolor: "transparent",
//                     },
//                   },
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </Paper>

//         {/* Daily Entries Table */}
//         <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
//           <Table
//             size="small"
//             sx={{
//               border: 1,
//               borderColor: "grey.300",
//               "@media print": { borderColor: "black" },
//               "& .MuiTableCell-root": {
//                 border: 1,
//                 borderColor: "grey.300",
//                 "@media print": { borderColor: "black" },
//                 fontSize: "0.75rem",
//                 p: 1,
//               },
//             }}
//           >
//             <TableHead>
//               <TableRow sx={{ bgcolor: "grey.100", "@media print": { bgcolor: "transparent" } }}>
//                 <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
//                   Date/Day
//                   <br />
//                   (তারিখ/বার)
//                 </TableCell>
//                 <TableCell colSpan={2} sx={{ fontWeight: 600, textAlign: "center" }}>
//                   Sabak Seven - Sabak Amukta
//                   <br />
//                   (সবক সাত - সবক আমুক্তা পেছনের পড়া)
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
//                   Tilawat
//                   <br />
//                   (তিলাওয়াত পারা নং)
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
//                   Teacher Signature
//                   <br />
//                   (শিক্ষকের স্বাক্ষর)
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
//                   Thursday Weekly Revision
//                   <br />
//                   (বৃহস্পতিবার সাপ্তাহিক শবনা রিভিশন)
//                 </TableCell>
//               </TableRow>
//               <TableRow sx={{ bgcolor: "grey.50", "@media print": { bgcolor: "transparent" } }}>
//                 <TableCell></TableCell>
//                 <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
//                   Para & Page No
//                   <br />
//                   (পারা ও পৃষ্ঠা নং)
//                 </TableCell>
//                 <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
//                   Para & Page No
//                   <br />
//                   (পারা ও পৃষ্ঠা নং)
//                 </TableCell>
//                 <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
//                   Amount
//                   <br />
//                   (পরিমাণ)
//                 </TableCell>
//                 <TableCell></TableCell>
//                 <TableCell></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {days.map((day) => (
//                 <TableRow key={day.key} sx={{ "&:hover": { bgcolor: "grey.50" } }}>
//                   <TableCell sx={{ fontWeight: 500, textAlign: "center" }}>
//                     {day.name}
//                     <br />
//                     <Typography variant="caption" color="text.secondary">
//                       ({day.bangla})
//                     </Typography>
//                   </TableCell>
//                   <TableCell sx={{ p: 0.5 }}>
//                     <TextField
//                       size="small"
//                       value={`${dailyEntries[day.key as keyof typeof dailyEntries].sabakSeven.para} ${dailyEntries[day.key as keyof typeof dailyEntries].sabakSeven.page}`}
//                       onChange={(e) => {
//                         const [para, page] = e.target.value.split(" ")
//                         updateDayEntry(day.key, "sabakSeven", "para", para || "")
//                         updateDayEntry(day.key, "sabakSeven", "page", page || "")
//                       }}
//                       placeholder="Para Page"
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           border: 0,
//                           fontSize: "0.75rem",
//                           height: 32,
//                           "@media print": { bgcolor: "transparent" },
//                         },
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell sx={{ p: 0.5 }}>
//                     <TextField
//                       size="small"
//                       value={`${dailyEntries[day.key as keyof typeof dailyEntries].sabakAmukta.para} ${dailyEntries[day.key as keyof typeof dailyEntries].sabakAmukta.page}`}
//                       onChange={(e) => {
//                         const [para, page] = e.target.value.split(" ")
//                         updateDayEntry(day.key, "sabakAmukta", "para", para || "")
//                         updateDayEntry(day.key, "sabakAmukta", "page", page || "")
//                       }}
//                       placeholder="Para Page"
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           border: 0,
//                           fontSize: "0.75rem",
//                           height: 32,
//                           "@media print": { bgcolor: "transparent" },
//                         },
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell sx={{ p: 0.5 }}>
//                     <TextField
//                       size="small"
//                       value={dailyEntries[day.key as keyof typeof dailyEntries].tilawaAmount}
//                       onChange={(e) => updateDayEntry(day.key, "tilawaAmount", "", e.target.value)}
//                       placeholder="Amount"
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           border: 0,
//                           fontSize: "0.75rem",
//                           height: 32,
//                           "@media print": { bgcolor: "transparent" },
//                         },
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell sx={{ p: 0.5 }}>
//                     <TextField
//                       size="small"
//                       value={dailyEntries[day.key as keyof typeof dailyEntries].teacherSignature}
//                       onChange={(e) => updateDayEntry(day.key, "teacherSignature", "", e.target.value)}
//                       placeholder="Signature"
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           border: 0,
//                           fontSize: "0.75rem",
//                           height: 32,
//                           "@media print": { bgcolor: "transparent" },
//                         },
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell sx={{ p: 0.5 }}>
//                     <TextField
//                       size="small"
//                       value={dailyEntries[day.key as keyof typeof dailyEntries].thursdayWeeklyRevision}
//                       onChange={(e) => updateDayEntry(day.key, "thursdayWeeklyRevision", "", e.target.value)}
//                       placeholder="Weekly Revision"
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           border: 0,
//                           fontSize: "0.75rem",
//                           height: 32,
//                           "@media print": { bgcolor: "transparent" },
//                         },
//                       }}
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))}
//               <TableRow sx={{ bgcolor: "grey.100", "@media print": { bgcolor: "transparent" }, fontWeight: 600 }}>
//                 <TableCell sx={{ textAlign: "center" }}>
//                   Weekly Total
//                   <br />
//                   (সপ্তাহের মোট হিসাব)
//                 </TableCell>
//                 <TableCell colSpan={5}>
//                   <Grid container spacing={1} sx={{ fontSize: "0.75rem" }}>
//                     <Grid item xs={4}>
//                       Total Sabak: ____
//                     </Grid>
//                     <Grid item xs={4}>
//                       Total Tilawat: ____
//                     </Grid>
//                     <Grid item xs={4}>
//                       Total Revision: ____
//                     </Grid>
//                   </Grid>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//     </Card>
//   )
// }

// export default HifzReport