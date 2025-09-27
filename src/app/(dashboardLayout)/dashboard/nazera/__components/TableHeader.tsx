import { TableHead, TableRow, TableCell } from "@mui/material"

const TableHeader = () => {
  const timeSlotHeaders = [
    { label: "Morning (সকাল)", colSpan: 4 },
    { label: "Afternoon (দুপুর)", colSpan: 4 },
    { label: "Night (রাত)", colSpan: 4 }
  ]

  const subHeaders = ["Para (পারা)", "Page (পৃষ্ঠা নং)", "Amount (পরিমাণ)", "Mistakes (ভুল)"]

  return (
    <TableHead>
      <TableRow sx={{ bgcolor: "grey.100", "@media print": { bgcolor: "transparent" } }}>
        <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
          Date/Day<br />(তারিখ/বার)
        </TableCell>
        
        {timeSlotHeaders.map((header, index) => (
          <TableCell key={index} colSpan={header.colSpan} sx={{ fontWeight: 600, textAlign: "center" }}>
            {header.label}
          </TableCell>
        ))}
        
        <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
          Total Read<br />(সর্বমোট পঠিত পৃষ্ঠা)
        </TableCell>
        
        <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
          Dua/Hadith/Masala<br />(দোয়া/হাদিস/মাসয়ালা সংখ্যা/নং)
        </TableCell>
        
        <TableCell sx={{ fontWeight: 600, textAlign: "center", minWidth: 90 }}>
          মাশক্ব হয়েছে কি
        </TableCell>
        
        <TableCell sx={{ fontWeight: 600, textAlign: "center", minWidth: 90 }}>
          তাজভীদ শিক্ষা
        </TableCell>
      </TableRow>
      
      <TableRow sx={{ bgcolor: "grey.50", "@media print": { bgcolor: "transparent" } }}>
        <TableCell></TableCell>
        {[...Array(3)].flatMap((_, timeIndex) => 
          subHeaders.map((header, headerIndex) => (
            <TableCell key={`subheader-${timeIndex}-${headerIndex}`} sx={{ fontSize: "0.7rem", textAlign: "center" }}>
              {header}
            </TableCell>
          ))
        )}
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  )
}

export default TableHeader