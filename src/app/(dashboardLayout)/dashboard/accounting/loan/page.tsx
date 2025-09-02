// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // pages/loan-dashboard.tsx
// "use client"

// import { useState, useEffect } from "react"
// import { Box, Typography, Button, Pagination } from "@mui/material"

// import { useGetAllLoansQuery, useDeleteLoanMutation } from "@/redux/api/loanApi"
// import Swal from "sweetalert2"
// import { AddIcCallOutlined } from "@mui/icons-material"
// import LoanMetrics from "./__components/LoanMetrics"
// import LoanCharts from "./__components/LoanCharts"
// import LoanFilters from "./__components/LoanFilters"
// import LoanTable from "./LoanTable"
// import AddPaymentDialog from "./__components/AddPaymentDialog"
// import LoanForm from "./__components/LoanForm"
// import TransferDialog from "./__components/TransferDialog"
// import AmortizationDialog from "./__components/AmortizationDialog"
// import PaymentHistoryDialog from "./__components/PaymentHistoryDialog"

// const LoanDashboard = () => {
//   const [page, setPage] = useState(1)
//   const [limit, setLimit] = useState(10)
//   const { data: loanData, isLoading, refetch } = useGetAllLoansQuery({ page, limit })
//   const [deleteLoan] = useDeleteLoanMutation()
//   const [loans, setLoans] = useState<any[]>([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [typeFilter, setTypeFilter] = useState<string>("ALL")
//   const [formOpen, setFormOpen] = useState(false)
//   const [editingLoanId, setEditingLoanId] = useState<string | undefined>(undefined)
//   const [repaymentDialogOpen, setRepaymentDialogOpen] = useState(false)
//   const [transferDialogOpen, setTransferDialogOpen] = useState(false)
//   const [amortizationDialogOpen, setAmortizationDialogOpen] = useState(false)
//   const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
//   const [selectedLoan, setSelectedLoan] = useState<any>(null)

//   useEffect(() => {
//     if (loanData?.data?.data) {
//       setLoans(loanData.data.data)
//     }
//   }, [loanData])

//   // Calculate metrics
//   const loansGiven = loans.filter((loan) => loan.loan_type === "given")
//   const loansTaken = loans.filter((loan) => loan.loan_type === "taken")

//   const totalLoansGiven = loansGiven.reduce((sum, loan) => sum + loan.loan_amount, 0)
//   const totalLoansTaken = loansTaken.reduce((sum, loan) => sum + loan.loan_amount, 0)
//   const netPosition = totalLoansGiven - totalLoansTaken

//   const totalOutstanding = loans.reduce((sum, loan) => sum + (loan.remainingBalance || 0), 0)

//   // Prepare chart data
//   const loanTypeData = [
//     { name: "Loans Given", value: totalLoansGiven, color: "#10B981" },
//     { name: "Loans Taken", value: totalLoansTaken, color: "#EC4899" },
//   ]

//   const monthlyPaymentData = loans
//     .filter((loan) => loan.status === "active" && loan.monthly_installment)
//     .map((loan) => {
//       const name = loan.loan_type === "given" ? loan.borrowerName : loan.lenderName
//       return {
//         name: name?.length > 20 ? `${name.substring(0, 20)}...` : name,
//         payment: loan.monthly_installment,
//         type: loan.loan_type,
//       }
//     })

//   // Filter loans
//   const filteredLoans = loans.filter((loan) => {
//     const name = loan.loan_type === "given" ? loan.borrowerName : loan.lenderName
//     const matchesSearch = name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) || 
//                          loan.contactNumber?.includes(searchTerm)
//     const matchesType = typeFilter === "ALL" || loan.loan_type.toUpperCase() === typeFilter
//     return matchesSearch && matchesType
//   })

//   const handleAdd = () => {
//     setEditingLoanId(undefined)
//     setFormOpen(true)
//   }

//   const handleEdit = (loan: any) => {
//     setEditingLoanId(loan._id)
//     setFormOpen(true)
//   }

//   const handleDelete = async (id: string) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You want to delete this loan?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!"
//       })

//       if (result.isConfirmed) {
//         await deleteLoan(id).unwrap()
//         refetch()

//         Swal.fire({
//           title: "Deleted!",
//           text: "Loan has been deleted successfully.",
//           icon: "success"
//         })
//       }
//     } catch (err: any) {
//       Swal.fire({
//         title: "Error!",
//         text: err.data?.message || "Failed to delete loan",
//         icon: "error"
//       })
//     }
//   }

//   const handleAddRepayment = (loan: any) => {
//     setSelectedLoan(loan)
//     setRepaymentDialogOpen(true)
//   }

//   const handleTransfer = (loan: any) => {
//     setSelectedLoan(loan)
//     setTransferDialogOpen(true)
//   }

//   const handleViewAmortization = (loan: any) => {
//     setSelectedLoan(loan)
//     setAmortizationDialogOpen(true)
//   }

//   const handleViewHistory = (loan: any) => {
//     setSelectedLoan(loan)
//     setHistoryDialogOpen(true)
//   }

//   return (
//     <>
//       <Box sx={{ p: 3, width: '100%' }}>
//         {/* Header */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//           <Box>
//             <Typography variant="h4" sx={{ fontFamily: "Playfair Display", fontWeight: 700, color: "#1F2937", mb: 1 }}>
//               Loan Management
//             </Typography>
//             <Typography variant="body1" sx={{ color: "#6B7280" }}>
//               Track loans given and taken with payment schedules
//             </Typography>
//           </Box>
//           <Button
//             variant="contained"
//             startIcon={<AddIcCallOutlined/>}
//             onClick={handleAdd}
//             sx={{
//               bgcolor: "#EC4899",
//               "&:hover": { bgcolor: "#BE185D" },
//               borderRadius: 2,
//               px: 3,
//               py: 1.5,
//               textTransform: "none",
//               fontWeight: 600,
//             }}
//           >
//             New Loan
//           </Button>
//         </Box>

//         <LoanMetrics 
//           totalLoansGiven={totalLoansGiven}
//           totalLoansTaken={totalLoansTaken}
//           netPosition={netPosition}
//           totalOutstanding={totalOutstanding}
//         />

//         <LoanCharts
//           loanTypeData={loanTypeData}
//           monthlyPaymentData={monthlyPaymentData}
//         />

//         <LoanFilters
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           typeFilter={typeFilter}
//           setTypeFilter={setTypeFilter}
//         />

//         <LoanTable
//           loans={loans}
//           isLoading={isLoading}
//           filteredLoans={filteredLoans}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           onAddRepayment={handleAddRepayment}
//           onTransfer={handleTransfer}
//           onViewAmortization={handleViewAmortization}
//           onViewHistory={handleViewHistory}
//         />

//         {/* Pagination */}
//         {loanData?.meta && (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//             <Pagination
//               count={loanData.meta.totalPage}
//               page={page}
//               onChange={(event, value) => setPage(value)}
//               color="secondary"
//               showFirstButton
//               showLastButton
//             />
//           </Box>
//         )}
//       </Box>

//       <LoanForm
//         open={formOpen}
//         onClose={() => setFormOpen(false)}
//         loanId={editingLoanId}
//         refetch={refetch}
//       />

//       <AddPaymentDialog
//         open={repaymentDialogOpen}
//         onClose={() => setRepaymentDialogOpen(false)}
//         loanId={selectedLoan?._id}
//         refetch={refetch}
//       />

//       <TransferDialog
//         open={transferDialogOpen}
//         onClose={() => setTransferDialogOpen(false)}
//         loanId={selectedLoan?._id}
//         refetch={refetch}
//       />

//       <AmortizationDialog
//         open={amortizationDialogOpen}
//         onClose={() => setAmortizationDialogOpen(false)}
//         loanId={selectedLoan?._id}
//       />

//       <PaymentHistoryDialog
//         open={historyDialogOpen}
//         onClose={() => setHistoryDialogOpen(false)}
//         loan={selectedLoan}
//       />
//     </>
//   )
// }

// export default LoanDashboard


import React from 'react';

const page = () => {
  return (
    <div>
      <h1>this is</h1>
    </div>
  );
};

export default page;