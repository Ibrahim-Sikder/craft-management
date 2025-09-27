/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Category as CategoryIcon } from '@mui/icons-material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/formaters';

interface CategoryPieChartProps {
  data: any[];
  title: string;
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data, title }) => {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper elevation={3} sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography variant="body2" fontWeight="bold">{payload[0].payload.categoryName}</Typography>
          <Typography variant="body2">Amount: {formatCurrency(payload[0].value)}</Typography>
          <Typography variant="body2">Transactions: {payload[0].payload.count}</Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom display="flex" alignItems="center">
        <CategoryIcon sx={{ mr: 1 }} />
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="totalAmount"
            nameKey="categoryName"
          >
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CategoryPieChart;