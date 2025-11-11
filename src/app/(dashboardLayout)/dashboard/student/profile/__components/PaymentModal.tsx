/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Paper,
  Typography,
  useTheme,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputAdornment,
  FormGroup,
  Checkbox,
  Divider,
  Modal,
} from "@mui/material";
import { useState } from "react";
import {
  AttachMoney,
  CreditCard,
  AccountBalance,
  Smartphone,
  CheckCircle,
  Close,
} from "@mui/icons-material";

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
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (month: string) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const handlePaymentSubmit = () => {
    const paymentData = {
      feeId: fee._id,
      amount: amount,
      paymentMethod,
      paymentDate,
      transactionId: transactionId || `TXN-${Date.now()}`,
      selectedMonths,
      status: "completed",
    };
    onPaymentSuccess(paymentData);
    onClose();
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
      label: "Mobile Banking",
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
          maxWidth: 800,
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
            <Grid item xs={12} md={6}>
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
                                $
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

              {/* Payment Method Selection */}
              <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                <FormLabel
                  component="legend"
                  sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}
                >
                  Select Payment Method
                </FormLabel>
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <Grid container spacing={1}>
                    {paymentMethods.map((method) => (
                      <Grid item xs={6} key={method.value}>
                        <Paper
                          sx={{
                            p: 1.5,
                            border: `2px solid ${
                              paymentMethod === method.value
                                ? theme.palette.primary.main
                                : theme.palette.grey[300]
                            }`,
                            borderRadius: 1,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            "&:hover": {
                              borderColor: theme.palette.primary.main,
                            },
                          }}
                          onClick={() => setPaymentMethod(method.value)}
                        >
                          <FormControlLabel
                            value={method.value}
                            control={<Radio size="small" />}
                            label={
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    color: theme.palette.primary.main,
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {method.icon}
                                </Box>
                                <Typography variant="body2" fontWeight="500">
                                  {method.label}
                                </Typography>
                              </Box>
                            }
                            sx={{ width: "100%", m: 0 }}
                          />
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              </FormControl>

              {/* Transaction ID for non-cash payments */}
              {paymentMethod !== "cash" && (
                <TextField
                  fullWidth
                  size="small"
                  label="Transaction Reference"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter transaction ID or reference number"
                  sx={{ mb: 3 }}
                />
              )}
            </Grid>

            {/* Right Column - Month Selection */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: theme.palette.primary.main }}
              >
                Select Months
              </Typography>

              <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel
                    component="legend"
                    sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}
                  >
                    Academic Months ({selectedMonths.length} selected)
                  </FormLabel>
                  <FormGroup>
                    <Grid container spacing={1}>
                      {months.map((month) => (
                        <Grid item xs={6} key={month}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                checked={selectedMonths.includes(month)}
                                onChange={() => handleMonthChange(month)}
                                color="primary"
                              />
                            }
                            label={
                              <Typography variant="body2">{month}</Typography>
                            }
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </FormGroup>
                </FormControl>
              </Paper>

              {/* Selected Months Summary */}
              {selectedMonths.length > 0 && (
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    mb: 3,
                    backgroundColor: theme.palette.success.light,
                    borderColor: theme.palette.success.main,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: theme.palette.success.dark }}
                  >
                    Selected Months:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.success.dark }}
                  >
                    {selectedMonths.join(", ")}
                  </Typography>
                </Paper>
              )}

              {/* Payment Summary */}
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Payment Summary
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Months Selected:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {selectedMonths.length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Amount per Month:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    ${(amount / (selectedMonths.length || 1)).toFixed(2)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" fontWeight="bold">
                    Total Amount:
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    ${amount.toLocaleString()}
                  </Typography>
                </Box>
              </Paper>
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
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handlePaymentSubmit}
              startIcon={<CheckCircle />}
              disabled={
                amount <= 0 ||
                amount > fee?.dueAmount ||
                selectedMonths.length === 0
              }
              size="large"
              sx={{
                background: `linear-gradient(135deg, #1976d2 0%, #115293 100%)`,
                "&:hover": {
                  background: `linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)`,
                },
                minWidth: 180,
              }}
            >
              Confirm Payment
            </Button>
          </Box>

          {/* Contact Information */}
          <Box
            sx={{
              mt: 3,
              pt: 2,
              borderTop: `1px dashed ${theme.palette.divider}`,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              For assistance, contact:
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
              <Typography variant="body2" fontWeight="500">
                +8801830678383
              </Typography>
              <Typography variant="body2" fontWeight="500">
                +8801300726000
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default PaymentModal;
