/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    TextField,
    Typography,
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    MenuItem,
    Button,
} from "@mui/material"

function HifzReport({ studentName, reportDate, month }: any) {
    const [weeklyTarget, setWeeklyTarget] = useState("")
    const [dailyEntries, setDailyEntries] = useState({
        saturday: {
            sobok: { para: "", page: "" },
            sabakSeven: { para: "", page: "" },
            sabakAmukta: { para: "", page: "" },
            satSobok: { para: "", page: "", amount: "", wrong: "" },
            tilawaAmount: "",
            mashq: "",
            tajweed: "",
            teacherSignature: "",
            thursdayWeeklyRevision: "",
        },
        sunday: {
            sobok: { para: "", page: "" },
            sabakSeven: { para: "", page: "" },
            sabakAmukta: { para: "", page: "" },
            satSobok: { para: "", page: "", amount: "", wrong: "" },
            tilawaAmount: "",
            mashq: "",
            tajweed: "",
            teacherSignature: "",
            thursdayWeeklyRevision: "",
        },
        monday: {
            sobok: { para: "", page: "" },
            sabakSeven: { para: "", page: "" },
            sabakAmukta: { para: "", page: "" },
            satSobok: { para: "", page: "", amount: "", wrong: "" },
            tilawaAmount: "",
            mashq: "",
            tajweed: "",
            teacherSignature: "",
            thursdayWeeklyRevision: "",
        },
        tuesday: {
            sobok: { para: "", page: "" },
            sabakSeven: { para: "", page: "" },
            sabakAmukta: { para: "", page: "" },
            satSobok: { para: "", page: "", amount: "", wrong: "" },
            tilawaAmount: "",
            mashq: "",
            tajweed: "",
            teacherSignature: "",
            thursdayWeeklyRevision: "",
        },
        wednesday: {
            sobok: { para: "", page: "" },
            sabakSeven: { para: "", page: "" },
            sabakAmukta: { para: "", page: "" },
            satSobok: { para: "", page: "", amount: "", wrong: "" },
            tilawaAmount: "",
            mashq: "",
            tajweed: "",
            teacherSignature: "",
            thursdayWeeklyRevision: "",
        },
        thursday: {
            sobok: { para: "", page: "" },
            sabakSeven: { para: "", page: "" },
            sabakAmukta: { para: "", page: "" },
            satSobok: { para: "", page: "", amount: "", wrong: "" },
            tilawaAmount: "",
            mashq: "",
            tajweed: "",
            teacherSignature: "",
            thursdayWeeklyRevision: "",
        },
        friday: {
            sobok: { para: "", page: "" },
            sabakSeven: { para: "", page: "" },
            sabakAmukta: { para: "", page: "" },
            satSobok: { para: "", page: "", amount: "", wrong: "" },
            tilawaAmount: "",
            mashq: "",
            tajweed: "",
            teacherSignature: "",
            thursdayWeeklyRevision: "",
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

    const updateDayEntry = (day: string, section: string, field: string, value: string) => {
        setDailyEntries((prev) => ({
            ...prev,
            [day]: {
                ...prev[day as keyof typeof prev],
                [section]:
                    section === "sobok" || section === "sabakSeven" || section === "sabakAmukta" || section === "satSobok"
                        ? { ...prev[day as keyof typeof prev][section as "sobok" | "sabakSeven" | "sabakAmukta" | "satSobok"], [field]: value }
                        : value,
            },
        }))
    }

    return (
        <Card sx={{ boxShadow: "none", "@media print": { boxShadow: "none", border: 0 } }}>
            <CardHeader
                sx={{
                    textAlign: "center",
                    borderBottom: 1,
                    borderColor: "divider",
                    "@media print": { borderColor: "black" },
                }}
                title={
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
                            Craft International Institute
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}>
                           Soboki Hifz Students Daily Report
                        </Typography>
                        <Typography variant="h6" sx={{ color: "text.secondary" }}>
                           সবকি হিফজ শিক্ষার্থীদের দৈনিক রিপোর্ট
                        </Typography>
                    </Box>
                }
            />

            <CardContent sx={{ p: 3 }}>
                {/* Student Information */}
               <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            bgcolor: "grey.50",
            "@media print": { bgcolor: "transparent", border: 1, borderColor: "black" },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Teacher Name (শিক্ষকের নাম):
              </Typography>
              <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 0.5, minHeight: 24 }}>
                {studentName || "_________________"}
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Student Name (শিক্ষার্থীর নাম):
              </Typography>
              <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 0.5, minHeight: 24 }}>
                {studentName || "_________________"}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Date (তারিখ):
              </Typography>
              <Box sx={{ borderBottom: 1, borderColor: "grey.400", pb: 0.5, minHeight: 24 }}>
                {reportDate || "_________________"}
              </Box>
            </Grid>
          </Grid>
        </Paper>
                {/* Daily Entries Table */}
                <Box sx={{ width: '100%', overflow: 'auto' }}>
                    <TableContainer component={Paper} sx={{ minWidth: 1200, '@media print': { minWidth: '100%' } }}>
                        <Table
                            size="small"
                            sx={{
                                border: 1,
                                borderColor: "grey.300",
                                "@media print": { borderColor: "black" },
                                "& .MuiTableCell-root": {
                                    border: 1,
                                    borderColor: "grey.300",
                                    "@media print": { borderColor: "black" },
                                    fontSize: "0.75rem",
                                    p: 0.5,
                                    minWidth: 60,
                                },
                            }}
                        >
                            <TableHead>
                                <TableRow sx={{ bgcolor: "grey.100", "@media print": { bgcolor: "transparent" } }}>
                                    <TableCell sx={{ fontWeight: 600, textAlign: "center", minWidth: 80 }}>
                                        Day
                                        <br />
                                        (বার)
                                    </TableCell>
                                    <TableCell colSpan={2} sx={{ fontWeight: 600, textAlign: "center", minWidth: 100 }}>
                                        Sobok
                                        <br />
                                        (সবক)
                                    </TableCell>
                                    <TableCell colSpan={4} sx={{ fontWeight: 600, textAlign: "center" }}>
                                        Sat Sobok
                                        <br />
                                        (সাত সবক)
                                    </TableCell>
                                    <TableCell colSpan={4} sx={{ fontWeight: 600, textAlign: "center" }}>
                                        Sabak Amukta
                                        <br />
                                        (সবক আমুক্তা)
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: "center", minWidth: 70 }}>
                                        Tilawat
                                        <br />
                                        (তিলাওয়াত)
                                    </TableCell>

                                    <TableCell sx={{ fontWeight: 600, textAlign: "center", minWidth: 90 }}>
                                        মাশক্ব
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: "center", minWidth: 90 }}>
                                        তাজভীদ শিক্ষা
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: "center", minWidth: 100 }}>
                                        Thursday Weekly Revision
                                        <br />
                                        (বৃহস্পতিবার সাপ্তাহিক শবনা রিভিশন)
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ bgcolor: "grey.50", "@media print": { bgcolor: "transparent" } }}>
                                    <TableCell></TableCell>
                                    <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                                        Para
                                        <br />
                                        (পারা)
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                                        Page No
                                        <br />
                                        (পৃষ্ঠা নং)
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                                        Para
                                        <br />
                                        (পারা)
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                                        Page No
                                        <br />
                                        (পৃষ্ঠা নং)
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                                        Amount
                                        <br />
                                        (পরিমাণ)
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                                        Wrong/Vul
                                        <br />
                                        (ভুল)
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                                        Para
                                        <br />
                                        (পারা)
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                                        Page No
                                        <br />
                                        (পৃষ্ঠা নং)
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                                        Amount
                                        <br />
                                        (পরিমাণ)
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                                        Wrong/Vul
                                        <br />
                                        (ভুল)
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                                        Amount
                                        <br />
                                        (পরিমাণ)
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell sx={{ fontSize: "0.7rem", textAlign: "center" }}>
                                        হ্যাঁ/না
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {days.map((day) => (
                                    <TableRow key={day.key} sx={{ "&:hover": { bgcolor: "grey.50" } }}>
                                        <TableCell sx={{ fontWeight: 500, textAlign: "center" }}>
                                            {day.name}
                                            <br />
                                            <Typography variant="caption" color="text.secondary">
                                                ({day.bangla})
                                            </Typography>
                                        </TableCell>
                                        {/* Sobok Column */}
                                        <TableCell sx={{ p: 0.5 }}>
                                            <TextField
                                                size="small"
                                                value={dailyEntries[day.key as keyof typeof dailyEntries].sobok.para}
                                                onChange={(e) => updateDayEntry(day.key, "sobok", "para", e.target.value)}
                                                placeholder="Para"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        border: 0,
                                                        fontSize: "0.75rem",
                                                        height: 32,
                                                        "@media print": { bgcolor: "transparent" },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ p: 0.5 }}>
                                            <TextField
                                                size="small"
                                                value={dailyEntries[day.key as keyof typeof dailyEntries].sobok.page}
                                                onChange={(e) => updateDayEntry(day.key, "sobok", "page", e.target.value)}
                                                placeholder="Page"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        border: 0,
                                                        fontSize: "0.75rem",
                                                        height: 32,
                                                        "@media print": { bgcolor: "transparent" },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        {/* Sat Sobok Column */}
                                        <TableCell sx={{ p: 0.5 }}>
                                            <TextField
                                                size="small"
                                                value={dailyEntries[day.key as keyof typeof dailyEntries].satSobok.para}
                                                onChange={(e) => updateDayEntry(day.key, "satSobok", "para", e.target.value)}
                                                placeholder="Para"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        border: 0,
                                                        fontSize: "0.75rem",
                                                        height: 32,
                                                        "@media print": { bgcolor: "transparent" },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ p: 0.5 }}>
                                            <TextField
                                                size="small"
                                                value={dailyEntries[day.key as keyof typeof dailyEntries].satSobok.page}
                                                onChange={(e) => updateDayEntry(day.key, "satSobok", "page", e.target.value)}
                                                placeholder="Page"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        border: 0,
                                                        fontSize: "0.75rem",
                                                        height: 32,
                                                        "@media print": { bgcolor: "transparent" },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ p: 0.5 }}>
                                            <TextField
                                                size="small"
                                                value={dailyEntries[day.key as keyof typeof dailyEntries].satSobok.amount}
                                                onChange={(e) => updateDayEntry(day.key, "satSobok", "amount", e.target.value)}
                                                placeholder="Amount"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        border: 0,
                                                        fontSize: "0.75rem",
                                                        height: 32,
                                                        "@media print": { bgcolor: "transparent" },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ p: 0.5 }}>
                                            <TextField
                                                size="small"
                                                value={dailyEntries[day.key as keyof typeof dailyEntries].satSobok.wrong}
                                                onChange={(e) => updateDayEntry(day.key, "satSobok", "wrong", e.target.value)}
                                                placeholder="Wrong"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        border: 0,
                                                        fontSize: "0.75rem",
                                                        height: 32,
                                                        "@media print": { bgcolor: "transparent" },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        {/* Sabak Amukta Column */}
                                        <TableCell sx={{ p: 0.5 }}>
                                            <TextField
                                                size="small"
                                                value={dailyEntries[day.key as keyof typeof dailyEntries].sabakAmukta.para}
                                                onChange={(e) => updateDayEntry(day.key, "sabakAmukta", "para", e.target.value)}
                                                placeholder="Para"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        border: 0,
                                                        fontSize: "0.75rem",
                                                        height: 32,
                                                        "@media print": { bgcolor: "transparent" },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ p: 0.5 }}>
                                            <TextField
                                                size="small"
                                                value={dailyEntries[day.key as keyof typeof dailyEntries].sabakAmukta.page}
                                                onChange={(e) => updateDayEntry(day.key, "sabakAmukta", "page", e.target.value)}
                                                placeholder="Page"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        border: 0,
                                                        fontSize: "0.75rem",
                                                        height: 32,
                                                        "@media print": { bgcolor: "transparent" },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ p: 0.5 }}>
                                            <TextField
                                                size="small"
                                                value={dailyEntries[day.key as keyof typeof dailyEntries].sabakAmukta.para} // Using para for amount as per state structure
                                                onChange={(e) => updateDayEntry(day.key, "sabakAmukta", "para", e.target.value)}
                                                placeholder="Amount"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        border: 0,
                                                        fontSize: "0.75rem",
                                                        height: 32,
                                                        "@media print": { bgcolor: "transparent" },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ p: 0.5 }}>
                                            <TextField
                                                size="small"
                                                value={dailyEntries[day.key as keyof typeof dailyEntries].sabakAmukta.page} // Using page for wrong as per state structure
                                                onChange={(e) => updateDayEntry(day.key, "sabakAmukta", "page", e.target.value)}
                                                placeholder="Wrong"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        border: 0,
                                                        fontSize: "0.75rem",
                                                        height: 32,
                                                        "@media print": { bgcolor: "transparent" },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        {/* Tilawat Column */}
                                        <TableCell sx={{ p: 0.5 }}>
                                            <TextField
                                                size="small"
                                                value={dailyEntries[day.key as keyof typeof dailyEntries].tilawaAmount}
                                                onChange={(e) => updateDayEntry(day.key, "tilawaAmount", "", e.target.value)}
                                                placeholder="Amount"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        border: 0,
                                                        fontSize: "0.75rem",
                                                        height: 32,
                                                        "@media print": { bgcolor: "transparent" },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        {/* Thursday Weekly Revision Column */}

                                        {/* Mashq Column (Yes/No) */}
                                        <TableCell sx={{ p: 0.5 }}>
                                            <TextField
                                                select
                                                size="small"
                                                value={dailyEntries[day.key as keyof typeof dailyEntries].mashq}
                                                onChange={(e) => updateDayEntry(day.key, "mashq", "", e.target.value)}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        border: 0,
                                                        fontSize: "0.75rem",
                                                        height: 32,
                                                        "@media print": { bgcolor: "transparent" },
                                                    },
                                                }}
                                            >
                                                <MenuItem value="হ্যাঁ">হ্যাঁ</MenuItem>
                                                <MenuItem value="না">না</MenuItem>
                                            </TextField>
                                        </TableCell>
                                        {/* Tajweed Column */}
                                        <TableCell sx={{ p: 0.5 }}>
                                            <TextField
                                                size="small"
                                                value={dailyEntries[day.key as keyof typeof dailyEntries].tajweed}
                                                onChange={(e) => updateDayEntry(day.key, "tajweed", "", e.target.value)}
                                                placeholder="তাজভীদ"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        border: 0,
                                                        fontSize: "0.75rem",
                                                        height: 32,
                                                        "@media print": { bgcolor: "transparent" },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ p: 0.5 }}>
                                            <TextField
                                                size="small"
                                                value={dailyEntries[day.key as keyof typeof dailyEntries].thursdayWeeklyRevision}
                                                onChange={(e) => updateDayEntry(day.key, "thursdayWeeklyRevision", "", e.target.value)}
                                                placeholder="Weekly Revision"
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        border: 0,
                                                        fontSize: "0.75rem",
                                                        height: 32,
                                                        "@media print": { bgcolor: "transparent" },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow sx={{ bgcolor: "grey.100", "@media print": { bgcolor: "transparent" }, fontWeight: 600 }}>
                                    <TableCell colSpan={1} sx={{ textAlign: "center" }}>
                                        Weekly Total
                                        <br />
                                        (সপ্তাহের মোট হিসাব)
                                    </TableCell>
                                    <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                                        Total Sobok: ____
                                    </TableCell>
                                    <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                                        Total Sat Sobok: ____
                                    </TableCell>
                                    <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                                        Total Sabak Amukta: ____
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        Total Tilawat: ____
                                    </TableCell>

                                    <TableCell colSpan={2} sx={{ textAlign: "center" }}>

                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        Total Revision: ____
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', '@media print': { display: 'none' } }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Submit Report
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default HifzReport