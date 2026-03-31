/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Box,
  Chip,
  Divider,
  Grid,
  Typography,
  Alert,
  Paper,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Home,
  Person,
  School,
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
  Info,
  CheckCircle,
  Cancel,
  Assignment,
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

// Helper to safely extract class name from array or object
const getClassName = (classData: any): string => {
  if (!classData) return "N/A";
  if (Array.isArray(classData) && classData.length > 0) {
    const first = classData[0];
    if (typeof first === "string") return first;
    if (first.className) return first.className;
    if (first.name) return first.name;
    return "N/A";
  }
  if (typeof classData === "string") return classData;
  if (classData.className) return classData.className;
  if (classData.name) return classData.name;
  return "N/A";
};

// Helper to safely get sections
const getSections = (sectionData: any): string => {
  if (!sectionData) return "N/A";
  if (Array.isArray(sectionData) && sectionData.length > 0) {
    return sectionData.join(", ");
  }
  if (typeof sectionData === "string") return sectionData;
  return "N/A";
};

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
  const className = getClassName(studentData.className);
  const sections = getSections(studentData.section);

  return (
    <Grid container spacing={3}>
      {/* LEFT COLUMN - Personal & Guardian Information */}
      <Grid item xs={12} md={6}>
        {/* Personal Information */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            mb: 3,
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
            {studentData.birthRegistrationNo && (
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Info fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Birth
                  Registration No.
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {studentData.birthRegistrationNo}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>

        {/* Guardian Information */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <FamilyRestroom sx={{ mr: 1, color: theme.palette.primary.main }} />{" "}
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
                <Phone fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                Father's Mobile
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {studentData.fatherMobile || "N/A"}
              </Typography>
            </Grid>
            {studentData.fatherProfession && (
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Info fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                  Father's Profession
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {studentData.fatherProfession}
                </Typography>
              </Grid>
            )}
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
                <Phone fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                Mother's Mobile
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {studentData.motherMobile || "N/A"}
              </Typography>
            </Grid>
            {studentData.motherProfession && (
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Info fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                  Mother's Profession
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {studentData.motherProfession}
                </Typography>
              </Grid>
            )}
            {/* Additional Guardian */}
            {studentData.guardianInfo && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <ContactPhone
                      fontSize="small"
                      sx={{ mr: 0.5, opacity: 0.7 }}
                    />{" "}
                    Emergency Contact
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {studentData.guardianInfo.name || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Relation
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {studentData.guardianInfo.relation || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Mobile
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {studentData.guardianInfo.mobile || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {studentData.guardianInfo.address || "N/A"}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </Grid>

      {/* RIGHT COLUMN - Academic, Address, Previous School, Documents */}
      <Grid item xs={12} md={6}>
        {/* Academic Information */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            mb: 3,
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
                {sections}
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
            {studentData.smartIdCard && (
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Badge fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                  Smart ID Card
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {studentData.smartIdCard}
                </Typography>
              </Grid>
            )}
            {studentData.activeSession &&
              studentData.activeSession.length > 0 && (
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <CalendarMonth
                      fontSize="small"
                      sx={{ mr: 0.5, opacity: 0.7 }}
                    />{" "}
                    Active Session
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {studentData.activeSession.join(", ")}
                  </Typography>
                </Grid>
              )}
          </Grid>
        </Paper>

        {/* Address Information */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Home sx={{ mr: 1, color: theme.palette.primary.main }} /> Address
            Information
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {studentData.sameAsPermanent !== undefined && (
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
          )}

          {/* Present Address */}
          {studentData.presentAddress && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <Home fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Present
                Address
              </Typography>
              <Grid container spacing={1}>
                {studentData.presentAddress.village && (
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Village:</strong>{" "}
                      {studentData.presentAddress.village}
                    </Typography>
                  </Grid>
                )}
                {studentData.presentAddress.policeStation && (
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Police Station:</strong>{" "}
                      {studentData.presentAddress.policeStation}
                    </Typography>
                  </Grid>
                )}
                {studentData.presentAddress.postOffice && (
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Post Office:</strong>{" "}
                      {studentData.presentAddress.postOffice}
                    </Typography>
                  </Grid>
                )}
                {studentData.presentAddress.postCode && (
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Post Code:</strong>{" "}
                      {studentData.presentAddress.postCode}
                    </Typography>
                  </Grid>
                )}
                {studentData.presentAddress.district && (
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>District:</strong>{" "}
                      {studentData.presentAddress.district}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}

          {/* Permanent Address */}
          {studentData.permanentAddress && !studentData.sameAsPermanent && (
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <LocationOn fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />{" "}
                Permanent Address
              </Typography>
              <Grid container spacing={1}>
                {studentData.permanentAddress.village && (
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Village:</strong>{" "}
                      {studentData.permanentAddress.village}
                    </Typography>
                  </Grid>
                )}
                {studentData.permanentAddress.policeStation && (
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Police Station:</strong>{" "}
                      {studentData.permanentAddress.policeStation}
                    </Typography>
                  </Grid>
                )}
                {studentData.permanentAddress.postOffice && (
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Post Office:</strong>{" "}
                      {studentData.permanentAddress.postOffice}
                    </Typography>
                  </Grid>
                )}
                {studentData.permanentAddress.postCode && (
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Post Code:</strong>{" "}
                      {studentData.permanentAddress.postCode}
                    </Typography>
                  </Grid>
                )}
                {studentData.permanentAddress.district && (
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>District:</strong>{" "}
                      {studentData.permanentAddress.district}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </Paper>

        {/* Previous School */}
        {studentData.previousSchool && (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <School sx={{ mr: 1, color: theme.palette.primary.main }} />{" "}
              Previous School
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={1}>
              {studentData.previousSchool.institution && (
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <strong>Institution:</strong>{" "}
                    {studentData.previousSchool.institution}
                  </Typography>
                </Grid>
              )}
              {studentData.previousSchool.address && (
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <strong>Address:</strong>{" "}
                    {studentData.previousSchool.address}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        )}

        {/* Documents */}
        {studentData.documents && (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Assignment sx={{ mr: 1, color: theme.palette.primary.main }} />{" "}
              Documents
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={1}>
              {Object.entries(studentData.documents).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {value ? (
                      <CheckCircle fontSize="small" color="success" />
                    ) : (
                      <Cancel fontSize="small" color="error" />
                    )}
                    <Typography variant="body2">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default StudentOverview;
