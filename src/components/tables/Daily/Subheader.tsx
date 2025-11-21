
import { reportCellStyle, reportRowStyle } from '@/style/customeStyle';
import { TableCell, TableRow } from '@mui/material';
import React from 'react';

export const Subheader = () => {
  return (
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
          Wrong <br /> (ভুল)
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
          Wrong <br /> (ভুল)
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
          Wrong <br /> (ভুল)
        </TableCell>

        {/* Rest */}
        <TableCell sx={{
          ...reportCellStyle,
          borderLeft: '1px solid rgba(0,0,0,0.1)',
          fontWeight: 500
        }}>
         
        </TableCell>
        <TableCell sx={{
          ...reportCellStyle,
          borderLeft: '1px solid rgba(0,0,0,0.1)',
        }}></TableCell>
        <TableCell sx={{
          ...reportCellStyle,
          borderLeft: '1px solid rgba(0,0,0,0.1)',
        }}>

        </TableCell>
        <TableCell sx={{
          ...reportCellStyle,
          borderLeft: '1px solid rgba(0,0,0,0.1)',
        }}></TableCell>
      </TableRow>
  )
}
