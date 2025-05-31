/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Grid,
  Divider,
  Alert,
  Avatar,
  Card,
  CardContent,
  InputAdornment,
  ThemeProvider,
  createTheme,
  StepConnector,
  styled,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import {
  Person,
  School,
  Group, // Replace Family with Group
  Description,
  CalendarMonth,
  Email,
  Phone,
  Home,
  LocationCity,
  Flag,
  Cake,
  Work,
  Upload,
  Check,
  ArrowForward,
  ArrowBack,
  AttachMoney,
  CreditCard,
  Receipt,
  LocalOffer,
  AccountBalance,
} from "@mui/icons-material"

// Custom styled components
const FormCard = styled(Card)(({ theme }) => ({
  overflow: "visible",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
    transform: "translateY(-5px)",
  },
}))

const StyledStepConnector = styled(StepConnector)(({ theme }) => ({
  "&.MuiStepConnector-root": {
    top: "12px",
  },
  "& .MuiStepConnector-line": {
    borderColor: theme.palette.primary.main,
    borderTopWidth: 3,
  },
}))

const StyledStepIcon = styled("div")<{ ownerState: { active?: boolean; completed?: boolean } }>(
  ({ theme, ownerState }) => ({
    display: "flex",
    height: 30,
    width: 30,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    background: ownerState.active
      ? theme.palette.primary.main
      : ownerState.completed
        ? theme.palette.success.main
        : theme.palette.grey[300],
    color: ownerState.active || ownerState.completed ? "#fff" : theme.palette.text.primary,
    zIndex: 1,
    transition: "all 0.3s ease",
  }),
)

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  padding: "10px 25px",
  fontWeight: "bold",
  textTransform: "none",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
  },
}))

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // Indigo
    },
    secondary: {
      main: "#f50057", // Pink
    },
    success: {
      main: "#4caf50", // Green
    },
    background: {
      default: "#f5f7ff",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            "&:hover fieldset": {
              borderColor: "#3f51b5",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
  },
})

// Step icons
function StepIconComponent(props: { icon: React.ReactNode; active?: boolean; completed?: boolean }) {
  const { active, completed, icon } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <Person />,
    2: <Group />, // Changed from Family to Group
    3: <School />,
    4: <AttachMoney />,
    5: <Description />,
  }

  return (
    <StyledStepIcon ownerState={{ active, completed }}>{completed ? <Check /> : icons[String(icon)]}</StyledStepIcon>
  )
}

const steps = [
  {
    label: "Student Information",
    icon: <Person />,
  },
  {
    label: "Parent/Guardian Details",
    icon: <Group />, // Changed from Family to Group
  },
  {
    label: "Academic Background",
    icon: <School />,
  },
  {
    label: "Fee Information",
    icon: <AttachMoney />,
  },
  {
    label: "Documents & Submission",
    icon: <Description />,
  },
]

export default function AdmissionForm() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    // Student Information
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "", // Changed to string to avoid date-fns issues
    gender: "",
    admissionClass: "8", // New field for class
    section: "", // New field for section
    religion: "",
    nationality: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    email: "",

    // Parent/Guardian Information
    fatherName: "",
    fatherOccupation: "",
    fatherPhone: "",
    fatherEmail: "",
    motherName: "",
    motherOccupation: "",
    motherPhone: "",
    motherEmail: "",
    guardianName: "",
    guardianRelation: "",
    guardianPhone: "",
    guardianEmail: "",

    // Academic Background
    previousSchool: "",
    previousClass: "",
    previousPercentage: "",
    yearOfPassing: "",
    reasonForLeaving: "",

    // Fee Information
    paymentPlan: "full", // full, installment
    scholarshipApplied: false,
    scholarshipType: "",
    paymentMethod: "",
    agreeToFeeTerms: false,

    // Fee Collection
    admissionFeeCollected: "",
    tuitionFeeCollected: "",
    developmentFeeCollected: "",
    otherFeesCollected: "",
    feeRemarks: "",
    receiptNumber: "",
    paymentDate: "",

    // Documents & Submission
    birthCertificate: false,
    transferCertificate: false,
    characterCertificate: false,
    markSheet: false,
    medicalCertificate: false,
    photographs: false,
    termsAccepted: false,
  })

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name as string]: value,
    })

    // Clear error when field is changed
    if (errors[name as string]) {
      setErrors({
        ...errors,
        [name as string]: "",
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 0) {
      // Validate Student Information
      if (!formData.firstName) newErrors.firstName = "First name is required"
      // if (!formData.lastName) newErrors.lastName = "Last name is required"
      // if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
      // if (!formData.gender) newErrors.gender = "Gender is required"
      // if (!formData.admissionClass) newErrors.admissionClass = "Class is required"
      // if (!formData.section) newErrors.section = "Section is required"
      // if (!formData.address) newErrors.address = "Address is required"
      // if (!formData.phone) newErrors.phone = "Phone number is required"
    } else if (step === 1) {
      // Validate Parent/Guardian Information
      if (!formData.fatherName) newErrors.fatherName = "Father's name is required"
      // if (!formData.fatherPhone) newErrors.fatherPhone = "Father's phone is required"
      // if (!formData.motherName) newErrors.motherName = "Mother's name is required"
    } else if (step === 2) {
      // Validate Academic Background
      if (!formData.previousSchool) newErrors.previousSchool = "Previous school is required"
      if (!formData.previousClass) newErrors.previousClass = "Previous class is required"
    } else if (step === 3) {
      // Validate Fee Information
      if (!formData.paymentMethod) newErrors.paymentMethod = "Payment method is required"
      if (!formData.agreeToFeeTerms) newErrors.agreeToFeeTerms = "You must agree to the fee terms and conditions"
    } else if (step === 4) {
      // Validate Documents & Submission
      if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1)
      // Scroll to top when moving to next step
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
    // Scroll to top when moving to previous step
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateStep(activeStep)) {
      try {
        // Here you would typically send the data to your backend
        // For now, we'll just simulate a successful submission
        console.log("Form submitted:", formData)
        setFormSubmitted(true)

        // Redirect to success page after 2 seconds
        setTimeout(() => {
          router.push("/admission/success")
        }, 2000)
      } catch (error) {
        console.error("Error submitting form:", error)
      }
    }
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormCard elevation={6}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                  <Person />
                </Avatar>
                <Typography variant="h6" color="primary">
                  Student Information
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth || "MM/DD/YYYY"}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Cake fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      // onChange={handleChange}
                      label="Gender"
                      startAdornment={
                        <InputAdornment position="start">
                          <Person fontSize="small" color="action" />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth required error={!!errors.admissionClass}>
                    <InputLabel>Admission Class</InputLabel>
                    <Select
                      name="admissionClass"
                      value={formData.admissionClass}
                      // onChange={handleChange}
                      label="Admission Class"
                      startAdornment={
                        <InputAdornment position="start">
                          <School fontSize="small" color="action" />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="1">Class 1</MenuItem>
                      <MenuItem value="2">Class 2</MenuItem>
                      <MenuItem value="3">Class 3</MenuItem>
                      <MenuItem value="4">Class 4</MenuItem>
                      <MenuItem value="5">Class 5</MenuItem>
                      <MenuItem value="6">Class 6</MenuItem>
                      <MenuItem value="7">Class 7</MenuItem>
                      <MenuItem value="8">Class 8</MenuItem>
                      <MenuItem value="9">Class 9</MenuItem>
                      <MenuItem value="10">Class 10</MenuItem>
                      <MenuItem value="11">Class 11</MenuItem>
                      <MenuItem value="12">Class 12</MenuItem>
                    </Select>
                    {errors.admissionClass && <FormHelperText>{errors.admissionClass}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth required error={!!errors.section}>
                    <InputLabel>Section</InputLabel>
                    <Select
                      name="section"
                      value={formData.section}
                      // onChange={handleChange}
                      label="Section"
                      startAdornment={
                        <InputAdornment position="start">
                          <Group fontSize="small" color="action" />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="A">Section A</MenuItem>
                      <MenuItem value="B">Section B</MenuItem>
                      <MenuItem value="C">Section C</MenuItem>
                      <MenuItem value="D">Section D</MenuItem>
                    </Select>
                    {errors.section && <FormHelperText>{errors.section}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Religion"
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Flag fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Flag fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Address"
                    name="address"
                    multiline
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Home fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCity fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="State/Province"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCity fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCity fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </FormCard>
        )
      case 1:
        return (
          <FormCard elevation={6}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                  <Group /> {/* Changed from Family to Group */}
                </Avatar>
                <Typography variant="h6" color="primary">
                  Parent/Guardian Information
                </Typography>
              </Box>

              <Box mb={4} sx={{ bgcolor: "rgba(63, 81, 181, 0.05)", p: 3, borderRadius: "12px" }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color="primary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Person sx={{ mr: 1 }} /> Father's Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Father's Name"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      error={!!errors.fatherName}
                      helperText={errors.fatherName}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Occupation"
                      name="fatherOccupation"
                      value={formData.fatherOccupation}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Work fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Phone Number"
                      name="fatherPhone"
                      value={formData.fatherPhone}
                      onChange={handleChange}
                      error={!!errors.fatherPhone}
                      helperText={errors.fatherPhone}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="fatherEmail"
                      type="email"
                      value={formData.fatherEmail}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box mb={4} sx={{ bgcolor: "rgba(63, 81, 181, 0.05)", p: 3, borderRadius: "12px" }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color="primary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Person sx={{ mr: 1 }} /> Mother's Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Mother's Name"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      error={!!errors.motherName}
                      helperText={errors.motherName}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Occupation"
                      name="motherOccupation"
                      value={formData.motherOccupation}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Work fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="motherPhone"
                      value={formData.motherPhone}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="motherEmail"
                      type="email"
                      value={formData.motherEmail}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ bgcolor: "rgba(63, 81, 181, 0.05)", p: 3, borderRadius: "12px" }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color="primary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Person sx={{ mr: 1 }} /> Guardian's Details (If different from parents)
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Guardian's Name"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Relationship to Student"
                      name="guardianRelation"
                      value={formData.guardianRelation}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="guardianPhone"
                      value={formData.guardianPhone}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="guardianEmail"
                      type="email"
                      value={formData.guardianEmail}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </FormCard>
        )
      case 2:
        return (
          <FormCard elevation={6}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                  <School />
                </Avatar>
                <Typography variant="h6" color="primary">
                  Academic Background
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Previous School Name"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    error={!!errors.previousSchool}
                    helperText={errors.previousSchool}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <School fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Previous Class/Grade"
                    name="previousClass"
                    value={formData.previousClass}
                    onChange={handleChange}
                    error={!!errors.previousClass}
                    helperText={errors.previousClass}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <School fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Percentage/Grade Obtained"
                    name="previousPercentage"
                    value={formData.previousPercentage}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <School fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Year of Passing"
                    name="yearOfPassing"
                    value={formData.yearOfPassing}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Reason for Leaving Previous School"
                    name="reasonForLeaving"
                    multiline
                    rows={3}
                    value={formData.reasonForLeaving}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Description fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </FormCard>
        )
      case 3:
        return (
          <FormCard elevation={6}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                  <AttachMoney />
                </Avatar>
                <Typography variant="h6" color="primary">
                  Fee Information
                </Typography>
              </Box>

              <Box sx={{ bgcolor: "rgba(63, 81, 181, 0.05)", p: 3, borderRadius: "12px", mb: 4 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Fee Structure for Class Eight (2025-2026)
                </Typography>

                <TableContainer component={Paper} sx={{ boxShadow: "none", bgcolor: "transparent", mb: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ "& th": { fontWeight: "bold", color: "primary.main" } }}>
                        <TableCell>Fee Type</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell>Frequency</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Admission Fee</TableCell>
                        <TableCell align="right">$500</TableCell>
                        <TableCell>One-time</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tuition Fee</TableCell>
                        <TableCell align="right">$2,500</TableCell>
                        <TableCell>Per semester</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Development Fee</TableCell>
                        <TableCell align="right">$300</TableCell>
                        <TableCell>Annual</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Library Fee</TableCell>
                        <TableCell align="right">$150</TableCell>
                        <TableCell>Annual</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Laboratory Fee</TableCell>
                        <TableCell align="right">$200</TableCell>
                        <TableCell>Annual</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Examination Fee</TableCell>
                        <TableCell align="right">$100</TableCell>
                        <TableCell>Per semester</TableCell>
                      </TableRow>
                      <TableRow sx={{ "& td": { fontWeight: "bold" } }}>
                        <TableCell>Total Annual Fee</TableCell>
                        <TableCell align="right">$6,250</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  * Additional charges may apply for transportation, uniform, and books.
                </Typography>
              </Box>

              <Box sx={{ bgcolor: "rgba(63, 81, 181, 0.05)", p: 3, borderRadius: "12px", mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Receipt sx={{ mr: 1 }} /> Fee Collection
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Please enter the fees being collected at the time of admission:
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Admission Fee Collected"
                      name="admissionFeeCollected"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tuition Fee Collected"
                      name="tuitionFeeCollected"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Development Fee Collected"
                      name="developmentFeeCollected"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Other Fees Collected"
                      name="otherFeesCollected"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Fee Details/Remarks"
                      name="feeRemarks"
                      multiline
                      rows={2}
                      placeholder="Enter any specific details about the fees collected"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Receipt Number"
                      name="receiptNumber"
                      placeholder="Enter receipt number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Receipt fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Payment Date"
                      name="paymentDate"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonth fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{ bgcolor: "white", p: 2, borderRadius: "8px", border: "1px dashed rgba(63, 81, 181, 0.5)" }}
                    >
                      <Typography variant="subtitle2" gutterBottom>
                        Total Amount Collected
                      </Typography>
                      <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
                        $0.00
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        * The total will be calculated automatically based on the amounts entered above.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Payment Plan
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup name="paymentPlan" value={formData.paymentPlan} onChange={handleChange} row>
                      <FormControlLabel
                        value="full"
                        control={<Radio color="primary" />}
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Receipt sx={{ mr: 1, color: "primary.main" }} />
                            Full Payment (5% discount)
                          </Box>
                        }
                      />
                      <FormControlLabel
                        value="installment"
                        control={<Radio color="primary" />}
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <LocalOffer sx={{ mr: 1, color: "primary.main" }} />
                            Installment Plan (4 equal installments)
                          </Box>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" required error={!!errors.paymentMethod}>
                    <InputLabel>Payment Method</InputLabel>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" required error={!!errors.paymentMethod}>
                    <InputLabel>Payment Method</InputLabel>
                    <Select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      // onChange={handleChange}
                      label="Payment Method"
                      startAdornment={
                        <InputAdornment position="start">
                          <CreditCard fontSize="small" color="action" />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="credit_card">Credit Card</MenuItem>
                      <MenuItem value="debit_card">Debit Card</MenuItem>
                      <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                      <MenuItem value="cash">Cash</MenuItem>
                      <MenuItem value="check">Check</MenuItem>
                    </Select>
                    {errors.paymentMethod && <FormHelperText>{errors.paymentMethod}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.scholarshipApplied}
                        onChange={handleCheckboxChange}
                        name="scholarshipApplied"
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccountBalance fontSize="small" sx={{ mr: 1 }} />
                        Apply for Scholarship/Financial Aid
                      </Box>
                    }
                  />
                </Grid>

                {formData.scholarshipApplied && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Scholarship Type/Details"
                      name="scholarshipType"
                      value={formData.scholarshipType}
                      onChange={handleChange}
                      multiline
                      rows={2}
                      placeholder="Please specify the type of scholarship or financial aid you are applying for"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <School fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Box mt={3} p={3} sx={{ backgroundColor: "rgba(63, 81, 181, 0.05)", borderRadius: "12px" }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                      Fee Terms and Conditions
                    </Typography>
                    <Typography variant="body2" paragraph>
                      1. All fees must be paid within the specified timeframe after admission is granted.
                    </Typography>
                    <Typography variant="body2" paragraph>
                      2. Late payment will incur a penalty of 5% per month on the outstanding amount.
                    </Typography>
                    <Typography variant="body2" paragraph>
                      3. Fees once paid are non-refundable under any circumstances.
                    </Typography>
                    <Typography variant="body2" paragraph>
                      4. The school reserves the right to revise the fee structure at any time.
                    </Typography>
                    <Typography variant="body2" paragraph>
                      5. Failure to pay fees on time may result in the student being barred from attending classes.
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          required
                          checked={formData.agreeToFeeTerms}
                          onChange={handleCheckboxChange}
                          name="agreeToFeeTerms"
                          color="primary"
                        />
                      }
                      label="I agree to the fee terms and conditions"
                    />
                    {errors.agreeToFeeTerms && <FormHelperText error>{errors.agreeToFeeTerms}</FormHelperText>}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </FormCard>
        )
      case 4:
        return (
          <FormCard elevation={6}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                  <Description />
                </Avatar>
                <Typography variant="h6" color="primary">
                  Documents & Submission
                </Typography>
              </Box>

              <Box sx={{ bgcolor: "rgba(63, 81, 181, 0.05)", p: 3, borderRadius: "12px", mb: 4 }}>
                <Typography variant="subtitle2" color="text.secondary" paragraph>
                  Please check the documents you are submitting with this application:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.birthCertificate}
                          onChange={handleCheckboxChange}
                          name="birthCertificate"
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Upload fontSize="small" sx={{ mr: 1 }} />
                          Birth Certificate
                        </Box>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.transferCertificate}
                          onChange={handleCheckboxChange}
                          name="transferCertificate"
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Upload fontSize="small" sx={{ mr: 1 }} />
                          Transfer Certificate
                        </Box>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.characterCertificate}
                          onChange={handleCheckboxChange}
                          name="characterCertificate"
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Upload fontSize="small" sx={{ mr: 1 }} />
                          Character Certificate
                        </Box>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.markSheet}
                          onChange={handleCheckboxChange}
                          name="markSheet"
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Upload fontSize="small" sx={{ mr: 1 }} />
                          Mark Sheet of Previous Class
                        </Box>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.medicalCertificate}
                          onChange={handleCheckboxChange}
                          name="medicalCertificate"
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Upload fontSize="small" sx={{ mr: 1 }} />
                          Medical Certificate
                        </Box>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.photographs}
                          onChange={handleCheckboxChange}
                          name="photographs"
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Upload fontSize="small" sx={{ mr: 1 }} />
                          Passport Size Photographs
                        </Box>
                      }
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box mt={4} p={3} sx={{ backgroundColor: "rgba(63, 81, 181, 0.05)", borderRadius: "12px" }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Terms and Conditions
                </Typography>
                <Typography variant="body2" paragraph>
                  1. All information provided in this form must be accurate and truthful.
                </Typography>
                <Typography variant="body2" paragraph>
                  2. The school reserves the right to verify all information and documents submitted.
                </Typography>
                <Typography variant="body2" paragraph>
                  3. Admission is subject to availability of seats and successful completion of entrance requirements.
                </Typography>
                <Typography variant="body2" paragraph>
                  4. The decision of the school administration regarding admission is final.
                </Typography>
                <Typography variant="body2" paragraph>
                  5. All fees must be paid within the specified timeframe after admission is granted.
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      required
                      checked={formData.termsAccepted}
                      onChange={handleCheckboxChange}
                      name="termsAccepted"
                      color="primary"
                    />
                  }
                  label="I accept the terms and conditions"
                />
                {errors.termsAccepted && <FormHelperText error>{errors.termsAccepted}</FormHelperText>}
              </Box>
            </CardContent>
          </FormCard>
        )
      default:
        return null
    }
  }

  if (formSubmitted) {
    return (
      <Box textAlign="center" p={4}>
        <Alert severity="success" sx={{ mb: 2, borderRadius: "10px", fontSize: "1.1rem", fontWeight: "500" }}>
          Your application has been submitted successfully!
        </Alert>
        <Typography variant="body1">
          Thank you for applying. Your application is being processed. You will be redirected to the confirmation page
          shortly.
        </Typography>
      </Box>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: "lg", mx: "auto", p: { xs: 2, md: 4 } }}>
        <Paper
          elevation={5}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: "16px",
            background: "linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)",
          }}
        >
          <Typography variant="h4" align="center" sx={{ color: "white", mb: 1 }}>
            Student Admission Form
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ color: "white", opacity: 0.9 }}>
            Class Eight - Academic Year 2025-2026
          </Typography>
        </Paper>

        <Stepper activeStep={activeStep} alternativeLabel connector={<StyledStepConnector />} sx={{ mb: 5, mt: 3 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel StepIconComponent={(props) => <StepIconComponent {...props} />}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: activeStep === index ? 600 : 400,
                    color: activeStep === index ? "primary.main" : "text.secondary",
                  }}
                >
                  {step.label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit}>
          {renderStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <StyledButton
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              startIcon={<ArrowBack />}
              sx={{ minWidth: "120px" }}
            >
              Back
            </StyledButton>

            {activeStep === steps.length - 1 ? (
              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<Check />}
                sx={{ minWidth: "180px" }}
              >
                Submit Application
              </StyledButton>
            ) : (
              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleNext}
                endIcon={<ArrowForward />}
                sx={{ minWidth: "120px" }}
              >
                Next
              </StyledButton>
            )}
          </Box>
        </form>
      </Box>
    </ThemeProvider>
  )
}
