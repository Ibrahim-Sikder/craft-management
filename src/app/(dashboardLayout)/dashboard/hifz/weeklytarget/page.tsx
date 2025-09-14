/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Menu,
    MenuItem,
    Divider,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Skeleton,
    Fade,
    ThemeProvider,   
    TextField,    
    CircularProgress,
    alpha,
} from "@mui/material"
import {
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Save,
    DateRange,
} from "@mui/icons-material"
import CraftForm from "@/components/Forms/Form"
import CraftIntAutoComplete from "@/components/Forms/CruftAutocomplete"
import { customTheme } from "@/data"
import type { FieldValues } from "react-hook-form"
import { useGetAllStudentsQuery } from "@/redux/api/studentApi"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import {
    useCreateClassReportMutation,
    useGetSingleClassReportQuery,
    useUpdateClassReportMutation,
} from "@/redux/api/classReportApi"
import { useGetAllClassesQuery } from "@/redux/api/classApi"
import { useGetAllSubjectsQuery } from "@/redux/api/subjectApi"
import { format } from "date-fns"
import { useGetAllTeachersQuery } from "@/redux/api/teacherApi"
import { DateRangeIcon } from "@mui/x-date-pickers"

// Define a type for student evaluation
type StudentEvaluation = {
    studentId: string
    lessonEvaluation: string
    handwriting: string
    attendance: string
    parentSignature: boolean
    comments: string
}

interface IDateRange {
    startDate: Date | null
    endDate: Date | null
}

export default function ClassReportForm({ id }: any) {
    const router = useRouter()
    const [page, setPage] = useState(0)  
    const [searchTerm, setSearchTerm] = useState("")
    const limit = 90000000
    const theme = customTheme
    const [filters, setFilters] = useState({
        class: "",
        batch: "",
        teacher: "",
        date: "",
        day: "",
        startDate: "",
        endDate: "",
    })
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [studentEvaluations, setStudentEvaluations] = useState<StudentEvaluation[]>([])
    const [todayLessonId, setTodayLessonId] = useState<string | null>(null)
    const [homeTaskId, setHomeTaskId] = useState<string | null>(null)
    const [reportStudents, setReportStudents] = useState<any[]>([])
    const [isEditMode, setIsEditMode] = useState(false)
    const [noTaskForClass, setNoTaskForClass] = useState(false)
    const [lessonEvaluationTask, setLessonEvaluationTask] = useState(false)
    const [handwrittenTask, setHandwrittenTask] = useState(false)
    const [isSubmittingForm, setIsSubmittingForm] = useState(false)
    const [dateRangePickerOpen, setDateRangePickerOpen] = useState(false)
    const [selectedDateRange, setSelectedDateRange] = useState<IDateRange>({
        startDate: null,
        endDate: null,
    })
    const { data: singleClassReport, isLoading: singleClassReportLoading } = useGetSingleClassReportQuery({ id })


    const { data: classData } = useGetAllClassesQuery({
        limit: limit,
        page: page + 1,
        searchTerm: searchTerm,
    })
    const { data: teacherData } = useGetAllTeachersQuery({
        limit: limit,
        page: page + 1,
        searchTerm: searchTerm,
    })
    const { data: subjectData } = useGetAllSubjectsQuery({
        limit: limit,
        page: page + 1,
        searchTerm: searchTerm,
    })

    const classOption = useMemo(() => {
        if (!classData?.data?.classes) return []
        return classData?.data?.classes.map((clg: any) => ({
            label: clg.className,
            value: clg._id,
        }))
    }, [classData])

    const subjectOption = useMemo(() => {
        if (!subjectData?.data?.subjects) return []
        return subjectData?.data?.subjects.map((sub: any) => ({
            label: sub.name,
            value: sub._id,
        }))
    }, [subjectData])
    const teacherOption = useMemo(() => {
        if (!teacherData?.data) return []
        return teacherData?.data?.map((sub: any) => ({
            label: sub.name,
            value: sub._id,
        }))
    }, [teacherData])


    const {
        data: studentData,
        isLoading,
        refetch,
    } = useGetAllStudentsQuery(
        {
            limit: limit,
            page: page + 1,
            searchTerm: searchTerm,
            className: filters.class ? filters.class : undefined,
            startDate: filters.startDate || undefined,
            endDate: filters.endDate || undefined,
        },
        {
            skip: id && isEditMode,
        },
    )

    const [createClassReport, { isLoading: isSubmitting }] = useCreateClassReportMutation()
    const [updateClassReport, { isLoading: isUpdating }] = useUpdateClassReportMutation()

    const students = useMemo(() => {
        if (id && isEditMode) {
            return reportStudents
        }
        return studentData?.data || []
    }, [id, isEditMode, reportStudents, studentData?.data])

    const formatDateRangeDisplay = () => {
        if (!selectedDateRange.startDate || !selectedDateRange.endDate) {
            return "Select date range"
        }
        return `${format(selectedDateRange.startDate, "dd MMM yyyy")} - ${format(selectedDateRange.endDate, "dd MMM yyyy")}`
    }

    const handleDateRangePickerOpen = () => {
        setDateRangePickerOpen(true)
    }

    useEffect(() => {
        if (id && singleClassReport?.data?.studentEvaluations) {
            setIsEditMode(true)
            const studentsFromReport = singleClassReport.data.studentEvaluations?.map((studentEval: any) => {
                const student = studentEval?.studentId
                return {
                    _id: student?._id,
                    name: student?.name,
                    studentId: student?.studentId,
                    className: student?.className,
                    section: student?.section || "",
                }
            })

            setReportStudents(studentsFromReport)
        }
    }, [id, singleClassReport])

    useEffect(() => {
        if (singleClassReport?.data?.studentEvaluations?.length > 0) {
            const evaluations = singleClassReport?.data?.studentEvaluations?.map((studentEval: any) => ({
                studentId: studentEval?.studentId?._id,
                lessonEvaluation: studentEval.lessonEvaluation,
                handwriting: studentEval.handwriting,
                attendance: studentEval.attendance,
                parentSignature: studentEval.parentSignature,
                comments: studentEval.comments || "",
            }))
            setStudentEvaluations(evaluations)
        } else if (students.length > 0 && studentEvaluations.length === 0) {
            const initialEvaluations = students.map((student: any) => ({
                studentId: student._id,
                lessonEvaluation: noTaskForClass ? "পাঠ নেই" : "পড়া শিখেছে",
                handwriting: noTaskForClass ? "কাজ নেই" : "লিখেছে",
                attendance: "উপস্থিত",
                parentSignature: noTaskForClass ? false : true,
                comments: "",
            }))
            setStudentEvaluations(initialEvaluations)
        }
    }, [students, singleClassReport, studentEvaluations.length])

    useEffect(() => {
        if (singleClassReport?.data) {
            if (singleClassReport.data.noTaskForClass !== undefined) {
                setNoTaskForClass(!!singleClassReport.data.noTaskForClass)
            }
            if (singleClassReport.data.lessonEvaluationTask !== undefined) {
                setLessonEvaluationTask(!!singleClassReport.data.lessonEvaluationTask)
            }
            if (singleClassReport.data.handwrittenTask !== undefined) {
                setHandwrittenTask(!!singleClassReport.data.handwrittenTask)
            }
        }
    }, [singleClassReport?.data])

    // Fixed defaultValues with proper option mapping
    const defaultValues = useMemo(() => {
        if (!singleClassReport?.data) return null

        const report = singleClassReport.data

        if (report.todayLesson?._id) {
            setTodayLessonId(report.todayLesson._id)
        }

        if (report.homeTask?._id) {
            setHomeTaskId(report.homeTask._id)
        }
        if (report.classes) {
            setFilters((prev) => ({
                ...prev,
                class: report.classes,
            }))
        }

        // Find the correct option objects for autocomplete fields
        const classObj = classOption.find((opt: any) => opt.label === report.classes)
        const subjectObj = subjectOption.find((opt: any) => opt.label === report.subjects)
        const teacherObj = teacherOption.find((opt: any) => opt.label === report.teachers)

        return {
            classes: classObj || report.classes,
            subjects: subjectObj || report.subjects,
            hour: report.hour || "",
            date: report.date ? format(new Date(report.date), "yyyy-MM-dd") : "",
            teachers: teacherObj || report.teachers,
        }
    }, [singleClassReport, classOption, subjectOption, teacherOption])

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "dd/MM/yyyy")
        } catch (error) {
            return "Invalid Date"
        }
    }

    // Utility function to safely extract values from form data
    const safeExtractValue = (data: any, options: any[], fallback = "") => {
        if (!data) return fallback

        if (typeof data === "string") {
            const match = options.find((opt: any) => opt.label === data || opt.value === data)
            return match ? match.label : data
        }

        if (typeof data === "object" && data.label) {
            return data.label
        }

        return fallback
    }

    // Enhanced mobile handling in handleSubmit with comprehensive error handling
    const handleSubmit = async (data: FieldValues) => {
        // Prevent multiple submissions
        if (isSubmittingForm) {
            toast.error("অনুগ্রহ করে অপেক্ষা করুন...")
            return
        }

        setIsSubmittingForm(true)

        try {


            // Enhanced mobile detection
            const isMobile =
                /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                window.innerWidth <= 768 ||
                "ontouchstart" in window

            // Check network connectivity
            if (!navigator.onLine) {
                throw new Error("No internet connection. Please check your network and try again.")
            }

            // Enhanced mobile data processing with better error handling
            if (isMobile) {
                try {
                    // Add longer delay for mobile processing
                    await new Promise((resolve) => setTimeout(resolve, 500))

                    // More robust autocomplete data format fixes for mobile
                    if (data.classes) {
                        if (typeof data.classes === "string") {
                            const match = classOption.find((opt: any) => opt.label === data.classes || opt.value === data.classes)
                            if (match) {
                                data.classes = match
                            } else {
                                // Fallback: create object if string doesn't match any option
                                data.classes = { label: data.classes, value: data.classes }
                            }
                        } else if (data.classes && (!data.classes.label || !data.classes.value)) {
                            // Ensure object has required properties
                            data.classes = {
                                label: data.classes.label || data.classes.value || data.classes,
                                value: data.classes.value || data.classes.label || data.classes,
                            }
                        }
                    }

                    if (data.subjects) {
                        if (typeof data.subjects === "string") {
                            const match = subjectOption.find((opt: any) => opt.label === data.subjects || opt.value === data.subjects)
                            if (match) {
                                data.subjects = match
                            } else {
                                data.subjects = { label: data.subjects, value: data.subjects }
                            }
                        } else if (data.subjects && (!data.subjects.label || !data.subjects.value)) {
                            data.subjects = {
                                label: data.subjects.label || data.subjects.value || data.subjects,
                                value: data.subjects.value || data.subjects.label || data.subjects,
                            }
                        }
                    }

                    if (data.teachers) {
                        if (typeof data.teachers === "string") {
                            const match = teacherOption.find((opt: any) => opt.label === data.teachers || opt.value === data.teachers)
                            if (match) {
                                data.teachers = match
                            } else {
                                data.teachers = { label: data.teachers, value: data.teachers }
                            }
                        } else if (data.teachers && (!data.teachers.label || !data.teachers.value)) {
                            data.teachers = {
                                label: data.teachers.label || data.teachers.value || data.teachers,
                                value: data.teachers.value || data.teachers.label || data.teachers,
                            }
                        }
                    }

                    console.log("Mobile processed data:", data)
                } catch (error) {
                    console.error("Mobile data processing error:", error)
                    throw new Error("Mobile data processing failed. Please try again.")
                }
            }

            // Enhanced validation with better error messages
            if (!data.classes || (typeof data.classes === "object" && !data.classes.label)) {
                throw new Error("শ্রেণী নির্বাচন করুন")
            }

            if (!data.subjects || (typeof data.subjects === "object" && !data.subjects.label)) {
                throw new Error("বিষয় নির্বাচন করুন")
            }

            if (!data.teachers || (typeof data.teachers === "object" && !data.teachers.label)) {
                throw new Error("শিক্ষক নির্বাচন করুন")
            }

            if (!data.hour) {
                throw new Error("ঘন্টা নির্বাচন করুন")
            }

            if (!data.date) {
                throw new Error("তারিখ নির্বাচন করুন")
            }

            // Safely extract values using utility function
            const classValue = safeExtractValue(data.classes, classOption)
            const subjectValue = safeExtractValue(data.subjects, subjectOption)
            const teacherValue = safeExtractValue(data.teachers, teacherOption)

            // Validate extracted values
            if (!classValue) {
                throw new Error("শ্রেণীর তথ্য সঠিক নয়")
            }
            if (!subjectValue) {
                throw new Error("বিষয়ের তথ্য সঠিক নয়")
            }
            if (!teacherValue) {
                throw new Error("শিক্ষকের তথ্য সঠিক নয়")
            }

            const formattedData = {
                teachers: teacherValue,
                subjects: subjectValue,
                classes: classValue,
                hour: data.hour,
                date: format(new Date(data.date), "yyyy-MM-dd"),
                noTaskForClass: noTaskForClass,
                lessonEvaluationTask: lessonEvaluationTask,
                handwrittenTask: handwrittenTask,
                studentEvaluations: students.map((student: any) => {
                    const existingEval = studentEvaluations.find((evaluation) => evaluation.studentId === student._id)

                    if (noTaskForClass) {
                        return {
                            studentId: student._id,
                            lessonEvaluation: "পাঠ নেই",
                            handwriting: "কাজ নেই",
                            attendance: existingEval?.attendance || "উপস্থিত",
                            parentSignature: false,
                            comments: "",
                        }
                    } else {
                        return (() => {
                            const attendanceValue = existingEval?.attendance || "উপস্থিত"

                            if (attendanceValue === "অনুপস্থিত") {
                                return {
                                    studentId: existingEval ? existingEval.studentId : student._id,
                                    attendance: "অনুপস্থিত",
                                    lessonEvaluation: "অনুপস্থিত",
                                    handwriting: "অনুপস্থিত",
                                    parentSignature: false,
                                    comments: "",
                                }
                            }

                            if (noTaskForClass) {
                                return {
                                    studentId: student._id,
                                    lessonEvaluation: "পাঠ নেই",
                                    handwriting: "কাজ নেই",
                                    attendance: attendanceValue,
                                    parentSignature: false,
                                    comments: "",
                                }
                            }
                            return {
                                studentId: existingEval ? existingEval.studentId : student._id,
                                lessonEvaluation: lessonEvaluationTask ? "পাঠ নেই" : existingEval?.lessonEvaluation || "পড়া শিখেছে",
                                handwriting: handwrittenTask ? "কাজ নেই" : existingEval?.handwriting || "লিখেছে",
                                attendance: attendanceValue,
                                parentSignature:
                                    noTaskForClass || (lessonEvaluationTask && handwrittenTask)
                                        ? false
                                        : existingEval?.parentSignature || true,
                                comments: existingEval?.comments || "",
                            }
                        })()
                    }
                }),
                todayLesson: todayLessonId,
                homeTask: homeTaskId,
            }

            console.log("Formatted data for submission:", formattedData)

            let response: any = null
            let apiError: any = null

            try {
                if (!id) {
                    response = await createClassReport(formattedData).unwrap()
                } else {
                    response = await updateClassReport({ id, data: formattedData }).unwrap()
                }
            } catch (error: any) {
                apiError = error
                console.error("API call failed:", error)
            }

            // Enhanced response handling with comprehensive checks
            if (response && typeof response === "object") {
                // Check for success in various possible response structures
                const isSuccess =
                    response.success === true ||
                    response.status === "success" ||
                    response.statusCode === 200 ||
                    response.statusCode === 201 ||
                    (response.data && response.data.success === true)

                if (isSuccess) {
                    const successMessage = id ? "Class report updated successfully!" : "Class report saved successfully!"
                    const successMessageBn = id ? "ক্লাস রিপোর্ট সফলভাবে আপডেট হয়েছে!" : "ক্লাস রিপোর্ট সফলভাবে সংরক্ষিত হয়েছে!"


                    toast.success(successMessageBn)

                    // Add delay before navigation for mobile
                    if (isMobile) {
                        await new Promise((resolve) => setTimeout(resolve, 1000))
                    }

                    router.push("/dashboard/classes/report/list")
                    return
                }
            }

            // If we reach here, the response was not successful or was undefined
            const errorMessage =
                response?.message ||
                response?.error ||
                apiError?.data?.message ||
                apiError?.message ||
                "Failed to save class report"

            throw new Error(errorMessage)
        } catch (error: any) {
            console.error("Error in handleSubmit:", error)

            // Enhanced error handling
            let errorMessage = "Failed to save class report"

            if (error.message) {
                errorMessage = error.message
            } else if (error.data?.message) {
                errorMessage = error.data.message
            } else if (typeof error === "string") {
                errorMessage = error
            }

            // Log additional debug info for mobile
            const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            if (isMobile) {
                console.log("Mobile error debug:", {
                    error,
                    formData: data,
                    studentEvaluations: studentEvaluations.length,
                    networkStatus: navigator.onLine ? "online" : "offline",
                    userAgent: navigator.userAgent,
                })
            }
            toast.error(errorMessage)

            // Additional mobile-specific error handling
            if (!navigator.onLine) {
                toast.error("নেটওয়ার্ক সমস্যা। অনুগ্রহ করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।")
            }
        } finally {
            setIsSubmittingForm(false)
        }
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true)
        setAnchorEl(null)
    }

    const handleDeleteConfirm = () => {
        setDeleteDialogOpen(false)
        setSelectedStudent(null)
    }

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false)
    }

    const handleCommentsChange = (studentId: string, value: string) => {
        const updatedEvaluations = [...studentEvaluations]
        const index = updatedEvaluations.findIndex((evaluation) => evaluation.studentId === studentId)

        if (index !== -1) {
            updatedEvaluations[index] = {
                ...updatedEvaluations[index],
                comments: value,
            }
        } else {
            updatedEvaluations.push({
                studentId,
                lessonEvaluation: "পড়া শিখেছে",
                handwriting: "লিখেছে",
                attendance: "উপস্থিত",
                parentSignature: true,
                comments: value,
            })
        }

        setStudentEvaluations(updatedEvaluations)
    }

    const handleClassChange = (event: any, newValue: any) => {
        if (id && isEditMode) {
            toast("Cannot change class in edit mode")
            return
        }

        if (newValue) {
            setFilters((prev) => ({
                ...prev,
                class: newValue.label,
            }))
            refetch()
        } else {
            setFilters((prev) => ({
                ...prev,
                class: "",
            }))
        }
    }

    const getStudentEvaluation = (studentId: string) => {
        const evaluation = studentEvaluations.find((evaluation) => evaluation.studentId === studentId)

        if (!evaluation) {
            const defaultEvaluation = {
                studentId,
                lessonEvaluation: noTaskForClass ? "পাঠ নেই" : lessonEvaluationTask ? "পাঠ নেই" : "পড়া শিখেছে",
                handwriting: noTaskForClass ? "কাজ নেই" : handwrittenTask ? "কাজ নেই" : "লিখেছে",
                attendance: "উপস্থিত",
                parentSignature: noTaskForClass || (lessonEvaluationTask && handwrittenTask) ? false : true,
                comments: "",
            }
            setStudentEvaluations((prev) => [...prev, defaultEvaluation])
            return defaultEvaluation
        }

        // If noTaskForClass is enabled or individual fields are disabled, show appropriate values
        if (noTaskForClass) {
            return {
                ...evaluation,
                lessonEvaluation: "পাঠ নেই",
                handwriting: "কাজ নেই",
                parentSignature: false,
            }
        } else {
            return {
                ...evaluation,
                lessonEvaluation: lessonEvaluationTask ? "পাঠ নেই" : evaluation.lessonEvaluation,
                handwriting: handwrittenTask ? "কাজ নেই" : evaluation.handwriting,
                parentSignature: lessonEvaluationTask && handwrittenTask ? false : evaluation.parentSignature,
            }
        }
    }

    useEffect(() => {
        // Mobile-specific optimizations
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera|Realme Mini/i.test(navigator.userAgent)

        if (isMobile) {
            // Prevent zoom on input focus for iOS
            const viewport = document.querySelector('meta[name="viewport"]')
            if (viewport) {
                viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no")
            }

            // Add mobile-specific styles
            const style = document.createElement("style")
            style.textContent = `
        .MuiAutocomplete-popper {
          z-index: 9999 !important;
        }
        .MuiSelect-select {
          font-size: 16px !important;
        }
        .MuiInputBase-input {
          font-size: 16px !important;
        }
      `
            document.head.appendChild(style)

            return () => {
                document.head.removeChild(style)
                if (viewport) {
                    viewport.setAttribute("content", "width=device-width, initial-scale=1.0")
                }
            }
        }
    }, [])

    const cardStyle = {
        width: '100%',
        borderRadius: 3,
        background:
            selectedDateRange.startDate || selectedDateRange.endDate
                ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(
                    theme.palette.secondary.main,
                    0.05,
                )} 100%)`
                : "background.paper",
        border:
            selectedDateRange.startDate || selectedDateRange.endDate
                ? `2px solid ${alpha(theme.palette.primary.main, 0.3)}`
                : "1px solid rgba(0, 0, 0, 0.12)",
        transition: "all 0.3s ease",
        "&:hover": {
            boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
            transform: "translateY(-2px)",
        },
    }

    return (
        <ThemeProvider theme={theme}>
            {singleClassReportLoading ? (
                <div></div>
            ) : (
                <>
                    <CraftForm onSubmit={handleSubmit} defaultValues={defaultValues || undefined}>
                        <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", borderRadius: 2 }}>
                            <Container maxWidth={false} sx={{ mt: 0, mb: 8, borderRadius: 2, px: { xs: 0, sm: 0, md: 4, lg: 5 } }}>
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
                                                paddingTop: 2,
                                            }}
                                        >
                                            <Typography
                                                variant="h4"
                                                component="h1"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: "text.primary",
                                                    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                                                }}
                                            >
                                                {id ? "Edit Weekly Targer" : "+ Add Weekly Targer"}
                                                {isEditMode && (
                                                    <Typography component="span" variant="subtitle1" sx={{ ml: 2, color: "text.secondary" }}>
                                                        (Editing existing report)
                                                    </Typography>
                                                )}
                                            </Typography>
                                            <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 2 }, flexWrap: "wrap" }}>

                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={isSubmittingForm ? <CircularProgress size={16} color="inherit" /> : <Save />}
                                                    disabled={isSubmittingForm || isSubmitting || isUpdating}
                                                    sx={{
                                                        bgcolor: "#4F0187",
                                                        borderRadius: 2,
                                                        boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                                                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                                        px: { xs: 2, sm: 2 },
                                                    }}
                                                >
                                                    {isSubmittingForm || isSubmitting || isUpdating ? "Saving..." : "Save"}
                                                </Button>
                                            </Box>
                                        </Box>

                                        <Paper elevation={0} sx={{ mb: 4, width: "100%", overflow: "hidden" }}>
                                            <Box sx={{ p: { xs: 1, sm: 1, md: 2, lg: 3 }, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item xs={6} sm={6} md={3} lg={2.5}>
                                                        <CraftIntAutoComplete
                                                            name="teachers"
                                                            placeholder="শিক্ষকের নাম লিখুন"
                                                            label="শিক্ষকের নাম"
                                                            fullWidth
                                                            freeSolo
                                                            multiple={false}
                                                            options={teacherOption}
                                                            forcePopupIcon={false}
                                                            clearOnBlur={false}
                                                            selectOnFocus={true}
                                                            handleHomeEndKeys={true}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={6} md={2} lg={2.5}>
                                                        <CraftIntAutoComplete
                                                            name="classes"
                                                            label="শ্রেণীর নাম লিখুন"
                                                            fullWidth
                                                            freeSolo
                                                            multiple={false}
                                                            options={classOption}
                                                            onChange={handleClassChange}
                                                            forcePopupIcon={false}
                                                            clearOnBlur={false}
                                                            selectOnFocus={true}
                                                            handleHomeEndKeys={true}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={6} md={3} lg={2.5}>
                                                        <CraftIntAutoComplete
                                                            name="subjects"
                                                            label="বিষয়ের নাম লিখুন"
                                                            fullWidth
                                                            freeSolo
                                                            multiple={false}
                                                            options={subjectOption}
                                                            forcePopupIcon={false}
                                                            clearOnBlur={false}
                                                            selectOnFocus={true}
                                                            handleHomeEndKeys={true}
                                                        />
                                                    </Grid>


                                                    {/* Enhanced Date Range Filter */}
                                                    <Grid item xs={12} sm={6} md={6} lg={3}>
                                                        <Button
                                                            variant="outlined"
                                                            startIcon={<DateRange />}
                                                            onClick={handleDateRangePickerOpen}
                                                            fullWidth
                                                            sx={{
                                                                borderRadius: 1,
                                                                textTransform: "none",
                                                                justifyContent: "flex-start",
                                                                color: selectedDateRange.startDate ? "primary.main" : "text.secondary",
                                                                borderColor: selectedDateRange.startDate ? "primary.main" : "rgba(0, 0, 0, 0.23)",
                                                                fontSize: "0.875rem",
                                                                py: 1.5,
                                                                "&:hover": {
                                                                    transform: "translateY(-1px)",
                                                                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                                                                },
                                                                transition: "all 0.2s ease",
                                                            }}
                                                        >
                                                            {formatDateRangeDisplay()}
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>

                                            {isLoading ? (
                                                <Box sx={{ p: 2 }}>
                                                    {Array.from(new Array(5)).map((_, index) => (
                                                        <Box key={index} sx={{ display: "flex", py: 2, px: 2, alignItems: "center" }}>
                                                            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                                                            <Box sx={{ width: "100%" }}>
                                                                <Skeleton variant="text" width="40%" height={30} />
                                                                <Box sx={{ display: "flex", mt: 1 }}>
                                                                    <Skeleton variant="text" width="20%" sx={{ mr: 2 }} />
                                                                    <Skeleton variant="text" width="30%" />
                                                                </Box>
                                                            </Box>
                                                            <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
                                                        </Box>
                                                    ))}
                                                </Box>
                                            ) : (
                                                <>
                                                    <div className="flex gap-2 justify-center">

                                                    </div>

                                                    <div className="max-[320px]:block max-[320px]:w-[250px] max-[375px]:block max-[375px]:w-[300px] max-[425px]:block max-[425px]:w-[380px] max-[800px]:border max-[800px]:border-gray-300 max-[800px]:rounded   max-[800px]:block max-[800px]:max-w-[100vw] max-[800px]:relative max-[800px]:whitespace-nowrap max-[800px]:overflow-x-auto">

                                                        <Table
                                                            sx={{
                                                                minWidth: 900,
                                                                "@media (min-width: 900px)": {
                                                                    width: "100%",
                                                                    minWidth: "100%",
                                                                    tableLayout: { sm: "auto", md: "fixed", lg: "fixed" },
                                                                    px: 10
                                                                },
                                                            }}
                                                        >
                                                            <TableHead>

                                                                <TableRow>
                                                                    <TableCell align="center" sx={{ minWidth: 200 }}>
                                                                        হাদিস নাম্বার
                                                                    </TableCell>
                                                                    <TableCell align="center" sx={{ minWidth: 200 }}>
                                                                        সুরার নাম
                                                                    </TableCell>
                                                                    <TableCell align="center" sx={{ minWidth: 200 }}>
                                                                        দোয়ার নাম্বার
                                                                    </TableCell>
                                                                    <TableCell align="center" sx={{ minWidth: 200 }}>
                                                                        তাজভীদের বিষয়
                                                                    </TableCell>
                                                                    <TableCell align="center" sx={{ minWidth: 200 }}>
                                                                        কায়েদা (পৃ:)
                                                                    </TableCell>

                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {students.length === 0 && (
                                                                    <TableRow>
                                                                        <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                                                                            <Box sx={{ textAlign: "center" }}>
                                                                                <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                                                                                <Typography variant="h6" gutterBottom>
                                                                                    No students found
                                                                                </Typography>
                                                                                <Typography variant="body2" color="text.secondary">
                                                                                    Try adjusting your search or filter to find what you&apos;re looking for.
                                                                                </Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )}

                                                                <TableRow sx={{ transition: "all 0.2s" }}>


                                                                    <TableCell>
                                                                        <TextField
                                                                            fullWidth
                                                                            multiline
                                                                            minRows={1}
                                                                            label="হাদিস নাম্বার"
                                                                            placeholder="হাদিস নাম্বার"
                                                                        // value={evaluation.comments || ""}
                                                                        // onChange={(e) => handleCommentsChange(student._id, e.target.value)}
                                                                        // disabled={isAbsent || noTaskForClass}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField
                                                                            fullWidth
                                                                            multiline
                                                                            minRows={1}
                                                                            label="সুরার নাম"
                                                                            placeholder="সুরার নাম"
                                                                        // value={evaluation.comments || ""}
                                                                        // onChange={(e) => handleCommentsChange(student._id, e.target.value)}
                                                                        // disabled={isAbsent || noTaskForClass}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField
                                                                            fullWidth
                                                                            multiline
                                                                            minRows={1}
                                                                            label="দোয়ার নাম্বার"
                                                                            placeholder="দোয়ার নাম্বার"
                                                                        // value={evaluation.comments || ""}
                                                                        // onChange={(e) => handleCommentsChange(student._id, e.target.value)}
                                                                        // disabled={isAbsent || noTaskForClass}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField
                                                                            fullWidth
                                                                            multiline
                                                                            minRows={1}
                                                                            label="তাজভীদের বিষয়"
                                                                            placeholder="তাজভীদের বিষয়"
                                                                        // value={evaluation.comments || ""}
                                                                        // onChange={(e) => handleCommentsChange(student._id, e.target.value)}
                                                                        // disabled={isAbsent || noTaskForClass}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField
                                                                            fullWidth
                                                                            multiline
                                                                            minRows={1}
                                                                            label="কায়েদা (পৃ:)"
                                                                            placeholder="কায়েদা (পৃ:)"
                                                                        // value={evaluation.comments || ""}
                                                                        // onChange={(e) => handleCommentsChange(student._id, e.target.value)}
                                                                        // disabled={isAbsent || noTaskForClass}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </>
                                            )}
                                        </Paper>
                                    </Box>
                                </Fade>
                            </Container>
                        </Box>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                elevation: 3,
                                sx: {
                                    mt: 1,
                                    minWidth: 180,
                                    borderRadius: 2,
                                    overflow: "auto",
                                },
                            }}
                        >
                            <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                                <VisibilityIcon fontSize="small" sx={{ mr: 2, color: "info.main" }} />
                                View Details
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                                <EditIcon fontSize="small" sx={{ mr: 2, color: "warning.main" }} />
                                Edit
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleDeleteClick} sx={{ py: 1.5, color: "error.main" }}>
                                <DeleteIcon fontSize="small" sx={{ mr: 2 }} />
                                Delete
                            </MenuItem>
                        </Menu>

                        <Dialog
                            open={deleteDialogOpen}
                            onClose={handleDeleteCancel}
                            PaperProps={{
                                sx: {
                                    borderRadius: 3,
                                    width: "100%",
                                    maxWidth: 480,
                                },
                            }}
                        >
                            <DialogTitle sx={{ pb: 1 }}>
                                <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                                    Delete Student
                                </Typography>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete the student &#34;{selectedStudent?.name}&#34;? This action cannot be
                                    undone.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ px: 3, pb: 3 }}>
                                <Button
                                    onClick={handleDeleteCancel}
                                    variant="outlined"
                                    color="inherit"
                                    sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={handleDeleteConfirm} variant="contained" color="error" sx={{ ml: 2 }}>
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </CraftForm>
                </>
            )}
        </ThemeProvider>
    )
}
