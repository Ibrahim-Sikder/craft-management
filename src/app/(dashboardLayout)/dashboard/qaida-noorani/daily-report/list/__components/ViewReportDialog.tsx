/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Avatar, Typography, Chip, Button, useTheme, useMediaQuery } from "@mui/material"
import { Person as PersonIcon, Print as PrintIcon, Download as DownloadIcon, Share as ShareIcon, Edit as EditIcon, Schedule, CheckCircle } from "@mui/icons-material"
import { QaidaReport } from "@/interface/qaidaReport"
import QaidaNooraniReport from "./QaidaNooraniReport"

interface ViewReportDialogProps {
    open: boolean
    onClose: () => void
    report: QaidaReport | null
    onEditReport: (id: string) => void
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
    return isReportCompleted(report) ? <CheckCircle /> : <Schedule />
}

const getStatusText = (report: QaidaReport) => {
    return isReportCompleted(report) ? "Completed" : "In Progress"
}

export default function ViewReportDialog({ open, onClose, report, onEditReport }: ViewReportDialogProps) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth
            fullScreen={isMobile}
            PaperProps={{ sx: { borderRadius: 3 } }}
        >
            <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ mr: 2, bgcolor: "white", color: 'primary.main' }}>
                            <PersonIcon />
                        </Avatar>
                        <Box>
                            <Typography variant="h6">{report?.studentName}  Report</Typography>
                            <Typography variant="body2">{report?.month}</Typography>
                        </Box>
                    </Box>
                    <Chip
                        icon={report ? getStatusIcon(report) : undefined}
                        label={report ? getStatusText(report) : ''}
                        color={report ? getStatusColor(report) as any : 'default'}
                        sx={{ color: 'white' }}
                    />
                </Box>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 0 }}>
                {report && (
                    <QaidaNooraniReport report={report} />
                )}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button startIcon={<PrintIcon />} variant="outlined">Print</Button>
                <Button startIcon={<DownloadIcon />} variant="outlined">Download PDF</Button>
                <Button startIcon={<ShareIcon />} variant="outlined">Share</Button>
                <Button
                    variant="contained"
                    onClick={() => onEditReport(report?._id || '')}
                    startIcon={<EditIcon />}
                    sx={{ mr: 1 }}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={onClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}