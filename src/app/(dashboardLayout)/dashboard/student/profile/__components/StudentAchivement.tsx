import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,

    Divider,
    Grid,

    Typography,
    useTheme,
} from "@mui/material"
import {

    EmojiEvents,

} from "@mui/icons-material"
import { studentData } from "@/data/data";
const StudentAchivement = () => {
    const theme = useTheme()
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Student Achievements
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                {studentData.achievements.map((achievement) => (
                    <Grid item xs={12} md={4} key={achievement.id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                    <Avatar
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            bgcolor: theme.palette.primary.light,
                                            mb: 2,
                                        }}
                                    >
                                        <EmojiEvents fontSize="large" />
                                    </Avatar>
                                    <Typography variant="h6" gutterBottom>
                                        {achievement.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Date: {achievement.date}
                                    </Typography>
                                    <Typography variant="body1">{achievement.description}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button variant="contained" startIcon={<EmojiEvents />}>
                    View All Achievements
                </Button>
            </Box>
        </>
    );
};

export default StudentAchivement;