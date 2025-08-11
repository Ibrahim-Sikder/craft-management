/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  Box,
  Grid,
  CardContent,
  Typography,
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
  IconButton,
  Container,
  Fab,
} from "@mui/material"
import {
  Search,
  Add,
  School,
  CardGiftcard,
  Edit,
  MonetizationOn,
  AccountBalance,
  Delete,
} from "@mui/icons-material"
import { GlassCard } from "@/style/customeStyle"
import Swal from "sweetalert2"
import { TExpense, TIncome } from "@/interface"
import AddExpenseModal from "../_components/AddExpenseModal"
import { useGetAllExpenseCategoriesQuery } from "@/redux/api/expenseCategoryApi"
import { useDeleteExpenseMutation, useGetAllExpensesQuery } from "@/redux/api/expenseApi"

export default function ExpenseManagement() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [editData, setEditData] = useState<TIncome | null>(null)
  const [deleteIncome] = useDeleteExpenseMutation()
  const { data, isLoading } = useGetAllExpensesQuery({})
  const expenseRecords = data?.data?.expenses || []
  const { data: expenseCategories } = useGetAllExpenseCategoriesQuery({})


  const handleDeleteIncome = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You want to delete this Expense?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })

      if (result.isConfirmed) {
        await deleteIncome(id).unwrap()

        Swal.fire({
          title: "Deleted!",
          text: `Expense has been deleted successfully.`,
          icon: "success"
        })
      }
    } catch (err: any) {
      Swal.fire({
        title: "Error!",
        text: err.data?.message || "Failed to delete Expense",
        icon: "error"
      })
    }
  }

  const getStatusChip = (status: string) => {
    const statusLower = status?.toLowerCase() || "completed";

    switch (statusLower) {
      case "received":
      case "completed":
        return (
          <Chip
            label={status}
            sx={{
              bgcolor: "#e8f5e8",
              color: "#2e7d32",
              fontWeight: 600,
              borderRadius: "20px",
              textTransform: "capitalize",
            }}
          />
        );

      case "pending":
        return (
          <Chip
            label={status}
            sx={{
              bgcolor: "#fff3e0",
              color: "#f57c00",
              fontWeight: 600,
              borderRadius: "20px",
              textTransform: "capitalize",
            }}
          />
        );

      case "overdue":
        return (
          <Chip
            label={status}
            sx={{
              bgcolor: "#ffebee",
              color: "#d32f2f",
              fontWeight: 600,
              borderRadius: "20px",
              textTransform: "capitalize",
            }}
          />
        );

      default:
        return (
          <Chip
            label={status}
            sx={{
              bgcolor: "#e0e0e0",
              color: "#424242",
              fontWeight: 600,
              borderRadius: "20px",
              textTransform: "capitalize",
            }}
          />
        );
    }
  };



  const getIncomeIcon = (category: string) => {
    const cat = (category || "").toLowerCase()
    if (cat.includes("student") || cat.includes("ছাত্র") || cat.includes("tuition")) {
      return <School />
    } else if (cat.includes("donation") || cat.includes("দান")) {
      return <CardGiftcard />
    } else if (cat.includes("grant") || cat.includes("অনুদান")) {
      return <AccountBalance />
    } else {
      return <MonetizationOn />
    }
  }

  const handleEdit = (expense: TExpense) => {
    setEditData(expense)
    setOpen(true)
  }

  const handleAddNew = () => {
    setEditData(null)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditData(null)
  }


  if (isLoading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography variant="h6">Loading expense data...</Typography>
        </Box>
      </Container>
    )
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
                background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Expense Management
            </Typography>
            <Typography variant="h6" sx={{ color: "#666", fontWeight: 500 }}>
              ব্যয় ব্যবস্থাপনা - স্কুলের সকল খরচ ট্র্যাকিং ও নিয়ন্ত্রণ
            </Typography>
          </Box>
          <Fab
            variant="extended"
            onClick={handleAddNew}
            sx={{
              background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
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
            <Add sx={{ mr: 1 }} />
            Add Expense
          </Fab>
        </Box>
        <GlassCard>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Expense Records
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
              আয়ের বিস্তারিত রেকর্ড ({expenseRecords.length} টি এন্ট্রি)
            </Typography>

            {/* Filters */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="আয়ের বিবরণ খুঁজুন..."
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
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    label="Category"
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    sx={{ borderRadius: "15px" }}
                  >
                    <MenuItem value="all">All</MenuItem>
                    {expenseCategories?.data?.data?.map((Expense: any, index: number) => (
                      <MenuItem key={index} value={Expense._id}>
                        {Expense.name}
                      </MenuItem>
                    ))}
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
                    <MenuItem value="received">Received</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="overdue">Cancel</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

            </Grid>

            {/* Expense Table */}
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
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Source & Description</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenseRecords?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: "center", py: 4 }}>
                        <Typography variant="h6" sx={{ color: "#666" }}>
                          কোন আয়ের রেকর্ড পাওয়া যায়নি
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    expenseRecords?.map((Expense: TIncome) => (
                      <TableRow
                        key={Expense._id}
                        hover
                        sx={{
                          "&:hover": {
                            bgcolor: "#f8f9fa",
                          },
                        }}





                      >
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar
                              sx={{
                                bgcolor: "#e3f2fd",
                                color: "#1976d2",
                              }}
                            >
                              {getIncomeIcon(Expense.category?.name || "")}
                            </Avatar>
                            <Box>

                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {Expense.category?.name || "Other"}
                              </Typography>

                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ fontWeight: 800, color: "#4CAF50" }}>
                            ৳ {(Expense.totalAmount || 0).toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={Expense.category?.name || "Other"}
                            variant="outlined"
                            sx={{
                              borderRadius: "20px",
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(Expense.incomeDate).toLocaleDateString("en-GB")}
                        </TableCell>
                        <TableCell>
                          {getStatusChip(Expense.status || "completed")}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton
                              onClick={() => handleEdit(Expense)}
                              size="small"
                              sx={{
                                bgcolor: "#e3f2fd",
                                color: "#1976d2",
                                "&:hover": { bgcolor: "#bbdefb" },
                              }}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteIncome(Expense._id)}
                              size="small"
                              sx={{
                                bgcolor: "#fdecea",
                                color: "#d32f2f",
                                "&:hover": {
                                  bgcolor: "#f8d7da",
                                },
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </GlassCard>

        <AddExpenseModal open={open} onClose={handleClose} id={editData?._id} />
      </Box>
    </Container>
  )
}