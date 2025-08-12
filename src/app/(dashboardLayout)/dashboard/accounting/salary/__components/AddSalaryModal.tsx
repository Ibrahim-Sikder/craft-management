/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues } from "react-hook-form";
import {
    Box,
    Grid,
    CardContent,
    Typography,
    Button,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    CircularProgress,
} from "@mui/material";
import {
    Person,
    AttachMoney,
    TrendingUp,
    AccountBalance,
    Save,
    Close,
} from "@mui/icons-material";
import { SectionCard, GradientButton, StyledTextFieldSx } from "@/style/customeStyle";
import CraftForm from "@/components/Forms/Form";
import CraftDatePicker from "@/components/Forms/DatePicker";
import CraftInput from "@/components/Forms/Input";
import CraftTextArea from "@/components/Forms/TextArea";
import CraftSelect from "@/components/Forms/Select";
import {
    useCreateSalaryMutation,
    useGetSingleSalaryQuery,
    useUpdateSalaryMutation
} from "@/redux/api/salaryApi";
import toast from "react-hot-toast";

interface AddSalaryDialogProps {
    open: boolean;
    onClose: () => void;
    salaryId: string | null;
}

const AddSalaryModal = ({ open, onClose, salaryId }: AddSalaryDialogProps) => {
    const [createSalary] = useCreateSalaryMutation();
    const [updateSalary] = useUpdateSalaryMutation();

    // Skip query when no salaryId (create mode)
    const { data: singleSalary, isLoading } = useGetSingleSalaryQuery(
        { id: salaryId! },
        { skip: !salaryId }
    );

    const handleSubmit = async (data: FieldValues) => {
        const formattedDate = data.effectiveDate
            ? new Date(data.effectiveDate).toISOString()
            : "";

        const submitData = {
            employee: data.employee || "",
            effectiveDate: formattedDate,
            basicSalary: Number(data.basicSalary) || 0,
            houseRent: Number(data.houseRent) || 0,
            medicalAllowance: Number(data.medicalAllowance) || 0,
            transportAllowance: Number(data.transportAllowance) || 0,
            foodAllowance: Number(data.foodAllowance) || 0,
            otherAllowances: Number(data.otherAllowances) || 0,
            incomeTax: Number(data.incomeTax) || 0,
            providentFund: Number(data.providentFund) || 0,
            otherDeductions: Number(data.otherDeductions) || 0,
            notes: data.notes || "",

        };

        console.log('submit data', submitData)

        try {
            let res;
            if (salaryId) {
                // Update existing salary
                res = await updateSalary({ id: salaryId, data: submitData }).unwrap();
                console.log('response', res)
            } else {
                // Create new salary
                res = await createSalary(submitData).unwrap();
            }

            if (res.success) {
                toast.success(res.message);
                onClose();
            }
        } catch (err: any) {
            console.error(err);
            toast.error(
                err.data?.message ||
                (salaryId ? "Failed to update salary" : "Failed to create salary")
            );
        }
    };

    // Default values for form
    const defaultValues = {
        employee: singleSalary?.data?.employee ?? '', // Fixed for employee selection
        basicSalary: singleSalary?.data?.basicSalary ?? '',
        houseRent: singleSalary?.data?.houseRent ?? '',
        medicalAllowance: singleSalary?.data?.medicalAllowance ?? '',
        transportAllowance: singleSalary?.data?.transportAllowance ?? '',
        foodAllowance: singleSalary?.data?.foodAllowance ?? '',
        otherAllowances: singleSalary?.data?.otherAllowances ?? '',
        grossSalary: singleSalary?.data?.grossSalary ?? '',
        incomeTax: singleSalary?.data?.incomeTax ?? '',
        providentFund: singleSalary?.data?.providentFund ?? '',
        otherDeductions: singleSalary?.data?.otherDeductions ?? '',
        netSalary: singleSalary?.data?.netSalary ?? '',
        effectiveDate: singleSalary?.data?.effectiveDate
            ? singleSalary.data.effectiveDate.split('T')[0]
            : '',
        notes: singleSalary?.data?.notes ?? '',
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xl"
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: "20px",
                    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "90vh",
                },
            }}
        >
            {isLoading && salaryId ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <CraftForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                    <DialogTitle sx={{ pb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 800,
                                        background: salaryId
                                            ? "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)"
                                            : "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        mb: 1,
                                    }}
                                >
                                    {salaryId ? "Update Salary Record" : "Add New Salary Record"}
                                </Typography>
                                <Typography variant="h6" sx={{ color: "#666", fontWeight: 500 }}>
                                    {salaryId
                                        ? "বেতন রেকর্ড আপডেট করুন - Update the salary details"
                                        : "নতুন বেতন রেকর্ড যোগ করুন - Fill in the salary details below"}
                                </Typography>
                            </Box>
                            <IconButton
                                onClick={onClose}
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    "&:hover": { bgcolor: "#eeeeee" },
                                }}
                            >
                                <Close />
                            </IconButton>
                        </Box>
                    </DialogTitle>

                    {/* Scrollable Content Area */}
                    <DialogContent sx={{
                        pb: 3,
                        overflowY: "auto",
                        flex: "1 1 auto",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Box sx={{ mt: 2, flex: "0 0 auto" }}>
                            {/* Employee Information Section */}
                            <SectionCard bgcolor="linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)">
                                <CardContent sx={{ p: 4 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                        <Person sx={{ fontSize: 30, color: "#1976d2", mr: 2 }} />
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1976d2" }}>
                                            Employee Information
                                        </Typography>
                                    </Box>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <CraftSelect
                                                name="employee"
                                                items={['Karim', "Rahim"]}
                                                label="Select Employee"
                                                sx={StyledTextFieldSx}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <CraftDatePicker
                                                name="effectiveDate"
                                                sx={StyledTextFieldSx}
                                                fullWidth
                                                label="Effective Date (কার্যকর তারিখ)"
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SectionCard>

                            {/* Salary Components Section */}
                            <SectionCard bgcolor="linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)" sx={{ mt: 4 }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                        <AttachMoney sx={{ fontSize: 30, color: "#4caf50", mr: 2 }} />
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#4caf50" }}>
                                            Basic Salary Components
                                        </Typography>
                                    </Box>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <CraftInput
                                                name="basicSalary"
                                                sx={StyledTextFieldSx}
                                                fullWidth
                                                type="number"
                                                margin="none"
                                                label="Basic Salary (মূল বেতন) ৳"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <CraftInput
                                                name="houseRent"
                                                sx={StyledTextFieldSx}
                                                fullWidth
                                                type="number"
                                                margin="none"
                                                label="House Rent Allowance ৳"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <CraftInput
                                                name="medicalAllowance"
                                                sx={StyledTextFieldSx}
                                                fullWidth
                                                type="number"
                                                margin="none"
                                                label="Medical Allowance (চিকিৎসা ভাতা) ৳"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SectionCard>

                            {/* Allowances & Deductions Section */}
                            <Grid container spacing={3} sx={{ mt: 0 }}>
                                <Grid item xs={12} md={6}>
                                    <SectionCard bgcolor="linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)">
                                        <CardContent sx={{ p: 4 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                                <TrendingUp sx={{ fontSize: 30, color: "#0288d1", mr: 2 }} />
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: "#0288d1" }}>
                                                    Additional Allowances
                                                </Typography>
                                            </Box>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <CraftInput
                                                        name="transportAllowance"
                                                        sx={StyledTextFieldSx}
                                                        fullWidth
                                                        type="number"
                                                        margin="none"
                                                        label="Transport Allowance (যাতায়াত ভাতা) ৳"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <CraftInput
                                                        name="foodAllowance"
                                                        sx={StyledTextFieldSx}
                                                        fullWidth
                                                        type="number"
                                                        margin="none"
                                                        label="Food Allowance (খাদ্য ভাতা) ৳"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <CraftInput
                                                        name="otherAllowances"
                                                        sx={StyledTextFieldSx}
                                                        fullWidth
                                                        type="number"
                                                        margin="none"
                                                        label="Other Allowances (অন্যান্য ভাতা) ৳"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </SectionCard>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <SectionCard bgcolor="linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)">
                                        <CardContent sx={{ p: 4 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                                <AccountBalance sx={{ fontSize: 30, color: "#d32f2f", mr: 2 }} />
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: "#d32f2f" }}>
                                                    Deductions
                                                </Typography>
                                            </Box>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <CraftInput
                                                        name="incomeTax"
                                                        sx={StyledTextFieldSx}
                                                        fullWidth
                                                        type="number"
                                                        margin="none"
                                                        label="Income Tax (আয়কর) ৳"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <CraftInput
                                                        name="providentFund"
                                                        sx={StyledTextFieldSx}
                                                        fullWidth
                                                        type="number"
                                                        margin="none"
                                                        label="Provident Fund (ভবিষ্যৎ তহবিল) ৳"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <CraftInput
                                                        name="otherDeductions"
                                                        sx={StyledTextFieldSx}
                                                        fullWidth
                                                        type="number"
                                                        margin="none"
                                                        label="Other Deductions (অন্যান্য কর্তন) ৳"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </SectionCard>
                                </Grid>
                            </Grid>

                            {/* Notes Section */}
                            <SectionCard bgcolor="linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)" sx={{ mt: 4 }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={12}>
                                            <CraftTextArea
                                                name="notes"
                                                minRows={5}
                                                sx={StyledTextFieldSx}
                                                fullWidth
                                                margin="none"
                                                label="Notes (মন্তব্য)"
                                                placeholder="Add any additional notes or comments..."
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SectionCard>
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ p: 3, pt: 0, gap: 2 }}>
                        <Button
                            onClick={onClose}
                            variant="outlined"
                            sx={{
                                borderRadius: "25px",
                                px: 4,
                                py: 1.5,
                                borderWidth: 2,
                                fontWeight: 600,
                                "&:hover": { borderWidth: 2 },
                            }}
                        >
                            Cancel
                        </Button>

                        <GradientButton
                            type="submit"
                            bgcolor={salaryId
                                ? "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)"
                                : "linear-gradient(135deg, #4caf50 0%, #45a049 100%)"}
                            startIcon={<Save />}
                        >
                            {salaryId ? "Update Salary Record" : "Save Salary Record"}
                        </GradientButton>
                    </DialogActions>
                </CraftForm>
            )}
        </Dialog>
    );
};

export default AddSalaryModal;