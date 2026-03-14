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
import { Work, Person, School, Badge } from "@mui/icons-material";
import { GlassCard } from "@/style/customStyle";

export const StaffTab = ({ metaData }: any) => {
  const theme = useTheme();
  const totalTeachers = metaData?.totalTeachers || 0;
  const totalStaff = metaData?.totalStaffs || 0;

  const staffData = [
    {
      role: "Teachers",
      count: totalTeachers,
      icon: <School />,
      color: theme.palette.primary.main,
    },
    {
      role: "Admin Staff",
      count: totalStaff,
      icon: <Badge />,
      color: "#FF5722",
    },
    { role: "Support Staff", count: 15, icon: <Person />, color: "#4CAF50" },
    {
      role: "Total Employees",
      count: totalTeachers + totalStaff + 15,
      icon: <Work />,
      color: "#9C27B0",
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Staff Overview
      </Typography>

      <Grid container spacing={3}>
        {staffData.map((staff, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <GlassCard sx={{ height: "100%" }}>
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: alpha(staff.color, 0.1),
                    color: staff.color,
                    width: 64,
                    height: 64,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  {staff.icon}
                </Avatar>
                <Typography variant="h4" fontWeight="800">
                  {staff.count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {staff.role}
                </Typography>
              </CardContent>
            </GlassCard>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
        Staff List
      </Typography>
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <GlassCard
              sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}
            >
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                {item}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="600">
                  Staff Member {item}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item % 3 === 0
                    ? "Teacher"
                    : item % 3 === 1
                      ? "Admin"
                      : "Support"}
                </Typography>
              </Box>
              <Chip label="Active" size="small" color="success" />
            </GlassCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
