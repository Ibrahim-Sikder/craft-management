import { Card, CardContent, Typography, Box, Grid } from "@mui/material"
import { CheckCircle as CheckCircleIcon, Schedule as ScheduleIcon, TrendingUp as TrendingUpIcon, EmojiEvents as EmojiEventsIcon } from "@mui/icons-material"
import { QaidaReport } from "@/interface/qaidaReport"

interface StatsCardsProps {
    reports: QaidaReport[]
}

// Helper function to check if a report is completed
const isReportCompleted = (report: QaidaReport) => {
    return Object.values(report.dailyEntries).some(entry =>
        entry.hadithNumber || entry.duaNumber || entry.tajweedSubject ||
        entry.qaidaPage || entry.pageAmount
    )
}

export default function StatsCards({ reports }: StatsCardsProps) {
    // Stats for dashboard
    const completedReports = reports.filter(isReportCompleted).length
    const inProgressReports = reports.length - completedReports
    const averagePerformance = reports.length > 0
        ? (completedReports / reports.length) * 100
        : 0

    return (
        <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ bgcolor: 'success.light', color: 'white', borderRadius: 3 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircleIcon sx={{ fontSize: 40, mr: 2 }} />
                            <Box>
                                <Typography variant="h4" fontWeight="bold">{completedReports}</Typography>
                                <Typography variant="body2">Completed Reports</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ bgcolor: 'warning.light', color: 'white', borderRadius: 3 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ScheduleIcon sx={{ fontSize: 40, mr: 2 }} />
                            <Box>
                                <Typography variant="h4" fontWeight="bold">{inProgressReports}</Typography>
                                <Typography variant="body2">In Progress</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ bgcolor: 'info.main', color: 'white', borderRadius: 3 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TrendingUpIcon sx={{ fontSize: 40, mr: 2 }} />
                            <Box>
                                <Typography variant="h4" fontWeight="bold">{averagePerformance.toFixed(1)}%</Typography>
                                <Typography variant="body2">Completion Rate</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 3 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmojiEventsIcon sx={{ fontSize: 40, mr: 2 }} />
                            <Box>
                                <Typography variant="h4" fontWeight="bold">{reports.length}</Typography>
                                <Typography variant="body2">Total Reports</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}