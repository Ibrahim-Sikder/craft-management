/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  alpha,
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { TrendingDown, TrendingUp } from "@mui/icons-material";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  trend?: "up" | "down";
  trendValue?: number;
  color?: string;
  loading?: boolean;
  onClick?: () => void;
}

export const StatCard = ({
  icon,
  title,
  value,
  trend,
  trendValue,
  color: propColor,
  loading = false,
  onClick,
}: StatCardProps) => {
  const theme = useTheme();
  // Ensure color is a string, not a function
  const color =
    typeof propColor === "function"
      ? theme.palette.primary.main
      : propColor || theme.palette.primary.main;

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": onClick
          ? {
              transform: "translateY(-4px)",
              boxShadow: (theme) => theme.shadows[8],
            }
          : {},
        borderRadius: 3,
        height: "100%",
        position: "relative",
        overflow: "visible",
      }}
      elevation={0}
    >
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1.5}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500, mb: 0.5 }}
            >
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {loading ? "..." : value}
            </Typography>
            {trend && trendValue && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                sx={{ mt: 1 }}
              >
                {trend === "up" ? (
                  <TrendingUp sx={{ fontSize: 14, color: "success.main" }} />
                ) : (
                  <TrendingDown sx={{ fontSize: 14, color: "error.main" }} />
                )}
                <Typography
                  variant="caption"
                  color={trend === "up" ? "success.main" : "error.main"}
                >
                  {trendValue}% from last month
                </Typography>
              </Stack>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: alpha(color, 0.12),
              color: color,
              width: { xs: 34, sm: 44, md: 52 },
              height: { xs: 34, sm: 44, md: 52 },
            }}
          >
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};
