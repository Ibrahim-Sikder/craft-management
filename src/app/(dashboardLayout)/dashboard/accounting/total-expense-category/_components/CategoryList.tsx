/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, Chip, Box } from '@mui/material';
import { List as ListIcon } from '@mui/icons-material';
import { formatCurrency } from '@/utils/formaters';

interface CategoryListProps {
  data: any[];
  type: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ data, type }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom display="flex" alignItems="center">
        <ListIcon sx={{ mr: 1 }} />
        {type === 'income' ? 'Income' : 'Expense'} Category Details
      </Typography>
      <List>
        {data.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemIcon>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: item.fill
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.categoryName}
                secondary={`${formatCurrency(item.totalAmount)} • ${item.count} transactions`}
              />
              <Chip
                label={formatCurrency(item.totalAmount)}
                color={type === 'income' ? 'success' : 'error'}
                variant="outlined"
              />
            </ListItem>
            {index < data.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default CategoryList;