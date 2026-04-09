/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FeeSummaryStats from "@/components/common/dashboard/FeeSummaryStats";
import LoadingSpinner from "@/components/LoadingSpinner";
import { MONTHS } from "@/constant/month";
import {
  ClassData,
  ClientFilters,
  MonthData,
  YearlyData,
} from "@/interface/fees";
import { useGetClassWiseFeeSummaryQuery } from "@/redux/api/feesApi";
import { fmt, fmtClass, pct } from "@/utils/feeUtils";
import {
  CalendarMonth as CalendarIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  Receipt as FeeIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
  School as SchoolIcon,
  Search as SearchIcon,
  People as StudentsIcon,
  DateRange as YearIcon,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import { DEFAULT_CLIENT_FILTERS, ZERO_TOTAL } from "./__components/constant";

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 6 }, (_, i) =>
  String(CURRENT_YEAR - i),
);

const DEFAULT_ROWS_PER_PAGE = 10;
const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50];

const MonthlyFeeRow = ({
  month,
  data,
  isEven,
}: {
  month: string;
  data: MonthData;
  isEven: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const dueColor =
    data.totalDue === 0
      ? "success"
      : data.totalDue < 5000
        ? "warning"
        : "error";

  return (
    <>
      <TableRow
        onClick={() => setOpen((o) => !o)}
        sx={{
          bgcolor: isEven
            ? alpha(theme.palette.action.hover, 0.3)
            : "transparent",
          transition: "background-color 0.2s",
          "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.08) },
          cursor: "pointer",
        }}
      >
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarIcon fontSize="small" color="action" />
            <Typography fontWeight={500}>{month}</Typography>
          </Stack>
        </TableCell>
        <TableCell align="right">
          <Typography fontWeight={600} color="primary.main">
            {fmt(data.totalAmount)}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography fontWeight={600} color="success.main">
            {fmt(data.totalPaid)}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Chip
            label={fmt(data.totalDue)}
            size="small"
            color={dueColor as any}
            variant={data.totalDue === 0 ? "filled" : "outlined"}
            sx={{ fontWeight: 500 }}
          />
        </TableCell>
        <TableCell align="right">
          <Typography fontWeight={500} color="warning.main">
            {fmt(data.totalDiscount)}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography fontWeight={500} color="info.main">
            {fmt(data.totalAdvance)}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Stack direction="row" spacing={1} justifyContent="center">
            <Chip
              icon={<StudentsIcon sx={{ fontSize: 14 }} />}
              label={data.studentCount}
              size="small"
              variant="outlined"
            />
            <Chip
              icon={<FeeIcon sx={{ fontSize: 14 }} />}
              label={data.feeCount}
              size="small"
              variant="outlined"
            />
          </Stack>
        </TableCell>
        <TableCell align="center">
          <IconButton
            size="small"
            sx={{
              transform: open ? "rotate(180deg)" : "none",
              transition: "0.2s",
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};
interface PaginationControlsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const PaginationControls = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: PaginationControlsProps) => {
  const totalPages = Math.ceil(count / rowsPerPage);
  const startIndex = page * rowsPerPage + 1;
  const endIndex = Math.min((page + 1) * rowsPerPage, count);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        mt: 3,
        pt: 2,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <Select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            variant="outlined"
          >
            {ROWS_PER_PAGE_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option} per page
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body2" color="text.secondary">
          {startIndex}–{endIndex} of {count}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title="First Page">
          <IconButton
            onClick={() => onPageChange(0)}
            disabled={page === 0}
            size="small"
          >
            <FirstPageIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Previous Page">
          <IconButton
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
            size="small"
          >
            <PrevIcon />
          </IconButton>
        </Tooltip>

        <Box sx={{ display: "flex", gap: 0.5, mx: 1 }}>
          {(() => {
            const maxVisible = 5;
            let startPage = Math.max(0, page - Math.floor(maxVisible / 2));
            const endPage = Math.min(
              totalPages - 1,
              startPage + maxVisible - 1,
            );
            if (endPage - startPage + 1 < maxVisible) {
              startPage = Math.max(0, endPage - maxVisible + 1);
            }

            const pages = [];
            if (startPage > 0) {
              pages.push(0);
              if (startPage > 1) pages.push(-1);
            }
            for (let i = startPage; i <= endPage; i++) {
              pages.push(i);
            }
            if (endPage < totalPages - 1) {
              if (endPage < totalPages - 2) pages.push(-1);
              pages.push(totalPages - 1);
            }

            return pages.map((p, idx) =>
              p === -1 ? (
                <Typography
                  key={`sep-${idx}`}
                  sx={{ px: 1 }}
                  color="text.secondary"
                >
                  …
                </Typography>
              ) : (
                <IconButton
                  key={p}
                  onClick={() => onPageChange(p)}
                  size="small"
                  sx={{
                    minWidth: 32,
                    bgcolor: page === p ? "primary.main" : "transparent",
                    color: page === p ? "white" : "inherit",
                    "&:hover": {
                      bgcolor: page === p ? "primary.dark" : "action.hover",
                    },
                  }}
                >
                  {p + 1}
                </IconButton>
              ),
            );
          })()}
        </Box>

        <Tooltip title="Next Page">
          <IconButton
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages - 1}
            size="small"
          >
            <NextIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Last Page">
          <IconButton
            onClick={() => onPageChange(totalPages - 1)}
            disabled={page >= totalPages - 1}
            size="small"
          >
            <LastPageIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default function ClassWiseFeeSummary() {
  const [selectedYear, setSelectedYear] = useState<number>(CURRENT_YEAR);
  const [filters, setFilters] = useState<ClientFilters>(DEFAULT_CLIENT_FILTERS);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const theme = useTheme();

  const { data, isLoading, isFetching, error } = useGetClassWiseFeeSummaryQuery(
    { academicYear: selectedYear },
    { skip: !selectedYear },
  );

  const summaryData = data?.data;
  const rawClasses: ClassData[] = summaryData?.classes ?? [];
  const grandTotal: YearlyData = summaryData?.grandTotal ?? ZERO_TOTAL;
  const academicYear: number = summaryData?.academicYear ?? selectedYear;

  const resetPage = () => setPage(0);

  const availableClasses = useMemo(
    () => [...new Set(rawClasses.map((c) => c.class))].sort(),
    [rawClasses],
  );

  const availableMonths = useMemo(() => {
    const set = new Set<string>();
    rawClasses.forEach((c) => c.monthly.forEach((m) => set.add(m.month)));
    return MONTHS.filter((m) => set.has(m));
  }, [rawClasses]);

  const filteredClasses = useMemo(() => {
    const {
      search,
      class: cls,
      month,
      minDue,
      minPaid,
      minAdvance,
      sortBy,
      sortDir,
    } = filters;

    let result = rawClasses.map((item) => {
      let monthly = item.monthly;
      if (month) monthly = monthly.filter((m) => m.month === month);
      if (minDue) monthly = monthly.filter((m) => m.totalDue >= Number(minDue));
      if (minPaid)
        monthly = monthly.filter((m) => m.totalPaid >= Number(minPaid));
      if (minAdvance)
        monthly = monthly.filter((m) => m.totalAdvance >= Number(minAdvance));

      const yearly =
        month || minDue || minPaid || minAdvance
          ? monthly.reduce(
              (acc, m) => ({
                totalAmount: acc.totalAmount + m.totalAmount,
                totalPaid: acc.totalPaid + m.totalPaid,
                totalDue: acc.totalDue + m.totalDue,
                totalDiscount: acc.totalDiscount + m.totalDiscount,
                totalWaiver: acc.totalWaiver + m.totalWaiver,
                totalAdvance: acc.totalAdvance + m.totalAdvance,
              }),
              { ...ZERO_TOTAL },
            )
          : item.yearly;

      return { ...item, monthly, yearly };
    });

    if (cls) result = result.filter((c) => c.class === cls);
    if (search.trim())
      result = result.filter((c) =>
        fmtClass(c.class).toLowerCase().includes(search.toLowerCase()),
      );
    result = result.filter((c) => c.monthly.length > 0);

    result.sort((a, b) => {
      const aV =
        sortBy === "class" ? a.class : ((a.yearly as any)[sortBy] ?? 0);
      const bV =
        sortBy === "class" ? b.class : ((b.yearly as any)[sortBy] ?? 0);
      if (typeof aV === "string")
        return sortDir === "asc" ? aV.localeCompare(bV) : bV.localeCompare(aV);
      return sortDir === "asc" ? aV - bV : bV - aV;
    });

    return result;
  }, [rawClasses, filters]);

  const paginatedClasses = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredClasses.slice(start, end);
  }, [filteredClasses, page, rowsPerPage]);

  useMemo(() => {
    if (
      page > 0 &&
      paginatedClasses.length === 0 &&
      filteredClasses.length > 0
    ) {
      setPage(0);
    }
  }, [filteredClasses.length, page, paginatedClasses.length]);

  const filteredTotal = useMemo(
    () =>
      filteredClasses.reduce(
        (acc, c) => ({
          totalAmount: acc.totalAmount + c.yearly.totalAmount,
          totalPaid: acc.totalPaid + c.yearly.totalPaid,
          totalDue: acc.totalDue + c.yearly.totalDue,
          totalDiscount: acc.totalDiscount + c.yearly.totalDiscount,
          totalWaiver: acc.totalWaiver + c.yearly.totalWaiver,
          totalAdvance: acc.totalAdvance + c.yearly.totalAdvance,
        }),
        { ...ZERO_TOTAL },
      ),
    [filteredClasses],
  );

  const setFilter = (key: keyof ClientFilters, val: string) => {
    setFilters((p) => ({ ...p, [key]: val }));
    resetPage();
  };

  const resetFilters = () => {
    setFilters(DEFAULT_CLIENT_FILTERS);
    resetPage();
  };

  const handleYearChange = (newYear: number) => {
    setSelectedYear(newYear);
    resetFilters();
    resetPage();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const activeCount = [
    filters.class,
    filters.month,
    filters.minDue,
    filters.minPaid,
    filters.minAdvance,
  ].filter(Boolean).length;

  const isLoadingAny = isLoading || isFetching;

  if (isLoadingAny) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper sx={{ p: 6, textAlign: "center" }}>
          <Typography color="error" variant="h6">
            Failed to load fee summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please try again later.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Box>
            <Typography variant="overline" sx={{ opacity: 0.8 }}>
              Fee Collection Summary
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              Academic Year {academicYear}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              {rawClasses.length} classes ·{" "}
              {pct(grandTotal.totalPaid, grandTotal.totalAmount)} collected
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  "&.Mui-focused": { color: "white" },
                }}
              >
                Academic Year
              </InputLabel>
              <Select
                value={selectedYear}
                label="Academic Year"
                onChange={(e) => handleYearChange(Number(e.target.value))}
                startAdornment={
                  <YearIcon
                    sx={{
                      mr: 0.5,
                      fontSize: 18,
                      color: "rgba(255,255,255,0.7)",
                    }}
                  />
                }
                sx={{
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.5)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  ".MuiSvgIcon-root": { color: "white" },
                }}
              >
                {YEAR_OPTIONS.map((y) => (
                  <MenuItem key={y} value={Number(y)}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Paper>

      {/* Stats Section - Using Reusable Component */}
      <FeeSummaryStats
        filteredTotal={filteredTotal}
        grandTotal={grandTotal}
        filteredClassesLength={filteredClasses.length}
        rawClassesLength={rawClasses.length}
        loading={isLoadingAny}
      />

      {/* Filter Bar */}
      <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          flexWrap="wrap"
          gap={1}
        >
          <TextField
            placeholder="Search class…"
            size="small"
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
            sx={{ minWidth: 180 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: filters.search ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setFilter("search", "")}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />

          <FormControl size="small" sx={{ minWidth: 155 }}>
            <InputLabel>Class</InputLabel>
            <Select
              value={filters.class}
              label="Class"
              onChange={(e) => setFilter("class", e.target.value)}
            >
              <MenuItem value="">
                <em>All Classes</em>
              </MenuItem>
              {availableClasses.map((c) => (
                <MenuItem key={c} value={c}>
                  {fmtClass(c)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 145 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={filters.month}
              label="Month"
              onChange={(e) => setFilter("month", e.target.value)}
            >
              <MenuItem value="">
                <em>All Months</em>
              </MenuItem>
              {availableMonths.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 145 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sortBy}
              label="Sort By"
              onChange={(e) => setFilter("sortBy", e.target.value)}
            >
              <MenuItem value="class">Class Name</MenuItem>
              <MenuItem value="totalAmount">Total Amount</MenuItem>
              <MenuItem value="totalPaid">Total Paid</MenuItem>
              <MenuItem value="totalDue">Total Due</MenuItem>
              <MenuItem value="totalDiscount">Discount</MenuItem>
              <MenuItem value="totalAdvance">Advance</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: 70, fontWeight: 600 }}
            onClick={() =>
              setFilter("sortDir", filters.sortDir === "asc" ? "desc" : "asc")
            }
          >
            {filters.sortDir === "asc" ? "↑ ASC" : "↓ DESC"}
          </Button>

          {(activeCount > 0 || filters.search) && (
            <Button
              variant="text"
              size="small"
              color="error"
              startIcon={<ClearIcon />}
              onClick={resetFilters}
            >
              Reset
            </Button>
          )}
        </Stack>
      </Paper>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <SchoolIcon color="primary" />
          Class-wise Breakdown
          <Chip
            label={`${filteredClasses.length} of ${rawClasses.length} classes`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Page {page + 1} of{" "}
          {Math.ceil(filteredClasses.length / rowsPerPage) || 1}
        </Typography>
      </Stack>

      {/* Empty state */}
      {filteredClasses.length === 0 && (
        <Paper sx={{ p: 6, textAlign: "center" }}>
          <SearchIcon sx={{ fontSize: 56, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No results found
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mb: 2 }}>
            Try adjusting filters or selecting a different academic year.
          </Typography>
          <Button variant="outlined" onClick={resetFilters}>
            Reset Filters
          </Button>
        </Paper>
      )}

      {
        <>
          {paginatedClasses.map((item) => (
            <Paper
              key={item.class}
              sx={{ mb: 4, borderRadius: 2, overflow: "hidden" }}
            >
              <Box
                sx={{
                  p: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={1}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <SchoolIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      {fmtClass(item.class)}
                    </Typography>
                    <Chip
                      label={`${item.monthly[0]?.studentCount ?? 0} Students`}
                      size="small"
                      variant="outlined"
                    />
                    {item.monthly.length > 1 && (
                      <Chip
                        label={`${item.monthly.length} Months`}
                        size="small"
                        color="info"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {[
                      {
                        label: "Total",
                        val: item.yearly.totalAmount,
                        color: "text.primary",
                      },
                      {
                        label: "Paid",
                        val: item.yearly.totalPaid,
                        color: "success.main",
                      },
                      {
                        label: "Due",
                        val: item.yearly.totalDue,
                        color: "error.main",
                      },
                      {
                        label: "Discount",
                        val: item.yearly.totalDiscount,
                        color: "warning.main",
                      },
                      ...(item.yearly.totalAdvance > 0
                        ? [
                            {
                              label: "Advance",
                              val: item.yearly.totalAdvance,
                              color: "info.main",
                            },
                          ]
                        : []),
                    ].map(({ label, val, color }) => (
                      <Typography key={label} variant="body2" color={color}>
                        {label}: <strong>{fmt(val)}</strong>
                      </Typography>
                    ))}
                  </Stack>
                </Stack>
              </Box>

              <TableContainer>
                <Table size="medium">
                  <TableHead>
                    <TableRow
                      sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}
                    >
                      <TableCell>Month</TableCell>
                      <TableCell align="right">Total Amount</TableCell>
                      <TableCell align="right">Total Paid</TableCell>
                      <TableCell align="right">Total Due</TableCell>
                      <TableCell align="right">Discount</TableCell>
                      <TableCell align="right">Advance</TableCell>
                      <TableCell align="center">Students / Fees</TableCell>
                      <TableCell align="center" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item.monthly.map((m, mi) => (
                      <MonthlyFeeRow
                        key={m.month}
                        month={m.month}
                        data={m}
                        isEven={mi % 2 === 0}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ))}
        </>
      }

      {/* Pagination Controls */}
      {filteredClasses.length > 0 && (
        <PaginationControls
          count={filteredClasses.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
    </Container>
  );
}
