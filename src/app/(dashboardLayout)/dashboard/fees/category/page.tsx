/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useDeleteFeeCategoryMutation,
  useGetAllFeeCategoriesQuery,
} from "@/redux/api/feeCategoryApi";
import { formatDate } from "@/utils/formateDate";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import FeeCategoryModal from "../__components/FeeCategoryModal";
import FeeCategoryStats from "../__components/FeeCategoryStats";
import CraftTable, { Column, RowAction } from "@/components/Table";

export interface FeeCategory {
  _id: string;
  class: string;
  feeType: string;
  feeAmount: number;
  createdAt: string;
  updatedAt: string;
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
  const totalFeeAmount = feeCategories.reduce((sum, i) => sum + i.feeAmount, 0);
  const totalCategories = feeCategories.length;
  const uniqueClasses = new Set(feeCategories.map((i) => i.class)).size;

  const getClassColor = (className: string) => {
    const colors: Record<string, string> = {
      "One A": "#2196f3",
      "Two A": "#4caf50",
      "Three A": "#ff9800",
      "Four A": "#f44336",
      "Five A": "#9c27b0",
      Nazera: "#607d8b",
      Hifz: "#795548",
    };
    return colors[className] || "#9e9e9e";
  };

  const getFeeTypeColor = (feeType: string) => {
    const colors: Record<string, string> = {
      "admission fee": "#f44336",
      "form fee": "#9c27b0",
      "tution fee": "#3f51b5",
      "home work fee": "#009688",
      "exam fee": "#ff9800",
      "library fee": "#607d8b",
    };
    return colors[feeType] || "#795548";
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
      id: "class",
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
            backgroundColor: getClassColor(row.class),
            color: "white",
            fontWeight: 600,
            textAlign: "center",
            display: "inline-block",
            minWidth: 80,
          }}
        >
          {row.class}
        </Box>
      ),
    },
    {
      id: "feeType",
      label: "Fee Type",
      minWidth: 150,
      sortable: true,
      filterable: true,
      type: "text",
      render: (row: FeeCategory) => (
        <Box
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: "12px",
            border: `2px solid ${getFeeTypeColor(row.feeType)}`,
            color: getFeeTypeColor(row.feeType),
            fontWeight: 500,
            textAlign: "center",
            display: "inline-block",
            backgroundColor: "transparent",
          }}
        >
          {row.feeType}
        </Box>
      ),
    },
    {
      id: "feeAmount",
      label: "Amount",
      minWidth: 120,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => (
        <Box
          sx={{ fontWeight: "bold", color: "primary.main", fontSize: "1rem" }}
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

  const handleExport = () => {};

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
        subtitle={`${feeCategories.length} records found`}
        columns={columns}
        data={feeCategories}
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
        maxHeight="60vh"
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
