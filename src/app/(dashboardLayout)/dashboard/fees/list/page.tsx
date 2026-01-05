// app/dashboard/fees/list/page.tsx (Updated)
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FeeAdjustmentModal from "@/components/FeeAdjustmentModal";
import StatsGrid from "@/components/StatsCard/StatsGrid";
import CraftTable, { Column, RowAction } from "@/components/Table";
import { useDeleteFeeMutation, useGetAllFeesQuery } from "@/redux/api/feesApi";
import {
  AccountBalance as AccountBalanceIcon,
  Add as AddIcon,
  Delete,
  Discount,
  Edit,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  Visibility,
} from "@mui/icons-material";
import { Box, Button, Chip, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useMemo, useState } from "react";
import FeeDetailsModal from "../__components/FeeDetailsModal";

export default function FeesListPage() {
  const { data: feesData, isLoading, error } = useGetAllFeesQuery({});
  const [deleteFee] = useDeleteFeeMutation();
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [adjustmentModalOpen, setAdjustmentModalOpen] = useState(false);

  const handleViewFee = (row: any) => {
    setSelectedFee(row);
    setDetailsModalOpen(true);
  };

  const handleApplyAdjustment = async (adjustmentData: any) => {
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
        window.location.reload();
      } else {
        throw new Error("Failed to apply adjustment");
      }
    } catch (error) {
      console.error("Error applying adjustment:", error);
      alert("Failed to apply adjustment");
    }
  };

  const handleOpenAdjustment = (row: any) => {
    setSelectedFee(row);
    setAdjustmentModalOpen(true);
  };

  const statsData = useMemo(() => {
    const fees = feesData?.data?.data || [];
    const totalFees = fees.reduce(
      (sum: number, fee: any) => sum + (fee.amount || 0),
      0
    );
    const totalPaid = fees.reduce(
      (sum: number, fee: any) => sum + (fee.paidAmount || 0),
      0
    );
    const totalDue = fees.reduce(
      (sum: number, fee: any) => sum + (fee.dueAmount || 0),
      0
    );
    const totalDiscount = fees.reduce(
      (sum: number, fee: any) => sum + (fee.discount || 0),
      0
    );
    const totalWaiver = fees.reduce(
      (sum: number, fee: any) => sum + (fee.waiver || 0),
      0
    );

    return [
      {
        title: "Total Fees",
        value: `৳${totalFees.toLocaleString()}`,
        icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
      {
        title: "Total Paid",
        value: `৳${totalPaid.toLocaleString()}`,
        icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      },
      {
        title: "Total Due",
        value: `৳${totalDue.toLocaleString()}`,
        icon: <TrendingDownIcon sx={{ fontSize: 40 }} />,
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      },
      {
        title: "Total Adjustments",
        value: `৳${(totalDiscount + totalWaiver).toLocaleString()}`,
        icon: <Discount sx={{ fontSize: 40 }} />,
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        subValue: `Discount: ৳${totalDiscount.toLocaleString()} | Waiver: ৳${totalWaiver.toLocaleString()}`,
      },
    ];
  }, [feesData]);

  const columns: Column[] = [
    {
      id: "student.name",
      label: "Student Name",
      minWidth: 150,
      sortable: true,
      filterable: true,
      render: (row: any) => row.student?.name || "N/A",
    },
    {
      id: "class",
      label: "Class",
      minWidth: 100,
      sortable: true,
      filterable: true,
    },
    {
      id: "month",
      label: "Month",
      minWidth: 100,
      sortable: true,
      filterable: true,
    },
    {
      id: "feeType",
      label: "Fee Type",
      minWidth: 120,
      sortable: true,
      filterable: true,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 100,
      align: "right" as const,
      sortable: true,
      format: (value: number) => `৳${value?.toLocaleString() || "0"}`,
    },
    {
      id: "discount",
      label: "Discount",
      minWidth: 90,
      align: "right" as const,
      sortable: true,
      format: (value: number) =>
        value > 0 ? `-৳${value?.toLocaleString()}` : "৳0",
      render: (row: any) => (
        <Typography color="error" variant="body2">
          {row.discount > 0 ? `-৳${row.discount.toLocaleString()}` : "৳0"}
        </Typography>
      ),
    },
    {
      id: "waiver",
      label: "Waiver",
      minWidth: 90,
      align: "right" as const,
      sortable: true,
      format: (value: number) =>
        value > 0 ? `-৳${value?.toLocaleString()}` : "৳0",
      render: (row: any) => (
        <Typography color="error" variant="body2">
          {row.waiver > 0 ? `-৳${row.waiver.toLocaleString()}` : "৳0"}
        </Typography>
      ),
    },
    {
      id: "paidAmount",
      label: "Paid",
      minWidth: 100,
      align: "right" as const,
      sortable: true,
      format: (value: number) => `৳${value?.toLocaleString() || "0"}`,
    },
    {
      id: "dueAmount",
      label: "Due",
      minWidth: 100,
      align: "right" as const,
      sortable: true,
      format: (value: number) => `৳${value?.toLocaleString() || "0"}`,
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
      id: "status",
      label: "Status",
      minWidth: 100,
      sortable: true,
      render: (row: any) => (
        <Chip
          label={row.status}
          color={
            row.status === "paid"
              ? "success"
              : row.status === "partial"
                ? "warning"
                : "error"
          }
          size="small"
        />
      ),
    },
  ];

  const rowActions: RowAction[] = [
    {
      label: "View Details",
      icon: <Visibility fontSize="small" />,
      onClick: (row: any) => handleViewFee(row),
      color: "info" as const,
    },
    {
      label: "Apply Discount",
      icon: <Discount fontSize="small" />,
      onClick: (row: any) => handleOpenAdjustment(row),
      color: "success" as const,
      tooltip: "Apply discount/waiver",
    },
    {
      label: "Edit",
      icon: <Edit fontSize="small" />,
      onClick: (row: any) => console.log("Edit fee:", row),
      color: "primary" as const,
    },
    {
      label: "Delete",
      icon: <Delete fontSize="small" />,
      onClick: (row: any) => {
        if (confirm("Are you sure you want to delete this fee record?")) {
          deleteFee(row._id);
        }
      },
      color: "error" as const,
    },
  ];

  const bulkActions = [
    {
      label: "Apply Bulk Discount",
      icon: <Discount fontSize="small" />,
      onClick: (selectedRows: any[]) => {
        // Implement bulk discount functionality
        console.log("Bulk discount for:", selectedRows);
      },
    },
    {
      label: "Delete Selected",
      icon: <Delete fontSize="small" />,
      onClick: (selectedRows: any[]) => {
        if (
          confirm(
            `Are you sure you want to delete ${selectedRows.length} records?`
          )
        ) {
          selectedRows.forEach((row) => deleteFee(row._id));
        }
      },
      color: "error" as const,
    },
  ];

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleExport = () => {
    console.log("Export all data");
  };

  const handlePrint = () => {
    window.print();
  };

  const tableData = feesData?.data?.data || [];

  return (
    <Box>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Fee Management
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Track and manage all student fee payments with discount/waiver
            support
          </Typography>
        </Box>

        <StatsGrid stats={statsData} />

        <CraftTable
          title="Fee Records"
          subtitle="Manage fees with discount and waiver support"
          columns={columns}
          data={tableData}
          loading={isLoading}
          error={error ? "Failed to load fee data" : undefined}
          onRefresh={handleRefresh}
          onExport={handleExport}
          onPrint={handlePrint}
          rowActions={rowActions}
          bulkActions={bulkActions}
          selectable={true}
          searchable={true}
          filterable={true}
          sortable={true}
          pagination={true}
          emptyStateMessage="No fee records found"
          idField="_id"
          height="600px"
          stickyHeader={true}
          hover={true}
          showToolbar={true}
          customToolbar={
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link
                href="/dashboard/fees/adjustments"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="outlined"
                  startIcon={<Discount />}
                  sx={{
                    borderRadius: "12px",
                    textTransform: "none",
                  }}
                >
                  Manage Adjustments
                </Button>
              </Link>
              <Link
                href="/dashboard/fees/add"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "12px",
                    textTransform: "none",
                  }}
                >
                  Add New Fee
                </Button>
              </Link>
            </Box>
          }
        />

        {/* Fee Details Modal */}
        <FeeDetailsModal
          open={detailsModalOpen}
          setOpen={setDetailsModalOpen}
          selectedFee={selectedFee}
          onEdit={() => console.log("Edit fee")}
        />

        {/* Fee Adjustment Modal */}
        <FeeAdjustmentModal
          open={adjustmentModalOpen}
          onClose={() => setAdjustmentModalOpen(false)}
          fee={selectedFee}
          onApplyAdjustment={handleApplyAdjustment}
        />
      </Container>
    </Box>
  );
}
