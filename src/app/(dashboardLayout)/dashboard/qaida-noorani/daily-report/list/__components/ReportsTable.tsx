/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Tabs, Tab, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, LinearProgress, Typography, Avatar, Chip, IconButton, Tooltip } from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon, CheckCircle as CheckCircleIcon, Schedule as ScheduleIcon, ViewAgenda } from "@mui/icons-material"
import { QaidaReport } from "@/interface/qaidaReport"

interface ReportsTableProps {
    reports: QaidaReport[]
    selectedTab: number
    handleTabChange: (event: React.SyntheticEvent, newValue: number) => void
    searchQuery: string
    filterTeacher: string
    isLoading: boolean
    isError: boolean
    onViewReport: (report: QaidaReport) => void
    onEditReport: (id: string) => void
    onDeleteReport: (id: string) => void
}

// Helper function to check if a report is completed
const isReportCompleted = (report: QaidaReport) => {
    return Object.values(report.dailyEntries).some(entry =>
        entry.hadithNumber || entry.duaNumber || entry.tajweedSubject ||
        entry.qaidaPage || entry.pageAmount
    )
}

const getStatusColor = (report: QaidaReport) => {
    return isReportCompleted(report) ? "success" : "warning"
}

const getStatusIcon = (report: QaidaReport) => {
    return isReportCompleted(report) ? <CheckCircleIcon /> : <ScheduleIcon />
}

const getStatusText = (report: QaidaReport) => {
    return isReportCompleted(report) ? "Completed" : "In Progress"
}

export default function ReportsTable({
    reports,
    selectedTab,
    handleTabChange,
    searchQuery,
    filterTeacher,
    isLoading,
    isError,
    onViewReport,
    onEditReport,
    onDeleteReport
}: ReportsTableProps) {
    const filteredReports = reports.filter((report: QaidaReport) => {
        // Apply tab filter
        if (selectedTab === 1 && !isReportCompleted(report)) return false
        if (selectedTab === 2 && isReportCompleted(report)) return false

        // Apply search filter
        if (searchQuery && !report.studentName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !report.month.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false
        }

        // Apply teacher filter
        if (filterTeacher !== "all" && report.teacherName !== filterTeacher) return false

        return true
    })

    return (
        <Card sx={{ borderRadius: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="report status tabs">
                    <Tab label="All Reports" />
                    <Tab label="Completed" />
                    <Tab label="In Progress" />
                </Tabs>
            </Box>

            {isLoading ? (
                <Box sx={{ p: 4, textAlign: "center" }}>
                    <LinearProgress />
                    <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                        Loading reports...
                    </Typography>
                </Box>
            ) : isError ? (
                <Box sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="h6" color="error">
                        Error loading reports
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Please try again later
                    </Typography>
                </Box>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "grey.100" }}>
                                <TableCell>Student</TableCell>
                                <TableCell>Month</TableCell>
                                <TableCell>Report Date</TableCell>
                                <TableCell>Weekly Target</TableCell>
                                <TableCell>Teacher</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredReports.map((report: QaidaReport) => (
                                <TableRow key={report._id} hover>
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                                                {report.studentName.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body2" fontWeight="500">
                                                    {report.studentName}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{report.month}</TableCell>
                                    <TableCell>{new Date(report.reportDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                            {report.weeklyTarget || "No target set"}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{report.teacherName}</TableCell>
                                    <TableCell>
                                        <Chip
                                            icon={getStatusIcon(report)}
                                            label={getStatusText(report)}
                                            color={getStatusColor(report) as any}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="View Report">
                                            <IconButton size="small" onClick={() => onViewReport(report)} color="primary">
                                                <ViewAgenda />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit Report">
                                            <IconButton size="small" onClick={() => onEditReport(report._id)} color="secondary">
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Report">
                                            <IconButton size="small" color="error" onClick={() => onDeleteReport(report._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {filteredReports.length === 0 && !isLoading && !isError && (
                <Box sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="h6" color="textSecondary">
                        No reports found
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Try adjusting your search or filter criteria
                    </Typography>
                </Box>
            )}
        </Card>
    )
}