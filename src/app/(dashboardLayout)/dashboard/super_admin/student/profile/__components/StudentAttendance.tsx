import { studentData } from "@/data/data";
import {

    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    LinearProgress,

    Typography,
    useTheme,
} from "@mui/material"

const StudentAttendance = () => {
    const theme = useTheme()
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Attendance Overview
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Current Month Attendance
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-around", mb: 3 }}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h4" color="success.main">
                                        {studentData.attendance.present}%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Present
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h4" color="error.main">
                                        {studentData.attendance.absent}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Absent
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h4" color="warning.main">
                                        {studentData.attendance.late}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Late
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h4" color="info.main">
                                        {studentData.attendance.leave}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Leave
                                    </Typography>
                                </Box>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={studentData.attendance.present}
                                color="success"
                                sx={{ height: 10, borderRadius: 1, mb: 1 }}
                            />
                            <Typography variant="body2" align="center">
                                Total Working Days: {studentData.attendance.total}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Attendance Statistics
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                                    <Typography variant="body2">Term 1</Typography>
                                    <Typography variant="body2">92%</Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={92}
                                    color="success"
                                    sx={{ height: 8, borderRadius: 1, mb: 2 }}
                                />

                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                                    <Typography variant="body2">Term 2</Typography>
                                    <Typography variant="body2">88%</Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={88}
                                    color="success"
                                    sx={{ height: 8, borderRadius: 1, mb: 2 }}
                                />

                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                                    <Typography variant="body2">Term 3</Typography>
                                    <Typography variant="body2">85%</Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={85}
                                    color="success"
                                    sx={{ height: 8, borderRadius: 1, mb: 2 }}
                                />

                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                                    <Typography variant="body2">Overall</Typography>
                                    <Typography variant="body2">88%</Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={88}
                                    color="success"
                                    sx={{ height: 8, borderRadius: 1 }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Monthly Attendance Calendar
                            </Typography>
                            <Box sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 1, mt: 2 }}>
                                <Grid container spacing={1}>
                                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                                        <Grid item xs={1.7} key={day}>
                                            <Typography variant="body2" align="center" fontWeight="bold">
                                                {day}
                                            </Typography>
                                        </Grid>
                                    ))}
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                        <Grid item xs={1.7} key={day}>
                                            <Box
                                                sx={{
                                                    height: 40,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    border: "1px solid #e0e0e0",
                                                    borderRadius: 1,
                                                    bgcolor:
                                                        day % 7 === 0
                                                            ? "#f5f5f5"
                                                            : day % 3 === 0
                                                                ? theme.palette.error.light
                                                                : day % 5 === 0
                                                                    ? theme.palette.warning.light
                                                                    : theme.palette.success.light,
                                                    color: day % 3 === 0 || day % 5 === 0 || day % 7 === 0 ? "white" : "inherit",
                                                }}
                                            >
                                                {day}
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            bgcolor: theme.palette.success.light,
                                            borderRadius: "50%",
                                            mr: 1,
                                        }}
                                    />
                                    <Typography variant="body2">Present</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            bgcolor: theme.palette.error.light,
                                            borderRadius: "50%",
                                            mr: 1,
                                        }}
                                    />
                                    <Typography variant="body2">Absent</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            bgcolor: theme.palette.warning.light,
                                            borderRadius: "50%",
                                            mr: 1,
                                        }}
                                    />
                                    <Typography variant="body2">Late</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            bgcolor: "#f5f5f5",
                                            borderRadius: "50%",
                                            mr: 1,
                                        }}
                                    />
                                    <Typography variant="body2">Holiday</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default StudentAttendance;