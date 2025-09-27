import { TableCell, TableRow } from '@mui/material';
import React from 'react';

const ReportTableRow = () => {
    return (
         <>
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
                    </>
    );
};

export default ReportTableRow;