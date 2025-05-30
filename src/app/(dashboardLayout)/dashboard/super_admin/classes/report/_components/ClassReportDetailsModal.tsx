/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
    Divider,
    Box,
    Avatar,
    useTheme,
    Paper,
    alpha,
    Chip
} from "@mui/material";
import {
    School as SchoolIcon,
    Person as PersonIcon,
    Assignment as AssignmentIcon,
    EditNote as EditNoteIcon,
    Today as TodayIcon,
    CheckCircle as CheckCircleIcon,
    WatchLater as WatchLaterIcon,
    Comment as CommentIcon,
    Class as ClassIcon,
    Subject as SubjectIcon
} from "@mui/icons-material";
import React from "react";

interface ClassReportDetailsModalProps {
    open: boolean;
    onClose: () => void;
    data: {
        reportData: any;
        studentEvaluation: any;
    };
}

const ClassReportDetailsModal = ({ open, onClose, data }: ClassReportDetailsModalProps) => {
    const theme = useTheme();
    const { reportData, studentEvaluation } = data || {};
    const student = studentEvaluation?.studentId || {};

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString("en-GB", {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return "Invalid Date";
        }
    };

    if (!reportData || !studentEvaluation) return null;

    const statusColors = {
        present: theme.palette.success.main,
        absent: theme.palette.error.main,
        partial: theme.palette.warning.main
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    background: alpha(theme.palette.background.paper, 0.95),
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    boxShadow: theme.shadows[10]
                },
            }}
        >
            {/* Clean Header */}
            <DialogTitle sx={{
                py: 3,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                background: alpha(theme.palette.background.paper, 0.7)
            }}>
                <Box display="flex" alignItems="center" gap={2}>
                    <SchoolIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                    <Box>
                        <Typography variant="h6" fontWeight={700}>
                            Student Evaluation
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {reportData.classes} • {reportData.subjects}
                        </Typography>
                    </Box>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ py: 4 }}>
                {/* Student Identity Section */}
                <Box mb={4} textAlign="center">
                    <Avatar
                        sx={{
                            width: 72,
                            height: 72,
                            mb: 2,
                            mx: 'auto',
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            fontSize: 32
                        }}
                    >
                        {student.name?.[0] || <PersonIcon />}
                    </Avatar>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                        {student.name || "Student Name"}
                    </Typography>
                    <Chip 
                        label={`ID: ${student.studentId || "N/A"}`} 
                        size="small" 
                        sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                    />
                </Box>

                {/* Key Metrics Grid */}
                <Grid container spacing={3} mb={4}>
                    <Grid item xs={6} md={3}>
                        <MetricCard
                            icon={<TodayIcon />}
                            label="Date"
                            value={formatDate(reportData.date)}
                   color={theme.palette.primary.main}
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <MetricCard
                            icon={<WatchLaterIcon />}
                            label="Hour"
                            value={reportData.hour}
                              color={theme.palette.secondary.main}
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <MetricCard
                            icon={<CheckCircleIcon />}
                            label="Attendance"
                            value={studentEvaluation.attendance}
                            color={
                                studentEvaluation.attendance === "উপস্থিত" ? 
                                statusColors.present : statusColors.absent
                            }
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <MetricCard
                            icon={<EditNoteIcon />}
                            label="Signature"
                            value={studentEvaluation.parentSignature ? "Received" : "Pending"}
                            color={studentEvaluation.parentSignature ? statusColors.present : statusColors.absent}
                        />
                    </Grid>
                </Grid>

                {/* Detailed Sections */}
                <Grid container spacing={3}>
                    {/* Academic Performance */}
                    <Grid item xs={12} md={6}>
                        <SectionCard
                            icon={<AssignmentIcon />}
                            title="Academic Evaluation"
                        >
                            <DetailItem
                                label="Lesson Progress"
                                value={studentEvaluation.lessonEvaluation}
                                statusColor={
                                    studentEvaluation.lessonEvaluation === "পড়া শিখেছে" ? 
                                    statusColors.present :
                                    studentEvaluation.lessonEvaluation === "আংশিক শিখেছে" ?
                                    statusColors.partial : statusColors.absent
                                }
                            />
                            <DetailItem
                                label="Handwriting"
                                value={studentEvaluation.handwriting}
                                statusColor={
                                    studentEvaluation.handwriting === "লিখেছে" ? 
                                    statusColors.present :
                                    studentEvaluation.handwriting === "আংশিক লিখেছে" ?
                                    statusColors.partial : statusColors.absent
                                }
                            />
                        </SectionCard>
                    </Grid>

                    {/* Additional Information */}
                    <Grid item xs={12} md={6}>
                        <SectionCard
                            icon={<CommentIcon />}
                            title="Comments & Notes"
                        >
                            <Paper elevation={0} sx={{
                                p: 2,
                                borderRadius: 2,
                                bgcolor: 'background.default',
                                minHeight: 120
                            }}>
                                <Typography variant="body2">
                                    {studentEvaluation.comments || "No additional comments provided"}
                                </Typography>
                            </Paper>
                        </SectionCard>
                    </Grid>
                </Grid>

                {/* Curriculum Section */}
                {(reportData.todayLesson || reportData.homeTask) && (
                    <Box mt={4}>
                        <SectionCard
                            icon={<SchoolIcon />}
                            title="Class Curriculum"
                            fullWidth
                        >
                            <Grid container spacing={3}>
                                {reportData.todayLesson && (
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Today's Lesson
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {reportData.todayLesson.lessonContent}
                                        </Typography>
                                    </Grid>
                                )}
                                {reportData.homeTask && (
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Homework Assignment
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {reportData.homeTask.content}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </SectionCard>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 4, py: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        px: 4,
                        textTransform: 'none',
                        '&:hover': {
                            bgcolor: 'action.hover'
                        }
                    }}
                >
                    Close Report
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// Reusable Components
const MetricCard = ({ icon, label, value, color }: any) => (
    <Paper elevation={0} sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: alpha(color, 0.1),
        border: `1px solid ${alpha(color, 0.2)}`,
        textAlign: 'center'
    }}>
        <Box color={color} mb={1}>{React.cloneElement(icon, { fontSize: 'large' })}</Box>
        <Typography variant="subtitle2" gutterBottom>{label}</Typography>
        <Typography variant="body1" fontWeight={600} color={color}>
            {value}
        </Typography>
    </Paper>
);

const SectionCard = ({ icon, title, children, fullWidth }: any) => (
    <Paper elevation={0} sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: 'background.paper',
        width: fullWidth ? '100%' : 'auto'
    }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
            {React.cloneElement(icon, { color: 'primary' })}
            <Typography variant="subtitle1" fontWeight={600}>{title}</Typography>
        </Box>
        {children}
    </Paper>
);

const DetailItem = ({ label, value, statusColor }: any) => (
    <Box mb={2}>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Typography 
            variant="body2" 
            sx={{
                fontWeight: 500,
                color: statusColor,
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}
        >
            <Box 
                component="span" 
                sx={{
                    width: 8,
                    height: 8,
                    bgcolor: statusColor,
                    borderRadius: '50%'
                }} 
            />
            {value}
        </Typography>
    </Box>
);

export default ClassReportDetailsModal;