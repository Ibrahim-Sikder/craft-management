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
} from "@mui/material"
import { Search, Add, Download, Description, Print, Visibility, Send, Email } from "@mui/icons-material"

export default function InvoiceGenerator() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const invoices = [
    {
      id: 1,
      invoiceNo: "INV-2024-001",
      studentName: "আহমেদ হাসান",
      class: "6A",
      roll: "01",
      amount: 2500,
      issueDate: "2024-01-01",
      dueDate: "2024-01-15",
      status: "Paid",
      paidDate: "2024-01-10",
    },
    {
      id: 2,
      invoiceNo: "INV-2024-002",
      studentName: "ফাতিমা খাতুন",
      class: "6B",
      roll: "05",
      amount: 2500,
      issueDate: "2024-01-01",
      dueDate: "2024-01-15",
      status: "Overdue",
      paidDate: null,
    },
    {
      id: 3,
      invoiceNo: "INV-2024-003",
      studentName: "রহিম উদ্দিন",
      class: "6C",
      roll: "12",
      amount: 2500,
      issueDate: "2024-01-01",
      dueDate: "2024-01-15",
      status: "Pending",
      paidDate: null,
    },
    {
      id: 4,
      invoiceNo: "INV-2024-004",
      studentName: "সালমা বেগম",
      class: "6A",
      roll: "08",
      amount: 2500,
      issueDate: "2024-01-01",
      dueDate: "2024-01-15",
      status: "Paid",
      paidDate: "2024-01-12",
    },
  ]

  const getStatusChip = (status: string) => {
    switch (status) {
      case "Paid":
        return <Chip label="পরিশোধিত" color="success" size="small" />
      case "Pending":
        return <Chip label="অপেক্ষমাণ" color="warning" size="small" />
      case "Overdue":
        return <Chip label="বিলম্বিত" color="error" size="small" />
      case "Draft":
        return <Chip label="খসড়া" color="default" size="small" />
      default:
        return <Chip label={status} color="default" size="small" />
    }
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Invoice Generator
          </Typography>
          <Typography variant="body1" color="text.secondary">
            চালান তৈরি - ছাত্রদের বেতনের চালান তৈরি ও ব্যবস্থাপনা
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<Download />} size="large">
            Bulk Generate
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)} size="large">
            Generate Invoice
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "primary.light", mx: "auto", mb: 2 }}>
                <Description />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="primary.main">
                90
              </Typography>
              <Typography variant="body2" color="text.secondary">
                এই মাসের মোট চালান
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "success.light", mx: "auto", mb: 2 }}>
                <Description />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="success.main">
                76
              </Typography>
              <Typography variant="body2" color="text.secondary">
                পরিশোধিত চালান
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
                8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                অপেক্ষমাণ চালান
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "error.light", mx: "auto", mb: 2 }}>
                <Description />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="error.main">
                6
              </Typography>
              <Typography variant="body2" color="text.secondary">
                বিলম্বিত চালান
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Invoice Management */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Invoice Management
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            চালান ব্যবস্থাপনা - সকল চালানের তালিকা ও নিয়ন্ত্রণ
          </Typography>

          {/* Filters */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="চালান নম্বর বা ছাত্রের নাম..."
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
                <InputLabel>Class</InputLabel>
                <Select value={classFilter} label="Class" onChange={(e) => setClassFilter(e.target.value)}>
                  <MenuItem value="all">All Classes</MenuItem>
                  <MenuItem value="6a">Class 6A</MenuItem>
                  <MenuItem value="6b">Class 6B</MenuItem>
                  <MenuItem value="6c">Class 6C</MenuItem>
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
                  <MenuItem value="draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant="outlined" fullWidth startIcon={<Download />} sx={{ height: "56px" }}>
                Export
              </Button>
            </Grid>
          </Grid>

          {/* Invoice Table */}
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Invoice No.</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Student Info (ছাত্রের তথ্য)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount (পরিমাণ)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Issue Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                        {invoice.invoiceNo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {invoice.studentName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Class {invoice.class} - Roll {invoice.roll}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" fontWeight={700}>
                        ৳ {invoice.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>{invoice.issueDate}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>{getStatusChip(invoice.status)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <IconButton size="small" color="primary">
                          <Visibility />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <Print />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <Send />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <Download />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Bulk Actions */}
          <Card sx={{ mt: 3, bgcolor: "grey.50" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Bulk Actions (একসাথে কাজ)
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button variant="outlined" startIcon={<Description />}>
                  Generate Monthly Invoices
                </Button>
                <Button variant="outlined" startIcon={<Email />}>
                  Send Reminders
                </Button>
                <Button variant="outlined" startIcon={<Download />}>
                  Export All
                </Button>
              </Box>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Generate Invoice Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Generate New Invoice</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select label="Class">
                    <MenuItem value="6a">Class 6A</MenuItem>
                    <MenuItem value="6b">Class 6B</MenuItem>
                    <MenuItem value="6c">Class 6C</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Student</InputLabel>
                  <Select label="Student">
                    <MenuItem value="student1">আহমেদ হাসান</MenuItem>
                    <MenuItem value="student2">ফাতিমা খাতুন</MenuItem>
                    <MenuItem value="student3">রহিম উদ্দিন</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Month</InputLabel>
                  <Select label="Month">
                    <MenuItem value="january">January 2024</MenuItem>
                    <MenuItem value="february">February 2024</MenuItem>
                    <MenuItem value="march">March 2024</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth type="number" label="Amount (৳)" defaultValue="2500" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth type="date" label="Issue Date" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth type="date" label="Due Date" InputLabelProps={{ shrink: true }} />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Save as Draft
          </Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Generate Invoice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
