/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Box,
  Typography,
  CardContent,
  Divider,
  Button,
  CircularProgress,
  alpha,
  useTheme,
} from "@mui/material";
import { Timeline, Visibility, Download } from "@mui/icons-material";
import { GlassCard } from "@/style/customStyle";

export const CashFlowSummary = ({
  income,
  expenses,
  breakdown,
  loading = false,
}: any) => {
  const theme = useTheme();

  return (
    <GlassCard sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Timeline sx={{ mr: 1.5, color: "primary.main" }} />
          <Typography variant="h6" component="div">
            Cash Flow Summary
          </Typography>
        </Box>

        {loading ? (
          <Box>
            <Box
              sx={{
                width: "100%",
                height: 20,
                bgcolor: alpha(theme.palette.text.primary, 0.1),
                borderRadius: 1,
                mb: 2,
              }}
            />
            <Box
              sx={{
                width: "80%",
                height: 16,
                bgcolor: alpha(theme.palette.text.primary, 0.1),
                borderRadius: 1,
                mb: 3,
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress size={30} />
            </Box>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Operating Income</span>
                <strong style={{ color: theme.palette.success.main }}>
                  ৳{income?.toLocaleString()}
                </strong>
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Admission Fees</span>
                <strong>
                  ৳{breakdown?.totalAdmissionFee?.toLocaleString()}
                </strong>
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Operating Expenses</span>
                <strong style={{ color: theme.palette.error.main }}>
                  ৳{expenses?.toLocaleString()}
                </strong>
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Salaries</span>
                <strong>৳{breakdown?.totalSalary?.toLocaleString()}</strong>
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 800,
                }}
              >
                <span>Net Cash Flow</span>
                <strong
                  style={{
                    color:
                      income - expenses >= 0
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                  }}
                >
                  ৳{(income - expenses)?.toLocaleString()}
                </strong>
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                variant="outlined"
                size="small"
                startIcon={<Visibility />}
              >
                Details
              </Button>
              <Button variant="contained" size="small" startIcon={<Download />}>
                Export
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </GlassCard>
  );
};
