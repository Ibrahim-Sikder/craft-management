/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Container,
  Fab,
  LinearProgress,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material"
import {
  Search,
  Add,
  Download,
  People,
  Calculate,
  Payment,
  Description,
  Close,
  AttachMoney,
  TrendingUp,
  AccountBalance,
  Person,
  CalendarToday,
  Save,
  Preview,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"

const GradientCard = styled(Card)(({ bgcolor }: { bgcolor: string }) => ({
  background: bgcolor,
  color: "white",
  borderRadius: "20px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },
}))

const GlassCard = styled(Card)({
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
})

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "25px",
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.15)",
    maxWidth: "1200px",
    width: "95vw",
    maxHeight: "90vh",
  },
}))

const SectionCard = styled(Card)(({ theme, bgcolor }: { theme?: any; bgcolor: string }) => ({
  background: bgcolor,
  borderRadius: "20px",
  border: "none",
  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 35px rgba(0, 0, 0, 0.15)",
  },
}))

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "2px",
      },
    },
  },
})

const StyledSelect = styled(Select)({
  borderRadius: "15px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  "&.Mui-focused": {
    backgroundColor: "white",
  },
})

const GradientButton = styled(Button)(({ bgcolor }: { bgcolor: string }) => ({
  background: bgcolor,
  borderRadius: "25px",
  padding: "12px 30px",
  fontWeight: 700,
  fontSize: "16px",
  textTransform: "none",
  boxShadow: "0 8px 25px rgba(156, 39, 176, 0.3)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px) scale(1.02)",
    boxShadow: "0 12px 35px rgba(156, 39, 176, 0.4)",
  },
}))

export default function SalaryManagement() {
  const [addSalaryModalOpen, setAddSalaryModalOpen] = useState(false)
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false)
  const [payrollModalOpen, setPayrollModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeStep, setActiveStep] = useState(0)

  // Salary form state
  const [salaryForm, setSalaryForm] = useState({
    employeeId: "",
    effectiveDate: "",
    basicSalary: "",
    houseRent: "",
    medicalAllowance: "",
    transportAllowance: "",
    foodAllowance: "",
    otherAllowances: "",
    incomeTax: "",
    providentFund: "",
    otherDeductions: "",
    notes: "",
  })

  const employees = [
    {
      id: 1,
      name: "মোঃ আব্দুল করিম",
      designation: "প্রধান শিক্ষক",
      department: "Administration",
      basicSalary: 45000,
      allowances: 8000,
      deductions: 2000,
      netSalary: 51000,
      status: "Paid",
      payDate: "2024-01-31",
    },
    {
      id: 2,
      name: "মিসেস ফাতিমা বেগম",
      designation: "সহকারী শিক্ষক",
      department: "Academic",
      basicSalary: 35000,
      allowances: 5000,
      deductions: 1500,
      netSalary: 38500,
      status: "Paid",
      payDate: "2024-01-31",
    },
    {
      id: 3,
      name: "মোঃ রহিম উদ্দিন",
      designation: "সহকারী শিক্ষক",
      department: "Academic",
      basicSalary: 32000,
      allowances: 4000,
      deductions: 1200,
      netSalary: 34800,
      status: "Pending",
      payDate: "-",
    },
    {
      id: 4,
      name: "মিসেস সালমা খাতুন",
      designation: "অফিস সহায়ক",
      department: "Support",
      basicSalary: 18000,
      allowances: 2000,
      deductions: 800,
      netSalary: 19200,
      status: "Paid",
      payDate: "2024-01-31",
    },
    {
      id: 5,
      name: "মোঃ নাসির আহমেদ",
      designation: "পরিচ্ছন্নতাকর্মী",
      department: "Support",
      basicSalary: 15000,
      allowances: 1500,
      deductions: 500,
      netSalary: 16000,
      status: "Pending",
      payDate: "-",
    },
  ]

  const steps = ["Employee Selection", "Salary Components", "Allowances & Deductions", "Review & Submit"]

  const calculateTotals = () => {
    const basic = Number.parseFloat(salaryForm.basicSalary) || 0
    const allowances =
      (Number.parseFloat(salaryForm.houseRent) || 0) +
      (Number.parseFloat(salaryForm.medicalAllowance) || 0) +
      (Number.parseFloat(salaryForm.transportAllowance) || 0) +
      (Number.parseFloat(salaryForm.foodAllowance) || 0) +
      (Number.parseFloat(salaryForm.otherAllowances) || 0)

    const deductions =
      (Number.parseFloat(salaryForm.incomeTax) || 0) +
      (Number.parseFloat(salaryForm.providentFund) || 0) +
      (Number.parseFloat(salaryForm.otherDeductions) || 0)

    const gross = basic + allowances
    const net = gross - deductions

    return { basic, allowances, deductions, gross, net }
  }

  const { basic, allowances, deductions, gross, net } = calculateTotals()

  const getStatusChip = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <Chip
            label="পরিশোধিত"
            sx={{
              bgcolor: "#e8f5e8",
              color: "#2e7d32",
              fontWeight: 600,
              borderRadius: "20px",
              fontSize: "12px",
            }}
          />
        )
      case "Pending":
        return (
          <Chip
            label="অপেক্ষমাণ"
            sx={{
              bgcolor: "#fff3e0",
              color: "#f57c00",
              fontWeight: 600,
              borderRadius: "20px",
              fontSize: "12px",
            }}
          />
        )
      case "Processing":
        return (
          <Chip
            label="প্রক্রিয়াধীন"
            sx={{
              bgcolor: "#e3f2fd",
              color: "#1976d2",
              fontWeight: 600,
              borderRadius: "20px",
              fontSize: "12px",
            }}
          />
        )
      default:
        return <Chip label={status} />
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleFormChange = (field: string, value: string) => {
    setSalaryForm((prev) => ({ ...prev, [field]: value }))
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
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
                  <FormControl fullWidth>
                    <InputLabel>Select Employee (কর্মচারী নির্বাচন করুন)</InputLabel>
                    <StyledSelect
                      value={salaryForm.employeeId}
                      label="Select Employee"
                      onChange={(e) => handleFormChange("employeeId", e.target.value as string)}
                    >
                      {employees.map((emp) => (
                        <MenuItem key={emp.id} value={emp.id.toString()}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar sx={{ bgcolor: "#9c27b0", width: 35, height: 35 }}>{emp.name.charAt(0)}</Avatar>
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {emp.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "#666" }}>
                                {emp.designation} - {emp.department}
                              </Typography>
                            </Box>
                          </Box>
                        </MenuItem>
                      ))}
                    </StyledSelect>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    type="date"
                    label="Effective Date (কার্যকর তারিখ)"
                    value={salaryForm.effectiveDate}
                    onChange={(e) => handleFormChange("effectiveDate", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday sx={{ color: "#1976d2" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </SectionCard>
        )

      case 1:
        return (
          <SectionCard bgcolor="linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)">
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <AttachMoney sx={{ fontSize: 30, color: "#4caf50", mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#4caf50" }}>
                  Basic Salary Components
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    type="number"
                    label="Basic Salary (মূল বেতন) ৳"
                    value={salaryForm.basicSalary}
                    onChange={(e) => handleFormChange("basicSalary", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    type="number"
                    label="House Rent Allowance (বাড়ি ভাড়া ভাতা) ৳"
                    value={salaryForm.houseRent}
                    onChange={(e) => handleFormChange("houseRent", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    type="number"
                    label="Medical Allowance (চিকিৎসা ভাতা) ৳"
                    value={salaryForm.medicalAllowance}
                    onChange={(e) => handleFormChange("medicalAllowance", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: "15px",
                      bgcolor: "rgba(76, 175, 80, 0.1)",
                      border: "2px solid rgba(76, 175, 80, 0.2)",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#4caf50", mb: 1 }}>
                      Current Basic Total
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: "#4caf50" }}>
                      ৳ {basic.toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </SectionCard>
        )

      case 2:
        return (
          <Grid container spacing={3}>
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
                      <StyledTextField
                        fullWidth
                        type="number"
                        label="Transport Allowance (যাতায়াত ভাতা) ৳"
                        value={salaryForm.transportAllowance}
                        onChange={(e) => handleFormChange("transportAllowance", e.target.value)}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        type="number"
                        label="Food Allowance (খাদ্য ভাতা) ৳"
                        value={salaryForm.foodAllowance}
                        onChange={(e) => handleFormChange("foodAllowance", e.target.value)}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        type="number"
                        label="Other Allowances (অন্যান্য ভাতা) ৳"
                        value={salaryForm.otherAllowances}
                        onChange={(e) => handleFormChange("otherAllowances", e.target.value)}
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
                      <StyledTextField
                        fullWidth
                        type="number"
                        label="Income Tax (আয়কর) ৳"
                        value={salaryForm.incomeTax}
                        onChange={(e) => handleFormChange("incomeTax", e.target.value)}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        type="number"
                        label="Provident Fund (ভবিষ্যৎ তহবিল) ৳"
                        value={salaryForm.providentFund}
                        onChange={(e) => handleFormChange("providentFund", e.target.value)}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        type="number"
                        label="Other Deductions (অন্যান্য কর্তন) ৳"
                        value={salaryForm.otherDeductions}
                        onChange={(e) => handleFormChange("otherDeductions", e.target.value)}
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
        )

      case 3:
        return (
          <SectionCard bgcolor="linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)">
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Preview sx={{ fontSize: 30, color: "#9c27b0", mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#9c27b0" }}>
                  Review & Summary
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Paper sx={{ p: 3, borderRadius: "15px", bgcolor: "rgba(255,255,255,0.8)" }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                      Salary Breakdown
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2">Basic Salary:</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          ৳ {basic.toLocaleString()}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body2">Total Allowances:</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#4caf50" }}>
                          ৳ {allowances.toLocaleString()}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body2">Total Deductions:</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#f44336" }}>
                          ৳ {deductions.toLocaleString()}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body2">Gross Salary:</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#2196f3" }}>
                          ৳ {gross.toLocaleString()}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Box
                      sx={{
                        p: 2,
                        borderRadius: "10px",
                        bgcolor: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
                        background: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
                        color: "white",
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: 800, textAlign: "center" }}>
                        Net Salary: ৳ {net.toLocaleString()}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    multiline
                    rows={8}
                    label="Notes (মন্তব্য)"
                    value={salaryForm.notes}
                    onChange={(e) => handleFormChange("notes", e.target.value)}
                    placeholder="Add any additional notes or comments..."
                  />
                </Grid>
              </Grid>
            </CardContent>
          </SectionCard>
        )

      default:
        return null
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f3e5f5 0%, #ffffff 50%, #fce4ec 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6 }}>
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
              Salary Management
            </Typography>
            <Typography variant="h6" sx={{ color: "#666", fontWeight: 500 }}>
              বেতন ব্যবস্থাপনা - শিক্ষক ও কর্মচারীদের বেতন নিয়ন্ত্রণ
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <GradientButton
              bgcolor="linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)"
              startIcon={<Add />}
              onClick={() => setAddSalaryModalOpen(true)}
            >
              Add Salary
            </GradientButton>

            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setAddEmployeeModalOpen(true)}
              sx={{
                borderRadius: "25px",
                px: 3,
                py: 1.5,
                borderWidth: 2,
                fontWeight: 600,
                "&:hover": { borderWidth: 2 },
              }}
            >
              Add Employee
            </Button>

            <Fab
              variant="extended"
              onClick={() => setPayrollModalOpen(true)}
              sx={{
                background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
                color: "white",
                px: 4,
                py: 2,
                borderRadius: "50px",
                boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 35px rgba(76, 175, 80, 0.4)",
                },
              }}
            >
              <Calculate sx={{ mr: 1 }} />
              Process Payroll
            </Fab>
          </Box>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <GradientCard bgcolor="linear-gradient(135deg, #2196F3 0%, #1976d2 100%)">
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      মোট কর্মচারী
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      25
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <People sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </GradientCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <GradientCard bgcolor="linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)">
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      মাসিক বেতন
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      ৳ 8,75,000
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <Calculate sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </GradientCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <GradientCard bgcolor="linear-gradient(135deg, #4CAF50 0%, #45a049 100%)">
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      এ মাসে পরিশোধিত
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      ৳ 6,50,000
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <Payment sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </GradientCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <GradientCard bgcolor="linear-gradient(135deg, #ff9800 0%, #f57c00 100%)">
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      অপেক্ষমাণ পেমেন্ট
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      ৳ 2,25,000
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <Description sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </GradientCard>
          </Grid>
        </Grid>

        {/* Payroll Summary and Payment Status */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <GlassCard>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  Payroll Summary
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
                  এই মাসের বেতন সারসংক্ষেপ
                </Typography>

                <Box sx={{ space: 3 }}>
                  <Paper
                    sx={{
                      p: 3,
                      mb: 2,
                      borderRadius: "15px",
                      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography>Total Basic Salary</Typography>
                      <Typography sx={{ fontWeight: 700 }}>৳ 7,50,000</Typography>
                    </Box>
                  </Paper>
                  <Paper
                    sx={{
                      p: 3,
                      mb: 2,
                      borderRadius: "15px",
                      background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography>Total Allowances</Typography>
                      <Typography sx={{ fontWeight: 700, color: "#4CAF50" }}>৳ 1,85,000</Typography>
                    </Box>
                  </Paper>
                  <Paper
                    sx={{
                      p: 3,
                      mb: 2,
                      borderRadius: "15px",
                      background: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography>Total Deductions</Typography>
                      <Typography sx={{ fontWeight: 700, color: "#f44336" }}>৳ 60,000</Typography>
                    </Box>
                  </Paper>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: "15px",
                      background: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
                      color: "white",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography sx={{ fontWeight: 700 }}>Net Payroll</Typography>
                      <Typography sx={{ fontWeight: 700, fontSize: "1.25rem" }}>৳ 8,75,000</Typography>
                    </Box>
                  </Paper>
                </Box>
              </CardContent>
            </GlassCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <GlassCard>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  Payment Status
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
                  পেমেন্ট অবস্থা
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Paid Employees</Typography>
                    <Typography variant="body2">15/25 (60%)</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={60}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      bgcolor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#4CAF50",
                        borderRadius: 6,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Pending Payments</Typography>
                    <Typography variant="body2">10/25 (40%)</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={40}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      bgcolor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#ff9800",
                        borderRadius: 6,
                      },
                    }}
                  />
                </Box>

                <GradientButton
                  bgcolor="linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)"
                  fullWidth
                  startIcon={<Payment />}
                >
                  Process Pending Payments
                </GradientButton>
              </CardContent>
            </GlassCard>
          </Grid>
        </Grid>

        {/* Employee Salary Table */}
        <GlassCard>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Employee Salary Details
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
              কর্মচারীদের বেতনের বিস্তারিত তথ্য
            </Typography>

            {/* Filters */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  placeholder="কর্মচারীর নাম খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <StyledSelect
                    value={departmentFilter}
                    label="Department"
                    onChange={(e) => setDepartmentFilter(e.target.value as string)}
                  >
                    <MenuItem value="all">All Departments</MenuItem>
                    <MenuItem value="academic">Academic</MenuItem>
                    <MenuItem value="administration">Administration</MenuItem>
                    <MenuItem value="support">Support</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <StyledSelect value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value as string)}>
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Download />}
                  sx={{
                    height: "56px",
                    borderRadius: "15px",
                    borderWidth: 2,
                    fontWeight: 600,
                    "&:hover": {
                      borderWidth: 2,
                    },
                  }}
                >
                  Export
                </Button>
              </Grid>
            </Grid>

            {/* Employee Table */}
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: "15px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Employee Info (কর্মচারীর তথ্য)</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Basic Salary (মূল বেতন)</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Allowances (ভাতা)</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Deductions (কর্তন)</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Net Salary (নিট বেতন)</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow
                      key={employee.id}
                      hover
                      sx={{
                        "&:hover": {
                          bgcolor: "#f8f9fa",
                        },
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar sx={{ bgcolor: "#9c27b0" }}>{employee.name.charAt(0)}</Avatar>
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {employee.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#666" }}>
                              {employee.designation} - {employee.department}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>৳ {employee.basicSalary.toLocaleString()}</TableCell>
                      <TableCell>
                        <Typography sx={{ color: "#4CAF50", fontWeight: 600 }}>
                          ৳ {employee.allowances.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ color: "#f44336", fontWeight: 600 }}>
                          ৳ {employee.deductions.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                          ৳ {employee.netSalary.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>{getStatusChip(employee.status)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            size="small"
                            variant="contained"
                            sx={{
                              background: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
                              borderRadius: "20px",
                              px: 2,
                              fontWeight: 600,
                            }}
                          >
                            Pay
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{
                              borderRadius: "20px",
                              px: 2,
                              fontWeight: 600,
                            }}
                          >
                            Details
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </GlassCard>

        {/* Add Salary Dialog */}
        <StyledDialog open={addSalaryModalOpen} onClose={() => setAddSalaryModalOpen(false)} maxWidth={false} fullWidth>
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
                onClick={() => setAddSalaryModalOpen(false)}
                sx={{
                  bgcolor: "#f5f5f5",
                  "&:hover": { bgcolor: "#eeeeee" },
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ pb: 3 }}>
            <Box sx={{ mt: 2 }}>
              <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 4 }}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        "& .MuiStepLabel-label": {
                          fontWeight: 600,
                          "&.Mui-active": {
                            color: "#9c27b0",
                            fontWeight: 700,
                          },
                        },
                        "& .MuiStepIcon-root": {
                          "&.Mui-active": {
                            color: "#9c27b0",
                          },
                          "&.Mui-completed": {
                            color: "#4caf50",
                          },
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              {renderStepContent(activeStep)}
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 0, gap: 2 }}>
            <Button
              onClick={() => setAddSalaryModalOpen(false)}
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

            {activeStep > 0 && (
              <Button
                onClick={handleBack}
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
                Back
              </Button>
            )}

            {activeStep < steps.length - 1 ? (
              <GradientButton bgcolor="linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)" onClick={handleNext}>
                Next Step
              </GradientButton>
            ) : (
              <GradientButton
                bgcolor="linear-gradient(135deg, #4caf50 0%, #45a049 100%)"
                onClick={() => setAddSalaryModalOpen(false)}
                startIcon={<Save />}
              >
                Save Salary Record
              </GradientButton>
            )}
          </DialogActions>
        </StyledDialog>
      </Container>
    </Box>
  )
}
