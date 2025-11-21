"use client";

import { Grid } from "@mui/material";
import { ReactNode } from "react";
import StatsCard from "./StatsCard";

interface StatItem {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradient: string;
  valueColor?: string;
  titleColor?: string;
}

interface StatsGridProps {
  stats: StatItem[];
  spacing?: number;
}

const StatsGrid = ({ stats, spacing = 3 }: StatsGridProps) => {
  return (
    <Grid container spacing={spacing}>
      {stats.map((stat, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <StatsCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            gradient={stat.gradient}
            valueColor={stat.valueColor}
            titleColor={stat.titleColor}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsGrid;
