/* eslint-disable @typescript-eslint/no-explicit-any */

import CraftTable, { Column, RowAction } from "@/components/Table";
import { useGetCompleteReceiptsQuery } from "@/redux/api/receiptApi";
import { Delete, Download, Print, Visibility } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ReceiptDetailsDialog from "./ReceiptDetailModal";
import PrintModal from "./PrintModal";

interface ReceiptHistoryProps {
  studentId: string;
  studentName: string;
}

const ReceiptHistory: React.FC<ReceiptHistoryProps> = ({
  studentId,
  studentName,
}) => {
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [, setSearchTerm] = useState("");
  const [, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const {
    data: receiptsData,
    isLoading,
    error,
    refetch,
  } = useGetCompleteReceiptsQuery(studentId, {
    skip: !studentId,
    refetchOnMountOrArgChange: true,
  });

  const receipts = receiptsData?.data || [];

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

  const getPaymentMethodIcon = (method: string) => {
    switch (method?.toLowerCase()) {
      case "cash":
        return "💰";
      case "bkash":
        return "📱";
      case "nagad":
        return "💳";
      case "bank":
        return "🏦";
      case "card":
        return "💳";
      default:
        return "💵";
    }
  };

  const handleDeleteReceipt = () => {};

  const handlePrintReceipt = () => {
    // This can be called from ReceiptDetailsDialog
    if (selectedReceipt) {
      setShowPrintDialog(true);
    }
  };

  const handleDownloadReceipt = () => {};

  const handleViewReceipt = (receipt: any) => {
    setSelectedReceipt(receipt);
    setShowDetailsDialog(true);
  };

  const handlePrintRowReceipt = (receipt: any) => {
    setSelectedReceipt(receipt);
    setShowPrintDialog(true);
  };

  const handleDownloadRowReceipt = () => {};

  const handleRefresh = () => {
    refetch();
    setSnackbar({
      open: true,
      message: "Receipts refreshed successfully",
      severity: "success",
    });
  };

  const handleCloseDetailsDialog = () => {
    setShowDetailsDialog(false);
    setSelectedReceipt(null);
  };

  const columns: Column[] = [
    {
      id: "receiptNo",
      label: "Receipt No ",
      minWidth: 150,
      sortable: true,
      filterable: true,
      visible: true,
      type: "text",
    },
    {
      id: "paymentDate",
      label: "Payment Date",
      minWidth: 120,
      align: "center",
      sortable: true,
      filterable: true,
      visible: true,
      type: "date",
      format: (value: string) => {
        try {
          return new Date(value).toLocaleDateString("bn-BD");
        } catch {
          return value;
        }
      },
    },
    {
      id: "paymentMethod",
      label: "Payment Method ",
      minWidth: 130,
      align: "center",
      sortable: true,
      filterable: true,
      visible: true,
      type: "text",
      render: (row: any) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Typography>{getPaymentMethodIcon(row.paymentMethod)}</Typography>
          <Typography variant="body2">
            {row.paymentMethod?.toUpperCase()}
          </Typography>
        </Box>
      ),
      filterOptions: [
        { label: "Cash", value: "cash" },
        { label: "bKash", value: "bkash" },
        { label: "Nagad", value: "nagad" },
        { label: "Bank", value: "bank" },
        { label: "Card", value: "card" },
      ],
    },
    {
      id: "totalAmount",
      label: "Total",
      minWidth: 120,
      align: "right",
      sortable: true,
      filterable: false,
      visible: true,
      type: "number",
      format: (value: number) => (
        <Typography variant="body2" fontWeight="bold" color="primary">
          ৳{value?.toLocaleString() || "0"}
        </Typography>
      ),
    },
    {
      id: "fees",
      label: "Fee Type ",
      minWidth: 100,
      align: "center",
      sortable: false,
      filterable: false,
      visible: true,
      type: "number",
      render: (row: any) => <Box>{row.fees?.length || 0} টি</Box>,
    },
    {
      id: "status",
      label: "Status ",
      minWidth: 120,
      align: "center",
      sortable: true,
      filterable: true,
      visible: true,
      type: "status",
      render: (row: any) => (
        <Box
          sx={{
            backgroundColor:
              getStatusColor(row.status) === "success"
                ? "success.light"
                : getStatusColor(row.status) === "error"
                  ? "error.light"
                  : getStatusColor(row.status) === "warning"
                    ? "warning.light"
                    : "grey.200",
            color:
              getStatusColor(row.status) === "default"
                ? "text.primary"
                : "white",
            px: 2,
            py: 0.5,
            borderRadius: 1,
            fontSize: "0.75rem",
            fontWeight: "bold",
            display: "inline-block",
          }}
        >
          {row.status?.toUpperCase() || "ACTIVE"}
        </Box>
      ),
      filterOptions: [
        { label: "Active", value: "active" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Refunded", value: "refunded" },
      ],
    },
    {
      id: "collectedBy",
      label: "Receipt By ",
      minWidth: 120,
      sortable: true,
      filterable: true,
      visible: true,
      type: "text",
    },
    {
      id: "summary",
      label: "Details",
      minWidth: 200,
      sortable: false,
      filterable: false,
      visible: true,
      render: (row: any) => (
        <Box>
          <Typography variant="caption" display="block" color="textSecondary">
            {row.fees
              ?.slice(0, 2)
              .map(
                (fee: any) =>
                  `${fee.feeType}: ৳${fee.paidAmount?.toLocaleString()}`
              )
              .join(", ")}
          </Typography>
          {row.fees && row.fees.length > 2 && (
            <Typography variant="caption" color="textSecondary">
              +{row.fees.length - 2} more
            </Typography>
          )}
        </Box>
      ),
    },
  ];

  const rowActions: RowAction[] = [
    {
      label: "View",
      icon: <Visibility fontSize="small" />,
      onClick: handleViewReceipt,
      color: "primary",
      tooltip: "View Details",
      alwaysShow: true,
    },
    {
      label: "Print",
      icon: <Print fontSize="small" />,
      onClick: handlePrintRowReceipt,
      color: "info",
      tooltip: "Print",
      alwaysShow: true,
    },
    {
      label: "Download",
      icon: <Download fontSize="small" />,
      onClick: handleDownloadRowReceipt,
      color: "success",
      tooltip: "Download",
      inMenu: false,
    },
    {
      label: "Delete",
      icon: <Delete fontSize="small" />,
      onClick: handleDeleteReceipt,
      color: "error",
      tooltip: "Delete",
      inMenu: false,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <CraftTable
        title="Payment receipt history"
        subtitle={`STudent: ${studentName} (ID: ${studentId})`}
        columns={columns}
        data={receipts}
        loading={isLoading}
        error={error ? "Error loading receipts" : undefined}
        onRefresh={handleRefresh}
        onSearchChange={(term) => setSearchTerm(term)}
        rowActions={rowActions}
        selectable={true}
        searchable={true}
        filterable={true}
        sortable={true}
        pagination={true}
        serverSideSorting={false}
        emptyStateMessage="Do not found any receipt"
        idField="_id"
        maxHeight="70vh"
        stickyHeader={true}
        dense={false}
        striped={true}
        hover={true}
        showToolbar={true}
        elevation={2}
        borderRadius={3}
        showRowNumbers={true}
        rowNumberHeader="#"
        actionMenuLabel="Action"
        loadingOverlay={true}
        cardSx={{
          border: "1px solid #e0e0e0",
        }}
      />
      <ReceiptDetailsDialog
        open={showDetailsDialog}
        onClose={handleCloseDetailsDialog}
        receipt={selectedReceipt}
        studentName={studentName}
        onPrint={handlePrintReceipt}
        onDownload={handleDownloadReceipt}
      />

      <PrintModal
        open={showPrintDialog}
        setOpen={setShowPrintDialog}
        receipt={selectedReceipt}
      />
    </Box>
  );
};

export default ReceiptHistory;
