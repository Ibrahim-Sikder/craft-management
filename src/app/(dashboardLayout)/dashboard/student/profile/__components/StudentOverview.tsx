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
} from "@mui/material";
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
  Verified,
  ContactPhone,
  FamilyRestroom,
  Book,
} from "@mui/icons-material";
import { format } from "date-fns";

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "success";
    case "inactive":
      return "error";
    case "pending":
      return "warning";
    case "graduated":
      return "info";
    default:
      return "default";
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  try {
    return format(new Date(dateString), "MMMM dd, yyyy");
  } catch (error) {
    return dateString;
  }
};

const sampleSubjects = [
  { name: "Mathematics", progress: 85 },
  { name: "Science", progress: 92 },
  { name: "English", progress: 78 },
  { name: "Social Studies", progress: 88 },
  { name: "Computer Science", progress: 95 },
];

const StudentOverview = ({ student }: { student: any }) => {
  const theme = useTheme();

  if (!student) {
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        Student data not available
      </Alert>
    );
  }

  const studentData = student.data || student;

  const className = studentData.className?.[0]?.className || "N/A";
  const sections = studentData.section || [];

  const totalFees =
    studentData.fees?.reduce(
      (sum: number, fee: any) => sum + (fee.amount || 0),
      0
    ) || 0;
  const totalPaid =
    studentData.payments?.reduce(
      (sum: number, payment: any) => sum + (payment.amountPaid || 0),
      0
    ) || 0;
  const balance = totalFees - totalPaid + (studentData.advanceBalance || 0);

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
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Person sx={{ mr: 1, color: theme.palette.primary.main }} />{" "}
            Personal Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Full
                Name
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {studentData.name || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Badge fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                Student ID
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {studentData.studentId || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CalendarMonth
                  fontSize="small"
                  sx={{ mr: 0.5, opacity: 0.7 }}
                />{" "}
                Date of Birth
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formatDate(studentData.birthDate)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Name
                (Bangla)
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {studentData.nameBangla || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Bloodtype fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                Blood Group
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {studentData.bloodGroup || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Phone fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Mobile
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {studentData.mobile || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Email fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Email
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {studentData.email || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CalendarMonth
                  fontSize="small"
                  sx={{ mr: 0.5, opacity: 0.7 }}
                />{" "}
                Admission Date
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formatDate(studentData.createdAt)}
              </Typography>
            </Grid>
          </Grid>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, display: "flex", alignItems: "center" }}
          >
            <Home sx={{ mr: 1, color: theme.palette.primary.main }} /> Address
            Information
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <LocationOn fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
              Same as Permanent Address
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {studentData.sameAsPermanent ? "Yes" : "No"}
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
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <School sx={{ mr: 1, color: theme.palette.primary.main }} />{" "}
            Academic Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Class fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Class
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {className}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Class fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                Section
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {sections.length > 0 ? sections.join(", ") : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <School fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                Department
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {studentData.studentDepartment || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Verified fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                Status
              </Typography>
              <Chip
                label={studentData.status || "N/A"}
                size="small"
                color={getStatusColor(studentData.status) as any}
                sx={{ fontWeight: "medium" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Badge fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Smart
                ID Card
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {studentData.smartIdCard || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CalendarMonth
                  fontSize="small"
                  sx={{ mr: 0.5, opacity: 0.7 }}
                />{" "}
                Last Updated
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formatDate(studentData.updatedAt)}
              </Typography>
            </Grid>
          </Grid>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, display: "flex", alignItems: "center" }}
          >
            <People sx={{ mr: 1, color: theme.palette.primary.main }} />{" "}
            Guardian Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <FamilyRestroom
                  fontSize="small"
                  sx={{ mr: 0.5, opacity: 0.7 }}
                />{" "}
                Father's Name
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {studentData.fatherName || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ContactPhone fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                Father's Mobile
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {studentData.fatherMobile || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                Mother's Name
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {studentData.motherName || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ContactPhone fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                Mother's Mobile
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {studentData.motherMobile || "N/A"}
              </Typography>
            </Grid>
          </Grid>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, display: "flex", alignItems: "center" }}
          >
            <School sx={{ mr: 1, color: theme.palette.primary.main }} />{" "}
            Financial Summary
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Fees
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                ৳{totalFees.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Paid
              </Typography>
              <Typography
                variant="body1"
                fontWeight="medium"
                color="success.main"
              >
                ৳{totalPaid.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Advance Balance
              </Typography>
              <Typography variant="body1" fontWeight="medium" color="info.main">
                ৳{studentData.advanceBalance?.toFixed(2) || "0.00"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Current Balance
              </Typography>
              <Typography
                variant="body1"
                fontWeight="medium"
                color={balance >= 0 ? "error.main" : "success.main"}
              >
                ৳{balance.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, display: "flex", alignItems: "center" }}
          >
            <LocalLibrary sx={{ mr: 1, color: theme.palette.primary.main }} />{" "}
            Subject Progress
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {sampleSubjects.slice(0, 3).map((subject, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Book fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                  {subject.name}
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
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            View All Subjects
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StudentOverview;
