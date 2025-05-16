import {

    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,

} from "@mui/material"
import {
    EventNote,

} from "@mui/icons-material"
import { studentData } from "@/data/data";
const StudentAnnouncement = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                School Announcements
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                {studentData.announcements.map((announcement) => (
                    <Grid item xs={12} key={announcement.id}>
                        <Card variant="outlined" sx={{ mb: 2 }}>
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                    <EventNote color="primary" sx={{ mr: 2, mt: 0.5 }} />
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            {announcement.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Date: {announcement.date}
                                        </Typography>
                                        <Typography variant="body1">{announcement.description}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default StudentAnnouncement;