// components/LoanMetrics.tsx
import { Grid, Card, CardContent, Typography, Avatar, Box } from "@mui/material"
// import { TrendingUpIcon, TrendingDownIcon, AccountBalanceIcon, MoneyIcon } from "@mui/icons-material"

interface LoanMetricsProps {
  totalLoansGiven: number
  totalLoansTaken: number
  netPosition: number
  totalOutstanding: number
}

const LoanMetrics = ({ totalLoansGiven, totalLoansTaken, netPosition, totalOutstanding }: LoanMetricsProps) => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
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
                  ৳{totalLoansGiven.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Loans Given
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                {/* <TrendingUpIcon sx={{ fontSize: 28 }} /> */}
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
            color: "white",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(236, 72, 153, 0.3)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  ৳{totalLoansTaken.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Loans Taken
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                {/* <TrendingDownIcon sx={{ fontSize: 28 }} /> */}
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            background:
              netPosition >= 0
                ? "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
                : "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
            color: "white",
            borderRadius: 3,
            boxShadow: `0 8px 32px ${netPosition >= 0 ? "rgba(139, 92, 246, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  ৳{Math.abs(netPosition).toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {netPosition >= 0 ? "Net Gain" : "Net Liability"}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                {/* <AccountBalanceIcon sx={{ fontSize: 28 }} /> */}
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
            color: "white",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  ৳{totalOutstanding.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Outstanding Balance
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                {/* <MoneyIcon sx={{ fontSize: 28 }} /> */}
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LoanMetrics