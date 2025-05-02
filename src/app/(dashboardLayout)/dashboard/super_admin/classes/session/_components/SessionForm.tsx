/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    Grid,
    Switch,
    FormControlLabel,
    Divider,
    Card,
    CardContent,
    Tooltip,
    Alert,
    Stepper,
    Step,
    StepLabel,
    useTheme,
    useMediaQuery,
    Fade,
} from "@mui/material"
import {
    School,
    Save,
    EventNote,
    DateRange,
    Info,
    ArrowBack,
    CalculateOutlined,
} from "@mui/icons-material"
import dayjs, { Dayjs } from "dayjs"
import Link from "next/link"
import CraftForm from "@/components/Forms/Form"
import { FieldValues } from "react-hook-form"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import CraftDatePicker from "@/components/Forms/DatePicker"
import { useCreateSessionMutation, useGetSingleSessionQuery, useUpdateSessionMutation } from "@/redux/api/sessionApi"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function SessionForm({ id }: any) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [sessionName, setSessionName] = useState("")
    const [isCurrent, setIsCurrent] = useState(false)
    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(null)
    const [activeStep, setActiveStep] = useState(0)
    const [showSuccess, setShowSuccess] = useState(false)
    const [formSubmit, setFormSubmit] = useState(false) 
    const [createSession] = useCreateSessionMutation()
    const [updateSession] = useUpdateSessionMutation()
const router = useRouter()
    const { data: singleSession, isLoading } = useGetSingleSessionQuery({ id }, { skip: !id })
    
    const steps = ["Session Details", "Date Configuration"]
    
    useEffect(() => {
        if (singleSession?.data) {
            setSessionName(singleSession.data.sessionName || "")
            setIsCurrent(singleSession.data.isCurrent || false)
        }
    }, [singleSession])

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

    const handleSubmit = async (data: FieldValues) => {
        if (!formSubmit) return
        
        try {
            const submitData = {
                ...data,
                holidays: Number(data.holidays),
                workingDays: Number(data.workingDays),
            }
            if (!id) {
                const res = await createSession(submitData)

                if (res.data?.success) {
                    toast.success('Session created successfully!')
                    setShowSuccess(true)
                    router.push('/dashboard/super_admin/classes/session')
                } else {
                    toast.error('Failed to create session!')
                }
            } else {
                const res = await updateSession({ id, data: submitData }) 
                if (res.data?.success) {
                    toast.success('Session updated successfully!')
                    setShowSuccess(true)
                    router.push('/dashboard/super_admin/classes/session')
                } else {
                    toast.error('Failed to update session!')
                }
            }
        } catch (error: any) {
            console.error('Session creation/update error:', error)
            toast.error(error?.message || 'Failed to process session!')
        } finally {
            setFormSubmit(false) 
        }
    }
    
    const defaultValue = {
        endDate: singleSession?.data?.endDate || '',
        holidays: singleSession?.data?.holidays || '',
        workingDays: singleSession?.data?.workingDays || '',
        isCurrent: singleSession?.data?.isCurrent || false,
        sessionName: singleSession?.data?.sessionName || '',
        startDate: singleSession?.data?.startDate || '',
    }

    if (isLoading) {
        return <p>Loading.......</p>
    }
    
    return (
        <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
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
                                        {id ? "Update Academic Session" : "New Academic Session"}
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
                                                Session {id ? "updated" : "saved"} successfully!
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
                                                            <CraftInputWithIcon
                                                                name="sessionName"
                                                                placeholder="e.g., Academic Year 2025-2026"
                                                                label="Session Name"
                                                                required
                                                                fullWidth
                                                                InputProps={{
                                                                    startAdornment: <School sx={{ color: "primary.main", mr: 1 }} />,
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
                                                                        name="isCurrent"
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
                                                            <CraftDatePicker
                                                                label="Start Date"
                                                                name="startDate"
                                                                size="medium"
                                                                fullWidth
                                                             
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <CraftDatePicker
                                                                label="End Date"
                                                                name="endDate"
                                                                size="medium"
                                                                fullWidth
                                                   
                                                            />

                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <CraftInputWithIcon
                                                                name="workingDays"
                                                                placeholder="Total Working Days"
                                                                label="Total Working Days"
                                                                type="number"
                                                                required
                                                                fullWidth
                                                                InputProps={{
                                                                    startAdornment: <CalculateOutlined sx={{ color: "primary.main", mr: 1 }} />,
                                                                }}
                                                            />

                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <CraftInputWithIcon
                                                                name="holidays"
                                                                placeholder="Holiday"
                                                                label="Holidays"
                                                                type="number"
                                                                required
                                                                fullWidth
                                                                InputProps={{
                                                                    startAdornment: <EventNote sx={{ color: "primary.main", mr: 1 }} />,
                                                                }}
                                                            />

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
                                                        onClick={() => setFormSubmit(true)}
                                                        type="submit"
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
                                                        // disabled={isNextDisabled()}
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


                        </Box>
                    </Fade >
                </Container>
            </Box>
        </CraftForm>
    )
}