/* eslint-disable react/no-unescaped-entities */
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
  DialogContentText,
  DialogTitle,
  Fade,
  CircularProgress,
  alpha,
  Avatar,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material"
import Link from "next/link"
import { customTheme } from "@/ThemeStyle"
import { useDeleteSectionMutation, useGetAllSectionsQuery } from "@/redux/api/sectionApi"
import { toast } from "react-hot-toast"
// Color palette for section customization
const colorPalette = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#6366f1",
  "#84cc16",
  "#14b8a6",
  "#f97316",
]

export default function SectionsListPage() {
  const theme = customTheme

  // State
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSection, setSelectedSection] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // API hooks
  const [deleteSection] = useDeleteSectionMutation()
  const {
    data: sectionData,
    isLoading,
    refetch,
  } = useGetAllSectionsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })



  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // Handle search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  // Handle refresh
  const handleRefresh = () => {
    refetch()
  }

  // Handle delete
  const handleDeleteClick = (section: any) => {
    setSelectedSection(section)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedSection) return

    setIsDeleting(true)
    try {
      await deleteSection(selectedSection._id).unwrap()
      toast.success("Section deleted successfully")
      refetch()
    } catch (error) {
      toast.error("Failed to delete section")
      console.error("Delete error:", error)
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setSelectedSection(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
  }
  type TSection = {
    ame: string;
    _id: string;
    updatedAt: string;
  }

  const sortSectionData = [...(sectionData?.data?.sections || [])].sort((a: TSection, b: TSection) => {
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();
    return dateB - dateA;
  });

  return (
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
                Sections
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                  sx={{
                    borderRadius: 2,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  Refresh
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  component={Link}
                  href="/dashboard/super_admin/classes/section/new"
                  sx={{
                    borderRadius: 2,
                    boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                  }}
                >
                  Add New Section
                </Button>
              </Box>
            </Box>

            {/* Main Content */}
            <Paper
              elevation={0}
              sx={{
                mb: 4,
                overflow: "hidden",
                borderRadius: 3,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
              }}
            >
              <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                <TextField
                  fullWidth
                  placeholder="Search sections by name..."
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
              </Box>

              {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, fontSize: "0.875rem", color: "text.secondary" }}>
                            Section Name
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ fontWeight: 600, fontSize: "0.875rem", color: "text.secondary" }}
                          >
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sortSectionData.length > 0 ? (
                          sortSectionData.map((section: any) => {
                            // Get a consistent color based on section name
                            const colorIndex = section.name.charCodeAt(0) % colorPalette.length
                            const color = colorPalette[colorIndex]

                            return (
                              <TableRow
                                key={section._id}
                                hover
                                sx={{
                                  transition: "all 0.2s",
                                  "&:hover": {
                                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Avatar
                                      sx={{
                                        width: 36,
                                        height: 36,
                                        mr: 2,
                                        bgcolor: color,
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {section.name.charAt(0)}
                                    </Avatar>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                      {section.name}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell align="right">
                                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Tooltip title="Edit Section">
                                      <IconButton
                                        component={Link}
                                        href={`/dashboard/super_admin/classes/section/edit/${section._id}`}
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
                                    <Tooltip title="Delete Section">
                                      <IconButton
                                        size="small"
                                        onClick={() => handleDeleteClick(section)}
                                        sx={{
                                          color: "error.main",
                                          bgcolor: alpha(theme.palette.error.main, 0.1),
                                          "&:hover": {
                                            bgcolor: alpha(theme.palette.error.main, 0.2),
                                          },
                                        }}
                                      >
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            )
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} align="center" sx={{ py: 8 }}>
                              <Box sx={{ textAlign: "center" }}>
                                <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                  No sections found
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Try adjusting your search to find what you're looking for.
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
                    count={sectionData?.data?.meta?.total || 0}
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
            Delete Section
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the section {selectedSection?.name} ? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="inherit"
            sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error" sx={{ ml: 2 }} disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={24} color="inherit" /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
