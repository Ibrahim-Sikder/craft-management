/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  alpha,
  useTheme,
} from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { GlassCard } from "@/style/customStyle";

export const StatCard = ({
  icon,
  title,
  value,
  trend,
  trendValue,
  color,
  loading = false,
  onClick, // new prop for navigation
}: any) => {
  const isPositive = trend === "up";
  const theme = useTheme();

  return (
    <GlassCard
      onClick={onClick}
      sx={{
        p: 2.5,
        height: "100%",
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": {
          transform: onClick ? "translateY(-8px)" : "none",
          boxShadow: onClick
            ? "0 12px 32px 0 rgba(31, 38, 135, 0.25)"
            : "inherit",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Avatar
          sx={{
            bgcolor: alpha(color, 0.1),
            color,
            width: 56,
            height: 56,
            mb: 2,
            boxShadow: `0 6px 12px ${alpha(color, 0.2)}`,
          }}
        >
          {icon}
        </Avatar>
        <Chip
          icon={
            isPositive ? (
              <TrendingUp fontSize="small" />
            ) : (
              <TrendingDown fontSize="small" />
            )
          }
          label={`${trendValue}%`}
          size="small"
          color={isPositive ? "success" : "error"}
          sx={{ height: 28, fontWeight: 600 }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress size={30} />
        </Box>
      ) : (
        <>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: 800, mb: 0.5 }}
          >
            {value}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.9rem" }}
          >
            {title}
          </Typography>
        </>
      )}

      <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: "100%",
            height: 6,
            borderRadius: 3,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${trendValue}%`,
              height: "100%",
              bgcolor: isPositive
                ? theme.palette.success.main
                : theme.palette.error.main,
              borderRadius: 3,
            }}
          />
        </Box>
      </Box>
    </GlassCard>
  );
};
