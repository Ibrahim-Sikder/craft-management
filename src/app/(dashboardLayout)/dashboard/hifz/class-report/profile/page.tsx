/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  IconButton,
  Card,
  CardContent,
  Grid,
  Avatar,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material"
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  School as SchoolIcon,
  MenuBook as BookIcon,
  Star as StarIcon,
  CheckCircle as CheckIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material"

interface ReportData {
  date: string
  day: string
  section: string
  lesson: string
  dailyFoundation: string
  weeklyFoundation: string
  teacherSignature: string
  status: "completed" | "pending" | "excellent"
}

interface StudentInfo {
  name: string
  studentId: string
  class: string
  section: string
  avatar: string
}

interface HifzStudentReportProps {
  onBack?: () => void
}

const HifzStudentReport: React.FC<HifzStudentReportProps> = ({ onBack }) => {
  const theme = useTheme()
  const [editMode, setEditMode] = useState(false)
  const [studentInfo] = useState<StudentInfo>({
    name: "মোহাম্মদ আব্দুল্লাহ",
    studentId: "HFZ-2024-001",
    class: "হিফয বিভাগ",
    section: "আ",
    avatar: "/placeholder.svg?height=60&width=60",
  })

  const [reportData, setReportData] = useState<ReportData[]>([
    {
      date: "২০২৪-০১-১৫",
      day: "সোমবার",
      section: "সবক জমা",
      lesson: "দোয়া সংখ্যা",
      dailyFoundation: "৫টি",
      weeklyFoundation: "৩৫টি",
      teacherSignature: "উস্তাদ আহমদ",
      status: "completed",
    },
    {
      date: "২০২৪-০১-১৫",
      day: "সোমবার",
      section: "সবক জমা",
      lesson: "হালিল সংখ্যা",
      dailyFoundation: "৩টি",
      weeklyFoundation: "২১টি",
      teacherSignature: "উস্তাদ আহমদ",
      status: "excellent",
    },
    {
      date: "২০২৪-০১-১৫",
      day: "সোমবার",
      section: "সবক জমা",
      lesson: "তাজবীদের বিষয়",
      dailyFoundation: "২টি",
      weeklyFoundation: "১৪টি",
      teacherSignature: "উস্তাদ আহমদ",
      status: "completed",
    },
    {
      date: "২০২৪-০১-১৫",
      day: "সোমবার",
      section: "সবক জমা",
      lesson: "মাসায়েলের বিষয়",
      dailyFoundation: "১টি",
      weeklyFoundation: "৭টি",
      teacherSignature: "উস্তাদ আহমদ",
      status: "pending",
    },
    {
      date: "২০২৪-০১-১৫",
      day: "সোমবার",
      section: "নূরানী/কায়েদা",
      lesson: "কায়েদার পৃষ্ঠা নং",
      dailyFoundation: "৫ পৃষ্ঠা",
      weeklyFoundation: "৩৫ পৃষ্ঠা",
      teacherSignature: "উস্তাদ আহমদ",
      status: "excellent",
    },
    {
      date: "২০২৪-০১-১৫",
      day: "সোমবার",
      section: "আমপারা",
      lesson: "আম্মা পারার পৃষ্ঠা নং/পারার নাম",
      dailyFoundation: "২ পৃষ্ঠা",
      weeklyFoundation: "১৪ পৃষ্ঠা",
      teacherSignature: "উস্তাদ আহমদ",
      status: "completed",
    },
    {
      date: "২০২৪-০১-১৫",
      day: "সোমবার",
      section: "নাযেরা",
      lesson: "পারা ও পৃষ্ঠা নং",
      dailyFoundation: "৩ পৃষ্ঠা",
      weeklyFoundation: "২১ পৃষ্ঠা",
      teacherSignature: "উস্তাদ আহমদ",
      status: "completed",
    },
    {
      date: "২০২৪-০১-১৫",
      day: "সোমবার",
      section: "হিফয: সবকী",
      lesson: "সবক পারা ও পৃষ্ঠা নং",
      dailyFoundation: "১ পৃষ্ঠা",
      weeklyFoundation: "৭ পৃষ্ঠা",
      teacherSignature: "উস্তাদ আহমদ",
      status: "excellent",
    },
    {
      date: "২০২৪-০১-১৫",
      day: "সোমবার",
      section: "হিফয: সবকী",
      lesson: "সাত সবক পারা ও পৃষ্ঠা নং",
      dailyFoundation: "৭ পৃষ্ঠা",
      weeklyFoundation: "৪৯ পৃষ্ঠা",
      teacherSignature: "উস্তাদ আহমদ",
      status: "completed",
    },
    {
      date: "২০২৪-০১-১৫",
      day: "সোমবার",
      section: "হিফয: সবকী",
      lesson: "আমুখতা পারা ও পৃষ্ঠা নং",
      dailyFoundation: "৩ পৃষ্ঠা",
      weeklyFoundation: "২১ পৃষ্ঠা",
      teacherSignature: "উস্তাদ আহমদ",
      status: "excellent",
    },
    {
      date: "২০২৪-০১-১৫",
      day: "সোমবার",
      section: "হিফয: সবকী",
      lesson: "দৈনিক তিলাওয়াত",
      dailyFoundation: "১ ঘন্টা",
      weeklyFoundation: "৭ ঘন্টা",
      teacherSignature: "উস্তাদ আহমদ",
      status: "completed",
    },
    {
      date: "২০২৪-০১-১৫",
      day: "সোমবার",
      section: "হিফয: সবকী",
      lesson: "সাপ্তাহিক পরীক্ষা",
      dailyFoundation: "A+",
      weeklyFoundation: "A+",
      teacherSignature: "উস্তাদ আহমদ",
      status: "excellent",
    },
    {
      date: "২০২৪-০১-১৫",
      day: "সোমবার",
      section: "হিফয: দোহরানী",
      lesson: "আমুখতা পারা ও পৃষ্ঠা নং",
      dailyFoundation: "৫ পৃষ্ঠা",
      weeklyFoundation: "৩৫ পৃষ্ঠা",
      teacherSignature: "উস্তাদ আহমদ",
      status: "completed",
    },
    {
      date: "২০২৪-০১-১৫",
      day: "সোমবার",
      section: "হিফয: দোহরানী",
      lesson: "দৈনিক তিলাওয়াত",
      dailyFoundation: "৪৫ মিনিট",
      weeklyFoundation: "৫.২৫ ঘন্টা",
      teacherSignature: "উস্তাদ আহমদ",
      status: "excellent",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return theme.palette.success.main
      case "completed":
        return theme.palette.primary.main
      case "pending":
        return theme.palette.warning.main
      default:
        return theme.palette.grey[500]
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <StarIcon fontSize="small" />
      case "completed":
        return <CheckIcon fontSize="small" />
      case "pending":
        return <BookIcon fontSize="small" />
      default:
        return null
    }
  }

  const getSectionColor = (section: string) => {
    const colors = {
      "সবক জমা": theme.palette.primary.main,
      "নূরানী/কায়েদা": theme.palette.secondary.main,
      আমপারা: theme.palette.success.main,
      নাযেরা: theme.palette.info.main,
      "হিফয: সবকী": theme.palette.warning.main,
      "হিফয: দোহরানী": theme.palette.error.main,
    }
    return colors[section as keyof typeof colors] || theme.palette.grey[500]
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Header Card */}
      <Card
        elevation={0}
        sx={{
          mb: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              {onBack && (
                <IconButton
                  onClick={onBack}
                  sx={{
                    color: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                    mr: 2,
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              )}
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "rgba(255,255,255,0.2)",
                  border: "3px solid rgba(255,255,255,0.3)",
                }}
              >
                <SchoolIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  ক্রাফট ইন্টারন্যাশনাল ইনস্টিটিউট
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  নূরানী, নাযেরা ও হিফয শিক্ষার্থীদের দৈনিক ও সাপ্তাহিক রিপোর্ট
                </Typography>
              </Box>
            </Box>
            <Box display="flex" gap={1}>
              <Tooltip title="প্রিন্ট করুন">
                <IconButton sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}>
                  <PrintIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="ডাউনলোড করুন">
                <IconButton sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={editMode ? "সংরক্ষণ করুন" : "সম্পাদনা করুন"}>
                <IconButton
                  sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? <SaveIcon /> : <EditIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Student Info Card */}
      <Card elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                src={studentInfo.avatar}
                sx={{
                  width: 80,
                  height: 80,
                  border: `4px solid ${theme.palette.primary.main}`,
                  boxShadow: theme.shadows[3],
                }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {studentInfo.name}
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Chip label={`আইডি: ${studentInfo.studentId}`} color="primary" variant="outlined" size="small" />
                <Chip label={`শ্রেণী: ${studentInfo.class}`} color="secondary" variant="outlined" size="small" />
                <Chip label={`বিভাগ: ${studentInfo.section}`} color="success" variant="outlined" size="small" />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Report Table */}
      <Card elevation={0} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <TableContainer>
          <Table sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: theme.palette.primary.main,
                    borderRight: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  }}
                >
                  তারিখ
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: theme.palette.primary.main,
                    borderRight: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  }}
                >
                  বার
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: theme.palette.primary.main,
                    borderRight: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  }}
                >
                  বিভাগ
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: theme.palette.primary.main,
                    borderRight: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  }}
                >
                  পড়ার পরিমাণ
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: theme.palette.primary.main,
                    borderRight: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  }}
                  colSpan={2}
                >
                  ভিত্তিকরণ
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: theme.palette.primary.main,
                  }}
                >
                  শিক্ষকের স্বাক্ষর
                </TableCell>
              </TableRow>
              <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                <TableCell sx={{ border: "none" }}></TableCell>
                <TableCell sx={{ border: "none" }}></TableCell>
                <TableCell sx={{ border: "none" }}></TableCell>
                <TableCell sx={{ border: "none" }}></TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.text.secondary,
                    borderRight: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  }}
                >
                  দৈনিক
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.text.secondary,
                    borderRight: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  }}
                >
                  সাপ্তাহিক
                </TableCell>
                <TableCell sx={{ border: "none" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.02),
                    },
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                  }}
                >
                  <TableCell sx={{ borderRight: `1px solid ${alpha(theme.palette.divider, 0.3)}` }}>
                    <Typography variant="body2" fontWeight="medium">
                      {row.date}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderRight: `1px solid ${alpha(theme.palette.divider, 0.3)}` }}>
                    <Typography variant="body2" fontWeight="medium">
                      {row.day}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderRight: `1px solid ${alpha(theme.palette.divider, 0.3)}` }}>
                    <Chip
                      label={row.section}
                      size="small"
                      sx={{
                        bgcolor: alpha(getSectionColor(row.section), 0.1),
                        color: getSectionColor(row.section),
                        fontWeight: "bold",
                        border: `1px solid ${alpha(getSectionColor(row.section), 0.3)}`,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ borderRight: `1px solid ${alpha(theme.palette.divider, 0.3)}` }}>
                    <Typography variant="body2">{row.lesson}</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderRight: `1px solid ${alpha(theme.palette.divider, 0.3)}` }}>
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                      {getStatusIcon(row.status)}
                      <Typography variant="body2" fontWeight="medium" color={getStatusColor(row.status)}>
                        {row.dailyFoundation}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ borderRight: `1px solid ${alpha(theme.palette.divider, 0.3)}` }}>
                    <Typography variant="body2" fontWeight="medium" color={getStatusColor(row.status)}>
                      {row.weeklyFoundation}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: theme.palette.primary.main,
                          fontSize: "0.75rem",
                        }}
                      >
                        {row.teacherSignature.charAt(0)}
                      </Avatar>
                      <Typography variant="body2" fontWeight="medium">
                        {row.teacherSignature}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.success.main, 0.1) }}>
            <CardContent sx={{ textAlign: "center" }}>
              <StarIcon sx={{ fontSize: 40, color: theme.palette.success.main, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="success.main">
                ৩
              </Typography>
              <Typography variant="body2" color="text.secondary">
                চমৎকার পারফরম্যান্স
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
            <CardContent sx={{ textAlign: "center" }}>
              <CheckIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                ১০
              </Typography>
              <Typography variant="body2" color="text.secondary">
                সম্পন্ন কাজ
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.warning.main, 0.1) }}>
            <CardContent sx={{ textAlign: "center" }}>
              <BookIcon sx={{ fontSize: 40, color: theme.palette.warning.main, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                ১
              </Typography>
              <Typography variant="body2" color="text.secondary">
                অপেক্ষমাণ কাজ
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.info.main, 0.1) }}>
            <CardContent sx={{ textAlign: "center" }}>
              <SchoolIcon sx={{ fontSize: 40, color: theme.palette.info.main, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="info.main">
                ৯২%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                সামগ্রিক অগ্রগতি
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default HifzStudentReport
