/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import {
  Box,
  Container,
  Fade,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import {
  useDeleteSectionMutation,
  useGetAllSectionsQuery,
} from "@/redux/api/sectionApi";
import CraftTable, { Column, RowAction } from "@/components/Table";

export default function SectionsListPage() {
  const router = useRouter();

  // State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // API hooks
  const [deleteSection] = useDeleteSectionMutation();
  const {
    data: sectionData,
    isLoading,
    refetch,
  } = useGetAllSectionsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  });

  // Handle delete
  const handleDeleteClick = (section: any) => {
    setSelectedSection(section);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSection) return;

    setIsDeleting(true);
    try {
      await deleteSection(selectedSection._id).unwrap();
      toast.success("Section deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete section");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedSection(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  // Define columns
  const columns: Column[] = [
    {
      id: "name",
      label: "Section Name",
      type: "text",
      sortable: true,
      filterable: true,
      render: (row: any) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {row.name}
          </Typography>
        </Box>
      ),
    },
  ];

  // Define row actions
  const rowActions: RowAction[] = [
    {
      label: "Edit",
      icon: <EditIcon />,
      onClick: (row: any) => {
        router.push(`/dashboard/classes/section/edit/${row._id}`);
      },
      color: "warning",
      tooltip: "Edit Section",
    },
    {
      label: "Delete",
      icon: <DeleteIcon />,
      onClick: (row: any) => {
        handleDeleteClick(row);
      },
      color: "error",
      tooltip: "Delete Section",
    },
  ];

  // Get sections data
  const sections = sectionData?.data?.sections || [];

  return (
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
              title="Sections"
              subtitle="Manage all sections"
              columns={columns}
              data={sections}
              loading={isLoading}
              idField="_id"
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowsPerPageChange={setRowsPerPage}
              onRefresh={refetch}
              onAdd={() => router.push("/dashboard/classes/section/new")}
              onSearchChange={setSearchTerm}
              rowActions={rowActions}
              searchable={true}
              filterable={true}
              sortable={true}
              pagination={true}
              serverSideSorting={true}
              emptyStateMessage="No sections found"
              showRowNumbers={true}
              actionColumnWidth={120}
              actionMenuLabel="Actions"
            />
          </Box>
        </Fade>
      </Container>

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
            Delete Section
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the section {selectedSection?.name}?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="inherit"
            sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ ml: 2 }}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
