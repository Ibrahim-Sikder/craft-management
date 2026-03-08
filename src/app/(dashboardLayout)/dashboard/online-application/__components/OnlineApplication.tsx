/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { JSX, useState, useMemo, useEffect, useCallback } from "react";
import {
  useDeleteAdmissionApplicationMutation,
  useGetAllAdmissionApplicationsQuery,
  useUpdateAdmissionApplicationMutation,
} from "@/redux/api/admissionApplication";
import {
  Visibility,
  Edit,
  Delete,
  CheckCircle,
  Cancel,
  Pending,
  PictureAsPdf,
  Phone,
  HowToReg,
  School,
  Restore,
  CalendarToday,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  Avatar,
  Typography,
  useTheme,
  useMediaQuery,
  alpha,
  Paper,
  Button,
  CircularProgress,
  Container,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CraftTable, { Column, RowAction, BulkAction } from "@/components/Table";
import Swal from "sweetalert2";
import { AdmissionDetailModal } from "./AdmissionDetailModal";
import { TAdmissionStatus } from "@/interface/admission";
import { format } from "date-fns";
import { bn } from "date-fns/locale";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ApplicationRow {
  _id: string;
  applicationId: string;
  status: string;
  academicYear: string;
  nameBangla: string;
  nameEnglish: string;
  studentPhoto?: string;
  department: string;
  class: string;
  _classFlat: string;
  mobile: string;
  fatherMobile: string;
  studentInfo: any;
  parentInfo: any;
  academicInfo: any;
  address: any;
  createdAt?: string;
  updatedAt?: string;
}

interface AdmissionApplicationListProps {
  type: "pending" | "approved" | "rejected" | "enrolled";
}

const formatDate = (date: string | Date) => {
  try {
    return format(new Date(date), "dd MMM yyyy, hh:mm a", { locale: bn });
  } catch {
    return "Invalid date";
  }
};

const formatShortDate = (date: string | Date) => {
  try {
    return format(new Date(date), "dd MMM yyyy", { locale: bn });
  } catch {
    return "Invalid date";
  }
};

// Update the StatusChip to include 'enrolled' styling
const StatusChip = ({ status }: { status: TAdmissionStatus }) => {
  const statusConfig: Record<
    string,
    {
      color: "success" | "warning" | "error" | "info" | "default" | "secondary";
      icon: JSX.Element;
      label: string;
    }
  > = {
    pending: {
      color: "warning",
      icon: <Pending sx={{ fontSize: 16 }} />,
      label: "Pending",
    },
    approved: {
      color: "success",
      icon: <CheckCircle sx={{ fontSize: 16 }} />,
      label: "Approved",
    },
    rejected: {
      color: "error",
      icon: <Cancel sx={{ fontSize: 16 }} />,
      label: "Rejected",
    },
    enrolled: {
      color: "secondary", // or "info" if you prefer
      icon: <HowToReg sx={{ fontSize: 16 }} />,
      label: "Enrolled",
    },
  };
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <Chip
      icon={config.icon}
      label={config.label}
      color={config.color as any}
      size="small"
      sx={{
        fontWeight: 600,
        borderRadius: "8px",
        minWidth: { xs: 80, sm: 100 },
        "& .MuiChip-icon": { fontSize: 16 },
        "& .MuiChip-label": { px: { xs: 1, sm: 2 } },
      }}
    />
  );
};

const DepartmentChip = ({ department }: { department: string }) => {
  const colors: Record<string, string> = {
    hifz: "#8B5CF6",
    academic: "#3B82F6",
    nazera: "#10B981",
    tajbid: "#F59E0B",
  };
  const labels: Record<string, string> = {
    hifz: "হিফজ",
    academic: "একাডেমিক",
    nazera: "নাজেরা",
    tajbid: "তাজবীদ",
  };
  const color = colors[department] || "#6B7280";
  return (
    <Chip
      label={labels[department] || department || "N/A"}
      size="small"
      sx={{
        backgroundColor: `${color}20`,
        color,
        fontWeight: 600,
        borderRadius: "8px",
        border: `1px solid ${color}30`,
        minWidth: { xs: 70, sm: 90 },
        "& .MuiChip-label": { px: { xs: 1, sm: 1.5 } },
      }}
    />
  );
};

const StudentAvatar = ({ name, photo }: { name: string; photo?: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
    <Avatar
      src={photo}
      sx={{
        width: { xs: 32, sm: 40 },
        height: { xs: 32, sm: 40 },
        bgcolor: (t) => t.palette.primary.main,
        fontSize: { xs: "0.875rem", sm: "1rem" },
        fontWeight: 600,
      }}
    >
      {name?.charAt(0) || "S"}
    </Avatar>
    <Typography
      variant="body2"
      fontWeight={500}
      noWrap
      sx={{
        maxWidth: { xs: 100, sm: 150, md: 200 },
        fontSize: { xs: "0.75rem", sm: "0.875rem" },
      }}
    >
      {name}
    </Typography>
  </Box>
);

const MobileNumber = ({ number }: { number: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
    <Phone sx={{ fontSize: { xs: 14, sm: 16 }, color: "text.secondary" }} />
    <Typography
      variant="body2"
      sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}
    >
      {number || "N/A"}
    </Typography>
  </Box>
);

//Date Display Component

const DateDisplay = ({ date }: { date?: string }) => {
  if (!date) return <Typography variant="body2">N/A</Typography>;
  return (
    <Tooltip title={formatDate(date)} arrow>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <CalendarToday sx={{ fontSize: 14, color: "text.secondary" }} />
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}
        >
          {formatShortDate(date)}
        </Typography>
      </Box>
    </Tooltip>
  );
};

function extractClassName(item: any): string {
  if (item.studentInfo?.class) {
    if (
      typeof item.studentInfo.class === "object" &&
      item.studentInfo.class?.className
    )
      return item.studentInfo.class.className;
    if (typeof item.studentInfo.class === "string")
      return item.studentInfo.class;
  }
  if (item.academicInfo?.class) return item.academicInfo.class;
  if (item.class) return item.class;
  return "N/A";
}

// Main Reusable Component

export default function AdmissionApplicationList({
  type,
}: AdmissionApplicationListProps) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [updateApplication, { isLoading: isUpdating }] =
    useUpdateAdmissionApplicationMutation();
  const [deleteAdmissionApplication, { isLoading: isDeleting }] =
    useDeleteAdmissionApplicationMutation();

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    setRowsPerPage(isMobile ? 5 : isTablet ? 8 : 10);
  }, [isMobile, isTablet]);

  // Fetch applications based on type
  const queryParams = useMemo(() => {
    const params: any = { limit: 1000, page: 1 };
    if (type === "pending") params.status = "pending";
    else if (type === "approved") params.status = "approved";
    else if (type === "rejected") params.status = "rejected";
    else if (type === "enrolled") params.status = "enrolled";
    params.sort = "-createdAt";
    return params;
  }, [type]);

  const { data, isLoading, refetch } =
    useGetAllAdmissionApplicationsQuery(queryParams);

  // Flatten API data → flat rows
  const tableData: ApplicationRow[] = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((item: any): ApplicationRow => {
      const cls = extractClassName(item);
      return {
        _id: item._id,
        applicationId: item.applicationId ?? "",
        status: item.status ?? "",
        academicYear: item.academicYear ?? String(new Date().getFullYear()),
        nameBangla: item.studentInfo?.nameBangla ?? "",
        nameEnglish: item.studentInfo?.nameEnglish ?? "",
        studentPhoto: item.studentInfo?.studentPhoto,
        department: item.studentInfo?.department ?? "",
        class: cls,
        _classFlat: cls,
        mobile: item.parentInfo?.father?.mobile ?? "",
        fatherMobile: item.parentInfo?.father?.mobile ?? "",
        studentInfo: item.studentInfo,
        parentInfo: item.parentInfo,
        academicInfo: item.academicInfo,
        address: item.address,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });
  }, [data]);

  // Class filter options
  const classFilterOptions = useMemo(() => {
    const seen = new Set<string>();
    const opts: { label: string; value: string }[] = [];
    tableData.forEach((r: ApplicationRow) => {
      if (r.class && r.class !== "N/A" && !seen.has(r.class)) {
        seen.add(r.class);
        opts.push({ label: r.class, value: r.class });
      }
    });
    return opts.sort((a, b) => a.label.localeCompare(b.label));
  }, [tableData]);

  const totalCount = data?.meta?.total ?? tableData.length;

  // Handlers

  const handleView = useCallback((row: ApplicationRow) => {
    setModalLoading(true);
    setSelectedApplication(row);
    setModalOpen(true);
    setTimeout(() => setModalLoading(false), 500);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setSelectedApplication(null), 300);
  }, []);

  const handleEdit = useCallback(
    (row: ApplicationRow) => {
      if (!row?._id) {
        Swal.fire("Error", "Application ID not found", "error");
        return;
      }
      router.push(`/dashboard/online-application/edit?id=${row._id}`);
    },
    [router],
  );

  const handleDelete = useCallback(
    async (row: ApplicationRow) => {
      if (!row?._id) return;
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        try {
          await deleteAdmissionApplication(row._id).unwrap();
          Swal.fire("Deleted!", "Application has been deleted.", "success");
          refetch();
        } catch (error: any) {
          Swal.fire(
            "Failed!",
            error?.data?.message || "Failed to delete",
            "error",
          );
        }
      }
    },
    [deleteAdmissionApplication, refetch],
  );

  //Core approve handler — fixed to ensure status update completes
  const handleUpdateStatus = useCallback(
    async (
      row: ApplicationRow,
      newStatus: "approved" | "rejected" | "pending",
    ) => {
      if (!row?._id) return;

      const isApproving = newStatus === "approved";
      const isRejecting = newStatus === "rejected";

      const confirmButtonColor = isApproving
        ? "#10B981"
        : isRejecting
          ? "#d33"
          : "#F59E0B";

      const title = isApproving
        ? "Approve Application?"
        : isRejecting
          ? "Reject Application?"
          : "Restore to Pending?";

      const confirmButtonText = isApproving
        ? "Yes, Approve!"
        : isRejecting
          ? "Yes, Reject!"
          : "Yes, Restore!";

      const result = await Swal.fire({
        title,
        text: `Are you sure you want to move this application to ${newStatus}?`,
        icon: isApproving ? "question" : isRejecting ? "warning" : "info",
        showCancelButton: true,
        confirmButtonColor,
        cancelButtonColor: "#3085d6",
        confirmButtonText,
      });

      if (!result.isConfirmed) return;

      try {
        // First update the status
        const updatedResult = await updateApplication({
          id: row._id,
          data: { status: newStatus },
        }).unwrap();
        console.log("API Response:", updatedResult);

        console.log("Status updated successfully:", updatedResult);

        // Show success message
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Application has been ${newStatus === "pending" ? "restored to pending" : newStatus}.`,
          timer: 1500,
          showConfirmButton: false,
        });

        // If approving, navigate to enrollment page with the application data
        if (isApproving) {
          if (typeof window !== "undefined") {
            sessionStorage.setItem(
              "approvedApplication",
              JSON.stringify({
                id: row._id,
                applicationId: row.applicationId,
                studentName: row.nameBangla || row.nameEnglish,
                department: row.department,
                class: row.class,
                studentInfo: row.studentInfo,
                parentInfo: row.parentInfo,
              }),
            );
          }

          // Navigate to enrollment page
          router.push(
            `/dashboard/enrollments?applicationId=${row.applicationId}`,
          );
        } else {
          // For reject/restore, just refetch the data
          refetch();
        }
      } catch (error: any) {
        console.error("Status update failed:", error);
        Swal.fire(
          "Failed!",
          error?.data?.message || "Failed to update status",
          "error",
        );
      }
    },
    [updateApplication, refetch, router],
  );

  const handleApprove = useCallback(
    (row: ApplicationRow) => handleUpdateStatus(row, "approved"),
    [handleUpdateStatus],
  );

  const handleReject = useCallback(
    (row: ApplicationRow) => handleUpdateStatus(row, "rejected"),
    [handleUpdateStatus],
  );

  const handleRestore = useCallback(
    (row: ApplicationRow) => handleUpdateStatus(row, "pending"),
    [handleUpdateStatus],
  );

  const handleEnroll = useCallback(
    (row: ApplicationRow) => {
      if (!row?.applicationId) {
        Swal.fire("Error", "Application ID not found", "error");
        return;
      }
      router.push(`/dashboard/enrollments?applicationId=${row.applicationId}`);
    },
    [router],
  );

  const handleDownloadPDF = useCallback((_row: ApplicationRow) => {
    Swal.fire({
      icon: "info",
      title: "PDF Download",
      text: "PDF download coming soon.",
    });
  }, []);
  const handleBulkAction = useCallback(
    async (
      selectedRows: ApplicationRow[],
      actionType: "approve" | "delete" | "restore",
    ) => {
      const ids = selectedRows.map((r) => r._id).filter(Boolean);
      if (!ids.length) return;

      const config = {
        approve: {
          title: `Approve ${ids.length} Applications?`,
          confirmButtonColor: "#10B981",
          successMessage: "approved",
          confirmText: "Yes, Approve!",
        },
        delete: {
          title: `Delete ${ids.length} Applications?`,
          confirmButtonColor: "#d33",
          successMessage: "deleted",
          confirmText: "Yes, Delete!",
        },
        restore: {
          title: `Restore ${ids.length} Applications to Pending?`,
          confirmButtonColor: "#F59E0B",
          successMessage: "restored to pending",
          confirmText: "Yes, Restore!",
        },
      }[actionType];

      const result = await Swal.fire({
        title: config.title,
        text: `You are about to ${actionType} ${ids.length} applications.`,
        icon: actionType === "delete" ? "warning" : "question",
        showCancelButton: true,
        confirmButtonColor: config.confirmButtonColor,
        confirmButtonText: config.confirmText,
      });

      if (!result.isConfirmed) return;

      try {
        const promises = ids.map((id) => {
          if (actionType === "delete")
            return deleteAdmissionApplication(id).unwrap();
          if (actionType === "approve")
            return updateApplication({
              id,
              data: { status: "approved" },
            }).unwrap();
          if (actionType === "restore")
            return updateApplication({
              id,
              data: { status: "pending" },
            }).unwrap();
          return Promise.reject("Invalid action");
        });

        const results = await Promise.allSettled(promises);
        const succeeded = results.filter(
          (r) => r.status === "fulfilled",
        ).length;
        const failed = results.filter((r) => r.status === "rejected").length;

        // Show result message
        if (failed === 0) {
          await Swal.fire({
            icon: "success",
            title: "Success!",
            text: `${succeeded} applications ${config.successMessage}.`,
            timer: 1500,
            showConfirmButton: false,
          });

          // For bulk approve, navigate to enrollments list
          if (actionType === "approve" && succeeded > 0) {
            router.push("/dashboard/enrollments");
          } else {
            refetch();
          }
        } else {
          Swal.fire(
            "Partial Success",
            `${succeeded} done, ${failed} failed.`,
            "warning",
          );
          refetch();
        }
      } catch (error) {
        console.error("Bulk action failed:", error);
        Swal.fire("Error", "Operation failed.", "error");
      }
    },
    [deleteAdmissionApplication, updateApplication, refetch, router],
  );

  const handleBulkApprove = useCallback(
    (rows: ApplicationRow[]) => handleBulkAction(rows, "approve"),
    [handleBulkAction],
  );

  const handleBulkDelete = useCallback(
    (rows: ApplicationRow[]) => handleBulkAction(rows, "delete"),
    [handleBulkAction],
  );

  const handleBulkRestore = useCallback(
    (rows: ApplicationRow[]) => handleBulkAction(rows, "restore"),
    [handleBulkAction],
  );

  // ── Columns configuration ──────────────────────────────────────────────────
  const columns: Column[] = useMemo(() => {
    const cols: Column[] = [
      {
        id: "nameBangla",
        label: "Student",
        minWidth: isMobile ? 150 : 250,
        sortable: true,
        filterable: true,
        render: (row: ApplicationRow) => (
          <StudentAvatar
            name={row.nameBangla || row.nameEnglish}
            photo={row.studentPhoto}
          />
        ),
      },
      {
        id: "applicationId",
        label: "OA. ID",
        minWidth: isMobile ? 80 : 120,
        sortable: true,
        filterable: true,
        render: (row: ApplicationRow) => (
          <Typography
            variant="body2"
            fontWeight={600}
            color="primary"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}
          >
            {row.applicationId || row._id?.slice(-6).toUpperCase()}
          </Typography>
        ),
      },
      {
        id: "createdAt",
        label: "Application Date",
        minWidth: isMobile ? 100 : 140,
        sortable: true,
        render: (row: ApplicationRow) => <DateDisplay date={row.createdAt} />,
      },
      {
        id: "department",
        label: "Department",
        minWidth: isMobile ? 80 : 120,
        sortable: true,
        filterable: true,
        filterOptions: [
          { label: "হিফজ", value: "hifz" },
          { label: "একাডেমিক", value: "academic" },
          { label: "নাজেরা", value: "nazera" },
          { label: "তাজবীদ", value: "tajbid" },
        ],
        render: (row: ApplicationRow) => (
          <DepartmentChip department={row.department} />
        ),
      },
      {
        id: "_classFlat",
        label: "Class",
        minWidth: isMobile ? 70 : 100,
        sortable: true,
        filterable: true,
        filterOptions: classFilterOptions,
        render: (row: ApplicationRow) => (
          <Typography
            variant="body2"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}
          >
            {row.class}
          </Typography>
        ),
      },
      {
        id: "status",
        label: "Status",
        minWidth: isMobile ? 90 : 120,
        sortable: true,
        filterable: true,
        filterOptions: [
          { label: "Pending", value: "pending" },
          { label: "Approved", value: "approved" },
          { label: "Rejected", value: "rejected" },
          { label: "Enrolled", value: "enrolled" },
        ],
        render: (row: ApplicationRow) => (
          <StatusChip status={row.status as TAdmissionStatus} />
        ),
      },
    ];

    if (!isMobile) {
      cols.push({
        id: "mobile",
        label: "Mobile",
        minWidth: isTablet ? 120 : 140,
        sortable: true,
        filterable: true,
        render: (row: ApplicationRow) => (
          <MobileNumber number={row.mobile || row.fatherMobile} />
        ),
      });
    }

    return cols;
  }, [isMobile, isTablet, classFilterOptions]);
  const rowActions: RowAction[] = useMemo(() => {
    const baseActions: RowAction[] = [
      {
        label: "View",
        icon: <Visibility fontSize="small" />,
        onClick: handleView,
        tooltip: "View details",
        color: "info",
        inMenu: isMobile,
        alwaysShow: !isMobile,
      },
      {
        label: "Edit",
        icon: <Edit fontSize="small" />,
        onClick: handleEdit,
        tooltip: "Edit application",
        color: "primary",
        inMenu: isMobile,
        alwaysShow: !isMobile,
      },
      {
        label: "Download PDF",
        icon: <PictureAsPdf fontSize="small" />,
        onClick: handleDownloadPDF,
        tooltip: "Download as PDF",
        color: "secondary",
        inMenu: true,
      },
      {
        label: "Delete",
        icon: <Delete fontSize="small" />,
        onClick: handleDelete,
        tooltip: "Delete application",
        color: "error",
        inMenu: false,
        alwaysShow: true,
        disabled: () => isDeleting || isUpdating,
      },
    ];

    if (type === "pending") {
      return [
        ...baseActions,
        {
          label: "Approve",
          icon: <CheckCircle fontSize="small" />,
          onClick: handleApprove,
          tooltip: "Approve & go to enrollment",
          color: "success",
          inMenu: true,
        },
        {
          label: "Reject",
          icon: <Cancel fontSize="small" />,
          onClick: handleReject,
          tooltip: "Reject application",
          color: "error",
          inMenu: true,
        },
      ];
    } else if (type === "approved") {
      return [
        ...baseActions,
        {
          label: "Enroll",
          icon: <HowToReg fontSize="small" />,
          onClick: handleEnroll,
          tooltip: "Proceed to enrollment",
          color: "success",
          inMenu: false,
          alwaysShow: true,
        },
        {
          label: "Reject",
          icon: <Cancel fontSize="small" />,
          onClick: handleReject,
          tooltip: "Reject application",
          color: "error",
          inMenu: true,
        },
      ];
    } else if (type === "rejected") {
      return [
        ...baseActions,
        {
          label: "Restore to Pending",
          icon: <Restore fontSize="small" />,
          onClick: handleRestore,
          tooltip: "Restore to pending",
          color: "warning",
          inMenu: true,
        },
        {
          label: "Approve",
          icon: <CheckCircle fontSize="small" />,
          onClick: handleApprove,
          tooltip: "Approve & go to enrollment",
          color: "success",
          inMenu: true,
        },
      ];
    } else {
      // Enrolled type - mostly view-only actions
      return [
        ...baseActions,
        {
          label: "View Enrollment",
          icon: <School fontSize="small" />,
          onClick: (row: ApplicationRow) => {
            router.push(`/dashboard/enrollments/${row._id}`);
          },
          tooltip: "View enrollment details",
          color: "info",
          inMenu: true,
        },
      ];
    }
  }, [
    type,
    isMobile,
    isUpdating,
    isDeleting,
    handleView,
    handleEdit,
    handleDelete,
    handleApprove,
    handleReject,
    handleRestore,
    handleEnroll,
    handleDownloadPDF,
    router,
  ]);

  // ── Bulk actions based on type ────────────────────────────────────────────
  const bulkActions: BulkAction[] = useMemo(() => {
    if (type === "pending") {
      return [
        {
          label: "Approve Selected",
          icon: <CheckCircle fontSize="small" />,
          onClick: handleBulkApprove,
          color: "success",
          disabled: (rows: ApplicationRow[]) =>
            rows.some((r) => r.status !== "pending") ||
            isUpdating ||
            isDeleting,
        },
        {
          label: "Delete",
          icon: <Delete fontSize="small" />,
          onClick: handleBulkDelete,
          color: "error",
          disabled: () => isDeleting || isUpdating,
        },
      ];
    } else if (type === "rejected") {
      return [
        {
          label: "Restore to Pending",
          icon: <Restore fontSize="small" />,
          onClick: handleBulkRestore,
          color: "warning",
          disabled: (rows: ApplicationRow[]) =>
            rows.some((r) => r.status !== "rejected") ||
            isUpdating ||
            isDeleting,
        },
        {
          label: "Approve Selected",
          icon: <CheckCircle fontSize="small" />,
          onClick: handleBulkApprove,
          color: "success",
          disabled: (rows: ApplicationRow[]) =>
            rows.some((r) => r.status !== "rejected") ||
            isUpdating ||
            isDeleting,
        },
        {
          label: "Delete",
          icon: <Delete fontSize="small" />,
          onClick: handleBulkDelete,
          color: "error",
          disabled: () => isDeleting || isUpdating,
        },
      ];
    }
    return [];
  }, [
    type,
    isUpdating,
    isDeleting,
    handleBulkApprove,
    handleBulkDelete,
    handleBulkRestore,
  ]);

  const getHeaderBanner = () => {
    if (type === "pending") {
      return (
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.08)} 0%, ${alpha(theme.palette.warning.light, 0.04)} 100%)`,
            border: `1px solid ${alpha(theme.palette.warning.main, 0.25)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.warning.main, 0.15),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pending sx={{ color: "warning.main", fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} color="warning.dark">
                Pending Applications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                These applications are waiting for review
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Chip
              icon={<Pending />}
              label={`Total Pending: ${totalCount}`}
              color="warning"
              variant="filled"
              sx={{ fontWeight: 600 }}
            />
            <Button
              variant="contained"
              color="warning"
              size="small"
              startIcon={<School />}
              onClick={() => router.push("/dashboard/online-application/new")}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
            >
              New Application
            </Button>
          </Box>
        </Paper>
      );
    } else if (type === "approved") {
      return (
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.08)} 0%, ${alpha(theme.palette.success.light, 0.04)} 100%)`,
            border: `1px solid ${alpha(theme.palette.success.main, 0.25)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.success.main, 0.15),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle sx={{ color: "success.main", fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} color="success.dark">
                Approved Applications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                These students are approved and ready for enrollment
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Chip
              icon={<CheckCircle />}
              label={`Total Approved: ${totalCount}`}
              color="success"
              variant="filled"
              sx={{ fontWeight: 600 }}
            />
            <Button
              variant="contained"
              color="success"
              size="small"
              startIcon={<School />}
              onClick={() => router.push("/dashboard/enrollments/new")}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
            >
              New Enrollment
            </Button>
          </Box>
        </Paper>
      );
    } else if (type === "rejected") {
      return (
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.08)} 0%, ${alpha(theme.palette.error.light, 0.04)} 100%)`,
            border: `1px solid ${alpha(theme.palette.error.main, 0.25)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.error.main, 0.15),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Cancel sx={{ color: "error.main", fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} color="error.dark">
                Rejected Applications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                These applications have been rejected
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Chip
              icon={<Cancel />}
              label={`Total Rejected: ${totalCount}`}
              color="error"
              variant="filled"
              sx={{ fontWeight: 600 }}
            />
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<Restore />}
              onClick={() => router.push("/dashboard/online-application")}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
            >
              Back to Pending
            </Button>
          </Box>
        </Paper>
      );
    } else {
      // Enrolled type
      return (
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.light, 0.04)} 100%)`,
            border: `1px solid ${alpha(theme.palette.secondary.main, 0.25)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.secondary.main, 0.15),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HowToReg sx={{ color: "secondary.main", fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} color="secondary.dark">
                Enrolled Applications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                These students have been successfully enrolled
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Chip
              icon={<HowToReg />}
              label={`Total Enrolled: ${totalCount}`}
              color="secondary"
              variant="filled"
              sx={{ fontWeight: 600 }}
            />
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<School />}
              onClick={() => router.push("/dashboard/enrollments")}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
            >
              View All Enrollments
            </Button>
          </Box>
        </Paper>
      );
    }
  };

  if (isLoading) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Box sx={{ mb: 3 }}>{getHeaderBanner()}</Box>

      <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, height: "100%", width: "100%" }}>
        <CraftTable
          title={
            type === "pending"
              ? "Pending Applications"
              : type === "approved"
                ? "Approved Applications"
                : "Rejected Applications"
          }
          subtitle={`Total ${totalCount} ${type} applications`}
          emptyStateMessage={`No ${type} applications found`}
          columns={columns}
          data={tableData}
          loading={isLoading}
          idField="_id"
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
          onRefresh={refetch}
          onAdd={
            type === "pending"
              ? () => router.push("/dashboard/online-application/new")
              : undefined
          }
          selectable={type === "pending" || type === "rejected"}
          dense={isMobile}
          striped={true}
          hover={true}
          showRowNumbers={!isMobile}
          showToolbar={true}
          maxHeight="calc(100vh - 200px)"
          actionColumnWidth={isMobile ? 100 : 140}
          actionMenuLabel={isMobile ? "" : "Actions"}
          elevation={2}
          borderRadius={3}
        />
      </Box>

      <AdmissionDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        application={selectedApplication}
        loading={modalLoading}
      />
    </>
  );
}
