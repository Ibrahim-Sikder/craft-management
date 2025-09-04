/* eslint-disable @typescript-eslint/no-explicit-any */
// Color palettes
const incomeColors = ['#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#f44336', '#e91e63', '#9c27b0'];
const expenseColors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50'];

// Process category data with colors
export const processCategoryData = (data: any[], type: 'income' | 'expense') => {
  const colors = type === 'income' ? incomeColors : expenseColors;
  
  return data.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length]
  }));
};

// Calculate statistics
export const calculateStats = (data: any[]) => {
  const total = data.reduce((sum: number, item: any) => sum + item.totalAmount, 0);
  const count = data.reduce((sum: number, item: any) => sum + item.count, 0);
  const average = total / (count || 1);

  return { total, count, average };
};

// Format currency
export const formatCurrency = (amount: any) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};