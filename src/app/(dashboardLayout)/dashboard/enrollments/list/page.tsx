/* eslint-disable @typescript-eslint/no-explicit-any */
// app/enrollments/page.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Button,
  LinearProgress,
} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  Person,
  FileDownload,
  AttachMoney,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  useDeleteEnrollmentMutation,
  useGetAllEnrollmentsQuery,
} from "@/redux/api/enrollmentApi";
import Table, { BulkAction, Column, RowAction } from "@/components/Table";
import EnrollmentDetailsModal from "../__components/EnrollmentDetailsModal";
import FeeCollectionModal from "../__components/FeeCollectionModal";

// Helper function to calculate total fees from fee array
const calculateTotalFees = (fees: any[], paymentStatus: string) => {
  if (!fees || !Array.isArray(fees)) return { total: 0, paid: 0, due: 0 };

  // Using placeholder values - in a real app, fetch actual fee data
  const total = fees.length * 1000; // Placeholder: $1000 per fee
  let paid = 0;

  if (paymentStatus === "paid") {
    paid = total;
  } else if (paymentStatus === "partial") {
    paid = total * 0.5; // Placeholder: 50% paid
  }

  const due = total - paid;

  return { total, paid, due };
};

export default function EnrollmentsPage() {
  const router = useRouter();
  const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [feeCollectionOpen, setFeeCollectionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [deleteEnrollment] = useDeleteEnrollmentMutation();

  // Fetch enrollments from API
  const {
    data: enrollmentData,
    isLoading,
    error,
    refetch,
  } = useGetAllEnrollmentsQuery({});

  // Transform the enrollment data for display
  const transformedEnrollments = React.useMemo(() => {
    if (
      !enrollmentData ||
      !enrollmentData.data ||
      !Array.isArray(enrollmentData.data.data)
    ) {
      return [];
    }

    return enrollmentData.data.data.map((enrollment: any) => {
      const { total, paid, due } = calculateTotalFees(
        enrollment.fees || [],
        enrollment.paymentStatus
      );

      return {
        id: enrollment._id || enrollment.id,
        studentName: enrollment.name || "Unknown",
        studentNameBangla: enrollment.nameBangla || "",
        fatherName: enrollment.fatherName || "N/A",
        fatherNameBangla: enrollment.fatherNameBangla || "",
        motherName: enrollment.motherName || "N/A",
        motherNameBangla: enrollment.motherNameBangla || "",
        fatherIncome: enrollment.fatherIncome || 0,
        motherIncome: enrollment.motherIncome || 0,
        fatherNid: enrollment.fatherNid || "N/A",
        motherNid: enrollment.motherNid || "N/A",
        mobileNo: enrollment.mobileNo || "N/A",
        guardianInfo: enrollment.guardianInfo || {
          name: "N/A",
          relation: "N/A",
          mobile: "N/A",
        },
        birthDate: enrollment.birthDate
          ? new Date(enrollment.birthDate).toLocaleDateString()
          : "N/A",
        nationality: enrollment.nationality || "N/A",
        className: enrollment.className || "N/A",
        studentDepartment: enrollment.studentDepartment || "N/A",
        studentType: enrollment.studentType || "N/A",
        status: enrollment.status || "active",
        paymentStatus: enrollment.paymentStatus || "pending",
        admissionType: enrollment.admissionType || "N/A",
        presentAddress: enrollment.presentAddress || {
          policeStation: "N/A",
          district: "N/A",
        },
        permanentAddress: enrollment.permanentAddress || {
          policeStation: "N/A",
          district: "N/A",
        },
        documents: enrollment.documents || {},
        termsAccepted: enrollment.termsAccepted || false,
        totalFees: total,
        paidAmount: paid,
        dueAmount: due,
        rawData: enrollment,
      };
    });
  }, [enrollmentData]);

  // Define table columns with filter options
  const columns: Column[] = [
    {
      id: "studentName",
      label: "Student",
      minWidth: 200,
      sortable: true,
      filterable: true,
      render: (row: any) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 40, height: 40 }}>
            <Person />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {row.studentName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {row.id.slice(-6)} • {row.fatherName}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: "className",
      label: "Class Info",
      minWidth: 180,
      sortable: true,
      filterable: true,
      filterOptions: [
        { label: "Class 1", value: "Class 1" },
        { label: "Class 2", value: "Class 2" },
        { label: "Class 3", value: "Class 3" },
        { label: "Class 4", value: "Class 4" },
        { label: "Class 5", value: "Class 5" },
      ],
      render: (row: any) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {row.className}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dept: {row.studentDepartment} • Type: {row.studentType}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {row.admissionType}
          </Typography>
        </Box>
      ),
    },
    {
      id: "paymentStatus",
      label: "Payment",
      minWidth: 150,
      sortable: true,
      filterable: true,
      type: "progress",
      filterOptions: [
        { label: "Paid", value: "paid" },
        { label: "Partial", value: "partial" },
        { label: "Unpaid", value: "unpaid" },
      ],
      render: (row: any) => (
        <Box sx={{ minWidth: 120 }}>
          <LinearProgress
            variant="determinate"
            value={
              row.totalFees > 0 ? (row.paidAmount / row.totalFees) * 100 : 0
            }
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "grey.200",
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  row.totalFees > 0 && row.paidAmount >= row.totalFees
                    ? "success.main"
                    : row.paidAmount > 0
                      ? "warning.main"
                      : "error.main",
              },
            }}
          />
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            ${row.paidAmount} / ${row.totalFees}
          </Typography>
          <Chip
            label={row.paymentStatus}
            color={
              row.paymentStatus === "paid"
                ? "success"
                : row.paymentStatus === "partial"
                  ? "warning"
                  : "error"
            }
            size="small"
            variant="filled"
          />
        </Box>
      ),
    },
    {
      id: "dueAmount",
      label: "Due Amount",
      minWidth: 120,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => (
        <Typography
          variant="body1"
          fontWeight="bold"
          color={value > 0 ? "error.main" : "success.main"}
        >
          ${value}
        </Typography>
      ),
    },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      sortable: true,
      filterable: true,
      type: "status",
      filterOptions: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Pending", value: "pending" },
      ],
    },
    {
      id: "mobileNo",
      label: "Contact",
      minWidth: 120,
      sortable: true,
      filterable: true,
    },
  ];

  // Define row actions
  const rowActions: RowAction[] = [
    {
      label: "Fee Collect",
      icon: <AttachMoney fontSize="small" />,
      onClick: (row) => {
        setSelectedEnrollment(row);
        setFeeCollectionOpen(true);
      },
      color: "success",
      tooltip: "Collect Fee Payment",
      disabled: (row) => row.dueAmount <= 0,
    },
    {
      label: "View Details",
      icon: <Visibility fontSize="small" />,
      onClick: (row) => {
        setSelectedEnrollment(row);
        setDetailDialogOpen(true);
      },
      tooltip: "View Details",
    },
    {
      label: "Edit",
      icon: <Edit fontSize="small" />,
      onClick: (row) => {
        router.push(`/dashboard/enrollments?id=${row.id}`);
      },
      tooltip: "Edit Enrollment",
    },
    {
      label: "Delete",
      icon: <Delete fontSize="small" />,
      onClick: (row) => {
        Swal.fire({
          title: "Are you sure?",
          html: `You are about to delete <strong>${row.studentName}</strong>'s enrollment record. This action cannot be undone.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteEnrollment(row.id)
              .unwrap()
              .then(() => {
                Swal.fire({
                  title: "Deleted!",
                  text: "The enrollment has been deleted successfully.",
                  icon: "success",
                  timer: 2000,
                  showConfirmButton: false,
                });
              })
              .catch((error) => {
                Swal.fire({
                  title: "Error!",
                  text:
                    error.data?.message ||
                    "Failed to delete enrollment. Please try again.",
                  icon: "error",
                  confirmButtonColor: "#3085d6",
                });
              });
          }
        });
      },
      color: "error",
      tooltip: "Delete Enrollment",
    },
  ];

  // Define bulk actions
  const bulkActions: BulkAction[] = [
    {
      label: "Export Selected",
      icon: <FileDownload fontSize="small" />,
      onClick: (selectedRows) => {
        console.log("Export selected rows:", selectedRows);
        Swal.fire({
          title: "Export",
          text: `Exporting ${selectedRows.length} enrollment(s)...`,
          icon: "info",
          timer: 2000,
          showConfirmButton: false,
        });
      },
    },
    {
      label: "Collect Fees",
      icon: <AttachMoney fontSize="small" />,
      onClick: (selectedRows) => {
        const hasDueAmount = selectedRows.some((row) => row.dueAmount > 0);
        if (!hasDueAmount) {
          Swal.fire({
            title: "No Due Amount",
            text: "Selected enrollments have no due amount to collect.",
            icon: "info",
            confirmButtonColor: "#3085d6",
          });
          return;
        }

        Swal.fire({
          title: "Bulk Fee Collection",
          html: `You are about to collect fees from <strong>${selectedRows.length}</strong> student(s).`,
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#1976d2",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Continue",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            console.log("Bulk fee collection for:", selectedRows);
            Swal.fire({
              title: "Processing...",
              text: "Please wait while we process the payments.",
              icon: "info",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
      },
      color: "success",
    },
    {
      label: "Delete Selected",
      icon: <Delete fontSize="small" />,
      onClick: (selectedRows) => {
        Swal.fire({
          title: "Are you sure?",
          html: `You are about to delete <strong>${selectedRows.length}</strong> enrollment record(s). This action cannot be undone.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete them!",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            console.log("Delete selected rows:", selectedRows);
            Swal.fire({
              title: "Deleted!",
              text: `The ${selectedRows.length} enrollment(s) have been deleted successfully.`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
      },
      color: "error",
    },
  ];

  // Handler functions
  const handleCloseDetails = () => {
    setDetailDialogOpen(false);
    setSelectedEnrollment(null);
    setActiveTab(0);
  };

  const handleCloseFeeCollection = () => {
    setFeeCollectionOpen(false);
    setSelectedEnrollment(null);
  };

  const handleEditEnrollment = (enrollment: any) => {
    handleCloseDetails();
    router.push(`/dashboard/enrollments?id=${enrollment.id}`);
  };

  const handleCollectFee = (enrollment: any) => {
    handleCloseDetails();
    setSelectedEnrollment(enrollment);
    setFeeCollectionOpen(true);
  };

  const handleExport = () => {
    console.log("Export all enrollments");
    Swal.fire({
      title: "Export",
      text: "Exporting all enrollments...",
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handlePrint = () => {
    console.log("Print enrollments");
    window.print();
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "grey.50", minHeight: "100vh" }}>
      <Table
        title="Student Enrollments"
        subtitle="Manage and track all student admissions"
        columns={columns}
        data={transformedEnrollments}
        loading={isLoading}
        error={
          error
            ? "Error loading enrollment data. Please try again later."
            : undefined
        }
        onRefresh={refetch}
        onExport={handleExport}
        onPrint={handlePrint}
        rowActions={rowActions}
        bulkActions={bulkActions}
        selectable={true}
        searchable={true}
        filterable={true}
        sortable={true}
        pagination={true}
        emptyStateMessage="No enrollments found"
        defaultSortColumn="studentName"
        defaultSortDirection="asc"
        striped={true}
        showRowNumbers={true}
        fadeIn={true}
        elevation={3}
        borderRadius={2}
        headerBackgroundColor="#f5f5f5"
        customToolbar={
          <Button
            variant="contained"
            startIcon={<Person />}
            onClick={() => router.push("/dashboard/enrollments")}
          >
            New Enrollment
          </Button>
        }
      />

      {/* Enrollment Details Modal */}
      <EnrollmentDetailsModal
        open={detailDialogOpen}
        setOpen={handleCloseDetails}
        enrollment={selectedEnrollment}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onEdit={handleEditEnrollment}
        onCollectFee={handleCollectFee}
      />

      {/* Fee Collection Modal */}
      <FeeCollectionModal
        setOpen={handleCloseFeeCollection}
        open={feeCollectionOpen}
        onClose={handleCloseFeeCollection}
        enrollment={selectedEnrollment}
      />
    </Box>
  );
}
