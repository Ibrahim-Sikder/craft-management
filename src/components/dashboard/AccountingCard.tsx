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
          transform: { xs: "translateY(-2px)", sm: "translateY(-5px)" },
          boxShadow: `0 8px 16px -4px ${alpha(color, 0.25)}`,
        },
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 }, position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: { xs: 1, sm: 2 },
          }}
        >
          {loading ? (
            <CircularProgress size={32} />
          ) : (
            <Avatar
              sx={{
                bgcolor: alpha(color, 0.1),
                color,
                width: { xs: 40, sm: 48, md: 54 },
                height: { xs: 40, sm: 48, md: 54 },
                boxShadow: `0 4px 8px ${alpha(color, 0.2)}`,
              }}
            >
              {icon}
            </Avatar>
          )}
          <IconButton size="small" sx={{ color: "text.secondary", p: 0.5 }}>
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>

        {loading ? (
          <Box sx={{ mb: 1 }}>
            <Box
              sx={{
                width: "70%",
                height: { xs: 24, sm: 28, md: 32 },
                bgcolor: alpha(theme.palette.text.primary, 0.1),
                borderRadius: 1,
                mb: 0.5,
              }}
            />
            <Box
              sx={{
                width: "50%",
                height: { xs: 16, sm: 18, md: 20 },
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
              sx={{
                fontWeight: 800,
                mb: 0.5,
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
              }}
            >
              {value}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: { xs: 1, sm: 2 },
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
              }}
            >
              {title}
            </Typography>
          </>
        )}

        {subValue && !loading && (
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <Typography
              variant="body2"
              sx={{
                color,
                fontWeight: 600,
                mr: 1,
                fontSize: { xs: "0.7rem", sm: "0.8rem" },
              }}
            >
              {subValue}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" } }}
            >
              {subTitle}
            </Typography>
          </Box>
        )}

        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Box sx={{ width: "100%" }}>
              <LinearProgress color="primary" />
            </Box>
          </Box>
        )}
      </CardContent>
    </GlassCard>
  );
};
