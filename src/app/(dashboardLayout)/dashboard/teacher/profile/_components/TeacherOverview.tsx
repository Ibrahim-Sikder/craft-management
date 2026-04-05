/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { formatDate } from "@/utils/formateDate";
import {
  Article,
  Badge,
  CheckCircle,
  Edit,
  Facebook,
  Flag,
  Home,
  Instagram,
  Language,
  Lightbulb,
  LinkedIn,
  LocationOn,
  Mail,
  Phone,
  School,
  Timeline,
  Twitter,
  Work,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import type React from "react";

const formatAddress = (address: any) => {
  if (!address) return "N/A";

  const parts = [
    address.address,
    address.village,
    address.postOffice,
    address.thana,
    address.district,
    address.division,
  ].filter(Boolean);

  return parts.join(", ");
};

interface TeacherProps {
  teacher: any;
}

const TeacherOverview: React.FC<TeacherProps> = ({ teacher }) => {
  const theme = useTheme();

  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={4}>
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
                  <Lightbulb
                    sx={{ color: theme.palette.primary.main, mr: 1 }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    Professional Information
                  </Typography>
                </Box>
              }
              action={
                <IconButton
                  aria-label="edit"
                  sx={{ color: theme.palette.primary.main }}
                >
                  <Edit />
                </IconButton>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="medium"
                    gutterBottom
                  >
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
                  <Typography
                    variant="subtitle1"
                    fontWeight="medium"
                    gutterBottom
                  >
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

              {teacher?.educationalQualifications &&
                teacher?.educationalQualifications.length > 0 && (
                  <>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ mt: 3, display: "flex", alignItems: "center" }}
                    >
                      <School
                        sx={{
                          mr: 1,
                          color: theme.palette.primary.main,
                          fontSize: 20,
                        }}
                      />
                      Educational Qualifications
                    </Typography>
                    <List>
                      {teacher?.educationalQualifications.map(
                        (edu: any, index: number) => (
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
                                bgcolor: alpha(
                                  theme.palette.primary.light,
                                  0.1,
                                ),
                                transform: "translateX(5px)",
                              },
                            }}
                          >
                            <ListItemIcon>
                              <Avatar
                                sx={{ bgcolor: theme.palette.primary.main }}
                              >
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {edu?.institution || "Institution"},{" "}
                                  {edu?.passingYear || "Year"}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ),
                      )}
                    </List>
                  </>
                )}

              {teacher?.workExperience &&
                teacher?.workExperience?.length > 0 && (
                  <>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ mt: 3, display: "flex", alignItems: "center" }}
                    >
                      <Work
                        sx={{
                          mr: 1,
                          color: theme.palette.primary.main,
                          fontSize: 20,
                        }}
                      />
                      Work Experience
                    </Typography>
                    <List>
                      {teacher?.workExperience.map(
                        (exp: any, index: number) => (
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
                                bgcolor: alpha(
                                  theme.palette.success.light,
                                  0.1,
                                ),
                                transform: "translateX(5px)",
                              },
                            }}
                          >
                            <ListItemIcon>
                              <Avatar
                                sx={{ bgcolor: theme.palette.success.main }}
                              >
                                <Work />
                              </Avatar>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="body1" fontWeight="medium">
                                  {exp.designation || "Position"} at{" "}
                                  {exp.organization || "Organization"}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {exp?.startDate
                                    ? formatDate(exp?.startDate)
                                    : "Start Date"}{" "}
                                  -{" "}
                                  {exp?.endDate
                                    ? formatDate(exp?.endDate)
                                    : "Present"}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ),
                      )}
                    </List>
                  </>
                )}

              {teacher?.certifications &&
                teacher?.certifications?.length > 0 && (
                  <>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ mt: 3, display: "flex", alignItems: "center" }}
                    >
                      <CheckCircle
                        sx={{
                          mr: 1,
                          color: theme.palette.primary.main,
                          fontSize: 20,
                        }}
                      />
                      Certifications
                    </Typography>
                    <List>
                      {teacher?.certifications?.map(
                        (cert: any, index: number) => (
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
                                bgcolor: alpha(
                                  theme.palette.warning.light,
                                  0.1,
                                ),
                                transform: "translateX(5px)",
                              },
                            }}
                          >
                            <ListItemIcon>
                              <Avatar
                                sx={{ bgcolor: theme.palette.warning.main }}
                              >
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {cert.issuer || "Issuer"},{" "}
                                  {cert.year || "Year"}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ),
                      )}
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
                    <Avatar
                      sx={{ bgcolor: alpha(theme.palette.primary.main, 0.9) }}
                    >
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
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        color="text.primary"
                      >
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
                    <Avatar
                      sx={{ bgcolor: alpha(theme.palette.success.main, 0.9) }}
                    >
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
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        color="text.primary"
                      >
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
                    <Avatar
                      sx={{ bgcolor: alpha(theme.palette.warning.main, 0.9) }}
                    >
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
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        color="text.primary"
                      >
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
                    <Avatar
                      sx={{ bgcolor: alpha(theme.palette.info.main, 0.9) }}
                    >
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
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        color="text.primary"
                      >
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
                <Home
                  sx={{
                    mr: 1,
                    fontSize: 20,
                    color: theme.palette.primary.main,
                  }}
                />
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
                <LocationOn
                  sx={{
                    mr: 1,
                    fontSize: 20,
                    color: theme.palette.primary.main,
                  }}
                />
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default TeacherOverview;
