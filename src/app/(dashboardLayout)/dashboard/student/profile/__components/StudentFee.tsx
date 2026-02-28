/* eslint-disable @typescript-eslint/no-explicit-any */
import FeeAdjustmentModal from "@/components/FeeAdjustmentModal";
import CraftTable, { Column, RowAction } from "@/components/Table";
import {
  AttachMoney,
  Delete,
  Discount,
  Download,
  Payment,
  Visibility,
  Warning as WarningIcon,
  Edit,
  CheckCircle,
  History,
} from "@mui/icons-material";
import { Box, Button, Chip, Paper, Typography, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import AddFeeModal from "./AddFeeModal";
import PaymentModal from "./PaymentModal";
import BulkPaymentModal from "./BulkPaymentModal";
import LateFeeCustomizationModal from "./LateFeeCustomizationModal";

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

const StudentFee = ({
  studentFees,
  loading = false,
  onView,
  onDelete,
  onDownload,
  onPay,
  onAddFee,
  student,
  refetch,
}: StudentFeeProps) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [addFeeModalOpen, setAddFeeModalOpen] = useState(false);
  const [adjustmentModalOpen, setAdjustmentModalOpen] = useState(false);
  const [customizationModalOpen, setCustomizationModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const [filteredFees, setFilteredFees] = useState<any[]>([]);
  const [feeTypeFilter,] = useState<string>("all");
  const [bulkPaymentModalOpen, setBulkPaymentModalOpen] = useState(false);
  const [lateFeeSummary, setLateFeeSummary] = useState({
    totalLateFees: 0,
    totalCustomized: 0,
    totalOverdue: 0,
  });

  useEffect(() => {
    if (feeTypeFilter === "all") {
      setFilteredFees(studentFees);
    } else {
      setFilteredFees(
        studentFees?.filter((fee) => fee?.feeType === feeTypeFilter)
      );
    }

    // Calculate late fee summary
    if (studentFees?.length) {
      const summary = studentFees.reduce(
        (acc, fee) => {
          if (fee.lateFeeAmount > 0) {
            acc.totalLateFees += fee.lateFeeAmount;
          }
          if (fee.lateFeeCustomized) {
            acc.totalCustomized += 1;
          }
          if (fee.dueDate && new Date(fee.dueDate) < new Date() && fee.status !== 'paid') {
            acc.totalOverdue += 1;
          }
          return acc;
        },
        { totalLateFees: 0, totalCustomized: 0, totalOverdue: 0 }
      );
      setLateFeeSummary(summary);
    }
  }, [studentFees, feeTypeFilter]);

  const handlePayClick = (fee: any) => {
    setSelectedFee(fee);
    setPaymentModalOpen(true);
  };

  const handleAdjustmentClick = (fee: any) => {
    setSelectedFee(fee);
    setAdjustmentModalOpen(true);
  };

  const handleCustomizeLateFeeClick = (fee: any) => {
    setSelectedFee(fee);
    setCustomizationModalOpen(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    console.log("Payment successful:", paymentData);
    if (onPay) {
      onPay(paymentData);
    }
    if (refetch) refetch();
  };

  const handleAdjustmentSuccess = async (adjustmentData: any) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/fee-adjustments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adjustmentData),
        }
      );

      if (response.ok) {
        alert("Adjustment applied successfully!");
        setAdjustmentModalOpen(false);
        if (refetch) {
          refetch();
        } else {
          window.location.reload();
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
    } else {
      window.location.reload();
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

  const handleAddFee = (feeData: any) => {
    console.log("Adding new fee:", feeData);
    if (onAddFee) {
      onAddFee(feeData);
    }
    if (refetch) refetch();
  };

  // Calculate summary statistics
  const calculateSummary = () => {
    const totalFees = studentFees?.reduce(
      (sum, fee) => sum + (fee.amount || 0),
      0
    );
    const totalPaid = studentFees?.reduce(
      (sum, fee) => sum + (fee.paidAmount || 0),
      0
    );
    const totalDue = studentFees?.reduce(
      (sum, fee) => sum + (fee.dueAmount || 0),
      0
    );
    const totalDiscount = studentFees?.reduce(
      (sum, fee) => sum + (fee.discount || 0),
      0
    );
    const totalWaiver = studentFees?.reduce(
      (sum, fee) => sum + (fee.waiver || 0),
      0
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
        const today = new Date();
        const dueDate = row.dueDate ? new Date(row.dueDate) : null;
        const isOverdue = dueDate && dueDate < today && row.status !== 'paid';

        return (
          <Box>
            <Typography
              variant="body2"
              color={isOverdue ? 'error' : 'text.primary'}
              fontWeight={isOverdue ? 'bold' : 'normal'}
            >
              {row.dueDate ? new Date(row.dueDate).toLocaleDateString() : 'N/A'}
            </Typography>
            {isOverdue && (
              <Chip
                label="Overdue"
                size="small"
                color="error"
                variant="outlined"
                sx={{ mt: 0.5, height: 20, fontSize: '0.625rem' }}
              />
            )}
          </Box>
        );
      },
    },
    {
      id: "lateFee",
      label: "Late Fee",
      minWidth: 130,
      align: "right",
      sortable: true,
      render: (row: any) => {
        if (row.isLateFeeRecord) return null;

        return (
          <Box>
            {row.lateFeeAmount > 0 ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                  <Typography
                    variant="body2"
                    color="warning.main"
                    fontWeight="bold"
                    sx={{
                      textDecoration: row.lateFeeCustomized ? 'underline' : 'none',
                      textDecorationStyle: 'dotted',
                    }}
                  >
                    ৳{row.lateFeeAmount?.toLocaleString()}
                  </Typography>
                  {row.lateFeeCustomized && (
                    <Tooltip title="Customized">
                      <Edit sx={{ fontSize: 14, color: 'success.main' }} />
                    </Tooltip>
                  )}
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.625rem', display: 'block' }}>
                  {row.lateFeeDays || 0} days @ ৳{row.lateFeePerDay || 100}/day
                </Typography>
                {row.lateFeeApplied && (
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.625rem' }}>
                    Applied: {row.lateFeeAppliedDate ? new Date(row.lateFeeAppliedDate).toLocaleDateString() : ''}
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

        const today = new Date();
        const dueDate = row.dueDate ? new Date(row.dueDate) : null;
        const isOverdue = dueDate && dueDate < today && row.status !== 'paid';

        if (row.lateFeeAmount > 0) {
          return (
            <Chip
              label={row.lateFeeCustomized ? "Customized" : "Late Fee Applied"}
              size="small"
              color={row.lateFeeCustomized ? "success" : "warning"}
              variant={row.lateFeeCustomized ? "filled" : "outlined"}
              sx={{ height: 24, fontWeight: 'bold' }}
              icon={row.lateFeeCustomized ? <CheckCircle /> : undefined}
            />
          );
        } else if (isOverdue) {
          return (
            <Chip
              label="Overdue"
              size="small"
              color="error"
              variant="outlined"
              sx={{ height: 24 }}
            />
          );
        } else {
          return (
            <Chip
              label="On Time"
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
              variant="outlined"
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

  // Define row actions with customization option
  const rowActions: RowAction[] = [
    {
      label: "View Details",
      icon: <Visibility fontSize="small" />,
      onClick: (row) => onView?.(row),
      color: "info",
      tooltip: "View fee details",
    },
    {
      label: "Apply Discount/Waiver",
      icon: <Discount fontSize="small" />,
      onClick: (row) => handleAdjustmentClick(row),
      color: "success",
      tooltip: "Apply discount or waiver",
    },
    {
      label: "Customize Late Fee",
      icon: <WarningIcon fontSize="small" />,
      onClick: (row) => handleCustomizeLateFeeClick(row),
      color: "warning",
      tooltip: "Customize late fee amount",
      // disabled: (row) => !row.lateFeeAmount || row.lateFeeAmount === 0 || row.status === "paid",
      inMenu: true,
    },
    {
      label: "Make Payment",
      icon: <Payment fontSize="small" />,
      onClick: (row) => handlePayClick(row),
      color: "primary",
      tooltip: "Make payment",
      disabled: (row) => row.status === "paid",
    },
    {
      label: "Download Receipt",
      icon: <Download fontSize="small" />,
      onClick: (row) => onDownload?.(row),
      color: "secondary",
      tooltip: "Download payment receipt",
      disabled: (row) => row.status === "unpaid" || row.paidAmount === 0,
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
        Student Fee Management
      </Typography>

      {/* Summary Cards */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <Paper
          sx={{ p: 2, minWidth: 150, bgcolor: "primary.light", color: "white" }}
        >
          <Typography variant="subtitle2">Total Fees</Typography>
          <Typography variant="h6">
            ৳{summary.totalFees?.toLocaleString() || 0}
          </Typography>
        </Paper>
        <Paper
          sx={{ p: 2, minWidth: 150, bgcolor: "success.light", color: "white" }}
        >
          <Typography variant="subtitle2">Total Paid</Typography>
          <Typography variant="h6">
            ৳{summary.totalPaid?.toLocaleString() || 0}
          </Typography>
        </Paper>
        <Paper
          sx={{ p: 2, minWidth: 150, bgcolor: "error.light", color: "white" }}
        >
          <Typography variant="subtitle2">Total Due</Typography>
          <Typography variant="h6">
            ৳{summary.totalDue?.toLocaleString() || 0}
          </Typography>
        </Paper>
        <Paper
          sx={{ p: 2, minWidth: 150, bgcolor: "warning.light", color: "white" }}
        >
          <Typography variant="subtitle2">Total Adjustments</Typography>
          <Typography variant="h6">
            ৳{summary.totalAdjustments?.toLocaleString() || 0}
          </Typography>
          <Typography variant="caption">
            Discount: ৳{summary.totalDiscount?.toLocaleString() || 0} | Waiver: ৳
            {summary.totalWaiver?.toLocaleString() || 0}
          </Typography>
        </Paper>
        <Paper
          sx={{ p: 2, minWidth: 150, bgcolor: "secondary.light", color: "white" }}
        >
          <Typography variant="subtitle2">Late Fee Summary</Typography>
          <Typography variant="h6">
            ৳{lateFeeSummary.totalLateFees?.toLocaleString() || 0}
          </Typography>
          <Typography variant="caption">
            Customized: {lateFeeSummary.totalCustomized} | Overdue: {lateFeeSummary.totalOverdue}
          </Typography>
        </Paper>
      </Box>

      {/* Fee Records Table */}
      <CraftTable
        title={`${feeTypeFilter === "all" ? "All" : feeTypeFilter} Fee Records`}
        subtitle={`Total ${studentFees?.length || 0} fee records found`}
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
        onRefresh={refetch || (() => window.location.reload())}
        onExport={() => {
          console.log("Exporting fee data...");
        }}
        onAdd={handleAddFeeClick}
        customToolbar={
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<AttachMoney />}
              onClick={() => setBulkPaymentModalOpen(true)}
              disabled={
                !studentFees?.filter((fee) => fee.dueAmount > 0).length
              }
              sx={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
                },
              }}
            >
              Bulk Payment
            </Button>
            <Button
              variant="outlined"
              startIcon={<Discount />}
              onClick={() => alert("Bulk adjustment feature coming soon!")}
              sx={{ textTransform: "none" }}
            >
              Bulk Adjustment
            </Button>
          </Box>
        }
        bulkActions={[
          {
            label: "Apply Bulk Discount",
            icon: <Discount fontSize="small" />,
            onClick: (selectedRows) => {
              console.log("Applying bulk discount to:", selectedRows);
              alert(
                `Applying discount to ${selectedRows.length} selected fees`
              );
            },
          },
          {
            label: "Apply Bulk Late Fee Customization",
            icon: <WarningIcon fontSize="small" />,
            onClick: (selectedRows) => {
              console.log("Applying bulk late fee customization to:", selectedRows);
              alert(
                `Bulk late fee customization for ${selectedRows.length} fees - Coming soon!`
              );
            },
          },
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

      {/* Bulk Payment Modal */}
      <BulkPaymentModal
        open={bulkPaymentModalOpen}
        onClose={() => setBulkPaymentModalOpen(false)}
        student={student}
        fees={studentFees?.filter((fee) => fee.dueAmount > 0) || []}
        refetch={refetch || (() => window.location.reload())}
      />
    </Box>
  );
};

export default StudentFee;