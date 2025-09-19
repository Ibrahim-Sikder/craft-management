/* eslint-disable @typescript-eslint/no-explicit-any */
// components/CloseInvestmentDialog.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid } from "@mui/material"
import { Cancel as CancelIcon, Save as SaveIcon, Close as CloseIcon } from "@mui/icons-material"
import CraftForm from "@/components/Forms/Form"
import CraftSelect from "@/components/Forms/Select"
import CraftInput from "@/components/Forms/Input"
import CraftDatePicker from "@/components/Forms/DatePicker"
import { FieldValues } from "react-hook-form"
import { useCloseInvestmentMutation } from "@/redux/api/investmentApi"
import toast from "react-hot-toast"

interface CloseInvestmentDialogProps {
    open: boolean
    onClose: () => void
    investmentId: string
    refetch: () => void
}

const CloseInvestmentDialog = ({ open, onClose, investmentId, refetch }: CloseInvestmentDialogProps) => {
    const [closeInvestment] = useCloseInvestmentMutation()

    const handleSubmit = async (data: FieldValues) => {
        try {
            const res = await closeInvestment({ id: investmentId, data }).unwrap()

            if (res.success) {
                toast.success("Investment closed successfully!")
                refetch()
                onClose()
            } else {
                toast.error(res.message || "Failed to close investment")
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
                    <CloseIcon />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Close Investment
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ p: 4 }}>
                    <Typography variant="body2" sx={{ mb: 3, color: "#6B7280" }}>
                        Add a final return entry and close this investment.
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <CraftInput
                                fullWidth
                                name="amount"
                                label="Final Return Amount"
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
                            bgcolor: "#8B5CF6",
                            "&:hover": { bgcolor: "#7C3AED" },
                            fontWeight: 600,
                        }}
                    >
                        Close Investment
                    </Button>
                </DialogActions>
            </CraftForm>
        </Dialog>
    )
}

export default CloseInvestmentDialog