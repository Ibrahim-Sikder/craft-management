/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Snackbar,
  Backdrop,
  CircularProgress,
  IconButton,
} from "@mui/material"
import {
  Person,
  Home,
  School,
  AttachMoney,
  Save,
  Badge,
  Phone,
  Cake,
  Bloodtype,
  DriveFileRenameOutline,
  ContactPhone,
  CreditCard,
  LocationOn,
  CalendarMonth,
  CheckCircle,
  ArrowBack,
  Clear,
  Help,
  Email,
  Language,
  Facebook,
  Twitter,
  YouTube,
  LinkedIn,
  Wc,
  CardMembership,
  Fingerprint,
  BusinessCenter,
  EventNote,
  Add,
  Apartment,
  Work,
  Instagram,
  VerifiedUser,
  Group,
  AccountCircle,
} from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import CraftForm from "@/components/Forms/Form"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import CraftSelectWithIcon from "@/components/Forms/selectWithIcon"
import {
  bloodGroup,
  departments,
  designations,
  genders,
  languages,
  maritalStatuses,
  residenceTypes,
  staffTypes,
  statusOptions,
  subjects,
} from "@/options"
import { useCreateTeacherMutation, useGetSingleTeacherQuery, useUpdateTeacherMutation } from "@/redux/api/teacherApi"
import FileUploadWithIcon from "@/components/Forms/Upload"
import CraftDatePicker from "@/components/Forms/DatePicker"
import type { SelectChangeEvent } from "@mui/material"

// Define interfaces
interface Address {
  address: string
  village: string
  postOffice: string
  thana: string
  district: string
  state: string
  country: string
  zipCode: string
}

interface Education {
  degree: string
  institution: string
  year: string
  specialization: string
}

interface Certification {
  name: string
  issuedBy: string
  year: string
  description: string
}

interface Experience {
  organization: string
  position: string
  from: string
  to: string
  description: string
}

interface BankDetails {
  accountName: string
  accountNumber: string
  bankName: string
  branchName: string
  ifscCode: string
}

interface EmergencyContact {
  name: string
  relation: string
  phone: string
}

interface SocialMedia {
  facebook: string
  twitter: string
  youtube: string
  linkedin: string
  instagram: string
}

interface FormData {
  teacherId: string
  teacherSerial: string
  name: string
  englishName: string
  phone: string
  email: string
  smartIdCard: string
  bloodGroup: string
  gender: string
  dateOfBirth: string
  nationality: string
  religion: string
  maritalStatus: string
  permanentAddress: Address
  currentAddress: Address
  designation: string
  department: string
  joiningDate: string
  monthlySalary: string
  staffType: string
  residenceType: string
  subjectsTaught: string[]
  classesAssigned: string[]
  education: Education[]
  certifications: Certification[]
  skills: string[]
  experience: Experience[]
  emergencyContact: EmergencyContact
  socialMedia: SocialMedia
  status: string
  language: string
  activeSession: string
  bankDetails: BankDetails
  sameAsPermanent: boolean
}

// Add interface for TeacherFormProps
interface TeacherFormProps {
  id?: string
}

// Initialize default form state
const initialFormState = {
  teacherId: "",
  teacherSerial: "",
  name: "",
  englishName: "",
  phone: "",
  email: "",
  smartIdCard: "",
  bloodGroup: "",
  gender: "",
  dateOfBirth: "",
  nationality: "",
  religion: "",
  maritalStatus: "",
  permanentAddress: {
    address: "",
    village: "",
    postOffice: "",
    thana: "",
    district: "",
    state: "",
    country: "",
    zipCode: "",
  },
  currentAddress: {
    address: "",
    village: "",
    postOffice: "",
    thana: "",
    district: "",
    state: "",
    country: "",
    zipCode: "",
  },
  designation: "",
  department: "",
  joiningDate: "",
  monthlySalary: "",
  staffType: "",
  residenceType: "",
  subjectsTaught: [],
  classesAssigned: [],
  education: [{ degree: "", institution: "", year: "", specialization: "" }],
  certifications: [{ name: "", issuedBy: "", year: "", description: "" }],
  skills: [],
  experience: [{ organization: "", position: "", from: "", to: "", description: "" }],
  emergencyContact: {
    name: "",
    relation: "",
    phone: "",
  },
  socialMedia: {
    facebook: "",
    twitter: "",
    youtube: "",
    linkedin: "",
    instagram: "",
  },
  status: "",
  language: "",
  activeSession: "",
  bankDetails: {
    accountName: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
  },
  sameAsPermanent: false,
}

// Replace the function declaration with this
export default function TeacherForm({ id }: TeacherFormProps = {}) {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // Add API hooks
  const [createTeacher] = useCreateTeacherMutation()
  const [updateTeacher] = useUpdateTeacherMutation({})
  const { data, isLoading } = useGetSingleTeacherQuery(
    { id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    },
  )

  // Add formData state with proper initialization
  const [formData, setFormData] = useState<FormData>(initialFormState)

  // Add useEffect to set form data when data is loaded
  // useEffect(() => {
  //   if (data?.data) {
  //     const teacherData = data.data
  //     setFormData({
  //       ...initialFormState,
  //       ...teacherData,
  //       sameAsPermanent: teacherData.sameAsPermanent || false,
  //       permanentAddress: teacherData.permanentAddress || initialFormState.permanentAddress,
  //       currentAddress: teacherData.currentAddress || initialFormState.currentAddress,
  //       education: teacherData.education || [{ degree: "", institution: "", year: "", specialization: "" }],
  //       certifications: teacherData.certifications || [{ name: "", issuedBy: "", year: "", description: "" }],
  //       experience: teacherData.experience || [{ organization: "", position: "", from: "", to: "", description: "" }],
  //       emergencyContact: teacherData.emergencyContact || initialFormState.emergencyContact,
  //       socialMedia: teacherData.socialMedia || initialFormState.socialMedia,
  //       bankDetails: teacherData.bankDetails || initialFormState.bankDetails,
  //     })

  //     if (teacherData.subjectsTaught) {
  //       setSelectedSubjects(teacherData.subjectsTaught)
  //     }
  //   }
  // }, [data])

  // Fixed handleInputChange function
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
    section?: keyof FormData,
    index?: number,
  ) => {
    const { name, value } = e.target

    if (section && index !== undefined) {
      // Handle nested array fields (education, certifications, experience)
      setFormData((prev) => {
        const newArray = [...(prev[section] as any[])]
        newArray[index] = { ...newArray[index], [name]: value }
        return { ...prev, [section]: newArray }
      })
    } else if (section) {
      // Handle nested object fields (permanentAddress, currentAddress, etc.)
      setFormData((prev) => ({
        ...prev,
        [section]: { ...(prev[section] as any), [name]: value },
      }))
    } else {
      // Handle top-level fields
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Add handleSwitchChange function
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))

    if (name === "sameAsPermanent" && checked) {
      setFormData((prev) => ({
        ...prev,
        currentAddress: { ...prev.permanentAddress },
      }))
    }
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", year: "", specialization: "" }],
    }))
  }

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { name: "", issuedBy: "", year: "", description: "" }],
    }))
  }

  // Remove certification entry
  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }))
  }

  // Add new experience entry
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { organization: "", position: "", from: "", to: "", description: "" }],
    }))
  }

  // Remove experience entry
  const removeExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Handle reset
  const handleReset = () => {
    setFormData(initialFormState)
    setActiveStep(0)
  }


  const handleSubmit = async (data : any) => {
    setIsSubmitting(true)

    try {
      const submissionData = {
        ...data,
        teacherSerial: Number(data.teacherSerial),
        professionalInfo: {
          designation: data.designation,
          department: data.department,
          joiningDate: data.joiningDate,
          monthlySalary:Number(data.monthlySalary),
          staffType: data.staffType,
          subjectsTaught: selectedSubjects,
        },
        additionalInfo: {
          religion: data.religion,
          nationality: data.nationality,
          maritalStatus: data.maritalStatus,
          bloodGroup: data.bloodGroup,
        },
        sessionInfo: {
          activeSession: data.activeSession,
          status: data.status || "Active",
        },
      }

      if (id) {
        const res = await updateTeacher({ id, ...submissionData }).unwrap()

        if (res.success) {
          setSuccess(true)
          setSnackbar({
            open: true,
            message: "Teacher updated successfully!",
            severity: "success",
          })

          setTimeout(() => {
            router.push("/dashboard/super_admin/teacher/list")
          }, 2000)
        }
      } else {
        const res = await createTeacher(submissionData).unwrap()
       
        if (res.success) {
          setSuccess(true)
          setSnackbar({
            open: true,
            message: "Teacher registered successfully!",
            severity: "success",
          })

          setTimeout(() => {
            router.push("/dashboard/super_admin/teacher/list")
          }, 2000)
        }
      }
    } catch (error: any) {
      console.error("❌ Submission error:", error)
      setSnackbar({
        open: true,
        message: error?.data?.message || "Error processing teacher data.",
        severity: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add handleCloseSnackbar function
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }

  const steps = [
    {
      label: "Basic Information",
      description: "Enter teacher's personal details",
      icon: <Person />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              required
              fullWidth
              label="Teacher ID"
              name="teacherId"
              value={formData.teacherId}
              onChange={handleInputChange}
              size="medium"
              InputProps={{
                startAdornment: <Fingerprint sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              required
              fullWidth
              label="Teacher Serial"
              name="teacherSerial"
              type="number"
              value={formData.teacherSerial}
              onChange={handleInputChange}
              size="medium"
              InputProps={{
                startAdornment: <Badge sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              required
              fullWidth
              label="Smart ID Card"
              name="smartIdCard"
              value={formData.smartIdCard}
              onChange={handleInputChange}
              size="medium"
              InputProps={{
                startAdornment: <CardMembership sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              required
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              size="medium"
              InputProps={{
                startAdornment: <DriveFileRenameOutline sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              required
              fullWidth
              label="English Name (if different)"
              name="englishName"
              value={formData.englishName}
              onChange={handleInputChange}
              size="medium"
              InputProps={{
                startAdornment: <DriveFileRenameOutline sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              required
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              size="medium"
              InputProps={{
                startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              required
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              size="medium"
              InputProps={{
                startAdornment: <Email sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftDatePicker
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              InputProps={{
                startAdornment: <Cake sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftSelectWithIcon
              name="bloodGroup"
              size="medium"
              label="Blood Group"
              placeholder="Select blood group"
              items={bloodGroup}
              adornment={<Bloodtype color="action" />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftSelectWithIcon
              required
              name="gender"
              size="medium"
              label="Gender"
              placeholder="Select Gender"
              items={genders}
              onChange={(e) => handleInputChange(e)}
              adornment={<Wc color="action" />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="Nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              size="medium"
              InputProps={{
                startAdornment: <Language sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              label="Religion"
              name="religion"
              value={formData.religion}
              onChange={handleInputChange}
              size="medium"
              InputProps={{
                startAdornment: <VerifiedUser sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="maritalStatus"
              size="medium"
              label="Marital Status"
              placeholder="Select Marital Status"
              items={maritalStatuses}
              adornment={<Group color="action" />}
            />
          </Grid>
          <Grid item xs={12}>
            <FileUploadWithIcon name="teacherPhoto" label="Teacher Photo" />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Address Information",
      description: "Enter permanent and present address",
      icon: <Home />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Permanent Address
            </Typography>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    required
                    fullWidth
                    label="Address Line"
                    name="address"
                    value={formData.permanentAddress.address}
                    onChange={(e) => handleInputChange(e, "permanentAddress")}
                    size="medium"
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: (
                        <LocationOn sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Village/Area"
                    name="village"
                    value={formData.permanentAddress.village}
                    onChange={(e) => handleInputChange(e, "permanentAddress")}
                    size="medium"
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Post Office"
                    name="postOffice"
                    value={formData.permanentAddress.postOffice}
                    onChange={(e) => handleInputChange(e, "permanentAddress")}
                    size="medium"
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Thana/Police Station"
                    name="thana"
                    value={formData.permanentAddress.thana}
                    onChange={(e) => handleInputChange(e, "permanentAddress")}
                    size="medium"
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInputWithIcon
                    required
                    fullWidth
                    label="District"
                    name="district"
                    value={formData.permanentAddress.district}
                    onChange={(e) => handleInputChange(e, "permanentAddress")}
                    size="medium"
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="State/Province"
                    name="state"
                    value={formData.permanentAddress.state}
                    onChange={(e) => handleInputChange(e, "permanentAddress")}
                    size="medium"
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInputWithIcon
                    required
                    fullWidth
                    label="Country"
                    name="country"
                    value={formData.permanentAddress.country}
                    onChange={(e) => handleInputChange(e, "permanentAddress")}
                    size="medium"
                    InputProps={{
                      startAdornment: <Language sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Zip/Postal Code"
                    name="zipCode"
                    value={formData.permanentAddress.zipCode}
                    onChange={(e) => handleInputChange(e, "permanentAddress")}
                    size="medium"
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Present Address
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    name="sameAsPermanent"
                    checked={formData.sameAsPermanent || false}
                    onChange={handleSwitchChange}
                    color="primary"
                  />
                }
                label="Same as Permanent"
              />
            </Box>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                opacity: formData.sameAsPermanent ? 0.7 : 1,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Address Line"
                    name="address"
                    value={formData.currentAddress.address}
                    onChange={(e) => handleInputChange(e, "currentAddress")}
                    size="medium"
                    multiline
                    rows={2}
                    disabled={formData.sameAsPermanent}
                    InputProps={{
                      startAdornment: (
                        <LocationOn sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Village/Area"
                    name="village"
                    value={formData.currentAddress.village}
                    onChange={(e) => handleInputChange(e, "currentAddress")}
                    size="medium"
                    disabled={formData.sameAsPermanent}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Post Office"
                    name="postOffice"
                    value={formData.currentAddress.postOffice}
                    onChange={(e) => handleInputChange(e, "currentAddress")}
                    size="medium"
                    disabled={formData.sameAsPermanent}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Thana/Police Station"
                    name="thana"
                    value={formData.currentAddress.thana}
                    onChange={(e) => handleInputChange(e, "currentAddress")}
                    size="medium"
                    disabled={formData.sameAsPermanent}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInputWithIcon
                    required
                    fullWidth
                    label="District"
                    name="district"
                    value={formData.currentAddress.district}
                    onChange={(e) => handleInputChange(e, "currentAddress")}
                    size="medium"
                    disabled={formData.sameAsPermanent}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="State/Province"
                    name="state"
                    value={formData.currentAddress.state}
                    onChange={(e) => handleInputChange(e, "currentAddress")}
                    size="medium"
                    disabled={formData.sameAsPermanent}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInputWithIcon
                    required
                    fullWidth
                    label="Country"
                    name="country"
                    value={formData.currentAddress.country}
                    onChange={(e) => handleInputChange(e, "currentAddress")}
                    size="medium"
                    disabled={formData.sameAsPermanent}
                    InputProps={{
                      startAdornment: <Language sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Zip/Postal Code"
                    name="zipCode"
                    value={formData.currentAddress.zipCode}
                    onChange={(e) => handleInputChange(e, "currentAddress")}
                    size="medium"
                    disabled={formData.sameAsPermanent}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Professional Information",
      description: "Enter professional and employment details",
      icon: <BusinessCenter />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              required
              name="designation"
              size="medium"
              label="Designation"
              placeholder="Select Designation"
              items={designations}
              adornment={<BusinessCenter color="action" />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              required
              name="department"
              size="medium"
              label="Department"
              placeholder="Select Department"
              items={departments}
              adornment={<Apartment color="action" />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftDatePicker
              required
              fullWidth
              label="Joining Date"
              name="joiningDate"
              size="medium"
              InputProps={{
                startAdornment: <EventNote sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              required
              fullWidth
              label="Monthly Salary"
              name="monthlySalary"
              type="number"
              value={formData.monthlySalary}
              onChange={handleInputChange}
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftSelectWithIcon
              required
              name="staffType"
              size="medium"
              label="Staff Type"
              placeholder="Select Staff Type"
              items={staffTypes}
              adornment={<Work color="action" />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="residenceType"
              size="medium"
              label="Residence Type"
              placeholder="Select Residence Type"
              items={residenceTypes}
              adornment={<Home color="action" />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="subjectsTaught"
              size="medium"
              label="Subjects Taught"
              placeholder="Select Subjects"
              items={subjects}
              adornment={<School color="action" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
              Bank Details
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              label="Account Holder Name"
              name="accountName"
              value={formData.bankDetails.accountName}
              onChange={(e) => handleInputChange(e, "bankDetails")}
              size="medium"
              InputProps={{
                startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              label="Account Number"
              name="accountNumber"
              value={formData.bankDetails.accountNumber}
              onChange={(e) => handleInputChange(e, "bankDetails")}
              size="medium"
              InputProps={{
                startAdornment: <CreditCard sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="Bank Name"
              name="bankName"
              value={formData.bankDetails.bankName}
              onChange={(e) => handleInputChange(e, "bankDetails")}
              size="medium"
              InputProps={{
                startAdornment: <BusinessCenter sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="Branch Name"
              name="branchName"
              value={formData.bankDetails.branchName}
              onChange={(e) => handleInputChange(e, "bankDetails")}
              size="medium"
              InputProps={{
                startAdornment: <BusinessCenter sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="IFSC Code"
              name="ifscCode"
              value={formData.bankDetails.ifscCode}
              onChange={(e) => handleInputChange(e, "bankDetails")}
              size="medium"
              InputProps={{
                startAdornment: <CreditCard sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "rgba(33, 150, 243, 0.05)",
                borderRadius: 2,
                border: "1px dashed rgba(33, 150, 243, 0.3)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <Help color="primary" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" color="primary.main">
                    Professional Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Professional details are important for administrative purposes. Make sure to provide accurate
                    information about designation, department, and salary details.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Educational Information",
      description: "Enter educational qualifications and certifications",
      icon: <School />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" gutterBottom>
              Educational Qualifications
            </Typography>
            {formData.education.map((edu, index) => (
              <Paper key={index} elevation={2} sx={{ p: 2, mb: 3, position: "relative", borderRadius: 2 }}>
                {index > 0 && (
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "error.main",
                    }}
                    onClick={() => removeEducation(index)}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                )}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      required
                      fullWidth
                      label="Degree/Certificate"
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleInputChange(e, "education", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <School sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      required
                      fullWidth
                      label="Institution"
                      name="institution"
                      value={edu.institution}
                      onChange={(e) => handleInputChange(e, "education", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <BusinessCenter sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      required
                      fullWidth
                      label="Year of Completion"
                      name="year"
                      value={edu.year}
                      onChange={(e) => handleInputChange(e, "education", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Specialization"
                      name="specialization"
                      value={edu.specialization}
                      onChange={(e) => handleInputChange(e, "education", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <School sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
            <Button variant="outlined" startIcon={<Add />} onClick={addEducation} sx={{ mb: 4, borderRadius: 100 }}>
              Add Education
            </Button>

            <Typography variant="h6" color="primary" gutterBottom>
              Certifications
            </Typography>
            {formData.certifications.map((cert, index) => (
              <Paper key={index} elevation={2} sx={{ p: 2, mb: 3, position: "relative", borderRadius: 2 }}>
                {index > 0 && (
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "error.main",
                    }}
                    onClick={() => removeCertification(index)}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                )}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Certificate Name"
                      name="name"
                      value={cert.name}
                      onChange={(e) => handleInputChange(e, "certifications", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <CardMembership sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Issued By"
                      name="issuedBy"
                      value={cert.issuedBy}
                      onChange={(e) => handleInputChange(e, "certifications", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <BusinessCenter sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Year"
                      name="year"
                      value={cert.year}
                      onChange={(e) => handleInputChange(e, "certifications", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Description"
                      name="description"
                      value={cert.description}
                      onChange={(e) => handleInputChange(e, "certifications", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <CardMembership sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
            <Button variant="outlined" startIcon={<Add />} onClick={addCertification} sx={{ mb: 4, borderRadius: 100 }}>
              Add Certification
            </Button>

            <Typography variant="h6" color="primary" gutterBottom>
              Work Experience
            </Typography>
            {formData.experience.map((exp, index) => (
              <Paper key={index} elevation={2} sx={{ p: 2, mb: 3, position: "relative", borderRadius: 2 }}>
                {index > 0 && (
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "error.main",
                    }}
                    onClick={() => removeExperience(index)}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                )}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Organization"
                      name="organization"
                      value={exp.organization}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <BusinessCenter sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Position"
                      name="position"
                      value={exp.position}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="From (Year)"
                      name="from"
                      value={exp.from}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      label="To (Year or Present)"
                      name="to"
                      value={exp.to}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CraftInputWithIcon
                      fullWidth
                      label="Description"
                      name="description"
                      multiline
                      rows={2}
                      value={exp.description}
                      onChange={(e) => handleInputChange(e, "experience", index)}
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <BusinessCenter sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }} />
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
            <Button variant="outlined" startIcon={<Add />} onClick={addExperience} sx={{ borderRadius: 100 }}>
              Add Experience
            </Button>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Additional Information",
      description: "Enter emergency contacts and social media profiles",
      icon: <ContactPhone />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" gutterBottom>
              Emergency Contact
            </Typography>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Contact Name"
                    name="name"
                    value={formData.emergencyContact.name}
                    onChange={(e) => handleInputChange(e, "emergencyContact")}
                    size="medium"
                    InputProps={{
                      startAdornment: <AccountCircle sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Relationship"
                    name="relation"
                    value={formData.emergencyContact.relation}
                    onChange={(e) => handleInputChange(e, "emergencyContact")}
                    size="medium"
                    InputProps={{
                      startAdornment: <Group sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.emergencyContact.phone}
                    onChange={(e) => handleInputChange(e, "emergencyContact")}
                    size="medium"
                    InputProps={{
                      startAdornment: <ContactPhone sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
              </Grid>
            </Card>

            <Typography variant="h6" color="primary" gutterBottom>
              Social Media Profiles
            </Typography>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Facebook Profile"
                    name="facebook"
                    value={formData.socialMedia.facebook}
                    onChange={(e) => handleInputChange(e, "socialMedia")}
                    size="medium"
                    InputProps={{
                      startAdornment: <Facebook sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Twitter Profile"
                    name="twitter"
                    value={formData.socialMedia.twitter}
                    onChange={(e) => handleInputChange(e, "socialMedia")}
                    size="medium"
                    InputProps={{
                      startAdornment: <Twitter sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="YouTube Channel"
                    name="youtube"
                    value={formData.socialMedia.youtube}
                    onChange={(e) => handleInputChange(e, "socialMedia")}
                    size="medium"
                    InputProps={{
                      startAdornment: <YouTube sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="LinkedIn Profile"
                    name="linkedin"
                    value={formData.socialMedia.linkedin}
                    onChange={(e) => handleInputChange(e, "socialMedia")}
                    size="medium"
                    InputProps={{
                      startAdornment: <LinkedIn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Instagram Profile"
                    name="instagram"
                    value={formData.socialMedia.instagram}
                    onChange={(e) => handleInputChange(e, "socialMedia")}
                    size="medium"
                    InputProps={{
                      startAdornment: <Instagram sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
              </Grid>
            </Card>

            <Typography variant="h6" color="primary" gutterBottom>
              Other Information
            </Typography>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CraftSelectWithIcon
                    required
                    name="status"
                    size="medium"
                    label="Status"
                    placeholder="Select Status"
                    items={statusOptions}
                    adornment={<VerifiedUser color="action" />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftSelectWithIcon
                    name="language"
                    size="medium"
                    label="Preferred Language"
                    placeholder="Select Language"
                    items={languages}
                    adornment={<Language color="action" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Active Session"
                    name="activeSession"
                    value={formData.activeSession}
                    onChange={handleInputChange}
                    size="medium"
                    InputProps={{
                      startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      ),
    },
  ]

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading...
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f9f9f9, #f0f0f0)",
        pt: 2,
        pb: 8,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #4F0187 0%, #4F0187 100%)",
          color: "white",
          py: 3,
          mb: 4,
          borderRadius: { xs: 0, md: "0 0 20px 20px" },
          boxShadow: "0 4px 20px rgba(33, 150, 243, 0.4)",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Person sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              {id ? "Edit Teacher" : "New Teacher Registration"}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 700 }}>
            {id
              ? "Update teacher information by modifying the required fields."
              : "Register a new teacher by filling in the required information. Follow the steps to complete the registration process."}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Box sx={{ mb: 3 }}>
          <Link href="/dashboard/super_admin/teacher/list" passHref>
            <Button
              startIcon={<ArrowBack />}
              variant="outlined"
              sx={{
                borderRadius: 100,
                borderColor: "rgba(0,0,0,0.12)",
                color: "text.secondary",
                px: 3,
              }}
            >
              Back to Teacher List
            </Button>
          </Link>
        </Box>

        <CraftForm onSubmit={handleSubmit}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              mb: 4,
            }}
          >
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      StepIconProps={{
                        icon: step.icon,
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {step.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Box sx={{ mt: 2, mb: 1 }}>{step.content}</Box>
                      <Box sx={{ mb: 2, mt: 4, display: "flex", gap: 2 }}>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{
                            borderRadius: 100,
                            px: 3,
                          }}
                        >
                          Back
                        </Button>
                        {index === steps.length - 1 ? (
                          <Button
                            variant="contained"
                            type="submit"
                            startIcon={<Save />}
                            sx={{
                              borderRadius: 100,
                              background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
                              boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
                              px: 3,
                            }}
                          >
                            {id ? "Update Teacher" : "Register Teacher"}
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{
                              borderRadius: 100,
                              background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
                              boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
                              px: 3,
                            }}
                          >
                            Continue
                          </Button>
                        )}
                        <Button
                          variant="outlined"
                          onClick={handleReset}
                          startIcon={<Clear />}
                          sx={{
                            borderRadius: 100,
                            borderColor: "rgba(0,0,0,0.12)",
                            color: "text.secondary",
                            px: 3,
                            ml: "auto",
                          }}
                        >
                          Reset
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Paper>
        </CraftForm>

        {/* Help Card */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 4,
            background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Help sx={{ color: "#2e7d32", mt: 0.5 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ color: "#2e7d32", fontWeight: 600 }}>
              Need Help?
            </Typography>
            <Typography variant="body2" sx={{ color: "#1b5e20" }}>
              Registering a teacher is the first step in the onboarding process. After registration, you can manage the
              teacher's professional records, attendance, and salary payments. Make sure to fill in all required fields
              marked with an asterisk (*) for successful registration.
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Success Backdrop */}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={success}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            p: 4,
            borderRadius: 4,
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "#e8f5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <CheckCircle sx={{ fontSize: 50, color: "#2e7d32" }} />
          </Box>
          <Typography variant="h5" sx={{ color: "#2e7d32", fontWeight: 600, mb: 1 }}>
            Success!
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
            {id
              ? "Teacher has been updated successfully. Redirecting to teacher list..."
              : "Teacher has been registered successfully. Redirecting to teacher list..."}
          </Typography>
          <CircularProgress size={24} sx={{ color: "primary.main" }} />
        </Box>
      </Backdrop>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
