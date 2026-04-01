/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Payment } from "@mui/icons-material";
import CraftModal from "@/components/Shared/Modal";

interface StudentFeeDetailsModalProps {
  open: boolean;
  onClose: () => void;
  student: any; // contains _id, name, studentId, mobile
  enrollment: any; // contains rollNumber
  fees: any[];
  totalAmount: number;
  totalPaid: number;
  totalDue: number;
  onBulkPayment: () => void;
}

const StudentFeeDetailsModal = ({
  open,
  onClose,
  student,
  enrollment,
  fees,
  totalAmount,
  totalPaid,
  totalDue,
  onBulkPayment,
}: StudentFeeDetailsModalProps) => {
  const formatCurrency = (value: number) => `৳${value?.toFixed(2)}`;

  return (
    <CraftModal
      open={open}
      setOpen={onClose}
      title={`Fee Details - ${student?.name || ""}`}
      size="xl"
      onClose={onClose}
    >
      <Box sx={{ p: 1 }}>
        {/* Bulk Payment Button (optional) */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<Payment />}
            onClick={onBulkPayment}
            size="medium"
          >
            Payment Now
          </Button>
        </Box>

        {/* Student Information */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Student Information
            </Typography>
            <Typography>
              <strong>Name:</strong> {student?.name}
            </Typography>
            <Typography>
              <strong>Student ID:</strong> {student?.studentId}
            </Typography>
            <Typography>
              <strong>Mobile:</strong> {student?.mobile}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Academic Information
            </Typography>
            <Typography>
              <strong>Roll Number:</strong> {enrollment?.rollNumber}
            </Typography>
            <Typography>
              <strong>Class:</strong> {fees[0]?.class}
            </Typography>
          </Grid>
        </Grid>

        {/* Fee Summary */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            backgroundColor: "grey.50",
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Fee Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Typography>
                <strong>Total Amount:</strong>
              </Typography>
              <Typography variant="h6">
                {formatCurrency(totalAmount)}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography>
                <strong>Paid Amount:</strong>
              </Typography>
              <Typography variant="h6" color="success.main">
                {formatCurrency(totalPaid)}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography>
                <strong>Due Amount:</strong>
              </Typography>
              <Typography variant="h6" color="error.main">
                {formatCurrency(totalDue)}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography>
                <strong>Total Fees:</strong>
              </Typography>
              <Typography variant="h6">{fees.length}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Fee Breakdown */}
        <Typography variant="h6" gutterBottom>
          Fee Breakdown
        </Typography>
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Fee Type</strong>
                </TableCell>
                <TableCell>
                  <strong>Month</strong>
                </TableCell>
                <TableCell>
                  <strong>Class</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Amount</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Paid</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Due</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fees.map((fee) => (
                <TableRow key={fee._id}>
                  <TableCell>{fee.feeType}</TableCell>
                  <TableCell>{fee.month}</TableCell>
                  <TableCell>{fee.class}</TableCell>
                  <TableCell align="right">
                    {formatCurrency(fee.amount)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(fee.paidAmount)}
                  </TableCell>
                  <TableCell align="right">
                    <Typography color="error.main" fontWeight="bold">
                      {formatCurrency(fee.dueAmount)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={fee.status.toUpperCase()}
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Optional close button (CraftModal already provides one) */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
        </Box>
      </Box>
    </CraftModal>
  );
};

export default StudentFeeDetailsModal;
