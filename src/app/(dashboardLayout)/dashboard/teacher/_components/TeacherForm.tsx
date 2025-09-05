/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
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
  styled,
  alpha,
  Divider,
} from "@mui/material"
import {
  Person,
  Home,
  School,
  AttachMoney,
  Save,
  Badge,
  Phone,
  Bloodtype,
  DriveFileRenameOutline,
  ContactPhone,
  LocationOn,
  CalendarMonth,
  CheckCircle,
  ArrowBack,
  Clear,
  Help,
  Email,
  Language,
  Wc,
  CardMembership,
  BusinessCenter,
  Apartment,
  Work,
  VerifiedUser,
  Group,
  Add,
  InsertDriveFile,
  Image as ImageIcon,
  Description,
  Delete as DeleteIcon,
  FilePresent,
  Badge as BadgeIcon,
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
  staffTypes,
  statusOptions,
} from "@/options"
import { useCreateTeacherMutation, useGetSingleTeacherQuery, useUpdateTeacherMutation } from "@/redux/api/teacherApi"
import FileUploadWithIcon from "@/components/Forms/Upload"
import CraftDatePicker from "@/components/Forms/DatePicker"
import toast from "react-hot-toast"
import MultiFileUploadController from "@/components/Forms/multiFileUploadController"

// Styled components for file upload
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
  borderRadius: 16,
  padding: theme.spacing(3),
  textAlign: "center",
  transition: "all 0.3s ease",
  backgroundColor: alpha(theme.palette.primary.main, 0.02),
  cursor: "pointer",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    borderColor: theme.palette.primary.main,
  },
}))

const FilePreviewBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5),
  borderRadius: 8,
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  marginTop: theme.spacing(1),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}))

interface TeacherFormProps {
  id?: string
}

// File type interface
interface FileWithPreview extends File {
  preview?: string
}

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
  const [defaultValues, setDefaultValues] = useState<any>({})

  // File Upload States
  const [profileImages, setProfileImages] = useState<FileWithPreview[]>([])
  const [cvFiles, setCvFiles] = useState<File[]>([])
  const [certificateFiles, setCertificateFiles] = useState<File[]>([])
  const [nidFiles, setNidFiles] = useState<File[]>([])

  // Add API hooks
  const [createTeacher] = useCreateTeacherMutation()
  const [updateTeacher] = useUpdateTeacherMutation({})
  const { data: singlesTeacher, isLoading } = useGetSingleTeacherQuery(
    { id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    },
  )

  useEffect(() => {
    if (singlesTeacher && singlesTeacher.data) {
      const teacher = singlesTeacher.data

      // Set selected subjects if available
      if (teacher.professionalInfo?.subjectsTaught) {
        setSelectedSubjects(teacher.professionalInfo.subjectsTaught)
      }

      // Create comprehensive default values object
      const formDefaultValues = {
        // Basic Information
        teacherId: teacher.teacherId || "",
        teacherSerial: teacher.teacherSerial || "",
        smartIdCard: teacher.smartIdCard || "",
        name: teacher.name || "",
        englishName: teacher.englishName || "",
        phone: teacher.phone || "",
        email: teacher.email || "",
        dateOfBirth: teacher.dateOfBirth || "",
        bloodGroup: teacher.bloodGroup || "",
        gender: teacher.gender || "",
        nationality: teacher.nationality || "",
        religion: teacher.religion || "",
        maritalStatus: teacher.maritalStatus || "",

        // Address Information - Permanent
        address: teacher.permanentAddress?.address || "",
        village: teacher.permanentAddress?.village || "",
        postOffice: teacher.permanentAddress?.postOffice || "",
        thana: teacher.permanentAddress?.thana || "",
        district: teacher.permanentAddress?.district || "",
        state: teacher.permanentAddress?.state || "",
        country: teacher.permanentAddress?.country || "",
        zipCode: teacher.permanentAddress?.zipCode || "",

        sameAsPermanent: teacher.currentAddress?.sameAsPermanent || false,

        // Professional Information
        designation: teacher?.designation || "",
        department: teacher.department || "",
        joiningDate: teacher?.joiningDate || "",
        monthlySalary: teacher?.monthlySalary || "",
        staffType: teacher?.staffType || "",
        residenceType: teacher?.residenceType || "",

        accountName: teacher.bankDetails?.accountName || "",
        accountNumber: teacher.bankDetails?.accountNumber || "",
        bankName: teacher.bankDetails?.bankName || "",
        branchName: teacher.bankDetails?.branchName || "",
        ifscCode: teacher.bankDetails?.ifscCode || "",

        // Additional Information
        status: teacher?.status || "Active",
        language: teacher?.language || "",
        activeSession: teacher?.activeSession || "",

        // educational info
        teacherPhoto: teacher.teacherPhoto,
        resumeDoc: teacher.resumeDoc,
        certificateDoc: teacher.certificateDoc,
        nationalIdDoc: teacher.nationalIdDoc,

        // Educational Info
        degree: teacher.educationalQualifications?.[0]?.degree || "",
        institution: teacher.educationalQualifications?.[0]?.institution || "",
        specialization: teacher.educationalQualifications?.[0]?.specialization || "",
        year: teacher.educationalQualifications?.[0]?.year || "",

        // Certificate Info
        certificateName: teacher.certifications?.[0]?.name || "",
        issuedBy: teacher.certifications?.[0]?.issuedBy || "",
        certificateYear: teacher.certifications?.[0]?.year || "",
        certificateDescription: teacher.certifications?.[0]?.description || "",

        // Work Experience Info
        organization: teacher.workExperience?.[0]?.organization || "",
        position: teacher.workExperience?.[0]?.position || "",
        from: teacher.workExperience?.[0]?.from || "",
        to: teacher.workExperience?.[0]?.to || "",
        description: teacher.workExperience?.[0]?.description || "",

        // Emergency Contact
        "emergencyContact.name": teacher.emergencyContact?.name || "",
        "emergencyContact.relation": teacher.emergencyContact?.relation || "",
        "emergencyContact.phone": teacher.emergencyContact?.phone || "",

        // Social Media
        "socialMedia.facebook": teacher.socialMedia?.facebook || "",
        "socialMedia.twitter": teacher.socialMedia?.twitter || "",
        "socialMedia.youtube": teacher.socialMedia?.youtube || "",
        "socialMedia.linkedin": teacher.socialMedia?.linkedin || "",
        "socialMedia.instagram": teacher.socialMedia?.instagram || "",
      }
      setDefaultValues(formDefaultValues)
    }
  }, [singlesTeacher])



  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Your existing switch change handler
  }

  const addEducation = () => {
    // Your existing add education handler
  }

  const addCertification = () => {
    // Your existing add certification handler
  }

  const addExperience = () => {
    // Your existing add experience handler
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleSubmit = async (data: any) => {
    console.log(data)
    setIsSubmitting(true)

    // Validation
    if (!data.name) {
      toast.error("Teacher name is !")
      setIsSubmitting(false)
      return
    } else if (!data.phone) {
      toast.error("Phone number is !")
      setIsSubmitting(false)
      return
    } else if (!data.email) {
      toast.error("Email is !")
      setIsSubmitting(false)
      return
    }

    try {
      const monthlySalaryNum = data.monthlySalary ? Number(data.monthlySalary) : undefined
      const teacherSerialNum = data.teacherSerial ? Number(data.teacherSerial) : undefined

      // Create FormData for file uploads
      const formData = new FormData()

      // Add form fields to FormData
      Object.keys(data).forEach((key) => {
        if (key !== "teacherPhoto" && key !== "cvFile" && key !== "certificateFile" && key !== "nidFile") {
          formData.append(key, data[key])
        }
      })

      // Add files to FormData if they exist
      profileImages.forEach((file, index) => {
        formData.append(`profileImages[${index}]`, file)
      })

      cvFiles.forEach((file, index) => {
        formData.append(`cvFiles[${index}]`, file)
      })

      certificateFiles.forEach((file, index) => {
        formData.append(`certificateFiles[${index}]`, file)
      })

      nidFiles.forEach((file, index) => {
        formData.append(`nidFiles[${index}]`, file)
      })

      const submissionData = {
        ...data,
        teacherId: data.teacherId,
        teacherSerial: teacherSerialNum,
        smartIdCard: data.smartIdCard,
        name: data.name,
        phone: data.phone,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        bloodGroup: data.bloodGroup,
        gender: data.gender,
        nationality: data.nationality,
        religion: data.religion,
        maritalStatus: data.maritalStatus,
        teacherPhoto: data.teacherPhoto,

        permanentAddress: {
          address: data.address,
          village: data.village,
          postOffice: data.postOffice,
          thana: data.thana,
          district: data.district,
          state: data.state,
          country: data.country,
          zipCode: data.zipCode,
        },

        currentAddress: {
          address: data.address,
          village: data.village,
          postOffice: data.postOffice,
          thana: data.thana,
          district: data.thana,
          state: data.state,
          country: data.country,
          zipCode: data.zipCode,
        },

        sameAsPermanent: data.sameAsPermanent,
        designation: data.designation,
        department: data.department,
        joiningDate: data.joiningDate,
        monthlySalary: monthlySalaryNum,
        staffType: data.staffType,

        educationalQualifications: [
          data.degree
            ? {
              degree: data.degree,
              institution: data.institution,
              year: data.year,
              specialization: data.specialization,
            }
            : null,
        ].filter(Boolean),

        certifications: [
          data.certificateName
            ? {
              certificateName: data.certificateName,
              issuedBy: data.issuedBy,
              year: data.year,
              description: data.description,
            }
            : null,
        ].filter(Boolean),

        workExperience: [
          data.organization
            ? {
              organization: data.organization,
              position: data.position,
              from: data.from,
              to: data.to,
              description: data.description,
            }
            : null,
        ].filter(Boolean),

        status: data.status || "Active",
        language: data.language,
        activeSession: data.activeSession,
      }
      console.log('submission data',submissionData)

      if (id) {
        // Use formData or submissionData based on your API requirements
        const res = await updateTeacher({ id, data: submissionData }).unwrap()
        console.log('responsive',res)
        if (res.success) {
          setSuccess(true)
          setSnackbar({
            open: true,
            message: "Teacher updated successfully!",
            severity: "success",
          })
          setTimeout(() => {
            router.push("/dashboard/teacher/list")
          }, 2000)
        }
      } else {
        // Use formData or submissionData based on your API requirements
        const res = await createTeacher(submissionData).unwrap()
        console.log(res)
        if (res.success) {
          setSuccess(true)
          setSnackbar({
            open: true,
            message: "Teacher registered successfully!",
            severity: "success",
          })
          setTimeout(() => {
            router.push("/dashboard/teacher/list")
          }, 2000)
        }
      }
    } catch (error: any) {
      console.error("❌ Submission error:", error)
      toast.error("Failed to process teacher information")
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

  const steps = [
    {
      label: "Basic Information",
      description: "Enter teacher's personal details",
      icon: <Person />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label={
                <span>
                  Full Name <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="name"
              size="medium"
              InputProps={{
                startAdornment: <DriveFileRenameOutline sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="Teacher Serial"
              name="teacherSerial"
              type="number"
              size="medium"
              InputProps={{
                startAdornment: <Badge sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="Smart ID Card"
              name="smartIdCard"
              size="medium"
              InputProps={{
                startAdornment: <CardMembership sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label={
                <span>
                  Phone Number <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="phone"
              size="medium"
              InputProps={{
                startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label={
                <span>
                  Email Address <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="email"
              type="email"
              size="medium"
              InputProps={{
                startAdornment: <Email sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftDatePicker fullWidth label=" Date of Birth" name="dateOfBirth" />
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
              name="gender"
              size="medium"
              label="Gender"
              placeholder="Select Gender"
              items={genders}
              adornment={<Wc color="action" />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="Nationality"
              name="nationality"
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

          {/* Document Upload Section */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" color="primary" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              Documents & Files
            </Typography>
            <Grid container spacing={3}>
              {/* Profile Image Upload */}
              <Grid item xs={12} md={6}>
                <MultiFileUploadController name="teacherPhoto" label="Profile Images" />

              </Grid>

              {/* CV Upload */}
              <Grid item xs={12} md={6}>
                <MultiFileUploadController name="resumeDoc" label="CV / Resume" />

              </Grid>

              {/* Certificate Upload */}

              <Grid item xs={12} md={6}>
                <MultiFileUploadController name="certificateDoc" label="Certificates" />

              </Grid>
              {/* NID Upload */}
              <Grid item xs={12} md={6}>
                <MultiFileUploadController name="nationalIdDoc" label="National ID" />

              </Grid>
            </Grid>
          </Grid>
          {/* 
          <Grid item xs={12}>
            <FileUploadWithIcon name="teacherPhoto" label="Teacher Photo" />
          </Grid> */}
        </Grid>
      ),
    },
    // Rest of your steps...
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
                    fullWidth
                    label="Address Line"
                    name="address"
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
                    size="medium"
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="District"
                    name="district"
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
                    size="medium"
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Country"
                    name="country"
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
                control={<Switch name="sameAsPermanent" onChange={handleSwitchChange} color="primary" />}
                label="Same as Permanent"
              />
            </Box>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Address Line"
                    name="currentAddress.address"
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
                {/* Rest of your current address fields */}
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
              name="department"
              size="medium"
              label="Department"
              placeholder="Select Department"
              items={departments}
              adornment={<Apartment color="action" />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftDatePicker fullWidth label="Joining Date" name="joiningDate" size="medium" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              label="Monthly Salary"
              name="monthlySalary"
              type="number"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CraftSelectWithIcon
              name="staffType"
              size="medium"
              label="Staff Type"
              placeholder="Select Staff Type"
              items={staffTypes}
              adornment={<Work color="action" />}
            />
          </Grid>
          {/* Rest of your professional information fields */}
        </Grid>
      ),
    },
    // Educational Information and Additional Information steps...
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
            <Paper elevation={2} sx={{ p: 2, mb: 3, position: "relative", borderRadius: 2 }}>
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "error.main",
                }}
              // onClick={() => removeEducation(index)}
              >
                <Clear fontSize="small" />
              </IconButton>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Degree/Certificate"
                    name="degree"
                    size="medium"
                    InputProps={{
                      startAdornment: <School sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Institution"
                    name="institution"
                    size="medium"
                    InputProps={{
                      startAdornment: <BusinessCenter sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Year of Completion"
                    name="year"
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
                    size="medium"
                    InputProps={{
                      startAdornment: <School sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Button variant="outlined" startIcon={<Add />} onClick={addEducation} sx={{ mb: 4, borderRadius: 100 }}>
              Add Education
            </Button>

            <Typography variant="h6" color="primary" gutterBottom>
              Certifications
            </Typography>
            <Paper elevation={2} sx={{ p: 2, mb: 3, position: "relative", borderRadius: 2 }}>
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "error.main",
                }}
              // onClick={() => removeCertification(index)}
              >
                <Clear fontSize="small" />
              </IconButton>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Certificate Name"
                    name="certificateName"
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
                    size="medium"
                    InputProps={{
                      startAdornment: <CardMembership sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Button variant="outlined" startIcon={<Add />} onClick={addCertification} sx={{ mb: 4, borderRadius: 100 }}>
              Add Certification
            </Button>

            <Typography variant="h6" color="primary" gutterBottom>
              Work Experience
            </Typography>
            <Paper elevation={2} sx={{ p: 2, mb: 3, position: "relative", borderRadius: 2 }}>
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "error.main",
                }}
              // onClick={() => removeExperience(index)}
              >
                <Clear fontSize="small" />
              </IconButton>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Organization"
                    name="organization"
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
          {/* Your additional information fields */}
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" gutterBottom>
              Other Information
            </Typography>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CraftSelectWithIcon
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
        <Container maxWidth="xl" sx={{p:{xs:"4px"}}}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Person sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              {id ? "Edit Teacher" : "New Teacher Registration"}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 700 }}>
            {id
              ? "Update teacher information by modifying the  fields."
              : "Register a new teacher by filling in the  information. Follow the steps to complete the registration process."}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{p:{xs:"4px"}}}>
        <Box sx={{ mb: 3 }}>
          <Link href="/dashboard/teacher/list" passHref>
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

        <CraftForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          key={Object.keys(defaultValues).length > 0 ? "form-with-data" : "empty-form"}
        >
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
              teacher's professional records, attendance, and salary payments. Make sure to fill in all fields marked
              with an asterisk (*) for successful registration.
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
