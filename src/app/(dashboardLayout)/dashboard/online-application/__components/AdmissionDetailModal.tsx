/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Bloodtype,
  CalendarToday,
  CancelOutlined,
  CheckCircleOutline,
  Close,
  Description,
  FamilyRestroom,
  Female,
  Fingerprint,
  Flag,
  Home,
  LocalPhone,
  Male,
  Map,
  Person,
  Print,
  School,
  Wc,
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import React, { JSX } from "react";

// Transition for modal
const Transition = React.forwardRef(function Transition(props: any, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Status chip component
const StatusChip = ({ status }: { status?: string }) => {
  const statusConfig: Record<
    string,
    {
      color: "success" | "warning" | "error" | "info" | "default";
      icon: JSX.Element;
      label: string;
    }
  > = {
    pending: {
      color: "warning",
      icon: <span>⏳</span>,
      label: "Pending",
    },
    approved: {
      color: "success",
      icon: <span>✓</span>,
      label: "Approved",
    },
    rejected: {
      color: "error",
      icon: <span>✗</span>,
      label: "Reject",
    },
    enrolled: {
      color: "info",
      icon: <span>📚</span>,
      label: "ভর্তিকৃত",
    },
  };

  const config =
    statusConfig[status?.toLowerCase() || "pending"] || statusConfig.pending;

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      sx={{
        fontWeight: 600,
        borderRadius: "8px",
        minWidth: { xs: 80, sm: 100 },
      }}
    />
  );
};

// Department chip
const DepartmentChip = ({ department }: { department?: string }) => {
  const departmentColors: Record<string, string> = {
    hifz: "#8B5CF6",
    academic: "#3B82F6",
    nazera: "#10B981",
    tajbid: "#F59E0B",
  };

  const departmentLabels: Record<string, string> = {
    hifz: "হিফজ",
    academic: "একাডেমিক",
    nazera: "নাজেরা",
    tajbid: "তাজবীদ",
  };

  return (
    <Chip
      label={departmentLabels[department || ""] || department || "N/A"}
      size="small"
      sx={{
        backgroundColor: `${departmentColors[department || ""] || "#6B7280"}20`,
        color: departmentColors[department || ""] || "#6B7280",
        fontWeight: 600,
        borderRadius: "8px",
        border: `1px solid ${departmentColors[department || ""] || "#6B7280"}30`,
      }}
    />
  );
};

// Gender icon component
const GenderIcon = ({ gender }: { gender?: string }) => {
  switch (gender?.toLowerCase()) {
    case "male":
      return <Male sx={{ color: "#3B82F6" }} />;
    case "female":
      return <Female sx={{ color: "#EC4899" }} />;
    default:
      return <Wc sx={{ color: "#8B5CF6" }} />;
  }
};

// Date formatter
const formatDate = (date?: string | Date) => {
  if (!date) return "N/A";
  try {
    return format(new Date(date), "dd MMM yyyy", { locale: bn });
  } catch {
    return "Invalid date";
  }
};

// Info Row Component
const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: any;
  icon?: React.ReactNode;
}) => (
  <TableRow>
    <TableCell sx={{ border: "none", fontWeight: "bold", width: "40%", py: 1 }}>
      {label}
    </TableCell>
    <TableCell sx={{ border: "none", py: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {icon}
        <Typography variant="body2">{value || "N/A"}</Typography>
      </Box>
    </TableCell>
  </TableRow>
);

// Document Item Component
const DocumentItem = ({ label, value }: { label: string; value?: boolean }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      p: 1,
      borderRadius: 2,
      bgcolor: value
        ? (theme) => alpha(theme.palette.success.main, 0.1)
        : (theme) => alpha(theme.palette.error.main, 0.1),
    }}
  >
    {value ? (
      <CheckCircleOutline color="success" fontSize="small" />
    ) : (
      <CancelOutlined color="error" fontSize="small" />
    )}
    <Typography variant="body2">{label}</Typography>
  </Box>
);

// Main Modal Component
interface AdmissionDetailModalProps {
  open: boolean;
  onClose: () => void;
  application: any;
  loading?: boolean;
}

export const AdmissionDetailModal = ({
  open,
  onClose,
  application,
  loading,
}: AdmissionDetailModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (loading) {
    return <h2>Loading.........</h2>;
  }

  if (!application) return null;

  const {
    applicationId,
    _id,
    status,
    academicYear,
    department: topDepartment,
    class: studentClassTop,
    nameBangla: topNameBangla,
    nameEnglish: topNameEnglish,
    mobile: topMobile,
    fatherMobile: topFatherMobile,
    studentInfo = {},
    parentInfo = {},
    address = {},
    academicInfo = {},
    familyEnvironment = {},
    behaviorSkills = {},
    documents = {},
    termsAccepted = false,
  } = application;

  // Student info with optional chaining
  const {
    nameBangla,
    nameEnglish,
    dateOfBirth,
    age,
    gender,
    bloodGroup,
    nationality = "Bangladeshi",
    nidBirth,
    department,
    class: studentClass,
    session,
    studentPhoto,
  } = studentInfo || {};

  // Academic info with optional chaining
  const { previousSchool, previousClass, gpa } = academicInfo || {};

  // Parent info with optional chaining
  const { father = {}, mother = {}, guardian = {} } = parentInfo || {};

  // Address with optional chaining
  const presentAddress = address?.present || {};
  const permanentAddress = address?.permanent || {};

  // Use values (prefer from studentInfo, fallback to top level)
  const displayNameBangla = nameBangla || topNameBangla;
  const displayNameEnglish = nameEnglish || topNameEnglish;
  const displayDepartment = department || topDepartment;
  const displayClass = studentClass || studentClassTop;
  const displayMobile = topMobile;
  const displayFatherMobile = topFatherMobile;

  // For documents display with optional chaining
  const documentList = [
    {
      key: "photographs",
      label: "ছবি",
      value: documents?.photographs || false,
    },
    {
      key: "birthCertificate",
      label: "জন্ম নিবন্ধন সনদ",
      value: documents?.birthCertificate || false,
    },
    {
      key: "markSheet",
      label: "মার্কশিট",
      value: documents?.markSheet || false,
    },
    {
      key: "transferCertificate",
      label: "ট্রান্সফার সার্টিফিকেট",
      value: documents?.transferCertificate || false,
    },
    {
      key: "characterCertificate",
      label: "চরিত্র সনদপত্র",
      value: documents?.characterCertificate || false,
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 4,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={studentPhoto}
              sx={{
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
                border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                boxShadow: theme.shadows[3],
              }}
            >
              {displayNameBangla?.charAt(0) || "S"}
            </Avatar>
            <Box>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                fontWeight="bold"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {displayNameBangla || displayNameEnglish || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Application ID:{" "}
                {applicationId || _id?.slice(-6).toUpperCase() || "N/A"}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <StatusChip status={status} />
            <IconButton
              onClick={onClose}
              sx={{
                bgcolor: alpha(theme.palette.error.main, 0.1),
                "&:hover": { bgcolor: alpha(theme.palette.error.main, 0.2) },
              }}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ p: isMobile ? 2 : 3 }}>
        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid item xs={12} md={6}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                height: "100%",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                    }}
                  >
                    <Person />
                  </Avatar>
                }
                title="ব্যক্তিগত তথ্য"
                titleTypographyProps={{
                  fontWeight: "bold",
                  variant: isMobile ? "subtitle1" : "h6",
                }}
              />
              <Divider />
              <CardContent>
                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{ bgcolor: "transparent" }}
                >
                  <Table size="small">
                    <TableBody>
                      <InfoRow label="নাম (বাংলা)" value={displayNameBangla} />
                      <InfoRow
                        label="নাম (ইংরেজি)"
                        value={displayNameEnglish}
                      />
                      <InfoRow
                        label="জন্ম তারিখ"
                        value={dateOfBirth ? formatDate(dateOfBirth) : "N/A"}
                        icon={
                          <CalendarToday
                            fontSize="small"
                            sx={{ color: theme.palette.primary.main }}
                          />
                        }
                      />
                      <InfoRow
                        label="বয়স"
                        value={age ? `${age} বছর` : "N/A"}
                      />
                      <InfoRow
                        label="লিঙ্গ"
                        value={gender || "N/A"}
                        icon={<GenderIcon gender={gender} />}
                      />
                      <InfoRow
                        label="রক্তের গ্রুপ"
                        value={bloodGroup || "N/A"}
                        icon={
                          <Bloodtype
                            fontSize="small"
                            sx={{ color: theme.palette.error.main }}
                          />
                        }
                      />
                      <InfoRow
                        label="জাতীয়তা"
                        value={nationality || "N/A"}
                        icon={
                          <Flag
                            fontSize="small"
                            sx={{ color: theme.palette.success.main }}
                          />
                        }
                      />
                      <InfoRow
                        label="এনআইডি/জন্ম নিবন্ধন"
                        value={nidBirth || "N/A"}
                        icon={
                          <Fingerprint
                            fontSize="small"
                            sx={{ color: theme.palette.info.main }}
                          />
                        }
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Academic Information */}
          <Grid item xs={12} md={6}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                height: "100%",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.main,
                    }}
                  >
                    <School />
                  </Avatar>
                }
                title="একাডেমিক তথ্য"
                titleTypographyProps={{
                  fontWeight: "bold",
                  variant: isMobile ? "subtitle1" : "h6",
                }}
              />
              <Divider />
              <CardContent>
                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{ bgcolor: "transparent" }}
                >
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{
                            border: "none",
                            fontWeight: "bold",
                            width: "40%",
                            py: 1,
                          }}
                        >
                          বিভাগ
                        </TableCell>
                        <TableCell sx={{ border: "none", py: 1 }}>
                          <DepartmentChip department={displayDepartment} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ border: "none", fontWeight: "bold", py: 1 }}
                        >
                          শ্রেণি
                        </TableCell>
                        <TableCell sx={{ border: "none", py: 1 }}>
                          <Chip
                            label={displayClass || "N/A"}
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                      </TableRow>
                      <InfoRow
                        label="সেশন"
                        value={session || academicYear || "N/A"}
                      />
                      <InfoRow
                        label="পূর্ববর্তী প্রতিষ্ঠান"
                        value={previousSchool || "N/A"}
                      />
                      <InfoRow
                        label="পূর্ববর্তী শ্রেণি"
                        value={previousClass || "N/A"}
                      />
                      <TableRow>
                        <TableCell
                          sx={{ border: "none", fontWeight: "bold", py: 1 }}
                        >
                          সর্বশেষ জিপিএ
                        </TableCell>
                        <TableCell sx={{ border: "none", py: 1 }}>
                          <Chip
                            label={gpa || "N/A"}
                            size="small"
                            color="success"
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Father's Information */}
          <Grid item xs={12} md={6}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      color: theme.palette.info.main,
                    }}
                  >
                    <FamilyRestroom />
                  </Avatar>
                }
                title="পিতার তথ্য"
                titleTypographyProps={{
                  fontWeight: "bold",
                  variant: isMobile ? "subtitle1" : "h6",
                }}
              />
              <Divider />
              <CardContent>
                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{ bgcolor: "transparent" }}
                >
                  <Table size="small">
                    <TableBody>
                      <InfoRow label="নাম (বাংলা)" value={father?.nameBangla} />
                      <InfoRow
                        label="নাম (ইংরেজি)"
                        value={father?.nameEnglish}
                      />
                      <InfoRow label="পেশা" value={father?.profession} />
                      <InfoRow
                        label="শিক্ষাগত যোগ্যতা"
                        value={father?.education}
                      />
                      <InfoRow
                        label="মোবাইল"
                        value={father?.mobile || displayFatherMobile}
                        icon={
                          <LocalPhone
                            fontSize="small"
                            sx={{ color: theme.palette.success.main }}
                          />
                        }
                      />
                      <InfoRow
                        label="WhatsApp"
                        value={father?.whatsapp}
                        icon={
                          <WhatsAppIcon
                            fontSize="small"
                            sx={{ color: "#25D366" }}
                          />
                        }
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Mother's Information */}
          <Grid item xs={12} md={6}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                      color: theme.palette.secondary.main,
                    }}
                  >
                    <FamilyRestroom />
                  </Avatar>
                }
                title="মাতার তথ্য"
                titleTypographyProps={{
                  fontWeight: "bold",
                  variant: isMobile ? "subtitle1" : "h6",
                }}
              />
              <Divider />
              <CardContent>
                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{ bgcolor: "transparent" }}
                >
                  <Table size="small">
                    <TableBody>
                      <InfoRow label="নাম (বাংলা)" value={mother?.nameBangla} />
                      <InfoRow
                        label="নাম (ইংরেজি)"
                        value={mother?.nameEnglish}
                      />
                      <InfoRow label="পেশা" value={mother?.profession} />
                      <InfoRow
                        label="শিক্ষাগত যোগ্যতা"
                        value={mother?.education}
                      />
                      <InfoRow
                        label="মোবাইল"
                        value={mother?.mobile}
                        icon={
                          <LocalPhone
                            fontSize="small"
                            sx={{ color: theme.palette.success.main }}
                          />
                        }
                      />
                      <InfoRow
                        label="WhatsApp"
                        value={mother?.whatsapp}
                        icon={
                          <WhatsAppIcon
                            fontSize="small"
                            sx={{ color: "#25D366" }}
                          />
                        }
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Guardian's Information (if exists) */}
          {guardian?.nameBangla && (
            <Grid item xs={12} md={6}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                        color: theme.palette.warning.main,
                      }}
                    >
                      <FamilyRestroom />
                    </Avatar>
                  }
                  title="অভিভাবকের তথ্য"
                  titleTypographyProps={{
                    fontWeight: "bold",
                    variant: isMobile ? "subtitle1" : "h6",
                  }}
                />
                <Divider />
                <CardContent>
                  <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{ bgcolor: "transparent" }}
                  >
                    <Table size="small">
                      <TableBody>
                        <InfoRow
                          label="নাম (বাংলা)"
                          value={guardian?.nameBangla}
                        />
                        <InfoRow
                          label="নাম (ইংরেজি)"
                          value={guardian?.nameEnglish}
                        />
                        <InfoRow label="পেশা" value={guardian?.profession} />
                        <InfoRow label="সম্পর্ক" value={guardian?.relation} />
                        <InfoRow
                          label="মোবাইল"
                          value={guardian?.mobile}
                          icon={
                            <LocalPhone
                              fontSize="small"
                              sx={{ color: theme.palette.success.main }}
                            />
                          }
                        />
                        <InfoRow
                          label="WhatsApp"
                          value={guardian?.whatsapp}
                          icon={
                            <WhatsAppIcon
                              fontSize="small"
                              sx={{ color: "#25D366" }}
                            />
                          }
                        />
                        <InfoRow label="ঠিকানা" value={guardian?.address} />
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Present Address */}
          <Grid item xs={12} md={6}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                    }}
                  >
                    <Home />
                  </Avatar>
                }
                title="বর্তমান ঠিকানা"
                titleTypographyProps={{
                  fontWeight: "bold",
                  variant: isMobile ? "subtitle1" : "h6",
                }}
              />
              <Divider />
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <Map color="primary" fontSize="small" sx={{ mt: 0.5 }} />
                  <Box>
                    <Typography variant="body2">
                      {presentAddress?.village || "N/A"},
                      <br />
                      {presentAddress?.postOffice || "N/A"}
                      {presentAddress?.postCode
                        ? `- ${presentAddress.postCode}`
                        : ""}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      থানা: {presentAddress?.policeStation || "N/A"}
                      <br />
                      জেলা: {presentAddress?.district || "N/A"}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Permanent Address */}
          <Grid item xs={12} md={6}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      color: theme.palette.info.main,
                    }}
                  >
                    <Home />
                  </Avatar>
                }
                title="স্থায়ী ঠিকানা"
                titleTypographyProps={{
                  fontWeight: "bold",
                  variant: isMobile ? "subtitle1" : "h6",
                }}
              />
              <Divider />
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <Map color="info" fontSize="small" sx={{ mt: 0.5 }} />
                  <Box>
                    <Typography variant="body2">
                      {permanentAddress?.village || "N/A"},
                      <br />
                      {permanentAddress?.postOffice || "N/A"}
                      {permanentAddress?.postCode
                        ? `- ${permanentAddress.postCode}`
                        : ""}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      থানা: {permanentAddress?.policeStation || "N/A"}
                      <br />
                      জেলা: {permanentAddress?.district || "N/A"}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Family Environment Section */}
          <Grid item xs={12} md={6}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      color: theme.palette.warning.main,
                    }}
                  >
                    <FamilyRestroom />
                  </Avatar>
                }
                title="পারিবারিক পরিবেশ"
                titleTypographyProps={{
                  fontWeight: "bold",
                  variant: isMobile ? "subtitle1" : "h6",
                }}
              />
              <Divider />
              <CardContent>
                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{ bgcolor: "transparent" }}
                >
                  <Table size="small">
                    <TableBody>
                      <InfoRow
                        label="হালাল আয়"
                        value={familyEnvironment?.halalIncome}
                      />
                      <InfoRow
                        label="মা-বাবার নামাজ"
                        value={familyEnvironment?.parentsPrayer}
                      />
                      <InfoRow
                        label="নেশা/অনিষ্টকর অভ্যাস"
                        value={familyEnvironment?.addiction}
                      />
                      <InfoRow
                        label="টিভি দেখা"
                        value={familyEnvironment?.tv}
                      />
                      <InfoRow
                        label="কুরআন তিলাওয়াত"
                        value={familyEnvironment?.quranRecitation}
                      />
                      <InfoRow
                        label="পর্দা পালন"
                        value={familyEnvironment?.purdah}
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Behavior & Skills Section */}
          <Grid item xs={12} md={6}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      color: theme.palette.info.main,
                    }}
                  >
                    <Person />
                  </Avatar>
                }
                title="আচরণ ও দক্ষতা"
                titleTypographyProps={{
                  fontWeight: "bold",
                  variant: isMobile ? "subtitle1" : "h6",
                }}
              />
              <Divider />
              <CardContent>
                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{ bgcolor: "transparent" }}
                >
                  <Table size="small">
                    <TableBody>
                      <InfoRow
                        label="মোবাইল ব্যবহার"
                        value={behaviorSkills?.mobileUsage}
                      />
                      <InfoRow
                        label="সাধারণ আচরণ"
                        value={behaviorSkills?.generalBehavior}
                      />
                      <InfoRow
                        label="আনুগত্য"
                        value={behaviorSkills?.obedience}
                      />
                      <InfoRow
                        label="বড়দের সাথে ব্যবহার"
                        value={behaviorSkills?.elderBehavior}
                      />
                      <InfoRow
                        label="ছোটদের সাথে ব্যবহার"
                        value={behaviorSkills?.youngerBehavior}
                      />
                      <InfoRow
                        label="মিথ্যা/একগুঁয়েমি"
                        value={behaviorSkills?.lyingStubbornness}
                      />
                      <InfoRow
                        label="পড়াশোনায় আগ্রহ"
                        value={behaviorSkills?.studyInterest}
                      />
                      <InfoRow
                        label="ধর্মীয় আগ্রহ"
                        value={behaviorSkills?.religiousInterest}
                      />
                      <InfoRow
                        label="রাগ নিয়ন্ত্রণ"
                        value={behaviorSkills?.angerControl}
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Documents Section */}
          <Grid item xs={12}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.main,
                    }}
                  >
                    <Description />
                  </Avatar>
                }
                title="প্রদত্ত ডকুমেন্টসমূহ"
                titleTypographyProps={{
                  fontWeight: "bold",
                  variant: isMobile ? "subtitle1" : "h6",
                }}
                action={
                  <Chip
                    label={`${documentList.filter((d) => d.value).length}/${documentList.length} সম্পন্ন`}
                    color={
                      documentList.filter((d) => d.value).length ===
                      documentList.length
                        ? "success"
                        : "warning"
                    }
                    size="small"
                  />
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  {documentList.map((doc, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <DocumentItem label={doc.label} value={doc.value} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Terms Accepted */}
          <Grid item xs={12}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  শর্তাবলী গ্রহণ করেছেন?
                </Typography>
                <Chip
                  icon={
                    termsAccepted ? <CheckCircleOutline /> : <CancelOutlined />
                  }
                  label={termsAccepted ? "হ্যাঁ" : "না"}
                  color={termsAccepted ? "success" : "error"}
                  variant="filled"
                  size="small"
                  sx={{ fontWeight: 600, minWidth: 80 }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          startIcon={<Close />}
          size={isMobile ? "small" : "medium"}
        >
          বন্ধ করুন
        </Button>
        <Button
          variant="contained"
          onClick={() => window.open(`/admissions/${_id}/print`, "_blank")}
          startIcon={<Print />}
          size={isMobile ? "small" : "medium"}
        >
          প্রিন্ট
        </Button>
      </DialogActions>
    </Dialog>
  );
};
