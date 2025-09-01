// components/LoanCharts.tsx
import { Grid, Card, CardContent, Typography } from "@mui/material"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts"

interface LoanChartsProps {
  loanTypeData: Array<{ name: string; value: number; color: string }>
  monthlyPaymentData: Array<{ name: string; payment: number; type: string }>
}

const LoanCharts = ({ loanTypeData, monthlyPaymentData }: LoanChartsProps) => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} md={6}>
        <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#1F2937" }}>
              Loan Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={loanTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {loanTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#1F2937" }}>
              Monthly Payment Schedule
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyPaymentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <RechartsTooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, "Monthly Payment"]} />
                <Bar dataKey="payment" fill="#EC4899" name="Monthly Payment" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LoanCharts