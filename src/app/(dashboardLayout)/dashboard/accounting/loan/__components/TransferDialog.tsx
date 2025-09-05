/* eslint-disable @typescript-eslint/no-explicit-any */
// components/TransferDialog.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid } from "@mui/material"
// import { CancelIcon, SaveIcon, TransferIcon } from "@mui/icons-material"
import CraftForm from "@/components/Forms/Form"
import CraftInput from "@/components/Forms/Input"
import CraftDatePicker from "@/components/Forms/DatePicker"
import { FieldValues } from "react-hook-form"
import { useTransferLoanMutation } from "@/redux/api/loanApi"
import toast from "react-hot-toast"
import { Cancel, TransferWithinAStation } from "@mui/icons-material"
import { GridSaveAltIcon } from "@mui/x-data-grid"

interface TransferDialogProps {
  open: boolean
  onClose: () => void
  loanId: string
  refetch: () => void
}

const TransferDialog = ({ open, onClose, loanId, refetch }: TransferDialogProps) => {
  const [transferLoan] = useTransferLoanMutation()
  
  const handleSubmit = async (data: FieldValues) => {
    try {
      const res = await transferLoan({ id: loanId, data }).unwrap()
      
      if (res.success) {
        toast.success("Loan transferred successfully!")
        refetch()
        onClose()
      } else {
        toast.error(res.message || "Failed to transfer loan")
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
            background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TransferWithinAStation />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Transfer Loan
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <Typography variant="body2" sx={{ mb: 3, color: "#6B7280" }}>
            Create a new loan with the remaining balance of the current loan.
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CraftInput
                fullWidth
                name="borrowerName"
                label="New Borrower Name"
                
              />
            </Grid>
            
            <Grid item xs={12}>
              <CraftInput
                fullWidth
                name="contactNumber"
                label="Contact Number"
                
              />
            </Grid>
            
            <Grid item xs={12}>
              <CraftInput
                fullWidth
                name="interest_rate"
                label="Interest Rate (%)"
                type="number"
                
              />
            </Grid>
            
            <Grid item xs={12}>
              <CraftDatePicker
                fullWidth
                name="repayment_start_date"
                label="Repayment Start Date"
                
              />
            </Grid>
            
            <Grid item xs={12}>
              <CraftDatePicker
                fullWidth
                name="repayment_end_date"
                label="Repayment End Date"
                
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, bgcolor: "#F9FAFB" }}>
          <Button
            onClick={onClose}
            startIcon={<Cancel />}
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
            startIcon={<GridSaveAltIcon/>}
            variant="contained"
            sx={{
              bgcolor: "#8B5CF6",
              "&:hover": { bgcolor: "#7C3AED" },
              fontWeight: 600,
            }}
          >
            Transfer Loan
          </Button>
        </DialogActions>
      </CraftForm>
    </Dialog>
  )
}

export default TransferDialog