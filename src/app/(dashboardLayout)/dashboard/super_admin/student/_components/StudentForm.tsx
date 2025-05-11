/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
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
} from "@mui/material"
import {
  Person,
  People,
  Home,
  School,
  AttachMoney,
  Settings,
  Save,
  Badge,
  Phone,
  Cake,
  Bloodtype,
  DriveFileRenameOutline,
  ContactPhone,
  Contacts,
  CreditCard,
  LocationOn,
  Class,
  CalendarMonth,
  Description,
  CheckCircle,
  ArrowBack,
  Clear,
  Help,
} from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import CraftForm from "@/components/Forms/Form"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import CraftSelectWithIcon from "@/components/Forms/selectWithIcon"
import { batches, bloodGroup, classes, sections } from "@/options"
import CraftSwitch from "@/components/Forms/switch"
import { useCreateStudentsMutation, useGetSingleStudentQuery, useUpdateStudentMutation } from "@/redux/api/studentApi"
import { zodResolver } from "@hookform/resolvers/zod"
import FileUploadWithIcon from "@/components/Forms/Upload"
import { studentSchema } from "@/schema"
import { FieldValues } from "react-hook-form"
import { useGetAllClassesQuery } from "@/redux/api/classApi"
import { useGetAllSectionsQuery } from "@/redux/api/sectionApi"
import { useGetAllSessionsQuery } from "@/redux/api/sessionApi"
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon"
import toast from "react-hot-toast"

interface StudentFormProps {
  id?: string
}

const StudentForm = ({ id }: StudentFormProps) => {
  const [createStudents] = useCreateStudentsMutation()
  const [updateStudent] = useUpdateStudentMutation()
  const { data, isLoading } = useGetSingleStudentQuery(
    { id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    },
  )
  const formRef = useRef<any>(null)

  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  interface FormData {
    permanentAddress?: string
    permanentDistrict?: string
    permanentThana?: string
    sameAsPermanent?: boolean
    presentAddress?: string
    presentDistrict?: string
    presentThana?: string
    sendAdmissionSMS?: boolean
    sendAttendanceSMS?: boolean
    studentPhoto?: string | File

  }

  const [formData, setFormData] = useState<FormData>({})
  const [defaultValues, setDefaultValues] = useState<any>({})
  useEffect(() => {
    if (data?.data) {
      const studentData = data.data
      setFormData({
        studentPhoto: studentData.studentPhoto,
        sameAsPermanent: studentData.sameAsPermanent || false,
        permanentAddress: studentData.permanentAddress,
        permanentDistrict: studentData.permanentDistrict,
        permanentThana: studentData.permanentThana,
        presentAddress: studentData.presentAddress,
        presentDistrict: studentData.presentDistrict,
        presentThana: studentData.presentThana,
        sendAdmissionSMS: studentData.sendAdmissionSMS || false,
        sendAttendanceSMS: studentData.sendAttendanceSMS || false,
      })
      const formDefaultValues = {
        // Basic Information
        name: studentData.name || "",
        smartIdCard: studentData.smartIdCard || "",
        email: studentData.email || "",
        mobile: studentData.mobile || "",
        birthDate: studentData.birthDate || "",
        birthRegistrationNo: studentData.birthRegistrationNo || "",
        bloodGroup: studentData.bloodGroup || "",
        gender: studentData.gender || "",

        // Family Information
        fatherName: studentData.fatherName || "",
        motherName: studentData.motherName || "",
        guardianName: studentData.guardianName || "",
        guardianMobile: studentData.guardianMobile || "",
        relation: studentData.relation || "",
        nidFatherMotherGuardian: studentData.nidFatherMotherGuardian || "",

        // Address Information
        permanentAddress: studentData.permanentAddress || "",
        permanentDistrict: studentData.permanentDistrict || "",
        permanentThana: studentData.permanentThana || "",
        sameAsPermanent: studentData.sameAsPermanent || false,
        presentAddress: studentData.presentAddress || "",
        presentDistrict: studentData.presentDistrict || "",
        presentThana: studentData.presentThana || "",

        // Academic Information
        className: studentData.className || [],
        studentClassRoll: studentData.studentClassRoll || "",
        batch: studentData.batch || "",
        section: studentData.section || [],
        activeSession: studentData.activeSession || [],
        status: studentData.status || "",
        studentType: studentData.studentType || "",
        additionalNote: studentData.additionalNote || "",

        // Fee Information
        admissionFee: studentData.admissionFee || 0,
        monthlyFee: studentData.monthlyFee || 0,
        previousDues: studentData.previousDues || 0,
        sessionFee: studentData.sessionFee || 0,
        residenceFee: studentData.residenceFee || 0,
        otherFee: studentData.otherFee || 0,
        transportFee: studentData.transportFee || 0,
        boardingFee: studentData.boardingFee || 0,

        // Other Settings
        studentSerial: studentData.studentSerial || "",
        sendAdmissionSMS: studentData.sendAdmissionSMS || false,
        sendAttendanceSMS: studentData.sendAttendanceSMS || false,

        // Photo
        studentPhoto: studentData.studentPhoto || "",
      }

      setDefaultValues(formDefaultValues)
    }
  }, [data])

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")

  const { data: classData } = useGetAllClassesQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })
  const { data: sectionData } = useGetAllSectionsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })
  const { data: sessionData } = useGetAllSessionsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })
  const classOption = useMemo(() => {
    if (!classData?.data?.classes) return []
    return classData?.data?.classes.map((clg: any) => ({
      label: clg.className,
      value: clg._id,
    }))
  }, [classData])
  const sectionOption = useMemo(() => {
    if (!sectionData?.data?.sections) return []
    return sectionData?.data?.sections.map((sec: any) => ({
      label: sec.name,
      value: sec._id,
    }))
  }, [sectionData])

  const sessionOption = useMemo(() => {
    if (!sessionData?.data?.sessions) return []
    return sessionData?.data?.sessions.map((sec: any) => ({
      label: sec.sessionName,
      value: sec._id,
    }))
  }, [sessionData])



  const [success, setSuccess] = useState(false)

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: checked,
      }

      if (name === "sameAsPermanent" && checked) {
        newData.presentAddress = prev.permanentAddress || ""
        newData.presentDistrict = prev.permanentDistrict || ""
        newData.presentThana = prev.permanentThana || ""
      }

      return newData
    })
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = async (data: FieldValues) => {
    if (!data.name) {
      toast.error("Student name is missing!");
    }
    else if (!data.studentType) {
      toast.error("Student type is missing!");
    } else {
      const classArray = data.className?.map((item: any) => item.label) || [];
      const sectionArray = data.section?.map((item: any) => item.label) || [];
      const sessionArray = data.activeSession?.map((item: any) => item.label) || [];

      const submissionData = {
        ...data,
        sameAsPermanent: formData.sameAsPermanent || false,
        presentAddress: formData.sameAsPermanent ? data.permanentAddress : data.presentAddress,
        presentDistrict: formData.sameAsPermanent ? data.permanentDistrict : data.presentDistrict,
        presentThana: formData.sameAsPermanent ? data.permanentThana : data.presentThana,
        admissionFee: Number(data.admissionFee || 0),
        monthlyFee: Number(data.monthlyFee || 0),
        previousDues: Number(data.previousDues || 0),
        sessionFee: Number(data.sessionFee || 0),
        residenceFee: Number(data.residenceFee || 0),
        otherFee: Number(data.otherFee || 0),
        transportFee: Number(data.transportFee || 0),
        boardingFee: Number(data.boardingFee || 0),
        studentPhoto: data.studentPhoto,
        className: classArray,
        section: sectionArray,
        activeSession: sessionArray,
      };



      try {
        if (id) {
          const res = await updateStudent({ id, data: submissionData }).unwrap();
          if (res.success) {
            setSuccess(true);
            setSnackbar({
              open: true,
              message: "Student updated successfully!",
              severity: "success",
            });
            setTimeout(() => {
              router.push("/dashboard/super_admin/student/list");
            }, 2000);
          }
        } else {
          const res = await createStudents(submissionData).unwrap();
          if (res.success) {
            setSuccess(true);
            setSnackbar({
              open: true,
              message: "Student registered successfully!",
              severity: "success",
            });
            setTimeout(() => {
              router.push("/dashboard/super_admin/student/list");
            }, 2000);
          }
        }
      } catch (error: any) {
        console.error("❌ Submission error:", error);

      }
    }
  };



  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }

  const handleReset = () => {
    setFormData({})
    setActiveStep(0)
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  const steps = [
    {
      label: "Personal Information",
      description: "Enter student's personal details",
      icon: <Person />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="name"

              label={
                <span>
                  Student Name <span style={{ color: 'red' }}>*</span>
                </span>
              }
              placeholder="e.g., John Smith"
              size="medium"
              InputProps={{
                startAdornment: <DriveFileRenameOutline sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="smartIdCard"
              label="Smart ID Card"
              placeholder="e.g., SMART-001"
              size="medium"
              InputProps={{
                startAdornment: <Badge sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="gender"
              size="medium"
              label='Gender'

              placeholder="Select Gender"
              items={["Male", "Female", "Other"]}
              adornment={<Person color="action" />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="mobile"
              label="Mobile Number"
              placeholder="e.g., +1 234 567 8900"
              size="medium"
              InputProps={{
                startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="bloodGroup"
              size="medium"
              label="Blood Group"
              placeholder="Select blood group"
              items={bloodGroup}
              adornment={<Bloodtype color="action" />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="birthDate"
              label='  Birth Date'
              type="date"
              size="medium"
              InputProps={{
                startAdornment: <Cake sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="birthRegistrationNo"
              label='Birth Registration No.'

              placeholder="Birth Registration Number"
              size="medium"
              InputProps={{
                startAdornment: <CreditCard sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="email"
              label='Email'

              placeholder="e.g., exmaple@gmail.com"
              size="medium"
              InputProps={{
                startAdornment: <DriveFileRenameOutline sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FileUploadWithIcon
              name="studentPhoto"
              label="Student Photo"

            />

          </Grid>
        </Grid>
      ),
    },
    {
      label: "Family Information",
      description: "Enter family and guardian details",
      icon: <People />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="fatherName"
              label=" Father's Name."

              placeholder="Father's Name"
              size="medium"
              InputProps={{
                startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              label='Mother Name'
              name="motherName"

              placeholder="Mother Name"
              size="medium"
              InputProps={{
                startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="guardianName"
              label="Guardian's Name"
              placeholder="Guardian's Name"
              size="medium"
              InputProps={{
                startAdornment: <Contacts sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="guardianMobile"
              label="Guardian's Mobile"
              placeholder="Guardian's Mobile"
              size="medium"
              InputProps={{
                startAdornment: <ContactPhone sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="relation"
              label="Relation with Guardian"
              placeholder="e.g., Father, Mother, Uncle"
              size="medium"
              InputProps={{
                startAdornment: <People sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="nidFatherMotherGuardian"

              label={
                <span>
                  NID (Father/Mother/Guardian)
                </span>
              }
              placeholder="NID (Father/Mother/Guardian)"
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
                    Guardian Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    The guardian will be the primary contact for all communications regarding the student. Make sure to
                    provide accurate contact information.
                  </Typography>
                </Box>
              </Box>
            </Paper>
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
                    fullWidth
                    label=' Permanent Address'
                    name="permanentAddress"

                    placeholder="Permanent Address"
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
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                    name="permanentDistrict"
                    label="District"
                    placeholder="District"
                    size="medium"
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                    name="permanentThana"
                    size="medium"
                    label="Thana"
                    placeholder="Select Thana"
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
                    name="presentAddress"
                    label="Present Address"
                    placeholder="Present Address"
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
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                    name="presentDistrict"
                    label="District"
                    placeholder="District"
                    size="medium"
                    disabled={formData.sameAsPermanent}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                    name="presentThana"
                    label="Thana"
                    placeholder="Thana"
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
      label: "Academic Information",
      description: "Enter class, batch and academic details",
      icon: <School />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CraftIntAutoCompleteWithIcon
              name="className"

              label='Class'
              placeholder="Select Class"
              options={classOption}
              fullWidth
              multiple
              icon={<Class color="primary" />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftInputWithIcon
              fullWidth
              name="studentClassRoll"
              label="Class Roll"
              placeholder="Class Roll"
              size="medium"
              InputProps={{
                startAdornment: <Badge sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="batch"
              size="medium"
              label="Batch"
              placeholder="Select Batch"
              items={batches}
              adornment={<People color="action" />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftIntAutoCompleteWithIcon
              name="section"
              size="medium"
              placeholder="Select Section"
              label='Section'
              options={sectionOption}
              fullWidth
              multiple
              icon={<Class color="primary" />}
            />

          </Grid>

          <Grid item xs={12} md={6}>
            <CraftIntAutoCompleteWithIcon
              name="activeSession"
              size="medium"

              placeholder="Select Active Session"
              options={sessionOption}
              label=' Active Session'
              fullWidth
              multiple
              icon={<CalendarMonth color="primary" />}
            />


          </Grid>

          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="status"
              size="medium"
              label="Status"
              placeholder="Select Status"
              items={["Active", "Inactive", "Graduated"]}
              adornment={<CheckCircle color="action" />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CraftSelectWithIcon
              name="studentType"
              size="medium"

              label={
                <span>
                  Student Type <span style={{ color: 'red' }}>*</span>
                </span>
              }
              placeholder="Select Student Type"
              items={["Residential", "Non-residential", "Day-care"]}
              adornment={<Person color="action" />}
            />
          </Grid>

          <Grid item xs={12}>
            <CraftInputWithIcon
              fullWidth
              name="additionalNote"
              label="Additional Notes"
              placeholder="Additional Notes"
              size="medium"
              multiline
              rows={3}
              InputProps={{
                startAdornment: (
                  <Description sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }} />
                ),
              }}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Fee Information",
      description: "Enter fee details for the student",
      icon: <AttachMoney />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 3 }}>
              Enter all applicable fees for this student. Leave as 0 for any fees that don't apply.
            </Alert>
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="admissionFee"
              label="Admission Fee"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="monthlyFee"
              label="Monthly Fee"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="previousDues"
              label="Previous Dues"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="sessionFee"
              label="Session Fee"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="residenceFee"
              label="Residence Fee"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="otherFee"
              label="Other Fee"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="transportFee"
              label="Transport Fee"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftInputWithIcon
              fullWidth
              name="boardingFee"
              label="Boarding Fee"
              type="number"
              placeholder="0"
              size="medium"
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Other Settings",
      description: "Configure additional settings",
      icon: <Settings />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: "rgba(0, 0, 0, 0.02)",
                borderColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 3 }}>
                Notification Settings
              </Typography>

              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={4}>
                  <CraftSwitch
                    name="sendAdmissionSMS"
                    label="Send Admission SMS"
                    onChange={handleSwitchChange}
                    checked={formData.sendAdmissionSMS || false}
                  />

                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: 4 }}>
                    Send SMS notification upon admission
                  </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    name="studentSerial"
                    label="Student Serial"
                    placeholder="Student Serial"
                    size="medium"
                    InputProps={{
                      startAdornment: <Badge sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <CraftSwitch
                    name="sendAttendanceSMS"
                    label="Send Attendance SMS"
                    onChange={handleSwitchChange}
                    checked={formData.sendAttendanceSMS || false}
                  />

                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: 4 }}>
                    Send SMS for attendance updates
                  </Typography>
                </Grid>
              </Grid>
            </Card>
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
                    SMS Notifications
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    SMS notifications will be sent to the guardian's mobile number. Make sure the mobile number is
                    correct before enabling these options.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ),
    },
  ]

  if (isLoading) {
    return <h4>Loading.......</h4>
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
              {id ? "Edit Student" : "New Student Registration"}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 700 }}>
            {id
              ? "Update student information by modifying the required fields."
              : "Register a new student by filling in the required information. Follow the steps to complete the registration process."}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Box sx={{ mb: 3 }}>
          <Link href="/dashboard/super_admin/student/list" passHref>
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
              Back to Student List
            </Button>
          </Link>
        </Box>

        <CraftForm

          onSubmit={handleSubmit}
          // resolver={zodResolver(studentSchema)}
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
                            {id ? "Update Student" : "Register Student"}
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
              Registering a student is the first step in the enrollment process. After registration, you can manage the
              student's academic records, attendance, and fee payments. Make sure to fill in all required fields marked
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
            Student has been registered successfully. Redirecting to student list...
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

export default StudentForm
