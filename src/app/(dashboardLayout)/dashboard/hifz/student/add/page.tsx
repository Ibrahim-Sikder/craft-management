/* eslint-disable react/no-unescaped-entities */
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  LinearProgress,
  Fab,
  Tabs,
  Tab,
  InputAdornment,
  Divider,
} from "@mui/material"
import {
  Add,
  Edit,
  Delete,
  Search,
  Person,
  School,
  Star,
  MenuBook,
  Phone,
  Email,
  LocationOn,
  CalendarToday,
} from "@mui/icons-material"

interface Student {
  id: number
  name: string
  fatherName: string
  age: number
  class: string
  section: string
  phone: string
  email: string
  address: string
  joinDate: string
  hifzProgress: number
  currentSurah: string
  completedSurahs: number
  status: "Active" | "Inactive" | "Graduated"
  avatar: string
}

const initialStudents: Student[] = [
  {
    id: 1,
    name: "Ahmed Ali Khan",
    fatherName: "Ali Khan",
    age: 12,
    class: "Hifz-1",
    section: "A",
    phone: "+92-300-1234567",
    email: "ahmed@example.com",
    address: "Block A, Model Town, Lahore",
    joinDate: "2023-01-15",
    hifzProgress: 85,
    currentSurah: "Al-Baqarah",
    completedSurahs: 15,
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Fatima Hassan",
    fatherName: "Hassan Ahmed",
    age: 11,
    class: "Hifz-2",
    section: "B",
    phone: "+92-301-2345678",
    email: "fatima@example.com",
    address: "Garden Town, Karachi",
    joinDate: "2023-02-20",
    hifzProgress: 92,
    currentSurah: "Al-Imran",
    completedSurahs: 20,
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Omar Malik",
    fatherName: "Malik Saeed",
    age: 13,
    class: "Hifz-3",
    section: "A",
    phone: "+92-302-3456789",
    email: "omar@example.com",
    address: "DHA Phase 2, Islamabad",
    joinDate: "2022-09-10",
    hifzProgress: 78,
    currentSurah: "An-Nisa",
    completedSurahs: 12,
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function HifzStudents() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [open, setOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    age: "",
    class: "",
    section: "",
    phone: "",
    email: "",
    address: "",
    currentSurah: "",
    hifzProgress: 0,
  })

  const handleOpen = (student?: Student) => {
    if (student) {
      setEditingStudent(student)
      setFormData({
        name: student.name,
        fatherName: student.fatherName,
        age: student.age.toString(),
        class: student.class,
        section: student.section,
        phone: student.phone,
        email: student.email,
        address: student.address,
        currentSurah: student.currentSurah,
        hifzProgress: student.hifzProgress,
      })
    } else {
      setEditingStudent(null)
      setFormData({
        name: "",
        fatherName: "",
        age: "",
        class: "",
        section: "",
        phone: "",
        email: "",
        address: "",
        currentSurah: "",
        hifzProgress: 0,
      })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingStudent(null)
  }

  const handleSubmit = () => {
    if (editingStudent) {
      setStudents(
        students.map((s) =>
          s.id === editingStudent.id ? { ...s, ...formData, age: Number.parseInt(formData.age) } : s,
        ),
      )
    } else {
      const newStudent: Student = {
        id: Date.now(),
        ...formData,
        age: Number.parseInt(formData.age),
        joinDate: new Date().toISOString().split("T")[0],
        completedSurahs: Math.floor(formData.hifzProgress / 5),
        status: "Active",
        avatar: "/placeholder.svg?height=40&width=40",
      }
      setStudents([...students, newStudent])
    }
    handleClose()
  }

  const handleDelete = (id: number) => {
    setStudents(students.filter((s) => s.id !== id))
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success"
      case "Inactive":
        return "warning"
      case "Graduated":
        return "primary"
      default:
        return "default"
    }
  }

  const StudentCard = ({ student }: { student: Student }) => (
    <Card sx={{ height: "100%", position: "relative", overflow: "visible" }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          height: 80,
          position: "relative",
        }}
      >
        <Avatar
          src={student.avatar}
          sx={{
            width: 80,
            height: 80,
            position: "absolute",
            bottom: -40,
            left: 20,
            border: "4px solid white",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        />
        <Chip
          label={student.status}
          color={getStatusColor(student.status) as any}
          size="small"
          sx={{ position: "absolute", top: 10, right: 10 }}
        />
      </Box>
      <CardContent sx={{ pt: 6 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {student.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Father: {student.fatherName}
        </Typography>

        <Box sx={{ mt: 2, mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" fontWeight="medium">
              Hifz Progress
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="primary">
              {student.hifzProgress}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={student.hifzProgress} sx={{ height: 8, borderRadius: 4 }} />
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          <Chip icon={<School />} label={`${student.class}-${student.section}`} size="small" />
          <Chip icon={<MenuBook />} label={student.currentSurah} size="small" color="primary" />
          <Chip icon={<Star />} label={`${student.completedSurahs} Surahs`} size="small" color="secondary" />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Age: {student.age} years
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => handleOpen(student)} color="primary">
              <Edit />
            </IconButton>
            <IconButton size="small" onClick={() => handleDelete(student.id)} color="error">
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  const StudentTable = () => (
    <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Table>
        <TableHead sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Student</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Class/Section</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Progress</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Current Surah</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id} hover>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Avatar src={student.avatar} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {student.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Father: {student.fatherName}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Chip label={`${student.class}-${student.section}`} size="small" />
              </TableCell>
              <TableCell>
                <Box sx={{ width: 100 }}>
                  <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography variant="caption">{student.hifzProgress}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={student.hifzProgress} />
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{student.currentSurah}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {student.completedSurahs} completed
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{student.phone}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {student.email}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip label={student.status} color={getStatusColor(student.status) as any} size="small" />
              </TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => handleOpen(student)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(student.id)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Hifz Students Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and track your Hifz students' progress and information
        </Typography>
      </Box>

      {/* Search and Actions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <TextField
              placeholder="Search students..."
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
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                px: 3,
                py: 1.5,
              }}
            >
              Add New Student
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Card View" />
          <Tab label="Table View" />
        </Tabs>
      </Box>

      {/* Content */}
      {tabValue === 0 ? (
        <Grid container spacing={3}>
          {filteredStudents.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student.id}>
              <StudentCard student={student} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <StudentTable />
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => handleOpen()}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Add />
      </Fab>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {editingStudent ? "Edit Student" : "Add New Student"}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Student Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father Name"
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  value={formData.class}
                  label="Class"
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                >
                  <MenuItem value="Hifz-1">Hifz-1</MenuItem>
                  <MenuItem value="Hifz-2">Hifz-2</MenuItem>
                  <MenuItem value="Hifz-3">Hifz-3</MenuItem>
                  <MenuItem value="Hifz-4">Hifz-4</MenuItem>
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
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Surah"
                value={formData.currentSurah}
                onChange={(e) => setFormData({ ...formData, currentSurah: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MenuBook />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>Hifz Progress: {formData.hifzProgress}%</Typography>
              <Box sx={{ px: 2 }}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.hifzProgress}
                  onChange={(e) => setFormData({ ...formData, hifzProgress: Number.parseInt(e.target.value) })}
                  style={{ width: "100%" }}
                />
              </Box>
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
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              px: 3,
            }}
          >
            {editingStudent ? "Update" : "Add"} Student
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
