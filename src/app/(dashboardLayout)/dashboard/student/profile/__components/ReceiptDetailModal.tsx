/* eslint-disable @typescript-eslint/no-explicit-any */
import { Print } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

interface ReceiptDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  receipt: any;
  studentName: string;
  onPrint: (receipt: any) => void;
  onDownload: (receipt: any) => void;
}

const ReceiptDetailsDialog: React.FC<ReceiptDetailsDialogProps> = ({
  open,
  onClose,
  receipt,
  studentName,
  onPrint,
}) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "cancelled":
        return "error";
      case "refunded":
        return "warning";
      default:
        return "default";
    }
  };

  if (!receipt) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      scroll="paper"
    >
      <DialogContent dividers sx={{ py: 3 }}>
        <Box>
          {/* Receipt Title */}
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              textDecoration: "underline",
              mb: 4,
              fontWeight: 600,
            }}
          >
            Fee Payment Receipt
          </Typography>

          {/* Receipt Info */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Receipt Information
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Receipt No.:</Typography>
                    <Typography fontWeight="bold">
                      {receipt.receiptNo}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Date:</Typography>
                    <Typography>
                      {new Date(receipt.paymentDate).toLocaleDateString(
                        "en-US",
                      )}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Time:</Typography>
                    <Typography>
                      {new Date(receipt.paymentDate).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Payment Information
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Status:</Typography>
                    <Chip
                      label={receipt.status?.toUpperCase() || "ACTIVE"}
                      color={getStatusColor(receipt.status)}
                      size="small"
                    />
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Method:</Typography>
                    <Typography>
                      {receipt.paymentMethod?.toUpperCase()}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Collected By:</Typography>
                    <Typography>{receipt.collectedBy}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Student Information */}
          <Card variant="outlined" sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Student Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="textSecondary">
                    Name
                  </Typography>
                  <Typography>{receipt.studentName || studentName}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="textSecondary">
                    ID
                  </Typography>
                  <Typography>{receipt.studentId}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="textSecondary">
                    Class
                  </Typography>
                  <Typography>{receipt.className}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="textSecondary">
                    Total Amount
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ৳{receipt.totalAmount?.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Fee Items Table */}
          {receipt.fees && receipt.fees.length > 0 && (
            <>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Fee Items
              </Typography>
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ mb: 4 }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "primary.light" }}>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        Sl. No.
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        Fee Type
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        Month
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        Original Amount
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        Discount
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        Waiver
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        Net Amount
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        Paid
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {receipt.fees.map((fee: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{fee.feeType}</TableCell>
                        <TableCell>{fee.month || "N/A"}</TableCell>
                        <TableCell align="right">
                          ৳{fee.originalAmount?.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          <Typography color="error">
                            ৳{fee.discount?.toLocaleString() || "0"}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography color="error">
                            ৳{fee.waiver?.toLocaleString() || "0"}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography fontWeight="medium">
                            ৳{fee.netAmount?.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography fontWeight="bold" color="primary">
                            ৳{fee.paidAmount?.toLocaleString()}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Summary */}
              {receipt.summary && (
                <Card variant="outlined" sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      Fee Summary
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="textSecondary">
                          Total Items
                        </Typography>
                        <Typography variant="h6">
                          {receipt.summary.totalItems}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="textSecondary">
                          Subtotal
                        </Typography>
                        <Typography variant="h6">
                          ৳{receipt.summary.subtotal?.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="textSecondary">
                          Total Discount
                        </Typography>
                        <Typography variant="h6" color="error">
                          ৳{receipt.summary.totalDiscount?.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="textSecondary">
                          Total Waiver
                        </Typography>
                        <Typography variant="h6" color="error">
                          ৳{receipt.summary.totalWaiver?.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{ mt: 2, pt: 2, borderTop: "1px solid #ddd" }}
                      >
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h5">Total Paid:</Typography>
                          <Typography
                            variant="h3"
                            color="primary"
                            fontWeight="bold"
                          >
                            ৳{receipt.summary.amountPaid?.toLocaleString()}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Additional Information */}
          {(receipt.transactionId || receipt.note) && (
            <Card variant="outlined" sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Additional Information
                </Typography>
                <Grid container spacing={2}>
                  {receipt.transactionId && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        Transaction ID
                      </Typography>
                      <Typography>{receipt.transactionId}</Typography>
                    </Grid>
                  )}
                  {receipt.note && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        Note
                      </Typography>
                      <Typography>{receipt.note}</Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <Box display="flex" justifyContent="center" gap={3} mt={4}>
            <Button
              variant="contained"
              startIcon={<Print />}
              onClick={() => onPrint(receipt)}
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Print Receipt
            </Button>

            <Button
              variant="text"
              onClick={onClose}
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptDetailsDialog;
