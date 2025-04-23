/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Divider,
  IconButton,
  InputAdornment,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material"
import {
  Save,
  ArrowBack,
  Help,
  Info,
  AttachMoney,
  Percent,
  CalendarMonth,
  AccessTime,
  EventNote,
  School,
  Class,
  ExpandMore,
  CheckCircle,
  Warning,
  Lightbulb,
  Settings,
  Preview,
} from "@mui/icons-material"

// Sample data for classes and sections
const classes = [
  { id: 1, name: "Class 1" },
  { id: 2, name: "Class 2" },
  { id: 3, name: "Class 3" },
  { id: 4, name: "Class 4" },
  { id: 5, name: "Class 5" },
  { id: 6, name: "Class 6" },
  { id: 7, name: "Class 7" },
  { id: 8, name: "Class 8" },
  { id: 9, name: "Class 9" },
  { id: 10, name: "Class 10" },
]

const sections = [
  { id: 1, name: "Section A" },
  { id: 2, name: "Section B" },
  { id: 3, name: "Section C" },
]

// Sample fine categories
const fineCategories = [
  { id: 1, name: "Late Payment", description: "Fine for late payment of fees" },
  { id: 2, name: "Absence", description: "Fine for unauthorized absence" },
  { id: 3, name: "Discipline", description: "Fine for disciplinary issues" },
  { id: 4, name: "Library", description: "Fine for late return of library books" },
  { id: 5, name: "Damage", description: "Fine for damaging school property" },
  { id: 6, name: "Uniform", description: "Fine for improper uniform" },
  { id: 7, name: "Other", description: "Other types of fines" },
]

export default function FineTypeAdd() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"))

  // State for form fields
  const [fineName, setFineName] = useState("")
  const [fineDescription, setFineDescription] = useState("")
  const [fineCategory, setFineCategory] = useState<number | "">("")
  const [isPercentage, setIsPercentage] = useState(false)
  const [fineAmount, setFineAmount] = useState("")
  const [isAbsentFine, setIsAbsentFine] = useState(false)
  const [hasDueDate, setHasDueDate] = useState(false)
  const [gracePeriod, setGracePeriod] = useState(0)
  const [dueDate, setDueDate] = useState<string>("")
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurringFrequency, setRecurringFrequency] = useState("monthly")
  const [isActive, setIsActive] = useState(true)
  const [applyToAll, setApplyToAll] = useState(true)
  const [selectedClasses, setSelectedClasses] = useState<number[]>([])
  const [selectedSections, setSelectedSections] = useState<number[]>([])
  const [notificationEnabled, setNotificationEnabled] = useState(true)
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [fineIncreaseEnabled, setFineIncreaseEnabled] = useState(false)
  const [fineIncreaseRate, setFineIncreaseRate] = useState(5)
  const [fineIncreaseFrequency, setFineIncreaseFrequency] = useState("weekly")
  const [maxFineAmount, setMaxFineAmount] = useState("")
  const [fineApplicationMethod, setFineApplicationMethod] = useState("immediate")

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Handle save
  const handleSave = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }, 1500)
  }

  // Toggle preview mode
  const togglePreview = () => {
    setPreviewMode(!previewMode)
  }

  // Handle class selection
  const handleClassToggle = (classId: number) => {
    setSelectedClasses((prev) => (prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId]))
  }

  // Handle section selection
  const handleSectionToggle = (sectionId: number) => {
    setSelectedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  // Get class by ID
  const getClassById = (id: number) => {
    return classes.find((cls) => cls.id === id)
  }

  // Get section by ID
  const getSectionById = (id: number) => {
    return sections.find((section) => section.id === id)
  }

  // Get category by ID
  const getCategoryById = (id: number) => {
    return fineCategories.find((category) => category.id === id)
  }

  // Steps for the stepper
  const steps = [
    {
      label: "Basic Information",
      description: "Enter the basic details of the fine type",
      content: (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Fine Type Name"
              variant="outlined"
              fullWidth
              value={fineName}
              onChange={(e) => setFineName(e.target.value)}
              required
              placeholder="Enter a descriptive name for the fine type"
              InputProps={{
                startAdornment: <AttachMoney sx={{ mr: 1, color: "text.secondary" }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={fineDescription}
              onChange={(e) => setFineDescription(e.target.value)}
              placeholder="Enter a detailed description of this fine type"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Fine Category</InputLabel>
              <Select
                value={fineCategory}
                onChange={(e) => setFineCategory(e.target.value as number)}
                label="Fine Category"
              >
                {fineCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} color="primary" />}
              label="Active Status"
            />
            <Tooltip title="If turned off, this fine type will not be applied to any student">
              <IconButton size="small">
                <Info fontSize="small" color="primary" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ bgcolor: "#f5f5f5", p: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <Lightbulb sx={{ mr: 1, color: theme.palette.warning.main }} />
                Fine Type Examples
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 1.5, bgcolor: "#e8f5e9" }}>
                    <Typography variant="subtitle2" color="primary">
                      Late Fee Payment
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      5% of total fee amount
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 1.5, bgcolor: "#e3f2fd" }}>
                    <Typography variant="subtitle2" color="primary">
                      Library Book Late Return
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹10 per day after due date
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 1.5, bgcolor: "#fff8e1" }}>
                    <Typography variant="subtitle2" color="primary">
                      Absence Fine
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹50 per day of unauthorized absence
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Fine Amount Configuration",
      description: "Configure the amount and calculation method",
      content: (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Fine Calculation Method
                </Typography>
                <RadioGroup
                  value={isPercentage ? "percentage" : "fixed"}
                  onChange={(e) => setIsPercentage(e.target.value === "percentage")}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          border: "1px solid",
                          borderColor: isPercentage ? "primary.main" : "divider",
                          bgcolor: isPercentage ? "rgba(25, 118, 210, 0.08)" : "transparent",
                        }}
                      >
                        <FormControlLabel
                          value="percentage"
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center" }}>
                                <Percent sx={{ mr: 1, fontSize: 20 }} /> Percentage Based
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Calculate fine as a percentage of the base amount
                              </Typography>
                            </Box>
                          }
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          border: "1px solid",
                          borderColor: !isPercentage ? "primary.main" : "divider",
                          bgcolor: !isPercentage ? "rgba(25, 118, 210, 0.08)" : "transparent",
                        }}
                      >
                        <FormControlLabel
                          value="fixed"
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center" }}>
                                <AttachMoney sx={{ mr: 1, fontSize: 20 }} /> Fixed Amount
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Set a specific fixed amount for the fine
                              </Typography>
                            </Box>
                          }
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </RadioGroup>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label={isPercentage ? "Fine Percentage" : "Fine Amount"}
              variant="outlined"
              fullWidth
              value={fineAmount}
              onChange={(e) => setFineAmount(e.target.value)}
              required
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{isPercentage ? <Percent /> : <AttachMoney />}</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch checked={isAbsentFine} onChange={(e) => setIsAbsentFine(e.target.checked)} color="primary" />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1">Absence Related Fine</Typography>
                  <Tooltip title="Enable if this fine is related to student absences">
                    <IconButton size="small">
                      <Info fontSize="small" color="primary" />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Accordion
              expanded={showAdvancedOptions}
              onChange={() => setShowAdvancedOptions(!showAdvancedOptions)}
              sx={{ bgcolor: "#f8f9fa" }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  <Settings sx={{ mr: 1, fontSize: 20 }} /> Advanced Fine Configuration
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={fineIncreaseEnabled}
                          onChange={(e) => setFineIncreaseEnabled(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Enable Progressive Fine Increase"
                    />
                    <Tooltip title="Fine amount will increase over time if not paid">
                      <IconButton size="small">
                        <Info fontSize="small" color="primary" />
                      </IconButton>
                    </Tooltip>
                  </Grid>

                  {fineIncreaseEnabled && (
                    <>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Increase Frequency</InputLabel>
                          <Select
                            value={fineIncreaseFrequency}
                            onChange={(e) => setFineIncreaseFrequency(e.target.value)}
                            label="Increase Frequency"
                          >
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography gutterBottom>Increase Rate: {fineIncreaseRate}%</Typography>
                        <Slider
                          value={fineIncreaseRate}
                          onChange={(e, newValue) => setFineIncreaseRate(newValue as number)}
                          aria-labelledby="fine-increase-rate-slider"
                          valueLabelDisplay="auto"
                          step={1}
                          marks
                          min={1}
                          max={20}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Maximum Fine Amount"
                          variant="outlined"
                          fullWidth
                          value={maxFineAmount}
                          onChange={(e) => setMaxFineAmount(e.target.value)}
                          type="number"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {isPercentage ? <Percent /> : <AttachMoney />}
                              </InputAdornment>
                            ),
                          }}
                          helperText="Leave empty for no maximum limit"
                        />
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      Fine Application Method
                    </Typography>
                    <RadioGroup
                      value={fineApplicationMethod}
                      onChange={(e) => setFineApplicationMethod(e.target.value)}
                      row
                    >
                      <FormControlLabel
                        value="immediate"
                        control={<Radio />}
                        label="Apply Immediately"
                        sx={{ mr: 4 }}
                      />
                      <FormControlLabel value="next_bill" control={<Radio />} label="Add to Next Bill" sx={{ mr: 4 }} />
                      <FormControlLabel value="manual" control={<Radio />} label="Apply Manually" />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Due Date & Schedule",
      description: "Configure due dates and scheduling options",
      content: (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch checked={hasDueDate} onChange={(e) => setHasDueDate(e.target.checked)} color="primary" />
              }
              label="Enable Due Date"
            />
          </Grid>

          {hasDueDate && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Due Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  InputProps={{
                    startAdornment: <CalendarMonth sx={{ mr: 1, color: "text.secondary" }} />,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Grace Period (Days)"
                  variant="outlined"
                  fullWidth
                  value={gracePeriod}
                  onChange={(e) => setGracePeriod(Number(e.target.value))}
                  type="number"
                  InputProps={{
                    startAdornment: <AccessTime sx={{ mr: 1, color: "text.secondary" }} />,
                  }}
                  helperText="Number of days after due date before fine is applied"
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} color="primary" />
              }
              label="Recurring Fine"
            />
            <Tooltip title="Enable if this fine should be applied repeatedly on a schedule">
              <IconButton size="small">
                <Info fontSize="small" color="primary" />
              </IconButton>
            </Tooltip>
          </Grid>

          {isRecurring && (
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Recurring Frequency</InputLabel>
                <Select
                  value={recurringFrequency}
                  onChange={(e) => setRecurringFrequency(e.target.value)}
                  label="Recurring Frequency"
                  startAdornment={<EventNote sx={{ mr: 1, color: "text.secondary" }} />}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="quarterly">Quarterly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12}>
            <Card variant="outlined" sx={{ bgcolor: "#fff8e1", p: 2 }}>
              <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center", color: "#f57f17" }}>
                <Warning sx={{ mr: 1, fontSize: 20 }} /> Important Note
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {hasDueDate
                  ? "Fine will be applied after the due date plus any grace period. Make sure to set appropriate dates."
                  : "Without a due date, this fine will be applied immediately when assigned to a student."}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Applicability",
      description: "Select which classes and sections this fine applies to",
      content: (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch checked={applyToAll} onChange={(e) => setApplyToAll(e.target.checked)} color="primary" />
              }
              label="Apply to All Classes and Sections"
            />
          </Grid>

          {!applyToAll && (
            <>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Select Classes
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, maxHeight: 200, overflow: "auto" }}>
                  {classes.map((cls) => (
                    <FormControlLabel
                      key={cls.id}
                      control={
                        <Checkbox
                          checked={selectedClasses.includes(cls.id)}
                          onChange={() => handleClassToggle(cls.id)}
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <School sx={{ mr: 1, fontSize: 20, color: "text.secondary" }} />
                          {cls.name}
                        </Box>
                      }
                    />
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Select Sections
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, maxHeight: 200, overflow: "auto" }}>
                  {sections.map((section) => (
                    <FormControlLabel
                      key={section.id}
                      control={
                        <Checkbox
                          checked={selectedSections.includes(section.id)}
                          onChange={() => handleSectionToggle(section.id)}
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Class sx={{ mr: 1, fontSize: 20, color: "text.secondary" }} />
                          {section.name}
                        </Box>
                      }
                    />
                  ))}
                </Paper>
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationEnabled}
                  onChange={(e) => setNotificationEnabled(e.target.checked)}
                  color="primary"
                />
              }
              label="Send Notification to Parents/Students"
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              When enabled, an automatic notification will be sent to parents and students when this fine is applied.
            </Typography>
          </Grid>
        </Grid>
      ),
    },
  ]

  return (
    <Box sx={{ p: 3, maxWidth: "100%" }}>
      {/* Header Section */}
      <Card elevation={3} sx={{ mb: 4, borderRadius: 2, overflow: "hidden" }}>
        <Box
          sx={{
            p: 2,
            background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
            color: "white",
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" fontWeight="bold">
                Craft International Institute
              </Typography>
              <Typography variant="subtitle1">Create New Fine Type</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
                href="/dashboard/super_admin/contact/list"
              >
                Back to Fine Types
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Form Section */}
        <Grid item xs={12} md={previewMode ? 6 : 12}>
          <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              {!previewMode && (
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                  <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
                    <AttachMoney sx={{ mr: 1, color: "#3f51b5" }} />
                    Create New Fine Type
                  </Typography>
                  <Button variant="outlined" startIcon={<Preview />} onClick={togglePreview} disabled={!fineName}>
                    Preview
                  </Button>
                </Box>
              )}

              {previewMode ? (
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                  <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
                    <Preview sx={{ mr: 1, color: "#3f51b5" }} />
                    Preview Mode
                  </Typography>
                  <Button variant="outlined" startIcon={<Edit />} onClick={togglePreview}>
                    Edit
                  </Button>
                </Box>
              ) : (
                <Stepper activeStep={activeStep} orientation={isMobile ? "vertical" : "horizontal"}>
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        optional={isMobile ? <Typography variant="caption">{step.description}</Typography> : null}
                      >
                        {step.label}
                      </StepLabel>
                      {isMobile && <StepContent>{step.content}</StepContent>}
                    </Step>
                  ))}
                </Stepper>
              )}

              {!isMobile && !previewMode && <Box sx={{ mt: 4 }}>{steps[activeStep].content}</Box>}

              {!previewMode && (
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                  <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0} startIcon={<ArrowBack />}>
                    Back
                  </Button>
                  <Box>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={loading || !fineName}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                        sx={{ minWidth: 150 }}
                      >
                        {loading ? "Saving..." : "Save Fine Type"}
                      </Button>
                    ) : (
                      <Button variant="contained" onClick={handleNext} disabled={!fineName} endIcon={<ArrowForward />}>
                        Next
                      </Button>
                    )}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Preview Section */}
        {previewMode && (
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
              <CardContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    {fineName || "Fine Type Name"}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    {fineCategory && (
                      <Chip
                        label={getCategoryById(fineCategory as number)?.name || "Category"}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    <Chip
                      label={isPercentage ? "Percentage Based" : "Fixed Amount"}
                      size="small"
                      color="primary"
                      variant="outlined"
                      icon={isPercentage ? <Percent /> : <AttachMoney />}
                    />
                    {isAbsentFine && <Chip label="Absence Related" size="small" color="warning" variant="outlined" />}
                    {isActive ? (
                      <Chip label="Active" size="small" color="success" variant="outlined" icon={<CheckCircle />} />
                    ) : (
                      <Chip label="Inactive" size="small" color="error" variant="outlined" />
                    )}
                    {hasDueDate && (
                      <Chip
                        label="Has Due Date"
                        size="small"
                        color="info"
                        variant="outlined"
                        icon={<CalendarMonth />}
                      />
                    )}
                  </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Typography variant="subtitle1" gutterBottom>
                  Description
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "background.default", minHeight: 80 }}>
                  <Typography variant="body1">{fineDescription || "No description provided."}</Typography>
                </Paper>

                <Typography variant="subtitle1" gutterBottom>
                  Fine Details
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "background.default" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Calculation Method:
                      </Typography>
                      <Typography variant="body1">{isPercentage ? "Percentage Based" : "Fixed Amount"}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        {isPercentage ? "Percentage:" : "Amount:"}
                      </Typography>
                      <Typography variant="body1">
                        {isPercentage ? `${fineAmount}%` : `₹${fineAmount || "0"}`}
                      </Typography>
                    </Grid>
                    {fineIncreaseEnabled && (
                      <>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Progressive Increase:
                          </Typography>
                          <Typography variant="body1">
                            {fineIncreaseRate}% {fineIncreaseFrequency}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Maximum Amount:
                          </Typography>
                          <Typography variant="body1">
                            {maxFineAmount ? (isPercentage ? `${maxFineAmount}%` : `₹${maxFineAmount}`) : "No limit"}
                          </Typography>
                        </Grid>
                      </>
                    )}
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Application Method:
                      </Typography>
                      <Typography variant="body1">
                        {fineApplicationMethod === "immediate"
                          ? "Apply Immediately"
                          : fineApplicationMethod === "next_bill"
                            ? "Add to Next Bill"
                            : "Apply Manually"}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Absence Related:
                      </Typography>
                      <Typography variant="body1">{isAbsentFine ? "Yes" : "No"}</Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {hasDueDate && (
                  <>
                    <Typography variant="subtitle1" gutterBottom>
                      Due Date & Schedule
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "background.default" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Due Date:
                          </Typography>
                          <Typography variant="body1">
                            {dueDate ? new Date(dueDate).toLocaleDateString() : "Not specified"}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Grace Period:
                          </Typography>
                          <Typography variant="body1">{gracePeriod} days</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Recurring:
                          </Typography>
                          <Typography variant="body1">{isRecurring ? "Yes" : "No"}</Typography>
                        </Grid>
                        {isRecurring && (
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Frequency:
                            </Typography>
                            <Typography variant="body1">
                              {recurringFrequency.charAt(0).toUpperCase() + recurringFrequency.slice(1)}
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    </Paper>
                  </>
                )}

                <Typography variant="subtitle1" gutterBottom>
                  Applicability
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "background.default" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Applied To:
                      </Typography>
                      <Typography variant="body1">
                        {applyToAll
                          ? "All Classes and Sections"
                          : selectedClasses.length > 0 || selectedSections.length > 0
                            ? "Selected Classes and Sections"
                            : "None Selected"}
                      </Typography>
                    </Grid>
                    {!applyToAll && selectedClasses.length > 0 && (
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          Classes:
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                          {selectedClasses.map((classId) => (
                            <Chip key={classId} label={getClassById(classId)?.name} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </Grid>
                    )}
                    {!applyToAll && selectedSections.length > 0 && (
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          Sections:
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                          {selectedSections.map((sectionId) => (
                            <Chip
                              key={sectionId}
                              label={getSectionById(sectionId)?.name}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Notifications:
                      </Typography>
                      <Typography variant="body1">{notificationEnabled ? "Enabled" : "Disabled"}</Typography>
                    </Grid>
                  </Grid>
                </Paper>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                  <Button variant="outlined" startIcon={<Edit />} onClick={togglePreview}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                  >
                    {loading ? "Saving..." : "Save Fine Type"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Help Card */}
      <Card elevation={1} sx={{ mt: 4, borderRadius: 2, bgcolor: "#f5f5f5" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Help sx={{ mr: 2, color: "text.secondary" }} />
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Tips for Creating Effective Fine Types
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Use clear and descriptive names for fine types
                <br />• Set reasonable fine amounts that align with institutional policies
                <br />• Consider using percentage-based fines for fee-related penalties
                <br />• Add appropriate grace periods to allow students time to comply
                <br />• Enable notifications to ensure students and parents are informed
                <br />• Review fine types periodically to ensure they remain effective
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Success Notification */}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Fine type successfully saved!
        </Alert>
      </Snackbar>
    </Box>
  )
}

// Missing icon imports
const ArrowForward = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  )
}

const Edit = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  )
}
