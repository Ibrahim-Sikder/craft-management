// components/InvestmentMetrics.tsx
import { Grid, Card, CardContent, Typography, Avatar, Box } from "@mui/material"
import { AttachMoney as AttachMoneyIcon, TrendingUp as TrendingUpIcon, AccountBalance as AccountBalanceIcon } from "@mui/icons-material"

interface InvestmentMetricsProps {
  totalInvestmentValue: number
  totalReturns: number
  avgROI: number
  activeInvestments: number
}

const InvestmentMetrics = ({ 
  totalInvestmentValue, 
  totalReturns, 
  avgROI, 
  activeInvestments 
}: InvestmentMetricsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
            color: "white",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(245, 158, 11, 0.3)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {formatCurrency(totalInvestmentValue)}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Value
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                <AttachMoneyIcon sx={{ fontSize: 28 }} />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
            color: "white",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {formatCurrency(totalReturns)}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Returns
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                <TrendingUpIcon sx={{ fontSize: 28 }} />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
            color: "white",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {avgROI.toFixed(1)}%
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Average ROI
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                <TrendingUpIcon sx={{ fontSize: 28 }} />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
            color: "white",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(139, 92, 246, 0.3)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {activeInvestments}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Active Investments
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                <AccountBalanceIcon sx={{ fontSize: 28 }} />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default InvestmentMetrics