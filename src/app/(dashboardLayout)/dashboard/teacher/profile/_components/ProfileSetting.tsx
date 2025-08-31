"use client"
import {
  Grid,
  Typography,
  Avatar,
  Chip,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  alpha,
  useTheme,
  Box,
  Paper,
  Fade,
} from "@mui/material"
import {
  Google,
  Microsoft,
  Settings,
  Edit,
  Security,
  Notifications,
  Visibility,
  DisplaySettings,
  Language,
  Accessibility,
  CloudDownload,
  Sync,
} from "@mui/icons-material"

const ProfileSetting = () => {
  const theme = useTheme()

  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={4}>
        {/* Account Settings */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              height: "100%",
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
                  <Settings sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Account Settings
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <List>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.light, 0.05),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.light, 0.1),
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <ListItem sx={{ px: 0 }}>
                    <Box sx={{ mr: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <Edit />
                      </Avatar>
                    </Box>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          Profile Information
                        </Typography>
                      }
                      secondary="Update your personal and professional information"
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      Edit
                    </Button>
                  </ListItem>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.error.light, 0.05),
                    border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.error.light, 0.1),
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <ListItem sx={{ px: 0 }}>
                    <Box sx={{ mr: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Avatar sx={{ bgcolor: theme.palette.error.main }}>
                        <Security />
                      </Avatar>
                    </Box>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          Password & Security
                        </Typography>
                      }
                      secondary="Manage your password and security settings"
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      sx={{
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      Change
                    </Button>
                  </ListItem>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.warning.light, 0.05),
                    border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.warning.light, 0.1),
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <ListItem sx={{ px: 0 }}>
                    <Box sx={{ mr: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Avatar sx={{ bgcolor: theme.palette.warning.main }}>
                        <Notifications />
                      </Avatar>
                    </Box>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          Notification Preferences
                        </Typography>
                      }
                      secondary="Control which notifications you receive"
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      color="warning"
                      sx={{
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      Configure
                    </Button>
                  </ListItem>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.info.light, 0.05),
                    border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.info.light, 0.1),
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <ListItem sx={{ px: 0 }}>
                    <Box sx={{ mr: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                        <Visibility />
                      </Avatar>
                    </Box>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          Privacy Settings
                        </Typography>
                      }
                      secondary="Manage who can see your information"
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      color="info"
                      sx={{
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      Adjust
                    </Button>
                  </ListItem>
                </Paper>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* System Preferences */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              height: "100%",
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
                  <DisplaySettings sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    System Preferences
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <List>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.light, 0.05),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.light, 0.1),
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <ListItem sx={{ px: 0 }}>
                    <Box sx={{ mr: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <DisplaySettings />
                      </Avatar>
                    </Box>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          Display Settings
                        </Typography>
                      }
                      secondary="Customize your dashboard appearance"
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      Customize
                    </Button>
                  </ListItem>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.light, 0.05),
                    border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.success.light, 0.1),
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <ListItem sx={{ px: 0 }}>
                    <Box sx={{ mr: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                        <Language />
                      </Avatar>
                    </Box>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          Language & Region
                        </Typography>
                      }
                      secondary="Set your preferred language and regional settings"
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      sx={{
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      Change
                    </Button>
                  </ListItem>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.info.light, 0.05),
                    border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.info.light, 0.1),
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <ListItem sx={{ px: 0 }}>
                    <Box sx={{ mr: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                        <Accessibility />
                      </Avatar>
                    </Box>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          Accessibility
                        </Typography>
                      }
                      secondary="Configure accessibility features"
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      color="info"
                      sx={{
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      Configure
                    </Button>
                  </ListItem>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.warning.light, 0.05),
                    border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.warning.light, 0.1),
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <ListItem sx={{ px: 0 }}>
                    <Box sx={{ mr: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Avatar sx={{ bgcolor: theme.palette.warning.main }}>
                        <CloudDownload />
                      </Avatar>
                    </Box>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          Data Export
                        </Typography>
                      }
                      secondary="Export your data and reports"
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      color="warning"
                      sx={{
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      Export
                    </Button>
                  </ListItem>
                </Paper>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Integration Settings */}
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
                  <Sync sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Integrations & Connected Services
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                      overflow: "hidden",
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                      <Avatar
                        sx={{
                          width: 70,
                          height: 70,
                          mx: "auto",
                          mb: 2,
                          bgcolor: "#4285F4",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Google />
                      </Avatar>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Google Classroom
                      </Typography>
                      <Chip label="Connected" color="success" size="small" sx={{ mb: 2, fontWeight: "medium" }} />
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          borderRadius: 2,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          },
                        }}
                      >
                        Manage
                      </Button>
                    </CardContent>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      overflow: "hidden",
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                      <Avatar
                        sx={{
                          width: 70,
                          height: 70,
                          mx: "auto",
                          mb: 2,
                          bgcolor: "#00A4EF",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Microsoft />
                      </Avatar>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Microsoft Teams
                      </Typography>
                      <Chip label="Not Connected" color="default" size="small" sx={{ mb: 2, fontWeight: "medium" }} />
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          borderRadius: 2,
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
                          },
                        }}
                      >
                        Connect
                      </Button>
                    </CardContent>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                      overflow: "hidden",
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                      <Avatar
                        sx={{
                          width: 70,
                          height: 70,
                          mx: "auto",
                          mb: 2,
                          bgcolor: "#2D8CFF",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        Z
                      </Avatar>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Zoom
                      </Typography>
                      <Chip label="Connected" color="success" size="small" sx={{ mb: 2, fontWeight: "medium" }} />
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          borderRadius: 2,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          },
                        }}
                      >
                        Manage
                      </Button>
                    </CardContent>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fade>
  )
}

export default ProfileSetting
