/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    Card,
    CardContent,
    Grid,
    Chip,
    Divider,
    alpha,
    Fade,
    Zoom,
} from "@mui/material"
import {
    Save as SaveIcon,
    School as SchoolIcon,
    Person as PersonIcon,
    Book as BookIcon,
    Class as ClassIcon,
    Description as DescriptionIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
} from "@mui/icons-material"
import CraftForm from "@/components/Forms/Form"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon"
import CraftTextArea from "@/components/Forms/TextArea"
import { theme } from "@/lib/Theme/Theme"
import toast from "react-hot-toast"
import { useCreateClassMutation, useGetSingleClassQuery, useUpdateClassMutation } from "@/redux/api/classApi"
import type { FieldValues } from "react-hook-form"
import { useGetAllStudentsQuery } from "@/redux/api/studentApi"
import { useMemo, useState } from "react"
import { useGetAllTeachersQuery } from "@/redux/api/teacherApi"
import { useGetAllSubjectsQuery } from "@/redux/api/subjectApi"
import { useRouter } from "next/navigation"


interface ClassProps {
    id: string;
}
export default function ClassForm({ id }: ClassProps) {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()
    const { data: singleClass, isLoading } = useGetSingleClassQuery({ id })

    const [createClass, { isSuccess }] = useCreateClassMutation()
    const [updateclass] = useUpdateClassMutation()
    const {
        data: studentData,

        refetch,
    } = useGetAllStudentsQuery({
        limit: rowsPerPage,
        page: page + 1,
        searchTerm: searchTerm,
    })
    const { data: teacherData } = useGetAllTeachersQuery({
        limit: rowsPerPage,
        page: page + 1,
        searchTerm: searchTerm,
    })
    const { data: subjectData } = useGetAllSubjectsQuery({
        limit: rowsPerPage,
        page: page + 1,
        searchTerm: searchTerm,
    })

    const studentOption = useMemo(() => {
        if (!studentData?.data) return []
        return studentData.data.map((student: any) => ({
            label: student.name,
            value: student._id,
        }))
    }, [studentData])

    const teacherOption = useMemo(() => {
        if (!teacherData?.data) return []
        return teacherData.data.map((teacher: any) => ({
            label: teacher.name,
            value: teacher._id,
        }))
    }, [teacherData])

    const subjectOption = useMemo(() => {
        if (!subjectData?.data?.subjects) return []
        return subjectData?.data?.subjects.map((sub: any) => ({
            label: sub.name,
            value: sub._id,
        }))
    }, [subjectData])

    const handleSubmit = async (data: FieldValues) => {



        const studentsArray = Array.isArray(data.students)
            ? data.students
                .map((item: any) => {

                    if (item && typeof item === "object" && "value" in item) {
                        return item.value
                    }
                    return null
                })
                .filter(Boolean)
            : []

        const teachersArray = Array.isArray(data.teachers)
            ? data.teachers
                .map((item: any) => {
                    if (item && typeof item === "object" && "value" in item) {
                        return item.value
                    }
                    return null
                })
                .filter(Boolean)
            : []

        const subjectsArray = Array.isArray(data.subjects)
            ? data.subjects
                .map((item: any) => {
                    if (item && typeof item === "object" && "value" in item) {
                        return item.value
                    }
                    return null
                })
                .filter(Boolean)
            : []

        const sectionsArray = Array.isArray(data.sections)
            ? data.sections
                .map((item: any) => {
                    if (item && typeof item === "object" && "value" in item) {
                        return item.value
                    }
                    return null
                })
                .filter(Boolean)
            : []

        const modifyValues = {
            ...data,
            students: studentsArray,
            teachers: teachersArray,
            subjects: subjectsArray,
            sections: sectionsArray,
        }

        console.log("Modified data being sent to API:", modifyValues)

        try {
            let res;
            if (id) {
                res = await updateclass({ id, body: modifyValues }).unwrap();
                if (res.success) {
                    toast.success("Class updated successfully!");
                    router.push('/dashboard/super_admin/classes/class')
                }
            } else {
                res = await createClass(modifyValues).unwrap();
                if (res.success) {
                    toast.success("Class created successfully!");
                    router.push('/dashboard/super_admin/classes/class')
                }
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to process class!");
        }

    }

    const defaultValue = {
        className: singleClass?.data.className || '',
        description: singleClass?.data.description || '',
        students: singleClass?.data.students || [],
        teachers: singleClass?.data.teachers || [],
        subjects: singleClass?.data.subjects || [],
        sections: singleClass?.data.sections || [],

    }
    if (isLoading) {
        return <h3>Loading........</h3>
    }

    console.log(singleClass)
    return (
        <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
            <Box
                sx={{
                    flexGrow: 1,
                    minHeight: "100vh",
                    background: "linear-gradient(to bottom, #f5f7fa, #e4e7eb)",
                    pt: 4,
                    pb: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Fade in={true} timeout={800}>
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 4,
                                }}
                            >
                                <SchoolIcon
                                    sx={{
                                        fontSize: 40,
                                        color: "primary.main",
                                        mr: 2,
                                        p: 1,
                                        borderRadius: "50%",
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    }}
                                />
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    sx={{
                                        background: "linear-gradient(45deg, #3f51b5, #5c6bc0)",
                                        backgroundClip: "text",
                                        textFillColor: "transparent",
                                        mb: 0,
                                    }}
                                >
                                    Class Management
                                </Typography>
                            </Box>

                            <Paper
                                elevation={0}
                                sx={{
                                    p: 0,
                                    mb: 4,
                                    overflow: "hidden",
                                    position: "relative",
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 3,
                                        background: "linear-gradient(45deg, #3f51b5, #5c6bc0)",
                                        color: "white",
                                        borderTopLeftRadius: 16,
                                        borderTopRightRadius: 16,
                                    }}
                                >
                                    <Typography variant="h5" fontWeight="bold">
                                        Create New Class
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
                                        Fill in the details below to create a new class in your school management system
                                    </Typography>
                                </Box>

                                <Box sx={{ p: 3 }}>
                                    <Zoom in={true}>
                                        <Card
                                            sx={{
                                                mb: 4,
                                                position: "relative",
                                                border: "1px solid rgba(0,0,0,0.08)",
                                                overflow: "visible",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: -15,
                                                    left: 20,
                                                    bgcolor: "primary.main",
                                                    color: "white",
                                                    py: 0.5,
                                                    px: 2,
                                                    borderRadius: 4,
                                                    zIndex: 1,
                                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                                }}
                                            >
                                                <Typography variant="subtitle2" fontWeight="bold">
                                                    Class Details
                                                </Typography>
                                            </Box>

                                            <CardContent sx={{ p: 3, pt: 4 }}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} md={6}>
                                                        <CraftInputWithIcon
                                                            name="className"
                                                            fullWidth
                                                            label="Class Name"
                                                            variant="outlined"
                                                            placeholder="Enter class name"
                                                            required
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <ClassIcon
                                                                        sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }}
                                                                    />
                                                                ),
                                                            }}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} md={6}>
                                                        <CraftIntAutoCompleteWithIcon
                                                            name="sections"
                                                            label="Select Section"
                                                            options={subjectOption}
                                                            fullWidth
                                                            icon={<ClassIcon color="secondary" />}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Divider sx={{ my: 1 }}>
                                                            <Chip
                                                                label="Description"
                                                                icon={<DescriptionIcon />}
                                                                sx={{
                                                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                                    color: "primary.main",
                                                                    fontWeight: 500,
                                                                }}
                                                            />
                                                        </Divider>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <CraftTextArea name="description" label="Description" />
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Divider sx={{ my: 1 }}>
                                                            <Chip
                                                                label="Assign Teachers & Subjects"
                                                                icon={<PersonIcon />}
                                                                sx={{
                                                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                                    color: "primary.main",
                                                                    fontWeight: 500,
                                                                }}
                                                            />
                                                        </Divider>
                                                    </Grid>

                                                    <Grid item xs={12} md={6}>
                                                        <CraftIntAutoCompleteWithIcon
                                                            name="teachers"
                                                            label="Select Teachers"
                                                            options={teacherOption}
                                                            fullWidth
                                                            icon={<PersonIcon color="secondary" />}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} md={6}>
                                                        <CraftIntAutoCompleteWithIcon
                                                            name="subjects"
                                                            label="Select Subjects"
                                                            options={subjectOption}
                                                            fullWidth
                                                            icon={<BookIcon color="secondary" />}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Divider sx={{ my: 1 }}>
                                                            <Chip
                                                                label="Assign Students"
                                                                icon={<SchoolIcon />}
                                                                sx={{
                                                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                                    color: "primary.main",
                                                                    fontWeight: 500,
                                                                }}
                                                            />
                                                        </Divider>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <CraftIntAutoCompleteWithIcon
                                                            name="students"
                                                            label="Select Students"
                                                            options={studentOption}
                                                            fullWidth
                                                            icon={<SchoolIcon color="secondary" />}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Zoom>
                                </Box>
                            </Paper>

                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={isSuccess ? <CheckCircleOutlineIcon /> : <SaveIcon />}
                                    type="submit"
                                    // disabled={saving || success}
                                    sx={{
                                        px: 6,
                                        py: 1.5,
                                        fontSize: "1rem",
                                        minWidth: 200,
                                        position: "relative",
                                        overflow: "hidden",
                                        "&::after": isSuccess
                                            ? {
                                                content: '""',
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                background: `linear-gradient(45deg, ${alpha(
                                                    theme.palette.success.main,
                                                    0.2,
                                                )} 30%, ${alpha(theme.palette.success.light, 0.2)} 90%)`,
                                                zIndex: -1,
                                            }
                                            : {},
                                    }}
                                >
                                    {id ? "Update Class" : '   Save Class'}
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Container>
            </Box>
        </CraftForm>
    )
}
