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
  Paper,
  Box,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  AutoStories as HifzIcon,
  Mosque as MosqueIcon,
} from "@mui/icons-material"
import { useDeleteHifzSubjectMutation, useGetAllHifzSubjectsQuery } from "@/redux/api/hifzSubjectApi"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Loader from "@/app/loading"
import HifzSubjectForm from "../_components/HifzSubjectForm"

export default function HifzSubjectManagementPage() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null)
  
  const {
    data: subjectData,
    isLoading,
    refetch,
  } = useGetAllHifzSubjectsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })

  const [deleteSubject, { isLoading: isDeleting }] = useDeleteHifzSubjectMutation()

  const subjects = subjectData?.data?.data || []

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

  const handleDeleteClick = (subject: any) => {
    setSelectedSubject(subject)
    setDeleteDialogOpen(true)
  }

  const handleAddClick = () => {
    setEditingSubjectId(null)
    setFormOpen(true)
  }

  const handleEditClick = (id: string) => {
    setEditingSubjectId(id)
    setFormOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedSubject) return

    try {
      const res = await deleteSubject(selectedSubject._id).unwrap()
      if (res.success) {
        toast.success("Hifz subject deleted successfully")
        refetch()
      }
    } catch (error: any) {
      toast.error("Failed to delete Hifz subject")
    } finally {
      setDeleteDialogOpen(false)
      setSelectedSubject(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setSelectedSubject(null)
  }

  const filteredSubjects = subjects.filter((subject: any) =>
    searchTerm === "" ||
    subject.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  )

  const paginatedSubjects = filteredSubjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const getSubjectColor = (name: string) => {
    const colors = [
      "#1a936f", // Islamic green
      "#3d5a80", // Deep blue
      "#9c27b0", // Purple
      "#e64a19", // Terracotta
      "#006d77", // Teal
      "#7b1fa2", // Deep purple
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className="flex-grow rounded-4xl min-h-screen" style={{
      background: "linear-gradient(135deg, #e6f2ff 0%, #f0f8ff 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 opacity-10">
        <MosqueIcon sx={{ fontSize: 300, transform: "rotate(15deg)" }} />
      </div>
      
      <Container maxWidth="xl" className="py-8">
        <Fade in={true} timeout={800}>
          <Box>
            <Box className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 pt-2">
              <Box className="flex items-center">
                <Box className="relative">
                  <Box className="absolute -inset-4 bg-green-100 rounded-full opacity-70"></Box>
                  <HifzIcon sx={{ 
                    height: 50, 
                    width: 50, 
                    color: "#1a936f",
                    position: "relative",
                    zIndex: 1
                  }} />
                </Box>
                <Box className="ml-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: "'Amiri', serif" }}>
                    Hifz Subject Management
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Manage Quran memorization subjects and chapters
                  </p>
                </Box>
              </Box>
              <Box className="flex gap-2">
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                  sx={{ 
                    borderRadius: 2,
                    borderColor: "#1a936f",
                    color: "#1a936f",
                    "&:hover": {
                      borderColor: "#166c54",
                      backgroundColor: "rgba(26, 147, 111, 0.04)"
                    }
                  }}
                >
                  Refresh
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddClick}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#1a936f",
                    boxShadow: "0px 4px 12px rgba(26, 147, 111, 0.3)",
                    "&:hover": {
                      backgroundColor: "#166c54",
                      boxShadow: "0px 6px 14px rgba(26, 147, 111, 0.4)",
                    },
                  }}
                >
                  Add New Subject
                </Button>
              </Box>
            </Box>

            <Paper 
              elevation={0}
              className="mb-8 overflow-hidden rounded-3xl border"
              sx={{ 
                borderColor: "rgba(26, 147, 111, 0.2)",
                background: "white",
                position: "relative",
              }}
            >
              <Box 
                className="p-4 border-b"
                sx={{ 
                  borderColor: "rgba(26, 147, 111, 0.1)",
                  background: "linear-gradient(to right, #f7fdfc, #f0faf8)",
                }}
              >
                <Box className="grid grid-cols-12 gap-4 items-center">
                  <Box className="col-span-12 md:col-span-5">
                    <TextField
                      fullWidth
                      placeholder="Search by Hifz subject name..."
                      variant="outlined"
                      value={searchTerm}
                      onChange={handleSearch}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ color: "#1a936f" }} />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 2,
                          bgcolor: "background.paper",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(26, 147, 111, 0.3)",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(26, 147, 111, 0.5)",
                          },
                        },
                      }}
                    />
                  </Box>
                  <Box className="col-span-12 md:col-span-7 flex justify-end">
                    <Box className="flex items-center text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                      <Box className="w-2 h-2 bg-green-500 rounded-full mr-2"></Box>
                      {filteredSubjects.length} Hifz subject{filteredSubjects.length !== 1 ? 's' : ''} found
                    </Box>
                  </Box>
                </Box>
              </Box>

              {isLoading ? (
                <Box className="py-12">
                  <Loader />
                </Box>
              ) : (
                <>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead>
                        <TableRow sx={{ 
                          backgroundColor: "rgba(26, 147, 111, 0.05)",
                          "& th": { 
                            fontWeight: "bold",
                            color: "#1a936f",
                            borderColor: "rgba(26, 147, 111, 0.1)",
                          }
                        }}>
                          <TableCell>
                            <span>No.</span>
                          </TableCell>
                          <TableCell>
                            <span>Hifz Subject</span>
                          </TableCell>
                          <TableCell align="right">
                            <span>Actions</span>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {paginatedSubjects.length > 0 ? (
                          paginatedSubjects.map((subject: any, index: number) => (
                            <TableRow 
                              key={subject._id} 
                              className="transition-all duration-200 hover:bg-green-50"
                              sx={{ 
                                "&:last-child td": { borderBottom: 0 },
                                "& td": { borderColor: "rgba(26, 147, 111, 0.1)" }
                              }}
                            >
                              <TableCell>
                                <span className="text-gray-600">{index + 1 + (page * rowsPerPage)}</span>
                              </TableCell>
                              <TableCell>
                                <Box className="flex items-center">
                                  <Avatar
                                    sx={{
                                      width: 38,
                                      height: 38,
                                      mr: 2,
                                      bgcolor: getSubjectColor(subject.name),
                                      fontSize: "1rem",
                                      fontWeight: "bold",
                                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    }}
                                  >
                                    {subject.name.charAt(0).toUpperCase()}
                                  </Avatar>
                                  <Box>
                                    <span className="text-lg font-medium text-gray-800">{subject.name}</span>
                                    <Box className="text-xs text-gray-500 mt-1">
                                      Quran Memorization
                                    </Box>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell align="right">
                                <Box className="flex justify-end">
                                  <Tooltip title="Edit Hifz Subject">
                                    <IconButton
                                      size="small"
                                      onClick={() => handleEditClick(subject._id)}
                                      sx={{
                                        color: "#d97706",
                                        bgcolor: "rgba(217, 119, 6, 0.1)",
                                        mr: 1,
                                        "&:hover": {
                                          bgcolor: "rgba(217, 119, 6, 0.2)",
                                        },
                                      }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Delete Hifz Subject">
                                    <IconButton
                                      size="small"
                                      sx={{
                                        color: "#dc2626",
                                        bgcolor: "rgba(220, 38, 38, 0.1)",
                                        "&:hover": {
                                          bgcolor: "rgba(220, 38, 38, 0.2)",
                                        },
                                      }}
                                      onClick={() => handleDeleteClick(subject)}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} align="center" className="py-12">
                              <Box className="text-center">
                                <SearchIcon sx={{ fontSize: 64, color: "#9ca3af", mb: 2, opacity: 0.5 }} />
                                <h6 className="text-xl font-medium text-gray-500 mb-2">No Hifz subjects found</h6>
                                <p className="text-gray-400 max-w-md mx-auto">
                                  Try adjusting your search query or add a new Hifz subject to get started.
                                </p>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {filteredSubjects.length > 0 && (
                    <TablePagination
                      rowsPerPageOptions={[15, 25, 50]}
                      component="div"
                      count={filteredSubjects.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      sx={{
                        borderTop: "1px solid rgba(26, 147, 111, 0.1)",
                        "& .MuiTablePagination-actions": {
                          color: "#1a936f",
                        },
                        "& .MuiTablePagination-selectIcon": {
                          color: "#1a936f",
                        }
                      }}
                    />
                  )}
                </>
              )}
            </Paper>
          </Box>
        </Fade>
      </Container>
      
      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
          }
        }}
      >
        <Box 
          sx={{
            background: "linear-gradient(to right, #1a936f, #2ab68b)",
            color: "white",
            padding: 2,
          }}
        >
          <DialogTitle className="pb-1" sx={{ color: "white" }}>
            <h6 className="text-lg font-semibold">Delete Hifz Subject</h6>
          </DialogTitle>
        </Box>
        <DialogContent sx={{ padding: 3 }}>
          <p className="text-gray-700">
            Are you sure you want to delete the Hifz subject &quot;{selectedSubject?.name}&quot;? This action cannot be
            undone and will remove all associated data.
          </p>
        </DialogContent>
        <DialogActions className="px-4 pb-4">
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="inherit"
            sx={{ 
              borderColor: "rgba(0, 0, 0, 0.12)",
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            variant="contained" 
            color="error" 
            className="ml-2" 
            disabled={isDeleting}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              backgroundColor: "#dc2626",
              "&:hover": {
                backgroundColor: "#b91c1c",
              },
            }}
          >
            {isDeleting ? "Deleting..." : "Delete Subject"}
          </Button>
        </DialogActions>
      </Dialog>

      {formOpen && (
        <HifzSubjectForm 
          open={formOpen} 
          setOpen={setFormOpen} 
          id={editingSubjectId}
        />
      )}
    </div>
  )
}