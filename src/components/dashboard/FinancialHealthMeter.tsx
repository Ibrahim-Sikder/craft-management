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

  return (
    <GlassCard sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <BarChart sx={{ mr: 1.5, color: "primary.main" }} />
          <Typography variant="h6" component="div">
            Financial Health
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  value={profitMargin > 100 ? 100 : profitMargin}
                  size={120}
                  thickness={4}
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
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 800 }}
                  >
                    {profitMargin.toFixed(1)}%
                  </Typography>
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    Margin
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ textAlign: "center", mb: 2 }}>
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
                sx={{ fontWeight: 700 }}
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Income:</span>{" "}
                <strong>৳{income?.toLocaleString()}</strong>
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Expenses:</span>{" "}
                <strong>৳{expenses?.toLocaleString()}</strong>
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 800,
                }}
              >
                <span>Profit:</span>{" "}
                <strong>৳{profit?.toLocaleString()}</strong>
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </GlassCard>
  );
};
