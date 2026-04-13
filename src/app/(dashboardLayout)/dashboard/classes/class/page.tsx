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

import ClassModal from "./_components/ClassForm";
import Swal from "sweetalert2";

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
  const [deleteClass] = useDeleteClassMutation();

  // Single modal state for both create and update
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClassId, setEditingClassId] = useState<string | null>(null);

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

  const handleDeleteConfirm = async (classItem: any) => {
    const result = await Swal.fire({
      title: "Delete Class?",
      html: `Are you sure you want to delete <strong>${classItem?.className}</strong>?<br><span style="font-size: 0.9rem;">This action cannot be undone. All sections and student records may be affected.</span>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "swal2-popup-custom",
        title: "swal2-title-custom",
        htmlContainer: "swal2-html-custom",
      },
    });

    if (result.isConfirmed) {
      try {
        await deleteClass(classItem._id).unwrap();
        refetch();

        Swal.fire({
          title: "Deleted!",
          text: "Class has been deleted successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting class:", error);

        Swal.fire({
          title: "Error!",
          text: "Failed to delete class. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  // Open modal for create
  const handleAddClass = () => {
    setEditingClassId(null); // Clear any edit ID
    setIsModalOpen(true);
  };

  // Open modal for edit
  const handleEditClass = (id: string) => {
    setEditingClassId(id); // Set the edit ID
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClassId(null); // Reset editing ID when closing
  };

  const handleModalSuccess = () => {
    refetch(); // Refresh the table data
    setIsModalOpen(false); // Close modal
    setEditingClassId(null); // Reset editing ID
  };

  const handleExport = () => {};

  const handlePrint = () => {
    window.print();
  };

  const classes = classData?.data?.classes || [];

  const columns: Column[] = [
    {
      id: "className",
      label: "Class Name",
      minWidth: 180,
      sortable: true,
    },
  ];

  // Define row actions
  const rowActions: RowAction[] = [
    {
      label: "Edit",
      icon: <EditIcon fontSize="small" />,
      onClick: (row: any) => {
        handleEditClass(row._id);
      },
      tooltip: "Edit Class",
      color: "warning",
    },
    {
      label: "Delete",
      icon: <DeleteIcon fontSize="small" />,
      onClick: (row: any) => {
        handleDeleteConfirm(row);
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
                onAdd={handleAddClass}
                onSearchChange={handleSearchChange}
                idField="_id"
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
      <ClassModal
        id={editingClassId}
        onSuccess={handleModalSuccess}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
