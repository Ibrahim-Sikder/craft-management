/* eslint-disable @typescript-eslint/no-explicit-any */
// app/enrollments/page.tsx
"use client";

import React, { useState, useEffect } from "react";
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

// Calculate total fees from actual fee structure
const calculateTotalFees = (fees: any[]) => {
  if (!fees || !Array.isArray(fees) || fees.length === 0) {
    return { total: 0, paid: 0, due: 0, discount: 0, waiver: 0 };
  }

  let total = 0;
  let paid = 0;
  let due = 0;
  let discount = 0;
  let waiver = 0;

  fees.forEach((fee: any) => {
    const amount = Number(fee.amount) || 0;
    const paidAmount = Number(fee.paidAmount) || 0;
    const discountAmount = Number(fee.discount) || 0;
    const waiverAmount = Number(fee.waiver) || 0;
    const dueAmount = Number(fee.dueAmount) || 0;

    total += amount;
    paid += paidAmount;
    due += dueAmount;
    discount += discountAmount;
    waiver += waiverAmount;
  });

  return { total, paid, due, discount, waiver };
};

// Determine payment status based on fees
const getPaymentStatus = (fees: any[]) => {
  if (!fees || !Array.isArray(fees) || fees.length === 0) {
    return "unpaid";
  }

  const { total, paid } = calculateTotalFees(fees);

  if (paid >= total) return "paid";
  if (paid > 0) return "partial";
  return "unpaid";
};

export default function EnrollmentsPage() {
  const router = useRouter();
  const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [feeCollectionOpen, setFeeCollectionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // State for server-side operations
  const [sortColumn, setSortColumn] = useState("studentName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [deleteEnrollment] = useDeleteEnrollmentMutation();

  // Build query parameters for server-side operations
  const queryParams: any = {
    page: page + 1, // Backend expects 1-based, frontend uses 0-based
    limit: rowsPerPage,
  };

  // Add sort parameter if sortColumn is set
  if (sortColumn) {
    queryParams.sort = sortDirection === "desc" ? `-${sortColumn}` : sortColumn;
  }

  // Add search term if provided
  if (searchTerm) {
    queryParams.searchTerm = searchTerm;
  }

  // Fetch data with server-side parameters
  const {
    data: enrollmentData,
    isLoading,
    error,
    refetch,
  } = useGetAllEnrollmentsQuery(queryParams);

  // Update total count when data loads
  useEffect(() => {
    if (enrollmentData?.data?.meta?.total) {
      setTotalCount(enrollmentData.data.meta.total);
    }
  }, [enrollmentData]);

  console.log("Enrollment query params:", queryParams);
  console.log("Enrollment data:", enrollmentData);

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
      // Get the class name(s) - handle both string and object formats
      const className = enrollment.className
        ? Array.isArray(enrollment.className)
          ? enrollment.className
              .map((cls: any) =>
                typeof cls === "object" ? cls.className : cls
              )
              .join(", ")
          : enrollment.className
        : "N/A";

      // Get student name from enrollment or student object
      const studentName =
        enrollment.studentName ||
        enrollment.name ||
        enrollment.student?.name ||
        "Unknown";

      // Get student ID
      const studentId =
        enrollment.studentId ||
        enrollment.student?.studentId ||
        enrollment._id.slice(-6);

      // Get father name
      const fatherName =
        enrollment.fatherName ||
        enrollment.fatherNameBangla ||
        enrollment.student?.fatherName ||
        "N/A";

      // Calculate fees
      const { total, paid, due, discount, waiver } = calculateTotalFees(
        enrollment.fees || []
      );

      // Determine payment status
      const paymentStatus = getPaymentStatus(enrollment.fees || []);

      // Determine overall status
      const status = enrollment.status || "active";

      return {
        id: enrollment._id,
        enrollmentId: enrollment._id,
        studentId: studentId,
        studentName: studentName,
        studentNameBangla:
          enrollment.nameBangla || enrollment.student?.nameBangla || "",
        fatherName: fatherName,
        fatherNameBangla: enrollment.fatherNameBangla || "",
        motherName:
          enrollment.motherName || enrollment.motherNameBangla || "N/A",
        motherNameBangla: enrollment.motherNameBangla || "",
        fatherIncome:
          enrollment.fatherIncome || enrollment.student?.fatherIncome || 0,
        motherIncome:
          enrollment.motherIncome || enrollment.student?.motherIncome || 0,
        fatherNid: enrollment.fatherNid || "N/A",
        motherNid: enrollment.motherNid || "N/A",
        mobileNo: enrollment.mobileNo || enrollment.student?.mobile || "N/A",
        guardianInfo: enrollment.guardianInfo ||
          enrollment.student?.guardianInfo || {
            name: "N/A",
            relation: "N/A",
            mobile: "N/A",
          },
        birthDate: enrollment.birthDate
          ? new Date(enrollment.birthDate).toLocaleDateString()
          : "N/A",
        nationality: enrollment.nationality || "Bangladeshi",
        className: className,
        studentDepartment:
          enrollment.studentDepartment ||
          enrollment.student?.studentDepartment ||
          "N/A",
        studentType:
          enrollment.studentType || enrollment.student?.studentType || "N/A",
        status: status,
        paymentStatus: paymentStatus,
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
        discountAmount: discount,
        waiverAmount: waiver,
        fees: enrollment.fees || [],
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
              ID: {row.studentId} • {row.fatherName}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: "className",
      label: "Class",
      minWidth: 150,
      sortable: true,
      filterable: true,
      filterOptions: [
        { label: "One", value: "One" },
        { label: "Five", value: "Five" },
        { label: "Nazera", value: "Nazera" },
      ],
      render: (row: any) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {row.className}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {row.studentDepartment} • {row.studentType}
          </Typography>
        </Box>
      ),
    },
    {
      id: "mobileNo",
      label: "Contact",
      minWidth: 120,
      sortable: true,
      filterable: true,
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
      render: (row: any) => {
        const percentage =
          row.totalFees > 0 ? (row.paidAmount / row.totalFees) * 100 : 0;
        return (
          <Box sx={{ minWidth: 120 }}>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: "grey.200",
                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    percentage >= 100
                      ? "success.main"
                      : percentage > 0
                        ? "warning.main"
                        : "error.main",
                },
              }}
            />
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              ৳{row.paidAmount} / ৳{row.totalFees}
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
        );
      },
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
          ৳{value}
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
      ],
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
                refetch();
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
            selectedRows.forEach((row) => {
              deleteEnrollment(row.id).unwrap();
            });
            Swal.fire({
              title: "Deleted!",
              text: `The ${selectedRows.length} enrollment(s) have been deleted successfully.`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            refetch();
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

  // New handlers for server-side operations
  const handleSortChange = (column: string, direction: "asc" | "desc") => {
    setSortColumn(column);
    setSortDirection(direction);
    setPage(0); // Reset to first page when sorting changes
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to first page
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setPage(0); // Reset to first page on search
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
        defaultSortColumn={sortColumn}
        defaultSortDirection={sortDirection}
        striped={true}
        showRowNumbers={true}
        fadeIn={true}
        elevation={3}
        borderRadius={2}
        headerBackgroundColor="#f5f5f5"
        // Server-side sorting and pagination
        serverSideSorting={true}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onSearchChange={handleSearchChange}
        rowCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
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
