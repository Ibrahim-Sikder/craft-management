// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react";
// import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon";
// import CraftForm from "@/components/Forms/Form";
// import CraftInput from "@/components/Forms/inputWithIcon";
// import CraftModal from "@/components/Shared/Modal";
// import { useAcademicOption } from "@/hooks/useAcademicOption";
// import {
//   Class,
//   CalendarMonth,
//   AttachMoney,
//   Add,
//   Delete,
//   Description,
//   Payment,
//   CheckCircle,
// } from "@mui/icons-material";
// import {
//   Alert,
//   Button,
//   Grid,
//   Typography,
//   Box,
//   IconButton,
//   Tooltip,
//   Card,
//   CardContent,
//   alpha,
//   useTheme,
//   InputAdornment,
//   Paper,
//   FormControlLabel,
//   Switch,
//   CircularProgress,
//   Select,
//   MenuItem,
//   TextField,
// } from "@mui/material";
// import { FieldValues } from "react-hook-form";
// import { useCreateFeeMutation } from "@/redux/api/feesApi";
// import toast from "react-hot-toast";
// import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

// // Month constants
// const MONTHS = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// interface AddFeeModalProps {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   student: any;
//   onAddFee?: (feeData: any) => void;
//   refetch?: () => void;
// }

// interface FeeItem {
//   feeType: string;
//   amount: number;
//   _id: string;
//   discount?: number;
//   discountType?: 'flat' | 'percentage';
//   advanceAmount?: number;
//   isMonthly?: boolean;
//   discountRangeStart?: string;
//   discountRangeEnd?: string;
//   discountRangeAmount?: number;
// }

// interface FeeCategory {
//   _id: string;
//   categoryName: string;
//   className: string;
//   feeItems: FeeItem[];
//   createdAt: string;
//   updatedAt: string;
// }

// // Custom Input component that prevents form submission on Enter
// const CustomCraftInput = ({ onKeyDown, ...props }: any) => {
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//     if (onKeyDown) {
//       onKeyDown(e);
//     }
//   };

//   return <CraftInput onKeyDown={handleKeyDown} {...props} />;
// };

// // Custom AutoComplete component that prevents form submission on Enter
// const CustomCraftIntAutoCompleteWithIcon = ({ onKeyDown, ...props }: any) => {
//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//     if (onKeyDown) {
//       onKeyDown(e);
//     }
//   };

//   return (
//     <div onKeyDown={handleKeyDown}>
//       <CraftIntAutoCompleteWithIcon {...props} />
//     </div>
//   );
// };

// // Range Discount Component
// const RangeDiscountSection = ({
//   feeIndex,
//   itemIndex,
//   item,
//   onApplyRangeDiscount,
// }: {
//   feeIndex: number;
//   itemIndex: number;
//   item: any;
//   onApplyRangeDiscount: (feeIndex: number, itemIndex: number, startMonth: string, endMonth: string, amount: number) => void;
// }) => {
//   const [rangeStart, setRangeStart] = useState("");
//   const [rangeEnd, setRangeEnd] = useState("");
//   const [rangeAmt, setRangeAmt] = useState(0);

//   return (
//     <Grid item xs={12} sx={{ mt: 1 }}>
//       <Paper
//         variant="outlined"
//         sx={{
//           p: 1.5,
//           borderColor: (theme) => theme.palette.info.main,
//           bgcolor: (theme) => alpha(theme.palette.info.light, 0.1),
//         }}
//       >
//         <Typography
//           variant="caption"
//           color="info.main"
//           fontWeight="bold"
//           sx={{ mb: 1, display: 'block' }}
//         >
//           Apply Discount to Specific Months:
//         </Typography>
//         <Box
//           sx={{
//             display: "flex",
//             gap: 1,
//             alignItems: "center",
//             flexWrap: "wrap",
//           }}
//         >
//           <Select
//             size="small"
//             value={rangeStart}
//             onChange={(e) => setRangeStart(e.target.value)}
//             displayEmpty
//             sx={{ minWidth: 120, bgcolor: 'background.paper' }}
//           >
//             <MenuItem value="" disabled>
//               From
//             </MenuItem>
//             {MONTHS.map((m) => (
//               <MenuItem key={m} value={m}>
//                 {m}
//               </MenuItem>
//             ))}
//           </Select>
//           <Typography variant="body2">to</Typography>
//           <Select
//             size="small"
//             value={rangeEnd}
//             onChange={(e) => setRangeEnd(e.target.value)}
//             displayEmpty
//             sx={{ minWidth: 120, bgcolor: 'background.paper' }}
//           >
//             <MenuItem value="" disabled>
//               To
//             </MenuItem>
//             {MONTHS.map((m) => (
//               <MenuItem key={m} value={m}>
//                 {m}
//               </MenuItem>
//             ))}
//           </Select>
//           <TextField
//             size="small"
//             type="number"
//             placeholder="Amt"
//             value={rangeAmt || ""}
//             onChange={(e) => setRangeAmt(parseFloat(e.target.value) || 0)}
//             sx={{ width: 80 }}
//             InputProps={{
//               startAdornment: <InputAdornment position="start">৳</InputAdornment>
//             }}
//           />
//           <Button
//             size="small"
//             variant="contained"
//             onClick={() =>
//               onApplyRangeDiscount(
//                 feeIndex,
//                 itemIndex,
//                 rangeStart,
//                 rangeEnd,
//                 rangeAmt,
//               )
//             }
//             sx={{ fontSize: "0.75rem", py: 0.5 }}
//           >
//             Set Range
//           </Button>
//         </Box>
//         {item.discountRangeStart && item.discountRangeEnd && (
//           <Typography
//             variant="caption"
//             color="success.main"
//             sx={{ mt: 1, display: "block", fontWeight: 'bold' }}
//           >
//             Active: {item.discountRangeStart} to {item.discountRangeEnd} (-৳
//             {item.discountRangeAmount}/mo)
//           </Typography>
//         )}
//       </Paper>
//     </Grid>
//   );
// };

// // Dynamic Fee Fields Component
// const DynamicFeeFields = ({
//   selectedClass,
//   feeCategories,
//   studentAdvanceBalance,
//   enrollmentId,
//   selectedMonth,
// }: {
//   selectedClass: string;
//   feeCategories: FeeCategory[];
//   studentAdvanceBalance: number;
//   enrollmentId?: string;
//   selectedMonth?: string;
// }) => {
//   const theme = useTheme();
//   const { control, watch, setValue } = useFormContext();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "fees",
//   });

//   // State to control visibility of Admission Fee
//   const [showAdmissionFee, setShowAdmissionFee] = useState<boolean>(false);

//   // Helper to determine if an item is Admission Fee
//   const isAdmissionFee = (feeTypeValue: any) => {
//     const type = typeof feeTypeValue === "string" ? feeTypeValue : feeTypeValue?.value;
//     return type === "Admission Fee";
//   };

//   const getCategoryOptions = () => {
//     if (!selectedClass || feeCategories.length === 0) return [];
//     const uniqueCategories = Array.from(
//       new Set(
//         feeCategories
//           .filter((category) => category.className === selectedClass)
//           .map((category) => category.categoryName)
//       )
//     );
//     return uniqueCategories.map((category) => ({
//       label: category || "General",
//       name: category || "General",
//       value: category || "General",
//     }));
//   };

//   const getFeeTypeOptionsForClass = (classNameStr: string) => {
//     if (!feeCategories.length) return [];
//     const types = new Set<string>();
//     feeCategories.forEach((category) => {
//       if (category.className === classNameStr && category.feeItems) {
//         category.feeItems.forEach((item) => types.add(item.feeType));
//       }
//     });

//     let options = Array.from(types).map((t) => ({ label: t, value: t }));

//     // Filter options in dropdown based on switch
//     if (showAdmissionFee) {
//       options = options.filter((opt) => opt.value !== "Admission Fee");
//     }

//     return options;
//   };

//   const calculateTotalAmount = (feeItems: any[]) => {
//     if (!Array.isArray(feeItems)) return 0;
//     return feeItems.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
//   };

//   // Handle Toggle Switch
//   const handleToggleAdmissionFee = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
//     setShowAdmissionFee(checked);

//     const currentFees = watch("fees");
//     if (!currentFees) return;

//     const updatedFees = currentFees.map((feeGroup: any) => {
//       let newFeeItems = feeGroup.feeItems || [];

//       if (checked) {
//         newFeeItems = newFeeItems.filter((item: any) => !isAdmissionFee(item.feeType));
//       }

//       const newTotal = calculateTotalAmount(newFeeItems);

//       return {
//         ...feeGroup,
//         feeItems: newFeeItems,
//         feeAmount: newTotal,
//       };
//     });

//     setValue("fees", updatedFees);
//   };

//   const handleCategoryChange = (index: number, selectedCategory: any) => {
//     const categoryValue = Array.isArray(selectedCategory)
//       ? selectedCategory[0]?.label || selectedCategory[0]
//       : selectedCategory;

//     if (categoryValue && selectedClass) {
//       const matchingCategories = feeCategories.filter(
//         (category) =>
//           category.className === selectedClass &&
//           category.categoryName === categoryValue
//       );
//       const allFeeItems: any[] = [];
//       matchingCategories.forEach((category) => {
//         if (category.feeItems && Array.isArray(category.feeItems)) {
//           category.feeItems.forEach((item) => {
//             if (showAdmissionFee && item.feeType === "Admission Fee") {
//               return;
//             }

//             allFeeItems.push({
//               feeType: { label: item.feeType, value: item.feeType },
//               amount: item.amount || 0,
//               discount: 0,
//               discountType: 'flat',
//               advanceAmount: 0,
//               isSelected: true,
//               isMonthly: item.feeType.toLowerCase().includes('monthly'),
//               discountRangeStart: "",
//               discountRangeEnd: "",
//               discountRangeAmount: 0,
//               id: Date.now() + Math.random(),
//             });
//           });
//         }
//       });

//       if (allFeeItems.length > 0) {
//         setValue(`fees.${index}.feeItems`, allFeeItems);
//         const totalAmount = calculateTotalAmount(allFeeItems);
//         setValue(`fees.${index}.feeAmount`, totalAmount.toString());
//         toast.success(`${allFeeItems.length} fee items loaded`);
//       } else {
//         setValue(`fees.${index}.feeItems`, []);
//         setValue(`fees.${index}.feeAmount`, "");
//       }
//     }
//   };

//   const removeFeeItem = (feeIndex: number, itemIndex: number) => {
//     const currentFeeItems = watch(`fees.${feeIndex}.feeItems`) || [];
//     const newFeeItems = currentFeeItems.filter((_: any, i: number) => i !== itemIndex);
//     setValue(`fees.${feeIndex}.feeItems`, newFeeItems);
//     const newTotal = calculateTotalAmount(newFeeItems);
//     setValue(`fees.${feeIndex}.feeAmount`, newTotal.toString());
//   };

//   const handleAdvanceAmountChange = (feeIndex: number, itemIndex: number, value: string) => {
//     const feeItems = watch(`fees.${feeIndex}.feeItems`) || [];
//     const updatedItems = [...feeItems];
//     if (updatedItems[itemIndex]) {
//       updatedItems[itemIndex].advanceAmount = parseFloat(value) || 0;
//       setValue(`fees.${feeIndex}.feeItems`, updatedItems);
//     }
//   };

//   const handleFeeTypeChange = (feeIndex: number, itemIndex: number, value: any) => {
//     const feeItems = watch(`fees.${feeIndex}.feeItems`) || [];
//     const updatedItems = [...feeItems];
//     if (updatedItems[itemIndex]) {
//       updatedItems[itemIndex] = {
//         ...updatedItems[itemIndex],
//         feeType: value,
//         isMonthly: value?.value?.toLowerCase().includes('monthly') || false
//       };
//       if (value && feeCategories.length > 0) {
//         const feeTypeStr = typeof value === "string" ? value : value?.value;
//         const item = feeCategories
//           .find((c) => c.className === selectedClass)
//           ?.feeItems?.find((f) => f.feeType === feeTypeStr);
//         if (item && item.amount) updatedItems[itemIndex].amount = item.amount;
//       }
//       setValue(`fees.${index}.feeItems`, updatedItems);
//       const newTotal = calculateTotalAmount(updatedItems);
//       setValue(`fees.${index}.feeAmount`, newTotal.toString());
//     }
//   };

//   const handleDiscountChange = (feeIndex: number, itemIndex: number, field: string, value: any) => {
//     const feeItems = watch(`fees.${feeIndex}.feeItems`) || [];
//     const updatedItems = [...feeItems];
//     if (updatedItems[itemIndex]) {
//       updatedItems[itemIndex][field] = value;
//       setValue(`fees.${feeIndex}.feeItems`, updatedItems);
//     }
//   };

//   // Handle applying range discount for monthly fees
//   const handleApplyRangeDiscount = (
//     feeIndex: number,
//     itemIndex: number,
//     startMonth: string,
//     endMonth: string,
//     amount: number,
//   ) => {
//     if (!startMonth || !endMonth) {
//       toast.error("Please select start and end month");
//       return;
//     }
//     if (amount <= 0) {
//       toast.error("Please enter a valid discount amount");
//       return;
//     }

//     setValue(
//       `fees.${feeIndex}.feeItems.${itemIndex}.discountRangeStart`,
//       startMonth,
//     );
//     setValue(
//       `fees.${feeIndex}.feeItems.${itemIndex}.discountRangeEnd`,
//       endMonth,
//     );
//     setValue(
//       `fees.${feeIndex}.feeItems.${itemIndex}.discountRangeAmount`,
//       amount,
//     );
//     toast.success(
//       `Discount range set: ${startMonth} to ${endMonth} (৳${amount}/month)`,
//     );
//   };

//   const addFeeField = () => {
//     append({
//       category: [],
//       className: selectedClass,
//       feeItems: [],
//       feeAmount: "",
//       selectionMode: "admission"
//     });
//   };

//   const removeFeeField = (index: number) => {
//     if (fields.length > 1) {
//       remove(index);
//     } else {
//       toast.error("At least one fee entry is required");
//     }
//   };

//   const categoryOptions = getCategoryOptions();
//   const classSpecificFeeOptions = getFeeTypeOptionsForClass(selectedClass);

//   return (
//     <Card
//       elevation={0}
//       sx={{
//         mb: 2,
//         borderRadius: 3,
//         overflow: "hidden",
//         border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//         boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
//         background: "#fff",
//       }}
//     >
//       <Box
//         sx={{
//           p: 2.5,
//           borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           bgcolor: alpha(theme.palette.primary.main, 0.02),
//         }}
//       >
//         <Box>
//           <Typography variant="h6" fontWeight="600" sx={{ color: theme.palette.text.primary }}>
//             Fee Details
//           </Typography>
//           <Typography variant="caption" color="text.secondary">
//             Configure fees for {selectedMonth || "enrollment"}
//           </Typography>
//         </Box>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <FormControlLabel
//             control={<Switch checked={showAdmissionFee} onChange={handleToggleAdmissionFee} />}
//             label="Hide Admission Fee"
//             sx={{ mr: 0 }}
//           />
//           <Button
//             onClick={addFeeField}
//             size="medium"
//             variant="contained"
//             disabled={!selectedClass}
//             sx={{
//               textTransform: "none",
//               fontWeight: "bold",
//             }}
//           >
//             <Add sx={{ fontSize: 18, mr: 0.5 }} /> Add Category
//           </Button>
//         </Box>
//       </Box>

//       <CardContent sx={{ p: 3 }}>
//         {fields.map((field, index) => {
//           const feeCategory = watch(`fees.${index}.category`);
//           const feeItems = watch(`fees.${index}.feeItems`) || [];
//           const feeAmount = parseFloat(watch(`fees.${index}.feeAmount`) || 0);
//           const selectionMode = watch(`fees.${index}.selectionMode`) || "admission";

//           return (
//             <Box
//               key={field.id}
//               sx={{
//                 mb: 3,
//                 p: 3,
//                 borderRadius: 2,
//                 background: alpha(theme.palette.background.paper, 0.5),
//                 border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//                 position: "relative",
//               }}
//             >
//               {index > 0 && (
//                 <Tooltip title="Remove Fee Category">
//                   <IconButton
//                     onClick={() => removeFeeField(index)}
//                     sx={{
//                       position: "absolute",
//                       top: 8,
//                       right: 8,
//                       color: "text.disabled",
//                       width: 24,
//                       height: 24,
//                       "&:hover": { color: "error.main", bgcolor: alpha(theme.palette.error.main, 0.1) },
//                     }}
//                   >
//                     <Delete fontSize="small" />
//                   </IconButton>
//                 </Tooltip>
//               )}
//               <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//                 <Box
//                   sx={{
//                     width: 8,
//                     height: 8,
//                     borderRadius: "50%",
//                     bgcolor: theme.palette.primary.main,
//                     mr: 1.5,
//                   }}
//                 />
//                 <Typography
//                   variant="subtitle2"
//                   fontWeight="bold"
//                   color="text.secondary"
//                   sx={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: 1 }}
//                 >
//                   Fee Category #{index + 1}
//                 </Typography>
//               </Box>
//               <Grid container spacing={2.5} sx={{ mb: 3 }}>
//                 <Grid item xs={12} md={4}>
//                   <CraftInput
//                     name={`fees.${index}.className`}
//                     margin="none"
//                     label="Class"
//                     fullWidth
//                     size="small"
//                     value={selectedClass}
//                     disabled
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <Class sx={{ color: "text.secondary" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <CustomCraftIntAutoCompleteWithIcon
//                     name={`fees.${index}.category`}
//                     label={<span>Category <span style={{ color: "red" }}>*</span></span>}
//                     margin="none"
//                     size="small"
//                     placeholder={selectedClass ? "Select Category" : "Select class first"}
//                     options={categoryOptions.map((opt) => ({
//                       label: String(opt.label || ""),
//                       value: String(opt.value || ""),
//                       name: String(opt.name || opt.label || ""),
//                     }))}
//                     fullWidth
//                     multiple
//                     icon={<CalendarMonth color="primary" />}
//                     disabled={!selectedClass}
//                     onChange={(event: any, value: any) => {
//                       handleCategoryChange(index, value);
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <Box
//                     sx={{
//                       height: "100%",
//                       display: "flex",
//                       alignItems: "center",
//                       bgcolor: alpha(theme.palette.background.paper, 0.5),
//                       border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
//                       borderRadius: 1,
//                       px: 2,
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                       {selectionMode === "all" ? "All Fees" : "Admission Fee Only"}
//                     </Typography>
//                   </Box>
//                 </Grid>
//               </Grid>
//               {feeCategory && feeCategory.length > 0 ? (
//                 feeItems.length > 0 ? (
//                   <Box sx={{ mb: 3 }}>
//                     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                       <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "primary.main" }}>
//                         📋 Fee Items ({feeItems.length} items)
//                       </Typography>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         onClick={() => {
//                           const newItems = [
//                             ...feeItems,
//                             {
//                               feeType: "",
//                               amount: 0,
//                               discount: 0,
//                               discountType: 'flat',
//                               advanceAmount: 0,
//                               isSelected: true,
//                               isMonthly: false,
//                               discountRangeStart: "",
//                               discountRangeEnd: "",
//                               discountRangeAmount: 0,
//                               id: Date.now()
//                             },
//                           ];
//                           setValue(`fees.${index}.feeItems`, newItems);
//                         }}
//                       >
//                         <Add fontSize="small" /> Add Custom Item
//                       </Button>
//                     </Box>
//                     <Paper
//                       elevation={0}
//                       sx={{
//                         p: 2,
//                         bgcolor: alpha(theme.palette.background.paper, 0.7),
//                         border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//                         borderRadius: 1,
//                       }}
//                     >
//                       <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                           <Grid
//                             container
//                             spacing={2}
//                             sx={{ mb: 1, pb: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}` }}
//                           >
//                             <Grid item xs={4}>
//                               <Typography variant="caption" fontWeight="bold" color="text.secondary">
//                                 FEE TYPE
//                               </Typography>
//                             </Grid>
//                             <Grid item xs={2.5}>
//                               <Typography variant="caption" fontWeight="bold" color="text.secondary">
//                                 AMOUNT
//                               </Typography>
//                             </Grid>
//                             <Grid item xs={2.5}>
//                               <Typography variant="caption" fontWeight="bold" color="text.secondary">
//                                 DISCOUNT
//                               </Typography>
//                             </Grid>
//                             <Grid item xs={2}>
//                               <Typography variant="caption" fontWeight="bold" color="text.secondary">
//                                 ADVANCE
//                               </Typography>
//                             </Grid>
//                             <Grid item xs={1}></Grid>
//                           </Grid>
//                         </Grid>
//                         {feeItems.map((item: any, itemIndex: number) => {
//                           const isMonthly = item.isMonthly;
//                           return (
//                             <Grid item xs={12} key={item.id}>
//                               <Grid
//                                 container
//                                 spacing={2}
//                                 alignItems="center"
//                                 sx={{
//                                   mb: 1,
//                                   bgcolor: isMonthly
//                                     ? alpha(theme.palette.info.light, 0.15)
//                                     : "transparent",
//                                   p: 0.5,
//                                   borderRadius: 1,
//                                 }}
//                               >
//                                 <Grid item xs={4}>
//                                   <CustomCraftIntAutoCompleteWithIcon
//                                     name={`fees.${index}.feeItems.${itemIndex}.feeType`}
//                                     label=""
//                                     options={classSpecificFeeOptions}
//                                     size="small"
//                                     fullWidth
//                                     placeholder="Select Fee Type"
//                                     multiple={false}
//                                     freeSolo={true}
//                                     icon={<Description color="disabled" sx={{ fontSize: 16 }} />}
//                                     disableClearable={false}
//                                     disabled={!selectedClass}
//                                     isOptionEqualToValue={(option: any, value: any) => {
//                                       if (!option || !value) return false;
//                                       const optVal = typeof option === "string" ? option : option.value;
//                                       const valVal = typeof value === "string" ? value : value.value;
//                                       return optVal === valVal;
//                                     }}
//                                     onChange={(e: any, val: any) => {
//                                       handleFeeTypeChange(index, itemIndex, val);
//                                     }}
//                                   />
//                                 </Grid>
//                                 <Grid item xs={2.5}>
//                                   <CustomCraftInput
//                                     name={`fees.${index}.feeItems.${itemIndex}.amount`}
//                                     label=""
//                                     fullWidth
//                                     size="small"
//                                     type="number"
//                                     InputProps={{
//                                       startAdornment: (
//                                         <InputAdornment position="start">
//                                           <Typography variant="body2" color="text.secondary">
//                                             ৳
//                                           </Typography>
//                                         </InputAdornment>
//                                       ),
//                                     }}
//                                     onChange={(e) => {
//                                       const val = parseFloat(e.target.value) || 0;
//                                       handleDiscountChange(index, itemIndex, 'amount', val);
//                                     }}
//                                   />
//                                 </Grid>
//                                 <Grid item xs={2.5}>
//                                   <CustomCraftInput
//                                     name={`fees.${index}.feeItems.${itemIndex}.discount`}
//                                     label=""
//                                     fullWidth
//                                     size="small"
//                                     type="number"
//                                     placeholder="0"
//                                     InputProps={{
//                                       startAdornment: (
//                                         <InputAdornment position="start">
//                                           <Typography variant="body2" color="text.secondary">
//                                             ৳
//                                           </Typography>
//                                         </InputAdornment>
//                                       ),
//                                     }}
//                                     onChange={(e: any) => {
//                                       const val = parseFloat(e.target.value) || 0;
//                                       handleDiscountChange(index, itemIndex, 'discount', val);
//                                     }}
//                                   />
//                                 </Grid>
//                                 <Grid item xs={2}>
//                                   <CustomCraftInput
//                                     name={`fees.${index}.feeItems.${itemIndex}.advanceAmount`}
//                                     label=""
//                                     fullWidth
//                                     size="small"
//                                     type="number"
//                                     disabled={!selectedClass || !item.amount}
//                                     InputProps={{
//                                       startAdornment: (
//                                         <InputAdornment position="start">
//                                           <Typography variant="body2" color="text.secondary">
//                                             ৳
//                                           </Typography>
//                                         </InputAdornment>
//                                       ),
//                                     }}
//                                     onChange={(e) => handleAdvanceAmountChange(index, itemIndex, e.target.value)}
//                                   />
//                                 </Grid>
//                                 <Grid item xs={1} sx={{ display: "flex", justifyContent: "center" }}>
//                                   <Tooltip title="Remove this item">
//                                     <IconButton size="small" onClick={() => removeFeeItem(index, itemIndex)} sx={{ color: "error.main" }}>
//                                       <Delete fontSize="small" />
//                                     </IconButton>
//                                   </Tooltip>
//                                 </Grid>

//                                 {/* Discount Range Section for Monthly Fees */}
//                                 {isMonthly && (
//                                   <RangeDiscountSection
//                                     feeIndex={index}
//                                     itemIndex={itemIndex}
//                                     item={item}
//                                     onApplyRangeDiscount={handleApplyRangeDiscount}
//                                   />
//                                 )}
//                               </Grid>
//                             </Grid>
//                           );
//                         })}
//                         <Grid item xs={12}>
//                           <Box sx={{ mt: 2, pt: 2, borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.2)}` }}>
//                             <Grid container spacing={2}>
//                               <Grid item xs={4}>
//                                 <Typography variant="body1" fontWeight="bold" color="primary.main">
//                                   TOTAL
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={2.5}>
//                                 <CraftInput
//                                   name={`fees.${index}.feeAmount`}
//                                   label=""
//                                   fullWidth
//                                   size="small"
//                                   type="number"
//                                   disabled={true}
//                                   value={feeAmount}
//                                   InputProps={{
//                                     startAdornment: (
//                                       <InputAdornment position="start">
//                                         <Typography variant="body2" color="text.secondary">
//                                           ৳
//                                         </Typography>
//                                       </InputAdornment>
//                                     ),
//                                     readOnly: true,
//                                   }}
//                                   sx={{
//                                     "& .MuiInputBase-input": {
//                                       backgroundColor: alpha(theme.palette.primary.light, 0.1),
//                                       fontWeight: "bold",
//                                       fontSize: "1.1rem",
//                                       color: theme.palette.primary.main,
//                                     },
//                                   }}
//                                 />
//                               </Grid>
//                               <Grid item xs={2.5}>
//                                 <Box
//                                   sx={{
//                                     p: 1.5,
//                                     bgcolor: alpha(theme.palette.warning.light, 0.1),
//                                     borderRadius: 1,
//                                     border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
//                                   }}
//                                 >
//                                   <Typography variant="body2" color="warning.main" align="center">
//                                     Disc: ৳
//                                     {feeItems
//                                       .reduce((sum: number, item: any) => {
//                                         let discount = parseFloat(item.discount) || 0;
//                                         const amount = parseFloat(item.amount) || 0;
//                                         if (item.discountType === 'percentage') {
//                                           discount = (amount * discount) / 100;
//                                         }

//                                         let rangeDiscount = 0;
//                                         if (item.isMonthly && item.discountRangeStart && item.discountRangeEnd && item.discountRangeAmount) {
//                                           const startIndex = MONTHS.indexOf(item.discountRangeStart);
//                                           const endIndex = MONTHS.indexOf(item.discountRangeEnd);
//                                           if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
//                                             rangeDiscount = (parseFloat(item.discountRangeAmount) || 0) * (endIndex - startIndex + 1);
//                                           }
//                                         }

//                                         return sum + discount + rangeDiscount;
//                                       }, 0)
//                                       .toLocaleString()}
//                                   </Typography>
//                                 </Box>
//                               </Grid>
//                               <Grid item xs={2}>
//                                 <Box
//                                   sx={{
//                                     p: 1.5,
//                                     bgcolor: alpha(theme.palette.info.light, 0.1),
//                                     borderRadius: 1,
//                                     border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
//                                   }}
//                                 >
//                                   <Typography variant="body2" color="info.main" align="center">
//                                     Advance: ৳
//                                     {feeItems
//                                       .reduce((sum: number, item: any) => sum + (parseFloat(item.advanceAmount) || 0), 0)
//                                       .toLocaleString()}
//                                   </Typography>
//                                 </Box>
//                               </Grid>
//                               <Grid item xs={1}></Grid>
//                             </Grid>
//                           </Box>
//                         </Grid>
//                       </Grid>
//                     </Paper>
//                   </Box>
//                 ) : (
//                   <Box sx={{ textAlign: "center", py: 3, color: "text.disabled" }}>
//                     <Typography variant="body2">No fee items found for this category</Typography>
//                   </Box>
//                 )
//               ) : null}
//             </Box>
//           );
//         })}
//         {fields.length === 0 && (
//           <Box sx={{ textAlign: "center", py: 4, color: "text.disabled" }}>
//             <Payment sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
//             <Typography variant="body2">
//               {!selectedClass ? "Select a class first to add fees" : "No fee categories added yet"}
//             </Typography>
//             <Button onClick={addFeeField} variant="outlined" sx={{ mt: 2 }} startIcon={<Add />} disabled={!selectedClass}>
//               Add First Category
//             </Button>
//           </Box>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// // Payment Summary Component
// const PaymentSummary = ({ studentAdvanceBalance = 0 }: { studentAdvanceBalance?: number }) => {
//   const theme = useTheme();
//   const { watch, setValue } = useFormContext();
//   const [paidAmount, setPaidAmount] = useState<number>(0);
//   const [paymentMethod, setPaymentMethod] = useState<string>("cash");

//   const paymentOptions = [
//     { label: "Cash", value: "cash" },
//     { label: "bKash", value: "bkash" },
//     { label: "Nagad", value: "nagad" },
//     { label: "Bank Transfer", value: "bank" },
//     { label: "Online", value: "online" },
//   ];

//   const calculateTotalFees = () => {
//     const fees = watch("fees") || [];
//     let total = 0;
//     fees.forEach((fee: any) => {
//       if (fee.feeItems && Array.isArray(fee.feeItems)) {
//         fee.feeItems.forEach((item: any) => {
//           total += parseFloat(item.amount) || 0;
//         });
//       }
//     });
//     return total;
//   };

//   const calculateTotalDiscount = () => {
//     const fees = watch("fees") || [];
//     let total = 0;
//     fees.forEach((fee: any) => {
//       if (fee.feeItems && Array.isArray(fee.feeItems)) {
//         fee.feeItems.forEach((item: any) => {
//           let discount = parseFloat(item.discount) || 0;
//           const amount = parseFloat(item.amount) || 0;
//           if (item.discountType === 'percentage') {
//             discount = (amount * discount) / 100;
//           }

//           let rangeDiscount = 0;
//           if (item.isMonthly && item.discountRangeStart && item.discountRangeEnd && item.discountRangeAmount) {
//             const startIndex = MONTHS.indexOf(item.discountRangeStart);
//             const endIndex = MONTHS.indexOf(item.discountRangeEnd);
//             if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
//               rangeDiscount = (parseFloat(item.discountRangeAmount) || 0) * (endIndex - startIndex + 1);
//             }
//           }

//           total += discount + rangeDiscount;
//         });
//       }
//     });
//     return total;
//   };

//   const calculateTotalAdvance = () => {
//     const fees = watch("fees") || [];
//     let total = 0;
//     fees.forEach((fee: any) => {
//       if (fee.feeItems && Array.isArray(fee.feeItems)) {
//         fee.feeItems.forEach((item: any) => {
//           total += parseFloat(item.advanceAmount) || 0;
//         });
//       }
//     });
//     return total;
//   };

//   const calculateSummary = () => {
//     const totalFees = calculateTotalFees();
//     const totalDiscount = calculateTotalDiscount();
//     const totalAdvance = calculateTotalAdvance();
//     const paidAmountNum = paidAmount || 0;
//     const netPayable = totalFees - totalDiscount;
//     const totalPaid = totalAdvance + paidAmountNum;
//     const dueAmount = Math.max(0, netPayable - totalPaid);

//     return {
//       totalFees,
//       totalDiscount,
//       totalAdvance,
//       netPayable,
//       paidAmount: paidAmountNum,
//       totalPaid,
//       dueAmount,
//     };
//   };

//   const summary = calculateSummary();

//   // Update form values
//   useEffect(() => {
//     setValue("totalFees", summary.totalFees);
//     setValue("totalDiscount", summary.totalDiscount);
//     setValue("totalAdvance", summary.totalAdvance);
//     setValue("netPayable", summary.netPayable);
//     setValue("paidAmount", summary.paidAmount);
//     setValue("dueAmount", summary.dueAmount);
//     setValue("paymentMethod", paymentMethod);
//   }, [summary, paymentMethod, setValue]);

//   const handlePaidAmountKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//   };

//   return (
//     <Card
//       elevation={2}
//       sx={{
//         borderRadius: 3,
//         overflow: "hidden",
//         border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//         boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//         background: "#fff",
//         mt: 3,
//       }}
//     >
//       <CardContent sx={{ p: 4 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 pb: 2,
//                 borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//               }}
//             >
//               <Box>
//                 <Typography variant="h6" color="text.primary" fontWeight="bold">
//                   Payment Summary
//                 </Typography>
//               </Box>
//               <Box sx={{ textAlign: 'right' }}>
//                 <Typography variant="h4" color="primary.main" fontWeight="800">
//                   ৳{summary.totalFees.toLocaleString()}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Total Fees
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>

//           <Grid item xs={12}>
//             <Grid container spacing={2}>
//               <Grid item xs={4}>
//                 <Paper sx={{ p: 2, textAlign: 'center', bgcolor: alpha(theme.palette.warning.light, 0.1) }}>
//                   <Typography variant="body2" color="text.secondary">Total Discount</Typography>
//                   <Typography variant="h6" color="warning.main">-৳{summary.totalDiscount.toLocaleString()}</Typography>
//                 </Paper>
//               </Grid>
//               <Grid item xs={4}>
//                 <Paper sx={{ p: 2, textAlign: 'center', bgcolor: alpha(theme.palette.primary.light, 0.1) }}>
//                   <Typography variant="body2" color="text.secondary">Net Payable</Typography>
//                   <Typography variant="h6" color="primary.main">৳{summary.netPayable.toLocaleString()}</Typography>
//                 </Paper>
//               </Grid>
//               <Grid item xs={4}>
//                 <Paper sx={{ p: 2, textAlign: 'center', bgcolor: alpha(theme.palette.info.light, 0.1) }}>
//                   <Typography variant="body2" color="text.secondary">Advance Used</Typography>
//                   <Typography variant="h6" color="info.main">৳{summary.totalAdvance.toLocaleString()}</Typography>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600 }}>
//               Payment Details
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <CustomCraftInput
//                   name="paidAmount"
//                   label="Pay Additional Amount Now"
//                   placeholder="0"
//                   type="number"
//                   fullWidth
//                   size="small"
//                   value={paidAmount.toString()}
//                   onChange={(e) => setPaidAmount(parseFloat(e.target.value) || 0)}
//                   onKeyDown={handlePaidAmountKeyDown}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Typography variant="body2" color="text.secondary">
//                           ৳
//                         </Typography>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//                 {studentAdvanceBalance > 0 && (
//                   <Typography variant="caption" color="info.main" sx={{ mt: 1, display: 'block' }}>
//                     Available Advance Balance: ৳{studentAdvanceBalance.toLocaleString()}
//                   </Typography>
//                 )}
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <CustomCraftIntAutoCompleteWithIcon
//                   name="paymentMethod"
//                   label="Payment Method"
//                   options={paymentOptions}
//                   size="small"
//                   multiple={false}
//                   icon={<Payment />}
//                   disableClearable
//                   fullWidth
//                   onChange={(e: any, value: any) => {
//                     setPaymentMethod(value?.value as string);
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid item xs={12}>
//             <Box
//               sx={{
//                 mt: 1,
//                 p: 3,
//                 borderRadius: 2,
//                 bgcolor: alpha(
//                   summary.dueAmount > 0 ? theme.palette.error.light : theme.palette.success.light,
//                   0.1
//                 ),
//                 border: `1px solid ${alpha(
//                   summary.dueAmount > 0 ? theme.palette.error.main : theme.palette.success.main,
//                   0.2
//                 )}`,
//                 textAlign: 'center'
//               }}
//             >
//               {summary.dueAmount > 0 ? (
//                 <Box>
//                   <Typography variant="body2" color="text.secondary">Due Amount after payment</Typography>
//                   <Typography variant="h4" fontWeight="bold" color="error.main">
//                     ৳{summary.dueAmount.toLocaleString()}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Status: Partial Payment
//                   </Typography>
//                 </Box>
//               ) : (
//                 <Box>
//                   <CheckCircle sx={{ fontSize: 40, color: theme.palette.success.main, mb: 1 }} />
//                   <Typography variant="h5" fontWeight="bold" color="success.main">
//                     Fully Paid
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     All fees have been paid in full
//                   </Typography>
//                 </Box>
//               )}
//             </Box>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// // Main AddFeeModal Component - FIXED VERSION
// const AddFeeModal = ({ open, setOpen, student, onAddFee, refetch }: AddFeeModalProps) => {
//   const theme = useTheme();
//   const [createFee, { isLoading }] = useCreateFeeMutation();
//   const { classOptions, feeCategoryData } = useAcademicOption();
//   const [selectedClass, setSelectedClass] = useState<string>("");
//   const [feeCategories, setFeeCategories] = useState<FeeCategory[]>([]);
//   const [studentAdvanceBalance, setStudentAdvanceBalance] = useState<number>(0);
//   const [enrollmentId, setEnrollmentId] = useState<string>("");
//   const [selectedMonth, setSelectedMonth] = useState<string>(
//     new Date().toLocaleString("default", { month: "long" })
//   );
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   const formattedClassOptions = useMemo(() => {
//     return classOptions.map((option: any) => ({
//       ...option,
//       label: option.label || option.name || "Unnamed Class",
//       value: option.value || option.id || "",
//     }));
//   }, [classOptions]);

//   useEffect(() => {
//     if (feeCategoryData?.data?.data) {
//       setFeeCategories(feeCategoryData.data.data);
//     }
//   }, [feeCategoryData]);

//   useEffect(() => {
//     if (student) {
//       let classNameString = "";

//       if (Array.isArray(student.className) && student.className[0]?.className) {
//         classNameString = student.className[0].className;
//       } else if (Array.isArray(student.className) && typeof student.className[0] === 'object') {
//         classNameString = student.className[0].name || student.className[0].label || student.className[0].className;
//       } else if (Array.isArray(student.className) && typeof student.className[0] === 'string') {
//         const matchedClass = formattedClassOptions.find((opt: any) => opt.value === student.className[0]);
//         classNameString = matchedClass ? matchedClass.label : student.className[0];
//       } else if (typeof student.className === 'string') {
//         const matchedClass = formattedClassOptions.find((opt: any) => opt.value === student.className);
//         classNameString = matchedClass ? matchedClass.label : student.className;
//       } else if (student.class) {
//         classNameString = student.class;
//       }

//       setSelectedClass(classNameString);

//       if (student.advanceBalance !== undefined) {
//         setStudentAdvanceBalance(student.advanceBalance);
//       }

//       if (student.enrollment?._id) {
//         setEnrollmentId(student.enrollment._id);
//       } else if (student._id) {
//         setEnrollmentId(student._id);
//       }
//     }
//   }, [student, formattedClassOptions]);

//   const getCurrentAcademicYear = () => {
//     const year = new Date().getFullYear();
//     return `${year}`;
//   };

//   const getMonths = () => {
//     const currentYear = new Date().getFullYear();
//     return MONTHS.map((month) => ({ label: `${month}-${currentYear}`, value: `${month}-${currentYear}` }));
//   };

//   const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//   };

//   const handleSubmit = async (data: FieldValues) => {
//     if (!student?._id) {
//       toast.error("Student information not found");
//       return;
//     }
//     if (!selectedClass) {
//       toast.error("Please select a class");
//       return;
//     }

//     // Prevent multiple submissions
//     if (isSubmitting) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const fees = data.fees || [];
//       if (!fees.length) {
//         toast.error("Please add at least one fee category");
//         setIsSubmitting(false);
//         return;
//       }

//       const feePromises: Promise<any>[] = [];
//       const month = data.month?.value || data.month;
//       const academicYear = data.academicYear || getCurrentAcademicYear();
//       const paymentMethod = data.paymentMethod?.value || data.paymentMethod || "cash";
//       const paidAmount = parseFloat(data.paidAmount) || 0;
//       const totalAdvance = parseFloat(data.totalAdvance) || 0;

//       fees.forEach((feeGroup: any) => {
//         if (feeGroup.feeItems && Array.isArray(feeGroup.feeItems)) {
//           feeGroup.feeItems.forEach((item: any) => {
//             const amount = parseFloat(item.amount) || 0;
//             const discount = parseFloat(item.discount) || 0;
//             const advanceAmount = parseFloat(item.advanceAmount) || 0;

//             let actualDiscount = discount;

//             if (item.discountType === 'percentage') {
//               actualDiscount = (amount * discount) / 100;
//             }

//             actualDiscount = Math.min(actualDiscount, amount);

//             const netAmount = amount - actualDiscount;
//             const paidFromAdvance = advanceAmount;
//             const dueAmount = Math.max(0, netAmount - paidFromAdvance);

//             let status = 'unpaid';
//             if (paidFromAdvance >= netAmount) {
//               status = 'paid';
//             } else if (paidFromAdvance > 0) {
//               status = 'partial';
//             }

//             const payload: any = {
//               student: student._id,
//               enrollment: enrollmentId || undefined,
//               class: selectedClass,
//               month: month,
//               academicYear: academicYear,
//               feeType: typeof item.feeType === "string" ? item.feeType : item.feeType?.value,
//               amount: amount,
//               paidAmount: paidFromAdvance,
//               advanceUsed: paidFromAdvance,
//               dueAmount: dueAmount,
//               discount: actualDiscount,
//               discountType: item.discountType || 'flat',
//               status: status,
//               paymentMethod: paymentMethod,
//               isCurrentMonth: true,
//               isMonthly: item.isMonthly || false,
//               paymentDate: paidFromAdvance > 0 ? new Date() : undefined,
//             };

//             if (item.isMonthly) {
//               if (item.discountRangeStart) payload.discountRangeStart = item.discountRangeStart;
//               if (item.discountRangeEnd) payload.discountRangeEnd = item.discountRangeEnd;
//               if (item.discountRangeAmount) payload.discountRangeAmount = item.discountRangeAmount;
//             }

//             feePromises.push(createFee(payload).unwrap());
//           });
//         }
//       });

//       // Wait for all promises to complete
//       const results = await Promise.all(feePromises);

//       // Only show success and close modal after all promises are successful
//       toast.success(`${results.length} fee(s) added successfully`);

//       if (refetch) {
//         await refetch();
//       }
//       if (onAddFee) {
//         onAddFee(data);
//       }

//       // Close modal only after everything is successful
//       setOpen(false);

//     } catch (error: any) {
//       console.error("Error adding fees:", error);
//       const errorMessage = error?.data?.message || error?.message || "An unexpected error occurred. Please try again.";
//       toast.error(errorMessage);
//       // Don't close modal on error
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const defaultFormValues = {
//     academicYear: getCurrentAcademicYear(),
//     month: `${selectedMonth}-${new Date().getFullYear()}`,
//     className: selectedClass,
//     fees: [{
//       category: [],
//       className: selectedClass,
//       feeItems: [],
//       feeAmount: "",
//       selectionMode: "admission"
//     }],
//     paymentMethod: { label: "Cash", value: "cash" },
//     paidAmount: 0,
//     totalFees: 0,
//     totalDiscount: 0,
//     totalAdvance: 0,
//     netPayable: 0,
//     dueAmount: 0,
//   };

//   return (
//     <CraftModal open={open} setOpen={setOpen} title="Add New Fees" size="xl">
//       <CraftForm onSubmit={handleSubmit} defaultValues={defaultFormValues}>
//         <form onKeyDown={handleFormKeyDown}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Alert severity="info" sx={{ borderRadius: 2 }}>
//                 <Box>
//                   <Typography variant="body2" fontWeight="bold">
//                     Student: {student?.studentName || student?.name} ({student?.studentId})
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Class: {selectedClass || "N/A"}
//                     {studentAdvanceBalance > 0 && (
//                       <Box component="span" sx={{ ml: 2, px: 1, py: 0.5, bgcolor: 'info.light', borderRadius: 1, fontSize: '0.75rem', color: 'info.dark' }}>
//                         Advance Balance: ৳{studentAdvanceBalance.toLocaleString()}
//                       </Box>
//                     )}
//                   </Typography>
//                 </Box>
//               </Alert>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <CustomCraftIntAutoCompleteWithIcon
//                 name="month"
//                 label="Month"
//                 placeholder="Select Month"
//                 options={getMonths()}
//                 fullWidth
//                 required
//                 icon={<CalendarMonth color="primary" />}
//                 multiple={false}
//                 freeSolo={false}
//                 onChange={(e: any, value: any) => {
//                   if (value?.label) {
//                     const monthPart = value.label.split('-')[0];
//                     setSelectedMonth(monthPart);
//                   }
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <CustomCraftInput
//                 name="academicYear"
//                 label="Academic Year"
//                 fullWidth
//                 size="small"
//                 value={getCurrentAcademicYear()}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <CalendarMonth sx={{ color: "text.secondary" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <DynamicFeeFields
//                 selectedClass={selectedClass}
//                 feeCategories={feeCategories}
//                 studentAdvanceBalance={studentAdvanceBalance}
//                 enrollmentId={enrollmentId}
//                 selectedMonth={selectedMonth}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <PaymentSummary studentAdvanceBalance={studentAdvanceBalance} />
//             </Grid>

//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 disabled={isLoading || isSubmitting || !selectedClass}
//                 startIcon={isLoading || isSubmitting ? <CircularProgress size={20} /> : <AttachMoney />}
//                 size="large"
//                 sx={{
//                   py: 1.5,
//                   background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
//                   "&:hover": {
//                     background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
//                   },
//                 }}
//               >
//                 {isLoading || isSubmitting ? "Adding Fees..." : "Add Fees"}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </CraftForm>
//     </CraftModal>
//   );
// };

// export default AddFeeModal;