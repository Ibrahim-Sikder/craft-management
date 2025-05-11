/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useMemo } from "react"
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
  Tabs,
  Tab,
  LinearProgress,
  Collapse,
  Alert,
  AlertTitle,
  Checkbox,
  CircularProgress,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
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
  Close as CloseIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  BarChart as BarChartIcon,
  Tune as TuneIcon,
} from "@mui/icons-material"
import Link from "next/link"
import { customTheme } from "@/ThemeStyle"
import { useDeleteSectionMutation, useGetAllSectionsQuery } from "@/redux/api/sectionApi"
import { toast } from "react-hot-toast"


export default function SectionsListPage() {
  const theme = customTheme
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
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
  console.log("section", sectionData)



  // Handle direct delete click
  const handleDirectDeleteClick = (section: any) => {
    setSelectedSection(section)
    setDeleteDialogOpen(true)
  }


  const handleDeleteConfirm = async () => {
    if (!selectedSection) return

    setIsDeleting(true)
    try {
      await deleteSection(selectedSection.id).unwrap()
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

  // Handle view mode
  const handleViewModeChange = (mode: "list" | "grid") => {
    setViewMode(mode)
  }

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }



  const handleSelectOne = (id: string) => {
    const selectedIndex = selectedSections.indexOf(id)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = [...selectedSections, id]
    } else {
      newSelected = selectedSections.filter((sectionId) => sectionId !== id)
    }

    setSelectedSections(newSelected)
  }





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
                  Sections
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

              {/* Alert */}
              <Collapse in={alertOpen}>
                <Alert
                  severity="info"
                  sx={{ mb: 3 }}
                  action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => setAlertOpen(false)}>
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  <AlertTitle>Welcome to Section Management</AlertTitle>
                  Manage all your class sections in one place. Create, edit, and organize sections for optimal class
                  management.
                </Alert>
              </Collapse>

              {/* Main Content */}
              <Paper elevation={0} sx={{ mb: 4, overflow: "hidden" }}>
                {/* Tabs */}
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  sx={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                    px: 2,
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontWeight: 500,
                      py: 2,
                    },
                  }}
                >
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AssignmentIcon sx={{ mr: 1, fontSize: 20 }} />
                        All Sections
                        <Chip
                          label={filteredSections.length}
                          size="small"
                          sx={{ ml: 1, height: 20, fontSize: "0.75rem" }}
                        />
                      </Box>
                    }
                  />
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CheckCircleIcon sx={{ mr: 1, fontSize: 20, color: theme.palette.success.main }} />
                        Active
                        <Chip
                          label={sections.filter((s: { status: string }) => s.status === "Active").length}
                          size="small"
                          color="success"
                          sx={{ ml: 1, height: 20, fontSize: "0.75rem" }}
                        />
                      </Box>
                    }
                  />
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CancelIcon sx={{ mr: 1, fontSize: 20, color: theme.palette.error.main }} />
                        Inactive
                        <Chip
                          label={sections.filter((s: any) => s.status === "Inactive").length}
                          size="small"
                          color="error"
                          sx={{ ml: 1, height: 20, fontSize: "0.75rem" }}
                        />
                      </Box>
                    }
                  />
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTimeIcon sx={{ mr: 1, fontSize: 20, color: theme.palette.warning.main }} />
                        Pending
                        <Chip
                          label={sections.filter((s: { status: string }) => s.status === "Pending").length}
                          size="small"
                          color="warning"
                          sx={{ ml: 1, height: 20, fontSize: "0.75rem" }}
                        />
                      </Box>
                    }
                  />

                  {/* Right-aligned buttons */}
                  <Box sx={{ flexGrow: 1 }} />

                  <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                    <Tooltip title="Show Analytics">
                      <IconButton
                        color="primary"
                        onClick={() => setShowAnalytics(!showAnalytics)}
                        sx={{
                          bgcolor: showAnalytics ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                        }}
                      >
                        <BarChartIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Tabs>

                {/* Filters and Search */}
                <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        placeholder="Search sections by name, teacher or room..."
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

                {/* Loading State */}
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
                    {/* List View */}
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                          <TableRow>
                            <TableCell padding="checkbox">
                              <Checkbox
                                indeterminate={
                                  selectedSections.length > 0 && selectedSections.length < filteredSections.length
                                }
                                checked={
                                  filteredSections.length > 0 && selectedSections.length === filteredSections.length
                                }
                                onChange={handleSelectAll}
                              />
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  color: orderBy === "fullName" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("fullName")}
                              >
                                Section Name
                                {orderBy === "fullName" && (
                                  <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
                                    {order === "asc" ? (
                                      <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                      <ArrowDownwardIcon fontSize="small" />
                                    )}
                                  </Box>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  color: orderBy === "teacher" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("teacher")}
                              >
                                Teacher
                                {orderBy === "teacher" && (
                                  <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
                                    {order === "asc" ? (
                                      <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                      <ArrowDownwardIcon fontSize="small" />
                                    )}
                                  </Box>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  color: orderBy === "capacity" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("capacity")}
                              >
                                Capacity
                                {orderBy === "capacity" && (
                                  <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
                                    {order === "asc" ? (
                                      <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                      <ArrowDownwardIcon fontSize="small" />
                                    )}
                                  </Box>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  color: orderBy === "type" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("type")}
                              >
                                Type
                                {orderBy === "type" && (
                                  <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
                                    {order === "asc" ? (
                                      <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                      <ArrowDownwardIcon fontSize="small" />
                                    )}
                                  </Box>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  color: orderBy === "status" ? "primary.main" : "inherit",
                                }}
                                onClick={() => handleSort("status")}
                              >
                                Status
                                {orderBy === "status" && (
                                  <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
                                    {order === "asc" ? (
                                      <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                      <ArrowDownwardIcon fontSize="small" />
                                    )}
                                  </Box>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>Schedule</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {paginatedSections.length > 0 ? (
                            paginatedSections.map((section: any) => {
                              const statusChipProps = getStatusChipProps(section.status)
                              const isSelected = selectedSections.indexOf(section.id) !== -1

                              return (
                                <TableRow
                                  key={section.id}
                                  sx={{
                                    transition: "all 0.2s",
                                    ...(isSelected ? { bgcolor: alpha(theme.palette.primary.main, 0.05) } : {}),
                                  }}
                                  hover
                                  selected={isSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox checked={isSelected} onChange={() => handleSelectOne(section.id)} />
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                      <Avatar
                                        sx={{
                                          width: 32,
                                          height: 32,
                                          mr: 1.5,
                                          bgcolor: section.color,
                                          fontSize: "0.875rem",
                                        }}
                                      >
                                        {section.name.charAt(0)}
                                      </Avatar>
                                      <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                          {section.fullName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                          Room: {section.room}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                      <Avatar
                                        sx={{
                                          width: 28,
                                          height: 28,
                                          mr: 1,
                                          bgcolor: "primary.main",
                                          fontSize: "0.75rem",
                                        }}
                                      >
                                        {section.teacher.avatar}
                                      </Avatar>
                                      <Typography variant="body2">{section.teacher.name}</Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box>
                                      <Typography variant="body2">
                                        {section.enrolled}/{section.capacity}
                                      </Typography>
                                      <LinearProgress
                                        variant="determinate"
                                        value={(section.enrolled / section.capacity) * 100}
                                        sx={{
                                          mt: 0.5,
                                          height: 4,
                                          borderRadius: 2,
                                          bgcolor: alpha(getFillRateColor(section.fillRate), 0.2),
                                          "& .MuiLinearProgress-bar": {
                                            bgcolor: getFillRateColor(section.fillRate),
                                          },
                                        }}
                                      />
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      label={section.type}
                                      size="small"
                                      sx={{
                                        bgcolor: alpha(section.color, 0.1),
                                        color: section.color,
                                        fontWeight: 500,
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      icon={statusChipProps.icon}
                                      label={section.status}
                                      color={statusChipProps.color}
                                      size="small"
                                      sx={{
                                        ...statusChipProps.sx,
                                        fontWeight: 500,
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                      <ScheduleIcon fontSize="small" sx={{ mr: 1, color: "action.active" }} />
                                      <Typography variant="body2">{section.schedule}</Typography>
                                    </Box>
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
                                          <Tooltip title="Edit Section">
                                            <IconButton
                                              component={Link}
                                              href={`/dashboard/super_admin/classes/section/edit/${section.id}`}
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
                                      {/* Replace three-dot menu with direct delete button */}
                                      <Tooltip title="Delete Section">
                                        <IconButton
                                          size="small"
                                          onClick={() => handleDirectDeleteClick(section)}
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
                              <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                                <Box sx={{ textAlign: "center" }}>
                                  <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                                  <Typography variant="h6" gutterBottom>
                                    No sections found
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
                      count={sectionData?.data?.meta?.total || filteredSections.length}
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
            Are you sure you want to delete the section &#34;{selectedSection?.fullName}&#34;? This action cannot be
            undone.
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
    </>
  )
}
