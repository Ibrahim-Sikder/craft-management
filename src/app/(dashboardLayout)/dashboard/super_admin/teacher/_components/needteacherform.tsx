// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import {
//   Box,
//   Button,
//   Card,
//   Container,
//   FormControlLabel,
//   Grid,
//   Paper,
//   Switch,
//   Typography,
//   Stepper,
//   Step,
//   StepLabel,
//   StepContent,
//   Alert,
//   Snackbar,
//   Backdrop,
//   CircularProgress,
//   IconButton,
// } from "@mui/material"
// import {
//   Person,
//   Home,
//   School,
//   AttachMoney,
//   Save,
//   Badge,
//   Phone,
//   Bloodtype,
//   DriveFileRenameOutline,
//   ContactPhone,
//   LocationOn,
//   CalendarMonth,
//   CheckCircle,
//   ArrowBack,
//   Clear,
//   Help,
//   Email,
//   Language,
//   Wc,
//   CardMembership,
//   BusinessCenter,
//   Apartment,
//   Work,
//   VerifiedUser,
//   Group,
//   Add,
// } from "@mui/icons-material"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import CraftForm from "@/components/Forms/Form"
// import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
// import CraftSelectWithIcon from "@/components/Forms/selectWithIcon"
// import {
//   bloodGroup,
//   departments,
//   designations,
//   genders,
//   languages,
//   maritalStatuses,
//   staffTypes,
//   statusOptions,
// } from "@/options"
// import { useCreateTeacherMutation, useGetSingleTeacherQuery, useUpdateTeacherMutation } from "@/redux/api/teacherApi"
// import FileUploadWithIcon from "@/components/Forms/Upload"
// import CraftDatePicker from "@/components/Forms/DatePicker"
// import toast from "react-hot-toast"

// interface TeacherFormProps {
//   id?: string
// }

// export default function TeacherForm({ id }: TeacherFormProps = {}) {
//   const router = useRouter()
//   const [activeStep, setActiveStep] = useState(0)
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success" as "success" | "error",
//   })

//   const [success, setSuccess] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
//   const [previewImage, setPreviewImage] = useState<string | null>(null)
//   const [defaultValues, setDefaultValues] = useState<any>({})

//   const [educationalQualifications, setEducationalQualifications] = useState<any[]>([
//     { degree: "", institution: "", specialization: "", year: "" },
//   ])
//   const [certifications, setCertifications] = useState<any[]>([{ name: "", issuedBy: "", year: "", description: "" }])
//   const [workExperience, setWorkExperience] = useState<any[]>([
//     { organization: "", position: "", from: "", to: "", description: "" },
//   ])

//   // Add API hooks
//   const [createTeacher] = useCreateTeacherMutation()
//   const [updateTeacher] = useUpdateTeacherMutation({})
//   const { data: singlesTeacher, isLoading } = useGetSingleTeacherQuery(
//     { id },
//     {
//       skip: !id,
//       refetchOnMountOrArgChange: true,
//     },
//   )

//   useEffect(() => {
//     if (singlesTeacher && singlesTeacher.data) {
//       const teacher = singlesTeacher.data

//       // Set selected subjects if available
//       if (teacher.professionalInfo?.subjectsTaught) {
//         setSelectedSubjects(teacher.professionalInfo.subjectsTaught)
//       }

//       // Initialize educational qualifications
//       if (teacher.educationalQualifications && teacher.educationalQualifications.length > 0) {
//         setEducationalQualifications(teacher.educationalQualifications)
//       }

//       // Initialize certifications
//       if (teacher.certifications && teacher.certifications.length > 0) {
//         setCertifications(teacher.certifications)
//       }

//       // Initialize work experience
//       if (teacher.workExperience && teacher.workExperience.length > 0) {
//         setWorkExperience(teacher.workExperience)
//       }

//       // Create comprehensive default values object
//       const formDefaultValues = {
//         // Basic Information
//         teacherId: teacher.teacherId || "",
//         teacherSerial: teacher.teacherSerial || "",
//         smartIdCard: teacher.smartIdCard || "",
//         name: teacher.name || "",
//         englishName: teacher.englishName || "",
//         phone: teacher.phone || "",
//         email: teacher.email || "",
//         dateOfBirth: teacher.dateOfBirth || "",
//         bloodGroup: teacher.bloodGroup || "",
//         gender: teacher.gender || "",
//         nationality: teacher.nationality || "",
//         religion: teacher.religion || "",
//         maritalStatus: teacher.maritalStatus || "",

//         // Address Information - Permanent
//         address: teacher.permanentAddress?.address || "",
//         village: teacher.permanentAddress?.village || "",
//         postOffice: teacher.permanentAddress?.postOffice || "",
//         thana: teacher.permanentAddress?.thana || "",
//         district: teacher.permanentAddress?.district || "",
//         state: teacher.permanentAddress?.state || "",
//         country: teacher.permanentAddress?.country || "",
//         zipCode: teacher.permanentAddress?.zipCode || "",

//         sameAsPermanent: teacher.currentAddress?.sameAsPermanent || false,

//         // Professional Information
//         designation: teacher?.designation || "",
//         department: teacher.department || "",
//         joiningDate: teacher?.joiningDate || "",
//         monthlySalary: teacher?.monthlySalary || "",
//         staffType: teacher?.staffType || "",
//         residenceType: teacher?.residenceType || "",

//         accountName: teacher.bankDetails?.accountName || "",
//         accountNumber: teacher.bankDetails?.accountNumber || "",
//         bankName: teacher.bankDetails?.bankName || "",
//         branchName: teacher.bankDetails?.branchName || "",
//         ifscCode: teacher.bankDetails?.ifscCode || "",

//         // Additional Information
//         status: teacher?.status || "Active",
//         language: teacher?.language || "",
//         activeSession: teacher?.activeSession || "",

//         // educational info
//         teacherPhoto: teacher.teacherPhoto,

//         // Emergency Contact
//         "emergencyContact.name": teacher.emergencyContact?.name || "",
//         "emergencyContact.relation": teacher.emergencyContact?.relation || "",
//         "emergencyContact.phone": teacher.emergencyContact?.phone || "",

//         // Social Media
//         "socialMedia.facebook": teacher.socialMedia?.facebook || "",
//         "socialMedia.twitter": teacher.socialMedia?.twitter || "",
//         "socialMedia.youtube": teacher.socialMedia?.youtube || "",
//         "socialMedia.linkedin": teacher.socialMedia?.linkedin || "",
//         "socialMedia.instagram": teacher.socialMedia?.instagram || "",
//       }

//       // Add educational qualifications to default values
//       if (teacher.educationalQualifications && teacher.educationalQualifications.length > 0) {
//         teacher.educationalQualifications.forEach((edu, index) => {
//           formDefaultValues[`educationalQualifications[${index}].degree`] = edu.degree || ""
//           formDefaultValues[`educationalQualifications[${index}].institution`] = edu.institution || ""
//           formDefaultValues[`educationalQualifications[${index}].specialization`] = edu.specialization || ""
//           formDefaultValues[`educationalQualifications[${index}].year`] = edu.year || ""
//         })
//       }

//       // Add certifications to default values
//       if (teacher.certifications && teacher.certifications.length > 0) {
//         teacher.certifications.forEach((cert, index) => {
//           formDefaultValues[`certifications[${index}].name`] = cert.name || ""
//           formDefaultValues[`certifications[${index}].issuedBy`] = cert.issuedBy || ""
//           formDefaultValues[`certifications[${index}].year`] = cert.year || ""
//           formDefaultValues[`certifications[${index}].description`] = cert.description || ""
//         })
//       }

//       // Add work experience to default values
//       if (teacher.workExperience && teacher.workExperience.length > 0) {
//         teacher.workExperience.forEach((exp, index) => {
//           formDefaultValues[`workExperience[${index}].organization`] = exp.organization || ""
//           formDefaultValues[`workExperience[${index}].position`] = exp.position || ""
//           formDefaultValues[`workExperience[${index}].from`] = exp.from || ""
//           formDefaultValues[`workExperience[${index}].to`] = exp.to || ""
//           formDefaultValues[`workExperience[${index}].description`] = exp.description || ""
//         })
//       }

//       setDefaultValues(formDefaultValues)
//     }
//   }, [singlesTeacher])

//   const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

//   const addEducation = () => {
//     setEducationalQualifications([
//       ...educationalQualifications,
//       { degree: "", institution: "", specialization: "", year: "" },
//     ])
//   }

//   const removeEducation = (index: number) => {
//     if (educationalQualifications.length > 1) {
//       const newEducations = [...educationalQualifications]
//       newEducations.splice(index, 1)
//       setEducationalQualifications(newEducations)
//     }
//   }

//   const addCertification = () => {
//     setCertifications([...certifications, { name: "", issuedBy: "", year: "", description: "" }])
//   }

//   const removeCertification = (index: number) => {
//     if (certifications.length > 1) {
//       const newCertifications = [...certifications]
//       newCertifications.splice(index, 1)
//       setCertifications(newCertifications)
//     }
//   }

//   const addExperience = () => {
//     setWorkExperience([...workExperience, { organization: "", position: "", from: "", to: "", description: "" }])
//   }

//   const removeExperience = (index: number) => {
//     if (workExperience.length > 1) {
//       const newExperiences = [...workExperience]
//       newExperiences.splice(index, 1)
//       setWorkExperience(newExperiences)
//     }
//   }

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1)
//   }

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1)
//   }

//   const handleReset = () => {
//     setActiveStep(0)
//   }

//   const handleSubmit = async (data: any) => {
//     setIsSubmitting(true)

//     // Validation
//     if (!data.name) {
//       toast.error("Teacher name is required!")
//       setIsSubmitting(false)
//       return
//     } else if (!data.gender) {
//       toast.error("Gender is required!")
//       setIsSubmitting(false)
//       return
//     } else if (!data.email) {
//       toast.error("Email is required!")
//       setIsSubmitting(false)
//       return
//     } else if (!data.dateOfBirth) {
//       toast.error("Date of Birth is required!")
//       setIsSubmitting(false)
//       return
//     }

//     try {
//       const monthlySalaryNum = data.monthlySalary ? Number(data.monthlySalary) : undefined
//       const teacherSerialNum = data.teacherSerial ? Number(data.teacherSerial) : undefined

//       // Process educational qualifications from form data
//       const processedEducationalQualifications = educationalQualifications
//         .map((_, index) => {
//           return {
//             degree: data[`educationalQualifications[${index}].degree`] || "",
//             institution: data[`educationalQualifications[${index}].institution`] || "",
//             specialization: data[`educationalQualifications[${index}].specialization`] || "",
//             year: data[`educationalQualifications[${index}].year`] || "",
//           }
//         })
//         .filter((edu) => edu.degree)

//       // Process certifications from form data
//       const processedCertifications = certifications
//         .map((_, index) => {
//           return {
//             name: data[`certifications[${index}].name`] || "",
//             issuedBy: data[`certifications[${index}].issuedBy`] || "",
//             year: data[`certifications[${index}].year`] || "",
//             description: data[`certifications[${index}].description`] || "",
//           }
//         })
//         .filter((cert) => cert.name)

//       // Process work experience from form data
//       const processedWorkExperience = workExperience
//         .map((_, index) => {
//           return {
//             organization: data[`workExperience[${index}].organization`] || "",
//             position: data[`workExperience[${index}].position`] || "",
//             from: data[`workExperience[${index}].from`] || "",
//             to: data[`workExperience[${index}].to`] || "",
//             description: data[`workExperience[${index}].description`] || "",
//           }
//         })
//         .filter((exp) => exp.organization)

//       const submissionData = {
//         ...data,
//         teacherId: data.teacherId,
//         teacherSerial: teacherSerialNum,
//         smartIdCard: data.smartIdCard,
//         name: data.name,
//         phone: data.phone,
//         email: data.email,
//         dateOfBirth: data.dateOfBirth,
//         bloodGroup: data.bloodGroup,
//         gender: data.gender,
//         nationality: data.nationality,
//         religion: data.religion,
//         maritalStatus: data.maritalStatus,
//         teacherPhoto: data.teacherPhoto,

//         permanentAddress: {
//           address: data.address,
//           village: data.village,
//           postOffice: data.postOffice,
//           thana: data.thana,
//           district: data.district,
//           state: data.state,
//           country: data.country,
//           zipCode: data.zipCode,
//         },

//         currentAddress: {
//           address: data.address,
//           village: data.village,
//           postOffice: data.postOffice,
//           thana: data.thana,
//           district: data.thana,
//           state: data.state,
//           country: data.country,
//           zipCode: data.zipCode,
//         },

//         sameAsPermanent: data.sameAsPermanent,
//         designation: data.designation,
//         department: data.department,
//         joiningDate: data.joiningDate,
//         monthlySalary: monthlySalaryNum,
//         staffType: data.staffType,

//         // Use the processed arrays instead of the state variables
//         educationalQualifications: processedEducationalQualifications,
//         certifications: processedCertifications,
//         workExperience: processedWorkExperience,

//         status: data.status || "Active",
//         language: data.language,
//         activeSession: data.activeSession,
//       }

//       console.log("Submission data:", submissionData)

//       if (id) {
//         const res = await updateTeacher({ id, data: submissionData }).unwrap()
//         if (res.success) {
//           setSuccess(true)
//           setSnackbar({
//             open: true,
//             message: "Teacher updated successfully!",
//             severity: "success",
//           })
//           setTimeout(() => {
//             router.push("/dashboard/super_admin/teacher/list")
//           }, 2000)
//         }
//       } else {
//         const res = await createTeacher(submissionData).unwrap()
//         if (res.success) {
//           setSuccess(true)
//           setSnackbar({
//             open: true,
//             message: "Teacher registered successfully!",
//             severity: "success",
//           })
//           setTimeout(() => {
//             router.push("/dashboard/super_admin/teacher/list")
//           }, 2000)
//         }
//       }
//     } catch (error: any) {
//       console.error("❌ Submission error:", error)
//       toast.error("An error occurred while submitting the form. Please try again.")
//       setIsSubmitting(false)
//       // const errorSources = error?.data?.errorSources;
//       // if (Array.isArray(errorSources) && errorSources.length > 0) {
//       //   const firstError = errorSources[0];
//       //   const field = firstError?.path || "Field";
//       //   const message = firstError?.message || "is invalid";
//       // toast.error(`${field}: ${message}`);
//     }
//   }

//   // Add handleCloseSnackbar function
//   const handleCloseSnackbar = () => {
//     setSnackbar({
//       ...snackbar,
//       open: false,
//     })
//   }

//   if (isLoading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//         <Typography variant="h6" sx={{ ml: 2 }}>
//           Loading...
//         </Typography>
//       </Box>
//     )
//   }

//   const steps = [
//     {
//       label: "Basic Information",
//       description: "Enter teacher's personal details",
//       icon: <Person />,
//       content: (
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={4}>
//             <CraftInputWithIcon
//               fullWidth
//               label={
//                 <span>
//                   Full Name <span style={{ color: "red" }}>*</span>
//                 </span>
//               }
//               name="name"
//               size="medium"
//               InputProps={{
//                 startAdornment: <DriveFileRenameOutline sx={{ color: "text.secondary", mr: 1 }} />,
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <CraftInputWithIcon
//               fullWidth
//               label="Teacher Serial"
//               name="teacherSerial"
//               type="number"
//               size="medium"
//               InputProps={{
//                 startAdornment: <Badge sx={{ color: "text.secondary", mr: 1 }} />,
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <CraftInputWithIcon
//               fullWidth
//               label="Smart ID Card"
//               name="smartIdCard"
//               size="medium"
//               InputProps={{
//                 startAdornment: <CardMembership sx={{ color: "text.secondary", mr: 1 }} />,
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <CraftInputWithIcon
//               fullWidth
//               label="Phone Number"
//               name="phone"
//               size="medium"
//               InputProps={{
//                 startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <CraftInputWithIcon
//               fullWidth
//               label={
//                 <span>
//                   Email Address <span style={{ color: "red" }}>*</span>
//                 </span>
//               }
//               name="email"
//               type="email"
//               size="medium"
//               InputProps={{
//                 startAdornment: <Email sx={{ color: "text.secondary", mr: 1 }} />,
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <CraftDatePicker
//               fullWidth
//               label={
//                 <span>
//                   Date of Birth <span style={{ color: "red" }}>*</span>
//                 </span>
//               }
//               name="dateOfBirth"
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <CraftSelectWithIcon
//               name="bloodGroup"
//               size="medium"
//               label="Blood Group"
//               placeholder="Select blood group"
//               items={bloodGroup}
//               adornment={<Bloodtype color="action" />}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <CraftSelectWithIcon
//               name="gender"
//               size="medium"
//               label={
//                 <span>
//                   Gender <span style={{ color: "red" }}>*</span>
//                 </span>
//               }
//               placeholder="Select Gender"
//               items={genders}
//               adornment={<Wc color="action" />}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <CraftInputWithIcon
//               fullWidth
//               label="Nationality"
//               name="nationality"
//               size="medium"
//               InputProps={{
//                 startAdornment: <Language sx={{ color: "text.secondary", mr: 1 }} />,
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <CraftInputWithIcon
//               fullWidth
//               label="Religion"
//               name="religion"
//               size="medium"
//               InputProps={{
//                 startAdornment: <VerifiedUser sx={{ color: "text.secondary", mr: 1 }} />,
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <CraftSelectWithIcon
//               name="maritalStatus"
//               size="medium"
//               label="Marital Status"
//               placeholder="Select Marital Status"
//               items={maritalStatuses}
//               adornment={<Group color="action" />}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <FileUploadWithIcon name="teacherPhoto" label="Teacher Photo" />
//           </Grid>
//         </Grid>
//       ),
//     },
//     // Rest of your steps...
//     {
//       label: "Address Information",
//       description: "Enter permanent and present address",
//       icon: <Home />,
//       content: (
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
//               Permanent Address
//             </Typography>
//             <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Address Line"
//                     name="address"
//                     size="medium"
//                     multiline
//                     rows={2}
//                     InputProps={{
//                       startAdornment: (
//                         <LocationOn sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Village/Area"
//                     name="village"
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Post Office"
//                     name="postOffice"
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Thana/Police Station"
//                     name="thana"
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="District"
//                     name="district"
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="State/Province"
//                     name="state"
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Country"
//                     name="country"
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <Language sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Zip/Postal Code"
//                     name="zipCode"
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
//               <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
//                 Present Address
//               </Typography>
//               <FormControlLabel
//                 control={<Switch name="sameAsPermanent" onChange={handleSwitchChange} color="primary" />}
//                 label="Same as Permanent"
//               />
//             </Box>
//             <Card
//               variant="outlined"
//               sx={{
//                 p: 2,
//                 borderRadius: 2,
//               }}
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Address Line"
//                     name="currentAddress.address"
//                     size="medium"
//                     multiline
//                     rows={2}
//                     InputProps={{
//                       startAdornment: (
//                         <LocationOn sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 {/* Rest of your current address fields */}
//               </Grid>
//             </Card>
//           </Grid>
//         </Grid>
//       ),
//     },
//     {
//       label: "Professional Information",
//       description: "Enter professional and employment details",
//       icon: <BusinessCenter />,
//       content: (
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <CraftSelectWithIcon
//               name="designation"
//               size="medium"
//               label="Designation"
//               placeholder="Select Designation"
//               items={designations}
//               adornment={<BusinessCenter color="action" />}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <CraftSelectWithIcon
//               name="department"
//               size="medium"
//               label="Department"
//               placeholder="Select Department"
//               items={departments}
//               adornment={<Apartment color="action" />}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <CraftDatePicker
//               fullWidth
//               label="Joining Date"
//               name="joiningDate"
//               size="medium"
//               // InputProps={{
//               //   startAdornment: <EventNote sx={{ color: "text.secondary", mr: 1 }} />,
//               // }}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <CraftInputWithIcon
//               fullWidth
//               label="Monthly Salary"
//               name="monthlySalary"
//               type="number"
//               size="medium"
//               InputProps={{
//                 startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <CraftSelectWithIcon
//               name="staffType"
//               size="medium"
//               label="Staff Type"
//               placeholder="Select Staff Type"
//               items={staffTypes}
//               adornment={<Work color="action" />}
//             />
//           </Grid>
//           {/* Rest of your professional information fields */}
//         </Grid>
//       ),
//     },
//     // Educational Information and Additional Information steps...
//     {
//       label: "Educational Information",
//       description: "Enter educational qualifications and certifications",
//       icon: <School />,
//       content: (
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" color="primary" gutterBottom>
//               Educational Qualifications
//             </Typography>
//           </Grid>
//           {educationalQualifications.map((education, index) => (
//             <Paper key={index} elevation={2} sx={{ p: 2, mb: 3, position: "relative", borderRadius: 2, width: "100%" }}>
//               <IconButton
//                 size="small"
//                 sx={{
//                   position: "absolute",
//                   top: 8,
//                   right: 8,
//                   color: "error.main",
//                 }}
//                 onClick={() => removeEducation(index)}
//                 disabled={educationalQualifications.length === 1}
//               >
//                 <Clear fontSize="small" />
//               </IconButton>

//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Degree/Certificate"
//                     name={`educationalQualifications[${index}].degree`}
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <School sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Institution"
//                     name={`educationalQualifications[${index}].institution`}
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <BusinessCenter sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Year of Completion"
//                     name={`educationalQualifications[${index}].year`}
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Specialization"
//                     name={`educationalQualifications[${index}].specialization`}
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <School sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Paper>
//           ))}

//           <Grid item md={12}>
//             <Button variant="outlined" startIcon={<Add />} onClick={addEducation} sx={{ mb: 4, borderRadius: 100 }}>
//               Add Education
//             </Button>
//           </Grid>

//           <Grid container>
//             <Grid item>
//               <Typography variant="h6" color="primary" gutterBottom>
//                 Certifications
//               </Typography>
//             </Grid>
//           </Grid>
//           {certifications.map((certification, index) => (
//             <Paper key={index} elevation={2} sx={{ p: 2, mb: 3, position: "relative", borderRadius: 2, width: "100%" }}>
//               <IconButton
//                 size="small"
//                 sx={{
//                   position: "absolute",
//                   top: 8,
//                   right: 8,
//                   color: "error.main",
//                 }}
//                 onClick={() => removeCertification(index)}
//                 disabled={certifications.length === 1}
//               >
//                 <Clear fontSize="small" />
//               </IconButton>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Certificate Name"
//                     name={`certifications[${index}].name`}
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <CardMembership sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Issued By"
//                     name={`certifications[${index}].issuedBy`}
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <BusinessCenter sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Year"
//                     name={`certifications[${index}].year`}
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Description"
//                     name={`certifications[${index}].description`}
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <CardMembership sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Paper>
//           ))}

//           <Grid item md={12}>
//             <Button variant="outlined" startIcon={<Add />} onClick={addCertification} sx={{ mb: 4, borderRadius: 100 }}>
//               Add Certification
//             </Button>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" color="primary" gutterBottom>
//               Work Experience
//             </Typography>
//           </Grid>

//           {workExperience.map((experience, index) => (
//             <Paper key={index} elevation={2} sx={{ p: 2, mb: 3, position: "relative", borderRadius: 2, width: "100%" }}>
//               <IconButton
//                 size="small"
//                 sx={{
//                   position: "absolute",
//                   top: 8,
//                   right: 8,
//                   color: "error.main",
//                 }}
//                 onClick={() => removeExperience(index)}
//                 disabled={workExperience.length === 1}
//               >
//                 <Clear fontSize="small" />
//               </IconButton>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Organization"
//                     name={`workExperience[${index}].organization`}
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <BusinessCenter sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Position"
//                     name={`workExperience[${index}].position`}
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="From (Year)"
//                     name={`workExperience[${index}].from`}
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="To (Year or Present)"
//                     name={`workExperience[${index}].to`}
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Description"
//                     name={`workExperience[${index}].description`}
//                     multiline
//                     rows={2}
//                     size="medium"
//                     InputProps={{
//                       startAdornment: (
//                         <BusinessCenter sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Paper>
//           ))}
//           <Button variant="outlined" startIcon={<Add />} onClick={addExperience} sx={{ borderRadius: 100 }}>
//             Add Experience
//           </Button>
//         </Grid>
//       ),
//     },
//     {
//       label: "Additional Information",
//       description: "Enter emergency contacts and social media profiles",
//       icon: <ContactPhone />,
//       content: (
//         <Grid container spacing={3}>
//           {/* Your additional information fields */}
//           <Grid item xs={12}>
//             <Typography variant="h6" color="primary" gutterBottom>
//               Other Information
//             </Typography>
//             <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <CraftSelectWithIcon
//                     name="status"
//                     size="medium"
//                     label="Status"
//                     placeholder="Select Status"
//                     items={statusOptions}
//                     adornment={<VerifiedUser color="action" />}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftSelectWithIcon
//                     name="language"
//                     size="medium"
//                     label="Preferred Language"
//                     placeholder="Select Language"
//                     items={languages}
//                     adornment={<Language color="action" />}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Active Session"
//                     name="activeSession"
//                     size="medium"
//                     InputProps={{
//                       startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Card>
//           </Grid>
//         </Grid>
//       ),
//     },
//   ]

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(to bottom, #f9f9f9, #f0f0f0)",
//         pt: 2,
//         pb: 8,
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           background: "linear-gradient(135deg, #4F0187 0%, #4F0187 100%)",
//           color: "white",
//           py: 3,
//           mb: 4,
//           borderRadius: { xs: 0, md: "0 0 20px 20px" },
//           boxShadow: "0 4px 20px rgba(33, 150, 243, 0.4)",
//         }}
//       >
//         <Container maxWidth="xl">
//           <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//             <Person sx={{ fontSize: 40, mr: 2 }} />
//             <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
//               {id ? "Edit Teacher" : "New Teacher Registration"}
//             </Typography>
//           </Box>
//           <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 700 }}>
//             {id
//               ? "Update teacher information by modifying the  fields."
//               : "Register a new teacher by filling in the  information. Follow the steps to complete the registration process."}
//           </Typography>
//         </Container>
//       </Box>

//       <Container maxWidth="xl">
//         <Box sx={{ mb: 3 }}>
//           <Link href="/dashboard/super_admin/teacher/list" passHref>
//             <Button
//               startIcon={<ArrowBack />}
//               variant="outlined"
//               sx={{
//                 borderRadius: 100,
//                 borderColor: "rgba(0,0,0,0.12)",
//                 color: "text.secondary",
//                 px: 3,
//               }}
//             >
//               Back to Teacher List
//             </Button>
//           </Link>
//         </Box>

//         <CraftForm
//           onSubmit={handleSubmit}
//           defaultValues={defaultValues}
//           key={Object.keys(defaultValues).length > 0 ? "form-with-data" : "empty-form"}
//         >
//           <Paper
//             elevation={3}
//             sx={{
//               borderRadius: 4,
//               overflow: "hidden",
//               boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
//               mb: 4,
//             }}
//           >
//             <Box sx={{ p: { xs: 2, md: 4 } }}>
//               <Stepper activeStep={activeStep} orientation="vertical">
//                 {steps.map((step, index) => (
//                   <Step key={step.label}>
//                     <StepLabel
//                       StepIconProps={{
//                         icon: step.icon,
//                       }}
//                     >
//                       <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                         {step.label}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {step.description}
//                       </Typography>
//                     </StepLabel>
//                     <StepContent>
//                       <Box sx={{ mt: 2, mb: 1 }}>{step.content}</Box>
//                       <Box sx={{ mb: 2, mt: 4, display: "flex", gap: 2 }}>
//                         <Button
//                           disabled={index === 0}
//                           onClick={handleBack}
//                           sx={{
//                             borderRadius: 100,
//                             px: 3,
//                           }}
//                         >
//                           Back
//                         </Button>
//                         {index === steps.length - 1 ? (
//                           <Button
//                             variant="contained"
//                             type="submit"
//                             startIcon={<Save />}
//                             sx={{
//                               borderRadius: 100,
//                               background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
//                               boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
//                               px: 3,
//                             }}
//                           >
//                             {id ? "Update Teacher" : "Register Teacher"}
//                           </Button>
//                         ) : (
//                           <Button
//                             variant="contained"
//                             onClick={handleNext}
//                             sx={{
//                               borderRadius: 100,
//                               background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
//                               boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
//                               px: 3,
//                             }}
//                           >
//                             Continue
//                           </Button>
//                         )}
//                         <Button
//                           variant="outlined"
//                           onClick={handleReset}
//                           startIcon={<Clear />}
//                           sx={{
//                             borderRadius: 100,
//                             borderColor: "rgba(0,0,0,0.12)",
//                             color: "text.secondary",
//                             px: 3,
//                             ml: "auto",
//                           }}
//                         >
//                           Reset
//                         </Button>
//                       </Box>
//                     </StepContent>
//                   </Step>
//                 ))}
//               </Stepper>
//             </Box>
//           </Paper>
//         </CraftForm>

//         {/* Help Card */}
//         <Paper
//           elevation={2}
//           sx={{
//             p: 3,
//             borderRadius: 4,
//             background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
//             display: "flex",
//             alignItems: "flex-start",
//             gap: 2,
//           }}
//         >
//           <Help sx={{ color: "#2e7d32", mt: 0.5 }} />
//           <Box>
//             <Typography variant="subtitle1" sx={{ color: "#2e7d32", fontWeight: 600 }}>
//               Need Help?
//             </Typography>
//             <Typography variant="body2" sx={{ color: "#1b5e20" }}>
//               Registering a teacher is the first step in the onboarding process. After registration, you can manage the
//               teacher's professional records, attendance, and salary payments. Make sure to fill in all fields marked
//               with an asterisk (*) for successful registration.
//             </Typography>
//           </Box>
//         </Paper>
//       </Container>

//       {/* Success Backdrop */}
//       <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={success}>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             bgcolor: "white",
//             p: 4,
//             borderRadius: 4,
//             maxWidth: 400,
//             textAlign: "center",
//           }}
//         >
//           <Box
//             sx={{
//               width: 80,
//               height: 80,
//               borderRadius: "50%",
//               bgcolor: "#e8f5e9",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               mb: 2,
//             }}
//           >
//             <CheckCircle sx={{ fontSize: 50, color: "#2e7d32" }} />
//           </Box>
//           <Typography variant="h5" sx={{ color: "#2e7d32", fontWeight: 600, mb: 1 }}>
//             Success!
//           </Typography>
//           <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
//             {id
//               ? "Teacher has been updated successfully. Redirecting to teacher list..."
//               : "Teacher has been registered successfully. Redirecting to teacher list..."}
//           </Typography>
//           <CircularProgress size={24} sx={{ color: "primary.main" }} />
//         </Box>
//       </Backdrop>

//       {/* Snackbar for notifications */}
//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   )
// }
