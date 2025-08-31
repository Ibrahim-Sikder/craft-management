import { studentData } from '@/data/data';
import { Download } from '@mui/icons-material';
import {

    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Paper,

    Typography,
} from "@mui/material"

const StudentTimetable = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Class Timetable
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
                {studentData.timetable.map((day, dayIndex) => (
                    <Grid item xs={12} key={dayIndex}>
                        <Card variant="outlined" sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    {day.day}
                                </Typography>
                                <Grid container spacing={2}>
                                    {day.periods.map((period, periodIndex) => (
                                        <Grid item xs={12} sm={6} md={2.4} key={periodIndex}>
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    p: 2,
                                                    bgcolor: "#f5f5f5",
                                                    borderRadius: 1,
                                                    height: "100%",
                                                    border: "1px solid #e0e0e0",
                                                }}
                                            >
                                                <Typography variant="body2" color="text.secondary">
                                                    Period {periodIndex + 1}
                                                </Typography>
                                                <Typography variant="body1" fontWeight="medium">
                                                    {period}
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    {periodIndex === 0
                                                        ? "8:00 - 9:00 AM"
                                                        : periodIndex === 1
                                                            ? "9:00 - 10:00 AM"
                                                            : periodIndex === 2
                                                                ? "10:15 - 11:15 AM"
                                                                : periodIndex === 3
                                                                    ? "11:15 - 12:15 PM"
                                                                    : "12:15 - 1:15 PM"}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Button variant="contained" startIcon={<Download />}>
                    Download Timetable
                </Button>
            </Box>
        </>
    );
};

export default StudentTimetable;