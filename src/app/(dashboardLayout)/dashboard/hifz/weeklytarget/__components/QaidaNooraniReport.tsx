"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material"

interface QaidaNooraniReportProps {
  studentName: string
  reportDate: string
  month: string
}

export function QaidaNooraniReport({ studentName, reportDate, month }: QaidaNooraniReportProps) {
  const [weeklyTarget, setWeeklyTarget] = useState("")
  const [dailyEntries, setDailyEntries] = useState({
    saturday: {
      subject: "",
      qaidaRevision: "",
      teacherSignature: "",
      comment: "",
      hadithNumber: "",
      surahName: "",
      duaNumber: "",
      tajweedSubject: "",
      pageAmount: "",
      hadithDua: "",
      tajweed: "",
      qaidaPage: "",
    },
    sunday: {
      subject: "",
      qaidaRevision: "",
      teacherSignature: "",
      comment: "",
      hadithNumber: "",
      surahName: "",
      duaNumber: "",
      tajweedSubject: "",
      pageAmount: "",
      hadithDua: "",
      tajweed: "",
      qaidaPage: "",
    },
    monday: {
      subject: "",
      qaidaRevision: "",
      teacherSignature: "",
      comment: "",
      hadithNumber: "",
      surahName: "",
      duaNumber: "",
      tajweedSubject: "",
      pageAmount: "",
      hadithDua: "",
      tajweed: "",
      qaidaPage: "",
    },
    tuesday: {
      subject: "",
      qaidaRevision: "",
      teacherSignature: "",
      comment: "",
      hadithNumber: "",
      surahName: "",
      duaNumber: "",
      tajweedSubject: "",
      pageAmount: "",
      hadithDua: "",
      tajweed: "",
      qaidaPage: "",
    },
    wednesday: {
      subject: "",
      qaidaRevision: "",
      teacherSignature: "",
      comment: "",
      hadithNumber: "",
      surahName: "",
      duaNumber: "",
      tajweedSubject: "",
      pageAmount: "",
      hadithDua: "",
      tajweed: "",
      qaidaPage: "",
    },
    thursday: {
      subject: "",
      qaidaRevision: "",
      teacherSignature: "",
      comment: "",
      hadithNumber: "",
      surahName: "",
      duaNumber: "",
      tajweedSubject: "",
      pageAmount: "",
      hadithDua: "",
      tajweed: "",
      qaidaPage: "",
    },
    friday: {
      subject: "",
      qaidaRevision: "",
      teacherSignature: "",
      comment: "",
      hadithNumber: "",
      surahName: "",
      duaNumber: "",
      tajweedSubject: "",
      pageAmount: "",
      hadithDua: "",
      tajweed: "",
      qaidaPage: "",
    },
  })

  const days = [
    { key: "saturday", name: "Saturday", bangla: "শনিবার" },
    { key: "sunday", name: "Sunday", bangla: "রবিবার" },
    { key: "monday", name: "Monday", bangla: "সোমবার" },
    { key: "tuesday", name: "Tuesday", bangla: "মঙ্গলবার" },
    { key: "wednesday", name: "Wednesday", bangla: "বুধবার" },
    { key: "thursday", name: "Thursday", bangla: "বৃহস্পতিবার" },
    { key: "friday", name: "Friday", bangla: "শুক্রবার" },
  ]

  const updateDayEntry = (day: string, field: string, value: string) => {
    setDailyEntries((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  return (
    <Card sx={{ boxShadow: 3, "@media print": { boxShadow: "none", border: "1px solid black" } }}>
      <Box sx={{ textAlign: "center", p: 3, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Craft International Institute
        </Typography>
        <Typography variant="h5" fontWeight="600" color="text.secondary" gutterBottom>
          Qaida & Noorani Students Daily Report
        </Typography>
        <Typography variant="h6" color="text.secondary">
          কায়েদা ও নূরানী ছাত্রদের দৈনিক রিপোর্ট
        </Typography>
      </Box>

      <CardContent sx={{ p: 4 }}>
        <Paper sx={{ p: 3, mb: 4, bgcolor: "grey.50" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                Student Name (ছাত্রের নাম):
              </Typography>
              <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 1, minHeight: 24 }}>
                <Typography variant="body1">{studentName || "_________________"}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                Weekly Target (সাপ্তাহিক টার্গেট):
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={weeklyTarget}
                onChange={(e) => setWeeklyTarget(e.target.value)}
                placeholder="Enter weekly target"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                Month (মাস):
              </Typography>
              <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 1, minHeight: 24 }}>
                <Typography variant="body1">{month || "_________________"}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <TableContainer component={Paper} sx={{ border: 1, borderColor: "grey.300" }}>
          <Table size="small" sx={{ "& .MuiTableCell-root": { border: 1, borderColor: "grey.300" } }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                  Date/Day
                  <br />
                  (তারিখ/বার)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                  Subject List
                  <br />
                  (মুখস্ত বিষয়াবলী)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                  Qaida Revision
                  <br />
                  (কায়েদা রিভিশন সংখ্যা)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                  Teacher Signature
                  <br />
                  (শিক্ষকের স্বাক্ষর)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                  Comment
                  <br />
                  (মন্তব্য)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                  Hadith No/Surah Name
                  <br />
                  (হাদিস নম্বর/সূরার নাম)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                  Dua Number
                  <br />
                  (দোয়ার নম্বর)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                  Tajweed Subject
                  <br />
                  (তাজবীদের বিষয়)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                  Page Amount
                  <br />
                  (পৃষ্ঠা পরিমাণ)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                  Hadith/Dua/Tajweed
                  <br />
                  (হাদিস/সূরা/দোয়া/তাজবীদ)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                  Qaida Page
                  <br />
                  (কায়েদা পৃ:)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {days.map((day) => (
                <TableRow key={day.key} sx={{ "&:hover": { bgcolor: "grey.50" } }}>
                  <TableCell align="center" sx={{ fontWeight: 500 }}>
                    <Typography variant="body2">{day.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({day.bangla})
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={dailyEntries[day.key as keyof typeof dailyEntries].subject}
                      onChange={(e) => updateDayEntry(day.key, "subject", e.target.value)}
                      placeholder="Subject"
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                    />
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={dailyEntries[day.key as keyof typeof dailyEntries].qaidaRevision}
                      onChange={(e) => updateDayEntry(day.key, "qaidaRevision", e.target.value)}
                      placeholder="Revision"
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                    />
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={dailyEntries[day.key as keyof typeof dailyEntries].teacherSignature}
                      onChange={(e) => updateDayEntry(day.key, "teacherSignature", e.target.value)}
                      placeholder="Signature"
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                    />
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={dailyEntries[day.key as keyof typeof dailyEntries].comment}
                      onChange={(e) => updateDayEntry(day.key, "comment", e.target.value)}
                      placeholder="Comment"
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                    />
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={dailyEntries[day.key as keyof typeof dailyEntries].hadithNumber}
                      onChange={(e) => updateDayEntry(day.key, "hadithNumber", e.target.value)}
                      placeholder="Hadith/Surah"
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                    />
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={dailyEntries[day.key as keyof typeof dailyEntries].duaNumber}
                      onChange={(e) => updateDayEntry(day.key, "duaNumber", e.target.value)}
                      placeholder="Dua No."
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                    />
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={dailyEntries[day.key as keyof typeof dailyEntries].tajweedSubject}
                      onChange={(e) => updateDayEntry(day.key, "tajweedSubject", e.target.value)}
                      placeholder="Tajweed"
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                    />
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={dailyEntries[day.key as keyof typeof dailyEntries].pageAmount}
                      onChange={(e) => updateDayEntry(day.key, "pageAmount", e.target.value)}
                      placeholder="Pages"
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                    />
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={dailyEntries[day.key as keyof typeof dailyEntries].hadithDua}
                      onChange={(e) => updateDayEntry(day.key, "hadithDua", e.target.value)}
                      placeholder="H/D/T"
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                    />
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={dailyEntries[day.key as keyof typeof dailyEntries].qaidaPage}
                      onChange={(e) => updateDayEntry(day.key, "qaidaPage", e.target.value)}
                      placeholder="Page"
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: "grey.100", fontWeight: 600 }}>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  <Typography variant="body2" fontWeight="600">
                    Weekly Total
                  </Typography>
                  <Typography variant="caption">(সপ্তাহে মোট শেখা হয়েছে)</Typography>
                </TableCell>
                <TableCell colSpan={10}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <Typography variant="caption">Total Pages: ____</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <Typography variant="caption">Total Hadith: ____</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <Typography variant="caption">Total Duas: ____</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <Typography variant="caption">Total Tajweed: ____</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <Typography variant="caption">Total Revision: ____</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
