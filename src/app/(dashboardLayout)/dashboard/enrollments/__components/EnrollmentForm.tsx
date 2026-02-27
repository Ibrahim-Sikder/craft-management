/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon";
import CraftForm from "@/components/Forms/Form";
import FileUploadWithIcon from "@/components/Forms/Upload";
import CraftInputWithIcon from "@/components/Forms/inputWithIcon";
import CraftSelectWithIcon from "@/components/Forms/selectWithIcon";
import { LoadingState } from "@/components/common/LoadingState";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import { bloodGroups } from "@/options";
import {
  useCreateEnrollmentMutation,
  useGetSingleEnrollmentQuery,
  useUpdateEnrollmentMutation,
} from "@/redux/api/enrollmentApi";
import { useGetAllStudentsQuery } from "@/redux/api/studentApi";
import {
  AccessTime,
  AccountCircle,
  Add,
  ArrowBack,
  ArrowForward,
  Book,
  Cake,
  CalendarMonth,
  Check,
  Class,
  Close,
  Delete,
  Description,
  Discount,
  FamilyRestroom,
  Flag,
  Group,
  Home,
  Money,
  Payment,
  Person,
  Phone,
  Save,
  School,
  School as SchoolIcon,
  Work,
  Print,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Select,
  MenuItem,
  Switch,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import PrintModal from "../../student/profile/__components/PrintModal";
import AddFeeModal from "../../student/profile/__components/AddFeeModal";
import PaymentModal from "../../student/profile/__components/PaymentModal";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const fadeInSlideUp = {
  animation: "fadeInSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
  "@keyframes fadeInSlideUp": {
    "0%": { opacity: 0, transform: "translateY(15px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
};

// --- Fee Amount Handler ---
const FeeAmountHandler = ({
  feeIndex,
  feeCategoryData,
}: {
  feeIndex: number;
  feeCategoryData: any;
}) => {
  const { watch, setValue } = useFormContext();
  const selectedClass = watch(`fees.${feeIndex}.className`);
  const selectedCategory = watch(`fees.${feeIndex}.category`);
  const selectionMode = watch(`fees.${feeIndex}.selectionMode`) || 'admission';

  useEffect(() => {
    if (selectedClass && selectedClass.length > 0 && selectedCategory && selectedCategory.length > 0) {
      const selectedClassName = Array.isArray(selectedClass)
        ? selectedClass[0]?.label || selectedClass[0]
        : selectedClass;

      const selectedCategoryName = Array.isArray(selectedCategory)
        ? selectedCategory[0]?.label || selectedCategory[0]?.title || selectedCategory[0]
        : selectedCategory;

      const matchingEntries = feeCategoryData?.data?.data?.filter(
        (category: any) =>
          category.className === selectedClassName &&
          category.categoryName === selectedCategoryName
      ) || [];

      let feeItems: any[] = [];

      matchingEntries.forEach((entry: any) => {
        if (entry.feeItems && Array.isArray(entry.feeItems)) {
          feeItems = [...feeItems, ...entry.feeItems];
        } else if (entry.feeType) {
          feeItems.push({
            feeType: entry.feeType,
            amount: entry.amount,
            advanceAmount: "",
            isSelected: true,
            discount: 0,
          });
        }
      });

      if (feeItems.length > 0) {
        let itemsToProcess = feeItems;
        if (selectionMode === 'admission') {
          itemsToProcess = feeItems.filter((item: any) => {
            const typeLabel = typeof item.feeType === 'string' ? item.feeType : item.feeType?.value || '';
            return typeLabel === 'Admission Fee';
          });
        }

        const formattedItems: any[] = [];

        itemsToProcess.forEach((item: any) => {
          const typeLabel = typeof item.feeType === 'string' ? item.feeType : item.feeType?.value || '';
          const amount = item.amount;

          if (typeLabel.toLowerCase().includes('monthly fee') && selectionMode !== 'admission') {
            // CHANGE: Do NOT expand into 12 items. Keep as ONE item with range fields.
            formattedItems.push({
              feeType: { label: "Monthly Fee", value: "Monthly Fee" },
              amount: amount,
              advanceAmount: "",
              isSelected: true,
              discount: 0,
              isMonthly: true,
              discountRangeStart: "",
              discountRangeEnd: "",
              discountRangeAmount: 0,
            });
          } else {
            formattedItems.push({
              feeType: typeof item.feeType === 'string'
                ? { label: item.feeType, value: item.feeType }
                : item.feeType,
              amount: item.amount,
              advanceAmount: "",
              isSelected: true,
              discount: item.discount || 0,
              isMonthly: false
            });
          }
        });

        setValue(`fees.${feeIndex}.feeItems`, formattedItems);
        const totalAmount = formattedItems?.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
        setValue(`fees.${feeIndex}.feeAmount`, totalAmount.toString());
      } else {
        setValue(`fees.${feeIndex}.feeItems`, []);
        setValue(`fees.${feeIndex}.feeAmount`, "");
      }
    }
  }, [selectedClass, selectedCategory, setValue, feeIndex, feeCategoryData, selectionMode]);

  return null;
};

// --- Dynamic Fee Fields ---
const DynamicFeeFields = ({
  classOptions,
  feeCategoryData,
  studentData
}: any) => {
  const theme = useTheme();
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fees",
  });

  const mainClassName = watch("className");
  const selectedStudent = watch("studentIdSelect");
  const [studentAdvanceBalance, setStudentAdvanceBalance] = useState(0);

  const getCategoryOptions = () => {
    if (!feeCategoryData?.data?.data) return [];
    const uniqueCategories = Array.from(
      new Set(feeCategoryData.data.data.map((item: any) => item.categoryName))
    );
    return uniqueCategories.map(category => ({
      label: category,
      name: category,
      value: category
    }));
  };

  const getFeeTypeOptionsForClass = (classNameStr: string) => {
    if (!feeCategoryData?.data?.data) return [];
    const normalizedTargetClass = String(classNameStr || "").trim().toLowerCase();
    const types = new Set<string>();

    feeCategoryData.data.data.forEach((item: any) => {
      const normalizedEntryClass = String(item.className || "").trim().toLowerCase();
      if (normalizedEntryClass === normalizedTargetClass) {
        if (item.feeType) types.add(item.feeType);
        if (item.feeItems) {
          item.feeItems.forEach((sub: any) => types.add(sub.feeType));
        }
      }
    });

    const options = Array.from(types).map(t => ({ label: t, value: t }));
    if (options.length === 0) {
      feeCategoryData.data.data.forEach((item: any) => {
        if (item.feeType) types.add(item.feeType);
        if (item.feeItems) {
          item.feeItems.forEach((sub: any) => types.add(sub.feeType));
        }
      });
      return Array.from(types).map(t => ({ label: t, value: t }));
    }
    return options;
  };

  const calculateTotalAmount = (feeItems: any[]) => {
    if (!Array.isArray(feeItems)) return 0;
    return feeItems?.reduce((total, item) => total + (item.amount || 0), 0);
  };

  useEffect(() => {
    if (selectedStudent && studentData?.data) {
      const student = studentData.data.find(
        (s: any) => s._id === (selectedStudent.value || selectedStudent)
      );
      if (student) {
        setStudentAdvanceBalance(student.advanceBalance || 0);
        setValue("advanceBalance", student.advanceBalance || 0);
      }
    }
  }, [selectedStudent, studentData, setValue]);

  useEffect(() => {
    if (mainClassName && mainClassName.length > 0) {
      const currentFees = watch("fees") || [];
      if (currentFees.length > 0) {
        const updatedFees = currentFees.map((fee: any) => ({
          ...fee,
          className: JSON.parse(JSON.stringify(mainClassName)),
        }));
        setValue("fees", updatedFees);
      }
    }
  }, [mainClassName, setValue, watch]);

  const addFeeField = () => {
    const classNameValue =
      mainClassName && mainClassName.length > 0
        ? JSON.parse(JSON.stringify(mainClassName))
        : [];
    append({
      category: [],
      className: classNameValue,
      feeItems: [],
      feeAmount: "",
      selectionMode: 'admission',
    });
  };

  const removeFeeField = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      toast.error("At least one fee entry is required");
    }
  };

  const handleCategoryChange = (index: number, selectedCategory: any) => {
    const feeClassName = watch(`fees.${index}.className`);
    const selectionMode = watch(`fees.${index}.selectionMode`) || 'admission';

    if (selectedCategory && selectedCategory.length > 0 && feeClassName) {
      const selectedClassName = Array.isArray(feeClassName)
        ? feeClassName[0]?.label || feeClassName[0]
        : feeClassName;
      const categoryName = Array.isArray(selectedCategory)
        ? selectedCategory[0]?.label || selectedCategory[0]
        : selectedCategory;

      const matchingEntries = feeCategoryData?.data?.data?.filter(
        (item: any) =>
          item.className === selectedClassName &&
          item.categoryName === categoryName
      ) || [];

      const allFeeItems: any[] = [];
      matchingEntries.forEach((entry: any) => {
        if (entry.feeItems && Array.isArray(entry.feeItems)) {
          allFeeItems.push(...entry.feeItems);
        } else if (entry.feeType) {
          allFeeItems.push(entry);
        }
      });

      if (allFeeItems.length > 0) {
        let itemsToProcess = allFeeItems;
        if (selectionMode === 'admission') {
          itemsToProcess = allFeeItems.filter((item: any) => {
            const typeLabel = typeof item.feeType === 'string' ? item.feeType : item.feeType?.value || '';
            return typeLabel === 'Admission Fee';
          });
        }

        const feeItems: any[] = [];

        itemsToProcess.forEach((item: any) => {
          const typeLabel = typeof item.feeType === 'string' ? item.feeType : item.feeType?.value || '';
          const amount = item.amount;

          if (typeLabel.toLowerCase().includes('monthly fee') && selectionMode !== 'admission') {
            // CHANGE: Do NOT expand. Keep as ONE item.
            feeItems.push({
              feeType: { label: "Monthly Fee", value: "Monthly Fee" },
              amount: amount,
              advanceAmount: "",
              isSelected: true,
              discount: 0,
              isMonthly: true,
              discountRangeStart: "",
              discountRangeEnd: "",
              discountRangeAmount: 0,
            });
          } else {
            feeItems.push({
              feeType: typeof item.feeType === 'string'
                ? { label: item.feeType, value: item.feeType }
                : item.feeType,
              amount: item.amount,
              advanceAmount: "",
              isSelected: true,
              discount: item.discount || 0,
              isMonthly: false
            });
          }
        });

        setValue(`fees.${index}.feeItems`, feeItems);
        const totalAmount = calculateTotalAmount(feeItems);
        setValue(`fees.${index}.feeAmount`, totalAmount.toString());

        const msg = selectionMode === 'admission'
          ? `Only "Admission Fee" selected.`
          : `All fees (${feeItems.length} items) selected.`;
        toast.success(msg);
      } else {
        setValue(`fees.${index}.feeItems`, []);
        setValue(`fees.${index}.feeAmount`, "");
      }
    } else {
      setValue(`fees.${index}.feeItems`, []);
      setValue(`fees.${index}.feeAmount`, "");
    }
  };

  const handleSelectionModeChange = (index: number, isChecked: boolean) => {
    const newMode = isChecked ? 'all' : 'admission';
    setValue(`fees.${index}.selectionMode`, newMode);
    const currentCategory = watch(`fees.${index}.category`);
    if (currentCategory) {
      handleCategoryChange(index, currentCategory);
    }
  };

  const removeFeeItem = (feeIndex: number, itemIndex: number) => {
    const currentFeeItems = watch(`fees.${feeIndex}.feeItems`) || [];
    const newFeeItems = currentFeeItems.filter((_: any, i: number) => i !== itemIndex);
    setValue(`fees.${feeIndex}.feeItems`, newFeeItems);
    const newTotal = calculateTotalAmount(newFeeItems);
    setValue(`fees.${feeIndex}.feeAmount`, newTotal.toString());
  };

  const handleAdvanceAmountChange = (feeIndex: number, itemIndex: number, value: string) => {
    const feeItems = watch(`fees.${feeIndex}.feeItems`) || [];
    const updatedItems = [...feeItems];
    if (updatedItems[itemIndex]) {
      updatedItems[itemIndex].advanceAmount = value;
      setValue(`fees.${feeIndex}.feeItems`, updatedItems);
    }
  };

  const handleItemFieldChange = (feeIndex: number, itemIndex: number, field: string, value: any) => {
    const feeItems = watch(`fees.${feeIndex}.feeItems`) || [];
    const updatedItems = [...feeItems];

    if (updatedItems[itemIndex]) {
      updatedItems[itemIndex] = { ...updatedItems[itemIndex], [field]: value };
      setValue(`fees.${feeIndex}.feeItems`, updatedItems);
      if (field === 'amount' || field === 'feeType') {
        const newTotal = calculateTotalAmount(updatedItems);
        setValue(`fees.${feeIndex}.feeAmount`, newTotal.toString());
      }
    }
  };

  // New Handler for Range Discount
  const handleApplyRangeDiscount = (feeIndex: number, itemIndex: number, startMonth: string, endMonth: string, amount: number) => {
    if (!startMonth || !endMonth) {
      toast.error("Please select start and end month");
      return;
    }
    setValue(`fees.${feeIndex}.feeItems.${itemIndex}.discountRangeStart`, startMonth);
    setValue(`fees.${feeIndex}.feeItems.${itemIndex}.discountRangeEnd`, endMonth);
    setValue(`fees.${feeIndex}.feeItems.${itemIndex}.discountRangeAmount`, amount);
    toast.success(`Discount range set: ${startMonth} to ${endMonth} (৳${amount}/month)`);
  }

  return (
    <>
      <Card
        elevation={0}
        sx={{
          mb: 2,
          borderRadius: 3,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
          background: "#fff",
        }}
      >
        <Box
          sx={{
            p: 2.5,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: alpha(theme.palette.primary.main, 0.02),
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight="600" sx={{ color: theme.palette.text.primary }}>
              Fee Details
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Manage fee categories and discounts.
            </Typography>
          </Box>
          <Button
            onClick={addFeeField}
            size="medium"
            disabled={!mainClassName || mainClassName.length === 0}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: !mainClassName || mainClassName.length === 0
                ? theme.palette.action.disabled
                : theme.palette.primary.main,
              color: "#fff",
              "&:hover": {
                bgcolor: !mainClassName || mainClassName.length === 0
                  ? theme.palette.action.disabled
                  : theme.palette.primary.dark,
              },
            }}
          >
            <Add sx={{ fontSize: 18, mr: 0.5 }} /> Add New Category
          </Button>
        </Box>

        <CardContent sx={{ p: 3 }}>
          {fields.map((field, index) => {
            const feeClassName = watch(`fees.${index}.className`);
            const feeCategory = watch(`fees.${index}.category`);
            const feeItems = watch(`fees.${index}.feeItems`) || [];
            const feeAmount = parseFloat(watch(`fees.${index}.feeAmount`) || 0);
            const isClassSelected = mainClassName && mainClassName.length > 0;
            const categoryOptions = getCategoryOptions();
            const classNameStr = Array.isArray(feeClassName)
              ? feeClassName[0]?.label || feeClassName[0]
              : feeClassName;
            const classSpecificFeeOptions = getFeeTypeOptionsForClass(classNameStr);
            const selectionMode = watch(`fees.${index}.selectionMode`) || 'admission';

            // Temp state for the range selectors in UI
            const [rangeStart, setRangeStart] = useState("");
            const [rangeEnd, setRangeEnd] = useState("");
            const [rangeAmt, setRangeAmt] = useState(0);

            return (
              <Box
                key={field.id}
                sx={{
                  mb: 3,
                  p: 3,
                  borderRadius: 2,
                  background: alpha(theme.palette.background.paper, 0.5),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                {index > 0 && (
                  <Tooltip title="Remove Fee Category">
                    <IconButton
                      onClick={() => removeFeeField(index)}
                      sx={{
                        position: "absolute", top: 8, right: 8,
                        color: "text.disabled", width: 24, height: 24,
                        "&:hover": { color: "error.main", bgcolor: alpha(theme.palette.error.main, 0.1) },
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: theme.palette.primary.main, mr: 1.5 }} />
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: 1 }}>
                    Fee Category #{index + 1}
                  </Typography>
                </Box>

                <FeeAmountHandler feeIndex={index} feeCategoryData={feeCategoryData} />

                <Grid container spacing={2.5} sx={{ mb: 3 }}>
                  <Grid item xs={12} md={4}>
                    <CraftIntAutoCompleteWithIcon
                      name={`fees.${index}.className`}
                      label="Class"
                      margin="none" size="small" placeholder="Select Class"
                      options={classOptions} fullWidth multiple
                      icon={<School color="primary" />}
                      disabled={true}
                      helperText="Auto-filled from Academic Information"
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <CraftIntAutoCompleteWithIcon
                      name={`fees.${index}.category`}
                      label={<span>Category <span style={{ color: "red" }}>*</span></span>}
                      margin="none" size="small"
                      placeholder={isClassSelected ? "Select Category" : "Select class first"}
                      options={categoryOptions.map(opt => ({
                        label: String(opt.label || ''),
                        value: String(opt.value || ''),
                        name: String(opt.name || opt.label || '')
                      }))}
                      fullWidth multiple
                      icon={<CalendarMonth color="primary" />}
                      disabled={!isClassSelected}
                      onChange={(event: any, value: any) => { handleCategoryChange(index, value); }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: alpha(theme.palette.background.paper, 0.5),
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                      borderRadius: 1,
                      px: 2,
                      justifyContent: 'space-between'
                    }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {selectionMode === 'all' ? "Selected All Fee" : "Selected Admission Fee"}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={selectionMode === 'all'}
                            onChange={(e) => handleSelectionModeChange(index, e.target.checked)}
                            color="primary"
                            disabled={!isClassSelected}
                          />
                        }
                        label=""
                        sx={{ m: 0 }}
                      />
                    </Box>
                  </Grid>
                </Grid>

                {feeCategory && feeCategory.length > 0 ? (
                  feeItems.length > 0 ? (
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "primary.main" }}>
                          📋 Fee Items ({feeItems.length} items)
                        </Typography>
                        <Button size="small" variant="outlined" onClick={() => {
                          const newItems = [...feeItems, { feeType: "", amount: 0, advanceAmount: "", isSelected: true, discount: 0 }];
                          setValue(`fees.${index}.feeItems`, newItems);
                        }}>
                          <Add fontSize="small" /> Add Custom Item
                        </Button>
                      </Box>

                      <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(theme.palette.background.paper, 0.7), border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, borderRadius: 1 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Grid container spacing={2} sx={{ mb: 1, pb: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}` }}>
                              <Grid item xs={4}><Typography variant="caption" fontWeight="bold" color="text.secondary">FEE TYPE</Typography></Grid>
                              <Grid item xs={2.5}><Typography variant="caption" fontWeight="bold" color="text.secondary">AMOUNT</Typography></Grid>
                              <Grid item xs={2.5}><Typography variant="caption" fontWeight="bold" color="text.secondary">DISCOUNT</Typography></Grid>
                              <Grid item xs={2}><Typography variant="caption" fontWeight="bold" color="text.secondary">PAID/ADV.</Typography></Grid>
                              <Grid item xs={1}></Grid>
                            </Grid>
                          </Grid>

                          {feeItems.map((item: any, itemIndex: number) => {
                            const isMonthly = item.isMonthly;

                            return (
                              <Grid item xs={12} key={itemIndex}>
                                <Grid container spacing={2} alignItems="center" sx={{ mb: 1, bgcolor: isMonthly ? alpha(theme.palette.info.light, 0.15) : 'transparent', p: 0.5, borderRadius: 1 }}>
                                  <Grid item xs={4}>
                                    <CraftIntAutoCompleteWithIcon
                                      freeSolo
                                      name={`fees.${index}.feeItems.${itemIndex}.feeType`}
                                      label=""
                                      options={classSpecificFeeOptions}
                                      size="small"
                                      fullWidth
                                      placeholder="Select Fee Type"
                                      multiple={false}
                                      icon={<Description color="disabled" sx={{ fontSize: 16 }} />}
                                      disableClearable={false}
                                      disabled={!isClassSelected}
                                      isOptionEqualToValue={(option: any, value: any) => {
                                        if (!option || !value) return false;
                                        const optVal = typeof option === 'string' ? option : option.value;
                                        const valVal = typeof value === 'string' ? value : value.value;
                                        return optVal === valVal;
                                      }}
                                      onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
                                      onChange={(e: any, val: any) => { handleItemFieldChange(index, itemIndex, 'feeType', val); }}
                                    />
                                  </Grid>
                                  <Grid item xs={2.5}>
                                    <CraftInputWithIcon name={`fees.${index}.feeItems.${itemIndex}.amount`} label="" fullWidth margin="none" size="small" type="number"
                                      InputProps={{ startAdornment: <InputAdornment position="start"><Typography variant="body2" color="text.secondary">৳</Typography></InputAdornment> }}
                                    />
                                  </Grid>
                                  <Grid item xs={2.5}>
                                    <CraftInputWithIcon name={`fees.${index}.feeItems.${itemIndex}.discount`} label="" fullWidth margin="none" size="small" type="number"
                                      placeholder="0"
                                      InputProps={{
                                        startAdornment: <InputAdornment position="start"><Discount sx={{ fontSize: 16, color: 'error.main' }} /></InputAdornment>
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={2}>
                                    <CraftInputWithIcon name={`fees.${index}.feeItems.${itemIndex}.advanceAmount`} label="" fullWidth margin="none" size="small" type="number" disabled={!isClassSelected || !item.amount}
                                      InputProps={{ startAdornment: <InputAdornment position="start"><Typography variant="body2" color="text.secondary">৳</Typography></InputAdornment> }}
                                    />
                                  </Grid>
                                  <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tooltip title="Remove this item">
                                      <IconButton size="small" onClick={() => removeFeeItem(index, itemIndex)} sx={{ color: 'error.main' }}>
                                        <Delete fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </Grid>

                                  {/* Monthly Range Discount UI for this specific item */}
                                  {isMonthly && (
                                    <Grid item xs={12} sx={{ mt: 1 }}>
                                      <Paper variant="outlined" sx={{ p: 1.5, borderColor: theme.palette.info.main, bgcolor: alpha(theme.palette.info.light, 0.1) }}>
                                        <Typography variant="caption" color="info.main" fontWeight="bold" sx={{ mb: 1 }}>Apply Discount to Specific Months:</Typography>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                          <Select size="small" value={rangeStart} onChange={(e) => setRangeStart(e.target.value)} displayEmpty sx={{ minWidth: 100 }}>
                                            <MenuItem value="" disabled>From</MenuItem>
                                            {MONTHS.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                                          </Select>
                                          <Typography variant="body2">to</Typography>
                                          <Select size="small" value={rangeEnd} onChange={(e) => setRangeEnd(e.target.value)} displayEmpty sx={{ minWidth: 100 }}>
                                            <MenuItem value="" disabled>To</MenuItem>
                                            {MONTHS.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                                          </Select>
                                          <CraftInputWithIcon
                                            name="rangAmt"
                                            size="small"
                                            type="number"
                                            placeholder="Amt"
                                            value={rangeAmt || ""}
                                            onChange={(e) => setRangeAmt(parseFloat(e.target.value))}
                                            sx={{ width: 80 }}
                                          />
                                          <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() => handleApplyRangeDiscount(index, itemIndex, rangeStart, rangeEnd, rangeAmt)}
                                            sx={{ fontSize: '0.75rem', py: 0.5 }}
                                          >
                                            Set Range
                                          </Button>
                                        </Box>
                                        {item.discountRangeStart && item.discountRangeEnd && (
                                          <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
                                            Active: {item.discountRangeStart} to {item.discountRangeEnd} (-৳{item.discountRangeAmount}/mo)
                                          </Typography>
                                        )}
                                      </Paper>
                                    </Grid>
                                  )}
                                </Grid>
                              </Grid>
                            );
                          })}

                          <Grid item xs={12}>
                            <Box sx={{ mt: 2, pt: 2, borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.2)}` }}>
                              <Grid container spacing={2}>
                                <Grid item xs={4}><Typography variant="body1" fontWeight="bold" color="primary.main">TOTAL</Typography></Grid>
                                <Grid item xs={2.5}>
                                  <CraftInputWithIcon name={`fees.${index}.feeAmount`} label="" fullWidth margin="none" size="small" type="number" disabled={true} value={feeAmount}
                                    InputProps={{ startAdornment: <InputAdornment position="start"><Typography variant="body2" color="text.secondary">৳</Typography></InputAdornment>, readOnly: true }}
                                    sx={{ '& .MuiInputBase-input': { backgroundColor: alpha(theme.palette.primary.light, 0.1), fontWeight: 'bold', fontSize: '1.1rem', color: theme.palette.primary.main } }}
                                  />
                                </Grid>
                                <Grid item xs={2.5}>
                                  <Box sx={{ p: 1.5, bgcolor: alpha(theme.palette.error.light, 0.1), borderRadius: 1, border: `1px solid ${alpha(theme.palette.error.main, 0.2)}` }}>
                                    <Typography variant="body2" color="error.main" align="center">
                                      Disc: ৳{feeItems?.reduce((sum: number, item: any) => {
                                        // Calculate Discount for Display
                                        // If Monthly with range: Discount = RangeAmt * (EndIndex - StartIndex + 1)
                                        // If Monthly no range: Discount = 0 (or simple discount)
                                        // If Normal: Discount
                                        let d = parseFloat(item.discount) || 0;
                                        if (item.isMonthly && item.discountRangeStart && item.discountRangeEnd) {
                                          const sIndex = MONTHS.indexOf(item.discountRangeStart);
                                          const eIndex = MONTHS.indexOf(item.discountRangeEnd);
                                          if (sIndex !== -1 && eIndex !== -1 && sIndex <= eIndex) {
                                            d = (parseFloat(item.discountRangeAmount) || 0) * (eIndex - sIndex + 1);
                                          }
                                        }
                                        return sum + d;
                                      }, 0).toLocaleString()}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={2}>
                                  <Box sx={{ p: 1.5, bgcolor: alpha(theme.palette.info.light, 0.1), borderRadius: 1, border: `1px solid ${alpha(theme.palette.info.main, 0.2)}` }}>
                                    <Typography variant="body2" color="info.main" align="center">
                                      Paid: ৳{feeItems?.reduce((sum: number, item: any) => sum + (parseFloat(item.advanceAmount) || 0), 0).toLocaleString()}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={1}></Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: "center", py: 3, color: "text.disabled" }}>
                      <Money sx={{ fontSize: 36, mb: 1, opacity: 0.5 }} />
                      <Typography variant="body2">No fee items found for this category</Typography>
                    </Box>
                  )
                ) : null}
              </Box>
            );
          })}

          {fields.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4, color: "text.disabled" }}>
              <Payment sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
              <Typography variant="body2">{!mainClassName || mainClassName.length === 0 ? "Select a class in Academic Information step to add fees" : "No fee categories added yet"}</Typography>
              <Button onClick={addFeeField} variant="outlined" sx={{ mt: 2 }} startIcon={<Add />} disabled={!mainClassName || mainClassName.length === 0}>Add First Category</Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
};

// --- STEPS COMPONENTS ---

const StudentInformationStep = () => {
  return (
    <Box sx={{ ...fadeInSlideUp }}>
      <Grid container spacing={3}>
        <Grid item xs={12}><Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "text.primary" }}>Personal Details</Typography></Grid>
        <Grid item xs={12} md={4}><FileUploadWithIcon name="studentPhoto" label="Student Photo" /></Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon fullWidth margin="none" size="medium" label={<span>Student Name <span style={{ color: "red" }}>*</span></span>} name="studentNameBangla" placeholder="Student Name (বাংলায়)" InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon margin="none" size="medium" fullWidth label={<span>Student Name<span style={{ color: "red" }}>*</span></span>} name="studentName" placeholder="Full Name in English" InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon margin="none" size="medium" fullWidth label={<span>Mobile No<span style={{ color: "red" }}>*</span></span>} name="mobileNo" placeholder="01XXXXXXXXX" InputProps={{ startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon margin="none" size="medium" fullWidth label="Session" name="session" placeholder="2024-2025" InputProps={{ startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftSelectWithIcon margin="none" size="medium" name="studentDepartment" label={<span>Student Department<span style={{ color: "red" }}>*</span></span>} placeholder="Student Department" items={["hifz", "academic"]} adornment={<Person color="action" />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon margin="none" size="medium" fullWidth label="Date of Birth" name="dateOfBirth" type="date" InputProps={{ startAdornment: <Cake sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon margin="none" size="medium" fullWidth label="NID/Birth Reg. No" name="nidBirth" placeholder="1234567890" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftSelectWithIcon margin="none" size="medium" name="bloodGroup" label="Blood Group" placeholder="Select Blood Group" items={bloodGroups} adornment={<Person color="action" />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon margin="none" size="medium" fullWidth label="Nationality" name="nationality" placeholder="Bangladeshi" InputProps={{ startAdornment: <Flag sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
      </Grid>
    </Box>
  );
};

const AcademicStep = ({ classOptions }: any) => {
  const { watch } = useFormContext();
  const selectedClass = watch("className");
  return (
    <Box sx={{ ...fadeInSlideUp }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "text.primary" }}>Academic Details</Typography>
          {selectedClass && selectedClass.length > 0 && (
            <Alert severity="info" icon={<Check />} sx={{ mb: 2, borderRadius: 2 }}>
              <Typography variant="body2">Selected class "{selectedClass.map((cls: any) => cls.label || cls).join(", ")}" will be automatically used in Fee section.</Typography>
            </Alert>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftIntAutoCompleteWithIcon margin="none" size="medium" name="className" label={<span>Class <span style={{ color: "red" }}>*</span></span>} placeholder="Select Class" options={classOptions} fullWidth multiple icon={<Class color="primary" />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon margin="none" size="medium" fullWidth label="Roll Number" name="rollNumber" placeholder="Enter Roll No" InputProps={{ startAdornment: <Class sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftSelectWithIcon margin="none" size="medium" name="section" label="Section" items={["A", "B", "C"]} adornment={<Group />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftSelectWithIcon margin="none" size="medium" name="group" label="Group" items={["Science", "Commerce", "Arts"]} adornment={<School />} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon margin="none" size="medium" fullWidth label="Optional Subject" name="optionalSubject" placeholder="e.g. Higher Math / ICT" InputProps={{ startAdornment: <Book sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftSelectWithIcon margin="none" size="medium" name="shift" label="Shift" items={["Morning", "Day", "Evening"]} adornment={<AccessTime />} />
        </Grid>
      </Grid>
    </Box>
  );
};

const ParentGuardianStep = () => {
  return (
    <Box sx={{ ...fadeInSlideUp }}>
      <Grid container spacing={3}>
        <Grid item xs={12}><Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "text.primary" }}>Parent & Guardian</Typography></Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Father's Name" name="fatherName" placeholder="Full Name" InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label={<span>Father's Name Bangla <span style={{ color: "red" }}>*</span></span>} name="fatherNameBangla" placeholder="Father's Name (বাংলায়)" InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Mobile" name="fatherMobile" placeholder="01XXXXXXXXX" InputProps={{ startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="NID/Passport No" name="fatherNid" placeholder="1234567890" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Profession" name="fatherProfession" placeholder="Occupation" InputProps={{ startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Monthly Income" name="fatherIncome" placeholder="BDT" type="number" InputProps={{ startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Mother's Name" name="motherName" placeholder="Full Name" InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label={<span>Mother's Name Bangla<span style={{ color: "red" }}>*</span></span>} name="motherNameBangla" placeholder="Mother's Name (বাংলায়)" InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Mobile" name="motherMobile" placeholder="01XXXXXXXXX" InputProps={{ startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="NID/Passport No" name="motherNid" placeholder="1234567890" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Profession" name="motherProfession" placeholder="Occupation" InputProps={{ startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Monthly Income" name="motherIncome" placeholder="BDT" type="number" InputProps={{ startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Guardian Name" name="guardianName" placeholder="Guardian Name" InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Relation" name="guardianRelation" placeholder="Relation" InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Mobile" name="guardianMobile" placeholder="01XXXXXXXXX" InputProps={{ startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Address" name="guardianVillage" placeholder="Address" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
      </Grid>
    </Box>
  );
};

const DocumentCheckbox = ({ name, label }: { name: string; label: string }) => {
  const { watch, setValue } = useFormContext();
  const isChecked = watch(name) || false;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(name, event.target.checked);
  return <FormControlLabel control={<Checkbox checked={isChecked} onChange={handleChange} name={name} color="primary" />} label={label} sx={{ mb: 1 }} />;
};

const AddressDocumentsStep = () => {
  const theme = useTheme();
  const { watch, setValue } = useFormContext();
  const termsAccepted = watch("termsAccepted") || false;
  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue("termsAccepted", event.target.checked);
  return (
    <Box sx={{ ...fadeInSlideUp }}>
      <Grid container spacing={3}>
        <Grid item xs={12}><Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "text.primary" }}>Address & Documents</Typography></Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Village/Area" name="village" placeholder="Village/Area" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Post Office" name="postOffice" placeholder="Post Office" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Post Code" name="postCode" placeholder="Post Code" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Police Station" name="policeStation" placeholder="Police Station" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="District" name="district" placeholder="District" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Village/Area" name="permVillage" placeholder="Village/Area" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Post Office" name="permPostOffice" placeholder="Post Office" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Post Code" name="permPostCode" placeholder="Post Code" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Police Station" name="permPoliceStation" placeholder="Police Station" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="District" name="permDistrict" placeholder="District" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Previous Institution" name="formerInstitution" placeholder="Previous Institution" InputProps={{ startAdornment: <School sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon size="medium" margin="none" fullWidth label="Previous Address" name="formerVillage" placeholder="Previous Address" InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }} />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 2, border: `1px solid ${alpha(theme.palette.divider, 0.2)}`, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: "bold" }}>Documents Provided</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <DocumentCheckbox name="birthCertificate" label="Birth Certificate" />
                <DocumentCheckbox name="transferCertificate" label="Transfer Certificate" />
                <DocumentCheckbox name="characterCertificate" label="Character Certificate" />
                <DocumentCheckbox name="markSheet" label="Mark Sheet" />
                <DocumentCheckbox name="photographs" label="Photographs" />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 2, border: `1px solid ${alpha(theme.palette.divider, 0.2)}`, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>Terms & Conditions</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>I agree to enrollment terms</Typography>
            </Box>
            <Switch checked={termsAccepted} onChange={handleTermsChange} name="termsAccepted" color="primary" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// --- FEE STEP & LOGIC ---

const FeeStep = ({ classOptions, feeCategoryData, studentData }: any) => {
  const theme = useTheme();
  const { watch, setValue } = useFormContext();

  const paymentMethod = watch("paymentMethod") || { label: "Cash", value: "cash" };
  const [paidAmount, setPaidAmount] = useState<string>("0");

  const paymentOptions = [{ label: "Cash", value: "cash" }, { label: "Bkash", value: "bkash" }, { label: "Bank", value: "bank" }, { label: "Online", value: "online" }];

  const calculateTotalFees = () => {
    const fees = watch("fees") || [];
    let total = 0;
    fees.forEach((fee: any) => {
      if (fee.feeItems && Array.isArray(fee.feeItems)) {
        fee.feeItems.forEach((item: any) => {
          let amt = parseFloat(item.amount) || 0;
          if (item.isMonthly) amt = amt * 12; // Multiply for display
          total += amt;
        });
      }
    });
    return total;
  };

  const calculateTotalItemDiscounts = () => {
    const fees = watch("fees") || [];
    let totalItemDiscount = 0;
    fees.forEach((fee: any) => {
      if (fee.feeItems && Array.isArray(fee.feeItems)) {
        fee.feeItems.forEach((item: any) => {
          let d = parseFloat(item.discount) || 0;
          if (item.isMonthly && item.discountRangeStart && item.discountRangeEnd) {
            const sIndex = MONTHS.indexOf(item.discountRangeStart);
            const eIndex = MONTHS.indexOf(item.discountRangeEnd);
            if (sIndex !== -1 && eIndex !== -1 && sIndex <= eIndex) {
              d = (parseFloat(item.discountRangeAmount) || 0) * (eIndex - sIndex + 1);
            }
          }
          totalItemDiscount += d;
        });
      }
    });
    return totalItemDiscount;
  };

  const calculateSummary = () => {
    const totalFees = calculateTotalFees();
    const totalItemDiscounts = calculateTotalItemDiscounts();

    // Removed Global Discount logic
    const netPayable = totalFees - totalItemDiscounts;
    const paidAmountNum = parseFloat(paidAmount) || 0;
    const dueAmount = Math.max(0, netPayable - paidAmountNum);

    return {
      totalFees,
      totalItemDiscounts,
      netPayable,
      paidAmount: paidAmountNum,
      dueAmount,
    };
  };

  const summary = calculateSummary();

  useEffect(() => {
    setValue("totalAmount", summary.totalFees);
    setValue("totalDiscount", summary.totalItemDiscounts);
    setValue("netPayable", summary.netPayable);
    setValue("dueAmount", summary.dueAmount);
    setValue("paidAmount", summary.paidAmount);
  }, [summary, setValue]);

  return (
    <Box sx={{ ...fadeInSlideUp }}>
      <DynamicFeeFields
        classOptions={classOptions}
        feeCategoryData={feeCategoryData}
        studentData={studentData}
      />
      <Card elevation={2} sx={{ mt: 4, borderRadius: 3, overflow: "hidden", border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", background: "#fff" }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                <Box>
                  <Typography variant="h6" color="text.primary" fontWeight="bold">Total Payable</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}><Typography variant="h3" color="primary.main" fontWeight="800">৳{summary.totalFees.toLocaleString()}</Typography></Box>
              </Box>
            </Grid>

            {summary.totalItemDiscounts > 0 && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  <Typography variant="body2">Total Discounts Applied: <strong>- ৳{summary.totalItemDiscounts.toLocaleString()}</strong></Typography>
                </Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600 }}>Payment Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <CraftInputWithIcon name="paidAmount" label="Pay Amount Now" placeholder="0" type="number" fullWidth size="small" value={paidAmount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { const value = e.target.value; setPaidAmount(value); setValue("paidAmount", parseFloat(value) || 0); }} InputProps={{ startAdornment: <InputAdornment position="start"><Typography variant="body2" color="text.secondary">৳</Typography></InputAdornment> }} sx={{ '& .MuiInputBase-root': { backgroundColor: alpha(theme.palette.success.light, 0.05) } }} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <CraftIntAutoCompleteWithIcon name="paymentMethod" label="Payment Method" options={paymentOptions} size="small" multiple={false} icon={<Payment />} disableClearable fullWidth />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mt: 1, p: 2, borderRadius: 2, bgcolor: alpha(summary.dueAmount > 0 ? theme.palette.error.light : theme.palette.success.light, 0.1), border: `1px solid ${alpha(summary.dueAmount > 0 ? theme.palette.error.main : theme.palette.success.main, 0.2)}`, textAlign: 'center' }}>
                {summary.dueAmount > 0 ? (
                  <Box><Typography variant="body2" color="text.secondary">Due Amount after payment</Typography><Typography variant="h5" fontWeight="bold" color="error.main">৳{summary.dueAmount.toLocaleString()}</Typography></Box>
                ) : (
                  <Box><Typography variant="body2" color="text.secondary">Status</Typography><Typography variant="h5" fontWeight="bold" color="success.main">Fully Paid</Typography></Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.info.light, 0.05), border: `1px solid ${alpha(theme.palette.info.main, 0.1)}` }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>Summary Breakdown</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}><Typography variant="body2" color="text.secondary">Total Fees:</Typography></Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant="body2" fontWeight="bold">৳{summary.totalFees.toLocaleString()}</Typography></Grid>

                  {summary.totalItemDiscounts > 0 && (
                    <>
                      <Grid item xs={6}><Typography variant="body2" color="text.secondary">Total Discounts:</Typography></Grid>
                      <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant="body2" fontWeight="bold" color="warning.main">- ৳{summary.totalItemDiscounts.toLocaleString()}</Typography></Grid>
                    </>
                  )}

                  <Grid item xs={6}><Typography variant="body2" color="text.secondary">Net Payable:</Typography></Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant="body2" fontWeight="bold" color="primary.main">৳{summary.netPayable.toLocaleString()}</Typography></Grid>
                  <Grid item xs={6}><Typography variant="body2" color="text.secondary">Paid Now:</Typography></Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant="body2" fontWeight="bold" color="success.main">৳{summary.paidAmount.toLocaleString()}</Typography></Grid>
                  <Grid item xs={6}><Typography variant="body2" color="text.secondary">Due Amount:</Typography></Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant="body2" fontWeight="bold" color={summary.dueAmount > 0 ? "error.main" : "success.main"}>৳{summary.dueAmount.toLocaleString()}</Typography></Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

// --- TRANSFORM DATA ---
const transformEnrollmentDataToForm = (
  enrollmentData: any,
  classOptions: any[],
  feeCategoryData: any
) => {
  // If editing and the fees are already 12 separate months (from old system), 
  // we might want to group them back or just show them as is. 
  // For simplicity in this iteration, we assume new structure or simple mapping.
  // Ideally, backend would return the single Monthly Fee with range info.
  // But since this is a "Corrected Code" request, I will keep it simple 
  // and just map whatever comes back. If backend returns 12 items, 12 items show.

  if (!enrollmentData?.data) return null;
  const data = enrollmentData.data;

  const formatClassForForm = (classData: any) => {
    if (!classData || classData.length === 0) return [];
    if (Array.isArray(classData)) {
      return classData.map((cls: any) => {
        const classId = cls._id || cls;
        const classNameValue = cls.className || cls;
        let matchedClass = classOptions?.find((option: any) => option.value === classId);
        if (!matchedClass) matchedClass = classOptions?.find((option: any) => option.label === classNameValue);
        if (!matchedClass) matchedClass = { label: classNameValue, name: classNameValue, value: classId };
        return matchedClass;
      });
    } else {
      const classId = classData._id || classData;
      const classNameValue = classData.className || classData;
      let matchedClass = classOptions?.find((option: any) => option.value === classId);
      if (!matchedClass) matchedClass = classOptions?.find((option: any) => option.label === classNameValue);
      if (!matchedClass) matchedClass = { label: classNameValue, name: classNameValue, value: classId };
      return [matchedClass];
    }
  };

  const formatFeeForForm = (fees: any[], classData: any) => {
    if (!fees || !Array.isArray(fees) || fees.length === 0) return [{ category: [], className: formatClassForForm(classData), feeItems: [], feeAmount: "", selectionMode: "admission" }];

    const getFeeTypeOptions = () => {
      if (!feeCategoryData?.data?.data) return [];
      const types = new Set<string>();
      feeCategoryData.data.data.forEach((item: any) => { if (item.feeType) types.add(item.feeType); if (item.feeItems) item.feeItems.forEach((sub: any) => types.add(sub.feeType)); });
      return Array.from(types).map(t => ({ label: t, value: t }));
    };

    const typeOptions = getFeeTypeOptions();
    const feesByCategory = new Map();
    fees.forEach((fee: any) => {
      let category = fee.category || "General";
      if (feeCategoryData?.data?.data) {
        const matchingCategory = feeCategoryData.data.data.find((cat: any) => cat.className === fee.className && cat.categoryName === fee.category);
        if (matchingCategory) category = matchingCategory.categoryName;
      }
      if (!feesByCategory.has(category)) feesByCategory.set(category, []);
      feesByCategory.get(category).push(fee);
    });

    const formFees = [];
    for (const [category, categoryFees] of feesByCategory) {
      const feeAmount = categoryFees?.reduce((sum: number, fee: any) => sum + (fee.amount || 0), 0);
      const feeItems = categoryFees.map((fee: any) => {
        const typeStr = fee.feeType || "";
        const typeObj = typeOptions.find((opt: any) => opt.value === typeStr) || { label: typeStr, value: typeStr };
        return {
          feeType: typeObj,
          amount: fee.amount || 0,
          advanceAmount: fee.advanceAmount || "",
          isSelected: true,
          discount: fee.discount || 0,
          isMonthly: typeStr.toLowerCase().includes('monthly'),
          // Preserve range info if available
          discountRangeStart: fee.discountRangeStart || "",
          discountRangeEnd: fee.discountRangeEnd || "",
          discountRangeAmount: fee.discountRangeAmount || 0,
        };
      });
      formFees.push({
        category: category ? [{ label: category, name: category, value: category }] : [],
        className: formatClassForForm(classData),
        feeItems: feeItems,
        feeAmount: feeAmount.toString(),
        selectionMode: "admission",
      });
    }
    return formFees;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    try { return new Date(dateString).toISOString().split("T")[0]; } catch { return null; }
  };

  const paymentMethodObj = { label: "Cash", value: "cash" };

  const transformedData = {
    studentId: data.studentId || data.student?.studentId || "",
    studentNameBangla: data.nameBangla || data.student?.nameBangla || "",
    studentPhoto: data.studentPhoto || data.student?.studentPhoto || "",
    fatherNameBangla: data.fatherNameBangla || data.student?.fatherName || "",
    motherNameBangla: data.motherNameBangla || data.student?.motherName || "",
    studentName: data.name || data.student?.name || "",
    mobileNo: data.mobileNo || data.student?.mobile || "",
    session: data.session || new Date().getFullYear().toString(),
    category: data.studentType || data.student?.studentType?.toLowerCase() || "residential",
    dateOfBirth: formatDate(data.birthDate || data.student?.birthDate),
    nidBirth: data.nidBirth || data.student?.birthRegistrationNo || "",
    bloodGroup: data.bloodGroup || data.student?.bloodGroup || "",
    nationality: data.nationality || "Bangladeshi",
    className: formatClassForForm(data.className),
    studentDepartment: data.studentDepartment || "hifz",
    rollNumber: data.roll || data.student?.studentClassRoll || "",
    section: data.section || data.student?.section?.[0] || "",
    group: data.group || data.student?.batch || "",
    optionalSubject: data.optionalSubject || "",
    shift: data.shift || "",
    admissionType: data.admissionType || "",
    fatherName: data.fatherName || data.student?.fatherName || "",
    fatherMobile: data.fatherMobile || "",
    fatherNid: data.fatherNid || "",
    fatherProfession: data.fatherProfession || "",
    fatherIncome: data.fatherIncome || data.student?.fatherIncome || 0,
    motherName: data.motherName || data.student?.motherName || "",
    motherMobile: data.motherMobile || "",
    motherNid: data.motherNid || "",
    motherProfession: data.motherProfession || "",
    motherIncome: data.motherIncome || data.student?.motherIncome || 0,
    village: data.presentAddress?.village || "",
    postOffice: data.presentAddress?.postOffice || "",
    postCode: data.presentAddress?.postCode || "",
    policeStation: data.presentAddress?.policeStation || "",
    district: data.presentAddress?.district || "",
    permVillage: data.permanentAddress?.village || "",
    permPostOffice: data.permanentAddress?.postOffice || "",
    permPostCode: data.permanentAddress?.postCode || "",
    permPoliceStation: data.permanentAddress?.policeStation || "",
    permDistrict: data.permanentAddress?.district || "",
    guardianName: data.guardianInfo?.name || data.student?.guardianInfo?.name || "",
    guardianRelation: data.guardianInfo?.relation || data.student?.guardianInfo?.relation || "",
    guardianMobile: data.guardianInfo?.mobile || data.student?.guardianInfo?.mobile || "",
    guardianVillage: data.guardianInfo?.address || data.student?.guardianInfo?.address || "",
    formerInstitution: data.previousSchool?.institution || "",
    formerVillage: data.previousSchool?.address || "",
    birthCertificate: data.documents?.birthCertificate || false,
    transferCertificate: data.documents?.transferCertificate || false,
    characterCertificate: data.documents?.characterCertificate || false,
    markSheet: data.documents?.markSheet || false,
    photographs: data.documents?.photographs || false,
    termsAccepted: data.termsAccepted || false,
    fees: formatFeeForForm(data.fees, data.className),
    admissionFee: data.admissionFee || data.student?.admissionFee || 0,
    monthlyFee: data.monthlyFee || data.student?.monthlyFee || 0,
    discountAmount: data.discountAmount || 0,
    paymentMethod: paymentMethodObj,
    studentIdSelect: null,
    studentNameSelect: null,
    totalAmount: data.totalAmount || 0,
    totalDiscount: data.totalDiscount || 0,
    netPayable: data.netPayable || 0,
    paidAmount: data.paidAmount || 0,
    dueAmount: data.dueAmount || 0,
    advanceBalance: data.advanceBalance || 0,
  };
  return transformedData;
};

// --- MAIN COMPONENT ---
const EnrollmentForm = () => {
  const theme = useTheme();
  const limit = 200;
  const [page] = useState(0);
  const [searchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [open, setOpen] = useState(false);

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const [openAddFeeModal, setOpenAddFeeModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [enrolledStudentData, setEnrolledStudentData] = useState<any>(null);

  const { classOptions, feeCategoryData } = useAcademicOption();
  const [createEnrollment] = useCreateEnrollmentMutation();
  const [updateEnrollment] = useUpdateEnrollmentMutation();
  const { data: singleEnrollment, isLoading: enrollmentLoading } = useGetSingleEnrollmentQuery(id ? { id } : undefined, { skip: !id });
  const { data: studentData } = useGetAllStudentsQuery({ limit, page: page + 1, searchTerm });
  const [submitting, setSubmitting] = useState(false);
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const [formKey, setFormKey] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Student Info", icon: <AccountCircle /> },
    { label: "Academic Info", icon: <SchoolIcon /> },
    { label: "Parent/Guardian", icon: <FamilyRestroom /> },
    { label: "Address & Docs", icon: <Home /> },
    { label: "Fee Info", icon: <Payment /> },
  ];

  useEffect(() => {
    if (id && singleEnrollment && classOptions.length > 0 && feeCategoryData) {
      const transformedData = transformEnrollmentDataToForm(singleEnrollment, classOptions, feeCategoryData);
      if (transformedData) {
        if (!transformedData.paymentMethod) transformedData.paymentMethod = { label: "Cash", value: "cash" };
        setDefaultValues(transformedData);
        setFormKey((prev) => prev + 1);
      }
    } else if (!id) {
      setDefaultValues({
        studentId: "", studentNameBangla: "", studentPhoto: "", fatherNameBangla: "", motherNameBangla: "",
        studentName: "", mobileNo: "", session: new Date().getFullYear().toString(), category: "residential",
        dateOfBirth: null, nidBirth: "", bloodGroup: "", nationality: "Bangladeshi",
        fatherName: "", fatherMobile: "", fatherNid: "", fatherProfession: "", fatherIncome: 0,
        motherName: "", motherMobile: "", motherNid: "", motherProfession: "", motherIncome: 0,
        className: [], studentDepartment: "hifz", rollNumber: "", section: "", group: "",
        optionalSubject: "", shift: "", admissionType: "", village: "", postOffice: "",
        postCode: "", policeStation: "", district: "", permVillage: "", permPostOffice: "",
        permPostCode: "", permPoliceStation: "", permDistrict: "", guardianName: "", guardianRelation: "",
        guardianMobile: "", guardianVillage: "", formerInstitution: "", formerVillage: "",
        birthCertificate: false, transferCertificate: false, characterCertificate: false,
        markSheet: false, photographs: false, termsAccepted: false,
        fees: [{ category: [], className: [], feeItems: [], feeAmount: "", selectionMode: "admission" }],
        admissionFee: 0, monthlyFee: 0, discountAmount: 0, paymentMethod: { label: "Cash", value: "cash" },
        studentIdSelect: null, studentNameSelect: null, totalAmount: 0, totalDiscount: 0,
        netPayable: 0, paidAmount: 0, dueAmount: 0, advanceBalance: 0,
      });
      setFormKey((prev) => prev + 1);
    }
  }, [id, singleEnrollment, classOptions, feeCategoryData]);

  const handleFinishProcess = () => {
    setOpenSuccessModal(false);
    setOpenPrintModal(false);
    setOpenAddFeeModal(false);
    setOpenPaymentModal(false);
    router.push(`/dashboard/enrollments/list`);
  };

  const handlePrintReceipt = () => {
    setOpenSuccessModal(false);
    setOpenPrintModal(true);
  };

  const handleAddAdditionalFee = () => {
    setOpenSuccessModal(false);
    setOpenAddFeeModal(true);
  };

  const handlePayDueAmount = () => {
    setOpenSuccessModal(false);
    setOpenPaymentModal(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      const { studentIdSelect, studentNameSelect, ...submitData } = data;

      if (!submitData.studentName) { toast.error("Student name is required"); setSubmitting(false); return; }
      if (!submitData.mobileNo) { toast.error("Mobile number is required"); setSubmitting(false); return; }
      if (!submitData.className || submitData.className.length === 0) { toast.error("Class selection is required"); setSubmitting(false); return; }

      const classNameArray = submitData.className && submitData.className.length > 0 ? submitData.className.map((cls: any) => cls.value || cls).filter(Boolean) : [];
      if (!classNameArray.length) { toast.error("Class selection is required"); setSubmitting(false); return; }

      const paymentMethodValue = typeof submitData.paymentMethod === 'object' ? submitData.paymentMethod.value : submitData.paymentMethod || 'cash';

      const calculateTotalFees = (fees: any[]) => {
        let total = 0;
        fees.forEach((fee: any) => {
          if (fee.feeItems && Array.isArray(fee.feeItems)) fee.feeItems.forEach((item: any) => {
            let amt = parseFloat(item.amount) || 0;
            if (item.isMonthly) amt = amt * 12;
            total += amt;
          });
        });
        return total;
      };

      const calculateTotalDiscounts = (fees: any[]) => {
        let total = 0;
        fees.forEach((fee: any) => {
          if (fee.feeItems && Array.isArray(fee.feeItems)) {
            fee.feeItems.forEach((item: any) => {
              let d = parseFloat(item.discount) || 0;
              if (item.isMonthly && item.discountRangeStart && item.discountRangeEnd) {
                const sIndex = MONTHS.indexOf(item.discountRangeStart);
                const eIndex = MONTHS.indexOf(item.discountRangeEnd);
                if (sIndex !== -1 && eIndex !== -1 && sIndex <= eIndex) {
                  d = (parseFloat(item.discountRangeAmount) || 0) * (eIndex - sIndex + 1);
                }
              }
              total += d;
            });
          }
        });
        return total;
      };

      const totalFees = calculateTotalFees(submitData.fees || []);
      const totalDiscounts = calculateTotalDiscounts(submitData.fees || []);

      const totalPayNowInput = parseFloat(submitData.paidAmount) || 0;
      let allFeeItems: any[] = [];
      submitData.fees.forEach((fee: any) => {
        const { selectionMode, ...restFee } = fee;
        if (restFee.feeItems && Array.isArray(restFee.feeItems)) allFeeItems = [...allFeeItems, ...restFee.feeItems];
      });

      // We will pass the raw data to backend. Backend handles the expansion and exact discount logic.
      // Just need to structure `fees` array correctly.

      const transformedFees = Array.isArray(submitData.fees)
        ? submitData.fees.filter((fee: any) => fee.category && fee.category.length > 0 && fee.className && fee.className.length > 0 && fee.feeItems && fee.feeItems.length > 0).flatMap((fee: any) => {
          const className = fee.className[0]?.label || fee.className[0] || "";
          const categoryName = fee.category[0]?.label || fee.category[0] || "";
          return fee.feeItems.filter((item: any) => item.isSelected !== false).map((item: any) => {
            const fType = typeof item.feeType === 'string' ? item.feeType : item.feeType?.value;
            return {
              feeType: fType || "",
              amount: item.amount || 0,
              className: className,
              category: categoryName,
              advanceAmount: parseFloat(item.advanceAmount) || 0,
              discount: parseFloat(item.discount) || 0, // General flat discount for this item
              isMonthly: item.isMonthly || false,
              // Range Properties
              discountRangeStart: item.discountRangeStart || "",
              discountRangeEnd: item.discountRangeEnd || "",
              discountRangeAmount: parseFloat(item.discountRangeAmount) || 0,
              paymentMethod: paymentMethodValue
            };
          });
        }) : [];

      if (transformedFees.length === 0) { toast.error("At least one valid fee item is required"); setSubmitting(false); return; }

      const studentAdvanceBalance = submitData.advanceBalance || 0;
      const netPayable = totalFees - totalDiscounts;
      const paidAmount = parseFloat(submitData.paidAmount) || 0;
      const dueAmount = Math.max(0, netPayable - paidAmount);

      let paymentStatus = 'pending';
      if (dueAmount <= 0) paymentStatus = 'paid'; else if (paidAmount > 0) paymentStatus = 'partial';

      const finalSubmitData: any = {
        studentName: submitData.studentName || "", nameBangla: submitData.studentNameBangla || "", studentPhoto: submitData.studentPhoto || "",
        mobileNo: submitData.mobileNo || "", rollNumber: submitData.rollNumber || "",
        birthDate: submitData.dateOfBirth ? new Date(submitData.dateOfBirth).toISOString() : "",
        birthRegistrationNo: submitData.nidBirth || "", bloodGroup: submitData.bloodGroup || "",
        nationality: submitData.nationality || "Bangladeshi", className: classNameArray, section: submitData.section || "",
        roll: submitData.roll || submitData.rollNumber || "", session: submitData.session || new Date().getFullYear().toString(),
        batch: submitData.group || "", studentType: submitData.category || "Residential",
        studentDepartment: submitData.studentDepartment || "hifz",
        fatherName: submitData.fatherName || "", fatherNameBangla: submitData.fatherNameBangla || "",
        fatherMobile: submitData.fatherMobile || "", fatherNid: submitData.fatherNid || "",
        fatherProfession: submitData.fatherProfession || "", fatherIncome: Number(submitData.fatherIncome) || 0,
        motherName: submitData.motherName || "", motherNameBangla: submitData.motherNameBangla || "",
        motherMobile: submitData.motherMobile || "", motherNid: submitData.motherNid || "",
        motherProfession: submitData.motherProfession || "", motherIncome: Number(submitData.motherIncome) || 0,
        presentAddress: {
          village: submitData.village || "", postOffice: submitData.postOffice || "",
          postCode: submitData.postCode || "", policeStation: submitData.policeStation || "", district: submitData.district || ""
        },
        permanentAddress: {
          village: submitData.permVillage || "", postOffice: submitData.permPostOffice || "",
          postCode: submitData.permPostCode || "", policeStation: submitData.permPoliceStation || "", district: submitData.permDistrict || ""
        },
        guardianInfo: {
          name: submitData.guardianName || "", relation: submitData.guardianRelation || "",
          mobile: submitData.guardianMobile || "", address: submitData.guardianVillage || ""
        },
        previousSchool: { institution: submitData.formerInstitution || "", address: submitData.formerVillage || "" },
        documents: {
          birthCertificate: Boolean(submitData.birthCertificate), transferCertificate: Boolean(submitData.transferCertificate),
          characterCertificate: Boolean(submitData.characterCertificate), markSheet: Boolean(submitData.markSheet),
          photographs: Boolean(submitData.photographs),
        },
        fees: transformedFees, termsAccepted: Boolean(submitData.termsAccepted),
        admissionFee: Number(submitData.admissionFee) || 0, monthlyFee: Number(submitData.monthlyFee) || 0,
        discountAmount: Number(submitData.discountAmount) || 0,
        advanceBalance: studentAdvanceBalance, paymentStatus: paymentStatus, totalAmount: totalFees,
        totalDiscount: totalDiscounts, netPayable: netPayable, paidAmount: paidAmount,
        dueAmount: dueAmount, paymentMethod: paymentMethodValue,
      };

      let res;
      if (id) res = await updateEnrollment({ id, data: finalSubmitData }).unwrap();
      else res = await createEnrollment(finalSubmitData).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Student enrolled successfully");
        setEnrolledStudentData(res.data);
        setOpenSuccessModal(true);
      } else {
        throw new Error(res?.message || "Failed to enroll student");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      let errorMessage = "Failed to enroll student!";
      if (err?.data?.message) errorMessage = err.data.message; else if (err?.message) errorMessage = err.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const contentWrapper = document.getElementById("form-content-wrapper");
    if (contentWrapper) contentWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const contentWrapper = document.getElementById("form-content-wrapper");
    if (contentWrapper) contentWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if ((id && enrollmentLoading) || !defaultValues) return <LoadingState />;

  const getClassLabel = (clsData: any) => {
    if (!clsData) return "";
    if (Array.isArray(clsData) && clsData.length > 0) {
      return clsData[0]?.label || clsData[0]?.className || clsData[0];
    }
    if (typeof clsData === 'object') return clsData.label || clsData.className;
    return clsData;
  };

  const feeDataForPaymentModal = enrolledStudentData ? {
    _id: enrolledStudentData._id,
    feeType: "Enrollment Due",
    month: enrolledStudentData.session,
    class: getClassLabel(enrolledStudentData.className),
    amount: enrolledStudentData.totalAmount,
    discount: enrolledStudentData.totalDiscount,
    waiver: 0,
    paidAmount: enrolledStudentData.paidAmount,
    dueAmount: enrolledStudentData.dueAmount,
    studentName: enrolledStudentData.studentName
  } : {};

  const studentDataForAddFeeModal = enrolledStudentData?.student ? {
    ...enrolledStudentData.student,
    className: enrolledStudentData.className,
    name: enrolledStudentData.studentName
  } : enrolledStudentData;

  return (
    <Box sx={{ bgcolor: alpha(theme.palette.background.default, 0.5), minHeight: "100vh" }}>
      <CraftForm key={formKey} onSubmit={handleSubmit} defaultValues={defaultValues}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper elevation={0} sx={{ p: 4, mb: 3, borderRadius: 3, background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                <School sx={{ color: "#fff", fontSize: 32 }} />
              </Avatar>
              <Box ml={2}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>Craft International Institute</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ p: 0, borderRadius: 3, background: "#fff", boxShadow: "0 4px 30px rgba(0,0,0,0.03)", overflow: "visible", minHeight: 600 }}>
            <Box sx={{ px: 4, py: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>{activeStep + 1} OF {steps.length}</Typography>
            </Box>
            <CardContent sx={{ p: 4 }} id="form-content-wrapper">
              <Box minHeight={400}>
                {activeStep === 0 && <StudentInformationStep />}
                {activeStep === 1 && <AcademicStep classOptions={classOptions} />}
                {activeStep === 2 && <ParentGuardianStep />}
                {activeStep === 3 && <AddressDocumentsStep />}
                {activeStep === 4 && <FeeStep classOptions={classOptions} feeCategoryData={feeCategoryData} studentData={studentData} />}
              </Box>
            </CardContent>
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3, px: 1 }}>
            <Button disabled={activeStep === 0} onClick={handleBack} startIcon={<ArrowBack sx={{ fontSize: 18 }} />} variant="text" type="button" sx={{ fontWeight: "bold", color: "text.secondary", "&:hover": { color: "text.primary", bgcolor: alpha(theme.palette.action.hover, 0.04) }, px: 2, py: 1.5 }}>Back</Button>
            {activeStep === steps.length - 1 ? (
              <Button type="submit" variant="contained" size="large" disabled={submitting} endIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <Save />} sx={{ borderRadius: 2, px: 5, py: 1.5, fontWeight: "bold", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", textTransform: "none", background: theme.palette.primary.main, "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.15)", bgcolor: theme.palette.primary.dark } }}>
                {submitting ? "Submitting..." : id ? "Update Enrollment" : "Submit Application"}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext} endIcon={<ArrowForward sx={{ fontSize: 18 }} />} type="button" sx={{ borderRadius: 2, px: 5, py: 1.5, fontWeight: "bold", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", background: theme.palette.primary.main, "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.15)", bgcolor: theme.palette.primary.dark }, textTransform: "none" }}>
                Continue
              </Button>
            )}
          </Box>
        </Container>

        <Dialog open={openSuccessModal} onClose={() => { }} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, p: 2, textAlign: 'center' } }}>
          <DialogContent sx={{ py: 4 }}>
            <Avatar sx={{ bgcolor: "success.main", width: 64, height: 64, margin: "0 auto 16px" }}>
              <Check sx={{ fontSize: 40, color: "#fff" }} />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Enrollment Successful!</Typography>
            <Typography variant="body2" color="text.secondary">Student has been enrolled successfully for the session {new Date().getFullYear()}.</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Name: <strong>{enrolledStudentData?.studentName}</strong></Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 3, flexDirection: "column" }}>
            <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
              {enrolledStudentData?.dueAmount > 0 && (
                <Button variant="contained" color="warning" onClick={handlePayDueAmount} startIcon={<Payment />} sx={{ borderRadius: 2, px: 3 }}>
                  Pay Due Amount (৳{enrolledStudentData.dueAmount.toLocaleString()})
                </Button>
              )}
              <Button variant="outlined" onClick={handlePrintReceipt} startIcon={<Print />} sx={{ borderRadius: 2, px: 3 }}>Print Receipt</Button>
              <Button variant="contained" onClick={handleAddAdditionalFee} startIcon={<Payment />} sx={{ borderRadius: 2, px: 3, bgcolor: "primary.main" }}>Add Additional Fee</Button>
            </Box>
            <Button variant="text" onClick={handleFinishProcess} >Close & Go to List</Button>
          </DialogActions>
        </Dialog>

        <PrintModal
          open={openPrintModal}
          setOpen={setOpenPrintModal}
          receipt={enrolledStudentData?.data?.receipt}
          previousPayments={enrolledStudentData?.receipt?.fees || []}
          student={enrolledStudentData?.student || enrolledStudentData}
        />

        <AddFeeModal
          open={openAddFeeModal}
          setOpen={setOpenAddFeeModal}
          student={studentDataForAddFeeModal?.data}
        />

        <PaymentModal
          open={openPaymentModal}
          onClose={() => setOpenPaymentModal(false)}
          fee={feeDataForPaymentModal}
          onPaymentSuccess={(data) => {
            toast.success("Payment successful!");
            setOpenPaymentModal(false);
            router.push(`/dashboard/enrollments/list`);
          }}
        />

      </CraftForm>
    </Box>
  );
};

export default EnrollmentForm;