"use client"

import { useState } from "react"
import { Box, Card, CardContent, CardHeader, Typography, TextField, Grid, Paper } from "@mui/material"

interface NazeraWeeklyReportProps {
  studentName: string
  reportDate: string
  month: string
}

export function NazeraWeeklyReport({ studentName, reportDate, month }: NazeraWeeklyReportProps) {
  const [weeklyEntries, setWeeklyEntries] = useState([
    {
      weeklyTarget: "",
      hadithMasalaNumber: "",
      duaNumber: "",
      tajweedPractice: "",
      paraPages: "",
      weeklyReport: "",
      mistakeCount: "",
    },
    {
      weeklyTarget: "",
      hadithMasalaNumber: "",
      duaNumber: "",
      tajweedPractice: "",
      paraPages: "",
      weeklyReport: "",
      mistakeCount: "",
    },
    {
      weeklyTarget: "",
      hadithMasalaNumber: "",
      duaNumber: "",
      tajweedPractice: "",
      paraPages: "",
      weeklyReport: "",
      mistakeCount: "",
    },
    {
      weeklyTarget: "",
      hadithMasalaNumber: "",
      duaNumber: "",
      tajweedPractice: "",
      paraPages: "",
      weeklyReport: "",
      mistakeCount: "",
    },
  ])

  const updateWeeklyEntry = (index: number, field: string, value: string) => {
    setWeeklyEntries((prev) => prev.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry)))
  }

  return (
    <Card elevation={0} sx={{ "@media print": { boxShadow: "none", border: "none" } }}>
      <CardHeader
        sx={{ textAlign: "center", borderBottom: 1, borderColor: "divider", "@media print": { borderColor: "black" } }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
            Craft International Institute
          </Typography>
          <Typography variant="h5" component="h2" fontWeight="semibold" color="text.secondary">
            Nazera Students Weekly Report
          </Typography>
          <Typography variant="h6" component="h3" color="text.secondary">
            নাজেরা ছাত্রদের সাপ্তাহিক রিপোর্ট
          </Typography>
        </Box>
      </CardHeader>

      <CardContent sx={{ p: 3 }}>
        {/* Student Information */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            mb: 3,
            backgroundColor: "grey.50",
            "@media print": {
              backgroundColor: "transparent",
              border: 1,
              borderColor: "black",
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="body2" fontWeight="semibold">
                  Student Name (শিক্ষার্থীর নাম):
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 0.5, minHeight: "24px" }}>
                  {studentName || "_________________"}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="body2" fontWeight="semibold">
                  Date (তারিখ):
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 0.5, minHeight: "24px" }}>
                  {reportDate || "_________________"}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="body2" fontWeight="semibold">
                  Month (মাস):
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 0.5, minHeight: "24px" }}>
                  {month || "_________________"}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Weekly Entries */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {weeklyEntries.map((entry, index) => (
            <Card
              key={index}
              elevation={2}
              sx={{ border: 2, borderColor: "grey.300", "@media print": { borderColor: "black" } }}
            >
              <CardHeader sx={{ pb: 1 }}>
                <Typography variant="h6" component="h3" fontWeight="semibold" textAlign="center">
                  Week {index + 1} Report (একনজরে {index + 1} সপ্তাহের রিপোর্ট)
                </Typography>
              </CardHeader>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {/* Weekly Target */}
                  <Box>
                    <Typography variant="body2" fontWeight="semibold" sx={{ mb: 1 }}>
                      Weekly Target (একনজরে এই সপ্তাহের টার্গেট):
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={entry.weeklyTarget}
                      onChange={(e) => updateWeeklyEntry(index, "weeklyTarget", e.target.value)}
                      placeholder="Enter weekly target details"
                      variant="outlined"
                      sx={{ "@media print": { border: 1, borderColor: "black", backgroundColor: "transparent" } }}
                    />
                  </Box>

                  {/* Subject Details Grid */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="body2" fontWeight="semibold" sx={{ mb: 1 }}>
                        Hadith/Masala Number (হাদিস/মাসয়ালা নম্বর):
                      </Typography>
                      <TextField
                        fullWidth
                        value={entry.hadithMasalaNumber}
                        onChange={(e) => updateWeeklyEntry(index, "hadithMasalaNumber", e.target.value)}
                        placeholder="Hadith/Masala number"
                        variant="outlined"
                        sx={{ "@media print": { border: 1, borderColor: "black", backgroundColor: "transparent" } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="body2" fontWeight="semibold" sx={{ mb: 1 }}>
                        Dua Number (দোয়ার নম্বর):
                      </Typography>
                      <TextField
                        fullWidth
                        value={entry.duaNumber}
                        onChange={(e) => updateWeeklyEntry(index, "duaNumber", e.target.value)}
                        placeholder="Dua number"
                        variant="outlined"
                        sx={{ "@media print": { border: 1, borderColor: "black", backgroundColor: "transparent" } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="body2" fontWeight="semibold" sx={{ mb: 1 }}>
                        Tajweed Practice (তাজবীদ অনুশীলন):
                      </Typography>
                      <TextField
                        fullWidth
                        value={entry.tajweedPractice}
                        onChange={(e) => updateWeeklyEntry(index, "tajweedPractice", e.target.value)}
                        placeholder="Tajweed practice"
                        variant="outlined"
                        sx={{ "@media print": { border: 1, borderColor: "black", backgroundColor: "transparent" } }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" fontWeight="semibold" sx={{ mb: 1 }}>
                        Para/Pages (পারা/পৃষ্ঠা):
                      </Typography>
                      <TextField
                        fullWidth
                        value={entry.paraPages}
                        onChange={(e) => updateWeeklyEntry(index, "paraPages", e.target.value)}
                        placeholder="Para and page numbers"
                        variant="outlined"
                        sx={{ "@media print": { border: 1, borderColor: "black", backgroundColor: "transparent" } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" fontWeight="semibold" sx={{ mb: 1 }}>
                        Mistake Count (ভুলের সংখ্যা):
                      </Typography>
                      <TextField
                        fullWidth
                        value={entry.mistakeCount}
                        onChange={(e) => updateWeeklyEntry(index, "mistakeCount", e.target.value)}
                        placeholder="Number of mistakes"
                        variant="outlined"
                        sx={{ "@media print": { border: 1, borderColor: "black", backgroundColor: "transparent" } }}
                      />
                    </Grid>
                  </Grid>

                  {/* Weekly Report */}
                  <Box>
                    <Typography variant="body2" fontWeight="semibold" sx={{ mb: 1 }}>
                      Weekly Report (একনজরে এই সপ্তাহের রিপোর্ট):
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      value={entry.weeklyReport}
                      onChange={(e) => updateWeeklyEntry(index, "weeklyReport", e.target.value)}
                      placeholder="Enter detailed weekly report"
                      variant="outlined"
                      sx={{ "@media print": { border: 1, borderColor: "black", backgroundColor: "transparent" } }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Summary Section */}
        <Card
          elevation={2}
          sx={{
            mt: 3,
            border: 2,
            borderColor: "blue.200",
            backgroundColor: "blue.50",
            "@media print": {
              backgroundColor: "transparent",
              borderColor: "black",
            },
          }}
        >
          <CardHeader>
            <Typography variant="h6" component="h3" fontWeight="semibold" textAlign="center">
              Monthly Summary (মাসিক সারসংক্ষেপ)
            </Typography>
          </CardHeader>
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" fontWeight="semibold" sx={{ mb: 1 }}>
                    Total Para Completed:
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Total para"
                    variant="outlined"
                    sx={{ "@media print": { border: 1, borderColor: "black", backgroundColor: "transparent" } }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" fontWeight="semibold" sx={{ mb: 1 }}>
                    Total Pages Read:
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Total pages"
                    variant="outlined"
                    sx={{ "@media print": { border: 1, borderColor: "black", backgroundColor: "transparent" } }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" fontWeight="semibold" sx={{ mb: 1 }}>
                    Reading Fluency:
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Fluency level"
                    variant="outlined"
                    sx={{ "@media print": { border: 1, borderColor: "black", backgroundColor: "transparent" } }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" fontWeight="semibold" sx={{ mb: 1 }}>
                    Overall Performance:
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Performance rating"
                    variant="outlined"
                    sx={{ "@media print": { border: 1, borderColor: "black", backgroundColor: "transparent" } }}
                  />
                </Grid>
              </Grid>
              <Box>
                <Typography variant="body2" fontWeight="semibold" sx={{ mb: 1 }}>
                  Teacher's Comments:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Teacher's overall comments and recommendations"
                  variant="outlined"
                  sx={{ "@media print": { border: 1, borderColor: "black", backgroundColor: "transparent" } }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
