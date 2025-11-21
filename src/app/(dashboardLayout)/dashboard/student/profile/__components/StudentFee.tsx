/* eslint-disable @typescript-eslint/no-explicit-any */
import CraftTable, { Column, RowAction } from "@/components/Table";
import { Delete, Download, Payment, Visibility } from "@mui/icons-material";
import { Box, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
  onDelete,
  onDownload,
  onPay,
  onAddFee,
}: StudentFeeProps) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [addFeeModalOpen, setAddFeeModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const [filteredFees, setFilteredFees] = useState<any[]>([]);
  const [feeTypeFilter] = useState<string>("all");

  // Debug log to check all fees
  console.log("All student fees:", studentFees);

  // Filter fees based on selected fee type
  useEffect(() => {
    if (feeTypeFilter === "all") {
      setFilteredFees(studentFees);
    } else {
      setFilteredFees(
        studentFees.filter((fee) => fee.feeType === feeTypeFilter)
      );
    }
  }, [studentFees, feeTypeFilter]);

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

  // Define columns for fee table with all fee information
  const columns: Column[] = [
    {
      id: "feeType",
      label: "Fee Type",
      minWidth: 150,
      sortable: true,
      filterable: true,
    },
    {
      id: "month",
      label: "Month",
      minWidth: 120,
      sortable: true,
      filterable: true,
      type: "text",
    },
    {
      id: "class",
      label: "Class",
      minWidth: 100,
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
      format: (value: number) => `৳${value?.toLocaleString()}`,
    },
    {
      id: "paidAmount",
      label: "Paid Amount",
      minWidth: 120,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `৳${value?.toLocaleString()}`,
    },
    {
      id: "dueAmount",
      label: "Due Amount",
      minWidth: 120,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `৳${value?.toLocaleString()}`,
    },
    {
      id: "discount",
      label: "Discount",
      minWidth: 100,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `৳${value?.toLocaleString()}`,
    },
    {
      id: "waiver",
      label: "Waiver",
      minWidth: 100,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `৳${value?.toLocaleString()}`,
    },
    {
      id: "advanceUsed",
      label: "Advance Used",
      minWidth: 120,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `৳${value?.toLocaleString()}`,
    },
    {
      id: "paymentDate",
      label: "Payment Date",
      minWidth: 150,
      sortable: true,
      type: "date",
      format: (value: string) => {
        if (!value) return "Not Paid";
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
      format: (value: string) => {
        if (!value) return "N/A";
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
    {
      id: "status",
      label: "Status",
      minWidth: 120,
      sortable: true,
      filterable: true,
      type: "status",
      format: (value: string) => {
        const statusConfig: {
          [key: string]: {
            color: "success" | "warning" | "error" | "default";
            label: string;
          };
        } = {
          paid: { color: "success", label: "Paid" },
          partial: { color: "warning", label: "Partial" },
          unpaid: { color: "error", label: "Unpaid" },
        };
        const config = statusConfig[value] || {
          color: "default",
          label: value,
        };
        return (
          <Chip
            label={config.label}
            color={config.color}
            size="small"
            variant="outlined"
          />
        );
      },
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
      disabled: (row) => row.status === "unpaid" || row.paidAmount === 0,
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

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Student Fee Management
      </Typography>

      {/* Fee Records Table */}
      <CraftTable
        title={`${feeTypeFilter === "all" ? "All" : feeTypeFilter} Fee Records`}
        columns={columns}
        data={filteredFees}
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
            label: "Generate Bulk Receipts",
            icon: <Download fontSize="small" />,
            onClick: (selectedRows) => {
              console.log("Generating bulk receipts:", selectedRows);
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
