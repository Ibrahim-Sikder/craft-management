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
  FamilyRestroom,
  CheckCircle,
  Cancel,
  Assignment,
  Psychology,
  Flag,
  Cake,
  Description,
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
    case "enrolled":
      return "success";
    case "approved":
      return "success";
    case "rejected":
      return "error";
    default:
      return "default";
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  try {
    return format(new Date(dateString), "MMMM dd, yyyy");
  } catch {
    return dateString;
  }
};

const getClassName = (classData: any): string => {
  if (!classData) return "N/A";
  if (Array.isArray(classData) && classData.length > 0) {
    const first = classData[0];
    if (typeof first === "string") return first;
    if (first?.className) return first.className;
    if (first?.name) return first.name;
    return "N/A";
  }
  if (typeof classData === "string") return classData;
  if (classData?.className) return classData.className;
  return "N/A";
};

const getSections = (sectionData: any): string => {
  if (!sectionData) return "N/A";
  if (Array.isArray(sectionData)) {
    return sectionData.length > 0 ? sectionData.join(", ") : "N/A";
  }
  if (typeof sectionData === "string") return sectionData || "N/A";
  return "N/A";
};

// Reusable info row
const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <Grid item xs={6}>
    <Typography
      variant="subtitle2"
      color="text.secondary"
      sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
    >
      {icon && (
        <Box component="span" sx={{ mr: 0.5, opacity: 0.7, display: "flex" }}>
          {icon}
        </Box>
      )}
      {label}
    </Typography>
    <Typography variant="body1" fontWeight="medium">
      {value || "N/A"}
    </Typography>
  </Grid>
);

const SectionPaper = ({
  title,
  icon,
  children,
  mb = 3,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  mb?: number;
}) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        mb,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Box sx={{ mr: 1, color: "primary.main", display: "flex" }}>{icon}</Box>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Paper>
  );
};

const ParentSection = ({
  title,
  info,
  showDivider = true,
}: {
  title: string;
  info: any;
  showDivider?: boolean;
}) => {
  if (!info) return null;
  return (
    <>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", mt: 1, mb: 1.5 }}
      >
        {title}
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Name (English)
          </Typography>
          <Typography variant="body1">{info.nameEnglish || "N/A"}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Name (Bangla)
          </Typography>
          <Typography variant="body1">{info.nameBangla || "N/A"}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Profession
          </Typography>
          <Typography variant="body1">{info.profession || "N/A"}</Typography>
        </Grid>
        {/* education only for father/mother, not guardian */}
        {"education" in info && (
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Education
            </Typography>
            <Typography variant="body1">{info.education || "N/A"}</Typography>
          </Grid>
        )}
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Mobile
          </Typography>
          <Typography variant="body1">{info.mobile || "N/A"}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            WhatsApp
          </Typography>
          <Typography variant="body1">{info.whatsapp || "N/A"}</Typography>
        </Grid>
        {"nid" in info && (
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              NID
            </Typography>
            <Typography variant="body1">{info.nid || "N/A"}</Typography>
          </Grid>
        )}
        {"income" in info && (
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Income (Monthly)
            </Typography>
            <Typography variant="body1">
              {info.income ? `৳${info.income.toLocaleString()}` : "N/A"}
            </Typography>
          </Grid>
        )}
        {"relation" in info && (
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Relation
            </Typography>
            <Typography variant="body1">{info.relation || "N/A"}</Typography>
          </Grid>
        )}
        {"address" in info && (
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Address
            </Typography>
            <Typography variant="body1">{info.address || "N/A"}</Typography>
          </Grid>
        )}
      </Grid>
      {showDivider && <Divider sx={{ my: 2 }} />}
    </>
  );
};

const AddressBlock = ({
  title,
  address,
  icon,
}: {
  title: string;
  address: any;
  icon: React.ReactNode;
}) => {
  if (!address) return null;
  const hasData =
    address.village ||
    address.policeStation ||
    address.postOffice ||
    address.postCode ||
    address.district;
  if (!hasData) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ display: "flex", alignItems: "center", mb: 1 }}
      >
        {icon} {title}
      </Typography>
      <Grid container spacing={1}>
        {[
          { label: "Village/Area", val: address.village },
          { label: "Thana", val: address.policeStation },
          { label: "Post Office", val: address.postOffice },
          { label: "Post Code", val: address.postCode },
          { label: "District", val: address.district },
        ]
          .filter((r) => r.val)
          .map((r) => (
            <Grid item xs={12} key={r.label}>
              <Typography variant="body2">
                <strong>{r.label}:</strong> {r.val}
              </Typography>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
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

  // Data is already unwrapped (singleStudent?.data is passed as `student`)
  const s = student.data || student;

  const className = getClassName(s.className);
  const sections = getSections(s.section);
  const parentInfo = s.parentInfo || {};
  const familyEnv = s.familyEnvironment || {};
  const behaviorSkills = s.behaviorSkills || {};
  const hasFamilyEnv = Object.values(familyEnv).some((v) => v);
  const hasBehaviorSkills = Object.values(behaviorSkills).some((v) => v);

  return (
    <Grid container spacing={3}>
      {/* ── LEFT COLUMN ── */}
      <Grid item xs={12} md={6}>
        {/* Personal Information */}
        <SectionPaper title="Personal Information" icon={<Person />}>
          <Grid container spacing={2}>
            <InfoRow
              label="Full Name (English)"
              value={s.name}
              icon={<Person fontSize="small" />}
            />
            <InfoRow
              label="Full Name (Bangla)"
              value={s.nameBangla}
              icon={<Person fontSize="small" />}
            />
            <InfoRow
              label="Student ID"
              value={s.studentId}
              icon={<Badge fontSize="small" />}
            />
            {s.applicationId && (
              <InfoRow
                label="Application ID"
                value={s.applicationId}
                icon={<Assignment fontSize="small" />}
              />
            )}
            <InfoRow
              label="Date of Birth"
              value={formatDate(s.birthDate)}
              icon={<Cake fontSize="small" />}
            />
            {s.age && (
              <InfoRow
                label="Age"
                value={s.age}
                icon={<Cake fontSize="small" />}
              />
            )}
            <InfoRow
              label="NID / Birth Reg."
              value={s.nidBirth || s.birthRegistrationNo}
              icon={<Description fontSize="small" />}
            />
            <InfoRow
              label="Blood Group"
              value={s.bloodGroup}
              icon={<Bloodtype fontSize="small" />}
            />
            <InfoRow
              label="Nationality"
              value={s.nationality}
              icon={<Flag fontSize="small" />}
            />
            <InfoRow
              label="Mobile"
              value={s.mobile}
              icon={<Phone fontSize="small" />}
            />
            <InfoRow
              label="Email"
              value={s.email}
              icon={<Email fontSize="small" />}
            />
            <InfoRow
              label="Admission Date"
              value={formatDate(s.createdAt)}
              icon={<CalendarMonth fontSize="small" />}
            />

            {/* Admission Status chip */}
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Admission Status
              </Typography>
              <Chip
                label={s.admissionStatus || "N/A"}
                size="small"
                color={getStatusColor(s.admissionStatus) as any}
                sx={{ fontWeight: "medium" }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Terms Accepted
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {s.termsAccepted ? (
                  <CheckCircle fontSize="small" color="success" />
                ) : (
                  <Cancel fontSize="small" color="error" />
                )}
                <Typography variant="body1" fontWeight="medium">
                  {s.termsAccepted ? "Yes" : "No"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </SectionPaper>

        {/* Guardian / Parent Information */}
        <SectionPaper
          title="Parent & Guardian Information"
          icon={<FamilyRestroom />}
          mb={0}
        >
          <ParentSection
            title="Father"
            info={parentInfo.father}
            showDivider={!!parentInfo.mother}
          />
          <ParentSection
            title="Mother"
            info={parentInfo.mother}
            showDivider={!!parentInfo.guardian}
          />
          <ParentSection
            title="Emergency Contact (Guardian)"
            info={parentInfo.guardian}
            showDivider={false}
          />
          {!parentInfo.father && !parentInfo.mother && !parentInfo.guardian && (
            <Typography variant="body2" color="text.secondary">
              No parent / guardian information available.
            </Typography>
          )}
        </SectionPaper>
      </Grid>

      {/* ── RIGHT COLUMN ── */}
      <Grid item xs={12} md={6}>
        {/* Academic Information */}
        <SectionPaper title="Academic Information" icon={<School />}>
          <Grid container spacing={2}>
            <InfoRow
              label="Class"
              value={className}
              icon={<Class fontSize="small" />}
            />
            <InfoRow
              label="Section"
              value={sections}
              icon={<Class fontSize="small" />}
            />
            <InfoRow
              label="Session"
              value={s.session}
              icon={<CalendarMonth fontSize="small" />}
            />
            <InfoRow
              label="Department (Enrollment)"
              value={s.studentDepartment}
              icon={<School fontSize="small" />}
            />
            {s.department && (
              <InfoRow
                label="Department (Admission)"
                value={s.department}
                icon={<School fontSize="small" />}
              />
            )}
            {s.class && (
              <InfoRow
                label="Class (Admission)"
                value={s.class}
                icon={<Class fontSize="small" />}
              />
            )}
            {/* academicYear — only show if it's actually a year, not the wrong field */}
            {s.academicYear &&
              !["morning", "day", "evening"].includes(
                s.academicYear?.toLowerCase(),
              ) && (
                <InfoRow
                  label="Academic Year"
                  value={s.academicYear}
                  icon={<CalendarMonth fontSize="small" />}
                />
              )}
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Status
              </Typography>
              <Chip
                label={s.status || "N/A"}
                size="small"
                color={getStatusColor(s.status) as any}
                sx={{ fontWeight: "medium" }}
              />
            </Grid>
            {s.activeSession && s.activeSession.length > 0 && (
              <InfoRow
                label="Active Session"
                value={s.activeSession.join(", ")}
                icon={<CalendarMonth fontSize="small" />}
              />
            )}
            {s.academicInfo?.previousSchool && (
              <InfoRow
                label="Previous School (Admission)"
                value={s.academicInfo.previousSchool}
                icon={<School fontSize="small" />}
              />
            )}
            {s.academicInfo?.previousClass && (
              <InfoRow
                label="Previous Class"
                value={s.academicInfo.previousClass}
                icon={<Class fontSize="small" />}
              />
            )}
            {s.academicInfo?.gpa && (
              <InfoRow label="GPA" value={s.academicInfo.gpa} />
            )}
          </Grid>
        </SectionPaper>

        {/* Address Information */}
        <SectionPaper title="Address Information" icon={<Home />}>
          <AddressBlock
            title="Present Address"
            address={s.presentAddress}
            icon={<Home fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />}
          />
          {!s.sameAsPermanent && (
            <AddressBlock
              title="Permanent Address"
              address={s.permanentAddress}
              icon={
                <LocationOn fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
              }
            />
          )}
          {s.sameAsPermanent && (
            <Typography variant="body2" color="text.secondary">
              Permanent address same as present address.
            </Typography>
          )}
        </SectionPaper>

        {/* Previous School */}
        {(s.previousSchool?.institution || s.previousSchool?.address) && (
          <SectionPaper title="Previous School" icon={<School />}>
            <Grid container spacing={1}>
              {s.previousSchool.institution && (
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <strong>Institution:</strong> {s.previousSchool.institution}
                  </Typography>
                </Grid>
              )}
              {s.previousSchool.address && (
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <strong>Address:</strong> {s.previousSchool.address}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </SectionPaper>
        )}

        {/* Family Environment */}
        {hasFamilyEnv && (
          <SectionPaper title="Family Environment" icon={<Home />}>
            <Grid container spacing={2}>
              {[
                { label: "Halal Income", val: familyEnv.halalIncome },
                { label: "Parents Prayer", val: familyEnv.parentsPrayer },
                { label: "Addiction", val: familyEnv.addiction },
                { label: "TV", val: familyEnv.tv },
                { label: "Quran Recitation", val: familyEnv.quranRecitation },
                { label: "Purdah", val: familyEnv.purdah },
              ]
                .filter((r) => r.val)
                .map((r) => (
                  <Grid item xs={6} key={r.label}>
                    <Typography variant="body2" color="text.secondary">
                      {r.label}
                    </Typography>
                    <Typography variant="body1">{r.val}</Typography>
                  </Grid>
                ))}
            </Grid>
          </SectionPaper>
        )}

        {/* Behavior & Skills */}
        {hasBehaviorSkills && (
          <SectionPaper title="Behavior & Skills" icon={<Psychology />}>
            <Grid container spacing={2}>
              {[
                { label: "Mobile Usage", val: behaviorSkills.mobileUsage },
                {
                  label: "General Behavior",
                  val: behaviorSkills.generalBehavior,
                },
                { label: "Obedience", val: behaviorSkills.obedience },
                { label: "Elder Behavior", val: behaviorSkills.elderBehavior },
                {
                  label: "Younger Behavior",
                  val: behaviorSkills.youngerBehavior,
                },
                {
                  label: "Lying / Stubbornness",
                  val: behaviorSkills.lyingStubbornness,
                },
                { label: "Study Interest", val: behaviorSkills.studyInterest },
                {
                  label: "Religious Interest",
                  val: behaviorSkills.religiousInterest,
                },
                { label: "Anger Control", val: behaviorSkills.angerControl },
              ]
                .filter((r) => r.val)
                .map((r) => (
                  <Grid item xs={6} key={r.label}>
                    <Typography variant="body2" color="text.secondary">
                      {r.label}
                    </Typography>
                    <Typography variant="body1">{r.val}</Typography>
                  </Grid>
                ))}
            </Grid>
          </SectionPaper>
        )}

        {/* Documents */}
        {s.documents && (
          <SectionPaper title="Documents" icon={<Assignment />} mb={0}>
            <Grid container spacing={1}>
              {Object.entries(s.documents).map(([key, value]) => (
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
                        .replace(/^./, (s) => s.toUpperCase())}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </SectionPaper>
        )}
      </Grid>
    </Grid>
  );
};

export default StudentOverview;
