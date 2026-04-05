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
  useMediaQuery,
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <GlassCard sx={{ height: "100%" }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box
          sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 3 } }}
        >
          <Timeline
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
            {/* Income Section */}
            <Box sx={{ mb: { xs: 2, sm: 3 } }}>
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
                <span>Operating Income</span>
                <strong style={{ color: theme.palette.success.main }}>
                  ৳{income?.toLocaleString()}
                </strong>
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
                <span>Admission Fees</span>
                <strong>
                  ৳{breakdown?.totalAdmissionFee?.toLocaleString()}
                </strong>
              </Typography>
            </Box>

            {/* Expense Section */}
            <Box sx={{ mb: { xs: 2, sm: 3 } }}>
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
                <span>Operating Expenses</span>
                <strong style={{ color: theme.palette.error.main }}>
                  ৳{expenses?.toLocaleString()}
                </strong>
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
                <span>Salaries</span>
                <strong>৳{breakdown?.totalSalary?.toLocaleString()}</strong>
              </Typography>
            </Box>

            <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />

            {/* Net Cash Flow */}
            <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
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
                <span>Net Cash Flow</span>
                <strong
                  style={{
                    color:
                      income - expenses >= 0
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  ৳{(income - expenses)?.toLocaleString()}
                </strong>
              </Typography>
            </Box>

            {/* Action Buttons — stack on xs, side-by-side on sm+ */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: { sm: "space-between" },
                gap: { xs: 1, sm: 0 },
                mt: { xs: 2, sm: 3 },
              }}
            >
              <Button
                variant="outlined"
                size={isMobile ? "medium" : "small"}
                startIcon={<Visibility />}
                fullWidth={isMobile}
                sx={{ fontSize: { xs: "0.8rem", sm: "0.75rem" } }}
              >
                Details
              </Button>
              <Button
                variant="contained"
                size={isMobile ? "medium" : "small"}
                startIcon={<Download />}
                fullWidth={isMobile}
                sx={{ fontSize: { xs: "0.8rem", sm: "0.75rem" } }}
              >
                Export
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </GlassCard>
  );
};
