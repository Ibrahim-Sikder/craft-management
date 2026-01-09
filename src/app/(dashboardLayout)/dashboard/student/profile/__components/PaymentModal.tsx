/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePayFeeMutation } from "@/redux/api/feesApi";
import {
  AccountBalance,
  AttachMoney,
  CheckCircle,
  Close,
  CreditCard,
  Smartphone,
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

  useEffect(() => {
    if (fee) {
      setAmount(fee.dueAmount || 0);
      setTransactionId("");
      setReceiptNo(`RCP-${Date.now()}`);
    }
  }, [fee]);

  const handlePaymentSubmit = async () => {
    if (!fee?._id) {
      toast.error("Fee information not found");
      return;
    }

    if (amount <= 0) {
      toast.error("Payment amount must be greater than 0");
      return;
    }

    if (amount > fee.dueAmount) {
      toast.error("Payment amount cannot exceed due amount");
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
      };

      const result = await payFee(paymentData).unwrap();

      if (result.success) {
        toast.success("Payment processed successfully!", {
          duration: 4000,
          position: "top-right",
        });

        // Call the success callback with the full payment data
        onPaymentSuccess({
          ...result.data,
          feeId: fee._id,
          originalFee: fee,
        });

        onClose();

        // Reset form
        setAmount(fee.dueAmount || 0);
        setTransactionId("");
      } else {
        toast.error(result.message || "Payment failed", {
          duration: 5000,
          position: "top-right",
        });
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to process payment. Please try again.",
        {
          duration: 5000,
          position: "top-right",
        }
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

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper
        sx={{
          width: "90%",
          maxWidth: 500,
          borderRadius: 2,
          boxShadow: theme.shadows[10],
          overflow: "hidden",
        }}
      >
        {/* Header - Craft International Institute */}
        <Box
          sx={{
            p: 3,
            background: `linear-gradient(135deg, #1976d2 0%, #115293 100%)`,
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Craft International Institute
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Payment Processing System
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Payment Details */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: theme.palette.primary.main }}
              >
                Payment Details
              </Typography>

              {/* Receipt and Date */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Receipt No"
                    value={receiptNo}
                    onChange={(e) => setReceiptNo(e.target.value)}
                    placeholder="Enter receipt number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Payment Date"
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>

              {/* Fee Details Table */}
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ mb: 3 }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                      <TableCell>
                        <strong>Description</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>Amount (৳)</strong>
                      </TableCell>
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
                      <TableCell>Total Fee Amount</TableCell>
                      <TableCell align="right">
                        ৳{fee?.amount?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Adjustments</TableCell>
                      <TableCell align="right" sx={{ color: "error.main" }}>
                        -৳
                        {(
                          (fee?.discount || 0) + (fee?.waiver || 0)
                        ).toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Net Amount</TableCell>
                      <TableCell align="right">
                        ৳
                        {(
                          (fee?.amount || 0) -
                          (fee?.discount || 0) -
                          (fee?.waiver || 0)
                        ).toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Previously Paid</TableCell>
                      <TableCell align="right" sx={{ color: "success.main" }}>
                        ৳{fee?.paidAmount?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Due Amount</strong>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "error.main", fontWeight: "bold" }}
                      >
                        ৳{fee?.dueAmount?.toLocaleString()}
                      </TableCell>
                    </TableRow>
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
                              <InputAdornment position="start">
                                ৳
                              </InputAdornment>
                            ),
                          }}
                          sx={{ maxWidth: 150 }}
                          error={amount > fee?.dueAmount}
                          helperText={
                            amount > fee?.dueAmount
                              ? "Cannot exceed due amount"
                              : ""
                          }
                          inputProps={{
                            max: fee?.dueAmount,
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
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="payment-method-label">
                  Select Payment Method
                </InputLabel>
                <Select
                  size="small"
                  labelId="payment-method-label"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  label="Select Payment Method"
                >
                  {paymentMethods.map((method) => (
                    <MenuItem key={method.value} value={method.value}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {method.icon}
                        <Typography variant="body2" fontWeight="500">
                          {method.label}
                        </Typography>
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
                  label={
                    paymentMethod === "mobile"
                      ? "Mobile Banking Transaction ID"
                      : "Transaction ID"
                  }
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  sx={{ mb: 3 }}
                  placeholder={
                    paymentMethod === "mobile"
                      ? "Enter bKash/Nagad transaction ID"
                      : "Enter transaction ID"
                  }
                  required={paymentMethod !== "cash"}
                  helperText={
                    paymentMethod === "mobile"
                      ? "Required for mobile banking payments"
                      : "Required for card/bank payments"
                  }
                />
              )}
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 3 }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              startIcon={<Close />}
              size="large"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handlePaymentSubmit}
              startIcon={<CheckCircle />}
              disabled={isLoading || amount <= 0 || amount > fee?.dueAmount}
              size="large"
              sx={{
                background: `linear-gradient(135deg, #1976d2 0%, #115293 100%)`,
                "&:hover": {
                  background: `linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)`,
                },
                minWidth: 180,
              }}
            >
              {isLoading ? "Processing..." : "Confirm Payment"}
            </Button>
          </Box>

          {/* Additional Information */}
          {fee?.dueAmount > 0 && amount > 0 && (
            <Box sx={{ mt: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Payment Summary:</strong>
                <br />• After this payment, due amount will be: ৳
                {(fee?.dueAmount - amount).toLocaleString()}
                <br />• New status:{" "}
                {fee?.dueAmount - amount === 0 ? "Paid" : "Partial"}
                <br />• Payment method: {paymentMethod}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Modal>
  );
};

export default PaymentModal;
