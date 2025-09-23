/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Visibility,
  Close,
  FilterList,
  Sort,
  Download
} from '@mui/icons-material';
import { format } from 'date-fns';

// Sample data for demonstration
const sampleReports = [
  {
    id: 1,
    name: "আহমেদ রফিক",
    date: new Date(2023, 9, 15),
    month: "অক্টোবর",
    status: "completed",
    targets: {
      hadith: "৫টি হাদিস",
      dua: "১০টি দোয়া",
      tajweed: "২ পৃষ্ঠা",
      qaida: "৫ পৃষ্ঠা"
    },
    reports: {
      hadith: "৫টি হাদিস",
      dua: "৮টি দোয়া",
      tajweed: "২ পৃষ্ঠা",
      qaida: "৪ পৃষ্ঠা"
    },
    mistakes: {
      hadith: "০",
      dua: "২টি",
      tajweed: "১টি",
      qaida: "৩টি"
    },
    notes: "ছাত্রটি নিয়মিত পড়ালেখা করছে। তাজবীদে আরো মনোযোগ দিতে হবে।"
  },
  {
    id: 2,
    name: "মোহাম্মদ সাকিব",
    date: new Date(2023, 9, 15),
    month: "অক্টোবর",
    status: "in-progress",
    targets: {
      hadith: "৩টি হাদিস",
      dua: "৫টি দোয়া",
      tajweed: "১ পৃষ্ঠা",
      qaida: "৩ পৃষ্ঠা"
    },
    reports: {
      hadith: "২টি হাদিস",
      dua: "৩টি দোয়া",
      tajweed: "১ পৃষ্ঠা",
      qaida: "২ পৃষ্ঠা"
    },
    mistakes: {
      hadith: "১টি",
      dua: "২টি",
      tajweed: "২টি",
      qaida: "১টি"
    },
    notes: "অনিয়মিত উপস্থিত। বাড়িতে পড়ার অভ্যাস গড়ে তুলতে হবে।"
  },
  {
    id: 3,
    name: "আব্দুল্লাহ আল মামুন",
    date: new Date(2023, 9, 8),
    month: "অক্টোবর",
    status: "completed",
    targets: {
      hadith: "৪টি হাদিস",
      dua: "৭টি দোয়া",
      tajweed: "৩ পৃষ্ঠা",
      qaida: "৬ পৃষ্ঠা"
    },
    reports: {
      hadith: "৪টি হাদিস",
      dua: "৭টি দোয়া",
      tajweed: "৩ পৃষ্ঠা",
      qaida: "৬ পৃষ্ঠা"
    },
    mistakes: {
      hadith: "০",
      dua: "০",
      tajweed: "০",
      qaida: "০"
    },
    notes: "অত্যন্ত মেধাবী এবং পরিশ্রমী ছাত্র। সকল টার্গেট সঠিকভাবে সম্পন্ন করেছে।"
  },
  {
    id: 4,
    name: "ইব্রাহিম খলিল",
    date: new Date(2023, 9, 8),
    month: "অক্টোবর",
    status: "not-started",
    targets: {
      hadith: "৪টি হাদিস",
      dua: "৬টি দোয়া",
      tajweed: "২ পৃষ্ঠা",
      qaida: "৪ পৃষ্ঠা"
    },
    reports: {
      hadith: "০টি হাদিস",
      dua: "০টি দোয়া",
      tajweed: "০ পৃষ্ঠা",
      qaida: "০ পৃষ্ঠा"
    },
    mistakes: {
      hadith: "০",
      dua: "০",
      tajweed: "০",
      qaida: "০"
    },
    notes: "অনুপস্থিত ছিলেন। যোগাযোগ করা প্রয়োজন।"
  }
];

const StudentReportsListPage = () => {
  const [reports, setReports] = useState(sampleReports);
  type Report = typeof sampleReports[number];
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleViewReport = (report:any) => {
    setSelectedReport(report);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReport(null);
  };

  const getStatusChip = (status:any) => {
    let label = '', color = '';
    
    switch(status) {
      case 'completed':
        label = 'সম্পন্ন';
        color = '#2e7d32';
        break;
      case 'in-progress':
        label = 'চলমান';
        color = '#ed6c02';
        break;
      case 'not-started':
        label = 'শুরু হয়নি';
        color = '#d32f2f';
        break;
      default:
        label = 'অবস্থা অজানা';
        color = '#9e9e9e';
    }
    
    return (
      <Chip 
        label={label} 
        size="small" 
        sx={{ 
          backgroundColor: color, 
          color: 'white', 
          fontWeight: 'bold',
          fontSize: '0.75rem'
        }} 
      />
    );
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header Section */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 3, 
          background: "linear-gradient(to right, #2e7d32, #4caf50)", 
          color: "white",
          borderRadius: 2
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 1,
          }}
        >
          আমপারা ছাত্রদের সাপ্তাহিক রিপোর্ট তালিকা
        </Typography>
        <Typography variant="body1" align="center">
          সকল ছাত্রদের সাপ্তাহিক অগ্রগতি এবং রিপোর্টের তালিকা
        </Typography>
      </Paper>

      {/* Filters and Actions */}
      <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Box display="flex" alignItems="center">
            <FilterList sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ mr: 2 }}>
              ফিল্টার:
            </Typography>
            <Chip label="সকল" variant="outlined" sx={{ mr: 1 }} />
            <Chip label="সম্পন্ন" sx={{ mr: 1, backgroundColor: '#2e7d32', color: 'white' }} />
            <Chip label="চলমান" sx={{ mr: 1, backgroundColor: '#ed6c02', color: 'white' }} />
            <Chip label="শুরু হয়নি" sx={{ backgroundColor: '#d32f2f', color: 'white' }} />
          </Box>
          
          <Box display="flex" alignItems="center">
            <Button variant="outlined" startIcon={<Sort />} sx={{ mr: 2 }}>
              সাজান
            </Button>
            <Button variant="contained" startIcon={<Download />} sx={{ backgroundColor: '#2e7d32' }}>
              ডাউনলোড
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Reports Grid */}
      <Grid container spacing={3}>
        {reports.map((report) => (
          <Grid item xs={12} md={6} lg={4} key={report.id}>
            <Card 
              elevation={3} 
              sx={{ 
                borderRadius: 2, 
                overflow: "hidden", 
                borderLeft: "4px solid #4caf50",
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: "#4caf50", mr: 2, width: 48, height: 48 }}>
                      {report.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold" color="#2e7d32">
                        {report.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        তারিখ: {format(report.date, 'dd/MM/yyyy')} | মাস: {report.month}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box display="flex" alignItems="center">
                    {getStatusChip(report.status)}
                    <IconButton 
                      color="primary" 
                      onClick={() => handleViewReport(report)}
                      sx={{ ml: 0.5 }}
                    >
                      <Visibility />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: 1.5,
                  mt: 2 
                }}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" color="#2e7d32">হাদিস/মাসয়ালা</Typography>
                    <Typography variant="body2">{report.targets.hadith}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" color="#2e7d32">দোয়া</Typography>
                    <Typography variant="body2">{report.targets.dua}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" color="#2e7d32">তাজবীদ</Typography>
                    <Typography variant="body2">{report.targets.tajweed}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" color="#2e7d32">পারা/পৃষ্ঠা</Typography>
                    <Typography variant="body2">{report.targets.qaida}</Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 2, p: 1.5, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="body2" fontStyle="italic" color="textSecondary">
                    {report.notes.length > 80 ? `${report.notes.substring(0, 80)}...` : report.notes}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Report Detail Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ 
          background: "linear-gradient(to right, #2e7d32, #4caf50)", 
          color: "white",
          py: 2
        }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div">
              সাপ্তাহিক রিপোর্ট বিস্তারিত
            </Typography>
            <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ py: 2 }}>
          {selectedReport && (
            <Box>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar sx={{ 
                  bgcolor: "#4caf50", 
                  mr: 2, 
                  width: 60, 
                  height: 60,
                  fontSize: '1.5rem'
                }}>
                  {selectedReport.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold" color="#2e7d32">
                    {selectedReport.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    তারিখ: {format(selectedReport.date, 'dd MMMM, yyyy')} | মাস: {selectedReport.month}
                  </Typography>
                  <Box mt={1}>
                    {getStatusChip(selectedReport.status)}
                  </Box>
                </Box>
              </Box>

              <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1, color: '#2e7d32' }}>
                সাপ্তাহিক টার্গেট এবং অর্জন
              </Typography>
              
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#e8f5e9" }}>
                      <TableCell align="center" sx={{ fontWeight: 'bold', py: 1.5 }}>বিষয়</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold', py: 1.5 }}>টার্গেট</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold', py: 1.5 }}>রিপোর্ট</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold', py: 1.5 }}>ভুল</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 'bold', py: 1.5 }}>হাদিস / মাসয়ালা</TableCell>
                      <TableCell align="center" sx={{ py: 1.5 }}>{selectedReport.targets.hadith}</TableCell>
                      <TableCell align="center" sx={{ py: 1.5 }}>{selectedReport.reports.hadith}</TableCell>
                      <TableCell align="center" sx={{ py: 1.5 }}>{selectedReport.mistakes.hadith}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 'bold', py: 1.5 }}>দোয়া</TableCell>
                      <TableCell align="center" sx={{ py: 1.5 }}>{selectedReport.targets.dua}</TableCell>
                      <TableCell align="center" sx={{ py: 1.5 }}>{selectedReport.reports.dua}</TableCell>
                      <TableCell align="center" sx={{ py: 1.5 }}>{selectedReport.mistakes.dua}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 'bold', py: 1.5 }}>তাজবীদ</TableCell>
                      <TableCell align="center" sx={{ py: 1.5 }}>{selectedReport.targets.tajweed}</TableCell>
                      <TableCell align="center" sx={{ py: 1.5 }}>{selectedReport.reports.tajweed}</TableCell>
                      <TableCell align="center" sx={{ py: 1.5 }}>{selectedReport.mistakes.tajweed}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 'bold', py: 1.5 }}>পারা / পৃষ্ঠা</TableCell>
                      <TableCell align="center" sx={{ py: 1.5 }}>{selectedReport.targets.qaida}</TableCell>
                      <TableCell align="center" sx={{ py: 1.5 }}>{selectedReport.reports.qaida}</TableCell>
                      <TableCell align="center" sx={{ py: 1.5 }}>{selectedReport.mistakes.qaida}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1, color: '#2e7d32' }}>
                মন্তব্য ও নোট
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                <Typography variant="body1">
                  {selectedReport.notes}
                </Typography>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={handleCloseDialog} 
            color="primary" 
            variant="outlined"
            sx={{ mr: 1 }}
          >
            বন্ধ করুন
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Download />}
            sx={{ backgroundColor: '#2e7d32' }}
          >
            রিপোর্ট ডাউনলোড
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentReportsListPage;