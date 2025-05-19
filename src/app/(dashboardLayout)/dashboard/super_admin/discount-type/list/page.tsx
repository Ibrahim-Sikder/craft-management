/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import {
  Add as AddIcon,
  ArrowUpward as ArrowUpwardIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
  FilterList as FilterListIcon,
  GetApp as GetAppIcon,
  MoreVert as MoreVertIcon,
  PauseCircleOutline as PauseIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  Timeline as TimelineIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material"
import { ThemeProvider, createTheme, alpha } from "@mui/material/styles"

// Create a custom theme with primary color as rose/pink
const theme = createTheme({
  palette: {
    primary: {
      main: "#e91e63",
      light: "#f48fb1",
      dark: "#c2185b",
      contrastText: "#fff",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
      contrastText: "#fff",
    },
    background: {
      default: "#f8f9fa",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: "#f5f5f5",
        },
      },
    },
  },
})

// Sample data for discounts
const discounts = [
  {
    id: 1,
    name: "Merit Scholarship",
    type: "academic",
    amount: "25%",
    isPercent: true,
    status: "active",
    beneficiaries: 45,
    totalSavings: 12500,
    createdAt: "2023-09-15",
    validUntil: "2024-06-30",
  },
  {
    id: 2,
    name: "Early Payment Discount",
    type: "early",
    amount: "150",
    isPercent: false,
    status: "active",
    beneficiaries: 78,
    totalSavings: 11700,
    createdAt: "2023-08-01",
    validUntil: "2024-05-15",
  },
  {
    id: 3,
    name: "Sibling Discount",
    type: "sibling",
    amount: "10",
    isPercent: true,
    status: "active",
    beneficiaries: 32,
    totalSavings: 6400,
    createdAt: "2023-07-20",
    validUntil: "2024-07-31",
  },
  {
    id: 4,
    name: "Financial Aid Program",
    type: "financial",
    amount: "Variable",
    isPercent: false,
    status: "active",
    beneficiaries: 56,
    totalSavings: 28000,
    createdAt: "2023-06-10",
    validUntil: "2024-06-30",
  },
  {
    id: 5,
    name: "Sports Excellence Scholarship",
    type: "academic",
    amount: "50",
    isPercent: true,
    status: "active",
    beneficiaries: 12,
    totalSavings: 18000,
    createdAt: "2023-08-15",
    validUntil: "2024-08-31",
  },
  {
    id: 6,
    name: "Summer Program Discount",
    type: "special",
    amount: "200",
    isPercent: false,
    status: "inactive",
    beneficiaries: 0,
    totalSavings: 0,
    createdAt: "2023-10-01",
    validUntil: "2024-04-30",
  },
  {
    id: 7,
    name: "Alumni Children Discount",
    type: "special",
    amount: "15",
    isPercent: true,
    status: "active",
    beneficiaries: 18,
    totalSavings: 5400,
    createdAt: "2023-09-05",
    validUntil: "2024-08-31",
  },
  {
    id: 8,
    name: "International Student Scholarship",
    type: "academic",
    amount: "30",
    isPercent: true,
    status: "active",
    beneficiaries: 8,
    totalSavings: 9600,
    createdAt: "2023-07-15",
    validUntil: "2024-07-31",
  },
  {
    id: 9,
    name: "Community Service Discount",
    type: "special",
    amount: "10",
    isPercent: true,
    status: "inactive",
    beneficiaries: 0,
    totalSavings: 0,
    createdAt: "2023-11-10",
    validUntil: "2024-05-31",
  },
  {
    id: 10,
    name: "Loyalty Discount (5+ Years)",
    type: "special",
    amount: "5",
    isPercent: true,
    status: "active",
    beneficiaries: 65,
    totalSavings: 3250,
    createdAt: "2023-08-20",
    validUntil: "2024-08-31",
  },
]

// Get discount type color
const getTypeColor = (type: string) => {
  switch (type) {
    case "academic":
      return "primary"
    case "financial":
      return "secondary"
    case "sibling":
      return "info"
    case "early":
      return "success"
    case "special":
      return "warning"
    default:
      return "default"
  }
}

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function DiscountListPage() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [orderBy, setOrderBy] = useState("name")
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget)
    setSelectedDiscount(id)
  }

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedDiscount(null)
  }

  // Handle delete dialog
  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true)
    handleMenuClose()
  }

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false)
  }

  // Handle sort request
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // Filter discounts based on search term and filters
  const filteredDiscounts = discounts.filter((discount) => {
    const matchesSearch = discount.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || discount.status === statusFilter
    const matchesType = typeFilter === "all" || discount.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  // Sort discounts
  const sortedDiscounts = [...filteredDiscounts].sort((a, b) => {
    const aValue = a[orderBy as keyof typeof a]
    const bValue = b[orderBy as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  // Calculate total stats
  const totalActive = discounts.filter((d) => d.status === "active").length
  const totalBeneficiaries = discounts.reduce((sum, d) => sum + d.beneficiaries, 0)
  const totalSavings = discounts.reduce((sum, d) => sum + d.totalSavings, 0)

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: 4,
          background: "linear-gradient(to bottom, #fce4ec, #ffffff)",
        }}
      >
        <Container maxWidth="xl" sx={{p:{xs:"4px"}}}>
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" color="text.primary" gutterBottom>
                  Discount Programs
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage all discount and scholarship programs in one place
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" startIcon={<GetAppIcon />}>
                    Export
                  </Button>
                  <Button variant="contained" startIcon={<AddIcon />} href="/discount">
                    Add New Discount
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} lg={9}>
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TimelineIcon sx={{ mr: 1 }} />
                      <Typography variant="h6">All Discount Programs</Typography>
                    </Box>
                  }
                  action={
                    <Button startIcon={<RefreshIcon />} size="small">
                      Refresh
                    </Button>
                  }
                />
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        placeholder="Search discounts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="status-filter-label">Status</InputLabel>
                        <Select
                          labelId="status-filter-label"
                          id="status-filter"
                          value={statusFilter}
                          label="Status"
                          onChange={(e) => setStatusFilter(e.target.value)}
                          startAdornment={
                            <InputAdornment position="start">
                              <FilterListIcon fontSize="small" />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="all">All Statuses</MenuItem>
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="type-filter-label">Type</InputLabel>
                        <Select
                          labelId="type-filter-label"
                          id="type-filter"
                          value={typeFilter}
                          label="Type"
                          onChange={(e) => setTypeFilter(e.target.value)}
                          startAdornment={
                            <InputAdornment position="start">
                              <SortIcon fontSize="small" />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="all">All Types</MenuItem>
                          <MenuItem value="academic">Academic</MenuItem>
                          <MenuItem value="financial">Financial</MenuItem>
                          <MenuItem value="sibling">Sibling</MenuItem>
                          <MenuItem value="early">Early Payment</MenuItem>
                          <MenuItem value="special">Special</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Tooltip title="Reset Filters">
                        <IconButton
                          onClick={() => {
                            setSearchTerm("")
                            setStatusFilter("all")
                            setTypeFilter("all")
                          }}
                        >
                          <RefreshIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Box>

                <TableContainer component={Paper} elevation={0}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "name"}
                            direction={orderBy === "name" ? order : "asc"}
                            onClick={() => handleRequestSort("name")}
                          >
                            Discount Name
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "type"}
                            direction={orderBy === "type" ? order : "asc"}
                            onClick={() => handleRequestSort("type")}
                          >
                            Type
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "amount"}
                            direction={orderBy === "amount" ? order : "asc"}
                            onClick={() => handleRequestSort("amount")}
                          >
                            Amount
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "status"}
                            direction={orderBy === "status" ? order : "asc"}
                            onClick={() => handleRequestSort("status")}
                          >
                            Status
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "beneficiaries"}
                            direction={orderBy === "beneficiaries" ? order : "asc"}
                            onClick={() => handleRequestSort("beneficiaries")}
                          >
                            Beneficiaries
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "validUntil"}
                            direction={orderBy === "validUntil" ? order : "asc"}
                            onClick={() => handleRequestSort("validUntil")}
                          >
                            Valid Until
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedDiscounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((discount) => (
                        <TableRow
                          key={discount.id}
                          sx={{
                            "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.04) },
                            transition: "background-color 0.2s",
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                sx={{
                                  width: 36,
                                  height: 36,
                                  mr: 2,
                                  bgcolor: alpha(theme.palette[getTypeColor(discount.type) as "primary"].main, 0.2),
                                  color: theme.palette[getTypeColor(discount.type) as "primary"].main,
                                }}
                              >
                                {discount.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2">{discount.name}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Created: {new Date(discount.createdAt).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={discount.type.charAt(0).toUpperCase() + discount.type.slice(1)}
                              size="small"
                              color={
                                getTypeColor(discount.type) as "primary" | "secondary" | "info" | "success" | "warning"
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {discount.isPercent
                                ? `${discount.amount}%`
                                : discount.amount === "Variable"
                                  ? "Variable"
                                  : `$${discount.amount}`}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={discount.status === "active" ? <CheckCircleIcon /> : <PauseIcon />}
                              label={discount.status === "active" ? "Active" : "Inactive"}
                              size="small"
                              color={discount.status === "active" ? "success" : "default"}
                              variant={discount.status === "active" ? "filled" : "outlined"}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography variant="body2" fontWeight={500} sx={{ mr: 1 }}>
                                {discount.beneficiaries}
                              </Typography>
                              {discount.beneficiaries > 0 && (
                                <LinearProgress
                                  variant="determinate"
                                  value={Math.min((discount.beneficiaries / 100) * 100, 100)}
                                  sx={{ width: 60, height: 6, borderRadius: 3 }}
                                  color={
                                    getTypeColor(discount.type) as
                                      | "primary"
                                      | "secondary"
                                      | "info"
                                      | "success"
                                      | "warning"
                                  }
                                />
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color={
                                new Date(discount.validUntil) < new Date()
                                  ? "error.main"
                                  : new Date(discount.validUntil) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                                    ? "warning.main"
                                    : "text.primary"
                              }
                            >
                              {new Date(discount.validUntil).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="View Details">
                              <IconButton size="small" sx={{ mr: 0.5 }}>
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton size="small" color="primary" sx={{ mr: 0.5 }}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <IconButton
                              size="small"
                              onClick={(event) => handleMenuOpen(event, discount.id)}
                              aria-label="more options"
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredDiscounts.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                            <Typography variant="subtitle1" color="text.secondary">
                              No discounts found matching your filters
                            </Typography>
                            <Button
                              variant="text"
                              startIcon={<RefreshIcon />}
                              onClick={() => {
                                setSearchTerm("")
                                setStatusFilter("all")
                                setTypeFilter("all")
                              }}
                              sx={{ mt: 1 }}
                            >
                              Reset Filters
                            </Button>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredDiscounts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
            </Grid>

            <Grid item xs={12} lg={3}>
              <Stack spacing={3}>
                <Card>
                  <CardHeader
                    title="Discount Summary"
                    subheader="Overview of all discount programs"
                    sx={{ bgcolor: "grey.100" }}
                  />
                  <CardContent>
                    <Stack spacing={3}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="subtitle2" color="primary.main" gutterBottom>
                          Total Programs
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>
                          {discounts.length}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <ArrowUpwardIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
                          <Typography variant="caption" color="success.main">
                            +2 this month
                          </Typography>
                        </Box>
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.success.main, 0.1),
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="subtitle2" color="success.main" gutterBottom>
                          Active Programs
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>
                          {totalActive}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {Math.round((totalActive / discounts.length) * 100)}% of total
                          </Typography>
                        </Box>
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.info.main, 0.1),
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="subtitle2" color="info.main" gutterBottom>
                          Total Beneficiaries
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>
                          {totalBeneficiaries}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <ArrowUpwardIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
                          <Typography variant="caption" color="success.main">
                            +18 this month
                          </Typography>
                        </Box>
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.warning.main, 0.1),
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="subtitle2" color="warning.main" gutterBottom>
                          Total Savings Provided
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>
                          {formatCurrency(totalSavings)}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Avg. {formatCurrency(Math.round(totalSavings / totalBeneficiaries))} per student
                          </Typography>
                        </Box>
                      </Paper>
                    </Stack>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    title="Discount Types"
                    subheader="Distribution by category"
                    sx={{ bgcolor: "grey.100" }}
                  />
                  <CardContent>
                    <Stack spacing={2}>
                      {[
                        { type: "academic", label: "Academic Merit", count: 3, color: "primary" },
                        { type: "financial", label: "Financial Aid", count: 1, color: "secondary" },
                        { type: "sibling", label: "Sibling Discount", count: 1, color: "info" },
                        { type: "early", label: "Early Payment", count: 1, color: "success" },
                        { type: "special", label: "Special Programs", count: 4, color: "warning" },
                      ].map((item) => (
                        <Box
                          key={item.type}
                          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                bgcolor: theme.palette[item.color as "primary"].main,
                                mr: 1.5,
                              }}
                            />
                            <Typography variant="body2">{item.label}</Typography>
                          </Box>
                          <Typography variant="body2" fontWeight={500}>
                            {item.count}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary="View Details" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary="Edit Discount" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary="Duplicate" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteDialogOpen} sx={{ color: "error.main" }}>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Discount</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this discount? This action cannot be undone and will remove all associated
            records.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteDialogClose} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}
