/* eslint-disable @typescript-eslint/no-explicit-any */
import CraftModal from "@/components/Shared/Modal";
import { Box, Grid, Typography, Chip, Divider } from "@mui/material";

interface ViewFeeModalProps {
  open: boolean;
  onClose: () => void;
  fee: any; // You can replace `any` with a proper Fee type later
  student?: any; // optional student details for display
}

const ViewFeeModal = ({ open, onClose, fee, student }: ViewFeeModalProps) => {
  if (!fee) return null;

  // Helper to format currency
  const formatCurrency = (value: number) =>
    `৳${value?.toLocaleString() ?? "0"}`;

  // Calculate net amount
  const netAmount = (fee.amount || 0) - (fee.discount || 0) - (fee.waiver || 0);

  // Determine status color
  const statusConfig: Record<string, { color: any; label: string }> = {
    paid: { color: "success", label: "Paid" },
    partial: { color: "warning", label: "Partial" },
    unpaid: { color: "error", label: "Unpaid" },
  };
  const status = statusConfig[fee.status] || {
    color: "default",
    label: fee.status,
  };

  return (
    <CraftModal
      open={open}
      setOpen={onClose} // CraftModal expects setOpen as a function that toggles open
      title="Fee Details"
      size="md"
      onClose={onClose}
    >
      <Box sx={{ p: 1 }}>
        {/* Student Info Section */}
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
                <Typography variant="body1">{student.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Class
                </Typography>
                <Typography variant="body1">
                  {typeof student.className === "object"
                    ? student.className?.name || student.className?.className
                    : student.className}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
          </>
        )}

        {/* Fee Details Section */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Fee Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Fee Type
            </Typography>
            <Typography variant="body1">{fee.feeType || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Month
            </Typography>
            <Typography variant="body1">{fee.month || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Academic Year
            </Typography>
            <Typography variant="body1">{fee.academicYear || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Due Date
            </Typography>
            <Typography variant="body1">
              {fee.dueDate ? new Date(fee.dueDate).toLocaleDateString() : "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          {/* Amounts */}
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Total Amount
            </Typography>
            <Typography variant="body1">
              {formatCurrency(fee.amount)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Discount
            </Typography>
            <Typography variant="body1" color="error">
              {fee.discount > 0
                ? `-${formatCurrency(fee.discount)}`
                : formatCurrency(0)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Waiver
            </Typography>
            <Typography variant="body1" color="error">
              {fee.waiver > 0
                ? `-${formatCurrency(fee.waiver)}`
                : formatCurrency(0)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Net Amount
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {formatCurrency(netAmount)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Paid Amount
            </Typography>
            <Typography variant="body1">
              {formatCurrency(fee.paidAmount)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Due Amount
            </Typography>
            <Typography variant="body1" color="error" fontWeight="bold">
              {formatCurrency(fee.dueAmount)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Chip
              label={status.label}
              color={status.color}
              size="small"
              variant="outlined"
            />
          </Grid>

          {/* Late Fee Section */}
          {fee.lateFeeAmount > 0 && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Late Fee Amount
                </Typography>
                <Typography variant="body1" color="warning.main">
                  {formatCurrency(fee.lateFeeAmount)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Late Fee Days
                </Typography>
                <Typography variant="body1">{fee.lateFeeDays || 0}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Late Fee Per Day
                </Typography>
                <Typography variant="body1">
                  {formatCurrency(fee.lateFeePerDay)}
                </Typography>
              </Grid>
            </>
          )}

          {/* Timestamps */}
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Created At
            </Typography>
            <Typography variant="body2">
              {new Date(fee.createdAt).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Last Updated
            </Typography>
            <Typography variant="body2">
              {new Date(fee.updatedAt).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </CraftModal>
  );
};

export default ViewFeeModal;
