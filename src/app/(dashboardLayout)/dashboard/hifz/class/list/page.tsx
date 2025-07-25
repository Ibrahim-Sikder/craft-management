/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Chip,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Fab,
  Tabs,
  Tab,
  InputAdornment,
  Divider,
  LinearProgress,
} from "@mui/material"
import { Add, Edit, Delete, Search, Class, Schedule, Groups, School, AccessTime, LocationOn } from "@mui/icons-material"

interface ClassData {
  id: number
  name: string
  level: string
  section: string
  teacher: string
  teacherAvatar: string
  students: number
  maxCapacity: number
  schedule: string
  room: string
  startTime: string
  endTime: string
  days: string[]
  subject: string
  status: "Active" | "Inactive" | "Completed"
  progress: number
  description: string
}

const initialClasses: ClassData[] = [
  {
    id: 1,
    name: "Hifz Beginners",
    level: "Level 1",
    section: "A",
    teacher: "Qari Muhammad Hassan",
    teacherAvatar: "/placeholder.svg?height=40&width=40",
    students: 25,
    maxCapacity: 30,
    schedule: "Morning",
    room: "Room 101",
    startTime: "08:00",
    endTime: "10:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    subject: "Quran Memorization",
    status: "Active",
    progress: 65,
    description: "Foundation level Hifz class for new students",
  },
  {
    id: 2,
    name: "Advanced Hifz",
    level: "Level 3",
    section: "B",
    teacher: "Qaria Fatima Bibi",
    teacherAvatar: "/placeholder.svg?height=40&width=40",
    students: 20,
    maxCapacity: 25,
    schedule: "Evening",
    room: "Room 201",
    startTime: "16:00",
    endTime: "18:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    subject: "Advanced Memorization",
    status: "Active",
    progress: 85,
    description: "Advanced level for students completing their Hifz",
  },
  {
    id: 3,
    name: "Tajweed Mastery",
    level: "Level 2",
    section: "C",
    teacher: "Hafiz Ahmed Ali",
    teacherAvatar: "/placeholder.svg?height=40&width=40",
    students: 18,
    maxCapacity: 20,
    schedule: "Afternoon",
    room: "Room 102",
    startTime: "14:00",
    endTime: "15:30",
    days: ["Monday", "Wednesday", "Friday"],
    subject: "Tajweed",
    status: "Active",
    progress: 72,
    description: "Specialized class for perfecting Quranic recitation",
  },
]

export default function Classes() {
  const [classes, setClasses] = useState<ClassData[]>(initialClasses)
  const [open, setOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<ClassData | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    section: "",
    teacher: "",
    maxCapacity: "",
    schedule: "",
    room: "",
    startTime: "",
    endTime: "",
    days: [] as string[],
    subject: "",
    description: "",
  })

  const handleOpen = (classData?: ClassData) => {
    if (classData) {
      setEditingClass(classData)
      setFormData({
        name: classData.name,
        level: classData.level,
        section: classData.section,
        teacher: classData.teacher,
        maxCapacity: classData.maxCapacity.toString(),
        schedule: classData.schedule,
        room: classData.room,
        startTime: classData.startTime,
        endTime: classData.endTime,
        days: classData.days,
        subject: classData.subject,
        description: classData.description,
      })
    } else {
      setEditingClass(null)
      setFormData({
        name: "",
        level: "",
        section: "",
        teacher: "",
        maxCapacity: "",
        schedule: "",
        room: "",
        startTime: "",
        endTime: "",
        days: [],
        subject: "",
        description: "",
      })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingClass(null)
  }

  const handleSubmit = () => {
    if (editingClass) {
      setClasses(
        classes.map((c) =>
          c.id === editingClass.id
            ? {
              ...c,
              ...formData,
              maxCapacity: Number.parseInt(formData.maxCapacity),
            }
            : c,
        ),
      )
    } else {
      const newClass: ClassData = {
        id: Date.now(),
        ...formData,
        maxCapacity: Number.parseInt(formData.maxCapacity),
        students: 0,
        teacherAvatar: "/placeholder.svg?height=40&width=40",
        status: "Active",
        progress: 0,
      }
      setClasses([...classes, newClass])
    }
    handleClose()
  }

  const handleDelete = (id: number) => {
    setClasses(classes.filter((c) => c.id !== id))
  }

  const filteredClasses = classes.filter(
    (classData) =>
      classData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classData.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classData.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success"
      case "Inactive":
        return "warning"
      case "Completed":
        return "primary"
      default:
        return "default"
    }
  }

  const ClassCard = ({ classData }: { classData: ClassData }) => (
    <Card sx={{ height: "100%", position: "relative", overflow: "visible", width: '70%' }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          height: 100,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-center",
          px: 3,
          color: "white",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {classData.name}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {classData.level} - Section {classData.section}
          </Typography>
        </Box>
        <Chip
          label={classData.status}
          color={getStatusColor(classData.status) as any}
          size="small"
          sx={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}
        />
      </Box>

      <CardContent sx={{ pt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar src={classData.teacherAvatar} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {classData.teacher}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Class Teacher
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" fontWeight="medium">
              Class Progress
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="primary">
              {classData.progress}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={classData.progress} sx={{ height: 8, borderRadius: 4 }} />
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="primary" fontWeight="bold">
                {classData.students}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Students
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="secondary" fontWeight="bold">
                {classData.maxCapacity}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Capacity
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          <Chip icon={<Schedule />} label={classData.schedule} size="small" />
          <Chip icon={<LocationOn />} label={classData.room} size="small" color="primary" />
          <Chip
            icon={<AccessTime />}
            label={`${classData.startTime}-${classData.endTime}`}
            size="small"
            color="secondary"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {classData.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {classData.subject}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => handleOpen(classData)} color="primary">
              <Edit />
            </IconButton>
            <IconButton size="small" onClick={() => handleDelete(classData.id)} color="error">
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )



  return (
    <Box maxWidth='xl' width='100%'>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Classes Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Organize and manage your Hifz classes efficiently
        </Typography>
      </Box>

      {/* Search and Actions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <TextField
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 300 }}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpen()}
              sx={{
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                px: 3,
                py: 1.5,
              }}
            >
              Add New Class
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Card View" />
        </Tabs>
      </Box>

      {/* Content */}
      {
        <Grid container spacing={3}>
          {filteredClasses.map((classData) => (
            <Grid item xs={12} sm={6} md={4} key={classData.id}>
              <ClassCard classData={classData} />
            </Grid>
          ))}
        </Grid>
      }

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => handleOpen()}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        }}
      >
        <Add />
      </Fab>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {editingClass ? "Edit Class" : "Add New Class"}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Class Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Class />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select
                  value={formData.level}
                  label="Level"
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                >
                  <MenuItem value="Level 1">Level 1 - Beginners</MenuItem>
                  <MenuItem value="Level 2">Level 2 - Intermediate</MenuItem>
                  <MenuItem value="Level 3">Level 3 - Advanced</MenuItem>
                  <MenuItem value="Level 4">Level 4 - Expert</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Section</InputLabel>
                <Select
                  value={formData.section}
                  label="Section"
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                >
                  <MenuItem value="A">Section A</MenuItem>
                  <MenuItem value="B">Section B</MenuItem>
                  <MenuItem value="C">Section C</MenuItem>
                  <MenuItem value="D">Section D</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Teacher</InputLabel>
                <Select
                  value={formData.teacher}
                  label="Teacher"
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                >
                  <MenuItem value="Qari Muhammad Hassan">Qari Muhammad Hassan</MenuItem>
                  <MenuItem value="Qaria Fatima Bibi">Qaria Fatima Bibi</MenuItem>
                  <MenuItem value="Hafiz Ahmed Ali">Hafiz Ahmed Ali</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Max Capacity"
                type="number"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Groups />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Schedule</InputLabel>
                <Select
                  value={formData.schedule}
                  label="Schedule"
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                >
                  <MenuItem value="Morning">Morning</MenuItem>
                  <MenuItem value="Afternoon">Afternoon</MenuItem>
                  <MenuItem value="Evening">Evening</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Room"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <School />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Time"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Time"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Days</InputLabel>
                <Select
                  multiple
                  value={formData.days}
                  label="Days"
                  onChange={(e) => setFormData({ ...formData, days: e.target.value as string[] })}
                >
                  <MenuItem value="Monday">Monday</MenuItem>
                  <MenuItem value="Tuesday">Tuesday</MenuItem>
                  <MenuItem value="Wednesday">Wednesday</MenuItem>
                  <MenuItem value="Thursday">Thursday</MenuItem>
                  <MenuItem value="Friday">Friday</MenuItem>
                  <MenuItem value="Saturday">Saturday</MenuItem>
                  <MenuItem value="Sunday">Sunday</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              px: 3,
            }}
          >
            {editingClass ? "Update" : "Add"} Class
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
