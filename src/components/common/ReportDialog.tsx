/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ReportList/ReportDialog.tsx
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Box,

    Divider,
    Avatar,
    Typography,
    LinearProgress,
    alpha,
    useTheme,
    useMediaQuery,
} from "@mui/material"
import {
    ArrowBack,
    Person,
    Print,
} from "@mui/icons-material"
import { Report } from "@/interface/hifzReport"
import { ReportCharts } from "./ReportChart"
import { ReportDataList } from "./ReportDataList"

interface ReportDialogProps {
    open: boolean
    onClose: () => void
    report: Report | null
    showCharts: boolean
    customColumns: Record<string, any>
    customSummaryColumns: Record<string, any>
}

export function ReportDialog({
    open,
    onClose,
    report,
    showCharts,
    customColumns,
    customSummaryColumns
}: ReportDialogProps) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const getProgressPercentage = (report: Report) => {
        const total = report.weeklySummary.totalSobok + report.weeklySummary.totalSatSobok + report.weeklySummary.totalSabakAmukta
        const target = parseInt(report.weeklyTarget) || 100
        return Math.min(100, (total / target) * 100)
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            fullScreen={isMobile}
            PaperProps={{
                sx: {
                    borderRadius: isMobile ? 0 : 16,
                    overflow: 'hidden',
                }
            }}
        >
            {isMobile ? (
                <AppBar position="static" color="default" elevation={0}>
                    <Toolbar>
                        <IconButton edge="start" onClick={onClose} aria-label="close">
                            <ArrowBack />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1, fontWeight: 'bold' }} variant="h6" component="div">
                            Report Details
                        </Typography>
                    </Toolbar>
                </AppBar>
            ) : (
                <DialogTitle sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    color: 'white',
                    py: 3,
                    px: 4,
                }}>
                    <Typography variant="h5" fontWeight="bold">
                        Report Details
                    </Typography>
                </DialogTitle>
            )}

            <DialogContent dividers sx={{ p: 0 }}>
                {report && (
                    <Box>
                        <Box sx={{ p: 3, background: alpha(theme.palette.primary.main, 0.02) }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56, mr: 2 }}>
                                    <Person fontSize="large" />
                                </Avatar>
                                <Box>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        {report.studentName}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Teacher: {report.teacherName} | Date: {formatDate(report.reportDate)} | Month: {report.month}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Weekly Target: {report.weeklyTarget || "Not specified"}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={getProgressPercentage(report)}
                                        sx={{
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                            '& .MuiLinearProgress-bar': {
                                                borderRadius: 5,
                                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            }
                                        }}
                                    />
                                </Box>
                                <Typography variant="body2" fontWeight="bold" sx={{ ml: 2 }}>
                                    {getProgressPercentage(report)}%
                                </Typography>
                            </Box>
                        </Box>

                        <Divider />

                        {showCharts && (
                            <>
                                <ReportCharts report={report} />
                                <Divider />
                            </>
                        )}

                        <ReportDataList
                            report={report}
                            customColumns={customColumns}
                            customSummaryColumns={customSummaryColumns}
                        />
                    </Box>
                )}
            </DialogContent>

            {!isMobile && (
                <DialogActions sx={{ p: 3, background: alpha(theme.palette.primary.main, 0.02) }}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        sx={{ borderRadius: 24, px: 3 }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Print />}
                        sx={{
                            borderRadius: 24,
                            px: 3,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        }}
                    >
                        Print Report
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    )
}