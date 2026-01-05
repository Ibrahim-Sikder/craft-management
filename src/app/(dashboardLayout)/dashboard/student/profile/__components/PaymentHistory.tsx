/* eslint-disable @typescript-eslint/no-explicit-any */
import CraftTable, { Column, RowAction } from "@/components/Table";
import {
  Delete,
  Download,
  Edit,
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

const PaymentHistory = ({ payments }: any) => {
  console.log("payment data ", payments);
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [processedPayments, setProcessedPayments] = useState<any[]>([]);

  // Process payment data when component mounts or payments change
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
      }));

      setProcessedPayments(processed);
    } catch (error) {
      console.error("Error processing payments:", error);
      setProcessedPayments([]);
    } finally {
      setIsLoading(false);
    }
  }, [payments]);

  // Calculate summary statistics
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

  // Define columns for the payment table
  const columns: Column[] = [
    {
      id: "receiptNo",
      label: "Receipt No",
      minWidth: 140,
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
    },
    {
      id: "note",
      label: "Notes",
      minWidth: 180,
      sortable: false,
      filterable: true,
      type: "text",
    },
  ];

  // Define row actions
  const rowActions: RowAction[] = [
    {
      label: "View Details",
      icon: <Visibility fontSize="small" />,
      onClick: (row) => {
        console.log("View payment details:", row);
      },
      color: "info",
      tooltip: "View payment details",
    },
    {
      label: "Download Receipt",
      icon: <Download fontSize="small" />,
      onClick: (row) => {
        console.log("Download receipt for:", row.receiptNo);
      },
      color: "primary",
      tooltip: "Download payment receipt",
    },
    {
      label: "Print Receipt",
      icon: <Print fontSize="small" />,
      onClick: (row) => {
        console.log("Print receipt for:", row.receiptNo);
      },
      color: "secondary",
      tooltip: "Print payment receipt",
    },
    {
      label: "Edit Payment",
      icon: <Edit fontSize="small" />,
      onClick: (row) => {
        console.log("Edit payment:", row.receiptNo);
      },
      color: "warning",
      tooltip: "Edit payment record",
      inMenu: true,
    },
    {
      label: "Delete Payment",
      icon: <Delete fontSize="small" />,
      onClick: (row) => {
        console.log("Delete payment:", row.receiptNo);
        if (
          window.confirm(
            `Are you sure you want to delete payment ${row.receiptNo}?`
          )
        ) {
          // Delete logic here
        }
      },
      color: "error",
      tooltip: "Delete payment record",
      inMenu: true,
    },
  ];

  // Handler functions
  const handleExport = () => {
    console.log("Exporting payment data...");
  };

  const handlePrint = () => {
    console.log("Printing payment list...");
  };

  const handleRefresh = () => {
    console.log("Refreshing payment data...");
    setIsLoading(true);
    // Refresh logic here
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleAddPayment = () => {
    console.log("Adding new payment...");
  };

  const handleBulkExport = (selectedRows: any[]) => {
    console.log("Exporting selected payments:", selectedRows);
  };

  const handleBulkPrint = (selectedRows: any[]) => {
    console.log("Printing receipts for:", selectedRows);
  };

  const handleBulkDelete = (selectedRows: any[]) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedRows.length} payments?`
      )
    ) {
      console.log("Deleting selected payments:", selectedRows);
    }
  };

  // If no data is available
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

            {/* Summary Stats */}
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

            {/* Status Summary */}
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
    </Box>
  );
};

export default PaymentHistory;
