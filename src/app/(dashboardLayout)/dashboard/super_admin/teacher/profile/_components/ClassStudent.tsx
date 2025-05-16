import React from "react"
import {
  Box,
  Grid,
  Typography,
  Chip,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  alpha,
  useTheme,
  Paper,
  Avatar,
  Fade
} from "@mui/material"
import {
  People,
  Edit,
  Add,

  Star,
  Class,
  School,
  CalendarMonth,
  Room,
  ArrowUpward,
  Visibility,
  Delete
} from "@mui/icons-material"
import { teacherData } from "./TeacherProfile"


const ClassStudent = () => {
  const theme = useTheme()
  
  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={4}>
        {/* Current Classes */}
        <Grid item xs={12}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                borderColor: alpha(theme.palette.primary.main, 0.2),
              }
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Class sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">Current Classes</Typography>
                </Box>
              }
              action={
                <Button 
                  startIcon={<Add />} 
                  size="small" 
                  variant="contained"
                  sx={{ 
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  Add Class
                </Button>
              }
            />
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      '& th': { 
                        fontWeight: 'bold',
                        color: theme.palette.primary.main,
                        borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`
                      }
                    }}>
                      <TableCell>Class ID</TableCell>
                      <TableCell>Class Name</TableCell>
                      <TableCell>Grade</TableCell>
                      <TableCell>Students</TableCell>
                      <TableCell>Schedule</TableCell>
                      <TableCell>Room</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teacherData.currentClasses.map((cls, index) => (
                      <TableRow 
                        key={cls.id} 
                        hover 
                        sx={{ 
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.light, 0.05),
                          }
                        }}
                      >
                        <TableCell>
                          <Chip 
                            label={cls.id} 
                            size="small" 
                            color="primary" 
                            variant="outlined" 
                            sx={{ fontWeight: 'medium' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" fontWeight="medium">
                            {cls.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            icon={<School fontSize="small" />}
                            label={cls.grade} 
                            size="small" 
                            sx={{ 
                              bgcolor: [
                                alpha(theme.palette.primary.light, 0.1),
                                alpha(theme.palette.info.light, 0.1),
                                alpha(theme.palette.success.light, 0.1),
                              ][index % 3],
                              color: [
                                theme.palette.primary.dark,
                                theme.palette.info.dark,
                                theme.palette.success.dark,
                              ][index % 3],
                              fontWeight: 'medium',
                              border: `1px solid ${[
                                alpha(theme.palette.primary.main, 0.3),
                                alpha(theme.palette.info.main, 0.3),
                                alpha(theme.palette.success.main, 0.3),
                              ][index % 3]}`,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={<People fontSize="small" />}
                            label={cls.students}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ 
                              fontWeight: 'medium',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarMonth fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary }} />
                            <Typography variant="body2">{cls.schedule}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Room fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary }} />
                            <Typography variant="body2">{cls.room}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 1, justifyContent: 'center' }}>
                            <Tooltip title="View Class Details">
                              <IconButton 
                                size="small" 
                                sx={{ 
                                  color: theme.palette.primary.main,
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                                    transform: 'translateY(-2px)'
                                  }
                                }}
                              >
                                <Visibility fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Class">
                              <IconButton 
                                size="small" 
                                sx={{ 
                                  color: theme.palette.warning.main,
                                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: alpha(theme.palette.warning.main, 0.2),
                                    transform: 'translateY(-2px)'
                                  }
                                }}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Class">
                              <IconButton 
                                size="small" 
                                sx={{ 
                                  color: theme.palette.error.main,
                                  bgcolor: alpha(theme.palette.error.main, 0.1),
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: alpha(theme.palette.error.main, 0.2),
                                    transform: 'translateY(-2px)'
                                  }
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

        {/* Student Performance */}
        <Grid item xs={12}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                borderColor: alpha(theme.palette.primary.main, 0.2),
              }
            }}
          >
            <CardHeader 
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ArrowUpward sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">Student Performance Overview</Typography>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                {teacherData.studentPerformance.map((perf, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        height: "100%", 
                        borderRadius: 3,
                        border: `1px solid ${[
                          alpha(theme.palette.primary.main, 0.2),
                          alpha(theme.palette.info.main, 0.2),
                          alpha(theme.palette.success.main, 0.2),
                        ][index % 3]}`,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                        }
                      }}
                    >
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: [
                          alpha(theme.palette.primary.light, 0.1),
                          alpha(theme.palette.info.light, 0.1),
                          alpha(theme.palette.success.light, 0.1),
                        ][index % 3],
                        borderBottom: `1px solid ${[
                          alpha(theme.palette.primary.main, 0.2),
                          alpha(theme.palette.info.main, 0.2),
                          alpha(theme.palette.success.main, 0.2),
                        ][index % 3]}`,
                      }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: [
                              theme.palette.primary.dark,
                              theme.palette.info.dark,
                              theme.palette.success.dark,
                            ][index % 3],
                          }}
                        >
                          {perf.class}
                        </Typography>
                      </Box>
                      <Box sx={{ p: 3 }}>
                        <Box sx={{ mb: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                              Average Grade
                            </Typography>
                            <Typography 
                              variant="body2" 
                              fontWeight="bold"
                              sx={{ 
                                color: [
                                  theme.palette.primary.main,
                                  theme.palette.info.main,
                                  theme.palette.success.main,
                                ][index % 3],
                              }}
                            >
                              {perf.averageGrade}%
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ width: "100%", mr: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={perf.averageGrade}
                                sx={{
                                  height: 10,
                                  borderRadius: 5,
                                  bgcolor: [
                                    alpha(theme.palette.primary.main, 0.1),
                                    alpha(theme.palette.info.main, 0.1),
                                    alpha(theme.palette.success.main, 0.1),
                                  ][index % 3],
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: [
                                      theme.palette.primary.main,
                                      theme.palette.info.main,
                                      theme.palette.success.main,
                                    ][index % 3],
                                    borderRadius: 5,
                                  }
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                              Passing Rate
                            </Typography>
                            <Typography 
                              variant="body2" 
                              fontWeight="bold"
                              sx={{ 
                                color: theme.palette.success.main
                              }}
                            >
                              {perf.passingRate}%
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ width: "100%", mr: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={perf.passingRate}
                                sx={{
                                  height: 10,
                                  borderRadius: 5,
                                  bgcolor: alpha(theme.palette.success.main, 0.1),
                                  "& .MuiLinearProgress-bar": {
                                    bgcolor: theme.palette.success.main,
                                    borderRadius: 5,
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", mt: 3, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.warning.light, 0.1) }}>
                          <Avatar sx={{ bgcolor: theme.palette.warning.main, mr: 2 }}>
                            <Star />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Top Performer
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                              {perf.topPerformer}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
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

export default ClassStudent
