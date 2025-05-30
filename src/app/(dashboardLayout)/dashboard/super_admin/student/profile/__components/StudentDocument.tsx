import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,

    Typography,
    useTheme,

} from "@mui/material"
import {
    AttachFile,
    Attachment,

    Download,

    Visibility,
} from "@mui/icons-material"
import { studentData } from "@/data/data";
const StudentDocument = () => {
    const theme = useTheme()
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6">Student Documents</Typography>
                <Button variant="contained" size="small" startIcon={<Attachment />}>
                    Upload Document
                </Button>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                {studentData.documents.map((doc) => (
                    <Grid item xs={12} sm={6} md={3} key={doc.id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            bgcolor:
                                                doc.type === "PDF"
                                                    ? theme.palette.error.light
                                                    : doc.type === "JPG" || doc.type === "PNG"
                                                        ? theme.palette.primary.light
                                                        : theme.palette.warning.light,
                                            mb: 2,
                                        }}
                                    >
                                        <AttachFile />
                                    </Avatar>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {doc.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {doc.type} • {doc.size}
                                    </Typography>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        Uploaded on: {doc.uploadDate}
                                    </Typography>
                                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                                        <Button variant="outlined" size="small" startIcon={<Visibility />}>
                                            View
                                        </Button>
                                        <Button variant="outlined" size="small" startIcon={<Download />}>
                                            Download
                                        </Button>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default StudentDocument;