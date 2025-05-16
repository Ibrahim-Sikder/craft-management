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
  Avatar,
  Button,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
} from "@mui/material"
import {
  ArrowUpward,
  AutoGraph,
  BarChart,
  CloudDownload,
 
  Grade,
  Group,
  Info,
  Person,
  PersonSearch,
  School,

  Share,
  Star,
  TrendingDown,
  TrendingUp,
  Visibility,
} from "@mui/icons-material"
import { useState } from "react"

// Sample student data
const studentData = [
  {
    id: "S1001",
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    grade: "A",
    score: 92,
    attendance: 98,
    participation: 95,
    improvement: 3.2,
    trend: "up",
    lastAssessment: "Mid-term Exam",
    lastScore: 94,
  },
  {
    id: "S1002",
    name: "Maya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    grade: "A-",
    score: 89,
    attendance: 96,
    participation: 90,
    improvement: 2.5,
    trend: "up",
    lastAssessment: "Mid-term Exam",
    lastScore: 91,
  },
  {
    id: "S1003",
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    grade: "B+",
    score: 87,
    attendance: 92,
    participation: 85,
    improvement: 1.8,
    trend: "up",
    lastAssessment: "Mid-term Exam",
    lastScore: 88,
  },
  {
    id: "S1004",
    name: "Sophia Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    grade: "B",
    score: 83,
    attendance: 90,
    participation: 88,
    improvement: -1.2,
    trend: "down",
    lastAssessment: "Mid-term Exam",
    lastScore: 82,
  },
  {
    id: "S1005",
    name: "Ethan Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    grade: "A",
    score: 91,
    attendance: 95,
    participation: 92,
    improvement: 4.5,
    trend: "up",
    lastAssessment: "Mid-term Exam",
    lastScore: 93,
  },
];

// Sample class performance data
const classPerformanceData = {
  averageScore: 88.4,
  medianScore: 89,
  highestScore: 94,
  lowestScore: 82,
  standardDeviation: 3.8,
  gradeDistribution: {
    A: 40,
    B: 45,
    C: 10,
    D: 5,
    F: 0,
  },
  improvementRate: 65, 
};

const StudentAnalytics = () => {
  const theme = useTheme();
  const [selectedClass, setSelectedClass] = useState("M101");

  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={4}>
        {/* Class Selection */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Student Performance Analytics
            </Typography>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Select Class</InputLabel>
              <Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                label="Select Class"
              >
                <MenuItem value="M101">Advanced Calculus</MenuItem>
                <MenuItem value="M202">Statistics & Probability</MenuItem>
                <MenuItem value="M303">Linear Algebra</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* Performance Overview */}
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
                  <AutoGraph sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Class Performance Overview
                  </Typography>
                </Box>
              }
              action={
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    startIcon={<Share />}
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
                    Share
                  </Button>
                  <Button
                    startIcon={<CloudDownload />}
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
                    Export Data
                  </Button>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.9),
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Grade />
                      </Avatar>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="h5" fontWeight="bold">
                          {classPerformanceData.averageScore}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Average Score
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Median
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {classPerformanceData.medianScore}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Std Dev
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {classPerformanceData.standardDeviation}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.success.main, 0.9),
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <TrendingUp />
                      </Avatar>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="h5" fontWeight="bold">
                          {classPerformanceData.improvementRate}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Improvement Rate
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Students Improving
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                        <LinearProgress
                          variant="determinate"
                          value={classPerformanceData.improvementRate}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            width: "100%",
                            mr: 1,
                            bgcolor: alpha(theme.palette.success.main, 0.2),
                            "& .MuiLinearProgress-bar": {
                              bgcolor: theme.palette.success.main,
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.warning.main, 0.9),
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Group />
                      </Avatar>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="h5" fontWeight="bold">
                          85%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Participation Rate
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Class Engagement
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                        <LinearProgress
                          variant="determinate"
                          value={85}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            width: "100%",
                            mr: 1,
                            bgcolor: alpha(theme.palette.warning.main, 0.2),
                            "& .MuiLinearProgress-bar": {
                              bgcolor: theme.palette.warning.main,
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.info.main, 0.9),
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <BarChart />
                      </Avatar>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="h5" fontWeight="bold">
                          A-
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Average Grade
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Grade Distribution
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                        <Chip 
                          label="A: 40%" 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha(theme.palette.success.main, 0.1), 
                            color: theme.palette.success.dark,
                            fontWeight: "medium" 
                          }} 
                        />
                        <Chip 
                          label="B: 45%" 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha(theme.palette.info.main, 0.1), 
                            color: theme.palette.info.dark,
                            fontWeight: "medium" 
                          }} 
                        />
                        <Chip 
                          label="C: 10%" 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha(theme.palette.warning.main, 0.1), 
                            color: theme.palette.warning.dark,
                            fontWeight: "medium" 
                          }} 
                        />
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              {/* Performance Chart */}
              <Paper
                elevation={0}
                sx={{
                  height: 300,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  bgcolor: alpha(theme.palette.primary.light, 0.02),
                  mb: 4,
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <AutoGraph sx={{ fontSize: 60, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    Performance chart would be displayed here (showing student performance trends)
                  </Typography>
                </Box>
              </Paper>

              {/* Student Performance Table */}
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Student Performance Details
              </Typography>
              <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
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
                      <TableCell>Student</TableCell>
                      <TableCell>Grade</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Attendance</TableCell>
                      <TableCell>Participation</TableCell>
                      <TableCell>Improvement</TableCell>
                      <TableCell>Last Assessment</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentData.map((student) => (
                      <TableRow
                        key={student.id}
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
                            <Avatar src={student.avatar} sx={{ mr: 1.5, width: 32, height: 32 }} />
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {student.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                ID: {student.id}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={student.grade}
                            size="small"
                            sx={{
                              fontWeight: "bold",
                              bgcolor:
                                student.grade.startsWith("A")
                                  ? alpha(theme.palette.success.main, 0.1)
                                  : student.grade.startsWith("B")
                                  ? alpha(theme.palette.info.main, 0.1)
                                  : student.grade.startsWith("C")
                                  ? alpha(theme.palette.warning.main, 0.1)
                                  : alpha(theme.palette.error.main, 0.1),
                              color:
                                student.grade.startsWith("A")
                                  ? theme.palette.success.dark
                                  : student.grade.startsWith("B")
                                  ? theme.palette.info.dark
                                  : student.grade.startsWith("C")
                                  ? theme.palette.warning.dark
                                  : theme.palette.error.dark,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {student.score}/100
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <LinearProgress
                              variant="determinate"
                              value={student.attendance}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                width: 60,
                                mr: 1,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                "& .MuiLinearProgress-bar": {
                                  bgcolor: theme.palette.primary.main,
                                  borderRadius: 3,
                                },
                              }}
                            />
                            <Typography variant="body2">{student.attendance}%</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <LinearProgress
                              variant="determinate"
                              value={student.participation}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                width: 60,
                                mr: 1,
                                bgcolor: alpha(theme.palette.warning.main, 0.1),
                                "& .MuiLinearProgress-bar": {
                                  bgcolor: theme.palette.warning.main,
                                  borderRadius: 3,
                                },
                              }}
                            />
                            <Typography variant="body2">{student.participation}%</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {student.trend === "up" ? (
                              <ArrowUpward fontSize="small" sx={{ color: theme.palette.success.main, mr: 0.5 }} />
                            ) : (
                              <TrendingDown fontSize="small" sx={{ color: theme.palette.error.main, mr: 0.5 }} />
                            )}
                            <Typography
                              variant="body2"
                              color={student.trend === "up" ? "success.main" : "error.main"}
                              fontWeight="medium"
                            >
                              {student.improvement > 0 ? "+" : ""}
                              {student.improvement}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">{student.lastAssessment}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              Score: {student.lastScore}/100
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                            <Tooltip title="View Student Profile">
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
                            <Tooltip title="View Detailed Analytics">
                              <IconButton
                                size="small"
                                sx={{
                                  color: theme.palette.info.main,
                                  bgcolor: alpha(theme.palette.info.main, 0.1),
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    bgcolor: alpha(theme.palette.info.main, 0.2),
                                    transform: "translateY(-2px)",
                                  },
                                }}
                              >
                                <Info fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                  startIcon={<PersonSearch />}
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
                  View All Students
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Student Insights */}
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
                  <Person sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Student Insights
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                      bgcolor: alpha(theme.palette.success.main, 0.05),
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.success.main,
                          mr: 2,
                        }}
                      >
                        <Star />
                      </Avatar>
                      <Typography variant="h6" fontWeight="bold">
                        Top Performers
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <List sx={{ p: 0 }}>
                      {studentData
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 3)
                        .map((student, index) => (
                          <Box
                            key={student.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1.5,
                              p: 1,
                              borderRadius: 2,
                              bgcolor: alpha(theme.palette.success.main, index === 0 ? 0.1 : 0.05),
                            }}
                          >
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              sx={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: theme.palette.success.main,
                                color: "white",
                                mr: 1,
                              }}
                            >
                              {index + 1}
                            </Typography>
                            <Avatar src={student.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body2" fontWeight="medium">
                                {student.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Score: {student.score}/100
                              </Typography>
                            </Box>
                            <Chip
                              label={student.grade}
                              size="small"
                              sx={{
                                fontWeight: "bold",
                                bgcolor: alpha(theme.palette.success.main, 0.1),
                                color: theme.palette.success.dark,
                              }}
                            />
                          </Box>
                        ))}
                    </List>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                      bgcolor: alpha(theme.palette.warning.main, 0.05),
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.warning.main,
                          mr: 2,
                        }}
                      >
                        <TrendingUp />
                      </Avatar>
                      <Typography variant="h6" fontWeight="bold">
                        Most Improved
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <List sx={{ p: 0 }}>
                      {studentData
                        .sort((a, b) => b.improvement - a.improvement)
                        .slice(0, 3)
                        .map((student, index) => (
                          <Box
                            key={student.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1.5,
                              p: 1,
                              borderRadius: 2,
                              bgcolor: alpha(theme.palette.warning.main, index === 0 ? 0.1 : 0.05),
                            }}
                          >
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              sx={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: theme.palette.warning.main,
                                color: "white",
                                mr: 1,
                              }}
                            >
                              {index + 1}
                            </Typography>
                            <Avatar src={student.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body2" fontWeight="medium">
                                {student.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Improvement: +{student.improvement}%
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <ArrowUpward fontSize="small" sx={{ color: theme.palette.success.main, mr: 0.5 }} />
                              <Typography variant="body2" color="success.main" fontWeight="medium">
                                {student.improvement}%
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                    </List>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                      bgcolor: alpha(theme.palette.error.main, 0.05),
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.error.main,
                          mr: 2,
                        }}
                      >
                        <School />
                      </Avatar>
                      <Typography variant="h6" fontWeight="bold">
                        Needs Attention
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <List sx={{ p: 0 }}>
                      {studentData
                        .sort((a, b) => a.score - b.score)
                        .slice(0, 3)
                        .map((student, index) => (
                          <Box
                            key={student.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1.5,
                              p: 1,
                              borderRadius: 2,
                              bgcolor: alpha(theme.palette.error.main, index === 0 ? 0.1 : 0.05),
                            }}
                          >
                            <Avatar src={student.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body2" fontWeight="medium">
                                {student.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Score: {student.score}/100
                              </Typography>
                            </Box>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              sx={{
                                borderRadius: 2,
                                fontSize: "0.7rem",
                                py: 0.5,
                              }}
                            >
                              Intervention
                            </Button>
                          </Box>
                        ))}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default StudentAnalytics;
