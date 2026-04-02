"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import CraftTable, { Column, RowAction } from "@/components/Table";
import { useGetDueFeesQuery } from "@/redux/api/feesApi";
import {
  Fee,
  StudentTableRow,
  StudentWithFees,
  Summary,
} from "@/types/feeCollection";
import { Payment, Visibility } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import BulkPaymentModal from "../../student/profile/__components/BulkPaymentModal";
import PaymentModal from "../../student/profile/__components/PaymentModal";
import PrintModal from "../../student/profile/__components/PrintModal";
import StudentFeeDetailsModal from "./StudentFeeDetailsModal";
import LoadingSpinner from "@/components/LoadingSpinner";

const FeeCollection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [dueFeesData, setDueFeesData] = useState<StudentWithFees[]>([]);
  const [, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [year] = useState(new Date().getFullYear());
  const [classFilter] = useState("");
  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<StudentWithFees | null>(null);

  const [bulkPaymentModalOpen, setBulkPaymentModalOpen] = useState(false);
  const [selectedStudentForBulk, setSelectedStudentForBulk] =
    useState<StudentWithFees | null>(null);

  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [printModalOpen, setPrintModalOpen] = useState(false);

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);

  const { data, error, isLoading, refetch } = useGetDueFeesQuery({
    year: year.toString(),
    class: classFilter,
  });

  console.log("student due fee ", dueFeesData);

  // ---------- Process API data ----------
  useEffect(() => {
    if (data && data.success) {
      const dueFees = data.data?.dueFees || [];
      const totalDue = data.data?.totalDue || 0;
      const totalPaid = data.data?.totalPaid || 0;
      const totalFees = data.data?.totalFees || 0;

      const studentsMap = new Map<string, any>();

      dueFees.forEach((fee: any) => {
        const studentId = fee.student._id;

        if (!studentsMap.has(studentId)) {
          // Get class name from student.className array
          let className = "";
          if (fee.student.className && Array.isArray(fee.student.className)) {
            const classObj = fee.student.className[0];
            if (classObj && typeof classObj === "object") {
              className = classObj.className || "";
            } else if (typeof classObj === "string") {
              className = classObj;
            }
          }

          studentsMap.set(studentId, {
            student: {
              _id: fee.student._id,
              studentId: fee.student.studentId,
              name: fee.student.nameBangla || fee.student.name || "",
              mobile: fee.student.mobile || "",
            },
            enrollment: {
              _id: studentId, // Use student ID as fallback since enrollment might not exist
              rollNumber: "",
              className: className,
            },
            fees: [],
            totalDue: 0,
            totalPaid: 0,
            totalAmount: 0,
            feesCount: 0,
          });
        }

        const studentEntry = studentsMap.get(studentId)!;

        // Get class name from the fee data or student
        const className =
          fee.class || fee.student.className?.[0]?.className || "";

        studentEntry.fees.push({
          _id: fee._id,
          feeType: fee.feeType,
          month: fee.month,
          class: className,
          amount: fee.amount,
          paidAmount: fee.paidAmount,
          dueAmount: fee.dueAmount,
          status: fee.status,
          academicYear: fee.academicYear,
          isCurrentMonth: fee.isCurrentMonth,
          advanceUsed: fee.advanceUsed || 0,
          discount: fee.discount || 0,
          waiver: fee.waiver || 0,
          computedDue: fee.dueAmount,
        });

        studentEntry.totalDue += fee.dueAmount || 0;
        studentEntry.totalPaid += fee.paidAmount || 0;
        studentEntry.totalAmount += fee.amount || 0;
        studentEntry.feesCount = studentEntry.fees.length;
      });

      const studentsData = Array.from(studentsMap.values());
      const summaryData = {
        totalStudents: studentsData.length,
        totalFees,
        totalDueAmount: totalDue,
        totalPaidAmount: totalPaid,
        totalAmount: totalFees,
      };

      setDueFeesData(studentsData);
      setSummary(summaryData);
      setLoading(false);
    } else if (error) {
      console.error("Error fetching due fees:", error);
      toast.error("Error fetching due fees");
      setLoading(false);
      setDueFeesData([]);
    }
  }, [data, error]);

  useEffect(() => {
    refetch();
  }, [year, classFilter, refetch]);

  const getStudentOverallStatus = (fees: Fee[]): string => {
    if (fees.every((f) => f.status === "paid")) return "paid";
    if (fees.some((f) => f.status === "unpaid")) return "unpaid";
    if (fees.some((f) => f.status === "partial")) return "partial";
    return "unknown";
  };

  const studentTableData: StudentTableRow[] = useMemo(() => {
    return dueFeesData.map((studentWithFees) => {
      const firstFee = studentWithFees.fees[0];
      return {
        _id: studentWithFees.student._id,
        studentName: studentWithFees.student.name,
        studentId: studentWithFees.student.studentId,
        rollNumber: studentWithFees.enrollment.rollNumber,
        mobile: studentWithFees.student.mobile,
        className: firstFee?.class || "",
        totalAmount: studentWithFees.totalAmount,
        totalPaid: studentWithFees.totalPaid,
        totalDue: studentWithFees.totalDue,
        feesCount: studentWithFees.fees.length,
        overallStatus: getStudentOverallStatus(studentWithFees.fees),
      };
    });
  }, [dueFeesData]);

  const classFilterOptions = useMemo(() => {
    const seen = new Set<string>();
    return studentTableData
      .filter((row) => row.className && row.className.trim() !== "")
      .reduce((acc: { label: string; value: string }[], row) => {
        if (!seen.has(row.className)) {
          seen.add(row.className);
          acc.push({ label: row.className, value: row.className });
        }
        return acc;
      }, [])
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [studentTableData]);

  const statusFilterOptions = useMemo(() => {
    const seen = new Set<string>();
    return studentTableData
      .filter((row) => row.overallStatus)
      .reduce((acc: { label: string; value: string }[], row) => {
        if (!seen.has(row.overallStatus)) {
          seen.add(row.overallStatus);
          const label =
            row.overallStatus.charAt(0).toUpperCase() +
            row.overallStatus.slice(1);
          acc.push({ label, value: row.overallStatus });
        }
        return acc;
      }, [])
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [studentTableData]);

  // ---------- Handlers ----------
  const handleViewDetails = (student: StudentWithFees) => {
    setSelectedStudent(student);
    setViewDetailsModalOpen(true);
  };

  const handleOpenBulkPayment = (student: StudentWithFees) => {
    setSelectedStudentForBulk(student);
    setBulkPaymentModalOpen(true);
  };

  const handleCloseBulkPayment = () => {
    setBulkPaymentModalOpen(false);
    setSelectedStudentForBulk(null);
  };

  const handleBulkPaymentCompleted = (receiptData: any) => {
    setSelectedReceipt(receiptData);
    setPrintModalOpen(true); // directly open print modal
  };

  const handleClosePrintModal = () => {
    setPrintModalOpen(false);
    setSelectedReceipt(null);
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

  // Handler for Bulk Payment from the details modal
  const handleBulkPaymentFromView = () => {
    if (selectedStudent) {
      handleOpenBulkPayment(selectedStudent);
      setViewDetailsModalOpen(false);
    }
  };

  const getStudentColumns = (): Column[] => {
    const baseColumns: Column[] = [
      {
        id: "studentName",
        label: "Student",
        minWidth: isSmallMobile ? 120 : 180,
        sortable: true,
        filterable: true,
      },
      {
        id: "studentId",
        label: "ID",
        minWidth: 100,
        sortable: true,
        filterable: true,
      },

      {
        id: "mobile",
        label: "Mobile",
        minWidth: 120,
        sortable: true,
        filterable: true,
      },
    ];

    if (!isMobile) {
      baseColumns.push(
        {
          id: "className",
          label: "Class",
          minWidth: 100,
          sortable: true,
          filterable: true,
          filterOptions: classFilterOptions,
        },
        {
          id: "totalAmount",
          label: "Total (৳)",
          minWidth: 120,
          align: "right",
          sortable: true,
          format: (value: number) => `৳${value?.toFixed(2)}`,
        },
        {
          id: "totalPaid",
          label: "Paid (৳)",
          minWidth: 120,
          align: "right",
          sortable: true,
          format: (value: number) => `৳${value?.toFixed(2)}`,
        },
        {
          id: "totalDue",
          label: "Due (৳)",
          minWidth: 120,
          align: "right",
          sortable: true,
          format: (value: number) => (
            <Typography color="error.main" fontWeight="bold">
              ৳{value?.toFixed(2)}
            </Typography>
          ),
        },

        {
          id: "overallStatus",
          label: "Status",
          minWidth: 100,
          sortable: true,
          filterable: true,
          filterOptions: statusFilterOptions,
          format: (value: string) => {
            const statusMap: any = {
              paid: { color: "success", label: "Paid" },
              partial: { color: "warning", label: "Partial" },
              unpaid: { color: "error", label: "Due" },
            };
            const config = statusMap[value] || {
              color: "default",
              label: value,
            };
            return (
              <Chip label={config.label} color={config.color} size="small" />
            );
          },
        },
      );
    }

    return baseColumns;
  };

  const studentRowActions: RowAction[] = [
    {
      label: "View Details",
      icon: <Visibility fontSize="small" />,
      onClick: (row) => {
        const student = dueFeesData.find((s) => s.student._id === row._id);
        if (student) handleViewDetails(student);
      },
      color: "primary",
      tooltip: "View student fee details",
    },
    {
      label: "Collect Payment",
      icon: <Payment fontSize="small" />,
      onClick: (row) => {
        const student = dueFeesData.find((s) => s.student._id === row._id);
        if (student) handleOpenBulkPayment(student);
      },
      color: "success",
      tooltip: "Collect all due fees for this student",
    },
  ];

  const studentBulkActions = [
    {
      label: "Collect Selected",
      icon: <Payment />,
      onClick: (selectedRows: any[]) => {
        if (selectedRows.length === 0) {
          toast.error("Please select at least one student");
          return;
        }
        toast.error(
          "Bulk collection for multiple students is not yet implemented",
        );
      },
      color: "success" as const,
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Due Fees Collection
      </Typography>

      <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, height: "100%", width: "100%" }}>
        {studentTableData.length > 0 ? (
          <CraftTable
            title="Due Fees (Student Wise)"
            subtitle={`Showing ${studentTableData.length} students with due fees`}
            columns={getStudentColumns()}
            data={studentTableData}
            loading={loading}
            rowActions={studentRowActions}
            bulkActions={studentBulkActions}
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
            showRowNumbers={!isMobile}
            rowNumberHeader="#"
            defaultSortColumn="totalDue"
            defaultSortDirection="desc"
            borderRadius={3}
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
      </Box>

      {/* Student Fee Details Modal (using reusable CraftModal) */}
      <StudentFeeDetailsModal
        open={viewDetailsModalOpen}
        onClose={() => setViewDetailsModalOpen(false)}
        student={selectedStudent?.student}
        enrollment={selectedStudent?.enrollment}
        fees={selectedStudent?.fees || []}
        totalAmount={selectedStudent?.totalAmount || 0}
        totalPaid={selectedStudent?.totalPaid || 0}
        totalDue={selectedStudent?.totalDue || 0}
        onBulkPayment={handleBulkPaymentFromView}
      />

      {/* Bulk Payment Modal */}
      {selectedStudentForBulk && (
        <BulkPaymentModal
          open={bulkPaymentModalOpen}
          onClose={handleCloseBulkPayment}
          student={{
            _id: selectedStudentForBulk.student._id,
            name: selectedStudentForBulk.student.name,
            studentId: selectedStudentForBulk.student.studentId,
            className: selectedStudentForBulk.fees[0]?.class || "",
            roll: selectedStudentForBulk.enrollment.rollNumber,
            section: "",
            jamatGroup: "",
          }}
          fees={selectedStudentForBulk.fees.filter((fee) => fee.dueAmount > 0)}
          refetch={refetch}
          onPaymentCompleted={handleBulkPaymentCompleted}
        />
      )}
      <PrintModal
        open={printModalOpen}
        setOpen={handleClosePrintModal}
        receipt={selectedReceipt}
      />
      <PaymentModal
        open={paymentModalOpen}
        onClose={handleClosePaymentModal}
        fee={selectedFee}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default FeeCollection;
