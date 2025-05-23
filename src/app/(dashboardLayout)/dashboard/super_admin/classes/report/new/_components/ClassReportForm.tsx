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
  Checkbox,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Switch,
  FormControlLabel,
  Tooltip,
} from "@mui/material"
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Add,
  Save,
} from "@mui/icons-material"
import CraftForm from "@/components/Forms/Form"
import CraftDatePicker from "@/components/Forms/DatePicker"
import CraftSelect from "@/components/Forms/Select"
import { classHour, handWritting, lessonEvaluation, subjectName } from "@/options"
import CraftIntAutoComplete from "@/components/Forms/CruftAutocomplete"
import { customTheme } from "@/data"
import { getFromLocalStorage } from "@/utils/local.storage"
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
import TodayLesson from "./TodayLesson"
import TodayTask from "./TodayTask"
import { format } from "date-fns"
import { useGetAllTeachersQuery } from "@/redux/api/teacherApi"

// Define a type for student evaluation
type StudentEvaluation = {
  studentId: string
  lessonEvaluation: string
  handwriting: string
  attendance: string
  parentSignature: boolean
  comments: string
}

export default function ClassReportForm({ id }: any) {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const limit = 90000000
  const theme = customTheme
  const [filters, setFilters] = useState({
    class: "",
    batch: "",
    teacher: "",
    date: "",
    day: "",
  })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedBrand, setSelectedBrand] = useState("")
  const [filteredSubjects, setFilteredVehicles] = useState<any[]>([])
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")
  const [studentEvaluations, setStudentEvaluations] = useState<StudentEvaluation[]>([])
  const [todayLessonId, setTodayLessonId] = useState<string | null>(null)
  const [homeTaskId, setHomeTaskId] = useState<string | null>(null)
  const [reportStudents, setReportStudents] = useState<any[]>([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [noTaskForClass, setNoTaskForClass] = useState(false)
  const [lessonEvaluationTask, setLessonEvaluationTask] = useState(false)
  const [handwrittenTask, setHandwrittenTask] = useState(false)

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
  const [todayLessonDialogOpen, setTodayLessonDialogOpen] = useState(false)
  const [todayTaskDialogOpen, setTodayTaskDialogOpen] = useState(false)

  const storedUser = JSON.parse(getFromLocalStorage("user-info") || "{}")

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

  const defaultValues = useMemo(() => {
    if (!singleClassReport?.data) return null

    const report = singleClassReport.data

    if (report.todayLesson?._id) {
      setTodayLessonId(report.todayLesson._id)
    }

    if (report.homeTask?._id) {
      setHomeTaskId(report.homeTask._id)
    }
    if (report.classes?._id) {
      setFilters((prev) => ({
        ...prev,
        class: report.classes._id,
      }))
    }

    return {
      classes: report.classes,
      subjects: report.subjects,
      hour: report.hour || "",
      date: report.date ? format(new Date(report.date), "yyyy-MM-dd") : "",
      teachers: report.teachers || "",
    }
  }, [singleClassReport])

  const handleLessonEvaluationTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    setLessonEvaluationTask(checked)
    toast.success(checked ? "পাঠ মূল্যায়ন অক্ষম করা হয়েছে!" : "পাঠ মূল্যায়ন সক্ষম করা হয়েছে!")
  }

  const handleHandwrittenTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    setHandwrittenTask(checked)
    toast.success(checked ? "হাতের লিখা অক্ষম করা হয়েছে!" : "হাতের লিখা সক্ষম করা হয়েছে!")
  }

  const handleSubmit = async (data: FieldValues) => {
    console.log("raw data", data)
    try {
      const classValue = typeof data.classes === "object" ? data.classes.label : data.classes
      const subjectValue = typeof data.subjects === "object" ? data.subjects.label : data.subjects
      const teacherValue = typeof data.teachers === "object" ? data.teachers.label : data.teachers

      const formattedData = {
        teachers: teacherValue,
        subjects: subjectValue,
        classes: classValue,
        hour: data.hour,
        date: data.date,
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
    lessonEvaluation: lessonEvaluationTask ? "পাঠ নেই" : existingEval?.lessonEvaluation || "",
    handwriting: handwrittenTask ? "কাজ নেই" : existingEval?.handwriting || "",
    attendance: attendanceValue,
    parentSignature:
      noTaskForClass || (lessonEvaluationTask && handwrittenTask)
        ? false
        : existingEval?.parentSignature || false,
    comments: existingEval?.comments || "",
  }
})()

          }
        }),
        todayLesson: todayLessonId,
        homeTask: homeTaskId,
      }
      console.log("formated data", formattedData)

      if (!id) {
        const response = await createClassReport(formattedData).unwrap()

        if (response.success) {
          setSnackbarMessage("Class report saved successfully!")
          setSnackbarSeverity("success")
          setSnackbarOpen(true)
          toast.success("Class report saved successfully!")
          router.push("/dashboard/super_admin/classes/report/list")
        }
      } else {
        const response = await updateClassReport({ id, data: formattedData }).unwrap()

        if (response.success) {
          setSnackbarMessage("Class report update successfully!")
          setSnackbarSeverity("success")
          setSnackbarOpen(true)
          toast.success("Class report update successfully!")
          router.push("/dashboard/super_admin/classes/report/list")
        }
      }
    } catch (error: any) {
      console.error("Error saving class report:", error)
      setSnackbarMessage(error?.data?.message || "Failed to save class report")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
      toast.error(error?.data?.message || "Failed to save class report")
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const handleLessonEvaluationChange = (studentId: string, value: string) => {
    const updatedEvaluations = [...studentEvaluations]
    const index = updatedEvaluations.findIndex((evaluation) => evaluation.studentId === studentId)

    if (index !== -1) {
      updatedEvaluations[index] = {
        ...updatedEvaluations[index],
        lessonEvaluation: value,
      }
    } else {
      updatedEvaluations.push({
        studentId,
        lessonEvaluation: "পড়া শিখেছে",
        handwriting: "লিখেছে",
        attendance: "উপস্থিত",
        parentSignature: true,
        comments: "",
      })
    }

    setStudentEvaluations(updatedEvaluations)
  }

  const handleHandwritingChange = (studentId: string, value: string) => {
    const updatedEvaluations = [...studentEvaluations]
    const index = updatedEvaluations.findIndex((evaluation) => evaluation.studentId === studentId)

    if (index !== -1) {
      updatedEvaluations[index] = {
        ...updatedEvaluations[index],
        handwriting: value,
      }
    } else {
      updatedEvaluations.push({
        studentId,
        lessonEvaluation: "পড়া শিখেছে",
        handwriting: value,
        attendance: "উপস্থিত",
        parentSignature: true,
        comments: "",
      })
    }

    setStudentEvaluations(updatedEvaluations)
  }

  const handleAttendanceChange = (studentId: string, value: string) => {
    const updatedEvaluations = [...studentEvaluations]
    const index = updatedEvaluations.findIndex((evaluation) => evaluation.studentId === studentId)

    if (index !== -1) {
      updatedEvaluations[index] = {
        ...updatedEvaluations[index],
        attendance: value,
      }
    } else {
      updatedEvaluations.push({
        studentId,
        lessonEvaluation: "পড়া শিখেছে",
        handwriting: value,
        attendance: value,
        parentSignature: true,
        comments: "",
      })
    }

    setStudentEvaluations(updatedEvaluations)
  }

  const handleParentSignatureChange = (studentId: string, checked: boolean) => {
    const updatedEvaluations = [...studentEvaluations]
    const index = updatedEvaluations.findIndex((evaluation) => evaluation.studentId === studentId)

    if (index !== -1) {
      updatedEvaluations[index] = {
        ...updatedEvaluations[index],
        parentSignature: checked,
      }
    } else {
      updatedEvaluations.push({
        studentId,
        lessonEvaluation: "পড়া শিখেছে",
        handwriting: "লিখেছে",
        attendance: "উপস্থিত",
        parentSignature: checked,
        comments: "",
      })
    }

    setStudentEvaluations(updatedEvaluations)
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

  const sortedVehicleName = subjectName.sort((a, b) => {
    if (a.value < b.value) return -1
    if (a.value > b.value) return 1
    return 0
  })

  const handleClassName = (event: any, newValue: any) => {
    setSelectedBrand(newValue)
    const filtered = sortedVehicleName
      ?.filter((vehicle: any) => vehicle.label?.toLowerCase().includes(newValue?.toLowerCase()))
      .sort((a: any, b: any) => a.label.localeCompare(b.label))
    setFilteredVehicles(filtered)
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
  // Handle Today's Lesson dialog
  const handleOpenTodayLessonDialog = () => {
    setTodayLessonDialogOpen(true)
  }

  const handleCloseTodayLessonDialog = () => {
    setTodayLessonDialogOpen(false)
  }

  const handleSaveTodayLesson = (lessonId: string) => {
    setTodayLessonId(lessonId)
    toast.success("আজকের পাঠ যোগ করা হয়েছে!")
  }

  const handleOpenTodayTaskDialog = () => {
    setTodayTaskDialogOpen(true)
  }

  const handleCloseTodayTaskDialog = () => {
    setTodayTaskDialogOpen(false)
  }

  const handleSaveTodayTask = (taskId: string) => {
    setHomeTaskId(taskId)
    toast.success("বাড়ির কাজ যোগ করা হয়েছে!")
  }

  const handleNoTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    setNoTaskForClass(checked)
    toast.success(checked ? "আজ কোন কাজ/হোমওয়ার্ক নেই!" : "কাজ/হোমওয়ার্ক স্ট্যাটাস আপডেট করা হয়েছে")
  }

  return (
    <>
      {singleClassReportLoading ? (
        <div>Loading.....</div>
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <CraftForm onSubmit={handleSubmit} defaultValues={defaultValues || {}}>
              <Box
                sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", borderRadius: 2 }}
              >
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
                          {id ? "Edit Report" : "+ Add New Report"}
                          {isEditMode && (
                            <Typography component="span" variant="subtitle1" sx={{ ml: 2, color: "text.secondary" }}>
                              (Editing existing report)
                            </Typography>
                          )}
                        </Typography>
                        <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 2 }, flexWrap: "wrap" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={handleOpenTodayLessonDialog}
                            sx={{
                              bgcolor: todayLessonId ? "success.main" : "",
                              borderRadius: 2,
                              boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                              fontSize: { xs: "0.75rem", sm: "0.875rem" },
                              px: { xs: 1, sm: 2 },
                            }}
                          >
                            {todayLessonId ? " আজকের পাঠে দেখুন" : "আজকের পাঠ"}
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={handleOpenTodayTaskDialog}
                            sx={{
                              bgcolor: homeTaskId ? "success.main" : "#3792de",
                              borderRadius: 2,
                              boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                              fontSize: { xs: "0.75rem", sm: "0.875rem" },
                              px: { xs: 1, sm: 2 },
                            }}
                          >
                            {homeTaskId ? "বাড়ির কাজ দেখুন" : "বাড়ির কাজ"}
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<Save />}
                            disabled={isSubmitting}
                            sx={{
                              bgcolor: "#4F0187",
                              borderRadius: 2,
                              boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                              fontSize: { xs: "0.75rem", sm: "0.875rem" },
                              px: { xs: 2, sm: 2 },
                            }}
                          >
                            {isSubmitting ? "Saving..." : "Save"}
                          </Button>
                        </Box>
                      </Box>

                      <Paper elevation={0} sx={{ mb: 4, width: "100%", overflow: "hidden" }}>
                        <Box sx={{ p: { xs: 1, sm: 1, md: 2, lg: 3 }, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6} sm={6} md={3} lg={3}>
                              <CraftIntAutoComplete
                                name="teachers"
                                placeholder="শিক্ষকের নাম লিখুন"
                                label="শিক্ষকের নাম"
                                fullWidth
                                freeSolo
                                multiple={false}
                                options={teacherOption}
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={2} lg={3}>
                              <CraftIntAutoComplete
                                name="classes"
                                label="শ্রেণীর নাম লিখুন"
                                fullWidth
                                freeSolo
                                multiple={false}
                                options={classOption}
                                onChange={handleClassChange}
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3}>
                              <CraftIntAutoComplete
                                name="subjects"
                                label="বিষয়ের নাম লিখুন"
                                fullWidth
                                freeSolo
                                multiple={false}
                                options={subjectOption}
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={2} lg={1.5}>
                              <CraftSelect
                                name="hour"
                                label="ঘন্টা"
                                items={classHour}
                                sx={{ minWidth: { xs: 100, sm: 120, md: 130 } }}
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={2} lg={1.5}>
                              <CraftDatePicker name="date" label="তারিখ" />
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
                              <Tooltip title="Disable all tasks">
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={noTaskForClass}
                                      onChange={handleNoTaskChange}
                                      color="primary"
                                    />
                                  }
                                  label={
                                    <Typography variant="caption" sx={{ fontSize: 15 }}>
                                      আজকে কোন পাঠ নেই
                                    </Typography>
                                  }
                                  labelPlacement="start"
                                />
                              </Tooltip>
                            </div>
                            <Box
                              sx={{
                                width: "100%",
                                overflowX: "auto",
                                // Small device styles (unchanged)
                                "@media (max-width: 800px)": {
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  display: "block",
                                  maxWidth: "100vw",
                                  position: "relative",
                                  overflowX: "auto",
                                  whiteSpace: "nowrap",
                                  WebkitOverflowScrolling: "touch",
                                },
                                // Large device styles
                                "@media (min-width: 900px)": {
                                  width: "100%",
                                  overflowX: "visible",
                                  display: "table",
                                },
                              }}
                            >
                              <Table
                                sx={{
                                  minWidth: 900,
                                  "@media (min-width: 900px)": {
                                    width: "100%",
                                    minWidth: "100%",
                                    tableLayout: { sm: "auto", md: "fixed", lg: "fixed" },
                                  },
                                }}
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell width="20%">ছাত্রের নাম</TableCell>
                                    <TableCell align="center" width="10%">
                                      উপস্থিতি
                                    </TableCell>
                                    <TableCell align="center" width="20%">

                                      <div className="flex gap-2 justify-center">
                                        <Tooltip title="Disable lesson evaluation">
                                          <FormControlLabel
                                            control={
                                              <Switch
                                                checked={lessonEvaluationTask}
                                                onChange={handleLessonEvaluationTaskChange}
                                                color="primary"
                                                disabled={noTaskForClass}
                                              />
                                            }
                                            label={
                                              <Typography variant="caption" sx={{ fontSize: 15 }}>
                                                পাঠ মূল্যায়ন
                                              </Typography>
                                            }
                                            labelPlacement="start"
                                          />
                                        </Tooltip>
                                      </div>
                                    </TableCell>

                                    <TableCell align="center" width="20%">
                                      <div className="flex gap-2 justify-center">
                                        <Tooltip title="Disable handwritten task">
                                          <FormControlLabel
                                            control={
                                              <Switch
                                                checked={handwrittenTask}
                                                onChange={handleHandwrittenTaskChange}
                                                color="primary"
                                                disabled={noTaskForClass}
                                              />
                                            }
                                            label={
                                              <Typography variant="caption" sx={{ fontSize: 15 }}>
                                                হাতের লিখা
                                              </Typography>
                                            }
                                            labelPlacement="start"
                                          />
                                        </Tooltip>
                                      </div>
                                    </TableCell>
                                    <TableCell align="center" width="10%">
                                      অভিভাবকের স্বাক্ষর
                                    </TableCell>
                                    <TableCell align="center" sx={{ minWidth: 200 }}>
                                      মন্তব্য
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

                                  {students.length > 0 ? (
                                    students.map((student: any) => {
                                      const evaluation = getStudentEvaluation(student._id)
                                      const isAbsent = evaluation.attendance !== "উপস্থিত"
                                      return (
                                        <TableRow key={student._id} sx={{ transition: "all 0.2s" }}>
                                          <TableCell component="th" scope="row">
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                              {student.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                              {student.studentId} • {student.className}, {student.section}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                            <Checkbox
                                              color="primary"
                                              checked={evaluation.attendance === "উপস্থিত"}
                                              onChange={(e) =>
                                                handleAttendanceChange(
                                                  student._id,
                                                  e.target.checked ? "উপস্থিত" : "অনুপস্থিত",
                                                )
                                              }
                                            />
                                          </TableCell>
                                          <TableCell align="center">
                                            <FormControl
                                              fullWidth
                                              sx={{ minWidth: { xs: 120, sm: 140, md: 160 } }}
                                              disabled={isAbsent || noTaskForClass || lessonEvaluationTask}
                                            >
                                              <InputLabel id={`lesson-label-${student._id}`}>
                                                Lesson Evaluation
                                              </InputLabel>
                                              <Select
                                                labelId={`lesson-label-${student._id}`}
                                                value={evaluation.lessonEvaluation}
                                                label="Lesson Evaluation"
                                                onChange={(e) =>
                                                  handleLessonEvaluationChange(student._id, e.target.value)
                                                }
                                              >
                                                {lessonEvaluation.map((item) => (
                                                  <MenuItem key={item} value={item}>
                                                    {item}
                                                  </MenuItem>
                                                ))}
                                              </Select>
                                            </FormControl>
                                          </TableCell>

                                          <TableCell align="center">
                                            <FormControl
                                              fullWidth
                                              sx={{ minWidth: { xs: 120, sm: 140, md: 160 } }}
                                              disabled={isAbsent || noTaskForClass || handwrittenTask}
                                            >
                                              <InputLabel id={`handwriting-label-${student._id}`}>
                                                Handwriting
                                              </InputLabel>
                                              <Select
                                                labelId={`handwriting-label-${student._id}`}
                                                value={evaluation.handwriting || "লিখেছে"}
                                                label="Handwriting"
                                                onChange={(e) => handleHandwritingChange(student._id, e.target.value)}
                                              >
                                                {handWritting.map((item) => (
                                                  <MenuItem key={item} value={item}>
                                                    {item}
                                                  </MenuItem>
                                                ))}
                                              </Select>
                                            </FormControl>
                                          </TableCell>

                                          <TableCell align="center">
                                            <Checkbox
                                              color="primary"
                                              checked={evaluation.parentSignature === true}
                                              onChange={(e) =>
                                                handleParentSignatureChange(student._id, e.target.checked)
                                              }
                                              disabled={
                                                isAbsent || noTaskForClass || (lessonEvaluationTask && handwrittenTask)
                                              }
                                            />
                                          </TableCell>
                                          <TableCell>
                                            <TextField
                                              fullWidth
                                              multiline
                                              minRows={1}
                                              label="মন্তব্য"
                                              placeholder="মন্তব্য"
                                              value={evaluation.comments || ""}
                                              onChange={(e) => handleCommentsChange(student._id, e.target.value)}
                                              disabled={isAbsent || noTaskForClass}
                                            />
                                          </TableCell>
                                        </TableRow>
                                      )
                                    })
                                  ) : (
                                    <TableRow>
                                      <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
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
                                </TableBody>
                              </Table>
                            </Box>
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

              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <Alert
                  onClose={handleSnackbarClose}
                  severity={snackbarSeverity}
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </CraftForm>
          </ThemeProvider>

          <TodayLesson
            id={todayLessonId}
            open={todayLessonDialogOpen}
            onClose={handleCloseTodayLessonDialog}
            onSave={handleSaveTodayLesson}
          />

          <TodayTask
            id={homeTaskId}
            open={todayTaskDialogOpen}
            onClose={handleCloseTodayTaskDialog}
            onSave={handleSaveTodayTask}
          />
        </>
      )}
    </>
  )
}
