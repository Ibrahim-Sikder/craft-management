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
  Add,
  Book,
  Cake,
  CalendarMonth,
  Check,
  Class,
  Description,
  Discount,
  Flag,
  Group,
  Money,
  MoneyOff,
  Person,
  Phone,
  Remove,
  School,
  Work,
  Percent,
  ArrowBack,
  ArrowForward,
  AccountCircle,
  Home,
  School as SchoolIcon,
  FamilyRestroom,
  Description as DocumentIcon,
  Payment,
  Save,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  LinearProgress,
  Divider,
  Chip,
  Tooltip,
  alpha,
  useTheme,
  Switch,
  Checkbox,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import FeeCategoryModal from "../../fees/__components/FeeCategoryModal";

const FeeAmountHandler = ({
  feeIndex,
  feeCategoryData,
}: {
  feeIndex: number;
  feeCategoryData: any;
}) => {
  const { watch, setValue } = useFormContext();
  const selectedFees = watch(`fees.${feeIndex}.feeType`);
  const selectedClass = watch(`fees.${feeIndex}.className`);
  const feeAmount = watch(`fees.${feeIndex}.feeAmount`);
  const paidAmount = watch(`fees.${feeIndex}.paidAmount`);
  const discountType = watch(`fees.${feeIndex}.discountType`) || "flat";
  const discountValue = watch(`fees.${feeIndex}.discountValue`) || "0";
  const waiverType = watch(`fees.${feeIndex}.waiverType`) || "flat";
  const waiverValue = watch(`fees.${feeIndex}.waiverValue`) || "0";

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

  useEffect(() => {
    if (
      selectedFees &&
      selectedFees.length > 0 &&
      selectedClass &&
      selectedClass.length > 0
    ) {
      const selectedFeeLabel = selectedFees[0]?.label || selectedFees[0];
      const selectedFeeType = selectedFeeLabel.split(" - ")[0];
      const selectedClassName = selectedClass[0]?.label || selectedClass[0];

      const matchingFee = feeCategoryData?.data?.data?.find(
        (fee: any) =>
          fee.feeType.toLowerCase() === selectedFeeType.toLowerCase() &&
          fee.class === selectedClassName
      );

      if (matchingFee) {
        setValue(
          `fees.${feeIndex}.feeAmount`,
          matchingFee.feeAmount.toString()
        );

        const feeType = selectedFeeType.toLowerCase();
        const isYearly =
          feeType.includes("yearly") || feeType.includes("annual");
        setValue(`fees.${feeIndex}.isYearlyFee`, isYearly);
      }
    }
  }, [selectedFees, selectedClass, setValue, feeIndex, feeCategoryData]);

  useEffect(() => {
    if (feeAmount && selectedFees && selectedFees.length > 0) {
      const selectedFee = selectedFees[0];
      const feeLabel = selectedFee.label || selectedFee;
      const feeType = feeLabel.split(" - ")[0];

      if (
        feeType.toLowerCase().includes("yearly") ||
        feeType.toLowerCase().includes("annual")
      ) {
        const yearlyAmount = parseFloat(feeAmount);
        if (!isNaN(yearlyAmount)) {
          const monthlyAmount = (yearlyAmount / 12).toFixed(2);
          setValue(`fees.${feeIndex}.monthlyAmount`, monthlyAmount);
          setValue(`fees.${feeIndex}.yearlyAmount`, yearlyAmount.toString());
          setValue(`fees.${feeIndex}.isYearlyFee`, true);
        }
      } else if (feeType.toLowerCase().includes("monthly")) {
        const monthlyAmount = parseFloat(feeAmount);
        if (!isNaN(monthlyAmount)) {
          const yearlyAmount = (monthlyAmount * 12).toFixed(2);
          setValue(`fees.${feeIndex}.monthlyAmount`, monthlyAmount.toString());
          setValue(`fees.${feeIndex}.yearlyAmount`, yearlyAmount);
          setValue(`fees.${feeIndex}.isYearlyFee`, false);
        }
      } else {
        setValue(`fees.${feeIndex}.monthlyAmount`, "");
        setValue(`fees.${feeIndex}.yearlyAmount`, "");
        setValue(`fees.${feeIndex}.isYearlyFee`, false);
      }
    }
  }, [feeAmount, selectedFees, setValue, feeIndex]);

  useEffect(() => {
    if (feeAmount !== undefined && paidAmount !== undefined) {
      const fee = parseFloat(feeAmount) || 0;
      const paid = parseFloat(paidAmount) || 0;
      const discountAmount = calculateDiscountAmount();
      const waiverAmount = calculateWaiverAmount();
      const due = Math.max(0, fee - paid - discountAmount - waiverAmount);

      setValue(`fees.${feeIndex}.dueAmount`, due > 0 ? due.toString() : "0");
      setValue(
        `fees.${feeIndex}.paymentStatus`,
        due <= 0 ? "paid" : paid > 0 ? "partial" : "unpaid"
      );

      setValue(
        `fees.${feeIndex}.calculatedDiscount`,
        discountAmount.toString()
      );
      setValue(`fees.${feeIndex}.calculatedWaiver`, waiverAmount.toString());
    }
  }, [
    feeAmount,
    paidAmount,
    discountType,
    discountValue,
    waiverType,
    waiverValue,
    setValue,
    feeIndex,
  ]);

  return null;
};

const DynamicFeeFields = ({
  classOptions,
  feeCategoryOptions,
  feeCategoryData,
}: any) => {
  const theme = useTheme();
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fees",
  });
  const [openFeeModal, setOpenFeeModal] = useState(false);
  const handleOpenFeeModal = () => setOpenFeeModal(true);
  const handleCloseFeeModal = () => setOpenFeeModal(false);
  const mainClassName = watch("className");

  useEffect(() => {
    if (mainClassName && mainClassName.length > 0) {
      fields.forEach((_, index) => {
        setValue(`fees.${index}.className`, mainClassName);
      });
    }
  }, [mainClassName, fields, setValue]);

  const getFilteredFeeOptions = (feeClassName: any) => {
    if (feeClassName && feeClassName.length > 0) {
      const selectedClassNames = feeClassName.map(
        (cls: any) => cls.label || cls
      );

      const filtered = feeCategoryData?.data?.data?.filter((fee: any) =>
        selectedClassNames.includes(fee.class)
      );

      const uniqueFeeTypes = Array.from(
        new Set(filtered.map((fee: any) => fee.feeType))
      ).map((feeType) => {
        const feeData = filtered.find((fee: any) => fee.feeType === feeType);
        const feeAmount = feeData ? feeData.feeAmount : 0;
        const labelWithAmount = `${feeType} - ৳${feeAmount}`;

        const originalOption = feeCategoryOptions.find(
          (option: any) => option.label === feeType
        );

        return originalOption
          ? { ...originalOption, label: labelWithAmount }
          : { value: feeType, label: labelWithAmount };
      });

      return uniqueFeeTypes;
    } else {
      return feeCategoryOptions;
    }
  };

  const addFeeField = () => {
    const classNameValue =
      mainClassName && mainClassName.length > 0
        ? JSON.parse(JSON.stringify(mainClassName))
        : [];

    append({
      feeType: [],
      className: classNameValue,
      feeAmount: "",
      yearlyAmount: "",
      monthlyAmount: "",
      paidAmount: "",
      discountType: "flat",
      discountValue: "0",
      discountReason: "",
      waiverType: "flat",
      waiverValue: "0",
      waiverReason: "",
      calculatedDiscount: "0",
      calculatedWaiver: "0",
      dueAmount: "",
      paymentStatus: "unpaid",
      isYearlyFee: false,
    });
  };

  const removeFeeField = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      toast.error("At least one fee entry is required");
    }
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 4,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.02
          )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            p: 3,
            color: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Payment sx={{ fontSize: 32, mr: 2 }} />
              <Typography variant="h5" fontWeight="bold">
                Fee Information
              </Typography>
              <Chip
                label="Required"
                size="small"
                sx={{
                  ml: 2,
                  bgcolor: alpha("#fff", 0.2),
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </Box>
            <Tooltip title="Add Fee Entry">
              <IconButton
                onClick={addFeeField}
                sx={{
                  bgcolor: alpha("#fff", 0.2),
                  color: "white",
                  "&:hover": {
                    bgcolor: alpha("#fff", 0.3),
                  },
                }}
              >
                <Add />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <CardContent sx={{ p: 3 }}>
          {fields.map((field, index) => {
            const feeClassName = watch(`fees.${index}.className`);
            const filteredFeeOptions = getFilteredFeeOptions(feeClassName);
            const isYearlyFee = watch(`fees.${index}.isYearlyFee`);
            const feeAmount = parseFloat(watch(`fees.${index}.feeAmount`)) || 0;
            const discountType = watch(`fees.${index}.discountType`) || "flat";
            const discountValue =
              parseFloat(watch(`fees.${index}.discountValue`)) || 0;
            const waiverType = watch(`fees.${index}.waiverType`) || "flat";
            const waiverValue =
              parseFloat(watch(`fees.${index}.waiverValue`)) || 0;
            const calculatedDiscount =
              parseFloat(watch(`fees.${index}.calculatedDiscount`)) || 0;
            const calculatedWaiver =
              parseFloat(watch(`fees.${index}.calculatedWaiver`)) || 0;
            const totalAdjustments = calculatedDiscount + calculatedWaiver;

            return (
              <Box
                key={field.id}
                sx={{
                  mb: 3,
                  p: 3,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.background.paper,
                    0.9
                  )} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  position: "relative",
                  overflow: "hidden",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "5px",
                    height: "100%",
                    background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  },
                }}
              >
                {index > 0 && (
                  <Tooltip title="Remove Fee Entry">
                    <IconButton
                      onClick={() => removeFeeField(index)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "error.main",
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        "&:hover": {
                          bgcolor: alpha(theme.palette.error.main, 0.2),
                        },
                      }}
                    >
                      <Remove />
                    </IconButton>
                  </Tooltip>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Fee Entry #{index + 1}
                  </Typography>
                  {totalAdjustments > 0 && (
                    <Chip
                      label={`Adjustments: ৳${totalAdjustments.toFixed(2)}`}
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  )}
                </Box>

                <FeeAmountHandler
                  feeIndex={index}
                  feeCategoryData={feeCategoryData}
                />

                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <CraftIntAutoCompleteWithIcon
                      name={`fees.${index}.className`}
                      label="Class"
                      placeholder="Select Class"
                      options={classOptions}
                      fullWidth
                      multiple
                      icon={<Class color="primary" />}
                      disabled={mainClassName && mainClassName.length > 0}
                      helperText={
                        mainClassName && mainClassName.length > 0
                          ? "Class is synced with Academic Information"
                          : "Select Class"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={9}>
                        <CraftIntAutoCompleteWithIcon
                          name={`fees.${index}.feeType`}
                          label="Fee Type"
                          placeholder="Select Fee Type"
                          options={filteredFeeOptions}
                          fullWidth
                          multiple
                          icon={<Money color="primary" />}
                        />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Button
                          onClick={handleOpenFeeModal}
                          size="small"
                          startIcon={<Add />}
                          sx={{ mt: 2 }}
                        >
                          Add
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Fix: Use CraftInputWithIcon instead of hidden input for feeAmount */}
                  <Grid item xs={12} md={4}>
                    <CraftInputWithIcon
                      name={`fees.${index}.feeAmount`}
                      label="Fee Amount"
                      fullWidth
                      size="small"
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <Money sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>

                  {isYearlyFee && (
                    <Grid item xs={12} md={4}>
                      <CraftInputWithIcon
                        name={`fees.${index}.monthlyAmount`}
                        label="Monthly Amount (Auto)"
                        fullWidth
                        size="small"
                        disabled
                        InputProps={{
                          startAdornment: (
                            <Money sx={{ color: "text.secondary", mr: 1 }} />
                          ),
                        }}
                      />
                    </Grid>
                  )}

                  {!isYearlyFee &&
                    watch(`fees.${index}.feeType`)?.some((fee: any) =>
                      (fee.label || fee).toLowerCase().includes("monthly")
                    ) && (
                      <Grid item xs={12} md={4}>
                        <CraftInputWithIcon
                          name={`fees.${index}.yearlyAmount`}
                          label="Yearly Total (Auto)"
                          fullWidth
                          size="small"
                          disabled
                          InputProps={{
                            startAdornment: (
                              <Money sx={{ color: "text.secondary", mr: 1 }} />
                            ),
                          }}
                        />
                      </Grid>
                    )}

                  {/* Discount Section */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mt: 2,
                        mb: 1,
                        color: theme.palette.success.main,
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      <Discount sx={{ mr: 1 }} />
                      Discount Settings
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Discount Type</InputLabel>
                      <Select
                        name={`fees.${index}.discountType`}
                        value={discountType}
                        label="Discount Type"
                        onChange={(e) =>
                          setValue(`fees.${index}.discountType`, e.target.value)
                        }
                      >
                        <MenuItem value="flat">Flat Amount (৳)</MenuItem>
                        <MenuItem value="percentage">Percentage (%)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <CraftInputWithIcon
                      name={`fees.${index}.discountValue`}
                      label={
                        discountType === "percentage"
                          ? "Discount %"
                          : "Discount Amount"
                      }
                      fullWidth
                      size="small"
                      type="number"
                      InputProps={{
                        startAdornment:
                          discountType === "percentage" ? (
                            <Percent sx={{ color: "success.main", mr: 1 }} />
                          ) : (
                            <Discount sx={{ color: "success.main", mr: 1 }} />
                          ),
                      }}
                      helperText={
                        discountType === "percentage"
                          ? `Max: 100% (৳${(feeAmount * 1).toFixed(2)})`
                          : `Max: ৳${feeAmount.toFixed(2)}`
                      }
                      inputProps={{
                        max: discountType === "percentage" ? 100 : feeAmount,
                        min: 0,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      name={`fees.${index}.discountReason`}
                      label="Discount Reason"
                      fullWidth
                      size="small"
                      placeholder="Reason for discount"
                      InputProps={{
                        startAdornment: (
                          <Description sx={{ color: "success.main", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>

                  {/* Waiver Section */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mt: 2,
                        mb: 1,
                        color: theme.palette.info.main,
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      <MoneyOff sx={{ mr: 1 }} />
                      Waiver Settings
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Waiver Type</InputLabel>
                      <Select
                        name={`fees.${index}.waiverType`}
                        value={waiverType}
                        label="Waiver Type"
                        onChange={(e) =>
                          setValue(`fees.${index}.waiverType`, e.target.value)
                        }
                      >
                        <MenuItem value="flat">Flat Amount (৳)</MenuItem>
                        <MenuItem value="percentage">Percentage (%)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <CraftInputWithIcon
                      name={`fees.${index}.waiverValue`}
                      label={
                        waiverType === "percentage"
                          ? "Waiver %"
                          : "Waiver Amount"
                      }
                      fullWidth
                      size="small"
                      type="number"
                      InputProps={{
                        startAdornment:
                          waiverType === "percentage" ? (
                            <Percent sx={{ color: "info.main", mr: 1 }} />
                          ) : (
                            <MoneyOff sx={{ color: "info.main", mr: 1 }} />
                          ),
                      }}
                      helperText={
                        waiverType === "percentage"
                          ? `Max: 100% (৳${(feeAmount * 1).toFixed(2)})`
                          : `Max: ৳${feeAmount.toFixed(2)}`
                      }
                      inputProps={{
                        max: waiverType === "percentage" ? 100 : feeAmount,
                        min: 0,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      name={`fees.${index}.waiverReason`}
                      label="Waiver Reason"
                      fullWidth
                      size="small"
                      placeholder="Reason for waiver"
                      InputProps={{
                        startAdornment: (
                          <Description sx={{ color: "info.main", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mt: 2,
                        mb: 1,
                        color: theme.palette.primary.main,
                        fontWeight: "bold",
                      }}
                    >
                      Payment Information
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <CraftInputWithIcon
                      name={`fees.${index}.paidAmount`}
                      label="Paid Amount"
                      fullWidth
                      size="small"
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <Money sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <CraftInputWithIcon
                      name={`fees.${index}.dueAmount`}
                      label="Due Amount (Auto)"
                      fullWidth
                      size="small"
                      disabled
                      InputProps={{
                        startAdornment: (
                          <Money sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <CraftSelectWithIcon
                      name={`fees.${index}.paymentStatus`}
                      label="Payment Status"
                      items={["paid", "partial", "unpaid"]}
                      adornment={<Money />}
                      size="small"
                    />
                  </Grid>
                </Grid>

                {totalAdjustments > 0 && (
                  <Alert severity="success" sx={{ mt: 2 }} icon={<Discount />}>
                    <Typography variant="body2">
                      <strong>Adjustments Applied:</strong>
                      <br />
                      Discount: ৳{calculatedDiscount.toFixed(2)}{" "}
                      {discountType === "percentage" && `(${discountValue}%)`}
                      <br />
                      Waiver: ৳{calculatedWaiver.toFixed(2)}{" "}
                      {waiverType === "percentage" && `(${waiverValue}%)`}
                      <br />
                      <strong>Total Adjustments:</strong> ৳
                      {totalAdjustments.toFixed(2)}
                      {discountType === "percentage" ||
                        (waiverType === "percentage" && (
                          <>
                            <br />
                            <em>
                              Percentage values are converted to flat amounts
                            </em>
                          </>
                        ))}
                    </Typography>
                  </Alert>
                )}

                {(!feeClassName || feeClassName.length === 0) && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Please select a class to see available fee types
                  </Alert>
                )}

                {calculatedDiscount + calculatedWaiver > feeAmount && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    Total adjustments (৳
                    {(calculatedDiscount + calculatedWaiver).toFixed(2)}) cannot
                    exceed fee amount (৳{feeAmount.toFixed(2)})
                  </Alert>
                )}
              </Box>
            );
          })}

          {fields.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Payment sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No fee entries added yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click the + button to add fee entries
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <FeeCategoryModal open={openFeeModal} setOpen={handleCloseFeeModal} />
    </>
  );
};

const StudentSelector = ({ studentData, classOptions }: any) => {
  const theme = useTheme();
  const { setValue, watch } = useFormContext();
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const studentIdOptions =
    studentData?.data?.map((student: any) => ({
      value: student._id,
      label: student.studentId,
      data: student,
    })) || [];

  const studentNameOptions =
    studentData?.data?.map((student: any) => ({
      value: student._id,
      label: student.name,
      data: student,
    })) || [];

  const transformStudentClassToForm = (studentClassName: any[]) => {
    if (
      !studentClassName ||
      !Array.isArray(studentClassName) ||
      studentClassName.length === 0
    ) {
      return [];
    }

    return studentClassName.map((cls: any) => {
      const className = cls.className || cls;

      let matchedClass = classOptions?.find(
        (option: any) => option.value === cls._id || option.label === className
      );

      if (!matchedClass) {
        matchedClass = {
          value: cls._id || className,
          label: className,
        };
      }

      return matchedClass;
    });
  };
  const populateFormWithStudentData = (student: any) => {
    if (!student) return;

    const formattedClassName = transformStudentClassToForm(student.className);

    const formValues: any = {
      studentId: student.studentId || "", // ADDED: studentId field
      studentNameBangla: student.nameBangla || "",
      studentPhoto: student.studentPhoto || "",
      fatherNameBangla: student.fatherName || "",
      motherNameBangla: student.motherName || "",
      studentName: student.name || "",
      mobileNo: student.mobile || "",
      className: formattedClassName,
      session:
        student.activeSession?.[0] || new Date().getFullYear().toString(),
      category: student.studentType?.toLowerCase() || "residential",
      dateOfBirth: student.birthDate ? new Date(student.birthDate) : null,
      nidBirth: student.birthRegistrationNo || "",
      bloodGroup: student.bloodGroup || "",
      nationality: "Bangladeshi",
      fatherName: student.fatherName || "",
      fatherMobile: student.fatherMobile || "",
      fatherNid: student.nidFatherMotherGuardian || "",
      fatherProfession: student.fatherProfession || "",
      fatherIncome: student.fatherIncome || 0,
      motherName: student.motherName || "",
      motherMobile: student.motherMobile || "",
      motherNid: student.nidFatherMotherGuardian || "",
      motherProfession: student.motherProfession || "",
      motherIncome: student.motherIncome || 0,
      village: student.presentAddress?.village || "",
      postOffice: student.presentAddress?.postOffice || "",
      postCode: student.presentAddress?.postCode || "",
      policeStation: student.presentAddress?.policeStation || "",
      district: student.presentAddress?.district || "",
      permVillage: student.permanentAddress?.village || "",
      permPostOffice: student.permanentAddress?.postOffice || "",
      permPostCode: student.permanentAddress?.postCode || "",
      permPoliceStation: student.permanentAddress?.policeStation || "",
      permDistrict: student.permanentAddress?.district || "",
      guardianName: student.guardianInfo?.name || "",
      guardianRelation: student.guardianInfo?.relation || "",
      guardianMobile: student.guardianInfo?.mobile || "",
      guardianVillage: student.guardianInfo?.address || "",
      formerInstitution: "",
      formerVillage: "",
      birthCertificate: student.documents?.birthCertificate || false,
      transferCertificate: student.documents?.transferCertificate || false,
      characterCertificate: student.documents?.characterCertificate || false,
      markSheet: student.documents?.markSheet || false,
      photographs: student.documents?.photographs || false,
      termsAccepted: false,
      studentDepartment: student.studentDepartment || "hifz",
      rollNumber: student.studentClassRoll || "",
      section: student.section?.[0] || "",
      group: student.batch || "",
      optionalSubject: "",
      shift: "",
      fees: [
        {
          feeType: [],
          className: formattedClassName,
          feeAmount: "",
          paidAmount: "",
          monthlyAmount: "",
          yearlyAmount: "",
          discountType: "flat",
          discountValue: "0",
          discountReason: "",
          waiverType: "flat",
          waiverValue: "0",
          waiverReason: "",
          calculatedDiscount: "0",
          calculatedWaiver: "0",
          dueAmount: "",
          paymentStatus: "unpaid",
        },
      ],
      admissionFee: student.admissionFee || 0,
      monthlyFee: student.monthlyFee || 0,
    };
    Object.keys(formValues).forEach((key) => {
      setValue(key, formValues[key]);
    });

    toast.success(`Form populated with student data for ${student.name}.`);
  };

  const handleStudentIdSelection = (value: any) => {
    if (value && value.data) {
      setSelectedStudent(value.data);
      populateFormWithStudentData(value.data);
      setValue("studentNameSelect", {
        value: value.value,
        label: value.data.name,
        data: value.data,
      });
    } else {
      setSelectedStudent(null);
      setValue("studentNameSelect", null);
    }
  };

  const handleStudentNameSelection = (value: any) => {
    if (value && value.data) {
      setSelectedStudent(value.data);
      populateFormWithStudentData(value.data);
      setValue("studentIdSelect", {
        value: value.value,
        label: value.data.studentId,
        data: value.data,
      });
    } else {
      setSelectedStudent(null);
      setValue("studentIdSelect", null);
    }
  };

  useEffect(() => {
    const watchedStudentId = watch("studentIdSelect");
    const watchedStudentName = watch("studentNameSelect");

    if (
      watchedStudentId &&
      watchedStudentId.data &&
      (!selectedStudent || selectedStudent._id !== watchedStudentId.data._id)
    ) {
      handleStudentIdSelection(watchedStudentId);
    }

    if (
      watchedStudentName &&
      watchedStudentName.data &&
      (!selectedStudent || selectedStudent._id !== watchedStudentName.data._id)
    ) {
      handleStudentNameSelection(watchedStudentName);
    }
  }, [watch("studentIdSelect"), watch("studentNameSelect")]);

  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: 4,
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.02
        )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CraftIntAutoCompleteWithIcon
              name="studentIdSelect"
              label="Select by Student ID"
              placeholder="Choose Student ID"
              options={studentIdOptions}
              fullWidth
              icon={<Person color="primary" />}
              onChange={(event: any, value: any) => {
                handleStudentIdSelection(value);
              }}
              multiple={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftIntAutoCompleteWithIcon
              name="studentNameSelect"
              label="Select by Student Name"
              placeholder="Choose Student Name"
              options={studentNameOptions}
              fullWidth
              icon={<Person color="primary" />}
              onChange={(event: any, value: any) => {
                handleStudentNameSelection(value);
              }}
              multiple={false}
            />
          </Grid>
        </Grid>
        {selectedStudent && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: alpha(theme.palette.info.main, 0.1),
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={selectedStudent.studentPhoto}
                sx={{ width: 56, height: 56, mr: 2 }}
              >
                <AccountCircle />
              </Avatar>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {selectedStudent.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {selectedStudent.studentId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Class: {selectedStudent.className?.[0]?.className || "N/A"}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const transformEnrollmentDataToForm = (
  enrollmentData: any,
  classOptions: any[],
  feeCategoryOptions: any[]
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
            value: classId,
            label: classNameValue,
          };
        }

        return matchedClass;
      });
    } else {
      const classId = classData._id || classData;
      const classNameValue = classData.className || classData;

      // First try to match by ID
      let matchedClass = classOptions?.find(
        (option: any) => option.value === classId
      );

      // If not found by ID, try to match by name
      if (!matchedClass) {
        matchedClass = classOptions?.find(
          (option: any) => option.label === classNameValue
        );
      }

      // If still not found, create a new option
      if (!matchedClass) {
        matchedClass = {
          value: classId,
          label: classNameValue,
        };
      }

      return [matchedClass];
    }
  };

  const formatFeeForForm = (fees: any[], classData: any) => {
    if (!fees || !Array.isArray(fees) || fees.length === 0) {
      return [
        {
          feeType: [],
          className: formatClassForForm(classData),
          feeAmount: "",
          paidAmount: "",
          monthlyAmount: "",
          yearlyAmount: "",
          discountType: "flat",
          discountValue: "0",
          discountReason: "",
          waiverType: "flat",
          waiverValue: "0",
          waiverReason: "",
          calculatedDiscount: "0",
          calculatedWaiver: "0",
          dueAmount: "",
          paymentStatus: "unpaid",
        },
      ];
    }

    return fees.map((fee: any) => {
      const matchedFeeType = feeCategoryOptions?.find(
        (option: any) =>
          option.value === fee.feeType || option.label === fee.feeType
      );

      const feeAmount = fee.amount || fee.feeAmount || 0;
      const paidAmount = fee.paidAmount || 0;
      const discountAmount = fee.discount || 0;
      const waiverAmount = fee.waiver || 0;
      const dueAmount = Math.max(
        0,
        feeAmount - paidAmount - discountAmount - waiverAmount
      );

      // Determine discount type (percentage or flat)
      const discountType = fee.discountType || "flat";
      const discountValue = fee.discountValue || discountAmount.toString();
      const waiverType = fee.waiverType || "flat";
      const waiverValue = fee.waiverValue || waiverAmount.toString();

      return {
        feeType: matchedFeeType
          ? [matchedFeeType]
          : [
            {
              value: fee.feeType,
              label: fee.feeType,
            },
          ],
        className: formatClassForForm(classData),
        feeAmount: feeAmount.toString(),
        paidAmount: paidAmount.toString(),
        monthlyAmount: ((feeAmount || 0) / 12).toFixed(2),
        yearlyAmount: feeAmount.toString(),
        discountType: discountType,
        discountValue: discountValue,
        discountReason: fee.discountReason || "",
        waiverType: waiverType,
        waiverValue: waiverValue,
        waiverReason: fee.waiverReason || "",
        calculatedDiscount: discountAmount.toString(),
        calculatedWaiver: waiverAmount.toString(),
        dueAmount: dueAmount.toString(),
        paymentStatus:
          dueAmount <= 0 ? "paid" : paidAmount > 0 ? "partial" : "unpaid",
      };
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch {
      return null;
    }
  };

  const transformedData = {
    // Student ID field - ADDED
    studentId: data.studentId || data.student?.studentId || "",

    // Student Information (Bangla)
    studentNameBangla: data.nameBangla || data.student?.nameBangla || "",
    studentPhoto: data.studentPhoto || data.student?.studentPhoto || "",
    fatherNameBangla: data.fatherNameBangla || data.student?.fatherName || "",
    motherNameBangla: data.motherNameBangla || data.student?.motherName || "",

    // Personal Information
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

    // Academic Information - Class name preserved from enrollment data
    className: formatClassForForm(data.className),
    studentDepartment: data.studentDepartment || "hifz",
    rollNumber: data.roll || data.student?.studentClassRoll || "",
    section: data.section || data.student?.section?.[0] || "",
    group: data.group || data.student?.batch || "",
    optionalSubject: data.optionalSubject || "",
    shift: data.shift || "",
    admissionType: data.admissionType || "",

    // Parent Information
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

    // Address Information
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

    // Guardian Information
    guardianName:
      data.guardianInfo?.name || data.student?.guardianInfo?.name || "",
    guardianRelation:
      data.guardianInfo?.relation || data.student?.guardianInfo?.relation || "",
    guardianMobile:
      data.guardianInfo?.mobile || data.student?.guardianInfo?.mobile || "",
    guardianVillage:
      data.guardianInfo?.address || data.student?.guardianInfo?.address || "",

    // Previous Education
    formerInstitution: data.previousSchool?.institution || "",
    formerVillage: data.previousSchool?.address || "",

    // Documents - Changed to boolean values
    birthCertificate: data.documents?.birthCertificate || false,
    transferCertificate: data.documents?.transferCertificate || false,
    characterCertificate: data.documents?.characterCertificate || false,
    markSheet: data.documents?.markSheet || false,
    photographs: data.documents?.photographs || false,

    // Terms & Conditions - Changed to boolean value
    termsAccepted: data.termsAccepted || false,

    // Fees - UPDATED WITH PERCENTAGE/FLAT SUPPORT
    fees: formatFeeForForm(data.fees, data.className),
    admissionFee: data.admissionFee || data.student?.admissionFee || 0,
    monthlyFee: data.monthlyFee || data.student?.monthlyFee || 0,

    // Student Selector
    studentIdSelect: null,
    studentNameSelect: null,
  };

  return transformedData;
};

// Step 1: Student Information Component (without animations)
const StudentInformationStep = () => {
  const theme = useTheme();
  const { watch } = useFormContext();

  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: 4,
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.02
        )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
      }}
    >
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          p: 3,
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccountCircle sx={{ fontSize: 32, mr: 2 }} />
          <Typography variant="h5" fontWeight="bold">
            Student Information
          </Typography>
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
              items={["Day Care", "Residential", "Non Residential", 'Residential No Meal', 'Non Residential One Meal']}
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
        </Grid>
      </CardContent>
    </Card>
  );
};

// Step 2: Academic Information Component (separate from fee information)
const AcademicStep = ({ classOptions }: any) => {
  const theme = useTheme();
  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: 4,
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.02
        )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
      }}
    >
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
          p: 3,
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SchoolIcon sx={{ fontSize: 32, mr: 2 }} />
          <Typography variant="h5" fontWeight="bold">
            Academic Information
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CraftIntAutoCompleteWithIcon
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
              fullWidth
              label="Roll Number"
              name="rollNumber"
              placeholder="Enter Roll No"
              InputProps={{
                startAdornment: (
                  <Class sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftSelectWithIcon
              name="section"
              label="Section"
              items={["A", "B", "C"]}
              adornment={<Group />}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftSelectWithIcon
              name="group"
              label="Group"
              items={["Science", "Commerce", "Arts"]}
              adornment={<School />}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              label="Optional Subject"
              name="optionalSubject"
              placeholder="e.g. Higher Math / ICT"
              InputProps={{
                startAdornment: (
                  <Book sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="shift"
              label="Shift"
              items={["Morning", "Day", "Evening"]}
              adornment={<AccessTime />}
              size="medium"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Step 3: Fee Information Component (separate from academic information)

// Step 4: Parent and Guardian Information Component (without animations)
const ParentGuardianStep = () => {
  const theme = useTheme();
  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: 4,
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.02
        )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
      }}
    >
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
          p: 3,
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FamilyRestroom sx={{ fontSize: 32, mr: 2 }} />
          <Typography variant="h5" fontWeight="bold">
            Parent & Guardian Information
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Father's Information
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
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
              fullWidth
              label="Mobile"
              name="fatherMobile"
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
              fullWidth
              label="Profession"
              name="fatherProfession"
              placeholder="Occupation"
              InputProps={{
                startAdornment: (
                  <Work sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="Monthly Income"
              name="fatherIncome"
              placeholder="BDT"
              type="number"
              InputProps={{
                startAdornment: (
                  <Work sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Mother's Information
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
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
              fullWidth
              label="Mobile"
              name="motherMobile"
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
              fullWidth
              label="Profession"
              name="motherProfession"
              placeholder="Occupation"
              InputProps={{
                startAdornment: (
                  <Work sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="Monthly Income"
              name="motherIncome"
              placeholder="BDT"
              type="number"
              InputProps={{
                startAdornment: (
                  <Work sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom>
          Guardian Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
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
              fullWidth
              label="Mobile"
              name="guardianMobile"
              placeholder="01XXXXXXXXX"
              InputProps={{
                startAdornment: (
                  <Phone sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <CraftInputWithIcon
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
      </CardContent>
    </Card>
  );
};

// Document Checkbox Component
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

// Step 5: Address, Documents, and Terms Component (updated with switches/checkboxes)
const AddressDocumentsStep = () => {
  const theme = useTheme();
  const { watch, setValue } = useFormContext();
  const termsAccepted = watch("termsAccepted") || false;

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("termsAccepted", event.target.checked);
  };

  return (
    <>
      {/* Address Information */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 4,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.02
          )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
            p: 3,
            color: "white",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Home sx={{ fontSize: 32, mr: 2 }} />
            <Typography variant="h5" fontWeight="bold">
              Address Information
            </Typography>
          </Box>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Present Address
          </Typography>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={4}>
              <CraftInputWithIcon
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
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Permanent Address
          </Typography>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={4}>
              <CraftInputWithIcon
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
          </Grid>
        </CardContent>
      </Card>

      {/* Previous Education */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 4,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.02
          )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
            p: 3,
            color: "white",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <School sx={{ fontSize: 32, mr: 2 }} />
            <Typography variant="h5" fontWeight="bold">
              Previous Education
            </Typography>
          </Box>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CraftInputWithIcon
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
          </Grid>
        </CardContent>
      </Card>

      {/* Documents - Updated with checkboxes */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 4,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.02
          )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
            p: 3,
            color: "white",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DocumentIcon sx={{ fontSize: 32, mr: 2 }} />
            <Typography variant="h5" fontWeight="bold">
              Documents
            </Typography>
          </Box>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Please check all documents that are provided:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                }}
              >
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
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                }}
              >
                <DocumentCheckbox name="markSheet" label="Mark Sheet" />
                <DocumentCheckbox name="photographs" label="Photographs" />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Terms & Conditions - Updated with switch */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 4,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.02
          )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
            p: 3,
            color: "white",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Check sx={{ fontSize: 32, mr: 2 }} />
            <Typography variant="h5" fontWeight="bold">
              Terms & Conditions
            </Typography>
          </Box>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              p: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.background.paper, 0.5),
            }}
          >
            <Typography variant="body1" gutterBottom>
              By enrolling at Craft International Institute, you agree to the
              following terms and conditions:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 3 }}>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                All provided information is accurate and complete
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Student will abide by all school rules and regulations
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Fees must be paid on time as per the school's fee schedule
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                The school reserves the right to take disciplinary action for
                any violation of rules
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                  name="termsAccepted"
                  color="primary"
                />
              }
              label={
                <Typography variant="body1" fontWeight="bold">
                  I accept the terms and conditions
                </Typography>
              }
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
const FeeStep = ({
  classOptions,
  feeCategoryOptions,
  feeCategoryData,
}: any) => {
  const theme = useTheme();
  const { watch } = useFormContext();
  const mainClassName = watch("className");

  return (
    <>
      <Alert
        severity="info"
        sx={{
          mb: 3,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.info.main, 0.1),
          color: theme.palette.info.dark,
          "& .MuiAlert-icon": {
            color: theme.palette.info.main,
          },
        }}
      >
        Fee types and amounts are automatically populated based on the class
        selected in the Academic Information step.
      </Alert>

      <DynamicFeeFields
        classOptions={classOptions}
        feeCategoryOptions={feeCategoryOptions}
        feeCategoryData={feeCategoryData}
      />
    </>
  );
};

// Main EnrollmentForm Component with Stepper (without animations)
const EnrollmentForm = () => {
  const theme = useTheme();
  const limit = 100;
  const [page] = useState(0);
  const [searchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [open, setOpen] = useState(false);

  const { classOptions, feeCategoryOptions, feeCategoryData } =
    useAcademicOption();

  const [createEnrollment] = useCreateEnrollmentMutation();
  const [updateEnrollment] = useUpdateEnrollmentMutation();
  const { data: singleEnrollment, isLoading: enrollmentLoading } =
    useGetSingleEnrollmentQuery(id ? { id } : undefined, {
      skip: !id,
    });

  const { data: studentData, isLoading: studentLoading } =
    useGetAllStudentsQuery({
      limit,
      page: page + 1,
      searchTerm,
    });

  const [submitting, setSubmitting] = useState(false);
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const [formKey, setFormKey] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // Steps for the stepper with icons
  const steps = [
    {
      label: "Student Information",
      icon: <AccountCircle />,
      description: "Personal details",
    },
    {
      label: "Academic Information",
      icon: <SchoolIcon />,
      description: "Academic details",
    },

    {
      label: "Parent & Guardian",
      icon: <FamilyRestroom />,
      description: "Family information",
    },
    {
      label: "Address & Documents",
      icon: <Home />,
      description: "Address and documents",
    },
    {
      label: "Fee Information",
      icon: <Payment />,
      description: "Fee details",
    },
  ];

  // Transform API data to form format when data loads
  useEffect(() => {
    if (
      id &&
      singleEnrollment &&
      classOptions.length > 0 &&
      feeCategoryOptions.length > 0
    ) {
      const transformedData = transformEnrollmentDataToForm(
        singleEnrollment,
        classOptions,
        feeCategoryOptions
      );

      if (transformedData) {
        setDefaultValues(transformedData);
        setFormKey((prev) => prev + 1);
      }
    } else if (!id) {
      // Set empty default values for new enrollment - UPDATED WITH PERCENTAGE/FLAT SUPPORT
      setDefaultValues({
        // ADD studentId field
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
            feeType: [],
            className: [],
            feeAmount: "",
            paidAmount: "",
            monthlyAmount: "",
            yearlyAmount: "",
            discountType: "flat", // NEW: Discount type
            discountValue: "0", // NEW: Discount value
            discountReason: "", // NEW: Reason for discount
            waiverType: "flat", // NEW: Waiver type
            waiverValue: "0", // NEW: Waiver value
            waiverReason: "", // NEW: Reason for waiver
            calculatedDiscount: "0", // NEW: Calculated discount amount
            calculatedWaiver: "0", // NEW: Calculated waiver amount
            dueAmount: "",
            paymentStatus: "unpaid",
          },
        ],
        admissionFee: 0,
        monthlyFee: 0,
        studentIdSelect: null,
        studentNameSelect: null,
      });
      setFormKey((prev) => prev + 1);
    }
  }, [id, singleEnrollment, classOptions, feeCategoryOptions]);

  // Handle Submit Function - UPDATED WITH PERCENTAGE/FLAT SUPPORT
  const handleSubmit = async (data: any) => {
    try {
      setSubmitting(true);

      const { studentIdSelect, studentNameSelect, ...submitData } = data;

      // Class name processing
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

      // Fees processing with percentage/flat discount/waiver
      const transformedFees = Array.isArray(submitData.fees)
        ? submitData.fees
          .filter(
            (fee: any) =>
              fee.feeType &&
              fee.feeType.length > 0 &&
              fee.className &&
              fee.className.length > 0 &&
              fee.feeAmount && // Ensure fee amount exists
              Number(fee.feeAmount) > 0 // Ensure fee amount is greater than 0
          )
          .map((fee: any) => {
            // Extract only the feeType part from the label (before " - ")
            const feeTypeLabel =
              fee.feeType[0]?.label || fee.feeType[0] || "";
            const feeType = feeTypeLabel.split(" - ")[0];

            const className =
              fee.className[0]?.label || fee.className[0] || "";
            const feeAmount = Number(fee.feeAmount) || 0;
            const paidAmount = Number(fee.paidAmount) || 0;

            // Calculate discount amount based on type
            let discountAmount = 0;
            if (fee.discountType === "percentage") {
              discountAmount = Math.min(
                (feeAmount * Number(fee.discountValue || 0)) / 100,
                feeAmount
              );
            } else {
              discountAmount = Math.min(
                Number(fee.discountValue || 0),
                feeAmount
              );
            }

            // Calculate waiver amount based on type
            let waiverAmount = 0;
            if (fee.waiverType === "percentage") {
              waiverAmount = Math.min(
                (feeAmount * Number(fee.waiverValue || 0)) / 100,
                feeAmount
              );
            } else {
              waiverAmount = Math.min(
                Number(fee.waiverValue || 0),
                feeAmount
              );
            }

            // Validate that discount + waiver doesn't exceed fee amount
            if (discountAmount + waiverAmount > feeAmount) {
              throw new Error(
                `Total adjustments (${discountAmount + waiverAmount}) cannot exceed fee amount (${feeAmount}) for ${feeType}`
              );
            }

            return {
              feeType: feeType, // Now only the feeType part, not including the amount
              className: className,
              feeAmount: feeAmount,
              paidAmount: paidAmount,
              discount: discountAmount, // Final calculated discount amount
              discountType: fee.discountType || "flat", // NEW: Discount type
              discountValue: fee.discountValue || "0", // NEW: Discount value
              discountReason: fee.discountReason || "", // NEW: Reason for discount
              waiver: waiverAmount, // Final calculated waiver amount
              waiverType: fee.waiverType || "flat", // NEW: Waiver type
              waiverValue: fee.waiverValue || "0", // NEW: Waiver value
              waiverReason: fee.waiverReason || "", // NEW: Reason for waiver
              monthlyAmount: fee.monthlyAmount || "",
              isYearlyFee: fee.isYearlyFee || false,
            };
          })
        : [];

      // Make sure we have at least one valid fee
      if (transformedFees.length === 0) {
        toast.error("At least one valid fee entry is required");
        setSubmitting(false);
        return;
      }

      // Boolean transformation - Updated for checkboxes/switches
      const transformBoolean = (value: any) => {
        return Boolean(value);
      };

      // Final submission data
      const finalSubmitData: any = {
        // Student Information
        studentId: submitData.studentId || "", // ADDED: studentId field
        studentName: submitData.studentName || "",
        nameBangla: submitData.studentNameBangla || "",
        studentPhoto: submitData.studentPhoto || "",
        mobileNo: submitData.mobileNo || "",
        rollNumber: submitData.rollNumber || "",
        gender: submitData.gender || "",
        birthDate: submitData.dateOfBirth
          ? new Date(submitData.dateOfBirth).toISOString()
          : "",
        birthRegistrationNo: submitData.nidBirth || "",
        bloodGroup: submitData.bloodGroup || "",
        nationality: submitData.nationality || "Bangladeshi",

        // Academic Information
        className: classNameArray,
        section: submitData.section || "",
        roll: submitData.rollNumber || "",
        session: submitData.session || new Date().getFullYear().toString(),
        batch: submitData.group || "",
        studentType: submitData.category || "residential",
        studentDepartment: submitData.studentDepartment || "hifz",

        // Parent Information
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

        // Address Information
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

        // Guardian Information
        guardianInfo: {
          name: submitData.guardianName || "",
          relation: submitData.guardianRelation || "",
          mobile: submitData.guardianMobile || "",
          address: submitData.guardianVillage || "",
        },

        // Previous Education
        previousSchool: {
          institution: submitData.formerInstitution || "",
          address: submitData.formerVillage || "",
        },

        // Documents - Updated for boolean values
        documents: {
          birthCertificate: transformBoolean(submitData.birthCertificate),
          transferCertificate: transformBoolean(submitData.transferCertificate),
          characterCertificate: transformBoolean(
            submitData.characterCertificate
          ),
          markSheet: transformBoolean(submitData.markSheet),
          photographs: transformBoolean(submitData.photographs),
        },

        // Fees - INCLUDES PERCENTAGE/FLAT DISCOUNT/WAIVER
        fees: transformedFees,

        // Terms & Conditions - Updated for boolean value
        termsAccepted: transformBoolean(submitData.termsAccepted),

        // Additional Information
        admissionFee: Number(submitData.admissionFee) || 0,
        monthlyFee: Number(submitData.monthlyFee) || 0,
      };

      // Clean up empty objects
      Object.keys(finalSubmitData).forEach((key) => {
        if (finalSubmitData[key] && typeof finalSubmitData[key] === "object") {
          const obj = finalSubmitData[key];
          const isEmpty = Object.keys(obj).every(
            (subKey) =>
              obj[subKey] === undefined ||
              obj[subKey] === null ||
              obj[subKey] === ""
          );
          if (isEmpty) {
            delete finalSubmitData[key];
          }
        }
      });

      let res;
      if (id) {
        res = await updateEnrollment({ id, data: finalSubmitData }).unwrap();
      } else {
        res = await createEnrollment(finalSubmitData).unwrap();
      }

      if (res?.success) {
        toast?.success(res?.message || "Student enrolled successfully");
        setTimeout(() => {
          router.push("/dashboard/enrollments/list");
        }, 2000);
      }
    } catch (err: any) {
      console.error("Submission error:", err);

      let errorMessage = "Failed to enroll student!";

      if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      }

      if (
        errorMessage.includes("jwt") ||
        errorMessage.includes("auth") ||
        errorMessage.includes("token")
      ) {
        toast.error("Authentication failed. Please login again.");
        router.push("/login");
      } else if (errorMessage.includes("duplicate")) {
        toast.error("Student already exists with same mobile number or name");
      } else if (errorMessage.includes("cannot exceed fee amount")) {
        toast.error(errorMessage);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Handle next step
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Handle back step
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Show loading state
  if ((id && enrollmentLoading) || !defaultValues) {
    return <LoadingState />;
  }

  return (
    <Box sx={{ bgcolor: alpha(theme.palette.background.default, 0.5) }}>
      <CraftForm
        key={formKey}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: "white",
              position: "relative",
              overflow: "hidden",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              position="relative"
              zIndex={1}
            >
              <Box display="flex" alignItems="center">
                <Avatar
                  sx={{
                    bgcolor: "white",

                    width: 80,
                    height: 80,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  }}
                >
                  <School
                    sx={{ color: theme.palette.primary.main, fontSize: 40 }}
                  />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
                    Craft International Institute
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    226, Narayanhat Sadar, Narayanganj
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
          {/* Custom Stepper */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.background.paper,
                0.9
              )} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                {steps.map((step, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "20%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        bgcolor:
                          index <= activeStep
                            ? theme.palette.primary.main
                            : alpha(theme.palette.text.secondary, 0.2),
                        color: index <= activeStep ? "white" : "text.secondary",
                        mb: 1,
                        boxShadow:
                          index === activeStep
                            ? "0 4px 10px rgba(0,0,0,0.2)"
                            : "none",
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography
                      variant="body2"
                      align="center"
                      sx={{
                        fontWeight: index === activeStep ? "bold" : "normal",
                        color:
                          index <= activeStep
                            ? theme.palette.primary.main
                            : "text.secondary",
                      }}
                    >
                      {step.label}
                    </Typography>
                    <Typography
                      variant="caption"
                      align="center"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <LinearProgress
                variant="determinate"
                value={(activeStep / (steps.length - 1)) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  },
                }}
              />
            </Box>
          </Paper>
          <StudentSelector
            studentData={studentData}
            classOptions={classOptions}
          />

          {/* Step Content */}
          <Box>
            {activeStep === 0 && <StudentInformationStep />}
            {activeStep === 1 && <AcademicStep classOptions={classOptions} />}
            {activeStep === 2 && <ParentGuardianStep />}
            {activeStep === 3 && <AddressDocumentsStep />}
            {activeStep === 4 && (
              <FeeStep
                classOptions={classOptions}
                feeCategoryOptions={feeCategoryOptions}
                feeCategoryData={feeCategoryData}
              />
            )}
          </Box>
          {/* Navigation Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
              mb: 4,
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBack />}
              variant="outlined"
              type="button"
              sx={{
                borderRadius: 30,
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                "&:hover": {
                  boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                },
              }}
            >
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitting}
                  endIcon={
                    submitting ? <CircularProgress size={20} /> : <Save />
                  }
                  sx={{
                    borderRadius: 30,
                    px: 5,
                    py: 1.5,
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                      background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
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
                  endIcon={<ArrowForward />}
                  type="button"
                  sx={{
                    borderRadius: 30,
                    px: 4,
                    py: 1.5,
                    fontWeight: "bold",
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                      background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                    },
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </CraftForm>
    </Box>
  );
};

export default EnrollmentForm;
