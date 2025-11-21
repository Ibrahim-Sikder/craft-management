"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import CraftTable, { Column, RowAction } from "@/components/Table";
import { useGetDueFeesQuery } from "@/redux/api/feesApi";
import { Payment, Search, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import PaymentModal from "../../student/profile/__components/PaymentModal";

interface Student {
  _id: string;
  name: string;
  studentId: string;
  mobile: string;
}

interface Fee {
  _id: string;
  feeType: string;
  month: string;
  class: string;
  amount: number;
  paidAmount: number;
  dueAmount: number;
  status: string;
  academicYear?: string;
  isCurrentMonth?: boolean;
  advanceUsed?: number;
  discount?: number;
  waiver?: number;
  computedDue?: number;
}

interface Enrollment {
  _id: string;
  rollNumber: string;
  studentName?: string;
}

interface StudentWithFees {
  student: Student;
  enrollment: Enrollment;
  fees: Fee[];
  totalDue: number;
  totalPaid: number;
  totalAmount: number;
  feesCount?: number;
}

interface Summary {
  totalStudents: number;
  totalFees: number;
  totalDueAmount: number;
  totalPaidAmount: number;
  totalAmount: number;
}

interface FlattenedFeeRow {
  _id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  mobile: string;
  feeType: string;
  month: string;
  class: string;
  amount: number;
  paidAmount: number;
  dueAmount: number;
  status: string;
  academicYear?: string;
  isCurrentMonth?: boolean;
  advanceUsed?: number;
  discount?: number;
  waiver?: number;
  computedDue?: number;
}

const AllDueFees = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [dueFeesData, setDueFeesData] = useState<StudentWithFees[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [classFilter, setClassFilter] = useState("");
  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<StudentWithFees | null>(null);

  // State for PaymentModal
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);

  // Use the RTK Query hook
  const { data, error, isLoading, refetch } = useGetDueFeesQuery({
    year: year.toString(),
    class: classFilter,
  });

  // ক্লাসের তালিকা
  const classOptions = [
    { value: "", label: "All Classes" },
    { value: "One", label: "Class One" },
    { value: "Two", label: "Class Two" },
    { value: "Three", label: "Class Three" },
    { value: "Four", label: "Class Four" },
    { value: "Five", label: "Class Five" },
  ];

  // বছরের তালিকা
  const currentYear = new Date().getFullYear();
  const yearOptions = [
    { value: currentYear, label: currentYear.toString() },
    { value: currentYear - 1, label: (currentYear - 1).toString() },
    { value: currentYear - 2, label: (currentYear - 2).toString() },
  ];

  // Process data when it loads
  useEffect(() => {
    if (data && data.success) {
      const studentsData = data.data?.students || [];
      const summaryData = data.data?.summary || null;

      if (Array.isArray(studentsData)) {
        // Transform the data to match the expected interface
        const transformedData: StudentWithFees[] = studentsData.map(
          (studentItem: any) => ({
            student: studentItem.student,
            enrollment: studentItem.enrollment,
            fees: studentItem.fees.map((fee: any) => ({
              _id: fee._id,
              feeType: fee.feeType,
              month: fee.month,
              class: fee.class,
              amount: fee.amount,
              paidAmount: fee.paidAmount,
              dueAmount:
                fee.computedDue || fee.dueAmount || fee.amount - fee.paidAmount,
              status: fee.status,
              academicYear: fee.academicYear,
              isCurrentMonth: fee.isCurrentMonth,
              advanceUsed: fee.advanceUsed || 0,
              discount: fee.discount || 0,
              waiver: fee.waiver || 0,
              computedDue: fee.computedDue,
            })),
            totalDue: studentItem.totalDue,
            totalPaid: studentItem.totalPaid,
            totalAmount: studentItem.totalAmount,
            feesCount: studentItem.feesCount,
          })
        );

        setDueFeesData(transformedData);
        setSummary(summaryData);
      } else {
        console.error("Invalid students data structure:", studentsData);
        setDueFeesData([]);
      }

      setLoading(false);
    } else if (error) {
      console.error("Error fetching due fees:", error);
      toast.error("Error fetching due fees");
      setLoading(false);
      setDueFeesData([]);
    }
  }, [data, error]);

  // Handle refetch when filters change
  useEffect(() => {
    refetch();
  }, [year, classFilter, refetch]);

  // ফি ডিটেইলস ভিউ হ্যান্ডলার
  const handleViewDetails = (student: StudentWithFees) => {
    setSelectedStudent(student);
    setViewDetailsModalOpen(true);
  };

  // Handlers for the PaymentModal
  const handleOpenPaymentModal = (fee: any) => {
    setSelectedFee(fee);
    setPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
    setSelectedFee(null);
  };

  const handlePaymentSuccess = () => {
    toast.success("Payment processed successfully!");
    refetch();
    handleClosePaymentModal();
  };

  // Flatten the data for the table
  const flattenedData: FlattenedFeeRow[] = dueFeesData.flatMap(
    (studentWithFees) =>
      studentWithFees.fees.map((fee) => ({
        ...fee,
        studentId: studentWithFees.student.studentId,
        studentName: studentWithFees.student.name,
        rollNumber: studentWithFees.enrollment.rollNumber,
        mobile: studentWithFees.student.mobile,
      }))
  );

  // Define columns based on screen size
  const getColumns = (): Column[] => {
    // Base columns that are always shown
    const baseColumns: Column[] = [
      {
        id: "studentName",
        label: "Student",
        minWidth: isSmallMobile ? 100 : 150,
        sortable: true,
        filterable: true,
      },
      {
        id: "feeType",
        label: "Fee Type",
        minWidth: isSmallMobile ? 100 : 150,
        sortable: true,
        filterable: true,
        format: (value: string) => (
          <Chip
            label={value}
            size="small"
            variant="outlined"
            color={
              value.toLowerCase().includes("admission")
                ? "primary"
                : value.toLowerCase().includes("monthly")
                  ? "secondary"
                  : value.toLowerCase().includes("exam")
                    ? "warning"
                    : value.toLowerCase().includes("form")
                      ? "info"
                      : "default"
            }
          />
        ),
      },
      {
        id: "dueAmount",
        label: "Due",
        minWidth: isSmallMobile ? 80 : 130,
        align: "right",
        sortable: true,
        format: (value: number) => (
          <Typography color="error.main" fontWeight="bold">
            ৳{value?.toFixed(2)}
          </Typography>
        ),
      },
      {
        id: "status",
        label: "Status",
        minWidth: isSmallMobile ? 80 : 100,
        sortable: true,
        filterable: true,
        format: (value: string) => {
          const statusConfig: any = {
            paid: { color: "success", label: "Paid" },
            partial: { color: "warning", label: "Partial" },
            unpaid: { color: "error", label: "Due" },
          };
          const config = statusConfig[value] || {
            color: "default",
            label: value,
          };
          return (
            <Chip label={config.label} color={config.color} size="small" />
          );
        },
      },
    ];

    // Additional columns for larger screens
    if (!isSmallMobile) {
      baseColumns.splice(1, 0, {
        id: "studentId",
        label: "ID",
        minWidth: 100,
        sortable: true,
        filterable: true,
      });
    }

    if (!isMobile) {
      baseColumns.splice(2, 0, {
        id: "rollNumber",
        label: "Roll",
        minWidth: 100,
        sortable: true,
        filterable: true,
      });

      baseColumns.splice(3, 0, {
        id: "mobile",
        label: "Mobile",
        minWidth: 120,
        sortable: true,
        filterable: true,
      });

      baseColumns.splice(-2, 0, {
        id: "month",
        label: "Month",
        minWidth: 120,
        sortable: true,
        filterable: true,
      });

      baseColumns.splice(-2, 0, {
        id: "class",
        label: "Class",
        minWidth: 100,
        sortable: true,
        filterable: true,
      });

      baseColumns.splice(-2, 0, {
        id: "amount",
        label: "Total",
        minWidth: 130,
        align: "right",
        sortable: true,
        format: (value: number) => `৳${value?.toFixed(2)}`,
      });

      baseColumns.splice(-2, 0, {
        id: "paidAmount",
        label: "Paid",
        minWidth: 130,
        align: "right",
        sortable: true,
        format: (value: number) => `৳${value?.toFixed(2)}`,
      });
    }

    return baseColumns;
  };

  // Row actions
  const rowActions: RowAction[] = [
    {
      label: "Collect Fee",
      icon: <Payment fontSize="small" />,
      onClick: (row) => {
        // The 'row' object here is the specific fee data from the table
        handleOpenPaymentModal(row);
      },
      color: "success",
      tooltip: "Collect this fee",
    },
    {
      label: "View Details",
      icon: <Visibility fontSize="small" />,
      onClick: (row) => {
        const student = dueFeesData.find((s) =>
          s.fees.some((fee) => fee._id === row._id)
        );
        if (student) {
          handleViewDetails(student);
        }
      },
      color: "primary",
      tooltip: "View student details",
    },
  ];

  // Bulk actions
  const bulkActions = [
    {
      label: "Collect Selected Fees",
      icon: <Payment />,
      onClick: (selectedRows: any[]) => {
        if (selectedRows.length === 0) {
          toast.error("Please select at least one fee");
          return;
        }
        console.log("Selected fees for payment:", selectedRows);
        toast.success(`Selected ${selectedRows.length} fees for payment`);
      },
      color: "success" as const,
    },
  ];

  // Calculate totals from data
  const totalDueAmount = dueFeesData.reduce(
    (sum, student) => sum + student.totalDue,
    0
  );
  const totalStudents = dueFeesData.length;
  const totalFees = dueFeesData.reduce(
    (sum, student) => sum + student.fees.length,
    0
  );

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "grey.50", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Due Fees Collection
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Manage and collect pending fees from students
      </Typography>

      {/* ফিল্টার সেকশন */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Academic Year</InputLabel>
                <Select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  label="Academic Year"
                >
                  {yearOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  label="Class"
                >
                  {classOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                startIcon={<Search />}
                onClick={() => refetch()}
                fullWidth
                sx={{ height: "56px" }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* সারাংশ কার্ড */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Collection Summary
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} md={2}>
              <Box textAlign="center">
                <Typography variant="h4" color="primary.main" fontWeight="bold">
                  {summary?.totalStudents || totalStudents}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Students
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box textAlign="center">
                <Typography variant="h4" color="info.main" fontWeight="bold">
                  {summary?.totalFees || totalFees}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Due Fees
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  ৳{(summary?.totalPaidAmount || 0).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Paid
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <Typography variant="h4" color="error.main" fontWeight="bold">
                  ৳{(summary?.totalDueAmount || totalDueAmount).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Due
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box textAlign="center">
                <Typography variant="h4" color="warning.main" fontWeight="bold">
                  ৳{(summary?.totalAmount || 0).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Amount
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* বকেয়া ফির তালিকা */}
      {flattenedData.length > 0 ? (
        <CraftTable
          title="Due Fees"
          subtitle={`Showing ${flattenedData.length} fees`}
          columns={getColumns()}
          data={flattenedData}
          loading={loading}
          rowActions={rowActions}
          bulkActions={bulkActions}
          selectable={true}
          idField="_id"
          hover={true}
          showToolbar={true}
          striped={true}
          searchable={true}
          filterable={true}
          sortable={true}
          pagination={true}
          elevation={3}
          borderRadius={1}
          showRowNumbers={!isMobile}
          rowNumberHeader="#"
          defaultSortColumn="dueAmount"
          defaultSortDirection="desc"
        />
      ) : (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No Due Fees Found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All fees are cleared for the selected filters
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* ফি ডিটেইলস ভিউ মোডাল */}
      <Dialog
        open={viewDetailsModalOpen}
        onClose={() => setViewDetailsModalOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Fee Details - {selectedStudent?.student.name}</DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Student Information
                  </Typography>
                  <Typography>
                    <strong>Name:</strong> {selectedStudent.student.name}
                  </Typography>
                  <Typography>
                    <strong>Student ID:</strong>{" "}
                    {selectedStudent.student.studentId}
                  </Typography>
                  <Typography>
                    <strong>Mobile:</strong> {selectedStudent.student.mobile}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Academic Information
                  </Typography>
                  <Typography>
                    <strong>Roll Number:</strong>{" "}
                    {selectedStudent.enrollment.rollNumber}
                  </Typography>
                  <Typography>
                    <strong>Class:</strong> {selectedStudent.fees[0]?.class}
                  </Typography>
                </Grid>
              </Grid>

              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  backgroundColor: "grey.50",
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Fee Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <Typography>
                      <strong>Total Amount:</strong>
                    </Typography>
                    <Typography variant="h6">
                      ৳{selectedStudent.totalAmount.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography>
                      <strong>Paid Amount:</strong>
                    </Typography>
                    <Typography variant="h6" color="success.main">
                      ৳{selectedStudent.totalPaid.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography>
                      <strong>Due Amount:</strong>
                    </Typography>
                    <Typography variant="h6" color="error.main">
                      ৳{selectedStudent.totalDue.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography>
                      <strong>Total Fees:</strong>
                    </Typography>
                    <Typography variant="h6">
                      {selectedStudent.fees.length}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Typography variant="h6" gutterBottom>
                Fee Breakdown
              </Typography>
              <TableContainer sx={{ overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Fee Type</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Month</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Class</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>Amount</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>Paid</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>Due</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Status</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedStudent.fees.map((fee) => (
                      <TableRow key={fee._id}>
                        <TableCell>{fee.feeType}</TableCell>
                        <TableCell>{fee.month}</TableCell>
                        <TableCell>{fee.class}</TableCell>
                        <TableCell align="right">
                          ৳{fee.amount.toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          ৳{fee.paidAmount.toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          <Typography color="error.main" fontWeight="bold">
                            ৳{fee.dueAmount.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={fee.status.toUpperCase()}
                            size="small"
                            color={
                              fee.status === "paid"
                                ? "success"
                                : fee.status === "partial"
                                  ? "warning"
                                  : "error"
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDetailsModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* PaymentModal component */}
      <PaymentModal
        open={paymentModalOpen}
        onClose={handleClosePaymentModal}
        fee={selectedFee}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Box>
  );
};

export default AllDueFees;
