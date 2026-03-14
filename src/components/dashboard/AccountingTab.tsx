/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Box,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AccountBalanceWallet,
  DateRange,
  Download,
  ExpandMore,
  Receipt,
  AttachMoney,
  MoneyOff,
  AccountTree,
  Balance,
  TrendingUp,
  TrendingDown,
  ShowChart,
  Savings,
  CreditCard,
  AccountCircle,
} from "@mui/icons-material";
import { AccountingCard } from "./AccountingCard";
import { EquationCheck } from "./EquationCheck";
import { FinancialHealthMeter } from "./FinancialHealthMeter";
import { CashFlowSummary } from "./CashFlowSummary";

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

  if (!accountingStats) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <GradientTypography
          variant="h4"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <AccountBalanceWallet sx={{ mr: 1.5 }} />
          Accounting Overview
        </GradientTypography>

        <Box>
          <Button startIcon={<DateRange />} sx={{ mr: 1 }}>
            Date Filter
          </Button>
          <Button startIcon={<Download />}>Export Report</Button>
        </Box>
      </Box>

      {/* Equation Check */}
      <EquationCheck
        assets={accountingStats.equationAssets}
        liabilities={accountingStats.equationLiabilities}
        equity={accountingStats.equationEquity}
        isValid={accountingStats.equationValid}
        loading={accountingLoading}
      />

      {/* Financial Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <AccountingCard
            title="Total Income"
            value={`৳${accountingStats.totalIncome?.toLocaleString()}`}
            icon={<TrendingUp />}
            color={theme.palette.success.main}
            subValue={`৳${accountingStats.breakdown.totalAdmissionFee?.toLocaleString()}`}
            subTitle="From Admissions"
            loading={accountingLoading}
            onClick={() => onCardClick("income")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AccountingCard
            title="Total Expenses"
            value={`৳${accountingStats.totalExpense?.toLocaleString()}`}
            icon={<TrendingDown />}
            color={theme.palette.error.main}
            subValue={`৳${accountingStats.breakdown.totalSalary?.toLocaleString()}`}
            subTitle="In Salaries"
            loading={accountingLoading}
            onClick={() => onCardClick("expenses")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AccountingCard
            title="Net Profit"
            value={`৳${accountingStats.netProfit?.toLocaleString()}`}
            icon={<ShowChart />}
            color={theme.palette.info.main}
            subValue={`${Math.round((accountingStats.netProfit / accountingStats.totalIncome) * 100)}%`}
            subTitle="Profit Margin"
            loading={accountingLoading}
            onClick={() => onCardClick("profit")}
          />
        </Grid>
      </Grid>

      {/* Financial Health and Cash Flow */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
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

      {/* Assets, Liabilities, Equity */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <AccountingCard
            title="Total Assets"
            value={`৳${accountingStats.assets?.toLocaleString()}`}
            icon={<Savings />}
            color={theme.palette.primary.main}
            subValue={`৳${accountingStats.details.assets?.investments?.toLocaleString()}`}
            subTitle="In Investments"
            loading={accountingLoading}
            onClick={() => onCardClick("assets")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AccountingCard
            title="Total Liabilities"
            value={`৳${accountingStats.liabilities?.toLocaleString()}`}
            icon={<CreditCard />}
            color={theme.palette.warning.main}
            subValue={`৳${accountingStats.breakdown.outstandingTakenLoans?.toLocaleString()}`}
            subTitle="Outstanding Loans"
            loading={accountingLoading}
            onClick={() => onCardClick("liabilities")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AccountingCard
            title="Total Equity"
            value={`৳${accountingStats.equity?.toLocaleString()}`}
            icon={<AccountCircle />}
            color={theme.palette.secondary.main}
            subValue={`৳${accountingStats.details.equity?.capital?.toLocaleString()}`}
            subTitle="Capital"
            loading={accountingLoading}
            onClick={() => onCardClick("equity")}
          />
        </Grid>
      </Grid>

      {/* Detailed Breakdown */}
      <Accordion
        sx={{
          mb: 3,
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Receipt sx={{ mr: 1.5, color: "primary.main" }} />
            <Typography variant="h6">Detailed Financial Breakdown</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
              >
                <AttachMoney sx={{ mr: 1, color: "success.main" }} /> Income
                Details
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Total Admission Fees</TableCell>
                      <TableCell align="right">
                        ৳
                        {accountingStats.breakdown.totalAdmissionFee?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Other Income</TableCell>
                      <TableCell align="right">
                        ৳
                        {(
                          accountingStats.totalIncome -
                          accountingStats.breakdown.totalAdmissionFee
                        )?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <strong>Total Income</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>
                          ৳{accountingStats.totalIncome?.toLocaleString()}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
              >
                <MoneyOff sx={{ mr: 1, color: "error.main" }} /> Expense Details
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Salaries</TableCell>
                      <TableCell align="right">
                        ৳
                        {accountingStats.breakdown.totalSalary?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Other Expenses</TableCell>
                      <TableCell align="right">
                        ৳
                        {(
                          accountingStats.totalExpense -
                          accountingStats.breakdown.totalSalary
                        )?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <strong>Total Expenses</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>
                          ৳{accountingStats.totalExpense?.toLocaleString()}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
              >
                <AccountTree sx={{ mr: 1, color: "primary.main" }} /> Assets
                Breakdown
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Cash</TableCell>
                      <TableCell align="right">
                        ৳
                        {accountingStats.details.assets?.cash?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Accounts Receivable</TableCell>
                      <TableCell align="right">
                        ৳
                        {accountingStats.details.assets?.accountsReceivable?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Investments</TableCell>
                      <TableCell align="right">
                        ৳
                        {accountingStats.details.assets?.investments?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fixed Assets</TableCell>
                      <TableCell align="right">
                        ৳
                        {accountingStats.details.assets?.fixedAssets?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <strong>Total Assets</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>
                          ৳{accountingStats.assets?.toLocaleString()}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
              >
                <Balance sx={{ mr: 1, color: "warning.main" }} /> Liabilities &
                Equity
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Accounts Payable</TableCell>
                      <TableCell align="right">
                        ৳
                        {accountingStats.details.liabilities?.accountsPayable?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Loans</TableCell>
                      <TableCell align="right">
                        ৳
                        {accountingStats.details.liabilities?.loans?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Other Liabilities</TableCell>
                      <TableCell align="right">
                        ৳
                        {accountingStats.details.liabilities?.otherLiabilities?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} sx={{ py: 1 }}></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Capital</TableCell>
                      <TableCell align="right">
                        ৳
                        {accountingStats.details.equity?.capital?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Retained Earnings</TableCell>
                      <TableCell align="right">
                        ৳
                        {accountingStats.details.equity?.retainedEarnings?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <strong>Total Liabilities & Equity</strong>
                      </TableCell>
                      <TableCell align="right">
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
