/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Grid, useTheme } from "@mui/material";
import { Group, Work, Person, Class } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { StatCard } from "./StatCard";

export const OverviewTab = ({ stats, isLoading }: any) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          icon={<Group />}
          title="Total Students"
          value={isLoading ? "..." : stats.students.total}
          trend={stats.students.trend}
          trendValue={stats.students.trendValue}
          color={theme.palette.primary.main}
          loading={isLoading}
          onClick={() => router.push("/dashboard/student/list")}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          icon={<Work />}
          title="Total Teachers"
          value={isLoading ? "..." : stats.teachers.total}
          trend={stats.teachers.trend}
          trendValue={stats.teachers.trendValue}
          color="#FF5722"
          loading={isLoading}
          onClick={() => router.push("/dashboard/teacher/list")}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          icon={<Person />}
          title="Total Staff"
          value={isLoading ? "..." : stats.staffs.total}
          trend={stats.staffs.trend}
          trendValue={stats.staffs.trendValue}
          color="#3F51B5"
          loading={isLoading}
          onClick={() => router.push("/dashboard/staff/list")}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          icon={<Class />}
          title="Total Classes"
          value={isLoading ? "..." : stats.classes.total}
          trend={stats.classes.trend}
          trendValue={stats.classes.trendValue}
          color="#4CAF50"
          loading={isLoading}
          onClick={() => router.push("/dashboard/classes/class")}
        />
      </Grid>
    </Grid>
  );
};
