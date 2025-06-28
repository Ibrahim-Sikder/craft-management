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
} from "@mui/material"
import { Search, Add, Download, People, Calculate, Payment, Description, Close } from "@mui/icons-material"
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
    borderRadius: "20px",
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
  },
}))

export default function SalaryManagement() {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [payrollModalOpen, setPayrollModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

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
            }}
          />
        )
      default:
        return <Chip label={status} />
    }
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
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
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setAddModalOpen(true)}
              sx={{
                borderRadius: "25px",
                px: 3,
                py: 1.5,
                borderWidth: 2,
                "&:hover": { borderWidth: 2 },
              }}
            >
              Add Employee
            </Button>
            <Fab
              variant="extended"
              onClick={() => setPayrollModalOpen(true)}
              sx={{
                background: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
                color: "white",
                px: 4,
                py: 2,
                borderRadius: "50px",
                boxShadow: "0 8px 25px rgba(156, 39, 176, 0.3)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 35px rgba(156, 39, 176, 0.4)",
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
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Payment />}
                  sx={{
                    background: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
                    borderRadius: "25px",
                    py: 1.5,
                    boxShadow: "0 4px 15px rgba(156, 39, 176, 0.3)",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(156, 39, 176, 0.4)",
                    },
                  }}
                >
                  Process Pending Payments
                </Button>
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
                <TextField
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={departmentFilter}
                    label="Department"
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    sx={{ borderRadius: "15px" }}
                  >
                    <MenuItem value="all">All Departments</MenuItem>
                    <MenuItem value="academic">Academic</MenuItem>
                    <MenuItem value="administration">Administration</MenuItem>
                    <MenuItem value="support">Support</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{ borderRadius: "15px" }}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                  </Select>
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
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {employee.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#666" }}>
                            {employee.designation} - {employee.department}
                          </Typography>
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
                            }}
                          >
                            Pay
                          </Button>
                          <Button size="small" variant="outlined" sx={{ borderRadius: "20px", px: 2 }}>
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

        {/* Add Employee Dialog */}
        <StyledDialog open={addModalOpen} onClose={() => setAddModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ pb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#333" }}>
                Add New Employee
              </Typography>
              <IconButton onClick={() => setAddModalOpen(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pb: 3 }}>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  placeholder="পূর্ণ নাম"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Designation"
                  placeholder="পদবী"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select label="Department" sx={{ borderRadius: "15px" }}>
                    <MenuItem value="academic">Academic (শিক্ষা)</MenuItem>
                    <MenuItem value="administration">Administration (প্রশাসন)</MenuItem>
                    <MenuItem value="support">Support (সহায়তা)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Basic Salary (৳)"
                  placeholder="মূল বেতন"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button
              onClick={() => setAddModalOpen(false)}
              variant="outlined"
              sx={{
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                borderWidth: 2,
                "&:hover": { borderWidth: 2 },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setAddModalOpen(false)}
              variant="contained"
              sx={{
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                background: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
                boxShadow: "0 4px 15px rgba(156, 39, 176, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(156, 39, 176, 0.4)",
                },
              }}
            >
              Add Employee
            </Button>
          </DialogActions>
        </StyledDialog>

        {/* Process Payroll Dialog */}
        <StyledDialog open={payrollModalOpen} onClose={() => setPayrollModalOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ pb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#333" }}>
                Process Payroll
              </Typography>
              <IconButton onClick={() => setPayrollModalOpen(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pb: 3 }}>
            <Box sx={{ mt: 2 }}>
              <Paper
                sx={{
                  p: 4,
                  mb: 4,
                  borderRadius: "15px",
                  background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Payroll Summary
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant="body2">Total Employees:</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      25
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Total Basic Salary:</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      ৳ 7,50,000
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Total Allowances:</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#4CAF50" }}>
                      ৳ 1,85,000
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Total Deductions:</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#f44336" }}>
                      ৳ 60,000
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        borderTop: "2px solid #dee2e6",
                        pt: 2,
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: 800 }}>
                        Net Payroll:
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: "#9c27b0" }}>
                        ৳ 8,75,000
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              <FormControl fullWidth>
                <InputLabel>Payroll Month</InputLabel>
                <Select label="Payroll Month" sx={{ borderRadius: "15px" }}>
                  <MenuItem value="january">January 2024</MenuItem>
                  <MenuItem value="february">February 2024</MenuItem>
                  <MenuItem value="march">March 2024</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button
              onClick={() => setPayrollModalOpen(false)}
              variant="outlined"
              sx={{
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                borderWidth: 2,
                "&:hover": { borderWidth: 2 },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setPayrollModalOpen(false)}
              variant="contained"
              sx={{
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                background: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
                boxShadow: "0 4px 15px rgba(156, 39, 176, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(156, 39, 176, 0.4)",
                },
              }}
            >
              Process Payroll
            </Button>
          </DialogActions>
        </StyledDialog>
      </Box>
    </Container>
  )
}
