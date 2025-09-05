/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/AddPaymentDialog.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Box, Alert } from "@mui/material"
import CraftForm from "@/components/Forms/Form"
import CraftSelect from "@/components/Forms/Select"
import CraftInput from "@/components/Forms/Input"
import CraftDatePicker from "@/components/Forms/DatePicker"
import { FieldValues } from "react-hook-form"
import { useAddRepaymentMutation, useGetSingleLoanQuery } from "@/redux/api/loanApi"
import toast from "react-hot-toast"
import { GridSaveAltIcon } from "@mui/x-data-grid"
import { Cancel, AccountBalanceWallet, Warning } from "@mui/icons-material"
import { useEffect, useState } from "react"

interface AddPaymentDialogProps {
  open: boolean
  onClose: () => void
  loanId: string
  refetch: () => void
}

const AddPaymentDialog = ({ open, onClose, loanId, refetch }: AddPaymentDialogProps) => {
  const [addRepayment] = useAddRepaymentMutation()
  const { data: loanData, refetch: refetchLoan } = useGetSingleLoanQuery(loanId, { skip: !loanId || !open })
  const [remainingBalance, setRemainingBalance] = useState(0)
  const [paymentType, setPaymentType] = useState("principal")

  useEffect(() => {
    if (loanData?.data) {
      setRemainingBalance(loanData.data.remainingBalance)
    }
  }, [loanData])

  useEffect(() => {
    if (open) {
      refetchLoan()
    }
  }, [open, refetchLoan])

  const handleSubmit = async (data: FieldValues) => {
    console.log('raw data', data)
    const submitData = {
      ...data,
      amount: Number(data.amount),
    };
    console.log(submitData)

    try {
      const res = await addRepayment({ id: loanId, data: submitData }).unwrap();

      if (res.success) {
        toast.success("Repayment added successfully!");
        refetch();
        onClose();
      } else {
        toast.error(res.message || "Repayment amount exceeds remaining balance");
      }
    } catch (error: any) {
      console.error("Error in repayment:", error);

      const errorMessage =
        error?.data?.message ||
        error?.data?.errorSources?.[0]?.message ||
        "Repayment amount exceeds remaining balance!";

      toast.error(errorMessage);
    }
  };



  const handleTypeChange = (value: string) => {
    setPaymentType(value)
  }

  // const exceedsBalance = paymentType === "principal" && paymentAmount > remainingBalance
  const exceedsBalance = remainingBalance
  console.log(exceedsBalance)
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
          <AccountBalanceWallet />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Add Repayment
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          {/* Remaining Balance Display */}
          <Box
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 2,
              bgcolor: "#F0FDF4",
              border: "1px solid #BBF7D0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ color: "#065F46", fontWeight: 500 }}>
                Remaining Balance
              </Typography>
              <Typography variant="h5" sx={{ color: "#065F46", fontWeight: 700 }}>
                ৳{remainingBalance.toLocaleString()}
              </Typography>
            </Box>
            <AccountBalanceWallet sx={{ color: "#059669", fontSize: 32 }} />
          </Box>

          {exceedsBalance && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
              icon={<Warning />}
            >
              Payment amount exceeds remaining balance! Please enter a lower amount.
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CraftInput
                fullWidth
                name="amount"
                label="Amount"
                type="number"
                required

              // inputProps={{
              //   max: paymentType === "principal" ? remainingBalance : undefined
              // }}
              />
            </Grid>

            <Grid item xs={12}>
              <CraftSelect
                fullWidth
                name="type"
                label="Payment Type"
                items={['principal', 'interest', 'extra']}
                required
                onChange={handleTypeChange}
              />
            </Grid>

            <Grid item xs={12}>
              <CraftDatePicker
                fullWidth
                name="date"
                label="Payment Date"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <CraftInput
                fullWidth
                name="note"
                label="Note"
                multiline
                rows={3}
                placeholder="Add any notes about this payment"
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
            startIcon={<GridSaveAltIcon />}
            variant="contained"
            // disabled={exceedsBalance}
            sx={{
              bgcolor:  "#10B981",
              "&:hover": {
                bgcolor: exceedsBalance ? "#9CA3AF" : "#059669"
              },
              fontWeight: 600,
              "&.Mui-disabled": {
                bgcolor: "#E5E7EB",
                color: "#9CA3AF"
              }
            }}
          >
            Add Payment
          </Button>
        </DialogActions>
      </CraftForm>
    </Dialog>
  )
}

export default AddPaymentDialog