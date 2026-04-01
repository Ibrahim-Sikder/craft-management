/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon";
import CraftForm from "@/components/Forms/Form";
import CraftInput from "@/components/Forms/inputWithIcon";
import CraftModal from "@/components/Shared/Modal";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import { AddFeeModalProps, FeeCategory } from "@/interface/fees";
import { useCreateFeeMutation } from "@/redux/api/feesApi";
import {
  Add,
  CalendarMonth,
  Class,
  Delete,
  Description,
  Payment,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

const MONTHS = [
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

const CustomCraftInput = ({ onKeyDown, ...props }: any) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onKeyDown) onKeyDown(e);
  };
  return <CraftInput onKeyDown={handleKeyDown} {...props} />;
};

const CustomCraftIntAutoCompleteWithIcon = ({ onKeyDown, ...props }: any) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onKeyDown) onKeyDown(e);
  };
  return (
    <div onKeyDown={handleKeyDown}>
      <CraftIntAutoCompleteWithIcon {...props} />
    </div>
  );
};

const RangeDiscountSection = ({
  feeIndex,
  itemIndex,
  item,
  onApplyRangeDiscount,
}: {
  feeIndex: number;
  itemIndex: number;
  item: any;
  onApplyRangeDiscount: (
    fi: number,
    ii: number,
    s: string,
    e: string,
    a: number,
  ) => void;
}) => {
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [rangeAmt, setRangeAmt] = useState(0);
  return (
    <Grid item xs={12} sx={{ mt: 1 }}>
      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          borderColor: (t) => t.palette.info.main,
          bgcolor: (t) => alpha(t.palette.info.light, 0.1),
        }}
      >
        <Typography
          variant="caption"
          color="info.main"
          fontWeight="bold"
          sx={{ mb: 1, display: "block" }}
        >
          Apply Discount to Specific Months:
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Select
            size="small"
            value={rangeStart}
            onChange={(e) => setRangeStart(e.target.value)}
            displayEmpty
            sx={{ minWidth: 120, bgcolor: "background.paper" }}
          >
            <MenuItem value="" disabled>
              From
            </MenuItem>
            {MONTHS.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body2">to</Typography>
          <Select
            size="small"
            value={rangeEnd}
            onChange={(e) => setRangeEnd(e.target.value)}
            displayEmpty
            sx={{ minWidth: 120, bgcolor: "background.paper" }}
          >
            <MenuItem value="" disabled>
              To
            </MenuItem>
            {MONTHS.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
          <TextField
            size="small"
            type="number"
            placeholder="Amt"
            value={rangeAmt || ""}
            onChange={(e) => setRangeAmt(parseFloat(e.target.value) || 0)}
            sx={{ width: 80 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">৳</InputAdornment>
              ),
            }}
          />
          <Button
            size="small"
            variant="contained"
            onClick={() =>
              onApplyRangeDiscount(
                feeIndex,
                itemIndex,
                rangeStart,
                rangeEnd,
                rangeAmt,
              )
            }
            sx={{ fontSize: "0.75rem", py: 0.5 }}
          >
            Set Range
          </Button>
        </Box>
        {item.discountRangeStart && item.discountRangeEnd && (
          <Typography
            variant="caption"
            color="success.main"
            sx={{ mt: 1, display: "block", fontWeight: "bold" }}
          >
            Active: {item.discountRangeStart} to {item.discountRangeEnd} (-৳
            {item.discountRangeAmount}/mo)
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

// ── Dynamic Fee Fields ────────────────────────────────────────
const DynamicFeeFields = ({
  selectedClass,
  feeCategories,
  selectedMonth,
}: {
  selectedClass: string;
  feeCategories: FeeCategory[];
  studentAdvanceBalance: number;
  enrollmentId?: string;
  selectedMonth?: string;
}) => {
  const theme = useTheme();
  const { control, watch, setValue, getValues } = useFormContext();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "fees",
  });
  const [hideAdmissionFee, setHideAdmissionFee] = useState(false);
  const [hideMonthlyFee, setHideMonthlyFee] = useState(false);

  const isAdmissionFee = (feeType: string) => feeType === "Admission Fee";
  const isMonthlyFee = (feeType: string) =>
    feeType.toLowerCase().includes("monthly");

  const calcTotal = (items: any[]) =>
    !Array.isArray(items)
      ? 0
      : items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);

  const getCategoryOptions = () => {
    if (!selectedClass || !feeCategories.length) return [];
    return Array.from(
      new Set(
        feeCategories
          .filter((c) => c.className === selectedClass)
          .map((c) => c.categoryName),
      ),
    ).map((cat) => ({
      label: cat || "General",
      name: cat || "General",
      value: cat || "General",
    }));
  };

  const getFeeTypeOptions = useCallback(
    (cls: string) => {
      if (!feeCategories.length) return [];
      const types = new Set<string>();
      feeCategories.forEach((c) => {
        if (c.className === cls)
          (c.feeItems || []).forEach((i) => {
            if (hideAdmissionFee && i.feeType === "Admission Fee") return;
            if (hideMonthlyFee && i.feeType.toLowerCase().includes("monthly"))
              return;
            types.add(i.feeType);
          });
      });
      return Array.from(types).map((t) => ({ label: t, value: t }));
    },
    [feeCategories, hideAdmissionFee, hideMonthlyFee],
  );

  // Handle toggles — when UN-hiding, restore items from category definition
  const restoreItemsForAllGroups = useCallback(
    (restoreAdmission: boolean, restoreMonthly: boolean) => {
      const currentFields = getValues("fees");
      if (!currentFields || !Array.isArray(currentFields)) return;

      currentFields.forEach((group: any, idx: number) => {
        const catName = group.categoryName;
        if (!catName) return;

        const currentItems: any[] = group.feeItems || [];

        // Get all items from the category definition (without any toggle filter)
        const allStandardItems: any[] = [];
        feeCategories
          .filter(
            (c) => c.className === selectedClass && c.categoryName === catName,
          )
          .forEach((c) => {
            (c.feeItems || []).forEach((item) => {
              allStandardItems.push({
                feeType: item.feeType,
                amount: item.amount || 0,
                discount: 0,
                discountType: "flat",
                advanceAmount: 0,
                isSelected: true,
                isMonthly: item.feeType.toLowerCase().includes("monthly"),
                discountRangeStart: "",
                discountRangeEnd: "",
                discountRangeAmount: 0,
                id: `${Date.now()}_${Math.random()}_${item.feeType}`,
                isCustom: false,
              });
            });
          });

        // Find items that are currently missing (were hidden) and should be restored
        const itemsToAdd = allStandardItems.filter((stdItem) => {
          const stdFeeType = stdItem.feeType;
          const isAdmission = stdFeeType === "Admission Fee";
          const isMonthly = stdFeeType.toLowerCase().includes("monthly");

          // Only restore items that match what we're restoring
          if (!restoreAdmission && isAdmission) return false;
          if (!restoreMonthly && isMonthly) return false;

          // Check if it already exists in current items
          const alreadyExists = currentItems.some((ci: any) => {
            const ciType =
              typeof ci.feeType === "string"
                ? ci.feeType
                : ci.feeType?.value || ci.feeType?.label || "";
            return ciType === stdFeeType;
          });

          return !alreadyExists;
        });

        if (itemsToAdd.length > 0) {
          // Preserve existing items, append newly restored ones
          const merged = [...currentItems, ...itemsToAdd];
          setValue(`fees.${idx}.feeItems`, merged);
          setValue(`fees.${idx}.feeAmount`, calcTotal(merged).toString());
        }
      });
    },
    [getValues, setValue, feeCategories, selectedClass],
  );

  // Handle Admission Fee toggle
  const handleAdmissionToggle = useCallback((_: any, checked: boolean) => {
    setHideAdmissionFee(checked);
  }, []);

  // Handle Monthly Fee toggle
  const handleMonthlyToggle = useCallback((_: any, checked: boolean) => {
    setHideMonthlyFee(checked);
  }, []);

  // When hideAdmissionFee changes
  useEffect(() => {
    if (fields.length === 0) return;
    if (hideAdmissionFee) {
      // Filter out admission fee items from existing items
      const currentFields = getValues("fees");
      if (!currentFields || !Array.isArray(currentFields)) return;
      currentFields.forEach((group: any, idx: number) => {
        const currentItems: any[] = group.feeItems || [];
        if (!currentItems.length) return;
        const filtered = currentItems.filter((item: any) => {
          const feeTypeStr =
            typeof item.feeType === "string"
              ? item.feeType
              : item.feeType?.value || item.feeType?.label || "";
          return feeTypeStr !== "Admission Fee";
        });
        setValue(`fees.${idx}.feeItems`, filtered);
        setValue(`fees.${idx}.feeAmount`, calcTotal(filtered).toString());
      });
    } else {
      // Restore admission fee items
      restoreItemsForAllGroups(true, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideAdmissionFee]);

  // When hideMonthlyFee changes
  useEffect(() => {
    if (fields.length === 0) return;
    if (hideMonthlyFee) {
      // Filter out monthly fee items from existing items
      const currentFields = getValues("fees");
      if (!currentFields || !Array.isArray(currentFields)) return;
      currentFields.forEach((group: any, idx: number) => {
        const currentItems: any[] = group.feeItems || [];
        if (!currentItems.length) return;
        const filtered = currentItems.filter((item: any) => {
          const feeTypeStr =
            typeof item.feeType === "string"
              ? item.feeType
              : item.feeType?.value || item.feeType?.label || "";
          return !feeTypeStr.toLowerCase().includes("monthly");
        });
        setValue(`fees.${idx}.feeItems`, filtered);
        setValue(`fees.${idx}.feeAmount`, calcTotal(filtered).toString());
      });
    } else {
      // Restore monthly fee items
      restoreItemsForAllGroups(false, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideMonthlyFee]);

  const handleCategoryChange = useCallback(
    (index: number, sel: any) => {
      const catVal = Array.isArray(sel) ? sel[0]?.label || sel[0] : sel;
      if (!catVal || !selectedClass) return;
      // Store the selected category name
      setValue(`fees.${index}.categoryName`, catVal);

      // Generate items from category, respecting current toggle state
      const allItems: any[] = [];
      feeCategories
        .filter(
          (c) => c.className === selectedClass && c.categoryName === catVal,
        )
        .forEach((c) => {
          (c.feeItems || []).forEach((item) => {
            // Respect current toggles when loading
            if (hideAdmissionFee && item.feeType === "Admission Fee") return;
            if (
              hideMonthlyFee &&
              item.feeType.toLowerCase().includes("monthly")
            )
              return;
            allItems.push({
              feeType: item.feeType,
              amount: item.amount || 0,
              discount: 0,
              discountType: "flat",
              advanceAmount: 0,
              isSelected: true,
              isMonthly: item.feeType.toLowerCase().includes("monthly"),
              discountRangeStart: "",
              discountRangeEnd: "",
              discountRangeAmount: 0,
              id: `${Date.now()}_${Math.random()}_${item.feeType}`,
              isCustom: false,
            });
          });
        });

      setValue(`fees.${index}.feeItems`, allItems);
      setValue(`fees.${index}.feeAmount`, calcTotal(allItems).toString());
      toast.success(`${allItems.length} fee items loaded`);
    },
    [selectedClass, feeCategories, hideAdmissionFee, hideMonthlyFee, setValue],
  );

  const removeFeeItem = useCallback(
    (fi: number, ii: number) => {
      const items = [...(getValues(`fees.${fi}.feeItems`) || [])];
      items.splice(ii, 1);
      setValue(`fees.${fi}.feeItems`, items);
      setValue(`fees.${fi}.feeAmount`, calcTotal(items).toString());
    },
    [getValues, setValue],
  );

  const handleFeeTypeChange = useCallback(
    (fi: number, ii: number, val: any) => {
      const items = [...(getValues(`fees.${fi}.feeItems`) || [])];
      if (!items[ii]) return;
      const feeTypeValue = typeof val === "string" ? val : val?.value || "";
      items[ii] = {
        ...items[ii],
        feeType: feeTypeValue,
        isMonthly: feeTypeValue.toLowerCase().includes("monthly"),
        isCustom: true,
      };
      if (val && feeCategories.length > 0) {
        const found = feeCategories
          .find((c) => c.className === selectedClass)
          ?.feeItems?.find((f) => f.feeType === feeTypeValue);
        if (found?.amount) items[ii].amount = found.amount;
      }
      setValue(`fees.${fi}.feeItems`, items);
      setValue(`fees.${fi}.feeAmount`, calcTotal(items).toString());
    },
    [feeCategories, selectedClass, getValues, setValue],
  );

  const handleFieldChange = useCallback(
    (fi: number, ii: number, field: string, val: any) => {
      const items = [...(getValues(`fees.${fi}.feeItems`) || [])];
      if (items[ii]) {
        items[ii][field] = val;
        items[ii].isCustom = true;
        setValue(`fees.${fi}.feeItems`, items);
        setValue(`fees.${fi}.feeAmount`, calcTotal(items).toString());
      }
    },
    [getValues, setValue],
  );

  const handleAdvanceChange = useCallback(
    (fi: number, ii: number, val: string) => {
      const items = [...(getValues(`fees.${fi}.feeItems`) || [])];
      if (items[ii]) {
        items[ii].advanceAmount = parseFloat(val) || 0;
        items[ii].isCustom = true;
        setValue(`fees.${fi}.feeItems`, items);
      }
    },
    [getValues, setValue],
  );

  const handleRangeDiscount = useCallback(
    (fi: number, ii: number, start: string, end: string, amt: number) => {
      if (!start || !end) {
        toast.error("Please select start and end month");
        return;
      }
      if (amt <= 0) {
        toast.error("Please enter a valid discount amount");
        return;
      }
      setValue(`fees.${fi}.feeItems.${ii}.discountRangeStart`, start);
      setValue(`fees.${fi}.feeItems.${ii}.discountRangeEnd`, end);
      setValue(`fees.${fi}.feeItems.${ii}.discountRangeAmount`, amt);
      toast.success(`Discount set: ${start} to ${end} (৳${amt}/month)`);
    },
    [setValue],
  );

  const addFeeField = useCallback(() => {
    append({
      category: [],
      className: selectedClass,
      feeItems: [],
      feeAmount: "",
      selectionMode: "admission",
      categoryName: "",
    });
  }, [append, selectedClass]);

  const removeFeeField = useCallback(
    (i: number) => {
      if (fields.length > 1) {
        remove(i);
      } else {
        toast.error("At least one fee entry is required");
      }
    },
    [fields.length, remove],
  );

  const categoryOptions = getCategoryOptions();
  const feeTypeOptions = getFeeTypeOptions(selectedClass);

  return (
    <Card
      elevation={0}
      sx={{
        mb: 2,
        borderRadius: 3,
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
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
          <Typography variant="h6" fontWeight="600">
            Fee Details
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Configure fees for {selectedMonth || "enrollment"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={hideAdmissionFee}
                onChange={handleAdmissionToggle}
              />
            }
            label="Hide Admission Fee"
            sx={{ mr: 0 }}
          />
          <FormControlLabel
            control={
              <Switch checked={hideMonthlyFee} onChange={handleMonthlyToggle} />
            }
            label="Hide Monthly Fees"
            sx={{ mr: 0 }}
          />
          <Button
            onClick={addFeeField}
            size="medium"
            variant="contained"
            disabled={!selectedClass}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            <Add sx={{ fontSize: 18, mr: 0.5 }} /> Add Category
          </Button>
        </Box>
      </Box>

      <CardContent sx={{ p: 3 }}>
        {fields.map((field, index) => {
          const feeCategory = watch(`fees.${index}.category`);
          const feeItems = watch(`fees.${index}.feeItems`) || [];
          const feeAmount = parseFloat(watch(`fees.${index}.feeAmount`) || 0);
          const selectionMode =
            watch(`fees.${index}.selectionMode`) || "admission";

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
                      "&:hover": {
                        color: "error.main",
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                      },
                    }}
                  >
                    <Delete fontSize="small" />
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
                  <CustomCraftIntAutoCompleteWithIcon
                    name={`fees.${index}.category`}
                    label={
                      <span>
                        Category <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    margin="none"
                    size="small"
                    placeholder={
                      selectedClass ? "Select Category" : "Select class first"
                    }
                    options={categoryOptions.map((o) => ({
                      label: String(o.label),
                      value: String(o.value),
                      name: String(o.name),
                    }))}
                    fullWidth
                    multiple
                    icon={<CalendarMonth color="primary" />}
                    disabled={!selectedClass}
                    onChange={(_: any, value: any) =>
                      handleCategoryChange(index, value)
                    }
                  />
                </Grid>
              </Grid>

              {feeCategory && feeCategory.length > 0 ? (
                feeItems.length > 0 ? (
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ color: "primary.main" }}
                      >
                        📋 Fee Items ({feeItems.length} items)
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          const newItem = {
                            feeType: "",
                            amount: 0,
                            discount: 0,
                            discountType: "flat",
                            advanceAmount: 0,
                            isSelected: true,
                            isMonthly: false,
                            discountRangeStart: "",
                            discountRangeEnd: "",
                            discountRangeAmount: 0,
                            id: Date.now(),
                            isCustom: true,
                          };
                          setValue(`fees.${index}.feeItems`, [
                            ...feeItems,
                            newItem,
                          ]);
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
                        {/* Header */}
                        <Grid item xs={12}>
                          <Grid
                            container
                            spacing={2}
                            sx={{
                              mb: 1,
                              pb: 1,
                              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                            }}
                          >
                            <Grid item xs={4}>
                              <Typography
                                variant="caption"
                                fontWeight="bold"
                                color="text.secondary"
                              >
                                FEE TYPE
                              </Typography>
                            </Grid>
                            <Grid item xs={2.5}>
                              <Typography
                                variant="caption"
                                fontWeight="bold"
                                color="text.secondary"
                              >
                                AMOUNT
                              </Typography>
                            </Grid>
                            <Grid item xs={2.5}>
                              <Typography
                                variant="caption"
                                fontWeight="bold"
                                color="text.secondary"
                              >
                                DISCOUNT
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography
                                variant="caption"
                                fontWeight="bold"
                                color="text.secondary"
                              >
                                ADVANCE
                              </Typography>
                            </Grid>
                            <Grid item xs={1} />
                          </Grid>
                        </Grid>

                        {/* Rows */}
                        {feeItems.map((item: any, itemIndex: number) => {
                          // Resolve feeType string for isMonthly check in render
                          const feeTypeStr =
                            typeof item.feeType === "string"
                              ? item.feeType
                              : item.feeType?.value ||
                                item.feeType?.label ||
                                "";
                          const isMonthlyItem =
                            item.isMonthly ||
                            feeTypeStr.toLowerCase().includes("monthly");

                          // If hideMonthlyFee toggle is ON, don't render monthly items
                          // (they should already be filtered out, but guard here too)
                          if (hideMonthlyFee && isMonthlyItem) return null;
                          // If hideAdmissionFee toggle is ON, don't render admission fee items
                          if (
                            hideAdmissionFee &&
                            feeTypeStr === "Admission Fee"
                          )
                            return null;

                          return (
                            <Grid item xs={12} key={item.id || itemIndex}>
                              <Grid
                                container
                                spacing={2}
                                alignItems="center"
                                sx={{
                                  mb: 1,
                                  bgcolor: isMonthlyItem
                                    ? alpha(theme.palette.info.light, 0.15)
                                    : "transparent",
                                  p: 0.5,
                                  borderRadius: 1,
                                }}
                              >
                                <Grid item xs={4}>
                                  <CustomCraftIntAutoCompleteWithIcon
                                    name={`fees.${index}.feeItems.${itemIndex}.feeType`}
                                    label=""
                                    options={feeTypeOptions}
                                    size="small"
                                    fullWidth
                                    placeholder="Select Fee Type"
                                    multiple={false}
                                    freeSolo
                                    icon={
                                      <Description
                                        color="disabled"
                                        sx={{ fontSize: 16 }}
                                      />
                                    }
                                    disabled={!selectedClass}
                                    isOptionEqualToValue={(o: any, v: any) => {
                                      if (!o || !v) return false;
                                      return (
                                        (typeof o === "string"
                                          ? o
                                          : o.value) ===
                                        (typeof v === "string" ? v : v.value)
                                      );
                                    }}
                                    onChange={(e: any, val: any) =>
                                      handleFeeTypeChange(index, itemIndex, val)
                                    }
                                  />
                                </Grid>
                                <Grid item xs={2.5}>
                                  <CustomCraftInput
                                    name={`fees.${index}.feeItems.${itemIndex}.amount`}
                                    label=""
                                    fullWidth
                                    size="small"
                                    type="number"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                          >
                                            ৳
                                          </Typography>
                                        </InputAdornment>
                                      ),
                                    }}
                                    onChange={(e: any) =>
                                      handleFieldChange(
                                        index,
                                        itemIndex,
                                        "amount",
                                        parseFloat(e.target.value) || 0,
                                      )
                                    }
                                  />
                                </Grid>
                                <Grid item xs={2.5}>
                                  <CustomCraftInput
                                    name={`fees.${index}.feeItems.${itemIndex}.discount`}
                                    label=""
                                    fullWidth
                                    size="small"
                                    type="number"
                                    placeholder="0"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                          >
                                            ৳
                                          </Typography>
                                        </InputAdornment>
                                      ),
                                    }}
                                    onChange={(e: any) =>
                                      handleFieldChange(
                                        index,
                                        itemIndex,
                                        "discount",
                                        parseFloat(e.target.value) || 0,
                                      )
                                    }
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <CustomCraftInput
                                    name={`fees.${index}.feeItems.${itemIndex}.advanceAmount`}
                                    label=""
                                    fullWidth
                                    size="small"
                                    type="number"
                                    disabled={!selectedClass || !item.amount}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                          >
                                            ৳
                                          </Typography>
                                        </InputAdornment>
                                      ),
                                    }}
                                    onChange={(e: any) =>
                                      handleAdvanceChange(
                                        index,
                                        itemIndex,
                                        e.target.value,
                                      )
                                    }
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={1}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Tooltip title="Remove">
                                    <IconButton
                                      size="small"
                                      onClick={() =>
                                        removeFeeItem(index, itemIndex)
                                      }
                                      sx={{ color: "error.main" }}
                                    >
                                      <Delete fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Grid>
                                {/* Range discount section — only shown for monthly items
                                    and only when hideMonthlyFee is OFF */}
                                {isMonthlyItem && !hideMonthlyFee && (
                                  <RangeDiscountSection
                                    feeIndex={index}
                                    itemIndex={itemIndex}
                                    item={item}
                                    onApplyRangeDiscount={handleRangeDiscount}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Paper>
                  </Box>
                ) : (
                  <Box
                    sx={{ textAlign: "center", py: 3, color: "text.disabled" }}
                  >
                    <Typography variant="body2">
                      No fee items found for this category
                    </Typography>
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
              {!selectedClass
                ? "Select a class first to add fees"
                : "No fee categories added yet"}
            </Typography>
            <Button
              onClick={addFeeField}
              variant="outlined"
              sx={{ mt: 2 }}
              startIcon={<Add />}
              disabled={!selectedClass}
            >
              Add First Category
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const AddFeeModal = ({ open, setOpen, student, refetch }: AddFeeModalProps) => {
  const theme = useTheme();
  const [createFee, { isLoading }] = useCreateFeeMutation();
  const { classOptions, feeCategoryData } = useAcademicOption();
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [feeCategories, setFeeCategories] = useState<FeeCategory[]>([]);
  const [studentAdvanceBalance, setStudentAdvanceBalance] = useState<number>(0);
  const [enrollmentId, setEnrollmentId] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toLocaleString("default", { month: "long" }),
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formattedClassOptions = useMemo(
    () =>
      classOptions.map((o: any) => ({
        ...o,
        label: o.label || o.name || "Unnamed Class",
        value: o.value || o.id || "",
      })),
    [classOptions],
  );

  useEffect(() => {
    if (feeCategoryData?.data?.data)
      setFeeCategories(feeCategoryData.data.data);
  }, [feeCategoryData]);

  useEffect(() => {
    if (!student) return;
    let cls = "";
    if (Array.isArray(student.className)) {
      const first = student.className[0];
      if (first?.className) cls = first.className;
      else if (typeof first === "object")
        cls = first.name || first.label || first.className || "";
      else if (typeof first === "string") {
        const match = formattedClassOptions.find((o: any) => o.value === first);
        cls = match ? match.label : first;
      }
    } else if (typeof student.className === "string") {
      const match = formattedClassOptions.find(
        (o: any) => o.value === student.className,
      );
      cls = match ? match.label : student.className;
    } else if (student.class) {
      cls = student.class;
    }
    setSelectedClass(cls);
    if (student.advanceBalance !== undefined)
      setStudentAdvanceBalance(student.advanceBalance);
    setEnrollmentId(student.enrollment?._id || "");
  }, [student, formattedClassOptions]);

  const getCurrentAcademicYear = () => String(new Date().getFullYear());
  const getMonths = () => {
    const yr = new Date().getFullYear();
    return MONTHS.map((m) => ({ label: `${m}-${yr}`, value: `${m}-${yr}` }));
  };

  const handleSubmit = async (data: FieldValues) => {
    const studentId = student?._id;
    if (!studentId) {
      toast.error("Student information not found");
      return;
    }

    if (!selectedClass) {
      toast.error("Please select a class");
      return;
    }

    const fees = data.fees || [];
    if (!fees.length) {
      toast.error("Please add at least one fee category");
      return;
    }

    const monthRaw = data.month;
    let month: string;
    if (typeof monthRaw === "object" && monthRaw !== null) {
      month = String(
        monthRaw?.value ||
          monthRaw?.label ||
          `${selectedMonth}-${new Date().getFullYear()}`,
      );
    } else if (typeof monthRaw === "string" && monthRaw.trim()) {
      month = monthRaw.trim();
    } else {
      month = `${selectedMonth}-${new Date().getFullYear()}`;
    }

    const academicYear: string = String(
      data.academicYear || getCurrentAcademicYear(),
    );

    setIsSubmitting(true);
    const createdFees: any[] = [];

    try {
      for (const feeGroup of fees) {
        if (!feeGroup.feeItems || !Array.isArray(feeGroup.feeItems)) {
          console.warn("⚠️ Skipping feeGroup — no feeItems:", feeGroup);
          continue;
        }

        for (const item of feeGroup.feeItems) {
          const amount = parseFloat(item.amount) || 0;
          if (amount <= 0) {
            console.warn("⚠️ Skipping item — amount is 0:", item);
            continue;
          }

          let feeType: string = "";
          if (typeof item.feeType === "string") {
            feeType = item.feeType.trim();
          } else if (
            typeof item.feeType === "object" &&
            item.feeType !== null
          ) {
            feeType = String(
              item.feeType?.value || item.feeType?.label || "",
            ).trim();
          }

          if (!feeType) {
            toast.error("Please select a fee type for all items");
            setIsSubmitting(false);
            return;
          }

          let actualDiscount = parseFloat(item.discount) || 0;
          if (item.discountType === "percentage") {
            actualDiscount = (amount * actualDiscount) / 100;
          }
          actualDiscount = Math.min(actualDiscount, amount);

          const feePayload = {
            student: studentId,
            amount,
            feeType,
            academicYear,
            enrollment: student.enrollment?._id || null,
            class: selectedClass,
            month,
            discount: actualDiscount,
            waiver: 0,
            paidAmount: 0,
            advanceUsed: 0,
            isCurrentMonth: true,
          };
          const result = await createFee({ studentId, ...feePayload }).unwrap();
          createdFees.push(result);
        }
      }

      if (!createdFees.length) {
        toast.error(
          "No valid fee items to create. Please check amounts and fee types.",
        );
        return;
      }

      toast.success(`${createdFees.length} fee(s) created successfully!`);
      if (refetch) refetch();
      setOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.error("❌ API Error:", JSON.stringify(error, null, 2));
      toast.error(
        error?.data?.message ||
          error?.message ||
          "An unexpected error occurred.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultFormValues = {
    academicYear: getCurrentAcademicYear(),
    month: `${selectedMonth}-${new Date().getFullYear()}`,
    className: selectedClass,
    fees: [
      {
        category: [],
        className: selectedClass,
        feeItems: [],
        feeAmount: "",
        selectionMode: "admission",
        categoryName: "",
      },
    ],
    paymentMethod: { label: "Cash", value: "cash" },
    paidAmount: 0,
    totalFees: 0,
    totalDiscount: 0,
    totalAdvance: 0,
    netPayable: 0,
    dueAmount: 0,
  };

  return (
    <CraftModal open={open} setOpen={setOpen} title="Add New Fees" size="xl">
      <CraftForm onSubmit={handleSubmit} defaultValues={defaultFormValues}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              <Typography variant="body2" fontWeight="bold">
                Student: {student?.studentName || student?.name} (
                {student?.studentId})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Class: {selectedClass || "N/A"} | ID: {student?._id}
                {studentAdvanceBalance > 0 && (
                  <Box
                    component="span"
                    sx={{
                      ml: 2,
                      px: 1,
                      py: 0.5,
                      bgcolor: "info.light",
                      borderRadius: 1,
                      fontSize: "0.75rem",
                      color: "info.dark",
                    }}
                  >
                    Advance: ৳{studentAdvanceBalance.toLocaleString()}
                  </Box>
                )}
              </Typography>
            </Alert>
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomCraftIntAutoCompleteWithIcon
              name="month"
              label="Month"
              placeholder="Select Month"
              options={getMonths()}
              fullWidth
              required
              icon={<CalendarMonth color="primary" />}
              multiple={false}
              freeSolo={false}
              onChange={(_: any, value: any) => {
                if (value?.label) setSelectedMonth(value.label.split("-")[0]);
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomCraftInput
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
              enrollmentId={enrollmentId}
              selectedMonth={selectedMonth}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading || isSubmitting || !selectedClass}
              startIcon={
                isLoading || isSubmitting ? <CircularProgress size={20} /> : ""
              }
              size="large"
              sx={{
                py: 1.5,
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
                },
              }}
            >
              {isLoading || isSubmitting ? "Adding Fees..." : "Add Fees"}
            </Button>
          </Grid>
        </Grid>
      </CraftForm>
    </CraftModal>
  );
};

export default AddFeeModal;
