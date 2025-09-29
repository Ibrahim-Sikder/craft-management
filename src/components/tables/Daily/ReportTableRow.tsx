import { reportCellStyle, reportRowStyle } from '@/style/customeStyle';
import { TableCell, TableRow } from '@mui/material';
import React from 'react';

interface ReportTableRowProps {
  col1Label: React.ReactNode;
  col2Label: React.ReactNode; 
  col3Label: React.ReactNode; 
}

const ReportTableRow: React.FC<ReportTableRowProps> = ({
  col1Label,
  col2Label,
  col3Label,
}) => {
  return (
    <>
      {/* Header Row */}
      <TableRow
        sx={{ bgcolor: "grey.100", "@media print": { bgcolor: "transparent" } }}
      >
        <TableCell sx={{ fontWeight: 600, textAlign: "center", minWidth: 80 }}>
          Day <br /> (বার)
        </TableCell>

        {/* Dynamic labels */}
        <TableCell colSpan={2} sx={reportCellStyle}>
          {col1Label}
        </TableCell>
        <TableCell colSpan={4} sx={reportCellStyle}>
          {col2Label}
        </TableCell>
        <TableCell colSpan={4} sx={reportCellStyle}>
          {col3Label}
        </TableCell>

        {/* Fixed columns */}
        <TableCell sx={reportCellStyle}>
          Tilawat <br /> (তিলাওয়াত)
        </TableCell>
        <TableCell sx={reportCellStyle}>মাশক্ব</TableCell>
        <TableCell sx={reportCellStyle}>তাজভীদ শিক্ষা</TableCell>
        <TableCell sx={reportCellStyle}>
          Thursday Weekly Revision
          <br /> (বৃহস্পতিবার সাপ্তাহিক শবনা রিভিশন)
        </TableCell>
      </TableRow>

      {/* Sub Header Row */}
      <TableRow sx={reportRowStyle}>
        <TableCell></TableCell>

        {/* First group */}
        <TableCell sx={reportCellStyle}>Para <br /> (পারা)</TableCell>
        <TableCell sx={reportCellStyle}>Page No <br /> (পৃষ্ঠা নং)</TableCell>

        {/* Second group */}
        <TableCell sx={reportCellStyle}>Para <br /> (পারা)</TableCell>
        <TableCell sx={reportCellStyle}>Page No <br /> (পৃষ্ঠা নং)</TableCell>
        <TableCell sx={reportCellStyle}>Amount <br /> (পরিমাণ)</TableCell>
        <TableCell sx={reportCellStyle}>Wrong/Vul <br /> (ভুল)</TableCell>

        {/* Third group */}
        <TableCell sx={reportCellStyle}>Para <br /> (পারা)</TableCell>
        <TableCell sx={reportCellStyle}>Page No <br /> (পৃষ্ঠা নং)</TableCell>
        <TableCell sx={reportCellStyle}>Amount <br /> (পরিমাণ)</TableCell>
        <TableCell sx={reportCellStyle}>Wrong/Vul <br /> (ভুল)</TableCell>

        {/* Rest */}
        <TableCell sx={reportCellStyle}>Amount <br /> (পরিমাণ)</TableCell>
        <TableCell></TableCell>
        <TableCell sx={reportCellStyle}>হ্যাঁ/না</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </>
  );
};

export default ReportTableRow;
