/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Table, { BulkAction, Column, RowAction } from "@/components/Table";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import {
  useDeleteEnrollmentMutation,
  useGetAllEnrollmentsQuery,
} from "@/redux/api/enrollmentApi";
import TakaIcon from "@/utils/takaIcon";
import {
  Add,
  ArrowForward,
  AttachMoney,
  Delete,
  Edit,
  FileDownload,
  History,
  Person,
  Refresh,
  RestartAlt,
  Visibility,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  LinearProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import EnrollmentDetailsModal from "../__components/EnrollmentDetailsModal";
import FeeCollectionModal from "../__components/FeeCollectionModal";
import PromotionHistoryModal from "../__components/PromotionHistoryModal";
import PromotionModal from "../__components/PromotionModal";
import RetainModal from "../__components/RetainModal";
import LoadingSpinner from "@/components/LoadingSpinner";

// ✅ Define the desired class order (same as in AdmissionApplicationList)
const ALL_CLASSES = [
  "Pre_one",
  "One",
  "Two",
  "Three",
  "Four_boys",
  "Four_girls",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nurani",
  "Nazera",
  "Hifz",
  "Sunani",
];

const calculateTotalFees = (fees: any[]) => {
  if (!fees || !Array.isArray(fees) || fees.length === 0) {
    return { total: 0, paid: 0, due: 0, discount: 0, waiver: 0 };
  }
  let total = 0,
    paid = 0,
    due = 0,
    discount = 0,
    waiver = 0;
  fees.forEach((fee: any) => {
    total += Number(fee.amount) || 0;
    paid += Number(fee.paidAmount) || 0;
    due += Number(fee.dueAmount) || 0;
    discount += Number(fee.discount) || 0;
    waiver += Number(fee.waiver) || 0;
  });
  return { total, paid, due, discount, waiver };
};

const getPaymentStatus = (fees: any[]) => {
  if (!fees || !Array.isArray(fees) || fees.length === 0) return "unpaid";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null);
  const [selectedStudentForHistory, setSelectedStudentForHistory] =
    useState<any>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [feeCollectionOpen, setFeeCollectionOpen] = useState(false);
  const [promotionModalOpen, setPromotionModalOpen] = useState(false);
  const [promotionHistoryModalOpen, setPromotionHistoryModalOpen] =
    useState(false);
  const [retainModalOpen, setRetainModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10);

  useEffect(() => {
    setRowsPerPage(isMobile ? 5 : isTablet ? 8 : 10);
  }, [isMobile, isTablet]);

  const {
    data: enrollmentData,
    isLoading,
    error,
    refetch,
  } = useGetAllEnrollmentsQuery({ limit: 1000, page: 1 });
  console.log("Fetched enrollments:", enrollmentData);
  const [deleteEnrollment] = useDeleteEnrollmentMutation();
  const { classOptions } = useAcademicOption();

  // Flatten API data → flat rows
  const tableData = useMemo(() => {
    if (!enrollmentData?.data || !Array.isArray(enrollmentData.data.data))
      return [];

    return enrollmentData.data.data.map((enrollment: any) => {
      const className = enrollment.className
        ? Array.isArray(enrollment.className)
          ? enrollment.className
              .map((cls: any) =>
                typeof cls === "object" ? cls.className : cls,
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
        enrollment.fees || [],
      );
      const paymentStatus = getPaymentStatus(enrollment.fees || []);

      return {
        id: enrollment._id,
        enrollmentId: enrollment._id,
        studentId,
        studentName,
        studentNameBangla:
          enrollment.nameBangla || enrollment.student?.nameBangla || "",
        fatherName,
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
        className,
        studentDepartment:
          enrollment.studentDepartment ||
          enrollment.student?.studentDepartment ||
          "N/A",
        studentType:
          enrollment.studentType || enrollment.student?.studentType || "N/A",
        status: enrollment.status || "active",
        paymentStatus,
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

  // ✅ FIXED: class filter options sorted by ALL_CLASSES order
  const classFilterOptions = useMemo(() => {
    const seen = new Set<string>();
    const opts: { label: string; value: string }[] = [];
    tableData.forEach((r: any) => {
      if (r.className && r.className !== "N/A" && !seen.has(r.className)) {
        seen.add(r.className);
        opts.push({ label: r.className, value: r.className });
      }
    });

    // Sort by the predefined order; unknown classes go to the end alphabetically.
    return opts.sort((a, b) => {
      const indexA = ALL_CLASSES.indexOf(a.value);
      const indexB = ALL_CLASSES.indexOf(b.value);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.label.localeCompare(b.label);
    });
  }, [tableData]);

  const totalCount = enrollmentData?.data?.meta?.total ?? tableData.length;

  const stats = useMemo(() => {
    if (!tableData.length)
      return {
        total: 0,
        active: 0,
        paid: 0,
        unpaid: 0,
        totalFees: 0,
        totalPaid: 0,
        totalDue: 0,
      };
    return {
      total: tableData.length,
      active: tableData.filter((e: any) => e.status === "active").length,
      paid: tableData.filter((e: any) => e.paymentStatus === "paid").length,
      unpaid: tableData.filter((e: any) => e.paymentStatus === "unpaid").length,
      totalFees: tableData.reduce((s: number, e: any) => s + e.totalFees, 0),
      totalPaid: tableData.reduce((s: number, e: any) => s + e.paidAmount, 0),
      totalDue: tableData.reduce((s: number, e: any) => s + e.dueAmount, 0),
    };
  }, [tableData]);

  // Columns
  const columns: Column[] = useMemo(() => {
    const cols: Column[] = [
      {
        id: "studentName",
        label: "Student",
        minWidth: isMobile ? 160 : 220,
        sortable: true,
        filterable: true,
        render: (row: any) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 2 },
            }}
          >
            <Avatar
              sx={{
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                bgcolor: "primary.main",
              }}
            >
              <Person />
            </Avatar>
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                {row.studentName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
              >
                ID: {row.studentId}
              </Typography>
              <Box display="flex" gap={0.5} mt={0.5} flexWrap="wrap">
                <Chip
                  label={row.admissionType}
                  size="small"
                  color={getAdmissionTypeColor(row.admissionType) as any}
                  variant="outlined"
                  sx={{ height: 18, fontSize: "0.6rem" }}
                />
                {row.rawData?.promotedFrom && (
                  <Chip
                    label="Promoted"
                    size="small"
                    color="success"
                    icon={
                      <ArrowForward sx={{ fontSize: "0.75rem !important" }} />
                    }
                    sx={{ height: 18, fontSize: "0.6rem" }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        ),
      },
      {
        id: "className",
        label: "Class & Dept",
        minWidth: isMobile ? 100 : 180,
        sortable: true,
        filterable: true,
        filterOptions: classFilterOptions, // ✅ now sorted correctly
        render: (row: any) => (
          <Box>
            <Typography
              variant="body2"
              fontWeight="medium"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              {row.className}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
            >
              {row.studentDepartment} • {row.studentType}
            </Typography>
            <Chip
              label={row.status}
              size="small"
              color={getStatusColor(row.status) as any}
              sx={{ mt: 0.5, height: 20, fontSize: "0.65rem" }}
            />
          </Box>
        ),
      },
    ];

    if (!isMobile) {
      cols.push({
        id: "mobileNo",
        label: "Contact",
        minWidth: isTablet ? 120 : 140,
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
      });
    }

    cols.push(
      {
        id: "paymentStatus",
        label: "Payment",
        minWidth: isMobile ? 100 : 180,
        sortable: true,
        filterable: true,
        filterOptions: [
          { label: "Paid", value: "paid" },
          { label: "Partial", value: "partial" },
          { label: "Unpaid", value: "unpaid" },
        ],
        render: (row: any) => {
          const pct =
            row.totalFees > 0 ? (row.paidAmount / row.totalFees) * 100 : 0;
          if (isMobile) {
            return (
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
                sx={{ fontWeight: 600 }}
              />
            );
          }
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
                value={pct}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "grey.200",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      pct >= 100
                        ? "success.main"
                        : pct > 0
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
                  {pct.toFixed(1)}%
                </Typography>
              </Box>
            </Box>
          );
        },
      },
      {
        id: "dueAmount",
        label: "Due",
        minWidth: isMobile ? 80 : 120,
        align: "right",
        sortable: true,
        type: "number",
        format: (value: number) => (
          <Typography
            variant="body2"
            fontWeight="bold"
            color={value > 0 ? "error.main" : "success.main"}
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            ৳{value.toLocaleString()}
          </Typography>
        ),
      },
      {
        id: "admissionType",
        label: "Type",
        minWidth: 90,
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
            color={getAdmissionTypeColor(row.admissionType) as any}
            variant={row.admissionType === "promotion" ? "filled" : "outlined"}
            icon={
              row.admissionType === "promotion" ? (
                <ArrowForward fontSize="small" />
              ) : undefined
            }
          />
        ),
      },
    );

    return cols;
  }, [isMobile, isTablet, classFilterOptions]);

  // Row action
  const rowActions: RowAction[] = useMemo(
    () => [
      {
        label: "View Details",
        icon: <Visibility fontSize="small" />,
        onClick: (row) => {
          setSelectedEnrollment(row);
          setDetailDialogOpen(true);
        },
        tooltip: "View Details",
        color: "info",
        inMenu: isMobile,
        alwaysShow: !isMobile,
      },
      {
        label: "Edit",
        icon: <Edit fontSize="small" />,
        onClick: (row) => {
          router.push(`/dashboard/enrollments?id=${row.id}`);
        },
        tooltip: "Edit Enrollment",
        color: "primary",
        inMenu: isMobile,
        alwaysShow: !isMobile,
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
        inMenu: true,
      },
      {
        label: "Delete",
        icon: <Delete fontSize="small" />,
        onClick: (row) => {
          Swal.fire({
            title: "Are you sure?",
            html: `You are about to delete <strong>${row.studentName}</strong>'s enrollment. This cannot be undone.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              deleteEnrollment(row.id)
                .unwrap()
                .then(() => {
                  Swal.fire({
                    title: "Deleted!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                  });
                  refetch();
                })
                .catch((err) => {
                  Swal.fire({
                    title: "Error!",
                    text: err.data?.message || "Failed to delete.",
                    icon: "error",
                  });
                });
            }
          });
        },
        color: "error",
        tooltip: "Delete Enrollment",
        alwaysShow: true,
        disabled: (row) => row.admissionType === "promotion",
      },
    ],
    [isMobile, router, deleteEnrollment, refetch],
  );

  // ── Bulk actions ──────────────────────────────────────────────────────────
  const bulkActions: BulkAction[] = useMemo(
    () => [
      {
        label: "Export Selected",
        icon: <FileDownload fontSize="small" />,
        onClick: (selectedRows) => {
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
        color: "success",
        onClick: (selectedRows) => {
          const hasDue = selectedRows.some((r) => r.dueAmount > 0);
          if (!hasDue) {
            Swal.fire({
              title: "No Due Amount",
              text: "Selected enrollments have no due amount.",
              icon: "info",
            });
            return;
          }
          Swal.fire({
            title: "Bulk Fee Collection",
            html: `Collect fees from <strong>${selectedRows.length}</strong> student(s)?`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#1976d2",
            confirmButtonText: "Continue",
          });
        },
      },
      {
        label: "Delete Selected",
        icon: <Delete fontSize="small" />,
        color: "error",
        onClick: (selectedRows) => {
          Swal.fire({
            title: "Are you sure?",
            html: `Delete <strong>${selectedRows.length}</strong> enrollment(s)? This cannot be undone.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete them!",
          }).then((result) => {
            if (result.isConfirmed) {
              Promise.allSettled(
                selectedRows.map((r) => deleteEnrollment(r.id).unwrap()),
              ).then(() => {
                Swal.fire({
                  title: "Deleted!",
                  icon: "success",
                  timer: 2000,
                  showConfirmButton: false,
                });
                refetch();
              });
            }
          });
        },
      },
    ],
    [deleteEnrollment, refetch],
  );

  // Custom toolbar
  const customToolbar = (
    <Box display="flex" gap={1.5} alignItems="center" flexWrap="wrap">
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => router.push("/dashboard/enrollments")}
        size="small"
      >
        New Enrollment
      </Button>
      <Button
        variant="outlined"
        startIcon={<ArrowForward />}
        onClick={() => setPromotionModalOpen(true)}
        color="success"
        size="small"
      >
        Promote
      </Button>
      <Button
        variant="outlined"
        startIcon={<RestartAlt />}
        onClick={() => setRetainModalOpen(true)}
        color="warning"
        size="small"
      >
        Retain
      </Button>
      <Box flexGrow={1} />
      <Button
        variant="outlined"
        startIcon={<Refresh />}
        onClick={() => refetch()}
        size="small"
      >
        Refresh
      </Button>
    </Box>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2, md: 3 },
        backgroundColor: "grey.50",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Student Enrollments
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage and track all student admissions and promotions
        </Typography>

        {/* Stats cards */}
        <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              minWidth: 160,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Total Enrollments
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {stats.total}
            </Typography>
            <Box display="flex" gap={1} mt={1} flexWrap="wrap">
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
              minWidth: 160,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Financial Summary
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              ৳{stats.totalFees.toLocaleString()}
            </Typography>
            <Box display="flex" gap={1} mt={1} flexWrap="wrap">
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
              minWidth: 160,
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

      {/* Table */}
      <Box sx={{ p: { xs: 0, sm: 1 } }}>
        <Table
          title="Enrollments"
          subtitle={`Total ${totalCount} enrollments`}
          emptyStateMessage="No enrollments found"
          columns={columns}
          data={tableData}
          loading={isLoading}
          error={
            error
              ? "Error loading enrollment data. Please try again."
              : undefined
          }
          idField="id"
          pagination={true}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(n) => {
            setRowsPerPage(n);
            setPage(0);
          }}
          searchable={true}
          sortable={true}
          serverSideSorting={false}
          filterable={true}
          rowActions={rowActions}
          bulkActions={bulkActions}
          selectable={true}
          customToolbar={customToolbar}
          showToolbar={true}
          onRefresh={refetch}
          dense={isMobile}
          striped={true}
          hover={true}
          showRowNumbers={!isMobile}
          maxHeight="calc(100vh - 200px)"
          actionColumnWidth={isMobile ? 100 : 140}
          actionMenuLabel={isMobile ? "" : "Actions"}
          elevation={2}
          borderRadius={3}
        />
      </Box>

      {/* Modals */}
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
        open={feeCollectionOpen}
        setOpen={handleCloseFeeCollection}
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

  function handleCloseDetails() {
    setDetailDialogOpen(false);
    setSelectedEnrollment(null);
    setActiveTab(0);
  }
  function handleCloseFeeCollection() {
    setFeeCollectionOpen(false);
    setSelectedEnrollment(null);
  }
  function handleEditEnrollment(enrollment: any) {
    handleCloseDetails();
    router.push(`/dashboard/enrollments?id=${enrollment.id}`);
  }
  function handleCollectFee(enrollment: any) {
    handleCloseDetails();
    setSelectedEnrollment(enrollment);
    setFeeCollectionOpen(true);
  }
  function handlePromotionSuccess() {
    refetch();
    Swal.fire({
      title: "Success!",
      text: "Students promoted successfully!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  }
  function handleRetainSuccess() {
    refetch();
    Swal.fire({
      title: "Success!",
      text: "Students retained successfully!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  }
}
