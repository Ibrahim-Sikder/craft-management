/* eslint-disable @typescript-eslint/no-explicit-any */
import CraftTable, { Column, RowAction } from "@/components/Table";
import { Visibility } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import PaymentDetailsModal from "./PaymentDetailsModal";
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

  // State for payment details modal
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

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

  const handleViewDetails = (payment: any) => {
    setSelectedPayment(payment);
    setDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedPayment(null);
  };

  const handleCloseReceiptViewer = () => {
    setReceiptViewerOpen(false);
    setSelectedReceiptData(null);
    setSelectedPaymentId("");
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
  ];

  const rowActions: RowAction[] = [
    {
      label: "View Details",
      icon: <Visibility fontSize="small" />,
      onClick: (row) => handleViewDetails(row),
      color: "info",
      tooltip: "View payment details",
    },
  ];

  const handlePrint = () => {};

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleAddPayment = () => {};

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

      <CraftTable
        title="Payment Transactions"
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
        onPrint={handlePrint}
        onAdd={handleAddPayment}
      />

      <PaymentDetailsModal
        open={detailsModalOpen}
        onClose={handleCloseDetailsModal}
        payment={selectedPayment}
        student={singleStudent?.data}
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
