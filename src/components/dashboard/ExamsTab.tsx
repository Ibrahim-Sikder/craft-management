/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Box,
  Grid,
  Typography,
  CardContent,
  Avatar,
  Divider,
  useTheme,
  alpha,
  Chip,
} from "@mui/material";
import { NoteAlt, Assignment, Grading, Schedule } from "@mui/icons-material";
import { GlassCard } from "@/style/customStyle";

export const ExamsTab = ({ metaData }: any) => {
  const theme = useTheme();

  const upcomingExams = [
    {
      name: "Midterm Exam 2026",
      date: "May 15, 2026",
      students: 120,
      status: "upcoming",
    },
    {
      name: "Final Exam 2026",
      date: "Dec 10, 2026",
      students: 118,
      status: "planned",
    },
    {
      name: "Monthly Test - April",
      date: "Apr 20, 2026",
      students: 115,
      status: "ongoing",
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Exams Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <GlassCard sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mr: 2,
                  }}
                >
                  <NoteAlt />
                </Avatar>
                <Typography variant="h6">Total Exams</Typography>
              </Box>
              <Typography variant="h3" fontWeight="800">
                {metaData?.totalExams || 12}
              </Typography>
            </CardContent>
          </GlassCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <GlassCard sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main,
                    mr: 2,
                  }}
                >
                  <Grading />
                </Avatar>
                <Typography variant="h6">Results Published</Typography>
              </Box>
              <Typography variant="h3" fontWeight="800">
                8
              </Typography>
            </CardContent>
          </GlassCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <GlassCard sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main,
                    mr: 2,
                  }}
                >
                  <Schedule />
                </Avatar>
                <Typography variant="h6">Upcoming</Typography>
              </Box>
              <Typography variant="h3" fontWeight="800">
                {upcomingExams.length}
              </Typography>
            </CardContent>
          </GlassCard>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
        Upcoming Exams
      </Typography>
      <Grid container spacing={2}>
        {upcomingExams.map((exam, index) => (
          <Grid item xs={12} key={index}>
            <GlassCard sx={{ p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      color: theme.palette.info.main,
                    }}
                  >
                    <Assignment />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600">
                      {exam.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {exam.date} · {exam.students} students
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={exam.status}
                  color={
                    exam.status === "ongoing"
                      ? "warning"
                      : exam.status === "upcoming"
                        ? "info"
                        : "default"
                  }
                  size="small"
                />
              </Box>
            </GlassCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
