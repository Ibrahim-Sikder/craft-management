/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material"
import {
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Cancel as CancelIcon,
  Save as SaveIcon,
} from "@mui/icons-material"
import CraftForm from "@/components/Forms/Form"
import CraftSelect from "@/components/Forms/Select"
import CraftInput from "@/components/Forms/Input"
import CraftDatePicker from "@/components/Forms/DatePicker"
import { FieldValues, useFormContext } from "react-hook-form"
import {
  useCreateLoanMutation,
  useUpdateLoanMutation,
  useGetSingleLoanQuery,
} from "@/redux/api/loanApi"
import toast from "react-hot-toast"
import { useEffect } from "react"

interface LoanFormProps {
  open: boolean
  onClose: () => void
  loanId?: string
}

// Component to handle conditional rendering based on loan type
const LoanTypeDependentFields = () => {
  const { watch, setValue } = useFormContext()
  const loanType = watch("loan_type")

  // Clear fields when loan type changes
  useEffect(() => {
    if (loanType === "taken") {
      setValue("borrowerName", "")
    } else if (loanType === "given") {
      setValue("lenderName", "")
    }
  }, [loanType, setValue])

  if (loanType === "taken") {
    return (
      <Grid item xs={12} md={6}>
        <CraftInput fullWidth name="lenderName" label="Lender Name" />
      </Grid>
    )
  }

  if (loanType === "given") {
    return (
      <Grid item xs={12} md={6}>
        <CraftInput fullWidth name="borrowerName" label="Borrower Name" />
      </Grid>
    )
  }

  return null
}

const LoanForm = ({ loanId, open, onClose }: LoanFormProps) => {
  const [createLoan] = useCreateLoanMutation()
  const [updateLoan] = useUpdateLoanMutation()
  const { data: singleLoan, isLoading } = useGetSingleLoanQuery(
    loanId!,
    { skip: !loanId } // don't call API if no loanId
  )

  const handleSubmit = async (data: FieldValues) => {
    try {
      let res

      const submitData = {
        ...data,
        loan_amount: Number(data.loan_amount),
        interest_rate: Number(data.interest_rate),
        monthly_installment: Number(data.monthly_installment),
      }
      if (loanId) {
        res = await updateLoan({ id: loanId, data: submitData }).unwrap()
      } else {
        res = await createLoan(submitData).unwrap()
      }

      if (res.success) {
        toast.success(res.message || (loanId ? "Loan updated successfully!" : "Loan added successfully!"))
        onClose()
      } else {
        toast.error(res.message || "Operation failed!")
      }
    } catch (error) {
      console.error("Failed to submit Loan:", error)
      toast.error("Something went wrong!")
    }
  }

  const defaultValues = {
    loan_type: singleLoan?.data?.loan_type || "",
    party: singleLoan?.data?.party || "",
    loan_amount: singleLoan?.data?.loan_amount || "",
    interest_rate: singleLoan?.data?.interest_rate || "",
    loan_date: singleLoan?.data?.loan_date || "",
    repayment_start_date: singleLoan?.data?.repayment_start_date || "",
    repayment_end_date: singleLoan?.data?.repayment_end_date || "",
    monthly_installment: singleLoan?.data?.monthly_installment || "",
    status: singleLoan?.data?.status || "active",
    lenderName: singleLoan?.data?.lenderName || "",
    borrowerName: singleLoan?.data?.borrowerName || "",
    contactNumber: singleLoan?.data?.contactNumber || "",
  }

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
          <CraftForm onSubmit={handleSubmit} defaultValues={defaultValues}>
            <DialogTitle
              sx={{
                background: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <AccountBalanceWalletIcon />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {loanId ? "Edit Loan" : "New Loan"}
              </Typography>
            </DialogTitle>

            <DialogContent sx={{ p: 4 }}>
              <Box sx={{ mb: 4 }}>
                <Paper sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#1F2937" }}>
                    Loan Details
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <CraftSelect
                        fullWidth
                        label="Loan Type"
                        name="loan_type"
                        items={["taken", "given"]}
                      />
                    </Grid>

                    <LoanTypeDependentFields />

                    <Grid item xs={12} md={6}>
                      <CraftInput type="number" fullWidth name="contactNumber" label="Contact Number" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CraftInput fullWidth name="loan_amount" label="Loan Amount" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CraftInput fullWidth name="interest_rate" label="Interest Rate (%)" type="number" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CraftInput fullWidth name="monthly_installment" label="Monthly Installment" type="number" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CraftDatePicker fullWidth name="loan_date" label="Loan Date" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CraftDatePicker fullWidth name="repayment_start_date" label="Repayment Start Date" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CraftDatePicker fullWidth name="repayment_end_date" label="Repayment End Date" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CraftSelect
                        fullWidth
                        label="Status"
                        name="status"
                        items={["active", "paid", "defaulted"]}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
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
                  bgcolor: "#EC4899",
                  "&:hover": { bgcolor: "#BE185D" },
                  fontWeight: 600,
                }}
              >
                {loanId ? "Update" : "Create"} Loan
              </Button>
            </DialogActions>
          </CraftForm>
        </Dialog>
      )}
    </>
  )
}

export default LoanForm