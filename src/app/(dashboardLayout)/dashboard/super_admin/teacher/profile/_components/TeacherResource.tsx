"use client"
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
  useTheme,
  Paper,
  Tooltip,
  Fade,
  Chip,
} from "@mui/material"
import {
  Assessment,
  Assignment,
  MenuBook,
  BarChart,
  Folder,
  Edit,
  Download,
  Add,
  Delete,
  Visibility,
  PictureAsPdf,
  Description,
  InsertDriveFile,
  Slideshow,
  Code,
} from "@mui/icons-material"
import { teacherData } from "./TeacherOverview"

const TeacherResource = () => {
  const theme = useTheme()

  // Function to get the appropriate icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <PictureAsPdf />
      case "Document":
        return <Description />
      case "Spreadsheet":
        return <InsertDriveFile />
      case "Presentation":
        return <Slideshow />
      case "Software":
        return <Code />
      default:
        return <Folder />
    }
  }

  // Function to get color based on resource type
  const getResourceColor = (type: string) => {
    switch (type) {
      case "PDF":
        return theme.palette.error.main
      case "Document":
        return theme.palette.primary.main
      case "Spreadsheet":
        return theme.palette.success.main
      case "Presentation":
        return theme.palette.warning.main
      case "Software":
        return theme.palette.secondary.main
      default:
        return theme.palette.grey[700]
    }
  }

  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={4}>
        {/* Teaching Resources */}
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              overflow: "hidden",
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
                  <MenuBook sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Teaching Resources
                  </Typography>
                </Box>
              }
              action={
                <Button
                  startIcon={<Add />}
                  size="small"
                  variant="contained"
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
                  Upload Resource
                </Button>
              }
            />
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        "& th": {
                          fontWeight: "bold",
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        },
                      }}
                    >
                      <TableCell>Resource Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Last Updated</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teacherData.resources.map((resource, index) => (
                      <TableRow
                        key={index}
                        hover
                        sx={{
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.light, 0.05),
                          },
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                              sx={{
                                mr: 2,
                                bgcolor: alpha(getResourceColor(resource.type), 0.9),
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              {getResourceIcon(resource.type)}
                            </Avatar>
                            <Typography variant="body1" fontWeight="medium">
                              {resource.title}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={resource.type}
                            size="small"
                            sx={{
                              bgcolor: alpha(getResourceColor(resource.type), 0.1),
                              color: getResourceColor(resource.type),
                              fontWeight: "medium",
                              border: `1px solid ${alpha(getResourceColor(resource.type), 0.3)}`,
                            }}
                          />
                        </TableCell>
                        <TableCell>{resource.size}</TableCell>
                        <TableCell>{resource.lastUpdated}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<Download />}
                              sx={{
                                borderRadius: 2,
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                },
                              }}
                            >
                              Download
                            </Button>
                            <Tooltip title="View Resource">
                              <IconButton
                                size="small"
                                sx={{
                                  color: theme.palette.primary.main,
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                                    transform: "translateY(-2px)",
                                  },
                                }}
                              >
                                <Visibility fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Resource">
                              <IconButton
                                size="small"
                                sx={{
                                  color: theme.palette.warning.main,
                                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    bgcolor: alpha(theme.palette.warning.main, 0.2),
                                    transform: "translateY(-2px)",
                                  },
                                }}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Resource">
                              <IconButton
                                size="small"
                                sx={{
                                  color: theme.palette.error.main,
                                  bgcolor: alpha(theme.palette.error.main, 0.1),
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    bgcolor: alpha(theme.palette.error.main, 0.2),
                                    transform: "translateY(-2px)",
                                  },
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Resource Categories */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  overflow: "hidden",
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
                      bgcolor: theme.palette.primary.main,
                      mx: "auto",
                      mb: 2,
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <MenuBook />
                  </Avatar>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Lesson Plans
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    12 items
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
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
                    View All
                  </Button>
                </CardContent>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                  bgcolor: alpha(theme.palette.error.main, 0.05),
                  overflow: "hidden",
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
                      bgcolor: theme.palette.error.main,
                      mx: "auto",
                      mb: 2,
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Assessment />
                  </Avatar>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Assessments
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    8 items
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
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
                    View All
                  </Button>
                </CardContent>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                  bgcolor: alpha(theme.palette.success.main, 0.05),
                  overflow: "hidden",
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
                      bgcolor: theme.palette.success.main,
                      mx: "auto",
                      mb: 2,
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Assignment />
                  </Avatar>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Worksheets
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    15 items
                  </Typography>
                  <Button
                    variant="outlined"
                    color="success"
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
                    View All
                  </Button>
                </CardContent>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                  bgcolor: alpha(theme.palette.warning.main, 0.05),
                  overflow: "hidden",
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
                      bgcolor: theme.palette.warning.main,
                      mx: "auto",
                      mb: 2,
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <BarChart />
                  </Avatar>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Presentations
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    6 items
                  </Typography>
                  <Button
                    variant="outlined"
                    color="warning"
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
                    View All
                  </Button>
                </CardContent>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  )
}

export default TeacherResource
