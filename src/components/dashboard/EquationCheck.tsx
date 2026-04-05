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
  useMediaQuery,
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <GlassCard
      sx={{
        mb: { xs: 2, sm: 3 },
        background: isValid
          ? `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.03)} 100%)`
          : `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)} 0%, ${alpha(theme.palette.error.main, 0.03)} 100%)`,
        border: `1px solid ${
          isValid
            ? alpha(theme.palette.success.main, 0.2)
            : alpha(theme.palette.error.main, 0.2)
        }`,
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: { xs: 1.5, sm: 2 },
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Balance
            sx={{
              mr: 1,
              color: isValid ? "success.main" : "error.main",
              fontSize: { xs: 20, sm: 24 },
            }}
          />
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            component="div"
            sx={{ fontWeight: 700, flexGrow: 1 }}
          >
            Accounting Equation Check
          </Typography>
          {!loading && (
            <Chip
              label={isValid ? "Balanced" : "Not Balanced"}
              color={isValid ? "success" : "error"}
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
              }}
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
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: { xs: 1.5, sm: 2 },
                fontSize: { xs: "0.78rem", sm: "0.875rem" },
              }}
            >
              The fundamental accounting equation:{" "}
              <strong>Assets = Liabilities + Equity</strong>
            </Typography>

            {/* Equation Values — responsive sizes */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 0.5, sm: 1 },
                py: { xs: 1, sm: 0 },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "primary.main",
                  fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
                }}
              >
                ৳{assets?.toLocaleString()}
              </Typography>
              <Typography
                sx={{
                  mx: { xs: 0.5, sm: 1 },
                  fontWeight: 700,
                  fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
                }}
              >
                =
              </Typography>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "warning.main",
                  fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
                }}
              >
                ৳{liabilities?.toLocaleString()}
              </Typography>
              <Typography
                sx={{
                  mx: { xs: 0.5, sm: 1 },
                  fontWeight: 700,
                  fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
                }}
              >
                +
              </Typography>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "secondary.main",
                  fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
                }}
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
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
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
