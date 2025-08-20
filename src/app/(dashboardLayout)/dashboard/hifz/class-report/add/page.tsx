/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
} from "@mui/material"
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material"

interface ReportRow {
  id: string
  section: string
  lesson: string
  dailyFoundation: string
  weeklyFoundation: string
  teacherSignature: string
}

interface HifzReportFormProps {
  onBack: () => void
  onSave: (data: any) => void
}

const HifzReportForm: React.FC<HifzReportFormProps> = ({ onBack, onSave }) => {
  const [studentInfo, setStudentInfo] = useState({
    studentName: "",
    studentId: "",
    class: "",
    date: new Date().toISOString().split("T")[0],
    day: "",
  })

  const [reportRows, setReportRows] = useState<ReportRow[]>([
    // Sabak Jama section
    { id: "1", section: "সবক জমা", lesson: "দোয়া সংখ্যা", dailyFoundation: "", weeklyFoundation: "", teacherSignature: "" },
    { id: "2", section: "", lesson: "হালিল সংখ্যা", dailyFoundation: "", weeklyFoundation: "", teacherSignature: "" },
    { id: "3", section: "", lesson: "তাজভীদের বিষয়", dailyFoundation: "", weeklyFoundation: "", teacherSignature: "" },
    { id: "4", section: "", lesson: "মাসায়েলের বিষয়", dailyFoundation: "", weeklyFoundation: "", teacherSignature: "" },

    // Nurani/Qaida section
    {
      id: "5",
      section: "নূরানী/কায়েদা",
      lesson: "কায়েদার পৃষ্ঠা নং",
      dailyFoundation: "",
      weeklyFoundation: "",
      teacherSignature: "",
    },

    // Ampara section
    {
      id: "6",
      section: "আমপারা",
      lesson: "আয়া পারার পৃষ্ঠা নং/পারার নাম",
      dailyFoundation: "",
      weeklyFoundation: "",
      teacherSignature: "",
    },

    // Nazera section
    {
      id: "7",
      section: "নাযেরা",
      lesson: "পারা ও পৃষ্ঠা নং",
      dailyFoundation: "",
      weeklyFoundation: "",
      teacherSignature: "",
    },
    {
      id: "8",
      section: "",
      lesson: "সবক পারা ও পৃষ্ঠা নং",
      dailyFoundation: "",
      weeklyFoundation: "",
      teacherSignature: "",
    },
    {
      id: "9",
      section: "",
      lesson: "সাত সবক পারা ও পৃষ্ঠা নং",
      dailyFoundation: "",
      weeklyFoundation: "",
      teacherSignature: "",
    },

    // Hifz: Sabki section
    {
      id: "10",
      section: "হিফয: সবকী",
      lesson: "আমুখতা পারা ও পৃষ্ঠা নং",
      dailyFoundation: "",
      weeklyFoundation: "",
      teacherSignature: "",
    },
    { id: "11", section: "", lesson: "দৈনিক ভিত্তাওয়াত", dailyFoundation: "", weeklyFoundation: "", teacherSignature: "" },
    { id: "12", section: "", lesson: "সাপ্তাহিক পরীক্ষা", dailyFoundation: "", weeklyFoundation: "", teacherSignature: "" },

    // Hifz: Doharani section
    {
      id: "13",
      section: "হিফয: দোহরানী",
      lesson: "আমুখতা পারা ও পৃষ্ঠা নং",
      dailyFoundation: "",
      weeklyFoundation: "",
      teacherSignature: "",
    },
    { id: "14", section: "", lesson: "দৈনিক ভিত্তাওয়াত", dailyFoundation: "", weeklyFoundation: "", teacherSignature: "" },
  ])

  const days = ["শনিবার", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার"]

  const handleStudentInfoChange = (field: string, value: string) => {
    setStudentInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleRowChange = (id: string, field: keyof ReportRow, value: string) => {
    setReportRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

  const handleSave = () => {
    const reportData = {
      studentInfo,
      reportRows,
      createdAt: new Date().toISOString(),
    }
    onSave(reportData)
  }

  const getSectionColor = (section: string) => {
    switch (section) {
      case "সবক জমা":
        return "#e3f2fd"
      case "নূরানী/কায়েদা":
        return "#f3e5f5"
      case "আমপারা":
        return "#e8f5e8"
      case "নাযেরা":
        return "#fff3e0"
      case "হিফয: সবকী":
        return "#fce4ec"
      case "হিফয: দোহরানী":
        return "#e0f2f1"
      default:
        return "#ffffff"
    }
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
      <Card sx={{ mb: 3, background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)", color: "white" }}>
        <CardContent sx={{ textAlign: "center", py: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton onClick={onBack} sx={{ color: "white", mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              ক্রাফট ইন্টারন্যাশনাল ইনস্টিটিউট
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            নূরানী, নাযেরা ও হিফয শিক্ষার্থীদের দৈনিক ও সাপ্তাহিক রিপোর্ট
          </Typography>
          <Chip label="নতুন রিপোর্ট তৈরি করুন" sx={{ mt: 2, bgcolor: "rgba(255,255,255,0.2)", color: "white" }} />
        </CardContent>
      </Card>

      {/* Student Information */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>
            শিক্ষার্থীর তথ্য
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="শিক্ষার্থীর নাম"
                value={studentInfo.studentName}
                onChange={(e) => handleStudentInfoChange("studentName", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="আইডি নম্বর"
                value={studentInfo.studentId}
                onChange={(e) => handleStudentInfoChange("studentId", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="ক্লাস"
                value={studentInfo.class}
                onChange={(e) => handleStudentInfoChange("class", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="তারিখ"
                type="date"
                value={studentInfo.date}
                onChange={(e) => handleStudentInfoChange("date", e.target.value)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>বার</InputLabel>
                <Select
                  value={studentInfo.day}
                  onChange={(e) => handleStudentInfoChange("day", e.target.value)}
                  label="বার"
                >
                  {days.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Report Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>
            দৈনিক ও সাপ্তাহিক রিপোর্ট
          </Typography>

          <TableContainer component={Paper} sx={{ border: "2px solid #e0e0e0" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", minWidth: 120 }}>তারিখ</TableCell>
                  <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", minWidth: 100 }}>বার</TableCell>
                  <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", minWidth: 150 }}>বিভাগ</TableCell>
                  <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", minWidth: 200 }}>পড়ার পরিমাণ</TableCell>
                  <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", textAlign: "center" }} colSpan={2}>
                    ভিত্তিকরণ
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", minWidth: 150 }}>
                    শিক্ষকের স্বাক্ষর
                  </TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: "#f9f9f9" }}>
                  <TableCell sx={{ border: "1px solid #ddd" }}></TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}></TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}></TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}></TableCell>
                  <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", textAlign: "center", minWidth: 100 }}>
                    দৈনিক
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", textAlign: "center", minWidth: 100 }}>
                    সাপ্তাহিক
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportRows.map((row, index) => (
                  <TableRow key={row.id} sx={{ bgcolor: getSectionColor(row.section) }}>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {index === 0 ? (
                        <TextField
                          size="small"
                          type="date"
                          value={studentInfo.date}
                          onChange={(e) => handleStudentInfoChange("date", e.target.value)}
                          sx={{ minWidth: 120 }}
                        />
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {index === 0 ? (
                        <FormControl size="small" sx={{ minWidth: 100 }}>
                          <Select
                            value={studentInfo.day}
                            onChange={(e) => handleStudentInfoChange("day", e.target.value)}
                          >
                            {days.map((day) => (
                              <MenuItem key={day} value={day}>
                                {day}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd", fontWeight: row.section ? "bold" : "normal" }}>
                      {row.section}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={row.lesson}
                        onChange={(e) => handleRowChange(row.id, "lesson", e.target.value)}
                        placeholder={row.lesson}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={row.dailyFoundation}
                        onChange={(e) => handleRowChange(row.id, "dailyFoundation", e.target.value)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={row.weeklyFoundation}
                        onChange={(e) => handleRowChange(row.id, "weeklyFoundation", e.target.value)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={row.teacherSignature}
                        onChange={(e) => handleRowChange(row.id, "teacherSignature", e.target.value)}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} size="large" sx={{ px: 4 }}>
              রিপোর্ট সংরক্ষণ করুন
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default HifzReportForm
