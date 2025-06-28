/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Container,
  Fab,
} from "@mui/material"
import {
  Search,
  Add,
  Download,
  FilterList,
  Payment,
  Visibility,
  Close,
  People,
  AttachMoney,
  TrendingUp,
  Warning,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"

const GradientCard = styled(Card)(({ bgcolor }: { bgcolor: string }) => ({
  background: bgcolor,
  color: "white",
  borderRadius: "20px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },
}))

const GlassCard = styled(Card)({
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
})

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "20px",
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
  },
}))

export default function FeeCollection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [collectModalOpen, setCollectModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  const students = [
    {
      id: 1,
      name: "আহমেদ হাসান",
      class: "6A",
      roll: "01",
      feeAmount: 2500,
      paidAmount: 2500,
      dueAmount: 0,
      status: "Paid",
      lastPayment: "2024-01-15",
    },
    {
      id: 2,
      name: "ফাতিমা খাতুন",
      class: "6B",
      roll: "05",
      feeAmount: 2500,
      paidAmount: 1500,
      dueAmount: 1000,
      status: "Partial",
      lastPayment: "2024-01-10",
    },
    {
      id: 3,
      name: "রহিম উদ্দিন",
      class: "6C",
      roll: "12",
      feeAmount: 2500,
      paidAmount: 0,
      dueAmount: 2500,
      status: "Due",
      lastPayment: "-",
    },
    {
      id: 4,
      name: "সালমা বেগম",
      class: "6A",
      roll: "08",
      feeAmount: 2500,
      paidAmount: 2500,
      dueAmount: 0,
      status: "Paid",
      lastPayment: "2024-01-14",
    },
    {
      id: 5,
      name: "করিম মিয়া",
      class: "6B",
      roll: "15",
      feeAmount: 2500,
      paidAmount: 2000,
      dueAmount: 500,
      status: "Partial",
      lastPayment: "2024-01-12",
    },
  ]

  const getStatusChip = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <Chip
            label="পরিশোধিত"
            sx={{
              bgcolor: "#e8f5e8",
              color: "#2e7d32",
              fontWeight: 600,
              borderRadius: "20px",
            }}
          />
        )
      case "Partial":
        return (
          <Chip
            label="আংশিক"
            sx={{
              bgcolor: "#fff3e0",
              color: "#f57c00",
              fontWeight: 600,
              borderRadius: "20px",
            }}
          />
        )
      case "Due":
        return (
          <Chip
            label="বকেয়া"
            sx={{
              bgcolor: "#ffebee",
              color: "#d32f2f",
              fontWeight: 600,
              borderRadius: "20px",
            }}
          />
        )
      default:
        return <Chip label={status} />
    }
  }

  const handleCollectFee = (student: any) => {
    setSelectedStudent(student)
    setCollectModalOpen(true)
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6 }}>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(135deg, #2196F3 0%, #1976d2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Fee Collection
            </Typography>
            <Typography variant="h6" sx={{ color: "#666", fontWeight: 500 }}>
              বেতন আদায় ব্যবস্থাপনা - ছাত্রদের বেতন সংগ্রহ ও ট্র্যাকিং
            </Typography>
          </Box>
          <Fab
            variant="extended"
            sx={{
              background: "linear-gradient(135deg, #2196F3 0%, #1976d2 100%)",
              color: "white",
              px: 4,
              py: 2,
              borderRadius: "50px",
              boxShadow: "0 8px 25px rgba(33, 150, 243, 0.3)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 35px rgba(33, 150, 243, 0.4)",
              },
            }}
          >
            <Add sx={{ mr: 1 }} />
            Collect Fee
          </Fab>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <GradientCard bgcolor="linear-gradient(135deg, #2196F3 0%, #1976d2 100%)">
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      মোট ছাত্র সংখ্যা
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      90
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <People sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </GradientCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <GradientCard bgcolor="linear-gradient(135deg, #4CAF50 0%, #45a049 100%)">
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      আদায়কৃত বেতন
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      ৳ 1,90,000
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <AttachMoney sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </GradientCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <GradientCard bgcolor="linear-gradient(135deg, #f44336 0%, #d32f2f 100%)">
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      বকেয়া পরিমাণ
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      ৳ 35,000
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <Warning sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </GradientCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <GradientCard bgcolor="linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)">
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      আদায়ের হার
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      84%
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
                    <TrendingUp sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </GradientCard>
          </Grid>
        </Grid>

        {/* Fee Collection Management */}
        <GlassCard>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Fee Collection Management
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
              ছাত্রদের বেতন আদায়ের তালিকা ও ব্যবস্থাপনা
            </Typography>

            {/* Filters */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="ছাত্রের নাম বা রোল নম্বর লিখুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select
                    value={classFilter}
                    label="Class"
                    onChange={(e) => setClassFilter(e.target.value)}
                    sx={{ borderRadius: "15px" }}
                  >
                    <MenuItem value="all">All Classes</MenuItem>
                    <MenuItem value="6a">Class 6A</MenuItem>
                    <MenuItem value="6b">Class 6B</MenuItem>
                    <MenuItem value="6c">Class 6C</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{ borderRadius: "15px" }}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="partial">Partial</MenuItem>
                    <MenuItem value="due">Due</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FilterList />}
                  sx={{
                    height: "56px",
                    borderRadius: "15px",
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                    },
                  }}
                >
                  Filter
                </Button>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Download />}
                  sx={{
                    height: "56px",
                    borderRadius: "15px",
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                    },
                  }}
                >
                  Export
                </Button>
              </Grid>
            </Grid>

            {/* Students Table */}
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: "15px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Student Name (ছাত্রের নাম)</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Class & Roll</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Fee Amount (বেতন)</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Paid Amount (পরিশোধিত)</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Due Amount (বকেয়া)</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Last Payment</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow
                      key={student.id}
                      hover
                      sx={{
                        "&:hover": {
                          bgcolor: "#f8f9fa",
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {student.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {student.class} - {student.roll}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          ৳ {student.feeAmount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: "#4CAF50" }}>
                          ৳ {student.paidAmount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: "#f44336" }}>
                          ৳ {student.dueAmount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>{getStatusChip(student.status)}</TableCell>
                      <TableCell>
                        <Typography variant="body2">{student.lastPayment}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<Payment />}
                            onClick={() => handleCollectFee(student)}
                            sx={{
                              background: "linear-gradient(135deg, #2196F3 0%, #1976d2 100%)",
                              borderRadius: "20px",
                              px: 2,
                            }}
                          >
                            Collect
                          </Button>
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: "#e8f5e8",
                              color: "#2e7d32",
                              "&:hover": { bgcolor: "#c8e6c9" },
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </GlassCard>

        {/* Fee Collection Modal */}
        <StyledDialog open={collectModalOpen} onClose={() => setCollectModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ pb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#333" }}>
                Collect Fee
              </Typography>
              <IconButton onClick={() => setCollectModalOpen(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pb: 3 }}>
            {selectedStudent && (
              <Box sx={{ mt: 2 }}>
                <Paper
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: "15px",
                    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {selectedStudent.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                    Class: {selectedStudent.class} - Roll: {selectedStudent.roll}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="body2">Total Fee:</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        ৳ {selectedStudent.feeAmount.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2">Paid Amount:</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#4CAF50" }}>
                        ৳ {selectedStudent.paidAmount.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2">Due Amount:</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#f44336" }}>
                        ৳ {selectedStudent.dueAmount.toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Collection Amount (৳)"
                      placeholder="পরিমাণ লিখুন"
                      defaultValue={selectedStudent.dueAmount}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "15px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Payment Method</InputLabel>
                      <Select label="Payment Method" sx={{ borderRadius: "15px" }}>
                        <MenuItem value="cash">Cash (নগদ)</MenuItem>
                        <MenuItem value="bank">Bank Transfer (ব্যাংক ট্রান্সফার)</MenuItem>
                        <MenuItem value="check">Check (চেক)</MenuItem>
                        <MenuItem value="mobile">Mobile Banking (মোবাইল ব্যাংকিং)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Payment Date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "15px",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button
              onClick={() => setCollectModalOpen(false)}
              variant="outlined"
              sx={{
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                borderWidth: 2,
                "&:hover": { borderWidth: 2 },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setCollectModalOpen(false)}
              variant="contained"
              sx={{
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                background: "linear-gradient(135deg, #2196F3 0%, #1976d2 100%)",
                boxShadow: "0 4px 15px rgba(33, 150, 243, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(33, 150, 243, 0.4)",
                },
              }}
            >
              Collect Fee
            </Button>
          </DialogActions>
        </StyledDialog>
      </Box>
    </Container>
  )
}
