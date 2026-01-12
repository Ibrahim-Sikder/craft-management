/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon";
import CraftForm from "@/components/Forms/Form";
import CraftInputWithIcon from "@/components/Forms/inputWithIcon";
import CraftModal from "@/components/Shared/Modal";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import {
  Class,
  Money,
  CalendarMonth,
  Percent,
  AttachMoney,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import { FieldValues } from "react-hook-form";
import { useCreateFeeMutation } from "@/redux/api/feesApi";
import toast from "react-hot-toast";

interface AddFeeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  student: any;
  onAddFee?: (feeData: any) => void;
  refetch?: () => void;
}

interface FeeTypeOption {
  label: string;
  value: string;
  feeType: string;
  amount: number;
  isMonthly?: boolean;
  isYearly?: boolean;
  isRecurring?: boolean;
  feeCategoryId: string;
}

const AddFeeModal = ({
  open,
  setOpen,
  student,
  onAddFee,
  refetch,
}: AddFeeModalProps) => {
  const [createFee, { isLoading }] = useCreateFeeMutation();
  const { classOptions, feeCategoryData } = useAcademicOption();
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedFeeType, setSelectedFeeType] = useState<string>("");
  const [selectedFeeTypeObj, setSelectedFeeTypeObj] =
    useState<FeeTypeOption | null>(null);
  const [feeTypeOptions, setFeeTypeOptions] = useState<FeeTypeOption[]>([]);
  const [discountType, setDiscountType] = useState<"flat" | "percentage">(
    "flat"
  );
  const [waiverType, setWaiverType] = useState<"flat" | "percentage">("flat");
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [waiverValue, setWaiverValue] = useState<number>(0);
  const [calculatedDiscount, setCalculatedDiscount] = useState<number>(0);
  const [calculatedWaiver, setCalculatedWaiver] = useState<number>(0);

  // Memoize class options to prevent re-renders
  const formattedClassOptions = useMemo(() => {
    return classOptions.map((option: any) => ({
      ...option,
      label: option.label || option.name || "Unnamed Class",
      value: option.value || option.id || "",
    }));
  }, [classOptions]);

  // Get fee types filtered by class - UPDATED to match your feeCategory data structure
  const getFeeTypesByClass = (className: string): FeeTypeOption[] => {
    if (!className || !feeCategoryData?.data?.data) return [];

    return feeCategoryData.data.data
      .filter((fee: any) => {
        // Check if fee class matches the selected class
        const feeClass = fee.class || "";

        // Convert both to lowercase for case-insensitive comparison
        const feeClassLower = feeClass.toLowerCase();
        const classNameLower = className.toLowerCase();

        return feeClassLower === classNameLower;
      })
      .map((fee: any) => ({
        label: `${fee.feeType} - ৳${fee.feeAmount}`, // Format: "feeType - ৳amount"
        value: fee._id,
        feeType: fee.feeType, // Store the feeType separately
        amount: fee.feeAmount || 0,
        feeCategoryId: fee._id,
        isMonthly:
          fee.isMonthly ||
          fee.feeType?.toLowerCase().includes("monthly") ||
          false,
        isYearly:
          fee.isYearly ||
          fee.feeType?.toLowerCase().includes("yearly") ||
          false,
        isRecurring: fee.isRecurring || false,
      }));
  };

  // Initialize with student's current class
  useEffect(() => {
    if (student?.className?.[0]?.className) {
      const className = student.className[0].className;
      setSelectedClass(className);

      // Load fee types for this class
      const feeTypes = getFeeTypesByClass(className);
      setFeeTypeOptions(feeTypes);

      // If no specific fee types for this class, use all fee types
      if (feeTypes.length === 0 && feeCategoryData?.data?.data) {
        const allFeeTypes = feeCategoryData.data.data.map((fee: any) => ({
          label: `${fee.feeType} - ৳${fee.feeAmount}`,
          value: fee._id,
          feeType: fee.feeType,
          amount: fee.feeAmount || 0,
          feeCategoryId: fee._id,
          isMonthly:
            fee.isMonthly ||
            fee.feeType?.toLowerCase().includes("monthly") ||
            false,
          isYearly:
            fee.isYearly ||
            fee.feeType?.toLowerCase().includes("yearly") ||
            false,
          isRecurring: fee.isRecurring || false,
        }));
        setFeeTypeOptions(allFeeTypes);
      }
    }
  }, [student, feeCategoryData]);

  // Handle class change
  const handleClassChange = (event: React.SyntheticEvent, value: any) => {
    let className = "";

    // Handle different value formats
    if (typeof value === "string") {
      className = value;
    } else if (value && typeof value === "object") {
      // If it's an object from the dropdown
      className = value.label || value.name || value.value || "";
    }

    setSelectedClass(className);

    // Load fee types for this class
    const feeTypes = getFeeTypesByClass(className);
    setFeeTypeOptions(feeTypes);

    // If no specific fee types for this class, use all fee types
    if (feeTypes.length === 0 && feeCategoryData?.data?.data) {
      const allFeeTypes = feeCategoryData.data.data.map((fee: any) => ({
        label: `${fee.feeType} - ৳${fee.feeAmount}`,
        value: fee._id,
        feeType: fee.feeType,
        amount: fee.feeAmount || 0,
        feeCategoryId: fee._id,
        isMonthly:
          fee.isMonthly ||
          fee.feeType?.toLowerCase().includes("monthly") ||
          false,
        isYearly:
          fee.isYearly ||
          fee.feeType?.toLowerCase().includes("yearly") ||
          false,
        isRecurring: fee.isRecurring || false,
      }));
      setFeeTypeOptions(allFeeTypes);
    }

    // Reset fee type when class changes
    setSelectedFeeType("");
    setSelectedFeeTypeObj(null);
    setFeeAmount(0);
  };

  // Handle fee type selection
  const handleFeeTypeChange = (value: string) => {
    setSelectedFeeType(value);
    const feeObj = feeTypeOptions.find((opt) => opt.value === value) || null;
    setSelectedFeeTypeObj(feeObj);
    // Set default amount from fee type
    if (feeObj?.amount) {
      setFeeAmount(feeObj.amount);
    } else {
      setFeeAmount(0);
    }
  };

  // Calculate discount and waiver
  useEffect(() => {
    let discount = 0;
    let waiver = 0;

    if (discountType === "percentage") {
      discount = (feeAmount * discountValue) / 100;
    } else {
      discount = discountValue;
    }

    if (waiverType === "percentage") {
      waiver = (feeAmount * waiverValue) / 100;
    } else {
      waiver = waiverValue;
    }

    // Ensure discount and waiver don't exceed fee amount
    discount = Math.min(discount, feeAmount);
    waiver = Math.min(waiver, feeAmount - discount);

    // Ensure discount and waiver are not negative
    discount = Math.max(0, discount);
    waiver = Math.max(0, waiver);

    setCalculatedDiscount(parseFloat(discount.toFixed(2)));
    setCalculatedWaiver(parseFloat(waiver.toFixed(2)));
  }, [discountType, discountValue, waiverType, waiverValue, feeAmount]);

  // Get current academic year
  const getCurrentAcademicYear = () => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}`;
  };

  // Get months for selection
  const getMonths = () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Create options for current and next year
    const options = [];

    for (let year = currentYear - 1; year <= nextYear; year++) {
      for (const month of months) {
        options.push({
          label: `${month}-${year}`,
          value: `${month}-${year}`,
        });
      }
    }

    return options;
  };

  const handleSubmit = async (data: FieldValues) => {
    if (!student?._id) {
      toast.error("Student information not found");
      return;
    }

    if (!selectedClass) {
      toast.error("Please select a class");
      return;
    }

    if (!selectedFeeType) {
      toast.error("Please select a fee type");
      return;
    }

    if (feeAmount <= 0) {
      toast.error("Fee amount must be greater than 0");
      return;
    }

    // Validate adjustments
    if (calculatedDiscount + calculatedWaiver > feeAmount) {
      toast.error("Total adjustments cannot exceed fee amount");
      return;
    }

    try {
      const feeData = {
        studentId: student._id,
        class: selectedClass,
        month: data.month,
        amount: feeAmount,
        feeType: selectedFeeTypeObj?.feeType || "Other", // Use feeType string
        academicYear: data.academicYear || getCurrentAcademicYear(),
        discount: calculatedDiscount,
        discountType: discountType,
        waiver: calculatedWaiver,
        waiverType: waiverType,
        enrollmentId: student.enrollment?._id || undefined,
        isMonthly: selectedFeeTypeObj?.isMonthly || false,
        isYearly: selectedFeeTypeObj?.isYearly || false,
        isRecurring: selectedFeeTypeObj?.isRecurring || false,
        reason: data.reason || "",
        note: data.note || "",
        feeCategoryId: selectedFeeTypeObj?.feeCategoryId, // Store fee category ID
      };

      const result = await createFee(feeData).unwrap();

      toast.success(`Fee added successfully!`);

      if (onAddFee) {
        onAddFee(result.data);
      }

      if (refetch) {
        refetch();
      }

      setOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to add fee. Please try again."
      );
      console.error("Fee creation error:", error);
    }
  };

  const resetForm = () => {
    setSelectedClass(student?.className?.[0]?.className || "");
    setSelectedFeeType("");
    setSelectedFeeTypeObj(null);
    setFeeAmount(0);
    setDiscountType("flat");
    setWaiverType("flat");
    setDiscountValue(0);
    setWaiverValue(0);
    setCalculatedDiscount(0);
    setCalculatedWaiver(0);

    // Reset fee types based on initial class
    if (student?.className?.[0]?.className) {
      const feeTypes = getFeeTypesByClass(student.className[0].className);
      setFeeTypeOptions(feeTypes);
    }
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  // Calculate net amount
  const netAmount = Math.max(
    0,
    feeAmount - calculatedDiscount - calculatedWaiver
  );

  // Find the current class option object for initial value
  const getInitialClassValue = () => {
    if (student?.className?.[0]?.className) {
      const className = student.className[0].className;
      return (
        formattedClassOptions.find(
          (option: any) =>
            option.label === className ||
            option.name === className ||
            option.value === className
        ) || ""
      );
    }
    return "";
  };

  return (
    <CraftModal open={open} setOpen={handleClose} title="Add New Fee" size="lg">
      <CraftForm
        onSubmit={handleSubmit}
        defaultValues={{
          academicYear: getCurrentAcademicYear(),
          month: `${new Date().toLocaleString("default", { month: "long" })}-${new Date().getFullYear()}`,
          className: getInitialClassValue(),
        }}
      >
        <Grid container spacing={3}>
          {/* Student Info */}
          <Grid item xs={12}>
            <Alert severity="info" icon={<Class />}>
              <Typography variant="body2">
                <strong>Student:</strong> {student?.name} ({student?.studentId})
                <br />
                <strong>Current Class:</strong>{" "}
                {student?.className?.[0]?.className || "N/A"}
              </Typography>
            </Alert>
          </Grid>

          {/* Class Selection */}
          <Grid item xs={12} md={6}>
            <CraftIntAutoCompleteWithIcon
              name="className"
              label="Class"
              placeholder="Select Class"
              options={formattedClassOptions}
              fullWidth
              required
              icon={<Class color="primary" />}
              multiple={false}
              freeSolo={false}
              onChange={handleClassChange}
              defaultValue={getInitialClassValue()}
            />
          </Grid>

          {/* Fee Type Selection */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Fee Type</InputLabel>
              <Select
                value={selectedFeeType}
                onChange={(e) => handleFeeTypeChange(e.target.value)}
                label="Fee Type"
                disabled={!selectedClass}
                startAdornment={
                  <Money sx={{ mr: 1, color: "text.secondary" }} />
                }
              >
                <MenuItem value="" disabled>
                  Select Fee Type
                </MenuItem>
                {feeTypeOptions.map((fee) => (
                  <MenuItem key={fee.value} value={fee.value}>
                    {fee.label} {/* Display "feeType - ৳amount" format */}
                  </MenuItem>
                ))}
                {feeTypeOptions.length === 0 && (
                  <MenuItem value="" disabled>
                    {selectedClass
                      ? "No fee types found for this class"
                      : "Select a class first"}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* Month Selection */}
          <Grid item xs={12} md={6}>
            <CraftIntAutoCompleteWithIcon
              name="month"
              label="Month"
              placeholder="Select Month"
              options={getMonths()}
              fullWidth
              required
              icon={<CalendarMonth color="primary" />}
              multiple={false}
              freeSolo={false}
            />
          </Grid>

          {/* Academic Year */}
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              name="academicYear"
              label="Academic Year"
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>

          {/* Fee Amount */}
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              name="feeAmount"
              label="Fee Amount"
              fullWidth
              size="small"
              type="number"
              value={feeAmount}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setFeeAmount(isNaN(value) ? 0 : Math.max(0, value));
              }}
              required
              InputProps={{
                startAdornment: (
                  <Money sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>

          {/* Discount Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{ border: 1, borderColor: "divider", borderRadius: 1, p: 2 }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Discount
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Discount Type</FormLabel>
                    <RadioGroup
                      row
                      value={discountType}
                      onChange={(e) =>
                        setDiscountType(e.target.value as "flat" | "percentage")
                      }
                    >
                      <FormControlLabel
                        value="flat"
                        control={<Radio size="small" />}
                        label={
                          <Box display="flex" alignItems="center">
                            <AttachMoney fontSize="small" sx={{ mr: 0.5 }} />
                            Flat
                          </Box>
                        }
                      />
                      <FormControlLabel
                        value="percentage"
                        control={<Radio size="small" />}
                        label={
                          <Box display="flex" alignItems="center">
                            <Percent fontSize="small" sx={{ mr: 0.5 }} />
                            Percentage
                          </Box>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <CraftInputWithIcon
                    name="discountValue"
                    label={
                      discountType === "percentage"
                        ? "Discount %"
                        : "Discount Amount"
                    }
                    fullWidth
                    size="small"
                    type="number"
                    value={discountValue}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setDiscountValue(isNaN(value) ? 0 : Math.max(0, value));
                    }}
                    InputProps={{
                      startAdornment:
                        discountType === "percentage" ? (
                          <Percent sx={{ color: "text.secondary", mr: 1 }} />
                        ) : (
                          <Money sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="primary">
                    Actual Discount: ৳{calculatedDiscount.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Waiver Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{ border: 1, borderColor: "divider", borderRadius: 1, p: 2 }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Waiver
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Waiver Type</FormLabel>
                    <RadioGroup
                      row
                      value={waiverType}
                      onChange={(e) =>
                        setWaiverType(e.target.value as "flat" | "percentage")
                      }
                    >
                      <FormControlLabel
                        value="flat"
                        control={<Radio size="small" />}
                        label={
                          <Box display="flex" alignItems="center">
                            <AttachMoney fontSize="small" sx={{ mr: 0.5 }} />
                            Flat
                          </Box>
                        }
                      />
                      <FormControlLabel
                        value="percentage"
                        control={<Radio size="small" />}
                        label={
                          <Box display="flex" alignItems="center">
                            <Percent fontSize="small" sx={{ mr: 0.5 }} />
                            Percentage
                          </Box>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <CraftInputWithIcon
                    name="waiverValue"
                    label={
                      waiverType === "percentage" ? "Waiver %" : "Waiver Amount"
                    }
                    fullWidth
                    size="small"
                    type="number"
                    value={waiverValue}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setWaiverValue(isNaN(value) ? 0 : Math.max(0, value));
                    }}
                    InputProps={{
                      startAdornment:
                        waiverType === "percentage" ? (
                          <Percent sx={{ color: "text.secondary", mr: 1 }} />
                        ) : (
                          <Money sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="primary">
                    Actual Waiver: ৳{calculatedWaiver.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Summary Card */}
          <Grid item xs={12}>
            <Box
              sx={{
                border: 1,
                borderColor: "primary.main",
                borderRadius: 1,
                p: 2,
                bgcolor: "primary.50",
              }}
            >
              <Typography variant="h6" gutterBottom color="primary">
                Fee Summary
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body2">Fee Amount:</Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body2" fontWeight="bold">
                    ৳{feeAmount.toLocaleString()}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color="error">
                    Discount:
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body2" color="error" fontWeight="bold">
                    -৳{calculatedDiscount.toLocaleString()}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color="error">
                    Waiver:
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body2" color="error" fontWeight="bold">
                    -৳{calculatedWaiver.toLocaleString()}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Net Amount:
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    ৳{netAmount.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Reason for Fee */}
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              name="reason"
              label="Reason for Fee (Optional)"
              fullWidth
              size="small"
              multiline
              rows={2}
            />
          </Grid>

          {/* Note (Optional) */}
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              name="note"
              label="Note (Optional)"
              fullWidth
              size="small"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={
                isLoading ||
                !selectedClass ||
                !selectedFeeType ||
                feeAmount <= 0
              }
              startIcon={<Money />}
              size="large"
            >
              {isLoading
                ? "Adding Fee..."
                : `Add Fee (৳${netAmount.toLocaleString()})`}
            </Button>
          </Grid>
        </Grid>
      </CraftForm>
    </CraftModal>
  );
};

export default AddFeeModal;
