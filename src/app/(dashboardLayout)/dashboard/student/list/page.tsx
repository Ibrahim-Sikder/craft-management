/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Paper,
  Typography,
  useTheme,
  alpha,
  Avatar,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Refresh,
  School,
  Phone,
} from "@mui/icons-material";
import Link from "next/link";
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "@/redux/api/studentApi";
import Swal from "sweetalert2";
import { useGetAllSectionsQuery } from "@/redux/api/sectionApi";
import { useGetAllMetaQuery } from "@/redux/api/metaApi";
import CraftTable, { Column, RowAction } from "@/components/Table";

// Reference order for classes (only used for sorting filter options)
const classOrder = [
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

  const { data: metaData } = useGetAllMetaQuery({});

  // Fetch all students (high limit to allow client‑side filtering/pagination)
  const {
    data: studentData,
    isLoading,
    refetch,
  } = useGetAllStudentsQuery({
    limit: 1000,
    page: 1,
  });

  const { data: sectionData } = useGetAllSectionsQuery({});

  const [deleteStudent] = useDeleteStudentMutation();

  const students = studentData?.data || [];
  const totalStudents = studentData?.meta?.total || 0;

  // Prepare table data with flattened fields for class and section
  const tableData = useMemo(() => {
    return students.map((student: any) => {
      // Extract class name
      let className = "N/A";
      if (Array.isArray(student.className) && student.className.length > 0) {
        className =
          student.className[0].className || student.className[0].name || "N/A";
      }

      // Extract section name
      let sectionName = "N/A";
      if (Array.isArray(student.section) && student.section.length > 0) {
        sectionName =
          student.section[0].name || student.section[0].section || "N/A";
      }

      return {
        ...student,
        _className: className,
        _sectionName: sectionName,
      };
    });
  }, [students]);

  // Build class filter options dynamically from the data (only classes that appear)
  const classFilterOptions = useMemo(() => {
    const seen = new Set<string>();
    const options: { value: string; label: string }[] = [];

    tableData.forEach((item: any) => {
      const cls = item._className;
      if (cls && cls !== "N/A" && !seen.has(cls)) {
        seen.add(cls);
        options.push({ value: cls, label: cls });
      }
    });

    // Sort according to the reference order
    return options.sort((a, b) => {
      const ia = classOrder.indexOf(a.value);
      const ib = classOrder.indexOf(b.value);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return a.label.localeCompare(b.label);
    });
  }, [tableData]);

  // Build section filter options from sectionData (all available sections)
  const sectionFilterOptions = useMemo(() => {
    if (!sectionData?.data) return [];
    let sections: any[] = [];
    if (Array.isArray(sectionData.data)) {
      sections = sectionData.data;
    } else if (
      sectionData.data.sections &&
      Array.isArray(sectionData.data.sections)
    ) {
      sections = sectionData.data.sections;
    }
    return sections.map((sec: any) => ({
      value: sec.name || sec.section,
      label: sec.name || sec.section,
    }));
  }, [sectionData]);

  const handleRefresh = () => {
    refetch();
  };

  const handleExport = () => {};

  const handlePrint = () => {
    window.print();
  };

  const handleAddStudent = () => {
    window.location.href = "/dashboard/student/create";
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
          Swal.fire({
            title: "Deleted!",
            text: `Student has been deleted successfully.`,
            icon: "success",
          });
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

  // Define table columns – using only fields that actually exist in the data
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
            bgcolor: alpha(customColors.accent3, 0.1),
            color: customColors.accent3,
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
          <Avatar
            src={row.studentPhoto}
            sx={{
              width: 40,
              height: 40,
              border: "2px solid white",
              mr: 2,
            }}
          >
            {row.name?.charAt(0) || "U"}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              {row.name}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: "_className",
      label: "Class",
      minWidth: 100,
      sortable: true,
      filterable: true,
      filterOptions: classFilterOptions,
      render: (row: any) => (
        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
          {row._className}
        </Typography>
      ),
    },
    {
      id: "_sectionName",
      label: "Section",
      minWidth: 100,
      sortable: true,
      filterable: true,
      filterOptions: sectionFilterOptions,
      render: (row: any) => (
        <Typography variant="body2" color="text.secondary">
          {row._sectionName}
        </Typography>
      ),
    },
    {
      id: "studentDepartment",
      label: "Department",
      minWidth: 120,
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: "academic", label: "Academic" },
        { value: "hifz", label: "Hifz" },
        // add other departments as needed
      ],
      render: (row: any) => (
        <Chip
          label={row.studentDepartment || "N/A"}
          size="small"
          sx={{
            bgcolor:
              row.studentDepartment === "hifz"
                ? alpha(customColors.accent1, 0.1)
                : alpha(customColors.accent3, 0.1),
            color:
              row.studentDepartment === "hifz"
                ? customColors.accent1
                : customColors.accent3,
            fontWeight: "medium",
          }}
        />
      ),
    },
    {
      id: "fatherName",
      label: "Guardian",
      minWidth: 120,
      sortable: true,
      filterable: true,
      render: (row: any) => (
        <Box>
          <Typography variant="body2">{row.fatherName}</Typography>
          <Typography variant="caption" color="text.secondary">
            Father
          </Typography>
        </Box>
      ),
    },
    {
      id: "mobile",
      label: "Contact",
      minWidth: 150,
      sortable: true,
      filterable: true,
      render: (row: any) => (
        <Box>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Phone fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
            {row.mobile || "N/A"}
          </Typography>
        </Box>
      ),
    },
    {
      id: "bloodGroup",
      label: "Blood Group",
      minWidth: 100,
      sortable: true,
      filterable: true,
      render: (row: any) => (
        <Typography variant="body2">{row.bloodGroup || "N/A"}</Typography>
      ),
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
      label: "Delete",
      icon: <Delete fontSize="small" />,
      onClick: (row: any) => handleDelete(row._id),
      color: "error",
      tooltip: "Delete Student",
      inMenu: true,
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ p: { xs: "4px" } }}>
      {/* Header Banner */}
      <Paper
        className="mb-6 py-6 rounded-lg text-white"
        style={{
          background: "linear-gradient(135deg, #6a1b9a 0%, #283593 100%)",
        }}
      >
        <div className="flex flex-col items-center justify-center content-center">
          <div className="flex flex-row justify-center items-center content-center text-white">
            <School sx={{ mr: 1, fontSize: { sm: 25, md: 40 } }} />
            <div className="text-lg md:text-4xl font-bold">
              Student Management System
            </div>
          </div>

          <div className="mt-2">
            <div className="flex justify-center mb-2">
              <Chip
                label={`Total Students: ${metaData?.data?.totalStudents}`}
                sx={{
                  bgcolor: alpha("#ffffff", 0.2),
                  color: "white",
                  fontWeight: 600,
                  px: 2,
                  py: 0.5,
                  fontSize: "1rem",
                }}
              />
            </div>

            <div className="flex flex-col justify-center gap-1">
              <div className="grid grid-cols-2 md:grid-cols-3 justify-center gap-1">
                <Chip
                  label={`Residential: ${metaData?.data?.totalResidentialStudents}`}
                  sx={{
                    bgcolor: alpha(customColors.accent1, 0.7),
                    color: "white",
                    fontWeight: 500,
                  }}
                />
                <Chip
                  label={`Non-residential: ${metaData?.data?.totalNonResidentialStudents}`}
                  sx={{
                    bgcolor: alpha(customColors.accent3, 0.7),
                    color: "white",
                    fontWeight: 500,
                  }}
                />
                <Chip
                  label={`Day-care: ${metaData?.data?.totalDayCareStudents}`}
                  sx={{
                    bgcolor: alpha(customColors.accent4, 0.7),
                    color: "white",
                    fontWeight: 500,
                  }}
                />
                <Chip
                  label={`Male: ${metaData?.data?.totalMaleStudents}`}
                  sx={{
                    bgcolor: alpha(customColors.info, 0.7),
                    color: "white",
                    fontWeight: 500,
                  }}
                />
                <Chip
                  label={`Female: ${metaData?.data?.totalFemaleStudents}`}
                  sx={{
                    bgcolor: alpha(customColors.secondary, 0.7),
                    color: "white",
                    fontWeight: 500,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Paper>

      <Card
        sx={{
          mb: 3,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: `0 4px 20px 0 ${alpha(theme.palette.grey[500], 0.2)}`,
        }}
      >
        <Box
          sx={{
            p: 2,
            background: `linear-gradient(90deg, ${alpha(customColors.secondary, 0.1)} 0%, ${alpha(customColors.accent2, 0.05)} 100%)`,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: customColors.secondary, fontWeight: "bold" }}
          >
            Student Directory
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRefresh}
              sx={{ borderRadius: 6 }}
            >
              Refresh
            </Button>
            <Button
              component={Link}
              href="/dashboard/student/create"
              variant="contained"
              startIcon={<Add />}
              sx={{
                borderRadius: 6,
                background: `linear-gradient(45deg, ${customColors.primary} 30%, ${customColors.accent3} 90%)`,
                boxShadow: `0 3px 5px 2px ${alpha(customColors.primary, 0.3)}`,
              }}
            >
              Add Student
            </Button>
          </Box>
        </Box>

        {/* CraftTable */}
        <CraftTable
          title="Students"
          subtitle={`Total: ${totalStudents} students`}
          columns={columns}
          data={tableData}
          loading={isLoading}
          pagination={true}
          searchable={true}
          filterable={true}
          sortable={true}
          serverSideSorting={false}
          rowActions={rowActions}
          selectable={true}
          onRefresh={handleRefresh}
          onExport={handleExport}
          onPrint={handlePrint}
          onAdd={handleAddStudent}
          emptyStateMessage="No students found. Try adjusting your filters or add new students."
          idField="_id"
          height="auto"
          maxHeight="60vh"
          stickyHeader={true}
          dense={false}
          striped={true}
          hover={true}
          showToolbar={true}
          elevation={0}
          borderRadius={0}
          cardSx={{ boxShadow: "none" }}
          showRowNumbers={true}
          rowNumberHeader="#"
          actionColumnWidth={140}
          actionMenuLabel="Actions"
          loadingOverlay={true}
          fadeIn={true}
        />
      </Card>
    </Container>
  );
};

export default StudentList;
