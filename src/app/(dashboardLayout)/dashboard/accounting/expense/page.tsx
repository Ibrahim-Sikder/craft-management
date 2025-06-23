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
} from "@mui/icons-material"

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
    { name: "Utilities", total: 18500, color: "primary" },
    { name: "Salary", total: 125000, color: "success" },
    { name: "Supplies", total: 8500, color: "secondary" },
    { name: "Transport", total: 12000, color: "warning" },
    { name: "Maintenance", total: 5000, color: "error" },
  ]

  const getStatusChip = (status: string) => {
    switch (status) {
      case "Paid":
        return <Chip label="পরিশোধিত" color="success" size="small" />
      case "Pending":
        return <Chip label="অপেক্ষমাণ" color="warning" size="small" />
      case "Overdue":
        return <Chip label="বিলম্বিত" color="error" size="small" />
      default:
        return <Chip label={status} color="default" size="small" />
    }
  }

  return (
    <Container>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Expense Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ব্যয় ব্যবস্থাপনা - স্কুলের সকল খরচ ট্র্যাকিং ও নিয়ন্ত্রণ
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)} size="large">
          Add Expense
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "primary.light", mx: "auto", mb: 2 }}>
                <Receipt />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="primary">
                ৳ 1,69,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                এই মাসের মোট ব্যয়
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "warning.light", mx: "auto", mb: 2 }}>
                <Receipt />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="warning.main">
                ৳ 1,25,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                অপেক্ষমাণ পেমেন্ট
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "info.light", mx: "auto", mb: 2 }}>
                <Receipt />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="info.main">
                ৳ 1,69,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                জানুয়ারি ২০২৪
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "success.light", mx: "auto", mb: 2 }}>
                <Receipt />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="success.main">
                ৳ 5,452
              </Typography>
              <Typography variant="body2" color="text.secondary">
                দৈনিক গড় ব্যয়
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Category Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Expense Categories
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            ব্যয়ের ক্যাটেগরি অনুযায়ী বিভাজন
          </Typography>
          <Grid container spacing={2}>
            {expenseCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={2.4} key={index}>
                <Paper sx={{ p: 3, textAlign: "center" }}>
                  <Chip label={category.name} color={category.color as any} sx={{ mb: 2 }} />
                  <Typography variant="h6" fontWeight={700}>
                    ৳ {category.total.toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Expense List */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Recent Expenses
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            সাম্প্রতিক ব্যয়ের তালিকা
          </Typography>

          {/* Filters */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
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
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={categoryFilter} label="Category" onChange={(e) => setCategoryFilter(e.target.value)}>
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
                <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="overdue">Overdue</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant="outlined" fullWidth startIcon={<Download />} sx={{ height: "56px" }}>
                Export
              </Button>
            </Grid>
          </Grid>

          {/* Expenses Table */}
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Category & Description</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount (পরিমাণ)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date (তারিখ)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Payment Method</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <expense.icon color="action" />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {expense.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {expense.category}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" fontWeight={700}>
                        ৳ {expense.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.paymentMethod}</TableCell>
                    <TableCell>{getStatusChip(expense.status)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton size="small" color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="primary">
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
      </Card>

      {/* Add Expense Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Expense</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select label="Category">
                    <MenuItem value="utilities">Utilities (ইউটিলিটি)</MenuItem>
                    <MenuItem value="salary">Salary (বেতন)</MenuItem>
                    <MenuItem value="supplies">Supplies (সরবরাহ)</MenuItem>
                    <MenuItem value="transport">Transport (পরিবহন)</MenuItem>
                    <MenuItem value="maintenance">Maintenance (রক্ষণাবেক্ষণ)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={3} label="Description" placeholder="ব্যয়ের বিবরণ লিখুন..." />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth type="number" label="Amount (৳)" placeholder="পরিমাণ" />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Payment Method</InputLabel>
                  <Select label="Payment Method">
                    <MenuItem value="cash">Cash (নগদ)</MenuItem>
                    <MenuItem value="bank">Bank Transfer (ব্যাংক ট্রান্সফার)</MenuItem>
                    <MenuItem value="check">Check (চেক)</MenuItem>
                    <MenuItem value="mobile">Mobile Banking (মোবাইল ব্যাংকিং)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Add Expense
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
