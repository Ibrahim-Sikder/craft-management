/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Card,
  Chip,
  CircularProgress,
  Container,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Delete,
  Discount as DiscountIcon,
  Edit,
  Visibility,
} from "@mui/icons-material";
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "@/redux/api/studentApi";
import Swal from "sweetalert2";
import CraftTable, { Column, RowAction } from "@/components/Table";
import DiscountSummaryModal from "../list/__components/DiscountSummaryModal";

const DiscountedStudentList = () => {
  const theme = useTheme();

  const customColors = {
    success: "#2e7d32",
  };

  // ── Pagination state ───────────────────────────────────────────────────────
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ── Modal state ────────────────────────────────────────────────────────────
  const [discountSummaryOpen, setDiscountSummaryOpen] = useState(false);
  const [selectedStudentForDiscount, setSelectedStudentForDiscount] =
    useState<any>(null);

  const [deleteStudent] = useDeleteStudentMutation();

  // ── Fetch ALL students ─────────────────────────────────────────────────────
  const {
    data: studentData,
    isLoading,
    refetch,
  } = useGetAllStudentsQuery({
    limit: 1000,
    page: 1,
    searchTerm: "",
  });

  const students = studentData?.data || [];

  // ── Filter only students who have discounts/waivers ────────────────────────
  // Pass the FULL filtered list to CraftTable — let the table handle
  // search, sort, and pagination internally.
  const discountedStudents = useMemo(() => {
    return students.filter((student: any) =>
      student.fees?.some(
        (fee: any) =>
          fee.discount > 0 ||
          fee.waiver > 0 ||
          (fee.lateFeeCustomizations?.length > 0 &&
            fee.lateFeeCustomizations.some(
              (c: any) => c.newAmount < c.previousAmount,
            )),
      ),
    );
  }, [students]);

  // ── Summary stats (header cards) ──────────────────────────────────────────
  const discountStats = useMemo(() => {
    let totalDiscountAmount = 0;
    let totalWaiverAmount = 0;
    let totalLateFeeDiscount = 0;

    discountedStudents.forEach((student: any) => {
      student.fees?.forEach((fee: any) => {
        totalDiscountAmount += fee.discount || 0;
        totalWaiverAmount += fee.waiver || 0;
        totalLateFeeDiscount +=
          fee.lateFeeCustomizations?.reduce(
            (acc: number, c: any) =>
              acc +
              (c.newAmount < c.previousAmount
                ? c.previousAmount - c.newAmount
                : 0),
            0,
          ) || 0;
      });
    });

    return {
      totalStudents: discountedStudents.length,
      totalDiscountAmount,
      totalWaiverAmount,
      totalLateFeeDiscount,
      totalSavings:
        totalDiscountAmount + totalWaiverAmount + totalLateFeeDiscount,
    };
  }, [discountedStudents]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleViewDiscountSummary = (student: any) => {
    setSelectedStudentForDiscount(student);
    setDiscountSummaryOpen(true);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this student?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteStudent(id).unwrap();
          Swal.fire("Deleted!", "Student deleted successfully.", "success");
          refetch();
        } catch (err: any) {
          Swal.fire({
            title: "Error!",
            text: err.data?.message || "Failed to delete.",
            icon: "error",
          });
        }
      }
    });
  };

  // ── Columns ────────────────────────────────────────────────────────────────
  const columns: Column[] = [
    {
      id: "studentId",
      label: "ID",
      minWidth: 100,
      sortable: true,
      filterable: true,
      format: (value: string) => (
        <Chip
          label={value}
          size="small"
          sx={{
            bgcolor: alpha(customColors.success, 0.1),
            color: customColors.success,
            fontWeight: "medium",
          }}
        />
      ),
    },
    {
      id: "name",
      label: "Student",
      minWidth: 170,
      sortable: true,
      filterable: true,
      render: (row: any) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={row.studentPhoto} sx={{ width: 40, height: 40, mr: 2 }}>
            {row.name?.charAt(0) || "U"}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              {row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: "className",
      label: "Class/Section",
      minWidth: 130,
      sortable: true,
      filterable: true,
      render: (row: any) => {
        const className =
          Array.isArray(row.className) && row.className.length > 0
            ? row.className[0]?.className || row.className[0]?.name || "N/A"
            : "N/A";
        const sectionName =
          Array.isArray(row.section) && row.section.length > 0
            ? row.section[0]?.name || row.section[0]?.section || ""
            : "";
        return (
          <Typography variant="body2">
            {className}
            {sectionName && ` - ${sectionName}`}
          </Typography>
        );
      },
    },
    {
      id: "discountBreakdown",
      label: "Discount Details",
      minWidth: 280,
      render: (row: any) => {
        let totalDiscount = 0;
        let totalWaiver = 0;
        let totalLateFeeDiscount = 0;
        const discountMonths: string[] = [];

        row.fees?.forEach((fee: any) => {
          if (fee.discount > 0) {
            totalDiscount += fee.discount;
            discountMonths.push(`${fee.month} (৳${fee.discount})`);
          }
          if (fee.waiver > 0) {
            totalWaiver += fee.waiver;
            discountMonths.push(`${fee.month} (Waiver: ৳${fee.waiver})`);
          }
          const lateFeeDiscounts =
            fee.lateFeeCustomizations?.reduce(
              (acc: number, c: any) =>
                acc +
                (c.newAmount < c.previousAmount
                  ? c.previousAmount - c.newAmount
                  : 0),
              0,
            ) || 0;
          if (lateFeeDiscounts > 0) {
            totalLateFeeDiscount += lateFeeDiscounts;
            discountMonths.push(
              `${fee.month} (Late Fee: ৳${lateFeeDiscounts})`,
            );
          }
        });

        return (
          <Box>
            <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 0.5 }}>
              {totalDiscount > 0 && (
                <Chip
                  label={`Discount: ৳${totalDiscount.toLocaleString()}`}
                  size="small"
                  color="warning"
                  sx={{ fontSize: "0.7rem" }}
                />
              )}
              {totalWaiver > 0 && (
                <Chip
                  label={`Waiver: ৳${totalWaiver.toLocaleString()}`}
                  size="small"
                  color="info"
                  sx={{ fontSize: "0.7rem" }}
                />
              )}
              {totalLateFeeDiscount > 0 && (
                <Chip
                  label={`Late Fee: ৳${totalLateFeeDiscount.toLocaleString()}`}
                  size="small"
                  color="secondary"
                  sx={{ fontSize: "0.7rem" }}
                />
              )}
            </Box>
            {discountMonths.length > 0 && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block" }}
              >
                {discountMonths.slice(0, 2).join(", ")}
                {discountMonths.length > 2 &&
                  ` +${discountMonths.length - 2} more`}
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      id: "totalDiscount",
      label: "Total Saved",
      minWidth: 120,
      align: "right",
      sortable: true,
      render: (row: any) => {
        const total =
          row.fees?.reduce((sum: number, fee: any) => {
            const discount = (fee.discount || 0) + (fee.waiver || 0);
            const lateFeeDiscounts =
              fee.lateFeeCustomizations?.reduce(
                (acc: number, c: any) =>
                  acc +
                  (c.newAmount < c.previousAmount
                    ? c.previousAmount - c.newAmount
                    : 0),
                0,
              ) || 0;
            return sum + discount + lateFeeDiscounts;
          }, 0) || 0;

        return (
          <Typography variant="body2" fontWeight="bold" color="success.main">
            ৳{total.toLocaleString()}
          </Typography>
        );
      },
    },
    {
      id: "discountCount",
      label: "Items",
      minWidth: 80,
      align: "center",
      render: (row: any) => {
        const count =
          row.fees?.filter(
            (fee: any) =>
              fee.discount > 0 ||
              fee.waiver > 0 ||
              (fee.lateFeeCustomizations?.length > 0 &&
                fee.lateFeeCustomizations.some(
                  (c: any) => c.newAmount < c.previousAmount,
                )),
          ).length || 0;

        return (
          <Chip
            label={count}
            size="small"
            color="primary"
            sx={{ fontWeight: "bold" }}
          />
        );
      },
    },
  ];

  // ── Row actions ────────────────────────────────────────────────────────────
  const rowActions: RowAction[] = [
    {
      label: "View",
      icon: <Visibility fontSize="small" />,
      onClick: (row: any) => {
        window.location.href = `/dashboard/student/profile/${row._id}`;
      },
      color: "info",
      tooltip: "View Details",
      alwaysShow: true,
    },
    {
      label: "Edit",
      icon: <Edit fontSize="small" />,
      onClick: (row: any) => {
        window.location.href = `/dashboard/student/update/${row._id}`;
      },
      color: "primary",
      tooltip: "Edit Student",
      alwaysShow: true,
    },
    {
      label: "Discount Summary",
      icon: <DiscountIcon fontSize="small" />,
      onClick: (row: any) => handleViewDiscountSummary(row),
      color: "success",
      tooltip: "View Discount Details",
      inMenu: true,
    },
    {
      label: "Delete",
      icon: <Delete fontSize="small" />,
      onClick: (row: any) => handleDelete(row._id),
      color: "error",
      tooltip: "Delete Student",
      inMenu: true,
    },
  ];

  // ── Loading ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          p: { xs: "4px" },
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

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <Container maxWidth="xl" sx={{ p: { xs: "4px" } }}>
      <Card
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: `0 4px 20px 0 ${alpha(theme.palette.grey[500], 0.2)}`,
        }}
      >
        <CraftTable
          title="Discounted Students"
          subtitle={`${discountedStudents.length} students received discounts`}
          emptyStateMessage="No discounted students found. Students with discounts, waivers, or late fee adjustments will appear here."
          columns={columns}
          // ✅ Pass the FULL filtered list — CraftTable handles search/sort/pagination
          data={discountedStudents}
          loading={isLoading}
          idField="_id"
          // ── pagination (client-side) ──────────────────────────────────
          pagination={true}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(n) => {
            setRowsPerPage(n);
            setPage(0);
          }}
          // ── search / sort / filter (client-side) ─────────────────────
          searchable={true}
          sortable={true}
          serverSideSorting={false}
          filterable={true}
          // ── actions ───────────────────────────────────────────────────
          rowActions={rowActions}
          selectable={true}
          onRefresh={refetch}
          // ── appearance ────────────────────────────────────────────────
          showToolbar={true}
          showRowNumbers={true}
          rowNumberHeader="#"
          maxHeight="60vh"
          actionColumnWidth={140}
          actionMenuLabel="Actions"
          elevation={2}
          borderRadius={2}
        />
      </Card>

      {/* Discount Summary Modal */}
      <DiscountSummaryModal
        open={discountSummaryOpen}
        onClose={() => setDiscountSummaryOpen(false)}
        student={selectedStudentForDiscount}
        fees={selectedStudentForDiscount?.fees || []}
      />
    </Container>
  );
};

export default DiscountedStudentList;
