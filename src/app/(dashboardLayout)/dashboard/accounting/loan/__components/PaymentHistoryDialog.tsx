// components/PaymentHistoryDialog.tsx
import { Loan } from "@/types"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip, Box } from "@mui/material"
interface PaymentHistoryDialogProps {
  open: boolean
  onClose: () => void
  loan: Loan | null
}

const PaymentHistoryDialog = ({ open, onClose, loan }: PaymentHistoryDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* <HistoryIcon /> */}
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Payment History - {loan?.lenderName || loan?.borrowerName}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, bgcolor: '#FFFBEB', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ color: "#92400E" }}>
                  Total Paid
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#92400E" }}>
                  ₹{loan?.totalPaid?.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, bgcolor: '#ECFDF5', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ color: "#065F46" }}>
                  Remaining Balance
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#065F46" }}>
                  ₹{loan?.remainingBalance?.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        
        {loan?.repaymentHistory?.length > 0 ? (
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">Remaining Balance</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loan.repaymentHistory.map((payment: any, index: number) => (
                  <TableRow key={index} hover>
                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell align="right">₹{payment.amount}</TableCell>
                    <TableCell>
                      <Chip 
                        label={payment.type} 
                        size="small" 
                        color={
                          payment.type === 'principal' ? 'primary' : 
                          payment.type === 'interest' ? 'secondary' : 'default'
                        } 
                      />
                    </TableCell>
                    <TableCell align="right">₹{payment.remainingBalance}</TableCell>
                    <TableCell>{payment.note || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2" sx={{ py: 3, textAlign: 'center', color: "#6B7280" }}>
            No payment history available
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

export default PaymentHistoryDialog