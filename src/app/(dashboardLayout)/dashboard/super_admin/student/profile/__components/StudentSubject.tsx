import {

    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    Paper,
    Typography,
} from "@mui/material"
import {
    Assignment,

    Book,

} from "@mui/icons-material"
import { studentData } from "@/data/data";
const StudentSubject = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Subject Performance
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                {studentData.subjects.map((subject, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Card variant="outlined" sx={{ mb: 3 }}>
                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                                    <Typography variant="h6">{subject.name}</Typography>
                                    <Chip
                                        label={`${subject.progress}%`}
                                        color={
                                            subject.progress >= 90
                                                ? "success"
                                                : subject.progress >= 70
                                                    ? "primary"
                                                    : subject.progress >= 50
                                                        ? "warning"
                                                        : "error"
                                        }
                                    />
                                </Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Teacher: {subject.teacher}
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={subject.progress}
                                    color={
                                        subject.progress >= 90
                                            ? "success"
                                            : subject.progress >= 70
                                                ? "primary"
                                                : subject.progress >= 50
                                                    ? "warning"
                                                    : "error"
                                    }
                                    sx={{ height: 10, borderRadius: 1, mb: 2 }}
                                />

                                <Grid container spacing={2} sx={{ mt: 1 }}>
                                    <Grid item xs={6}>
                                        <Paper elevation={0} sx={{ p: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Assignments
                                            </Typography>
                                            <Typography variant="h6">
                                                {studentData.homework.filter((hw) => hw.subject === subject.name).length}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Paper elevation={0} sx={{ p: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Average Grade
                                            </Typography>
                                            <Typography variant="h6">
                                                {subject.progress >= 90
                                                    ? "A+"
                                                    : subject.progress >= 80
                                                        ? "A"
                                                        : subject.progress >= 70
                                                            ? "B"
                                                            : subject.progress >= 60
                                                                ? "C"
                                                                : "D"}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="outlined" size="small" startIcon={<Book />}>
                                        View Materials
                                    </Button>
                                    <Button variant="contained" size="small" startIcon={<Assignment />} sx={{ ml: 1 }}>
                                        View Assignments
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default StudentSubject;