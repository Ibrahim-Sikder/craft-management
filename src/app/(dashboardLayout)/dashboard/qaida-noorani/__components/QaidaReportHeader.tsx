import { tableRowCellStyle } from '@/style/customeStyle';
import { TableCell, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

const QaidaReportHeader = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <TableHead>
            <TableRow>
                <TableCell
                    rowSpan={2}
                    align="center"
                    sx={{
                        ...tableRowCellStyle,
                        background: 'linear-gradient(180deg, #e8eaf6 0%, #c5cae9 100%)',
                        fontWeight: 'bold',
                        minWidth: { xs: 70, sm: 100 }
                    }}
                >
                    <Typography variant={isMobile ? "caption" : "body2"} fontWeight="bold">
                        Date/Day
                    </Typography>
                    <Typography variant={isMobile ? "caption" : "caption"} display="block">
                        (তারিখ/বার)
                    </Typography>
                </TableCell>
                <TableCell
                    colSpan={3}
                    align="center"
                    sx={{
                        ...tableRowCellStyle,
                        background: 'linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%)',
                        fontWeight: 'bold'
                    }}
                >
                    <Typography variant={isMobile ? "caption" : "body2"} fontWeight="bold">
                        Subject List
                    </Typography>
                    <Typography variant={isMobile ? "caption" : "caption"} display="block">
                        (মুখস্ত বিষয়াবলী)
                    </Typography>
                </TableCell>
                <TableCell
                    colSpan={2}
                    align="center"
                    sx={{
                        ...tableRowCellStyle,
                        background: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%)',
                        fontWeight: 'bold'
                    }}
                >
                    <Typography variant={isMobile ? "caption" : "body2"} fontWeight="bold">
                        কায়েদা
                    </Typography>
                </TableCell>
                <TableCell
                    colSpan={4}
                    align="center"
                    sx={{
                        ...tableRowCellStyle,
                        background: 'linear-gradient(180deg, #fff3e0 0%, #ffe0b2 100%)',
                        fontWeight: 'bold'
                    }}
                >
                    <Typography variant={isMobile ? "caption" : "body2"} fontWeight="bold">
                        রিভিশন
                    </Typography>
                </TableCell>
                <TableCell
                    sx={{
                        ...tableRowCellStyle,
                        background: 'linear-gradient(180deg, #f3e5f5 0%, #e1bee7 100%)',
                        fontWeight: 'bold'
                    }}
                >
                    <Typography variant={isMobile ? "caption" : "body2"} fontWeight="bold">
                        মাশক্ব
                    </Typography>
                </TableCell>
                <TableCell
                    rowSpan={2}
                    align="center"
                    sx={{
                        ...tableRowCellStyle,
                        background: 'linear-gradient(180deg, #e0f7fa 0%, #b2ebf2 100%)',
                        fontWeight: 'bold',
                        minWidth: { xs: 70, sm: 100 }
                    }}
                >
                    <Typography variant={isMobile ? "caption" : "body2"} fontWeight="bold">
                        মন্তব্য
                    </Typography>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell
                    align="center"
                    sx={{
                        ...tableRowCellStyle,
                        background: 'linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%)',
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                        minWidth: { xs: 80, sm: 120 }
                    }}
                >
                    হাদিস নাম্বার / সূরার নাম
                </TableCell>
                <TableCell
                    align="center"
                    sx={{
                        ...tableRowCellStyle,
                        background: 'linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%)',
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                        minWidth: { xs: 70, sm: 100 }
                    }}
                >
                    দোয়ার নম্বর
                </TableCell>
                <TableCell
                    align="center"
                    sx={{
                        ...tableRowCellStyle,
                        background: 'linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%)',
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                        minWidth: { xs: 70, sm: 100 }
                    }}
                >
                    তাজভীদের বিষয়
                </TableCell>
                <TableCell
                    align="center"
                    sx={{
                        ...tableRowCellStyle,
                        background: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%)',
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                        minWidth: { xs: 60, sm: 80 }
                    }}
                >
                    পৃষ্ঠা
                </TableCell>
                <TableCell
                    align="center"
                    sx={{
                        ...tableRowCellStyle,
                        background: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%)',
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                        minWidth: { xs: 60, sm: 80 }
                    }}
                >
                    পরিমাণ
                </TableCell>
                <TableCell
                    align="center"
                    sx={{
                        ...tableRowCellStyle,
                        background: 'linear-gradient(180deg, #fff3e0 0%, #ffe0b2 100%)',
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                        minWidth: { xs: 60, sm: 80 }
                    }}
                >
                    হাদিস / সূরা
                </TableCell>
                <TableCell
                    align="center"
                    sx={{
                        ...tableRowCellStyle,
                        background: 'linear-gradient(180deg, #fff3e0 0%, #ffe0b2 100%)',
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                        minWidth: { xs: 60, sm: 80 }
                    }}
                >
                    দোয়া
                </TableCell>
                <TableCell
                    align="center"
                    sx={{
                        ...tableRowCellStyle,
                        background: 'linear-gradient(180deg, #fff3e0 0%, #ffe0b2 100%)',
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                        minWidth: { xs: 60, sm: 80 }
                    }}
                >
                    কায়েদা (পৃষ্ঠা)
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default QaidaReportHeader;