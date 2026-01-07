/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Table, { BulkAction, Column, RowAction } from "@/components/Table";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import {
  useDeleteEnrollmentMutation,
  useGetAllEnrollmentsQuery,
} from "@/redux/api/enrollmentApi";
import {
  Add,
  ArrowForward,
  Assessment,
  AttachMoney,
  Delete,
  Edit,
  FileDownload,
  History,
  Money,
  Person,
  Refresh,
  Visibility,
  RestartAlt,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  LinearProgress,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EnrollmentDetailsModal from "../__components/EnrollmentDetailsModal";
import FeeCollectionModal from "../__components/FeeCollectionModal";
import PromotionHistoryModal from "../__components/PromotionHistoryModal";
import PromotionModal from "../__components/PromotionModal";
import RetainModal from "../__components/RetainModal";
import TakaIcon from "@/utils/takaIcon";

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

const getPaymentStatus = (fees: any[]) => {
  if (!fees || !Array.isArray(fees) || fees.length === 0) {
    return "unpaid";
  }

  const { total, paid } = calculateTotalFees(fees);

  if (paid >= total) return "paid";
  if (paid > 0) return "partial";
  return "unpaid";
};

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "success";
    case "inactive":
      return "error";
    case "passed":
      return "info";
    case "failed":
      return "warning";
    case "left":
      return "default";
    default:
      return "default";
  }
};

const getAdmissionTypeColor = (type: string) => {
  switch (type?.toLowerCase()) {
    case "admission":
      return "primary";
    case "promotion":
      return "success";
    default:
      return "default";
  }
};

export default function EnrollmentsPage() {
  const router = useRouter();
  const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null);
  const [selectedStudentForHistory, setSelectedStudentForHistory] =
    useState<any>(null);
  const [retainModalOpen, setRetainModalOpen] = useState(false);

  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [feeCollectionOpen, setFeeCollectionOpen] = useState(false);
  const [promotionModalOpen, setPromotionModalOpen] = useState(false);
  const [promotionHistoryModalOpen, setPromotionHistoryModalOpen] =
    useState(false);
  const [, setPromotionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [, setExportMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  const [sortColumn, setSortColumn] = useState("studentName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [, setSelectedRows] = useState<any[]>([]);

  const [deleteEnrollment] = useDeleteEnrollmentMutation();
  const { classOptions } = useAcademicOption();

  const queryParams: any = {
    page: page + 1,
    limit: rowsPerPage,
  };

  if (sortColumn) {
    queryParams.sort = sortDirection === "desc" ? `-${sortColumn}` : sortColumn;
  }

  if (searchTerm) {
    queryParams.searchTerm = searchTerm;
  }

  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        queryParams[key] = filters[key];
      }
    });
  }

  const {
    data: enrollmentData,
    isLoading,
    error,
    refetch,
  } = useGetAllEnrollmentsQuery(queryParams);

  useEffect(() => {
    if (enrollmentData?.data?.meta?.total) {
      setTotalCount(enrollmentData.data.meta.total);
    }
  }, [enrollmentData]);

  const transformedEnrollments = React.useMemo(() => {
    if (
      !enrollmentData ||
      !enrollmentData.data ||
      !Array.isArray(enrollmentData.data.data)
    ) {
      return [];
    }

    return enrollmentData.data.data.map((enrollment: any) => {
      const className = enrollment.className
        ? Array.isArray(enrollment.className)
          ? enrollment.className
              .map((cls: any) =>
                typeof cls === "object" ? cls.className : cls
              )
              .join(", ")
          : enrollment.className
        : "N/A";

      const studentName =
        enrollment.studentName ||
        enrollment.name ||
        enrollment.student?.name ||
        "Unknown";

      const studentId =
        enrollment.studentId ||
        enrollment.student?.studentId ||
        enrollment._id.slice(-6);

      const fatherName =
        enrollment.fatherName ||
        enrollment.fatherNameBangla ||
        enrollment.student?.fatherName ||
        "N/A";

      const { total, paid, due, discount, waiver } = calculateTotalFees(
        enrollment.fees || []
      );

      const paymentStatus = getPaymentStatus(enrollment.fees || []);
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
        admissionType: enrollment.admissionType || "admission",
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

  const columns: Column[] = [
    {
      id: "studentName",
      label: "Student",
      minWidth: 220,
      sortable: true,
      filterable: true,
      render: (row: any) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: "primary.main" }}>
            <Person />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {row.studentName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {row.studentId}
            </Typography>
            <Box display="flex" gap={1} mt={0.5}>
              <Chip
                label={row.admissionType}
                size="small"
                color={getAdmissionTypeColor(row.admissionType)}
                variant="outlined"
              />
              {row.rawData?.promotedFrom && (
                <Chip
                  label="Promoted"
                  size="small"
                  color="success"
                  icon={<ArrowForward fontSize="small" />}
                />
              )}
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      id: "className",
      label: "Class & Department",
      minWidth: 180,
      sortable: true,
      filterable: true,
      filterOptions:
        classOptions?.map((opt: any) => ({
          label: opt.label,
          value: opt.label,
        })) || [],
      render: (row: any) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {row.className}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {row.studentDepartment} • {row.studentType}
          </Typography>
          <Chip
            label={row.status}
            size="small"
            color={getStatusColor(row.status)}
            sx={{ mt: 0.5 }}
          />
        </Box>
      ),
    },
    {
      id: "mobileNo",
      label: "Contact",
      minWidth: 120,
      sortable: true,
      filterable: true,
      render: (row: any) => (
        <Box>
          <Typography variant="body2">{row.mobileNo}</Typography>
          <Typography variant="caption" color="text.secondary">
            Father: {row.fatherName}
          </Typography>
        </Box>
      ),
    },
    {
      id: "paymentStatus",
      label: "Payment Status",
      minWidth: 180,
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
          <Box sx={{ minWidth: 150 }}>
            <Box display="flex" justifyContent="space-between" mb={0.5}>
              <Typography variant="caption">
                Paid: ৳{row.paidAmount.toLocaleString()}
              </Typography>
              <Typography variant="caption">
                Due: ৳{row.dueAmount.toLocaleString()}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "grey.200",
                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    percentage >= 100
                      ? "success.main"
                      : percentage > 0
                        ? "warning.main"
                        : "error.main",
                  borderRadius: 4,
                },
              }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
            >
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
              <Typography variant="caption" fontWeight="bold">
                {percentage.toFixed(1)}%
              </Typography>
            </Box>
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
          ৳{value.toLocaleString()}
        </Typography>
      ),
    },
    {
      id: "admissionType",
      label: "Type",
      minWidth: 100,
      sortable: true,
      filterable: true,
      filterOptions: [
        { label: "Admission", value: "admission" },
        { label: "Promotion", value: "promotion" },
      ],
      render: (row: any) => (
        <Chip
          label={row.admissionType}
          size="small"
          color={getAdmissionTypeColor(row.admissionType)}
          variant={row.admissionType === "promotion" ? "filled" : "outlined"}
          icon={
            row.admissionType === "promotion" ? (
              <ArrowForward fontSize="small" />
            ) : undefined
          }
        />
      ),
    },
  ];

  const rowActions: RowAction[] = [
    {
      label: "Fee Collect",
      icon: <TakaIcon fontSize="small" />,
      onClick: (row) => {
        setSelectedEnrollment(row);
        setFeeCollectionOpen(true);
      },
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
      label: "Promotion History",
      icon: <History fontSize="small" />,
      onClick: (row) => {
        setSelectedStudentForHistory({
          id: row.rawData?.student?._id || row.id,
          name: row.studentName,
        });
        setPromotionHistoryModalOpen(true);
      },
      tooltip: "View Promotion History",
      color: "info",
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
      disabled: (row) => row.admissionType === "promotion",
    },
  ];

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

  const handlePromotionMenuClose = () => {
    setPromotionMenuAnchorEl(null);
  };

  const handleOpenPromotionModal = () => {
    setPromotionModalOpen(true);
    handlePromotionMenuClose();
  };

  const handleOpenPromotionSummary = () => {
    handlePromotionMenuClose();
  };

  const handleOpenRetainModal = () => {
    setRetainModalOpen(true);
  };

  const handleRetainSuccess = () => {
    refetch();
    Swal.fire({
      title: "Success!",
      text: "Students retained successfully!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleExportMenuClose = () => {
    setExportMenuAnchorEl(null);
  };

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

  const handleExport = (type: string) => {
    console.log(`Exporting as ${type}`);
    Swal.fire({
      title: "Exporting...",
      text: `Exporting enrollments as ${type.toUpperCase()}`,
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
    });
    handleExportMenuClose();
  };

  const handlePrint = () => {
    console.log("Print enrollments");
    window.print();
  };

  const handleSortChange = (column: string, direction: "asc" | "desc") => {
    setSortColumn(column);
    setSortDirection(direction);
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setPage(0);
  };

  const handleFilterChange = (filters: Record<string, any>) => {
    setFilters(filters);
    setPage(0);
  };

  const handleSelectionChange = (selected: any[]) => {
    setSelectedRows(selected);
  };

  const handlePromotionSuccess = () => {
    refetch();
    Swal.fire({
      title: "Success!",
      text: "Students promoted successfully!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const stats = React.useMemo(() => {
    if (!transformedEnrollments.length) {
      return {
        total: 0,
        active: 0,
        paid: 0,
        unpaid: 0,
        totalFees: 0,
        totalPaid: 0,
        totalDue: 0,
      };
    }

    const total = transformedEnrollments.length;
    const active = transformedEnrollments.filter(
      (e: any) => e.status === "active"
    ).length;
    const paid = transformedEnrollments.filter(
      (e: any) => e.paymentStatus === "paid"
    ).length;
    const unpaid = transformedEnrollments.filter(
      (e: any) => e.paymentStatus === "unpaid"
    ).length;
    const totalFees = transformedEnrollments.reduce(
      (sum: any, e: any) => sum + e.totalFees,
      0
    );
    const totalPaid = transformedEnrollments.reduce(
      (sum: any, e: any) => sum + e.paidAmount,
      0
    );
    const totalDue = transformedEnrollments.reduce(
      (sum: any, e: any) => sum + e.dueAmount,
      0
    );

    return {
      total,
      active,
      paid,
      unpaid,
      totalFees,
      totalPaid,
      totalDue,
    };
  }, [transformedEnrollments]);

  const customToolbar = (
    <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => router.push("/dashboard/enrollments")}
      >
        New Enrollment
      </Button>

      <Button
        variant="outlined"
        startIcon={<ArrowForward />}
        onClick={handleOpenPromotionModal}
        color="success"
      >
        Promote Students
      </Button>

      <Button
        variant="outlined"
        startIcon={<RestartAlt />}
        onClick={handleOpenRetainModal}
        color="warning"
      >
        Retain Students
      </Button>

      <Box flexGrow={1} />

      <Button
        variant="outlined"
        startIcon={<Refresh />}
        onClick={() => refetch()}
      >
        Refresh
      </Button>
    </Box>
  );

  if (isLoading && page === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "grey.50", minHeight: "100vh" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Student Enrollments
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Manage and track all student admissions and promotions
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap" mt={3}>
          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              minWidth: 180,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Total Enrollments
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {stats.total}
            </Typography>
            <Box display="flex" gap={1} mt={1}>
              <Chip
                label={`Active: ${stats.active}`}
                size="small"
                color="success"
              />
              <Chip
                label={`Paid: ${stats.paid}`}
                size="small"
                color="success"
                variant="outlined"
              />
            </Box>
          </Box>

          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              minWidth: 180,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Financial Summary
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              ৳{stats.totalFees.toLocaleString()}
            </Typography>
            <Box display="flex" gap={1} mt={1}>
              <Chip
                label={`Paid: ৳${stats.totalPaid.toLocaleString()}`}
                size="small"
                color="success"
              />
              <Chip
                label={`Due: ৳${stats.totalDue.toLocaleString()}`}
                size="small"
                color={stats.totalDue > 0 ? "error" : "default"}
              />
            </Box>
          </Box>

          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              minWidth: 180,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Payment Status
            </Typography>
            <Box display="flex" flexDirection="column" gap={1} mt={1}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Paid:</Typography>
                <Chip label={stats.paid} size="small" color="success" />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Unpaid:</Typography>
                <Chip label={stats.unpaid} size="small" color="error" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Table
        title=""
        subtitle=""
        columns={columns}
        data={transformedEnrollments}
        loading={isLoading}
        error={
          error
            ? "Error loading enrollment data. Please try again later."
            : undefined
        }
        onRefresh={refetch}
        onExport={() => handleExport("excel")}
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
        serverSideSorting={true}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onSearchChange={handleSearchChange}
        rowCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        customToolbar={customToolbar}
      />
      <EnrollmentDetailsModal
        open={detailDialogOpen}
        setOpen={handleCloseDetails}
        enrollment={selectedEnrollment}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onEdit={handleEditEnrollment}
        onCollectFee={handleCollectFee}
      />

      <FeeCollectionModal
        setOpen={handleCloseFeeCollection}
        open={feeCollectionOpen}
        onClose={handleCloseFeeCollection}
        enrollment={selectedEnrollment}
      />

      <PromotionModal
        open={promotionModalOpen}
        onClose={() => setPromotionModalOpen(false)}
        onSuccess={handlePromotionSuccess}
        classOptions={classOptions}
      />

      <RetainModal
        open={retainModalOpen}
        onClose={() => setRetainModalOpen(false)}
        onSuccess={handleRetainSuccess}
        classOptions={classOptions}
      />

      <PromotionHistoryModal
        open={promotionHistoryModalOpen}
        onClose={() => setPromotionHistoryModalOpen(false)}
        studentId={selectedStudentForHistory?.id}
        studentName={selectedStudentForHistory?.name}
      />
    </Box>
  );
}
