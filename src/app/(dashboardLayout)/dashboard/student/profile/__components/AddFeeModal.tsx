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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
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
const CURRENT_MONTH = MONTHS[new Date().getMonth()];

// ─────────────────────────────────────────────
// Helpers: prevent Enter from submitting form
// ─────────────────────────────────────────────
const stopEnter = (e: React.KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault();
    e.stopPropagation();
  }
};

const CustomCraftInput = ({ onKeyDown, ...props }: any) => (
  <CraftInput
    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
      stopEnter(e);
      onKeyDown?.(e);
    }}
    {...props}
  />
);

const CustomCraftIntAutoCompleteWithIcon = ({ onKeyDown, ...props }: any) => (
  <div
    onKeyDown={(e) => {
      stopEnter(e);
      onKeyDown?.(e);
    }}
  >
    <CraftIntAutoCompleteWithIcon {...props} />
  </div>
);

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface FeeItem {
  id: string;
  feeType: string; // always a plain string — never an object
  amount: number;
  discount: number;
  discountType: "flat" | "percentage";
  advanceAmount: number;
  isSelected: boolean;
  isMonthly: boolean;
  isCustom: boolean;
  discountRangeStart: string;
  discountRangeEnd: string;
  discountRangeAmount: number;
}

interface FeeGroup {
  id: string;
  categoryName: string;
  feeItems: FeeItem[];
}

const makeItem = (partial: Partial<FeeItem> = {}): FeeItem => ({
  id: `${Date.now()}_${Math.random()}`,
  feeType: "",
  amount: 0,
  discount: 0,
  discountType: "flat",
  advanceAmount: 0,
  isSelected: true,
  isMonthly: false,
  isCustom: false,
  discountRangeStart: "",
  discountRangeEnd: "",
  discountRangeAmount: 0,
  ...partial,
});

const makeGroup = (): FeeGroup => ({
  id: `group_${Date.now()}_${Math.random()}`,
  categoryName: "",
  feeItems: [],
});

const calcTotal = (items: FeeItem[]) =>
  items.reduce((s, i) => s + (i.amount || 0), 0);

// ─────────────────────────────────────────────
// Range Discount Section (pure UI, no RHF)
// ─────────────────────────────────────────────
const RangeDiscountSection = ({
  item,
  onApply,
}: {
  item: FeeItem;
  onApply: (start: string, end: string, amt: number) => void;
}) => {
  const [rangeStart, setRangeStart] = useState(item.discountRangeStart || "");
  const [rangeEnd, setRangeEnd] = useState(item.discountRangeEnd || "");
  const [rangeAmt, setRangeAmt] = useState(item.discountRangeAmount || 0);

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
            onClick={() => onApply(rangeStart, rangeEnd, rangeAmt)}
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

// ─────────────────────────────────────────────
// FeeItemRow — fully uncontrolled inputs via refs
// This is the KEY fix: we use uncontrolled <input> refs so typing
// never triggers a re-render that clears the field.
// ─────────────────────────────────────────────
const FeeItemRow = ({
  item,
  feeTypeOptions,
  selectedClass,
  selectedMonth,
  hideMonthlyFee,
  hideAdmissionFee,
  onRemove,
  onFieldChange,
  onRangeDiscount,
}: {
  item: FeeItem;
  feeTypeOptions: { label: string; value: string }[];
  selectedClass: string;
  selectedMonth: string;
  hideMonthlyFee: boolean;
  hideAdmissionFee: boolean;
  onRemove: () => void;
  onFieldChange: (field: keyof FeeItem, val: any) => void;
  onRangeDiscount: (start: string, end: string, amt: number) => void;
}) => {
  const theme = useTheme();
  const amountRef = useRef<HTMLInputElement>(null);
  const discountRef = useRef<HTMLInputElement>(null);
  const advanceRef = useRef<HTMLInputElement>(null);

  // Sync ref values when item changes from outside (e.g., initial load)
  useEffect(() => {
    if (amountRef.current && document.activeElement !== amountRef.current)
      amountRef.current.value = String(item.amount || "");
  }, [item.amount]);

  useEffect(() => {
    if (discountRef.current && document.activeElement !== discountRef.current)
      discountRef.current.value = String(item.discount || "");
  }, [item.discount]);

  useEffect(() => {
    if (advanceRef.current && document.activeElement !== advanceRef.current)
      advanceRef.current.value = String(item.advanceAmount || "");
  }, [item.advanceAmount]);

  if (hideMonthlyFee && item.isMonthly) return null;
  if (hideAdmissionFee && item.feeType === "Admission Fee") return null;

  const feeLabel = item.isMonthly
    ? `${item.feeType} - ${selectedMonth || CURRENT_MONTH}`
    : item.feeType;

  return (
    <Grid item xs={12}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          mb: 1,
          bgcolor: item.isMonthly
            ? alpha(theme.palette.info.light, 0.15)
            : "transparent",
          p: 0.5,
          borderRadius: 1,
        }}
      >
        {/* Fee Type */}
        <Grid item xs={4}>
          {item.isMonthly ? (
            <TextField
              fullWidth
              size="small"
              disabled
              value={feeLabel}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description color="disabled" sx={{ fontSize: 16 }} />
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            // KEY FIX: use a plain uncontrolled TextField for fee type
            // so typing never triggers parent re-render / clear
            <TextField
              fullWidth
              size="small"
              defaultValue={item.feeType}
              placeholder="Type fee name or select…"
              disabled={!selectedClass}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description color="disabled" sx={{ fontSize: 16 }} />
                  </InputAdornment>
                ),
              }}
              onBlur={(e) => {
                const val = e.target.value.trim();
                if (val !== item.feeType) {
                  onFieldChange("feeType", val);
                  onFieldChange(
                    "isMonthly",
                    val.toLowerCase().includes("monthly"),
                  );
                  onFieldChange("isCustom", true);
                }
              }}
              onKeyDown={stopEnter}
            />
          )}
        </Grid>

        {/* Amount */}
        <Grid item xs={2.5}>
          <TextField
            fullWidth
            size="small"
            type="number"
            inputRef={amountRef}
            defaultValue={item.amount || ""}
            placeholder="0"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary">
                    ৳
                  </Typography>
                </InputAdornment>
              ),
            }}
            onBlur={(e) => {
              const val = parseFloat(e.target.value) || 0;
              if (val !== item.amount) onFieldChange("amount", val);
            }}
            onKeyDown={stopEnter}
          />
        </Grid>

        {/* Discount */}
        <Grid item xs={2.5}>
          <TextField
            fullWidth
            size="small"
            type="number"
            inputRef={discountRef}
            defaultValue={item.discount || ""}
            placeholder="0"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary">
                    ৳
                  </Typography>
                </InputAdornment>
              ),
            }}
            onBlur={(e) => {
              const val = parseFloat(e.target.value) || 0;
              if (val !== item.discount) onFieldChange("discount", val);
            }}
            onKeyDown={stopEnter}
          />
        </Grid>

        {/* Advance */}
        <Grid item xs={2}>
          <TextField
            fullWidth
            size="small"
            type="number"
            inputRef={advanceRef}
            defaultValue={item.advanceAmount || ""}
            placeholder="0"
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
            onBlur={(e) => {
              const val = parseFloat(e.target.value) || 0;
              if (val !== item.advanceAmount)
                onFieldChange("advanceAmount", val);
            }}
            onKeyDown={stopEnter}
          />
        </Grid>

        {/* Delete */}
        <Grid item xs={1} sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Remove">
            <IconButton
              size="small"
              onClick={onRemove}
              sx={{ color: "error.main" }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>

        {/* Range Discount — only for monthly items */}
        {item.isMonthly && !hideMonthlyFee && (
          <RangeDiscountSection item={item} onApply={onRangeDiscount} />
        )}
      </Grid>
    </Grid>
  );
};

// ─────────────────────────────────────────────
// DynamicFeeFields — manages groups via useState
// (not useFieldArray) so RHF watch() can't clear state
// ─────────────────────────────────────────────
const DynamicFeeFields = ({
  selectedClass,
  feeCategories,
  selectedMonth,
  onGroupsChange, // callback to sync groups up to parent for submit
}: {
  selectedClass: string;
  feeCategories: FeeCategory[];
  studentAdvanceBalance: number;
  enrollmentId?: string;
  selectedMonth?: string;
  onGroupsChange: (groups: FeeGroup[]) => void;
}) => {
  const theme = useTheme();
  const [groups, setGroups] = useState<FeeGroup[]>([makeGroup()]);
  const [hideAdmissionFee, setHideAdmissionFee] = useState(false);
  const [hideMonthlyFee, setHideMonthlyFee] = useState(false);

  // Keep parent in sync whenever groups change
  useEffect(() => {
    onGroupsChange(groups);
  }, [groups, onGroupsChange]);

  // ── Category options ──────────────────────────
  const categoryOptions = useMemo(() => {
    if (!selectedClass || !feeCategories.length) return [];
    return Array.from(
      new Set(
        feeCategories
          .filter((c) => c.className === selectedClass)
          .map((c) => c.categoryName),
      ),
    ).map((cat) => ({ label: cat || "General", value: cat || "General" }));
  }, [selectedClass, feeCategories]);

  // ── Fee type options ──────────────────────────
  const feeTypeOptions = useMemo(() => {
    if (!feeCategories.length) return [];
    const types = new Set<string>();
    feeCategories.forEach((c) => {
      if (c.className !== selectedClass) return;
      (c.feeItems || []).forEach((i) => {
        if (hideAdmissionFee && i.feeType === "Admission Fee") return;
        if (hideMonthlyFee && i.feeType.toLowerCase().includes("monthly"))
          return;
        types.add(i.feeType);
      });
    });
    return Array.from(types).map((t) => ({ label: t, value: t }));
  }, [feeCategories, selectedClass, hideAdmissionFee, hideMonthlyFee]);

  // ── Build items from a category ───────────────
  const buildItemsFromCategory = useCallback(
    (
      catName: string,
      skipAdmission = false,
      skipMonthly = false,
    ): FeeItem[] => {
      const items: FeeItem[] = [];
      feeCategories
        .filter(
          (c) => c.className === selectedClass && c.categoryName === catName,
        )
        .forEach((c) => {
          (c.feeItems || []).forEach((fi) => {
            if (skipAdmission && fi.feeType === "Admission Fee") return;
            if (skipMonthly && fi.feeType.toLowerCase().includes("monthly"))
              return;
            items.push(
              makeItem({
                feeType: fi.feeType,
                amount: fi.amount || 0,
                isMonthly: fi.feeType.toLowerCase().includes("monthly"),
              }),
            );
          });
        });
      return items;
    },
    [feeCategories, selectedClass],
  );

  // ── Toggle: Hide Admission Fee ────────────────
  const handleAdmissionToggle = useCallback(
    (_: any, checked: boolean) => {
      setHideAdmissionFee(checked);
      setGroups((prev) =>
        prev.map((g) => {
          if (!g.categoryName) return g;
          const updated = checked
            ? g.feeItems.filter((i) => i.feeType !== "Admission Fee")
            : buildItemsFromCategory(g.categoryName, false, hideMonthlyFee);
          return { ...g, feeItems: updated };
        }),
      );
    },
    [buildItemsFromCategory, hideMonthlyFee],
  );

  // ── Toggle: Hide Monthly Fee ──────────────────
  const handleMonthlyToggle = useCallback(
    (_: any, checked: boolean) => {
      setHideMonthlyFee(checked);
      setGroups((prev) =>
        prev.map((g) => {
          if (!g.categoryName) return g;
          const updated = checked
            ? g.feeItems.filter((i) => !i.isMonthly)
            : buildItemsFromCategory(g.categoryName, hideAdmissionFee, false);
          return { ...g, feeItems: updated };
        }),
      );
    },
    [buildItemsFromCategory, hideAdmissionFee],
  );

  // ── Category selected ─────────────────────────
  const handleCategoryChange = useCallback(
    (groupId: string, catName: string) => {
      if (!catName || !selectedClass) return;
      const items = buildItemsFromCategory(
        catName,
        hideAdmissionFee,
        hideMonthlyFee,
      );
      setGroups((prev) =>
        prev.map((g) =>
          g.id === groupId
            ? { ...g, categoryName: catName, feeItems: items }
            : g,
        ),
      );
      toast.success(`${items.length} fee items loaded`);
    },
    [selectedClass, buildItemsFromCategory, hideAdmissionFee, hideMonthlyFee],
  );

  // ── Item-level mutations ──────────────────────
  const updateItem = useCallback(
    (groupId: string, itemId: string, field: keyof FeeItem, val: any) => {
      setGroups((prev) =>
        prev.map((g) =>
          g.id !== groupId
            ? g
            : {
                ...g,
                feeItems: g.feeItems.map((i) =>
                  i.id !== itemId ? i : { ...i, [field]: val, isCustom: true },
                ),
              },
        ),
      );
    },
    [],
  );

  const updateItemField = useCallback(
    (groupId: string, itemId: string, updates: Partial<FeeItem>) => {
      setGroups((prev) =>
        prev.map((g) =>
          g.id !== groupId
            ? g
            : {
                ...g,
                feeItems: g.feeItems.map((i) =>
                  i.id !== itemId ? i : { ...i, ...updates, isCustom: true },
                ),
              },
        ),
      );
    },
    [],
  );

  const removeItem = useCallback((groupId: string, itemId: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id !== groupId
          ? g
          : { ...g, feeItems: g.feeItems.filter((i) => i.id !== itemId) },
      ),
    );
  }, []);

  const addCustomItem = useCallback((groupId: string) => {
    const newItem = makeItem({ isCustom: true });
    setGroups((prev) =>
      prev.map((g) =>
        g.id !== groupId ? g : { ...g, feeItems: [...g.feeItems, newItem] },
      ),
    );
  }, []);

  const applyRangeDiscount = useCallback(
    (
      groupId: string,
      itemId: string,
      start: string,
      end: string,
      amt: number,
    ) => {
      if (!start || !end) {
        toast.error("Please select start and end month");
        return;
      }
      if (amt <= 0) {
        toast.error("Please enter a valid discount amount");
        return;
      }
      setGroups((prev) =>
        prev.map((g) =>
          g.id !== groupId
            ? g
            : {
                ...g,
                feeItems: g.feeItems.map((i) =>
                  i.id !== itemId
                    ? i
                    : {
                        ...i,
                        discountRangeStart: start,
                        discountRangeEnd: end,
                        discountRangeAmount: amt,
                      },
                ),
              },
        ),
      );
      toast.success(`Discount set: ${start} to ${end} (৳${amt}/month)`);
    },
    [],
  );

  // ── Group add / remove ────────────────────────
  const addGroup = useCallback(
    () => setGroups((prev) => [...prev, makeGroup()]),
    [],
  );
  const removeGroup = useCallback((groupId: string) => {
    setGroups((prev) => {
      if (prev.length <= 1) {
        toast.error("At least one fee entry is required");
        return prev;
      }
      return prev.filter((g) => g.id !== groupId);
    });
  }, []);

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
      {/* Header */}
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
            onClick={addGroup}
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
        {groups.map((group, index) => (
          <Box
            key={group.id}
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
                  onClick={() => removeGroup(group.id)}
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
                <TextField
                  label="Class"
                  size="small"
                  fullWidth
                  disabled
                  value={selectedClass}
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
                {/* 
                  KEY FIX: pass value as a plain string to a normal Select,
                  not to CraftIntAutoCompleteWithIcon whose internal state
                  conflicts with RHF and causes clears.
                */}
                <TextField
                  select
                  label="Category"
                  size="small"
                  fullWidth
                  value={group.categoryName}
                  disabled={!selectedClass}
                  onChange={(e) =>
                    handleCategoryChange(group.id, e.target.value)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth color="primary" />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  {categoryOptions.map((o) => (
                    <MenuItem key={o.value} value={o.value}>
                      {o.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            {group.categoryName ? (
              group.feeItems.length > 0 ? (
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
                      📋 Fee Items (
                      {
                        group.feeItems.filter(
                          (i) =>
                            !(hideMonthlyFee && i.isMonthly) &&
                            !(
                              hideAdmissionFee && i.feeType === "Admission Fee"
                            ),
                        ).length
                      }{" "}
                      items)
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => addCustomItem(group.id)}
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
                      {/* Table Header */}
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
                          {[
                            "FEE TYPE",
                            "AMOUNT",
                            "DISCOUNT",
                            "ADVANCE",
                            "",
                          ].map((h, i) => (
                            <Grid
                              item
                              xs={
                                i === 4
                                  ? 1
                                  : i === 3
                                    ? 2
                                    : i < 2
                                      ? i === 0
                                        ? 4
                                        : 2.5
                                      : 2.5
                              }
                              key={h + i}
                            >
                              <Typography
                                variant="caption"
                                fontWeight="bold"
                                color="text.secondary"
                              >
                                {h}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>

                      {/* Rows */}
                      {group.feeItems.map((item) => (
                        <FeeItemRow
                          key={item.id}
                          item={item}
                          feeTypeOptions={feeTypeOptions}
                          selectedClass={selectedClass}
                          selectedMonth={selectedMonth || CURRENT_MONTH}
                          hideMonthlyFee={hideMonthlyFee}
                          hideAdmissionFee={hideAdmissionFee}
                          onRemove={() => removeItem(group.id, item.id)}
                          onFieldChange={(field, val) => {
                            if (field === "feeType") {
                              updateItemField(group.id, item.id, {
                                feeType: val,
                                isMonthly: String(val)
                                  .toLowerCase()
                                  .includes("monthly"),
                                isCustom: true,
                              });
                            } else {
                              updateItem(group.id, item.id, field, val);
                            }
                          }}
                          onRangeDiscount={(s, e, a) =>
                            applyRangeDiscount(group.id, item.id, s, e, a)
                          }
                        />
                      ))}
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
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ mt: 1 }}
                    onClick={() => addCustomItem(group.id)}
                    startIcon={<Add />}
                  >
                    Add Custom Item
                  </Button>
                </Box>
              )
            ) : null}
          </Box>
        ))}

        {groups.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4, color: "text.disabled" }}>
            <Payment sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
            <Typography variant="body2">
              {!selectedClass
                ? "Select a class first to add fees"
                : "No fee categories added yet"}
            </Typography>
            <Button
              onClick={addGroup}
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

// ─────────────────────────────────────────────
// AddFeeModal
// ─────────────────────────────────────────────
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

  // Groups are owned by DynamicFeeFields state; parent gets a ref copy for submit
  const feeGroupsRef = useRef<FeeGroup[]>([]);
  const handleGroupsChange = useCallback((groups: FeeGroup[]) => {
    feeGroupsRef.current = groups;
  }, []);

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

    const groups = feeGroupsRef.current;
    if (!groups.length) {
      toast.error("Please add at least one fee category");
      return;
    }

    const monthRaw = data.month;
    let selectedMonthStr: string;
    if (typeof monthRaw === "object" && monthRaw !== null) {
      selectedMonthStr = String(
        monthRaw?.value ||
          monthRaw?.label ||
          `${selectedMonth}-${new Date().getFullYear()}`,
      );
    } else if (typeof monthRaw === "string" && monthRaw.trim()) {
      selectedMonthStr = monthRaw.trim();
    } else {
      selectedMonthStr = `${selectedMonth}-${new Date().getFullYear()}`;
    }

    const selectedMonthName = selectedMonthStr.split("-")[0];
    const currentMonthIndex = MONTHS.indexOf(selectedMonthName);
    const academicYear = String(data.academicYear || getCurrentAcademicYear());

    setIsSubmitting(true);
    const createdFees: any[] = [];

    try {
      for (const group of groups) {
        if (!group.feeItems?.length) continue;

        for (const item of group.feeItems) {
          const amount = item.amount || 0;
          if (amount <= 0) continue;

          const feeType = item.feeType.trim();
          if (!feeType) {
            toast.error("Please fill in the fee type for all items");
            setIsSubmitting(false);
            return;
          }

          let actualDiscount = item.discount || 0;
          if (item.discountType === "percentage")
            actualDiscount = (amount * actualDiscount) / 100;
          actualDiscount = Math.min(actualDiscount, amount);

          if (item.isMonthly || feeType.toLowerCase().includes("monthly")) {
            const yr = new Date().getFullYear();
            const rangeStartIdx = item.discountRangeStart
              ? MONTHS.indexOf(item.discountRangeStart)
              : -1;
            const rangeEndIdx = item.discountRangeEnd
              ? MONTHS.indexOf(item.discountRangeEnd)
              : -1;
            const rangeDiscountAmt = item.discountRangeAmount || 0;

            for (let mi = currentMonthIndex; mi < MONTHS.length; mi++) {
              const monthLabel = `${MONTHS[mi]}-${yr}`;
              const monthlyFeeType = `${feeType} - ${MONTHS[mi]}`;
              let monthDiscount = actualDiscount;
              if (
                rangeStartIdx !== -1 &&
                rangeEndIdx !== -1 &&
                mi >= rangeStartIdx &&
                mi <= rangeEndIdx
              ) {
                monthDiscount = rangeDiscountAmt;
              }
              const finalAmount = Math.max(0, amount - monthDiscount);
              const result = await createFee({
                studentId,
                student: studentId,
                amount: finalAmount,
                feeType: monthlyFeeType,
                academicYear,
                enrollment: student.enrollment?._id || null,
                class: selectedClass,
                month: monthLabel,
                discount: monthDiscount,
                waiver: 0,
                paidAmount: 0,
                advanceUsed: 0,
                isCurrentMonth: MONTHS[mi] === selectedMonthName,
              }).unwrap();
              createdFees.push(result);
            }
          } else {
            const finalAmount = Math.max(0, amount - actualDiscount);
            const result = await createFee({
              studentId,
              student: studentId,
              amount: finalAmount,
              feeType,
              academicYear,
              enrollment: student.enrollment?._id || null,
              class: selectedClass,
              month: selectedMonthStr,
              discount: actualDiscount,
              waiver: 0,
              paidAmount: 0,
              advanceUsed: 0,
              isCurrentMonth: true,
            }).unwrap();
            createdFees.push(result);
          }
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
      setTimeout(() => window.location.reload(), 1000);
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
    paymentMethod: { label: "Cash", value: "cash" },
    paidAmount: 0,
  };

  return (
    <CraftModal open={open} setOpen={setOpen} title="Add New Fees" size="xl">
      <CraftForm onSubmit={handleSubmit} defaultValues={defaultFormValues}>
        <Grid container spacing={3}>
          {/* Student Info */}
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

          {/* Month */}
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

          {/* Academic Year */}
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

          {/* Dynamic Fee Fields */}
          <Grid item xs={12}>
            <DynamicFeeFields
              selectedClass={selectedClass}
              feeCategories={feeCategories}
              studentAdvanceBalance={studentAdvanceBalance}
              enrollmentId={enrollmentId}
              selectedMonth={selectedMonth}
              onGroupsChange={handleGroupsChange}
            />
          </Grid>

          {/* Submit */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading || isSubmitting || !selectedClass}
              startIcon={
                isLoading || isSubmitting ? (
                  <CircularProgress size={20} />
                ) : undefined
              }
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
