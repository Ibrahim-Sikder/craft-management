/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {
    Box,
    Typography,
    Button,
    Paper,
    Card,
    CardContent,
    Grid,
    alpha,
    Fade,
    Zoom,
    styled,
    keyframes,
    ThemeProvider,

    useTheme,
} from "@mui/material"
import {
    Save as SaveIcon,
    School as SchoolIcon,
    Class as ClassIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
} from "@mui/icons-material"
import CraftForm from "@/components/Forms/Form"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import { theme } from "@/lib/Theme/Theme"
import toast from "react-hot-toast"
import { useCreateClassMutation, useGetSingleClassQuery, useUpdateClassMutation } from "@/redux/api/classApi"
import type { FieldValues } from "react-hook-form"
import { useState } from "react"
import CraftModal from "@/components/Shared/Modal"
import { useCreateHifzClassMutation, useGetSingleHifzClassQuery, useUpdateHifzClassMutation } from "@/redux/api/hifzClassApi"

// Islamic-inspired color palette
const islamicColors = {
    primary: '#1a936f', // Deep green
    secondary: '#c45c3e', // Terracotta
    accent: '#88d498', // Light green
    background: '#f8f5e6', // Parchment
    gold: '#d4af37', // Gold for accents
    text: '#2d2d2d', // Dark text
    lightText: '#5c5c5c', // Light text
}

// Animation for subtle movement
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`


const StyledPaper = styled(Paper)({
    borderRadius: '16px',
    overflow: "hidden",
    position: "relative",
    border: `1px solid ${alpha(islamicColors.primary, 0.1)}`,
    background: `linear-gradient(to bottom, #ffffff, ${alpha(islamicColors.background, 0.5)})`,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${islamicColors.primary}, ${islamicColors.secondary})`,
    },
})

const StyledCard = styled(Card)({
    position: "relative",
    border: `1px solid ${alpha(islamicColors.primary, 0.1)}`,
    overflow: "visible",
    borderRadius: '16px',
    background: `linear-gradient(to bottom, #ffffff, ${alpha(islamicColors.background, 0.3)})`,
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
})

export default function HifzClassForm({ id, open, setOpen }: any) {

    const { data: singleClass, isLoading } = useGetSingleHifzClassQuery({ id })

    const [createHifzClass, { isSuccess }] = useCreateHifzClassMutation()
    const [updateHifzClass] = useUpdateHifzClassMutation()




    const handleSubmit = async (data: FieldValues) => {

        const modifyValues = {
            ...data,
        }


        try {
            let res
            if (id) {
                res = await updateHifzClass({ id, data: modifyValues }).unwrap()
                if (res?.success) {
                    toast.success("HifzClass class updated successfully!")
                    setOpen(false)
                }
            } else {
                res = await createHifzClass(modifyValues).unwrap()
                if (res.success) {
                    toast.success("HifzClass class created successfully!")
                    setOpen(false)
                }
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to process class!")
        }
    }

    const defaultValue = {
        name: singleClass?.data?.name || "",
    }

    return (
        <CraftModal open={open}
            setOpen={setOpen}
            title={id ? "Update Hifz Subject" : "Add New Hifz Class"}
            sx={{ width: { xs: '100%', md: '800px', margin: '0 auto ' } }}
        >

            <ThemeProvider theme={theme}>
                <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
                    <Box sx={{
                        width: '100%',

                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: islamicColors.background,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23${islamicColors.primary.replace('#', '')}' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                        py: 4,
                    }}>
                        <Box sx={{
                            width: '100%',
                            maxWidth: '800px',
                            px: { xs: 2, sm: 3, md: 4 },
                        }}>
                            <Fade in={true} timeout={800}>
                                <Box>
                                    <StyledPaper>
                                        <Box sx={{
                                            p: 3,
                                            background: `linear-gradient(135deg, ${islamicColors.primary} 0%, ${islamicColors.secondary} 100%)`,
                                            color: "white",
                                            borderRadius: '16px 16px 0 0',
                                            textAlign: "center",
                                            position: 'relative',
                                            overflow: 'hidden',
                                            '&:before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L0 20z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                                            }
                                        }}>
                                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                                <Box sx={{
                                                    animation: `${floatAnimation} 4s ease-in-out infinite`,
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: alpha('#fff', 0.2),
                                                    borderRadius: '50%',
                                                    width: '80px',
                                                    height: '80px',
                                                    mb: 2,
                                                }}>
                                                    <SchoolIcon
                                                        sx={{
                                                            fontSize: 40,
                                                            color: "white",
                                                        }}
                                                    />
                                                </Box>
                                                <Typography variant="h3" component="h1" sx={{
                                                    fontWeight: 700,
                                                    mb: 1,
                                                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                                                }}>
                                                    {id ? "Update Hifz Class" : "Create New Hifz Class"}
                                                </Typography>
                                                <Typography variant="body1" sx={{
                                                    opacity: 0.9,
                                                    maxWidth: '500px',
                                                    margin: '0 auto',
                                                    color: '#fff'
                                                }}>
                                                    {id ? "Update the details of your Quran memorization class" : "Fill in the details to create a new Quran memorization class"}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ py: 5, px: { xs: 2, md: 4 } }}>
                                            <Zoom in={true}>
                                                <StyledCard>
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            top: -15,
                                                            left: 20,
                                                            bgcolor: islamicColors.primary,
                                                            color: "white",
                                                            py: 1,
                                                            px: 3,
                                                            borderRadius: '16px',
                                                            zIndex: 1,
                                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                        }}
                                                    >
                                                        <Typography variant="subtitle2" fontWeight="bold">
                                                            Class Details
                                                        </Typography>
                                                    </Box>

                                                    <CardContent sx={{ p: { xs: 2, md: 3 }, pt: 6 }}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                <CraftInputWithIcon
                                                                    name="name"
                                                                    fullWidth
                                                                    label="Class Name"
                                                                    variant="outlined"
                                                                    placeholder="Enter class name (e.g., Hifz Level 1, Juz Amma)"
                                                                    required
                                                                    InputProps={{
                                                                        startAdornment: (
                                                                            <ClassIcon
                                                                                sx={{
                                                                                    color: islamicColors.primary,
                                                                                    mr: 1,
                                                                                    alignSelf: "flex-start",
                                                                                    mt: 1.5
                                                                                }}
                                                                            />
                                                                        ),
                                                                    }}
                                                                    sx={{
                                                                        '& .MuiOutlinedInput-root': {
                                                                            borderRadius: '12px',
                                                                            '& fieldset': {
                                                                                borderColor: alpha(islamicColors.primary, 0.3),
                                                                            },
                                                                            '&:hover fieldset': {
                                                                                borderColor: islamicColors.primary,
                                                                            },
                                                                        }
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </StyledCard>
                                            </Zoom>
                                            <Box sx={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                mt: 4,
                                            }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="large"
                                                    startIcon={isSuccess ? <CheckCircleOutlineIcon /> : <SaveIcon />}
                                                    type="submit"
                                                    sx={{
                                                        px: 6,
                                                        py: 1.5,
                                                        fontSize: "1rem",
                                                        minWidth: 200,
                                                        borderRadius: '12px',
                                                        background: `linear-gradient(135deg, ${islamicColors.primary} 0%, ${islamicColors.secondary} 100%)`,
                                                        boxShadow: '0 8px 20px rgba(26, 147, 111, 0.3)',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            transform: "translateY(-2px)",
                                                            boxShadow: '0 12px 25px rgba(26, 147, 111, 0.4)',
                                                            background: `linear-gradient(135deg, ${islamicColors.secondary} 0%, ${islamicColors.primary} 100%)`,
                                                        },
                                                    }}
                                                >
                                                    {id ? "Update Class" : "Save Class"}
                                                </Button>
                                            </Box>
                                        </Box>
                                    </StyledPaper>
                                </Box>
                            </Fade>
                        </Box>
                    </Box>
                </CraftForm>


            </ThemeProvider>
        </CraftModal>
    )
}