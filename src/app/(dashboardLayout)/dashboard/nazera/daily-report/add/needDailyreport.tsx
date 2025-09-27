// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client"

// import { useMemo, useState } from "react"
// import {
//   Card,
//   CardContent,
//   CardHeader,
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
//   Button,
// } from "@mui/material"
// import { boxStyleReport, reportStyle } from "@/style/customeStyle"
// import CraftInput from "@/components/Forms/Input"
// import CraftForm from "@/components/Forms/Form"
// import CraftSelect from "@/components/Forms/Select"
// import CraftAutoComplete from "@/components/Forms/AutoComplete"
// import { useGetAllTeachersQuery } from "@/redux/api/teacherApi"
// import CraftIntAutoComplete from "@/components/Forms/CruftAutocomplete"
// import CraftDatePicker from "@/components/Forms/DatePicker"
// import { FieldValues } from "react-hook-form"
// import { useCreateNazeraReportMutation } from "@/redux/api/nazeraDailyReportApi"
// import { toast } from "react-hot-toast"

// function NazeraReport({ studentName, reportDate, month }: any) {
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(10)
//   const [searchTerm, setSearchTerm] = useState("")
//   const limit = 10

//   const [createNazeraReport, { isLoading }] = useCreateNazeraReportMutation()

//   const days = [
//     { key: "saturday", name: "Saturday", bangla: "শনিবার" },
//     { key: "sunday", name: "Sunday", bangla: "রবিবার" },
//     { key: "monday", name: "Monday", bangla: "সোমবার" },
//     { key: "tuesday", name: "Tuesday", bangla: "মঙ্গলবার" },
//     { key: "wednesday", name: "Wednesday", bangla: "বুধবার" },
//     { key: "thursday", name: "Thursday", bangla: "বৃহস্পতিবার" },
//     { key: "friday", name: "Friday", bangla: "শুক্রবার" },
//   ]

//   const { data: teacherData } = useGetAllTeachersQuery({
//     limit: limit,
//     page: page + 1,
//     searchTerm: searchTerm,
//   })

//   const teacherOption = useMemo(() => {
//     if (!teacherData?.data) return []
//     return teacherData?.data?.map((sub: any) => ({
//       label: sub.name,
//       value: sub._id,
//     }))
//   }, [teacherData])

//   const calculateWeeklyTotals = (data: FieldValues) => {
//     let totalPages = 0
//     let totalMistakes = 0
//     let totalDuas = 0
//     let totalHadiths = 0

//     days.forEach(day => {
//       // Sum total pages read
//       totalPages += parseInt(data[`${day.key}TotalRead`] || 0, 10)
      
//       // Sum mistakes from all sessions
//       totalMistakes += parseInt(data[`${day.key}MorningMistakes`] || 0, 10)
//       totalMistakes += parseInt(data[`${day.key}AfternoonMistakes`] || 0, 10)
//       totalMistakes += parseInt(data[`${day.key}NightMistakes`] || 0, 10)
      
//       // Parse dua/hadith/masala field
//       const duaHadithMasala = data[`${day.key}DuaHadithMasala`] || ""
//       const parts = duaHadithMasala.split('/').map(part => part.trim())
      
//       if (parts.length >= 1) {
//         // First part is usually dua count
//         totalDuas += parseInt(parts[0], 10) || 0
//       }
//       if (parts.length >= 2) {
//         // Second part is usually hadith count
//         totalHadiths += parseInt(parts[1], 10) || 0
//       }
//     })

//     return { totalPages, totalMistakes, totalDuas, totalHadiths }
//   }

//   const handleSubmit = async (data: FieldValues) => {
//     console.log(data)
//     try {
//       // Calculate weekly totals
//       const weeklyTotals = calculateWeeklyTotals(data)

//       // Structure the data according to the backend schema
//       const formattedData = {
//         teacherName: data.teacherName?.label,
//         studentName: data.studentName?.label,
//         reportDate: data.reportDate,
//         month: month || new Date().getMonth().toString(),
  
//         dailyEntries: {
//           saturday: {
//             morning: {
//               para: data.saturdayMorningPara || "",
//               page: data.saturdayMorningPage || "",
//               amount: data.saturdayMorningAmount || "",
//               mistakes: data.saturdayMorningMistakes || "",
//             },
//             afternoon: {
//               para: data.saturdayAfternoonPara || "",
//               page: data.saturdayAfternoonPage || "",
//               amount: data.saturdayAfternoonAmount || "",
//               mistakes: data.saturdayAfternoonMistakes || "",
//             },
//             night: {
//               para: data.saturdayNightPara || "",
//               page: data.saturdayNightPage || "",
//               amount: data.saturdayNightAmount || "",
//               mistakes: data.saturdayNightMistakes || "",
//             },
//             totalRead: data.saturdayTotalRead || "",
//             duaHadithMasala: data.saturdayDuaHadithMasala || "",
//             mashq: data.saturdayMashq || "না",
//             tajweed: data.saturdayTajweed || "",
    
//           },
//           sunday: {
//             morning: {
//               para: data.sundayMorningPara || "",
//               page: data.sundayMorningPage || "",
//               amount: data.sundayMorningAmount || "",
//               mistakes: data.sundayMorningMistakes || "",
//             },
//             afternoon: {
//               para: data.sundayAfternoonPara || "",
//               page: data.sundayAfternoonPage || "",
//               amount: data.sundayAfternoonAmount || "",
//               mistakes: data.sundayAfternoonMistakes || "",
//             },
//             night: {
//               para: data.sundayNightPara || "",
//               page: data.sundayNightPage || "",
//               amount: data.sundayNightAmount || "",
//               mistakes: data.sundayNightMistakes || "",
//             },
//             totalRead: data.sundayTotalRead || "",
//             duaHadithMasala: data.sundayDuaHadithMasala || "",
//             mashq: data.sundayMashq || "না",
//             tajweed: data.sundayTajweed || "",
       
//           },
//           monday: {
//             morning: {
//               para: data.mondayMorningPara || "",
//               page: data.mondayMorningPage || "",
//               amount: data.mondayMorningAmount || "",
//               mistakes: data.mondayMorningMistakes || "",
//             },
//             afternoon: {
//               para: data.mondayAfternoonPara || "",
//               page: data.mondayAfternoonPage || "",
//               amount: data.mondayAfternoonAmount || "",
//               mistakes: data.mondayAfternoonMistakes || "",
//             },
//             night: {
//               para: data.mondayNightPara || "",
//               page: data.mondayNightPage || "",
//               amount: data.mondayNightAmount || "",
//               mistakes: data.mondayNightMistakes || "",
//             },
//             totalRead: data.mondayTotalRead || "",
//             duaHadithMasala: data.mondayDuaHadithMasala || "",
//             mashq: data.mondayMashq || "না",
//             tajweed: data.mondayTajweed || "",
//           },
//           tuesday: {
//             morning: {
//               para: data.tuesdayMorningPara || "",
//               page: data.tuesdayMorningPage || "",
//               amount: data.tuesdayMorningAmount || "",
//               mistakes: data.tuesdayMorningMistakes || "",
//             },
//             afternoon: {
//               para: data.tuesdayAfternoonPara || "",
//               page: data.tuesdayAfternoonPage || "",
//               amount: data.tuesdayAfternoonAmount || "",
//               mistakes: data.tuesdayAfternoonMistakes || "",
//             },
//             night: {
//               para: data.tuesdayNightPara || "",
//               page: data.tuesdayNightPage || "",
//               amount: data.tuesdayNightAmount || "",
//               mistakes: data.tuesdayNightMistakes || "",
//             },
//             totalRead: data.tuesdayTotalRead || "",
//             duaHadithMasala: data.tuesdayDuaHadithMasala || "",
//             mashq: data.tuesdayMashq || "না",
//             tajweed: data.tuesdayTajweed || "",
//           },
//           wednesday: {
//             morning: {
//               para: data.wednesdayMorningPara || "",
//               page: data.wednesdayMorningPage || "",
//               amount: data.wednesdayMorningAmount || "",
//               mistakes: data.wednesdayMorningMistakes || "",
//             },
//             afternoon: {
//               para: data.wednesdayAfternoonPara || "",
//               page: data.wednesdayAfternoonPage || "",
//               amount: data.wednesdayAfternoonAmount || "",
//               mistakes: data.wednesdayAfternoonMistakes || "",
//             },
//             night: {
//               para: data.wednesdayNightPara || "",
//               page: data.wednesdayNightPage || "",
//               amount: data.wednesdayNightAmount || "",
//               mistakes: data.wednesdayNightMistakes || "",
//             },
//             totalRead: data.wednesdayTotalRead || "",
//             duaHadithMasala: data.wednesdayDuaHadithMasala || "",
//             mashq: data.wednesdayMashq || "না",
//             tajweed: data.wednesdayTajweed || "",
//           },
//           thursday: {
//             morning: {
//               para: data.thursdayMorningPara || "",
//               page: data.thursdayMorningPage || "",
//               amount: data.thursdayMorningAmount || "",
//               mistakes: data.thursdayMorningMistakes || "",
//             },
//             afternoon: {
//               para: data.thursdayAfternoonPara || "",
//               page: data.thursdayAfternoonPage || "",
//               amount: data.thursdayAfternoonAmount || "",
//               mistakes: data.thursdayAfternoonMistakes || "",
//             },
//             night: {
//               para: data.thursdayNightPara || "",
//               page: data.thursdayNightPage || "",
//               amount: data.thursdayNightAmount || "",
//               mistakes: data.thursdayNightMistakes || "",
//             },
//             totalRead: data.thursdayTotalRead || "",
//             duaHadithMasala: data.thursdayDuaHadithMasala || "",
//             mashq: data.thursdayMashq || "না",
//             tajweed: data.thursdayTajweed || "",
//           },
//           friday: {
//             morning: {
//               para: data.fridayMorningPara || "",
//               page: data.fridayMorningPage || "",
//               amount: data.fridayMorningAmount || "",
//               mistakes: data.fridayMorningMistakes || "",
//             },
//             afternoon: {
//               para: data.fridayAfternoonPara || "",
//               page: data.fridayAfternoonPage || "",
//               amount: data.fridayAfternoonAmount || "",
//               mistakes: data.fridayAfternoonMistakes || "",
//             },
//             night: {
//               para: data.fridayNightPara || "",
//               page: data.fridayNightPage || "",
//               amount: data.fridayNightAmount || "",
//               mistakes: data.fridayNightMistakes || "",
//             },
//             totalRead: data.fridayTotalRead || "",
//             duaHadithMasala: data.fridayDuaHadithMasala || "",
//             mashq: data.fridayMashq || "না",
//             tajweed: data.fridayTajweed || "",
 
//           },
//         },
//         // Include weekly totals
//         ...weeklyTotals
//       }

//       console.log('formatted data', formattedData)

//       // Submit the data using the mutation
//       const result = await createNazeraReport(formattedData).unwrap()

//       if (result.success) {
//         toast.success("Report submitted successfully!")
//       } else {
//         toast.error("Failed to submit report")
//       }
//     } catch (error) {
//       console.error("Error submitting report:", error)
//       toast.error("An error occurred while submitting the report")
//     }
//   }

//   return (
//     <CraftForm onSubmit={handleSubmit}>
//       <Card sx={{ boxShadow: "none", "@media print": { boxShadow: "none", border: 0 } }}>
//         <CardHeader
//           sx={{
//             textAlign: "center",
//             borderBottom: 1,
//             borderColor: "divider",
//             "@media print": { borderColor: "black" },
//           }}
//           title={
//             <Box>
//               <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
//                 Craft International Institute
//               </Typography>
//               <Typography variant="h5" sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}>
//                 Nazera Students Daily Report
//               </Typography>
//               <Typography variant="h6" sx={{ color: "text.secondary" }}>
//                 নাজেরা ছাত্রদের দৈনিক রিপোর্ট
//               </Typography>
//             </Box>
//           }
//         />

//         <CardContent sx={{ p: 3 }}>
//           {/* Student Information */}
//           <Paper
//             elevation={0}
//             sx={{
//               p: 2,
//               mb: 3,
//               bgcolor: "grey.50",
//               "@media print": { bgcolor: "transparent", border: 1, borderColor: "black" },
//             }}
//           >
//             <Box sx={boxStyleReport}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={3} lg={3}>
//                   <CraftIntAutoComplete
//                     name="teacherName"
//                     placeholder="শিক্ষকের নাম লিখুন"
//                     label="শিক্ষকের নাম"
//                     fullWidth
//                     freeSolo
//                     multiple={false}
//                     options={teacherOption}
//                     forcePopupIcon={false}
//                     clearOnBlur={false}
//                     selectOnFocus={true}
//                     handleHomeEndKeys={true}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={4}>
//                   <CraftIntAutoComplete
//                     name="studentName"
//                     placeholder="শিক্ষার্থীর নাম"
//                     label="শিক্ষার্থীর নাম"
//                     fullWidth
//                     freeSolo
//                     multiple={false}
//                     options={teacherOption}
//                     forcePopupIcon={false}
//                     clearOnBlur={false}
//                     selectOnFocus={true}
//                     handleHomeEndKeys={true}
//                   />
//                 </Grid>

//                 <Grid item xs={6} sm={6} md={2} lg={2.5}>
//                   <CraftDatePicker name="reportDate" label="তারিখ" />
//                 </Grid>
//               </Grid>
//             </Box>
//           </Paper>
//           {/* Daily Entries Table */}
//           <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
//             <Table
//               size="small"
//               sx={{
//                 border: 1,
//                 borderColor: "grey.300",
//                 "@media print": { borderColor: "black" },
//                 "& .MuiTableCell-root": {
//                   border: 1,
//                   borderColor: "grey.300",
//                   "@media print": { borderColor: "black" },
//                   fontSize: "0.75rem",
//                   p: 1,
//                 },
//               }}
//             >
//               <TableHead>
//                 <TableRow sx={{ bgcolor: "grey.100", "@media print": { bgcolor: "transparent" } }}>
//                   <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
//                     Date/Day
//                     <br />
//                     (তারিখ/বার)
//                   </TableCell>
//                   <TableCell colSpan={4} sx={{ fontWeight: 600, textAlign: "center" }}>
//                     Morning (সকাল)
//                   </TableCell>
//                   <TableCell colSpan={4} sx={{ fontWeight: 600, textAlign: "center" }}>
//                     Afternoon (দুপুর)
//                   </TableCell>
//                   <TableCell colSpan={4} sx={{ fontWeight: 600, textAlign: "center" }}>
//                     Night (রাত)
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
//                     Total Read
//                     <br />
//                     (সর্বমোট পঠিত পৃষ্ঠা)
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
//                     Dua/Hadith/Masala
//                     <br />
//                     (দোয়া/হাদিস/মাসয়ালা সংখ্যা/নং)
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 600, textAlign: "center", minWidth: 90 }}>
//                     মাশক্ব হয়েছে কি
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 600, textAlign: "center", minWidth: 90 }}>
//                     তাজভীদ শিক্ষা
//                   </TableCell>
//                 </TableRow>
//                 <TableRow sx={{ bgcolor: "grey.50", "@media print": { bgcolor: "transparent" } }}>
//                   <TableCell></TableCell>
//                   {["Para (পারা)", "Page (পৃষ্ঠা নং)", "Amount (পরিমাণ)", "Mistakes (ভুল)"].map((header, i) => (
//                     <TableCell key={`morning-${i}`} sx={{ fontSize: "0.7rem", textAlign: "center" }}>
//                       {header}
//                     </TableCell>
//                   ))}
//                   {["Para (পারা)", "Page (পৃষ্ঠা নং)", "Amount (পরিমাণ)", "Mistakes (ভুল)"].map((header, i) => (
//                     <TableCell key={`afternoon-${i}`} sx={{ fontSize: "0.7rem", textAlign: "center" }}>
//                       {header}
//                     </TableCell>
//                   ))}
//                   {["Para (পারা)", "Page (পৃষ্ঠা নং)", "Amount (পরিমাণ)", "Mistakes (ভুল)"].map((header, i) => (
//                     <TableCell key={`night-${i}`} sx={{ fontSize: "0.7rem", textAlign: "center" }}>
//                       {header}
//                     </TableCell>
//                   ))}
//                   <TableCell></TableCell>
//                   <TableCell></TableCell>
//                   <TableCell></TableCell>
//                   <TableCell></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {days.map((day) => (
//                   <TableRow key={day.key} sx={{ "&:hover": { bgcolor: "grey.50" } }}>
//                     <TableCell sx={{ fontWeight: 500, textAlign: "center" }}>
//                       {day.name}
//                       <br />
//                       <Typography variant="caption" color="text.secondary">
//                         ({day.bangla})
//                       </Typography>
//                     </TableCell>
//                     {/* Morning */}
//                     {["para", "page", "amount", "mistakes"].map((field) => (
//                       <TableCell key={`${day.key}-morning-${field}`} sx={{ p: 0.5 }}>
//                         <CraftInput
//                           name={`${day.key}Morning${field.charAt(0).toUpperCase() + field.slice(1)}`}
//                           size="small"
//                           sx={reportStyle}
//                         />
//                       </TableCell>
//                     ))}
//                     {/* Afternoon */}
//                     {["para", "page", "amount", "mistakes"].map((field) => (
//                       <TableCell key={`${day.key}-afternoon-${field}`} sx={{ p: 0.5 }}>
//                         <CraftInput
//                           name={`${day.key}Afternoon${field.charAt(0).toUpperCase() + field.slice(1)}`}
//                           size="small"
//                           sx={reportStyle}
//                         />
//                       </TableCell>
//                     ))}
//                     {/* Night */}
//                     {["para", "page", "amount", "mistakes"].map((field) => (
//                       <TableCell key={`${day.key}-night-${field}`} sx={{ p: 0.5 }}>
//                         <CraftInput
//                           name={`${day.key}Night${field.charAt(0).toUpperCase() + field.slice(1)}`}
//                           size="small"
//                           sx={reportStyle}
//                         />
//                       </TableCell>
//                     ))}
//                     {/* Total and other fields */}
//                     <TableCell sx={{ p: 0.5 }}>
//                       <CraftInput
//                         name={`${day.key}TotalRead`}
//                         size="small"
//                         sx={reportStyle}
//                       />
//                     </TableCell>
//                     <TableCell sx={{ p: 0.5 }}>
//                       <CraftInput
//                         name={`${day.key}DuaHadithMasala`}
//                         size="small"
//                         placeholder="দোয়া/হাদিস/মাসয়ালা"
//                         sx={reportStyle}
//                       />
//                     </TableCell>
//                     <TableCell sx={{ p: 0.5 }}>
//                       <CraftSelect
//                         items={['হ্যাঁ', 'না']}
//                         name={`${day.key}Mashq`}
//                         sx={reportStyle}
//                       />
//                     </TableCell>
//                     {/* Tajweed Column - Fixed name to be per day */}
//                     <TableCell sx={{ p: 0.5 }}>
//                       <CraftInput
//                         name={`${day.key}Tajweed`}
//                         placeholder="তাজভীদ শিক্ষা"
//                         sx={reportStyle}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 <TableRow sx={{ bgcolor: "grey.100", "@media print": { bgcolor: "transparent" }, fontWeight: 600 }}>
//                   <TableCell sx={{ textAlign: "center" }}>
//                     Weekly Total
//                     <br />
//                     (সপ্তাহের মোট হিসাব)
//                   </TableCell>
//                   <TableCell colSpan={15}>
//                     <Grid container spacing={1} sx={{ fontSize: "0.75rem" }}>
//                       <Grid item xs={3}>
//                         Total Pages: ____ 
//                       </Grid>
//                       <Grid item xs={3}>
//                         Total Mistakes: ____ 
//                       </Grid>
//                       <Grid item xs={3}>
//                         Total Duas: ____ 
//                       </Grid>
//                       <Grid item xs={3}>
//                         Total Hadith: ____ 
//                       </Grid>
//                     </Grid>
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//           {/* Submit Button */}
//           <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', '@media print': { display: 'none' } }}>
//             <Button
//               variant="contained"
//               color="primary"
//               size="large"
//               type="submit"
//               disabled={isLoading}
//               sx={{
//                 px: 4,
//                 py: 1.5,
//                 fontSize: '1.1rem',
//                 fontWeight: 'bold',
//               }}
//             >
//               {isLoading ? 'Submitting...' : 'Submit Report'}
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     </CraftForm>
//   )
// }

// export default NazeraReport