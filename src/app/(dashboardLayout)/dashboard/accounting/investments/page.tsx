/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState } from "react"
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
  Paper,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalance as AccountBalanceIcon,
  AttachMoney as AttachMoneyIcon,
  Schedule as ScheduleIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterListIcon,
  GetApp as GetAppIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import InvestmentFormDialog from "./__components/InvestmentForm"

// Define types
type InvestmentStatus = "ACTIVE" | "MATURED" | "CLOSED"

interface Investment {
  id: string
  name: string
  type: string
  principalAmount: number
  currentValue: number
  maturityDate?: Date
  interestRate?: number
  status: InvestmentStatus
  createdAt: Date
}

// Sample data
const initialInvestments: Investment[] = [
  {
    id: "1",
    name: "Tech Growth Fund",
    type: "Mutual Fund",
    principalAmount: 500000,
    currentValue: 650000,
    maturityDate: new Date(2025, 11, 15),
    interestRate: 12.5,
    status: "ACTIVE",
    createdAt: new Date(2023, 0, 15),
  },
  {
    id: "2",
    name: "Government Bonds",
    type: "Government Bond",
    principalAmount: 300000,
    currentValue: 315000,
    maturityDate: new Date(2024, 5, 20),
    interestRate: 5.0,
    status: "ACTIVE",
    createdAt: new Date(2022, 8, 10),
  },
  {
    id: "3",
    name: "Real Estate Investment",
    type: "Real Estate",
    principalAmount: 1000000,
    currentValue: 1250000,
    maturityDate: new Date(2030, 2, 10),
    interestRate: 8.2,
    status: "ACTIVE",
    createdAt: new Date(2021, 3, 22),
  },
  {
    id: "4",
    name: "Fixed Deposit",
    type: "Fixed Deposit",
    principalAmount: 200000,
    currentValue: 212000,
    maturityDate: new Date(2023, 11, 5),
    interestRate: 6.0,
    status: "MATURED",
    createdAt: new Date(2022, 11, 5),
  },
]

const COLORS = ["#F59E0B", "#EC4899", "#8B5CF6", "#10B981", "#3B82F6"]

export default function FinanceDashboard() {
  const [investments, setInvestments] = useState<Investment[]>(initialInvestments)
  const [investmentFormOpen, setInvestmentFormOpen] = useState(false)
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedItem, setSelectedItem] = useState<{ type: "investment"; id: string } | null>(null)

  // Calculate metrics for investments
  const totalInvestmentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalPrincipal = investments.reduce((sum, inv) => sum + inv.principalAmount, 0)
  const totalReturns = totalInvestmentValue - totalPrincipal
  const avgROI = totalPrincipal > 0 ? (totalReturns / totalPrincipal) * 100 : 0
  const activeInvestments = investments.filter((inv) => inv.status === "ACTIVE").length

  // Prepare chart data
  const investmentTypeDistribution = investments.reduce(
    (acc, inv) => {
      acc[inv.type] = (acc[inv.type] || 0) + inv.currentValue
      return acc
    },
    {} as Record<string, number>,
  )

  const investmentPieData = Object.entries(investmentTypeDistribution).map(([type, value]) => ({
    name: type,
    value,
  }))

  const investmentPerformanceData = investments.map((inv) => ({
    name: inv.name.substring(0, 15) + (inv.name.length > 15 ? "..." : ""),
    principal: inv.principalAmount,
    current: inv.currentValue,
    returns: inv.currentValue - inv.principalAmount,
  }))

  // Filter investments
  const filteredInvestments = investments.filter((investment) => {
    const matchesSearch =
      investment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investment.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "ALL" || investment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Handlers for investments
  const handleAddInvestment = () => {
    setEditingInvestment(null)
    setInvestmentFormOpen(true)
  }

  const handleEditInvestment = (investment: Investment) => {
    setEditingInvestment(investment)
    setInvestmentFormOpen(true)
  }

  const handleDeleteInvestment = (id: string) => {
    setInvestments(investments.filter((investment) => investment.id !== id))
  }

  const handleSaveInvestment = (investmentData: Omit<Investment, "id" | "createdAt">) => {
    if (editingInvestment) {
      // Update existing investment
      setInvestments(
        investments.map((investment) =>
          investment.id === editingInvestment.id
            ? { ...investmentData, id: editingInvestment.id, createdAt: editingInvestment.createdAt }
            : investment
        )
      )
    } else {
      // Add new investment
      const newInvestment = {
        ...investmentData,
        id: Math.max(...investments.map((i) => parseInt(i.id))) + 1 + "",
        createdAt: new Date(),
      }
      setInvestments([...investments, newInvestment as Investment])
    }
    setInvestmentFormOpen(false)
  }

  // Context menu handlers
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, type: "investment", id: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedItem({ type, id })
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedItem(null)
  }

  const handleContextEdit = () => {
    if (selectedItem) {
      const investment = investments.find((i) => i.id === selectedItem.id)
      if (investment) handleEditInvestment(investment)
    }
    handleMenuClose()
  }

  const handleContextDelete = () => {
    if (selectedItem) {
      handleDeleteInvestment(selectedItem.id)
    }
    handleMenuClose()
  }

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "success"
      case "MATURED":
        return "info"
      case "CLOSED":
        return "default"
      default:
        return "default"
    }
  }

  const getROIColor = (roi: number) => {
    if (roi > 10) return "#10B981"
    if (roi > 5) return "#F59E0B"
    return "#EF4444"
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date))
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "#F9FAFB", minHeight: "100vh", width: '100%' }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontFamily: "Playfair Display", fontWeight: 700, color: "#1F2937", mb: 1 }}>
            Investment Portfolio
          </Typography>
          <Typography variant="body1" sx={{ color: "#6B7280" }}>
            Track and manage your investments
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<TrendingUpIcon />}
            onClick={handleAddInvestment}
            sx={{
              bgcolor: "#F59E0B",
              "&:hover": { bgcolor: "#D97706" },
            }}
          >
            New Investment
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
              color: "white",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(245, 158, 11, 0.3)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {formatCurrency(totalInvestmentValue)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Value
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                  <AttachMoneyIcon sx={{ fontSize: 28 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

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
                    {formatCurrency(totalPrincipal)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Principal
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
              background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
              color: "white",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {formatCurrency(totalReturns)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Returns
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
              background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
              color: "white",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(139, 92, 246, 0.3)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {avgROI.toFixed(1)}%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Average ROI
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                  <TrendingUpIcon sx={{ fontSize: 28 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", mb: 3, p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search investments..."
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
                  "&:hover fieldset": { borderColor: "#F59E0B" },
                  "&.Mui-focused fieldset": { borderColor: "#F59E0B" },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button startIcon={<FilterListIcon />} variant="outlined" size="small">
                Filter
              </Button>
              <Button startIcon={<GetAppIcon />} variant="outlined" size="small">
                Export
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Investment Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#1F2937" }}>
                Investment Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={investmentPieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {investmentPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [formatCurrency(value), "Value"]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#1F2937" }}>
                Performance Comparison
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={investmentPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => [formatCurrency(value), ""]} />
                  <Bar dataKey="principal" fill="#9CA3AF" name="Principal" />
                  <Bar dataKey="current" fill="#F59E0B" name="Current Value" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Investment Table */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#F9FAFB" }}>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Investment</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Principal</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Current Value</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Returns</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>ROI</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvestments.map((investment) => {
                  const returns = investment.currentValue - investment.principalAmount
                  const roi = (returns / investment.principalAmount) * 100

                  return (
                    <TableRow key={investment.id} sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#1F2937" }}>
                            {investment.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#6B7280" }}>
                            {investment.maturityDate
                              ? `Matures: ${formatDate(investment.maturityDate)}`
                              : "No maturity date"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={investment.type}
                          size="small"
                          sx={{
                            bgcolor: "rgba(245, 158, 11, 0.1)",
                            color: "#D97706",
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {formatCurrency(investment.principalAmount)}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#059669" }}>
                        {formatCurrency(investment.currentValue)}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: returns >= 0 ? "#059669" : "#DC2626",
                          }}
                        >
                          {returns >= 0 ? "+" : ""}
                          {formatCurrency(returns)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: getROIColor(roi),
                            }}
                          >
                            {roi.toFixed(1)}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min(roi, 20) * 5}
                            sx={{
                              width: 40,
                              height: 4,
                              borderRadius: 2,
                              bgcolor: "#E5E7EB",
                              "& .MuiLinearProgress-bar": {
                                bgcolor: getROIColor(roi),
                              },
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={investment.status}
                          size="small"
                          color={getStatusColor(investment.status) as any}
                          variant="filled"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleEditInvestment(investment)}
                            sx={{ color: "#6B7280", "&:hover": { color: "#F59E0B" } }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuClick(e, "investment", investment.id)}
                            sx={{ color: "#6B7280", "&:hover": { color: "#DC2626" } }}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Context Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleContextEdit}>
          <EditIcon sx={{ mr: 1 }} fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleContextDelete} sx={{ color: "#DC2626" }}>
          <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
          Delete
        </MenuItem>
      </Menu>
      <InvestmentFormDialog
        open={investmentFormOpen}
        onClose={() => setInvestmentFormOpen(false)}
        editingInvestment={editingInvestment}
        setEditingInvestment={setEditingInvestment}
        handleSaveInvestment={handleSaveInvestment}
        formatCurrency={formatCurrency}
      />

    </Box>
  )
}