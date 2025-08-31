"use client"
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  alpha,
  useTheme,
  Paper,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Button,
  Tooltip,
  IconButton,
  LinearProgress,
} from "@mui/material"
import {
  CalendarMonth,
  CheckCircle,
  CloudDownload,
  DateRange,
  EventBusy,
  HourglassTop,
  Print,
  QueryStats,
  Share,
  Timer,
  TrendingUp,
} from "@mui/icons-material"

// Sample attendance data
const attendanceData = [
  {
    date: "2023-10-01",
    day: "Monday",
    status: "Present",
    checkIn: "08:45 AM",
    checkOut: "04:30 PM",
    totalHours: "7h 45m",
    notes: "",
  },
  {
    date: "2023-10-02",
    day: "Tuesday",
    status: "Present",
    checkIn: "08:30 AM",
    checkOut: "04:15 PM",
    totalHours: "7h 45m",
    notes: "",
  },
  {
    date: "2023-10-03",
    day: "Wednesday",
    status: "Present",
    checkIn: "08:40 AM",
    checkOut: "04:30 PM",
    totalHours: "7h 50m",
    notes: "",
  },
  {
    date: "2023-10-04",
    day: "Thursday",
    status: "Late",
    checkIn: "09:15 AM",
    checkOut: "04:45 PM",
    totalHours: "7h 30m",
    notes: "Traffic delay",
  },
  {
    date: "2023-10-05",
    day: "Friday",
    status: "Present",
    checkIn: "08:30 AM",
    checkOut: "04:00 PM",
    totalHours: "7h 30m",
    notes: "",
  },
  {
    date: "2023-10-08",
    day: "Monday",
    status: "Present",
    checkIn: "08:35 AM",
    checkOut: "04:30 PM",
    totalHours: "7h 55m",
    notes: "",
  },
  {
    date: "2023-10-09",
    day: "Tuesday",
    status: "Absent",
    checkIn: "-",
    checkOut: "-",
    totalHours: "0h 0m",
    notes: "Sick leave",
  },
  {
    date: "2023-10-10",
    day: "Wednesday",
    status: "Present",
    checkIn: "08:30 AM",
    checkOut: "04:15 PM",
    totalHours: "7h 45m",
    notes: "",
  },
];

// Monthly summary data
const monthlySummary = {
  totalDays: 23,
  present: 21,
  absent: 1,
  late: 1,
  totalHours: "162h 15m",
  averageHoursPerDay: "7h 43m",
  attendanceRate: 95.7,
};

const TeacherAttendance = () => {
  const theme = useTheme();

  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={4}>
        {/* Attendance Summary */}
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                borderColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarMonth sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Attendance Summary (October 2023)
                  </Typography>
                </Box>
              }
              action={
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    startIcon={<Print />}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    Print
                  </Button>
                  <Button
                    startIcon={<CloudDownload />}
                    size="small"
                    variant="contained"
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                  >
                    Export
                  </Button>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.success.main, 0.9),
                          mr: 2,
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <CheckCircle />
                      </Avatar>
                      <Typography variant="h5" fontWeight="bold" color={theme.palette.success.dark}>
                        {monthlySummary.attendanceRate}%
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                      Attendance Rate
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={monthlySummary.attendanceRate}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: alpha(theme.palette.success.main, 0.2),
                          "& .MuiLinearProgress-bar": {
                            bgcolor: theme.palette.success.main,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.9),
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <DateRange />
                      </Avatar>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="h5" fontWeight="bold">
                          {monthlySummary.present}/{monthlySummary.totalDays}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Days Present
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Absent
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {monthlySummary.absent} days
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Late
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {monthlySummary.late} days
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.info.main, 0.9),
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Timer />
                      </Avatar>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="h5" fontWeight="bold">
                          {monthlySummary.totalHours}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Hours
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Average Hours/Day
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {monthlySummary.averageHoursPerDay}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.warning.main, 0.9),
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <TrendingUp />
                      </Avatar>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="h5" fontWeight="bold">
                          +2.3%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          vs Last Month
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Yearly Average
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        96.2%
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              {/* Attendance Log Table */}
              <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        "& th": {
                          fontWeight: "bold",
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        },
                      }}
                    >
                      <TableCell>Date</TableCell>
                      <TableCell>Day</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Check In</TableCell>
                      <TableCell>Check Out</TableCell>
                      <TableCell>Total Hours</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceData.map((record, index) => (
                      <TableRow
                        key={index}
                        hover
                        sx={{
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.light, 0.05),
                          },
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {new Date(record.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </Typography>
                        </TableCell>
                        <TableCell>{record.day}</TableCell>
                        <TableCell>
                          <Chip
                            label={record.status}
                            size="small"
                            color={
                              record.status === "Present"
                                ? "success"
                                : record.status === "Late"
                                ? "warning"
                                : "error"
                            }
                            icon={
                              record.status === "Present" ? (
                                <CheckCircle fontSize="small" />
                              ) : record.status === "Late" ? (
                                <HourglassTop fontSize="small" />
                              ) : (
                                <EventBusy fontSize="small" />
                              )
                            }
                            sx={{ fontWeight: "medium" }}
                          />
                        </TableCell>
                        <TableCell>{record.checkIn}</TableCell>
                        <TableCell>{record.checkOut}</TableCell>
                        <TableCell>{record.totalHours}</TableCell>
                        <TableCell>{record.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  View Full Attendance History
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Analytics */}
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                borderColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <QueryStats sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Attendance Analytics
                  </Typography>
                </Box>
              }
              action={
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Tooltip title="Share Report">
                    <IconButton
                      size="small"
                      sx={{
                        color: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.2),
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <Share fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
            />
            <CardContent>
              <Paper
                elevation={0}
                sx={{
                  height: 300,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  bgcolor: alpha(theme.palette.primary.light, 0.02),
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <QueryStats sx={{ fontSize: 60, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    Attendance analytics chart would be displayed here (showing trends over time)
                  </Typography>
                </Box>
              </Paper>

              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.light, 0.05),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Yearly Attendance Rate
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      96.2%
                    </Typography>
                    <Typography variant="body2" color="success.main" sx={{ display: "flex", alignItems: "center" }}>
                      <TrendingUp fontSize="small" sx={{ mr: 0.5 }} /> +1.2% from last year
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.light, 0.05),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Average Check-in Time
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      08:38 AM
                    </Typography>
                    <Typography variant="body2" color="success.main" sx={{ display: "flex", alignItems: "center" }}>
                      <TrendingUp fontSize="small" sx={{ mr: 0.5 }} /> 7 minutes earlier than department average
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.light, 0.05),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Sick Leave Usage
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      3/12 days
                    </Typography>
                    <Typography variant="body2" color="success.main" sx={{ display: "flex", alignItems: "center" }}>
                      <TrendingUp fontSize="small" sx={{ mr: 0.5 }} /> 25% of allocated sick leave used
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default TeacherAttendance;
