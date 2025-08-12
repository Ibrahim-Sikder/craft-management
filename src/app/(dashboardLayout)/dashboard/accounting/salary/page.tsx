/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  Box,
  CardContent,
  Typography,
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
  CircularProgress,
  IconButton,
} from "@mui/material"
import {
  Add,
  Edit,
  Delete,
} from "@mui/icons-material"
import { GlassCard, GradientButton } from "@/style/customeStyle"
import AddSalaryModal from "./__components/AddSalaryModal"
import { useDeleteSalaryMutation, useGetAllSalariesQuery } from "@/redux/api/salaryApi"
import Swal from "sweetalert2"

export default function SalaryManagement() {
  const [addSalaryModalOpen, setAddSalaryModalOpen] = useState(false)
  const [editingSalaryId, setEditingSalaryId] = useState<string | null>(null)
  const { data, isLoading, refetch } = useGetAllSalariesQuery({})
  const allSalaries = data?.data?.salaries || []
  console.log('all salary', allSalaries)
  const [deleteSalary] = useDeleteSalaryMutation()

  const handleDeleteSalary = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You want to delete this salary?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel"
      })

      if (result.isConfirmed) {
        await deleteSalary(id).unwrap()
        Swal.fire({
          title: "Deleted!",
          text: `Salary has been deleted successfully.`,
          icon: "success"
        })
        refetch()
      }
    } catch (err: any) {
      Swal.fire({
        title: "Error!",
        text: err.data?.message || "Failed to delete salary",
        icon: "error"
      })
    }
  }

  const handleEditSalary = (id: string) => {
    setEditingSalaryId(id)
    setAddSalaryModalOpen(true)
  }

  const handleCloseModal = () => {
    setAddSalaryModalOpen(false)
    setEditingSalaryId(null)
    refetch()
  }

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
              onClick={() => {
                setEditingSalaryId(null)
                setAddSalaryModalOpen(true)
              }}
              sx={{ color: '#fff' }}
            >
              Add Salary
            </GradientButton>
          </Box>
        </Box>

        {/* Employee Salary Table */}
        <GlassCard>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Employee Salary Details
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
              কর্মচারীদের বেতনের বিস্তারিত তথ্য
            </Typography>

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
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ textAlign: "center", py: 4 }}>
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : data?.data?.salaries?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ textAlign: "center", py: 4 }}>
                        No salary records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    allSalaries?.map((employee: any) => {


                      return (
                        <TableRow
                          key={employee._id}
                          hover
                          sx={{
                            "&:hover": {
                              bgcolor: "#f8f9fa",
                            },
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Avatar sx={{ bgcolor: "#9c27b0" }}>
                                {employee.employee?.charAt(0) || 'U'}
                              </Avatar>
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {employee.employee || 'Unknown'}
                                </Typography>
                               
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>৳ {employee.basicSalary?.toLocaleString() || 0}</TableCell>
                          <TableCell>
                            <Typography sx={{ color: "#4CAF50", fontWeight: 600 }}>
                              ৳
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ color: "#f44336", fontWeight: 600 }}>
                              ৳
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>
                              ৳ {employee.netSalary?.toLocaleString() || 0}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {getStatusChip(employee.status || "Pending")}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <IconButton
                                onClick={() => handleEditSalary(employee._id)}
                                sx={{
                                  color: "#1976d2",
                                  '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
                                }}
                              >
                                <Edit />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDeleteSalary(employee._id)}
                                sx={{
                                  color: "#d32f2f",
                                  '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.1)' }
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </GlassCard>

        {/* Add/Edit Salary Dialog */}
        <AddSalaryModal
          open={addSalaryModalOpen}
          onClose={handleCloseModal}
          salaryId={editingSalaryId}
        />
      </Container>
    </Box>
  )
}