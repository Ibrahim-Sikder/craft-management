/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Fade,
  createTheme,
  ThemeProvider,
  Checkbox,
} from "@mui/material"
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Add,
  Save,
} from "@mui/icons-material"
import TodayLesson from "./_components/TodayLesson"
import TodayTask from "./_components/TodayTask"
import CraftForm from "@/components/Forms/Form"
import CraftDatePicker from "@/components/Forms/DatePicker"
import CraftAutoComplete from "@/components/Forms/AutoComplete"
import CraftSelect from "@/components/Forms/Select"
import CraftTextArea from "@/components/Forms/TextArea"
import { classHour, className, subjectName, teacherName } from "@/options"
import CraftIntAutoComplete from "@/components/Forms/CruftAutocomplete"
import CraftSelectWithSearch from "@/components/Forms/CraftSelectWithSearch "
import { customTheme, generateStudentsData } from "@/data"
import { getUserInfo } from "@/services/auth.services"
import { UserRole } from "@/types"
import { getFromLocalStorage } from "@/utils/local.storage"


export default function ClassesListPage() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    class: "",
    batch: "",
    teacher: "",
    date: "",
    day: "",
  })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedBrand, setSelectedBrand] = useState("")
  const [filteredSubjects, setFilteredVehicles] = useState<any[]>([])

  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const [openTask, setTaskOpen] = useState(false)
  const handleTaskOpen = () => setTaskOpen(true)
  const handleTaskClose = () => setTaskOpen(false)

  const [openLesson, setLessonOpen] = useState(false)
  const handleLessonOpen = () => setLessonOpen(true)
  const handleLessonClose = () => setLessonOpen(false)
  // const storedUser = getFromLocalStorage('user-info');

  const storedUserString = getFromLocalStorage('user-info');
  const storedUser = storedUserString ? JSON.parse(storedUserString) : null;


  const theme = customTheme
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setStudents(generateStudentsData())
      setLoading(false)
    }, 1000)
  }, [refreshKey])

  const handleSubmit = (data: any) => {
    console.log(data)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    setAnchorEl(null)
  }

  const handleDeleteConfirm = () => {
    setStudents(students.filter((s) => s.id !== selectedStudent?.id))
    setDeleteDialogOpen(false)
    setSelectedStudent(null)
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
  }

  const handleCheckboxChange = (id: number) => {
    setStudents(
      students.map((student) => (student.id === id ? { ...student, dairyFillUp: !student.dairyFillUp } : student)),
    )
  }

  const handleTaskStatusChange = (id: number, value: string) => {
    setStudents(students.map((student) => (student.id === id ? { ...student, taskStatus: value } : student)))
  }

  const handleHandwritingChange = (id: number, value: string) => {
    setStudents(students.map((student) => (student.id === id ? { ...student, handwriting: value } : student)))
  }

  const filteredStudents = students.filter(
    (student) =>
      (searchTerm === "" || student.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.class === "" || student.class === filters.class) &&
      (filters.batch === "" || student.batch === filters.batch) &&
      (filters.teacher === "" || student.teacher === filters.teacher) &&
      (filters.day === "" || student.day === filters.day),
  )
  const sortedVehicleName = subjectName.sort((a, b) => {
    if (a.value < b.value) return -1
    if (a.value > b.value) return 1
    return 0
  })

  const handleClassName = (event: any, newValue: any) => {
    setSelectedBrand(newValue)

    // Filter and sort the vehicles
    const filtered = sortedVehicleName
      ?.filter((vehicle: any) => vehicle.label?.toLowerCase().includes(newValue?.toLowerCase()))
      .sort((a: any, b: any) => a.label.localeCompare(b.label))

    setFilteredVehicles(filtered)
  }
  const paginatedStudents = filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <>
      <ThemeProvider theme={theme}>
        <CraftForm onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", borderRadius: 2 }}>
            <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2 }}>
              <Fade in={true} timeout={800}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                      flexWrap: "wrap",
                      gap: 2,
                      paddingTop: 2,
                    }}
                  >
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
                      + Add New Report
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleTaskOpen}
                        sx={{
                          bgcolor: "",
                          borderRadius: 2,
                          boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                        }}
                      >
                        {/* Add Today Task  */}
                        আজকের পাঠ
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleLessonOpen}
                        sx={{
                          bgcolor: "#3792de",
                          borderRadius: 2,
                          boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                        }}
                      >
                        {/* Add Home Task  */}
                        বাড়ির কাজ
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                        // component={Link}
                        // href="/dashboard/super_admin/classes/report"
                        sx={{
                          bgcolor: "#4F0187",
                          borderRadius: 2,
                          boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                        }}
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>

                  <Paper elevation={0} sx={{ mb: 4, overflow: "hidden" }}>
                    <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>

                      <Grid container spacing={2} alignItems="center" gap={3}>
                        <Grid container spacing={2}>
                          {/* Teacher Name */}
                          <Grid item xs={12} md={4}>

                            <CraftSelectWithSearch
                              name="teacher"
                              label="শিক্ষকের নাম"
                              placeholder="শিক্ষকের নাম লিখুন"
                              options={teacherName}
                              defaultValue={storedUser?.name}
                            />

                          </Grid>

                          <Grid item xs={12} md={2}>
                            <CraftIntAutoComplete
                              name="class"
                              label="শ্রেণীর নাম লিখুন"
                              fullWidth
                              freeSolo
                              multiple={false}
                              // options={className.map((option) => option.label)}
                              options={className}
                              onInputChange={(event, newValue) => { }}
                              onChange={handleClassName}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <CraftIntAutoComplete
                              name="subject"
                              label="বিষয়ের নাম লিখুন"
                              fullWidth
                              freeSolo
                              multiple={false}
                              options={filteredSubjects.map((option) => option.value)}
                              onInputChange={(event, newValue) => { }}
                            />
                          </Grid>
                          <Grid item xs={12} md={1}>
                            <CraftSelect
                              name="hour"
                              label="ঘন্টা"
                              items={classHour}
                              sx={{ minWidth: 100 }}
                            />
                          </Grid>
                          {/* Date */}
                          <Grid item xs={12} md={2}>
                            <CraftDatePicker name="date" label="তারিখ" />
                          </Grid>
                        </Grid>
                      </Grid>

                    </Box>

                    {loading ? (
                      <Box sx={{ p: 2 }}>
                        {Array.from(new Array(5)).map((_, index) => (
                          <Box key={index} sx={{ display: "flex", py: 2, px: 2, alignItems: "center" }}>
                            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                            <Box sx={{ width: "100%" }}>
                              <Skeleton variant="text" width="40%" height={30} />
                              <Box sx={{ display: "flex", mt: 1 }}>
                                <Skeleton variant="text" width="20%" sx={{ mr: 2 }} />
                                <Skeleton variant="text" width="30%" />
                              </Box>
                            </Box>
                            <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <>
                        <TableContainer>
                          <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                              <TableRow>
                                <TableCell>ছাত্রের নাম</TableCell>
                                <TableCell>পাঠ মূল্যায়ন</TableCell>
                                <TableCell>হাতের লিখা</TableCell>
                                <TableCell>উপস্থিতি</TableCell>
                                <TableCell align="center">অভিভাবকের স্বাক্ষর</TableCell>
                                <TableCell align="center">মন্তব্য</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredStudents.length === 0 && (
                                <TableRow>
                                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                                    <Box sx={{ textAlign: "center" }}>
                                      <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                                      <Typography variant="h6" gutterBottom>
                                        No students found
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                        Try adjusting your search or filter to find what you&apos;re looking for.
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              )}

                              {paginatedStudents.length > 0 ? (
                                paginatedStudents.map((student) => (
                                  <TableRow key={student.id} sx={{ transition: "all 0.2s" }}>
                                    <TableCell component="th" scope="row">
                                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                        {student.name}
                                      </Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                      <CraftSelect
                                        name="read"
                                        items={["পড়া শিখেছে", "আংশিক শিখেছে", "পড়া শিখেনি"]}
                                        sx={{ minWidth: 160 }}
                                      />
                                    </TableCell>

                                    <TableCell align="center">
                                      <CraftForm onSubmit={handleSubmit}>
                                        <CraftSelect
                                          name="handwriting"
                                          items={["লিখেছে", "আংশিক লিখেছে", "লিখেনি"]}
                                          sx={{ minWidth: 160 }}
                                        />
                                      </CraftForm>
                                    </TableCell>
                                    <TableCell align="center">
                                      <CraftForm onSubmit={handleSubmit}>
                                        <CraftSelect
                                          name="attendance"
                                          items={["উপস্থিত", "অনুপস্থিত", "ছুটি"]}
                                          sx={{ minWidth: 160 }}
                                        />
                                      </CraftForm>
                                    </TableCell>
                                    <TableCell align="center">
                                      <Checkbox
                                        color="primary"
                                        checked={student.dairyFillUp}
                                        onChange={() => handleCheckboxChange(student.id)}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <CraftForm onSubmit={handleSubmit}>
                                        <CraftTextArea name="comments" label="মন্তব্য" placeholder="মন্তব্য" minRows={1} />
                                      </CraftForm>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                                    <Box sx={{ textAlign: "center" }}>
                                      <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                                      <Typography variant="h6" gutterBottom>
                                        No students found
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                        Try adjusting your search or filter to find what you&apos;re looking for.
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </>
                    )}
                  </Paper>
                </Box>
              </Fade>
            </Container>
          </Box>

          {/* Context Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1,
                minWidth: 180,
                borderRadius: 2,
                overflow: "hidden",
              },
            }}
          >
            <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
              <VisibilityIcon fontSize="small" sx={{ mr: 2, color: "info.main" }} />
              View Details
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
              <EditIcon fontSize="small" sx={{ mr: 2, color: "warning.main" }} />
              Edit
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleDeleteClick} sx={{ py: 1.5, color: "error.main" }}>
              <DeleteIcon fontSize="small" sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Menu>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteCancel}
            PaperProps={{
              sx: {
                borderRadius: 3,
                width: "100%",
                maxWidth: 480,
              },
            }}
          >
            <DialogTitle sx={{ pb: 1 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Delete Student
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete the student &#34;{selectedStudent?.name}&#34;? This action cannot be
                undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                onClick={handleDeleteCancel}
                variant="outlined"
                color="inherit"
                sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
              >
                Cancel
              </Button>
              <Button onClick={handleDeleteConfirm} variant="contained" color="error" sx={{ ml: 2 }}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </CraftForm>
      </ThemeProvider>
      {openTask && <TodayTask open={openTask} setOpen={handleTaskClose} />}
      {openLesson && <TodayLesson open={openLesson} setOpen={handleLessonClose} />}
    </>
  )
}
