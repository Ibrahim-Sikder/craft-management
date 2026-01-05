// /* eslint-disable @typescript-eslint/no-explicit-any */

// import {
//   ArrowForward,
//   Class,
//   Close,
//   Person,
//   Refresh,
//   School,
// } from "@mui/icons-material";
// import {
//   Alert,
//   Box,
//   Button,
//   Checkbox,
//   Chip,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Divider,
//   FormControl,
//   Grid,
//   IconButton,
//   InputLabel,
//   LinearProgress,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// interface ClassOption {
//   value: string;
//   label: string;
// }

// interface PromotionModalProps {
//   open: boolean;
//   onClose: () => void;
//   onSuccess?: () => void;
//   classOptions: ClassOption[];
// }

// const PromotionModal: React.FC<PromotionModalProps> = ({
//   open,
//   onClose,
//   onSuccess,
//   classOptions,
// }) => {
//   const theme = useTheme();
//   const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
//   const [session, setSession] = useState<string>("");
//   const [newClassId, setNewClassId] = useState<string>("");
//   const [loading, setLoading] = useState(false);
//   const [rollNumbers, setRollNumbers] = useState<Record<string, string>>({});
//   const [sections, setSections] = useState<Record<string, string>>({});
//   const [searchTerm, setSearchTerm] = useState("");

//   // API hooks
//   const [bulkPromote, { isLoading: promoting }] =
//     useBulkPromoteEnrollmentsMutation();
//   const {
//     data: eligibleData,
//     isLoading: loadingEligible,
//     refetch: refetchEligible,
//   } = useGetPromotionEligibleStudentsQuery(
//     session || new Date().getFullYear().toString()
//   );

//   const { data: summaryData } = useGetPromotionSummaryQuery();

//   // Set default session to next year
//   useEffect(() => {
//     const currentYear = new Date().getFullYear();
//     const nextYear = currentYear + 1;
//     setSession(`${nextYear}-${nextYear + 1}`);
//   }, []);

//   // Get next class based on current class
//   const getNextClass = (currentClassLabel: string): string => {
//     const classOrder = [
//       "Play",
//       "Nursery",
//       "KG",
//       "Class I",
//       "Class II",
//       "Class III",
//       "Class IV",
//       "Class V",
//       "Class VI",
//       "Class VII",
//       "Class VIII",
//       "Class IX",
//       "Class X",
//       "Class XI",
//       "Class XII",
//       "Alim First Year",
//       "Alim Second Year",
//       "Fazil First Year",
//       "Fazil Second Year",
//       "Fazil Third Year",
//       "Kamil First Year",
//       "Kamil Second Year",
//       "Kamil Third Year",
//     ];

//     const currentIndex = classOrder.indexOf(currentClassLabel);
//     if (currentIndex === -1 || currentIndex === classOrder.length - 1) {
//       return currentClassLabel; // Same class if not found or already at highest
//     }
//     return classOrder[currentIndex + 1];
//   };

//   const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       const eligibleStudents = eligibleData?.data?.eligibleStudents || [];
//       setSelectedStudents(
//         eligibleStudents.map((student: any) => student.enrollmentId)
//       );
//     } else {
//       setSelectedStudents([]);
//     }
//   };

//   const handleSelectStudent = (enrollmentId: string) => {
//     setSelectedStudents((prev) => {
//       if (prev.includes(enrollmentId)) {
//         return prev.filter((id) => id !== enrollmentId);
//       } else {
//         return [...prev, enrollmentId];
//       }
//     });
//   };

//   const handleRollNumberChange = (studentId: string, value: string) => {
//     setRollNumbers((prev) => ({
//       ...prev,
//       [studentId]: value,
//     }));
//   };

//   const handleSectionChange = (studentId: string, value: string) => {
//     setSections((prev) => ({
//       ...prev,
//       [studentId]: value,
//     }));
//   };

//   const handlePromote = async () => {
//     if (selectedStudents.length === 0) {
//       toast.error("Please select at least one student");
//       return;
//     }

//     if (!session) {
//       toast.error("Please enter session");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Prepare promotions data
//       const promotions = selectedStudents.map((enrollmentId) => {
//         const studentData = eligibleData?.data?.eligibleStudents.find(
//           (s: any) => s.enrollmentId === enrollmentId
//         );

//         const currentClass = studentData.currentClass?.className || "";
//         const nextClass = newClassId || getNextClass(currentClass);

//         // Find class ID from label
//         const classOption = classOptions.find((c) => c.label === nextClass);

//         return {
//           studentId: studentData.studentId,
//           newClassId: classOption?.value || newClassId,
//           rollNumber: rollNumbers[enrollmentId] || "",
//           section: sections[enrollmentId] || studentData.currentSection || "A",
//         };
//       });

//       // Call bulk promote API
//       const response = await bulkPromote({ promotions, session }).unwrap();

//       if (response.success) {
//         toast.success(response.message);

//         // Reset form
//         setSelectedStudents([]);
//         setRollNumbers({});
//         setSections({});

//         // Trigger success callback
//         if (onSuccess) {
//           onSuccess();
//         }

//         // Close modal
//         onClose();
//       } else {
//         toast.error(response.message || "Promotion failed");
//       }
//     } catch (error: any) {
//       console.error("Promotion error:", error);
//       toast.error(error.data?.message || error.message || "Promotion failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter students based on search term
//   const filteredStudents = React.useMemo(() => {
//     const students = eligibleData?.data?.eligibleStudents || [];
//     if (!searchTerm.trim()) return students;

//     const term = searchTerm.toLowerCase();
//     return students.filter(
//       (student: any) =>
//         student.studentName.toLowerCase().includes(term) ||
//         student.studentIdentifier.toLowerCase().includes(term) ||
//         student.currentClass?.className?.toLowerCase().includes(term)
//     );
//   }, [eligibleData, searchTerm]);

//   // Calculate promotion statistics
//   const promotionStats = React.useMemo(() => {
//     if (!summaryData?.data) return null;

//     const { summary } = summaryData.data;
//     return {
//       promotionRate: summary.promotionRate,
//       totalPromoted: summary.totalPromoted,
//       totalPrevious: summary.totalPreviousEnrollments,
//     };
//   }, [summaryData]);

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
//       <DialogTitle>
//         <Box display="flex" alignItems="center" justifyContent="space-between">
//           <Box display="flex" alignItems="center">
//             <ArrowForward sx={{ mr: 1, color: theme.palette.primary.main }} />
//             <Typography variant="h6">Student Promotion</Typography>
//           </Box>
//           <Box display="flex" alignItems="center" gap={1}>
//             <Tooltip title="Refresh Eligible Students">
//               <IconButton onClick={() => refetchEligible()} size="small">
//                 <Refresh />
//               </IconButton>
//             </Tooltip>
//             <IconButton onClick={onClose} size="small">
//               <Close />
//             </IconButton>
//           </Box>
//         </Box>
//       </DialogTitle>

//       <DialogContent dividers>
//         <Grid container spacing={3}>
//           {/* Header with summary */}
//           <Grid item xs={12}>
//             <Alert severity="info" icon={<School />} sx={{ mb: 2 }}>
//               <Typography variant="body2">
//                 Promote students to next class for the upcoming session. This
//                 will create new enrollment records with type "promotion".
//               </Typography>
//               {promotionStats && (
//                 <Box sx={{ mt: 1 }}>
//                   <Typography variant="caption" display="block">
//                     Previous Session Promotion Rate:{" "}
//                     <strong>{promotionStats.promotionRate}</strong>
//                   </Typography>
//                   <Typography variant="caption" display="block">
//                     ({promotionStats.totalPromoted} of{" "}
//                     {promotionStats.totalPrevious} students)
//                   </Typography>
//                 </Box>
//               )}
//             </Alert>
//           </Grid>

//           {/* Session and Class Controls */}
//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               label="Target Session"
//               value={session}
//               onChange={(e) => setSession(e.target.value)}
//               placeholder="e.g., 2025-2026"
//               helperText="Session for which students will be promoted"
//               disabled={loading || promoting}
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth>
//               <InputLabel>New Class (for all selected)</InputLabel>
//               <Select
//                 value={newClassId}
//                 onChange={(e) => setNewClassId(e.target.value)}
//                 label="New Class"
//                 disabled={loading || promoting}
//               >
//                 <MenuItem value="">
//                   <em>Auto (Individual next class)</em>
//                 </MenuItem>
//                 {classOptions.map((option) => (
//                   <MenuItem key={option.value} value={option.value}>
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//               <Typography variant="caption" color="textSecondary">
//                 Leave empty for automatic next class per student
//               </Typography>
//             </FormControl>
//           </Grid>

//           {/* Search bar */}
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Search Students"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search by name, ID, or class..."
//               disabled={loadingEligible}
//               InputProps={{
//                 startAdornment: (
//                   <Person sx={{ mr: 1, color: "text.secondary" }} />
//                 ),
//               }}
//             />
//           </Grid>

//           {/* Eligible Students Table */}
//           <Grid item xs={12}>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//               <Box sx={{ p: 2, bgcolor: "background.default" }}>
//                 <Box
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     Eligible Students ({filteredStudents.length})
//                   </Typography>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="caption">
//                       Selected: {selectedStudents.length} of{" "}
//                       {filteredStudents.length}
//                     </Typography>
//                     <Tooltip title="Select All">
//                       <Checkbox
//                         indeterminate={
//                           selectedStudents.length > 0 &&
//                           selectedStudents.length < filteredStudents.length
//                         }
//                         checked={
//                           filteredStudents.length > 0 &&
//                           selectedStudents.length === filteredStudents.length
//                         }
//                         onChange={handleSelectAll}
//                         disabled={loadingEligible}
//                       />
//                     </Tooltip>
//                   </Box>
//                 </Box>
//               </Box>

//               <Divider />

//               {loadingEligible ? (
//                 <Box sx={{ p: 4, textAlign: "center" }}>
//                   <CircularProgress size={40} />
//                   <Typography variant="body2" sx={{ mt: 2 }}>
//                     Loading eligible students...
//                   </Typography>
//                 </Box>
//               ) : filteredStudents.length === 0 ? (
//                 <Box sx={{ p: 4, textAlign: "center" }}>
//                   <School
//                     sx={{ fontSize: 60, color: "text.disabled", mb: 2 }}
//                   />
//                   <Typography variant="body1" color="text.secondary">
//                     No eligible students found
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ mt: 1 }}
//                   >
//                     All students from previous session may have been promoted
//                   </Typography>
//                 </Box>
//               ) : (
//                 <TableContainer sx={{ maxHeight: 400 }}>
//                   <Table stickyHeader size="small">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell padding="checkbox">
//                           <Checkbox
//                             indeterminate={
//                               selectedStudents.length > 0 &&
//                               selectedStudents.length < filteredStudents.length
//                             }
//                             checked={
//                               filteredStudents.length > 0 &&
//                               selectedStudents.length ===
//                                 filteredStudents.length
//                             }
//                             onChange={handleSelectAll}
//                           />
//                         </TableCell>
//                         <TableCell>Student</TableCell>
//                         <TableCell>Current Class</TableCell>
//                         <TableCell>Next Class</TableCell>
//                         <TableCell>Session</TableCell>
//                         <TableCell>Roll No</TableCell>
//                         <TableCell>Section</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {filteredStudents.map((student: any) => {
//                         const isSelected = selectedStudents.includes(
//                           student.enrollmentId
//                         );
//                         const currentClass =
//                           student.currentClass?.className || "N/A";
//                         const nextClass = newClassId
//                           ? classOptions.find((c) => c.value === newClassId)
//                               ?.label
//                           : getNextClass(currentClass);

//                         return (
//                           <TableRow
//                             key={student.enrollmentId}
//                             selected={isSelected}
//                             hover
//                             onClick={() =>
//                               handleSelectStudent(student.enrollmentId)
//                             }
//                             sx={{ cursor: "pointer" }}
//                           >
//                             <TableCell padding="checkbox">
//                               <Checkbox checked={isSelected} />
//                             </TableCell>
//                             <TableCell>
//                               <Box>
//                                 <Typography variant="body2" fontWeight="medium">
//                                   {student.studentName}
//                                 </Typography>
//                                 <Typography
//                                   variant="caption"
//                                   color="text.secondary"
//                                 >
//                                   ID: {student.studentIdentifier}
//                                 </Typography>
//                               </Box>
//                             </TableCell>
//                             <TableCell>
//                               <Chip
//                                 label={currentClass}
//                                 size="small"
//                                 icon={<Class fontSize="small" />}
//                                 color="primary"
//                                 variant="outlined"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Chip
//                                 label={nextClass}
//                                 size="small"
//                                 icon={<ArrowForward fontSize="small" />}
//                                 color="success"
//                                 variant="outlined"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body2">
//                                 {student.currentSession}
//                               </Typography>
//                             </TableCell>
//                             <TableCell onClick={(e) => e.stopPropagation()}>
//                               <TextField
//                                 size="small"
//                                 value={
//                                   rollNumbers[student.enrollmentId] ||
//                                   student.currentRollNumber ||
//                                   ""
//                                 }
//                                 onChange={(e) =>
//                                   handleRollNumberChange(
//                                     student.enrollmentId,
//                                     e.target.value
//                                   )
//                                 }
//                                 placeholder="Roll no"
//                                 disabled={!isSelected}
//                                 sx={{ width: 80 }}
//                               />
//                             </TableCell>
//                             <TableCell onClick={(e) => e.stopPropagation()}>
//                               <FormControl size="small" sx={{ width: 80 }}>
//                                 <Select
//                                   value={
//                                     sections[student.enrollmentId] ||
//                                     student.currentSection ||
//                                     ""
//                                   }
//                                   onChange={(e) =>
//                                     handleSectionChange(
//                                       student.enrollmentId,
//                                       e.target.value
//                                     )
//                                   }
//                                   disabled={!isSelected}
//                                 >
//                                   <MenuItem value="A">A</MenuItem>
//                                   <MenuItem value="B">B</MenuItem>
//                                   <MenuItem value="C">C</MenuItem>
//                                 </Select>
//                               </FormControl>
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}
//             </Paper>
//           </Grid>

//           {/* Loading Progress */}
//           {(loading || promoting) && (
//             <Grid item xs={12}>
//               <LinearProgress />
//               <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
//                 Processing promotion...
//               </Typography>
//             </Grid>
//           )}
//         </Grid>
//       </DialogContent>

//       <DialogActions sx={{ px: 3, py: 2 }}>
//         <Button
//           onClick={onClose}
//           variant="outlined"
//           disabled={loading || promoting}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={handlePromote}
//           variant="contained"
//           disabled={
//             loading ||
//             promoting ||
//             selectedStudents.length === 0 ||
//             loadingEligible
//           }
//           startIcon={
//             promoting ? <CircularProgress size={20} /> : <ArrowForward />
//           }
//           color="success"
//         >
//           {promoting
//             ? "Promoting..."
//             : `Promote ${selectedStudents.length} Student(s)`}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PromotionModal;
import React from "react";

export const PromotionModal = () => {
  return <div>PromotionModal</div>;
};
export default PromotionModal;
