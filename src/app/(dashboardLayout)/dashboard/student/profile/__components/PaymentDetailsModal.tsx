/* eslint-disable @typescript-eslint/no-explicit-any */
import CraftModal from "@/components/Shared/Modal";
import { Box, Grid, Typography, Chip, Divider } from "@mui/material";

interface PaymentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  payment: any;
  student?: any;
}

const PaymentDetailsModal = ({
  open,
  onClose,
  payment,
  student,
}: PaymentDetailsModalProps) => {
  if (!payment) return null;

  const formatCurrency = (value: number) =>
    `৳${value?.toLocaleString() ?? "0"}`;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "paid":
        return "success";
      case "partial":
        return "warning";
      case "pending":
        return "warning";
      case "unpaid":
        return "error";
      default:
        return "default";
    }
  };

  // Helper to safely extract a string from a possible object
  const safeString = (value: any): string => {
    if (!value) return "N/A";
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      // Try common display fields
      if (value.name) return value.name;
      if (value.className) return value.className;
      // Fallback
      return "N/A";
    }
    return String(value);
  };

  // Extract class name safely
  const className =
    safeString(student?.className) || safeString(payment?.className);

  return (
    <CraftModal
      open={open}
      setOpen={onClose}
      title="Payment Details"
      size="md"
      onClose={onClose}
    >
      <Box sx={{ p: 1 }}>
        {/* Student Information */}
        {student && (
          <>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Student Information
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Student Name
                </Typography>
                <Typography variant="body1">
                  {safeString(student.name) || safeString(payment.studentName)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Student ID
                </Typography>
                <Typography variant="body1">
                  {safeString(student.studentId) ||
                    safeString(payment.studentId)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Class
                </Typography>
                <Typography variant="body1">{className}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
          </>
        )}

        {/* Payment Details */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Payment Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Payment ID
            </Typography>
            <Typography variant="body1">{payment._id}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Receipt No
            </Typography>
            <Typography variant="body1">
              {payment.receiptNo || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Fee Type
            </Typography>
            <Typography variant="body1">
              {safeString(payment.feeType) || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Fee Amount
            </Typography>
            <Typography variant="body1">
              {formatCurrency(payment.feeAmount)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Paid Amount
            </Typography>
            <Typography variant="body1" fontWeight="bold" color="primary.main">
              {formatCurrency(payment.amountPaid)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Payment Method
            </Typography>
            <Typography variant="body1">
              {payment.paymentMethod
                ? payment.paymentMethod.charAt(0).toUpperCase() +
                  payment.paymentMethod.slice(1)
                : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Payment Date
            </Typography>
            <Typography variant="body1">
              {new Date(payment.paymentDate).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Chip
              label={payment.status?.toUpperCase() || "COMPLETED"}
              color={getStatusColor(payment.status)}
              size="small"
              variant="outlined"
            />
          </Grid>

          {/* Additional Info */}
          {payment.transactionId && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Transaction ID
              </Typography>
              <Typography variant="body2">{payment.transactionId}</Typography>
            </Grid>
          )}
          {payment.collectedBy && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Collected By
              </Typography>
              <Typography variant="body2">{payment.collectedBy}</Typography>
            </Grid>
          )}
          {payment.note && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Note
              </Typography>
              <Typography variant="body2">{payment.note}</Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Created At
            </Typography>
            <Typography variant="body2">
              {new Date(payment.createdAt).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Last Updated
            </Typography>
            <Typography variant="body2">
              {new Date(payment.updatedAt).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </CraftModal>
  );
};

export default PaymentDetailsModal;
