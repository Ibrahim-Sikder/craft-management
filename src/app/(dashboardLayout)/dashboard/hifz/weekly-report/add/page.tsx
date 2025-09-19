/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, TextField, Typography, Box, Grid, Paper } from "@mui/material"


 function HifzWeeklyReport({ studentName, reportDate, month }: any) {
  const [weeklyEntries, setWeeklyEntries] = useState([
    {
      weeklyTarget: "",
      sabakSeven: "",
      sabakAmukta: "",
      tilawaRevision: "",
      weeklyRevision: "",
      totalParaPages: "",
      weeklyReport: "",
      mistakeCount: "",
    },
    {
      weeklyTarget: "",
      sabakSeven: "",
      sabakAmukta: "",
      tilawaRevision: "",
      weeklyRevision: "",
      totalParaPages: "",
      weeklyReport: "",
      mistakeCount: "",
    },
    {
      weeklyTarget: "",
      sabakSeven: "",
      sabakAmukta: "",
      tilawaRevision: "",
      weeklyRevision: "",
      totalParaPages: "",
      weeklyReport: "",
      mistakeCount: "",
    },
    {
      weeklyTarget: "",
      sabakSeven: "",
      sabakAmukta: "",
      tilawaRevision: "",
      weeklyRevision: "",
      totalParaPages: "",
      weeklyReport: "",
      mistakeCount: "",
    },
  ])

  const updateWeeklyEntry = (index: number, field: string, value: string) => {
    setWeeklyEntries((prev) => prev.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry)))
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
              Hifz Students Weekly Report
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              হিফজ শিক্ষার্থীদের সাপ্তাহিক রিপোর্ট
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
                Student Name (শিক্ষার্থীর নাম):
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
                Month (মাস):
              </Typography>
              <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 0.5, minHeight: 24 }}>
                {month || "_________________"}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Weekly Entries */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {weeklyEntries.map((entry, index) => (
            <Card
              key={index}
              sx={{
                border: 2,
                borderColor: "grey.200",
                "@media print": { borderColor: "black" },
              }}
            >
              <CardHeader
                title={
                  <Typography variant="h6" sx={{ textAlign: "center", fontWeight: 600 }}>
                    Week {index + 1} Report (একনজরে {index + 1} সপ্তাহের রিপোর্ট)
                  </Typography>
                }
                sx={{ pb: 1 }}
              />
              <CardContent>
                {/* Weekly Target */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Weekly Target (একনজরে এই সপ্তাহের টার্গেট):
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={entry.weeklyTarget}
                    onChange={(e) => updateWeeklyEntry(index, "weeklyTarget", e.target.value)}
                    placeholder="Enter weekly target details"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "@media print": {
                          border: 1,
                          borderColor: "black",
                          bgcolor: "transparent",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Hifz Specific Fields */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Sabak Seven (সবক সাত):
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={entry.sabakSeven}
                      onChange={(e) => updateWeeklyEntry(index, "sabakSeven", e.target.value)}
                      placeholder="Sabak seven details"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "@media print": {
                            border: 1,
                            borderColor: "black",
                            bgcolor: "transparent",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Sabak Amukta (সবক আমুক্তা):
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={entry.sabakAmukta}
                      onChange={(e) => updateWeeklyEntry(index, "sabakAmukta", e.target.value)}
                      placeholder="Sabak amukta details"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "@media print": {
                            border: 1,
                            borderColor: "black",
                            bgcolor: "transparent",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Tilawa Revision (তিলাওয়াত রিভিশন):
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={entry.tilawaRevision}
                      onChange={(e) => updateWeeklyEntry(index, "tilawaRevision", e.target.value)}
                      placeholder="Tilawa revision"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "@media print": {
                            border: 1,
                            borderColor: "black",
                            bgcolor: "transparent",
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Weekly Revision (সাপ্তাহিক শবনা):
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={entry.weeklyRevision}
                      onChange={(e) => updateWeeklyEntry(index, "weeklyRevision", e.target.value)}
                      placeholder="Weekly revision"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "@media print": {
                            border: 1,
                            borderColor: "black",
                            bgcolor: "transparent",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Total Para/Pages (পারার সংখ্যা ও নং):
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={entry.totalParaPages}
                      onChange={(e) => updateWeeklyEntry(index, "totalParaPages", e.target.value)}
                      placeholder="Para and page count"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "@media print": {
                            border: 1,
                            borderColor: "black",
                            bgcolor: "transparent",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Mistake Count (ভুলের সংখ্যা):
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={entry.mistakeCount}
                      onChange={(e) => updateWeeklyEntry(index, "mistakeCount", e.target.value)}
                      placeholder="Number of mistakes"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "@media print": {
                            border: 1,
                            borderColor: "black",
                            bgcolor: "transparent",
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Weekly Report */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Weekly Report (একনজরে এই সপ্তাহের রিপোর্ট):
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={entry.weeklyReport}
                    onChange={(e) => updateWeeklyEntry(index, "weeklyReport", e.target.value)}
                    placeholder="Enter detailed weekly report"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "@media print": {
                          border: 1,
                          borderColor: "black",
                          bgcolor: "transparent",
                        },
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Summary Section */}
        <Card
          sx={{
            mt: 3,
            border: 2,
            borderColor: "purple.200",
            bgcolor: "purple.50",
            "@media print": { bgcolor: "transparent", borderColor: "black" },
          }}
        >
          <CardHeader
            title={
              <Typography variant="h6" sx={{ textAlign: "center", fontWeight: 600 }}>
                Monthly Summary (মাসিক সারসংক্ষেপ)
              </Typography>
            }
          />
          <CardContent>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Total Para Memorized:
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Total para memorized"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "@media print": {
                        border: 1,
                        borderColor: "black",
                        bgcolor: "transparent",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Memorization Quality:
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Quality rating"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "@media print": {
                        border: 1,
                        borderColor: "black",
                        bgcolor: "transparent",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Revision Consistency:
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Revision consistency"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "@media print": {
                        border: 1,
                        borderColor: "black",
                        bgcolor: "transparent",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Overall Performance:
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Performance rating"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "@media print": {
                        border: 1,
                        borderColor: "black",
                        bgcolor: "transparent",
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Teacher Comments:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Teacher's overall comments and recommendations"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "@media print": {
                      border: 1,
                      borderColor: "black",
                      bgcolor: "transparent",
                    },
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
export default HifzWeeklyReport