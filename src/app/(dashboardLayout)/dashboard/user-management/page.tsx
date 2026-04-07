/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Avatar,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  alpha,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
  Person,
  AdminPanelSettings,
  School,
  SupervisorAccount,
  Engineering,
} from "@mui/icons-material";
import { Roboto } from "next/font/google";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/api/userApi";
import CraftTable, { Column, RowAction } from "@/components/Table";
import { formatDate } from "@/utils/formateDate";
import { customTheme } from "@/ThemeStyle";

const roleConfig: Record<
  string,
  {
    icon: React.ReactNode;
    color:
      | "primary"
      | "secondary"
      | "success"
      | "error"
      | "warning"
      | "info"
      | "default";
    label: string;
  }
> = {
  admin: {
    icon: <AdminPanelSettings fontSize="small" />,
    color: "secondary",
    label: "Admin",
  },
  user: {
    icon: <Person fontSize="small" />,
    color: "success",
    label: "User",
  },
  super_visor: {
    icon: <SupervisorAccount fontSize="small" />,
    color: "info",
    label: "Supervisor",
  },
  teacher: {
    icon: <School fontSize="small" />,
    color: "warning",
    label: "Teacher",
  },
  student: {
    icon: <School fontSize="small" />,
    color: "success",
    label: "Student",
  },
  staff: {
    icon: <Engineering fontSize="small" />,
    color: "default",
    label: "Staff",
  },
};

export default function UserManagementPage() {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const {
    data: userData,
    isLoading,
    refetch,
  } = useGetAllUsersQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
    sortBy: sortColumn,
    sortOrder: sortDirection,
  });

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleAddUser = () => {
    window.location.href = "/dashboard/user-management/new";
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setPage(0);
  };

  const handleSortChange = (column: string, direction: "asc" | "desc") => {
    setSortColumn(column);
    setSortDirection(direction);
    setPage(0);
  };

  const handleDeleteClick = (user: any) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser._id).unwrap();
      setSnackbarMessage(`User "${selectedUser.name}" deleted successfully`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      refetch();
    } catch (error: any) {
      setSnackbarMessage(error?.data?.message || "Failed to delete user");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const getStatusChipProps = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return {
          color: "success" as const,
          icon: <CheckCircleIcon fontSize="small" />,
        };
      case "inactive":
        return {
          color: "error" as const,
          icon: <CancelIcon fontSize="small" />,
        };
      case "pending":
        return {
          color: "warning" as const,
          icon: <AccessTimeIcon fontSize="small" />,
        };
      default:
        return {
          color: "default" as const,
          icon: undefined,
        };
    }
  };

  const getAvatarColor = (name: string) => {
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

  // Define table columns
  const columns: Column[] = [
    {
      id: "name",
      label: "Name",
      minWidth: 180,
      type: "text",
      sortable: true,
      filterable: true,
      render: (row: any) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              mr: 1.5,
              bgcolor: getAvatarColor(row.name),
              fontSize: "0.875rem",
            }}
          >
            {row.name.charAt(0)}
          </Avatar>
          <Typography variant="body2">{row.name}</Typography>
        </Box>
      ),
    },
    {
      id: "email",
      label: "Email",
      minWidth: 220,
      type: "text",
      sortable: true,
      filterable: true,
    },
    {
      id: "role",
      label: "Role",
      minWidth: 120,
      type: "status",
      sortable: true,
      filterable: true,
      filterOptions: Object.entries(roleConfig).map(([value, config]) => ({
        label: config.label,
        value,
      })),
      render: (row: any) => {
        const config = roleConfig[row.role] || roleConfig.user;
        return (
          <Chip
            label={config.label}
            color={config.color}
            size="small"
            sx={{ fontWeight: 500 }}
          />
        );
      },
    },
    {
      id: "status",
      label: "Status",
      minWidth: 110,
      type: "status",
      sortable: true,
      filterable: true,
      filterOptions: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Pending", value: "pending" },
      ],
      render: (row: any) => {
        const statusProps = getStatusChipProps(row.status);
        return (
          <Chip
            icon={statusProps.icon}
            label={row.status.charAt(0).toUpperCase() + row.status.slice(1)}
            color={statusProps.color}
            size="small"
            sx={{ fontWeight: 500 }}
          />
        );
      },
    },
    {
      id: "createdAt",
      label: "Created At",
      minWidth: 120,
      type: "date",
      sortable: true,
      filterable: false,
      render: (row: any) => formatDate(row.createdAt),
    },
  ];

  // Define row actions
  const rowActions: RowAction[] = [
    {
      label: "View",
      icon: <VisibilityIcon fontSize="small" />,
      onClick: (row: any) => {},
      color: "info",
      tooltip: "View Details",
      inMenu: false,
    },
    {
      label: "Edit",
      icon: <EditIcon fontSize="small" />,
      onClick: (row: any) => {
        window.location.href = `/dashboard/user-management/edit/${row._id}`;
      },
      color: "warning",
      tooltip: "Edit User",
      inMenu: false,
    },
    {
      label: "Delete",
      icon: <DeleteIcon fontSize="small" />,
      onClick: (row: any) => {
        handleDeleteClick(row);
      },
      color: "error",
      tooltip: "Delete User",
      inMenu: false,
    },
  ];

  const users = userData?.data || [];
  const totalCount = userData?.meta?.total || 0;

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ flexGrow: 1, bgcolor: "background.default", borderRadius: 2 }}>
        <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2 }}>
          <CraftTable
            title="Users"
            columns={columns}
            data={users}
            loading={isLoading}
            rowCount={totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            onAdd={handleAddUser}
            onSortChange={handleSortChange}
            onSearchChange={handleSearchChange}
            rowActions={rowActions}
            searchable={true}
            filterable={true}
            sortable={true}
            pagination={true}
            serverSideSorting={true}
            emptyStateMessage="No users found"
            idField="_id"
            defaultSortColumn="name"
            defaultSortDirection="asc"
            stickyHeader={true}
            dense={false}
            striped={true}
            hover={true}
            showToolbar={true}
            showRowNumbers={true}
            rowNumberHeader="#"
            actionColumnWidth={120}
            actionMenuLabel="Actions"
            elevation={0}
            borderRadius={3}
            loadingOverlay={true}
            fadeIn={true}
          />
        </Container>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Delete User
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the user {selectedUser?.name} ? This
            action cannot be undone.
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
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
