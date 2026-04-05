/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  MenuItem,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Fade,
  alpha,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
  ThemeProvider,
  Switch,
  FormControlLabel,
  Badge,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Person as PersonIcon,
  Book as BookIcon,
  Class as ClassIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  DateRange,
  Download,
  Comment as CommentIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import DrawIcon from "@mui/icons-material/Draw";
import BlockIcon from "@mui/icons-material/Block";
import { format } from "date-fns";
import { customTheme } from "@/ThemeStyle";
import {
  useDeleteClassReportMutation,
  useGetAllClassReportsQuery,
} from "@/redux/api/classReportApi";
import ClassReportDetailsModal from "../_components/ClassReportDetailsModal";
import toast from "react-hot-toast";
import DateRangePicker from "../new/_components/DateRangePicker";
import Link from "next/link";
import { DateRangeIcon } from "@mui/x-date-pickers";
import Loader from "@/app/loading";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import { Filters, IDateRange } from "@/types/classReport";
import { sortClassOptions } from "@/options/classReport";

export default function ClassReportList() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    classes: "",
    subjects: "",
    teachers: "",
    date: "",
    hour: "",
    lessonEvaluation: "",
    handwriting: "",
    startDate: "",
    endDate: "",
    hasComments: false,
  });

  const [orderBy, setOrderBy] = useState<string>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedReportDetails, setSelectedReportDetails] = useState<
    any | null
  >(null);
  const [dateRangePickerOpen, setDateRangePickerOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<IDateRange>({
    startDate: null,
    endDate: null,
  });

  const [deleteClassReport] = useDeleteClassReportMutation();

  const {
    data: classReport,
    isLoading,
    refetch,
  } = useGetAllClassReportsQuery(
    {
      limit: rowsPerPage,
      page: page,
      searchTerm: searchTerm,
      className: filters.classes,
      subject: filters.subjects,
      teacher: filters.teachers,
      date: filters.date,
      hour: filters.hour,
      lessonEvaluation: filters.lessonEvaluation,
      handwriting: filters.handwriting,
      startDate: filters.startDate,
      endDate: filters.endDate,
      hasComments: filters.hasComments,
    },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    refetch();
  }, [filters, searchTerm, page, rowsPerPage, refetch]);

  const theme = customTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });
  const isTablet = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });

  const reports = useMemo(
    () => classReport?.data?.reports || [],
    [classReport],
  );
  const totalCount = classReport?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const commentsStats = classReport?.data?.meta?.commentsStats || {
    totalComments: 0,
    reportsWithComments: 0,
    studentsWithComments: 0,
  };

  const { teacherOptions, subjectOptions, classOptions } = useAcademicOption();

  console.log("class option this ", classOptions);

  const hourOptions = ["১ম", "২য়", "৩য়", "৪র্থ", "৫ম", "৬ষ্ঠ", "৭ম", "৮ম"];
  const lessonEvaluationOptions = [
    "পড়া শিখেছে",
    "আংশিক শিখেছে",
    "পড়া শিখেনি",
    "অনুপস্থিত",
  ];
  const handleWrittenOptions = ["লিখেছে", "আংশিক লিখেছে", "লিখেনি", "কাজ নেই"];

  const handleDateRangePickerOpen = () => setDateRangePickerOpen(true);
  const handleDateRangePickerClose = () => setDateRangePickerOpen(false);

  const handleDateRangeApply = (range: IDateRange) => {
    setSelectedDateRange(range);
    setFilters((prev) => ({
      ...prev,
      startDate: range.startDate ? format(range.startDate, "yyyy-MM-dd") : "",
      endDate: range.endDate ? format(range.endDate, "yyyy-MM-dd") : "",
    }));
    if (range.startDate && range.endDate) {
      toast.success(
        `Date range applied: ${format(range.startDate, "dd MMM yyyy")} - ${format(range.endDate, "dd MMM yyyy")}`,
      );
    }
    setPage(1);
    refetch();
  };

  const handleClearDateRange = () => {
    setSelectedDateRange({ startDate: null, endDate: null });
    setFilters((prev) => ({ ...prev, startDate: "", endDate: "" }));
    toast.success("Date range filter cleared");
    setPage(1);
    refetch();
  };

  const formatDateRangeDisplay = () => {
    if (!selectedDateRange.startDate || !selectedDateRange.endDate)
      return "Select date range";
    return `${format(selectedDateRange.startDate, "dd MMM yyyy")} - ${format(selectedDateRange.endDate, "dd MMM yyyy")}`;
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    refetch();
  };
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => setPage(newPage);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleFilterChange = (
    filterName: keyof Filters,
    value: string | boolean,
  ) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setPage(1);
    refetch();
  };

  const handleCommentsFilterToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = event.target.checked;
    setFilters((prev) => ({ ...prev, hasComments: isChecked }));
    setPage(1);
    if (isChecked) {
      toast.success(
        `Showing only records with comments (${commentsStats.totalComments} total)`,
      );
    } else {
      toast.success("Comments filter cleared - showing all records");
    }
    refetch();
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    report: any,
  ) => {
    event.stopPropagation();
    setSelectedReport(report);
    setDeleteDialogOpen(true);
    setAnchorEl(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedReport) {
      try {
        await deleteClassReport(selectedReport._id).unwrap();
        setDeleteDialogOpen(false);
        setSelectedReport(null);
        refetch();
      } catch (error) {
        console.error("Error deleting class report:", error);
      }
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => setDeleteDialogOpen(false);

  const handleClearFilters = () => {
    setFilters({
      classes: "",
      subjects: "",
      teachers: "",
      date: "",
      hour: "",
      lessonEvaluation: "",
      handwriting: "",
      startDate: "",
      endDate: "",
      hasComments: false,
    });
    setSelectedDateRange({ startDate: null, endDate: null });
    setSearchTerm("");
    setPage(1);
    refetch();
  };

  const handleOpenDetailsModal = (
    e: React.MouseEvent,
    report: any,
    evaluation: any,
  ) => {
    e.stopPropagation();
    setSelectedReportDetails({
      reportData: report,
      studentEvaluation: evaluation,
    });
    setDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedReportDetails(null);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
      return "Invalid Date";
    }
  };

  const filteredReports = useMemo(() => [...reports], [reports]);

  const sortedReports = useMemo(() => {
    return [...filteredReports].sort((a, b) => {
      if (orderBy === "date") {
        return order === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (orderBy === "classes") {
        const classA = a.classes || "";
        const classB = b.classes || "";
        return order === "asc"
          ? classA.localeCompare(classB)
          : classB.localeCompare(classA);
      } else if (orderBy === "subjects") {
        const subjectA = a.subjects || "";
        const subjectB = b.subjects || "";
        return order === "asc"
          ? subjectA.localeCompare(subjectB)
          : subjectB.localeCompare(subjectA);
      } else {
        return order === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [filteredReports, orderBy, order]);

  const cardStyle = {
    width: "100%",
    borderRadius: 3,
    background:
      selectedDateRange.startDate || selectedDateRange.endDate
        ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
        : "background.paper",
    border:
      selectedDateRange.startDate || selectedDateRange.endDate
        ? `2px solid ${alpha(theme.palette.primary.main, 0.3)}`
        : "1px solid rgba(0, 0, 0, 0.12)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
      transform: "translateY(-2px)",
    },
  };

  // ── Filter select helper ──
  const FilterCard = ({ icon, label, name, options, value }: any) => (
    <Card variant="outlined" sx={{ borderRadius: 2, height: "100%" }}>
      <CardContent
        sx={{
          p: { xs: 1.5, sm: 2 },
          "&:last-child": { pb: { xs: 1.5, sm: 2 } },
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", mb: { xs: 1, sm: 1.5 } }}
        >
          {React.cloneElement(icon, {
            sx: {
              color: "primary.main",
              mr: 0.75,
              fontSize: { xs: 16, sm: 20 },
            },
          })}
          <Typography
            variant="subtitle2"
            fontWeight={600}
            sx={{ fontSize: { xs: "0.72rem", sm: "0.85rem" } }}
          >
            {label}
          </Typography>
        </Box>
        <FormControl fullWidth size="small">
          <InputLabel sx={{ fontSize: { xs: "0.72rem", sm: "0.85rem" } }}>
            Select {label}
          </InputLabel>
          <Select
            value={value}
            label={`Select ${label}`}
            onChange={(e: SelectChangeEvent) =>
              handleFilterChange(name, e.target.value)
            }
            sx={{ fontSize: { xs: "0.72rem", sm: "0.85rem" } }}
          >
            <MenuItem
              value=""
              sx={{ fontSize: { xs: "0.72rem", sm: "0.85rem" } }}
            >
              All {label}s
            </MenuItem>
            {options?.map((opt: any) => (
              <MenuItem
                key={opt.value ?? opt}
                value={opt.value ?? opt}
                sx={{ fontSize: { xs: "0.72rem", sm: "0.85rem" } }}
              >
                {opt.label ?? opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          minHeight: "100vh",
          borderRadius: 2,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            mt: 0,
            mb: 8,
            borderRadius: 2,
            p: { xs: 1, sm: 1.5, md: "8px" },
          }}
        >
          <Fade in={true} timeout={800}>
            <div>
              {/* ── Header ── */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  mb: { xs: 2, sm: 3 },
                  flexWrap: "wrap",
                  gap: { xs: 1.5, sm: 2 },
                  pt: { xs: 1.5, sm: 2 },
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    fontSize: { xs: "1.1rem", sm: "1.35rem", md: "1.6rem" },
                  }}
                >
                  Class Reports
                </Typography>
                <Stack
                  direction="row"
                  spacing={{ xs: 1, sm: 1.5 }}
                  flexWrap="wrap"
                >
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      borderRadius: 2,
                      fontSize: { xs: "0.72rem", sm: "0.875rem" },
                      px: { xs: 1.5, sm: 2 },
                      display: { xs: "none", md: "flex" },
                    }}
                  >
                    {isMobile ? "" : "Refresh"}
                    {isMobile && <RefreshIcon fontSize="small" />}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link}
                    href="/dashboard/classes/report/new"
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0px 4px 10px rgba(99,102,241,0.2)",
                      fontSize: { xs: "0.72rem", sm: "0.875rem" },
                      px: { xs: 1.5, sm: 2 },
                    }}
                  >
                    {isMobile ? "Add" : "Add New Report"}
                  </Button>
                </Stack>
              </Box>

              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: { xs: "flex-start", sm: "space-between" },
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  alignItems="center"
                >
                  <Typography
                    variant="body2"
                    color="secondary.main"
                    fontWeight={600}
                    sx={{ fontSize: { xs: "0.68rem", sm: "0.8rem" } }}
                  >
                    Total: {totalCount}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary.main"
                    fontWeight={600}
                    sx={{ fontSize: { xs: "0.68rem", sm: "0.8rem" } }}
                  >
                    {rowsPerPage}/page
                  </Typography>
                  <Badge
                    badgeContent={commentsStats.totalComments}
                    color="warning"
                    max={999}
                  >
                    <Chip
                      icon={<CommentIcon />}
                      label={
                        isMobile
                          ? `${commentsStats.reportsWithComments} w/ Comments`
                          : `${commentsStats.reportsWithComments} Reports with Comments`
                      }
                      size="small"
                      color="warning"
                      variant="outlined"
                      sx={{ fontSize: { xs: "0.62rem", sm: "0.75rem" } }}
                    />
                  </Badge>
                </Stack>
              </Box>

              {/* ── Filter Grid ── */}
              <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                <Grid container spacing={{ xs: 1, sm: 1.5 }}>
                  <Grid item xs={6} sm={4} md={2}>
                    <FilterCard
                      icon={<ClassIcon />}
                      label="Class"
                      name="classes"
                      options={sortClassOptions(classOptions)}
                      value={filters.classes}
                    />
                  </Grid>

                  <Grid item xs={6} sm={4} md={2}>
                    <FilterCard
                      icon={<BookIcon />}
                      label="Subject"
                      name="subjects"
                      options={subjectOptions}
                      value={filters.subjects}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={2}>
                    <FilterCard
                      icon={<PersonIcon />}
                      label="Teacher"
                      name="teachers"
                      options={teacherOptions}
                      value={filters.teachers}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={2}>
                    <FilterCard
                      icon={<AccessTimeIcon />}
                      label="Hour"
                      name="hour"
                      options={hourOptions}
                      value={filters.hour}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={2}>
                    <FilterCard
                      icon={<AccessTimeIcon />}
                      label="Lesson"
                      name="lessonEvaluation"
                      options={lessonEvaluationOptions}
                      value={filters.lessonEvaluation}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={2}>
                    <FilterCard
                      icon={<AccessTimeIcon />}
                      label="Hand Written"
                      name="handwriting"
                      options={handleWrittenOptions}
                      value={filters.handwriting}
                    />
                  </Grid>

                  {/* Date Range */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined" sx={cardStyle}>
                      <CardContent
                        sx={{
                          p: { xs: 1.5, sm: 2 },
                          "&:last-child": { pb: { xs: 1.5, sm: 2 } },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: { xs: 1, sm: 1.5 },
                          }}
                        >
                          <DateRangeIcon
                            sx={{
                              color: "primary.main",
                              mr: 0.75,
                              fontSize: { xs: 16, sm: 20 },
                            }}
                          />
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            sx={{ fontSize: { xs: "0.72rem", sm: "0.85rem" } }}
                          >
                            Date Range
                          </Typography>
                        </Box>
                        <Button
                          variant="outlined"
                          startIcon={
                            <DateRange sx={{ fontSize: { xs: 14, sm: 18 } }} />
                          }
                          onClick={handleDateRangePickerOpen}
                          fullWidth
                          size="small"
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            justifyContent: "flex-start",
                            color: selectedDateRange.startDate
                              ? "primary.main"
                              : "text.secondary",
                            borderColor: selectedDateRange.startDate
                              ? "primary.main"
                              : "rgba(0,0,0,0.23)",
                            fontSize: { xs: "0.68rem", sm: "0.8rem" },
                            py: { xs: 0.75, sm: 1 },
                          }}
                        >
                          {isMobile && formatDateRangeDisplay().length > 22
                            ? formatDateRangeDisplay().slice(0, 20) + "…"
                            : formatDateRangeDisplay()}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Comments toggle */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined" sx={cardStyle}>
                      <CardContent
                        sx={{
                          p: { xs: 1.5, sm: 2 },
                          "&:last-child": { pb: { xs: 1.5, sm: 2 } },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: { xs: 1, sm: 1.5 },
                          }}
                        >
                          <CommentIcon
                            sx={{
                              color: "warning.main",
                              mr: 0.75,
                              fontSize: { xs: 16, sm: 20 },
                            }}
                          />
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            sx={{ fontSize: { xs: "0.72rem", sm: "0.85rem" } }}
                          >
                            Comments
                          </Typography>
                        </Box>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={filters.hasComments}
                              onChange={handleCommentsFilterToggle}
                              color="warning"
                              size="small"
                            />
                          }
                          label={
                            <Typography
                              variant="body2"
                              fontWeight={500}
                              sx={{ fontSize: { xs: "0.68rem", sm: "0.8rem" } }}
                            >
                              {filters.hasComments
                                ? "Comments Only"
                                : "Show All"}
                            </Typography>
                          }
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* Search + action row */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  sx={{ mt: { xs: 1.5, sm: 2 } }}
                  alignItems={{ sm: "center" }}
                >
                  <TextField
                    placeholder="Search by student name or comments..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    size="small"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" fontSize="small" />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: 2,
                        fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      },
                    }}
                  />
                  <Stack direction="row" spacing={1} flexShrink={0}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={handleClearFilters}
                      size="small"
                      startIcon={<FilterListIcon fontSize="small" />}
                      sx={{
                        borderColor: "rgba(0,0,0,0.12)",
                        color: "text.secondary",
                        whiteSpace: "nowrap",
                        fontSize: { xs: "0.72rem", sm: "0.8rem" },
                      }}
                    >
                      {isMobile ? "Clear" : "Clear All Filters"}
                    </Button>
                    {!isMobile && (
                      <>
                        <Button
                          variant="outlined"
                          color="inherit"
                          startIcon={<DownloadIcon />}
                          size="small"
                          sx={{
                            borderColor: "rgba(0,0,0,0.12)",
                            color: "text.secondary",
                          }}
                        >
                          Export
                        </Button>
                        <Button
                          variant="outlined"
                          color="inherit"
                          startIcon={<PrintIcon />}
                          size="small"
                          sx={{
                            borderColor: "rgba(0,0,0,0.12)",
                            color: "text.secondary",
                          }}
                        >
                          Print
                        </Button>
                      </>
                    )}
                  </Stack>
                </Stack>
              </Box>

              {/* ── Table ── */}
              <Paper elevation={0} sx={{ mb: 4, overflow: "hidden" }}>
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    <Box
                      sx={{
                        border: { xs: "1px solid", sm: "none" },
                        borderColor: { xs: "divider" },
                        borderRadius: { xs: 1, sm: 0 },
                        overflowX: "auto",
                        WebkitOverflowScrolling: "touch",
                        maxWidth: "100vw",
                        position: "relative",
                      }}
                    >
                      <Table
                        sx={{
                          minWidth: 860,
                          "& .MuiTableCell-root": {
                            py: { xs: 1, sm: 1.5 },
                            px: { xs: 1, sm: 1.5, md: 2 },
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.8rem",
                              md: "0.875rem",
                            },
                          },
                          "& .MuiTableHead-root .MuiTableCell-root": {
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                            borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            whiteSpace: "nowrap",
                            fontSize: {
                              xs: "0.68rem",
                              sm: "0.78rem",
                              md: "0.85rem",
                            },
                          },
                        }}
                      >
                        <TableHead>
                          <TableRow
                            sx={{
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.05,
                              ),
                            }}
                          >
                            <TableCell width="7%">
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  color:
                                    orderBy === "date"
                                      ? "primary.main"
                                      : "inherit",
                                }}
                                onClick={() => handleSort("date")}
                              >
                                Date
                                {orderBy === "date" && (
                                  <Box
                                    component="span"
                                    sx={{ display: "inline-flex", ml: 0.5 }}
                                  >
                                    {order === "asc" ? (
                                      <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                                    ) : (
                                      <ArrowDownwardIcon
                                        sx={{ fontSize: 14 }}
                                      />
                                    )}
                                  </Box>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>Student</TableCell>
                            <TableCell width="6%">
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  color:
                                    orderBy === "classes"
                                      ? "primary.main"
                                      : "inherit",
                                }}
                                onClick={() => handleSort("classes")}
                              >
                                Class
                                {orderBy === "classes" && (
                                  <Box
                                    component="span"
                                    sx={{ display: "inline-flex", ml: 0.5 }}
                                  >
                                    {order === "asc" ? (
                                      <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                                    ) : (
                                      <ArrowDownwardIcon
                                        sx={{ fontSize: 14 }}
                                      />
                                    )}
                                  </Box>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell width="9%">Subject</TableCell>
                            <TableCell width="9%">Teacher</TableCell>
                            <TableCell width="5%">Hour</TableCell>
                            <TableCell width="8%">Attend.</TableCell>
                            <TableCell width="9%">Lesson</TableCell>
                            <TableCell width="8%">HW</TableCell>
                            <TableCell width="5%" align="center">
                              Sign
                            </TableCell>
                            <TableCell width="10%">Comments</TableCell>
                            <TableCell width="9%">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {sortedReports.length > 0 ? (
                            sortedReports.map((report: any) => {
                              const isExpanded = expandedReport === report._id;
                              return (
                                <React.Fragment key={report._id}>
                                  {report.studentEvaluations?.map(
                                    (evaluation: any, index: number) => {
                                      const student = evaluation.studentId;
                                      const isAbsent =
                                        evaluation?.attendance === "অনুপস্থিত";
                                      const hasComment =
                                        evaluation?.comments &&
                                        evaluation.comments.trim() !== "";

                                      return (
                                        <TableRow
                                          key={`${report._id}-${index}`}
                                          sx={{
                                            transition: "all 0.2s",
                                            bgcolor: isExpanded
                                              ? alpha(
                                                  theme.palette.primary.main,
                                                  0.05,
                                                )
                                              : "inherit",
                                            "&:hover": {
                                              bgcolor: alpha(
                                                theme.palette.primary.main,
                                                0.04,
                                              ),
                                            },
                                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                                            "&:last-child td": {
                                              borderBottom: 0,
                                            },
                                            ...(hasComment && {
                                              background: `linear-gradient(90deg, ${alpha(theme.palette.warning.light, 0.08)} 0%, ${alpha(theme.palette.background.paper, 0.3)} 100%)`,
                                              borderLeft: `3px solid ${theme.palette.warning.main}`,
                                            }),
                                            ...(isAbsent && {
                                              opacity: 0.5,
                                              pointerEvents: "none",
                                              bgcolor: alpha(
                                                theme.palette.grey[300],
                                                0.4,
                                              ),
                                            }),
                                          }}
                                        >
                                          <TableCell>
                                            <Typography
                                              variant="body2"
                                              fontWeight={500}
                                              sx={{
                                                fontSize: {
                                                  xs: "0.68rem",
                                                  sm: "0.78rem",
                                                },
                                                whiteSpace: "nowrap",
                                              }}
                                            >
                                              {report.date
                                                ? formatDate(report.date)
                                                : "N/A"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell>
                                            <Typography
                                              variant="body2"
                                              fontWeight={500}
                                              sx={{
                                                fontSize: {
                                                  xs: "0.68rem",
                                                  sm: "0.78rem",
                                                },
                                                color:
                                                  theme.palette.text.primary,
                                              }}
                                            >
                                              {student?.name || "N/A"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell>
                                            <Box
                                              sx={{
                                                display: "inline-flex",
                                                bgcolor: alpha(
                                                  theme.palette.primary.main,
                                                  0.08,
                                                ),
                                                color:
                                                  theme.palette.primary.main,
                                                px: { xs: 0.75, sm: 1 },
                                                py: 0.25,
                                                borderRadius: 1,
                                                fontWeight: 600,
                                                fontSize: {
                                                  xs: "0.65rem",
                                                  sm: "0.75rem",
                                                },
                                                whiteSpace: "nowrap",
                                              }}
                                            >
                                              {report.classes}
                                            </Box>
                                          </TableCell>
                                          <TableCell>
                                            <Chip
                                              label={report?.subjects}
                                              size="small"
                                              sx={{
                                                bgcolor: alpha(
                                                  theme.palette.secondary.main,
                                                  0.08,
                                                ),
                                                color:
                                                  theme.palette.secondary.main,
                                                fontWeight: 500,
                                                borderRadius: 1,
                                                height: { xs: 20, sm: 24 },
                                                "& .MuiChip-label": {
                                                  px: { xs: 0.5, sm: 1 },
                                                  fontSize: {
                                                    xs: "0.62rem",
                                                    sm: "0.72rem",
                                                  },
                                                },
                                              }}
                                            />
                                          </TableCell>
                                          <TableCell>
                                            <Typography
                                              variant="body2"
                                              fontWeight={500}
                                              sx={{
                                                fontSize: {
                                                  xs: "0.65rem",
                                                  sm: "0.75rem",
                                                },
                                              }}
                                            >
                                              {report?.teachers || "N/A"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell>
                                            <Box
                                              sx={{
                                                display: "inline-flex",
                                                bgcolor: alpha(
                                                  theme.palette.info.main,
                                                  0.08,
                                                ),
                                                color: theme.palette.info.main,
                                                px: { xs: 0.75, sm: 1 },
                                                py: 0.25,
                                                borderRadius: 1,
                                                fontWeight: 500,
                                                fontSize: {
                                                  xs: "0.62rem",
                                                  sm: "0.72rem",
                                                },
                                              }}
                                            >
                                              {report.hour || "N/A"}
                                            </Box>
                                          </TableCell>
                                          <TableCell>
                                            <Chip
                                              icon={
                                                evaluation?.attendance?.toLowerCase() ===
                                                "উপস্থিত" ? (
                                                  <CheckCircleIcon
                                                    color="success"
                                                    sx={{
                                                      fontSize:
                                                        "14px !important",
                                                    }}
                                                  />
                                                ) : (
                                                  <CancelIcon
                                                    sx={{
                                                      color: "error.main",
                                                      fontSize:
                                                        "14px !important",
                                                    }}
                                                  />
                                                )
                                              }
                                              label={
                                                evaluation?.attendance || "N/A"
                                              }
                                              color={
                                                evaluation?.attendance?.toLowerCase() ===
                                                "উপস্থিত"
                                                  ? "success"
                                                  : "error"
                                              }
                                              size="small"
                                              sx={{
                                                fontWeight: 500,
                                                height: { xs: 20, sm: 24 },
                                                "& .MuiChip-label": {
                                                  px: { xs: 0.5, sm: 1 },
                                                  fontSize: {
                                                    xs: "0.6rem",
                                                    sm: "0.7rem",
                                                  },
                                                },
                                              }}
                                            />
                                          </TableCell>
                                          <TableCell>
                                            <Chip
                                              icon={
                                                evaluation?.lessonEvaluation &&
                                                evaluation?.lessonEvaluation !==
                                                  "পড়া শিখেনি" ? (
                                                  <CheckCircleIcon
                                                    sx={{
                                                      color: "#651FFF",
                                                      fontSize:
                                                        "14px !important",
                                                    }}
                                                  />
                                                ) : (
                                                  <CancelIcon
                                                    sx={{
                                                      color: "#FF1744",
                                                      fontSize:
                                                        "14px !important",
                                                    }}
                                                  />
                                                )
                                              }
                                              label={
                                                evaluation?.lessonEvaluation ||
                                                "N/A"
                                              }
                                              size="small"
                                              sx={{
                                                fontWeight: 500,
                                                height: { xs: 20, sm: 24 },
                                                color:
                                                  evaluation?.lessonEvaluation &&
                                                  evaluation?.lessonEvaluation !==
                                                    "পড়া শিখেনি"
                                                    ? "#651FFF"
                                                    : "#FF1744",
                                                bgcolor:
                                                  evaluation?.lessonEvaluation &&
                                                  evaluation?.lessonEvaluation !==
                                                    "পড়া শিখেনি"
                                                    ? "#EDE7F6"
                                                    : "#FFEBEE",
                                                border: `1px solid ${evaluation?.lessonEvaluation && evaluation?.lessonEvaluation !== "পড়া শিখেনি" ? "#651FFF" : "#FF1744"}`,
                                                "& .MuiChip-label": {
                                                  px: { xs: 0.5, sm: 1 },
                                                  fontSize: {
                                                    xs: "0.6rem",
                                                    sm: "0.7rem",
                                                  },
                                                },
                                              }}
                                            />
                                          </TableCell>
                                          <TableCell>
                                            <Chip
                                              icon={
                                                evaluation?.handwriting &&
                                                evaluation?.handwriting !==
                                                  "লিখেনি" ? (
                                                  <DrawIcon
                                                    sx={{
                                                      color: "#00BFA6",
                                                      fontSize:
                                                        "14px !important",
                                                    }}
                                                  />
                                                ) : (
                                                  <BlockIcon
                                                    sx={{
                                                      color: "#FF1744",
                                                      fontSize:
                                                        "14px !important",
                                                    }}
                                                  />
                                                )
                                              }
                                              label={
                                                evaluation?.handwriting || "N/A"
                                              }
                                              size="small"
                                              sx={{
                                                fontWeight: 500,
                                                height: { xs: 20, sm: 24 },
                                                color:
                                                  evaluation?.handwriting &&
                                                  evaluation?.handwriting !==
                                                    "লিখেনি"
                                                    ? "#00BFA6"
                                                    : "#FF1744",
                                                bgcolor:
                                                  evaluation?.handwriting &&
                                                  evaluation?.handwriting !==
                                                    "লিখেনি"
                                                    ? "#E0F7FA"
                                                    : "#FFEBEE",
                                                border: `1px solid ${evaluation?.handwriting && evaluation?.handwriting !== "লিখেনি" ? "#00BFA6" : "#FF1744"}`,
                                                "& .MuiChip-label": {
                                                  px: { xs: 0.5, sm: 1 },
                                                  fontSize: {
                                                    xs: "0.6rem",
                                                    sm: "0.7rem",
                                                  },
                                                },
                                              }}
                                            />
                                          </TableCell>
                                          <TableCell align="center">
                                            {evaluation?.parentSignature &&
                                            evaluation?.parentSignature !==
                                              "" ? (
                                              <CheckCircleIcon
                                                color="success"
                                                sx={{
                                                  fontSize: { xs: 16, sm: 20 },
                                                }}
                                              />
                                            ) : (
                                              <CancelIcon
                                                color="error"
                                                sx={{
                                                  fontSize: { xs: 16, sm: 20 },
                                                }}
                                              />
                                            )}
                                          </TableCell>
                                          <TableCell>
                                            {hasComment ? (
                                              <Box
                                                sx={{
                                                  display: "inline-flex",
                                                  alignItems: "center",
                                                  bgcolor: alpha(
                                                    theme.palette.warning.main,
                                                    0.08,
                                                  ),
                                                  color:
                                                    theme.palette.warning.main,
                                                  px: { xs: 0.75, sm: 1 },
                                                  py: 0.25,
                                                  borderRadius: 1,
                                                  fontWeight: 600,
                                                  fontSize: {
                                                    xs: "0.62rem",
                                                    sm: "0.72rem",
                                                  },
                                                  maxWidth: {
                                                    xs: 90,
                                                    sm: 140,
                                                    md: 180,
                                                  },
                                                  border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                                                }}
                                              >
                                                <CommentIcon
                                                  sx={{
                                                    fontSize: {
                                                      xs: 11,
                                                      sm: 13,
                                                    },
                                                    mr: 0.5,
                                                    flexShrink: 0,
                                                  }}
                                                />
                                                <Typography
                                                  variant="caption"
                                                  sx={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    fontSize: {
                                                      xs: "0.6rem",
                                                      sm: "0.7rem",
                                                    },
                                                  }}
                                                  title={evaluation.comments}
                                                >
                                                  {evaluation.comments}
                                                </Typography>
                                              </Box>
                                            ) : (
                                              <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                  fontSize: {
                                                    xs: "0.6rem",
                                                    sm: "0.7rem",
                                                  },
                                                }}
                                              >
                                                —
                                              </Typography>
                                            )}
                                          </TableCell>
                                          <TableCell>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                              }}
                                            >
                                              {!isMobile && (
                                                <>
                                                  <a
                                                    className="editIconWrap edit2"
                                                    href={`${process.env.NEXT_PUBLIC_BASE_API_URL}/class-report/classreport/${report._id}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                  >
                                                    <Download fontSize="small" />
                                                  </a>
                                                  <Tooltip title="View Details">
                                                    <IconButton
                                                      size="small"
                                                      onClick={(e) =>
                                                        handleOpenDetailsModal(
                                                          e,
                                                          report,
                                                          evaluation,
                                                        )
                                                      }
                                                      sx={{
                                                        p: {
                                                          xs: 0.5,
                                                          sm: 0.75,
                                                        },
                                                      }}
                                                    >
                                                      <VisibilityIcon
                                                        sx={{
                                                          fontSize: {
                                                            xs: 15,
                                                            sm: 18,
                                                          },
                                                        }}
                                                      />
                                                    </IconButton>
                                                  </Tooltip>
                                                  <Tooltip title="Edit Report">
                                                    <IconButton
                                                      size="small"
                                                      component={Link}
                                                      href={`/dashboard/classes/report/list/${report._id}`}
                                                      sx={{
                                                        color: "warning.main",
                                                        bgcolor: alpha(
                                                          theme.palette.warning
                                                            .main,
                                                          0.1,
                                                        ),
                                                        p: {
                                                          xs: 0.5,
                                                          sm: 0.75,
                                                        },
                                                        "&:hover": {
                                                          bgcolor: alpha(
                                                            theme.palette
                                                              .warning.main,
                                                            0.2,
                                                          ),
                                                          transform:
                                                            "translateY(-1px)",
                                                        },
                                                        transition: "all 0.2s",
                                                      }}
                                                      onClick={(e) =>
                                                        e.stopPropagation()
                                                      }
                                                    >
                                                      <EditIcon
                                                        sx={{
                                                          fontSize: {
                                                            xs: 15,
                                                            sm: 18,
                                                          },
                                                        }}
                                                      />
                                                    </IconButton>
                                                  </Tooltip>
                                                </>
                                              )}
                                              <Tooltip title="Delete Report">
                                                <IconButton
                                                  size="small"
                                                  sx={{
                                                    color: "error.main",
                                                    bgcolor: alpha(
                                                      theme.palette.error.main,
                                                      0.1,
                                                    ),
                                                    p: { xs: 0.5, sm: 0.75 },
                                                    "&:hover": {
                                                      bgcolor: alpha(
                                                        theme.palette.error
                                                          .main,
                                                        0.2,
                                                      ),
                                                      transform:
                                                        "translateY(-1px)",
                                                    },
                                                    transition: "all 0.2s",
                                                  }}
                                                  onClick={(e) =>
                                                    handleDeleteClick(e, report)
                                                  }
                                                >
                                                  <DeleteIcon
                                                    sx={{
                                                      fontSize: {
                                                        xs: 15,
                                                        sm: 18,
                                                      },
                                                    }}
                                                  />
                                                </IconButton>
                                              </Tooltip>
                                            </Box>
                                          </TableCell>
                                        </TableRow>
                                      );
                                    },
                                  )}
                                </React.Fragment>
                              );
                            })
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={12}
                                align="center"
                                sx={{ py: 6 }}
                              >
                                <Box
                                  sx={{
                                    textAlign: "center",
                                    p: { xs: 2, sm: 4 },
                                    borderRadius: 2,
                                    bgcolor: alpha(
                                      theme.palette.primary.main,
                                      0.03,
                                    ),
                                    border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                                  }}
                                >
                                  {filters.hasComments ? (
                                    <>
                                      <CommentIcon
                                        sx={{
                                          fontSize: { xs: 40, sm: 64 },
                                          color: alpha(
                                            theme.palette.warning.main,
                                            0.3,
                                          ),
                                          mb: 1,
                                        }}
                                      />
                                      <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{
                                          fontWeight: 600,
                                          color: theme.palette.warning.main,
                                          fontSize: {
                                            xs: "0.95rem",
                                            sm: "1.1rem",
                                          },
                                        }}
                                      >
                                        No reports with comments found
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                          maxWidth: 380,
                                          mx: "auto",
                                          mb: 2,
                                          fontSize: {
                                            xs: "0.75rem",
                                            sm: "0.875rem",
                                          },
                                        }}
                                      >
                                        Try adjusting your search or other
                                        filters, or turn off the comments
                                        filter.
                                      </Typography>
                                    </>
                                  ) : (
                                    <>
                                      <SearchIcon
                                        sx={{
                                          fontSize: { xs: 40, sm: 64 },
                                          color: alpha(
                                            theme.palette.primary.main,
                                            0.3,
                                          ),
                                          mb: 1,
                                        }}
                                      />
                                      <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{
                                          fontWeight: 600,
                                          color: theme.palette.primary.main,
                                          fontSize: {
                                            xs: "0.95rem",
                                            sm: "1.1rem",
                                          },
                                        }}
                                      >
                                        No class reports found
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                          maxWidth: 380,
                                          mx: "auto",
                                          mb: 2,
                                          fontSize: {
                                            xs: "0.75rem",
                                            sm: "0.875rem",
                                          },
                                        }}
                                      >
                                        Try adjusting your search or filter to
                                        find what you&apos;re looking for.
                                      </Typography>
                                    </>
                                  )}
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleClearFilters}
                                    startIcon={<RefreshIcon />}
                                    size={isMobile ? "small" : "medium"}
                                    sx={{ mt: 1 }}
                                  >
                                    Clear Filters
                                  </Button>
                                </Box>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </Box>

                    {/* ── Pagination ── */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", sm: "center" },
                        gap: { xs: 1.5, sm: 0 },
                        py: { xs: 2, sm: 3 },
                        px: 2,
                        borderTop: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                        bgcolor: alpha(theme.palette.secondary.main, 0.02),
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
                      >
                        Showing {(page - 1) * rowsPerPage + 1}–
                        {Math.min(page * rowsPerPage, totalCount)} of{" "}
                        {totalCount}
                        {filters.hasComments && (
                          <Chip
                            size="small"
                            icon={<CommentIcon />}
                            label="Comments Only"
                            color="warning"
                            sx={{
                              ml: 1,
                              height: 20,
                              "& .MuiChip-label": { fontSize: "0.65rem" },
                            }}
                          />
                        )}
                      </Typography>
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                        color="secondary"
                        size={isMobile ? "small" : "large"}
                        showFirstButton
                        showLastButton
                        sx={{
                          "& .MuiPaginationItem-root": {
                            fontWeight: 500,
                            border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                            fontSize: { xs: "0.7rem", sm: "0.85rem" },
                            minWidth: { xs: 28, sm: 36 },
                            height: { xs: 28, sm: 36 },
                            "&:hover": {
                              bgcolor: alpha(
                                theme.palette.secondary.main,
                                0.08,
                              ),
                              transform: "translateY(-1px)",
                            },
                            transition: "all 0.2s ease",
                          },
                          "& .Mui-selected": {
                            fontWeight: 600,
                            bgcolor: `${theme.palette.secondary.main} !important`,
                            color: "white",
                          },
                        }}
                      />
                    </Box>
                  </>
                )}
              </Paper>
            </div>
          </Fade>
        </Container>
      </Box>

      {typeof window !== "undefined" && (
        <DateRangePicker
          open={dateRangePickerOpen}
          onClose={handleDateRangePickerClose}
          onApply={handleDateRangeApply}
          initialRange={selectedDateRange}
        />
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: 3,
            width: "100%",
            maxWidth: { xs: "92vw", sm: 480 },
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 600, fontSize: { xs: "1rem", sm: "1.1rem" } }}
          >
            Delete Class Report
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
          >
            Are you sure you want to delete this class report? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="inherit"
            size={isMobile ? "small" : "medium"}
            sx={{ borderColor: "rgba(0,0,0,0.12)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            size={isMobile ? "small" : "medium"}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ClassReportDetailsModal
        open={detailsModalOpen}
        onClose={handleCloseDetailsModal}
        data={{
          reportData: selectedReportDetails?.reportData,
          studentEvaluation: selectedReportDetails?.studentEvaluation,
        }}
      />
    </ThemeProvider>
  );
}
