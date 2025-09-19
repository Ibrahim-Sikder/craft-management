/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Fab,
  Tooltip,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Avatar,
  LinearProgress,
} from "@mui/material"
import {
  Visibility,
  Search,
  Add,
  FilterList,
  Print,
  Download,
  Edit,
  Delete,
  ArrowBack,
  Schedule,
  CheckCircle,
  Cancel,
} from "@mui/icons-material"

// Mock data for demonstration
const mockReports = [
  {
    id: 1,
    studentName: "Rahim Islam",
    reportDate: "2023-10-15",
    month: "October 2023",
    weeklyTarget: "15 pages",
    status: "completed",
    progress: 100,
    dailyEntries: {
      saturday: {
        morning: { para: "5", page: "12", amount: "2", mistakes: "0" },
        afternoon: { para: "6", page: "13", amount: "3", mistakes: "1" },
        night: { para: "7", page: "14", amount: "4", mistakes: "0" },
        totalRead: "9",
        duaHadithMasala: "3",
        teacherSignature: "M. Ahmed",
      },
      sunday: {
        morning: { para: "8", page: "15", amount: "2", mistakes: "0" },
        afternoon: { para: "9", page: "16", amount: "3", mistakes: "1" },
        night: { para: "10", page: "17", amount: "4", mistakes: "0" },
        totalRead: "9",
        duaHadithMasala: "4",
        teacherSignature: "M. Ahmed",
      },
      monday: {
        morning: { para: "11", page: "18", amount: "2", mistakes: "0" },
        afternoon: { para: "12", page: "19", amount: "3", mistakes: "1" },
        night: { para: "13", page: "20", amount: "4", mistakes: "0" },
        totalRead: "9",
        duaHadithMasala: "5",
        teacherSignature: "M. Ahmed",
      },
      tuesday: {
        morning: { para: "14", page: "21", amount: "2", mistakes: "0" },
        afternoon: { para: "15", page: "22", amount: "3", mistakes: "1" },
        night: { para: "16", page: "23", amount: "4", mistakes: "0" },
        totalRead: "9",
        duaHadithMasala: "2",
        teacherSignature: "M. Ahmed",
      },
      wednesday: {
        morning: { para: "17", page: "24", amount: "2", mistakes: "0" },
        afternoon: { para: "18", page: "25", amount: "3", mistakes: "1" },
        night: { para: "19", page: "26", amount: "4", mistakes: "0" },
        totalRead: "9",
        duaHadithMasala: "3",
        teacherSignature: "M. Ahmed",
      },
      thursday: {
        morning: { para: "20", page: "27", amount: "2", mistakes: "0" },
        afternoon: { para: "21", page: "28", amount: "3", mistakes: "1" },
        night: { para: "22", page: "29", amount: "4", mistakes: "0" },
        totalRead: "9",
        duaHadithMasala: "4",
        teacherSignature: "M. Ahmed",
      },
      friday: {
        morning: { para: "23", page: "30", amount: "2", mistakes: "0" },
        afternoon: { para: "24", page: "31", amount: "3", mistakes: "1" },
        night: { para: "25", page: "32", amount: "4", mistakes: "0" },
        totalRead: "9",
        duaHadithMasala: "5",
        teacherSignature: "M. Ahmed",
      },
    },
  },
  {
    id: 2,
    studentName: "Sara Khan",
    reportDate: "2023-10-22",
    month: "October 2023",
    weeklyTarget: "12 pages",
    status: "in-progress",
    progress: 65,
    dailyEntries: {
      saturday: {
        morning: { para: "3", page: "10", amount: "2", mistakes: "1" },
        afternoon: { para: "4", page: "11", amount: "3", mistakes: "2" },
        night: { para: "5", page: "12", amount: "4", mistakes: "1" },
        totalRead: "9",
        duaHadithMasala: "2",
        teacherSignature: "S. Rahman",
      },
      sunday: {
        morning: { para: "6", page: "13", amount: "2", mistakes: "0" },
        afternoon: { para: "7", page: "14", amount: "3", mistakes: "1" },
        night: { para: "8", page: "15", amount: "4", mistakes: "0" },
        totalRead: "9",
        duaHadithMasala: "3",
        teacherSignature: "S. Rahman",
      },
      monday: {
        morning: { para: "9", page: "16", amount: "2", mistakes: "0" },
        afternoon: { para: "10", page: "17", amount: "3", mistakes: "1" },
        night: { para: "11", page: "18", amount: "4", mistakes: "0" },
        totalRead: "9",
        duaHadithMasala: "4",
        teacherSignature: "S. Rahman",
      },
      tuesday: {
        morning: { para: "12", page: "19", amount: "2", mistakes: "0" },
        afternoon: { para: "13", page: "20", amount: "3", mistakes: "1" },
        night: { para: "14", page: "21", amount: "4", mistakes: "0" },
        totalRead: "9",
        duaHadithMasala: "2",
        teacherSignature: "S. Rahman",
      },
      wednesday: {
        morning: { para: "", page: "", amount: "", mistakes: "" },
        afternoon: { para: "", page: "", amount: "", mistakes: "" },
        night: { para: "", page: "", amount: "", mistakes: "" },
        totalRead: "",
        duaHadithMasala: "",
        teacherSignature: "",
      },
      thursday: {
        morning: { para: "", page: "", amount: "", mistakes: "" },
        afternoon: { para: "", page: "", amount: "", mistakes: "" },
        night: { para: "", page: "", amount: "", mistakes: "" },
        totalRead: "",
        duaHadithMasala: "",
        teacherSignature: "",
      },
      friday: {
        morning: { para: "", page: "", amount: "", mistakes: "" },
        afternoon: { para: "", page: "", amount: "", mistakes: "" },
        night: { para: "", page: "", amount: "", mistakes: "" },
        totalRead: "",
        duaHadithMasala: "",
        teacherSignature: "",
      },
    },
  },
  {
    id: 3,
    studentName: "Abdullah Al-Mamun",
    reportDate: "2023-10-29",
    month: "October 2023",
    weeklyTarget: "10 pages",
    status: "not-started",
    progress: 0,
    dailyEntries: {
      saturday: {
        morning: { para: "", page: "", amount: "", mistakes: "" },
        afternoon: { para: "", page: "", amount: "", mistakes: "" },
        night: { para: "", page: "", amount: "", mistakes: "" },
        totalRead: "",
        duaHadithMasala: "",
        teacherSignature: "",
      },
      sunday: {
        morning: { para: "", page: "", amount: "", mistakes: "" },
        afternoon: { para: "", page: "", amount: "", mistakes: "" },
        night: { para: "", page: "", amount: "", mistakes: "" },
        totalRead: "",
        duaHadithMasala: "",
        teacherSignature: "",
      },
      monday: {
        morning: { para: "", page: "", amount: "", mistakes: "" },
        afternoon: { para: "", page: "", amount: "", mistakes: "" },
        night: { para: "", page: "", amount: "", mistakes: "" },
        totalRead: "",
        duaHadithMasala: "",
        teacherSignature: "",
      },
      tuesday: {
        morning: { para: "", page: "", amount: "", mistakes: "" },
        afternoon: { para: "", page: "", amount: "", mistakes: "" },
        night: { para: "", page: "", amount: "", mistakes: "" },
        totalRead: "",
        duaHadithMasala: "",
        teacherSignature: "",
      },
      wednesday: {
        morning: { para: "", page: "", amount: "", mistakes: "" },
        afternoon: { para: "", page: "", amount: "", mistakes: "" },
        night: { para: "", page: "", amount: "", mistakes: "" },
        totalRead: "",
        duaHadithMasala: "",
        teacherSignature: "",
      },
      thursday: {
        morning: { para: "", page: "", amount: "", mistakes: "" },
        afternoon: { para: "", page: "", amount: "", mistakes: "" },
        night: { para: "", page: "", amount: "", mistakes: "" },
        totalRead: "",
        duaHadithMasala: "",
        teacherSignature: "",
      },
      friday: {
        morning: { para: "", page: "", amount: "", mistakes: "" },
        afternoon: { para: "", page: "", amount: "", mistakes: "" },
        night: { para: "", page: "", amount: "", mistakes: "" },
        totalRead: "",
        duaHadithMasala: "",
        teacherSignature: "",
      },
    },
  },
]

function NazeraReportList() {
  const [reports, setReports] = useState(mockReports)
  const [filteredReports, setFilteredReports] = useState(mockReports)
  type Report = typeof mockReports[number]
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [tabValue, setTabValue] = useState("all")
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    let filtered = reports
    
    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (tabValue !== "all") {
      filtered = filtered.filter(report => report.status === tabValue)
    }
    
    setFilteredReports(filtered)
  }, [searchTerm, tabValue, reports])

  const handleViewReport = (report:any) => {
    setSelectedReport(report)
    setViewDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setViewDialogOpen(false)
    setSelectedReport(null)
  }

  const handleTabChange = (event:any, newValue:any) => {
    setTabValue(newValue)
  }

  const getStatusColor = (status:any) => {
    switch (status) {
      case "completed":
        return "success"
      case "in-progress":
        return "warning"
      case "not-started":
        return "error"
      default:
        return "primary"
    }
  }

  const getStatusIcon = (status:any) => {
    switch (status) {
      case "completed":
        return <CheckCircle fontSize="small" />
      case "in-progress":
        return <Schedule fontSize="small" />
      case "not-started":
        return <Cancel fontSize="small" />
      default:
        return undefined
    }
  }

  const formatDate = (dateString:any) => {
    const options = { year: "numeric" as const, month: "long" as const, day: "numeric" as const }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const calculateWeeklyTotals = (dailyEntries:any) => {
    let totalPages = 0
    let totalMistakes = 0
    let totalDuaHadith = 0

    if (!dailyEntries) return { totalPages, totalMistakes, totalDuaHadith }

    Object.values(dailyEntries).forEach(day => {
      if (!day) return
      
      // if (day.totalRead) totalPages += parseInt(day.totalRead) || 0
      // if (day.duaHadithMasala) totalDuaHadith += parseInt(day.duaHadithMasala) || 0
      
      // // Calculate mistakes from each session
      // ['morning', 'afternoon', 'night'].forEach(session => {
      //   if (day[session] && day[session].mistakes) {
      //     totalMistakes += parseInt(day[session].mistakes) || 0
      //   }
      // })
    })

    return { totalPages, totalMistakes, totalDuaHadith }
  }

  return (
    <Box sx={{ flexGrow: 1, p: isMobile ? 1 : 3, bgcolor: "#f5f7f9", minHeight: "100vh" }}>
      <AppBar position="static" color="transparent" elevation={1} sx={{ mb: 3, borderRadius: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Nazera Reports
          </Typography>
          <TextField
            size="small"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mr: 2, bgcolor: "white" }}
          />
          <Tooltip title="Filter">
            <IconButton>
              <FilterList />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton>
              <Print />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download">
            <IconButton>
              <Download />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="All Reports" value="all" />
          <Tab label="Completed" value="completed" />
          <Tab label="In Progress" value="in-progress" />
          <Tab label="Not Started" value="not-started" />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {filteredReports.map((report) => {
          const { totalPages, totalMistakes, totalDuaHadith } = calculateWeeklyTotals(report.dailyEntries)
          
          return (
            <Grid item xs={12} key={report.id}>
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
                          Date: {formatDate(report.reportDate)} | Month: {report.month}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Weekly Target: {report.weeklyTarget}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: isMobile ? "row" : "column",
                        mt: isMobile ? 0 : 0,
                      }}
                    >
                      <Chip
                        icon={getStatusIcon(report.status)}
                        label={report.status.replace("-", " ")}
                        color={getStatusColor(report.status)}
                        size="small"
                        sx={{ mr: isMobile ? 1 : 0, mb: isMobile ? 0 : 1 }}
                      />
                      <Box sx={{ display: "flex" }}>
                        <Tooltip title="View Full Report">
                          <IconButton
                            size="small"
                            onClick={() => handleViewReport(report)}
                            sx={{ ml: 1 }}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Report">
                          <IconButton size="small" sx={{ ml: 1 }}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Report">
                          <IconButton size="small" sx={{ ml: 1 }}>
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
                        {report.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={report.progress} 
                      color={getStatusColor(report.status)}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  {/* Summary Stats */}
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6} sm={3}>
                      <Paper variant="outlined" sx={{ p: 1, textAlign: "center", borderRadius: 2 }}>
                        <Typography variant="h6" color="primary">
                          {totalPages}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Total Pages
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper variant="outlined" sx={{ p: 1, textAlign: "center", borderRadius: 2 }}>
                        <Typography variant="h6" color="error">
                          {totalMistakes}
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
                          {Object.values(report.dailyEntries).filter(day => 
                            day && (day.morning?.para || day.afternoon?.para || day.night?.para)
                          ).length}
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
                            <TableCell>
                              {data && data.teacherSignature ? data.teacherSignature.slice(0, 5) + "..." : "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {/* View Report Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
      >
        {isMobile && (
          <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
              <IconButton edge="start" onClick={handleCloseDialog} aria-label="close">
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
          {selectedReport && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                    {selectedReport.studentName.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {selectedReport.studentName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Date: {formatDate(selectedReport.reportDate)} | Month: {selectedReport.month}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Weekly Target: {selectedReport.weeklyTarget}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  icon={getStatusIcon(selectedReport.status)}
                  label={selectedReport.status.replace("-", " ")}
                  color={getStatusColor(selectedReport.status)}
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(selectedReport.dailyEntries).map(([day, data]) => (
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
                        <TableCell>{data && data.teacherSignature || "-"}</TableCell>
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
                      {calculateWeeklyTotals(selectedReport.dailyEntries).totalPages}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2">Total Mistakes:</Typography>
                    <Typography variant="h6" color="error">
                      {calculateWeeklyTotals(selectedReport.dailyEntries).totalMistakes}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2">Dua/Hadith Count:</Typography>
                    <Typography variant="h6" color="success.main">
                      {calculateWeeklyTotals(selectedReport.dailyEntries).totalDuaHadith}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2">Days Completed:</Typography>
                    <Typography variant="h6" color="info.main">
                      {Object.values(selectedReport.dailyEntries).filter(day => 
                        day && (day.morning?.para || day.afternoon?.para || day.night?.para)
                      ).length}/7
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          )}
        </DialogContent>
        {!isMobile && (
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
            <Button variant="contained" startIcon={<Print />}>
              Print
            </Button>
          </DialogActions>
        )}
      </Dialog>

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <Add />
      </Fab>
    </Box>
  )
}

export default NazeraReportList