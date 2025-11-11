// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react/no-unescaped-entities */
// "use client";

// import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon";
// import CraftForm from "@/components/Forms/Form";
// import FileUploadWithIcon from "@/components/Forms/Upload";
// import CraftInputWithIcon from "@/components/Forms/inputWithIcon";
// import CraftSelectWithIcon from "@/components/Forms/selectWithIcon";
// import { LoadingState } from "@/components/common/LoadingState";
// import { useAcademicOption } from "@/hooks/useAcademicOption";
// import { bloodGroups } from "@/options";
// import {
//   useCreateEnrollmentMutation,
//   useGetSingleEnrollmentQuery,
//   useUpdateEnrollmentMutation,
// } from "@/redux/api/enrollmentApi";
// import { useGetAllStudentsQuery } from "@/redux/api/studentApi";
// import {
//   AccessTime,
//   Add,
//   Book,
//   Cake,
//   CalendarMonth,
//   Check,
//   Class,
//   Description,
//   Flag,
//   Group,
//   Money,
//   Person,
//   Phone,
//   Remove,
//   School,
//   Work,
// } from "@mui/icons-material";
// import {
//   Alert,
//   Avatar,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CircularProgress,
//   Container,
//   Grid,
//   IconButton,
//   Paper,
//   Typography,
// } from "@mui/material";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useFieldArray, useFormContext, watch } from "react-hook-form";
// import toast from "react-hot-toast";

// type TProps = {
//   id?: string | string[];
// };

// // Fee Amount Handler Component
// const FeeAmountHandler = ({
//   feeCategoryData,
//   feeIndex,
// }: {
//   feeCategoryData: any;
//   feeIndex: number;
// }) => {
//   const { watch, setValue } = useFormContext();
//   const selectedFees = watch(`fees.${feeIndex}.feeType`);
//   const selectedClasses = watch(`fees.${feeIndex}.className`);

//   useEffect(() => {
//     if (
//       selectedFees &&
//       selectedFees.length > 0 &&
//       selectedClasses &&
//       selectedClasses.length > 0
//     ) {
//       const selectedFee = selectedFees[0];
//       const selectedClass = selectedClasses[0];
//       const matchingFee = feeCategoryData?.data?.data?.find(
//         (fee: any) =>
//           fee.feeType === (selectedFee.label || selectedFee) &&
//           fee.class === (selectedClass.label || selectedClass)
//       );
//       if (matchingFee) {
//         setValue(
//           `fees.${feeIndex}.feeAmount`,
//           matchingFee.feeAmount.toString()
//         );
//       }
//     }
//   }, [selectedFees, selectedClasses, feeCategoryData, setValue, feeIndex]);

//   return null;
// };

// // Dynamic Fee Fields Component
// const DynamicFeeFields = ({
//   feeCategoryData,
//   classOptions,
//   feeCategoryOptions,
// }: any) => {
//   const { control, watch, setValue } = useFormContext();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "fees",
//   });

//   // Watch the main className from academic information
//   const mainClassName = watch("className");

//   const addFeeField = () => {
//     // Use the main className if available, otherwise use empty array
//     const classNameValue = mainClassName && mainClassName.length > 0 ? mainClassName : [];

//     append({
//       feeType: [],
//       className: classNameValue, // Pre-populate with the main class
//       feeAmount: "",
//       paidAmount: "",
//     });
//   };

//   const removeFeeField = (index: number) => {
//     if (fields.length > 1) {
//       remove(index);
//     } else {
//       toast.error("At least one fee entry is required");
//     }
//   };

//   // Update all fee entries when the main class changes
//   useEffect(() => {
//     if (mainClassName && mainClassName.length > 0) {
//       fields.forEach((_, index) => {
//         setValue(`fees.${index}.className`, mainClassName);
//       });
//     }
//   }, [mainClassName, fields, setValue]);

//   return (
//     <Card elevation={2} sx={{ mb: 3, borderRadius: 2, position: "relative" }}>
//       <CardContent sx={{ p: 3 }}>
//         {/* Header with Add Button */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 3,
//             pb: 2,
//             borderBottom: "2px solid",
//             borderColor: "primary.main",
//             background: "linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)",
//             borderRadius: 1,
//             px: 2,
//             py: 1,
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: "bold",
//               color: "primary.main",
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <Money sx={{ fontSize: 28 }} />
//             Fee Information <span className="text-red-600">*</span>
//           </Typography>

//           <IconButton
//             onClick={addFeeField}
//             sx={{
//               backgroundColor: "primary.main",
//               color: "white",
//               borderRadius: "50%",
//               width: 48,
//               height: 48,
//               boxShadow: "0 4px 12px rgba(63, 81, 181, 0.3)",
//               "&:hover": {
//                 backgroundColor: "primary.dark",
//                 transform: "scale(1.05)",
//                 boxShadow: "0 6px 16px rgba(63, 81, 181, 0.4)",
//               },
//               transition: "all 0.3s ease-in-out",
//             }}
//           >
//             <Add sx={{ fontSize: 24 }} />
//           </IconButton>
//         </Box>

//         {/* Fee Fields */}
//         {fields.map((field, index) => (
//           <Box
//             key={field.id}
//             sx={{
//               mb: 3,
//               p: 3,
//               border: "2px solid",
//               borderColor: index === 0 ? "primary.light" : "grey.200",
//               borderRadius: 2,
//               backgroundColor: index === 0 ? "primary.50" : "grey.50",
//               position: "relative",
//               boxShadow:
//                 index === 0 ? "0 2px 8px rgba(63, 81, 181, 0.1)" : "none",
//             }}
//           >
//             {/* Remove Button for non-first items */}
//             {index > 0 && (
//               <IconButton
//                 onClick={() => removeFeeField(index)}
//                 sx={{
//                   position: "absolute",
//                   top: -12,
//                   right: -12,
//                   backgroundColor: "error.main",
//                   color: "white",
//                   width: 32,
//                   height: 32,
//                   boxShadow: "0 2px 8px rgba(211, 47, 47, 0.3)",
//                   "&:hover": {
//                     backgroundColor: "error.dark",
//                     transform: "scale(1.1)",
//                   },
//                   transition: "all 0.2s ease-in-out",
//                   zIndex: 1,
//                 }}
//               >
//                 <Remove sx={{ fontSize: 18 }} />
//               </IconButton>
//             )}

//             {/* Fee Number Badge */}
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: -12,
//                 left: 16,
//                 backgroundColor: index === 0 ? "primary.main" : "grey.500",
//                 color: "white",
//                 px: 2,
//                 py: 0.5,
//                 borderRadius: 4,
//                 fontSize: "0.75rem",
//                 fontWeight: "bold",
//                 boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//               }}
//             >
//               Fee #{index + 1}
//             </Box>

//             <FeeAmountHandler
//               feeCategoryData={feeCategoryData}
//               feeIndex={index}
//             />

//             <Grid container spacing={3} alignItems="center">
//               {/* Class field - Now pre-populated and read-only */}
//               <Grid item xs={12} md={3}>
//                 <CraftIntAutoCompleteWithIcon
//                   name={`fees.${index}.className`}
//                   label="Class"
//                   placeholder="Class from Academic Info"
//                   options={classOptions}
//                   fullWidth
//                   multiple
//                   icon={<Class color="primary" />}
//                   disabled // Make it read-only since it's auto-populated
//                 />
//               </Grid>

//               <Grid item xs={12} md={3} sm={6}>
//                 <CraftIntAutoCompleteWithIcon
//                   name={`fees.${index}.feeType`}
//                   label="Select Fee"
//                   placeholder="Select Fee Type"
//                   options={feeCategoryOptions}
//                   fullWidth
//                   multiple
//                   icon={<Money color="primary" />}
//                 />
//               </Grid>

//               <Grid item xs={12} md={3}>
//                 <CraftInputWithIcon
//                   name={`fees.${index}.feeAmount`}
//                   label="Fee Amount"
//                   fullWidth
//                   size="small"
//                   InputProps={{
//                     startAdornment: (
//                       <Money sx={{ color: "text.secondary", mr: 1 }} />
//                     ),
//                   }}
//                 // disabled
//                 />
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <CraftInputWithIcon
//                   name={`fees.${index}.paidAmount`}
//                   label="Paid Amount"
//                   fullWidth
//                   size="small"
//                   InputProps={{
//                     startAdornment: (
//                       <Money sx={{ color: "text.secondary", mr: 1 }} />
//                     ),
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//         ))}

//         {/* Helper Text */}
//         <Alert
//           severity="info"
//           sx={{
//             mt: 2,
//             borderRadius: 2,
//             backgroundColor: "info.50",
//             "& .MuiAlert-icon": {
//               alignItems: "center",
//             },
//           }}
//         >
//           <Typography variant="body2">
//             <strong>Tip:</strong> The class field is automatically populated from the Academic Information section.
//             Click{" "}
//             <Add sx={{ fontSize: 16, verticalAlign: "middle", mx: 0.5 }} />{" "}
//             button to add multiple fee entries for different fee types
//             (Admission, Monthly, Exam, etc.)
//           </Typography>
//         </Alert>
//       </CardContent>
//     </Card>
//   );
// };

// // Student Selector Component
// const StudentSelector = ({ studentData, classOptions }: any) => {
//   const { setValue, watch } = useFormContext();
//   const [selectedStudent, setSelectedStudent] = useState<any>(null);

//   const studentIdOptions =
//     studentData?.data?.map((student: any) => ({
//       value: student._id,
//       label: student.studentId,
//       data: student,
//     })) || [];

//   const studentNameOptions =
//     studentData?.data?.map((student: any) => ({
//       value: student._id,
//       label: student.name,
//       data: student,
//     })) || [];

//   const formatClassData = (studentClass: any) => {
//     if (!studentClass) return [];

//     if (Array.isArray(studentClass)) {
//       return studentClass.map((c: any) => {
//         const matchedClass = classOptions?.find(
//           (option: any) =>
//             option.value === (c._id || c) || option.label === (c.className || c)
//         );
//         return (
//           matchedClass || {
//             value: c._id || c,
//             label: c.className || c,
//           }
//         );
//       });
//     } else {
//       const matchedClass = classOptions?.find(
//         (option: any) =>
//           option.value === (studentClass._id || studentClass) ||
//           option.label === (studentClass.className || studentClass)
//       );
//       return matchedClass
//         ? [matchedClass]
//         : [
//           {
//             value: studentClass._id || studentClass,
//             label: studentClass.className || studentClass,
//           },
//         ];
//     }
//   };

//   const populateFormWithStudentData = (student: any) => {
//     if (!student) return;

//     const formattedClassData = formatClassData(student.className);

//     const formValues: any = {
//       studentNameBangla: student.name || "",
//       studentPhoto: student.studentPhoto || "",
//       fatherNameBangla: student.fatherName || "",
//       motherNameBangla: student.motherName || "",
//       studentName: student.name || "",
//       mobileNo: student.mobile || "",
//       className: formattedClassData,
//       session: student.activeSession?.[0] || "",
//       category: student.studentType?.toLowerCase() || "",
//       dateOfBirth: student.birthDate ? new Date(student.birthDate) : null,
//       nidBirth: student.birthRegistrationNo || "",
//       bloodGroup: student.bloodGroup || "",
//       nationality: "Bangladeshi",
//       fatherName: student.fatherName || "",
//       fatherMobile: "",
//       fatherNid: student.nidFatherMotherGuardian || "",
//       fatherProfession: "",
//       fatherIncome: student.fatherIncome || 0,
//       motherName: student.motherName || "",
//       motherMobile: "",
//       motherNid: student.nidFatherMotherGuardian || "",
//       motherProfession: "",
//       motherIncome: student.motherIncome || 0,
//       village: student.presentAddress || "",
//       postOffice: "",
//       postCode: "",
//       policeStation: student.presentThana || "",
//       district: student.presentDistrict || "",
//       permVillage: student.permanentAddress || "",
//       permPostOffice: "",
//       permPostCode: "",
//       permPoliceStation: student.permanentThana || "",
//       permDistrict: student.permanentDistrict || "",
//       guardianName: student.guardianName || "",
//       guardianRelation: student.relation || "",
//       guardianMobile: student.guardianMobile || "",
//       guardianVillage: student.permanentAddress || "",
//       formerInstitution: "",
//       formerVillage: "",
//       birthCertificate: false,
//       transferCertificate: false,
//       characterCertificate: false,
//       markSheet: false,
//       photographs: false,
//       termsAccepted: false,
//       studentDepartment: student.studentDepartment || "",
//       rollNumber: student.studentClassRoll || "",
//       section: student.section?.[0] || "",
//       group: "",
//       optionalSubject: "",
//       shift: "",
//       fees: [
//         {
//           feeType: [],
//           className: formattedClassData,
//           feeAmount: "",
//           paidAmount: "",
//         },
//       ],
//       admissionFee: student.admissionFee || 0,
//       monthlyFee: student.monthlyFee || 0,
//     };

//     Object.keys(formValues).forEach((key) => {
//       setValue(key, formValues[key]);
//     });

//     toast.success(`Form populated with data for ${student.name}`);
//   };

//   const handleStudentIdSelection = (value: any) => {
//     if (value && value.data) {
//       setSelectedStudent(value.data);
//       populateFormWithStudentData(value.data);
//       setValue("studentNameSelect", {
//         value: value.value,
//         label: value.data.name,
//         data: value.data,
//       });
//     } else {
//       setSelectedStudent(null);
//       setValue("studentNameSelect", null);
//     }
//   };

//   const handleStudentNameSelection = (value: any) => {
//     if (value && value.data) {
//       setSelectedStudent(value.data);
//       populateFormWithStudentData(value.data);
//       setValue("studentIdSelect", {
//         value: value.value,
//         label: value.data.studentId,
//         data: value.data,
//       });
//     } else {
//       setSelectedStudent(null);
//       setValue("studentIdSelect", null);
//     }
//   };

//   useEffect(() => {
//     const watchedStudentId = watch("studentIdSelect");
//     const watchedStudentName = watch("studentNameSelect");

//     if (
//       watchedStudentId &&
//       watchedStudentId.data &&
//       (!selectedStudent || selectedStudent._id !== watchedStudentId.data._id)
//     ) {
//       handleStudentIdSelection(watchedStudentId);
//     }

//     if (
//       watchedStudentName &&
//       watchedStudentName.data &&
//       (!selectedStudent || selectedStudent._id !== watchedStudentName.data._id)
//     ) {
//       handleStudentNameSelection(watchedStudentName);
//     }
//   }, [watch("studentIdSelect"), watch("studentNameSelect")]);

//   return (
//     <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
//       <CardContent sx={{ p: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Select Student to Auto-fill Form
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <CraftIntAutoCompleteWithIcon
//               name="studentIdSelect"
//               label="Select by Student ID"
//               placeholder="Choose Student ID"
//               options={studentIdOptions}
//               fullWidth
//               icon={<Person color="primary" />}
//               onChange={(event: any, value: any) => {
//                 handleStudentIdSelection(value);
//               }}
//               multiple={false}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <CraftIntAutoCompleteWithIcon
//               name="studentNameSelect"
//               label="Select by Student Name"
//               placeholder="Choose Student Name"
//               options={studentNameOptions}
//               fullWidth
//               icon={<Person color="primary" />}
//               onChange={(event: any, value: any) => {
//                 handleStudentNameSelection(value);
//               }}
//               multiple={false}
//             />
//           </Grid>
//         </Grid>
//         {selectedStudent && (
//           <Box
//             sx={{
//               mt: 2,
//               p: 2,
//               bgcolor: "success.light",
//               color: "white",
//               borderRadius: 1,
//             }}
//           >
//             <Typography variant="body2">
//               Selected: {selectedStudent.name} (ID: {selectedStudent.studentId})
//             </Typography>
//             <Typography variant="body2">
//               Class:{" "}
//               {selectedStudent.className
//                 ? Array.isArray(selectedStudent.className)
//                   ? selectedStudent.className
//                     .map((c: any) => c.className || c)
//                     .join(", ")
//                   : selectedStudent.className.className ||
//                   selectedStudent.className
//                 : "Not assigned"}
//             </Typography>
//             <Typography variant="body2">
//               Form has been auto-filled with student information.
//             </Typography>
//           </Box>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// // Helper function to transform API data to form format
// const transformEnrollmentDataToForm = (
//   enrollmentData: any,
//   classOptions: any[],
//   feeCategoryOptions: any[]
// ) => {
//   if (!enrollmentData?.data) {
//     return null;
//   }

//   const data = enrollmentData.data;

//   console.log("Raw enrollment data:", data);
//   console.log("Class options:", classOptions);
//   console.log("Fee category options:", feeCategoryOptions);

//   // Helper function to format class data
//   const formatClassForForm = (className: any) => {
//     if (!className) return [];

//     console.log("Formatting class:", className);

//     if (Array.isArray(className)) {
//       return className.map((cls: any) => {
//         const matchedClass = classOptions?.find(
//           (option: any) =>
//             option.value === (cls._id || cls) ||
//             option.label === (cls.className || cls)
//         );
//         console.log("Matched class for array:", matchedClass);
//         return (
//           matchedClass || {
//             value: cls._id || cls,
//             label: cls.className || cls,
//           }
//         );
//       });
//     } else {
//       const matchedClass = classOptions?.find(
//         (option: any) =>
//           option.value === (className._id || className) ||
//           option.label === (className.className || className)
//       );
//       console.log("Matched class for single:", matchedClass);
//       return matchedClass
//         ? [matchedClass]
//         : [
//           {
//             value: className._id || className,
//             label: className.className || className,
//           },
//         ];
//     }
//   };

//   // Helper function to format fee data - FIXED VERSION
//   const formatFeeForForm = (fees: any[], className: any) => {
//     if (!fees || !Array.isArray(fees) || fees.length === 0) {
//       console.log("No fees found, returning default fee structure");
//       return [
//         {
//           feeType: [],
//           className: formatClassForForm(className),
//           feeAmount: "",
//           paidAmount: "",
//         },
//       ];
//     }

//     console.log("Formatting fees:", fees);

//     return fees.map((fee: any) => {
//       // Find matching fee type from feeCategoryOptions
//       const matchedFeeType = feeCategoryOptions?.find(
//         (option: any) =>
//           option.value === fee.feeType || option.label === fee.feeType
//       );

//       console.log("Fee feeType:", fee.feeType);
//       console.log("Matched fee type:", matchedFeeType);

//       return {
//         feeType: matchedFeeType
//           ? [matchedFeeType]
//           : [
//             {
//               value: fee.feeType,
//               label: fee.feeType,
//             },
//           ],
//         className: formatClassForForm(className),
//         feeAmount: fee.amount?.toString() || fee.feeAmount?.toString() || "",
//         paidAmount: fee.paidAmount?.toString() || "",
//       };
//     });
//   };

//   // Helper function to format date
//   const formatDate = (dateString: string) => {
//     if (!dateString) return null;
//     try {
//       return new Date(dateString).toISOString().split("T")[0];
//     } catch {
//       return null;
//     }
//   };

//   // Helper function to format boolean for select
//   const formatBooleanForSelect = (value: boolean) => {
//     return value ? "Yes" : "No";
//   };

//   const transformedData = {
//     // Student Information (Bangla)
//     studentNameBangla: data.nameBangla || data.student?.name || "",
//     studentPhoto: data.studentPhoto || data.student?.studentPhoto || "",
//     fatherNameBangla: data.fatherNameBangla || data.student?.fatherName || "",
//     motherNameBangla: data.motherNameBangla || data.student?.motherName || "",

//     // Personal Information
//     studentName: data.name || data.student?.name || "",
//     mobileNo: data.mobileNo || data.student?.mobile || "",
//     session: data.session || "",
//     category:
//       data.studentType || data.student?.studentType?.toLowerCase() || "",
//     dateOfBirth: formatDate(data.birthDate || data.student?.birthDate),
//     nidBirth: data.nidBirth || data.student?.nidFatherMotherGuardian || "",
//     bloodGroup: data.bloodGroup || data.student?.bloodGroup || "",
//     nationality: data.nationality || "Bangladeshi",

//     // Parent Information
//     fatherName: data.fatherName || data.student?.fatherName || "",
//     fatherMobile: data.fatherMobile || "",
//     fatherNid: data.fatherNid || data.student?.nidFatherMotherGuardian || "",
//     fatherProfession: data.fatherProfession || "",
//     fatherIncome: data.fatherIncome || data.student?.fatherIncome || 0,
//     motherName: data.motherName || data.student?.motherName || "",
//     motherMobile: data.motherMobile || "",
//     motherNid: data.motherNid || data.student?.nidFatherMotherGuardian || "",
//     motherProfession: data.motherProfession || "",
//     motherIncome: data.motherIncome || data.student?.motherIncome || 0,

//     // Academic Information
//     className: formatClassForForm(data.className),
//     studentDepartment: data.studentDepartment || "",
//     rollNumber: data.roll || data.student?.studentClassRoll || "",
//     section: data.section || data.student?.section?.[0] || "",
//     group: data.group || "",
//     optionalSubject: data.optionalSubject || "",
//     shift: data.shift || "",
//     admissionType: data.admissionType || "",

//     // Address Information
//     village: data.presentAddress?.village || "",
//     postOffice: data.presentAddress?.postOffice || "",
//     postCode: data.presentAddress?.postCode || "",
//     policeStation:
//       data.presentAddress?.policeStation || data.student?.presentThana || "",
//     district:
//       data.presentAddress?.district || data.student?.presentDistrict || "",
//     permVillage: data.permanentAddress?.village || "",
//     permPostOffice: data.permanentAddress?.postOffice || "",
//     permPostCode: data.permanentAddress?.postCode || "",
//     permPoliceStation:
//       data.permanentAddress?.policeStation ||
//       data.student?.permanentThana ||
//       "",
//     permDistrict:
//       data.permanentAddress?.district || data.student?.permanentDistrict || "",

//     // Guardian Information
//     guardianName: data.guardianInfo?.name || data.student?.guardianName || "",
//     guardianRelation:
//       data.guardianInfo?.relation || data.student?.relation || "",
//     guardianMobile:
//       data.guardianInfo?.mobile || data.student?.guardianMobile || "",
//     guardianVillage:
//       data.guardianInfo?.address || data.student?.permanentAddress || "",

//     // Previous Education
//     formerInstitution: data.previousSchool?.institution || "",
//     formerVillage: data.previousSchool?.address || "",

//     // Documents
//     birthCertificate: formatBooleanForSelect(
//       data.documents?.birthCertificate || false
//     ),
//     transferCertificate: formatBooleanForSelect(
//       data.documents?.transferCertificate || false
//     ),
//     characterCertificate: formatBooleanForSelect(
//       data.documents?.characterCertificate || false
//     ),
//     markSheet: formatBooleanForSelect(data.documents?.markSheet || false),
//     photographs: formatBooleanForSelect(data.documents?.photographs || false),

//     // Terms & Conditions
//     termsAccepted: formatBooleanForSelect(data.termsAccepted || false),

//     // Fees - FIXED: Pass className to formatFeeForForm
//     fees: formatFeeForForm(data.fees, data.className),
//     admissionFee: data.admissionFee || data.student?.admissionFee || 0,
//     monthlyFee: data.monthlyFee || data.student?.monthlyFee || 0,

//     // Student Selector
//     studentIdSelect: null,
//     studentNameSelect: null,
//   };

//   console.log("Transformed form data:", transformedData);
//   return transformedData;
// };

// const EnrollmentForm = () => {
//   const limit = 100;
//   const [page] = useState(0);
//   const [searchTerm] = useState("");
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");

//   const { classOptions, feeCategoryOptions, feeCategoryData } =
//     useAcademicOption();
//   const [createEnrollment] = useCreateEnrollmentMutation();
//   const [updateEnrollment] = useUpdateEnrollmentMutation();
//   const { data: singleEnrollment, isLoading: enrollmentLoading } =
//     useGetSingleEnrollmentQuery(id ? { id } : undefined, {
//       skip: !id,
//     });

//   const { data: studentData, isLoading: studentLoading } =
//     useGetAllStudentsQuery({
//       limit,
//       page: page + 1,
//       searchTerm,
//     });

//   const [submitting, setSubmitting] = useState(false);
//   const [defaultValues, setDefaultValues] = useState<any>(null);
//   const [formKey, setFormKey] = useState(0);

//   // Transform API data to form format when data loads
//   useEffect(() => {
//     if (
//       id &&
//       singleEnrollment &&
//       classOptions.length > 0 &&
//       feeCategoryOptions.length > 0
//     ) {
//       console.log("Transforming enrollment data...");
//       const transformedData = transformEnrollmentDataToForm(
//         singleEnrollment,
//         classOptions,
//         feeCategoryOptions
//       );

//       if (transformedData) {
//         setDefaultValues(transformedData);
//         setFormKey((prev) => prev + 1);
//         console.log("Default values set:", transformedData);
//       }
//     } else if (!id) {
//       // Set empty default values for new enrollment
//       console.log("Setting empty default values for new enrollment");
//       setDefaultValues({
//         studentNameBangla: "",
//         studentPhoto: "",
//         fatherNameBangla: "",
//         motherNameBangla: "",
//         studentName: "",
//         mobileNo: "",
//         session: new Date().getFullYear().toString(),
//         category: "residential",
//         dateOfBirth: null,
//         nidBirth: "",
//         bloodGroup: "",
//         nationality: "Bangladeshi",
//         fatherName: "",
//         fatherMobile: "",
//         fatherNid: "",
//         fatherProfession: "",
//         fatherIncome: 0,
//         motherName: "",
//         motherMobile: "",
//         motherNid: "",
//         motherProfession: "",
//         motherIncome: 0,
//         className: [],
//         studentDepartment: "hifz",
//         rollNumber: "",
//         section: "",
//         group: "",
//         optionalSubject: "",
//         shift: "",
//         admissionType: "",
//         village: "",
//         postOffice: "",
//         postCode: "",
//         policeStation: "",
//         district: "",
//         permVillage: "",
//         permPostOffice: "",
//         permPostCode: "",
//         permPoliceStation: "",
//         permDistrict: "",
//         guardianName: "",
//         guardianRelation: "",
//         guardianMobile: "",
//         guardianVillage: "",
//         formerInstitution: "",
//         formerVillage: "",
//         birthCertificate: "No",
//         transferCertificate: "No",
//         characterCertificate: "No",
//         markSheet: "No",
//         photographs: "No",
//         termsAccepted: "No",
//         fees: [
//           {
//             feeType: [],
//             className: [],
//             feeAmount: "",
//             paidAmount: "",
//           },
//         ],
//         admissionFee: 0,
//         monthlyFee: 0,
//         studentIdSelect: null,
//         studentNameSelect: null,
//       });
//     }
//   }, [id, singleEnrollment, classOptions, feeCategoryOptions]);

//   // In your handleSubmit function, fix the data transformation:
//   const handleSubmit = async (data: any) => {
//     try {
//       setSubmitting(true);

//       const { studentIdSelect, studentNameSelect, ...submitData } = data;
//       console.log("Form submission data:", submitData);

//       // Fix: Ensure className is properly formatted as an array of ObjectIds
//       const classNameArray = submitData.className && submitData.className.length > 0
//         ? submitData.className.map((cls: any) => {
//           // Ensure we're getting the ObjectId value, not the label
//           return cls.value || cls;
//         }).filter(Boolean) // Remove any null/undefined values
//         : [];

//       if (!classNameArray.length) {
//         toast.error("Class selection is required");
//         setSubmitting(false);
//         return;
//       }

//       // Fix: Transform fees array properly
//       const transformedFees = Array.isArray(submitData.fees)
//         ? submitData.fees
//           .filter((fee: any) => fee.feeType && fee.feeType.length > 0 && fee.className && fee.className.length > 0)
//           .map((fee: any) => ({
//             feeType: fee.feeType[0]?.value || fee.feeType[0] || "",
//             className: fee.className[0]?.value || fee.className[0] || "",
//             feeAmount: Number(fee.feeAmount) || 0,
//             paidAmount: Number(fee.paidAmount) || 0,
//           }))
//         : [];

//       // Fix: Transform boolean fields properly
//       const transformBoolean = (value: any) => {
//         if (value === "Yes") return true;
//         if (value === "No") return false;
//         return Boolean(value);
//       };

//       // Fix: Create the final submission data with proper structure
//       const finalSubmitData: any = {
//         // Student Information
//         studentName: submitData.studentName || "",
//         nameBangla: submitData.studentNameBangla || "",
//         studentPhoto: submitData.studentPhoto || "",
//         mobileNo: submitData.mobileNo || "",
//         rollNumber: submitData.rollNumber || "",
//         gender: submitData.gender || "",
//         birthDate: submitData.dateOfBirth ? new Date(submitData.dateOfBirth).toISOString() : "",
//         birthRegistrationNo: submitData.nidBirth || "",
//         bloodGroup: submitData.bloodGroup || "",
//         nationality: submitData.nationality || "Bangladeshi",

//         // Academic Information
//         className: classNameArray,
//         section: submitData.section || "",
//         roll: submitData.rollNumber || "",
//         session: submitData.session || "",
//         batch: submitData.group || "",
//         studentType: submitData.category || "",
//         studentDepartment: submitData.studentDepartment || "hifz",

//         // Parent Information
//         fatherName: submitData.fatherName || "",
//         fatherNameBangla: submitData.fatherNameBangla || "",
//         fatherMobile: submitData.fatherMobile || "",
//         fatherNid: submitData.fatherNid || "",
//         fatherProfession: submitData.fatherProfession || "",
//         fatherIncome: Number(submitData.fatherIncome) || 0,

//         motherName: submitData.motherName || "",
//         motherNameBangla: submitData.motherNameBangla || "",
//         motherMobile: submitData.motherMobile || "",
//         motherNid: submitData.motherNid || "",
//         motherProfession: submitData.motherProfession || "",
//         motherIncome: Number(submitData.motherIncome) || 0,

//         // Fix: Address objects with proper structure
//         presentAddress: {
//           village: submitData.village || "",
//           postOffice: submitData.postOffice || "",
//           postCode: submitData.postCode || "",
//           policeStation: submitData.policeStation || "",
//           district: submitData.district || "",
//         },

//         permanentAddress: {
//           village: submitData.permVillage || "",
//           postOffice: submitData.permPostOffice || "",
//           postCode: submitData.permPostCode || "",
//           policeStation: submitData.permPoliceStation || "",
//           district: submitData.permDistrict || "",
//         },

//         // Guardian Information
//         guardianInfo: {
//           name: submitData.guardianName || "",
//           relation: submitData.guardianRelation || "",
//           mobile: submitData.guardianMobile || "",
//           address: submitData.guardianVillage || "",
//         },

//         // Previous Education
//         previousSchool: {
//           institution: submitData.formerInstitution || "",
//           address: submitData.formerVillage || "",
//         },

//         // Documents
//         documents: {
//           birthCertificate: transformBoolean(submitData.birthCertificate),
//           transferCertificate: transformBoolean(submitData.transferCertificate),
//           characterCertificate: transformBoolean(submitData.characterCertificate),
//           markSheet: transformBoolean(submitData.markSheet),
//           photographs: transformBoolean(submitData.photographs),
//         },

//         // Fees
//         fees: transformedFees,

//         // Terms & Conditions
//         termsAccepted: transformBoolean(submitData.termsAccepted),

//         // Additional fee information
//         admissionFee: Number(submitData.admissionFee) || 0,
//         monthlyFee: Number(submitData.monthlyFee) || 0,
//       };

//       // Clean up empty objects
//       Object.keys(finalSubmitData).forEach(key => {
//         if (finalSubmitData[key] && typeof finalSubmitData[key] === 'object') {
//           const obj = finalSubmitData[key];
//           const isEmpty = Object.keys(obj).every(subKey => !obj[subKey]);
//           if (isEmpty) {
//             delete finalSubmitData[key];
//           }
//         }
//       });

//       console.log("Final submission data:", JSON.stringify(finalSubmitData, null, 2));

//       let res;
//       if (id) {
//         res = await updateEnrollment({ id, data: finalSubmitData }).unwrap();
//       } else {
//         res = await createEnrollment(finalSubmitData).unwrap();
//       }

//       if (res.success) {
//         toast.success(res.message || "Student enrolled successfully");
//         setTimeout(() => {
//           router.push("/dashboard/enrollments/list");
//         }, 2000);
//       }
//     } catch (err: any) {
//       console.error("Submission error:", err);

//       if (err?.data?.message?.includes("jwt") || err?.message?.includes("jwt")) {
//         toast.error("Authentication failed. Please login again.");
//         router.push("/login");
//       } else {
//         const errorMessage = err.data?.message || err.message || "Failed to enroll student!";
//         toast.error(errorMessage);
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };
//   // Show loading state while data is being fetched
//   if (
//     (id && enrollmentLoading) ||
//     !defaultValues ||
//     classOptions.length === 0 ||
//     feeCategoryOptions.length === 0
//   ) {
//     return <LoadingState />;
//   }

//   return (
//     <Box>
//       <CraftForm
//         key={formKey}
//         onSubmit={handleSubmit}
//         defaultValues={defaultValues}
//       >
//         <Container maxWidth="xl" sx={{ py: 3 }}>
//           <Paper
//             elevation={3}
//             sx={{
//               p: 3,
//               mb: 3,
//               borderRadius: 2,
//             }}
//           >
//             <Box
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//             >
//               <Box display="flex" alignItems="center">
//                 <Avatar sx={{ bgcolor: "white", mr: 2, width: 56, height: 56 }}>
//                   <School sx={{ color: "#3f51b5" }} />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h4" sx={{ mb: 0.5 }}>
//                     Craft International Institute
//                   </Typography>
//                   <Typography variant="subtitle1">
//                     226, Narayanhat Sadar, Narayanganj
//                   </Typography>
//                 </Box>
//               </Box>
//               <FileUploadWithIcon name="studentPhoto" label="Student Photo" />
//             </Box>
//             <Typography
//               variant="h4"
//               align="center"
//               sx={{ mt: 2, fontWeight: "bold" }}
//             >
//               {id ? "UPDATE ENROLLMENT" : "ADMISSION FORM"}
//             </Typography>
//           </Paper>

//           {/* Pass classOptions to StudentSelector */}
//           <StudentSelector
//             studentData={studentData}
//             classOptions={classOptions}
//           />

//           {/* Student Information */}
//           <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Student Information (বাংলায়)
//               </Typography>
//               <Grid container spacing={3} mb={3}>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label={
//                       <span>
//                         Student Name <span style={{ color: "red" }}>*</span>
//                       </span>
//                     }
//                     name="studentNameBangla"
//                     placeholder="Student Name (বাংলায়)"
//                     InputProps={{
//                       startAdornment: (
//                         <Person sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label={
//                       <span>
//                         Father's Name<span style={{ color: "red" }}>*</span>
//                       </span>
//                     }
//                     name="fatherNameBangla"
//                     placeholder="Father's Name (বাংলায়)"
//                     InputProps={{
//                       startAdornment: (
//                         <Person sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label={
//                       <span>
//                         Mother's Name<span style={{ color: "red" }}>*</span>
//                       </span>
//                     }
//                     name="motherNameBangla"
//                     placeholder="Mother's Name (বাংলায়)"
//                     InputProps={{
//                       startAdornment: (
//                         <Person sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//               </Grid>

//               <Alert severity="info" sx={{ mb: 3 }}>
//                 All information below must be filled in English
//               </Alert>

//               <Typography variant="h6" gutterBottom>
//                 Personal Information
//               </Typography>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label={
//                       <span>
//                         Student Name<span style={{ color: "red" }}>*</span>
//                       </span>
//                     }
//                     name="studentName"
//                     placeholder="Full Name in English"
//                     InputProps={{
//                       startAdornment: (
//                         <Person sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Mobile No."
//                     name="mobileNo"
//                     placeholder="01XXXXXXXXX"
//                     InputProps={{
//                       startAdornment: (
//                         <Phone sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Session"
//                     name="session"
//                     placeholder="2024-2025"
//                     InputProps={{
//                       startAdornment: (
//                         <CalendarMonth
//                           sx={{ color: "text.secondary", mr: 1 }}
//                         />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftSelectWithIcon
//                     fullWidth
//                     label={
//                       <span>
//                         Category <span style={{ color: "red" }}>*</span>
//                       </span>
//                     }
//                     name="category"
//                     items={["day_care", "residential", "non_residential"]}
//                     size="medium"
//                     adornment={<CalendarMonth />}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftSelectWithIcon
//                     name="studentDepartment"
//                     size="medium"
//                     label={
//                       <span>
//                         Student Department
//                         <span style={{ color: "red" }}>*</span>
//                       </span>
//                     }
//                     placeholder="Student Department"
//                     items={["hifz", "academic"]}
//                     adornment={<Person color="action" />}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Date of Birth"
//                     name="dateOfBirth"
//                     type="date"
//                     InputProps={{
//                       startAdornment: (
//                         <Cake sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="NID/Birth Reg. No"
//                     name="nidBirth"
//                     placeholder="1234567890"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftSelectWithIcon
//                     name="bloodGroup"
//                     label="Blood Group"
//                     placeholder="Select Blood Group"
//                     items={bloodGroups}
//                     adornment={<Person color="action" />}
//                     size="medium"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Nationality"
//                     name="nationality"
//                     placeholder="Bangladeshi"
//                     InputProps={{
//                       startAdornment: (
//                         <Flag sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>

//           {/* Academic Information */}
//           <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Academic Information
//               </Typography>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={4}>
//                   <CraftIntAutoCompleteWithIcon
//                     name="className"
//                     label={
//                       <span>
//                         Class <span style={{ color: "red" }}>*</span>
//                       </span>
//                     }
//                     placeholder="Select Class"
//                     options={classOptions}
//                     fullWidth
//                     multiple
//                     icon={<Class color="primary" />}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Roll Number"
//                     name="rollNumber"
//                     placeholder="Enter Roll No"
//                     InputProps={{
//                       startAdornment: (
//                         <Class sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftSelectWithIcon
//                     name="section"
//                     label="Section"
//                     items={["A", "B", "C"]}
//                     adornment={<Group />}
//                     size="medium"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftSelectWithIcon
//                     name="group"
//                     label="Group"
//                     items={["Science", "Commerce", "Arts"]}
//                     adornment={<School />}
//                     size="medium"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Optional Subject"
//                     name="optionalSubject"
//                     placeholder="e.g. Higher Math / ICT"
//                     InputProps={{
//                       startAdornment: (
//                         <Book sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftSelectWithIcon
//                     name="shift"
//                     label="Shift"
//                     items={["Morning", "Day", "Evening"]}
//                     adornment={<AccessTime />}
//                     size="medium"
//                   />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>

//           {/* Dynamic Fee Fields */}
//           <DynamicFeeFields
//             feeCategoryData={feeCategoryData}
//             classOptions={classOptions}
//             feeCategoryOptions={feeCategoryOptions}
//           />

//           {/* Parent Information */}
//           <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Parent Information
//               </Typography>
//               <Typography variant="subtitle1" mb={2}>
//                 Father's Information
//               </Typography>
//               <Grid container spacing={3} mb={3}>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Father's Name"
//                     name="fatherName"
//                     placeholder="Full Name"
//                     InputProps={{
//                       startAdornment: (
//                         <Person sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Mobile"
//                     name="fatherMobile"
//                     placeholder="01XXXXXXXXX"
//                     InputProps={{
//                       startAdornment: (
//                         <Phone sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="NID/Passport No"
//                     name="fatherNid"
//                     placeholder="1234567890"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Profession"
//                     name="fatherProfession"
//                     placeholder="Occupation"
//                     InputProps={{
//                       startAdornment: (
//                         <Work sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Monthly Income"
//                     name="fatherIncome"
//                     placeholder="BDT"
//                     InputProps={{
//                       startAdornment: (
//                         <Work sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//               </Grid>

//               <Typography variant="subtitle1" mb={2}>
//                 Mother's Information
//               </Typography>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Mother's Name"
//                     name="motherName"
//                     placeholder="Full Name"
//                     InputProps={{
//                       startAdornment: (
//                         <Person sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Mobile"
//                     name="motherMobile"
//                     placeholder="01XXXXXXXXX"
//                     InputProps={{
//                       startAdornment: (
//                         <Phone sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="NID/Passport No"
//                     name="motherNid"
//                     placeholder="1234567890"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Profession"
//                     name="motherProfession"
//                     placeholder="Occupation"
//                     InputProps={{
//                       startAdornment: (
//                         <Work sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Monthly Income"
//                     name="motherIncome"
//                     placeholder="BDT"
//                     InputProps={{
//                       startAdornment: (
//                         <Work sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>

//           {/* Address Information */}
//           <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Address Information
//               </Typography>
//               <Typography variant="subtitle1" mb={2}>
//                 Present Address
//               </Typography>
//               <Grid container spacing={3} mb={3}>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Village/Area"
//                     name="village"
//                     placeholder="Village/Area"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Post Office"
//                     name="postOffice"
//                     placeholder="Post Office"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Post Code"
//                     name="postCode"
//                     placeholder="Post Code"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Police Station"
//                     name="policeStation"
//                     placeholder="Police Station"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="District"
//                     name="district"
//                     placeholder="District"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//               </Grid>

//               <Typography variant="subtitle1" mb={2}>
//                 Permanent Address
//               </Typography>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Village/Area"
//                     name="permVillage"
//                     placeholder="Village/Area"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Post Office"
//                     name="permPostOffice"
//                     placeholder="Post Office"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Post Code"
//                     name="permPostCode"
//                     placeholder="Post Code"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Police Station"
//                     name="permPoliceStation"
//                     placeholder="Police Station"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="District"
//                     name="permDistrict"
//                     placeholder="District"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>

//           {/* Guardian Information */}
//           <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Guardian Information
//               </Typography>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Guardian Name"
//                     name="guardianName"
//                     placeholder="Guardian Name"
//                     InputProps={{
//                       startAdornment: (
//                         <Person sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Relation"
//                     name="guardianRelation"
//                     placeholder="Relation"
//                     InputProps={{
//                       startAdornment: (
//                         <Person sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Mobile"
//                     name="guardianMobile"
//                     placeholder="01XXXXXXXXX"
//                     InputProps={{
//                       startAdornment: (
//                         <Phone sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Address"
//                     name="guardianVillage"
//                     placeholder="Address"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>

//           {/* Previous Education */}
//           <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Previous Education
//               </Typography>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Previous Institution"
//                     name="formerInstitution"
//                     placeholder="Previous Institution"
//                     InputProps={{
//                       startAdornment: (
//                         <School sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     fullWidth
//                     label="Previous Address"
//                     name="formerVillage"
//                     placeholder="Previous Address"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>

//           {/* Documents */}
//           <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Documents
//               </Typography>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={4}>
//                   <CraftSelectWithIcon
//                     name="birthCertificate"
//                     label="Birth Certificate"
//                     items={["Yes", "No"]}
//                     adornment={<Description />}
//                     size="medium"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftSelectWithIcon
//                     name="transferCertificate"
//                     label="Transfer Certificate"
//                     items={["Yes", "No"]}
//                     adornment={<Description />}
//                     size="medium"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftSelectWithIcon
//                     name="characterCertificate"
//                     label="Character Certificate"
//                     items={["Yes", "No"]}
//                     adornment={<Description />}
//                     size="medium"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftSelectWithIcon
//                     name="markSheet"
//                     label="Mark Sheet"
//                     items={["Yes", "No"]}
//                     adornment={<Description />}
//                     size="medium"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CraftSelectWithIcon
//                     name="photographs"
//                     label="Photographs"
//                     items={["Yes", "No"]}
//                     adornment={<Description />}
//                     size="medium"
//                   />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>

//           {/* Terms & Conditions */}
//           <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Terms & Conditions
//               </Typography>
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <CraftSelectWithIcon
//                     name="termsAccepted"
//                     label="I accept the terms and conditions"
//                     items={["Yes", "No"]}
//                     adornment={<Check />}
//                     size="medium"
//                   />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>

//           <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               size="large"
//               disabled={submitting}
//               endIcon={submitting ? <CircularProgress size={20} /> : <Check />}
//               sx={{
//                 borderRadius: 30,
//                 padding: "12px 40px",
//                 fontWeight: "bold",
//                 fontSize: "1.1rem",
//                 minWidth: "250px",
//               }}
//             >
//               {submitting
//                 ? "Submitting..."
//                 : id
//                   ? "Update Enrollment"
//                   : "Submit Application"}
//             </Button>
//           </Box>
//         </Container>
//       </CraftForm>
//     </Box>
//   );
// };

// export default EnrollmentForm;
