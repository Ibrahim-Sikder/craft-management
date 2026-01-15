/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  InputBase,
  IconButton,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  Fade,
  Divider,
  LinearProgress,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterListIcon,
  GetApp as GetAppIcon,
  Print as PrintIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Group as GroupIcon,
  Event as EventIcon,
  Description as DescriptionIcon,
  CloudDownload as CloudDownloadIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Cancel as CancelIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define types
type Order = "asc" | "desc";
type BatchStatus = "active" | "pending" | "inactive" | "completed";

interface Batch {
  id: string;
  name: string;
  code: string;
  teacher: {
    name: string;
    avatar: string;
  };
  students: number;
  capacity: number;
  status: BatchStatus;
  created: string;
  class: string;
  section: string;
}

// Mock data for the batch list
const MOCK_BATCHES: Batch[] = [
  {
    id: "1",
    name: "Advanced Mathematics",
    code: "MATH-4501",
    teacher: { name: "Dr. Johnson", avatar: "J" },
    students: 45,
    capacity: 50,
    status: "active",
    created: "2025-01-15",
    class: "Class 12",
    section: "Section A",
  },
  {
    id: "2",
    name: "Biology Fundamentals",
    code: "BIO-2620",
    teacher: { name: "Ms. Davis", avatar: "D" },
    students: 38,
    capacity: 40,
    status: "active",
    created: "2025-01-10",
    class: "Class 10",
    section: "Section B",
  },
  {
    id: "3",
    name: "Chemistry Lab",
    code: "CHEM-3301",
    teacher: { name: "Mrs. Williams", avatar: "W" },
    students: 32,
    capacity: 35,
    status: "pending",
    created: "2025-01-20",
    class: "Class 11",
    section: "Section A",
  },
  {
    id: "4",
    name: "Computer Science",
    code: "CS-5012",
    teacher: { name: "Prof. Brown", avatar: "B" },
    students: 42,
    capacity: 45,
    status: "active",
    created: "2025-01-05",
    class: "Class 12",
    section: "Section C",
  },
  {
    id: "5",
    name: "Physics Advanced",
    code: "PHY-4102",
    teacher: { name: "Dr. Miller", avatar: "M" },
    students: 28,
    capacity: 30,
    status: "inactive",
    created: "2025-01-25",
    class: "Class 11",
    section: "Section B",
  },
  {
    id: "6",
    name: "English Literature",
    code: "ENG-2201",
    teacher: { name: "Ms. Taylor", avatar: "T" },
    students: 35,
    capacity: 40,
    status: "active",
    created: "2025-01-12",
    class: "Class 10",
    section: "Section A",
  },
  {
    id: "7",
    name: "World History",
    code: "HIST-3105",
    teacher: { name: "Mr. Anderson", avatar: "A" },
    students: 30,
    capacity: 35,
    status: "completed",
    created: "2024-12-15",
    class: "Class 9",
    section: "Section D",
  },
  {
    id: "8",
    name: "Art & Design",
    code: "ART-2103",
    teacher: { name: "Mrs. Garcia", avatar: "G" },
    students: 25,
    capacity: 30,
    status: "active",
    created: "2025-01-18",
    class: "Class 8",
    section: "Section B",
  },
  {
    id: "9",
    name: "Physical Education",
    code: "PE-1101",
    teacher: { name: "Mr. Wilson", avatar: "W" },
    students: 48,
    capacity: 50,
    status: "pending",
    created: "2025-01-22",
    class: "Class 7",
    section: "Section A",
  },
  {
    id: "10",
    name: "Music Theory",
    code: "MUS-2201",
    teacher: { name: "Ms. Martinez", avatar: "M" },
    students: 22,
    capacity: 25,
    status: "active",
    created: "2025-01-08",
    class: "Class 9",
    section: "Section C",
  },
  {
    id: "11",
    name: "Economics",
    code: "ECON-4301",
    teacher: { name: "Dr. Thompson", avatar: "T" },
    students: 38,
    capacity: 40,
    status: "inactive",
    created: "2025-01-14",
    class: "Class 12",
    section: "Section B",
  },
  {
    id: "12",
    name: "Geography",
    code: "GEO-3102",
    teacher: { name: "Mrs. Lee", avatar: "L" },
    students: 33,
    capacity: 35,
    status: "active",
    created: "2025-01-19",
    class: "Class 10",
    section: "Section D",
  },
];

function getStatusInfo(status: BatchStatus) {
  switch (status) {
    case "active":
      return {
        icon: <CheckCircleIcon fontSize="small" />,
        color: "#4caf50",
        bgColor: "#e8f5e9",
        label: "Active",
      };
    case "pending":
      return {
        icon: <AccessTimeIcon fontSize="small" />,
        color: "#ff9800",
        bgColor: "#fff3e0",
        label: "Pending",
      };
    case "inactive":
      return {
        icon: <CancelIcon fontSize="small" />,
        color: "#f44336",
        bgColor: "#ffebee",
        label: "Inactive",
      };
    case "completed":
      return {
        icon: <CheckCircleIcon fontSize="small" />,
        color: "#2196f3",
        bgColor: "#e3f2fd",
        label: "Completed",
      };
    default:
      return {
        icon: <AccessTimeIcon fontSize="small" />,
        color: "#9e9e9e",
        bgColor: "#f5f5f5",
        label: status,
      };
  }
}

export default function BatchListPage() {
  const router = useRouter();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Batch>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [batchToDelete, setBatchToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setFadeIn(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRequestSort = (property: keyof Batch) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    batchId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedBatch(batchId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBatch(null);
  };

  const handleDeleteClick = (batchId: string) => {
    setBatchToDelete(batchId);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    setBatchToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setBatchToDelete(null);
  };

  // Filter and sort batches
  const filteredBatches = MOCK_BATCHES.filter(
    (batch) =>
      batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBatches = filteredBatches.sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (orderBy === "students" || orderBy === "capacity") {
      return order === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  // Get current page of batches
  const currentBatches = sortedBatches.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f9f9f9, #f0f0f0)",
        pt: 2,
        pb: 8,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)",
          color: "white",
          py: 3,
          mb: 4,
          borderRadius: { xs: 0, md: "0 0 20px 20px" },
          boxShadow: "0 4px 20px rgba(106, 27, 154, 0.4)",
        }}
      >
        <Container maxWidth="xl" sx={{ p: { xs: "4px" } }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <SchoolIcon sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              Batch Management
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 700 }}>
            Manage all your academic batches in one place. Create, edit, and
            track batch progress efficiently.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ p: { xs: "4px" } }}>
        {/* Search and Actions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", md: "center" },
            gap: 2,
            mb: 4,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 0.5,
              borderRadius: 100,
              flex: { xs: "1", md: "0 0 400px" },
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
            <InputBase
              placeholder="Search batches..."
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ ml: 1 }}
            />
          </Paper>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: { xs: "space-between", md: "flex-end" },
            }}
          >
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              sx={{
                borderRadius: 100,
                borderColor: "rgba(0,0,0,0.12)",
                color: "text.secondary",
                px: 2,
              }}
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              startIcon={<GetAppIcon />}
              sx={{
                borderRadius: 100,
                borderColor: "rgba(0,0,0,0.12)",
                color: "text.secondary",
                px: 2,
              }}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              sx={{
                borderRadius: 100,
                borderColor: "rgba(0,0,0,0.12)",
                color: "text.secondary",
                px: 2,
              }}
            >
              Print
            </Button>
            <Link href="/dashboard/classes/batches/new" passHref>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: 100,
                  background:
                    "linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)",
                  boxShadow: "0 4px 10px rgba(106, 27, 154, 0.3)",
                  px: 3,
                }}
              >
                New Batch
              </Button>
            </Link>
          </Box>
        </Box>

        {/* Batch List */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            position: "relative",
          }}
        >
          {loading && (
            <LinearProgress
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                "& .MuiLinearProgress-bar": {
                  background: "linear-gradient(90deg, #6a1b9a, #4a148c)",
                },
              }}
            />
          )}

          <Fade in={fadeIn} timeout={800}>
            <TableContainer
              sx={{
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                maxWidth: "100vw",
              }}
            >
              <Table>
                <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <TableSortLabel
                        active={orderBy === "name"}
                        direction={orderBy === "name" ? order : "asc"}
                        onClick={() => handleRequestSort("name")}
                      >
                        Batch Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Teacher</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <TableSortLabel
                        active={orderBy === "students"}
                        direction={orderBy === "students" ? order : "asc"}
                        onClick={() => handleRequestSort("students")}
                      >
                        Students
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <TableSortLabel
                        active={orderBy === "created"}
                        direction={orderBy === "created" ? order : "asc"}
                        onClick={() => handleRequestSort("created")}
                      >
                        Created
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentBatches.map((batch) => {
                    const statusInfo = getStatusInfo(batch.status);
                    const fillPercentage =
                      (batch.students / batch.capacity) * 100;
                    const fillColor =
                      fillPercentage > 90
                        ? "#f44336"
                        : fillPercentage > 75
                          ? "#ff9800"
                          : "#4caf50";

                    return (
                      <TableRow
                        key={batch.id}
                        hover
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.02)",
                            transition: "background-color 0.2s ease",
                          },
                        }}
                      >
                        <TableCell>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 500 }}
                            >
                              {batch.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {batch.class}, {batch.section}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={batch.code}
                            size="small"
                            sx={{
                              bgcolor: "rgba(106, 27, 154, 0.08)",
                              color: "#6a1b9a",
                              fontWeight: 500,
                              borderRadius: 1,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: "primary.main",
                                fontSize: "0.875rem",
                              }}
                            >
                              {batch.teacher.avatar}
                            </Avatar>
                            <Typography variant="body2">
                              {batch.teacher.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography variant="body2">
                              {batch.students}/{batch.capacity}
                            </Typography>
                            <Box
                              sx={{
                                width: 60,
                                height: 6,
                                bgcolor: "rgba(0,0,0,0.08)",
                                borderRadius: 3,
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                sx={{
                                  height: "100%",
                                  width: `${fillPercentage}%`,
                                  bgcolor: fillColor,
                                  borderRadius: 3,
                                }}
                              />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={statusInfo.icon}
                            label={statusInfo.label}
                            size="small"
                            sx={{
                              bgcolor: statusInfo.bgColor,
                              color: statusInfo.color,
                              fontWeight: 500,
                              "& .MuiChip-icon": {
                                color: statusInfo.color,
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(batch.created).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            <Tooltip title="View Details" arrow>
                              <IconButton
                                size="small"
                                sx={{
                                  color: "text.secondary",
                                  "&:hover": {
                                    color: "primary.main",
                                    bgcolor: "rgba(106, 27, 154, 0.08)",
                                  },
                                }}
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit" arrow>
                              <IconButton
                                size="small"
                                sx={{
                                  color: "primary.main",
                                  "&:hover": {
                                    bgcolor: "rgba(106, 27, 154, 0.08)",
                                  },
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <IconButton
                              size="small"
                              sx={{
                                color: "text.secondary",
                                "&:hover": {
                                  color: "primary.main",
                                  bgcolor: "rgba(106, 27, 154, 0.08)",
                                },
                              }}
                              onClick={(e) => handleMenuOpen(e, batch.id)}
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {currentBatches.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Box
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: "50%",
                              bgcolor: "rgba(106, 27, 154, 0.08)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <SearchIcon
                              sx={{ fontSize: 40, color: "#6a1b9a" }}
                            />
                          </Box>
                          <Typography variant="h6" color="text.secondary">
                            No batches found
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.disabled"
                            sx={{ maxWidth: 300, textAlign: "center" }}
                          >
                            Try adjusting your search or create a new batch to
                            get started
                          </Typography>
                          <Button
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                            onClick={() => setSearchTerm("")}
                            sx={{ mt: 1, borderRadius: 100 }}
                          >
                            Clear Search
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>

          <Divider />

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredBatches.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* Stats Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr 1fr",
            },
            gap: 3,
            mt: 4,
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "#1565c0", fontWeight: 600 }}
            >
              Total Batches
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#0d47a1" }}>
              {MOCK_BATCHES.length}
            </Typography>
            <Typography variant="body2" sx={{ color: "#1976d2" }}>
              Across all classes and sections
            </Typography>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "#2e7d32", fontWeight: 600 }}
            >
              Active Batches
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#1b5e20" }}>
              {MOCK_BATCHES.filter((b) => b.status === "active").length}
            </Typography>
            <Typography variant="body2" sx={{ color: "#388e3c" }}>
              Currently in progress
            </Typography>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "#e65100", fontWeight: 600 }}
            >
              Total Students
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#bf360c" }}>
              {MOCK_BATCHES.reduce((sum, batch) => sum + batch.students, 0)}
            </Typography>
            <Typography variant="body2" sx={{ color: "#f57c00" }}>
              Enrolled in all batches
            </Typography>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "#6a1b9a", fontWeight: 600 }}
            >
              Completion Rate
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#4a148c" }}>
              {Math.round(
                (MOCK_BATCHES.filter((b) => b.status === "completed").length /
                  MOCK_BATCHES.length) *
                  100
              )}
              %
            </Typography>
            <Typography variant="body2" sx={{ color: "#8e24aa" }}>
              Batches completed successfully
            </Typography>
          </Paper>
        </Box>
      </Container>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: 2,
            mt: 1,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Students</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EventIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Schedule</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Reports</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <CloudDownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export Data</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => selectedBatch && handleDeleteClick(selectedBatch)}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: "error.main" }} />
          </ListItemIcon>
          <ListItemText sx={{ color: "error.main" }}>Delete Batch</ListItemText>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          elevation: 3,
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this batch? This action cannot be
            undOnend will remove all associated data.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleDeleteCancel}
            sx={{
              color: "text.secondary",
              borderRadius: 100,
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{
              borderRadius: 100,
              px: 3,
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
