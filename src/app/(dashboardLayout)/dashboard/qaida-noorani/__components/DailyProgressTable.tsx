import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid, Typography } from "@mui/material"
import { DAYS_OF_WEEK } from "@/constant/daysConfig"
import CraftInput from "@/components/Forms/Input"
import CraftSelect from "@/components/Forms/Select"
import { reportStyle } from "@/style/customeStyle"

export default function DailyProgressTable() {
    return (
        <TableContainer component={Paper} sx={{ border: 1, borderColor: "grey.300", mb: 4 }}>
            <Table size="small" sx={{ "& .MuiTableCell-root": { border: 1, borderColor: "grey.300" } }}>
                <TableHead>
                    <TableRow sx={{ bgcolor: "grey.100" }}>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                            Date/Day
                            <br />
                            (তারিখ/বার)
                        </TableCell>
                        <TableCell colSpan={3} align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                            Subject List
                            <br />
                            (মুখস্ত বিষয়াবলী)
                        </TableCell>
                        <TableCell colSpan={2} align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                            কায়েদা
                        </TableCell>
                        <TableCell colSpan={4} align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                            রিভিশন
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: "center", minWidth: 90 }}>
                            মাশক্ব
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: "center", minWidth: 90 }}>
                            তাজভীদ শিক্ষা
                        </TableCell>
                        <TableCell rowSpan={2} align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                            মন্তব্য
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ bgcolor: "grey.100" }}>
                        <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                            হাদিস নাম্বার / সূরার নাম
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                            দোয়ার নম্বর
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                            তাজভীদের বিষয়
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                            পৃষ্ঠা
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                            পরিমাণ
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                            হাদিস / সূরা
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                            দোয়া
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                            তাজবীদ
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                            কায়েদা (পৃষ্ঠা)
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {DAYS_OF_WEEK.map((day) => (
                        <TableRow key={day.key} sx={{ "&:hover": { bgcolor: "grey.50" } }}>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>
                                <Typography variant="body2">{day.name}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    ({day.bangla})
                                </Typography>
                            </TableCell>
                            
                            {/* Subject List Columns */}
                            <TableCell sx={{ p: 0.5 }}>
                                <CraftInput
                                    fullWidth
                                    size="small"
                                    name={`${day.key}HadithNumber`}
                                    placeholder="Hadith/Surah"
                                    variant="standard"
                                    sx={reportStyle}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </TableCell>
                            <TableCell>
                                <CraftInput
                                    name={`${day.key}DuaNumber`}
                                    fullWidth
                                    size="small"
                                    placeholder="Dua No."
                                    InputProps={{ disableUnderline: true }}
                                    sx={reportStyle}
                                    variant="standard"
                                />
                            </TableCell>
                            <TableCell sx={{ p: 0.5 }}>
                                <CraftInput
                                    name={`${day.key}TajweedSubject`}
                                    fullWidth
                                    size="small"
                                    placeholder="Tajweed"
                                    sx={reportStyle}
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                />
                            </TableCell>
                            
                            {/* Qaida Columns */}
                            <TableCell sx={{ p: 0.5 }}>
                                <CraftInput
                                    name={`${day.key}QaidaPage`}
                                    fullWidth
                                    size="small"
                                    InputProps={{ disableUnderline: true }}
                                    sx={reportStyle}
                                    placeholder="Page"
                                    variant="standard"
                                />
                            </TableCell>
                            <TableCell sx={{ p: 0.5 }}>
                                <CraftInput
                                    fullWidth
                                    size="small"
                                    name={`${day.key}PageAmount`}
                                    placeholder="Amount"
                                    variant="standard"
                                    sx={reportStyle}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </TableCell>
                            
                            {/* Revision Columns */}
                            <TableCell sx={{ p: 0.5 }}>
                                <CraftInput
                                    fullWidth
                                    size="small"
                                    name={`${day.key}HadithDuaRevision`}
                                    placeholder="H/D"
                                    variant="standard"
                                    sx={reportStyle}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </TableCell>
                            <TableCell sx={{ p: 0.5 }}>
                                <CraftInput
                                    fullWidth
                                    size="small"
                                    name={`${day.key}DuaRevision`}
                                    placeholder="Dua"
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                    sx={reportStyle}
                                />
                            </TableCell>
                            <TableCell sx={{ p: 0.5 }}>
                                <CraftInput
                                    name={`${day.key}TajweedRevision`}
                                    fullWidth
                                    size="small"
                                    placeholder="Tajweed"
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                    sx={reportStyle}
                                />
                            </TableCell>
                            <TableCell sx={{ p: 0.5 }}>
                                <CraftInput
                                    name={`${day.key}QaidaRevision`}
                                    fullWidth
                                    size="small"
                                    placeholder="Qaida"
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                    sx={reportStyle}
                                />
                            </TableCell>

                            {/* Signature and Comment Columns */}
                            <TableCell sx={{ p: 0.5 }}>
                                <CraftSelect
                                    items={['হ্যাঁ', 'না']}
                                    fullWidth
                                    size="small"
                                    name={`${day.key}TeacherSignature`}
                                    sx={reportStyle}
                                />
                            </TableCell>
                            <TableCell sx={{ p: 0.5 }}>
                                <CraftInput
                                    size="small"
                                    name={`${day.key}TajweedSubject`}
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                    placeholder="তাজভীদ"
                                    sx={reportStyle}
                                />
                            </TableCell>
                            <TableCell sx={{ p: 0.5 }}>
                                <CraftInput
                                    fullWidth
                                    size="small"
                                    name={`${day.key}Comment`}
                                    placeholder="Comment"
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                    sx={reportStyle}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                    
                    {/* Weekly Total Row */}
                    <TableRow sx={{ bgcolor: "grey.100", fontWeight: 600 }}>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>
                            <Typography variant="body2" fontWeight="600">
                                Weekly Total
                            </Typography>
                            <Typography variant="caption">(সপ্তাহে মোট শেখা হয়েছে)</Typography>
                        </TableCell>
                        <TableCell colSpan={10}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6} md={2.4}>
                                    <Typography variant="caption">Total Pages: ____</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4}>
                                    <Typography variant="caption">Total Hadith: ____</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4}>
                                    <Typography variant="caption">Total Duas: ____</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4}>
                                    <Typography variant="caption">Total Tajweed: ____</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4}>
                                    <Typography variant="caption">Total Revision: ____</Typography>
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}