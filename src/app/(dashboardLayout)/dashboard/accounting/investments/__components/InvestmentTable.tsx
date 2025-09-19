/* eslint-disable @typescript-eslint/no-explicit-any */
// components/InvestmentTable.tsx
import {
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  LinearProgress,
  Box,
  Chip,
} from "@mui/material"
import { Phone as PhoneIcon } from "@mui/icons-material"
import InvestmentActionMenu from "./InvestmentActionMenu"

interface InvestmentTableProps {
  investments: any[]
  isLoading: boolean
  filteredInvestments: any[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onAddReturn: (investment: any) => void
  onCloseInvestment: (investment: any) => void
  onViewPerformance: (investment: any) => void
}

const InvestmentTable = ({
  isLoading,
  filteredInvestments,
  onEdit,
  onDelete,
  onAddReturn,
  onCloseInvestment,
  onViewPerformance,
}: InvestmentTableProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "closed":
        return "info"
      case "withdrawn":
        return "default"
      case "matured":
        return "warning"
      default:
        return "default"
    }
  }

  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#F9FAFB" }}>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Investment</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Return Rate</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Total Returns</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Investment Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              ) : filteredInvestments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" sx={{ color: "#6B7280" }}>
                      No investments found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvestments.map((investment) => {
                  const returns = investment.totalReturns || 0
                  const name = investment.investmentCategory === "outgoing"
                    ? investment.investmentTo
                    : investment.investorName

                  return (
                    <TableRow key={investment._id} sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#1F2937" }}>
                            {name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#6B7280", display: 'flex', alignItems: 'center' }}>
                            <PhoneIcon sx={{ fontSize: 14, mr: 0.5 }} />
                            {investment.investmentCategory === "outgoing" 
                              ? investment.investorContact 
                              : investment.contactNumber}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={investment.investmentCategory === "outgoing"
                            ? investment.investmentType
                            : investment.incomingType}
                          size="small"
                          sx={{
                            bgcolor: "rgba(245, 158, 11, 0.1)",
                            color: "#D97706",
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {formatCurrency(investment.investmentAmount)}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {investment.returnRate}%
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#059669" }}>
                        {formatCurrency(returns)}
                      </TableCell>
                      <TableCell>
                        {formatDate(investment.investmentDate)}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={investment.status.toUpperCase()}
                          size="small"
                          color={getStatusColor(investment.status) as any}
                          variant="filled"
                        />
                      </TableCell>
                      <TableCell>
                        <InvestmentActionMenu
                          investment={investment}
                          onEdit={() => onEdit(investment._id)}
                          onDelete={() => onDelete(investment._id)}
                          onAddReturn={() => onAddReturn(investment)}
                          onCloseInvestment={() => onCloseInvestment(investment)}
                          onViewPerformance={() => onViewPerformance(investment)}
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

export default InvestmentTable