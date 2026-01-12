// components/common/ReportHeader.tsx
import { Typography, Box, CardHeader, useTheme, useMediaQuery } from "@mui/material";

interface ReportHeaderProps {
  title?: string;
  subtitle?: string;
  subtitleBangla?: string;
}

export function ReportHeader({ title, subtitleBangla }: ReportHeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <CardHeader
      sx={{
        textAlign: "center",
        background: 'linear-gradient(90deg, #1a237e 0%, #3949ab 100%)',
        color: 'white',
        py: { xs: 2, sm: 3, md: 4 },
        borderRadius: 0,
        "@media print": { 
          background: "white", 
          color: "black",
          borderBottom: '2px solid #1a237e'
        },
      }}
      title={
        <Box>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            sx={{ 
              fontWeight: 'bold', 
              color: "inherit",
              mb: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            sx={{ 
              color: "inherit", 
              opacity: 0.9,
              fontWeight: 500
            }}
          >
            {subtitleBangla}
          </Typography>
        </Box>
      }
    />
  );
}