import { TableContainer, Paper, Table, TableBody, } from "@mui/material"

import TableHeader from "./TableHeader"
import DailyRow from "./DailyRow"
import WeeklyTotalRow from "./WeeklyTotalRow"

interface DailyReportTableProps {
  days: ReadonlyArray<{ key: string; name: string; bangla: string }>
}

const DailyReportTable = ({ days }: DailyReportTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
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
            p: 1,
          },
        }}
      >
        <TableHeader />
        
        <TableBody>
          {days.map((day) => (
            <DailyRow key={day.key} day={day} />
          ))}
          <WeeklyTotalRow />
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DailyReportTable