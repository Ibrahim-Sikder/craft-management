/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  alpha,
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
  Stack,
  Chip,
  Fade,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  CalendarMonth,
  AttachMoney,
  Receipt,
  Assessment,
  MoneyOff,
  Discount as DiscountIcon,
  School,
} from "@mui/icons-material";
import { formatCurrency } from "@/utils/formaters";

// --- REUSABLE CARD COMPONENT ---
// Based on the ClassWiseCard design
interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
  trend?: "up" | "down";
  onClick?: () => void;
}

const MetricCard = ({
  title,
  value,
  icon,
  color,
  subtitle,
  trend,
  onClick,
}: MetricCardProps) => {
  const theme = useTheme();

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(color, 0.08)} 0%, ${alpha(color, 0.02)} 100%)`,
        border: `1px solid ${alpha(color, 0.15)}`,
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "default",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": onClick
          ? {
              transform: "translateY(-4px)",
              boxShadow: `0 8px 20px ${alpha(color, 0.15)}`,
              border: `1px solid ${alpha(color, 0.3)}`,
            }
          : {},
      }}
    >
      {/* Header with Icon and Trend/Label */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 1,
        }}
      >
        <Box sx={{ color: color, fontSize: 28 }}>{icon}</Box>
        <Box>
          {trend === "up" ? (
            <TrendingUp
              sx={{ color: theme.palette.success.main, fontSize: 20 }}
            />
          ) : trend === "down" ? (
            <TrendingDown
              sx={{ color: theme.palette.error.main, fontSize: 20 }}
            />
          ) : (
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: color,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Fees
            </Typography>
          )}
        </Box>
      </Box>

      {/* Title */}
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          mb: 0.5,
          fontSize: "0.9rem",
          color: color,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </Typography>

      {/* Value & Subtitle */}
      <Box sx={{ mt: "auto" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.5rem", sm: "1.75rem" },
            color: color,
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>
        {subtitle && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 0.5 }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

// --- MAIN FEE COLLECTION COMPONENT ---

interface FeeCollectionOverviewProps {
  feeSummaryData?: any;
  isLoading?: boolean;
  classWiseData?: Record<string, number>;
  showClassWise?: boolean;
}

export const FeeCollectionOverview = ({
  feeSummaryData,
  isLoading = false,
}: FeeCollectionOverviewProps) => {
  const theme = useTheme();

  // Calculate current month and yearly totals
  const calculateFeeTotals = () => {
    if (!feeSummaryData?.classes) {
      return {
        currentMonthTotal: {
          totalAmount: 0,
          totalPaid: 0,
          totalDue: 0,
          totalDiscount: 0,
        },
        yearlyTotal: {
          totalAmount: 0,
          totalPaid: 0,
          totalDue: 0,
          totalDiscount: 0,
        },
        grandTotal: {
          totalAmount: 0,
          totalPaid: 0,
          totalDue: 0,
          totalDiscount: 0,
          totalWaiver: 0,
        },
      };
    }

    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    const currentMonthTotal = {
      totalAmount: 0,
      totalPaid: 0,
      totalDue: 0,
      totalDiscount: 0,
    };
    const yearlyTotal = {
      totalAmount: 0,
      totalPaid: 0,
      totalDue: 0,
      totalDiscount: 0,
    };

    feeSummaryData.classes.forEach((classItem: any) => {
      yearlyTotal.totalAmount += classItem.yearly.totalAmount;
      yearlyTotal.totalPaid += classItem.yearly.totalPaid;
      yearlyTotal.totalDue += classItem.yearly.totalDue;
      yearlyTotal.totalDiscount += classItem.yearly.totalDiscount;

      const currentMonthData = classItem.monthly.find(
        (monthData: any) => monthData.month === currentMonth,
      );
      if (currentMonthData) {
        currentMonthTotal.totalAmount += currentMonthData.totalAmount;
        currentMonthTotal.totalPaid += currentMonthData.totalPaid;
        currentMonthTotal.totalDue += currentMonthData.totalDue;
        currentMonthTotal.totalDiscount += currentMonthData.totalDiscount;
      }
    });

    return {
      currentMonthTotal,
      yearlyTotal,
      grandTotal: feeSummaryData.grandTotal || {
        totalAmount: 0,
        totalPaid: 0,
        totalDue: 0,
        totalDiscount: 0,
        totalWaiver: 0,
      },
    };
  };

  const { currentMonthTotal, yearlyTotal, grandTotal } = calculateFeeTotals();

  // Create stat cards data array
  const feeStatCards = [
    {
      title: "CURRENT MONTH",
      value: formatCurrency(currentMonthTotal.totalPaid),
      icon: <CalendarMonth />,
      color: theme.palette.info.main,
      subtitle: `Target: ${formatCurrency(currentMonthTotal.totalAmount)}`,
      trend: "up" as const,
    },
    {
      title: "YEARLY COLLECTION",
      value: formatCurrency(yearlyTotal.totalPaid),
      icon: <Receipt />,
      color: theme.palette.success.main,
      subtitle: `Total: ${formatCurrency(yearlyTotal.totalAmount)}`,
      trend: "up" as const,
    },
    {
      title: "GRAND TOTAL",
      value: formatCurrency(grandTotal.totalPaid),
      icon: <AttachMoney />,
      color: theme.palette.primary.main,
      subtitle: `Overall: ${formatCurrency(grandTotal.totalAmount)}`,
    },
    {
      title: "TOTAL DUE",
      value: formatCurrency(grandTotal.totalDue),
      icon: <MoneyOff sx={{ fontSize: 28 }} />,
      color: theme.palette.error.main,
      subtitle: `${grandTotal.totalAmount > 0 ? ((grandTotal.totalDue / grandTotal.totalAmount) * 100).toFixed(1) : 0}% of total`,
      trend: "down" as const,
    },
    {
      title: "TOTAL DISCOUNT",
      value: formatCurrency(grandTotal.totalDiscount),
      icon: <DiscountIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.warning.main,
      subtitle: `${grandTotal.totalAmount > 0 ? ((grandTotal.totalDiscount / grandTotal.totalAmount) * 100).toFixed(1) : 0}% of total`,
    },
    {
      title: "COLLECTION RATE",
      value: `${grandTotal.totalAmount > 0 ? ((grandTotal.totalPaid / grandTotal.totalAmount) * 100).toFixed(1) : 0}%`,
      icon: <TrendingUp sx={{ fontSize: 28 }} />,
      color: theme.palette.success.main,
      subtitle: `${formatCurrency(grandTotal.totalPaid)} collected`,
      trend: "up" as const,
    },
    {
      title: "TOTAL CLASSES",
      value: feeSummaryData?.classes?.length || 0,
      icon: <School sx={{ fontSize: 28 }} />,
      color: theme.palette.info.main,
      subtitle: "Active classes",
    },
    {
      title: "DISCOUNT RATE",
      value: `${grandTotal.totalAmount > 0 ? ((grandTotal.totalDiscount / grandTotal.totalAmount) * 100).toFixed(1) : 0}%`,
      icon: <DiscountIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.warning.main,
      subtitle: `${formatCurrency(grandTotal.totalDiscount)} given`,
    },
  ];

  return (
    <Fade in timeout={500}>
      <Box>
        {/* Fee Collection Overview Paper */}
        <Paper
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 4,
            bgcolor: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: "blur(10px)",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
            mb: { xs: 3, sm: 4 },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <Assessment
              sx={{ color: theme.palette.primary.main, fontSize: 24 }}
            />
            <Typography variant="h6" fontWeight="bold">
              Fee Collection Overview
            </Typography>
            <Chip
              label={`Year ${feeSummaryData?.academicYear || "2026"}`}
              size="small"
              color="primary"
              sx={{ ml: "auto" }}
            />
          </Stack>

          {/* Main Fee Cards - Using the Reusable MetricCard */}
          <Grid container spacing={2}>
            {isLoading
              ? // Loading Skeleton matching the MetricCard design
                [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <Grid item xs={6} sm={4} md={3} lg={3} key={item}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        borderRadius: 3,
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          height: 24,
                          width: "30%",
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          borderRadius: 1,
                          mb: 1.5,
                        }}
                      />
                      <Box
                        sx={{
                          height: 32,
                          width: "50%",
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          borderRadius: 1,
                          mb: 1,
                        }}
                      />
                      <Box
                        sx={{
                          height: 40,
                          width: "40%",
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          borderRadius: 1,
                        }}
                      />
                    </Box>
                  </Grid>
                ))
              : feeStatCards.map((card, index) => (
                  <Grid item xs={6} sm={4} md={3} lg={3} key={`fee-${index}`}>
                    <MetricCard
                      title={card.title}
                      value={card.value}
                      icon={card.icon}
                      color={card.color}
                      subtitle={card.subtitle}
                      trend={card.trend}
                    />
                  </Grid>
                ))}
          </Grid>
        </Paper>
      </Box>
    </Fade>
  );
};

export default FeeCollectionOverview;
