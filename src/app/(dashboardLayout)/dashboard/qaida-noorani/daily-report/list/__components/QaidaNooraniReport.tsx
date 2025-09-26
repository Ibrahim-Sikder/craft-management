import { Box, Grid, Card, CardContent, Typography, CardHeader, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, Chip } from "@mui/material"
import { Person as PersonIcon, Star as StarIcon, Assignment as AssignmentIcon } from "@mui/icons-material"
import { useTheme, useMediaQuery } from "@mui/material"
import { DAYS_OF_WEEK } from "@/constant/daysConfig"
import ReportTableRow from "./ReportTableRow"
import { QaidaReport } from "@/interface/qaidaReport"

interface QaidaNooraniReportProps {
    report: QaidaReport
}

export default function QaidaNooraniReport({ report }: QaidaNooraniReportProps) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const { studentName, reportDate, month, weeklyTarget, dailyEntries, teacherName } = report

    return (
        <Box sx={{ p: isMobile ? 1 : 3 }}>
            {/* Header Info */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                <PersonIcon sx={{ mr: 1 }} /> Student Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">Name</Typography>
                                    <Typography variant="body1" fontWeight="500">{studentName}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">Month</Typography>
                                    <Typography variant="body1" fontWeight="500">{month}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">Report Date</Typography>
                                    <Typography variant="body1" fontWeight="500">{new Date(reportDate).toLocaleDateString()}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">Weekly Target</Typography>
                                    <Typography variant="body1" fontWeight="500">{weeklyTarget || "No target set"}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                <StarIcon sx={{ mr: 1 }} /> Report Summary
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">Teacher</Typography>
                                    <Typography variant="body1" fontWeight="500">{teacherName}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">Last Updated</Typography>
                                    <Typography variant="body1" fontWeight="500">
                                        {new Date(report.updatedAt).toLocaleDateString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="textSecondary">Report Status</Typography>
                                    <Chip
                                        label={Object.values(dailyEntries).some(entry =>
                                            entry.hadithNumber || entry.duaNumber || entry.tajweedSubject ||
                                            entry.qaidaPage || entry.pageAmount
                                        ) ? "Completed" : "In Progress"}
                                        color={Object.values(dailyEntries).some(entry =>
                                            entry.hadithNumber || entry.duaNumber || entry.tajweedSubject ||
                                            entry.qaidaPage || entry.pageAmount
                                        ) ? "success" : "warning"}
                                        size="small"
                                        sx={{ mt: 1 }}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Daily Progress Table */}
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                <AssignmentIcon sx={{ mr: 1 }} /> Daily Progress Details
            </Typography>

            <TableContainer component={Paper} sx={{ border: 1, borderColor: "grey.300", borderRadius: 2 }}>
                <Table size="small" sx={{ "& .MuiTableCell-root": { border: 1, borderColor: "grey.300" } }}>
                    <TableHead>
                        <ReportTableRow />
                    </TableHead>
                    <TableBody>
                        {DAYS_OF_WEEK.map((day) => {
                            const dayEntry = dailyEntries[day.key] || {}
                            return (
                                <TableRow key={day.key} sx={{ "&:hover": { bgcolor: "grey.50" } }}>
                                    <TableCell align="center" sx={{ fontWeight: 500 }}>
                                        <Typography variant="body2">{day.name}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            ({day.bangla})
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dayEntry.hadithNumber || ""}
                                            variant="outlined"
                                            InputProps={{ readOnly: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dayEntry.duaNumber || ""}
                                            variant="outlined"
                                            InputProps={{ readOnly: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dayEntry.tajweedSubject || ""}
                                            variant="outlined"
                                            InputProps={{ readOnly: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dayEntry.qaidaPage || ""}
                                            variant="outlined"
                                            InputProps={{ readOnly: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dayEntry.pageAmount || ""}
                                            variant="outlined"
                                            InputProps={{ readOnly: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dayEntry.hadithDuaRevision || ""}
                                            variant="outlined"
                                            InputProps={{ readOnly: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dayEntry.duaRevision || ""}
                                            variant="outlined"
                                            InputProps={{ readOnly: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dayEntry.tajweedRevision || ""}
                                            variant="outlined"
                                            InputProps={{ readOnly: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dayEntry.qaidaRevision || ""}
                                            variant="outlined"
                                            InputProps={{ readOnly: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dayEntry.teacherSignature || ""}
                                            variant="outlined"
                                            InputProps={{ readOnly: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dayEntry.comment || ""}
                                            variant="outlined"
                                            InputProps={{ readOnly: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        <TableRow sx={{ bgcolor: "grey.100", fontWeight: 600 }}>
                            <TableCell align="center" sx={{ fontWeight: 600 }}>
                                <Typography variant="body2" fontWeight="600">
                                    Weekly Total
                                </Typography>
                                <Typography variant="caption">(সপ্তাহে মোট শেখা হয়েছে)</Typography>
                            </TableCell>
                            <TableCell colSpan={10}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6} md={2.4}>
                                        <Typography variant="caption">Total Pages: {Object.values(dailyEntries).reduce((sum, entry) => sum + (parseInt(entry.pageAmount) || 0), 0)}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={2.4}>
                                        <Typography variant="caption">Total Hadith: {Object.values(dailyEntries).reduce((sum, entry) => sum + (parseInt(entry.hadithNumber) || 0), 0)}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={2.4}>
                                        <Typography variant="caption">Total Duas: {Object.values(dailyEntries).reduce((sum, entry) => sum + (parseInt(entry.duaNumber) || 0), 0)}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={2.4}>
                                        <Typography variant="caption">Total Tajweed: {Object.values(dailyEntries).filter(entry => entry.tajweedSubject).length} topics</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={2.4}>
                                        <Typography variant="caption">Total Revision: {Object.values(dailyEntries).reduce((sum, entry) => sum + (parseInt(entry.qaidaRevision) || 0), 0)} sessions</Typography>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Additional Notes Section */}
            <Card sx={{ mt: 3, borderRadius: 2 }}>
                <CardHeader title="Teacher's Additional Notes" />
                <CardContent>
                    <Typography variant="body2" paragraph>
                        This report shows {studentName} progress for the week of {month}.
                        {Object.values(dailyEntries).some(entry =>
                            entry.hadithNumber || entry.duaNumber || entry.tajweedSubject ||
                            entry.qaidaPage || entry.pageAmount
                        )
                            ? " The student has completed all assigned tasks with good performance."
                            : " The student is still working on completing the assigned tasks."}
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Teacher: {teacherName}
                    </Typography>
                    <Typography variant="body2">
                        Last Updated: {new Date(report.updatedAt).toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}