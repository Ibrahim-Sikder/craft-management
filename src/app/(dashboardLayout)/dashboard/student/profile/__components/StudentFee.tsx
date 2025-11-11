/* eslint-disable @typescript-eslint/no-explicit-any */
import CraftTable, { Column, RowAction } from "@/components/Table";
import {
  Delete,
  Download,
  Edit,
  Payment,
  Visibility,
} from "@mui/icons-material";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useState } from "react";
import AddFeeModal from "./AddFeeModal";
import PaymentModal from "./PaymentModal";

interface StudentFeeProps {
  studentFees: any[];
  loading?: boolean;
  onView?: (fee: any) => void;
  onEdit?: (fee: any) => void;
  onDelete?: (fee: any) => void;
  onDownload?: (fee: any) => void;
  onPay?: (fee: any) => void;
  onAddFee?: (feeData: any) => void;
}

const StudentFee = ({
  studentFees,
  loading = false,
  onView,
  onEdit,
  onDelete,
  onDownload,
  onPay,
  onAddFee,
}: StudentFeeProps) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [addFeeModalOpen, setAddFeeModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);

  const handlePayClick = (fee: any) => {
    setSelectedFee(fee);
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    console.log("Payment successful:", paymentData);
    if (onPay) {
      onPay(paymentData);
    }
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
    setSelectedFee(null);
  };

  const handleAddFeeClick = () => {
    setAddFeeModalOpen(true);
  };

  const handleCloseAddFeeModal = () => {
    setAddFeeModalOpen(false);
  };

  const handleAddFee = (feeData: any) => {
    console.log("Adding new fee:", feeData);
    if (onAddFee) {
      onAddFee(feeData);
    }
  };

  // Define columns for the fee table
  const columns: Column[] = [
    {
      id: "feeType",
      label: "Fee Type",
      minWidth: 150,
      sortable: true,
      filterable: true,
      type: "text",
    },
    {
      id: "amount",
      label: "Total Amount",
      minWidth: 120,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `$${value?.toLocaleString()}`,
    },
    {
      id: "paidAmount",
      label: "Paid Amount",
      minWidth: 120,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `$${value?.toLocaleString()}`,
    },
    {
      id: "dueAmount",
      label: "Due Amount",
      minWidth: 120,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `$${value?.toLocaleString()}`,
    },
    {
      id: "paymentDate",
      label: "Payment Date",
      minWidth: 150,
      sortable: true,
      type: "date",
      format: (value: string) => {
        try {
          return new Date(value).toLocaleDateString();
        } catch {
          return "Invalid Date";
        }
      },
    },
    {
      id: "paymentMethod",
      label: "Payment Method",
      minWidth: 130,
      sortable: true,
      filterable: true,
      type: "text",
      format: (value: string) =>
        value?.charAt(0).toUpperCase() + value?.slice(1),
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
      id: "createdAt",
      label: "Created Date",
      minWidth: 150,
      sortable: true,
      type: "date",
      format: (value: string) => {
        try {
          return new Date(value).toLocaleDateString();
        } catch {
          return "Invalid Date";
        }
      },
    },
  ];

  // Define row actions
  const rowActions: RowAction[] = [
    {
      label: "View Details",
      icon: <Visibility fontSize="small" />,
      onClick: (row) => onView?.(row),
      color: "info",
      tooltip: "View fee details",
    },
    {
      label: "Download Receipt",
      icon: <Download fontSize="small" />,
      onClick: (row) => onDownload?.(row),
      color: "primary",
      tooltip: "Download payment receipt",
    },
    {
      label: "Edit",
      icon: <Edit fontSize="small" />,
      onClick: (row) => onEdit?.(row),
      color: "warning",
      tooltip: "Edit fee record",
      inMenu: true,
    },
    {
      label: "Make Payment",
      icon: <Payment fontSize="small" />,
      onClick: (row) => handlePayClick(row),
      color: "success",
      tooltip: "Make payment",
      disabled: (row) => row.status === "paid",
    },
    {
      label: "Delete",
      icon: <Delete fontSize="small" />,
      onClick: (row) => onDelete?.(row),
      color: "error",
      tooltip: "Delete fee record",
      inMenu: true,
    },
  ];

  // Calculate summary statistics
  const summary = {
    totalFee: studentFees.reduce((sum, fee) => sum + (fee.amount || 0), 0),
    totalPaid: studentFees.reduce((sum, fee) => sum + (fee.paidAmount || 0), 0),
    totalDue: studentFees.reduce((sum, fee) => sum + (fee.dueAmount || 0), 0),
    paidCount: studentFees.filter((fee) => fee.status === "paid").length,
    partialCount: studentFees.filter((fee) => fee.status === "partial").length,
    unpaidCount: studentFees.filter((fee) => fee.status === "unpaid").length,
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Fee Details
      </Typography>

      {/* Summary Cards */}
      <Box sx={{ mb: 3 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Fee Summary
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body1">Total Fee:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  ${summary.totalFee.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body1">Paid Amount:</Typography>
                <Typography
                  variant="body1"
                  color="success.main"
                  fontWeight="bold"
                >
                  ${summary.totalPaid.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body1">Due Amount:</Typography>
                <Typography
                  variant="body1"
                  color="error.main"
                  fontWeight="bold"
                >
                  ${summary.totalDue.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body1">Status:</Typography>
                <Chip
                  label={`${summary.paidCount} Paid`}
                  size="small"
                  color="success"
                  variant="outlined"
                />
                <Chip
                  label={`${summary.partialCount} Partial`}
                  size="small"
                  color="warning"
                  variant="outlined"
                />
                <Chip
                  label={`${summary.unpaidCount} Unpaid`}
                  size="small"
                  color="error"
                  variant="outlined"
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Fee Records Table */}
      <CraftTable
        title="Fee Records"
        subtitle={`${studentFees.length} fee records found`}
        columns={columns}
        data={studentFees}
        loading={loading}
        rowActions={rowActions}
        selectable={true}
        searchable={true}
        filterable={true}
        sortable={true}
        pagination={true}
        idField="_id"
        emptyStateMessage="No fee records found"
        height="auto"
        maxHeight="60vh"
        stickyHeader={true}
        hover={true}
        showToolbar={true}
        elevation={1}
        borderRadius={2}
        showRowNumbers={true}
        rowNumberHeader="#"
        onRefresh={() => window.location.reload()}
        onExport={() => {
          console.log("Exporting fee data...");
        }}
        onAdd={handleAddFeeClick}
        bulkActions={[
          {
            label: "Export Selected",
            icon: <Download fontSize="small" />,
            onClick: (selectedRows) => {
              console.log("Exporting selected:", selectedRows);
            },
          },
          {
            label: "Delete Selected",
            icon: <Delete fontSize="small" />,
            onClick: (selectedRows) => {
              console.log("Deleting selected:", selectedRows);
            },
            color: "error",
          },
        ]}
      />

      {/* Payment Modal */}
      <PaymentModal
        open={paymentModalOpen}
        onClose={handleClosePaymentModal}
        fee={selectedFee}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Add Fee Modal */}
      <AddFeeModal
        open={addFeeModalOpen}
        setOpen={handleCloseAddFeeModal}
        onAddFee={handleAddFee}
      />
    </Box>
  );
};

export default StudentFee;
