import { TableCell, TableRow } from '@mui/material';
import React from 'react';

const TableFooter = () => {
    return (
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
    );
};

export default TableFooter;