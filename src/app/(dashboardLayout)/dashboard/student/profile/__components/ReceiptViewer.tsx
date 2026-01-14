/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetPaymentQuery } from "@/redux/api/paymentApi";
import { formatDate } from "@/utils/nazeraDailyReport";
import { Close, Print } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
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
import React, { useRef, useState } from "react";

export interface ReceiptItem {
  description: string;
  amount: number;
}

export interface ReceiptData {
  name: string;
  jamatGroup: string;
  stdId: string;
  roll: string;
  section: string;
  payDate: string;
  invNo: string;
  receivedBy: string;
  items: ReceiptItem[];
  total: number;
  generatedDate: string;
  studentId?: string;
  paymentMethod?: string;
  transactionId?: string;
}

interface ReceiptViewerProps {
  open: boolean;
  onClose: () => void;
  receiptData: ReceiptData;
  id: string;
  student: any;
}

const ReceiptViewer: React.FC<ReceiptViewerProps> = ({
  open,
  onClose,
  receiptData,
  id,
  student,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useGetPaymentQuery(id);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Main print function that preserves design
  const handlePrint = () => {
    if (!componentRef.current) {
      console.error("Print content not found");
      return;
    }

    setIsPrinting(true);

    try {
      // Create a new window for printing
      const printWindow = window.open("", "_blank", "width=800,height=600");

      if (!printWindow) {
        // If popup is blocked, try alternative method
        handleAlternativePrint();
        return;
      }

      // Clone the print content
      const printContent = componentRef.current.cloneNode(true) as HTMLElement;

      // Remove no-print elements
      const noPrintElements = printContent.querySelectorAll(".no-print");
      noPrintElements.forEach((el) => el.remove());

      // Add print-specific styles that preserve the design
      const printStyles = `
        <style>
          /* Preserve original styling */
          body {
            font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background: white !important;
            color: #000 !important;
          }
          
          /* Page setup */
          @page {
            size: A4;
            margin: 15mm;
          }
          
          /* Print-specific styles */
          @media print {
            /* Preserve colors and backgrounds */
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            body {
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
            }
            
            .no-print {
              display: none !important;
            }
            
            /* Preserve receipt container styling */
            .receipt-container {
              max-width: 100% !important;
              margin: 0 auto !important;
              padding: 30px !important;
              background: white !important;
              border-top: 5px solid #2c3e50 !important;
              box-shadow: none !important;
              border-radius: 8px !important;
              page-break-inside: avoid;
            }
            
            /* Preserve typography */
            .receipt-title {
              font-size: 24px !important;
              font-weight: bold !important;
              color: #2c3e50 !important;
              text-transform: uppercase !important;
              letter-spacing: 1px !important;
            }
            
            .receipt-subtitle {
              font-size: 20px !important;
              color: #34495e !important;
              font-weight: 600 !important;
            }
            
            /* Preserve table styling */
            .receipt-table-container {
              margin-bottom: 25px !important;
              border: 1px solid #ddd !important;
            }
            
            .receipt-table {
              width: 100% !important;
              border-collapse: collapse !important;
            }
            
            .receipt-table th {
              background-color: #2c3e50 !important;
              color: white !important;
              padding: 12px 10px !important;
              font-weight: 600 !important;
              border: 1px solid #ddd !important;
            }
            
            .receipt-table td {
              padding: 10px !important;
              border: 1px solid #ddd !important;
            }
            
            /* Preserve alternating row colors */
            .receipt-table tbody tr:nth-child(odd) {
              background-color: #f9f9f9 !important;
            }
            
            .receipt-table tbody tr:nth-child(even) {
              background-color: white !important;
            }
            
            /* Preserve total row styling */
            .receipt-total-row {
              background-color: #ecf0f1 !important;
              font-weight: bold !important;
              font-size: 18px !important;
            }
            
            .receipt-total-row td {
              border-top: 2px solid #2c3e50 !important;
            }
            
            /* Prevent page breaks inside important elements */
            .avoid-break {
              page-break-inside: avoid;
            }
            
            /* Header styling */
            .receipt-header {
              text-align: center !important;
              margin-bottom: 30px !important;
              border-bottom: 2px solid #2c3e50 !important;
              padding-bottom: 15px !important;
            }
            
            /* Ensure proper font sizes */
            .receipt-text {
              font-size: 14px !important;
              line-height: 1.4 !important;
            }
            
            /* Ensure borders are visible */
            .receipt-border {
              border: 1px solid #000 !important;
            }
          }
          
          /* Screen styles */
          @media screen {
            .receipt-container {
              max-width: 800px;
              margin: 0 auto;
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            }
          }
        </style>
      `;

      // Write content to new window
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Money Receipt - ${data?.data?.receiptData?.studentName || "Student"}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            ${printStyles}
          </head>
          <body>
            <div class="receipt-container avoid-break">
              ${printContent.innerHTML}
            </div>
            <script>
              // Auto print with delay to ensure styles are loaded
              setTimeout(function() {
                window.print();
                setTimeout(function() {
                  window.close();
                }, 100);
              }, 500);
            </script>
          </body>
        </html>
      `);

      printWindow.document.close();
    } catch (error) {
      console.error("Print error:", error);
      alert("Error preparing print. Please try again.");
    } finally {
      setIsPrinting(false);
    }
  };

  // Alternative print method if popup is blocked
  const handleAlternativePrint = () => {
    if (!componentRef.current) return;

    const originalContent = document.body.innerHTML;
    const printContent = componentRef.current.innerHTML;

    // Create a temporary div for printing
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = printContent;

    // Remove no-print elements
    const noPrintElements = tempDiv.querySelectorAll(".no-print");
    noPrintElements.forEach((el) => el.remove());

    // Create the print document with preserved styles
    const printDocument = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Money Receipt</title>
          <style>
            @page {
              size: A4;
              margin: 15mm;
            }
            body {
              font-family: 'Roboto', Arial, sans-serif;
              margin: 0;
              padding: 30px;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            .receipt-container {
              max-width: 100%;
              background: white;
              border-top: 5px solid #2c3e50;
              padding: 30px;
              border-radius: 8px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              -webkit-print-color-adjust: exact;
            }
            th {
              background-color: #2c3e50 !important;
              color: white !important;
            }
            td, th {
              border: 1px solid #ddd;
              padding: 8px;
            }
            .receipt-total-row {
              background-color: #ecf0f1 !important;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          ${tempDiv.innerHTML}
        </body>
      </html>
    `;

    // Create a new window for printing
    const printWin = window.open("", "_blank");
    if (printWin) {
      printWin.document.write(printDocument);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        printWin.print();
        printWin.close();
      }, 500);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
          >
            <CircularProgress />
            <Typography ml={2}>Loading receipt data...</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  // Error state
  if (error) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Alert severity="error">
            Error loading receipt data. Please try again.
          </Alert>
        </DialogContent>
      </Dialog>
    );
  }

  // No data state
  if (!data?.data) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Alert severity="warning">No receipt data found.</Alert>
        </DialogContent>
      </Dialog>
    );
  }

  const tableRow = {
    height: "10px",
    maxHeight: "10px",
    padding: "0px",
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 0,
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle sx={{ p: 0, borderBottom: "1px solid #000" }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f5f5f5",
          }}
          className="no-print"
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "18px" }}
          >
            Money Receipt Preview
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ border: "1px solid #000" }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0, overflow: "auto" }}>
        <Box sx={{ p: 3, background: "#f5f5f5" }}>
          {/* Receipt Content for Printing */}
          <Paper
            ref={componentRef}
            elevation={0}
            sx={{
              maxWidth: "800px",
              margin: "0 auto",
              background: "white",
              padding: { xs: "15px", sm: "30px" },
              borderRadius: "8px",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
              borderTop: "5px solid #2c3e50",
            }}
            className="receipt-container avoid-break"
          >
            {/* Header */}
            <Box
              sx={{
                textAlign: "center",
                marginBottom: "30px",
                borderBottom: "2px solid #2c3e50",
                paddingBottom: "15px",
              }}
              className="receipt-header"
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#2c3e50",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
                className="receipt-title"
              >
                Craft International Institute
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  marginTop: "10px",
                  color: "#34495e",
                  fontWeight: 600,
                }}
                className="receipt-subtitle"
              >
                Money Receipt
              </Typography>
            </Box>

            {/* Student Info Table */}
            <TableContainer
              sx={{
                marginBottom: "25px",
                border: "1px solid #ddd",
              }}
              className="receipt-table-container"
            >
              <Table
                sx={{
                  "& td": {
                    padding: "8px 10px",
                    border: "1px solid #ddd",
                  },
                }}
                className="receipt-table"
              >
                <TableBody>
                  <Table sx={{ width: "100%" }}>
                    <TableBody>
                      <TableRow sx={tableRow}>
                        <TableCell sx={{ ...tableRow, fontWeight: "bold" }}>
                          Name
                        </TableCell>
                        <TableCell sx={{ ...tableRow }}>
                          {data?.data?.receiptData?.studentName}
                        </TableCell>
                        <TableCell sx={{ ...tableRow, fontWeight: "bold" }}>
                          Roll
                        </TableCell>
                        <TableCell sx={tableRow}>
                          {student?.data?.studentClassRoll}
                        </TableCell>
                      </TableRow>

                      <TableRow sx={{ ...tableRow, fontWeight: "bold" }}>
                        <TableCell
                          sx={{ fontWeight: 600, background: "#f9f9f9" }}
                        >
                          Section
                        </TableCell>
                        <TableCell> {student?.data?.section[0]}</TableCell>
                        <TableCell sx={{ ...tableRow, fontWeight: "bold" }}>
                          Pay Date
                        </TableCell>
                        <TableCell sx={tableRow}>
                          {formatDate(data?.data?.paymentDate)}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell sx={{ ...tableRow, fontWeight: "bold" }}>
                          STD. ID
                        </TableCell>
                        <TableCell sx={tableRow}>
                          {student?.data?.studentId}
                        </TableCell>
                        <TableCell sx={{ ...tableRow, fontWeight: "bold" }}>
                          Inv. No.
                        </TableCell>
                        <TableCell sx={tableRow}>
                          {data?.data?.receiptNo}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Fee Details Table */}
            <TableContainer
              sx={{
                marginBottom: "25px",
              }}
              className="receipt-table-container avoid-break"
            >
              <Table
                sx={{
                  "& th, & td": {
                    border: "1px solid #ddd",
                  },
                  "& th": {
                    background: "#2c3e50",
                    color: "white",
                    padding: "12px 10px",
                    fontWeight: 600,
                  },
                  "& td": {
                    padding: "10px",
                  },
                }}
                className="receipt-table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "8%", textAlign: "center" }}>
                      SL
                    </TableCell>
                    <TableCell sx={{ width: "72%" }}>Description</TableCell>
                    <TableCell sx={{ width: "20%", textAlign: "right" }}>
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data?.receiptData?.feeDetails?.map(
                    (receipt: any, index: number) => (
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor:
                            index % 2 === 1 ? "#f9f9f9" : "transparent",
                        }}
                      >
                        <TableCell sx={{ textAlign: "center" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell>{receipt?.feeType}</TableCell>
                        <TableCell sx={{ textAlign: "right" }}>
                          {receipt?.originalAmount?.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                  {/* Total Row */}
                  <TableRow
                    sx={{
                      backgroundColor: "#ecf0f1",
                      fontWeight: "bold",
                      fontSize: "18px",
                      "& td": {
                        borderTop: "2px solid #2c3e50 !important",
                      },
                    }}
                    className="receipt-total-row"
                  >
                    <TableCell
                      colSpan={2}
                      sx={{
                        textAlign: "right",
                        pr: 3,
                      }}
                    >
                      TOTAL
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "right",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      {data?.data?.totalAmount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Footer with Signature */}
            <Box
              sx={{
                marginTop: "40px",
                paddingTop: "20px",
              }}
              className="avoid-break"
            >
              <Typography
                sx={{
                  paddingTop: "40px",
                  fontWeight: 600,
                  color: "#2c3e50",
                  fontSize: "16px",
                }}
              >
                Received By
              </Typography>
            </Box>
          </Paper>

          {/* Action Buttons - Won't be printed */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mt: 3,
              pt: 2,
              borderTop: "1px solid #ddd",
            }}
            className="no-print"
          >
            <Button
              variant="contained"
              startIcon={<Print />}
              onClick={handlePrint}
              disabled={isPrinting}
              sx={{
                background: "#2c3e50",
                borderRadius: "4px",
                px: 4,
                py: 1.5,
                minWidth: "160px",
                "&:hover": { background: "#34495e" },
              }}
            >
              {isPrinting ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
                  Printing...
                </>
              ) : (
                "Print Receipt"
              )}
            </Button>

            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                borderRadius: "4px",
                px: 4,
                py: 1.5,
                minWidth: "120px",
                borderColor: "#2c3e50",
                color: "#2c3e50",
                "&:hover": {
                  borderColor: "#34495e",
                  background: "rgba(44, 62, 80, 0.04)",
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptViewer;
