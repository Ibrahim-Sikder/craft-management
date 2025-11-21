import { Box, Grid, TableCell, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

const QaidaReportFooter = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <TableRow sx={{
            background: 'linear-gradient(90deg, #f5f5f5 0%, #eeeeee 100%)',
            borderTop: '2px solid rgba(0,0,0,0.1)',
            borderBottom: '2px solid rgba(0,0,0,0.1)'
        }}>
            <TableCell
                align="center"
                sx={{
                    fontWeight: 'bold',
                    color: '#1a237e',
                    borderLeft: '3px solid #1a237e'
                }}
            >
                <Typography variant={isMobile ? "caption" : "body2"} fontWeight="bold">
                    Weekly Total
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                    (সপ্তাহে মোট শেখা হয়েছে)
                </Typography>
            </TableCell>
            <TableCell colSpan={10}>
                <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ py: 1 }}>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Box sx={{
                            p: { xs: 0.5, sm: 1 },
                            bgcolor: 'rgba(63, 81, 181, 0.1)',
                            borderRadius: 1,
                            textAlign: 'center'
                        }}>
                            <Typography variant={isMobile ? "caption" : "caption"} fontWeight="bold" color="#1a237e">
                                Total Pages: ____
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Box sx={{
                            p: { xs: 0.5, sm: 1 },
                            bgcolor: 'rgba(76, 175, 80, 0.1)',
                            borderRadius: 1,
                            textAlign: 'center'
                        }}>
                            <Typography variant={isMobile ? "caption" : "caption"} fontWeight="bold" color="#2e7d32">
                                Total Hadith: ____
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Box sx={{
                            p: { xs: 0.5, sm: 1 },
                            bgcolor: 'rgba(255, 152, 0, 0.1)',
                            borderRadius: 1,
                            textAlign: 'center'
                        }}>
                            <Typography variant={isMobile ? "caption" : "caption"} fontWeight="bold" color="#e65100">
                                Total Duas: ____
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Box sx={{
                            p: { xs: 0.5, sm: 1 },
                            bgcolor: 'rgba(156, 39, 176, 0.1)',
                            borderRadius: 1,
                            textAlign: 'center'
                        }}>
                            <Typography variant={isMobile ? "caption" : "caption"} fontWeight="bold" color="#6a1b9a">
                                Total Tajweed: ____
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Box sx={{
                            p: { xs: 0.5, sm: 1 },
                            bgcolor: 'rgba(0, 188, 212, 0.1)',
                            borderRadius: 1,
                            textAlign: 'center'
                        }}>
                            <Typography variant={isMobile ? "caption" : "caption"} fontWeight="bold" color="#00838f">
                                Total Revision: ____
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </TableCell>
        </TableRow>
    );
};

export default QaidaReportFooter;