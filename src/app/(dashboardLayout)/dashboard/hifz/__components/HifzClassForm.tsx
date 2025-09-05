/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {
    Box,
    Typography,
    Button,
    CardContent,
    Grid,
    alpha,
    Fade,
    Zoom,
    ThemeProvider,
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
import type { FieldValues } from "react-hook-form"
import CraftModal from "@/components/Shared/Modal"
import { useCreateHifzClassMutation, useGetSingleHifzClassQuery, useUpdateHifzClassMutation } from "@/redux/api/hifzClassApi"
import { customStyle, floatAnimation, hifzBox, islamicColors, StyledCard, StyledPaper } from "@/style/customeStyle"



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
                    <Box sx={customStyle}>
                        <Box sx={{
                            width: '100%',
                            maxWidth: '800px',
                            px: { xs: 2, sm: 3, md: 4 },
                        }}>
                            <Fade in={true} timeout={800}>
                                <Box>
                                    <StyledPaper>
                                        <Box sx={hifzBox}>
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