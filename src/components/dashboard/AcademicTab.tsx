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
} from "@mui/material";
import { School, Book, Assignment, Group } from "@mui/icons-material";
import { GlassCard } from "@/style/customStyle";

export const AcademicTab = ({ metaData }: any) => {
  const theme = useTheme();

  const academicStats = [
    {
      icon: <School />,
      label: "Total Classes",
      value: metaData?.totalClasses || 0,
      color: theme.palette.primary.main,
    },
    {
      icon: <Group />,
      label: "Total Students",
      value: metaData?.totalStudents || 0,
      color: "#FF5722",
    },
    {
      icon: <Book />,
      label: "Subjects",
      value: metaData?.totalSubjects || 24,
      color: "#4CAF50",
    },
    {
      icon: <Assignment />,
      label: "Exams Conducted",
      value: metaData?.totalExams || 8,
      color: "#9C27B0",
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Academic Overview
      </Typography>

      <Grid container spacing={3}>
        {academicStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <GlassCard sx={{ height: "100%" }}>
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: alpha(stat.color, 0.1),
                    color: stat.color,
                    width: 64,
                    height: 64,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Typography variant="h4" fontWeight="800">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </GlassCard>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
        Upcoming Academic Events
      </Typography>
      <Grid container spacing={2}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} key={item}>
            <GlassCard sx={{ p: 2 }}>
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
                    {item === 1
                      ? "Midterm Exam 2026"
                      : item === 2
                        ? "Science Fair"
                        : "Parent-Teacher Meeting"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item === 1
                      ? "Starts May 15, 2026"
                      : item === 2
                        ? "June 10, 2026"
                        : "July 5, 2026"}
                  </Typography>
                </Box>
              </Box>
            </GlassCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
