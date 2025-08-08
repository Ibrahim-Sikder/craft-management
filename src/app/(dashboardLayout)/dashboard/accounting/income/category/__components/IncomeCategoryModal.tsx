/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DialogActions, Grid } from "@mui/material";
import CraftModal from "@/components/Shared/Modal";
import CraftForm from "@/components/Forms/Form";
import { FieldValues } from "react-hook-form";
import CraftInput from "@/components/Forms/Input";
import {
  useCreateIncomeCategoryMutation,
  useGetSingleIncomeCategoryQuery,
  useUpdateIncomeCategoryMutation,
} from "@/redux/api/incomeCategoryApi";
import toast from "react-hot-toast";
import { useState, Dispatch, SetStateAction } from "react";

type CategoryProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  categoryId: string | null;
};

const IncomeCategoryModal = ({ open, setOpen, categoryId }: CategoryProps) => {
  const { data: singleIncomeData, isLoading } = useGetSingleIncomeCategoryQuery({ id: categoryId });

  const [loading, setLoading] = useState(false);
  const [createIncomeCategory] = useCreateIncomeCategoryMutation();
  const [updateIncomeCategory] = useUpdateIncomeCategoryMutation();

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading(categoryId ? "Updating Income Category..." : "Creating Income Category...");
    setLoading(true);

    try {
      let res;
      if (categoryId) {
        res = await updateIncomeCategory({ id: categoryId, data }).unwrap();
      } else {
        res = await createIncomeCategory(data).unwrap();
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
    name: singleIncomeData?.data?.name || "",
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

export default IncomeCategoryModal;
