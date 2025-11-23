"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradient: string;
  valueColor?: string;
  titleColor?: string;
}

const StatsCard = ({
  title,
  value,
  icon,
  gradient,
  valueColor = "white",
  titleColor = "rgba(255,255,255,0.8)",
}: StatsCardProps) => {
  return (
    <Card
      sx={{
        background: gradient,
        color: "white",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography color={titleColor} variant="body2" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: valueColor,
              }}
            >
              {value}
            </Typography>
          </Box>
          <Box sx={{ opacity: 0.7 }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
