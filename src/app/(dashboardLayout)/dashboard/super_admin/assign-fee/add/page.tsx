/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import {
  AttachMoney as MoneyIcon,
  CalendarMonth as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Class as ClassIcon,
  Info as InfoIcon,
  Receipt as ReceiptIcon,
  Save as SaveIcon,
  School as SchoolIcon,
  Search as SearchIcon,
} from "@mui/icons-material"
import { ThemeProvider, createTheme, alpha } from "@mui/material/styles"

// Create a custom theme with primary color as teal/green
const theme = createTheme({
  palette: {
    primary: {
      main: "#00897b",
      light: "#4ebaaa",
      dark: "#005b4f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#5c6bc0",
      light: "#8e99f3",
      dark: "#26418f",
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
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontWeight: 500,
        },
      },
    },
  },
})

// Sample data for fees
const feeTypes = [
  { id: 1, name: "Tuition Fee", amount: 5000, frequency: "Monthly", description: "Regular tuition fee" },
  { id: 2, name: "Admission Fee", amount: 10000, frequency: "One-time", description: "One-time admission fee" },
  { id: 3, name: "Examination Fee", amount: 2000, frequency: "Term", description: "Term examination fee" },
  { id: 4, name: "Library Fee", amount: 1000, frequency: "Annual", description: "Annual library fee" },
  { id: 5, name: "Sports Fee", amount: 1500, frequency: "Annual", description: "Annual sports fee" },
  { id: 6, name: "Computer Lab Fee", amount: 2000, frequency: "Monthly", description: "Monthly computer lab fee" },
  { id: 7, name: "Transportation Fee", amount: 3000, frequency: "Monthly", description: "Monthly transportation fee" },
  { id: 8, name: "Development Fee", amount: 5000, frequency: "Annual", description: "Annual development fee" },
]

// Sample data for classes
const classes = [
  { id: 1, name: "Nursery", section: "A", students: 25 },
  { id: 2, name: "KG", section: "A", students: 30 },
  { id: 3, name: "Class 1", section: "A", students: 35 },
  { id: 4, name: "Class 1", section: "B", students: 32 },
  { id: 5, name: "Class 2", section: "A", students: 38 },
  { id: 6, name: "Class 2", section: "B", students: 36 },
  { id: 7, name: "Class 3", section: "A", students: 40 },
  { id: 8, name: "Class 3", section: "B", students: 38 },
  { id: 9, name: "HIFZ", section: "A", students: 20 },
]

// Sample data for sessions
const sessions = [
  { id: 1, name: "2023-2024", current: false },
  { id: 2, name: "2024-2025", current: true },
  { id: 3, name: "2025-2026", current: false },
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

// Format date function to replace date-fns dependency
const formatDate = (date: Date | null): string => {
  if (!date) return "N/A"

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  return new Intl.DateTimeFormat("en-US", options).format(date)
}

export default function AssignFeePage() {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedFees, setSelectedFees] = useState<number[]>([])
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSession, setSelectedSession] = useState("")
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [endDate, setEndDate] = useState<string>("")
  const [sendNotification, setSendNotification] = useState(true)
  const [applyDiscount, setApplyDiscount] = useState(false)
  const [discountAmount, setDiscountAmount] = useState("")
  const [isPercent, setIsPercent] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFees = feeTypes.filter((fee) => fee.name.toLowerCase().includes(searchTerm.toLowerCase()))


  const handleFeeSelection = (feeId: number) => {
    if (selectedFees.includes(feeId)) {
      setSelectedFees(selectedFees.filter((id) => id !== feeId))
    } else {
      setSelectedFees([...selectedFees, feeId])
    }
  }


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }


  const handleSubmit = () => {
    setActiveStep(3)
  }


  const calculateTotalFee = () => {
    return feeTypes.filter((fee) => selectedFees.includes(fee.id)).reduce((total, fee) => total + fee.amount, 0)
  }
  const calculateDiscountedAmount = () => {
    const totalFee = calculateTotalFee()
    if (!applyDiscount || !discountAmount) return totalFee

    const discount = Number.parseFloat(discountAmount)
    if (isPercent) {
      return totalFee - (totalFee * discount) / 100
    } else {
      return totalFee - discount
    }
  }

  // Get selected class details
  const getSelectedClassDetails = () => {
    return classes.find((cls) => cls.id.toString() === selectedClass)
  }

  // Steps for the stepper
  const steps = ["Select Fees", "Choose Class & Session", "Set Duration & Options", "Confirmation"]

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: 4,
          background: "linear-gradient(to bottom, #e0f2f1, #ffffff)",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" color="text.primary" gutterBottom>
                  Assign Fees
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Create and assign fee structures to classes and students
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" startIcon={<ReceiptIcon />} href="/fees/list">
                    View Fee Assignments
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Card>
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MoneyIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">New Fee Assignment</Typography>
                </Box>
              }
              subheader="Complete all steps to assign fees to a class"
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                backgroundImage: "linear-gradient(to right, #00897b, #4db6ac)",
                "& .MuiCardHeader-subheader": { color: "rgba(255, 255, 255, 0.8)" },
              }}
            />
            <CardContent sx={{ p: 4 }}>
              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {activeStep === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Select Fee Types
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Choose one or more fee types to assign to the class
                  </Typography>

                  <TextField
                    fullWidth
                    placeholder="Search fees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />

                  <Grid container spacing={2}>
                    {filteredFees.map((fee) => (
                      <Grid item xs={12} sm={6} md={4} key={fee.id}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            border: "1px solid",
                            borderColor: selectedFees.includes(fee.id) ? "primary.main" : "divider",
                            borderRadius: 2,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            bgcolor: selectedFees.includes(fee.id)
                              ? alpha(theme.palette.primary.main, 0.1)
                              : "background.paper",
                            "&:hover": {
                              borderColor: "primary.main",
                              boxShadow: "0 4px 10px rgba(0,0,0,0.07)",
                            },
                          }}
                          onClick={() => handleFeeSelection(fee.id)}
                        >
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={500}>
                                {fee.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {formatCurrency(fee.amount)} • {fee.frequency}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                                {fee.description}
                              </Typography>
                            </Box>
                            <Checkbox
                              checked={selectedFees.includes(fee.id)}
                              color="primary"
                              sx={{ ml: 1, mt: -0.5 }}
                            />
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                    {filteredFees.length === 0 && (
                      <Grid item xs={12}>
                        <Paper sx={{ p: 3, textAlign: "center" }}>
                          <Typography variant="subtitle1" color="text.secondary">
                            No fees found matching your search
                          </Typography>
                          <Button variant="text" onClick={() => setSearchTerm("")} sx={{ mt: 1 }}>
                            Clear Search
                          </Button>
                        </Paper>
                      </Grid>
                    )}
                  </Grid>

                  {selectedFees.length > 0 && (
                    <Paper
                      elevation={0}
                      sx={{
                        mt: 3,
                        p: 2,
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "success.light",
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                          <Typography variant="subtitle1" color="success.main">
                            {selectedFees.length} fee type{selectedFees.length > 1 ? "s" : ""} selected
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total amount: {formatCurrency(calculateTotalFee())}
                          </Typography>
                        </Box>
                        <Button variant="outlined" color="error" size="small" onClick={() => setSelectedFees([])}>
                          Clear All
                        </Button>
                      </Box>
                    </Paper>
                  )}
                </Box>
              )}

              {activeStep === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Choose Class and Session
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Select the class and academic session for fee assignment
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="class-select-label">Select Class</InputLabel>
                        <Select
                          labelId="class-select-label"
                          id="class-select"
                          value={selectedClass}
                          label="Select Class"
                          onChange={(e) => setSelectedClass(e.target.value)}
                          startAdornment={
                            <InputAdornment position="start">
                              <ClassIcon fontSize="small" />
                            </InputAdornment>
                          }
                        >
                          {classes.map((cls) => (
                            <MenuItem key={cls.id} value={cls.id.toString()}>
                              {cls.name} - Section {cls.section} ({cls.students} students)
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="session-select-label">Select Session</InputLabel>
                        <Select
                          labelId="session-select-label"
                          id="session-select"
                          value={selectedSession}
                          label="Select Session"
                          onChange={(e) => setSelectedSession(e.target.value)}
                          startAdornment={
                            <InputAdornment position="start">
                              <SchoolIcon fontSize="small" />
                            </InputAdornment>
                          }
                        >
                          {sessions.map((session) => (
                            <MenuItem key={session.id} value={session.id.toString()}>
                              {session.name} {session.current && "(Current)"}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {selectedClass && selectedSession && (
                    <Paper
                      elevation={0}
                      sx={{
                        mt: 3,
                        p: 2,
                        bgcolor: alpha(theme.palette.info.main, 0.1),
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "info.light",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <InfoIcon color="info" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          You are assigning fees to{" "}
                          <Typography component="span" fontWeight={500} color="text.primary">
                            {getSelectedClassDetails()?.name} - Section {getSelectedClassDetails()?.section}
                          </Typography>{" "}
                          for the academic session{" "}
                          <Typography component="span" fontWeight={500} color="text.primary">
                            {sessions.find((s) => s.id.toString() === selectedSession)?.name}
                          </Typography>
                        </Typography>
                      </Box>
                    </Paper>
                  )}
                </Box>
              )}

              {activeStep === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Set Duration and Options
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Define the fee applicable period and additional options
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Fee Applicable From"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Fee End Date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                        Additional Options
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={sendNotification}
                            onChange={(e) => setSendNotification(e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2">Send notification to parents</Typography>
                            <Typography variant="caption" color="text.secondary">
                              Parents will be notified about the new fee assignment
                            </Typography>
                          </Box>
                        }
                        sx={{ ml: 0 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={applyDiscount}
                            onChange={(e) => setApplyDiscount(e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2">Apply discount</Typography>
                            <Typography variant="caption" color="text.secondary">
                              Apply a discount to the total fee amount
                            </Typography>
                          </Box>
                        }
                        sx={{ ml: 0 }}
                      />
                    </Grid>

                    {applyDiscount && (
                      <Grid item xs={12}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: alpha(theme.palette.warning.main, 0.1),
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="subtitle2" color="warning.dark" gutterBottom>
                            Discount Settings
                          </Typography>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Discount Amount"
                                value={discountAmount}
                                onChange={(e) => setDiscountAmount(e.target.value)}
                                type="number"
                                disabled={!applyDiscount}
                                InputProps={{
                                  endAdornment: <InputAdornment position="end">{isPercent ? "%" : "$"}</InputAdornment>,
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={isPercent}
                                    onChange={(e) => setIsPercent(e.target.checked)}
                                    color="primary"
                                    disabled={!applyDiscount}
                                  />
                                }
                                label="Percentage discount"
                              />
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              )}

              {activeStep === 3 && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      mb: 3,
                    }}
                  >
                    <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h5" color="success.main" gutterBottom>
                      Fee Assignment Successful!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center">
                      The fees have been successfully assigned to the selected class.
                    </Typography>
                  </Box>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      mb: 3,
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      Assignment Summary
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Class:
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {getSelectedClassDetails()?.name} - Section {getSelectedClassDetails()?.section}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Academic Session:
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {sessions.find((s) => s.id.toString() === selectedSession)?.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Fee Period:
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {startDate ? new Date(startDate).toLocaleDateString() : "N/A"} to{" "}
                          {endDate ? new Date(endDate).toLocaleDateString() : "N/A"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Total Students:
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {getSelectedClassDetails()?.students}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" gutterBottom>
                          Assigned Fees:
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                          {feeTypes
                            .filter((fee) => selectedFees.includes(fee.id))
                            .map((fee) => (
                              <Chip
                                key={fee.id}
                                label={`${fee.name} (${formatCurrency(fee.amount)})`}
                                color="primary"
                                variant="outlined"
                                size="small"
                              />
                            ))}
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Total Fee Amount:
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {formatCurrency(calculateTotalFee())}
                        </Typography>
                      </Grid>
                      {applyDiscount && discountAmount && (
                        <>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              Discount Applied:
                            </Typography>
                            <Typography variant="body1" fontWeight={500} color="error.main">
                              {isPercent ? `${discountAmount}%` : formatCurrency(Number.parseFloat(discountAmount))}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              Final Amount:
                            </Typography>
                            <Typography variant="h6" fontWeight={600} color="primary.main">
                              {formatCurrency(calculateDiscountedAmount())}
                            </Typography>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Paper>

                  <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button variant="outlined" href="/fees/list">
                      View All Fee Assignments
                    </Button>
                    <Button variant="contained" href="/fees/assign">
                      Create Another Assignment
                    </Button>
                  </Box>
                </Box>
              )}

              {activeStep !== 3 && (
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                  <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={activeStep === 2 ? handleSubmit : handleNext}
                    disabled={
                      (activeStep === 0 && selectedFees.length === 0) ||
                      (activeStep === 1 && (!selectedClass || !selectedSession)) ||
                      (activeStep === 2 && !startDate)
                    }
                    startIcon={activeStep === 2 ? <SaveIcon /> : undefined}
                  >
                    {activeStep === 2 ? "Assign Fees" : "Continue"}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
