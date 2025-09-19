// "use client";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   InputAdornment,
// } from "@mui/material";
// import { useForm, Controller } from "react-hook-form";

// type StudentTarget = {
//   studentName: string;
//   hadis: string;
//   doa: string;
//   tajweed: string;
//   kajeda: string;
// };

// type WeeklyTargetForm = {
//   date: string;
//   month: string;
//   students: StudentTarget[];
// };

// export default function WeeklyTargetAddPage() {
//   const { control, handleSubmit } = useForm<WeeklyTargetForm>({
//     defaultValues: {
//       date: new Date().toISOString().substring(0, 10),
//       students: Array(10).fill({
//         studentName: "",
//         hadis: "",
//         doa: "",
//         tajweed: "",
//         kajeda: "",
//       }),
//     }
//   });

//   const onSubmit = (data: WeeklyTargetForm) => {
//     console.log("Weekly Target Data:", data);
//     // Here you would typically send data to your API
//   };

//   return (
//     <Box sx={{ maxWidth: 'xl', margin: "0 auto", p: 2 }}>
//       {/* Header */}
//       <Typography
//         variant="h6"
//         align="center"
//         sx={{ fontWeight: "bold", mb: 1 }}
//       >
//         ক্রাফট ইন্টারন্যাশনাল ইন্সটিটিউট
//       </Typography>
//       <Typography variant="subtitle1" align="center" sx={{ mb: 3 }}>
//         কাওসার ও মুন্নী ছাত্রদের সাপ্তাহিক রিপোর্ট
//       </Typography>

//       {/* Table Form */}
//       <TableContainer component={Paper} elevation={3}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Table sx={{ border: "1px solid #ddd" }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   colSpan={2}
//                   sx={{ border: "1px solid #ddd", fontWeight: "bold", py: 1 }}
//                 >
//                   তারিখ:
//                   <Controller
//                     name="date"
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         type="date"
//                         size="small"
//                         variant="outlined"
//                         sx={{ ml: 1 }}
//                         required
//                         InputLabelProps={{
//                           shrink: true,
//                         }}
//                       />
//                     )}
//                   />
//                 </TableCell>
//                 <TableCell sx={{ border: "1px solid #ddd", fontWeight: "bold", py: 1 }}>
//                   মাস:
//                   <Controller
//                     name="month"
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         size="small"
//                         variant="outlined"
//                         sx={{ ml: 1, minWidth: 100 }}
//                         required
//                       />
//                     )}
//                   />
//                 </TableCell>
//                 <TableCell 
//                   colSpan={2} 
//                   sx={{ border: "1px solid #ddd", fontWeight: "bold", py: 1 }}
//                 >
//                   {/* Empty cell for layout purposes */}
//                 </TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell
//                   sx={{
//                     border: "1px solid #ddd",
//                     fontWeight: "bold",
//                     backgroundColor: "#fff59d",
//                     py: 1,
//                   }}
//                 >
//                   শিক্ষার্থীর নাম
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     border: "1px solid #ddd",
//                     fontWeight: "bold",
//                     backgroundColor: "#fff59d",
//                     py: 1,
//                   }}
//                 >
//                   হাদিস নম্বর / সূরার নাম
//                 </TableCell>
//                 <TableCell sx={{ border: "1px solid #ddd", fontWeight: "bold", py: 1 }}>
//                   দোয়ার নম্বর
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     border: "1px solid #ddd",
//                     fontWeight: "bold",
//                     backgroundColor: "#fff59d",
//                     py: 1,
//                   }}
//                 >
//                   তাজবিদের বিষয়
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     border: "1px solid #ddd",
//                     fontWeight: "bold",
//                     backgroundColor: "#fff59d",
//                     py: 1,
//                   }}
//                 >
//                   কাজেদা (পৃষ্ঠা)
//                 </TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {/* Generate 10 student rows */}
//               {Array.from({ length: 10 }).map((_, index) => (
//                 <TableRow key={index}>
//                   {/* Student Name */}
//                   <TableCell sx={{ border: "1px solid #ddd", py: 1 }}>
//                     <Controller
//                       name={`students.${index}.studentName`}
//                       control={control}
//                       render={({ field }) => (
//                         <TextField
//                           {...field}
//                           placeholder="শিক্ষার্থীর নাম"
//                           variant="outlined"
//                           fullWidth
//                           size="small"
//                         />
//                       )}
//                     />
//                   </TableCell>

//                   {/* Hadis / Surah */}
//                   <TableCell sx={{ border: "1px solid #ddd", py: 1 }}>
//                     <Controller
//                       name={`students.${index}.hadis`}
//                       control={control}
//                       render={({ field }) => (
//                         <TextField
//                           {...field}
//                           placeholder="হাদিস/সূরা"
//                           variant="outlined"
//                           fullWidth
//                           size="small"
//                         />
//                       )}
//                     />
//                   </TableCell>

//                   {/* Doa */}
//                   <TableCell sx={{ border: "1px solid #ddd", py: 1 }}>
//                     <Controller
//                       name={`students.${index}.doa`}
//                       control={control}
//                       render={({ field }) => (
//                         <TextField
//                           {...field}
//                           placeholder="দোয়া"
//                           variant="outlined"
//                           fullWidth
//                           size="small"
//                         />
//                       )}
//                     />
//                   </TableCell>

//                   {/* Tajweed */}
//                   <TableCell sx={{ border: "1px solid #ddd", py: 1 }}>
//                     <Controller
//                       name={`students.${index}.tajweed`}
//                       control={control}
//                       render={({ field }) => (
//                         <TextField
//                           {...field}
//                           placeholder="তাজবিদ"
//                           variant="outlined"
//                           fullWidth
//                           size="small"
//                         />
//                       )}
//                     />
//                   </TableCell>

//                   {/* Kajeda */}
//                   <TableCell sx={{ border: "1px solid #ddd", py: 1 }}>
//                     <Controller
//                       name={`students.${index}.kajeda`}
//                       control={control}
//                       render={({ field }) => (
//                         <TextField
//                           {...field}
//                           placeholder="পৃষ্ঠা"
//                           variant="outlined"
//                           fullWidth
//                           size="small"
//                           InputProps={{
//                             endAdornment: <InputAdornment position="end">পৃষ্ঠা</InputAdornment>,
//                           }}
//                         />
//                       )}
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))}

//               <TableRow>
//                 <TableCell
//                   colSpan={5}
//                   sx={{ border: "1px solid #ddd", fontWeight: "bold", backgroundColor: "#e3f2fd", py: 1 }}
//                 >
//                   একনজরে এই সপ্তাহের রিপোর্ট
//                 </TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell
//                   colSpan={5}
//                   sx={{ border: "1px solid #ddd", fontWeight: "bold", backgroundColor: "#ffebee", py: 1 }}
//                 >
//                   একনজরে ভুলের সংখ্যা
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//           <Box sx={{ textAlign: "center", mt: 3, mb: 2 }}>
//             <Button type="submit" variant="contained" color="primary" size="large">
//               সংরক্ষণ করুন
//             </Button>
//           </Box>
//         </form>
//       </TableContainer>
//     </Box>
//   );
// }