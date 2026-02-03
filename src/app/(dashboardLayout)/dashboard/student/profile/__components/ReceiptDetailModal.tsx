/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Close, Download, Print } from "@mui/icons-material";
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
  onDownload,
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
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" fontWeight="bold">
              রিসিট ডিটেইলস
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {receipt.receiptNo} • {studentName}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent dividers sx={{ py: 3 }}>
        <Box>
          {/* হেডার */}
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              Craft International Institute
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              123 Education Street, Dhaka, Bangladesh
            </Typography>
            <Typography variant="body2" color="textSecondary">
              📞 +880 1300-726000 • 📱 +880 1830-678383 • ✉️
              info@craftinstitute.edu.bd
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* রিসিট টাইটেল */}
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
            ফি পরিশোধের রসিদ
          </Typography>

          {/* রিসিট ইনফো */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                  >
                    রিসিট তথ্য
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">রসিদ নং:</Typography>
                    <Typography fontWeight="bold">
                      {receipt.receiptNo}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">তারিখ:</Typography>
                    <Typography>
                      {new Date(receipt.paymentDate).toLocaleDateString(
                        "bn-BD"
                      )}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">সময়:</Typography>
                    <Typography>
                      {new Date(receipt.paymentDate).toLocaleTimeString(
                        "bn-BD",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
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
                    পেমেন্ট তথ্য
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">স্ট্যাটাস:</Typography>
                    <Chip
                      label={receipt.status?.toUpperCase() || "ACTIVE"}
                      color={getStatusColor(receipt.status)}
                      size="small"
                    />
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">পদ্ধতি:</Typography>
                    <Typography>
                      {receipt.paymentMethod?.toUpperCase()}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">সংগ্রহকারী:</Typography>
                    <Typography>{receipt.collectedBy}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* শিক্ষার্থীর তথ্য */}
          <Card variant="outlined" sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                শিক্ষার্থীর তথ্য
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="textSecondary">
                    নাম
                  </Typography>
                  <Typography>{receipt.studentName || studentName}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="textSecondary">
                    আইডি
                  </Typography>
                  <Typography>{receipt.studentId}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="textSecondary">
                    ক্লাস
                  </Typography>
                  <Typography>{receipt.className}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="textSecondary">
                    মোট টাকা
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ৳{receipt.totalAmount?.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* ফি আইটেমগুলোর টেবিল */}
          {receipt.fees && receipt.fees.length > 0 && (
            <>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                ফি আইটেমসমূহ
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
                        ক্রমিক
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        ফি ধরণ
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        মাস
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        মূল পরিমাণ
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        ডিসকাউন্ট
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        ছাড়
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        নিট পরিমাণ
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          py: 1.5,
                        }}
                      >
                        পরিশোধিত
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

              {/* সামারি */}
              {receipt.summary && (
                <Card variant="outlined" sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      ফি সারাংশ
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="textSecondary">
                          মোট আইটেম
                        </Typography>
                        <Typography variant="h6">
                          {receipt.summary.totalItems}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="textSecondary">
                          মোট পরিমাণ
                        </Typography>
                        <Typography variant="h6">
                          ৳{receipt.summary.subtotal?.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="textSecondary">
                          মোট ডিসকাউন্ট
                        </Typography>
                        <Typography variant="h6" color="error">
                          ৳{receipt.summary.totalDiscount?.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="textSecondary">
                          মোট ছাড়
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
                          <Typography variant="h5">মোট পরিশোধিত:</Typography>
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

          {/* অতিরিক্ত তথ্য */}
          {(receipt.transactionId || receipt.note) && (
            <Card variant="outlined" sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  অতিরিক্ত তথ্য
                </Typography>
                <Grid container spacing={2}>
                  {receipt.transactionId && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        লেনদেন আইডি
                      </Typography>
                      <Typography>{receipt.transactionId}</Typography>
                    </Grid>
                  )}
                  {receipt.note && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        মন্তব্য
                      </Typography>
                      <Typography>{receipt.note}</Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* একশন বাটন */}
          <Box display="flex" justifyContent="center" gap={3} mt={4}>
            <Button
              variant="contained"
              startIcon={<Print />}
              onClick={() => onPrint(receipt)}
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              রিসিট প্রিন্ট করুন
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() => onDownload(receipt)}
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              ডাউনলোড করুন
            </Button>
            <Button
              variant="text"
              onClick={onClose}
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              বন্ধ করুন
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptDetailsDialog;
