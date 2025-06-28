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
  TrendingUp,
  School,
  CardGiftcard,
  Event,
  Edit,
  Visibility,
  Close,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { GlassCard, GradientCard, StyledDialog } from "@/style/customeStyle"
import AddIncomeDialog from "../_components/AddIncomeDialog"



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

  ]

  const incomeCategories = [
    { name: "Tuition Fees", total: 190000, percentage: 68.8, color: "#2196F3" },
    { name: "Government Grant", total: 50000, percentage: 18.1, color: "#4CAF50" },
    { name: "Donations", total: 15000, percentage: 5.4, color: "#9c27b0" },
    { name: "Admission Fees", total: 12500, percentage: 4.5, color: "#ff9800" },
    { name: "Events", total: 8000, percentage: 2.9, color: "#e91e63" },
  ]

  const getStatusChip = (status: string) => {
    switch (status) {
      case "Received":
        return (
          <Chip
            label="প্রাপ্ত"
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
                background: "linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Income Management
            </Typography>
            <Typography variant="h6" sx={{ color: "#666", fontWeight: 500 }}>
              আয় ব্যবস্থাপনা - স্কুলের সকল আয়ের উৎস ও ট্র্যাকিং
            </Typography>
          </Box>
          <Fab
            variant="extended"
            onClick={() => setOpen(true)}
            sx={{
              background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
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
            Add Income
          </Fab>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <GradientCard bgcolor="linear-gradient(135deg, #4CAF50 0%, #45a049 100%)">
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      এই মাসের মোট আয়
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      ৳ 2,75,500
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <TrendingUp sx={{ fontSize: 30 }} />
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
                      ছাত্র বেতন আয়
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      ৳ 1,90,000
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <School sx={{ fontSize: 30 }} />
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
                      অন্যান্য উৎস
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      ৳ 85,500
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <CardGiftcard sx={{ fontSize: 30 }} />
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
                      অপেক্ষমাণ আয়
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      ৳ 15,000
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <Event sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </GradientCard>
          </Grid>
        </Grid>

        {/* Income Categories */}
        <GlassCard sx={{ mb: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Income by Category
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
              ক্যাটেগরি অনুযায়ী আয়ের বিভাজন
            </Typography>
            <Grid container spacing={3}>
              {incomeCategories.map((category, index) => (
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
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                      ৳ {category.total.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#666" }}>
                      {category.percentage}%
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </GlassCard>

        {/* Income Records */}
        <GlassCard>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Income Records
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
              আয়ের বিস্তারিত রেকর্ড
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
                  <Select
                    value={statusFilter}
                    label="Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{ borderRadius: "15px" }}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="received">Received</MenuItem>
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

            {/* Income Table */}
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
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Amount (পরিমাণ)</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Date (তারিখ)</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomeRecords.map((income) => (
                    <TableRow
                      key={income.id}
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
                            <income.icon />
                          </Avatar>
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {income.description}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#666" }}>
                              {income.source}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "#4CAF50" }}>
                          ৳ {income.amount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={income.category}
                          variant="outlined"
                          sx={{
                            borderRadius: "20px",
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell>{income.date}</TableCell>
                      <TableCell>{getStatusChip(income.status)}</TableCell>
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

            <AddIncomeDialog open={open} onClose={() => setOpen(false)} />
      </Box>
    </Container>
  )
}
