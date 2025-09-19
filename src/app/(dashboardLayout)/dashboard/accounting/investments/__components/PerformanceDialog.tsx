// components/PerformanceDialog.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Paper, LinearProgress, Box } from "@mui/material"
import { Analytics as AnalyticsIcon } from "@mui/icons-material"
import { useGetInvestmentPerformanceQuery } from "@/redux/api/investmentApi"

interface PerformanceDialogProps {
  open: boolean
  onClose: () => void
  investmentId: string
}

const PerformanceDialog = ({ open, onClose, investmentId }: PerformanceDialogProps) => {
  const { data: performanceData, isLoading } = useGetInvestmentPerformanceQuery(investmentId, { skip: !open || !investmentId })
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`
  }
  
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
        <AnalyticsIcon />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Investment Performance
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <LinearProgress sx={{ width: '100%' }} />
          </Box>
        ) : performanceData?.data ? (
          <>
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#F0F9FF', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#3B82F6" }}>
                      Current Value
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {formatCurrency(performanceData.data.currentValue)}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#F0FDF4', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#10B981" }}>
                      Total Returns
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {formatCurrency(performanceData.data.totalReturns)}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#FDF4FF', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#A855F7" }}>
                      ROI
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {formatPercentage(performanceData.data.roi)}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#FFFBEB', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#F59E0B" }}>
                      Annualized Return
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {formatPercentage(performanceData.data.annualizedReturn)}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#FEF2F2', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#EF4444" }}>
                      Days Held
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {performanceData.data.daysHeld}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <Typography variant="body2" sx={{ py: 3, textAlign: 'center', color: "#6B7280" }}>
            No performance data available
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

export default PerformanceDialog