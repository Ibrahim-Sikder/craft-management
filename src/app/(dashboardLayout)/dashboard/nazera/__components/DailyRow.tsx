import { TableRow, TableCell, Typography } from "@mui/material"
import { reportStyle } from "@/style/customeStyle"
import CraftInput from "@/components/Forms/Input"
import CraftSelect from "@/components/Forms/Select"

interface DailyRowProps {
  day: {
    key: string
    name: string
    bangla: string
  }
}

const DailyRow = ({ day }: DailyRowProps) => {
  const timeSlots = ["Morning", "Afternoon", "Night"]
  const fields = ["para", "page", "amount", "mistakes"]

  return (
    <TableRow sx={{ "&:hover": { bgcolor: "grey.50" } }}>
      <TableCell sx={{ fontWeight: 500, textAlign: "center" }}>
        {day.name}
        <br />
        <Typography variant="caption" color="text.secondary">
          ({day.bangla})
        </Typography>
      </TableCell>

      {/* Time Slot Fields */}
      {timeSlots.map((timeSlot) => (
        fields.map((field) => (
          <TableCell key={`${day.key}-${timeSlot.toLowerCase()}-${field}`} sx={{ p: 0.5 }}>
            <CraftInput
              name={`${day.key}${timeSlot}${field.charAt(0).toUpperCase() + field.slice(1)}`}
              size="small"
              sx={reportStyle}
            />
          </TableCell>
        ))
      ))}

      {/* Total Read */}
      <TableCell sx={{ p: 0.5 }}>
        <CraftInput
          name={`${day.key}TotalRead`}
          size="small"
          sx={reportStyle}
        />
      </TableCell>

      {/* Dua/Hadith/Masala */}
      <TableCell sx={{ p: 0.5 }}>
        <CraftInput
          name={`${day.key}DuaHadithMasala`}
          size="small"
          placeholder="দোয়া/হাদিস/মাসয়ালা"
          sx={reportStyle}
        />
      </TableCell>

      {/* Mashq */}
      <TableCell sx={{ p: 0.5 }}>
        <CraftSelect
          items={['হ্যাঁ', 'না']}
          name={`${day.key}Mashq`}
          sx={reportStyle}
        />
      </TableCell>

      {/* Tajweed */}
      <TableCell sx={{ p: 0.5 }}>
        <CraftInput
          name={`${day.key}Tajweed`}
          placeholder="তাজভীদ শিক্ষা"
          sx={reportStyle}
        />
      </TableCell>
    </TableRow>
  )
}

export default DailyRow