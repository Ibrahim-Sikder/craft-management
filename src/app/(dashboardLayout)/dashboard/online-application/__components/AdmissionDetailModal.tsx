/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { JSX } from "react";
import {
    Close,
    Print,
    Person,
    School,
    FamilyRestroom,
    Home,
    Description,
    CalendarToday,
    Bloodtype,
    Flag,
    Fingerprint,
    LocalPhone,
    WhatsApp as WhatsAppIcon,
    Male,
    Female,
    Wc,
    Timeline,
    CheckCircleOutline,
    CancelOutlined,
    Map,
} from "@mui/icons-material";
import {
    Box,
    Chip,
    Avatar,
    Typography,
    useTheme,
    useMediaQuery,
    Grid,
    Divider,
    IconButton,
    Card,
    CardContent,
    CardHeader,
    alpha,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Skeleton,
    Stack,
    Paper,
} from "@mui/material";
import { format } from "date-fns";
import { bn } from "date-fns/locale";

// Transition for modal
const Transition = React.forwardRef(function Transition(props: any, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Status chip component
const StatusChip = ({ status }: { status: string }) => {
    const statusConfig: Record<
        string,
        {
            color: "success" | "warning" | "error" | "info" | "default";
            icon: JSX.Element;
            label: string;
        }
    > = {
        pending: {
            color: "warning",
            icon: <span>⏳</span>,
            label: "বিচারাধীন",
        },
        approved: {
            color: "success",
            icon: <span>✓</span>,
            label: "অনুমোদিত",
        },
        rejected: {
            color: "error",
            icon: <span>✗</span>,
            label: "বাতিল",
        },
        enrolled: {
            color: "info",
            icon: <span>📚</span>,
            label: "ভর্তিকৃত",
        },
    };

    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;

    return (
        <Chip
            label={config.label}
            color={config.color}
            size="small"
            sx={{
                fontWeight: 600,
                borderRadius: "8px",
                minWidth: { xs: 80, sm: 100 },
            }}
        />
    );
};

// Department chip
const DepartmentChip = ({ department }: { department: string }) => {
    const departmentColors: Record<string, string> = {
        hifz: "#8B5CF6",
        academic: "#3B82F6",
        nazera: "#10B981",
        tajbid: "#F59E0B",
    };

    const departmentLabels: Record<string, string> = {
        hifz: "হিফজ",
        academic: "একাডেমিক",
        nazera: "নাজেরা",
        tajbid: "তাজবীদ",
    };

    return (
        <Chip
            label={departmentLabels[department] || department}
            size="small"
            sx={{
                backgroundColor: `${departmentColors[department] || "#6B7280"}20`,
                color: departmentColors[department] || "#6B7280",
                fontWeight: 600,
                borderRadius: "8px",
                border: `1px solid ${departmentColors[department] || "#6B7280"}30`,
            }}
        />
    );
};

// Gender icon component
const GenderIcon = ({ gender }: { gender: string }) => {
    switch (gender?.toLowerCase()) {
        case "male":
            return <Male sx={{ color: "#3B82F6" }} />;
        case "female":
            return <Female sx={{ color: "#EC4899" }} />;
        default:
            return <Wc sx={{ color: "#8B5CF6" }} />;
    }
};

// Date formatter
const formatDate = (date: string | Date) => {
    try {
        return format(new Date(date), "dd MMM yyyy", { locale: bn });
    } catch {
        return "Invalid date";
    }
};

// Info Row Component for better readability
const InfoRow = ({
    label,
    value,
    icon,
}: {
    label: string;
    value: any;
    icon?: React.ReactNode;
}) => (
    <TableRow>
        <TableCell sx={{ border: "none", fontWeight: "bold", width: "40%", py: 1 }}>
            {label}
        </TableCell>
        <TableCell sx={{ border: "none", py: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {icon}
                <Typography variant="body2">{value || "N/A"}</Typography>
            </Box>
        </TableCell>
    </TableRow>
);

// Document Item Component
const DocumentItem = ({ label, value }: { label: string; value: boolean }) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 1,
            borderRadius: 2,
            bgcolor: value
                ? (theme) => alpha(theme.palette.success.main, 0.1)
                : (theme) => alpha(theme.palette.error.main, 0.1),
        }}
    >
        {value ? (
            <CheckCircleOutline color="success" fontSize="small" />
        ) : (
            <CancelOutlined color="error" fontSize="small" />
        )}
        <Typography variant="body2">{label}</Typography>
    </Box>
);

// Main Modal Component
interface AdmissionDetailModalProps {
    open: boolean;
    onClose: () => void;
    application: any;
    loading?: boolean;
}

export const AdmissionDetailModal = ({
    open,
    onClose,
    application,
    loading,
}: AdmissionDetailModalProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    if (loading) {
        return <h2>Loading.........</h2>;
    }

    if (!application) return null;

    const studentInfo = application.studentInfo || {};
    const parentInfo = application.parentInfo || {};
    const academicInfo = application.academicInfo || {};
    const address = application.address || {};
    const documents = application.documents || {};
    const familyEnvironment = application.familyEnvironment || {};
    const behaviorSkills = application.behaviorSkills || {};

    const documentList = [
        { key: "photographs", label: "ছবি", value: documents.photographs },
        {
            key: "birthCertificate",
            label: "জন্ম নিবন্ধন সনদ",
            value: documents.birthCertificate,
        },
        { key: "markSheet", label: "মার্কশিট", value: documents.markSheet },
        {
            key: "transferCertificate",
            label: "ট্রান্সফার সার্টিফিকেট",
            value: documents.transferCertificate,
        },
        {
            key: "characterCertificate",
            label: "চরিত্র সনদপত্র",
            value: documents.characterCertificate,
        },
    ];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            fullScreen={isMobile}
            TransitionComponent={Transition}
            PaperProps={{
                sx: {
                    borderRadius: isMobile ? 0 : 4,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
                },
            }}
        >
            <DialogTitle
                sx={{
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar
                            src={studentInfo.studentPhoto}
                            sx={{
                                width: { xs: 48, sm: 56 },
                                height: { xs: 48, sm: 56 },
                                border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                boxShadow: theme.shadows[3],
                            }}
                        >
                            {studentInfo.nameBangla?.charAt(0) || "S"}
                        </Avatar>
                        <Box>
                            <Typography
                                variant={isMobile ? "h6" : "h5"}
                                fontWeight="bold"
                                sx={{
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {studentInfo.nameBangla || studentInfo.nameEnglish}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Application ID:{" "}
                                {application.applicationId ||
                                    application._id?.slice(-6).toUpperCase()}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <StatusChip status={application.status} />
                        <IconButton
                            onClick={onClose}
                            sx={{
                                bgcolor: alpha(theme.palette.error.main, 0.1),
                                "&:hover": { bgcolor: alpha(theme.palette.error.main, 0.2) },
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Box>
                </Box>
            </DialogTitle>

            <DialogContent dividers sx={{ p: isMobile ? 2 : 3 }}>
                <Grid container spacing={3}>
                    {/* Personal Information */}
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: 3,
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                height: "100%",
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        <Person />
                                    </Avatar>
                                }
                                title="ব্যক্তিগত তথ্য"
                                titleTypographyProps={{
                                    fontWeight: "bold",
                                    variant: isMobile ? "subtitle1" : "h6",
                                }}
                            />
                            <Divider />
                            <CardContent>
                                <TableContainer
                                    component={Paper}
                                    elevation={0}
                                    sx={{ bgcolor: "transparent" }}
                                >
                                    <Table size="small">
                                        <TableBody>
                                            <InfoRow
                                                label="নাম (বাংলা)"
                                                value={studentInfo.nameBangla}
                                            />
                                            <InfoRow
                                                label="নাম (ইংরেজি)"
                                                value={studentInfo.nameEnglish}
                                            />
                                            <InfoRow
                                                label="জন্ম তারিখ"
                                                value={formatDate(studentInfo.dateOfBirth)}
                                                icon={
                                                    <CalendarToday
                                                        fontSize="small"
                                                        sx={{ color: theme.palette.primary.main }}
                                                    />
                                                }
                                            />
                                            <InfoRow
                                                label="বয়স"
                                                value={
                                                    studentInfo.age || studentInfo.Age
                                                        ? `${studentInfo.age || studentInfo.Age} বছর`
                                                        : "N/A"
                                                }
                                            />
                                            <InfoRow
                                                label="লিঙ্গ"
                                                value={studentInfo.gender}
                                                icon={<GenderIcon gender={studentInfo.gender} />}
                                            />
                                            <InfoRow
                                                label="রক্তের গ্রুপ"
                                                value={studentInfo.bloodGroup}
                                                icon={
                                                    <Bloodtype
                                                        fontSize="small"
                                                        sx={{ color: theme.palette.error.main }}
                                                    />
                                                }
                                            />
                                            <InfoRow
                                                label="জাতীয়তা"
                                                value={studentInfo.nationality || "Bangladeshi"}
                                                icon={
                                                    <Flag
                                                        fontSize="small"
                                                        sx={{ color: theme.palette.success.main }}
                                                    />
                                                }
                                            />
                                            <InfoRow
                                                label="এনআইডি/জন্ম নিবন্ধন"
                                                value={studentInfo.nidBirth}
                                                icon={
                                                    <Fingerprint
                                                        fontSize="small"
                                                        sx={{ color: theme.palette.info.main }}
                                                    />
                                                }
                                            />
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Academic Information */}
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: 3,
                                border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                                height: "100%",
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha(theme.palette.success.main, 0.1),
                                            color: theme.palette.success.main,
                                        }}
                                    >
                                        <School />
                                    </Avatar>
                                }
                                title="একাডেমিক তথ্য"
                                titleTypographyProps={{
                                    fontWeight: "bold",
                                    variant: isMobile ? "subtitle1" : "h6",
                                }}
                            />
                            <Divider />
                            <CardContent>
                                <TableContainer
                                    component={Paper}
                                    elevation={0}
                                    sx={{ bgcolor: "transparent" }}
                                >
                                    <Table size="small">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell
                                                    sx={{
                                                        border: "none",
                                                        fontWeight: "bold",
                                                        width: "40%",
                                                        py: 1,
                                                    }}
                                                >
                                                    বিভাগ
                                                </TableCell>
                                                <TableCell sx={{ border: "none", py: 1 }}>
                                                    <DepartmentChip
                                                        department={studentInfo.studentDepartment}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    sx={{ border: "none", fontWeight: "bold", py: 1 }}
                                                >
                                                    শ্রেণি
                                                </TableCell>
                                                <TableCell sx={{ border: "none", py: 1 }}>
                                                    <Chip
                                                        label={
                                                            studentInfo.Class || studentInfo.class || "N/A"
                                                        }
                                                        size="small"
                                                        sx={{ fontWeight: 600 }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <InfoRow
                                                label="সেশন"
                                                value={application.academicYear || studentInfo.session}
                                            />
                                            <InfoRow
                                                label="পূর্ববর্তী প্রতিষ্ঠান"
                                                value={
                                                    academicInfo.PrevSchool || academicInfo.prevSchool
                                                }
                                            />
                                            <InfoRow
                                                label="পূর্ববর্তী শ্রেণি"
                                                value={academicInfo.PrevClass || academicInfo.prevClass}
                                            />
                                            <TableRow>
                                                <TableCell
                                                    sx={{ border: "none", fontWeight: "bold", py: 1 }}
                                                >
                                                    সর্বশেষ জিপিএ
                                                </TableCell>
                                                <TableCell sx={{ border: "none", py: 1 }}>
                                                    <Chip
                                                        label={
                                                            academicInfo.GPA || academicInfo.gpa || "N/A"
                                                        }
                                                        size="small"
                                                        color="success"
                                                        variant="outlined"
                                                        sx={{ fontWeight: 600 }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Father's Information */}
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: 3,
                                border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha(theme.palette.info.main, 0.1),
                                            color: theme.palette.info.main,
                                        }}
                                    >
                                        <FamilyRestroom />
                                    </Avatar>
                                }
                                title="পিতার তথ্য"
                                titleTypographyProps={{
                                    fontWeight: "bold",
                                    variant: isMobile ? "subtitle1" : "h6",
                                }}
                            />
                            <Divider />
                            <CardContent>
                                <TableContainer
                                    component={Paper}
                                    elevation={0}
                                    sx={{ bgcolor: "transparent" }}
                                >
                                    <Table size="small">
                                        <TableBody>
                                            <InfoRow
                                                label="নাম (বাংলা)"
                                                value={
                                                    parentInfo.father?.nameBangla ||
                                                    parentInfo.FatherNameBangla
                                                }
                                            />
                                            <InfoRow
                                                label="নাম (ইংরেজি)"
                                                value={
                                                    parentInfo.father?.nameEnglish ||
                                                    parentInfo.FatherName
                                                }
                                            />
                                            <InfoRow
                                                label="পেশা"
                                                value={
                                                    parentInfo.father?.profession || parentInfo.FatherJob
                                                }
                                            />
                                            <InfoRow
                                                label="শিক্ষাগত যোগ্যতা"
                                                value={
                                                    parentInfo.father?.education || parentInfo.FatherEdu
                                                }
                                            />
                                            <InfoRow
                                                label="মোবাইল"
                                                value={
                                                    parentInfo.father?.mobile || parentInfo.FatherMobile
                                                }
                                                icon={
                                                    <LocalPhone
                                                        fontSize="small"
                                                        sx={{ color: theme.palette.success.main }}
                                                    />
                                                }
                                            />
                                            <InfoRow
                                                label="WhatsApp"
                                                value={
                                                    parentInfo.father?.whatsapp ||
                                                    parentInfo.FatherWhatsapp
                                                }
                                                icon={
                                                    <WhatsAppIcon
                                                        fontSize="small"
                                                        sx={{ color: "#25D366" }}
                                                    />
                                                }
                                            />
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Mother's Information */}
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: 3,
                                border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                            color: theme.palette.secondary.main,
                                        }}
                                    >
                                        <FamilyRestroom />
                                    </Avatar>
                                }
                                title="মাতার তথ্য"
                                titleTypographyProps={{
                                    fontWeight: "bold",
                                    variant: isMobile ? "subtitle1" : "h6",
                                }}
                            />
                            <Divider />
                            <CardContent>
                                <TableContainer
                                    component={Paper}
                                    elevation={0}
                                    sx={{ bgcolor: "transparent" }}
                                >
                                    <Table size="small">
                                        <TableBody>
                                            <InfoRow
                                                label="নাম (বাংলা)"
                                                value={
                                                    parentInfo.mother?.nameBangla ||
                                                    parentInfo.MotherNameBangla
                                                }
                                            />
                                            <InfoRow
                                                label="নাম (ইংরেজি)"
                                                value={
                                                    parentInfo.mother?.nameEnglish ||
                                                    parentInfo.MotherName
                                                }
                                            />
                                            <InfoRow
                                                label="পেশা"
                                                value={
                                                    parentInfo.mother?.profession || parentInfo.MotherJob
                                                }
                                            />
                                            <InfoRow
                                                label="শিক্ষাগত যোগ্যতা"
                                                value={
                                                    parentInfo.mother?.education || parentInfo.MotherEdu
                                                }
                                            />
                                            <InfoRow
                                                label="মোবাইল"
                                                value={
                                                    parentInfo.mother?.mobile || parentInfo.MotherMobile
                                                }
                                                icon={
                                                    <LocalPhone
                                                        fontSize="small"
                                                        sx={{ color: theme.palette.success.main }}
                                                    />
                                                }
                                            />
                                            <InfoRow
                                                label="WhatsApp"
                                                value={
                                                    parentInfo.mother?.whatsapp ||
                                                    parentInfo.MotherWhatsapp
                                                }
                                                icon={
                                                    <WhatsAppIcon
                                                        fontSize="small"
                                                        sx={{ color: "#25D366" }}
                                                    />
                                                }
                                            />
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Guardian Information (if available) */}
                    {parentInfo.guardian &&
                        Object.values(parentInfo.guardian).some((v) => v) && (
                            <Grid item xs={12}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        borderRadius: 3,
                                        border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                                    }}
                                >
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                sx={{
                                                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                                                    color: theme.palette.warning.main,
                                                }}
                                            >
                                                <FamilyRestroom />
                                            </Avatar>
                                        }
                                        title="অভিভাবকের তথ্য"
                                        titleTypographyProps={{
                                            fontWeight: "bold",
                                            variant: isMobile ? "subtitle1" : "h6",
                                        }}
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <Typography variant="caption" color="text.secondary">
                                                    নাম (বাংলা)
                                                </Typography>
                                                <Typography variant="body2">
                                                    {parentInfo.guardian.nameBangla ||
                                                        parentInfo.guardianNameBangla ||
                                                        "N/A"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <Typography variant="caption" color="text.secondary">
                                                    নাম (ইংরেজি)
                                                </Typography>
                                                <Typography variant="body2">
                                                    {parentInfo.guardian.nameEnglish ||
                                                        parentInfo.guardianName ||
                                                        "N/A"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={2}>
                                                <Typography variant="caption" color="text.secondary">
                                                    সম্পর্ক
                                                </Typography>
                                                <Typography variant="body2">
                                                    {parentInfo.guardian.relation ||
                                                        parentInfo.guardianRelation ||
                                                        "N/A"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={2}>
                                                <Typography variant="caption" color="text.secondary">
                                                    মোবাইল
                                                </Typography>
                                                <Typography variant="body2">
                                                    {parentInfo.guardian.mobile ||
                                                        parentInfo.guardianMobile ||
                                                        "N/A"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={2}>
                                                <Typography variant="caption" color="text.secondary">
                                                    পেশা
                                                </Typography>
                                                <Typography variant="body2">
                                                    {parentInfo.guardian.profession ||
                                                        parentInfo.guardianJob ||
                                                        "N/A"}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}

                    {/* Address Information */}
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: 3,
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        <Home />
                                    </Avatar>
                                }
                                title="বর্তমান ঠিকানা"
                                titleTypographyProps={{
                                    fontWeight: "bold",
                                    variant: isMobile ? "subtitle1" : "h6",
                                }}
                            />
                            <Divider />
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                    <Map color="primary" fontSize="small" sx={{ mt: 0.5 }} />
                                    <Box>
                                        <Typography variant="body2">
                                            {address.present?.village || address.village || "N/A"},
                                            <br />
                                            {address.present?.postOffice ||
                                                address.postOffice ||
                                                "N/A"}
                                            {address.present?.postCode || address.postCode
                                                ? `- ${address.present?.postCode || address.postCode}`
                                                : ""}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            থানা:{" "}
                                            {address.present?.policeStation ||
                                                address.policeStation ||
                                                "N/A"}
                                            <br />
                                            জেলা:{" "}
                                            {address.present?.district || address.district || "N/A"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Permanent Address */}
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: 3,
                                border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha(theme.palette.info.main, 0.1),
                                            color: theme.palette.info.main,
                                        }}
                                    >
                                        <Home />
                                    </Avatar>
                                }
                                title="স্থায়ী ঠিকানা"
                                titleTypographyProps={{
                                    fontWeight: "bold",
                                    variant: isMobile ? "subtitle1" : "h6",
                                }}
                            />
                            <Divider />
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                    <Map color="info" fontSize="small" sx={{ mt: 0.5 }} />
                                    <Box>
                                        <Typography variant="body2">
                                            {address.permanent?.village ||
                                                address.permVillage ||
                                                "N/A"}
                                            ,<br />
                                            {address.permanent?.postOffice ||
                                                address.permPostOffice ||
                                                "N/A"}
                                            {address.permanent?.postCode || address.permPostCode
                                                ? `- ${address.permanent?.postCode || address.permPostCode}`
                                                : ""}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            থানা:{" "}
                                            {address.permanent?.policeStation ||
                                                address.permPoliceStation ||
                                                "N/A"}
                                            <br />
                                            জেলা:{" "}
                                            {address.permanent?.district ||
                                                address.permDistrict ||
                                                "N/A"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Family Environment */}
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: 3,
                                border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha(theme.palette.warning.main, 0.1),
                                            color: theme.palette.warning.main,
                                        }}
                                    >
                                        <Home />
                                    </Avatar>
                                }
                                title="পারিবারিক পরিবেশ"
                                titleTypographyProps={{
                                    fontWeight: "bold",
                                    variant: isMobile ? "subtitle1" : "h6",
                                }}
                            />
                            <Divider />
                            <CardContent>
                                <TableContainer
                                    component={Paper}
                                    elevation={0}
                                    sx={{ bgcolor: "transparent" }}
                                >
                                    <Table size="small">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell
                                                    sx={{ border: "none", fontWeight: "bold", py: 1 }}
                                                >
                                                    হালাল উপার্জন
                                                </TableCell>
                                                <TableCell sx={{ border: "none", py: 1 }}>
                                                    {familyEnvironment.halalIncome === "Yes" ? (
                                                        <Chip label="হ্যাঁ" color="success" size="small" />
                                                    ) : (
                                                        <Chip label="না" color="error" size="small" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    sx={{ border: "none", fontWeight: "bold", py: 1 }}
                                                >
                                                    পিতা-মাতার নামাজ
                                                </TableCell>
                                                <TableCell sx={{ border: "none", py: 1 }}>
                                                    {familyEnvironment.parentsPrayer === "Yes" ? (
                                                        <Chip label="হ্যাঁ" color="success" size="small" />
                                                    ) : (
                                                        <Chip label="না" color="error" size="small" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    sx={{ border: "none", fontWeight: "bold", py: 1 }}
                                                >
                                                    মাদক/নেশা
                                                </TableCell>
                                                <TableCell sx={{ border: "none", py: 1 }}>
                                                    {familyEnvironment.addiction === "No" ? (
                                                        <Chip label="না" color="success" size="small" />
                                                    ) : (
                                                        <Chip label="হ্যাঁ" color="error" size="small" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    sx={{ border: "none", fontWeight: "bold", py: 1 }}
                                                >
                                                    টেলিভিশন
                                                </TableCell>
                                                <TableCell sx={{ border: "none", py: 1 }}>
                                                    {familyEnvironment.tv === "Yes" ? (
                                                        <Chip label="হ্যাঁ" color="warning" size="small" />
                                                    ) : (
                                                        <Chip label="না" color="info" size="small" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    sx={{ border: "none", fontWeight: "bold", py: 1 }}
                                                >
                                                    কুরআন তিলাওয়াত
                                                </TableCell>
                                                <TableCell sx={{ border: "none", py: 1 }}>
                                                    <Chip
                                                        label={
                                                            familyEnvironment.quranRecitation === "Yes"
                                                                ? "হ্যাঁ"
                                                                : familyEnvironment.quranRecitation ===
                                                                    "Sometimes"
                                                                    ? "মাঝেমাঝে"
                                                                    : "না"
                                                        }
                                                        color={
                                                            familyEnvironment.quranRecitation === "Yes"
                                                                ? "success"
                                                                : familyEnvironment.quranRecitation ===
                                                                    "Sometimes"
                                                                    ? "warning"
                                                                    : "error"
                                                        }
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    sx={{ border: "none", fontWeight: "bold", py: 1 }}
                                                >
                                                    পর্দা পালন
                                                </TableCell>
                                                <TableCell sx={{ border: "none", py: 1 }}>
                                                    <Chip
                                                        label={
                                                            familyEnvironment.purdah === "Yes"
                                                                ? "হ্যাঁ"
                                                                : familyEnvironment.purdah === "Trying"
                                                                    ? "চেষ্টা করা হয়"
                                                                    : "না"
                                                        }
                                                        color={
                                                            familyEnvironment.purdah === "Yes"
                                                                ? "success"
                                                                : familyEnvironment.purdah === "Trying"
                                                                    ? "warning"
                                                                    : "error"
                                                        }
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Behavior & Skills */}
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: 3,
                                border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha(theme.palette.error.main, 0.1),
                                            color: theme.palette.error.main,
                                        }}
                                    >
                                        <Timeline />
                                    </Avatar>
                                }
                                title="আচরণ ও দক্ষতা"
                                titleTypographyProps={{
                                    fontWeight: "bold",
                                    variant: isMobile ? "subtitle1" : "h6",
                                }}
                            />
                            <Divider />
                            <CardContent>
                                <TableContainer
                                    component={Paper}
                                    elevation={0}
                                    sx={{ bgcolor: "transparent" }}
                                >
                                    <Table size="small">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell
                                                    sx={{ border: "none", fontWeight: "bold", py: 1 }}
                                                >
                                                    মোবাইল ব্যবহার
                                                </TableCell>
                                                <TableCell sx={{ border: "none", py: 1 }}>
                                                    <Chip
                                                        label={behaviorSkills.mobileUsage || "N/A"}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    sx={{ border: "none", fontWeight: "bold", py: 1 }}
                                                >
                                                    সাধারণ আচরণ
                                                </TableCell>
                                                <TableCell sx={{ border: "none", py: 1 }}>
                                                    <Chip
                                                        label={
                                                            behaviorSkills.generalBehavior === "Very Good"
                                                                ? "অনেক ভালো"
                                                                : behaviorSkills.generalBehavior === "Good"
                                                                    ? "মোটামুটি"
                                                                    : "ভাল নয়"
                                                        }
                                                        color={
                                                            behaviorSkills.generalBehavior === "Very Good"
                                                                ? "success"
                                                                : behaviorSkills.generalBehavior === "Good"
                                                                    ? "info"
                                                                    : "warning"
                                                        }
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    sx={{ border: "none", fontWeight: "bold", py: 1 }}
                                                >
                                                    পড়ালেখায় আগ্রহ
                                                </TableCell>
                                                <TableCell sx={{ border: "none", py: 1 }}>
                                                    <Chip
                                                        label={
                                                            behaviorSkills.studyInterest === "Very Interested"
                                                                ? "খুব আগ্রহী"
                                                                : behaviorSkills.studyInterest === "Moderate"
                                                                    ? "মোটামুটি"
                                                                    : "কম আগ্রহী"
                                                        }
                                                        color={
                                                            behaviorSkills.studyInterest === "Very Interested"
                                                                ? "success"
                                                                : behaviorSkills.studyInterest === "Moderate"
                                                                    ? "info"
                                                                    : "warning"
                                                        }
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    sx={{ border: "none", fontWeight: "bold", py: 1 }}
                                                >
                                                    ধর্মীয় কাজে আগ্রহ
                                                </TableCell>
                                                <TableCell sx={{ border: "none", py: 1 }}>
                                                    <Chip
                                                        label={
                                                            behaviorSkills.religiousInterest ===
                                                                "Very Interested"
                                                                ? "খুব আগ্রহী"
                                                                : behaviorSkills.religiousInterest ===
                                                                    "Moderate"
                                                                    ? "মোটামুটি"
                                                                    : "কম আগ্রহী"
                                                        }
                                                        color={
                                                            behaviorSkills.religiousInterest ===
                                                                "Very Interested"
                                                                ? "success"
                                                                : behaviorSkills.religiousInterest ===
                                                                    "Moderate"
                                                                    ? "info"
                                                                    : "warning"
                                                        }
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    sx={{ border: "none", fontWeight: "bold", py: 1 }}
                                                >
                                                    রাগ নিয়ন্ত্রণ
                                                </TableCell>
                                                <TableCell sx={{ border: "none", py: 1 }}>
                                                    <Chip
                                                        label={
                                                            behaviorSkills.angerControl === "Excellent"
                                                                ? "মোটামুটি"
                                                                : behaviorSkills.angerControl === "Good"
                                                                    ? "ভাল"
                                                                    : "উন্নতি প্রয়োজন"
                                                        }
                                                        color={
                                                            behaviorSkills.angerControl === "Excellent"
                                                                ? "info"
                                                                : behaviorSkills.angerControl === "Good"
                                                                    ? "success"
                                                                    : "warning"
                                                        }
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Documents */}
                    <Grid item xs={12}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: 3,
                                border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha(theme.palette.success.main, 0.1),
                                            color: theme.palette.success.main,
                                        }}
                                    >
                                        <Description />
                                    </Avatar>
                                }
                                title="প্রদত্ত ডকুমেন্টসমূহ"
                                titleTypographyProps={{
                                    fontWeight: "bold",
                                    variant: isMobile ? "subtitle1" : "h6",
                                }}
                                action={
                                    <Chip
                                        label={`${documentList.filter((d) => d.value).length}/${documentList.length} সম্পন্ন`}
                                        color={
                                            documentList.filter((d) => d.value).length ===
                                                documentList.length
                                                ? "success"
                                                : "warning"
                                        }
                                        size="small"
                                    />
                                }
                            />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={2}>
                                    {documentList.map((doc, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <DocumentItem label={doc.label} value={doc.value} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Terms & Conditions */}
                    {application.termsAccepted && (
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: alpha(theme.palette.success.main, 0.1),
                                    borderRadius: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <CheckCircleOutline color="success" />
                                <Typography variant="body2">
                                    শর্তাবলী গ্রহণ করা হয়েছে
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </DialogContent>

            <DialogActions
                sx={{
                    p: 2,
                    borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    gap: 1,
                    flexWrap: "wrap",
                }}
            >
                <Button
                    variant="outlined"
                    onClick={onClose}
                    startIcon={<Close />}
                    size={isMobile ? "small" : "medium"}
                >
                    বন্ধ করুন
                </Button>
                <Button
                    variant="contained"
                    onClick={() =>
                        window.open(`/admissions/${application._id}/print`, "_blank")
                    }
                    startIcon={<Print />}
                    size={isMobile ? "small" : "medium"}
                >
                    প্রিন্ট
                </Button>
            </DialogActions>
        </Dialog>
    );
};
