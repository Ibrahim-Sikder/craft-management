/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CraftTable, { Column, RowAction } from "@/components/Table";

import type React from "react";
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Fade,
  alpha,
  Chip,
  Avatar,
  Stack,
} from "@mui/material";

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  Group as GroupIcon,
  Book as BookIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

import Link from "next/link";
import {
  useDeleteClassMutation,
  useGetAllClassesQuery,
} from "@/redux/api/classApi";
import { theme } from "@/lib/Theme/Theme";

const departmentColors: Record<string, string> = {
  Languages: "#3a7bd5",
  Mathematics: "#00d2ff",
  Science: "#6a11cb",
  History: "#fc4a1a",
  "Computer Science": "#00b09b",
  "Physical Education": "#f46b45",
  Art: "#c471ed",
  Music: "#12c2e9",
  "Not Specified": "#888888",
};

export default function ClassesListPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<any | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteClass] = useDeleteClassMutation();

  const {
    data: classData,
    isLoading,
    refetch,
  } = useGetAllClassesQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  });

  const handleRefresh = () => {
    refetch();
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setPage(0);
  };

  const handleDeleteConfirm = async () => {
    if (selectedClass?._id) {
      try {
        await deleteClass(selectedClass._id).unwrap();
        refetch();
      } catch (error) {
        console.error("Error deleting class:", error);
      }
    }
    setDeleteDialogOpen(false);
    setSelectedClass(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleAddClass = () => {
    // Navigate to add class page
  };

  const handleExport = () => {};

  const handlePrint = () => {
    window.print();
  };

  const classes = classData?.data?.classes || [];
  const totalCount = classData?.data?.meta?.total || 0;

  // Define table columns
  const columns: Column[] = [
    {
      id: "className",
      label: "Class Name",
      minWidth: 180,
      sortable: true,
      render: (row: any) => (
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor:
                departmentColors[row.className] ||
                departmentColors["Not Specified"],
              border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            {row.className?.charAt(0) || "C"}
          </Avatar>
          <Box>
            <Typography variant="body1" fontWeight={600}>
              {row.className}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Class Code: {row.classCode || "N/A"}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      id: "sections",
      label: "Sections",
      minWidth: 150,
      sortable: false,
      render: (row: any) => (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {row.sections?.map((section: any, idx: number) => (
            <Chip
              key={idx}
              label={section.name || `Section ${idx + 1}`}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.info.main, 0.1),
                color: theme.palette.info.main,
                fontWeight: 500,
              }}
            />
          ))}
          {(!row.sections || row.sections.length === 0) && (
            <Typography variant="body2" color="text.secondary">
              No sections
            </Typography>
          )}
        </Stack>
      ),
    },
    {
      id: "classTeacher",
      label: "Class Teacher",
      minWidth: 180,
      sortable: true,
      render: (row: any) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <PersonIcon fontSize="small" color="action" />
          <Typography variant="body2">
            {row.classTeacher?.name || row.teacherName || "Not Assigned"}
          </Typography>
        </Stack>
      ),
    },
    {
      id: "totalStudents",
      label: "Students",
      minWidth: 100,
      align: "center",
      sortable: true,
      render: (row: any) => (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <GroupIcon fontSize="small" color="primary" />
          <Typography variant="body2" fontWeight={600}>
            {row.totalStudents || row.studentCount || 0}
          </Typography>
        </Stack>
      ),
    },
    {
      id: "totalSubjects",
      label: "Subjects",
      minWidth: 100,
      align: "center",
      sortable: true,
      render: (row: any) => (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <BookIcon fontSize="small" color="secondary" />
          <Typography variant="body2" fontWeight={600}>
            {row.totalSubjects || row.subjectCount || 0}
          </Typography>
        </Stack>
      ),
    },
    {
      id: "totalTeachers",
      label: "Teachers",
      minWidth: 100,
      align: "center",
      sortable: true,
      render: (row: any) => (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <SchoolIcon fontSize="small" color="success" />
          <Typography variant="body2" fontWeight={600}>
            {row.totalTeachers || row.teacherCount || 0}
          </Typography>
        </Stack>
      ),
    },
  ];

  // Define row actions
  const rowActions: RowAction[] = [
    {
      label: "Edit",
      icon: <EditIcon fontSize="small" />,
      onClick: (row: any) => {
        window.location.href = `/dashboard/classes/class/update?id=${row._id}`;
      },
      tooltip: "Edit Class",
      color: "warning",
    },
    {
      label: "Delete",
      icon: <DeleteIcon fontSize="small" />,
      onClick: (row: any) => {
        setSelectedClass(row);
        setDeleteDialogOpen(true);
      },
      tooltip: "Delete Class",
      color: "error",
    },
  ];

  // Format data for table
  const formattedClasses = classes.map((classItem: any) => ({
    ...classItem,
    id: classItem._id,
    className: classItem.className,
    sections: classItem.sections,
    classTeacher: classItem.classTeacher,
    totalStudents: classItem.totalStudents || classItem.studentCount || 0,
    totalSubjects: classItem.totalSubjects || classItem.subjectCount || 0,
    totalTeachers: classItem.totalTeachers || classItem.teacherCount || 0,
    status: classItem.status || "Active",
    classCode: classItem.classCode,
  }));

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          minHeight: "100vh",
          borderRadius: 2,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2 }}>
          <Fade in={true} timeout={800}>
            <Box>
              <CraftTable
                title="Class Management"
                columns={columns}
                data={formattedClasses}
                loading={isLoading}
                rowActions={rowActions}
                searchable={true}
                filterable={true}
                sortable={true}
                pagination={true}
                selectable={true}
                onRefresh={handleRefresh}
                onExport={handleExport}
                onPrint={handlePrint}
                onAdd={handleAddClass}
                onSearchChange={handleSearchChange}
                idField="_id"
                defaultSortColumn="className"
                defaultSortDirection="asc"
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(newPage) => setPage(newPage)}
                onRowsPerPageChange={(newRowsPerPage) => {
                  setRowsPerPage(newRowsPerPage);
                  setPage(0);
                }}
                emptyStateMessage="No classes found matching your search criteria"
                showRowNumbers={true}
                rowNumberHeader="SN"
                actionColumnWidth={100}
                actionMenuLabel="Actions"
                elevation={2}
                borderRadius={3}
                dense={false}
                striped={true}
                hover={true}
                stickyHeader={true}
                maxHeight="70vh"
                serverSideSorting={false}
                bulkActions={[
                  {
                    label: "Export Selected",
                    icon: <FileDownloadIcon />,
                    onClick: (selectedRows) => {},
                  },
                ]}
              />
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: 3,
            width: "100%",
            maxWidth: 480,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Delete Class
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the class
            {selectedClass?.className}? This action cannot be undone. All
            sections and student records may be affected.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="inherit"
            sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ ml: 2 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
