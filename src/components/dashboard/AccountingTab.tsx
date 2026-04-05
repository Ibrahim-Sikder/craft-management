/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  AccountBalanceWallet,
  AccountCircle,
  AccountTree,
  AttachMoney,
  Balance,
  CreditCard,
  DateRange,
  Download,
  ExpandMore,
  MoneyOff,
  Receipt,
  Savings,
  ShowChart,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AccountingCard } from "./AccountingCard";
import { CashFlowSummary } from "./CashFlowSummary";
import { EquationCheck } from "./EquationCheck";
import { FinancialHealthMeter } from "./FinancialHealthMeter";

const GradientTypography = ({ variant, children, gradient, sx = {} }: any) => {
  const theme = useTheme();
  const gradientColors =
    gradient ||
    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;
  return (
    <Typography
      variant={variant}
      sx={{
        background: gradientColors,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
        display: "inline-block",
        fontWeight: 700,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export const AccountingTab = ({
  accountingStats,
  accountingLoading,
  onCardClick,
}: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery("(max-width:380px)");

  if (!accountingStats) return null;

  return (
    <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          mb: { xs: 2, sm: 2.5, md: 3 },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1.5, sm: 0 },
        }}
      >
        <GradientTypography
          variant="h4"
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
          }}
        >
          <AccountBalanceWallet
            sx={{
              mr: 1.5,
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
            }}
          />
          Accounting Overview
        </GradientTypography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            startIcon={<DateRange />}
            sx={{
              mr: { xs: 0, sm: 0 },
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.75, sm: 1 },
              fontSize: { xs: "0.7rem", sm: "0.875rem" },
              minWidth: { xs: "auto", sm: "auto" },
            }}
            size="small"
            variant="outlined"
          >
            {isExtraSmall ? (
              <DateRange sx={{ fontSize: "0.9rem" }} />
            ) : isMobile ? (
              "Filter"
            ) : (
              "Date Filter"
            )}
          </Button>
          <Button
            startIcon={<Download />}
            sx={{
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.75, sm: 1 },
              fontSize: { xs: "0.7rem", sm: "0.875rem" },
              minWidth: { xs: "auto", sm: "auto" },
            }}
            size="small"
            variant="outlined"
          >
            {isExtraSmall ? (
              <Download sx={{ fontSize: "0.9rem" }} />
            ) : isMobile ? (
              "Export"
            ) : (
              "Export Report"
            )}
          </Button>
        </Box>
      </Box>

      {/* Equation Check */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <EquationCheck
          assets={accountingStats.equationAssets}
          liabilities={accountingStats.equationLiabilities}
          equity={accountingStats.equationEquity}
          isValid={accountingStats.equationValid}
          loading={accountingLoading}
        />
      </Box>

      {/* Financial Summary Cards - 2 per row on mobile */}
      <Grid
        container
        spacing={{ xs: 1.5, sm: 2, md: 3 }}
        sx={{ mb: { xs: 2, sm: 3 } }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <AccountingCard
            title="Total Income"
            value={`৳${accountingStats.totalIncome?.toLocaleString()}`}
            icon={<TrendingUp />}
            color={theme.palette.success.main}
            subValue={`৳${accountingStats.breakdown.totalAdmissionFee?.toLocaleString()}`}
            subTitle="From Admissions"
            loading={accountingLoading}
            onClick={() => onCardClick?.("income")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountingCard
            title="Total Expenses"
            value={`৳${accountingStats.totalExpense?.toLocaleString()}`}
            icon={<TrendingDown />}
            color={theme.palette.error.main}
            subValue={`৳${accountingStats.breakdown.totalSalary?.toLocaleString()}`}
            subTitle="In Salaries"
            loading={accountingLoading}
            onClick={() => onCardClick?.("expenses")}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AccountingCard
            title="Net Profit"
            value={`৳${accountingStats.netProfit?.toLocaleString()}`}
            icon={<ShowChart />}
            color={theme.palette.info.main}
            subValue={`${Math.round((accountingStats.netProfit / accountingStats.totalIncome) * 100)}%`}
            subTitle="Profit Margin"
            loading={accountingLoading}
            onClick={() => onCardClick?.("profit")}
          />
        </Grid>
      </Grid>

      {/* Financial Health and Cash Flow */}
      <Grid
        container
        spacing={{ xs: 1.5, sm: 2, md: 3 }}
        sx={{ mb: { xs: 2, sm: 3 } }}
      >
        <Grid item xs={12} md={6}>
          <FinancialHealthMeter
            income={accountingStats.totalIncome}
            expenses={accountingStats.totalExpense}
            profit={accountingStats.netProfit}
            loading={accountingLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CashFlowSummary
            income={accountingStats.totalIncome}
            expenses={accountingStats.totalExpense}
            breakdown={accountingStats.breakdown}
            loading={accountingLoading}
          />
        </Grid>
      </Grid>

      {/* Assets, Liabilities, Equity - 2 per row on mobile */}
      <Grid
        container
        spacing={{ xs: 1.5, sm: 2, md: 3 }}
        sx={{ mb: { xs: 2, sm: 3 } }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <AccountingCard
            title="Total Assets"
            value={`৳${accountingStats.assets?.toLocaleString()}`}
            icon={<Savings />}
            color={theme.palette.primary.main}
            subValue={`৳${accountingStats.details.assets?.investments?.toLocaleString()}`}
            subTitle="In Investments"
            loading={accountingLoading}
            onClick={() => onCardClick?.("assets")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountingCard
            title="Total Liabilities"
            value={`৳${accountingStats.liabilities?.toLocaleString()}`}
            icon={<CreditCard />}
            color={theme.palette.warning.main}
            subValue={`৳${accountingStats.breakdown.outstandingTakenLoans?.toLocaleString()}`}
            subTitle="Outstanding Loans"
            loading={accountingLoading}
            onClick={() => onCardClick?.("liabilities")}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AccountingCard
            title="Total Equity"
            value={`৳${accountingStats.equity?.toLocaleString()}`}
            icon={<AccountCircle />}
            color={theme.palette.secondary.main}
            subValue={`৳${accountingStats.details.equity?.capital?.toLocaleString()}`}
            subTitle="Capital"
            loading={accountingLoading}
            onClick={() => onCardClick?.("equity")}
          />
        </Grid>
      </Grid>

      {/* Detailed Breakdown Accordion */}
      <Accordion
        sx={{
          mb: { xs: 2, sm: 3 },
          borderRadius: { xs: 2, sm: 3 },
          overflow: "hidden",
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          "&:before": { display: "none" },
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{
            px: { xs: 1.5, sm: 2, md: 3 },
            py: { xs: 1, sm: 1.5 },
            minHeight: { xs: 48, sm: 64 },
            "& .MuiAccordionSummary-content": {
              my: { xs: 0.5, sm: 1 },
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Receipt
              sx={{
                mr: 1.5,
                color: "primary.main",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.25rem" },
                fontWeight: 600,
              }}
            >
              Detailed Financial Breakdown
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {/* Income Details */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: { xs: 1.5, sm: 2 },
                  display: "flex",
                  alignItems: "center",
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                  fontWeight: 600,
                }}
              >
                <AttachMoney
                  sx={{
                    mr: 1,
                    color: "success.main",
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                />
                Income Details
              </Typography>
              <TableContainer
                sx={{
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  overflowX: "auto",
                }}
              >
                <Table size="small">
                  <TableBody>
                    <TableRow hover>
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontWeight: 500,
                        }}
                      >
                        Total Admission Fees
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      >
                        ৳
                        {accountingStats.breakdown.totalAdmissionFee?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontWeight: 500,
                        }}
                      >
                        Other Income
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      >
                        ৳
                        {(
                          accountingStats.totalIncome -
                          accountingStats.breakdown.totalAdmissionFee
                        )?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        bgcolor: "action.hover",
                      }}
                    >
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontWeight: "bold",
                          fontSize: { xs: "0.75rem", sm: "0.9rem" },
                        }}
                      >
                        <strong>Total Income</strong>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontWeight: "bold",
                          fontSize: { xs: "0.75rem", sm: "0.9rem" },
                          fontFamily: "monospace",
                        }}
                      >
                        <strong>
                          ৳{accountingStats.totalIncome?.toLocaleString()}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* Expense Details */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: { xs: 1.5, sm: 2 },
                  display: "flex",
                  alignItems: "center",
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                  fontWeight: 600,
                }}
              >
                <MoneyOff
                  sx={{
                    mr: 1,
                    color: "error.main",
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                />
                Expense Details
              </Typography>
              <TableContainer
                sx={{
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  overflowX: "auto",
                }}
              >
                <Table size="small">
                  <TableBody>
                    <TableRow hover>
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontWeight: 500,
                        }}
                      >
                        Salaries
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      >
                        ৳
                        {accountingStats.breakdown.totalSalary?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontWeight: 500,
                        }}
                      >
                        Other Expenses
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      >
                        ৳
                        {(
                          accountingStats.totalExpense -
                          accountingStats.breakdown.totalSalary
                        )?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        bgcolor: "action.hover",
                      }}
                    >
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontWeight: "bold",
                          fontSize: { xs: "0.75rem", sm: "0.9rem" },
                        }}
                      >
                        <strong>Total Expenses</strong>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontWeight: "bold",
                          fontSize: { xs: "0.75rem", sm: "0.9rem" },
                          fontFamily: "monospace",
                        }}
                      >
                        <strong>
                          ৳{accountingStats.totalExpense?.toLocaleString()}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* Assets Breakdown */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: { xs: 1.5, sm: 2 },
                  display: "flex",
                  alignItems: "center",
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                  fontWeight: 600,
                }}
              >
                <AccountTree
                  sx={{
                    mr: 1,
                    color: "primary.main",
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                />
                Assets Breakdown
              </Typography>
              <TableContainer
                sx={{
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  overflowX: "auto",
                }}
              >
                <Table size="small">
                  <TableBody>
                    <TableRow hover>
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontWeight: 500,
                        }}
                      >
                        Cash
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      >
                        ৳
                        {accountingStats.details.assets?.cash?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontWeight: 500,
                        }}
                      >
                        Accounts Receivable
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      >
                        ৳
                        {accountingStats.details.assets?.accountsReceivable?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontWeight: 500,
                        }}
                      >
                        Investments
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      >
                        ৳
                        {accountingStats.details.assets?.investments?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontWeight: 500,
                        }}
                      >
                        Fixed Assets
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      >
                        ৳
                        {accountingStats.details.assets?.fixedAssets?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        bgcolor: "action.hover",
                      }}
                    >
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontWeight: "bold",
                          fontSize: { xs: "0.75rem", sm: "0.9rem" },
                        }}
                      >
                        <strong>Total Assets</strong>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontWeight: "bold",
                          fontSize: { xs: "0.75rem", sm: "0.9rem" },
                          fontFamily: "monospace",
                        }}
                      >
                        <strong>
                          ৳{accountingStats.assets?.toLocaleString()}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* Liabilities & Equity Breakdown */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: { xs: 1.5, sm: 2 },
                  display: "flex",
                  alignItems: "center",
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                  fontWeight: 600,
                }}
              >
                <Balance
                  sx={{
                    mr: 1,
                    color: "warning.main",
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                />
                Liabilities & Equity
              </Typography>
              <TableContainer
                sx={{
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  overflowX: "auto",
                }}
              >
                <Table size="small">
                  <TableBody>
                    <TableRow hover>
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontWeight: 500,
                        }}
                      >
                        Accounts Payable
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      >
                        ৳
                        {accountingStats.details.liabilities?.accountsPayable?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontWeight: 500,
                        }}
                      >
                        Loans
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      >
                        ৳
                        {accountingStats.details.liabilities?.loans?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontWeight: 500,
                        }}
                      >
                        Other Liabilities
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      >
                        ৳
                        {accountingStats.details.liabilities?.otherLiabilities?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} sx={{ py: { xs: 0.5, sm: 1 } }} />
                    </TableRow>
                    <TableRow hover>
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontWeight: 500,
                        }}
                      >
                        Capital
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      >
                        ৳
                        {accountingStats.details.equity?.capital?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontWeight: 500,
                        }}
                      >
                        Retained Earnings
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      >
                        ৳
                        {accountingStats.details.equity?.retainedEarnings?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        bgcolor: "action.hover",
                      }}
                    >
                      <TableCell
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontWeight: "bold",
                          fontSize: { xs: "0.75rem", sm: "0.9rem" },
                        }}
                      >
                        <strong>Total Liabilities & Equity</strong>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          py: { xs: 0.75, sm: 1.5 },
                          fontWeight: "bold",
                          fontSize: { xs: "0.75rem", sm: "0.9rem" },
                          fontFamily: "monospace",
                        }}
                      >
                        <strong>
                          ৳
                          {(
                            accountingStats.liabilities + accountingStats.equity
                          )?.toLocaleString()}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
