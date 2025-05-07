import React from "react"
import {
  Box,

  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  alpha,
  LinearProgress,
  useTheme,
} from "@mui/material"
import {
  MenuBook,
  EmojiEvents,
  Download,

} from "@mui/icons-material"
import { teacherData } from "./TeacherOverview";
const TeacherPerformance = () => {
  const theme = useTheme()
  return (
    <Grid container spacing={4}>
      {/* Performance Overview */}
      <Grid item xs={12}>
        <Card elevation={2} sx={{ borderRadius: 2, mb: 4 }}>
          <CardHeader title="Performance Overview" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Box sx={{ height: 300, p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    Performance chart would be displayed here (showing trends over time)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <List>
                  {Object.entries(teacherData.performanceMetrics).map(([key, value]) => (
                    <ListItem key={key} sx={{ py: 1 }}>
                      <ListItemText
                        primary={key
                          .split(/(?=[A-Z])/)
                          .join(" ")
                          .replace(/^\w/, (c) => c.toUpperCase())}
                        secondary={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <LinearProgress
                              variant="determinate"
                              value={value}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                width: "70%",
                                mr: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                              }}
                            />
                            <Typography variant="body2" fontWeight="bold">
                              {value}%
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Achievements */}
      <Grid item xs={12} md={6}>
        <Card elevation={2} sx={{ borderRadius: 2 }}>
          <CardHeader title="Professional Achievements" />
          <CardContent>
            <List>
              {teacherData.achievements.map((achievement, index) => (
                <ListItem
                  key={index}
                  sx={{
                    py: 1.5,
                    px: 2,
                    mb: 1.5,
                    bgcolor: alpha(theme.palette.warning.light, 0.1),
                    borderRadius: 1,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.warning.main }}>
                      <EmojiEvents />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={achievement.title}
                    secondary={`${achievement.issuer} • ${achievement.year}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Publications */}
      <Grid item xs={12} md={6}>
        <Card elevation={2} sx={{ borderRadius: 2 }}>
          <CardHeader title="Publications & Research" />
          <CardContent>
            <List>
              {teacherData.publications.map((pub, index) => (
                <ListItem
                  key={index}
                  sx={{
                    py: 1.5,
                    px: 2,
                    mb: 1.5,
                    bgcolor: alpha(theme.palette.info.light, 0.1),
                    borderRadius: 1,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                      <MenuBook />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={pub.title} secondary={`${pub.journal} • ${pub.year}`} />
                  <IconButton size="small">
                    <Download />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Attendance Record */}
      <Grid item xs={12}>
        <Card elevation={2} sx={{ borderRadius: 2 }}>
          <CardHeader title="Attendance Record" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Box sx={{ height: 250, p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    Attendance chart would be displayed here (showing monthly patterns)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h4" color="success.main" gutterBottom>
                    {teacherData.attendanceRecord.attendanceRate}%
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Attendance Rate
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                      <Typography variant="h6" color="text.primary">
                        {teacherData.attendanceRecord.present}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Present
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" color="text.primary">
                        {teacherData.attendanceRecord.absent}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Absent
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" color="text.primary">
                        {teacherData.attendanceRecord.late}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Late
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" color="text.primary">
                        {teacherData.attendanceRecord.leaveOfAbsence}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Leave
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TeacherPerformance;