import { Grid2 as Grid } from "@mui/material";
import FeeSummaryCard from "./FeeSummaryCard";
import { StatCardProps } from "@/interface/fees";

export interface StatsGridProps {
  stats: StatCardProps[];
  spacing?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const StatsGrid = ({
  stats,
  spacing = 2,
  xs = 12,
  sm = 6,
  md = 4,
  lg = 2,
  xl,
}: StatsGridProps) => {
  return (
    <Grid container spacing={spacing}>
      {stats.map((stat, index) => (
        <Grid
          size={{
            xs,
            sm,
            md,
            lg,
            xl: xl || lg,
          }}
          key={`${stat.title}-${index}`}
        >
          <FeeSummaryCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsGrid;
