/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,

    Typography,
    useTheme,
} from "@mui/material"
import {
    Assignment,
    AssignmentTurnedIn,

    Visibility,
} from "@mui/icons-material"
import { studentData } from "@/data/data";
import { getHomeworkStatusColor } from "./Utils";
const StudentHomeWork = () => {
    const theme = useTheme()
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6">Homework & Assignments</Typography>
                <Button variant="contained" size="small">
                    Submit Homework
                </Button>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                {studentData.homework.map((hw) => (
                    <Grid item xs={12} md={6} key={hw.id}>
                        <Card variant="outlined" sx={{ mb: 2 }}>
                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Assignment color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="h6">{hw.title}</Typography>
                                    </Box>
                                    <Chip label={hw.status} size="small" color={getHomeworkStatusColor(hw.status) as any} />
                                </Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Subject
                                        </Typography>
                                        <Typography variant="body1">{hw.subject}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Due Date
                                        </Typography>
                                        <Typography variant="body1">{hw.dueDate}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Status
                                        </Typography>
                                        <Typography variant="body1">{hw.status}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Grade
                                        </Typography>
                                        <Typography variant="body1">{hw.grade}</Typography>
                                    </Grid>
                                </Grid>
                                <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="outlined" size="small" startIcon={<Visibility />} sx={{ mr: 1 }}>
                                        View Details
                                    </Button>
                                    {hw.status === "Pending" && (
                                        <Button variant="contained" size="small" startIcon={<AssignmentTurnedIn />}>
                                            Submit
                                        </Button>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Completed Assignments
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <List>
                    {studentData.homework
                        .filter((hw) => hw.status === "Completed")
                        .map((hw) => (
                            <ListItem
                                key={hw.id}
                                secondaryAction={
                                    <Box>
                                        <Chip label={`Grade: ${hw.grade}`} size="small" color="success" sx={{ mr: 1 }} />
                                        <IconButton edge="end" aria-label="view">
                                            <Visibility />
                                        </IconButton>
                                    </Box>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                                        <Assignment />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={hw.title} secondary={`${hw.subject} | Completed on ${hw.dueDate}`} />
                            </ListItem>
                        ))}
                </List>
            </Box>
        </>
    );
};

export default StudentHomeWork;