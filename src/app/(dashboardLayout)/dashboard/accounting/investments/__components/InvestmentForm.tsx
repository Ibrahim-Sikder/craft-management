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
    useCreateInvestmentMutation,
    useUpdateInvestmentMutation,
    useGetSingleInvestmentQuery,
} from "@/redux/api/investmentApi"
import toast from "react-hot-toast"
import { useEffect, useRef } from "react"

interface InvestmentFormProps {
    open: boolean
    onClose: () => void
    investmentId?: string
}

const InvestmentCategoryDependentFields = () => {
    const { watch, setValue } = useFormContext()
    const investmentCategory = watch("investmentCategory")
    const isInitialMount = useRef(true)

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
            return
        }

        if (investmentCategory === "outgoing") {
            setValue("investorName", "")
            setValue("investorContact", "")
            setValue("incomingType", "")
            setValue("returnPolicy", "")
        } else if (investmentCategory === "incoming") {
            setValue("investmentTo", "")
            setValue("investmentType", "")
        }
    }, [investmentCategory, setValue])

    if (investmentCategory === "outgoing") {
        return (
            <>
                <Grid item xs={12} md={6}>
                    <CraftInput
                        fullWidth
                        name="investmentTo"
                        label="Investment To (Company/Person)"
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CraftSelect
                        fullWidth
                        label="Investment Type"
                        name="investmentType"
                        items={["fixed_deposit", "share", "bond", "others"]}
                        required
                    />
                </Grid>
            </>
        )
    }

    if (investmentCategory === "incoming") {
        return (
            <>
                <Grid item xs={12} md={6}>
                    <CraftInput
                        fullWidth
                        name="investorName"
                        label="Investor Name"
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CraftInput
                        fullWidth
                        name="investorContact"
                        label="Investor Contact"
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CraftSelect
                        fullWidth
                        label="Incoming Type"
                        name="incomingType"
                        items={["donation_fund", "share", "partnership", "others"]}
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CraftInput
                        fullWidth
                        name="returnPolicy"
                        label="Return Policy"
                        multiline
                        rows={3}
                    />
                </Grid>
            </>
        )
    }

    return null
}

const InvestmentForm = ({ investmentId, open, onClose }: InvestmentFormProps) => {
    const [createInvestment] = useCreateInvestmentMutation()
    const [updateInvestment] = useUpdateInvestmentMutation()
    const { data: singleInvestment, isLoading } = useGetSingleInvestmentQuery(
        investmentId!,
        { skip: !investmentId }
    )

    const handleSubmit = async (data: FieldValues) => {
        console.log('raw data', data)
        try {
            let res

            const submitData = {
                ...data,
                investmentAmount: Number(data.investmentAmount),
                returnRate: data.returnRate ? Number(data.returnRate) : undefined,
            }

            if (investmentId) {
                res = await updateInvestment({ id: investmentId, data: submitData }).unwrap()
            } else {
                res = await createInvestment(submitData).unwrap()
            }

            if (res.success) {
                toast.success(res.message || (investmentId ? "Investment updated successfully!" : "Investment added successfully!"))
                onClose()
            } else {
                toast.error(res.message || "Operation failed!")
            }
        } catch (error) {
            console.error("Failed to submit Investment:", error)
            toast.error("Something went wrong!")
        }
    }

    const defaultValues = {
        investmentCategory: singleInvestment?.data?.investmentCategory || "",
        investmentTo: singleInvestment?.data?.investmentTo || "",
        investmentType: singleInvestment?.data?.investmentType || "",
        investorName: singleInvestment?.data?.investorName || "",
        investorContact: singleInvestment?.data?.investorContact || "",
        incomingType: singleInvestment?.data?.incomingType || "",
        returnPolicy: singleInvestment?.data?.returnPolicy || "",
        investmentAmount: singleInvestment?.data?.investmentAmount || "",
        investmentDate: singleInvestment?.data?.investmentDate || "",
        maturityDate: singleInvestment?.data?.maturityDate || "",
        returnRate: singleInvestment?.data?.returnRate || "",
        status: singleInvestment?.data?.status || "active",
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
                                background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <AccountBalanceWalletIcon />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {investmentId ? "Edit Investment" : "New Investment"}
                            </Typography>
                        </DialogTitle>

                        <DialogContent sx={{ p: 4 }}>
                            <Box sx={{ mb: 4 }}>
                                <Paper sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#1F2937" }}>
                                        Investment Details
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <CraftSelect
                                                fullWidth
                                                label="Investment Category"
                                                name="investmentCategory"
                                                items={["outgoing", "incoming"]}
                                                required
                                            />
                                        </Grid>

                                        <InvestmentCategoryDependentFields />

                                        <Grid item xs={12} md={6}>
                                            <CraftInput
                                                fullWidth
                                                name="investmentAmount"
                                                label="Investment Amount"
                                                type="number"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <CraftInput
                                                fullWidth
                                                name="returnRate"
                                                label="Return Rate (%)"
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <CraftDatePicker
                                                fullWidth
                                                name="investmentDate"
                                                label="Investment Date"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <CraftDatePicker
                                                fullWidth
                                                name="maturityDate"
                                                label="Maturity Date"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <CraftSelect
                                                fullWidth
                                                label="Status"
                                                name="status"
                                                items={["active", "closed", "withdrawn"]}
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
                                    bgcolor: "#3B82F6",
                                    "&:hover": { bgcolor: "#1D4ED8" },
                                    fontWeight: 600,
                                }}
                            >
                                {investmentId ? "Update" : "Create"} Investment
                            </Button>
                        </DialogActions>
                    </CraftForm>
                </Dialog>
            )}
        </>
    )
}

export default InvestmentForm