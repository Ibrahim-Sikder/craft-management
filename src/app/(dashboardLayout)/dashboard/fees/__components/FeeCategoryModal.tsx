/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Save as SaveIcon } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";

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
import toast from "react-hot-toast";

export default function FeeCategoryModal({ open, setOpen, id }: any) {
  const [createFeeCategory] = useCreateFeeCategoryMutation();
  const [updateFeeCategory] = useUpdateFeeCategoryMutation();
  const { data: singleFee, isLoading } = useGetSingleFeeCategoryQuery(id, {
    skip: !id,
  });
  const { classOptions } = useAcademicOption();

  const handleSubmit = async (data: FieldValues) => {
    const submitData = {
      ...data,
      class: data.class?.label || data.class,
      feeAmount: Number(data.feeAmount),
    };

    try {
      let res;

      if (id) {
        res = await updateFeeCategory({ id, data: submitData }).unwrap();
        if (res?.success) {
          toast.success(res.message || "Fee category updated successfully!");
          setOpen(false);
        }
      } else {
        res = await createFeeCategory(submitData).unwrap();
        if (res?.success) {
          toast.success(res.message || "Fee category created successfully!");
          setOpen(false);
        }
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.message || "Failed to save fee category!"
      );
    }
  };

  const getDefaultValues = () => {
    if (id && singleFee?.data) {
      const classOption = classOptions.find(
        (option: any) => option.label === singleFee.data.class
      );

      return {
        class: classOption || { label: singleFee.data.class },
        feeType: singleFee.data.feeType || "",
        feeAmount: singleFee.data.feeAmount || "",
      };
    }

    return {
      class: null,
      feeType: "",
      feeAmount: "",
    };
  };

  const title = id ? "Update Fee Category" : "Add New Fee Category";

  return (
    <CraftModal open={open} setOpen={setOpen} title={title} size="md">
      <CraftForm
        onSubmit={handleSubmit}
        defaultValues={getDefaultValues()}
        key={id || "create"}
      >
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <CraftIntAutoCompleteWithIcon
                margin="none"
                fullWidth
                label="Class"
                name="class"
                options={classOptions}
                sx={inputStyle}
                required
                multiple={false}
                freeSolo={false}
                placeholder="Select class"
                defaultValue={getDefaultValues().class}
              />
            </Grid>

            <Grid item xs={12}>
              <CraftInput
                fullWidth
                label="Fee Type"
                name="feeType"
                margin="none"
                sx={inputStyle}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <CraftInput
                fullWidth
                label="Fee Amount"
                name="feeAmount"
                type="number"
                margin="none"
                sx={inputStyle}
                required
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            pt: 3,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            endIcon={<SaveIcon />}
            sx={buttonStyle}
            disabled={isLoading}
          >
            {id ? "Update Fee Record" : "Save Fee Record"}
          </Button>
        </Box>
      </CraftForm>
    </CraftModal>
  );
}
