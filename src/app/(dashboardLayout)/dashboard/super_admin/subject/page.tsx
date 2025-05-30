/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import {
  Container,
  TextField,
  Button,
  IconButton,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  alpha,
  createTheme,
  ThemeProvider,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Refresh as RefreshIcon,
  MenuBook as MenuBookIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material"
import Link from "next/link"
import { useDeleteSubjectMutation, useGetAllSubjectsQuery } from "@/redux/api/subjectApi"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Loader from "@/app/loading"
import { customTheme } from "@/ThemeStyle"


export default function SubjectManagementPage() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const [searchTerm, setSearchTerm] = useState("")
  const [paperFilter, setPaperFilter] = useState<string | null>(null)
  const [classFilter, setClassFilter] = useState<string | null>(null)
  const [optionalFilter, setOptionalFilter] = useState<boolean | null>(null)
  const [orderBy, setOrderBy] = useState<string>("name")
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const [selectedSubject, setSelectedSubject] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")

  const {
    data: subjectData,
    isLoading,
    refetch,
  } = useGetAllSubjectsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })

  const [deleteSubject, { isLoading: isDeleting }] = useDeleteSubjectMutation()

  const theme = customTheme

  const subjects = subjectData?.data?.subjects || []

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

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
      setPage(0)
    }

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleDeleteClick = (subject: any) => {
    setSelectedSubject(subject)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedSubject) return

    try {
      const res = await deleteSubject(selectedSubject._id).unwrap()
      if (res.success) {
        setSnackbarMessage(`Subject "${selectedSubject.name}" deleted successfully`)
        setSnackbarSeverity("success")
        setSnackbarOpen(true)
        toast.success("Subject deleted successfully")
        refetch() 
      }
    } catch (error: any) {
      setSnackbarMessage(error?.data?.message || "Failed to delete subject")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
      toast.error("Failed to delete subject")
    } finally {
      setDeleteDialogOpen(false)
      setSelectedSubject(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setSelectedSubject(null)
  }  

  const handleEditSubject = (id: string) => {
    router.push(`/dashboard/super_admin/subject/update/${id}`)
  }

  const filteredSubjects = subjects
    .filter(
      (subject: any) =>
        (searchTerm === "" ||
          subject.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          subject.code?.toLowerCase()?.includes(searchTerm?.toLowerCase())) &&
        (paperFilter === null || subject.paper === paperFilter) &&
        (classFilter === null || (subject.classes && subject.classes.some((c: any) => c.className === classFilter))) &&
        (optionalFilter === null || subject.isOptional === optionalFilter),
    )
    .sort((a: any, b: any) => {
      if (orderBy === "name") {
        return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }

      if (orderBy === "code") {
        return order === "asc" ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code)
      }

      if (orderBy === "paper") {
        return order === "asc" ? a.paper.localeCompare(b.paper) : b.paper.localeCompare(a.paper)
      }

      if (orderBy === "createdAt") {
        return order === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }

      return 0
    })

  const paginatedSubjects = filteredSubjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const getSubjectColor = (name: string) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.info.main,
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <ThemeProvider theme={theme}>

      <div className="flex-grow rounded-4xl" style={{
        background: `linear-gradient(135deg, rgba(63, 81, 181, 0.2) 0%, rgba(245, 245, 245, 0.7) 100%)`,
      }}>
        <Container maxWidth="xl" className="mt-0 mb-8 rounded-lg">
          <Fade in={true} timeout={800}>
            <div>
              <div className="md:flex justify-between items-center mb-3 flex-wrap gap-2 pt-5">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                  <MenuBookIcon sx={{ height: 40, width: 40, color: "#6366f1" }} />
                  <h1>Subject Management</h1>
                </div>
                <div className="flex gap-2">
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
                    href="/dashboard/super_admin/subject/new"
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                    }}
                  >
                    Add New Subject
                  </Button>
                </div>
              </div>

              <div className="mb-4 overflow-hidden bg-white shadow-sm rounded-3xl">
                <div className="p-2 border-b border-gray-100">
                  <div className="grid grid-cols-12 gap-1 items-center">
                    <div className="col-span-12 md:col-span-5 mt-3">
                      <TextField
                        fullWidth
                        placeholder="Search by Subject Name or Code..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearch}
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
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <Loader/>
                ) : (
                  <>
                    <TableContainer sx={{
                      overflowX: "auto",
                      WebkitOverflowScrolling: "touch",
                      maxWidth: "100vw"
                    }}>
                      <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <span>SL. No.</span>
                            </TableCell>
                            <TableCell>
                              <div
                                className="flex items-center cursor-pointer select-none"
                                onClick={() => handleSort("name")}
                              >
                                <span className={orderBy === "name" ? "text-primary" : ""}>
                                  Subject
                                </span>
                                {orderBy === "name" && (
                                  <span className="ml-0.5 inline-flex">
                                    {order === "asc" ? (
                                      <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                      <ArrowDownwardIcon fontSize="small" />
                                    )}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div
                                className="flex items-center cursor-pointer select-none"
                                onClick={() => handleSort("paper")}
                              >
                                <span className={orderBy === "paper" ? "text-primary" : ""}>
                                  Paper
                                </span>
                                {orderBy === "paper" && (
                                  <span className="ml-0.5 inline-flex">
                                    {order === "asc" ? (
                                      <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                      <ArrowDownwardIcon fontSize="small" />
                                    )}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell align="right">
                              <span>Actions</span>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {paginatedSubjects.length > 0 ? (
                            paginatedSubjects.map((subject: any, index: number) => (
                              <TableRow key={subject._id} className="transition-all duration-200">
                                <TableCell>
                                  <span>{index + 1}</span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <Avatar
                                      src={subject.image || ""}
                                      sx={{
                                        width: 32,
                                        height: 32,
                                        mr: 1.5,
                                        bgcolor: getSubjectColor(subject.name),
                                        fontSize: "0.875rem",
                                      }}
                                    >
                                      {subject.name.charAt(0)}
                                    </Avatar>
                                    <span className="text-sm">{subject.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    icon={<AssignmentIcon fontSize="small" />}
                                    label={subject.paper}
                                    size="small"
                                    color="info"
                                    sx={{
                                      fontWeight: 500,
                                    }}
                                  />
                                </TableCell>
                                <TableCell align="right">
                                  <div className="flex justify-end">
                                    <Tooltip title="Edit Subject">
                                      <IconButton
                                        size="small"
                                        onClick={() => handleEditSubject(subject._id)}
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
                                    <Tooltip title="Delete Subject">
                                      <IconButton
                                        size="small"
                                        sx={{
                                          color: "error.main",
                                          bgcolor: alpha(theme.palette.error.main, 0.1),
                                          "&:hover": {
                                            bgcolor: alpha(theme.palette.error.main, 0.2),
                                          },
                                        }}
                                        onClick={() => handleDeleteClick(subject)}
                                      >
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={8} align="center" className="py-8">
                                <div className="text-center">
                                  <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                                  <h6 className="text-lg font-medium mb-2">No subjects found</h6>
                                  <p className="text-gray-500">
                                    Try adjusting your search or filter to find what you're looking for.
                                  </p>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    
                    <TablePagination
                      rowsPerPageOptions={[15, 25, 50]}
                      component="div"
                      count={filteredSubjects.length}
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
              </div>
            </div>
          </Fade>
        </Container>
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle className="pb-1">
          <h6 className="text-lg font-semibold">Delete Subject</h6>
        </DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to delete the subject &quot;{selectedSubject?.name}&quot;? This action cannot be
            undone.
          </p>
        </DialogContent>
        <DialogActions className="px-3 pb-3">
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="inherit"
            sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error" className="ml-2" disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}
