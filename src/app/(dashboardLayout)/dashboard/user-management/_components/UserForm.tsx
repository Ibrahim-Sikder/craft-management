/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
    Box,
    Container,
    Button,
    Fade,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider,
    alpha,
    Tooltip,
    Avatar,
    useMediaQuery,
    Chip,
    CircularProgress,
} from "@mui/material"

import {
    Visibility as VisibilityIcon,
    VpnKey as VpnKeyIcon,
    AdminPanelSettings as AdminIcon,
    School as SchoolIcon,
    SupervisorAccount as SupervisorIcon,
    AccountCircle as UserIcon,
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
    Save as SaveIcon,
    Info as InfoIcon,
    Security as SecurityIcon,
    Badge as BadgeIcon,
    VerifiedUser as VerifiedUserIcon,
} from "@mui/icons-material"

import { toast } from "react-hot-toast"
import { useCreateUserMutation, useGetSingleUserQuery, useUpdateUserMutation } from "@/redux/api/userApi"
import CraftForm from "@/components/Forms/Form"
import CraftInput from "@/components/Forms/Input"
import CraftSelect from "@/components/Forms/Select"
import { theme } from "@/lib/Theme/Theme"

import type { FieldValues } from "react-hook-form"
import { useRouter } from "next/navigation"

export default function UserForm({ id }: any) {

    const [activeStep, setActiveStep] = useState(0)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const [createUser, { isLoading, isSuccess }] = useCreateUserMutation()
    const [updateUser] = useUpdateUserMutation()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const { data: singleUser, isLoading: singleUserLoading } = useGetSingleUserQuery({ id })

    const steps = ["Basic Information", "Role & Permissions", "Password Settings"]

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const defaultValues = {
        name: singleUser?.data?.name,
        email: singleUser?.data.email,
        role: singleUser?.data.role,
        status: singleUser?.data.status,
        // password: singleUser?.data.password,
    }

    const handleSubmit = async (data: FieldValues) => {
        try {
            let res;

            if (!id) {

                res = await createUser({ ...data }).unwrap();
                console.log(res)
                if (res.success) {
                    toast.success("User created successfully!");
                    router.push('/dashboard/user-management');
                    setActiveStep(0);
                }
            } else {

                res = await updateUser({ id, data }).unwrap();
                if (res.success) {
                    toast.success("User updated successfully!");
                    // router.push('/dashboard/user-management');
                }
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to process user!");
        }
    };





    return (
        singleUserLoading ? (
            <div>Loading...</div>
        ) : (
            <CraftForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                <Box
                    sx={{
                        flexGrow: 1,
                        bgcolor: "background.default",
                        minHeight: "100vh",
                        pt: 2,
                        pb: 8,
                        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
                    }}
                >
                    <Container maxWidth="lg">
                        <Fade in={true} timeout={800}>
                            <Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 4,
                                        flexWrap: "wrap",
                                        gap: 2,
                                        position: "relative",
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: -10,
                                            left: 0,
                                            width: "100%",
                                            height: "4px",
                                            background: "linear-gradient(90deg, #4F0187, #9333EA, #4F0187)",
                                            borderRadius: "2px",
                                            opacity: 0.7,
                                        },
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            variant="h4"
                                            component="h1"
                                            sx={{
                                                fontWeight: 900,
                                                background: "linear-gradient(45deg, #4F0187, #9333EA)",
                                                backgroundClip: "text",
                                                textFillColor: "transparent",
                                                mb: 1,
                                                letterSpacing: "-0.5px",
                                                textShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                                            }}
                                        >
                                            Add New User
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Create a new user account with specific roles and permissions
                                        </Typography>
                                    </Box>
                                    {activeStep === steps.length - 1 ? (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                            disabled={isLoading || isSuccess}
                                            sx={{
                                                bgcolor: "#4F0187",
                                                borderRadius: "12px",
                                                boxShadow: "0px 8px 20px rgba(79, 1, 135, 0.25)",
                                                px: 4,
                                                py: 1.5,
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    bgcolor: "#5A0196",
                                                    transform: "translateY(-2px)",
                                                    boxShadow: "0px 10px 25px rgba(79, 1, 135, 0.35)",
                                                },
                                            }}
                                        >
                                            {isSuccess ? "User Created" : "Create User"}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<ArrowForwardIcon />}
                                            onClick={handleNext}
                                            sx={{
                                                bgcolor: "#4F0187",
                                                borderRadius: "12px",
                                                boxShadow: "0px 8px 20px rgba(79, 1, 135, 0.25)",
                                                px: 4,
                                                py: 1.5,
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    bgcolor: "#5A0196",
                                                    transform: "translateY(-2px)",
                                                    boxShadow: "0px 10px 25px rgba(79, 1, 135, 0.35)",
                                                },
                                            }}
                                        >
                                            Next Step
                                        </Button>
                                    )}
                                </Box>

                                <Box
                                    sx={{
                                        position: "relative",
                                        mb: 3,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    {steps.map((step, index) => (
                                        <Box
                                            key={step}
                                            onClick={() => setActiveStep(index)}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                cursor: "pointer",
                                                opacity: activeStep === index ? 1 : 0.6,
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    opacity: 0.9,
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    background:
                                                        activeStep === index
                                                            ? "linear-gradient(135deg, #4F0187 0%, #9333EA 100%)"
                                                            : "rgba(147, 51, 234, 0.1)",
                                                    color: activeStep === index ? "white" : "#4F0187",
                                                    fontWeight: "bold",
                                                    fontSize: "18px",
                                                    mb: 1,
                                                    boxShadow: activeStep === index ? "0px 8px 15px rgba(79, 1, 135, 0.25)" : "none",
                                                    transition: "all 0.3s ease",
                                                }}
                                            >
                                                {index + 1}
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: activeStep === index ? "bold" : "normal",
                                                    color: activeStep === index ? "#4F0187" : "text.secondary",
                                                }}
                                            >
                                                {step}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                                {activeStep === 0 && (
                                    <Card
                                        elevation={0}
                                        sx={{
                                            mb: 4,
                                            border: "1px solid rgba(0,0,0,0.08)",
                                            position: "relative",
                                            overflow: "visible",
                                            borderRadius: "16px",
                                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: -20,
                                                left: 24,
                                                bgcolor: "#4F0187",
                                                color: "white",
                                                py: 1,
                                                px: 3,
                                                borderRadius: "12px",
                                                boxShadow: "0 8px 20px rgba(79, 1, 135, 0.25)",
                                                zIndex: 1,
                                            }}
                                        >
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                Basic Information
                                            </Typography>
                                        </Box>
                                        <CardContent sx={{ pt: 4, mt: 2 }}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={6}>
                                                    <CraftInput
                                                        name="name"
                                                        label="Full Name"
                                                        placeholder="Enter user's full name"
                                                        required
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <CraftInput
                                                        name="email"
                                                        label="Email Address"
                                                        placeholder="Enter user's email address"
                                                        required
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider sx={{ my: 1 }}>
                                                        <Chip
                                                            label="Account Status"
                                                            icon={<VerifiedUserIcon />}
                                                            sx={{
                                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                                color: "primary.main",
                                                                fontWeight: 500,
                                                                borderRadius: "8px",
                                                                py: 0.5,
                                                            }}
                                                        />
                                                    </Divider>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <CraftSelect name="status" label="Account Status" items={["active", "inactive"]} fullWidth />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                )}

                                {activeStep === 1 && (
                                    <Card
                                        elevation={0}
                                        sx={{
                                            mb: 4,
                                            border: "1px solid rgba(0,0,0,0.08)",
                                            position: "relative",
                                            overflow: "visible",
                                            borderRadius: "16px",
                                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: -20,
                                                left: 24,
                                                bgcolor: "#4F0187",
                                                color: "white",
                                                py: 1,
                                                px: 3,
                                                borderRadius: "12px",
                                                boxShadow: "0 8px 20px rgba(79, 1, 135, 0.25)",
                                                zIndex: 1,
                                            }}
                                        >
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                Role & Permissions
                                            </Typography>
                                        </Box>
                                        <CardContent sx={{ pt: 4, mt: 2 }}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <CraftSelect
                                                        name="role"
                                                        label="User Role"
                                                        items={["super_admin", "user", "admin", "student", "teacher", "super_visor", "class_teacher", 'accountant']}
                                                        fullWidth
                                                    />
                                                    <Box
                                                        sx={{
                                                            mt: 2,
                                                            p: 2,
                                                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                                                            borderRadius: "12px",
                                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                                        }}
                                                    >
                                                        <Typography variant="body2" color="text.secondary">
                                                            <InfoIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1, color: "primary.main" }} />
                                                            {"Basic system access"}
                                                        </Typography>
                                                    </Box>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider sx={{ my: 1 }}>
                                                        <Chip
                                                            label="Role Preview"
                                                            icon={<VisibilityIcon />}
                                                            sx={{
                                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                                color: "primary.main",
                                                                fontWeight: 500,
                                                                borderRadius: "8px",
                                                                py: 0.5,
                                                            }}
                                                        />
                                                    </Divider>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            p: 3,
                                                            borderRadius: "12px",
                                                            bgcolor: "background.paper",
                                                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
                                                            transition: "all 0.3s ease",
                                                            "&:hover": {
                                                                boxShadow: "0 12px 25px rgba(0, 0, 0, 0.08)",
                                                                transform: "translateY(-2px)",
                                                            },
                                                        }}
                                                    >
                                                        <Avatar
                                                            sx={{
                                                                bgcolor: "primary.main",
                                                                width: 56,
                                                                height: 56,
                                                                mr: 2,
                                                                boxShadow: "0 4px 10px rgba(79, 1, 135, 0.2)",
                                                            }}
                                                        ></Avatar>
                                                        <Box>
                                                            <Typography variant="h6" fontWeight="bold"></Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {"Basic system access"}
                                                            </Typography>
                                                            <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                                                                <Chip size="small" sx={{ fontWeight: 500, borderRadius: "6px" }} />
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                )}

                                {activeStep === 2 && (
                                    <Card
                                        elevation={0}
                                        sx={{
                                            mb: 4,
                                            border: "1px solid rgba(0,0,0,0.08)",
                                            position: "relative",
                                            overflow: "visible",
                                            borderRadius: "16px",
                                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: -20,
                                                left: 24,
                                                bgcolor: "#4F0187",
                                                color: "white",
                                                py: 1,
                                                px: 3,
                                                borderRadius: "12px",
                                                boxShadow: "0 8px 20px rgba(79, 1, 135, 0.25)",
                                                zIndex: 1,
                                            }}
                                        >
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                Password Settings
                                            </Typography>
                                        </Box>
                                        <CardContent sx={{ pt: 4, mt: 2 }}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <CraftInput
                                                        name="password"
                                                        label="Password"
                                                        placeholder="Enter secure password"

                                                        fullWidth
                                                        type={showPassword ? "text" : "password"}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            p: 3,
                                                            bgcolor: alpha(theme.palette.info.main, 0.05),
                                                            borderRadius: "12px",
                                                            border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                                                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
                                                            transition: "all 0.3s ease",
                                                            "&:hover": {
                                                                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.06)",
                                                            },
                                                        }}
                                                    >
                                                        <Typography variant="subtitle2" color="info.main" gutterBottom>
                                                            <SecurityIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1 }} />
                                                            Password Requirements
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            For security, passwords should include a mix of uppercase and lowercase letters, numbers,
                                                            and special characters.
                                                        </Typography>
                                                    </Box>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider sx={{ my: 1 }}>
                                                        <Chip
                                                            label="Password Policy"
                                                            icon={<VpnKeyIcon />}
                                                            sx={{
                                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                                color: "primary.main",
                                                                fontWeight: 500,
                                                                borderRadius: "8px",
                                                                py: 0.5,
                                                            }}
                                                        />
                                                    </Divider>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                )}

                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        onClick={handleBack}
                                        disabled={activeStep === 0}
                                        startIcon={<ArrowBackIcon />}
                                        sx={{
                                            borderColor: "rgba(0, 0, 0, 0.12)",
                                            color: "text.secondary",
                                            borderRadius: "12px",
                                            "&:hover": {
                                                borderColor: "primary.main",
                                                bgcolor: "rgba(79, 1, 135, 0.04)",
                                                transform: "translateY(-2px)",
                                            },
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        Back
                                    </Button>
                                    <Box>
                                        {activeStep === steps.length - 1 ? (
                                            <Tooltip title="Create a new user with the specified details">
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                                    disabled={isLoading || isSuccess}
                                                    sx={{
                                                        bgcolor: "#4F0187",
                                                        borderRadius: "12px",
                                                        boxShadow: "0px 8px 20px rgba(79, 1, 135, 0.25)",
                                                        transition: "all 0.3s ease",
                                                        "&:hover": {
                                                            bgcolor: "#5A0196",
                                                            transform: "translateY(-2px)",
                                                            boxShadow: "0px 10px 25px rgba(79, 1, 135, 0.35)",
                                                        },
                                                    }}
                                                >
                                                    {id ? 'Update User' : 'Create User'}
                                                </Button>
                                            </Tooltip>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                endIcon={<ArrowForwardIcon />}
                                                onClick={handleNext}
                                                sx={{
                                                    bgcolor: "#4F0187",
                                                    borderRadius: "12px",
                                                    boxShadow: "0px 8px 20px rgba(79, 1, 135, 0.25)",
                                                    transition: "all 0.3s ease",
                                                    "&:hover": {
                                                        bgcolor: "#5A0196",
                                                        transform: "translateY(-2px)",
                                                        boxShadow: "0px 10px 25px rgba(79, 1, 135, 0.35)",
                                                    },
                                                }}
                                            >
                                                Continue
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Fade>
                    </Container>
                </Box>
            </CraftForm>
        )
    )

}
