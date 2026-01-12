// /* eslint-disable react-hooks/exhaustive-deps */
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
//   Discount,
//   Flag,
//   Group,
//   Money,
//   MoneyOff,
//   Person,
//   Phone,
//   Remove,
//   School,
//   Work,
//   Percent,
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
//   FormControl,
//   Grid,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Typography,
// } from "@mui/material";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useFieldArray, useFormContext } from "react-hook-form";
// import toast from "react-hot-toast";

// const FeeAmountHandler = ({
//   feeIndex,
//   feeCategoryData,
// }: {
//   feeIndex: number;
//   feeCategoryData: any;
// }) => {
//   const { watch, setValue } = useFormContext();
//   const selectedFees = watch(`fees.${feeIndex}.feeType`);
//   const selectedClass = watch(`fees.${feeIndex}.className`);
//   const feeAmount = watch(`fees.${feeIndex}.feeAmount`);
//   const paidAmount = watch(`fees.${feeIndex}.paidAmount`);
//   const discountType = watch(`fees.${feeIndex}.discountType`) || "flat";
//   const discountValue = watch(`fees.${feeIndex}.discountValue`) || "0";
//   const waiverType = watch(`fees.${feeIndex}.waiverType`) || "flat";
//   const waiverValue = watch(`fees.${feeIndex}.waiverValue`) || "0";
//   const isYearlyFee = watch(`fees.${feeIndex}.isYearlyFee`);

//   const calculateDiscountAmount = () => {
//     const fee = parseFloat(feeAmount) || 0;
//     const value = parseFloat(discountValue) || 0;

//     if (discountType === "percentage") {
//       return Math.min((fee * value) / 100, fee);
//     } else {
//       return Math.min(value, fee);
//     }
//   };

//   const calculateWaiverAmount = () => {
//     const fee = parseFloat(feeAmount) || 0;
//     const value = parseFloat(waiverValue) || 0;

//     if (waiverType === "percentage") {
//       return Math.min((fee * value) / 100, fee);
//     } else {
//       return Math.min(value, fee);
//     }
//   };

//   useEffect(() => {
//     if (
//       selectedFees &&
//       selectedFees.length > 0 &&
//       selectedClass &&
//       selectedClass.length > 0
//     ) {
//       const selectedFeeType = selectedFees[0]?.label || selectedFees[0];
//       const selectedClassName = selectedClass[0]?.label || selectedClass[0];

//       const matchingFee = feeCategoryData?.data?.data?.find(
//         (fee: any) =>
//           fee.feeType.toLowerCase() === selectedFeeType.toLowerCase() &&
//           fee.class === selectedClassName
//       );

//       if (matchingFee) {
//         setValue(
//           `fees.${feeIndex}.feeAmount`,
//           matchingFee.feeAmount.toString()
//         );

//         const feeType = selectedFeeType.toLowerCase();
//         const isYearly =
//           feeType.includes("yearly") || feeType.includes("annual");
//         setValue(`fees.${feeIndex}.isYearlyFee`, isYearly);
//       }
//     }
//   }, [selectedFees, selectedClass, setValue, feeIndex, feeCategoryData]);

//   useEffect(() => {
//     if (feeAmount && selectedFees && selectedFees.length > 0) {
//       const selectedFee = selectedFees[0];
//       const feeType = selectedFee.label || selectedFee;

//       if (
//         feeType.toLowerCase().includes("yearly") ||
//         feeType.toLowerCase().includes("annual")
//       ) {
//         // For yearly fees, divide by 12 to get monthly amount
//         const yearlyAmount = parseFloat(feeAmount);
//         if (!isNaN(yearlyAmount)) {
//           const monthlyAmount = (yearlyAmount / 12).toFixed(2);
//           setValue(`fees.${feeIndex}.monthlyAmount`, monthlyAmount);
//           setValue(`fees.${feeIndex}.yearlyAmount`, yearlyAmount.toString());
//           setValue(`fees.${feeIndex}.isYearlyFee`, true);
//         }
//       } else if (feeType.toLowerCase().includes("monthly")) {
//         // For monthly fees, use the same amount (not divided by 12)
//         const monthlyAmount = parseFloat(feeAmount);
//         if (!isNaN(monthlyAmount)) {
//           const yearlyAmount = (monthlyAmount * 12).toFixed(2);
//           setValue(`fees.${feeIndex}.monthlyAmount`, monthlyAmount.toString());
//           setValue(`fees.${feeIndex}.yearlyAmount`, yearlyAmount);
//           setValue(`fees.${feeIndex}.isYearlyFee`, false);
//         }
//       } else {
//         // For other fees, no monthly breakdown
//         setValue(`fees.${feeIndex}.monthlyAmount`, "");
//         setValue(`fees.${feeIndex}.yearlyAmount`, "");
//         setValue(`fees.${feeIndex}.isYearlyFee`, false);
//       }
//     }
//   }, [feeAmount, selectedFees, setValue, feeIndex]);

//   useEffect(() => {
//     if (feeAmount !== undefined && paidAmount !== undefined) {
//       const fee = parseFloat(feeAmount) || 0;
//       const paid = parseFloat(paidAmount) || 0;
//       const discountAmount = calculateDiscountAmount();
//       const waiverAmount = calculateWaiverAmount();
//       const due = Math.max(0, fee - paid - discountAmount - waiverAmount);

//       setValue(`fees.${feeIndex}.dueAmount`, due > 0 ? due.toString() : "0");
//       setValue(
//         `fees.${feeIndex}.paymentStatus`,
//         due <= 0 ? "paid" : paid > 0 ? "partial" : "unpaid"
//       );

//       setValue(
//         `fees.${feeIndex}.calculatedDiscount`,
//         discountAmount.toString()
//       );
//       setValue(`fees.${feeIndex}.calculatedWaiver`, waiverAmount.toString());
//     }
//   }, [
//     feeAmount,
//     paidAmount,
//     discountType,
//     discountValue,
//     waiverType,
//     waiverValue,
//     setValue,
//     feeIndex,
//   ]);

//   return null;
// };

// const DynamicFeeFields = ({
//   classOptions,
//   feeCategoryOptions,
//   feeCategoryData,
// }: any) => {
//   const { control, watch, setValue } = useFormContext();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "fees",
//   });

//   const mainClassName = watch("className");

//   const getFilteredFeeOptions = (feeClassName: any) => {
//     if (feeClassName && feeClassName.length > 0) {
//       const selectedClassNames = feeClassName.map(
//         (cls: any) => cls.label || cls
//       );

//       const filtered = feeCategoryData?.data?.data?.filter((fee: any) =>
//         selectedClassNames.includes(fee.class)
//       );

//       const uniqueFeeTypes = Array.from(
//         new Set(filtered.map((fee: any) => fee.feeType))
//       ).map((feeType) => {
//         const originalOption = feeCategoryOptions.find(
//           (option: any) => option.label === feeType
//         );
//         return originalOption || { value: feeType, label: feeType };
//       });

//       return uniqueFeeTypes;
//     } else {
//       return feeCategoryOptions;
//     }
//   };

//   const addFeeField = () => {
//     const classNameValue =
//       mainClassName && mainClassName.length > 0
//         ? JSON.parse(JSON.stringify(mainClassName))
//         : [];

//     append({
//       feeType: [],
//       className: classNameValue,
//       feeAmount: "",
//       yearlyAmount: "",
//       monthlyAmount: "",
//       paidAmount: "",
//       discountType: "flat",
//       discountValue: "0",
//       discountReason: "",
//       waiverType: "flat",
//       waiverValue: "0",
//       waiverReason: "",
//       calculatedDiscount: "0",
//       calculatedWaiver: "0",
//       dueAmount: "",
//       paymentStatus: "unpaid",
//       isYearlyFee: false,
//     });
//   };

//   const removeFeeField = (index: number) => {
//     if (fields.length > 1) {
//       remove(index);
//     } else {
//       toast.error("At least one fee entry is required");
//     }
//   };

//   return (
//     <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
//       <CardContent sx={{ p: 3 }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 3,
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: "bold", color: "primary.main" }}
//           >
//             <Money sx={{ fontSize: 28, mr: 1 }} />
//             Fee Information <span className="text-red-600">*</span>
//           </Typography>
//           <IconButton
//             onClick={addFeeField}
//             sx={{
//               backgroundColor: "primary.main",
//               color: "white",
//               "&:hover": {
//                 backgroundColor: "primary.dark",
//               },
//             }}
//           >
//             <Add />
//           </IconButton>
//         </Box>

//         {fields.map((field, index) => {
//           const feeClassName = watch(`fees.${index}.className`);
//           const filteredFeeOptions = getFilteredFeeOptions(feeClassName);
//           const isYearlyFee = watch(`fees.${index}.isYearlyFee`);
//           const feeAmount = parseFloat(watch(`fees.${index}.feeAmount`)) || 0;
//           const discountType = watch(`fees.${index}.discountType`) || "flat";
//           const discountValue =
//             parseFloat(watch(`fees.${index}.discountValue`)) || 0;
//           const waiverType = watch(`fees.${index}.waiverType`) || "flat";
//           const waiverValue =
//             parseFloat(watch(`fees.${index}.waiverValue`)) || 0;
//           const calculatedDiscount =
//             parseFloat(watch(`fees.${index}.calculatedDiscount`)) || 0;
//           const calculatedWaiver =
//             parseFloat(watch(`fees.${index}.calculatedWaiver`)) || 0;
//           const totalAdjustments = calculatedDiscount + calculatedWaiver;

//           return (
//             <Box
//               key={field.id}
//               sx={{
//                 mb: 3,
//                 p: 3,
//                 border: "1px solid #e0e0e0",
//                 borderRadius: 2,
//                 backgroundColor: index === 0 ? "#f8f9fa" : "white",
//                 position: "relative",
//               }}
//             >
//               {index > 0 && (
//                 <IconButton
//                   onClick={() => removeFeeField(index)}
//                   sx={{
//                     position: "absolute",
//                     top: 8,
//                     right: 8,
//                     color: "error.main",
//                   }}
//                 >
//                   <Remove />
//                 </IconButton>
//               )}

//               <Typography
//                 variant="subtitle1"
//                 sx={{ mb: 2, fontWeight: "bold" }}
//               >
//                 Fee Entry #{index + 1}
//                 {totalAdjustments > 0 && (
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       ml: 2,
//                       color: "success.main",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     (Adjustments: ৳{totalAdjustments.toFixed(2)})
//                   </Typography>
//                 )}
//               </Typography>

//               <FeeAmountHandler
//                 feeIndex={index}
//                 feeCategoryData={feeCategoryData}
//               />

//               <Grid container spacing={2} alignItems="center">
//                 {/* Class Field - Pre-filled with main class name */}
//                 <Grid item xs={12} md={6}>
//                   <CraftIntAutoCompleteWithIcon
//                     name={`fees.${index}.className`}
//                     label="Class"
//                     placeholder="Select Class"
//                     options={classOptions}
//                     fullWidth
//                     multiple
//                     icon={<Class color="primary" />}
//                   />
//                 </Grid>

//                 {/* Fee Type - Filtered based on selected class in this fee entry */}
//                 <Grid item xs={12} md={6}>
//                   <CraftIntAutoCompleteWithIcon
//                     name={`fees.${index}.feeType`}
//                     label="Fee Type"
//                     placeholder="Select Fee Type"
//                     options={filteredFeeOptions}
//                     fullWidth
//                     multiple
//                     icon={<Money color="primary" />}
//                   />
//                 </Grid>

//                 {/* Yearly/Monthly Fee Amount */}
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     name={`fees.${index}.feeAmount`}
//                     label={isYearlyFee ? "Yearly Fee Amount" : "Fee Amount"}
//                     fullWidth
//                     size="small"
//                     type="number"
//                     InputProps={{
//                       startAdornment: (
//                         <Money sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>

//                 {/* Monthly Breakdown - Only show for yearly/monthly fees */}
//                 {isYearlyFee && (
//                   <Grid item xs={12} md={4}>
//                     <CraftInputWithIcon
//                       name={`fees.${index}.monthlyAmount`}
//                       label="Monthly Amount (Auto)"
//                       fullWidth
//                       size="small"
//                       disabled
//                       InputProps={{
//                         startAdornment: (
//                           <Money sx={{ color: "text.secondary", mr: 1 }} />
//                         ),
//                       }}
//                     />
//                   </Grid>
//                 )}

//                 {/* Yearly Breakdown - Show for monthly fees */}
//                 {!isYearlyFee &&
//                   watch(`fees.${index}.feeType`)?.some((fee: any) =>
//                     (fee.label || fee).toLowerCase().includes("monthly")
//                   ) && (
//                     <Grid item xs={12} md={4}>
//                       <CraftInputWithIcon
//                         name={`fees.${index}.yearlyAmount`}
//                         label="Yearly Total (Auto)"
//                         fullWidth
//                         size="small"
//                         disabled
//                         InputProps={{
//                           startAdornment: (
//                             <Money sx={{ color: "text.secondary", mr: 1 }} />
//                           ),
//                         }}
//                       />
//                     </Grid>
//                   )}

//                 {/* Discount Section */}
//                 <Grid item xs={12}>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{
//                       mb: 1,
//                       color: "success.main",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Discount sx={{ mr: 1 }} />
//                     Discount Settings
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={12} md={3}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>Discount Type</InputLabel>
//                     <Select
//                       name={`fees.${index}.discountType`}
//                       value={discountType}
//                       label="Discount Type"
//                       onChange={(e) =>
//                         setValue(`fees.${index}.discountType`, e.target.value)
//                       }
//                     >
//                       <MenuItem value="flat">Flat Amount (৳)</MenuItem>
//                       <MenuItem value="percentage">Percentage (%)</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 <Grid item xs={12} md={3}>
//                   <CraftInputWithIcon
//                     name={`fees.${index}.discountValue`}
//                     label={
//                       discountType === "percentage"
//                         ? "Discount %"
//                         : "Discount Amount"
//                     }
//                     fullWidth
//                     size="small"
//                     type="number"
//                     InputProps={{
//                       startAdornment:
//                         discountType === "percentage" ? (
//                           <Percent sx={{ color: "success.main", mr: 1 }} />
//                         ) : (
//                           <Discount sx={{ color: "success.main", mr: 1 }} />
//                         ),
//                     }}
//                     helperText={
//                       discountType === "percentage"
//                         ? `Max: 100% (৳${(feeAmount * 1).toFixed(2)})`
//                         : `Max: ৳${feeAmount.toFixed(2)}`
//                     }
//                     inputProps={{
//                       max: discountType === "percentage" ? 100 : feeAmount,
//                       min: 0,
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     name={`fees.${index}.discountReason`}
//                     label="Discount Reason"
//                     fullWidth
//                     size="small"
//                     placeholder="Reason for discount"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "success.main", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>

//                 {/* Waiver Section */}
//                 <Grid item xs={12}>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{
//                       mb: 1,
//                       color: "info.main",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <MoneyOff sx={{ mr: 1 }} />
//                     Waiver Settings
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={12} md={3}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>Waiver Type</InputLabel>
//                     <Select
//                       name={`fees.${index}.waiverType`}
//                       value={waiverType}
//                       label="Waiver Type"
//                       onChange={(e) =>
//                         setValue(`fees.${index}.waiverType`, e.target.value)
//                       }
//                     >
//                       <MenuItem value="flat">Flat Amount (৳)</MenuItem>
//                       <MenuItem value="percentage">Percentage (%)</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 <Grid item xs={12} md={3}>
//                   <CraftInputWithIcon
//                     name={`fees.${index}.waiverValue`}
//                     label={
//                       waiverType === "percentage" ? "Waiver %" : "Waiver Amount"
//                     }
//                     fullWidth
//                     size="small"
//                     type="number"
//                     InputProps={{
//                       startAdornment:
//                         waiverType === "percentage" ? (
//                           <Percent sx={{ color: "info.main", mr: 1 }} />
//                         ) : (
//                           <MoneyOff sx={{ color: "info.main", mr: 1 }} />
//                         ),
//                     }}
//                     helperText={
//                       waiverType === "percentage"
//                         ? `Max: 100% (৳${(feeAmount * 1).toFixed(2)})`
//                         : `Max: ৳${feeAmount.toFixed(2)}`
//                     }
//                     inputProps={{
//                       max: waiverType === "percentage" ? 100 : feeAmount,
//                       min: 0,
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <CraftInputWithIcon
//                     name={`fees.${index}.waiverReason`}
//                     label="Waiver Reason"
//                     fullWidth
//                     size="small"
//                     placeholder="Reason for waiver"
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ color: "info.main", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>

//                 {/* Paid Amount */}
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     name={`fees.${index}.paidAmount`}
//                     label="Paid Amount"
//                     fullWidth
//                     size="small"
//                     type="number"
//                     InputProps={{
//                       startAdornment: (
//                         <Money sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>

//                 {/* Due Amount */}
//                 <Grid item xs={12} md={4}>
//                   <CraftInputWithIcon
//                     name={`fees.${index}.dueAmount`}
//                     label="Due Amount (Auto)"
//                     fullWidth
//                     size="small"
//                     disabled
//                     InputProps={{
//                       startAdornment: (
//                         <Money sx={{ color: "text.secondary", mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>

//                 {/* Payment Status */}
//                 <Grid item xs={12} md={4}>
//                   <CraftSelectWithIcon
//                     name={`fees.${index}.paymentStatus`}
//                     label="Payment Status"
//                     items={["paid", "partial", "unpaid"]}
//                     adornment={<Money />}
//                     size="small"
//                   />
//                 </Grid>
//               </Grid>

//               {/* Adjustment Summary */}
//               {totalAdjustments > 0 && (
//                 <Alert severity="info" sx={{ mt: 2 }} icon={<Discount />}>
//                   <Typography variant="body2">
//                     <strong>Adjustments Applied:</strong>
//                     <br />
//                     Discount: ৳{calculatedDiscount.toFixed(2)}{" "}
//                     {discountType === "percentage" && `(${discountValue}%)`}
//                     <br />
//                     Waiver: ৳{calculatedWaiver.toFixed(2)}{" "}
//                     {waiverType === "percentage" && `(${waiverValue}%)`}
//                     <br />
//                     <strong>Total Adjustments:</strong> ৳
//                     {totalAdjustments.toFixed(2)}
//                     {discountType === "percentage" ||
//                       (waiverType === "percentage" && (
//                         <>
//                           <br />
//                           <em>
//                             Percentage values are converted to flat amounts
//                           </em>
//                         </>
//                       ))}
//                   </Typography>
//                 </Alert>
//               )}

//               {/* Show info when class is not selected */}
//               {(!feeClassName || feeClassName.length === 0) && (
//                 <Alert severity="warning" sx={{ mt: 2 }}>
//                   Please select a class to see available fee types
//                 </Alert>
//               )}

//               {/* Validation warning if adjustments exceed fee amount */}
//               {calculatedDiscount + calculatedWaiver > feeAmount && (
//                 <Alert severity="error" sx={{ mt: 2 }}>
//                   Total adjustments (৳
//                   {(calculatedDiscount + calculatedWaiver).toFixed(2)}) cannot
//                   exceed fee amount (৳{feeAmount.toFixed(2)})
//                 </Alert>
//               )}
//             </Box>
//           );
//         })}

//         {fields.length === 0 && (
//           <Alert severity="info" sx={{ mt: 2 }}>
//             Click the + button to add fee entries
//           </Alert>
//         )}
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

//   // Function to transform student className to form format
//   const transformStudentClassToForm = (studentClassName: any[]) => {
//     if (
//       !studentClassName ||
//       !Array.isArray(studentClassName) ||
//       studentClassName.length === 0
//     ) {
//       return [];
//     }

//     return studentClassName.map((cls: any) => {
//       // Get the class name from the nested structure
//       const className = cls.className || cls;

//       // Try to find a matching class in the options
//       let matchedClass = classOptions?.find(
//         (option: any) => option.value === cls._id || option.label === className
//       );

//       // If not found, create a new option
//       if (!matchedClass) {
//         matchedClass = {
//           value: cls._id || className,
//           label: className,
//         };
//       }

//       return matchedClass;
//     });
//   };

//   // Modified populateFormWithStudentData - Properly format class name
//   const populateFormWithStudentData = (student: any) => {
//     if (!student) return;

//     // Transform the className from student data to form format
//     const formattedClassName = transformStudentClassToForm(student.className);

//     const formValues: any = {
//       studentNameBangla: student.nameBangla || "",
//       studentPhoto: student.studentPhoto || "",
//       fatherNameBangla: student.fatherName || "",
//       motherNameBangla: student.motherName || "",
//       studentName: student.name || "",
//       mobileNo: student.mobile || "",
//       className: formattedClassName, // Use the transformed class name
//       session:
//         student.activeSession?.[0] || new Date().getFullYear().toString(),
//       category: student.studentType?.toLowerCase() || "residential",
//       dateOfBirth: student.birthDate ? new Date(student.birthDate) : null,
//       nidBirth: student.birthRegistrationNo || "",
//       bloodGroup: student.bloodGroup || "",
//       nationality: "Bangladeshi",
//       fatherName: student.fatherName || "",
//       fatherMobile: student.fatherMobile || "",
//       fatherNid: student.nidFatherMotherGuardian || "",
//       fatherProfession: student.fatherProfession || "",
//       fatherIncome: student.fatherIncome || 0,
//       motherName: student.motherName || "",
//       motherMobile: student.motherMobile || "",
//       motherNid: student.nidFatherMotherGuardian || "",
//       motherProfession: student.motherProfession || "",
//       motherIncome: student.motherIncome || 0,
//       village: student.presentAddress?.village || "",
//       postOffice: student.presentAddress?.postOffice || "",
//       postCode: student.presentAddress?.postCode || "",
//       policeStation: student.presentAddress?.policeStation || "",
//       district: student.presentAddress?.district || "",
//       permVillage: student.permanentAddress?.village || "",
//       permPostOffice: student.permanentAddress?.postOffice || "",
//       permPostCode: student.permanentAddress?.postCode || "",
//       permPoliceStation: student.permanentAddress?.policeStation || "",
//       permDistrict: student.permanentAddress?.district || "",
//       guardianName: student.guardianInfo?.name || "",
//       guardianRelation: student.guardianInfo?.relation || "",
//       guardianMobile: student.guardianInfo?.mobile || "",
//       guardianVillage: student.guardianInfo?.address || "",
//       formerInstitution: "",
//       formerVillage: "",
//       birthCertificate: student.documents?.birthCertificate ? "Yes" : "No",
//       transferCertificate: student.documents?.transferCertificate
//         ? "Yes"
//         : "No",
//       characterCertificate: student.documents?.characterCertificate
//         ? "Yes"
//         : "No",
//       markSheet: student.documents?.markSheet ? "Yes" : "No",
//       photographs: student.documents?.photographs ? "Yes" : "No",
//       termsAccepted: "No",
//       studentDepartment: student.studentDepartment || "hifz",
//       rollNumber: student.studentClassRoll || "",
//       section: student.section?.[0] || "",
//       group: student.batch || "",
//       optionalSubject: "",
//       shift: "",
//       // Fees will be populated based on selected class
//       fees: [
//         {
//           feeType: [],
//           className: formattedClassName, // Use the transformed class name
//           feeAmount: "",
//           paidAmount: "",
//           monthlyAmount: "",
//           yearlyAmount: "",
//           discountType: "flat", // NEW: Discount type
//           discountValue: "0", // NEW: Discount value
//           discountReason: "", // NEW: Reason for discount
//           waiverType: "flat", // NEW: Waiver type
//           waiverValue: "0", // NEW: Waiver value
//           waiverReason: "", // NEW: Reason for waiver
//           calculatedDiscount: "0", // NEW: Calculated discount amount
//           calculatedWaiver: "0", // NEW: Calculated waiver amount
//           dueAmount: "",
//           paymentStatus: "unpaid",
//         },
//       ],
//       admissionFee: student.admissionFee || 0,
//       monthlyFee: student.monthlyFee || 0,
//     };

//     // Set each form value individually to ensure proper update
//     Object.keys(formValues).forEach((key) => {
//       setValue(key, formValues[key]);
//     });

//     toast.success(`Form populated with student data for ${student.name}.`);
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
//         <Typography
//           variant="h6"
//           gutterBottom
//           sx={{ display: "flex", alignItems: "center" }}
//         >
//           <Person sx={{ mr: 1 }} />
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
//               bgcolor: "info.light",
//               color: "white",
//               borderRadius: 1,
//             }}
//           >
//             <Typography variant="body2">
//               <strong>Selected:</strong> {selectedStudent.name} (ID:{" "}
//               {selectedStudent.studentId})
//             </Typography>
//             <Typography variant="body2">
//               <strong>Note:</strong> Student information loaded.
//             </Typography>
//           </Box>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// // Helper function to transform API data to form format - UPDATED WITH NEW FIELDS
// const transformEnrollmentDataToForm = (
//   enrollmentData: any,
//   classOptions: any[],
//   feeCategoryOptions: any[]
// ) => {
//   if (!enrollmentData?.data) {
//     return null;
//   }

//   const data = enrollmentData.data;

//   // Helper function to format class data
//   const formatClassForForm = (classData: any) => {
//     if (!classData || classData.length === 0) return [];

//     if (Array.isArray(classData)) {
//       return classData.map((cls: any) => {
//         // Try to find a matching class in the options
//         const classId = cls._id || cls;
//         const classNameValue = cls.className || cls;

//         // First try to match by ID
//         let matchedClass = classOptions?.find(
//           (option: any) => option.value === classId
//         );

//         // If not found by ID, try to match by name
//         if (!matchedClass) {
//           matchedClass = classOptions?.find(
//             (option: any) => option.label === classNameValue
//           );
//         }

//         // If still not found, create a new option
//         if (!matchedClass) {
//           matchedClass = {
//             value: classId,
//             label: classNameValue,
//           };
//         }

//         return matchedClass;
//       });
//     } else {
//       // Handle single class object or string
//       const classId = classData._id || classData;
//       const classNameValue = classData.className || classData;

//       // First try to match by ID
//       let matchedClass = classOptions?.find(
//         (option: any) => option.value === classId
//       );

//       // If not found by ID, try to match by name
//       if (!matchedClass) {
//         matchedClass = classOptions?.find(
//           (option: any) => option.label === classNameValue
//         );
//       }

//       // If still not found, create a new option
//       if (!matchedClass) {
//         matchedClass = {
//           value: classId,
//           label: classNameValue,
//         };
//       }

//       return [matchedClass];
//     }
//   };

//   // Helper function to format fee data - UPDATED WITH PERCENTAGE/FLAT SUPPORT
//   const formatFeeForForm = (fees: any[], classData: any) => {
//     if (!fees || !Array.isArray(fees) || fees.length === 0) {
//       return [
//         {
//           feeType: [],
//           className: formatClassForForm(classData),
//           feeAmount: "",
//           paidAmount: "",
//           monthlyAmount: "",
//           yearlyAmount: "",
//           discountType: "flat", // NEW: Discount type
//           discountValue: "0", // NEW: Discount value
//           discountReason: "", // NEW: Reason for discount
//           waiverType: "flat", // NEW: Waiver type
//           waiverValue: "0", // NEW: Waiver value
//           waiverReason: "", // NEW: Reason for waiver
//           calculatedDiscount: "0", // NEW: Calculated discount amount
//           calculatedWaiver: "0", // NEW: Calculated waiver amount
//           dueAmount: "",
//           paymentStatus: "unpaid",
//         },
//       ];
//     }

//     return fees.map((fee: any) => {
//       const matchedFeeType = feeCategoryOptions?.find(
//         (option: any) =>
//           option.value === fee.feeType || option.label === fee.feeType
//       );

//       const feeAmount = fee.amount || fee.feeAmount || 0;
//       const paidAmount = fee.paidAmount || 0;
//       const discountAmount = fee.discount || 0;
//       const waiverAmount = fee.waiver || 0;
//       const dueAmount = Math.max(
//         0,
//         feeAmount - paidAmount - discountAmount - waiverAmount
//       );

//       // Determine discount type (percentage or flat)
//       const discountType = fee.discountType || "flat";
//       const discountValue = fee.discountValue || discountAmount.toString();
//       const waiverType = fee.waiverType || "flat";
//       const waiverValue = fee.waiverValue || waiverAmount.toString();

//       return {
//         feeType: matchedFeeType
//           ? [matchedFeeType]
//           : [
//               {
//                 value: fee.feeType,
//                 label: fee.feeType,
//               },
//             ],
//         className: formatClassForForm(classData),
//         feeAmount: feeAmount.toString(),
//         paidAmount: paidAmount.toString(),
//         monthlyAmount: ((feeAmount || 0) / 12).toFixed(2),
//         yearlyAmount: feeAmount.toString(),
//         discountType: discountType, // NEW: Include discount type
//         discountValue: discountValue, // NEW: Include discount value
//         discountReason: fee.discountReason || "", // NEW: Include discount reason
//         waiverType: waiverType, // NEW: Include waiver type
//         waiverValue: waiverValue, // NEW: Include waiver value
//         waiverReason: fee.waiverReason || "", // NEW: Include waiver reason
//         calculatedDiscount: discountAmount.toString(), // NEW: Include calculated discount
//         calculatedWaiver: waiverAmount.toString(), // NEW: Include calculated waiver
//         dueAmount: dueAmount.toString(),
//         paymentStatus:
//           dueAmount <= 0 ? "paid" : paidAmount > 0 ? "partial" : "unpaid",
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
//     studentNameBangla: data.nameBangla || data.student?.nameBangla || "",
//     studentPhoto: data.studentPhoto || data.student?.studentPhoto || "",
//     fatherNameBangla: data.fatherNameBangla || data.student?.fatherName || "",
//     motherNameBangla: data.motherNameBangla || data.student?.motherName || "",

//     // Personal Information
//     studentName: data.name || data.student?.name || "",
//     mobileNo: data.mobileNo || data.student?.mobile || "",
//     session: data.session || new Date().getFullYear().toString(),
//     category:
//       data.studentType ||
//       data.student?.studentType?.toLowerCase() ||
//       "residential",
//     dateOfBirth: formatDate(data.birthDate || data.student?.birthDate),
//     nidBirth: data.nidBirth || data.student?.birthRegistrationNo || "",
//     bloodGroup: data.bloodGroup || data.student?.bloodGroup || "",
//     nationality: data.nationality || "Bangladeshi",

//     // Academic Information - Class name preserved from enrollment data
//     className: formatClassForForm(data.className),
//     studentDepartment: data.studentDepartment || "hifz",
//     rollNumber: data.roll || data.student?.studentClassRoll || "",
//     section: data.section || data.student?.section?.[0] || "",
//     group: data.group || data.student?.batch || "",
//     optionalSubject: data.optionalSubject || "",
//     shift: data.shift || "",
//     admissionType: data.admissionType || "",

//     // Parent Information
//     fatherName: data.fatherName || data.student?.fatherName || "",
//     fatherMobile: data.fatherMobile || "",
//     fatherNid: data.fatherNid || "",
//     fatherProfession: data.fatherProfession || "",
//     fatherIncome: data.fatherIncome || data.student?.fatherIncome || 0,
//     motherName: data.motherName || data.student?.motherName || "",
//     motherMobile: data.motherMobile || "",
//     motherNid: data.motherNid || "",
//     motherProfession: data.motherProfession || "",
//     motherIncome: data.motherIncome || data.student?.motherIncome || 0,

//     // Address Information
//     village: data.presentAddress?.village || "",
//     postOffice: data.presentAddress?.postOffice || "",
//     postCode: data.presentAddress?.postCode || "",
//     policeStation: data.presentAddress?.policeStation || "",
//     district: data.presentAddress?.district || "",
//     permVillage: data.permanentAddress?.village || "",
//     permPostOffice: data.permanentAddress?.postOffice || "",
//     permPostCode: data.permanentAddress?.postCode || "",
//     permPoliceStation: data.permanentAddress?.policeStation || "",
//     permDistrict: data.permanentAddress?.district || "",

//     // Guardian Information
//     guardianName:
//       data.guardianInfo?.name || data.student?.guardianInfo?.name || "",
//     guardianRelation:
//       data.guardianInfo?.relation || data.student?.guardianInfo?.relation || "",
//     guardianMobile:
//       data.guardianInfo?.mobile || data.student?.guardianInfo?.mobile || "",
//     guardianVillage:
//       data.guardianInfo?.address || data.student?.guardianInfo?.address || "",

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

//     // Fees - UPDATED WITH PERCENTAGE/FLAT SUPPORT
//     fees: formatFeeForForm(data.fees, data.className),
//     admissionFee: data.admissionFee || data.student?.admissionFee || 0,
//     monthlyFee: data.monthlyFee || data.student?.monthlyFee || 0,

//     // Student Selector
//     studentIdSelect: null,
//     studentNameSelect: null,
//   };

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
//       const transformedData = transformEnrollmentDataToForm(
//         singleEnrollment,
//         classOptions,
//         feeCategoryOptions
//       );

//       if (transformedData) {
//         setDefaultValues(transformedData);
//         setFormKey((prev) => prev + 1);
//       }
//     } else if (!id) {
//       // Set empty default values for new enrollment - UPDATED WITH PERCENTAGE/FLAT SUPPORT
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
//             monthlyAmount: "",
//             yearlyAmount: "",
//             discountType: "flat", // NEW: Discount type
//             discountValue: "0", // NEW: Discount value
//             discountReason: "", // NEW: Reason for discount
//             waiverType: "flat", // NEW: Waiver type
//             waiverValue: "0", // NEW: Waiver value
//             waiverReason: "", // NEW: Reason for waiver
//             calculatedDiscount: "0", // NEW: Calculated discount amount
//             calculatedWaiver: "0", // NEW: Calculated waiver amount
//             dueAmount: "",
//             paymentStatus: "unpaid",
//           },
//         ],
//         admissionFee: 0,
//         monthlyFee: 0,
//         studentIdSelect: null,
//         studentNameSelect: null,
//       });
//       setFormKey((prev) => prev + 1);
//     }
//   }, [id, singleEnrollment, classOptions, feeCategoryOptions]);

//   // Handle Submit Function - UPDATED WITH PERCENTAGE/FLAT SUPPORT
//   const handleSubmit = async (data: any) => {
//     try {
//       setSubmitting(true);

//       const { studentIdSelect, studentNameSelect, ...submitData } = data;

//       // Class name processing
//       const classNameArray =
//         submitData.className && submitData.className.length > 0
//           ? submitData.className
//               .map((cls: any) => cls.value || cls)
//               .filter(Boolean)
//           : [];

//       if (!classNameArray.length) {
//         toast.error("Class selection is required");
//         setSubmitting(false);
//         return;
//       }

//       // Fees processing with percentage/flat discount/waiver
//       const transformedFees = Array.isArray(submitData.fees)
//         ? submitData.fees
//             .filter(
//               (fee: any) =>
//                 fee.feeType &&
//                 fee.feeType.length > 0 &&
//                 fee.className &&
//                 fee.className.length > 0 &&
//                 fee.feeAmount && // Ensure fee amount exists
//                 Number(fee.feeAmount) > 0 // Ensure fee amount is greater than 0
//             )
//             .map((fee: any) => {
//               const feeType = fee.feeType[0]?.label || fee.feeType[0] || "";
//               const className =
//                 fee.className[0]?.label || fee.className[0] || "";
//               const feeAmount = Number(fee.feeAmount) || 0;
//               const paidAmount = Number(fee.paidAmount) || 0;

//               // Calculate discount amount based on type
//               let discountAmount = 0;
//               if (fee.discountType === "percentage") {
//                 discountAmount = Math.min(
//                   (feeAmount * Number(fee.discountValue || 0)) / 100,
//                   feeAmount
//                 );
//               } else {
//                 discountAmount = Math.min(
//                   Number(fee.discountValue || 0),
//                   feeAmount
//                 );
//               }

//               // Calculate waiver amount based on type
//               let waiverAmount = 0;
//               if (fee.waiverType === "percentage") {
//                 waiverAmount = Math.min(
//                   (feeAmount * Number(fee.waiverValue || 0)) / 100,
//                   feeAmount
//                 );
//               } else {
//                 waiverAmount = Math.min(
//                   Number(fee.waiverValue || 0),
//                   feeAmount
//                 );
//               }

//               // Validate that discount + waiver doesn't exceed fee amount
//               if (discountAmount + waiverAmount > feeAmount) {
//                 throw new Error(
//                   `Total adjustments (${discountAmount + waiverAmount}) cannot exceed fee amount (${feeAmount}) for ${feeType}`
//                 );
//               }

//               return {
//                 feeType: feeType,
//                 className: className,
//                 feeAmount: feeAmount,
//                 paidAmount: paidAmount,
//                 discount: discountAmount, // Final calculated discount amount
//                 discountType: fee.discountType || "flat", // NEW: Discount type
//                 discountValue: fee.discountValue || "0", // NEW: Discount value
//                 discountReason: fee.discountReason || "", // NEW: Reason for discount
//                 waiver: waiverAmount, // Final calculated waiver amount
//                 waiverType: fee.waiverType || "flat", // NEW: Waiver type
//                 waiverValue: fee.waiverValue || "0", // NEW: Waiver value
//                 waiverReason: fee.waiverReason || "", // NEW: Reason for waiver
//                 monthlyAmount: fee.monthlyAmount || "",
//                 isYearlyFee: fee.isYearlyFee || false,
//               };
//             })
//         : [];

//       // Make sure we have at least one valid fee
//       if (transformedFees.length === 0) {
//         toast.error("At least one valid fee entry is required");
//         setSubmitting(false);
//         return;
//       }

//       // Boolean transformation
//       const transformBoolean = (value: any) => {
//         if (value === "Yes") return true;
//         if (value === "No") return false;
//         return Boolean(value);
//       };

//       // Final submission data
//       const finalSubmitData: any = {
//         // Student Information
//         studentName: submitData.studentName || "",
//         nameBangla: submitData.studentNameBangla || "",
//         studentPhoto: submitData.studentPhoto || "",
//         mobileNo: submitData.mobileNo || "",
//         rollNumber: submitData.rollNumber || "",
//         gender: submitData.gender || "",
//         birthDate: submitData.dateOfBirth
//           ? new Date(submitData.dateOfBirth).toISOString()
//           : "",
//         birthRegistrationNo: submitData.nidBirth || "",
//         bloodGroup: submitData.bloodGroup || "",
//         nationality: submitData.nationality || "Bangladeshi",

//         // Academic Information
//         className: classNameArray,
//         section: submitData.section || "",
//         roll: submitData.rollNumber || "",
//         session: submitData.session || new Date().getFullYear().toString(),
//         batch: submitData.group || "",
//         studentType: submitData.category || "residential",
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

//         // Address Information
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
//           characterCertificate: transformBoolean(
//             submitData.characterCertificate
//           ),
//           markSheet: transformBoolean(submitData.markSheet),
//           photographs: transformBoolean(submitData.photographs),
//         },

//         // Fees - INCLUDES PERCENTAGE/FLAT DISCOUNT/WAIVER
//         fees: transformedFees,

//         // Terms & Conditions
//         termsAccepted: transformBoolean(submitData.termsAccepted),

//         // Additional Information
//         admissionFee: Number(submitData.admissionFee) || 0,
//         monthlyFee: Number(submitData.monthlyFee) || 0,
//       };

//       // Clean up empty objects
//       Object.keys(finalSubmitData).forEach((key) => {
//         if (finalSubmitData[key] && typeof finalSubmitData[key] === "object") {
//           const obj = finalSubmitData[key];
//           const isEmpty = Object.keys(obj).every(
//             (subKey) =>
//               obj[subKey] === undefined ||
//               obj[subKey] === null ||
//               obj[subKey] === ""
//           );
//           if (isEmpty) {
//             delete finalSubmitData[key];
//           }
//         }
//       });

//       let res;
//       if (id) {
//         res = await updateEnrollment({ id, data: finalSubmitData }).unwrap();
//       } else {
//         res = await createEnrollment(finalSubmitData).unwrap();
//       }

//       if (res?.success) {
//         toast?.success(res?.message || "Student enrolled successfully");
//         setTimeout(() => {
//           router.push("/dashboard/enrollments/list");
//         }, 2000);
//       }
//     } catch (err: any) {
//       console.error("Submission error:", err);

//       let errorMessage = "Failed to enroll student!";

//       if (err?.data?.message) {
//         errorMessage = err.data.message;
//       } else if (err?.message) {
//         errorMessage = err.message;
//       }

//       if (
//         errorMessage.includes("jwt") ||
//         errorMessage.includes("auth") ||
//         errorMessage.includes("token")
//       ) {
//         toast.error("Authentication failed. Please login again.");
//         router.push("/login");
//       } else if (errorMessage.includes("duplicate")) {
//         toast.error("Student already exists with same mobile number or name");
//       } else if (errorMessage.includes("cannot exceed fee amount")) {
//         toast.error(errorMessage);
//       } else {
//         toast.error(errorMessage);
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Show loading state
//   if ((id && enrollmentLoading) || !defaultValues) {
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
//           {/* Header Section */}
//           <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
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

//           {/* Student Selector */}
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

//           <DynamicFeeFields
//             classOptions={classOptions}
//             feeCategoryOptions={feeCategoryOptions}
//             feeCategoryData={feeCategoryData}
//           />

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
//                     type="number"
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
//                     type="number"
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

//           {/* Submit Button */}
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
//                 boxShadow: 3,
//                 "&:hover": {
//                   boxShadow: 6,
//                 },
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
