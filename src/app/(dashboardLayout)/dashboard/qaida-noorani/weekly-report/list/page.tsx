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
  Tooltip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useTheme } from "@mui/material/styles";
import {
  Visibility,
  Edit,
  Delete,
  Add,
  CheckCircle,
  Cancel,
  TrendingUp,
  Close,
  Book,
  MenuBook,
  RecordVoiceOver,
  Assignment
} from "@mui/icons-material";
import { useState } from "react";

// Sample reports data
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
    },
    teacherComments: "আহমেদ এই সপ্তাহে Excellent Performance দেখিয়েছে। সে তার সকল Target সম্পূর্ণ করতে পেরেছে।",
    nextWeekTarget: "পরের সপ্তাহে আমরা ইনশাল্লাহ হাদিস ১০২ এবং দোয়া ১৬ শিখবো"
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
      tajweed: "নুন সাকিনা",
      qaida: "পৃষ্ঠা ৮"
    },
    mistakes: {
      hadith: "৫টি",
      dua: "২টি",
      tajweed: "৪টি",
      qaida: "১টি"
    },
    teacherComments: "ফাতিমা ভালো করছে, তবে আরো বেশি Practice প্রয়োজন। তাজবীদে আরো মনোযোগ দিতে হবে।",
    nextWeekTarget: "পরের সপ্তাহে দোয়া ২১ এবং তাজবীদের নুন সাকিনা Practice করতে হবে"
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
    },
    teacherComments: "হাসানকে আরো বেশি মনোযোগ দিয়ে পড়াশোনা করতে হবে। সে তার Target Achieve করতে পারেনি।",
    nextWeekTarget: "আগামী সপ্তাহে পূর্বের Target Complete করতে হবে এবং অতিরিক্ত Practice করতে হবে"
  }
];

export default function ClassReportList() {
  const theme = useTheme();
  const [reports, setReports] = useState(initialReportsData);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports(reports.filter(report => report.id !== id));
    }
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
        p={3}
        sx={{
          maxWidth: "xl",
          margin: "0 auto",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
        }}
      >
        {/* Header section */}
        <Paper elevation={4} sx={{ p: 3, mb: 3, background: "#fff" }}>
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
            কায়েদা ও নুরানী ছাত্রদের সাপ্তাহিক রিপোর্ট তালিকা
          </Typography>
          
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Typography variant="body2" color="textSecondary">
              মোট রিপোর্ট: {reports.length} টি
            </Typography>
            <Fab color="primary" aria-label="add" variant="extended">
              <Add sx={{ mr: 1 }} />
              নতুন রিপোর্ট
            </Fab>
          </Box>
        </Paper>

        {/* Reports List */}
        <Grid container spacing={3}>
          {reports.map((report) => (
            <Grid item xs={12} key={report.id}>
              <Card elevation={4} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <Box 
                  sx={{ 
                    height: 6, 
                    background: report.status === "completed" 
                      ? "#4caf50" 
                      : report.status === "in-progress" 
                      ? "#2196f3" 
                      : "#ff9800" 
                  }} 
                />
                
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                        {report.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {report.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          তারিখ: {report.date.format('DD/MM/YYYY')} | মাস: {report.month}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box>
                      {getStatusChip(report.status)}
                      <Box display="flex" mt={1}>
                        <Tooltip title="View Full Report">
                          <IconButton 
                            color="primary" 
                            onClick={() => handleViewReport(report)}
                            sx={{ ml: 1 }}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Report">
                          <IconButton color="secondary" sx={{ ml: 1 }}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Report">
                          <IconButton 
                            color="error" 
                            sx={{ ml: 1 }}
                            onClick={() => handleDelete(report.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                  
                  <LinearProgress 
                    variant="determinate" 
                    value={report.progress} 
                    sx={{ 
                      height: 10, 
                      borderRadius: 5, 
                      mb: 2,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: report.status === "completed" 
                          ? "#4caf50" 
                          : report.status === "in-progress" 
                          ? "#2196f3" 
                          : "#ff9800"
                      }
                    }} 
                  />
                  
                  <Typography variant="body2" textAlign="center" mb={2}>
                    অগ্রগতি: {report.progress}%
                  </Typography>
                  
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>বিষয়</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>টার্গেট</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>রিপোর্ট</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>ভুল</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>হাদিস নম্বর / সূরার নাম</TableCell>
                          <TableCell align="center">{report.targets.hadith}</TableCell>
                          <TableCell align="center">{report.reports.hadith}</TableCell>
                          <TableCell align="center">{report.mistakes.hadith}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>দোয়ার নম্বর</TableCell>
                          <TableCell align="center">{report.targets.dua}</TableCell>
                          <TableCell align="center">{report.reports.dua}</TableCell>
                          <TableCell align="center">{report.mistakes.dua}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>তাজবীদের বিষয়</TableCell>
                          <TableCell align="center">{report.targets.tajweed}</TableCell>
                          <TableCell align="center">{report.reports.tajweed}</TableCell>
                          <TableCell align="center">{report.mistakes.tajweed}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>কায়েদা (পৃষ্ঠা)</TableCell>
                          <TableCell align="center">{report.targets.qaida}</TableCell>
                          <TableCell align="center">{report.reports.qaida}</TableCell>
                          <TableCell align="center">{report.mistakes.qaida}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {reports.length === 0 && (
          <Paper elevation={4} sx={{ p: 5, mt: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              কোন রিপোর্ট পাওয়া যায়নি। নতুন রিপোর্ট যোগ করুন।
            </Typography>
          </Paper>
        )}

        {/* Report Detail Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" component="div">
                সাপ্তাহিক রিপোর্ট বিস্তারিত
              </Typography>
              <IconButton onClick={handleCloseDialog}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            {selectedReport && (
              <Box>
                <Box display="flex" alignItems="center" mb={3}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2, width: 56, height: 56 }}>
                    {selectedReport.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {selectedReport.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      তারিখ: {selectedReport.date.format('DD MMMM, YYYY')} | মাস: {selectedReport.month}
                    </Typography>
                    <Box mt={1}>
                      {getStatusChip(selectedReport.status)}
                    </Box>
                  </Box>
                </Box>

                <LinearProgress 
                  variant="determinate" 
                  value={selectedReport.progress} 
                  sx={{ 
                    height: 12, 
                    borderRadius: 5, 
                    mb: 3,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: selectedReport.status === "completed" 
                        ? "#4caf50" 
                        : selectedReport.status === "in-progress" 
                        ? "#2196f3" 
                        : "#ff9800"
                    }
                  }} 
                />
                
                <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1, color: 'primary.main' }}>
                  সাপ্তাহিক টার্গেট এবং অর্জন
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2, background: '#e8f5e9' }}>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <Assignment sx={{ mr: 1 }} /> এই সপ্তাহের টার্গেট
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <Book color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="হাদিস / সূরা" 
                            secondary={selectedReport.targets.hadith} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <RecordVoiceOver color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="দোয়া" 
                            secondary={selectedReport.targets.dua} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <MenuBook color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="তাজবীদ" 
                            secondary={selectedReport.targets.tajweed} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Book color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="কায়েদা" 
                            secondary={selectedReport.targets.qaida} 
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2, background: '#e3f2fd' }}>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircle sx={{ mr: 1 }} /> অর্জন
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <Book color="secondary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="হাদিস / সূরা" 
                            secondary={selectedReport.reports.hadith} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <RecordVoiceOver color="secondary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="দোয়া" 
                            secondary={selectedReport.reports.dua} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <MenuBook color="secondary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="তাজবীদ" 
                            secondary={selectedReport.reports.tajweed} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Book color="secondary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="কায়েদা" 
                            secondary={selectedReport.reports.qaida} 
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 1, color: 'primary.main' }}>
                  ভুল এবং উন্নয়নের প্রয়োজনীয় ক্ষেত্র
                </Typography>
                
                <Paper elevation={2} sx={{ p: 2, background: '#ffebee' }}>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="হাদিস / সূরায় ভুল" 
                        secondary={selectedReport.mistakes.hadith} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="দোয়ায় ভুল" 
                        secondary={selectedReport.mistakes.dua} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="তাজবীদে ভুল" 
                        secondary={selectedReport.mistakes.tajweed} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="কায়েদায় ভুল" 
                        secondary={selectedReport.mistakes.qaida} 
                      />
                    </ListItem>
                  </List>
                </Paper>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 1, color: 'primary.main' }}>
                  শিক্ষকের মন্তব্য
                </Typography>
                
                <Paper elevation={2} sx={{ p: 2, background: '#fff8e1' }}>
                  <Typography variant="body1" paragraph>
                    {selectedReport.teacherComments}
                  </Typography>
                </Paper>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 1, color: 'primary.main' }}>
                  পরবর্তী সপ্তাহের টার্গেট
                </Typography>
                
                <Paper elevation={2} sx={{ p: 2, background: '#e8f5e9' }}>
                  <Typography variant="body1">
                    {selectedReport.nextWeekTarget}
                  </Typography>
                </Paper>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              বন্ধ করুন
            </Button>
            <Button variant="contained" color="primary">
              প্রিন্ট করুন
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
}