/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Grid,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Tooltip,
  IconButton,
  alpha,
  CardMedia,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material"

import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  School,
} from "@mui/icons-material"

import Link from "next/link"
import { useDeleteClassMutation, useGetAllClassesQuery } from "@/redux/api/classApi"
import { theme } from "@/lib/Theme/Theme"
import Loader from "@/app/loading"
import { motion } from "framer-motion"
import { DepartmentChip, StyledCard } from "@/style/customeStyle"

const departmentColors: Record<string, string> = {
  Languages: "#3a7bd5",
  Mathematics: "#00d2ff",
  Science: "#6a11cb",
  History: "#fc4a1a",
  "Computer Science": "#00b09b",
  "Physical Education": "#f46b45",
  Art: "#c471ed",
  Music: "#12c2e9",
  "Not Specified": "#888888",
}


export default function ClassesListPage() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteClass] = useDeleteClassMutation()
  const {
    data: classData,
    isLoading,
    refetch,
  } = useGetAllClassesQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })

  const handleRefresh = () => {
    refetch()
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }



  const handleDeleteConfirm = async () => {
    if (selectedClass?._id) {
      try {
        await deleteClass(selectedClass._id).unwrap()
        refetch()
      } catch (error) {
        console.error("Error deleting class:", error)
      }
    }
    setDeleteDialogOpen(false)
    setSelectedClass(null)
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
  }

  const classes = classData?.data?.classes || []
  console.log("classes data ", classes)

  return (
    <>
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
                    href="/dashboard/classes/class/new"
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
                  </Grid>
                </Box>

                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    <Grid container spacing={3}>
                      {classes.map((classItem: any, index: any) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={classItem.id}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                          >
                            <StyledCard>
                              <Box sx={{ position: "relative" }}>
                                <CardMedia
                                  component="div"
                                  sx={{
                                    height: 100,
                                    backgroundColor: departmentColors[classItem.className] || departmentColors["Not Specified"],
                                    position: "relative",
                                  }}
                                />
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 50,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    zIndex: 1,
                                  }}
                                >
                                  <Avatar
                                    src={classItem.className}
                                    sx={{ width: 80, height: 80, border: "4px solid white" }}
                                  >
                                    {classItem.className.charAt(0)}
                                  </Avatar>
                                </Box>
                              </Box>
                              <CardContent sx={{ pt: 5, pb: 2 }}>
                                <Box sx={{ textAlign: "center", mb: 2 }}>
                                  <Typography variant="h6" fontWeight={600} gutterBottom>
                                    {classItem.className}
                                  </Typography>

                                  {classItem.sections.map((section: any) => (
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                      Section: {section?.name ?? "No Section"}
                                    </Typography>
                                  ))}
                                  <div>
                                    Class Teacher:
                                    <Chip
                                      label={classItem.className}
                                      size="small"
                                      sx={{
                                        bgcolor: alpha(theme.palette.secondary.main, 0.08),
                                        color: theme.palette.secondary.main,
                                        fontWeight: 500,
                                        borderRadius: 1,
                                        "& .MuiChip-label": { px: 1 },
                                      }}
                                    />
                                  </div>
                                  <div>
                                    Class Teacher:
                                    <DepartmentChip
                                      label={classItem.className}
                                      size="small"
                                      sx={{
                                        backgroundColor: alpha(departmentColors[classItem.name] || departmentColors["Not Specified"], 0.1),
                                        color: departmentColors[classItem.name] || departmentColors["Not Specified"],
                                      }}
                                    />
                                  </div>
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                    <School fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                                    <Typography variant="body2" color="text.secondary">
                                      Total Student: {classItem.className}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                    <School fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                                    <Typography variant="body2" color="text.secondary">
                                      Total Subjects: {classItem.className}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                    <School fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                                    <Typography variant="body2" color="text.secondary">
                                      Total Teacher: {classItem.className}
                                    </Typography>
                                  </Box>
                                </Box>
                              </CardContent>
                              <Box sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                zIndex: 1,
                              }}>


                                <Tooltip title="Edit Class">
                                  <IconButton
                                    component={Link}
                                    href={`/dashboard/classes/class/update?id=${classItem._id}`}
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
                                <Tooltip title="Delete Class">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      setSelectedClass(classItem)
                                      setDeleteDialogOpen(true)
                                    }}
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
                            </StyledCard>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </Paper>
            </Box>
          </Fade>
        </Container>
      </Box>
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
    </>
  )
}