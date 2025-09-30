/* eslint-disable @typescript-eslint/no-unused-vars */
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid, Typography, Box, useTheme, useMediaQuery } from "@mui/material"
import { DAYS_OF_WEEK } from "@/constant/daysConfig"
import CraftInput from "@/components/Forms/Input"
import CraftSelect from "@/components/Forms/Select"
import { reportStyle, tableRowCellStyle } from "@/style/customeStyle"
import QaidaReportHeader from "./QaidaReportHeader"
import QaidaReportFooter from "./QaidaReportFooter"

export default function DailyProgressTable() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                    <QaidaReportHeader />

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

                        <QaidaReportFooter />
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