/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Add as AddIcon,
  Class,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
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
import { CATEGORY_OPTIONS, FEE_TYPE_OPTIONS } from "@/options/feeCategory";

const FeeItemsField = ({ feeItems, onAdd, onRemove }: any) => {
  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          p: 3,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
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
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", py: 3, fontStyle: "italic" }}
          >
            No fee items added.
          </Typography>
        ) : (
          feeItems.map((item: any, index: number) => (
            <Box
              key={item.tempId || index}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                bgcolor: "background.default",
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
                <Grid
                  item
                  xs={12}
                  sm={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {feeItems.length > 1 && (
                    <IconButton
                      onClick={() => onRemove(index)}
                      color="error"
                      size="small"
                    >
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
  const { data: singleFee, isLoading } = useGetSingleFeeCategoryQuery(id, {
    skip: !id,
  });
  const { classOptions } = useAcademicOption();

  const [feeItems, setFeeItems] = useState<
    Array<{ tempId: number; feeType: any[]; amount: string }>
  >([{ tempId: Date.now(), feeType: [], amount: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalizeFeeType = (feeTypeData: any): string => {
    if (!feeTypeData) return "";
    if (typeof feeTypeData === "string") return feeTypeData;
    if (Array.isArray(feeTypeData)) {
      if (feeTypeData.length > 0 && feeTypeData[0]?.title) {
        return feeTypeData[0].title;
      }
      if (feeTypeData.length > 0 && typeof feeTypeData[0] === "string") {
        return feeTypeData[0];
      }
      return "";
    }
    if (feeTypeData?.title) {
      return feeTypeData.title;
    }
    return "";
  };

  // Get single class value for update mode
  const getSingleClassValue = () => {
    if (id && singleFee?.data) {
      const classOption = classOptions.find(
        (option: any) => option.label === singleFee.data.className
      );
      return classOption ? [classOption] : [];
    }
    return [];
  };

  const defaultValues = useMemo(() => {
    if (id && singleFee?.data) {
      const backendFeeItems = singleFee.data.feeItems?.map((item: any) => ({
        feeType: item.feeType ? [{ title: item.feeType }] : [],
        amount: item.amount?.toString() || "",
      })) || [{ feeType: [], amount: "" }];

      return {
        classes: getSingleClassValue(), // For update, use single class
        category: singleFee.data.categoryName
          ? [{ title: singleFee.data.categoryName }]
          : [],
        feeItems: backendFeeItems,
      };
    }
    return {
      classes: [], // Multiple classes selection for create
      category: [],
      feeItems: [{ feeType: [], amount: "" }],
    };
  }, [id, singleFee, classOptions]);

  useEffect(() => {
    if (id && singleFee?.data) {
      const backendFeeItems = singleFee.data.feeItems?.map((item: any) => ({
        tempId: Date.now() + Math.random(),
        feeType: item.feeType ? [{ title: item.feeType }] : [],
        amount: item.amount?.toString() || "",
      })) || [{ tempId: Date.now(), feeType: [], amount: "" }];
      setFeeItems(backendFeeItems);
    } else if (!id && open) {
      setFeeItems([{ tempId: Date.now(), feeType: [], amount: "" }]);
    }
  }, [id, singleFee, open]);

  const handleSubmit = async (data: FieldValues) => {
    // Validation for class selection
    if (!data.classes || data.classes.length === 0) {
      return toast.error("Please select at least one class");
    }

    // Validation for category
    if (!data.category || data.category.length === 0) {
      return toast.error("Please select a category");
    }

    // Validation for fee items
    if (!data.feeItems || data.feeItems.length === 0) {
      return toast.error("Please add at least one fee item");
    }

    // Process and validate fee items
    const validFeeItems = data.feeItems.filter((item: any) => {
      const feeTypeValue = normalizeFeeType(item.feeType);
      const amountValue = item.amount;
      const isValid =
        feeTypeValue &&
        feeTypeValue.trim() !== "" &&
        amountValue !== "" &&
        !isNaN(Number(amountValue)) &&
        Number(amountValue) > 0;
      return isValid;
    });

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

    // Get category name
    const categoryName = data.category[0]?.title || normalizeFeeType(data.category);

    // Prepare fee items data
    const feeItemsData = validFeeItems.map((item: any) => ({
      feeType: normalizeFeeType(item.feeType),
      amount: Number(item.amount),
    }));

    setIsSubmitting(true);
    try {
      if (id) {
        // Update mode - single class
        const classNames = data.classes.map((cls: any) => cls.label);
        if (classNames.length !== 1) {
          toast.error("Update mode supports only one class");
          return;
        }

        const submitData = {
          categoryName,
          className: classNames[0],
          feeItems: feeItemsData,
        };

        const res = await updateFeeCategory({ id, data: submitData }).unwrap();
        if (res?.success) {
          toast.success(res.message || "Updated successfully!");
          setOpen(false);
        }
      } else {
        // Create mode - multiple classes
        const classNames = data.classes.map((cls: any) => cls.label);

        // Create array of fee categories for each class
        const feeCategoriesData = classNames.map((className: string) => ({
          categoryName,
          className,
          feeItems: feeItemsData,
        }));

        const res = await createFeeCategory(feeCategoriesData).unwrap();
        if (res?.success) {
          const message = classNames.length > 1
            ? `${classNames.length} fee categories created successfully!`
            : "Fee category created successfully!";
          toast.success(message);
          setOpen(false);
        }
      }
    } catch (err: any) {
      console.error("Submission error:", err);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <CraftForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          key={`${id || "create"}-${open}`}
        >
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={id ? 12 : 6}>
                <CraftIntAutoCompleteWithIcon
                  name="classes"
                  label={
                    <span>
                      Class{!id && "es"} <span style={{ color: "red" }}>*</span>
                      {!id && <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        (Select multiple for multiple classes)
                      </Typography>}
                    </span>
                  }
                  placeholder={id ? "Select Class" : "Select Classes"}
                  options={classOptions}
                  fullWidth
                  icon={<Class color="primary" />}
                  sx={inputStyle}
                  multiple={!id} // Allow multiple selection only in create mode
                />
              </Grid>

              {!id && (
                <Grid item xs={12} sm={6}>
                  <CraftAutoComplete
                    fullWidth
                    label="Category"
                    name="category"
                    margin="none"
                    options={CATEGORY_OPTIONS}
                    sx={inputStyle}
                    placeholder="Select category"
                  />
                </Grid>
              )}

              {id && (
                <Grid item xs={12} sm={6}>
                  <CraftAutoComplete
                    fullWidth
                    label="Category"
                    name="category"
                    margin="none"
                    options={CATEGORY_OPTIONS}
                    sx={inputStyle}
                    placeholder="Select category"
                  />
                </Grid>
              )}

              <FeeItemsField
                feeItems={feeItems}
                onAdd={handleAddFeeItem}
                onRemove={handleRemoveFeeItem}
              />
            </Grid>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                pt: 3,
                mt: 3,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Button
                type="button"
                variant="outlined"
                onClick={() => setOpen(false)}
                disabled={totalLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                endIcon={
                  totalLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SaveIcon />
                  )
                }
                sx={buttonStyle}
                disabled={totalLoading}
              >
                {totalLoading
                  ? "Saving..."
                  : id
                    ? "Update"
                    : "Save"}
              </Button>
            </Box>
          </Box>
        </CraftForm>
      )}
    </CraftModal>
  );
}