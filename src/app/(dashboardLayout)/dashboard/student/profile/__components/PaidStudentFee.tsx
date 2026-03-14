/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FeeAdjustmentModal from "@/components/FeeAdjustmentModal";
import CraftTable, { Column, RowAction } from "@/components/Table";
import {
  CheckCircle,
  Delete,
  Discount,
  Download,
  Edit,
  History,
  Visibility,
} from "@mui/icons-material";
import { Box, Chip, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddFeeModal from "./AddFeeModal";
import BulkPaymentModal from "./BulkPaymentModal";
import LateFeeCustomizationModal from "./LateFeeCustomizationModal";
import PaymentModal from "./PaymentModal";
import FeeSummaryCards from "./FeeSummaryCards";

interface StudentFeeProps {
  studentFees: any[];
  loading?: boolean;
  onView?: (fee: any) => void;
  onEdit?: (fee: any) => void;
  onDelete?: (fee: any) => void;
  onDownload?: (fee: any) => void;
  onPay?: (fee: any) => void;
  onAddFee?: (feeData: any) => void;
  student?: any;
  refetch?: () => void;
}

const PaidStudentFee = ({
  studentFees,
  loading = false,
  onView,
  onDelete,
  onDownload,
  onPay,
  student,
  refetch,
}: StudentFeeProps) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [addFeeModalOpen, setAddFeeModalOpen] = useState(false);
  const [adjustmentModalOpen, setAdjustmentModalOpen] = useState(false);
  const [customizationModalOpen, setCustomizationModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const [filteredFees, setFilteredFees] = useState<any[]>([]);
  const [bulkPaymentModalOpen, setBulkPaymentModalOpen] = useState(false);
  const [lateFeeSummary, setLateFeeSummary] = useState({
    totalLateFees: 0,
    totalCustomized: 0,
    totalOverdue: 0,
  });

  // Filter only paid fees (status = "paid")
  useEffect(() => {
    const paidFees = studentFees?.filter((fee) => fee?.status === "paid") || [];
    setFilteredFees(paidFees);

    // Calculate late fee summary for paid fees only
    if (paidFees?.length) {
      const summary = paidFees.reduce(
        (acc, fee) => {
          if (fee.lateFeeAmount > 0) {
            acc.totalLateFees += fee.lateFeeAmount;
          }
          if (fee.lateFeeCustomized) {
            acc.totalCustomized += 1;
          }
          return acc;
        },
        { totalLateFees: 0, totalCustomized: 0, totalOverdue: 0 },
      );
      setLateFeeSummary(summary);
    } else {
      setLateFeeSummary({
        totalLateFees: 0,
        totalCustomized: 0,
        totalOverdue: 0,
      });
    }
  }, [studentFees]);

  const handleCustomizeLateFeeClick = (fee: any) => {
    setSelectedFee(fee);
    setCustomizationModalOpen(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    if (onPay) {
      onPay(paymentData);
    }
    if (refetch) refetch();
  };

  const handleAdjustmentSuccess = async (adjustmentData: any) => {
    try {
      const response = await fetch(
        "https://server.craftinternationalinstitute.com/api/v1/fee-adjustments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adjustmentData),
        },
      );

      if (response.ok) {
        alert("Adjustment applied successfully!");
        setAdjustmentModalOpen(false);
        if (refetch) {
          refetch();
        }
      } else {
        throw new Error("Failed to apply adjustment");
      }
    } catch (error) {
      console.error("Error applying adjustment:", error);
      alert("Failed to apply adjustment");
    }
  };

  const handleCustomizationSuccess = () => {
    if (refetch) {
      refetch();
    }
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
    setSelectedFee(null);
  };

  const handleCloseAdjustmentModal = () => {
    setAdjustmentModalOpen(false);
    setSelectedFee(null);
  };

  const handleCloseCustomizationModal = () => {
    setCustomizationModalOpen(false);
    setSelectedFee(null);
  };

  const handleAddFeeClick = () => {
    setAddFeeModalOpen(true);
  };

  const handleCloseAddFeeModal = () => {
    setAddFeeModalOpen(false);
  };

  // Calculate summary statistics for paid fees only
  const calculateSummary = () => {
    const paidFees = studentFees?.filter((fee) => fee?.status === "paid") || [];

    const totalFees = paidFees?.reduce(
      (sum, fee) => sum + (fee.amount || 0),
      0,
    );
    const totalPaid = paidFees?.reduce(
      (sum, fee) => sum + (fee.paidAmount || 0),
      0,
    );
    const totalDue = paidFees?.reduce(
      (sum, fee) => sum + (fee.dueAmount || 0),
      0,
    );
    const totalDiscount = paidFees?.reduce(
      (sum, fee) => sum + (fee.discount || 0),
      0,
    );
    const totalWaiver = paidFees?.reduce(
      (sum, fee) => sum + (fee.waiver || 0),
      0,
    );
    const totalAdjustments = totalDiscount + totalWaiver;

    return {
      totalFees,
      totalPaid,
      totalDue,
      totalDiscount,
      totalWaiver,
      totalAdjustments,
    };
  };

  const summary = calculateSummary();

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
      id: "amount",
      label: "Total Amount",
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
      format: (value: number) =>
        value > 0 ? `-৳${value?.toLocaleString()}` : "৳0",
      render: (row: any) => (
        <Typography
          color={row.discount > 0 ? "error" : "text.secondary"}
          variant="body2"
          fontWeight={row.discount > 0 ? "bold" : "normal"}
        >
          {row.discount > 0 ? `-৳${row.discount?.toLocaleString()}` : "৳0"}
        </Typography>
      ),
    },
    {
      id: "waiver",
      label: "Waiver",
      minWidth: 100,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) =>
        value > 0 ? `-৳${value?.toLocaleString()}` : "৳0",
      render: (row: any) => (
        <Typography
          color={row.waiver > 0 ? "error" : "text.secondary"}
          variant="body2"
          fontWeight={row.waiver > 0 ? "bold" : "normal"}
        >
          {row.waiver > 0 ? `-৳${row.waiver?.toLocaleString()}` : "৳0"}
        </Typography>
      ),
    },
    {
      id: "netAmount",
      label: "Net Amount",
      minWidth: 120,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `৳${value?.toLocaleString()}`,
      render: (row: any) => {
        const netAmount =
          (row.amount || 0) - (row.discount || 0) - (row.waiver || 0);
        return (
          <Typography variant="body2" fontWeight="bold">
            ৳{netAmount.toLocaleString()}
          </Typography>
        );
      },
    },
    {
      id: "paidAmount",
      label: "Paid Amount",
      minWidth: 120,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `৳${value?.toLocaleString()}`,
      render: (row: any) => (
        <Typography variant="body2" fontWeight="bold" color="success.main">
          ৳{row.paidAmount?.toLocaleString() || "0"}
        </Typography>
      ),
    },
    {
      id: "dueAmount",
      label: "Due Amount",
      minWidth: 120,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `৳${value?.toLocaleString()}`,
      render: (row: any) => (
        <Typography
          color={row.dueAmount > 0 ? "error" : "success"}
          variant="body2"
          fontWeight="bold"
        >
          ৳{row.dueAmount?.toLocaleString() || "0"}
        </Typography>
      ),
    },
    {
      id: "dueDate",
      label: "Due Date",
      minWidth: 120,
      sortable: true,
      type: "date",
      format: (value: string) => {
        if (!value) return "N/A";
        try {
          return new Date(value).toLocaleDateString();
        } catch {
          return "Invalid Date";
        }
      },
      render: (row: any) => {
        return (
          <Typography variant="body2">
            {row.dueDate ? new Date(row.dueDate).toLocaleDateString() : "N/A"}
          </Typography>
        );
      },
    },
    {
      id: "lateFee",
      label: "Late Fee Paid",
      minWidth: 130,
      align: "right",
      sortable: true,
      render: (row: any) => {
        if (row.isLateFeeRecord) return null;

        return (
          <Box>
            {row.lateFeeAmount > 0 ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 0.5,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="warning.main"
                    fontWeight="bold"
                    sx={{
                      textDecoration: row.lateFeeCustomized
                        ? "underline"
                        : "none",
                      textDecorationStyle: "dotted",
                    }}
                  >
                    ৳{row.lateFeeAmount?.toLocaleString()}
                  </Typography>
                  {row.lateFeeCustomized && (
                    <Tooltip title="Customized">
                      <Edit sx={{ fontSize: 14, color: "success.main" }} />
                    </Tooltip>
                  )}
                </Box>
                {row.lateFeeAppliedDate && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: "0.625rem", display: "block" }}
                  >
                    Applied:{" "}
                    {new Date(row.lateFeeAppliedDate).toLocaleDateString()}
                  </Typography>
                )}
              </>
            ) : (
              <Typography variant="body2" color="text.disabled">
                ৳0
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      id: "lateFeeStatus",
      label: "Late Status",
      minWidth: 120,
      align: "center",
      render: (row: any) => {
        if (row.isLateFeeRecord) return null;

        if (row.lateFeeAmount > 0) {
          return (
            <Chip
              label={row.lateFeeCustomized ? "Customized" : "Late Fee Paid"}
              size="small"
              color={row.lateFeeCustomized ? "success" : "warning"}
              variant={row.lateFeeCustomized ? "filled" : "outlined"}
              sx={{ height: 24, fontWeight: "bold" }}
              icon={row.lateFeeCustomized ? <CheckCircle /> : undefined}
            />
          );
        } else {
          return (
            <Chip
              label="No Late Fee"
              size="small"
              color="success"
              variant="outlined"
              sx={{ height: 24 }}
            />
          );
        }
      },
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
      render: (row: any) => (
        <Typography variant="body2" fontWeight="medium">
          {row.paymentDate
            ? new Date(row.paymentDate).toLocaleDateString()
            : "N/A"}
        </Typography>
      ),
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
      render: (row: any) => {
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
        const config = statusConfig[row.status] || {
          color: "default",
          label: row.status,
        };

        const hasAdjustments = row.discount > 0 || row.waiver > 0;

        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={config.label}
              color={config.color}
              size="small"
              variant={row.status === "paid" ? "filled" : "outlined"}
            />
            {hasAdjustments && <Discount fontSize="small" color="success" />}
          </Box>
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

  // Define row actions for paid fees
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
      color: "secondary",
      tooltip: "Download payment receipt",
      disabled: (row) => !row.paidAmount || row.paidAmount === 0,
    },
    {
      label: "View Payment History",
      icon: <History fontSize="small" />,
      onClick: (row) => {},
      color: "info",
      tooltip: "View payment history",
      inMenu: true,
    },
    {
      label: "View Late Fee History",
      icon: <History fontSize="small" />,
      onClick: (row) => {
        if (row.lateFeeAmount > 0) {
          handleCustomizeLateFeeClick(row);
        }
      },
      color: "info",
      tooltip: "View late fee customization history",
      disabled: (row) => !row.lateFeeAmount || row.lateFeeAmount === 0,
      inMenu: true,
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
        Paid Fee Records
      </Typography>

      {/* Summary Cards - Using the new component */}
      <FeeSummaryCards
        type="paid"
        summary={summary}
        lateFeeSummary={lateFeeSummary}
      />

      {/* Fee Records Table - Showing only paid fees */}
      <CraftTable
        title="Paid Fee Records"
        subtitle={`Total ${filteredFees?.length || 0} paid fee records found`}
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
        emptyStateMessage="No paid fee records found"
        height="auto"
        maxHeight="60vh"
        stickyHeader={true}
        hover={true}
        showToolbar={true}
        elevation={1}
        borderRadius={2}
        showRowNumbers={true}
        rowNumberHeader="#"
        onRefresh={refetch}
        onAdd={handleAddFeeClick}
        bulkActions={[
          {
            label: "Download Receipts",
            icon: <Download fontSize="small" />,
            onClick: (selectedRows) => {
              alert(
                `Downloading receipts for ${selectedRows.length} selected fees`,
              );
            },
          },
          {
            label: "Export Selected",
            icon: <Download fontSize="small" />,
            onClick: (selectedRows) => {},
          },
          {
            label: "Delete Selected",
            icon: <Delete fontSize="small" />,
            onClick: (selectedRows) => {},
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
        student={student}
      />

      {/* Fee Adjustment Modal */}
      <FeeAdjustmentModal
        open={adjustmentModalOpen}
        onClose={handleCloseAdjustmentModal}
        fee={selectedFee}
        onApplyAdjustment={handleAdjustmentSuccess}
      />

      {/* Late Fee Customization Modal */}
      <LateFeeCustomizationModal
        open={customizationModalOpen}
        onClose={handleCloseCustomizationModal}
        fee={selectedFee}
        onSuccess={handleCustomizationSuccess}
      />

      {/* Bulk Payment Modal - Not needed for paid fees, but kept for consistency */}
      <BulkPaymentModal
        open={bulkPaymentModalOpen}
        onClose={() => setBulkPaymentModalOpen(false)}
        student={student}
        fees={[]}
        refetch={refetch}
      />
    </Box>
  );
};

export default PaidStudentFee;
