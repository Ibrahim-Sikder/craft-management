/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useDeleteFeeCategoryMutation,
  useGetAllFeeCategoriesQuery,
} from "@/redux/api/feeCategoryApi";
import { formatDate } from "@/utils/formateDate";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Container, Chip, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import FeeCategoryModal from "../__components/FeeCategoryModal";
import FeeCategoryStats from "../__components/FeeCategoryStats";
import CraftTable, { Column, RowAction } from "@/components/Table";

export interface FeeCategory {
  _id: string;
  categoryName: string;
  className: string;
  feeItems: Array<{
    feeType: string;
    amount: number;
    _id: string;
  }>;
  createdAt: string;
  updatedAt: string;
  totalAmount?: number;
}

const FeeCategoriesPage = () => {
  const [editFeeCategoryId, setEditFeeCategoryId] = useState<string | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);

  const {
    data: feesData,
    refetch,
    isLoading,
  } = useGetAllFeeCategoriesQuery({});
  const [deleteFeeCategory] = useDeleteFeeCategoryMutation();

  const feeCategories: FeeCategory[] = feesData?.data?.data || [];

  // Calculate total amount for each category
  const feeCategoriesWithTotal = feeCategories.map(category => ({
    ...category,
    totalAmount: category.feeItems.reduce((sum, item) => sum + item.amount, 0)
  }));

  // Calculate stats
  const totalFeeAmount = feeCategoriesWithTotal.reduce((sum, category) => sum + (category.totalAmount || 0), 0);
  const totalCategories = feeCategories.length;
  const uniqueClasses = new Set(feeCategories.map((i) => i.className)).size;

  const getClassColor = (className: string) => {
    const colors: Record<string, string> = {
      One: "#2196f3",
      Two: "#4caf50",
      Three: "#ff9800",
      Four: "#f44336",
      Five: "#9c27b0",
      Six: "#795548",
      Seven: "#607d8b",
      Eight: "#3f51b5",
      Nine: "#009688",
      Ten: "#ff5722",
      Eleven: "#8bc34a",
      Twelve: "#e91e63",
      Nazera: "#9c27b0",
      Hifz: "#795548",
    };
    return colors[className] || "#9e9e9e";
  };

  const getFeeTypeColor = (feeType: string) => {
    const colors: Record<string, string> = {
      "Monthly Fee": "#2196f3",
      "Tuition Fee": "#4caf50",
      "Meal Fee": "#ff9800",
      "Seat Rent": "#f44336",
      "Day Care Fee": "#9c27b0",
      "One Meal": "#795548",
      "admission fee": "#f44336",
      "form fee": "#9c27b0",
      "tution fee": "#3f51b5",
      "home work fee": "#009688",
      "exam fee": "#ff9800",
      "library fee": "#607d8b",
    };
    return colors[feeType] || "#607d8b";
  };

  const getCategoryColor = (categoryName: string) => {
    const colors: Record<string, string> = {
      "Residential": "#4caf50",
      "Non-Residential": "#2196f3",
      "Day Care": "#ff9800",
      "Non-Residential One Meal": "#9c27b0",
      "Day Care One Meal": "#f44336",
    };
    return colors[categoryName] || "#795548";
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteFeeCategory(id).unwrap();
        Swal.fire("Deleted!", "Fee category has been deleted.", "success");
        refetch();
      } catch (err: any) {
        Swal.fire("Error!", err?.data?.message || "Failed to delete.", "error");
      }
    }
  };

  const handleEdit = (category: FeeCategory) => {
    setEditFeeCategoryId(category._id);
    setOpenModal(true);
  };

  const handleAddNew = () => {
    setEditFeeCategoryId(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditFeeCategoryId(null);
    refetch();
  };

  const columns: Column[] = [
    {
      id: "className",
      label: "Class",
      minWidth: 120,
      sortable: true,
      filterable: true,
      type: "text",
      render: (row: FeeCategory) => (
        <Box
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: "12px",
            backgroundColor: getClassColor(row.className),
            color: "white",
            fontWeight: 600,
            textAlign: "center",
            display: "inline-block",
            minWidth: 80,
          }}
        >
          {row.className}
        </Box>
      ),
    },
    {
      id: "categoryName",
      label: "Category",
      minWidth: 150,
      sortable: true,
      filterable: true,
      type: "text",
      render: (row: FeeCategory) => (
        <Box
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: "8px",
            backgroundColor: getCategoryColor(row.categoryName),
            color: "white",
            fontWeight: 600,
            display: "inline-block",
          }}
        >
          {row.categoryName}
        </Box>
      ),
    },
    {
      id: "feeItems",
      label: "Fee Items",
      minWidth: 300,
      sortable: false,
      filterable: false,
      type: "text",
      render: (row: FeeCategory) => (
        <Stack direction="column" spacing={1}>
          {row.feeItems.map((item, index) => (
            <Box
              key={item._id || index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1,
                borderRadius: '6px',
                backgroundColor: index % 2 === 0 ? 'action.hover' : 'transparent',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={item.feeType}
                  size="small"
                  sx={{
                    backgroundColor: getFeeTypeColor(item.feeType),
                    color: 'white',
                    fontWeight: 500,
                    minWidth: '100px',
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {item.feeType}
                </Typography>
              </Box>
              <Typography variant="body1" fontWeight="bold" color="primary">
                ৳ {item.amount.toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Stack>
      ),
    },
    {
      id: "totalAmount",
      label: "Total Amount",
      minWidth: 140,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => (
        <Box
          sx={{
            fontWeight: "bold",
            color: "success.main",
            fontSize: "1.1rem",
            backgroundColor: 'success.50',
            px: 2,
            py: 1,
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          ৳ {value.toLocaleString()}
        </Box>
      ),
    },
    {
      id: "createdAt",
      label: "Created Date",
      minWidth: 140,
      sortable: true,
      type: "date",
      format: (value: string) => formatDate(value),
    },
    {
      id: "updatedAt",
      label: "Updated Date",
      minWidth: 140,
      sortable: true,
      type: "date",
      format: (value: string) => formatDate(value),
    },
  ];

  const rowActions: RowAction[] = [
    {
      label: "Edit",
      icon: <Edit fontSize="small" />,
      onClick: (row: FeeCategory) => handleEdit(row),
      color: "primary",
      tooltip: "Edit fee category",
    },
    {
      label: "Delete",
      icon: <Delete fontSize="small" />,
      onClick: (row: FeeCategory) => handleDelete(row._id),
      color: "error",
      tooltip: "Delete fee category",
    },
  ];

  const handleExport = () => {
    console.log("Export data:", feeCategoriesWithTotal);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <FeeCategoryStats
        totalCategories={totalCategories}
        uniqueClasses={uniqueClasses}
        totalFeeAmount={totalFeeAmount}
      />

      <CraftTable
        title="Fee Categories"
        subtitle={`${feeCategoriesWithTotal.length} categories found`}
        columns={columns}
        data={feeCategoriesWithTotal}
        loading={isLoading}
        onRefresh={handleRefresh}
        onExport={handleExport}
        onPrint={handlePrint}
        onAdd={handleAddNew}
        rowActions={rowActions}
        selectable={true}
        searchable={true}
        filterable={true}
        sortable={true}
        pagination={true}
        emptyStateMessage="No fee categories found. Try adjusting your search or filters."
        idField="_id"
        height="auto"
        maxHeight="70vh"
        stickyHeader={true}
        dense={false}
        striped={true}
        hover={true}
        showToolbar={true}
        elevation={2}
        borderRadius={2}
        showRowNumbers={true}
        rowNumberHeader="#"
        actionColumnWidth={100}
        loadingOverlay={true}
        fadeIn={true}
        cardSx={{
          border: "1px solid",
          borderColor: "divider",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)",
        }}
      />
      <FeeCategoryModal
        open={openModal}
        setOpen={handleCloseModal}
        id={editFeeCategoryId}
      />
    </Container>
  );
};

export default FeeCategoriesPage;