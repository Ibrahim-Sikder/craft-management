/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Button,
  Divider,
  Avatar,
  Card,
  CardContent,
  InputAdornment,
  FormHelperText,
} from "@mui/material"
import {
  Person,
  School,
  Group,
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
  Class,
} from "@mui/icons-material"
import CraftForm from "@/components/Forms/Form"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon"
import { useGetAllClassesQuery } from "@/redux/api/classApi"
import CraftSelectWithIcon from "@/components/Forms/selectWithIcon"
import { bloodGroups } from "@/options"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

function AdmissionForm() {
  const router = useRouter()
  const [tabValue, setTabValue] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")

  const { data: classData } = useGetAllClassesQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })
  const classOption = useMemo(() => {
    if (!classData?.data?.classes) return []
    return classData?.data?.classes.map((clg: any) => ({
      label: clg?.className,
      value: clg?._id,
    }))
  }, [classData])
  // Form state
  const [formData, setFormData] = useState({
    // Student Information
    studentNameBangla: "",
    fatherNameBangla: "",
    motherNameBangla: "",
    studentName: "",
    mobileNo: "",
    class: "",
    session: "",
    category: "resident",
    dateOfBirth: "",
    nidBirth: "",
    bloodGroup: "",
    nationality: "",

    // Father's Information
    fatherName: "",
    fatherMobile: "",
    fatherNid: "",
    fatherProfession: "",
    fatherIncome: "",
    fatherEmail: "",
    fatherFb: "",

    // Mother's Information
    motherName: "",
    motherMobile: "",
    motherNid: "",
    motherProfession: "",
    motherIncome: "",
    motherEmail: "",
    motherFb: "",

    // Present Address
    village: "",
    postOffice: "",
    postCode: "",
    policeStation: "",
    district: "",

    // Permanent Address
    permVillage: "",
    permPostOffice: "",
    permPostCode: "",
    permPoliceStation: "",
    permDistrict: "",

    // Guardian Information
    guardianName: "",
    guardianVillage: "",
    guardianPostOffice: "",
    guardianPostCode: "",
    guardianPoliceStation: "",
    guardianDistrict: "",
    guardianProfession: "",
    guardianRelation: "",
    guardianMobile: "",

    // Local Guardian
    localGuardianName: "",
    localGuardianMobile: "",
    categoryDesignation: "",

    // Previous School
    formerInstitution: "",
    formerVillage: "",
    formerPostOffice: "",
    formerPostCode: "",
    formerPoliceStation: "",
    formerDistrict: "",

    // Documents
    birthCertificate: false,
    transferCertificate: false,
    characterCertificate: false,
    markSheet: false,
    photographs: false,

    // Terms
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate required fields based on current tab
    if (tabValue === 0) {
      if (!formData.studentName) newErrors.studentName = "Student name is required"
      if (!formData.mobileNo) newErrors.mobileNo = "Mobile number is required"
      if (!formData.class) newErrors.class = "Class is required"
      if (!formData.fatherName) newErrors.fatherName = "Father's name is required"
      if (!formData.motherName) newErrors.motherName = "Mother's name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Form submitted:", formData)
      setFormSubmitted(true)

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push("/admission/success")
      }, 2000)
    }
  }

  if (formSubmitted) {
    return (
      <Box textAlign="center" p={4}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: "#e8f5e9",
            border: "1px solid #4caf50",
          }}
        >
          <Check sx={{ fontSize: 60, color: "#4caf50", mb: 2 }} />
          <Typography variant="h5" gutterBottom fontWeight="bold" color="#2e7d32">
            Application Submitted Successfully!
          </Typography>
          <Typography variant="body1">
            Thank you for applying. Your application is being processed. You will be redirected to the confirmation page
            shortly.
          </Typography>
        </Paper>
      </Box>
    )
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Paper
        elevation={5}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "16px",
          background: "linear-gradient(135deg, #3f51b5 0%, #673ab7 100%)",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: "white", mr: 2, width: 56, height: 56 }}>
              <School sx={{ color: "#3f51b5" }} />
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ color: "white", mb: 0.5 }}>
                Craft International Institute
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "white", opacity: 0.9 }}>
                226
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "white",
              height: 120,
              width: 120,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="text.secondary">Photo</Typography>
          </Box>
        </Box>
        <Typography variant="h4" align="center" sx={{ color: "white", mt: 3, fontWeight: "bold" }}>
          ADMISSION FORM
        </Typography>
      </Paper>
      <CraftForm
        onSubmit={(data) => {
          // You may want to merge this with your formData state or handle as needed
          console.log("Form submitted:", data)
          setFormSubmitted(true)
          setTimeout(() => {
            router.push("/admission/success")
          }, 2000)
        }}
      >
        <Card elevation={3} sx={{ mb: 4, overflow: "visible" }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3} mb={4}>
              <Grid item xs={12} md={4}>
                <CraftInputWithIcon
                  fullWidth
                  label="Student's Name (বাংলায়)"
                  name="studentNameBangla"
                  size="medium"
                  placeholder="Student's Name (বাংলায়)"
                  InputProps={{
                    startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />

              </Grid>
              <Grid item xs={12} md={4}>
                <CraftInputWithIcon
                  fullWidth
                  label="Father's Name (বাংলায়)"
                  name="fatherNameBangla"
                  size="medium"
                  placeholder="Father's Name (বাংলায়)"
                  InputProps={{
                    startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />

              </Grid>
              <Grid item xs={12} md={4}>
                <CraftInputWithIcon
                  fullWidth
                  label="Mother's Name (বাংলায়)"
                  name="motherNameBangla"
                  placeholder="Mother's Name (বাংলায়)"
                  size="medium"
                  InputProps={{
                    startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
                  }}
                />

              </Grid>
            </Grid>

            <Box textAlign="center" mb={4} p={2} sx={{ bgcolor: "rgba(63, 81, 181, 0.05)", borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                (All information below must be filled in English according to the Birth certificate/Registration card)
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                নিচের সকল তথ্য অবশ্যই বিস্তৃত ছাত্রা রেজিস্ট্রেশন কার্ড অনুযায়ী ইংরেজিতে পূর্ণ করতে হবে।
              </Typography>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
                aria-label="admission form tabs"
                sx={{
                  "& .MuiTab-root": {
                    fontWeight: "bold",
                    py: 2,
                  },
                }}
              >
                <Tab
                  icon={<Person />}
                  iconPosition="start"
                  label="Student Information"
                  id="tab-0"
                  aria-controls="tabpanel-0"
                />
                <Tab icon={<Home />} iconPosition="start" label="Address Details" id="tab-1" aria-controls="tabpanel-1" />
                <Tab
                  icon={<Group />}
                  iconPosition="start"
                  label="Guardian Details"
                  id="tab-2"
                  aria-controls="tabpanel-2"
                />
                <Tab
                  icon={<School />}
                  iconPosition="start"
                  label="Previous School"
                  id="tab-3"
                  aria-controls="tabpanel-3"
                />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Student Information
                </Typography>
              </Paper>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Student's Name"
                    name="studentName"
                    size="medium"
                    placeholder="Student's Name (বাংলায়)"
                    InputProps={{
                      startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Mobile No."
                    name="mobileNo"
                    size="medium"
                    placeholder="Mobile No."
                    InputProps={{
                      startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>

                <Grid item xs={12} md={4}>

                  <CraftIntAutoCompleteWithIcon
                    name="class"
                    label='Class'
                    placeholder="Select Class"
                    options={classOption}
                    fullWidth
                    multiple
                    icon={<Class color="primary" />}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Session"
                    name="session"
                    size="medium"
                    placeholder="Mobile No."
                    InputProps={{
                      startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl component="fieldset">
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Category*
                    </Typography>
                    <RadioGroup row name="category" value={formData.category} onChange={handleChange}>
                      <FormControlLabel value="resident" control={<Radio />} label="Resident" />
                      <FormControlLabel value="non-resident" control={<Radio />} label="Non Resident" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    size="medium"
                    type="date"
                    placeholder="Date of Birth"
                    InputProps={{
                      startAdornment: <Cake sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="NID/ Birth Reg. No"
                    name="nidBirth"
                    size="medium"
                    type="date"
                    placeholder="NID/ Birth Reg. No"
                    InputProps={{
                      startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftSelectWithIcon
                    name="gender"
                    size="medium"
                    label='Blood Group'

                    placeholder="Select Blood Group "
                    items={bloodGroups}
                    adornment={<Person color="action" />}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Nationality"
                    name="nationality"
                    size="medium"

                    placeholder="Date of Birth"
                    InputProps={{
                      startAdornment: <Flag sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Father's Information
                </Typography>
              </Paper>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Father's Name"
                    name="fatherName"
                    size="medium"
                    placeholder="Father's Name"
                    InputProps={{
                      startAdornment: <Flag sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Mobile"
                    name="fatherMobile"
                    size="medium"
                    placeholder="Father's Name"
                    InputProps={{
                      startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="NID/Passport No"
                    name="fatherNid"
                    size="medium"
                    placeholder="NID/Passport No"
                    InputProps={{
                      startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Profession"
                    name="fatherProfession"
                    size="medium"
                    placeholder="NID/Passport No"
                    InputProps={{
                      startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />


                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Monthly Income"
                    name="fatherIncome"
                    size="medium"
                    placeholder="Monthly Income"
                    InputProps={{
                      startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Email ID"
                    name="fatherEmail"
                    size="medium"
                    placeholder="Email ID"
                    InputProps={{
                      startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Facebook ID"
                    name="fatherFb"
                    size="medium"
                    placeholder="Facebook ID"
                    InputProps={{
                      startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Mother's Information
                </Typography>
              </Paper>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Mother's Name"
                    name="motherName"
                    size="medium"
                    placeholder="Monthly Name"
                    InputProps={{
                      startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={6}>
                  rid item xs={12} md={6}
                  <CraftInputWithIcon
                    fullWidth
                    label="Mobile"
                    name="motherMobile"
                    size="medium"
                    placeholder="Monthly Name"
                    InputProps={{
                      startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="NID/Passport No"
                    name="motherNid"
                    size="medium"
                    placeholder="NID/Passport No"
                    InputProps={{
                      startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Profession"
                    name="motherProfession"
                    size="medium"
                    placeholder="NID/Passport No"
                    InputProps={{
                      startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Monthly Income"
                    name="motherIncome"
                    size="medium"
                    placeholder="Monthly Income"
                    InputProps={{
                      startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Email ID"
                    name="motherEmail"
                    size="medium"
                    placeholder="Monthly Income"
                    InputProps={{
                      startAdornment: <Email sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Facebook ID"
                    name="motherFb"
                    size="medium"
                    placeholder="Facebook ID"
                    InputProps={{
                      startAdornment: <Email sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Present Address
                </Typography>
              </Paper>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Village"
                    name="village"
                    size="medium"
                    placeholder="Village"
                    InputProps={{
                      startAdornment: <Email sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Post Office"
                    name="postOffice"
                    size="medium"
                    placeholder="Village"
                    InputProps={{
                      startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="PostCode"
                    name="postCode"
                    size="medium"
                    placeholder="PostCode"
                    InputProps={{
                      startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Police Station"
                    name="policeStation"
                    size="medium"
                    placeholder="Police Station"
                    InputProps={{
                      startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="District"
                    name="district"
                    size="medium"
                    placeholder="District"
                    InputProps={{
                      startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />


                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Permanent Address
                </Typography>
              </Paper>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Village"
                    name="permVillage"
                    size="medium"
                    placeholder="Village"
                    InputProps={{
                      startAdornment: <Home sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />


                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Post Office"
                    name="permPostOffice"
                    size="medium"
                    placeholder="Post Office"
                    InputProps={{
                      startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Post Office"
                    name="permPostOffice"
                    size="medium"
                    placeholder="Post Office"
                    InputProps={{
                      startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Police Station"
                    name="permPoliceStation"
                    size="medium"
                    placeholder="Police Station"
                    InputProps={{
                      startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                    label="District"
                    name="permDistrict"
                    size="medium"
                    placeholder="District"
                    InputProps={{
                      startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Name and Address of guardian by Law (if father is not alive)
                </Typography>
              </Paper>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Name"
                    name="guardianName"
                    size="medium"
                    placeholder="Name"
                    InputProps={{
                      startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Village"
                    name="guardianVillage"
                    size="medium"
                    placeholder="Village"
                    InputProps={{
                      startAdornment: <Home sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Post Office"
                    name="guardianPostOffice"
                    size="medium"
                    placeholder="Post Office"
                    InputProps={{
                      startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                    label="PostCode"
                    name="guardianPostCode"
                    size="medium"
                    placeholder="PostCode"
                    InputProps={{
                      startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                 
                </Grid>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                     label="Police Station"
                    name="guardianPoliceStation"
                    size="medium"
                    placeholder="Police Station"
                    InputProps={{
                      startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                  
                </Grid>
                <Grid item xs={12} md={6}>
                   <CraftInputWithIcon
                    fullWidth
                      label="District"
                    name="guardianDistrict"
                    size="medium"
                    placeholder="District"
                    InputProps={{
                      startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                  
                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                      label="Profession"
                    name="guardianProfession"
                    size="medium"
                    placeholder="District"
                    InputProps={{
                      startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                  
                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                     label="Relation"
                    name="guardianRelation"
                    size="medium"
                    placeholder="Relation"
                    InputProps={{
                      startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                 
                </Grid>
                <Grid item xs={12} md={4}>
                  <CraftInputWithIcon
                    fullWidth
                      label="Mobile No.*"
                    name="guardianMobile"
                    size="medium"
                    placeholder="Mobile No.*"
                    InputProps={{
                      startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                 
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Name of the Local Guardian
                </Typography>
              </Paper>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CraftInputWithIcon
                    fullWidth
                     label="Name"
                    name="localGuardianName"
                    size="medium"
                    placeholder="Name"
                    InputProps={{
                      startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                  
                </Grid>
                <Grid item xs={12} md={6}>
                   <CraftInputWithIcon
                    fullWidth
                    label="Mobile No.*"
                    name="localGuardianMobile"
                    size="medium"
                    placeholder="Mobile No.*"
                    InputProps={{
                      startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                 
                </Grid>
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                   label="Category/ Designation/ Class & Student ID"
                    name="categoryDesignation"
                    size="medium"
                    placeholder="Category/ Designation/ Class & Student ID"
                    InputProps={{
                      startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} />,
                    }}
                  />
                  
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Former institution's name
                </Typography>
              </Paper>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Former institution's name"
                    name="formerInstitution"
                    value={formData.formerInstitution}
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
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Village"
                    name="formerVillage"
                    value={formData.formerVillage}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Home fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Post Office"
                    name="formerPostOffice"
                    value={formData.formerPostOffice}
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
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="PostCode"
                    name="formerPostCode"
                    value={formData.formerPostCode}
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
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Police Station"
                    name="formerPoliceStation"
                    value={formData.formerPoliceStation}
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
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="District"
                    name="formerDistrict"
                    value={formData.formerDistrict}
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
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  অঙ্গীকার নামা:
                </Typography>
              </Paper>

              <Box sx={{ p: 3, bgcolor: "rgba(63, 81, 181, 0.05)", borderRadius: 2, mb: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  আমি........................... সম্পূর্ণ অঙ্গীকার করছি যে, এই প্রতিষ্ঠানের সকল নিয়মকানুন মেনে চলব। যদি: প্রতিষ্ঠানের
                  আইন পরিপন্থি কোনো কিছু আমার সাথে পরিলক্ষিত হয়, তবে কর্তৃপক্ষ যে কোনো সিদ্ধান্ত নিতে পারে।
                </Typography>
              </Box>

              <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  সংযুক্তি:
                </Typography>
              </Paper>

              <Box sx={{ p: 3, bgcolor: "rgba(63, 81, 181, 0.05)", borderRadius: 2, mb: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
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
                          Mark Sheet
                        </Box>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                          Passport Size Photographs (3 copies)
                        </Box>
                      }
                    />
                  </Grid>
                </Grid>

                <Typography variant="body2" color="text.secondary" mt={2}>
                  (১) শিক্ষার্থীর ছবি ৩ কপি।
                  <br />
                  (২) শিক্ষার্থী / পিতা-মাতার জন্মনিবন্ধন অথবা পাসপোর্ট/ জাতীয় পরিচয়পত্রের ফটোকপি
                </Typography>
              </Box>

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
                label="I accept all terms and conditions"
              />

              <Grid container spacing={4} mt={6}>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Divider />
                    <Typography variant="body2" mt={1}>
                      Student's Signature
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Divider />
                    <Typography variant="body2" mt={1}>
                      Guardian's Signature
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Divider />
                    <Typography variant="body2" mt={1}>
                      Principal's Signature
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ArrowBack />}
                onClick={() => setTabValue(Math.max(0, tabValue - 1))}
                disabled={tabValue === 0}
                sx={{
                  borderRadius: "30px",
                  padding: "10px 25px",
                  fontWeight: "bold",
                  textTransform: "none",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                }}
              >
                Previous
              </Button>

              {tabValue === 3 ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<Check />}
                  onClick={handleSubmit}
                  sx={{
                    borderRadius: "30px",
                    padding: "10px 25px",
                    fontWeight: "bold",
                    textTransform: "none",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  Submit Application
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForward />}
                  onClick={() => setTabValue(Math.min(3, tabValue + 1))}
                  sx={{
                    borderRadius: "30px",
                    padding: "10px 25px",
                    fontWeight: "bold",
                    textTransform: "none",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </CraftForm>
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2, bgcolor: "white" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center" }}>
            <Phone color="primary" sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2">+8801830678383</Typography>
              <Typography variant="body2">+8801310726000</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center" }}>
            <Email color="primary" sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2">craftinternationalinstitute.com</Typography>
              <Typography variant="body2">craftinternationalinstitute@gmail.com</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center" }}>
            <LocationCity color="primary" sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2">Narayanhat Sadar</Typography>
              <Typography variant="body2">Narayanganj - 1430</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
export default AdmissionForm