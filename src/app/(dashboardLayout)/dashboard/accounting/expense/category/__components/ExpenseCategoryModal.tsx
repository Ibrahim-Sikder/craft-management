/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DialogActions, Grid } from "@mui/material";
import CraftModal from "@/components/Shared/Modal";
import CraftForm from "@/components/Forms/Form";
import { FieldValues } from "react-hook-form";
import CraftInput from "@/components/Forms/Input";
import toast from "react-hot-toast";
import { useState, Dispatch, SetStateAction } from "react";
import { useCreateExpenseCategoryMutation, useGetSingleExpenseCategoryQuery, useUpdateExpenseCategoryMutation } from "@/redux/api/expenseCategoryApi";

type CategoryProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  categoryId: string | null;
};

const ExpenseCategoryModal = ({ open, setOpen, categoryId }: CategoryProps) => {
  const { data: singleExpenseData, isLoading } = useGetSingleExpenseCategoryQuery({ id: categoryId });

  const [loading, setLoading] = useState(false);
  const [createExpenseCategory] = useCreateExpenseCategoryMutation();
  const [updateExpenseCategory] = useUpdateExpenseCategoryMutation();

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading(categoryId ? "Updating Income Category..." : "Creating Income Category...");
    setLoading(true);

    try {
      let res;
      if (categoryId) {
        res = await updateExpenseCategory({ id: categoryId, data }).unwrap();
      } else {
        res = await createExpenseCategory(data).unwrap();
      }

      if (res?.success) {
        toast.success(res?.message || "Operation successful", { id: toastId });
        setOpen(false);
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.message || "Operation failed!", { id: toastId });
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  const defaultValues = {
    name: singleExpenseData?.data?.name || "",
  };

  return (
    <>
      {isLoading ? (
        <h3>Loading.........</h3>
      ) : (
        <CraftModal sx={{ width: "40%", margin: "0 auto" }} open={open} setOpen={setOpen} title="Create Income Category">
          <CraftForm onSubmit={handleSubmit} defaultValues={defaultValues}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CraftInput name="name" label="Category Name" fullWidth />
              </Grid>
            </Grid>

            <DialogActions sx={{ mt: 3 }}>
              <Button
                type="submit"
                disabled={loading}
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
                  color: "#fff",
                }}
              >
                {loading ? "Submitting..." : categoryId ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </CraftForm>
        </CraftModal>
      )}
    </>
  );
};

export default ExpenseCategoryModal;
