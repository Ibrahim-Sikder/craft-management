/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
    Card,
    CardContent,
    TextField,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Fab,
    Tabs,
    Tab,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider,
    useTheme,
    useMediaQuery,
    Stepper,
    Step,
    StepLabel,
    LinearProgress,
    Drawer,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Badge,
    CardHeader,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Rating,
    Tooltip,
} from "@mui/material"
import {
    Add as AddIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    Print as PrintIcon,
    Download as DownloadIcon,
    Share as ShareIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    CalendarMonth as CalendarIcon,
    Person as PersonIcon,
    ExpandMore as ExpandMoreIcon,
    Notifications as NotificationsIcon,
    Dashboard as DashboardIcon,
    Assignment as AssignmentIcon,
    Analytics as AnalyticsIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Menu as MenuIcon,
    CheckCircle as CheckCircleIcon,
    Pending as PendingIcon,
    Schedule as ScheduleIcon,
    TrendingUp as TrendingUpIcon,
    Star as StarIcon,
    EmojiEvents as EmojiEventsIcon,
} from "@mui/icons-material"

interface QaidaReport {
    id: string
    studentName: string
    month: string
    reportDate: string
    weeklyTarget: string
    status: "completed" | "pending" | "in-progress"
    progress: number
    studentAge: number
    teacher: string
    performance: number
    lastUpdated: string
}

interface DailyEntry {
    hadithNumber: string
    duaNumber: string
    tajweedSubject: string
    qaidaPage: string
    pageAmount: string
    hadithDuaRevision: string
    duaRevision: string
    tajweedRevision: string
    qaidaRevision: string
    teacherSignature: string
    comment: string
}

interface QaidaNooraniReportProps {
    studentName: string
    reportDate: string
    month: string
    weeklyTarget: string
    dailyEntries: Record<string, DailyEntry>
}

// Mock data for demonstration
const mockReports: QaidaReport[] = [
    {
        id: "1",
        studentName: "Ahmed Rahman",
        month: "January 2024",
        reportDate: "2024-01-15",
        weeklyTarget: "Complete 10 pages of Qaida, memorize 2 hadiths",
        status: "completed",
        progress: 100,
        studentAge: 8,
        teacher: "Ustadh Ibrahim",
        performance: 4.5,
        lastUpdated: "2 days ago"
    },
    {
        id: "2",
        studentName: "Fatima Khan",
        month: "January 2024",
        reportDate: "2024-01-16",
        weeklyTarget: "Memorize 5 duas, practice tajweed rules",
        status: "in-progress",
        progress: 60,
        studentAge: 9,
        teacher: "Ustadha Aisha",
        performance: 4.2,
        lastUpdated: "1 day ago"
    },
    {
        id: "3",
        studentName: "Mohammed Ali",
        month: "December 2023",
        reportDate: "2023-12-20",
        weeklyTarget: "Learn tajweed rules for 3 chapters",
        status: "pending",
        progress: 0,
        studentAge: 10,
        teacher: "Ustadh Hassan",
        performance: 3.8,
        lastUpdated: "1 week ago"
    },
    {
        id: "4",
        studentName: "Aisha Hassan",
        month: "January 2024",
        reportDate: "2024-01-18",
        weeklyTarget: "Revise previous 10 surahs, complete assessment",
        status: "completed",
        progress: 100,
        studentAge: 7,
        teacher: "Ustadha Fatima",
        performance: 4.7,
        lastUpdated: "3 days ago"
    },
    {
        id: "5",
        studentName: "Omar Farooq",
        month: "January 2024",
        reportDate: "2024-01-17",
        weeklyTarget: "Complete Qaida Noorani lesson 5-8",
        status: "in-progress",
        progress: 80,
        studentAge: 8,
        teacher: "Ustadh Ismail",
        performance: 4.0,
        lastUpdated: "Today"
    },
]

const days = [
    { key: "saturday", name: "Saturday", bangla: "শনিবার" },
    { key: "sunday", name: "Sunday", bangla: "রবিবার" },
    { key: "monday", name: "Monday", bangla: "সোমবার" },
    { key: "tuesday", name: "Tuesday", bangla: "মঙ্গলবার" },
    { key: "wednesday", name: "Wednesday", bangla: "বুধবার" },
    { key: "thursday", name: "Thursday", bangla: "বৃহস্পতিবার" },
    { key: "friday", name: "Friday", bangla: "শুক্রবার" },
]

function QaidaReportDashboard() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [reports] = useState<QaidaReport[]>(mockReports)
    const [selectedTab, setSelectedTab] = useState(0)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedReport, setSelectedReport] = useState<QaidaReport | null>(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterTeacher, setFilterTeacher] = useState("all")

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue)
    }

    const filteredReports = reports.filter((report) => {
        if (selectedTab === 1 && report.status !== "completed") return false
        if (selectedTab === 2 && report.status !== "in-progress") return false
        if (selectedTab === 3 && report.status !== "pending") return false
        
        if (filterStatus !== "all" && report.status !== filterStatus) return false
        if (filterTeacher !== "all" && report.teacher !== filterTeacher) return false
        
        return report.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               report.month.toLowerCase().includes(searchQuery.toLowerCase())
    })

    const handleViewReport = (report: QaidaReport) => {
        setSelectedReport(report)
        setViewDialogOpen(true)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "success"
            case "in-progress": return "warning"
            case "pending": return "error"
            default: return "default"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed": return <CheckCircleIcon />
            case "in-progress": return <ScheduleIcon />
            case "pending": return <PendingIcon />
            default: return <PendingIcon />
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "completed": return "Completed"
            case "in-progress": return "In Progress"
            case "pending": return "Pending"
            default: return "Unknown"
        }
    }

    const teachers = Array.from(new Set(reports.map(report => report.teacher)))

    // Stats for dashboard
    const completedReports = reports.filter(r => r.status === "completed").length
    const inProgressReports = reports.filter(r => r.status === "in-progress").length
    const pendingReports = reports.filter(r => r.status === "pending").length
    const averagePerformance = reports.reduce((sum, report) => sum + report.performance, 0) / reports.length

    return (
        <Box sx={{ display: 'flex', bgcolor: "grey.50", minHeight: "100vh" }}>
            

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: isMobile ? 1 : 3 }}>
                {/* App Bar */}
                <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'white', mb: 3, borderRadius: 2 }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                            Qaida Noorani Reports Dashboard
                        </Typography>
                        <IconButton color="inherit" sx={{ mr: 1 }}>
                            <Badge badgeContent={3} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>A</Avatar>
                    </Toolbar>
                </AppBar>

                {/* Stats Cards */}
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
                        <Card sx={{ bgcolor: 'error.light', color: 'white', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PendingIcon sx={{ fontSize: 40, mr: 2 }} />
                                    <Box>
                                        <Typography variant="h4" fontWeight="bold">{pendingReports}</Typography>
                                        <Typography variant="body2">Pending Reports</Typography>
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
                                        <Typography variant="h4" fontWeight="bold">{averagePerformance.toFixed(1)}</Typography>
                                        <Typography variant="body2">Avg. Performance</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Filters and Search */}
                <Card sx={{ mb: 3, borderRadius: 3 }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    placeholder="Search reports by student name or month..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    InputProps={{
                                        startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
                                    }}
                                    sx={{ borderRadius: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={filterStatus}
                                        label="Status"
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <MenuItem value="all">All Statuses</MenuItem>
                                        <MenuItem value="completed">Completed</MenuItem>
                                        <MenuItem value="in-progress">In Progress</MenuItem>
                                        <MenuItem value="pending">Pending</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Teacher</InputLabel>
                                    <Select
                                        value={filterTeacher}
                                        label="Teacher"
                                        onChange={(e) => setFilterTeacher(e.target.value)}
                                    >
                                        <MenuItem value="all">All Teachers</MenuItem>
                                        {teachers.map(teacher => (
                                            <MenuItem key={teacher} value={teacher}>{teacher}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button variant="contained" startIcon={<AddIcon />} fullWidth={isMobile}>
                                    New Report
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Reports Table */}
                <Card sx={{ borderRadius: 3 }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="report status tabs">
                            <Tab label="All Reports" />
                            <Tab label="Completed" />
                            <Tab label="In Progress" />
                            <Tab label="Pending" />
                        </Tabs>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "grey.100" }}>
                                    <TableCell>Student</TableCell>
                                    <TableCell>Month</TableCell>
                                    <TableCell>Report Date</TableCell>
                                    <TableCell>Weekly Target</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Progress</TableCell>
                                    <TableCell>Performance</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredReports.map((report) => (
                                    <TableRow key={report.id} hover>
                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                                                    {report.studentName.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="body2" fontWeight="500">
                                                        {report.studentName}
                                                    </Typography>
                                                    <Typography variant="caption" color="textSecondary">
                                                        Age: {report.studentAge}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{report.month}</TableCell>
                                        <TableCell>{report.reportDate}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                                {report.weeklyTarget}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip 
                                                icon={getStatusIcon(report.status)}
                                                label={getStatusText(report.status)} 
                                                color={getStatusColor(report.status) as any} 
                                                size="small" 
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Box sx={{ width: "100%", mr: 1 }}>
                                                    <LinearProgress 
                                                        variant="determinate" 
                                                        value={report.progress} 
                                                        color={
                                                            report.progress === 100 ? "success" : 
                                                            report.progress > 50 ? "warning" : "error"
                                                        }
                                                        sx={{ height: 8, borderRadius: 4 }}
                                                    />
                                                </Box>
                                                <Box sx={{ minWidth: 35 }}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {`${report.progress}%`}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Rating value={report.performance} size="small" readOnly />
                                                <Typography variant="body2" sx={{ ml: 1 }}>
                                                    {report.performance.toFixed(1)}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="View Report">
                                                <IconButton size="small" onClick={() => handleViewReport(report)} color="primary">
                                                    <ViewIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit Report">
                                                <IconButton size="small" color="secondary">
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete Report">
                                                <IconButton size="small" color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {filteredReports.length === 0 && (
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
            </Box>

            <Fab 
                color="primary" 
                aria-label="add report" 
                sx={{ position: "fixed", bottom: 16, right: 16 }}
            >
                <AddIcon />
            </Fab>

            {/* View Report Dialog */}
            <Dialog 
                open={viewDialogOpen} 
                onClose={() => setViewDialogOpen(false)} 
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
                                <Typography variant="h6">{selectedReport?.studentName}s Report</Typography>
                                <Typography variant="body2">{selectedReport?.month}</Typography>
                            </Box>
                        </Box>
                        <Chip 
                            icon={selectedReport ? getStatusIcon(selectedReport.status) : undefined}
                            label={selectedReport ? getStatusText(selectedReport.status) : ''} 
                            color={selectedReport ? getStatusColor(selectedReport.status) as any : 'default'} 
                            sx={{ color: 'white' }}
                        />
                    </Box>
                </DialogTitle>
                <DialogContent dividers sx={{ p: 0 }}>
                    {selectedReport && (
                        <QaidaNooraniReport 
                            studentName={selectedReport.studentName}
                            reportDate={selectedReport.reportDate}
                            month={selectedReport.month}
                            weeklyTarget={selectedReport.weeklyTarget}
                            dailyEntries={{
                                saturday: {
                                    hadithNumber: "Hadith 15",
                                    duaNumber: "Dua 12",
                                    tajweedSubject: "Makharij",
                                    qaidaPage: "12",
                                    pageAmount: "2 pages",
                                    hadithDuaRevision: "Hadith 1-5",
                                    duaRevision: "Dua 1-3",
                                    tajweedRevision: "Basic Rules",
                                    qaidaRevision: "Pages 1-5",
                                    teacherSignature: "I. Ahmed",
                                    comment: "Good progress",
                                },
                                sunday: {
                                    hadithNumber: "Hadith 16",
                                    duaNumber: "Dua 13",
                                    tajweedSubject: "Sifat",
                                    qaidaPage: "13",
                                    pageAmount: "2 pages",
                                    hadithDuaRevision: "Hadith 6-10",
                                    duaRevision: "Dua 4-6",
                                    tajweedRevision: "Advanced Rules",
                                    qaidaRevision: "Pages 6-10",
                                    teacherSignature: "I. Ahmed",
                                    comment: "Excellent recitation",
                                },
                                // Add other days as needed
                            }}
                        />
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button startIcon={<PrintIcon />} variant="outlined">Print</Button>
                    <Button startIcon={<DownloadIcon />} variant="outlined">Download PDF</Button>
                    <Button startIcon={<ShareIcon />} variant="outlined">Share</Button>
                    <Button variant="contained" onClick={() => setViewDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

// Enhanced QaidaNooraniReport component with better layout
function QaidaNooraniReport({ studentName, reportDate, month, weeklyTarget, dailyEntries }: QaidaNooraniReportProps) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    
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
                                    <Typography variant="body1" fontWeight="500">{reportDate}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">Weekly Target</Typography>
                                    <Typography variant="body1" fontWeight="500">{weeklyTarget}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                <StarIcon sx={{ mr: 1 }} /> Performance Summary
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">Completion</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', mr: 1 }}>
                                            <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 4 }} />
                                        </Box>
                                        <Typography variant="body2">85%</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">Performance Rating</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Rating value={4.5} size="small" readOnly />
                                        <Typography variant="body2" sx={{ ml: 1 }}>4.5/5</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="textSecondary">Teachers Overall Comment</Typography>
                                    <Typography variant="body1">
                                        {studentName} has shown excellent progress this week. Their recitation has improved significantly, and theyve met all learning targets.
                                    </Typography>
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
                        <TableRow sx={{ bgcolor: "grey.100" }}>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                Date/Day
                                <br />
                                (তারিখ/বার)
                            </TableCell>
                            <TableCell colSpan={3} align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                Subject List
                                <br />
                                (মুখস্ত বিষয়াবলী)
                            </TableCell>
                            <TableCell colSpan={2} align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                কায়েদা
                            </TableCell>
                            <TableCell colSpan={4} align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                রিভিশন
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                শিক্ষকের স্বাক্ষর
                            </TableCell>
                            <TableCell rowSpan={2} align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                মন্তব্য
                            </TableCell>
                        </TableRow>

                        <TableRow sx={{ bgcolor: "grey.100" }}>
                            <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                হাদিস নাম্বার / সূরার নাম
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                দোয়ার নম্বর
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                তাজভীদের বিষয়
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                পৃষ্ঠা
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                পরিমাণ
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                হাদিস / সূরা
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                দোয়া
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                তাজবীদ
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                কায়েদা (পৃষ্ঠা)
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {days.map((day) => (
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

                                        variant="outlined"
                                        sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: 0.5 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={dailyEntries[day.key as keyof typeof dailyEntries]?.duaNumber}
                                        variant="outlined"
                                        sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: 0.5 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={dailyEntries[day.key as keyof typeof dailyEntries]?.tajweedSubject}
                                        variant="outlined"
                                        sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: 0.5 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={dailyEntries[day.key as keyof typeof dailyEntries]?.qaidaPage}
                                        variant="outlined"
                                        sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: 0.5 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={dailyEntries[day.key as keyof typeof dailyEntries]?.pageAmount}
                                        variant="outlined"
                                        sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: 0.5 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={dailyEntries[day.key as keyof typeof dailyEntries]?.hadithDuaRevision}
                                        variant="outlined"
                                        sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: 0.5 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={dailyEntries[day.key as keyof typeof dailyEntries]?.duaRevision}
                                        variant="outlined"
                                        sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: 0.5 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={dailyEntries[day.key as keyof typeof dailyEntries]?.tajweedRevision}
                                        variant="outlined"
                                        sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: 0.5 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={dailyEntries[day.key as keyof typeof dailyEntries]?.qaidaRevision}
                                        variant="outlined"
                                        sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: 0.5 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={dailyEntries[day.key as keyof typeof dailyEntries]?.teacherSignature}
                                        variant="outlined"
                                        sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: 0.5 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={dailyEntries[day.key as keyof typeof dailyEntries]?.comment}
                                        variant="outlined"
                                        sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
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
                                        <Typography variant="caption">Total Pages: 14</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={2.4}>
                                        <Typography variant="caption">Total Hadith: 5</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={2.4}>
                                        <Typography variant="caption">Total Duas: 6</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={2.4}>
                                        <Typography variant="caption">Total Tajweed: 4 topics</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={2.4}>
                                        <Typography variant="caption">Total Revision: 8 sessions</Typography>
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
                        {studentName} has shown remarkable improvement in Tajweed rules application this week. Their memorization of new hadiths and duas is progressing well, with 90% accuracy in recitation.
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Areas for improvement: Need to focus on the correct pronunciation of Arabic letters from the throat (حروف حلقية). Recommended practice: 10 minutes daily focusing on these letters.
                    </Typography>
                    <Typography variant="body2">
                        Next week focus: Begin new chapter on Waqf rules and continue memorization of Surah Al-Fatiha with proper Tajweed.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default QaidaReportDashboard