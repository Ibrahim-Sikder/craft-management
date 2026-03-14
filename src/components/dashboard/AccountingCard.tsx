/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Box,
  Typography,
  CardContent,
  Avatar,
  IconButton,
  CircularProgress,
  LinearProgress,
  alpha,
  useTheme,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { GlassCard } from "@/style/customStyle";

export const AccountingCard = ({
  title,
  value,
  icon,
  color,
  subValue,
  subTitle,
  loading = false,
  onClick,
}: any) => {
  const theme = useTheme();

  return (
    <GlassCard
      onClick={onClick}
      sx={{
        height: "100%",
        transition: "all 0.3s ease",
        background: `linear-gradient(135deg, ${alpha(color, 0.15)} 0%, ${alpha(color, 0.05)} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
        cursor: onClick ? "pointer" : "default",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: `0 12px 20px -5px ${alpha(color, 0.25)}`,
        },
      }}
    >
      <CardContent sx={{ p: 3, position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          {loading ? (
            <CircularProgress size={40} />
          ) : (
            <Avatar
              sx={{
                bgcolor: alpha(color, 0.1),
                color,
                width: 54,
                height: 54,
                boxShadow: `0 6px 12px ${alpha(color, 0.2)}`,
              }}
            >
              {icon}
            </Avatar>
          )}
          <IconButton size="small" sx={{ color: "text.secondary" }}>
            <MoreVert />
          </IconButton>
        </Box>

        {loading ? (
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                width: "70%",
                height: 32,
                bgcolor: alpha(theme.palette.text.primary, 0.1),
                borderRadius: 1,
                mb: 1,
              }}
            />
            <Box
              sx={{
                width: "50%",
                height: 20,
                bgcolor: alpha(theme.palette.text.primary, 0.1),
                borderRadius: 1,
              }}
            />
          </Box>
        ) : (
          <>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: 800, mb: 1 }}
            >
              {value}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, fontSize: "0.9rem" }}
            >
              {title}
            </Typography>
          </>
        )}

        {subValue && !loading && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ color, fontWeight: 600, mr: 1 }}>
              {subValue}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subTitle}
            </Typography>
          </Box>
        )}

        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Box sx={{ width: "100%" }}>
              <LinearProgress color="primary" />
            </Box>
          </Box>
        )}
      </CardContent>
    </GlassCard>
  );
};
