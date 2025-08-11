/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm, FormProvider, useFormContext, FieldValues } from "react-hook-form";
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
import { useCreateSalaryMutation } from "@/redux/api/salaryApi";
import toast from "react-hot-toast";

interface Employee {
    id: number;
    name: string;
    designation: string;
    department: string;
}
interface AddSalaryDialogProps {
    open: boolean;
    onClose: () => void;
    employees: Employee[];
}

const AddSalaryModal = ({ open, onClose, employees }: AddSalaryDialogProps) => {
    const [createSalary] = useCreateSalaryMutation()

    const handleSubmit = async (data: FieldValues) => {
        const submitData = {
            employeeId: data.employeeId || "",
            effectiveDate: data.effectiveDate || "",
            basicSalary: Number(data.basicSalary) || 0,
            houseRent: Number(data.houseRent) || 0,
            medicalAllowance: Number(data.medicalAllowance) || 0,
            transportAllowance: Number(data.transportAllowance) || 0,
            foodAllowance: Number(data.foodAllowance) || 0,
            otherAllowances: Number(data.otherAllowances) || 0,
            incomeTax: Number(data.incomeTax) || 0,
            providentFund: Number(data.providentFund) || 0,
            otherDeductions: Number(data.otherDeductions) || 0,
            notes: data.notes?.toString() || '',
            grossSalary: Number(data.grossSalary) || 0,
            netSalary: Number(data.netSalary) || 0,
        };
        console.log('submit data this ', submitData)

        try {
            const res = await createSalary(submitData).unwrap();
            if (res.success) {
                toast.success(res.message || 'Salary created successfully!');
                onClose();
            }
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || 'Failed to create salary!');
        }

        console.log("Form submitted:", data);
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

            <CraftForm onSubmit={handleSubmit}>
                <DialogTitle sx={{ pb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    background: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    mb: 1,
                                }}
                            >
                                Add New Salary Record
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#666", fontWeight: 500 }}>
                                নতুন বেতন রেকর্ড যোগ করুন - Fill in the salary details below
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
                    overflowY: "auto",  // Enable vertical scrolling
                    flex: "1 1 auto",    // Take available space
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
                                            name="employeeId"
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
                                    <Grid item xs={12} md={4}>
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
                        type="button"

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
                        bgcolor="linear-gradient(135deg, #4caf50 0%, #45a049 100%)"
                        startIcon={<Save />}
                    >
                        Save Salary Record
                    </GradientButton>
                </DialogActions>
            </CraftForm>

        </Dialog>
    );
};

export default AddSalaryModal;