/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Button,
  Divider,
  Avatar,
  Card,
  CardContent,
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
  Check,
  Class,
  Money,
  AccessTime,
  Book,
} from "@mui/icons-material"
import CraftForm from "@/components/Forms/Form"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon"
import { useGetAllClassesQuery } from "@/redux/api/classApi"
import CraftSelectWithIcon from "@/components/Forms/selectWithIcon"
import { bloodGroups } from "@/options"
import { useCreateAdmissionMutation, useGetSingleAdmissionQuery, useUpdateAdmissionMutation } from "@/redux/api/admissionApi"
import toast from "react-hot-toast"
import CraftCheckbox from "@/components/Forms/CraftCheckbox"

type TProps = {
  id?: string | string[];
};

const AdmissionForm = ({ id }: TProps) => {
  const router = useRouter()
  const { data: classData } = useGetAllClassesQuery({ limit: 1000 })
  const [createAdmission] = useCreateAdmissionMutation();
  const [updateAdmission] = useUpdateAdmissionMutation();
  const { data: singleAdmission, isLoading } = useGetSingleAdmissionQuery({ id })
  console.log(singleAdmission)
  const classOption = useMemo(() => {
    return classData?.data?.classes?.map((clg: any) => ({
      label: clg?.className,
      value: clg?._id,
    })) || []
  }, [classData])



  const handleSubmit = async (data: any) => {
    try {
      if (!data || Object.keys(data).length === 0) {
        toast.error("Please fill in all required fields")
        return
      }
      const dateOfBirth = data.dateOfBirth
        ? new Date(data.dateOfBirth).toISOString()
        : new Date().toISOString();

      const submitData = {
        ...data,
        class: Array.isArray(data.class)
          ? data.class.map((c: any) => c?.value || null)
          : [],
        category: data.category && typeof data.category === "object"
          ? data.category.value
          : data.category || null,

        studentNameBangla: data.studentNameBangla || "",
        fatherNameBangla: data.fatherNameBangla || "",
        motherNameBangla: data.motherNameBangla || "",
        studentName: data.studentName || "",
        mobileNo: data.mobileNo || "",
        admissionFee: Number(data.admissionFee),
        monthlyFee: Number(data.monthlyFee),
        session: data.session || "",

        dateOfBirth,
        nidBirth: data.nidBirth || "",
        bloodGroup: data.bloodGroup || "",
        nationality: data.nationality || "",

        fatherName: data.fatherName || "",
        fatherMobile: data.fatherMobile || "",
        fatherNid: data.fatherNid || "",
        fatherProfession: data.fatherProfession || "",
        fatherIncome: data.fatherIncome ? Number(data.fatherIncome) : 0,

        motherName: data.motherName || "",
        motherMobile: data.motherMobile || "",
        motherNid: data.motherNid || "",
        motherProfession: data.motherProfession || "",
        motherIncome: data.motherIncome ? Number(data.motherIncome) : 0,

        presentAddress: {
          village: data.village || "",
          postOffice: data.postOffice || "",
          postCode: data.postCode || "",
          policeStation: data.policeStation || "",
          district: data.district || "",
        },
        permanentAddress: {
          village: data.permVillage || "",
          postOffice: data.permPostOffice || "",
          postCode: data.permPostCode || "",
          policeStation: data.permPoliceStation || "",
          district: data.permDistrict || "",
        },
        guardianInfo: {
          name: data.guardianName || "",
          relation: data.guardianRelation || "",
          mobile: data.guardianMobile || "",
          address: data.guardianVillage || "",
        },
        previousSchool: {
          institution: data.formerInstitution || "",
          address: data.formerVillage || "",
        },
        documents: {
          birthCertificate: !!data.birthCertificate,
          transferCertificate: !!data.transferCertificate,
          characterCertificate: !!data.characterCertificate,
          markSheet: !!data.markSheet,
          photographs: !!data.photographs,
        },
        termsAccepted: !!data.termsAccepted,
      }
      let res
      if (id) {
        res = await updateAdmission({ id, data: submitData }).unwrap()


      } else {
        res = await createAdmission(submitData).unwrap();

      }

      if (res.success) {
        toast.success(res.message || "Student admitted successfully")
        router.push('/dashboard/admission')
      }
    } catch (err: any) {
      console.error("Submission error:", err)
      toast.error(err.data?.message || "Failed to admit student!")
    }
  }
  const defaultValue = {
    studentNameBangla: singleAdmission?.data?.studentNameBangla || "",
    fatherNameBangla: singleAdmission?.data?.fatherNameBangla || "",
    motherNameBangla: singleAdmission?.data?.motherNameBangla || "",
    studentName: singleAdmission?.data?.studentName || "",
    mobileNo: singleAdmission?.data?.mobileNo || "",

    class: singleAdmission?.data?.class?.map((c: any) => ({
      value: c._id,
      label: c.className,
    })) || [],
    session: singleAdmission?.data?.session || "",
    category: singleAdmission?.data?.category || "",
    dateOfBirth: singleAdmission?.data?.dateOfBirth
      ? new Date(singleAdmission.data.dateOfBirth)
      : null,
    nidBirth: singleAdmission?.data?.nidBirth || "",
    bloodGroup: singleAdmission?.data?.bloodGroup || "",
    nationality: singleAdmission?.data?.nationality || "",
    fatherName: singleAdmission?.data?.fatherName || "",
    fatherMobile: singleAdmission?.data?.fatherMobile || "",
    fatherNid: singleAdmission?.data?.fatherNid || "",
    fatherProfession: singleAdmission?.data?.fatherProfession || "",
    fatherIncome: singleAdmission?.data?.fatherIncome || 0,
    motherName: singleAdmission?.data?.motherName || "",
    motherMobile: singleAdmission?.data?.motherMobile || "",
    motherNid: singleAdmission?.data?.motherNid || "",
    motherProfession: singleAdmission?.data?.motherProfession || "",
    motherIncome: singleAdmission?.data?.motherIncome || 0,
    birthCertificate: singleAdmission?.data?.documents?.birthCertificate || false,
    transferCertificate: singleAdmission?.data?.documents?.transferCertificate || false,
    characterCertificate: singleAdmission?.data?.documents?.characterCertificate || false,
    markSheet: singleAdmission?.data?.documents?.markSheet || false,
    photographs: singleAdmission?.data?.documents?.photographs || false,
    village: singleAdmission?.data?.presentAddress?.village || "",
    postOffice: singleAdmission?.data?.presentAddress?.postOffice || "",
    postCode: singleAdmission?.data?.presentAddress?.postCode || "",
    policeStation: singleAdmission?.data?.presentAddress?.policeStation || "",
    district: singleAdmission?.data?.presentAddress?.district || "",
    permVillage: singleAdmission?.data?.permanentAddress?.village || "",
    permPostOffice: singleAdmission?.data?.permanentAddress?.postOffice || "",
    permPostCode: singleAdmission?.data?.permanentAddress?.postCode || "",
    permPoliceStation: singleAdmission?.data?.permanentAddress?.policeStation || "",
    permDistrict: singleAdmission?.data?.permanentAddress?.district || "",
    guardianName: singleAdmission?.data?.guardianInfo?.name || "",
    guardianRelation: singleAdmission?.data?.guardianInfo?.relation || "",
    guardianMobile: singleAdmission?.data?.guardianInfo?.mobile || "",
    guardianVillage: singleAdmission?.data?.guardianInfo?.address || "",

    // Flatten previousSchool
    formerInstitution: singleAdmission?.data?.previousSchool?.institution || "",
    formerVillage: singleAdmission?.data?.previousSchool?.address || "",
    termsAccepted: singleAdmission?.data?.termsAccepted || false,
  };




  console.log(singleAdmission)




  return (
    <Box>
      {
        isLoading ? (
          <h2>Loading.....</h2>
        ) : (
          <Box>

            <Paper elevation={5} sx={{ p: 3, mb: 4, borderRadius: "16px", background: "linear-gradient(135deg, #3f51b5 0%, #673ab7 100%)" }}>
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
                      226, Narayanhat Sadar, Narayanganj
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ bgcolor: "white", height: 120, width: 120, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography color="text.secondary">Photo</Typography>
                </Box>
              </Box>
              <Typography variant="h4" align="center" sx={{ color: "white", mt: 3, fontWeight: "bold" }}>
                ADMISSION FORM
              </Typography>
            </Paper>

            <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
              <Card elevation={3} sx={{ mb: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  {/* Student Information Section */}
                  <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                    <Typography variant="h6">Student Information (বাংলায়)</Typography>
                  </Paper>

                  <Grid container spacing={3} mb={4}>
                    <Grid item xs={12} md={4}>
                      <CraftInputWithIcon
                        fullWidth
                        label="Student's Name"
                        name="studentNameBangla"
                        placeholder="Student's Name (বাংলায়)"
                        InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CraftInputWithIcon
                        fullWidth
                        label="Father's Name"
                        name="fatherNameBangla"
                        placeholder="Father's Name (বাংলায়)"
                        InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CraftInputWithIcon
                        fullWidth
                        label="Mother's Name"
                        name="motherNameBangla"
                        placeholder="Mother's Name (বাংলায়)"
                        InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }}
                      />
                    </Grid>
                  </Grid>

                  <Box textAlign="center" mb={4} p={2} sx={{ bgcolor: "rgba(63, 81, 181, 0.05)", borderRadius: 2 }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      (All information below must be filled in English)
                    </Typography>
                  </Box>

                  {/* Personal Information */}
                  <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                    <Typography variant="h6">Personal Information</Typography>
                  </Paper>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <CraftInputWithIcon
                        fullWidth
                        label="Student's Name"
                        name="studentName"
                        placeholder="Full Name in English"
                        InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CraftInputWithIcon
                        fullWidth
                        label="Mobile No."
                        name="mobileNo"
                        placeholder="01XXXXXXXXX"
                        InputProps={{ startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} /> }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <CraftIntAutoCompleteWithIcon
                        name="class"
                        label='Class'
                        placeholder="Select Class"
                        options={classOption}
                        fullWidth
                        icon={<Class color="primary" />}

                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CraftInputWithIcon
                        fullWidth
                        label="Session"
                        name="session"
                        placeholder="2024-2025"
                        InputProps={{ startAdornment: <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} /> }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CraftSelectWithIcon
                        fullWidth
                        label="Category"
                        name="category"
                        items={['Resident', 'Non Resident']}
                        size="medium"
                        adornment={<CalendarMonth />}

                      />
                    </Grid>


                    <Grid item xs={12} md={4}>
                      <CraftInputWithIcon
                        fullWidth
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        InputProps={{ startAdornment: <Cake sx={{ color: "text.secondary", mr: 1 }} /> }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CraftInputWithIcon
                        fullWidth
                        label="NID/Birth Reg. No"
                        name="nidBirth"
                        placeholder="1234567890"
                        InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CraftSelectWithIcon
                        name="bloodGroup"
                        label='Blood Group'
                        placeholder="Select Blood Group"
                        items={bloodGroups}
                        adornment={<Person color="action" />}
                        size="medium"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CraftInputWithIcon
                        fullWidth
                        label="Nationality"
                        name="nationality"
                        placeholder="Bangladeshi"
                        InputProps={{ startAdornment: <Flag sx={{ color: "text.secondary", mr: 1 }} /> }}
                      />
                    </Grid>
                  </Grid>
                  <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                    <Typography variant="h6">Admission Fee Information</Typography>
                  </Paper>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <CraftInputWithIcon
                        fullWidth
                        label="Admission Fee"
                        name="admissionFee"
                        placeholder="BDT"
                        InputProps={{ startAdornment: <Money sx={{ color: "text.secondary", mr: 1 }} /> }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CraftInputWithIcon
                        fullWidth
                        label="Monthly Fee"
                        name="monthlyFee"
                        placeholder="BDT"
                        InputProps={{ startAdornment: <Money sx={{ color: "text.secondary", mr: 1 }} /> }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CraftSelectWithIcon
                        name="paymentStatus"
                        label="Payment Status"
                        items={["Paid", "Due", "Partial"]}
                        adornment={<Check />}
                        size="medium"
                      />
                    </Grid>
                  </Grid>
                  {/* academic info */}
                  {/* Academic Information */}
                  <Box mt={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "#3f51b5",
                        color: "white",
                        p: 2,
                        mb: 3,
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h6">Academic Information</Typography>
                    </Paper>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Roll Number"
                          name="rollNumber"
                          placeholder="Enter Roll No"
                          InputProps={{
                            startAdornment: <Class sx={{ color: "text.secondary", mr: 1 }} />,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <CraftSelectWithIcon
                          name="section"
                          label="Section"
                          items={["A", "B", "C"]}
                          adornment={<Group />}
                          size="medium"
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <CraftSelectWithIcon
                          name="group"
                          label="Group"
                          items={["Science", "Commerce", "Arts"]}
                          adornment={<School />}
                          size="medium"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Optional Subject"
                          name="optionalSubject"
                          placeholder="e.g. Higher Math / ICT"
                          InputProps={{
                            startAdornment: <Book sx={{ color: "text.secondary", mr: 1 }} />,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <CraftSelectWithIcon
                          name="shift"
                          label="Shift"
                          items={["Morning", "Day", "Evening"]}
                          adornment={<AccessTime />}
                          size="medium"
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Parent Information */}
                  <Box mt={6}>
                    <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                      <Typography variant="h6">Parent Information</Typography>
                    </Paper>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" mb={2}>Father's Information</Typography>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Father's Name"
                          name="fatherName"
                          placeholder="Full Name"
                          InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Mobile"
                          name="fatherMobile"
                          placeholder="01XXXXXXXXX"
                          InputProps={{ startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <CraftInputWithIcon
                          fullWidth
                          label="NID/Passport No"
                          name="fatherNid"
                          placeholder="1234567890"
                          InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Profession"
                          name="fatherProfession"
                          placeholder="Occupation"
                          InputProps={{ startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Monthly Income"
                          name="fatherIncome"
                          placeholder="BDT"
                          InputProps={{ startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" mb={2}>Mother's Information</Typography>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Mother's Name"
                          name="motherName"
                          placeholder="Full Name"
                          InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Mobile"
                          name="motherMobile"
                          placeholder="01XXXXXXXXX"
                          InputProps={{ startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <CraftInputWithIcon
                          fullWidth
                          label="NID/Passport No"
                          name="motherNid"
                          placeholder="1234567890"
                          InputProps={{ startAdornment: <Description sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Profession"
                          name="motherProfession"
                          placeholder="Occupation"
                          InputProps={{ startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Monthly Income"
                          name="motherIncome"
                          placeholder="BDT"
                          InputProps={{ startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Address Section */}
                  <Box mt={6}>
                    <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                      <Typography variant="h6">Address Information</Typography>
                    </Paper>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" mb={2}>Present Address</Typography>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Village"
                          name="village"
                          placeholder="Village Name"
                          InputProps={{ startAdornment: <Home sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Post Office"
                          name="postOffice"
                          placeholder="Post Office"
                          InputProps={{ startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <CraftInputWithIcon
                          fullWidth
                          label="PostCode"
                          name="postCode"
                          placeholder="1230"
                          InputProps={{ startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Police Station"
                          name="policeStation"
                          placeholder="Police Station"
                          InputProps={{ startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="District"
                          name="district"
                          placeholder="District"
                          InputProps={{ startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" mb={2}>Permanent Address</Typography>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Village"
                          name="permVillage"
                          placeholder="Village Name"
                          InputProps={{ startAdornment: <Home sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Post Office"
                          name="permPostOffice"
                          placeholder="Post Office"
                          InputProps={{ startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <CraftInputWithIcon
                          fullWidth
                          label="PostCode"
                          name="permPostCode"
                          placeholder="1230"
                          InputProps={{ startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Police Station"
                          name="permPoliceStation"
                          placeholder="Police Station"
                          InputProps={{ startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="District"
                          name="permDistrict"
                          placeholder="District"
                          InputProps={{ startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Guardian Information */}
                  <Box mt={6}>
                    <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                      <Typography variant="h6">Guardian Information</Typography>
                    </Paper>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Guardian Name"
                          name="guardianName"
                          placeholder="Full Name"
                          InputProps={{ startAdornment: <Person sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Mobile"
                          name="guardianMobile"
                          placeholder="01XXXXXXXXX"
                          InputProps={{ startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Relation"
                          name="guardianRelation"
                          placeholder="Relationship"
                          InputProps={{ startAdornment: <Group sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Address"
                          name="guardianVillage"
                          placeholder="Full Address"
                          InputProps={{ startAdornment: <Home sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Previous School */}
                  <Box mt={6}>
                    <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                      <Typography variant="h6">Previous Institution</Typography>
                    </Paper>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="School Name"
                          name="formerInstitution"
                          placeholder="Institution Name"
                          InputProps={{ startAdornment: <School sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Address"
                          name="formerVillage"
                          placeholder="Full Address"
                          InputProps={{ startAdornment: <LocationCity sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Documents Section */}
                  <Box mt={6}>
                    <Paper elevation={0} sx={{ bgcolor: "#3f51b5", color: "white", p: 2, mb: 3, borderRadius: 2 }}>
                      <Typography variant="h6"> Documents</Typography>
                    </Paper>

                    <Grid container spacing={2} sx={{ p: 2, bgcolor: "rgba(63, 81, 181, 0.05)", borderRadius: 2, mb: 4 }}>
                      <Grid item xs={12} md={6}>
                        <CraftCheckbox name="birthCertificate" label="Birth Certificate" />
                      </Grid>

                      <Grid item xs={12} md={6}>

                        <CraftCheckbox name="transferCertificate" label="Transfer Certificate" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CraftCheckbox name="characterCertificate" label="Character Certificate" />

                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CraftCheckbox name="markSheet" label="Mark Sheet" />

                      </Grid>
                      <Grid item xs={12}>
                        <CraftCheckbox name="photographs" label="Passport Size Photographs (3 copies)" />

                      </Grid>
                    </Grid>


                    <CraftCheckbox name="termsAccepted" label="I accept all terms and conditions" />

                    <Grid container spacing={4} mt={2}>
                      <Grid item xs={12} md={4}>
                        <Box textAlign="center">
                          <Divider />
                          <Typography variant="body2" mt={1}>Student's Signature</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box textAlign="center">
                          <Divider />
                          <Typography variant="body2" mt={1}>Guardian's Signature</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box textAlign="center">
                          <Divider />
                          <Typography variant="body2" mt={1}>Principal's Signature</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Submit Button */}
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={<Check />}
                      sx={{
                        borderRadius: "30px",
                        padding: "12px 40px",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        boxShadow: "0 4px 15px rgba(63, 81, 181, 0.4)",
                        minWidth: "250px"
                      }}
                    >
                      Submit Application
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </CraftForm>

            {/* Contact Footer */}
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2, bgcolor: "white", mt: 4 }}>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Phone color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">+8801830678383, +8801310726000</Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Email color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">craftinternationalinstitute@gmail.com</Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <LocationCity color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">Narayanhat Sadar, Narayanganj</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )
      }
    </Box>
  )
}

export default AdmissionForm