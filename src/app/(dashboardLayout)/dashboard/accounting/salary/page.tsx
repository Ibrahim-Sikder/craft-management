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
  LinearProgress,
  Container,
} from "@mui/material"
import { Search, Add, Download, People, Calculate, Payment, Description } from "@mui/icons-material"

export default function SalaryManagement() {
  const [open, setOpen] = useState(false)
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
        return <Chip label="পরিশোধিত" color="success" size="small" />
      case "Pending":
        return <Chip label="অপেক্ষমাণ" color="warning" size="small" />
      case "Processing":
        return <Chip label="প্রক্রিয়াধীন" color="info" size="small" />
      default:
        return <Chip label={status} color="default" size="small" />
    }
  }

  return (
    <Container maxWidth='xl'>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Salary Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            বেতন ব্যবস্থাপনা - শিক্ষক ও কর্মচারীদের বেতন নিয়ন্ত্রণ
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<Add />} onClick={() => setOpen(true)} size="large">
            Add Employee
          </Button>
          <Button variant="contained" startIcon={<Calculate />} size="large">
            Process Payroll
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "primary.light", mx: "auto", mb: 2 }}>
                <People />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="primary.main">
                25
              </Typography>
              <Typography variant="body2" color="text.secondary">
                মোট কর্মচারী
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "info.light", mx: "auto", mb: 2 }}>
                <Calculate />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="info.main">
                ৳ 8,75,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                মাসিক বেতন
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "success.light", mx: "auto", mb: 2 }}>
                <Payment />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="success.main">
                ৳ 6,50,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                এ মাসে পরিশোধিত
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "warning.light", mx: "auto", mb: 2 }}>
                <Description />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="warning.main">
                ৳ 2,25,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                অপেক্ষমাণ পেমেন্ট
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Payroll Summary and Payment Status */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Payroll Summary
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                এই মাসের বেতন সারসংক্ষেপ
              </Typography>
              <Box sx={{ space: 3 }}>
                <Paper sx={{ p: 2, mb: 2, bgcolor: "grey.50" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography>Total Basic Salary</Typography>
                    <Typography fontWeight={700}>৳ 7,50,000</Typography>
                  </Box>
                </Paper>
                <Paper sx={{ p: 2, mb: 2, bgcolor: "success.50" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography>Total Allowances</Typography>
                    <Typography fontWeight={700} color="success.main">
                      ৳ 1,85,000
                    </Typography>
                  </Box>
                </Paper>
                <Paper sx={{ p: 2, mb: 2, bgcolor: "error.50" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography>Total Deductions</Typography>
                    <Typography fontWeight={700} color="error.main">
                      ৳ 60,000
                    </Typography>
                  </Box>
                </Paper>
                <Paper sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography fontWeight={700}>Net Payroll</Typography>
                    <Typography fontWeight={700} variant="h6">
                      ৳ 8,75,000
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Payment Status
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                পেমেন্ট অবস্থা
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Paid Employees</Typography>
                  <Typography variant="body2">15/25 (60%)</Typography>
                </Box>
                <LinearProgress variant="determinate" value={60} color="success" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Pending Payments</Typography>
                  <Typography variant="body2">10/25 (40%)</Typography>
                </Box>
                <LinearProgress variant="determinate" value={40} color="warning" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Button variant="contained" fullWidth startIcon={<Payment />}>
                Process Pending Payments
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Employee Salary Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Employee Salary Details
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            কর্মচারীদের বেতনের বিস্তারিত তথ্য
          </Typography>

          {/* Filters */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
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
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={departmentFilter}
                  label="Department"
                  onChange={(e) => setDepartmentFilter(e.target.value)}
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
                <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant="outlined" fullWidth startIcon={<Download />} sx={{ height: "56px" }}>
                Export
              </Button>
            </Grid>
          </Grid>

          {/* Employee Table */}
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Employee Info (কর্মচারীর তথ্য)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Basic Salary (মূল বেতন)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Allowances (ভাতা)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Deductions (কর্তন)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Net Salary (নিট বেতন)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {employee.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {employee.designation} - {employee.department}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>৳ {employee.basicSalary.toLocaleString()}</TableCell>
                    <TableCell>
                      <Typography color="success.main" fontWeight={600}>
                        ৳ {employee.allowances.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="error.main" fontWeight={600}>
                        ৳ {employee.deductions.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" fontWeight={700}>
                        ৳ {employee.netSalary.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>{getStatusChip(employee.status)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button size="small" variant="contained">
                          Pay
                        </Button>
                        <Button size="small" variant="outlined">
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
      </Card>

      {/* Add Employee Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Full Name" placeholder="পূর্ণ নাম" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Designation" placeholder="পদবী" />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select label="Department">
                    <MenuItem value="academic">Academic (শিক্ষা)</MenuItem>
                    <MenuItem value="administration">Administration (প্রশাসন)</MenuItem>
                    <MenuItem value="support">Support (সহায়তা)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth type="number" label="Basic Salary (৳)" placeholder="মূল বেতন" />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Add Employee
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
