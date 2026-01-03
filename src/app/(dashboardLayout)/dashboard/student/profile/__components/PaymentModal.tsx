/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amount, setAmount] = useState(fee?.dueAmount || 0);
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [transactionId, setTransactionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fee) {
      setAmount(fee.dueAmount || 0);
      setTransactionId("");
    }
  }, [fee]);

  const handlePaymentSubmit = async () => {
    if (amount <= 0 || amount > fee?.dueAmount) {
      return;
    }

    setIsLoading(true);

    try {
      const paymentMethodMap: { [key: string]: string } = {
        cash: "cash",
        card: "card",
        bank: "bank",
        mobile: "bkash",
      };

      const backendPaymentMethod = paymentMethodMap[paymentMethod] || "cash";

      const paymentData = {
        feeId: fee._id,
        amountPaid: amount,
        paymentMethod: backendPaymentMethod,
        paymentDate: new Date(paymentDate),
        transactionId: transactionId || `TXN-${Date.now()}`,
        receiptNo: `RCP-${Date.now()}`,
      };
      const response = await fetch("http://localhost:5000/api/v1/fees/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      const result = await response.json();

      if (result.success) {
        onPaymentSuccess(result.data);
        onClose();
      } else {
        throw new Error(result.message || "Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      // You could show an error message here
    } finally {
      setIsLoading(false);
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
            {/* Left Column - Payment Details */}
            <Grid item xs={12} md={12}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: theme.palette.primary.main }}
              >
                Payment Details
              </Typography>

              {/* Transaction ID and Date */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Transaction ID"
                    value={`TXN-${Date.now()}`}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Date"
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
                        <strong>Amount ($)</strong>
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
                        {fee?.amount?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Previously Paid</TableCell>
                      <TableCell align="right" sx={{ color: "success.main" }}>
                        {fee?.paidAmount?.toLocaleString()}
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
                        {fee?.dueAmount?.toLocaleString()}
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
                                ${" "}
                              </InputAdornment>
                            ),
                          }}
                          sx={{ maxWidth: 120 }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Payment Method Selection - Changed to Select Dropdown */}
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
                      <Typography variant="body2" fontWeight="500">
                        {method.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Transaction ID for mobile banking */}
              {paymentMethod === "mobile" && (
                <TextField
                  fullWidth
                  size="small"
                  label="Transaction ID (Mobile Banking)"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  sx={{ mb: 3 }}
                  placeholder="Enter transaction ID from mobile banking"
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
        </Box>
      </Paper>
    </Modal>
  );
};

export default PaymentModal;
