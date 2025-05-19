/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  alpha,
  Avatar,
} from "@mui/material"
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  Print,
  FileDownload,
  Refresh,
  School,
  Person,
  CurrencyExchange,
  Phone,
  Email,
  Badge,
} from "@mui/icons-material"
import Link from "next/link"
import { useDeleteStudentMutation, useGetAllStudentsQuery } from "@/redux/api/studentApi"

import Swal from "sweetalert2"

const StudentList = () => {
  const theme = useTheme()

  const customColors = {
    primary: "#6a1b9a",
    secondary: "#00838f",
    success: "#2e7d32",
    error: "#c62828",
    warning: "#ff8f00",
    info: "#0277bd",
    accent1: "#ad1457",
    accent2: "#6a1b9a",
    accent3: "#283593",
    accent4: "#00695c",
    background: "#f5f5f5",
  }


  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    className: "",
    section: "",
    status: "",
    gender: "",
    studentType: "",
  })


  // Fetch real data from backend
  const {
    data: studentData,
    isLoading,
    refetch,
  } = useGetAllStudentsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })
  const [deleteStudent] = useDeleteStudentMutation()

  const students = studentData?.data || []
  const totalStudents = studentData?.meta?.total || 0

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setPage(0)
  }

  // Handle filter change
  const handleFilterChange = (e: any) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      className: "",
      section: "",
      status: "",
      gender: "",
      studentType: "",
    })
    setSearchTerm("")
    refetch()
  }


  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }


  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }


  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success"
      case "Inactive":
        return "error"
      case "Graduated":
        return "info"
      default:
        return "default"
    }
  }


  const getStudentTypeColor = (type: string) => {
    switch (type) {
      case "Residential":
        return customColors.accent1
      case "Non-Residential":
        return customColors.accent3
      default:
        return customColors.accent4
    }
  }


  const handleDelete = async (id: string) => {


    setTimeout(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this student?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteStudent(id).unwrap();

            Swal.fire({
              title: "Deleted!",
              text: `student has been deleted successfully.`,
              icon: "success"
            });


            refetch();
          } catch (err: any) {

            Swal.fire({
              title: "Error!",
              text: err.data?.message || "Failed to delete student",
              icon: "error"
            });
          }
        }
      });
    }, 100);
  };

  // Apply filters to students
  const filteredStudents = students.filter((student: any) => {
    let match = true

    if (filters.className && student.className !== filters.className) match = false
    if (filters.section && student.section !== filters.section) match = false
    if (filters.status && student.status !== filters.status) match = false
    if (filters.gender && student.gender !== filters.gender) match = false
    if (filters.studentType && student.studentType !== filters.studentType) match = false

    return match
  })

  // Calculate statistics
  // const activeStudents = students.filter((s: any) => s.status === "Active").length
  // const inactiveStudents = students.filter((s: any) => s.status !== "Active").length
  // const maleStudents = students.filter((s: any) => s.gender === "Male").length
  // const femaleStudents = students.filter((s: any) => s.gender === "Female").length

  // Get unique classes and sections for statistics
  const classes: string[] = [...new Set(students.map((s: any) => s.className as string))] as string[]
  const sections = [...new Set(students.map((s: any) => s.section))]

  return (
    <Container maxWidth="xl" sx={{p:{xs:"4px"}}}>
      <div
        className="mb-6 py-6 rounded-lg text-white"
        style={{
          background: "linear-gradient(135deg, #6a1b9a 0%, #283593 100%)",
        }}
      >
        <div className="flex items-center justify-center">
          <School sx={{ mr: 1, fontSize: { xs: 20, sm: 12, md: 40 } }} />
          <div className="text-lg md:text-4xl font-bold">Student Management System</div>
        </div>
        <div className="flex justify-center mt-2">
          <h1 className="text-sm md:text-base">Comprehensive view of all students</h1>
        </div>
      </div>



      <Card
        sx={{
          mb: 3,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: `0 4px 20px 0 ${alpha(theme.palette.grey[500], 0.2)}`,
        }}
      >
        <Box
          sx={{
            p: 2,
            background: `linear-gradient(90deg, ${alpha(customColors.secondary, 0.1)} 0%, ${alpha(customColors.accent2, 0.05)} 100%)`,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Typography variant="h6" sx={{ color: customColors.secondary, fontWeight: "bold", mb: 2 }}>
            Student Directory
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by name, ID, email, or mobile..."
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="primary" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 },
                }}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 1, flexWrap: "wrap" }}
              >
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => setShowFilters(!showFilters)}
                  color={showFilters ? "primary" : "inherit"}
                  sx={{ borderRadius: 6 }}
                >
                  Filters
                </Button>
                <Button variant="outlined" startIcon={<Print />} sx={{ borderRadius: 6 }}>
                  Print
                </Button>
                <Button variant="outlined" startIcon={<FileDownload />} sx={{ borderRadius: 6 }}>
                  Export
                </Button>
                <Button variant="outlined" startIcon={<Refresh />} onClick={resetFilters} sx={{ borderRadius: 6 }}>
                  Reset
                </Button>
                <Button
                  component={Link}
                  href="/dashboard/super_admin/student/create"
                  variant="contained"
                  startIcon={<Add />}
                  sx={{
                    borderRadius: 6,
                    background: `linear-gradient(45deg, ${customColors.primary} 30%, ${customColors.accent3} 90%)`,
                    boxShadow: `0 3px 5px 2px ${alpha(customColors.primary, 0.3)}`,
                  }}
                >
                  Add Student
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {showFilters && (
          <Box
            sx={{
              p: 2,
              bgcolor: alpha(theme.palette.background.paper, 0.7),
              borderRadius: 1,
              mx: 2,
              my: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: `inset 0 2px 4px 0 ${alpha(theme.palette.common.black, 0.05)}`,
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 2, color: customColors.secondary, fontWeight: "medium" }}>
              Advanced Filters
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Class</InputLabel>
                  <Select name="className" value={filters.className} label="Class" onChange={handleFilterChange}>
                    <MenuItem value="">All Classes</MenuItem>
                    {classes.map((cls: string) => (
                      <MenuItem key={cls} value={cls}>
                        {cls}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Section</InputLabel>
                  <Select name="section" value={filters.section} label="Section" onChange={handleFilterChange}>
                    <MenuItem value="">All Sections</MenuItem>
                    {sections.map((section: any) => (
                      <MenuItem key={section} value={section}>
                        {section}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select name="status" value={filters.status} label="Status" onChange={handleFilterChange}>
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Graduated">Graduated</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Gender</InputLabel>
                  <Select name="gender" value={filters.gender} label="Gender" onChange={handleFilterChange}>
                    <MenuItem value="">All Genders</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Student Type</InputLabel>
                  <Select
                    name="studentType"
                    value={filters.studentType}
                    label="Student Type"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="Residential">Residential</MenuItem>
                    <MenuItem value="Non-Residential">Non-Residential</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        )}

        <CardContent sx={{ p: 0 }}>
          <TableContainer sx={{
            overflowX: "auto",  
            WebkitOverflowScrolling: "touch",  
            maxWidth: "100vw"  
          }}>
            <Table sx={{ minWidth: { xs: 0, md: 650 } }}>
              <TableHead>
                <TableRow
                  sx={{
                    background: `linear-gradient(90deg, ${alpha(customColors.primary, 0.05)} 0%, ${alpha(customColors.accent3, 0.1)} 100%)`,
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold", color: customColors.primary, width: { xs: 2 }  }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: customColors.primary, width: { xs: 2 }  }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: customColors.primary, width: { xs: 2 }  }}>Class</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: customColors.primary, display: { xs: "none", md: "table-cell" }, width: { xs: 5 }  }}>Roll</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: customColors.primary, display: { xs: "none", md: "table-cell" }, width: { xs: 5 }  }}>Guardian</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: customColors.primary, display: { xs: "none", md: "table-cell" }, width: { xs: 5 }  }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: customColors.primary, width: { xs: 2 }  }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: customColors.primary, width: { xs: 2 }  }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1">Loading students...</Typography>
                    </TableCell>
                  </TableRow>
                ) : filteredStudents.length > 0 ? (
                  filteredStudents.map((student: any) => (
                    <TableRow
                      key={student._id}
                      hover
                      sx={{
                        "&:hover": {
                          bgcolor: alpha(customColors.accent2, 0.05),
                          transition: "all 0.2s",
                        },
                      }}
                    >
                      <TableCell sx={{    width: { xs: 2 } }}>
                        <Chip
                          label={student.studentId}
                          size="small"
                          sx={{
                            bgcolor: alpha(customColors.accent3, 0.1),
                            color: customColors.accent3,
                            fontWeight: "medium",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{    }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={student.studentPhoto}
                            sx={{ width: { sm: 10, md: 80 }, height: { sm: 10, md: 80 }, border: "4px solid white" }}
                          />
                          <Box>
                            <div className="text-sm md:text-lg">
                              {student.name}
                            </div>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
                            >
                              <Email fontSize="small" sx={{ mr: 0.5, fontSize: 12 }} />
                              {student.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{    }}>
                        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                          {student.className}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          {student.section}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                        <Chip
                          label={student.studentClassRoll}
                          size="small"
                          sx={{
                            bgcolor: alpha(customColors.secondary, 0.1),
                            color: customColors.secondary,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                        <Typography variant="body2">{student.guardianName}</Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          {student.relation}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                          <Phone fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
                          {student.mobile || "N/A"}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Phone fontSize="small" sx={{ mr: 0.5, fontSize: 12 }} />
                          {student.guardianMobile}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{    }}>
                        <Chip
                          label={student.studentType}
                          size="small"
                          sx={{
                            bgcolor: alpha(getStudentTypeColor(student.studentType), 0.1),
                            color: getStudentTypeColor(student.studentType),
                            fontWeight: "medium",
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{    }}>
                        <Box sx={{ display: "flex" }}>
                          <Tooltip title="View Details">
                            <IconButton
                              component={Link}
                              href={`/dashboard/super_admin/student/profile/${student._id}`}
                              size="small"
                              sx={{
                                color: customColors.info,
                                "&:hover": { bgcolor: alpha(customColors.info, 0.1) },
                              }}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Student">
                            <IconButton
                              component={Link}
                              href={`/dashboard/super_admin/student/update/${student._id}`}
                              size="small"
                              sx={{
                                color: customColors.primary,
                                "&:hover": { bgcolor: alpha(customColors.primary, 0.1) },
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Student">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(student._id)}
                              sx={{
                                color: customColors.error,
                                "&:hover": { bgcolor: alpha(customColors.error, 0.1) },
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1">No students found</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Try adjusting your search or filter criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={totalStudents}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                color: customColors.primary,
              },
            }}
          />
        </CardContent>
      </Card>
    </Container>
  )
}

export default StudentList
