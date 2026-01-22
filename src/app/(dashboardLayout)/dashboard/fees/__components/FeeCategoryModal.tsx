/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Add as AddIcon,
  Class,
  Delete as DeleteIcon,
  Save as SaveIcon
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography
} from "@mui/material";
import { useEffect, useMemo } from "react";

import CraftAutoComplete from "@/components/Forms/AutoComplete";
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon";
import CraftForm from "@/components/Forms/Form";
import CraftInput from "@/components/Forms/Input";
import CraftModal from "@/components/Shared/Modal";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import {
  useCreateFeeCategoryMutation,
  useGetSingleFeeCategoryQuery,
  useUpdateFeeCategoryMutation,
} from "@/redux/api/feeCategoryApi";
import { buttonStyle, inputStyle } from "@/style/customeStyle";
import { useState } from "react";
import toast from "react-hot-toast";
import { FieldValues } from "react-hook-form";

// Backend enum Options
const CATEGORY_OPTIONS = [
  { title: "Residential" },
  { title: "Non-Residential" },
  { title: "Day Care" },
  { title: "Non-Residential One Meal" },
  { title: "Day Care One Meal" },
];

const FEE_TYPE_OPTIONS = [
  { title: "Monthly Fee" },
  { title: "Tuition Fee" },
  { title: "Meal Fee" },
  { title: "Seat Rent" },
  { title: "Day Care Fee" },
  { title: "Admission Fee" },
  { title: "Exam Fee" },
  { title: "Form Fee" },
];

const FeeItemsField = ({ feeItems, onAdd, onRemove }: any) => {
  return (
    <Grid item xs={12}>
      <Paper sx={{
        p: 3,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h6" component="div">
            Fee Items <span style={{ color: "red" }}>*</span>
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onAdd}
            size="small"
          >
            Add Fee Item
          </Button>
        </Box>

        {feeItems.length === 0 ? (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 3, fontStyle: 'italic' }}>
            No fee items added.
          </Typography>
        ) : (
          feeItems.map((item: any, index: number) => (
            <Box
              key={item.tempId || index}
              sx={{
                mb: 2,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'background.default'
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={5}>
                  <CraftAutoComplete
                    fullWidth
                    label="Fee Type"
                    name={`feeItems.${index}.feeType`}
                    margin="none"
                    options={FEE_TYPE_OPTIONS}
                    sx={inputStyle}
                    placeholder="Select fee type"
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <CraftInput
                    fullWidth
                    label="Amount"
                    name={`feeItems.${index}.amount`}
                    type="number"
                    margin="none"
                    sx={inputStyle}
                    placeholder="Enter amount"
                  />
                </Grid>
                <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                  {feeItems.length > 1 && (
                    <IconButton onClick={() => onRemove(index)} color="error" size="small">
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </Box>
          ))
        )}
      </Paper>
    </Grid>
  );
};

export default function FeeCategoryModal({ open, setOpen, id }: any) {
  const [createFeeCategory] = useCreateFeeCategoryMutation();
  const [updateFeeCategory] = useUpdateFeeCategoryMutation();
  const { data: singleFee, isLoading } = useGetSingleFeeCategoryQuery(id, { skip: !id });
  const { classOptions } = useAcademicOption();

  // State for visual mapping of fee items
  const [feeItems, setFeeItems] = useState<Array<{ tempId: number; feeType: any[]; amount: string }>>(
    [{ tempId: Date.now(), feeType: [], amount: "" }]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to normalize feeType data
  const normalizeFeeType = (feeTypeData: any): string => {
    if (!feeTypeData) return "";

    // If it's already a string, return it
    if (typeof feeTypeData === 'string') return feeTypeData;

    // If it's an array
    if (Array.isArray(feeTypeData)) {
      // If it's an array of objects like [{title: 'Day Care Fee'}]
      if (feeTypeData.length > 0 && feeTypeData[0]?.title) {
        return feeTypeData[0].title;
      }
      // If it's an array of strings like ['Day Care Fee']
      if (feeTypeData.length > 0 && typeof feeTypeData[0] === 'string') {
        return feeTypeData[0];
      }
      // If it's an empty array
      return "";
    }

    // If it's an object
    if (feeTypeData?.title) {
      return feeTypeData.title;
    }

    return "";
  };

  // FIX 1: Memoize default values
  const defaultValues = useMemo(() => {
    if (id && singleFee?.data) {
      const classOption = classOptions.find((option: any) => option.label === singleFee.data.className);

      // Transform backend data to match form structure
      const backendFeeItems = singleFee.data.feeItems?.map((item: any) => ({
        // For form, we need to convert feeType string to the format CraftAutoComplete expects
        feeType: item.feeType ? [{ title: item.feeType }] : [],
        amount: item.amount?.toString() || ""
      })) || [{ feeType: [], amount: "" }];

      return {
        class: classOption ? [classOption] : [],
        category: singleFee.data.categoryName ? [{ title: singleFee.data.categoryName }] : [],
        feeItems: backendFeeItems
      };
    }

    // Default for Create mode
    return {
      class: [],
      category: [],
      feeItems: [{ feeType: [], amount: "" }]
    };
  }, [id, singleFee, classOptions]);

  // FIX 2: Update local state separately using useEffect
  useEffect(() => {
    if (id && singleFee?.data) {
      const backendFeeItems = singleFee.data.feeItems?.map((item: any) => ({
        tempId: Date.now() + Math.random(),
        feeType: item.feeType ? [{ title: item.feeType }] : [],
        amount: item.amount?.toString() || ""
      })) || [{ tempId: Date.now(), feeType: [], amount: "" }];
      setFeeItems(backendFeeItems);
    } else if (!id && open) {
      // Reset for Create mode
      setFeeItems([{ tempId: Date.now(), feeType: [], amount: "" }]);
    }
  }, [id, singleFee, open]);

  const handleSubmit = async (data: FieldValues) => {
    console.log('Form raw data:', data);

    if (!data.class || data.class.length === 0) return toast.error("Please select a class");
    // if (!data.category || data.category.length === 0) return toast.error("Please select a category");
    if (!data.feeItems || data.feeItems.length === 0) return toast.error("Please add at least one fee item");

    console.log('Processing fee items:', data.feeItems);

    // Validate fee items with better debugging
    const validFeeItems = data.feeItems.filter((item: any, index: number) => {
      const feeTypeValue = normalizeFeeType(item.feeType);
      const amountValue = item.amount;
      const isValid = feeTypeValue &&
        feeTypeValue.trim() !== "" &&
        amountValue !== "" &&
        !isNaN(Number(amountValue)) &&
        Number(amountValue) > 0;

      console.log(`Item ${index}:`, {
        rawFeeType: item.feeType,
        normalizedFeeType: feeTypeValue,
        amount: amountValue,
        isValid: isValid
      });

      return isValid;
    });

    console.log('Valid fee items:', validFeeItems);

    if (validFeeItems.length === 0) {
      toast.error("Please add valid fee items");
      return;
    }

    // Check for duplicate fee types
    const feeTypeSet = new Set();
    const hasDuplicates = validFeeItems.some((item: any) => {
      const feeTypeValue = normalizeFeeType(item.feeType);
      if (feeTypeSet.has(feeTypeValue)) {
        toast.error(`Duplicate fee type: ${feeTypeValue}`);
        return true;
      }
      feeTypeSet.add(feeTypeValue);
      return false;
    });

    if (hasDuplicates) return;

    const submitData = {
      categoryName: data.category[0]?.title || normalizeFeeType(data.category),
      className: data.class[0]?.label,
      feeItems: validFeeItems.map((item: any) => ({
        feeType: normalizeFeeType(item.feeType),
        amount: Number(item.amount)
      }))
    };

    console.log('Submitting data to backend:', submitData);

    setIsSubmitting(true);
    try {
      const res = id
        ? await updateFeeCategory({ id, data: submitData }).unwrap()
        : await createFeeCategory(submitData).unwrap();

      if (res?.success) {
        toast.success(res.message || "Saved successfully!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      toast.error(err?.data?.message || "Failed to save!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddFeeItem = () => {
    const newFeeItem = { tempId: Date.now(), feeType: [], amount: "" };
    setFeeItems([...feeItems, newFeeItem]);
  };

  const handleRemoveFeeItem = (index: number) => {
    if (feeItems.length > 1) {
      const newFeeItems = [...feeItems];
      newFeeItems.splice(index, 1);
      setFeeItems(newFeeItems);
    }
  };

  const title = id ? "Update Fee Category" : "Add New Fee Category";
  const totalLoading = isLoading || isSubmitting;

  return (
    <CraftModal open={open} setOpen={setOpen} title={title} size="lg">
      {isLoading && id ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <CraftForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          key={`${id || 'create'}-${open}`}
        >
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CraftIntAutoCompleteWithIcon
                  name="class"
                  label={<span>Class <span style={{ color: "red" }}>*</span></span>}
                  placeholder="Select Class"
                  options={classOptions}
                  fullWidth
                  icon={<Class color="primary" />}
                  sx={inputStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CraftAutoComplete
                  fullWidth
                  label="Category"

                  name="category"
                  margin="none"
                  options={CATEGORY_OPTIONS}
                  sx={inputStyle}
                />
              </Grid>

              <FeeItemsField
                feeItems={feeItems}
                onAdd={handleAddFeeItem}
                onRemove={handleRemoveFeeItem}
              />
            </Grid>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", pt: 3, mt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
              <Button type="button" variant="outlined" onClick={() => setOpen(false)} disabled={totalLoading}>Cancel</Button>
              <Button type="submit" variant="contained" endIcon={totalLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />} sx={buttonStyle} disabled={totalLoading}>
                {totalLoading ? "Saving..." : (id ? "Update" : "Save")}
              </Button>
            </Box>
          </Box>
        </CraftForm>
      )}
    </CraftModal>
  );
}