/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Print, Download } from "@mui/icons-material";

interface ReceiptViewerProps {
  receiptData: any;
  onPrint?: () => void;
  onDownload?: () => void;
}

const ReceiptViewer: React.FC<ReceiptViewerProps> = ({
  receiptData,
  onPrint,
  onDownload,
}) => {
  if (!receiptData) return null;

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4, maxWidth: 800, margin: "auto" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" color="primary" gutterBottom>
            Craft International Institute
          </Typography>
          <Typography variant="h5" gutterBottom>
            Payment Receipt
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {receiptData.date} • {receiptData.time}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Receipt No: <strong>{receiptData.receiptNo}</strong>
          </Typography>
        </Box>

        {/* Student Info */}
        <Box sx={{ mb: 4, p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Student Information
          </Typography>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1">
                {receiptData.student.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                ID
              </Typography>
              <Typography variant="body1">{receiptData.student.id}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Class
              </Typography>
              <Typography variant="body1">
                {receiptData.student.class}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Fee Details */}
        <TableContainer sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Adjustments</TableCell>
                <TableCell align="right">Net Amount</TableCell>
                <TableCell align="right">Paid</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receiptData.fees.map((fee: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{fee.description}</TableCell>
                  <TableCell align="right">
                    ৳{fee.amount.toLocaleString()}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "error.main" }}>
                    -৳{(fee.discount + fee.waiver).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    ৳{fee.netAmount.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    ৳{fee.paid.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell colSpan={4} align="right">
                  <Typography variant="h6">Total Paid</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    ৳{receiptData.summary.total.toLocaleString()}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Payment Info */}
        <Box sx={{ mb: 4, p: 2, bgcolor: "primary.50", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Payment Information
          </Typography>
          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Method
              </Typography>
              <Typography variant="body1">
                {receiptData.payment.method.toUpperCase()}
              </Typography>
            </Box>
            {receiptData.payment.transactionId !== "N/A" && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Transaction ID
                </Typography>
                <Typography variant="body1">
                  {receiptData.payment.transactionId}
                </Typography>
              </Box>
            )}
            <Box>
              <Typography variant="body2" color="text.secondary">
                Collected By
              </Typography>
              <Typography variant="body1">
                {receiptData.payment.collectedBy}
              </Typography>
            </Box>
          </Box>
          {receiptData.payment.note && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Note
              </Typography>
              <Typography variant="body1">
                {receiptData.payment.note}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
            pt: 2,
            borderTop: "1px dashed grey",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Thank you for your payment!
          </Typography>
          <Typography variant="caption" color="text.secondary">
            This is a computer generated receipt. No signature required.
          </Typography>
        </Box>

        {/* Actions */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
          {onPrint && (
            <Button
              variant="contained"
              startIcon={<Print />}
              onClick={onPrint}
              size="large"
            >
              Print Receipt
            </Button>
          )}
          {onDownload && (
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={onDownload}
              size="large"
            >
              Download PDF
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ReceiptViewer;
