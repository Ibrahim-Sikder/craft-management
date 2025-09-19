/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Paper, Typography } from '@mui/material';
import { AttachMoney as MoneyIcon } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CategoryBarChartProps {
  data: any[];
  title: string;
}

const CategoryBarChart: React.FC<CategoryBarChartProps> = ({ data, title }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom display="flex" alignItems="center">
        <MoneyIcon sx={{ mr: 1 }} />
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoryName" />
          <YAxis tickFormatter={(value) => `৳${value}`} />
          <Tooltip formatter={(value) => [`৳${value}`, 'Amount']} />
          <Legend />
          <Bar dataKey="totalAmount" name="Amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CategoryBarChart;