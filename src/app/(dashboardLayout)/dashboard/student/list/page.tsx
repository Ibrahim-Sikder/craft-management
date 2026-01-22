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
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
  alpha,
  Avatar,
  InputAdornment,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  Print,
  FileDownload,
  Refresh,
  School,
  Phone,
  Email,
} from "@mui/icons-material";
import Link from "next/link";
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "@/redux/api/studentApi";

import Swal from "sweetalert2";
import { useGetAllClassesQuery } from "@/redux/api/classApi";
import { useGetAllSectionsQuery } from "@/redux/api/sectionApi";
import { useGetAllMetaQuery } from "@/redux/api/metaApi";
import CraftTable, { Column, RowAction } from "@/components/Table";

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
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    className: "",
    section: "",
    status: "",
    gender: "",
    studentType: "",
  });

  const { data: metaData } = useGetAllMetaQuery({});

  // Fetch real data from backend
  const {
    data: studentData,
    isLoading,
    refetch,
  } = useGetAllStudentsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  });

  // Fetch class and section data separately
  const { data: classData } = useGetAllClassesQuery({});
  const { data: sectionData } = useGetAllSectionsQuery({});

  const [deleteStudent] = useDeleteStudentMutation();

  const students = studentData?.data || [];
  const totalStudents = studentData?.meta?.total || 0;

  // Extract class and section options from their respective data
  const classOptions = useMemo(() => {
    if (!classData?.data) return [];
    if (Array.isArray(classData.data)) {
      return classData.data.map((cls: any) => ({
        id: cls._id || cls.id,
        name: cls.className || cls.name || cls,
      }));
    } else if (
      classData.data.classes &&
      Array.isArray(classData.data.classes)
    ) {
      return classData.data.classes.map((cls: any) => ({
        id: cls._id || cls.id,
        name: cls.className || cls.name || cls,
      }));
    }
    return [];
  }, [classData]);

  const sectionOptions = useMemo(() => {
    if (!sectionData?.data) return [];
    if (Array.isArray(sectionData.data)) {
      return sectionData.data.map((section: any) => ({
        id: section._id || section.id,
        name: section.name || section.section || section,
      }));
    } else if (
      sectionData.data.sections &&
      Array.isArray(sectionData.data.sections)
    ) {
      return sectionData.data.sections.map((section: any) => ({
        id: section._id || section.id,
        name: section.name || section.section || section,
      }));
    }
    return [];
  }, [sectionData]);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  // Handle filter change
  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      className: "",
      section: "",
      status: "",
      gender: "",
      studentType: "",
    });
    setSearchTerm("");
    setPage(0);
    refetch();
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting data...");
  };

  const handlePrint = () => {
    // Implement print functionality
    window.print();
  };

  const handleAddStudent = () => {
    window.location.href = "/dashboard/student/create";
  };

  const getStudentTypeColor = (type: string) => {
    switch (type) {
      case "Residential":
        return customColors.accent1;
      case "Non-Residential":
        return customColors.accent3;
      case "Day-care":
        return customColors.accent4;
      default:
        return customColors.accent4;
    }
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

  // Define table columns using the Column interface
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
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Email fontSize="small" sx={{ mr: 0.5, fontSize: 12 }} />
              {row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: "className",
      label: "Class",
      minWidth: 100,
      sortable: true,
      filterable: true,
      render: (row: any) => {
        const className =
          Array.isArray(row.className) && row.className.length > 0
            ? row.className[0].className || row.className[0].name
            : "N/A";

        return (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              {className}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {Array.isArray(row.section) && row.section.length > 0
                ? row.section[0].name || row.section[0].section
                : "N/A"}
            </Typography>
          </Box>
        );
      },
    },
    {
      id: "studentClassRoll",
      label: "Roll",
      minWidth: 80,
      sortable: true,
      filterable: true,
      format: (value: string) => (
        <Chip
          label={value}
          size="small"
          sx={{
            bgcolor: alpha(customColors.secondary, 0.1),
            color: customColors.secondary,
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
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Phone fontSize="small" sx={{ mr: 0.5, fontSize: 12 }} />
            {row.fatherMobile}
          </Typography>
        </Box>
      ),
    },
    {
      id: "studentType",
      label: "Type",
      minWidth: 120,
      sortable: true,
      filterable: true,
      format: (value: string) => (
        <Chip
          label={value}
          size="small"
          sx={{
            bgcolor: alpha(getStudentTypeColor(value), 0.1),
            color: getStudentTypeColor(value),
            fontWeight: "medium",
          }}
        />
      ),
    },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      sortable: true,
      filterable: true,
      type: "status",
    },
  ];

  // Define row actions using the RowAction interface
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

  const filteredData = useMemo(() => {
    let filtered = students;

    if (filters.className) {
      filtered = filtered.filter((student: any) => {
        const className =
          Array.isArray(student.className) && student.className.length > 0
            ? student.className[0].className || student.className[0].name
            : "";
        return className === filters.className;
      });
    }

    if (filters.section) {
      filtered = filtered.filter((student: any) => {
        const sectionName =
          Array.isArray(student.section) && student.section.length > 0
            ? student.section[0].name || student.section[0].section
            : "";
        return sectionName === filters.section;
      });
    }

    if (filters.status) {
      filtered = filtered.filter(
        (student: any) => student.status === filters.status
      );
    }

    if (filters.gender) {
      filtered = filtered.filter(
        (student: any) => student.gender === filters.gender
      );
    }

    if (filters.studentType) {
      filtered = filtered.filter(
        (student: any) => student.studentType === filters.studentType
      );
    }

    return filtered;
  }, [students, filters]);

  return (
    <Container maxWidth="xl" sx={{ p: { xs: "4px" } }}>
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

            {/* Secondary Stats - 2 rows of statistics */}
            <div className="flex flex-col justify-center gap-1">
              {/* First row - Student Types */}
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
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: customColors.secondary, fontWeight: "bold", mb: 2 }}
          >
            Student Directory
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by name, ID, email, or mobile..."
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
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => setShowFilters(!showFilters)}
                  color={showFilters ? "primary" : "inherit"}
                  sx={{ borderRadius: 6 }}
                >
                  Filters
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={resetFilters}
                  sx={{ borderRadius: 6 }}
                >
                  Reset
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
            </Grid>
          </Grid>
        </Box>

        {showFilters && (
          <Box
            sx={{
              p: 2,
              bgcolor: alpha(theme.palette.background.paper, 0.7),
              borderRadius: 1,
              mx: 2,
              my: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: `inset 0 2px 4px 0 ${alpha(theme.palette.common.black, 0.05)}`,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                color: customColors.secondary,
                fontWeight: "medium",
              }}
            >
              Advanced Filters
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Class</InputLabel>
                  <Select
                    name="className"
                    value={filters.className}
                    label="Class"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">All Classes</MenuItem>
                    {classOptions.map((cls: any, i: number) => (
                      <MenuItem key={i} value={cls.name}>
                        {cls.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Section</InputLabel>
                  <Select
                    name="section"
                    value={filters.section}
                    label="Section"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">All Sections</MenuItem>
                    {sectionOptions.map((section: any, i: number) => (
                      <MenuItem key={i} value={section.name}>
                        {section.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={filters.status}
                    label="Status"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Graduated">Graduated</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={filters.gender}
                    label="Gender"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">All Genders</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Student Type</InputLabel>
                  <Select
                    name="studentType"
                    value={filters.studentType}
                    label="Student Type"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="Residential">Residential</MenuItem>
                    <MenuItem value="Non-residential">Non-residential</MenuItem>
                    <MenuItem value="Day-care">Day-care</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Using the CraftTable component with all features */}
        <CraftTable
          title="Students"
          subtitle={`Total: ${filteredData.length} students`}
          columns={columns}
          data={filteredData}
          loading={isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onRefresh={handleRefresh}
          onExport={handleExport}
          onPrint={handlePrint}
          onAdd={handleAddStudent}
          rowActions={rowActions}
          selectable={true}
          searchable={false} // We're using our own search above
          filterable={true}
          sortable={true}
          pagination={true}
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
