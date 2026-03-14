/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Box,
  Typography,
  CardContent,
  Chip,
  CircularProgress,
  alpha,
  useTheme,
} from "@mui/material";
import { Balance } from "@mui/icons-material";
import { GlassCard } from "@/style/customStyle";

export const EquationCheck = ({
  assets,
  liabilities,
  equity,
  isValid,
  loading = false,
}: any) => {
  const theme = useTheme();

  return (
    <GlassCard
      sx={{
        mb: 3,
        background: isValid
          ? `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.03)} 100%)`
          : `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)} 0%, ${alpha(theme.palette.error.main, 0.03)} 100%)`,
        border: `1px solid ${isValid ? alpha(theme.palette.success.main, 0.2) : alpha(theme.palette.error.main, 0.2)}`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Balance
            sx={{ mr: 1.5, color: isValid ? "success.main" : "error.main" }}
          />
          <Typography variant="h6" component="div">
            Accounting Equation Check
          </Typography>
          {!loading && (
            <Chip
              label={isValid ? "Balanced" : "Not Balanced"}
              color={isValid ? "success" : "error"}
              size="small"
              sx={{ ml: 2, fontWeight: 600 }}
            />
          )}
        </Box>

        {loading ? (
          <Box>
            <Box
              sx={{
                width: "80%",
                height: 20,
                bgcolor: alpha(theme.palette.text.primary, 0.1),
                borderRadius: 1,
                mb: 2,
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress size={30} />
            </Box>
          </Box>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The fundamental accounting equation:{" "}
              <strong>Assets = Liabilities + Equity</strong>
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: "primary.main" }}
              >
                ৳{assets?.toLocaleString()}
              </Typography>
              <Typography variant="h6" sx={{ mx: 1, fontWeight: 700 }}>
                =
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: "warning.main" }}
              >
                ৳{liabilities?.toLocaleString()}
              </Typography>
              <Typography variant="h6" sx={{ mx: 1, fontWeight: 700 }}>
                +
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: "secondary.main" }}
              >
                ৳{equity?.toLocaleString()}
              </Typography>
            </Box>
            {!isValid && (
              <Typography
                variant="caption"
                color="error"
                sx={{
                  mt: 2,
                  display: "block",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                There is a discrepancy in the accounting equation that needs
                attention.
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </GlassCard>
  );
};
