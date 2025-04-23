/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
  Button,
  Card,
  CardContent,
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  TextField,
} from "@mui/material"
import DownloadIcon from "@mui/icons-material/Download"
import PrintIcon from "@mui/icons-material/Print"
import VisibilityIcon from "@mui/icons-material/Visibility"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import FileExcelIcon from "@mui/icons-material/InsertDriveFile"

// Mock data for the statement preview
const mockFeeData = [
  {
    id: 1,
    studentId: "STD001",
    name: "John Smith",
    class: "10A",
    feeType: "Tuition",
    amount: 5000,
    date: "2023-11-01",
    status: "Paid",
  },
  {
    id: 2,
    studentId: "STD002",
    name: "Emily Johnson",
    class: "9B",
    feeType: "Admission",
    amount: 2500,
    date: "2023-11-03",
    status: "Paid",
  },
  {
    id: 3,
    studentId: "STD003",
    name: "Michael Brown",
    class: "11C",
    feeType: "Tuition",
    amount: 5000,
    date: "2023-11-05",
    status: "Pending",
  },
  {
    id: 4,
    studentId: "STD004",
    name: "Sarah Davis",
    class: "8A",
    feeType: "Transport",
    amount: 1200,
    date: "2023-11-07",
    status: "Paid",
  },
  {
    id: 5,
    studentId: "STD005",
    name: "David Wilson",
    class: "12B",
    feeType: "Exam",
    amount: 800,
    date: "2023-11-10",
    status: "Paid",
  },
]

export default function CollectFeeStatementPage() {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [feeType, setFeeType] = useState("all")
  const [paymentStatus, setPaymentStatus] = useState("all")
  const [class_, setClass] = useState("all")
  const [showPreview, setShowPreview] = useState(false)

  const handleDownload = (format: string) => {
  }

  const handleGeneratePreview = () => {
    // In a real app, this would fetch data from your API
    setShowPreview(true)
  }

  const isDateRangeValid = fromDate && toDate

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Box sx={{ bgcolor: "#f9f9f9", py: 2, px: 3, borderBottom: "1px solid #e0e0e0" }}>
        <Typography variant="h6" align="right" sx={{ fontWeight: 500 }}>
          INCOME STATEMENT
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
        <Card elevation={1}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Generate Fee Statement
                </Typography>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="From"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="To"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Fee Type</InputLabel>
                  <Select value={feeType} onChange={(e) => setFeeType(e.target.value)} label="Fee Type">
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="tuition">Tuition Fee</MenuItem>
                    <MenuItem value="admission">Admission Fee</MenuItem>
                    <MenuItem value="exam">Examination Fee</MenuItem>
                    <MenuItem value="transport">Transport Fee</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Class</InputLabel>
                  <Select value={class_} onChange={(e) => setClass(e.target.value)} label="Class">
                    <MenuItem value="all">All Classes</MenuItem>
                    <MenuItem value="8">Class 8</MenuItem>
                    <MenuItem value="9">Class 9</MenuItem>
                    <MenuItem value="10">Class 10</MenuItem>
                    <MenuItem value="11">Class 11</MenuItem>
                    <MenuItem value="12">Class 12</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} label="Status">
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="overdue">Overdue</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    onClick={handleGeneratePreview}
                    disabled={!isDateRangeValid}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleDownload("pdf")}
                    disabled={!isDateRangeValid}
                    sx={{ bgcolor: "#2196f3" }}
                  >
                    Download
                  </Button>
                  <Button variant="outlined" startIcon={<PrintIcon />} disabled={!isDateRangeValid}>
                    Print
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Export as:
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={() => handleDownload("pdf")}
                    disabled={!isDateRangeValid}
                  >
                    PDF
                  </Button>
                  <Button
                    size="small"
                    startIcon={<FileExcelIcon />}
                    onClick={() => handleDownload("excel")}
                    disabled={!isDateRangeValid}
                  >
                    Excel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Statement Preview */}
        {showPreview && (
          <Box sx={{ mt: 3 }}>
            <Paper elevation={1}>
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h6">Fee Collection Statement</Typography>
                  <Typography variant="body2">
                    Period: {fromDate} - {toDate}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Student ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Class</TableCell>
                        <TableCell>Fee Type</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockFeeData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.studentId}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.class}</TableCell>
                          <TableCell>{row.feeType}</TableCell>
                          <TableCell align="right">${row.amount.toLocaleString()}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.status}
                              size="small"
                              color={row.status === "Paid" ? "success" : "warning"}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                  <Stack spacing={2}>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Total Collected:{" "}
                        <strong>
                          $
                          {mockFeeData
                            .filter((item) => item.status === "Paid")
                            .reduce((sum, item) => sum + item.amount, 0)
                            .toLocaleString()}
                        </strong>
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Total Pending:{" "}
                        <strong>
                          $
                          {mockFeeData
                            .filter((item) => item.status === "Pending")
                            .reduce((sum, item) => sum + item.amount, 0)
                            .toLocaleString()}
                        </strong>
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="subtitle1">
                        Grand Total:{" "}
                        <strong>${mockFeeData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}</strong>
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  )
}


