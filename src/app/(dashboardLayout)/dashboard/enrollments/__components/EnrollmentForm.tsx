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
  FamilyRestroom,
  Flag,
  Group,
  Home,
  LocalOffer,
  Money,
  Payment,
  Person,
  Phone,
  Save,
  School,
  School as SchoolIcon,
  Work,
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
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
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

// Smooth Organic Animation for Steps
const fadeInSlideUp = {
  animation: "fadeInSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
  "@keyframes fadeInSlideUp": {
    "0%": { opacity: 0, transform: "translateY(15px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
};

const FeeAmountHandler = ({
  feeIndex,
  feeCategoryData,
}: {
  feeIndex: number;
  feeCategoryData: any;
}) => {
  const { watch, setValue } = useFormContext();
  const selectedClass = watch(`fees.${feeIndex}.className`);
<<<<<<< HEAD
  const feeAmount = watch(`fees.${feeIndex}.feeAmount`);
  const paidAmount = watch(`fees.${feeIndex}.paidAmount`);
  const discountType = watch(`fees.${feeIndex}.discountType`) || "flat";
  const discountValue = watch(`fees.${feeIndex}.discountValue`) || "0";
  const waiverType = watch(`fees.${feeIndex}.waiverType`) || "flat";
  const waiverValue = watch(`fees.${feeIndex}.waiverValue`) || "0";
  console.log("fee category", feeCategoryData);
  const calculateDiscountAmount = () => {
    const fee = parseFloat(feeAmount) || 0;
    const value = parseFloat(discountValue) || 0;

    if (discountType === "percentage") {
      return Math.min((fee * value) / 100, fee);
    } else {
      return Math.min(value, fee);
    }
  };

  const calculateWaiverAmount = () => {
    const fee = parseFloat(feeAmount) || 0;
    const value = parseFloat(waiverValue) || 0;

    if (waiverType === "percentage") {
      return Math.min((fee * value) / 100, fee);
    } else {
      return Math.min(value, fee);
    }
  };
=======
  const selectedCategory = watch(`fees.${feeIndex}.category`);
>>>>>>> 914cc4a891106614f124b29664ceacdb5dabb8b5

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
            isSelected: true
          });
        }
      });

      if (feeItems.length > 0) {
        const formattedItems = feeItems.map((item: any) => ({
          feeType: typeof item.feeType === 'string'
            ? { label: item.feeType, value: item.feeType }
            : item.feeType,
          amount: item.amount,
          advanceAmount: item.advanceAmount || "",
          isSelected: true
        }));

        setValue(`fees.${feeIndex}.feeItems`, formattedItems);

        const totalAmount = formattedItems.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
        setValue(`fees.${feeIndex}.feeAmount`, totalAmount.toString());
      } else {
        setValue(`fees.${feeIndex}.feeItems`, []);
        setValue(`fees.${feeIndex}.feeAmount`, "");
      }
    }
  }, [selectedClass, selectedCategory, setValue, feeIndex, feeCategoryData]);

  return null;
};

const DynamicFeeFields = ({
  classOptions,
  feeCategoryData,
  studentData,
}: any) => {
  const theme = useTheme();
  console.log("fee category data this ", feeCategoryOptions);
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
    return feeItems.reduce((total, item) => {
      return total + (item.amount || 0);
    }, 0);
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

      let allFeeItems: any[] = [];

      matchingEntries.forEach((entry: any) => {
        if (entry.feeItems && Array.isArray(entry.feeItems)) {
          allFeeItems.push(...entry.feeItems);
        } else if (entry.feeType) {
          allFeeItems.push(entry);
        }
      });

      if (allFeeItems.length > 0) {
        const feeItems = allFeeItems.map((item: any) => ({
          feeType: typeof item.feeType === 'string'
            ? { label: item.feeType, value: item.feeType }
            : item.feeType,
          amount: item.amount,
          advanceAmount: "",
          isSelected: true
        }));

        setValue(`fees.${index}.feeItems`, feeItems);

        const totalAmount = calculateTotalAmount(feeItems);
        setValue(`fees.${index}.feeAmount`, totalAmount.toString());

        toast.success(`${allFeeItems.length} fee items created for this category`);
      } else {
        setValue(`fees.${index}.feeItems`, []);
        setValue(`fees.${index}.feeAmount`, "");
      }
    } else {
      setValue(`fees.${index}.feeItems`, []);
      setValue(`fees.${index}.feeAmount`, "");
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

      if (field === 'feeType' && feeCategoryData?.data?.data) {
        const currentClass = watch(`fees.${feeIndex}.className`);
        const classNameStr = Array.isArray(currentClass) ? currentClass[0]?.label || currentClass[0] : currentClass;

        const normalizedTargetClass = String(classNameStr || "").trim().toLowerCase();
        const feeTypeStr = typeof value === 'string' ? value : value?.value;

        if (classNameStr && feeTypeStr) {
          let foundAmount = 0;

          feeCategoryData.data.data.forEach((entry: any) => {
            const normalizedEntryClass = String(entry.className || "").trim().toLowerCase();

            if (normalizedEntryClass === normalizedTargetClass) {
              if (entry.feeItems && Array.isArray(entry.feeItems)) {
                const nestedMatch = entry.feeItems.find((sub: any) =>
                  String(sub.feeType).trim().toLowerCase() === String(feeTypeStr).trim().toLowerCase()
                );
                if (nestedMatch && nestedMatch.amount) {
                  foundAmount = nestedMatch.amount;
                }
              }
              else if (entry.feeType) {
                if (String(entry.feeType).trim().toLowerCase() === String(feeTypeStr).trim().toLowerCase()) {
                  foundAmount = entry.amount;
                }
              }
            }
          });

          if (foundAmount > 0) {
            updatedItems[itemIndex].amount = foundAmount;
          }
        }
      }

      setValue(`fees.${feeIndex}.feeItems`, updatedItems);

      if (field === 'amount' || field === 'feeType') {
        const newTotal = calculateTotalAmount(updatedItems);
        setValue(`fees.${feeIndex}.feeAmount`, newTotal.toString());
      }
    }
  };

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
            <Typography
              variant="h6"
              fontWeight="600"
              sx={{ color: theme.palette.text.primary }}
            >
              Fee Details
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Category সিলেক্ট করলে সব Fee Items অটো ক্রিয়েট হবে
            </Typography>
          </Box>
          <Button
            onClick={addFeeField}
            size="medium"
            disabled={!mainClassName || mainClassName.length === 0}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              bgcolor:
                !mainClassName || mainClassName.length === 0
                  ? theme.palette.action.disabled
                  : theme.palette.primary.main,
              color: "#fff",
              "&:hover": {
                bgcolor:
                  !mainClassName || mainClassName.length === 0
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
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "text.disabled",
                        width: 24,
                        height: 24,
                        "&:hover": {
                          color: "error.main",
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                        },
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: theme.palette.primary.main,
                      mr: 1.5,
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="text.secondary"
                    sx={{
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      letterSpacing: 1,
                    }}
                  >
                    Fee Category #{index + 1}
                  </Typography>
                </Box>

                <FeeAmountHandler
                  feeIndex={index}
                  feeCategoryData={feeCategoryData}
                />

                <Grid container spacing={2.5} sx={{ mb: 3 }}>
                  <Grid item xs={12} md={4}>
                    <CraftIntAutoCompleteWithIcon
                      name={`fees.${index}.className`}
                      label="Class"
                      margin="none"
                      size="small"
                      placeholder="Select Class"
                      options={classOptions}
                      fullWidth
                      multiple
                      icon={<School color="primary" />}
                      disabled={true}
                      helperText="Auto-filled from Academic Information"
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <CraftIntAutoCompleteWithIcon
                      name={`fees.${index}.category`}
                      label={
                        <span>
                          Category <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      margin="none"
                      size="small"
                      placeholder={
                        isClassSelected
                          ? "Select Category"
                          : "Select class first"
                      }
                      options={categoryOptions}
                      fullWidth
                      multiple
                      icon={<CalendarMonth color="primary" />}
                      disabled={!isClassSelected}
                      onChange={(event: any, value: any) => {
                        handleCategoryChange(index, value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} />
                </Grid>

                {feeCategory && feeCategory.length > 0 ? (
                  feeItems.length > 0 ? (
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ color: "primary.main" }}
                        >
                          📋 Fee Items ({feeItems.length} items)
                        </Typography>
                        <Button size="small" variant="outlined" onClick={() => {
                          const newItems = [...feeItems, {
                            feeType: "",
                            amount: 0,
                            advanceAmount: "",
                            isSelected: true
                          }];
                          setValue(`fees.${index}.feeItems`, newItems);
                        }}>
                          <Add fontSize="small" /> Add Custom Item
                        </Button>
                      </Box>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.background.paper, 0.7),
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          borderRadius: 1,
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Grid container spacing={2} sx={{ mb: 1, pb: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}` }}>
                              <Grid item xs={4.5}>
                                <Typography variant="caption" fontWeight="bold" color="text.secondary">
                                  FEE TYPE
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography variant="caption" fontWeight="bold" color="text.secondary">
                                  AMOUNT
                                </Typography>
                              </Grid>
                              <Grid item xs={3.5}>
                                <Typography variant="caption" fontWeight="bold" color="text.secondary">
                                  ADVANCE AMOUNT
                                </Typography>
                              </Grid>
                              <Grid item xs={1}></Grid>
                            </Grid>
                          </Grid>

                          {feeItems.map((item: any, itemIndex: number) => {
                            return (
                              <Grid item xs={12} key={itemIndex}>
                                <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }}>
                                  <Grid item xs={4.5}>
                                    <CraftIntAutoCompleteWithIcon
                                      name={`fees.${index}.feeItems.${itemIndex}.feeType`}
                                      label=""
                                      options={classSpecificFeeOptions}
                                      size="small"
                                      fullWidth
                                      placeholder="Select Fee Type"
                                      multiple={false}
                                      freeSolo={true}
                                      icon={<Description color="disabled" sx={{ fontSize: 16 }} />}
                                      disableClearable={false}
                                      disabled={!isClassSelected}
                                      isOptionEqualToValue={(option: any, value: any) => {
                                        if (!option || !value) return false;
                                        const optVal = typeof option === 'string' ? option : option.value;
                                        const valVal = typeof value === 'string' ? value : value.value;
                                        return optVal === valVal;
                                      }}
                                      onChange={(e: any, val: any) => {
                                        handleItemFieldChange(index, itemIndex, 'feeType', val);
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={3}>
                                    <CraftInputWithIcon
                                      name={`fees.${index}.feeItems.${itemIndex}.amount`}
                                      label=""
                                      fullWidth
                                      margin="none"
                                      size="small"
                                      type="number"
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <Typography variant="body2" color="text.secondary">
                                              ৳
                                            </Typography>
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={3.5}>
                                    <CraftInputWithIcon
                                      name={`fees.${index}.feeItems.${itemIndex}.advanceAmount`}
                                      label=""
                                      fullWidth
                                      margin="none"
                                      size="small"
                                      type="number"
                                      disabled={!isClassSelected || !item.amount}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <Typography variant="body2" color="text.secondary">
                                              ৳
                                            </Typography>
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tooltip title="Remove this item">
                                      <IconButton
                                        size="small"
                                        onClick={() => removeFeeItem(index, itemIndex)}
                                        sx={{ color: 'error.main' }}
                                      >
                                        <Delete fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </Grid>
                                </Grid>
                              </Grid>
                            );
                          })}

                          <Grid item xs={12}>
                            <Box
                              sx={{
                                mt: 2,
                                pt: 2,
                                borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                              }}
                            >
                              <Grid container spacing={2}>
                                <Grid item xs={4.5}>
                                  <Typography variant="body1" fontWeight="bold" color="primary.main">
                                    TOTAL
                                  </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <CraftInputWithIcon
                                    name={`fees.${index}.feeAmount`}
                                    label=""
                                    fullWidth
                                    margin="none"
                                    size="small"
                                    type="number"
                                    disabled={true}
                                    value={feeAmount}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Typography variant="body2" color="text.secondary">
                                            ৳
                                          </Typography>
                                        </InputAdornment>
                                      ),
                                      readOnly: true,
                                    }}
                                    sx={{
                                      '& .MuiInputBase-input': {
                                        backgroundColor: alpha(theme.palette.primary.light, 0.1),
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem',
                                        color: theme.palette.primary.main,
                                      }
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={3.5}>
                                  <Box
                                    sx={{
                                      p: 1.5,
                                      bgcolor: alpha(theme.palette.info.light, 0.1),
                                      borderRadius: 1,
                                      border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                                    }}
                                  >
                                    <Typography variant="body2" color="info.main" align="center">
                                      Total Advance: ৳{feeItems.reduce((sum: number, item: any) =>
                                        sum + (parseFloat(item.advanceAmount) || 0), 0).toLocaleString()}
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
                      <Typography variant="body2">
                        No fee items found for this category
                      </Typography>
                    </Box>
                  )
                ) : null}

                {feeCategory && feeCategory.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="info.main">
                      {feeItems.length > 0
                        ? `এই ক্যাটাগরিতে ${feeItems.length}টি Fee Items ক্রিয়েট হয়েছে`
                        : 'এই ক্যাটাগরিতে কোনো Fee Items পাওয়া যায়নি'}
                    </Typography>
                  </Box>
                )}
              </Box>
            );
          })}

          {fields.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4, color: "text.disabled" }}>
              <Payment sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
              <Typography variant="body2">
                {!mainClassName || mainClassName.length === 0
                  ? "Select a class in Academic Information step to add fees"
                  : "No fee categories added yet"}
              </Typography>
              <Button
                onClick={addFeeField}
                variant="outlined"
                sx={{ mt: 2 }}
                startIcon={<Add />}
                disabled={!mainClassName || mainClassName.length === 0}
              >
                Add First Category
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
};

const transformEnrollmentDataToForm = (
  enrollmentData: any,
  classOptions: any[],
  feeCategoryData: any
) => {
  if (!enrollmentData?.data) {
    return null;
  }

  const data = enrollmentData.data;

  const formatClassForForm = (classData: any) => {
    if (!classData || classData.length === 0) return [];

    if (Array.isArray(classData)) {
      return classData.map((cls: any) => {
        const classId = cls._id || cls;
        const classNameValue = cls.className || cls;

        let matchedClass = classOptions?.find(
          (option: any) => option.value === classId
        );
        if (!matchedClass) {
          matchedClass = classOptions?.find(
            (option: any) => option.label === classNameValue
          );
        }
        if (!matchedClass) {
          matchedClass = {
            label: classNameValue,
            name: classNameValue,
            value: classId,
          };
        }

        return matchedClass;
      });
    } else {
      const classId = classData._id || classData;
      const classNameValue = classData.className || classData;

      let matchedClass = classOptions?.find(
        (option: any) => option.value === classId
      );

      if (!matchedClass) {
        matchedClass = classOptions?.find(
          (option: any) => option.label === classNameValue
        );
      }

      if (!matchedClass) {
        matchedClass = {
          label: classNameValue,
          name: classNameValue,
          value: classId,
        };
      }

      return [matchedClass];
    }
  };

  const formatFeeForForm = (fees: any[], classData: any) => {
    if (!fees || !Array.isArray(fees) || fees.length === 0) {
      return [
        {
          category: [],
          className: formatClassForForm(classData),
          feeItems: [],
          feeAmount: "",
        },
      ];
    }

    const getFeeTypeOptions = () => {
      if (!feeCategoryData?.data?.data) return [];
      const types = new Set<string>();
      feeCategoryData.data.data.forEach((item: any) => {
        if (item.feeType) types.add(item.feeType);
        if (item.feeItems) {
          item.feeItems.forEach((sub: any) => types.add(sub.feeType));
        }
      });
      return Array.from(types).map(t => ({ label: t, value: t }));
    };

    const typeOptions = getFeeTypeOptions();

    const feesByCategory = new Map();

    fees.forEach((fee: any) => {
      let category = "";
      if (feeCategoryData?.data?.data) {
        const matchingCategory = feeCategoryData.data.data.find(
          (cat: any) =>
            cat.className === fee.className &&
            cat.categoryName === fee.category
        );
        if (matchingCategory) {
          category = matchingCategory.categoryName;
        } else {
          category = fee.category;
        }
      }

      if (!feesByCategory.has(category)) {
        feesByCategory.set(category, []);
      }
      feesByCategory.get(category).push(fee);
    });

    const formFees = [];
    for (const [category, categoryFees] of feesByCategory) {
      const feeAmount = categoryFees.reduce((sum: number, fee: any) =>
        sum + (fee.amount || 0), 0
      );

      const feeItems = categoryFees.map((fee: any) => {
        const typeStr = fee.feeType || "";
        const typeObj = typeOptions.find((opt: any) => opt.value === typeStr) || { label: typeStr, value: typeStr };

        return {
          feeType: typeObj,
          amount: fee.amount || 0,
          advanceAmount: fee.advanceAmount || "",
          isSelected: true
        };
      });

      formFees.push({
        category: category ? [{
          label: category,
          name: category,
          value: category
        }] : [],
        className: formatClassForForm(classData),
        feeItems: feeItems,
        feeAmount: feeAmount.toString(),
      });
    }

    return formFees;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch {
      return null;
    }
  };

  const isFlat = data.discountType === 'flat' || data.discountType === 'Flat';
  const discountTypeObj = isFlat
    ? { label: "Flat Amount", value: "flat" }
    : { label: "Percentage", value: "percentage" };

  // Default payment method to cash if not present
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
    category:
      data.studentType ||
      data.student?.studentType?.toLowerCase() ||
      "residential",
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
    guardianName:
      data.guardianInfo?.name || data.student?.guardianInfo?.name || "",
    guardianRelation:
      data.guardianInfo?.relation || data.student?.guardianInfo?.relation || "",
    guardianMobile:
      data.guardianInfo?.mobile || data.student?.guardianInfo?.mobile || "",
    guardianVillage:
      data.guardianInfo?.address || data.student?.guardianInfo?.address || "",
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
    discountType: discountTypeObj,
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

const StudentInformationStep = () => {
  return (
    <Box sx={{ ...fadeInSlideUp }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, color: "text.primary" }}
          >
            Personal Details
          </Typography>
<<<<<<< HEAD
        </Box>
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FileUploadWithIcon name="studentPhoto" label="Student Photo" />
          </Grid>
          <Grid item xs={12} md={6} sx={{ opacity: 0 }}>
            <CraftInputWithIcon
              fullWidth
              label="Student ID"
              name="studentId"
              placeholder="Enter Student ID"
              InputProps={{
                startAdornment: (
                  <Description sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label={
                <span>
                  Student Name <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="studentNameBangla"
              placeholder="Student Name (বাংলায়)"
              InputProps={{
                startAdornment: (
                  <Person sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label={
                <span>
                  Student Name<span style={{ color: "red" }}>*</span>
                </span>
              }
              name="studentName"
              placeholder="Full Name in English"
              InputProps={{
                startAdornment: (
                  <Person sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="Mobile No."
              name="mobileNo"
              placeholder="01XXXXXXXXX"
              InputProps={{
                startAdornment: (
                  <Phone sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="Session"
              name="session"
              placeholder="2024-2025"
              InputProps={{
                startAdornment: (
                  <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftSelectWithIcon
              fullWidth
              label={
                <span>
                  Category <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="category"
              items={[
                "Day Care",
                "Residential",
                "Non Residential",
                "Residential No Meal",
                "Non Residential One Meal",
                "",
              ]}
              size="medium"
              adornment={<CalendarMonth />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftSelectWithIcon
              name="studentDepartment"
              size="medium"
              label={
                <span>
                  Student Department
                  <span style={{ color: "red" }}>*</span>
                </span>
              }
              placeholder="Student Department"
              items={["hifz", "academic"]}
              adornment={<Person color="action" />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              InputProps={{
                startAdornment: (
                  <Cake sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="NID/Birth Reg. No"
              name="nidBirth"
              placeholder="1234567890"
              InputProps={{
                startAdornment: (
                  <Description sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftSelectWithIcon
              name="bloodGroup"
              label="Blood Group"
              placeholder="Select Blood Group"
              items={bloodGroups}
              adornment={<Person color="action" />}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="Nationality"
              name="nationality"
              placeholder="Bangladeshi"
              InputProps={{
                startAdornment: (
                  <Flag sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
=======
>>>>>>> 914cc4a891106614f124b29664ceacdb5dabb8b5
        </Grid>
        <Grid item xs={12} md={4}>
          <FileUploadWithIcon name="studentPhoto" label="Student Photo" />
        </Grid>
        <Grid item xs={12} md={6} sx={{ opacity: 0 }}>
          <CraftInputWithIcon
            fullWidth
            label="Student ID"
            name="studentId"
            placeholder="Enter Student ID"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            fullWidth
            margin="none"
            size="medium"
            label={
              <span>
                Student Name <span style={{ color: "red" }}>*</span>
              </span>
            }
            name="studentNameBangla"
            placeholder="Student Name (বাংলায়)"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label={
              <span>
                Student Name<span style={{ color: "red" }}>*</span>
              </span>
            }
            name="studentName"
            placeholder="Full Name in English"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label="Mobile No."
            name="mobileNo"
            placeholder="01XXXXXXXXX"
            InputProps={{
              startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label="Session"
            name="session"
            placeholder="2024-2025"
            InputProps={{
              startAdornment: (
                <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <CraftSelectWithIcon
            margin="none"
            size="medium"
            name="studentDepartment"
            label={
              <span>
                Student Department
                <span style={{ color: "red" }}>*</span>
              </span>
            }
            placeholder="Student Department"
            items={["hifz", "academic"]}
            adornment={<Person color="action" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            InputProps={{
              startAdornment: <Cake sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label="NID/Birth Reg. No"
            name="nidBirth"
            placeholder="1234567890"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftSelectWithIcon
            margin="none"
            size="medium"
            name="bloodGroup"
            label="Blood Group"
            placeholder="Select Blood Group"
            items={bloodGroups}
            adornment={<Person color="action" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label="Nationality"
            name="nationality"
            placeholder="Bangladeshi"
            InputProps={{
              startAdornment: <Flag sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
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
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, color: "text.primary" }}
          >
            Academic Details
          </Typography>
          {selectedClass && selectedClass.length > 0 && (
            <Alert
              severity="info"
              icon={<Check />}
              sx={{ mb: 2, borderRadius: 2 }}
            >
              <Typography variant="body2">
                Selected class "
                {selectedClass.map((cls: any) => cls.label || cls).join(", ")}
                " will be automatically used in Fee section.
              </Typography>
            </Alert>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftIntAutoCompleteWithIcon
            margin="none"
            size="medium"
            name="className"
            label={
              <span>
                Class <span style={{ color: "red" }}>*</span>
              </span>
            }
            placeholder="Select Class"
            options={classOptions}
            fullWidth
            multiple
            icon={<Class color="primary" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label="Roll Number"
            name="rollNumber"
            placeholder="Enter Roll No"
            InputProps={{
              startAdornment: <Class sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftSelectWithIcon
            margin="none"
            size="medium"
            name="section"
            label="Section"
            items={["A", "B", "C"]}
            adornment={<Group />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftSelectWithIcon
            margin="none"
            size="medium"
            name="group"
            label="Group"
            items={["Science", "Commerce", "Arts"]}
            adornment={<School />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label="Optional Subject"
            name="optionalSubject"
            placeholder="e.g. Higher Math / ICT"
            InputProps={{
              startAdornment: <Book sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftSelectWithIcon
            margin="none"
            size="medium"
            name="shift"
            label="Shift"
            items={["Morning", "Day", "Evening"]}
            adornment={<AccessTime />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const ParentGuardianStep = () => {
  return (
    <Box sx={{ ...fadeInSlideUp }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, color: "text.primary" }}
          >
            Parent & Guardian
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Father's Name"
            name="fatherName"
            placeholder="Full Name"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label={
              <span>
                Father's Name Bangla <span style={{ color: "red" }}>*</span>
              </span>
            }
            name="fatherNameBangla"
            placeholder="Father's Name (বাংলায়)"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Mobile"
            name="fatherMobile"
            placeholder="01XXXXXXXXX"
            InputProps={{
              startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="NID/Passport No"
            name="fatherNid"
            placeholder="1234567890"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Profession"
            name="fatherProfession"
            placeholder="Occupation"
            InputProps={{
              startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Monthly Income"
            name="fatherIncome"
            placeholder="BDT"
            type="number"
            InputProps={{
              startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Mother's Name"
            name="motherName"
            placeholder="Full Name"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label={
              <span>
                Mother's Name Bangla<span style={{ color: "red" }}>*</span>
              </span>
            }
            name="motherNameBangla"
            placeholder="Mother's Name (বাংলায়)"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Mobile"
            name="motherMobile"
            placeholder="01XXXXXXXXX"
            InputProps={{
              startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="NID/Passport No"
            name="motherNid"
            placeholder="1234567890"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Profession"
            name="motherProfession"
            placeholder="Occupation"
            InputProps={{
              startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Monthly Income"
            name="motherIncome"
            placeholder="BDT"
            type="number"
            InputProps={{
              startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Guardian Name"
            name="guardianName"
            placeholder="Guardian Name"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Relation"
            name="guardianRelation"
            placeholder="Relation"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Mobile"
            name="guardianMobile"
            placeholder="01XXXXXXXXX"
            InputProps={{
              startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Address"
            name="guardianVillage"
            placeholder="Address"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const DocumentCheckbox = ({ name, label }: { name: string; label: string }) => {
  const { watch, setValue } = useFormContext();
  const isChecked = watch(name) || false;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={handleChange}
          name={name}
          color="primary"
        />
      }
      label={label}
      sx={{ mb: 1 }}
    />
  );
};

const AddressDocumentsStep = () => {
  const theme = useTheme();
  const { watch, setValue } = useFormContext();
  const termsAccepted = watch("termsAccepted") || false;

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("termsAccepted", event.target.checked);
  };

  return (
    <Box sx={{ ...fadeInSlideUp }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, color: "text.primary" }}
          >
            Address & Documents
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Village/Area"
            name="village"
            placeholder="Village/Area"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Post Office"
            name="postOffice"
            placeholder="Post Office"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Post Code"
            name="postCode"
            placeholder="Post Code"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Police Station"
            name="policeStation"
            placeholder="Police Station"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="District"
            name="district"
            placeholder="District"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Village/Area"
            name="permVillage"
            placeholder="Village/Area"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Post Office"
            name="permPostOffice"
            placeholder="Post Office"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Post Code"
            name="permPostCode"
            placeholder="Post Code"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Police Station"
            name="permPoliceStation"
            placeholder="Police Station"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="District"
            name="permDistrict"
            placeholder="District"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Previous Institution"
            name="formerInstitution"
            placeholder="Previous Institution"
            InputProps={{
              startAdornment: (
                <School sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Previous Address"
            name="formerVillage"
            placeholder="Previous Address"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: "bold" }}>
              Documents Provided
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <DocumentCheckbox
                  name="birthCertificate"
                  label="Birth Certificate"
                />
                <DocumentCheckbox
                  name="transferCertificate"
                  label="Transfer Certificate"
                />
                <DocumentCheckbox
                  name="characterCertificate"
                  label="Character Certificate"
                />
                <DocumentCheckbox name="markSheet" label="Mark Sheet" />
                <DocumentCheckbox name="photographs" label="Photographs" />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                Terms & Conditions
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ ml: 1 }}
              >
                I agree to the enrollment terms
              </Typography>
            </Box>
            <Switch
              checked={termsAccepted}
              onChange={handleTermsChange}
              name="termsAccepted"
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const FeeStep = ({
  classOptions,
  feeCategoryData,
  studentData,
}: any) => {
  const theme = useTheme();
  const { watch, setValue } = useFormContext();

  const discountTypeObj = watch("discountType") || { label: "Flat Amount", value: "flat" };
  const discountType = discountTypeObj?.value || "flat";
  const discountAmount = parseFloat(watch("discountAmount") || 0);
  const paymentMethod = watch("paymentMethod") || { label: "Cash", value: "cash" };
  const [paidAmount, setPaidAmount] = useState<string>("0");

  const paymentOptions = [
    { label: "Cash", value: "cash" },
    { label: "Bkash", value: "bkash" },
    { label: "Bank", value: "bank" },
    { label: "Online", value: "online" },
  ];

  const discountOptions = [
    { label: "Flat Amount", value: "flat" },
    { label: "Percentage (%)", value: "percentage" },
  ];

  // --- Helper: Calculate Total Fees from all items ---
  const calculateTotalFees = () => {
    const fees = watch("fees") || [];
    let total = 0;

    fees.forEach((fee: any) => {
      if (fee.feeItems && Array.isArray(fee.feeItems)) {
        fee.feeItems.forEach((item: any) => {
          total += parseFloat(item.amount) || 0;
        });
      }
    });

    return total;
  };

  // --- Helper: Calculate Total MONTHLY Fees (for discount) ---
  const calculateTotalMonthlyFees = () => {
    const fees = watch("fees") || [];
    let monthlyTotal = 0;

    fees.forEach((fee: any) => {
      if (fee.feeItems && Array.isArray(fee.feeItems)) {
        fee.feeItems.forEach((item: any) => {
          const feeType = typeof item.feeType === 'string'
            ? item.feeType
            : item.feeType?.value || '';

          if (feeType.toLowerCase().includes('monthly')) {
            monthlyTotal += parseFloat(item.amount) || 0;
          }
        });
      }
    });

    return monthlyTotal;
  };

  // --- Main Calculation Logic ---
  const calculateSummary = () => {
    const totalFees = calculateTotalFees();
    const totalMonthlyFees = calculateTotalMonthlyFees();
    const paidAmountNum = parseFloat(paidAmount) || 0;

    // Calculate discount ONLY on monthly fees
    let calculatedDiscount = 0;

    if (discountType === 'percentage') {
      calculatedDiscount = (totalMonthlyFees * discountAmount) / 100;
    } else {
      calculatedDiscount = Math.min(discountAmount, totalMonthlyFees); // Cap at monthly fees
    }

    // Calculate net payable (total fees - discount)
    const netPayable = totalFees - calculatedDiscount;

    // Calculate due amount (positive if balance > 0)
    const dueAmount = Math.max(0, netPayable - paidAmountNum);

    return {
      totalFees,
      totalMonthlyFees,
      calculatedDiscount,
      netPayable,
      paidAmount: paidAmountNum,
      dueAmount,
      discountType,
      discountAmount
    };
  };

  const summary = calculateSummary();

  // Update form values when summary changes
  useEffect(() => {
    // Set calculated values in form
    setValue("totalAmount", summary.totalFees);
    setValue("totalDiscount", summary.calculatedDiscount);
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

      {/* --- SIMPLE PAYMENT SUMMARY CARD --- */}
      <Card
        elevation={2}
        sx={{
          mt: 4,
          borderRadius: 3,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          background: "#fff",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3}>

            {/* 1. TOTAL AMOUNT SECTION */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pb: 2,
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                }}
              >
                <Box>
                  <Typography variant="h6" color="text.primary" fontWeight="bold">
                    Total Payable
                  </Typography>
                  {summary.totalMonthlyFees > 0 && summary.totalMonthlyFees !== summary.totalFees && (
                    <Typography variant="caption" color="text.secondary">
                      (Monthly Fees: ৳{summary.totalMonthlyFees.toLocaleString()})
                    </Typography>
                  )}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h3" color="primary.main" fontWeight="800">
                    ৳{summary.totalFees.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* 2. DISCOUNT SECTION */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600 }}>
                Apply Discount (Monthly Fees Only)
              </Typography>
              <Grid container spacing={2}>
                {/* Discount Type Select (Left) */}
                <Grid item xs={12} sm={4} md={3}>
                  <CraftIntAutoCompleteWithIcon
                    name="discountType"
                    label="Type"
                    options={discountOptions}
                    size="small"
                    multiple={false}
                    icon={<LocalOffer />}
                    disableClearable
                    fullWidth
                  />
                </Grid>
                {/* Discount Value Input (Right) */}
                <Grid item xs={12} sm={8} md={9}>
                  <CraftInputWithIcon
                    name="discountAmount"
                    label={discountType === 'percentage' ? "Discount Percentage (%)" : "Discount Amount (৳)"}
                    placeholder="0"
                    type="number"
                    fullWidth
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="body2" color="text.secondary">
                            {discountType === 'percentage' ? '%' : '৳'}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Discounted Total Visual Helper */}
              {summary.calculatedDiscount > 0 && (
                <Box sx={{ mt: 2, pl: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Discount Applied on Monthly Fees: <span style={{ fontWeight: 'bold', color: 'warning.main' }}>- ৳{summary.calculatedDiscount.toLocaleString()}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Net Payable After Discount: <span style={{ fontWeight: 'bold', color: 'primary.main' }}>৳{summary.netPayable.toLocaleString()}</span>
                  </Typography>
                </Box>
              )}
            </Grid>

            {/* 3. PAYMENT SECTION */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600 }}>
                Payment Details
              </Typography>
              <Grid container spacing={2}>
                {/* Pay Amount Input */}
                <Grid item xs={12} sm={6} md={6}>
                  <CraftInputWithIcon
                    name="paidAmount"
                    label="Pay Amount Now"
                    placeholder="0"
                    type="number"
                    fullWidth
                    size="small"
                    value={paidAmount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      setPaidAmount(value);
                      setValue("paidAmount", parseFloat(value) || 0);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="body2" color="text.secondary">
                            ৳
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiInputBase-root': {
                        backgroundColor: alpha(theme.palette.success.light, 0.05),
                      }
                    }}
                  />
                </Grid>

                {/* Payment Method Select */}
                <Grid item xs={12} sm={6} md={6}>
                  <CraftIntAutoCompleteWithIcon
                    name="paymentMethod"
                    label="Payment Method"
                    options={paymentOptions}
                    size="small"
                    multiple={false}
                    icon={<Payment />}
                    disableClearable
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* 4. STATUS / DUE AMOUNT */}
            <Grid item xs={12}>
              <Box
                sx={{
                  mt: 1,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(summary.dueAmount > 0 ? theme.palette.error.light : theme.palette.success.light, 0.1),
                  border: `1px solid ${alpha(summary.dueAmount > 0 ? theme.palette.error.main : theme.palette.success.main, 0.2)}`,
                  textAlign: 'center'
                }}
              >
                {summary.dueAmount > 0 ? (
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Due Amount after payment
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="error.main">
                      ৳{summary.dueAmount.toLocaleString()}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="success.main">
                      Fully Paid
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>

            {/* 5. SUMMARY BREAKDOWN */}
            <Grid item xs={12}>
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.info.light, 0.05),
                  border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                  Summary Breakdown
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Total Fees:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" fontWeight="bold">
                      ৳{summary.totalFees.toLocaleString()}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Discount Applied:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" fontWeight="bold" color="warning.main">
                      - ৳{summary.calculatedDiscount.toLocaleString()}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Net Payable:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" fontWeight="bold" color="primary.main">
                      ৳{summary.netPayable.toLocaleString()}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Paid Now:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" fontWeight="bold" color="success.main">
                      ৳{summary.paidAmount.toLocaleString()}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Due Amount:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" fontWeight="bold" color={summary.dueAmount > 0 ? "error.main" : "success.main"}>
                      ৳{summary.dueAmount.toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const EnrollmentForm = () => {
  const theme = useTheme();
  const limit = 200;
  const [page] = useState(0);
  const [searchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [open, setOpen] = useState(false);

<<<<<<< HEAD
  const { classOptions, feeCategoryOptions, feeCategoryData } =
    useAcademicOption();
  console.log("fee cae", feeCategoryData);
=======
  const { classOptions, feeCategoryData } = useAcademicOption();
>>>>>>> 914cc4a891106614f124b29664ceacdb5dabb8b5

  const [createEnrollment] = useCreateEnrollmentMutation();
  const [updateEnrollment] = useUpdateEnrollmentMutation();
  const { data: singleEnrollment, isLoading: enrollmentLoading } =
    useGetSingleEnrollmentQuery(id ? { id } : undefined, {
      skip: !id,
    });

  const { data: studentData } = useGetAllStudentsQuery({
    limit,
    page: page + 1,
    searchTerm,
  });

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
    if (
      id &&
      singleEnrollment &&
      classOptions.length > 0 &&
      feeCategoryData
    ) {
      const transformedData = transformEnrollmentDataToForm(
        singleEnrollment,
        classOptions,
        feeCategoryData
      );

      if (transformedData) {
        if (!transformedData.paymentMethod) {
          transformedData.paymentMethod = { label: "Cash", value: "cash" };
        }
        setDefaultValues(transformedData);
        setFormKey((prev) => prev + 1);
      }
    } else if (!id) {
      setDefaultValues({
        studentId: "",
        studentNameBangla: "",
        studentPhoto: "",
        fatherNameBangla: "",
        motherNameBangla: "",
        studentName: "",
        mobileNo: "",
        session: new Date().getFullYear().toString(),
        category: "residential",
        dateOfBirth: null,
        nidBirth: "",
        bloodGroup: "",
        nationality: "Bangladeshi",
        fatherName: "",
        fatherMobile: "",
        fatherNid: "",
        fatherProfession: "",
        fatherIncome: 0,
        motherName: "",
        motherMobile: "",
        motherNid: "",
        motherProfession: "",
        motherIncome: 0,
        className: [],
        studentDepartment: "hifz",
        rollNumber: "",
        section: "",
        group: "",
        optionalSubject: "",
        shift: "",
        admissionType: "",
        village: "",
        postOffice: "",
        postCode: "",
        policeStation: "",
        district: "",
        permVillage: "",
        permPostOffice: "",
        permPostCode: "",
        permPoliceStation: "",
        permDistrict: "",
        guardianName: "",
        guardianRelation: "",
        guardianMobile: "",
        guardianVillage: "",
        formerInstitution: "",
        formerVillage: "",
        birthCertificate: false,
        transferCertificate: false,
        characterCertificate: false,
        markSheet: false,
        photographs: false,
        termsAccepted: false,
        fees: [
          {
            category: [],
            className: [],
            feeItems: [],
            feeAmount: "",
          },
        ],
        admissionFee: 0,
        monthlyFee: 0,
        discountType: { label: "Flat Amount", value: "flat" },
        discountAmount: 0,
        paymentMethod: { label: "Cash", value: "cash" },
        studentIdSelect: null,
        studentNameSelect: null,
        totalAmount: 0,
        totalDiscount: 0,
        netPayable: 0,
        paidAmount: 0,
        dueAmount: 0,
        advanceBalance: 0,
      });
      setFormKey((prev) => prev + 1);
    }
  }, [id, singleEnrollment, classOptions, feeCategoryData]);

  const handleSubmit = async (data: any) => {
    try {
      setSubmitting(true);

      const { studentIdSelect, studentNameSelect, ...submitData } = data;

      if (!submitData.studentName) {
        toast.error("Student name is required");
        setSubmitting(false);
        return;
      }

      if (!submitData.mobileNo) {
        toast.error("Mobile number is required");
        setSubmitting(false);
        return;
      }

      if (!submitData.className || submitData.className.length === 0) {
        toast.error("Class selection is required");
        setSubmitting(false);
        return;
      }

      const classNameArray =
        submitData.className && submitData.className.length > 0
          ? submitData.className
            .map((cls: any) => cls.value || cls)
            .filter(Boolean)
          : [];

      if (!classNameArray.length) {
        toast.error("Class selection is required");
        setSubmitting(false);
        return;
      }

      const discountTypeValue = typeof submitData.discountType === 'object'
        ? submitData.discountType.value
        : submitData.discountType;

      const paymentMethodValue = typeof submitData.paymentMethod === 'object'
        ? submitData.paymentMethod.value
        : submitData.paymentMethod || 'cash';

      // --- Logic: Calculate Discount Amount specifically for Backend ---
      // Calculate ONLY monthly fees for discount application
      const calculateMonthlyFeeTotal = (fees: any[]) => {
        let total = 0;
        fees.forEach((fee: any) => {
          if (fee.feeItems && Array.isArray(fee.feeItems)) {
            fee.feeItems.forEach((item: any) => {
              const fType = typeof item.feeType === 'string' ? item.feeType : item.feeType?.value;
              if (fType && String(fType).toLowerCase().includes('monthly')) {
                total += parseFloat(item.amount) || 0;
              }
            });
          }
        });
        return total;
      };

      const monthlyFeeTotal = calculateMonthlyFeeTotal(submitData.fees || []);
      const discountInput = parseFloat(submitData.discountAmount) || 0;

      let calculatedDiscountForBackend = 0;

      if (discountTypeValue === 'percentage') {
        calculatedDiscountForBackend = (monthlyFeeTotal * discountInput) / 100;
      } else {
        calculatedDiscountForBackend = Math.min(discountInput, monthlyFeeTotal); // Cap at monthly fees
      }

      // --- Logic: Distribute the Single Pay Amount to fee items ---
      const totalPayNowInput = parseFloat(submitData.paidAmount) || 0;

      // Flatten fee items to distribute payment
      let allFeeItems: any[] = [];
      submitData.fees.forEach((fee: any) => {
        if (fee.feeItems && Array.isArray(fee.feeItems)) {
          allFeeItems = [...allFeeItems, ...fee.feeItems];
        }
      });

      // Sort items: Monthly fees first, then others
      allFeeItems.sort((a, b) => {
        const aType = typeof a.feeType === 'string' ? a.feeType : a.feeType?.value || '';
        const bType = typeof b.feeType === 'string' ? b.feeType : b.feeType?.value || '';

        const aIsMonthly = aType.toLowerCase().includes('monthly');
        const bIsMonthly = bType.toLowerCase().includes('monthly');

        if (aIsMonthly && !bIsMonthly) return -1;
        if (!aIsMonthly && bIsMonthly) return 1;
        return 0;
      });

      // Distribute payment starting from monthly fees
      let remainingPay = totalPayNowInput;

      // First, allocate to monthly fees
      const monthlyItems = allFeeItems.filter(item => {
        const fType = typeof item.feeType === 'string' ? item.feeType : item.feeType?.value || '';
        return fType.toLowerCase().includes('monthly');
      });

      monthlyItems.forEach((item, index) => {
        if (remainingPay <= 0) return;

        const itemAmount = parseFloat(item.amount) || 0;
        const existingAdvance = parseFloat(item.advanceAmount) || 0;

        // Calculate how much of discount applies to this monthly item
        const monthlyItemShare = itemAmount / monthlyFeeTotal;
        const itemDiscount = calculatedDiscountForBackend * monthlyItemShare;

        const itemNetAmount = Math.max(0, itemAmount - itemDiscount);
        const maxPayable = itemNetAmount - existingAdvance;

        if (maxPayable > 0) {
          const toPay = Math.min(remainingPay, maxPayable);
          item.advanceAmount = existingAdvance + toPay;
          remainingPay -= toPay;
        }
      });

      // Then allocate remaining payment to other fees
      const otherItems = allFeeItems.filter(item => {
        const fType = typeof item.feeType === 'string' ? item.feeType : item.feeType?.value || '';
        return !fType.toLowerCase().includes('monthly');
      });

      otherItems.forEach((item) => {
        if (remainingPay <= 0) return;

        const itemAmount = parseFloat(item.amount) || 0;
        const existingAdvance = parseFloat(item.advanceAmount) || 0;
        const maxPayable = itemAmount - existingAdvance;

        if (maxPayable > 0) {
          const toPay = Math.min(remainingPay, maxPayable);
          item.advanceAmount = existingAdvance + toPay;
          remainingPay -= toPay;
        }
      });

      const transformedFees = Array.isArray(submitData.fees)
        ? submitData.fees
          .filter(
            (fee: any) =>
              fee.category &&
              fee.category.length > 0 &&
              fee.className &&
              fee.className.length > 0 &&
              fee.feeItems &&
              fee.feeItems.length > 0
          )
          .flatMap((fee: any) => {
            const className = fee.className[0]?.label || fee.className[0] || "";
            const categoryName = fee.category[0]?.label || fee.category[0] || "";

            return fee.feeItems
              .filter((item: any) => item.isSelected !== false)
              .map((item: any) => {
                const fType = typeof item.feeType === 'string' ? item.feeType : item.feeType?.value;

                // --- KEY LOGIC: Assign Discount ONLY to Monthly Fee Item ---
                let itemDiscount = 0;
                const isMonthly = fType && String(fType).toLowerCase().includes('monthly');

                if (isMonthly && monthlyFeeTotal > 0) {
                  // Distribute discount proportionally among monthly items
                  const itemAmount = parseFloat(item.amount) || 0;
                  const monthlyShare = itemAmount / monthlyFeeTotal;
                  itemDiscount = calculatedDiscountForBackend * monthlyShare;
                }

                const finalAdvanceAmount = parseFloat(item.advanceAmount) || 0;

                return {
                  feeType: fType || "",
                  amount: item.amount || 0,
                  className: className,
                  category: categoryName,
                  advanceAmount: finalAdvanceAmount,
                  discount: itemDiscount,
                  paymentMethod: paymentMethodValue
                };
              });
          })
        : [];

      if (transformedFees.length === 0) {
        toast.error("At least one valid fee item is required");
        setSubmitting(false);
        return;
      }

      const studentAdvanceBalance = submitData.advanceBalance || 0;

      const totalAdvanceUsed = transformedFees.reduce(
        (sum: number, fee: any) => sum + (fee.advanceAmount || 0),
        0
      );

      // Update payment status based on due amount
      const totalAmount = parseFloat(submitData.totalAmount) || 0;
      const totalDiscount = parseFloat(submitData.totalDiscount) || 0;
      const netPayable = parseFloat(submitData.netPayable) || 0;
      const paidAmount = parseFloat(submitData.paidAmount) || 0;
      const dueAmount = parseFloat(submitData.dueAmount) || 0;

      let paymentStatus = 'pending';
      if (dueAmount <= 0) {
        paymentStatus = 'paid';
      } else if (paidAmount > 0) {
        paymentStatus = 'partial';
      }

      const finalSubmitData: any = {
        studentName: submitData.studentName || "",
        nameBangla: submitData.studentNameBangla || "",
        studentPhoto: submitData.studentPhoto || "",
        mobileNo: submitData.mobileNo || "",
        rollNumber: submitData.rollNumber || "",
        birthDate: submitData.dateOfBirth
          ? new Date(submitData.dateOfBirth).toISOString()
          : "",
        birthRegistrationNo: submitData.nidBirth || "",
        bloodGroup: submitData.bloodGroup || "",
        nationality: submitData.nationality || "Bangladeshi",
        className: classNameArray,
        section: submitData.section || "",
        roll: submitData.roll || submitData.rollNumber || "",
        session: submitData.session || new Date().getFullYear().toString(),
        batch: submitData.group || "",
        studentType: submitData.category || "Residential",
        studentDepartment: submitData.studentDepartment || "hifz",
        fatherName: submitData.fatherName || "",
        fatherNameBangla: submitData.fatherNameBangla || "",
        fatherMobile: submitData.fatherMobile || "",
        fatherNid: submitData.fatherNid || "",
        fatherProfession: submitData.fatherProfession || "",
        fatherIncome: Number(submitData.fatherIncome) || 0,
        motherName: submitData.motherName || "",
        motherNameBangla: submitData.motherNameBangla || "",
        motherMobile: submitData.motherMobile || "",
        motherNid: submitData.motherNid || "",
        motherProfession: submitData.motherProfession || "",
        motherIncome: Number(submitData.motherIncome) || 0,
        presentAddress: {
          village: submitData.village || "",
          postOffice: submitData.postOffice || "",
          postCode: submitData.postCode || "",
          policeStation: submitData.policeStation || "",
          district: submitData.district || "",
        },
        permanentAddress: {
          village: submitData.permVillage || "",
          postOffice: submitData.permPostOffice || "",
          postCode: submitData.permPostCode || "",
          policeStation: submitData.permPoliceStation || "",
          district: submitData.permDistrict || "",
        },
        guardianInfo: {
          name: submitData.guardianName || "",
          relation: submitData.guardianRelation || "",
          mobile: submitData.guardianMobile || "",
          address: submitData.guardianVillage || "",
        },
        previousSchool: {
          institution: submitData.formerInstitution || "",
          address: submitData.formerVillage || "",
        },
        documents: {
          birthCertificate: Boolean(submitData.birthCertificate),
          transferCertificate: Boolean(submitData.transferCertificate),
          characterCertificate: Boolean(submitData.characterCertificate),
          markSheet: Boolean(submitData.markSheet),
          photographs: Boolean(submitData.photographs),
        },
        fees: transformedFees,
        termsAccepted: Boolean(submitData.termsAccepted),
        admissionFee: Number(submitData.admissionFee) || 0,
        monthlyFee: Number(submitData.monthlyFee) || 0,
        discountType: discountTypeValue,
        discountAmount: Number(submitData.discountAmount) || 0,
        advanceBalance: studentAdvanceBalance,
        paymentStatus: paymentStatus,
        totalAmount: totalAmount,
        totalDiscount: totalDiscount,
        netPayable: netPayable,
        paidAmount: paidAmount,
        dueAmount: dueAmount,
        paymentMethod: paymentMethodValue,
      };

      let res;
      if (id) {
        res = await updateEnrollment({ id, data: finalSubmitData }).unwrap();
      } else {
        res = await createEnrollment(finalSubmitData).unwrap();
      }

      if (res?.success) {
        toast.success(res?.message || "Student enrolled successfully");

        setTimeout(() => {
          router.push(`/dashboard/enrollments/list`);
        }, 2000);
      } else {
        throw new Error(res?.message || "Failed to enroll student");
      }
    } catch (err: any) {
      console.error("Submission error:", err);

      let errorMessage = "Failed to enroll student!";

      if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      }

      if (errorMessage.includes("advance")) {
        toast.error(
          "Advance balance insufficient. Please adjust advance amount."
        );
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const contentWrapper = document.getElementById("form-content-wrapper");
    if (contentWrapper) {
      contentWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const contentWrapper = document.getElementById("form-content-wrapper");
    if (contentWrapper) {
      contentWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if ((id && enrollmentLoading) || !defaultValues) {
    return <LoadingState />;
  }

  return (
    <Box
      sx={{
        bgcolor: alpha(theme.palette.background.default, 0.5),
        minHeight: "100vh",
      }}
    >
      <CraftForm
        key={formKey}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 3,
              borderRadius: 3,
              background: "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" alignItems="center">
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 56,
                  height: 56,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <School sx={{ color: "#fff", fontSize: 32 }} />
              </Avatar>
              <Box ml={2}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  Craft International Institute
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  226, Narayanhat Sadar, Narayanganj
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 0,
              borderRadius: 3,
              background: "#fff",
              boxShadow: "0 4px 30px rgba(0,0,0,0.03)",
              overflow: "visible",
              minHeight: 600,
            }}
          >
            <Box
              sx={{
                px: 4,
                py: 2,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ fontWeight: 600, letterSpacing: 0.5 }}
              >
                {activeStep + 1} OF {steps.length}
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }} id="form-content-wrapper">
              <Box minHeight={400}>
                {activeStep === 0 && <StudentInformationStep />}
                {activeStep === 1 && (
                  <AcademicStep classOptions={classOptions} />
                )}
                {activeStep === 2 && <ParentGuardianStep />}
                {activeStep === 3 && <AddressDocumentsStep />}
                {activeStep === 4 && (
                  <FeeStep
                    classOptions={classOptions}
                    feeCategoryData={feeCategoryData}
                    studentData={studentData}
                  />
                )}
              </Box>
            </CardContent>
          </Paper>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
              px: 1,
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBack sx={{ fontSize: 18 }} />}
              variant="text"
              type="button"
              sx={{
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "text.primary",
                  bgcolor: alpha(theme.palette.action.hover, 0.04),
                },
                px: 2,
                py: 1.5,
              }}
            >
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={submitting}
                endIcon={
                  submitting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Save />
                  )
                }
                sx={{
                  borderRadius: 2,
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  textTransform: "none",
                  background: theme.palette.primary.main,
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
              >
                {submitting
                  ? "Submitting..."
                  : id
                    ? "Update Enrollment"
                    : "Submit Application"}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowForward sx={{ fontSize: 18 }} />}
                type="button"
                sx={{
                  borderRadius: 2,
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  background: theme.palette.primary.main,
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    bgcolor: theme.palette.primary.dark,
                  },
                  textTransform: "none",
                }}
              >
                Continue
              </Button>
            )}
          </Box>
        </Container>
      </CraftForm>
    </Box>
  );
};

export default EnrollmentForm;