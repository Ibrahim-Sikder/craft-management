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
    Fingerprint,
    BusinessCenter,
    Apartment,
    Work,
    VerifiedUser,
    Group,
    Add,
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

import FileUploadWithIcon from "@/components/Forms/Upload"
import CraftDatePicker from "@/components/Forms/DatePicker"
import toast from "react-hot-toast"
import { useCreateStaffMutation, useGetSingleStaffQuery, useUpdateStaffMutation } from "@/redux/api/staffApi"
import { staffSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"

interface TeacherFormProps {
    id?: string
}

export default function StaffForm({ id }: TeacherFormProps = {}) {
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

    // Add API hooks
    const [createStaff] = useCreateStaffMutation()
    const [updateStaff] = useUpdateStaffMutation({})
    const { data: singlesStaff, isLoading } = useGetSingleStaffQuery(
        { id },
        {
            skip: !id,
            refetchOnMountOrArgChange: true,
        },
    )

    useEffect(() => {
        if (singlesStaff && singlesStaff.data) {
            const Staff = singlesStaff.data

            // Set selected subjects if available
            if (Staff.professionalInfo?.subjectsTaught) {
                setSelectedSubjects(Staff.professionalInfo.subjectsTaught)
            }

            // Create comprehensive default values object
            const formDefaultValues = {
                // Basic Information
                teacherId: Staff.teacherId || "",
                teacherSerial: Staff.teacherSerial || "",
                smartIdCard: Staff.smartIdCard || "",
                name: Staff.name || "",
                englishName: Staff.englishName || "",
                phone: Staff.phone || "",
                email: Staff.email || "",
                dateOfBirth: Staff.dateOfBirth || "",
                bloodGroup: Staff.bloodGroup || "",
                gender: Staff.gender || "",
                nationality: Staff.nationality || "",
                religion: Staff.religion || "",
                maritalStatus: Staff.maritalStatus || "",

                // Address Information - Permanent
                address: Staff.permanentAddress?.address || "",
                village: Staff.permanentAddress?.village || "",
                postOffice: Staff.permanentAddress?.postOffice || "",
                thana: Staff.permanentAddress?.thana || "",
                district: Staff.permanentAddress?.district || "",
                state: Staff.permanentAddress?.state || "",
                country: Staff.permanentAddress?.country || "",
                zipCode: Staff.permanentAddress?.zipCode || "",

                sameAsPermanent: Staff.currentAddress?.sameAsPermanent || false,

                // Professional Information
                designation: Staff?.designation || "",
                department: Staff.department || "",
                joiningDate: Staff?.joiningDate || "",
                monthlySalary: Staff?.monthlySalary || "",
                staffType: Staff?.staffType || "",
                residenceType: Staff?.residenceType || "",



                accountName: Staff.bankDetails?.accountName || "",
                accountNumber: Staff.bankDetails?.accountNumber || "",
                bankName: Staff.bankDetails?.bankName || "",
                branchName: Staff.bankDetails?.branchName || "",
                ifscCode: Staff.bankDetails?.ifscCode || "",

                // Additional Information
                status: Staff?.status || "Active",
                language: Staff?.language || "",
                activeSession: Staff?.activeSession || "",

                // educational info 

                staffPhoto: Staff.staffPhoto,

                // Educational Info
                degree: Staff.educationalQualifications?.[0]?.degree || '',
                institution: Staff.educationalQualifications?.[0]?.institution || '',
                specialization: Staff.educationalQualifications?.[0]?.specialization || '',
                year: Staff.educationalQualifications?.[0]?.year || '',

                // Certificate Info
                certificateName: Staff.certifications?.[0]?.name || '',
                issuedBy: Staff.certifications?.[0]?.issuedBy || '',
                certificateYear: Staff.certifications?.[0]?.year || '',
                certificateDescription: Staff.certifications?.[0]?.description || '',

                // Work Experience Info
                organization: Staff.workExperience?.[0]?.organization || '',
                position: Staff.workExperience?.[0]?.position || '',
                from: Staff.workExperience?.[0]?.from || '',
                to: Staff.workExperience?.[0]?.to || '',
                description: Staff.workExperience?.[0]?.description || '',

                // Emergency Contact
                "emergencyContact.name": Staff.emergencyContact?.name || "",
                "emergencyContact.relation": Staff.emergencyContact?.relation || "",
                "emergencyContact.phone": Staff.emergencyContact?.phone || "",

                // Social Media
                "socialMedia.facebook": Staff.socialMedia?.facebook || "",
                "socialMedia.twitter": Staff.socialMedia?.twitter || "",
                "socialMedia.youtube": Staff.socialMedia?.youtube || "",
                "socialMedia.linkedin": Staff.socialMedia?.linkedin || "",
                "socialMedia.instagram": Staff.socialMedia?.instagram || "",
            }
            setDefaultValues(formDefaultValues)
        }
    }, [singlesStaff])

    const handleInputChange = () => {

    }

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    const addEducation = () => { }

    const removeEducation = (index: number) => { }

    const addCertification = () => { }

    const removeCertification = (index: number) => { }

    const addExperience = () => {
        //
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
        if (!data.name) {
            toast.error("Name is required!");
            return;
        } else if (!data.gender) {
            toast.error("Gender is required!");
            return;
        } else if (!data.email) {
            toast.error("Email is required!");
            return;
        }

        else {

            try {
                const monthlySalaryNum = data.monthlySalary ? Number(data.monthlySalary) : undefined
                const staffSerialNum = data.teacherSerial ? Number(data.teacherSerial) : undefined

                const submissionData = {
                    ...data,
                    staffSerial: staffSerialNum,
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
                    staffPhoto: data.staffPhoto,

                    // Address information
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

                if (id) {
                    const res = await updateStaff({ id, data: submissionData }).unwrap()
                    if (res.success) {
                        setSuccess(true)
                        setSnackbar({
                            open: true,
                            message: "Staff updated successfully!",
                            severity: "success",
                        })

                        setTimeout(() => {
                            router.push("/dashboard/super_admin/staff/list")
                        }, 2000)
                    }
                } else {
                    const res = await createStaff(submissionData).unwrap()

                    if (res.success) {
                        setSuccess(true)
                        setSnackbar({
                            open: true,
                            message: "Staff registered successfully!",
                            severity: "success",
                        })

                        setTimeout(() => {
                            router.push("/dashboard/super_admin/staff/list")
                        }, 2000)
                    }
                }
            } catch (error: any) {
                toast.error('Failed to create staff!')


            }
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
            description: "Enter Staff's personal details",
            icon: <Person />,
            content: (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <CraftInputWithIcon

                            fullWidth

                            name="name"
                            label={
                                <span>
                                    Full Name <span style={{ color: 'red' }}>*</span>
                                </span>
                            }
                            size="medium"
                            InputProps={{
                                startAdornment: <DriveFileRenameOutline sx={{ color: "text.secondary", mr: 1 }} />,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CraftInputWithIcon

                            fullWidth
                            label="Staff Serial"
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
                            label="Phone Number"
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

                            name="email"
                            label={
                                <span>
                                    Email Address <span style={{ color: 'red' }}>*</span>
                                </span>
                            }
                            type="email"
                            size="medium"
                            InputProps={{
                                startAdornment: <Email sx={{ color: "text.secondary", mr: 1 }} />,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CraftDatePicker
                            fullWidth

                            name="dateOfBirth"
                            label={
                                <span>
                                    Date of Birth <span style={{ color: 'red' }}>*</span>
                                </span>
                            }

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

                            name="gender"
                            size="medium"
                            label={
                                <span>
                                    Gender <span style={{ color: 'red' }}>*</span>
                                </span>
                            }

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
                    <Grid item xs={12}>
                        <FileUploadWithIcon name="staffPhoto" label="Staff Photo" />
                    </Grid>
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
                            label={
                                <span>
                                    Designation
                                </span>
                            }

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
                        <CraftDatePicker

                            fullWidth
                            label="Joining Date"
                            name="joiningDate"
                            size="medium"
                        // InputProps={{
                        //   startAdornment: <EventNote sx={{ color: "text.secondary", mr: 1 }} />,
                        // }}
                        />
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
                //    background: "#f8fafc",
                pt: 2,
                pb: 8,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    background: "linear-gradient(90deg, #00b09b 0%, #96c93d 100%)",
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
                            {id ? "Edit Staff" : "New Staff Registration"}
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 700 }}>
                        {id
                            ? "Update Staff information by modifying the required fields."
                            : "Register a new Staff by filling in the required information. Follow the steps to complete the registration process."}
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="xl">
                <Box sx={{ mb: 3 }}>
                    <Link href="/dashboard/super_admin/staff/list" passHref>
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
                            Back to Staff List
                        </Button>
                    </Link>
                </Box>

                <CraftForm
                    resolver={zodResolver(staffSchema)}
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
                                                        {id ? "Update Staff" : "Register Staff"}
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
                            Registering a Staff is the first step in the onboarding process. After registration, you can manage the
                            Staff's professional records, attendance, and salary payments. Make sure to fill in all required fields
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
                            ? "Staff has been updated successfully. Redirecting to Staff list..."
                            : "Staff has been registered successfully. Redirecting to Staff list..."}
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
