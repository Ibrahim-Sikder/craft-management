"use client"

import type React from "react"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Avatar,
  Chip,
  useTheme,
  alpha,
} from "@mui/material"
import { Download, Print, Home, Notifications, Add, Menu as MenuIcon, Search } from "@mui/icons-material"
import { ThemeProvider, createTheme } from "@mui/material/styles"

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f7fa",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
  },
})

// Mock data for students
const students = [
  {
    id: "2025401",
    name: "MD TAHMID HAIDER",
    class: "MD TAREQ HAIDER",
    mobile: "null",
    parentMobile: "1754502026",
    selected: false,
  },
  {
    id: "2025402",
    name: "SADIKUR RHMAN",
    class: "NASRUL ISLAM",
    mobile: "null",
    parentMobile: "1625452497",
    selected: false,
  },
  {
    id: "2025403",
    name: "RIDHWAH ISLAM",
    class: "DIN ISLAM MINTU",
    mobile: "null",
    parentMobile: "0171535421",
    selected: false,
  },
  {
    id: "2025404",
    name: "MD. FAHIM ABDULLAH",
    class: "MD. IBRAHIM",
    mobile: "null",
    parentMobile: "0176757273",
    selected: false,
  },
  {
    id: "2025405",
    name: "RIYADUL ISLAM NABHAN",
    class: "MD ROMAN MIAH",
    mobile: "null",
    parentMobile: "0193485534",
    selected: false,
  },
  {
    id: "2025501",
    name: "ABDULLAH AL IMRAN",
    class: "MD MAYDUL ISLAM",
    mobile: "null",
    parentMobile: "0193349169",
    selected: false,
  },
]

export default function AdmitCardPage() {
  const [studentData, setStudentData] = useState(students)
  const [sendSMS, setSendSMS] = useState(false)
  const muiTheme = useTheme()

  const handleCheckboxChange = (id: string) => {
    setStudentData(
      studentData.map((student) => (student.id === id ? { ...student, selected: !student.selected } : student)),
    )
  }

  const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudentData(
      studentData.map((student) => ({
        ...student,
        selected: event.target.checked,
      })),
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh" }}>
        <AppBar position="static" elevation={0} color="default" sx={{ bgcolor: "white" }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button
              variant="outlined"
              sx={{
                mx: 1,
                borderColor: alpha(muiTheme.palette.primary.main, 0.5),
                color: "text.primary",
              }}
            >
              Branch
            </Button>
            <Button variant="contained" startIcon={<Add />} sx={{ mx: 1 }}>
              New
            </Button>
            <IconButton color="inherit">
              <Home />
            </IconButton>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>CI</Avatar>
              <Typography variant="subtitle2" sx={{ ml: 1 }}>
                Craft International Institute
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Admit Card Management
            </Typography>
            <Button variant="contained" startIcon={<Download />} color="primary" sx={{ fontWeight: "bold" }}>
              DOWNLOAD ADMIT CARD
            </Button>
          </Box>

          <Paper sx={{ p: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Dakhila Number"
                  variant="outlined"
                  defaultValue="343"
                  InputProps={{
                    sx: { bgcolor: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Relation"
                  variant="outlined"
                  defaultValue="In nihil voluptate accusantium sint similique expedita sapiente adipiscing"
                  InputProps={{
                    sx: { bgcolor: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Class</InputLabel>
                  <Select label="Class" defaultValue="Four" sx={{ bgcolor: "white" }}>
                    <MenuItem value="Four">Four</MenuItem>
                    <MenuItem value="Five">Five</MenuItem>
                    <MenuItem value="Six">Six</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Batch</InputLabel>
                  <Select label="Batch" defaultValue="" sx={{ bgcolor: "white" }}>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Section</InputLabel>
                  <Select label="Section" defaultValue="" sx={{ bgcolor: "white" }}>
                    <MenuItem value="Morning">Morning</MenuItem>
                    <MenuItem value="Day">Day</MenuItem>
                    <MenuItem value="Evening">Evening</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Active Session</InputLabel>
                  <Select label="Active Session" defaultValue="2025" sx={{ bgcolor: "white" }}>
                    <MenuItem value="2023">2023</MenuItem>
                    <MenuItem value="2024">2024</MenuItem>
                    <MenuItem value="2025">2025</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Additional Note"
                  variant="outlined"
                  multiline
                  rows={1}
                  defaultValue="Sed nemo dolorem nisi non ea consequatur neque voluptatem"
                  InputProps={{
                    sx: { bgcolor: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Previous Dues"
                  variant="outlined"
                  defaultValue="77"
                  InputProps={{
                    sx: { bgcolor: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Other Fee"
                  variant="outlined"
                  defaultValue="54"
                  InputProps={{
                    sx: { bgcolor: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Exam</InputLabel>
                  <Select label="Exam" defaultValue="" sx={{ bgcolor: "white" }}>
                    <MenuItem value="Midterm">Midterm</MenuItem>
                    <MenuItem value="Final">Final</MenuItem>
                    <MenuItem value="Test">Test</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox checked={sendSMS} onChange={(e) => setSendSMS(e.target.checked)} color="primary" />
                  }
                  label="Send attendance SMS"
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ overflow: "hidden" }}>
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: alpha(muiTheme.palette.primary.main, 0.05),
              }}
            >
              <Typography variant="h6">Student Information</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  placeholder="Search students..."
                  size="small"
                  InputProps={{
                    startAdornment: <Search fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />,
                  }}
                  sx={{ bgcolor: "white", borderRadius: 1 }}
                />
                <Button variant="contained" startIcon={<Print />}>
                  Print Selected
                </Button>
              </Box>
            </Box>
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: alpha(muiTheme.palette.primary.main, 0.03) }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        onChange={handleSelectAllChange}
                        checked={studentData.every((s) => s.selected)}
                        indeterminate={studentData.some((s) => s.selected) && !studentData.every((s) => s.selected)}
                      />
                    </TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Parent Mobile</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentData.map((student) => (
                    <TableRow
                      key={student.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        bgcolor: student.selected ? alpha(muiTheme.palette.primary.main, 0.05) : "inherit",
                        "&:hover": { bgcolor: alpha(muiTheme.palette.primary.main, 0.08) },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={student.selected} onChange={() => handleCheckboxChange(student.id)} />
                      </TableCell>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {student.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>
                        {student.mobile === "null" ? (
                          <Chip size="small" label="Not Available" variant="outlined" />
                        ) : (
                          student.mobile
                        )}
                      </TableCell>
                      <TableCell>{student.parentMobile}</TableCell>
                      <TableCell align="right">
                        <Button size="small" variant="outlined" startIcon={<Download />} sx={{ mr: 1 }}>
                          Admit Card
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) => theme.palette.grey[100],
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2025 Techneous. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
