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
  useMediaQuery,
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
  onClick,
}: any) => {
  const isPositive = trend === "up";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <GlassCard
      onClick={onClick}
      sx={{
        p: { xs: 1.25, sm: 2, md: 2.5 },
        height: "100%",
        transition: "all 0.25s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": {
          transform: onClick ? "translateY(-4px)" : "none",
          boxShadow: onClick
            ? "0 10px 28px 0 rgba(31, 38, 135, 0.22)"
            : "inherit",
        },
        "&:active": {
          transform: onClick ? "translateY(-1px)" : "none",
        },
      }}
    >
      {/* Top row: icon + trend chip */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 1, sm: 1.5, md: 2 },
        }}
      >
        <Avatar
          sx={{
            bgcolor: alpha(color, 0.12),
            color,
            width: { xs: 34, sm: 44, md: 52 },
            height: { xs: 34, sm: 44, md: 52 },
            boxShadow: `0 4px 10px ${alpha(color, 0.18)}`,
            "& .MuiSvgIcon-root": {
              fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
            },
          }}
        >
          {icon}
        </Avatar>

        <Chip
          icon={
            isPositive ? (
              <TrendingUp style={{ fontSize: isMobile ? 12 : 14 }} />
            ) : (
              <TrendingDown style={{ fontSize: isMobile ? 12 : 14 }} />
            )
          }
          label={`${trendValue}%`}
          size="small"
          color={isPositive ? "success" : "error"}
          sx={{
            height: { xs: 20, sm: 26 },
            px: { xs: 0, sm: 0.5 },
            fontWeight: 700,
            "& .MuiChip-label": {
              fontSize: { xs: "0.6rem", sm: "0.7rem" },
              px: { xs: 0.5, sm: 1 },
            },
            "& .MuiChip-icon": {
              ml: { xs: "4px", sm: "6px" },
            },
          }}
        />
      </Box>

      {/* Value + title */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
          <CircularProgress size={20} />
        </Box>
      ) : (
        <>
          <Typography
            component="div"
            sx={{
              fontWeight: 800,
              mb: 0.25,
              fontSize: { xs: "1.35rem", sm: "1.75rem", md: "2rem" },
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {value}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.85rem" },
              fontWeight: 500,
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
        </>
      )}

      {/* Progress bar */}
      <Box sx={{ mt: { xs: 1, sm: 1.5 } }}>
        <Box
          sx={{
            width: "100%",
            height: { xs: 3, sm: 5 },
            borderRadius: 3,
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${Math.min(100, Math.max(0, parseInt(trendValue) || 0))}%`,
              height: "100%",
              bgcolor: isPositive
                ? theme.palette.success.main
                : theme.palette.error.main,
              borderRadius: 3,
              transition: "width 0.6s ease",
            }}
          />
        </Box>
      </Box>
    </GlassCard>
  );
};
