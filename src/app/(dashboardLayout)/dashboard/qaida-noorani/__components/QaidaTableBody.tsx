import { TableRow, TableCell, Typography, useTheme, useMediaQuery, } from "@mui/material"
import { DAYS_OF_WEEK } from "@/constant/daysConfig"
import CraftInput from "@/components/Forms/Input"
import CraftSelect from "@/components/Forms/Select"
import { reportStyle } from "@/style/customeStyle"

export const QaidaTableBody = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
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
        </>
    )
}
