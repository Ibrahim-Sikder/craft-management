/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
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
  MenuItem,
  Button,
} from "@mui/material"



function NazeraReport({ studentName, reportDate, month }: any) {
  const [weeklyTarget, setWeeklyTarget] = useState("")
  const [dailyEntries, setDailyEntries] = useState({
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

  const updateDayEntry = (day: string, section: string, field: string, value: string) => {
    setDailyEntries((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [section]:
          section === "morning" || section === "afternoon" || section === "night"
            ? { ...prev[day as keyof typeof prev][section as "morning" | "afternoon" | "night"], [field]: value }
            : value,
      },
    }))
  }

  return (
    <Card sx={{ boxShadow: "none", "@media print": { boxShadow: "none", border: 0 } }}>
      <CardHeader
        sx={{
          textAlign: "center",
          borderBottom: 1,
          borderColor: "divider",
          "@media print": { borderColor: "black" },
        }}
        title={
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
              Craft International Institute
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}>
              Nazera Students Daily Report
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              নাজেরা ছাত্রদের দৈনিক রিপোর্ট
            </Typography>
          </Box>
        }
      />

      <CardContent sx={{ p: 3 }}>
        {/* Student Information */}
        <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        mb: 3,
                        bgcolor: "grey.50",
                        "@media print": { bgcolor: "transparent", border: 1, borderColor: "black" },
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                Teacher Name (শিক্ষকের নাম):
                            </Typography>
                            <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 0.5, minHeight: 24 }}>
                                {studentName || "_________________"}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                Date (তারিখ):
                            </Typography>
                            <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 0.5, minHeight: 24 }}>
                                {reportDate || "_________________"}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                Student Name (শিক্ষার্থীর নাম):
                            </Typography>
                            <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 0.5, minHeight: 24 }}>
                                {studentName || "_________________"}
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
        {/* Daily Entries Table */}
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table
            size="small"
            sx={{
              border: 1,
              borderColor: "grey.300",
              "@media print": { borderColor: "black" },
              "& .MuiTableCell-root": {
                border: 1,
                borderColor: "grey.300",
                "@media print": { borderColor: "black" },
                fontSize: "0.75rem",
                p: 1,
              },
            }}
          >
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100", "@media print": { bgcolor: "transparent" } }}>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Date/Day
                  <br />
                  (তারিখ/বার)
                </TableCell>
                <TableCell colSpan={4} sx={{ fontWeight: 600, textAlign: "center" }}>
                  Morning (সকাল)
                </TableCell>
                <TableCell colSpan={4} sx={{ fontWeight: 600, textAlign: "center" }}>
                  Afternoon (দুপুর)
                </TableCell>
                <TableCell colSpan={4} sx={{ fontWeight: 600, textAlign: "center" }}>
                  Night (রাত)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Total Read
                  <br />
                  (সর্বমোট পঠিত পৃষ্ঠা)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Dua/Hadith/Masala
                  <br />
                  (দোয়া/হাদিস/মাসয়ালা সংখ্যা/নং)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: "center", minWidth: 90 }}>
                  মাশক্ব হয়েছে কি
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: "center", minWidth: 90 }}>
                  তাজভীদ শিক্ষা
                </TableCell>
              </TableRow>
              <TableRow sx={{ bgcolor: "grey.50", "@media print": { bgcolor: "transparent" } }}>
                <TableCell></TableCell>
                {["Para (পারা)", "Page (পৃষ্ঠা নং)", "Amount (পরিমাণ)", "Mistakes (ভুল)"].map((header, i) => (
                  <TableCell key={`morning-${i}`} sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                    {header}
                  </TableCell>
                ))}
                {["Para (পারা)", "Page (পৃষ্ঠা নং)", "Amount (পরিমাণ)", "Mistakes (ভুল)"].map((header, i) => (
                  <TableCell key={`afternoon-${i}`} sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                    {header}
                  </TableCell>
                ))}
                {["Para (পারা)", "Page (পৃষ্ঠা নং)", "Amount (পরিমাণ)", "Mistakes (ভুল)"].map((header, i) => (
                  <TableCell key={`night-${i}`} sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                    {header}
                  </TableCell>
                ))}
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {days.map((day) => (
                <TableRow key={day.key} sx={{ "&:hover": { bgcolor: "grey.50" } }}>
                  <TableCell sx={{ fontWeight: 500, textAlign: "center" }}>
                    {day.name}
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      ({day.bangla})
                    </Typography>
                  </TableCell>
                  {/* Morning */}
                  {["para", "page", "amount", "mistakes"].map((field) => (
                    <TableCell key={`${day.key}-morning-${field}`} sx={{ p: 0.5 }}>
                      <TextField
                        size="small"
                        value={
                          dailyEntries[day.key as keyof typeof dailyEntries].morning[
                          field as keyof typeof dailyEntries.saturday.morning
                          ]
                        }
                        onChange={(e) => updateDayEntry(day.key, "morning", field, e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            border: 0,
                            fontSize: "0.75rem",
                            height: 24,
                            "@media print": { bgcolor: "transparent" },
                          },
                        }}
                      />
                    </TableCell>
                  ))}
                  {/* Afternoon */}
                  {["para", "page", "amount", "mistakes"].map((field) => (
                    <TableCell key={`${day.key}-afternoon-${field}`} sx={{ p: 0.5 }}>
                      <TextField
                        size="small"
                        value={
                          dailyEntries[day.key as keyof typeof dailyEntries].afternoon[
                          field as keyof typeof dailyEntries.saturday.afternoon
                          ]
                        }
                        onChange={(e) => updateDayEntry(day.key, "afternoon", field, e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            border: 0,
                            fontSize: "0.75rem",
                            height: 24,
                            "@media print": { bgcolor: "transparent" },
                          },
                        }}
                      />
                    </TableCell>
                  ))}
                  {/* Night */}
                  {["para", "page", "amount", "mistakes"].map((field) => (
                    <TableCell key={`${day.key}-night-${field}`} sx={{ p: 0.5 }}>
                      <TextField
                        size="small"
                        value={
                          dailyEntries[day.key as keyof typeof dailyEntries].night[
                          field as keyof typeof dailyEntries.saturday.night
                          ]
                        }
                        onChange={(e) => updateDayEntry(day.key, "night", field, e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            border: 0,
                            fontSize: "0.75rem",
                            height: 24,
                            "@media print": { bgcolor: "transparent" },
                          },
                        }}
                      />
                    </TableCell>
                  ))}
                  {/* Total and other fields */}
                  <TableCell sx={{ p: 0.5 }}>
                    <TextField
                      size="small"
                      value={dailyEntries[day.key as keyof typeof dailyEntries].totalRead}
                      onChange={(e) => updateDayEntry(day.key, "totalRead", "", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          border: 0,
                          fontSize: "0.75rem",
                          height: 24,
                          "@media print": { bgcolor: "transparent" },
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }}>
                    <TextField
                      size="small"
                      value={dailyEntries[day.key as keyof typeof dailyEntries].duaHadithMasala}
                      onChange={(e) => updateDayEntry(day.key, "duaHadithMasala", "", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          border: 0,
                          fontSize: "0.75rem",
                          height: 24,
                          "@media print": { bgcolor: "transparent" },
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }}>
                    <TextField
                      select
                      size="small"
                      value={dailyEntries[day.key as keyof typeof dailyEntries]}
                      onChange={(e) => updateDayEntry(day.key, "mashq", "", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          border: 0,
                          fontSize: "0.75rem",
                          height: 32,
                          "@media print": { bgcolor: "transparent" },
                        },
                      }}
                    >
                      <MenuItem value="হ্যাঁ">হ্যাঁ</MenuItem>
                      <MenuItem value="না">না</MenuItem>
                    </TextField>
                  </TableCell>
                  {/* Tajweed Column */}
                  <TableCell sx={{ p: 0.5 }}>
                    <TextField
                      size="small"
                      value={dailyEntries[day.key as keyof typeof dailyEntries]}
                      onChange={(e) => updateDayEntry(day.key, "tajweed", "", e.target.value)}
                      placeholder="তাজভীদ"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          border: 0,
                          fontSize: "0.75rem",
                          height: 32,
                          "@media print": { bgcolor: "transparent" },
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: "grey.100", "@media print": { bgcolor: "transparent" }, fontWeight: 600 }}>
                <TableCell sx={{ textAlign: "center" }}>
                  Weekly Total
                  <br />
                  (সপ্তাহের মোট হিসাব)
                </TableCell>
                <TableCell colSpan={15}>
                  <Grid container spacing={1} sx={{ fontSize: "0.75rem" }}>
                    <Grid item xs={3}>
                      Total Pages: ____
                    </Grid>
                    <Grid item xs={3}>
                      Total Mistakes: ____
                    </Grid>
                    <Grid item xs={3}>
                      Total Duas: ____
                    </Grid>
                    <Grid item xs={3}>
                      Total Hadith: ____
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* Submit Button */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', '@media print': { display: 'none' } }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
            }}
          >
            Submit Report
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default NazeraReport