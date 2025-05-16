/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Paper,
    Tab,
    Tabs,
    Typography,
    useTheme,
} from "@mui/material"
import {
    Assignment,
    AssignmentTurnedIn,
    AttachFile,
    Attachment,
    Book,
    CalendarMonth,
    CheckCircle,
    Download,
    EmojiEvents,
    Event,
    EventNote,
    FileDownload,
    Grade,
    Home,
    Info,
    LocalLibrary,
    Notifications,
    Payment,
    Person,
    Print,
    School,
    Settings,
    Timeline,
    Visibility,
    People, // Added People import
} from "@mui/icons-material"
import StudentOverview from "./StudentOverview"
import { studentData } from "@/data/data"
import { getStatusColor } from "./Utils"
import StudentResult from "./StudentResult"
import StudentHomeWork from "./StudentHomeWork"
import StudentSubject from "./StudentSubject"
import StudentTimetable from "./StudentTimetable"
import StudentFee from "./StudentFee"
import StudentAnnouncement from "./StudentAnnouncement"
import StudentDocument from "./StudentDocument"
import StudentAchivement from "./StudentAchivement"
import { useGetSingleStudentQuery } from "@/redux/api/studentApi"

// Mock student data


interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}
interface PageProps {
    params: {
        id: string;
    };
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

const StudentProfile = ({ params }: PageProps) => {
    const { id } = params
    const theme = useTheme()
    const [tabValue, setTabValue] = useState(0)
    const { data: singleStudent } = useGetSingleStudentQuery({ id })
    console.log(singleStudent)
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }


    return (
        <Container maxWidth="xl">
            {/* Header */}
            <Paper elevation={0} sx={{ mb: 3, bgcolor: theme.palette.primary.main, color: "white", py: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Person sx={{ mr: 1 }} />
                    <Typography variant="h5" component="h1">
                        Student Profile
                    </Typography>
                </Box>
            </Paper>

            {/* Student Profile Header */}
            <Card sx={{ mb: 3, overflow: "visible" }}>
                <CardContent sx={{ position: "relative", pb: 3 }}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: -30,
                            left: 24,
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            bgcolor: theme.palette.primary.light,
                            border: `4px solid ${theme.palette.background.paper}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            boxShadow: theme.shadows[3],
                        }}
                    >
                        <Typography variant="h3">{singleStudent?.data?.name.charAt(0)}</Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Box sx={{ pl: { xs: 0, sm: 14 }, pt: { xs: 10, sm: 2 } }}>
                                <Typography variant="h4" gutterBottom>
                                    {singleStudent?.data?.name}
                                </Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                                    <Chip
                                        icon={<School fontSize="small" />}
                                        label={`${singleStudent?.data?.className[0]}, ${singleStudent?.data?.section[0] || ''}`}
                                        size="small"
                                    />
                                    <Chip icon={<Info fontSize="small" />} label={`Roll: ${singleStudent?.data?.studentClassRoll}`} size="small" />
                                    <Chip
                                        icon={<Person fontSize="small" />}
                                        label={`ID: ${singleStudent?.data?.studentId}`}
                                        size="small"
                                        color="primary"
                                    />
                                    <Chip
                                        icon={<CheckCircle fontSize="small" />}
                                        label={singleStudent?.data?.status}
                                        size="small"
                                        color={getStatusColor(singleStudent?.data?.status) as any}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 1, mt: 2 }}>
                                <Button variant="outlined" startIcon={<Print />} size="small">
                                    Print Profile
                                </Button>
                                <Button variant="outlined" startIcon={<FileDownload />} size="small">
                                    Download ID
                                </Button>
                                <Button variant="contained" startIcon={<Settings />} size="small">
                                    Settings
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={2}
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            bgcolor: theme.palette.success.light,
                            color: "white",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h4">{studentData.attendance.present}%</Typography>
                        <Typography variant="body2">Attendance</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={2}
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            bgcolor: theme.palette.info.light,
                            color: "white",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h4">{studentData.results[1]?.percentage || 0}%</Typography>
                        <Typography variant="body2">Last Exam</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={2}
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            bgcolor: theme.palette.warning.light,
                            color: "white",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h4">{studentData.homework.filter((hw) => hw.status === "Pending").length}</Typography>
                        <Typography variant="body2">Pending Homework</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={2}
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            bgcolor: theme.palette.error.light,
                            color: "white",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h4">${studentData.fees.due}</Typography>
                        <Typography variant="body2">Due Fees</Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Main Content Tabs */}
            <Card sx={{ mb: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="student profile tabs"
                    >
                        <Tab icon={<Info />} label="Overview" />
                        <Tab icon={<Grade />} label="Results" />
                        <Tab icon={<Assignment />} label="Homework" />
                        <Tab icon={<Timeline />} label="Attendance" />
                        <Tab icon={<Book />} label="Subjects" />
                        <Tab icon={<Event />} label="Timetable" />
                        <Tab icon={<Payment />} label="Fees" />
                        <Tab icon={<Notifications />} label="Announcements" />
                        <Tab icon={<AttachFile />} label="Documents" />
                        <Tab icon={<EmojiEvents />} label="Achievements" />
                    </Tabs>
                </Box>

                {/* Overview Tab */}
                <TabPanel value={tabValue} index={0}>
                    <StudentOverview student={singleStudent?.data} />
                </TabPanel>

                {/* Results Tab */}
                <TabPanel value={tabValue} index={1}>
                    <StudentResult />
                </TabPanel>

                {/* Homework Tab */}
                <TabPanel value={tabValue} index={2}>
                    <StudentHomeWork />
                </TabPanel>

                {/* Attendance Tab */}
                <TabPanel value={tabValue} index={3}>

                </TabPanel>

                {/* Subjects Tab */}
                <TabPanel value={tabValue} index={4}>
                    <StudentSubject />
                </TabPanel>

                {/* Timetable Tab */}
                <TabPanel value={tabValue} index={5}>
                    <StudentTimetable />
                </TabPanel>

                {/* Fees Tab */}
                <TabPanel value={tabValue} index={6}>
                    <StudentFee />
                </TabPanel>

                {/* Announcements Tab */}
                <TabPanel value={tabValue} index={7}>
                    <StudentAnnouncement />
                </TabPanel>

                {/* Documents Tab */}
                <TabPanel value={tabValue} index={8}>
                    <StudentDocument />
                </TabPanel>

                {/* Achievements Tab */}
                <TabPanel value={tabValue} index={9}>
                    <StudentAchivement />
                </TabPanel>
            </Card>
        </Container>
    )
}

export default StudentProfile
