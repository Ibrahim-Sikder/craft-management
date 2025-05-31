/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Typography,
  Alert,
  Paper,
  alpha,
  useTheme,
} from "@mui/material"
import {
  Home,
  LocalLibrary,
  Person,
  School,
  People,
  CalendarMonth,
  Email,
  Phone,
  LocationOn,
  Bloodtype,
  Badge,
  Class,
  Numbers,
  Verified,
  ContactPhone,
  FamilyRestroom,
  Book,
} from "@mui/icons-material"
import { format } from "date-fns"

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "success"
    case "inactive":
      return "error"
    case "pending":
      return "warning"
    case "graduated":
      return "info"
    default:
      return "default"
  }
}

// Helper function to format date
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A"
  try {
    return format(new Date(dateString), "MMMM dd, yyyy")
  } catch (error) {
    return dateString
  }
}

// Sample subject data (since it's not in the backend data)
const sampleSubjects = [
  { name: "Mathematics", progress: 85 },
  { name: "Science", progress: 92 },
  { name: "English", progress: 78 },
  { name: "Social Studies", progress: 88 },
  { name: "Computer Science", progress: 95 },
]

const StudentOverview = ({ student }: { student: any }) => {
  const theme = useTheme()

  // Handle case where student data is not provided
  if (!student) {
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        Student data not available
      </Alert>
    )
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            height: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <Person sx={{ mr: 1, color: theme.palette.primary.main }} /> Personal Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Full Name
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.name || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <Badge fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Student ID
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.studentId || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <CalendarMonth fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Date of Birth
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formatDate(student.birthDate)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Gender
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.gender || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <Bloodtype fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Blood Group
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.bloodGroup || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <Phone fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Mobile
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.mobile || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <Email fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Email
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.email || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <CalendarMonth fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Admission Date
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formatDate(student.createdAt)}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, display: "flex", alignItems: "center" }}>
            <Home sx={{ mr: 1, color: theme.palette.primary.main }} /> Address Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOn fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Present Address
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {student.presentAddress || "N/A"}
              {student.presentThana && `, ${student.presentThana}`}
              {student.presentDistrict && `, ${student.presentDistrict}`}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Home fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Permanent Address
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {student.permanentAddress || "N/A"}
              {student.permanentThana && `, ${student.permanentThana}`}
              {student.permanentDistrict && `, ${student.permanentDistrict}`}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            height: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <School sx={{ mr: 1, color: theme.palette.primary.main }} /> Academic Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <Class fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Class
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {Array.isArray(student.className) && student.className.length > 0
                  ? student.className.join(", ")
                  : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <Class fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Section
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {Array.isArray(student.section) && student.section.length > 0 ? student.section.join(", ") : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <Numbers fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Roll Number
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.studentClassRoll || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <Verified fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Status
              </Typography>
              <Chip
                label={student.status || "N/A"}
                size="small"
                color={getStatusColor(student.status) as any}
                sx={{ fontWeight: "medium" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <Badge fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Smart ID Card
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.smartIdCard || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <School fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Student Type
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.studentType || "N/A"}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, display: "flex", alignItems: "center" }}>
            <People sx={{ mr: 1, color: theme.palette.primary.main }} /> Guardian Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <FamilyRestroom fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Guardian Name
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.guardianName || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <ContactPhone fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Guardian Mobile
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.guardianMobile || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Father's Name
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.fatherName || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Mother's Name
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.motherName || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <Badge fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> NID Information
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.nidFatherMotherGuardian || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <People fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Relation
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.relation || "N/A"}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, display: "flex", alignItems: "center" }}>
            <LocalLibrary sx={{ mr: 1, color: theme.palette.primary.main }} /> Subject Progress
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {sampleSubjects.slice(0, 3).map((subject, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5, alignItems: "center" }}>
                <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                  <Book fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> {subject.name}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {subject.progress}%
                </Typography>
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
                sx={{ height: 8, borderRadius: 1 }}
              />
            </Box>
          ))}
          <Button 
            variant="text" 
            size="small" 
            sx={{ 
              mt: 1,
              color: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1)
              }
            }}
          >
            View All Subjects
          </Button>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default StudentOverview
