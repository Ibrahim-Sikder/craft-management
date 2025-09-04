'use client'

import React, { useState } from 'react';
import { Box, Grid, useTheme, useMediaQuery } from '@mui/material';
import { useGetTotalExpenseCategoryQuery } from '@/redux/api/expenseApi';
import { useGetTotalIncomeCategoryQuery } from '@/redux/api/incomeApi';
import LoadingSpinner from '@/components/LoadingSpinner';
import { calculateStats, processCategoryData } from '@/utils/dataProcessors';
import PageTitle from './PageTitle';
import SummaryCards from './SummaryCards';
import CategoryTabs from './CategoryTabs';
import CategoryPieChart from './CategoryPieChart';
import CategoryBarChart from './CategoryBarChart';
import CategoryList from './CategoryList';

const CategoryAnalysisDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState('income');
  
  // API calls
  const { data: expenseCategories, isLoading: expenseLoading } = useGetTotalExpenseCategoryQuery({
    page: 1,
    limit: 10,
    searchTerm: "",
  });

  const { data: incomeCategories, isLoading: incomeLoading } = useGetTotalIncomeCategoryQuery({
    page: 1,
    limit: 10,
    searchTerm: "",
  });

  // Process data
  const incomeData = processCategoryData(incomeCategories?.data || [], 'income');
  const expenseData = processCategoryData(expenseCategories?.data || [], 'expense');
  
  // Calculate statistics
  const incomeStats = calculateStats(incomeData);
  const expenseStats = calculateStats(expenseData);

  if (expenseLoading || incomeLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <Box sx={{ p: isMobile ? 1 : 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <PageTitle title="Financial Category Analysis" />
      
      <SummaryCards incomeStats={incomeStats} expenseStats={expenseStats} />
      
      <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <CategoryPieChart 
            data={activeTab === 'income' ? incomeData : expenseData} 
            title={`${activeTab === 'income' ? 'Income' : 'Expense'} Distribution`}
          />
        </Grid>
        
        <Grid item xs={12} md={7}>
          <CategoryBarChart 
            data={activeTab === 'income' ? incomeData : expenseData} 
            title={`${activeTab === 'income' ? 'Income' : 'Expense'} by Category`}
          />
        </Grid>
        
        <Grid item xs={12}>
          <CategoryList 
            data={activeTab === 'income' ? incomeData : expenseData} 
            type={activeTab}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryAnalysisDashboard;