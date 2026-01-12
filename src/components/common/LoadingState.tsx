import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingState: React.FC = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
    <Typography sx={{ ml: 2 }}>Loading reports...</Typography>
  </Box>
);