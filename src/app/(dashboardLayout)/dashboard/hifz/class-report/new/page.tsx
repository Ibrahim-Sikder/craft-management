/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Fab,
  Grid,
  Chip,
  Avatar,
  Divider,
} from "@mui/material"
import {
  Print,
  Download,
  Edit,
  Save,
  Add,
  Close,
  Visibility,
  Delete,
  Assignment,
  CalendarToday,
  School,
} from "@mui/icons-material"

interface StudentReportData {
  id: number
  studentName: string
  class: string
  section: string
  month: string
  year: string
  weeklyChallenge: {
    quranVerse: string
    hadithNumber: string
    tajweedRules: string
  }
  dailyData: Array<{
    date: string
    day: string
    quran: { page: string; performance: string; hadith: string; doa: string; tajweed: string; percent: string }
    revision: { page: string; performance: string; hadith: string; doa: string; tajweed: string; percent: string }
  }>
  teacherSignature: string
  total: string
  createdDate: string
}

const initialReports: StudentReportData[] = [
  {
    id: 1,
    studentName: "আহমেদ আলী খান",
    class: "হিফজ-১",
    section: "ক",
    month: "জানুয়ারি",
    year: "২০২৪",
    weeklyChallenge: {
      quranVerse: "সূরা আল-বাকারাহ",
      hadithNumber: "হাদীস নং ১-৫",
      tajweedRules: "মাদ্দ ও গুন্নাহ",
    },
    dailyData: [
      {
        date: "০১",
        day: "শনিবার",
        quran: { page: "১", performance: "৮৫%", hadith: "১", doa: "২", tajweed: "৯০%", percent: "৮৮%" },
        revision: { page: "৫", performance: "৮০%", hadith: "২", doa: "১", tajweed: "৮৫%", percent: "৮২%" },
      },
      {
        date: "০২",
        day: "রবিবার",
        quran: { page: "২", performance: "৯০%", hadith: "১", doa: "২", tajweed: "৯২%", percent: "৯১%" },
        revision: { page: "৬", performance: "৮৫%", hadith: "২", doa: "১", tajweed: "৮৮%", percent: "৮৬%" },
      },
    ],
    teacherSignature: "কারী মুহাম্মদ হাসান",
    total: "৮৭%",
    createdDate: "২০২ৄ-০১-২৫",
  },
  {
    id: 2,
    studentName: "ফাতিমা খাতুন",
    class: "হিফজ-২",
    section: "খ",
    month: "জানুয়ারি",
    year: "২০২৪",
    weeklyChallenge: {
      quranVerse: "সূরা আল-ইমরান",
      hadithNumber: "হাদীস নং ৬-১০",
      tajweedRules: "ইখফা ও ইদগাম",
    },
    dailyData: [],
    teacherSignature: "কারিয়া ফাতিমা বিবি",
    total: "৯২%",
    createdDate: "২০২৪-০১-২৫",
  },
]

export default function ClassReportFormat() {
  const [reports, setReports] = useState<StudentReportData[]>(initialReports)
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentReport, setCurrentReport] = useState<StudentReportData | null>(null)
  const [viewMode, setViewMode] = useState(false)

  const createNewReport = (): StudentReportData => ({
    id: Date.now(),
    studentName: "",
    class: "",
    section: "",
    month: "",
    year: "২০২৪",
    weeklyChallenge: {
      quranVerse: "",
      hadithNumber: "",
      tajweedRules: "",
    },
    dailyData: ["শনিবার", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার"].map((day, index) => ({
      date: "",
      day,
      quran: { page: "", performance: "", hadith: "", doa: "", tajweed: "", percent: "" },
      revision: { page: "", performance: "", hadith: "", doa: "", tajweed: "", percent: "" },
    })),
    teacherSignature: "",
    total: "",
    createdDate: new Date().toLocaleDateString("bn-BD"),
  })

  const handleOpen = (report?: StudentReportData) => {
    if (report) {
      setCurrentReport({ ...report })
      setViewMode(true)
    } else {
      setCurrentReport(createNewReport())
      setViewMode(false)
    }
    setEditMode(!report)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setCurrentReport(null)
    setEditMode(false)
    setViewMode(false)
  }

  const handleSave = () => {
    if (currentReport) {
      const existingIndex = reports.findIndex((r) => r.id === currentReport.id)
      if (existingIndex >= 0) {
        const newReports = [...reports]
        newReports[existingIndex] = currentReport
        setReports(newReports)
      } else {
        setReports([...reports, currentReport])
      }
    }
    setEditMode(false)
  }

  const handleDelete = (id: number) => {
    setReports(reports.filter((r) => r.id !== id))
  }

  const updateCurrentReport = (field: string, value: any) => {
    if (currentReport) {
      setCurrentReport({ ...currentReport, [field]: value })
    }
  }

  const updateDailyData = (dayIndex: number, section: "quran" | "revision", field: string, value: string) => {
    if (currentReport) {
      const newDailyData = [...currentReport.dailyData]
      newDailyData[dayIndex] = {
        ...newDailyData[dayIndex],
        [section]: {
          ...newDailyData[dayIndex][section],
          [field]: value,
        },
      }
      setCurrentReport({ ...currentReport, dailyData: newDailyData })
    }
  }

  const ReportModal = () => (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" alignItems="center">
          <Assignment sx={{ mr: 2 }} />
          <Typography variant="h6">
            {viewMode ? "ক্লাস রিপোর্ট দেখুন" : editMode ? "ক্লাস রিপোর্ট সম্পাদনা" : "নতুন ক্লাস রিপোর্ট"}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {currentReport && (
          <Box sx={{ p: 3, backgroundColor: "#f8f9fa" }}>
            {/* Header Section */}
            <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Box
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: 2,
                    p: 3,
                    mb: 3,
                    color: "white",
                  }}
                >
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    জামিয়াত ইসলামিয়াশন ইনস্টিটিউট
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    কার্যক্রম ও পূর্ণাঙ্গ ছাত্রদের মাসিক রিপোর্ট
                  </Typography>
                </Box>

                {editMode && (
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="ছাত্রের নাম"
                        value={currentReport.studentName}
                        onChange={(e) => updateCurrentReport("studentName", e.target.value)}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <TextField
                        fullWidth
                        label="শ্রেণী"
                        value={currentReport.class}
                        onChange={(e) => updateCurrentReport("class", e.target.value)}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <TextField
                        fullWidth
                        label="শাখা"
                        value={currentReport.section}
                        onChange={(e) => updateCurrentReport("section", e.target.value)}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <TextField
                        fullWidth
                        label="মাস"
                        value={currentReport.month}
                        onChange={(e) => updateCurrentReport("month", e.target.value)}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="বছর"
                        value={currentReport.year}
                        onChange={(e) => updateCurrentReport("year", e.target.value)}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                )}

                {!editMode && (
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={`${currentReport.studentName} - ${currentReport.class} (${currentReport.section})`}
                      color="primary"
                      sx={{ mr: 2, mb: 1 }}
                    />
                    <Chip label={`${currentReport.month} ${currentReport.year}`} color="secondary" sx={{ mb: 1 }} />
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Report Table */}
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                border: "2px solid #e0e0e0",
              }}
            >
              <Table sx={{ minWidth: 1000 }}>
                {/* Main Header */}
                <TableHead>
                  <TableRow sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center",
                        border: "1px solid rgba(255,255,255,0.2)",
                        py: 2,
                      }}
                    >
                      ছাত্রের নাম:
                    </TableCell>
                    <TableCell
                      colSpan={3}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      সাপ্তাহিক চ্যালেঞ্জ:
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      মাস:
                    </TableCell>
                  </TableRow>
                </TableHead>

                {/* Sub Headers */}
                <TableHead>
                  <TableRow sx={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
                    <TableCell
                      rowSpan={2}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        border: "1px solid rgba(255,255,255,0.2)",
                        verticalAlign: "middle",
                        fontSize: "14px",
                        minWidth: "80px",
                      }}
                    >
                      তারিখ
                    </TableCell>
                    <TableCell
                      rowSpan={2}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        border: "1px solid rgba(255,255,255,0.2)",
                        verticalAlign: "middle",
                        fontSize: "14px",
                        minWidth: "100px",
                      }}
                    >
                      বার
                    </TableCell>
                    <TableCell
                      colSpan={3}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        border: "1px solid rgba(255,255,255,0.2)",
                        fontSize: "14px",
                      }}
                    >
                      মুখস্থ বিষয়াবলী
                    </TableCell>
                    <TableCell
                      colSpan={6}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        border: "1px solid rgba(255,255,255,0.2)",
                        fontSize: "14px",
                      }}
                    >
                      কার্যক্রম
                    </TableCell>
                    <TableCell
                      colSpan={6}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        border: "1px solid rgba(255,255,255,0.2)",
                        fontSize: "14px",
                      }}
                    >
                      রিভিশন (সংখ্যা)
                    </TableCell>
                    <TableCell
                      rowSpan={2}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        border: "1px solid rgba(255,255,255,0.2)",
                        verticalAlign: "middle",
                        fontSize: "14px",
                        minWidth: "120px",
                      }}
                    >
                      শিক্ষকের স্বাক্ষর
                    </TableCell>
                    <TableCell
                      rowSpan={2}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        border: "1px solid rgba(255,255,255,0.2)",
                        verticalAlign: "middle",
                        fontSize: "14px",
                        minWidth: "80px",
                      }}
                    >
                      মোট
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}>
                    {[
                      "কুরআন নম্বর / সূরার নাম",
                      "হাদীস নম্বর",
                      "তাজবীদের নিয়ম",
                      "পৃষ্ঠা",
                      "পরিমান",
                      "হাদীস/দুয়া",
                      "দোয়া",
                      "তাজবীদ",
                      "কুরআন (%)",
                      "পৃষ্ঠা",
                      "পরিমান",
                      "হাদীস/দুয়া",
                      "দোয়া",
                      "তাজবীদ",
                      "কুরআন (%)",
                    ].map((header, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                          border: "1px solid rgba(255,255,255,0.2)",
                          fontSize: "11px",
                          minWidth: "70px",
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {/* Student Info Row */}
                  <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                    <TableCell colSpan={2} sx={{ border: "1px solid #ddd", p: 1 }}>
                      {editMode ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={currentReport.studentName}
                          onChange={(e) => updateCurrentReport("studentName", e.target.value)}
                          placeholder="ছাত্রের নাম"
                          sx={{ "& .MuiOutlinedInput-root": { fontSize: "14px", fontWeight: "bold" } }}
                        />
                      ) : (
                        <Typography variant="body2" fontWeight="bold" sx={{ fontSize: "14px" }}>
                          {currentReport.studentName}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd", p: 1 }}>
                      {editMode ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={currentReport.weeklyChallenge.quranVerse}
                          onChange={(e) =>
                            updateCurrentReport("weeklyChallenge", {
                              ...currentReport.weeklyChallenge,
                              quranVerse: e.target.value,
                            })
                          }
                          sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px" } }}
                        />
                      ) : (
                        <Typography variant="body2" sx={{ fontSize: "12px" }}>
                          {currentReport.weeklyChallenge.quranVerse}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd", p: 1 }}>
                      {editMode ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={currentReport.weeklyChallenge.hadithNumber}
                          onChange={(e) =>
                            updateCurrentReport("weeklyChallenge", {
                              ...currentReport.weeklyChallenge,
                              hadithNumber: e.target.value,
                            })
                          }
                          sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px" } }}
                        />
                      ) : (
                        <Typography variant="body2" sx={{ fontSize: "12px" }}>
                          {currentReport.weeklyChallenge.hadithNumber}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd", p: 1 }}>
                      {editMode ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={currentReport.weeklyChallenge.tajweedRules}
                          onChange={(e) =>
                            updateCurrentReport("weeklyChallenge", {
                              ...currentReport.weeklyChallenge,
                              tajweedRules: e.target.value,
                            })
                          }
                          sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px" } }}
                        />
                      ) : (
                        <Typography variant="body2" sx={{ fontSize: "12px" }}>
                          {currentReport.weeklyChallenge.tajweedRules}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell colSpan={11} sx={{ border: "1px solid #ddd", backgroundColor: "#e3f2fd", p: 1 }}>
                      <Typography variant="body2" textAlign="center" fontWeight="bold" color="primary">
                        {editMode ? (
                          <TextField
                            fullWidth
                            size="small"
                            value={`${currentReport.month} ${currentReport.year}`}
                            onChange={(e) => {
                              const [month, year] = e.target.value.split(" ")
                              updateCurrentReport("month", month || "")
                              updateCurrentReport("year", year || "")
                            }}
                            sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px" } }}
                          />
                        ) : (
                          `${currentReport.month} ${currentReport.year} - মাসিক রিপোর্ট কার্ড`
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  {/* Daily Data Rows */}
                  {currentReport.dailyData.map((dayData, dayIndex) => (
                    <TableRow key={dayIndex} sx={{ "&:nth-of-type(even)": { backgroundColor: "#fafafa" } }}>
                      <TableCell sx={{ border: "1px solid #ddd", p: 1, textAlign: "center" }}>
                        {editMode ? (
                          <TextField
                            size="small"
                            value={dayData.date}
                            onChange={(e) => {
                              const newDailyData = [...currentReport.dailyData]
                              newDailyData[dayIndex] = { ...newDailyData[dayIndex], date: e.target.value }
                              updateCurrentReport("dailyData", newDailyData)
                            }}
                            sx={{ width: "60px", "& .MuiOutlinedInput-root": { fontSize: "12px" } }}
                          />
                        ) : (
                          <Typography variant="body2" sx={{ fontSize: "12px" }}>
                            {dayData.date}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid #ddd",
                          p: 1,
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {dayData.day}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ddd", p: 1 }}></TableCell>
                      <TableCell sx={{ border: "1px solid #ddd", p: 1 }}></TableCell>
                      <TableCell sx={{ border: "1px solid #ddd", p: 1 }}></TableCell>
                      {/* Quran Data */}
                      {Object.keys(dayData.quran).map((field, fieldIndex) => (
                        <TableCell key={`quran-${fieldIndex}`} sx={{ border: "1px solid #ddd", p: 1 }}>
                          {editMode ? (
                            <TextField
                              size="small"
                              value={(dayData.quran as any)[field]}
                              onChange={(e) => updateDailyData(dayIndex, "quran", field, e.target.value)}
                              sx={{ width: "60px", "& .MuiOutlinedInput-root": { fontSize: "11px" } }}
                            />
                          ) : (
                            <Typography variant="body2" sx={{ fontSize: "11px" }}>
                              {(dayData.quran as any)[field]}
                            </Typography>
                          )}
                        </TableCell>
                      ))}
                      {/* Revision Data */}
                      {Object.keys(dayData.revision).map((field, fieldIndex) => (
                        <TableCell key={`revision-${fieldIndex}`} sx={{ border: "1px solid #ddd", p: 1 }}>
                          {editMode ? (
                            <TextField
                              size="small"
                              value={(dayData.revision as any)[field]}
                              onChange={(e) => updateDailyData(dayIndex, "revision", field, e.target.value)}
                              sx={{ width: "60px", "& .MuiOutlinedInput-root": { fontSize: "11px" } }}
                            />
                          ) : (
                            <Typography variant="body2" sx={{ fontSize: "11px" }}>
                              {(dayData.revision as any)[field]}
                            </Typography>
                          )}
                        </TableCell>
                      ))}
                      <TableCell sx={{ border: "1px solid #ddd", p: 1 }}></TableCell>
                      <TableCell sx={{ border: "1px solid #ddd", p: 1 }}></TableCell>
                    </TableRow>
                  ))}

                  {/* Total Row */}
                  <TableRow sx={{ backgroundColor: "#e8f5e8" }}>
                    <TableCell
                      colSpan={2}
                      sx={{ border: "1px solid #ddd", p: 1, textAlign: "center", fontWeight: "bold" }}
                    >
                      সর্বমোট (মোট শেষা হয়েছে)
                    </TableCell>
                    <TableCell colSpan={13} sx={{ border: "1px solid #ddd", p: 1 }}></TableCell>
                    <TableCell sx={{ border: "1px solid #ddd", p: 1 }}>
                      {editMode ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={currentReport.total}
                          onChange={(e) => updateCurrentReport("total", e.target.value)}
                          sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px" } }}
                        />
                      ) : (
                        <Typography variant="body2" fontWeight="bold" sx={{ fontSize: "12px" }}>
                          {currentReport.total}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd", p: 1 }}>
                      {editMode ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={currentReport.teacherSignature}
                          onChange={(e) => updateCurrentReport("teacherSignature", e.target.value)}
                          placeholder="শিক্ষকের নাম"
                          sx={{ "& .MuiOutlinedInput-root": { fontSize: "12px" } }}
                        />
                      ) : (
                        <Typography variant="body2" sx={{ fontSize: "12px" }}>
                          {currentReport.teacherSignature}
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, backgroundColor: "#f8f9fa" }}>
        <Button onClick={handleClose} variant="outlined" startIcon={<Close />}>
          বন্ধ করুন
        </Button>
        {editMode ? (
          <Button
            onClick={handleSave}
            variant="contained"
            startIcon={<Save />}
            sx={{ background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)" }}
          >
            সংরক্ষণ করুন
          </Button>
        ) : (
          <Button
            onClick={() => setEditMode(true)}
            variant="contained"
            startIcon={<Edit />}
            sx={{ background: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)" }}
          >
            সম্পাদনা করুন
          </Button>
        )}
        <Button variant="outlined" startIcon={<Print />} onClick={() => window.print()}>
          প্রিন্ট করুন
        </Button>
        <Button variant="outlined" startIcon={<Download />}>
          ডাউনলোড করুন
        </Button>
      </DialogActions>
    </Dialog>
  )

  const ReportCard = ({ report }: { report: StudentReportData }) => (
    <Card sx={{ height: "100%", position: "relative", overflow: "visible" }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          height: 100,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          color: "white",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {report.studentName}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {report.class} - {report.section}
          </Typography>
        </Box>
        <Chip
          label={report.total}
          size="small"
          sx={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white", fontWeight: "bold" }}
        />
      </Box>

      <CardContent sx={{ pt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
            <School />
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {report.teacherSignature}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              শিক্ষক
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          <Chip icon={<CalendarToday />} label={`${report.month} ${report.year}`} size="small" color="primary" />
          <Chip label={report.weeklyChallenge.quranVerse} size="small" color="secondary" />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          তৈরি: {report.createdDate}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            মোট স্কোর: {report.total}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => handleOpen(report)} color="primary">
              <Visibility />
            </IconButton>
            <IconButton size="small" onClick={() => handleDelete(report.id)} color="error">
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          ক্লাস রিপোর্ট ফরম্যাট
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ছাত্রদের দৈনিক অগ্রগতি ট্র্যাক করুন এবং মাসিক রিপোর্ট তৈরি করুন
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Typography variant="h6" fontWeight="bold">
              সংরক্ষিত রিপোর্টসমূহ ({reports.length})
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpen()}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                px: 3,
                py: 1.5,
              }}
            >
              নতুন রিপোর্ট তৈরি করুন
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <Grid container spacing={3}>
        {reports.map((report) => (
          <Grid item xs={12} sm={6} md={4} key={report.id}>
            <ReportCard report={report} />
          </Grid>
        ))}
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => handleOpen()}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Add />
      </Fab>

      {/* Report Modal */}
      <ReportModal />
    </Box>
  )
}
