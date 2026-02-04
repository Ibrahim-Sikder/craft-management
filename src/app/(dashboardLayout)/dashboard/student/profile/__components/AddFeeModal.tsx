/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react";
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon";
import CraftForm from "@/components/Forms/Form";
import CraftInput from "@/components/Forms/inputWithIcon";
import CraftModal from "@/components/Shared/Modal";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import {
  Class,
  Money,
  CalendarMonth,
  Percent,
  AttachMoney,
  Add,
  Delete,
  Description,
  Payment,
  LocalOffer,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  alpha,
  useTheme,
  InputAdornment,
  Paper,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { FieldValues } from "react-hook-form";
import { useCreateFeeMutation } from "@/redux/api/feesApi";
import toast from "react-hot-toast";
import { useFieldArray, useFormContext } from "react-hook-form";

interface AddFeeModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>; // Fixed Type
  student: any;
  onAddFee?: (feeData: any) => void;
  refetch?: () => void;
}

interface FeeItem {
  feeType: string;
  amount: number;
  _id: string;
}

interface FeeCategory {
  _id: string;
  categoryName: string;
  className: string;
  feeItems: FeeItem[];
  createdAt: string;
  updatedAt: string;
}

// Dynamic Fee Fields Component
const DynamicFeeFields = ({
  selectedClass,
  feeCategories,
  studentAdvanceBalance,
}: {
  selectedClass: string;
  feeCategories: FeeCategory[];
  studentAdvanceBalance: number;
}) => {
  const theme = useTheme();
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fees",
  });

  // State to control visibility of Admission Fee
  const [showAdmissionFee, setShowAdmissionFee] = useState<boolean>(false);

  // Helper to determine if an item is Admission Fee
  const isAdmissionFee = (feeTypeValue: any) => {
    const type = typeof feeTypeValue === "string" ? feeTypeValue : feeTypeValue?.value;
    return type === "Admission Fee";
  };

  const getCategoryOptions = () => {
    if (!selectedClass || feeCategories.length === 0) return [];
    const uniqueCategories = Array.from(
      new Set(
        feeCategories
          .filter((category) => category.className === selectedClass)
          .map((category) => category.categoryName)
      )
    );
    return uniqueCategories.map((category) => ({
      label: category || "General",
      name: category || "General",
      value: category || "General",
    }));
  };

  const getFeeTypeOptionsForClass = (classNameStr: string) => {
    if (!feeCategories.length) return [];
    const types = new Set<string>();
    feeCategories.forEach((category) => {
      if (category.className === classNameStr && category.feeItems) {
        category.feeItems.forEach((item) => types.add(item.feeType));
      }
    });

    let options = Array.from(types).map((t) => ({ label: t, value: t }));

    // Filter options in dropdown based on switch
    if (showAdmissionFee) {
      options = options.filter((opt) => opt.value !== "Admission Fee");
    }

    return options;
  };

  const calculateTotalAmount = (feeItems: any[]) => {
    if (!Array.isArray(feeItems)) return 0;
    return feeItems.reduce((total, item) => total + (item.amount || 0), 0);
  };

  // NEW: Handle Toggle Switch
  const handleToggleAdmissionFee = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setShowAdmissionFee(checked);

    const currentFees = watch("fees");
    if (!currentFees) return;

    // Create a new version of fees array
    const updatedFees = currentFees.map((feeGroup: any) => {
      let newFeeItems = feeGroup.feeItems || [];

      if (checked) {
        // If checked (Hide is ON), filter out Admission Fee items
        newFeeItems = newFeeItems.filter((item: any) => !isAdmissionFee(item.feeType));
      }
      // Note: If unchecked (Show), we don't automatically restore them to avoid complexity,
      // the user can re-select the category or add manually if needed.

      // Recalculate total for this group
      const newTotal = calculateTotalAmount(newFeeItems);

      return {
        ...feeGroup,
        feeItems: newFeeItems,
        feeAmount: newTotal,
      };
    });

    // Update the form state
    setValue("fees", updatedFees);
  };

  const handleCategoryChange = (index: number, selectedCategory: any) => {
    const categoryValue = Array.isArray(selectedCategory)
      ? selectedCategory[0]?.label || selectedCategory[0]
      : selectedCategory;

    if (categoryValue && selectedClass) {
      const matchingCategories = feeCategories.filter(
        (category) =>
          category.className === selectedClass &&
          category.categoryName === categoryValue
      );
      const allFeeItems: any[] = [];
      matchingCategories.forEach((category) => {
        if (category.feeItems && Array.isArray(category.feeItems)) {
          category.feeItems.forEach((item) => {
            // FIX: Do not add Admission Fee if showAdmissionFee is true
            if (showAdmissionFee && item.feeType === "Admission Fee") {
              return;
            }

            allFeeItems.push({
              feeType: { label: item.feeType, value: item.feeType },
              amount: item.amount || 0,
              advanceAmount: "",
              isSelected: true,
              id: Date.now() + Math.random(), // Ensure unique ID
            });
          });
        }
      });

      if (allFeeItems.length > 0) {
        setValue(`fees.${index}.feeItems`, allFeeItems);
        const totalAmount = calculateTotalAmount(allFeeItems);
        setValue(`fees.${index}.feeAmount`, totalAmount.toString());
        toast.success(`${allFeeItems.length} fee items created`);
      } else {
        setValue(`fees.${index}.feeItems`, []);
        setValue(`fees.${index}.feeAmount`, "");
      }
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

  const handleFeeTypeChange = (feeIndex: number, itemIndex: number, value: any) => {
    const feeItems = watch(`fees.${feeIndex}.feeItems`) || [];
    const updatedItems = [...feeItems];
    if (updatedItems[itemIndex]) {
      updatedItems[itemIndex] = { ...updatedItems[itemIndex], feeType: value };
      if (value && feeCategories.length > 0) {
        const feeTypeStr = typeof value === "string" ? value : value?.value;
        const item = feeCategories
          .find((c) => c.className === selectedClass)
          ?.feeItems?.find((f) => f.feeType === feeTypeStr);
        if (item && item.amount) updatedItems[itemIndex].amount = item.amount;
      }
      setValue(`fees.${feeIndex}.feeItems`, updatedItems);
      const newTotal = calculateTotalAmount(updatedItems);
      setValue(`fees.${feeIndex}.feeAmount`, newTotal.toString());
    }
  };

  const addFeeField = () => {
    append({ category: [], className: selectedClass, feeItems: [], feeAmount: "" });
  };

  const removeFeeField = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      toast.error("At least one fee entry is required");
    }
  };

  const categoryOptions = getCategoryOptions();
  const classSpecificFeeOptions = getFeeTypeOptionsForClass(selectedClass);

  return (
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
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControlLabel
            control={<Switch checked={showAdmissionFee} onChange={handleToggleAdmissionFee} />}
            label="Hide Admission Fee"
            sx={{ mr: 0 }}
          />
          <Button
            onClick={addFeeField}
            size="medium"
            disabled={!selectedClass}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: !selectedClass ? theme.palette.action.disabled : theme.palette.primary.main,
              color: "#fff",
            }}
          >
            <Add sx={{ fontSize: 18, mr: 0.5 }} /> Add New Category
          </Button>
        </Box>
      </Box>

      <CardContent sx={{ p: 3 }}>
        {fields.map((field, index) => {
          const feeCategory = watch(`fees.${index}.category`);
          const feeItems = watch(`fees.${index}.feeItems`) || [];
          const feeAmount = parseFloat(watch(`fees.${index}.feeAmount`) || 0);
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
                      "&:hover": { color: "error.main", bgcolor: alpha(theme.palette.error.main, 0.1) },
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: theme.palette.primary.main, mr: 1.5 }} />
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: 1 }}
                >
                  Fee Category #{index + 1}
                </Typography>
              </Box>
              <Grid container spacing={2.5} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                  <CraftInput
                    name={`fees.${index}.className`}
                    margin="none"
                    label="Class"
                    fullWidth
                    size="small"
                    value={selectedClass}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Class sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftIntAutoCompleteWithIcon
                    name={`fees.${index}.category`}
                    label={<span>Category <span style={{ color: "red" }}>*</span></span>}
                    margin="none"
                    size="small"
                    placeholder={selectedClass ? "Select Category" : "Select class first"}
                    options={categoryOptions.map((opt) => ({
                      label: String(opt.label || ""),
                      value: String(opt.value || ""),
                      name: String(opt.name || opt.label || ""),
                    }))}
                    fullWidth
                    multiple
                    icon={<CalendarMonth color="primary" />}
                    disabled={!selectedClass}
                    onChange={(event: any, value: any) => {
                      handleCategoryChange(index, value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInput
                    margin="none"
                    name={`fees.${index}.feeAmount`}
                    label="Total Amount"
                    fullWidth
                    size="small"
                    type="number"
                    value={feeAmount.toString()}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Money sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
              {feeCategory && feeCategory.length > 0 ? (
                feeItems.length > 0 ? (
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "primary.main" }}>
                        📋 Fee Items ({feeItems.length} items)
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          const newItems = [
                            ...feeItems,
                            { feeType: "", amount: 0, advanceAmount: "", isSelected: true, id: Date.now() },
                          ];
                          setValue(`fees.${index}.feeItems`, newItems);
                        }}
                      >
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
                          <Grid
                            container
                            spacing={2}
                            sx={{ mb: 1, pb: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}` }}
                          >
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
                        {feeItems.map((item: any, itemIndex: number) => (
                          <Grid item xs={12} key={item.id}>
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
                                  disabled={!selectedClass}
                                  isOptionEqualToValue={(option: any, value: any) => {
                                    if (!option || !value) return false;
                                    const optVal = typeof option === "string" ? option : option.value;
                                    const valVal = typeof value === "string" ? value : value.value;
                                    return optVal === valVal;
                                  }}
                                  onChange={(e: any, val: any) => {
                                    handleFeeTypeChange(index, itemIndex, val);
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <CraftInput
                                  name={`fees.${index}.feeItems.${itemIndex}.amount`}
                                  label=""
                                  fullWidth
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
                                <CraftInput
                                  name={`fees.${index}.feeItems.${itemIndex}.advanceAmount`}
                                  label=""
                                  fullWidth
                                  size="small"
                                  type="number"
                                  disabled={!selectedClass || !item.amount}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Typography variant="body2" color="text.secondary">
                                          ৳
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                  onChange={(e) => handleAdvanceAmountChange(index, itemIndex, e.target.value)}
                                />
                              </Grid>
                              <Grid item xs={1} sx={{ display: "flex", justifyContent: "center" }}>
                                <Tooltip title="Remove this item">
                                  <IconButton size="small" onClick={() => removeFeeItem(index, itemIndex)} sx={{ color: "error.main" }}>
                                    <Delete fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                        <Grid item xs={12}>
                          <Box sx={{ mt: 2, pt: 2, borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.2)}` }}>
                            <Grid container spacing={2}>
                              <Grid item xs={4.5}>
                                <Typography variant="body1" fontWeight="bold" color="primary.main">
                                  TOTAL
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <CraftInput
                                  name={`fees.${index}.feeAmount`}
                                  label=""
                                  fullWidth
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
                                    "& .MuiInputBase-input": {
                                      backgroundColor: alpha(theme.palette.primary.light, 0.1),
                                      fontWeight: "bold",
                                      fontSize: "1.1rem",
                                      color: theme.palette.primary.main,
                                    },
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
                                    Total Advance: ৳
                                    {feeItems.reduce((sum: number, item: any) => sum + (parseFloat(item.advanceAmount) || 0), 0).toLocaleString()}
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
            <Typography variant="body2">
              {!selectedClass ? "Select a class first to add fees" : "No fee categories added yet"}
            </Typography>
            <Button onClick={addFeeField} variant="outlined" sx={{ mt: 2 }} startIcon={<Add />} disabled={!selectedClass}>
              Add First Category
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const PaymentSummary = () => {
  const theme = useTheme();
  const { watch } = useFormContext();
  const [discountType, setDiscountType] = useState<"flat" | "percentage">("flat");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");

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

  const calculateTotalFees = () => {
    const fees = watch("fees") || [];
    let total = 0;
    fees.forEach((fee: any) => {
      if (fee.feeItems && Array.isArray(fee.feeItems))
        fee.feeItems.forEach((item: any) => (total += parseFloat(item.amount) || 0));
    });
    return total;
  };

  const calculateTotalAdvance = () => {
    const fees = watch("fees") || [];
    let total = 0;
    fees.forEach((fee: any) => {
      if (fee.feeItems && Array.isArray(fee.feeItems))
        fee.feeItems.forEach((item: any) => (total += parseFloat(item.advanceAmount) || 0));
    });
    return total;
  };

  const calculateSummary = () => {
    const totalFees = calculateTotalFees();
    const totalAdvance = calculateTotalAdvance();
    const paidAmountNum = paidAmount || 0;
    let calculatedDiscount = 0;
    if (discountType === "percentage") calculatedDiscount = (totalFees * discountAmount) / 100;
    else calculatedDiscount = Math.min(discountAmount, totalFees);
    const netPayable = totalFees - calculatedDiscount;
    const totalPaid = totalAdvance + paidAmountNum;
    const dueAmount = Math.max(0, netPayable - totalPaid);
    return { totalFees, totalAdvance, calculatedDiscount, netPayable, paidAmount: paidAmountNum, dueAmount };
  };

  const summary = calculateSummary();

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        background: "#fff",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 2,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <Box>
                <Typography variant="h6" color="text.primary" fontWeight="bold">
                  Total Payable
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h3" color="primary.main" fontWeight="800">
                  ৳{summary.totalFees.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600 }}>
              Apply Discount
            </Typography>
            <Grid container spacing={2}>
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
                  onChange={(e: any, value: any) => {
                    setDiscountType(value?.value as "flat" | "percentage");
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={8} md={9}>
                <CraftInput
                  name="discountAmount"
                  label={discountType === "percentage" ? "Discount Percentage (%)" : "Discount Amount (৳)"}
                  placeholder="0"
                  type="number"
                  fullWidth
                  size="small"
                  value={discountAmount.toString()}
                  onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography variant="body2" color="text.secondary">
                          {discountType === "percentage" ? "%" : "৳"}
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            {summary.calculatedDiscount > 0 && (
              <Box sx={{ mt: 2, pl: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Discount Applied:{" "}
                  <span style={{ fontWeight: "bold", color: "warning.main" }}>
                    - ৳{summary.calculatedDiscount.toLocaleString()}
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Net Payable After Discount:{" "}
                  <span style={{ fontWeight: "bold", color: "primary.main" }}>
                    ৳{summary.netPayable.toLocaleString()}
                  </span>
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600 }}>
              Payment Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <CraftInput
                  name="paidAmount"
                  label="Pay Additional Amount Now"
                  placeholder="0"
                  type="number"
                  fullWidth
                  size="small"
                  value={paidAmount.toString()}
                  onChange={(e) => setPaidAmount(parseFloat(e.target.value) || 0)}
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
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  Already paid advance: ৳{summary.totalAdvance.toLocaleString()}
                </Typography>
              </Grid>
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
                  onChange={(e: any, value: any) => {
                    setPaymentMethod(value?.value as string);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                mt: 1,
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(
                  summary.dueAmount > 0 ? theme.palette.error.light : theme.palette.success.light,
                  0.1
                ),
                border: `1px solid ${alpha(
                  summary.dueAmount > 0 ? theme.palette.error.main : theme.palette.success.main,
                  0.2
                )}`,
                textAlign: 'center'
              }}
            >
              {summary.dueAmount > 0 ? (
                <Box>
                  <Typography variant="body2" color="text.secondary">Due Amount after payment</Typography>
                  <Typography variant="h5" fontWeight="bold" color="error.main">
                    ৳{summary.dueAmount.toLocaleString()}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Typography variant="h5" fontWeight="bold" color="success.main">
                    Fully Paid
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const AddFeeModal = ({ open, setOpen, student, onAddFee, refetch }: AddFeeModalProps) => {
  const theme = useTheme();
  const [createFee, { isLoading }] = useCreateFeeMutation();
  const { classOptions, feeCategoryData } = useAcademicOption();
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [feeCategories, setFeeCategories] = useState<FeeCategory[]>([]);
  const [studentAdvanceBalance, setStudentAdvanceBalance] = useState<number>(0);

  const formattedClassOptions = useMemo(() => {
    return classOptions.map((option: any) => ({
      ...option,
      label: option.label || option.name || "Unnamed Class",
      value: option.value || option.id || "",
    }));
  }, [classOptions]);

  useEffect(() => {
    if (feeCategoryData?.data?.data) setFeeCategories(feeCategoryData.data.data);
  }, [feeCategoryData]);

  useEffect(() => {
    if (student?.className) {
      let classNameString = "";

      // Case 1: Array of Objects (Populated)
      if (Array.isArray(student.className) && student.className[0]?.className) {
        classNameString = student.className[0].className;
      }
      // Case 2: Array of Objects (Populated from Backend)
      else if (Array.isArray(student.className) && typeof student.className[0] === 'object') {
        classNameString = student.className[0].name || student.className[0].label || student.className[0].className;
      }
      // Case 3: Array of Strings (IDs)
      else if (Array.isArray(student.className) && typeof student.className[0] === 'string') {
        const matchedClass = formattedClassOptions.find((opt: any) => opt.value === student.className[0]);
        classNameString = matchedClass ? matchedClass.label : student.className[0];
      }
      // Case 4: String
      else if (typeof student.className === 'string') {
        const matchedClass = formattedClassOptions.find((opt: any) => opt.value === student.className);
        classNameString = matchedClass ? matchedClass.label : student.className;
      }

      setSelectedClass(classNameString);
    }
    if (student?.advanceBalance !== undefined) setStudentAdvanceBalance(student.advanceBalance);
    else if (student?.paidAmount !== undefined) setStudentAdvanceBalance(0);
  }, [student, formattedClassOptions]);

  const handleClassChange = (event: React.SyntheticEvent, value: any) => {
    const className = typeof value === "string" ? value : (value ? (value.label || value.name || value.value || "") : "");
    setSelectedClass(className);
  };

  const getCurrentAcademicYear = () => `${new Date().getFullYear()}`;

  const getMonths = () => {
    const currentYear = new Date().getFullYear();
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
    return months.map((month) => ({ label: `${month}-${currentYear}`, value: `${month}-${currentYear}` }));
  };

  const getInitialClassValue = () => {
    if (!student?.className || !formattedClassOptions.length) return "";
    let classNameString = "";
    if (Array.isArray(student.className) && student.className[0]?.className) {
      classNameString = student.className[0].className;
    } else if (Array.isArray(student.className) && typeof student.className[0] === 'object') {
      classNameString = student.className[0].name || student.className[0].label;
    } else if (typeof student.className === 'string') {
      classNameString = student.className;
    }

    const matchedOption = formattedClassOptions.find((opt: any) => opt.label === classNameString);
    return matchedOption || "";
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

    try {
      const fees = data.fees || [];
      if (!fees.length) {
        toast.error("Please add at least one fee category");
        return;
      }

      const feePromises: Promise<any>[] = [];

      fees.forEach((feeGroup: any) => {
        const classLabel = selectedClass;
        const month = data.month;
        const academicYear = data.academicYear;
        const paymentMethod = data.paymentMethod?.value || "cash";
        const discountAmount = data.discountAmount || 0;

        if (feeGroup.feeItems && Array.isArray(feeGroup.feeItems)) {
          feeGroup.feeItems.forEach((item: any) => {
            const amount = parseFloat(item.amount) || 0;
            const paidAmount = parseFloat(item.advanceAmount) || 0;
            const dueAmount = Math.max(0, amount - paidAmount);

            const payload = {
              student: student._id,
              enrollment: student.enrollment?._id || null,
              class: classLabel,
              month: month,
              academicYear: academicYear,
              feeType: typeof item.feeType === "string" ? item.feeType : item.feeType?.value,
              amount: amount,
              paidAmount: paidAmount,
              dueAmount: dueAmount,
              discount: discountAmount,
              status: paidAmount >= amount ? 'paid' : paidAmount > 0 ? 'partial' : 'unpaid',
              paymentMethod: paymentMethod,
              isCurrentMonth: true
            };

            feePromises.push(createFee(payload).unwrap());
          });
        }
      });

      await Promise.all(feePromises);

      toast.success("Fees added successfully!");
      setOpen(false);
      if (refetch) refetch();
      if (onAddFee) onAddFee(data);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to add fees");
    }
  };

  const defaultFormValues = {
    academicYear: getCurrentAcademicYear(),
    month: `${new Date().toLocaleString("default", { month: "long" })}-${new Date().getFullYear()}`,
    className: getInitialClassValue(),
    fees: [{ category: [], className: selectedClass, feeItems: [], feeAmount: "" }],
    discountType: { label: "Flat Amount", value: "flat" },
    discountAmount: 0,
    paymentMethod: { label: "Cash", value: "cash" },
    reason: "",
    note: "",
  };

  return (
    <CraftModal open={open} setOpen={setOpen} title="Add New Fees" size="lg">
      <CraftForm onSubmit={handleSubmit} defaultValues={defaultFormValues}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info">
              <Typography variant="body2">
                <strong>Student:</strong> {student?.studentName || student?.name} ({student?.studentId}) <br />
                <strong>Current Class:</strong> {selectedClass || "N/A"}{" "}
                {studentAdvanceBalance > 0 && (
                  <>
                    <br />
                    <strong>Advance Balance:</strong> ৳{studentAdvanceBalance.toLocaleString()}
                  </>
                )}
              </Typography>
            </Alert>
          </Grid>
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
              value={getInitialClassValue()}
            />
          </Grid>
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
          <Grid item xs={12}>
            <CraftInput
              name="academicYear"
              label="Academic Year"
              fullWidth
              size="small"
              value={getCurrentAcademicYear()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonth sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <DynamicFeeFields
              selectedClass={selectedClass}
              feeCategories={feeCategories}
              studentAdvanceBalance={studentAdvanceBalance}
            />
          </Grid>
          <Grid item xs={12}>
            <PaymentSummary />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading || !selectedClass}
              startIcon={<Money />}
              size="large"
            >
              {isLoading ? "Adding Fees..." : "Add Fees"}
            </Button>
          </Grid>
        </Grid>
      </CraftForm>
    </CraftModal>
  );
};

export default AddFeeModal;