/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCreateBulkPaymentMutation } from "@/redux/api/paymentApi";
import {
  AccountBalance,
  ArrowBack,
  ArrowForward,
  Check,
  CheckCircle,
  Close,
  CreditCard,
  Email,
  LocalAtm,
  Print,
  Smartphone,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Grid2,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Fee {
  _id: string;
  feeType: string;
  month: string;
  amount: number;
  discount: number;
  waiver: number;
  paidAmount: number;
  dueAmount: number;
  status: string;
}

interface BulkPaymentModalProps {
  open: boolean;
  onClose: () => void;
  student: {
    _id: string;
    name: string;
    studentId: string;
    className?: string | any;
  };
  fees: Fee[];
  refetch?: () => void;
}

const BulkPaymentModal: React.FC<BulkPaymentModalProps> = ({
  open,
  onClose,
  student,
  fees,
  refetch,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedFees, setSelectedFees] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [transactionId, setTransactionId] = useState("");
  const [note, setNote] = useState("");
  const [collectedBy, setCollectedBy] = useState("Admin");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const [createBulkPayment] = useCreateBulkPaymentMutation();

  // Steps for the payment process
  const steps = ["Select Fees", "Payment Details", "Confirmation", "Receipt"];

  // Get class name safely - handle object case
  const getClassName = () => {
    if (!student.className) return "N/A";

    if (typeof student.className === "string") {
      return student.className;
    }

    if (typeof student.className === "object" && student.className !== null) {
      // Check for common properties
      if (student.className.className) return student.className.className;
      if (student.className.name) return student.className.name;
      if (student.className.title) return student.className.title;

      // Try to stringify safely
      try {
        return JSON.stringify(student.className).substring(0, 50);
      } catch {
        return "N/A";
      }
    }

    return "N/A";
  };

  // Filter only fees with due amount > 0
  const payableFees = fees.filter((fee) => fee.dueAmount > 0);

  // Calculate totals for selected fees
  const calculateTotals = () => {
    const selectedFeeObjects = fees.filter((fee) =>
      selectedFees.includes(fee._id)
    );

    const totalAmount = selectedFeeObjects.reduce(
      (sum, fee) => sum + fee.amount,
      0
    );
    const totalDiscount = selectedFeeObjects.reduce(
      (sum, fee) => sum + (fee.discount || 0),
      0
    );
    const totalWaiver = selectedFeeObjects.reduce(
      (sum, fee) => sum + (fee.waiver || 0),
      0
    );
    const totalPaid = selectedFeeObjects.reduce(
      (sum, fee) => sum + (fee.paidAmount || 0),
      0
    );
    const totalDue = selectedFeeObjects.reduce(
      (sum, fee) => sum + fee.dueAmount,
      0
    );
    const netAmount = totalAmount - totalDiscount - totalWaiver;

    return {
      totalAmount,
      totalDiscount,
      totalWaiver,
      totalPaid,
      totalDue,
      netAmount,
      selectedCount: selectedFeeObjects.length,
    };
  };

  const totals = calculateTotals();

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      // Don't reset if we're on receipt step (after payment success)
      if (activeStep !== 3) {
        handleReset();
      }
    }
  }, [open]);

  // Handle fee selection - allow selection of any fee (not just payable ones)
  const handleSelectFee = (feeId: string) => {
    setSelectedFees((prev) =>
      prev.includes(feeId)
        ? prev.filter((id) => id !== feeId)
        : [...prev, feeId]
    );
  };

  // Handle select all fees (both payable and non-payable)
  const handleSelectAll = () => {
    if (selectedFees.length === fees.length) {
      setSelectedFees([]);
    } else {
      setSelectedFees(fees.map((fee) => fee._id));
    }
  };

  // Handle select only payable fees
  const handleSelectPayable = () => {
    if (
      selectedFees.length === payableFees.length &&
      selectedFees.every((id) => payableFees.some((fee) => fee._id === id))
    ) {
      // If all payable fees are selected, deselect them
      setSelectedFees(
        selectedFees.filter((id) => !payableFees.some((fee) => fee._id === id))
      );
    } else {
      // Add all payable fees that aren't already selected
      const payableFeeIds = payableFees.map((fee) => fee._id);
      const newSelected = [...new Set([...selectedFees, ...payableFeeIds])];
      setSelectedFees(newSelected);
    }
  };

  // Handle next step
  const handleNext = () => {
    if (activeStep === 0 && selectedFees.length === 0) {
      toast.error("Please select at least one fee");
      return;
    }
    if (activeStep === 1 && !paymentMethod) {
      toast.error("Please select payment method");
      return;
    }
    if (activeStep === 1 && paymentMethod !== "cash" && !transactionId) {
      toast.error("Please enter transaction ID");
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Generate receipt from payment response
  const generateReceiptFromResponse = (paymentResponse: any) => {
    const paymentDate = new Date(paymentResponse.paymentDate || new Date());

    return {
      receiptNo: paymentResponse.receiptNo || `RCP-${Date.now()}`,
      date: paymentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: paymentDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      student: {
        name: student.name,
        id: student.studentId,
        class: getClassName(),
      },
      fees: fees
        .filter((fee) => selectedFees.includes(fee._id))
        .map((fee) => {
          const netAmount =
            fee.amount - (fee.discount || 0) - (fee.waiver || 0);
          return {
            description: `${fee.feeType} - ${fee.month}`,
            amount: fee.amount,
            discount: fee.discount || 0,
            waiver: fee.waiver || 0,
            netAmount: netAmount,
            dueAmount: fee.dueAmount,
          };
        }),
      payment: {
        method: paymentMethod,
        transactionId: paymentMethod !== "cash" ? transactionId : "N/A",
        total: totals.totalDue,
        collectedBy,
        note,
      },
      summary: {
        totalItems: selectedFees.length,
        subtotal: totals.totalAmount,
        adjustments: totals.totalDiscount + totals.totalWaiver,
        total: totals.totalDue,
      },
      // Craft International Institute specific data
      institute: {
        name: "Craft International Institute",
        address: "123 Education Street, Dhaka, Bangladesh",
        phone: "+880 1300-726000",
        mobile: "+880 1830-678383",
        email: "info@craftinstitute.edu.bd",
        website: "www.craftinstitute.edu.bd",
      },
    };
  };

  // Handle payment submission
  const handleSubmitPayment = async () => {
    setIsProcessing(true);
    try {
      const paymentData = {
        studentId: student._id,
        feeIds: selectedFees,
        amountPaid: totals.totalDue,
        paymentMethod,
        transactionId: paymentMethod !== "cash" ? transactionId : undefined,
        note,
        collectedBy,
      };

      console.log("Sending payment data:", paymentData);

      const result = await createBulkPayment(paymentData).unwrap();

      console.log("Payment response:", result);

      if (result.success) {
        // ✅ Backend থেকে আসা রিসিট ডেটা ব্যবহার করুন
        const backendReceiptData =
          result.receiptData || result.data?.receiptData;

        // যদি backend থেকে রিসিট ডেটা আসে
        if (backendReceiptData) {
          const paymentDate = new Date(
            backendReceiptData.paymentDate || new Date()
          );

          const generatedReceipt = {
            receiptNo: backendReceiptData.receiptNo || `RCP-${Date.now()}`,
            date: paymentDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            time: paymentDate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            student: {
              name: backendReceiptData.studentName || student.name,
              id: backendReceiptData.studentId || student.studentId,
              class: backendReceiptData.className || getClassName(),
            },
            fees:
              backendReceiptData.fees ||
              selectedFees.map((feeId) => {
                const fee = fees.find((f) => f._id === feeId);
                return {
                  description: `${fee?.feeType || "Fee"} - ${fee?.month || "N/A"}`,
                  amount: fee?.amount || 0,
                  discount: fee?.discount || 0,
                  waiver: fee?.waiver || 0,
                  netAmount:
                    (fee?.amount || 0) -
                    (fee?.discount || 0) -
                    (fee?.waiver || 0),
                  dueAmount: fee?.dueAmount || 0,
                };
              }),
            payment: {
              method: backendReceiptData.paymentMethod || paymentMethod,
              transactionId:
                backendReceiptData.transactionId ||
                (paymentMethod !== "cash" ? transactionId : "N/A"),
              total: backendReceiptData.totalAmount || totals.totalDue,
              collectedBy: backendReceiptData.collectedBy || collectedBy,
              note: backendReceiptData.note || note,
            },
            summary: {
              totalItems:
                backendReceiptData.summary?.totalItems || selectedFees.length,
              subtotal:
                backendReceiptData.summary?.subtotal || totals.totalAmount,
              adjustments: backendReceiptData.summary
                ? backendReceiptData.summary.totalDiscount +
                  backendReceiptData.summary.totalWaiver
                : totals.totalDiscount + totals.totalWaiver,
              total: backendReceiptData.totalAmount || totals.totalDue,
            },
            institute: backendReceiptData.institute || {
              name: "Craft International Institute",
              address: "123 Education Street, Dhaka, Bangladesh",
              phone: "+880 1300-726000",
              mobile: "+880 1830-678383",
              email: "info@craftinstitute.edu.bd",
              website: "www.craftinstitute.edu.bd",
            },
          };

          setReceiptData(generatedReceipt);
        } else {
          // যদি backend থেকে ডেটা না আসে, ফ্রন্টএন্ডে জেনারেট করুন
          const generatedReceipt = generateReceiptFromResponse(result);
          setReceiptData(generatedReceipt);
        }

        toast.success(
          <Box>
            <Typography variant="body1" fontWeight="bold">
              Payment Successful!
            </Typography>
            <Typography variant="body2">
              Receipt No: {receiptData?.receiptNo || result.receiptNo}
            </Typography>
          </Box>,
          {
            duration: 5000,
            icon: "✅",
          }
        );

        setActiveStep(3); // Go to receipt step
      } else {
        toast.error(result.message || "Payment failed");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Payment failed. Please try again.";
      toast.error(errorMessage, {
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
    }
  };
  // Reset modal
  const handleReset = () => {
    setActiveStep(0);
    setSelectedFees([]);
    setPaymentMethod("cash");
    setTransactionId("");
    setNote("");
    setCollectedBy("Admin");
    setReceiptData(null);
    setIsProcessing(false);
    setShowReceipt(false);
  };

  // Handle close - with refetch
  const handleClose = () => {
    if (!isProcessing) {
      // Refetch data if payment was successful
      if (receiptData && refetch) {
        refetch();
      }
      handleReset();
      onClose();
    }
  };

  // Complete process and close modal
  const handleComplete = () => {
    toast.success("Payment process completed!");
    // Refetch data before closing
    if (refetch) {
      refetch();
    }
    handleReset();
    onClose();
  };

  // Print receipt based on provided design
  const handlePrintReceipt = () => {
    if (!receiptData) return;

    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Receipt - ${receiptData.receiptNo}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
          
          body { 
            font-family: 'Roboto', Arial, sans-serif; 
            margin: 0;
            padding: 0;
            background: #f5f5f5;
            color: #333;
          }
          
          .receipt-container {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            padding: 20px;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          
          .header {
            text-align: center;
            padding-bottom: 15px;
            margin-bottom: 20px;
            position: relative;
          }
          
          .header-top {
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 10px;
          }
          
          .institute-name {
            font-size: 28px;
            font-weight: 700;
            color: #000;
            margin: 5px 0;
            letter-spacing: 1px;
          }
          
          .institute-subtitle {
            font-size: 16px;
            color: #000;
            margin-bottom: 5px;
            font-weight: 500;
          }
          
          .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            margin: 10px 0;
            font-size: 13px;
            color: #000;
          }
          
          .receipt-title {
            text-align: center;
            font-size: 24px;
            font-weight: 600;
            color: #000;
            margin: 20px 0;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-decoration: underline;
          }
          
          .receipt-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin: 15px 0;
            padding: 15px;
            background: #fff;
            border-radius: 0;
            border: 1px solid #000;
          }
          
          .detail-item {
            margin-bottom: 5px;
          }
          
          .detail-label {
            font-weight: 600;
            color: #000;
            display: inline-block;
            width: 120px;
          }
          
          .detail-value {
            color: #000;
            font-weight: 400;
          }
          
          .fees-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 13px;
          }
          
          .fees-table th {
            background: #fff;
            color: #000;
            padding: 8px;
            text-align: left;
            font-weight: 600;
            border: 1px solid #000;
          }
          
          .fees-table td {
            padding: 8px;
            border: 1px solid #000;
          }
          
          .amount-cell {
            text-align: right;
            font-family: 'Courier New', monospace;
            font-weight: 500;
          }
          
          .total-row {
            font-weight: bold;
            background: #f0f0f0;
          }
          
          .summary-section {
            margin-top: 20px;
            padding: 15px;
            background: #fff;
            border: 1px solid #000;
            border-radius: 0;
          }
          
          .summary-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            text-align: center;
            text-decoration: underline;
          }
          
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          
          .summary-item {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
          }
          
          .total-amount {
            grid-column: span 2;
            font-size: 20px;
            font-weight: 700;
            text-align: center;
            padding: 10px;
            margin-top: 5px;
            border-top: 1px solid #000;
          }
          
          .payment-info {
            margin-top: 20px;
            padding: 15px;
            background: #fff;
            border-radius: 0;
            border: 1px solid #000;
          }
          
          .signature-section {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            padding-top: 20px;
            border-top: 1px solid #000;
          }
          
          .signature {
            text-align: center;
            width: 200px;
          }
          
          .signature-line {
            border-top: 1px solid #000;
            width: 150px;
            margin: 10px auto;
          }
          
          .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #000;
            font-size: 11px;
            color: #000;
          }
          
          .thank-you {
            text-align: center;
            font-size: 14px;
            font-weight: 600;
            color: #000;
            margin: 15px 0;
            padding: 8px;
          }
          
          .receipt-no {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 14px;
            font-weight: 600;
            color: #000;
          }
          
          .date-time {
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 14px;
            font-weight: 600;
            color: #000;
          }
          
          @media print {
            body {
              background: white;
              margin: 0;
              padding: 10px;
            }
            .receipt-container {
              width: 100%;
              box-shadow: none;
              padding: 10px;
              border: none;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <!-- Header with Institute Info -->
          <div class="header">
            <div class="date-time">
              <div>Date: ${receiptData.date}</div>
              <div>Time: ${receiptData.time}</div>
            </div>
            
            <div class="receipt-no">
              Receipt No: ${receiptData.receiptNo}
            </div>
            
            <div class="header-top">
              <div class="institute-name">Craft International Institute</div>
              <div class="institute-subtitle">A Premier Educational Institution</div>
              <div class="contact-info">
                <div class="contact-item">
                  <span>📞</span> ${receiptData.institute.phone}
                </div>
                <div class="contact-item">
                  <span>📱</span> ${receiptData.institute.mobile}
                </div>
                <div class="contact-item">
                  <span>✉️</span> ${receiptData.institute.email}
                </div>
                <div class="contact-item">
                  <span>🌐</span> ${receiptData.institute.website}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Receipt Title -->
          <div class="receipt-title">Payment Receipt</div>
          
          <!-- Student Details -->
          <div class="receipt-details">
            <div class="detail-item">
              <span class="detail-label">Student ID:</span>
              <span class="detail-value">${receiptData.student.id}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Student Name:</span>
              <span class="detail-value">${receiptData.student.name}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Class:</span>
              <span class="detail-value">${receiptData.student.class}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Payment Method:</span>
              <span class="detail-value">${receiptData.payment.method.toUpperCase()}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Collected By:</span>
              <span class="detail-value">${receiptData.payment.collectedBy}</span>
            </div>
            ${
              receiptData.payment.transactionId !== "N/A"
                ? `
            <div class="detail-item">
              <span class="detail-label">Transaction ID:</span>
              <span class="detail-value">${receiptData.payment.transactionId}</span>
            </div>
            `
                : ""
            }
          </div>
          
          <!-- Fees Table -->
          <table class="fees-table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Particulars</th>
                <th>Amount (৳)</th>
                <th>Discount (৳)</th>
                <th>Waiver (৳)</th>
                <th>Net Amount (৳)</th>
                <th>Paid Amount (৳)</th>
              </tr>
            </thead>
            <tbody>
              ${receiptData.fees
                .map(
                  (fee: any, index: number) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${fee.description}</td>
                  <td class="amount-cell">${fee.amount.toLocaleString()}</td>
                  <td class="amount-cell">${fee.discount.toLocaleString()}</td>
                  <td class="amount-cell">${fee.waiver.toLocaleString()}</td>
                  <td class="amount-cell">${fee.netAmount.toLocaleString()}</td>
                  <td class="amount-cell">${fee.dueAmount.toLocaleString()}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          
          <!-- Payment Summary -->
          <div class="summary-section">
            <div class="summary-title">Payment Summary</div>
            <div class="summary-grid">
              <div class="summary-item">
                <span>Total Items:</span>
                <span>${receiptData.summary.totalItems}</span>
              </div>
              <div class="summary-item">
                <span>Total Amount:</span>
                <span>৳${receiptData.summary.subtotal.toLocaleString()}</span>
              </div>
              <div class="summary-item">
                <span>Total Discount:</span>
                <span>৳${receiptData.summary.adjustments.toLocaleString()}</span>
              </div>
              <div class="summary-item">
                <span>Net Amount:</span>
                <span>৳${receiptData.summary.total.toLocaleString()}</span>
              </div>
              <div class="summary-item total-amount">
                <span>Amount Paid:</span>
                <span>৳${receiptData.summary.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <!-- Additional Payment Info -->
          <div class="payment-info">
            <div style="margin-bottom: 10px;">
              <strong>Payment Method:</strong> ${receiptData.payment.method.toUpperCase()}
              ${receiptData.payment.transactionId !== "N/A" ? ` | <strong>Transaction ID:</strong> ${receiptData.payment.transactionId}` : ""}
            </div>
            ${
              receiptData.payment.note
                ? `
            <div>
              <strong>Note:</strong> ${receiptData.payment.note}
            </div>
            `
                : ""
            }
          </div>
          
          <!-- Thank You Message -->
          <div class="thank-you">
            ✅ Payment Received Successfully. Thank You!
          </div>
          
          <!-- Signatures -->
          <div class="signature-section">
            <div class="signature">
              <div>_________________________</div>
              <div>Student Signature</div>
            </div>
            <div class="signature">
              <div>_________________________</div>
              <div>Cashier/Collector</div>
            </div>
            <div class="signature">
              <div>_________________________</div>
              <div>Institute Stamp</div>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <p>This is a computer-generated receipt. No signature required.</p>
            <p>For any queries, please contact: ${receiptData.institute.phone} | ${receiptData.institute.email}</p>
            <p>Generated on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
        
        <!-- Print Button -->
        <div class="no-print" style="text-align: center; margin: 20px;">
          <button onclick="window.print()" style="
            padding: 12px 30px;
            background: #000;
            color: white;
            border: none;
            border-radius: 0;
            font-size: 16px;
            cursor: pointer;
            margin: 10px;
          ">
            🖨️ Print Receipt
          </button>
          <button onclick="window.close()" style="
            padding: 12px 30px;
            background: #e74c3c;
            color: white;
            border: none;
            border-radius: 0;
            font-size: 16px;
            cursor: pointer;
            margin: 10px;
          ">
            ✕ Close Window
          </button>
        </div>
        
        <script>
          // Auto-print after loading
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 1000);
          };
        </script>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(receiptContent);
      printWindow.document.close();
      printWindow.focus();
    }
  };

  // Handle view receipt
  const handleViewReceipt = () => {
    setShowReceipt(true);
  };

  // Fixed Receipt Viewer Component
  const ReceiptViewer = () => {
    if (!receiptData) return null;

    return (
      <Dialog
        open={showReceipt}
        onClose={() => setShowReceipt(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Payment Receipt</Typography>
            <IconButton onClick={() => setShowReceipt(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            {/* Receipt Design Based on Your Image */}
            <Card
              sx={{
                p: 3,
                mb: 2,
                border: "2px solid #000",
                borderRadius: 0,
                background: "#fff",
              }}
            >
              {/* Header Section */}
              <Box
                sx={{
                  borderBottom: "2px solid #000",
                  pb: 2,
                  mb: 3,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Date and Time */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    textAlign: "left",
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    Date: {receiptData.date}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    Time: {receiptData.time}
                  </Typography>
                </Box>

                {/* Receipt Number */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    textAlign: "right",
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    Receipt No: {receiptData.receiptNo}
                  </Typography>
                </Box>

                {/* Institute Name */}
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
                  Craft International Institute
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  A Premier Educational Institution
                </Typography>

                {/* Contact Info */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    flexWrap: "wrap",
                    fontSize: "0.875rem",
                  }}
                >
                  <Typography variant="body2">
                    📞 {receiptData.institute.phone}
                  </Typography>
                  <Typography variant="body2">
                    📱 {receiptData.institute.mobile}
                  </Typography>
                  <Typography variant="body2">
                    ✉️ {receiptData.institute.email}
                  </Typography>
                  <Typography variant="body2">
                    🌐 {receiptData.institute.website}
                  </Typography>
                </Box>
              </Box>

              {/* Receipt Title */}
              <Typography
                variant="h6"
                align="center"
                fontWeight="bold"
                sx={{
                  mb: 3,
                  textDecoration: "underline",
                }}
              >
                Payment Receipt
              </Typography>

              {/* Student Details */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Student ID:</strong> {receiptData.student.id}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Student Name:</strong> {receiptData.student.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Class:</strong> {receiptData.student.class}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Payment Method:</strong>{" "}
                    {receiptData.payment.method.toUpperCase()}
                  </Typography>
                </Grid>
                {receiptData.payment.transactionId !== "N/A" && (
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Transaction ID:</strong>{" "}
                      {receiptData.payment.transactionId}
                    </Typography>
                  </Grid>
                )}
              </Grid>

              {/* Fees Table */}
              <TableContainer sx={{ mb: 3 }}>
                <Table size="small" sx={{ border: "1px solid #000" }}>
                  <TableHead>
                    <TableRow sx={{ background: "#f5f5f5" }}>
                      <TableCell
                        sx={{ border: "1px solid #000", fontWeight: "bold" }}
                      >
                        SL
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #000", fontWeight: "bold" }}
                      >
                        Particulars
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ border: "1px solid #000", fontWeight: "bold" }}
                      >
                        Amount (৳)
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ border: "1px solid #000", fontWeight: "bold" }}
                      >
                        Discount (৳)
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ border: "1px solid #000", fontWeight: "bold" }}
                      >
                        Waiver (৳)
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ border: "1px solid #000", fontWeight: "bold" }}
                      >
                        Net Amount (৳)
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ border: "1px solid #000", fontWeight: "bold" }}
                      >
                        Paid Amount (৳)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {receiptData.fees.map((fee: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell sx={{ border: "1px solid #000" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #000" }}>
                          {fee.description}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ border: "1px solid #000" }}
                        >
                          {fee.amount.toLocaleString()}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ border: "1px solid #000" }}
                        >
                          {fee.discount.toLocaleString()}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ border: "1px solid #000" }}
                        >
                          {fee.waiver.toLocaleString()}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ border: "1px solid #000" }}
                        >
                          {fee.netAmount.toLocaleString()}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ border: "1px solid #000" }}
                        >
                          {fee.dueAmount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Payment Summary */}
              <Card
                sx={{
                  mb: 3,
                  border: "1px solid #000",
                  borderRadius: 0,
                }}
              >
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    fontWeight="bold"
                    sx={{ textDecoration: "underline", mb: 2 }}
                  >
                    Payment Summary
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2">Total Items:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {receiptData.summary.totalItems}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Total Amount:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        ৳{receiptData.summary.subtotal.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Total Discount:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        ৳{receiptData.summary.adjustments.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Net Amount:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        ৳{receiptData.summary.total.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ mt: 1, pt: 1, borderTop: "1px solid #000" }}
                    >
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h6" fontWeight="bold">
                          Amount Paid:
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          ৳{receiptData.summary.total.toLocaleString()}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Payment Info */}
              <Box
                sx={{
                  p: 2,
                  mb: 3,
                  border: "1px solid #000",
                  background: "#f9f9f9",
                }}
              >
                <Typography variant="body2">
                  <strong>Payment Method:</strong>{" "}
                  {receiptData.payment.method.toUpperCase()}
                  {receiptData.payment.transactionId !== "N/A" &&
                    ` | <strong>Transaction ID:</strong> ${receiptData.payment.transactionId}`}
                </Typography>
                {receiptData.payment.note && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Note:</strong> {receiptData.payment.note}
                  </Typography>
                )}
              </Box>

              {/* Thank You Message */}
              <Box
                sx={{
                  textAlign: "center",
                  mb: 3,
                  p: 1,
                  background: "#e8f5e8",
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  ✅ Payment Received Successfully. Thank You!
                </Typography>
              </Box>

              {/* Signatures */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                  pt: 2,
                  borderTop: "1px solid #000",
                }}
              >
                <Box sx={{ textAlign: "center", width: "30%" }}>
                  <Box
                    sx={{
                      borderTop: "1px solid #000",
                      width: "80%",
                      margin: "0 auto",
                      mb: 1,
                    }}
                  />
                  <Typography variant="caption">Student Signature</Typography>
                </Box>
                <Box sx={{ textAlign: "center", width: "30%" }}>
                  <Box
                    sx={{
                      borderTop: "1px solid #000",
                      width: "80%",
                      margin: "0 auto",
                      mb: 1,
                    }}
                  />
                  <Typography variant="caption">Cashier/Collector</Typography>
                </Box>
                <Box sx={{ textAlign: "center", width: "30%" }}>
                  <Box
                    sx={{
                      borderTop: "1px solid #000",
                      width: "80%",
                      margin: "0 auto",
                      mb: 1,
                    }}
                  />
                  <Typography variant="caption">Institute Stamp</Typography>
                </Box>
              </Box>

              {/* Footer */}
              <Box
                sx={{
                  textAlign: "center",
                  mt: 3,
                  pt: 2,
                  borderTop: "1px solid #000",
                  fontSize: "0.75rem",
                }}
              >
                <Typography variant="caption">
                  This is a computer-generated receipt. No signature required.
                </Typography>
                <Typography variant="caption" display="block">
                  For any queries, please contact: {receiptData.institute.phone}{" "}
                  | {receiptData.institute.email}
                </Typography>
                <Typography variant="caption" display="block">
                  Generated on: {new Date().toLocaleString()}
                </Typography>
              </Box>
            </Card>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                startIcon={<Print />}
                onClick={handlePrintReceipt}
                sx={{ background: "#000", borderRadius: 0 }}
              >
                Print Receipt
              </Button>
              <Button
                variant="outlined"
                onClick={() => setShowReceipt(false)}
                sx={{ borderRadius: 0 }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: 900,
            maxHeight: "90vh",
            overflow: "auto",
            borderRadius: 3,
            boxShadow: (theme) => theme.shadows[10],
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 3,
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              color: "white",
              borderRadius: "12px 12px 0 0",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 16,
                top: 16,
                color: "white",
                background: "rgba(255,255,255,0.2)",
                "&:hover": {
                  background: "rgba(255,255,255,0.3)",
                },
              }}
              disabled={isProcessing}
            >
              <Close />
            </IconButton>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {activeStep === 3 ? "🎉 Payment Successful!" : "Bulk Fee Payment"}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              {activeStep === 3
                ? "Your payment has been processed successfully"
                : "Pay multiple fees at once"}
            </Typography>
          </Box>

          {/* Stepper */}
          {activeStep < 3 && (
            <Box sx={{ p: 3 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          )}

          {/* Content based on step */}
          <Box sx={{ p: 3 }}>
            {activeStep === 0 && (
              /* Step 1: Select Fees */
              <>
                <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle2">
                    Select fees to pay for: <strong>{student.name}</strong> (
                    {student.studentId})
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Select individual fees or use the buttons below
                  </Typography>
                </Alert>

                {/* Selection Actions */}
                <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleSelectAll}
                  >
                    {selectedFees.length === fees.length
                      ? "Deselect All"
                      : "Select All"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleSelectPayable}
                  >
                    {selectedFees.length === payableFees.length &&
                    selectedFees.every((id) =>
                      payableFees.some((fee) => fee._id === id)
                    )
                      ? "Deselect Payable"
                      : "Select Payable Only"}
                  </Button>
                  <Chip
                    label={`${selectedFees.length} fee(s) selected`}
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                {fees.length === 0 ? (
                  <Card
                    sx={{
                      p: 4,
                      textAlign: "center",
                      background:
                        "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      color: "white",
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      No Fees Found!
                    </Typography>
                    <Typography>No fees available for this student.</Typography>
                  </Card>
                ) : (
                  <>
                    <TableContainer
                      sx={{
                        mb: 3,
                        maxHeight: 400,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        background: "white",
                      }}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow
                            sx={{
                              background:
                                "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            }}
                          >
                            <TableCell
                              padding="checkbox"
                              sx={{ background: "transparent" }}
                            >
                              <Checkbox
                                checked={selectedFees.length === fees.length}
                                indeterminate={
                                  selectedFees.length > 0 &&
                                  selectedFees.length < fees.length
                                }
                                onChange={handleSelectAll}
                                sx={{
                                  color: "white",
                                  "&.Mui-checked": { color: "white" },
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 600 }}>
                              Fee Type
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 600 }}>
                              Month
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: "white", fontWeight: 600 }}
                            >
                              Amount
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: "white", fontWeight: 600 }}
                            >
                              Paid
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: "white", fontWeight: 600 }}
                            >
                              Due
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 600 }}>
                              Status
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {fees.map((fee) => (
                            <TableRow
                              key={fee._id}
                              hover
                              sx={{
                                "&:hover": {
                                  background: "rgba(59, 130, 246, 0.05)",
                                },
                                cursor: "pointer",
                              }}
                              onClick={() => handleSelectFee(fee._id)}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={selectedFees.includes(fee._id)}
                                  onChange={() => handleSelectFee(fee._id)}
                                />
                              </TableCell>
                              <TableCell>
                                <Typography fontWeight={500}>
                                  {fee.feeType}
                                </Typography>
                              </TableCell>
                              <TableCell>{fee.month}</TableCell>
                              <TableCell align="right">
                                <Typography fontWeight={500}>
                                  ৳{fee.amount.toLocaleString()}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography>
                                  ৳{fee.paidAmount.toLocaleString()}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography
                                  color={
                                    fee.dueAmount > 0 ? "error" : "success"
                                  }
                                  fontWeight={600}
                                >
                                  ৳{fee.dueAmount.toLocaleString()}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={fee.status.toUpperCase()}
                                  size="small"
                                  sx={{
                                    fontWeight: 600,
                                    background:
                                      fee.status === "paid"
                                        ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                                        : fee.status === "partial"
                                          ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                                          : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                                    color: "white",
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    {selectedFees.length > 0 && (
                      <Card
                        sx={{
                          mb: 3,
                          background:
                            "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
                          border: "1px solid",
                          borderColor: "primary.light",
                          borderRadius: 2,
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" gutterBottom color="primary">
                            📋 Selected {totals.selectedCount} fee(s)
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={3}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Total Amount
                              </Typography>
                              <Typography variant="h6">
                                ৳{totals.totalAmount.toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Adjustments
                              </Typography>
                              <Typography variant="h6" color="error">
                                -৳
                                {(
                                  totals.totalDiscount + totals.totalWaiver
                                ).toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Net Amount
                              </Typography>
                              <Typography variant="h6">
                                ৳{totals.netAmount.toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Total Due
                              </Typography>
                              <Typography
                                variant="h5"
                                color="error"
                                fontWeight="bold"
                              >
                                ৳{totals.totalDue.toLocaleString()}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </>
            )}

            {activeStep === 1 && (
              /* Step 2: Payment Details */
              <>
                <Typography variant="h6" gutterBottom color="primary">
                  💳 Payment Information
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card sx={{ mb: 3 }}>
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          fontWeight={600}
                        >
                          Payment Summary
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Student
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {student.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Student ID
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {student.studentId}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Total Fees Selected
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {totals.selectedCount}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Amount to Pay
                            </Typography>
                            <Typography
                              variant="h5"
                              color="primary"
                              fontWeight="bold"
                            >
                              ৳{totals.totalDue.toLocaleString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      fullWidth
                      label="Payment Method"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    >
                      <MenuItem value="cash">
                        <Box display="flex" alignItems="center" gap={1}>
                          <LocalAtm /> Cash
                        </Box>
                      </MenuItem>
                      <MenuItem value="bkash">
                        <Box display="flex" alignItems="center" gap={1}>
                          <Smartphone /> bKash
                        </Box>
                      </MenuItem>
                      <MenuItem value="nagad">
                        <Box display="flex" alignItems="center" gap={1}>
                          <Smartphone /> Nagad
                        </Box>
                      </MenuItem>
                      <MenuItem value="bank">
                        <Box display="flex" alignItems="center" gap={1}>
                          <AccountBalance /> Bank Transfer
                        </Box>
                      </MenuItem>
                      <MenuItem value="card">
                        <Box display="flex" alignItems="center" gap={1}>
                          <CreditCard /> Card
                        </Box>
                      </MenuItem>
                    </TextField>
                  </Grid>

                  {paymentMethod !== "cash" && (
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Transaction ID"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        required
                        placeholder={`Enter ${paymentMethod} transaction ID`}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Collected By"
                      value={collectedBy}
                      onChange={(e) => setCollectedBy(e.target.value)}
                      required
                      placeholder="Enter collector name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Note (Optional)"
                      multiline
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Add any notes about this payment"
                    />
                  </Grid>
                </Grid>
              </>
            )}

            {activeStep === 2 && (
              /* Step 3: Confirmation */
              <>
                <Typography variant="h6" gutterBottom color="primary">
                  ✅ Confirm Payment
                </Typography>

                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      fontWeight={600}
                    >
                      Payment Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Student Name
                        </Typography>
                        <Typography variant="body1">{student.name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Total Amount
                        </Typography>
                        <Typography
                          variant="h5"
                          color="primary"
                          fontWeight="bold"
                        >
                          ৳{totals.totalDue.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Payment Method
                        </Typography>
                        <Typography variant="body1">
                          {paymentMethod.toUpperCase()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Collected By
                        </Typography>
                        <Typography variant="body1">{collectedBy}</Typography>
                      </Grid>
                      {paymentMethod !== "cash" && transactionId && (
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">
                            Transaction ID
                          </Typography>
                          <Typography variant="body1">
                            {transactionId}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>

                <Alert severity="warning" sx={{ mb: 3 }}>
                  ⚠️ Please review the payment details before confirming. This
                  action cannot be undone.
                </Alert>
              </>
            )}

            {activeStep === 3 && (
              /* Step 4: Receipt */
              <>
                {receiptData ? (
                  <>
                    <Box
                      sx={{
                        textAlign: "center",
                        mb: 4,
                        p: 3,
                        background:
                          "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                        borderRadius: 2,
                        color: "white",
                      }}
                    >
                      <CheckCircle sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="h4" gutterBottom>
                        🎉 Payment Successful!
                      </Typography>
                      <Typography variant="body1">
                        Receipt No: <strong>{receiptData.receiptNo}</strong>
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Payment of ৳{receiptData.summary.total.toLocaleString()}{" "}
                        processed successfully
                      </Typography>
                    </Box>

                    {/* Quick Receipt Summary */}
                    <Card
                      sx={{
                        mb: 4,
                        border: "2px solid",
                        borderColor: "primary.main",
                        borderRadius: 2,
                        background: "white",
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                          }}
                        >
                          <Box>
                            <Typography variant="h6" color="primary">
                              Payment Receipt
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {receiptData.date} • {receiptData.time}
                            </Typography>
                          </Box>
                          <Button
                            variant="outlined"
                            startIcon={<ReceiptIcon />}
                            onClick={handleViewReceipt}
                          >
                            View Full Receipt
                          </Button>
                        </Box>

                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Student
                            </Typography>
                            <Typography variant="body1">
                              {receiptData.student.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Amount Paid
                            </Typography>
                            <Typography variant="h6" color="primary">
                              ৳{receiptData.summary.total.toLocaleString()}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Payment Method
                            </Typography>
                            <Typography variant="body1">
                              {receiptData.payment.method.toUpperCase()}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Fees Paid
                            </Typography>
                            <Typography variant="body1">
                              {receiptData.fees.length} fees
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    {/* Receipt Actions */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<Print />}
                        onClick={handlePrintReceipt}
                        sx={{
                          background:
                            "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                          px: 4,
                          py: 1.5,
                        }}
                      >
                        Print Receipt
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Email />}
                        onClick={() =>
                          toast.success("Email feature coming soon!")
                        }
                        sx={{ px: 4, py: 1.5 }}
                      >
                        Email Receipt
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<ReceiptIcon />}
                        onClick={handleViewReceipt}
                        sx={{ px: 4, py: 1.5 }}
                      >
                        View Receipt
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <CircularProgress size={60} />
                    <Typography variant="h6" sx={{ mt: 3 }}>
                      Generating Receipt...
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Box>

          {/* Footer Actions */}
          <Box
            sx={{
              p: 3,
              borderTop: "1px solid",
              borderColor: "divider",
              background: "white",
              borderRadius: "0 0 12px 12px",
            }}
          >
            {activeStep < 3 ? (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={activeStep === 0 ? handleClose : handleBack}
                  disabled={isProcessing}
                  startIcon={activeStep === 0 ? <Close /> : <ArrowBack />}
                >
                  {activeStep === 0 ? "Cancel" : "Back"}
                </Button>

                <Button
                  variant="contained"
                  onClick={activeStep === 2 ? handleSubmitPayment : handleNext}
                  disabled={
                    isProcessing ||
                    (activeStep === 0 && selectedFees.length === 0) ||
                    (activeStep === 1 &&
                      paymentMethod !== "cash" &&
                      !transactionId)
                  }
                  endIcon={activeStep === 2 ? <Check /> : <ArrowForward />}
                  sx={{
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    px: 4,
                    minWidth: 200,
                  }}
                >
                  {isProcessing ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : activeStep === 2 ? (
                    `Pay ৳${totals.totalDue.toLocaleString()}`
                  ) : (
                    "Next"
                  )}
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    // Keep modal open but go back to step 0
                    setActiveStep(0);
                    handleReset();
                  }}
                  sx={{ px: 4 }}
                >
                  New Payment
                </Button>
                <Button
                  variant="contained"
                  onClick={handleComplete}
                  startIcon={<CheckCircle />}
                  sx={{
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    px: 6,
                    py: 1.5,
                  }}
                >
                  Done & Close
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Modal>

      {/* Receipt Viewer Modal - Fixed Component */}
      <ReceiptViewer />
    </>
  );
};

export default BulkPaymentModal;
