/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  Box, Typography, Card, Grid, Button, Chip, Avatar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, InputAdornment, Tabs, Tab, Divider
} from "@mui/material"
import {
  Search, FilterList, Add, Visibility, Edit, Delete,
  Download, Print, ArrowUpward, ArrowDownward
} from "@mui/icons-material"

// Helper functions defined at the top level
const getStatusColor = (status:any) => {
  switch (status) {
    case "completed": return "success"
    case "in-progress": return "warning"
    case "pending": return "error"
    default: return "default"
  }
}

const getStatusText = (status:any) => {
  switch (status) {
    case "completed": return "Completed"
    case "in-progress": return "In Progress"
    case "pending": return "Pending"
    default: return "Unknown"
  }
}

// Mock data for demonstration
const mockReports = [
  {
    id: "1",
    studentName: "Ahmed Rahman",
    date: "2023-10-15",
    month: "October 2023",
    mistakes: 5,
    status: "completed",
    teacherComments: "Excellent progress this week. Showed great improvement in memorization.",
    lastUpdated: "2 days ago",
    sabakPara: "12",
    sabakPages: "2",
    sabaqSabakPara: "11",
    sabaqSabakPages: "3",
    aimutah: "Para 10 - 95%",
    tilawat: "Para 9 - 90%",
    shabina: "Para 1-5 - 98%"
  },
  {
    id: "2",
    studentName: "Fatima Khan",
    date: "2023-10-16",
    month: "October 2023",
    mistakes: 12,
    status: "in-progress",
    teacherComments: "Needs to focus on tajweed rules. Good effort overall.",
    lastUpdated: "1 day ago",
    sabakPara: "15",
    sabakPages: "1.5",
    sabaqSabakPara: "14",
    sabaqSabakPages: "2.5",
    aimutah: "Para 12 - 85%",
    tilawat: "Para 11 - 80%",
    shabina: "Para 6-10 - 92%"
  },
  {
    id: "3",
    studentName: "Mohammed Ali",
    date: "2023-10-14",
    month: "October 2023",
    mistakes: 3,
    status: "completed",
    teacherComments: "Perfect recitation. Maintain this consistency.",
    lastUpdated: "3 days ago",
    sabakPara: "18",
    sabakPages: "3",
    sabaqSabakPara: "17",
    sabaqSabakPages: "2",
    aimutah: "Para 15 - 98%",
    tilawat: "Para 14 - 96%",
    shabina: "Para 11-15 - 99%"
  },
  {
    id: "4",
    studentName: "Aisha Hassan",
    date: "2023-10-17",
    month: "October 2023",
    mistakes: 8,
    status: "pending",
    teacherComments: "Struggling with new verses. Needs extra practice.",
    lastUpdated: "Today",
    sabakPara: "21",
    sabakPages: "2",
    sabaqSabakPara: "20",
    sabaqSabakPages: "1.5",
    aimutah: "Para 18 - 75%",
    tilawat: "Para 17 - 70%",
    shabina: "Para 16-20 - 88%"
  },
  {
    id: "5",
    studentName: "Omar Farooq",
    date: "2023-10-13",
    month: "October 2023",
    mistakes: 15,
    status: "completed",
    teacherComments: "Improved significantly from last week. Keep it up!",
    lastUpdated: "4 days ago",
    sabakPara: "24",
    sabakPages: "2.5",
    sabaqSabakPara: "23",
    sabaqSabakPages: "2",
    aimutah: "Para 21 - 90%",
    tilawat: "Para 20 - 85%",
    shabina: "Para 21-24 - 93%"
  }
]

function TabPanel(props:any) {
  const { children, value, index, ...other } = props
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

function ReportsTable({
  reports,
  onView,
  onSort,
  sortConfig
}: {
  reports: Report[],
  onView: (report: Report) => void,
  onSort: (key: SortKey) => void,
  sortConfig: { key: SortKey, direction: 'asc' | 'desc' }
}) {
  const SortableHeader = ({ label, sortKey }: { label: string; sortKey: SortKey }) => (
    <TableCell 
      sx={{ fontWeight: "bold", cursor: "pointer", bgcolor: "#e8f5e9" }}
      onClick={() => onSort(sortKey)}
    >
      {label}
      {sortConfig.key === sortKey && (
        sortConfig.direction === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
      )}
    </TableCell>
  )

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <SortableHeader label="Student" sortKey="studentName" />
            <SortableHeader label="Date" sortKey="date" />
            <SortableHeader label="Month" sortKey="month" />
            <SortableHeader label="Mistakes" sortKey="mistakes" />
            <TableCell sx={{ fontWeight: "bold", bgcolor: "#e8f5e9" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold", bgcolor: "#e8f5e9" }}>Last Updated</TableCell>
            <TableCell sx={{ fontWeight: "bold", bgcolor: "#e8f5e9" }} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report:any) => (
            <TableRow key={report.id} hover>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ mr: 2, width: 32, height: 32, bgcolor: "#2e7d32" }}>
                    {report.studentName.charAt(0)}
                  </Avatar>
                  {report.studentName}
                </Box>
              </TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.month}</TableCell>
              <TableCell>{report.mistakes}</TableCell>
              <TableCell>
                <Chip 
                  label={getStatusText(report.status)} 
                  color={getStatusColor(report.status)} 
                  size="small" 
                />
              </TableCell>
              <TableCell>{report.lastUpdated}</TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={() => onView(report)}>
                  <Visibility />
                </IconButton>
                <IconButton color="secondary">
                  <Edit />
                </IconButton>
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {reports.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                <Typography variant="body1" color="textSecondary">
                  No reports found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

type Report = typeof mockReports[number];
type SortKey = keyof Report;

export default function HifzWeeklyReportsList() {
  const [reports] = useState<Report[]>(mockReports)
  const [selectedTab, setSelectedTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: SortKey, direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' })

  const handleTabChange = ( newValue: any) => {
    setSelectedTab(newValue)
  }

  const handleViewReport = (report: Report) => {
    setSelectedReport(report)
    setViewDialogOpen(true)
  }

  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const filteredReports = reports.filter(report => {
    if (selectedTab === 1 && report.status !== "completed") return false
    if (selectedTab === 2 && report.status !== "in-progress") return false
    if (selectedTab === 3 && report.status !== "pending") return false
    
    return report.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           report.month.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const sortedReports = [...filteredReports].sort((a, b) => {
    const key = sortConfig.key
    if (a[key] < b[key]) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (a[key] > b[key]) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
  })

  return (
    <Box sx={{ p: 3, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Header Section */}
      <Card sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 3, background: "linear-gradient(135deg, #1a5f23 0%, #2e7d32 100%)", color: "white" }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 1 }}>
          Craft International Institute
        </Typography>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          হিফজ শিক্ষার্থীদের সাপ্তাহিক রিপোর্ট তালিকা
        </Typography>
        <Typography variant="h6" align="center">
          Hifz Students Weekly Reports List
        </Typography>
      </Card>

      {/* Controls Section */}
      <Card sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search reports by student name or month..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button variant="outlined" startIcon={<FilterList />}>
              Filter
            </Button>
            <Button variant="outlined" startIcon={<Download />}>
              Export
            </Button>
            <Button variant="outlined" startIcon={<Print />}>
              Print
            </Button>
            <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: "#2e7d32" }}>
              New Report
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Tabs Section */}
      <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="All Reports" />
          <Tab label="Completed" />
          <Tab label="In Progress" />
          <Tab label="Pending" />
        </Tabs>
        <Divider />
        
        <TabPanel value={selectedTab} index={0}>
          <ReportsTable 
            reports={sortedReports} 
            onView={handleViewReport} 
            onSort={handleSort} 
            sortConfig={sortConfig}
          />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <ReportsTable 
            reports={sortedReports} 
            onView={handleViewReport} 
            onSort={handleSort} 
            sortConfig={sortConfig}
          />
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <ReportsTable 
            reports={sortedReports} 
            onView={handleViewReport} 
            onSort={handleSort} 
            sortConfig={sortConfig}
          />
        </TabPanel>
        <TabPanel value={selectedTab} index={3}>
          <ReportsTable 
            reports={sortedReports} 
            onView={handleViewReport} 
            onSort={handleSort} 
            sortConfig={sortConfig}
          />
        </TabPanel>
      </Card>

      {/* View Report Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "#2e7d32", color: "white" }}>
          <Typography variant="h6">
            {selectedReport?.studentName} s Report - {selectedReport?.month}
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 3 }}>
          {selectedReport && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Student Name</Typography>
                <Typography variant="body1" gutterBottom>{selectedReport.studentName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Date</Typography>
                <Typography variant="body1" gutterBottom>{selectedReport.date}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Month</Typography>
                <Typography variant="body1" gutterBottom>{selectedReport.month}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Mistakes</Typography>
                <Typography variant="body1" gutterBottom>{selectedReport.mistakes}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Status</Typography>
                <Chip 
                  label={getStatusText(selectedReport.status)} 
                  color={getStatusColor(selectedReport.status)} 
                  size="small" 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Last Updated</Typography>
                <Typography variant="body2">{selectedReport.lastUpdated}</Typography>
              </Grid>
              
              {/* Hifz-specific details */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, color: "#2e7d32" }}>
                  Hifz Progress Details
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Sabak (Current Lesson)</Typography>
                <Typography variant="body1" gutterBottom>Para {selectedReport.sabakPara}, {selectedReport.sabakPages} pages</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Sabaq Sabak (Previous Lesson)</Typography>
                <Typography variant="body1" gutterBottom>Para {selectedReport.sabaqSabakPara}, {selectedReport.sabaqSabakPages} pages</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Aimutah (Revision)</Typography>
                <Typography variant="body1" gutterBottom>{selectedReport.aimutah}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Tilawat (Recitation)</Typography>
                <Typography variant="body1" gutterBottom>{selectedReport.tilawat}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">Shabina (Night Revision)</Typography>
                <Typography variant="body1" gutterBottom>{selectedReport.shabina}</Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">Teacher Comments</Typography>
                <Typography variant="body1" sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  {selectedReport.teacherComments}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<Edit />}>Edit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}