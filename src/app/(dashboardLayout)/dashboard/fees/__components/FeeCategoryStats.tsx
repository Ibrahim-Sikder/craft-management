"use client";

import { Category, School } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

interface FeeCategoryStatsProps {
  totalCategories: number;
  uniqueClasses: number;
  totalFeeAmount: number;
}

const FeeCategoryStats = ({
  totalCategories,
  uniqueClasses,
  totalFeeAmount,
}: FeeCategoryStatsProps) => {
  return (
    <Grid container spacing={3} sx={{ mb: 2 }}>
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <div>
                <Typography variant="h3" fontWeight="bold">
                  {totalCategories}
                </Typography>
                <Typography variant="h6">Total Categories</Typography>
              </div>
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  width: 60,
                  height: 60,
                }}
              >
                <Category sx={{ fontSize: 30 }} />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            color: "white",
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <div>
                <Typography variant="h3" fontWeight="bold">
                  {uniqueClasses}
                </Typography>
                <Typography variant="h6">Classes</Typography>
              </div>
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  width: 60,
                  height: 60,
                }}
              >
                <School sx={{ fontSize: 30 }} />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            color: "white",
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <div>
                <Typography variant="h3" fontWeight="bold">
                  ৳ {totalFeeAmount.toLocaleString()}
                </Typography>
                <Typography variant="h6">Total Fees</Typography>
              </div>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FeeCategoryStats;
