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
import { Add, Edit, Delete, Search, Subject, MenuBook, Schedule, Groups } from "@mui/icons-material"

interface SubjectData {
  id: number
  name: string
  code: string
  description: string
  category: string
  level: string
  duration: number
  totalClasses: number
  completedClasses: number
  teachers: string[]
  students: number
  status: "Active" | "Inactive" | "Completed"
  difficulty: "Easy" | "Medium" | "Hard"
  prerequisites: string[]
  objectives: string[]
}

const initialSubjects: SubjectData[] = [
  {
    id: 1,
    name: "Quran Memorization",
    code: "QM101",
    description: "Complete memorization of the Holy Quran with proper Tajweed",
    category: "Core",
    level: "All Levels",
    duration: 24,
    totalClasses: 200,
    completedClasses: 130,
    teachers: ["Qari Muhammad Hassan", "Qaria Fatima Bibi"],
    students: 85,
    status: "Active",
    difficulty: "Hard",
    prerequisites: ["Basic Arabic", "Tajweed Basics"],
    objectives: ["Complete Quran memorization", "Perfect recitation", "Understanding meanings"],
  },
  {
    id: 2,
    name: "Tajweed Rules",
    code: "TJ201",
    description: "Learn the proper pronunciation and recitation rules of the Quran",
    category: "Foundation",
    level: "Beginner",
    duration: 6,
    totalClasses: 50,
    completedClasses: 35,
    teachers: ["Hafiz Ahmed Ali"],
    students: 45,
    status: "Active",
    difficulty: "Medium",
    prerequisites: ["Arabic Alphabet"],
    objectives: ["Master Tajweed rules", "Improve recitation", "Understand Makharij"],
  },
  {
    id: 3,
    name: "Qirat (Recitation Styles)",
    code: "QR301",
    description: "Advanced study of different Quranic recitation styles",
    category: "Advanced",
    level: "Advanced",
    duration: 12,
    totalClasses: 80,
    completedClasses: 20,
    teachers: ["Qari Muhammad Hassan"],
    students: 15,
    status: "Active",
    difficulty: "Hard",
    prerequisites: ["Complete Hifz", "Advanced Tajweed"],
    objectives: ["Learn multiple Qirat", "Perfect pronunciation", "Historical understanding"],
  },
  {
    id: 4,
    name: "Islamic Studies",
    code: "IS101",
    description: "Comprehensive study of Islamic history, jurisprudence, and theology",
    category: "Supplementary",
    level: "Intermediate",
    duration: 8,
    totalClasses: 60,
    completedClasses: 45,
    teachers: ["Hafiz Ahmed Ali", "Qaria Fatima Bibi"],
    students: 60,
    status: "Active",
    difficulty: "Medium",
    prerequisites: ["Basic Arabic"],
    objectives: ["Islamic history knowledge", "Fiqh understanding", "Hadith studies"],
  },
]

export default function Subjects() {
  const [subjects, setSubjects] = useState<SubjectData[]>(initialSubjects)
  const [open, setOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState<SubjectData | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    category: "",
    level: "",
    duration: "",
    totalClasses: "",
    difficulty: "",
    prerequisites: [] as string[],
    objectives: [] as string[],
  })

  const handleOpen = (subject?: SubjectData) => {
    if (subject) {
      setEditingSubject(subject)
      setFormData({
        name: subject.name,
        code: subject.code,
        description: subject.description,
        category: subject.category,
        level: subject.level,
        duration: subject.duration.toString(),
        totalClasses: subject.totalClasses.toString(),
        difficulty: subject.difficulty,
        prerequisites: subject.prerequisites,
        objectives: subject.objectives,
      })
    } else {
      setEditingSubject(null)
      setFormData({
        name: "",
        code: "",
        description: "",
        category: "",
        level: "",
        duration: "",
        totalClasses: "",
        difficulty: "",
        prerequisites: [],
        objectives: [],
      })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingSubject(null)
  }

  const handleSubmit = () => {
    
    handleClose()
  }

  const handleDelete = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id))
  }

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.category.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "success"
      case "Medium":
        return "warning"
      case "Hard":
        return "error"
      default:
        return "default"
    }
  }

  const SubjectCard = ({ subject }: { subject: SubjectData }) => (
    <Card sx={{ height: "100%", position: "relative", overflow: "visible" }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          height: 100,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          color: "white",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {subject.name}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {subject.code} • {subject.level}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Chip
            label={subject.status}
            color={getStatusColor(subject.status) as any}
            size="small"
            sx={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white", mb: 1 }}
          />
          <br />
          <Chip
            label={subject.difficulty}
            color={getDifficultyColor(subject.difficulty) as any}
            size="small"
            sx={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}
          />
        </Box>
      </Box>

      <CardContent sx={{ pt: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
          {subject.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" fontWeight="medium">
              Course Progress
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="primary">
              {Math.round((subject.completedClasses / subject.totalClasses) * 100)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(subject.completedClasses / subject.totalClasses) * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            {subject.completedClasses} of {subject.totalClasses} classes completed
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="primary" fontWeight="bold">
                {subject.students}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Students
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="secondary" fontWeight="bold">
                {subject.duration}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Months
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="success.main" fontWeight="bold">
                {subject.teachers.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Teachers
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          <Chip icon={<MenuBook />} label={subject.category} size="small" />
          <Chip icon={<Schedule />} label={`${subject.duration} months`} size="small" color="primary" />
          <Chip icon={<Groups />} label={`${subject.students} students`} size="small" color="secondary" />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {subject.teachers.length} teacher(s) assigned
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => handleOpen(subject)} color="primary">
              <Edit />
            </IconButton>
            <IconButton size="small" onClick={() => handleDelete(subject.id)} color="error">
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  const SubjectTable = () => (
    <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Table>
        <TableHead sx={{ background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" }}>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Subject</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Duration</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Progress</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Students</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Difficulty</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSubjects.map((subject) => (
            <TableRow key={subject.id} hover>
              <TableCell>
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    {subject.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {subject.code} • {subject.level}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip label={subject.category} size="small" />
              </TableCell>
              <TableCell>
                <Typography variant="body2">{subject.duration} months</Typography>
                <Typography variant="caption" color="text.secondary">
                  {subject.totalClasses} classes
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ width: 100 }}>
                  <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography variant="caption">
                      {Math.round((subject.completedClasses / subject.totalClasses) * 100)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(subject.completedClasses / subject.totalClasses) * 100}
                  />
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="bold">
                  {subject.students}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip label={subject.difficulty} color={getDifficultyColor(subject.difficulty) as any} size="small" />
              </TableCell>
              <TableCell>
                <Chip label={subject.status} color={getStatusColor(subject.status) as any} size="small" />
              </TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => handleOpen(subject)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(subject.id)} color="error">
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
          Subjects Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage curriculum subjects and track academic progress
        </Typography>
      </Box>

      {/* Search and Actions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <TextField
              placeholder="Search subjects..."
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
                background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                px: 3,
                py: 1.5,
              }}
            >
              Add New Subject
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
          {filteredSubjects.map((subject) => (
            <Grid item xs={12} sm={6} md={4} key={subject.id}>
              <SubjectCard subject={subject} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <SubjectTable />
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
          background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        }}
      >
        <Add />
      </Fab>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {editingSubject ? "Edit Subject" : "Add New Subject"}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Subject Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Subject />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Subject Code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <MenuItem value="Core">Core</MenuItem>
                  <MenuItem value="Foundation">Foundation</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                  <MenuItem value="Supplementary">Supplementary</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select
                  value={formData.level}
                  label="Level"
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                  <MenuItem value="All Levels">All Levels</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration (Months)"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Schedule />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Classes"
                type="number"
                value={formData.totalClasses}
                onChange={(e) => setFormData({ ...formData, totalClasses: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Difficulty</InputLabel>
                <Select
                  value={formData.difficulty}
                  label="Difficulty"
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                >
                  <MenuItem value="Easy">Easy</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Hard">Hard</MenuItem>
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Prerequisites</InputLabel>
                <Select
                  multiple
                  value={formData.prerequisites}
                  label="Prerequisites"
                  onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value as string[] })}
                >
                  <MenuItem value="Basic Arabic">Basic Arabic</MenuItem>
                  <MenuItem value="Arabic Alphabet">Arabic Alphabet</MenuItem>
                  <MenuItem value="Tajweed Basics">Tajweed Basics</MenuItem>
                  <MenuItem value="Complete Hifz">Complete Hifz</MenuItem>
                  <MenuItem value="Advanced Tajweed">Advanced Tajweed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Learning Objectives</InputLabel>
                <Select
                  multiple
                  value={formData.objectives}
                  label="Learning Objectives"
                  onChange={(e) => setFormData({ ...formData, objectives: e.target.value as string[] })}
                >
                  <MenuItem value="Complete Quran memorization">Complete Quran memorization</MenuItem>
                  <MenuItem value="Perfect recitation">Perfect recitation</MenuItem>
                  <MenuItem value="Understanding meanings">Understanding meanings</MenuItem>
                  <MenuItem value="Master Tajweed rules">Master Tajweed rules</MenuItem>
                  <MenuItem value="Learn multiple Qirat">Learn multiple Qirat</MenuItem>
                  <MenuItem value="Islamic history knowledge">Islamic history knowledge</MenuItem>
                </Select>
              </FormControl>
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
              background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
              px: 3,
            }}
          >
            {editingSubject ? "Update" : "Add"} Subject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
