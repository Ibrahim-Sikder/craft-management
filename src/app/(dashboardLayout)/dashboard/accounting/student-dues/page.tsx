"use client"

import { useState } from "react"
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Container,
} from "@mui/material"
import { Search, Download, Warning, Phone, Message, Email } from "@mui/icons-material"

export default function StudentDues() {
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const dueStudents = [
    {
      id: 1,
      name: "রহিম উদ্দিন",
      class: "6C",
      roll: "12",
      totalDue: 7500,
      months: ["November", "December", "January"],
      phone: "01712345678",
      lastContact: "2024-01-10",
      priority: "High",
    },
    {
      id: 2,
      name: "ফাতিমা খাতুন",
      class: "6B",
      roll: "05",
      totalDue: 2500,
      months: ["January"],
      phone: "01798765432",
      lastContact: "2024-01-12",
      priority: "Medium",
    },
    {
      id: 3,
      name: "করিম মিয়া",
      class: "6B",
      roll: "15",
      totalDue: 5000,
      months: ["December", "January"],
      phone: "01656789012",
      lastContact: "2024-01-08",
      priority: "High",
    },
    {
      id: 4,
      name: "নাসির আহমেদ",
      class: "6A",
      roll: "18",
      totalDue: 2500,
      months: ["January"],
      phone: "01534567890",
      lastContact: "2024-01-14",
      priority: "Low",
    },
  ]

  const getPriorityChip = (priority: string) => {
    switch (priority) {
      case "High":
        return <Chip label="উচ্চ" color="error" size="small" />
      case "Medium":
        return <Chip label="মধ্যম" color="warning" size="small" />
      case "Low":
        return <Chip label="নিম্ন" color="success" size="small" />
      default:
        return <Chip label={priority} color="default" size="small" />
    }
  }

  return (
   <Container maxWidth='xl'>

 <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Student Due Report
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ছাত্রদের বকেয়া রিপোর্ট - বকেয়া পরিমাণ ও যোগাযোগ ব্যবস্থাপনা
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<Message />} size="large">
            Send SMS Reminder
          </Button>
          <Button variant="contained" startIcon={<Download />} size="large">
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "error.light", mx: "auto", mb: 2 }}>
                <Warning />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="error.main">
                14
              </Typography>
              <Typography variant="body2" color="text.secondary">
                মোট বকেয়াদার ছাত্র
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "error.light", mx: "auto", mb: 2 }}>
                <Warning />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="error.main">
                ৳ 45,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                মোট বকেয়া পরিমাণ
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "error.light", mx: "auto", mb: 2 }}>
                <Warning />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="error.main">
                6
              </Typography>
              <Typography variant="body2" color="text.secondary">
                জরুরি ভিত্তিতে যোগাযোগ প্রয়োজন
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "warning.light", mx: "auto", mb: 2 }}>
                <Warning />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="warning.main">
                ৳ 3,214
              </Typography>
              <Typography variant="body2" color="text.secondary">
                গড় বকেয়া পরিমাণ
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Due Students Management */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Due Students Management
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            বকেয়াদার ছাত্রদের তালিকা ও যোগাযোগ ব্যবস্থাপনা
          </Typography>

          {/* Filters */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="ছাত্রের নাম বা রোল নম্বর লিখুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select value={classFilter} label="Class" onChange={(e) => setClassFilter(e.target.value)}>
                  <MenuItem value="all">All Classes</MenuItem>
                  <MenuItem value="6a">Class 6A</MenuItem>
                  <MenuItem value="6b">Class 6B</MenuItem>
                  <MenuItem value="6c">Class 6C</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select value={priorityFilter} label="Priority" onChange={(e) => setPriorityFilter(e.target.value)}>
                  <MenuItem value="all">All Priority</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Due Students Table */}
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Student Info (ছাত্রের তথ্য)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Due Amount (বকেয়া)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Due Months (বকেয়া মাস)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Contact (যোগাযোগ)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Priority (অগ্রাধিকার)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Last Contact</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dueStudents.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {student.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Class {student.class} - Roll {student.roll}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" fontWeight={700} color="error.main">
                        ৳ {student.totalDue.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {student.months.map((month, index) => (
                          <Chip key={index} label={month} variant="outlined" size="small" />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{student.phone}</Typography>
                    </TableCell>
                    <TableCell>{getPriorityChip(student.priority)}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{student.lastContact}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <IconButton size="small" color="primary">
                          <Phone />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <Message />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <Email />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Bulk Actions */}
          <Card sx={{ mt: 3, bgcolor: "grey.50" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Bulk Actions (একসাথে কাজ)
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button variant="outlined" startIcon={<Message />}>
                  Send SMS to All
                </Button>
                <Button variant="outlined" startIcon={<Phone />}>
                  Call High Priority
                </Button>
                <Button variant="outlined" startIcon={<Download />}>
                  Export Due List
                </Button>
              </Box>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Box>
   </Container>
  )
}
