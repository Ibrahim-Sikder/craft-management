/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  InputAdornment,
  LinearProgress,
  Avatar,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Paper,
  Alert,
  Pagination,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
} from "@mui/icons-material"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import LoanForm from "./__components/LoanForm"
import { Loan } from "@/types"
import Swal from "sweetalert2"
import { useDeleteLoanMutation, useGetAllLoansQuery } from "@/redux/api/loanApi"

const LoanDashboard = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const { data: loanData, isLoading, refetch } = useGetAllLoansQuery({ page, limit })
  const [deleteLoan] = useDeleteLoanMutation()
  const [loans, setLoans] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("ALL")
  const [formOpen, setFormOpen] = useState(false)
  const [editingLoanId, setEditingLoanId] = useState<string | undefined>(undefined)

  // Map API response to expected Loan format
  useEffect(() => {
    if (loanData?.data?.data) {
      setLoans(loanData.data.data)
    }
  }, [loanData])

  // Calculate metrics
  const loansGiven = loans.filter((loan) => loan.loan_type === "given")
  const loansTaken = loans.filter((loan) => loan.loan_type === "taken")

  const totalLoansGiven = loansGiven.reduce((sum, loan) => sum + loan.loan_amount, 0)
  const totalLoansTaken = loansTaken.reduce((sum, loan) => sum + loan.loan_amount, 0)
  const netPosition = totalLoansGiven - totalLoansTaken

  const activeLoans = loans.filter((loan) => loan.status === "active").length
  const totalMonthlyPayments = loans
    .filter((loan) => loan.status === "active")
    .reduce((sum, loan) => sum + (loan.monthly_installment || 0), 0)

  // Prepare chart data
  const loanTypeData = [
    { name: "Loans Given", value: totalLoansGiven, color: "#10B981" },
    { name: "Loans Taken", value: totalLoansTaken, color: "#EC4899" },
  ]

  const monthlyPaymentData = loans
    .filter((loan) => loan.status === "active" && loan.monthly_installment)
    .map((loan) => {
      const name = loan.loan_type === "given" ? loan.borrowerName : loan.lenderName
      return {
        name: name?.length > 20 ? `${name.substring(0, 20)}...` : name,
        payment: loan.monthly_installment,
        type: loan.loan_type,
      }
    })

  // Filter loans
  const filteredLoans = loans.filter((loan) => {
    const name = loan.loan_type === "given" ? loan.borrowerName : loan.lenderName
    const matchesSearch = name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    const matchesType = typeFilter === "ALL" || loan.loan_type.toUpperCase() === typeFilter
    return matchesSearch && matchesType
  })

  const handleAdd = () => {
    setEditingLoanId(undefined)
    setFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this loan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })

      if (result.isConfirmed) {
        await deleteLoan(id).unwrap()
        refetch()

        Swal.fire({
          title: "Deleted!",
          text: "Loan has been deleted successfully.",
          icon: "success"
        })
      }
    } catch (err: any) {
      Swal.fire({
        title: "Error!",
        text: err.data?.message || "Failed to delete loan",
        icon: "error"
      })
    }
  }

  const handleEdit = (loan: any) => {
    setEditingLoanId(loan._id)
    setFormOpen(true)
  }

  const handleFormSuccess = () => {
    setFormOpen(false)
    refetch()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "paid":
        return "info"
      case "defaulted":
        return "error"
      default:
        return "default"
    }
  }

  const getCompletionPercentage = (loan: any) => {
    // For now, we'll assume no payments have been made
    // You might want to add payment tracking in the future
    return 0
  }

  return (
    <>
      <Box sx={{ p: 3, width: '100%' }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontFamily: "Playfair Display", fontWeight: 700, color: "#1F2937", mb: 1 }}>
              Loan Management
            </Typography>
            <Typography variant="body1" sx={{ color: "#6B7280" }}>
              Track loans given and taken with payment schedules
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{
              bgcolor: "#EC4899",
              "&:hover": { bgcolor: "#BE185D" },
              borderRadius: 2,
              px: 3,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            New Loan
          </Button>
        </Box>

        {/* Metrics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                color: "white",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      ₹{totalLoansGiven.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Loans Given
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                    <TrendingUpIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
                color: "white",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(236, 72, 153, 0.3)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      ₹{totalLoansTaken.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Loans Taken
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                    <TrendingDownIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background:
                  netPosition >= 0
                    ? "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
                    : "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                color: "white",
                borderRadius: 3,
                boxShadow: `0 8px 32px ${netPosition >= 0 ? "rgba(139, 92, 246, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      ₹{Math.abs(netPosition).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {netPosition >= 0 ? "Net Gain" : "Net Liability"}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                    <AccountBalanceIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                color: "white",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      ₹{totalMonthlyPayments.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Monthly Payments
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                    <ScheduleIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#1F2937" }}>
                  Loan Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={loanTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {loanTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#1F2937" }}>
                  Monthly Payment Schedule
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyPaymentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, "Monthly Payment"]} />
                    <Bar dataKey="payment" fill="#EC4899" name="Monthly Payment" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters and Search */}
        <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search loans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#9CA3AF" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": { borderColor: "#EC4899" },
                      "&.Mui-focused fieldset": { borderColor: "#EC4899" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={1}>
                  {["ALL", "GIVEN", "TAKEN"].map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      onClick={() => setTypeFilter(type)}
                      variant={typeFilter === type ? "filled" : "outlined"}
                      sx={{
                        bgcolor: typeFilter === type ? "#EC4899" : "transparent",
                        color: typeFilter === type ? "white" : "#6B7280",
                        borderColor: "#EC4899",
                        "&:hover": {
                          bgcolor: typeFilter === type ? "#BE185D" : "rgba(236, 72, 153, 0.1)",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Loan Table */}
        <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", mb: 3 }}>
          <CardContent sx={{ p: 0 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F9FAFB" }}>
                    <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Borrower/Lender</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Principal</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Interest Rate</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Monthly Payment</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Loan Date</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <LinearProgress />
                      </TableCell>
                    </TableRow>
                  ) : filteredLoans.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <Typography variant="body2" sx={{ py: 3, color: "#6B7280" }}>
                          No loans found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLoans.map((loan) => {
                      const name = loan.loan_type === "given" ? loan.borrowerName : loan.lenderName
                      const type = loan.loan_type.toUpperCase()
                      
                      return (
                        <TableRow key={loan._id} sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: "#1F2937" }}>
                                {name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "#6B7280" }}>
                                {loan.contactNumber}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={type}
                              size="small"
                              sx={{
                                bgcolor: type === "GIVEN" ? "rgba(16, 185, 129, 0.1)" : "rgba(236, 72, 153, 0.1)",
                                color: type === "GIVEN" ? "#059669" : "#BE185D",
                                fontWeight: 500,
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>₹{loan.loan_amount.toLocaleString()}</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>{loan.interest_rate}%</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            ₹{loan.monthly_installment?.toLocaleString() || "N/A"}
                          </TableCell>
                          <TableCell>
                            {new Date(loan.loan_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={loan.status.toUpperCase()}
                              size="small"
                              color={getStatusColor(loan.status) as any}
                              variant="filled"
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleEdit(loan)}
                                sx={{ color: "#6B7280", "&:hover": { color: "#EC4899" } }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleDelete(loan._id)}
                                sx={{ color: "#6B7280", "&:hover": { color: "#DC2626" } }}
                              >
                                <DeleteIcon fontSize="small" />
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
        </Card>

        {/* Pagination */}
        {loanData?.meta && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={loanData.meta.totalPage}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="secondary"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>

      <LoanForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        loanId={editingLoanId}
      />
    </>
  )
}

export default LoanDashboard