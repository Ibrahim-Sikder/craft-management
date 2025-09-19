"use client"

import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Stack,
  Avatar,
} from "@mui/material"
import { Calendar, User, BookOpen, FileText, Printer, Download } from "lucide-react"
import { QaidaNooraniReport } from "./qaida-noorani-report"
import { NazeraReport } from "./nazera-report"
import { HifzReport } from "./hifz-report"
import { PrintPreview } from "./print-preview"

export function DailyReportForm() {
  const [selectedCategory, setSelectedCategory] = useState("qaida-noorani")
  const [studentName, setStudentName] = useState("")
  const [reportDate, setReportDate] = useState(new Date().toISOString().split("T")[0])
  const [month, setMonth] = useState("")

  const studentCategories = [
    { id: "qaida-noorani", name: "Qaida & Noorani", icon: BookOpen, color: "#4caf50" },
    { id: "nazera", name: "Nazera", icon: FileText, color: "#2196f3" },
    { id: "hifz", name: "Hifz", icon: User, color: "#9c27b0" },
  ]

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    console.log("Exporting report...")
  }

  return (
    <Stack spacing={3}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Calendar size={20} />
                <Typography variant="h5" fontWeight="bold">
                  Daily Report Generator
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Create comprehensive daily reports for students across different learning categories
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {studentCategories.map((category) => (
                <Grid item xs={12} md={4} key={category.id}>
                  <Paper
                    onClick={() => setSelectedCategory(category.id)}
                    sx={{
                      p: 2,
                      cursor: "pointer",
                      border: 2,
                      borderColor: selectedCategory === category.id ? "primary.main" : "grey.200",
                      bgcolor: selectedCategory === category.id ? "primary.50" : "background.paper",
                      transition: "all 0.2s",
                      "&:hover": {
                        borderColor: selectedCategory === category.id ? "primary.main" : "grey.300",
                      },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: category.color, width: 40, height: 40 }}>
                        <category.icon size={20} />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="600">
                          {category.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Daily Report
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Student Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Report Date"
                  type="date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Month</InputLabel>
                  <Select value={month} label="Month" onChange={(e) => setMonth(e.target.value)}>
                    <MenuItem value="january">January</MenuItem>
                    <MenuItem value="february">February</MenuItem>
                    <MenuItem value="march">March</MenuItem>
                    <MenuItem value="april">April</MenuItem>
                    <MenuItem value="may">May</MenuItem>
                    <MenuItem value="june">June</MenuItem>
                    <MenuItem value="july">July</MenuItem>
                    <MenuItem value="august">August</MenuItem>
                    <MenuItem value="september">September</MenuItem>
                    <MenuItem value="october">October</MenuItem>
                    <MenuItem value="november">November</MenuItem>
                    <MenuItem value="december">December</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<Printer size={16} />}
                onClick={handlePrint}
                sx={{ textTransform: "none" }}
              >
                Print Report
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download size={16} />}
                onClick={handleExport}
                sx={{ textTransform: "none" }}
              >
                Export PDF
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Box>
        <PrintPreview reportType="Daily" studentName={studentName} reportDate={reportDate}>
          {selectedCategory === "qaida-noorani" && (
            <QaidaNooraniReport studentName={studentName} reportDate={reportDate} month={month} />
          )}
          {selectedCategory === "nazera" && (
            <NazeraReport studentName={studentName} reportDate={reportDate} month={month} />
          )}
          {selectedCategory === "hifz" && (
            <HifzReport studentName={studentName} reportDate={reportDate} month={month} />
          )}
        </PrintPreview>
      </Box>
    </Stack>
  )
}
