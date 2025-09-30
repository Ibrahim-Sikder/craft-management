// components/tables/Daily/ReportTableRow.tsx
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
        sx={{ 
          background: 'linear-gradient(90deg, #1a237e 0%, #3949ab 100%)',
          color: 'white',
          "@media print": { bgcolor: "#f5f5f5", color: 'black' }
        }}
      >
        <TableCell sx={{ 
          fontWeight: 600, 
          textAlign: "center", 
          minWidth: 80,
          color: 'inherit',
          borderLeft: '1px solid rgba(255,255,255,0.2)',
          '&:first-of-type': {
            borderLeft: 'none'
          }
        }}>
          Day <br /> (বার)
        </TableCell>

        {/* Dynamic labels */}
        <TableCell 
          colSpan={2} 
          sx={{ 
            ...reportCellStyle, 
            color: 'inherit',
            borderLeft: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          {col1Label}
        </TableCell>
        <TableCell 
          colSpan={4} 
          sx={{ 
            ...reportCellStyle, 
            color: 'inherit',
            borderLeft: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          {col2Label}
        </TableCell>
        <TableCell 
          colSpan={4} 
          sx={{ 
            ...reportCellStyle, 
            color: 'inherit',
            borderLeft: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          {col3Label}
        </TableCell>

        {/* Fixed columns */}
        <TableCell 
          sx={{ 
            ...reportCellStyle, 
            color: 'inherit',
            borderLeft: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          Tilawat <br /> (তিলাওয়াত)
        </TableCell>
        <TableCell 
          sx={{ 
            ...reportCellStyle, 
            color: 'inherit',
            borderLeft: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          মাশক্ব
        </TableCell>
        <TableCell 
          sx={{ 
            ...reportCellStyle, 
            color: 'inherit',
            borderLeft: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          তাজভীদ শিক্ষা
        </TableCell>
        <TableCell 
          sx={{ 
            ...reportCellStyle, 
            color: 'inherit',
            borderLeft: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          Thursday Weekly Revision
          <br /> (বৃহস্পতিবার সাপ্তাহিক শবনা রিভিশন)
        </TableCell>
      </TableRow>

      {/* Sub Header Row */}
      <TableRow 
        sx={{ 
          ...reportRowStyle,
          background: 'linear-gradient(90deg, #e8eaf6 0%, #c5cae9 100%)',
          "@media print": { bgcolor: "#eeeeee" }
        }}
      >
        <TableCell sx={{ borderLeft: 'none' }}></TableCell>

        {/* First group */}
        <TableCell sx={{ 
          ...reportCellStyle, 
          borderLeft: '1px solid rgba(0,0,0,0.1)',
          fontWeight: 500
        }}>
          Para <br /> (পারা)
        </TableCell>
        <TableCell sx={{ 
          ...reportCellStyle, 
          borderLeft: '1px solid rgba(0,0,0,0.1)',
          fontWeight: 500
        }}>
          Page No <br /> (পৃষ্ঠা নং)
        </TableCell>

        {/* Second group */}
        <TableCell sx={{ 
          ...reportCellStyle, 
          borderLeft: '1px solid rgba(0,0,0,0.1)',
          fontWeight: 500
        }}>
          Para <br /> (পারা)
        </TableCell>
        <TableCell sx={{ 
          ...reportCellStyle, 
          borderLeft: '1px solid rgba(0,0,0,0.1)',
          fontWeight: 500
        }}>
          Page No <br /> (পৃষ্ঠা নং)
        </TableCell>
        <TableCell sx={{ 
          ...reportCellStyle, 
          borderLeft: '1px solid rgba(0,0,0,0.1)',
          fontWeight: 500
        }}>
          Amount <br /> (পরিমাণ)
        </TableCell>
        <TableCell sx={{ 
          ...reportCellStyle, 
          borderLeft: '1px solid rgba(0,0,0,0.1)',
          fontWeight: 500
        }}>
          Wrong/Vul <br /> (ভুল)
        </TableCell>

        {/* Third group */}
        <TableCell sx={{ 
          ...reportCellStyle, 
          borderLeft: '1px solid rgba(0,0,0,0.1)',
          fontWeight: 500
        }}>
          Para <br /> (পারা)
        </TableCell>
        <TableCell sx={{ 
          ...reportCellStyle, 
          borderLeft: '1px solid rgba(0,0,0,0.1)',
          fontWeight: 500
        }}>
          Page No <br /> (পৃষ্ঠা নং)
        </TableCell>
        <TableCell sx={{ 
          ...reportCellStyle, 
          borderLeft: '1px solid rgba(0,0,0,0.1)',
          fontWeight: 500
        }}>
          Amount <br /> (পরিমাণ)
        </TableCell>
        <TableCell sx={{ 
          ...reportCellStyle, 
          borderLeft: '1px solid rgba(0,0,0,0.1)',
          fontWeight: 500
        }}>
          Wrong/Vul <br /> (ভুল)
        </TableCell>

        {/* Rest */}
        <TableCell sx={{ 
          ...reportCellStyle, 
          borderLeft: '1px solid rgba(0,0,0,0.1)',
          fontWeight: 500
        }}>
          Amount <br /> (পরিমাণ)
        </TableCell>
        <TableCell sx={{ 
          ...reportCellStyle, 
          borderLeft: '1px solid rgba(0,0,0,0.1)',
        }}></TableCell>
        <TableCell sx={{ 
          ...reportCellStyle, 
          borderLeft: '1px solid rgba(0,0,0,0.1)',
          fontWeight: 500
        }}>
          হ্যাঁ/না
        </TableCell>
        <TableCell sx={{ 
          ...reportCellStyle, 
          borderLeft: '1px solid rgba(0,0,0,0.1)',
        }}></TableCell>
      </TableRow>
    </>
  );
};

export default ReportTableRow;