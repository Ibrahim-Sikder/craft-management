/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Paper,
  Menu,
  MenuItem,
  Pagination,
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
} from "@mui/icons-material"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import InvestmentForm from "./__components/InvestmentForm"
import Swal from "sweetalert2"
import { useDeleteInvestmentMutation, useGetAllInvestmentsQuery } from "@/redux/api/investmentApi"
import { formatCurrency } from "@/utils/formaters"
import { formatDate } from "@/utils/formateDate"

// Define types based on your backend response
interface Investment {
  _id: string
  investmentCategory: string
  investmentTo: string
  investmentType: string
  investorName: string
  investorContact: string
  incomingType: string
  returnPolicy: string
  investmentAmount: number
  investmentDate: string
  maturityDate: string
  returnRate: number
  status: string
  createdAt: string
  updatedAt: string
}

interface InvestmentApiResponse {
  data: {
    investments: Investment[]
    meta: {
      page: number
      limit: number
      total: number
      totalPage: number
    }
  }
  message: string
  success: boolean
}

const COLORS = ["#F59E0B", "#EC4899", "#8B5CF6", "#10B981", "#3B82F6"]

export default function FinanceDashboard() {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const { data: investmentResponse, isLoading, refetch } = useGetAllInvestmentsQuery({ page, limit })
  const [deleteInvestment] = useDeleteInvestmentMutation()
  const [investments, setInvestments] = useState<Investment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedItem, setSelectedItem] = useState<{ type: "investment"; id: string } | null>(null)
  const [investmentFormOpen, setInvestmentFormOpen] = useState(false)
  const [editingInvestmentId, setEditingInvestmentId] = useState<string | null>(null)

  // Map API response to state
  useEffect(() => {
    if (investmentResponse?.data?.investments) {
      setInvestments(investmentResponse.data.investments)
    }
  }, [investmentResponse])

  console.log('invest', investmentResponse)

  // Calculate metrics for investments
  const totalInvestmentValue = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0)
  const totalReturns = investments.reduce((sum, inv) => {
    const returns = (inv.investmentAmount * inv.returnRate) / 100
    return sum + returns
  }, 0)
  const avgROI = totalInvestmentValue > 0 ? (totalReturns / totalInvestmentValue) * 100 : 0
  const activeInvestments = investments.filter((inv) => inv.status === "active").length

  // Prepare chart data
  const investmentTypeDistribution = investments.reduce(
    (acc, inv) => {
      const type = inv.investmentCategory === "outgoing" ? inv.investmentType : inv.incomingType
      acc[type] = (acc[type] || 0) + inv.investmentAmount
      return acc
    },
    {} as Record<string, number>,
  )

  const investmentPieData = Object.entries(investmentTypeDistribution).map(([type, value]) => ({
    name: type,
    value,
  }))

  const investmentPerformanceData = investments.map((inv) => {
    const returns = (inv.investmentAmount * inv.returnRate) / 100
    return {
      name: (inv.investmentCategory === "outgoing" ? inv.investmentTo : inv.investorName)?.substring(0, 15) +
        ((inv.investmentCategory === "outgoing" ? inv.investmentTo : inv.investorName)?.length > 15 ? "..." : ""),
      principal: inv.investmentAmount,
      current: inv.investmentAmount + returns,
      returns: returns,
    }
  })

  // Filter investments
  const filteredInvestments = investments.filter((investment) => {
    const name = investment.investmentCategory === "outgoing"
      ? investment.investmentTo
      : investment.investorName
    const matchesSearch = name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investment.investmentType?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "ALL" || investment.status === statusFilter
    return matchesSearch && matchesStatus
  })


  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this investment?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })

      if (result.isConfirmed) {
        await deleteInvestment(id).unwrap()
        refetch()

        Swal.fire({
          title: "Deleted!",
          text: "Investment has been deleted successfully.",
          icon: "success"
        })
      }
    } catch (err: any) {
      Swal.fire({
        title: "Error!",
        text: err.data?.message || "Failed to delete investment",
        icon: "error"
      })
    }
  }

  // Handlers for investments
  const handleAddInvestment = () => {
    setEditingInvestmentId(null)
    setInvestmentFormOpen(true)
  }

  const handleEditInvestment = (id: string) => {
    setEditingInvestmentId(id)
    setInvestmentFormOpen(true)
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




  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "closed":
        return "info"
      case "withdrawn":
        return "default"
      default:
        return "default"
    }
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
                    {avgROI.toFixed(1)}%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Average ROI
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "rgarea(255,255,255,0.2)", width: 56, height: 56 }}>
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
                    {activeInvestments}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Active Investments
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                  <AccountBalanceIcon sx={{ fontSize: 28 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>



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

        </Grid>
      </Paper>
      {/* Investment Table */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#F9FAFB" }}>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Investment</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Return Rate</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Expected Returns</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Investment Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                      <LinearProgress />
                    </TableCell>
                  </TableRow>
                ) : filteredInvestments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                      <Typography variant="body2" sx={{ color: "#6B7280" }}>
                        No investments found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvestments.map((investment) => {
                    const returns = (investment.investmentAmount * investment.returnRate) / 100
                    const name = investment.investmentCategory === "outgoing"
                      ? investment.investmentTo
                      : investment.investorName

                    return (
                      <TableRow key={investment._id} sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "#1F2937" }}>
                              {name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#6B7280" }}>
                              {investment.investmentCategory}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={investment.investmentCategory === "outgoing"
                              ? investment.investmentType
                              : investment.incomingType}
                            size="small"
                            sx={{
                              bgcolor: "rgba(245, 158, 11, 0.1)",
                              color: "#D97706",
                              fontWeight: 500,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          {formatCurrency(investment.investmentAmount)}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          {investment.returnRate}%
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#059669" }}>
                          {formatCurrency(returns)}
                        </TableCell>
                        <TableCell>
                          {formatDate(investment.investmentDate)}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={investment.status.toUpperCase()}
                            size="small"
                            color={getStatusColor(investment.status) as any}
                            variant="filled"
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleEditInvestment(investment._id)}
                              sx={{ color: "#6B7280", "&:hover": { color: "#F59E0B" } }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(investment._id)}
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
      {investmentResponse?.data?.meta && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={investmentResponse.data.meta.totalPage}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}



      {/* Investment Form */}
      <InvestmentForm
        open={investmentFormOpen}
        onClose={() => setInvestmentFormOpen(false)}
        investmentId={editingInvestmentId || undefined}
      />
    </Box>
  )
}