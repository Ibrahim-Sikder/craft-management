/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCreateBulkPaymentMutation } from "@/redux/api/paymentApi";
import { ArrowBack, CheckCircle, Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Grid,
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
import ReceiptViewer, { ReceiptData } from "./ReceiptViewer";

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
    roll?: string;
    section?: string;
    jamatGroup?: string;
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
  const [collectedBy, setCollectedBy] = useState("Tanvir Rahman");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [createBulkPayment] = useCreateBulkPaymentMutation();

  // Steps for the payment process
  const steps = ["Select Fees", "Payment Details", "Confirmation", "Receipt"];

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

  // Map fee types to receipt descriptions
  const getDescriptionForFee = (fee: Fee) => {
    const feeType = fee.feeType.toLowerCase();
    const month = fee.month;

    if (feeType.includes("admission")) return `Admission Fee - ${month}`;
    if (feeType.includes("tuition") || feeType.includes("monthly"))
      return `Monthly Tuition Fee (${month})`;
    if (feeType.includes("registration")) return `Registration Fee - ${month}`;
    if (feeType.includes("development")) return `Development Fee - ${month}`;
    if (feeType.includes("electricity")) return `Electricity Bill - ${month}`;
    if (feeType.includes("function")) return `Function - ${month}`;
    if (feeType.includes("id")) return `ID Card - ${month}`;
    if (feeType.includes("install")) return `Installation Fee - ${month}`;
    if (feeType.includes("lesson")) return `Lesson Plan - ${month}`;
    if (feeType.includes("library")) return `Library - ${month}`;
    if (feeType.includes("magazine")) return `Magazine - ${month}`;
    if (feeType.includes("prize")) return `Prize - ${month}`;
    if (
      feeType.includes("science") ||
      feeType.includes("lab") ||
      feeType.includes("ict")
    )
      return `Science and ICT Lab - ${month}`;
    if (feeType.includes("calendar")) return `Calendar - ${month}`;
    if (feeType.includes("dairy")) return `Dairy - ${month}`;
    if (feeType.includes("bikash") || feeType.includes("subscription"))
      return `Sub. for Bikash - ${month}`;

    return `${fee.feeType} - ${month}`;
  };

  // Generate receipt data
  const generateReceiptData = (paymentResponse: any): ReceiptData => {
    const paymentDate = new Date(paymentResponse.paymentDate || new Date());

    // Generate receipt number if not provided
    const receiptNo = paymentResponse.receiptNo || `RCP-${Date.now()}`;

    // Format date like "14-Dec-2025"
    const formattedDate = paymentDate
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(",", "");

    return {
      name: student.name || "AHMAD ABID KAJI",
      jamatGroup: student.jamatGroup || "Samen (Eight)",
      stdId: student.studentId || "N/A",
      roll: student.roll || "20",
      section: student.section || "Ba",
      payDate: formattedDate,
      invNo: receiptNo,
      receivedBy: collectedBy || "Tanvir Rahman",
      items: selectedFees.map((feeId) => {
        const fee = fees.find((f) => f._id === feeId);
        return {
          description: fee ? getDescriptionForFee(fee) : "Fee",
          amount: fee ? fee.dueAmount : 0,
        };
      }),
      total: totals.totalDue,
      generatedDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      studentId: student._id,
      paymentMethod,
      transactionId: paymentMethod !== "cash" ? transactionId : undefined,
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

      const result = await createBulkPayment(paymentData).unwrap();

      if (result.success) {
        // Generate receipt data
        const generatedReceiptData = generateReceiptData(result);
        setReceiptData(generatedReceiptData);

        toast.success(
          <Box>
            <Typography variant="body1" fontWeight="bold">
              Payment Successful!
            </Typography>
            <Typography variant="body2">
              Receipt No: {generatedReceiptData.invNo}
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
    setCollectedBy("Tanvir Rahman");
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

  // Handle view receipt
  const handleViewReceipt = () => {
    setShowReceipt(true);
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
            borderRadius: 2,
            boxShadow: (theme) => theme.shadows[10],
            background: "#fff",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 3,
              background: "#2c3e50",
              color: "white",
              borderRadius: "8px 8px 0 0",
              position: "relative",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 16,
                top: 16,
                color: "white",
              }}
              disabled={isProcessing}
            >
              <Close />
            </IconButton>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {activeStep === 3 ? "Payment Successful" : "Bulk Fee Payment"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Student: {student.name} ({student.studentId})
            </Typography>
          </Box>

          {/* Stepper */}
          {activeStep < 3 && (
            <Box sx={{ p: 3, background: "#f8f9fa" }}>
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
                <Alert severity="info" sx={{ mb: 3, borderRadius: 1 }}>
                  Select fees to pay for {student.name}
                </Alert>

                {/* Selection Actions */}
                <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleSelectAll}
                    sx={{ borderRadius: 0 }}
                  >
                    {selectedFees.length === fees.length
                      ? "Deselect All"
                      : "Select All"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleSelectPayable}
                    sx={{ borderRadius: 0 }}
                  >
                    Select Payable
                  </Button>
                  <Chip
                    label={`${selectedFees.length} selected`}
                    color="primary"
                    variant="outlined"
                    sx={{ borderRadius: 0 }}
                  />
                </Box>

                {fees.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                      No fees available
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <TableContainer
                      sx={{
                        mb: 3,
                        maxHeight: 400,
                        border: "1px solid #ddd",
                      }}
                    >
                      <Table stickyHeader size="small">
                        <TableHead>
                          <TableRow sx={{ background: "#f5f5f5" }}>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedFees.length === fees.length}
                                indeterminate={
                                  selectedFees.length > 0 &&
                                  selectedFees.length < fees.length
                                }
                                onChange={handleSelectAll}
                              />
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Fee Type
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Month
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ fontWeight: "bold" }}
                            >
                              Amount
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ fontWeight: "bold" }}
                            >
                              Paid
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ fontWeight: "bold" }}
                            >
                              Due
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Status
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {fees.map((fee) => (
                            <TableRow
                              key={fee._id}
                              hover
                              sx={{ cursor: "pointer" }}
                              onClick={() => handleSelectFee(fee._id)}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={selectedFees.includes(fee._id)}
                                  onChange={() => handleSelectFee(fee._id)}
                                />
                              </TableCell>
                              <TableCell>{fee.feeType}</TableCell>
                              <TableCell>{fee.month}</TableCell>
                              <TableCell align="right">
                                ৳{fee.amount.toLocaleString()}
                              </TableCell>
                              <TableCell align="right">
                                ৳{fee.paidAmount.toLocaleString()}
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{
                                  color:
                                    fee.dueAmount > 0 ? "#d32f2f" : "#2e7d32",
                                  fontWeight: "bold",
                                }}
                              >
                                ৳{fee.dueAmount.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={fee.status}
                                  size="small"
                                  sx={{
                                    borderRadius: 0,
                                    background:
                                      fee.status === "paid"
                                        ? "#4caf50"
                                        : fee.status === "partial"
                                          ? "#ff9800"
                                          : "#f44336",
                                    color: "white",
                                    fontWeight: "bold",
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
                          mb: 2,
                          border: "1px solid #1976d2",
                          background: "#e3f2fd",
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={3}>
                              <Typography variant="body2">
                                Total Amount
                              </Typography>
                              <Typography variant="h6">
                                ৳{totals.totalAmount.toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography variant="body2">
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
                              <Typography variant="body2">
                                Net Amount
                              </Typography>
                              <Typography variant="h6">
                                ৳{totals.netAmount.toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography variant="body2">Total Due</Typography>
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
                <Typography variant="h6" gutterBottom>
                  Payment Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Card sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          Payment Summary
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              Amount to Pay
                            </Typography>
                            <Typography variant="h5" color="primary">
                              ৳{totals.totalDue.toLocaleString()}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              Fees Selected
                            </Typography>
                            <Typography variant="h6">
                              {totals.selectedCount}
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
                      size="small"
                    >
                      <MenuItem value="cash">Cash</MenuItem>
                      <MenuItem value="bkash">bKash</MenuItem>
                      <MenuItem value="nagad">Nagad</MenuItem>
                      <MenuItem value="bank">Bank Transfer</MenuItem>
                    </TextField>
                  </Grid>

                  {paymentMethod !== "cash" && (
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Transaction ID"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        size="small"
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
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Note"
                      multiline
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </>
            )}

            {activeStep === 2 && (
              /* Step 3: Confirmation */
              <>
                <Typography variant="h6" gutterBottom>
                  Confirm Payment
                </Typography>

                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      Payment Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2">Amount</Typography>
                        <Typography variant="h5" color="primary">
                          ৳{totals.totalDue.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">Payment Method</Typography>
                        <Typography variant="body1">
                          {paymentMethod.toUpperCase()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">Collected By</Typography>
                        <Typography variant="body1">{collectedBy}</Typography>
                      </Grid>
                      {paymentMethod !== "cash" && transactionId && (
                        <Grid item xs={12}>
                          <Typography variant="body2">
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

                <Alert severity="info" sx={{ mb: 2 }}>
                  Please review before confirming
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
                        mb: 3,
                        p: 2,
                        background: "#4caf50",
                        color: "white",
                        borderRadius: 1,
                      }}
                    >
                      <CheckCircle sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6" gutterBottom>
                        Payment Successful
                      </Typography>
                      <Typography variant="body2">
                        Receipt No: {receiptData.invNo}
                      </Typography>
                    </Box>

                    {/* Quick Summary */}
                    <Card sx={{ mb: 3 }}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Typography variant="h6">Payment Receipt</Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={handleViewReceipt}
                            sx={{ borderRadius: 0 }}
                          >
                            View Full Receipt
                          </Button>
                        </Box>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography variant="body2">Student</Typography>
                            <Typography variant="body1">
                              {receiptData.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">Amount Paid</Typography>
                            <Typography variant="h6">
                              ৳{receiptData.total.toLocaleString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <Box
                      sx={{ display: "flex", gap: 2, justifyContent: "center" }}
                    >
                      <Button
                        variant="contained"
                        onClick={handleViewReceipt}
                        sx={{ borderRadius: 0 }}
                      >
                        View Receipt
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ mt: 2 }}>
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
              p: 2,
              borderTop: "1px solid #ddd",
              background: "#f8f9fa",
            }}
          >
            {activeStep < 3 ? (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={activeStep === 0 ? handleClose : handleBack}
                  disabled={isProcessing}
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
                  sx={{ minWidth: 120 }}
                >
                  {isProcessing ? (
                    <CircularProgress size={24} />
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
                    setActiveStep(0);
                    handleReset();
                  }}
                >
                  New Payment
                </Button>
                <Button
                  variant="contained"
                  onClick={handleComplete}
                  sx={{ background: "#4caf50" }}
                >
                  Done
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Modal>

      {/* Receipt Viewer */}
      {receiptData && (
        <ReceiptViewer
          open={showReceipt}
          onClose={() => setShowReceipt(false)}
          receiptData={receiptData}
        />
      )}
    </>
  );
};

export default BulkPaymentModal;
