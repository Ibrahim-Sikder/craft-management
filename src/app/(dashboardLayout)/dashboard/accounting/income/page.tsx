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
import { Search, Add, Download, TrendingUp, School, CardGiftcard, Event, Edit, Visibility } from "@mui/icons-material"

export default function IncomeManagement() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const incomeRecords = [
    {
      id: 1,
      source: "Student Fees",
      description: "জানুয়ারি মাসের ছাত্র বেতন",
      amount: 190000,
      date: "2024-01-31",
      category: "Tuition",
      status: "Received",
      icon: School,
    },
    {
      id: 2,
      source: "Government Grant",
      description: "সরকারি অনুদান - শিক্ষা মন্ত্রণালয়",
      amount: 50000,
      date: "2024-01-15",
      category: "Grant",
      status: "Received",
      icon: CardGiftcard,
    },
    {
      id: 3,
      source: "Admission Fees",
      description: "নতুন ভর্তি ফি - ৫ জন ছাত্র",
      amount: 12500,
      date: "2024-01-20",
      category: "Admission",
      status: "Received",
      icon: School,
    },
    {
      id: 4,
      source: "Event Income",
      description: "বার্ষিক ক্রীড়া প্রতিযোগিতা আয়",
      amount: 8000,
      date: "2024-01-25",
      category: "Event",
      status: "Received",
      icon: Event,
    },
    {
      id: 5,
      source: "Donation",
      description: "স্থানীয় ব্যবসায়ী দান",
      amount: 15000,
      date: "2024-01-28",
      category: "Donation",
      status: "Pending",
      icon: CardGiftcard,
    },
  ]

  const incomeCategories = [
    { name: "Tuition Fees", total: 190000, percentage: 68.8, color: "primary" },
    { name: "Government Grant", total: 50000, percentage: 18.1, color: "success" },
    { name: "Donations", total: 15000, percentage: 5.4, color: "secondary" },
    { name: "Admission Fees", total: 12500, percentage: 4.5, color: "warning" },
    { name: "Events", total: 8000, percentage: 2.9, color: "error" },
  ]

  const getStatusChip = (status: string) => {
    switch (status) {
      case "Received":
        return <Chip label="প্রাপ্ত" color="success" size="small" />
      case "Pending":
        return <Chip label="অপেক্ষমাণ" color="warning" size="small" />
      case "Overdue":
        return <Chip label="বিলম্বিত" color="error" size="small" />
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
            Income Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            আয় ব্যবস্থাপনা - স্কুলের সকল আয়ের উৎস ও ট্র্যাকিং
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)} size="large">
          Add Income
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "success.light", mx: "auto", mb: 2 }}>
                <TrendingUp />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="success.main">
                ৳ 2,75,500
              </Typography>
              <Typography variant="body2" color="text.secondary">
                এই মাসের মোট আয়
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "primary.light", mx: "auto", mb: 2 }}>
                <School />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="primary.main">
                ৳ 1,90,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ছাত্র বেতন আয়
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "secondary.light", mx: "auto", mb: 2 }}>
                <CardGiftcard />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="secondary.main">
                ৳ 85,500
              </Typography>
              <Typography variant="body2" color="text.secondary">
                অন্যান্য উৎস
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "warning.light", mx: "auto", mb: 2 }}>
                <Event />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="warning.main">
                ৳ 15,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                অপেক্ষমাণ আয়
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Income Categories */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Income by Category
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            ক্যাটেগরি অনুযায়ী আয়ের বিভাজন
          </Typography>
          <Grid container spacing={2}>
            {incomeCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={2.4} key={index}>
                <Paper sx={{ p: 3, textAlign: "center", border: 1, borderColor: "divider" }}>
                  <Chip label={category.name} color={category.color as any} sx={{ mb: 2 }} />
                  <Typography variant="h6" fontWeight={700}>
                    ৳ {category.total.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {category.percentage}%
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Income Records */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Income Records
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            আয়ের বিস্তারিত রেকর্ড
          </Typography>

          {/* Filters */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
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
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={categoryFilter} label="Category" onChange={(e) => setCategoryFilter(e.target.value)}>
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="tuition">Tuition Fees</MenuItem>
                  <MenuItem value="grant">Government Grant</MenuItem>
                  <MenuItem value="donation">Donations</MenuItem>
                  <MenuItem value="admission">Admission Fees</MenuItem>
                  <MenuItem value="event">Events</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="received">Received</MenuItem>
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

          {/* Income Table */}
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Source & Description</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount (পরিমাণ)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date (তারিখ)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incomeRecords.map((income) => (
                  <TableRow key={income.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <income.icon color="action" />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {income.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {income.source}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" fontWeight={700} color="success.main">
                        ৳ {income.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={income.category} variant="outlined" size="small" />
                    </TableCell>
                    <TableCell>{income.date}</TableCell>
                    <TableCell>{getStatusChip(income.status)}</TableCell>
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

      {/* Add Income Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Income</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Income Source</InputLabel>
                  <Select label="Income Source">
                    <MenuItem value="tuition">Student Fees (ছাত্র বেতন)</MenuItem>
                    <MenuItem value="grant">Government Grant (সরকারি অনুদান)</MenuItem>
                    <MenuItem value="donation">Donation (দান)</MenuItem>
                    <MenuItem value="admission">Admission Fees (ভর্তি ফি)</MenuItem>
                    <MenuItem value="event">Event Income (ইভেন্ট আয়)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={3} label="Description" placeholder="আয়ের বিবরণ লিখুন..." />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth type="number" label="Amount (৳)" placeholder="পরিমাণ" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth type="date" label="Date" InputLabelProps={{ shrink: true }} />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Add Income
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
