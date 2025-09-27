import { TableRow, TableCell, Grid } from "@mui/material"

const WeeklyTotalRow = () => {
  return (
    <TableRow sx={{ bgcolor: "grey.100", "@media print": { bgcolor: "transparent" }, fontWeight: 600 }}>
      <TableCell sx={{ textAlign: "center" }}>
        Weekly Total
        <br />
        (সপ্তাহের মোট হিসাব)
      </TableCell>
      <TableCell colSpan={15}>
        <Grid container spacing={1} sx={{ fontSize: "0.75rem" }}>
          <Grid item xs={3}>Total Pages: <span id="totalPages">0</span></Grid>
          <Grid item xs={3}>Total Mistakes: <span id="totalMistakes">0</span></Grid>
          <Grid item xs={3}>Total Duas: <span id="totalDuas">0</span></Grid>
          <Grid item xs={3}>Total Hadith: <span id="totalHadiths">0</span></Grid>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default WeeklyTotalRow