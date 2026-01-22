/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Chip,
  IconButton,
  Dialog,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  CircularProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Zoom,
  Backdrop,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarMonth as CalendarIcon,
  ArrowBack as ArrowBackIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  AccessTime as AccessTimeIcon,
  Room as RoomIcon,
  Person as PersonIcon,
  Event as EventIcon,
  Subject as SubjectIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  borderRadius: 12,
  padding: "10px 20px",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
    transform: "translateY(-2px)",
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
}));

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

// Mock data for exam schedules
const mockSchedules = [
  {
    id: 1,
    examId: 5,
    class: "One",
    subject: "Quran Recitation",
    date: "2023-12-01",
    startTime: "09:00",
    endTime: "10:30",
    room: "Room 101",
    invigilator: "Maulana Yusuf",
  },
  {
    id: 2,
    examId: 5,
    class: "One",
    subject: "Islamic Studies",
    date: "2023-12-02",
    startTime: "09:00",
    endTime: "10:30",
    room: "Room 101",
    invigilator: "Maulana Ahmed",
  },
  {
    id: 3,
    examId: 5,
    class: "One",
    subject: "Mathematics",
    date: "2023-12-03",
    startTime: "09:00",
    endTime: "10:30",
    room: "Room 101",
    invigilator: "Mr. Ibrahim",
  },
  {
    id: 4,
    examId: 5,
    class: "One",
    subject: "Quran Recitation",
    date: "2023-12-01",
    startTime: "11:00",
    endTime: "12:30",
    room: "Room 102",
    invigilator: "Maulana Yusuf",
  },
  {
    id: 5,
    examId: 5,
    class: "One",
    subject: "Islamic Studies",
    date: "2023-12-02",
    startTime: "11:00",
    endTime: "12:30",
    room: "Room 102",
    invigilator: "Maulana Ahmed",
  },
  {
    id: 6,
    examId: 5,
    class: "Two",
    subject: "Arabic Language",
    date: "2023-12-04",
    startTime: "09:00",
    endTime: "10:30",
    room: "Room 103",
    invigilator: "Maulana Bilal",
  },
  {
    id: 7,
    examId: 5,
    class: "Hifz",
    subject: "Quran Memorization",
    date: "2023-12-05",
    startTime: "09:00",
    endTime: "12:00",
    room: "Hifz Hall",
    invigilator: "Hafiz Abdullah",
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

const ExamSchedulePage = () => {
  const theme = useTheme();
  const router = useRouter();
  const [exams, setExams] = useState(mockExams);
  const [schedules, setSchedules] = useState(mockSchedules);
  const [subjects, setSubjects] = useState(mockSubjects);
  const [selectedExam, setSelectedExam] = useState<any>(mockExams[4]);
  const [selectedClass, setSelectedClass] = useState<string>("All");
  const [openDialog, setOpenDialog] = useState(false);
  const [editSchedule, setEditSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Form state
  const [formData, setFormData] = useState({
    examId: selectedExam?.id || "",
    class: "",
    subject: "",
    date: "",
    startTime: "",
    endTime: "",
    room: "",
    invigilator: "",
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleExamChange = (event: React.SyntheticEvent, newValue: number) => {
    const exam = exams.find((e) => e.id === newValue);
    setSelectedExam(exam);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClass(event.target.value);
  };

  const handleOpenDialog = (schedule?: any) => {
    if (schedule) {
      setEditSchedule(schedule);
      setFormData({
        examId: schedule.examId,
        class: schedule.class,
        subject: schedule.subject,
        date: schedule.date,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        room: schedule.room,
        invigilator: schedule.invigilator,
      });
    } else {
      setEditSchedule(null);
      setFormData({
        examId: selectedExam?.id || "",
        class: "",
        subject: "",
        date: "",
        startTime: "",
        endTime: "",
        room: "",
        invigilator: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      if (editSchedule) {
        // Update existing schedule
        const updatedSchedules = schedules.map((schedule) =>
          schedule.id === editSchedule.id
            ? { ...schedule, ...formData }
            : schedule
        );
        setSchedules(updatedSchedules);
        setSnackbar({
          open: true,
          message: "Exam schedule updated successfully!",
          severity: "success",
        });
      } else {
        // Add new schedule
        const newSchedule = {
          id: schedules.length + 1,
          ...formData,
        };
        setSchedules([...schedules, newSchedule]);
        setSnackbar({
          open: true,
          message: "Exam schedule created successfully!",
          severity: "success",
        });
      }
      setLoading(false);
      handleCloseDialog();
    }, 1000);
  };

  const handleDelete = (id: number) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
    setSnackbar({
      open: true,
      message: "Exam schedule deleted successfully!",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.examId === selectedExam?.id &&
      (selectedClass === "All" || schedule.class === selectedClass)
  );

  // Group schedules by class
  const schedulesByClass = filteredSchedules.reduce((acc: any, schedule) => {
    if (!acc[schedule.class]) {
      acc[schedule.class] = [];
    }
    acc[schedule.class].push(schedule);
    return acc;
  }, {});

  // Group schedules by date for calendar view
  const schedulesByDate = filteredSchedules.reduce((acc: any, schedule) => {
    if (!acc[schedule.date]) {
      acc[schedule.date] = [];
    }
    acc[schedule.date].push(schedule);
    return acc;
  }, {});

  // Get unique dates
  const uniqueDates = Object.keys(schedulesByDate).sort();

  if (pageLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
        minHeight: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 4,
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => router.push("/dashboard/admin/exams")}
              sx={{
                mr: 2,
                bgcolor: "background.paper",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                "&:hover": {
                  bgcolor: "background.paper",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(90deg, #4F0187 0%, #7B1FA2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
              }}
            >
              Exam Schedule
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              sx={{
                borderRadius: 3,
                borderColor: "rgba(0,0,0,0.1)",
                color: "text.secondary",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "rgba(79, 1, 135, 0.04)",
                },
              }}
              onClick={() => window.print()}
            >
              Print
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{
                borderRadius: 3,
                borderColor: "rgba(0,0,0,0.1)",
                color: "text.secondary",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "rgba(79, 1, 135, 0.04)",
                },
              }}
              onClick={() =>
                alert("Download functionality will be implemented")
              }
            >
              Export
            </Button>
            <GradientButton
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Add Schedule
            </GradientButton>
          </Box>
        </Box>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <StyledPaper
          elevation={0}
          sx={{
            p: 0,
            borderRadius: 4,
            overflow: "hidden",
            mb: 4,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
              <Tabs
                value={selectedExam?.id}
                onChange={handleExamChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: theme.palette.primary.main,
                    height: 3,
                    borderRadius: 3,
                  },
                }}
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
                          py: 1,
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          {exam.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CalendarIcon
                            sx={{
                              fontSize: 16,
                              mr: 0.5,
                              color: "text.secondary",
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {exam.startDate} - {exam.endDate}
                          </Typography>
                          <Chip
                            label={exam.status}
                            size="small"
                            color={
                              exam.status === "Completed"
                                ? "success"
                                : "primary"
                            }
                            sx={{ ml: 1, height: 20, borderRadius: 3 }}
                          />
                        </Box>
                      </Box>
                    }
                    value={exam.id}
                    sx={{
                      textTransform: "none",
                      minHeight: 72,
                      py: 1,
                      px: 2,
                      "&.Mui-selected": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                ))}
              </Tabs>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <EventIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                {selectedExam?.name} Schedule
              </Typography>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="class-filter-label">Class Filter</InputLabel>
                <Select
                  labelId="class-filter-label"
                  value={selectedClass}
                  label="Class Filter"
                  size="small"
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="All">All Classes</MenuItem>
                  {availableClasses.map((cls) => (
                    <MenuItem key={cls} value={cls}>
                      {cls}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {Object.keys(schedulesByClass).length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8, px: 2 }}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: "rgba(79, 1, 135, 0.1)",
                      color: theme.palette.primary.main,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <CalendarIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    No schedules found
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, maxWidth: 500, mx: "auto" }}
                  >
                    No exam schedules have been created for this exam yet. Click
                    the button below to add your first schedule.
                  </Typography>
                  <GradientButton
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                  >
                    Add Schedule
                  </GradientButton>
                </motion.div>
              </Box>
            ) : (
              <Box sx={{ p: 2 }}>
                <Grid container spacing={4}>
                  {uniqueDates.map((date, index) => (
                    <Grid item xs={12} key={date}>
                      <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                      >
                        <Box
                          sx={{
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: theme.palette.primary.main,
                              width: 40,
                              height: 40,
                              mr: 2,
                            }}
                          >
                            <CalendarIcon />
                          </Avatar>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {date}
                          </Typography>
                        </Box>

                        <Grid container spacing={3}>
                          {schedulesByDate[date].map((schedule: any) => (
                            <Grid item xs={12} md={4} key={schedule.id}>
                              <Zoom
                                in={true}
                                style={{
                                  transitionDelay: `${index * 100 + 100}ms`,
                                }}
                              >
                                <StyledCard>
                                  <CardContent sx={{ p: 3 }}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        mb: 2,
                                      }}
                                    >
                                      <Box>
                                        <Chip
                                          label={schedule.class}
                                          color="primary"
                                          sx={{ borderRadius: 3, mb: 1 }}
                                        />
                                        <Typography
                                          variant="h6"
                                          sx={{ fontWeight: 600, mb: 0.5 }}
                                        >
                                          {schedule.subject}
                                        </Typography>
                                      </Box>
                                      <Box sx={{ display: "flex" }}>
                                        <IconButton
                                          size="small"
                                          onClick={() =>
                                            handleOpenDialog(schedule)
                                          }
                                          sx={{
                                            color: theme.palette.primary.main,
                                          }}
                                        >
                                          <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                          size="small"
                                          onClick={() =>
                                            handleDelete(schedule.id)
                                          }
                                          color="error"
                                        >
                                          <DeleteIcon fontSize="small" />
                                        </IconButton>
                                      </Box>
                                    </Box>

                                    <Divider sx={{ mb: 2 }} />

                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 1.5,
                                      }}
                                    >
                                      <AccessTimeIcon
                                        sx={{
                                          fontSize: 20,
                                          mr: 1.5,
                                          color: "text.secondary",
                                        }}
                                      />
                                      <Typography variant="body2">
                                        {schedule.startTime} -{" "}
                                        {schedule.endTime}
                                      </Typography>
                                    </Box>

                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 1.5,
                                      }}
                                    >
                                      <RoomIcon
                                        sx={{
                                          fontSize: 20,
                                          mr: 1.5,
                                          color: "text.secondary",
                                        }}
                                      />
                                      <Typography variant="body2">
                                        {schedule.room}
                                      </Typography>
                                    </Box>

                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <PersonIcon
                                        sx={{
                                          fontSize: 20,
                                          mr: 1.5,
                                          color: "text.secondary",
                                        }}
                                      />
                                      <Typography variant="body2">
                                        {schedule.invigilator}
                                      </Typography>
                                    </Box>
                                  </CardContent>
                                </StyledCard>
                              </Zoom>
                            </Grid>
                          ))}
                        </Grid>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </StyledPaper>
      </motion.div>

      {/* Create/Edit Schedule Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        TransitionComponent={Zoom}
      ></Dialog>
    </Box>
  );
};

export default ExamSchedulePage;
