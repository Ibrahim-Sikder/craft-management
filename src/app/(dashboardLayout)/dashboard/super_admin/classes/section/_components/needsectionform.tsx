// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */

// "use client"
// import { useMemo, useState, useEffect } from "react"
// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   Paper,
//   Grid,
//   Chip,
//   Fade,
//   ThemeProvider,
//   Stepper,
//   Step,
//   StepLabel,
//   CircularProgress,
//   Snackbar,
//   Alert,
// } from "@mui/material"
// import {
//   ArrowBack as ArrowBackIcon,
//   CheckCircle as CheckCircleIcon,
//   Groups as GroupsIcon,
//   Room as RoomIcon,
//   Info as InfoIcon,
//   Schedule as ScheduleIcon,
//   Bookmark as BookmarkIcon,
//   Save,
//   Add as AddIcon,
//   MeetingRoom as MeetingRoomIcon,
//   AccessTime as AccessTimeIcon,
//   Person,
//   Class,
// } from "@mui/icons-material"
// import { Class as ClassIcon } from "@mui/icons-material"

// import Link from "next/link"
// import { motion } from "framer-motion"
// import RoomModal from "../_components/RoomModal"
// import TimeSlotModal from "../_components/TimeSlotModal"
// import { customTheme } from "@/ThemeStyle"
// import { useCreateSectionMutation, useGetSingleSectionQuery, useUpdateSectionMutation } from "@/redux/api/sectionApi"
// import CraftForm from "@/components/Forms/Form"
// import { useGetAllClassesQuery } from "@/redux/api/classApi"
// import { useGetAllTeachersQuery } from "@/redux/api/teacherApi"
// import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon"
// import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
// import { useGetAllRoomsQuery } from "@/redux/api/roomApi"
// import type { FieldValues } from "react-hook-form"
// import { useGetAllTimeSlotsQuery } from "@/redux/api/timeSlotApi"
// import toast from "react-hot-toast"
// import CraftSelectWithIcon from "@/components/Forms/selectWithIcon"
// import { sectionTypeNames } from "@/options"
// import CraftTextArea from "@/components/Forms/TextArea"
// import CraftSwitch from "@/components/Forms/switch"

// interface FormData {
//   name: string
//   classes: string
//   capacity: number
//   teachers: string
//   rooms: string
//   timeSlots: number[]
//   description: string
//   sectionType: number
//   isActive: boolean
// }

// export default function SectionForm({ id }) {
//   const theme = customTheme

//   // Form state
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     classes: "",
//     capacity: 30,
//     teachers: "",
//     rooms: "",
//     timeSlots: [],
//     description: "",
//     sectionType: 1,
//     isActive: true,
//   })

//   // UI state
//   const [loading, setLoading] = useState(false)
//   const [success, setSuccess] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [showColorPicker, setShowColorPicker] = useState(false)
//   const [activeStep, setActiveStep] = useState(0)
//   const [snackbarOpen, setSnackbarOpen] = useState(false)
//   const [snackbarMessage, setSnackbarMessage] = useState("")
//   const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success")
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(10)
//   const [searchTerm, setSearchTerm] = useState("")

//   // Modal states
//   const [roomModalOpen, setRoomModalOpen] = useState(false)
//   const [timeSlotModalOpen, setTimeSlotModalOpen] = useState(false)
//   const [createSection] = useCreateSectionMutation()
//   const [updateSection] = useUpdateSectionMutation()
//   const { data: classData } = useGetAllClassesQuery({
//     limit: rowsPerPage,
//     page: page + 1,
//     searchTerm: searchTerm,
//   })
//   const { data: teacherData } = useGetAllTeachersQuery({
//     limit: rowsPerPage,
//     page: page + 1,
//     searchTerm: searchTerm,
//   })
//   const { data: roomData } = useGetAllRoomsQuery({
//     limit: rowsPerPage,
//     page: page + 1,
//     searchTerm: searchTerm,
//   })
//   const { data: timeSlotData } = useGetAllTimeSlotsQuery({
//     limit: rowsPerPage,
//     page: page + 1,
//     searchTerm: searchTerm,
//   })

//   const { data: singleSectionData, isLoading } = useGetSingleSectionQuery({ id })



//   const roomOption = useMemo(() => {
//     if (!roomData?.data?.rooms) return []
//     return roomData?.data?.rooms.map((room: any) => ({
//       label: room.name,
//       capacity: room.capacity,
//       value: room._id,
//     }))
//   }, [roomData])

//   const classOption = useMemo(() => {
//     if (!classData?.data?.classes) return []
//     return classData?.data?.classes.map((clg: any) => ({
//       label: clg.className,
//       value: clg._id,
//     }))
//   }, [classData])

//   const teacherOption = useMemo(() => {
//     if (!teacherData?.data) return []
//     return teacherData?.data.map((clg: any) => ({
//       label: clg.name,
//       value: clg._id,
//     }))
//   }, [teacherData])

//   // Handle time slot selection
//   const handleTimeSlotChange = (timeSlotId: number) => {
//     const currentTimeSlots = [...formData.timeSlots]
//     const index = currentTimeSlots.indexOf(timeSlotId)

//     if (index === -1) {
//       currentTimeSlots.push(timeSlotId)
//     } else {
//       currentTimeSlots.splice(index, 1)
//     }

//     setFormData({
//       ...formData,
//       timeSlots: currentTimeSlots,
//     })
//   }

//   // Handle form submission
//   const handleSubmit = async (data: FieldValues) => {
//     const classArray = Array.isArray(data.classes)
//       ? data.classes
//         .map((item: any) => {
//           if (item && typeof item === "object" && "value" in item) {
//             return item.value
//           }
//           return null
//         })
//         .filter(Boolean)
//       : []

//     const teacherArray = Array.isArray(data.teachers)
//       ? data.teachers
//         .map((item: any) => {
//           if (item && typeof item === "object" && "value" in item) {
//             return item.value
//           }
//           return null
//         })
//         .filter(Boolean)
//       : []
//     const roomArray = Array.isArray(data.rooms)
//       ? data.rooms
//         .map((item: any) => {
//           if (item && typeof item === "object" && "value" in item) {
//             return item.value
//           }
//           return null
//         })
//         .filter(Boolean)
//       : []
//     setLoading(true)
//     try {
//       // Format the data as needed for the API
//       const formattedData = {
//         name: data.name,
//         classes: classArray,
//         teachers: teacherArray,
//         capacity: Number(data.capacity),
//         rooms: roomArray,
//         timeSlots: data.timeSlots || formData.timeSlots,
//         sectionType: data.sectionType,
//         description: data.description,
//         isActive: data.isActive !== undefined ? data.isActive : formData.isActive,
//       }

//       if (!id) {
//         const res = await createSection(formattedData).unwrap()

//         if (res.success) {
//           toast.success("Section created successfully!")
//           setActiveStep(0)
        
//         }
//       } else {
//         const res = await updateSection({ id, ...formattedData }).unwrap()

//         if (res.success) {
//           toast.success("Section update successfully!")
//           setActiveStep(0)
//         }
//       }
//     } catch (err: any) {
//       setError(err?.data?.message || "Failed to create section")
//       setSnackbarMessage(err?.data?.message || "Failed to create section")
//       setSnackbarSeverity("error")
//       setSnackbarOpen(true)
//       toast.error(err?.data?.message || "Failed to create section")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Handle stepper navigation
//   const handleNext = async () => {
//     // Only proceed to next step if current step is valid
//     const isValid = await document.querySelector("form").checkValidity()
//     if (isValid) {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1)
//     } else {
//       // Trigger form validation visually
//       document.querySelector("form").reportValidity()
//     }
//   }

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1)
//   }

//   // Steps for the stepper
//   const steps = ["Basic Information", "Scheduling", "Additional Details"]

//   // Close snackbar
//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false)
//   }

//   // Handle room creation success
//   const handleRoomCreated = (room: any) => {
//     setSnackbarMessage("Room created successfully!")
//     setSnackbarSeverity("success")
//     setSnackbarOpen(true)
//     setRoomModalOpen(false)
//     // Here you would typically update your rooms list or refetch data
//   }

//   const handleTimeSlotCreated = (timeSlot: any) => {
//     setSnackbarMessage("Time slot created successfully!")
//     setSnackbarSeverity("success")
//     setSnackbarOpen(true)
//     setTimeSlotModalOpen(false)
//   }

//   // Format class data for autocomplete
//   const formatClassForAutocomplete = (classData: any) => {
//     if (!classData) return null;

//     // If it's already in the right format, return it
//     if (typeof classData === 'object' && 'label' in classData && 'value' in classData) {
//       return classData;
//     }

//     // If it's an array, find the matching class and format it
//     const classId = typeof classData === 'object' && '_id' in classData
//       ? classData._id
//       : classData;

//     const matchingClass = classOption.find(c => c.value === classId);

//     if (matchingClass) {
//       return matchingClass;
//     }

//     // If no match in options but we have class object with className, create a new option
//     if (typeof classData === 'object' && 'className' in classData) {
//       return {
//         label: classData.className,
//         value: classData._id
//       };
//     }

//     return null;
//   };

//   // Format teacher data for autocomplete
//   const formatTeacherForAutocomplete = (teacherData: any) => {
//     if (!teacherData) return null;

//     // If it's already in the right format, return it
//     if (typeof teacherData === 'object' && 'label' in teacherData && 'value' in teacherData) {
//       return teacherData;
//     }

//     // If it's an array, find the matching teacher and format it
//     const teacherId = typeof teacherData === 'object' && '_id' in teacherData
//       ? teacherData._id
//       : teacherData;

//     const matchingTeacher = teacherOption.find(t => t.value === teacherId);

//     if (matchingTeacher) {
//       return matchingTeacher;
//     }

//     // If no match in options but we have teacher object with name, create a new option
//     if (typeof teacherData === 'object' && 'name' in teacherData) {
//       return {
//         label: teacherData.name,
//         value: teacherData._id
//       };
//     }

//     return null;
//   };

//   // Format room data for autocomplete
//   const formatRoomForAutocomplete = (roomData: any) => {
//     if (!roomData) return null;

//     // If it's already in the right format, return it
//     if (typeof roomData === 'object' && 'label' in roomData && 'value' in roomData) {
//       return roomData;
//     }

//     // If it's an array, find the matching room and format it
//     const roomId = typeof roomData === 'object' && '_id' in roomData
//       ? roomData._id
//       : roomData;

//     const matchingRoom = roomOption.find(r => r.value === roomId);

//     if (matchingRoom) {
//       return matchingRoom;
//     }

//     // If no match in options but we have room object with name, create a new option
//     if (typeof roomData === 'object' && 'name' in roomData) {
//       return {
//         label: roomData.name,
//         value: roomData._id,
//         capacity: roomData.capacity || 30
//       };
//     }

//     return null;
//   };

//   const defaultValues = useMemo(() => {
//     if (!singleSectionData?.data) return {};

//     const sectionData = singleSectionData.data;

//     // Format classes for autocomplete
//     let formattedClasses = [];
//     if (sectionData.classes) {
//       // Handle both array and single object cases
//       const classesArray = Array.isArray(sectionData.classes)
//         ? sectionData.classes
//         : [sectionData.classes];

//       formattedClasses = classesArray
//         .map(formatClassForAutocomplete)
//         .filter(Boolean);
//     }

//     // Format teachers for autocomplete
//     let formattedTeachers = [];
//     if (sectionData.teachers) {
//       // Handle both array and single object cases
//       const teachersArray = Array.isArray(sectionData.teachers)
//         ? sectionData.teachers
//         : [sectionData.teachers];

//       formattedTeachers = teachersArray
//         .map(formatTeacherForAutocomplete)
//         .filter(Boolean);
//     }

//     // Format rooms for autocomplete
//     let formattedRooms = [];
//     if (sectionData.rooms) {
//       // Handle both array and single object cases
//       const roomsArray = Array.isArray(sectionData.rooms)
//         ? sectionData.rooms
//         : [sectionData.rooms];

//       formattedRooms = roomsArray
//         .map(formatRoomForAutocomplete)
//         .filter(Boolean);
//     }

//     return {
//       capacity: sectionData.capacity || 30,
//       isActive: sectionData.isActive !== undefined ? sectionData.isActive : true,
//       name: sectionData.name || "",
//       sectionType: sectionData.sectionType || 1,
//       description: sectionData.description || "",
//       classes: formattedClasses,
//       teachers: formattedTeachers,
//       rooms: formattedRooms,
//       timeSlots: sectionData.timeSlots?.map((slot: any) =>
//         typeof slot === 'object' && '_id' in slot ? slot._id : slot
//       ) || [],
//     };
//   }, [singleSectionData, classOption, teacherOption, roomOption]);

//   // Populate timeSlots state when we have data
//   useEffect(() => {
//     if (defaultValues.timeSlots && defaultValues.timeSlots.length > 0) {
//       setFormData(prev => ({
//         ...prev,
//         timeSlots: defaultValues.timeSlots
//       }));
//     }
//   }, [defaultValues.timeSlots]);

//   return (
//     <>
//       {
//         isLoading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
//             <CircularProgress />
//             <Typography variant="h6" sx={{ ml: 2 }}>Loading section data...</Typography>
//           </Box>
//         ) : (
//           <ThemeProvider theme={theme}>
//             <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", borderRadius: 2 }}>
//               <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2 }}>
//                 <Fade in={true} timeout={800}>
//                   <Box>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         mb: 3,
//                         flexWrap: "wrap",
//                         gap: 2,
//                         paddingTop: 2,
//                       }}
//                     >
//                       <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
//                         {id ? "Edit Section" : "+ New Section"}
//                       </Typography>
//                       <Box sx={{ display: "flex", gap: 2 }}>
//                         <Button
//                           variant="outlined"
//                           color="secondary"
//                           startIcon={<MeetingRoomIcon />}
//                           onClick={() => setRoomModalOpen(true)}
//                         >
//                           Add Room
//                         </Button>
//                         <Button
//                           variant="outlined"
//                           color="info"
//                           startIcon={<AccessTimeIcon />}
//                           onClick={() => setTimeSlotModalOpen(true)}
//                         >
//                           Add Time Slot
//                         </Button>
//                         <Button component={Link} href="/dashboard/super_admin/section" startIcon={<ArrowBackIcon />}>
//                           Back to Sections
//                         </Button>
//                       </Box>
//                     </Box>

//                     <Paper
//                       elevation={0}
//                       sx={{
//                         mb: 4,
//                         overflow: "hidden",
//                         borderTop: `4px solid ${theme.palette.primary.main}`,
//                       }}
//                     >
//                       <Box sx={{ p: 3 }}>
//                         <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
//                           {steps.map((label) => (
//                             <Step key={label}>
//                               <StepLabel>{label}</StepLabel>
//                             </Step>
//                           ))}
//                         </Stepper>

//                         <CraftForm
//                           onSubmit={handleSubmit}
//                           defaultValues={defaultValues}
//                         >
//                           {activeStep === 0 && (
//                             <motion.div
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ duration: 0.5 }}
//                             >
//                               <Grid container spacing={3}>
//                                 <Grid item xs={12} md={6}>
//                                   <CraftIntAutoCompleteWithIcon
//                                     name="classes"
//                                     label="Select Classes"
//                                     options={classOption}
//                                     fullWidth
//                                     multiple
//                                     icon={<ClassIcon color="primary" />}
//                                   />
//                                 </Grid>

//                                 <Grid item xs={12} md={6}>
//                                   <CraftInputWithIcon
//                                     label="Section Name"
//                                     name="name"
//                                     InputProps={{
//                                       startAdornment: <BookmarkIcon sx={{ color: "primary.main", mr: 1 }} />,
//                                     }}
//                                     fullWidth
//                                     placeholder="e.g., Section A, Morning Batch"
//                                   />
//                                 </Grid>

//                                 <Grid item xs={12} md={6}>
//                                   <CraftInputWithIcon
//                                     label="Capacity"
//                                     name="capacity"
//                                     type="number"
//                                     required
//                                     fullWidth
//                                     InputProps={{
//                                       startAdornment: <GroupsIcon sx={{ color: "primary.main", mr: 1 }} />,
//                                     }}
//                                   />
//                                 </Grid>

//                                 <Grid item xs={12} md={6}>
//                                   <CraftIntAutoCompleteWithIcon
//                                     name="teachers"
//                                     label="Select Teacher"
//                                     options={teacherOption}
//                                     fullWidth
//                                     multiple
//                                     icon={<Person color="primary" />}
//                                   />
//                                 </Grid>
//                               </Grid>
//                             </motion.div>
//                           )}

//                           {activeStep === 1 && (
//                             <motion.div
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ duration: 0.5 }}
//                             >
//                               <Grid container spacing={3}>
//                                 <Grid item xs={12} md={6}>
//                                   <CraftIntAutoCompleteWithIcon
//                                     name="rooms"
//                                     label="Room"
//                                     options={roomOption}
//                                     fullWidth
//                                     multiple
//                                     icon={<AddIcon color="primary" />}
//                                     renderOption={(props, option) => (
//                                       <li {...props}>
//                                         <Box sx={{ display: "flex", alignItems: "center" }}>
//                                           <RoomIcon fontSize="small" sx={{ mr: 1, color: "action.active" }} />
//                                           <Typography variant="body2">{option.label}</Typography>
//                                           <Typography variant="caption" sx={{ ml: 1, color: "text.secondary" }}>
//                                             (Capacity: {option.capacity})
//                                           </Typography>
//                                         </Box>
//                                       </li>
//                                     )}
//                                   />
//                                 </Grid>

//                                 <Grid item xs={12}>
//                                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                                     <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                                       Time Slots
//                                     </Typography>
//                                     <Button
//                                       size="small"
//                                       startIcon={<AddIcon />}
//                                       onClick={() => setTimeSlotModalOpen(true)}
//                                       variant="outlined"
//                                       color="info"
//                                     >
//                                       Add New Time Slot
//                                     </Button>
//                                   </Box>
//                                   <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                                     Select the time slots for this section
//                                   </Typography>

//                                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                                     {timeSlotData?.data?.timeSlots?.map((slot: any) => (
//                                       <Chip
//                                         key={slot._id}
//                                         label={`${slot.day} ${slot.startTime} - ${slot.endTime}`}
//                                         onClick={() => handleTimeSlotChange(slot._id)}
//                                         color={
//                                           (formData.timeSlots).includes(slot._id)
//                                             ? "primary"
//                                             : "default"
//                                         }
//                                         variant={
//                                           (formData.timeSlots).includes(slot._id)
//                                             ? "filled"
//                                             : "outlined"
//                                         }
//                                         icon={<ScheduleIcon />}
//                                         sx={{
//                                           px: 1,
//                                           "& .MuiChip-icon": {
//                                             color: (formData.timeSlots).includes(slot._id)
//                                               ? "inherit"
//                                               : "action.active",
//                                           },
//                                         }}
//                                       />
//                                     ))}
//                                   </Box>
//                                 </Grid>
//                               </Grid>
//                             </motion.div>
//                           )}

//                           {activeStep === 2 && (
//                             <motion.div
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ duration: 0.5 }}
//                             >
//                               <Grid container spacing={3}>
//                                 <Grid item xs={12} md={6}>
//                                   <CraftSelectWithIcon
//                                     name="sectionType"
//                                     size="medium"
//                                     label="Section Type "
//                                     placeholder="Section Type "
//                                     items={sectionTypeNames}
//                                     adornment={<Class color="action" />}
//                                   />
//                                 </Grid>

//                                 <Grid item xs={12}>
//                                   <CraftTextArea
//                                     label="Description"
//                                     name="description"
//                                     placeholder="Add any additional details about this section..."
//                                     required
//                                     fullWidth
//                                     InputProps={{
//                                       startAdornment: <GroupsIcon sx={{ color: "primary.main", mr: 1 }} />,
//                                     }}
//                                   />
//                                 </Grid>

//                                 <Grid item xs={12}>
//                                   <CraftSwitch
//                                     color="primary"
//                                     label="Active Section"
//                                     name="isActive"
//                                   />

//                                   <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
//                                     Inactive sections won&apos;t appear in schedules and student assignments
//                                   </Typography>
//                                 </Grid>
//                               </Grid>
//                             </motion.div>
//                           )}

//                           <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//                             <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
//                               Back
//                             </Button>
//                             <Box>
//                               {activeStep === steps.length - 1 ? (
//                                 <Button
//                                   variant="contained"
//                                   color="primary"
//                                   type="submit"
//                                   disabled={loading}
//                                   onClick={(e) => {
//                                     // Prevent default form submission behavior
//                                     if (activeStep !== steps.length - 1) {
//                                       e.preventDefault()
//                                       return
//                                     }

//                                     // Check if required fields are filled
//                                     const form = document.querySelector("form")
//                                     if (!form.checkValidity()) {
//                                       e.preventDefault()
//                                       form.reportValidity()
//                                     }
//                                   }}
//                                   startIcon={
//                                     loading ? (
//                                       <CircularProgress size={20} color="inherit" />
//                                     ) : success ? (
//                                       <CheckCircleIcon />
//                                     ) : (
//                                       <Save />
//                                     )
//                                   }
//                                   sx={{
//                                     px: 4,
//                                     py: 1.5,
//                                     fontSize: "1rem",
//                                     boxShadow: "0px 8px 16px rgba(99, 102, 241, 0.2)",
//                                     "&:hover": {
//                                       boxShadow: "0px 8px 20px rgba(99, 102, 241, 0.4)",
//                                     },
//                                   }}
//                                 >
//                                   {loading ? "Saving..." : success ? "Saved!" : "Save Section"}
//                                 </Button>
//                               ) : (
//                                 <Button
//                                   variant="contained"
//                                   color="primary"
//                                   onClick={handleNext}
//                                   sx={{
//                                     px: 4,
//                                   }}
//                                 >
//                                   Next
//                                 </Button>
//                               )}
//                             </Box>
//                           </Box>
//                         </CraftForm>
//                       </Box>
//                     </Paper>

//                     <Paper elevation={0} sx={{ p: 3, bgcolor: "rgba(59, 130, 246, 0.05)", mb: 4 }}>
//                       <Box sx={{ display: "flex", alignItems: "flex-start" }}>
//                         <InfoIcon color="info" sx={{ mr: 2, mt: 0.5 }} />
//                         <Box>
//                           <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "info.main" }}>
//                             Section Management Tips
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             Sections help you organize students within a class. You can create multiple sections for a single
//                             class to manage different batches, schedules, or teaching approaches. Each section can have its
//                             own teacher, schedule, and room assignment.
//                           </Typography>
//                           <Box sx={{ mt: 2 }}>
//                             <Chip
//                               icon={<CheckCircleIcon />}
//                               label="Assign a dedicated teacher to each section"
//                               variant="outlined"
//                               color="info"
//                               sx={{ mr: 1, mb: 1 }}
//                             />
//                             <Chip
//                               icon={<CheckCircleIcon />}
//                               label="Set appropriate capacity based on room size"
//                               variant="outlined"
//                               color="info"
//                               sx={{ mr: 1, mb: 1 }}
//                             />
//                             <Chip
//                               icon={<CheckCircleIcon />}
//                               label="Use color coding for easy identification"
//                               variant="outlined"
//                               color="info"
//                               sx={{ mr: 1, mb: 1 }}
//                             />
//                           </Box>
//                         </Box>
//                       </Box>
//                     </Paper>
//                   </Box>
//                 </Fade>
//               </Container>
//             </Box>

//             {/* Room Modal */}
//             <RoomModal open={roomModalOpen} onClose={() => setRoomModalOpen(false)} onSave={handleRoomCreated} />

//             {/* Time Slot Modal */}
//             <TimeSlotModal
//               open={timeSlotModalOpen}
//               onClose={() => setTimeSlotModalOpen(false)}
//               onSave={handleTimeSlotCreated}
//             />

//             {/* Snackbar for notifications */}
//             <Snackbar
//               open={snackbarOpen}
//               autoHideDuration={6000}
//               onClose={handleCloseSnackbar}
//               anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//             >
//               <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" sx={{ width: "100%" }}>
//                 {snackbarMessage}
//               </Alert>
//             </Snackbar>
//           </ThemeProvider>
//         )
//       }
//     </>
//   )
// }