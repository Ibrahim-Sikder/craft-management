// components/DiscountSummaryModal.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AttachMoney,
  CalendarMonth,
  Close,
  Discount,
  Person,
  School,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

interface DiscountSummaryModalProps {
  open: boolean;
  onClose: () => void;
  student: any;
  fees: any[];
}

const DiscountSummaryModal: React.FC<DiscountSummaryModalProps> = ({
  open,
  onClose,
  student,
  fees,
}) => {
  const theme = useTheme();

  // Filter fees that have discounts
  const discountedFees =
    fees?.filter(
      (fee) =>
        fee.discount > 0 ||
        fee.waiver > 0 ||
        fee.lateFeeCustomizations?.length > 0,
    ) || [];

  // Calculate total discounts
  const totalDiscounts = discountedFees.reduce(
    (sum, fee) => sum + (fee.discount || 0) + (fee.waiver || 0),
    0,
  );

  const totalLateFeeDiscounts = discountedFees.reduce((sum, fee) => {
    const lateFeeDiscounts =
      fee.lateFeeCustomizations?.reduce(
        (acc: number, cust: any) =>
          acc +
          (cust.newAmount < cust.previousAmount
            ? cust.previousAmount - cust.newAmount
            : 0),
        0,
      ) || 0;
    return sum + lateFeeDiscounts;
  }, 0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
          backdropFilter: "blur(10px)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          pb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Discount sx={{ color: theme.palette.success.main, fontSize: 28 }} />
          <Typography variant="h5" fontWeight="bold">
            Discount Summary
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {/* Student Info Card */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.info.main, 0.05)} 100%)`,
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Person color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Student Name
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {student?.name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <School color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Student ID
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {student?.studentId}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AttachMoney color="success" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Total Discounts
                  </Typography>
                  <Typography
                    variant="h6"
                    color="success.main"
                    fontWeight="bold"
                  >
                    ৳{(totalDiscounts + totalLateFeeDiscounts).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Chip
                label={`${discountedFees.length} Discounted Fees`}
                color="success"
                size="small"
                sx={{ mt: 1 }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Discounts Table */}
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2, overflow: "hidden" }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
              >
                <TableCell>
                  <strong>Month</strong>
                </TableCell>
                <TableCell>
                  <strong>Fee Type</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Original Amount</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Discount</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Waiver</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Late Fee Discount</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Net Amount</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {discountedFees.map((fee, index) => {
                const lateFeeDiscounts =
                  fee.lateFeeCustomizations?.reduce(
                    (acc: number, cust: any) =>
                      acc +
                      (cust.newAmount < cust.previousAmount
                        ? cust.previousAmount - cust.newAmount
                        : 0),
                    0,
                  ) || 0;

                const netAmount =
                  fee.amount -
                  (fee.discount || 0) -
                  (fee.waiver || 0) -
                  lateFeeDiscounts;

                return (
                  <TableRow
                    key={fee._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      bgcolor:
                        index % 2 === 0
                          ? "inherit"
                          : alpha(theme.palette.action.hover, 0.3),
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <CalendarMonth fontSize="small" color="action" />
                        {fee.month}
                      </Box>
                    </TableCell>
                    <TableCell>{fee.feeType}</TableCell>
                    <TableCell align="right">
                      ৳{fee.amount?.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {fee.discount > 0 ? (
                        <Chip
                          label={`-৳${fee.discount.toLocaleString()}`}
                          size="small"
                          color="warning"
                          sx={{ fontWeight: "bold" }}
                        />
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {fee.waiver > 0 ? (
                        <Chip
                          label={`-৳${fee.waiver.toLocaleString()}`}
                          size="small"
                          color="info"
                          sx={{ fontWeight: "bold" }}
                        />
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {lateFeeDiscounts > 0 ? (
                        <Chip
                          label={`-৳${lateFeeDiscounts.toLocaleString()}`}
                          size="small"
                          color="secondary"
                          sx={{ fontWeight: "bold" }}
                        />
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      ৳{netAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={fee.status}
                        size="small"
                        color={
                          fee.status === "paid"
                            ? "success"
                            : fee.status === "partial"
                              ? "warning"
                              : "error"
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              {discountedFees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No discounted fees found for this student
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Summary Footer */}
        {discountedFees.length > 0 && (
          <Paper
            sx={{
              mt: 3,
              p: 2,
              bgcolor: alpha(theme.palette.success.main, 0.05),
              borderRadius: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Total Original Amount
                </Typography>
                <Typography variant="h6">
                  ৳
                  {discountedFees
                    .reduce((sum, f) => sum + f.amount, 0)
                    .toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Total Discounts
                </Typography>
                <Typography variant="h6" color="warning.main">
                  - ৳{totalDiscounts.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Total Waivers
                </Typography>
                <Typography variant="h6" color="info.main">
                  - ৳
                  {discountedFees
                    .reduce((sum, f) => sum + (f.waiver || 0), 0)
                    .toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Total Late Fee Discounts
                </Typography>
                <Typography variant="h6" color="secondary.main">
                  - ৳{totalLateFeeDiscounts.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DiscountSummaryModal;
