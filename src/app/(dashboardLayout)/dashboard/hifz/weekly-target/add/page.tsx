"use client"

import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Card, Grid, Button } from "@mui/material"
import {  Save } from "@mui/icons-material"

export default function HifzWeeklyReport() {
  return (
    <Box sx={{ p: 3, maxWidth: 'xl', margin: "0 auto", bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Header Section */}
      <Card sx={{ p: 3, mb: 2, borderRadius: 2, boxShadow: 3, background: "linear-gradient(135deg, #1a5f23 0%, #2e7d32 100%)", color: "white" }}>
       
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          ক্রাফট ইন্টারন্যাশনাল ইনস্টিটিউট
        </Typography>
        <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
          হিফজ শিক্ষার্থীদের সাপ্তাহিক রিপোর্ট
        </Typography>
       
      </Card>

      {/* Student Info Section */}
      <Card sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "#2e7d32" }}>
              শিক্ষার্থীর নাম / Student Name:
            </Typography>
            <TextField fullWidth variant="outlined" size="small" placeholder="Enter student name" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "#2e7d32" }}>
              তারিখ / Date:
            </Typography>
            <TextField fullWidth variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "#2e7d32" }}>
              মাস / Month:
            </Typography>
            <TextField fullWidth variant="outlined" size="small" placeholder="Enter month" />
          </Grid>
        </Grid>
      </Card>

      {/* Main Table Section */}
      <Card sx={{ borderRadius: 2, boxShadow: 2, overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#e8f5e9" }}>
                <TableCell
                  rowSpan={2}
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    border: "1px solid #bdbdbd",
                    bgcolor: "#c8e6c9",
                    color: "#2e7d32",
                    fontSize: "1rem",
                    width: "15%"
                  }}
                >
                  একসপ্তাহের এই সপ্তাহের চার্টটি
                  <br />
                  <Typography variant="caption" sx={{ color: "#388e3c" }}>
                    Weekly Chart
                  </Typography>
                </TableCell>
                <TableCell
                  colSpan={2}
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    border: "1px solid #bdbdbd",
                    bgcolor: "#a5d6a7",
                    color: "#2e7d32",
                    fontSize: "1rem"
                  }}
                >
                  সবক / Lesson
                </TableCell>
                <TableCell
                  colSpan={2}
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    border: "1px solid #bdbdbd",
                    bgcolor: "#a5d6a7",
                    color: "#2e7d32",
                    fontSize: "1rem"
                  }}
                >
                  সাত-সবক / Previous Lesson
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    border: "1px solid #bdbdbd",
                    bgcolor: "#a5d6a7",
                    color: "#2e7d32",
                    fontSize: "1rem"
                  }}
                >
                  আয়মুতাহ
                  <br />
                  <Typography variant="caption" sx={{ color: "#388e3c" }}>
                    Revision
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    border: "1px solid #bdbdbd",
                    bgcolor: "#a5d6a7",
                    color: "#2e7d32",
                    fontSize: "1rem"
                  }}
                >
                  তিলাওয়াত
                  <br />
                  <Typography variant="caption" sx={{ color: "#388e3c" }}>
                    Recitation
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    border: "1px solid #bdbdbd",
                    bgcolor: "#a5d6a7",
                    color: "#2e7d32",
                    fontSize: "1rem"
                  }}
                >
                  শবিনাহ
                  <br />
                  <Typography variant="caption" sx={{ color: "#388e3c" }}>
                    Night Revision
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ bgcolor: "#f1f8e9" }}>
                <TableCell sx={{ textAlign: "center", border: "1px solid #bdbdbd", fontWeight: "bold", bgcolor: "#e8f5e9" }}>
                  পারা নং
                  <br />
                  <Typography variant="caption">Para No.</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "1px solid #bdbdbd", fontWeight: "bold", bgcolor: "#e8f5e9" }}>
                  পৃষ্ঠা সংখ্যা
                  <br />
                  <Typography variant="caption">Page Count</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "1px solid #bdbdbd", fontWeight: "bold", bgcolor: "#e8f5e9" }}>
                  পারা নং
                  <br />
                  <Typography variant="caption">Para No.</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "1px solid #bdbdbd", fontWeight: "bold", bgcolor: "#e8f5e9" }}>
                  পৃষ্ঠা সংখ্যা
                  <br />
                  <Typography variant="caption">Page Count</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "1px solid #bdbdbd", fontWeight: "bold", bgcolor: "#e8f5e9" }}>
                  পারা সংখ্যা ও নম্বর
                  <br />
                  <Typography variant="caption">Para No. & Score</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "1px solid #bdbdbd", fontWeight: "bold", bgcolor: "#e8f5e9" }}>
                  পারা সংখ্যা ও নম্বর
                  <br />
                  <Typography variant="caption">Para No. & Score</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "1px solid #bdbdbd", fontWeight: "bold", bgcolor: "#e8f5e9" }}>
                  মোট পারার সংখ্যা ও নম্বর
                  <br />
                  <Typography variant="caption">Total Para & Score</Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell sx={{ border: "1px solid #bdbdbd", fontWeight: "bold", bgcolor: "#f1f8e9" }}>
                  একসপ্তাহের এই সপ্তাহের রিপোর্ট
                  <br />
                  <Typography variant="caption">This Week Report</Typography>
                </TableCell>
                {[...Array(7)].map((_, index) => (
                  <TableCell key={index} sx={{ border: "1px solid #bdbdbd" }}>
                    <TextField fullWidth variant="outlined" size="small" sx={{ bgcolor: "white" }} />
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: "1px solid #bdbdbd", fontWeight: "bold", bgcolor: "#f1f8e9" }}>
                  একসপ্তাহের ভুলের সংখ্যা
                  <br />
                  <Typography variant="caption">Number of Mistakes</Typography>
                </TableCell>
                <TableCell colSpan={7} sx={{ border: "1px solid #bdbdbd" }}>
                  <TextField fullWidth variant="outlined" size="small" sx={{ bgcolor: "white" }} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Teacher's Comments Section */}
      <Card sx={{ p: 3, mt: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#2e7d32" }}>
          শিক্ষকের মন্তব্য / Teacher Comments:
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Enter teacher's comments here..."
        />
      </Card>



      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button variant="contained" startIcon={<Save />} sx={{ bgcolor: "#2e7d32", "&:hover": { bgcolor: "#1b5e20" } }}>
          Save Report
        </Button>
        
      </Box>

      {/* Footer */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "#757575" }}>
          Craft International Institute © {new Date().getFullYear()} | Contact: example@email.com | Phone: +XXX-XXXX-XXXX
        </Typography>
      </Box>
    </Box>
  )
}