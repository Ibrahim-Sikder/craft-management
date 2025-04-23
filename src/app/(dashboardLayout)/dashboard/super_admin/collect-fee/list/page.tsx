/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useMemo, useCallback } from "react"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
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
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
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
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  AccountBalance as BankIcon,
  Add as AddIcon,
  ArrowDownward as DownloadIcon,
  AttachMoney as MoneyIcon,
  CalendarMonth as CalendarIcon,
  CalendarToday as DateIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  CloudDownload as ExportIcon,
  CreditCard as CardIcon,
  Dashboard as DashboardIcon,
  Delete as DeleteIcon,
  Description as ReceiptIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  GridView as GridViewIcon,
  History as HistoryIcon,
  LocalPrintshop as PrintIcon,
  MoreVert as MoreVertIcon,
  Paid as PaidIcon,
  Payment as PaymentIcon,
  PictureAsPdf as PdfIcon,
  Print as PrinterIcon,
  Refresh as RefreshIcon,
  School as SchoolIcon,
  Search as SearchIcon,
  Send as SendIcon,
  Share as ShareIcon,
  TableChart as TableViewIcon,
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material"
import { ThemeProvider, createTheme, alpha } from "@mui/material/styles"
// Remove these imports
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"

// Create a custom theme with primary color as purple/indigo
const theme = createTheme({
  palette: {
    primary: {
      main: "#5e35b1",
      light: "#9162e4",
      dark: "#280680",
      contrastText: "#fff",
    },
    secondary: {
      main: "#00bcd4",
      light: "#62efff",
      dark: "#008ba3",
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
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
})

// Sample data for fee collections
const feeCollections = [
  {
    id: "FCR-2024-001",
    studentId: "ST-2024-001",
    studentName: "Ahmed Ali",
    className: "Class 10",
    section: "A",
    amount: 15000,
    paymentDate: "2024-04-01",
    paymentMethod: "Cash",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Completed",
    collectedBy: "John Doe",
    receiptNumber: "REC-2024-001",
    discount: 0,
    lateCharge: 0,
    previousDue: 0,
    totalPaid: 15000,
    remainingBalance: 0,
    notes: "",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "FCR-2024-002",
    studentId: "ST-2024-002",
    studentName: "Fatima Khan",
    className: "Class 8",
    section: "B",
    amount: 12000,
    paymentDate: "2024-04-02",
    paymentMethod: "Bank Transfer",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Completed",
    collectedBy: "Sarah Johnson",
    receiptNumber: "REC-2024-002",
    discount: 1200,
    lateCharge: 0,
    previousDue: 0,
    totalPaid: 10800,
    remainingBalance: 0,
    notes: "Scholarship discount applied",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "FCR-2024-003",
    studentId: "ST-2024-003",
    studentName: "Muhammad Hassan",
    className: "Class 9",
    section: "A",
    amount: 13500,
    paymentDate: "2024-04-03",
    paymentMethod: "Credit Card",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Completed",
    collectedBy: "John Doe",
    receiptNumber: "REC-2024-003",
    discount: 0,
    lateCharge: 500,
    previousDue: 1000,
    totalPaid: 15000,
    remainingBalance: 0,
    notes: "Late fee applied",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "FCR-2024-004",
    studentId: "ST-2024-004",
    studentName: "Aisha Malik",
    className: "Class 7",
    section: "C",
    amount: 11000,
    paymentDate: "2024-04-05",
    paymentMethod: "Cash",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Completed",
    collectedBy: "Sarah Johnson",
    receiptNumber: "REC-2024-004",
    discount: 0,
    lateCharge: 0,
    previousDue: 0,
    totalPaid: 11000,
    remainingBalance: 0,
    notes: "",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "FCR-2024-005",
    studentId: "ST-2024-005",
    studentName: "Omar Farooq",
    className: "Class 11",
    section: "A",
    amount: 18000,
    paymentDate: "2024-04-05",
    paymentMethod: "Mobile Payment",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Completed",
    collectedBy: "John Doe",
    receiptNumber: "REC-2024-005",
    discount: 1800,
    lateCharge: 0,
    previousDue: 0,
    totalPaid: 16200,
    remainingBalance: 0,
    notes: "Sibling discount applied",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "FCR-2024-006",
    studentId: "ST-2024-006",
    studentName: "Zainab Ahmed",
    className: "Class 6",
    section: "B",
    amount: 10000,
    paymentDate: "2024-04-06",
    paymentMethod: "Cheque",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Pending",
    collectedBy: "Sarah Johnson",
    receiptNumber: "REC-2024-006",
    discount: 0,
    lateCharge: 0,
    previousDue: 0,
    totalPaid: 10000,
    remainingBalance: 0,
    notes: "Cheque clearance pending",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "FCR-2024-007",
    studentId: "ST-2024-007",
    studentName: "Ibrahim Khan",
    className: "Class 12",
    section: "A",
    amount: 20000,
    paymentDate: "2024-04-07",
    paymentMethod: "Bank Transfer",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Completed",
    collectedBy: "John Doe",
    receiptNumber: "REC-2024-007",
    discount: 0,
    lateCharge: 0,
    previousDue: 0,
    totalPaid: 20000,
    remainingBalance: 0,
    notes: "",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "FCR-2024-008",
    studentId: "ST-2024-008",
    studentName: "Amina Siddiqui",
    className: "Class 5",
    section: "A",
    amount: 9000,
    paymentDate: "2024-04-08",
    paymentMethod: "Cash",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Completed",
    collectedBy: "Sarah Johnson",
    receiptNumber: "REC-2024-008",
    discount: 900,
    lateCharge: 0,
    previousDue: 0,
    totalPaid: 8100,
    remainingBalance: 0,
    notes: "Merit scholarship discount",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "FCR-2024-009",
    studentId: "ST-2024-009",
    studentName: "Yusuf Rahman",
    className: "Class 4",
    section: "B",
    amount: 8500,
    paymentDate: "2024-04-09",
    paymentMethod: "Mobile Payment",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Completed",
    collectedBy: "John Doe",
    receiptNumber: "REC-2024-009",
    discount: 0,
    lateCharge: 0,
    previousDue: 0,
    totalPaid: 8500,
    remainingBalance: 0,
    notes: "",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "FCR-2024-010",
    studentId: "ST-2024-010",
    studentName: "Hana Qureshi",
    className: "Class 3",
    section: "C",
    amount: 8000,
    paymentDate: "2024-04-10",
    paymentMethod: "Credit Card",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Failed",
    collectedBy: "Sarah Johnson",
    receiptNumber: "REC-2024-010",
    discount: 0,
    lateCharge: 0,
    previousDue: 0,
    totalPaid: 0,
    remainingBalance: 8000,
    notes: "Payment failed - card declined",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "FCR-2024-011",
    studentId: "ST-2024-011",
    studentName: "Ali Hassan",
    className: "Class 2",
    section: "A",
    amount: 7500,
    paymentDate: "2024-04-10",
    paymentMethod: "Cash",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Completed",
    collectedBy: "John Doe",
    receiptNumber: "REC-2024-011",
    discount: 0,
    lateCharge: 0,
    previousDue: 0,
    totalPaid: 7500,
    remainingBalance: 0,
    notes: "",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "FCR-2024-012",
    studentId: "ST-2024-012",
    studentName: "Sana Mahmood",
    className: "Class 1",
    section: "B",
    amount: 7000,
    paymentDate: "2024-04-11",
    paymentMethod: "Bank Transfer",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Completed",
    collectedBy: "Sarah Johnson",
    receiptNumber: "REC-2024-012",
    discount: 700,
    lateCharge: 0,
    previousDue: 0,
    totalPaid: 6300,
    remainingBalance: 0,
    notes: "Staff child discount",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "FCR-2024-013",
    studentId: "ST-2024-013",
    studentName: "Bilal Ahmed",
    className: "KG",
    section: "A",
    amount: 6500,
    paymentDate: "2024-04-12",
    paymentMethod: "Cash",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Partial",
    collectedBy: "John Doe",
    receiptNumber: "REC-2024-013",
    discount: 0,
    lateCharge: 0,
    previousDue: 0,
    totalPaid: 3000,
    remainingBalance: 3500,
    notes: "Partial payment - remaining due by 15th",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "FCR-2024-014",
    studentId: "ST-2024-014",
    studentName: "Mariam Khalid",
    className: "Nursery",
    section: "A",
    amount: 6000,
    paymentDate: "2024-04-12",
    paymentMethod: "Mobile Payment",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Completed",
    collectedBy: "Sarah Johnson",
    receiptNumber: "REC-2024-014",
    discount: 0,
    lateCharge: 0,
    previousDue: 0,
    totalPaid: 6000,
    remainingBalance: 0,
    notes: "",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "FCR-2024-015",
    studentId: "ST-2024-015",
    studentName: "Hamza Malik",
    className: "Class 10",
    section: "B",
    amount: 15000,
    paymentDate: "2024-04-13",
    paymentMethod: "Cheque",
    feeType: "Tuition Fee",
    feePeriod: "April 2024",
    status: "Pending",
    collectedBy: "John Doe",
    receiptNumber: "REC-2024-015",
    discount: 0,
    lateCharge: 750,
    previousDue: 0,
    totalPaid: 15750,
    remainingBalance: 0,
    notes: "Late fee applied, cheque clearance pending",
    studentPhoto: "/placeholder.svg?height=40&width=40",
  },
]

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Interface for tab panel props
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

// Tab Panel component
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`fee-collection-tabpanel-${index}`}
      aria-labelledby={`fee-collection-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

// Get status color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "success"
    case "pending":
      return "warning"
    case "failed":
      return "error"
    case "partial":
      return "info"
    default:
      return "default"
  }
}

// Get payment method icon
const getPaymentMethodIcon = (method: string) => {
  switch (method.toLowerCase()) {
    case "cash":
      return <MoneyIcon fontSize="small" />
    case "bank transfer":
      return <BankIcon fontSize="small" />
    case "credit card":
      return <CardIcon fontSize="small" />
    case "mobile payment":
      return <PaymentIcon fontSize="small" />
    case "cheque":
      return <ReceiptIcon fontSize="small" />
    default:
      return <PaymentIcon fontSize="small" />
  }
}

export default function FeeCollectionListPage() {
  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"))
  const [tabValue, setTabValue] = useState(0)
  const [viewMode, setViewMode] = useState<"table" | "card" | "calendar">("table")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
  const [dateRange, setDateRange] = useState<{
    startDate: string | null
    endDate: string | null
  }>({
    startDate: "",
    endDate: "",
  })
  const [orderBy, setOrderBy] = useState("paymentDate")
  const [order, setOrder] = useState<"asc" | "desc">("desc")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [openReceiptDialog, setOpenReceiptDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null)
  const [openShareDialog, setOpenShareDialog] = useState(false)
  const [openFilterDialog, setOpenFilterDialog] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [openBulkActionMenu, setOpenBulkActionMenu] = useState<null | HTMLElement>(null)

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Handle view mode change
  const handleViewModeChange = (mode: "table" | "card" | "calendar") => {
    setViewMode(mode)
  }

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedCollection(id)
  }

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedCollection(null)
  }

  // Handle receipt dialog
  const handleReceiptDialogOpen = (collection: any) => {
    setSelectedReceipt(collection)
    setOpenReceiptDialog(true)
    handleMenuClose()
  }

  const handleReceiptDialogClose = () => {
    setOpenReceiptDialog(false)
    setSelectedReceipt(null)
  }

  // Handle delete dialog
  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true)
    handleMenuClose()
  }

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false)
  }

  // Handle share dialog
  const handleShareDialogOpen = () => {
    setOpenShareDialog(true)
    handleMenuClose()
  }

  const handleShareDialogClose = () => {
    setOpenShareDialog(false)
  }

  // Handle filter dialog
  const handleFilterDialogOpen = () => {
    setOpenFilterDialog(true)
  }

  const handleFilterDialogClose = () => {
    setOpenFilterDialog(false)
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

  // Handle item selection
  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.length === filteredCollections.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredCollections.map((item) => item.id))
    }
  }

  // Handle bulk action menu
  const handleBulkActionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpenBulkActionMenu(event.currentTarget)
  }

  const handleBulkActionMenuClose = () => {
    setOpenBulkActionMenu(null)
  }

  // Filter collections based on tab, search term, and filters
  const getFilteredCollectionsByTab = useCallback((collections: typeof feeCollections) => {
    switch (tabValue) {
      case 0: // All
        return collections
      case 1: // Completed
        return collections.filter((collection) => collection.status === "Completed")
      case 2: // Pending
        return collections.filter((collection) => collection.status === "Pending")
      case 3: // Failed
        return collections.filter((collection) => collection.status === "Failed")
      case 4: // Partial
        return collections.filter((collection) => collection.status === "Partial")
      default:
        return collections
    }
  }, [tabValue]); // tabValue is a dependency here
  
  const filteredCollections = useMemo(() => {
    let filtered = getFilteredCollectionsByTab(feeCollections)
  
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (collection) =>
          collection.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          collection.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          collection.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          collection.className.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
  
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((collection) => collection.status.toLowerCase() === statusFilter.toLowerCase())
    }
  
    // Apply payment method filter
    if (paymentMethodFilter !== "all") {
      filtered = filtered.filter(
        (collection) => collection.paymentMethod.toLowerCase() === paymentMethodFilter.toLowerCase(),
      )
    }
  
    // Apply date range filter
    if (dateRange.startDate && dateRange.endDate) {
      const startDate = dateRange.startDate; 
      const endDate = dateRange.endDate;     
      
      filtered = filtered.filter((collection) => {
        return collection.paymentDate >= startDate && collection.paymentDate <= endDate
      })
    }
  
    return filtered
  }, [getFilteredCollectionsByTab, searchTerm, statusFilter, paymentMethodFilter, dateRange])

  // Sort collections
  const sortedCollections = useMemo(() => {
    return [...filteredCollections].sort((a, b) => {
      const aValue = a[orderBy as keyof typeof a]
      const bValue = b[orderBy as keyof typeof b]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue
      }

      // Handle date comparison
      if (orderBy === "paymentDate") {
        const aDate = new Date(a.paymentDate)
        const bDate = new Date(b.paymentDate)
        return order === "asc" ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime()
      }

      return 0
    })
  }, [filteredCollections, orderBy, order])

  // Paginated collections
  const paginatedCollections = useMemo(() => {
    return sortedCollections.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  }, [sortedCollections, page, rowsPerPage])

  // Calculate total stats
  const totalCollections = feeCollections.length
  const totalAmount = feeCollections.reduce((sum, collection) => sum + collection.totalPaid, 0)
  const totalDiscounts = feeCollections.reduce((sum, collection) => sum + collection.discount, 0)
  const totalLateCharges = feeCollections.reduce((sum, collection) => sum + collection.lateCharge, 0)
  const totalPending = feeCollections.filter((collection) => collection.status === "Pending").length
  const totalFailed = feeCollections.filter((collection) => collection.status === "Failed").length
  const totalPartial = feeCollections.filter((collection) => collection.status === "Partial").length
  const totalCompleted = feeCollections.filter((collection) => collection.status === "Completed").length

  // Get unique payment methods for filter
  const uniquePaymentMethods = Array.from(new Set(feeCollections.map((collection) => collection.paymentMethod)))

  // Group collections by date for calendar view
  const collectionsByDate = useMemo(() => {
    const grouped: Record<string, typeof feeCollections> = {}
    filteredCollections.forEach((collection) => {
      const date = collection.paymentDate
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(collection)
    })
    return grouped
  }, [filteredCollections])

  // Get dates for calendar view
  const calendarDates = useMemo(() => {
    const dates = Object.keys(collectionsByDate).sort()
    return dates
  }, [collectionsByDate])

  return (
    <ThemeProvider theme={theme}>
      {/* Remove this wrapper:
      <LocalizationProvider dateAdapter={AdapterDateFns}> */}
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: 4,
          background: "linear-gradient(to bottom, #ede7f6, #ffffff)",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" color="primary.dark" gutterBottom>
                  Fee Collections
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage and track all fee payments collected from students
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ExportIcon />}
                    onClick={() => { }}
                    sx={{ mb: { xs: 1, md: 0 } }}
                  >
                    Export
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PrinterIcon />}
                    onClick={() => { }}
                    sx={{ mb: { xs: 1, md: 0 } }}
                  >
                    Print
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    href="/dashboard/super_admin/collect-fee/new"
                    sx={{ mb: { xs: 1, md: 0 } }}
                  >
                    New Collection
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  background: "linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%)",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "40%",
                    height: "100%",
                    opacity: 0.1,
                    background: "url('/placeholder.svg?height=100&width=100') no-repeat center center",
                    backgroundSize: "cover",
                  }}
                />
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", mr: 2 }}>
                      <PaidIcon />
                    </Avatar>
                    <Typography variant="h6">Total Collections</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {totalCollections}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {formatCurrency(totalAmount)} collected in total
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  background: "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "40%",
                    height: "100%",
                    opacity: 0.1,
                    background: "url('/placeholder.svg?height=100&width=100') no-repeat center center",
                    backgroundSize: "cover",
                  }}
                />
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", mr: 2 }}>
                      <CheckCircleIcon />
                    </Avatar>
                    <Typography variant="h6">Completed</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {totalCompleted}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {((totalCompleted / totalCollections) * 100).toFixed(1)}% of all collections
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  background: "linear-gradient(135deg, #ed6c02 0%, #ff9800 100%)",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "40%",
                    height: "100%",
                    opacity: 0.1,
                    background: "url('/placeholder.svg?height=100&width=100') no-repeat center center",
                    backgroundSize: "cover",
                  }}
                />
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", mr: 2 }}>
                      <HistoryIcon />
                    </Avatar>
                    <Typography variant="h6">Pending</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {totalPending}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {totalPending > 0 ? "Awaiting clearance" : "No pending collections"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  background: "linear-gradient(135deg, #d32f2f 0%, #f44336 100%)",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "40%",
                    height: "100%",
                    opacity: 0.1,
                    background: "url('/placeholder.svg?height=100&width=100') no-repeat center center",
                    backgroundSize: "cover",
                  }}
                />
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", mr: 2 }}>
                      <CancelIcon />
                    </Avatar>
                    <Typography variant="h6">Failed/Partial</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {totalFailed + totalPartial}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {formatCurrency(
                      feeCollections
                        .filter((c) => c.status === "Failed" || c.status === "Partial")
                        .reduce((sum, c) => sum + c.remainingBalance, 0),
                    )}{" "}
                    outstanding
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Main Content */}
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pt: 2 }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="fee collection tabs"
                  variant={isMobile ? "scrollable" : "standard"}
                  scrollButtons={isMobile ? "auto" : false}
                >
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <DashboardIcon fontSize="small" sx={{ mr: 1 }} />
                        All
                      </Box>
                    }
                  />
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                        Completed
                      </Box>
                    }
                  />
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <HistoryIcon fontSize="small" sx={{ mr: 1 }} />
                        Pending
                      </Box>
                    }
                  />
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CancelIcon fontSize="small" sx={{ mr: 1 }} />
                        Failed
                      </Box>
                    }
                  />
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PaymentIcon fontSize="small" sx={{ mr: 1 }} />
                        Partial
                      </Box>
                    }
                  />
                </Tabs>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Tooltip title="Table View">
                    <IconButton
                      color={viewMode === "table" ? "primary" : "default"}
                      onClick={() => handleViewModeChange("table")}
                    >
                      <TableViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Card View">
                    <IconButton
                      color={viewMode === "card" ? "primary" : "default"}
                      onClick={() => handleViewModeChange("card")}
                    >
                      <GridViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Calendar View">
                    <IconButton
                      color={viewMode === "calendar" ? "primary" : "default"}
                      onClick={() => handleViewModeChange("calendar")}
                    >
                      <CalendarIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>

            <Box sx={{ p: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Search by student name, ID or receipt number..."
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
                <Grid item xs={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="status-filter-label">Status</InputLabel>
                    <Select
                      labelId="status-filter-label"
                      id="status-filter"
                      value={statusFilter}
                      label="Status"
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Statuses</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="failed">Failed</MenuItem>
                      <MenuItem value="partial">Partial</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="payment-method-filter-label">Payment Method</InputLabel>
                    <Select
                      labelId="payment-method-filter-label"
                      id="payment-method-filter"
                      value={paymentMethodFilter}
                      label="Payment Method"
                      onChange={(e) => setPaymentMethodFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Methods</MenuItem>
                      {uniquePaymentMethods.map((method) => (
                        <MenuItem key={method} value={method.toLowerCase()}>
                          {method}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={2}>
                  <TextField
                    type="date"
                    label="From Date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <TextField
                    type="date"
                    label="To Date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                  />
                </Grid>
              </Grid>

              {selectedItems.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                    p: 1,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2">
                    <strong>{selectedItems.length}</strong> items selected
                  </Typography>
                  <Box>
                    <Button
                      size="small"
                      startIcon={<MoreVertIcon />}
                      onClick={handleBulkActionMenuOpen}
                      variant="outlined"
                    >
                      Bulk Actions
                    </Button>
                    <Button size="small" startIcon={<CancelIcon />} onClick={() => setSelectedItems([])} sx={{ ml: 1 }}>
                      Clear
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>

            <Divider />

            <TabPanel value={tabValue} index={0}>
              {viewMode === "table" && (
                <>
                  <TableContainer component={Paper} elevation={0}>
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Tooltip title="Select All">
                              <IconButton size="small" onClick={handleSelectAll}>
                                {selectedItems.length === filteredCollections.length ? (
                                  <CheckCircleIcon fontSize="small" color="primary" />
                                ) : (
                                  <CheckCircleIcon fontSize="small" color="disabled" />
                                )}
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "id"}
                              direction={orderBy === "id" ? order : "asc"}
                              onClick={() => handleRequestSort("id")}
                            >
                              Receipt ID
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "studentName"}
                              direction={orderBy === "studentName" ? order : "asc"}
                              onClick={() => handleRequestSort("studentName")}
                            >
                              Student
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "className"}
                              direction={orderBy === "className" ? order : "asc"}
                              onClick={() => handleRequestSort("className")}
                            >
                              Class
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "paymentDate"}
                              direction={orderBy === "paymentDate" ? order : "asc"}
                              onClick={() => handleRequestSort("paymentDate")}
                            >
                              Date
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "paymentMethod"}
                              direction={orderBy === "paymentMethod" ? order : "asc"}
                              onClick={() => handleRequestSort("paymentMethod")}
                            >
                              Method
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "totalPaid"}
                              direction={orderBy === "totalPaid" ? order : "asc"}
                              onClick={() => handleRequestSort("totalPaid")}
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
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {paginatedCollections.map((collection) => (
                          <TableRow
                            key={collection.id}
                            sx={{
                              "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.04) },
                              transition: "background-color 0.2s",
                              bgcolor: selectedItems.includes(collection.id)
                                ? alpha(theme.palette.primary.main, 0.08)
                                : "inherit",
                            }}
                          >
                            <TableCell padding="checkbox">
                              <IconButton
                                size="small"
                                onClick={() => handleSelectItem(collection.id)}
                                color={selectedItems.includes(collection.id) ? "primary" : "default"}
                              >
                                {selectedItems.includes(collection.id) ? (
                                  <CheckCircleIcon fontSize="small" />
                                ) : (
                                  <CheckCircleIcon fontSize="small" color="disabled" />
                                )}
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight={500}>
                                {collection.id}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {collection.receiptNumber}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                  src={collection.studentPhoto}
                                  sx={{ width: 32, height: 32, mr: 1.5 }}
                                  alt={collection.studentName}
                                >
                                  {collection.studentName.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" fontWeight={500}>
                                    {collection.studentName}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {collection.studentId}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {collection.className} - {collection.section}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{formatDate(collection.paymentDate)}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {collection.feePeriod}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                icon={getPaymentMethodIcon(collection.paymentMethod)}
                                label={collection.paymentMethod}
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" fontWeight={600}>
                                  {formatCurrency(collection.totalPaid)}
                                </Typography>
                                {collection.discount > 0 && (
                                  <Typography variant="caption" color="error.main">
                                    {formatCurrency(collection.discount)} discount
                                  </Typography>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={collection.status}
                                size="small"
                                color={getStatusColor(collection.status) as any}
                                sx={{ fontWeight: 500 }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Tooltip title="View Receipt">
                                <IconButton
                                  size="small"
                                  sx={{ mr: 0.5 }}
                                  onClick={() => handleReceiptDialogOpen(collection)}
                                >
                                  <ReceiptIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Print">
                                <IconButton size="small" color="primary" sx={{ mr: 0.5 }}>
                                  <PrintIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <IconButton
                                size="small"
                                onClick={(event) => handleMenuOpen(event, collection.id)}
                                aria-label="more options"
                              >
                                <MoreVertIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredCollections.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                              <Typography variant="subtitle1" color="text.secondary">
                                No fee collections found matching your filters
                              </Typography>
                              <Button
                                variant="text"
                                startIcon={<RefreshIcon />}
                                onClick={() => {
                                  setSearchTerm("")
                                  setStatusFilter("all")
                                  setPaymentMethodFilter("all")
                                  setDateRange({ startDate: null, endDate: null })
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
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={filteredCollections.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              )}

              {viewMode === "card" && (
                <>
                  <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                      {paginatedCollections.map((collection) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={collection.id}>
                          <Card
                            sx={{
                              borderRadius: 2,
                              transition: "all 0.3s",
                              boxShadow: selectedItems.includes(collection.id)
                                ? `0 0 0 2px ${theme.palette.primary.main}, 0 4px 20px 0 rgba(0,0,0,0.1)`
                                : "0 4px 20px 0 rgba(0,0,0,0.1)",
                              "&:hover": {
                                boxShadow: "0 8px 25px 0 rgba(0,0,0,0.15)",
                                transform: "translateY(-4px)",
                              },
                              position: "relative",
                              overflow: "visible",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: -10,
                                right: 10,
                                zIndex: 1,
                              }}
                            >
                              <Chip
                                label={collection.status}
                                size="small"
                                color={getStatusColor(collection.status) as any}
                                sx={{ fontWeight: 500, boxShadow: "0 2px 10px 0 rgba(0,0,0,0.1)" }}
                              />
                            </Box>
                            <CardContent>
                              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                  <Avatar
                                    src={collection.studentPhoto}
                                    sx={{ width: 40, height: 40, mr: 1.5 }}
                                    alt={collection.studentName}
                                  >
                                    {collection.studentName.charAt(0)}
                                  </Avatar>
                                  <Box>
                                    <Typography variant="subtitle2" noWrap sx={{ maxWidth: 150 }}>
                                      {collection.studentName}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {collection.className} - {collection.section}
                                    </Typography>
                                  </Box>
                                </Box>
                                <IconButton
                                  size="small"
                                  onClick={() => handleSelectItem(collection.id)}
                                  color={selectedItems.includes(collection.id) ? "primary" : "default"}
                                >
                                  {selectedItems.includes(collection.id) ? (
                                    <CheckCircleIcon fontSize="small" />
                                  ) : (
                                    <CheckCircleIcon fontSize="small" color="disabled" />
                                  )}
                                </IconButton>
                              </Box>

                              <Divider sx={{ my: 1.5 }} />

                              <Grid container spacing={1}>
                                <Grid item xs={6}>
                                  <Typography variant="caption" color="text.secondary">
                                    Receipt ID
                                  </Typography>
                                  <Typography variant="body2" fontWeight={500} noWrap>
                                    {collection.id}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="caption" color="text.secondary">
                                    Date
                                  </Typography>
                                  <Typography variant="body2" fontWeight={500}>
                                    {formatDate(collection.paymentDate)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="caption" color="text.secondary">
                                    Amount
                                  </Typography>
                                  <Typography variant="body2" fontWeight={600} color="primary.main">
                                    {formatCurrency(collection.totalPaid)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="caption" color="text.secondary">
                                    Method
                                  </Typography>
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    {getPaymentMethodIcon(collection.paymentMethod)}
                                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                                      {collection.paymentMethod}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>

                              <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                                <Button
                                  size="small"
                                  startIcon={<ReceiptIcon />}
                                  onClick={() => handleReceiptDialogOpen(collection)}
                                  variant="outlined"
                                >
                                  Receipt
                                </Button>
                                <IconButton
                                  size="small"
                                  onClick={(event) => handleMenuOpen(event, collection.id)}
                                  aria-label="more options"
                                >
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                      {filteredCollections.length === 0 && (
                        <Grid item xs={12}>
                          <Box sx={{ textAlign: "center", py: 4 }}>
                            <Typography variant="subtitle1" color="text.secondary">
                              No fee collections found matching your filters
                            </Typography>
                            <Button
                              variant="text"
                              startIcon={<RefreshIcon />}
                              onClick={() => {
                                setSearchTerm("")
                                setStatusFilter("all")
                                setPaymentMethodFilter("all")
                                setDateRange({ startDate: null, endDate: null })
                              }}
                              sx={{ mt: 1 }}
                            >
                              Reset Filters
                            </Button>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                    <TablePagination
                      rowsPerPageOptions={[12, 24, 48]}
                      component="div"
                      count={filteredCollections.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Box>
                </>
              )}

              {viewMode === "calendar" && (
                <Box sx={{ p: 2 }}>
                  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Collections Calendar View
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Showing {filteredCollections.length} collections across {calendarDates.length} days
                    </Typography>
                  </Paper>

                  {calendarDates.length > 0 ? (
                    calendarDates.map((date) => (
                      <Paper key={date} variant="outlined" sx={{ mb: 3, overflow: "hidden" }}>
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <DateIcon sx={{ mr: 1, color: "primary.main" }} />
                            <Typography variant="subtitle1" fontWeight={600}>
                              {formatDate(date)}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {collectionsByDate[date].length} collections
                          </Typography>
                        </Box>

                        <Box sx={{ p: 2 }}>
                          <Grid container spacing={2}>
                            {collectionsByDate[date].map((collection) => (
                              <Grid item xs={12} sm={6} md={4} lg={3} key={collection.id}>
                                <Card
                                  sx={{
                                    borderRadius: 2,
                                    transition: "all 0.3s",
                                    boxShadow: selectedItems.includes(collection.id)
                                      ? `0 0 0 2px ${theme.palette.primary.main}, 0 4px 20px 0 rgba(0,0,0,0.1)`
                                      : "0 4px 20px 0 rgba(0,0,0,0.1)",
                                    "&:hover": {
                                      boxShadow: "0 8px 25px 0 rgba(0,0,0,0.15)",
                                    },
                                    position: "relative",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: -10,
                                      right: 10,
                                      zIndex: 1,
                                    }}
                                  >
                                    <Chip
                                      label={collection.status}
                                      size="small"
                                      color={getStatusColor(collection.status) as any}
                                      sx={{ fontWeight: 500, boxShadow: "0 2px 10px 0 rgba(0,0,0,0.1)" }}
                                    />
                                  </Box>
                                  <CardContent>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                      <Avatar
                                        src={collection.studentPhoto}
                                        sx={{ width: 32, height: 32, mr: 1.5 }}
                                        alt={collection.studentName}
                                      >
                                        {collection.studentName.charAt(0)}
                                      </Avatar>
                                      <Box>
                                        <Typography variant="subtitle2" noWrap sx={{ maxWidth: 150 }}>
                                          {collection.studentName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                          {collection.className} - {collection.section}
                                        </Typography>
                                      </Box>
                                    </Box>

                                    <Grid container spacing={1}>
                                      <Grid item xs={6}>
                                        <Typography variant="caption" color="text.secondary">
                                          Receipt ID
                                        </Typography>
                                        <Typography variant="body2" fontWeight={500} noWrap>
                                          {collection.id}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography variant="caption" color="text.secondary">
                                          Amount
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600} color="primary.main">
                                          {formatCurrency(collection.totalPaid)}
                                        </Typography>
                                      </Grid>
                                    </Grid>

                                    <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                                      <Button
                                        size="small"
                                        startIcon={<ReceiptIcon />}
                                        onClick={() => handleReceiptDialogOpen(collection)}
                                        variant="outlined"
                                      >
                                        View
                                      </Button>
                                      <IconButton
                                        size="small"
                                        onClick={() => handleSelectItem(collection.id)}
                                        color={selectedItems.includes(collection.id) ? "primary" : "default"}
                                      >
                                        {selectedItems.includes(collection.id) ? (
                                          <CheckCircleIcon fontSize="small" />
                                        ) : (
                                          <CheckCircleIcon fontSize="small" color="disabled" />
                                        )}
                                      </IconButton>
                                    </Box>
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </Paper>
                    ))
                  ) : (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        No fee collections found matching your filters
                      </Typography>
                      <Button
                        variant="text"
                        startIcon={<RefreshIcon />}
                        onClick={() => {
                          setSearchTerm("")
                          setStatusFilter("all")
                          setPaymentMethodFilter("all")
                          setDateRange({ startDate: null, endDate: null })
                        }}
                        sx={{ mt: 1 }}
                      >
                        Reset Filters
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </TabPanel>

            {/* Other tab panels would be similar but with filtered data */}
            <TabPanel value={tabValue} index={1}>
              {/* Completed collections - same structure as tab 0 */}
              {viewMode === "table" && (
                /* Table view for completed collections */
                <Box sx={{ p: 2 }}>
                  <Typography variant="body1">Showing {filteredCollections.length} completed collections</Typography>
                  {/* Same table structure as in tab 0 */}
                </Box>
              )}
              {/* Card and Calendar views would be similar */}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              {/* Pending collections */}
              <Box sx={{ p: 2 }}>
                <Typography variant="body1">Showing {filteredCollections.length} pending collections</Typography>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              {/* Failed collections */}
              <Box sx={{ p: 2 }}>
                <Typography variant="body1">Showing {filteredCollections.length} failed collections</Typography>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={4}>
              {/* Partial collections */}
              <Box sx={{ p: 2 }}>
                <Typography variant="body1">Showing {filteredCollections.length} partial collections</Typography>
              </Box>
            </TabPanel>
          </Card>
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
        <MenuItem onClick={() => handleReceiptDialogOpen(feeCollections.find((c) => c.id === selectedCollection))}>
          <ListItemIcon>
            <ReceiptIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View Receipt" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Print Receipt" />
        </MenuItem>
        <MenuItem onClick={handleShareDialogOpen}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Share Receipt" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit Collection" />
        </MenuItem>
        <MenuItem onClick={handleDeleteDialogOpen} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>

      {/* Bulk Action Menu */}
      <Menu
        anchorEl={openBulkActionMenu}
        open={Boolean(openBulkActionMenu)}
        onClose={handleBulkActionMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleBulkActionMenuClose}>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Print Selected" />
        </MenuItem>
        <MenuItem onClick={handleBulkActionMenuClose}>
          <ListItemIcon>
            <ExportIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Export Selected" />
        </MenuItem>
        <MenuItem onClick={handleBulkActionMenuClose}>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Email Receipts" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleBulkActionMenuClose} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete Selected" />
        </MenuItem>
      </Menu>

      {/* Receipt Dialog */}
      {selectedReceipt && (
        <Dialog
          open={openReceiptDialog}
          onClose={handleReceiptDialogClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
            },
          }}
        >
          <DialogTitle sx={{ bgcolor: "primary.main", color: "white", py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ReceiptIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Fee Receipt</Typography>
              </Box>
              <Box>
                <IconButton size="small" onClick={handleReceiptDialogClose} sx={{ color: "white" }}>
                  <CancelIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ p: 2, border: "1px dashed #ccc", borderRadius: 2, mb: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <SchoolIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="h6" color="primary.main">
                      School Name
                    </Typography>
                  </Box>
                  <Typography variant="body2">123 Education Street</Typography>
                  <Typography variant="body2">City, State, ZIP</Typography>
                  <Typography variant="body2">Phone: (123) 456-7890</Typography>
                  <Typography variant="body2">Email: info@school.edu</Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: { xs: "left", sm: "right" } }}>
                  <Typography variant="h6" color="primary.main" gutterBottom>
                    RECEIPT
                  </Typography>
                  <Typography variant="body2">
                    <strong>Receipt No:</strong> {selectedReceipt.receiptNumber}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Date:</strong> {formatDate(selectedReceipt.paymentDate)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong>{" "}
                    <Chip
                      label={selectedReceipt.status}
                      size="small"
                      color={getStatusColor(selectedReceipt.status) as any}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ color: "primary.main" }}>
                Student Information
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={selectedReceipt.studentPhoto}
                        sx={{ width: 40, height: 40, mr: 1.5 }}
                        alt={selectedReceipt.studentName}
                      >
                        {selectedReceipt.studentName.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">{selectedReceipt.studentName}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedReceipt.studentId}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Class:</strong> {selectedReceipt.className} - {selectedReceipt.section}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Fee Period:</strong> {selectedReceipt.feePeriod}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ color: "primary.main" }}>
                Payment Details
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{selectedReceipt.feeType}</TableCell>
                      <TableCell align="right">{formatCurrency(selectedReceipt.amount)}</TableCell>
                    </TableRow>
                    {selectedReceipt.previousDue > 0 && (
                      <TableRow>
                        <TableCell>Previous Due</TableCell>
                        <TableCell align="right">{formatCurrency(selectedReceipt.previousDue)}</TableCell>
                      </TableRow>
                    )}
                    {selectedReceipt.lateCharge > 0 && (
                      <TableRow>
                        <TableCell>Late Fee</TableCell>
                        <TableCell align="right">{formatCurrency(selectedReceipt.lateCharge)}</TableCell>
                      </TableRow>
                    )}
                    {selectedReceipt.discount > 0 && (
                      <TableRow>
                        <TableCell>Discount</TableCell>
                        <TableCell align="right" sx={{ color: "error.main" }}>
                          -{formatCurrency(selectedReceipt.discount)}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>
                        {formatCurrency(
                          selectedReceipt.amount +
                          selectedReceipt.previousDue +
                          selectedReceipt.lateCharge -
                          selectedReceipt.discount,
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Amount Paid</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: "success.main" }}>
                        {formatCurrency(selectedReceipt.totalPaid)}
                      </TableCell>
                    </TableRow>
                    {selectedReceipt.remainingBalance > 0 && (
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Remaining Balance</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, color: "error.main" }}>
                          {formatCurrency(selectedReceipt.remainingBalance)}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableHead>
                </Table>
              </TableContainer>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ color: "primary.main" }}>
                Payment Information
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Payment Method:</strong>{" "}
                      <Chip
                        icon={getPaymentMethodIcon(selectedReceipt.paymentMethod)}
                        label={selectedReceipt.paymentMethod}
                        size="small"
                        variant="outlined"
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Collected By:</strong> {selectedReceipt.collectedBy}
                    </Typography>
                  </Grid>
                  {selectedReceipt.notes && (
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        <strong>Notes:</strong> {selectedReceipt.notes}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Box>

            <Box sx={{ textAlign: "center", mt: 4, p: 2, borderTop: "1px dashed #ccc" }}>
              <Typography variant="body2" color="text.secondary">
                This is a computer-generated receipt and does not require a signature.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Thank you for your payment!
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
            <Button startIcon={<ShareIcon />} onClick={handleShareDialogOpen}>
              Share
            </Button>
            <Box>
              <Button startIcon={<DownloadIcon />} sx={{ mr: 1 }}>
                Download
              </Button>
              <Button startIcon={<PrintIcon />} variant="contained">
                Print
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Fee Collection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this fee collection record? This action cannot be undone and will remove all
            associated data.
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

      {/* Share Dialog */}
      <Dialog open={openShareDialog} onClose={handleShareDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle>Share Receipt</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Button startIcon={<EmailIcon />} variant="outlined" fullWidth>
              Send via Email
            </Button>
            <Button startIcon={<WhatsAppIcon />} variant="outlined" fullWidth>
              Send via WhatsApp
            </Button>
            <Button startIcon={<PdfIcon />} variant="outlined" fullWidth>
              Generate PDF
            </Button>
            <TextField label="Recipient Email" fullWidth size="small" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShareDialogClose}>Cancel</Button>
          <Button onClick={handleShareDialogClose} variant="contained" startIcon={<SendIcon />}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
      {/* </LocalizationProvider> */}
    </ThemeProvider>
  )
}
