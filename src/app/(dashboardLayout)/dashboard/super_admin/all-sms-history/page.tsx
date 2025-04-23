/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Button,
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Avatar,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Pagination,
  InputAdornment,
  Tooltip,
  Badge,
  useTheme,
  alpha,
} from "@mui/material"
import {
  Home as HomeIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  ContentCopy as ContentCopyIcon,
  WhatsApp as WhatsAppIcon,
  Message as MessageIcon,
  Phone as PhoneIcon,
  CalendarMonth as CalendarIcon,
  School as SchoolIcon,
} from "@mui/icons-material"

// Mock data for SMS history
const mockSmsData = [
  {
    id: 1,
    mobile: "8801905086369",
    message:
      "Craft International Institute সে আপনার সন্তানের ভর্তি সম্পন্ন হয়েছে। বিস্তারিত জানতে ভিজিট করুন আমাদের ওয়েবসাইট: https://craftinternationalinstitute.com",
    count: 0,
    date: "March 20, 2025, 1:25 p.m.",
    status: "Delivered",
  },
  {
    id: 2,
    mobile: "8801724796419",
    message:
      "Craft International Institute সে আপনার সন্তানের ভর্তি সম্পন্ন হয়েছে। বিস্তারিত জানতে ভিজিট করুন আমাদের ওয়েবসাইট: https://craftinternationalinstitute.com",
    count: 0,
    date: "March 16, 2025, 9:02 p.m.",
    status: "Delivered",
  },
  {
    id: 3,
    mobile: "8801609863841",
    message:
      "Craft International Institute সে আপনার সন্তানের ভর্তি সম্পন্ন হয়েছে। বিস্তারিত জানতে ভিজিট করুন আমাদের ওয়েবসাইট: https://craftinternationalinstitute.com",
    count: 0,
    date: "March 2, 2025, 9:47 a.m.",
    status: "Delivered",
  },
  {
    id: 4,
    mobile: "8801782271579",
    message:
      "Craft International Institute সে আপনার সন্তানের ভর্তি সম্পন্ন হয়েছে। বিস্তারিত জানতে ভিজিট করুন আমাদের ওয়েবসাইট: https://craftinternationalinstitute.com",
    count: 0,
    date: "March 2, 2025, 8:17 a.m.",
    status: "Delivered",
  },
  {
    id: 5,
    mobile: "8801770364622",
    message:
      "Craft International Institute সে আপনার সন্তানের ভর্তি সম্পন্ন হয়েছে। বিস্তারিত জানতে ভিজিট করুন আমাদের ওয়েবসাইট: https://craftinternationalinstitute.com",
    count: 0,
    date: "March 2, 2025, 8:13 a.m.",
    status: "Delivered",
  },
  {
    id: 6,
    mobile: "8801640311961",
    message:
      "Craft International Institute সে আপনার সন্তানের ভর্তি সম্পন্ন হয়েছে। বিস্তারিত জানতে ভিজিট করুন আমাদের ওয়েবসাইট: https://craftinternationalinstitute.com",
    count: 0,
    date: "March 2, 2025, 8:10 a.m.",
    status: "Failed",
  },
  {
    id: 7,
    mobile: "8801724453783",
    message:
      "Craft International Institute সে আপনার সন্তানের ভর্তি সম্পন্ন হয়েছে। বিস্তারিত জানতে ভিজিট করুন আমাদের ওয়েবসাইট: https://craftinternationalinstitute.com",
    count: 0,
    date: "March 2, 2025, 8:06 a.m.",
    status: "Delivered",
  },
  {
    id: 8,
    mobile: "8801830995745",
    message:
      "Craft International Institute সে আপনার সন্তানের ভর্তি সম্পন্ন হয়েছে। বিস্তারিত জানতে ভিজিট করুন আমাদের ওয়েবসাইট: https://craftinternationalinstitute.com",
    count: 0,
    date: "March 2, 2025, 8:02 a.m.",
    status: "Pending",
  },
  {
    id: 9,
    mobile: "8801940727375",
    message:
      "Craft International Institute সে আপনার সন্তানের ভর্তি সম্পন্ন হয়েছে। বিস্তারিত জানতে ভিজিট করুন আমাদের ওয়েবসাইট: https://craftinternationalinstitute.com",
    count: 0,
    date: "March 2, 2025, 7:59 a.m.",
    status: "Delivered",
  },
  {
    id: 10,
    mobile: "01309322088",
    message:
      "Craft International Institute সে আপনার সন্তানের ভর্তি সম্পন্ন হয়েছে। বিস্তারিত জানতে ভিজিট করুন আমাদের ওয়েবসাইট: https://craftinternationalinstitute.com",
    count: 0,
    date: "March 2, 2025, 7:55 a.m.",
    status: "Delivered",
  },
]

export default function SmsHistoryPage() {
  const theme = useTheme()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("2025-04-14")
  const [mobile, setMobile] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [page, setPage] = useState(1)
  const [smsData, setSmsData] = useState(mockSmsData)
  const [filteredData, setFilteredData] = useState(mockSmsData)
  const [totalSms, setTotalSms] = useState(81)
  const [messageType, setMessageType] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  const rowsPerPage = 10
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)

  const handleSearch = () => {
    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Filter data based on search criteria
      const filtered = smsData.filter((sms) => {
        const mobileMatch = mobile ? sms.mobile.includes(mobile) : true
        const statusMatch = statusFilter !== "all" ? sms.status === statusFilter : true
        const typeMatch = messageType !== "all" ? true : true // Add logic for message type if needed

        // Date filtering would go here in a real implementation

        return mobileMatch && statusMatch && typeMatch
      })

      setFilteredData(filtered)
      setTotalSms(filtered.length)
      setPage(1)
      setIsLoading(false)
    }, 500)
  }

  const handleReset = () => {
    setStartDate("")
    setEndDate("2025-04-14")
    setMobile("")
    setSelectedClass("all")
    setMessageType("all")
    setStatusFilter("all")
    setFilteredData(smsData)
    setTotalSms(smsData.length)
    setPage(1)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusChipColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "success"
      case "Failed":
        return "error"
      case "Pending":
        return "warning"
      default:
        return "default"
    }
  }

  // Calculate displayed rows based on pagination
  const displayedRows = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: "white" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" size="small">
              Dashboard
            </Button>
            <Button variant="outlined" size="small">
              Branch
            </Button>
            <Button variant="outlined" size="small">
              + New
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton size="small">
              <HomeIcon />
            </IconButton>
            <IconButton size="small">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#e0e0e0" }}>
                <PersonIcon fontSize="small" />
              </Avatar>
              <Typography variant="body2" sx={{ ml: 1 }}>
                Craft International Institute
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Title */}
      <Box sx={{ bgcolor: "#f9f9f9", py: 2, px: 3, borderBottom: "1px solid #e0e0e0" }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          SMS History
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
        {/* Search Filters */}
        <Card elevation={1} sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  fullWidth
                  size="small"
                  placeholder="Enter mobile number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Class</InputLabel>
                  <Select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    label="Class"
                    startAdornment={
                      <InputAdornment position="start">
                        <SchoolIcon fontSize="small" color="action" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="all">All Classes</MenuItem>
                    <MenuItem value="8">Class 8</MenuItem>
                    <MenuItem value="9">Class 9</MenuItem>
                    <MenuItem value="10">Class 10</MenuItem>
                    <MenuItem value="11">Class 11</MenuItem>
                    <MenuItem value="12">Class 12</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Message Type</InputLabel>
                  <Select
                    value={messageType}
                    onChange={(e) => setMessageType(e.target.value)}
                    label="Message Type"
                    startAdornment={
                      <InputAdornment position="start">
                        <MessageIcon fontSize="small" color="action" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="admission">Admission</MenuItem>
                    <MenuItem value="fee">Fee Reminder</MenuItem>
                    <MenuItem value="exam">Exam Notice</MenuItem>
                    <MenuItem value="attendance">Attendance</MenuItem>
                    <MenuItem value="general">General</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Failed">Failed</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    startIcon={<SearchIcon />}
                    sx={{ bgcolor: "#2196f3" }}
                  >
                    Search
                  </Button>
                  <Button variant="outlined" onClick={handleReset} startIcon={<RefreshIcon />}>
                    Reset
                  </Button>
                  <Button variant="outlined" color="success" startIcon={<DownloadIcon />}>
                    Export
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* SMS Stats */}
        <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              flex: 1,
              display: "flex",
              alignItems: "center",
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              borderLeft: `4px solid ${theme.palette.primary.main}`,
            }}
          >
            <MessageIcon color="primary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {totalSms}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total SMS Sent
              </Typography>
            </Box>
          </Paper>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              flex: 1,
              display: "flex",
              alignItems: "center",
              bgcolor: alpha(theme.palette.success.main, 0.1),
              borderLeft: `4px solid ${theme.palette.success.main}`,
            }}
          >
            <Badge badgeContent="✓" color="success" sx={{ mr: 2 }}>
              <MessageIcon color="success" />
            </Badge>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {filteredData.filter((sms) => sms.status === "Delivered").length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Delivered
              </Typography>
            </Box>
          </Paper>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              flex: 1,
              display: "flex",
              alignItems: "center",
              bgcolor: alpha(theme.palette.warning.main, 0.1),
              borderLeft: `4px solid ${theme.palette.warning.main}`,
            }}
          >
            <Badge badgeContent="⏱" color="warning" sx={{ mr: 2 }}>
              <MessageIcon color="warning" />
            </Badge>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {filteredData.filter((sms) => sms.status === "Pending").length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Pending
              </Typography>
            </Box>
          </Paper>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              flex: 1,
              display: "flex",
              alignItems: "center",
              bgcolor: alpha(theme.palette.error.main, 0.1),
              borderLeft: `4px solid ${theme.palette.error.main}`,
            }}
          >
            <Badge badgeContent="✕" color="error" sx={{ mr: 2 }}>
              <MessageIcon color="error" />
            </Badge>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {filteredData.filter((sms) => sms.status === "Failed").length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Failed
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* SMS Table */}
        <Paper elevation={1}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell width="15%">Mobile</TableCell>
                  <TableCell width="55%">SMS</TableCell>
                  <TableCell width="10%" align="center">
                    Count
                  </TableCell>
                  <TableCell width="15%">Date</TableCell>
                  <TableCell width="5%" align="center">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  // Loading state - show skeleton rows
                  Array.from(new Array(10)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={5} sx={{ height: 53 }}>
                        <Box
                          sx={{
                            bgcolor: "#f0f0f0",
                            height: 20,
                            width: "100%",
                            borderRadius: 1,
                            animation: "pulse 1.5s infinite ease-in-out",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : displayedRows.length > 0 ? (
                  displayedRows.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body2">{row.mobile}</Typography>
                          <Tooltip title="Copy number">
                            <IconButton size="small" onClick={() => copyToClipboard(row.mobile)}>
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="WhatsApp">
                            <IconButton
                              size="small"
                              sx={{ color: "#25D366" }}
                              onClick={() => window.open(`https://wa.me/${row.mobile}`, "_blank")}
                            >
                              <WhatsAppIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            maxHeight: "2.5em",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {row.message}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{row.count}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.status}
                          size="small"
                          color={getStatusChipColor(row.status) as any}
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="textSecondary">
                        No SMS records found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2, borderTop: "1px solid #e0e0e0" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              size="small"
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}
