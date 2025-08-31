/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Chip,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  alpha,
  useTheme,
  CircularProgress,
  Tooltip,
  Paper,
  Fade,
} from "@mui/material"
import {
  School,
  CalendarMonth,
  Edit,
  CheckCircle,
  Mail,
  Phone,
  LocationOn,
  Language,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  VerifiedUser,
  Lightbulb,
  Timeline,
  Assessment,
  Badge,
  Cake,
  Wc,
  Flag,
  Home,
  Work,
  LocalHospital,
  Person,
  Article,
} from "@mui/icons-material"
import { format } from "date-fns"
import DocumentViewer from "./DocumentView"

// Helper component for circular progress with label
function CircularProgressWithLabel(props: { value: number; color?: string }) {
  const theme = useTheme()
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => alpha(theme.palette.primary.main, 0.2),
          position: "absolute",
          left: 0,
        }}
        size={100}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        sx={{
          color: props.color || theme.palette.primary.main,
        }}
        size={100}
        thickness={4}
        value={props.value}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" component="div" color="text.primary" fontWeight="bold">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}

// Format date helper
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return format(date, "MMMM dd, yyyy")
  } catch (error:any) {
    return dateString
  }
}

// Address formatter
const formatAddress = (address: any) => {
  if (!address) return "N/A"

  const parts = [
    address.address,
    address.village,
    address.postOffice,
    address.thana,
    address.district,
    address.division,
  ].filter(Boolean)

  return parts.join(", ")
}

interface TeacherProps {
  teacher: any
}

const TeacherOverview: React.FC<TeacherProps> = ({ teacher }) => {
  const theme = useTheme()

  // Performance metrics (sample data since not in the provided data)
  const performanceMetrics = {
    teachingQuality: 95,
    studentSatisfaction: 92,
    attendance: 98,
    professionalDevelopment: 90,
    administrativeCompliance: 94,
  }

  // Expertise areas (sample data)
  const expertise = [
    teacher?.department || "Education",
    teacher?.designation,
    teacher?.staffType,
    teacher?.language,
    "Curriculum Development",
  ].filter(Boolean)

  // Teacher documents
  const teacherDocuments = [
    {
      id: "resume",
      title: "Professional Resume",
      description: "Teacher's professional resume with detailed work history and qualifications",
      url: teacher?.resumeDoc || "#",
      type: "Resume",
      icon: <Article fontSize="large" />,
      color: theme.palette.primary.main,
    },
    {
      id: "national-id",
      title: "National ID Card",
      description: "Official national identification document for verification purposes",
      url: teacher?.nationalIdDoc || "#",
      type: "ID Document",
      icon: <Badge fontSize="large" />,
      color: theme.palette.error.main,
    },
    {
      id: "certificate",
      title: "Educational Certificates",
      description: "Academic and professional certificates and qualifications",
      url: teacher?.certificateDoc || "#",
      type: "Certificate",
      icon: <School fontSize="large" />,
      color: theme.palette.success.main,
    },
  ]

  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={4}>

        {/* Document Viewer Section */}
        <Grid item xs={12}>
          <DocumentViewer documents={teacherDocuments} />
        </Grid>

        {/* Professional Info */}
        <Grid item xs={12} md={8}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                borderColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Lightbulb sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Professional Information
                  </Typography>
                </Box>
              }
              action={
                <IconButton aria-label="edit" sx={{ color: theme.palette.primary.main }}>
                  <Edit />
                </IconButton>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                    Professional Details
                  </Typography>
                  <List sx={{ p: 0 }}>
                    <ListItem
                      sx={{
                        py: 1,
                        px: 2,
                        mb: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.light, 0.05),
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2" color="text.secondary">
                            Designation
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" fontWeight="medium">
                            {teacher?.designation || "N/A"}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem
                      sx={{
                        py: 1,
                        px: 2,
                        mb: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.light, 0.05),
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2" color="text.secondary">
                            Department
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" fontWeight="medium">
                            {teacher?.department || "N/A"}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem
                      sx={{
                        py: 1,
                        px: 2,
                        mb: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.light, 0.05),
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2" color="text.secondary">
                            Staff Type
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" fontWeight="medium">
                            {teacher?.staffType || "N/A"}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem
                      sx={{
                        py: 1,
                        px: 2,
                        mb: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.light, 0.05),
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2" color="text.secondary">
                            Smart ID Card
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" fontWeight="medium">
                            {teacher?.smartIdCard || "N/A"}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                    Personal Details
                  </Typography>
                  <List sx={{ p: 0 }}>
                    <ListItem
                      sx={{
                        py: 1,
                        px: 2,
                        mb: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.light, 0.05),
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2" color="text.secondary">
                            Nationality
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" fontWeight="medium">
                            {teacher?.nationality || "N/A"}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem
                      sx={{
                        py: 1,
                        px: 2,
                        mb: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.light, 0.05),
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2" color="text.secondary">
                            Religion
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" fontWeight="medium">
                            {teacher?.religion || "N/A"}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem
                      sx={{
                        py: 1,
                        px: 2,
                        mb: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.light, 0.05),
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2" color="text.secondary">
                            Marital Status
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" fontWeight="medium">
                            {teacher?.maritalStatus || "N/A"}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem
                      sx={{
                        py: 1,
                        px: 2,
                        mb: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.light, 0.05),
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2" color="text.secondary">
                            Monthly Salary
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" fontWeight="medium">
                            ${teacher?.monthlySalary || "N/A"}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ mt: 3, display: "flex", alignItems: "center" }}>
                <VerifiedUser sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
                Areas of Expertise
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {expertise.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    color="primary"
                    variant="outlined"
                    size="medium"
                    sx={{
                      borderRadius: "8px",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        transform: "translateY(-2px)",
                      },
                    }}
                  />
                ))}
              </Box>

              {teacher?.educationalQualifications && teacher?.educationalQualifications.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3, display: "flex", alignItems: "center" }}>
                    <School sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
                    Educational Qualifications
                  </Typography>
                  <List>
                    {teacher?.educationalQualifications.map((edu: any, index: number) => (
                      <ListItem
                        key={index}
                        sx={{
                          py: 1.5,
                          px: 2,
                          mb: 1,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.primary.light, 0.05),
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.light, 0.1),
                            transform: "translateX(5px)",
                          },
                        }}
                      >
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                            <School />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight="medium">
                              {edu?.degree || "Degree"}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {edu?.institution || "Institution"}, {edu?.passingYear || "Year"}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {teacher?.workExperience && teacher?.workExperience?.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3, display: "flex", alignItems: "center" }}>
                    <Work sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
                    Work Experience
                  </Typography>
                  <List>
                    {teacher?.workExperience.map((exp: any, index: number) => (
                      <ListItem
                        key={index}
                        sx={{
                          py: 1.5,
                          px: 2,
                          mb: 1,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.success.light, 0.05),
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: alpha(theme.palette.success.light, 0.1),
                            transform: "translateX(5px)",
                          },
                        }}
                      >
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                            <Work />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight="medium">
                              {exp.designation || "Position"} at {exp.organization || "Organization"}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {exp?.startDate ? formatDate(exp?.startDate) : "Start Date"} -{" "}
                              {exp?.endDate ? formatDate(exp?.endDate) : "Present"}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {teacher?.certifications && teacher?.certifications?.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3, display: "flex", alignItems: "center" }}>
                    <CheckCircle sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
                    Certifications
                  </Typography>
                  <List>
                    {teacher?.certifications?.map((cert: any, index: number) => (
                      <ListItem
                        key={index}
                        sx={{
                          py: 1.5,
                          px: 2,
                          mb: 1,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.warning.light, 0.05),
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: alpha(theme.palette.warning.light, 0.1),
                            transform: "translateX(5px)",
                          },
                        }}
                      >
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: theme.palette.warning.main }}>
                            <CheckCircle />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight="medium">
                              {cert.name || "Certification"}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {cert.issuer || "Issuer"}, {cert.year || "Year"}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                borderColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Mail sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Contact Information
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <List sx={{ p: 0 }}>
                <ListItem
                  sx={{
                    py: 1.5,
                    px: 2,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.light, 0.05),
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.light, 0.1),
                    },
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.9) }}>
                      <Mail />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" color="text.secondary">
                        Email
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" fontWeight="medium" color="text.primary">
                        {teacher?.email}
                      </Typography>
                    }
                  />
                </ListItem>

                <ListItem
                  sx={{
                    py: 1.5,
                    px: 2,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.light, 0.05),
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.light, 0.1),
                    },
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.9) }}>
                      <Phone />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" color="text.secondary">
                        Phone
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" fontWeight="medium" color="text.primary">
                        {teacher?.phone}
                      </Typography>
                    }
                  />
                </ListItem>

                <ListItem
                  sx={{
                    py: 1.5,
                    px: 2,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.light, 0.05),
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.light, 0.1),
                    },
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.9) }}>
                      <Language />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" color="text.secondary">
                        Language
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" fontWeight="medium" color="text.primary">
                        {teacher?.language || "N/A"}
                      </Typography>
                    }
                  />
                </ListItem>

                <ListItem
                  sx={{
                    py: 1.5,
                    px: 2,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.light, 0.05),
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.light, 0.1),
                    },
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.9) }}>
                      <Flag />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" color="text.secondary">
                        Nationality
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" fontWeight="medium" color="text.primary">
                        {teacher?.nationality || "N/A"}
                      </Typography>
                    }
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle1"
                gutterBottom
                fontWeight="medium"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Home sx={{ mr: 1, fontSize: 20, color: theme.palette.primary.main }} />
                Current Address
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.light, 0.05),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                  {formatAddress(teacher?.currentAddress)}
                </Typography>
              </Paper>

              <Typography
                variant="subtitle1"
                gutterBottom
                fontWeight="medium"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <LocationOn sx={{ mr: 1, fontSize: 20, color: theme.palette.primary.main }} />
                Permanent Address
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.light, 0.05),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                  {formatAddress(teacher?.permanentAddress)}
                </Typography>
              </Paper>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle1"
                gutterBottom
                fontWeight="medium"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Timeline sx={{ mr: 1, fontSize: 20, color: theme.palette.primary.main }} />
                Social Media
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Tooltip title="LinkedIn">
                  <IconButton
                    color="primary"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <LinkedIn />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Twitter">
                  <IconButton
                    sx={{
                      color: "#1DA1F2",
                      bgcolor: alpha("#1DA1F2", 0.1),
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha("#1DA1F2", 0.2),
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Twitter />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Facebook">
                  <IconButton
                    sx={{
                      color: "#4267B2",
                      bgcolor: alpha("#4267B2", 0.1),
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha("#4267B2", 0.2),
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Facebook />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Instagram">
                  <IconButton
                    sx={{
                      color: "#C13584",
                      bgcolor: alpha("#C13584", 0.1),
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha("#C13584", 0.2),
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Instagram />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Metrics */}
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                borderColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Assessment sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Performance Metrics
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                {Object.entries(performanceMetrics).map(([key, value], index) => (
                  <Grid item xs={12} sm={6} md={2.4} key={key}>
                    <Paper
                      elevation={0}
                      sx={{
                        textAlign: "center",
                        p: 3,
                        borderRadius: 3,
                        bgcolor: [
                          alpha(theme.palette.primary.light, 0.1),
                          alpha(theme.palette.success.light, 0.1),
                          alpha(theme.palette.info.light, 0.1),
                          alpha(theme.palette.warning.light, 0.1),
                          alpha(theme.palette.error.light, 0.1),
                        ][index % 5],
                        border: `1px solid ${[
                            alpha(theme.palette.primary.main, 0.2),
                            alpha(theme.palette.success.main, 0.2),
                            alpha(theme.palette.info.main, 0.2),
                            alpha(theme.palette.warning.main, 0.2),
                            alpha(theme.palette.error.main, 0.2),
                          ][index % 5]
                          }`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontWeight: "medium" }}>
                        {key
                          .split(/(?=[A-Z])/)
                          .join(" ")
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </Typography>
                      <Box sx={{ position: "relative", display: "inline-flex", my: 2 }}>
                        <CircularProgressWithLabel
                          value={value}
                          color={
                            [
                              theme.palette.primary.main,
                              theme.palette.success.main,
                              theme.palette.info.main,
                              theme.palette.warning.main,
                              theme.palette.error.main,
                            ][index % 5]
                          }
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          color: [
                            theme.palette.primary.dark,
                            theme.palette.success.dark,
                            theme.palette.info.dark,
                            theme.palette.warning.dark,
                            theme.palette.error.dark,
                          ][index % 5],
                          fontWeight: "medium",
                        }}
                      >
                        {value >= 90
                          ? "Excellent"
                          : value >= 80
                            ? "Very Good"
                            : value >= 70
                              ? "Good"
                              : "Needs Improvement"}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fade>
  )
}

export default TeacherOverview
