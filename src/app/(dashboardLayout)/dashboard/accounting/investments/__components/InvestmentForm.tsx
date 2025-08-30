'use client'

import React from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Paper,
    Grid,
    TextField,
    MenuItem,
    Box,
    Button,
} from "@mui/material"
import {
    TrendingUp as TrendingUpIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
} from "@mui/icons-material"

type InvestmentStatus = "ACTIVE" | "MATURED" | "CLOSED"

interface Investment {
    id: string
    name: string
    type: string
    principalAmount: number
    currentValue: number
    maturityDate?: Date
    interestRate?: number
    status: InvestmentStatus
    createdAt: Date
}

interface InvestmentFormDialogProps {
    open: boolean
    onClose: () => void
    editingInvestment: Investment | null
    setEditingInvestment: React.Dispatch<React.SetStateAction<Investment | null>>
    handleSaveInvestment: (investmentData: Omit<Investment, "id" | "createdAt">) => void
    formatCurrency: (amount: number) => string
}

const InvestmentFormDialog: React.FC<InvestmentFormDialogProps> = ({
    open,
    onClose,
    editingInvestment,
    setEditingInvestment,
    handleSaveInvestment,
    formatCurrency
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle
                sx={{
                    background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <TrendingUpIcon />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {editingInvestment ? "Edit Investment" : "New Investment"}
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ p: 4 }}>
                <Box sx={{ mb: 4 }}>
                    {/* Investment Form */}
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#1F2937" }}>
                            Investment Details
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Investment Name"
                                    value={editingInvestment?.name || ""}
                                    onChange={(e) =>
                                        setEditingInvestment({
                                            ...editingInvestment!,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            "&:hover fieldset": { borderColor: "#F59E0B" },
                                            "&.Mui-focused fieldset": { borderColor: "#F59E0B" },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Investment Type"
                                    select
                                    value={editingInvestment?.type || ""}
                                    onChange={(e) =>
                                        setEditingInvestment({
                                            ...editingInvestment!,
                                            type: e.target.value,
                                        })
                                    }
                                    required
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            "&:hover fieldset": { borderColor: "#F59E0B" },
                                            "&.Mui-focused fieldset": { borderColor: "#F59E0B" },
                                        },
                                    }}
                                >
                                    <MenuItem value="Fixed Deposit">Fixed Deposit</MenuItem>
                                    <MenuItem value="Mutual Fund">Mutual Fund</MenuItem>
                                    <MenuItem value="Government Bond">Government Bond</MenuItem>
                                    <MenuItem value="Corporate Bond">Corporate Bond</MenuItem>
                                    <MenuItem value="Stock Investment">Stock Investment</MenuItem>
                                    <MenuItem value="Real Estate">Real Estate</MenuItem>
                                    <MenuItem value="Education Fund">Education Fund</MenuItem>
                                    <MenuItem value="Emergency Fund">Emergency Fund</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Principal Amount (₹)"
                                    type="number"
                                    value={editingInvestment?.principalAmount || ""}
                                    onChange={(e) =>
                                        setEditingInvestment({
                                            ...editingInvestment!,
                                            principalAmount: Number(e.target.value),
                                        })
                                    }
                                    inputProps={{ min: 0, step: 0.01 }}
                                    required
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            "&:hover fieldset": { borderColor: "#F59E0B" },
                                            "&.Mui-focused fieldset": { borderColor: "#F59E0B" },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Current Value (₹)"
                                    type="number"
                                    value={editingInvestment?.currentValue || ""}
                                    onChange={(e) =>
                                        setEditingInvestment({
                                            ...editingInvestment!,
                                            currentValue: Number(e.target.value),
                                        })
                                    }
                                    inputProps={{ min: 0, step: 0.01 }}
                                    required
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            "&:hover fieldset": { borderColor: "#F59E0B" },
                                            "&.Mui-focused fieldset": { borderColor: "#F59E0B" },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Interest Rate (%)"
                                    type="number"
                                    value={editingInvestment?.interestRate || ""}
                                    onChange={(e) =>
                                        setEditingInvestment({
                                            ...editingInvestment!,
                                            interestRate: Number(e.target.value),
                                        })
                                    }
                                    inputProps={{ min: 0, step: 0.01 }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            "&:hover fieldset": { borderColor: "#F59E0B" },
                                            "&.Mui-focused fieldset": { borderColor: "#F59E0B" },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Maturity Date"
                                    type="date"
                                    value={
                                        editingInvestment?.maturityDate
                                            ? new Date(editingInvestment.maturityDate).toISOString().split("T")[0]
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setEditingInvestment({
                                            ...editingInvestment!,
                                            maturityDate: new Date(e.target.value),
                                        })
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            "&:hover fieldset": { borderColor: "#F59E0B" },
                                            "&.Mui-focused fieldset": { borderColor: "#F59E0B" },
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Investment Performance */}
                    {editingInvestment?.principalAmount && editingInvestment?.currentValue && (
                        <Paper sx={{ p: 3, mt: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#1F2937" }}>
                                Performance Summary
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ textAlign: "center", p: 2, bgcolor: "#F9FAFB", borderRadius: 2 }}>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#059669" }}>
                                            {(
                                                ((editingInvestment.currentValue - editingInvestment.principalAmount) /
                                                    editingInvestment.principalAmount) *
                                                100
                                            ).toFixed(2)}
                                            %
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 500 }}>
                                            Return Rate
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ textAlign: "center", p: 2, bgcolor: "#F9FAFB", borderRadius: 2 }}>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1F2937" }}>
                                            {formatCurrency(editingInvestment.currentValue - editingInvestment.principalAmount)}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 500 }}>
                                            Profit/Loss
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ textAlign: "center", p: 2, bgcolor: "#F9FAFB", borderRadius: 2 }}>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 700,
                                                color:
                                                    editingInvestment.currentValue >= editingInvestment.principalAmount
                                                        ? "#059669"
                                                        : "#DC2626",
                                            }}
                                        >
                                            {editingInvestment.currentValue >= editingInvestment.principalAmount
                                                ? "Profitable"
                                                : "Loss"}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 500 }}>
                                            Status
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    )}
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
                    onClick={() => {
                        if (editingInvestment) {
                            handleSaveInvestment(editingInvestment)
                        }
                    }}
                    startIcon={<SaveIcon />}
                    variant="contained"
                    sx={{
                        bgcolor: "#F59E0B",
                        "&:hover": { bgcolor: "#D97706" },
                        fontWeight: 600,
                    }}
                >
                    {editingInvestment ? "Update" : "Create"} Investment
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InvestmentFormDialog