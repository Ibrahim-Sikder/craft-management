"use client"
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  alpha,
  useTheme,
  Paper,
  Fade,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  IconButton,
} from "@mui/material"
import {
  Assessment,
  AutoGraph,
  CalendarMonth,
  CloudDownload,
  Description,
  FileCopy,
  FilePresent,
  FilterAlt,
  Grade,
  History,
  PictureAsPdf,
  Preview,
  Print,
  School,
  Search,
  Share,
  TableChart,
} from "@mui/icons-material"
import { useState } from "react"

// Sample report templates
const reportTemplates = [
  {
    id: 1,
    title: "Student Progress Report",
    description: "Comprehensive report of student academic progress",
    icon: <School />,
    color: "#4caf50",
    lastGenerated: "October 5, 2023",
    format: "PDF",
  },
  {
    id: 2,
    title: "Class Performance Analysis",
    description: "Statistical analysis of class performance metrics",
    icon: <AutoGraph />,
    color: "#2196f3",
    lastGenerated: "September 28, 2023",
    format: "PDF/Excel",
  },
  {
    id: 3,
    title: "Attendance Summary",
    description: "Monthly attendance summary with statistics",
    icon: <CalendarMonth />,
    color: "#ff9800",
    lastGenerated: "October 1, 2023",
    format: "PDF",
  },
  {
    id: 4,
    title: "Grade Distribution Report",
    description: "Analysis of grade distribution across classes",
    icon: <Grade />,
    color: "#9c27b0",
    lastGenerated: "September 15, 2023",
    format: "PDF/Excel",
  },
  {
    id: 5,
    title: "Teaching Hours Log",
    description: "Detailed log of teaching hours and activities",
    icon: <History />,
    color: "#f44336",
    lastGenerated: "October 3, 2023",
    format: "PDF",
  },
  {
    id: 6,
    title: "Curriculum Coverage Report",
    description: "Analysis of curriculum coverage and pacing",
    icon: <TableChart />,
    color: "#607d8b",
    lastGenerated: "September 20, 2023",
    format: "PDF",
  },
]

// Sample recent reports
const recentReports = [
  {
    id: 101,
    title: "Advanced Calculus - Mid-term Analysis",
    date: "October 5, 2023",
    type: "Class Performance",
    format: "PDF",
  },
  {
    id: 102,
    title: "Statistics & Probability - Student Progress",
    date: "October 3, 2023",
    type: "Student Progress",
    format: "PDF",
  },
  {
    id: 103,
    title: "September 2023 - Attendance Summary",
    date: "October 1, 2023",
    type: "Attendance",
    format: "PDF",
  },
  {
    id: 104,
    title: "Linear Algebra - Quiz 2 Analysis",
    date: "September 28, 2023",
    type: "Assessment",
    format: "Excel",
  },
]

const ReportGenerator = () => {
  const theme = useTheme()
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [reportClass, setReportClass] = useState("")
  const [reportPeriod, setReportPeriod] = useState("")

  const handleTemplateSelect = (id: number) => {
    setSelectedTemplate(id === selectedTemplate ? null : id)
  }

  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={4}>
        {/* Report Generator */}
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
                    Report Generator
                  </Typography>
                </Box>
              }
              action={
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    startIcon={<History />}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    Report History
                  </Button>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Select Report Template
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {reportTemplates.map((template) => (
                      <Grid item xs={12} sm={6} key={template.id}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: `1px solid ${
                              selectedTemplate === template.id
                                ? alpha(theme.palette.primary.main, 0.5)
                                : alpha(theme.palette.primary.main, 0.1)
                            }`,
                            bgcolor:
                              selectedTemplate === template.id
                                ? alpha(theme.palette.primary.main, 0.05)
                                : "transparent",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                              transform: "translateY(-2px)",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            },
                          }}
                          onClick={() => handleTemplateSelect(template.id)}
                        >
                          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                            <Avatar
                              sx={{
                                bgcolor: alpha(template.color, 0.9),
                                mr: 2,
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              {template.icon}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {template.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {template.description}
                              </Typography>
                              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                <Chip
                                  label={template.format}
                                  size="small"
                                  sx={{
                                    mr: 1,
                                    bgcolor: alpha(template.color, 0.1),
                                    color: template.color,
                                    fontWeight: "medium",
                                    border: `1px solid ${alpha(template.color, 0.3)}`,
                                  }}
                                />
                                <Typography variant="caption" color="text.secondary">
                                  Last generated: {template.lastGenerated}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>

                  {selectedTemplate && (
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Configure Report
                      </Typography>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                          bgcolor: alpha(theme.palette.primary.light, 0.02),
                        }}
                      >
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" size="small">
                              <InputLabel>Class</InputLabel>
                              <Select
                                value={reportClass}
                                onChange={(e) => setReportClass(e.target.value)}
                                label="Class"
                              >
                                <MenuItem value="M101">Advanced Calculus</MenuItem>
                                <MenuItem value="M202">Statistics & Probability</MenuItem>
                                <MenuItem value="M303">Linear Algebra</MenuItem>
                                <MenuItem value="all">All Classes</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" size="small">
                              <InputLabel>Time Period</InputLabel>
                              <Select
                                value={reportPeriod}
                                onChange={(e) => setReportPeriod(e.target.value)}
                                label="Time Period"
                              >
                                <MenuItem value="current">Current Month</MenuItem>
                                <MenuItem value="last">Last Month</MenuItem>
                                <MenuItem value="quarter">Current Quarter</MenuItem>
                                <MenuItem value="semester">Current Semester</MenuItem>
                                <MenuItem value="year">Academic Year</MenuItem>
                                <MenuItem value="custom">Custom Range</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Additional Notes (Optional)"
                              multiline
                              rows={2}
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>

                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 1 }}>
                          <Button
                            startIcon={<Preview />}
                            variant="outlined"
                            sx={{
                              borderRadius: 2,
                              transition: "all 0.2s ease",
                              "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              },
                            }}
                          >
                            Preview
                          </Button>
                          <Button
                            startIcon={<Assessment />}
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
                            Generate Report
                          </Button>
                        </Box>
                      </Paper>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Recent Reports
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 2,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="subtitle2" color="text.secondary">
                        Recently Generated
                      </Typography>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Tooltip title="Search Reports">
                          <IconButton size="small">
                            <Search fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter Reports">
                          <IconButton size="small">
                            <FilterAlt fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    <List sx={{ p: 0 }}>
                      {recentReports.map((report) => (
                        <ListItem
                          key={report.id}
                          sx={{
                            borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.05)}`,
                            transition: "all 0.2s ease",
                            "&:hover": {
                              bgcolor: alpha(theme.palette.primary.light, 0.05),
                            },
                          }}
                        >
                          <ListItemIcon>
                            <Avatar
                              sx={{
                                bgcolor:
                                  report.type === "Class Performance"
                                    ? alpha("#2196f3", 0.9)
                                    : report.type === "Student Progress"
                                      ? alpha("#4caf50", 0.9)
                                      : report.type === "Attendance"
                                        ? alpha("#ff9800", 0.9)
                                        : alpha("#9c27b0", 0.9),
                                width: 40,
                                height: 40,
                              }}
                            >
                              {report.format === "PDF" ? <PictureAsPdf /> : <TableChart />}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" fontWeight="medium">
                                {report.title}
                              </Typography>
                            }
                            secondary={
                              <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                  {report.date}
                                </Typography>
                                <Chip
                                  label={report.type}
                                  size="small"
                                  sx={{
                                    height: 20,
                                    fontSize: "0.625rem",
                                    bgcolor:
                                      report.type === "Class Performance"
                                        ? alpha("#2196f3", 0.1)
                                        : report.type === "Student Progress"
                                          ? alpha("#4caf50", 0.1)
                                          : report.type === "Attendance"
                                            ? alpha("#ff9800", 0.1)
                                            : alpha("#9c27b0", 0.1),
                                    color:
                                      report.type === "Class Performance"
                                        ? "#2196f3"
                                        : report.type === "Student Progress"
                                          ? "#4caf50"
                                          : report.type === "Attendance"
                                            ? "#ff9800"
                                            : "#9c27b0",
                                  }}
                                />
                              </Box>
                            }
                          />
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <Tooltip title="Download">
                              <IconButton size="small">
                                <CloudDownload fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Share">
                              <IconButton size="small">
                                <Share fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ p: 2, textAlign: "center" }}>
                      <Button
                        size="small"
                        sx={{
                          borderRadius: 2,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        View All Reports
                      </Button>
                    </Box>
                  </Paper>

                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Quick Actions
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            textAlign: "center",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                              transform: "translateY(-2px)",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            },
                          }}
                        >
                          <Print sx={{ fontSize: 30, color: theme.palette.primary.main, mb: 1 }} />
                          <Typography variant="body2" fontWeight="medium">
                            Print Last Report
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            textAlign: "center",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                              transform: "translateY(-2px)",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            },
                          }}
                        >
                          <FileCopy sx={{ fontSize: 30, color: theme.palette.primary.main, mb: 1 }} />
                          <Typography variant="body2" fontWeight="medium">
                            Duplicate Report
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Report Templates */}
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
                  <Description sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Custom Report Templates
                  </Typography>
                </Box>
              }
              action={
                <Button
                  startIcon={<FilePresent />}
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
                  Create Template
                </Button>
              }
            />
            <CardContent>
              <Typography variant="body1" paragraph>
                Create custom report templates to streamline your reporting process. Custom templates allow you to
                define specific data points, visualizations, and formatting to meet your exact reporting needs.
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                  bgcolor: alpha(theme.palette.warning.main, 0.05),
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Box sx={{ mr: 2 }}>
                  <Avatar sx={{ bgcolor: theme.palette.warning.main }}>
                    <School />
                  </Avatar>
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Pro Tip: Custom Templates
                  </Typography>
                  <Typography variant="body2">
                    Save time by creating custom templates for reports you generate frequently. You can include specific
                    metrics, charts, and formatting to ensure consistency across all your reports.
                  </Typography>
                </Box>
              </Paper>

              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  View Template Gallery
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fade>
  )
}

export default ReportGenerator
