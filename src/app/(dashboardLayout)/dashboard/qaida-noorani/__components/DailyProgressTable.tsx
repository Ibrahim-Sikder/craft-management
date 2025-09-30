/* eslint-disable @typescript-eslint/no-unused-vars */
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid, Typography, Box, useTheme, useMediaQuery } from "@mui/material"
import { DAYS_OF_WEEK } from "@/constant/daysConfig"
import CraftInput from "@/components/Forms/Input"
import CraftSelect from "@/components/Forms/Select"
import { reportStyle, tableRowCellStyle } from "@/style/customeStyle"

export default function DailyProgressTable() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    return (
        <Paper elevation={3} sx={{ 
            mb: 4, 
            overflow: 'hidden', 
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.05)'
        }}>
            {/* Header Section */}
            <Box sx={{ 
                background: 'linear-gradient(90deg, #1a237e 0%, #3949ab 100%)', 
                py: { xs: 1.5, sm: 2 }, 
                px: { xs: 2, sm: 3 },
                color: 'white'
            }}>
                <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold" textAlign="center">
                    দৈনিক অগ্রগতি প্রতিবেদন
                </Typography>
                <Typography variant={isMobile ? "body2" : "subtitle1"} textAlign="center" sx={{ opacity: 0.9 }}>
                    Daily Progress Report
                </Typography>
            </Box>
            
            <TableContainer sx={{ 
                overflowX: 'auto',
                maxWidth: '100%'
            }}>
                <Table size="small" sx={{ 
                    "& .MuiTableCell-root": { 
                        border: '1px solid rgba(224, 224, 224, 0.7)',
                        p: { xs: 0.5, sm: 1.2 },
                        fontSize: { xs: '0.7rem', sm: '0.8rem' }
                    }
                }}>
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

                    <TableBody>
                        {DAYS_OF_WEEK.map((day, index) => (
                            <TableRow 
                                key={day.key} 
                                sx={{ 
                                    "&:hover": { 
                                        bgcolor: 'rgba(0, 0, 0, 0.02)' 
                                    },
                                    bgcolor: index % 2 === 0 ? '#ffffff' : '#fafafa'
                                }}
                            >
                                <TableCell 
                                    align="center" 
                                    sx={{ 
                                        fontWeight: 500, 
                                        bgcolor: index % 2 === 0 ? '#f5f7ff' : '#f0f3ff',
                                        borderLeft: '3px solid #3949ab'
                                    }}
                                >
                                    <Typography variant={isMobile ? "caption" : "body2"} fontWeight="600">
                                        {day.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        ({day.bangla})
                                    </Typography>
                                </TableCell>
                                
                                {/* Subject List Columns */}
                                <TableCell sx={{ p: { xs: 0.3, sm: 0.8 }, bgcolor: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                    <CraftInput
                                        fullWidth
                                        size="small"
                                        name={`${day.key}HadithNumber`}
                                        placeholder="Hadith/Surah"
                                        variant="standard"
                                        sx={{ 
                                            ...reportStyle,
                                            '& input': { 
                                                textAlign: 'center',
                                                fontSize: { xs: '0.65rem', sm: '0.8rem' }
                                            }
                                        }}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: { xs: 0.3, sm: 0.8 }, bgcolor: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                    <CraftInput
                                        name={`${day.key}DuaNumber`}
                                        fullWidth
                                        size="small"
                                        placeholder="Dua No."
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ 
                                            ...reportStyle,
                                            '& input': { 
                                                textAlign: 'center',
                                                fontSize: { xs: '0.65rem', sm: '0.8rem' }
                                            }
                                        }}
                                        variant="standard"
                                    />
                                </TableCell>
                                <TableCell sx={{ p: { xs: 0.3, sm: 0.8 }, bgcolor: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                    <CraftInput
                                        name={`${day.key}TajweedSubject`}
                                        fullWidth
                                        size="small"
                                        placeholder="Tajweed"
                                        sx={{ 
                                            ...reportStyle,
                                            '& input': { 
                                                textAlign: 'center',
                                                fontSize: { xs: '0.65rem', sm: '0.8rem' }
                                            }
                                        }}
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>
                                
                                {/* Qaida Columns */}
                                <TableCell sx={{ p: { xs: 0.3, sm: 0.8 }, bgcolor: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                    <CraftInput
                                        name={`${day.key}QaidaPage`}
                                        fullWidth
                                        size="small"
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ 
                                            ...reportStyle,
                                            '& input': { 
                                                textAlign: 'center',
                                                fontSize: { xs: '0.65rem', sm: '0.8rem' }
                                            }
                                        }}
                                        placeholder="Page"
                                        variant="standard"
                                    />
                                </TableCell>
                                <TableCell sx={{ p: { xs: 0.3, sm: 0.8 }, bgcolor: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                    <CraftInput
                                        fullWidth
                                        size="small"
                                        name={`${day.key}PageAmount`}
                                        placeholder="Amount"
                                        variant="standard"
                                        sx={{ 
                                            ...reportStyle,
                                            '& input': { 
                                                textAlign: 'center',
                                                fontSize: { xs: '0.65rem', sm: '0.8rem' }
                                            }
                                        }}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>
                                
                                {/* Revision Columns */}
                                <TableCell sx={{ p: { xs: 0.3, sm: 0.8 }, bgcolor: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                    <CraftInput
                                        fullWidth
                                        size="small"
                                        name={`${day.key}HadithDuaRevision`}
                                        placeholder="H/D"
                                        variant="standard"
                                        sx={{ 
                                            ...reportStyle,
                                            '& input': { 
                                                textAlign: 'center',
                                                fontSize: { xs: '0.65rem', sm: '0.8rem' }
                                            }
                                        }}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: { xs: 0.3, sm: 0.8 }, bgcolor: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                    <CraftInput
                                        fullWidth
                                        size="small"
                                        name={`${day.key}DuaRevision`}
                                        placeholder="Dua"
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ 
                                            ...reportStyle,
                                            '& input': { 
                                                textAlign: 'center',
                                                fontSize: { xs: '0.65rem', sm: '0.8rem' }
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: { xs: 0.3, sm: 0.8 }, bgcolor: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                    <CraftInput
                                        name={`${day.key}TajweedRevision`}
                                        fullWidth
                                        size="small"
                                        placeholder="Tajweed"
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ 
                                            ...reportStyle,
                                            '& input': { 
                                                textAlign: 'center',
                                                fontSize: { xs: '0.65rem', sm: '0.8rem' }
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: { xs: 0.3, sm: 0.8 }, bgcolor: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                    <CraftInput
                                        name={`${day.key}QaidaRevision`}
                                        fullWidth
                                        size="small"
                                        placeholder="Qaida"
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ 
                                            ...reportStyle,
                                            '& input': { 
                                                textAlign: 'center',
                                                fontSize: { xs: '0.65rem', sm: '0.8rem' }
                                            }
                                        }}
                                    />
                                </TableCell>

                                {/* Signature and Comment Columns */}
                                <TableCell sx={{ p: { xs: 0.3, sm: 0.8 }, bgcolor: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                    <CraftSelect
                                        items={['হ্যাঁ', 'না']}
                                        fullWidth
                                        size="small"
                                        name={`${day.key}TeacherSignature`}
                                        sx={{ 
                                            ...reportStyle,
                                            '& .MuiSelect-select': { 
                                                textAlign: 'center',
                                                fontSize: { xs: '0.65rem', sm: '0.8rem' }
                                            }
                                        }}
                                    />
                                </TableCell>
                                
                                <TableCell sx={{ p: { xs: 0.3, sm: 0.8 }, bgcolor: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                    <CraftInput
                                        fullWidth
                                        size="small"
                                        name={`${day.key}Comment`}
                                        placeholder="Comment"
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ 
                                            ...reportStyle,
                                            '& input': { 
                                                textAlign: 'center',
                                                fontSize: { xs: '0.65rem', sm: '0.8rem' }
                                            }
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        
                        {/* Weekly Total Row */}
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
                    </TableBody>
                </Table>
            </TableContainer>
            
            {/* Footer Section */}
            <Box sx={{ 
                background: 'linear-gradient(90deg, #1a237e 0%, #3949ab 100%)', 
                py: { xs: 0.8, sm: 1 }, 
                px: { xs: 2, sm: 3 },
                color: 'white',
                textAlign: 'center'
            }}>
                <Typography variant={isMobile ? "caption" : "caption"}>
                    শিক্ষার্থীর স্বাক্ষর: ________________ &nbsp;&nbsp;&nbsp;&nbsp; শিক্ষকের স্বাক্ষর: ________________
                </Typography>
            </Box>
        </Paper>
    )
}