/* eslint-disable @typescript-eslint/no-explicit-any */
import CraftModal from "@/components/Shared/Modal";
import {
  AccountBalance,
  AttachMoney,
  CreditCard,
  Smartphone,
} from "@mui/icons-material";
import {
  Box,
  DialogContent,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const FeeCollectionModal = ({
  open,

  enrollment,
  setOpen,
}: any) => {
  const [paymentData, setPaymentData] = useState({
    amount: enrollment?.dueAmount || 0,
    paymentMethod: "cash",
    transactionId: "",
    note: "",
    paymentDate: new Date().toISOString().split("T")[0],
  });

  const paymentMethods = [
    { value: "cash", label: "Cash Payment", icon: <AttachMoney /> },
    { value: "bkash", label: "bKash", icon: <Smartphone /> },
    { value: "nagad", label: "Nagad", icon: <Smartphone /> },
    { value: "bank", label: "Bank Transfer", icon: <AccountBalance /> },
    { value: "card", label: "Credit/Debit Card", icon: <CreditCard /> },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <CraftModal open={open} setOpen={setOpen} title="Collected Fees" size="md">
      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Student Information */}
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2, backgroundColor: "grey.50" }}>
              <Typography variant="h6" gutterBottom>
                Student Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Student Name
                  </Typography>
                  <Typography variant="body1" fontWeight="500">
                    {enrollment?.studentName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Class
                  </Typography>
                  <Typography variant="body1" fontWeight="500">
                    {enrollment?.className}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Total Fees
                  </Typography>
                  <Typography variant="body1" fontWeight="500">
                    ${enrollment?.totalFees}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Due Amount
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="500"
                    color="error.main"
                  >
                    ${enrollment?.dueAmount}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Payment Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>

            <TextField
              fullWidth
              label="Amount to Pay"
              name="amount"
              type="number"
              value={paymentData.amount}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
              helperText={`Maximum due amount: $${enrollment?.dueAmount}`}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={paymentData.paymentMethod}
                label="Payment Method"
                onChange={(e) =>
                  handleSelectChange("paymentMethod", e.target.value)
                }
              >
                {paymentMethods.map((method) => (
                  <MenuItem key={method.value} value={method.value}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {method.icon}
                      {method.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {(paymentData.paymentMethod === "bkash" ||
              paymentData.paymentMethod === "nagad" ||
              paymentData.paymentMethod === "bank" ||
              paymentData.paymentMethod === "card") && (
              <TextField
                fullWidth
                label="Transaction ID"
                name="transactionId"
                value={paymentData.transactionId}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                placeholder="Enter transaction reference number"
              />
            )}

            <TextField
              fullWidth
              label="Payment Date"
              name="paymentDate"
              type="date"
              value={paymentData.paymentDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>

            <TextField
              fullWidth
              label="Notes (Optional)"
              name="note"
              value={paymentData.note}
              onChange={handleInputChange}
              multiline
              rows={4}
              placeholder="Add any additional notes about this payment..."
            />
          </Grid>
        </Grid>
      </DialogContent>
    </CraftModal>
  );
};

export default FeeCollectionModal;
