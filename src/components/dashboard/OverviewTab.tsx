/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Grid } from "@mui/material";
import { Group, Work, Person, Class } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material";
import { StatCard } from "./StatCard";

export const OverviewTab = ({ stats, isLoading }: any) => {
  const theme = useTheme();
  const router = useRouter();

  const statCards = [
    {
      icon: <Group />,
      title: "Total Students",
      value: isLoading ? "..." : stats.students.total,
      trend: stats.students.trend,
      trendValue: stats.students.trendValue,
      color: theme.palette.primary.main,
      path: "/dashboard/student/list",
    },
    {
      icon: <Work />,
      title: "Total Teachers",
      value: isLoading ? "..." : stats.teachers.total,
      trend: stats.teachers.trend,
      trendValue: stats.teachers.trendValue,
      color: "#FF5722",
      path: "/dashboard/teacher/list",
    },
    {
      icon: <Person />,
      title: "Total Staff",
      value: isLoading ? "..." : stats.staffs.total,
      trend: stats.staffs.trend,
      trendValue: stats.staffs.trendValue,
      color: "#3F51B5",
      path: "/dashboard/staff/list",
    },
    {
      icon: <Class />,
      title: "Total Classes",
      value: isLoading ? "..." : stats.classes.total,
      trend: stats.classes.trend,
      trendValue: stats.classes.trendValue,
      color: "#4CAF50",
      path: "/dashboard/classes/class",
    },
  ];

  return (
    <Grid
      container
      spacing={{ xs: 1.25, sm: 2, md: 3 }}
      sx={{ mb: { xs: 3, sm: 4 } }}
    >
      {statCards.map((card, index) => (
        // xs=6 → 2 cards per row on mobile, md=3 → 4 cards per row on desktop
        <Grid item xs={6} sm={6} md={3} key={index}>
          <StatCard
            icon={card.icon}
            title={card.title}
            value={card.value}
            trend={card.trend}
            trendValue={card.trendValue}
            color={card.color}
            loading={isLoading}
            onClick={() => router.push(card.path)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
