// components/ReportList/ReportCharts.tsx
import {
    Box,
    Grid,
    Typography,
} from "@mui/material"
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
    Tooltip as RechartsTooltip,
    Legend,
} from 'recharts'
import { Report } from "@/interface/hifzReport"
import { COLORS } from "@/style/hifzReportStyle"

interface ReportChartsProps {
    report: Report
}

export function ReportCharts({ report }: ReportChartsProps) {
    const getChartData = (report: Report) => {
        return [
            { name: 'Sobok', value: report.weeklySummary.totalSobok },
            { name: 'Sat Sobok', value: report.weeklySummary.totalSatSobok },
            { name: 'Sabak Amukta', value: report.weeklySummary.totalSabakAmukta },
            { name: 'Tilawat', value: report.weeklySummary.totalTilawat },
            { name: 'Revision', value: report.weeklySummary.totalRevision },
        ]
    }

    const getBarChartData = (report: Report) => {
        const getDayName = (dayKey: string) => {
            const days: Record<string, string> = {
                saturday: "Saturday",
                sunday: "Sunday",
                monday: "Monday",
                tuesday: "Tuesday",
                wednesday: "Wednesday",
                thursday: "Thursday",
                friday: "Friday",
            }
            return days[dayKey] || dayKey
        }

        return Object.entries(report.dailyEntries).map(([day, data]) => ({
            name: getDayName(day).substring(0, 3),
            sobok: parseInt(data.sobok.page) || 0,
            satSobok: parseInt(data.satSobok.amount) || 0,
            sabakAmukta: parseInt(data.sabakAmukta.page) || 0,
            tilawat: parseInt(data.tilawaAmount) || 0,
        }))
    }

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Weekly Summary
                    </Typography>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={getChartData(report)}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {getChartData(report).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Daily Progress
                    </Typography>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                            data={getBarChartData(report)}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <RechartsTooltip />
                            <Legend />
                            <Bar dataKey="sobok" fill="#0088FE" name="Sobok" />
                            <Bar dataKey="satSobok" fill="#00C49F" name="Sat Sobok" />
                            <Bar dataKey="sabakAmukta" fill="#FFBB28" name="Sabak Amukta" />
                            <Bar dataKey="tilawat" fill="#FF8042" name="Tilawat" />
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>
        </Box>
    )
}