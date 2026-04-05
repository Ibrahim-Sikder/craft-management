/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Box,
  Typography,
  CardContent,
  Divider,
  Chip,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { BarChart } from "@mui/icons-material";
import { GlassCard } from "@/style/customStyle";

export const FinancialHealthMeter = ({
  income,
  expenses,
  profit,
  loading = false,
}: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const profitMargin = income > 0 ? (profit / income) * 100 : 0;
  let healthStatus = "Excellent";
  let healthColor = theme.palette.success.main;

  if (profitMargin < 10) {
    healthStatus = "Poor";
    healthColor = theme.palette.error.main;
  } else if (profitMargin < 20) {
    healthStatus = "Fair";
    healthColor = theme.palette.warning.main;
  } else if (profitMargin < 30) {
    healthStatus = "Good";
    healthColor = theme.palette.info.main;
  }

  // Responsive donut size
  const donutSize = isMobile ? 90 : 120;
  const donutThickness = isMobile ? 3.5 : 4;

  return (
    <GlassCard sx={{ height: "100%" }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box
          sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 3 } }}
        >
          <BarChart
            sx={{
              mr: 1.5,
              color: "primary.main",
              fontSize: { xs: 20, sm: 24 },
            }}
          />
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            component="div"
            sx={{ fontWeight: 700 }}
          >
            Financial Health
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <>
            {/* Donut Chart — responsive size */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: { xs: 2, sm: 3 },
              }}
            >
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  value={profitMargin > 100 ? 100 : profitMargin}
                  size={donutSize}
                  thickness={donutThickness}
                  sx={{ color: healthColor }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    component="div"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "0.9rem", sm: "1.1rem" },
                      lineHeight: 1.2,
                    }}
                  >
                    {profitMargin.toFixed(1)}%
                  </Typography>
                  <Typography
                    component="div"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.6rem", sm: "0.7rem" } }}
                  >
                    Margin
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Health Status Chip */}
            <Box sx={{ textAlign: "center", mb: { xs: 2, sm: 3 } }}>
              <Chip
                label={healthStatus}
                color={
                  healthStatus === "Excellent"
                    ? "success"
                    : healthStatus === "Good"
                      ? "info"
                      : healthStatus === "Fair"
                        ? "warning"
                        : "error"
                }
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "0.75rem", sm: "0.8rem" },
                  height: { xs: 26, sm: 32 },
                }}
              />
            </Box>

            {/* Stats Rows */}
            <Box sx={{ mt: { xs: 1, sm: 3 } }}>
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 0.5,
                  fontSize: { xs: "0.78rem", sm: "0.875rem" },
                }}
              >
                <span>Income:</span>
                <strong>৳{income?.toLocaleString()}</strong>
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 0.5,
                  fontSize: { xs: "0.78rem", sm: "0.875rem" },
                }}
              >
                <span>Expenses:</span>
                <strong>৳{expenses?.toLocaleString()}</strong>
              </Typography>
              <Divider sx={{ my: { xs: 1, sm: 1.5 } }} />
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 0.5,
                  fontWeight: 800,
                  fontSize: { xs: "0.85rem", sm: "0.95rem" },
                }}
              >
                <span>Profit:</span>
                <strong>৳{profit?.toLocaleString()}</strong>
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </GlassCard>
  );
};
