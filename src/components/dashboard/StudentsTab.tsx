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
  LinearProgress,
} from "@mui/material";
import { Group, Male, Female, TrendingUp, HowToReg } from "@mui/icons-material";
import { GlassCard } from "@/style/customStyle";

export const StudentsTab = ({ metaData }: any) => {
  const theme = useTheme();
  const totalStudents = metaData?.totalStudents || 0;
  const maleCount = Math.round(totalStudents * 0.52);
  const femaleCount = totalStudents - maleCount;
  const attendanceRate = 85; // example

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Students Overview
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
                  <Group />
                </Avatar>
                <Typography variant="h6">Total Students</Typography>
              </Box>
              <Typography variant="h3" fontWeight="800" sx={{ mb: 1 }}>
                {totalStudents}
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Male sx={{ color: "#2196F3", mr: 0.5 }} />
                  <Typography variant="body2">Male: {maleCount}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Female sx={{ color: "#E91E63", mr: 0.5 }} />
                  <Typography variant="body2">Female: {femaleCount}</Typography>
                </Box>
              </Box>
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
                  <TrendingUp />
                </Avatar>
                <Typography variant="h6">Attendance Rate</Typography>
              </Box>
              <Typography variant="h3" fontWeight="800" sx={{ mb: 1 }}>
                {attendanceRate}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={attendanceRate}
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: "block" }}
              >
                Today is attendance:{" "}
                {Math.round(totalStudents * (attendanceRate / 100))} present
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
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    color: theme.palette.info.main,
                    mr: 2,
                  }}
                >
                  <HowToReg />
                </Avatar>
                <Typography variant="h6">New Enrollments</Typography>
              </Box>
              <Typography variant="h3" fontWeight="800" sx={{ mb: 1 }}>
                24
              </Typography>
              <Typography variant="caption" color="text.secondary">
                This month
              </Typography>
            </CardContent>
          </GlassCard>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
        Recent Students
      </Typography>
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <GlassCard sx={{ p: 2, textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  mx: "auto",
                  mb: 1,
                  bgcolor: theme.palette.primary.main,
                }}
              >
                {item}
              </Avatar>
              <Typography variant="subtitle1" fontWeight="600">
                Student Name {item}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Class {item}A
              </Typography>
            </GlassCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
