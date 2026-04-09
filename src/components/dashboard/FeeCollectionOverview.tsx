/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FeeCollectionOverviewProps } from "@/interface/fees";
import { formatCurrency } from "@/utils/formaters";
import {
  Assessment,
  AttachMoney,
  CalendarMonth,
  Discount as DiscountIcon,
  MoneyOff,
  Receipt,
  School,
  TrendingUp,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Chip,
  Fade,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import FeeSummaryCard from "../common/dashboard/FeeSummaryCard";

export const FeeCollectionOverview = ({
  feeSummaryData,
  isLoading = false,
}: FeeCollectionOverviewProps) => {
  const theme = useTheme();

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

  // Calculate rates
  const collectionRate =
    grandTotal.totalAmount > 0
      ? ((grandTotal.totalPaid / grandTotal.totalAmount) * 100).toFixed(1)
      : "0";
  const discountRate =
    grandTotal.totalAmount > 0
      ? ((grandTotal.totalDiscount / grandTotal.totalAmount) * 100).toFixed(1)
      : "0";
  const duePercentage =
    grandTotal.totalAmount > 0
      ? ((grandTotal.totalDue / grandTotal.totalAmount) * 100).toFixed(1)
      : "0";

  // Create stat cards data array for StatCard component
  const feeStatCards = [
    {
      title: "CURRENT MONTH",
      value: formatCurrency(currentMonthTotal.totalPaid),
      icon: <CalendarMonth />,
      color: theme.palette.info.main,
      subtitle: `Target: ${formatCurrency(currentMonthTotal.totalAmount)}`,
      variant: "default" as const,
    },
    {
      title: "YEARLY COLLECTION",
      value: formatCurrency(yearlyTotal.totalPaid),
      icon: <Receipt />,
      color: theme.palette.success.main,
      subtitle: `Total: ${formatCurrency(yearlyTotal.totalAmount)}`,
      variant: "default" as const,
    },
    {
      title: "GRAND TOTAL",
      value: formatCurrency(grandTotal.totalPaid),
      icon: <AttachMoney />,
      color: theme.palette.primary.main,
      subtitle: `Overall: ${formatCurrency(grandTotal.totalAmount)}`,
      variant: "default" as const,
    },
    {
      title: "TOTAL DUE",
      value: formatCurrency(grandTotal.totalDue),
      icon: <MoneyOff sx={{ fontSize: 28 }} />,
      color: theme.palette.error.main,
      subtitle: `${duePercentage}% of total`,
      variant: "default" as const,
    },
    {
      title: "TOTAL DISCOUNT",
      value: formatCurrency(grandTotal.totalDiscount),
      icon: <DiscountIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.warning.main,
      subtitle: `${discountRate}% of total`,
      variant: "default" as const,
    },
    {
      title: "COLLECTION RATE",
      value: `${collectionRate}%`,
      icon: <TrendingUp sx={{ fontSize: 28 }} />,
      color: theme.palette.success.main,
      subtitle: `${formatCurrency(grandTotal.totalPaid)} collected`,
      variant: "default" as const,
    },
    {
      title: "TOTAL CLASSES",
      value: feeSummaryData?.classes?.length || 0,
      icon: <School sx={{ fontSize: 28 }} />,
      color: theme.palette.info.main,
      subtitle: "Active classes",
      variant: "default" as const,
    },
    {
      title: "DISCOUNT RATE",
      value: `${discountRate}%`,
      icon: <DiscountIcon sx={{ fontSize: 28 }} />,
      color: theme.palette.warning.main,
      subtitle: `${formatCurrency(grandTotal.totalDiscount)} given`,
      variant: "default" as const,
    },
  ];

  return (
    <Fade in timeout={500}>
      <Box>
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
          <Grid container spacing={2}>
            {feeStatCards.map((card, index) => (
              <Grid item xs={6} sm={4} md={3} lg={3} key={`fee-${index}`}>
                <FeeSummaryCard
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  color={card.color}
                  subtitle={card.subtitle}
                  variant={card.variant}
                  loading={isLoading}
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
