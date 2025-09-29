/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ReportList/ReportCard.tsx
import {
    CardContent,
    Typography,
    Box,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    Avatar,
    Divider,
    LinearProgress,
    alpha,
    useTheme,
} from "@mui/material"
import {
    Visibility,
    Edit,
    Delete,
    Person,
    CalendarToday,
    TrendingUp,
} from "@mui/icons-material"
import Swal from "sweetalert2"
import { Report, DailyEntry } from "@/interface/hifzReport"
import { StyledCard, StyledChip, StyledTable } from "@/style/hifzReportStyle"

interface ReportCardProps {
    report: Report
    onView: (report: Report) => void
    onEdit: (id: string) => void
    onDelete: (id: string) => void
    customColumns: Record<string, any>
    customSummaryColumns: Record<string, any>
}

export function ReportCard({
    report,
    onView,
    onEdit,
    onDelete,
    customColumns,
    customSummaryColumns
}: ReportCardProps) {
    const theme = useTheme()

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

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

    const getProgressPercentage = (report: Report) => {
        const total = report.weeklySummary.totalSobok + report.weeklySummary.totalSatSobok + report.weeklySummary.totalSabakAmukta
        const target = parseInt(report.weeklyTarget) || 100
        return Math.min(100, (total / target) * 100)
    }

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: theme.palette.primary.main,
            cancelButtonColor: theme.palette.error.main,
            confirmButtonText: "Yes, delete it!",
        })

        if (result.isConfirmed) {
            try {
                await onDelete(id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your report has been deleted.",
                    icon: "success",
                    confirmButtonColor: theme.palette.primary.main,
                })
            } catch (error: any) {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete the report.",
                    icon: "error",
                    confirmButtonColor: theme.palette.primary.main,
                })
            }
        }
    }

    const renderCustomColumn = (day: string, data: DailyEntry, columnKey: string) => {
        if (customColumns[columnKey]) {
            return customColumns[columnKey].render({ day, data })
        }
        return null
    }

    const renderCustomSummaryColumn = (report: Report, columnKey: string) => {
        if (customSummaryColumns[columnKey]) {
            return customSummaryColumns[columnKey].render(report)
        }
        return null
    }

    return (
        <StyledCard>
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                            <Person />
                        </Avatar>
                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                {report.studentName}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                <CalendarToday fontSize="small" sx={{ mr: 0.5 }} />
                                <Typography variant="body2">
                                    {formatDate(report.reportDate)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StyledChip
                            label={`${getProgressPercentage(report)}% Complete`}
                            color="primary"
                            icon={<TrendingUp />}
                            sx={{ mr: 1 }}
                        />
                        <Tooltip title="View Full Report">
                            <IconButton
                                size="small"
                                onClick={() => onView(report)}
                                sx={{
                                    ml: 1,
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                                }}
                            >
                                <Visibility color="primary" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Report">
                            <IconButton
                                size="small"
                                sx={{
                                    ml: 1,
                                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                    '&:hover': { bgcolor: alpha(theme.palette.secondary.main, 0.2) }
                                }}
                                onClick={() => onEdit(report._id)}
                            >
                                <Edit color="secondary" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Report">
                            <IconButton
                                size="small"
                                sx={{
                                    ml: 1,
                                    bgcolor: alpha(theme.palette.error.main, 0.1),
                                    '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) }
                                }}
                                onClick={() => handleDelete(report._id)}
                            >
                                <Delete color="error" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Teacher: {report.teacherName} | Month: {report.month} | Target: {report.weeklyTarget || "Not specified"}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={getProgressPercentage(report)}
                        sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            }
                        }}
                    />
                </Box>

                {/* Summary Table */}
                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                    <StyledTable size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Day</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Sobok</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Sat Sobok</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Sabak Amukta</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Tilawat</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Teacher</TableCell>
                                {/* Render custom columns if any */}
                                {Object.keys(customColumns).map((key) => (
                                    <TableCell key={key} sx={{ fontWeight: 'bold' }}>
                                        {customColumns[key].label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(report.dailyEntries).map(([day, data]) => (
                                <TableRow key={day}>
                                    <TableCell sx={{ textTransform: "capitalize", fontWeight: 'bold' }}>
                                        {getDayName(day)}
                                    </TableCell>
                                    <TableCell>
                                        {data.sobok.para || '-'}/{data.sobok.page || '-'}
                                    </TableCell>
                                    <TableCell>
                                        {data.satSobok.para || '-'}/{data.satSobok.page || '-'}
                                    </TableCell>
                                    <TableCell>
                                        {data.sabakAmukta.para || '-'}/{data.sabakAmukta.page || '-'}
                                    </TableCell>
                                    <TableCell>{data.tilawaAmount || '-'}</TableCell>
                                    <TableCell>{data.teacherSignature || '-'}</TableCell>
                                    {/* Render custom columns if any */}
                                    {Object.keys(customColumns).map((key) => (
                                        <TableCell key={key}>
                                            {renderCustomColumn(day, data, key)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>Weekly Totals</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{report.weeklySummary.totalSobok}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{report.weeklySummary.totalSatSobok}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{report.weeklySummary.totalSabakAmukta}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{report.weeklySummary.totalTilawat}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{report.weeklySummary.totalRevision}</TableCell>
                                {/* Render custom summary columns if any */}
                                {Object.keys(customSummaryColumns).map((key) => (
                                    <TableCell key={key} sx={{ fontWeight: 'bold' }}>
                                        {renderCustomSummaryColumn(report, key)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </StyledTable>
                </TableContainer>
            </CardContent>
        </StyledCard>
    )
}