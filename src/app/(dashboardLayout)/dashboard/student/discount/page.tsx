/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
  alpha,
  Avatar,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  Refresh,
  School,
  Email,
  Discount as DiscountIcon,
} from "@mui/icons-material";
import Link from "next/link";
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "@/redux/api/studentApi";
import Swal from "sweetalert2";
import CraftTable, { Column, RowAction } from "@/components/Table";
import DiscountSummaryModal from "../list/__components/DiscountSummaryModal";

const StudentList = () => {
  const theme = useTheme();

  const customColors = {
    primary: "#6a1b9a",
    secondary: "#00838f",
    success: "#2e7d32",
    error: "#c62828",
    warning: "#ff8f00",
    info: "#0277bd",
    accent1: "#ad1457",
    accent2: "#6a1b9a",
    accent3: "#283593",
    accent4: "#00695c",
    background: "#f5f5f5",
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [discountSummaryOpen, setDiscountSummaryOpen] = useState(false);
  const [selectedStudentForDiscount, setSelectedStudentForDiscount] =
    useState<any>(null);

  const [deleteStudent] = useDeleteStudentMutation();

  // Fetch ALL students with a large limit
  const {
    data: studentData,
    isLoading,
    refetch,
  } = useGetAllStudentsQuery({
    limit: 1000, // Get all students
    page: 1,
    searchTerm: "",
  });

  console.log("Student Data from API:", studentData); // Debug log

  const students = studentData?.data || [];

  // Filter ONLY students who have discounts
  const discountedStudents = useMemo(() => {
    if (!students.length) return [];

    const discounted = students.filter((student: any) => {
      // Check if any fee has discount, waiver, or late fee customization
      const hasDiscount = student.fees?.some(
        (fee: any) =>
          fee.discount > 0 ||
          fee.waiver > 0 ||
          (fee.lateFeeCustomizations?.length > 0 &&
            fee.lateFeeCustomizations.some(
              (c: any) => c.newAmount < c.previousAmount,
            )),
      );

      if (hasDiscount) {
        console.log("Found discounted student:", student.name, student.fees); // Debug log
      }

      return hasDiscount;
    });

    // Apply search filter
    if (searchTerm) {
      return discounted.filter(
        (student: any) =>
          student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return discounted;
  }, [students, searchTerm]);

  console.log("Discounted Students:", discountedStudents); // Debug log

  // Calculate discount statistics
  const discountStats = useMemo(() => {
    let totalDiscountAmount = 0;
    let totalWaiverAmount = 0;
    let totalLateFeeDiscount = 0;

    discountedStudents.forEach((student: any) => {
      student.fees?.forEach((fee: any) => {
        totalDiscountAmount += fee.discount || 0;
        totalWaiverAmount += fee.waiver || 0;

        const lateFeeDiscounts =
          fee.lateFeeCustomizations?.reduce(
            (acc: number, c: any) =>
              acc +
              (c.newAmount < c.previousAmount
                ? c.previousAmount - c.newAmount
                : 0),
            0,
          ) || 0;
        totalLateFeeDiscount += lateFeeDiscounts;
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

  // Paginate discounted students
  const paginatedStudents = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return discountedStudents.slice(start, end);
  }, [discountedStudents, page, rowsPerPage]);

  const handleRefresh = () => {
    refetch();
  };

  const handleAddStudent = () => {
    window.location.href = "/dashboard/student/create";
  };

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
          Swal.fire(
            "Deleted!",
            "Student has been deleted successfully.",
            "success",
          );
          refetch();
        } catch (err: any) {
          Swal.fire({
            title: "Error!",
            text: err.data?.message || "Failed to delete student",
            icon: "error",
          });
        }
      }
    });
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  // Columns for discounted students
  const columns: Column[] = [
    {
      id: "studentId",
      label: "ID",
      minWidth: 100,
      sortable: true,
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
      minWidth: 120,
      sortable: true,
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
            {className} {sectionName && `- ${sectionName}`}
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

  // Row actions
  const rowActions: RowAction[] = [
    {
      label: "View",
      icon: <Visibility fontSize="small" />,
      onClick: (row: any) => {
        window.location.href = `/dashboard/student/profile/${row._id}`;
      },
      color: "info",
      tooltip: "View Details",
    },
    {
      label: "Edit",
      icon: <Edit fontSize="small" />,
      onClick: (row: any) => {
        window.location.href = `/dashboard/student/update/${row._id}`;
      },
      color: "primary",
      tooltip: "Edit Student",
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

  return (
    <Container maxWidth="xl" sx={{ p: { xs: "4px" } }}>
      <Card
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: `0 4px 20px 0 ${alpha(theme.palette.grey[500], 0.2)}`,
        }}
      >
        {/* Search and Action Bar */}
        <Box
          sx={{
            p: 2,
            background: `linear-gradient(90deg, ${alpha(customColors.secondary, 0.1)} 0%, ${alpha(customColors.accent2, 0.05)} 100%)`,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search discounted students..."
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="primary" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 },
                }}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Students Table */}
        {discountedStudents.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No discounted students found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Students with discounts, waivers, or late fee adjustments will
              appear here.
            </Typography>
          </Box>
        ) : (
          <CraftTable
            title="Discounted Students"
            subtitle={`${discountedStudents.length} students received discounts`}
            columns={columns}
            data={paginatedStudents}
            loading={isLoading}
            page={page}
            rowsPerPage={rowsPerPage}
            // totalCount={discountedStudents.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onRefresh={handleRefresh}
            rowActions={rowActions}
            selectable={true}
            searchable={false}
            sortable={true}
            pagination={true}
            emptyStateMessage="No discounted students found."
            idField="_id"
            maxHeight="60vh"
            showRowNumbers={true}
            rowNumberHeader="#"
            actionColumnWidth={140}
            actionMenuLabel="Actions"
          />
        )}
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

export default StudentList;
