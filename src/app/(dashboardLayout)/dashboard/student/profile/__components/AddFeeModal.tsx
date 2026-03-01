/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react";
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon";
import CraftForm from "@/components/Forms/Form";
import CraftInput from "@/components/Forms/inputWithIcon";
import CraftModal from "@/components/Shared/Modal";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import {
  Class, CalendarMonth, AttachMoney, Add, Delete, Description, Payment, CheckCircle,
} from "@mui/icons-material";
import {
  Alert, Button, Grid, Typography, Box, IconButton, Tooltip, Card, CardContent,
  alpha, useTheme, InputAdornment, Paper, FormControlLabel, Switch, CircularProgress,
  Select, MenuItem, TextField,
} from "@mui/material";
import { FieldValues } from "react-hook-form";
import { useCreateFeeMutation } from "@/redux/api/feesApi";
import toast from "react-hot-toast";
import { useFieldArray, useFormContext } from "react-hook-form";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface AddFeeModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  student: any;
  refetch?: () => void;
  debug?: boolean;
}

interface FeeItem {
  feeType: string;
  amount: number;
  _id: string;
  discount?: number;
  discountType?: "flat" | "percentage";
  advanceAmount?: number;
  isMonthly?: boolean;
  discountRangeStart?: string;
  discountRangeEnd?: string;
  discountRangeAmount?: number;
}

interface FeeCategory {
  _id: string;
  categoryName: string;
  className: string;
  feeItems: FeeItem[];
  createdAt: string;
  updatedAt: string;
}

// ── Prevents Enter key from submitting form ──────────────────
const CustomCraftInput = ({ onKeyDown, ...props }: any) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); e.stopPropagation(); }
    if (onKeyDown) onKeyDown(e);
  };
  return <CraftInput onKeyDown={handleKeyDown} {...props} />;
};

const CustomCraftIntAutoCompleteWithIcon = ({ onKeyDown, ...props }: any) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); e.stopPropagation(); }
    if (onKeyDown) onKeyDown(e);
  };
  return <div onKeyDown={handleKeyDown}><CraftIntAutoCompleteWithIcon {...props} /></div>;
};

// ── Range Discount ───────────────────────────────────────────
const RangeDiscountSection = ({
  feeIndex, itemIndex, item, onApplyRangeDiscount,
}: {
  feeIndex: number; itemIndex: number; item: any;
  onApplyRangeDiscount: (fi: number, ii: number, s: string, e: string, a: number) => void;
}) => {
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [rangeAmt, setRangeAmt] = useState(0);
  return (
    <Grid item xs={12} sx={{ mt: 1 }}>
      <Paper variant="outlined" sx={{ p: 1.5, borderColor: (t) => t.palette.info.main, bgcolor: (t) => alpha(t.palette.info.light, 0.1) }}>
        <Typography variant="caption" color="info.main" fontWeight="bold" sx={{ mb: 1, display: "block" }}>
          Apply Discount to Specific Months:
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
          <Select size="small" value={rangeStart} onChange={(e) => setRangeStart(e.target.value)} displayEmpty sx={{ minWidth: 120, bgcolor: "background.paper" }}>
            <MenuItem value="" disabled>From</MenuItem>
            {MONTHS.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
          </Select>
          <Typography variant="body2">to</Typography>
          <Select size="small" value={rangeEnd} onChange={(e) => setRangeEnd(e.target.value)} displayEmpty sx={{ minWidth: 120, bgcolor: "background.paper" }}>
            <MenuItem value="" disabled>To</MenuItem>
            {MONTHS.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
          </Select>
          <TextField size="small" type="number" placeholder="Amt" value={rangeAmt || ""}
            onChange={(e) => setRangeAmt(parseFloat(e.target.value) || 0)} sx={{ width: 80 }}
            InputProps={{ startAdornment: <InputAdornment position="start">৳</InputAdornment> }} />
          <Button size="small" variant="contained"
            onClick={() => onApplyRangeDiscount(feeIndex, itemIndex, rangeStart, rangeEnd, rangeAmt)}
            sx={{ fontSize: "0.75rem", py: 0.5 }}>Set Range</Button>
        </Box>
        {item.discountRangeStart && item.discountRangeEnd && (
          <Typography variant="caption" color="success.main" sx={{ mt: 1, display: "block", fontWeight: "bold" }}>
            Active: {item.discountRangeStart} to {item.discountRangeEnd} (-৳{item.discountRangeAmount}/mo)
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

// ── Dynamic Fee Fields ────────────────────────────────────────
const DynamicFeeFields = ({
  selectedClass, feeCategories, studentAdvanceBalance, enrollmentId, selectedMonth,
}: {
  selectedClass: string; feeCategories: FeeCategory[];
  studentAdvanceBalance: number; enrollmentId?: string; selectedMonth?: string;
}) => {
  const theme = useTheme();
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "fees" });
  const [showAdmissionFee, setShowAdmissionFee] = useState(false);

  const isAdmissionFee = (v: any) => (typeof v === "string" ? v : v?.value) === "Admission Fee";
  const calcTotal = (items: any[]) => !Array.isArray(items) ? 0 : items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);

  const getCategoryOptions = () => {
    if (!selectedClass || !feeCategories.length) return [];
    return Array.from(new Set(feeCategories.filter((c) => c.className === selectedClass).map((c) => c.categoryName)))
      .map((cat) => ({ label: cat || "General", name: cat || "General", value: cat || "General" }));
  };

  const getFeeTypeOptions = (cls: string) => {
    if (!feeCategories.length) return [];
    const types = new Set<string>();
    feeCategories.forEach((c) => { if (c.className === cls) (c.feeItems || []).forEach((i) => types.add(i.feeType)); });
    let opts = Array.from(types).map((t) => ({ label: t, value: t }));
    if (showAdmissionFee) opts = opts.filter((o) => o.value !== "Admission Fee");
    return opts;
  };

  const handleToggle = (_: any, checked: boolean) => {
    setShowAdmissionFee(checked);
    const current = watch("fees");
    if (!current) return;
    setValue("fees", current.map((g: any) => {
      const items = checked ? (g.feeItems || []).filter((i: any) => !isAdmissionFee(i.feeType)) : (g.feeItems || []);
      return { ...g, feeItems: items, feeAmount: calcTotal(items) };
    }));
  };

  const handleCategoryChange = (index: number, sel: any) => {
    const catVal = Array.isArray(sel) ? (sel[0]?.label || sel[0]) : sel;
    if (!catVal || !selectedClass) return;
    const items: any[] = [];
    feeCategories.filter((c) => c.className === selectedClass && c.categoryName === catVal).forEach((c) => {
      (c.feeItems || []).forEach((item) => {
        if (showAdmissionFee && item.feeType === "Admission Fee") return;
        items.push({
          feeType: { label: item.feeType, value: item.feeType },
          amount: item.amount || 0, discount: 0, discountType: "flat",
          advanceAmount: 0, isSelected: true,
          isMonthly: item.feeType.toLowerCase().includes("monthly"),
          discountRangeStart: "", discountRangeEnd: "", discountRangeAmount: 0,
          id: Date.now() + Math.random(),
        });
      });
    });
    if (items.length > 0) {
      setValue(`fees.${index}.feeItems`, items);
      setValue(`fees.${index}.feeAmount`, calcTotal(items).toString());
      toast.success(`${items.length} fee items loaded`);
    } else {
      setValue(`fees.${index}.feeItems`, []);
      setValue(`fees.${index}.feeAmount`, "");
    }
  };

  const removeFeeItem = (fi: number, ii: number) => {
    const items = (watch(`fees.${fi}.feeItems`) || []).filter((_: any, i: number) => i !== ii);
    setValue(`fees.${fi}.feeItems`, items);
    setValue(`fees.${fi}.feeAmount`, calcTotal(items).toString());
  };

  const handleFeeTypeChange = (fi: number, ii: number, val: any) => {
    const items = [...(watch(`fees.${fi}.feeItems`) || [])];
    if (!items[ii]) return;
    items[ii] = { ...items[ii], feeType: val, isMonthly: val?.value?.toLowerCase().includes("monthly") || false };
    if (val && feeCategories.length > 0) {
      const fts = typeof val === "string" ? val : val?.value;
      const found = feeCategories.find((c) => c.className === selectedClass)?.feeItems?.find((f) => f.feeType === fts);
      if (found?.amount) items[ii].amount = found.amount;
    }
    setValue(`fees.${fi}.feeItems`, items);
    setValue(`fees.${fi}.feeAmount`, calcTotal(items).toString());
  };

  const handleFieldChange = (fi: number, ii: number, field: string, val: any) => {
    const items = [...(watch(`fees.${fi}.feeItems`) || [])];
    if (items[ii]) { items[ii][field] = val; setValue(`fees.${fi}.feeItems`, items); }
  };

  const handleAdvanceChange = (fi: number, ii: number, val: string) => {
    const items = [...(watch(`fees.${fi}.feeItems`) || [])];
    if (items[ii]) { items[ii].advanceAmount = parseFloat(val) || 0; setValue(`fees.${fi}.feeItems`, items); }
  };

  const handleRangeDiscount = (fi: number, ii: number, start: string, end: string, amt: number) => {
    if (!start || !end) { toast.error("Please select start and end month"); return; }
    if (amt <= 0) { toast.error("Please enter a valid discount amount"); return; }
    setValue(`fees.${fi}.feeItems.${ii}.discountRangeStart`, start);
    setValue(`fees.${fi}.feeItems.${ii}.discountRangeEnd`, end);
    setValue(`fees.${fi}.feeItems.${ii}.discountRangeAmount`, amt);
    toast.success(`Discount set: ${start} to ${end} (৳${amt}/month)`);
  };

  const addFeeField = () => append({ category: [], className: selectedClass, feeItems: [], feeAmount: "", selectionMode: "admission" });
  const removeFeeField = (i: number) => fields.length > 1 ? remove(i) : toast.error("At least one fee entry is required");

  const categoryOptions = getCategoryOptions();
  const feeTypeOptions = getFeeTypeOptions(selectedClass);

  return (
    <Card elevation={0} sx={{ mb: 2, borderRadius: 3, overflow: "hidden", border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, background: "#fff" }}>
      <Box sx={{ p: 2.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
        <Box>
          <Typography variant="h6" fontWeight="600">Fee Details</Typography>
          <Typography variant="caption" color="text.secondary">Configure fees for {selectedMonth || "enrollment"}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControlLabel control={<Switch checked={showAdmissionFee} onChange={handleToggle} />} label="Hide Admission Fee" sx={{ mr: 0 }} />
          <Button onClick={addFeeField} size="medium" variant="contained" disabled={!selectedClass} sx={{ textTransform: "none", fontWeight: "bold" }}>
            <Add sx={{ fontSize: 18, mr: 0.5 }} /> Add Category
          </Button>
        </Box>
      </Box>

      <CardContent sx={{ p: 3 }}>
        {fields.map((field, index) => {
          const feeCategory = watch(`fees.${index}.category`);
          const feeItems = watch(`fees.${index}.feeItems`) || [];
          const feeAmount = parseFloat(watch(`fees.${index}.feeAmount`) || 0);
          const selectionMode = watch(`fees.${index}.selectionMode`) || "admission";

          return (
            <Box key={field.id} sx={{ mb: 3, p: 3, borderRadius: 2, background: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, position: "relative" }}>
              {index > 0 && (
                <Tooltip title="Remove Fee Category">
                  <IconButton onClick={() => removeFeeField(index)} sx={{ position: "absolute", top: 8, right: 8, color: "text.disabled", width: 24, height: 24, "&:hover": { color: "error.main", bgcolor: alpha(theme.palette.error.main, 0.1) } }}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: theme.palette.primary.main, mr: 1.5 }} />
                <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: 1 }}>
                  Fee Category #{index + 1}
                </Typography>
              </Box>

              <Grid container spacing={2.5} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                  <CraftInput name={`fees.${index}.className`} margin="none" label="Class" fullWidth size="small" value={selectedClass} disabled
                    InputProps={{ startAdornment: <InputAdornment position="start"><Class sx={{ color: "text.secondary" }} /></InputAdornment> }} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomCraftIntAutoCompleteWithIcon
                    name={`fees.${index}.category`}
                    label={<span>Category <span style={{ color: "red" }}>*</span></span>}
                    margin="none" size="small"
                    placeholder={selectedClass ? "Select Category" : "Select class first"}
                    options={categoryOptions.map((o) => ({ label: String(o.label), value: String(o.value), name: String(o.name) }))}
                    fullWidth multiple icon={<CalendarMonth color="primary" />} disabled={!selectedClass}
                    onChange={(_: any, value: any) => handleCategoryChange(index, value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ height: "100%", display: "flex", alignItems: "center", bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${alpha(theme.palette.divider, 0.2)}`, borderRadius: 1, px: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {selectionMode === "all" ? "All Fees" : "Admission Fee Only"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {feeCategory && feeCategory.length > 0 ? (
                feeItems.length > 0 ? (
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "primary.main" }}>📋 Fee Items ({feeItems.length} items)</Typography>
                      <Button size="small" variant="outlined"
                        onClick={() => setValue(`fees.${index}.feeItems`, [...feeItems, { feeType: "", amount: 0, discount: 0, discountType: "flat", advanceAmount: 0, isSelected: true, isMonthly: false, discountRangeStart: "", discountRangeEnd: "", discountRangeAmount: 0, id: Date.now() }])}>
                        <Add fontSize="small" /> Add Custom Item
                      </Button>
                    </Box>

                    <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(theme.palette.background.paper, 0.7), border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, borderRadius: 1 }}>
                      <Grid container spacing={2}>
                        {/* Header */}
                        <Grid item xs={12}>
                          <Grid container spacing={2} sx={{ mb: 1, pb: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}` }}>
                            <Grid item xs={4}><Typography variant="caption" fontWeight="bold" color="text.secondary">FEE TYPE</Typography></Grid>
                            <Grid item xs={2.5}><Typography variant="caption" fontWeight="bold" color="text.secondary">AMOUNT</Typography></Grid>
                            <Grid item xs={2.5}><Typography variant="caption" fontWeight="bold" color="text.secondary">DISCOUNT</Typography></Grid>
                            <Grid item xs={2}><Typography variant="caption" fontWeight="bold" color="text.secondary">ADVANCE</Typography></Grid>
                            <Grid item xs={1} />
                          </Grid>
                        </Grid>

                        {/* Rows */}
                        {feeItems.map((item: any, itemIndex: number) => (
                          <Grid item xs={12} key={item.id || itemIndex}>
                            <Grid container spacing={2} alignItems="center" sx={{ mb: 1, bgcolor: item.isMonthly ? alpha(theme.palette.info.light, 0.15) : "transparent", p: 0.5, borderRadius: 1 }}>
                              <Grid item xs={4}>
                                <CustomCraftIntAutoCompleteWithIcon
                                  name={`fees.${index}.feeItems.${itemIndex}.feeType`}
                                  label="" options={feeTypeOptions} size="small" fullWidth placeholder="Select Fee Type"
                                  multiple={false} freeSolo icon={<Description color="disabled" sx={{ fontSize: 16 }} />}
                                  disabled={!selectedClass}
                                  isOptionEqualToValue={(o: any, v: any) => {
                                    if (!o || !v) return false;
                                    return (typeof o === "string" ? o : o.value) === (typeof v === "string" ? v : v.value);
                                  }}
                                  onChange={(e: any, val: any) => handleFeeTypeChange(index, itemIndex, val)}
                                />
                              </Grid>
                              <Grid item xs={2.5}>
                                <CustomCraftInput name={`fees.${index}.feeItems.${itemIndex}.amount`} label="" fullWidth size="small" type="number"
                                  InputProps={{ startAdornment: <InputAdornment position="start"><Typography variant="body2" color="text.secondary">৳</Typography></InputAdornment> }}
                                  onChange={(e: any) => handleFieldChange(index, itemIndex, "amount", parseFloat(e.target.value) || 0)} />
                              </Grid>
                              <Grid item xs={2.5}>
                                <CustomCraftInput name={`fees.${index}.feeItems.${itemIndex}.discount`} label="" fullWidth size="small" type="number" placeholder="0"
                                  InputProps={{ startAdornment: <InputAdornment position="start"><Typography variant="body2" color="text.secondary">৳</Typography></InputAdornment> }}
                                  onChange={(e: any) => handleFieldChange(index, itemIndex, "discount", parseFloat(e.target.value) || 0)} />
                              </Grid>
                              <Grid item xs={2}>
                                <CustomCraftInput name={`fees.${index}.feeItems.${itemIndex}.advanceAmount`} label="" fullWidth size="small" type="number"
                                  disabled={!selectedClass || !item.amount}
                                  InputProps={{ startAdornment: <InputAdornment position="start"><Typography variant="body2" color="text.secondary">৳</Typography></InputAdornment> }}
                                  onChange={(e: any) => handleAdvanceChange(index, itemIndex, e.target.value)} />
                              </Grid>
                              <Grid item xs={1} sx={{ display: "flex", justifyContent: "center" }}>
                                <Tooltip title="Remove"><IconButton size="small" onClick={() => removeFeeItem(index, itemIndex)} sx={{ color: "error.main" }}><Delete fontSize="small" /></IconButton></Tooltip>
                              </Grid>
                              {item.isMonthly && <RangeDiscountSection feeIndex={index} itemIndex={itemIndex} item={item} onApplyRangeDiscount={handleRangeDiscount} />}
                            </Grid>
                          </Grid>
                        ))}

                        {/* Totals */}
                        <Grid item xs={12}>
                          <Box sx={{ mt: 2, pt: 2, borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.2)}` }}>
                            <Grid container spacing={2}>
                              <Grid item xs={4}><Typography variant="body1" fontWeight="bold" color="primary.main">TOTAL</Typography></Grid>
                              <Grid item xs={2.5}>
                                <CraftInput name={`fees.${index}.feeAmount`} label="" fullWidth size="small" type="number" disabled value={feeAmount}
                                  InputProps={{ startAdornment: <InputAdornment position="start"><Typography variant="body2" color="text.secondary">৳</Typography></InputAdornment>, readOnly: true }}
                                  sx={{ "& .MuiInputBase-input": { backgroundColor: alpha(theme.palette.primary.light, 0.1), fontWeight: "bold", fontSize: "1.1rem", color: theme.palette.primary.main } }} />
                              </Grid>
                              <Grid item xs={2.5}>
                                <Box sx={{ p: 1.5, bgcolor: alpha(theme.palette.warning.light, 0.1), borderRadius: 1, border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}` }}>
                                  <Typography variant="body2" color="warning.main" align="center">
                                    Disc: ৳{feeItems.reduce((sum: number, it: any) => {
                                      let d = parseFloat(it.discount) || 0;
                                      const a = parseFloat(it.amount) || 0;
                                      if (it.discountType === "percentage") d = (a * d) / 100;
                                      let rd = 0;
                                      if (it.isMonthly && it.discountRangeStart && it.discountRangeEnd && it.discountRangeAmount) {
                                        const si = MONTHS.indexOf(it.discountRangeStart), ei = MONTHS.indexOf(it.discountRangeEnd);
                                        if (si !== -1 && ei !== -1 && si <= ei) rd = (parseFloat(it.discountRangeAmount) || 0) * (ei - si + 1);
                                      }
                                      return sum + d + rd;
                                    }, 0).toLocaleString()}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={2}>
                                <Box sx={{ p: 1.5, bgcolor: alpha(theme.palette.info.light, 0.1), borderRadius: 1, border: `1px solid ${alpha(theme.palette.info.main, 0.2)}` }}>
                                  <Typography variant="body2" color="info.main" align="center">
                                    Advance: ৳{feeItems.reduce((s: number, i: any) => s + (parseFloat(i.advanceAmount) || 0), 0).toLocaleString()}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={1} />
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center", py: 3, color: "text.disabled" }}>
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
            <Typography variant="body2">{!selectedClass ? "Select a class first to add fees" : "No fee categories added yet"}</Typography>
            <Button onClick={addFeeField} variant="outlined" sx={{ mt: 2 }} startIcon={<Add />} disabled={!selectedClass}>Add First Category</Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// ── Payment Summary ───────────────────────────────────────────
const PaymentSummary = ({ studentAdvanceBalance = 0 }: { studentAdvanceBalance?: number }) => {
  const theme = useTheme();
  const { watch, setValue } = useFormContext();
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");

  const paymentOptions = [
    { label: "Cash", value: "cash" }, { label: "bKash", value: "bkash" },
    { label: "Nagad", value: "nagad" }, { label: "Bank Transfer", value: "bank" }, { label: "Online", value: "online" },
  ];

  const totalFees = (watch("fees") || []).reduce((t: number, f: any) => t + (f.feeItems || []).reduce((s: number, i: any) => s + (parseFloat(i.amount) || 0), 0), 0);

  const totalDiscount = (watch("fees") || []).reduce((t: number, f: any) => t + (f.feeItems || []).reduce((s: number, i: any) => {
    let d = parseFloat(i.discount) || 0;
    const a = parseFloat(i.amount) || 0;
    if (i.discountType === "percentage") d = (a * d) / 100;
    let rd = 0;
    if (i.isMonthly && i.discountRangeStart && i.discountRangeEnd && i.discountRangeAmount) {
      const si = MONTHS.indexOf(i.discountRangeStart), ei = MONTHS.indexOf(i.discountRangeEnd);
      if (si !== -1 && ei !== -1 && si <= ei) rd = (parseFloat(i.discountRangeAmount) || 0) * (ei - si + 1);
    }
    return s + d + rd;
  }, 0), 0);

  const totalAdvance = (watch("fees") || []).reduce((t: number, f: any) => t + (f.feeItems || []).reduce((s: number, i: any) => s + (parseFloat(i.advanceAmount) || 0), 0), 0);
  const netPayable = totalFees - totalDiscount;
  const dueAmount = Math.max(0, netPayable - totalAdvance - paidAmount);

  useEffect(() => {
    setValue("totalFees", totalFees);
    setValue("totalDiscount", totalDiscount);
    setValue("totalAdvance", totalAdvance);
    setValue("netPayable", netPayable);
    setValue("paidAmount", paidAmount);
    setValue("dueAmount", dueAmount);
    setValue("paymentMethod", paymentMethod);
  }, [totalFees, totalDiscount, totalAdvance, netPayable, paidAmount, dueAmount, paymentMethod]);

  return (
    <Card elevation={2} sx={{ borderRadius: 3, overflow: "hidden", border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, background: "#fff", mt: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
              <Typography variant="h6" fontWeight="bold">Payment Summary</Typography>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="h4" color="primary.main" fontWeight="800">৳{totalFees.toLocaleString()}</Typography>
                <Typography variant="caption" color="text.secondary">Total Fees</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {[
                { label: "Total Discount", val: `-৳${totalDiscount.toLocaleString()}`, color: "warning.main", bg: alpha(theme.palette.warning.light, 0.1) },
                { label: "Net Payable", val: `৳${netPayable.toLocaleString()}`, color: "primary.main", bg: alpha(theme.palette.primary.light, 0.1) },
                { label: "Advance Used", val: `৳${totalAdvance.toLocaleString()}`, color: "info.main", bg: alpha(theme.palette.info.light, 0.1) },
              ].map((item) => (
                <Grid item xs={4} key={item.label}>
                  <Paper sx={{ p: 2, textAlign: "center", bgcolor: item.bg }}>
                    <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                    <Typography variant="h6" color={item.color}>{item.val}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600 }}>Payment Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomCraftInput name="paidAmount" label="Pay Additional Amount Now" placeholder="0" type="number" fullWidth size="small"
                  value={paidAmount.toString()} onChange={(e: any) => setPaidAmount(parseFloat(e.target.value) || 0)}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Typography variant="body2" color="text.secondary">৳</Typography></InputAdornment> }} />
                {studentAdvanceBalance > 0 && (
                  <Typography variant="caption" color="info.main" sx={{ mt: 1, display: "block" }}>
                    Available Advance Balance: ৳{studentAdvanceBalance.toLocaleString()}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomCraftIntAutoCompleteWithIcon name="paymentMethod" label="Payment Method" options={paymentOptions}
                  size="small" multiple={false} icon={<Payment />} disableClearable fullWidth
                  onChange={(_: any, value: any) => setPaymentMethod(value?.value as string)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{
              mt: 1, p: 3, borderRadius: 2, textAlign: "center",
              bgcolor: alpha(dueAmount > 0 ? theme.palette.error.light : theme.palette.success.light, 0.1),
              border: `1px solid ${alpha(dueAmount > 0 ? theme.palette.error.main : theme.palette.success.main, 0.2)}`
            }}>
              {dueAmount > 0 ? (
                <Box>
                  <Typography variant="body2" color="text.secondary">Due Amount after payment</Typography>
                  <Typography variant="h4" fontWeight="bold" color="error.main">৳{dueAmount.toLocaleString()}</Typography>
                  <Typography variant="caption" color="text.secondary">Status: Partial Payment</Typography>
                </Box>
              ) : (
                <Box>
                  <CheckCircle sx={{ fontSize: 40, color: theme.palette.success.main, mb: 1 }} />
                  <Typography variant="h5" fontWeight="bold" color="success.main">Fully Paid</Typography>
                  <Typography variant="caption" color="text.secondary">All fees have been paid in full</Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// ── Main Modal ────────────────────────────────────────────────
const AddFeeModal = ({ open, setOpen, student, refetch, }: AddFeeModalProps) => {
  const theme = useTheme();
  const [createFee, { isLoading }] = useCreateFeeMutation();
  const { classOptions, feeCategoryData } = useAcademicOption();
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [feeCategories, setFeeCategories] = useState<FeeCategory[]>([]);
  const [studentAdvanceBalance, setStudentAdvanceBalance] = useState<number>(0);
  const [enrollmentId, setEnrollmentId] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toLocaleString("default", { month: "long" }));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  console.log('student ', student)
  const formattedClassOptions = useMemo(() =>
    classOptions.map((o: any) => ({ ...o, label: o.label || o.name || "Unnamed Class", value: o.value || o.id || "" })),
    [classOptions]
  );

  useEffect(() => {
    if (feeCategoryData?.data?.data) setFeeCategories(feeCategoryData.data.data);
  }, [feeCategoryData]);

  useEffect(() => {
    if (!student) return;
    let cls = "";
    if (Array.isArray(student.className)) {
      const first = student.className[0];
      if (first?.className) cls = first.className;
      else if (typeof first === "object") cls = first.name || first.label || first.className || "";
      else if (typeof first === "string") {
        const match = formattedClassOptions.find((o: any) => o.value === first);
        cls = match ? match.label : first;
      }
    } else if (typeof student.className === "string") {
      const match = formattedClassOptions.find((o: any) => o.value === student.className);
      cls = match ? match.label : student.className;
    } else if (student.class) {
      cls = student.class;
    }
    setSelectedClass(cls);
    if (student.advanceBalance !== undefined) setStudentAdvanceBalance(student.advanceBalance);
    setEnrollmentId(student.enrollment?._id || "");
  }, [student, formattedClassOptions]);

  const getCurrentAcademicYear = () => String(new Date().getFullYear());
  const getMonths = () => {
    const yr = new Date().getFullYear();
    return MONTHS.map((m) => ({ label: `${m}-${yr}`, value: `${m}-${yr}` }));
  };
  const handleSubmit = async (data: FieldValues) => {
    console.log("🔥 RAW FORM DATA:", JSON.stringify(data, null, 2));

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

    // ✅ Fix month extraction
    const monthRaw = data.month;
    let month: string;
    if (typeof monthRaw === "object" && monthRaw !== null) {
      month = String(monthRaw?.value || monthRaw?.label || `${selectedMonth}-${new Date().getFullYear()}`);
    } else if (typeof monthRaw === "string" && monthRaw.trim()) {
      month = monthRaw.trim();
    } else {
      month = `${selectedMonth}-${new Date().getFullYear()}`;
    }

    const academicYear: string = String(data.academicYear || getCurrentAcademicYear());

    console.log("📅 Month:", month, "| Academic Year:", academicYear);

    setIsSubmitting(true);
    const createdFees: any[] = [];

    try {
      for (const feeGroup of fees) {
        if (!feeGroup.feeItems || !Array.isArray(feeGroup.feeItems)) {
          console.warn("⚠️ Skipping feeGroup — no feeItems:", feeGroup);
          continue;
        }

        for (const item of feeGroup.feeItems) {
          console.log("🔍 Processing item:", JSON.stringify(item, null, 2));

          const amount = parseFloat(item.amount) || 0;
          if (amount <= 0) {
            console.warn("⚠️ Skipping item — amount is 0:", item);
            continue;
          }

          // ✅ Fix feeType extraction
          let feeType: string = "";
          if (typeof item.feeType === "string") {
            feeType = item.feeType.trim();
          } else if (typeof item.feeType === "object" && item.feeType !== null) {
            feeType = String(item.feeType?.value || item.feeType?.label || "").trim();
          }

          console.log("🏷️ Extracted feeType:", feeType);

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

          console.log("📤 Sending payload to API:", JSON.stringify(feePayload, null, 2));

          // IMPORTANT: Pass the payload directly as the second argument
          // The mutation expects: { studentId, feePayload }
          const result = await createFee({ studentId, ...feePayload }).unwrap();

          console.log("✅ Fee created:", result);
          createdFees.push(result);
        }
      }

      if (!createdFees.length) {
        toast.error("No valid fee items to create. Please check amounts and fee types.");
        return;
      }

      toast.success(`${createdFees.length} fee(s) created successfully!`);
      if (refetch) refetch();
      setOpen(false);

    } catch (error: any) {
      console.error("❌ API Error:", JSON.stringify(error, null, 2));
      toast.error(error?.data?.message || error?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultFormValues = {
    academicYear: getCurrentAcademicYear(),
    month: `${selectedMonth}-${new Date().getFullYear()}`,
    className: selectedClass,
    fees: [{ category: [], className: selectedClass, feeItems: [], feeAmount: "", selectionMode: "admission" }],
    paymentMethod: { label: "Cash", value: "cash" },
    paidAmount: 0, totalFees: 0, totalDiscount: 0, totalAdvance: 0, netPayable: 0, dueAmount: 0,
  };

  return (
    <CraftModal open={open} setOpen={setOpen} title='Add New Fees' size="xl">
      <CraftForm onSubmit={handleSubmit} defaultValues={defaultFormValues}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              <Typography variant="body2" fontWeight="bold">
                Student: {student?.studentName || student?.name} ({student?.studentId})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Class: {selectedClass || "N/A"} | ID: {student?._id}
                {studentAdvanceBalance > 0 && (
                  <Box component="span" sx={{ ml: 2, px: 1, py: 0.5, bgcolor: "info.light", borderRadius: 1, fontSize: "0.75rem", color: "info.dark" }}>
                    Advance: ৳{studentAdvanceBalance.toLocaleString()}
                  </Box>
                )}
              </Typography>
            </Alert>
          </Grid>



          <Grid item xs={12} md={6}>
            <CustomCraftIntAutoCompleteWithIcon
              name="month" label="Month" placeholder="Select Month" options={getMonths()}
              fullWidth required icon={<CalendarMonth color="primary" />} multiple={false} freeSolo={false}
              onChange={(_: any, value: any) => { if (value?.label) setSelectedMonth(value.label.split("-")[0]); }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomCraftInput name="academicYear" label="Academic Year" fullWidth size="small" value={getCurrentAcademicYear()}
              InputProps={{ startAdornment: <InputAdornment position="start"><CalendarMonth sx={{ color: "text.secondary" }} /></InputAdornment> }} />
          </Grid>

          <Grid item xs={12}>
            <DynamicFeeFields selectedClass={selectedClass} feeCategories={feeCategories}
              studentAdvanceBalance={studentAdvanceBalance} enrollmentId={enrollmentId} selectedMonth={selectedMonth} />
          </Grid>

          <Grid item xs={12}>
            <PaymentSummary studentAdvanceBalance={studentAdvanceBalance} />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth
              disabled={isLoading || isSubmitting || !selectedClass}
              startIcon={isLoading || isSubmitting ? <CircularProgress size={20} /> : <AttachMoney />}
              size="large"
              sx={{ py: 1.5, background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", "&:hover": { background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)" } }}>
              {isLoading || isSubmitting ? "Adding Fees..." : 'Add Fees'}
            </Button>
          </Grid>
        </Grid>
      </CraftForm>
    </CraftModal>
  );
};

export default AddFeeModal;