/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
    Card,
    CardContent,
    TextField,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
} from "@mui/material"


 function QaidaNooraniReport({ studentName, reportDate, month }:any) {
    const [weeklyTarget, setWeeklyTarget] = useState("")
    const [dailyEntries, setDailyEntries] = useState({
        saturday: {
            hadithNumber: "",
            duaNumber: "",
            tajweedSubject: "",
            qaidaPage: "",
            pageAmount: "",
            hadithDuaRevision: "",
            duaRevision: "",
            tajweedRevision: "",
            qaidaRevision: "",
            teacherSignature: "",
            comment: "",
        },
        sunday: {
            hadithNumber: "",
            duaNumber: "",
            tajweedSubject: "",
            qaidaPage: "",
            pageAmount: "",
            hadithDuaRevision: "",
            duaRevision: "",
            tajweedRevision: "",
            qaidaRevision: "",
            teacherSignature: "",
            comment: "",
        },
        monday: {
            hadithNumber: "",
            duaNumber: "",
            tajweedSubject: "",
            qaidaPage: "",
            pageAmount: "",
            hadithDuaRevision: "",
            duaRevision: "",
            tajweedRevision: "",
            qaidaRevision: "",
            teacherSignature: "",
            comment: "",
        },
        tuesday: {
            hadithNumber: "",
            duaNumber: "",
            tajweedSubject: "",
            qaidaPage: "",
            pageAmount: "",
            hadithDuaRevision: "",
            duaRevision: "",
            tajweedRevision: "",
            qaidaRevision: "",
            teacherSignature: "",
            comment: "",
        },
        wednesday: {
            hadithNumber: "",
            duaNumber: "",
            tajweedSubject: "",
            qaidaPage: "",
            pageAmount: "",
            hadithDuaRevision: "",
            duaRevision: "",
            tajweedRevision: "",
            qaidaRevision: "",
            teacherSignature: "",
            comment: "",
        },
        thursday: {
            hadithNumber: "",
            duaNumber: "",
            tajweedSubject: "",
            qaidaPage: "",
            pageAmount: "",
            hadithDuaRevision: "",
            duaRevision: "",
            tajweedRevision: "",
            qaidaRevision: "",
            teacherSignature: "",
            comment: "",
        },
        friday: {
            hadithNumber: "",
            duaNumber: "",
            tajweedSubject: "",
            qaidaPage: "",
            pageAmount: "",
            hadithDuaRevision: "",
            duaRevision: "",
            tajweedRevision: "",
            qaidaRevision: "",
            teacherSignature: "",
            comment: "",
        },
    })

    const days = [
        { key: "saturday", name: "Saturday", bangla: "শনিবার" },
        { key: "sunday", name: "Sunday", bangla: "রবিবার" },
        { key: "monday", name: "Monday", bangla: "সোমবার" },
        { key: "tuesday", name: "Tuesday", bangla: "মঙ্গলবার" },
        { key: "wednesday", name: "Wednesday", bangla: "বুধবার" },
        { key: "thursday", name: "Thursday", bangla: "বৃহস্পতিবার" },
        { key: "friday", name: "Friday", bangla: "শুক্রবার" },
    ]

    const updateDayEntry = (day: string, field: string, value: string) => {
        setDailyEntries((prev) => ({
            ...prev,
            [day]: {
                ...prev[day as keyof typeof prev],
                [field]: value,
            },
        }))
    }

    return (
        <Card sx={{ boxShadow: 3, "@media print": { boxShadow: "none", border: "1px solid black" } }}>
            <Box sx={{ textAlign: "center", p: 3, borderBottom: 1, borderColor: "divider" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Craft International Institute
                </Typography>
                <Typography variant="h5" fontWeight="600" color="text.secondary" gutterBottom>
                    Qaida & Noorani Students Daily Report
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    কায়েদা ও নূরানী ছাত্রদের দৈনিক রিপোর্ট
                </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
                <Paper sx={{ p: 3, mb: 4, bgcolor: "grey.50" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                                Student Name (ছাত্রের নাম):
                            </Typography>
                            <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 1, minHeight: 24 }}>
                                <Typography variant="body1">{studentName || "_________________"}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                                Weekly Target (সাপ্তাহিক টার্গেট):
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={weeklyTarget}
                                onChange={(e) => setWeeklyTarget(e.target.value)}
                                placeholder="Enter weekly target"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                                Month (মাস):
                            </Typography>
                            <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 1, minHeight: 24 }}>
                                <Typography variant="body1">{month || "_________________"}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                <TableContainer component={Paper} sx={{ border: 1, borderColor: "grey.300" }}>
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
                                <TableCell rowSpan={2} align="center" sx={{ fontWeight: 600, fontSize: "0.75rem", p: 1 }}>
                                    শিক্ষকের স্বাক্ষর
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
                                    তাজভীদের বিষয়
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
                            {days.map((day) => (
                                <TableRow key={day.key} sx={{ "&:hover": { bgcolor: "grey.50" } }}>
                                    <TableCell align="center" sx={{ fontWeight: 500 }}>
                                        <Typography variant="body2">{day.name}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            ({day.bangla})
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dailyEntries[day.key as keyof typeof dailyEntries].hadithNumber}
                                            onChange={(e) => updateDayEntry(day.key, "hadithNumber", e.target.value)}
                                            placeholder="Hadith/Surah"
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dailyEntries[day.key as keyof typeof dailyEntries].duaNumber}
                                            onChange={(e) => updateDayEntry(day.key, "duaNumber", e.target.value)}
                                            placeholder="Dua No."
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dailyEntries[day.key as keyof typeof dailyEntries].tajweedSubject}
                                            onChange={(e) => updateDayEntry(day.key, "tajweedSubject", e.target.value)}
                                            placeholder="Tajweed"
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dailyEntries[day.key as keyof typeof dailyEntries].qaidaPage}
                                            onChange={(e) => updateDayEntry(day.key, "qaidaPage", e.target.value)}
                                            placeholder="Page"
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dailyEntries[day.key as keyof typeof dailyEntries].pageAmount}
                                            onChange={(e) => updateDayEntry(day.key, "pageAmount", e.target.value)}
                                            placeholder="Amount"
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dailyEntries[day.key as keyof typeof dailyEntries].hadithDuaRevision}
                                            onChange={(e) => updateDayEntry(day.key, "hadithDuaRevision", e.target.value)}
                                            placeholder="H/D"
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dailyEntries[day.key as keyof typeof dailyEntries].duaRevision}
                                            onChange={(e) => updateDayEntry(day.key, "duaRevision", e.target.value)}
                                            placeholder="Dua"
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dailyEntries[day.key as keyof typeof dailyEntries].tajweedRevision}
                                            onChange={(e) => updateDayEntry(day.key, "tajweedRevision", e.target.value)}
                                            placeholder="Tajweed"
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dailyEntries[day.key as keyof typeof dailyEntries].qaidaRevision}
                                            onChange={(e) => updateDayEntry(day.key, "qaidaRevision", e.target.value)}
                                            placeholder="Qaida"
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dailyEntries[day.key as keyof typeof dailyEntries].teacherSignature}
                                            onChange={(e) => updateDayEntry(day.key, "teacherSignature", e.target.value)}
                                            placeholder="Signature"
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ p: 0.5 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={dailyEntries[day.key as keyof typeof dailyEntries].comment}
                                            onChange={(e) => updateDayEntry(day.key, "comment", e.target.value)}
                                            placeholder="Comment"
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            sx={{ "& .MuiInputBase-input": { fontSize: "0.75rem", p: 0.5 } }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
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
            </CardContent>
        </Card>
    )
}

export default QaidaNooraniReport