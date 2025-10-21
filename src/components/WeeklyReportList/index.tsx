/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Chip,
    IconButton,
    Card,
    CardContent,
    Grid,
    Avatar,
    LinearProgress,
    Tooltip,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    CircularProgress
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useTheme } from "@mui/material/styles";
import {
    Visibility,
    Edit,
    Delete,
    Add,
    CheckCircle,
    Cancel,
    TrendingUp,
    Close,
    Book,
    MenuBook,
    RecordVoiceOver,
    Assignment
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useDeleteWeeklyReportMutation, useGetAllWeeklyReportsQuery } from "@/redux/api/weeklyReportApi";
import Link from "next/link";


type ReportTypeProps = {
    reportType: string;
    title: string;
    addPath: string;
}
export default function WeeklyReportList({ title, reportType, addPath }: ReportTypeProps) {
    const theme = useTheme();
    const router = useRouter();
    const [reports, setReports] = useState<any[]>([]);
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const { data: apiData, isLoading, error, refetch } = useGetAllWeeklyReportsQuery({ reportType });
    const [deleteWeeklyReport, { isLoading: isDeleting }] = useDeleteWeeklyReportMutation();


    useEffect(() => {
        if (apiData && apiData.data && apiData.data.data) {
            const processedReports = apiData.data.data.map((report: any) => {
                // Extract data from rows
                const targetsRow = report.rows.find((row: any) => row.label === "একনজরে এই সপ্তাহের টার্গেট");
                const reportsRow = report.rows.find((row: any) => row.label === "একনজরে এই সপ্তাহের রিপোর্ট");
                const mistakesRow = report.rows.find((row: any) => row.label === "একনজরে ভুলের সংখ্যা");

                // Calculate progress based on targets and reports
                let progress = 0;
                if (targetsRow && reportsRow) {
                    let completedCount = 0;
                    for (let i = 0; i < targetsRow.values.length; i++) {
                        if (targetsRow.values[i] === reportsRow.values[i]) {
                            completedCount++;
                        }
                    }
                    progress = Math.round((completedCount / targetsRow.values.length) * 100);
                }

                // Determine status based on progress
                let status = "needs-improvement";
                if (progress >= 90) {
                    status = "completed";
                } else if (progress >= 60) {
                    status = "in-progress";
                }

                // Create the processed report object
                return {
                    id: report._id,
                    name: report.studentName,
                    date: dayjs(report.date),
                    month: report.month,
                    status: status,
                    progress: progress,
                    reportType: report.reportType,
                    targets: {
                        hadith: targetsRow ? targetsRow.values[0] : "",
                        dua: targetsRow ? targetsRow.values[1] : "",
                        tajweed: targetsRow ? targetsRow.values[2] : "",
                        qaida: targetsRow ? targetsRow.values[3] : ""
                    },
                    reports: {
                        hadith: reportsRow ? reportsRow.values[0] : "",
                        dua: reportsRow ? reportsRow.values[1] : "",
                        tajweed: reportsRow ? reportsRow.values[2] : "",
                        qaida: reportsRow ? reportsRow.values[3] : ""
                    },
                    mistakes: {
                        hadith: mistakesRow ? mistakesRow.values[0] : "",
                        dua: mistakesRow ? mistakesRow.values[1] : "",
                        tajweed: mistakesRow ? mistakesRow.values[2] : "",
                        qaida: mistakesRow ? mistakesRow.values[3] : ""
                    },
                    teacherComments: "শিক্ষকের মন্তব্য এখনো যোগ করা হয়নি।",
                    nextWeekTarget: "পরবর্তী সপ্তাহের টার্গেট এখনো নির্ধারণ করা হয়নি।"
                };
            });

            setReports(processedReports);
        }
    }, [apiData]);

    const handleDelete = async (id: string, name: string) => {
        const result = await Swal.fire({
            title: "আপনি কি নিশ্চিত?",
            text: `${name} এর রিপোর্টটি মুছে ফেলতে চান?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
            cancelButtonText: "বাতিল করুন"
        });

        if (result.isConfirmed) {
            try {
                await deleteWeeklyReport(id).unwrap();
                Swal.fire({
                    title: "সফল!",
                    text: "রিপোর্টটি সফলভাবে মুছে ফেলা হয়েছে।",
                    icon: "success"
                });
                refetch();
            } catch (error: any) {
                Swal.fire({
                    title: "ত্রুটি!",
                    text: "রিপোর্ট মুছে ফেলতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
                    icon: "error"
                });
            }
        }
    };

    const handleEdit = (id: string) => {
        router.push(`/dashboard/hifz/weeklytarget/update?id=${id}`);
    };

    const handleViewReport = (report: any) => {
        setSelectedReport(report);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedReport(null);
    };

    const getStatusChip = (status: string) => {
        switch (status) {
            case "completed":
                return <Chip icon={<CheckCircle />} label="Completed" color="success" size="small" />;
            case "in-progress":
                return <Chip icon={<TrendingUp />} label="In Progress" color="primary" size="small" />;
            case "needs-improvement":
                return <Chip icon={<Cancel />} label="Needs Improvement" color="warning" size="small" />;
            default:
                return <Chip label="Unknown" size="small" />;
        }
    };


    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6" color="error">
                    Error loading reports. Please try again later.
                </Typography>
            </Box>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                p={3}
                sx={{
                    maxWidth: "xl",
                    margin: "0 auto",
                    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    minHeight: "100vh",
                }}
            >
                {/* Header section */}
                <Paper elevation={4} sx={{ p: 3, mb: 3, background: "#fff" }}>
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            fontWeight: "bold",
                            mb: 1,
                            color: theme.palette.primary.main,
                            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                        }}
                    >
                        ক্রাফট ইন্টারন্যাশনাল ইন্সটিটিউট
                    </Typography>
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{
                            mb: 2,
                            color: theme.palette.text.secondary,
                        }}
                    >
                        {title}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <Typography variant="body2" color="textSecondary">
                            মোট রিপোর্ট: {reports.length} টি
                        </Typography>

                        <Fab
                            component={Link}
                            href={addPath}
                            color="primary"
                            aria-label="add"
                            variant="extended"
                        >
                            <Add sx={{ mr: 1 }} />
                            নতুন রিপোর্ট
                        </Fab>
                    </Box>

                </Paper>

                {/* Reports List */}
                <Grid container spacing={3}>
                    {reports.map((report) => (
                        <Grid item xs={12} key={report.id}>
                            <Card elevation={4} sx={{ borderRadius: 2, overflow: "hidden" }}>
                                <Box
                                    sx={{
                                        height: 6,
                                        background: report.status === "completed"
                                            ? "#4caf50"
                                            : report.status === "in-progress"
                                                ? "#2196f3"
                                                : "#ff9800"
                                    }}
                                />

                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                        <Box display="flex" alignItems="center">
                                            <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                                                {report.name.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="h6" fontWeight="bold">
                                                    {report.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    তারিখ: {report.date.format('DD/MM/YYYY')} | মাস: {report.month}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    রিপোর্টের ধরন: {report.reportType}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box>
                                            {getStatusChip(report.status)}
                                            <Box display="flex" mt={1}>
                                                <Tooltip title="View Full Report">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleViewReport(report)}
                                                        sx={{ ml: 1 }}
                                                    >
                                                        <Visibility />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit Report">
                                                    <IconButton
                                                        color="secondary"
                                                        sx={{ ml: 1 }}
                                                        onClick={() => handleEdit(report.id)}
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete Report">
                                                    <IconButton
                                                        color="error"
                                                        sx={{ ml: 1 }}
                                                        onClick={() => handleDelete(report.id, report.name)}
                                                        disabled={isDeleting}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <LinearProgress
                                        variant="determinate"
                                        value={report.progress}
                                        sx={{
                                            height: 10,
                                            borderRadius: 5,
                                            mb: 2,
                                            backgroundColor: '#e0e0e0',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: report.status === "completed"
                                                    ? "#4caf50"
                                                    : report.status === "in-progress"
                                                        ? "#2196f3"
                                                        : "#ff9800"
                                            }
                                        }}
                                    />

                                    <Typography variant="body2" textAlign="center" mb={2}>
                                        অগ্রগতি: {report.progress}%
                                    </Typography>

                                    <TableContainer component={Paper} variant="outlined">
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>বিষয়</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>টার্গেট</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>রিপোর্ট</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>ভুল</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>হাদিস নম্বর / সূরার নাম</TableCell>
                                                    <TableCell align="center">{report.targets.hadith}</TableCell>
                                                    <TableCell align="center">{report.reports.hadith}</TableCell>
                                                    <TableCell align="center">{report.mistakes.hadith}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>দোয়ার নম্বর</TableCell>
                                                    <TableCell align="center">{report.targets.dua}</TableCell>
                                                    <TableCell align="center">{report.reports.dua}</TableCell>
                                                    <TableCell align="center">{report.mistakes.dua}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>তাজবীদের বিষয়</TableCell>
                                                    <TableCell align="center">{report.targets.tajweed}</TableCell>
                                                    <TableCell align="center">{report.reports.tajweed}</TableCell>
                                                    <TableCell align="center">{report.mistakes.tajweed}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>কায়েদা (পৃষ্ঠা)</TableCell>
                                                    <TableCell align="center">{report.targets.qaida}</TableCell>
                                                    <TableCell align="center">{report.reports.qaida}</TableCell>
                                                    <TableCell align="center">{report.mistakes.qaida}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {reports.length === 0 && (
                    <Paper elevation={4} sx={{ p: 5, mt: 3, textAlign: 'center' }}>
                        <Typography variant="h6" color="textSecondary">
                            কোন রিপোর্ট পাওয়া যায়নি। নতুন রিপোর্ট যোগ করুন।
                        </Typography>
                    </Paper>
                )}

                {/* Report Detail Dialog */}
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h5" component="div">
                                সাপ্তাহিক রিপোর্ট বিস্তারিত
                            </Typography>
                            <IconButton onClick={handleCloseDialog}>
                                <Close />
                            </IconButton>
                        </Box>
                    </DialogTitle>
                    <DialogContent dividers>
                        {selectedReport && (
                            <Box>
                                <Box display="flex" alignItems="center" mb={3}>
                                    <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2, width: 56, height: 56 }}>
                                        {selectedReport.name.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h5" fontWeight="bold">
                                            {selectedReport.name}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            তারিখ: {selectedReport.date.format('DD MMMM, YYYY')} | মাস: {selectedReport.month}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            রিপোর্টের ধরন: {selectedReport.reportType}
                                        </Typography>
                                        <Box mt={1}>
                                            {getStatusChip(selectedReport.status)}
                                        </Box>
                                    </Box>
                                </Box>

                                <LinearProgress
                                    variant="determinate"
                                    value={selectedReport.progress}
                                    sx={{
                                        height: 12,
                                        borderRadius: 5,
                                        mb: 3,
                                        backgroundColor: '#e0e0e0',
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: selectedReport.status === "completed"
                                                ? "#4caf50"
                                                : selectedReport.status === "in-progress"
                                                    ? "#2196f3"
                                                    : "#ff9800"
                                        }
                                    }}
                                />

                                <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1, color: 'primary.main' }}>
                                    সাপ্তাহিক টার্গেট এবং অর্জন
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Paper elevation={2} sx={{ p: 2, background: '#e8f5e9' }}>
                                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Assignment sx={{ mr: 1 }} /> এই সপ্তাহের টার্গেট
                                            </Typography>
                                            <List dense>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <Book color="primary" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="হাদিস / সূরা"
                                                        secondary={selectedReport.targets.hadith}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <RecordVoiceOver color="primary" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="দোয়া"
                                                        secondary={selectedReport.targets.dua}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <MenuBook color="primary" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="তাজবীদ"
                                                        secondary={selectedReport.targets.tajweed}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <Book color="primary" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="কায়েদা"
                                                        secondary={selectedReport.targets.qaida}
                                                    />
                                                </ListItem>
                                            </List>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Paper elevation={2} sx={{ p: 2, background: '#e3f2fd' }}>
                                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                                <CheckCircle sx={{ mr: 1 }} /> অর্জন
                                            </Typography>
                                            <List dense>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <Book color="secondary" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="হাদিস / সূরা"
                                                        secondary={selectedReport.reports.hadith}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <RecordVoiceOver color="secondary" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="দোয়া"
                                                        secondary={selectedReport.reports.dua}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <MenuBook color="secondary" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="তাজবীদ"
                                                        secondary={selectedReport.reports.tajweed}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <Book color="secondary" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="কায়েদা"
                                                        secondary={selectedReport.reports.qaida}
                                                    />
                                                </ListItem>
                                            </List>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 1, color: 'primary.main' }}>
                                    ভুল এবং উন্নয়নের প্রয়োজনীয় ক্ষেত্র
                                </Typography>

                                <Paper elevation={2} sx={{ p: 2, background: '#ffebee' }}>
                                    <List dense>
                                        <ListItem>
                                            <ListItemText
                                                primary="হাদিস / সূরায় ভুল"
                                                secondary={selectedReport.mistakes.hadith}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="দোয়ায় ভুল"
                                                secondary={selectedReport.mistakes.dua}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="তাজবীদে ভুল"
                                                secondary={selectedReport.mistakes.tajweed}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="কায়েদায় ভুল"
                                                secondary={selectedReport.mistakes.qaida}
                                            />
                                        </ListItem>
                                    </List>
                                </Paper>

                                <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 1, color: 'primary.main' }}>
                                    শিক্ষকের মন্তব্য
                                </Typography>

                                <Paper elevation={2} sx={{ p: 2, background: '#fff8e1' }}>
                                    <Typography variant="body1" paragraph>
                                        {selectedReport.teacherComments}
                                    </Typography>
                                </Paper>

                                <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 1, color: 'primary.main' }}>
                                    পরবর্তী সপ্তাহের টার্গেট
                                </Typography>

                                <Paper elevation={2} sx={{ p: 2, background: '#e8f5e9' }}>
                                    <Typography variant="body1">
                                        {selectedReport.nextWeekTarget}
                                    </Typography>
                                </Paper>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            বন্ধ করুন
                        </Button>
                        <Button variant="contained" color="primary">
                            প্রিন্ট করুন
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </LocalizationProvider>
    );
}