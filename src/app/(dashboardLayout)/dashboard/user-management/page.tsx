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
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/api/userApi";
import CraftTable, { Column, RowAction } from "@/components/Table";
import { formatDate } from "@/utils/formateDate";
import { customTheme } from "@/ThemeStyle";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Delete User",
      html: `Are you sure you want to delete <strong>${user.name}</strong>?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await deleteUser(user._id).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: `User "${user.name}" has been deleted successfully.`,
            icon: "success",
            confirmButtonColor: "#3085d6",
            timer: 2000,
            showConfirmButton: true,
          });
          refetch();
        } catch (error: any) {
          Swal.showValidationMessage(
            error?.data?.message || "Failed to delete user",
          );
          throw new Error(error?.data?.message || "Failed to delete user");
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        // Success handled in preConfirm
        setSnackbarMessage(`User "${user.name}" deleted successfully`);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Your user is safe :)",
          icon: "info",
          confirmButtonColor: "#3085d6",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
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
