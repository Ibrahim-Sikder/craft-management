/* eslint-disable @typescript-eslint/no-explicit-any */
// components/FeeAdjustmentModal.tsx
import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Discount, MoneyOff, Close, Save } from "@mui/icons-material";

interface FeeAdjustmentModalProps {
  open: boolean;
  onClose: () => void;
  fee: any;
  onApplyAdjustment: (data: any) => Promise<void>;
}

const FeeAdjustmentModal = ({
  open,
  onClose,
  fee,
  onApplyAdjustment,
}: FeeAdjustmentModalProps) => {
  const [formData, setFormData] = useState({
    type: "discount",
    adjustmentType: "percentage",
    value: "",
    reason: "",
    isRecurring: false,
    startMonth: "",
    endMonth: "",
  });

  const [loading, setLoading] = useState(false);
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  // Reset form when modal opens with new fee
  useEffect(() => {
    if (open && fee) {
      const currentMonth =
        fee.month ||
        `${new Date().toLocaleString("en", { month: "long" })}-${new Date().getFullYear()}`;

      setFormData({
        type: "discount",
        adjustmentType: "percentage",
        value: "",
        reason: "",
        isRecurring: false,
        startMonth: currentMonth,
        endMonth: currentMonth,
      });
      setCalculatedAmount(0);
    }
  }, [open, fee]);

  // Calculate adjustment amount
  useEffect(() => {
    if (fee && formData.value && !isNaN(Number(formData.value))) {
      const numericValue = Number(formData.value);

      if (formData.adjustmentType === "percentage") {
        // Percentage calculation - limit to 100%
        const percentage = Math.min(numericValue, 100);
        setCalculatedAmount((fee.amount * percentage) / 100);
      } else {
        // Flat amount calculation - limit to due amount
        const maxAllowed = fee.dueAmount || fee.amount;
        setCalculatedAmount(Math.min(numericValue, maxAllowed));
      }
    } else {
      setCalculatedAmount(0);
    }
  }, [formData.value, formData.adjustmentType, fee]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleValueChange = (value: string) => {
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        value: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (
      !fee ||
      !formData.reason.trim() ||
      !formData.value ||
      Number(formData.value) <= 0
    ) {
      alert("Please fill all required fields with valid values");
      return;
    }

    // Validate value limits
    const numericValue = Number(formData.value);
    if (formData.adjustmentType === "percentage" && numericValue > 100) {
      alert("Percentage cannot exceed 100%");
      return;
    }

    if (
      formData.adjustmentType === "flat" &&
      numericValue > (fee.dueAmount || fee.amount)
    ) {
      alert("Flat amount cannot exceed due amount");
      return;
    }

    setLoading(true);
    try {
      await onApplyAdjustment({
        student: fee.student?._id || fee.student,
        fee: fee._id,
        enrollment: fee.enrollment?._id || fee.enrollment,
        ...formData,
        value: numericValue, // Convert to number before sending
        academicYear: fee.academicYear || new Date().getFullYear().toString(),
      });

      onClose();
    } catch (error) {
      console.error("Failed to apply adjustment:", error);
      alert("Failed to apply adjustment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!fee) return null;

  const currentDue = fee.dueAmount || fee.amount;
  const newDueAmount = Math.max(0, currentDue - calculatedAmount);

  const maxPercentage = 100;
  const maxFlatAmount = currentDue;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          maxHeight: "90vh",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {formData.type === "discount" ? (
              <Discount color="primary" />
            ) : (
              <MoneyOff color="secondary" />
            )}
            Apply {formData.type === "discount" ? "Discount" : "Waiver"}
          </Typography>
          <Button onClick={onClose} size="small" disabled={loading}>
            <Close />
          </Button>
        </Box>

        {/* Fee Information */}
        <Paper sx={{ p: 2, mb: 3, bgcolor: "grey.50" }}>
          <Typography variant="subtitle2" gutterBottom>
            Fee Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Student:</strong> {fee.student?.name || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Month:</strong> {fee.month}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Original Amount:</strong> ৳
                {fee.amount?.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Due Amount:</strong> ৳{currentDue?.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {/* Adjustment Type */}
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Adjustment Type</InputLabel>
              <Select
                value={formData.type}
                label="Adjustment Type"
                onChange={(e) => handleInputChange("type", e.target.value)}
                disabled={loading}
              >
                <MenuItem value="discount">Discount</MenuItem>
                <MenuItem value="waiver">Waiver</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Calculation Type */}
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Calculation Type</InputLabel>
              <Select
                value={formData.adjustmentType}
                label="Calculation Type"
                onChange={(e) => {
                  handleInputChange("adjustmentType", e.target.value);
                  // Reset value when calculation type changes
                  handleInputChange("value", "");
                }}
                disabled={loading}
              >
                <MenuItem value="percentage">Percentage (%)</MenuItem>
                <MenuItem value="flat">Flat Amount (৳)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Value Input */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label={`Value ${formData.adjustmentType === "percentage" ? "(%)" : "(৳)"}`}
              type="text" // Use text to handle input properly
              value={formData.value}
              onChange={(e) => handleValueChange(e.target.value)}
              placeholder={
                formData.adjustmentType === "percentage"
                  ? "Enter percentage"
                  : "Enter amount"
              }
              disabled={loading}
              error={formData.value ? Number(formData.value) <= 0 : false}
              helperText={
                formData.adjustmentType === "percentage"
                  ? `Max: ${maxPercentage}%`
                  : `Max: ৳${maxFlatAmount?.toLocaleString()}`
              }
            />
          </Grid>

          {/* Calculated Amount */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Calculated Amount"
              value={`৳${calculatedAmount.toFixed(2)}`}
              disabled
              InputProps={{
                startAdornment:
                  formData.type === "discount" ? (
                    <Discount color="primary" sx={{ mr: 1 }} />
                  ) : (
                    <MoneyOff color="secondary" sx={{ mr: 1 }} />
                  ),
              }}
            />
          </Grid>

          {/* Reason */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Reason *"
              value={formData.reason}
              onChange={(e) => handleInputChange("reason", e.target.value)}
              multiline
              rows={2}
              required
              disabled={loading}
              placeholder="Enter reason for this adjustment"
            />
          </Grid>

          {/* Month Range */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Start Month"
              value={formData.startMonth}
              onChange={(e) => handleInputChange("startMonth", e.target.value)}
              placeholder="January-2024"
              disabled={loading}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="End Month"
              value={formData.endMonth}
              onChange={(e) => handleInputChange("endMonth", e.target.value)}
              placeholder="December-2024"
              disabled={loading}
            />
          </Grid>

          {/* Recurring Option */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isRecurring}
                  onChange={(e) =>
                    handleInputChange("isRecurring", e.target.checked)
                  }
                  disabled={loading}
                />
              }
              label="Apply this adjustment recurring monthly"
            />
          </Grid>
        </Grid>

        {/* Summary */}
        {calculatedAmount > 0 && (
          <Alert
            severity="info"
            sx={{ mt: 2 }}
            icon={formData.type === "discount" ? <Discount /> : <MoneyOff />}
          >
            <Typography variant="body2">
              <strong>Summary:</strong>
              <br />
              Applying {formData.type} of ৳{calculatedAmount.toFixed(2)}
              <br />
              <strong>Current Due:</strong> ৳{currentDue?.toFixed(2)}
              <br />
              <strong>New Due Amount:</strong> ৳{newDueAmount.toFixed(2)}
            </Typography>
          </Alert>
        )}

        {/* Validation Errors */}
        {formData.value && Number(formData.value) <= 0 && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Value must be greater than 0
          </Alert>
        )}

        {formData.adjustmentType === "percentage" &&
          formData.value &&
          Number(formData.value) > 100 && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Percentage cannot exceed 100%
            </Alert>
          )}

        {formData.adjustmentType === "flat" &&
          formData.value &&
          Number(formData.value) > maxFlatAmount && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Flat amount cannot exceed due amount (৳
              {maxFlatAmount?.toLocaleString()})
            </Alert>
          )}

        {/* Actions */}
        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 3 }}
        >
          <Button onClick={onClose} disabled={loading} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              loading ||
              !formData.reason.trim() ||
              !formData.value ||
              Number(formData.value) <= 0 ||
              (formData.adjustmentType === "percentage" &&
                Number(formData.value) > 100) ||
              (formData.adjustmentType === "flat" &&
                Number(formData.value) > maxFlatAmount)
            }
            startIcon={loading ? <CircularProgress size={16} /> : <Save />}
            sx={{
              background:
                formData.type === "discount"
                  ? "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)"
                  : "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
            }}
          >
            {loading
              ? "Applying..."
              : `Apply ${formData.type === "discount" ? "Discount" : "Waiver"}`}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FeeAdjustmentModal;
