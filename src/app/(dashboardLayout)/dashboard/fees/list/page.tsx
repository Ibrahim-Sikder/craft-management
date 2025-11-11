/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import StatsGrid from "@/components/StatsCard/StatsGrid";
import CraftTable, { Column, RowAction } from "@/components/Table";
import { useDeleteFeeMutation, useGetAllFeesQuery } from "@/redux/api/feesApi";
import {
  AccountBalance as AccountBalanceIcon,
  Add as AddIcon,
  Delete,
  Edit,
  FileDownload,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  Visibility,
} from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useMemo, useState } from "react";
import FeeDetailsModal from "../__components/FeeDetailsModal";

export default function FeesListPage() {
  const { data: feesData, isLoading, error } = useGetAllFeesQuery({});
  console.log("fee data check ", feesData);
  const [deleteFee] = useDeleteFeeMutation();
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewFee = (row: any) => {
    setSelectedFee(row);
    setModalOpen(true);
  };
  const handleEditFee = (fee: any) => {
    console.log(fee);
  };

  const statsData = useMemo(() => {
    const fees = feesData?.data?.data || [];
    const totalFees = fees.reduce(
      (sum: number, fee: any) => sum + (fee.amount || 0),
      0
    );
    const totalRecords = fees.length;
    const averageFee = totalRecords > 0 ? totalFees / totalRecords : 0;
    const feeTypes = new Set(fees.map((fee: any) => fee.feeType)).size;

    return [
      {
        title: "Total Fees",
        value: `৳${totalFees.toLocaleString()}`,
        icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
      {
        title: "Total Records",
        value: totalRecords,
        icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      },
      {
        title: "Average Fee",
        value: `৳${averageFee.toFixed(2)}`,
        icon: <TrendingDownIcon sx={{ fontSize: 40 }} />,
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      },
      {
        title: "Fee Types",
        value: feeTypes,
        icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
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
      id: "enrollment.className",
      label: "Class",
      minWidth: 100,
      sortable: true,
      filterable: true,
      render: (row: any) => row.enrollment?.className || "N/A",
    },
    {
      id: "enrollment.section",
      label: "Section",
      minWidth: 80,
      sortable: true,
      filterable: true,
      render: (row: any) => row.enrollment?.section || "N/A",
    },
    {
      id: "enrollment.rollNumber",
      label: "Roll No",
      minWidth: 80,
      sortable: true,
      filterable: true,
      render: (row: any) => row.enrollment?.rollNumber || "N/A",
    },
    {
      id: "month",
      label: "Month",
      minWidth: 100,
      sortable: true,
      filterable: true,
      render: (row: any) => row.month || "N/A",
    },
    {
      id: "feeType",
      label: "Fee Type",
      minWidth: 120,
      sortable: true,
      filterable: true,
      type: "status",
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
    },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      sortable: true,
      type: "status",
    },
    {
      id: "paymentMethod",
      label: "Payment Method",
      minWidth: 120,
      sortable: true,
    },
    {
      id: "paymentDate",
      label: "Payment Date",
      minWidth: 120,
      sortable: true,
      type: "date",
      render: (row: any) => {
        if (!row.paymentDate) return "N/A";
        return new Date(row.paymentDate).toLocaleDateString();
      },
    },
  ];

  const rowActions: RowAction[] = [
    {
      label: "View",
      icon: <Visibility fontSize="small" />,
      onClick: (row: any) => handleViewFee(row),
      color: "info" as const,
      tooltip: "View fee details",
    },
    {
      label: "Edit",
      icon: <Edit fontSize="small" />,
      onClick: (row: any) => console.log("Edit fee:", row),
      color: "primary" as const,
      tooltip: "Edit fee",
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
      tooltip: "Delete fee",
    },
  ];

  const bulkActions = [
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
    {
      label: "Export Selected",
      icon: <FileDownload fontSize="small" />,
      onClick: (selectedRows: any[]) => {
        console.log("Exporting:", selectedRows);
        // Implement export functionality
      },
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

  const handleAdd = () => {};
  const tableData = feesData?.data?.data || [];

  return (
    <Box>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
            }}
          >
            Fee Management
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)" }}>
            Track and manage all student fee payments
          </Typography>
        </Box>

        {/* Stats Cards using reusable component */}
        <StatsGrid stats={statsData} />

        {/* Enhanced Table */}
        <CraftTable
          title="Fee Records"
          subtitle="Manage and track all fee payments"
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
            <Link href="/dashboard/fees/add" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: "1rem",
                  px: 3,
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
                onClick={handleAdd}
              >
                Add New Fee
              </Button>
            </Link>
          }
          elevation={2}
          borderRadius={3}
          showRowNumbers={true}
          loadingOverlay={true}
          fadeIn={true}
        />

        {/* Fee Details Modal - Now as separate component */}
        <FeeDetailsModal
          open={modalOpen}
          setOpen={setModalOpen}
          selectedFee={selectedFee}
          onEdit={handleEditFee}
        />
      </Container>
    </Box>
  );
}
