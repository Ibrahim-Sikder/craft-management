'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  useMediaQuery,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Visibility,
  Edit,
  Delete,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { INazeraReport } from '@/interface';
import { getMonthName, getProgressPercentage, getReportStatus, getStatusColor, getStatusIcon } from '@/utils/nazeraDailyReport';
import { calculateWeeklyTotals } from '@/utils/reportUtils';
import { formatDate } from '@/utils/formateDate';
import Swal from 'sweetalert2';

interface ReportCardProps {
  report: INazeraReport;
  onView: (report: INazeraReport) => void;
  onDelete: (id: string) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, onView, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const status = getReportStatus(report);
  const progress = getProgressPercentage(report);
  const { totalPages, totalMistakes, totalDuas, totalHadiths } = calculateWeeklyTotals(report.dailyEntries);
  const totalDuaHadith = totalDuas + totalHadiths;

  const daysCompleted = Object.values(report.dailyEntries).filter(day =>
    day && (day.morning?.para || day.afternoon?.para || day.night?.para)
  ).length;

  // Handle edit button click
  const handleEdit = () => {
    router.push(`/dashboard/nazera/daily-report/update?id=${report._id}`);
  };

  // Handle delete button click
  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "This report will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (confirm.isConfirmed) {
      onDelete(report._id);
      Swal.fire({
        title: 'Deleted!',
        text: 'The report has been deleted successfully.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };


  return (
    <Card
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        },
        borderRadius: 2,
      }}
    >
      <CardContent>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: isMobile ? 2 : 0 }}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
              {report.studentName.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6" gutterBottom>
                {report.studentName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Teacher: {report.teacherName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Date: {formatDate(report.reportDate)} | Month: {getMonthName(report.month)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Weekly Target: {report.weeklyTarget || "Not set"}
              </Typography>
            </Box>
          </Box>

          {/* Status and Actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: isMobile ? "row" : "column",
              mt: isMobile ? 0 : 0,
            }}
          >
            <Chip
              icon={getStatusIcon(status)}
              label={status.replace("-", " ")}
              color={getStatusColor(status)}
              size="small"
              sx={{ mr: isMobile ? 1 : 0, mb: isMobile ? 0 : 1 }}
            />
            <Box sx={{ display: "flex" }}>
              <Tooltip title="View Full Report">
                <IconButton
                  size="small"
                  onClick={() => onView(report)}
                  sx={{ ml: 1 }}
                >
                  <Visibility />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Report">
                <IconButton
                  size="small"
                  sx={{ ml: 1 }}
                  onClick={handleEdit}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Report">
                <IconButton
                  size="small"
                  sx={{ ml: 1 }}
                  onClick={handleDelete}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mt: 2, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={getStatusColor(status)}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        {/* Summary Stats */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6} sm={3}>
            <Paper variant="outlined" sx={{ p: 1, textAlign: "center", borderRadius: 2 }}>
              <Typography variant="h6" color="primary">
                {report.totalPages || totalPages}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total Pages
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper variant="outlined" sx={{ p: 1, textAlign: "center", borderRadius: 2 }}>
              <Typography variant="h6" color="error">
                {report.totalMistakes || totalMistakes}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Mistakes
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper variant="outlined" sx={{ p: 1, textAlign: "center", borderRadius: 2 }}>
              <Typography variant="h6" color="success.main">
                {totalDuaHadith}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Dua/Hadith
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper variant="outlined" sx={{ p: 1, textAlign: "center", borderRadius: 2 }}>
              <Typography variant="h6" color="info.main">
                {daysCompleted}/7
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Days Completed
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Summary Table */}
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell>Day</TableCell>
                <TableCell>Morning</TableCell>
                <TableCell>Afternoon</TableCell>
                <TableCell>Night</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Dua/Hadith</TableCell>
                <TableCell>Teacher</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(report.dailyEntries).map(([day, data]) => (
                <TableRow key={day}>
                  <TableCell sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                    {day.slice(0, 3)}
                  </TableCell>
                  <TableCell>
                    {data && data.morning && data.morning.para && data.morning.page
                      ? `${data.morning.para}/${data.morning.page}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {data && data.afternoon && data.afternoon.para && data.afternoon.page
                      ? `${data.afternoon.para}/${data.afternoon.page}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {data && data.night && data.night.para && data.night.page
                      ? `${data.night.para}/${data.night.page}`
                      : "-"}
                  </TableCell>
                  <TableCell>{data && data.totalRead || "-"}</TableCell>
                  <TableCell>{data && data.duaHadithMasala || "-"}</TableCell>
                  <TableCell>{report.teacherName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};