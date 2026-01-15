/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Print as PrintIcon,
  Save as SaveIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

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
];

// Mock data for subjects
const mockSubjects = [
  { id: 1, name: "Quran Recitation", code: "QR101" },
  { id: 2, name: "Islamic Studies", code: "IS101" },
  { id: 3, name: "Arabic Language", code: "AL101" },
  { id: 4, name: "Mathematics", code: "MATH101" },
  { id: 5, name: "Science", code: "SCI101" },
  { id: 6, name: "English", code: "ENG101" },
  { id: 7, name: "Urdu", code: "URD101" },
  { id: 8, name: "Social Studies", code: "SS101" },
  { id: 9, name: "Computer", code: "COMP101" },
  { id: 10, name: "Art", code: "ART101" },
];

// Types for attendance and students
type AttendanceRecord = {
  status: string;
  remarks: string;
};

type Attendance = {
  [date: string]: AttendanceRecord;
};

type Student = {
  id: number;
  rollNo: string;
  name: string;
  class: string;
  attendance: Attendance;
};

// Mock data for students
const mockStudents: Student[] = [
  {
    id: 1,
    rollNo: "001",
    name: "Ahmed Ali",
    class: "One",
    attendance: {
      "2023-12-01": { status: "present", remarks: "" },
      "2023-12-02": { status: "present", remarks: "" },
      "2023-12-03": { status: "absent", remarks: "Sick leave" },
      "2023-12-04": { status: "present", remarks: "" },
      "2023-12-05": { status: "present", remarks: "" },
    },
  },
  {
    id: 2,
    rollNo: "002",
    name: "Fatima Khan",
    class: "One",
    attendance: {
      "2023-12-01": { status: "present", remarks: "" },
      "2023-12-02": { status: "present", remarks: "" },
      "2023-12-03": { status: "present", remarks: "" },
      "2023-12-04": { status: "present", remarks: "" },
      "2023-12-05": { status: "absent", remarks: "Family emergency" },
    },
  },
  {
    id: 3,
    rollNo: "003",
    name: "Muhammad Usman",
    class: "One",
    attendance: {
      "2023-12-01": { status: "present", remarks: "" },
      "2023-12-02": { status: "absent", remarks: "Medical appointment" },
      "2023-12-03": { status: "present", remarks: "" },
      "2023-12-04": { status: "present", remarks: "" },
      "2023-12-05": { status: "present", remarks: "" },
    },
  },
  {
    id: 4,
    rollNo: "004",
    name: "Aisha Malik",
    class: "One",
    attendance: {
      "2023-12-01": { status: "present", remarks: "" },
      "2023-12-02": { status: "present", remarks: "" },
      "2023-12-03": { status: "present", remarks: "" },
      "2023-12-04": { status: "present", remarks: "" },
      "2023-12-05": { status: "present", remarks: "" },
    },
  },
  {
    id: 5,
    rollNo: "005",
    name: "Bilal Ahmed",
    class: "One",
    attendance: {
      "2023-12-01": { status: "absent", remarks: "Sick leave" },
      "2023-12-02": { status: "absent", remarks: "Sick leave" },
      "2023-12-03": { status: "present", remarks: "" },
      "2023-12-04": { status: "present", remarks: "" },
      "2023-12-05": { status: "present", remarks: "" },
    },
  },
];

// Available classes
const availableClasses = [
  "Hifz",
  "One",
  "One",
  "Nazera",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
];

// Mock exam dates
const mockExamDates = [
  "2023-12-01",
  "2023-12-02",
  "2023-12-03",
  "2023-12-04",
  "2023-12-05",
];

const ExamAttendancePage = () => {
  const theme = useTheme();
  const router = useRouter();
  const [exams, setExams] = useState(mockExams);
  const [students, setStudents] = useState(mockStudents);
  const [subjects, setSubjects] = useState(mockSubjects);
  const [selectedExam, setSelectedExam] = useState<any>(mockExams[4]); // Default to the upcoming exam
  const [selectedClass, setSelectedClass] = useState<string>("One");
  const [selectedDate, setSelectedDate] = useState<string>(mockExamDates[0]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [openRemarkDialog, setOpenRemarkDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [remarkText, setRemarkText] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleExamChange = (event: React.SyntheticEvent, newValue: number) => {
    const exam = exams.find((e) => e.id === newValue);
    setSelectedExam(exam);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClass(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSubject(event.target.value);
  };

  const handleAttendanceChange = (
    studentId: number,
    status: "present" | "absent"
  ) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return {
          ...student,
          attendance: {
            ...student.attendance,
            [selectedDate]: {
              ...student.attendance[selectedDate],
              status,
            },
          },
        };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const handleOpenRemarkDialog = (student: any) => {
    setSelectedStudent(student);
    setRemarkText(student.attendance[selectedDate]?.remarks || "");
    setOpenRemarkDialog(true);
  };

  const handleCloseRemarkDialog = () => {
    setOpenRemarkDialog(false);
  };

  const handleSaveRemark = () => {
    if (!selectedStudent) return;

    const updatedStudents = students.map((student) => {
      if (student.id === selectedStudent.id) {
        return {
          ...student,
          attendance: {
            ...student.attendance,
            [selectedDate]: {
              ...student.attendance[selectedDate],
              remarks: remarkText,
            },
          },
        };
      }
      return student;
    });
    setStudents(updatedStudents);
    setSnackbar({
      open: true,
      message: "Remark saved successfully!",
      severity: "success",
    });
    handleCloseRemarkDialog();
  };

  const handleSaveAll = () => {
    setLoading(true);
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: "Attendance saved successfully!",
        severity: "success",
      });
      setLoading(false);
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const filteredStudents = students.filter(
    (student) => student.class === selectedClass
  );

  // Calculate attendance statistics
  const attendanceStats = {
    total: filteredStudents.length,
    present: filteredStudents.filter(
      (student) => student.attendance[selectedDate]?.status === "present"
    ).length,
    absent: filteredStudents.filter(
      (student) => student.attendance[selectedDate]?.status === "absent"
    ).length,
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => router.push("/dashboard/admin/exams")}
            sx={{ mr: 2, bgcolor: "rgba(0,0,0,0.04)" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Exam Attendance
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            sx={{ borderRadius: 2 }}
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSaveAll}
            disabled={loading}
            sx={{
              bgcolor: theme.palette.primary.main,
              borderRadius: 2,
              boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)",
            }}
          >
            {loading ? "Saving..." : "Save All"}
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {exam.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {exam.startDate} - {exam.endDate}
                      </Typography>
                      <Chip
                        label={exam.status}
                        size="small"
                        color={
                          exam.status === "Completed" ? "success" : "primary"
                        }
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="class-select-label">Class</InputLabel>
              <Select
                labelId="class-select-label"
                value={selectedClass}
                label="Class"
              >
                {availableClasses.map((cls) => (
                  <MenuItem key={cls} value={cls}>
                    {cls}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="date-select-label">Date</InputLabel>
              <Select
                labelId="date-select-label"
                value={selectedDate}
                label="Date"
              >
                {mockExamDates.map((date) => (
                  <MenuItem key={date} value={date}>
                    {date}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="subject-select-label">Subject</InputLabel>
              <Select
                labelId="subject-select-label"
                value={selectedSubject}
                label="Subject"
              >
                <MenuItem value="">All Subjects</MenuItem>
                {subjects.map((subject) => (
                  <MenuItem key={subject.id} value={subject.name}>
                    {subject.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                p: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {attendanceStats.total}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="success.main">
                  Present
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "success.main" }}
                >
                  {attendanceStats.present}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="error.main">
                  Absent
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "error.main" }}
                >
                  {attendanceStats.absent}
                </Typography>
              </Box>
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
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ borderRadius: 2 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Roll No</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Student Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Present</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Absent</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={
                          student.attendance[selectedDate]?.status === "present"
                        }
                        onChange={() =>
                          handleAttendanceChange(student.id, "present")
                        }
                        icon={<CheckCircleIcon />}
                        checkedIcon={<CheckCircleIcon />}
                        sx={{
                          color: "text.disabled",
                          "&.Mui-checked": {
                            color: "success.main",
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={
                          student.attendance[selectedDate]?.status === "absent"
                        }
                        onChange={() =>
                          handleAttendanceChange(student.id, "absent")
                        }
                        icon={<CancelIcon />}
                        checkedIcon={<CancelIcon />}
                        sx={{
                          color: "text.disabled",
                          "&.Mui-checked": {
                            color: "error.main",
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {student.attendance[selectedDate]?.remarks ? (
                          <Chip
                            label={student.attendance[selectedDate]?.remarks}
                            size="small"
                            color="default"
                            sx={{ mr: 1 }}
                          />
                        ) : null}
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleOpenRemarkDialog(student)}
                        >
                          {student.attendance[selectedDate]?.remarks
                            ? "Edit"
                            : "Add"}{" "}
                          Remark
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Remark Dialog */}
      <Dialog
        open={openRemarkDialog}
        onClose={handleCloseRemarkDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Add Remark for {selectedStudent?.name}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Remark"
            multiline
            rows={3}
            value={remarkText}
            onChange={(e) => setRemarkText(e.target.value)}
            placeholder="Enter reason for absence or any other remarks"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleCloseRemarkDialog}
            variant="outlined"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveRemark}
            variant="contained"
            color="primary"
          >
            Save Remark
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
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ExamAttendancePage;
