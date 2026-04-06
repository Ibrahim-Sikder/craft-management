/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography, useTheme } from "@mui/material";

export const GradientTypography = ({
  variant,
  children,
  gradient,
  sx = {},
}: any) => {
  const theme = useTheme();
  const gradientColors =
    gradient ||
    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;
  return (
    <Typography
      variant={variant}
      sx={{
        background: gradientColors,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
        display: "inline-block",
        fontWeight: 700,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};
