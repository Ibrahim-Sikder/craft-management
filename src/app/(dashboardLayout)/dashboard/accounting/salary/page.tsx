
"use client"

import { useState } from "react"
import {
  Box,
  Grid,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Container,
} from "@mui/material"
import {
  Add,
} from "@mui/icons-material"
import { GlassCard, GradientButton} from "@/style/customeStyle"
import AddSalaryModal from "./__components/AddSalaryModal"

export default function SalaryManagement() {
  const [addSalaryModalOpen, setAddSalaryModalOpen] = useState(false)
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
    // ... other employees
  ];

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
              sx={{ color: '#fff' }}
            >
              Add Salary
            </GradientButton>
          </Box>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* ... summary cards code remains the same ... */}
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
              {/* ... filters code remains the same ... */}
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

        {/* Add Salary Dialog Component */}
        <AddSalaryModal
          open={addSalaryModalOpen}
          onClose={() => setAddSalaryModalOpen(false)}
          employees={employees}
        />
      </Container>
    </Box>
  )
}