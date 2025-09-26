import { CardHeader, Box, Typography } from "@mui/material"

const ReportHeader = () => {
  return (
    <CardHeader
      sx={{
        textAlign: "center",
        borderBottom: 1,
        borderColor: "divider",
        "@media print": { borderColor: "black" },
      }}
      title={
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
            Craft International Institute
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}>
            Nazera Students Daily Report
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            নাজেরা ছাত্রদের দৈনিক রিপোর্ট
          </Typography>
        </Box>
      }
    />
  )
}

export default ReportHeader