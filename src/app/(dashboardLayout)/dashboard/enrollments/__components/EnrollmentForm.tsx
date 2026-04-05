/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT CHANGES vs original:
//
// 1. `transformEnrollmentDataToForm` now marks each feeItem with:
//      isPaid: boolean  (true if paidAmount > 0 on the DB fee)
//      paidAmount: number
//
// 2. `DynamicFeeFields / fee item row`:
//    - Paid items show a lock icon + green "Paid ৳X" badge
//    - Amount / Discount / FeeType inputs are DISABLED for paid items
//    - Delete button is DISABLED for paid items (shows tooltip explaining why)
//
// 3. `handleSubmit`: skips validation/processing for paid items — they are
//    still sent in the payload so the backend can see them, but flagged
//    `isSelected: true` and unchanged so the backend ignores them.
//
// 4. Backend `updateEnrollment` (separate file):
//    - Any fee with paidAmount > 0 is treated as immutable (locked).
//    - Only unpaid fee documents are deleted and recreated.
//    - If the user tries to lower the amount below what was paid → throws error.
// ─────────────────────────────────────────────────────────────────────────────

import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon";
import CraftForm from "@/components/Forms/Form";
import FileUploadWithIcon from "@/components/Forms/Upload";
import CraftInputWithIcon from "@/components/Forms/inputWithIcon";
import CraftSelectWithIcon from "@/components/Forms/selectWithIcon";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import { bloodGroups } from "@/options";
import {
  useCreateEnrollmentMutation,
  useGetSingleEnrollmentQuery,
  useUpdateEnrollmentMutation,
} from "@/redux/api/enrollmentApi";
import { useGetAllStudentsQuery } from "@/redux/api/studentApi";
import { useGetAllAdmissionApplicationsQuery } from "@/redux/api/admissionApplication";
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
  Lock,
  Money,
  Payment,
  Person,
  Phone,
  Save,
  School,
  School as SchoolIcon,
  Work,
  Print,
  Assignment,
  FileCopy,
  WhatsApp,
  School as EducationIcon,
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
  DialogContent,
  DialogActions,
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
  Chip,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import PrintModal from "../../student/profile/__components/PrintModal";
import AddFeeModal from "../../student/profile/__components/AddFeeModal";
import PaymentModal from "../../student/profile/__components/PaymentModal";
import { MONTHS } from "@/constant/month";

const CURRENT_MONTH = MONTHS[new Date().getMonth()];

const fadeInSlideUp = {
  animation: "fadeInSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
  "@keyframes fadeInSlideUp": {
    "0%": { opacity: 0, transform: "translateY(15px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
};

const getFirstIncompleteStep = (formData: any): number => {
  if (
    !formData.studentName ||
    !formData.mobileNo ||
    !formData.studentDepartment
  )
    return 0;
  if (!formData.className || formData.className.length === 0) return 1;
  if (!formData.fatherName || !formData.fatherMobile || !formData.motherName)
    return 2;
  const hasPermanentAddress =
    formData.permVillage || formData.permDistrict || formData.permPoliceStation;
  const hasPresentAddress =
    formData.village || formData.district || formData.policeStation;
  if (!hasPermanentAddress && !hasPresentAddress) return 3;
  return 4;
};

// ─── Paid Fee Badge ───────────────────────────────────────────────────────────
const PaidBadge = ({ amount }: { amount: number }) => (
  <Chip
    icon={<Lock sx={{ fontSize: "14px !important" }} />}
    label={`Paid ৳${amount.toLocaleString()}`}
    size="small"
    color="success"
    variant="filled"
    sx={{ fontSize: "0.7rem", height: 22, fontWeight: 700 }}
  />
);

// ─── AdmissionApplicationSelector (unchanged) ────────────────────────────────
const AdmissionApplicationSelector = ({
  onSelect,
}: {
  onSelect: (application: any) => void;
}) => {
  const theme = useTheme();
  const { data: applicationsData, isLoading } =
    useGetAllAdmissionApplicationsQuery({
      limit: 100,
      status: "approved",
    });

  const options =
    applicationsData?.data?.map((app: any) => ({
      label: `${app.applicationId || app._id} - ${app.studentInfo?.nameEnglish || app.studentInfo?.nameBangla || "Unknown"}`,
      value: app._id,
      application: app,
    })) || [];

  const [selectedApp, setSelectedApp] = useState<any>(null);

  const handleApplicationSelect = (event: any, value: any) => {
    if (value && value.application) {
      setSelectedApp(value.application);
      onSelect(value.application);
      toast.success(
        `Application for ${value.application?.studentInfo?.nameBangla || "Student"} loaded`,
      );
    } else {
      setSelectedApp(null);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.info.main, 0.05)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "absolute", top: 0, right: 0, p: 1 }}>
        <Chip
          icon={<FileCopy fontSize="small" />}
          label="Auto-fill from Application"
          size="small"
          color="primary"
          variant="outlined"
        />
      </Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <CraftIntAutoCompleteWithIcon
            name="admissionApplication"
            label="Select Admission Application"
            placeholder="Search by ID or Student Name..."
            options={options}
            size="medium"
            multiple={false}
            icon={<Assignment color="primary" />}
            onChange={handleApplicationSelect}
            loading={isLoading}
            fullWidth
            helperText="Select an approved application to auto-fill the form"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          {selectedApp && (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Chip
                label={`Status: ${selectedApp.status}`}
                color={
                  selectedApp.status === "approved" ? "success" : "warning"
                }
                size="small"
              />
              <Chip
                label={`ID: ${selectedApp.applicationId || selectedApp._id?.slice(-6)}`}
                variant="outlined"
                size="small"
              />
              {selectedApp.studentInfo && (
                <Chip
                  label={`Class: ${selectedApp.studentInfo.class}`}
                  variant="outlined"
                  size="small"
                  color="primary"
                />
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

// ─── FeeAmountHandler (unchanged) ────────────────────────────────────────────
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

  useEffect(() => {
    if (selectedClass?.length > 0 && selectedCategory?.length > 0) {
      const selectedClassName = Array.isArray(selectedClass)
        ? selectedClass[0]?.label || selectedClass[0]
        : selectedClass;
      const selectedCategoryName = Array.isArray(selectedCategory)
        ? selectedCategory[0]?.label ||
          selectedCategory[0]?.title ||
          selectedCategory[0]
        : selectedCategory;

      const matchingEntries =
        feeCategoryData?.data?.data?.filter(
          (category: any) =>
            category.className === selectedClassName &&
            category.categoryName === selectedCategoryName,
        ) || [];

      let feeItems: any[] = [];
      matchingEntries.forEach((entry: any) => {
        if (entry.feeItems && Array.isArray(entry.feeItems))
          feeItems = [...feeItems, ...entry.feeItems];
        else if (entry.feeType)
          feeItems.push({
            feeType: entry.feeType,
            amount: entry.amount,
            isSelected: true,
            discount: 0,
          });
      });

      if (feeItems.length > 0) {
        const formattedItems: any[] = feeItems.map((item: any) => {
          const typeLabel =
            typeof item.feeType === "string"
              ? item.feeType
              : item.feeType?.value || "";
          return {
            feeType:
              typeof item.feeType === "string"
                ? { label: item.feeType, value: item.feeType }
                : item.feeType,
            amount: item.amount,
            advanceAmount: "",
            isSelected: true,
            discount: item.discount || 0,
            isMonthly: typeLabel.toLowerCase().includes("monthly"),
            discountRangeStart: "",
            discountRangeEnd: "",
            discountRangeAmount: 0,
            isPaid: false, // new items are never paid
            paidAmount: 0,
            _tempId: Date.now() + Math.random(),
          };
        });
        setValue(`fees.${feeIndex}.feeItems`, formattedItems);
        setValue(
          `fees.${feeIndex}.feeAmount`,
          formattedItems
            .reduce((s: number, i: any) => s + (i.amount || 0), 0)
            .toString(),
        );
      } else {
        setValue(`fees.${feeIndex}.feeItems`, []);
        setValue(`fees.${feeIndex}.feeAmount`, "");
      }
    }
  }, [selectedClass, selectedCategory, setValue, feeIndex, feeCategoryData]);

  return null;
};

// ─── DynamicFeeFields ─────────────────────────────────────────────────────────
const DynamicFeeFields = ({
  classOptions,
  feeCategoryData,
  studentData,
}: any) => {
  const theme = useTheme();
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "fees" });

  const mainClassName = watch("className");
  const selectedStudent = watch("studentIdSelect");
  const [studentAdvanceBalance, setStudentAdvanceBalance] = useState(0);
  const [selectAllFees, setSelectAllFees] = useState(false);

  const getCategoryOptions = () => {
    if (!feeCategoryData?.data?.data) return [];
    const uniqueCategories = Array.from(
      new Set(feeCategoryData.data.data.map((item: any) => item.categoryName)),
    );
    return uniqueCategories.map((category) => ({
      label: category,
      name: category,
      value: category,
    }));
  };

  const getFeeTypeOptionsForClass = (classNameStr: string) => {
    if (!feeCategoryData?.data?.data) return [];
    const normalizedTargetClass = String(classNameStr || "")
      .trim()
      .toLowerCase();
    const types = new Set<string>();
    feeCategoryData.data.data.forEach((item: any) => {
      const normalizedEntryClass = String(item.className || "")
        .trim()
        .toLowerCase();
      if (normalizedEntryClass === normalizedTargetClass) {
        if (item.feeType) types.add(item.feeType);
        if (item.feeItems)
          item.feeItems.forEach((sub: any) => types.add(sub.feeType));
      }
    });
    const options = Array.from(types).map((t) => ({ label: t, value: t }));
    if (options.length === 0) {
      feeCategoryData.data.data.forEach((item: any) => {
        if (item.feeType) types.add(item.feeType);
        if (item.feeItems)
          item.feeItems.forEach((sub: any) => types.add(sub.feeType));
      });
      return Array.from(types).map((t) => ({ label: t, value: t }));
    }
    return options;
  };

  const buildFeeItemsForCategory = useCallback(
    (matchingEntries: any[]) => {
      const allFeeItems: any[] = [];
      matchingEntries.forEach((entry: any) => {
        if (entry.feeItems && Array.isArray(entry.feeItems))
          allFeeItems.push(...entry.feeItems);
        else if (entry.feeType) allFeeItems.push(entry);
      });

      return allFeeItems
        .filter((item: any) => {
          const typeLabel =
            typeof item.feeType === "string"
              ? item.feeType
              : item.feeType?.value || "";
          return (
            selectAllFees || typeLabel.toLowerCase().includes("admission fee")
          );
        })
        .map((item: any) => {
          const typeLabel =
            typeof item.feeType === "string"
              ? item.feeType
              : item.feeType?.value || "";
          return {
            feeType:
              typeof item.feeType === "string"
                ? { label: item.feeType, value: item.feeType }
                : item.feeType,
            amount: item.amount,
            advanceAmount: "",
            isSelected: true,
            discount: item.discount || 0,
            isMonthly: typeLabel.toLowerCase().includes("monthly"),
            discountRangeStart: "",
            discountRangeEnd: "",
            discountRangeAmount: 0,
            isPaid: false,
            paidAmount: 0,
            _tempId: Date.now() + Math.random(),
          };
        });
    },
    [selectAllFees],
  );

  const reloadAllFeeItems = useCallback(() => {
    const fees = watch("fees") || [];
    fees.forEach((fee: any, index: number) => {
      if (fee.category?.length > 0 && fee.className?.length > 0) {
        const selectedClassName = Array.isArray(fee.className)
          ? fee.className[0]?.label || fee.className[0]
          : fee.className;
        const categoryName = Array.isArray(fee.category)
          ? fee.category[0]?.label || fee.category[0]
          : fee.category;

        const matchingEntries =
          feeCategoryData?.data?.data?.filter(
            (item: any) =>
              item.className === selectedClassName &&
              item.categoryName === categoryName,
          ) || [];

        // ⚠️ Preserve paid items — never reload over them
        const existingItems = fee.feeItems || [];
        const paidItems = existingItems.filter((i: any) => i.isPaid);
        const newItems = buildFeeItemsForCategory(matchingEntries);

        // Merge: paid items stay, new items are added if not already paid
        const paidKeys = new Set(
          paidItems.map((i: any) => {
            const label =
              typeof i.feeType === "string"
                ? i.feeType
                : i.feeType?.label || i.feeType?.value || "";
            return label;
          }),
        );
        const filteredNew = newItems.filter((i: any) => {
          const label =
            typeof i.feeType === "string"
              ? i.feeType
              : i.feeType?.label || i.feeType?.value || "";
          return !paidKeys.has(label);
        });

        const merged = [...paidItems, ...filteredNew];
        setValue(`fees.${index}.feeItems`, merged);
        setValue(
          `fees.${index}.feeAmount`,
          merged
            .filter((i: any) => !i.isPaid)
            .reduce((s: number, i: any) => s + (i.amount || 0), 0)
            .toString(),
        );
      }
    });
  }, [watch, setValue, feeCategoryData, buildFeeItemsForCategory]);

  const handleSelectAllFeesToggle = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.checked;
    setSelectAllFees(newValue);
    setTimeout(() => reloadAllFeeItems(), 0);
    toast.success(
      newValue
        ? "Switched to All Fees mode"
        : "Switched to Admission Only mode",
    );
  };

  useEffect(() => {
    if (selectedStudent && studentData?.data) {
      const student = studentData.data.find(
        (s: any) => s._id === (selectedStudent.value || selectedStudent),
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
    if (fields.length > 1) remove(index);
    else toast.error("At least one fee entry is required");
  };

  const handleCategoryChange = (index: number, selectedCategory: any) => {
    const feeClassName = watch(`fees.${index}.className`);
    if (selectedCategory?.length > 0 && feeClassName) {
      const selectedClassName = Array.isArray(feeClassName)
        ? feeClassName[0]?.label || feeClassName[0]
        : feeClassName;
      const categoryName = Array.isArray(selectedCategory)
        ? selectedCategory[0]?.label || selectedCategory[0]
        : selectedCategory;

      const matchingEntries =
        feeCategoryData?.data?.data?.filter(
          (item: any) =>
            item.className === selectedClassName &&
            item.categoryName === categoryName,
        ) || [];

      // Keep existing paid items
      const existingItems = watch(`fees.${index}.feeItems`) || [];
      const paidItems = existingItems.filter((i: any) => i.isPaid);
      const newItems = buildFeeItemsForCategory(matchingEntries);
      const paidKeys = new Set(
        paidItems.map((i: any) =>
          typeof i.feeType === "string" ? i.feeType : i.feeType?.label || "",
        ),
      );
      const filteredNew = newItems.filter((i: any) => {
        const label =
          typeof i.feeType === "string" ? i.feeType : i.feeType?.label || "";
        return !paidKeys.has(label);
      });
      const merged = [...paidItems, ...filteredNew];

      setValue(`fees.${index}.feeItems`, merged);
      setValue(
        `fees.${index}.feeAmount`,
        filteredNew
          .reduce((s: number, i: any) => s + (i.amount || 0), 0)
          .toString(),
      );
      toast.success(
        selectAllFees
          ? `All fees loaded for ${categoryName}`
          : `Admission fee only loaded for ${categoryName}`,
      );
    } else {
      // Only clear unpaid items
      const existingItems = watch(`fees.${index}.feeItems`) || [];
      const paidItems = existingItems.filter((i: any) => i.isPaid);
      setValue(`fees.${index}.feeItems`, paidItems);
      setValue(`fees.${index}.feeAmount`, "");
    }
  };

  // ── Remove a fee item (blocked for paid items) ──────────────────────────────
  const removeFeeItem = (feeIndex: number, item: any) => {
    if (item.isPaid) {
      toast.error(
        `Cannot remove "${typeof item.feeType === "string" ? item.feeType : item.feeType?.label}" — ৳${item.paidAmount?.toLocaleString()} has already been paid.`,
      );
      return;
    }
    const currentFeeItems = watch(`fees.${feeIndex}.feeItems`) || [];
    const newFeeItems = currentFeeItems.filter(
      (i: any) => i._tempId !== item._tempId,
    );
    setValue(`fees.${feeIndex}.feeItems`, newFeeItems);
    const selectedTotal = newFeeItems
      .filter((i: any) => !i.isPaid && i.isSelected)
      .reduce((s: number, i: any) => s + (i.amount || 0), 0);
    setValue(`fees.${feeIndex}.feeAmount`, selectedTotal.toString());
  };

  const handleItemFieldChange = (
    feeIndex: number,
    itemIndex: number,
    field: string,
    value: any,
  ) => {
    const feeItems = watch(`fees.${feeIndex}.feeItems`) || [];
    const item = feeItems[itemIndex];
    // Block changes on paid items for critical fields
    if (item?.isPaid && (field === "feeType" || field === "isSelected")) {
      toast.error("Cannot modify a fee that has already been paid.");
      return;
    }
    const updatedItems = [...feeItems];
    if (updatedItems[itemIndex]) {
      updatedItems[itemIndex] = { ...updatedItems[itemIndex], [field]: value };
      setValue(`fees.${feeIndex}.feeItems`, updatedItems);
      if (field === "amount" || field === "isSelected" || field === "feeType") {
        const selectedTotal = updatedItems
          .filter((i: any) => !i.isPaid && i.isSelected)
          .reduce((s: number, i: any) => s + (i.amount || 0), 0);
        setValue(`fees.${feeIndex}.feeAmount`, selectedTotal.toString());
      }
    }
  };

  const handleApplyRangeDiscount = (
    feeIndex: number,
    itemIndex: number,
    startMonth: string,
    endMonth: string,
    amount: number,
  ) => {
    if (!startMonth || !endMonth) {
      toast.error("Please select start and end month");
      return;
    }
    const startIdx = MONTHS.indexOf(startMonth);
    const endIdx = MONTHS.indexOf(endMonth);
    if (startIdx === -1 || endIdx === -1) {
      toast.error("Invalid month selection");
      return;
    }
    const actualStart = startIdx <= endIdx ? startMonth : endMonth;
    const actualEnd = startIdx <= endIdx ? endMonth : startMonth;
    setValue(
      `fees.${feeIndex}.feeItems.${itemIndex}.discountRangeStart`,
      actualStart,
    );
    setValue(
      `fees.${feeIndex}.feeItems.${itemIndex}.discountRangeEnd`,
      actualEnd,
    );
    setValue(
      `fees.${feeIndex}.feeItems.${itemIndex}.discountRangeAmount`,
      amount,
    );
    toast.success(
      `Discount range set: ${actualStart} to ${actualEnd} (৳${amount}/month)`,
    );
  };

  const categoryOptions = getCategoryOptions();

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
          <Typography
            variant="h6"
            fontWeight="600"
            sx={{ color: theme.palette.text.primary }}
          >
            Fee Details
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: !selectAllFees ? "primary.main" : "text.secondary",
              }}
            >
              Admission Only
            </Typography>
            <Switch
              checked={selectAllFees}
              onChange={handleSelectAllFeesToggle}
              color="info"
              size="small"
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: selectAllFees ? "info.main" : "text.secondary",
              }}
            >
              All Fees
            </Typography>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ p: 3 }}>
        {fields.map((field, index) => {
          const feeClassName = watch(`fees.${index}.className`);
          const feeCategory = watch(`fees.${index}.category`);
          const feeItems = watch(`fees.${index}.feeItems`) || [];
          const isClassSelected = mainClassName && mainClassName.length > 0;
          const classNameStr = Array.isArray(feeClassName)
            ? feeClassName[0]?.label || feeClassName[0]
            : feeClassName;
          const classSpecificFeeOptions =
            getFeeTypeOptionsForClass(classNameStr);

          const [rangeStart, setRangeStart] = useState("");
          const [rangeEnd, setRangeEnd] = useState("");
          const [rangeAmt, setRangeAmt] = useState(0);

          const hasPaidItems = feeItems.some((i: any) => i.isPaid);

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

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
                    Fee Category
                  </Typography>
                </Box>
                {hasPaidItems && (
                  <Chip
                    icon={<Lock sx={{ fontSize: "14px !important" }} />}
                    label="Some fees are locked (paid)"
                    size="small"
                    color="warning"
                    variant="outlined"
                    sx={{ fontSize: "0.7rem" }}
                  />
                )}
              </Box>

              <FeeAmountHandler
                feeIndex={index}
                feeCategoryData={feeCategoryData}
              />

              <Grid container spacing={2.5} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                      isClassSelected ? "Select Category" : "Select class first"
                    }
                    options={categoryOptions.map((opt) => ({
                      label: String(opt.label || ""),
                      value: String(opt.value || ""),
                      name: String(opt.name || opt.label || ""),
                    }))}
                    fullWidth
                    multiple
                    icon={<CalendarMonth color="primary" />}
                    disabled={!isClassSelected}
                    onChange={(event: any, value: any) =>
                      handleCategoryChange(index, value)
                    }
                  />
                </Grid>
              </Grid>

              {feeItems.length > 0 && (
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
                      Fee Items
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        const newItems = [
                          ...feeItems,
                          {
                            feeType: "",
                            amount: 0,
                            advanceAmount: "",
                            isSelected: true,
                            discount: 0,
                            isMonthly: false,
                            discountRangeStart: "",
                            discountRangeEnd: "",
                            discountRangeAmount: 0,
                            isPaid: false,
                            paidAmount: 0,
                            _tempId: Date.now() + Math.random(),
                          },
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
                      {/* Header row */}
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
                          <Grid item xs={1}>
                            <Typography
                              variant="caption"
                              fontWeight="bold"
                              color="text.secondary"
                            >
                              SEL
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
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
                              Advance
                            </Typography>
                          </Grid>
                          <Grid item xs={1}></Grid>
                        </Grid>
                      </Grid>

                      {feeItems.map((item: any, itemIndex: number) => {
                        const isMonthly = item.isMonthly;
                        const isPaid = Boolean(item.isPaid);
                        const hasRangeDiscount =
                          item.discountRangeStart && item.discountRangeEnd;

                        return (
                          <Grid item xs={12} key={item._tempId || itemIndex}>
                            <Grid
                              container
                              spacing={2}
                              alignItems="center"
                              sx={{
                                mb: 1,
                                p: 0.5,
                                borderRadius: 1,
                                bgcolor: isPaid
                                  ? alpha(theme.palette.success.light, 0.15)
                                  : isMonthly
                                    ? alpha(theme.palette.info.light, 0.15)
                                    : "transparent",
                                border: isPaid
                                  ? `1px solid ${alpha(theme.palette.success.main, 0.3)}`
                                  : "1px solid transparent",
                              }}
                            >
                              {/* Checkbox */}
                              <Grid item xs={1}>
                                {isPaid ? (
                                  <Tooltip title="This fee has been paid and cannot be deselected">
                                    <span>
                                      <Checkbox
                                        size="small"
                                        checked={true}
                                        disabled
                                        color="success"
                                      />
                                    </span>
                                  </Tooltip>
                                ) : (
                                  <Checkbox
                                    size="small"
                                    checked={item.isSelected || false}
                                    onChange={(e) =>
                                      handleItemFieldChange(
                                        index,
                                        itemIndex,
                                        "isSelected",
                                        e.target.checked,
                                      )
                                    }
                                    color="primary"
                                  />
                                )}
                              </Grid>

                              {/* Fee Type */}
                              <Grid item xs={3}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 0.5,
                                  }}
                                >
                                  {isMonthly ? (
                                    <CraftInputWithIcon
                                      name={`fees.${index}.feeItems.${itemIndex}.feeTypeDisplay`}
                                      label=""
                                      fullWidth
                                      margin="none"
                                      size="small"
                                      disabled
                                      value={`${typeof item.feeType === "string" ? item.feeType : item.feeType?.label || ""} (${CURRENT_MONTH})`}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <Description
                                              color="disabled"
                                              sx={{ fontSize: 16 }}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  ) : (
                                    <CraftIntAutoCompleteWithIcon
                                      freeSolo
                                      name={`fees.${index}.feeItems.${itemIndex}.feeType`}
                                      label=""
                                      options={classSpecificFeeOptions}
                                      size="small"
                                      fullWidth
                                      placeholder="Select Fee Type"
                                      multiple={false}
                                      icon={
                                        <Description
                                          color="disabled"
                                          sx={{ fontSize: 16 }}
                                        />
                                      }
                                      disableClearable={false}
                                      disabled={!isClassSelected || isPaid}
                                      isOptionEqualToValue={(
                                        option: any,
                                        value: any,
                                      ) => {
                                        if (!option || !value) return false;
                                        const optVal =
                                          typeof option === "string"
                                            ? option
                                            : option.value;
                                        const valVal =
                                          typeof value === "string"
                                            ? value
                                            : value.value;
                                        return optVal === valVal;
                                      }}
                                      onKeyDown={(e: any) => {
                                        if (e.key === "Enter")
                                          e.preventDefault();
                                      }}
                                      onChange={(e: any, val: any) =>
                                        handleItemFieldChange(
                                          index,
                                          itemIndex,
                                          "feeType",
                                          val,
                                        )
                                      }
                                    />
                                  )}
                                  {isPaid && (
                                    <PaidBadge amount={item.paidAmount || 0} />
                                  )}
                                </Box>
                              </Grid>

                              {/* Amount */}
                              <Grid item xs={2.5}>
                                <CraftInputWithIcon
                                  name={`fees.${index}.feeItems.${itemIndex}.amount`}
                                  label=""
                                  fullWidth
                                  margin="none"
                                  size="small"
                                  type="number"
                                  disabled={isPaid}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {isPaid ? (
                                          <Lock
                                            sx={{
                                              fontSize: 14,
                                              color: "success.main",
                                            }}
                                          />
                                        ) : (
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                          >
                                            ৳
                                          </Typography>
                                        )}
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={
                                    isPaid
                                      ? {
                                          "& .MuiInputBase-root": {
                                            bgcolor: alpha(
                                              theme.palette.success.light,
                                              0.1,
                                            ),
                                          },
                                        }
                                      : {}
                                  }
                                />
                              </Grid>

                              {/* Discount */}
                              <Grid item xs={2.5}>
                                <CraftInputWithIcon
                                  name={`fees.${index}.feeItems.${itemIndex}.discount`}
                                  label=""
                                  fullWidth
                                  margin="none"
                                  size="small"
                                  type="number"
                                  placeholder="0"
                                  disabled={isPaid}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Discount
                                          sx={{
                                            fontSize: 16,
                                            color: isPaid
                                              ? "success.main"
                                              : "error.main",
                                          }}
                                        />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>

                              {/* Pay Now / Advance */}
                              <Grid item xs={2}>
                                {isPaid ? (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      height: "100%",
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      color="success.main"
                                      fontWeight="bold"
                                    >
                                      ✓ Done
                                    </Typography>
                                  </Box>
                                ) : (
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
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                          >
                                            ৳
                                          </Typography>
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                )}
                              </Grid>

                              {/* Delete */}
                              <Grid
                                item
                                xs={1}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {isPaid ? (
                                  <Tooltip
                                    title={`Locked — ৳${item.paidAmount?.toLocaleString()} already paid`}
                                  >
                                    <span>
                                      <IconButton
                                        size="small"
                                        disabled
                                        sx={{ color: "text.disabled" }}
                                      >
                                        <Lock fontSize="small" />
                                      </IconButton>
                                    </span>
                                  </Tooltip>
                                ) : (
                                  <Tooltip title="Remove this item">
                                    <IconButton
                                      size="small"
                                      onClick={() => removeFeeItem(index, item)}
                                      sx={{ color: "error.main" }}
                                    >
                                      <Delete fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Grid>

                              {/* Range discount panel for monthly unpaid */}
                              {isMonthly && !isPaid && (
                                <Grid item xs={12} sx={{ mt: 1 }}>
                                  <Paper
                                    variant="outlined"
                                    sx={{
                                      p: 1.5,
                                      borderColor: theme.palette.info.main,
                                      bgcolor: alpha(
                                        theme.palette.info.light,
                                        0.1,
                                      ),
                                    }}
                                  >
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
                                        onChange={(e) =>
                                          setRangeStart(e.target.value)
                                        }
                                        displayEmpty
                                        sx={{ minWidth: 100 }}
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
                                      <Typography variant="body2">
                                        to
                                      </Typography>
                                      <Select
                                        size="small"
                                        value={rangeEnd}
                                        onChange={(e) =>
                                          setRangeEnd(e.target.value)
                                        }
                                        displayEmpty
                                        sx={{ minWidth: 100 }}
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
                                      <CraftInputWithIcon
                                        name="rangAmt"
                                        size="small"
                                        type="number"
                                        placeholder="Amt"
                                        value={rangeAmt || ""}
                                        onChange={(e: any) =>
                                          setRangeAmt(
                                            parseFloat(e.target.value),
                                          )
                                        }
                                        sx={{ width: 150 }}
                                      />
                                      <Button
                                        size="small"
                                        variant="contained"
                                        onClick={() =>
                                          handleApplyRangeDiscount(
                                            index,
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
                                    {hasRangeDiscount && (
                                      <Typography
                                        variant="caption"
                                        color="success.main"
                                        sx={{ mt: 1, display: "block" }}
                                      >
                                        Active: {item.discountRangeStart} to{" "}
                                        {item.discountRangeEnd} (-৳
                                        {item.discountRangeAmount}/mo)
                                      </Typography>
                                    )}
                                  </Paper>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Paper>
                </Box>
              )}

              {feeItems.length === 0 && (
                <Box
                  sx={{ textAlign: "center", py: 3, color: "text.disabled" }}
                >
                  <Money sx={{ fontSize: 36, mb: 1, opacity: 0.5 }} />
                  <Typography variant="body2">
                    {feeCategory && feeCategory.length > 0
                      ? "No fee items found for this category"
                      : "Select a category to load fee items"}
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
  );
};

// ─── All Step Components (unchanged) ────────────────────────────────────────
const StudentInformationStep = () => (
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
      </Grid>
      <Grid item xs={12} md={4}>
        <FileUploadWithIcon name="studentPhoto" label="Student Photo" />
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
            startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
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
              Student Name (English)<span style={{ color: "red" }}>*</span>
            </span>
          }
          name="studentName"
          placeholder="Full Name in English"
          InputProps={{
            startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
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
              Mobile No<span style={{ color: "red" }}>*</span>
            </span>
          }
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
              Student Department<span style={{ color: "red" }}>*</span>
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
                {selectedClass.map((cls: any) => cls.label || cls).join(", ")}"
                will be automatically used in Fee section.
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

const ParentGuardianStep = () => (
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
          label={
            <span>
              Father's Name English <span style={{ color: "red" }}>*</span>
            </span>
          }
          name="fatherName"
          placeholder="Father Name English"
          InputProps={{
            startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
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
            startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
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
              Mobile No <span style={{ color: "red" }}>*</span>
            </span>
          }
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
          label="WhatsApp"
          name="fatherWhatsapp"
          placeholder="WhatsApp Number"
          InputProps={{
            startAdornment: (
              <WhatsApp sx={{ color: "text.secondary", mr: 1 }} />
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CraftInputWithIcon
          size="medium"
          margin="none"
          fullWidth
          label="Education"
          name="fatherEducation"
          placeholder="Education"
          InputProps={{
            startAdornment: (
              <EducationIcon sx={{ color: "text.secondary", mr: 1 }} />
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
              Mother's Name English <span style={{ color: "red" }}>*</span>
            </span>
          }
          name="motherName"
          placeholder="Mother Name English"
          InputProps={{
            startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
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
            startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
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
          label="WhatsApp"
          name="motherWhatsapp"
          placeholder="WhatsApp Number"
          InputProps={{
            startAdornment: (
              <WhatsApp sx={{ color: "text.secondary", mr: 1 }} />
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CraftInputWithIcon
          size="medium"
          margin="none"
          fullWidth
          label="Education"
          name="motherEducation"
          placeholder="Education"
          InputProps={{
            startAdornment: (
              <EducationIcon sx={{ color: "text.secondary", mr: 1 }} />
            ),
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
            startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
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
            startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
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
      <Grid item xs={12} md={4}>
        <CraftInputWithIcon
          size="medium"
          margin="none"
          fullWidth
          label="WhatsApp"
          name="guardianWhatsapp"
          placeholder="WhatsApp Number"
          InputProps={{
            startAdornment: (
              <WhatsApp sx={{ color: "text.secondary", mr: 1 }} />
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
          name="guardianProfession"
          placeholder="Profession"
          InputProps={{
            startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
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

const DocumentCheckbox = ({ name, label }: { name: string; label: string }) => {
  const { watch, setValue } = useFormContext();
  const isChecked = watch(name) || false;
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={(e) => setValue(name, e.target.checked)}
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
  const sameAsPermanent = watch("sameAsPermanent") || false;
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
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            sx={{ mb: 1, color: "primary.main" }}
          >
            Permanent Address
          </Typography>
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
            label="Thana"
            name="permPoliceStation"
            placeholder="Thana"
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
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="600"
                sx={{ color: "text.primary" }}
              >
                Present Address
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Same as Permanent Address
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={sameAsPermanent}
                  onChange={(e) => {
                    setValue("sameAsPermanent", e.target.checked);
                    if (e.target.checked) {
                      setValue("village", watch("permVillage") || "");
                      setValue("postOffice", watch("permPostOffice") || "");
                      setValue("postCode", watch("permPostCode") || "");
                      setValue(
                        "policeStation",
                        watch("permPoliceStation") || "",
                      );
                      setValue("district", watch("permDistrict") || "");
                    }
                  }}
                  color="primary"
                />
              }
              label="Same as Permanent"
              labelPlacement="start"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Village/Area"
            name="village"
            placeholder="Village/Area"
            disabled={sameAsPermanent}
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
            disabled={sameAsPermanent}
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
            disabled={sameAsPermanent}
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
            label="Thana"
            name="policeStation"
            placeholder="Thana"
            disabled={sameAsPermanent}
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
            disabled={sameAsPermanent}
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
                I agree to enrollment terms
              </Typography>
            </Box>
            <Switch
              checked={termsAccepted}
              onChange={(e) => setValue("termsAccepted", e.target.checked)}
              name="termsAccepted"
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const FeeStep = ({ classOptions, feeCategoryData, studentData }: any) => {
  const theme = useTheme();
  const { watch, setValue } = useFormContext();
  const [isPaidAmountEdited, setIsPaidAmountEdited] = useState(false);

  const paymentOptions = [
    { label: "Cash", value: "cash" },
    { label: "Bkash", value: "bkash" },
    { label: "Bank", value: "bank" },
    { label: "Online", value: "online" },
  ];

  // Only count unpaid (new) items in the totals — paid items are already settled
  const calculateTotals = () => {
    const fees = watch("fees") || [];
    let totalUnpaid = 0;
    let discountUnpaid = 0;
    let alreadyPaid = 0;

    fees.forEach((fee: any) => {
      (fee.feeItems || []).forEach((item: any) => {
        if (item.isPaid) {
          alreadyPaid += Number(item.paidAmount || 0);
        } else if (item.isSelected) {
          totalUnpaid += Number(item.amount || 0);
          discountUnpaid += Number(item.discount || 0);
        }
      });
    });

    const netPayable = Math.max(0, totalUnpaid - discountUnpaid);
    const formPaidAmount = parseFloat(watch("paidAmount") || "0");
    const paidNow = isPaidAmountEdited ? formPaidAmount : netPayable;
    const dueAmount = Math.max(0, netPayable - paidNow);

    return {
      totalUnpaid,
      discountUnpaid,
      netPayable,
      paidNow,
      dueAmount,
      alreadyPaid,
    };
  };

  const summary = calculateTotals();

  useEffect(() => {
    if (!isPaidAmountEdited && summary.netPayable >= 0) {
      setValue("paidAmount", summary.netPayable);
    }
    setValue("totalAmount", summary.totalUnpaid);
    setValue("totalDiscount", summary.discountUnpaid);
    setValue("netPayable", summary.netPayable);
    setValue("dueAmount", summary.dueAmount);
    if (!isPaidAmountEdited) setValue("paidAmount", summary.paidNow);
  }, [
    summary.totalUnpaid,
    summary.discountUnpaid,
    summary.netPayable,
    summary.dueAmount,
    summary.paidNow,
    isPaidAmountEdited,
    setValue,
  ]);

  return (
    <Box sx={{ ...fadeInSlideUp }}>
      <DynamicFeeFields
        classOptions={classOptions}
        feeCategoryData={feeCategoryData}
        studentData={studentData}
      />
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
            {summary.alreadyPaid > 0 && (
              <Grid item xs={12}>
                <Alert severity="success" icon={<Lock />}>
                  <Typography variant="body2">
                    <strong>৳{summary.alreadyPaid.toLocaleString()}</strong> has
                    already been paid for some fees. Those fees are locked and
                    cannot be modified.
                  </Typography>
                </Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1.5, fontWeight: 600 }}
              >
                Payment Details (for new/unpaid fees only)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <CraftInputWithIcon
                    name="paidAmount"
                    label="Pay Amount Now"
                    placeholder=""
                    type="number"
                    fullWidth
                    size="small"
                    onChange={(e: any) => {
                      setIsPaidAmountEdited(true);
                      setValue("paidAmount", parseFloat(e.target.value) || 0);
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
                      "& .MuiInputBase-root": {
                        backgroundColor: alpha(
                          theme.palette.success.light,
                          0.05,
                        ),
                      },
                    }}
                  />
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
                  />
                </Grid>
              </Grid>
            </Grid>

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
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1, fontWeight: 600 }}
                >
                  Summary
                </Typography>
                <Grid container spacing={1}>
                  {summary.alreadyPaid > 0 && (
                    <>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Previously Paid:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ textAlign: "right" }}>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="success.main"
                        >
                          ৳{summary.alreadyPaid.toLocaleString()}
                        </Typography>
                      </Grid>
                    </>
                  )}
                  {summary.discountUnpaid > 0 && (
                    <>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          New Discounts:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ textAlign: "right" }}>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="warning.main"
                        >
                          - ৳{summary.discountUnpaid.toLocaleString()}
                        </Typography>
                      </Grid>
                    </>
                  )}
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Net Payable (new):
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      ৳{summary.netPayable.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Paying Now:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="success.main"
                    >
                      ৳{summary.paidNow.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Due Amount:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color={
                        summary.dueAmount > 0 ? "error.main" : "success.main"
                      }
                    >
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

// ─── transformApplicationToFormData (unchanged) ──────────────────────────────
const transformApplicationToFormData = (
  application: any,
  classOptions: any[],
) => {
  if (!application) return null;
  const studentInfo = application.studentInfo || {};
  const parentInfo = application.parentInfo || {};
  const address = application.address || {};
  const presentAddress = address.present || {};
  const permanentAddress = address.permanent || {};
  const fatherInfo = parentInfo.father || {};
  const motherInfo = parentInfo.mother || {};
  const guardianInfo = parentInfo.guardian || {};
  const documents = application.documents || {};
  const academicInfo = application.academicInfo || {};
  const familyEnvironment = application.familyEnvironment || {};
  const behaviorSkills = application.behaviorSkills || {};

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch {
      return null;
    }
  };

  const formatClassForForm = (classData: any) => {
    if (!classData) return [];
    if (typeof classData === "string") {
      const matchedClass = classOptions?.find(
        (opt: any) => opt.label === classData || opt.value === classData,
      );
      return matchedClass
        ? [matchedClass]
        : [{ label: classData, name: classData, value: classData }];
    }
    return [];
  };

  const formattedClass = formatClassForForm(studentInfo.class);

  return {
    studentId: application.applicationId || "",
    studentNameBangla: studentInfo.nameBangla || "",
    studentPhoto: studentInfo.studentPhoto || "",
    studentName: studentInfo.nameEnglish || "",
    mobileNo:
      fatherInfo.mobile || motherInfo.mobile || guardianInfo.mobile || "",
    session: application.academicYear || new Date().getFullYear().toString(),
    category: "residential",
    dateOfBirth: formatDate(studentInfo.dateOfBirth),
    nidBirth: studentInfo.nidBirth || "",
    bloodGroup: studentInfo.bloodGroup || "",
    nationality: studentInfo.nationality || "Bangladeshi",
    age: studentInfo.age || 0,
    department: studentInfo.department || "",
    className: formattedClass,
    studentDepartment: studentInfo.department || "academic",
    rollNumber: "",
    section: "",
    group: "",
    optionalSubject: "",
    shift: studentInfo.session || "",
    fatherName: fatherInfo.nameEnglish || "",
    fatherNameBangla: fatherInfo.nameBangla || "",
    fatherMobile: fatherInfo.mobile || "",
    fatherNid: fatherInfo.nid || "",
    fatherProfession: fatherInfo.profession || "",
    fatherIncome: fatherInfo.income || 0,
    fatherWhatsapp: fatherInfo.whatsapp || "",
    fatherEducation: fatherInfo.education || "",
    motherName: motherInfo.nameEnglish || "",
    motherNameBangla: motherInfo.nameBangla || "",
    motherMobile: motherInfo.mobile || "",
    motherNid: motherInfo.nid || "",
    motherProfession: motherInfo.profession || "",
    motherIncome: motherInfo.income || 0,
    motherWhatsapp: motherInfo.whatsapp || "",
    motherEducation: motherInfo.education || "",
    guardianName: guardianInfo.nameEnglish || "",
    guardianRelation: guardianInfo.relation || "",
    guardianMobile: guardianInfo.mobile || "",
    guardianWhatsapp: guardianInfo.whatsapp || "",
    guardianProfession: guardianInfo.profession || "",
    guardianVillage: guardianInfo.address || "",
    village: presentAddress.village || "",
    postOffice: presentAddress.postOffice || "",
    postCode: presentAddress.postCode || "",
    policeStation: presentAddress.policeStation || "",
    district: presentAddress.district || "",
    permVillage: permanentAddress.village || "",
    permPostOffice: permanentAddress.postOffice || "",
    permPostCode: permanentAddress.postCode || "",
    permPoliceStation: permanentAddress.policeStation || "",
    permDistrict: permanentAddress.district || "",
    formerInstitution: academicInfo.previousSchool || "",
    formerVillage: "",
    birthCertificate: documents.birthCertificate || false,
    transferCertificate: documents.transferCertificate || false,
    characterCertificate: documents.characterCertificate || false,
    markSheet: documents.markSheet || false,
    photographs: documents.photographs || false,
    termsAccepted: application.termsAccepted || false,
    familyEnvironment: {
      halalIncome: familyEnvironment.halalIncome || "",
      parentsPrayer: familyEnvironment.parentsPrayer || "",
      addiction: familyEnvironment.addiction || "",
      tv: familyEnvironment.tv || "",
      quranRecitation: familyEnvironment.quranRecitation || "",
      purdah: familyEnvironment.purdah || "",
    },
    behaviorSkills: {
      mobileUsage: behaviorSkills.mobileUsage || "",
      generalBehavior: behaviorSkills.generalBehavior || "",
      obedience: behaviorSkills.obedience || "",
      elderBehavior: behaviorSkills.elderBehavior || "",
      youngerBehavior: behaviorSkills.youngerBehavior || "",
      lyingStubbornness: behaviorSkills.lyingStubbornness || "",
      studyInterest: behaviorSkills.studyInterest || "",
      religiousInterest: behaviorSkills.religiousInterest || "",
      angerControl: behaviorSkills.angerControl || "",
    },
    fees: [
      { category: [], className: formattedClass, feeItems: [], feeAmount: "" },
    ],
    admissionFee: 0,
    monthlyFee: 0,
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
  };
};

// ─── transformEnrollmentDataToForm ────────────────────────────────────────────
// KEY CHANGE: each feeItem now carries isPaid + paidAmount from the DB
const transformEnrollmentDataToForm = (
  enrollmentData: any,
  classOptions: any[],
  feeCategoryData: any,
) => {
  if (!enrollmentData?.data) return null;
  const data = enrollmentData.data;

  const parentInfo = data.parentInfo || data.student?.parentInfo || {};
  const fatherInfo = parentInfo.father || {};
  const motherInfo = parentInfo.mother || {};
  const guardianInfo = parentInfo.guardian || {};

  const formatClassForForm = (classData: any) => {
    if (!classData || classData.length === 0) return [];
    if (Array.isArray(classData)) {
      return classData.map((cls: any) => {
        const classId = cls._id || cls;
        const classNameValue = cls.className || cls;
        let matched = classOptions?.find((o: any) => o.value === classId);
        if (!matched)
          matched = classOptions?.find((o: any) => o.label === classNameValue);
        if (!matched)
          matched = {
            label: classNameValue,
            name: classNameValue,
            value: classId,
          };
        return matched;
      });
    }
    const classId = classData._id || classData;
    const classNameValue = classData.className || classData;
    let matched = classOptions?.find((o: any) => o.value === classId);
    if (!matched)
      matched = classOptions?.find((o: any) => o.label === classNameValue);
    if (!matched)
      matched = { label: classNameValue, name: classNameValue, value: classId };
    return [matched];
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch {
      return null;
    }
  };

  const rawClassName = data.className
    ? Array.isArray(data.className)
      ? data.className
      : [data.className]
    : data.student?.className
      ? Array.isArray(data.student.className)
        ? data.student.className
        : [data.student.className]
      : [];

  const formattedClass = formatClassForForm(rawClassName);
  const MONTH_SET = new Set(MONTHS);

  // ── Build fee items, preserving isPaid from the actual DB fee documents ──
  const uniqueFeeItemsMap = new Map<string, any>();
  const feesArray: any[] = data.fees || data.student?.fees || [];

  if (feesArray.length > 0) {
    const feeGroups = new Map<string, any[]>();

    feesArray.forEach((fee: any) => {
      let baseFeeType: string = fee.feeType || "";
      let isMonthlyFee = false;
      let month: string | null = null;

      const dashIdx = baseFeeType.lastIndexOf(" - ");
      if (dashIdx !== -1) {
        const possibleMonth = baseFeeType.slice(dashIdx + 3);
        if (MONTH_SET.has(possibleMonth)) {
          baseFeeType = baseFeeType.slice(0, dashIdx);
          isMonthlyFee = true;
          month = possibleMonth;
        }
      }

      if (!feeGroups.has(baseFeeType)) feeGroups.set(baseFeeType, []);
      feeGroups.get(baseFeeType)!.push({ ...fee, month, isMonthlyFee });
    });

    feeGroups.forEach((fees, baseFeeType) => {
      const firstFee = fees[0];
      const isMonthlyGroup = fees.some((f) => f.isMonthlyFee);

      // ⚠️ KEY: A group is "paid" if any of its months has paidAmount > 0
      const totalPaidForGroup = fees.reduce(
        (s, f) => s + (f.paidAmount || 0),
        0,
      );
      const isPaidGroup = totalPaidForGroup > 0;

      let discountRangeStart = "",
        discountRangeEnd = "",
        discountRangeAmount = 0;
      let baseDiscount = firstFee.discount || 0;

      if (isMonthlyGroup && fees.length > 1) {
        const discountCounts: { [key: number]: number } = {};
        fees.forEach((f) => {
          const d = f.discount || 0;
          discountCounts[d] = (discountCounts[d] || 0) + 1;
        });
        let maxCount = 0;
        Object.entries(discountCounts).forEach(([discount, count]) => {
          if ((count as number) > maxCount) {
            maxCount = count as number;
            baseDiscount = parseFloat(discount);
          }
        });
        const rangeMonths = fees
          .filter((f) => (f.discount || 0) !== baseDiscount && f.month)
          .map((f) => f.month);
        if (rangeMonths.length > 0) {
          rangeMonths.sort(
            (a: string, b: string) => MONTHS.indexOf(a) - MONTHS.indexOf(b),
          );
          discountRangeStart = rangeMonths[0];
          discountRangeEnd = rangeMonths[rangeMonths.length - 1];
          discountRangeAmount =
            fees.find((f) => f.month === discountRangeStart)?.discount || 0;
        }
      }

      uniqueFeeItemsMap.set(baseFeeType, {
        feeType: { label: baseFeeType, value: baseFeeType },
        amount: firstFee.amount,
        advanceAmount: 0,
        isSelected: true,
        discount: baseDiscount,
        isMonthly: isMonthlyGroup,
        discountRangeStart,
        discountRangeEnd,
        discountRangeAmount,
        // ── New fields ──────────────────────────────────────────────
        isPaid: isPaidGroup,
        paidAmount: totalPaidForGroup,
        // ────────────────────────────────────────────────────────────
        _tempId: Date.now() + Math.random(),
      });
    });
  }

  const uniqueFeeItems = Array.from(uniqueFeeItemsMap.values());

  const guardianName = data.guardianName || guardianInfo.nameEnglish || "";
  const guardianRelation = data.guardianRelation || guardianInfo.relation || "";
  const guardianMobile = data.guardianMobile || guardianInfo.mobile || "";
  const guardianWhatsapp = data.guardianWhatsapp || guardianInfo.whatsapp || "";
  const guardianProfession =
    data.guardianProfession || guardianInfo.profession || "";
  const guardianVillage = data.guardianVillage || guardianInfo.address || "";

  return {
    studentId: data.studentId || data.student?.studentId || "",
    studentNameBangla: data.nameBangla || data.student?.nameBangla || "",
    studentPhoto: data.studentPhoto || data.student?.studentPhoto || "",
    studentName: data.studentName || data.student?.name || "",
    mobileNo: data.mobileNo || data.student?.mobile || "",
    session: data.session || new Date().getFullYear().toString(),
    category:
      data.studentType ||
      data.student?.studentType?.toLowerCase() ||
      "residential",
    dateOfBirth: formatDate(data.birthDate || data.student?.birthDate),
    nidBirth:
      data.birthRegistrationNo || data.student?.birthRegistrationNo || "",
    bloodGroup: data.bloodGroup || data.student?.bloodGroup || "",
    nationality: data.nationality || "Bangladeshi",
    className: formattedClass,
    studentDepartment:
      data.studentDepartment || data.student?.studentDepartment || "hifz",
    rollNumber:
      data.roll || data.rollNumber || data.student?.studentClassRoll || "",
    section: data.section || data.student?.section?.[0] || "",
    group: data.group || data.student?.batch || "",
    optionalSubject: data.optionalSubject || "",
    shift: data.shift || data.student?.session || "",
    admissionType: data.admissionType || "",
    fatherName: data.fatherName || fatherInfo.nameEnglish || "",
    fatherNameBangla: data.fatherNameBangla || fatherInfo.nameBangla || "",
    fatherMobile: data.fatherMobile || fatherInfo.mobile || "",
    fatherNid: data.fatherNid || fatherInfo.nid || "",
    fatherProfession: data.fatherProfession || fatherInfo.profession || "",
    fatherIncome: data.fatherIncome || fatherInfo.income || 0,
    fatherWhatsapp: data.fatherWhatsapp || fatherInfo.whatsapp || "",
    fatherEducation: data.fatherEducation || fatherInfo.education || "",
    motherName: data.motherName || motherInfo.nameEnglish || "",
    motherNameBangla: data.motherNameBangla || motherInfo.nameBangla || "",
    motherMobile: data.motherMobile || motherInfo.mobile || "",
    motherNid: data.motherNid || motherInfo.nid || "",
    motherProfession: data.motherProfession || motherInfo.profession || "",
    motherIncome: data.motherIncome || motherInfo.income || 0,
    motherWhatsapp: data.motherWhatsapp || motherInfo.whatsapp || "",
    motherEducation: data.motherEducation || motherInfo.education || "",
    guardianName,
    guardianRelation,
    guardianMobile,
    guardianWhatsapp,
    guardianProfession,
    guardianVillage,
    village:
      data.presentAddress?.village ||
      data.student?.presentAddress?.village ||
      "",
    postOffice:
      data.presentAddress?.postOffice ||
      data.student?.presentAddress?.postOffice ||
      "",
    postCode:
      data.presentAddress?.postCode ||
      data.student?.presentAddress?.postCode ||
      "",
    policeStation:
      data.presentAddress?.policeStation ||
      data.student?.presentAddress?.policeStation ||
      "",
    district:
      data.presentAddress?.district ||
      data.student?.presentAddress?.district ||
      "",
    permVillage:
      data.permanentAddress?.village ||
      data.student?.permanentAddress?.village ||
      "",
    permPostOffice:
      data.permanentAddress?.postOffice ||
      data.student?.permanentAddress?.postOffice ||
      "",
    permPostCode:
      data.permanentAddress?.postCode ||
      data.student?.permanentAddress?.postCode ||
      "",
    permPoliceStation:
      data.permanentAddress?.policeStation ||
      data.student?.permanentAddress?.policeStation ||
      "",
    permDistrict:
      data.permanentAddress?.district ||
      data.student?.permanentAddress?.district ||
      "",
    formerInstitution:
      data.previousSchool?.institution ||
      data.student?.previousSchool?.institution ||
      "",
    formerVillage:
      data.previousSchool?.address ||
      data.student?.previousSchool?.address ||
      "",
    birthCertificate:
      data.documents?.birthCertificate ??
      data.student?.documents?.birthCertificate ??
      false,
    transferCertificate:
      data.documents?.transferCertificate ??
      data.student?.documents?.transferCertificate ??
      false,
    characterCertificate:
      data.documents?.characterCertificate ??
      data.student?.documents?.characterCertificate ??
      false,
    markSheet:
      data.documents?.markSheet ?? data.student?.documents?.markSheet ?? false,
    photographs:
      data.documents?.photographs ??
      data.student?.documents?.photographs ??
      false,
    termsAccepted: data.termsAccepted ?? data.student?.termsAccepted ?? false,
    fees:
      uniqueFeeItems.length > 0
        ? [
            {
              category: [],
              className: formattedClass,
              feeItems: uniqueFeeItems,
              feeAmount: uniqueFeeItems
                .filter((i) => !i.isPaid)
                .reduce((s, i) => s + (i.amount || 0), 0)
                .toString(),
            },
          ]
        : [
            {
              category: [],
              className: formattedClass,
              feeItems: [],
              feeAmount: "",
            },
          ],
    admissionFee: 0,
    monthlyFee: 0,
    discountAmount: 0,
    paymentMethod: { label: "Cash", value: "cash" },
    studentIdSelect: null,
    studentNameSelect: null,
    totalAmount: data.totalAmount || 0,
    totalDiscount: data.totalDiscount || 0,
    netPayable: data.netPayable || 0,
    paidAmount: data.paidAmount || 0,
    dueAmount: data.dueAmount || 0,
    advanceBalance: data.advanceBalance || data.student?.advanceBalance || 0,
  };
};

// ─── EnrollmentForm ───────────────────────────────────────────────────────────
const EnrollmentForm = ({ applicationId, admissionApplications }: any) => {
  const theme = useTheme();
  const limit = 200;
  const [page] = useState(0);
  const [searchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const [openAddFeeModal, setOpenAddFeeModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [enrolledStudentData, setEnrolledStudentData] = useState<any>(null);
  const [isApplicationLoading, setIsApplicationLoading] = useState(false);

  const { classOptions, feeCategoryData } = useAcademicOption();
  const [createEnrollment] = useCreateEnrollmentMutation();
  const [updateEnrollment] = useUpdateEnrollmentMutation();
  const { data: singleEnrollment, isLoading: enrollmentLoading } =
    useGetSingleEnrollmentQuery(id ? { id } : undefined, { skip: !id });
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
    if (id && singleEnrollment && classOptions.length > 0 && feeCategoryData) {
      const transformedData = transformEnrollmentDataToForm(
        singleEnrollment,
        classOptions,
        feeCategoryData,
      );
      if (transformedData) {
        if (!transformedData.paymentMethod)
          transformedData.paymentMethod = { label: "Cash", value: "cash" };
        setDefaultValues(transformedData);
        setFormKey((prev) => prev + 1);
        setActiveStep(0);
      }
    } else if (applicationId && admissionApplications?.data?.length > 0) {
      setIsApplicationLoading(true);
      const application = admissionApplications.data[0];
      const formData = transformApplicationToFormData(
        application,
        classOptions,
      );
      if (formData) {
        setDefaultValues(formData);
        setFormKey((prev) => prev + 1);
        toast.success(
          `Application ${application.applicationId} loaded successfully`,
        );
        setTimeout(() => setActiveStep(getFirstIncompleteStep(formData)), 300);
      } else toast.error("Failed to load application data");
      setIsApplicationLoading(false);
    } else if (!id && !applicationId) {
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
        fees: [{ category: [], className: [], feeItems: [], feeAmount: "" }],
        admissionFee: 0,
        monthlyFee: 0,
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
      setActiveStep(0);
    }
  }, [
    id,
    applicationId,
    singleEnrollment,
    admissionApplications,
    classOptions,
    feeCategoryData,
  ]);

  const handleApplicationSelect = useCallback(
    (application: any) => {
      if (!application) return;
      const formData = transformApplicationToFormData(
        application,
        classOptions,
      );
      if (formData) {
        setDefaultValues(formData);
        setFormKey((prev) => prev + 1);
        toast.success(
          `Application data loaded for ${formData.studentNameBangla || formData.studentName}`,
        );
        setTimeout(() => setActiveStep(getFirstIncompleteStep(formData)), 300);
      } else toast.error("Failed to load application data");
    },
    [classOptions],
  );

  const handleFinishProcess = () => {
    setOpenSuccessModal(false);
    setOpenPrintModal(false);
    setOpenAddFeeModal(false);
    setOpenPaymentModal(false);
    router.push(`/dashboard/student/list`);
  };

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

      const classNameArray = submitData.className
        .map((cls: any) => cls.value || cls)
        .filter(Boolean);
      if (!classNameArray.length) {
        toast.error("Class selection is required");
        setSubmitting(false);
        return;
      }

      const paymentMethodValue =
        typeof submitData.paymentMethod === "object"
          ? submitData.paymentMethod?.value || "cash"
          : submitData.paymentMethod || "cash";

      const studentPhotoValue =
        typeof submitData.studentPhoto === "string" &&
        submitData.studentPhoto.startsWith("data:")
          ? ""
          : submitData.studentPhoto || "";

      // ── Format fees — skip paid items (they are handled by backend) ──────
      const fees: any[] = [];

      if (
        submitData.fees &&
        Array.isArray(submitData.fees) &&
        submitData.fees.length > 0
      ) {
        for (const feeCategory of submitData.fees) {
          if (!feeCategory.feeItems?.length) continue;

          const processedFeeItems: any[] = [];

          for (const item of feeCategory.feeItems) {
            // ⚠️ Include paid items in payload with isPaid flag so backend can identify them
            // Backend will SKIP creating new fees for these and keep existing paid docs
            let feeTypeStr = "";
            if (typeof item.feeType === "object" && item.feeType !== null)
              feeTypeStr = item.feeType?.label || item.feeType?.value || "";
            else if (typeof item.feeType === "string")
              feeTypeStr = item.feeType;
            if (!feeTypeStr.trim()) continue;

            const amount = parseFloat(String(item.amount)) || 0;
            const discount = parseFloat(String(item.discount)) || 0;

            // For paid items, just pass them through unchanged (backend will skip)
            if (item.isPaid) {
              processedFeeItems.push({
                feeType: feeTypeStr,
                amount,
                discount,
                isSelected: true,
                isMonthly: item.isMonthly || false,
                isPaid: true, // signal to backend
                paidAmount: item.paidAmount || 0,
                month: item.month || (item.isMonthly ? "Monthly" : "Admission"),
              });
              continue;
            }

            if (item.isSelected === false) continue;
            if (amount <= 0) continue;

            const isMonthly =
              item.isMonthly === true ||
              feeTypeStr.toLowerCase().includes("monthly");
            const feeItemObj: any = {
              feeType: feeTypeStr,
              amount,
              discount,
              isSelected: true,
              isMonthly,
              isPaid: false,
              month: item.month || (isMonthly ? "Monthly" : "Admission"),
            };

            if (isMonthly) {
              feeItemObj.discountRangeStart = item.discountRangeStart || "";
              feeItemObj.discountRangeEnd = item.discountRangeEnd || "";
              feeItemObj.discountRangeAmount =
                parseFloat(String(item.discountRangeAmount)) || 0;
            }
            if (item.advanceAmount)
              feeItemObj.advanceAmount =
                parseFloat(String(item.advanceAmount)) || 0;
            processedFeeItems.push(feeItemObj);
          }

          if (processedFeeItems.length > 0) {
            let categoryName = "";
            if (feeCategory.category?.length > 0) {
              categoryName =
                typeof feeCategory.category[0] === "object"
                  ? feeCategory.category[0]?.label ||
                    feeCategory.category[0]?.value ||
                    ""
                  : feeCategory.category[0] || "";
            }
            let className = "";
            if (feeCategory.className?.length > 0) {
              className =
                typeof feeCategory.className[0] === "object"
                  ? feeCategory.className[0]?.label ||
                    feeCategory.className[0]?.value ||
                    ""
                  : feeCategory.className[0] || "";
            }
            fees.push({
              category: categoryName,
              className,
              feeItems: processedFeeItems,
            });
          }
        }
      }

      const totalPaidAmount = parseFloat(String(submitData.paidAmount)) || 0;

      const finalSubmitData: any = {
        studentName: submitData.studentName || "",
        nameBangla: submitData.studentNameBangla || "",
        studentPhoto: studentPhotoValue,
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
        roll: submitData.rollNumber || "",
        session: submitData.session || String(new Date().getFullYear()),
        group: submitData.group || "",
        category: submitData.category || "Residential",
        studentDepartment: submitData.studentDepartment || "hifz",
        fatherName: submitData.fatherName || "",
        fatherNameBangla: submitData.fatherNameBangla || "",
        fatherMobile: submitData.fatherMobile || "",
        fatherNid: submitData.fatherNid || "",
        fatherProfession: submitData.fatherProfession || "",
        fatherIncome: Number(submitData.fatherIncome) || 0,
        fatherWhatsapp: submitData.fatherWhatsapp || "",
        fatherEducation: submitData.fatherEducation || "",
        motherName: submitData.motherName || "",
        motherNameBangla: submitData.motherNameBangla || "",
        motherMobile: submitData.motherMobile || "",
        motherNid: submitData.motherNid || "",
        motherProfession: submitData.motherProfession || "",
        motherIncome: Number(submitData.motherIncome) || 0,
        motherWhatsapp: submitData.motherWhatsapp || "",
        motherEducation: submitData.motherEducation || "",
        guardianName: submitData.guardianName || "",
        guardianRelation: submitData.guardianRelation || "",
        guardianMobile: submitData.guardianMobile || "",
        guardianWhatsapp: submitData.guardianWhatsapp || "",
        guardianProfession: submitData.guardianProfession || "",
        guardianVillage: submitData.guardianVillage || "",
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
        fees,
        termsAccepted: Boolean(submitData.termsAccepted),
        advanceBalance: Number(submitData.advanceBalance) || 0,
        paidAmount: totalPaidAmount,
        paymentMethod: paymentMethodValue,
        collectedBy: "Admin",
        familyEnvironment: submitData.familyEnvironment,
        behaviorSkills: submitData.behaviorSkills,
      };

      let res;
      if (id)
        res = await updateEnrollment({ id, data: finalSubmitData }).unwrap();
      else
        res = await createEnrollment({
          data: finalSubmitData,
          applicationId,
        }).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Student enrolled successfully");
        setEnrolledStudentData(res.data);
        setOpenSuccessModal(true);
      } else {
        throw new Error(res?.message || "Failed to enroll student");
      }
    } catch (err: any) {
      let errorMessage = "Failed to enroll student!";
      if (err?.data?.message) errorMessage = err.data.message;
      else if (err?.data?.errorSources?.[0]?.message)
        errorMessage = err.data.errorSources[0].message;
      else if (err?.message) errorMessage = err.message;
      toast.error(errorMessage);
      console.error("Submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveStep((prev) => prev + 1);
    document
      .getElementById("form-content-wrapper")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveStep((prev) => prev - 1);
    document
      .getElementById("form-content-wrapper")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getClassLabel = (clsData: any) => {
    if (!clsData) return "";
    if (Array.isArray(clsData) && clsData.length > 0)
      return clsData[0]?.label || clsData[0]?.className || clsData[0];
    if (typeof clsData === "object") return clsData.label || clsData.className;
    return clsData;
  };

  const feeDataForPaymentModal = enrolledStudentData
    ? {
        _id: enrolledStudentData._id,
        feeType: "Enrollment Due",
        month: enrolledStudentData.session,
        class: getClassLabel(enrolledStudentData.className),
        amount: enrolledStudentData.totalAmount,
        discount: enrolledStudentData.totalDiscount,
        waiver: 0,
        paidAmount: enrolledStudentData.paidAmount,
        dueAmount: enrolledStudentData.dueAmount,
        studentName: enrolledStudentData.studentName,
      }
    : {};

  const studentDataForAddFeeModal = enrolledStudentData?.student
    ? {
        ...enrolledStudentData.student,
        className: enrolledStudentData.className,
        name: enrolledStudentData.studentName,
      }
    : enrolledStudentData;

  if (enrollmentLoading || isApplicationLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
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
            <Box
              display="flex"
              alignItems="center"
              sx={{ width: "100%", flex: 1 }}
            >
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
              <Box
                ml={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%", flex: 1 }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  Student Enrollment
                </Typography>
                {admissionApplications?.data?.[0] && (
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, lineHeight: 1.2 }}
                  >
                    {admissionApplications.data[0].studentInfo?.nameEnglish ||
                      admissionApplications.data[0].studentInfo?.nameBangla ||
                      "Student Name"}
                  </Typography>
                )}
              </Box>
            </Box>
          </Paper>

          {!id && !applicationId && (
            <AdmissionApplicationSelector onSelect={handleApplicationSelect} />
          )}

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
                "&:hover": { color: "text.primary" },
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

        <Dialog
          open={openSuccessModal}
          onClose={() => {}}
          maxWidth="sm"
          fullWidth
          PaperProps={{ sx: { borderRadius: 3, p: 2, textAlign: "center" } }}
        >
          <DialogContent sx={{ py: 4 }}>
            <Avatar
              sx={{
                bgcolor: "success.main",
                width: 64,
                height: 64,
                margin: "0 auto 16px",
              }}
            >
              <Check sx={{ fontSize: 40, color: "#fff" }} />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Enrollment Successful!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Student has been enrolled successfully for the session{" "}
              {new Date().getFullYear()}.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Name: <strong>{enrolledStudentData?.studentName}</strong>
            </Typography>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
              gap: 2,
              pb: 3,
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "100%",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenSuccessModal(false);
                  setOpenPrintModal(true);
                }}
                startIcon={<Print />}
                sx={{ borderRadius: 2, px: 3 }}
              >
                Print Receipt
              </Button>
            </Box>
            <Button variant="text" onClick={handleFinishProcess}>
              Close & Go to List
            </Button>
          </DialogActions>
        </Dialog>

        <PrintModal
          open={openPrintModal}
          setOpen={setOpenPrintModal}
          receipt={enrolledStudentData?.data?.receipt}
          student={enrolledStudentData?.data?.student || enrolledStudentData}
          onClose={() => {
            setTimeout(() => {
              window.location.href = "/dashboard/student/list";
            }, 100);
          }}
        />
        <AddFeeModal
          open={openAddFeeModal}
          setOpen={setOpenAddFeeModal}
          student={studentDataForAddFeeModal}
        />
        <PaymentModal
          open={openPaymentModal}
          onClose={() => setOpenPaymentModal(false)}
          fee={feeDataForPaymentModal}
          onPaymentSuccess={() => {
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
