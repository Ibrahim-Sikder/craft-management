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
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material"
import {

    CalendarMonth,
    Download,
    Payment,
} from "@mui/icons-material"
import { studentData } from "@/data/data";
const StudentFee = () => {
    const theme = useTheme()
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Fee Details
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Fee Summary
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <Typography variant="body1">Total Fee</Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    ${studentData.fees.total}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <Typography variant="body1">Paid Amount</Typography>
                                <Typography variant="body1" color="success.main" fontWeight="bold">
                                    ${studentData.fees.paid}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <Typography variant="body1">Due Amount</Typography>
                                <Typography variant="body1" color="error.main" fontWeight="bold">
                                    ${studentData.fees.due}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <Typography variant="body1">Last Payment Date</Typography>
                                <Typography variant="body1">{studentData.fees.lastPaid}</Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={(studentData.fees.paid / studentData.fees.total) * 100}
                                color="success"
                                sx={{ height: 10, borderRadius: 1, mb: 2 }}
                            />
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                                <Button variant="contained" color="primary">
                                    Pay Now
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Fee Structure
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Tuition Fee" secondary="$8000" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Development Fee" secondary="$1000" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Library Fee" secondary="$500" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Computer Lab Fee" secondary="$800" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Sports Fee" secondary="$700" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Examination Fee" secondary="$1000" />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Payment History
                            </Typography>
                            <List>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="download">
                                            <Download />
                                        </IconButton>
                                    }
                                >
                                    <ListItemIcon>
                                        <Avatar sx={{ bgcolor: theme.palette.success.light }}>
                                            <Payment />
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary="$3000" secondary="September 15, 2023 | Receipt #12345" />
                                </ListItem>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="download">
                                            <Download />
                                        </IconButton>
                                    }
                                >
                                    <ListItemIcon>
                                        <Avatar sx={{ bgcolor: theme.palette.success.light }}>
                                            <Payment />
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary="$3500" secondary="June 10, 2023 | Receipt #12344" />
                                </ListItem>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="download">
                                            <Download />
                                        </IconButton>
                                    }
                                >
                                    <ListItemIcon>
                                        <Avatar sx={{ bgcolor: theme.palette.success.light }}>
                                            <Payment />
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary="$3000" secondary="March 5, 2023 | Receipt #12343" />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Upcoming Payments
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <CalendarMonth color="warning" />
                                    </ListItemIcon>
                                    <ListItemText primary="December Term Fee" secondary="Due Date: December 10, 2023" />
                                    <Chip label="$2500" color="error" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <CalendarMonth color="warning" />
                                    </ListItemIcon>
                                    <ListItemText primary="Examination Fee" secondary="Due Date: November 25, 2023" />
                                    <Chip label="$500" color="error" />
                                </ListItem>
                            </List>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                                <Button variant="outlined" color="primary">
                                    View All Payments
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default StudentFee;