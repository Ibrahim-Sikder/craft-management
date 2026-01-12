// components/tables/Daily/ReportTableBody.tsx
import CraftInput from '@/components/Forms/Input';
import { DAYS_OF_WEEK } from '@/constant/daysConfig';
import { reportInput } from '@/style/customeStyle';
import { TableBody, TableCell, TableRow, Typography, useTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import TableFooter from './TableFooter';

const ReportTableBody = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    

    return (
        <TableBody>
            {DAYS_OF_WEEK.map((day, index) => (
                <TableRow 
                    key={day.key} 
                    sx={{ 
                        "&:hover": { 
                            bgcolor: "rgba(63, 81, 181, 0.05)" 
                        },
                        bgcolor: index % 2 === 0 ? '#ffffff' : '#f9fafc',
                        transition: 'background-color 0.2s ease'
                    }}
                >
                    <TableCell 
                        sx={{ 
                            fontWeight: 500, 
                            textAlign: "center",
                            bgcolor: index % 2 === 0 ? '#f5f7ff' : '#f0f3ff',
                            borderLeft: '3px solid #3949ab',
                            py: { xs: 1, sm: 1.5 }
                        }}
                    >
                        <Typography variant={isMobile ? "caption" : "body2"} fontWeight="600">
                            {day.name}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="text.secondary">
                            ({day.bangla})
                        </Typography>
                    </TableCell>
                    {/* Sobok Column */}
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}SobokPara`}
                            size="medium"
                            placeholder="Para"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}SobokPage`}
                            placeholder="Page"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}SobokAmount`}
                            size="small"
                            placeholder="amount"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}SobokWrong`}
                            size="small"
                            placeholder="wrong"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                    {/* Sat Sobok Column */}
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}SatSobokPara`}
                            size="small"
                            placeholder="Para"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}SatSobokPage`}
                            size="small"
                            placeholder="Page"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}SatSobokAmount`}
                            size="small"
                            placeholder="amount"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}SatSobokWrong`}
                            size="small"
                            placeholder="wrong"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                    {/* Sabak Amukta Column */}
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}SabakAmuktaPara`}
                            size="small"
                            placeholder="para"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}SabakAmuktaPage`}
                            size="small"
                            placeholder="page"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}SabakAmuktaAmount`}
                            size="small"
                            placeholder="amount"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}SabakAmuktaWrong`}
                            size="small"
                            placeholder="wrong"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                    {/* Tilawat Column */}
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}TilawaAmount`}
                            size="small"
                            placeholder="Tilawat"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                    {/* Mashq Column (Yes/No) */}
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}Mashq`}
                            size="small"
                            placeholder="মাশক্ব"
                          sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                       
                    </TableCell>
                    {/* Tajweed Column */}
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}Tajweed`}
                            size="small"
                            placeholder="তাজভীদ"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                    {/* Thursday Weekly Revision Column */}
                    <TableCell sx={{ p: { xs: 0.3, sm: 0.5 } }}>
                        <CraftInput
                            name={`${day.key}ThursdayWeeklyRevision`}
                            size="small"
                            placeholder="Revision"
                            sx={{
                                ...reportInput,
                                '& input': { 
                                    textAlign: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        />
                    </TableCell>
                </TableRow>
            ))}
            <TableFooter />
        </TableBody>
    );
};

export default ReportTableBody;