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
} from "@mui/material"
import {
  Search,
  Add,
  Download,
  Receipt,
  Bolt,
  Water,
  People,
  MenuBook,
  DirectionsCar,
  Edit,
  Visibility,
  Close,
  TrendingDown,
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
    borderRadius: "20px",
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
  },
}))

export default function ExpenseManagement() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const expenses = [
    {
      id: 1,
      category: "Utilities",
      description: "বিদ্যুৎ বিল - জানুয়ারি ২০২৪",
      amount: 15000,
      date: "2024-01-15",
      paymentMethod: "Bank Transfer",
      status: "Paid",
      icon: Bolt,
    },
    {
      id: 2,
      category: "Utilities",
      description: "পানি বিল - জানুয়ারি ২০২৪",
      amount: 3500,
      date: "2024-01-12",
      paymentMethod: "Cash",
      status: "Paid",
      icon: Water,
    },
    {
      id: 3,
      category: "Salary",
      description: "শিক্ষক বেতন - জানুয়ারি ২০২৪",
      amount: 125000,
      date: "2024-01-31",
      paymentMethod: "Bank Transfer",
      status: "Pending",
      icon: People,
    },
    {
      id: 4,
      category: "Supplies",
      description: "স্টেশনারি ক্রয় - বই, কলম, খাতা",
      amount: 8500,
      date: "2024-01-10",
      paymentMethod: "Cash",
      status: "Paid",
      icon: MenuBook,
    },
    {
      id: 5,
      category: "Transport",
      description: "স্কুল বাস জ্বালানি খরচ",
      amount: 12000,
      date: "2024-01-20",
      paymentMethod: "Cash",
      status: "Paid",
      icon: DirectionsCar,
    },
  ]

  const expenseCategories = [
    { name: "Utilities", total: 18500, color: "#2196F3" },
    { name: "Salary", total: 125000, color: "#4CAF50" },
    { name: "Supplies", total: 8500, color: "#9c27b0" },
    { name: "Transport", total: 12000, color: "#ff9800" },
    { name: "Maintenance", total: 5000, color: "#e91e63" },
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
      case "Overdue":
        return (
          <Chip
            label="বিলম্বিত"
            sx={{
              bgcolor: "#ffebee",
              color: "#d32f2f",
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
            onClick={() => setOpen(true)}
            sx={{
              background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
              color: "white",
              px: 4,
              py: 2,
              borderRadius: "50px",
              boxShadow: "0 8px 25px rgba(244, 67, 54, 0.3)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 35px rgba(244, 67, 54, 0.4)",
              },
            }}
          >
            <Add sx={{ mr: 1 }} />
            Add Expense
          </Fab>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <GradientCard bgcolor="linear-gradient(135deg, #f44336 0%, #d32f2f 100%)">
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      এই মাসের মোট ব্যয়
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      ৳ 1,69,000
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <Receipt sx={{ fontSize: 30 }} />
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
                      ৳ 1,25,000
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <TrendingDown sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </GradientCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <GradientCard bgcolor="linear-gradient(135deg, #2196F3 0%, #1976d2 100%)">
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      জানুয়ারি ২০২৪
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      ৳ 1,69,000
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <Receipt sx={{ fontSize: 30 }} />
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
                      দৈনিক গড় ব্যয়
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      ৳ 5,452
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <Receipt sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </GradientCard>
          </Grid>
        </Grid>

        {/* Category Overview */}
        <GlassCard sx={{ mb: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Expense Categories
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
              ব্যয়ের ক্যাটেগরি অনুযায়ী বিভাজন
            </Typography>
            <Grid container spacing={3}>
              {expenseCategories.map((category, index) => (
                <Grid item xs={12} sm={6} md={2.4} key={index}>
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: "center",
                      borderRadius: "15px",
                      border: `2px solid ${category.color}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: `0 10px 25px ${category.color}40`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        bgcolor: category.color,
                        borderRadius: "50%",
                        mx: "auto",
                        mb: 2,
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                      {category.name}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      ৳ {category.total.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </GlassCard>

        {/* Expense List */}
        <GlassCard>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Recent Expenses
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
              সাম্প্রতিক ব্যয়ের তালিকা
            </Typography>

            {/* Filters */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="ব্যয়ের বিবরণ খুঁজুন..."
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
                    <MenuItem value="all">All Categories</MenuItem>
                    <MenuItem value="utilities">Utilities</MenuItem>
                    <MenuItem value="salary">Salary</MenuItem>
                    <MenuItem value="supplies">Supplies</MenuItem>
                    <MenuItem value="transport">Transport</MenuItem>
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
                    <MenuItem value="overdue">Overdue</MenuItem>
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

            {/* Expenses Table */}
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
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Category & Description</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Amount (পরিমাণ)</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Date (তারিখ)</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Payment Method</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow
                      key={expense.id}
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
                              bgcolor: "#ffebee",
                              color: "#d32f2f",
                            }}
                          >
                            <expense.icon />
                          </Avatar>
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {expense.description}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#666" }}>
                              {expense.category}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "#f44336" }}>
                          ৳ {expense.amount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.paymentMethod}</TableCell>
                      <TableCell>{getStatusChip(expense.status)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton
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
                            size="small"
                            sx={{
                              bgcolor: "#e8f5e8",
                              color: "#2e7d32",
                              "&:hover": { bgcolor: "#c8e6c9" },
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </GlassCard>

        {/* Add Expense Dialog */}
        <StyledDialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ pb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#333" }}>
                Add New Expense
              </Typography>
              <IconButton onClick={() => setOpen(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pb: 3 }}>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select label="Category" sx={{ borderRadius: "15px" }}>
                    <MenuItem value="utilities">Utilities (ইউটিলিটি)</MenuItem>
                    <MenuItem value="salary">Salary (বেতন)</MenuItem>
                    <MenuItem value="supplies">Supplies (সরবরাহ)</MenuItem>
                    <MenuItem value="transport">Transport (পরিবহন)</MenuItem>
                    <MenuItem value="maintenance">Maintenance (রক্ষণাবেক্ষণ)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  placeholder="ব্যয়ের বিবরণ লিখুন..."
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
                  type="number"
                  label="Amount (৳)"
                  placeholder="পরিমাণ"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Payment Method</InputLabel>
                  <Select label="Payment Method" sx={{ borderRadius: "15px" }}>
                    <MenuItem value="cash">Cash (নগদ)</MenuItem>
                    <MenuItem value="bank">Bank Transfer (ব্যাংক ট্রান্সফার)</MenuItem>
                    <MenuItem value="check">Check (চেক)</MenuItem>
                    <MenuItem value="mobile">Mobile Banking (মোবাইল ব্যাংকিং)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button
              onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
              variant="contained"
              sx={{
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
                boxShadow: "0 4px 15px rgba(244, 67, 54, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(244, 67, 54, 0.4)",
                },
              }}
            >
              Add Expense
            </Button>
          </DialogActions>
        </StyledDialog>
      </Box>
    </Container>
  )
}
