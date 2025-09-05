/* eslint-disable @typescript-eslint/no-explicit-any */
// components/AddReturnDialog.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid } from "@mui/material"
import { Cancel as CancelIcon, Save as SaveIcon, TrendingUp as TrendingUpIcon } from "@mui/icons-material"
import CraftForm from "@/components/Forms/Form"
import CraftSelect from "@/components/Forms/Select"
import CraftInput from "@/components/Forms/Input"
import CraftDatePicker from "@/components/Forms/DatePicker"
import { FieldValues } from "react-hook-form"
import { useAddInvestmentReturnMutation } from "@/redux/api/investmentApi"
import toast from "react-hot-toast"

interface AddReturnDialogProps {
  open: boolean
  onClose: () => void
  investmentId: string
  refetch: () => void
}

const AddReturnDialog = ({ open, onClose, investmentId, refetch }: AddReturnDialogProps) => {
  const [addReturn] = useAddInvestmentReturnMutation()

  const handleSubmit = async (data: FieldValues) => {
    console.log('raw data', data)
    const submitData = {
      ...data,
      amount: Number(data.amount)
    }
    try {
      const res = await addReturn({ id: investmentId, data: submitData }).unwrap()

      if (res.success) {
        toast.success("Return added successfully!")
        refetch()
        onClose()
      } else {
        toast.error(res.message || "Failed to add return")
      }
    } catch (error: any) {
      toast.error(error.data?.message || "Something went wrong!")
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <CraftForm onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TrendingUpIcon />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Add Investment Return
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CraftInput
                fullWidth
                name="amount"
                label="Amount"
                type="number"
                
              />
            </Grid>

            <Grid item xs={12}>
              <CraftSelect
                fullWidth
                name="type"
                label="Return Type"
                items={['interest', 'principal', 'dividend', 'capital_gain'
                ]}
                
              />
            </Grid>

            <Grid item xs={12}>
              <CraftDatePicker
                fullWidth
                name="date"
                label="Return Date"
                
              />
            </Grid>

            <Grid item xs={12}>
              <CraftInput
                fullWidth
                name="note"
                label="Note"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, bgcolor: "#F9FAFB" }}>
          <Button
            onClick={onClose}
            startIcon={<CancelIcon />}
            variant="outlined"
            sx={{
              borderColor: "#D1D5DB",
              color: "#6B7280",
              "&:hover": { borderColor: "#9CA3AF", bgcolor: "#F3F4F6" },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            startIcon={<SaveIcon />}
            variant="contained"
            sx={{
              bgcolor: "#10B981",
              "&:hover": { bgcolor: "#059669" },
              fontWeight: 600,
            }}
          >
            Add Return
          </Button>
        </DialogActions>
      </CraftForm>
    </Dialog>
  )
}

export default AddReturnDialog