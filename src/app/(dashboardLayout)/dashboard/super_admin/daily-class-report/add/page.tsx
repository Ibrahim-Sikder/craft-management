/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  Select,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
  Divider,
  type SelectChangeEvent,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Tooltip,
  Chip,
  Fade,
  Zoom,
  LinearProgress,
} from "@mui/material"
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Print as PrintIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Assignment as AssignmentIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material"
import Link from "next/link"

type ReportRow = {
  id: number
  subject: string
  class: string
  fullyLearned: number
  partiallyLearned: number
  notLearned: number
  lessonDetails: string
  homework: string
  diaryCompleted: "হ্যাঁ" | "না"
}

export default function BengaliDailyClassReport() {
  const [loading, setLoading] = useState(false)
  const [teacherName, setTeacherName] = useState("")
  const [date, setDate] = useState("")
  const [saveProgress, setSaveProgress] = useState(0)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  })

  // Initial rows with empty data
  const [rows, setRows] = useState<ReportRow[]>([
    {
      id: 1,
      subject: "",
      class: "",
      fullyLearned: 0,
      partiallyLearned: 0,
      notLearned: 0,
      lessonDetails: "",
      homework: "",
      diaryCompleted: "না",
    },
    {
      id: 2,
      subject: "",
      class: "",
      fullyLearned: 0,
      partiallyLearned: 0,
      notLearned: 0,
      lessonDetails: "",
      homework: "",
      diaryCompleted: "না",
    },
    {
      id: 3,
      subject: "",
      class: "",
      fullyLearned: 0,
      partiallyLearned: 0,
      notLearned: 0,
      lessonDetails: "",
      homework: "",
      diaryCompleted: "না",
    },
    {
      id: 4,
      subject: "",
      class: "",
      fullyLearned: 0,
      partiallyLearned: 0,
      notLearned: 0,
      lessonDetails: "",
      homework: "",
      diaryCompleted: "না",
    },
    {
      id: 5,
      subject: "",
      class: "",
      fullyLearned: 0,
      partiallyLearned: 0,
      notLearned: 0,
      lessonDetails: "",
      homework: "",
      diaryCompleted: "না",
    },
  ])

  // Handle input changes for teacher name and date
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === "teacherName") {
      setTeacherName(value)
    } else if (name === "date") {
      setDate(value)
    }
  }

  // Handle changes to row data
  const handleRowChange = (id: number, field: keyof ReportRow, value: any) => {
    setRows((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

  // Add a new row
  const handleAddRow = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1
    setRows([
      ...rows,
      {
        id: newId,
        subject: "",
        class: "",
        fullyLearned: 0,
        partiallyLearned: 0,
        notLearned: 0,
        lessonDetails: "",
        homework: "",
        diaryCompleted: "না",
      },
    ])
  }

  // Remove a row
  const handleRemoveRow = (id: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id))
    } else {
      setSnackbar({
        open: true,
        message: "কমপক্ষে একটি সারি থাকতে হবে",
        severity: "warning",
      })
    }
  }

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    // Progress simulation
    const timer = setInterval(() => {
      setSaveProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + 20, 100)
        if (newProgress === 100) {
          clearInterval(timer)
          setTimeout(() => {
            setLoading(false)
            setSaveProgress(0)
            setSnackbar({
              open: true,
              message: "রিপোর্ট সফলভাবে সংরক্ষণ করা হয়েছে",
              severity: "success",
            })
          }, 500)
        }
        return newProgress
      })
    }, 300)
  }

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Handle print
  const handlePrint = () => {
    window.print()
  }

  // Calculate total students
  const calculateTotal = (row: ReportRow) => {
    return row.fullyLearned + row.partiallyLearned + row.notLearned
  }

  // Calculate learning percentage
  const calculateLearningPercentage = (row: ReportRow) => {
    const total = calculateTotal(row)
    if (total === 0) return 0
    return Math.round((row.fullyLearned / total) * 100)
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Box
        sx={{
          p: 2,
          bgcolor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          "@media print": {
            display: "none",
          },
        }}
      >
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <MuiLink
            component={Link}
            href="#"
            underline="hover"
            color="inherit"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Dashboard
          </MuiLink>
          <MuiLink
            component={Link}
            href="/daily-class-report"
            underline="hover"
            color="inherit"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AssignmentIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Daily Class Reports
          </MuiLink>
          <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
            Bengali Report Format
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Report Form */}
      <Container
        maxWidth="xl"
        sx={{
          my: 4,
          flexGrow: 1,
          "@media print": {
            my: 0,
            px: 0,
            maxWidth: "100%",
          },
        }}
      >
        <Box
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "@media print": {
              display: "none",
            },
          }}
        >
          <Button
            component={Link}
            href="/daily-class-report"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            Back to List
          </Button>
          <Box>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              sx={{
                mr: 2,
                borderRadius: "8px",
                textTransform: "none",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              Print Report
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={loading ? null : <CloudUploadIcon />}
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                boxShadow: "0 4px 6px rgba(79, 70, 229, 0.25)",
                "&:hover": {
                  boxShadow: "0 6px 8px rgba(79, 70, 229, 0.3)",
                },
              }}
            >
              {loading ? "Saving..." : "Save Report"}
            </Button>
          </Box>
        </Box>

        {loading && (
          <Box sx={{ width: "100%", mb: 3 }}>
            <LinearProgress
              variant="determinate"
              value={saveProgress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: "#e2e8f0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#4f46e5",
                },
              }}
            />
          </Box>
        )}

        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)",
            overflow: "hidden",
            "@media print": {
              boxShadow: "none",
              border: "none",
            },
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            <form onSubmit={handleSubmit}>
              {/* Report Header */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Zoom in={true} style={{ transitionDelay: "100ms" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      fontSize: { xs: "1.5rem", sm: "2rem" },
                      color: "#1e293b",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    ক্রাফট ইন্টারন্যাশনাল ইন্সটিটিউট
                  </Typography>
                </Zoom>
                <Zoom in={true} style={{ transitionDelay: "200ms" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      mb: 3,
                      fontSize: { xs: "1.1rem", sm: "1.25rem" },
                      color: "#475569",
                    }}
                  >
                    (দৈনিক শিক্ষার্থী ক্লাস রিপোর্ট)
                  </Typography>
                </Zoom>

                <Divider sx={{ mb: 4, borderColor: "#e2e8f0" }} />

                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", sm: "flex-start" } }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ mr: 2, minWidth: "120px", fontWeight: 600, color: "#475569" }}
                      >
                        শিক্ষকের নাম:
                      </Typography>
                      <TextField
                        name="teacherName"
                        value={teacherName}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{
                          maxWidth: "300px",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            backgroundColor: "#ffffff",
                            "&:hover fieldset": {
                              borderColor: "#6366f1",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#4f46e5",
                            },
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", sm: "flex-end" } }}
                    >
                      <Typography variant="subtitle1" sx={{ mr: 2, fontWeight: 600, color: "#475569" }}>
                        তারিখ:
                      </Typography>
                      <TextField
                        name="date"
                        type="date"
                        value={date}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          width: "200px",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            backgroundColor: "#ffffff",
                            "&:hover fieldset": {
                              borderColor: "#6366f1",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#4f46e5",
                            },
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* Report Table */}
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  mb: 4,
                  borderRadius: 2,
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="daily class report table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f1f5f9" }}>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          borderBottom: "2px solid #cbd5e1",
                          whiteSpace: "nowrap",
                          color: "#334155",
                          py: 2,
                        }}
                      >
                        ক্রম
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          borderBottom: "2px solid #cbd5e1",
                          whiteSpace: "nowrap",
                          color: "#334155",
                          py: 2,
                        }}
                      >
                        বিষয়
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          borderBottom: "2px solid #cbd5e1",
                          whiteSpace: "nowrap",
                          color: "#334155",
                          py: 2,
                        }}
                      >
                        শ্রেণি
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          borderBottom: "2px solid #cbd5e1",
                          whiteSpace: "nowrap",
                          color: "#334155",
                          py: 2,
                        }}
                      >
                        পাঠ মূল্যায়ন
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          borderBottom: "2px solid #cbd5e1",
                          whiteSpace: "nowrap",
                          color: "#334155",
                          py: 2,
                        }}
                      >
                        পাঠ বিবরণী
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          borderBottom: "2px solid #cbd5e1",
                          whiteSpace: "nowrap",
                          color: "#334155",
                          py: 2,
                        }}
                      >
                        বাড়ির কাজ
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          borderBottom: "2px solid #cbd5e1",
                          whiteSpace: "nowrap",
                          color: "#334155",
                          py: 2,
                        }}
                      >
                        ডায়েরী পূরণ
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          borderBottom: "2px solid #cbd5e1",
                          whiteSpace: "nowrap",
                          color: "#334155",
                          py: 2,
                          "@media print": {
                            display: "none",
                          },
                        }}
                      >
                        অ্যাকশন
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <Fade key={row.id} in={true} style={{ transitionDelay: `${index * 50}ms` }}>
                        <TableRow
                          sx={{
                            "&:nth-of-type(odd)": {
                              backgroundColor: "#f8fafc",
                            },
                            "&:hover": {
                              backgroundColor: "#f1f5f9",
                            },
                          }}
                        >
                          <TableCell
                            align="center"
                            sx={{
                              fontWeight: 500,
                              fontSize: "0.9rem",
                              whiteSpace: "nowrap",
                              color: "#475569",
                            }}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </TableCell>
                          <TableCell>
                            <FormControl fullWidth size="small">
                              <Select
                                value={row.subject}
                                onChange={(e: SelectChangeEvent) => handleRowChange(row.id, "subject", e.target.value)}
                                displayEmpty
                                sx={{
                                  borderRadius: 2,
                                  backgroundColor: "#ffffff",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#cbd5e1",
                                  },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#6366f1",
                                  },
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#4f46e5",
                                  },
                                }}
                              >
                                <MenuItem value="">
                                  <em>বিষয় নির্বাচন করুন</em>
                                </MenuItem>
                                <MenuItem value="গণিত">গণিত</MenuItem>
                                <MenuItem value="বাংলা">বাংলা</MenuItem>
                                <MenuItem value="ইংরেজি">ইংরেজি</MenuItem>
                                <MenuItem value="বিজ্ঞান">বিজ্ঞান</MenuItem>
                                <MenuItem value="সমাজ বিজ্ঞান">সমাজ বিজ্ঞান</MenuItem>
                                <MenuItem value="ইসলাম শিক্ষা">ইসলাম শিক্ষা</MenuItem>
                                <MenuItem value="হিন্দু ধর্ম">হিন্দু ধর্ম</MenuItem>
                                <MenuItem value="তথ্য ও যোগাযোগ প্রযুক্তি">তথ্য ও যোগাযোগ প্রযুক্তি</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <FormControl fullWidth size="small">
                              <Select
                                value={row.class}
                                onChange={(e: SelectChangeEvent) => handleRowChange(row.id, "class", e.target.value)}
                                displayEmpty
                                sx={{
                                  borderRadius: 2,
                                  backgroundColor: "#ffffff",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#cbd5e1",
                                  },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#6366f1",
                                  },
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#4f46e5",
                                  },
                                }}
                              >
                                <MenuItem value="">
                                  <em>শ্রেণি নির্বাচন করুন</em>
                                </MenuItem>
                                <MenuItem value="১">১</MenuItem>
                                <MenuItem value="২">২</MenuItem>
                                <MenuItem value="৩">৩</MenuItem>
                                <MenuItem value="৪">৪</MenuItem>
                                <MenuItem value="৫">৫</MenuItem>
                                <MenuItem value="৬">৬</MenuItem>
                                <MenuItem value="৭">৭</MenuItem>
                                <MenuItem value="৮">৮</MenuItem>
                                <MenuItem value="৯">৯</MenuItem>
                                <MenuItem value="১০">১০</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <Card
                              variant="outlined"
                              sx={{
                                p: 1,
                                borderRadius: 2,
                                borderColor: "#e2e8f0",
                                backgroundColor: "#ffffff",
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <Typography variant="body2" sx={{ mr: 1, minWidth: "150px", color: "#475569" }}>
                                  ভাল শিখেছে
                                </Typography>
                                <TextField
                                  type="number"
                                  size="small"
                                  value={row.fullyLearned}
                                  onChange={(e) =>
                                    handleRowChange(row.id, "fullyLearned", Number.parseInt(e.target.value) || 0)
                                  }
                                  InputProps={{
                                    inputProps: { min: 0 },
                                    sx: {
                                      borderRadius: 1.5,
                                      backgroundColor: "#f8fafc",
                                    },
                                  }}
                                  sx={{
                                    width: "80px",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#cbd5e1",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#6366f1",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#4f46e5",
                                    },
                                  }}
                                />
                                <Typography variant="body2" sx={{ ml: 1, color: "#475569" }}>
                                  জন
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <Typography variant="body2" sx={{ mr: 1, minWidth: "150px", color: "#475569" }}>
                                  আংশিক শিখেছে
                                </Typography>
                                <TextField
                                  type="number"
                                  size="small"
                                  value={row.partiallyLearned}
                                  onChange={(e) =>
                                    handleRowChange(row.id, "partiallyLearned", Number.parseInt(e.target.value) || 0)
                                  }
                                  InputProps={{
                                    inputProps: { min: 0 },
                                    sx: {
                                      borderRadius: 1.5,
                                      backgroundColor: "#f8fafc",
                                    },
                                  }}
                                  sx={{
                                    width: "80px",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#cbd5e1",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#6366f1",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#4f46e5",
                                    },
                                  }}
                                />
                                <Typography variant="body2" sx={{ ml: 1, color: "#475569" }}>
                                  জন
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="body2" sx={{ mr: 1, minWidth: "150px", color: "#475569" }}>
                                  ভাল শিখেনি
                                </Typography>
                                <TextField
                                  type="number"
                                  size="small"
                                  value={row.notLearned}
                                  onChange={(e) =>
                                    handleRowChange(row.id, "notLearned", Number.parseInt(e.target.value) || 0)
                                  }
                                  InputProps={{
                                    inputProps: { min: 0 },
                                    sx: {
                                      borderRadius: 1.5,
                                      backgroundColor: "#f8fafc",
                                    },
                                  }}
                                  sx={{
                                    width: "80px",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#cbd5e1",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#6366f1",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#4f46e5",
                                    },
                                  }}
                                />
                                <Typography variant="body2" sx={{ ml: 1, color: "#475569" }}>
                                  জন
                                </Typography>
                              </Box>

                              {calculateTotal(row) > 0 && (
                                <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                                  <Typography variant="body2" sx={{ mr: 1, color: "#475569" }}>
                                    শিখন হার:
                                  </Typography>
                                  <Chip
                                    label={`${calculateLearningPercentage(row)}%`}
                                    size="small"
                                    color={
                                      calculateLearningPercentage(row) > 70
                                        ? "success"
                                        : calculateLearningPercentage(row) > 40
                                          ? "warning"
                                          : "error"
                                    }
                                    sx={{ fontWeight: 600 }}
                                  />
                                  <Typography variant="caption" sx={{ ml: 1, color: "#64748b" }}>
                                    (মোট {calculateTotal(row)} জন)
                                  </Typography>
                                </Box>
                              )}
                            </Card>
                          </TableCell>
                          <TableCell>
                            <TextField
                              multiline
                              rows={3}
                              fullWidth
                              size="small"
                              value={row.lessonDetails}
                              onChange={(e) => handleRowChange(row.id, "lessonDetails", e.target.value)}
                              placeholder="পাঠের বিবরণ লিখুন"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                  backgroundColor: "#ffffff",
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#6366f1",
                                  },
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#4f46e5",
                                  },
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              multiline
                              rows={3}
                              fullWidth
                              size="small"
                              value={row.homework}
                              onChange={(e) => handleRowChange(row.id, "homework", e.target.value)}
                              placeholder="বাড়ির কাজের বিবরণ লিখুন"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                  backgroundColor: "#ffffff",
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#6366f1",
                                  },
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#4f46e5",
                                  },
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <RadioGroup
                              row
                              value={row.diaryCompleted}
                              onChange={(e) => handleRowChange(row.id, "diaryCompleted", e.target.value as "হ্যাঁ" | "না")}
                              sx={{ justifyContent: "center" }}
                            >
                              <FormControlLabel
                                value="হ্যাঁ"
                                control={
                                  <Radio
                                    size="small"
                                    sx={{ color: "#6366f1", "&.Mui-checked": { color: "#4f46e5" } }}
                                  />
                                }
                                label="হ্যাঁ"
                              />
                              <FormControlLabel
                                value="না"
                                control={
                                  <Radio
                                    size="small"
                                    sx={{ color: "#6366f1", "&.Mui-checked": { color: "#4f46e5" } }}
                                  />
                                }
                                label="না"
                              />
                            </RadioGroup>
                          </TableCell>
                          <TableCell align="center" sx={{ "@media print": { display: "none" } }}>
                            <Tooltip title="সারি মুছুন">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleRemoveRow(row.id)}
                                sx={{ mr: 1 }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      </Fade>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Add Row Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 4,
                  "@media print": { display: "none" },
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddRow}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    borderColor: "#6366f1",
                    color: "#4f46e5",
                    "&:hover": {
                      borderColor: "#4f46e5",
                      backgroundColor: "rgba(99, 102, 241, 0.04)",
                    },
                  }}
                >
                  নতুন সারি যোগ করুন
                </Button>
              </Box>

              {/* Signature Section */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, px: { xs: 2, sm: 6 } }}>
                <Box sx={{ textAlign: "center" }}>
                  <Divider sx={{ width: "150px", borderStyle: "dashed" }} />
                  <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 500, color: "#475569" }}>
                    সমন্বয়কারী
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Divider sx={{ width: "150px", borderStyle: "dashed" }} />
                  <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 500, color: "#475569" }}>
                    পরিচালক
                  </Typography>
                </Box>
              </Box>

              {/* Submit Button - Only visible in non-print mode */}
              <Box
                sx={{
                  mt: 6,
                  display: "flex",
                  justifyContent: "center",
                  "@media print": {
                    display: "none",
                  },
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={loading ? null : <SaveIcon />}
                  disabled={loading}
                  sx={{
                    px: 8,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                    boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.2)",
                    "&:hover": {
                      boxShadow: "0 15px 20px -3px rgba(79, 70, 229, 0.3)",
                    },
                  }}
                >
                  {loading ? "সংরক্ষণ করা হচ্ছে..." : "রিপোর্ট সংরক্ষণ করুন"}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{
          "@media print": {
            display: "none",
          },
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
