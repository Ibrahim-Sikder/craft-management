// components/InvestmentCharts.tsx
import { Grid, Card, CardContent, Typography } from "@mui/material"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"



interface InvestmentChartsProps {
  investmentPieData: Array<{ name: string; value: number }>
  investmentPerformanceData: Array<{
    name: string
    principal: number
    current: number
    returns: number
  }>
}

const COLORS = ["#F59E0B", "#EC4899", "#8B5CF6", "#10B981", "#3B82F6"]

const InvestmentCharts = ({
  investmentPieData,
  investmentPerformanceData,
}: InvestmentChartsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // ✅ Ensure values are numbers before rendering
  const sanitizedPieData = investmentPieData.map((d) => ({
    ...d,
    value: Number(d.value) || 0,
  }))

  const sanitizedPerformanceData = investmentPerformanceData.map((d) => ({
    ...d,
    principal: Number(d.principal) || 0,
    current: Number(d.current) || 0,
    returns: Number(d.returns) || 0,
  }))

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/* Pie Chart */}
      <Grid item xs={12} md={6}>
        <Card
          sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 3, color: "#1F2937" }}
            >
              Investment Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sanitizedPieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {sanitizedPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "Value"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Bar Chart */}
      <Grid item xs={12} md={6}>
        <Card
          sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 3, color: "#1F2937" }}
            >
              Performance Comparison
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sanitizedPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), ""]}
                />
                <Bar dataKey="principal" fill="#9CA3AF" name="Principal" />
                <Bar dataKey="current" fill="#F59E0B" name="Current Value" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default InvestmentCharts
