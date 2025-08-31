/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
} from "@mui/material"
import {
  ArrowBack as ArrowBackIcon,
  Print as PrintIcon,
  Search as SearchIcon,
  Assessment as AssessmentIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
} from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { useRouter } from "next/navigation"

// Mock data for exams
const mockExams = [
  {
    id: 1,
    name: "First Term Examination",
    examType: "Term",
    startDate: "2023-04-10",
    endDate: "2023-04-20",
    status: "Completed",
  },
  {
    id: 2,
    name: "Hifz Quarterly Assessment",
    examType: "Assessment",
    startDate: "2023-06-15",
    endDate: "2023-06-18",
    status: "Completed",
  },
  {
    id: 3,
    name: "Mid-Term Examination",
    examType: "Term",
    startDate: "2023-07-20",
    endDate: "2023-07-30",
    status: "Completed",
  },
  {
    id: 4,
    name: "Nazera Recitation Test",
    examType: "Assessment",
    startDate: "2023-09-05",
    endDate: "2023-09-07",
    status: "Completed",
  },
  {
    id: 5,
    name: "Final Term Examination",
    examType: "Term",
    startDate: "2023-12-01",
    endDate: "2023-12-15",
    status: "Upcoming",
  },
]

// Mock data for subjects
const mockSubjects = [
  { id: 1, name: "Quran Recitation", code: "QR101", fullMarks: 100, passMarks: 40 },
  { id: 2, name: "Islamic Studies", code: "IS101", fullMarks: 100, passMarks: 40 },
  { id: 3, name: "Arabic Language", code: "AL101", fullMarks: 100, passMarks: 40 },
  { id: 4, name: "Mathematics", code: "MATH101", fullMarks: 100, passMarks: 40 },
  { id: 5, name: "Science", code: "SCI101", fullMarks: 100, passMarks: 40 },
  { id: 6, name: "English", code: "ENG101", fullMarks: 100, passMarks: 40 },
  { id: 7, name: "Urdu", code: "URD101", fullMarks: 100, passMarks: 40 },
  { id: 8, name: "Social Studies", code: "SS101", fullMarks: 100, passMarks: 40 },
  { id: 9, name: "Computer", code: "COMP101", fullMarks: 100, passMarks: 40 },
  { id: 10, name: "Art", code: "ART101", fullMarks: 50, passMarks: 20 },
]

// Mock data for students
const mockStudents = [
  {
    id: 1,
    rollNo: "001",
    name: "Ahmed Ali",
    class: "One A",
    photo: "/placeholder.svg?height=100&width=100",
    results: {
      1: {
        // Exam ID 1 (First Term)
        "Quran Recitation": { marks: 85, grade: "A", remarks: "Excellent" },
        "Islamic Studies": { marks: 78, grade: "B+", remarks: "Good" },
        "Arabic Language": { marks: 72, grade: "B", remarks: "Good" },
        Mathematics: { marks: 90, grade: "A+", remarks: "Excellent" },
        Science: { marks: 82, grade: "A", remarks: "Very Good" },
        English: { marks: 75, grade: "B+", remarks: "Good" },
        Urdu: { marks: 80, grade: "A", remarks: "Very Good" },
        "Social Studies": { marks: 70, grade: "B", remarks: "Good" },
        Computer: { marks: 88, grade: "A", remarks: "Very Good" },
        Art: { marks: 45, grade: "A", remarks: "Very Good" },
      },
      3: {
        // Exam ID 3 (Mid-Term)
        "Quran Recitation": { marks: 88, grade: "A", remarks: "Very Good" },
        "Islamic Studies": { marks: 82, grade: "A", remarks: "Very Good" },
        "Arabic Language": { marks: 75, grade: "B+", remarks: "Good" },
        Mathematics: { marks: 92, grade: "A+", remarks: "Excellent" },
        Science: { marks: 85, grade: "A", remarks: "Very Good" },
        English: { marks: 78, grade: "B+", remarks: "Good" },
        Urdu: { marks: 83, grade: "A", remarks: "Very Good" },
        "Social Studies": { marks: 76, grade: "B+", remarks: "Good" },
        Computer: { marks: 90, grade: "A+", remarks: "Excellent" },
        Art: { marks: 48, grade: "A+", remarks: "Excellent" },
      },
    },
  },
  {
    id: 2,
    rollNo: "002",
    name: "Fatima Khan",
    class: "One A",
    photo: "/placeholder.svg?height=100&width=100",
    results: {
      1: {
        // Exam ID 1 (First Term)
        "Quran Recitation": { marks: 90, grade: "A+", remarks: "Excellent" },
        "Islamic Studies": { marks: 85, grade: "A", remarks: "Very Good" },
        "Arabic Language": { marks: 80, grade: "A", remarks: "Very Good" },
        Mathematics: { marks: 75, grade: "B+", remarks: "Good" },
        Science: { marks: 78, grade: "B+", remarks: "Good" },
        English: { marks: 82, grade: "A", remarks: "Very Good" },
        Urdu: { marks: 88, grade: "A", remarks: "Very Good" },
        "Social Studies": { marks: 76, grade: "B+", remarks: "Good" },
        Computer: { marks: 85, grade: "A", remarks: "Very Good" },
        Art: { marks: 42, grade: "A", remarks: "Very Good" },
      },
      3: {
        // Exam ID 3 (Mid-Term)
        "Quran Recitation": { marks: 92, grade: "A+", remarks: "Excellent" },
        "Islamic Studies": { marks: 88, grade: "A", remarks: "Very Good" },
        "Arabic Language": { marks: 83, grade: "A", remarks: "Very Good" },
        Mathematics: { marks: 78, grade: "B+", remarks: "Good" },
        Science: { marks: 80, grade: "A", remarks: "Very Good" },
        English: { marks: 85, grade: "A", remarks: "Very Good" },
        Urdu: { marks: 90, grade: "A+", remarks: "Excellent" },
        "Social Studies": { marks: 79, grade: "B+", remarks: "Good" },
        Computer: { marks: 87, grade: "A", remarks: "Very Good" },
        Art: { marks: 45, grade: "A", remarks: "Very Good" },
      },
    },
  },
  {
    id: 3,
    rollNo: "003",
    name: "Muhammad Usman",
    class: "One A",
    photo: "/placeholder.svg?height=100&width=100",
    results: {
      1: {
        // Exam ID 1 (First Term)
        "Quran Recitation": { marks: 75, grade: "B+", remarks: "Good" },
        "Islamic Studies": { marks: 70, grade: "B", remarks: "Good" },
        "Arabic Language": { marks: 65, grade: "B", remarks: "Satisfactory" },
        Mathematics: { marks: 95, grade: "A+", remarks: "Excellent" },
        Science: { marks: 88, grade: "A", remarks: "Very Good" },
        English: { marks: 80, grade: "A", remarks: "Very Good" },
        Urdu: { marks: 72, grade: "B", remarks: "Good" },
        "Social Studies": { marks: 68, grade: "B", remarks: "Satisfactory" },
        Computer: { marks: 92, grade: "A+", remarks: "Excellent" },
        Art: { marks: 40, grade: "A", remarks: "Very Good" },
      },
      3: {
        // Exam ID 3 (Mid-Term)
        "Quran Recitation": { marks: 78, grade: "B+", remarks: "Good" },
        "Islamic Studies": { marks: 73, grade: "B", remarks: "Good" },
        "Arabic Language": { marks: 68, grade: "B", remarks: "Satisfactory" },
        Mathematics: { marks: 97, grade: "A+", remarks: "Excellent" },
        Science: { marks: 90, grade: "A+", remarks: "Excellent" },
        English: { marks: 83, grade: "A", remarks: "Very Good" },
        Urdu: { marks: 75, grade: "B+", remarks: "Good" },
        "Social Studies": { marks: 70, grade: "B", remarks: "Good" },
        Computer: { marks: 95, grade: "A+", remarks: "Excellent" },
        Art: { marks: 43, grade: "A", remarks: "Very Good" },
      },
    },
  },
]

// Available classes
const availableClasses = ["Hifz", "One A", "One B", "Nazera", "Two", "Three", "Four", "Five", "Six"]

const ExamResultsPage = () => {
  const theme = useTheme()
  const router = useRouter()
  const [exams, setExams] = useState(mockExams)
  const [students, setStudents] = useState(mockStudents)
  const [subjects, setSubjects] = useState(mockSubjects)
  const [selectedExam, setSelectedExam] = useState<any>(mockExams[0]) // Default to the first exam
  const [selectedClass, setSelectedClass] = useState<string>("One A")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [openStudentDialog, setOpenStudentDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })

  // Form state for marks
  const [marksFormData, setMarksFormData] = useState<any>({})

  const handleExamChange = (event: React.SyntheticEvent, newValue: number) => {
    const exam = exams.find((e) => e.id === newValue)
    setSelectedExam(exam)
  }

  const handleClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClass(event.target.value)
  }

  const handleOpenDialog = (student?: any) => {
    if (student) {
      setSelectedStudent(student)

      // Initialize form data with current marks
      const initialMarks: any = {}
      subjects.forEach((subject) => {
        const result = student.results[selectedExam.id]?.[subject.name]
        initialMarks[subject.name] = result ? result.marks : ""
      })

      setMarksFormData(initialMarks)
    } else {
      setSelectedStudent(null)
      setMarksFormData({})
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleOpenStudentDialog = (student: any) => {
    setSelectedStudent(student)
    setOpenStudentDialog(true)
  }

  const handleCloseStudentDialog = () => {
    setOpenStudentDialog(false)
  }

  const handleMarksChange = (e: React.ChangeEvent<HTMLInputElement>, subject: string) => {
    const { value } = e.target
    setMarksFormData({
      ...marksFormData,
      [subject]: value,
    })
  }

  const handleSubmitMarks = () => {
    setLoading(true)
    setTimeout(() => {
      // Update student results
      const updatedStudents = students.map((student) => {
        if (student.id === selectedStudent.id) {
          // Create a new results object if it doesn't exist
          // const currentResults = student.results[selectedExam.id] || {}
          const newResults: any = {}

          // Update marks and calculate grades for each subject
          Object.keys(marksFormData).forEach((subject) => {
            const subjectInfo = subjects.find((s) => s.name === subject)
            const marks = Number(marksFormData[subject])

            let grade = "F"
            let remarks = "Fail"

            if (marks >= 90) {
              grade = "A+"
              remarks = "Excellent"
            } else if (marks >= 80) {
              grade = "A"
              remarks = "Very Good"
            } else if (marks >= 70) {
              grade = "B+"
              remarks = "Good"
            } else if (marks >= 60) {
              grade = "B"
              remarks = "Satisfactory"
            } else if (marks >= 50) {
              grade = "C"
              remarks = "Average"
            } else if (marks >= 40) {
              grade = "D"
              remarks = "Below Average"
            }

            newResults[subject] = {
              marks,
              grade,
              remarks,
            }
          })

          return {
            ...student,
            results: {
              ...student.results,
              [selectedExam.id]: {
                // ...currentResults,
                ...newResults,
              },
            },
          }
        }
        return student
      })

      setStudents(updatedStudents)
      setSnackbar({
        open: true,
        message: "Marks updated successfully!",
        severity: "success",
      })
      setLoading(false)
      handleCloseDialog()
    }, 1000)
  }

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }

  const filteredStudents = students.filter((student) => student.class === selectedClass)

  // Calculate student statistics
  const calculateStats = (student: any) => {
    if (!student.results[selectedExam.id]) return { total: 0, obtained: 0, percentage: 0, grade: "N/A" }

    const results = student.results[selectedExam.id]
    let totalMarks = 0
    let obtainedMarks = 0
    let subjectCount = 0

    subjects.forEach((subject) => {
      if (results[subject.name]) {
        totalMarks += subject.fullMarks
        obtainedMarks += results[subject.name].marks
        subjectCount++
      }
    })

    const percentage = subjectCount > 0 ? (obtainedMarks / totalMarks) * 100 : 0

    let grade = "F"
    if (percentage >= 90) grade = "A+"
    else if (percentage >= 80) grade = "A"
    else if (percentage >= 70) grade = "B+"
    else if (percentage >= 60) grade = "B"
    else if (percentage >= 50) grade = "C"
    else if (percentage >= 40) grade = "D"

    return {
      total: totalMarks,
      obtained: obtainedMarks,
      percentage: percentage.toFixed(2),
      grade,
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4, alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => router.push("/dashboard/admin/exams")} sx={{ mr: 2, bgcolor: "rgba(0,0,0,0.04)" }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Exam Results
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<PrintIcon />} sx={{ borderRadius: 2 }} onClick={() => window.print()}>
            Print
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ borderRadius: 2 }}
            onClick={() => alert("Download functionality will be implemented")}
          >
            Export
          </Button>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          mb: 4,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={selectedExam?.id}
            onChange={handleExamChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {exams.map((exam) => (
              <Tab
                key={exam.id}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {exam.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        {exam.startDate} - {exam.endDate}
                      </Typography>
                      <Chip
                        label={exam.status}
                        size="small"
                        color={exam.status === "Completed" ? "success" : "primary"}
                        sx={{ ml: 1, height: 20 }}
                      />
                    </Box>
                  </Box>
                }
                value={exam.id}
                sx={{ textTransform: "none", minHeight: 72, py: 1 }}
              />
            ))}
          </Tabs>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="class-select-label">Class</InputLabel>
              <Select labelId="class-select-label" value={selectedClass} label="Class">
                {availableClasses.map((cls) => (
                  <MenuItem key={cls} value={cls}>
                    {cls}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <TextField
                placeholder="Search student..."
                size="small"
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />,
                }}
                sx={{ width: 250 }}
              />
            </Box>
          </Grid>
        </Grid>

        {filteredStudents.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 5 }}>
            <SearchIcon sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No students found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No students found for the selected class.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredStudents.map((student) => {
              const stats = calculateStats(student)
              return (
                <Grid item xs={12} md={4} key={student.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar src={student.photo} alt={student.name} sx={{ width: 60, height: 60, mr: 2 }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {student.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Roll No: {student.rollNo} | Class: {student.class}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ mb: 2 }} />

                      <Grid container spacing={1} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Total Marks:
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {stats.obtained} / {stats.total}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Percentage:
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {stats.percentage}%
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Grade:
                          </Typography>
                          <Chip
                            label={stats.grade}
                            size="small"
                            color={
                              stats.grade === "A+" || stats.grade === "A"
                                ? "success"
                                : stats.grade === "F"
                                  ? "error"
                                  : "default"
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Status:
                          </Typography>
                          <Chip
                            label={Number(stats.percentage) >= 40 ? "Pass" : "Fail"}
                            size="small"
                            color={Number(stats.percentage) >= 40 ? "success" : "error"}
                          />
                        </Grid>
                      </Grid>

                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<AssessmentIcon />}
                          onClick={() => handleOpenStudentDialog(student)}
                          sx={{ borderRadius: 2 }}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleOpenDialog(student)}
                          sx={{ borderRadius: 2 }}
                        >
                          Edit Marks
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        )}
      </Paper>

      {/* Edit Marks Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Edit Marks for {selectedStudent?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedExam?.name} | Class: {selectedStudent?.class}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Full Marks</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Pass Marks</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Obtained Marks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>{subject.fullMarks}</TableCell>
                    <TableCell>{subject.passMarks}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={marksFormData[subject.name] || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMarksChange(e, subject.name)}
                        inputProps={{ min: 0, max: subject.fullMarks }}
                        sx={{ width: 100 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitMarks}
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? "Saving..." : "Save Marks"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Student Result Details Dialog */}
      <Dialog open={openStudentDialog} onClose={handleCloseStudentDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={selectedStudent?.photo} alt={selectedStudent?.name} sx={{ width: 50, height: 50, mr: 2 }} />
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                {selectedStudent?.name} - Result Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedExam?.name} | Class: {selectedStudent?.class} | Roll No: {selectedStudent?.rollNo}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          {selectedStudent && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                  p: 2,
                  bgcolor: "primary.light",
                  borderRadius: 2,
                }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Exam Date
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedExam?.startDate} to {selectedExam?.endDate}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Result Status
                  </Typography>
                  <Chip
                    label={Number(calculateStats(selectedStudent).percentage) >= 40 ? "Pass" : "Fail"}
                    size="small"
                    color={Number(calculateStats(selectedStudent).percentage) >= 40 ? "success" : "error"}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Overall Grade
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {calculateStats(selectedStudent).grade}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Percentage
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {calculateStats(selectedStudent).percentage}%
                  </Typography>
                </Box>
              </Box>

              <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, mb: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Full Marks</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Pass Marks</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Obtained Marks</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Grade</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Remarks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subjects.map((subject) => {
                      const result = selectedStudent.results[selectedExam.id]?.[subject.name] || {
                        marks: "-",
                        grade: "-",
                        remarks: "-",
                      }
                      return (
                        <TableRow key={subject.id}>
                          <TableCell>{subject.name}</TableCell>
                          <TableCell>{subject.fullMarks}</TableCell>
                          <TableCell>{subject.passMarks}</TableCell>
                          <TableCell>{result.marks}</TableCell>
                          <TableCell>
                            <Chip
                              label={result.grade}
                              size="small"
                              color={
                                result.grade === "A+" || result.grade === "A"
                                  ? "success"
                                  : result.grade === "F"
                                    ? "error"
                                    : "default"
                              }
                            />
                          </TableCell>
                          <TableCell>{result.remarks}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Marks
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {calculateStats(selectedStudent).obtained} / {calculateStats(selectedStudent).total}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body2" color="text.secondary">
                    Teacher's Remarks
                  </Typography>
                  <Typography variant="body1">
                    {Number(calculateStats(selectedStudent).percentage) >= 80
                      ? "Excellent performance! Keep up the good work."
                      : Number(calculateStats(selectedStudent).percentage) >= 60
                        ? "Good performance. Continue to work hard."
                        : Number(calculateStats(selectedStudent).percentage) >= 40
                          ? "Satisfactory performance. Need to improve in some subjects."
                          : "Needs significant improvement. Please focus on studies."}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => window.print()} variant="outlined" startIcon={<PrintIcon />} sx={{ mr: "auto" }}>
            Print Result
          </Button>
          <Button onClick={handleCloseStudentDialog} variant="outlined" color="inherit">
            Close
          </Button>
          <Button
            onClick={() => {
              handleCloseStudentDialog()
              handleOpenDialog(selectedStudent)
            }}
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
          >
            Edit Marks
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ExamResultsPage
