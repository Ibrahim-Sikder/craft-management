import { Typography, Box, CardHeader } from "@mui/material";

interface ReportHeaderProps {
  title?: string;
  subtitle?: string;
  subtitleBangla?: string;
}

export function ReportHeader({ title, subtitleBangla }: ReportHeaderProps) {
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
            {title}
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            {subtitleBangla}
          </Typography>
        </Box>
      }
    />
  );
}