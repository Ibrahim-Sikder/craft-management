import React from 'react';
import { Typography } from '@mui/material';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Typography variant="h4" component="h1" gutterBottom sx={{
      fontWeight: 'bold',
      mb: 3,
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent'
    }}>
      {title}
    </Typography>
  );
};

export default PageTitle;