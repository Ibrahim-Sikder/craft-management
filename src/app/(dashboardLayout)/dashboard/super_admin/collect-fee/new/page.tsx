/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Chip,
  Card,
  CardContent,
  Divider,
  Avatar,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  CircularProgress,
  Tooltip,
  Fade,
  Collapse,
  Alert,
  Tabs,
  Tab,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material"
import {
  Search,
  Person,
  School,
  CalendarMonth,
  Receipt,
  CreditCard,
  AccountBalance,
  QrCode,
  Print,
  Email,
  WhatsApp,
  AttachMoney,
  LocalAtm,
  Discount,
  ReceiptLong,
  CheckCircle,
  History,
  ArrowForward,
  ArrowBack,
  Close,
  Refresh,
  Download,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material"

// Types for data structures
interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  avatar: string;
  parentName: string;
  parentContact: string;
  email: string;
}

interface FeeItem {
  id: number;
  type: string;
  amount: number;
  mandatory: boolean;
  description?: string;
}

interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  mode: string;
  status: string;
  receiptNo: string;
}

interface DiscountType {
  id: number;
  name: string;
  percentage: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
}

// Mock data for student information
const STUDENTS: Student[] = [
  {
    id: "STU001",
    name: "Aiden Parker",
    class: "10th Grade",
    section: "A",
    rollNo: "101",
    avatar: "/placeholder.svg?height=40&width=40",
    parentName: "Robert Parker",
    parentContact: "+1 (555) 123-4567",
    email: "aiden.parker@example.com",
  },
  {
    id: "STU002",
    name: "Sophia Williams",
    class: "9th Grade",
    section: "B",
    rollNo: "203",
    avatar: "/placeholder.svg?height=40&width=40",
    parentName: "Emma Williams",
    parentContact: "+1 (555) 987-6543",
    email: "sophia.williams@example.com",
  },
  {
    id: "STU003",
    name: "Ethan Johnson",
    class: "11th Grade",
    section: "A",
    rollNo: "105",
    avatar: "/placeholder.svg?height=40&width=40",
    parentName: "Michael Johnson",
    parentContact: "+1 (555) 456-7890",
    email: "ethan.johnson@example.com",
  },
]

// Mock data for fee structure
const FEE_STRUCTURE: FeeItem[] = [
  { id: 1, type: "Tuition Fee", amount: 5000, mandatory: true },
  { id: 2, type: "Development Fee", amount: 2000, mandatory: true },
  { id: 3, type: "Library Fee", amount: 500, mandatory: true },
  { id: 4, type: "Computer Lab Fee", amount: 1000, mandatory: true },
  { id: 5, type: "Sports Fee", amount: 800, mandatory: true },
  { id: 6, type: "Transportation Fee", amount: 1500, mandatory: false },
  { id: 7, type: "Hostel Fee", amount: 3500, mandatory: false },
  { id: 8, type: "Examination Fee", amount: 1200, mandatory: true },
]

// Mock data for payment history
const PAYMENT_HISTORY: PaymentRecord[] = [
  {
    id: "PAY001",
    date: "2025-03-15",
    amount: 8500,
    mode: "Online",
    status: "Paid",
    receiptNo: "REC-2025-001",
  },
  {
    id: "PAY002",
    date: "2025-02-10",
    amount: 8500,
    mode: "Bank Transfer",
    status: "Paid",
    receiptNo: "REC-2025-002",
  },
  {
    id: "PAY003",
    date: "2025-01-12",
    amount: 8500,
    mode: "Cash",
    status: "Paid",
    receiptNo: "REC-2025-003",
  },
]

// Mock data for discounts
const DISCOUNTS: DiscountType[] = [
  { id: 1, name: "Sibling Discount", percentage: 10 },
  { id: 2, name: "Merit Scholarship", percentage: 25 },
  { id: 3, name: "Staff Ward Discount", percentage: 50 },
  { id: 4, name: "Financial Aid", percentage: 15 },
]

// Mock data for payment methods
const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "cash", name: "Cash", icon: <LocalAtm /> },
  { id: "card", name: "Credit/Debit Card", icon: <CreditCard /> },
  { id: "bank", name: "Bank Transfer", icon: <AccountBalance /> },
  { id: "upi", name: "UPI", icon: <QrCode /> },
]

// Mock data for classes
const CLASSES: string[] = [
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "9th Grade",
  "10th Grade",
  "11th Grade",
  "12th Grade",
]

// Mock data for sessions
const SESSIONS: string[] = ["2024-2025", "2025-2026", "2026-2027"]

// Styled components
const GradientCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[10],
  },
}))

const AnimatedButton = styled(Button)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
    transition: "all 0.5s",
  },
  "&:hover::after": {
    left: "100%",
  },
}))

const FeesCollectPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  // State management
  const [activeStep, setActiveStep] = useState<number>(0)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedFees, setSelectedFees] = useState<FeeItem[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedSession, setSelectedSession] = useState<string>(SESSIONS[0])
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [discountApplied, setDiscountApplied] = useState<DiscountType | null>(null)
  const [showHistory, setShowHistory] = useState<boolean>(false)
  const [receiptDialogOpen, setReceiptDialogOpen] = useState<boolean>(false)
  const [successSnackbar, setSuccessSnackbar] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [tabValue, setTabValue] = useState<number>(0)
  const [applyLateFeePenalty, setApplyLateFeePenalty] = useState<boolean>(false)
  const [paymentNote, setPaymentNote] = useState<string>("")
  const [searchResults, setSearchResults] = useState<Student[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false)
  const [paymentAmount, setPaymentAmount] = useState<string>("")
  const [partialPayment, setPartialPayment] = useState<boolean>(false)

  // Calculate totals
  const calculateSubtotal = (): number => {
    return selectedFees.reduce((total, fee) => total + fee.amount, 0)
  }

  const calculateDiscount = (): number => {
    if (!discountApplied) return 0
    return (calculateSubtotal() * discountApplied.percentage) / 100
  }

  const calculateLateFee = (): number => {
    return applyLateFeePenalty ? 500 : 0 // Example late fee
  }

  const calculateTotal = (): number => {
    return calculateSubtotal() - calculateDiscount() + calculateLateFee()
  }

  // Handle student search
  const handleSearch = () => {
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      const results = STUDENTS.filter(
        (student) =>
          student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (selectedClass && student.class === selectedClass),
      )
      setSearchResults(results)
      setIsSearching(false)
    }, 800)
  }

  // Handle student selection
  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student)
    // Pre-select mandatory fees
    setSelectedFees(FEE_STRUCTURE.filter((fee) => fee.mandatory))
    setActiveStep(1)
  }

  // Handle fee selection
  const handleFeeToggle = (fee: FeeItem) => {
    if (selectedFees.find((f) => f.id === fee.id)) {
      setSelectedFees(selectedFees.filter((f) => f.id !== fee.id))
    } else {
      setSelectedFees([...selectedFees, fee])
    }
  }

  // Handle payment processing
  const handleProcessPayment = () => {
    setLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      setActiveStep(3)
      setSuccessSnackbar(true)
    }, 2000)
  }

  // Handle receipt generation
  const handleGenerateReceipt = () => {
    setReceiptDialogOpen(true)
  }

  // Reset the form
  const handleReset = () => {
    setActiveStep(0)
    setSelectedStudent(null)
    setSelectedFees([])
    setSearchQuery("")
    setSelectedClass("")
    setPaymentMethod("")
    setDiscountApplied(null)
    setShowHistory(false)
    setApplyLateFeePenalty(false)
    setPaymentNote("")
    setSearchResults([])
    setPartialPayment(false)
    setPaymentAmount("")
  }

  // Steps for the stepper
  const steps = ["Select Student", "Select Fees", "Payment", "Confirmation"]

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Render student search step
  const renderStudentSearch = () => (
    <Fade in={activeStep === 0}>
      <Box>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <Person sx={{ mr: 1 }} /> Find Student
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Student ID or Name"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Class</InputLabel>
                <Select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value as string)}
                  label="Class"
                  startAdornment={
                    <InputAdornment position="start">
                      <School fontSize="small" />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">
                    <em>All Classes</em>
                  </MenuItem>
                  {CLASSES.map((cls) => (
                    <MenuItem key={cls} value={cls}>
                      {cls}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Session</InputLabel>
                <Select
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value as string)}
                  label="Session"
                  startAdornment={
                    <InputAdornment position="start">
                      <CalendarMonth fontSize="small" />
                    </InputAdornment>
                  }
                >
                  {SESSIONS.map((session) => (
                    <MenuItem key={session} value={session}>
                      {session}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <AnimatedButton
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={isSearching}
                sx={{ height: "56px" }}
              >
                {isSearching ? <CircularProgress size={24} color="inherit" /> : "Search"}
              </AnimatedButton>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button
                  size="small"
                  startIcon={showAdvancedSearch ? <ExpandLess /> : <ExpandMore />}
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                >
                  Advanced Search
                </Button>
                <Chip
                  label={`${searchResults.length} students found`}
                  color="primary"
                  variant="outlined"
                  sx={{ visibility: searchResults.length > 0 ? "visible" : "hidden" }}
                />
              </Box>
            </Grid>
          </Grid>

          <Collapse in={showAdvancedSearch}>
            <Box sx={{ mt: 2, p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Roll Number" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Parent Name" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Phone Number" variant="outlined" size="small" />
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </Paper>

        {isSearching ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : searchResults.length > 0 ? (
          <Grid container spacing={2}>
            {searchResults.map((student) => (
              <Grid item xs={12} md={6} lg={4} key={student.id}>
                <Card
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                    },
                  }}
                  onClick={() => handleSelectStudent(student)}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={student.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
                    <Box>
                      <Typography variant="h6">{student.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        ID: {student.id} | Class: {student.class} {student.section}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Roll No: {student.rollNo}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: "auto" }}>
                      <IconButton color="primary">
                        <ArrowForward />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : searchQuery || selectedClass ? (
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Box sx={{ my: 3 }}>
              <Search sx={{ fontSize: 60, color: "text.secondary", opacity: 0.3 }} />
              <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                No students found matching your search criteria
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Try adjusting your search parameters or try a different search term
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                startIcon={<Refresh />}
                onClick={() => {
                  setSearchQuery("")
                  setSelectedClass("")
                  setSearchResults([])
                }}
              >
                Reset Search
              </Button>
            </Box>
          </Paper>
        ) : (
          <Box sx={{ textAlign: "center", my: 6 }}>
            <Box
              sx={{
                p: 3,
                borderRadius: "50%",
                bgcolor: "primary.light",
                display: "inline-flex",
                mb: 2,
              }}
            >
              <Person sx={{ fontSize: 60, color: "primary.main" }} />
            </Box>
            <Typography variant="h5" gutterBottom>
              Search for a Student
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ maxWidth: 500, mx: "auto", mb: 3 }}>
              Enter student ID, name, or select a class to find students and collect fees
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 600, mx: "auto" }}>
              <Grid item xs={12} md={4}>
                <GradientCard sx={{ height: "100%" }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <School sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      By Class
                    </Typography>
                    <Typography variant="body2">Select a class to view all students</Typography>
                  </CardContent>
                </GradientCard>
              </Grid>
              <Grid item xs={12} md={4}>
                <GradientCard sx={{ height: "100%" }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Person sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      By Student ID
                    </Typography>
                    <Typography variant="body2">Enter student ID for direct search</Typography>
                  </CardContent>
                </GradientCard>
              </Grid>
              <Grid item xs={12} md={4}>
                <GradientCard sx={{ height: "100%" }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Search sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      By Name
                    </Typography>
                    <Typography variant="body2">Search by student name</Typography>
                  </CardContent>
                </GradientCard>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Fade>
  )

  // Render fee selection step
  const renderFeeSelection = () => (
    <Fade in={activeStep === 1}>
      <Box>
        {selectedStudent && (
          <>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={selectedStudent.avatar} sx={{ width: 64, height: 64, mr: 2 }} />
                  <Box>
                    <Typography variant="h5">{selectedStudent.name}</Typography>
                    <Typography variant="body1" color="textSecondary">
                      ID: {selectedStudent.id} | Class: {selectedStudent.class} {selectedStudent.section}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<History />}
                    onClick={() => setShowHistory(!showHistory)}
                    sx={{ mr: 1 }}
                  >
                    {showHistory ? "Hide History" : "Payment History"}
                  </Button>
                  <Button variant="outlined" color="error" startIcon={<Close />} onClick={handleReset}>
                    Change Student
                  </Button>
                </Box>
              </Box>

              <Collapse in={showHistory}>
                <Box sx={{ mt: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Payment History
                  </Typography>
                  <Paper variant="outlined" sx={{ overflow: "auto" }}>
                    <Box sx={{ minWidth: 650 }}>
                      <Box sx={{ display: "table", width: "100%" }}>
                        <Box sx={{ display: "table-header-group", bgcolor: "background.default" }}>
                          <Box sx={{ display: "table-row" }}>
                            <Typography sx={{ display: "table-cell", p: 2, fontWeight: "bold" }}>Receipt No</Typography>
                            <Typography sx={{ display: "table-cell", p: 2, fontWeight: "bold" }}>Date</Typography>
                            <Typography sx={{ display: "table-cell", p: 2, fontWeight: "bold" }}>Amount</Typography>
                            <Typography sx={{ display: "table-cell", p: 2, fontWeight: "bold" }}>
                              Payment Mode
                            </Typography>
                            <Typography sx={{ display: "table-cell", p: 2, fontWeight: "bold" }}>Status</Typography>
                            <Typography sx={{ display: "table-cell", p: 2, fontWeight: "bold" }}>Action</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: "table-row-group" }}>
                          {PAYMENT_HISTORY.map((payment) => (
                            <Box key={payment.id} sx={{ display: "table-row" }}>
                              <Typography sx={{ display: "table-cell", p: 2 }}>{payment.receiptNo}</Typography>
                              <Typography sx={{ display: "table-cell", p: 2 }}>
                                {new Date(payment.date).toLocaleDateString()}
                              </Typography>
                              <Typography sx={{ display: "table-cell", p: 2 }}>
                                ${payment.amount.toLocaleString()}
                              </Typography>
                              <Typography sx={{ display: "table-cell", p: 2 }}>{payment.mode}</Typography>
                              <Typography sx={{ display: "table-cell", p: 2 }}>
                                <Chip
                                  label={payment.status}
                                  color={payment.status === "Paid" ? "success" : "warning"}
                                  size="small"
                                />
                              </Typography>
                              <Typography sx={{ display: "table-cell", p: 2 }}>
                                <Tooltip title="View Receipt">
                                  <IconButton size="small" color="primary">
                                    <Receipt fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Download Receipt">
                                  <IconButton size="small" color="primary">
                                    <Download fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Collapse>
            </Paper>

            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                    <ReceiptLong sx={{ mr: 1 }} /> Select Fees to Collect
                  </Typography>

                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    sx={{ mb: 2 }}
                  >
                    <Tab label="All Fees" />
                    <Tab label="Mandatory Fees" />
                    <Tab label="Optional Fees" />
                  </Tabs>

                  <Box sx={{ mt: 2 }}>
                    {FEE_STRUCTURE.filter((fee) => {
                      if (tabValue === 1) return fee.mandatory
                      if (tabValue === 2) return !fee.mandatory
                      return true
                    }).map((fee) => {
                      const isSelected = selectedFees.some((f) => f.id === fee.id)
                      return (
                        <Card
                          key={fee.id}
                          variant="outlined"
                          sx={{
                            mb: 2,
                            borderColor: isSelected ? "primary.main" : "divider",
                            bgcolor: isSelected ? "primary.lighter" : "background.paper",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <CardContent
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              p: 2,
                              "&:last-child": { pb: 2 },
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <FormControlLabel
                                control={
                                  <Switch checked={isSelected} onChange={() => handleFeeToggle(fee)} color="primary" />
                                }
                                label=""
                              />
                              <Box>
                                <Typography variant="subtitle1">
                                  {fee.type}
                                  {fee.mandatory && (
                                    <Chip label="Mandatory" size="small" color="primary" sx={{ ml: 1, height: 20 }} />
                                  )}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  {fee.description || ""}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="h6" color="primary">
                              ${fee.amount.toLocaleString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={applyLateFeePenalty}
                          onChange={(e) => setApplyLateFeePenalty(e.target.checked)}
                          color="warning"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body1" sx={{ mr: 1 }}>
                            Apply Late Fee Penalty
                          </Typography>
                          <Chip label="$500" color="warning" size="small" />
                        </Box>
                      }
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 3, position: "sticky", top: 20 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                    <AttachMoney sx={{ mr: 1 }} /> Fee Summary
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body1">Subtotal</Typography>
                      <Typography variant="body1">${calculateSubtotal().toLocaleString()}</Typography>
                    </Box>

                    {discountApplied && (
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body1" color="error">
                          Discount ({discountApplied.name} - {discountApplied.percentage}%)
                        </Typography>
                      </Box>
                    )}

                    {applyLateFeePenalty && (
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body1" color="warning.main">
                          Late Fee Penalty
                        </Typography>
                        <Typography variant="body1" color="warning.main">
                          +$500
                        </Typography>
                      </Box>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Typography variant="h6">Total</Typography>
                      <Typography variant="h6" color="primary">
                        ${calculateTotal().toLocaleString()}
                      </Typography>
                    </Box>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Apply Discount</InputLabel>
                      <Select
                        value={discountApplied ? discountApplied.id : ""}
                        onChange={(e) => {
                          const discount = DISCOUNTS.find((d) => d.id === e.target.value)
                          setDiscountApplied(discount || null)
                        }}
                        label="Apply Discount"
                        startAdornment={
                          <InputAdornment position="start">
                            <Discount fontSize="small" />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="">
                          <em>No Discount</em>
                        </MenuItem>
                        {DISCOUNTS.map((discount) => (
                          <MenuItem key={discount.id} value={discount.id}>
                            {discount.name} ({discount.percentage}%)
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControlLabel
                      control={
                        <Switch
                          checked={partialPayment}
                          onChange={(e) => setPartialPayment(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Allow Partial Payment"
                    />

                    {partialPayment && (
                      <TextField
                        fullWidth
                        label="Payment Amount"
                        variant="outlined"
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        sx={{ mt: 2 }}
                      />
                    )}

                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleNext}
                      disabled={selectedFees.length === 0}
                      sx={{ mt: 2 }}
                    >
                      Proceed to Payment
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Fade>
  )

  // Render payment step
  const renderPayment = () => (
    <Fade in={activeStep === 2}>
      <Box>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <CreditCard sx={{ mr: 1 }} /> Payment Method
          </Typography>

          <Grid container spacing={2}>
            {PAYMENT_METHODS.map((method) => (
              <Grid item xs={6} sm={3} key={method.id}>
                <Card
                  variant={paymentMethod === method.id ? "elevation" : "outlined"}
                  elevation={paymentMethod === method.id ? 8 : 0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    borderColor: paymentMethod === method.id ? "primary.main" : "divider",
                    bgcolor: paymentMethod === method.id ? "primary.lighter" : "background.paper",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      transform: "translateY(-5px)",
                    },
                  }}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: paymentMethod === method.id ? "primary.main" : "text.primary",
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "50%",
                        bgcolor: paymentMethod === method.id ? "primary.lighter" : "background.default",
                        mb: 1,
                      }}
                    >
                      {method.icon}
                    </Box>
                    <Typography variant="subtitle1">{method.name}</Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Payment Note (Optional)"
              variant="outlined"
              multiline
              rows={2}
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              placeholder="Add any additional information about this payment"
            />
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Payment Summary
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Student Information
                </Typography>
                <Typography variant="body1">
                  {selectedStudent?.name} ({selectedStudent?.id})
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Class: {selectedStudent?.class} {selectedStudent?.section} | Roll No: {selectedStudent?.rollNo}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Parent Information
                </Typography>
                <Typography variant="body1">{selectedStudent?.parentName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Contact: {selectedStudent?.parentContact}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: {selectedStudent?.email}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Fee Details
                </Typography>
                {selectedFees.map((fee) => (
                  <Box key={fee.id} sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2">{fee.type}</Typography>
                    <Typography variant="body2">${fee.amount.toLocaleString()}</Typography>
                  </Box>
                ))}

                {discountApplied && (
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2" color="error">
                      Discount ({discountApplied.name})
                    </Typography>
                    <Typography variant="body2" color="error">
                      -${calculateDiscount().toLocaleString()}
                    </Typography>
                  </Box>
                )}

                {applyLateFeePenalty && (
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2" color="warning.main">
                      Late Fee Penalty
                    </Typography>
                    <Typography variant="body2" color="warning.main">
                      +$500
                    </Typography>
                  </Box>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="subtitle1">Total Amount</Typography>
                <Typography variant="subtitle1" color="primary">
                  ${calculateTotal().toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="body2">Payment Method</Typography>
                <Typography variant="body2">
                  {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.name || "Not selected"}
                </Typography>
              </Box>

              {partialPayment && paymentAmount && (
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="body2">Payment Amount</Typography>
                  <Typography variant="body2">${Number(paymentAmount).toLocaleString()}</Typography>
                </Box>
              )}

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="body2">Date</Typography>
                <Typography variant="body2">{new Date().toLocaleDateString()}</Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={handleBack} startIcon={<ArrowBack />}>
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleProcessPayment}
              disabled={!paymentMethod || loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AttachMoney />}
            >
              {loading ? "Processing..." : "Process Payment"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Fade>
  )

  // Render confirmation step
  const renderConfirmation = () => (
    <Fade in={activeStep === 3}>
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
          <CheckCircle sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="body1" paragraph>
            The payment of <strong>${calculateTotal().toLocaleString()}</strong> has been successfully processed.
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Receipt Number:{" "}
            <strong>
              REC-
              {Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, "0")}
            </strong>
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Transaction ID: <strong>TXN-{Date.now().toString().slice(-8)}</strong>
          </Typography>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
            <Button variant="contained" color="primary" startIcon={<Receipt />} onClick={handleGenerateReceipt}>
              View Receipt
            </Button>
            <Button variant="outlined" startIcon={<Print />} onClick={handleGenerateReceipt}>
              Print Receipt
            </Button>
            <Button
              variant="outlined"
              startIcon={<Email />}
              onClick={() => {
                setSuccessSnackbar(true)
              }}
            >
              Email Receipt
            </Button>
            <Button
              variant="outlined"
              startIcon={<WhatsApp />}
              onClick={() => {
                setSuccessSnackbar(true)
              }}
            >
              Send via WhatsApp
            </Button>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Button variant="text" color="primary" onClick={handleReset} startIcon={<Refresh />}>
              Collect Another Fee
            </Button>
          </Box>
        </Paper>
      </Box>
    </Fade>
  )

  return (
    <Box sx={{ py: 4, px: isMobile ? 2 : 4 }}>
      <Typography variant="h4" gutterBottom sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <AttachMoney sx={{ mr: 1, fontSize: 32 }} />
        Fee Collection
      </Typography>

      <Stepper
        activeStep={activeStep}
        alternativeLabel={!isMobile}
        orientation={isMobile ? "vertical" : "horizontal"}
        sx={{ mb: 4 }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && renderStudentSearch()}
      {activeStep === 1 && renderFeeSelection()}
      {activeStep === 2 && renderPayment()}
      {activeStep === 3 && renderConfirmation()}

      {/* Receipt Dialog */}
      <Dialog open={receiptDialogOpen} onClose={() => setReceiptDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Fee Receipt</Typography>
          <IconButton onClick={() => setReceiptDialogOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Paper elevation={0} sx={{ p: 3, border: "1px dashed", borderColor: "divider" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Box>
                <Typography variant="h5" gutterBottom>
                  Fee Receipt
                </Typography>
                <Typography variant="body2">
                  Receipt No: REC-
                  {Math.floor(Math.random() * 10000)
                    .toString()
                    .padStart(4, "0")}
                </Typography>
                <Typography variant="body2">Date: {new Date().toLocaleDateString()}</Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="h6">School Name</Typography>
                <Typography variant="body2">123 Education Street</Typography>
                <Typography variant="body2">City, State, ZIP</Typography>
                <Typography variant="body2">Phone: (123) 456-7890</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Student Information
                </Typography>
                <Typography variant="body1">
                  {selectedStudent?.name} ({selectedStudent?.id})
                </Typography>
                <Typography variant="body2">
                  Class: {selectedStudent?.class} {selectedStudent?.section}
                </Typography>
                <Typography variant="body2">Roll No: {selectedStudent?.rollNo}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Payment Information
                </Typography>
                <Typography variant="body2">
                  Payment Method: {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.name}
                </Typography>
                <Typography variant="body2">Transaction ID: TXN-{Date.now().toString().slice(-8)}</Typography>
                <Typography variant="body2">Session: {selectedSession}</Typography>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Fee Details
              </Typography>
              <Paper variant="outlined" sx={{ overflow: "auto" }}>
                <Box sx={{ minWidth: 500 }}>
                  <Box sx={{ display: "table", width: "100%" }}>
                    <Box sx={{ display: "table-header-group", bgcolor: "background.default" }}>
                      <Box sx={{ display: "table-row" }}>
                        <Typography sx={{ display: "table-cell", p: 2, fontWeight: "bold" }}>Fee Type</Typography>
                        <Typography sx={{ display: "table-cell", p: 2, fontWeight: "bold" }}>Amount</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "table-row-group" }}>
                      {selectedFees.map((fee) => (
                        <Box key={fee.id} sx={{ display: "table-row" }}>
                          <Typography sx={{ display: "table-cell", p: 2 }}>{fee.type}</Typography>
                          <Typography sx={{ display: "table-cell", p: 2 }}>${fee.amount.toLocaleString()}</Typography>
                        </Box>
                      ))}
                      {discountApplied && (
                        <Box sx={{ display: "table-row" }}>
                          <Typography sx={{ display: "table-cell", p: 2, color: "error.main" }}>
                            Discount ({discountApplied.name} - {discountApplied.percentage}%)
                          </Typography>
                          <Typography sx={{ display: "table-cell", p: 2, color: "error.main" }}>
                            -${calculateDiscount().toLocaleString()}
                          </Typography>
                        </Box>
                      )}
                      {applyLateFeePenalty && (
                        <Box sx={{ display: "table-row" }}>
                          <Typography sx={{ display: "table-cell", p: 2, color: "warning.main" }}>
                            Late Fee Penalty
                          </Typography>
                          <Typography sx={{ display: "table-cell", p: 2, color: "warning.main" }}>+$500</Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Paper>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Box sx={{ textAlign: "right", p: 2, bgcolor: "primary.lighter", borderRadius: 1 }}>
                  <Typography variant="subtitle1">Total Amount</Typography>
                  <Typography variant="h5" color="primary">
                    ${calculateTotal().toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography variant="body2" color="textSecondary">
                This is a computer-generated receipt and does not require a signature.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Thank you for your payment!
              </Typography>
            </Box>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReceiptDialogOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<Print />}>
            Print
          </Button>
          <Button variant="contained" color="primary" startIcon={<Download />}>
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={successSnackbar}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSuccessSnackbar(false)} severity="success" variant="filled" sx={{ width: "100%" }}>
          {activeStep === 3 ? "Receipt sent successfully!" : "Payment processed successfully!"}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default FeesCollectPage
