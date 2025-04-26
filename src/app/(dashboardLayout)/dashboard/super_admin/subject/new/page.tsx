/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import {
    Box,
    Container,
    Button,
    Fade,
    createTheme,
    ThemeProvider,
    Grid,
    Typography,
    Divider,
    Chip,
    alpha,
    Card,
    CardContent,
    Switch,
    FormControlLabel,
    Tooltip,
    IconButton,
} from "@mui/material"
import { Class as ClassIcon, Person as PersonIcon, Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material"
import { Roboto } from "next/font/google"
import CraftForm from "@/components/Forms/Form"
import CraftSelect from "@/components/Forms/Select"
import { paper } from "@/options"

import CraftInput from "@/components/Forms/Input"
import {
    MenuBook,
    School,
    Assignment,
    Code,
    FormatListNumbered,
    Info as InfoIcon,
    Save as SaveIcon,
    CloudUpload as CloudUploadIcon,
} from "@mui/icons-material"
import { useMemo, useState } from "react"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import FileUploadWithIcon from "@/components/Forms/Upload"
import type { FieldValues } from "react-hook-form"
import { useCreateSubjectMutation, useUpdateSubjectMutation } from "@/redux/api/subjectApi"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useGetAllClassesQuery } from "@/redux/api/classApi"
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon"

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
})

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#6366f1",
            light: "#818cf8",
            dark: "#4f46e5",
        },
        secondary: {
            main: "#ec4899",
            light: "#f472b6",
            dark: "#db2777",
        },
        background: {
            default: "#f9fafb",
            paper: "#ffffff",
        },
        success: {
            main: "#10b981",
            light: "#34d399",
            dark: "#059669",
        },
        warning: {
            main: "#f59e0b",
            light: "#fbbf24",
            dark: "#d97706",
        },
        error: {
            main: "#ef4444",
            light: "#f87171",
            dark: "#dc2626",
        },
        info: {
            main: "#3b82f6",
            light: "#60a5fa",
            dark: "#2563eb",
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
        h4: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 8,
                    padding: "10px 20px",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "0px 4px 8px rgba(99, 102, 241, 0.2)",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                    overflow: "visible",
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                    padding: "16px",
                },
                head: {
                    fontWeight: 600,
                    backgroundColor: "rgba(99, 102, 241, 0.04)",
                    color: "#6366f1",
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: "rgba(99, 102, 241, 0.04)",
                    },
                    "&:last-child td": {
                        borderBottom: 0,
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                },
            },
        },
    },
})

export default function NewSubject({ id }: any) {
    const router = useRouter()
    const [createSubject] = useCreateSubjectMutation()
    const [updateSubject] = useUpdateSubjectMutation()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState("")
    // const { data: singleSubject } = useGetSingleSubjectQuery({ id })
    const { data: classData } = useGetAllClassesQuery({
        limit: rowsPerPage,
        page: page + 1,
        searchTerm: searchTerm,
    })
    const [isOptional, setIsOptional] = useState(false)
    const [lessons, setLessons] = useState([{ lessonNo: 1, lessonName: "" }])
    const theme = customTheme


    const classOption = useMemo(() => {
        if (!classData?.data?.classes) return []
        return classData?.data?.classes.map((clg: any) => ({
            label: clg.className,
            value: clg._id,
        }))
    }, [classData])


    const handleSubmit = async (data: FieldValues) => {
        const classArray = Array.isArray(data.classes)
            ? data.classes
                .map((item: any) => {
                    if (item && typeof item === "object" && "value" in item) {
                        return item.value
                    }
                    return null
                })
                .filter(Boolean)
            : []

        const teacherArray = Array.isArray(data.teachers)
            ? data.teachers
                .map((item: any) => {
                    if (item && typeof item === "object" && "value" in item) {
                        return item.value
                    }
                    return null
                })
                .filter(Boolean)
            : []

        // Format lessons array from form data
        const formattedLessons = lessons.map((lesson, index) => ({
            lessonNo: index + 1,
            lessonName: lesson.lessonName,
        }))

        const modifyValues = {
            ...data,
            classes: classArray,
            teachers: teacherArray,
            isOptional: isOptional,
            lessons: formattedLessons,
        }
        console.log(modifyValues)
        try {
            let res

            if (!id) {
                res = await createSubject(modifyValues).unwrap()
                if (res.success) {
                    toast.success("Subject created successfully!")
                    router.push("/dashboard/super_admin/subject")
                }
            } else {
                res = await updateSubject({ id, body: modifyValues }).unwrap()
                if (res.success) {
                    toast.success("Subject updated successfully!")
                    router.push("/dashboard/super_admin/subject")
                }
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to process subject!")
        }
    }

    const handleOptionalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsOptional(event.target.checked)
    }

    const handleLessonChange = (index: number, value: string) => {
        const updatedLessons = [...lessons]
        updatedLessons[index] = { ...updatedLessons[index], lessonName: value }
        setLessons(updatedLessons)
    }

    const addLessonField = () => {
        setLessons([...lessons, { lessonNo: lessons.length + 1, lessonName: "" }])
    }

    const removeLessonField = (index: number) => {
        if (lessons.length === 1) return
        const updatedLessons = [...lessons]
        updatedLessons.splice(index, 1)

        // Renumber lessons
        const renumberedLessons = updatedLessons.map((lesson, idx) => ({
            ...lesson,
            lessonNo: idx + 1,
        }))

        setLessons(renumberedLessons)
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <CraftForm onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            bgcolor: "background.default",
                            minHeight: "100vh",
                            borderRadius: 2,
                            background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
                        }}
                    >
                        <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2, pt: 2 }}>
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
                                            paddingTop: 2,
                                            position: "relative",
                                            "&::after": {
                                                content: '""',
                                                position: "absolute",
                                                bottom: -10,
                                                left: 0,
                                                width: "100%",
                                                height: "4px",
                                                background: "linear-gradient(90deg, #6366f1, #818cf8, #6366f1)",
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
                                                    background: "linear-gradient(45deg, #6366f1, #818cf8)",
                                                    backgroundClip: "text",
                                                    textFillColor: "transparent",
                                                    mb: 1,
                                                    letterSpacing: "-0.5px",
                                                    textShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <MenuBook fontSize="large" /> {id ? "Update Subject" : "Add New Subject"}
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary">
                                                {id
                                                    ? "Update existing subject details"
                                                    : "Create a new subject with lessons, class assignment, and more"}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", gap: 2 }}></Box>
                                    </Box>

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
                                                bgcolor: "#6366f1",
                                                color: "white",
                                                py: 1,
                                                px: 3,
                                                borderRadius: "12px",
                                                boxShadow: "0 8px 20px rgba(99, 102, 241, 0.25)",
                                                zIndex: 1,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <Assignment />
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                Subject Information
                                            </Typography>
                                        </Box>
                                        <CardContent sx={{ pt: 4, mt: 2 }}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={6}>
                                                    <CraftInputWithIcon
                                                        name="code"
                                                        label="Subject Code"
                                                        placeholder="Write Subject Code"
                                                        required
                                                        fullWidth
                                                        InputProps={{
                                                            startAdornment: <Code sx={{ color: "primary.main", mr: 1 }} />,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <CraftInputWithIcon
                                                        name="name"
                                                        label="Subject Name"
                                                        placeholder="Write Subject Name"
                                                        required
                                                        fullWidth
                                                        InputProps={{
                                                            startAdornment: <MenuBook sx={{ color: "primary.main", mr: 1 }} />,
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider sx={{ my: 1 }}>
                                                        <Chip
                                                            label="Classification"
                                                            icon={<School />}
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
                                                    <CraftSelect size="medium" name="paper" label="Paper" items={paper} fullWidth required />
                                                </Grid>

                                                <Grid item xs={12} md={6}>
                                                    <CraftIntAutoCompleteWithIcon
                                                        name="classes"
                                                        label="Select Classes"
                                                        options={classOption}
                                                        fullWidth
                                                        multiple
                                                        icon={<ClassIcon color="primary" />}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <CraftIntAutoCompleteWithIcon
                                                        name="teachers"
                                                        label="Select Teachers"
                                                        options={classOption}
                                                        fullWidth
                                                        multiple
                                                        icon={<PersonIcon color="secondary" />}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={isOptional}
                                                                onChange={handleOptionalChange}
                                                                name="isOptional"
                                                                color="primary"
                                                            />
                                                        }
                                                        label={
                                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                                <Typography variant="body1" sx={{ mr: 1 }}>
                                                                    Optional Subject
                                                                </Typography>
                                                                <Tooltip title="Mark this subject as optional for students">
                                                                    <InfoIcon fontSize="small" color="action" />
                                                                </Tooltip>
                                                            </Box>
                                                        }
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider sx={{ my: 1 }}>
                                                        <Chip
                                                            label="Lesson Information"
                                                            icon={<FormatListNumbered />}
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

                                                {lessons.map((lesson, index) => (
                                                    <Grid item xs={12} key={index}>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 2,
                                                                p: 2,
                                                                borderRadius: 2,
                                                                border: "1px solid rgba(0, 0, 0, 0.08)",
                                                                bgcolor: "rgba(99, 102, 241, 0.02)",
                                                            }}
                                                        >
                                                            <Chip label={`Lesson ${lesson.lessonNo}`} color="primary" sx={{ minWidth: 100 }} />
                                                            <CraftInput
                                                                name={`lessonName_${index}`}
                                                                label="Lesson Name"
                                                                placeholder="Enter lesson name"
                                                                value={lesson.lessonName}
                                                                onChange={(e: any) => handleLessonChange(index, e.target.value)}
                                                                sx={{ flexGrow: 1 }}
                                                            />
                                                            <IconButton
                                                                color="error"
                                                                onClick={() => removeLessonField(index)}
                                                                disabled={lessons.length === 1}
                                                                sx={{
                                                                    border: "1px solid rgba(239, 68, 68, 0.5)",
                                                                    borderRadius: "50%",
                                                                }}
                                                            >
                                                                <RemoveIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                color="primary"
                                                                onClick={addLessonField}
                                                                sx={{
                                                                    border: "1px solid rgba(99, 102, 241, 0.5)",
                                                                    borderRadius: "50%",
                                                                }}
                                                            >
                                                                <AddIcon />
                                                            </IconButton>
                                                        </Box>
                                                    </Grid>
                                                ))}

                                                <Grid item xs={12}>
                                                    <Divider sx={{ my: 1 }}>
                                                        <Chip
                                                            label="Resources"
                                                            icon={<CloudUploadIcon />}
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
                                                    <FileUploadWithIcon name="image" label="Subject Image" />
                                                </Grid>

                                                <Grid item xs={12} md={6}>
                                                    <CraftInput
                                                        name="paper"
                                                        label="Paper Document URL"
                                                        placeholder="Enter paper document URL or upload"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        startIcon={<SaveIcon />}
                                                        type="submit"
                                                        sx={{
                                                            bgcolor: "#6366f1",
                                                            borderRadius: "12px",
                                                            boxShadow: "0px 8px 20px rgba(99, 102, 241, 0.25)",
                                                            px: 4,
                                                            py: 1.5,
                                                            transition: "all 0.3s ease",
                                                            "&:hover": {
                                                                bgcolor: "#4f46e5",
                                                                transform: "translateY(-2px)",
                                                                boxShadow: "0px 10px 25px rgba(99, 102, 241, 0.35)",
                                                            },
                                                        }}
                                                    >
                                                        {id ? "Update Subject" : "Save Subject"}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Fade>
                        </Container>
                    </Box>
                </CraftForm>
            </ThemeProvider>
        </>
    )
}
