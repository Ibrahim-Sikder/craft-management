/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Avatar,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Menu,
  MenuItem,
  Divider,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Skeleton,
  Fade,
  alpha,

  ThemeProvider,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Book as BookIcon,
  School as SchoolIcon,
} from "@mui/icons-material"
import Link from "next/link"
import { useGetAllClassesQuery } from "@/redux/api/classApi"
import { theme } from "@/lib/Theme/Theme"
import { grey } from "@mui/material/colors"

export default function ClassesListPage() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [orderBy, setOrderBy] = useState<string>("name")
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedClass, setSelectedClass] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const {
    data: classData,
    isLoading,
    refetch,
  } = useGetAllClassesQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })


  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleRefresh = () => {
    refetch()
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleFilterSelect = (status: string | null) => {
    setStatusFilter(status)
    setFilterAnchorEl(null)
    setPage(0)
  }

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, classItem: any) => {
    setAnchorEl(event.currentTarget)
    setSelectedClass(classItem)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    setAnchorEl(null)
  }

  const handleDeleteConfirm = () => {
    // Implement actual delete logic here
    setDeleteDialogOpen(false)
    setSelectedClass(null)
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
  }

  // Get the classes from the API response
  const classes = classData?.data?.classes || []

  // Get the total count from the API response
  const totalCount = classData?.data?.meta?.total || 0



  return (
    <ThemeProvider theme={theme}>
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
                  Classes
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                    sx={{ borderRadius: 2 }}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link}
                    href="/dashboard/super_admin/classes/class/new"
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                    }}
                  >
                    Add New Class
                  </Button>
                </Box>
              </Box>

              <Paper elevation={0} sx={{ mb: 4, overflow: "hidden" }}>
                <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        placeholder="Search classes by name, code or teacher..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon color="action" />
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: 2,
                            bgcolor: "background.paper",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "rgba(0, 0, 0, 0.1)",
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                        <Button
                          variant="outlined"
                          color="inherit"
                          startIcon={<FilterListIcon />}
                          onClick={handleFilterClick}
                          sx={{
                            borderColor: "rgba(0, 0, 0, 0.12)",
                            color: "text.secondary",
                            "&:hover": {
                              borderColor: "primary.main",
                              bgcolor: "rgba(99, 102, 241, 0.04)",
                            },
                            ...(statusFilter && {
                              borderColor: "primary.main",
                              color: "primary.main",
                              bgcolor: "rgba(99, 102, 241, 0.04)",
                            }),
                          }}
                        >
                          {statusFilter || "Filter by Status"}
                        </Button>
                        <Menu
                          anchorEl={filterAnchorEl}
                          open={Boolean(filterAnchorEl)}
                          onClose={handleFilterClose}
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
                          <MenuItem
                            onClick={() => handleFilterSelect(null)}
                            sx={{
                              py: 1.5,
                              ...(statusFilter === null && {
                                bgcolor: "rgba(99, 102, 241, 0.08)",
                                color: "primary.main",
                              }),
                            }}
                          >
                            All Statuses
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleFilterSelect("Active")}
                            sx={{
                              py: 1.5,
                              ...(statusFilter === "Active" && {
                                bgcolor: "rgba(99, 102, 241, 0.08)",
                                color: "primary.main",
                              }),
                            }}
                          >
                            <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                            Active
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleFilterSelect("Inactive")}
                            sx={{
                              py: 1.5,
                              ...(statusFilter === "Inactive" && {
                                bgcolor: "rgba(99, 102, 241, 0.08)",
                                color: "primary.main",
                              }),
                            }}
                          >
                            <CancelIcon fontSize="small" color="error" sx={{ mr: 1 }} />
                            Inactive
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleFilterSelect("Pending")}
                            sx={{
                              py: 1.5,
                              ...(statusFilter === "Pending" && {
                                bgcolor: "rgba(99, 102, 241, 0.08)",
                                color: "primary.main",
                              }),
                            }}
                          >
                            <AccessTimeIcon fontSize="small" color="warning" sx={{ mr: 1 }} />
                            Pending
                          </MenuItem>
                        </Menu>

                        {!isMobile && (
                          <>
                            <Button
                              variant="outlined"
                              color="inherit"
                              startIcon={<DownloadIcon />}
                              sx={{
                                borderColor: "rgba(0, 0, 0, 0.12)",
                                color: "text.secondary",
                                "&:hover": {
                                  borderColor: "primary.main",
                                  bgcolor: "rgba(99, 102, 241, 0.04)",
                                },
                              }}
                            >
                              Export
                            </Button>
                            <Button
                              variant="outlined"
                              color="inherit"
                              startIcon={<PrintIcon />}
                              sx={{
                                borderColor: "rgba(0, 0, 0, 0.12)",
                                color: "text.secondary",
                                "&:hover": {
                                  borderColor: "primary.main",
                                  bgcolor: "rgba(99, 102, 241, 0.04)",
                                },
                              }}
                            >
                              Print
                            </Button>
                          </>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                {isLoading ? (
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
                        <TableHead sx={{ bgcolor:grey[100] }}>
                          <TableRow sx={{  }}>
                            <TableCell sx={{ fontWeight: 600 }}>
                              SL. No
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                              Class Name
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                              Section
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                              Class Teacher
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                              Total Students
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                              Total Subjects
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {classes.length > 0 ? (
                            classes.map((classItem: any, index: number) => {
                              // Get the teacher name from the teachers array
                              const teacherName =
                                classItem.teachers && classItem.teachers.length > 0
                                  ? classItem.teachers[0].name
                                  : "No Teacher"

                              // Get the number of students
                              const studentCount = classItem.students ? classItem.students.length : 0

                              // Get the number of subjects
                              const subjectCount = classItem.subjects ? classItem.subjects.length : 0

                              // Format the date
                              const createdDate = new Date(classItem.createdAt).toLocaleDateString()

                              return (
                                <TableRow key={classItem._id} sx={{ transition: "all 0.2s" }}>
                                  <TableCell component="th" scope="row">
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                      {index + 1}
                                    </Typography>
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                      {classItem.className}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        maxWidth: 200,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {classItem.section || "No Section"}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                      <Avatar
                                        sx={{
                                          width: 32,
                                          height: 32,
                                          mr: 1.5,
                                          bgcolor: "primary.main",
                                          fontSize: "0.875rem",
                                        }}
                                      >
                                        <PersonIcon fontSize="small" />
                                      </Avatar>
                                      <Typography variant="body2">{teacherName}</Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      icon={<SchoolIcon fontSize="small" />}
                                      label={`${studentCount} student${studentCount !== 1 ? "s" : ""}`}
                                      size="small"
                                      sx={{
                                        bgcolor: alpha(theme.palette.info.main, 0.1),
                                        color: "info.main",
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      icon={<BookIcon fontSize="small" />}
                                      label={`${subjectCount} subject${subjectCount !== 1 ? "s" : ""}`}
                                      size="small"
                                      sx={{
                                        bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                        color: "secondary.main",
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell align="right">
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                      {!isMobile && (
                                        <>
                                          <Tooltip title="View Details">
                                            <IconButton
                                              size="small"
                                              sx={{
                                                color: "info.main",
                                                bgcolor: alpha(theme.palette.info.main, 0.1),
                                                mr: 1,
                                                "&:hover": {
                                                  bgcolor: alpha(theme.palette.info.main, 0.2),
                                                },
                                              }}
                                            >
                                              <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="Edit Class">
                                            <IconButton
                                              component={Link}
                                              href={`/dashboard/super_admin/classes/class/update?id=${classItem._id}`}
                                              size="small"
                                              sx={{
                                                color: "warning.main",
                                                bgcolor: alpha(theme.palette.warning.main, 0.1),
                                                mr: 1,
                                                "&:hover": {
                                                  bgcolor: alpha(theme.palette.warning.main, 0.2),
                                                },
                                              }}
                                            >
                                              <EditIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                        </>
                                      )}
                                      <Tooltip title="More Actions">
                                        <IconButton
                                          size="small"
                                          onClick={(e) => handleMenuClick(e, classItem)}
                                          sx={{
                                            color: "text.secondary",
                                            bgcolor: "rgba(0, 0, 0, 0.04)",
                                            "&:hover": {
                                              bgcolor: "rgba(0, 0, 0, 0.08)",
                                            },
                                          }}
                                        >
                                          <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              )
                            })
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                                <Box sx={{ textAlign: "center" }}>
                                  <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                                  <Typography variant="h6" gutterBottom>
                                    No classes found
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
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      component="div"
                      count={totalCount}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      sx={{
                        borderTop: "1px solid rgba(0, 0, 0, 0.06)",
                      }}
                    />
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
          Edit Class
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteClick} sx={{ py: 1.5, color: "error.main" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 2 }} />
          Delete Class
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
            Delete Class
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the class &#34;{selectedClass?.className}&#34;? This action cannot be
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
    </ThemeProvider>
  )
}






// <TableCell>
//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   alignItems: "center",
//                                   cursor: "pointer",
//                                   userSelect: "none",
//                                   color: orderBy === "className" ? "primary.main" : "inherit",
//                                 }}
//                                 onClick={() => handleSort("className")}
//                               >
//                                 Class Name
//                                 {orderBy === "className" && (
//                                   <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
//                                     {order === "asc" ? (
//                                       <ArrowUpwardIcon fontSize="small" />
//                                     ) : (
//                                       <ArrowDownwardIcon fontSize="small" />
//                                     )}
//                                   </Box>
//                                 )}
//                               </Box>
//                             </TableCell>
//                             <TableCell>
//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   alignItems: "center",
//                                   cursor: "pointer",
//                                   userSelect: "none",
//                                 }}
//                               >
//                                 Description
//                               </Box>
//                             </TableCell>