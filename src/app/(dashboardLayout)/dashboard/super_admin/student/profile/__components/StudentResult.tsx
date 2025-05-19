import {

    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    Paper,
    Typography,
} from "@mui/material"
import {
    Download,
    Visibility,
} from "@mui/icons-material"
import { studentData } from "@/data/data";
const StudentResult = () => {
    return (
        <>
           <Typography variant="h6" gutterBottom>
                                   Examination Results
                               </Typography>
                               <Divider sx={{ mb: 3 }} />
           
                               <Grid container spacing={3}>
                                   {studentData.results.map((result, index) => (
                                       <Grid item xs={12} md={6} key={index}>
                                           <Card variant="outlined" sx={{ mb: 2 }}>
                                               <CardContent>
                                                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                                                       <Typography variant="h6" color="primary">
                                                           {result.exam}
                                                       </Typography>
                                                       <Chip label={`Position: ${result.position}`} color="primary" size="small" variant="outlined" />
                                                   </Box>
                                                   <Grid container spacing={2}>
                                                       <Grid item xs={6}>
                                                           <Typography variant="subtitle2" color="text.secondary">
                                                               Total Marks
                                                           </Typography>
                                                           <Typography variant="body1">{result.totalMarks}</Typography>
                                                       </Grid>
                                                       <Grid item xs={6}>
                                                           <Typography variant="subtitle2" color="text.secondary">
                                                               Obtained Marks
                                                           </Typography>
                                                           <Typography variant="body1">{result.obtainedMarks}</Typography>
                                                       </Grid>
                                                       <Grid item xs={6}>
                                                           <Typography variant="subtitle2" color="text.secondary">
                                                               Percentage
                                                           </Typography>
                                                           <Typography variant="body1">{result.percentage}%</Typography>
                                                       </Grid>
                                                       <Grid item xs={6}>
                                                           <Typography variant="subtitle2" color="text.secondary">
                                                               Grade
                                                           </Typography>
                                                           <Chip
                                                               label={result.grade}
                                                               color={
                                                                   result.grade === "A+" || result.grade === "A"
                                                                       ? "success"
                                                                       : result.grade === "B+" || result.grade === "B"
                                                                           ? "primary"
                                                                           : result.grade === "C+" || result.grade === "C"
                                                                               ? "warning"
                                                                               : "error"
                                                               }
                                                               size="small"
                                                           />
                                                       </Grid>
                                                   </Grid>
                                                   <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                                                       <Button variant="outlined" size="small" startIcon={<Visibility />}>
                                                           View Details
                                                       </Button>
                                                       <Button variant="outlined" size="small" startIcon={<Download />} sx={{ ml: 1 }}>
                                                           Download Report
                                                       </Button>
                                                   </Box>
                                               </CardContent>
                                           </Card>
                                       </Grid>
                                   ))}
                               </Grid>
           
                               <Box sx={{ mt: 3 }}>
                                   <Typography variant="h6" gutterBottom>
                                       Subject-wise Performance
                                   </Typography>
                                   <Divider sx={{ mb: 3 }} />
           
                                   <Grid container spacing={2}>
                                       {studentData.subjects.map((subject, index) => (
                                           <Grid item xs={12} sm={6} md={4} key={index}>
                                               <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                                                   <Typography variant="subtitle1" gutterBottom>
                                                       {subject.name}
                                                   </Typography>
                                                   <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                                                       <Typography variant="body2">Progress</Typography>
                                                       <Typography variant="body2">{subject.progress}%</Typography>
                                                   </Box>
                                                   <LinearProgress
                                                       variant="determinate"
                                                       value={subject.progress}
                                                       color={
                                                           subject.progress >= 90
                                                               ? "success"
                                                               : subject.progress >= 70
                                                                   ? "primary"
                                                                   : subject.progress >= 50
                                                                       ? "warning"
                                                                       : "error"
                                                       }
                                                       sx={{ height: 8, borderRadius: 1, mb: 1 }}
                                                   />
                                                   <Typography variant="body2" color="text.secondary">
                                                       Teacher: {subject.teacher}
                                                   </Typography>
                                               </Paper>
                                           </Grid>
                                       ))}
                                   </Grid>
                               </Box> 
        </>
    );
};

export default StudentResult;