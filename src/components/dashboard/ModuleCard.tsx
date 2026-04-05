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
  useMediaQuery,
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <GlassCard
      onClick={onClick}
      sx={{
        cursor: "pointer",
        height: "100%",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: {
            xs: "translateY(-4px)",
            sm: "translateY(-6px)",
            md: "translateY(-8px)",
          },
          boxShadow: `0 10px 28px 0 ${alpha(color, 0.22)}`,
          "& .arrow-icon": {
            transform: "translateX(4px)",
            opacity: 1,
          },
        },
        "&:active": {
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent
        sx={{
          p: { xs: 1.25, sm: 2, md: 2.5 },
          // Override MUI's last-child padding reset
          "&:last-child": { pb: { xs: 1.25, sm: 2, md: 2.5 } },
        }}
      >
        {/* Top row: Avatar + Arrow */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: { xs: 1, sm: 1.5, md: 2 },
          }}
        >
          {loading ? (
            <CircularProgress size={isMobile ? 28 : 36} />
          ) : (
            <Avatar
              sx={{
                bgcolor: alpha(color, 0.12),
                color,
                width: { xs: 36, sm: 44, md: 52 },
                height: { xs: 36, sm: 44, md: 52 },
                boxShadow: `0 4px 10px ${alpha(color, 0.2)}`,
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                },
              }}
            >
              {icon}
            </Avatar>
          )}

          <KeyboardArrowRight
            className="arrow-icon"
            sx={{
              color,
              opacity: 0.6,
              transition: "all 0.25s ease",
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
              mt: { xs: 0.25, sm: 0.5 },
            }}
          />
        </Box>

        {/* Content: skeleton or text */}
        {loading ? (
          <>
            <Box
              sx={{
                width: "65%",
                height: { xs: 14, sm: 20 },
                bgcolor: alpha(theme.palette.text.primary, 0.1),
                borderRadius: 1,
                mb: 1,
              }}
            />
            <Box
              sx={{
                width: "85%",
                height: { xs: 11, sm: 14 },
                bgcolor: alpha(theme.palette.text.primary, 0.1),
                borderRadius: 1,
              }}
            />
          </>
        ) : (
          <>
            <Typography
              component="div"
              sx={{
                fontWeight: 700,
                mb: { xs: 0.35, sm: 0.75 },
                fontSize: { xs: "0.72rem", sm: "0.9rem", md: "1rem" },
                lineHeight: 1.25,
                // Clamp to 2 lines on mobile to keep cards uniform height
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.62rem", sm: "0.75rem", md: "0.85rem" },
                lineHeight: 1.3,
                display: "-webkit-box",
                WebkitLineClamp: { xs: 1, sm: 2 },
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </Typography>
          </>
        )}
      </CardContent>
    </GlassCard>
  );
};
