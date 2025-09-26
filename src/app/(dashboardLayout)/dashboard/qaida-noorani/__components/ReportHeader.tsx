import { Box, Typography } from "@mui/material"

export default function ReportHeader() {
    return (
        <Box sx={{ textAlign: "center", p: 3, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Craft International Institute
            </Typography>
            <Typography variant="h5" fontWeight="600" color="text.secondary" gutterBottom>
                Qaida & Noorani Students Daily Report
            </Typography>
            <Typography variant="h6" color="text.secondary">
                কায়েদা ও নূরানী ছাত্রদের দৈনিক রিপোর্ট
            </Typography>
        </Box>
    )
}