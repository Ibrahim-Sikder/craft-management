/* eslint-disable @typescript-eslint/no-explicit-any */
// components/AmortizationDialog.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, LinearProgress, Box } from "@mui/material"
import { useGetLoanAmortizationQuery } from "@/redux/api/loanApi"

interface AmortizationDialogProps {
  open: boolean
  onClose: () => void
  loanId: string
}

const AmortizationDialog = ({ open, onClose, loanId }: AmortizationDialogProps) => {
  const { data: amortizationData, isLoading } = useGetLoanAmortizationQuery(loanId, { skip: !open || !loanId })
  console.log(amortizationData)
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
      
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Loan Amortization Schedule
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <LinearProgress sx={{ width: '100%' }} />
          </Box>
        ) : amortizationData?.data ? (
          <>
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#F0F9FF', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#3B82F6" }}>
                      Total Payment
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      ৳{amortizationData.data.totalPayment?.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#F0FDF4', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#10B981" }}>
                      Total Interest
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      ৳{amortizationData.data.totalInterest?.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#FDF4FF', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#A855F7" }}>
                      Number of Payments
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {amortizationData.data.amortizationSchedule?.length}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
            
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Payment Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="right">Payment</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="right">Principal</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="right">Interest</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="right">Remaining Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {amortizationData.data.amortizationSchedule?.map((payment: any, index: number) => (
                    <TableRow key={index} hover>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell align="right">৳{payment.payment?.toFixed(2)}</TableCell>
                      <TableCell align="right">৳{payment.principal?.toFixed(2)}</TableCell>
                      <TableCell align="right">৳{payment.interest?.toFixed(2)}</TableCell>
                      <TableCell align="right">৳{payment.balance?.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Typography variant="body2" sx={{ py: 3, textAlign: 'center', color: "#6B7280" }}>
            No amortization data available
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: "#F9FAFB" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "#D1D5DB",
            color: "#6B7280",
            "&:hover": { borderColor: "#9CA3AF", bgcolor: "#F3F4F6" },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AmortizationDialog