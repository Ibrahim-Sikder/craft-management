/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  useTheme,
} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  Download,
  Receipt,
  Print,
} from "@mui/icons-material";
import CraftTable, { Column, RowAction } from "@/components/Table";

const PaymentHistory = () => {
  const theme = useTheme();

  // Static data following payment schema
  const paymentData = [
    {
      _id: "1",
      receiptNo: "RCP-2024-001",
      student: {
        _id: "stu1",
        name: "John Smith",
        studentId: "STU-001",
      },
      enrollment: {
        _id: "enr1",
        course: "Computer Science",
      },
      fee: {
        _id: "fee1",
        feeType: "monthly",
        amount: 5000,
      },
      amountPaid: 5000,
      paymentMethod: "bkash",
      paymentDate: "2024-01-15T10:30:00Z",
      note: "Monthly fee payment",
      collectedBy: "Admin User",
      status: "completed",
    },
    {
      _id: "2",
      receiptNo: "RCP-2024-002",
      student: {
        _id: "stu2",
        name: "Sarah Johnson",
        studentId: "STU-002",
      },
      enrollment: {
        _id: "enr2",
        course: "Electrical Engineering",
      },
      fee: {
        _id: "fee2",
        feeType: "admission",
        amount: 15000,
      },
      amountPaid: 15000,
      paymentMethod: "bank",
      paymentDate: "2024-01-14T14:20:00Z",
      note: "Admission fee",
      collectedBy: "Finance Officer",
      status: "completed",
    },
    {
      _id: "3",
      receiptNo: "RCP-2024-003",
      student: {
        _id: "stu3",
        name: "Michael Brown",
        studentId: "STU-003",
      },
      enrollment: {
        _id: "enr3",
        course: "Business Administration",
      },
      fee: {
        _id: "fee3",
        feeType: "exam",
        amount: 2000,
      },
      amountPaid: 1000,
      paymentMethod: "cash",
      paymentDate: "2024-01-13T09:15:00Z",
      note: "Partial exam fee payment",
      collectedBy: "Admin User",
      status: "partial",
    },
    {
      _id: "4",
      receiptNo: "RCP-2024-004",
      student: {
        _id: "stu4",
        name: "Emily Davis",
        studentId: "STU-004",
      },
      enrollment: {
        _id: "enr4",
        course: "Mechanical Engineering",
      },
      fee: {
        _id: "fee4",
        feeType: "monthly",
        amount: 6000,
      },
      amountPaid: 6000,
      paymentMethod: "nagad",
      paymentDate: "2024-01-12T16:45:00Z",
      note: "Monthly fee",
      collectedBy: "Finance Officer",
      status: "completed",
    },
    {
      _id: "5",
      receiptNo: "RCP-2024-005",
      student: {
        _id: "stu5",
        name: "David Wilson",
        studentId: "STU-005",
      },
      enrollment: {
        _id: "enr5",
        course: "Computer Science",
      },
      fee: {
        _id: "fee5",
        feeType: "homework",
        amount: 500,
      },
      amountPaid: 0,
      paymentMethod: "cash",
      paymentDate: null,
      note: "Pending homework fee",
      collectedBy: "",
      status: "pending",
    },
    {
      _id: "6",
      receiptNo: "RCP-2024-006",
      student: {
        _id: "stu6",
        name: "Lisa Anderson",
        studentId: "STU-006",
      },
      enrollment: {
        _id: "enr6",
        course: "Civil Engineering",
      },
      fee: {
        _id: "fee6",
        feeType: "monthly",
        amount: 5500,
      },
      amountPaid: 5500,
      paymentMethod: "card",
      paymentDate: "2024-01-11T11:30:00Z",
      note: "Monthly fee payment via card",
      collectedBy: "Admin User",
      status: "completed",
    },
    {
      _id: "7",
      receiptNo: "RCP-2024-007",
      student: {
        _id: "stu7",
        name: "Robert Taylor",
        studentId: "STU-007",
      },
      enrollment: {
        _id: "enr7",
        course: "Architecture",
      },
      fee: {
        _id: "fee7",
        feeType: "exam",
        amount: 2500,
      },
      amountPaid: 2500,
      paymentMethod: "bkash",
      paymentDate: "2024-01-10T15:20:00Z",
      note: "Final exam fee",
      collectedBy: "Finance Officer",
      status: "completed",
    },
    {
      _id: "8",
      receiptNo: "RCP-2024-008",
      student: {
        _id: "stu8",
        name: "Maria Garcia",
        studentId: "STU-008",
      },
      enrollment: {
        _id: "enr8",
        course: "Computer Science",
      },
      fee: {
        _id: "fee8",
        feeType: "other",
        amount: 1000,
      },
      amountPaid: 500,
      paymentMethod: "nagad",
      paymentDate: "2024-01-09T13:45:00Z",
      note: "Library fine partial payment",
      collectedBy: "Admin User",
      status: "partial",
    },
  ];

  // Calculate summary statistics
  const summary = {
    totalPayments: paymentData.length,
    totalAmount: paymentData.reduce(
      (sum, payment) => sum + (payment.amountPaid || 0),
      0
    ),
    completedPayments: paymentData.filter(
      (payment) => payment.status === "completed"
    ).length,
    partialPayments: paymentData.filter(
      (payment) => payment.status === "partial"
    ).length,
    pendingPayments: paymentData.filter(
      (payment) => payment.status === "pending"
    ).length,
  };

  // Define columns for the payment table
  const columns: Column[] = [
    {
      id: "receiptNo",
      label: "Receipt No",
      minWidth: 140,
      sortable: true,
      filterable: true,
      type: "text",
    },
    {
      id: "student.name",
      label: "Student Name",
      minWidth: 180,
      sortable: true,
      filterable: true,
      type: "text",
    },
    {
      id: "enrollment.course",
      label: "Course",
      minWidth: 200,
      sortable: true,
      filterable: true,
      type: "text",
    },
    {
      id: "fee.feeType",
      label: "Fee Type",
      minWidth: 130,
      sortable: true,
      filterable: true,
      type: "text",
      format: (value: string) => {
        const feeTypeMap: { [key: string]: string } = {
          admission: "Admission",
          monthly: "Monthly",
          exam: "Exam",
          homework: "Homework",
          other: "Other",
        };
        return feeTypeMap[value] || value;
      },
    },
    {
      id: "fee.amount",
      label: "Total Amount",
      minWidth: 130,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `৳${value?.toLocaleString()}`,
    },
    {
      id: "amountPaid",
      label: "Paid Amount",
      minWidth: 130,
      align: "right",
      sortable: true,
      type: "number",
      format: (value: number) => `৳${value?.toLocaleString()}`,
    },
    {
      id: "paymentMethod",
      label: "Payment Method",
      minWidth: 140,
      sortable: true,
      filterable: true,
      type: "text",
      format: (value: string) => {
        const methodMap: { [key: string]: string } = {
          cash: "Cash",
          bkash: "bKash",
          nagad: "Nagad",
          bank: "Bank Transfer",
          card: "Card",
        };
        return methodMap[value] || value;
      },
    },
    {
      id: "paymentDate",
      label: "Payment Date",
      minWidth: 150,
      sortable: true,
      type: "date",
      format: (value: string) => {
        if (!value) return "Not Paid";
        try {
          return new Date(value).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        } catch {
          return "Invalid Date";
        }
      },
    },
    {
      id: "collectedBy",
      label: "Collected By",
      minWidth: 150,
      sortable: true,
      filterable: true,
      type: "text",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 120,
      sortable: true,
      filterable: true,
      type: "status",
      format: (value: string) => {
        const statusConfig: { [key: string]: { color: any; label: string } } = {
          completed: { color: "success", label: "Paid" },
          partial: { color: "warning", label: "Partial" },
          pending: { color: "error", label: "Pending" },
          unpaid: { color: "error", label: "Unpaid" },
        };

        const config = statusConfig[value] || {
          color: "default",
          label: value,
        };
        return (
          <Chip
            label={config.label}
            color={config.color}
            size="small"
            variant="filled"
            sx={{
              fontWeight: "bold",
              borderRadius: "6px",
            }}
          />
        );
      },
    },
    {
      id: "note",
      label: "Notes",
      minWidth: 200,
      sortable: false,
      filterable: true,
      type: "text",
      format: (value: string) => (
        <Typography variant="body2" noWrap title={value}>
          {value || "-"}
        </Typography>
      ),
    },
  ];

  // Define row actions
  const rowActions: RowAction[] = [
    {
      label: "View Details",
      icon: <Visibility fontSize="small" />,
      onClick: (row) => {
        console.log("View payment details:", row);
        // Add your view logic here
      },
      color: "info",
      tooltip: "View payment details",
    },
    {
      label: "Download Receipt",
      icon: <Download fontSize="small" />,
      onClick: (row) => {
        console.log("Download receipt for:", row.receiptNo);
        // Add your download logic here
      },
      color: "primary",
      tooltip: "Download payment receipt",
      disabled: (row) => row.status !== "completed",
    },
    {
      label: "Print Receipt",
      icon: <Print fontSize="small" />,
      onClick: (row) => {
        console.log("Print receipt for:", row.receiptNo);
        // Add your print logic here
      },
      color: "secondary",
      tooltip: "Print payment receipt",
      disabled: (row) => row.status !== "completed",
    },
    {
      label: "Edit Payment",
      icon: <Edit fontSize="small" />,
      onClick: (row) => {
        console.log("Edit payment:", row.receiptNo);
        // Add your edit logic here
      },
      color: "warning",
      tooltip: "Edit payment record",
      inMenu: true,
    },
    {
      label: "Delete Payment",
      icon: <Delete fontSize="small" />,
      onClick: (row) => {
        console.log("Delete payment:", row.receiptNo);
        // Add your delete logic here
      },
      color: "error",
      tooltip: "Delete payment record",
      inMenu: true,
    },
  ];

  // Handler functions
  const handleExport = () => {
    console.log("Exporting payment data...");
    // Implement export functionality
  };

  const handlePrint = () => {
    console.log("Printing payment list...");
    // Implement print functionality
  };

  const handleRefresh = () => {
    console.log("Refreshing payment data...");
    // Implement refresh functionality
  };

  const handleAddPayment = () => {
    console.log("Adding new payment...");
    // Implement add payment functionality
  };

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 3,
        }}
      >
        Payment History
      </Typography>

      {/* Summary Cards */}
      <Box sx={{ mb: 4 }}>
        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Payment Summary
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, mt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Payments
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {summary.totalPayments}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Amount
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="primary.main"
                  >
                    ৳{summary.totalAmount.toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  label={`${summary.completedPayments} Paid`}
                  size="small"
                  color="success"
                  variant="outlined"
                />
                <Chip
                  label={`${summary.partialPayments} Partial`}
                  size="small"
                  color="warning"
                  variant="outlined"
                />
                <Chip
                  label={`${summary.pendingPayments} Pending`}
                  size="small"
                  color="error"
                  variant="outlined"
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Payment Records Table */}
      <CraftTable
        title="Payment Transactions"
        subtitle={`${paymentData.length} payment records found`}
        columns={columns}
        data={paymentData}
        loading={false}
        rowActions={rowActions}
        selectable={true}
        searchable={true}
        filterable={true}
        sortable={true}
        pagination={true}
        idField="_id"
        emptyStateMessage="No payment records found"
        height="auto"
        maxHeight="65vh"
        stickyHeader={true}
        hover={true}
        showToolbar={true}
        elevation={1}
        borderRadius={2}
        showRowNumbers={true}
        rowNumberHeader="#"
        onRefresh={handleRefresh}
        onExport={handleExport}
        onPrint={handlePrint}
        onAdd={handleAddPayment}
        bulkActions={[
          {
            label: "Export Selected",
            icon: <Download fontSize="small" />,
            onClick: (selectedRows) => {
              console.log("Exporting selected payments:", selectedRows);
            },
          },
          {
            label: "Print Receipts",
            icon: <Print fontSize="small" />,
            onClick: (selectedRows) => {
              console.log("Printing receipts for:", selectedRows);
            },
            disabled: (selectedRows) =>
              !selectedRows.every((row) => row.status === "completed"),
          },
          {
            label: "Delete Selected",
            icon: <Delete fontSize="small" />,
            onClick: (selectedRows) => {
              console.log("Deleting selected payments:", selectedRows);
            },
            color: "error",
          },
        ]}
        customToolbar={
          <Button
            variant="contained"
            startIcon={<Receipt />}
            onClick={handleAddPayment}
            sx={{
              borderRadius: "10px",
              px: 3,
              background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
              boxShadow: `0 4px 15px ${theme.palette.success.light}40`,
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: `0 6px 20px ${theme.palette.success.light}60`,
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            New Payment
          </Button>
        }
      />
    </Box>
  );
};

export default PaymentHistory;
