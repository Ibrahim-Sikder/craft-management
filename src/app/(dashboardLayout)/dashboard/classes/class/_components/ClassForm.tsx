/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { LoadingState } from "@/components/common/LoadingState";
import CraftForm from "@/components/Forms/Form";
import CraftInputWithIcon from "@/components/Forms/inputWithIcon";
import CraftSelect from "@/components/Forms/Select";
import CraftModal from "@/components/Shared/Modal";
import {
  useCreateClassMutation,
  useGetSingleClassQuery,
  useUpdateClassMutation,
} from "@/redux/api/classApi";
import { Class as ClassIcon } from "@mui/icons-material";
import { Grid, Button, Stack, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export default function ClassModal({
  id,
  onSuccess,
  open,
  setOpen,
  onClose,
}: any) {
  const router = useRouter();

  // Only fetch if we have an id (edit mode) and modal is open
  const { data: singleClass, isLoading } = useGetSingleClassQuery(
    { id: id || "" },
    { skip: !id || !open },
  );

  const [createClass] = useCreateClassMutation();
  const [updateClass] = useUpdateClassMutation();

  const handleSubmit = async (data: FieldValues) => {
    const modifyValues = {
      ...data,
    };

    try {
      let res;
      if (id) {
        // Update mode
        res = await updateClass({ id, data: modifyValues }).unwrap();
        if (res?.success) {
          toast.success("Class updated successfully!");
          if (onSuccess) onSuccess();
        }
      } else {
        // Create mode
        res = await createClass(modifyValues).unwrap();
        if (res.success) {
          toast.success("Class created successfully!");
          if (onSuccess) onSuccess();
        }
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message ||
          "Failed to save class. Class name might already exist!",
      );
    }
  };

  // Set default values based on mode
  const defaultValue = {
    className: singleClass?.data?.className || "",
    department: singleClass?.data?.department || "",
  };

  const handleModalClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    if (!open) {
    }
  }, [open]);

  if (isLoading && id && open) {
    return <LoadingState />;
  }

  return (
    <CraftModal
      title={id ? "Update Class" : "Create New Class"}
      onClose={handleModalClose}
      setOpen={setOpen}
      open={open}
      size="sm"
    >
      <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CraftInputWithIcon
                name="className"
                fullWidth
                label="Class Name"
                variant="outlined"
                placeholder="Enter class name"
                required
                InputProps={{
                  startAdornment: (
                    <ClassIcon sx={{ color: "text.secondary", mr: 1 }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CraftSelect
                name="department"
                fullWidth
                label="Deartment"
                placeholder="Enter class name"
                items={["hifz", "academic"]}
              />
            </Grid>
          </Grid>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: 3 }}
          >
            <Button
              onClick={handleModalClose}
              variant="outlined"
              color="inherit"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {id ? "Update Class" : "Create Class"}
            </Button>
          </Stack>
        </Box>
      </CraftForm>
    </CraftModal>
  );
}
