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
  useTheme,
  CircularProgress,
} from "@mui/material"

import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  School,
  Group,
  MenuBook,
  Person,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import HifzClassForm from "../../_components/HifzClassForm"
import { useDeleteHifzClassMutation, useGetAllHifzClassesQuery } from "@/redux/api/hifzClassApi"
import { departmentColors, hifzBG, hifzBox, islamicColors, StyledCard } from "@/style/customeStyle"


// Department Chip with updated style
const DepartmentChip = ({ label, ...props }: any) => (
  <Chip
    label={label}
    size="small"
    sx={{
      backgroundColor: alpha(departmentColors[label] || departmentColors["Not Specified"], 0.1),
      color: departmentColors[label] || departmentColors["Not Specified"],
      fontWeight: 500,
      borderRadius: '8px',
      '& .MuiChip-label': { px: 1.5 },
      ...props.sx,
    }}
    {...props}
  />
)

export default function ClassesListPage() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState<any | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteHifzClass] = useDeleteHifzClassMutation()
  const [formOpen, setFormOpen] = useState(false)
  const [editingClassId, setEditingClassId] = useState<string | null>(null)

  const {
    data: hifzClassData,
    isLoading,
    refetch,
  } = useGetAllHifzClassesQuery({
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
        await deleteHifzClass(selectedClass._id).unwrap()
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

  const handleEditClick = (id: string) => {
    setEditingClassId(id)
    setFormOpen(true)
  }

  const handleAddClick = () => {
    setEditingClassId(null)
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditingClassId(null)
  }

  const classes = hifzClassData?.data?.data || []

  return (
    <>
      <Box sx={hifzBG}>
        <Container maxWidth="xl" sx={{ mt: 0, mb: 4 }}>
          <Fade in={true} timeout={800}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 4,
                  flexWrap: "wrap",
                  gap: 2,
                  background: `linear-gradient(135deg, ${alpha(islamicColors.primary, 0.1)} 0%, ${alpha(islamicColors.secondary, 0.1)} 100%)`,
                  p: 3,
                  borderRadius: '16px',
                  border: `1px solid ${alpha(islamicColors.primary, 0.1)}`,
                }}
              >
                <Box>
                  <Typography variant="h3" component="h1" sx={{
                    fontWeight: 700,
                    color: islamicColors.primary,
                    mb: 1,
                  }}>
                    Hifz Classes
                  </Typography>
                  <Typography variant="body1" sx={{ color: islamicColors.lightText }}>
                    Manage and organize your Quran memorization classes
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                    sx={{
                      borderRadius: '12px',
                      borderColor: alpha(islamicColors.primary, 0.3),
                      color: islamicColors.primary,
                      '&:hover': {
                        borderColor: islamicColors.primary,
                        backgroundColor: alpha(islamicColors.primary, 0.04)
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
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${islamicColors.primary} 0%, ${islamicColors.secondary} 100%)`,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      '&:hover': {
                        boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                        background: `linear-gradient(135deg, ${islamicColors.secondary} 0%, ${islamicColors.primary} 100%)`,
                      }
                    }}
                  >
                    Add New Hifz Class
                  </Button>
                </Box>
              </Box>

              <StyledCard sx={{ mb: 4, overflow: "hidden" }}>
                <Box sx={{ p: 3, borderBottom: `1px solid ${alpha(islamicColors.primary, 0.1)}` }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        placeholder="Search Hifz classes by name, section or teacher..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon sx={{ color: alpha(islamicColors.primary, 0.7) }} />
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: '12px',
                            bgcolor: "background.paper",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: alpha(islamicColors.primary, 0.2),
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: alpha(islamicColors.primary, 0.4),
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography variant="body2" sx={{ color: islamicColors.lightText }}>
                        {classes.length} {classes.length === 1 ? 'class' : 'classes'} found
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                {isLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
                    <CircularProgress sx={{ color: islamicColors.primary }} />
                  </Box>
                ) : classes.length === 0 ? (
                  <Box sx={{ textAlign: 'center', p: 6 }}>
                    <School sx={{ fontSize: 64, color: alpha(islamicColors.primary, 0.3), mb: 2 }} />
                    <Typography variant="h6" sx={{ color: islamicColors.lightText, mb: 1 }}>
                      No classes found
                    </Typography>
                    <Typography variant="body2" sx={{ color: alpha(islamicColors.lightText, 0.7), mb: 3 }}>
                      {searchTerm ? 'Try a different search term' : 'Get started by creating your first class'}
                    </Typography>
                    {!searchTerm && (
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddClick}
                        sx={{
                          borderRadius: '12px',
                          background: `linear-gradient(135deg, ${islamicColors.primary} 0%, ${islamicColors.secondary} 100%)`,
                        }}
                      >
                        Create First Class
                      </Button>
                    )}
                  </Box>
                ) : (
                  <Box sx={{ p: 3 }}>
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
                                    background: `linear-gradient(135deg, ${departmentColors[classItem.department] || departmentColors["Not Specified"]} 0%, ${alpha(departmentColors[classItem.department] || departmentColors["Not Specified"], 0.7)} 100%)`,
                                    position: "relative",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                  }}
                                >
                                  <Box
                                    component="span"
                                    sx={{
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      right: 0,
                                      bottom: 0,
                                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L0 20z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                                    }}
                                  />
                                  <Typography
                                    variant="h4"
                                    sx={{
                                      color: 'white',
                                      fontWeight: 700,
                                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                                      zIndex: 1,
                                    }}
                                  >
                                    {classItem?.name}
                                  </Typography>
                                </CardMedia>
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 80,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    zIndex: 1,
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      width: 60,
                                      height: 60,
                                      border: "4px solid white",
                                      background: `linear-gradient(135deg, ${islamicColors.primary} 0%, ${islamicColors.secondary} 100%)`,
                                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                      fontSize: '24px',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    {classItem?.name?.charAt(0)}
                                  </Avatar>
                                </Box>
                              </Box>
                              <CardContent sx={{ pt: 5, pb: 2 }}>
                                <Box sx={{ textAlign: "center", mb: 2 }}>
                                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: islamicColors.text }}>
                                    {classItem?.name}
                                  </Typography>

                                  {classItem.sections && classItem.sections.length > 0 && (
                                    <Box sx={{ mb: 1.5 }}>
                                      <Typography variant="body2" sx={{ color: islamicColors.lightText, mb: 0.5 }}>
                                        Sections:
                                      </Typography>
                                      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.5 }}>
                                        {classItem.sections.map((section: any) => (
                                          <Chip
                                            key={section._id}
                                            label={section.name}
                                            size="small"
                                            sx={{
                                              backgroundColor: alpha(islamicColors.accent, 0.2),
                                              color: islamicColors.primary,
                                              fontSize: '0.7rem',
                                              height: '24px',
                                            }}
                                          />
                                        ))}
                                      </Box>
                                    </Box>
                                  )}

                                  {classItem.department && (
                                    <Box sx={{ mb: 1.5 }}>
                                      <Typography variant="body2" sx={{ color: islamicColors.lightText, mb: 0.5 }}>
                                        Department:
                                      </Typography>
                                      <DepartmentChip
                                        label={classItem.department}
                                        sx={{ mx: 'auto' }}
                                      />
                                    </Box>
                                  )}
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                                    <Group fontSize="small" sx={{ color: islamicColors.primary, mr: 1.5 }} />
                                    <Typography variant="body2" sx={{ color: islamicColors.lightText }}>
                                      Students: <Box component="span" sx={{ color: islamicColors.text, fontWeight: 500 }}>{classItem.studentCount || 0}</Box>
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                                    <MenuBook fontSize="small" sx={{ color: islamicColors.primary, mr: 1.5 }} />
                                    <Typography variant="body2" sx={{ color: islamicColors.lightText }}>
                                      Subjects: <Box component="span" sx={{ color: islamicColors.text, fontWeight: 500 }}>{classItem.subjectCount || 0}</Box>
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                                    <Person fontSize="small" sx={{ color: islamicColors.primary, mr: 1.5 }} />
                                    <Typography variant="body2" sx={{ color: islamicColors.lightText }}>
                                      Teachers: <Box component="span" sx={{ color: islamicColors.text, fontWeight: 500 }}>{classItem.teacherCount || 0}</Box>
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
                                    onClick={() => handleEditClick(classItem._id)}
                                    size="small"
                                    sx={{
                                      color: alpha(islamicColors.secondary, 0.9),
                                      bgcolor: alpha(islamicColors.secondary, 0.1),
                                      mr: 1,
                                      "&:hover": {
                                        bgcolor: alpha(islamicColors.secondary, 0.2),
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
                                      color: alpha('#f44336', 0.9),
                                      bgcolor: alpha('#f44336', 0.1),
                                      "&:hover": {
                                        bgcolor: alpha('#f44336', 0.2),
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
                  </Box>
                )}
              </StyledCard>
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
            border: `1px solid ${alpha(islamicColors.primary, 0.1)}`,
            background: `linear-gradient(to bottom, #ffffff, ${alpha(islamicColors.background, 0.5)})`,
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${islamicColors.primary}, ${islamicColors.secondary})`,
            },
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: islamicColors.primary }}>
            Delete Class
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: islamicColors.text }}>
            Are you sure you want to delete the class &#34;{selectedClass?.name}&#34;? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: alpha(islamicColors.primary, 0.3),
              color: islamicColors.text,
              borderRadius: '8px',
              '&:hover': {
                borderColor: islamicColors.primary,
                backgroundColor: alpha(islamicColors.primary, 0.04)
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{
              ml: 2,
              borderRadius: '8px',
              background: `linear-gradient(135deg, #f44336 0%, #d32f2f 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, #d32f2f 0%, #c62828 100%)`,
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {formOpen && (
        <HifzClassForm
          open={formOpen}
          setOpen={handleCloseForm}
          id={editingClassId}
        />
      )}
    </>
  )
}