/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Chip,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  InputAdornment,
  Alert,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
  ThemeProvider,
  Fade,
} from "@mui/material"
import {
  CalendarMonth,
  School,
  Save,
  EventNote,
  DateRange,
  WorkOutline,
  Info,
  ArrowBack,
  HelpOutline,
  CalculateOutlined,
} from "@mui/icons-material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs, { Dayjs } from "dayjs"
import Link from "next/link"

export default function NewSession() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [sessionName, setSessionName] = useState("")
  const [isCurrent, setIsCurrent] = useState(false)
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [workingDays, setWorkingDays] = useState(0)
  const [holidays, setHolidays] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)



  const steps = ["Session Details", "Date Configuration", "Review & Save"]

  const calculateWorkingDays = () => {
    if (!startDate || !endDate) return

    const start = dayjs(startDate)
    const end = dayjs(endDate)
    const days = end.diff(start, "day")

    const weeks = Math.floor(days / 7)
    let businessDays = days - weeks * 2

    const extraDays = days % 7
    const startDay = start.day()

    for (let i = 0; i < extraDays; i++) {
      const day = (startDay + i) % 7
      if (day === 0 || day === 6) {
        businessDays--
      }
    }

    setWorkingDays(businessDays > 0 ? businessDays : 0)
  }


  const handleSave = () => {


    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const isNextDisabled = () => {
    if (activeStep === 0) return !sessionName
    if (activeStep === 1) return !startDate || !endDate
    return false
  }

  const formatDate = (date: any) => {
    if (!date) return "Not specified"
    return dayjs(date).format("MMMM D, YYYY")
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", borderRadius: 6 }}>
        <Container maxWidth="xl" sx={{ mt: 0, mb: 8, }}>
          <Fade in={true} timeout={800}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                  flexWrap: "wrap",
                  gap: 2,
                  paddingTop: 2
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <School sx={{ color: "black", mr: 2, fontSize: 28 }} />
                  <Typography variant="h5" component="h1" sx={{ color: "black", fontWeight: "bold", fontSize: 28 }}>
                    New Academic Session
                  </Typography>
                </Box>

                <Button
                  component={Link}
                  href="/dashboard/super_admin/section"
                  startIcon={<ArrowBack />}
                  sx={{ mr: 2 }}
                >
                  Back to Sections
                </Button>
              </Box>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <Paper
                    elevation={3}
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      background: "linear-gradient(to right, #f5f7fa, #ffffff)",
                    }}
                  >


                    <Box sx={{ p: 3 }}>
                      {showSuccess && (
                        <Alert severity="success" sx={{ mb: 3, animation: "fadeIn 0.5s" }} onClose={() => setShowSuccess(false)}>
                          Session saved successfully!
                        </Alert>
                      )}

                      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>

                      {activeStep === 0 && (
                        <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
                          <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                              <EventNote sx={{ mr: 1 }} color="primary" />
                              Session Information
                            </Typography>

                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <TextField
                                  label="Session Name"
                                  placeholder="e.g., Academic Year 2025-2026"
                                  fullWidth
                                  value={sessionName}
                                  onChange={(e) => setSessionName(e.target.value)}
                                  required
                                  variant="outlined"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <School color="action" />
                                      </InputAdornment>
                                    ),
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Tooltip title="Enter a descriptive name for this academic session">
                                          <HelpOutline color="action" fontSize="small" />
                                        </Tooltip>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={isCurrent}
                                      onChange={(e) => setIsCurrent(e.target.checked)}
                                      color="primary"
                                    />
                                  }
                                  label={
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                      <Typography>Set as current active session</Typography>
                                      <Tooltip title="Only one session can be active at a time. This will be used as the default session.">
                                        <Info fontSize="small" color="action" sx={{ ml: 1 }} />
                                      </Tooltip>
                                    </Box>
                                  }
                                />
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      )}

                      {activeStep === 1 && (
                        <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
                          <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                              <DateRange sx={{ mr: 1 }} color="primary" />
                              Session Timeline
                            </Typography>

                            <Grid container spacing={3}>
                              <Grid item xs={12} md={6}>
                                <DatePicker
                                  label="Start Date"
                                  value={startDate}
                                  onChange={(newValue) => {
                                    setStartDate(newValue)
                                    if (endDate) calculateWorkingDays()
                                  }}
                                  slotProps={{
                                    textField: {
                                      fullWidth: true,
                                      required: true,
                                      InputProps: {
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <CalendarMonth color="action" />
                                          </InputAdornment>
                                        ),
                                      },
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <DatePicker
                                  label="End Date"
                                  value={endDate}
                                  onChange={(newValue) => {
                                    setEndDate(newValue)
                                    if (startDate) calculateWorkingDays()
                                  }}
                                  slotProps={{
                                    textField: {
                                      fullWidth: true,
                                      required: true,
                                      InputProps: {
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <CalendarMonth color="action" />
                                          </InputAdornment>
                                        ),
                                      },
                                    },
                                  }}
                                  minDate={startDate ?? undefined}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  label="Total Working Days"
                                  value={workingDays}
                                  onChange={(e) => setWorkingDays(Number(e.target.value))}
                                  type="number"
                                  fullWidth
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <WorkOutline color="action" />
                                      </InputAdornment>
                                    ),
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Tooltip title="Calculate working days">
                                          <IconButton size="small" onClick={calculateWorkingDays} color="primary">
                                            <CalculateOutlined fontSize="small" />
                                          </IconButton>
                                        </Tooltip>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  label="Holidays"
                                  value={holidays}
                                  onChange={(e) => setHolidays(Number(e.target.value))}
                                  type="number"
                                  fullWidth
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <EventNote color="action" />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      )}

                      {activeStep === 2 && (
                        <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
                          <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: "flex", alignItems: "center" }}>
                              <Info sx={{ mr: 1 }} color="primary" />
                              Session Summary
                            </Typography>

                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
                                  <Typography variant="subtitle2" color="text.secondary">
                                    Session Name
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: "medium", mt: 1 }}>
                                    {sessionName || "Not specified"}
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
                                  <Typography variant="subtitle2" color="text.secondary">
                                    Status
                                  </Typography>
                                  <Box sx={{ mt: 1 }}>
                                    <Chip
                                      label={isCurrent ? "Current Active Session" : "Inactive Session"}
                                      color={isCurrent ? "success" : "default"}
                                      size="small"
                                    />
                                  </Box>
                                </Paper>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
                                  <Typography variant="subtitle2" color="text.secondary">
                                    Start Date
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: "medium", mt: 1 }}>
                                    {formatDate(startDate)}
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
                                  <Typography variant="subtitle2" color="text.secondary">
                                    End Date
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: "medium", mt: 1 }}>
                                    {formatDate(endDate)}
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
                                  <Typography variant="subtitle2" color="text.secondary">
                                    Working Days
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: "medium", mt: 1 }}>
                                    {workingDays} days
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
                                  <Typography variant="subtitle2" color="text.secondary">
                                    Holidays
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: "medium", mt: 1 }}>
                                    {holidays} days
                                  </Typography>
                                </Paper>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      )}

                      <Divider sx={{ my: 3 }} />

                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          startIcon={<ArrowBack />}
                          sx={{ visibility: activeStep === 0 ? "hidden" : "visible" }}
                        >
                          Back
                        </Button>
                        <Box>
                          {activeStep === steps.length - 1 ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleSave}
                              startIcon={<Save />}
                              size="large"
                              sx={{
                                px: 4,
                                boxShadow: "0 4px 10px rgba(63, 81, 181, 0.25)",
                                "&:hover": {
                                  boxShadow: "0 6px 15px rgba(63, 81, 181, 0.35)",
                                },
                              }}
                            >
                              Save Session
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleNext}
                              disabled={isNextDisabled()}
                              sx={{ px: 3 }}
                            >
                              Continue
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </div>
              </LocalizationProvider>

            </Box>
          </Fade >
        </Container>
      </Box>



    </ThemeProvider >




  )
}

