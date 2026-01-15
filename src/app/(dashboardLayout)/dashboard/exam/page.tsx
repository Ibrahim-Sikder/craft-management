"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Tooltip,
  Alert,
  Snackbar,
  CircularProgress,
  Zoom,
  Fade,
  useMediaQuery,
  Backdrop,
  Avatar,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarMonth as CalendarIcon,
  Assessment as AssessmentIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
} from "@mui/icons-material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { motion } from "framer-motion";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  height: "100%",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(10px)",
  borderRadius: 16,
  border: "1px solid rgba(255, 255, 255, 0.18)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
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
    classes: ["One", "One", "Two", "Three", "Four", "Five", "Six"],
  },
  {
    id: 2,
    name: "Hifz Quarterly Assessment",
    examType: "Assessment",
    startDate: "2023-06-15",
    endDate: "2023-06-18",
    status: "Completed",
    classes: ["Hifz"],
  },
  {
    id: 3,
    name: "Mid-Term Examination",
    examType: "Term",
    startDate: "2023-07-20",
    endDate: "2023-07-30",
    status: "Completed",
    classes: ["One", "One", "Two", "Three", "Four", "Five", "Six"],
  },
  {
    id: 4,
    name: "Nazera Recitation Test",
    examType: "Assessment",
    startDate: "2023-09-05",
    endDate: "2023-09-07",
    status: "Completed",
    classes: ["Nazera"],
  },
  {
    id: 5,
    name: "Final Term Examination",
    examType: "Term",
    startDate: "2023-12-01",
    endDate: "2023-12-15",
    status: "Upcoming",
    classes: [
      "One",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Hifz",
      "Nazera",
    ],
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

// Exam types
const examTypes = ["Term", "Assessment", "Quiz", "Monthly Test", "Special"];

const ExamsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [exams, setExams] = useState(mockExams);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    examType: "",
    startDate: "",
    endDate: "",
    classes: [] as string[],
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

  const handleOpenDialog = (exam?: any) => {
    if (exam) {
      setSelectedExam(exam);
      setFormData({
        name: exam.name,
        examType: exam.examType,
        startDate: exam.startDate,
        endDate: exam.endDate,
        classes: exam.classes,
      });
    } else {
      setSelectedExam(null);
      setFormData({
        name: "",
        examType: "",
        startDate: "",
        endDate: "",
        classes: [],
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
      if (selectedExam) {
        // Update existing exam
        const updatedExams = exams.map((exam) =>
          exam.id === selectedExam.id
            ? {
                ...exam,
                ...formData,
                status:
                  new Date(formData.endDate) < new Date()
                    ? "Completed"
                    : "Upcoming",
              }
            : exam
        );
        setExams(updatedExams);
        setSnackbar({
          open: true,
          message: "Exam updated successfully!",
          severity: "success",
        });
      } else {
        // Add new exam
        const newExam = {
          id: exams.length + 1,
          ...formData,
          status:
            new Date(formData.endDate) < new Date() ? "Completed" : "Upcoming",
        };
        setExams([...exams, newExam]);
        setSnackbar({
          open: true,
          message: "Exam created successfully!",
          severity: "success",
        });
      }
      setLoading(false);
      handleCloseDialog();
    }, 1000);
  };

  const handleDelete = (id: number) => {
    setExams(exams.filter((exam) => exam.id !== id));
    setSnackbar({
      open: true,
      message: "Exam deleted successfully!",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredExams = exams.filter(
    (exam) =>
      exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.examType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Exam Name", width: 250 },
    { field: "examType", headerName: "Type", width: 130 },
    { field: "startDate", headerName: "Start Date", width: 130 },
    { field: "endDate", headerName: "End Date", width: 130 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Completed" ? "success" : "primary"}
          size="small"
          sx={{ borderRadius: 6, fontWeight: 500 }}
        />
      ),
    },
    {
      field: "classes",
      headerName: "Classes",
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {params.value.slice(0, 3).map((cls: string) => (
            <Chip
              key={cls}
              label={cls}
              size="small"
              variant="outlined"
              sx={{ borderRadius: 6 }}
            />
          ))}
          {params.value.length > 3 && (
            <Tooltip title={params.value.slice(3).join(", ")}>
              <Chip
                label={`+${params.value.length - 3}`}
                size="small"
                sx={{ borderRadius: 6 }}
              />
            </Tooltip>
          )}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => handleOpenDialog(params.row)}
              size="small"
              sx={{ color: theme.palette.primary.main }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleDelete(params.row.id)}
              size="small"
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // Simulated loading effect
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
            Exam Management
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              placeholder="Search exams..."
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <SearchIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                ),
                sx: {
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                },
              }}
              sx={{ width: { xs: "100%", sm: 200 } }}
            />
            <Tooltip title="Refresh">
              <IconButton
                onClick={handleRefresh}
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <RefreshIcon
                  sx={{
                    animation: refreshing ? "spin 1s linear infinite" : "none",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title={viewMode === "grid" ? "List View" : "Grid View"}>
              <IconButton
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                {viewMode === "grid" ? <ViewListIcon /> : <ViewModuleIcon />}
              </IconButton>
            </Tooltip>
            <GradientButton
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{
                px: 3,
                py: 1,
                fontWeight: 600,
              }}
            >
              Create Exam
            </GradientButton>
          </Box>
        </Box>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <motion.div variants={itemVariants}>
              <StyledCard
                sx={{
                  background:
                    "linear-gradient(135deg, #4F0187 0%, #7B1FA2 100%)",
                  color: "white",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        width: 56,
                        height: 56,
                        mr: 2,
                        p: 1,
                      }}
                    >
                      <CalendarIcon sx={{ fontSize: 30 }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: 700, mb: 0.5 }}
                      >
                        Exam Schedule
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Manage all exam schedules
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 2 }} />
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, fontWeight: 300, lineHeight: 1.6 }}
                  >
                    Create and manage detailed exam schedules for different
                    classes with subjects, times, and venues.
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    href="/dashboard/admin/exams/schedule"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.15)",
                      color: "white",
                      borderRadius: 3,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.25)",
                      },
                    }}
                  >
                    View Schedules
                  </Button>
                </CardActions>
              </StyledCard>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={3}>
            <motion.div variants={itemVariants}>
              <StyledCard
                sx={{
                  background:
                    "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)",
                  color: "white",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        width: 56,
                        height: 56,
                        mr: 2,
                        p: 1,
                      }}
                    >
                      <AssessmentIcon sx={{ fontSize: 30 }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: 700, mb: 0.5 }}
                      >
                        Results
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Manage exam results
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 2 }} />
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, fontWeight: 300, lineHeight: 1.6 }}
                  >
                    Record and analyze student performance with detailed reports
                    and customizable result cards.
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    href="/dashboard/admin/exams/results"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.15)",
                      color: "white",
                      borderRadius: 3,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.25)",
                      },
                    }}
                  >
                    Manage Results
                  </Button>
                </CardActions>
              </StyledCard>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={3}>
            <motion.div variants={itemVariants}>
              <StyledCard
                sx={{
                  background:
                    "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)",
                  color: "white",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        width: 56,
                        height: 56,
                        mr: 2,
                        p: 1,
                      }}
                    >
                      <SchoolIcon sx={{ fontSize: 30 }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: 700, mb: 0.5 }}
                      >
                        Grading
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Configure grading systems
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 2 }} />
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, fontWeight: 300, lineHeight: 1.6 }}
                  >
                    Create custom grading systems for different classes with
                    flexible grade ranges and remarks.
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    href="/dashboard/admin/exams/grading"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.15)",
                      color: "white",
                      borderRadius: 3,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.25)",
                      },
                    }}
                  >
                    Manage Grades
                  </Button>
                </CardActions>
              </StyledCard>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={3}>
            <motion.div variants={itemVariants}>
              <StyledCard
                sx={{
                  background:
                    "linear-gradient(135deg, #6441A5 0%, #2a0845 100%)",
                  color: "white",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        width: 56,
                        height: 56,
                        mr: 2,
                        p: 1,
                      }}
                    >
                      <CheckCircleIcon sx={{ fontSize: 30 }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: 700, mb: 0.5 }}
                      >
                        Attendance
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Track exam attendance
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 2 }} />
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, fontWeight: 300, lineHeight: 1.6 }}
                  >
                    Monitor student attendance during exams with easy marking
                    and detailed absence reports.
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    href="/dashboard/admin/exams/attendance"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.15)",
                      color: "white",
                      borderRadius: 3,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.25)",
                      },
                    }}
                  >
                    View Attendance
                  </Button>
                </CardActions>
              </StyledCard>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <StyledPaper
          elevation={0}
          sx={{
            p: 0,
            overflow: "hidden",
            height: "calc(100vh - 350px)",
            minHeight: 400,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.05)" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              All Exams
            </Typography>
          </Box>

          {viewMode === "list" ? (
            <DataGrid
              rows={filteredExams}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              checkboxSelection={false}
              disableRowSelectionOnClick
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "rgba(79, 1, 135, 0.1)",
                  color: theme.palette.primary.main,
                  borderRadius: 0,
                },
                "& .MuiDataGrid-cell": {
                  borderColor: "rgba(0, 0, 0, 0.03)",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "rgba(79, 1, 135, 0.04)",
                },
              }}
            />
          ) : (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {filteredExams.map((exam) => (
                  <Grid item xs={12} sm={6} md={4} key={exam.id}>
                    <Zoom
                      in={true}
                      style={{ transitionDelay: `${exam.id * 100}ms` }}
                    >
                      <Card
                        sx={{
                          borderRadius: 4,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                          },
                          position: "relative",
                          overflow: "visible",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: -15,
                            right: 20,
                            bgcolor:
                              exam.status === "Completed"
                                ? "success.main"
                                : "primary.main",
                            color: "white",
                            borderRadius: 5,
                            px: 2,
                            py: 0.5,
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          }}
                        >
                          {exam.status}
                        </Box>
                        <CardContent sx={{ p: 3 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            {exam.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                          >
                            {exam.examType} • {exam.startDate} to {exam.endDate}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                              mb: 2,
                            }}
                          >
                            {exam.classes.slice(0, 4).map((cls: string) => (
                              <Chip
                                key={cls}
                                label={cls}
                                size="small"
                                variant="outlined"
                                sx={{ borderRadius: 3 }}
                              />
                            ))}
                            {exam.classes.length > 4 && (
                              <Tooltip title={exam.classes.slice(4).join(", ")}>
                                <Chip
                                  label={`+${exam.classes.length - 4}`}
                                  size="small"
                                  sx={{ borderRadius: 3 }}
                                />
                              </Tooltip>
                            )}
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleOpenDialog(exam)}
                              sx={{ color: theme.palette.primary.main }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(exam.id)}
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </StyledPaper>
      </motion.div>

      {/* Create/Edit Exam Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        TransitionComponent={Zoom}
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            pb: 1,
            background: "linear-gradient(90deg, #4F0187 0%, #7B1FA2 100%)",
            color: "white",
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {selectedExam ? "Edit Exam" : "Create New Exam"}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Exam Name"
                fullWidth
                value={formData.name}
                onChange={handleInputChange}
                required
                variant="outlined"
                InputProps={{
                  sx: {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Exam Type</InputLabel>
                <Select
                  name="examType"
                  value={formData.examType}
                  label="Exam Type"
                  onChange={handleSelectChange}
                  sx={{ borderRadius: 2 }}
                >
                  {examTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Classes</InputLabel>
                <Select
                  name="classes"
                  multiple
                  value={formData.classes}
                  label="Classes"
                  onChange={handleSelectChange}
                  sx={{ borderRadius: 2 }}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          size="small"
                          sx={{ borderRadius: 3 }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {availableClasses.map((cls) => (
                    <MenuItem key={cls} value={cls}>
                      {cls}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="startDate"
                label="Start Date"
                type="date"
                fullWidth
                value={formData.startDate}
                onChange={handleInputChange}
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  sx: {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="endDate"
                label="End Date"
                type="date"
                fullWidth
                value={formData.endDate}
                onChange={handleInputChange}
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  sx: {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              borderRadius: 3,
              px: 3,
              borderColor: "rgba(0,0,0,0.1)",
              color: "text.secondary",
            }}
          >
            Cancel
          </Button>
          <GradientButton
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            startIcon={
              loading && <CircularProgress size={20} color="inherit" />
            }
            sx={{ px: 3 }}
          >
            {loading
              ? "Saving..."
              : selectedExam
                ? "Update Exam"
                : "Create Exam"}
          </GradientButton>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={Fade}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Loading backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading && !openDialog}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default ExamsPage;
