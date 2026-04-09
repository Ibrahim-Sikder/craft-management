/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatCardProps } from "@/interface/fees";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  alpha,
  useTheme,
  Skeleton,
} from "@mui/material";

const FeeSummaryCard = ({
  title,
  value,
  icon,
  color,
  subtitle,
  variant = "default",
  loading = false,
  onClick,
}: StatCardProps) => {
  const theme = useTheme();
  const finalColor = color || theme.palette.primary.main;

  const getVariantStyles = () => {
    switch (variant) {
      case "compact":
        return {
          card: { p: "12px !important" },
          title: { variant: "caption" as const, fontSize: "0.7rem" },
          value: { variant: "h6" as const, fontSize: "1.1rem" },
          iconBox: { p: 1 },
        };
      case "large":
        return {
          card: { p: "24px !important" },
          title: { variant: "subtitle2" as const, fontSize: "0.9rem" },
          value: { variant: "h4" as const, fontSize: "2rem" },
          iconBox: { p: 2 },
        };
      default:
        return {
          card: { p: "16px !important" },
          title: { variant: "caption" as const, fontSize: "0.75rem" },
          value: { variant: "h5" as const, fontSize: "1.5rem" },
          iconBox: { p: 1.5 },
        };
    }
  };

  const styles = getVariantStyles();

  if (loading) {
    return (
      <Card
        sx={{
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <CardContent sx={styles.card}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant={styles.title.variant}
                color="text.secondary"
                fontWeight={500}
              >
                {title}
              </Typography>
              <Skeleton
                variant="text"
                width="80%"
                sx={{ mt: 0.5, fontSize: "1.5rem" }}
              />
              {subtitle && (
                <Skeleton variant="text" width="60%" sx={{ mt: 0.5 }} />
              )}
            </Box>
            <Box
              sx={{
                p: styles.iconBox.p,
                borderRadius: "50%",
                bgcolor: alpha(finalColor, 0.1),
                flexShrink: 0,
              }}
            >
              {icon}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: "100%",
        background: `linear-gradient(135deg, ${alpha(finalColor, 0.1)} 0%, ${alpha(finalColor, 0.02)} 100%)`,
        borderLeft: `4px solid ${finalColor}`,
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? {
              transform: "translateY(-4px)",
              boxShadow: theme.shadows[8],
              background: `linear-gradient(135deg, ${alpha(finalColor, 0.15)} 0%, ${alpha(finalColor, 0.05)} 100%)`,
            }
          : {
              transform: "translateY(-2px)",
              boxShadow: theme.shadows[4],
            },
      }}
      onClick={onClick}
    >
      <CardContent sx={styles.card}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant={styles.title.variant}
              color="text.secondary"
              fontWeight={500}
            >
              {title}
            </Typography>
            <Typography
              variant={styles.value.variant}
              fontWeight="bold"
              sx={{ mt: 0.5, lineHeight: 1.2 }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.5, display: "block" }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              p: styles.iconBox.p,
              borderRadius: "50%",
              bgcolor: alpha(finalColor, 0.15),
              color: finalColor,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FeeSummaryCard;
