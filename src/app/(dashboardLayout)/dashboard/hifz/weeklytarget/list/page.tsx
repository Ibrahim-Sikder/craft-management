"use client"

import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  TextField,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  InputAdornment,
  Avatar,
} from "@mui/material"
import { Search, FilterList, Visibility, Download, CalendarToday, Person, Description } from "@mui/icons-material"

 function ReportsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterType, setFilterType] = useState("all")

  // Mock data for reports
  const reports = [
    {
      id: 1,
      studentName: "Ahmed Hassan",
      category: "Qaida & Noorani",
      type: "Daily",
      date: "2024-01-15",
      status: "Completed",
      teacher: "Ustaz Rahman",
    },
    {
      id: 2,
      studentName: "Fatima Ali",
      category: "Nazera",
      type: "Weekly",
      date: "2024-01-14",
      status: "In Progress",
      teacher: "Ustaza Khadija",
    },
    {
      id: 3,
      studentName: "Omar Ibrahim",
      category: "Hifz",
      type: "Daily",
      date: "2024-01-13",
      status: "Completed",
      teacher: "Ustaz Abdullah",
    },
    {
      id: 4,
      studentName: "Aisha Mohammad",
      category: "Qaida & Noorani",
      type: "Weekly",
      date: "2024-01-12",
      status: "Completed",
      teacher: "Ustaza Maryam",
    },
    {
      id: 5,
      studentName: "Yusuf Ahmed",
      category: "Hifz",
      type: "Weekly",
      date: "2024-01-11",
      status: "Pending Review",
      teacher: "Ustaz Rahman",
    },
  ]

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || report.category === filterCategory
    const matchesType = filterType === "all" || report.type === filterType
    return matchesSearch && matchesCategory && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "success"
      case "In Progress":
        return "primary"
      case "Pending Review":
        return "warning"
      default:
        return "default"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Qaida & Noorani":
        return "#10b981"
      case "Nazera":
        return "#3b82f6"
      case "Hifz":
        return "#8b5cf6"
      default:
        return "#6b7280"
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Card elevation={2}>
        <CardHeader>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Description />
            <Typography variant="h5" component="h1" fontWeight="bold">
              Report History
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            View and manage all student reports
          </Typography>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  label="Category"
                  startAdornment={<FilterList sx={{ mr: 1 }} />}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="Qaida & Noorani">Qaida & Noorani</MenuItem>
                  <MenuItem value="Nazera">Nazera</MenuItem>
                  <MenuItem value="Hifz">Hifz</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Type</InputLabel>
                <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} label="Type">
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {filteredReports.map((report) => (
          <Card key={report.id} elevation={1} sx={{ "&:hover": { elevation: 3 } }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      background: "linear-gradient(45deg, #3b82f6 30%, #8b5cf6 90%)",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="h3" fontWeight="semibold">
                      {report.studentName}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <Chip
                        label={report.category}
                        size="small"
                        sx={{
                          backgroundColor: getCategoryColor(report.category) + "20",
                          color: getCategoryColor(report.category),
                          fontWeight: "medium",
                        }}
                      />
                      <Chip label={`${report.type} Report`} variant="outlined" size="small" />
                      <Chip label={report.status} color={getStatusColor(report.status) } size="small" />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ textAlign: "right" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                      <CalendarToday fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        {report.date}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Teacher: {report.teacher}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="outlined" size="small" startIcon={<Visibility />}>
                      View
                    </Button>
                    <Button variant="outlined" size="small" startIcon={<Download />}>
                      Download
                    </Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {filteredReports.length === 0 && (
        <Card elevation={1}>
          <CardContent sx={{ p: 6, textAlign: "center" }}>
            <Description sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" component="h3" fontWeight="semibold" sx={{ mb: 1 }}>
              No reports found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search criteria or create a new report.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default ReportsList