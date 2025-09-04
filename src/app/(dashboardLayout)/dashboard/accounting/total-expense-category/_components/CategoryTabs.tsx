import React from 'react';
import { Paper, Box, Chip } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface CategoryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Paper elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
      <Box display="flex" borderBottom={1} borderColor="divider">
        <Chip
          icon={<TrendingUp />}
          label="Income Categories"
          onClick={() => setActiveTab('income')}
          color={activeTab === 'income' ? 'primary' : 'default'}
          variant={activeTab === 'income' ? 'filled' : 'outlined'}
          sx={{ m: 1, borderRadius: 1 }}
        />
        <Chip
          icon={<TrendingDown />}
          label="Expense Categories"
          onClick={() => setActiveTab('expense')}
          color={activeTab === 'expense' ? 'primary' : 'default'}
          variant={activeTab === 'expense' ? 'filled' : 'outlined'}
          sx={{ m: 1, borderRadius: 1 }}
        />
      </Box>
    </Paper>
  );
};

export default CategoryTabs;