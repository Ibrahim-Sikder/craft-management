/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Button,
  Chip,
  IconButton,
  Card,
  CardContent,
  Grid,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Tabs,
  Tab
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useTheme } from "@mui/material/styles";
import { SetStateAction, useState } from "react";
import {
  Visibility,
  Edit,
  Delete,
  Add,
  CheckCircle,
  Cancel,
  TrendingUp,
  Close
} from "@mui/icons-material";

// Sample student data
const initialStudentsData = [
  { 
    id: 1, 
    name: "আহমেদ রফিক", 
    date: dayjs(), 
    month: "জানুয়ারী",
    status: "completed",
    progress: 95,
    targets: {
      hadith: "হাদিস ১০১",
      dua: "দোয়া ১৫",
      tajweed: "মাখরাজ correction",
      qaida: "পৃষ্ঠা ১২"
    },
    reports: {
      hadith: "হাদিস ১০১",
      dua: "দোয়া ১৫",
      tajweed: "মাখরাজ correction",
      qaida: "পৃষ্ঠা ১২"
    },
    mistakes: {
      hadith: "২টি",
      dua: "১টি",
      tajweed: "৩টি",
      qaida: "০টি"
    }
  }
];

// Sample reports data for list view
const initialReportsData = [
  {
    id: 1,
    name: "আহমেদ রফিক",
    date: dayjs().subtract(2, 'day'),
    month: "জানুয়ারী",
    status: "completed",
    progress: 95,
    targets: {
      hadith: "হাদিস ১০১",
      dua: "দোয়া ১৫",
      tajweed: "মাখরাজ correction",
      qaida: "পৃষ্ঠা ১২"
    },
    reports: {
      hadith: "হাদিস ১০১",
      dua: "দোয়া ১৫",
      tajweed: "মাখরাজ correction",
      qaida: "পৃষ্ঠা ১২"
    },
    mistakes: {
      hadith: "২টি",
      dua: "১টি",
      tajweed: "৩টি",
      qaida: "০টি"
    }
  },
  {
    id: 2,
    name: "ফাতিমা বেগম",
    date: dayjs().subtract(5, 'day'),
    month: "জানুয়ারী",
    status: "in-progress",
    progress: 65,
    targets: {
      hadith: "সূরা আল-ফাতিহা",
      dua: "দোয়া ২০",
      tajweed: "নুন সাকিনা",
      qaida: "পৃষ্ঠা ৮"
    },
    reports: {
      hadith: "সূরা আল-ফাতিহা",
      dua: "দোয়া ১৮",
      tajweed: "নুন সাকিনا",
      qaida: "পৃষ্ঠা ৮"
    },
    mistakes: {
      hadith: "৫টি",
      dua: "২টি",
      tajweed: "৪টি",
      qaida: "১টি"
    }
  },
  {
    id: 3,
    name: "মুহাম্মদ হাসান",
    date: dayjs().subtract(1, 'week'),
    month: "জানুয়ারী",
    status: "needs-improvement",
    progress: 45,
    targets: {
      hadith: "হাদিস ৯৮",
      dua: "দোয়া ১২",
      tajweed: "গুননা",
      qaida: "পৃষ্ঠা ১০"
    },
    reports: {
      hadith: "হাদিস ৯৫",
      dua: "দোয়া ১০",
      tajweed: "গুননা",
      qaida: "পৃষ্ঠা ৯"
    },
    mistakes: {
      hadith: "৮টি",
      dua: "৫টি",
      tajweed: "৭টি",
      qaida: "৩টি"
    }
  }
];

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function NazeraStudentReport() {
  const theme = useTheme();
  const [students, setStudents] = useState(initialStudentsData);
  const [reports, setReports] = useState(initialReportsData);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const updateStudent = (id: any, field: any, value: any) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  };

  const handleTabChange = (event: any, newValue: SetStateAction<number>) => {
    setTabValue(newValue);
  };

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReport(null);
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case "completed":
        return <Chip icon={<CheckCircle />} label="Completed" color="success" size="small" />;
      case "in-progress":
        return <Chip icon={<TrendingUp />} label="In Progress" color="primary" size="small" />;
      case "needs-improvement":
        return <Chip icon={<Cancel />} label="Needs Improvement" color="warning" size="small" />;
      default:
        return <Chip label="Unknown" size="small" />;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
          minHeight: "100vh",
        }}
      >
        <AppBar position="static" sx={{ background: "#2e7d32" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ক্রাফট ইন্টারন্যাশনাল ইন্সটিটিউট
            </Typography>
            <Tabs value={tabValue} onChange={handleTabChange} textColor="inherit">
              <Tab label="রিপোর্ট যোগ করুন" />
              <Tab label="রিপোর্ট তালিকা" />
            </Tabs>
          </Toolbar>
        </AppBar>

        <TabPanel value={tabValue} index={0}>
          <Box
            p={3}
            sx={{
              maxWidth: "xl",
              margin: "0 auto",
            }}
          >
            {/* Header section */}
            <Paper elevation={4} sx={{ p: 3, mb: 3, background: "#fff", borderLeft: "4px solid #2e7d32" }}>
              <Typography
                variant="h5"
                align="center"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  color: "#2e7d32",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                নাযেরা ছাত্রদের সাপ্তাহিক রিপোর্ট
              </Typography>
            </Paper>

            {students.map((student) => (
              <Paper
                key={student.id}
                elevation={4}
                sx={{ p: 3, mb: 3, background: "#fff", borderLeft: "4px solid #4caf50" }}
              >
                <Typography variant="h6" sx={{ mb: 2, color: "#2e7d32" }}>
                  শিক্ষার্থী #{student.id}
                </Typography>

                <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                  <TextField
                    label="শিক্ষার্থীর নাম"
                    variant="outlined"
                    size="small"
                    value={student.name}
                    onChange={(e) =>
                      updateStudent(student.id, "name", e.target.value)
                    }
                    sx={{ mb: 2, minWidth: 120, flexGrow: 1, mr: 1 }}
                  />
                  <DatePicker
                    label="তারিখ"
                    value={student.date}
                    onChange={(newValue) =>
                      updateStudent(student.id, "date", newValue)
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: { mb: 2, minWidth: 120, flexGrow: 1, mr: 1 },
                      },
                    }}
                  />
                  <TextField
                    label="মাস"
                    variant="outlined"
                    size="small"
                    value={student.month}
                    onChange={(e) =>
                      updateStudent(student.id, "month", e.target.value)
                    }
                    sx={{ mb: 2, minWidth: 120, flexGrow: 1 }}
                  />
                </Box>

                {/* Table Section */}
                <Paper
                  elevation={4}
                  sx={{ border: "2px solid #4caf50", overflow: "hidden" }}
                >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow
                          sx={{
                            background:
                              "linear-gradient(45deg, #4caf50 0%, #81c784 100%)",
                          }}
                        >
                          <TableCell
                            align="center"
                            sx={{
                              border: "1px solid #fff",
                              fontWeight: "bold",
                              color: "white",
                              fontSize: "1.1rem",
                            }}
                          >
                            এককজরে এই সপ্তাহের টার্গেট
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              border: "1px solid #fff",
                              fontWeight: "bold",
                              color: "white",
                              fontSize: "1.1rem",
                            }}
                          >
                            হাদিস  / মাসয়ালা নম্বর
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              border: "1px solid #fff",
                              fontWeight: "bold",
                              color: "white",
                              fontSize: "1.1rem",
                            }}
                          >
                            দোয়ার নম্বর
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              border: "1px solid #fff",
                              fontWeight: "bold",
                              color: "white",
                              fontSize: "1.1rem",
                            }}
                          >
                            তাজবীদের অনুশীলন
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              border: "1px solid #fff",
                              fontWeight: "bold",
                              color: "white",
                              fontSize: "1.1rem",
                            }}
                          >
                            পারা / পৃষ্ঠা
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {/* Row 1 */}
                        <TableRow>
                          <TableCell
                            sx={{
                              border: "1px solid #ccc",
                              fontWeight: "bold",
                              background: "#e8f5e9",
                            }}
                          >
                            এককজরে এই সপ্তাহের টার্গেট
                          </TableCell>
                          {[0, 1, 2, 3].map((index) => (
                            <TableCell
                              key={index}
                              sx={{ border: "1px solid #ccc", p: 0.5 }}
                            >
                              <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                InputProps={{
                                  sx: { borderRadius: 0, background: "#fff" },
                                }}
                              />
                            </TableCell>
                          ))}
                        </TableRow>

                        {/* Row 2 */}
                        <TableRow>
                          <TableCell
                            sx={{
                              border: "1px solid #ccc",
                              fontWeight: "bold",
                              background: "#e8f5e9",
                            }}
                          >
                            এককজরে এই সপ্তাহের রিপোর্ট
                          </TableCell>
                          {[0, 1, 2, 3].map((index) => (
                            <TableCell
                              key={index}
                              sx={{ border: "1px solid #ccc", p: 0.5 }}
                            >
                              <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                InputProps={{
                                  sx: { borderRadius: 0, background: "#fff" },
                                }}
                              />
                            </TableCell>
                          ))}
                        </TableRow>

                        {/* Row 3 */}
                        <TableRow>
                          <TableCell
                            sx={{
                              border: "1px solid #ccc",
                              fontWeight: "bold",
                              background: "#e8f5e9",
                            }}
                          >
                            এককজরে ভুলের সংখ্যা
                          </TableCell>
                          {[0, 1, 2, 3].map((index) => (
                            <TableCell
                              key={index}
                              sx={{ border: "1px solid #ccc", p: 0.5 }}
                            >
                              <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                InputProps={{
                                  sx: { borderRadius: 0, background: "#fff" },
                                }}
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>

                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button variant="contained" sx={{ background: "#2e7d32", "&:hover": { background: "#1b5e20" } }}>
                    রিপোর্ট সেভ করুন
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        </TabPanel>

       
      </Box>
    </LocalizationProvider>
  );
}