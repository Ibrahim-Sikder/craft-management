// components/tables/Daily/ReportTableBody.tsx
import CraftInput from '@/components/Forms/Input';
import CraftSelect from '@/components/Forms/Select';
import { DAYS_OF_WEEK } from '@/constant/daysConfig';
import { reportInput } from '@/style/customeStyle';
import { TableBody, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';
import TableFooter from './TableFooter';

const ReportTableBody = () => {
    return (
        <TableBody>
            {DAYS_OF_WEEK.map((day) => (
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
                        <CraftInput
                            name={`${day.key}SobokPara`}
                            size="medium"
                            placeholder="Para"
                            sx={reportInput}
                        />
                    </TableCell>
                    <TableCell sx={{ p: 0.5 }}>
                        <CraftInput
                            name={`${day.key}SobokPage`}
                            placeholder="Page"
                            sx={reportInput}
                        />
                    </TableCell>
                    {/* Sat Sobok Column */}
                    <TableCell sx={{ p: 0.5 }}>
                        <CraftInput
                            name={`${day.key}SatSobokPara`}
                            size="small"
                            placeholder="Para"
                            sx={reportInput}
                        />
                    </TableCell>
                    <TableCell sx={{ p: 0.5 }}>
                        <CraftInput
                            name={`${day.key}SatSobokPage`}
                            size="small"
                            placeholder="Page"
                            sx={reportInput}
                        />
                    </TableCell>
                    <TableCell sx={{ p: 0.5 }}>
                        <CraftInput
                            name={`${day.key}SatSobokAmount`}
                            size="small"
                            placeholder="amount"
                            sx={reportInput}
                        />
                    </TableCell>
                    <TableCell sx={{ p: 0.5 }}>
                        <CraftInput
                            name={`${day.key}SatSobokWrong`}
                            size="small"
                            placeholder="wrong"
                            sx={reportInput}
                        />
                    </TableCell>
                    {/* Sabak Amukta Column */}
                    <TableCell sx={{ p: 0.5 }}>
                        <CraftInput
                            name={`${day.key}SabakAmuktaPara`}
                            size="small"
                            placeholder="para"
                            sx={reportInput}
                        />
                    </TableCell>
                    <TableCell sx={{ p: 0.5 }}>
                        <CraftInput
                            name={`${day.key}SabakAmuktaPage`}
                            size="small"
                            placeholder="page"
                            sx={reportInput}
                        />
                    </TableCell>
                    {/* Sabak Seven Column */}
                    <TableCell sx={{ p: 0.5 }}>
                        <CraftInput
                            name={`${day.key}SabakSevenPara`}
                            size="small"
                            placeholder="para"
                            sx={reportInput}
                        />
                    </TableCell>
                    <TableCell sx={{ p: 0.5 }}>
                        <CraftInput
                            name={`${day.key}SabakSevenPage`}
                            size="small"
                            placeholder="page"
                            sx={reportInput}
                        />
                    </TableCell>
                    {/* Tilawat Column */}
                    <TableCell sx={{ p: 0.5 }}>
                        <CraftInput
                            name={`${day.key}TilawaAmount`}
                            size="small"
                            placeholder="Tilawat Amount"
                            sx={reportInput}
                        />
                    </TableCell>
                    {/* Mashq Column (Yes/No) */}
                    <TableCell sx={{ p: 0.5 }}>
                        <CraftSelect 
                            items={['হ্যাঁ', 'না']}
                            name={`${day.key}Mashq`}
                            size="small"
                            placeholder="Mashq"
                            sx={reportInput}
                        />
                    </TableCell>
                    {/* Tajweed Column */}
                    <TableCell sx={{ p: 0.5 }}>
                        <CraftInput
                            name={`${day.key}Tajweed`}
                            size="small"
                            placeholder="তাজভীদ"
                            sx={reportInput}
                        />
                    </TableCell>
                    {/* Thursday Weekly Revision Column */}
                    <TableCell sx={{ p: 0.5 }}>
                        <CraftInput
                            name={`${day.key}ThursdayWeeklyRevision`}
                            size="small"
                            placeholder="Revision"
                            sx={reportInput}
                        />
                    </TableCell>
                </TableRow>
            ))}
            <TableFooter />
        </TableBody>
    );
};

export default ReportTableBody;