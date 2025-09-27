import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { formatCurrency } from '@/utils/formaters';

interface SummaryCardsProps {
  incomeStats: {
    total: number;
    count: number;
    average: number;
  };
  expenseStats: {
    total: number;
    count: number;
    average: number;
  };
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ incomeStats, expenseStats }) => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{
          background: 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)',
          color: 'white',
          borderRadius: 2
        }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <TrendingUp sx={{ mr: 1 }} />
              <Typography variant="h6">Total Income</Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {formatCurrency(incomeStats.total)}
            </Typography>
            <Box display="flex" mt={2} justifyContent="space-between">
              <Typography variant="body2">
                {incomeStats.count} Categories
              </Typography>
              <Typography variant="body2">
                Avg: {formatCurrency(incomeStats.average)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{
          background: 'linear-gradient(45deg, #f44336 30%, #e91e63 90%)',
          color: 'white',
          borderRadius: 2
        }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <TrendingDown sx={{ mr: 1 }} />
              <Typography variant="h6">Total Expenses</Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {formatCurrency(expenseStats.total)}
            </Typography>
            <Box display="flex" mt={2} justifyContent="space-between">
              <Typography variant="body2">
                {expenseStats.count} Categories
              </Typography>
              <Typography variant="body2">
                Avg: {formatCurrency(expenseStats.average)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SummaryCards;