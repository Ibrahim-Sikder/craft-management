/* eslint-disable @typescript-eslint/no-explicit-any */
import CraftTable, { Column, RowAction } from "@/components/Table";
import {
  Delete,
  Download,
  Money,
  Print,
  Receipt,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import ReceiptViewer, { ReceiptData } from "./ReceiptViewer";

const PaymentHistory = ({ singleStudent }: any) => {
  const theme = useTheme();
  const payments = singleStudent?.data?.payments;

  const [isLoading, setIsLoading] = useState(false);
  const [processedPayments, setProcessedPayments] = useState<any[]>([]);
  const [receiptViewerOpen, setReceiptViewerOpen] = useState(false);
  const [selectedReceiptData, setSelectedReceiptData] =
    useState<ReceiptData | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>("");

  useEffect(() => {
    if (!payments || !Array.isArray(payments)) {
      setProcessedPayments([]);
      return;
    }

    setIsLoading(true);
    try {
      const processed = payments.map((payment) => ({
        _id: payment._id,
        receiptNo:
          payment.receiptNo || `RCP-${payment._id?.slice(-6) || "N/A"}`,
        student: payment.studentName || "Student Name",
        studentId: payment.studentId || "N/A",
        enrollment: payment.enrollmentType || "Course Name",
        feeType: payment.feeType || "Fee Type",
        feeAmount: payment.feeAmount || payment.amount || 0,
        amountPaid: payment.amountPaid || 0,
        paymentMethod: payment.paymentMethod || "cash",
        paymentDate:
          payment.paymentDate || payment.createdAt || new Date().toISOString(),
        note: payment.note || "",
        collectedBy: payment.collectedBy || "System",
        status: payment.status || "completed",
        transactionId: payment.transactionId || "",
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
        originalPayment: payment,
      }));

      setProcessedPayments(processed);
    } catch (error) {
      console.error("Error processing payments:", error);
      setProcessedPayments([]);
    } finally {
      setIsLoading(false);
    }
  }, [payments]);

  const handlePrintReceipt = (payment: any) => {
    if (!payment) return;

    // Set the payment ID
    setSelectedPaymentId(payment._id);

    // payment data থেকে ReceiptData format এ convert করুন
    const receiptData: ReceiptData = {
      name: payment.student || "Student Name",
      jamatGroup: payment.enrollment || "Course Name",
      stdId: payment.studentId || "N/A",
      roll: payment.originalPayment?.roll || "N/A",
      section: payment.originalPayment?.section || "N/A",
      payDate: new Date(payment.paymentDate).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      invNo: payment.receiptNo,
      receivedBy: payment.collectedBy || "System",
      items: [
        {
          description: payment.feeType || "Fee Payment",
          amount: payment.amountPaid || 0,
        },
      ],
      total: payment.amountPaid || 0,
      generatedDate: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      studentId: payment.studentId,
      paymentMethod: payment.paymentMethod,
      transactionId: payment.transactionId,
    };

    setSelectedReceiptData(receiptData);
    setReceiptViewerOpen(true);
  };

  const handleDownloadReceipt = (payment: any) => {
    console.log("Download receipt for payment:", payment);
    // Implement download functionality
  };

  const handleViewDetails = (payment: any) => {
    console.log("View details for payment:", payment);
    // Implement view details functionality
  };

  const handleCloseReceiptViewer = () => {
    setReceiptViewerOpen(false);
    setSelectedReceiptData(null);
    setSelectedPaymentId("");
  };

  const summary = {
    totalPayments: processedPayments.length,
    totalAmount: processedPayments.reduce(
      (sum, payment) => sum + (payment.amountPaid || 0),
      0
    ),
    completedPayments: processedPayments.filter(
      (payment) => payment.status === "completed" || payment.status === "paid"
    ).length,
    partialPayments: processedPayments.filter(
      (payment) => payment.status === "partial"
    ).length,
    pendingPayments: processedPayments.filter(
      (payment) => payment.status === "pending"
    ).length,
    unpaidPayments: processedPayments.filter(
      (payment) => payment.status === "unpaid"
    ).length,
  };

  const columns: Column[] = [
    {
      id: "_id",
      label: "Payment ID",
      minWidth: 200,
      sortable: true,
      filterable: true,
      type: "text",
      format: (value: string) => value?.slice(-8) || "N/A",
    },
    {
      id: "receiptNo",
      label: "Receipt No",
      minWidth: 140,
      sortable: true,
      filterable: true,
      type: "text",
    },
    {
      id: "student",
      label: "Student",
      minWidth: 180,
      sortable: true,
      filterable: true,
      type: "text",
    },
    {
      id: "feeType",
      label: "Fee Type",
      minWidth: 130,
      sortable: true,
      filterable: true,
      type: "text",
    },
    {
      id: "feeAmount",
      label: "Fee Amount",
      minWidth: 120,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `৳${value?.toLocaleString() || "0"}`,
    },
    {
      id: "amountPaid",
      label: "Paid Amount",
      minWidth: 120,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `৳${value?.toLocaleString() || "0"}`,
    },
    {
      id: "paymentMethod",
      label: "Payment Method",
      minWidth: 140,
      sortable: true,
      filterable: true,
      type: "text",
    },
    {
      id: "paymentDate",
      label: "Payment Date",
      minWidth: 150,
      sortable: true,
      type: "date",
      format: (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      id: "collectedBy",
      label: "Collected By",
      minWidth: 140,
      sortable: true,
      filterable: true,
      type: "text",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 120,
      sortable: true,
      filterable: true,
      type: "status",
      format: (value: string) => {
        const statusColors: any = {
          completed: "success",
          paid: "success",
          partial: "warning",
          pending: "warning",
          unpaid: "error",
        };
        return statusColors[value] || "default";
      },
    },
  ];

  const rowActions: RowAction[] = [
    {
      label: "View Details",
      icon: <Visibility fontSize="small" />,
      onClick: (row: any) => handleViewDetails(row),
      color: "info",
      tooltip: "View payment details",
    },
    {
      label: "Download Receipt",
      icon: <Download fontSize="small" />,
      onClick: (row: any) => handleDownloadReceipt(row),
      color: "primary",
      tooltip: "Download payment receipt",
    },
    {
      label: "Print Receipt",
      icon: <Print fontSize="small" />,
      onClick: (row: any) => handlePrintReceipt(row),
      color: "secondary",
      tooltip: "Print payment receipt",
    },
  ];

  const handleExport = () => {
    console.log("Export all payments");
  };

  const handlePrint = () => {
    console.log("Print all payments");
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleAddPayment = () => {
    console.log("Add new payment");
  };

  const handleBulkExport = () => {
    console.log("Bulk export payments");
  };

  const handleBulkPrint = (selectedRows: any[]) => {
    if (selectedRows.length > 0) {
      handlePrintReceipt(selectedRows[0]);
    }
  };

  const handleBulkDelete = (selectedRows: any[]) => {
    const ids = selectedRows.map((r) => r._id);
    console.log("Deleting selected payments with IDs:", ids);

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedRows.length} payments?`
      )
    ) {
      console.log("Deleting selected payments:", selectedRows);
    }
  };

  if (!payments || !Array.isArray(payments) || payments.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Money sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No Payment Records Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          There are no payment records to display.
        </Typography>
        <Button
          variant="contained"
          startIcon={<Receipt />}
          onClick={handleAddPayment}
          sx={{
            borderRadius: "10px",
            px: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          }}
        >
          Create New Payment
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 3,
        }}
      >
        Payment History
      </Typography>

      {/* Summary Cards */}
      <Box sx={{ mb: 4 }}>
        <Card
          variant="outlined"
          sx={{
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Payment Summary
            </Typography>

            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 4, mt: 2, mb: 2 }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" color="text.secondary">
                  Total Payments
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {summary.totalPayments}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" color="text.secondary">
                  Total Amount
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary.main">
                  ৳{summary.totalAmount.toLocaleString()}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
              <Chip
                label={`${summary.completedPayments} Paid`}
                color="success"
                variant="outlined"
              />
              <Chip
                label={`${summary.partialPayments} Partial`}
                color="warning"
                variant="outlined"
              />
              <Chip
                label={`${summary.pendingPayments} Pending`}
                color="warning"
                variant="outlined"
              />
              <Chip
                label={`${summary.unpaidPayments} Unpaid`}
                color="error"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Payment Records Table */}
      <CraftTable
        title="Payment Transactions"
        subtitle={`${processedPayments.length} payment records found`}
        columns={columns}
        data={processedPayments}
        loading={isLoading}
        rowActions={rowActions}
        selectable={true}
        searchable={true}
        filterable={true}
        sortable={true}
        pagination={true}
        idField="_id"
        emptyStateMessage="No payment records found"
        height="auto"
        maxHeight="65vh"
        stickyHeader={true}
        hover={true}
        showToolbar={true}
        elevation={1}
        borderRadius={2}
        showRowNumbers={true}
        rowNumberHeader="#"
        onRefresh={handleRefresh}
        onExport={handleExport}
        onPrint={handlePrint}
        onAdd={handleAddPayment}
        bulkActions={[
          {
            label: "Export Selected",
            icon: <Download fontSize="small" />,
            onClick: handleBulkExport,
          },
          {
            label: "Print Receipts",
            icon: <Print fontSize="small" />,
            onClick: handleBulkPrint,
          },
          {
            label: "Delete Selected",
            icon: <Delete fontSize="small" />,
            onClick: handleBulkDelete,
            color: "error",
          },
        ]}
        customToolbar={
          <Button
            variant="contained"
            startIcon={<Receipt />}
            onClick={handleAddPayment}
            sx={{
              borderRadius: "10px",
              px: 3,
              background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: `0 6px 20px ${theme.palette.success.light}60`,
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            New Payment
          </Button>
        }
      />

      {selectedReceiptData && (
        <ReceiptViewer
          open={receiptViewerOpen}
          onClose={handleCloseReceiptViewer}
          receiptData={selectedReceiptData}
          id={selectedPaymentId}
          student={singleStudent}
        />
      )}
    </Box>
  );
};

export default PaymentHistory;
