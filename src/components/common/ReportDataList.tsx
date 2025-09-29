/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ReportList/ReportTable.tsx
import {
    Box,

    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    alpha,
    useTheme,
} from "@mui/material"
import { Report, DailyEntry } from "@/interface/hifzReport"
import { StyledTable } from "@/style/hifzReportStyle"
import { getDayName } from "@/constant/daysConfig"

interface ReportTableProps {
    report: Report
    customColumns: Record<string, any>
    customSummaryColumns: Record<string, any>
}

export function ReportDataList({
    report,
    customColumns,
    customSummaryColumns
}: ReportTableProps) {

    const theme = useTheme()


    const renderCustomColumn = (day: string, data: DailyEntry, columnKey: string) => {
        if (customColumns[columnKey]) {
            return customColumns[columnKey].render({ day, data })
        }
        return null
    }

    const renderCustomSummaryColumn = (report: Report, columnKey: string) => {
        if (customSummaryColumns[columnKey]) {
            return customSummaryColumns[columnKey].render(report)
        }
        return null
    }
    const tableCellStyle = { fontWeight: 'bold' }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Detailed Daily Entries
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={tableCellStyle}>Day</TableCell>
                            <TableCell sx={tableCellStyle}>Sobok</TableCell>
                            <TableCell sx={tableCellStyle}>Sabak Seven</TableCell>
                            <TableCell sx={tableCellStyle}>Sabak Amukta</TableCell>
                            <TableCell sx={tableCellStyle}>Sat Sobok</TableCell>
                            <TableCell sx={tableCellStyle}>Tilawat</TableCell>
                            <TableCell sx={tableCellStyle}>Mashq</TableCell>
                            <TableCell sx={tableCellStyle}>Tajweed</TableCell>
                            <TableCell sx={tableCellStyle}>Teacher</TableCell>
                            <TableCell sx={tableCellStyle}>Revision</TableCell>
                            {/* Render custom columns if any */}
                            {Object.keys(customColumns).map((key) => (
                                <TableCell key={key} sx={{ fontWeight: 'bold' }}>
                                    {customColumns[key].label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(report.dailyEntries).map(([day, data]) => (
                            <TableRow key={day}>
                                <TableCell sx={{ textTransform: "capitalize", fontWeight: 'bold' }}>
                                    {getDayName(day)}
                                </TableCell>
                                <TableCell>
                                    {data.sobok.para || '-'}/{data.sobok.page || '-'}
                                </TableCell>
                                <TableCell>
                                    {data.sabakSeven.para || '-'}/{data.sabakSeven.page || '-'}
                                </TableCell>
                                <TableCell>
                                    {data.sabakAmukta.para || '-'}/{data.sabakAmukta.page || '-'}
                                </TableCell>
                                <TableCell>
                                    {data.satSobok.para || '-'}/{data.satSobok.page || '-'}/{data.satSobok.amount || '-'}/{data.satSobok.wrong || '-'}
                                </TableCell>
                                <TableCell>{data.tilawaAmount || '-'}</TableCell>
                                <TableCell>{data.mashq || '-'}</TableCell>
                                <TableCell>{data.tajweed || '-'}</TableCell>
                                <TableCell>{data.teacherSignature || '-'}</TableCell>
                                <TableCell>{data.thursdayWeeklyRevision || '-'}</TableCell>
                                {/* Render custom columns if any */}
                                {Object.keys(customColumns).map((key) => (
                                    <TableCell key={key}>
                                        {renderCustomColumn(day, data, key)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                            <TableCell sx={tableCellStyle}>Weekly Totals</TableCell>
                            <TableCell sx={tableCellStyle}>{report.weeklySummary.totalSobok}</TableCell>
                            <TableCell sx={tableCellStyle}>-</TableCell>
                            <TableCell sx={tableCellStyle}>{report.weeklySummary.totalSabakAmukta}</TableCell>
                            <TableCell sx={tableCellStyle}>{report.weeklySummary.totalSatSobok}</TableCell>
                            <TableCell sx={tableCellStyle}>{report.weeklySummary.totalTilawat}</TableCell>
                            <TableCell sx={tableCellStyle}>-</TableCell>
                            <TableCell sx={tableCellStyle}>-</TableCell>
                            <TableCell sx={tableCellStyle}>-</TableCell>
                            <TableCell sx={tableCellStyle}>{report.weeklySummary.totalRevision}</TableCell>
                            {/* Render custom summary columns if any */}
                            {Object.keys(customSummaryColumns).map((key) => (
                                <TableCell key={key} sx={{ fontWeight: 'bold' }}>
                                    {renderCustomSummaryColumn(report, key)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </Box>
    )
}