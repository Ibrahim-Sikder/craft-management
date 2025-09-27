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
  Typography,
  Paper,
  Chip,
  IconButton,
  Card,
  CardContent,
  Grid,
  Avatar,
  LinearProgress,
  AppBar,
  Toolbar,
  Button,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

// Sample student data with progress information
const studentsData = [
  { 
    id: 1, 
    name: "আহমেদ রফিক", 
    date: "২০২৩-১১-১৫", 
    month: "জানুয়ারী", 
    progress: 85,
    reports: {
      target: ["সূরা ফাতিহা", "হাদিস নং ১", "দোয়া নং ৫", "তাজবীদ নিয়ম ১"],
      achieved: ["সম্পূর্ণ", "অর্ধেক", "সম্পূর্ণ", "৭০%"],
      mistakes: ["০", "২", "১", "৩"],
    },
    attendance: "৯৫%",
    teacherComments: "ভালো অগ্রগতি হয়েছে, আরও বেশি চেষ্টা প্রয়োজন"
  },
  { 
    id: 2, 
    name: "মোহাম্মদ হাসান", 
    date: "২০২৩-১১-১৫", 
    month: "জানুয়ারী", 
    progress: 70,
    reports: {
      target: ["সূরা ইখলাস", "হাদিস নং ৩", "দোয়া নং ৭", "তাজবীদ নিয়ম ২"],
      achieved: ["সম্পূর্ণ", "সম্পূর্ণ", "অর্ধেক", "৫০%"],
      mistakes: ["১", "০", "৩", "৪"],
    },
    attendance: "৮৫%",
    teacherComments: "মোটামুটি ভালো, নিয়মিত অনুশীলন প্রয়োজন"
  },
  { 
    id: 3, 
    name: "আব্দুল্লাহ আল মামুন", 
    date: "২০২৩-১১-১৫", 
    month: "জানুয়ারী", 
    progress: 92,
    reports: {
      target: ["সূরা নাস", "হাদিস নং ৫", "দোয়া নং ৯", "তাজবীদ নিয়ম ৩"],
      achieved: ["সম্পূর্ণ", "সম্পূর্ণ", "সম্পূর্ণ", "৯০%"],
      mistakes: ["০", "০", "১", "১"],
    },
    attendance: "১০০%",
    teacherComments: "অত্যন্ত ভালো performance, ধারাবাহিকতা রাখুন"
  },
  // Add more students as needed...
];

type Student = typeof studentsData[number];

export default function ClassReportList() {
  const theme = useTheme();
  const [view, setView] = useState("grid");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleViewClick = (student:any) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        pb: 4,
      }}
    >
      {/* Header App Bar */}
      <AppBar position="static" elevation={0} sx={{ background: "transparent", mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: theme.palette.primary.main, fontWeight: "bold" }}>
            ক্রাফট ইন্টারন্যাশনাল ইন্সটিটিউট
          </Typography>
          <Button 
            color="primary" 
            variant={view === "grid" ? "contained" : "outlined"} 
            onClick={() => setView("grid")}
            sx={{ mr: 1 }}
          >
            Grid View
          </Button>
          <Button 
            color="primary" 
            variant={view === "list" ? "contained" : "outlined"} 
            onClick={() => setView("list")}
          >
            List View
          </Button>
        </Toolbar>
      </AppBar>

      <Box p={3}>
        {/* Header section */}
        <Paper elevation={4} sx={{ p: 3, mb: 3, background: "#fff", borderRadius: 2 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: theme.palette.primary.main,
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            ক্রাফট ইন্টারন্যাশনাল ইন্সটিটিউট
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              mb: 2,
              color: theme.palette.text.secondary,
            }}
          >
            কাওসার ও মুন্নী ছাত্রদের সাপ্তাহিক রিপোর্ট
          </Typography>
          
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Typography variant="h6" color="primary">
              মোট শিক্ষার্থী: {studentsData.length} জন
            </Typography>
            <Box>
              <Chip label="সকল রিপোর্ট" color="primary" variant="outlined" sx={{ mr: 1 }} />
              <Chip label="সক্রিয় শিক্ষার্থী" color="success" variant="outlined" />
            </Box>
          </Box>
        </Paper>

        {/* Action buttons */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <IconButton color="primary" sx={{ mr: 1 }}>
            <PrintIcon />
          </IconButton>
          <IconButton color="primary" sx={{ mr: 1 }}>
            <DownloadIcon />
          </IconButton>
          <Button variant="contained" startIcon={<AddIcon />}>
            নতুন রিপোর্ট
          </Button>
        </Box>

        {view === "grid" ? (
          /* Grid View */
          <Grid container spacing={3}>
            {studentsData.map((student) => (
              <Grid item xs={12} sm={6} md={4} key={student.id}>
                <Card elevation={4} sx={{ borderRadius: 2, transition: "0.3s", "&:hover": { transform: "translateY(-5px)", boxShadow: 6 } }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                        {student.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="div">
                          {student.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: {student.id}
                        </Typography>
                      </Box>
                    </Box>

                    <Box mb={2}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        তারিখ: {student.date}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        মাস: {student.month}
                      </Typography>
                    </Box>

                    <Box mb={2}>
                      <Typography variant="body2" gutterBottom>
                        অগ্রগতি
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={student.progress} 
                        sx={{ height: 8, borderRadius: 4 }}
                        color={student.progress > 80 ? "success" : student.progress > 60 ? "primary" : "warning"}
                      />
                      <Typography variant="body2" color="text.secondary" align="right">
                        {student.progress}%
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleViewClick(student)}
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton size="small" color="secondary">
                        <EditIcon />
                      </IconButton>
                      <Chip 
                        label={student.progress > 80 ? "উত্তীর্ণ" : "চলমান"} 
                        size="small" 
                        color={student.progress > 80 ? "success" : "primary"} 
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          /* List View */
          <Paper elevation={4} sx={{ border: "2px solid", borderColor: theme.palette.primary.light, overflow: "hidden", borderRadius: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)` }}>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                      শিক্ষার্থী আইডি
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                      নাম
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                      তারিখ
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                      মাস
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                      অগ্রগতি
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                      অবস্থা
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                      কর্ম
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {studentsData.map((student) => (
                    <TableRow 
                      key={student.id} 
                      sx={{ 
                        '&:nth-of-type(even)': { backgroundColor: '#f5f7fa' },
                        '&:hover': { backgroundColor: '#e3f2fd' }
                      }}
                    >
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        {student.id}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "medium" }}>
                        {student.name}
                      </TableCell>
                      <TableCell align="center">
                        {student.date}
                      </TableCell>
                      <TableCell align="center">
                        {student.month}
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" alignItems="center">
                          <Box width="100%" mr={1}>
                            <LinearProgress 
                              variant="determinate" 
                              value={student.progress} 
                              sx={{ height: 8, borderRadius: 4 }}
                              color={student.progress > 80 ? "success" : student.progress > 60 ? "primary" : "warning"}
                            />
                          </Box>
                          <Box minWidth={35}>
                            <Typography variant="body2" color="textSecondary">
                              {student.progress}%
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={student.progress > 80 ? "উত্তীর্ণ" : "চলমান"} 
                          size="small" 
                          color={student.progress > 80 ? "success" : "primary"} 
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton 
                          size="small" 
                          color="primary" 
                          sx={{ mr: 1 }}
                          onClick={() => handleViewClick(student)}
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton size="small" color="secondary">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>

      {/* Student Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DialogTitle sx={{ 
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Typography variant="h6">
            {selectedStudent?.name} - এর সম্পূর্ণ রিপোর্ট
          </Typography>
          <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers sx={{ py: 3 }}>
          {selectedStudent && (
            <Box>
              {/* Student Info */}
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar sx={{ width: 60, height: 60, bgcolor: theme.palette.primary.main, mr: 2 }}>
                  {selectedStudent.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedStudent.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    তারিখ: {selectedStudent.date} | মাস: {selectedStudent.month}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="body2" sx={{ mr: 1 }}>অগ্রগতি:</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={selectedStudent.progress} 
                      sx={{ width: 100, height: 8, borderRadius: 4, mr: 1 }}
                      color={selectedStudent.progress > 80 ? "success" : selectedStudent.progress > 60 ? "primary" : "warning"}
                    />
                    <Typography variant="body2">{selectedStudent.progress}%</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="body2" sx={{ mr: 1 }}>উপস্থিতি:</Typography>
                    <Chip 
                      icon={<CheckIcon />} 
                      label={selectedStudent.attendance} 
                      size="small" 
                      color="success" 
                      variant="outlined"
                    />
                  </Box>
                </Box>
              </Box>

              {/* Report Table */}
              <Paper elevation={2} sx={{ mb: 3 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ background: theme.palette.grey[100] }}>
                        <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                          বিষয়
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                          হাদিস নম্বর / সূরার নাম
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                          দোয়ার নম্বর
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                          তাজবীদের বিষয়
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                          কাজের (শ:)
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ border: "1px solid #ddd", fontWeight: "bold", background: theme.palette.grey[50] }}>
                          এককজরে এই সপ্তাহের টার্গেট
                        </TableCell>
                        {selectedStudent.reports.target.map((item, index) => (
                          <TableCell key={index} align="center" sx={{ border: "1px solid #ddd" }}>
                            {item}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ border: "1px solid #ddd", fontWeight: "bold", background: theme.palette.grey[50] }}>
                          এককজরে এই সপ্তাহের রিপোর্ট
                        </TableCell>
                        {selectedStudent.reports.achieved.map((item, index) => (
                          <TableCell key={index} align="center" sx={{ border: "1px solid #ddd" }}>
                            {item}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ border: "1px solid #ddd", fontWeight: "bold", background: theme.palette.grey[50] }}>
                          এককজরে ভুলের সংখ্যা
                        </TableCell>
                        {selectedStudent.reports.mistakes.map((item, index) => (
                          <TableCell key={index} align="center" sx={{ border: "1px solid #ddd" }}>
                            {item}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              {/* Teacher Comments */}
              <Paper elevation={2} sx={{ p: 2, background: theme.palette.info.light }}>
                <Typography variant="h6" gutterBottom color="primary">
                  শিক্ষকের মন্তব্য
                </Typography>
                <Typography variant="body1">
                  {selectedStudent.teacherComments}
                </Typography>
              </Paper>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} color="primary">
            বন্ধ করুন
          </Button>
          <Button variant="contained" startIcon={<PrintIcon />}>
            প্রিন্ট করুন
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}