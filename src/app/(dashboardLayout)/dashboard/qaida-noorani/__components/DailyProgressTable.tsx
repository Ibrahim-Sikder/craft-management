/* eslint-disable @typescript-eslint/no-unused-vars */
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid, Typography, Box, useTheme, useMediaQuery } from "@mui/material"
import { DAYS_OF_WEEK } from "@/constant/daysConfig"
import CraftInput from "@/components/Forms/Input"
import CraftSelect from "@/components/Forms/Select"
import { reportStyle, tableRowCellStyle } from "@/style/customeStyle"
import QaidaReportHeader from "./QaidaReportHeader"
import QaidaReportFooter from "./QaidaReportFooter"
import { QaidaTableBody } from "./QaidaTableBody"

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
                        <QaidaTableBody />

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