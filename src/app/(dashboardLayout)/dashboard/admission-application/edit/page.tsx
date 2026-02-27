/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import CraftCheckbox from '@/components/Forms/CraftCheckbox'
import CraftRadioGroup from '@/components/Forms/CraftRadioGroup'
import CraftDatePicker from '@/components/Forms/DatePicker'
import CraftForm from '@/components/Forms/Form'
import CraftInput from '@/components/Forms/Input'
import CraftSelect from '@/components/Forms/Select'
import CraftSwitch from '@/components/Forms/switch'
import FileUploadWithIcon from '@/components/Forms/Upload'
import { bloodGroups, classOption, departments, fatherProfessionOptions, genderOptions, motherProfessionOptions } from '@/options'
import { angerOptions, behaviorGeneralOptions, frequencyOptions, interestOptions, obedienceOptions, yesNoOptions, yesNoSometimesOptions, yesNoTryingOptions } from '@/options/application'
import { useGetSingleAdmissionApplicationQuery, useUpdateAdmissionApplicationMutation } from '@/redux/api/admissionApplication'
import {
    ArrowBack,
    Assignment,
    FamilyRestroom,
    Home,
    LocalPhone,
    Person,
    Save,
    School,
    Timeline,
    WhatsApp
} from '@mui/icons-material'
import {
    alpha,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    InputAdornment,
    Paper,
    Typography,
    useTheme,
    Alert,
    Snackbar
} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'





export default function EditAdmissionApplication() {
    const router = useRouter()
    const theme = useTheme()
    const searchParams = useSearchParams();
    const id = searchParams.get("id")

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })


    const { data: singleApplication, isLoading, error: fetchError } = useGetSingleAdmissionApplicationQuery({ id })



    const [updateApplication, { isLoading: isUpdating }] = useUpdateAdmissionApplicationMutation()

    const handleActiveChange = () => {

    }

    // Handle submit
    const handleSubmit = async (formData: any) => {
        try {
            console.log('Form submitted:', formData);

            // Transform data to match Mongoose Schema structure exactly
            const apiData = {
                // Root level fields from Schema
                academicYear: formData.session, // Maps to root 'academicYear'
                termsAccepted: formData.termsAccepted,

                studentInfo: {
                    nameBangla: formData.StudentName,
                    nameEnglish: formData.studentName,
                    dateOfBirth: formData.dateOfBirth,
                    age: Number(formData.Age), // Schema expects Number
                    gender: formData.gender,
                    department: formData.studentDepartment, // Schema key is 'department'
                    class: formData.className,             // Schema key is 'class'
                    session: formData.session,
                    nidBirth: formData.nidBirth,
                    bloodGroup: formData.bloodGroup,
                    nationality: formData.nationality,
                    studentPhoto: formData.studentPhoto,
                },
                academicInfo: {
                    previousSchool: formData.PrevSchool,
                    previousClass: formData.PrevClass,
                    gpa: formData.GPA,
                },
                parentInfo: {
                    father: {
                        nameBangla: formData.FatherNameBangla,
                        nameEnglish: formData.FatherName,
                        profession: formData.FatherJob,
                        education: formData.FatherEdu,
                        mobile: formData.FatherMobile,
                        whatsapp: formData.FatherWhatsapp,
                    },
                    mother: {
                        nameBangla: formData.MotherNameBangla,
                        nameEnglish: formData.MotherName,
                        profession: formData.MotherJob,
                        education: formData.MotherEdu,
                        mobile: formData.MotherMobile,
                        whatsapp: formData.MotherWhatsapp,
                    },
                    guardian: {
                        nameBangla: formData.guardianNameBangla,
                        nameEnglish: formData.guardianName,
                        relation: formData.guardianRelation,
                        mobile: formData.guardianMobile,
                        whatsapp: formData.guardianWhatsapp,
                        profession: formData.guardianJob,
                        address: formData.guardianAddress,
                    },
                },
                address: {
                    present: {
                        village: formData.village,
                        postOffice: formData.postOffice,
                        postCode: formData.postCode,
                        policeStation: formData.policeStation,
                        district: formData.district,
                    },
                    permanent: {
                        village: formData.permVillage,
                        postOffice: formData.permPostOffice,
                        postCode: formData.permPostCode,
                        policeStation: formData.permPoliceStation,
                        district: formData.permDistrict,
                    },
                },
                familyEnvironment: {
                    halalIncome: formData.HalalIncome,
                    parentsPrayer: formData.ParentsPrayer,
                    addiction: formData.Addiction,
                    tv: formData.TV,
                    quranRecitation: formData.QuranRecitation,
                    purdah: formData.Purdah,
                },
                behaviorSkills: {
                    mobileUsage: formData.MobileUsage,
                    generalBehavior: formData.GeneralBehavior,
                    obedience: formData.Obedience,
                    elderBehavior: formData.ElderBehavior,
                    youngerBehavior: formData.YoungerBehavior,
                    lyingStubbornness: formData.LyingStubbornness,
                    studyInterest: formData.StudyInterest,
                    religiousInterest: formData.ReligiousInterest,
                    angerControl: formData.AngerControl,
                },
                documents: {
                    photographs: formData.photographs,
                    birthCertificate: formData.birthCertificate,
                    markSheet: formData.markSheet,
                    transferCertificate: formData.transferCertificate,
                    characterCertificate: formData.characterCertificate,
                },
            };

            // Send data to backend
            const res = await updateApplication({ id, data: apiData }).unwrap();

            if (res.success) {
                router.push('/dashboard/admission-application');
            }

        } catch (error: any) {
            console.error('Update failed:', error);
            setSnackbar({
                open: true,
                message: error?.data?.message || 'আপডেট ব্যর্থ হয়েছে, আবার চেষ্টা করুন',
                severity: 'error'
            });
        }
    }

    // Handle cancel
    const handleCancel = () => {
        router.back()
    }

    if (isLoading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <CircularProgress />
            </Box>
        )
    }

    if (fetchError) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">
                    ডেটা লোড করতে সমস্যা হয়েছে
                </Alert>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={handleCancel}
                    sx={{ mt: 2 }}
                >
                    ফিরে যান
                </Button>
            </Box>
        )
    }

    // Create default values from the API data
    const defaultValues = {
        // Student Info
        StudentName: singleApplication?.data?.studentInfo?.nameBangla || "",
        studentName: singleApplication?.data?.studentInfo?.nameEnglish || "",
        dateOfBirth: singleApplication?.data?.studentInfo?.dateOfBirth?.split('T')[0] || "",
        Age: singleApplication?.data?.studentInfo?.age?.toString() || "",
        studentDepartment: singleApplication?.data?.studentInfo?.studentDepartment || singleApplication?.data?.studentInfo?.department || "",
        className: singleApplication?.data?.studentInfo?.class || "",
        session: singleApplication?.data?.studentInfo?.session || singleApplication?.data?.academicYear || "",
        nidBirth: singleApplication?.data?.studentInfo?.nidBirth || "",
        bloodGroup: singleApplication?.data?.studentInfo?.bloodGroup || "",
        nationality: singleApplication?.data?.studentInfo?.nationality || "Bangladeshi",
        studentPhoto: singleApplication?.data?.studentInfo?.studentPhoto || "",
        gender: singleApplication?.data?.studentInfo?.gender || "",

        // Academic Info
        PrevSchool: singleApplication?.data?.academicInfo?.previousSchool || "",
        PrevClass: singleApplication?.data?.academicInfo?.previousClass || "",
        GPA: singleApplication?.data?.academicInfo?.gpa || "",

        // Father Info
        FatherNameBangla: singleApplication?.data?.parentInfo?.father?.nameBangla || "",
        FatherName: singleApplication?.data?.parentInfo?.father?.nameEnglish || "",
        FatherJob: singleApplication?.data?.parentInfo?.father?.profession || "",
        FatherEdu: singleApplication?.data?.parentInfo?.father?.education || "",
        FatherMobile: singleApplication?.data?.parentInfo?.father?.mobile || "",
        FatherWhatsapp: singleApplication?.data?.parentInfo?.father?.whatsapp || "",

        // Mother Info
        MotherNameBangla: singleApplication?.data?.parentInfo?.mother?.nameBangla || "",
        MotherName: singleApplication?.data?.parentInfo?.mother?.nameEnglish || "",
        MotherJob: singleApplication?.data?.parentInfo?.mother?.profession || "",
        MotherEdu: singleApplication?.data?.parentInfo?.mother?.education || "",
        MotherMobile: singleApplication?.data?.parentInfo?.mother?.mobile || "",
        MotherWhatsapp: singleApplication?.data?.parentInfo?.mother?.whatsapp || "",

        // Guardian Info
        guardianNameBangla: singleApplication?.data?.parentInfo?.guardian?.nameBangla || "",
        guardianName: singleApplication?.data?.parentInfo?.guardian?.nameEnglish || "",
        guardianRelation: singleApplication?.data?.parentInfo?.guardian?.relation || "",
        guardianMobile: singleApplication?.data?.parentInfo?.guardian?.mobile || "",
        guardianWhatsapp: singleApplication?.data?.parentInfo?.guardian?.whatsapp || "",
        guardianJob: singleApplication?.data?.parentInfo?.guardian?.profession || "",
        guardianAddress: singleApplication?.data?.parentInfo?.guardian?.address || "",

        // Present Address
        village: singleApplication?.data?.address?.present?.village || "",
        postOffice: singleApplication?.data?.address?.present?.postOffice || "",
        postCode: singleApplication?.data?.address?.present?.postCode || "",
        policeStation: singleApplication?.data?.address?.present?.policeStation || "",
        district: singleApplication?.data?.address?.present?.district || "",

        // Permanent Address
        permVillage: singleApplication?.data?.address?.permanent?.village || "",
        permPostOffice: singleApplication?.data?.address?.permanent?.postOffice || "",
        permPostCode: singleApplication?.data?.address?.permanent?.postCode || "",
        permPoliceStation: singleApplication?.data?.address?.permanent?.policeStation || "",
        permDistrict: singleApplication?.data?.address?.permanent?.district || "",

        // Family Environment
        HalalIncome: singleApplication?.data?.familyEnvironment?.halalIncome || "",
        ParentsPrayer: singleApplication?.data?.familyEnvironment?.parentsPrayer || "",
        Addiction: singleApplication?.data?.familyEnvironment?.addiction || "",
        TV: singleApplication?.data?.familyEnvironment?.tv || "",
        QuranRecitation: singleApplication?.data?.familyEnvironment?.quranRecitation || "",
        Purdah: singleApplication?.data?.familyEnvironment?.purdah || "",

        // Behavior Skills
        MobileUsage: singleApplication?.data?.behaviorSkills?.mobileUsage || "",
        GeneralBehavior: singleApplication?.data?.behaviorSkills?.generalBehavior || "",
        Obedience: singleApplication?.data?.behaviorSkills?.obedience || "",
        ElderBehavior: singleApplication?.data?.behaviorSkills?.elderBehavior || "",
        YoungerBehavior: singleApplication?.data?.behaviorSkills?.youngerBehavior || "",
        LyingStubbornness: singleApplication?.data?.behaviorSkills?.lyingStubbornness || "",
        StudyInterest: singleApplication?.data?.behaviorSkills?.studyInterest || "",
        ReligiousInterest: singleApplication?.data?.behaviorSkills?.religiousInterest || "",
        AngerControl: singleApplication?.data?.behaviorSkills?.angerControl || "",

        // Documents
        photographs: singleApplication?.data?.documents?.photographs || false,
        birthCertificate: singleApplication?.data?.documents?.birthCertificate || false,
        markSheet: singleApplication?.data?.documents?.markSheet || false,
        transferCertificate: singleApplication?.data?.documents?.transferCertificate || false,
        characterCertificate: singleApplication?.data?.documents?.characterCertificate || false,

        // Terms
        termsAccepted: singleApplication?.data?.termsAccepted || false,
    }


    return (
        <Box sx={{
            p: { xs: 1, sm: 2, md: 3 },
            minHeight: '100vh',
            bgcolor: alpha(theme.palette.primary.main, 0.02),
        }}>
            <Paper sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 4,
                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
            }}>
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                        }}>
                            <School />
                        </Avatar>
                        <Box>
                            <Typography variant="h4" fontWeight="bold" sx={{
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: { xs: '1.5rem', sm: '2rem' },
                            }}>
                                ভর্তি আবেদন সম্পাদনা
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                আইডি: {id} | {defaultValues.StudentName || defaultValues.studentName}
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBack />}
                        onClick={handleCancel}
                        sx={{ borderRadius: 2 }}
                    >
                        ফিরে যান
                    </Button>
                </Box>

                <Divider sx={{ mb: 4 }} />

                <CraftForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

                        {/* Section 1: Student Information */}
                        <Card variant="outlined" sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                                        <Person />
                                    </Avatar>
                                    <Typography variant="h6" fontWeight="bold">
                                        ১. শিক্ষার্থীর তথ্য
                                    </Typography>
                                </Box>

                                <Grid container spacing={3}>
                                    {/* Photo Upload */}
                                    <Grid item xs={12} md={4}>
                                        <FileUploadWithIcon
                                            name="studentPhoto"
                                            label="Student Photo"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={8}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <CraftInput
                                                    fullWidth
                                                    label="শিক্ষার্থীর নাম (বাংলা)"
                                                    name="StudentName"
                                                    size="small"

                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <CraftInput
                                                    fullWidth
                                                    label="Student Name (English)"
                                                    name="studentName"
                                                    size="small"

                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <CraftDatePicker
                                                    fullWidth
                                                    label="জন্ম তারিখ"
                                                    name="dateOfBirth"
                                                    size="small"

                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <CraftInput
                                                    fullWidth
                                                    label="বয়স"
                                                    name="Age"
                                                    disabled
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <CraftSelect
                                                    fullWidth
                                                    label="লিঙ্গ"
                                                    name="gender"
                                                    items={genderOptions}
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <CraftSelect
                                                    fullWidth
                                                    label="বিভাগ"
                                                    name="studentDepartment"
                                                    items={departments}
                                                    size="small"
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <CraftSelect
                                                    fullWidth
                                                    label="Class"
                                                    name="className"
                                                    items={classOption}
                                                    size="small"

                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <CraftInput
                                                    fullWidth
                                                    label="সেশন"
                                                    name="session"
                                                    size="small"

                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <CraftInput
                                                    fullWidth
                                                    label="জাতীয় পরিচয়পত্র/জন্ম নিবন্ধন"
                                                    name="nidBirth"
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <CraftSelect
                                                    fullWidth
                                                    label="রক্তের গ্রুপ"
                                                    name="bloodGroup"
                                                    items={bloodGroups}
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <CraftInput
                                                    fullWidth
                                                    label="জাতীয়তা"
                                                    name="nationality"
                                                    size="small"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Section 2: Previous Academic Information */}
                        <Card variant="outlined" sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                    <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), color: 'info.main' }}>
                                        <School />
                                    </Avatar>
                                    <Typography variant="h6" fontWeight="bold">
                                        ২. পূর্ববর্তী একাডেমিক তথ্য
                                    </Typography>
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <CraftInput
                                            fullWidth
                                            label="পূর্ববর্তী প্রতিষ্ঠানের নাম"
                                            name="PrevSchool"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <CraftInput
                                            fullWidth
                                            label="পূর্ববর্তী শ্রেণি"
                                            name="PrevClass"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <CraftInput
                                            fullWidth
                                            label="সর্বশেষ জিপিএ"
                                            name="GPA"
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Section 3: Parent Information */}
                        <Card variant="outlined" sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                    <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main' }}>
                                        <FamilyRestroom />
                                    </Avatar>
                                    <Typography variant="h6" fontWeight="bold">
                                        ৩. অভিভাবকের তথ্য
                                    </Typography>
                                </Box>

                                {/* Father */}
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'info.main', mb: 2 }}>
                                    পিতার তথ্য
                                </Typography>
                                <Grid container spacing={2} sx={{ mb: 4 }}>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="পিতার নাম (বাংলা)"
                                            name="FatherNameBangla"
                                            size="small"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="Father's Name (English)"
                                            name="FatherName"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftSelect
                                            fullWidth
                                            label="পেশা"
                                            name="FatherJob"
                                            items={fatherProfessionOptions}
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="শিক্ষাগত যোগ্যতা"
                                            name="FatherEdu"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="মোবাইল"
                                            name="FatherMobile"
                                            size="small"
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocalPhone fontSize="small" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="WhatsApp"
                                            name="FatherWhatsapp"
                                            size="small"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <WhatsApp fontSize="small" sx={{ color: '#25D366' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Mother */}
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'secondary.main', mb: 2 }}>
                                    মাতার তথ্য
                                </Typography>
                                <Grid container spacing={2} sx={{ mb: 4 }}>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="মাতার নাম (বাংলা)"
                                            name="MotherNameBangla"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="Mother's Name (English)"
                                            name="MotherName"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftSelect
                                            fullWidth
                                            label="পেশা"
                                            name="MotherJob"
                                            items={motherProfessionOptions}
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="শিক্ষাগত যোগ্যতা"
                                            name="MotherEdu"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="মোবাইল"
                                            name="MotherMobile"
                                            size="small"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocalPhone fontSize="small" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="WhatsApp"
                                            name="MotherWhatsapp"
                                            size="small"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <WhatsApp fontSize="small" sx={{ color: '#25D366' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Guardian (Optional) */}
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'warning.main', mb: 2 }}>
                                    অভিভাবকের তথ্য (যদি পিতা-মাতা ব্যতীত অন্য কেউ)
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="অভিভাবকের নাম (বাংলা)"
                                            name="guardianNameBangla"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="Guardian's Name (English)"
                                            name="guardianName"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="সম্পর্ক"
                                            name="guardianRelation"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="মোবাইল"
                                            name="guardianMobile"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="WhatsApp"
                                            name="guardianWhatsapp"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <CraftInput
                                            fullWidth
                                            label="পেশা"
                                            name="guardianJob"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CraftInput
                                            fullWidth
                                            label="ঠিকানা"
                                            name="guardianAddress"
                                            size="small"
                                            multiline
                                            rows={2}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Section 4: Address Information */}
                        <Card variant="outlined" sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                    <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), color: 'info.main' }}>
                                        <Home />
                                    </Avatar>
                                    <Typography variant="h6" fontWeight="bold">
                                        ৪. ঠিকানা
                                    </Typography>
                                </Box>

                                {/* Present Address */}
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'primary.main', mb: 2 }}>
                                    বর্তমান ঠিকানা
                                </Typography>
                                <Grid container spacing={2} sx={{ mb: 4 }}>
                                    <Grid item xs={12} md={3}>
                                        <CraftInput
                                            fullWidth
                                            label="গ্রাম/এলাকা"
                                            name="village"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <CraftInput
                                            fullWidth
                                            label="ডাকঘর"
                                            name="postOffice"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <CraftInput
                                            fullWidth
                                            label="পোস্ট কোড"
                                            name="postCode"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <CraftInput
                                            fullWidth
                                            label="থানা"
                                            name="policeStation"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <CraftInput
                                            fullWidth
                                            label="জেলা"
                                            name="district"
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>

                                {/* Permanent Address */}
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'info.main', mb: 2 }}>
                                    স্থায়ী ঠিকানা
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <CraftInput
                                            fullWidth
                                            label="গ্রাম/এলাকা"
                                            name="permVillage"
                                            size="small"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <CraftInput
                                            fullWidth
                                            label="ডাকঘর"
                                            name="permPostOffice"
                                            size="small"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <CraftInput
                                            fullWidth
                                            label="পোস্ট কোড"
                                            name="permPostCode"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <CraftInput
                                            fullWidth
                                            label="থানা"
                                            name="permPoliceStation"
                                            size="small"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <CraftInput
                                            fullWidth
                                            label="জেলা"
                                            name="permDistrict"
                                            size="small"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Section 5: Family Environment */}
                        <Card variant="outlined" sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                    <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), color: 'warning.main' }}>
                                        <Home />
                                    </Avatar>
                                    <Typography variant="h6" fontWeight="bold">
                                        ৫. পারিবারিক পরিবেশ
                                    </Typography>
                                </Box>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <CraftRadioGroup
                                            name="HalalIncome"
                                            label="আপনার পরিবারের উপার্জন ১০০% হালাল কি?"
                                            row
                                            options={yesNoOptions}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <CraftRadioGroup
                                            name="ParentsPrayer"
                                            label="পিতা-মাতা নিয়মিত ৫ ওয়াক্ত নামাজ পড়েন কি?"
                                            row
                                            options={yesNoOptions}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <CraftRadioGroup
                                            name="Addiction"
                                            label="পরিবারের কোন সদস্য মাদক/নেশায় আক্রান্ত?"
                                            row
                                            options={yesNoOptions}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <CraftRadioGroup
                                            name="TV"
                                            label="বাসায় টেলিভিশন আছে কি?"
                                            row
                                            options={yesNoOptions}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <CraftRadioGroup
                                            name="QuranRecitation"
                                            label="বাসায় নিয়মিত কুরআন তিলাওয়াত করা হয়?"
                                            row
                                            options={yesNoSometimesOptions}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <CraftRadioGroup
                                            name="Purdah"
                                            label="পরিবারের সদস্যরা পর্দা পালন করে কি?"
                                            row
                                            options={yesNoTryingOptions}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Section 6: Behavior & Skills */}
                        <Card variant="outlined" sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                    <Avatar sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main' }}>
                                        <Timeline />
                                    </Avatar>
                                    <Typography variant="h6" fontWeight="bold">
                                        ৬. আচরণ ও দক্ষতা
                                    </Typography>
                                </Box>

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <CraftInput
                                            fullWidth
                                            label="দৈনিক কত সময় মোবাইল ব্যবহার করে?"
                                            name="MobileUsage"
                                            placeholder="যেমন: ১ ঘণ্টা"
                                            size="small"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <CraftRadioGroup
                                            name="GeneralBehavior"
                                            label="সন্তানের আচরণ কেমন?"
                                            row
                                            options={behaviorGeneralOptions}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <CraftRadioGroup
                                            name="Obedience"
                                            label="পিতা-মাতার কথা শোনে?"
                                            row
                                            options={obedienceOptions}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <CraftRadioGroup
                                            name="ElderBehavior"
                                            label="বড়দের সাথে আচরণ?"
                                            row
                                            options={behaviorGeneralOptions}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <CraftRadioGroup
                                            name="YoungerBehavior"
                                            label="ছোটদের সাথে আচরণ?"
                                            row
                                            options={behaviorGeneralOptions}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <CraftRadioGroup
                                            name="LyingStubbornness"
                                            label="মিথ্যা বলে বা জেদ করে?"
                                            row
                                            options={frequencyOptions}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <CraftRadioGroup
                                            name="StudyInterest"
                                            label="পড়ালেখায় আগ্রহ?"
                                            row
                                            options={interestOptions}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <CraftRadioGroup
                                            name="ReligiousInterest"
                                            label="ধর্মীয় কাজে আগ্রহ?"
                                            row
                                            options={interestOptions}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <CraftRadioGroup
                                            name="AngerControl"
                                            label="রাগ নিয়ন্ত্রণ?"
                                            row
                                            options={angerOptions}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Section 7: Documents */}
                        <Card variant="outlined" sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                    <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main' }}>
                                        <Assignment />
                                    </Avatar>
                                    <Typography variant="h6" fontWeight="bold">
                                        ৭. ডকুমেন্টস
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    bgcolor: alpha(theme.palette.error.main, 0.05),
                                    border: `2px solid ${alpha(theme.palette.error.main, 0.2)}`,
                                    mb: 3
                                }}>
                                    <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                                        ভর্তির সময় এই কাগজপত্রগুলো অফিসে জমা দেওয়া <strong>বাধ্যতামূলক</strong>।
                                    </Typography>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <CraftCheckbox name='photographs' label="ছবি" />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <CraftCheckbox name='birthCertificate' label="জন্ম নিবন্ধন সনদ" />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <CraftCheckbox name='markSheet' label="মার্কশিট" />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <CraftCheckbox name='transferCertificate' label="ট্রান্সফার সার্টিফিকেট" />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <CraftCheckbox name='characterCertificate' label="চরিত্র সনদপত্র" />
                                        </Grid>
                                    </Grid>
                                </Box>

                                {/* Terms & Conditions */}
                                <Box sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                }}>
                                    <CraftSwitch onChange={handleActiveChange} color='primary' checked name='termsAccepted' label='আমি ভর্তির সকল শর্ত মেনে নিচ্ছি' />
                                </Box>
                                {errors.termsAccepted && (
                                    <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                                        {errors.termsAccepted}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>

                        {/* Submit Buttons */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 2,
                            mt: 2
                        }}>
                            <Button
                                variant="outlined"
                                onClick={handleCancel}
                                sx={{ borderRadius: 2, px: 4 }}
                            >
                                বাতিল
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isUpdating}
                                startIcon={isUpdating ? <CircularProgress size={20} /> : <Save />}
                                sx={{
                                    borderRadius: 2,
                                    px: 4,
                                    background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                                }}
                            >
                                {isUpdating ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                            </Button>
                        </Box>
                    </Box>
                </CraftForm>
            </Paper>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}