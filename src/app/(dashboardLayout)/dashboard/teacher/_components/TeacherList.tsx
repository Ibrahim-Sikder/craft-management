/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type { Teacher, TeacherStatus } from "@/interface";
import {
  useDeleteTeacherMutation,
  useGetAllTeachersQuery,
} from "@/redux/api/teacherApi";
import {
  Delete,
  Edit,
  Mail as MailIcon,
  Phone,
  Visibility,
} from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CraftTable, { Column, RowAction } from "@/components/Table";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function TeacherList() {
  const theme = useTheme();
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [filterDepartment, setFilterDepartment] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const {
    data: teacherData,
    isLoading,
    refetch,
  } = useGetAllTeachersQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  });

  const [deleteTeacher] = useDeleteTeacherMutation();

  useEffect(() => {
    if (teacherData && teacherData.data && !isLoading) {
      const formattedTeachers = teacherData.data.map(
        (teacher: any, index: number) => {
          let department = "Not Specified";
          if (teacher.department) {
            department = teacher.department;
          } else if (teacher.professionalInfo?.department) {
            department = teacher.professionalInfo.department;
          }

          const teacherName = teacher.englishName || teacher.name || "Unknown";

          const status =
            teacher.status?.toLowerCase() === "active" ||
            teacher.additionalInfo?.status?.toLowerCase() === "active"
              ? ("Active" as TeacherStatus)
              : ("Inactive" as TeacherStatus);
          const experience = calculateExperience(
            teacher.joiningDate || teacher.professionalInfo?.joiningDate,
          );

          return {
            id: index + 1,
            _id: teacher._id,
            name: teacherName,
            teacherPhoto: teacher.teacherPhoto || "",
            department: department,
            status: status,
            email: teacher.email || "Not Available",
            phone: teacher.phone || "Not Available",
            subjects: [],
            classes: [],
            experience: experience,
            rating: "4.5",
            performance: 85,
            students: 120,
            joinDate: new Date(
              teacher.joiningDate ||
                teacher.professionalInfo?.joiningDate ||
                teacher.createdAt,
            ).toLocaleDateString(),
            qualifications:
              teacher.designation ||
              teacher.professionalInfo?.designation ||
              "Teacher",
            teacherId: teacher.teacherId || "",
          };
        },
      );

      setTeachers(formattedTeachers);
    }
  }, [teacherData, isLoading]);

  const calculateExperience = (joiningDate: string | undefined) => {
    if (!joiningDate) return 0;
    const joinDate = new Date(joiningDate);
    const now = new Date();
    const yearsDiff = Math.floor(
      (now.getTime() - joinDate.getTime()) / (365 * 24 * 60 * 60 * 1000),
    );
    return yearsDiff >= 0 ? yearsDiff : 0;
  };

  const handleViewTeacher = (teacher: Teacher) => {
    router.push(`/dashboard/teacher/profile/${teacher._id}`);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    router.push(`/dashboard/teacher/update/${teacher._id}`);
  };

  const handleDeleteTeacher = async (teacher: Teacher) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You want to delete ${teacher.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteTeacher(teacher._id).unwrap();

        Swal.fire({
          title: "Deleted!",
          text: `${teacher.name} has been deleted successfully.`,
          icon: "success",
        });

        refetch();
      }
    } catch (err: any) {
      Swal.fire({
        title: "Error!",
        text: err.data?.message || "Failed to delete teacher",
        icon: "error",
      });
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleSortChange = (column: string, direction: "asc" | "desc") => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setPage(0);
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      filterDepartment === "all" || teacher.department === filterDepartment,
  );

  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    let comparison = 0;
    if (sortColumn === "name") comparison = a.name.localeCompare(b.name);
    else if (sortColumn === "department")
      comparison = a.department.localeCompare(b.department);
    else if (sortColumn === "experience")
      comparison = a.experience - b.experience;
    else if (sortColumn === "rating")
      comparison = Number.parseFloat(a.rating) - Number.parseFloat(b.rating);
    else if (sortColumn === "performance")
      comparison = a.performance - b.performance;
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const columns: Column[] = [
    {
      id: "teacherPhoto",
      label: "Photo",
      minWidth: 70,
      align: "center",
      type: "avatar",
      sortable: false,
      render: (row: Teacher) => (
        <Avatar
          src={row.teacherPhoto}
          sx={{
            width: 48,
            height: 48,
            border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            boxShadow: theme.shadows[1],
            mx: "auto",
          }}
        >
          {row.name.charAt(0)}
        </Avatar>
      ),
    },
    {
      id: "name",
      label: "Teacher Name",
      minWidth: 180,
      sortable: true,
      render: (row: Teacher) => (
        <Box>
          <Typography variant="body1" fontWeight={600}>
            {row.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ID: {row.teacherId}
          </Typography>
        </Box>
      ),
    },
    // {
    //   id: "department",
    //   label: "Department",
    //   minWidth: 140,
    //   sortable: true,
    //   render: (row: Teacher) => (
    //     <DepartmentChip
    //       label={row.department}
    //       size="small"
    //       sx={{
    //         backgroundColor: alpha(
    //           departmentColors[row.department] ||
    //             departmentColors["Not Specified"],
    //           0.1,
    //         ),
    //         color:
    //           departmentColors[row.department] ||
    //           departmentColors["Not Specified"],
    //         fontWeight: 500,
    //       }}
    //     />
    //   ),
    // },
    {
      id: "qualifications",
      label: "Qualification",
      minWidth: 150,
      sortable: false,
      render: (row: Teacher) => (
        <Box>
          <Typography variant="body2">{row.qualifications}</Typography>
          <Typography variant="caption" color="text.secondary">
            {row.experience} years exp.
          </Typography>
        </Box>
      ),
    },
    {
      id: "email",
      label: "Contact",
      minWidth: 200,
      sortable: false,
      render: (row: Teacher) => (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <MailIcon fontSize="small" color="action" />
            <Typography variant="body2" noWrap>
              {row.email}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Phone fontSize="small" color="action" />
            <Typography variant="body2">{row.phone}</Typography>
          </Box>
        </Box>
      ),
    },
  ];

  const rowActions: RowAction[] = [
    {
      label: "View",
      icon: <Visibility fontSize="small" />,
      onClick: (row: Teacher) => handleViewTeacher(row),
      tooltip: "View Profile",
      color: "info",
    },
    {
      label: "Edit",
      icon: <Edit fontSize="small" />,
      onClick: (row: Teacher) => handleEditTeacher(row),
      tooltip: "Edit Teacher",
      color: "warning",
    },
    {
      label: "Delete",
      icon: <Delete fontSize="small" />,
      onClick: (row: Teacher) => handleDeleteTeacher(row),
      tooltip: "Delete Teacher",
      color: "error",
    },
  ];

  const getFilteredData = () => {
    if (filterDepartment === "all") return sortedTeachers;
    return sortedTeachers.filter(
      (teacher) => teacher.department === filterDepartment,
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Container maxWidth="xl" sx={{ p: { xs: "4px", mt: 4 } }}>
        <CraftTable
          title="Teachers Management"
          columns={columns}
          data={getFilteredData()}
          loading={isLoading}
          rowActions={rowActions}
          searchable={true}
          filterable={true}
          sortable={true}
          pagination={true}
          selectable={true}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
          idField="_id"
          defaultSortColumn="name"
          defaultSortDirection="asc"
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          onRowsPerPageChange={(newRowsPerPage) => {
            setRowsPerPage(newRowsPerPage);
            setPage(0);
          }}
          emptyStateMessage="No teachers found matching your search criteria"
          showRowNumbers={true}
          rowNumberHeader="SN"
          actionColumnWidth={140}
          actionMenuLabel="Actions"
          elevation={2}
          borderRadius={3}
          dense={false}
          striped={true}
          hover={true}
          stickyHeader={true}
          serverSideSorting={false}
          bulkActions={[
            {
              label: "Export Selected",
              icon: <FileDownloadIcon />,
              onClick: (selectedRows) => {
                console.log("Exporting selected:", selectedRows);
              },
            },
          ]}
        />
      </Container>
    </Box>
  );
}
