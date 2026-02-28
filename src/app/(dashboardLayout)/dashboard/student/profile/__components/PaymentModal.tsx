/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePayFeeMutation } from "@/redux/api/feesApi";
import {
  AccountBalance,
  AttachMoney,
  CheckCircle,
  Close,
  CreditCard,
  Smartphone,
  Warning,
  Info,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
  Alert,
  Chip,
  Divider,
  alpha,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  fee: any;
  onPaymentSuccess: (paymentData: any) => void;
}

const PaymentModal = ({
  open,
  onClose,
  fee,
  onPaymentSuccess,
}: PaymentModalProps) => {
  const theme = useTheme();
  const [payFee, { isLoading }] = usePayFeeMutation();

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amount, setAmount] = useState(fee?.dueAmount || 0);
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [transactionId, setTransactionId] = useState("");
  const [receiptNo, setReceiptNo] = useState(`RCP-${Date.now()}`);
  const [includeLateFee, setIncludeLateFee] = useState(false);
  const [lateFeeBreakdown, setLateFeeBreakdown] = useState<any[]>([]);

  useEffect(() => {
    if (fee) {
      setAmount(fee.dueAmount || 0);
      setTransactionId("");
      setReceiptNo(`RCP-${Date.now()}`);

      // Check if this fee has associated late fees
      if (fee.lateFeeAmount > 0) {
        setIncludeLateFee(true);
        // You might want to fetch late fee breakdown here
      }
    }
  }, [fee]);

  // Calculate totals including late fees
  const calculateTotals = () => {
    const regularDue = fee?.dueAmount || 0;
    const lateFee = includeLateFee ? (fee?.lateFeeAmount || 0) : 0;
    const totalPayable = regularDue + lateFee;

    return {
      regularDue,
      lateFee,
      totalPayable,
    };
  };

  const totals = calculateTotals();

  const handlePaymentSubmit = async () => {
    if (!fee?._id) {
      toast.error("Fee information not found");
      return;
    }

    if (amount <= 0) {
      toast.error("Payment amount must be greater than 0");
      return;
    }

    if (amount > totals.totalPayable) {
      toast.error("Payment amount cannot exceed total payable");
      return;
    }

    try {
      const paymentData = {
        feeId: fee._id,
        amountPaid: amount,
        paymentMethod: paymentMethod === "mobile" ? "bkash" : paymentMethod,
        transactionId: transactionId || `TXN-${Date.now()}`,
        receiptNo: receiptNo || `RCP-${Date.now()}`,
        note: `Payment for ${fee.feeType} - ${fee.month}`,
        includeLateFee,
        lateFeePaid: includeLateFee ? Math.min(amount, fee.lateFeeAmount) : 0,
      };

      const result = await payFee(paymentData).unwrap();

      if (result.success) {
        toast.success(
          <Box>
            <Typography variant="body1" fontWeight="bold">
              Payment Successful!
            </Typography>
            <Typography variant="body2">
              {includeLateFee && fee.lateFeeAmount > 0 &&
                `Late Fee: ৳${Math.min(amount, fee.lateFeeAmount).toLocaleString()} • `}
              Receipt: {receiptNo}
            </Typography>
          </Box>,
          {
            duration: 5000,
            icon: "✅",
          }
        );

        onPaymentSuccess({
          ...result.data,
          feeId: fee._id,
          originalFee: fee,
          lateFeePaid: includeLateFee ? Math.min(amount, fee.lateFeeAmount) : 0,
        });

        onClose();
      } else {
        toast.error(result.message || "Payment failed");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(
        error?.data?.message ||
        error?.message ||
        "Failed to process payment. Please try again."
      );
    }
  };

  const paymentMethods = [
    {
      value: "cash",
      label: "Cash Payment",
      icon: <AttachMoney />,
      color: "success",
    },
    {
      value: "card",
      label: "Credit/Debit Card",
      icon: <CreditCard />,
      color: "primary",
    },
    {
      value: "bank",
      label: "Bank Transfer",
      icon: <AccountBalance />,
      color: "info",
    },
    {
      value: "mobile",
      label: "Mobile Banking (bKash/Nagad)",
      icon: <Smartphone />,
      color: "secondary",
    },
  ];

  // Check if fee is overdue
  const isOverdue = () => {
    if (!fee?.dueDate) return false;
    const dueDate = new Date(fee.dueDate);
    const today = new Date();
    return dueDate < today && fee.status !== 'paid';
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper
        sx={{
          width: "90%",
          maxWidth: 600,
          borderRadius: 2,
          boxShadow: theme.shadows[10],
          overflow: "hidden",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            background: `linear-gradient(135deg, #1976d2 0%, #115293 100%)`,
            color: "white",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Payment Processing
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {fee?.feeType} - {fee?.month}
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Overdue Warning */}
          {isOverdue() && (
            <Alert
              severity="warning"
              icon={<Warning />}
              sx={{ mb: 3 }}
            >
              <Typography variant="body2" fontWeight="bold">
                This fee is overdue!
              </Typography>
              <Typography variant="caption">
                Due Date: {fee?.dueDate ? new Date(fee.dueDate).toLocaleDateString() : 'N/A'}
              </Typography>
            </Alert>
          )}

          {/* Late Fee Alert */}
          {fee?.lateFeeAmount > 0 && (
            <Alert
              severity="info"
              icon={<Info />}
              sx={{ mb: 3 }}
              action={
                <Chip
                  label={`Late Fee: ৳${fee.lateFeeAmount.toLocaleString()}`}
                  color="error"
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              }
            >
              <Typography variant="body2">
                This fee has accumulated late charges
              </Typography>
            </Alert>
          )}

          {/* Payment Details Table */}
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell align="right"><strong>Amount (৳)</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Fee Type</TableCell>
                  <TableCell align="right">{fee?.feeType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell align="right">{fee?.month}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Class</TableCell>
                  <TableCell align="right">{fee?.class}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Original Amount</TableCell>
                  <TableCell align="right">৳{fee?.amount?.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Discount/Waiver</TableCell>
                  <TableCell align="right" sx={{ color: "error.main" }}>
                    -৳{((fee?.discount || 0) + (fee?.waiver || 0)).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Net Amount</TableCell>
                  <TableCell align="right">
                    ৳{((fee?.amount || 0) - (fee?.discount || 0) - (fee?.waiver || 0)).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Previously Paid</TableCell>
                  <TableCell align="right" sx={{ color: "success.main" }}>
                    ৳{fee?.paidAmount?.toLocaleString()}
                  </TableCell>
                </TableRow>

                {/* Late Fee Row */}
                {fee?.lateFeeAmount > 0 && (
                  <TableRow sx={{ backgroundColor: alpha(theme.palette.warning.light, 0.1) }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Warning fontSize="small" color="warning" />
                        <strong>Late Fee</strong>
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ color: "warning.main", fontWeight: "bold" }}>
                      + ৳{fee.lateFeeAmount?.toLocaleString()}
                    </TableCell>
                  </TableRow>
                )}

                <TableRow>
                  <TableCell><strong>Current Due</strong></TableCell>
                  <TableCell align="right" sx={{ color: "error.main", fontWeight: "bold" }}>
                    ৳{totals.regularDue?.toLocaleString()}
                  </TableCell>
                </TableRow>

                {fee?.lateFeeAmount > 0 && (
                  <TableRow>
                    <TableCell><strong>Total Payable (with late fee)</strong></TableCell>
                    <TableCell align="right" sx={{ color: "error.main", fontWeight: "bold", fontSize: '1.1rem' }}>
                      ৳{totals.totalPayable?.toLocaleString()}
                    </TableCell>
                  </TableRow>
                )}

                <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
                  <TableCell>
                    <strong>Amount to Pay</strong>
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      size="small"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">৳</InputAdornment>
                        ),
                      }}
                      sx={{ maxWidth: 150 }}
                      error={amount > totals.totalPayable}
                      helperText={
                        amount > totals.totalPayable
                          ? "Cannot exceed total payable"
                          : ""
                      }
                      inputProps={{
                        max: totals.totalPayable,
                        min: 0,
                        step: 1,
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Payment Method Selection */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Payment Method</InputLabel>
            <Select
              size="small"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              label="Payment Method"
            >
              {paymentMethods.map((method) => (
                <MenuItem key={method.value} value={method.value}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {method.icon}
                    <Typography variant="body2">{method.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Transaction ID for non-cash payments */}
          {paymentMethod !== "cash" && (
            <TextField
              fullWidth
              size="small"
              label="Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              sx={{ mb: 2 }}
              placeholder="Enter transaction ID"
              required
            />
          )}

          <TextField
            fullWidth
            size="small"
            label="Receipt No"
            value={receiptNo}
            onChange={(e) => setReceiptNo(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            size="small"
            label="Payment Date"
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          {/* Payment Summary */}
          {amount > 0 && (
            <Box sx={{ mt: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
              <Typography variant="body2" gutterBottom fontWeight="bold">
                Payment Summary:
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Regular Due:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" align="right" display="block">
                    ৳{totals.regularDue.toLocaleString()}
                  </Typography>
                </Grid>

                {fee?.lateFeeAmount > 0 && includeLateFee && (
                  <>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Late Fee:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" align="right" display="block" color="warning.main">
                        + ৳{fee.lateFeeAmount.toLocaleString()}
                      </Typography>
                    </Grid>
                  </>
                )}

                <Grid item xs={12}>
                  <Divider sx={{ my: 0.5 }} />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight="bold">
                    Paying:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight="bold" align="right" color="primary">
                    ৳{amount.toLocaleString()}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight="bold">
                    Remaining Due:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    align="right"
                    color={totals.totalPayable - amount > 0 ? "error" : "success"}
                  >
                    ৳{(totals.totalPayable - amount).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 3 }}>
            <Button variant="outlined" onClick={onClose} startIcon={<Close />} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handlePaymentSubmit}
              startIcon={<CheckCircle />}
              disabled={isLoading || amount <= 0 || amount > totals.totalPayable}
              sx={{
                background: `linear-gradient(135deg, #1976d2 0%, #115293 100%)`,
                "&:hover": {
                  background: `linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)`,
                },
                minWidth: 180,
              }}
            >
              {isLoading ? "Processing..." : `Pay ৳${amount.toLocaleString()}`}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default PaymentModal;