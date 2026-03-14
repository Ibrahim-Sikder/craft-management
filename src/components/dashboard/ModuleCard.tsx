/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Box,
  Typography,
  CardContent,
  Avatar,
  CircularProgress,
  alpha,
  useTheme,
} from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { GlassCard } from "@/style/customStyle";

export const ModuleCard = ({
  title,
  description,
  icon,
  color,
  onClick,
  loading = false,
}: any) => {
  const theme = useTheme();

  return (
    <GlassCard
      onClick={onClick}
      sx={{
        cursor: "pointer",
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: `0 12px 32px 0 ${alpha(color, 0.25)}`,
          "& .arrow-icon": {
            transform: "translateX(6px)",
            opacity: 1,
          },
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
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
                width: 52,
                height: 52,
                boxShadow: `0 6px 12px ${alpha(color, 0.2)}`,
              }}
            >
              {icon}
            </Avatar>
          )}
          <KeyboardArrowRight
            className="arrow-icon"
            sx={{
              color,
              opacity: 0.7,
              transition: "all 0.3s ease",
            }}
          />
        </Box>
        {loading ? (
          <>
            <Box
              sx={{
                width: "60%",
                height: 24,
                bgcolor: alpha(theme.palette.text.primary, 0.1),
                borderRadius: 1,
                mb: 1,
              }}
            />
            <Box
              sx={{
                width: "80%",
                height: 16,
                bgcolor: alpha(theme.palette.text.primary, 0.1),
                borderRadius: 1,
              }}
            />
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 700, mb: 1 }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.9rem" }}
            >
              {description}
            </Typography>
          </>
        )}
      </CardContent>
    </GlassCard>
  );
};
