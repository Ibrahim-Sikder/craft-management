/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LoanTable.tsx
import { PhonelinkLockOutlined } from "@mui/icons-material"
import { Card, CardContent, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, LinearProgress, Box, Chip } from "@mui/material"
import LoanActionMenu from "./__components/LoanActionMenu"


interface LoanTableProps {
  loans: any[]
  isLoading: boolean
  filteredLoans: any[]
  onEdit: (loan: any) => void
  onDelete: (id: string) => void
  onAddRepayment: (loan: any) => void
  onTransfer: (loan: any) => void
  onViewAmortization: (loan: any) => void
  onViewHistory: (loan: any) => void
}

const LoanTable = ({ 
   
  isLoading, 
  filteredLoans, 
  onEdit, 
  onDelete, 
  onAddRepayment, 
  onTransfer, 
  onViewAmortization, 
  onViewHistory 
}: LoanTableProps) => {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "paid":
        return "info"
      case "defaulted":
        return "error"
      case "overdue":
        return "warning"
      default:
        return "default"
    }
  }

  const getProgressValue = (loan: any) => {
    if (!loan.loan_amount || loan.loan_amount === 0) return 0
    return ((loan.loan_amount - (loan.remainingBalance || 0)) / loan.loan_amount) * 100
  }

  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", mb: 3 }}>
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#F9FAFB" }}>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Borrower/Lender</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Principal</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Remaining</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Interest Rate</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Loan Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Due Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              ) : filteredLoans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Typography variant="body2" sx={{ py: 3, color: "#6B7280" }}>
                      No loans found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredLoans.map((loan) => {
                  const name = loan.loan_type === "given" ? loan.borrowerName : loan.lenderName
                  const type = loan.loan_type.toUpperCase()
                  const progress = getProgressValue(loan)
                  
                  return (
                    <TableRow key={loan._id} sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#1F2937" }}>
                            {name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#6B7280", display: 'flex', alignItems: 'center' }}>
                            <PhonelinkLockOutlined sx={{ fontSize: 14, mr: 0.5 }} />
                            {loan.contactNumber}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={type}
                          size="small"
                          sx={{
                            bgcolor: type === "GIVEN" ? "rgba(16, 185, 129, 0.1)" : "rgba(236, 72, 153, 0.1)",
                            color: type === "GIVEN" ? "#059669" : "#BE185D",
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>₹{loan.loan_amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={progress} 
                              sx={{ 
                                height: 6, 
                                borderRadius: 5,
                                backgroundColor: '#E5E7EB',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: progress === 100 ? '#10B981' : '#3B82F6'
                                }
                              }}
                            />
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="textSecondary">
                              ₹{loan.remainingBalance?.toLocaleString()}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{loan.interest_rate}%</TableCell>
                      <TableCell>
                        {new Date(loan.loan_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {loan.repayment_end_date ? new Date(loan.repayment_end_date).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={loan.status.toUpperCase()}
                          size="small"
                          color={getStatusColor(loan.status) as any}
                          variant="filled"
                        />
                      </TableCell>
                      <TableCell>
                        <LoanActionMenu
                          loan={loan}
                          onEdit={() => onEdit(loan)}
                          onDelete={onDelete}
                          onAddRepayment={() => onAddRepayment(loan)}
                          onTransfer={() => onTransfer(loan)}
                          onViewAmortization={() => onViewAmortization(loan)}
                          onViewHistory={() => onViewHistory(loan)}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default LoanTable