/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import {
    Box,
    Grid,
    Card,
    CardContent,
    Button,
    Typography,
    useTheme,
    alpha
} from "@mui/material"
import CraftForm from "@/components/Forms/Form"
import {
    MenuBook,
    Save as SaveIcon,
} from "@mui/icons-material"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import type { FieldValues } from "react-hook-form"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import CraftModal from "@/components/Shared/Modal"
import { useCreateHifzSubjectMutation, useGetSingleHifzSubjectQuery, useUpdateHifzSubjectMutation } from "@/redux/api/hifzSubjectApi"

export default function HifzSubjectForm({ id, open, setOpen }: any) {
    const router = useRouter()
    const theme = useTheme()
    const [createSubject] = useCreateHifzSubjectMutation()
    const [updateSubject] = useUpdateHifzSubjectMutation()

    const { data: singleSubject, isLoading } = useGetSingleHifzSubjectQuery({ id })

    const handleSubmit = async (data: FieldValues) => {
        try {
            let res

            if (!id) {
                res = await createSubject(data).unwrap()
                if (res.success) {
                    toast.success("Subject created successfully!")
                  setOpen()
                }
            } else {
                res = await updateSubject({ id, body: { ...data } }).unwrap()
                if (res.success) {
                    toast.success("Subject updated successfully!")
                    setOpen()
                 
                }
            }
        } catch (err: any) {
            const errorMessage =
                err?.data?.message ||
                err?.errorSources?.[0]?.message ||
                "Subject already exists!";
            toast.error(errorMessage)
        }
    }

    const defaultValues = {
        name: singleSubject?.data?.name || ""
    }

    return (
        <CraftModal
            open={open}
            setOpen={setOpen}
            title={id ? "Update Hifz Subject" : "Add New Hifz Subject"}
            sx={{ 
                width: { xs: '90%', sm: '500px' }, 
                margin: '0 auto',
                '& .MuiDialog-paper': {
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha('#f8f5e6', 0.8)} 100%)`,
                    border: '1px solid',
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23${theme.palette.primary.main.replace('#', '')}' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`
                }
            }}
        >
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                    <Typography variant="h6" sx={{ color: 'primary.main' }}>
                        Loading...
                    </Typography>
                </Box>
            ) : (
                <CraftForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                    <Box sx={{ p: { xs: 1, sm: 2 } }} width='100%' maxWidth='md'>
                        <Card elevation={0} sx={{ 
                            borderRadius: '12px', 
                            background: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid',
                            borderColor: alpha(theme.palette.primary.main, 0.1),
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                borderRadius: '12px 12px 0 0'
                            }
                        }}>
                            <CardContent sx={{ pt: 4, pb: 3, px: { xs: 2, sm: 3 } }}>
                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                    <Box sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: alpha(theme.palette.primary.main, 0.1),
                                        borderRadius: '50%',
                                        width: '60px',
                                        height: '60px',
                                        mb: 1
                                    }}>
                                        <MenuBook sx={{ 
                                            color: theme.palette.primary.main, 
                                            fontSize: '32px' 
                                        }} />
                                    </Box>
                                    <Typography variant="h6" sx={{ 
                                        fontWeight: 600, 
                                        color: theme.palette.primary.dark,
                                        mb: 0.5
                                    }}>
                                        {id ? "Update Hifz Subject" : "Create New Hifz Subject"}
                                    </Typography>
                                    <Typography variant="body2" sx={{ 
                                        color: 'text.secondary',
                                        maxWidth: '300px',
                                        margin: '0 auto'
                                    }}>
                                        {id ? "Modify your Quran memorization subject" : "Add a new subject for Quran memorization tracking"}
                                    </Typography>
                                </Box>
                                
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <CraftInputWithIcon
                                            name="name"
                                            label="Subject Name"
                                            placeholder="Enter subject name (e.g., Juz Amma, Surah Al-Baqarah)"
                                            
                                            fullWidth
                                            InputProps={{
                                                startAdornment: <MenuBook sx={{ color: "primary.main", mr: 1 }} />,
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    background: '#fff',
                                                    '& fieldset': {
                                                        borderColor: alpha(theme.palette.primary.main, 0.2),
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sx={{ 
                                        display: "flex", 
                                        justifyContent: "flex-end",
                                        mt: 1
                                    }}>
                                        <Button
                                            variant="outlined"
                                            onClick={setOpen}
                                            sx={{
                                                borderRadius: '8px',
                                                px: 3,
                                                py: 1,
                                                mr: 2,
                                                borderColor: alpha(theme.palette.primary.main, 0.3),
                                                color: 'text.primary',
                                                '&:hover': {
                                                    borderColor: theme.palette.primary.main,
                                                    backgroundColor: alpha(theme.palette.primary.main, 0.04)
                                                }
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SaveIcon />}
                                            type="submit"
                                            sx={{
                                                borderRadius: '8px',
                                                px: 4,
                                                py: 1,
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                '&:hover': {
                                                    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                                                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                                                }
                                            }}
                                        >
                                            {id ? "Update" : "Save"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Box>
                </CraftForm>
            )}
        </CraftModal >
    )
}