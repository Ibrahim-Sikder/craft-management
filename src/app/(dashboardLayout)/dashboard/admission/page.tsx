/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useState, useMemo } from "react"
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  Tooltip,
  Divider,
  CircularProgress,
} from "@mui/material"
import {
  Search,
  MoreVert,
  Visibility,
  Edit,
  Delete,
  Download,
  Phone,
  LocationOn,
  CalendarToday,
  Group,
  CheckCircle,
  Pending,
  Cancel,
  Add,
} from "@mui/icons-material"
import { Playfair_Display, Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import Link from "next/link"
import { useDeleteAdmissionMutation, useGetAllAdmissionsQuery } from "@/redux/api/admissionApi"
import Swal from "sweetalert2"
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] })
const sourceSans = Source_Sans_Pro({ subsets: ["latin"], weight: ["400", "600"] })

interface Admission {
  _id: string;
  studentName: string;
  studentNameBangla: string;
  class: string;
  session: string;
  dateOfBirth: string;
  mobileNo: string;
  fatherName: string;
  motherName: string;
  presentAddress: {
    district: string;
    policeStation: string;
  };
  status?: string;
  createdAt: string;
  category?: string;
  bloodGroup?: string;
}



const AdmissionsList = () => {
  const { data: admissionData, isLoading, refetch } = useGetAllAdmissionsQuery({})
  const [deleteAdmission] = useDeleteAdmissionMutation()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [classFilter, setClassFilter] = useState("all")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedAdmission, setSelectedAdmission] = useState<string | null>(null)

  const admissions: Admission[] = useMemo(() => {
    if (!admissionData?.data) return [];

    // Add mock status if not present in API data
    return admissionData?.data?.data?.map((admission: any) => ({
      ...admission,
      status: admission.status || "pending"
    }));
  }, [admissionData])

  // Filter and search logic
  const filteredAdmissions = useMemo(() => {
    return admissions.filter((admission) => {
      const matchesSearch =
        admission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (admission.studentNameBangla || "").includes(searchTerm) ||
        admission.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admission.mobileNo.includes(searchTerm)

      const matchesStatus = statusFilter === "all" || admission.status === statusFilter
      const matchesClass = classFilter === "all" || admission.class === classFilter

      return matchesSearch && matchesStatus && matchesClass
    })
  }, [admissions, searchTerm, statusFilter, classFilter])

  // Statistics
  const stats = useMemo(() => {
    const total = admissions.length
    const approved = admissions.filter((a) => a.status === "approved").length
    const pending = admissions.filter((a) => a.status === "pending").length
    const rejected = admissions.filter((a) => a.status === "rejected").length

    return { total, approved, pending, rejected }
  }, [admissions])

  // Get unique classes for filter dropdown
  const uniqueClasses = useMemo(() => {
    return [...new Set(admissions.map(admission => admission.class))];
  }, [admissions]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, admissionId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedAdmission(admissionId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedAdmission(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "#15803d"
      case "pending":
        return "#f59e0b"
      case "rejected":
        return "#dc2626"
      default:
        return "#6b7280"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle />
      case "pending":
        return <Pending />
      case "rejected":
        return <Cancel />
      default:
        return <Pending />
    }
  }

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this admission!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteAdmission(id).unwrap()
          if (res.success) {
            Swal.fire("Deleted!", "The admission has been deleted.", "success")
            refetch(); // Refresh the data
          }
        } catch (error: any) {
          Swal.fire(
            "Failed!",
            error?.data?.message || "Could not delete admission",
            "error"
          )
        }
      }
    })
  }

  return (
    <Box maxWidth='xl' width='100%' sx={{ p: 3, bgcolor: "#f0fdf4", minHeight: "100vh" }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #15803d 0%, #84cc16 100%)",
          color: "white",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h3" className={playfair.className} sx={{ fontWeight: 700, mb: 1 }}>
              Admission Management Dashboard
            </Typography>
            <Typography variant="h6" className={sourceSans.className} sx={{ opacity: 0.9 }}>
              Streamline Your Admissions Process with Data-Driven Insights
            </Typography>
          </Box>
          <Button
            component={Link}
            href='/dashboard/admission/enroll'
            variant="contained"
            startIcon={<Add />}
            sx={{
              bgcolor: "white",
              color: "#15803d",
              "&:hover": { bgcolor: "#f0fdf4" },
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 600,
            }}
          >
            New Admission
          </Button>
        </Box>
      </Paper>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e5e7eb" }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "#15803d", mb: 1 }}>
                    {stats.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Applications
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "#dcfce7", color: "#15803d", width: 56, height: 56 }}>
                  <Group />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e5e7eb" }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "#15803d", mb: 1 }}>
                    {stats.approved}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Approved
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "#dcfce7", color: "#15803d", width: 56, height: 56 }}>
                  <CheckCircle />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e5e7eb" }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "#f59e0b", mb: 1 }}>
                    {stats.pending}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Review
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "#fef3c7", color: "#f59e0b", width: 56, height: 56 }}>
                  <Pending />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e5e7eb" }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "#dc2626", mb: 1 }}>
                    {stats.rejected}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rejected
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "#fecaca", color: "#dc2626", width: 56, height: 56 }}>
                  <Cancel />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: "1px solid #e5e7eb" }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search applicants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Application Status</InputLabel>
              <Select
                value={statusFilter}
                label="Application Status"
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                value={classFilter}
                label="Class"
                onChange={(e) => setClassFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Classes</MenuItem>
                {uniqueClasses.map((cls, index) => (
                  <MenuItem key={index} value={cls}>{cls}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Download />}
              sx={{
                borderRadius: 2,
                py: 1.5,
                borderColor: "#15803d",
                color: "#15803d",
                "&:hover": {
                  borderColor: "#15803d",
                  bgcolor: "#f0fdf4",
                },
              }}
            >
              Export
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Data Table */}
      <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f9fafb" }}>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Applicant</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Class & Session</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Submission Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : filteredAdmissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No admissions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredAdmissions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((admission) => (
                    <TableRow
                      key={admission._id}
                      sx={{
                        "&:hover": {
                          bgcolor: "#f0fdf4",
                          transition: "background-color 0.2s ease",
                        },
                      }}
                    >
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar
                            sx={{
                              bgcolor: "#15803d",
                              width: 40,
                              height: 40,
                            }}
                          >
                            {admission.studentName.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {admission.studentName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {admission.studentNameBangla}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {admission.class}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {admission.session}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box>
                          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                            <Phone sx={{ fontSize: 14, color: "text.secondary" }} />
                            <Typography variant="caption">{admission.mobileNo}</Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            Father: {admission.fatherName}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <LocationOn sx={{ fontSize: 14, color: "text.secondary" }} />
                          <Box>
                            <Typography variant="caption">{admission.presentAddress?.district}</Typography>
                            <Typography variant="caption" color="text.secondary" display="block">
                              {admission.presentAddress?.policeStation}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Chip
                          icon={getStatusIcon(admission.status || "pending")}
                          label={(admission.status || "pending").charAt(0).toUpperCase() + (admission.status || "pending").slice(1)}
                          size="small"
                          sx={{
                            bgcolor: `${getStatusColor(admission.status || "pending")}15`,
                            color: getStatusColor(admission.status || "pending"),
                            fontWeight: 500,
                            "& .MuiChip-icon": {
                              color: getStatusColor(admission.status || "pending"),
                            },
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <CalendarToday sx={{ fontSize: 14, color: "text.secondary" }} />
                          <Typography variant="caption">
                            {new Date(admission.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Tooltip title="More actions">
                          <IconButton
                            onClick={(e) => handleMenuClick(e, admission._id)}
                            size="small"
                            sx={{
                              "&:hover": {
                                bgcolor: "#f0fdf4",
                              },
                            }}
                          >
                            <MoreVert />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider />

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAdmissions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            "& .MuiTablePagination-toolbar": {
              px: 3,
            },
          }}
        />
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            mt: 1,
            minWidth: 180,
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Visibility sx={{ mr: 2, fontSize: 20 }} />
          View Details
        </MenuItem>
        <MenuItem
          component={Link}
          href={`/dashboard/admission/update/${selectedAdmission}`}
          onClick={handleMenuClose}
        >
          <Edit sx={{ mr: 2, fontSize: 20 }} />
          Edit Application
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedAdmission) {
              handleDelete(selectedAdmission);
            }
            handleMenuClose();
          }}
          sx={{ color: "#dc2626" }}
        >
          <Delete sx={{ mr: 2, fontSize: 20 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default AdmissionsList