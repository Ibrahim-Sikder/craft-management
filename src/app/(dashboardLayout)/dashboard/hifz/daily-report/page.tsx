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
} from "@mui/icons-material"

// Mock data for demonstration
const mockReports: Report[] = [
  {
    id: 1,
    studentName: "Ahmed Khan",
    reportDate: "2023-10-15",
    month: "October 2023",
    weeklyTarget: "5 pages",
    dailyEntries: {
      saturday: {
        sobok: { para: "12", page: "23" },
        sabakSeven: { para: "5", page: "10" },
        sabakAmukta: { para: "8", page: "15" },
        satSobok: { para: "3", page: "6", amount: "2", wrong: "1" },
        tilawaAmount: "3",
        teacherSignature: "M. Alam",
        thursdayWeeklyRevision: "Completed",
      },
      sunday: {
        sobok: { para: "13", page: "24" },
        sabakSeven: { para: "6", page: "11" },
        sabakAmukta: { para: "9", page: "16" },
        satSobok: { para: "4", page: "7", amount: "3", wrong: "0" },
        tilawaAmount: "4",
        teacherSignature: "M. Alam",
        thursdayWeeklyRevision: "Completed",
      },
      monday: {
        sobok: { para: "14", page: "25" },
        sabakSeven: { para: "7", page: "12" },
        sabakAmukta: { para: "10", page: "17" },
        satSobok: { para: "5", page: "8", amount: "4", wrong: "2" },
        tilawaAmount: "5",
        teacherSignature: "M. Alam",
        thursdayWeeklyRevision: "Completed",
      },
      tuesday: {
        sobok: { para: "15", page: "26" },
        sabakSeven: { para: "8", page: "13" },
        sabakAmukta: { para: "11", page: "18" },
        satSobok: { para: "6", page: "9", amount: "5", wrong: "1" },
        tilawaAmount: "6",
        teacherSignature: "M. Alam",
        thursdayWeeklyRevision: "Completed",
      },
      wednesday: {
        sobok: { para: "16", page: "27" },
        sabakSeven: { para: "9", page: "14" },
        sabakAmukta: { para: "12", page: "19" },
        satSobok: { para: "7", page: "10", amount: "6", wrong: "0" },
        tilawaAmount: "7",
        teacherSignature: "M. Alam",
        thursdayWeeklyRevision: "Completed",
      },
      thursday: {
        sobok: { para: "17", page: "28" },
        sabakSeven: { para: "10", page: "15" },
        sabakAmukta: { para: "13", page: "20" },
        satSobok: { para: "8", page: "11", amount: "7", wrong: "2" },
        tilawaAmount: "8",
        teacherSignature: "M. Alam",
        thursdayWeeklyRevision: "Completed",
      },
    },
    status: "completed",
  },
  {
    id: 2,
    studentName: "Fatima Ahmed",
    reportDate: "2023-10-22",
    month: "October 2023",
    weeklyTarget: "7 pages",
    dailyEntries: {
      saturday: {
        sobok: { para: "15", page: "26" },
        sabakSeven: { para: "7", page: "12" },
        sabakAmukta: { para: "10", page: "17" },
        satSobok: { para: "5", page: "8", amount: "4", wrong: "2" },
        tilawaAmount: "5",
        teacherSignature: "S. Rahman",
        thursdayWeeklyRevision: "Partial",
      },
      sunday: {
        sobok: { para: "16", page: "27" },
        sabakSeven: { para: "8", page: "13" },
        sabakAmukta: { para: "11", page: "18" },
        satSobok: { para: "6", page: "9", amount: "5", wrong: "1" },
        tilawaAmount: "6",
        teacherSignature: "S. Rahman",
        thursdayWeeklyRevision: "Partial",
      },
      monday: {
        sobok: { para: "17", page: "28" },
        sabakSeven: { para: "9", page: "14" },
        sabakAmukta: { para: "12", page: "19" },
        satSobok: { para: "7", page: "10", amount: "6", wrong: "0" },
        tilawaAmount: "7",
        teacherSignature: "S. Rahman",
        thursdayWeeklyRevision: "Partial",
      },
      tuesday: {
        sobok: { para: "18", page: "29" },
        sabakSeven: { para: "10", page: "15" },
        sabakAmukta: { para: "13", page: "20" },
        satSobok: { para: "8", page: "11", amount: "7", wrong: "2" },
        tilawaAmount: "8",
        teacherSignature: "S. Rahman",
        thursdayWeeklyRevision: "Partial",
      },
      wednesday: {
        sobok: { para: "19", page: "30" },
        sabakSeven: { para: "11", page: "16" },
        sabakAmukta: { para: "14", page: "21" },
        satSobok: { para: "9", page: "12", amount: "8", wrong: "1" },
        tilawaAmount: "9",
        teacherSignature: "S. Rahman",
        thursdayWeeklyRevision: "Partial",
      },
      thursday: {
        sobok: { para: "20", page: "31" },
        sabakSeven: { para: "12", page: "17" },
        sabakAmukta: { para: "15", page: "22" },
        satSobok: { para: "10", page: "13", amount: "9", wrong: "0" },
        tilawaAmount: "10",
        teacherSignature: "S. Rahman",
        thursdayWeeklyRevision: "Partial",
      },
    },
    status: "in-progress",
  },
  // Add more mock reports as needed
]

type DailyEntry = {
  sobok: { para: string; page: string }
  sabakSeven?: { para: string; page: string }
  sabakAmukta: { para: string; page: string }
  satSobok: { para: string; page: string; amount: string; wrong: string }
  tilawaAmount: string
  teacherSignature: string
  thursdayWeeklyRevision: string
}

type Report = {
  id: number
  studentName: string
  reportDate: string
  month: string
  weeklyTarget: string
  dailyEntries: Record<string, DailyEntry>
  status: string
}

function HifzReportList() {
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [filteredReports, setFilteredReports] = useState<Report[]>(mockReports)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    const filtered = reports.filter(
      (report) =>
        report.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredReports(filtered)
  }, [searchTerm, reports])

  const handleViewReport = (report:any) => {
    setSelectedReport(report)
    setViewDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setViewDialogOpen(false)
    setSelectedReport(null)
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
        return "default"
    }
  }

  const formatDate = (dateString:any) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Box sx={{ flexGrow: 1, p: isMobile ? 1 : 3 }}>
      <AppBar position="static" color="default" elevation={1} sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hifz Reports
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
            sx={{ mr: 2 }}
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

      <Grid container spacing={3}>
        {filteredReports.map((report) => (
          <Grid item xs={12} key={report.id}>
            <Card
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                },
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: isMobile ? 2 : 0,
                    }}
                  >
                    <Chip
                      label={report.status.replace("-", " ")}
                      color={getStatusColor(report.status)}
                      size="small"
                      sx={{ mr: 1 }}
                    />
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

                {/* Summary Table */}
                <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: "grey.100" }}>
                        <TableCell>Day</TableCell>
                        <TableCell>Sobok (Para/Page)</TableCell>
                        <TableCell>Sat Sobok (Para/Page)</TableCell>
                        <TableCell>Sabak Amukta (Para/Page)</TableCell>
                        <TableCell>Tilawat</TableCell>
                        <TableCell>Teacher</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(report.dailyEntries).map(([day, data]) => (
                        <TableRow key={day}>
                          <TableCell sx={{ textTransform: "capitalize" }}>
                            {day}
                          </TableCell>
                          <TableCell>
                            {data.sobok.para}/{data.sobok.page}
                          </TableCell>
                          <TableCell>
                            {data.satSobok.para}/{data.satSobok.page}
                          </TableCell>
                          <TableCell>
                            {data.sabakAmukta.para}/{data.sabakAmukta.page}
                          </TableCell>
                          <TableCell>{data.tilawaAmount}</TableCell>
                          <TableCell>{data.teacherSignature}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        ))}
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
        <DialogTitle sx={{ display: isMobile ? "none" : "block" }}>
          Hifz Report Details
        </DialogTitle>
        <DialogContent dividers>
          {selectedReport && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                  {selectedReport.studentName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Date: {formatDate(selectedReport.reportDate)} | Month: {selectedReport.month}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Weekly Target: {selectedReport.weeklyTarget}
                </Typography>
                <Chip
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
                      <TableCell>Sobok (Para/Page)</TableCell>
                      <TableCell>Sabak Seven (Para/Page)</TableCell>
                      <TableCell>Sabak Amukta (Para/Page)</TableCell>
                      <TableCell>Sat Sobok (Para/Page/Amount/Wrong)</TableCell>
                      <TableCell>Tilawat</TableCell>
                      <TableCell>Teacher Signature</TableCell>
                      <TableCell>Weekly Revision</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(selectedReport.dailyEntries).map(([day, data]) => (
                      <TableRow key={day}>
                        <TableCell sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                          {day}
                        </TableCell>
                        <TableCell>
                          55/3 page 
                        </TableCell>
                        <TableCell>
                         4 para/4 page 
                        </TableCell>
                        <TableCell>
                          4 para / 4 page
                        </TableCell>
                        <TableCell>
                          {data.satSobok.para}/{data.satSobok.page}/{data.satSobok.amount}/
                          {data.satSobok.wrong}
                        </TableCell>
                        <TableCell>{data.tilawaAmount}</TableCell>
                        <TableCell>{data.teacherSignature}</TableCell>
                        <TableCell>{data.thursdayWeeklyRevision}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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

export default HifzReportList