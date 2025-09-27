import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
  useMediaQuery,
  Avatar,
} from '@mui/material';
import {
  ArrowBack,
  Print,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { INazeraReport } from '@/interface';
import { getMonthName, getReportStatus, getStatusColor, getStatusIcon } from '@/utils/nazeraDailyReport';
import { formatDate } from '@/utils/formateDate';

interface ReportDialogProps {
  open: boolean;
  onClose: () => void;
  report: INazeraReport | null;
}

export const ReportDialog: React.FC<ReportDialogProps> = ({ open, onClose, report }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  if (!report) return null;
  
  const status = getReportStatus(report);
  const daysCompleted = Object.values(report.dailyEntries).filter(day =>
    day && (day.morning?.para || day.afternoon?.para || day.night?.para)
  ).length;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
    >
      {isMobile && (
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <IconButton edge="start" onClick={onClose} aria-label="close">
              <ArrowBack />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Report Details
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      <DialogTitle sx={{ display: isMobile ? "none" : "block", bgcolor: "primary.main", color: "white" }}>
        Nazera Report Details
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
              {report.studentName.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h5" gutterBottom>
                {report.studentName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Teacher: {report.teacherName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Date: {formatDate(report.reportDate)} | Month: {getMonthName(report.month)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Weekly Target: {report.weeklyTarget || "Not set"}
              </Typography>
            </Box>
          </Box>
          <Chip
            icon={getStatusIcon(status)}
            label={status.replace("-", " ")}
            color={getStatusColor(status)}
            sx={{ mt: 1 }}
          />
        </Box>

        {/* Full Report Table */}
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell>Day</TableCell>
                <TableCell colSpan={4}>Morning</TableCell>
                <TableCell colSpan={4}>Afternoon</TableCell>
                <TableCell colSpan={4}>Night</TableCell>
                <TableCell>Total Read</TableCell>
                <TableCell>Dua/Hadith</TableCell>
                <TableCell>Mashq</TableCell>
                <TableCell>Tajweed</TableCell>
                <TableCell>Teacher</TableCell>
              </TableRow>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell></TableCell>
                {["Para", "Page", "Amount", "Mistakes"].map((header) => (
                  <TableCell key={`morning-${header}`} sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                    {header}
                  </TableCell>
                ))}
                {["Para", "Page", "Amount", "Mistakes"].map((header) => (
                  <TableCell key={`afternoon-${header}`} sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                    {header}
                  </TableCell>
                ))}
                {["Para", "Page", "Amount", "Mistakes"].map((header) => (
                  <TableCell key={`night-${header}`} sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                    {header}
                  </TableCell>
                ))}
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(report.dailyEntries).map(([day, data]) => (
                <TableRow key={day}>
                  <TableCell sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                    {day}
                  </TableCell>
                  {/* Morning */}
                  <TableCell>{data && data.morning && data.morning.para || "-"}</TableCell>
                  <TableCell>{data && data.morning && data.morning.page || "-"}</TableCell>
                  <TableCell>{data && data.morning && data.morning.amount || "-"}</TableCell>
                  <TableCell>{data && data.morning && data.morning.mistakes || "-"}</TableCell>
                  {/* Afternoon */}
                  <TableCell>{data && data.afternoon && data.afternoon.para || "-"}</TableCell>
                  <TableCell>{data && data.afternoon && data.afternoon.page || "-"}</TableCell>
                  <TableCell>{data && data.afternoon && data.afternoon.amount || "-"}</TableCell>
                  <TableCell>{data && data.afternoon && data.afternoon.mistakes || "-"}</TableCell>
                  {/* Night */}
                  <TableCell>{data && data.night && data.night.para || "-"}</TableCell>
                  <TableCell>{data && data.night && data.night.page || "-"}</TableCell>
                  <TableCell>{data && data.night && data.night.amount || "-"}</TableCell>
                  <TableCell>{data && data.night && data.night.mistakes || "-"}</TableCell>
                  {/* Other fields */}
                  <TableCell>{data && data.totalRead || "-"}</TableCell>
                  <TableCell>{data && data.duaHadithMasala || "-"}</TableCell>
                  <TableCell>{data && data.mashq || "-"}</TableCell>
                  <TableCell>{data && data.tajweed || "-"}</TableCell>
                  <TableCell>{report.teacherName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Weekly Summary */}
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Weekly Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2">Total Pages:</Typography>
              <Typography variant="h6" color="primary">
                {report.totalPages}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2">Total Mistakes:</Typography>
              <Typography variant="h6" color="error">
                {report.totalMistakes}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2">Dua/Hadith Count:</Typography>
              <Typography variant="h6" color="success.main">
                {(report.totalDuas || 0) + (report.totalHadiths || 0)}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2">Days Completed:</Typography>
              <Typography variant="h6" color="info.main">
                {daysCompleted}/7
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      {!isMobile && (
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button variant="contained" startIcon={<Print />}>
            Print
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};