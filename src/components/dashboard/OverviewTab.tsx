/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Class, Group, Person, School, Work } from "@mui/icons-material";
import {
  Box,
  Grid,
  Paper,
  Typography,
  alpha,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { StatCard } from "./StatCard";

export const OverviewTab = ({ stats, isLoading, classWiseData }: any) => {
  const theme = useMuiTheme();
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

  // Get class-wise data
  const classData = classWiseData || {};
  const classNames = Object.keys(classData).sort();

  // Define colors for different classes
  const getClassColor = (className: string, index: number) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      "#FF5722",
      "#4CAF50",
      "#2196F3",
      "#9C27B0",
      "#FF9800",
      "#E91E63",
      "#00BCD4",
      "#795548",
      "#607D8B",
      "#3F51B5",
    ];
    return colors[index % colors.length];
  };

  // Format class name for display
  const formatClassName = (className: string) => {
    // Convert "Pre_one" to "Pre One", "Four_boys" to "Four Boys", etc.
    return className
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l: string) => l.toUpperCase());
  };

  return (
    <Box>
      {/* Stats Cards Row */}
      <Grid
        container
        spacing={{ xs: 1.25, sm: 2, md: 3 }}
        sx={{ mb: { xs: 3, sm: 4 } }}
      >
        {statCards.map((card, index) => (
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

      {/* Class-wise Student Distribution Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 4,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          mb: { xs: 3, sm: 4 },
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: theme.palette.primary.main,
            }}
          >
            <School sx={{ fontSize: 28 }} />
            Class-wise Student
          </Typography>
        </Box>

        {isLoading ? (
          // Loading skeleton
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={item}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      height: 20,
                      width: "60%",
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      borderRadius: 1,
                      mb: 1,
                    }}
                  />
                  <Box
                    sx={{
                      height: 30,
                      width: "40%",
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      borderRadius: 1,
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : classNames.length > 0 ? (
          <Grid container spacing={2}>
            {classNames.map((className, index) => {
              const studentCount = classData[className];
              const color = getClassColor(className, index);

              return (
                <Grid item xs={6} sm={4} md={3} lg={2} key={className}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${alpha(color, 0.08)} 0%, ${alpha(color, 0.02)} 100%)`,
                      border: `1px solid ${alpha(color, 0.15)}`,
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 8px 20px ${alpha(color, 0.15)}`,
                        border: `1px solid ${alpha(color, 0.3)}`,
                      },
                    }}
                    onClick={() =>
                      router.push(`/dashboard/student/list?class=${className}`)
                    }
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: color,
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Class
                      </Typography>
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        mb: 0.5,
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        color: color,
                      }}
                    >
                      {formatClassName(className)}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 0.5,
                        mt: 1,
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: "1.5rem", sm: "1.75rem" },
                          color: color,
                        }}
                      >
                        {studentCount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        students
                      </Typography>
                    </Box>

                    {/* Progress bar */}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No class data available
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
