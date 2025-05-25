"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    FormControlLabel,
    Select,
    MenuItem,
    TextField,
    Checkbox,
    FormControl,
} from "@mui/material"
import { ChevronLeft, ChevronRight, CalendarToday } from "@mui/icons-material"
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isWithinInterval,
    startOfWeek,
    endOfWeek,
    startOfDay,
    endOfDay,
    getYear,
    setYear,
    setMonth,
    getMonth,
} from "date-fns"

interface DateRange {
    startDate: Date | null
    endDate: Date | null
}

interface DateRangePickerProps {
    open: boolean
    onClose: () => void
    onApply: (range: DateRange) => void
    initialRange?: DateRange
}

const presetRanges = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "last7days" },
    { label: "Last 14 days", value: "last14days" },
    { label: "Last 28 days", value: "last28days" },
    { label: "Last 30 days", value: "last30days" },
    { label: "This week", value: "thisweek" },
    { label: "Last week", value: "lastweek" },
    { label: "This month", value: "thismonth" },
    { label: "Last month", value: "lastmonth" },
    { label: "Maximum", value: "maximum" },
    { label: "Custom", value: "custom" },
]

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const getPresetRange = (preset: string): DateRange => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    switch (preset) {
        case "today":
            return { startDate: startOfDay(today), endDate: endOfDay(today) }
        case "yesterday":
            return { startDate: startOfDay(yesterday), endDate: endOfDay(yesterday) }
        case "last7days":
            const last7 = new Date(today)
            last7.setDate(last7.getDate() - 6)
            return { startDate: startOfDay(last7), endDate: endOfDay(today) }
        case "last14days":
            const last14 = new Date(today)
            last14.setDate(last14.getDate() - 13)
            return { startDate: startOfDay(last14), endDate: endOfDay(today) }
        case "last28days":
            const last28 = new Date(today)
            last28.setDate(last28.getDate() - 27)
            return { startDate: startOfDay(last28), endDate: endOfDay(today) }
        case "last30days":
            const last30 = new Date(today)
            last30.setDate(last30.getDate() - 29)
            return { startDate: startOfDay(last30), endDate: endOfDay(today) }
        case "thisweek":
            return { startDate: startOfWeek(today, { weekStartsOn: 0 }), endDate: endOfWeek(today, { weekStartsOn: 0 }) }
        case "lastweek":
            const lastWeekStart = startOfWeek(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), { weekStartsOn: 0 })
            const lastWeekEnd = endOfWeek(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), { weekStartsOn: 0 })
            return { startDate: lastWeekStart, endDate: lastWeekEnd }
        case "thismonth":
            return { startDate: startOfMonth(today), endDate: endOfMonth(today) }
        case "lastmonth":
            const lastMonth = subMonths(today, 1)
            return { startDate: startOfMonth(lastMonth), endDate: endOfMonth(lastMonth) }
        case "maximum":
            const maxStart = new Date(2020, 0, 1) // January 1, 2020
            return { startDate: startOfDay(maxStart), endDate: endOfDay(today) }
        default:
            return { startDate: null, endDate: null }
    }
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
    open,
    onClose,
    onApply,
    initialRange = { startDate: null, endDate: null },
}) => {
    const [selectedRange, setSelectedRange] = useState<DateRange>(initialRange)
    const [selectedPreset, setSelectedPreset] = useState<string>("custom")
    const [currentMonth1, setCurrentMonth1] = useState(new Date())
    const [currentMonth2, setCurrentMonth2] = useState(addMonths(new Date(), 1))
    const [isSelectingEnd, setIsSelectingEnd] = useState(false)
    const [compareEnabled, setCompareEnabled] = useState(false)
    const [customStartDate, setCustomStartDate] = useState("")
    const [customEndDate, setCustomEndDate] = useState("")

    useEffect(() => {
        if (open) {
            setSelectedRange(initialRange)
            if (initialRange.startDate && initialRange.endDate) {
                setCurrentMonth1(initialRange.startDate)
                setCurrentMonth2(addMonths(initialRange.startDate, 1))
                setCustomStartDate(format(initialRange.startDate, "d MMM yyyy"))
                setCustomEndDate(format(initialRange.endDate, "d MMM yyyy"))
            }
        }
    }, [open, initialRange])

    const handlePresetChange = (preset: string) => {
        setSelectedPreset(preset)
        if (preset !== "custom") {
            const range = getPresetRange(preset)
            setSelectedRange(range)
            if (range.startDate && range.endDate) {
                setCurrentMonth1(range.startDate)
                setCurrentMonth2(addMonths(range.startDate, 1))
                setCustomStartDate(format(range.startDate, "d MMM yyyy"))
                setCustomEndDate(format(range.endDate, "d MMM yyyy"))
            }
        }
    }

    const handleDateClick = (date: Date) => {
        if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate) || isSelectingEnd) {
            if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
                setSelectedRange({ startDate: date, endDate: null })
                setIsSelectingEnd(true)
                setSelectedPreset("custom")
                setCustomStartDate(format(date, "d MMM yyyy"))
                setCustomEndDate("")
            } else {
                if (date >= selectedRange.startDate) {
                    setSelectedRange({ ...selectedRange, endDate: date })
                    setCustomEndDate(format(date, "d MMM yyyy"))
                } else {
                    setSelectedRange({ startDate: date, endDate: selectedRange.startDate })
                    setCustomStartDate(format(date, "d MMM yyyy"))
                    setCustomEndDate(format(selectedRange.startDate, "d MMM yyyy"))
                }
                setIsSelectingEnd(false)
            }
        } else {
            if (date >= selectedRange.startDate) {
                setSelectedRange({ ...selectedRange, endDate: date })
                setCustomEndDate(format(date, "d MMM yyyy"))
            } else {
                setSelectedRange({ startDate: date, endDate: selectedRange.startDate })
                setCustomStartDate(format(date, "d MMM yyyy"))
                setCustomEndDate(format(selectedRange.startDate, "d MMM yyyy"))
            }
            setIsSelectingEnd(false)
        }
    }

    const handleMonthChange = (monthIndex: number, isSecondCalendar: boolean) => {
        if (isSecondCalendar) {
            setCurrentMonth2(setMonth(currentMonth2, monthIndex))
        } else {
            setCurrentMonth1(setMonth(currentMonth1, monthIndex))
        }
    }

    const handleYearChange = (year: number, isSecondCalendar: boolean) => {
        if (isSecondCalendar) {
            setCurrentMonth2(setYear(currentMonth2, year))
        } else {
            setCurrentMonth1(setYear(currentMonth1, year))
        }
    }

    const renderCalendar = (currentMonth: Date, isSecondCalendar = false) => {
        const monthStart = startOfMonth(currentMonth)
        const monthEnd = endOfMonth(currentMonth)
        const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
        const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
        const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

        const isDateInRange = (date: Date) => {
            if (!selectedRange.startDate || !selectedRange.endDate) return false
            return isWithinInterval(date, { start: selectedRange.startDate, end: selectedRange.endDate })
        }

        const isDateSelected = (date: Date) => {
            return (
                (selectedRange.startDate && isSameDay(date, selectedRange.startDate)) ||
                (selectedRange.endDate && isSameDay(date, selectedRange.endDate))
            )
        }

        const currentYear = getYear(currentMonth)
        const currentMonthIndex = getMonth(currentMonth)
        const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i)

        return (
            <Box sx={{ p: 2 }}>
                {/* Month/Year Selectors */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <IconButton
                        onClick={() =>
                            isSecondCalendar
                                ? setCurrentMonth2(subMonths(currentMonth2, 1))
                                : setCurrentMonth1(subMonths(currentMonth1, 1))
                        }
                        disabled={isSecondCalendar}
                        size="small"
                    >
                        <ChevronLeft />
                    </IconButton>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Select
                            value={currentMonthIndex}
                            onChange={(e) => handleMonthChange(Number(e.target.value), isSecondCalendar)}
                            size="small"
                            sx={{ minWidth: 100 }}
                        >
                            {months.map((month, index) => (
                                <MenuItem key={month} value={index}>
                                    {month.slice(0, 3)}
                                </MenuItem>
                            ))}
                        </Select>

                        <Select
                            value={currentYear}
                            onChange={(e) => handleYearChange(Number(e.target.value), isSecondCalendar)}
                            size="small"
                            sx={{ minWidth: 80 }}
                        >
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>

                    <IconButton
                        onClick={() =>
                            isSecondCalendar
                                ? setCurrentMonth2(addMonths(currentMonth2, 1))
                                : setCurrentMonth1(addMonths(currentMonth1, 1))
                        }
                        disabled={!isSecondCalendar}
                        size="small"
                    >
                        <ChevronRight />
                    </IconButton>
                </Box>

                {/* Calendar Grid */}
                <Grid container spacing={0}>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <Grid item xs={12 / 7} key={day}>
                            <Box sx={{ p: 1, textAlign: "center" }}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary" }}>
                                    {day}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                    {days.map((day, index) => (
                        <Grid item xs={12 / 7} key={index}>
                            <Box
                                sx={{
                                    p: 0.5,
                                    textAlign: "center",
                                    cursor: "pointer",
                                    position: "relative",
                                    "&:hover": {
                                        bgcolor: "action.hover",
                                    },
                                }}
                                onClick={() => handleDateClick(day)}
                            >
                                <Box
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "4px",
                                        margin: "0 auto",
                                        bgcolor: isDateSelected(day)
                                            ? "primary.main"
                                            : isDateInRange(day)
                                                ? "primary.light"
                                                : "transparent",
                                        color: isDateSelected(day)
                                            ? "primary.contrastText"
                                            : !isSameMonth(day, currentMonth)
                                                ? "text.disabled"
                                                : "text.primary",
                                        fontWeight: isDateSelected(day) ? 600 : 400,
                                    }}
                                >
                                    <Typography variant="body2">{format(day, "d")}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        )
    }

    const handleApply = () => {
        onApply(selectedRange)
        onClose()
    }

    const handleCancel = () => {
        setSelectedRange(initialRange)
        onClose()
    }


    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    minHeight: 650,
                    bgcolor: "#f8f9fa",
                },
            }}
        >
            <DialogTitle sx={{ pb: 1, bgcolor: "white", borderBottom: "1px solid #e0e0e0" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday sx={{ color: "primary.main" }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Select Date Range
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ p: 0, bgcolor: "#f8f9fa" }}>
                <Grid container sx={{ height: 550 }}>
                    {/* Preset Options */}
                    <Grid item xs={12} md={3} sx={{ bgcolor: "white", borderRight: "1px solid #e0e0e0" }}>
                        <Box sx={{ p: 2 }}>
                            <RadioGroup value={selectedPreset} onChange={(e) => handlePresetChange(e.target.value)}>
                                {presetRanges.map((preset) => (
                                    <FormControlLabel
                                        key={preset.value}
                                        value={preset.value}
                                        control={<Radio size="small" />}
                                        label={<Typography variant="body2">{preset.label}</Typography>}
                                        sx={{ mb: 0.5, "& .MuiFormControlLabel-label": { fontSize: "0.875rem" } }}
                                    />
                                ))}
                            </RadioGroup>
                        </Box>
                    </Grid>

                    {/* Calendar Views */}
                    <Grid item xs={12} md={9} sx={{ bgcolor: "#f8f9fa" }}>
                        <Grid container>
                            <Grid item xs={12} md={6} sx={{ borderRight: { md: "1px solid #e0e0e0" }, bgcolor: "white" }}>
                                {renderCalendar(currentMonth1)}
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ bgcolor: "white" }}>
                                {renderCalendar(currentMonth2, true)}
                            </Grid>
                        </Grid>

                        {/* Bottom Section */}
                        <Box sx={{ p: 3, bgcolor: "white", borderTop: "1px solid #e0e0e0" }}>
                            {/* Compare Checkbox */}
                            <Box sx={{ mb: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={compareEnabled}
                                            onChange={(e) => setCompareEnabled(e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label={<Typography variant="body2">Compare</Typography>}
                                />
                            </Box>

                            {/* Custom Date Inputs */}
                            <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <Select value="custom" size="small">
                                        <MenuItem value="custom">Custom</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    value={customStartDate}
                                    onChange={(e) => setCustomStartDate(e.target.value)}
                                    size="small"
                                    placeholder="Start date"
                                    sx={{ minWidth: 120 }}
                                />

                                <TextField
                                    value={customEndDate}
                                    onChange={(e) => setCustomEndDate(e.target.value)}
                                    size="small"
                                    placeholder="End date"
                                    sx={{ minWidth: 120 }}
                                />
                            </Box>

                            {/* Timezone Info */}
                            <Typography variant="caption" color="text.secondary">
                                Dates are shown in Dhaka Time
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 3, bgcolor: "white", borderTop: "1px solid #e0e0e0", justifyContent: "flex-end" }}>
                <Button
                    onClick={handleCancel}
                    variant="outlined"
                    color="inherit"
                    sx={{ borderColor: "rgba(0, 0, 0, 0.12)", mr: 2 }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleApply}
                    variant="contained"
                    color="primary"
                    disabled={!selectedRange.startDate || !selectedRange.endDate}
                    sx={{ bgcolor: "#1976d2" }}
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DateRangePicker
