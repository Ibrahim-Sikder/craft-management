/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetClassWiseFeeSummaryQuery } from "@/redux/api/feesApi";
import {
  CalendarMonth as CalendarIcon,
  Discount as DiscountIcon,
  TrendingDown as DueIcon,
  ExpandMore as ExpandMoreIcon,
  Receipt as FeeIcon,
  GridView as GridViewIcon,
  AttachMoney as MoneyIcon,
  Paid as PaidIcon,
  School as SchoolIcon,
  People as StudentsIcon,
  TableChart as TableIcon,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Box,
  Card,
  CardContent,
  Chip,
  Collapse,
  Container,
  Grid2 as Grid,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Stat Card Component
const StatCard = ({ title, value, icon, color, subtitle }: any) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        height: "100%",
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(
          color,
          0.02,
        )} 100%)`,
        borderLeft: `4px solid ${color}`,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[8],
          background: `linear-gradient(135deg, ${alpha(color, 0.15)} 0%, ${alpha(
            color,
            0.05,
          )} 100%)`,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.5, display: "block" }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              p: 1.5,
              borderRadius: "50%",
              bgcolor: alpha(color, 0.15),
              color: color,
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

// Monthly Fee Row Component
const MonthlyFeeRow = ({ month, data, isEven }: any) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  // Determine status color based on due amount
  const getDueStatusColor = (due: number) => {
    if (due === 0) return "success";
    if (due > 0 && due < 5000) return "warning";
    return "error";
  };

  return (
    <>
      <TableRow
        sx={{
          bgcolor: isEven
            ? alpha(theme.palette.action.hover, 0.3)
            : "transparent",
          transition: "background-color 0.2s ease",
          "&:hover": {
            bgcolor: alpha(theme.palette.primary.main, 0.08),
          },
          cursor: "pointer",
        }}
        onClick={() => setOpen(!open)}
      >
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarIcon fontSize="small" color="action" />
            <Typography fontWeight={500}>{month}</Typography>
          </Stack>
        </TableCell>
        <TableCell align="right">
          <Tooltip title="Total Amount">
            <Typography fontWeight={600} color="primary.main">
              {formatCurrency(data.totalAmount)}
            </Typography>
          </Tooltip>
        </TableCell>
        <TableCell align="right">
          <Tooltip title="Total Paid">
            <Typography fontWeight={600} color="success.main">
              {formatCurrency(data.totalPaid)}
            </Typography>
          </Tooltip>
        </TableCell>
        <TableCell align="right">
          <Tooltip title="Total Due">
            <Chip
              label={formatCurrency(data.totalDue)}
              size="small"
              color={getDueStatusColor(data.totalDue)}
              variant={data.totalDue === 0 ? "filled" : "outlined"}
              sx={{ fontWeight: 500 }}
            />
          </Tooltip>
        </TableCell>
        <TableCell align="right">
          <Tooltip title="Total Discount">
            <Typography fontWeight={500} color="warning.main">
              {formatCurrency(data.totalDiscount)}
            </Typography>
          </Tooltip>
        </TableCell>
        <TableCell align="center">
          <Stack direction="row" spacing={1} justifyContent="center">
            <Chip
              icon={<StudentsIcon sx={{ fontSize: 14 }} />}
              label={`${data.studentCount} Students`}
              size="small"
              variant="outlined"
            />
            <Chip
              icon={<FeeIcon sx={{ fontSize: 14 }} />}
              label={`${data.feeCount} Fees`}
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
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} sx={{ p: 0, border: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                p: 2,
                bgcolor: alpha(theme.palette.background.default, 0.5),
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Fee Breakdown for {month}
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      textAlign: "center",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Per Student Avg
                    </Typography>
                    <Typography fontWeight="bold">
                      {formatCurrency(data.totalAmount / data.studentCount)}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      textAlign: "center",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.success.main, 0.05),
                        borderColor: theme.palette.success.main,
                      },
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Collection Rate
                    </Typography>
                    <Typography fontWeight="bold" color="success.main">
                      {((data.totalPaid / data.totalAmount) * 100).toFixed(1)}%
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      textAlign: "center",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.warning.main, 0.05),
                        borderColor: theme.palette.warning.main,
                      },
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Discount Rate
                    </Typography>
                    <Typography fontWeight="bold" color="warning.main">
                      {((data.totalDiscount / data.totalAmount) * 100).toFixed(
                        1,
                      )}
                      %
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      textAlign: "center",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.info.main, 0.05),
                        borderColor: theme.palette.info.main,
                      },
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Avg Fee per Student
                    </Typography>
                    <Typography fontWeight="bold">
                      {formatCurrency(data.totalAmount / data.studentCount)}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

// Class Card Component (Alternative View)
const ClassCard = ({ classData }: any) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const yearly = classData.yearly;
  const hasMultipleMonths = classData.monthly.length > 1;

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{
        mb: 2,
        transition: "all 0.2s",
        "&:hover": {
          boxShadow: theme.shadows[4],
        },
        "&:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          "&:hover": {
            bgcolor: alpha(theme.palette.primary.main, 0.04),
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%", pr: 2 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <SchoolIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              {classData.class.replace("_", " ")}
            </Typography>
            <Chip
              icon={<StudentsIcon />}
              label={`${classData.monthly[0]?.studentCount || 0} Students`}
              size="small"
              variant="outlined"
            />
            {hasMultipleMonths && (
              <Chip
                label={`${classData.monthly.length} Months`}
                size="small"
                color="info"
                variant="outlined"
              />
            )}
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <Typography variant="body2" color="text.secondary">
              Total: <strong>{formatCurrency(yearly.totalAmount)}</strong>
            </Typography>
            <Typography variant="body2" color="success.main">
              Paid: <strong>{formatCurrency(yearly.totalPaid)}</strong>
            </Typography>
            <Typography
              variant="body2"
              color={yearly.totalDue > 0 ? "error.main" : "text.secondary"}
            >
              Due: <strong>{formatCurrency(yearly.totalDue)}</strong>
            </Typography>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ bgcolor: alpha(theme.palette.background.paper, 0.6) }}
        >
          <Table size="small">
            <TableHead>
              <TableRow
                sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}
              >
                <TableCell>Month</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Paid</TableCell>
                <TableCell align="right">Due</TableCell>
                <TableCell align="right">Discount</TableCell>
                <TableCell align="center">Students</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classData.monthly.map((monthData: any, idx: number) => (
                <TableRow
                  key={idx}
                  sx={{
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  <TableCell>
                    <Typography fontWeight={500}>{monthData.month}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(monthData.totalAmount)}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "success.main" }}>
                    {formatCurrency(monthData.totalPaid)}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: monthData.totalDue > 0 ? "error.main" : "inherit",
                    }}
                  >
                    {formatCurrency(monthData.totalDue)}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "warning.main" }}>
                    {formatCurrency(monthData.totalDiscount)}
                  </TableCell>
                  <TableCell align="center">{monthData.studentCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default function ClassWiseFeeSummary() {
  const { data, isLoading, error } = useGetClassWiseFeeSummaryQuery({});
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const theme = useTheme();

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Skeleton
            variant="rectangular"
            height={120}
            sx={{ borderRadius: 2 }}
          />
        </Box>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((i) => (
            <Grid size={{ xs: 12, md: 6 }} key={i}>
              <Skeleton
                variant="rectangular"
                height={300}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography color="error">
            Error loading fee summary. Please try again later.
          </Typography>
        </Paper>
      </Container>
    );
  }

  const summaryData = data?.data;
  const classes = summaryData?.classes || [];
  const grandTotal = summaryData?.grandTotal;
  const academicYear = summaryData?.academicYear;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
          borderRadius: 3,
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
              Academic Year
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {academicYear}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Class-wise Fee Collection Summary
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Table View">
              <IconButton
                onClick={() => setViewMode("table")}
                sx={{
                  bgcolor:
                    viewMode === "table"
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                <TableIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Card View">
              <IconButton
                onClick={() => setViewMode("grid")}
                sx={{
                  bgcolor:
                    viewMode === "grid"
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                <GridViewIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Paper>

      {/* Grand Total Stats */}
      {grandTotal && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <StatCard
              title="Total Amount"
              value={formatCurrency(grandTotal.totalAmount)}
              icon={<MoneyIcon />}
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <StatCard
              title="Total Paid"
              value={formatCurrency(grandTotal.totalPaid)}
              icon={<PaidIcon />}
              color={theme.palette.success.main}
              subtitle={`${((grandTotal.totalPaid / grandTotal.totalAmount) * 100).toFixed(1)}% Collection`}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <StatCard
              title="Total Due"
              value={formatCurrency(grandTotal.totalDue)}
              icon={<DueIcon />}
              color={theme.palette.error.main}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <StatCard
              title="Total Discount"
              value={formatCurrency(grandTotal.totalDiscount)}
              icon={<DiscountIcon />}
              color={theme.palette.warning.main}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <StatCard
              title="Total Students"
              value={classes.reduce(
                (acc: number, cls: any) =>
                  acc + (cls.monthly[0]?.studentCount || 0),
                0,
              )}
              icon={<StudentsIcon />}
              color={theme.palette.info.main}
            />
          </Grid>
        </Grid>
      )}

      {/* Classes Section */}
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
      >
        <SchoolIcon color="primary" />
        Class-wise Breakdown
      </Typography>

      {viewMode === "table" ? (
        // Table View for Monthly Data per Class
        classes.map((classItem: any, idx: number) => (
          <Paper key={idx} sx={{ mb: 4, borderRadius: 2, overflow: "hidden" }}>
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
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <SchoolIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold">
                    {classItem.class.replace("_", " ")}
                  </Typography>
                  <Chip
                    label={`${classItem.monthly[0]?.studentCount || 0} Students`}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant="body2">
                    Yearly Total:{" "}
                    <strong>
                      {formatCurrency(classItem.yearly.totalAmount)}
                    </strong>
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    Paid: {formatCurrency(classItem.yearly.totalPaid)}
                  </Typography>
                  <Typography variant="body2" color="error.main">
                    Due: {formatCurrency(classItem.yearly.totalDue)}
                  </Typography>
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
                    <TableCell align="right">Total Discount</TableCell>
                    <TableCell align="center">Students / Fees</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classItem.monthly.map((monthData: any, monthIdx: number) => (
                    <MonthlyFeeRow
                      key={monthIdx}
                      month={monthData.month}
                      data={monthData}
                      isEven={monthIdx % 2 === 0}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))
      ) : (
        // Grid/Card View
        <Grid container spacing={3}>
          {classes.map((classItem: any, idx: number) => (
            <Grid size={{ xs: 12, md: 6 }} key={idx}>
              <ClassCard classData={classItem} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Footer Note */}
      <Paper
        variant="outlined"
        sx={{
          mt: 4,
          p: 2,
          textAlign: "center",
          bgcolor: alpha(theme.palette.info.main, 0.05),
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: alpha(theme.palette.info.main, 0.1),
          },
        }}
      >
        <Typography variant="caption" color="text.secondary">
          * This summary includes all fee collections, discounts, and waivers
          for the academic year {academicYear}. Monthly breakdown shows detailed
          fee collection per month.
        </Typography>
      </Paper>
    </Container>
  );
}
