import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider
} from '@mui/material';
import {
  School,
  EmojiEvents,
  Download,
  CheckCircle
} from '@mui/icons-material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent
} from '@mui/lab';

import { teacherData } from './TeacherOverview';
const TeacherAchivement = () => {
    return (
        <Grid container spacing={4}>
            {/* Professional Achievements */}
            <Grid item xs={12} md={6}>
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                    <CardHeader title="Professional Achievements" />
                    <CardContent>
                        <Timeline>
                            {teacherData.achievements.map((achievement, index) => (
                                <TimelineItem key={index}>
                                    <TimelineSeparator>
                                        <TimelineDot color="primary">
                                            <EmojiEvents />
                                        </TimelineDot>
                                        {index < teacherData.achievements.length - 1 && <TimelineConnector />}
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="h6" component="span">
                                                {achievement.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {achievement.issuer} • {achievement.year}
                                            </Typography>
                                        </Box>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </CardContent>
                </Card>
            </Grid>

            {/* Education & Certifications */}
            <Grid item xs={12} md={6}>
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                    <CardHeader title="Education & Certifications" />
                    <CardContent>
                        <Typography variant="subtitle1" gutterBottom color="primary">
                            Education
                        </Typography>
                        <Timeline>
                            {teacherData.education.map((edu, index) => (
                                <TimelineItem key={index}>
                                    <TimelineSeparator>
                                        <TimelineDot color="secondary">
                                            <School />
                                        </TimelineDot>
                                        {index < teacherData.education.length - 1 && <TimelineConnector />}
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="h6" component="span">
                                                {edu.degree}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {edu.institution} • {edu.year}
                                            </Typography>
                                        </Box>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="subtitle1" gutterBottom color="primary">
                            Certifications
                        </Typography>
                        <Timeline>
                            {teacherData.certifications.map((cert, index) => (
                                <TimelineItem key={index}>
                                    <TimelineSeparator>
                                        <TimelineDot color="success">
                                            <CheckCircle />
                                        </TimelineDot>
                                        {index < teacherData.certifications.length - 1 && <TimelineConnector />}
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="h6" component="span">
                                                {cert.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {cert.issuer} • {cert.year}
                                            </Typography>
                                        </Box>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </CardContent>
                </Card>
            </Grid>

            {/* Publications */}
            <Grid item xs={12}>
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                    <CardHeader title="Publications & Research" />
                    <CardContent>
                        <Grid container spacing={3}>
                            {teacherData.publications.map((pub, index) => (
                                <Grid item xs={12} md={6} key={index}>
                                    <Card variant="outlined" sx={{ height: "100%" }}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                {pub.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                {pub.journal} • {pub.year}
                                            </Typography>
                                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                                                <Button variant="outlined" size="small" startIcon={<Download />}>
                                                    Download
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default TeacherAchivement;