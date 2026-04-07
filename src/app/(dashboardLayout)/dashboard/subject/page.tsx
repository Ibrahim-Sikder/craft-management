/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CraftTable, { Column, RowAction } from "@/components/Table";
import {
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useGetAllSubjectsQuery,
  useUpdateSubjectMutation,
} from "@/redux/api/subjectApi";
import { customTheme } from "@/ThemeStyle";
import {
  Assignment as AssignmentIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { Avatar, Box, Chip, Container, Fade, Typography } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import type { FieldValues } from "react-hook-form";
import SubjectFormModal from "./_components/SubjectFormModal";

export default function SubjectManagementPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any | null>(null);

  const {
    data: subjectData,
    isLoading,
    refetch,
  } = useGetAllSubjectsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  });

  const [createSubject] = useCreateSubjectMutation();
  const [updateSubject] = useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();

  const subjects = subjectData?.data?.subjects || [];

  const getSubjectColor = (name: string) => {
    const colors = [
      customTheme.palette.primary.main,
      customTheme.palette.secondary.main,
      customTheme.palette.success.main,
      customTheme.palette.warning.main,
      customTheme.palette.error.main,
      customTheme.palette.info.main,
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleDeleteClick = async (subject: any) => {
    const result = await Swal.fire({
      title: "Delete Subject",
      html: `Are you sure you want to delete the subject <strong>"${subject.name}"</strong>?<br/>This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteSubject(subject._id).unwrap();
        if (res.success) {
          toast.success(`Subject "${subject.name}" deleted successfully`);
          refetch();

          Swal.fire({
            title: "Deleted!",
            text: `Subject "${subject.name}" has been deleted.`,
            icon: "success",
            confirmButtonColor: "#3085d6",
            timer: 2000,
          });
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete subject");

        Swal.fire({
          title: "Error!",
          text: error?.data?.message || "Failed to delete subject",
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      }
    }
  };

  const handleAddClick = () => {
    setEditingSubject(null);
    setModalOpen(true);
  };

  const handleEditClick = (subject: any) => {
    setEditingSubject(subject);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingSubject(null);
  };

  const handleSubjectSubmit = async (data: FieldValues) => {
    try {
      let res;

      if (!editingSubject) {
        res = await createSubject(data).unwrap();
        if (res.success) {
          toast.success("Subject created successfully!");
          refetch();
          handleModalClose();
        }
      } else {
        res = await updateSubject({
          id: editingSubject._id,
          body: { ...data },
        }).unwrap();
        if (res.success) {
          toast.success("Subject updated successfully!");
          refetch();
          handleModalClose();
        }
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.errorSources?.[0]?.message ||
        "Subject already exists!";
      toast.error(errorMessage);
    }
  };

  const columns: Column[] = [
    {
      id: "name",
      label: "Subject",
      sortable: true,
      filterable: true,
      render: (row: any) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={row.image || ""}
            sx={{
              width: 32,
              height: 32,
              mr: 1.5,
              bgcolor: getSubjectColor(row.name),
              fontSize: "0.875rem",
            }}
          >
            {row.name?.charAt(0) || "S"}
          </Avatar>
          <Typography variant="body2">{row.name}</Typography>
        </Box>
      ),
    },
    {
      id: "paper",
      label: "Paper",
      sortable: true,
      filterable: true,
      render: (row: any) => (
        <Chip
          icon={<AssignmentIcon fontSize="small" />}
          label={row.paper}
          size="small"
          color="info"
          sx={{ fontWeight: 500 }}
        />
      ),
    },
  ];

  const rowActions: RowAction[] = [
    {
      label: "Edit",
      icon: <EditIcon />,
      onClick: (row) => {
        handleEditClick(row);
      },
      color: "warning",
      tooltip: "Edit Subject",
    },
    {
      label: "Delete",
      icon: <DeleteIcon />,
      onClick: (row) => {
        handleDeleteClick(row);
      },
      color: "error",
      tooltip: "Delete Subject",
    },
  ];

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
                title="Subject Management"
                columns={columns}
                data={subjects}
                loading={isLoading}
                idField="_id"
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={setPage}
                onRowsPerPageChange={setRowsPerPage}
                onAdd={handleAddClick}
                onSearchChange={setSearchTerm}
                rowActions={rowActions}
                searchable={true}
                filterable={true}
                sortable={true}
                pagination={true}
                serverSideSorting={true}
                emptyStateMessage="No subjects found"
                showRowNumbers={true}
                actionColumnWidth={120}
                actionMenuLabel="Actions"
              />
            </Box>
          </Fade>
        </Container>
      </Box>

      <SubjectFormModal
        open={modalOpen}
        setOpen={setModalOpen}
        editingSubject={editingSubject}
        onSubmit={handleSubjectSubmit}
        onClose={handleModalClose}
      />
    </>
  );
}
