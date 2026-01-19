/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ArrowDownward,
  ArrowUpward,
  CheckCircle,
  Clear,
  Error,
  FileDownload,
  FilterList,
  Info,
  MoreVert,
  Print,
  Refresh,
  Search,
  ViewColumn,
  Visibility,
  Edit,
  Delete,
  Add,
  Sort,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  Badge,
  Paper,
  Fade,
  Zoom,
  Fab,
  Backdrop,
  alpha,
  styled,
} from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";

// Styled components for enhanced design
const StyledTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-head": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderBottom: `2px solid ${alpha(theme.palette.primary.dark, 0.3)}`,
    fontWeight: 700,
    fontSize: "0.875rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": { border: 0 },
  "&.MuiTableRow-hover": {
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
      transform: "translateY(-1px)",
      boxShadow: theme.shadows[1],
    },
  },
  "&.Mui-selected": {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
  },
}));

const GradientCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`,
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: alpha(theme.palette.background.paper, 0.9),
      boxShadow: theme.shadows[1],
    },
    "&.Mui-focused": {
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transform: "scale(1.1)",
  },
  transition: "all 0.2s ease-in-out",
}));

// Types for the table component
export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
  format?: (value: any) => string | React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  type?:
    | "text"
    | "number"
    | "date"
    | "boolean"
    | "status"
    | "avatar"
    | "progress";
  visible?: boolean;
  render?: (row: any) => React.ReactNode;
  filterOptions?: { label: string; value: string }[];
}

export interface RowAction {
  label: string;
  icon: React.ReactNode;
  onClick: (row: any) => void;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  disabled?: (row: any) => boolean;
  tooltip?: string;
  inMenu?: boolean;
  alwaysShow?: boolean;
}

export interface BulkAction {
  label: string;
  icon: React.ReactNode;
  onClick: (selectedRows: any[]) => void;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  disabled?: (selectedRows: any[]) => boolean;
}

export interface EnhancedTableProps {
  title?: string;
  subtitle?: string;
  columns: Column[];
  data: any[];
  loading?: boolean;
  error?: string;
  rowCount?: number;
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onPrint?: () => void;
  onAdd?: () => void;
  onSortChange?: (sortColumn: string, sortDirection: "asc" | "desc") => void;
  onSearchChange?: (searchTerm: string) => void;
  rowActions?: RowAction[];
  bulkActions?: BulkAction[];
  selectable?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  pagination?: boolean;
  serverSideSorting?: boolean;
  emptyStateMessage?: string;
  className?: string;
  idField?: string;
  defaultSortColumn?: string;
  defaultSortDirection?: "asc" | "desc";
  height?: string | number;
  maxHeight?: string | number;
  stickyHeader?: boolean;
  dense?: boolean;
  striped?: boolean;
  hover?: boolean;
  showToolbar?: boolean;
  customToolbar?: React.ReactNode;
  elevation?: number;
  borderRadius?: number;
  cardSx?: object;
  headerBackgroundColor?: string;
  showRowNumbers?: boolean;
  rowNumberHeader?: string;
  actionColumnWidth?: number;
  actionMenuLabel?: string;
  loadingOverlay?: boolean;
  fadeIn?: boolean;
}

const CraftTable: React.FC<EnhancedTableProps> = ({
  title,
  subtitle,
  columns,
  data,
  loading = false,
  error,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  onRefresh,
  onExport,
  onPrint,
  onAdd,
  onSortChange,
  onSearchChange,
  rowActions = [],
  bulkActions = [],
  selectable = false,
  searchable = true,
  filterable = true,
  sortable = true,
  pagination = true,
  serverSideSorting = false,
  emptyStateMessage = "No data available",
  className,
  idField = "id",
  defaultSortColumn = "",
  defaultSortDirection = "asc",
  height,
  maxHeight = "70vh",
  stickyHeader = true,
  dense = false,
  striped = true,
  hover = true,
  showToolbar = true,
  customToolbar,
  elevation = 0,
  borderRadius = 3,
  cardSx = {},
  headerBackgroundColor,
  showRowNumbers = false,
  rowNumberHeader = "#",
  actionColumnWidth = 120,
  actionMenuLabel = "Actions",
  loadingOverlay = true,
  fadeIn = true,
}) => {
  const theme = useTheme();

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState(defaultSortColumn || "");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    defaultSortDirection,
  );
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [columnMenuAnchor, setColumnMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [currentRow, setCurrentRow] = useState<any>(null);
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >(
    columns.reduce(
      (acc, column) => ({ ...acc, [column.id]: column.visible !== false }),
      {},
    ),
  );
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [pageState, setPageState] = useState(page);
  const [rowsPerPageState, setRowsPerPageState] = useState(rowsPerPage);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  // Sync with props
  useEffect(() => {
    setPageState(page);
  }, [page]);

  useEffect(() => {
    setRowsPerPageState(rowsPerPage);
  }, [rowsPerPage]);

  // Filter and sort data
  const processedData = useMemo(() => {
    let filteredData = [...data];

    // Apply search filter (only for client-side filtering when not using server-side)
    if (searchTerm && !serverSideSorting) {
      filteredData = filteredData.filter((row) =>
        columns.some((column) => {
          if (!column.visible && column.visible !== undefined) return false;
          const value = row[column.id];
          return (
            value !== null &&
            value !== undefined &&
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          );
        }),
      );
    }

    // Apply column filters (client-side only)
    if (!serverSideSorting) {
      Object.entries(filters).forEach(([columnId, filterValue]) => {
        if (filterValue) {
          filteredData = filteredData.filter((row) => {
            const value = row[columnId];
            return (
              value !== null &&
              value !== undefined &&
              String(value).toLowerCase().includes(filterValue.toLowerCase())
            );
          });
        }
      });
    }

    // Apply sorting (client-side only when not using server-side sorting)
    if (sortColumn && !serverSideSorting) {
      filteredData.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        let comparison = 0;
        if (typeof aValue === "number" && typeof bValue === "number") {
          comparison = aValue - bValue;
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }

        return sortDirection === "asc" ? comparison : -comparison;
      });
    }

    return filteredData;
  }, [
    data,
    searchTerm,
    filters,
    sortColumn,
    sortDirection,
    columns,
    serverSideSorting,
  ]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!pagination || serverSideSorting) return processedData;

    const startIndex = pageState * rowsPerPageState;
    return processedData.slice(startIndex, startIndex + rowsPerPageState);
  }, [
    processedData,
    pageState,
    rowsPerPageState,
    pagination,
    serverSideSorting,
  ]);

  // Event handlers
  const handleSort = (columnId: string) => {
    if (!sortable) return;

    const isAsc = sortColumn === columnId && sortDirection === "asc";
    const newDirection = isAsc ? "desc" : "asc";

    setSortDirection(newDirection);
    setSortColumn(columnId);

    // Call server-side sort if enabled
    if (serverSideSorting && onSortChange) {
      onSortChange(columnId, newDirection);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedRows = paginatedData.map((row) => row[idField]);
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    const newSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter((rowId) => rowId !== id)
      : [...selectedRows, id];
    setSelectedRows(newSelectedRows);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageState(newPage);
    if (onPageChange) onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPageState(newRowsPerPage);
    setPageState(0);
    if (onRowsPerPageChange) onRowsPerPageChange(newRowsPerPage);
  };

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters((prev) => ({ ...prev, [columnId]: value }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm("");
    if (onSearchChange) onSearchChange("");
  };

  const handleToggleColumnVisibility = (columnId: string) => {
    setColumnVisibility((prev) => ({ ...prev, [columnId]: !prev[columnId] }));
  };

  const handleRowAction = (action: RowAction, row: any) => {
    if (action.disabled && action.disabled(row)) return;
    action.onClick(row);
  };

  const handleBulkAction = (action: BulkAction) => {
    const selectedData = data.filter((row) =>
      selectedRows.includes(row[idField]),
    );
    if (action.disabled && action.disabled(selectedData)) return;
    action.onClick(selectedData);
  };

  const handleActionMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    row: any,
  ) => {
    setActionMenuAnchor(event.currentTarget);
    setCurrentRow(row);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setCurrentRow(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for debouncing
    const timeout = setTimeout(() => {
      if (onSearchChange) {
        onSearchChange(value);
      }
    }, 500);

    setSearchTimeout(timeout);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    if (onSearchChange) {
      onSearchChange("");
    }
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
  };

  // Render cell content based on column type
  const renderCellContent = (column: Column, row: any) => {
    const value = row[column.id];

    if (column.render) {
      return column.render(row);
    }

    if (column.format) {
      return column.format(value);
    }

    switch (column.type) {
      case "boolean":
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {value ? (
              <CheckCircle color="success" fontSize="small" />
            ) : (
              <Error color="error" fontSize="small" />
            )}
          </Box>
        );

      case "status":
        const getStatusConfig = (status: string) => {
          switch (status?.toLowerCase()) {
            case "active":
            case "completed":
            case "success":
            case "paid":
              return { color: "success", label: status || "Active" };
            case "inactive":
            case "pending":
            case "warning":
            case "partial":
              return { color: "warning", label: status || "Pending" };
            case "error":
            case "failed":
            case "cancelled":
            case "unpaid":
              return { color: "error", label: status || "Error" };
            default:
              return { color: "default", label: status || "Unknown" };
          }
        };

        const statusConfig = getStatusConfig(value);
        return (
          <Chip
            label={statusConfig.label}
            color={statusConfig.color as any}
            size="small"
            variant="filled"
            sx={{
              fontWeight: "bold",
              borderRadius: "6px",
              boxShadow: theme.shadows[1],
            }}
          />
        );

      case "date":
        try {
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2">
                {format(new Date(value), "MMM dd, yyyy")}
              </Typography>
            </Box>
          );
        } catch (e) {
          return value;
        }

      case "avatar":
        return (
          <Avatar
            sx={{
              width: 36,
              height: 36,
              boxShadow: theme.shadows[1],
              border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
            src={value}
          >
            {row.name?.charAt(0) || "U"}
          </Avatar>
        );

      case "progress":
        const percentage = Math.min(100, Math.max(0, Number(value) || 0));
        return (
          <Box sx={{ minWidth: 120 }}>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                },
              }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5, display: "block" }}
            >
              {percentage.toFixed(0)}%
            </Typography>
          </Box>
        );

      default:
        return (
          <Typography variant="body2" noWrap>
            {value}
          </Typography>
        );
    }
  };

  // Loading overlay
  if (loading && loadingOverlay) {
    return (
      <Fade in={loading}>
        <Box
          sx={{
            position: "relative",
            height: height || 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: "blur(5px)",
            }}
            open={loading}
          >
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress
                size={60}
                thickness={4}
                sx={{
                  color: theme.palette.primary.main,
                  mb: 2,
                }}
              />
              <Typography variant="h6" color="text.primary">
                Loading data...
              </Typography>
            </Box>
          </Backdrop>
        </Box>
      </Fade>
    );
  }

  // Error state
  if (error) {
    return (
      <GradientCard
        sx={{
          height,
          overflow: "hidden",
          borderRadius,
          ...cardSx,
        }}
        elevation={elevation}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: height || 400,
            p: 3,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: alpha(theme.palette.error.main, 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Error color="error" sx={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h6" color="error" gutterBottom>
            Error loading data
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            {error}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={onRefresh}
            sx={{
              borderRadius: "10px",
              px: 3,
              py: 1,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            }}
          >
            Try Again
          </Button>
        </Box>
      </GradientCard>
    );
  }

  // Separate row actions into direct buttons and menu items
  const directActions = rowActions.filter(
    (action) =>
      !action.inMenu || action.alwaysShow || action.label === "Delete",
  );
  const menuActions = rowActions.filter(
    (action) =>
      action.inMenu && action.label !== "Delete" && !action.alwaysShow,
  );

  // Calculate total rows count (for server-side pagination)
  const totalRowCount = serverSideSorting
    ? data.length > 0
      ? 1000
      : 0
    : processedData.length;

  return (
    <Fade in={true} timeout={500}>
      <GradientCard
        className={className}
        sx={{
          height,
          overflow: "hidden",
          borderRadius,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
          backdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          ...cardSx,
        }}
        elevation={elevation}
      >
        {/* Enhanced Toolbar */}
        {showToolbar && (
          <Box
            sx={{
              p: 3,
              borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              alignItems: { md: "center" },
              justifyContent: "space-between",
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {title && (
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {title}
                  </Typography>
                  {subtitle && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {subtitle}
                    </Typography>
                  )}
                </Box>
              )}
              {customToolbar}
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {searchable && (
                <SearchField
                  size="small"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={handleClearSearch}
                          edge="end"
                        >
                          <Clear fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ minWidth: 280 }}
                />
              )}

              {filterable && !serverSideSorting && (
                <Tooltip title="Filters">
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={
                      <Badge
                        badgeContent={
                          Object.keys(filters).filter((key) => filters[key])
                            .length
                        }
                        color="primary"
                      >
                        <FilterList />
                      </Badge>
                    }
                    onClick={(e) => setFilterAnchor(e.currentTarget)}
                    sx={{
                      borderRadius: "10px",
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.04,
                        ),
                      },
                    }}
                  >
                    Filters
                  </Button>
                </Tooltip>
              )}

              <Tooltip title="Column settings">
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<ViewColumn />}
                  onClick={(e) => setColumnMenuAnchor(e.currentTarget)}
                  sx={{
                    borderRadius: "10px",
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                  }}
                >
                  Columns
                </Button>
              </Tooltip>

              {onAdd && (
                <Tooltip title="Add new">
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<Add />}
                    onClick={onAdd}
                    sx={{
                      borderRadius: "10px",
                      px: 2,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
                      "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    Add New
                  </Button>
                </Tooltip>
              )}

              <Box sx={{ display: "flex", gap: 0.5 }}>
                {onRefresh && (
                  <Tooltip title="Refresh">
                    <ActionButton size="small" onClick={onRefresh}>
                      <Refresh />
                    </ActionButton>
                  </Tooltip>
                )}

                {onExport && (
                  <Tooltip title="Export">
                    <ActionButton size="small" onClick={onExport}>
                      <FileDownload />
                    </ActionButton>
                  </Tooltip>
                )}

                {onPrint && (
                  <Tooltip title="Print">
                    <ActionButton size="small" onClick={onPrint}>
                      <Print />
                    </ActionButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Box>
        )}

        {/* Enhanced Bulk actions */}
        {selectable && selectedRows.length > 0 && (
          <Zoom in={selectedRows.length > 0}>
            <Paper
              sx={{
                p: 2,
                pl: 3,
                m: 2,
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backdropFilter: "blur(10px)",
              }}
              elevation={2}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CheckCircle color="primary" />
                <Typography variant="body1" fontWeight="600">
                  {selectedRows.length} item{selectedRows.length > 1 ? "s" : ""}{" "}
                  selected
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                {bulkActions.map((action, index) => (
                  <Button
                    key={index}
                    size="small"
                    variant="outlined"
                    startIcon={action.icon}
                    onClick={() => handleBulkAction(action)}
                    disabled={
                      action.disabled &&
                      action.disabled(
                        data.filter((row) =>
                          selectedRows.includes(row[idField]),
                        ),
                      )
                    }
                    sx={{
                      borderRadius: "8px",
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                      color: "text.primary",
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Zoom>
        )}

        {/* Enhanced Table with Primary Header */}
        <TableContainer sx={{ maxHeight, overflow: "auto" }}>
          <Table stickyHeader={stickyHeader} size={dense ? "small" : "medium"}>
            <StyledTableHead>
              <TableRow>
                {showRowNumbers && (
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      fontWeight: "bold",
                      width: 60,
                    }}
                  >
                    {rowNumberHeader}
                  </TableCell>
                )}
                {selectable && (
                  <TableCell
                    padding="checkbox"
                    sx={{
                      width: 60,
                      backgroundColor: "primary.main",
                    }}
                  >
                    <Checkbox
                      indeterminate={
                        selectedRows.length > 0 &&
                        selectedRows.length < paginatedData.length
                      }
                      checked={
                        paginatedData.length > 0 &&
                        selectedRows.length === paginatedData.length
                      }
                      onChange={handleSelectAll}
                      sx={{
                        color: alpha(theme.palette.primary.contrastText, 0.7),
                        "&.Mui-checked": {
                          color: theme.palette.primary.contrastText,
                        },
                        "&.MuiCheckbox-indeterminate": {
                          color: theme.palette.primary.contrastText,
                        },
                      }}
                    />
                  </TableCell>
                )}

                {columns.map(
                  (column) =>
                    columnVisibility[column.id] !== false && (
                      <TableCell
                        key={column.id}
                        align={column.align || "left"}
                        style={{ minWidth: column.minWidth }}
                        sortDirection={
                          sortColumn === column.id ? sortDirection : false
                        }
                        sx={{
                          backgroundColor: "primary.main",
                          color: "primary.contrastText",
                          cursor: column.sortable ? "pointer" : "default",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": column.sortable
                            ? {
                                backgroundColor: theme.palette.primary.dark,
                              }
                            : {},
                        }}
                        onClick={() => column.sortable && handleSort(column.id)}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            justifyContent:
                              column.align === "right"
                                ? "flex-end"
                                : column.align === "center"
                                  ? "center"
                                  : "flex-start",
                          }}
                        >
                          {column.sortable && (
                            <Sort
                              fontSize="small"
                              sx={{
                                opacity: sortColumn === column.id ? 1 : 0.6,
                                color: "inherit",
                              }}
                            />
                          )}
                          {column.label}
                          {column.sortable &&
                            sortColumn === column.id &&
                            (sortDirection === "asc" ? (
                              <ArrowUpward
                                fontSize="small"
                                sx={{ color: "inherit" }}
                              />
                            ) : (
                              <ArrowDownward
                                fontSize="small"
                                sx={{ color: "inherit" }}
                              />
                            ))}
                        </Box>
                      </TableCell>
                    ),
                )}

                {rowActions.length > 0 && (
                  <TableCell
                    align="center"
                    sx={{
                      width: actionColumnWidth,
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                    }}
                  >
                    {actionMenuLabel}
                  </TableCell>
                )}
              </TableRow>
            </StyledTableHead>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={
                      columns.filter((c) => columnVisibility[c.id] !== false)
                        .length +
                      (showRowNumbers ? 1 : 0) +
                      (selectable ? 1 : 0) +
                      (rowActions.length > 0 ? 1 : 0)
                    }
                    align="center"
                    sx={{ py: 8 }}
                  >
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
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1,
                          ),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Info color="primary" sx={{ fontSize: 40 }} />
                      </Box>
                      <Typography variant="h6" color="text.secondary">
                        {emptyStateMessage}
                      </Typography>
                      {(searchTerm || Object.keys(filters).length > 0) && (
                        <Button
                          variant="outlined"
                          onClick={handleClearFilters}
                          sx={{
                            borderRadius: "8px",
                            mt: 1,
                          }}
                        >
                          Clear all filters
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, index) => (
                  <StyledTableRow
                    key={row[idField]}
                    selected={selectedRows.includes(row[idField])}
                    className={hover ? "MuiTableRow-hover" : ""}
                    sx={{
                      backgroundColor:
                        striped && index % 2 === 1
                          ? alpha(theme.palette.primary.main, 0.02)
                          : "inherit",
                    }}
                  >
                    {showRowNumbers && (
                      <TableCell align="center">
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight="500"
                        >
                          {pageState * rowsPerPageState + index + 1}
                        </Typography>
                      </TableCell>
                    )}
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedRows.includes(row[idField])}
                          onChange={() => handleSelectRow(row[idField])}
                          sx={{
                            color: alpha(theme.palette.primary.main, 0.6),
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      </TableCell>
                    )}

                    {columns.map(
                      (column) =>
                        columnVisibility[column.id] !== false && (
                          <TableCell
                            key={column.id}
                            align={column.align || "left"}
                            sx={{
                              py: dense ? 1 : 2,
                            }}
                          >
                            {renderCellContent(column, row)}
                          </TableCell>
                        ),
                    )}

                    {rowActions.length > 0 && (
                      <TableCell align="center" sx={{ py: dense ? 1 : 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 0.5,
                          }}
                        >
                          {/* Direct action buttons */}
                          {directActions.map((action, actionIndex) => (
                            <Tooltip
                              key={actionIndex}
                              title={action.tooltip || action.label}
                            >
                              <ActionButton
                                size="small"
                                onClick={() => handleRowAction(action, row)}
                                disabled={
                                  action.disabled && action.disabled(row)
                                }
                                sx={{
                                  backgroundColor: action.color
                                    ? alpha(
                                        theme.palette[action.color].main,
                                        0.1,
                                      )
                                    : undefined,
                                  color: action.color
                                    ? theme.palette[action.color].main
                                    : undefined,
                                }}
                              >
                                {action.icon}
                              </ActionButton>
                            </Tooltip>
                          ))}

                          {/* Action menu for additional actions */}
                          {menuActions.length > 0 && (
                            <>
                              <Tooltip title="More actions">
                                <ActionButton
                                  size="small"
                                  onClick={(e) => handleActionMenuClick(e, row)}
                                >
                                  <MoreVert />
                                </ActionButton>
                              </Tooltip>
                              <Menu
                                anchorEl={actionMenuAnchor}
                                open={Boolean(
                                  actionMenuAnchor && currentRow?.id === row.id,
                                )}
                                onClose={handleActionMenuClose}
                                PaperProps={{
                                  sx: {
                                    borderRadius: "12px",
                                    mt: 1,
                                    minWidth: 160,
                                    boxShadow: theme.shadows[8],
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                  },
                                }}
                              >
                                {menuActions.map((action, actionIndex) => (
                                  <MenuItem
                                    key={actionIndex}
                                    onClick={() => {
                                      handleRowAction(action, row);
                                      handleActionMenuClose();
                                    }}
                                    disabled={
                                      action.disabled && action.disabled(row)
                                    }
                                    sx={{
                                      borderRadius: "8px",
                                      mx: 1,
                                      my: 0.5,
                                      "&:hover": {
                                        backgroundColor: alpha(
                                          theme.palette.primary.main,
                                          0.1,
                                        ),
                                      },
                                    }}
                                  >
                                    <ListItemIcon
                                      sx={{
                                        color: action.color
                                          ? theme.palette[action.color].main
                                          : "inherit",
                                      }}
                                    >
                                      {action.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={action.label}
                                      primaryTypographyProps={{
                                        variant: "body2",
                                        fontWeight: 500,
                                      }}
                                    />
                                  </MenuItem>
                                ))}
                              </Menu>
                            </>
                          )}
                        </Box>
                      </TableCell>
                    )}
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Enhanced Pagination */}
        {pagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={serverSideSorting ? totalRowCount : processedData.length}
            rowsPerPage={rowsPerPageState}
            page={pageState}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              "& .MuiTablePagination-toolbar": {
                pl: 3,
                pr: 2,
                py: 2,
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  fontWeight: 500,
                },
            }}
          />
        )}

        {/* Enhanced Filter menu */}
        <Menu
          anchorEl={filterAnchor}
          open={Boolean(filterAnchor)}
          onClose={() => setFilterAnchor(null)}
          PaperProps={{
            sx: {
              borderRadius: "16px",
              mt: 1,
              minWidth: 300,
              boxShadow: theme.shadows[8],
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            },
          }}
        >
          <Box sx={{ p: 2.5 }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Filters
            </Typography>
            <Divider sx={{ mb: 2, opacity: 0.5 }} />
            {columns
              .filter(
                (column) =>
                  column.filterable && columnVisibility[column.id] !== false,
              )
              .map((column) => (
                <Box key={column.id} sx={{ mb: 2.5 }}>
                  {column.filterOptions ? (
                    <FormControl fullWidth size="small">
                      <InputLabel>{column.label}</InputLabel>
                      <Select
                        value={filters[column.id] || ""}
                        onChange={(e) =>
                          handleFilterChange(column.id, e.target.value)
                        }
                        label={column.label}
                        sx={{ borderRadius: "8px" }}
                      >
                        <MenuItem value="">All</MenuItem>
                        {column.filterOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      size="small"
                      fullWidth
                      label={column.label}
                      value={filters[column.id] || ""}
                      onChange={(e) =>
                        handleFilterChange(column.id, e.target.value)
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  )}
                </Box>
              ))}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 3,
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleClearFilters}
                disabled={Object.keys(filters).length === 0 && !searchTerm}
                sx={{ borderRadius: "8px", flex: 1 }}
              >
                Clear All
              </Button>
              <Button
                variant="contained"
                onClick={() => setFilterAnchor(null)}
                sx={{
                  borderRadius: "8px",
                  flex: 1,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                }}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </Menu>

        {/* Enhanced Column visibility menu */}
        <Menu
          anchorEl={columnMenuAnchor}
          open={Boolean(columnMenuAnchor)}
          onClose={() => setColumnMenuAnchor(null)}
          PaperProps={{
            sx: {
              borderRadius: "16px",
              mt: 1,
              minWidth: 220,
              boxShadow: theme.shadows[8],
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Columns
            </Typography>
            <Divider sx={{ mb: 2, opacity: 0.5 }} />
            {columns.map((column) => (
              <MenuItem
                key={column.id}
                onClick={() => handleToggleColumnVisibility(column.id)}
                sx={{
                  borderRadius: "8px",
                  my: 0.5,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={columnVisibility[column.id] !== false}
                    size="small"
                    sx={{
                      color: alpha(theme.palette.primary.main, 0.6),
                      "&.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={column.label}
                  primaryTypographyProps={{
                    variant: "body2",
                    fontWeight: 500,
                  }}
                />
              </MenuItem>
            ))}
          </Box>
        </Menu>
      </GradientCard>
    </Fade>
  );
};

export default CraftTable;
